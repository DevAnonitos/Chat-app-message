"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

import React from "react";

interface MessageInputProps {
    placeholder?: string;
    id: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors;
}

const MessageInput: React.FC<MessageInputProps> = ({
    placeholder,
    id,
    type,
    required,
    register,
}) => {
    return (
        <>
            <div className="relative w-full">
                <input
                    id={id}
                    type={type}
                    autoComplete={id}
                    {...register(id, {
                        required,
                    })}
                    placeholder={placeholder}
                    className="text-black font-base py-2 px-4
                    bg-white w-full rounded-full focus:outline-none"
                />
            </div>
        </>
    );
};

export default MessageInput;
