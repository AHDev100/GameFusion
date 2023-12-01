"use client"

import { useState, useEffect } from "react";
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
                    <div key={index} className="bg-black text-white p-3 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <img className="w-full h-64 object-cover mb-4 hover:scale-105" src={genre.image_background} alt={`${genre.name}`}/>
                        <div>
                            <p className="font-semibold text-l text-white text-shadow-md">{genre.name}</p>
                        </div>
                    </div>
                ))}
            </div>
            {error ? <p>Error...</p> : null}
        </div>
    )
}