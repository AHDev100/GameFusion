"use client"; 

import { useQuery, gql } from "@apollo/client";
// import { useEffect, useState } from "react"; - This bit, we can use for checking a person's profile

export default function review(){
    // function parseJwt (token : String) { 
    //     return JSON.parse(atob(token.split('.')[1]));;
    // }

    // const [token, setToken] = useState<String | null>("");

    // useEffect(() => {
    //     setToken(sessionStorage.getItem("token")); 
    // }, [])

    const GET_REVIEWS = gql`
        query GetAllReviews {
            getAllReviews {
                reviewerID
                title
                review
                rating
                likes
                dislikes
            }
        }
    `;

    const { loading, error, data } = useQuery(GET_REVIEWS);

    return (
        <div className="flex justify-center bg-orange-400 w-full">
            <h1 className="font-bold text-xl pt-3">Latest Reviews: </h1>
            {/* {token && parseJwt(token).id} */}
            {data && data.getAllReviews.map((review: any) => {
                return (
                    <div className="flex justify-center" key={review.reviewerID}>
                        <h1>User ID: {review.reviewerID}</h1>
                        <h1>Title: {review.title}</h1>
                        <h1>Rating: {review.rating}</h1>
                        <h1>Review: {review.review}</h1>
                    </div>
                );
            })}
            {loading && <>Loading...</>}
            {error && <>Error...</>}
        </div>
    )
}