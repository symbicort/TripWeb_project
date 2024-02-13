import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, loginStart, loginSuccess, loginFailure } from './loginSlice';
import { isEmail, isNotEmpty, hasMinLength } from '../../src/util/validation';
import '../styles/Auth.css';

const Login = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.login.loading);
  const error = useSelector((state) => state.login.error);

  const [enteredValues, setEnteredValues] = useState({
    email: '',
    password: ''
  });

  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false
  });

  const emailIsInvalid = didEdit.email && !isEmail(enteredValues.email) && !isNotEmpty(enteredValues.email);
  const passwordInvalid = didEdit.password && !hasMinLength(enteredValues.password, 6);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!emailIsInvalid && !passwordInvalid) {
      dispatch(loginStart());
      try {
        await dispatch(loginUser(enteredValues));
        dispatch(loginSuccess());
      } catch (error) {
        dispatch(loginFailure(error.message));
      }
    }
  };

  const handleInputChange = (identifier, value) => {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value
    }));
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: false
    }));
  };

  const handleInputBlur = (identifier) => {
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: true
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className="control-row">
        <input
          label="Email"
          id="email"
          type="email"
          name="email"
          onBlur={() => handleInputBlur('email')}
          onChange={(e) => handleInputChange('email', e.target.value)}
          value={enteredValues.email}
          error={emailIsInvalid && 'Please enter a valid email!'}
        />

        <input
          label="Password"
          id="password"
          type="password"
          name="password"
          onBlur={() => handleInputBlur('password')}
          onChange={(e) => handleInputChange('password', e.target.value)}
          value={enteredValues.password}
          error={passwordInvalid && 'Please enter a valid password'}
        />
      </div>

      {error && <p className="error-message">{error}</p>}

      <p className="form-actions">
        <button className="button button-flat" type="button" onClick={() => setEnteredValues({ email: '', password: '' })}>
          Reset
        </button>
        <button type="submit" className="button" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </p>
    </form>
  );
};

export default Login;
