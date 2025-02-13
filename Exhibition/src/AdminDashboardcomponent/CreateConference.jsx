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
    const [Error,setError]=useState({
      Error1:{err:"",check:false},
    })
    const ConferenceValidation = () => {
         if (conferenceData.conferenceNo === null) {
          return true
        } 
        if (conferenceData.conferenceDate==="") {
          return true
        } 
      
        if (conferenceData.conferenceDuration.conferenceStartTiming==="") {
          return true
      }   
        if (conferenceData.conferenceDuration.conferenceEndTiming==="") {
          return true
        } 
        if (conferenceData.noOfBrandStallInstallInConference===null) {
          return true

        } 
        if (conferenceData.noOfStageInConference===null) {
          return true
        }
        if (conferenceData.noOfConferenceStaffManagementRequire===null) {
          return true
        }
      return false
    }
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
      Error.Error1 = { err: '', check: false };
      if(e.target.name==="conferenceStartTiming" || e.target.name==="conferenceEndTiming"){
        setConferenceDate({...conferenceData,conferenceDuration:{...conferenceData.conferenceDuration,[e.target.name]:e.target.value}})
      }else{
        setConferenceDate({...conferenceData,[e.target.name]:e.target.value})
      }
    }
    const ConferenceCreate=()=>{
      if(ConferenceValidation()){
        setError({...Error,Error1:{err:' Field Empty', check: true }});
        return
      }
      dispatch(AdminCreatedConference(conferenceData))
    }
    return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full ">      
              <div className="space-y-6">
        <div className="flex justify-center">
          <input type="number" className="w-[80%] md:w-[60%] text-center outline-3 outline-gray-400  focus:outline-blue-500 rounded-lg p-2" name="conferenceNo" onChange={(e)=>{handleConferenceDate(e)}} value={conferenceData.conferenceNo} placeholder="Enter Conference No" />
        </div>
        <div className="flex justify-center">
          <DatePicker  className="w-[40%] text-center outline-3 outline-gray-400  focus:outline-blue-500  rounded-lg p-2" selected={conferenceData.conferenceDate} onChange={SelectDayConference} filterDate={isAlloweDate} dateFormat={"yyyy-MM-dd"}
            placeholderText='Select a Date For Conference'/>
     </div>
     <div className="flex justify-center">
      <div className='flex justify-start items-center mr-[5px]'>
          <label htmlFor="conferenceStartTiming" >Select Start Time:</label>
     </div>
          <input id="conferenceStartTiming" onChange={(e)=>{handleConferenceDate(e)}} value={conferenceData.conferenceDuration.conferenceStartTiming} name="conferenceStartTiming" type="time" className="w-[20%] text-center outline-3 outline-gray-400  focus:outline-blue-500  rounded-lg p-2  " />
          <div className='flex justify-start items-center mr-[5px]'>
          <label htmlFor="conferenceEndTiming"  className='ml-[40px]'>Select End Time:</label>
          </div>
          <input id="conferenceEndTiming" name="conferenceEndTiming"  onChange={(e)=>{handleConferenceDate(e)}} value={conferenceData.conferenceDuration.conferenceEndTiming} type="time" className="w-[20%] text-center outline-3 outline-gray-400  focus:outline-blue-500  rounded-lg p-2  "/>
        </div>   
     <div className="flex justify-center">
          <input type="number" className="w-[40%] text-center outline-3 outline-gray-400  focus:outline-blue-500  rounded-lg p-2" onChange={(e)=>{handleConferenceDate(e)}} value={conferenceData.noOfBrandStallInstallInConference} name='noOfBrandStallInstallInConference' placeholder="Enter No. Brand stalls in conference" />
        </div>   
        <div className="flex justify-center">
          <input type="number" className="w-[40%] text-center outline-3 outline-gray-400  focus:outline-blue-500  rounded-lg p-2"  onChange={(e)=>{handleConferenceDate(e)}} value={conferenceData.noOfStageInConference} name="noOfStageInConference" placeholder="Enter No. Stages in conference" />
        </div>   
        <div className="flex justify-center">
          <input type="number" className="w-[40%] text-center outline-3 outline-gray-400  focus:outline-blue-500  rounded-lg p-2"  onChange={(e)=>{handleConferenceDate(e)}} value={conferenceData.noOfConferenceStaffManagementRequire} name="noOfConferenceStaffManagementRequire" placeholder="Enter number of staff required" />
        </div>
        {Error.Error1.check&&<p className='w-[100%] text-center text-red-400'>{Error.Error1.err}</p>}

        <div className="flex justify-center">
          <input type='button' onClick={()=>ConferenceCreate()} className="bg-blue-600 text-white px-6 py-3 rounded-[10px] hover:bg-blue-500 transition" value="Create Conference"/>
        </div>   
        </div>
        </div>
  )
}
