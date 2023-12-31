"use client"

import { useRouter } from "next/navigation";
import { MouseEvent, useState, useEffect } from "react";
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
    const router = useRouter();

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
                        <div className="flex flex-col items-center">
                            <p className="mb-3 font-semibold text-l text-white text-shadow-md">{tag.name}</p>
                            <button onClick={(event: MouseEvent<HTMLButtonElement>) => {
                                event.preventDefault(); 
                                router.push(`/dashboard/tags/id?tagID=${tag.id}`);
                            }} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
                                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                Learn More
                                </span>
                            </button>
                        </div>
                    </div>
                ))}
                {error ? <p>Error...</p> : null}
            </div>
        </div>
    )
}