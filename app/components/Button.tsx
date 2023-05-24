
import React from 'react';
import clsx from 'clsx';

interface ButtonProps {
    type?: "button" | "submit" | "reset" | undefined;
    fullWidth?: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
    secondary?: boolean | undefined;
    danger?: boolean | undefined;
    disabled?: boolean | undefined;
};

const Button: React.FC<ButtonProps> = ({
    type = "button",
    fullWidth,
    children,
    onClick,
    secondary,
    danger,
    disabled,
}) => {
    return (
        <div>
            <button
                onClick={onClick}
                type={type}
                disabled={disabled}
                className={clsx(`
                    flex justify-center rounded-2xl px-3 py-2.5 text-md
                    font-semibold focus-visible:outline focus-visible:outline-2
                    focus-visible:outline-offset-2
                    `,
                    disabled && 'opacity-50 cursor-default',
                    fullWidth && 'w-full',
                    secondary ? 'text-gray-900' : 'text-white',
                    danger && 'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600',
                    !secondary && !danger && 'bg-secondary-500 hover:bg-primary-400 focus-visible:outline-sky-600'
                )}
            >
                {children}
            </button>
        </div>
    )
};

export default Button;

