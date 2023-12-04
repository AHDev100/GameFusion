import { getUserDetails, filterUsers } from "../models/userProfile.js"

export const userResolvers = {
    Query : {
        getUserDetails: async (_, args) => {
            const user = await getUserDetails(args.token);
            return user; 
        }, 
        getUsers: async (_, args) => {
            const users = await filterUsers(args.user, args.filter);
            return users;
        }
    }
}