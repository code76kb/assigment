import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { LIST_USERS_QUERY } from '../network/gqlQueries';
import FilterComponent from '../components/FilterComponent';
import UserCard from '../components/UserCard';
import { ZellerCustomerConnection } from '../types';
import { getHeight, getWidth, normalize } from '../utils';
import { colors } from '../theme/colors';

const UserListScreen = () => {
  const [userRole, setUserRole] = useState<string>('ADMIN');
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const { loading, error, data, refetch } = useQuery<{
    listZellerCustomers: ZellerCustomerConnection;
  }>(LIST_USERS_QUERY, {
    variables: {
      filter: { role: { eq: userRole } },
      limit: 10,
    },
  });

  if (loading)
    return (
      <Text style={styles.loadingText} testID="UserListScreen_Loading_Text">{"Loading..."}</Text>
    );

  if (error)
    return (
      <Text style={styles.errorText} testID="UserListScreen_Error_Text">{"Error loading users"}</Text>
    );


  return (
    <View style={styles.container} testID="UserListScreen_Container">
      <FilterComponent
        selectedType={userRole}
        onChange={setUserRole}
        testID="UserListScreen_FilterComponent"
      />
      <View style={styles.divider} testID="UserListScreen_Divider" />
      <View style={styles.contentContainer} testID="UserListScreen_Content">
        <Text style={styles.title} testID="UserListScreen_Title">
          {userRole === 'ADMIN' ? 'Admin Users' : 'Managers'}
        </Text>
        <FlatList
          data={data?.listZellerCustomers?.items}
          refreshing={refreshing}
          onRefresh={()=>{
            refetch()
          }}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <UserCard user={item} testID={`UserCard_${item.id}`} />
          )}
          contentContainerStyle={styles.flatListContent}
          testID="UserListScreen_FlatList"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingText: {
    color: colors.text,
    fontSize: normalize(12),
    fontWeight: '500',
  },
  errorText: {
    color: colors.text,
    fontSize: normalize(12),
    fontWeight: '500',
  },
  divider: {
    width: getWidth(95),
    height: getHeight(0.1),
    backgroundColor: '#d2d2d2',
    alignSelf: 'center',
  },
  contentContainer: {
    marginTop: getHeight(1),
    marginLeft: getWidth(2.5),
  },
  title: {
    color: colors.text,
    fontSize: normalize(22),
    fontWeight: '500',
  },
  flatListContent: {
    marginTop: getHeight(0.75),
  },
});

export default UserListScreen;
