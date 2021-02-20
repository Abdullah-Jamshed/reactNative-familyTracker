import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';

// Libraries Components
import MapView, {PROVIDER_GOOGLE, Marker, Circle} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
// import MapViewDirections from 'react-native-maps-directions';

// Icons
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// Map style
import mapStyle from '../styles';


const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [hasLocationPermission, setHasLocationPermission] = useState(null);

  const locationPermission = async () => {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (granted) {
      // console.log('ALready Have Permission');
      setHasLocationPermission(granted);
    } else {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      // console.log(granted);
      setHasLocationPermission(granted);
    }
  };

  const geoLocation = () => {
    if (hasLocationPermission) {
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

  const currentLocation = () => {
    locationPermission();
    geoLocation();
  };

  useEffect(() => {
    locationPermission();
    geoLocation();
  }, []);

  return (
    <>
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
          longitudeDelta: 0.01 * ASPECT_RATIO,
        }}
        region={
          location && {
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01 * ASPECT_RATIO,
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
                  <MaterialIcons name="my-location" size={20} color="#02dcf9" />
                </View>
              </Marker>
            </>
          )}
        </>

        {/* <MapViewDirections
          mode="WALKING"
          apiKey={REACT_APP_API_KEY}
          origin={{
            latitude: 24.885204,
            longitude: 67.169733,
          }}
          destination={{
            latitude: 24.886192,
            longitude: 67.175808,
          }}
          strokeWidth={3}
          strokeColor="#000"
          fillColor="#000"
        /> */}
      </MapView>

      <TouchableOpacity
        style={styles.locationButton}
        activeOpacity={0.8}
        onPress={currentLocation}>
        <MaterialIcons name="my-location" size={25} color="#02dcf9" />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  absolute: {
    ...StyleSheet.absoluteFillObject,
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
    bottom: 40,
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

const mapStatetoProps = () => {
  return {};
};
const mapDispatchtoProps = () => {
  return {};
};

export default connect(mapStatetoProps, mapDispatchtoProps)(MapScreen);
