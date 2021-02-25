import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';

//redux
import {connect} from 'react-redux';
import {setGroupDetail} from '../store/actions/homeActions';

// firebase
import firestore from '@react-native-firebase/firestore';

// Icons
import AntDesign from 'react-native-vector-icons/AntDesign';

const {width, height} = Dimensions.get('window');

const GroupScreen = ({navigation, userAuth, setGroupDetail}) => {
  const [groups, setGroups] = useState([]);

  const userUID = userAuth.uid;

  const store = async () => {
    const groupsId = await (
      await firestore().collection('users').doc(`${userUID}`).get()
    ).data().groupsJoined;

    const groupObj = await firestore()
      .collection('groups')
      .where('groupId', 'in', groupsId)
      .get();
    setGroups(groupObj.docs);
  };

  const groupFetch = async () => {
    const groupsId = await (
      await firestore().collection('users').doc(`${userUID}`).get()
    ).data().groupsJoined;

    const onResult = (QuerySnapshot) => {
      setGroups(QuerySnapshot.docs);

      // QuerySnapshot.docs.map((dataVal) => {
      //   const data = dataVal.data();
      //   console.log('================');
      //   console.log(data);
      // });
      // console.log('QuerySnapshot ==>>>', QuerySnapshot.docs);
    };

    const onError = (error) => {
      console.error(error);
    };

    firestore()
      .collection('groups')
      .where('groupId', 'in', groupsId)
      .onSnapshot(onResult, onError);
  };

  useEffect(() => {
    groupFetch();
  }, []);

  // useEffect(() => {
  //   store();
  // }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Groups</Text>
        </View>
        <View style={{marginTop: 20, marginBottom: 190}}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              width,
              paddingVertical: 20,
              paddingHorizontal: 10,
              //   backgroundColor:"red"
            }}>
            {groups !== 0 &&
              groups.map((groupVal, i) => {
                const group = groupVal.data();
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setGroupDetail(group);
                      navigation.navigate('GroupDetail');
                    }}
                    key={i}
                    activeOpacity={1}
                    style={styles.groupContainer}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={styles.groupImage}>
                        <AntDesign name="user" size={40} color={'#e6e6e6'} />
                      </View>
                      <View style={styles.groupDetail}>
                        <Text>{group.groupName}</Text>
                        <Text style={{fontSize: 12}}>
                          {group.members.length} memebers
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
        </View>

        <View style={styles.addGroupButtonContainer}>
          <TouchableOpacity
            style={styles.addGroupButton}
            onPress={() => navigation.navigate('CreateGroup')}>
            <AntDesign name="pluscircleo" size={40} color={'#fe6666'} />
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
    alignItems: 'center',
    // justifyContent: 'center',
    // paddingTop: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fe6666',
  },
  headingContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10,
    width,
  },
  addGroupButtonContainer: {
    position: 'absolute',
    bottom: 100,
    // right: 20,
  },
  addGroupButton: {},
  groupContainer: {
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    // paddingLeft:5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.21,

    elevation: 3,
  },
  groupImage: {
    width: 50,
    height: 50,
    backgroundColor: '#f6f6f6',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  groupDetail: {
    paddingLeft: 10,
    paddingVertical: 5,
    justifyContent: 'space-between',
  },
});

const mapStatetoProps = (state) => {
  return {
    userAuth: state.homeReducer.userAuth,
  };
};
const mapDispatchtoProps = (dispatch) => {
  return {
    setGroupDetail: (groupDetail) => dispatch(setGroupDetail(groupDetail)),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(GroupScreen);
