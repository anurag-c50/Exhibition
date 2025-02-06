import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { Auth } from "../../apiRouter";
export const IsAuth=createAsyncThunk("IsAuth",async()=>{
    try{
     const data = await axios.get(Auth,{
        headers:{
            "Authorization":`Bearer ${JSON.parse(localStorage.getItem("Auth"))}`
        }
     })
     
     console.log(data)
     if(data.status !==200){
        throw new Error("Server Error")
    }
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