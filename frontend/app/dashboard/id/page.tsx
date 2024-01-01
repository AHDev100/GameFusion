"use client"

import { useRouter } from "next/navigation";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useSearchParams } from "next/navigation";
import '../scroll.css';

export default function gameDescription(){
  const router = useRouter(); 
  
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

  const GET_GAME_MARKET = gql`
    query GetGameMarket($gameID: ID!){
      getGameMarket(gameID: $gameID){
        numListings
        listings {
          id
          listed_at
          seller
          sold_at
          status 
        }
      }
    }
  `;

  const ADD_LISTING = gql`
    mutation AddListing($gameId: ID!, $status: String!, $sellerId: Int!, $listedAt: String!){
      addListing(gameID: $gameId, status: $status, sellerID: $sellerId, listed_at: $listedAt)
    }
  `;

  const id = useSearchParams().get('gameID');
  
  const { loading, error, data } = useQuery(GET_GAME_DETAILS, {
    variables: {id}
  });

  const market = useQuery(GET_GAME_MARKET, {
    variables: {gameID: id}
  })

  return (
    <div className="flex justify-center bg-gray-900 text-white min-h-screen p-8 w-full">
      <div className="max-w-2xl w-full sm:w-1/2 bg-gray-800 p-8 mb-4 mr-4 rounded-lg shadow-lg">
        {loading && (
          <div className="text-4xl font-bold animate-pulse">Loading Game Info...</div>
        )}
        {error && <div className="text-4xl font-bold">Error Loading Game Info...</div>}
        {data && (
          <>
            <h1 className="mx-auto text-4xl font-bold mb-4">
              {data.getGameDetails.name}
            </h1>
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
          </>
        )}
      </div>
      <div className="max-w-2xl w-full sm:w-1/2 bg-gray-800 p-8 mb-4 ml-4 rounded-lg shadow-lg">
        {market.loading && (
          <div className="text-4xl font-bold animate-pulse">Loading Market Data...</div>
        )}
        {market.error && <div className="text-4xl font-bold">Error Loading Market Data...</div>}
        {market.data && (
          <>
            <h1 className="mx-auto text-4xl font-bold mb-4">
              Market Listings
            </h1>
            {market.data.getGameMarket.numListings > 0 ? (
              <p>There's Listings</p>
            ) : (
              <div className="flex justify-center flex-col items-center">
                <div className="text-center">
                  <p className="text-xl mb-2">No Listings Yet</p>
                  <p className="text-lg text-gray-500 mb-4">
                    Be the first to add a listing for this game!
                  </p>
                </div>
              </div>
            )}
            <button
              onClick={() => {
                router.push(`/dashboard/gamelistings?gameID=${id}`);
              }}
              className="flex justify-center items-center text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:focus:ring-indigo-800 transform hover:scale-105 transition-transform ease-in-out duration-300 shadow-lg shadow-indigo-500/50 dark:shadow-lg dark:shadow-indigo-800/80 font-medium rounded-md text-base px-8 py-3 text-center mx-auto"
            >
              Add a Listing
            </button>
          </>
        )}
      </div>
    </div>
  );
}