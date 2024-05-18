const express = require("express");
const data = require("../data/data");
const router = express.Router();
const registerController = require("../controller/register");
const chatController = require("../controller/chatController");
const messageController = require("../controller/messageController");
const verifyJWT = require("../middleware/verifyJwt");
router.get("/chatData", (req, res) => {
  res.status(200).json({ data: data });
});

//authentication routes
router.post("/upload", registerController.upload.single("file"), (req, res) => {
  res.status(200).json({ data: req.file.filename });
});

router.post("/register", registerController.register);

router.post("/login", registerController.login);

//let protected routes

router.get("/", verifyJWT, registerController.allUser);
router.post("/accessChat", verifyJWT, chatController.accessChat);
router.get("/chats", verifyJWT, chatController.fetchChats);
router.post("/createGroup", verifyJWT, chatController.createGroup);
router.post("/renameGroup", verifyJWT, chatController.renameGroup);
router.post("/addtoGroup", verifyJWT, chatController.addToGroup);
router.post("/removeFromGroup", verifyJWT, chatController.removeFromGroup);

//message routes send message and get message

router.post("/sendMessage", verifyJWT, messageController.sendedMessage);
router.get("/allMessage", verifyJWT, messageController.allMessage);
module.exports = router;
