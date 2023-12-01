const gameDefs = `#graphql
type Game {
    name: String!
    id: String
    background_image: String
    released: String
    rating: Float
    metacritic: Int
}

type Platform {
    id: ID
    name: String!
    games_count: Int 
    image_background: String
    year_start: String
    year_end: String
}

type Platforms {
    results: [Platform]
}

type Query {
    getGames(searchParam: String!): [Game]
    getMainGames: [Game]
    getPlatforms: Platforms
}
`;

export default gameDefs;