import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./index";
import { ArtistInt } from "../ints/ints";

// Define a type for the slice state
interface StoreArtistsState {
  storeArtists: ArtistInt[];
}

// Define the initial state using that type
const initialState: StoreArtistsState = {
  storeArtists: [],
};

export const artistSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {
    setStoreArtists: (state, action: PayloadAction<ArtistInt[]>) => {
      state.storeArtists = action.payload; // Directly assigning, consider immutability
    },
  },
});

export const { setStoreArtists } = artistSlice.actions;

const artistReducer = artistSlice.reducer;
export default artistReducer;

export const selectStoreArtists = (state: RootState) =>
  state.artist.storeArtists;
