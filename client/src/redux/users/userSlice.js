import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "auth",
  initialState: {
    listUsers: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    getUserStart: (state) => {
      return {
        ...state,
        isFetching: true,
      };
    },
    getUserSuccess: (state, { payload }) => {
      return {
        ...state,
        isFetching: false,
        listUsers: payload,
      };
    },
  },
});

export const { getUserStart, getUserSuccess } = userSlice.actions;

export default userSlice.reducer;
