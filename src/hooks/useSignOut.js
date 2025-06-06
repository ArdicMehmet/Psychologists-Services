import { useState } from "react";
import { useDispatch } from "react-redux";
import { doSignOut } from "../firebase/auth";
import {
  setFavouriteDoctors,
  setTheme,
  setUser,
} from "../store/slices/user-slice/slice";
import { DEFAULT_THEME } from "../constants/theme";

const useSignOut = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const signOut = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await doSignOut();
      dispatch(setUser(null));
      dispatch(setTheme(DEFAULT_THEME));
      dispatch(setFavouriteDoctors([]));
      return true;
    } catch (err) {
      console.error("Sign out error:", err);
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, signOut };
};

export default useSignOut;
