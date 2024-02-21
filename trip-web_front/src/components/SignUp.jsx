import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signupUser } from '../store/features/authSlice';
import { checkUserId } from '../store/features/authUserCheck';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    user_id: '',
    password: '',
    email: '',
    confirmPassword: '',
    nickname: '',
    fullName: '',
    terms: false,
  });

  const [userIdAvailable, setUserIdAvailable] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const handleCheckUserId = async () => {
    try {
      const isAvailable = await dispatch(checkUserId(formData.user_id));
      setUserIdAvailable(isAvailable);
      setIsFormValid(!isAvailable);
      if (!isAvailable) {
        alert('사용 가능한 아이디입니다.');
      } else {
        alert('이미 사용 중인 아이디입니다.');
      }
    } catch (error) {
      console.error('아이디 중복 체크 에러:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) {
      alert('양식을 올바르게 입력하세요.');
      return;
    }
    try {
      dispatch(signupUser(formData)).then(() => {
        navigate('/');
      });
    } catch (error) {
      console.log('error ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>어서오고!</h2>
      <p>로그인 해주세요! 🚀</p>

      <div className="control">
        <label htmlFor="fullName">성명</label>
        <input
          id="fullName"
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="control">
        <label htmlFor="user_id">아이디</label>
        <input
          id="user_id"
          type="text"
          name="user_id"
          value={formData.user_id}
          onChange={handleInputChange}
          required
        />
        <button type="button" onClick={handleCheckUserId}>
          아이디 중복 확인
        </button>
        {!userIdAvailable && <p>이미 사용 중인 아이디입니다.</p>}
      </div>

      <div className="control">
        <label htmlFor="nickname">닉네임</label>
        <input
          id="nickname"
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="control-row">
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

        <div className="control">
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="control">
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="control">
        <label>
          <input
            type="checkbox"
            name="terms"
            checked={formData.terms}
            onChange={handleCheckboxChange}
            required
          />
          위에 약관에 동의하십니까?
        </label>
      </div>

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button type="submit" className="button" disabled={!isFormValid}>
          회원가입
        </button>
      </p>
    </form>
  );
};

export default Signup;
