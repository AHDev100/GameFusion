import { fetchGames, dashboardGames, fetchPlatforms, fetchGenres, fetchTags } from "../models/gamesModel.js";

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
        }, 
        getGenres: async () => {
            let genres = await fetchGenres(); 
            return genres; 
        }, 
        getTags: async () => {
            let tags = await fetchTags(); 
            return tags; 
        }
    }
 }; 

 export default gameResolvers; 