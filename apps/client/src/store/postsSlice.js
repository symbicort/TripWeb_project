import { configureStore, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const createPostsApi = createAsyncThunk('store/postsSlice/createPostsApi', async (formData, { rejectWithValue }) => {
    try {
        const response = await axios.post('/api/posts', formData);
        return response.data;
    } catch (e) {
        if (e.response && e.response.data) {
            return rejectWithValue(e.response.data.message);
        } else {
            return rejectWithValue('Network error');
        }
    }
});

export const readPostsApi = createAsyncThunk('store/postsSlice/readPostsApi', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('/api/posts');
        return response.data;
    } catch (e) {
        if (e.response && e.response.data) {
            return rejectWithValue(e.response.data.message);
        } else {
            return rejectWithValue('Network error');
        }
    }
});


export const updatePostsApi = createAsyncThunk('store/postsSlice/updatePostsApi', async (updateformData, { rejectWithValue }) => {
    try {
        const { id, ...data } = updateformData;
        const response = await axios.put(`/api/posts/${id}`, data);
        return response.data;
    } catch (e) {
        if (e.response && e.response.data) {
            return rejectWithValue(e.response.data.message);
        } else {
            return rejectWithValue('Network error');
        }
    }
});

export const deletePostsApi = createAsyncThunk('store/postsSlice/deletePostsApi', async (id, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`/api/posts/${id}`);
        return response.data;
    } catch (e) {
        if (e.response && e.response.data) {
            return rejectWithValue(e.response.data.message);
        } else {
            return rejectWithValue('Network error');
        }
    }
});

const initialState = {
    data : [],
    error : null,
    loading : 'idle'
}

const postsSlice = configureStore({
    name : 'posts',
    initialState,
    reducer :{},
    extraReducers : (builder)=>{
        builder
        // 글생성
        .addCase(createPostsApi.pending, (state)=>{
            state.loading = 'loading';
        })
        .addCase(createPostsApi.fulfilled, (state, action)=>{
            state.loading = 'success';
            state.data = [...state.data, action.payload];
            state.error = null;
        })
        .addCase(createPostsApi.rejected, (state, action)=>{
            state.loading = 'failed';
            state.error = action.payload;
        })
        // 글 불러오기
        .addCase(readPostsApi.pending, (state) => {
            state.loading = 'loading';
        })
        .addCase(readPostsApi.fulfilled, (state, action) => {
            state.loading = 'succeeded';
            state.data = action.payload;
            state.error = null;
        })
        .addCase(readPostsApi.rejected, (state, action) => {
            state.loading = 'failed';
            state.error = action.payload || action.error.message;
        })
        // 글 업데이트
        .addCase(updatePostsApi.pending, (state) => {
            state.loading = 'loading';
        })
        .addCase(updatePostsApi.fulfilled, (state, action)=>{
            state.loading ='success';
            const postIndex = state.data.findIndex(post => post.id === action.payload.id);
            if(postIndex !== -1){
                state.data[postIndex] = action.payload;
            }
            state.error = null;
        })
        .addCase(updatePostsApi.rejected, (state, action)=>{
            state.loading = 'failed';
            state.error = action.payload;
        })
        // 글 삭제
        .addCase(deletePostsApi.pending, (state) => {
            state.loading = 'loading';
        })
        .addCase(deletePostsApi.fulfilled, (state, action)=>{
            state.loading ='success';
            state.data = state.data.filter(post => post.id!== action.payload);
            state.error = null;
        })
        .addCase(deletePostsApi.rejected, (state, action)=>{
            state.loading = 'failed';
            state.error = action.payload;
        })
    }
    

})



export default postsSlice