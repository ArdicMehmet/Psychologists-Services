import { useEffect, useState } from "react";
import "./styles.css";
import useGetAllDoctors from "../../hooks/useGetAllDoctors";
import { useSelector } from "react-redux";
import { selectDoctors } from "../../store/slices/doctors-slice/selectors";
import Card from "../../components/Card";
import { selectFavouriteDoctors } from "../../store/slices/user-slice/selectors";
import FilterDropdown from "../../components/FilterDropdown";

const filterOptions = [
  "Show all",
  "A to Z",
  "Z to A",
  "Less than 10$",
  "Greater than 10$",
  "Popular",
  "Not popular",
];

const Psychologists = () => {
  const [selectedFilter, setSelectedFilter] = useState("Show all");
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [pageSize, setPageSize] = useState(3);
  const [pageIndex, setPageIndex] = useState(0);
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

  useEffect(() => {
    setFilteredDoctors(doFilter(doctors));
  }, [selectedFilter, doctors]);
  const handleChangeFilter = (data) => {
    setSelectedFilter(data);
  };
  const incrasePageIndex = () => {
    setPageIndex((prev) => prev + 1);
  };
  const doFilter = (doctors) => {
    let doctorsCopy = [...(doctors || [])];
    if (selectedFilter == "A to Z") {
      return doctorsCopy?.sort((a, b) =>
        a.name.localeCompare(b.name, "tr", { sensitivity: "base" })
      );
    }
    if (selectedFilter == "Z to A") {
      return doctorsCopy?.sort((a, b) =>
        b.name.localeCompare(a.name, "tr", { sensitivity: "base" })
      );
    }
    if (selectedFilter == "Less than 10$") {
      return doctorsCopy?.filter((doctor) => doctor.price_per_hour < 10);
    }
    if (selectedFilter == "Greater than 10$") {
      return doctorsCopy?.filter((doctor) => doctor.price_per_hour > 10);
    }
    if (selectedFilter == "Popular") {
      return doctorsCopy?.sort((a, b) => b.rating - a.rating);
    }
    if (selectedFilter == "Not popular") {
      return doctorsCopy?.sort((a, b) => a.rating - b.rating);
    }
    return doctorsCopy;
  };

  return (
    <div className="main">
      <div className="container">
        {/* {getAllDoctorsLoading && <p>Loading</p>} */}
        <div className="card-container">
          <FilterDropdown
            filterOptions={filterOptions}
            callback={handleChangeFilter}
          />
          {!getAllDoctorsError &&
            filteredDoctors &&
            filteredDoctors.map((doctor, index) => (
              <Card
                key={index}
                doctor={doctor}
                favorite={favoriteDoctors.some(
                  (fd) => fd?.name == doctor?.name
                )}
              />
            ))}
          {getAllDoctorsLoading && <div>Loading</div>}
          <div onClick={incrasePageIndex}>Load More</div>
        </div>
      </div>
    </div>
  );
};

export default Psychologists;
