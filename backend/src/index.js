import express from "express"
import cors from "cors"
import  dotenv from "dotenv"
import dbConnect from "./config/database.js";
import cloudinaryConnect from "./config/cloudinary.js"
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js"
// app config
const app =express();
dotenv.config({ path: './.env' });

const port =process.env.PORT || 6000
console.log(port);
// using middleware 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// api endpoint
app.get('/',(req,res)=>{
    res.json(`API is working`)
})
app.use("/api/admin",adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)
// listening
app.listen(port,()=>{
    console.log(`Server is runninig on Port: ${port}`);
    dbConnect()
    cloudinaryConnect()
    .then(()=>console.log(`cloudinary connected successfully`))
    .catch((err)=>{
        console.log(`error in connecting cloudinary :${err}`);
    })
})