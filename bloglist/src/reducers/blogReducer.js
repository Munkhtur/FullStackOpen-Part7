import { getAll, create, remove, update } from '../services/blogs';

export const createNewBlog = (newBlog) => async (dispatch) => {
  const response = await create(newBlog);

  dispatch({
    type: 'ADD_NEW',
    data: response,
  });
};

export const removeBlog = (id) => async (dispatch) => {
  const response = await remove(id);
  dispatch({
    type: 'DELETE',
    data: id,
  });
  return response;
};

export const likeBlog = (props) => async (dispatch) => {
  console.log(props.id, 'like');
  const toUpdate = await update(props.id, props);
  console.log(toUpdate);
  dispatch({
    type: 'UPDATE',
    data: toUpdate,
  });
};

export const initializeBlogs = () => async (dispatch) => {
  const response = await getAll();
  console.log(response);
  dispatch({
    type: 'INIT',
    data: response,
  });
};

const initialState = [];

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT':
      return action.data;
    case 'ADD_NEW':
      return [...state, action.data];
    case 'DELETE':
      const newState = state.filter((b) => b.id !== action.data);
      return newState;
    case 'UPDATE':
      const updated = state.map((b) =>
        b.id === action.data.id ? action.data : b
      );
      return updated;
    default:
      return state;
  }
};

export default blogReducer;
