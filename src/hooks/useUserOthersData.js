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
  const id = user?.id;
  const changeTheme = async (theme) => {
    const userRef = ref(db, "users/" + id);
    if (!id) return;
    try {
      await update(userRef, {
        theme,
      });
      dispatch(setTheme(theme));
      console.log("Tema güncellendi:", theme);
    } catch (err) {
      console.error("Tema güncelleme hatası:", err);
    }
  };
  const updateFavouriteDoctors = async (doctor) => {
    if (!id) return;

    const userRef = ref(db, "users/" + id);

    if (!userRef) return;
    let updatedDoctors = null;

    try {
      const snapshot = await get(userRef);
      if (!snapshot.exists()) {
        console.log("Kullanıcı verisi bulunamadı.");
        return;
      }

      const data = snapshot.val() || {};
      const existingDoctors = data?.psychologyDoctors || [];

      const alreadyExists = existingDoctors.some(
        (d) => d?.name === doctor.name
      );

      if (alreadyExists) {
        updatedDoctors = existingDoctors.filter((d) => d.name !== doctor.name);
        console.log("Doktor başarıyla silindi.");
      } else {
        updatedDoctors = [...existingDoctors, doctor];
        console.log("Doktor başarıyla eklendi.");
      }
      await update(userRef, {
        psychologyDoctors: updatedDoctors,
      });
      console.log("Updated Doctors updateDoctor fonk. ", updatedDoctors);

      dispatch(setFavouriteDoctors(updatedDoctors));
    } catch (error) {
      console.error("Veri okuma hatası:", error);
    }
  };

  return { changeTheme, updateFavouriteDoctors };
};
