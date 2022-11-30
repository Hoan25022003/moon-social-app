import axios from "api/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserProfile } from "./userSlice";
import Cookies from "js-cookie";

export const userProfile = createAsyncThunk(
  "user/info",
  async (userID, { rejectWithValue, fulfillWithValue }) => {
    try {
      const res = await axios.get("/users/" + userID, {
        headers: {
          authorization: "Bearer " + Cookies.get("tokens"),
        },
      });
      return fulfillWithValue({
        userInfo: res.data?.userInfo,
        yourSelf: res.data?.yourSelf,
      });
    } catch (error) {
      return rejectWithValue(true);
      // console.log(error);
    }
  }
);

export const getUserList = createAsyncThunk("users/list", async ({ token }) => {
  try {
    const res = await axios.get("/users", {
      headers: {
        authorization: "Bearer " + Cookies.get("tokens"),
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
});
