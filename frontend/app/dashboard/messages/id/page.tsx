"use client";

import { gql, useQuery } from "@apollo/client";
import { useSearchParams } from "next/navigation";

const GET_MESSAGES = gql`
    query GetMessages($channelId: ID!){
        getMessages(channelId: $channelId){
            id
            senderId
            receiverId
            channelId
            message
        }
    }
`;

export default function Messages() {

    const channelParams = useSearchParams();
    const channelID = channelParams.get('channelid');

    const { loading, error, data } = useQuery(GET_MESSAGES, {
        variables: { channelId: channelID }
    }); 

    return (
        <>
            {loading && <div>Loading...</div>}
            {error && <>ERROR...</>}
            {data && data.getMessages && (
                <div>
                    {data.getMessages.map((message: any, index: any) => (
                        <div key={index}>
                            {/* <p>Message ID: {message.id}</p>
                            <p>Sender ID: {message.senderId}</p>
                            <p>Receiver ID: {message.receiverId}</p>
                            <p>Channel ID: {message.channelId}</p> */}
                            <p>Message From  {message.senderId}: {message.message}</p>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}