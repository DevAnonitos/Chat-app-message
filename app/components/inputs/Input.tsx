'use client';

import React from 'react';
import clsx from "clsx";
import {
    FieldErrors,
    FieldValues,
    UseFormRegister
} from 'react-hook-form';

interface InputProps {
    label: string;
    id: string;
    type?: string;
    required?: string;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
    label,
    id,
    type,
    required,
    register,
    errors,
    disabled,
}) => {
    return (
        <>
            <label
                htmlFor={id}
                className='block text-md font-bold leading-6 text-gray-900 '
            >
                {label}
            </label>
            <div className='mt-2'>
                <input
                    type={type}
                    id={id}
                    autoComplete={id}
                    autoFocus
                    disabled={disabled}
                    {...register(id, {
                        required,
                    })}
                    className={clsx(
                        `
                        form-input block w-full rounded-lg
                        border-0 py-2.5 text-gray-900
                        shadow-sm ring-1 ring-inset px-6
                        ring-gray-300 placeholder:text-gray-400
                        focus:ring-2 focus:ring-inset focus:ring-[#35596c]
                        sm:text-sm sm:leading-6 transition-all duration-100`,
                        errors[id] && 'focus:ring-rose-500',
                        disabled && 'opacity-50 cursor-default',
                        'placeholder-padding' // Add padding placeholder class
                    )}
                />
            </div>
        </>
    );
};

export default Input;
