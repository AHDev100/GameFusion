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

//DB + Caching Imports
import { createClient } from 'redis';
import connectRedis from 'connect-redis';
import { Sequelize, DataTypes } from 'sequelize';
import db from './db/db.js';
import User from './db/models/User.js';

const app = express();

const server = new ApolloServer({
  typeDefs: [
    gameDefs,
    loginDefs,
    registerDefs,
  ],
  resolvers: [
    gameResolvers, 
    loginResolvers,
    registerResolvers,
  ],
  context: ({ req }) => {
    // The return value of this function becomes your context
    return req;
  },
});

await db.sync(); // Note: remove force option if you want to persist data
console.log("All models were synchronized successfully.");

const users = await User.findAll();
console.log(users);

const startRedis = async () => {
  const redisClient = createClient(); 
  await redisClient.connect();
}

async function startServer() {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });
  startRedis();
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