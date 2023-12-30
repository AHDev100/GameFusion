const gameDefs = `#graphql

type Game {
    name: String!
    id: String
    background_image: String
    released: String
    rating: Float
    metacritic: Int
}

type listing {
    status: String 
    seller: String
    listed_at: String
    sold_at: String
}

type GameMarket {
    numListings: Int
    listings: [listing]
    available: String
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

type Detail {
    id: ID
    name: String
    slug: String
    image_background: String
    games_count: Int
    description: String
}

type Query {
    getGames(searchParam: String!): [Game]
    getMainGames: [Game]
    getPlatforms: Platforms
    getGenres: Genres
    getTags: Tags
    getGameDetails(id: ID!): Game
    getGameMarket(gameID: ID!): GameMarket
    getPlatformDetails(id: ID!): Detail
    getGenreDetails(id: ID!): Detail
    getTagDetails(id: ID!): Detail
}

type Mutation {
    addListing(gameID: ID!, status: String!, sellerID: Int!, listed_at: String!): Boolean
}
`;

export default gameDefs;