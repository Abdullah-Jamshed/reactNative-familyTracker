import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  PermissionsAndroid,
  TouchableOpacity,
  SafeAreaView,
  Text,
} from 'react-native';

// redux
import {connect} from 'react-redux';
import {setlocationPermission} from '../store/actions/homeActions';

// Libraries Components
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
// import MapViewDirections from 'react-native-maps-directions';

// Icons
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// Map style
import mapStyle from '../styles';

// Components
import DropDown from '../components/DropDown';

const {width, height} = Dimensions.get('window');
// const ASPECT_RATIO = width / height;

const MapScreen = ({locationPermission, setlocationPermission}) => {
  const [location, setLocation] = useState(null);
  // const [hasLocationPermission, setHasLocationPermission] = useState(null);

  // const getLocationPermission = async () => {
  //   const granted = await PermissionsAndroid.check(
  //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //   );
  //   if (granted) {
  //     // console.log('ALready Have Permission');
  //     setlocationPermission(granted);
  //   } else {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //     );
  //     // console.log(granted);
  //     setlocationPermission(granted);
  //   }
  // };

  const getLocationPermission = async () => {
    if (!locationPermission) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      granted == 'granted'
        ? setlocationPermission(true)
        : setlocationPermission(false);
    }
  };

  const geoLocation = () => {
    if (locationPermission) {
      Geolocation.getCurrentPosition(
        ({coords}) => {
          setLocation(coords);
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  };

  // const geoLocation = () => {
  //   if (locationPermission) {
  //     Geolocation.watchPosition(
  //       (data) => {
  //         console.log(data);
  //         // setLocation(coords);
  //       },
  //       (error) => {
  //         // See error code charts below.
  //         console.log(error.code, error.message);
  //       },
  //       {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  //     );
  //   }
  // };

  const currentLocation = () => {
    getLocationPermission();
    geoLocation();
  };

  useEffect(() => {
    getLocationPermission();
    geoLocation();
  }, []);

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <MapView
            onRegionChange={({longitudeDelta, latitudeDelta}) => {
              // setRadius(Math.round(((longitudeDelta + latitudeDelta) ) * 3000));
            }}
            // onPress={({nativeEvent}) => console.log(nativeEvent.coordinate)}
            provider={PROVIDER_GOOGLE}
            style={styles.absolute}
            initialRegion={{
              latitude: 24.885204,
              longitude: 67.169733,
              latitudeDelta: 0.01,
              longitudeDelta: 0.1,
            }}
            region={
              location && {
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.1,
              }
            }
            customMapStyle={mapStyle}>
            <>
              {location && (
                <>
                  <Marker
                    coordinate={{
                      latitude: location.latitude,
                      longitude: location.longitude,
                    }}>
                    <View style={styles.pin}>
                      <MaterialIcons
                        name="my-location"
                        size={20}
                        color="#02dcf9"
                      />
                    </View>
                  </Marker>
                </>
              )}
            </>
          </MapView>

          <TouchableOpacity
            style={styles.locationButton}
            activeOpacity={0.8}
            onPress={currentLocation}>
            <MaterialIcons name="my-location" size={25} color="#02dcf9" />
          </TouchableOpacity>

          <View>
            <DropDown />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  absolute: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  container: {
    flex: 1,
  },
  locationButton: {
    backgroundColor: '#ffff',
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 100,
    right: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
    zIndex: 1,
  },
});

const mapStatetoProps = (state) => {
  return {
    locationPermission: state.homeReducer.locationPermission,
  };
};
const mapDispatchtoProps = (dispatch) => {
  return {
    setlocationPermission: (granted) =>
      dispatch(setlocationPermission(granted)),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(MapScreen);
