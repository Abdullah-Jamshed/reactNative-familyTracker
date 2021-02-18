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

// icons
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screen
// Component
// Redux

const {width, height} = Dimensions.get('window');

const SignUpScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.8} style={styles.backButton}>
          <Ionicons
            name="chevron-back"
            size={30}
            style={styles.backButtonIcons}
          />
        </TouchableOpacity>
        <View style={styles.heading}>
          <Text style={styles.headingText}>Family Tracker</Text>
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="Name"
          textContentType="name"
        />
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
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
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
    top: 42,
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
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  backButtonIcons: {
    color: 'red',
  },
});

const mapStatetoProps = (state) => {
  return {};
};
const mapDispatchtoProps = () => {
  return {};
};

export default connect(mapStatetoProps, mapDispatchtoProps)(SignUpScreen);
