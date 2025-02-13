import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { registerBrandInExhibition, fetchExhibitionbasedCategorie, fetchAllBrandExhibition, BrandAddProduct, Fetchproductstaffmanegement, Fetchproductstaffshell, Selectproductstaffshell, Selectproductstaffmanegement, fetchStaffShellInfo, fetchStaffManagementInfo } from "../../apiRouter";
import axios from "axios";
export const FetchExhibitionForBrand=createAsyncThunk("FetchExhibitionForBrand",async(exhibitionCategorie)=>{
    try{
    const data = await axios.post(fetchExhibitionbasedCategorie,{
        exhibitionCategorie:exhibitionCategorie,
        })
        if(data.status !==200){
            throw new Error("Server Error")
        }
    return data.data
    }catch(err){
        console.log(err)
    }
})
export const AddProductInBrand=createAsyncThunk("AddProductInBrand",async(productData)=>{
    try{
    const data = await axios.post(BrandAddProduct,{
        brandId:JSON.parse(localStorage.getItem("UserData"))._id,
        conferenceId:productData.confernceId,
        productName:productData.productName,
        offerInfo:productData.offerInfo,
        productDescription:productData.productDescription,
        productStockQuantity:productData.productStockQuantity,
        productPrice:productData.productPrice
        })
        if(data.status !==200){
            throw new Error("Server Error")
        }
    return data.data
    }catch(err){
        console.log(err)
    }
})
export const fetchAllBrandExhibitionInfo=createAsyncThunk("fetchAllBrandExhibitionInfo",async()=>{
    try{
    const data = await axios.post(fetchAllBrandExhibition,{
        brandId:JSON.parse(localStorage.getItem("UserData"))?._id,
        brandConferenceStallId:JSON.parse(localStorage.getItem("UserData"))?.brandConferenceStallId
        })
        if(data.status !==200){
            throw new Error("Server Error")
        }
    return data.data
    }catch(err){
        console.log(err)
    }
})
export const fetchproductstaffmanegement = createAsyncThunk("fetchproductstaffmanegement",async(conferenceId)=>{
    try{
        const data = await axios.post(Fetchproductstaffmanegement,{
            conferenceId:conferenceId,
            staffRole:"3",
            BrandId:(JSON.parse(localStorage.getItem("UserData"))?._id)
        })
        if(data.status !==200){
            throw new Error("Server Error")
        }
        return data.data
        }catch(err){
            console.log(err)
        } 
})
export const fetchproductstaffshell = createAsyncThunk("fetchproductstaffshell",async(conferenceId)=>{
    try{
        const data = await axios.post(Fetchproductstaffshell,{
            conferenceId:conferenceId,
            staffRole:"4",
            BrandId:(JSON.parse(localStorage.getItem("UserData"))?._id)
        })
        if(data.status !==200){
            throw new Error("Server Error")
        }
        return data.data
        }catch(err){
            console.log(err)
        } 
})
export const selectproductstaffmanegement = createAsyncThunk("selectproductstaffmanegement",async(staffId)=>{
    try{
        console.log(staffId)
        const data = await axios.post(Selectproductstaffmanegement,{
            staffId:staffId,
            BrandId:(JSON.parse(localStorage.getItem("UserData"))?._id)
        })
        if(data.status !==200){
            throw new Error("Server Error")
        }
        return data.data
        }catch(err){
            console.log(err)
        } 
})
export const FetchStaffShellData=createAsyncThunk("FetchStaffShellData",async(StaffId)=>{
    try{
    const data = await axios.post(fetchStaffShellInfo,{
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
export const FetchStaffManagementData=createAsyncThunk("FetchStaffManagementData",async(StaffId)=>{
    try{
    const data = await axios.post(fetchStaffManagementInfo,{
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
export const selectproductstaffshell = createAsyncThunk("selectproductstaffshell",async(staffId)=>{
    try{
        const data = await axios.post(Selectproductstaffshell,{
            staffId:staffId,
            BrandId:(JSON.parse(localStorage.getItem("UserData"))?._id)
        })
        if(data.status !==200){
            throw new Error("Server Error")
        }
        return data.data
        }catch(err){
            console.log(err)
        } 
})
export const brandRegisterInExhibition=createAsyncThunk("brandRegisterInExhibition",async(dataInput)=>{
    try{
    const data = await axios.post(registerBrandInExhibition,{
        conferenceId:dataInput?.conferenceId,
        brandStallInfo:{productSatffManegmentStaff:dataInput?.productSatffManegmentStaff,
            productSatffShellStaff:dataInput?.productSatffShellStaff,
            BrandId:JSON.parse(localStorage.getItem("UserData"))?._id},
        })
        if(data.status !==200){
            throw new Error("Server Error")
        }
    localStorage.setItem("UserData",JSON.stringify(data.data.data))
    return data.data
    }catch(err){
        console.log(err)
    }
})
export const BrandInfo=createSlice({
    name:"BrandInfo",
    initialState:{
        fetchExhibitionForBrand:null,
        brandRegisterInExhibition:null,
        allBrandExhibition:null,
        brandAddDataProduct:null,        
        fetchStaffProductManagementdata:null,
        selectStaffProductManagementdata:null,
        fetchStaffProductShelldata:null,
        selectStaffProductShelldata:null,
        fetchStaffShelldata:null,
        fetchStaffMangementdata:null,
    },
    extraReducers:(builder)=>{
        builder.addCase(FetchExhibitionForBrand.fulfilled,(state,action)=>{
            state.fetchExhibitionForBrand=action.payload
        })
        builder.addCase(brandRegisterInExhibition.fulfilled,(state,action)=>{
            state.brandRegisterInExhibition=action.payload
        })
        builder.addCase(fetchAllBrandExhibitionInfo.fulfilled,(state,action)=>{
            state.allBrandExhibition=action.payload
        })
        builder.addCase(AddProductInBrand.fulfilled,(state,action)=>{
            state.brandAddDataProduct=action.payload
        })
        builder.addCase(fetchproductstaffmanegement.fulfilled,(state,action)=>{
            state.fetchStaffProductManagementdata=action.payload
        })
        builder.addCase(fetchproductstaffshell.fulfilled,(state,action)=>{
            state.fetchStaffProductShelldata=action.payload
        })
        builder.addCase(selectproductstaffmanegement.fulfilled,(state,action)=>{
            state.selectStaffProductManagementdata=action.payload
        })
        builder.addCase(selectproductstaffshell.fulfilled,(state,action)=>{
            state.selectStaffProductShelldata=action.payload
        })
        builder.addCase(FetchStaffManagementData.fulfilled,(state,action)=>{
            state.fetchStaffMangementdata=action.payload
        })
        builder.addCase(FetchStaffShellData.fulfilled,(state,action)=>{
            state.fetchStaffShelldata=action.payload
        })
        
    },
    reducers: {
        setfetchExhibitionForBrand: (state, action) => {
          state.fetchExhibitionForBrand = action.payload;
        },
        setbrandAddDataProduct: (state, action) => {
            state.brandAddDataProduct = action.payload;
          },
          setBrandRegister: (state, action) => {
            state.brandRegisterInExhibition = action.payload;
          },
          setselectStaffProductManagementdata: (state, action) => {
            state.selectStaffProductManagementdata = action.payload;
          },
          setselectStaffProductShelldata: (state, action) => {
            state.selectStaffProductShelldata = action.payload;
          },
      },
    })
export const { setfetchExhibitionForBrand,setbrandAddDataProduct,setBrandRegister,setselectStaffProductManagementdata,setselectStaffProductShelldata } = BrandInfo.actions;
export default BrandInfo.reducer  