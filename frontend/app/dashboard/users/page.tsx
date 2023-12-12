"use client"

import { useState, useRef } from 'react';
import { useLazyQuery, gql } from '@apollo/client';

const FIND_USERS = gql`
    query GetUsers($user: String!, $filter: String!){
        getUsers(user: $user, filter: $filter){
            id
            username
            pfp
        }
    }
`;

export default function users(){
    const [isOpen, setIsOpen] = useState(false);
    const [filter, setFilter] = useState<String | null>("");
    const [user, setUsers] = useState<any>([]);

    const inputRef = useRef<HTMLInputElement>(null);

    const [users, { data }] = useLazyQuery(FIND_USERS, {
        onCompleted: (result) => {
            setUsers(result); 
            console.log(result);
        }
    });

    const handleSearch = async (event: React.FormEvent) => {
        event.preventDefault();
        const input = inputRef.current?.value;
        await users({ variables: { user: input, filter } });
    };

    return (
        <div className="min-h-screen w-full bg-red-200 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
            <form className="w-full max-w-3xl relative text-center mb-5" onSubmit={handleSearch}> 
                <div className="flex">
                    <div className="relative">
                        <button onClick={() => setIsOpen(!isOpen)} className="z-10 inline-flex items-center p-1 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">
                            All Filters
                            <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                            </svg>
                        </button>
                        <div className={`absolute top-full left-0 ${isOpen ? '' : 'hidden'} z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                                <li>
                                    <button onClick = {() => {
                                        setFilter("Up"); 
                                        setIsOpen(false);
                                    }} className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Oldest</button>
                                </li>
                                <li>
                                    <button onClick = {() => {
                                        setFilter("Down");
                                        setIsOpen(false);
                                    }} className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Newest</button>
                                </li>
                                <li>
                                    <button onClick = {() => {
                                        setFilter("All");
                                        setIsOpen(false);
                                    }} className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">All</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="relative w-full">
                        <input ref={inputRef} className="block p-3.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search For Users..." required />
                        <button type='submit' className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>
                    </div>
                </div>
            </form>
            <div className="w-full max-w-3xl flex flex-col items-center">
                {data && data.getUsers && (
                    <>
                        <h1 className="text-lg font-semibold mb-4">
                            {data.getUsers.length} results found for: {inputRef.current?.value}
                        </h1>
                        {data.getUsers.map((user: any) => (
                            <div
                            key={user.id}
                            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center space-x-4 mb-4 w-full max-w-md"
                            >
                            <span className="text-gray-900 dark:text-white">{user.username}</span>
                            {user.pfp && (
                                <img
                                src={user.pfp}
                                alt={`${user.username}'s profile`}
                                className="w-8 h-8 ml-2 rounded-full"
                                />
                            )}
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}
