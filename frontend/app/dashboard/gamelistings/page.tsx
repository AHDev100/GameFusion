"use client"

import { useState, useEffect, ChangeEvent } from "react";
import { gql, useMutation, useLazyQuery } from "@apollo/client";
import { useRouter, useSearchParams } from "next/navigation";

export default function pageListings() {
    const ADD_LISTING = gql`
        mutation AddListing($gameID: ID!, $status: String!, $sellerID: Int!, $listed_at: String!){
            addListing(gameID: $gameID, status: $status, sellerID: $sellerID, listed_at: $listed_at)
        }
    `;

    const SEARCH_GAME = gql`
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

    const router = useRouter();
    const gameID = useSearchParams().get('gameID'); 

    const [sell] = useMutation(ADD_LISTING);
    const [getGames, { loading, data }] = useLazyQuery(SEARCH_GAME);

    const [searchQuery, setSearchQuery] = useState("");
    const [gameSelected, setGameSelected] = useState(false);
    function parseJwt(token: string | null) {
        if (!token) return null;
    
        return JSON.parse(atob(token.split('.')[1]));
    }
    
    const [ID, setID] = useState<string | null>("");

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const parsedID = parseJwt(token).id;
            setID(parsedID);
        }
    }, []);

    useEffect(() => {
        if (!gameSelected && searchQuery.trim() !== "") {
            getGames({ variables: { searchParam: searchQuery } });
        }
    }, [searchQuery, getGames, gameSelected]);

    const handleGameSelection = (selectedGame : any) => {
        setSearchQuery(selectedGame.name);
        setGameSelected(true);
    };

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 w-full">
            <main className="grow">
                <section className="py-8 bg-white lg:py-24 dark:bg-gray-900">
                    <div className="px-4 mx-auto max-w-8xl lg:px-4">
                        <div className="xl:mx-64 2xl:mx-80">
                            <h1 className="mb-4 text-4xl font-bold text-gray-900 lg:font-extrabold lg:text-5xl lg:leading-none dark:text-white lg:text-center lg:mb-7">Add a Listing</h1>
                        </div>
                    </div>
                    <div className="px-4 mx-auto max-w-8xl lg:px-4">
                        <div className="px-4 mx-auto max-w-8xl lg:px-4">
                            <div className="p-4 mx-auto max-w-3xl rounded-lg border-gray-50 shadow-md dark:bg-gray-800 lg:p-8">
                                <form>
                                    <div className="mb-6">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Game</label>
                                        <input
                                            placeholder="The Game You Would Like to Sell"
                                            value={searchQuery}
                                            onChange={(e : ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                        {loading && <p>Loading...</p>}
                                        {(data && !gameSelected) && (
                                            <div>
                                                {data.getGames.map((game : any) => (
                                                    <button className="w-full flex items-center justify-between p-4 border rounded-md cursor-pointer transition duration-300 ease-in-out bg-white hover:bg-gray-100" key={game.id} onClick={() => handleGameSelection(game)}>
                                                    <img
                                                        src={game.background_image}
                                                        alt={game.name}
                                                        className="w-12 h-12 mr-4 rounded"
                                                    />
                                                    <span className="flex-grow">{game.name}</span>                                                                                            </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-6">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Price</label>
                                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Price (Please Specify Currency)" />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Additional Details</label>
                                        <textarea rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Additional Information About Your Listing Here..."></textarea>
                                    </div>
                                </form>
                                <button
                                    onClick={async (event) => {
                                        event.preventDefault();
                                        await sell({
                                            variables: {
                                                gameID, 
                                                status: "For Sale", 
                                                listed_at: new Date().toDateString(),
                                                sellerID: ID
                                            }
                                        }).then((res) => {
                                            console.log(res);
                                            setGameSelected(false);
                                            router.back(); 
                                        }).catch((err) => {
                                            console.error(err);
                                        })
                                    }}
                                    type="submit"
                                    className="text-white font-medium rounded-lg text-base px-5 py-3 w-full sm:w-auto text-center bg-blue-700"
                                >
                                    Post Listing
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}