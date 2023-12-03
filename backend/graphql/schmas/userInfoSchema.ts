export const userDefs = `#graphql
    type User {
        id: ID
        username: String 
        password: String
        pfp: String 
    }

    type Query {
        getUserDetails(token: String): User
    }
`;