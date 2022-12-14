const router = require("express").Router();
const {
  handleCreatePost,
  getPostList,
  handleDeletePost,
  getPostFilter,
  handleSavePost,
  handleShowHeart,
} = require("../controllers/postController");
const verifyToken = require("../middleWare/verifyToken");

router.get("/", verifyToken, getPostList);

router.get("/filter", verifyToken, getPostFilter);

router.post("/saved/:id", verifyToken, handleSavePost);

router.post("/public", verifyToken, handleCreatePost);

router.post("/heart/:id", verifyToken, handleShowHeart);

router.delete("/:id", verifyToken, handleDeletePost);

module.exports = router;
