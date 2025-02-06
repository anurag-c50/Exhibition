import React,{useEffect, useState} from 'react'
import DatePicker from "react-datepicker";
import {format,isSameDay,parseISO} from 'date-fns'
import "react-datepicker/dist/react-datepicker.css";
import { useSelector,useDispatch } from 'react-redux';
import { AdminCreatedConference } from '../redux/features/ConferenceSlice';
import { setConferenceData } from '../redux/features/ConferenceSlice';
export default function CreateConference({ExhibitionData,setCreateConference,createConference}) {
  const dispatch=useDispatch()
    const Time=new Date()
    const createconferenceData=useSelector((state)=>state?.conferenceReducer?.createdconferenceData)
    const [conferenceData,setConferenceDate]=useState({
      exhibitionId:ExhibitionData._id,
      conferenceNo:null,
      conferenceDate:"",
      conferenceDuration:{
        conferenceStartTiming:"",
        conferenceEndTiming:"" 
      },
      noOfBrandStallInstallInConference:null,
      noOfStageInConference:null,
      noOfConferenceStaffManagementRequire:null
    })
    const [alloweDate,setAllowdDate]=useState()
    const ExhibhitionStartTime =new Date(ExhibitionData.exhibitionDuration.Start)
    const ExhibhitionEndTime =new Date(ExhibitionData.exhibitionDuration.End)
    useEffect(()=>{
        if(createconferenceData?.status){
          setCreateConference(!createConference)
          setConferenceData(null)
        }else{
          IsDateValidConference()
        }
    },[createconferenceData])
    const SelectDayConference=(date)=>{
        setConferenceDate({...conferenceData,conferenceDate:date})
    }
    const IsDateValidConference=()=>{
      let Dates = [];
      while (ExhibhitionStartTime <= ExhibhitionEndTime) {
          Dates.push(new Date(ExhibhitionStartTime).toISOString().split("T")[0]);
          ExhibhitionStartTime.setDate(ExhibhitionStartTime.getDate() + 1);
      }
        const currentDate = new Date().toISOString().split("T")[0];
        const filteredDates = Dates.filter(date => date > currentDate);
        setAllowdDate(filteredDates.map(date => parseISO(date)));
        }    
    const isAlloweDate=(date)=>{return alloweDate.some(Date=>isSameDay(date,Date))}
    const handleConferenceDate=(e)=>{
      if(e.target.name==="conferenceStartTiming" || e.target.name==="conferenceEndTiming"){
        setConferenceDate({...conferenceData,conferenceDuration:{...conferenceData.conferenceDuration,[e.target.name]:e.target.value}})
      }else{
        setConferenceDate({...conferenceData,[e.target.name]:e.target.value})
      }
    }
    const ConferenceCreate=()=>{
      dispatch(AdminCreatedConference(conferenceData))
    }
    const closedModal=()=>{
      setCreateConference(!createConference)
    }
    return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full md:w-[60%] lg:w-[50%] h-[100%] mx-auto">
    <div className='w-[100%] h-[10%] flex justify-end '>
      <p onClick={()=>closedModal()} className='text-blue-300 hover:cursor-pointer text-2xl hover:text-red-500 '>X</p>
    </div>          
              <h2 className="text-3xl text-center font-semibold text-blue-600 mb-6">Create New Conference</h2>
              <div className="space-y-6">
        <div className="flex justify-center">
          <input type="number" className="w-[80%] md:w-[60%] text-center border-[2px] border-gray-300 rounded-lg p-2" name="conferenceNo" onChange={(e)=>{handleConferenceDate(e)}} value={conferenceData.conferenceNo} placeholder="Enter Conference No" />
        </div>
        <div className="flex justify-center">
          <DatePicker  className="w-[40%] text-center border-[2px] border-gray-300 rounded-lg p-2" selected={conferenceData.conferenceDate} onChange={SelectDayConference} filterDate={isAlloweDate} dateFormat={"yyyy-MM-dd"}
            placeholderText='Select a Date For Conference'/>
     </div>
     <div className="flex justify-center">
      <div className='flex justify-start items-center mr-[5px]'>
          <label htmlFor="conferenceStartTiming" >Select Start Time:</label>
     </div>
          <input id="conferenceStartTiming" onChange={(e)=>{handleConferenceDate(e)}} value={conferenceData.conferenceDuration.conferenceStartTiming} name="conferenceStartTiming" type="time" className="w-[20%] text-center border-[2px] border-gray-300 rounded-lg p-2  " />
          <div className='flex justify-start items-center mr-[5px]'>
          <label htmlFor="conferenceEndTiming"  className='ml-[40px]'>Select End Time:</label>
          </div>
          <input id="conferenceEndTiming" name="conferenceEndTiming"  onChange={(e)=>{handleConferenceDate(e)}} value={conferenceData.conferenceDuration.conferenceEndTiming} type="time" className="w-[20%] text-center border-[2px] border-gray-300 rounded-lg p-2  "/>
        </div>   
     <div className="flex justify-center">
          <input type="number" className="w-[40%] text-center border-[2px] border-gray-300 rounded-lg p-2" onChange={(e)=>{handleConferenceDate(e)}} value={conferenceData.noOfBrandStallInstallInConference} name='noOfBrandStallInstallInConference' placeholder="Enter No. Brand stalls in conference" />
        </div>   
        <div className="flex justify-center">
          <input type="number" className="w-[40%] text-center border-[2px] border-gray-300 rounded-lg p-2"  onChange={(e)=>{handleConferenceDate(e)}} value={conferenceData.noOfStageInConference} name="noOfStageInConference" placeholder="Enter No. Stages in conference" />
        </div>   
        <div className="flex justify-center">
          <input type="number" className="w-[40%] text-center border-[2px] border-gray-300 rounded-lg p-2"  onChange={(e)=>{handleConferenceDate(e)}} value={conferenceData.noOfConferenceStaffManagementRequire} name="noOfConferenceStaffManagementRequire" placeholder="Enter number of staff required" />
        </div>
        <div className="flex justify-center">
          <input type='button' onClick={()=>ConferenceCreate()} className="bg-blue-600 text-white px-6 py-3 rounded-[10px] hover:bg-blue-500 transition" value="Create Conference"/>
        </div>   
        </div>
        </div>
  )
}
