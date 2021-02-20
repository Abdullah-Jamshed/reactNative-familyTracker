import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/store';
// Screen
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import HomeScreen from './src/screens/HomeScreen';
import MapScreen from './src/screens/MapScreen';

import Navigation from './src/components/Navigation';

//Component
// Redux

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          {/* <LoginScreen /> */}
          {/* <SignUpScreen /> */}
          {/* <MapScreen /> */}
          {/* <HomeScreen /> */}
          <Navigation />
        </View>
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default App;
