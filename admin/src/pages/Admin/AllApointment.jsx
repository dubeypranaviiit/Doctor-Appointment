import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets_admin } from '../../assets/assets_admin/assets'
const AllApointment = () => {
  const {aToken,userData,appointments,getAllAppointments,cancelAppointment} = useContext(AdminContext)
  const {calculateAge} = useContext(AppContext)
  const [activeReport, setActiveReport] = React.useState(null)
  useEffect(()=>{
    if(aToken){
      getAllAppointments()
      console.log(`userData`,userData);
     
    }
  },[aToken])
  return (
    <div className='w-full max-w-6xl m-5'>

       <p className='mb-3 text-lg font-medium'>All Appointments</p>
 <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
  <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr]'>
  <p>#</p>
  {/* <p>Name</p> */}
  <p>Patient</p>
  <p>Age</p>
  <p>Date & Time</p>
  <p> Doctor</p>
  <p>Fees</p>
  <p>Action</p>
  </div>
     {
    appointments.map((item,index)=> { 
    let docName = "Unknown";
    let docImage = "";

    // Extract name and image from docData
    if (item.docData) {
      const nameMatch = item.docData.match(/name: '([^']+)'/);
      docName = nameMatch ? nameMatch[1] : "Unknown";

      const imageMatch = item.docData.match(/image: '([^']+)'/);
      docImage = imageMatch ? imageMatch[1] : "";
    }
        let userAge =calculateAge(item.userData.dob)

        
        return(

        <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr]  items-center text-gray-700 py-3 px-6 border-b hover:bg-gray-50 ' key={index}>
      
          <p className='max-sm:hidden'>{index+1}</p>
          <div className='flex items-center gap-2'> 
            <img className='w-[50px] rounded' src={item.userData.image} alt="" />
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
          <p className='max-sm:hidden'>{userAge}</p>
          <p>{item.slotDate},{item.slotTime}</p>
          <div className='flex items-center gap-2'> 
            <img className='w-[30px] rounded bg-gray-200' src={docImage} alt="" />
            <p>{docName}</p>
            
          </div>
          <p>{item.currency}{item.amount}</p>
          {
            item.cancelled 
            ? <div className="flex flex-col items-start gap-1">
                <p className='text-red-500 font-semibold text-xs'>Cancelled</p>
                {item.refundStatus && item.refundStatus !== 'none' && (
                  <span className="text-[9px] bg-indigo-50 border border-indigo-100 text-primary font-bold px-1.5 py-0.5 rounded uppercase">
                    Refund: {item.refundStatus}
                  </span>
                )}
              </div>
            : <img onClick={()=>cancelAppointment(item._id)} src={assets_admin.cancel_icon} className="w-8 cursor-pointer hover:scale-105 transition" alt="" />
          }
          
        </div>
      )

      }
    )
     }
  </div>
      {activeReport && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full border shadow-2xl relative">
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

export default AllApointment