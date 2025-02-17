import { ApolloClient, InMemoryCache } from '@apollo/client';
import ENV from './env'

const client = new ApolloClient({
  uri: "http://localhost:3777/graphql",
  cache: new InMemoryCache(),
});

export default client;
