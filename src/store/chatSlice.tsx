import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./index";

interface StoreChatTokenState {
  storeChatToken: string;
}

const initialState: StoreChatTokenState = {
  storeChatToken: "",
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setStoreChatToken: (state, action: PayloadAction<string>) => {
      state.storeChatToken = action.payload;
    },
  },
});

export const { setStoreChatToken } = chatSlice.actions;

// selectors to be used to pull data down from redux store
export const selectStoreChatToken = (state: RootState) =>
  state.chat.storeChatToken;

export default chatSlice.reducer;
