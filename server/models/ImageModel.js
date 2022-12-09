const mongoose = require("mongoose");

const ImageSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
});

const ImageModel = mongoose.model("images", ImageSchema);

module.exports = ImageModel;
