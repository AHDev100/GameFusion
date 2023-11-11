import isUserAuth from "../models/loginModel.js"

const loginResolvers = {
    Mutation: {
        login : async (_, args) => {
            let isAuth = await isUserAuth(args.userName, args.passWord);
            return isAuth;
        }
    }
};

export default loginResolvers;