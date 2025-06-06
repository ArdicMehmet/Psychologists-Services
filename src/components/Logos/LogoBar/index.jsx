import { THEME_COLORS } from "../../../constants/theme";
import "./styles.css";
const LogoBar = ({ theme }) => {
  return (
    <span className="logo-text">
      <span style={{ color: THEME_COLORS[theme].primary }}>psychologists</span>
      .services
    </span>
  );
};

export default LogoBar;
