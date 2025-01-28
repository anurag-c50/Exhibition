import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { IsAuth } from '../redux/features/IsAuthSlice'
export default function AdminDashbord() {
  const dispatch=useDispatch()
  const [exhibitionData,setExhibitionData]=useState({
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
  }
  useEffect(()=>{
    dispatch(IsAuth())
  },[])
  return (
    <>
    <div>
    <div className='w-screen h-screen flex justify-center items-center'>
     <div className='w-[40%] h-[78%] border-[2px] border-black'>
        <div className='w-[100%] h-[80%] flex justify-center items-center flex-col gap-[27px]'>
          <div className='w-[100%] flex justify-center'>
          <input type="text" className='w-[40%] text-center' name="exhibitionName" placeholder='Enter Exhibition Name'/>
        </div>
        <div className='w-[100%]'>
          <div className='flex justify-center'>
          <input type="text" className='text-center w-[40%]' name='address' placeholder='Enter Address'/>
          </div>
          <div className='flex justify-center'>
            <input className='text-center' type="text" name="state" placeholder='Enter State'/>
            <input className='text-center' type="text" name="City" placeholder='Enter City'/>
            <input className='text-center' type="text" name="pinacode" placeholder='Enter Pincode'/>
          </div>
        </div>
        <div className='w-[100%] flex justify-center gap-[12%]'>
          <div>
            <label htmlFor="StartDate">Start Date:</label>
            <input type="date" name="Start" id="StartDate" />            
          </div>
          <div>
            <label htmlFor="EndDate">End Date:</label>
            <input type="date" name="End" id="EndDate" />            
          </div>
        </div>
        <div className='w-[100%] flex justify-center'>
          <input className='w-[50%] text-center' type="number" name="maxNoOfConferencePlayAtTime" placeholder='Enter number of concurrent conferences' />
        </div>
        <div className='w-[100%] flex justify-center'>
          <input type="number" className='w-[50%] text-center'  name="noOfExhibitionStaffManagementRequire" placeholder='Enter number of staff required' />
        </div>
        <div className='w-[100%] flex justify-center hover:cursor-pointer'>
          <input type="file" name="exhibitionBannerImg" id="" placeholder='Upload Banner Image'/>
        </div>
        <div className='w-[100%] flex justify-center'>
          <button  className='hover:cursor-pointer p-[10px] border-[2px] rounded-[10px]' type="button">Create Exhibition</button>
        </div>
        </div>
      </div>
    </div>

    </div>
    </>
  )
}
