import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, loginStart, loginSuccess, loginFailure, logoutUser } from '../store/features/authLogin';
import { isValidEmail, hasMinLength } from '../util/vailidation'
import '../styles/Auth.css';

const Login = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.login.loading);
  const error = useSelector((state) => state.login.error);
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn); // 로그인 상태 가져오기

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isValidEmail(formData.email) || !hasMinLength(formData.password, 6)) { // 유효성 검사 추가
      return;
    }
    dispatch(loginStart());
    try {
      await dispatch(loginUser(formData));
      dispatch(loginSuccess());
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser()); 
  };

  return (
    <div>
      {isLoggedIn ? ( 
        <div>
          <p>이미 로그인되었습니다.</p>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="control">
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="control">
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <p>비밀번호를 잊으셨나요?</p>

          {error && <p className="error-message">{error}</p>}

          <p className="form-actions">
            <button type="submit" className="button" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </p>
        </form>
      )}
    </div>
  );
};

export default Login;
