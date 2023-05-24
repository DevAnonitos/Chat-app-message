import bcrypt from 'bcrypt';

import prisma from "@/app/libs/prismadb";
import { NextResponse } from 'next/server';

export async function POST(
    request: Request
) {
    const body = await request.json();
    const {
        email,
        name,
        password,
    } = body;

    const hashedPassword = await bcrypt.hash(password, 12);

    try {
        const user = await prisma.user.create({
            data: {
                email,
                name,
                hashedPassword,
            },
        });

        return NextResponse.json(user);
    } catch (error: any) {
        console.error('Error creating user:', error);
        // Handle the error appropriately
        return NextResponse.error();
    }
}
