import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';

const server = new ApolloServer<any>({
  typeDefs,
  resolvers,
});

(async() => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  
  console.log(`Server ready at: ${url}`);
})()