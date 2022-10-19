const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/moon-project");

module.exports = mongoose;
