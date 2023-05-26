import React from "react";
import Link from "next/link";
import clsx from "clsx";

interface MobileItemProps {
    href: string;
    icon: any;
    active?: boolean;
    onClick?: () => void;
}

const MobileItem: React.FC<MobileItemProps> = ({
    href,
    icon: Icon,
    active,
    onClick,
}) => {

    const handleClick = () => {
        if(onClick) {
            return onClick();
        }
    }

    return (
        <>
            <Link
                onClick={handleClick}
                href={href}
                className={clsx(`
                    group flex gap-x-3 text-sm leading-6
                    font-semibold w-full justify-center
                    p-4 text-white hover:text-gray-600
                    hover:bg-secondary-800 border-r-[1px] border-l-[1px]`,
                    active && 'bg-secondary-800 text-[#219ebc]'
                )}
            >
                <Icon className="h-6 w-6" />
            </Link>
        </>
    );
};

export default MobileItem;
