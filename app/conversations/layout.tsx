
import React from "react";
import getUsers from "../actions/getUsers";
import Sidebar from "../components/sidebar/Sidebar";
import ConservationList from "./components/ConversationList";


export default async function ConversationsLayout({
    children,
}: {
    children: React.ReactNode,
}) {

    const users = await getUsers();

    return (
        // @ts-expect-error Server Component
        <Sidebar>
            <div className="h-full">
                <ConservationList
                    users={users}
                    title="Messages"
                />
                {children}
            </div>
        </Sidebar>
    );
};
