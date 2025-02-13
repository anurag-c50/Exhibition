import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import { brandRegisterInExhibition } from '../redux/features/BrandSlice'
export default function BrandAddStaffNo({selectConferenceId}) {
    const [dataInput,setDataInput]=useState({
        conferenceId:selectConferenceId,
        productSatffManegmentStaff:null,
        productSatffShellStaff:null
    })
     const [Error,setError]=useState({
            Error1:{err:"",check:false},
          })
          const BrandValidation = () => {
               if (dataInput.productSatffManegmentStaff===null) {
                return true
              } 
              if (dataInput.productSatffShellStaff===null) {
                return true
              } 
            return false
          }
    const hanldeChangeData=(e)=>{
      setError({...Error,Error1:{check:false,err:"Empty Field"}})
        setDataInput({...dataInput,[e.target.name]:e.target.value})
    }
    const dispatch=useDispatch()
    const registerInConference=()=>{
      if(BrandValidation()){
        setError({...Error,Error1:{check:true,err:"Empty Field"}})
        return
      }
        dispatch(brandRegisterInExhibition(dataInput))
      }
  return (
    <div className="w-full flex justify-center py-6 flex-col items-center bg-gray-50 rounded-lg shadow-xl">
  
    <div className="w-full max-w-4xl space-y-6">
      <div className="w-full flex flex-col items-center flex-wrap justify-center gap-6">
      <label htmlFor="isOffer" className="font-medium text-lg">Enter Requirement Staff For Porduct:</label>
      <div className=" w-[100%] flex justify-center">
          <input type="number" className="w-[50%] text-center outline-3 outline-gray-400  focus:outline-blue-500  rounded-lg p-2" onChange={(e)=>{hanldeChangeData(e)}} value={dataInput?.productSatffManegmentStaff} name='productSatffManegmentStaff' placeholder="Enter No. OF Staff Management Requirement" />
        </div>   
        <div className=" w-[100%] f flex justify-center">
          <input type="number" className="w-[50%] text-center outline-3 outline-gray-400  focus:outline-blue-500  rounded-lg p-2"  onChange={(e)=>{hanldeChangeData(e)}} value={dataInput?.productSatffShellStaff} name="productSatffShellStaff" placeholder="Enter No. OF Staff Shell Requirement" />
        </div>   
        {Error.Error1.check&&<p className='w-[100%] text-center text-red-400'>{Error.Error1.err}</p>}

      <div className='m-2 w-[100%] flex justify-around'>
      <input type='button' className='w-[35%] hover:cursor-pointer px-4 py-2 text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300' onClick={() => {registerInConference()}} value="Register Your Brand In Exhibition"/>  
   </div>
      </div>
    </div>
  </div>
  )
}
