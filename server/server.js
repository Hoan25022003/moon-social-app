require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const multer = require("multer");
const { Server } = require("socket.io");
const http = require("http");
const { getCurrentUser, userJoin } = require("./utils/users");
const { formatComment } = require("./utils/formatComment");
const CommentModel = require("./models/CommentModel");
const PostModel = require("./models/PostModel");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("new connection");
  socket.on("join", ({ user, post }) => {
    const newUser = userJoin(socket.id, user, post);

    socket.join(newUser.post);

    socket.broadcast
      .to(user.post)
      .emit("typing", "Someone is typing a comment");
  });

  socket.on("sendComment", async (comment) => {
    const currentUser = getCurrentUser(socket.id);
    try {
      if (!comment) res.status(400).json("Please type full info");
      const { modeComment } = await PostModel.findById(currentUser.post.id);
      if (!modeComment) res.status(400).json("Mode comment is turned off");
      else {
        await CommentModel.create({
          ...req.body,
          userID: currentUser._id,
          postID: currentUser.post.id,
        });
        res.json("Create successful!");
      }
    } catch (error) {
      res.status(500).json(error);
    }

    io.to(currentUser.post).emit(
      "comment",
      formatComment(currentUser, comment)
    );
  });

  socket.on("deleteComment", async (commentId) => {
    const currentUser = getCurrentUser(socket.id);
    try {
      const deleteComment = await CommentModel.findById(commentId);
      if (currentUser._id !== deleteComment.userID) {
        return res.status(403).json("Unauthorized");
      }
      await CommentModel.deleteOne(commentId);
      io.to(currentUser.post).emit("deletedComment", commentId);
    } catch (err) {
      res.status(500).json("Server error");
    }
  });

  socket.on("disconnect", () => {
    console.log("User had left!!");
  });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "/public/uploads/"));
  },
  filename: (req, file, cb) => {
    const now = new Date().toISOString();
    const date = now.replace(/:/g, "-");
    cb(null, date + file.originalname);
  },
});

const upload = multer({
  storage,
});

module.exports = {
  upload,
};

app.use(cors({ origin: ["http://localhost:3000"] }));
app.use("/public", express.static(path.join(__dirname, "./public")));
// app.use(express.static(path.join(__dirname)));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.get("/", function (req, res) {
  res.send("Hello World!");
});
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/users", require("./routes/userRoute"));
app.use("/api/friends", require("./routes/friendRoute"));
app.use("/api/posts", require("./routes/postRoute"));
app.use("/api/comments", require("./routes/commentRoute"));

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
