const mongoose = require("../connectDB");

const ChatSchema = mongoose.Schema(
  {
    participant: [
      {
        type: String,
        ref: "users",
      },
    ],
    friendID: {
      type: String,
      ref: "friends",
    },
    groupID: {
      type: String,
      ref: "groups",
    },
    latestMessage: {
      type: String,
      ref: "messages",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("chats", ChatSchema);
