const asyncHandler = require("express-async-handler");

const getUserFriend = asyncHandler(async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = { getUserFriend };
