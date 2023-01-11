const router = require("express").Router();
const path = require("path");
const upload = require("../utils/uploadStorage");
const {
  getUserList,
  handleUpdateInfo,
  getUserDetail,
  handleDeleteImage,
  getChatList,
} = require("../controllers/userController");
const verifyToken = require("../middleWare/verifyToken");

router.get("/", verifyToken, getUserList);

// router.get("/chat", verifyToken, getChatList);

router.get("/:id", verifyToken, getUserDetail);

router.put(
  "/update-info",
  verifyToken,
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  handleUpdateInfo
);

router.delete("/image/:id", verifyToken, handleDeleteImage);

module.exports = router;
