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

    type Review {
        publisher: ID
        review: String 
        rating: Int 
        title: String 
        likes: Int 
        dislikes: Int
        created_at: String 
    }

    type Query {
        getUserDetails(token: String): User
        getUsers(user: String!, filter: String!): [Users]
        getAllReviews(publisher: ID!): [Review]
    }

    type Mutation {
        addReview(publisher: ID!, review: String!, rating: Int!, title: String!): Boolean
    }
`;