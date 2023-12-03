import { getUserDetails } from "../models/userProfile.js"

export const userResolvers = {
    Query : {
        getUserDetails: async (_, args) => {
            const user = await getUserDetails(args.token);
            return user; 
        }
    }
}