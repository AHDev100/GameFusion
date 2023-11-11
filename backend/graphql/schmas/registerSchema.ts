const registerDefs = `#graphql
    type Mutation {
        register(newUser: String!, newPassword: String!) : Boolean
    }
`;

export default registerDefs;