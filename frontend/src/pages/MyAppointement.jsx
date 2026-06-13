import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import {useNavigate} from "react-router-dom"
const MyAppointment=()=>{
    const navigate = useNavigate()
  const {backendurl,token,getDoctorsData} =useContext(AppContext)
   const [appointments,setAppointments]= useState([])
   const months = [" ","Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

   const slotDateFormat =(slotDate)=>{
    const dateArray =slotDate.split('-')
    return dateArray[0] +" " +months[Number(dateArray[1])] + " " + dateArray[2]
   }
    const getUserAppointments =async()=>{
      try{
        const {data} = await axios.get(backendurl+'/api/user/list-appointment',{headers:{token}})
       
          if(data.success){
            setAppointments(data.appointments.reverse())
            console.log(`hi this :${data.appointments.docData}`);
          }
      }catch(error){
        console.log(error);
         toast.error(error.message)
      }
    }
    const cancelAppointment = async(appointmentId)=>{
      try{
                 const {data} =await axios.post(backendurl+'/api/user/cancel-appointment',{appointmentId},{headers:{token}})
            if(data.success){
              toast.success(data.message)
                getUserAppointments()
                getDoctorsData()
            }else{
              toast.error(data.message)
            }
      }catch(error){
        toast.error(error.message)
      }
    }
    const initPay =(order)=>{
              const options ={
                key:  import.meta.env.VITE_RAZORPAY_KEY_ID, 
                amount: order.amount,
                currency :order.currency,
                name:'Appointment Payment',
                description:'Appointment Payment',
                order_id:order.id,
                receipt:order.receipt,
                handler:async (responce)=>{
                       try{
                        const {data}=await axios.post(backendurl+'/api/user/verify-razorpay',{responce},{headers:{token}})
                        if(data.success){
                          getUserAppointments()
                          navigate('/my-appointment')
                        }
                       }catch(error){
                        console.log(error);
                               toast.error(error.message)
                       }
                }
              }

              const rzp =new window.Razorpay(options)
              rzp.on('payment.failed', function (response) {
                  toast.error("Payment Failed: " + response.error.description);
              });
              rzp.open()
    }
    const appointmentRazorPay = async(appointmentId)=>{
      try{
        const {data} =await axios.post(backendurl+'/api/user/payment-razorpay',{appointmentId},{headers:{token}})
         if(data.success){
          console.log("data.order:", data.order);

          initPay(data.order);
         }
     
      }catch(error){
        console.log(error);
        toast.error(error.message)
      }
    }

    const checkRefundStatus = async (appointmentId) => {
      try {
        const { data } = await axios.get(backendUrl + `/api/user/refund-status/${appointmentId}`, { headers: { token } })
        if (data.success) {
          toast.success(`Refund live status: ${data.refundStatus}`)
          getUserAppointments()
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }

  useEffect(()=>{
      if(token){
        getUserAppointments();
      }
  },[token])
  useEffect(() => {
    console.log('All appointmnets is :',appointments); // Log appointments after they are set
  }, [appointments]);

  const backendUrl = backendurl // align casing

  return (
    <div>
 <p className='pb-3 mt-12 font-medium text-zinc-500 border-b '>My appointments</p>
 <div>
  {
     appointments.map((item,index)=>(
       <div className=' grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b items-center' key={index}>
         <div>
         <img  className='w-32 bg-indigo-50 rounded-xl' src={item.docData.image} alt="doctor" />
         </div>
            <div className='flex-1 text-sm text-zinc-600 space-y-1'>
             <p className='text-neutral-800 font-semibold text-base'>{item.docData.name}</p>
             <p className='text-xs text-gray-500'>{item.docData.speciality}</p>
             
             <div className="flex items-center gap-1.5 py-0.5">
               <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                 item.consultationType === 'online' 
                   ? 'bg-emerald-50 text-emerald-600 border-emerald-200' 
                   : 'bg-indigo-50 text-primary border-indigo-200'
               }`}>
                 {item.consultationType === 'online' ? 'Online Consultation' : 'Clinic Visit'}
               </span>
             </div>

             {item.consultationType === 'online' ? (
               <div className="mt-1 bg-emerald-50/20 border border-emerald-100 rounded-xl p-2.5 max-w-xs text-xs">
                 <p className="font-semibold text-emerald-700">Virtual Call Room</p>
                 <p className="text-[10px] text-gray-500 mt-0.5">Session link active upon physician start.</p>
               </div>
             ) : (
               <div className="text-xs space-y-0.5">
                 <p className='text-zinc-700 font-medium'>Address:</p>
                 <p className='text-gray-500'>{item.docData.address?.line1 || item.docData.address || 'Booty More'}</p>
                 <p className='text-gray-500'>{item.docData.address?.line2 || 'Ranchi'}</p>
               </div>
             )}

             <p className='text-xs pt-1'>
              <span className='text-sm text-neutral-700 font-medium'>
                Date & Time :
              </span>{' '}
              {slotDateFormat(item.slotDate)} | {item.slotTime}   
             </p>
            </div>
  <div></div>

  <div className='flex flex-col gap-3.5 justify-end'>
    {!item.cancelled && !item.isCompleted && item.consultationType === 'online' && (
      <button 
        onClick={() => navigate(`/video-call/${item._id}`)}
        className={`text-sm text-center sm:min-w-48 py-2.5 rounded-xl border transition-all font-bold ${
          item.videoCallStatus === 'active' 
            ? 'bg-emerald-500 text-white hover:bg-emerald-600 border-emerald-500 shadow-md animate-pulse' 
            : 'bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100/80'
        }`}
      >
        {item.videoCallStatus === 'active' ? 'Join Consultation (Active)' : 'Video Consultation (Pending)'}
      </button>
    )}

    {item.cancelled && item.payment && (
      <div className="flex flex-col gap-1.5 items-center justify-center sm:min-w-48">
        <button className='w-full py-2.5 border rounded-xl bg-gray-50 text-gray-400 cursor-not-allowed text-sm font-semibold'>Paid</button>
        {item.refundStatus && item.refundStatus !== 'none' && (
          <div className="text-center space-y-1">
            <p className="text-[11px] text-indigo-600 font-bold">Refund Status: <span className="uppercase">{item.refundStatus}</span></p>
            <button 
              onClick={() => checkRefundStatus(item._id)}
              className="text-[10px] text-primary underline hover:text-opacity-80 block mx-auto font-medium"
            >
              Refresh Refund Status
            </button>
          </div>
        )}
      </div>
    )}

    {item.isCompleted && (
      <button className='sm:min-w-48 py-2.5 border border-emerald-500 rounded-xl text-emerald-600 font-bold text-sm bg-emerald-50/20 cursor-default'>
        Completed
      </button>
    )}

    {!item.cancelled && !item.isCompleted && !item.payment && <button onClick={()=>appointmentRazorPay(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2.5 border rounded-xl hover:bg-primary hover:text-white transition-all duration-300 font-semibold'> Pay Online</button>}
    {!item.cancelled && !item.isCompleted && <button onClick={()=>cancelAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2.5 border rounded-xl hover:bg-red-700 hover:text-white transition-all duration-300 font-semibold'>Cancel Appointment</button>}
    {item.cancelled && !item.payment && <button className='sm:min-w-48 py-2.5 border border-red-500 rounded-xl text-red-500 font-bold text-sm bg-red-50/20'>Appointment Cancelled</button>}
    {item.cancelled && item.payment && !item.refundStatus && <button className='sm:min-w-48 py-2.5 border border-red-500 rounded-xl text-red-500 font-bold text-sm bg-red-50/20'>Appointment Cancelled</button>}
  </div>
       </div>
     ))
  
  }
 </div>

    </div>
  )
}

export default MyAppointment


