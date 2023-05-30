
import React from "react";
import getUsers from "../actions/getUsers";
import Sidebar from "../components/sidebar/Sidebar";


export default async function ConversationsLayout({
    children,
}: {
    children: React.ReactNode,
}) {
    return (
        // @ts-expect-error Server Component
        <Sidebar>
            <div className="h-full">
                {children}
            </div>
        </Sidebar>
    );
};
