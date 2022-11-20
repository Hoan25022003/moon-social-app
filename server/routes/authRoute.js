const router = require("express").Router();
const UserModel = require("../models/UserModel");
const {
  handleRegister,
  handleLogin,
  handleRefreshToken,
  handleLogout,
} = require("../controllers/authController");
const verifyToken = require("../middleWare/verifyToken");

router.get("/", verifyToken, async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json("Server error");
  }
});

router.post("/register", handleRegister);

router.post("/login", handleLogin);

router.post("/refresh", handleRefreshToken);

router.post("/logout", verifyToken, handleLogout);

module.exports = router;
