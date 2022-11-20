const UserModel = require("../models/UserModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

let refreshTokens = [];

const handleRegister = asyncHandler(async (req, res) => {
  try {
    const username = await UserModel.findOne({
      email: req.body.email,
    });
    if (username) res.sendStatus(400);
    else {
      const hash = await bcrypt.hash(req.body.password, 10);
      await UserModel.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        gender: req.body.gender,
      });
      res.json({ mess: "Successful" });
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

function generateToken(payload) {
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "60s",
  });
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
}

const handleLogin = asyncHandler(async (req, res) => {
  try {
    const username = await UserModel.findOne({
      email: req.body.email,
    });
    if (username) {
      const result = await bcrypt.compare(req.body.password, username.password);
      if (result) {
        const tokens = generateToken(req.body);
        res.cookie("refreshToken", tokens.refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        refreshTokens.push(tokens.refreshToken);
        const { password, ...others } = username._doc;

        res.json({ ...others, accessToken: tokens.accessToken });
      } else res.sendStatus(400);
    } else res.sendStatus(400);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

const handleRefreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    !refreshToken && res.status(401);
    if (!refreshTokens.includes(refreshToken))
      res.status(403).json({ mess: "Token is not available" });
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) res.status(403);
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      const { email, password } = user;
      const newTokens = generateToken({ email, password });
      refreshTokens.push(newTokens.refreshToken);
      res.cookie("refreshToken", newTokens.refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      res.json({ accessToken: newTokens.accessToken });
    });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
};

const handleLogout = (req, res) => {
  refreshTokens = refreshTokens.filter(
    (token) => token !== req.cookies.refreshToken
  );
  res.clearCookie("refreshToken");
  res.json({ mess: "Logout Successful" });
};

module.exports = {
  handleRegister,
  handleLogin,
  handleRefreshToken,
  handleLogout,
};
