import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';

const {width, height} = Dimensions.get('window');

//redux
import {connect} from 'react-redux';
// firebase
import firestore from '@react-native-firebase/firestore';
// icons
import AntDesign from 'react-native-vector-icons/AntDesign';

const JoinGroupScreen = ({navigation, userAuth}) => {
  const [id, setId] = useState('');
  const [key, setKey] = useState('');
  const [groupNotExits, setGroupNotExits] = useState(false);
  const [wrongKey, setWrongKey] = useState(false);

  const joinGroup = async () => {
    groupNotExits && setGroupExits(false);
    wrongKey && setWrongKey(false);
    const dataObj = await firestore().collection('groups').doc(id).get();

    if (dataObj.exists) {
      const {groupKey} = dataObj.data();
      if (key == groupKey) {
        firestore()
          .collection('users')
          .doc(userAuth.uid)
          .update({
            groupsJoined: firestore.FieldValue.arrayUnion(id),
          });
        setId('');
        setKey('');
        navigation.goBack();
      } else {
        setWrongKey(true);
      }
    } else {
      setGroupNotExits(true);
    }
  };
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
        {groupNotExits && (
          <View style={styles.helperTextContainer}>
            <Text style={styles.helperText}>wrong group id</Text>
          </View>
        )}
        <TextInput
          value={key}
          placeholder="Group key"
          style={styles.inputFeild}
          onChangeText={(text) => setKey(text.trim())}
          maxLength={5}
        />
        {wrongKey && (
          <View style={styles.helperTextContainer}>
            <Text style={styles.helperText}>wrong group key</Text>
          </View>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={joinGroup}
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
  helperTextContainer: {
    width: width / 1.15,
  },
  helperText: {
    fontSize: 12,
    color: '#fe6666',
  },
});

const mapStatetoProps = (state) => {
  return {
    userAuth: state.homeReducer.userAuth,
  };
};
const mapDispatchtoProps = () => {
  return {};
};

export default connect(mapStatetoProps, mapDispatchtoProps)(JoinGroupScreen);
