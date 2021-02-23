import React, {useState} from 'react';
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

// component
import TabBar from './TabBar';

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
    </Tab.Navigator>
  );
};

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={false}>
        {!isLoggedIn ? (
          <>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
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
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
