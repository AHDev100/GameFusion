"use client";

import '../dashboard/scroll.css';
import { useQuery, gql } from "@apollo/client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Game } from "../types/types";
import Rating from "../components/stars/getStars";

const GET_GAMES = gql`
  query GetGames($searchParam: String!) {
    getGames(searchParam: $searchParam) {
      name
      background_image
      released
      rating
      metacritic
      id
    }
  }
`;

export default function SearchPage(){
    const [games, setGames] = useState<any>([]); 
    
    const searchParams = useSearchParams();
    const search = searchParams.get('searchParam');
    
    const { loading, error, data } = useQuery(GET_GAMES, {
        variables: { searchParam : search }
    });

    useEffect(() => {
        if (data && !loading){
            console.log(data);
            setGames(data.getGames);
        }
    }, [data])

    return (
      <div className="min-h-screen overflow-auto bg-gradient-to-r from-gray-700 to-emerald-800 border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-center relative mx-auto mt-4 mb-4 text-white font-semibold text-2xl">
          First 12 search results for: "{search}"
        </div>
        <div className="grid grid-cols-3 gap-4">
                {loading ? <p>Loading...</p> : games.map((game : Game, index : any) => (
                    <div key={index} className="bg-black text-white p-3 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <img className="w-full h-64 object-cover mb-4 hover:scale-105" src={game.background_image} alt={`${game.name}`}/>
                            <div className="flex flex-col items-center">
                                {game.rating ? <Rating Rating={game.rating}/> : <p>Rating unavailable</p>}
                                <p className="mb-3 font-semibold text-l text-white text-shadow-md">{game.name}</p>
                                <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
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
    );        
}