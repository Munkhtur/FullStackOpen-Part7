let timeoutId;
export const notifyWith = (content, type = 'success', time = 5000) => async (
  dispatch
) => {
  dispatch({
    type: 'SHOW',
    data: { content, type },
  });

  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  timeoutId = setTimeout(() => {
    dispatch({
      type: 'CLEAR',
    });
  }, time);
};

const initialState = {};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW':
      console.log(action.data);
      return action.data;
    case 'CLEAR':
      return null;
    default:
      return state;
  }
};

export default notificationReducer;
