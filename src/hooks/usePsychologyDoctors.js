import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase/firebase";

export const usePsychologyDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [errorDoctors, setErrorDoctors] = useState(null);

  useEffect(() => {
    const doctorData = ref(db, "/psychologyDoctors");

    const dbUnSub = onValue(
      doctorData,
      (snapshot) => {
        try {
          const data = snapshot.val();
          setDoctors(data || []);
          setLoadingDoctors(false);
        } catch (err) {
          setErrorDoctors(err.message);
          setLoadingDoctors(false);
        }
      },
      (error) => {
        setErrorDoctors(error.message);
        setLoadingDoctors(false);
      }
    );

    return () => dbUnSub();
  }, []);

  return { doctors, loadingDoctors, errorDoctors };
};
