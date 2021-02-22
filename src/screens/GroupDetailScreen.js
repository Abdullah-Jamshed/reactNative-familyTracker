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

// Icons
import AntDesign from 'react-native-vector-icons/AntDesign';

const {width, height} = Dimensions.get('window');

const GroupDetailScreen = ({navigation}) => {
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
              onPress={() => navigation.goBack()}
            />
          </View>
          <Text style={styles.heading}>Groups Details</Text>
        </View>
        <View style={styles.groupSecretsContainer}>
          <View style={styles.groupSecrets}>
            <Text style={styles.secretHeading}>Group id:</Text>
            <Text>wwsd748vsd7dfs</Text>
          </View>
          <View style={styles.groupSecrets}>
            <Text style={styles.secretHeading}>Group key:</Text>
            <Text>486486</Text>
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
              paddingHorizontal: 10,
              //   backgroundColor:"red"
            }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((k, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  activeOpacity={1}
                  style={styles.groupContainer}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={styles.groupImage}>
                      <AntDesign name="user" size={40} color={'#e6e6e6'} />
                    </View>
                    <View style={styles.groupDetail}>
                      <Text style={{fontSize: 15}}>Member Name</Text>
                      {/* <Text style={{fontSize: 12}}>5 memebers</Text> */}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
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
    justifyContent: 'center',
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
});

export default GroupDetailScreen;
