import React from 'react';
import {Group, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import TabBar from './TabBar';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import GroupScreen from '../screens/GroupScreen';
import GroupDetailScreen from '../screens/GroupDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// const GroupStack = () => {
//   return (
//     <Stack.Navigator headerMode={false}>
//       <Stack.Screen name="GroupStack" component={GroupScreen} />
//       <Stack.Screen name="GroupDetailStack" component={GroupDetailScreen} />
//     </Stack.Navigator>
//   );
// };

// const Navigation = () => {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
//         <Tab.Screen
//           name="Home"
//           component={HomeScreen}
//           initialParams={{icon: 'home'}}
//         />
//         <Tab.Screen
//           name="Groups"
//           component={GroupStack}
//           initialParams={{icon: 'addusergroup'}}
//         />
//         <Tab.Screen
//           name="Map"
//           component={MapScreen}
//           initialParams={{icon: 'enviromento'}}
//         />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// };

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
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={false}>
        <Stack.Screen name="Home" component={TabBarNav} />
        <Stack.Screen name="Group" component={TabBarNav} />
        <Stack.Screen name="Map" component={TabBarNav} />
        <Stack.Screen name="GroupDetail" component={GroupDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
