import React from 'react' 
import { useState,useEffect } from 'react' 
import axios from 'axios'

const VehcleList = () => { 
    const [vehcles,setVehcles]=useState([])
    useEffect(()=>{
        const fetchDetails=async()=>{
            try{
                const token=localStorage.getItem("token")
                const response= await axios.get("https://carpooling-backend-hemq.onrender.com/vehicle/getVehcles",{
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }) 
                
                if(response){
                    setVehcles(response.data.vehcles)
                }
              }catch(error){
                 console.log(error)
              }
        }
        fetchDetails()
    },[]);
  return (
    <div className="bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">My Vehicles</h2>
      <ul className="space-y-3">
        {vehcles.map((vehicle, index) => (
          <li key={index} className="p-4 border rounded shadow">
            <h3 className="font-semibold">{vehicle.vehcleModel}</h3>
            <p>Capacity: {vehicle.noOfSeats}</p>
            <p>Reg No: {vehicle.vehcleNumber}</p>
            <p>Seat Price:{vehicle.pricePerSeat}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default VehcleList
