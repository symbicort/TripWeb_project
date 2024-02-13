import { configureStore } from '@reduxjs/toolkit';
import authUiReducer from './features/authUi';
import loginReducer from './features/authLogin';
import signupReducer from './features/authSlice';


const store = configureStore({
    reducer: {
        authUi: authUiReducer,
        login : loginReducer,
        signUp : signupReducer
    }
});

export default store;


