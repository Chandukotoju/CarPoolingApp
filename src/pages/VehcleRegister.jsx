import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'

const VehcleRegister = () => { 
    const [vehcle,setVehcle]=useState({vehcleNumber:"",vehcleModel:"",noOfSeats:"",pricePerSeat:""}) 
    const handleChange=(e)=>{
        setVehcle({...vehcle,[e.target.name]:e.target.value})
    }
  const handleSubmit=async(e)=>{
      e.preventDefault() 
      try{
        const token=localStorage.getItem("token");
        const response= await axios.post("http://localhost:3000/vehicle/register",vehcle,{headers:{Authorization:`Bearer ${token}`}}) 
        setVehcle({vehcleNumber:"",vehcleModel:"",noOfSeats:"",pricePerSeat:""})
      }catch(error){
         console.log(error)
      }
  }
  return (
    <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Register Vehcles here</h1> 
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full p-2 border rounded" type="number" name="vehcleNumber" value={vehcle.vehcleNumber} placeholder="vehcleNumber" onChange={handleChange}/>
        <input className="w-full p-2 border rounded" type="text" name="vehcleModel" value={vehcle.vehcleModel} placeholder='vehcleModel' onChange={handleChange}/> 
        <input className="w-full p-2 border rounded" type="number" name="noOfSeats" value={vehcle.noOfSeats} placeholder='noOfSeats' onChange={handleChange}/> 
        <input className="w-full p-2 border rounded" type="number" name="pricePerSeat" value={vehcle.pricePerSeat} placeholder='pricePerSeat' onChange={handleChange}/> 
        <button className={`w-full bg-blue-600 text-white px-4 py-2 rounded`} type="submit">Register</button>
      </form>
    </div>
  )
}

export default VehcleRegister
