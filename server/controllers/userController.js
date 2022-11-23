const UserModel = require("../models/UserModel");
const asyncHandler = require("express-async-handler");

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const listUser = await UserModel.find({}, { password: 0 });
    res.json({ listUser });
  } catch (error) {
    res.status(500).json("Server error");
  }
});

module.exports = { getAllUsers };
