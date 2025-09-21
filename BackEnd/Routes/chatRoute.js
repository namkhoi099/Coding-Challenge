const express = require("express");
const router = express.Router();
const { createChat, findChats, findChat } = require("../Controllers/chatController");

router.post("/createchat", createChat);
router.post("/findchats", findChats);
router.post("/findchat", findChat);

module.exports = router;