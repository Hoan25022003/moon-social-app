const { getCurrentUser } = require("../utils/usersActive");
const { formatComment } = require("../utils/formatComment");
const CommentModel = require("../models/CommentModel");
const PostModel = require("../models/PostModel");
const UserModel = require("../models/UserModel");

module.exports = function commentHandler(socket, io) {
  socket.on("sendComment", async (comment) => {
    const currentUser = getCurrentUser(socket.id)[0];
    try {
      if (!comment || !currentUser) {
        return socket.emit("error", "Server error");
      }
      const post = await PostModel.findById(currentUser.post);
      if (!post?.modeComment) {
        return socket.emit("error", "Server error");
      } else {
        const newComment = new CommentModel({
          ...comment,
          userID: currentUser.user,
          postID: currentUser.post,
        });
        newComment.save(function (err, comment) {
          newComment._id = comment._id;
        });
        const user = await UserModel.findById(currentUser.user);
        io.to(currentUser.post).emit(
          "comment",
          formatComment(user, newComment)
        );
      }
    } catch (err) {
      socket.emit("error", err);
    }
  });

  socket.on("deleteComment", async (commentId) => {
    const currentUser = getCurrentUser(socket.id)[0];
    console.log("CURRENT USER:", currentUser);
    try {
      const deleteComment = await CommentModel.findById(commentId);
      console.log("DELETE COMMENT: ", deleteComment);
      if (currentUser.user !== deleteComment.userID) {
        return socket.emit("error", "Authorization");
      }
      await CommentModel.deleteOne({ _id: commentId });
      io.to(currentUser.post).emit("deletedComment", commentId);
    } catch (err) {
      console.log("DELETE COMMENT ERROR:", err);
      socket.emit("error", err);
    }
  });
};
