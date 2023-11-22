"use client";

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
        <div className="bg-gradient-to-r from-gray-700 to-emerald-800 border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="flex justify-center mt-4 mb-4 text-white font-semibold text-2xl">
            First 12 search results for: "{search}"
          </div>
          <div className="grid grid-cols-4 gap-4">
            {loading ? <p>Loading...</p> : games.map((game : Game, index : any) => (
              <div key={index} className="bg-black text-white p-4 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
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
      );      
}