import React,{useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
export default function CreateConference({ExhibitionData}) {
    const Time=new Date()
    let differenceInDays=null
    const [selectConferenceDay,setSelectConferenceDay]=useState("Select Conference Day")
    const ExhibhitionStartTime ={
        Year:Number((ExhibitionData.exhibitionDuration.Start).slice(0,4)),
        Month:Number((ExhibitionData.exhibitionDuration.Start).slice(5,7)),
        Date:Number((ExhibitionData.exhibitionDuration.Start).slice(8,10))
    }
    const ExhibhitionEndTime ={
        Year:Number((ExhibitionData.exhibitionDuration.End).slice(0,4)),
        Month:Number((ExhibitionData.exhibitionDuration.End).slice(5,7)),
        Day:Number((ExhibitionData.exhibitionDuration.End).slice(8,10))
    }
    useEffect(()=>{
        IsDateValidConference()
    },[])
    const SelectDayConference=(date)=>{
        setSelectConferenceDay(date)
    }
    const IsDateValidConference=()=>{
        let differenceInTime=new Date(ExhibitionData.exhibitionDuration.End) - new Date(ExhibitionData.exhibitionDuration.Start);
        differenceInDays =(Math.round(differenceInTime / (1000 * 60 * 60 * 24)))+1;
        if(Time.toISOString()<ExhibitionData.exhibitionDuration.Start){
              
        }
        }
    return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full md:w-[60%] lg:w-[50%] h-[100%] mx-auto">
              <h2 className="text-3xl text-center font-semibold text-blue-600 mb-6">Create New Conference</h2>
              <div className="space-y-6">
        <div className="flex justify-center">
          <input type="text" className="w-[80%] md:w-[60%] text-center border-[2px] border-gray-300 rounded-lg p-2" placeholder="Enter Conference No" />
        </div>
        <div className="flex justify-center">
        <DropdownButton id="dropdown-basic-button" title={selectConferenceDay}>
        </DropdownButton>    
     </div>
     <div className="flex justify-center">
          <input type="number" className="w-[40%] text-center border-[2px] border-gray-300 rounded-lg p-2" placeholder="Enter No. Brand stalls in conference" />
        </div>   
        <div className="flex justify-center">
          <input type="number" className="w-[40%] text-center border-[2px] border-gray-300 rounded-lg p-2" placeholder="Enter No. Stages in conference" />
        </div>   
        <div className="flex justify-center">
          <input type="number" className="w-[40%] text-center border-[2px] border-gray-300 rounded-lg p-2" placeholder="Enter number of staff required" />
        </div>   
        </div>
        </div>
  )
}
