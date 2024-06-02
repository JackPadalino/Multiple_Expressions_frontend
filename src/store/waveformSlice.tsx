import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./index";
import { TrackInt } from "../ints/ints";

interface StoreWaveformState {
  storeWaveformTrack: TrackInt;
  storeDisplayWaveform: boolean;
}

const initialState: StoreWaveformState = {
  storeWaveformTrack: {
    id: 0,
    title: "",
    artists: [],
    description: "",
    file: "",
    track_photo: "",
    tags: [],
    featured: false,
    listens: 0,
    upload_date: "",
  },
  storeDisplayWaveform: false,
};

export const waveformSlice = createSlice({
  name: "waveform",
  initialState,
  reducers: {
    setStoreDisplayWaveform: (state, action: PayloadAction<boolean>) => {
      state.storeDisplayWaveform = action.payload;
    },
    setStoreWaveformTrack: (state, action: PayloadAction<TrackInt>) => {
      state.storeWaveformTrack = action.payload;
    },
  },
});

export const { setStoreDisplayWaveform, setStoreWaveformTrack } =
  waveformSlice.actions;

// selectors to be used to pull data down from redux store
export const selectStoreWaveformTrack = (state: RootState) =>
  state.waveform.storeWaveformTrack;
export const selectStoreDisplayWaveform = (state: RootState) =>
  state.waveform.storeDisplayWaveform;

export default waveformSlice.reducer;
