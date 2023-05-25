import React from 'react';
import EmptyState from '../components/EmptyState';

const Users = () => {
    return (
        <div className='hidden lg:block lg:pl-80 h-full bg-primary-700'>
            <EmptyState />
        </div>
    );
};

export default Users;
