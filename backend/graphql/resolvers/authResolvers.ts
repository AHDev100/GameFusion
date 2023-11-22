import isUserAuth from "../models/loginModel.js"
import blackList from "../models/logoutModle.js";
import addUser from "../models/registerModel.js";

const authResolvers = {
    Mutation: {
        login : async (_, args) => {
            let auth = await isUserAuth(args.userName, args.passWord);
            return auth;
        }, 
        logout: async (_, args) => {
            try {
              const result = await blackList(args.userName, args.passWord);
              return result;
            } catch (error) {
              console.error('Logout error:', error);
              return false; 
            }
        }, 
        register : async (_, args) => {
            let userCreated = addUser(args.newUser, args.newPassword);
            return userCreated ? true : false; 
        },
    }
}

export default authResolvers; 