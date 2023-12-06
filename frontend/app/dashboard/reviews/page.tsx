"use client";

import { useState, useEffect } from "react";
import { MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { useQuery, gql, useMutation } from "@apollo/client";
import '../scroll.css'

export default function review(){

    function parseJwt(token: string | null) {
      if (!token) return null;
      return JSON.parse(atob(token.split('.')[1]));
    }

    const [ID, setID] = useState<String>(""); 

    useEffect(() => {
      const token = sessionStorage.getItem("token");
        const parsedID = parseJwt(token)?.id;
        setID(parsedID);
        console.log(ID);
    }, []);

    // useEffect(() => {
    //   console.log(ID);
    // }, [ID]);

    const router = useRouter();

    const GET_REVIEWS = gql`
        query GetAllReviews {
            getAllReviews {
                id
                reviewerID
                title
                review
                rating
                likes
                dislikes
            }
        }
    `;

    const ADD_LIKE = gql`
      mutation AddLike($id: ID!){
        addLike(id: $id)
      }
    `;

    const ADD_DISLIKE = gql`
      mutation AddDislike($id: ID!){
        addDislike(id: $id)
      }
    `;  

    const DELETE_REVIEW = gql`
      mutation DeleteReview($id: ID!){
        deleteReview(id: $id)
      }
    `;  

    const { loading, error, data } = useQuery(GET_REVIEWS);
    const [addLike] = useMutation(ADD_LIKE, {
      refetchQueries: [{query: GET_REVIEWS}]
    }); 
    const [addDislike] = useMutation(ADD_DISLIKE, {
      refetchQueries: [{query: GET_REVIEWS}]
    });
    const [deleteReview] = useMutation(DELETE_REVIEW, {
      refetchQueries: [{query: GET_REVIEWS}]
    });

    const handleRoute = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        router.push('/dashboard/reviews/add');
    }

    return (
        <div className="flex flex-col items-center bg-orange-400 w-full p-4 overflow-y-auto min-h-screen">
          <h1 className="font-bold text-xl mb-4">Latest Reviews:</h1>
          {ID !== null && data &&
            data.getAllReviews.map((review: any, index : any) => {
              return (
                <div
                  className="bg-green-200 p-4 my-4 rounded-md w-full max-w-md"
                  key={index}
                >
                  <h1>Review ID: {review.id}</h1>
                  <h1 className="text-lg font-bold mb-2">User ID: {review.reviewerID}</h1>
                  <p className="mb-2">Title: {review.title}</p>
                  <p className="mb-2">Rating: {review.rating}</p>
                  <p className="mb-2">Review: {review.review}</p>
                  <p className="mb-2">Likes: {review.likes}</p>
                  <p className="mb-2">Dislikes: {review.dislikes}</p>
                  <button onClick={async ()=>{
                    await addLike({
                      variables: {id: review.id}
                    })
                  }} className="relative bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center text-white dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-9001">Like</button>
                  <button onClick={async () => {
                    await addDislike({
                      variables: {id: review.id}
                    })
                  }} className="relative mx-2 bg-red-700 hover:bg-red-800 font-medium text-sm px-5 py-2.5 text-center text-white dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Dislike</button>
                  {(review.reviewerID == ID) && <button onClick={async () => {
                    await deleteReview({
                      variables: {id: review.id}
                    })
                  }} className="relative bg-red-700 hover:bg-red-800 font-medium text-sm px-5 py-2.5 text-center text-white dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>}
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
