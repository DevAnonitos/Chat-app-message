import React from 'react';
import EmptyState from '@/app/components/EmptyState';

interface IParams {
    conversationId: string;
}

const ConversationId = async ({ params }: {
    params: IParams,
}) => {
    return (
        <>
            <div className='lg:pl-80 h-full'>
                <div className='h-full flex flex-col'>
                    
                </div>
            </div>
        </>
    );
};

export default ConversationId;
