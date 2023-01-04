import axios from "api/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { getUserProfile } from "./userSlice";

export const userProfile = createAsyncThunk(
  "user/info",
  async (userID, { rejectWithValue, fulfillWithValue }) => {
    try {
      const res = await axios.get("/users/" + userID, {
        headers: {
          authorization: "Bearer " + Cookies.get("tokens"),
        },
      });
      let { userInfo, postCount, yourSelf, listFriend } = res.data;
      if (!yourSelf) userInfo = verifyFriend(listFriend, userInfo);
      return fulfillWithValue({
        userInfo: {
          ...userInfo,
          postCount: postCount,
        },
        yourSelf: yourSelf,
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const userFriend = createAsyncThunk(
  "users/friend",
  async (
    { name, gender = "", status },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const res = await axios.get(
        `/users?name=${name || ""}&gender=${gender}`,
        {
          headers: {
            authorization: "Bearer " + Cookies.get("tokens"),
          },
        }
      );
      let { listUser, listFriend } = res.data;
      listUser = listUser.map((user) => verifyFriend(listFriend, user));
      if (status) listUser = listUser.filter((user) => user.status === status);
      return fulfillWithValue(listUser);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "users/update",
  async (data, { dispatch }) => {
    try {
      const formData = new FormData();
      for (const [key, value] of Object.entries(data)) {
        formData.append(key, value);
      }

      const res = await axios({
        method: "POST",
        url: "/users/update-info",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: "Bearer " + Cookies.get("tokens"),
        },
      });
      console.log("UPDATE USER SUCCESS: ", res.data);
      // dispatch(userProfile)
    } catch (err) {
      console.log("UPDATE USER ERROR: ", err);
    }
  }
);

function verifyFriend(listFriend, user) {
  const checkList = listFriend.filter((friend) => friend._id === user._id)[0];
  if (statusFriend(checkList?.isConfirmed) < 3) {
    return {
      ...user,
      status: statusFriend(checkList?.isConfirmed),
      isSender: checkList?.isSender,
    };
  }
  return {
    ...user,
    status: 3,
  };
}

function statusFriend(isConfirmed) {
  switch (isConfirmed) {
    case true:
      return 1;

    case false:
      return 2;

    default:
      return 3;
  }
}
