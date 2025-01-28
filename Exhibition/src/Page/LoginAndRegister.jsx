import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {signupSubmit,loginSubmit} from '../redux/features/AdminSignupAndLoginSlice'
export default function LoginAndRegister() {
  const navigate=useNavigate()
  const fetchLoginData = useSelector((state)=>state?.signupAndLoginReducer?.loginData)
  const dispatch = useDispatch()
  const [isLoginAndSinup,setIsLoginAndSinup]=useState("Signup")
  const hanldeLoginSignup=()=>{
    isLoginAndSinup==="Login"?setIsLoginAndSinup("Signup"):setIsLoginAndSinup("Login")
  }
  const [signupData,setSignupData]=useState({
    userType:"1",
    userName:"",
    userEmail:"",
    userContactNo:null,
    password:"",
  })
  const [loginData,setLoginData]=useState({
    userEmail:"",
    password:"",
  })
  const hanldeSignupData=(e)=>{
    setSignupData({...signupData,[e.target.name]:e.target.value})
  }

const hanldeLoginData=(e)=>{
  setLoginData({...loginData,[e.target.name]:e.target.value})
}
const submitLogin=()=>{
  dispatch(loginSubmit(loginData))
}
useEffect(()=>{
  if(fetchLoginData.status){
   navigate("/admindashbord")   
  }
},[fetchLoginData])

const submitSignup=()=>{
  setIsLoginAndSinup("Login")
  dispatch(signupSubmit(signupData))
  }
  return (
    <>
    <div className='w-screen h-screen flex justify-center items-center'>
     {isLoginAndSinup==="Signup"?
     <div className='w-[40%] h-[78%] border-[2px] border-black'>
        <div className='w-[100%] h-[80%] flex justify-center items-center flex-col gap-[27px]'>
          <div>
          <label htmlFor="usertype">Choose UserType</label>
          <select name="userType" onChange={(e)=>hanldeSignupData(e)}>
            <option value="1">Admin</option>
            <option value="2">SubAdmin</option>
            <option value="3">Brand</option>
            <option value="4">Staff</option>
            <option value="5">Attendee</option>
          </select>
        </div>
        <div>
          <input type="text" name='userName' onChange={(e)=>{hanldeSignupData(e)}} placeholder='Enter UserName'/>
        </div>
        <div>
          <input type="email" name='userEmail' onChange={(e)=>{hanldeSignupData(e)}} placeholder='Enter UserEmail' />
        </div>
        <div>
          <input type="text"  name='userContactNo' onChange={(e)=>{hanldeSignupData(e)}} placeholder='Enter ContactNo'/>
        </div>
        <div>
          <input type="password"  name='password' onChange={(e)=>{hanldeSignupData(e)}} placeholder='Enter Password'/>
        </div>
        <div className=''>
          <button onClick={()=>{submitSignup()}} className='hover:cursor-pointer p-[10px] border-[2px] rounded-[10px]' type="button">Signup</button>
        </div>
        </div>
        <div className='w-[100%] h-[20%] flex justify-center items-center'>
        <p onClick={()=>{hanldeLoginSignup()}}  className='hover:underline hover:cursor-pointer'>Login Now</p>
        </div>
      </div>:
           <div className='w-[40%] h-[78%] border-[2px] border-black'>
             <div className='w-[100%] h-[80%] flex justify-center items-center flex-col gap-[27px]'>
           <div>
             <input type="email" name="userEmail" onChange={(e)=>{hanldeLoginData(e)}} placeholder='Enter UserEmail' />
           </div>
           <div>
             <input type="password" name="password" onChange={(e)=>{hanldeLoginData(e)}} placeholder='Enter Password'/>
           </div>
           <div className=''>
             <button onClick={()=>{submitLogin()}} className='hover:cursor-pointer p-[10px] border-[2px] rounded-[10px]' type="button">Login</button>
           </div>
           </div>
           <div className='w-[100%] h-[20%] flex justify-center items-center'>
           <p onClick={()=>{hanldeLoginSignup()}} className='hover:underline hover:cursor-pointer'>Login Now</p>
           </div>
           </div>
          }
    </div>
    </>
  )
}
