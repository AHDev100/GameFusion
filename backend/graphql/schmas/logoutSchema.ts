const logoutDefs = `#graphql
    type Mutation {
        logout(userName: String!, passWord: String!): Boolean!
    }
`;

export default logoutDefs; 