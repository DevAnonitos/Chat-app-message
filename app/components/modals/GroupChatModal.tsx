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

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            members: [],
        },
    });

    const members = watch('members');

    const onSubmit: SubmitHandler<FieldValues> = (data) => {

    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2
                                className="text-base font-semibold
                                leading-7 text-gray-900"
                            >
                                Create a group chat
                            </h2>
                            <p
                                className="mt-1 text-sm
                                leading-6 text-gray-600"
                            >
                                Create a chat with more than 2 people.
                            </p>
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    );
}

export default GroupChatModal;
