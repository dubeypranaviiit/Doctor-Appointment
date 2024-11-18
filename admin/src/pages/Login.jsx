
 import {assets_admin} from "../assets/assets_admin/assets.js"
 import { useContext, useState } from 'react'
import { AdminContext } from "../context/AdminContext.jsx"
import axios from "axios"
import {toast} from "react-toastify"
 const Login = ()=>{
    const [state,setState] =useState('Admin')
    const {setAToken,backendUrl} =useContext(AdminContext)
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const onSubmitHandler = async (event)=>{
       event.preventDefault();
   try{
    if(state==='Admin'){
    const {data}= await axios.post(backendUrl+'/api/admin/login',{email,password})
    if(data.success)
    {
        console.log("Login successful. Token received:", data.token);
        localStorage.setItem('aToken',data.token)
       setAToken(data.token)
       toast.success("Login successful!"); 
    }else{
        console.log(`invalid username /password`);
        toast.error("please try again later")
    }
    }else{

    }
   }catch(error){

   }
    }
  return (
   <form className="min-h-[80vh] flex items-center" onSubmit={onSubmitHandler} >
    <div className="flex flex-col gap-3 m-auto  items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[# text-sm shadow-xl">
        <p className="text-2xl font-semibold m-auto"><span className="text-primary">{state}</span> Login</p>
        <div className="w-full">
            <p>Email</p>
            <input type="email" required
            className="border border-[#DADADA] rounded w-full p-2 mt-1" 
            onChange={(e)=>{
                setEmail(e.target.value)
            }}
            value={email}
            />
        </div>
        <div className="w-full">
            <p>Pasword</p>
            <input type="password" required
             className="border border-[#DADADA] rounded w-full p-2 mt-1"
             onChange={(e)=>{
                setPassword(e.target.value)
            }}
            value={password}
           />
        </div>
        <button 
         className="   bg-primary text-white w-full rounded-md  py-3 text-base"
        >Login</button>
        {
            state ==='Admin'
            ? <p>Doctor Login ?<span className="text-primary underline cursor-pointer" onClick={()=>setState('Doctor')}>Click here</span></p>
            : <p>Admin Login ?<span className="text-primary underline cursor-pointer" onClick={()=>setState('Doctor')} >Click here</span></p>
        }
    </div>
   </form>
  )
}

export default Login