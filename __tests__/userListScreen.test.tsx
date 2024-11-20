import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import UserListScreen from '../src/screens/UserListScreen';
import { MockedProvider } from '@apollo/client/testing';
import { LIST_USERS_QUERY } from '../src/network/gqlQueries';

const mocks = [
  {
    request: {
      query: LIST_USERS_QUERY,
      variables: {
        filter: { role: { eq: 'ADMIN' } },
        limit: 10,
      },
    },
    result: {
      data: {
        listZellerCustomers: {
          items: [
            { id: '1', name: 'John Doe', email: 'john@example.com', role: 'ADMIN' },
            { id: '2', name: 'Jane Doe', email: 'jane@example.com', role: 'ADMIN' },
          ],
          nextToken: null,
        },
      },
    },
  },
];

test('renders UserListScreen correctly', async () => {
  const { getByTestId, findByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <UserListScreen />
    </MockedProvider>
  );

  await waitFor(() => expect(getByTestId('UserListScreen_Container')).toBeTruthy());
  expect(getByTestId('UserListScreen_FilterComponent')).toBeTruthy();
  expect(getByTestId('UserListScreen_Divider')).toBeTruthy();
  expect(getByTestId('UserListScreen_Content')).toBeTruthy();
  expect(getByTestId('UserListScreen_Title')).toHaveTextContent('Admin Users');
  expect(getByTestId('UserListScreen_FlatList')).toBeTruthy();

  const user1 = await findByText('John Doe');
  const user2 = await findByText('Jane Doe');
  expect(user1).toBeTruthy();
  expect(user2).toBeTruthy();
});

test('displays loading state', () => {
  const { getByTestId } = render(
    <MockedProvider mocks={[]} addTypename={false}>
      <UserListScreen />
    </MockedProvider>
  );

  expect(getByTestId('UserListScreen_Loading_Text')).toBeTruthy();
});

test('displays error state', async () => {
  const errorMocks = [
    {
      request: {
        query: LIST_USERS_QUERY,
        variables: {
          filter: { role: { eq: 'ADMIN' } },
          limit: 10,
        },
      },
      error: new Error('An error occurred'),
    },
  ];

  const { getByTestId, findByText } = render(
    <MockedProvider mocks={errorMocks} addTypename={false}>
      <UserListScreen />
    </MockedProvider>
  );

  const errorText = await findByText('Error loading users');
  expect(errorText).toBeTruthy();
  expect(getByTestId('UserListScreen_Error_Text')).toBeTruthy();
});