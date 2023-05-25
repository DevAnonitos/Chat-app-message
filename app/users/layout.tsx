import React from 'react';

export default async function UsersLayout({
    children
}: {
    children: React.ReactNode,
}) {

    return (
        <div className='h-full'>
            {children}
        </div>
    );
};

