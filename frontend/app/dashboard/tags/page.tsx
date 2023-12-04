"use client"

import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import '../../dashboard/scroll.css';

const GET_TAGS = gql`
  query GetTags {
    getTags {
        results {
            id
            name
            slug
            games_count
            image_background
        }
    }
  }
`;

export default function tags(){
    const [tags, setTags] = useState<any>([]);

    const { loading, error, data } = useQuery(GET_TAGS);

    useEffect(() => {
        if (data && !loading){
            console.log(data);
            setTags(data.getTags.results);
            console.log(tags);
        }
    }, [data]);

    return (
        <div className="overflow-y-auto justify-center flex-1 min-h-screen bg-gradient-to-r from-gray-700 to-emerald-800 border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="grid grid-cols-3 gap-4">
                {loading ? <p>Loading...</p> : tags.map((tag : any, index : any) => (
                    <div key={index} className="bg-black text-white p-3 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <img className="w-full h-64 object-cover mb-4 hover:scale-105" src={tag.image_background} alt={`${tag.name}`}/>
                        <div className="flex justify-between items-center">
                            <p className="font-semibold text-l text-white text-shadow-md">{tag.name}</p>
                        </div>
                    </div>
                ))}
                {error ? <p>Error...</p> : null}
            </div>
        </div>
    )
}