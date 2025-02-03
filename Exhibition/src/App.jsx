import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import PublicRoute from './middleware/PublicRoue'
import PrivateRoute from './middleware/PrivateRoute'
import LoginAndRegister from './Page/LoginAndRegister';
import AdminDashbord from "./Page/AdminDashbord";
import BrandDashborad from "./Page/BrandDashborad";
import StaffDashborad from "./Page/StaffDashborad";
function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<PublicRoute element={<LoginAndRegister />} redirectTo="/" />} />
    <Route path="/admindashbord" element={<PrivateRoute element={<AdminDashbord />} redirectTo="/" requiredRole="1" />} />
    <Route path="/branddashbord"  element={<PrivateRoute element={<BrandDashborad />} redirectTo="/" requiredRole="3" />} />
    <Route path="/staffdashbord"  element={<PrivateRoute element={<StaffDashborad />} redirectTo="/" requiredRole="4" />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
