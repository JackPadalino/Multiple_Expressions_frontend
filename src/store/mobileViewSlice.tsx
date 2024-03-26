import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./index";

interface StoreMobileViewState {
  storeMobileView: boolean;
}

const initialState: StoreMobileViewState = {
  storeMobileView: false,
};

export const mobileViewSlice = createSlice({
  name: "mobileView",
  initialState,
  reducers: {
    setStoreMobileView: (state, action: PayloadAction<boolean>) => {
      state.storeMobileView = action.payload;
    },
  },
});

export const { setStoreMobileView } = mobileViewSlice.actions;

// selectors to be used to pull data down from redux store
export const selectStoreMobileView = (state: RootState) =>
  state.mobileView.storeMobileView;

export default mobileViewSlice.reducer;
