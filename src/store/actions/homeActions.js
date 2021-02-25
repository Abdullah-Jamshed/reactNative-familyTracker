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
const groupsFetch = () => {
  return async (dispatch, getState) => {
    const {userAuth} = getState().homeReducer;
    const userUID = userAuth.uid;
    const groupsId = await (
      await firestore().collection('users').doc(`${userUID}`).get()
    ).data().groupsJoined;

    const onResult = (QuerySnapshot) => {
      const groups = QuerySnapshot.docs;
      dispatch({type: 'GROUPS', payload: {groups}});
    };

    const onError = (error) => {
      console.error('error from store ==>>', error);
      dispatch({type: 'GROUPS', payload: {groups: []}});
    };

    firestore()
      .collection('groups')
      .where('groupId', 'in', groupsId)
      .onSnapshot(onResult, onError);
  };
};

export {userAuthAction, setGroupDetail, groupsFetch};
