const mongoose = require("../config/connectDB");

const ImageSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  images: [
    {
      type: String,
      require: true,
    },
  ],
  userID: {
    type: String,
    ref: "users",
  },
});

const ImageModel = mongoose.model("images", ImageSchema);

module.exports = ImageModel;
