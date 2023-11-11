import addUser from "../models/registerModel.js";

const registerResolvers = {
    Mutation : {
        register : async (_, args) => {
            let userCreated = addUser(args.newUser, args.newPassword);
            return userCreated ? true : false; 
        },
    },
};

export default registerResolvers;