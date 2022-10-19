const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");
const multer = require("multer");
const UserModel = require("../models/UserModel");

router.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json("Server error");
  }
});

router.post("/register", async (req, res) => {
  try {
    await UserModel.create({
      firstName: req.body.first,
      lastName: req.body.last,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(200).json({ mess: "Successful" });
  } catch (error) {
    res.status(500).json({ mess: "Server error" });
  }
});

module.exports = router;
