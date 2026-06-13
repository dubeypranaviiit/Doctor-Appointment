import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets_admin } from '../../assets/assets_admin/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, appointmentComplete, appointmentCancel, backendUrl } = useContext(DoctorContext)
  const { currency, calculateAge } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getDashData()
    }
  }, [dToken])

  const startVideoCall = async (appointmentId) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/video/start-call`, { appointmentId }, { headers: { dToken } })
      if (data.success) {
        toast.success("Video call started successfully!")
        getDashData()
        window.open(`http://localhost:5173/video-call/${appointmentId}?dToken=${dToken}`, '_blank')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return dashData && (
    <div className='m-5 w-full max-w-6xl'>
      <div className='flex flex-wrap gap-4 mb-8'>
        <div className='flex items-center gap-4 bg-white p-6 min-w-[240px] flex-1 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 cursor-pointer'>
          <div className='p-3 rounded-lg bg-indigo-50'>
            <img className='w-10' src={assets_admin.earning_icon} alt="Earnings" />
          </div>
          <div>
            <p className='text-2xl font-bold text-gray-800'>{currency} {dashData.earnings.toLocaleString()}</p>
            <p className='text-sm text-gray-400 font-medium uppercase tracking-wider mt-0.5'>Total Earnings</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-white p-6 min-w-[240px] flex-1 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 cursor-pointer'>
          <div className='p-3 rounded-lg bg-emerald-50'>
            <img className='w-10' src={assets_admin.appointments_icon} alt="Appointments" />
          </div>
          <div>
            <p className='text-2xl font-bold text-gray-800'>{dashData.appointments}</p>
            <p className='text-sm text-gray-400 font-medium uppercase tracking-wider mt-0.5'>Appointments</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-white p-6 min-w-[240px] flex-1 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 cursor-pointer'>
          <div className='p-3 rounded-lg bg-blue-50'>
            <img className='w-10' src={assets_admin.patients_icon} alt="Patients" />
          </div>
          <div>
            <p className='text-2xl font-bold text-gray-800'>{dashData.patients}</p>
            <p className='text-sm text-gray-400 font-medium uppercase tracking-wider mt-0.5'>Total Patients</p>
          </div>
        </div>
      </div>

      <div className='bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden'>
        <div className='flex items-center gap-3 px-6 py-5 border-b border-gray-50 bg-gray-50/50'>
          <img className='w-5' src={assets_admin.list_icon} alt="List" />
          <h2 className='font-semibold text-gray-800 text-base'>Latest Bookings</h2>
        </div>

        <div className='divide-y divide-gray-100'>
          {dashData.latestAppointments.length === 0 ? (
            <div className='flex flex-col items-center justify-center py-12 text-gray-400'>
              <p className='text-base font-medium'>No appointments booked yet</p>
            </div>
          ) : (
            dashData.latestAppointments.map((item, index) => (
              <div className='flex flex-wrap items-center justify-between gap-4 p-6 hover:bg-gray-50/70 transition-all' key={index}>
                <div className='flex items-center gap-4 min-w-[280px]'>
                  <img className='rounded-full w-12 h-12 object-cover border-2 border-indigo-50 shadow-sm' src={item.userData.image} alt={item.userData.name} />
                  <div className='flex flex-col'>
                    <p className='text-gray-800 font-semibold text-sm'>{item.userData.name}</p>
                    <div className='flex items-center gap-2 mt-1.5'>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border ${
                        item.consultationType === 'online'
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                          : 'bg-indigo-50 text-indigo-600 border-indigo-100'
                      }`}>
                        {item.consultationType || 'offline'}
                      </span>
                      <span className='text-xs text-gray-400 font-medium'>
                        Age: {calculateAge(item.userData.dob)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className='text-sm text-gray-600 font-medium min-w-[160px]'>
                  <p className='text-gray-800'>{item.slotDate}</p>
                  <p className='text-xs text-gray-400 mt-0.5'>{item.slotTime}</p>
                </div>

                <div className='text-sm font-semibold text-gray-700 min-w-[100px]'>
                  <p className='text-gray-800'>{currency}{item.amount}</p>
                  <p className='text-[10px] text-gray-400 font-medium uppercase mt-0.5 tracking-wider'>{item.payment ? 'Online Paid' : 'Cash on Visit'}</p>
                </div>

                <div className='flex items-center gap-3 min-w-[160px] justify-end'>
                  {item.cancelled ? (
                    <span className="text-red-500 font-semibold text-xs bg-red-50 px-2.5 py-1 rounded-md border border-red-100">Cancelled</span>
                  ) : item.isCompleted ? (
                    <span className="text-emerald-600 font-semibold text-xs bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">Completed</span>
                  ) : (
                    <div className='flex items-center gap-2'>
                      {item.consultationType === 'online' && (
                        <button
                          onClick={() => {
                            if (!item.payment) {
                              toast.error("Cannot start call. Payment has not been completed.")
                            } else {
                              startVideoCall(item._id)
                            }
                          }}
                          className={`font-bold text-[11px] px-3 py-1.5 rounded-lg shadow-sm transition ${
                            item.payment 
                              ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                          disabled={!item.payment}
                        >
                          {item.payment ? 'Start Call' : 'Payment Pending'}
                        </button>
                      )}
                      
                      <button 
                        onClick={() => appointmentCancel(item._id)}
                        className='p-1.5 hover:bg-red-50 rounded-lg border border-gray-100 hover:border-red-100 transition'
                        title="Cancel Appointment"
                      >
                        <img className='w-5 h-5 cursor-pointer hover:scale-105 transition' src={assets_admin.cancel_icon} alt="Cancel" />
                      </button>

                      <button 
                        onClick={() => appointmentComplete(item._id)}
                        className='p-1.5 hover:bg-emerald-50 rounded-lg border border-gray-100 hover:border-emerald-100 transition'
                        title="Complete Appointment"
                      >
                        <img className='w-5 h-5 cursor-pointer hover:scale-105 transition' src={assets_admin.tick_icon} alt="Complete" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard