const mongoose = require("../connectDB");

const MessageSchema = mongoose.Schema(
  {
    sender: {
      type: String,
      ref: "users",
    },
    chatID: {
      type: String,
      ref: "chats",
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

const MessageUser = mongoose.model("messages", MessageSchema);

module.exports = MessageUser;
