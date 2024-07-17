import { createSlice } from '@reduxjs/toolkit';

const initialState = { isAuthState: false };

const authUiSlice = createSlice({
    name: 'authUi',
    initialState,
    reducer: { 
        login(state) {
            state.isAuthState = true;
        },
        logout(state) {
            state.isAuthState = false;
        }
    }
});

export const authUiActions = authUiSlice.actions;
export default authUiSlice.reducer;
