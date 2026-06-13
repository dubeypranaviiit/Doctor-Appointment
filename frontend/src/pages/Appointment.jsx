import React, { useState,useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets_frontend/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Stethoscope } from 'lucide-react';
const Appointment = () => {
  const {docId}= useParams();
  const navigate = useNavigate();
  const {doctors,currencySymbol,backendurl,getDoctorsData,token} =useContext(AppContext);
  const [docInfo,setDocInfo]=useState(null)
  // This if for slot of doctor
  const daysOfWeek =['SUN','MON','TUE','WED','THU','FRI','SAT']
  const [docSlots,setDocSlots] =useState([])
  const [slotIndex,setSlotIndex]=useState(0)
  const [slotTime,setSlotTime] =useState('')
  const [checkupHistory, setCheckupHistory] = useState([])
  const [selectedCheckup, setSelectedCheckup] = useState(null)
  const [consultationType, setConsultationType] = useState('offline')

  const fetchCheckupHistory = async () => {
    try {
      const { data } = await axios.get(backendurl + '/api/user/checkups', { headers: { token } })
      if (data.success) {
        setCheckupHistory(data.checkups)
      }
    } catch (error) {
      console.log('Error fetching checkups:', error)
    }
  }

  useEffect(() => {
    if (token) {
      fetchCheckupHistory()
    }
  }, [token])
  const fetchDOcInfo =async ()=>{
    const docInfo = await doctors.find(doc=>doc._id===docId)
       setDocInfo(docInfo)
  }
  const getAvailableSlots =async ()=>{
      setDocSlots([]);
      // getting current date
      const today =new Date();
      for(let i=0;i<7;i++){
        // getting date with index
        let currentDate =new Date(today);
        currentDate.setDate(today.getDate()+i)
        // setting time of date with index
        let endTime = new Date()
        endTime.setDate(today.getDate()+i)
        endTime.setHours(21,0,0,0)
        // setting hours
        if(today.getDate()=== currentDate.getDate()){
          currentDate.setHours(currentDate.getHours()>10? currentDate.getHours()+1:10)
          currentDate.setMinutes(currentDate.getMinutes() >30 ? 30 :0)
        }
        else{
          currentDate.setHours(10);
          currentDate.setMinutes(0)
        }

        let timeSlots =[]
        while(currentDate < endTime){
          let formattedTime =currentDate.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})
           let day= currentDate.getDate()
           let month =currentDate.getMonth()+1 
           let year = currentDate.getFullYear()
           const slotDate = `${day}-${month}-${year}`;
           const slotTime = formattedTime

          //  const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true
          const isSlotAvailable =
          docInfo && 
          docInfo.slots_booked && 
          docInfo.slots_booked[slotDate] && 
          docInfo.slots_booked[slotDate].includes(slotTime) ? false : true;
           if(isSlotAvailable){
            timeSlots.push({
              datetime:new Date(currentDate),
              time:formattedTime
            })
           }
       
       
          // increased current time bby 30 minutes

          currentDate.setMinutes(currentDate.getMinutes()+30)
        }
        setDocSlots(prev=>([...prev,timeSlots]))
      }
  }
 const bookAppointment = async ()=>{
  if(!token){
    toast.warn('Loging to book appointment')
    return navigate('/login')
  }
  try{
    const date =docSlots[slotIndex][0].datetime
    let day = date.getDay()
    let month=date.getMonth()+1
    let year = date.getFullYear()
    const slotDate = `${day}-${month}-${year}`;
    const {data} = await axios.post(backendurl+'/api/user/book-appointment',{
      docId,
      slotDate,
      slotTime,
      checkupReport: selectedCheckup ? JSON.stringify(selectedCheckup) : null,
      consultationType
    },{headers:{token}})
    if(data.success){
      toast.success(data.message)
      toast.success('Appointed')
      getDoctorsData()
      navigate('/my-appointment')
    }else{
      toast.error(data.message)

    }
  }catch(error){
         console.log(error);
         toast.error(error.message)
  }
 }
  useEffect(()=>{
fetchDOcInfo();
  },[doctors,docId])
  useEffect(()=>{
getAvailableSlots();
  },[docInfo])
  useEffect(()=>{
     console.log(docSlots);
  },[docSlots])
  return  docInfo && (
    <div>
    {/* ------doctor details ------ */}
        <div className='flex flex-col sm:flex-row gap-4 '>
          <div>
            <img className="bg-primary w-full sm:max-w-72 rounded-lg " src={docInfo.image} alt="" />
          </div>
          <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0'>
            {/* Doctor information */}
            <p className='flex items-center gap-2 text-2xl font-medium'>{docInfo.name} 
              <img className='w-5' src={assets.verified_icon}
               alt='verified icon'/></p>
               {/* degree dpeciality and experiance */}
               <div className='flex  items-center gap-2 text-sm mt-1 text-gray-600'>
                <p>{docInfo.degree} - {docInfo.speciality}</p>

                <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
               </div>
{/* doctor about */}
<div>
  <p  className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About 
    <img className="w-3"src={assets.info_icon} alt="Information icon" />
  </p>
  <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
</div>
<p className='text-gray-500 font-medium mt-4'>
  Appointment fee:<span>{currencySymbol}{docInfo.fees}</span>

</p>
          </div>
        </div>
        {/* Time slot  */}
        <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
          <p>Booking slots</p>
              <div className='flex gap-3 items-center w-full overflox-x-scroll mt-4 '>
                {
                  docSlots.length && docSlots.map((item,index)=>(
                  <div onClick={()=>setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex===index ?'bg-primary':'border border-gray-200'}`} key ={index}>
                    <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                    <p>{item[0] && item[0].datetime.getDate()}</p>
                  </div>
                  ))
                }
              </div>
              <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
                {
                  docSlots.length && docSlots[slotIndex].map((item,index)=>(
                    <p  onClick={()=>setSlotTime(item.time)}   className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time===slotTime ?'bg-primary text-white ':'text-gray-400 border border-gray-300'}`} key={index}>
                      {
                        item.time.toLowerCase()
                      }
                    </p>
                  ))
                }
              </div>
              {/* Checkup selection */}
              {token && checkupHistory.length > 0 && (
                <div className='my-6 p-4 border border-indigo-100 bg-indigo-50/20 rounded-xl max-w-lg font-normal'>
                  <p className='text-sm font-semibold text-gray-800 mb-2 flex items-center gap-1.5'>
                    <Stethoscope className="w-4 h-4 text-primary" /> Attach Online Checkup Report (Optional)
                  </p>
                  <p className='text-xs text-gray-500 mb-3'>
                    Linking a report helps your doctor review your symptoms and vitals beforehand.
                  </p>
                  <select 
                    className='w-full p-2.5 border rounded-lg text-sm bg-white text-gray-700 outline-none focus:border-primary'
                    onChange={(e) => {
                      const id = e.target.value
                      const report = checkupHistory.find(c => c._id === id)
                      setSelectedCheckup(report || null)
                    }}
                    value={selectedCheckup?._id || ''}
                  >
                    <option value="">-- Select a Checkup Report --</option>
                    {checkupHistory.map((report) => (
                      <option key={report._id} value={report._id}>
                        Report from {new Date(report.date || report.createdAt).toLocaleDateString()} (Severity: {report.severity})
                      </option>
                    ))}
                  </select>
                  {selectedCheckup && (
                    <div className='mt-3 text-xs text-gray-600 bg-white p-3 rounded-lg border space-y-1.5'>
                      <p><strong>Symptoms:</strong> {selectedCheckup.symptoms.join(', ')}</p>
                      <p><strong>Vitals:</strong> Temp: {selectedCheckup.temperature}°F | Pulse: {selectedCheckup.heartRate} bpm | BP: {selectedCheckup.bloodPressure}</p>
                      <p><strong>Suggested Dept:</strong> {selectedCheckup.recommendedSpecialty}</p>
                    </div>
                  )}
                </div>
              )}
              {/* Consultation Type Selector */}
              <div className="my-6">
                <p className="text-gray-700 font-medium mb-3">Consultation Type</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
                  {/* Offline Clinic Card */}
                  <div 
                    onClick={() => setConsultationType('offline')}
                    className={`p-4 border rounded-xl cursor-pointer transition-all duration-300 flex items-start gap-3 ${
                      consultationType === 'offline' 
                        ? 'border-primary bg-indigo-50/10 ring-2 ring-primary/10' 
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="p-2 bg-indigo-50 text-primary rounded-lg mt-0.5">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Offline Clinic Visit</p>
                      <p className="text-xs text-gray-500 mt-1">In-person checkup at the doctor's clinic</p>
                      <p className="text-sm font-bold text-gray-800 mt-2">{currencySymbol}{docInfo.fees}</p>
                    </div>
                  </div>

                  {/* Online Video Card */}
                  <div 
                    onClick={() => setConsultationType('online')}
                    className={`p-4 border rounded-xl cursor-pointer transition-all duration-300 flex items-start gap-3 ${
                      consultationType === 'online' 
                        ? 'border-primary bg-indigo-50/10 ring-2 ring-primary/10' 
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg mt-0.5">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="font-semibold text-gray-900 text-sm">Online Video Consultation</p>
                        <span className="text-[10px] bg-emerald-50 border border-emerald-200 text-emerald-600 font-bold px-1.5 py-0.5 rounded-full">Save 20%</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Video consultation via Stream.io video call</p>
                      <p className="text-sm font-bold text-gray-800 mt-2">{currencySymbol}{Math.round(docInfo.fees * 0.8)} <span className="text-xs text-gray-400 line-through font-normal">{currencySymbol}{docInfo.fees}</span></p>
                    </div>
                  </div>
                </div>
                
                {/* Dynamic consultation type details */}
                {consultationType === 'online' ? (
                  <p className="text-xs text-emerald-600 mt-3 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    You will receive the video consultation link via email when the doctor starts the call.
                  </p>
                ) : (
                  <p className="text-xs text-gray-500 mt-3 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    Clinic Address: {docInfo.address?.line1 || docInfo.address || 'Booty More'}, {docInfo.address?.line2 || 'Ranchi'}
                  </p>
                )}
              </div>

              {/* Button tag */}
              <button 
               onClick={bookAppointment}
              className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6 border '>Book an appointment</button>
        </div>
    {/* Related doctor section , we have to make a new component */}
    <RelatedDoctors docId={docId} speciality= {docInfo.speciality}/>
    </div>
  )
}

export default Appointment