const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");
const multer = require("multer");
const UserModel = require("../models/UserModel");
const {
  handleRegister,
  handleLogin,
} = require("../controllers/userController");

router.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json("Server error");
  }
});

router.post("/register", handleRegister);

router.post("/login", handleLogin);

module.exports = router;
