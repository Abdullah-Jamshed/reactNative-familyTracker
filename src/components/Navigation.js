import React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import TabBar from './TabBar';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import GroupScreen from '../screens/GroupScreen';

const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
        <Tab.Screen name="Home" component={HomeScreen} initialParams={{icon:"home"}} />
        <Tab.Screen name="Groups" component={GroupScreen} initialParams={{icon:"addusergroup"}} />
        <Tab.Screen name="Map" component={MapScreen} initialParams={{icon:"enviromento"}} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
