import { useEffect, useState } from "react";
import { postAsync } from "../Utils/services";

export const useFetchRecipient = (chat, user, test) => {
    const [recipient, setRecipient] = useState(null);
    const [error, setError] = useState(null);
    const recipientId = chat?.members?.find((id) => id !== user?._id);

    useEffect(() => {
        const getUser = async () => {
            if (!recipientId) return null;

            const result = {
                userId: recipientId
            }
            const resp = await postAsync("auth/finduser", result);
            setRecipient(resp);
        }

        getUser();
    }, [recipientId, chat])
    return { recipient, error }
};