import { useEffect, useState } from "react";
import axios from "axios";

const PassengerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://carpooling-backend-1.onrender.com/travel/getBookings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(response.data.bookings);
      } catch (error) {
        console.log(error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const cancelBooking = async (travelId, seatsToCancel) => {
    try {
      const token = localStorage.getItem("token");
      
      await axios.post(
        "https://carpooling-backend-1.onrender.com/travel/cancel",
        { travelId, seatsToCancel },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Booking cancelled successfully!");
      setBookings((prevBookings) =>
        prevBookings
          .map((booking) =>
            booking.travelId === travelId
              ? { ...booking, seatsBooked: booking.seatsBooked - seatsToCancel }
              : booking
          )
          .filter((booking) => booking.seatsBooked > 0)
      );
    } catch (error) {
      console.error(error);
      alert("Failed to cancel booking.");
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">My Bookings</h3>
      {loading ? (
        <p>Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        bookings.map((booking) => (
          <div key={booking._id} className="p-4 border rounded mt-2">
            <h3 className="font-semibold">
              {booking.from} → {booking.to}
            </h3>
            <p>
              <strong>Date:</strong> {booking.date}
            </p>
            <p>
              <strong>Seats Booked:</strong> {booking.seatsBooked}
            </p>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded mt-2"
              onClick={() => cancelBooking(booking.travelId, booking.seatsBooked)}
            >
              Cancel Booking
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default PassengerBookings;
