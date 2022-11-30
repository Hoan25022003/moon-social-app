import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import userReducer from "./users/userSlice";

export const store = configureStore({
  reducer: combineReducers({
    auth: authReducer,
    users: userReducer,
  }),
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware(),
});
