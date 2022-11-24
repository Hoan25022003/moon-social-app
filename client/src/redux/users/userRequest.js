import { getUserStart, getUserSuccess } from "./userSlice";

export const getAllUser = async (accessToken, axiosJWT, dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await axiosJWT.get("/users", {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch(getUserSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};
