
import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { useSelector,useDispatch } from 'react-redux';
import { IsAuth } from '../redux/features/IsAuthSlice'
import 'bootstrap/dist/css/bootstrap.min.css';
import { setLogoutStatus, UserLogout } from '../redux/features/LogoutSlice';
import { useNavigate } from 'react-router-dom';
import { exhibitionCategories } from '../Data/ExhibitionCategories';
import { createBookTicket, FetchALlTicket } from '../redux/features/AttendeeSlice';
import { FetchExhibitionForBrand } from '../redux/features/BrandSlice';
import { setLoginData } from '../redux/features/AdminSignupAndLoginSlice';
import { setBookTicketInfo,setfetchAllTicketData } from '../redux/features/AttendeeSlice';
import {setfetchExhibitionForBrand} from '../redux/features/BrandSlice'
export default function AttendeDashbord() {
  const navigate = useNavigate()
  const UserData = JSON.parse(localStorage.getItem("UserData"))
  const logoutStatus = useSelector((state) => state?.logoutReducer?.logoutStatus)
  const [qrCode,setQRCode]=useState()
  const [showQrCodeModel,setShowQrCodeModel]=useState(false)
  const dispatch = useDispatch()
  const [userTicekt,setUserTicket]=useState(true)
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
    const [selectExhibitionConferenceData,setSelectExhibitionConferenceData]=useState()
  const [showParticularExhibition,setShowParticularExhibition]=useState(true)
  const fetchAllTicket=useSelector((state)=>state?.AttendeReducer?.fetchAllTicketData)
  const exhibitionDataForCategorie=useSelector((state)=>state?.BrandReducer?.fetchExhibitionForBrand)
  const userBookTicket = useSelector((state)=>state?.AttendeReducer?.BookTicketInfo)
  const [openBookTicket,setopenBookTicket]=useState(false)
  const currentDate=new Date()
  const handleOpenModalBookeTicket=()=>{
    setopenBookTicket(true)
  }
  console.log(fetchAllTicket)
useEffect(() => {
  if (logoutStatus?.status) {
    dispatch(setLoginData(null))
    dispatch(setLogoutStatus(null))
   navigate('/')
 }

    dispatch(IsAuth())  
    const userData = JSON.parse(localStorage.getItem("UserData"));
    if (userData && userData?.userTicket?.length !== 0) {
      dispatch(FetchALlTicket())
      setUserTicket(true)
      setopenBookTicket(false)
      setSelectedItem("")
      dispatch(setfetchExhibitionForBrand(null))
      }else{
        setUserTicket(false)
      }
  }, [logoutStatus,userBookTicket]);
  const filteredData = exhibitionCategories.filter((item) =>
    item?.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // console.log(fetchAllTicket&&exhibitionCategories&&result())
  const Logout = () => {
    dispatch(UserLogout(UserData?.userEmail))
  }
  const fetchAllExhibitonForAttende=()=>{
        dispatch(FetchExhibitionForBrand(selectedItem))
  }
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
    setSelectedItem(null);
  }
  const handleclosedModalBookeTicket=()=>{
    setSelectedItem("")
    dispatch(setfetchExhibitionForBrand(null))
    setShowParticularExhibition(true)
    setopenBookTicket(false)
  }
    const handleSelect = (item) => {
    setSelectedItem(item);
    setSearchQuery("");
  }
  const handleChangeParticularExhibition=(index)=>{
    setSelectExhibitionConferenceData(exhibitionDataForCategorie?.data[index])
    setShowParticularExhibition(false)  
  }
  const BookTicket=(data)=>{
    dispatch(createBookTicket(data._id))
  }
  const ShowQRCode=(data)=>{
    console.log()
    setQRCode(data.filter((item)=>item.userId===(JSON.parse(localStorage.getItem("UserData"))._id)))
    setShowQrCodeModel(true)
  }
  const setCloseQrCodeModel=()=>{
    setShowQrCodeModel(false)
  }
  return (
    <>
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 p-4 text-white">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl">Attendee Dashboard</h1>
          <div className="space-x-4">
            <button  className="hover:bg-blue-500 px-4 py-2 rounded">
              Update Profile
            </button>
            <button onClick={()=>{Logout()}} className="hover:bg-red-500 px-4 py-2 rounded">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-6">
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-3xl font-semibold text-gray-800">Attendee Participation</h2>
    <button onClick={()=>{handleOpenModalBookeTicket()}} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">
           Serach Exhibition
          </button>
  </div> 

  <div className="border-[5px] border-blue-600 rounded-lg overflow-hidden shadow-lg ">
    {!userTicekt?(<div className='flex justify-center text-gray-500'>
      <h1>User Have No Ticket</h1>
    </div>):
     (
      fetchAllTicket && fetchAllTicket?.data.map((item, index1) => {
      return (
        <div key={index1} className="relative m-[7px] bg-white rounded-lg shadow-md hover:shadow-lg h-auto">
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
        
          {item?.conferences.map((conference, index2) => {
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
                  <div className="flex gap-[10px] pb-1 justify-center">
              {currentDate<new Date(conference?.conferenceDuration?.conferenceStartTiming)?<input type='button' onClick={()=>ShowQRCode(conference?.userTicket)} className="w-[11%] bg-blue-600 text-white rounded-[7px] hover:bg-blue-700 hover:cursor-pointer text-center" value="Show Ticket"/>
              :<div className='w-[100%] text-center text-gray-400 text-[20px]'>Ticket Expired</div>}
            </div>
                </div>
              )
            })}
        </div>
    )}))} 
              </div>
              </div>
              </div>
    <Modal onHide={()=>handleclosedModalBookeTicket()} size='lg' show={openBookTicket}>
    <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Book Exhibition Ticket
          </Modal.Title>
          </Modal.Header>
      <Modal.Body>
      {exhibitionDataForCategorie?
      showParticularExhibition?
      (exhibitionDataForCategorie?.msg
        ?<div className="w-full max-w-md mx-auto mt-2">
        <p className='text-[17px] text-gray-500'>{exhibitionDataForCategorie?.msg}</p>
        </div>:
      <div className=' p-[1%] overflow-y-auto rounded-lg overflow-hidden bg-white shadow-lg'>
        {exhibitionDataForCategorie?.data.map((item, index)=>{return(
          <div className='flex m-[7px] border-[2px]  border-gray-400 rounded-lg justify-center items-center flex-col'>
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
                  <div className=' w-[100%] flex justify-center h-[6vh] items-center'>
                    {currentDate<new Date(conference?.conferenceDuration?.conferenceStartTiming)?<input type='button' onClick={()=>{BookTicket(conference)}} className=' w-[20%] h-[78%] rounded hover:bg-blue-500  bg-blue-600 text-[13px] text-[antiquewhite] ' value="Book Ticket"/> 
                     :<div className='w-[100%] text-center text-gray-400 text-[20px]'>Confernece Time Expired</div>}
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
       <button onClick={()=>{fetchAllExhibitonForAttende()}} className='h-[36%] w-[59%] rounded hover:bg-blue-500  bg-blue-600 text-2xl text-[antiquewhite] text-[20px]'>Search Latest Exhibition</button>  
      </div>}
    </div>
    }
      </Modal.Body>
    </Modal>
    <Modal onHide={()=>{setCloseQrCodeModel()}} size='lg'  show={showQrCodeModel}>
    <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            QR Code
          </Modal.Title>
          </Modal.Header>
      <Modal.Body>
      <div className='overflow-y-auto flex justify-center rounded-lg overflow-hidden bg-white shadow-lg'>
          {qrCode&&<img src={qrCode[0]?.ticket} alt="" srcset="" />}
        </div>
      </Modal.Body>
      </Modal> 
           </>
  )
}
