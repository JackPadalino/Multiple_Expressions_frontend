import { configureStore } from "@reduxjs/toolkit";
import artistReducer from "./artistSlice";
import musicReducer from "./musicSlice";
import waveformReducer from "./waveformSlice";
import mobileViewReducer from "./mobileViewSlice";
import chatReducer from "./chatSlice";

export const store = configureStore({
  reducer: {
    artists: artistReducer,
    music: musicReducer,
    waveform: waveformReducer,
    mobileView: mobileViewReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
