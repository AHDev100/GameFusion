"use client"

import { gql, useQuery } from "@apollo/client";
import { useSearchParams } from "next/navigation"

export default function gameDescription(){
    const GET_GAME_DETAILS = gql`
        query GetGameDetails($id: ID!){
            getGameDetails(id: $id){
                id
                name
                background_image
                released
                rating
                metacritic
            }
        }
    `;

    const id = useSearchParams().get('gameID');
    
    const { loading, error, data } = useQuery(GET_GAME_DETAILS, {
        variables: {id}
    });

    return (
        <div className="w-full bg-gray-900 text-white min-h-screen p-8 flex justify-center items-center">
          {loading && (
            <div className="text-4xl font-bold animate-pulse">Loading...</div>
          )}
          {error && <div className="text-4xl font-bold">Error...</div>}
          {data && (
            <div className="max-w-2xl w-full bg-gray-800 p-8 rounded-lg shadow-lg">
              <h1 className="mx-auto text-4xl font-bold mb-4">{data.getGameDetails.name}</h1>
              <img
                className="w-full h-64 object-cover mb-6 rounded-lg"
                src={data.getGameDetails.background_image}
                alt="Game Background"
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h1 className="text-lg font-semibold mb-2">Released:</h1>
                  <p className="text-xl">{data.getGameDetails.released}</p>
                </div>
                <div>
                  <h1 className="text-lg font-semibold mb-2">Average Rating:</h1>
                  <p className="text-xl">
                    {(data.getGameDetails.rating + data.getGameDetails.metacritic) / 2}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
    );
}