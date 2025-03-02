import React from 'react' 
import {Link} from "react-router-dom";

const SideBar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-5">
      <h1 className="text-2xl font-bold mb-6">my dash board</h1> 
      <ul className="space-y-4">
        <li><Link to="/" className="block p-2 hover:bg-gray-700">Home</Link></li>
        <li> <Link className="block p-2 hover:bg-gray-700 rounded" to="register-vehcle">Register Vehcle</Link> </li>
        <li><Link className="block p-2 hover:bg-gray-700 rounded" to="vehcle">Vehcles List</Link></li>
        <li><Link className="block p-2 hover:bg-gray-700 rounded" to="create-plan">Create Plan</Link></li>
        <li><Link to="my-plans" className="block p-2 hover:bg-gray-700">My Travel Plans</Link></li>
      </ul>
    </div>
  )
}

export default SideBar
