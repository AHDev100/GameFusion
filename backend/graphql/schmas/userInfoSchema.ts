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
        id: ID
        reviewerID: ID
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
        getAllReviews: [Review]
        getAllUserReviews(reviewerID: ID!): [Review]
    }

    type Mutation {
        addReview(reviewerID: ID!, review: String!, rating: Int!, title: String!): Boolean
        addLike(id: ID!): Boolean
        addDislike(id: ID!): Boolean
        deleteReview(id: ID!): Boolean
    }
`;