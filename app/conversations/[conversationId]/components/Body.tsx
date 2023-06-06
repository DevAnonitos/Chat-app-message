"use client";

import React from "react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

import { pusherClient } from "@/app/libs/pusher";
import useConversation from "@/app/hooks/useConversation";
import MessageBox from "./MessageBox";
import { FullMessageType } from "@/app/types";
import { find } from "lodash";


interface BodyProps {
    initialMessages: FullMessageType[];
}

const Body: React.FC<BodyProps> = (
    { initialMessages = [] }
) => {

    const bottomRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState(initialMessages);

    const { conversationId } = useConversation();

    // const updateMessageHandler = (newMessage: FullMessageType) => {
    //     setMessages((current) => current.map((currentMessage) => {
    //         if(currentMessage.id === newMessage.id) {
    //             return newMessage;
    //         }

    //         return currentMessage;
    //     }));
    // };

    return (
        <>
            <div className="flex-1 overflow-y-auto">
                {messages.map((message, i) => (
                    <MessageBox
                        
                    />
                ))}
            </div>
        </>
    );
};

export default Body;
