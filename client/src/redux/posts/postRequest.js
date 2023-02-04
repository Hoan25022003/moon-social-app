import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "api/axios";
import Cookies from "js-cookie";

export const addNewPost = createAsyncThunk(
  "posts/create",
  async ({ data, navigate, reset }) => {
    try {
      var formData = new FormData();
      const { type } = data;
      if (type === "image") {
        const { publicImg, content } = data;
        formData.append("content", content);
        formData.append("type", type);
        if (publicImg && publicImg.length > 0) {
          for (const img of publicImg) formData.append("publicImg", img);
        }
      } else if (type === "video") {
        for (const key in data) formData.append(key, data[key]);
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
        videoUpload: null,
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
