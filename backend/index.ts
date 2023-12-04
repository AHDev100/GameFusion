//Server Imports
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

//GraphQL Imports
import gameDefs from './graphql/schmas/gameSchema.js';
import authDefs from './graphql/schmas/authdefs.js';
import { userDefs } from './graphql/schmas/userInfoSchema.js';
import gameResolvers from './graphql/resolvers/gameResolvers.js';
import authResolvers from './graphql/resolvers/authResolvers.js';
import { userResolvers } from './graphql/resolvers/userResolvers.js';

//DB + Caching Imports
import db from './db/db.js';
import User from './db/models/User.js';

const app = express();

const server = new ApolloServer({
  typeDefs: [
    gameDefs,
    authDefs,
    userDefs
  ],
  resolvers: [
    gameResolvers, 
    authResolvers,
    userResolvers
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