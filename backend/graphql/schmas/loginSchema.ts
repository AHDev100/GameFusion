const loginDefs = `#graphql 
    type Auth {
        isAuth: Boolean!, 
        token: String!
    }

    type Mutation {
        login(userName: String!, passWord: String!): Auth
    }
`; 

export default loginDefs; 