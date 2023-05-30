"use-client";

import React from "react";
import { User } from "@prisma/client";
import { AiOutlineLink } from "react-icons/ai";
import Link from "next/link";
import UserBox from "./UserBox";

interface UserListProps {
    items: User[];
}

const UserList: React.FC<UserListProps> = ({
    items,
}) => {
    return (
        <>
            <aside
                className="fixed inset-y-0 pb-20 lg:pb-0
                lg:left-20 lg:w-80 lg:block overflow-y-auto
                border-r border-gray-500 block w-full left-0"
            >
                <div className="px-5">
                    <div className="flex-col pt-3">
                        <div
                            className="text-2xl font-bold
                            text-[#fff8e6] py-4 flex
                            items-center hover:underline cursor-pointer"
                        >
                            <Link
                                href="/users"
                                className="flex items-center"
                            >
                                <AiOutlineLink
                                    className="w-6 h-6 mr-1"
                                />
                                Users
                            </Link>
                        </div>
                    </div>
                    {items.map((item) => (
                        <UserBox
                            key={item.id}
                            data={item}
                        />
                    ))}
                </div>
            </aside>
        </>
    );
}

export default UserList;
