import axios from 'axios';
const API_URL = 'http://localhost:3001';

export const checkUserIdApi = async (userId) => {
  try {
    const response = await axios.post(`${API_URL}/api/authuser`, { userId });
    return response.data.isAvailable;
  } catch (error) {
    console.error('유저 아이디 중복 체크 실패:', error);
    throw error; 
  }
};

export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/user/register`, userData);
    console.log('signup res', response);
    console.log('signup res data', response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.error;
    } else {
      throw '서버 응답이 없습니다. 네트워크 연결을 확인하세요.';
    }
  }
};

export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/user/login`, userData);
    console.log('login res ', response, document.cookie);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.error;
    } else {
      throw '서버 응답이 없습니다. 네트워크 연결을 확인하세요.';
    }
  }
};



// export const checkNickname = (nickname) => async (dispatch) => {
//   try {
//     const response = await axios.post(`${API_URL}/api/checkNickname`, { nickname });
//     dispatch(setNickname(response.data.isAvailable));
//   } catch (error) {
//     console.error('닉네임 중복 체크 실패:', error);
//   }
// };



