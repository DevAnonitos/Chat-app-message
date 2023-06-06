"use client";

import React from 'react';
import axios from 'axios';
import useConversation from '@/app/hooks/useConversation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import MessageInput from './MessageInput';
import { CldUploadButton } from 'next-cloudinary';
import { HiPaperAirplane, HiPhoto } from 'react-icons/hi2';


const Form = () => {

    const { conversationId } = useConversation();

    const {
        register,
        handleSubmit,
        setValue,
        formState: {
            errors,
        },
    } = useForm<FieldValues>({
        defaultValues: {
            message: '',
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {

    };

    const handleUpload = (result: any) => {

    };

    return (
        <>
            <div
                className='py-4 px-4 bg-primary-700 flex
                items-center gap-2 lg:gap-4 w-full border-t-[1px]
                border-gray-500'
            >
                <CldUploadButton
                    options={{
                        maxFiles: 1,
                        maxFileSize: 10000000,
                    }}
                >
                    <HiPhoto
                        size={30}
                        className='text-white h-8 w-8'
                    />
                </CldUploadButton>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='flex items-center gap-2 lg:gap-4 w-full'
                >
                    <MessageInput
                        id='message'
                        register={register}
                        errors={errors}
                        required
                        placeholder='Write a message chat...'
                    />
                    <button
                        type='submit'
                        className='rounded-full p-2 bg-secondary-800
                        cursor-pointer hover:bg-secondary-500 transition'
                    >
                        <HiPaperAirplane
                            size={18}
                            className="text-white"
                        />
                    </button>
                </form>
            </div>
        </>
    );
};

export default Form;
