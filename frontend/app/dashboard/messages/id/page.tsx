"use client";

import '../../scroll.css';
import { MouseEvent } from "react";
import { useState, useEffect, useRef } from "react";
import { gql, useQuery, useMutation, useSubscription } from "@apollo/client";
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

const SEND_MESSAGE = gql`
    mutation SendMessage($text: String!, $senderId: ID!, $recipientId: ID!){
        sendMessage(text: $text, senderId: $senderId, recipientId: $recipientId){
            id
            senderId
            receiverId
            channelId
            message
        }
    }
`;

const MESSAGE_SENT = gql`
  subscription MessageSent($channelId: ID!) {
    messageSent(channelId: $channelId) {
      id
      message
      senderId
      receiverId
      channelId
    }
  }
`;

export default function Messages() {

    const messageRef = useRef<HTMLTextAreaElement>(null);

    function parseJwt(token: string | null) {
        if (!token) return null;
        return JSON.parse(atob(token.split('.')[1]));
      }
  
    const [ID, setID] = useState<String>(""); 

    const channelParams = useSearchParams();
    const channelID = channelParams.get('channelid');

    const userParams = useSearchParams().get('channelName'); 
    let recipient : any;

    if(ID && userParams){
        recipient = JSON.parse(userParams).find((id : any) => id !== ID.toString());
    }

    const {loading, error, data: queryData, refetch: getMessages} = useQuery(GET_MESSAGES, {
        variables: { channelId: channelID }
    }); 

    const [sendMessage] = useMutation(SEND_MESSAGE, {
        variables: {
            text: messageRef.current?.value,
            senderId: ID, 
            recipientId: recipient 
        }, 
        refetchQueries: [{query: GET_MESSAGES}]
    });

    const sub = useSubscription(MESSAGE_SENT, {
        variables: { channelId: channelID },
    });
  
    useEffect(() => {
        const token = sessionStorage.getItem("token");
          const parsedID = parseJwt(token)?.id;
          setID(parsedID);
          console.log(ID);
    }, []);

    useEffect(() => {
        if (sub.data) {
            refetchMessages();
        }
    }, [sub.data]);

    const refetchMessages = () => {
        if (channelID) {
            getMessages({ variables: { channelId: channelID } });
        }
    };

    return (
        <div className="flex flex-col items-center bg-gray-500 w-full p-4 overflow-y-auto min-h-screen">
            {loading && <div>Loading...</div>}
            {error && <>ERROR...</> && console.log(error)}
            {ID != null && queryData && queryData.getMessages && (
                <div className="w-full flex-grow">
                    {queryData.getMessages.map((message: any, index: any) => (
                        <div key={index} className={`flex ${message.senderId !== ID.toString() ? 'justify-start' : 'justify-end'}`}>
                            <div className={`max-w-md p-4 mb-2 rounded-lg ${message.senderId !== ID.toString() ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}`}>
                                <p>{message.message}</p>
                            </div>
                        </div>
                    ))}
                    <form>
                        <div className="relative flex fixed bottom-0 w-full right-auto items-center justify-center items-center py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                            <button type="button" className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                                    <path fill="currentColor" d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"/>
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"/>
                                </svg>
                                <span className="sr-only">Upload image</span>
                            </button>
                            <button type="button" className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z"/>
                                </svg>
                                <span className="sr-only">Add emoji</span>
                            </button>
                            <textarea ref={messageRef} className="b-0 block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
                            <button onClick={async (event : MouseEvent<HTMLButtonElement>) => {
                                event.preventDefault();
                                console.log('text:', messageRef.current?.value);
                                console.log('senderId:', ID);
                                console.log('recipientId:', recipient);
                                if(ID && recipient && messageRef.current?.value){
                                    await sendMessage().then(() => {
                                        console.log('Sent');
                                    }).catch((error) => {
                                        console.log(error);
                                    });
                                }
                            }} type="submit" className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                                <svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                    <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z"/>
                                </svg>
                                <span className="sr-only">Send message</span>
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}