import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { doCreateUserWithEmailAndPassword } from "../firebase/auth";
import {
  setFavouriteDoctors,
  setIsLoggedIn,
  setTheme,
  setUser,
} from "../store/slices/user-slice/slice";

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const signUp = async (email, password, displayName) => {
    setLoading(true);
    setError(null);
    try {
      const response = await doCreateUserWithEmailAndPassword(
        email,
        password,
        displayName
      );
      if (!response.success) {
        setError(response.errorMessage);
        return false;
      }
      dispatch(setUser({ ...response.data.user }));
      dispatch(setTheme(response.data.theme));
      dispatch(setFavouriteDoctors(response.data.favouriteDoctors));
      dispatch(setIsLoggedIn(true));
      return true;
    } catch (err) {
      console.error("Sign in error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, signUp };
};

export default useSignUp;
