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

import { AiOutlineLink } from "react-icons/ai";
import Link from "next/link";
import ConversationBox from './ConversationBox';

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
            <aside className={clsx(`
                fixed inset-y-0 pb-20 lg:pb-0 lg:left-20
                lg:w-80 lg:block overflow-y-auto
                border-r border-gray-500
            `, isOpen ? 'hidden' : 'block w-full left-0')}
            >
                <div className='px-5 mt-16 lg:mt-0'>
                    <div className='flex items-center justify-between mb-4 pt-4'>
                        <div
                                onClick={() => setIsModalOpen(true)}
                                className="text-2xl font-bold
                                text-[#fff8e6] py-4 flex
                                items-center hover:underline cursor-pointer"
                            >
                            <Link
                                href="/conversations"
                                className="flex items-center"
                            >
                                <AiOutlineLink
                                    className="w-6 h-6 mr-1"
                                />
                                Messages
                            </Link>
                        </div>
                        <div
                            className='rounded-full h-12 w-12 p-2 bg-gray-100
                            text-gray-600 cursor-pointer hover:opacity-80
                            transition flex items-center justify-center'
                        >
                            <MdOutlineGroupAdd
                                className="w-6 h-6 flex items-center justify-center"
                            />
                        </div>
                    </div>
                    {items.map((item) => (
                        <ConversationBox
                            key={item.id}
                            data={item}
                            selected={conversationId === item.id}
                        />
                    ))}
                </div>
            </aside>
        </>
    );
};

export default ConservationList;
