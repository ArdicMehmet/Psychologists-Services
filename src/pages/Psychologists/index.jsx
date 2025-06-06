import { useEffect, useState } from "react";
import "./styles.css";
import useGetAllDoctors from "../../hooks/useGetAllDoctors";
import { useSelector } from "react-redux";
import { selectDoctors } from "../../store/slices/doctors-slice/selectors";
import Card from "../../components/Card";
import {
  selectCurrentTheme,
  selectFavouriteDoctors,
  selectIsLoggedIn,
} from "../../store/slices/user-slice/selectors";
import FilterDropdown from "../../components/FilterDropdown";
import { THEME_COLORS } from "../../constants/theme";
import LoadingSpin from "../../components/LoadingSpin";
import AppointmentModal from "../../components/AppointmentModal";
import { filterOptions } from "../../constants/filters";
import { filterDoctors } from "../../utils/filterDoctors";

const Psychologists = () => {
  const [selectedFilter, setSelectedFilter] = useState("Show all");
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [pageSize, setPageSize] = useState(3);
  const [pageIndex, setPageIndex] = useState(0);
  const theme = useSelector(selectCurrentTheme);
  const {
    loading: getAllDoctorsLoading,
    error: getAllDoctorsError,
    getAllDoctors,
  } = useGetAllDoctors();

  useEffect(() => {
    getAllDoctors(pageSize, pageIndex);
  }, [pageIndex]);

  const doctors = useSelector(selectDoctors);
  const favoriteDoctors = useSelector(selectFavouriteDoctors);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    const data = filterDoctors(doctors, selectedFilter);
    const updatedData = data.map((doctor) => {
      return {
        ...doctor,
        isFavorite:
          isLoggedIn &&
          favoriteDoctors.some((fd) => {
            return fd.name === doctor.name;
          }),
      };
    });
    setFilteredDoctors([...updatedData]);
  }, [selectedFilter, doctors, isLoggedIn, favoriteDoctors]);

  const handleChangeFilter = (data) => {
    setSelectedFilter(data);
  };

  const handleViewAppointment = (visible, doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(visible);
  };

  const incrasePageIndex = () => {
    setPageIndex((prev) => prev + 1);
  };

  return (
    <div className="main">
      <div className="container">
        <div className="card-container">
          <FilterDropdown
            filterOptions={filterOptions}
            callback={handleChangeFilter}
          />
          {!getAllDoctorsError &&
            filteredDoctors &&
            filteredDoctors.map((doctor) => (
              <Card
                key={doctor.name}
                doctor={doctor}
                favourite={doctor.isFavorite}
                handleViewAppointment={handleViewAppointment}
              />
            ))}
          {getAllDoctorsLoading && <LoadingSpin />}
          {!(pageIndex * pageSize > doctors?.length) &&
            filteredDoctors.length > 0 && (
              <div className="button-container">
                <button
                  className={`load-more-button ${
                    getAllDoctorsLoading && "unclickable"
                  }`}
                  style={{
                    backgroundColor: THEME_COLORS[theme].primary,
                    borderColor: THEME_COLORS[theme].primary,
                  }}
                  onClick={incrasePageIndex}
                >
                  Load More
                </button>
              </div>
            )}
        </div>
        <AppointmentModal
          isOpen={isModalOpen}
          doctor={selectedDoctor}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default Psychologists;
