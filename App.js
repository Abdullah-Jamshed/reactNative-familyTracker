import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Provider} from 'react-redux';

// // firebase
// import auth from '@react-native-firebase/auth';

//Component
import Navigation from './src/components/Navigation';

// Redux
import store from './src/store';

//icons
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const App = () => {

  // // Set an initializing state whilst Firebase connects
  // const [initializing, setInitializing] = useState(true);
  // const [user, setUser] = useState();

  // // Handle user state changes
  // function onAuthStateChanged(user) {
  //   setUser(user);
  //   if (initializing) setInitializing(false);
  // }

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);

  // if (initializing) {
  //   return (
  //     <View style={styles.initialLogo}>
  //       <MaterialCommunityIcons
  //         name="map-marker-multiple-outline"
  //         size={100}
  //         color="#fe6666"
  //       />
  //     </View>
  //   );
  // }

  return (
    <Provider store={store}>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
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
  // initialLogo: {
  //   flex: 1,
  //   backgroundColor: '#ffffff',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
});

export default App;
