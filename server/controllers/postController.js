const asyncHandler = require("express-async-handler");
const PostModel = require("../models/PostModel");
const UserModel = require("../models/UserModel");

function checkSavedPost(listPost, listSaved) {
  return listPost.map((post) => ({
    ...post._doc,
    saved: listSaved.includes(post._id),
  }));
}

const getPostList = asyncHandler(async (req, res) => {
  const { listSaved } = req.username;
  try {
    const listPost = await PostModel.find().populate("authorID", [
      "_id",
      "email",
      "firstName",
      "lastName",
      "avatar",
    ]);
    res.json({ listPost: checkSavedPost(listPost, listSaved) });
  } catch (error) {
    res.status(500).json(error);
  }
});

const getPostFilter = asyncHandler(async (req, res) => {
  const { query, comment } = req.query;
  try {
    let conditionFilter = {};
    if (!query) res.status(400).json("Please type key word to search!");
    else {
      conditionFilter.modeComment = comment || true;
      const listPost = await PostModel.find({
        content: {
          $regex: req.query?.query || "",
          $options: "i",
        },
        ...conditionFilter,
      });
      res.json({ listPost: checkSavedPost(listPost, req.username.listSaved) });
    }
  } catch (error) {
    res.status(500).json("Server error");
  }
});

const handleCreatePost = asyncHandler(async (req, res) => {
  const username = req.username;
  try {
    const { type } = req.body;
    if (type === "theme") {
      await PostModel.create({
        ...req.body,
        authorID: username._id,
        theme: req.body.theme || { type: "default" },
      });
      res.json({ mess: "Create success post theme" });
    } else if (type === "image") {
      const file = req.files;
      console.log(file);
      // await PostModel.create({
      //   ...req.body,
      //   authorID: username._id
      // })
    } else res.status(400).json("Invalid post type");
  } catch (error) {
    res.status(500).json({ error, mess: "Error server" });
  }
});

const handleShowHeart = asyncHandler(async (req, res) => {
  try {
    const username = req.username;
    const postInfo = await PostModel.findById(req.params.id);
    if (!postInfo) res.status(400).json("Id post is invalid");
    else {
      let listHeart = postInfo.listHeart;
      const userIndex = listHeart.indexOf(username._id);
      userIndex === -1
        ? listHeart.push(username._id)
        : listHeart.splice(userIndex, 1);
      await PostModel.findByIdAndUpdate(req.params.id, {
        listHeart,
      });
      res.json({ postInfo });
    }
  } catch (error) {
    res.status(500).json("Server error");
  }
});

const handleSavePost = asyncHandler(async (req, res) => {
  const username = req.username;
  try {
    const postInfo = await PostModel.findById(req.params.id);
    if (!postInfo) res.status(400).json("Id post is invalid");
    else {
      let listSaved = username.listSaved;
      const postIndex = listSaved.indexOf(req.params.id);
      postIndex === -1
        ? listSaved.push(req.params.id)
        : listSaved.splice(postIndex, 1);
      await UserModel.findByIdAndUpdate(username._id, {
        listSaved,
      });
      res.json(username);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

const handleDeletePost = asyncHandler(async (req, res) => {
  try {
    await PostModel.findByIdAndDelete(req.params.id);
    res.json("Delete successful");
  } catch (error) {
    res.status(500).json("Server error");
  }
});

module.exports = {
  handleCreatePost,
  getPostList,
  handleDeletePost,
  handleShowHeart,
  getPostFilter,
  handleSavePost,
};
