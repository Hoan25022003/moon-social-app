const ChatModel = require("../models/ChatModel");
const MessageModel = require("../models/MessageModel");

module.exports = function chatsHandler(socket, io) {
  socket.on("join-chat", (chatID) => {
    socket.join(chatID);
  });

  socket.on("send-message", async (message) => {
    try {
      const { chatID } = message;
      const addMessage = await MessageModel.create(message);
      const newMessage = await MessageModel.findById(addMessage._id).populate(
        "sender"
      );
      if (newMessage) {
        await ChatModel.findByIdAndUpdate(chatID, {
          latestMessage: newMessage._id,
        });
        io.to(chatID).emit("receive-message", newMessage);
      } else socket.emit("error", "Can't send message");
    } catch (error) {
      socket.emit("error", error);
    }
  });

  socket.on("remove-message", async ({ chatID, messageID }) => {
    try {
      const removeMessage = await MessageModel.findByIdAndDelete(messageID);
      if (removeMessage) {
        const listMessage = await MessageModel.find({ chatID });
        await ChatModel.findByIdAndUpdate(chatID, {
          latestMessage: listMessage[listMessage.length - 1]._id,
        });
        io.to(chatID).emit("receive-again", removeMessage);
      } else socket.emit("error", "Catch error");
    } catch (error) {
      socket.emit("error", error);
    }
  });

  socket.on("send-info", async ({ yourID, userInfo }) => {
    try {
      const listChat = await ChatModel.find({
        participant: { $all: [yourID, userInfo._id] },
      });
      if (listChat[0]) io.sockets.emit("receive-info", userInfo._id);
    } catch (error) {
      socket.emit("error", error);
    }
  });
};
