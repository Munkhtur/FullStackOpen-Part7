import React, { useState } from 'react';
import { login } from '../services/login';
import { connect } from 'react-redux';

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    login({
      username,
      password,
    });
    setUsername('');
    setPassword('');
  };

  return (
    <form onSubmit={handleLogin}>
      <div className='form-group'>
        <label> username</label>
        <input
          className='form-control'
          id='username'
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div className='form-group'>
        <label> password</label>
        <input
          className='form-control'
          id='password'
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button className='btn' id='login-button' type='submit'>
        login
      </button>
    </form>
  );
};

export default connect(null, { login })(LoginForm);
