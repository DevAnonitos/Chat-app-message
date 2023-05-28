"use-client";

import React from "react";
import { User } from "@prisma/client";

interface UserListProps {
    items: User[];
}

const UserList: React.FC<UserListProps> = ({
    items,
}) => {
    return (
        <>
            <aside
                className=""
            >

            </aside>
        </>
    );
}

export default UserList;
