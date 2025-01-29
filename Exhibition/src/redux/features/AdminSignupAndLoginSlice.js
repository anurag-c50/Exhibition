import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { loginRoute, signupRoute } from "../../apiRouter";
export const signupSubmit=createAsyncThunk("signupSubmit",async(SigupData)=>{
    try{
        const data  = await axios.post(signupRoute,{
            userType:SigupData.userType,
            userName:SigupData.userName,
            userEmail:SigupData.userEmail,
            userContactNo:SigupData.userContactNo,
            password:SigupData.password,
        })
    }catch(err){
        console.log(err)
    }
})
export const loginSubmit = createAsyncThunk("loginSubmit",async(LoginData)=>{
    try{
        const data = await axios.post(loginRoute,{
            userEmail:LoginData.userEmail,
            password:LoginData.password,
        })
        console.log(data)
        if(data.status !==200){
            throw new Error("Data not savSed")
        }
        localStorage.setItem("UserData",JSON.stringify(data.data.userdata))
        localStorage.setItem("Auth",JSON.stringify(data.data.token))
        return data.data
    }catch(err){
        console.log({error: err})
    }

})
export const signupAndLoginInfo = createSlice({
    name:"UserData",
    initialState:{
        loginData:JSON.parse(localStorage.getItem("UserData")),
        signupData:null
    },
    extraReducers:(builder)=>{
        builder.addCase(signupSubmit.fulfilled,(state,action)=>{
            state.signupData=action.payload
        
        })
        builder.addCase(loginSubmit.fulfilled,(state,action)=>{
            console.log(action.payload)
            state.loginData=action.payload
        })
    },
})

export default signupAndLoginInfo.reducer