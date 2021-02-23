const userAuthAction = (userAuth) => {
  return (dispatch) => {
    dispatch({type: 'USERAUTH', payload: {userAuth}});
  };
};

export {userAuthAction};
