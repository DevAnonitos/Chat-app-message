"use-client";

import React, { useState } from "react";
import { User } from "@prisma/client";
import Image from "next/image";

interface AvatarProps {
    user?: User;
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {

    const [showAvatar, setShowAvatar] = useState(false);

    return (
        <>
            <div className="relative">
                <div
                    className="relative inline-block
                    rounded-full overflow-hidden
                    h-9 w-9 md:h-11 md:w-11"
                >
                    <Image
                        fill
                        src={user?.image || '/images/placeholder.jpg'}
                        alt="Avatar"
                    />
                </div>
            </div>
        </>
    );
}

export default Avatar;
