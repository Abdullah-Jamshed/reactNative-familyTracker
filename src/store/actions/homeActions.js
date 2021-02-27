// firebase
import firestore from '@react-native-firebase/firestore';

const userAuthAction = (userAuth) => {
  return (dispatch) => {
    dispatch({type: 'USERAUTH', payload: {userAuth}});
  };
};

const setGroupDetail = (groupDetail) => {
  return (dispatch) => {
    dispatch({type: 'GROUPDETAIL', payload: {groupDetail}});
  };
};

const setSelectedGroup = (selectedGroup) => {
  return (dispatch) => {
    dispatch({type: 'SELECTGROUP', payload: {selectedGroup}});
  };
};
const setlocationPermission = (granted) => {
  return (dispatch) => {
    dispatch({type: 'LOCATIONPERMISSION', payload: {granted}});
  };
};

const groupsFetch = () => {
  return async (dispatch, getState) => {
    const {userAuth} = getState().homeReducer;
    const userUID = userAuth.uid;

    const groupsId = await (
      await firestore().collection('users').doc(`${userUID}`).get()
    ).data().groupsJoined;

    const onResult = (QuerySnapshot) => {
      const groups = QuerySnapshot.docs;
      // console.log('===>>> ', groups);
      dispatch({type: 'GROUPS', payload: {groups}});
    };

    const onError = (error) => {
      console.error('error from store ==>>', error);
      dispatch({type: 'GROUPS', payload: {groups: []}});
    };

    if (groupsId.length !== 0) {
      firestore()
        .collection('groups')
        .where('groupId', 'in', groupsId)
        .onSnapshot(onResult, onError);
    }
  };
};

export {
  userAuthAction,
  setGroupDetail,
  groupsFetch,
  setSelectedGroup,
  setlocationPermission,
};
