import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets_admin } from '../../assets/assets_admin/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const DoctorAppointments = () => {
const {dToken,appointments,getAppointments,appointmentCancel,appointmentComplete,backendUrl} = useContext(DoctorContext)
const {calculateAge,currency} = useContext(AppContext)
const [activeReport, setActiveReport] = React.useState(null)

  const startVideoCall = async (appointmentId) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/video/start-call`, { appointmentId }, { headers: { dToken } })
      if (data.success) {
        toast.success("Video call started successfully!")
        getAppointments()
        window.open(`http://localhost:5173/video-call/${appointmentId}?dToken=${dToken}`, '_blank')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }


  const endVideoCall = async (appointmentId) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/video/end-call`, { appointmentId }, { headers: { dToken } })
      if (data.success) {
        toast.success("Video call ended.")
        getAppointments()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
     getAppointments()
  },[dToken])
  return (
    <div className='w-full max-w-6xl m-5'>
             <p className='mb-3 text-lg font-medium'>All Appointments</p>
             <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll'>
              <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b '>
                <p>#</p>
                <p>patient</p>
                <p>Payment</p>
                <p> Age</p>
                <p>Date & Time</p>
                <p>Fees</p>
                <p>Action</p>
              </div>
              {
                appointments.reverse().map((item,index)=>(
                  <div className='flex flex-wrap justify-between max-sm:text-base  sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
                    <p className='max-sm:hidden'>{index+1}</p>
                    <div className='flex items-center gap-2'>
                        <img className='w-[60px] rounded' src={item.userData.image} alt="" />
                        <div className='flex flex-col items-start'>
                          <p className="font-semibold text-gray-800">{item.userData.name}</p>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider mt-0.5 border ${
                            item.consultationType === 'online'
                              ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                              : 'bg-indigo-50 text-primary border-indigo-100'
                          }`}>
                            {item.consultationType || 'offline'}
                          </span>
                          {item.checkupReport && (
                            <button 
                              onClick={() => setActiveReport({ ...item.checkupReport, patientName: item.userData.name })}
                              className='text-[10px] bg-emerald-50 text-emerald-600 border border-emerald-200 px-1.5 py-0.5 rounded-full font-semibold mt-1 hover:bg-emerald-100 transition'
                            >
                              Checkup Report
                            </button>
                          )}
                        </div>
                    </div>
                    <div className='text-xs inline border border-primary px-2 rounded-full'>
                      <p>{item.payment ? 'Online' : 'CASH'}</p>
                    </div>
                               <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
                               <p>{item.slotDate},{item.slotTime}</p>
                             
                               <p>{currency}{item.amount }</p>
                               {
                                 item.cancelled 
                                 ? <p className="text-red-500 font-semibold">Cancelled</p>
                                 :item.isCompleted
                                 ? <p className="text-emerald-500 font-semibold">Completed</p>
                                 : <div className='flex flex-col gap-2'>
                                     <div className="flex gap-1">
                                       <img onClick={()=>appointmentCancel(item._id)}
                                       className='w-8 cursor-pointer hover:scale-105 transition' src={assets_admin.cancel_icon} alt="" />
                                       <img  onClick={()=>appointmentComplete(item._id)} className='w-8 cursor-pointer hover:scale-105 transition' src={assets_admin.tick_icon} alt="" />
                                     </div>
                                     {item.consultationType === 'online' && (
                                       <div className="flex flex-col gap-1 w-full max-w-[100px]">
                                         {item.videoCallStatus === 'active' ? (
                                           <>
                                             <button 
                                               onClick={() => window.open(`http://localhost:5173/video-call/${item._id}?dToken=${dToken}`, '_blank')}
                                               className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded hover:bg-emerald-600 transition shadow"
                                             >
                                               Join Call
                                             </button>
                                             <button 
                                               onClick={() => endVideoCall(item._id)}
                                               className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded hover:bg-red-700 transition"
                                             >
                                               End Call
                                             </button>
                                           </>
                                         ) : item.videoCallStatus === 'ended' ? (
                                           <span className="text-[10px] text-gray-400 font-bold bg-gray-100 px-2 py-1 rounded text-center">
                                             Call Ended
                                           </span>
                                         ) : (
                                            <button 
                                              onClick={() => {
                                                if (!item.payment) {
                                                  toast.error("Cannot start call. Payment has not been completed.")
                                                } else {
                                                  startVideoCall(item._id)
                                                }
                                              }}
                                              className={`text-[10px] font-bold px-2 py-1 rounded transition shadow ${
                                                item.payment 
                                                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                                                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                              }`}
                                              disabled={!item.payment}
                                            >
                                              {item.payment ? 'Start Call' : 'Payment Pending'}
                                            </button>
                                          )}
                                       </div>
                                     )}
                                   </div>
                               }
                  </div>
                ))
              }
             </div>
      {activeReport && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full border shadow-2xl relative text-left">
            <h3 className="text-xl font-bold text-gray-900 border-b pb-3 mb-4">Patient Online Checkup Report</h3>
            <button 
              onClick={() => setActiveReport(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-lg font-bold"
            >
              ✕
            </button>
            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Patient Name</p>
                <p className="text-base font-semibold text-gray-800">{activeReport.patientName}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Calculated Severity</p>
                  <p className={`text-sm font-bold mt-0.5 ${
                    activeReport.severity === 'High' ? 'text-red-500' :
                    activeReport.severity === 'Medium' ? 'text-yellow-500' :
                    'text-green-500'
                  }`}>{activeReport.severity} Risk</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Symptom Duration</p>
                  <p className="text-sm text-gray-800 mt-0.5">{activeReport.duration || 'N/A'}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Reported Symptoms</p>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {activeReport.symptoms?.map((s, i) => (
                    <span key={i} className="px-2.5 py-1 bg-indigo-50 border border-indigo-100 text-primary text-xs font-semibold rounded-full">{s}</span>
                  )) || 'None'}
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Recorded Vitals</p>
                <div className="grid grid-cols-3 gap-2 bg-gray-50 border rounded-xl p-3 text-center text-xs mt-1.5">
                  <div>
                    <p className="text-gray-400">Temp</p>
                    <p className="font-semibold text-gray-700 text-sm mt-0.5">{activeReport.temperature || 'N/A'}°F</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Heart Rate</p>
                    <p className="font-semibold text-gray-700 text-sm mt-0.5">{activeReport.heartRate || 'N/A'} bpm</p>
                  </div>
                  <div>
                    <p className="text-gray-400">BP</p>
                    <p className="font-semibold text-gray-700 text-sm mt-0.5">{activeReport.bloodPressure || 'N/A'}</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Suggested Advice</p>
                <p className="text-xs text-gray-600 bg-gray-50 p-2.5 rounded-lg border mt-1 leading-relaxed">{activeReport.advice}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => setActiveReport(null)}
                className="bg-primary text-white font-bold px-6 py-2 rounded-lg hover:bg-opacity-90 transition text-sm"
              >
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DoctorAppointments