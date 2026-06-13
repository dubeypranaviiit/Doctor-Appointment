import React, { useContext, useState } from 'react'
import {assets} from "../assets/assets_frontend/assets"
import {NavLink, useNavigate} from "react-router-dom"
import { AppContext } from '../context/AppContext';
const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu,setShowMenu] =useState(false)
  const {token,setToken,userData}=useContext(AppContext)
   const logout = async ()=>{
       setToken(false)
       localStorage.removeItem('token')
       navigate('/')
   }
  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-200'>
    <h1 onClick={()=>navigate('/')} className='text-3xl font-extrabold cursor-pointer text-gray-900 tracking-tight flex items-center gap-1.5'>Swasthya<span className='text-primary'>Sewa</span></h1> 
    <ul className='hidden md:flex items-start gap-7 font-medium' >
      <NavLink to="/">
        <li className='py-1'>
            HOME
        </li>
        <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
      </NavLink>
      <NavLink to="/doctors">
        <li className='py-1'>
             ALL DOCTORS
        </li>
         <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
      </NavLink>
      <NavLink to="/online-checkup">
        <li className='py-1 text-primary font-semibold'>
             ONLINE CHECKUP
        </li>
         <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
      </NavLink>
      <NavLink to="/about">
        <li className='py-1'>
               ABOUT
        </li>
        <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
      </NavLink>
      <NavLink to="/contact">
        <li className='py-1'>
           CONTACT
        </li>
        <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
      </NavLink>
    </ul>
    <div className='flex items-center gap-4'>
      {
        token && userData
        ?<div className='flex items-center gap-2 cursor-pointer group relative'> 
          <img  className="w-8 rounded-full " src={userData.image} alt="ProfilePic" />
          <img className='w-2.5' src={assets.dropdown_icon} alt="DropDown" />
            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
              <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
               <p onClick={()=> navigate('/MyProfile')}  className='hover:text-black cursor-pointer'>My Profile</p>
               <p onClick={()=> navigate('/my-appointment')}  className='hover:text-black cursor-pointer'> My Appointments</p>
               <p onClick={logout}
                className='hover:text-black cursor-pointer'>Logout</p>
              </div>
            </div>
        </div>
        :<button onClick={()=>navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>Create Account</button>
      }
      <img onClick={()=>setShowMenu(true)} className='w-6 md:hidden cursor-pointer' src={assets.menu_icon} alt="Open Menu" />
      
      <div className={`fixed right-0 top-0 bottom-0 z-30 overflow-hidden bg-white transition-all duration-300 ${showMenu ? 'w-full' : 'w-0'} md:hidden`}>
        <div className='flex items-center justify-between px-6 py-5 border-b border-gray-100'>
          <span className="text-xl font-bold text-gray-900 tracking-tight">Swasthya<span className="text-primary">Sewa</span></span>
          <img className='w-7 cursor-pointer hover:opacity-80 transition' onClick={()=>setShowMenu(false)} src={assets.cross_icon} alt="Close Menu" />
        </div>
        
        <ul className='flex flex-col items-start gap-4 mt-6 px-6 text-base font-semibold text-gray-700'>
          <NavLink onClick={()=>setShowMenu(false)} to='/' className="w-full pb-2 border-b border-gray-50">
            <p className='px-2 py-1 rounded hover:text-primary transition-all'>Home</p>
          </NavLink>
          <NavLink onClick={()=>setShowMenu(false)} to='/doctors' className="w-full pb-2 border-b border-gray-50">
            <p className='px-2 py-1 rounded hover:text-primary transition-all'>ALL DOCTORS</p>
          </NavLink>
          <NavLink onClick={()=>setShowMenu(false)} to='/online-checkup' className="w-full pb-2 border-b border-gray-50">
            <p className='px-2 py-1 rounded text-primary font-bold hover:text-opacity-80 transition-all'>ONLINE CHECKUP</p>
          </NavLink>
          <NavLink onClick={()=>setShowMenu(false)} to='/about' className="w-full pb-2 border-b border-gray-50">
            <p className='px-2 py-1 rounded hover:text-primary transition-all'>ABOUT</p>
          </NavLink>
          <NavLink onClick={()=>setShowMenu(false)} to='/contact' className="w-full pb-2 border-b border-gray-50">
            <p className='px-2 py-1 rounded hover:text-primary transition-all'>CONTACT</p>
          </NavLink>

          {token && (
            <>
              <NavLink onClick={()=>setShowMenu(false)} to='/MyProfile' className="w-full pb-2 border-b border-gray-50">
                <p className='px-2 py-1 rounded hover:text-primary transition-all'>My Profile</p>
              </NavLink>
              <NavLink onClick={()=>setShowMenu(false)} to='/my-appointment' className="w-full pb-2 border-b border-gray-50">
                <p className='px-2 py-1 rounded hover:text-primary transition-all'>My Appointments</p>
              </NavLink>
              <button onClick={() => { setShowMenu(false); logout(); }} className="w-full text-left pb-2 text-red-500 font-bold border-b border-gray-50">
                <p className='px-2 py-1 rounded hover:bg-red-50 transition-all'>Logout</p>
              </button>
            </>
          )}

          {!token && (
            <button onClick={() => { setShowMenu(false); navigate('/login'); }} className="w-full bg-primary text-white py-3 rounded-xl font-bold mt-4 shadow-md shadow-primary/20">
              Create Account
            </button>
          )}
        </ul>
      </div>
</div>
    </div>
  )
}

export default Navbar