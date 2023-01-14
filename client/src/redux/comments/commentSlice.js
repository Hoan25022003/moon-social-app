import { createSlice } from "@reduxjs/toolkit";
import { getCommentList } from "./commentRequest";

const commentSlice = createSlice({
  name: "comments",
  initialState: {
    getComment: {
      listComment: [],
      loading: false,
      error: false,
    },
    createComment: {
      success: false,
      loading: false,
      error: false,
    },
  },
  reducers: {
    newComment: (state, { payload }) => {
      state.getComment.listComment.unshift(payload);
    },
    deleteComment: (state, { payload }) => {
      const { listComment } = state.getComment;
      state.getComment.listComment = listComment.filter(
        (comment) => comment._id !== payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCommentList.fulfilled, (state, { payload }) => {
        state.getComment.listComment = payload;
        state.getComment.loading = false;
      })
      .addCase(getCommentList.pending, (state) => {
        state.getComment.loading = true;
        state.getComment.error = false;
      })
      .addCase(getCommentList.rejected, (state) => {
        state.getComment.loading = false;
        state.getComment.error = true;
      });
  },
});

export const { newComment, deleteComment } = commentSlice.actions;

export default commentSlice.reducer;
