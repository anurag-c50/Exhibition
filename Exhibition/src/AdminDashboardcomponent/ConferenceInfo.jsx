import React,{useState,useEffect} from 'react'
import { FetchConferenceInfoForDate } from '../redux/features/ConferenceSlice'
import { useSelector,useDispatch } from 'react-redux'
import CreateStage from './CreateStage'
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function ConferenceInfo({setOpenConferenceByDate,ConferenceInfoAtDate,openConferenceByDate,ExhibitionInfo}) {
    const dispatch=useDispatch()
    const [openCreateStage,setOpenCreateStage]=useState(false)
    const closedModal=()=>{
        setOpenConferenceByDate(!openConferenceByDate)
      }
      const handleOpenCreateStage=()=>{
        setOpenCreateStage(!openCreateStage)
      }
  return (
    <>
         <div className="bg-gray-100 h-[100%] flex justify-start flex-col p-[6px] rounded-lg shadow-lg w-full md:w-[60%] lg:w-[50%] mx-auto">
         <div className='w-[95%] flex justify-end '>
      <p onClick={()=>closedModal()} className='text-blue-300 hover:cursor-pointer text-2xl hover:text-red-500 '>X</p>
       </div>
        <div className="w-[100%] h-[90%] overflow-y-auto border-black border-2">
        {ConferenceInfoAtDate.map((item)=>{return(
            <div className="w-[98%] m-[5px] h-auto border-black border-2">
           <div className='flex justify-around'>
            <div className='flex justify-center items-center'>
                <p className='mr-1'>Stage No.</p>
                <p>{item?.conferenceNo}</p>
            </div>
            <div className='flex justify-center items-center'>
                <p className='mr-1'>Start Time:</p>
                <p>{new Date(item.conferenceDuration.conferenceStartTiming).getHours()}:{new Date(item.conferenceDuration.conferenceStartTiming).getMinutes()}:{new Date(item.conferenceDuration.conferenceStartTiming).getSeconds()}</p>
            </div>
            <div className='flex justify-center items-center'>
                <p className='mr-1'>End Time:</p>
                <p>{new Date(item.conferenceDuration.conferenceEndTiming).getHours()}:{new Date(item.conferenceDuration.conferenceEndTiming).getMinutes()}:{new Date(item.conferenceDuration.conferenceEndTiming).getSeconds()}</p>
            </div>
            </div >
            <div className='flex justify-around'>
            <div className='flex justify-center items-center'>
                <p className='mr-1'>Exhibition Staff Requirement:</p>
                <p>{item?.noOfConferenceStaffManagementRequire}</p>
            </div>
            <div className='flex justify-center items-center'>
                <p className='mr-1'>Exhibition Available Staff Positions:</p>
                <p>{item?.noOfConferenceStaffManagementRequire-item?.conferenceStaffManagementId.length}</p>
            </div>
            <div className='flex justify-center items-center'>
                <p className='mr-1'>No. of Stages:</p>
                <p>{item?.noOfStageInConference}</p>
            </div>
            </div>
            <div className='flex justify-around'>
            <div className='flex justify-center items-center'>
                <p className='mr-1'>Available Stages:</p>
                <p>{item?.noOfStageInConference}</p>
            </div>
            <div className='flex justify-center items-center'>
                <p className='mr-1'>Number of Brand Register:</p>
                <p>{item?.noOfConferenceStaffManagementRequire-item?.noOfBrandStallInstallInConference}</p>
            </div>
            </div>
            <div className='flex justify-center'>
            <button onClick={()=>handleOpenCreateStage()} className='h-auto w-[30%] rounded hover:bg-blue-500  bg-blue-600 text-2xl text-[antiquewhite] text-[20px]'>Create Stage</button>
            </div>
        </div>)})}
        </div>
        </div>
        <Modal show={openCreateStage} size="sm">
            <CreateStage/>
      </Modal> 
    </>
  )
}
