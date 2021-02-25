const INITIAL_STATE = {
  userAuth: null,
  groupDetail: null,
  groups: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'USERAUTH':
      return {
        ...state,
        userAuth: action.payload.userAuth,
      };
    case 'GROUPS':
      return {
        ...state,
        groups: action.payload.groups,
      };
    case 'GROUPDETAIL':
      return {
        ...state,
        groupDetail: action.payload.groupDetail,
      };
    default:
      return state;
  }
};
