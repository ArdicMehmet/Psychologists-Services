import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import FilterDropdown from "./components/FilterDropdown";
import EyeIcon from "./components/Icons/EyeIcon";
import CheckLogo from "./components/Logos/CheckLogo";
import FavLogo from "./components/Logos/FavLogo";
import StarLogo from "./components/Logos/StarLogo";
import UserLogo from "./components/Logos/UserLogo";
import UsersLogo from "./components/Logos/UsersLogo";
import { THEME_COLORS, THEMES } from "./constants/theme";
import { selectCurrentTheme } from "./store/slices/user-slice/selectors";
import { useEffect } from "react";
import TimePicker from "./components/TimePicker";
import MenuButton from "./components/Buttons/MenuButton";
import Card from "./components/Card";
import AvatarPlaceholder from "./components/Icons/AvatarPlaceholder";
import Psychologists from "./pages/Psychologists";
import { useInitialAuth } from "./hooks/useInitialAuth";
function App() {
  const { loading: authInitalLoading, error: authInitialError } =
    useInitialAuth();
  const theme = useSelector(selectCurrentTheme);
  const filterOptions = [
    "A to Z",
    "Z to A",
    "Less than 10$",
    "Greater than 10$",
    "Popular",
    "Not popular",
    "Show all",
  ];
  const timeOptions = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
  ];
  const handleEye = (status) => {
    console.log("Eye show status : ", status);
  };
  const handleFilter = async (filter) => {
    console.log("Filter : ", filter);
  };
  const handleTimePicker = async (time) => {
    console.log("Time : ", time);
  };
  useEffect(() => {
    console.log("Theme : ", theme);
  }, [theme]);
  return (
    <BrowserRouter>
      <Psychologists />
      <CheckLogo
        fill={THEME_COLORS[THEMES["ORANGE"]].primary}
        stroke={THEME_COLORS[THEMES["ORANGE"]].primary}
      />
      <FavLogo
        fill={THEME_COLORS[THEMES["GREEN"]].primary}
        stroke={THEME_COLORS[THEMES["GREEN"]].primary}
      />
      <UserLogo fill="black" stroke="black" />
      <UsersLogo
        fill={THEME_COLORS[THEMES["BLUE"]].primary}
        stroke={THEME_COLORS[THEMES["BLUE"]].secondary}
      />
      <StarLogo />
      <EyeIcon
        status={false}
        callback={handleEye}
        fill="white"
        stroke="black"
      />
      <FilterDropdown
        theme={theme}
        callback={handleFilter}
        filterOptions={filterOptions}
      />
      <TimePicker timeOptions={timeOptions} callback={handleTimePicker} />
      <MenuButton text="Get Started" />
    </BrowserRouter>
  );
}

export default App;

{
  /* <button
        onClick={(_) => {
          updateFavouriteDoctors({
            name: "Dr. Sarah Davis aa",
            avatar_url: "https://ftp.goit.study/img/avatars/23.jpg",
            specialization: "Depression and Mood Disorders",
            experience: "12 years",
            initial_consultation: "Free 45-minute initial consultation",
            license: "Licensed Psychologist (License #67890)",
            price_per_hour: 120,
            rating: 4.75,
            reviews: [],
            about:
              "Dr. Sarah Davis is a highly experienced and licensed psychologist specializing in Depression and Mood Disorders. With 12 years of practice, she has helped numerous individuals overcome their depression and regain control of their lives. Dr. Davis is known for her empathetic and understanding approach to therapy, making her clients feel comfortable and supported throughout their journey to better mental health.",
          });
        }}
      >
        Favori Doktor Ekle
      </button> */
}

{
  /* <button onClick={handleLogin}>Login</button>
      <button onClick={handleSignUp}>SignUp</button>
      <button onClick={handleSignOut}>Logout</button> 
      
       useSignUp;
  const handleLogin = async () => {
    const response = await login("dede12@gmail.com", "dede12");
    console.log("Login Response", response);
  };
  const handleSignOut = async () => {
    const response = await signOut();
    console.log("SignOut response ", response);
  };
      
      
      */
}
