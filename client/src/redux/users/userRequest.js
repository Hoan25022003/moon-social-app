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
        userInfo: { ...res.data?.userInfo, postCount: res.data?.postCount },
        yourSelf: res.data?.yourSelf,
      });
    } catch (error) {
      return rejectWithValue(true);
      // console.log(error);
    }
  }
);

export const userFriend = createAsyncThunk("users/friend", async () => {
  try {
    const res = await axios.get("/users", {
      headers: {
        authorization: "Bearer " + Cookies.get("tokens"),
      },
    });
    let { listUser, listFriend } = res.data;
    listUser = listUser.map((user) => {
      return verifyFriend(listFriend, user);
    });
    return listUser;
  } catch (error) {
    console.log(error);
  }
});

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
