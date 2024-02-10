import { configureStore } from '@reduxjs/toolkit';
import authUiReducer from './features/authUi';

const store = configureStore({
    reducer: {
        authUi: authUiReducer
    }
});

export default store;


