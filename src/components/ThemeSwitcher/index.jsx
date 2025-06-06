import { useState } from "react";
import "./styles.css";
import { DEFAULT_THEME, THEME_COLORS, THEMES } from "../../constants/theme";

const ThemeSwitcher = ({ onThemeChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    {
      name: THEMES["GREEN"],
      color: THEME_COLORS[THEMES["GREEN"]].primary,
      label: [THEMES["GREEN"]],
    },
    {
      name: THEMES["BLUE"],
      color: THEME_COLORS[THEMES["BLUE"]].primary,
      label: [THEMES["BLUE"]],
    },
    {
      name: THEMES["ORANGE"],
      color: THEME_COLORS[THEMES["ORANGE"]].primary,
      label: [THEMES["ORANGE"]],
    },
  ];

  const handleThemeSelect = (themeColor) => {
    onThemeChange(themeColor);
    setIsOpen(false);
  };

  return (
    <div className="theme-switcher">
      <button
        className="theme-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change theme"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 12C21 13.1 20.1 14 19 14C17.9 14 17 13.1 17 12C17 10.9 17.9 10 19 10C20.1 10 21 10.9 21 12ZM12 18C13.1 18 14 18.9 14 20C14 21.1 13.1 22 12 22C10.9 22 10 21.1 10 20C10 18.9 10.9 18 12 18ZM5 12C5 13.1 4.1 14 3 14C1.9 14 1 13.1 1 12C1 10.9 1.9 10 3 10C4.1 10 5 10.9 5 12ZM12 8C15.31 8 18 10.69 18 14C18 17.31 15.31 20 12 20C8.69 20 6 17.31 6 14C6 10.69 8.69 8 12 8Z"
            fill="currentColor"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="theme-options">
          {themes.map((theme) => (
            <button
              key={theme.name}
              className="theme-option"
              onClick={() => handleThemeSelect(theme.name)}
              style={{ "--theme-color": theme.color }}
              title={theme.label}
            >
              <div
                className="theme-color"
                style={{ backgroundColor: theme.color }}
              ></div>
              <span className="theme-label">{theme.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
