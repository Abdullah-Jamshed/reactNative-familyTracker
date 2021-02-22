import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const {width, height} = Dimensions.get('window');

const JoinGroupScreen = ({navigation}) => {
  const [id, setId] = useState('');
  const [key, setKey] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <View
          style={{
            marginRight: 20,
          }}>
          <AntDesign
            name="left"
            size={25}
            color={'#fe6666'}
            onPress={() => navigation.goBack()}
          />
        </View>
        <Text style={styles.heading}>Join Group</Text>
      </View>
      {/* <View style={styles.headingContainer}>
        <Text style={styles.heading}>Create Groups</Text>
      </View> */}
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20,
        }}>
        <TextInput
          value={id}
          placeholder="Group Id"
          style={styles.inputFeild}
          onChangeText={(text) => setId(text.trim())}
        />
        <TextInput
          value={key}
          placeholder="Group key"
          style={styles.inputFeild}
          onChangeText={(text) => setKey(text.trim())}
          maxLength={5}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            console.log('button works...');
          }}
          style={id && key ? styles.button : styles.disabledButton}
          disabled={!(id && key)}>
          <Text
            style={id && key ? styles.buttonText : styles.disabledButtonText}>
            Join Group
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fe6666',
  },
  headingContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10,
    paddingTop: 20,
    width,
  },
  inputFeild: {
    borderBottomWidth: 1,
    borderBottomColor: '#fe6666',
    marginVertical: 10,
    padding: 5,
    width: width - 40,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    width: width / 4,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#fe6666',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 15,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#f6f6f6',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  disabledButtonText: {
    fontSize: 15,
    color: '#000',
    fontWeight: 'bold',
  },
});

export default JoinGroupScreen;
