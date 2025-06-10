import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { ref, get } from "firebase/database";
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
      if (user) {
        let updatedUser = null;
        let theme = DEFAULT_THEME;
        let favouriteDoctors = [];
        const userProfileRef = ref(db, "users/" + user.uid);
        const snapshot = await get(userProfileRef);

        const userSablon = {
          id: user?.uid || "",
          displayName: user?.displayName || "",
          email: user?.email || "",
          emailVerified: user?.emailVerified || false,
          phoneNumber: user?.phoneNumber || "",
          photoURL: user?.photoURL || "",
        };

        if (snapshot.exists()) {
          const userData = snapshot.val();
          theme = userData?.theme || DEFAULT_THEME;
          favouriteDoctors = userData?.psychologyDoctors || [];

          if (!userSablon.displayName && user) {
            await user.reload();
            const freshUser = auth.currentUser;
            if (freshUser && freshUser.displayName) {
              userSablon.displayName = freshUser.displayName;
            }
          }

          updatedUser = { ...userSablon };
          setError(null);
        } else {
          setError(
            "Kullanıcı Others data verileri bulunamadı, default veriler işlendi"
          );
        }

        dispatch(setIsLoggedIn(true));
        dispatch(setUser({ ...updatedUser }));
        dispatch(setTheme(theme));
        dispatch(setFavouriteDoctors(favouriteDoctors));
      } else {
        dispatch(setIsLoggedIn(false));
        dispatch(setUser(null));
        dispatch(setTheme(DEFAULT_THEME));
        dispatch(setFavouriteDoctors([]));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const authUnsub = onAuthStateChanged(auth, (user) => {
      if (!user) return initializeUser(null);

      if (!user.displayName) {
        return;
      }
      initializeUser(user);
    });

    return () => authUnsub();
  }, []);

  return {
    loading,
    error,
  };
};
