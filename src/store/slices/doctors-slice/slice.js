import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  doctorList: [],
};

const doctorsSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {
    setDoctors: (state, action) => {
      state.doctorList = [...action.payload];
    },
  },
});

export const { setDoctors } = doctorsSlice.actions;
export default doctorsSlice.reducer;
