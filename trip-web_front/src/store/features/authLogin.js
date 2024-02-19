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
        // 로그아웃에 필요한 작업을 수행합니다.
        // 예를 들어, 사용자의 인증 토큰을 삭제하거나 서버에서 세션을 종료합니다.
        // 이 예시에서는 단순히 로그인 상태를 초기화합니다.
        dispatch(logout());
    } catch (error) {
        // 로그아웃 과정에서 오류가 발생할 경우 처리합니다.
        console.error("로그아웃 중 오류 발생:", error);
    }
};

export default loginSlice.reducer;
