"use client";

import { gql, useQuery } from "@apollo/client";
import { useSearchParams } from "next/navigation";

const GET_TAG_DETAILS = gql`
    query GetTagDetails($id: ID!){
        getTagDetails(id: $id){
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

export default function TagDetails(){
    const idParams = useSearchParams();
    const id = idParams.get('tagID');
    const { loading, error, data } = useQuery(GET_TAG_DETAILS, {
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
                    <h1 className="text-3xl font-semibold mb-4 text-white flex justify-center">{data.getTagDetails.name}</h1>
                    <img
                        className="w-full h-64 object-cover rounded-lg mb-4"
                        src={`${data.getTagDetails.image_background}`}
                    />
                    <p className="text-gray-700 dark:text-gray-300">{removeHTMLText(data.getTagDetails.description)}</p>
                    <div className="mt-4">
                        <h1 className="text-gray-600 dark:text-gray-400">{data.getTagDetails.games_count}</h1>
                    </div>
                </div>
            }
        </div>
    )
}