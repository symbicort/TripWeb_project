import { createSlice } from "@reduxjs/toolkit";
import { login } from "../../api/authApi";

const initialState = {
    user: null,
    loading: false,
    error: null
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true
            state.error = null
        },
        loginSuccess: (state, action) =>{
            state.loading = false
            state.user = action.payload
        },
        loginFailure : (state, action)=>{
            state.loading = false
            state.error = action.payload
        }
    }
})

export const {loginStart, loginSuccess, loginFailure} = loginSlice.actions

export const loginUser = (userData) => async (dispatch) => {
    try{
        dispatch(loginStart());
        const user = await login(userData)
        dispatch(loginSuccess(user))
    }catch(error){
        dispatch(loginFailure(error))
    }   
}


export default loginSlice.reducer
