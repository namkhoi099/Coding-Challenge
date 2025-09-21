import { createContext, useCallback, useEffect, useState } from "react";
import { postAsync } from "../Utils/services";
import { io } from "socket.io-client"

export const ChatContext = createContext()

export const ChatContextProvider = ({ children, user }) => {
    const [chats, setChats] = useState(null);
    const [isChatsLoading, setIsChatsLoading] = useState(false);
    const [chatsError, setChatsError] = useState(null);
    const [potentialChats, setPotentialChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState(null);
    const [isMessagesLoading, setIsMessagesLoading] = useState(false);
    const [messagesError, setMessagesError] = useState(null);
    const [newMessages, setNewMessages] = useState(null);
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        const newSocket = new io("http://localhost:4200");
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        }
    }, [user])

    useEffect(() => {
        if (!socket) return;

        socket.emit("addNewUser", user?._id);

        socket.on("getOnlineUsers", (res) => {
            setOnlineUsers(res);
        })

        return () => {
            socket.off("getOnlineUsers");
        }
    }, [socket])

    useEffect(() => {
        if (!socket) return;
        const recipientId = currentChat?.members.find((id) => id !== user?._id);
        socket.emit("sendMessage", { ...messages, recipientId });
    }, [newMessages])

    useEffect(() => {
        if (!socket) return;
        socket.on("getMessage", (res) => {
            if (currentChat?._id !== res.chatId) return;

            setMessages((prev) => [...prev, res]);
        })

        return () => {
            socket.off("getMessage");
        }
    }, [socket, currentChat])

    useEffect(() => {
        const getUsers = async () => {
            const resp = await postAsync("auth/findusers", {});
            const pChats = resp.filter((f) => {
                let isChatCreated = false;

                if (user?._id === f._id) return false;

                if (chats) {
                    isChatCreated = chats?.some((c) => {
                        return c.members.includes(f._id);
                    })
                }
                return !isChatCreated;
            })
            setPotentialChats(pChats);
        }

        getUsers();
    }, [chats]);

    useEffect(() => {
        const getChats = async () => {
            if (user?._id) {
                setIsChatsLoading(true);
                const result = {
                    userId: user._id
                }
                const resp = await postAsync("chats/findchats", result);
                setIsChatsLoading(false);
                setChats(resp);
            }
        }

        getChats();
    }, [user]);

    useEffect(() => {
        const getMessages = async () => {
            if (!currentChat?._id) return;
            setIsMessagesLoading(true);
            const result = {
                chatId: currentChat?._id
            }
            const resp = await postAsync("messages/getmessages", result);
            setIsMessagesLoading(false);
            setMessages(resp);
        }
        getMessages();
    }, [currentChat]);

    const sendMessage = useCallback(async (textMessage, sender, currentChatId, setTextMessage) => {
        if (!textMessage) return console.log("Error");

        const result = {
            chatId: currentChatId,
            senderId: sender._id,
            text: textMessage
        }
        const resp = await postAsync("messages/sendmessage", result);
        setNewMessages(resp);
        setTextMessage("");
        setMessages((prev) => [...prev, resp]);
    }, [])

    const createChat = useCallback(async (firstUserId, secondUserId) => {
        const result = { firstUserId, secondUserId };
        const resp = await postAsync("chats/createchat", result);

        setChats((prev) => [...prev, resp]);
    }, [])

    const updateCurrentChat = useCallback((c) => {
        setCurrentChat(c);
    }, [])

    return (
        <ChatContext.Provider
            value={{
                chats,
                isChatsLoading,
                chatsError,
                potentialChats,
                createChat,
                updateCurrentChat,
                messages,
                isMessagesLoading,
                sendMessage,
                onlineUsers,
            }}
        >
            {children}
        </ChatContext.Provider>
    )
};