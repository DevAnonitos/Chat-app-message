import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

import React from 'react'

const getSession = async () => {
    return await getServerSession(authOptions);
};

export default getSession;
