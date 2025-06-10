import { useNavigate } from "react-router-dom";
import CheckLogo from "../../components/Logos/CheckLogo";
import "./styles.css";
import mainImage from "/images/home_image.png";
import { useSelector } from "react-redux";
import { selectCurrentTheme } from "../../store/slices/user-slice/selectors";
import { THEME_COLORS } from "../../constants/theme";
import UsersLogo from "../../components/Logos/UsersLogo";

const Home = () => {
  const theme = useSelector(selectCurrentTheme);
  const navigate = useNavigate();
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            The road to the{" "}
            <span style={{ color: THEME_COLORS[theme].primary }}>depths</span>{" "}
            of the human soul
          </h1>
          <p className="hero-description">
            We help you to reveal your potential, overcome challenges and find a
            guide in your own life with the help of our experienced
            psychologists.
          </p>
          <button
            className="get-started-button"
            style={{ backgroundColor: THEME_COLORS[theme].primary }}
            onClick={(_) => navigate("/psychologists")}
          >
            Get started <span className="arrow-icon">→</span>
          </button>
        </div>

        <div className="hero-image-container">
          <img src={mainImage} alt="Psychologist" className="hero-image" />

          <div
            className="stats-card"
            style={{ backgroundColor: THEME_COLORS[theme].primary }}
          >
            <div className="stats-icon">
              <CheckLogo
                fill={THEME_COLORS[theme].primary}
                stroke={THEME_COLORS[theme].primary}
              />
            </div>
            <div className="stats-content">
              <p className="stats-label">Experienced psychologists</p>
              <p className="stats-number">15,000</p>
            </div>
          </div>

          <div className="question-badge">
            <span className="question-badge-text">?</span>
          </div>
          <div className="users-badge">
            <div className="users-logo-container">
              <UsersLogo fill="#FBFBFB" stroke="#FBFBFB" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
