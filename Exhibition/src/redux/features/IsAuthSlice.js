import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { Auth } from "../../apiRouter";
export const IsAuth=createAsyncThunk("IsAuth",async()=>{
    try{
        console.log(2)
     const data = await axios.get(Auth,{
        headers:{
            "Authorization":`Bearer ${JSON.parse(localStorage.getItem("Auth"))}`
        }
     })
     if(!data.data.status){
        localStorage.removeItem("Auth");
        localStorage.removeItem("UserData");

     }
    }catch(err){
        console.log(err)
    }
})
export const isAuthInfo=createSlice({
    name:"isAuthInfo",
    initialState:{
        data:null
    },
    extraReducers:(builder)=>{
        builder.addCase(IsAuth.fulfilled,(state,action)=>{
            state.data=action.payload
        })
    }
})
export default isAuthInfo.reducer