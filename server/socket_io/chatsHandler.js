const { getCurrentUser } = require("../utils/usersActive");

module.exports = function chatsHandler(socket, io) {
  socket.on("listChat", async () => {});
  socket.on("sendMessage", async (message) => {
    const currentUser = getCurrentUser(socket.id)[0];
  });
};
