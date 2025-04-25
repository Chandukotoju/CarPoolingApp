import axios from 'axios'
import React from 'react'
import {useState,useEffect} from "react"
import { useNavigate } from 'react-router-dom'

const SignUp = ()=> { 
    const [fullname,setName]=useState("") 
    const [email,setEmail]=useState("") 
    const [password,setPassword]=useState("") 
    const [role,setRole]=useState("owner") 
    const navigate=useNavigate()
    
    const handleSubmit=async(e)=>{
        e.preventDefault() 
        try{ 
            
            const response=await axios.post("https://carpooling-backend-1.onrender.com/user/signup",{fullname,email,password,role}) 
            console.log(response)
            
            navigate("/login")
        }catch(error){
            console.log(error)
        }
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-3xl font-semibold text-center mb-6">SignUp</h1> 
        <form onSubmit={handleSubmit}>
           <div className="mb-4"> <input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" type="text" placeholder="fullname" onChange={(e)=>setName(e.target.value)} value={fullname} /> </div>
            <div className="mb-4"><input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} value={email}/> </div>
            <div className="mb-4"><input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)} value={password}/></div> 
            <select className="mb-6 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" value={role} onChange={(e)=>setRole(e.target.value)}>
                <option value="owner">Owner</option>
                <option value="passenger">Passenger</option>
            </select> 
            <p className="text-center text-sm text-gray-600 mb-4">Already have an account ? <a className="text-blue-500" href='/login'>Login</a></p>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400" type="submit">Sign Up</button> 
        </form>
      </div>
    </div>
  )
}

export default SignUp
