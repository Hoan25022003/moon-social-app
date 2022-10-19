const mongoose = require("../connectDB");

const MessageSchema = mongoose.Schema(
  {
    sender: {
      type: String,
      ref: "users",
    },
    chatId: {
      type: String,
      ref: "user_chat",
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

const MessageUser = mongoose.model("user_message", MessageSchema);

module.exports = MessageUser;
