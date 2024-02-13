import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signupUser } from '../store/features/authSlice';
import { isValidEmail, isNotEmpty, hasMinLength, hasMaxLength, isEqualsToOtherValue } from '../util/vailidation'; 
import '../styles/Auth.css';

const Signup = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    terms: false
  });
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 유효성 검사 수행
    if (!isValidEmail(formData.email)) {
      // 이메일 유효성 검사
      alert('유효한 이메일 주소를 입력하세요.');
      return;
    }
    if (!hasMinLength(formData.password, 6)) {
      // 비밀번호 최소 길이 검사
      alert('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }
    if (!isEqualsToOtherValue(formData.password, formData.confirmPassword)) {
      // 비밀번호 일치 검사
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    // 유효성 검사 통과 시 회원가입 요청 전송
    setPasswordMismatch(false);
    dispatch(signupUser(formData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>어서오고!</h2>
      <p>로그인 해주세요! 🚀</p>

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
          <label htmlFor="confirmPassword">비빌번호 확인</label>
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

        {passwordMismatch && <p className="control-error">Passwords must match.</p>}
      </div>

      {/* Add other form controls */}

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
        <button type="submit" className="button">
          회원가입
        </button>
      </p>
    </form>
  );
};

export default Signup;
