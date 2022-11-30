const router = require("express").Router();
const { getUserFriend } = require("../controllers/friendController");
const verifyToken = require("../middleWare/verifyToken");

router.get("/", verifyToken, getUserFriend);

module.exports = router;
