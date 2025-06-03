import React, { useState } from "react";
import { doGetAllDoctors } from "../firebase/doctors";
import { setDoctors } from "../store/slices/doctors-slice/slice";
import { useDispatch } from "react-redux";

const useGetAllDoctors = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const getAllDoctors = async () => {
    setLoading(true);
    setError(null);
    const response = await doGetAllDoctors();
    if (response.status) {
      dispatch(setDoctors(response?.data || []));
      setLoading(false);
      return true;
    }
    setLoading(false);
    setError(response.error);
    return false;
  };
  return { loading, error, getAllDoctors };
};

export default useGetAllDoctors;
