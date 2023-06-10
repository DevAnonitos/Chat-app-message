'use client';

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";
import { User } from "@prisma/client";

import Input from "../inputs/Input";
import Modal from "./Modal";
import Button from "../Button";
import { toast } from "react-hot-toast";


interface GroupChatModalProps {
    isOpen?: boolean;
    onClose: () => void;
    users: User[];
}

const GroupChatModal: React.FC<GroupChatModalProps> = ({
    isOpen,
    onClose,
    users = [],
}) => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                
            </Modal>
        </>
    );
}

export default GroupChatModal;
