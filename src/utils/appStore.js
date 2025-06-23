import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import feedSlice from "./feedSlice";
import connectionsSlice from "./connectionSlice";
import requestsSlice from "./requestsSlice";

const AppStore = configureStore({
    reducer: {
        userSlice,
        feedSlice,
        connectionsSlice,
        requestsSlice,
    }
});

export default AppStore;
