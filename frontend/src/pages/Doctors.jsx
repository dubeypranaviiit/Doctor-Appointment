import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

function Doctors() {
  const {speciality} =useParams();
  const {doctors}=useContext(AppContext);
  const [filterDoc,setFilterDoc] =useState([]);
  const navigate = useNavigate();
  const [showFilter,srtShowFilter] =useState(false)
  const applyFilter =()=>{
    if(speciality){
      setFilterDoc(doctors.filter(doc=>doc.speciality === speciality))
    }else{
      setFilterDoc(doctors)
    }
  }
  useEffect(()=>{
 applyFilter();
  },[doctors,speciality])
  return (
    <div>
<p className='text-gray-600'>Browse through the doctors specialist.</p>

  <div className='flex flex-col sm:flex-row items-start gap-5 mt-5 '>
     {/* <button>Filters</button> */}
  <div className='flex flex-col gap-4 text-sm text-gray-600'>
    <p onClick={()=>speciality=== 'General physician' ? navigate('/doctors'):navigate('/doctors/General physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer duration-300 ${speciality ==="General physician" ? "bg-indigo-100 text-black": ""}` }>General physician</p>
    <p onClick={()=>speciality=== 'Gynecologist' ? navigate('/doctors'):navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer duration-300 ${speciality ==="Gynecologist" ? "bg-indigo-100 text-black": ""}` }>Gynecologist</p>
    <p onClick={()=>speciality=== 'Dermatologist' ? navigate('/doctors'):navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer duration-300 ${speciality ==="Dermatologist" ? "bg-indigo-100 text-black": ""}` }>Dermatologist</p>
    <p onClick={()=>speciality=== 'Pediatricians' ? navigate('/doctors'):navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer duration-300 ${speciality ==="Pediatricians" ? "bg-indigo-100 text-black": ""}`}>Pediatricians</p>
    <p onClick={()=>speciality=== 'Neurologist' ? navigate('/doctors'):navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer duration-300 ${speciality ==="Neurologist" ? "bg-indigo-100 text-black": ""}` }>Neurologist</p>
    <p onClick={()=>speciality=== 'Gastroenterologist' ? navigate('/doctors'):navigate('/doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer duration-300 ${speciality ==="Gastroenterologist" ? "bg-indigo-100 text-black": ""}` }>Gastroenterologist</p>
  </div>
  <div  className='w-full grid grid-cols-auto gap-4 gap-y-6'>
    {
        filterDoc.map((item,index)=>(
          <div
  onClick={() => navigate(`/appointment/${item._id}`)}
  key={index}
  className="bg-white border border-blue-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300 cursor-pointer"
>
  {/* Image */}
  <div className="relative">
    <img
      className="w-full h-48 object-cover bg-blue-50"
      src={item.image}
      alt="Doctor"
    />

    {/* Availability Badge */}
    <div className={`absolute top-3 left-3 bg-white px-3 py-1 rounded-full shadow text-xs flex items-center gap-2 ${item.available !== false ? 'text-green-600' : 'text-gray-400'}`}>
      <span className={`w-2 h-2 rounded-full ${item.available !== false ? 'bg-green-500' : 'bg-gray-300'}`}></span>
      {item.available !== false ? 'Available' : 'Unavailable'}
    </div>
  </div>

  {/* Info */}
  <div className="p-5">
    <p className="text-gray-900 text-lg font-semibold">
      {item.name}
    </p>

    <p className="text-gray-500 text-sm mt-1">
      {item.speciality}
    </p>

    {/* Button */}
    <button className="mt-4 w-full border border-blue-500 text-blue-600 py-2 rounded-lg text-sm font-medium hover:bg-blue-500 hover:text-white transition-all duration-300">
      Book Appointment
    </button>
  </div>
</div>
      ))
    }
  </div>
  </div>

</div>

  )
}

export default Doctors