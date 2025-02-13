import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectproductstaffmanegement, selectproductstaffshell } from '../redux/features/BrandSlice';
export default function BrandStaff({}) {
  const [selectProductStaff,setSelectProductStaff]=useState()
  const staffManegementData = useSelector((state) => state?.BrandReducer?.fetchStaffMangementdata);
  const staffShellData = useSelector((state) => state?.BrandReducer?.fetchStaffShelldata); 
  console.log(staffManegementData,staffShellData) 
const isSelectProductStaff=(selector)=>{
    if(selector==="Info Staff Shell"){
    setSelectProductStaff("Info Staff Shell")
    }else if(selector==="Info Staff Organized"){
        setSelectProductStaff("Info Staff Organized")
    }
}
  return (
    <div className="w-full flex justify-around  flex-col items-center bg-white rounded-lg shadow-lg">
          {selectProductStaff?selectProductStaff==="Info Staff Organized"?staffManegementData?.data.map((item,index) => {
            return (
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
            </div>
            );
          })
          :staffShellData?.data.map((item,index) => {
            return (
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
            </div>
            )
          }):<div className='text-gray-400 text-center text-[16px] w-[100%]'><h1>Select Staff Info</h1></div>} 
 <div className="flex justify-around items-center w-[100%]">
      <input type="button" className={`px-6 py-2 rounded-lg focus:outline-none transition duration-200 ${selectProductStaff === 'Info Staff Organized'?'bg-blue-500 text-white':'bg-gray-300 text-gray-700 hover:bg-gray-400'}`}value="Staff Info Product Management"onClick={() =>{isSelectProductStaff("Info Staff Organized")}}/>
      <input type="button"className={`px-6 py-2 rounded-lg focus:outline-none transition duration-200 ${selectProductStaff === 'Info Staff Shell'?'bg-blue-500 text-white':'bg-gray-300 text-gray-700 hover:bg-gray-400'}`} value="Staff Info Product Shell"onClick={() =>{isSelectProductStaff("Info Staff Shell")}}/>
    </div>
      </div>
  );
}
