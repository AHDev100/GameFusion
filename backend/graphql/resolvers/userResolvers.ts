import { getUserDetails, filterUsers } from "../models/userProfile.js";
import { addReview, findAll, findAllByUser } from "../models/reviewModel.js";

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
            const reviews = await findAllByUser(args.publisher); 
            return reviews; 
        }
    }, 
    Mutation : {
        addReview: async (_, args) => {
            const reviewAdded = await addReview(args.publisher, args.review, args.rating, args.title);
            return reviewAdded;
        }
    }
}