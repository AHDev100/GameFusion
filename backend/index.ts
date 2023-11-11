//Server Imports
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

//GraphQL Imports
import gameDefs from './graphql/schmas/gameSchema.js';
import gameResolvers from './graphql/resolvers/gameResolvers.js';
import loginDefs from './graphql/schmas/loginSchema.js';
import loginResolvers from './graphql/resolvers/loginResolvers.js';

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
  ],
  resolvers: [
    gameResolvers, 
    loginResolvers,
  ],
});

await db.sync({ force: true });
console.log("All models were synchronized successfully.");

const newUser = await User.create({
  username: 'johndoe',
  password: 'password123', // make sure to hash the password before storing
});
await newUser.save();

const user = await User.findOne({ where: { username: 'johndoe' } });
console.log(user.dataValues.password);

const startRedis = async () => {
  const redisClient = createClient(); 
  await redisClient.connect();
  const myKeyValue = await redisClient.get('mykey');
  console.log(myKeyValue);
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