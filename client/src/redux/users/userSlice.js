import { createSlice } from "@reduxjs/toolkit";
import { getUserList, userProfile } from "./userRequest";

const userSlice = createSlice({
  name: "users",
  initialState: {
    listUsers: null,
    profile: {
      errorMessage: false,
      loading: false,
      userInfo: null,
      yourSelf: false,
    },
  },
  reducers: {
    getUserProfile: (state, { payload }) => {
      state.userProfile.userInfo = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userProfile.fulfilled, (state, { payload }) => {
        state.profile.loading = false;
        state.profile.userInfo = payload?.userInfo;
        state.profile.yourSelf = payload?.yourSelf;
        state.profile.error = false;
      })
      .addCase(userProfile.pending, (state) => {
        state.profile.loading = true;
        state.profile.error = false;
      })
      .addCase(userProfile.rejected, (state, { payload }) => {
        state.profile.loading = false;
        state.profile.error = payload;
      });
  },
});

export const { getUserProfile } = userSlice.actions;

export default userSlice.reducer;
