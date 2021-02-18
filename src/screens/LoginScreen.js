import React from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';

// Screen
//Component
// Redux

const {width, height} = Dimensions.get('window');

const LoginScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.headingText}>Family Tracker</Text>
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          textContentType="emailAddress"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          textContentType="password"
          secureTextEntry={true}
        />
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
  heading: {
    position: 'absolute',
    top: 60,
  },
  headingText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textInput: {
    borderBottomWidth: 1.5,
    borderBottomColor: 'red',
    width: width / 1.3,
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginVertical: 10,
  },
});

const mapStatetoProps = (state) => {
  return {};
};
const mapDispatchtoProps = () => {
  return {};
};

export default connect(mapStatetoProps, mapDispatchtoProps)(LoginScreen);
