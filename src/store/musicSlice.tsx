import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./index";
import { TrackInt } from "../ints/ints";

interface StoreTracksState {
  storeTracks: TrackInt[];
}

const initialState: StoreTracksState = {
  storeTracks: [],
};

export const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    setStoreTracks: (state, action: PayloadAction<TrackInt[]>) => {
      state.storeTracks = action.payload;
    },
  },
});

export const { setStoreTracks } = musicSlice.actions;

// selectors to be used to pull data down from redux store
export const selectStoreTracks = (state: RootState) => state.music.storeTracks;

export default musicSlice.reducer;
