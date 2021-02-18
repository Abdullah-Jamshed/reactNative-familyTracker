const viewModeAction = (mode) => {
  return (dispatch) => {
    dispatch({type: 'CATEGORY_VIEW', payload: {mode}});
  };
};

export {viewModeAction};
