import React, {useState, useEffect} from 'react';

// React Native component
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

// Map style
import mapStyle from '../styles';

// env Variable

// import {API_TOKEN} from '@env'; // get your api key from google map platform
// console.log(API_TOKEN);
// Icons
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;

const MapScreen = ({screenName}) => {
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
        {screenName === 'Home' && (
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

            <Marker
              coordinate={{
                latitude: 24.885204,
                longitude: 67.169733,
              }}>
              <View style={styles.pin}>
                <Fontisto name="map-marker-alt" size={30} color="#02dcf9" />
              </View>
            </Marker>

            <Circle
              key="test"
              center={{
                latitude: 24.885204,
                longitude: 67.169733,
              }}
              radius={10}
              strokeWidth={1}
              strokeColor={'rgb(2,220,159)'}
              fillColor={'rgba(2,220,159,.25)'}
            />
            <Marker
              coordinate={{
                latitude: 24.886192,
                longitude: 67.175808,
              }}>
              <View style={styles.navigatorPin}>
                <Ionicons name="navigate" size={20} color="#fff" />
              </View>
            </Marker>
          </>
        )}
        {screenName === 'Book' && (
          <>
            <Circle
              key="test"
              center={{
                latitude: 24.885204,
                longitude: 67.169733,
              }}
              radius={10}
              strokeWidth={1}
              strokeColor={'rgb(2,220,159)'}
              fillColor={'rgba(2,220,159,.25)'}
            />
            <Marker
              coordinate={{
                latitude: 24.885204,
                longitude: 67.169733,
              }}>
              <View
                style={[styles.navigationDot, {backgroundColor: '#02dcf9'}]}
              />
            </Marker>
            <Circle
              // key={(24.886252 + 67.175808).toString()}
              center={{
                latitude: 24.886192,
                longitude: 67.175808,
              }}
              radius={60}
              strokeWidth={1}
              strokeColor={'rgb(247, 70, 86)'}
              fillColor={'rgba(247, 70, 86,.25)'}
            />
            <Marker
              coordinate={{
                latitude: 24.886192,
                longitude: 67.175808,
              }}>
              <View
                style={[styles.navigationDot, {backgroundColor: '#f74656'}]}
              />
            </Marker>
          </>
        )}

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
  navigatorPin: {
    width: 40,
    height: 40,
    borderRadius: 60,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5,
  },
  navigationDot: {
    width: 10,
    height: 10,
    borderRadius: 10,
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
