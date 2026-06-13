import { useContext } from "react";
import Login from "./pages/Login"
import { ToastContainer } from 'react-toastify'; // Correct import
import 'react-toastify/dist/ReactToastify.css';
import {AdminContext} from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route,Routes } from "react-router-dom";
import Dadshboard from "./pages/Admin/Dadshboard";
import AllApointment from "./pages/Admin/AllApointment";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorList from "./pages/Admin/DoctorList";
import { DoctorContext } from "./context/DoctorContext";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorProfile from "./pages/Doctor/DoctorProfile";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
const App = ()=> {
  const {aToken} =useContext(AdminContext)
  const {dToken} = useContext(DoctorContext)
  // console.log(`this is aToken`,aToken);
  console.log(aToken);
  return  aToken ||dToken ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
              <Route path="/" element={<></>}></Route>
              <Route path="/admin-dashboard" element={<Dadshboard/>}></Route>
              <Route path="/all-appointments"element={<AllApointment />}></Route>
              <Route path="/add-doctor" element={<AddDoctor />}></Route>
              <Route path="/doctor-list" element={ <DoctorList />}></Route>


              <Route path="/doctor-dashboard" element={<DoctorDashboard/>}></Route>
              <Route path="/doctor-appointments"element={<DoctorAppointments />}></Route>
              <Route path="/doctor-profile" element={<DoctorProfile/>}></Route>
              
        </Routes>
      </div>
 
    </div>
  
  ):(
    <>
      <Login />
  <ToastContainer />
  
    </>

  )
}

export default App
