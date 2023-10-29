import fetchGames from "./gamesModel.js";

const resolvers = {
    Query : {
        getGames : async (_, args) => {
            let games = await fetchGames(args.searchParam);
            return games;
        }
    }
 }; 

 export default resolvers; 