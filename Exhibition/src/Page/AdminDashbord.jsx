import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { useSelector,useDispatch } from 'react-redux';
import CreateExhibitionaPage from '../AdminDashboardcomponent/CreateExhibitionPage';
import StaffSelection from '../AdminDashboardcomponent/StaffSelection';
import CreateConference from '../AdminDashboardcomponent/CreateConference';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FetchAdminExhibition } from '../redux/features/ExhibitionSlice';


export default function AdminDashbord() {
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(FetchAdminExhibition())
  },[])
  const [addExhibition,setAddExhibition]=useState(false)
  const [showAllinfoExhibition,setShowAllinfoExhibition]=useState(false)
  const [createConference,setCreateConference]=useState(false)
  const [selectExhibitionIndex,setSelectExhibitionIndex]=useState()
  const AllAdminExhibition=useSelector((state)=>state?.exhibitionReducer?.adminExhibition)
  const isShowInfoChange=(index)=>{
    setSelectExhibitionIndex(index)
    setShowAllinfoExhibition(!showAllinfoExhibition)
  }
  const isOpenCrateConferenceModel=(index)=>{
    setSelectExhibitionIndex(index)
    setCreateConference(!createConference)
  }
  return (
    <>
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 p-4 text-white">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl">Admin Dashboard</h1>
          <div className="space-x-4">
            <button  className="hover:bg-blue-500 px-4 py-2 rounded">
              Update Profile
            </button>
            <button  className="hover:bg-red-500 px-4 py-2 rounded">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-semibold">All Exhibitions</h2>
          <button onClick={()=>{setAddExhibition(true)}} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">
            Add New Exhibition
          </button>
        </div>
        <div className='border-[5px] border-blue-600 w-[84.4vw] rounded-[10px] overflow-y-auto h-[69vh]'>
        {AllAdminExhibition && AllAdminExhibition?.adminExhibitons?.map((exhibition,index) => { 
          return(
          <div className=' h-[33%] m-[4px] relative'>
            <img className='w-[100%]  h-[100%] rounded-[10px] absolute brightness-[0.5]' src={exhibition.exhibitionBannerImg} alt="" />
            <h1 className='text-white absolute w-[100%] text-center font-extrabold'>{exhibition.exhibitionName}</h1>
             <div className='absolute bottom-0 w-[100%] h-[63%] flex justify-center gap-[20px] items-center'>
              <button onClick={()=>{isShowInfoChange(index)}} className='h-[36%] w-[10%] rounded hover:bg-blue-500  bg-blue-600 text-2xl text-[antiquewhite] text-[20px]'>All Info</button>
              <button onClick={()=>{isOpenCrateConferenceModel(index)}} className='h-[36%] w-[13%] rounded hover:bg-blue-500  bg-blue-600 text-2xl text-[antiquewhite] text-[20px]'>Create Conference</button>
             </div>
          </div>
          )})} 
        </div> 
      </div>
    </div>
    <Modal show={addExhibition} fullscreen={true}>
      <CreateExhibitionaPage setAddExhibition={setAddExhibition}/>
      </Modal> 
      <Modal show={showAllinfoExhibition} fullscreen={true}>
      <div className="bg-gray-100 flex justify-center flex-col items-center p-6 rounded-lg shadow-lg w-full md:w-[60%] lg:w-[50%] mx-auto">
        <div className='h-[20vh] border-[5px] border-blue-600 rounded-[10px]  w-[30%]'>
          <img className='w-[100%] h-[100%]' src={AllAdminExhibition?.adminExhibitons[selectExhibitionIndex]?.exhibitionBannerImg} alt="" srcset="" />
        </div>
        <div className='h-[70vh] w-[100%]'>
        </div>
      </div>     
      </Modal> 
      <Modal show={createConference} fullscreen={true}>
      <CreateConference ExhibitionData={AllAdminExhibition?.adminExhibitons[selectExhibitionIndex]}/>
      </Modal> 
    </>
  )
}
