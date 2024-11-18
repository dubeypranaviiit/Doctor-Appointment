import  userModel from "../models/user.models.js"
import validator from "validator"
 import bcrypt from "bcryptjs"
 import jwt from "jsonwebtoken"
 import dotenv from "dotenv"
 dotenv.config()
const signUp = async(req,res)=>{
    try{
        const {name,email,password,} =req.body
        if(!name || !email || !password){
            return res.status(500).json({
                success:false,
                message:`Please  fill necessary field `
            })
        }
              if(!validator.isEmail(email)){
                return res.status(500).json({
                    success:false,
                    message:`Wrong email id `
                })
              }

              if(password.length < 8){
                return res.status(500).json({
                    success:false,
                    message:`Enter a strong password`
                })
              }
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(500).json({
                success:false,
                message:'User exist ! please try with new email'
            })
             }

             
             let hashedPassword
             const salt = await bcrypt.genSalt(10)
             try{
                hashedPassword = await bcrypt.hash(password,salt)
             }catch(error){
                return res.status(500).json({
                    success:false,
                    message:'Server Error ,In hashing passworrd'
                })
            }
                const userData ={
                    name,
                    email,
                    password:hashedPassword
                }

              const newUser = new userModel(userData)
             const user = newUser.save()

//  now creating token for signin

 const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
    res.json({
        success:true,
        token
    })
    }catch(error){
  console.log(error);
  return res.status(500).json({
    success:false,
    message:'Please try again later'
               })
    }
}


//  login
const login = async(req,res)=>{
    try{
        const {email,password,} =req.body
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:`Please  fill necessary field `
            })
        }
              if(!validator.isEmail(email)){
                return res.status(400).json({
                    success:false,
                    message:`Wrong email id `
                })
              }

              if(password.length < 8){
                return res.status(400).json({
                    success:false,
                    message:`Enter a strong password`
                })
              }
            //  
            const user = await userModel.findOne({email})
            if(!user){
                return res.status(500).json({
                    success:false,
                    message:`User not found`
                })
            }
            //matching password
            const IsMatch = await bcrypt.compare(password,user.password)
            if (IsMatch){
                const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
                res.cookie('token', token, {
                   httpOnly: true,
                   maxAge: 3600000 // 1 hour
               });
                   res.json({
                       success:true,
                       token,
                   })
            }else{
                res.json({
                    success:false,
                    message:`Enter a valid email id`
                })
            }


    }catch(error){
  console.log(error);
  return res.status(500).json({
    success:false,
    message:'Please try again later'
               })
    }
}








export {signUp,login}