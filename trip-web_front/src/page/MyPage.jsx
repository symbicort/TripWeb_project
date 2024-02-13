import React, { useState } from 'react';

const MyPage = () => {
  // 기존 사용자 정보를 초기 상태로 설정
  const [userInfo, setUserInfo] = useState({
    fullName: 'John Doe',
    email: 'johndoe@example.com',
    phoneNumber: '123-456-7890',
    address: '123 Main St, City, Country',
    // 기타 사용자 정보
  });

  // 사용자 정보를 수정하는 함수
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value
    }));
  };

  // 사용자 정보를 서버에 저장하는 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    // 수정된 사용자 정보를 서버에 전송하는 로직 추가
    console.log('Updated user info:', userInfo);
  };

  return (
    <div className="my-page">
      <h2>마이페이지</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">성명</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={userInfo.fullName} // 닉네임을 기본값으로 설정
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userInfo.email} // 이메일을 기본값으로 설정
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">전화번호</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={userInfo.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">주소</label>
          <textarea
            id="address"
            name="address"
            value={userInfo.address}
            onChange={handleChange}
            required
          />
        </div>
        {/* 기타 사용자 정보를 수정하는 입력 필드 추가 */}
        <button type="submit">저장</button>
      </form>
    </div>
  );
};

export default MyPage;
