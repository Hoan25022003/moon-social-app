const router = require("express").Router();
const path = require("path");
const { getAllUsers } = require("../controllers/userController");
const UserModel = require("../models/UserModel");

router.get("/", getAllUsers);

module.exports = router;
