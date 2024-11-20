import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';


const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container} testID="Home_Screen_Container">
      <Text style={styles.title} testID="Home_Screen_Title">{"Welcome to the Zeller App"}</Text>
      <Button
        title="Go to User List"
        onPress={() => navigation.navigate('Users')}
        testID="Home_Screen_GoToUserList_Button"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'black'
  },
});


export default HomeScreen;
