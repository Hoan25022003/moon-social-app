import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import userReducer from "./users/userSlice";
import postReducer from "./posts/postSlice";

export const store = configureStore({
  reducer: combineReducers({
    auth: authReducer,
    users: userReducer,
    posts: postReducer,
  }),
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware(),
});
