import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../src/screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import '@testing-library/jest-native/extend-expect';


jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  const navigateMock = jest.fn();
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: navigateMock,
    }),
    __mockNavigate: navigateMock,
  };
});

const { __mockNavigate: navigateMock } = jest.requireMock('@react-navigation/native');

describe('HomeScreen Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders HomeScreen correctly', () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>
    );

    expect(getByTestId('Home_Screen_Container')).toBeTruthy();
    expect(getByTestId('Home_Screen_Title')).toHaveTextContent('Welcome to the Zeller App');
    expect(getByTestId('Home_Screen_GoToUserList_Button')).toBeTruthy();
  });

  test('navigates to User List on button press', () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>
    );

    fireEvent.press(getByTestId('Home_Screen_GoToUserList_Button'));
    expect(navigateMock).toHaveBeenCalledWith('Users');
  });
});
