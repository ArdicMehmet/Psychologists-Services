import { useEffect } from "react";
import useGetAllDoctors from "../../hooks/useGetAllDoctors";
import { useSelector } from "react-redux";
import { selectDoctors } from "../../store/slices/doctors-slice/selectors";
import Card from "../../components/Card";
import { selectFavouriteDoctors } from "../../store/slices/user-slice/selectors";

const Psychologists = () => {
  const {
    loading: getAllDoctorsLoading,
    error: getAllDoctorsError,
    getAllDoctors,
  } = useGetAllDoctors();
  useEffect(() => {
    getAllDoctors();
  }, []);
  const doctors = useSelector(selectDoctors);
  const favoriteDoctors = useSelector(selectFavouriteDoctors);
  return (
    <div>
      <h1>Psychologists Page</h1>
      {getAllDoctorsLoading && <p>Loading</p>}
      {getAllDoctorsError && <p>{getAllDoctorsError}</p>}
      {!getAllDoctorsError &&
        doctors &&
        !getAllDoctorsLoading &&
        doctors.map((doctor, index) => (
          <Card
            key={index}
            doctor={doctor}
            favorite={favoriteDoctors.some((fd) => fd?.name == doctor?.name)}
          />
        ))}
    </div>
  );
};

export default Psychologists;
