import React, {useState} from 'react';
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
//

const {width, height} = Dimensions.get('window');

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.headingText}>Family Tracker</Text>
        </View>
        <TextInput
          value={email}
          style={styles.textInput}
          placeholder="Email"
          textContentType="emailAddress"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          value={password}
          style={styles.textInput}
          onChangeText={(text) => setPassword(text)}
          placeholder="Password"
          textContentType="password"
          secureTextEntry={true}
        />
        <TouchableOpacity
          onPress={() => {
            console.log('Login Button Working...');
          }}
          activeOpacity={0.8}
          style={email && password ? styles.button : styles.disabledButton}
          disabled={!(email && password)}>
          <Text
            //  style={styles.buttonText}
            style={
              email && password ? styles.buttonText : styles.disabledButtonText
            }>
            Log In
          </Text>
        </TouchableOpacity>
        <View style={{marginTop: 8}}>
          <TouchableOpacity activeOpacity={0.8}>
            <Text
              style={[
                styles.buttonText,
                {color: '#fe6666', fontWeight: 'normal'},
              ]}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signUp}>
          <Text>Don't Have account?</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('SignUp')}>
            <Text
              style={[styles.buttonText, {color: '#fe6666', marginLeft: 5}]}>
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
    color: '#fe6666',
  },
  textInput: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#fe6666',
    width: width / 1.3,
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#fe6666',
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
  disabledButton: {
    backgroundColor: '#e6e6e6',
    width: width / 1.3,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  disabledButtonText: {
    fontWeight: 'bold',
    color: '#586069',
    fontSize: 15,
  },
});

const mapStatetoProps = (state) => {
  return {};
};
const mapDispatchtoProps = () => {
  return {};
};

export default connect(mapStatetoProps, mapDispatchtoProps)(LoginScreen);
