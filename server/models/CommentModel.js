const mongoose = require("../connectDB");

const CommentSchema = mongoose.Schema(
  {
    content: String,
    like: Number,
    userID: {
      type: String,
      ref: "users",
    },
    postID: {
      type: String,
      ref: "posts",
    },
  },
  { timestamps: true }
);

const CommentUser = mongoose.model("comments", CommentSchema);

module.exports = CommentUser;
