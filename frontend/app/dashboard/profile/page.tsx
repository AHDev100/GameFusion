"use client"

import { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client"

const GET_PROFILE_INFO  = gql`
    query GetUserDetails($token: String){
        getUserDetails(token: $token){
            id
            username
            password
            pfp
        }
    }
`;

export default function profile(){
    const [token, setToken] = useState<String | null>("");
    useEffect(() => {
        setToken(sessionStorage.getItem("token"))
    }, [])
    const { loading, error, data } = useQuery(GET_PROFILE_INFO, {
        variables: {token: token},
    });
    console.log(data);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
                <div>
                    <div className="relative mx-auto w-32 h-32 bg-gray-100 rounded-full dark:bg-gray-600">
                        <svg className="p-3 w-30 h-30 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                        </svg>
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Account Settings
                    </h2>
                </div>
                <form className="mt-8 space-y-6">
                    <div>
                        <label>Profile Picture</label>
                        <input type="file" accept="image/*" />
                        <input type="text" placeholder="Or enter a URL" />
                    </div>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="username" className="sr-only">Username</label>
                            <input id="username" name="username" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Username"/>
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input id="password" name="password" type={showPassword ? 'text' : 'password'} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password"/>
                            <button onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Hide' : 'Show'}</button>
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}