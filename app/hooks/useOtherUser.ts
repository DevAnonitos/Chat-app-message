import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { FullConversationType } from "../types";
import { User } from "@prisma/client";

const useOtherUser = (conversation: FullConversationType | { users: User[] }) => {
    const session = useSession();

    const currentUserEmail = session.data?.user?.email;
    const conversationUsers = conversation?.users ?? [];

    const otherUser = useMemo(() => {
        const filteredUsers = conversationUsers.filter((user) =>
            user.email !== currentUserEmail
        );
        return filteredUsers[0] || null;
    }, [currentUserEmail, conversationUsers]);

    return otherUser;
};

export default useOtherUser;
