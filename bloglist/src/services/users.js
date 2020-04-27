import axios from 'axios';

export const getAllUsers = () => async (dispatch) => {
  const result = await axios.get('/api/users');
  dispatch({
    type: 'GET_USERS',
    data: result.data,
  });
};
