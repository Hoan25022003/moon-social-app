const mongoose = require("./connectDB");

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
    address: String,
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
