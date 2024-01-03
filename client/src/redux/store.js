import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";

export const store = configureStore({
  reducer: { user: userReducer },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // this here is disabled  to prevent some errors from happening
      serializableCheck: false,
    }),
});
