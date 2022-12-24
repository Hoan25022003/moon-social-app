const router = require("express").Router();
const path = require("path");
const upload = require("../utils/uploadStorage");
const {
  getUserList,
  handleUpdateInfo,
  getUserDetail,
  getSavedList,
} = require("../controllers/userController");
const verifyToken = require("../middleWare/verifyToken");

router.get("/", verifyToken, getUserList);

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

module.exports = router;
