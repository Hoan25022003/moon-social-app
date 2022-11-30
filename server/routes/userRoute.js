const router = require("express").Router();
const path = require("path");
const {
  getUserList,
  handleUpdateInfo,
  getUserDetail,
  getSavedList,
} = require("../controllers/userController");
const verifyToken = require("../middleWare/verifyToken");

router.get("/", verifyToken, getUserList);

router.get("/:id", verifyToken, getUserDetail);

router.post("/saved-post", verifyToken, getSavedList);

router.put("/update-info", verifyToken, handleUpdateInfo);

module.exports = router;
