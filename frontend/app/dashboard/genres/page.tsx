"use client"

import { MouseEvent } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery, gql } from "@apollo/client";
import '../../dashboard/scroll.css';

const GET_GENRES = gql`
  query GetGenres {
    getGenres {
        results {
            id
            name
            games_count
            image_background
        }
    }
  }
`;

export default function genres(){
    const router = useRouter();

    const [genres, setGenres] = useState<any>([]); 

    const { loading, error, data } = useQuery(GET_GENRES);

    useEffect(() => {
        if (data && !loading){
            console.log(data);
            setGenres(data.getGenres.results);
            console.log(genres);
        }
    }, [data]);

    return (
        <div className="overflow-y-auto justify-center flex-1 min-h-screen bg-gradient-to-r from-gray-700 to-emerald-800 border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="grid grid-cols-3 gap-4">
                {loading ? <p>Loading...</p> : genres.map((genre : any, index : any) => (
                    <div key={index} className="flex flex-col items-center bg-black text-white p-3 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <img className="w-full h-64 object-cover mb-3 hover:scale-105" src={genre.image_background} alt={`${genre.name}`}/>
                        <p className="mb-2 font-semibold text-l text-white text-shadow-md">{genre.name}</p>
                        <p className="mb-3 font-semibold text-l text-white text-shadow-md">Game Count: {genre.games_count}</p>
                        <button onClick={(event: MouseEvent<HTMLButtonElement>) => {
                            event.preventDefault(); 
                            router.push(`/dashboard/genres/id?genreID=${genre.id}`);
                        }} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Learn More
                            </span>
                        </button>
                    </div>
                ))}
            </div>
            {error ? <p>Error...</p> : null}
        </div>
    )
}