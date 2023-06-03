'use client';

import React, { useMemo, useState } from "react";
import { HiChevronLeft } from "react-icons/hi2";
import { HiEllipsisHorizontalCircle } from "react-icons/hi2";
import Link from "next/link";

import { Conversation, User } from "@prisma/client";
import useOtherUser from "@/app/hooks/useOtherUser";
import useActiveList from "@/app/hooks/useActiveList";

import Avatar from "@/app/components/Avatar";
import AvatarGroup from "@/app/components/AvatarGroup";
import ProfileDrawer from "./ProfileDrawer";

interface HeaderProps {
    conversation: Conversation & {
        users: User[],
    };
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {

    const otherUser = useOtherUser(conversation);
    const [drawerOpen, setDrawerOpen] = useState();

    const { members } = useActiveList();
    const isActive = members.indexOf(otherUser?.email!) !== -1;

    const statusText = useMemo(() => {
        if(conversation.isGroup) {
            return `${conversation.users.length} members`;
        }

        return isActive ? "Active" : "Offline";
    }, [conversation, isActive]);


    return (
        <>
            {/* <ProfileDrawer /> */}
            <div
                className="bg-primary-700 w-full flex
                border-b-[1px] sm:px-4 py-3 px-4 justify-between
                items-center shadow-sm border-gray-500"
            >
                <div className="flex gap-3 items-center cursor-pointer">
                    <Link
                        href="/conversations"
                        className="lg:hidden block text-white border-[1px] rounded-full
                        hover:text-gray-300 transition cursor-pointer"
                    >
                        <HiChevronLeft  size={32} />
                    </Link>
                    {conversation.isGroup
                        ? (
                            <AvatarGroup
                                users={conversation.users}
                            />
                        ) : (
                            <Avatar
                                user={otherUser}
                            />
                        )
                    }
                    <div className="flex flex-col">
                        <div className="flex items-center text-white">
                            {conversation.name || otherUser.name}
                        </div>
                        <div className="text-sm font-medium text-[#fb8500]">
                            {statusText}
                        </div>
                    </div>
                </div>
                <HiEllipsisHorizontalCircle
                    size={32}
                    onClick={() => setDrawerOpen(true)}
                    className="text-white cursor-pointer 
                    hover:text-gray-300 transition"
                />
            </div>
        </>
    );
};

export default Header;
