import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { createConference, createStageData, FetchConferenceStaff, FetchSpeakerData, SelectConferenceStaff } from "../../apiRouter";
import { fetchExhibitionConference } from "../../apiRouter";
import axios from "axios";

export const FetchExhibitionConference=createAsyncThunk("FetchExhibitionConference",async(exhibitionId)=>{
    try{
    const data = await axios.post(fetchExhibitionConference,{
        exhibitionId:exhibitionId,
        })
        if(data.status !==200){
            throw new Error("Server Error")
        }
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
            if(data.status !==200){
                throw new Error("Server Error")
            }
        return data.data
        }catch(err){
            console.log(err)
        }
})
export const FetchAllSpeakerStaff=createAsyncThunk("FetchAllSpeakerStaff",async(conferenceId)=>{
    try{
        const data = await axios.post(FetchSpeakerData,{
            staffRole:"5",
            conferenceId:conferenceId
            })
            if(data.status !==200){
                throw new Error("Server Error")
            }
        return data.data
        }catch(err){
            console.log(err)
        }
})
export const CreateStageData=createAsyncThunk("CreateStageData",async(StageData)=>{
    try{
        const data = await axios.post(createStageData,{
            exhibitionId:StageData.exhibitionId,
            conferenceId:StageData.conferenceId,
            performerSpeaker:StageData.performerSpeaker,
            performerDescription:StageData.performerDescription
            })
            if(data.status !==200){
                throw new Error("Server Error")
            }
        return data.data
        }catch(err){
            console.log(err)
        }
})
export const AdminCreatedConference=createAsyncThunk("AdminCreatedConference",async(conferenceData)=>{
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
    if(data.status !==200){
        throw new Error("Server Error")
    }
    return data.data
    }catch(err){
        console.log(err)
    }
})
export const selectCOnferenceStaff = createAsyncThunk("selectCOnferenceStaff",async(data1)=>{
    try{
        console.log(data1)
        const data = await axios.post(SelectConferenceStaff,{
            conferenceId:data1?.conferenceId,
            staffId:data1?.staffId
        })
        if(data.status !==200){
            throw new Error("Server Error")
        }
        return data.data
        }catch(err){
            console.log(err)
        } 
})
export const fetchConferenceStaff = createAsyncThunk("fetchConferenceStaff",async(conferenceId)=>{
    try{
        const data = await axios.post(FetchConferenceStaff,{
            conferenceId:conferenceId,
            staffRole:"2"
        })
        if(data.status !==200){
            throw new Error("Server Error")
        }
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
        conferenceInfoForDate:null,
        fetchSpeakerData:null,
        stageData:null,
        fetchConferenceStaffData:null,
        selectConferenceStaffData:null
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
        builder.addCase(FetchAllSpeakerStaff.fulfilled,(state,action)=>{
            state.fetchSpeakerData=action.payload
        })
        builder.addCase(CreateStageData.fulfilled,(state,action)=>{
            state.stageData=action.payload
        })
        builder.addCase(fetchConferenceStaff.fulfilled,(state,action)=>{
            state.fetchConferenceStaffData=action.payload
        })
        builder.addCase(selectCOnferenceStaff.fulfilled,(state,action)=>{
            state.selectConferenceStaffData=action.payload
        })
    },
    reducers:{
        setConferenceData:(state,action)=>{
            state.createdconferenceData=action.payload
        },
        setuserStatgeData:(state,action)=>{
            state.stageData=action.payload
        },     
        setSelectConferenceStaffData:(state,action)=>{
            state.selectConferenceStaffData=action.payload
        }
    }
})
export const {setConferenceData,setuserStatgeData,setSelectConferenceStaffData}=conferenceInfo.actions
export default conferenceInfo.reducer