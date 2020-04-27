import React, { useEffect } from 'react';
import { setToken, getAll } from './services/blogs';
import Notification from './components/Notification';
import { initializeBlogs } from './reducers/blogReducer';
import { useDispatch } from 'react-redux';
import Blogs from './components/Blogs';
import Blog from './components/Blog';
import { loadUser } from './services/login';
import Users from './components/Users';
import User from './components/User';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header';

import './App.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('loaduser');
    dispatch(loadUser());
  }, []);
  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  return (
    <div>
      <Header />
      <Notification />
      <Switch>
        <Route exact path='/'>
          <Blogs />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/user/:id'>
          <User />
        </Route>
        <Route path='/blog/:id'>
          <Blog />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
