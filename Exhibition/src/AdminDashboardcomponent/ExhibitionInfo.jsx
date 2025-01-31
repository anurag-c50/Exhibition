import React, { useEffect,useState } from 'react'
import { FetchExhibitionConference } from '../redux/features/ConferenceSlice'
import { useDispatch,useSelector } from 'react-redux'
import CreateConference from './CreateConference'
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import ConferenceInfo from './ConferenceInfo';

export default function ExhibitionInfo({AllAdminExhibition,showAllinfoExhibition,setShowAllinfoExhibition,selectExhibitionIndex}) {
      const [alloweDate,setAllowdDate]=useState()
      const dispatch=useDispatch()
      const [ConferenceInfoAtDate,setConferenceInfoAtDate]=useState()
      const [createConference,setCreateConference]=useState(false)
      const [openConferenceByDate,setOpenConferenceByDate]=useState(false)
      const [conferenceCountByDate,setconferenceCountByDate]=useState()
    useEffect(()=>{
        IsDateValidConference()        
        dispatch(FetchExhibitionConference(AllAdminExhibition?.adminExhibitons[selectExhibitionIndex]._id))
    },[])
    const ConferenceInfoForExhibition=useSelector((state)=>state?.conferenceReducer?.exhibitionAllCOnferenceInfo?.ExhibitonsConference)
   
    const extractDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString();
      };
    useEffect(()=>{
        if(ConferenceInfoForExhibition){
           let conferenceCount = ConferenceInfoForExhibition.reduce((acc, conference) => {
                const startDate = extractDate(conference.conferenceDuration.conferenceStartTiming);
                if (!acc[startDate]) {
                    acc[startDate] = {
                      count: 0,   
                      ids: []     
                    };
                  }
                  acc[startDate].count += 1;
                  acc[startDate].ids.push(conference._id);
              
                  return acc;
              }, {});
              console.log(conferenceCount)
              setconferenceCountByDate(conferenceCount)
        }
    },[ConferenceInfoForExhibition])
    const IsDateValidConference=()=>{
        let Dates=[]
        let End = new Date(AllAdminExhibition?.adminExhibitons[selectExhibitionIndex]?.exhibitionDuration.End);
        let Start = new Date(AllAdminExhibition?.adminExhibitons[selectExhibitionIndex]?.exhibitionDuration.Start);
        while(Start<=End){
            Dates.push(Start.toISOString())
            Start.setDate(Start.getDate()+1)
          }
          setAllowdDate(Dates.map((date)=>new Date(date).toLocaleDateString()))
          }
          const isOpenCrateConferenceModel=()=>{
            setCreateConference(!createConference)
          }
          const closedModal=()=>{
            setShowAllinfoExhibition(!showAllinfoExhibition)
          }
          const openModalForConferenceDate=(date)=>{
            let conferenceIdsAtDate=conferenceCountByDate[date]?.ids
            setConferenceInfoAtDate(ConferenceInfoForExhibition.filter(data =>conferenceIdsAtDate.some(id => id === data._id)))
            console.log()
            setOpenConferenceByDate(true)
          }
  return (
   <>
     <div className="bg-gray-100 flex justify-center flex-col p-[6px] items-center rounded-lg shadow-lg w-full md:w-[60%] lg:w-[50%] mx-auto">
     <div className='w-[95%] flex justify-center '>
     <div className="w-[60%] flex justify-end">          
          <h1>{AllAdminExhibition?.adminExhibitons[selectExhibitionIndex]?.exhibitionName}</h1>
      </div>
      <div className='w-[40%] flex justify-end'>
      <p onClick={()=>closedModal()} className='text-blue-300 hover:cursor-pointer text-2xl hover:text-red-500 '>X</p>
      </div>
       </div>
        <div className='h-[20vh] border-[5px] border-blue-600 rounded-[10px]  w-[30%]'>
          <img className='w-[100%] h-[100%]' src={AllAdminExhibition?.adminExhibitons[selectExhibitionIndex]?.exhibitionBannerImg} alt="" srcset="" />
        </div>
        <div className=' h-[70vh] w-[100%]'>
          <div className=" h-[60%] w-[100%] mt-[5px]">
          <label >Exhibition Address</label>
          <div className="flex justify-center mb-4">
            <div className="w-[80%] md:w-[60%] text-center border-[2px] text-gray-600 border-gray-300 rounded-lg p-2">{AllAdminExhibition?.adminExhibitons[selectExhibitionIndex]?.exhibitionAddress.address}</div>
          </div>
          <div className="flex justify-center space-x-4">
            <div className="w-[40%] text-center border-[2px] text-gray-600 border-gray-300 rounded-lg p-2" >{AllAdminExhibition?.adminExhibitons[selectExhibitionIndex]?.exhibitionAddress.state}</div>
            <div className="w-[40%] text-center border-[2px] text-gray-600 border-gray-300 rounded-lg p-2" >{AllAdminExhibition?.adminExhibitons[selectExhibitionIndex]?.exhibitionAddress.city}</div>
            <div className="w-[20%] text-center border-[2px] text-gray-600 border-gray-300 rounded-lg p-2" >{AllAdminExhibition?.adminExhibitons[selectExhibitionIndex]?.exhibitionAddress.pincode}</div>
            </div>
            <label >Exhibition Staff Requirement</label>
        <div className="flex justify-center">
          <div type="number" className="w-[60%] text-center border-[2px] text-gray-600 border-gray-300 rounded-lg p-2">{AllAdminExhibition?.adminExhibitons[selectExhibitionIndex]?.noOfExhibitionStaffManagementRequire} </div>
        </div>
        <label >Exhibition Available Staff Positions</label>
        <div className="flex justify-center">
          <div type="number" className="w-[60%] text-center border-[2px] text-gray-600 border-gray-300 rounded-lg p-2">{AllAdminExhibition?.adminExhibitons[selectExhibitionIndex]?.exhibitionStaffManagementId.length} </div>
        </div>
        </div>
        <div className="overflow-y-scroll h-[40%] w-[100%] ">
       {alloweDate?.map((item,index)=>{return(
        <div className='w-100% h-[38%] flex border-black border-[2px]'>
        <div className='flex flex-col justify-center items-center w-[25%]'>
        <p className='m-0'>Exhibition Days</p>
          <div>{item}</div>
        </div>
        <div className='flex flex-col justify-center items-center w-[25%]'>
        <p>No. Of Conference</p>
        {conferenceCountByDate&&<div>{conferenceCountByDate[item]?.count||0}</div>}        
        </div>
        <div className='flex w-[25%] justify-center items-center'>        
        <button onClick={()=>{isOpenCrateConferenceModel()}} className='h-[36%] w-[90%] rounded hover:bg-blue-500  bg-blue-600 text-2xl text-[antiquewhite] text-[20px]'>Create Conference</button>
        </div>
        <div className='flex w-[25%] justify-center items-center'>        
        <button onClick={()=>openModalForConferenceDate(item)} className='h-[36%] w-[90%] rounded hover:bg-blue-500  bg-blue-600 text-2xl text-[antiquewhite] text-[20px]'>Conference Info</button>
        </div>
        </div>)})}
        </div>
          </div>
          <div>
        </div>
        </div>
        <Modal show={createConference} fullscreen={true}>
      <CreateConference setCreateConference={setCreateConference} createConference={createConference} ExhibitionData={AllAdminExhibition?.adminExhibitons[selectExhibitionIndex]}/>
      </Modal> 
      <Modal show={openConferenceByDate} fullscreen={true}>
      <ConferenceInfo setOpenConferenceByDate={setOpenConferenceByDate} ExhibitionInfo={AllAdminExhibition?.adminExhibitons[selectExhibitionIndex]} ConferenceInfoAtDate={ConferenceInfoAtDate} openConferenceByDate={openConferenceByDate} />
      </Modal> 
</>
  )
}
