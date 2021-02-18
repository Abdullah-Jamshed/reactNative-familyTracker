import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
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
        <TouchableOpacity style={styles.button} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <View style={{marginTop: 8}}>
          <TouchableOpacity activeOpacity={0.8}>
            <Text
              style={[styles.buttonText, {color: 'red', fontWeight: 'normal'}]}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signUp}>
          <Text>Don't Have account?</Text>
          <TouchableOpacity activeOpacity={0.8}>
            <Text style={[styles.buttonText, {color: 'red', marginLeft: 5}]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
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
    color: 'red',
  },
  textInput: {
    borderBottomWidth: 1.5,
    borderBottomColor: 'red',
    width: width / 1.3,
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginVertical: 10,
  },
  button: {
    backgroundColor: 'red',
    width: width / 1.3,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#ffffff',
    fontSize: 15,
  },
  signUp: {
    position: 'absolute',
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
});

const mapStatetoProps = (state) => {
  return {};
};
const mapDispatchtoProps = () => {
  return {};
};

export default connect(mapStatetoProps, mapDispatchtoProps)(LoginScreen);
