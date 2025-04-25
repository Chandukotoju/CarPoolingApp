import React from 'react'  
import axios from "axios";
import {useState,useEffect} from "react" 
import {useNavigate} from "react-router-dom" 

const Login = () => { 
    const [email,setEmail]=useState("") 
    const [password,setPassword]=useState("")  
    const navigate=useNavigate()  
    const handleSubmit=async(e)=>{
        e.preventDefault() 
        try{
             const response=await axios.post("https://carpooling-backend-1.onrender.com/user/login",{email,password})  
             console.log(response)
             localStorage.setItem("token",response.data.token) 
             console.log(response.data.token)
             localStorage.setItem("userRole",response.data.user.role)
             
             
             navigate("/")
            //  if (role === "owner") {
            //   navigate("/owner-dashboard");
            // } else {
            //   navigate("/passenger-dashboard");
            // }
             
        }catch(error){
            console.log(error)
        }
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-3xl font-semibold text-center mb-6">Login</h1> 
        <form onSubmit={handleSubmit}>
           <div className="mb-4"> <input placeholder='email' className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"  type="email" value={email} onChange={(e)=>setEmail(e.target.value)} /> </div>
           <div className="mb-4"> <input placeholder="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"  type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/> </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400" type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
