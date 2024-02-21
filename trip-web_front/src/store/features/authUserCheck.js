import { createSlice } from '@reduxjs/toolkit';
import { checkUserIdApi } from '../../api/authApi';

const initialState = {
  isUserId: true,
  isNickname: true,
};

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

export const checkUserId = (userId) => async (dispatch) => {
    try {
      const isAvailable = await checkUserIdApi(userId); 
      dispatch(setUserId(isAvailable));
    } catch (error) {
      console.error('사용자 아이디 중복 체크 실패:', error);
    }
  };

export default userCheckSlice.reducer;
