import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets_admin } from '../assets/assets_admin/assets'
import { DoctorContext } from '../context/DoctorContext'

const Sidebar = () => {
    const {aToken} = useContext(AdminContext)
    const {dToken} = useContext(DoctorContext)
  return (
    <div className='min-h-screen bg-white border-r w-16 md:w-72 transition-all duration-300 flex-shrink-0'>
{
    aToken && 
         <ul className='text-[#515151] mt-5 flex flex-col gap-1'>
            <NavLink 
             className={({isActive})=>`flex items-center justify-center md:justify-start gap-3 py-3.5 px-4 md:px-9 cursor-pointer transition-all duration-200 ${isActive ?'bg-[#F2F3FF] border-r-4 border-primary text-primary font-semibold':'hover:bg-gray-50'}`}
            to={'/admin-dashboard'}>
                <img className='w-5 h-5 min-w-[20px]' src={assets_admin.home_icon} alt ="Home icon" />
                <p className='hidden md:block font-medium'>Dashboard</p>
            </NavLink>
            <NavLink 
             className={({isActive})=>`flex items-center justify-center md:justify-start gap-3 py-3.5 px-4 md:px-9 cursor-pointer transition-all duration-200 ${isActive ?'bg-[#F2F3FF] border-r-4 border-primary text-primary font-semibold':'hover:bg-gray-50'}`}
            to={'/all-appointments'}>
                <img className='w-5 h-5 min-w-[20px]' src={assets_admin.appointment_icon} alt ="Home icon" />
                <p className='hidden md:block font-medium'>Appointment</p>
            </NavLink>
            <NavLink 
             className={({isActive})=>`flex items-center justify-center md:justify-start gap-3 py-3.5 px-4 md:px-9 cursor-pointer transition-all duration-200 ${isActive ?'bg-[#F2F3FF] border-r-4 border-primary text-primary font-semibold':'hover:bg-gray-50'}`}
            to={'/add-doctor'}>
                <img className='w-5 h-5 min-w-[20px]' src={assets_admin.add_icon} alt ="Home icon" />
                <p className='hidden md:block font-medium'>Add Doctor</p>
            </NavLink>
            <NavLink 
             className={({isActive})=>`flex items-center justify-center md:justify-start gap-3 py-3.5 px-4 md:px-9 cursor-pointer transition-all duration-200 ${isActive ?'bg-[#F2F3FF] border-r-4 border-primary text-primary font-semibold':'hover:bg-gray-50'}`}
            to={'/doctor-list'}>
                <img className='w-5 h-5 min-w-[20px]' src={assets_admin.people_icon} alt ="Home icon" />
                <p className='hidden md:block font-medium'>Doctors List</p>
            </NavLink>
         </ul>
}
{
    dToken && 
         <ul className='text-[#515151] mt-5 flex flex-col gap-1'>
            <NavLink 
             className={({isActive})=>`flex items-center justify-center md:justify-start gap-3 py-3.5 px-4 md:px-9 cursor-pointer transition-all duration-200 ${isActive ?'bg-[#F2F3FF] border-r-4 border-primary text-primary font-semibold':'hover:bg-gray-50'}`}
            to={'/doctor-dashboard'}>
                <img className='w-5 h-5 min-w-[20px]' src={assets_admin.home_icon} alt ="Home icon" />
                <p className='hidden md:block font-medium'>Dashboard</p>
            </NavLink>
            <NavLink 
             className={({isActive})=>`flex items-center justify-center md:justify-start gap-3 py-3.5 px-4 md:px-9 cursor-pointer transition-all duration-200 ${isActive ?'bg-[#F2F3FF] border-r-4 border-primary text-primary font-semibold':'hover:bg-gray-50'}`}
            to={'/doctor-appointments'}>
                <img className='w-5 h-5 min-w-[20px]' src={assets_admin.appointment_icon} alt ="Home icon" />
                <p className='hidden md:block font-medium'>Appointment</p>
            </NavLink>
            <NavLink 
             className={({isActive})=>`flex items-center justify-center md:justify-start gap-3 py-3.5 px-4 md:px-9 cursor-pointer transition-all duration-200 ${isActive ?'bg-[#F2F3FF] border-r-4 border-primary text-primary font-semibold':'hover:bg-gray-50'}`}
            to={'/doctor-profile'}>
                <img className='w-5 h-5 min-w-[20px]' src={assets_admin.people_icon} alt ="Home icon" />
                <p className='hidden md:block font-medium'>Profile</p>
            </NavLink>
         </ul>
}
    </div>
  )
}

export default Sidebar