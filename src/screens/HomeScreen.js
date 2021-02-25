import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

// Redux
import {connect} from 'react-redux';

// firebase
import firestore from '@react-native-firebase/firestore';

// icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Screen
//Component

const HomeScreen = ({navigation, userAuth}) => {
  const createUser = async () => {
    const userUID = userAuth.uid;
    const respone = await firestore().collection('users').doc(userUID).get();
    if (!respone.exists) {
      firestore().collection('users').doc(userUID).set({
        userUID: userAuth.uid,
      });
    }
  };

  useEffect(() => {
    createUser();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.heading}>Location Tracker</Text>
        <MaterialCommunityIcons
          name="map-marker-multiple-outline"
          size={100}
          color="#fe6666"
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('JoinGroup')}
            style={styles.button}>
            <Text style={styles.buttonText}>Join Group</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#fe6666',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 15,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  heading: {
    position: 'absolute',
    top: 50,
    fontSize: 20,
    color: '#fe6666',
    fontWeight: 'bold',
  },
});

const mapStatetoProps = (state) => {
  return {
    userAuth: state.homeReducer.userAuth,
  };
};
const mapDispatchtoProps = () => {
  return {};
};

export default connect(mapStatetoProps, mapDispatchtoProps)(HomeScreen);
