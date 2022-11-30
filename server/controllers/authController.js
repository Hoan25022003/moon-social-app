const UserModel = require("../models/UserModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: "1h",
  });
}

const handleLogin = asyncHandler(async (req, res) => {
  try {
    const username = await UserModel.findOne({
      email: req.body.email,
    });
    if (username) {
      const result = await bcrypt.compare(req.body.password, username.password);
      if (result) {
        const { _id, firstName, lastName, email, avatar } = username._doc;
        const token = generateToken({
          _id,
          firstName,
          lastName,
          email,
          avatar,
        });
        res.cookie("tokens", token, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });

        res.json({ _id, firstName, lastName, email, avatar, token });
      } else res.sendStatus(400);
    } else res.sendStatus(400);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

// const handleRefreshToken = async (req, res) => {
//   try {
//     const refreshToken = req.cookies.refreshToken;
//     console.log(71, refreshToken);
// !refreshToken && res.status(401);
//     // if (!refreshTokens.includes(refreshToken))
//     //   res.status(403).json({ mess: "Token is not available" });
//     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//       if (err) res.status(403);
//       refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
//       const newTokens = generateToken(user);
//       refreshTokens.push(newTokens.refreshToken);
//       res.cookie("refreshToken", newTokens.refreshToken, {
//         httpOnly: true,
//         secure: false,
//         path: "/",
//         sameSite: "strict",
//       });
//       res.json({ accessToken: newTokens.accessToken });
//     });
//   } catch (error) {
//     res.status(500);
//     throw new Error(error);
//   }
// };

const handleLogout = asyncHandler((req, res) => {
  try {
    res.clearCookie("tokens");
    res.json({ mess: "Logout Successful" });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = {
  handleRegister,
  handleLogin,
  handleLogout,
};
