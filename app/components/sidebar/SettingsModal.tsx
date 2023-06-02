"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Input from "../inputs/Input";
import Button from "../Button";
import Image from "next/image";
import Modal from "../modals/Modal";
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
    currentUser,
}) => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    console.log(currentUser, '&TEST_CURRENT_USER');

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
            name: currentUser?.name,
            image: currentUser?.image,
        },
    });

    const image = watch('image');
    const handleUpload = (result: any) => {
        setValue('image', result.info.secure_url, {
            shouldValidate: true,
        });
    };

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        // Axios

    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2
                                className="text-2xl font-semibold leading-7
                                text-white"
                            >
                                Profile
                            </h2>
                            <p
                                className="mt-2 text-sm font-medium
                                leading-6 text-[#fb8500]"
                            >
                                Edit your public information.
                            </p>

                            <div className="mt-10 flex flex-col gap-y-8">
                                <Input
                                    disabled={isLoading}
                                    label="Name"
                                    id="name"
                                    errors={errors}
                                    required=""
                                    register={register}
                                />
                                <div>
                                    <label
                                        htmlFor="photo"
                                        className="block text-md font-medium
                                        leading-6 text-[#219ebc]"
                                    >
                                        Photo
                                    </label>

                                    <div className="mt-2 flex items-center gap-x-3">
                                        <Image
                                            width="48"
                                            height="48"
                                            className="rounded-full cursor-pointer"
                                            src={
                                                image || currentUser?.image
                                                || '/images/placeholder.jpg'
                                            }
                                            alt="avt"
                                        />
                                        <CldUploadButton
                                            options={{
                                                maxFiles: 1,
                                                maxFileSize: 10000000,
                                            }}
                                            onUpload={handleUpload}
                                            uploadPreset="dfdfeutqe"
                                        >
                                            <Button
                                                disabled={isLoading}
                                                secondary
                                                type="button"
                                            >
                                                Change
                                            </Button>
                                        </CldUploadButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end">
                        <Button
                            disabled={isLoading}
                            secondary
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={isLoading}
                            type="submit"
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default SettingsModal;
