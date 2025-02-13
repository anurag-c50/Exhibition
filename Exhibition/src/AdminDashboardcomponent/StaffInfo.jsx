import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
export default function StaffInfo() {
const StaffData = useSelector((state) => state?.exhibitionReducer?.fetchStaffInfoData)
  return (
   <>
    <div className='w-full flex justify-around  flex-col items-center bg-white rounded-lg shadow-lg'>
            {StaffData&&StaffData?.data.map((item)=>{return(
                <div className='w-[80%] my-2 pl-1 border-[2px]  border-gray-400 rounded-lg bg-white shadow-lg'>
                <div className='flex flex-col'>
                    <label className='text-sm font-medium text-gray-600' htmlFor='productName'>Staff Name:</label>
                    <p id='productName' className='m-0 text-lg font-medium text-gray-800'>{item?.userName}</p>
                </div>
                <div className='flex flex-col'>
                    <label className='text-sm font-medium text-gray-600' htmlFor='productDescription'>Staff Role:</label>
                    <p id='productDescription' className=' m-0 text-base text-gray-700'>
                       {item?.staffRole==="1"&&"Exhibition Staff Management"}
                    </p>
                </div>
                <div className='flex flex-col'>
                    <label className='text-sm font-medium text-gray-600' htmlFor='productPrice'>Staff Email:</label>
                    <p id='productPrice' className='text-lg m-0 font-medium text-gray-800'>{item?.userEmail} per Product</p>
                </div>
       
                <div className='flex flex-col'>
                    <label className='text-sm font-medium text-gray-600' htmlFor='productStock'>Staff Contact No:</label>
                    <p id='productStock' className='text-lg m-0 font-medium text-gray-800'>{item?.userContactNo
                    }</p>
                </div>
            </div>)})}
                </div>
   </>
  )
}
