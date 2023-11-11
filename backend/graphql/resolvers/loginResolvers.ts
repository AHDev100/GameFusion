import isUserAuth from "../models/loginModel.js"

const loginResolvers = {
    Mutation: {
        login : async (_, args) => {
            let auth = await isUserAuth(args.userName, args.passWord);
            return auth;
        }
    }
};

export default loginResolvers;