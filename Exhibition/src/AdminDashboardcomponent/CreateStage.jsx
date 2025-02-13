import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CreateStageData } from '../redux/features/ConferenceSlice';
import { setuserStatgeData } from '../redux/features/ConferenceSlice';
export default function CreateStage({ConferenceInfoAtIndex,ExhibitionInfo,setOpenCreateStage,setOpenConferenceByDate}) {
  const dispatch = useDispatch();
  const [speakerChoiceIndex,setSpeakerChoiceIndex]=useState()
  const speakersData = useSelector((state) => state?.conferenceReducer?.fetchSpeakerData?.data);
  const [stageData,setStatgeData]=useState({
    exhibitionId:ExhibitionInfo?._id,
    conferenceId:ConferenceInfoAtIndex?._id,
    performerSpeaker:speakersData,
    performerDescription:""
  })
const createStatgedata=useSelector((state)=>state?.conferenceReducer?.stageData)
useEffect(()=>{
  console.log(createStatgedata?.status)
  if(createStatgedata?.status){
    dispatch(setuserStatgeData(null))
    setOpenConferenceByDate(false)
    setOpenCreateStage(false)
  }
},[createStatgedata])
  const handleSelectSpreaker=(index)=>{
    setSpeakerChoiceIndex(index)
    setStatgeData({...stageData,performerSpeaker:(speakersData[index])._id})
  }
  const handlechangeperformanceDesciption=(e)=>{
    setStatgeData({...stageData,performerDescription:e.target.value})
  }
  const CreateStage=()=>{
    dispatch(CreateStageData(stageData))
  }
  return (
    <div className="w-full flex justify-center py-6 flex-col items-center bg-gray-50 rounded-lg shadow-xl">
      <div className="w-full max-w-4xl space-y-6">
        <div className="w-full flex flex-col items-center flex-wrap justify-center gap-6">
        <label htmlFor="isOffer" className="font-medium text-lg">Select Speaker For Performance:</label>

          {speakersData && speakersData.map((item,index) => {
            return (
              <div key={index} onClick={()=>{handleSelectSpreaker(index)}} className={`hover:cursor-pointer ${index===speakerChoiceIndex?"bg-gray-300":"bg-white"} border-[2px] w-[100%] md:w-[45%] lg:w-[30%] border-gray-300 rounded-lg  shadow-md p-4 space-y-2`}>
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
          <input onChange={(e)=>{handlechangeperformanceDesciption(e)}} type="text" value={stageData?.performerDescription} className="w-[60%] text-center border-[2px] border-gray-300 rounded-lg p-3 text-gray-700" name="exhibitionName" placeholder="Describe Performance"/>
        </div>
        <div className="flex justify-center">
          <input onClick={()=>{CreateStage()}} type="button" value="Create Stage" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition duration-300 transform hover:scale-105"/>
        </div>
      </div>
    </div>
  );
}
