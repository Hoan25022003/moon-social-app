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
const upload = require("../utils/uploadStorage");

router.get("/", verifyToken, getPostList);

router.get("/filter", verifyToken, getPostFilter);

router.post("/saved/:id", verifyToken, handleSavePost);

router.post(
  "/public",
  verifyToken,
  upload.array("publicImg", 10),
  handleCreatePost
);

router.post("/heart/:id", verifyToken, handleShowHeart);

router.delete("/:id", verifyToken, handleDeletePost);

module.exports = router;
