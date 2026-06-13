import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets_admin } from '../../assets/assets_admin/assets'
const Dadshboard = () => {

  const {aToken,dashData,getDashData, setAppointments, getAllAppointments,} = useContext(AdminContext)
  useEffect(()=>{
        getDashData()
  },[aToken])
  return dashData && (
    <div className='m-5'>
      <div className='flex flex-wrap gap-3'> 
             <div className='flex items-center gap-2 bg-white p-4  min-w-52 rounded border-2 border-gray-100  cursor-pointer hover:scale-105 transition-all'>
              <img className ='w-14' src= {assets_admin.doctor_icon} alt="" />
             <div>
             <p className='text-xl font-semibold text-gray-600'>{dashData.doctors}</p>
             <p className='text-gray-400'>Doctors</p>
             </div>
             </div>

             <div  className='flex items-center gap-2 bg-white p-4  min-w-52 rounded border-2 border-gray-100  cursor-pointer hover:scale-105 transition-all'>
              <img className='w-14' src= {assets_admin.appointment_icon} alt="" />
             <div>
             <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
             <p className='text-gray-400'>Appointments</p>
             </div>
             </div>
             <div className='flex items-center gap-2 bg-white p-4  min-w-52 rounded border-2 border-gray-100  cursor-pointer hover:scale-105 transition-all'>
              <img className='w-14' src= {assets_admin.patients_icon} alt="" />
             <div>
             <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
             <p className='text-gray-400'>Patient</p>
             </div>
             </div>
           
      </div>
      <div className='bg-white'>
        <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
                 <img className='' src={assets_admin.list_icon} alt="" />
                 <p className='font-semibold'>Latest Bookings</p>
        </div>
        <div>
           <div className='pt-4 border border-t-0'>
             {/* {
              dashData.lastestAppointments.map((item,index)=>(
       <div key={index}>
        <img src={item.docData.image } alt="" />
        <div>
          <p>{item.docData.name}</p>
           <p> {item.slotDate}</p>

        </div>
        {
            item.cancelled 
            ?<p className='text-red-400 text-xs font-medium'>Cancelled</p>
            : <img onClick={()=>cancelAppointment(item._id)} src={assets_admin.cancel_icon} alt="" />
          }
       </div>
              ))
             } */}
            
      {/* </div>
    );
  })
} */}
{
  dashData.lastestAppointments.map((item, index) => {
    let docName = "Unknown";
    let docImage = "";

    // Extract name and image from docData
    if (item.docData) {
      const nameMatch = item.docData.match(/name: '([^']+)'/);
      docName = nameMatch ? nameMatch[1] : "Unknown";

      const imageMatch = item.docData.match(/image: '([^']+)'/);
      docImage = imageMatch ? imageMatch[1] : "";
    }

    return (
      <div className='flex items-center px-6 gap-3 py-3' key={index}>
        <img className='rounded-full w-10'  src={docImage} alt="" />
        <div className='flex-1 text-sm'>
          <p className='text-gray-800 font-medium'>{docName}</p>
          <p className='text-gray-600'>{item.slotDate}</p>
        </div>
        {item.cancelled ? (
          <p className="text-red-400 text-xs font-medium">Cancelled</p>
        ) : (
          <img
            onClick={() => cancelAppointment(item._id)}
            src={assets_admin.cancel_icon}
            alt=""
          />
        )
        }



      </div>
    );
  })
}

           </div>
        </div>
      </div>
    </div>
  )
}

export default Dadshboard