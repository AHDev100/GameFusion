const loginDefs = `#graphql 
    type Login {
        userName: String!
        passWord: String!
    }

    type Mutation {
        login(userName: String!, passWord: String!): Boolean
    }
`; 

export default loginDefs; 