const mongoose = require("../config/connectDB");

const UserSchema = mongoose.Schema(
  {
    listMember: [
      {
        memberID: {
          type: String,
          ref: "users",
        },
        role: {
          type: String,
          default: "user",
        },
      },
    ],
    name: String,
    cover_image: String,
    detailInfo: Object,
  },
  { timestamps: true }
);

const UserModel = mongoose.model("groups", UserSchema);

module.exports = UserModel;
