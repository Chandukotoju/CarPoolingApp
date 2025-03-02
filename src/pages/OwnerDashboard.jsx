import React from 'react' 
import SideBar from "../components/SideBar.jsx" 
import { Outlet } from 'react-router-dom'

const OwnerDashboard = () => {
  return (
    <div className='flex'>
      <SideBar/> 
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <Outlet/>
      </div>
    </div>
  )
}

export default OwnerDashboard


