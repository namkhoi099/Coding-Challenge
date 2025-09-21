const { where, and } = require("firebase/firestore");
const db = require("../DbManager/database");
const COLLECTION_NAME = "Chats";

const createChat = async (req, res) => {
    try {
        const { firstUserId, secondUserId } = req.body;
        const chat = await db.findOne(COLLECTION_NAME, where("members", "array-contains", firstUserId))

        if (chat) return res.status(200).json(chat);

        const newChat = {
            members: [firstUserId, secondUserId]
        };

        await db.insert(COLLECTION_NAME, newChat);
        return res.status(200).json(newChat);
    } catch (error) {
        console.log("createChat", error);
        res.status(500).json(error);
    }
};

const findChats = async (req, res) => {
    try {
        const { userId } = req.body;
        const chats = await db.findAll(COLLECTION_NAME, where("members", "array-contains", userId))

        return res.status(200).json(chats);
    } catch (error) {
        console.log("findChats", error);
        res.status(500).json(error);
    }
}

const findChat = async (req, res) => {
    try {
        const { firstUserId, secondUserId } = req.body;
        const chat = await db.findOne(COLLECTION_NAME, and(where("members", "array-contains", firstUserId), where("members", "array-contains", secondUserId)))
        return res.status(200).json(chat);
    } catch (error) {
        console.log("findchat", error);
        res.status(500).json(error);
    }
}


module.exports = {
    createChat,
    findChat,
    findChats,
}