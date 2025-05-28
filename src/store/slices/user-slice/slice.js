import { createSlice } from "@reduxjs/toolkit";
import { DEFAULT_THEME, THEME_COLORS, THEMES } from "../../../constants/theme";

const initialState = {
  user: null,
  isLoggedIn: false,
  favouriteDoctors: [],
  currentTheme: DEFAULT_THEME,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setTheme: (state, action) => {
      state.currentTheme = action.payload;
    },
    setFavouriteDoctors: (state, action) => {
      state.favouriteDoctors = [...action.payload];
    },
  },
});

export const { setUser, setIsLoggedIn, setTheme, setFavouriteDoctors } =
  userSlice.actions;
export default userSlice.reducer;
