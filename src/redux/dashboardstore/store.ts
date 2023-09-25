import { configureStore } from "@reduxjs/toolkit";
import userRootReducer from "./reducer/user";
import manageticketRootReducer from "./reducer/managetickets";
import commentRootReducer from "./reducer/comments";

export const store = configureStore({
    reducer: {
        userreducer: userRootReducer,
        manageticketreducer: manageticketRootReducer,
        commentreducer: commentRootReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
