const INITIAL_STATE = {
  userAuth: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'USERAUTH':
      return {
        ...state,
        userAuth: action.payload.userAuth,
      };
    default:
      return state;
  }
};
