import React,{useState,useEffect} from 'react'
import { FetchAllSpeakerStaff, FetchConferenceInfoForDate } from '../redux/features/ConferenceSlice'
import { useSelector,useDispatch } from 'react-redux'
import CreateStage from './CreateStage'
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function ConferenceInfo({setOpenConferenceByDate,ConferenceInfoAtDate,openConferenceByDate,ExhibitionInfo}) {
    const dispatch=useDispatch()
    const [conferenceIndex,setCOnferenceIndex]=useState()    
    const [openCreateStage,setOpenCreateStage]=useState(false)
    const closedModal=()=>{
        setOpenConferenceByDate(false)
      }
      const handleOpenCreateStage=(index)=>{
        setCOnferenceIndex(index)
        dispatch(FetchAllSpeakerStaff(ConferenceInfoAtDate[index]._id))
        setOpenCreateStage(true)
      }
      const handleCloseCreateStage=()=>{
        setOpenCreateStage(false)
      }
  return (
    <>
      <div className="bg-gray-100  flex justify-center items-center p-[10px] rounded-lg shadow-xl w-[100%] ">
        <div className=" flex flex-col justify-center items-center w-[80%]">
  <div className="w-full flex justify-end mb-4">
    <p onClick={()=>closedModal()} className="text-blue-500 hover:cursor-pointer text-3xl hover:text-red-500 transition-all">X</p>
  </div>
  <div className="w-full h-full overflow-y-auto border border-gray-300 rounded-lg">
    {ConferenceInfoAtDate.map((item, index) => (
      <div key={index} className="w-[98%] mx-auto my-3 border-2 border-gray-300 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex justify-center items-center space-x-2">
            <p className="font-semibold text-gray-600">Conference No.</p>
            <p className="text-gray-800">{item?.conferenceNo}</p>
          </div>
          <div className="flex justify-center items-center space-x-2">
            <p className="font-semibold text-gray-600">Start Time:</p>
            <p className="text-gray-800">{`${new Date(item.conferenceDuration.conferenceStartTiming).toLocaleTimeString()}`}</p>
          </div>
          <div className="flex justify-center items-center space-x-2">
            <p className="font-semibold text-gray-600">End Time:</p>
            <p className="text-gray-800">{`${new Date(item.conferenceDuration.conferenceEndTiming).toLocaleTimeString()}`}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex justify-center items-center space-x-2">
            <p className="font-semibold text-gray-600">Exhibition Staff Requirement:</p>
            <p className="text-gray-800">{item?.noOfConferenceStaffManagementRequire}</p>
          </div>
          <div className="flex justify-center items-center space-x-2">
            <p className="font-semibold text-gray-600">Exhibition Available Staff Positions:</p>
            <p className="text-gray-800">{item?.noOfConferenceStaffManagementRequire - item?.conferenceStaffManagementId.length}</p>
          </div>
          <div className="flex justify-center items-center space-x-2">
            <p className="font-semibold text-gray-600">No. of Stages:</p>
            <p className="text-gray-800">{item?.noOfStageInConference}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex justify-center items-center space-x-2">
            <p className="font-semibold text-gray-600">Available Stages:</p>
            <p className="text-gray-800">{item?.noOfStageInConference-item?.stageId.length}</p>
          </div>
          <div className="flex justify-center items-center space-x-2">
            <p className="font-semibold text-gray-600">Number of Brands Registered:</p>
            <p className="text-gray-800">{item?.noOfConferenceStaffManagementRequire - item?.noOfBrandStallInstallInConference}</p>
          </div>
        </div>
        <div className="flex justify-center">
          {item?.noOfStageInConference!==item?.stageId.length?<input type='button' value="Create Stage" onClick={()=>handleOpenCreateStage(index)} className="h-12 w-[40%] bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-500 transition-all"/>
          :<></>}
        </div>
      </div>
    ))}
  </div>
  </div>
</div>
<Modal onHide={()=>{handleCloseCreateStage()}} size='lg'  show={openCreateStage}>
  <Modal.Header closeButton>
    <Modal.Title id="example-custom-modal-styling-title">Create New Stage</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <CreateStage ExhibitionInfo={ExhibitionInfo} setOpenCreateStage={setOpenCreateStage} setOpenConferenceByDate={setOpenConferenceByDate} ConferenceInfoAtIndex={ConferenceInfoAtDate[conferenceIndex]}/>
      </Modal.Body>
      </Modal> 
    </>
  )
}
