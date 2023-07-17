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
import Select from "../inputs/Select";


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
        setIsLoading(true);

        axios.post(`/api/conversation`, {
            ...data,
            isGroup: true,
        })
        .then(() => {
            router.refresh();
            onClose();
        })
        .catch(() => toast.error('Something went wrong'))
        .finally(() => setIsLoading(false));
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2
                                className="text-base font-semibold
                                leading-7 text-white"
                            >
                                Create a group chat
                            </h2>
                            <p
                                className="mt-1 text-sm
                                leading-6 text-gray-600"
                            >
                                Create a chat with more than 2 people.
                            </p>
                            <div className="mt-1 text-sm leading-6 text-gray-600">
                                <Input
                                    disabled={isLoading}
                                    label="Name"
                                    id="name"
                                    errors={errors}
                                    required="isRequired in the field"
                                    register={register}
                                />
                                <Select
                                    disable={isLoading}
                                    label="Members"
                                    options={users.map((user) => ({
                                        value: user.id,
                                        label: user.name
                                    }))}
                                    onChange={(value) => setValue('members', value, {
                                        shouldValidate: true
                                    })}
                                    value={members}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-center gap-x-6">
                        <Button
                            disabled={isLoading}
                            onClick={onClose}
                            type="button"
                            secondary
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={isLoading}
                            type="submit"
                        >
                            Create
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    );
}

export default GroupChatModal;
