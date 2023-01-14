const router = require("express").Router();
const {
  handleCreatePost,
  getPostList,
  handleDeletePost,
  getPostFilter,
  handleSavePost,
  handleShowHeart,
  getPostPersonal,
  getPostFeature,
} = require("../controllers/postController");
const verifyToken = require("../middleWare/verifyToken");
const upload = require("../utils/uploadStorage");

router.get("/", verifyToken, getPostList);

router.get("/:id", verifyToken, getPostPersonal);

// router.get("/:id/:by", verifyToken, getPostFeature);

// router.get("/filter", verifyToken, getPostFilter);

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
