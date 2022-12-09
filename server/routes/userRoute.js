const router = require("express").Router();
const path = require("path");
const {
  getUserList,
  handleUpdateInfo,
  getUserDetail,
  getSavedList,
} = require("../controllers/userController");
const verifyToken = require("../middleWare/verifyToken");
const { upload } = require('../server');  

router.get("/", verifyToken, getUserList);

router.get("/:id", verifyToken, getUserDetail);

router.post("/saved-post", verifyToken, getSavedList);

router.put("/update-info", verifyToken, upload.array('profile', 2), handleUpdateInfo);

module.exports = router;
