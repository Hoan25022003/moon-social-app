import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "api/axios";
import Cookies from "js-cookie";

export const addNewPost = createAsyncThunk(
  "posts/create",
  async ({ data, navigate, reset }) => {
    try {
      if (data?.type === "image") {
        var formData = new FormData();
        const { content, publicImg, type } = data;
        formData.append("content", content);
        formData.append("type", type);
        if (publicImg && publicImg.length > 0) {
          for (const img of publicImg) formData.append("publicImg", img);
        }
      }
      await axios({
        method: "POST",
        url: "/posts/public",
        data: data?.type === "theme" ? data : formData,
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: "Bearer " + Cookies.get("tokens"),
        },
      });
      reset({
        content: "",
        theme: "",
        publicImg: null,
      });
      setTimeout(() => {
        navigate(0);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  }
);

export const getPostList = createAsyncThunk(
  "posts/list",
  async (query = "") => {
    try {
      const res = await axios.get("/posts" + query, {
        headers: {
          authorization: "Bearer " + Cookies.get("tokens"),
        },
      });
      return res.data.listPost;
    } catch (error) {
      console.log(error);
    }
  }
);
