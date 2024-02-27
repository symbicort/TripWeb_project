import { createSlice } from '@reduxjs/toolkit';
import { checkUserIdApi, checkUserNicknameApi } from '../../api/authApi';

const initialState = {
  isUserId: true,
  isNickname: true,
};

export const checkUserId = (userId) => async (dispatch) => {
  try {
    const isAvailable = await checkUserIdApi(userId); 
    dispatch(setUserId(isAvailable));
  } catch (error) {
    console.error('사용자 아이디 중복 체크 실패:', error);
  }
};

export const checkUserNickname = (nickname) => async (dispatch) =>{
  try{
    const isAvailable = await checkUserNicknameApi(nickname);
    dispatch(setNickname(isAvailable));
}catch(error){
  console.error('사용자 닉네임 중복 체크 실패:', error);
}
}

const userCheckSlice = createSlice({
  name: 'userCheck',
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.isUserId = action.payload;
    },
    setNickname: (state, action) => {
      state.isNickname = action.payload;
    },
  },
});

export const { setUserId, setNickname } = userCheckSlice.actions;


export default userCheckSlice.reducer;
