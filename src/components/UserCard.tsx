import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ZellerCustomer } from '../types';
import { getHeight, getWidth, normalize } from '../utils';
import { colors } from '../theme/colors';

type Props = {
  user: ZellerCustomer;
  testID?: string;
};

const UserCard: React.FC<Props> = ({ user, testID }) => {
  return (
    <View testID={testID} style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {user.name[0]}
        </Text>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>
          {user.name}
        </Text>
        <Text style={styles.userRole}>
          {user.role === 'ADMIN' ? 'Admin' : 'Manager'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: getHeight(0.75),
    marginLeft: getWidth(1),
  },
  avatar: {
    width: getWidth(10),
    height: getWidth(10),
    borderRadius: getWidth(1.5),
    backgroundColor: colors.primiryWithOpacity(99),
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: colors.primary,
    fontWeight: '500',
  },
  userInfo: {
    marginLeft: getWidth(3),
  },
  userName: {
    color: colors.text,
    fontSize: normalize(16),
    fontWeight: '500',
  },
  userRole: {
    color: colors.gray,
    fontSize: normalize(12),
    fontWeight: '500',
  },
});

export default UserCard;
