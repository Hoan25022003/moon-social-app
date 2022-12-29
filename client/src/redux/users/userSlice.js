import { createSlice } from "@reduxjs/toolkit";
import { getUserList, userFriend, userProfile } from "./userRequest";

const initProfile = {
  loading: false,
  userInfo: null,
  yourSelf: false,
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState: {
    listUsers: null,
    profile: initProfile,
    friend: {
      loading: false,
      error: null,
      listUsers: null,
      filters: {},
    },
  },
  reducers: {
    // getListImage: (state, {payload}) => {
    //   state.profile.userInfo.listUpload
    // },
    filterUser: (state, { payload }) => {
      state.friend.filters = { ...state.friend.filters, ...payload };
    },
    resetProfile: (state) => {
      state.profile = initProfile;
    },
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
      .addCase(userFriend.rejected, (state, { payload }) => {
        state.friend.loading = false;
        state.friend.error = payload;
      });
  },
});

export const { resetProfile, filterUser } = userSlice.actions;

export default userSlice.reducer;
