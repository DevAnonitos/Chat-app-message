"use client";

import React, { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Conversation, Message, User } from "@prisma/client";
import { format } from "date-fns";
import { useSession } from "next-auth/react";

import clsx from "clsx";
import Avatar from "@/app/components/Avatar";
import { FullConversationType } from "@/app/types";

interface ConversationBoxProps {
    data: FullConversationType,
    selected?: boolean,
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
    data,
    selected,
}) => {

    const session = useSession();
    const router = useRouter();

    const handleClick = useCallback(() => {
        router.push(`/conversations/${data.id}`);
    }, [data, router]);

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
                Conversations
            </div>
        </>
    );
};

export default ConversationBox;
