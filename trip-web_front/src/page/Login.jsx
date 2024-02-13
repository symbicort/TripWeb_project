import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, loginStart, loginSuccess, loginFailure } from '../store/features/authLogin';
import { isValidEmail, hasMinLength } from '../util/vailidation';
import '../styles/Auth.css';

const Login = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.login.loading);
  const error = useSelector((state) => state.login.error);

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
    if (!isValidEmail(formData.email) || !hasMinLength(formData.password, 6)) {
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

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className="control">
        <label htmlFor="email">Email</label>
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
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
      </div>

      {error && <p className="error-message">{error}</p>}

      <p className="form-actions">
        <button className="button button-flat" type="button" onClick={() => setFormData({ email: '', password: '' })}>
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
