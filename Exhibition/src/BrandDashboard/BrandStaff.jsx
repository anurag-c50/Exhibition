import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectproductstaffmanegement, selectproductstaffshell } from '../redux/features/BrandSlice';
export default function BrandStaff({setShowProductModal}) {
  const dispatch = useDispatch();
  const [staffChoiceIndex,setStaffChoiceIndex]=useState()
  const [selectProductStaff,setSelectProductStaff]=useState()
  const staffManegementData = useSelector((state) => state?.BrandReducer?.fetchStaffProductManagementdata);
  const staffShellData = useSelector((state) => state?.BrandReducer?.fetchStaffProductShelldata);  
  const selectStaffManagement = useSelector((state) => state?.BrandReducer?.selectStaffProductManagementdata);
  const selectStaffShell = useSelector((state) => state?.BrandReducer?.selectStaffProductShelldata);
useEffect(()=>{
  if(selectStaffManagement?.status){
    setShowProductModal(false)
  }else if(selectStaffShell?.status){
    setShowProductModal(false)
  }
},[selectStaffManagement,selectStaffShell])
  const handleSelectStaff=(index)=>{
    setStaffChoiceIndex(index)
  }
  const selectStaff=()=>{
    if(selectProductStaff==='Product Staff Shell'){
    dispatch(selectproductstaffshell(staffShellData?.data[staffChoiceIndex]?._id))
  }else if(selectProductStaff==="Product Staff Organized"){
    dispatch(selectproductstaffmanegement(staffManegementData?.data[staffChoiceIndex]?._id))
  }
}
const isSelectProductStaff=(selector)=>{
    if(selector==="Product Staff Shell"){
    setSelectProductStaff("Product Staff Shell")
    }else if(selector==="Product Staff Organized"){
        setSelectProductStaff("Product Staff Organized")
    }
}
  return (
    <div className="w-full flex justify-center py-6 flex-col items-center bg-gray-50 rounded-lg shadow-xl">
  
      <div className="w-full max-w-4xl space-y-6">
        <div className="w-full flex flex-col items-center flex-wrap justify-center gap-6">
        <label htmlFor="isOffer" className="font-medium text-lg">Select Staff For Porduct:</label>

          {selectProductStaff?selectProductStaff==="Product Staff Organized"?(staffManegementData &&staffManegementData?.data.length===0?<><div className='text-gray-400 text-center text-[16px] w-[100%]'><h1>Staff Not available</h1></div></>: 
          staffManegementData?.data.map((item,index) => {
            return (
              <div key={index} onClick={()=>{handleSelectStaff(index)}} className={`hover:cursor-pointer ${index===staffChoiceIndex?"bg-gray-300":"bg-white"} border-[2px] w-[100%] md:w-[45%] lg:w-[30%] border-gray-300 rounded-lg  shadow-md p-4 space-y-2`}>
                <div>
                  <p className="text-sm m-0 text-gray-500 font-medium">Staff Name:</p>
                  <p className="text-lg m-0 text-gray-800 font-semibold">{item.userName}</p>
                </div>
                <div>
                  <p className="text-sm m-0 text-gray-500 font-medium">Staff Email:</p>
                  <p className="text-lg text-gray-800">{item.userEmail}</p>
                </div>
                <div>
                  <p className="text-sm m-0 text-gray-500 font-medium">Staff Contact No.:</p>
                  <p className="text-lg m-0 text-gray-800">{item.userContactNo}</p>
                </div>
              </div>
            );
          }))
          :(staffShellData &&staffShellData?.data.length===0?<><div className='text-gray-400 text-center text-[16px] w-[100%]'><h1>Staff Not available</h1></div></>: 
          staffShellData?.data.map((item,index) => {
            return (
              <div key={index} onClick={()=>{handleSelectStaff(index)}} className={`hover:cursor-pointer ${index===staffChoiceIndex?"bg-gray-300":"bg-white"} border-[2px] w-[100%] md:w-[45%] lg:w-[30%] border-gray-300 rounded-lg  shadow-md p-4 space-y-2`}>
                <div>
                  <p className="text-sm m-0 text-gray-500 font-medium">Staff Name:</p>
                  <p className="text-lg m-0 text-gray-800 font-semibold">{item.userName}</p>
                </div>
                <div>
                  <p className="text-sm m-0 text-gray-500 font-medium">Staff Email:</p>
                  <p className="text-lg text-gray-800">{item.userEmail}</p>
                </div>
                <div>
                  <p className="text-sm m-0 text-gray-500 font-medium">Staff Contact No.:</p>
                  <p className="text-lg m-0 text-gray-800">{item.userContactNo}</p>
                </div>
              </div>
            )
          })):<div className='text-gray-400 text-center text-[16px] w-[100%]'><h1>Select Staff Role</h1></div>} 
                <div className="flex justify-center">
          {selectProductStaff&&<input onClick={()=>{selectStaff()}} type="button" value="Select Staff" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition duration-300 transform hover:scale-105"/>
       } </div>
 <div className="flex justify-around items-center w-[100%]">
      <input type="button" className={`px-6 py-2 rounded-lg focus:outline-none transition duration-200 ${selectProductStaff === 'Product Staff Organized'?'bg-blue-500 text-white':'bg-gray-300 text-gray-700 hover:bg-gray-400'}`}value="Book Staff For Product Management"onClick={() =>{isSelectProductStaff("Product Staff Organized")}}/>
      <input type="button"className={`px-6 py-2 rounded-lg focus:outline-none transition duration-200 ${selectProductStaff === 'Product Staff Shell'?'bg-blue-500 text-white':'bg-gray-300 text-gray-700 hover:bg-gray-400'}`} value="Product Staff Shell"onClick={() =>{isSelectProductStaff("Product Staff Shell")}}/>
    </div>

        </div>
      </div>
    </div>
  );
}
