const { getCurrentUser, userJoin, removeUser } = require("../utils/usersJoin");
const { formatComment } = require("../utils/formatComment");
const CommentModel = require("../models/CommentModel");
const PostModel = require("../models/PostModel");
const UserModel = require("../models/UserModel");

module.exports = function commentHandler(socket, io) {
  socket.on("join", ({ user, post }) => {
    console.log("new user join");
    const newUser = userJoin(socket.id, user, post);
    socket.join(newUser.post);
  });

  socket.on("typing", () => {
    const currentUser = getCurrentUser(socket.id)[0];
    if (!currentUser) {
      return socket.emit("error", "Server error");
    }

    socket.broadcast.to(currentUser.post).emit("typing");
  });

  socket.on("stopTyping", () => {
    const currentUser = getCurrentUser(socket.id)[0];

    if (!currentUser) {
      return socket.emit("error", "Server error");
    }

    socket.broadcast.to(currentUser.post).emit("stopTyping");
  });

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
        const addComment = await CommentModel.create({
          ...comment,
          userID: currentUser.user,
          postID: currentUser.post,
        });
        const newComment = await CommentModel.findById(addComment._id).populate(
          "userID"
        );
        // console.log(newComment);
        // newComment.save(function (err, comment) {
        //   console.log(comment);
        //   newComment._id = comment._id;
        // });
        // const newComment = CommentModel.findById
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
    try {
      const deleteComment = await CommentModel.findById(commentId);
      console.log("DELETE COMMENT: ", deleteComment);
      console.log(currentUser.user);
      if (!deleteComment && currentUser.user !== deleteComment.userID) {
        return socket.emit("error", "Authorization");
      }
      await CommentModel.findByIdAndDelete(commentId);
      io.to(currentUser.post).emit("deletedComment", commentId);
    } catch (err) {
      console.log("DELETE COMMENT ERROR:", err);
      socket.emit("error", err);
    }
  });

  socket.on("remove-event-comment", () => {
    console.log("Turn off comment modal");
    removeUser(socket.id);
  });
};
