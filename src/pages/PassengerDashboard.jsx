import { useEffect, useState } from "react";
import axios from "axios";
import BookingModal from "./BookingModal";
import PassengerBookings from "./PassengerBookings";
import { useNavigate } from "react-router-dom";

const PassengerDashboard = () => {
  const navigate=useNavigate();
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [activeTab, setActiveTab] = useState("plans"); // "plans" or "bookings"

  useEffect(() => {
    const fetchTravelPlans = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from local storage
        const response = await axios.get("https://carpooling-backend-1.onrender.com/travel/getAllPlans", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPlans(response.data.travelPlans);
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    };
  
    fetchTravelPlans();
  }, []);

  return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Passenger Dashboard</h2>

      {/* Tabs for switching between Travel Plans and My Bookings */}
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${activeTab === "plans" ? "bg-blue-600 text-white" : "bg-gray-300"}`}
          onClick={() => setActiveTab("plans")}
        >
          Travel Plans
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === "bookings" ? "bg-blue-600 text-white" : "bg-gray-300"}`}
          onClick={() => setActiveTab("bookings")}
        >
          My Bookings
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === "" ? "bg-blue-600 text-white" : "bg-gray-300"}`}
          onClick={() => navigate("/")}
        >
          Home
        </button>
      </div>

      {activeTab === "plans" ? (
        <>
          <p>Find and book travel plans.</p>
          {plans.map((plan) => (
            <div key={plan._id} className="p-4 border rounded mt-2">
              <h3 className="font-semibold">{plan.from} → {plan.to}</h3>
              <p>Date: {plan.date} | Time: {plan.time}</p>
              <button className="bg-green-600 text-white px-4 py-2 rounded mt-2" onClick={() => setSelectedPlan(plan)}>
                Book Now
              </button>
            </div>
          ))}
        </>
      ) : (
        <PassengerBookings /> // Render My Bookings Tab
      )}

      {selectedPlan && (
        <BookingModal
          isOpen={!!selectedPlan}
          onClose={() => setSelectedPlan(null)}
          travelPlan={selectedPlan}
        />
      )}
    </div>
  );
};

export default PassengerDashboard;
