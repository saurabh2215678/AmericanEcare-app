// Sidebar.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Sidebar = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Sidebar Content</Text>
      <Button title="Close Drawer" onPress={() => navigation.closeDrawer()} />
      {/* Add additional sidebar content here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
});

export default Sidebar;
