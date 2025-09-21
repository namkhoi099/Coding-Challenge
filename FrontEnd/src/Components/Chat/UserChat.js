import { Stack } from "react-bootstrap";
import { useFetchRecipient } from "../../Hooks/useFetchRecipient";
import { useContext } from "react";
import { ChatContext } from "../../Context/ChatContext";

const UserChat = ({ chat, user }) => {
    const { recipient } = useFetchRecipient(chat, user, "UC");
    const { onlineUsers } = useContext(ChatContext);
    const isOnline = onlineUsers?.some((u) => u?.userId === recipient?._id)
    return (
        <Stack direction="horizontal" gap={3} className="user-card align-items-center p-2 justify-content-between">
            <div className="d-flex">
                <div className="me-2">A</div>
                <div className="text-context">
                    <div className="name">{recipient?.name}</div>
                    <div className="text">Txt</div>
                </div>
            </div>
            <div className="d-flex flex-column align-items-end">
                <div className="date">
                    12/12/12
                </div>
                <div className="this-user-notifications">

                </div>
                <div className={isOnline ? "user-online" : ""}>

                </div>
            </div>
        </Stack>
    );
}

export default UserChat;
