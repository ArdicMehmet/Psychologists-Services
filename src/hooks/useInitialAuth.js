import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { ref, get } from "firebase/database";
// import {
//   doCreateUserWithEmailAndPassword,
//   doSignInWithEmailAndPassword,
//   doSignOut,
// } from "../firebase/auth";
import { DEFAULT_THEME } from "../constants/theme";
import { useDispatch } from "react-redux";
import {
  setFavouriteDoctors,
  setIsLoggedIn,
  setTheme,
  setUser,
} from "../store/slices/user-slice/slice";

export const useInitialAuth = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const initializeUser = async (user) => {
    try {
      let updatedUser = null;
      if (user) {
        const userProfileRef = ref(db, "users/" + user.uid);
        const snapshot = await get(userProfileRef);

        updatedUser = {
          id: user?.uid || "",
          displayName: user?.displayName || "",
          email: user?.email || "",
          emailVerified: user?.emailVerified || false,
          phoneNumber: user?.phoneNumber || "",
          photoURL: user?.photoURL || "",
          theme: DEFAULT_THEME,
          psychologyDoctors: [],
        };

        if (snapshot.exists()) {
          const userData = snapshot.val();
          const theme = userData?.theme || DEFAULT_THEME;
          const psychologyDoctors = userData?.psychologyDoctors || [];

          if (!updatedUser.displayName && user) {
            await user.reload();
            const freshUser = auth.currentUser;
            if (freshUser && freshUser.displayName) {
              updatedUser.displayName = freshUser.displayName;
            }
          }

          updatedUser = { ...updatedUser, theme, psychologyDoctors };
          setError(null);
        } else {
          console.log("'/users/" + user.uid + "' yolunda veri bulunamadı.");
          setError(
            "Kullanıcı Others data verileri bulunamadı, default veriler işlendi"
          );
        }

        dispatch(setIsLoggedIn(true));
        dispatch(setUser({ ...updatedUser }));
      } else {
        console.log("No authenticated user");
        dispatch(setIsLoggedIn(false));
        dispatch(setUser(null));
        dispatch(setTheme(DEFAULT_THEME));
        dispatch(setFavouriteDoctors([]));
      }
    } catch (err) {
      console.error("Error in initializeUser:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const authUnsub = onAuthStateChanged(auth, initializeUser);
    return () => authUnsub();
  }, []);

  return {
    loading,
    error,
    setError,
  };
};
