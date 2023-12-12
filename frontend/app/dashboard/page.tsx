"use client"

import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { Game } from "../types/types";
import Rating from "../components/stars/getStars";
import './scroll.css';

const GET_MAIN_GAMES = gql`
  query GetMainGames {
    getMainGames {
      name
      background_image
      released
      rating
      metacritic
    }
  }
`;

export default function Dashboard(){
    const [games, setGames] = useState<any>([]); 
    
    const { loading, error, data } = useQuery(GET_MAIN_GAMES);

    useEffect(() => {
        if (data && !loading){
            console.log(data);
            setGames(data.getMainGames);
        }
    }, [data])

    return (
        <div className="overflow-y-auto justify-center flex-1 min-h-screen bg-gradient-to-r from-gray-700 to-emerald-800 border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="grid grid-cols-3 gap-4">
                {loading ? <p>Loading...</p> : games.map((game : Game, index : any) => (
                    <div key={index} className="bg-black text-white p-3 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <img className="w-full h-64 object-cover mb-4 hover:scale-105" src={game.background_image} alt={`${game.name}`}/>
                            <div className="flex flex-col items-center">
                            <p className="mb-3 font-semibold text-l text-white text-shadow-md">{game.name}</p>
                                {game.rating ? <Rating Rating={game.rating}/> : <p>Rating unavailable</p>}
                                <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    View Game Details
                                    </span>
                                </button>
                            </div>
                    </div>
                ))}
            </div>
            {error ? <p>Error...</p> : null}
        </div>
    )
}