import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { logOut } from "../../apiRouter";

export const UserLogout=createAsyncThunk("UserLogout",async(userEmail)=>{
    try{
     const data = await axios.post(logOut,
        { userEmail },  
        {
            headers: {
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem("Auth"))}`
            }

     })
     console.log("logout")
     if(data.data.status){
        localStorage.removeItem("Auth");
        localStorage.removeItem("UserData");
     }
     return data.data
    }catch(err){
        console.log(err)
    }
})
export const logoutInfo=createSlice({
    name:"logoutInfo",
    initialState:{
        logoutStatus:null
    },
    extraReducers:(builder)=>{
        builder.addCase(UserLogout.fulfilled,(state,action)=>{
            state.logoutStatus=action.payload
        })
    },
    reducers:{
        setLogoutStatus:(state, action) => {
            state.logoutStatus = action.payload;
          },
    }
})
export const {setLogoutStatus} = logoutInfo.actions
export default logoutInfo.reducer