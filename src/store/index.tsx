import { configureStore } from "@reduxjs/toolkit";
import artistReducer from "./artistSlice";
import musicReducer from "./musicSlice";
import waveformReducer from "./waveformSlice";
import mobileViewReducer from "./mobileViewSlice";
import usersReducer from "./usersSlice";
import chatReducer from "./chatSlice";

const store = configureStore({
  reducer: {
    artists: artistReducer,
    music: musicReducer,
    waveform: waveformReducer,
    mobileView: mobileViewReducer,
    users: usersReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
