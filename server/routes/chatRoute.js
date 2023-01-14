const router = require("express").Router();
const verifyToken = require("../middleWare/verifyToken");
const ChatModel = require("../models/ChatModel");
const MessageModel = require("../models/MessageModel");

router.get("/", verifyToken, async (req, res) => {
  const username = req.username;
  try {
    const listChat = await ChatModel.find({
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
        "isActive",
      ])
      .populate("latestMessage");
    res.json({ listChat, username });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  const username = req.username;
  try {
    const chatInfo = await ChatModel.findById(req.params.id).populate(
      "participant"
    );
    if (chatInfo) {
      const listMessage = await MessageModel.find({
        chatID: req.params.id,
      }).populate("sender");
      res.json({
        listMessage,
        participant: chatInfo.participant.filter(
          (user) => user._id.toString() != username._id
        )[0],
      });
    } else res.status(400).json("Have error");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
