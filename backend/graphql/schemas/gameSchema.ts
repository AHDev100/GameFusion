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

type Genre {
    id: ID
    name: String!
    games_count: Int 
    image_background: String
}

type Genres {
    results: [Genre]
}

type Tag {
    id: ID
    name: String!
    slug: String
    games_count: Int 
    image_background: String
}

type Tags {
    results: [Tag]
}

type Query {
    getGames(searchParam: String!): [Game]
    getMainGames: [Game]
    getPlatforms: Platforms
    getGenres: Genres
    getTags: Tags
}
`;

export default gameDefs;