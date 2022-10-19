const mongoose = require("../connectDB");

const ChatSchema = mongoose.Schema(
  {
    users: [
      {
        type: String,
        ref: "users",
      },
    ],
    latestMessage: {
      type: String,
      ref: "user_message",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user_chat", ChatSchema);
