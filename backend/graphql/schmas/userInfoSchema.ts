export const userDefs = `#graphql
    type User {
        id: ID
        username: String 
        password: String
        pfp: String 
    }

    type Users {
        id: ID
        username: String
        pfp: String  
    }

    type Query {
        getUserDetails(token: String): User
        getUsers(user: String!, filter: String!): [Users]
    }
`;