
//8:21
import doctorModel from "../models/doctor.models.js"
const changeAvailablity =async (req,res)=>{
    try{
         const {docId} =req.body
         const docData= await doctorModel.findById(docId)
            await doctorModel.findByIdAndUpdate(docId,{available:!docData.available})
            res.status(200).json({
              success:true,
              message:`Availablity Changed`
            })
    }catch(error){
      res.status(500).json({
        success:false,
        message:error.message
      })
    }
}


const doctorList = async(req,res)=>{
  try{
    const doctors = await doctorModel.find({}).select(['-password','-email'])
    console.log(doctors);
      res.status(200).json({
        success:true,
        doctors
      })
  }catch(error){
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
}
export {changeAvailablity,doctorList }