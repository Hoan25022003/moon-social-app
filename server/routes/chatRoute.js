const router = require("express").Router();
const verifyToken = require("../middleWare/verifyToken");
const ChatModel = require("../models/ChatModel");

router.get("/", verifyToken, async (req, res) => {
  const username = req.username;
  try {
    let listChat = await ChatModel.find({
      show: true,
      participant: username._id,
    })
      .sort({ updatedAt: -1 })
      .populate("participant", [
        "_id",
        "email",
        "firstName",
        "lastName",
        "avatar",
      ]);
    //   if (listChat.length > 0) {
    //       listChat = listChat.map(chat => chat.participant.filter(user => user._id !== username._id))
    //   }
    res.json(listChat);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
