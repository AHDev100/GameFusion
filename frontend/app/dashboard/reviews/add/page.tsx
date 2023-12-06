"use client";

import { useRef, useEffect, useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/navigation";
import review from "../page";

export default function AddReview(){

    function parseJwt(token: string | null) {
        if (!token) return null;
    
        return JSON.parse(atob(token.split('.')[1]));
      }
    
      const [ID, setID] = useState<string | null>("");
    
      useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
          const parsedID = parseJwt(token).id;
          setID(parsedID);
        }
      }, []);

    const titleRef = useRef<HTMLInputElement>(null); 
    const reviewRef = useRef<HTMLTextAreaElement>(null); 
    const ratingRef = useRef<HTMLInputElement>(null); 

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

    const ADD_REVIEW = gql`
        mutation AddReview($reviewerID: ID!, $review: String!, $rating: Int!, $title: String!){
            addReview(reviewerID: $reviewerID, review: $review, rating: $rating, title: $title)
        }
    `;

    const [addReview] = useMutation(ADD_REVIEW, {
        refetchQueries: [{query: GET_REVIEWS}]
    });

    const router = useRouter();

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 w-full">
            <main className="grow">
                <section className="py-8 bg-white lg:py-24 dark:bg-gray-900">
                    <div className="px-4 mx-auto max-w-8xl lg:px-4">
                        <div className="xl:mx-64 2xl:mx-80">
                            <h1 className="mb-4 text-4xl font-bold text-gray-900 lg:font-extrabold lg:text-5xl lg:leading-none dark:text-white lg:text-center lg:mb-7">Add a Review</h1>
                            <p className="mb-10 text-lg font-normal text-gray-500 dark:text-gray-400 lg:text-center lg:text-xl">Share Your Thoughts on a Game of Your Choice</p>
                        </div>
                    </div>
                    <div className="px-4 mx-auto max-w-8xl lg:px-4">
                        <div className="px-4 mx-auto max-w-8xl lg:px-4">
                            <div className="p-4 mx-auto max-w-3xl rounded-lg border-gray-50 shadow-md dark:bg-gray-800 lg:p-8">
                                <form>
                                    <div className="mb-6">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Title</label>
                                        <input ref={titleRef} placeholder="A Description of Your Review" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Rating</label>
                                        <input ref={ratingRef} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Rating Out of 10"></input>
                                    </div>
                                    <div className="mb-6">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Review</label>
                                        <textarea ref={reviewRef} rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Elaborate on Your Thoughts Here..."></textarea>
                                    </div>
                                </form>
                                <button onClick={async ()=>{
                                   await addReview({
                                    variables: {
                                      reviewerID: ID,
                                      title: titleRef.current?.value || "",  
                                      rating: parseInt(ratingRef.current?.value || "0") || 0,  
                                      review: reviewRef.current?.value || "", 
                                    },
                                  })
                                    .then((res) => {
                                      console.log(res);
                                      router.push('/dashboard/reviews');
                                    })
                                    .catch((err) => {
                                      console.error(err);
                                    });
                                }} className="text-white font-medium rounded-lg text-base px-5 py-3 w-full sm:w-auto text-center bg-blue-700">Post Review</button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    ); 
}