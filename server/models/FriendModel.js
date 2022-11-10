const mongoose = require("../connectDB");

const FriendSchema = mongoose.Schema({
  from: {
    type: String,
    ref: "users",
    required: true,
  },
  to: {
    type: String,
    ref: "users",
    required: true,
  },
  status: {
    type: Number,
    default: 3,
  },
});

const FriendModel = mongoose.model("friends", FriendSchema);

module.exports = FriendModel;
