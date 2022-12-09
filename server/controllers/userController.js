const asyncHandler = require("express-async-handler");
const UserModel = require("../models/UserModel");
const PostModel = require("../models/PostModel");
const fs = require("fs");
const ImageModel = require("../models/imageModel");

let monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function searchListByName(name) {
  return {
    $regex: name,
    $options: "i",
  };
}

const getUserList = asyncHandler(async (req, res) => {
  try {
    const username = req.username;
    const { gender, name } = req.query;
    const filterQuery = (query) => query && { query };
    const listUser = await UserModel.find(
      {
        $or: [
          {
            firstName: searchListByName(name || ""),
          },
          {
            lastName: searchListByName(name || ""),
          },
        ],
        ...filterQuery(gender),
      },
      { password: 0 }
    );
    res.json(listUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

const getUserDetail = asyncHandler(async (req, res) => {
  const username = req.username;
  try {
    const userDetail = await UserModel.findById(req.params.id);
    if (userDetail) {
      const dateJoin =
        monthNames[userDetail?.createdAt.getMonth()] +
        " " +
        userDetail?.createdAt.getFullYear();
      res.json({
        userInfo: { ...userDetail._doc, createdAt: dateJoin },
        yourSelf: username.email == userDetail.email,
      });
    } else res.status(400).json("User ID is not valid");
  } catch (error) {
    res.status(500).json(error);
  }
});

const getSavedList = asyncHandler(async (req, res) => {
  try {
    const username = req.username;
    const userInfo = await UserModel.findById(username._id)
      .populate("listSaved")
      .populate("avatar")
      .populate("coverImg");
    res.json({ listSaved: userInfo.listSaved });
  } catch (error) {
    res.status(500).json({ error });
  }
});

const handleUpdateInfo = asyncHandler(async (req, res) => {
  try {
    const username = req.username;
    const files = req.files;
    console.log(files);
    let newAvatar;
    let newCoverImg;
    if (files) {
      const [avatar, cover] = files;
      const avatarImg = fs.readFileSync(avatar.path);
      newAvatar = new ImageModel({
        name: avatar.filename,
        image: Buffer.from(avatarImg).toString("base64"),
      });
      await newAvatar.save();
      // fs.unlink(
      //   __dirname + `/public/uploads/${username.avatar.name}`,
      //   function (err) {
      //     console.log("file deleted unsuccessfully", err);
      //   }
      // );

      const coverImg = fs.readFileSync(cover.path);
      newCoverImg = new ImageModel({
        name: cover.filename,
        image: Buffer.from(coverImg).toString("base64"),
      });
      await newCoverImg.save();
    }

    await UserModel.findByIdAndUpdate(username._id, {
      avatar: newAvatar || username.avatar || "",
      coverImg: newCoverImg || username.coverImg || "",
      firstName: req.body.firstName || username.firstName,
      lastName: req.body.lastName || username.lastName,
      detailInfo: {
        birthday: req.body.birthday || "",
        workAt: req.body.workAt || "",
        desc: req.body.desc || "",
      },
    });
    res.json(`Update info successful`);
  } catch (error) {
    res.status(500).json("Server error");
  }
});

module.exports = { getUserList, handleUpdateInfo, getUserDetail, getSavedList };
