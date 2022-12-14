const { getCurrentUser } = require("../utils/usersActive");
const { formatComment } = require("../utils/formatComment");
const CommentModel = require("../models/CommentModel");
const PostModel = require("../models/PostModel");

module.exports = function commentHandler(socket, io) {
  socket.on("sendComment", async (comment) => {
    const currentUser = getCurrentUser(socket.id);
    console.log(currentUser);
    try {
      if (!comment) res.status(400).json("Please type full info");
      const { modeComment } = await PostModel.findById(currentUser.post.id);
      if (!modeComment) res.status(400).json("Mode comment is turned off");
      else {
        await CommentModel.create({
          ...req.body,
          userID: currentUser._id,
          postID: currentUser.post.id,
        });
        res.json("Create successful!");
      }
    } catch (error) {
      res.status(500).json(error);
    }

    io.to(currentUser.post).emit(
      "comment",
      formatComment(currentUser, comment)
    );
  });

  socket.on("deleteComment", async (commentId) => {
    const currentUser = getCurrentUser(socket.id);
    try {
      const deleteComment = await CommentModel.findById(commentId);
      if (currentUser._id !== deleteComment.userID) {
        return res.status(403).json("Unauthorized");
      }
      await CommentModel.deleteOne(commentId);
      io.to(currentUser.post).emit("deletedComment", commentId);
    } catch (err) {
      res.status(500).json("Server error");
    }
  });
};
