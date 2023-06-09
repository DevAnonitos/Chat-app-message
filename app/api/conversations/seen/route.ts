import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import { pusherServer } from "@/app/libs/pusher";
import prisma from "../../../libs/prismadb";

interface IParams {
    conversationId?: string;
}

export async function POST (
    request: Request,
    {params}: { params: IParams }
) {
    try {

        const currentUser = await getCurrentUser();
        const {
            conversationId
        } = params;

        if(!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', {
                status: 401,
            });
        }

        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId,
            },
            include: {
                messages: {
                    include: {
                        seen: true,
                    },
                },
                users: true,
            },
        });




    } catch (error: any) {
        console.log(error, 'ERROR_MESSAGE_SEEN');
        return new NextResponse('Error', {
            status: 500,
        });
    }
};
