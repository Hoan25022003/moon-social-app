const asyncHandler = require("express-async-handler");
const cloudinary = require("../config/cloudinary");
const ImageModel = require("../models/ImageModel");
const PostModel = require("../models/PostModel");
const UserModel = require("../models/UserModel");

function checkSavedAndLiked(listPost, username) {
  const { listSaved, _id } = username;
  return listPost.map((post) => ({
    ...post._doc,
    saved: listSaved.includes(post._id),
    isLiked: post.listHeart.includes(_id),
  }));
}

const getPostList = asyncHandler(async (req, res) => {
  const username = req.username;
  try {
    const listPost = await PostModel.find().populate("authorID", [
      "_id",
      "email",
      "firstName",
      "lastName",
      "avatar",
    ]);
    res.json({ listPost: checkSavedAndLiked(listPost, username) });
  } catch (error) {
    res.status(500).json(error);
  }
});

const getPostPersonal = asyncHandler(async (req, res) => {
  const username = req.username;
  try {
    const { id } = req.params;
    const { by } = req.query;
    const userInfo = await UserModel.findById(id);
    if (userInfo) {
      const condition = !by ? { authorID: id } : {};
      let listPost = await PostModel.find(condition).populate("authorID", [
        "_id",
        "email",
        "firstName",
        "lastName",
        "avatar",
      ]);
      let listNewPost;
      if (by) {
        listNewPost = checkSavedAndLiked(listPost, userInfo).filter((post) => {
          if (by === "liked") return post.isLiked;
          return post.saved;
        });
      } else listNewPost = checkSavedAndLiked(listPost, username);
      res.json({
        listPost: listNewPost,
      });
    } else res.status(400).json("User invalid");
  } catch (error) {
    res.status(500).json(error);
  }
});

const getPostFeature = asyncHandler(async (req, res) => {
  const username = req.username;
  try {
    const { id, by } = req.params;
    const userInfo = await UserModel.findById(id);
    if (userInfo) {
      const listPost = await PostModel.find().populate("authorID", [
        "_id",
        "email",
        "firstName",
        "lastName",
        "avatar",
      ]);
      const listNewPost = checkSavedAndLiked(listPost, userInfo).filter(
        (post) => {
          if (by === "liked") return post.isLiked;
          return post.saved;
        }
      );
    } else res.status(400).json("Invalid user");
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
        theme: req.body.theme || { linkImg: null },
      });
      res.json({ mess: "Create success post theme" });
    } else if (type === "image") {
      const files = req.files;
      var listImg = [];
      for (const file of files) {
        const data = await cloudinary.upload(file.path, {
          folder: "moon-stars",
        });
        await ImageModel.create({
          name: data.original_filename,
          link: data.url,
          userID: username._id,
        });
        listImg.push(data.url);
      }
      await PostModel.create({
        ...req.body,
        authorID: username._id,
        listImg,
      });
      res.json("Add success post");
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
      res.json("Saved success");
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
  getPostList,
  getPostFilter,
  getPostPersonal,
  getPostFeature,
  handleCreatePost,
  handleDeletePost,
  handleShowHeart,
  handleSavePost,
};
