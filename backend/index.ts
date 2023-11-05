import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './graphql/gameSchema.js';
import resolvers from './graphql/gameResolvers.js';

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

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
