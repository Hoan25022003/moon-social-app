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
      ref: "user_posts",
    },
  },
  { timestamps: true }
);

const CommentUser = mongoose.model("user_comments", CommentSchema);

module.exports = CommentUser;
