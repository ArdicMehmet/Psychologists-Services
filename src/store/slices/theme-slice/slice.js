import { createSlice } from "@reduxjs/toolkit";

// Tema renkleri
const themes = {
  blue: {
    primary: "#3b82f6",
    secondary: "#93c5fd",
    background: "#eff6ff",
    text: "#1e3a8a",
  },
  green: {
    primary: "#10b981",
    secondary: "#6ee7b7",
    background: "#ecfdf5",
    text: "#064e3b",
  },
  purple: {
    primary: "#8b5cf6",
    secondary: "#c4b5fd",
    background: "#f5f3ff",
    text: "#4c1d95",
  },
};
const initialState = {
  currentTheme: "blue",
  colors: themes.blue,
};
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.currentTheme = action.payload;
      state.colors = themes[action.payload];
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
