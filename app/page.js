'use client'
import React, { useReducer, useState } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USERNAME':
      return { ...state, username: action.payload };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    case 'LOGIN':
      return { ...state, isLoggedIn: true, showError: false };
    case 'LOGOUT':
      return { ...state, isLoggedIn: false, username: '', password: '' };
    case 'SHOW_ERROR':
      return { ...state, showError: true };
    default:
      return state;
  }
};

function Home() {
  const initialState = {
    username: '',
    password: '',
    isLoggedIn: false,
    showError: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [errorClassName, setErrorClassName] = useState('');

  const handleUsernameChange = (e) => {
    dispatch({ type: 'SET_USERNAME', payload: e.target.value });
  };

  const handlePasswordChange = (e) => {
    dispatch({ type: 'SET_PASSWORD', payload: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!state.username || !state.password) {
      dispatch({ type: 'SHOW_ERROR' });
      setErrorClassName('invalid-error');
    } else {
      dispatch({ type: 'LOGIN' });
      setErrorClassName('');
    }
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    setErrorClassName('');
  };

  return (
    <div id="main">
      {state.isLoggedIn ? (
        <section className='logout-section'>
          <h2>Logged in successfully!</h2>
          <p>Welcome {state.username}!</p>
          <button className='logout-btn' onClick={handleLogout}>
            Logout
          </button>
        </section>
      ) : (
        <form className='login-form'>
          {state.showError && (
            <p className={`invalid-error ${errorClassName}`}>
              Invalid username or password!
            </p>
          )}
          <section className='username-input'>
            <label>Username: </label>
            <input
              type='text'
              placeholder='Username'
              className='username'
              value={state.username}
              onChange={handleUsernameChange}
            />
          </section>
          <section className='password-input'>
            <label>Password: </label>
            <input
              type='password'
              placeholder='Password'
              className='password'
              value={state.password}
              onChange={handlePasswordChange}
            />
          </section>
          <button className='login-btn' onClick={handleSubmit}>
            Login
          </button>
        </form>
      )}
    </div>
  );
}

export default Home;
