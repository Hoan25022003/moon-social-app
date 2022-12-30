import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "api/axios";
import Cookies from "js-cookie";

export const getCommentList = createAsyncThunk(
  "comments/list",
  async (postId = "") => {
    try {
      const res = await axios.get("/comments/" + postId, {
        headers: {
          authorization: "Bearer " + Cookies.get("tokens"),
        },
      });
      return res.data.listComment;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addNewPost = createAsyncThunk("comments/create", (data) => {});
