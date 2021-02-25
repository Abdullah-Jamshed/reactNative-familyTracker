import React from 'react';
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

// Icons
import AntDesign from 'react-native-vector-icons/AntDesign';

const {width, height} = Dimensions.get('window');

const GroupDetailScreen = ({navigation, groupDetail, setGroupDetail}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
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
              onPress={() => {
                setGroupDetail(null);
                navigation.goBack();
              }}
            />
          </View>
          <Text style={styles.heading}>Groups Details</Text>
        </View>
        {groupDetail && (
          <>
            <View style={styles.groupSecretsContainer}>
              <View style={styles.groupSecrets}>
                <Text style={styles.secretHeading}>Group id:</Text>
                <Text>{groupDetail.groupId}</Text>
              </View>
              <View style={styles.groupSecrets}>
                <Text style={styles.secretHeading}>Group key:</Text>
                <Text>{groupDetail.groupKey}</Text>
              </View>
            </View>

            <View style={{marginTop: 0, flex: 1}}>
              <View style={{padding: 10}}>
                <Text style={[styles.heading, {fontSize: 16, marginLeft: 0}]}>
                  Groups Memebers:
                </Text>
              </View>
              <ScrollView
                contentContainerStyle={{
                  flexGrow: 1,
                  width,
                  paddingVertical: 20,
                  alignItems: 'center',
                }}>
                {groupDetail.members.length !== 0 ? (
                  groupDetail.members.map((member, i) => {
                    return (
                      <TouchableOpacity
                        key={i}
                        activeOpacity={1}
                        style={styles.groupContainer}>
                        <View style={{flexDirection: 'row'}}>
                          <View style={styles.groupImage}>
                            <AntDesign
                              name="user"
                              size={40}
                              color={'#e6e6e6'}
                            />
                          </View>
                          <View style={styles.groupDetail}>
                            <Text style={{fontSize: 15}}>{member.name}</Text>
                            {member.userUID === groupDetail.adminUID && (
                              <Text style={styles.badge}>admin</Text>
                            )}
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  })
                ) : (
                  <View style={styles.subHeadingCont}>
                    <Text style={styles.subHeading}>No Any Members</Text>
                  </View>
                )}
              </ScrollView>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
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
  groupContainer: {
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.21,
    elevation: 3,
    width: width / 1.1,
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
    paddingRight: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: width / 1.1 - 50,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  groupSecretsContainer: {
    width,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  groupSecrets: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
  },
  secretHeading: {
    fontSize: 15,
    marginRight: 10,
    fontWeight: 'bold',
  },
  subHeading: {
    fontSize: 16,
    textTransform: 'uppercase',
  },
  subHeadingCont: {
    padding: 20,
    alignItems: 'center',
  },
  badge: {
    fontSize: 13,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderRadius: 60,
    color: '#fe6666',
    borderColor: '#fe6666',
  },
});

const mapStatetoProps = (state) => {
  return {
    userAuth: state.homeReducer.userAuth,
    groupDetail: state.homeReducer.groupDetail,
  };
};
const mapDispatchtoProps = (dispatch) => {
  return {
    setGroupDetail: (groupDetail) => dispatch(setGroupDetail(groupDetail)),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(GroupDetailScreen);
