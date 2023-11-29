import { fetchGames, dashboardGames } from "../models/gamesModel.js";

const gameResolvers = {
    Query : {
        getGames : async (_, args) => {
            let games = await fetchGames(args.searchParam);
            return games;
        }, 
        getMainGames : async () => {
            let mainGames = await dashboardGames(); 
            return mainGames; 
        }
    }
 }; 

 export default gameResolvers; 