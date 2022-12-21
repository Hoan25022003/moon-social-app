const router = require("express").Router();
const UserModel = require("../models/UserModel");
const {
  handleRegister,
  handleLogin,
  handleLogout,
} = require("../controllers/authController");
// const verifyToken = require("../middleWare/verifyToken");

router.post("/register", handleRegister);

router.post("/login", handleLogin);

router.post("/logout", handleLogout);

module.exports = router;
