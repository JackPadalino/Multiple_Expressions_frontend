import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mobileView: false,
};

export const mobileViewSlice = createSlice({
  name: "mobileView",
  initialState,
  reducers: {
    setMobileView: (state, action) => {
      state.mobileView = action.payload;
    },
  },
});

export const { setMobileView } = mobileViewSlice.actions;

export default mobileViewSlice.reducer;
