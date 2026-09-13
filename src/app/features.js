import {createSlice} from '@reduxjs/toolkit'


const authSlice=createSlice({
    name:'auth',
    initialState:{
        user:null,
        token:null
    },
    reducers:{
        login:(state,action)=>{
            state.token=action.payload.token
            state.user=action.payload.user
        },
        logout:(state)=>{
            state.user=null;
            state.token=null;
            localStorage.removeItem('token');
        }
    }
})

export const {login,logout} =authSlice.actions

export default authSlice.reducer