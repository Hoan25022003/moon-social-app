const asyncHandler = require("express-async-handler");
const UserModel = require("../models/UserModel");

const handleRegister = asyncHandler(async (req, res) => {
  try {
    const username = await UserModel.findOne({
      email: req.body.email,
    });
    if (username) res.sendStatus(401);
    else {
      await UserModel.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        gender: req.body.gender,
      });
      res.json({ mess: "Successful" });
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

const handleLogin = asyncHandler(async (req, res) => {
  try {
    const username = await UserModel.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    // console.log(username);
    if (username) res.json({ mess: "Login successful!" });
    else res.sendStatus(401);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

module.exports = { handleRegister, handleLogin };
