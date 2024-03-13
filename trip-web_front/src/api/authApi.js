import axios from 'axios';
const API_URL = 'http://localhost:3001';


export const signupApi = async (userdata) => {
  try {
      const response = await axios.post(`${API_URL}/user/register`, userdata);
      console.log(response);
      return response.data;
  } catch (error) {
    console.error('회원가입:', error);
    throw error;
  }
}

export const userIdCheckApi = async (userId) => {
  try{    
      const response = await axios.get(`${API_URL}/user/checkDupId`, {params: {userId}});
      console.log(response)
      return response.data
  }catch(error){
      throw error
  }
}

export const userNicknameCheckApi = async (nickname) => {
  try{
      const response = await axios.get(`${API_URL}/user/checkDupNick`, {params : {nickname}})
      console.log(response)
      return response.data
  }catch(error){
      throw error
  }
}

export const loginApi = async (userdata) => {
  try{    
      const response = await axios.post(`${API_URL}/user/login`, userdata, {withCredentials: true});
      console.log(response)
      return response.data
  }catch(error){
      throw error
  }
}
export const logoutApi = async () => {
  try{
      const response = await axios.get(`${API_URL}/user/logout`, {withCredentials: true})
      console.log(response)
      return response.data
  }catch(error){
      throw error
  }
};



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





