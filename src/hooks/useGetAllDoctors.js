import React, { useState } from "react";
import { doGetAllDoctors } from "../firebase/doctors";

const useGetAllDoctors = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const getAllDoctors = async () => {
    setLoading(true);
    setError(null);
    const response = await doGetAllDoctors();
    console.log("Get All Doctors Response", response);

    if (response.status) {
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
