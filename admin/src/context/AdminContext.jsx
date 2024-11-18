import React, { createContext, useState} from "react";
import axios from "axios";
import { toast } from "react-toastify";
// // Create the AdminContext
export const AdminContext = createContext();

// AdminContextProvider component
const AdminContextProvider = (props) => {
    const token = localStorage.getItem('aToken');
    const [aToken, setAToken] = useState(token ? token :'');
    const backendUrl = import.meta.env.VITE_BACKEND_URL; // Retrieve backend URL from environment variables
   const [doctors,setDoctors] = useState([])

const getAllDoctors =async()=>{
      try{
        const {data} = await axios.post(backendUrl+'/api/admin/all-doctors',{},{headers:{aToken}})
        if(data.success){
            setDoctors(data.doctors)
        }else{
            toast.error(data.message)
        }
      }catch(error){
        toast.error(error.message)
      }
 }

 const  changeAvailability =async (docId)=>{
      try{
   const {data} =await axios.post(backendUrl+'/api/admin/change-availability',{docId},{headers:{aToken}})
   if(data.success){
    toast.success(data.message);
    getAllDoctors()
   }else{
    ToastContainer.error(data.message)
   }
      }catch(error){
           toast.error(error.message)
      }
 }
 
    const value = {
        aToken,
        setAToken,
        backendUrl,
        doctors,
        getAllDoctors,
        changeAvailability
    };

    return (
        <AdminContext.Provider value={value}>
            {props.children} {/* Render any children components */}
        </AdminContext.Provider>
    );
}

export default AdminContextProvider; // Export the provider for use in other components

