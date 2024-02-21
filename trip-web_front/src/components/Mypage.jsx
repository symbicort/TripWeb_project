import { useState, useEffect } from 'react';
import axios from 'axios';

const Mypage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/user/info'); 
        setUserData(response.data); 
        setLoading(false); 
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        setLoading(false); 
      }
    };

    fetchUserData(); 
  }, []);

  return (
    <div className="mypage">
      <h2>마이페이지</h2>
      {loading ? (
        <p>Loading...</p>
      ) : userData ? (
        <div className="user-info">
          <div className="info-item">
            <label htmlFor="fullName">성명</label>
            <input
              id="fullName"
              type="text"
              value={userData.fullName}
              readOnly
            />
          </div>
          <div className="info-item">
            <label htmlFor="nickname">닉네임</label>
            <input
              id="nickname"
              type="text"
              value={userData.nickname}
              readOnly
            />
          </div>
          <div className="info-item">
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              type="text"
              value={userData.email}
              readOnly
            />
          </div>
        </div>
      ) : (
        <p>Failed to load user data.</p>
      )}
    </div>
  );
};

export default Mypage;
