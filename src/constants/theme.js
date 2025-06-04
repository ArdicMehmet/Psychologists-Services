export const THEMES = {
  GREEN: "green",
  BLUE: "blue",
  ORANGE: "orange",
};

export const DEFAULT_THEME = THEMES.GREEN;

export const THEME_COLORS = {
  [THEMES.GREEN]: {
    primary: "#54BE96",
    secondary: "#191A15",
    tertiary: "rgba(84, 190, 150, 0.2)",
    quaternary: "#FBFBFB",
    penta: "#36A379",
  },
  [THEMES.BLUE]: {
    primary: "#3470FF",
    secondary: "#191A15",
    tertiary: "rgba(52, 112, 255, 0.2)",
    quaternary: "#FBFBFB",
    penta: "#255EE8",
  },
  [THEMES.ORANGE]: {
    primary: "#FC832C",
    secondary: "#6c757d",
    tertiary: "rgba(252, 131, 44, 0.2)",
    quaternary: "#FBFBFB",
    penta: "#F37113",
  },
};
