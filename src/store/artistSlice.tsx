import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./index";
import { ArtistInt } from "../ints/ints";

interface StoreArtistsState {
  storeArtists: ArtistInt[];
}

const initialState: StoreArtistsState = {
  storeArtists: [],
};

export const artistSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {
    setStoreArtists: (state, action: PayloadAction<ArtistInt[]>) => {
      state.storeArtists = action.payload;
    },
  },
});

export const { setStoreArtists } = artistSlice.actions;

// selectors to be used to pull data down from redux store
export const selectStoreArtists = (state: RootState) =>
  state.artists.storeArtists;

export default artistSlice.reducer;
