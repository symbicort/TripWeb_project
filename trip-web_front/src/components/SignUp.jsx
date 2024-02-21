import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signupUser } from '../store/features/authSlice'; 
// import { checkUserId } from '../store/features/authUserCheck';
import { isValidEmail, isNotEmpty, hasMinLength, hasMaxLength, isEqualsToOtherValue } from '../util/vailidation';
import '../styles/Auth.css';

const Signup = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    user_id: '',
    password: '',
    email : '',
    confirmPassword: '',
    nickname: '',
    fullName: '',
    terms: false
  });

  const [passwordMismatch, setPasswordMismatch] = useState(false);
  // const [userIdAvailable, setUserIdAvailable] = useState(true);

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

  const handleCheckUserId = async () => {
    try {
      const isAvailable = await dispatch(checkUserId(formData.user_id)); 
      setUserIdAvailable(isAvailable);
    if (!userIdAvailable) {
      alert('이미 사용 중인 아이디입니다.');
      return;
    }
    } catch (error) {
      console.error('아이디 중복 체크 에러:', error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();


    if (!isValidEmail(formData.email)) {
      alert('유효한 이메일 주소를 입력하세요.');
      return;
    }

    if (!hasMinLength(formData.password, 6)) {
      alert('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }

    if (!isEqualsToOtherValue(formData.password, formData.confirmPassword)) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!hasMaxLength(formData.password, 20)) {
      alert('비밀번호는 최대 20자 이하이어야 합니다.');
      return;
    }

    // if (!matchesPattern(formData.password, /((?!([a-zA-Z0-9])\1\1)[a-zA-Z0-9].*[!,@,#,$,%,^,&,*,?,_,~])|((?![!,@,#,$,%,^,&,*,?,_,~]\1\1)[!,@,#,$,%,^,&,*,?,_,~].*[a-zA-Z0-9])/)) {
    //   alert('연속으로 동일한 문자를 3번 이상 허용하지 않음');
    //   return;
    // }
        
    if (!isNotEmpty(formData.fullName,formData.password)) {
      alert('성명을 입력하세요.');
      return;
    }

    if(!formData.terms){
      alert('위에 약관에 동의 부탁드립니다!')
      return;
    }

    setPasswordMismatch(false);
    dispatch(signupUser(formData)); 
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
        {/* <button type="button" onClick={handleCheckUserId}>아이디 중복 확인</button> */}
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
          <label htmlFor="fullName">이메일</label>
          <input
            id="email"
            type="text"
            name="email"
            value={formData.email}
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
