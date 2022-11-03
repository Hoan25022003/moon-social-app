const mongoose = require("../connectDB");

const FiendSchema = mongoose.Schema({
  yourID: {
    type: String,
    ref: "users",
  },
  listFriend: [
    {
      userID: {
        type: String,
        ref: "users",
      },
      status: {
        type: Number,
        default: 3,
      },
      isSender: Boolean,
    },
  ],
});

const FriendUser = mongoose.model("user_friend", FiendSchema);

module.exports = FriendUser;
