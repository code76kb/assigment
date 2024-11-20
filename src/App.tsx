import {ApolloProvider} from '@apollo/client';
import Navigation from './navigation/Navigation';
import client from './network/apolloClient';

export const App = () => (
  <ApolloProvider client={client}>
    <Navigation />
  </ApolloProvider>
);
