"use client";

import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import LogoBar from "../Logos/LogoBar";
import "./styles.css";
import { useSelector } from "react-redux";
import {
  selectCurrentTheme,
  selectCurrentUser,
  selectIsLoggedIn,
} from "../../store/slices/user-slice/selectors";
import { THEME_COLORS } from "../../constants/theme";
import UserLogo from "../Logos/UserLogo";
import useSignOut from "../../hooks/useSignOut";
import { toast } from "react-toastify";

const Navbar = ({ openLoginModal, openRegisterModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const theme = useSelector(selectCurrentTheme);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    loading: signOutLoading,
    error: signOutError,
    signOut,
  } = useSignOut();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    const response = await signOut();
    if (response) {
      toast.success("Exit successful", {
        style: {
          background: "green",
          color: "white",
        },
      });
    } else {
      toast.error("Failed to exit", {
        style: {
          background: "red",
          color: "white",
        },
      });
    }
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo" onClick={(_) => navigate("/")}>
          <LogoBar theme={theme} />
        </div>

        <div className="menu-icon" onClick={toggleMenu}>
          <div className={`menu-icon-bar ${isMenuOpen ? "open" : ""}`}></div>
          <div className={`menu-icon-bar ${isMenuOpen ? "open" : ""}`}></div>
          <div className={`menu-icon-bar ${isMenuOpen ? "open" : ""}`}></div>
        </div>

        <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          <li className="nav-item">
            <Link
              to="/"
              className={`nav-link ${isActiveLink("/") ? "active" : ""}`}
            >
              Home
              {isActiveLink("/") && (
                <span
                  className="active-indicator"
                  style={{ backgroundColor: THEME_COLORS[theme].primary }}
                ></span>
              )}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/psychologists"
              className={`nav-link ${
                isActiveLink("/psychologists") ? "active" : ""
              }`}
            >
              Psychologists
              {isActiveLink("/psychologists") && (
                <span
                  className="active-indicator"
                  style={{ backgroundColor: THEME_COLORS[theme].primary }}
                ></span>
              )}
            </Link>
          </li>
          {isLoggedIn && (
            <li className="nav-item">
              <Link
                to="/favorites"
                className={`nav-link ${
                  isActiveLink("/favorites") ? "active" : ""
                }`}
              >
                Favorites
                {isActiveLink("/favorites") && (
                  <span
                    className="active-indicator"
                    style={{ backgroundColor: THEME_COLORS[theme].primary }}
                  ></span>
                )}
              </Link>
            </li>
          )}
        </ul>

        <div
          className={`nav-buttons ${isMenuOpen ? "active" : ""}`}
          style={{ top: isLoggedIn ? "220px" : "200px" }}
        >
          {!isLoggedIn && (
            <button
              className="login-button navbar-button"
              onClick={(_) => openLoginModal(true)}
            >
              Log In
            </button>
          )}
          {!isLoggedIn && (
            <button
              className="registration-button navbar-button"
              style={{
                backgroundColor: THEME_COLORS[theme].primary,
                borderColor: THEME_COLORS[theme].primary,
              }}
              onClick={(_) => openRegisterModal(true)}
            >
              Registration
            </button>
          )}
          {isLoggedIn && (
            <div className="user-info">
              <div className="user-container">
                <div
                  className="user-logo-container"
                  style={{ backgroundColor: THEME_COLORS[theme].primary }}
                >
                  <UserLogo
                    fill={THEME_COLORS[theme].quaternary}
                    stroke={THEME_COLORS[theme].quaternary}
                  />
                </div>
                <p>{user?.displayName || ""}</p>
              </div>
              <button
                className="login-button navbar-button"
                onClick={handleSignOut}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
