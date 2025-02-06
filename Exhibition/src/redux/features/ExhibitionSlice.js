import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { createExhibition,FetchAllAdminExhibition } from "../../apiRouter";
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
        adminExhibition:null
    },
    extraReducers:(builder)=>{
        builder.addCase(CreateExhibition.fulfilled,(state,action)=>{
            state.exhibitionData=action.payload
        })
        builder.addCase(FetchAdminExhibition.fulfilled,(state,action)=>{
            state.adminExhibition=action.payload
        })
    }
})
export default exhibitionInfo.reducer