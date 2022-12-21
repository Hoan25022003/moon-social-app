const mongoose = require("../config/connectDB");

const ImageSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  link: {
    type: String,
    require: true,
  },
  userID: {
    type: String,
    ref: "users",
  },
  private: {
    type: Boolean,
    default: false,
  },
});

const ImageModel = mongoose.model("images", ImageSchema);

module.exports = ImageModel;
