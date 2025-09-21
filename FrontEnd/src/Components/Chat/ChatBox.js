import { Button, Form, Stack } from "react-bootstrap";
import { useFetchRecipient } from "../../Hooks/useFetchRecipient";
import { useContext, useState, useCallback } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { ChatContext } from "../../Context/ChatContext";
import { BsFillSendFill } from "react-icons/bs";
import moment from "moment";

const ChatBox = (props) => {
    const currentChat = props.chat;
    const { user } = useContext(AuthContext);
    const { messages, isMessageLoading, sendMessage } = useContext(ChatContext);
    const { recipient } = useFetchRecipient(currentChat, user, "CB");
    const [textMessage, setTextMessage] = useState(null);

    if (!recipient)
        return (
            <p style={{ textAlign: "center", width: "100%" }}>
                No conversation selected
            </p>
        )

    const inputHandler = (e) => {
        const { value } = e.target;
        setTextMessage(value);
    };
    console.log(messages)
    return (
        <Stack gap={4} className="chat-box">
            <div className="chat-header">
                <strong>{recipient?.name}</strong>
            </div>
            <Stack gap={3} className="messages">
                {
                    messages?.map((m, idx) => {
                        return (
                            <Stack key={idx} className={`${messages.senderId !== user?._id
                                ? "messages self align-self-end flex-grow-0"
                                : "messages self align-self-start flex-grow-0"}`}>
                                <span>{m.text}</span>
                                <span className="message-footer">{moment(m.dateCreated).calendar()}</span>
                            </Stack>
                        )
                    })
                }
            </Stack>
            <Stack direction="horizontal" gap={3} className="chat-input flex-grow-0">
                <Form.Control type="text" placeholder="Enter your message" value={textMessage} onChange={inputHandler} />
                <Button variant="primary" id="btnSend" className="d-flex align-items-center" onClick={sendMessage}>
                    <BsFillSendFill />
                </Button>
            </Stack>
        </Stack>
    );
}

export default ChatBox;
