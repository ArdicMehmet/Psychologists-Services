import { useState } from "react";
import { doSignInWithEmailAndPassword } from "../firebase/auth";
import { useDispatch } from "react-redux";
import {
  setFavouriteDoctors,
  setIsLoggedIn,
  setTheme,
  setUser,
} from "../store/slices/user-slice/slice";
import { DEFAULT_THEME } from "../constants/theme";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const {
        user: firebaseUser,
        success = false,
        errorMessage = null,
      } = await doSignInWithEmailAndPassword(email, password);
      if (!success) {
        console.log("Hata:", errorMessage);
        setError(errorMessage);
        return false;
      }
      const theme = firebaseUser?.theme || DEFAULT_THEME;
      const favouriteDoctors = firebaseUser?.favouriteDoctors || [];
      const updatedUser = {
        id: firebaseUser?.user.uid || "",
        displayName: firebaseUser?.user.displayName || "",
        email: firebaseUser?.user.email || "",
        emailVerified: firebaseUser?.user.emailVerified || false,
        phoneNumber: firebaseUser?.user.phoneNumber || "",
        photoURL: firebaseUser?.user.photoURL || "",
      };
      dispatch(setUser({ ...updatedUser }));
      dispatch(setIsLoggedIn(true));
      dispatch(setTheme(theme));
      dispatch(setFavouriteDoctors(favouriteDoctors));
      return true;
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, login };
};

export default useLogin;
