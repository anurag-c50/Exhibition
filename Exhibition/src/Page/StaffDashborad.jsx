import React,{useEffect,useState} from 'react'
import Modal from 'react-bootstrap/Modal';
import { useSelector,useDispatch } from 'react-redux';
import { IsAuth } from '../redux/features/IsAuthSlice'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { UserLogout } from '../redux/features/LogoutSlice';
import { setLoginData } from '../redux/features/AdminSignupAndLoginSlice';
import { setLogoutStatus } from '../redux/features/LogoutSlice';

export default function StaffDashborad() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const logoutStatus=useSelector((state)=>state?.logoutReducer?.logoutStatus)
    const UserData=JSON.parse(localStorage.getItem("UserData"))
    useEffect(()=>{
      dispatch(IsAuth())
    },[])
    useEffect(()=>{
      if(logoutStatus?.status){
          dispatch(setLoginData(null))
          dispatch(setLogoutStatus(null))
          navigate('/') 
      }
    },[logoutStatus])
      const Logout=()=>{
        dispatch(UserLogout(UserData?.userEmail))
      }
  return (
    <>
     <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 p-4 text-white">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl">Staff Dashboard</h1>
          <div className="space-x-4">
            <button  className="hover:bg-blue-500 px-4 py-2 rounded">
              Update Profile
            </button>
            <button onClick={()=>{Logout()}} className="hover:bg-red-500 px-4 py-2 rounded">
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
    </>
  )
}
