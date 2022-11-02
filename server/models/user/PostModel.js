const mongoose = require("../connectDB");

const PostSchema = mongoose.Schema(
  {
    title: String,
    listImg: [{ type: String }],
    theme: String || Object,
    content: String,
    listHeart: [
      {
        type: String,
        ref: "users",
      },
    ],
    type: {
      type: String,
      enum: ["theme", "image", "video"],
    },
    modeComment: { type: Boolean, default: true },
    linkVideo: String,
    authorID: {
      type: String,
      ref: "users",
    },
  },
  { timestamps: true }
);

const PostUser = mongoose.model("user_posts", PostSchema);

module.exports = PostUser;
