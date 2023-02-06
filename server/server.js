require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const UserModel = require("./models/UserModel");
const chatsHandler = require("./socket_io/chatsHandler");
const commentHandler = require("./socket_io/commentHandler");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.URL_CLIENT,
  },
});

/* Configuration */
app.use(cors({ origin: [process.env.URL_CLIENT] }));
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
app.use("/api/chats", require("./routes/chatRoute"));

/* Socket handler */
io.on("connection", (socket) => {
  socket.on("client-connect", async (currentUser) => {
    if (!currentUser) return;
    try {
      await UserModel.findByIdAndUpdate(currentUser._id, {
        isActive: true,
      });
      const listActive = await UserModel.find(
        {
          isActive: true,
        },
        {
          listSaved: 0,
          coverImg: 0,
          detailInfo: 0,
          password: 0,
        }
      );
      socket.broadcast.emit("user-active", listActive);
    } catch (error) {
      socket.emit("error", error);
    }
  });

  socket.on("client-disconnect", async (currentUser) => {
    if (!currentUser) return;
    try {
      await UserModel.findByIdAndUpdate(currentUser._id, {
        isActive: false,
      });
      const listActive = await UserModel.find(
        {
          isActive: true,
        },
        {
          listSaved: 0,
          coverImg: 0,
          detailInfo: 0,
          password: 0,
        }
      );
      socket.broadcast.emit("user-active", listActive);
    } catch (error) {
      socket.emit("error", error);
    }
  });

  socket.on("logout-active", async (currentUser) => {
    if (!currentUser) return;
    try {
      await UserModel.findByIdAndUpdate(currentUser._id, {
        isActive: false,
      });
      const listActive = await UserModel.find(
        {
          isActive: true,
        },
        {
          listSaved: 0,
          coverImg: 0,
          detailInfo: 0,
          password: 0,
        }
      );
      socket.broadcast.emit("user-active", listActive);
    } catch (error) {
      socket.emit("error", error);
    }
  });

  chatsHandler(socket, io);

  commentHandler(socket, io);

  socket.on("disconnect", async (reason) => {
    console.log("User 1 disconnected because " + reason);
  });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
