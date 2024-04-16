import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./index";
import { TrackInt } from "../ints/ints";

interface StoreTracksState {
  featuredTracks: TrackInt[];
  storeTracks: TrackInt[];
}

const initialState: StoreTracksState = {
  featuredTracks: [],
  storeTracks: [],
};

export const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    setFeaturedTracks: (state, action: PayloadAction<TrackInt[]>) => {
      console.log("Set featured tracks store function called");
      state.featuredTracks = action.payload;
    },
    setStoreTracks: (state, action: PayloadAction<TrackInt[]>) => {
      console.log("Set all tracks store function called");
      state.storeTracks = action.payload;
    },
  },
});

export const { setFeaturedTracks, setStoreTracks } = musicSlice.actions;

// selectors to be used to pull data down from redux store
export const selectFeaturedTracks = (state: RootState) =>
  state.music.featuredTracks;
export const selectStoreTracks = (state: RootState) => state.music.storeTracks;

export default musicSlice.reducer;
