import { getUserDetails, filterUsers } from "../models/userProfile.js";
import { addReview, findAll, findAllByUser, addLike, addDislike, deleteReview } from "../models/reviewModel.js";

export const userResolvers = {
    Query : {
        getUserDetails: async (_, args) => {
            const user = await getUserDetails(args.token);
            return user; 
        }, 
        getUsers: async (_, args) => {
            const users = await filterUsers(args.user, args.filter);
            return users;
        }, 
        getAllReviews: async () => {
            const reviews = await findAll(); 
            return reviews; 
        }, 
        getAllUserReviews: async (_, args) => {
            const reviews = await findAllByUser(args.reviewerID); 
            return reviews; 
        }
    }, 
    Mutation : {
        addReview: async (_, args) => {
            const reviewAdded = await addReview(args.reviewerID, args.review, args.rating, args.title);
            return reviewAdded;
        }, 
        addLike: async (_, args) => {
            const likeAdded = await addLike(args.id); 
            return likeAdded; 
        }, 
        addDislike: async (_, args) => {
            const dislikeAdded = await addDislike(args.id); 
            return dislikeAdded;
        }, 
        deleteReview: async (_, args) => {
            const reviewRemoved = await deleteReview(args.id); 
            return reviewRemoved;
        }
    }
}