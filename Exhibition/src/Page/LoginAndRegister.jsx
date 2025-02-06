import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginSubmit, signupSubmit } from '../redux/features/AdminSignupAndLoginSlice';
import { setUserSignupData } from '../redux/features/AdminSignupAndLoginSlice';
export default function LoginAndRegister() {
  const navigate = useNavigate();
  const fetchLoginData = useSelector((state) => state?.signupAndLoginReducer?.loginData);
  const fetchSignupData = useSelector((state) => state?.signupAndLoginReducer?.signupData);
  const dispatch = useDispatch();
  const [isLoginAndSinup, setIsLoginAndSinup] = useState('Login');
  const handleLoginSignup = () => {
    isLoginAndSinup === 'Login' ? setIsLoginAndSinup('Signup') : setIsLoginAndSinup('Login');
  };
  const [signupData, setSignupData] = useState({
    userType: '1',
    userName: '',
    userEmail: '',
    userContactNo: null,
    password: '',
    staffRole:'1',
    brandName:''
    });

  const [loginData, setLoginData] = useState({
    userEmail: '',
    password: '',
  })
  useEffect(()=>{
    console.log(fetchSignupData?.msg)
    if(fetchSignupData?.msg==="Successfully Signup"){
      setSignupData({userType: '1',userName:'',userEmail:'',userContactNo: null,password:'',staffRole:'1',brandName:''})
      setIsLoginAndSinup('Login')
      setUserSignupData(null)
    }
  },[fetchSignupData])
  const handleSignupData = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleLoginData = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const submitLogin = () => {
    dispatch(loginSubmit(loginData));
  };
  useEffect(() => {
    setLoginData({userEmail: '',password: ''})
    if (fetchLoginData?.userdata?.userType==='1') {
      navigate('/admindashbord');
    }
    else if(fetchLoginData?.userdata?.userType==='3'){
      navigate('/branddashbord');
    }
    else if(fetchLoginData?.userdata?.userType==='4'){
      navigate('/staffdashbord');
    }
    else if(fetchLoginData?.userdata?.userType==='5'){
      navigate('/attendedashbord');
    }
  }, [fetchLoginData]);
  const submitSignup = () => {
    dispatch(signupSubmit(signupData))
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      {isLoginAndSinup === 'Signup' ? (
        <div className="w-[25%] h-auto border-[2px]  border-gray-400 rounded-lg bg-white shadow-lg">
          <h1 className='w-[100%] text-center'>Signup</h1>
          <div className="w-full h-[80%] flex justify-center items-center flex-col gap-6 p-6">
            <div className="w-full">
              <label htmlFor="usertype" className="block text-sm font-semibold">Choose UserType</label>
              <select name="userType" onChange={(e) => handleSignupData(e)} className="w-full p-2 border rounded-md"
              >
                <option value="1">Admin</option>
                <option value="2">SubAdmin</option>
                <option value="3">Brand</option>
                <option value="4">Staff</option>
                <option value="5">Attendee</option>
              </select>
            </div>
 
            <div className="w-full">
              <input type="text" name="userName"  onChange={(e) => handleSignupData(e)} value={signupData.userName} placeholder="Enter UserName"  className="w-full p-2 border rounded-md"/>
            </div>
            <div className="w-full">
              <input type="email" name="userEmail" onChange={(e) => handleSignupData(e)} value={signupData.userEmail}  placeholder="Enter UserEmail"  className="w-full p-2 border rounded-md" />
            </div>
          
            {signupData.userType==="4"&&(
              <div className="w-full">
                <label htmlFor="staffRole" className="block text-sm font-semibold">Choose Staff Role:</label>
                 <select name="staffRole" id="staffRole" onChange={(e) => handleSignupData(e)} className="w-full p-2 border rounded-md">
                <option value="1">Exhibition Staff Management</option>
                <option value="2">Conference Staff Management</option>
                <option value="3">Product Staff Organized</option>
                <option value="4">Product Staff Shell</option>
                <option value="5">Speaker</option>
              </select>
            </div>)}
           {signupData.userType==="3"&&(<><div className="w-full">
              <input type="email" name="brandName" onChange={(e) => handleSignupData(e)} value={signupData.brandName} placeholder="Enter Brand Name" className="w-full p-2 border rounded-md"/>
            </div></>)}
            <div className="w-full">
              <input type="text" name="userContactNo" onChange={(e) => handleSignupData(e)} value={signupData.userContactNo} placeholder="Enter ContactNo" className="w-full p-2 border rounded-md" />
            </div>
            <div className="w-full">
              <input type="password" name="password" onChange={(e) => handleSignupData(e)} value={signupData.password} placeholder="Enter Password" className="w-full p-2 border rounded-md" />
            </div>
            <div className="w-full text-center">
              <button onClick={submitSignup} className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition" type="button" >
                Signup
              </button>
            </div>
          </div>
          
          <div className="w-full h-[20%] flex justify-center items-center bg-gray-50 rounded-b-lg">
            <p onClick={handleLoginSignup} className="text-blue-500 hover:underline cursor-pointer" >
              Already have an account? Login Now
            </p>
          </div>
        </div>
      ) : (
        <div className="w-[400px] h-[80%] border-[2px] border-gray-400 rounded-lg bg-white shadow-lg">
          <div className="w-full h-[80%] flex justify-center items-center flex-col gap-6 p-6">
          <h1>Login</h1>
            <div className="w-full">
              <input type="email" name="userEmail" onChange={(e) => handleLoginData(e)} value={loginData.userEmail} placeholder="Enter UserEmail" className="w-full p-2 border rounded-md"/>
            </div>
            <div className="w-full">
              <input type="password" name="password" onChange={(e) => handleLoginData(e)} value={loginData.password} placeholder="Enter Password" className="w-full p-2 border rounded-md" />
            </div>
            <div className="w-full text-center">
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
  );
}
