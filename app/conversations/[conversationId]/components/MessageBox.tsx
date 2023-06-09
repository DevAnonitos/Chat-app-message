'use client';

import React, { useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { FullMessageType } from "@/app/types";

import Avatar from "@/app/components/Avatar";
import ImageModal from "./ImageModal";


interface MessageBoxProps {
    data: FullMessageType;
    isLast?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({
    data,
    isLast,
}) => {

    const session = useSession();
    const [imgModalOpen, setImgModalOpen] = useState(false);

    const isOwn = session.data?.user?.email === data?.sender?.email;

    const seenList = (data.seen || [])
        .filter((user) => user.email !== data?.sender?.email)
        .map((user) => user.name)
        .join(', ');

    const container = clsx('flex gap-3 p-4', isOwn && 'justify-end');
    const avatar = clsx(isOwn && "order-2");
    const body = clsx('flex flex-col gap-2', isOwn && 'items-end');
    const message  = clsx(
        'text-sm w-fit overflow-hidden',
        isOwn ?'bg-white text-black' : 'bg-gray-100',
        data.image ? "rounded-md p-0" : "rounded-full py-2 px-3",
    );

    return (
        <div>
            MessageBox
        </div>
    );
}

export default MessageBox;
