import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { loginSubmit, signupSubmit } from '../redux/features/AdminSignupAndLoginSlice';
import { setUserSignupData } from '../redux/features/AdminSignupAndLoginSlice';
export default function LoginAndRegister() {
  const navigate = useNavigate();
  const [showModalRegister,setShowModalRegister]=useState(false)
  const fetchLoginData = useSelector((state) => state?.signupAndLoginReducer?.loginData);
  const fetchSignupData = useSelector((state) => state?.signupAndLoginReducer?.signupData);
  const dispatch = useDispatch();
  const [isLoginAndSinup, setIsLoginAndSinup] = useState('Login');
  const handleLoginSignup = () => {
    isLoginAndSinup === 'Login' ? setIsLoginAndSinup('Signup') : setIsLoginAndSinup('Login');
  };
  const toastOption = {
    position:'bottom-right',
    autoClose:'8000',
    pauseOnHover:true,
    draggable:true,
    theme:'dark'
  }
  const [signupData, setSignupData] = useState({
    userType: '1',
    userName: '',
    userEmail: '',
    userContactNo: null,
    ConfirmPassword:"",
    password: '',
    staffRole:'1',
    brandName:''
    });
const isCloseModal=()=>{
  setShowModalRegister(false)
}
const [Error,setError]=useState({
  Error1:{err:"",check:false},
  Error2:{err:"",check:false},
  Error3:{err:"",check:false},
  Error4:{err:"",check:false},
  Error5:{err:"",check:false},
  Error6:{err:"",check:false},
  Error7:{err:"",check:false},
  Error8:{err:"",check:false}

})
  const [loginData, setLoginData] = useState({
    userEmail: '',
    password: '',
  })
    const signupValidation = (e) => {
      Error.Error7 = { err: '', check: false };
      Error.Error8 = { err: '', check: false };
      let password
      let Confirmpassword
      if(e.target.name==="password"){
      password=e.target.value
      }if(e.target.name==="Confirmpassword"){
        Confirmpassword=e.target.value
      }
      var emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      const currentValue = e.target.value;
      if (e.target.name === "userName") {
         if (currentValue.length === 0) {
          Error.Error1 = { err: '', check: false };
        }
        else if (currentValue.length < 3) {
          Error.Error1 = { err: 'Username should be greater than 3 characters', check: true };
        }
        else if (/\d/.test(currentValue)) {
          Error.Error1 = { err: 'Username should not contain numbers', check: true };
        }
        else{
          Error.Error1 = { err: '', check: false };
        } 
      }
      if (e.target.name === "userEmail" && currentValue && !emailRegex.test(currentValue)) {
        Error.Error2 = { err: 'Invalid Email', check: true };
      }else if(e.target.name === "userEmail" && currentValue && emailRegex.test(currentValue)){
        Error.Error2 = { err: '', check: false };
      }else {
        Error.Error2 = { err: '', check: false };
      }
      if (e.target.name === "brandName") {
        if (currentValue.length < 3) {
          Error.Error3 = { err: 'Brand Name should be greater than 3 characters', check: true };
        }
        else if (/\d/.test(currentValue)) {
          Error.Error3 = { err: 'Username should not contain numbers', check: true };
        }else{
          Error.Error3 = { err: '', check: false };
        } 
      }
      if(e.target.name === "userContactNo"){
        if(currentValue.length === 0){
          Error.Error4 = { err: '', check: false };
        }else if (currentValue.length !== 10) {
        Error.Error4 = { err: 'Contact No must be 10 digits', check: true };
        }
      else if(currentValue.length === 10){
        Error.Error4 = { err: '', check: false };
      }
    }
    
      if (e.target.name === "password") {
        if(currentValue.length ===0){
          Error.Error5 = { err: '', check: false };
        }else if (currentValue.length < 8) {
          Error.Error5 = { err: 'Password should be at least 8 characters', check: true };
        }else{
          Error.Error5 = { err: '', check: false };
        }
      }    
      if (e.target.name === "ConfirmPassword") {
        if(currentValue.length ===0){
          Error.Error6 = { err: '', check: false };
        }else if (currentValue.length < 8) {
          Error.Error6 = { err: 'Confirm Password should be at least 8 characters', check: true };
        }
        else{
          Error.Error6 = { err: '', check: false };
        }
      }  

    }
    const loginEmpty = (e) => {
        if(loginData.userEmail===""){
          return true
        }
        if(loginData.password ===""){
          return true
    }    
      return false
    }
    const signupEmpty = () => {
         if (signupData.userName === "") {
          return true
      }
        if(signupData.userEmail===""){
          return true
      }
        if(signupData.userContactNo === null){
          return true
    }
    if(signupData.userType==="3")
    if(signupData.brandName === ""){
      return true
  } 
        if(signupData.password ===""){
          return true
      }
        if(signupData.ConfirmPassword===""){
          return true
      }
      return false
    }
    const loginValidation = (e) => {
      Error.Error7 = { err: '', check: false };
      Error.Error8 = { err: '', check: false };
      var emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      const currentValue = e.target.value;
      if (e.target.name === "userEmail" && currentValue && !emailRegex.test(currentValue)) {
        Error.Error2 = { err: 'Invalid Email', check: true };
      }else if(e.target.name === "userEmail" && currentValue && emailRegex.test(currentValue)){
        Error.Error2 = { err: '', check: false };
      }else {
        Error.Error2 = { err: '', check: false };
      }
    }
  useEffect(()=>{
    if(fetchSignupData?.msg==="Successfully Signup"){
      if(signupData.userType==='4'){
        setShowModalRegister(true)
      }
      setSignupData({userType: '1',userName:'',userEmail:'',userContactNo: null,password:'',staffRole:'1',brandName:''})
      setIsLoginAndSinup('Login')
      setUserSignupData(null)
    }
  },[fetchSignupData])
  const handleSignupData = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
    signupValidation(e);
    }
    const checkForErrors = () => {
      for (let key in Error) {
        if (Error[key].check === true) {
          return true;
        }
      }
      return false;
    };
  const handleLoginData = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    loginValidation(e)
  }
  const submitLogin = () => {
    if(checkForErrors()){
      setError({...Error,Error7:{check:true,err:"Some Field Incorrect"}})
      return
    }
    if(loginEmpty()){
      setError({...Error,Error8:{err:"Some Field Empty",check:true}})
       return
    }
    dispatch(loginSubmit(loginData));
  }
  useEffect(() => {
    setLoginData({userEmail: '',password: ''})
    if (fetchLoginData?.userdata?.userType==='1') {
      navigate('/admindashbord');
    }
    else if(fetchLoginData?.userdata?.userType==='3'){
      navigate('/branddashbord');
    }
    else if(fetchLoginData?.userdata?.userType==='5'){
      navigate('/attendedashbord');
    }else if(fetchLoginData?.msg){
        toast.error(fetchLoginData?.msg,toastOption)
    }
  }, [fetchLoginData]);
  const submitSignup = () => {
    const { password, ConfirmPassword } = signupData;
    if (password && ConfirmPassword && password !== ConfirmPassword) {
      setError({...Error,Error8:{err:"Password and Confirm Password do not match",check:true}})
      return
    } else {
      Error.Error8={err:"",check:false}
    }
    if(checkForErrors()){
      setError({...Error,Error7:{check:true,err:"Some Field Incorrect"}})
      return
    }
    if(signupEmpty()){
      setError({...Error,Error8:{err:"Some Field Empty",check:true}})
       return
    }
    dispatch(signupSubmit(signupData))
  }

  return (
    <>
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      {isLoginAndSinup === 'Signup' ? (
        <div className="w-[25%] h-auto border-[2px]  border-gray-400 rounded-lg bg-white shadow-lg">
          {signupData.userType==='4'?<h1 className='w-[100%] text-center'>Register As A Staff</h1>:<h1 className='w-[100%] text-center'>Signup</h1>}
          <div className="w-full h-[80%] flex justify-center items-center flex-col gap-6 p-6">
            <div className="w-full">
              <label htmlFor="usertype" className="block text-sm font-semibold">Choose UserType</label>
              <select name="userType" onChange={(e) => handleSignupData(e)} className="outline-3 outline-gray-400  focus:outline-blue-500  w-full p-2 border rounded-md"
              >
                <option value="1">Admin</option>
                <option value="3">Brand</option>
                <option value="4">Staff</option>
                <option value="5">Attendee</option>
              </select>
            </div>
 
            <div className="w-full">
              <input type="text" name="userName"  onChange={(e) => handleSignupData(e)} value={signupData.userName} placeholder="Enter UserName"  className={`w-full p-2 rounded-md outline-3 outline-gray-400 ${Error.Error1.check ? "outline-red-400 focus:outline-red-400" : ""} focus:outline-blue-500`}/>
              {Error.Error1.check&&<p className='text-red-400'>{Error.Error1.err}</p>}
            </div>
            <div className="w-full">
              <input type="email" name="userEmail" onChange={(e) => handleSignupData(e)} value={signupData.userEmail}  placeholder="Enter UserEmail" className={`w-full p-2 rounded-md outline-3 outline-gray-400 ${Error.Error2.check ? "outline-red-400 focus:outline-red-400" : ""} focus:outline-blue-500`}/>
              {Error.Error2.check&&<p className='text-red-400'>{Error.Error2.err}</p>}
            </div>
          
            {signupData.userType==="4"&&(
              <div className="w-full">
                <label htmlFor="staffRole" className=" block text-sm font-semibold">Choose Staff Role:</label>
                 <select name="staffRole" id="staffRole" onChange={(e) => handleSignupData(e)} className="outline-3 outline-gray-400  focus:outline-blue-500  w-full p-2 border rounded-md">
                <option value="1">Exhibition Staff Management</option>
                <option value="2">Conference Staff Management</option>
                <option value="3">Product Staff Organized</option>
                <option value="4">Product Staff Shell</option>
                <option value="5">Speaker</option>
              </select>
            </div>)}
           {signupData.userType==="3"&&(<><div className="w-full">
              <input type="email" name="brandName" onChange={(e) => handleSignupData(e)} value={signupData.brandName} placeholder="Enter Brand Name"  className={`w-full p-2 rounded-md outline-3 outline-gray-400 ${Error.Error3.check ? "outline-red-400 focus:outline-red-400" : ""} focus:outline-blue-500`}/>
              {Error.Error3.check&&<p className='text-red-400'>{Error.Error3.err}</p>}
            </div></>)}
            <div className="w-full">
              <input type="number" name="userContactNo" onChange={(e) => handleSignupData(e)} value={signupData.userContactNo} placeholder="Enter ContactNo" className={`w-full p-2 rounded-md outline-3 outline-gray-400 ${Error.Error4.check ? "outline-red-400 focus:outline-red-400" : ""} focus:outline-blue-500`}/>
              {Error.Error4.check&&<p className='text-red-400'>{Error.Error4.err}</p>}
            </div>
            <div className="w-full">
              <input type="password" name="password" onChange={(e) => handleSignupData(e)} value={signupData.password} placeholder="Enter Password" className={`w-full p-2 rounded-md outline-3 outline-gray-400 ${Error.Error5.check ? "outline-red-400 focus:outline-red-400" : ""} focus:outline-blue-500`} />
              {Error.Error5.check&&<p className='text-red-400'>{Error.Error5.err}</p>}
            </div>
            <div className="w-full">
              <input type="password" name="ConfirmPassword" onChange={(e) => handleSignupData(e)} value={signupData.ConfirmPassword} placeholder="Enter Again Password" className={`w-full p-2 rounded-md outline-3 outline-gray-400 ${Error.Error6.check ? "outline-red-400 focus:outline-red-400" : ""} focus:outline-blue-500`}/>
              {Error.Error6.check&&<p className='text-red-400'>{Error.Error6.err}</p>}
            </div>
            <div className="w-full text-center">
            {Error.Error7.check&&<p className='text-red-400'>{Error.Error7.err}</p>}
            {Error.Error8.check&&<p className='text-red-400'>{Error.Error8.err}</p>}
             {signupData.userType==='4'?<button onClick={()=>submitSignup()} className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition" type="button" >
                Register
              </button>:<button onClick={()=>submitSignup()} className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition" type="button" >
                Signup
              </button>}
            </div>
          </div>
          
       {   signupData.userType!=='4'&&<div className="w-full h-[20%] flex justify-center items-center bg-gray-50 rounded-b-lg">
            <p onClick={handleLoginSignup} className="text-blue-500 hover:underline cursor-pointer" >
              Already have an account? Login Now
            </p>
          </div>}
        </div>
      ) : (
        <div className="w-[400px] h-[80%] border-[2px] border-gray-400 rounded-lg bg-white shadow-lg">
          <div className="w-full h-[80%] flex justify-center items-center flex-col gap-6 p-6">
          <h1>Login</h1>
            <div className="w-full">
              <input type="email" name="userEmail" onChange={(e) => handleLoginData(e)} value={loginData.userEmail} placeholder="Enter UserEmail" className={`w-full p-2 rounded-md outline-3 outline-gray-400 ${Error.Error2.check ? "outline-red-400 focus:outline-red-400" : ""} focus:outline-blue-500`}/>
              {Error.Error2.check&&<p className='text-red-400'>{Error.Error2.err}</p>}
            </div>
            <div className="w-full">
              <input type="password" name="password" onChange={(e) => handleLoginData(e)} value={loginData.password} placeholder='Enter Password' className={`w-full p-2 rounded-md outline-3 outline-gray-400 ${Error.Error5.check ? "outline-red-400 focus:outline-red-400" : ""} focus:outline-blue-500`} />
              {Error.Error5.check&&<p className='text-red-400'>{Error.Error5.err}</p>}
            </div>
            <div className="w-full text-center">
            {Error.Error7.check&&<p className='text-red-400'>{Error.Error7.err}</p>}
            {Error.Error8.check&&<p className='text-red-400'>{Error.Error8.err}</p>}

              <button onClick={submitLogin}className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition" type="button" >
                Login
              </button>
            </div>
          </div>
          <div className="w-full h-[20%] flex justify-center items-center bg-gray-50 rounded-b-lg">
            <p onClick={()=>{handleLoginSignup()}} className="text-blue-500 hover:underline cursor-pointer"> Don't have an account? Signup Now
            </p>
          </div>
        </div>
      )}
    </div>
      <Modal onHide={()=>{isCloseModal()}} size='lg'  show={showModalRegister}>
      <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              Register as Staff
            </Modal.Title>
            </Modal.Header>
        <Modal.Body>
        <div className='w-full p-[10px] flex justify-around  flex-col items-center bg-white rounded-lg shadow-lg'>
        <div className='w-[100]'></div>
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-xl font-semibold">Register as Staff</h2>
        </div>
        <div className="mt-4">
          <h5 className="text-lg font-medium text-gray-800">If You have been assigned a job</h5>
          <p className="mt-2 text-gray-600">An email will be sent to you with more details.</p>
        </div>
    </div>
        </Modal.Body>
        </Modal> 
        <ToastContainer/>
        </>
  );
}
