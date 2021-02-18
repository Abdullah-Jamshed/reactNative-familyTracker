import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

import LoginScreen from './src/screens/LoginScreen';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <LoginScreen />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default App;
