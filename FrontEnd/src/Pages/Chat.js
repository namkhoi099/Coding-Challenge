import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../Context/ChatContext";
import { Container, Stack } from "react-bootstrap";
import { AuthContext } from "../Context/AuthContext";
import UserChat from "../Components/Chat/UserChat";
import ChatBox from "../Components/Chat/ChatBox";
import PotentialChat from "../Components/Chat/PotentialChat";

const Chat = () => {
    const { user } = useContext(AuthContext);
    const { chats, isChatsLoading, updateCurrentChat } = useContext(ChatContext);
    const [currentChat, setCurrentChat] = useState(null);

    return (
        <Container>
            <PotentialChat />
            {chats?.length < 1 ? null : (
                <Stack direction="horizontal" gap={4} className="align-items-start">
                    <Stack className="message-box flex-grow-0 pe-3" gap={3}>
                        {isChatsLoading && <p>Loading chats</p>}
                        {chats?.map((c, idx) => {
                            return (
                                <div key={idx} onClick={() => { updateCurrentChat(c); setCurrentChat(c) }}>
                                    <UserChat chat={c} user={user} />
                                </div>
                            )
                        })}
                    </Stack>
                    <ChatBox chat={currentChat} />
                </Stack>
            )}
        </Container>
    );
}

export default Chat;
