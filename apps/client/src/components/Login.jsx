import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/features/authLogin';
import '../styles/Auth.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.login.loading);
  const error = useSelector((state) => state.login.error);

  const [formData, setFormData] = useState({
    userId: '',
    pw: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      await dispatch(loginUser(formData));
      navigate('/');
  
  };


  return (
        <div>
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="control">
            <label htmlFor="userId">아이디</label>
            <input
              id="userId"
              type="text"
              name="userId"
              value={formData.userId}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="control">
            <label htmlFor="pw">비밀번호</label>
            <input
              id="pw"
              type="password"
              name="pw"
              value={formData.pw}
              onChange={handleInputChange}
              autoComplete="current-password"
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
    </div>
  );
};

export default Login;
