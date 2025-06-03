import { THEME_COLORS } from "../../../constants/theme";
import "./styles.css";
const AvatarPlaceholder = ({ text, theme = "blue" }) => {
  return (
    <div
      className="avatar-placeholder"
      style={{ backgroundColor: THEME_COLORS[theme].tertiary }}
    >
      <p style={{ color: THEME_COLORS[theme].primary }}>{text}</p>
    </div>
  );
};

export default AvatarPlaceholder;
