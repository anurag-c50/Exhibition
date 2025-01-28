import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import PublicRoute from './middleware/PublicRoue'
import PrivateRoute from './middleware/PrivateRoute'
import LoginAndRegister from './Page/LoginAndRegister';
import AdminDashbord from "./Page/AdminDashbord";
function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<PublicRoute element={<LoginAndRegister />} redirectTo="admindashbord"/>}/>
      <Route path="/admindashbord" element={<PrivateRoute element={<AdminDashbord />} redirectTo="/" />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
