import { configureStore } from "@reduxjs/toolkit";
import userRootReducer from "./reducer/user";

export const store = configureStore({
    reducer: {
        userreducer: userRootReducer
    },
    devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
