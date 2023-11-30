import { fetchGames, dashboardGames, fetchPlatforms } from "../models/gamesModel.js";

const gameResolvers = {
    Query : {
        getGames : async (_, args) => {
            let games = await fetchGames(args.searchParam);
            return games;
        }, 
        getMainGames : async () => {
            let mainGames = await dashboardGames(); 
            return mainGames; 
        }, 
        getPlatforms: async () => {
            let platforms = await fetchPlatforms(); 
            return platforms; 
        }
    }
 }; 

 export default gameResolvers; 