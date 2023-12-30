import express from 'express';
import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';

import gameDefs from './graphql/schemas/gameSchema.js';
import authDefs from './graphql/schemas/authdefs.js';
import { userDefs } from './graphql/schemas/userInfoSchema.js';
import gameResolvers from './graphql/resolvers/gameResolvers.js';
import authResolvers from './graphql/resolvers/authResolvers.js';
import { userResolvers } from './graphql/resolvers/userResolvers.js';
import { messageDefs } from './graphql/schemas/messageDefs.js';
import { messageResolvers } from './graphql/resolvers/messageResolvers.js';

// DB Imports
import db from './db/db.js';
import User from './db/models/User.js';
import Review from './db/models/Review.js';
import { Listing } from './db/models/Listing.js';

const app = express();
const httpServer = createServer(app);

const server = new ApolloServer({
  typeDefs: [
    gameDefs,
    authDefs,
    userDefs,
    messageDefs
  ],
  resolvers: [
    gameResolvers,
    authResolvers,
    userResolvers,
    messageResolvers
  ],
});


const schema = makeExecutableSchema({
  typeDefs: [
    gameDefs,
    authDefs,
    userDefs,
    messageDefs
  ],
  resolvers: [
    gameResolvers,
    authResolvers,
    userResolvers,
    messageResolvers
  ],
});

SubscriptionServer.create(
  { execute, subscribe, schema },
  { server: httpServer, path: '/graphql' },
);

await db.sync(); // Note: remove force option if you want to persist data
console.log("All models were synchronized successfully.");

const users = await User.findAll();
console.log(users);

const review = await Review.findAll();
console.log(review);

const listings = await Listing.findAll(); 
console.log(listings);

async function startServer() {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });
}

app.get('/', (req, res) => {
  res.send('You need help');
});

startServer().then(() => {
  httpServer.listen(4000, () => {
    console.log(`🚀 Server ready at http://localhost:4000/graphql`);
  });
}).catch((err) => {
  console.error(`Unable to connect to server: ${err}`);
});
