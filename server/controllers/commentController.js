const asyncHandler = require("express-async-handler");
const CommentModel = require("../models/CommentModel");
const PostModel = require("../models/PostModel");

const getCommentByPostID = asyncHandler(async (req, res) => {
  const username = req.username;
  try {
    const listComment = await CommentModel.find({
      postID: req.params.id,
    }).populate("userID", ["_id", "firstName", "lastName", "avatar"]);
    res.json({ listComment });
  } catch (error) {
    res.status(500).json("Server error");
  }
});

const handleAddComments = asyncHandler(async (req, res) => {
  const username = req.username;
  try {
    if (!req.body) res.status(400).json("Please type full info");
    const { modeComment } = await PostModel.findById(req.params.id);
    if (!modeComment) res.status(400).json("Mode comment is turned off");
    else {
      await CommentModel.create({
        ...req.body,
        userID: username._id,
        postID: req.params.id,
      });
      res.json("Create successful!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = { getCommentByPostID, handleAddComments };
