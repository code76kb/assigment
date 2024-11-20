import React from 'react';
import { render } from '@testing-library/react-native';
import { ApolloProvider } from '@apollo/client';
import { App } from '../src/App';
import client from '../src/network/apolloClient';

jest.mock('@react-navigation/native', () => {
  return {
    NavigationContainer: ({ children }: any) => children,
  };
});

jest.mock('@react-navigation/stack', () => {
  return {
    createStackNavigator: jest.fn().mockReturnValue({
      Navigator: ({ children }: any) => <>{children}</>,
      Screen: () => null,
    }),
  };
});

jest.mock('../src/navigation/Navigation', () => {
  const { Text } = require('react-native');
  return () => <Text>Mocked Navigation</Text>;
});

describe('App Component', () => {
  test('renders Navigation component', () => {
    const { getByText } = render(
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    );
    
    expect(getByText('Mocked Navigation')).toBeTruthy();
  });
});
