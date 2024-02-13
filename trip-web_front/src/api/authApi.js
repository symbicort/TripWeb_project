import axios from 'axios';

const API_URL = 'https://react-http-f08f8-default-rtdb.firebaseio.com';

export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/user/signup`, userData);
    console.log('signup res', response);
    return response.data;
  } catch (error) {
    if (error.response) {
      // 서버 응답이 있는 경우
      throw error.response.data.error;
    } else {
      // 서버 응답이 없는 경우
      throw '서버 응답이 없습니다. 네트워크 연결을 확인하세요.';
    }
  }
};

export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/user/login`, userData);
    console.log('login : ', response);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.error;
    } else {
      throw '서버 응답이 없습니다. 네트워크 연결을 확인하세요.';
    }
  }
};

