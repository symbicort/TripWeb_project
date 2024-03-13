import { createSlice } from "@reduxjs/toolkit";
import { signupApi } from "../../api/authApi"; 

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    signUpStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signUpSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    signUpError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { signUpStart, signUpSuccess, signUpError } = signUpSlice.actions;

export const signUpUser = (userdata) => async (dispatch) => {
  try {
    dispatch(signUpStart());
    const user = await signupApi(userdata);
    dispatch(signUpSuccess(user));
  } catch (error) {
    dispatch(signUpError(error.message));
  }
};

export default signUpSlice.reducer;
