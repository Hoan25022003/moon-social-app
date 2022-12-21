import { createSlice } from "@reduxjs/toolkit";
import { getUserList, userFriend, userProfile } from "./userRequest";

const userSlice = createSlice({
  name: "users",
  initialState: {
    listUsers: null,
    profile: {
      error: false,
      loading: false,
      userInfo: null,
      yourSelf: false,
    },
    friend: {
      loading: false,
      error: false,
      listUsers: null,
    },
  },
  reducers: {
    // getUserProfile: (state, { payload }) => {
    //   state.userProfile.userInfo = payload;
    // },
  },
  extraReducers: (builder) => {
    // Personal profile
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

    // Friend list
    builder
      .addCase(userFriend.fulfilled, (state, { payload }) => {
        state.friend.listUsers = payload;
        state.friend.loading = false;
      })
      .addCase(userFriend.pending, (state) => {
        state.friend.loading = true;
        state.friend.error = false;
      })
      .addCase(userFriend.rejected, (state) => {
        state.friend.loading = false;
        state.friend.error = true;
      });
  },
});

// export const { getUserProfile } = userSlice.actions;

export default userSlice.reducer;
