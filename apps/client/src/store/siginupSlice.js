import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"; 


export const signupApi = createAsyncThunk('store/signupSlice/signupApi', async (formData, {rejectWithValue}) => {
    try{
        const response = await axios.post('/api/signup', formData)
        const results = await response.data;
        return results
    }catch(e){
        if(e.response && e.reponse.data){
            return rejectWithValue(e.response.data.message || '회원가입 실패');
        }else{
            return rejectWithValue('Network Error')
        }
    }
});


const initialState = {
     user: null,
     loading: 'idle',
     error: null,

}

 const signupSlice = createSlice({
    name : 'signup',
    initialState,
    reducers :{},
    extraReducers : (builder)=>{
        builder
        .addCase(signupApi.pending, (state)=>{
            state.loading = 'loading'
        })
        .addCase(signupApi.fulfilled, (state,action)=>{
            state.loading = 'success'
            state.user = action.payload
            state.error = null
        })
        .addCase(signupApi.rejected, (state,action)=>{
            state.loading = 'error'
            state.error = action.error.message
        })
    }   
})

export default signupSlice.reducer;