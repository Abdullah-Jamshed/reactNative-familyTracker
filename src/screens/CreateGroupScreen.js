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

const CreateGroupScreen = ({navigation}) => {
  const [groupName, setGroupName] = useState('');
  const [id, setId] = useState('');
  const [key, setKey] = useState('');

  const makeid = () => {
    const length = 10;
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    setId(result);
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
          onPress={() => {
            console.log('button works...');
          }}
          style={groupName && key ? styles.button : styles.disabledButton}
          disabled={!(groupName && key)}>
          <Text
            style={
              groupName && key ? styles.buttonText : styles.disabledButtonText
            }>
            Create Group
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

export default CreateGroupScreen;
