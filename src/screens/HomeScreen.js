import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';

import Geolocation from 'react-native-geolocation-service';

// Redux
import {connect} from 'react-redux';
import {groupsFetch, setlocationPermission} from '../store/actions/homeActions';

// firebase
import firestore from '@react-native-firebase/firestore';

// icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Screen
//Component

const HomeScreen = ({
  navigation,
  userAuth,
  groupsFetch,
  setlocationPermission,
  locationPermission,
}) => {
  const [location, setLocation] = useState(null);

  const createUser = async () => {
    const userUID = userAuth.uid;
    const respone = await firestore().collection('users').doc(userUID).get();
    if (!respone.exists) {
      firestore().collection('users').doc(userUID).set({
        userUID: userAuth.uid,
        userName: userAuth.displayName,
        groupsJoined: [],
      });
    }
  };

  const getLocationPermission = async () => {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (granted) {
      // console.log('ALready Have Permission');
      setlocationPermission(granted);
    } else {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      granted == 'granted'
        ? setlocationPermission(true)
        : setlocationPermission(false);
    }
  };

  const sendLocation = async () => {
    // console.log('location ==>>> ', location);
    location &&
      firestore().collection('users').doc(userAuth.uid).update({location});
  };

  // const geoLocation = () => {
  //   // console.log('locationPermission ==>> ', locationPermission);
  //   if (locationPermission) {
  //     Geolocation.getCurrentPosition(
  //       ({coords}) => {
  //         console.log(coords);
  //         setLocation(coords);
  //       },
  //       (error) => {
  //         // See error code charts below.
  //         console.log(error.code, error.message);
  //       },
  //       {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  //     );
  //   }
  // };

  const geoLocation = () => {
    if (locationPermission) {
      Geolocation.watchPosition(
        (data) => {
          console.log(data);
          // setLocation(coords);
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  };

  useEffect(() => {
    sendLocation();
  }, [location]);

  useEffect(() => {
    geoLocation();
  }, [locationPermission]);

  useEffect(() => {
    createUser();
    groupsFetch();
    getLocationPermission();
    geoLocation();
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
    locationPermission: state.homeReducer.locationPermission,
  };
};
const mapDispatchtoProps = (dispatch) => {
  return {
    groupsFetch: () => dispatch(groupsFetch()),
    setlocationPermission: (granted) => {
      dispatch(setlocationPermission(granted));
    },
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(HomeScreen);
