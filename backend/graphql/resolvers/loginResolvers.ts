import isUserAuth from "../models/loginModel.js"

const loginResolvers = {
    Mutation: {
        login : async (_, args, { res }) => {
            let auth = await isUserAuth(args.userName, args.passWord);
            res.cookie('token', auth.token, { httpOnly: true });
            return auth;
        }
    }
};

export default loginResolvers;