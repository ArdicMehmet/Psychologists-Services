import { createSlice } from "@reduxjs/toolkit";
import { themes } from "../../../contants/themes";

const initialState = {
  user: null,
  currentTheme: "blue",
  colors: themes.blue,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setTheme: (state, action) => {
      state.currentTheme = action.payload;
      state.colors = themes[action.payload];
    },
  },
});

export const { setUser, setTheme } = userSlice.actions;
export default userSlice.reducer;
