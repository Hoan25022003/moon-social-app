import axios from "api/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ userData, ...others }) => {
    const { reset, setError } = { ...others };
    try {
      const res = await axios.post("/auth/login", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      reset({ email: "", password: "" });
      return res.data;
    } catch (error) {
      if (error.response.status === 400) {
        setError("email", { message: "" });
        setError("password", { message: "Email or password is not correct" });
      }
    }
  }
);

// export const registerUser = async (user, dispatch, { ...others }) => {
//   const { reset, navigate, initialValue, setShowAlert } = { ...others };
//   try {
//     await axios.post("/auth/register", user);
//     setShowAlert(true);
//     reset(initialValue);
//     navigate("/login");
//   } catch (error) {
//     error.response.status === 400 &&
//       dispatch(registerFailed({ email: "This email already existed" }));
//   }
// };

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ userData, ...others }) => {
    const { initialValue, reset, setError, navigate } = { ...others };
    try {
      const res = await axios.post("/auth/register", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      reset(initialValue);
      navigate("/login");
      return res.data;
    } catch (error) {
      if (error.response.status === 400)
        if (error.response.status === 400) {
          setError("email", { message: "This email already existed" });
        }
    }
  }
);

export const refreshToken = async (accessToken) => {
  try {
    const res = await axios.post("/auth/refresh", {
      withCredentials: false,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
