export const filterDoctors = (doctors, selectedFilter) => {
  let doctorsCopy = [...(doctors || [])];

  if (selectedFilter == "A to Z") {
    doctorsCopy = doctorsCopy?.sort((a, b) =>
      a.name.localeCompare(b.name, "tr", { sensitivity: "base" })
    );
  }
  if (selectedFilter == "Z to A") {
    doctorsCopy = doctorsCopy?.sort((a, b) =>
      b.name.localeCompare(a.name, "tr", { sensitivity: "base" })
    );
  }
  if (selectedFilter == "Less than 10$") {
    doctorsCopy = doctorsCopy?.filter((doctor) => doctor.price_per_hour < 10);
  }
  if (selectedFilter == "Greater than 10$") {
    doctorsCopy = doctorsCopy?.filter((doctor) => doctor.price_per_hour > 10);
  }
  if (selectedFilter == "Popular") {
    doctorsCopy = doctorsCopy?.sort((a, b) => b.rating - a.rating);
  }
  if (selectedFilter == "Not popular") {
    doctorsCopy = doctorsCopy?.sort((a, b) => a.rating - b.rating);
  }

  return doctorsCopy;
};
