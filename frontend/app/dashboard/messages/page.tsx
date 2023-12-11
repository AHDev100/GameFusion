"use client"

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client"

const GET_CHANNELS = gql`
    query GetChannels ($userID: ID!) {
        getChannels(userID: $userID) {
            id 
            channelName
        }
    }
`;

export default function messages(){

    const router = useRouter();

    function parseJwt(token: string | null) {
        if (!token) return null;
        return JSON.parse(atob(token.split('.')[1]));
    }
    
    const [ID, setID] = useState<String>(""); 
    
    useEffect(() => {
        const token = sessionStorage.getItem("token");
          const parsedID = parseJwt(token)?.id;
          setID(parsedID);
          console.log(ID);
    }, []);

    const { loading, error, data} = useQuery(GET_CHANNELS, {
        variables: {userID: ID}
    });

    return (
        <div className="flex flex-col items-center bg-orange-400 w-full p-4 overflow-y-auto min-h-screen">
            <h1 className="font-bold text-xl mb-4">Your DMs (Direct Messages):</h1>
            <div className="w-full max-w-3xl flex flex-col items-center">
                {loading && <h1>Loading...</h1>}
                {error && <h1>Error...</h1>}
                {ID !== null && data && data.getChannels.map((channel: any, index: any) => (
                    <div key={index} className="text-white bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center space-x-4 mb-4 w-full max-w-md">
                        <h1>Channel ID: {channel.id}</h1>
                        <h1>Channel Name: {channel.channelName}</h1>
                        <button onClick={() => {
                            router.push(`/dashboard/messages/id?channelid=${channel.id}&channelName=${channel.channelName}`);
                        }} className="relative bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center text-white dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-9001">Open Channel</button>
                    </div>
                ))}
            </div>
        </div>
    )
}