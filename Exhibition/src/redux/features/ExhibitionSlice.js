    import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { createExhibition,FetchAllAdminExhibition, FetchExhibitionStaff, fetchStaffInfo, SelectExhibitionStaff } from "../../apiRouter";
import axios from "axios";

export const FetchAdminExhibition=createAsyncThunk("FetchAdminExhibition",async()=>{
    try{
    const data = await axios.post(FetchAllAdminExhibition,{
        adminId:JSON.parse(localStorage.getItem("UserData"))?._id,
    })
    if(data.status !==200){
        throw new Error("Server Error")
    }
    return data.data
    }catch(err){
        console.log(err)
    }
})
export const FetchStaffData=createAsyncThunk("FetchStaffData",async(StaffId)=>{
    try{
        console.log(StaffId)
    const data = await axios.post(fetchStaffInfo,{
        staffId:StaffId
    })
    if(data.status !==200){
        throw new Error("Server Error")
    }
    return data.data
    }catch(err){
        console.log(err)
    }
})
export const selectExhibitionStaff = createAsyncThunk("selectExhibitionStaff",async(data1)=>{
    try{
        const data = await axios.post(SelectExhibitionStaff,{
            exhibitionId:data1?.exhibitionId,
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
export const fetchExhibitionStaff = createAsyncThunk("fetchExhibitionStaff",async(exhibitionId)=>{
    try{
        const data = await axios.post(FetchExhibitionStaff,{
            exhibitionId:exhibitionId,
            staffRole:"1"
        })
        if(data.status !==200){
            throw new Error("Server Error")
        }
        return data.data
        }catch(err){
            console.log(err)
        } 
})
export const CreateExhibition=createAsyncThunk("CreateExhibition",async(exhibitionData)=>{
    try{
    const data = await axios.post(createExhibition,{
        adminId:exhibitionData.adminId,
        exhibitionName:exhibitionData.exhibitionName,
        exhibitionAddress:exhibitionData.exhibitionAddress,
        exhibitionCategorie:exhibitionData.exhibitionCategorie,
        exhibitionBannerImg:exhibitionData.exhibitionBannerImg,
        exhibitionDuration:exhibitionData.exhibitionDuration,
        noOfExhibitionStaffManagementRequire:exhibitionData.noOfExhibitionStaffManagementRequire
    })
    if(data.status !==200){
        throw new Error("Server Error")
    }
    return data.data
    }catch(err){
        console.log(err)
    }
})
export const exhibitionInfo=createSlice({
    name:"exhibitionInfo",
    initialState:{
        exhibitionData:null,
        adminExhibition:null,
        ExhibitionStaffData:null,
        selectExhibitionStaffData:null,
        fetchStaffInfoData:null
    },
    extraReducers:(builder)=>{
        builder.addCase(CreateExhibition.fulfilled,(state,action)=>{
            state.exhibitionData=action.payload
        })
        builder.addCase(FetchAdminExhibition.fulfilled,(state,action)=>{
            state.adminExhibition=action.payload
        })
        builder.addCase(fetchExhibitionStaff.fulfilled,(state,action)=>{
            state.ExhibitionStaffData=action.payload
        })
        builder.addCase(selectExhibitionStaff.fulfilled,(state,action)=>{
            state.selectExhibitionStaffData=action.payload
        })
        builder.addCase(FetchStaffData.fulfilled,(state,action)=>{
            state.fetchStaffInfoData=action.payload
        })
    },reducers:{
        setSelectExhibitionData:(state, action) => {
            state.selectExhibitionStaffData = action.payload;
          },
    }
})
export const {setSelectExhibitionData}=exhibitionInfo.actions
export default exhibitionInfo.reducer