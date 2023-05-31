"use client";

import React, { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Conversation, Message, User } from "@prisma/client";
import { format } from "date-fns";
import { useSession } from "next-auth/react";

import clsx from "clsx";
import useOtherUser from "@/app/hooks/useOtherUser";
import Avatar from "@/app/components/Avatar";
import AvatarGroup from "@/app/components/AvatarGroup";
import { FullConversationType } from "@/app/types";

interface ConversationBoxProps {
    data: FullConversationType,
    selected?: boolean,
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
    data,
    selected,
}) => {

    const otherUser = useOtherUser(data);
    const session = useSession();
    const router = useRouter();

    const handleClick = useCallback(() => {
        router.push(`/conversations/${data.id}`);
    }, [data, router]);

    const lastMessage = useMemo(() => {
        const messages = data.messages || [];

        return messages[messages.length - 1];
    }, [data.messages]);

    const userEmail = useMemo(() => session.data?.user?.email,
        [session.data?.user?.email]);

    const hasSeen = useMemo(() => {
        if (!lastMessage) {
            return false;
        }

        const seenArray = lastMessage.seen || [];

        if (!userEmail) {
            return false;
        }

        return seenArray
            .filter((user) => user.email === userEmail).length !== 0;
    }, [userEmail, lastMessage]);

    const lastMessageText = useMemo(() => {
        if (lastMessage?.image) {
            return 'Sent an image';
        }

        if (lastMessage?.body) {
            return lastMessage?.body
        }

        return 'Started a conversation';
    }, [lastMessage]);

    return (
        <>
            <div
                onClick={handleClick}
                className={clsx(`
                    w-full relative flex items-center
                    space-x-3 bg-primary-400 p-3 hover:opacity-80 hover:shadow-lg
                    rounded-2xl transition-all duration-300 ease-in-out
                    cursor-pointer mb-2
                `, selected ? 'bg-secondary-300' : 'bg-primary-400')}
            >
                {data.isGroup ? (
                    <AvatarGroup users={data.users} />
                ): (
                    <Avatar user={otherUser} />
                )}
                <div className="min-w-0 flex-1">
                    <div className="focus:outline-none">
                        <span className="absolute inset-0" aria-hidden="true" />
                        <div className="flex justify-between items-center mb-1">
                            <p className="text-md font-medium text-white">
                                {data.name || otherUser?.name}
                            </p>
                            {lastMessage?.createdAt && (
                                <p className="text-xs text-gray-400 font-light">
                                    {format(new Date(lastMessage.createdAt), 'p')}
                                </p>
                            )}
                        </div>
                        <p
                            className={clsx(`
                                truncate
                                text-sm
                            `, hasSeen ? 'text-gray-500' : 'text-[#fb8500] font-medium')}
                        >
                            {lastMessageText}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConversationBox;
