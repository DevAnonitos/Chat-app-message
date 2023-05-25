import React from "react";

async function Sidebar({ children }: {
    children: React.ReactNode,
}) {

    return (
        <>
            <div className="h-full bg-primary-700">
                <main className="lg:pl-20 h-full">
                    {children}
                </main>
            </div>
        </>
    );
};

export default Sidebar;
