import { useEffect, useState } from "react";
import "./styles.css";

import { useSelector } from "react-redux";

import Card from "../../components/Card";
import {
  selectCurrentTheme,
  selectFavouriteDoctors,
} from "../../store/slices/user-slice/selectors";
import FilterDropdown from "../../components/FilterDropdown";
import { THEME_COLORS } from "../../constants/theme";
import LoadingSpin from "../../components/LoadingSpin";
import AppointmentModal from "../../components/AppointmentModal";
import { filterOptions } from "../../constants/filters";
import { filterDoctors } from "../../utils/filterDoctors";

const Favourites = () => {
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Show all");
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [pageSize, setPageSize] = useState(3);
  const [pageIndex, setPageIndex] = useState(0);
  const theme = useSelector(selectCurrentTheme);

  const favoriteDoctors = useSelector(selectFavouriteDoctors);

  useEffect(() => {
    setLoading(true);
    const data = filterDoctors(favoriteDoctors, selectedFilter);
    const lastData = data.slice(0, (pageIndex + 1) * pageSize);
    setFilteredDoctors([...lastData]);
    setLoading(false);
  }, [selectedFilter, favoriteDoctors, pageIndex]);

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
            theme={theme}
          />
          {filteredDoctors &&
            filteredDoctors.map((doctor) => (
              <Card
                key={doctor.name}
                doctor={doctor}
                favourite={true}
                handleViewAppointment={handleViewAppointment}
              />
            ))}
          {loading && <LoadingSpin />}
          {!(pageIndex * pageSize > favoriteDoctors?.length) &&
            filteredDoctors.length > 0 &&
            filterDoctors.length < favoriteDoctors.length && (
              <div className="button-container">
                <button
                  className="load-more-button"
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

export default Favourites;
