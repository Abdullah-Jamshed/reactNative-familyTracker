import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';

// redux
import {connect} from 'react-redux';
import {groupsFetch} from '../store/actions/homeActions';

// icons
import AntDesign from 'react-native-vector-icons/AntDesign';

// firebase
import firestore from '@react-native-firebase/firestore';

const {width, height} = Dimensions.get('window');

const CreateGroupScreen = ({navigation, userAuth, groupsFetch}) => {
  const [groupName, setGroupName] = useState('');
  const [id, setId] = useState('');
  const [key, setKey] = useState('');

  const makeid = () => {
    const length = 4;
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    setId(result);
  };

  const createGroup = () => {
    const userUID = userAuth.uid;
    firestore()
      .collection('groups')
      .doc(id)
      .set({
        adminUID: userUID,
        groupId: id,
        groupName: groupName,
        groupKey: key,
        members: [
          {
            userUID,
            name: userAuth.displayName,
          },
        ],
      })
      .then(() => {
        groupsFetch();
        firestore()
          .collection('users')
          .doc(userAuth.uid)
          .update({
            groupsJoined: firestore.FieldValue.arrayUnion(id),
          });
        navigation.goBack();
        // console.log('Doc successful');
      })
      .catch((error) => {
        console.error('Error writing doc', error);
      });
  };

  useEffect(() => {
    makeid();
  }, []);

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
        <Text style={styles.heading}>Create Group</Text>
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
        {/* <Text style={styles.inputLabel}>Group Name</Text> */}
        <TextInput
          value={groupName}
          placeholder="Group name"
          style={styles.inputFeild}
          onChangeText={(text) => setGroupName(text)}
          maxLength={12}
        />
        <TextInput
          value={id}
          placeholder="Group Id"
          style={styles.inputFeild}
          editable={false}
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
          onPress={createGroup}
          style={groupName && key ? styles.button : styles.disabledButton}
          disabled={!(groupName && key)}>
          <Text
            style={
              groupName && key ? styles.buttonText : styles.disabledButtonText
            }>
            Create Group
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            firestore().collection('groups').doc('7urn').delete();
            navigation.goBack();
          }}
          style={[styles.button, {marginTop: 10}]}>
          <Text style={styles.buttonText}>Delete Group</Text>
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
    color: '#586069',
    fontWeight: 'bold',
  },
});

const mapStatetoProps = (state) => {
  return {
    userAuth: state.homeReducer.userAuth,
  };
};
const mapDispatchtoProps = (dispatch) => {
  return {
    groupsFetch: () => dispatch(groupsFetch()),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(CreateGroupScreen);
