import axios from "api/axios";
import { getUserStart, getUserSuccess } from "./userSlice";

export const getAllUser = async (accessToken, dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await axios.get("/users");
    dispatch(getUserSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};
