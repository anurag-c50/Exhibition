import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { IsAuth } from '../redux/features/IsAuthSlice'
import { CreateExhibition } from '../redux/features/ExhibitionSlice'
export default function CreateExhibitionaPage({setAddExhibition}) {
  const dispatch=useDispatch()
  const ExhibitionDataRes = useSelector((state)=>state?.exhibitionReducer?.exhibitionData)
  useEffect(()=>{
    dispatch(IsAuth())
  },[])
  const adminData=useSelector((state)=>state?.signupAndLoginReducer?.loginData)
  const [exhibitionData,setExhibitionData]=useState({
    adminId:adminData._id,
    exhibitionName:"",
    exhibitionAddress:{
      address:"",
      state:"",
      city:"",
      pincode:null
    },
    exhibitionBannerImg:"",
    exhibitionDuration:{
      Start:"",
      End:""
    },
    maxNoOfConferencePlayAtTime:null,
    noOfExhibitionStaffManagementRequire:null
  })
  const handleCreateExhibition=(e)=>{
    if(e.target.name==="exhibitionBannerImg"){
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = () => {
          const base64String = reader.result;
          setExhibitionData({ ...exhibitionData, exhibitionBannerImg: base64String });
        };
      reader.readAsDataURL(file)
    }
    else if (e.target.name === 'exhibitionName' || e.target.name === 'maxNoOfConferencePlayAtTime' || e.target.name === 'noOfExhibitionStaffManagementRequire') {
      setExhibitionData({ ...exhibitionData, [e.target.name]: e.target.value });
    } else if (e.target.name === 'address' || e.target.name === 'state' || e.target.name === 'city' || e.target.name === 'pincode') {
      setExhibitionData({...exhibitionData,exhibitionAddress: { ...exhibitionData.exhibitionAddress, [e.target.name]: e.target.value }});
    } else if (e.target.name === 'Start' || e.target.name === 'End') {
      setExhibitionData({...exhibitionData,exhibitionDuration: { ...exhibitionData.exhibitionDuration, [e.target.name]: e.target.value }});
    }
  }
  const Exhibitioncreate=()=>{
    dispatch(CreateExhibition(exhibitionData))
  }
  useEffect(()=>{
    if(ExhibitionDataRes?.status){
      setAddExhibition(false)
    }
  },[ExhibitionDataRes])

  return (
    <>
   <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full md:w-[60%] lg:w-[50%] mx-auto">
      <h2 className="text-3xl text-center font-semibold text-blue-600 mb-6">Create New Exhibition</h2>
      
      <div className="space-y-6">
        <div className="flex justify-center">
          <input type="text" className="w-[80%] md:w-[60%] text-center border-[2px] border-gray-300 rounded-lg p-2" onChange={(e) => handleCreateExhibition(e)} name="exhibitionName" value={exhibitionData.exhibitionName} placeholder="Enter Exhibition Name" />
        </div>

        <div>
          <div className="flex justify-center mb-4">
            <input type="text" className="w-[80%] md:w-[60%] text-center border-[2px] border-gray-300 rounded-lg p-2" onChange={(e) => handleCreateExhibition(e)} name="address" value={exhibitionData.exhibitionAddress.address} placeholder="Enter Address" />
          </div>

          <div className="flex justify-center space-x-4">
            <input type="text" className="w-[40%] text-center border-[2px] border-gray-300 rounded-lg p-2" onChange={(e) => handleCreateExhibition(e)} name="state" value={exhibitionData.exhibitionAddress.state} placeholder="Enter State"/>
            <input type="text" className="w-[40%] text-center border-[2px] border-gray-300 rounded-lg p-2" onChange={(e) => handleCreateExhibition(e)} name="city" value={exhibitionData.exhibitionAddress.city} placeholder="Enter City" />
            <input type="number" className="w-[20%] text-center border-[2px] border-gray-300 rounded-lg p-2" onChange={(e) => handleCreateExhibition(e)} name="pincode" value={exhibitionData.exhibitionAddress.pincode} placeholder="Enter Pincode"
            />
          </div>
        </div>

        <div className="flex justify-center gap-8">
          <div>
            <label htmlFor="StartDate" className="block text-center">Start Date:</label>
            <input type="date"name="Start" className="border-[2px] border-gray-300 rounded-lg p-2" onChange={(e) => handleCreateExhibition(e)} id="StartDate"/>
          </div>

          <div>
            <label htmlFor="EndDate" className="block text-center">End Date:</label>
            <input type="date" name="End" className="border-[2px] border-gray-300 rounded-lg p-2" onChange={(e) => handleCreateExhibition(e)} id="EndDate"/>
          </div>
        </div>

        <div className="flex justify-center">
          <input type="number" className="w-[60%] text-center border-[2px] border-gray-300 rounded-lg p-2" onChange={(e) => handleCreateExhibition(e)} name="maxNoOfConferencePlayAtTime" value={exhibitionData.maxNoOfConferencePlayAtTime} placeholder="Enter number of concurrent conferences" />
        </div>

        <div className="flex justify-center">
          <input type="number" className="w-[60%] text-center border-[2px] border-gray-300 rounded-lg p-2" onChange={(e) => handleCreateExhibition(e)} name="noOfExhibitionStaffManagementRequire" value={exhibitionData.noOfExhibitionStaffManagementRequire} placeholder="Enter number of staff required" />
        </div>

        <div className="flex justify-center">
          <input type="file" name="exhibitionBannerImg" className="text-center border-[2px] border-gray-300 rounded-lg p-2" onChange={(e) => handleCreateExhibition(e)}placeholder="Upload Banner Image"/>
        </div>

        <div className="flex justify-center">
          <button onClick={Exhibitioncreate} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition">Create Exhibition </button>
        </div>
      </div>
    </div>    
    </>
  )
}
