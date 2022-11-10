const router = require("express").Router();
const PostModel = require("../models/PostModel");

router.get("/", async (req, res) => {
  try {
    const listPost = await PostModel.find().populate("authorID", [
      "email",
      "firstName",
      "lastName",
    ]);
    //   .populate();
    res.json(listPost);
    // console.log(listPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/create-public", async (req, res) => {
  try {
    await PostModel.create({
      ...req.body,
      authorID: "63663512aaf9e3ff171b94a5",
      theme:
        req.body.type === "theme" && (req.body.theme || { type: "default" }),
    });
    res.json({ mess: "Successful" });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
