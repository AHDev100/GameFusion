"use client";

import '../scroll.css';
import { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";

const GET_USER_LISTINGS = gql`
  query GetListings($sellerID: ID!){
    getListings(sellerID: $sellerID){
      id
      gameID
      listed_at
      status
    }
  }
`;

export default function ListingsPage() {
  function parseJwt(token: string | null) {
    if (!token) return null;
    return JSON.parse(atob(token.split('.')[1]));
  }

  const [ID, setID] = useState<String>(""); 

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const parsedID = parseJwt(token)?.id;
    setID(parsedID);
    console.log(ID);
  }, []);
  
  const { loading, error, data } = useQuery(GET_USER_LISTINGS, {
    variables: {
      sellerID: ID
    }
  });

  return (
    <div className="container mx-auto mt-0 bg-gray-800 min-h-screen border border-green-300 p-4">
      {loading && (
        <div className="text-center">
          <p className="animate-pulse text-gray-600">Loading...</p>
        </div>
      )}
      {error && (
        <div className="text-center">
          <p className="text-red-500">Error: {error.message}</p>
        </div>
      )}
      {data && (
        <div className='bg-gray-800'>
          <h1 className="flex justify-center text-2xl font-bold mb-4 mt-4 text-white">Your Listing History: </h1>
          {data.getListings.map((listing: any) => (
            <div
              key={listing.id}
              className="bg-gray-200 p-4 mb-4 rounded-md shadow-md"
            >
              <p className="text-lg font-semibold">{listing.status}</p>
              <p className="text-sm text-gray-500">{listing.listed_at}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
