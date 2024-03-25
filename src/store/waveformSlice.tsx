import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  waveformTrack: {},
  displayWaveform: false,
};

export const waveformSlice = createSlice({
  name: "waveform",
  initialState,
  reducers: {
    setDisplayWaveform: (state, action) => {
      state.displayWaveform = action.payload;
    },
    setWaveformTrack: (state, action) => {
      state.waveformTrack = action.payload;
    },
  },
});

export const { setDisplayWaveform, setWaveformTrack } = waveformSlice.actions;

export default waveformSlice.reducer;
