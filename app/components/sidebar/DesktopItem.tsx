import React from "react";
import Link from "next/link";
import clsx from "clsx";

interface DesktopItemProps {
    label: string;
    icon: any;
    href: string;
    onClick?: () => void;
    active?: boolean;
};

const DesktopItem: React.FC<DesktopItemProps> = ({
    label,
    icon: Icon,
    href,
    onClick,
    active,
}) => {

    const handleClick = () => {
        if (onClick) {
            return onClick;
        };
    };

    return (
        <>
            <li onClick={handleClick} key={label}>
                <Link
                    href={href}
                    className={clsx(`group flex gap-x-3
                        rounded-full p-3 text-sm leading-6 font-semibold
                        text-white hover:text-gray-600
                        transition-all duration-200 ease-in-out
                        hover:bg-secondary-800 shadow-lg`,
                        active && 'bg-gray-100 text-[#219ebc] shadow-lg'
                    )}
                >
                    <Icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                    <span className="sr-only">
                        {label}
                    </span>
                </Link>
            </li>
        </>
    );
}

export default DesktopItem;
