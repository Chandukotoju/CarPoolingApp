import { useState, useEffect } from "react";
import axios from "axios";

const CreatePlan = () => {
  const [plan, setPlan] = useState({
    from: "",
    to: "",
    date: "",
    time: "",
    vehcleId: "",
    noOfSeats: "",
    pricePerSeat: "",
  });

  const [vehicles, setVehicles] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(()=>{
    const fetchDetails=async()=>{
        try{
            const token=localStorage.getItem("token")
            const response= await axios.get("https://carpooling-backend-1.onrender.com/vehicle/getVehcles",{
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }) 
            if(response){
                setVehicles(response.data.vehcles)
            }
          }catch(error){
             console.log(error)
          }
    }
    fetchDetails()
},[]);

  const handleChange = (e) => {
    setPlan({ ...plan, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let errors = {};
    if (!plan.from.trim()) errors.from = "From location is required";
    if (!plan.to.trim()) errors.to = "To location is required";
    if (!plan.date) errors.date = "Date is required";
    if (!plan.time) errors.time = "Time is required";
    if (!plan.vehcleId) errors.vehcleId = "Please select a vehicle";
    if (!plan.noOfSeats || plan.noOfSeats <= 0) errors.noOfSeats = "Seats must be a positive number";
    if (!plan.pricePerSeat || plan.pricePerSeat <= 0) errors.pricePerSeat = "Price must be a positive number";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const token = localStorage.getItem("token"); 
      await axios.post("https://carpooling-backend-1.onrender.com/travel/create", plan, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Travel Plan Created Successfully!");
      setPlan({ from: "", to: "", date: "", time: "", vehcleId: "", noOfSeats: "", pricePerSeat: "" });
      setErrors({});
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white p-6 shadow rounded max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create Travel Plan</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="from" placeholder="From" className="w-full p-2 border rounded" value={plan.from} onChange={handleChange} />
        {errors.from && <p className="text-red-500 text-sm">{errors.from}</p>}

        <input type="text" name="to" placeholder="To" className="w-full p-2 border rounded" value={plan.to} onChange={handleChange} />
        {errors.to && <p className="text-red-500 text-sm">{errors.to}</p>}

        <input type="date" name="date" className="w-full p-2 border rounded" value={plan.date} onChange={handleChange} />
        {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}

        <input type="time" name="time" className="w-full p-2 border rounded" value={plan.time} onChange={handleChange} />
        {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}

        {/* Vehicle selection dropdown */}
        <select name="vehcleId" className="w-full p-2 border rounded" value={plan.vehcleId} onChange={handleChange}>
          <option value="">Select Vehicle</option>
          {vehicles.map((vehicle) => (
            <option key={vehicle._id} value={vehicle._id}>
               ({vehicle.vehcleModel} )
            </option>
          ))}
        </select>
        {errors.vehcleId && <p className="text-red-500 text-sm">{errors.vehcleId}</p>}

        <input type="number" name="noOfSeats" placeholder="Available Seats" className="w-full p-2 border rounded" value={plan.noOfSeats} onChange={handleChange} />
        {errors.noOfSeats && <p className="text-red-500 text-sm">{errors.noOfSeats}</p>}

        <input type="number" name="pricePerSeat" placeholder="Price Per Seat" className="w-full p-2 border rounded" value={plan.pricePerSeat} onChange={handleChange} />
        {errors.pricePerSeat && <p className="text-red-500 text-sm">{errors.pricePerSeat}</p>}

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Create Plan</button>
      </form>
    </div>
  );
};

export default CreatePlan;

