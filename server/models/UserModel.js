const mongoose = require("../config/connectDB");

const UserSchema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    avatar: String,
    coverImg: String,
    detailInfo: Object,
    listSaved: [
      {
        type: String,
        ref: "posts",
      },
    ],
  },
  { timestamps: true }
);

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
