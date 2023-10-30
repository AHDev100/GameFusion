"use client";
import client from "../apolloClient";
import { useQuery, gql } from "@apollo/client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Game } from "../types/types";

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
    const [games, setGames] = useState([]); 
    
    const searchParams = useSearchParams();
    const search = searchParams.get('searchParam');
    console.log(search);
    
    const { data }= useQuery(GET_GAMES, {
        client,
        variables: { searchParam : search}
    });
    console.log(data);

    useEffect(() => {
        if (data){
            setGames(data.getGames);
        }
    }, [data])

    return (
        <div>
          {games.map((game : Game, index) => (
            <div key={index}>
              <p>{game.name}</p>
            </div>
          ))}
        </div>
      );      
}