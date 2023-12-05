"use client"; 

import { MouseEvent } from "react";
import { useRouter } from "next/navigation";
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

    const router = useRouter();

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

    const handleRoute = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        router.push('/');
    }

    return (
        <div className="flex flex-col items-center bg-orange-400 w-full p-4">
          <h1 className="font-bold text-xl mb-4">Latest Reviews:</h1>
          {data &&
            data.getAllReviews.map((review: any) => {
              return (
                <div
                  className="bg-green-200 p-4 my-4 rounded-md w-full max-w-md"
                  key={review.reviewerID}
                >
                  <h1 className="text-lg font-bold mb-2">User ID: {review.reviewerID}</h1>
                  <p className="mb-2">Title: {review.title}</p>
                  <p className="mb-2">Rating: {review.rating}</p>
                  <p className="mb-2">Review: {review.review}</p>
                  <p className="mb-2">Likes: {review.likes}</p>
                  <p className="mb-2">Dislikes: {review.dislikes}</p>
                </div>
              );
            })}
          {loading && <p className="font-bold">Loading...</p>}
          {error && <p className="font-bold">Error...</p>}
          <button onClick={handleRoute} className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4 mt-5">
            Add Review
          </button>
        </div>
      );
}