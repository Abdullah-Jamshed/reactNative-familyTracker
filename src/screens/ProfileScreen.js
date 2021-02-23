import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';

// Redux
import {connect} from 'react-redux';

// firebasee
import auth from '@react-native-firebase/auth';

// icons
import AntDesign from 'react-native-vector-icons/AntDesign';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {width, height} = Dimensions.get('window');

const ProfileScreen = ({navigation, userAuth}) => {
  const signOut = () => {
    auth().signOut();
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.photoContainer}>
          {userAuth.photoURL ? (
            <Image
              reqiure={{uri: userAuth.photoURL}}
              style={styles.imageStyle}
            />
          ) : (
            <View style={styles.photoCircle}>
              <AntDesign name="user" size={60} color={'#c4c4c4'} />
            </View>
          )}
        </View>
        <View style={styles.userDetail}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={signOut} style={[styles.button]}>
              <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  buttonContainer: {
    alignItems: 'center',
    // marginTop: 20,
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
  photoContainer: {
    width,
    backgroundColor: '#fe6666',
    height: 100,
    alignItems: 'center',
    marginBottom: 50,
  },
  photoCircle: {
    position: 'relative',
    top: 50,
    width: 100,
    height: 100,
    backgroundColor: '#f6f6f6',
    borderRadius: 100,
    borderWidth: 5,
    borderColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userDetail: {
    backgroundColor: 'red',
  },
  imageStyle: {
    width: 100,
    height: 100,
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

export default connect(mapStatetoProps, mapDispatchtoProps)(ProfileScreen);
