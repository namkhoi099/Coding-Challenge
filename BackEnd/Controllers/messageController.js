const { where } = require("firebase/firestore");
const db = require("../DbManager/database");
const COLLECTION_NAME = "Messages";

const sendMessage = async (req, res) => {
    try {
        const { chatId, senderId, text } = req.body;
        const message = { chatId, senderId, text };
        await db.insert(COLLECTION_NAME, message);
        res.status(200).json(message);
    } catch (error) {
        console.log("sendMessage", error);
        res.status(500).json(error);
    }
};

const getMessages = async (req, res) => {
    try {
        const { chatId } = req.body;
        const message = await db.findAll(COLLECTION_NAME, where("chatId", "==", chatId))
        res.status(200).json(message);
    } catch (error) {
        console.log("getMessages", error);
        res.status(500).json(error);
    }
};
module.exports = {
    sendMessage,
    getMessages
}