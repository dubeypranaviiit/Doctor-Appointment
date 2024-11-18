import dotenv from "dotenv"
dotenv.config();
import razorpay from "razorpay"
import { razorpayInstance } from "../config/razorpay.js";

import Appointment from "../models/appointment.models.js"
const paymentRazorPay = async(req,res)=>{

     try{
        const {appointmentId} =req.body
           const appointmentData = Appointment.findById(appointmentId)

           if(!appointmentData || appointmentData.cancelled){
            return res.json({
                success:false,
                message:'Appointment not found'
            })
           }
           
        //    creating options for razorpay
        const options ={
            amount:appointmentData.amount *100,
            currency:process.env.CURRENCY,
            receipt:appointmentId,
        }

        // creation of an order 
        const order = await razorpayInstance.orders.create(options)

     }catch(error){
        return res.status(500).json({
            success:false,
            message:'Server Error ! Please try again later'
        })
     }    
}


// api to verify razorpay comment

const verifyRazorPay = async(req,res)=>{
    try{
    
        const {razorpay_order_id} =req.body
        const orderInfo =await razorpayInstance.orders.fetch(razorpay_order_id)

        if(orderInfo.status==='paid'){
            await Appointment.findByIdAndUpdate(orderInfo.receipt,{payment:true})
               res.json({
                success:true,
                message:'Payment Successfully'
               })
        }else{
            res.json({
                   success:false,
                message:'Payment unSuccessfully'
            })
        }


    }catch(error){
        return res.status(500).json({
            success:false,
            message:'Server Error ! Please try again later'
        })
    }
}

export {paymentRazorPay,verifyRazorPay}