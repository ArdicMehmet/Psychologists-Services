import React, { useState } from "react";
import { doGetAllDoctors } from "../firebase/doctors";
import { setDoctors } from "../store/slices/doctors-slice/slice";
import { useDispatch } from "react-redux";

const useGetAllDoctors = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const getAllDoctors = async (pageSize = 3, pageIndex = 0) => {
    setLoading(true);
    setError(null);
    const response = await doGetAllDoctors(pageSize, pageIndex);

    if (response.status) {
      const pagedDoctors = response?.data.slice(0, (pageIndex + 1) * pageSize);
      dispatch(setDoctors(pagedDoctors || []));
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
