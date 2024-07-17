import { createSlice } from '@reduxjs/toolkit';
import { userDeleteApi } from '../../api/authApi';

const initialState = {
    user : null
}


export const deleteUser = (userData) => async (dispatch) => {
    try{
        const isAvailable = await userDeleteApi(userData)
        dispatch(setUserDelete(isAvailable))
    }catch(error){
        console.error('사용자 계정 삭제 실패:', error);
    }
}



const authDeleteSlice = createSlice({
    name : 'authDelete',
    initialState, 
    reducers : {
        setUserDelete : (state, action) => {
            state.user = action.payload
        }
    }
})

const {setUserDelete} = authDeleteSlice.actions

export default authDeleteSlice.reducer