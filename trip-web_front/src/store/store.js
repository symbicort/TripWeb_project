import { configureStore } from '@reduxjs/toolkit';
import authUiReducer from './features/authUi';
import loginReducer from './features/authLogin';
import signupReducer from './features/authSlice';
import userCheckReducer from './features/authUserCheck'


const store = configureStore({
    reducer: {
        authUi: authUiReducer,
        login : loginReducer,
        signUp : signupReducer,
        userCheck : userCheckReducer
    }
});

export default store;


