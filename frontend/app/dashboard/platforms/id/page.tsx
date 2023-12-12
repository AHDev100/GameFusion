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
        <>
            {loading && <>Loading...</>}
            {error && <>Error...</>}
            {data && 
                <div>
                    <p>{data.getPlatformDetails.description}</p>
                    <h1>{data.getPlatformDetails.name}</h1>
                    <h1>{data.getPlatformDetails.games_count}</h1>
                    <img src={`${data.getPlatformDetails.image_background}`}/>
                </div>
            }
        </>
    )
}