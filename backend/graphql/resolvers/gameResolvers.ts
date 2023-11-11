import fetchGames from "../models/gamesModel.js";

const gameResolvers = {
    Query : {
        getGames : async (_, args) => {
            let games = await fetchGames(args.searchParam);
            return games;
        }
    }
 }; 

 export default gameResolvers; 