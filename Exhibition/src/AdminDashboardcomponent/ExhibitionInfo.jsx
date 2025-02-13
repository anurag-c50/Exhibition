import React, { useEffect,useState } from 'react'
import { FetchExhibitionConference } from '../redux/features/ConferenceSlice'
import { useDispatch,useSelector } from 'react-redux'
import CreateConference from './CreateConference'
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import ConferenceInfo from './ConferenceInfo';
import { fetchExhibitionStaff, FetchStaffData } from '../redux/features/ExhibitionSlice';
import BookExhibitionStaff from './BookExhibitionStaff';
import StaffInfo from './StaffInfo'
import { setSelectConferenceStaffData } from '../redux/features/ConferenceSlice';
export default function ExhibitionInfo({AllAdminExhibition,showAllinfoExhibition,setShowAllinfoExhibition,selectExhibitionIndex}) {
      const [alloweDate,setAllowdDate]=useState()
      const dispatch=useDispatch()
        const selectData = useSelector((state) => state?.exhibitionInfo?.selectConferenceStaffData)
      const [openExhibitionStaffModal,setOpenxhibitionStaffModal]=useState(false)
      const [openStaffInfoModal,setOpenStaffInfoModal]=useState(false)
      const [ConferenceInfoAtDate,setConferenceInfoAtDate]=useState()
      const [createConference,setCreateConference]=useState(false)
      const [openConferenceByDate,setOpenConferenceByDate]=useState(false)
      const createconferenceData=useSelector((state)=>state?.conferenceReducer?.createdconferenceData)    
      const [conferenceCountByDate,setconferenceCountByDate]=useState()
      const currentDate=new Date()
      const createStatgedata=useSelector((state)=>state?.conferenceReducer?.stageData)
    useEffect(()=>{
        IsDateValidConference()        
        dispatch(FetchExhibitionConference(AllAdminExhibition?.adminExhibitons[selectExhibitionIndex]._id))
        if(selectData?.status){
          dispatch(setSelectConferenceStaffData(null))
        }
    },[createconferenceData,createStatgedata,selectData])
    const ConferenceInfoForExhibition=useSelector((state)=>state?.conferenceReducer?.exhibitionAllCOnferenceInfo?.ExhibitonsConference)
   
    const extractDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString();
      };
      const isOpenStaffInfoModal=(satffId)=>{
        dispatch(FetchStaffData(satffId))
        setOpenStaffInfoModal(true)
      }
      const isCloseStaffInfoModal=()=>{
        setOpenStaffInfoModal(false)
      }
    useEffect(()=>{
        if(ConferenceInfoForExhibition){
           let conferenceCount = ConferenceInfoForExhibition.reduce((acc, conference) => {
                const startDate = extractDate(conference.conferenceDuration.conferenceStartTiming);
                if (!acc[startDate]) {
                    acc[startDate] = {
                      count: 0,   
                      ids: []     
                    };
                  }
                  acc[startDate].count += 1;
                  acc[startDate].ids.push(conference._id);
              
                  return acc;
              }, {});
              setconferenceCountByDate(conferenceCount)
        }
    },[ConferenceInfoForExhibition])
    const isOpenExhibitionStaffModal=(id)=>{
      dispatch(fetchExhibitionStaff(id))
      setOpenxhibitionStaffModal(true)
    }
    const isClosedExhibitionStaffModal=()=>{
      setOpenxhibitionStaffModal(false)
    }
    const IsDateValidConference=()=>{
        let Dates=[]
        let End = new Date(AllAdminExhibition?.adminExhibitons[selectExhibitionIndex]?.exhibitionDuration.End);
        let Start = new Date(AllAdminExhibition?.adminExhibitons[selectExhibitionIndex]?.exhibitionDuration.Start);
        while(Start<=End){
            Dates.push(Start.toISOString())
            Start.setDate(Start.getDate()+1)
          }
          setAllowdDate(Dates.map((date)=>new Date(date).toLocaleDateString()))
          }
          const isOpenCrateConferenceModel=()=>{
            setCreateConference(true)
          }
          const isClsoeCrateConferenceModel=()=>{
            setCreateConference(false)
          }
          const closedModal=()=>{
            setShowAllinfoExhibition(!showAllinfoExhibition)
          }
         
          const openModalForConferenceDate=(date)=>{
            let conferenceIdsAtDate=conferenceCountByDate[date]?.ids
            setConferenceInfoAtDate(ConferenceInfoForExhibition.filter(data =>conferenceIdsAtDate.some(id => id === data._id)))
            setOpenConferenceByDate(true)
          }
          const convertToDate = (dateString) => {
            const [month, day, year] = dateString.split('/')
            return new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`)
          };
  return (
   <>
   <div className="bg-gray-100 flex flex-col p-6 items-center rounded-lg shadow-lg w-[100%]">
  <div className="w-full flex justify-between items-center mb-4">
    <div className="flex-1 text-center">
      <h1 className="text-xl font-semibold text-gray-800">{AllAdminExhibition?.adminExhibitons[selectExhibitionIndex]?.exhibitionName}</h1>
    </div>
    <div className="text-xl text-blue-300 hover:text-red-500 cursor-pointer" onClick={closedModal}>X</div>
  </div>
  <div className="h-[20vh] w-[30%] mb-6 rounded-lg overflow-hidden border-4 border-blue-600">
    <img className="w-full h-full object-cover" src={AllAdminExhibition?.adminExhibitons[selectExhibitionIndex]?.exhibitionBannerImg} alt="Exhibition Banner" />
  </div>
  <div className="w-full flex flex-col items-center">
    <div className="w-[90%] md:w-[80%] space-y-6">
      <div>
        <label className="block text-lg font-semibold text-gray-700">Exhibition Address</label>
        <div className="text-center text-gray-600 p-2 border border-gray-300 rounded-lg">{AllAdminExhibition?.adminExhibitons[selectExhibitionIndex]?.exhibitionAddress.address}</div>
      </div>
      <div className="flex justify-center space-x-4">
        <div className="w-[30%] text-center border border-gray-300 rounded-lg p-2">{AllAdminExhibition?.adminExhibitons[selectExhibitionIndex]?.exhibitionAddress.state}</div>
        <div className="w-[30%] text-center border border-gray-300 rounded-lg p-2">{AllAdminExhibition?.adminExhibitons[selectExhibitionIndex]?.exhibitionAddress.city}</div>
        <div className="w-[30%] text-center border border-gray-300 rounded-lg p-2">{AllAdminExhibition?.adminExhibitons[selectExhibitionIndex]?.exhibitionAddress.pincode}</div>
      </div>
      <div>
        <label className="block text-lg font-semibold text-gray-700">Exhibition Staff Requirement</label>
        <div className="text-center text-gray-600 p-2 border border-gray-300 rounded-lg">{AllAdminExhibition?.adminExhibitons[selectExhibitionIndex]?.noOfExhibitionStaffManagementRequire}</div>
      </div>
      <div>
        <label className="block text-lg font-semibold text-gray-700">Exhibition Available Staff Positions</label>
        <div className="text-center text-gray-600 p-2 border border-gray-300 rounded-lg">{AllAdminExhibition?.adminExhibitons[selectExhibitionIndex]?.noOfExhibitionStaffManagementRequire-AllAdminExhibition?.adminExhibitons[selectExhibitionIndex]?.exhibitionStaffManagementId.length}</div>
      </div>
      <div className='w-[100%] flex justify-center gap-1 flex-col items-center'>
  <input type='button' onClick={() => isOpenExhibitionStaffModal(AllAdminExhibition?.adminExhibitons[selectExhibitionIndex]?._id)} className="h-12 w-[30%] text-center hover:cursor-pointer rounded-[10px] bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-colors" value="Book Staff" />
{(AllAdminExhibition?.adminExhibitons[selectExhibitionIndex]?.exhibitionStaffManagementId).length!==0&&<input type='button' onClick={() => isOpenStaffInfoModal(AllAdminExhibition?.adminExhibitons[selectExhibitionIndex]?.exhibitionStaffManagementId)} className="h-12  w-[30%] text-center hover:cursor-pointer rounded-[10px] bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-colors" value="Staff Info" />}
</div>
      <div className="overflow-y-auto h-[40%] space-y-4">
        {alloweDate?.map((item, index) => (
          <div key={index} className="flex justify-between items-center border-2 border-gray-300 rounded-lg p-4 space-x-4">
            <div className="flex-1 text-center">
              <p className="text-gray-600 font-semibold">Exhibition Day</p>
              <div className="text-xl font-semibold text-gray-800">{item}</div>
            </div>
            <div className="flex-1 text-center">
              <p className="text-gray-600 font-semibold">Total Conferences</p>
              <div className="text-xl font-semibold text-gray-800">{conferenceCountByDate?.[item]?.count || 0}</div>
            </div>
            <div className="flex-1 text-center space-x-2">
              {conferenceCountByDate?.[item]?.count&&
              <>
              <input type='button' onClick={() => openModalForConferenceDate(item)} className="h-12 w-32 rounded-lg hover:cursor-pointer bg-green-600 text-white font-semibold hover:bg-green-500 transition-colors" value='Conference Info'/>
              </>} 
            </div>
          </div>
        ))}
      </div>
      <div className='w-[100%] flex justify-center'>
      {alloweDate &&convertToDate(alloweDate[alloweDate.length-1])>currentDate ? 
  <input type="button" onClick={() => isOpenCrateConferenceModel()} className="h-12 w-[30%] text-center hover:cursor-pointer rounded-[10px] bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-colors" value="Create Conference" />:<p className="text-gray-600 font-extrabold text-[20px] text-center">Exhibition Expired</p> }
</div>
    </div>
  </div>
  <Modal show={openConferenceByDate} size='lg'>
    <ConferenceInfo setOpenConferenceByDate={setOpenConferenceByDate} ExhibitionInfo={AllAdminExhibition?.adminExhibitons[selectExhibitionIndex]} ConferenceInfoAtDate={ConferenceInfoAtDate} openConferenceByDate={openConferenceByDate} />
  </Modal>
  <Modal onHide={()=>{isClosedExhibitionStaffModal()}} size='lg'  show={openExhibitionStaffModal}>
    <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Select Exhibition Management Staff
          </Modal.Title>
          </Modal.Header>
      <Modal.Body>
        <BookExhibitionStaff setOpenxhibitionStaffModal={setOpenxhibitionStaffModal} setShowAllinfoExhibition={setShowAllinfoExhibition} exhibitionId={AllAdminExhibition?.adminExhibitons[selectExhibitionIndex]?._id}/>
      </Modal.Body>
      </Modal> 
      <Modal onHide={()=>{isCloseStaffInfoModal()}} size='lg'  show={openStaffInfoModal}>
    <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Staff Information 
          </Modal.Title>
          </Modal.Header>
      <Modal.Body>
        <StaffInfo/>
      </Modal.Body>
      </Modal>
      <Modal onHide={()=>{isClsoeCrateConferenceModel()}} size='lg'  show={createConference}>
    <Modal.Header closeButton>
    <Modal.Title id="example-custom-modal-styling-title">
    <h2 className="text-3xl text-center font-semibold text-blue-600 mb-6">Create New Conference</h2>

          </Modal.Title>
          </Modal.Header>
      <Modal.Body>
      <CreateConference setCreateConference={setCreateConference} createConference={createConference} ExhibitionData={AllAdminExhibition?.adminExhibitons[selectExhibitionIndex]} />
      </Modal.Body>
      </Modal> 
</div>
</>
  )
}
