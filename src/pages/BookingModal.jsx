import { useState } from "react";
import axios from "axios";

const BookingModal = ({ isOpen, onClose, travelPlan }) => {
  const [seats, setSeats] = useState(1);
  const [error, setError] = useState("");
  
  if (!isOpen) return null;

  const handleBooking = async () => {
    if (seats < 1) {
      setError("Please select at least one seat.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `https://carpooling-backend-hemq.onrender.com/travel/book`,
        { seatsToBook: seats,travelId:travelPlan._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Booking successful!");
      onClose(); // Close modal after booking
    } catch (error) {
      setError("Booking failed. Try again.");
      console.error(error);
    }
  };
  if (!isOpen || !travelPlan) return null; 
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Book Travel Plan</h2>
        <p><strong>From:</strong> {travelPlan.from} → <strong>To:</strong> {travelPlan.to}</p>
        <p><strong>Date:</strong> {travelPlan.date}</p>
        <p><strong>Available Seats:</strong> {travelPlan.noOfSeats}</p>
        <p><strong>Price per Seat:</strong> ${travelPlan.pricePerSeat}</p>

        <div className="mt-4">
          <label className="block mb-2">Select Seats:</label>
          <input
            type="number"
            className="border p-2 w-full"
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
            min="1"
            max={travelPlan.noOfSeats}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        <div className="flex justify-end mt-4 space-x-2">
          <button className="bg-gray-400 px-4 py-2 rounded" onClick={onClose}>Cancel</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleBooking}>Confirm Booking</button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
