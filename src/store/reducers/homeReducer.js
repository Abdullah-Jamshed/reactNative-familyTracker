const INITIAL_STATE = {
  userAuth: null,
  groupDetail: null,
  groups: [],
  selectedGroup: null,
  locationPermission: null,
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
    case 'SELECTGROUP':
      return {
        ...state,
        selectedGroup: action.payload.selectedGroup,
      };
    case 'LOCATIONPERMISSION':
      return {
        ...state,
        locationPermission: action.payload.granted,
      };
    default:
      return state;
  }
};
