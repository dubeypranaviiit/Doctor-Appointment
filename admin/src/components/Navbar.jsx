import React, { useContext } from 'react'
import { assets_admin } from '../assets/assets_admin/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
    const {aToken,setAToken} = useContext(AdminContext);
    const navigate =useNavigate()
  const logout = async ()=>{
    navigate("/")
   aToken && setAToken('')
   aToken && localStorage.removeItem('aToken')
  }
  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
            <div className='flex items-center gap-3 text-xs'>
                <h1 onClick={()=>navigate('/')} className='text-2xl font-extrabold cursor-pointer text-gray-900 tracking-tight flex items-center gap-1.5'>Swasthya<span className='text-primary'>Sewa</span></h1>
                <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600 '>{aToken ?'Admin' :'Doctor'}</p>
            </div>

          <button className='bg-primary text-white text-sm px-10 py-2 rounded-full ' onClick={logout}>Logout</button>  


    </div>
  )
}

export default Navbar