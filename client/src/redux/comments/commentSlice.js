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
      state.getComment.listComment.push(payload);
    },
    deleteComment: (state, { payload }) => {
      state.getComment.listComment = state.getComment.listComment.filter(
        (comment) => comment._id !== payload
      );
    },
  },
  extraReducers: (builder) => {
    // builder
    //   .addCase(addNewComment.fulfilled, (state) => {
    //     state.createComment.success = true;
    //     state.createComment.loading = false;
    //   })
    //   .addCase(addNewComment.pending, (state) => {
    //     state.createComment.loading = true;
    //     state.createComment.error = false;
    //   })
    //   .addCase(addNewComment.rejected, (state) => {
    //     state.createComment.loading = false;
    //     state.createComment.error = true;
    //   });
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
