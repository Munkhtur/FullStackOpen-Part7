import axios from 'axios';
import { notifyWith } from '../reducers/notificationReducer';
import { setToken } from '../services/blogs';
const baseUrl = '/api/login';

export const login = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post(baseUrl, credentials);
    dispatch({
      type: 'LOGIN_SUCCESS',
      data: response.data,
    });
  } catch (error) {
    dispatch({
      type: 'LOGIN_ERROR',
      data: error.response.data,
    });
    dispatch(notifyWith(`${error.response.data.error}`, 'error'));
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: 'LOGOUT' });
};

export const loadUser = () => async (dispatch) => {
  const user = JSON.parse(window.localStorage.getItem('loggedNoteappUser'));
  if (user) {
    setToken(user.user.token);
  }
  if (user) {
    dispatch({
      type: 'USER_LOADED',
      data: user.user,
    });
  } else {
    dispatch({ type: 'LOGIN_ERROR' });
  }
};
