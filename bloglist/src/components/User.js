import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, useRouteMatch } from 'react-router-dom';
import { getAllUsers } from '../services/users';

const User = ({ users, getAllUsers }) => {
  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);
  console.log(users);
  const match = useRouteMatch('/user/:id');
  const user = match ? users.find((user) => user.id === match.params.id) : null;

  if (!user) {
    return null;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <h3>Added blogs</h3>
      {user.blogs.map((b) => (
        <li key={b.id}>{b.title}</li>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
});

export default connect(mapStateToProps, { getAllUsers })(User);
