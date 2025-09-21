import { useContext } from "react";
import { ChatContext } from "../../Context/ChatContext";
import { AuthContext } from "../../Context/AuthContext";

const PotentialChat = () => {
    const { user } = useContext(AuthContext);
    const { potentialChats, createChat, onlineUsers } = useContext(ChatContext);
    return (
        <div className="all-users">
            {potentialChats &&
                potentialChats?.map((p, idx) => {
                    return (
                        <div className="single-user" key={idx} onClick={() => createChat(user._id, p._id)}>
                            {p.name}
                            <span className={onlineUsers?.some((u) => u.userId === p?._id) ? "user-online" : ""}></span>
                        </div>
                    )
                })}
        </div>
    );
}

export default PotentialChat;
