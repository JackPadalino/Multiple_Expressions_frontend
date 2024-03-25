import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  storeAccessToken: "",
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setStoreAccessToken: (state, action) => {
      state.storeAccessToken = action.payload;
    },
    resetStoreAccessToken: (state, action) => {
      state.storeAccessToken = state.initialState;
    },
  },
});

export const { setStoreAccessToken, resetStoreAccessToken } =
  usersSlice.actions;

export default usersSlice.reducer;
