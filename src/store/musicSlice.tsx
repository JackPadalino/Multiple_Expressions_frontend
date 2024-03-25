import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  storeTracks: [],
  storeVideos: [],
};

export const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    setStoreTracks: (state, action) => {
      state.storeTracks = action.payload;
    },
    setStoreVideos: (state, action) => {
      state.storeVideos = action.payload;
    },
  },
});

export const { setStoreTracks, setStoreVideos } = musicSlice.actions;

export default musicSlice.reducer;
