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
                    <div>
                        <p className="font-semibold text-l text-white text-shadow-md">{game.name}</p>
                        {game.rating ? <Rating Rating={game.rating}/> : <p>Rating unavailable</p>}
                    </div>
                    </div>
                ))}
            </div>
            {error ? <p>Error...</p> : null}
        </div>
    )
}