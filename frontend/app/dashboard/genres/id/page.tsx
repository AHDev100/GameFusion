"use client";

import { gql, useQuery } from "@apollo/client";
import { useSearchParams } from "next/navigation";

const GET_GENRE_DETAILS = gql`
    query GetGenreDetails($id: ID!){
        getGenreDetails(id: $id){
            id
            name
            games_count
            image_background
            slug
            description
        }
    }
`;

export default function GenreDetails(){
    const idParams = useSearchParams();
    const id = idParams.get('genreID');
    const { loading, error, data } = useQuery(GET_GENRE_DETAILS, {
        variables: {id}, 
        onCompleted: (data) => {
           console.log(data); 
        }
    });
    return (
        <>
            {loading && <>Loading...</>}
            {error && <>Error...</>}
            {data && 
                <div>
                    <p>{data.getGenreDetails.description}</p>
                    <h1>{data.getGenreDetails.name}</h1>
                    <h1>{data.getGenreDetails.games_count}</h1>
                    <img src={`${data.getGenreDetails.image_background}`}/>
                </div>
            }
        </>
    )
}