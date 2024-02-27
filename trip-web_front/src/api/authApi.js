import axios from 'axios';
const API_URL = 'http://localhost:3001';

export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/user/register`, userData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.error;
    } else {
      throw '서버 응답이 없습니다. 네트워크 연결을 확인하세요.';
    }
  }
};

export const checkUserIdApi = async (inputId) => {
  try {
    const response = await axios.get(`${API_URL}/user/checkDupId`, { params: { inputId } });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('유저 아이디 중복 체크 실패:', error);
    throw error; 
  }
};


export const checkUserNicknameApi = async (nickname) => {
  try{const response = await axios.get(`${API_URL}/user/checkDupNick`,{params : {nickname}})
  console.log(response)
  return response.data
}catch(error){
  console.error('유저 닉네임 중복 체크 실패:', error);
    throw error; 
}
}

export const userDeleteApi = async (userData) => {
  try{
    const response = await axios.delete(`${API_URL}/user/withDraw`, userData)
    console.log(response)
    return response.data;
  }catch(error){
    console.error('유저 계정 삭제 실패:', error);
    throw error;
  }
}


export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/user/login`, userData, {withCredentials: true});
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.error;
    } else {
      throw '서버 응답이 없습니다. 네트워크 연결을 확인하세요.';
    }
  }
};

export const Logout = async () => {
  try {
    const response = await axios.get(`${API_URL}/user/logout`,{withCredentials: true});
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



