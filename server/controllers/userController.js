const asyncHandler = require("express-async-handler");
const removeTones = require("../utils/removeTones");
const UserModel = require("../models/UserModel");
const PostModel = require("../models/PostModel");
const FriendModel = require("../models/FriendModel");
const ImageModel = require("../models/ImageModel");
const cloudinary = require("../config/cloudinary");
const shuffleArray = require("../utils/shuffleArray");
const ChatModel = require("../models/ChatModel");

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

async function getAllFriend(username) {
  const listFriend = await FriendModel.find({
    $or: [
      {
        from: username._id,
      },
      { to: username._id },
    ],
  }).populate(["from", "to"]);
  var listUser = [];
  listFriend.map((item) => {
    if (item.from.email === username.email)
      listUser = [
        ...listUser,
        { ...item.to._doc, isConfirmed: item.isConfirmed, isSender: true },
      ];
    else
      listUser = [
        ...listUser,
        { ...item.from._doc, isConfirmed: item.isConfirmed, isSender: false },
      ];
  });
  return listUser;
}

function searchListByName(str, name) {
  // return {
  //   $regex: removeTones(name),
  //   $options: "i",
  // };
  return removeTones(str.toLowerCase()).includes(
    removeTones(name.toLowerCase())
  );
}

const getUserList = asyncHandler(async (req, res) => {
  const username = req.username;
  try {
    const { gender, name, status } = req.query;
    const filterQuery = (key, query) => query && { [key]: query };
    // console.log(filterQuery(gender));
    let listUser = await UserModel.find(
      {
        email: { $ne: username.email },
        // $or: [
        //   {
        //     firstName: searchListByName(name || ""),
        //   },
        //   {
        //     lastName: searchListByName(name || ""),
        //   },
        // ],
        ...filterQuery("gender", gender),
      },
      { password: 0 }
    );
    if (name)
      listUser = listUser.filter(
        (user) =>
          searchListByName(user.firstName, name) ||
          searchListByName(user.lastName, name)
      );
    const listFriend = await getAllFriend(username);
    res.json({ listUser, listFriend });
  } catch (error) {
    res.status(500).json(error);
  }
});

const getUserDetail = asyncHandler(async (req, res) => {
  const username = req.username;
  try {
    const userDetail = await UserModel.findById(req.params.id, { password: 0 });
    if (userDetail) {
      const dateJoin =
        monthNames[userDetail?.createdAt.getMonth()] +
        " " +
        userDetail?.createdAt.getFullYear();
      const postCount = await PostModel.find({
        authorID: req.params.id,
      }).count();
      const listUpload = await ImageModel.find({
        userID: req.params.id,
      });
      const listFriend = await getAllFriend(username);
      res.json({
        userInfo: { ...userDetail._doc, createdAt: dateJoin, listUpload },
        listFriend,
        yourSelf: username.email == userDetail.email,
        postCount,
      });
    } else res.status(400).json("User ID is not valid");
  } catch (error) {
    res.status(500).json(error);
  }
});

const handleDeleteImage = asyncHandler(async (req, res) => {
  try {
    if (req.body.yourSelf) {
      await ImageModel.findByIdAndDelete(req.params.id);
      res.json("Delete success image");
    } else res.status(400).json("Delete failed");
  } catch (error) {
    res.status(500).json(error);
  }
});

const handleUpdateInfo = asyncHandler(async (req, res) => {
  try {
    const username = req.username;
    const files = req.files;
    // console.log(files);
    let newAvatar;
    let newCoverImg;
    if (files) {
      const { avatar, cover } = files;

      if (avatar) {
        const data = await cloudinary.upload(avatar[0].path, {
          folder: "moon-stars",
        });
        newAvatar = new ImageModel({
          name: data.original_filename,
          link: data.url,
          public_id: data.public_id,
          userID: username._id,
        });
        await newAvatar.save();
      }

      if (cover) {
        const data = await cloudinary.upload(cover[0].path, {
          folder: "moon-stars",
        });
        console.log("COVER IMAGE: ", data);
        newCoverImg = new ImageModel({
          name: data.original_filename,
          link: data.url,
          public_id: data.public_id,
          userID: username._id,
        });
        await newCoverImg.save();
      }
    }

    console.log("NEW COVER IMAGE: ", newCoverImg);

    await UserModel.findByIdAndUpdate(username._id, {
      avatar: newAvatar.link || username.avatar || "",
      coverImg: newCoverImg.link || username.coverImg || "",
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

module.exports = {
  getUserList,
  getUserDetail,
  handleUpdateInfo,
  handleDeleteImage,
};
