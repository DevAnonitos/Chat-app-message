'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { MdOutlineGroupAdd } from 'react-icons/md';


import clsx from 'clsx';
import { find, uniq } from 'lodash';
import { pusherClient } from '@/app/libs/pusher';


interface ConservationListProps {
    users: User[],
    title: string,
}

const ConservationList: React.FC<ConservationListProps> = ({
    users,
}) => {
    return (
        <>

        </>
    );
};

export default ConservationList;
