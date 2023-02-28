import {ApolloServer} from '@apollo/server';
import {startStandaloneServer} from '@apollo/server/standalone';
import decode from 'jwt-decode';

import {typeDefs} from './src/schema.mjs';
import {resolvers} from './src/resolvers.mjs';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: ({message, path}) => ({
    message,
    path,
  }),
});

const {url} = await startStandaloneServer(server, {
  context: async ({req, res}) => {
    const token = req.headers.authorization?.replace('Bearer ', '');

    try {
      const decoded = decode(token);
      // console.log('decoded = ', decoded);

      return {
        email: decoded.email,
      };
    } catch (e) {
      console.log('e = ', e);
      return {};
    }
  },
});
console.log(`🚀 Server ready at ${url}`);
