import Appointment from "../models/appointment.models.js";
import doctorModel from "../models/doctor.models.js"
import userModel from "../models/user.models.js"

const bookAppointment =async(req,res)=>{
    try{
       const {userId,docId,slotDate,slotTime}=req.body

       const docData = await doctorModel.findById(docId).select('-password')

       if(!docData.available){
         return res.status(500).json({
            success:false,
            message:`Doctor not available`
        })
       }
       let slots_booked = docData.slots_booked || {}
       if (!slots_booked[slotDate]) {
        slots_booked[slotDate] = [];
    }
       if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
             return   res.status(500).json({
                    success:false,
                    message:`Slot unavailable`
                })
            }else{
                slots_booked[slotDate].push(slotTime)
            }
       }else{
        slots_booked[slotDate]=[]
       return  res.status(500).json({
                success:false,
                    message:`Slot unavailable`
        })
       }
        //    const userData =userModel.findById(userId).select('-password')
           const userData = userModel.find({ userId }).select('-password');
             delete docData.slots_booked

             const appointmentData ={
                userId,
                docId,
                userData,
                slotDate,
                slotTime,
                docData,
                amount:docData.fees,
                date:Date.now()
             }

             const newAppointment = new Appointment(appointmentData)
             await newAppointment.save();

            //  saves new slots adat in doctoe data 
             await doctorModel.findByIdAndUpdate(docId,{slots_booked})
     res.status(200 ).json({
        success:true,
        message:`Appointment booked`
    })
    }catch(error){
        console.log(error);
           return  res.status(500).json({
                success:false,
                message:`Please try again later`
            })
    }
}

//  appointments
// api to get user appointment for fronted

const listAppointment = async(req,res)=>{

try{
 const {userId} =req.body
 const appointments = await Appointment.find({userId})
 res.status(200).json({
     success:true,
     appointments
 })


}catch(error){
           console.log(error);
           return  res.status(500).json({
                success:false,
                message:`Please try again later`
            })



}


}


// api to cancel appointment
const cancelAppointment = async(req,res)=>{



    try{
        const {userId,appointmentId} =req.body
        const user =await userModel.findById(userId)
        const appointmentData = await Appointment.findById(appointmentId)

        // verify appointment user 
        if(appointmentData.userId  !== userId){
            return res.status(500).json({
                success:false,
                message:'unauthorized action'
            })
        }
        // 
        await Appointment.findByIdAndUpdate(appointmentId,{cancelled:true})
    //  now slot time  will be available

         const {docId,slotDate,slotTime} = appointmentData
    const doctorData = await doctorModel.findById(docId)
          let slots_booked = doctorData.slots_booked
          slots_booked [slotDate]= slots_booked[slotDate].filter( e=> e!==slotTime)
           await doctorModel.findByIdAndUpdate(docId,{slots_booked})
        
           res.json({success:true,message:"Appointment Cancelled "})
          
        }catch(error){
        return res.status(500).json({
            success:false,
            message:'Server Error ! Please try again later'
        })
    }

}


export {bookAppointment,listAppointment,cancelAppointment}