import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './graphql/gameSchema.js';
import resolvers from './graphql/gameResolvers.js';
import dotenv from 'dotenv';
import { createClient } from 'redis';
import connectRedis from 'connect-redis';
import session from 'express-session';
import { Sequelize, DataTypes } from 'sequelize';
import db from './db/db.js';
import User from './db/models/User.js';

dotenv.config();

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
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
  await redisClient.set('mykey', 'Hello from node redis');
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