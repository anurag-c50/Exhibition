
import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector,useDispatch } from 'react-redux';
import { IsAuth } from '../redux/features/IsAuthSlice'
import { setAlllogoutStatus, setLogoutStatus, UserLogout } from '../redux/features/LogoutSlice';
import { useNavigate } from 'react-router-dom';
import { exhibitionCategories } from '../Data/ExhibitionCategories';
import { setLoginData } from '../redux/features/AdminSignupAndLoginSlice';
import { AddProductInBrand, brandRegisterInExhibition, fetchAllBrandExhibitionInfo, FetchExhibitionForBrand,setBrandRegister, setbrandAddDataProduct, fetchproductstaffmanegement, fetchproductstaffshell, FetchStaffManagementData, FetchStaffShellData } from '../redux/features/BrandSlice';
import { setfetchExhibitionForBrand } from '../redux/features/BrandSlice';
import ProductInfo from '../BrandDashboard/ProductInfo';
import { setselectStaffProductManagementdata,setselectStaffProductShelldata } from '../redux/features/BrandSlice';
import BrandStaff from '../BrandDashboard/BrandStaff'
import BrandAddStaffNo from '../BrandDashboard/BrandAddStaffNo';
import BrandStaffInfo from '../BrandDashboard/BrandStaffInfo';
import { UserAllLogout } from '../redux/features/LogoutSlice';
export default function BrandDashborad() {
  const navigate = useNavigate()
    const staffManegementData = useSelector((state) => state?.BrandReducer?.selectStaffProductManagementdata);
    const AlllogoutStatus=useSelector((state)=>state?.logoutReducer?.AlllogoutStatus)

    const staffShellData = useSelector((state) => state?.BrandReducer?.selectStaffProductShelldata);  
  const UserData = JSON.parse(localStorage.getItem("UserData"))
  const logoutStatus = useSelector((state) => state?.logoutReducer?.logoutStatus)
  const dispatch = useDispatch()
  const [productData,setProductData]=useState()
  const [showStaffNOtModal,setShowStaffNOtModal]=useState(false)
  const [showProductModal,setShowProductModal]=useState(false)
  const [searchQuery, setSearchQuery] = useState('');
  const [brandData,setBradnData]=useState({
    productName:"",
    confernceId:"",
    offerInfo:{
      isOffer:false,
      offerPercentage:null
    },
    productDescription:"",
    productStockQuantity:"",
    productPrice:""
  })
  const [selectedItem, setSelectedItem] = useState(null);
  const [openAddProductModal,setOpenAddProductModal]=useState(false)
  const [openProductInfoModal,setOpenProductInfoModal]=useState(false)
  const [showParticularExhibition,setShowParticularExhibition]=useState(true)
  const [exhibitionDataForCategorieSecond,setExhibitionDataForCategorieSecond]=useState()
  const exhibitionDataForCategorie=useSelector((state)=>state?.BrandReducer?.fetchExhibitionForBrand)
  const brandExhibitionData=useSelector((state)=>state?.BrandReducer?.allBrandExhibition)
  const BrandRegisterInExhibition=useSelector((state)=>state?.BrandReducer?.brandRegisterInExhibition)
  const addProductData=useSelector((state)=>state?.BrandReducer?.brandAddDataProduct)
  const currentDate=new Date()
  const [selectExhibitionConferenceData,setSelectExhibitionConferenceData]=useState()
  const [selectConferenceId,setSelectConferenceId]=useState()
  const [openStaffInfoModal,setOpenStaffInfoModal]=useState(false)
  const [openBrandRegisterInExhibition,setOpenBrandRegisterInExhibition]=useState(false)
  const handleOpenModalbrandRegister=()=>{
    setOpenBrandRegisterInExhibition(true)
  }
  const isOpenStaffInfoModal=(StaffId)=>{
    const staffId=StaffId.filter((item)=>item?.BrandId===(JSON.parse(localStorage.getItem("UserData")))._id)
    console.log(staffId)
    dispatch(FetchStaffManagementData(staffId[0]?.productSatffManegmentStaffId))
    dispatch(FetchStaffShellData(staffId[0]?.productSatffShellStaffId))
    setOpenStaffInfoModal(true)
        }
        const isCloseStaffInfoModal=()=>{
          setOpenStaffInfoModal(false)
        }
  const isOpenProductModal=(id)=>{
    dispatch(fetchproductstaffmanegement(id))
    dispatch(fetchproductstaffshell(id))
    setShowProductModal(true)
  }
  // useEffect(()=>{
  //   if(exhibitionDataForCategorie?.data){
  //     removeSameCOnference()
  //   }
  // },[exhibitionDataForCategorie])
  const isCloseProductModal=()=>{
    setShowProductModal(false)
  }
  const isOpenStaffNoModal=(id)=>{
    setSelectConferenceId(id)
    setShowStaffNOtModal(true)
  }
  const isCloseStaffNoModal=()=>{
    setShowStaffNOtModal(false)
  }
  const setOffer=()=>{
    setBradnData({...brandData,offerInfo:{ ...brandData.offerInfo,isOffer: !(brandData?.offerInfo?.isOffer)}});
  }
  const handleChangeBrandData=(e)=>{
    if(e.target.name==='offerPercentage'){
      setBradnData({...brandData,offerInfo:{ ...brandData.offerInfo,offerPercentage: e.target.value }});
    }
    else{
    setBradnData({...brandData,[e.target.name]:e.target.value})
    }
  }
  useEffect(() => {
    if (logoutStatus?.status) {
      dispatch(setLoginData(null))
      dispatch(setLogoutStatus(null))
      navigate('/')
    }
     if(AlllogoutStatus?.status){
      dispatch(setLoginData(null))
      dispatch(setAlllogoutStatus(null))
      navigate('/') 
    }
  }, [logoutStatus,AlllogoutStatus])
  // const result=reduce((acc, exhibition)=>{
    
  // }, [])
  const addProduct=()=>{
    dispatch(AddProductInBrand(brandData))
  }
  const handleOpenModalAddProduct=(confernceId)=>{
    setBradnData({...brandData,confernceId:confernceId})
    setOpenAddProductModal(true)
  }
  const handleCosedModalAddProduct=()=>{
    setOpenAddProductModal(false)
  }
  const handleOpenModalProductInfo=(product)=>{
    setProductData(product)
    setOpenProductInfoModal(true)
  }
  const handleCosedModalProductInfo=()=>{
      setOpenProductInfoModal(false)
  }
  useEffect(() => {
    dispatch(IsAuth())
    dispatch(fetchAllBrandExhibitionInfo())
    if(addProductData){
      setBradnData({productName:"",offerInfo:{isOffer:false,offerPercentage:null},productDescription:"",productStockQuantity:"",productPrice:""})
      setOpenAddProductModal(false)
      setbrandAddDataProduct(null)
    }
    if(BrandRegisterInExhibition?.status){
      setOpenBrandRegisterInExhibition(false)
      setBrandRegister(null)
      setShowStaffNOtModal(false)
      setSelectedItem("")
      dispatch(setfetchExhibitionForBrand(null))
      setShowParticularExhibition(true)
      setSelectExhibitionConferenceData()
    }
    if(staffManegementData?.status){
      dispatch(setselectStaffProductManagementdata(null))
    }  if(staffShellData?.status){
      dispatch(setselectStaffProductShelldata(null))
    }
  }, [addProductData,BrandRegisterInExhibition,staffManegementData,staffShellData]);
  const filteredData = exhibitionCategories.filter((item) =>
    item?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const Logout = () => {
    dispatch(UserLogout(UserData?.userEmail))
  }
  const fetchAllExhibitonForBrand=()=>{
    dispatch(FetchExhibitionForBrand(selectedItem))
  }
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
    setSelectedItem(null);
  };
  const handleclosedModalbrandRegister=()=>{
    dispatch(setfetchExhibitionForBrand(null))
    setSelectedItem("")
    setShowParticularExhibition(true)
    setOpenBrandRegisterInExhibition(false)
  }
    const handleSelect = (item) => {
    setSelectedItem(item);
    setSearchQuery("");
  }
 console.log(brandExhibitionData,exhibitionDataForCategorie)

  
 const removeSameCOnference = () => {
  const updatedExhibitionData = exhibitionDataForCategorie?.data.map(item1 => {
    const filteredConferences = item1.conferences.filter(conference1 =>
      !brandExhibitionData?.groupedExhibitions.some(item2 =>
        item2?.conferencesWithProducts.some(conference2 =>
          conference2?.conference._id === conference1._id
        )
      )
    );

    return { ...item1, conferences: filteredConferences };
  }).filter(item => item.conferences.length > 0);

  setExhibitionDataForCategorieSecond(updatedExhibitionData);
};
useEffect(()=>{
 if(exhibitionDataForCategorie){
  removeSameCOnference()
 }
},[exhibitionDataForCategorie])
  console.log(exhibitionDataForCategorieSecond)

  const handleChangeParticularExhibition=(index)=>{
    setSelectExhibitionConferenceData(exhibitionDataForCategorieSecond[index])
    setShowParticularExhibition(false)
  }
    const AllLogout=()=>{
      dispatch(UserAllLogout())
    }
  return (
    <>
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 p-4 text-white">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl">{UserData?.brandName} Dashboard</h1>
          <div className="space-x-4">
          <input  type="button" onClick={()=>{Logout()}} value="Logout " className="hover:bg-red-500 px-4 py-2 rounded"/> 
            <input  type="button" onClick={()=>{AllLogout()}} value="Logout From All devices" className="hover:bg-red-500 px-4 py-2 rounded"/> 

          </div>
        </div>
      </nav>
      <div className="container mx-auto p-6">
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-3xl font-semibold text-gray-800">Brand Participation</h2>
    <button onClick={()=>{handleOpenModalbrandRegister()}} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">
           Register Your Brand
          </button>
  </div> 
  <div className="border-[5px] border-blue-600 rounded-lg overflow-hidden shadow-lg ">
    { brandExhibitionData?.groupedExhibitions.length!==0?
    brandExhibitionData && brandExhibitionData?.groupedExhibitions.map((item, index1) => {
      return (
        <div key={index1} className="relative m-[7px] bg-white rounded-lg shadow-md hover:shadow-lg  h-auto">
          <div className="relative h-[13vh]">
            <img className="w-full h-[100%] object-cover rounded-t-lg opacity-70" src={item?.exhibition?.exhibitionBannerImg} alt="Exhibition" />
            <div className="absolute top-4 left-4 right-4 text-center text-white font-extrabold text-xl bg-black bg-opacity-60 px-4 py-2 rounded-md">
              {item?.exhibition?.exhibitionName}
            </div>
          </div>
          <div className="">
            <div className="flex justify-around mt-[4px] text-sm text-gray-700">
              <div className='flex'>
                <p className="m-0 font-semibold">Start Date:</p>
                <p className='m-0'>{new Date(item?.exhibition?.exhibitionDuration?.Start).toLocaleDateString()}</p>
              </div>
              <div className='flex'>
                <p className="m-0 font-semibold">End Date:</p>
                <p className='m-0'>{new Date(item?.exhibition?.exhibitionDuration?.End).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex justify-center">
              <p className="m-0 font-semibold">Exhibition Address:</p>
              <p className='m-0'>{item?.exhibition?.exhibitionAddress?.address}, {item?.exhibition?.exhibitionAddress?.city}, {item?.exhibition?.exhibitionAddress?.state}, {item?.exhibition?.exhibitionAddress?.pincode}</p>
            </div>
          </div>
          {item?.conferencesWithProducts[0]?.products ? item?.conferencesWithProducts.map((conference, index2) => {
              return (
                <div key={index2} className="">
                  <div className="text-sm mt-[4px] flex justify-around text-gray-700">
                    <div className="flex">
                      <p className="m-0 font-semibold">Conference Room No.</p>
                      <p  className="m-0">{conference?.conference?.conferenceNo}</p>
                    </div>
                    <div className="flex ">
                      <p className="m-0 font-semibold">Conference Date:</p>
                      <p  className="m-0">{new Date(conference?.conference?.conferenceDuration?.conferenceStartTiming).toLocaleDateString()}</p>
                    </div>
                    <div className="flex">
                      <p className="m-0 font-semibold">Start Time:</p>
                      <p className='m-0'>{new Date(conference?.conference?.conferenceDuration?.conferenceStartTiming).toLocaleTimeString()}</p>
                    </div>
                    <div className="flex">
                      <p className="m-0 font-semibold">End Time:</p>
                      <p  className="m-0">{new Date(conference?.conference?.conferenceDuration?.conferenceEndTiming).toLocaleTimeString()}</p>
                    </div>
                  </div>
                  <div className='flex justify-around'>
                  {conference?.conference?.brandStallInfo.map((item,index)=>{
                    if(item?.BrandId===(JSON.parse(localStorage.getItem("UserData"))?._id)){
                    return(<><div className="flex">
                    
                      <p className="m-0 font-semibold">Product Staff Management Positions:</p>
                      <p  className="m-0">{item?.productSatffManegmentStaff}</p>
                    </div>
                    <div className="flex">
                      <p className="m-0 font-semibold">Product Available Staff Management Positions:</p>
                      <p  className="m-0">{item?.productSatffManegmentStaff-item?.productSatffManegmentStaffId.length}</p>
                    </div>
                    <div className="flex">
                      <p className="m-0 font-semibold">Product Staff Shell Positions:</p>
                      <p  className="m-0">{item?.productSatffShellStaff}</p>
                    </div>
                    <div className="flex">
                      <p className="m-0 font-semibold">Product Available Staff Shell Positions:</p>
                      <p  className="m-0">{item?.productSatffShellStaff-item?.productSatffShellStaffId.length}</p>
                    </div></>)}})}
                    </div>
                  <div className="flex gap-[10px] justify-center">
                  {currentDate < new Date(conference?.conference?.conferenceDuration?.conferenceEndTiming) ? (<>
                  <input type="button" onClick={() => handleOpenModalAddProduct(conference?.conference?._id)} 
                  className="w-[11%] bg-blue-600 text-white rounded-[7px] hover:bg-blue-700 hover:cursor-pointer text-center" value="Add Product"/>
                  {conference?.products?.length > 0 && (
                    <input type="button" onClick={() => handleOpenModalProductInfo(conference?.products)} className="w-[11%] bg-blue-600 text-white rounded-[7px] hover:bg-blue-700 hover:cursor-pointer text-center" value="Product Info"/>)}
              <input type='button' onClick={()=>isOpenProductModal(conference?.conference?._id)} className="w-[11%] bg-blue-600 text-white rounded-[7px] hover:bg-blue-700 hover:cursor-pointer text-center" value="Add Staff"/>
                <input type='button' onClick={()=>{isOpenStaffInfoModal(conference?.conference?.brandStallInfo)}} className="w-[11%] bg-blue-600 text-white rounded-[7px] hover:bg-blue-700 hover:cursor-pointer text-center" value="Staff Info"/>        
                    </>):<div className='w-[100%] text-center text-gray-400 text-[20px]'>Conference Expired</div>}

              </div>
                </div>
              )
            }):item?.conferencesWithProducts.map((conference, index2) => {
              return (
                <div key={index2} className="">
                  <div className="text-sm mt-[4px] flex justify-around text-gray-700">
                    <div className="flex">
                      <p className="m-0 font-semibold">Conference Room No.</p>
                      <p  className="m-0">{conference?.conferenceNo}</p>
                    </div>
                    <div className="flex ">
                      <p className="m-0 font-semibold">Conference Date:</p>
                      <p  className="m-0">{new Date(conference?.conferenceDuration?.conferenceStartTiming).toLocaleDateString()}</p>
                    </div>
                    <div className="flex">
                      <p className="m-0 font-semibold">Start Time:</p>
                      <p className='m-0'>{new Date(conference?.conferenceDuration?.conferenceStartTiming).toLocaleTimeString()}</p>
                    </div>
                    <div className="flex">
                      <p className="m-0 font-semibold">End Time:</p>
                      <p  className="m-0">{new Date(conference?.conferenceDuration?.conferenceEndTiming).toLocaleTimeString()}</p>
                    </div>
                  </div>
                  <div className='flex justify-around'>
                  {conference?.brandStallInfo.map((item,index)=>{
                    if(item?.BrandId===(JSON.parse(localStorage.getItem("UserData"))?._id)){
                    return(<><div className="flex">
                    
                      <p className="m-0 font-semibold">Product Staff Management Positions:</p>
                      <p  className="m-0">{item?.productSatffManegmentStaff}</p>
                    </div>
                    <div className="flex">
                      <p className="m-0 font-semibold">Product Available Staff Management Positions:</p>
                      <p  className="m-0">{item?.productSatffManegmentStaff-item?.productSatffManegmentStaffId.length}</p>
                    </div>
                    <div className="flex">
                      <p className="m-0 font-semibold">Product Staff Shell Positions:</p>
                      <p  className="m-0">{item?.productSatffShellStaff}</p>
                    </div>
                    <div className="flex">
                      <p className="m-0 font-semibold">Product Available Staff Shell Positions:</p>
                      <p  className="m-0">{item?.productSatffShellStaff-item?.productSatffShellStaffId.length}</p>
                    </div></>)}})}
                    </div>
                  <div className="flex gap-[10px] justify-center">
                  {currentDate < new Date(conference?.conferenceDuration?.conferenceEndTiming) ?
              <input type='button' onClick={()=>handleOpenModalAddProduct(conference?._id)} className="w-[11%] bg-blue-600 text-white rounded-[7px] hover:bg-blue-700 hover:cursor-pointer text-center" value="Add Product"/>
                    :<div className='w-[100%] text-center text-gray-400 text-[20px]'>Conference Expired</div>
                    }
              <input type='button' onClick={()=>isOpenProductModal(conference?._id)} className="w-[11%] bg-blue-600 text-white rounded-[7px] hover:bg-blue-700 hover:cursor-pointer text-center" value="Add Staff"/>
             {/* {(item?.productSatffShellStaffId.length!==0||item?.productSatffManegmentStaffId.length!==0)&&<input type='button' onClick={()=>{}} className="w-[11%] bg-blue-600 text-white rounded-[7px] hover:bg-blue-700 hover:cursor-pointer text-center" value="Staff Info"/>}             */}
             </div>
            </div>)})}
            
        </div>
      )
    }):<div className='w-[100%]'><h1 className='text-center text-gray-400 text-[20px]'>You have not registered for any exhibitions yet.</h1></div>
    }
  </div>
</div>

    </div>
    <Modal onHide={()=>handleclosedModalbrandRegister()} size='lg' show={openBrandRegisterInExhibition}>
    <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Register Your Brand
          </Modal.Title>
          </Modal.Header>
      <Modal.Body>
      {exhibitionDataForCategorie?
      showParticularExhibition?
      (exhibitionCategories?.msg
        ?<div className="w-full max-w-md mx-auto mt-2">
        <p className='text-[17px] text-gray-500'>{exhibitionDataForCategorie?.msg}</p>
        </div>:
      <div className=' p-[1`%] overflow-y-auto rounded-lg overflow-hidden bg-white shadow-lg'>
        {exhibitionDataForCategorieSecond&&exhibitionDataForCategorieSecond.map((item, index)=>{return(
          <div className='flex border-[2px] m-[5px] border-gray-400 rounded-lg justify-center items-center flex-col'>
            <h3 className='m-0'>{item?.exhibition?.exhibitionName}</h3>
            <div className="flex w-[100%] justify-around text-sm text-gray-700">
              <div className='t'>
                <p className="m-0 font-semibold">Start Date:</p>
                <p className='m-0'>{new Date(item?.exhibition?.exhibitionDuration?.Start).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="m-0 font-semibold">End Date:</p>
                <p className='m-0'>{new Date(item?.exhibition?.exhibitionDuration?.End).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="m-0 font-semibold">Exhibition Address:</p>
              <p className='m-0'>{item?.exhibition?.exhibitionAddress?.address}, {item?.exhibition?.exhibitionAddress?.city}, {item?.exhibition?.exhibitionAddress?.state}, {item?.exhibition?.exhibitionAddress?.pincode}</p>
            </div>
            <div className=' w-[100%] flex justify-center h-[6vh] items-center'>
              <button onClick={()=>handleChangeParticularExhibition(index)} className=' w-[40%] h-[78%] rounded hover:bg-blue-500  bg-blue-600 text-[13px] text-[antiquewhite] '>All Exhibition Info</button>
            </div> 
          </div>
        )})} 
      </div>):
    
      <div className="space-y-6">
      {selectExhibitionConferenceData&&
        <div className="border-gray-400 rounded-lg overflow-hidden bg-white shadow-lg">
          <div className="relative">
            <img className="w-full h-64 object-cover brightness-50" src={selectExhibitionConferenceData?.exhibition?.exhibitionBannerImg} alt={selectExhibitionConferenceData?.exhibition.exhibitionName} />
            <h3 className="absolute inset-0 flex justify-center items-center text-white font-extrabold text-2xl">{selectExhibitionConferenceData?.exhibition?.exhibitionName}</h3>
          </div>

          <div className="p-4 space-y-4">
            <div className="flex justify-between text-sm text-gray-700">
              <div>
                <p className="font-semibold">Start Date:</p>
                <p>{new Date(selectExhibitionConferenceData?.exhibition?.exhibitionDuration?.Start).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="font-semibold">End Date:</p>
                <p>{new Date(selectExhibitionConferenceData?.exhibition?.exhibitionDuration?.End).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-semibold">Exhibition Address:</p>
              <p>{selectExhibitionConferenceData?.exhibition?.exhibitionAddress?.address}, {selectExhibitionConferenceData?.exhibition?.exhibitionAddress?.city}, {selectExhibitionConferenceData?.exhibition?.exhibitionAddress?.state}, {selectExhibitionConferenceData?.exhibition?.exhibitionAddress?.pincode}</p>
            </div>
              <div className="border-t pt-4 space-y-4">
                <h4 className="font-semibold text-lg text-gray-800">Conference Details</h4>
                {selectExhibitionConferenceData?.conferences.map((conference, index) =>{ return(
                  <div key={index} className="flex flex-col justify-center">
                    <div className='flex justify-around'>
                    <div className='flex'>
                      <p className="font-semibold">Conference Room No.</p>
                      <p>{conference?.conferenceNo}</p>
                    </div>
                    <div className='flex'>
                      <p className="font-semibold">Conference Date:</p>
                      <p>{new Date(conference?.conferenceDuration?.conferenceStartTiming).toLocaleDateString()}</p>
                    </div>
                      <div className='flex'>
                        <p className=" font-semibold">Start Time:</p>
                        <p>{new Date(conference?.conferenceDuration?.conferenceStartTiming).toLocaleTimeString()}</p>
                      </div>
                      <div className='flex'>
                        <p className="font-semibold">End Time:</p>
                        <p>{new Date(conference?.conferenceDuration?.conferenceEndTiming).toLocaleTimeString()}</p>
                      </div>
                  </div>
                  <div className='w-[100%] flex justify-center h-[6vh] items-center'>
                    {currentDate<new Date(conference?.conferenceDuration?.conferenceStartTiming)?
                    <input type='button' onClick={()=>{isOpenStaffNoModal(conference?._id)}} className=' w-[10%] h-[78%] rounded hover:bg-blue-500  bg-blue-600 text-[13px] text-[antiquewhite] ' value="Add"/> 
                    :<div className='w-[100%] text-center text-gray-400 text-[20px]'>Registration Time Expired</div>}
                    </div>
                  </div>
                )})}
              </div>
          </div>
        </div>}
    </div>
      :
      <div className="w-full max-w-md mx-auto mt-2">
      <div className={`relative w-full bg-white rounded-full border  border-gray-300 shadow-lg`} >
        <input  type="text"  placeholder={selectedItem ? '' : 'Search...'}  value={selectedItem ? selectedItem.name : searchQuery}   onChange={handleChange} className="w-full px-4 py-2 rounded-full text-lg text-gray-700 focus:outline-none"/>
        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"  onClick={() => {setSearchQuery(''); setSelectedItem(null)  }}>
        ✖
        </button>
      </div>
      {searchQuery && (
        <div className="mt-4 max-h-48 overflow-y-auto bg-white shadow-lg rounded-lg border">
          <ul className="space-y-2">
            {filteredData.map((item, index) => (
              <li key={index} className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleSelect(item)}  >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
      {filteredData.length === 0 && searchQuery && !selectedItem && (
        <p className="mt-2 text-gray-500">No results found</p>
      )}
      {selectedItem&&<div className=' w-[100%] flex justify-center mt-[13px] items-center'>
        <button onClick={()=>{fetchAllExhibitonForBrand()}} className='h-[36%] w-[59%] rounded hover:bg-blue-500  bg-blue-600 text-2xl text-[antiquewhite] text-[20px]'>Search Latest Exhibition</button>  
        </div>}
    </div>
    }
      </Modal.Body>
    </Modal> 
    <Modal onHide={()=>{handleCosedModalAddProduct()}} size='lg'  show={openAddProductModal}>
    <Modal.Header closeButton>

          <Modal.Title id="example-custom-modal-styling-title">
            Add Your Product
          </Modal.Title>
          </Modal.Header>
      <Modal.Body>
        <div className='flex justify-center'>
      <div className=' flex py-1 w-[80%] flex-col gap-[15px] h-auto border-2 border-gray-300 rounded-lg shadow-lg'>
  <div className="flex justify-center">
    <input  type="text" className="w-[60%] text-center border-[2px] border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={(e)=>handleChangeBrandData(e)} value={brandData?.productName} name="productName"  placeholder="Enter Product Name" />
  </div>

  <div className="flex justify-center">
    <input type='text' className="w-[60%] text-center border-[2px] border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={(e)=>handleChangeBrandData(e)} value={brandData?.productDescription} name='productDescription' placeholder="Enter Product Description" />
  </div>

  <div className="flex justify-center">
    <input type="number" className="w-[60%] text-center border-[2px] border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={(e)=>handleChangeBrandData(e)} value={brandData?.productStockQuantity} name="productStockQuantity" placeholder="Enter Product Stock" />
  </div>
  <div className="flex justify-center">
    <input type="number" className="w-[60%] text-center border-[2px] border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"  name="productPrice" onChange={(e)=>handleChangeBrandData(e)} value={brandData?.productPrice} placeholder="Enter Product Price" />
  </div>
  <div className="flex justify-center items-center">
    <label htmlFor="isOffer" className="font-medium text-lg">Product On Offer:</label>
    <input type="checkbox" className="p-2 hover:cursor-pointer h-[3vh] w-[2vw]" onClick={()=>setOffer()} name="isOffer" id='isOffer' />
  </div>
  {brandData?.offerInfo?.isOffer && (
    <div className='flex justify-center'>
      <input type="number" name="offerPercentage" onChange={(e)=>handleChangeBrandData(e)} value={brandData?.offerInfo?.offerPercentage} placeholder='Enter Offer Percentage' className="w-[60%] text-center border-[2px] border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>
  )}
  <div className="flex justify-center">
    <input type="submit" onClick={()=>addProduct()} className="bg-blue-600 text-white text-center px-5 py-2 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" placeholder='Add Product'/>
  </div>
</div>
</div>

      </Modal.Body>
      </Modal> 
      <Modal onHide={()=>{handleCosedModalProductInfo()}} size='lg'  show={openProductInfoModal}>
    <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Product Info
          </Modal.Title>
          </Modal.Header>
      <Modal.Body>
        <ProductInfo ProductData={productData}/>
      </Modal.Body>
      </Modal> 
      <Modal onHide={()=>{isCloseStaffNoModal()}} size='lg'  show={showStaffNOtModal}>
    <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Enter Requirement Staff
          </Modal.Title>
          </Modal.Header>
      <Modal.Body>
        <BrandAddStaffNo selectConferenceId={selectConferenceId}/>
      </Modal.Body>
      </Modal> 
      <Modal onHide={()=>{isCloseProductModal()}} size='lg'  show={showProductModal}>
    <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Staff Selection
          </Modal.Title>
          </Modal.Header>
      <Modal.Body>
        <BrandStaff setShowProductModal={setShowProductModal}/>
      </Modal.Body>
      </Modal> 
      <Modal onHide={()=>{isCloseStaffInfoModal()}} size='lg'  show={openStaffInfoModal}>
    <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Staff Info
          </Modal.Title>
          </Modal.Header>
      <Modal.Body>
        <BrandStaffInfo/>
      </Modal.Body>
      </Modal> 
    </>
  )
}
