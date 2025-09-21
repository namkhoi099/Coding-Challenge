const express = require("express");
const router = express.Router();
const { sendMessage, getMessages } = require("../Controllers/messageController");

router.post("/sendmessage", sendMessage);
router.post("/getmessages", getMessages);

module.exports = router;