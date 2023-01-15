import { createSlice } from "@reduxjs/toolkit";
import { addNewPost, getPostList } from "./postRequest";

const postSlice = createSlice({
  name: "posts",
  initialState: {
    getPost: {
      listPost: [],
      loading: false,
      error: false,
    },
    createPost: {
      success: false,
      loading: false,
      error: false,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewPost.fulfilled, (state) => {
        state.createPost.success = true;
        state.createPost.loading = false;
      })
      .addCase(addNewPost.pending, (state) => {
        state.createPost.loading = true;
        state.createPost.error = false;
      })
      .addCase(addNewPost.rejected, (state) => {
        state.createPost.loading = false;
        state.createPost.error = true;
      });
    builder
      .addCase(getPostList.fulfilled, (state, { payload }) => {
        state.getPost.listPost = payload;
        state.getPost.loading = false;
      })
      .addCase(getPostList.pending, (state) => {
        state.getPost.loading = true;
        state.getPost.error = false;
      })
      .addCase(getPostList.rejected, (state) => {
        state.getPost.loading = false;
        state.getPost.error = true;
      });
  },
});

export default postSlice.reducer;
