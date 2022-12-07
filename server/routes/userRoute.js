const router = require("express").Router();
const path = require("path");
const {
  getUserList,
  handleUpdateInfo,
  getUserDetail,
} = require("../controllers/userController");
const verifyToken = require("../middleWare/verifyToken");

router.get("/", verifyToken, getUserList);

router.get("/:id", verifyToken, getUserDetail);

router.put("/update-info", verifyToken, handleUpdateInfo);

module.exports = router;
