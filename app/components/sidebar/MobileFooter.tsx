"use client"

import React from 'react';
import useConversation from '@/app/hooks/useConversation';
import useRoutes from '@/app/hooks/useRoutes';

const MobileFooter = () => {

    const routes = useRoutes();
    const { isOpen } = useConversation();

    if(isOpen) {
        return null;
    }

    return (
        <>
            <div
                className='fixed justify-between w-full bottom-0
                z-40 flex items-center bg-primary-700
                border-t-[1px] lg:hidden'
            >
                div
            </div>
        </>
    );
};

export default MobileFooter;
