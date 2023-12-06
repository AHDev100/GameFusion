const authDefs = `#graphql 
    type Auth {
        isAuth: Boolean!, 
        token: String!
    }

    type Mutation {
        login(userName: String!, passWord: String!): Auth
    }

    type Mutation {
        logout(userName: String!, passWord: String!): Boolean!
    }

    type Mutation {
        register(newUser: String!, newPassword: String!) : Boolean
    }
`;

export default authDefs; 