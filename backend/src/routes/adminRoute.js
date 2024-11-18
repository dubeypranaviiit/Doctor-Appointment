import express from "express"
const adminRouter =express.Router();
import { addDoctor, allDoctors } from "../controllers/adminController.js";
import upload from "../middleware/multer.js";
import {dataCheck} from "../middleware/check.js";
import {adminLogin } from "../controllers/adminAuth.js"
import {authAdmin } from "../middleware/adminAuth.js"
import { changeAvailablity } from "../controllers/doctorController.js";

adminRouter.post('/add-doctor',upload.single('image'),dataCheck,authAdmin,addDoctor)
adminRouter.post('/login',adminLogin)
adminRouter.post("/all-doctors",authAdmin,allDoctors)
adminRouter.post("/change-availability",authAdmin,changeAvailablity)
// adminRouter.get("/doctor",(req,res)=>{
//     res.status(200).json({
//         message:"Req",
//         success:true
//     })
// })
export default adminRouter