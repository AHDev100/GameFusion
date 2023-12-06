"use client"; 

import { MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { useQuery, gql } from "@apollo/client";
import '../scroll.css'

export default function review(){

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
        router.push('/dashboard/reviews/add');
    }

    return (
        <div className="flex flex-col items-center bg-orange-400 w-full p-4 overflow-y-auto min-h-screen">
          <h1 className="font-bold text-xl mb-4">Latest Reviews:</h1>
          {data &&
            data.getAllReviews.map((review: any, index : any) => {
              return (
                <div
                  className="bg-green-200 p-4 my-4 rounded-md w-full max-w-md"
                  key={index}
                >
                  <h1 className="text-lg font-bold mb-2">User ID: {review.reviewerID}</h1>
                  <p className="mb-2">Title: {review.title}</p>
                  <p className="mb-2">Rating: {review.rating}</p>
                  <p className="mb-2">Review: {review.review}</p>
                  <p className="mb-2">Likes: {review.likes}</p>
                  <p className="mb-2">Dislikes: {review.dislikes}</p>
                  <button className="relative bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center text-white dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-9001">Like</button>
                  <button className="relative mx-2 bg-red-700 hover:bg-red-800 font-medium text-sm px-5 py-2.5 text-center text-white dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Dislike</button>
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