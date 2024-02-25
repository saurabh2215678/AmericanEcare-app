import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PastSurgeryScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Hello World Test</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PastSurgeryScreen;
