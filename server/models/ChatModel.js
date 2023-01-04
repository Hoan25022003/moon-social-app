const mongoose = require("../config/connectDB");

const ChatSchema = mongoose.Schema(
  {
    participant: [
      {
        type: String,
        ref: "users",
      },
    ],
    // groupID: {
    //   type: String,
    //   ref: "groups",
    // },
    latestMessage: {
      type: String,
      ref: "messages",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("chats", ChatSchema);
