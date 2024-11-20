import {Dimensions, PixelRatio, Platform} from 'react-native';
import {ZellerCustomer} from '../types';

export const filterUsersByRole = (
  users: ZellerCustomer[],
  role: string,
): ZellerCustomer[] => {
  return users.filter(user => user.role === role);
};

export const filterUsersByField = (
  users: ZellerCustomer[],
  field: keyof ZellerCustomer,
  value: string,
): ZellerCustomer[] => {
  return users.filter(user =>
    user[field]?.toLowerCase().includes(value.toLowerCase()),
  );
};

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const scale = SCREEN_WIDTH / 320;

export function normalize(size: number): number {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

export const getWidth = (percentage: number): number => {
  const value = (percentage * SCREEN_WIDTH) / 100;
  return Math.round(value);
};
export const getHeight = (percentage: number): number => {
  const value = (percentage * SCREEN_HEIGHT) / 100;
  return Math.round(value);
};
