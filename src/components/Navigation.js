import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

// Screens
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import GroupScreen from '../screens/GroupScreen';
import GroupDetailScreen from '../screens/GroupDetailScreen';
import CreateGroupScreen from '../screens/CreateGroupScreen';
import JoinGroupScreen from '../screens/joinGroupScreen';
import ProfileScreen from '../screens/ProfileScreen';

// redux
import {connect} from 'react-redux';
// redux store actions
import {userAuthAction} from '../store/actions/homeActions';

// firebase
import auth from '@react-native-firebase/auth';

// component
import TabBar from './TabBar';

//icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UpdateScreen from '../screens/UpdateScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabBarNav = () => {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        initialParams={{icon: 'home'}}
      />
      <Tab.Screen
        name="Groups"
        component={GroupScreen}
        initialParams={{icon: 'addusergroup'}}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        initialParams={{icon: 'enviromento'}}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        initialParams={{icon: 'user'}}
      />
    </Tab.Navigator>
  );
};

const Navigation = ({userAuth, userAuthAction}) => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  // const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    userAuthAction(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return (
      <View style={styles.initialLogo}>
        <MaterialCommunityIcons
          name="map-marker-multiple-outline"
          size={100}
          color="#fe6666"
        />
      </View>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={false}>
        {!userAuth ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={TabBarNav} />
            <Stack.Screen name="Group" component={TabBarNav} />
            <Stack.Screen name="Map" component={TabBarNav} />
            <Stack.Screen name="GroupDetail" component={GroupDetailScreen} />
            <Stack.Screen name="CreateGroup" component={CreateGroupScreen} />
            <Stack.Screen name="JoinGroup" component={JoinGroupScreen} />
            <Stack.Screen name="Update" component={UpdateScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  initialLogo: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStatetoProps = (state) => {
  return {
    userAuth: state.homeReducer.userAuth,
  };
};
const mapDispatchtoProps = (dispatch) => {
  return {
    userAuthAction: (userAuth) => dispatch(userAuthAction(userAuth)),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Navigation);
