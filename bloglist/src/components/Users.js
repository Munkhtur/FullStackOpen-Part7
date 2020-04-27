import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllUsers } from '../services/users';
import { Link } from 'react-router-dom';

const Users = ({ users, getAllUsers }) => {
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <div>
      <h1>Users</h1>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Blogs Created</th>
          </tr>
          {users.map((u) => (
            <tr key={u.id}>
              <td>
                <Link to={`/user/${u.id}`}>{u.name}</Link>
              </td>
              <td>{u.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
const mapStateToProps = (state) => ({
  users: state.users,
});

export default connect(mapStateToProps, { getAllUsers })(Users);
