import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  storeChatToken: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChatToken: (state, action) => {
      state.storeChatToken = action.payload;
    },
  },
});

export const { setChatToken } = chatSlice.actions;

export default chatSlice.reducer;
