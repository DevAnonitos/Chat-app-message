import React from 'react';

export default function NotFound() {
    return (
            <div
                className="flex flex-col items-center justify-center
                min-h-screen bg-gray-100"
            >
                <h2 className="text-3xl font-bold mb-4">
                    404 Not Found Conversations
                </h2>
                <p className="text-xl text-gray-600">
                    Could not find the requested resource
                </p>
            </div>
    );
};
