import { createSlice } from '@reduxjs/toolkit';
import { login } from '../../api/authApi'; 



const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signupStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signupSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    signupFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { signupStart, signupSuccess, signupFailure } = authSlice.actions;

export const signupUser = (userData) => async (dispatch) => {
  try {
    dispatch(signupStart());
    const user = await login(userData); 
    console.log('dataForm :', user)
    dispatch(signupSuccess(user));
  } catch (error) {
    dispatch(signupFailure(error));
  }
};

export default authSlice.reducer;
