import { useState, useEffect } from "react";
import axios from "axios";

const OwnerTravelPlans = () => {
  const [plans, setPlans] = useState([]);
  const [editingPlan, setEditingPlan] = useState(null);
  const [updatedPlan, setUpdatedPlan] = useState({});

  useEffect(() => {
    fetchTravelPlans();
  }, []);

  const fetchTravelPlans = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/travel/plans", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPlans(response.data.travelPlans);
      console.log(plans)
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/travel/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPlans(plans.filter((plan) => plan._id !== id)); // Remove from UI
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (plan) => {
    setEditingPlan(plan._id);
    setUpdatedPlan(plan);
  };

  const handleChange = (e) => {
    setUpdatedPlan({ ...updatedPlan, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3000/travel/update/${updatedPlan._id}`,
        updatedPlan,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Travel Plan Updated Successfully!");
      setEditingPlan(null);
      fetchTravelPlans(); // Refresh list
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">My Travel Plans</h2>
      {plans.length === 0 ? (
        <p>No travel plans created.</p>
      ) : (
        <ul className="space-y-3">
          {plans.map((plan) => (
            <li key={plan._id} className="p-4 border rounded shadow">
              {editingPlan === plan._id ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    name="from"
                    value={updatedPlan.from}
                    onChange={handleChange}
                    className="w-full p-2 border"
                  />
                  <input
                    type="text"
                    name="to"
                    value={updatedPlan.to}
                    onChange={handleChange}
                    className="w-full p-2 border"
                  />
                  <input
                    type="date"
                    name="date"
                    value={updatedPlan.date}
                    onChange={handleChange}
                    className="w-full p-2 border"
                  />
                  <input
                    type="time"
                    name="time"
                    value={updatedPlan.time}
                    onChange={handleChange}
                    className="w-full p-2 border"
                  />
                  <input
                    type="number"
                    name="noOfSeats"
                    value={updatedPlan.noOfSeats}
                    onChange={handleChange}
                    className="w-full p-2 border"
                  />
                  <input
                    type="number"
                    name="pricePerSeat"
                    value={updatedPlan.pricePerSeat}
                    onChange={handleChange}
                    className="w-full p-2 border"
                  />
                  <button onClick={handleUpdate} className="bg-green-600 text-white px-3 py-1 rounded">
                    Save
                  </button>
                  <button onClick={() => setEditingPlan(null)} className="bg-gray-600 text-white px-3 py-1 rounded ml-2">
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  <h3 className="font-semibold">
                    {plan.from} → {plan.to}
                  </h3>
                  <p>Date: {plan.date} | Time: {plan.time}</p>
                  <p>Seats: {plan.noOfSeats} | Price: ₹{plan.pricePerSeat}</p>
                  <p>Vehicle ID: {plan.vehcle}</p>
                  <div className="flex gap-3 mt-2">
                    <button
                      onClick={() => handleEdit(plan)}
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(plan._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OwnerTravelPlans;
