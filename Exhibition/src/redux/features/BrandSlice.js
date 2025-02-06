import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { registerBrandInExhibition, fetchExhibitionbasedCategorie, fetchAllBrandExhibition, BrandAddProduct } from "../../apiRouter";
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
export const brandRegisterInExhibition=createAsyncThunk("brandRegisterInExhibition",async(conferenceId)=>{
    try{
    const data = await axios.post(registerBrandInExhibition,{
        conferenceId:conferenceId,
        brandId:JSON.parse(localStorage.getItem("UserData"))?._id
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
      },
    })
export const { setfetchExhibitionForBrand,setbrandAddDataProduct,setBrandRegister } = BrandInfo.actions;
export default BrandInfo.reducer  