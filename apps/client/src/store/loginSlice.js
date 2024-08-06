import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"; 

export const loginApi = createAsyncThunk('store/loginSlice/loginApi', async (formData, { rejectWithValue }) => {
    try {
        const response = await axios.post('/api/login', formData); 
        return response.data; 
    } catch (e) {
        if (e.response && e.response.data) { 
            return rejectWithValue(e.response.data.message || '로그인 실패');
        } else {
            return rejectWithValue('Network Error');
        }
    }
});

export const logoutApi = createAsyncThunk('store/loginSlice/logoutApi', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('/api/logout');
        return response.data; 
    } catch (e) {
        if (e.response && e.response.data) { 
            return rejectWithValue(e.response.data.message || '로그아웃 실패');
        } else {
            return rejectWithValue('Network Error');
        }
    }
});

const initialState = {
    user: null,
    loading: 'idle',
    error: null,
};

export const loginSlice = createSlice({ 
    name: 'login',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginApi.pending, (state) => {
                state.loading = 'loading';
            })
            .addCase(loginApi.fulfilled, (state, action) => {
                state.loading = 'success';
                state.user = action.payload;
                state.error = null;
            })
            .addCase(loginApi.rejected, (state, action) => {
                state.loading = 'error';
                state.error = action.payload || action.error.message; 
            })
            .addCase(logoutApi.pending, (state) => {
                state.loading = 'loading';
            })
            .addCase(logoutApi.fulfilled, (state) => {
                state.loading = 'idle';
                state.user = null;
                state.error = null;
            })
            .addCase(logoutApi.rejected, (state, action) => { 
                state.loading = 'error';
                state.error = action.payload || action.error.message;
            });
    },
});

export default loginSlice.reducer;
