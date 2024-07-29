import { configureStore } from "@reduxjs/toolkit";
import { reducer as auth } from "../slices/authSlice";
import { api } from "../api";

export const store = configureStore({
    reducer: {
        auth,
        [api.reducerPath]: api.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware)
})