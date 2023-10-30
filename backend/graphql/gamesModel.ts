import fetch from 'node-fetch';

interface Game {
    name: String;
    background_image: String;
    released: String; 
    ratings: Object;
}
  
interface ApiResponse {
    results: Game[];
}
  
const fetchGames = async (searchParam : String) => {
    const response = await fetch(`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&search=${searchParam}}&page_size=10`);
    const data = await response.json() as ApiResponse;
    return data.results;
};

export default fetchGames; 