import { BrowserRouter as Router,Routes,Route } from "react-router-dom"; 
import SignUp from "../pages/SignUp.jsx";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx"; 
import PrivateRoute from "../pages/PrivateRoute.jsx";
import OwnerDashboard from "../pages/OwnerDashboard.jsx";
import VehcleRegister from "../pages/VehcleRegister.jsx";
import VehcleList from "../pages/VehcleList.jsx"; 
import CreatePlan from "../pages/CreatePlan.jsx";
import OwnerTravelPlans from "../pages/OwnerTravelPlans.jsx";
import PassengerDashboard from "../pages/PassengerDashboard.jsx";
import OwnerHome from "../pages/OwnerHome.jsx";


const AppRouter=()=>{
    return(
        <Routes>
            <Route path="/" element={<Home/>}/> 
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/owner-dashboard" element={<OwnerDashboard/>}>
              <Route index element={<OwnerHome />}/>
              <Route path="register-vehcle" element={<VehcleRegister/>}/>
              <Route path="vehcle" element={<VehcleList/>}/>
              <Route path="create-plan" element={<CreatePlan />} />
              <Route path="my-plans" element={<OwnerTravelPlans />} />
            </Route> 
            <Route path="/passenger-dashboard" element={<PassengerDashboard />}/>
        </Routes>
    )
}
                        
export default AppRouter 