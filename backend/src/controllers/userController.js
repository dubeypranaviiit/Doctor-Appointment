import userModel from "../models/user.models.js"
import {v2 as cloudinary} from "cloudinary"
// Api to get user profile data 

const getProfile = async(req,res)=>{
    try{
          const {userId} = req.body
          const userData = await userModel.findById(userId).select('-password')
          res.status(200).json({
            success:true,
            userData
          })
    }catch(error){
             console.log(error);
             res.status(500).json({
                success:false,
                message:error.message
             })
    }
}
// api to update user profile
const updateProfile =async (req,res)=>{


    try{
        const {userId,name,phone,address,dob,gender} = req.body
        const imageFile =req.file
if(!name || !phone || !gender || !dob){
    return res.status(400).json({
        success:false,
        message:`Fill all data `
    })
}

await userModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender})
    

if(imageFile){

    const imageUpload = await cloudinary.uploader.upload(req.file.path ,{
        folder:"Codehelp",
        public_id:`${req.file.name}`
    })
let imageUrl =imageUpload.secure_url 

await userModel.findByIdAndUpdate(userId,{image:imageUrl})
}

res.status(200).json({
    success:true,
    message:`Profile updated successfully`
})
    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:`Server Error !please try agin later`
        })
    }
   
}
export {getProfile,updateProfile}