import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';

//  Icons
import AntDesign from 'react-native-vector-icons/AntDesign';

const {width, height} = Dimensions.get('window');

const TabBar = ({state: {routes}, navigation}) => {
  const [selected, setSelected] = useState('Home');

  const routeChange = ({name}) => {
    setSelected(name);
    navigation.navigate(name);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {routes.map((route) => {
          return (
            <TouchableOpacity
              key={route.key}
              activeOpacity={1}
              onPress={() => routeChange(route)}
              style={{alignItems: 'center'}}>
              {route.params.icon && (
                <AntDesign
                  name={route.params.icon}
                  color={route.name == selected ? 'red' : '#000'}
                  size={20}
                />
              )}
              <Text style={{color: route.name == selected ? 'red' : '#000'}}>
                {route.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 25,
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    borderRadius: 100,
    width: width / 1.2,
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default TabBar;
