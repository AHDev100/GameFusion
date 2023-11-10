import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './graphql/gameSchema.js';
import resolvers from './graphql/gameResolvers.js';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { createClient } from 'redis';
import connectRedis from 'connect-redis';
import session from 'express-session';

dotenv.config();

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startRedis = async () => {
  const redisClient = createClient(); 
  await redisClient.connect();
  await redisClient.set('mykey', 'Hello from node redis');
  const myKeyValue = await redisClient.get('mykey');
  console.log(myKeyValue);
}

const db = new Sequelize(`${process.env.DB_NAME}`, `${process.env.DB_USER}`, `${process.env.DB_PWD}`, {
  host: 'localhost', 
  dialect: 'postgres', 
  port: 5432,
});

db.authenticate().then(() => {
  console.log('Connection to GameFusion db established successfully!');
  startRedis();
}).catch((err) => {
  console.error('Unable to connect: ', err)
})

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
});
