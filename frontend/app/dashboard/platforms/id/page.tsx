"use client";

import { gql, useQuery } from "@apollo/client";
import { useSearchParams } from "next/navigation";

const GET_PLATFORM_DETAILS = gql`
    query GetPlatformDetails($id: ID!){
        getPlatformDetails(id: $id){
            id
            name
            games_count
            image_background
            slug
            description
        }
    }
`;

function removeHTMLText(description: any){
    const tempElement = document.createElement("div");
    tempElement.innerHTML = description;
    return tempElement.textContent || tempElement.innerText || "";
}

export default function PlatformDetails(){
    const idParams = useSearchParams();
    const id = idParams.get('platformID');
    const { loading, error, data } = useQuery(GET_PLATFORM_DETAILS, {
        variables: {id}, 
        onCompleted: (data) => {
           console.log(data); 
        }
    });
    return (
        <div className="flex-1 overflow-hidden">
            {loading && <div className="text-center mt-8">Loading...</div>}
            {error && <div className="text-center mt-8">Error...</div>}
            {data &&
                <div className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 p-8 min-h-screen shadow-md">
                    <h1 className="text-3xl font-semibold mb-4 text-white flex justify-center">{data.getPlatformDetails.name}</h1>
                    <img
                        src={`${data.getPlatformDetails.image_background}`}
                        alt={data.getPlatformDetails.name}
                        className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                    <p className="text-gray-700 dark:text-gray-300">
                        {removeHTMLText(data.getPlatformDetails.description)}
                    </p>
                    <div className="mt-4">
                        <p className="text-gray-600 dark:text-gray-400">Games Count: {data.getPlatformDetails.games_count}</p>
                    </div>
                </div>
            }
        </div>
    )
}