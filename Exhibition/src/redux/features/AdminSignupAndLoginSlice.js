import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { loginRoute, signupRoute } from "../../apiRouter";
export const signupSubmit=createAsyncThunk("signupSubmit",async(SigupData)=>{
    try{
        const data=await axios.post(signupRoute,{
            userType:SigupData.userType,
            userName:SigupData.userName,
            userEmail:SigupData.userEmail,
            brandName:SigupData.brandName,
            staffRole:SigupData.staffRole,
            userContactNo:SigupData.userContactNo,
            password:SigupData.password,
        })
        return data.data

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
        if(data.status !==200){
            throw new Error("Data not savSed")
        }
        console.log("login")
        if(data.data.status){
            localStorage.setItem("UserData",JSON.stringify(data.data.userdata))
            localStorage.setItem("Auth",JSON.stringify(data.data.token))
         }

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
            state.loginData=action.payload
        })
    },
      reducers: {
        setLoginData: (state, action) => {
          state.loginData = action.payload
        },
        setUserSignupData:(state,action)=>{
            state.signupData=action.payload
        }
      },
})
export const { setLoginData,setUserSignupData } = signupAndLoginInfo.actions;

export default signupAndLoginInfo.reducer