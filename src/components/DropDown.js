import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Text,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import {setSelectedGroup} from '../store/actions/homeActions';

// Icons
import AntDesign from 'react-native-vector-icons/AntDesign';

const {width, height} = Dimensions.get('window');

const DropDown = ({groups, selectedGroup, setSelectedGroup}) => {
  const [dropDownShow, setDropDownShow] = useState(false);

  useEffect(() => {
    selectedGroup && console.log('selectedGroup ====>>>', selectedGroup);
  }, [selectedGroup]);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.search}
        onPress={() => {
          setDropDownShow(!dropDownShow);
        }}>
        <View style={styles.inputWrapper}>
          <View style={styles.greenDot} />
          <View>
            {selectedGroup ? (
              <Text style={styles.inputText}>{selectedGroup.groupName}</Text>
            ) : (
              <Text style={styles.inputText}>Select Group</Text>
            )}
          </View>
        </View>
        <View>
          <AntDesign name="down" size={20} style={{color: '#8b8d96'}} />
        </View>
      </TouchableOpacity>

      {dropDownShow && (
        <View
          style={{
            // minHeight: height / 3,
            maxHeight: height / 2,
          }}>
          <ScrollView contentContainerStyle={styles.dropDownCont}>
            {groups.length !== 0 ? (
              groups.map((group, i) => {
                const groupObj = group.data();
                return (
                  <TouchableOpacity
                    key={i}
                    activeOpacity={0.9}
                    style={styles.dropDownTextCont}
                    onPress={() => {
                      setSelectedGroup(groupObj);
                      setDropDownShow(false);
                    }}>
                    <Text style={styles.dropDownText}>
                      {groupObj.groupName}
                    </Text>
                  </TouchableOpacity>
                );
              })
            ) : (
              <View style={styles.dropDownGroupCont}>
                <Text>No Any Group</Text>
              </View>
            )}
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    marginHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greenDot: {
    width: 10,
    height: 10,
    backgroundColor: '#0ddda2',
    borderRadius: 100,
    marginRight: 10,
  },

  search: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,

    elevation: 3,
  },
  dropDownCont: {
    backgroundColor: '#fff',
    flexGrow: 1,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderWidth: 0.5,
    borderTopWidth: 0,
    borderColor: '#c4c4c4',
  },
  dropDownTextCont: {
    padding: 15,
    borderBottomColor: '#f6f6f6',
    borderBottomWidth: 1,
  },
  dropDownText: {
    fontSize: 14,
  },
  dropDownGroupCont: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});

const mapStatetoProps = (state) => {
  return {
    groups: state.homeReducer.groups,
    selectedGroup: state.homeReducer.selectedGroup,
  };
};
const mapDispatchtoProps = (dispatch) => {
  return {
    setSelectedGroup: (group) => dispatch(setSelectedGroup(group)),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(DropDown);
