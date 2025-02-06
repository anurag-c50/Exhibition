import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { bookTicket, fetchAllUserTicket} from "../../apiRouter";
import axios from "axios";

export const createBookTicket=createAsyncThunk("createBookTicket",async(conferenceId)=>{
    try{
    const data = await axios.post(bookTicket,{
        userId:(JSON.parse(localStorage.getItem("UserData")))._id,
        conferenceId:conferenceId
        })
        if(data.status !==200){
            throw new Error("Server Error")
        }
        if(data.data.status){
    localStorage.setItem("UserData",JSON.stringify(data.data.data))
        }
    return data.data
    }catch(err){
        console.log(err)
    }
})
export const FetchALlTicket=createAsyncThunk("FetchALlTicket",async()=>{
    try{
        console.log((JSON.parse(localStorage.getItem("UserData")))?.userTicket)
    const data = await axios.post(fetchAllUserTicket,{
        userTicket:(JSON.parse(localStorage.getItem("UserData")))?.userTicket,
        })
        if(data.status !==200){
            throw new Error("Server Error")
        }
    return data.data
    }catch(err){
        console.log(err)
    }
})
export const AttendeInfo=createSlice({
    name:"AttendeInfo",
    initialState:{
        BookTicketInfo:null,
        fetchAllTicketData:null,
    },
    extraReducers:(builder)=>{
        builder.addCase(createBookTicket.fulfilled,(state,action)=>{
            state.BookTicketInfo=action.payload
        }),
        builder.addCase(FetchALlTicket.fulfilled,(state,action)=>{
            state.fetchAllTicketData=action.payload
        })
    },
    reducers:{
        setBookTicketInfo: (state, action) => {
            state.BookTicketInfo = action.payload;
          },
        setfetchAllTicketData:(state, action) => {
            state.BookTicketInfo = action.payload;
          }
    }
    })
export const {setBookTicketInfo,setfetchAllTicketData} = AttendeInfo.actions
export default AttendeInfo.reducer