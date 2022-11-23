import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import userReducer from "./users/userSlice";

export default configureStore({
  reducer: combineReducers({
    auth: authReducer,
    users: userReducer,
  }),
  // middleware: (gDM) => gDM().concat(logger),
});
