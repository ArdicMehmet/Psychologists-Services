import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import { useEffect, useState } from "react";
import TimePicker from "./components/TimePicker";
import MenuButton from "./components/Buttons/MenuButton";
import Card from "./components/Card";
import AvatarPlaceholder from "./components/Icons/AvatarPlaceholder";
import Psychologists from "./pages/Psychologists";
import { useInitialAuth } from "./hooks/useInitialAuth";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import LoginModal from "./components/AuthModal/login-modal";
import RegisterModal from "./components/AuthModal/register-modal";
import useLogin from "./hooks/useLogin";
import useSignUp from "./hooks/useSignUp";
function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const { loading: authInitalLoading, error: authInitialError } =
    useInitialAuth();
  const { loading: loginLoading, loginError, login } = useLogin();
  const { loading: signUpLoading, error: signUpError, signUp } = useSignUp();
  const handleLogin = async (data) => {
    setIsLoginModalOpen(false);
    const response = await login(data.email, data.password);
    console.log("Login response : ", response);
  };

  const handleRegister = async (data) => {
    setIsRegisterModalOpen(false);
    const response = await signUp(data.email, data.password, data.name);
    console.log("Singup response : ", response);
  };
  return authInitalLoading ? (
    <div>Loading</div>
  ) : (
    <Router>
      <div className="app">
        <Navbar
          openLoginModal={setIsLoginModalOpen}
          openRegisterModal={setIsRegisterModalOpen}
        />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/psychologists" element={<Psychologists />} />
            <Route path="/favorites" element={<div>Favorites Page</div>} />
          </Routes>
        </main>
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onLogin={handleLogin}
        />

        <RegisterModal
          isOpen={isRegisterModalOpen}
          onClose={() => setIsRegisterModalOpen(false)}
          onRegister={handleRegister}
        />
      </div>
    </Router>
  );
}

export default App;

{
  /* <button onClick={handleLogin}>Login</button>
      <button onClick={handleSignUp}>SignUp</button>
      <button onClick={handleSignOut}>Logout</button> 
      
       useSignUp;
  const handleLogin = async () => {
    const response = await login("", "");
    console.log("Login Response", response);
  };
  const handleSignOut = async () => {
    const response = await signOut();
    console.log("SignOut response ", response);
  };
      
      
      */
}

{
  /* <CheckLogo
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
      <MenuButton text="Get Started" /> */
}
// const filterOptions = [
//   "A to Z",
//   "Z to A",
//   "Less than 10$",
//   "Greater than 10$",
//   "Popular",
//   "Not popular",
//   "Show all",
// ];
// const timeOptions = [
//   "09:00",
//   "09:30",
//   "10:00",
//   "10:30",
//   "11:00",
//   "11:30",
//   "12:00",
//   "12:30",
//   "13:00",
//   "13:30",
//   "14:00",
//   "14:30",
//   "15:00",
//   "15:30",
//   "16:00",
//   "16:30",
//   "17:00",
//   "17:30",
// ];
// const handleEye = (status) => {
//   console.log("Eye show status : ", status);
// };
// const handleFilter = async (filter) => {
//   console.log("Filter : ", filter);
// };
// const handleTimePicker = async (time) => {
//   console.log("Time : ", time);
// };
