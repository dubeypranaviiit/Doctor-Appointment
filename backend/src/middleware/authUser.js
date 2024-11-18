import jwt from "jsonwebtoken"

// admin authentication middleware
const authUser =async(req,res,next)=>{
try{
const {token} =req.headers
console.log(token);
 if(!token){
    return res.status(400).json({
        success: false,
        message: "Invalid credential as user",
})
 }
//  to verify the token 
 const token_decode =jwt.verify(token,process.env.JWT_SECRET)
  req.body.userId = token_decode.id

 next()
}catch(error){
return res.status(400).json({
        success: false,
        message: error.message,
})
}
}

export {authUser}