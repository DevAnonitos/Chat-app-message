import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "../../libs/prismadb";

export async function POST (
    request: Request,
) {
    try {

        const currentUser = await getCurrentUser();
        const body = await request.json();

        const {
            userId,
            isGroup,
            members,
            name,
        } = body;

        if(!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', {
                status: 400,
            });
        }

        if(isGroup && (!members || members.length < 2 || !name)) {
            return new NextResponse('Invalid data', {
                status: 400,
            });
        }

        if(isGroup) {
            const newConversation = await prisma.conversation.create({
                data: {
                    name,
                    isGroup,
                    users: {
                        connect: [
                            ...members.map((member: {value: string}) => ({
                                id: member.value,
                            })),
                            {
                                id: currentUser.id,
                            },
                        ],
                    }
                },
                include: {
                    users: true,
                }
            });

            newConversation.users.forEach((user) => {
                if (user.email) {
                    
                }
            });

            return NextResponse.json(newConversation);
        }

    } catch (error: any) {
        console.log(error);
        return new NextResponse('Internal Error', {
            status: 500,
        });
    }
}
