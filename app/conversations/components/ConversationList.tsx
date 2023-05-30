'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { MdOutlineGroupAdd } from 'react-icons/md';


import clsx from 'clsx';
import { find, uniq } from 'lodash';
import { pusherClient } from '@/app/libs/pusher';
import { FullConversationType } from '@/app/types';
import { useSession } from 'next-auth/react';
import useConversation from '@/app/hooks/useConversation';


interface ConservationListProps {
    initialItems: FullConversationType[],
    users: User[],
    title: string,
}

const ConservationList: React.FC<ConservationListProps> = ({
    initialItems,
    users,
}) => {

    const [items, setItems] = useState(initialItems);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const router = useRouter();
    const session = useSession();

    const { conversationId, isOpen } = useConversation();

    const pusherKey = useMemo(() => {
        return session.data?.user?.email;
    }, [session.data?.user?.email]);

    useEffect(() => {
        if(!pusherKey) {
            return;
        }

        pusherClient.subscribe(pusherKey);

        const updateHandler = (conversation: FullConversationType) => {
            setItems((current) => current.map((currentConversation) => {
                if(currentConversation.id === conversation.id) {
                    return {
                        ...currentConversation,
                        messages: conversation.messages,
                    };
                }

                return currentConversation;
            }));
        };

        const newHandler = (conversation: FullConversationType) => {
            setItems((current) => {
                if(find(current, { id: conversation.id })) {
                    return current;
                }

                return [conversation, ...current];
            });
        };

        const removeHandler = (conversation: FullConversationType) => {
            setItems((current) => {
                return [...current.filter((convo) =>
                    convo.id !== conversation.id
                )];
            });
        };

        pusherClient.bind('conversation:update', updateHandler);
        pusherClient.bind('conversation:new', newHandler);
        pusherClient.bind('conversation:remove', removeHandler);
    }, [pusherKey, router]);

    return (
        <>

        </>
    );
};

export default ConservationList;
