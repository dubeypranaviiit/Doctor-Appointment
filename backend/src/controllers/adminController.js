import validator from "validator"
import bcryptjs from "bcryptjs"
import {v2 as cloudinary} from "cloudinary"
import doctorModel from "../models/doctor.models.js"
import fs from "fs"
const addDoctor = async(req,res)=>{
    try{
        const {name,email,password,speciality,degree,experience,about,fees,address} =req.body
        const imageFile= req.file

//  validating email format
if(!validator.isEmail(email)){
    return res.status(400).json({
        success: false,
        message: "Please Enter a valid email",
})
}

//   checking email exist or not in adabase
     let existingDoc  = await doctorModel.findOne({email})
     console.log(existingDoc);
     if(existingDoc){
        return res.status(500).json({
            success:false,
            message:`User exist with this email`
        })
     }
        // /validating string password    //  
        if(password.length<8){
            return res.status(400).json({
                success: false,
                message: "Please Enter a strong password ",
        })
        }

//   encrypting password for saving in data base
const salt = await bcryptjs.genSalt(10)
const hashedPassword = await  bcryptjs.hash(password,salt)
// upload image to cloudinary
let imageUrl
try{
    const imageUpload = await cloudinary.uploader.upload(req.file.path ,{
        folder:"Codehelp",
        public_id:`${req.file.name}`
    })
imageUrl =imageUpload.secure_url 
}catch(err){
  return res.status(503).json({
    message:`Error cloud ${err}`,
    success:false
 })
}
//  creating doctor in data base
let doctorData = {
    name,
    email,
    password:hashedPassword,
    image:imageUrl,
    speciality,
    degree,
    experience,
    about,
    fees,
    address,
    date:Date.now()

};
 const newDoctor =new doctorModel(doctorData)
 await newDoctor.save();
 // delete file after successfully upload to cloudinary 
 fs.unlinkSync(req.file.path);
 res.status(200).json({
    success:true,
    message:"Doctor added Successfully"
 })
    }catch(err){
        console.log(`Error in saving data: ${err}`);  // Log the error for debugging
        res.status(500).json({
            success: false,
            message: "An error occurred while adding the doctor",
            error: err.message  // Send the actual error message in response
        });
    }
}


// api for admin login 
// const adminLogin = async(req,res)=>{
//     try{
//   const {email,password}= req.body
//  if( !email || !password){
//     return res.status(400).json({
//         success: false,
//         message: "Please fill all data  carefully ",
// })
//  }
//   let hashed
//  if(email===process.env.ADMIN_EMAIL && password === ADMIN_PASSWORD)
// {

// }else{
//     return res.status(400).json({
//         success: false,
//         message: "Incorrect Password or Email",
// })
// }

//   if(password.length<8){
//     return res.status(400).json({
//         success: false,
//         message: "Please Enter a strong password ",
// })
// }


//     }catch(error){
//         res.status(500).json({
//             success: false,
//             message: "An error occurred while creating admin api in admin controller",
//             error: error.message  // Send the actual error message in response
//         });
//     }

// }

// api to get all doctor list \

const allDoctors = async(req,res)=>{
    try{

        const doctors = await doctorModel.find({}).select('-password')
        res.status(200).json({
        success:true,
        doctors
       })
    }catch(error){
        res.status(500).json({
            success:false,
            message:`Server Error`
           })

    }
}

export {addDoctor,allDoctors }