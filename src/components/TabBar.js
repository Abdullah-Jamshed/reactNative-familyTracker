import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const TabBar = ({state: {routes}, navigation}) => {
  const [selected, setSelected] = useState('Home');

  const routeChange = ({name}) => {
    setSelected(name);
    navigation.navigate(name);
  };

  return (
    <View style={styles.wrapper}>
      {routes.map((route) => {
        return (
          <TouchableOpacity key={route.key} onPress={()=>routeChange(route)}>
            <Text style={{color: route.name == selected ? 'red' : '#000'}}>
              {route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 20,
    width: width / 1.2,
    height: 50,
    backgroundColor: '#e5e5e5',
    alignSelf: 'center',
    borderRadius: 100,
    paddingVertical: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  container: {},
});

export default TabBar;
