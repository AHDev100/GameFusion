import blackList from "../models/logoutModle.js";

const logoutResolver = {
  Mutation: {
    logout: async (_, args) => {
      try {
        const result = await blackList(args.userName, args.passWord);
        return result;
      } catch (error) {
        console.error('Logout error:', error);
        return false; // Handle error and return false
      }
    }
  }
};

export default logoutResolver;
