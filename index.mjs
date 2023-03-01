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

const handleContext = async ({req, res}) => {
  const token =
    req.headers.authorization?.indexOf('Bearer ') === 0
      ? req.headers.authorization?.replace('Bearer ', '')
      : undefined;

  try {
    const decoded = decode(token);
    return {
      email: decoded.email,
    };
  } catch (e) {
    console.error('e = ', e);
    return {};
  }
};

const {url} = await startStandaloneServer(server, {
  context: handleContext,
});
console.log(`🚀 Server ready at ${url}`);
