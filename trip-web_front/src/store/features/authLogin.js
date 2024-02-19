// loginSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { login } from "../../api/authApi"; 

const initialState = {
    user: null,
    loading: false,
    error: null,
    isLoggedIn: false 
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) =>{
            state.loading = false;
            state.user = action.payload;
            state.isLoggedIn = true; 
        },
        loginFailure: (state, action) =>{
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.isLoggedIn = false; 
        }
    }
});

export const { loginStart, loginSuccess, loginFailure, logout } = loginSlice.actions;

export const loginUser = (userData) => async (dispatch) => {
    try {
        dispatch(loginStart());
        const user = await login(userData);
        dispatch(loginSuccess(user));
    } catch (error) {
        dispatch(loginFailure(error));
    }
};

// 로그아웃 액션 생성자
export const logoutUser = () => async (dispatch) => {
    try {
        dispatch(logout());
    } catch (error) {
        console.error("로그아웃 중 오류 발생:", error);
    }
};

export default loginSlice.reducer;
