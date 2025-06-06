import { useDispatch, useSelector } from "react-redux";
import { get, ref, update } from "firebase/database";
import { db } from "../firebase/firebase";
import {
  setFavouriteDoctors,
  setTheme,
} from "../store/slices/user-slice/slice";
import { selectCurrentUser } from "../store/slices/user-slice/selectors";

export const useUserOthersData = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const id = user ? user.id : null;
  const changeTheme = async (theme) => {
    const userRef = ref(db, "users/" + id);
    if (!id) return false;
    try {
      await update(userRef, {
        theme,
      });
      await dispatch(setTheme(theme));
      return true;
    } catch (err) {
      return false;
    }
  };
  const updateFavouriteDoctors = async (doctor) => {
    const status = { success: false, type: "added" };
    if (!id) return status;

    const userRef = ref(db, "users/" + id);

    if (!userRef) return status;
    let updatedDoctors = null;

    try {
      const snapshot = await get(userRef);
      if (!snapshot.exists()) {
        return status;
      }

      const data = snapshot.val() || {};
      const existingDoctors = data?.psychologyDoctors || [];
      const alreadyExists = existingDoctors.some(
        (d) => d?.name === doctor.name
      );

      if (alreadyExists) {
        updatedDoctors = existingDoctors.filter((d) => d.name !== doctor.name);
        status.success = true;
        status.type = "deleted";
      } else {
        updatedDoctors = [...existingDoctors, doctor];
        status.success = true;
        status.type = "added";
      }
      await update(userRef, {
        psychologyDoctors: updatedDoctors,
      });
      dispatch(setFavouriteDoctors(updatedDoctors));
      return status;
    } catch (error) {
      return { success: false, type: "added" };
    }
  };

  return { changeTheme, updateFavouriteDoctors };
};
