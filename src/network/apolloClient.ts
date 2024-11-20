import {ApolloClient, InMemoryCache} from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://prrwjjssnvhpbcdwbcwx3nm3zm.appsync-api.ap-southeast-2.amazonaws.com/graphql',
  cache: new InMemoryCache(),
  headers: {
    'x-api-key': 'da2-6y6arb7mwvgrnmds2jignrgr2u',
  },
});

export default client;
