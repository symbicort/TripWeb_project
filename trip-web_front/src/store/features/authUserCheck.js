import { createSlice } from '@reduxjs/toolkit';
import { userIdCheckApi, userNicknameCheckApi } from '../../api/authApi';

const initialState = {
  isUserIdAvailable: false,
  isNicknameAvailable: false,
  loading: false,
  error: null,
};

const userCheckSlice = createSlice({
  name: 'userCheck',
  initialState,
  reducers: {
    setUserIdAvailability: (state, action) => {
      state.isUserIdAvailable = action.payload;
      state.loading = false;
    },
    setNicknameAvailability: (state, action) => {
      state.isNicknameAvailable = action.payload;
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setLoading: (state) => {
      state.loading = true;
    },
  },
});

export const { setUserIdAvailability, setNicknameAvailability, setError, setLoading } = userCheckSlice.actions;

export const checkUserId = (userId) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const isAvailable = await userIdCheckApi(userId); 
    dispatch(setUserIdAvailability(isAvailable));
    return isAvailable;
  } catch (error) {
    dispatch(setError(error.message));
    throw error;
  }
};

export const checkUserNickname = (nickname) => async (dispatch) =>{
  dispatch(setLoading());
  try {
    const isAvailable = await userNicknameCheckApi(nickname);
    dispatch(setNicknameAvailability(isAvailable));
    return isAvailable;
  } catch (error) {
    dispatch(setError(error.message));
    throw error;
  }
};

export default userCheckSlice.reducer;
