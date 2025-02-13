import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectExhibitionStaff } from '../redux/features/ExhibitionSlice';
export default function BookExhibitionStaff({exhibitionId,setOpenxhibitionStaffModal,setShowAllinfoExhibition}) {
  const dispatch = useDispatch();
  const [staffChoiceIndex,setStaffChoiceIndex]=useState()
  const staffData = useSelector((state) => state?.exhibitionReducer?.ExhibitionStaffData);
  const selectData = useSelector((state) => state?.exhibitionReducer?.selectExhibitionStaffData);
useEffect(()=>{
  if(selectData?.status){
    setShowAllinfoExhibition(false)
        setOpenxhibitionStaffModal(false)
  }
},[,selectData])
  const handleSelectStaff=(index)=>{
    setStaffChoiceIndex(index)
  }
  const selectStaff=()=>{
    const dataId={
      exhibitionId:exhibitionId,
      staffId:staffData?.data[staffChoiceIndex]?._id
    } 
    dispatch(selectExhibitionStaff(dataId))
  }
  return (
    <div className="w-full flex justify-center py-6 flex-col items-center bg-gray-50 rounded-lg shadow-xl">
      <div className="w-full max-w-4xl space-y-6">
        <div className="w-full flex flex-col items-center flex-wrap justify-center gap-6">
        <label htmlFor="isOffer" className="font-medium text-lg">Select Staff For Exhibition:</label>

          {staffData &&staffData?.data.length===0?<><div className='text-gray-400 text-center text-[16px] w-[100%]'><h1>Staff Not available</h1></div></>: 
          staffData?.data.map((item,index) => {
            return (
              <div key={index} onClick={()=>{handleSelectStaff(index)}} className={`hover:cursor-pointer ${index===staffChoiceIndex?"bg-gray-300":"bg-white"} border-[2px] w-[100%] md:w-[45%] lg:w-[30%] border-gray-300 rounded-lg  shadow-md p-4 space-y-2`}>
                <div>
                  <p className="text-sm m-0 text-gray-500 font-medium">Speaker Name:</p>
                  <p className="text-lg m-0 text-gray-800 font-semibold">{item.userName}</p>
                </div>
                <div>
                  <p className="text-sm m-0 text-gray-500 font-medium">Speaker Email:</p>
                  <p className="text-lg text-gray-800">{item.userEmail}</p>
                </div>
                <div>
                  <p className="text-sm m-0 text-gray-500 font-medium">Speaker Contact No.:</p>
                  <p className="text-lg m-0 text-gray-800">{item.userContactNo}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center">
          {staffData &&staffData?.data.length!==0&&<input onClick={()=>{selectStaff()}} type="button" value="Select Staff" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition duration-300 transform hover:scale-105"/>
        }</div>
      </div>
    </div>
  );
}
