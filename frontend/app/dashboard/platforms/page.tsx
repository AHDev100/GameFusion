"use client"

import { MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import '../../dashboard/scroll.css';
import { Router } from "express";

const GET_PLATFORMS = gql`
  query GetPlatforms {
    getPlatforms {
        results {
            id
            name
            games_count
            image_background
            year_start
            year_end
        }
    }
  }
`;

export default function platforms(){
    const router = useRouter();

    const [platforms, setPlatforms] = useState<any>([]);

    const { loading, error, data } = useQuery(GET_PLATFORMS);

    useEffect(() => {
        if (data && !loading){
            console.log(data);
            setPlatforms(data.getPlatforms.results);
            console.log(platforms);
        }
    }, [data]);

    return (
        <div className="overflow-y-auto justify-center flex-1 min-h-screen bg-gradient-to-r from-gray-700 to-emerald-800 border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="grid grid-cols-3 gap-4">
                {loading ? <p>Loading...</p> : platforms ? platforms.map((platform : any, index : any) => (
                    <div key={index} className="flex flex-col items-center bg-black text-white p-3 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <img className="w-full h-64 object-cover mb-4 hover:scale-105" src={platform.image_background} alt={`${platform.name}`}/>
                            <p className="font-semibold mb-3 text-l text-white text-shadow-md">{platform.name}</p>
                            <button onClick={(event: MouseEvent<HTMLButtonElement>) => {
                                event.preventDefault(); 
                                router.push(`/dashboard/platforms/id?platformID=${platform.id}`)
                            }} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                Learn More
                                </span>
                            </button>
                    </div>
                )) : <p>Error Loading Platforms...</p>}
            </div>
            {error && <p>Error...</p>}
        </div>
    )
}
