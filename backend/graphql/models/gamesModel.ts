import fetch from 'node-fetch';
import key from '../../helpers/key.js';
import { Listing } from '../../db/models/Listing.js';

interface Game {
    name: String
    id: String
    background_image: String
    released: String
    ratings: Object
}
  
interface ApiResponse {
    results: Game[];
}

const fetchMarket = async (gameID: Number) => {
    const listings = await Listing.findAll({
        where: {gameID}
    });
    const numListings = await Listing.count({
        where: {gameID}
    });
    return {
        numListings, 
        listings
    }; 
}

const postListing = async (gameID : Number | String, status : String, sellerID : Number | String, listed_at : String) => {
    try {
        await Listing.create({
            gameID, 
            status, 
            seller: sellerID, 
            listed_at, 
        });
        return true; 
    } catch (error) {
        console.error(error);
        return false;
    }
}

const fetchGames = async (searchParam : String) => {
    const response = await fetch(`https://api.rawg.io/api/games?key=${key}&search=${searchParam}}&page_size=12`);
    const data = await response.json() as ApiResponse;
    return data.results;
};

const dashboardGames = async () => {
    const response = await fetch(`https://api.rawg.io/api/games?key=${key}&page_size=15`);
    const data = await response.json() as ApiResponse;
    return data.results;
}; 

const fetchPlatforms = async () => {
    const response = await fetch(`https://api.rawg.io/api/platforms?key=${key}&ordering=-games_count&page_size=15`);
    return response.json(); 
};

const fetchGenres = async () => {
    const response = await fetch(`https://api.rawg.io/api/genres?key=${key}&ordering=-games_count&page_size=15`);
    const data = await response.json() as ApiResponse;
    return data; 
}; 

const fetchTags = async () => {
    const response = await fetch(`https://api.rawg.io/api/tags?key=${key}&ordering=-games_count&page_size=15`);
    const data = await response.json() as ApiResponse; 
    return data; 
}

export { fetchGames, dashboardGames, fetchPlatforms, fetchGenres, fetchTags, fetchMarket, postListing }; 