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

export {userAuthAction, setGroupDetail};
