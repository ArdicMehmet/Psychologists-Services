import { useDispatch } from "react-redux";
import { ref, update } from "firebase/database";
import { db } from "../firebase/firebase";
import { setTheme } from "../store/slices/user-slice/slice";
import { THEMES } from "../constants/theme";

export const useUserOthersData = () => {
  const dispatch = useDispatch();
  const changeTheme = async (currentUser, setCurrentUser, setError) => {
    if (!currentUser) return;

    const newTheme = getNextTheme(currentUser.theme);

    try {
      const userRef = ref(db, "users/" + currentUser.id);
      await update(userRef, {
        psychologyDoctors: currentUser?.psychologyDoctors || [],
        theme: newTheme,
      });

      console.log("Kullanıcı theması başarıyla güncellendi!");
      setCurrentUser((prev) => ({ ...prev, theme: newTheme }));
      dispatch(setTheme(newTheme));
      console.log("Tema güncellendi:", newTheme);
    } catch (err) {
      console.error("Tema güncelleme hatası:", err);
      setError(err.message);
    }
  };

  const getNextTheme = (currentTheme) => {
    return currentTheme === THEMES.BLUE
      ? THEMES.GREEN
      : currentTheme === THEMES.GREEN
      ? THEMES.PURPLE
      : THEMES.BLUE;
  };

  return { changeTheme };
};
