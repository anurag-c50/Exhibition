import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { AlllogOut, logOut } from "../../apiRouter";

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
export const UserAllLogout=createAsyncThunk("UserAllLogout",async(userEmail)=>{
    try{
     const data = await axios.post(AlllogOut,
        { useremail:(JSON.parse(localStorage.getItem("UserData")))?.userEmail,id:(JSON.parse(localStorage.getItem("UserData")))?._id } 
    )
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
        logoutStatus:null,
        AlllogoutStatus:null
    },
    extraReducers:(builder)=>{
        builder.addCase(UserLogout.fulfilled,(state,action)=>{
            state.logoutStatus=action.payload
        })
        builder.addCase(UserAllLogout.fulfilled,(state,action)=>{
            state.AlllogoutStatus=action.payload
        })
    },
    reducers:{
        setLogoutStatus:(state, action) => {
            state.logoutStatus = action.payload;
          },
          setAlllogoutStatus:(state, action) => {
            state.AlllogoutStatus = action.payload;
          }
    }
})
export const {setLogoutStatus,setAlllogoutStatus} = logoutInfo.actions
export default logoutInfo.reducer