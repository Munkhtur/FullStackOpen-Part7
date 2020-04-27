const initialState = [];

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USERS':
      return action.data;
    default:
      return state;
  }
};

export default userReducer;
