import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../services/login';
import { connect } from 'react-redux';

const Header = ({ logout, auth }) => {
  const loggedUser = JSON.parse(
    window.localStorage.getItem('loggedNoteappUser')
  );

  const username = loggedUser ? loggedUser.user.username : '';
  return (
    <div className='menu navbar'>
      <li>
        <Link to='/'>home</Link>
      </li>
      <li>
        <Link to='/users'>users</Link>
      </li>
      <li>
        {' '}
        {auth.isAuth ? (
          <div>
            {`${username} logged in`}
            <button className='logout-button btn' onClick={logout}>
              logout
            </button>
          </div>
        ) : (
          ''
        )}
      </li>
    </div>
  );
};
const mapStateToProps = (state) => {
  console.log(state, 'header');
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { logout })(Header);
