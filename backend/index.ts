//Server Imports
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

//GraphQL Imports
import gameDefs from './graphql/schmas/gameSchema.js';
import gameResolvers from './graphql/resolvers/gameResolvers.js';
import loginDefs from './graphql/schmas/loginSchema.js';
import loginResolvers from './graphql/resolvers/loginResolvers.js';
import registerDefs from './graphql/schmas/registerSchema.js';
import registerResolvers from './graphql/resolvers/regsisterResolvers.js';
import logoutDefs from './graphql/schmas/logoutSchema.js';
import logoutResolver from './graphql/resolvers/logoutResolver.js';

//DB + Caching Imports
import db from './db/db.js';
import User from './db/models/User.js';

const app = express();

const server = new ApolloServer({
  typeDefs: [
    gameDefs,
    loginDefs,
    registerDefs,
    logoutDefs,
  ],
  resolvers: [
    gameResolvers, 
    loginResolvers,
    registerResolvers,
    logoutResolver
  ],
});

await db.sync(); // Note: remove force option if you want to persist data
console.log("All models were synchronized successfully.");

const users = await User.findAll();
console.log(users);

async function startServer() {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });
}

app.get('/', (req, res) => {
  res.send('You need help');
})

startServer().then(() => {
  app.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:4000/graphql`);
  });
}).catch((err) => {
  console.error(`Unable to connect to server: ${err}`);
});