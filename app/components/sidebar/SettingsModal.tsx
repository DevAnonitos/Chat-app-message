"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Input from "../inputs/Input";
import Button from "../Button";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import { toast } from "react-hot-toast";

interface SettingsModalProps {
    isOpen?: boolean;
    onClose: () => void;
    currentUser: User;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
    isOpen,
    onClose,
    currentUser = {},
}) => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    console.log(currentUser, '&TEST_CURRENT_USER');

    return (
        <>
            setting
        </>
    );
};

export default SettingsModal;
