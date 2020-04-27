import { setToken } from '../services/blogs';

const initialState = {
  user: {},
  isAuth: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_LOADED':
      setToken(action.data.token);
      return {
        user: action.data,
        isAuth: true,
      };
    case 'LOGIN_SUCCESS':
      const logged = {
        user: action.data,
        isAuth: true,
      };
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(logged));
      setToken(action.data.token);
      return logged;
    case 'LOGIN_ERROR':
    case 'LOGOUT':
      window.localStorage.removeItem('loggedNoteappUser');
      return {
        user: {},
        isAuth: false,
      };
    default:
      return state;
  }
};

export default authReducer;
