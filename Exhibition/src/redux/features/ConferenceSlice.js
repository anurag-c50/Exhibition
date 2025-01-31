import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { createConference } from "../../apiRouter";
import { fetchExhibitionConference } from "../../apiRouter";
import axios from "axios";

export const FetchExhibitionConference=createAsyncThunk("FetchExhibitionConference",async(exhibitionId)=>{
    try{
    const data = await axios.post(fetchExhibitionConference,{
        exhibitionId:exhibitionId,
        })
    return data.data
    }catch(err){
        console.log(err)
    }
})
export const FetchConferenceInfoForDate=createAsyncThunk("FetchConferenceInfoForDate",async(conferenceDuration)=>{
    try{
        const data = await axios.post(fetchExhibitionConference,{
            exhibitionId:exhibitionId,
            })
        return data.data
        }catch(err){
            console.log(err)
        }
})
export const AdminCreatedConference=createAsyncThunk("CreateConference",async(conferenceData)=>{
    try{
    const data = await axios.post(createConference,{
        exhibitionId:conferenceData.exhibitionId,
        conferenceNo:conferenceData.conferenceNo,
        conferenceDate:conferenceData.conferenceDate,
        conferenceDuration:conferenceData.conferenceDuration,
        noOfBrandStallInstallInConference:conferenceData.noOfBrandStallInstallInConference,
        noOfStageInConference:conferenceData.noOfStageInConference,
        noOfConferenceStaffManagementRequire:conferenceData.noOfConferenceStaffManagementRequire,
    })
    console.log(data.data)
    return data.data
    }catch(err){
        console.log(err)
    }
})
export const conferenceInfo=createSlice({
    name:"conferenceInfo",
    initialState:{
        createdconferenceData:null,
        exhibitionAllCOnferenceInfo:null,
        conferenceInfoForDate:null

    },
    extraReducers:(builder)=>{
        builder.addCase(AdminCreatedConference.fulfilled,(state,action)=>{
            state.createdconferenceData=action.payload
        })
        builder.addCase(FetchExhibitionConference.fulfilled,(state,action)=>{
            state.exhibitionAllCOnferenceInfo=action.payload
        })
        builder.addCase(FetchConferenceInfoForDate.fulfilled,(state,action)=>{
            state.conferenceInfoForDate=action.payload
        })
    }
})
export default conferenceInfo.reducer