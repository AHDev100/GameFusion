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
        <>
            {loading && <>Loading...</>}
            {error && <>Error...</>}
            {data && 
                <div>
                    <p>{data.getTagDetails.description}</p>
                    <h1>{data.getTagDetails.name}</h1>
                    <h1>{data.getTagDetails.games_count}</h1>
                    <img src={`${data.getTagDetails.image_background}`}/>
                </div>
            }
        </>
    )
}