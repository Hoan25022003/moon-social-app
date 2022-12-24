require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const { userJoin, removeUser } = require("./utils/usersActive");
const commentHandler = require("./socket_io/commentHandler");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

/* Configuration */
app.use(cors({ origin: ["http://localhost:3000"] }));
app.use("/public", express.static(path.join(__dirname, "./public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

/* Main route */
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/users", require("./routes/userRoute"));
app.use("/api/friends", require("./routes/friendRoute"));
app.use("/api/posts", require("./routes/postRoute"));
app.use("/api/comments", require("./routes/commentRoute"));

/* Socket handler */
io.on("connection", (socket) => {
  console.log("new connection");
  socket.on("join", ({ user, post }) => {
    const newUser = userJoin(socket.id, user, post);

    socket.join(newUser.post);

    socket.broadcast
      .to(user.post)
      .emit("typing", "Someone is typing a comment");
  });

  commentHandler(socket, io);

  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log("User had left!!");
  });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
