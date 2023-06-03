'use client';

import React, { Fragment, useMemo, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose, IoTrash } from "react-icons/io5";
import { Conversation, User } from "@prisma/client";
import { format } from "date-fns";

import useOtherUser from "@/app/hooks/useOtherUser";
import useActiveList from "@/app/hooks/useActiveList";

import Avatar from "@/app/components/Avatar";
import AvatarGroup from '@/app/components/AvatarGroup';
import ConfirmModal from "./ConfirmModal";

interface ProfileDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    data: Conversation & {
        users: User[],
    };
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
    isOpen,
    onClose,
    data,
}) => {

    const [confirmOpen, setConfirmOpen] = useState(false);

    return (
        <>
            <Transition.Root show={isOpen} as={Fragment}>
                <Dialog
                    as='div'
                    className="relative z-50"
                    onClose={onClose}
                >
                    Dark
                </Dialog>
            </Transition.Root>
        </>
    );
};

export default ProfileDrawer;
