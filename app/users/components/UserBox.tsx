"use client";

import React from "react";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";

import Avatar from "@/app/components/Avatar";
import LoadingModal from "@/app/components/modals/LoadingModal";

import { BsFillArrowUpRightCircleFill } from "react-icons/bs";

interface UserBoxProps {
    data: User;
}

const UserBox: React.FC<UserBoxProps> = ({
    data,
}) => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = useCallback(() => {
        setIsLoading(true);
    }, []);

    return (
        <>
            {isLoading && (
                <LoadingModal />
            )}
            <div
                onClick={() => {}}
                className="w-full relative flex items-center
                space-x-3 bg-primary-400 p-3 hover:opacity-80
                rounded-2xl transition cursor-pointer mb-2"
            >
                <Avatar user={data} />
                <div className="min-w-0 flex-1">
                    <div className="focus:outline-none">
                        <span
                            className="absolute inset-0"
                            aria-hidden="true"
                        />
                        <div className="flex justify-between items-center mb-1">
                            <p className="text-md font-medium text-white">
                                {data.name}
                            </p>
                            <BsFillArrowUpRightCircleFill
                                className="w-6 h-6 text-[#fb8500]"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserBox;
