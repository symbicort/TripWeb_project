import { configureStore } from '@reduxjs/toolkit';
import authUiReducer from './features/authUi';
import loginReducer from './features/authLogin';
import signupReducer from './features/authSlice';
import userCheckReducer from './features/authUserCheck'
import userDeleteReducer from './features/authUserDelete'

const store = configureStore({
    reducer: {
        authUi: authUiReducer,
        login : loginReducer,
        signUp : signupReducer,
        userCheck : userCheckReducer,
        userDelete : userDeleteReducer
    }
});

export default store;


