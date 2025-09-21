require("dotenv").config();
const express = require('express');
const cors = require('cors');
const { Server } = require("socket.io");
const authRoute = require("./Routes/authRoute");
const chatRoute = require("./Routes/chatRoute");
const messageRoute = require("./Routes/messageRoute");
const employeeRoute = require("./Routes/employeeRoute");
const { initializeFirebaseApp } = require('./DbManager/database');

let onlineUsers = [];

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);
app.use("/api/employees", employeeRoute);

initializeFirebaseApp();

const PORT = process.env.PORT || 4200;
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})


const io = new Server(server, { cors: { origin: "http://localhost:3000" } });
io.on("connection", (socket) => {
    socket.on("addNewUser", (userId) => {
        !onlineUsers.some((u) => u.userId == userId) &&
            onlineUsers.push({ userId, socketId: socket.id })

        io.emit("getOnlines", onlineUsers);
    });
    socket.on("sendMessage", (message) => {
        const user = onlineUsers.find((u) => u.userId !== message.recipientId)
        io.to(user.socketId).emit("getMessage", message);
    });
    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter((u) => u.socketId !== socket.id)
        io.emit("getOnlines", onlineUsers);
    });
})