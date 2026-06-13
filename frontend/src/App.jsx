import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import MyProfile from './pages/MyProfile'
import Login from './pages/Login'
// import Signup from './pages/Signup'
import Contact from './pages/Contact'
import MyAppointement from './pages/MyAppointement'
import Navbar from './components/Navbar'
import About from './pages/About'
import Appointment from './pages/Appointment'
import OnlineCheckup from './pages/OnlineCheckup'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsAndConditions from './pages/TermsAndConditions'
import CancellationRefundPolicy from './pages/CancellationRefundPolicy'
import ReturnRefundPolicy from './pages/ReturnRefundPolicy'
import VideoCall from './pages/VideoCall'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className='mx-4 sm:mx-[10%] relative'> 
    <ToastContainer />
    <Navbar />
<Routes>
  <Route path ='/' element={<Home/>} />
  <Route path ='/doctors' element={<Doctors/>} />
  <Route path ='/doctors/:speciality' element={<Doctors/>} />
  <Route path ='/about' element={<About/>} />
  <Route path ='/MyProfile' element={<MyProfile/>} />
  <Route path ='/contact' element={<Contact/>} />
  <Route path ='/login' element={<Login/>} />
  {/* <Route path ='/signup' element={<Signup/>} /> */}
  <Route path ='/my-appointment' element={<MyAppointement/>} />
  <Route path ='/appointment/:docId' element={<Appointment/>} />
  <Route path ='/online-checkup' element={<OnlineCheckup/>} />
  <Route path ='/privacy-policy' element={<PrivacyPolicy/>} />
  <Route path ='/terms-conditions' element={<TermsAndConditions/>} />
  <Route path ='/cancellation-refund-policy' element={<CancellationRefundPolicy/>} />
  <Route path ='/return-refund-policy' element={<ReturnRefundPolicy/>} />
  <Route path ='/video-call/:appointmentId' element={<VideoCall/>} />
</Routes>
<Footer/>
<Chatbot />
    </div>
  )
}

export default App