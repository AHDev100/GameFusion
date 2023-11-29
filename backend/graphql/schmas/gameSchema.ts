const gameDefs = `#graphql
type Game {
    name: String!
    background_image: String
    released: String
    rating: Float
    metacritic: Int
}

type Query {
    getGames(searchParam: String!): [Game]
    getMainGames: [Game]
}
`;

export default gameDefs;