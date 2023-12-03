import fetch from 'node-fetch';
import key from '../../helpers/key.js';

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
    const data = await response.json() as ApiResponse; 
    return data.results; 
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

export { fetchGames, dashboardGames, fetchPlatforms, fetchGenres, fetchTags }; 