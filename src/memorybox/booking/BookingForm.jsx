// BookingForm.js
import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../contexts/userContext"; // Assuming you have this context for user data

const BookingForm = ({ doctorId, selectedDate, selectedSlot }) => {
  const { user } = useAuthContext(); // Get the current user's information
  const [bookingStatus, setBookingStatus] = useState(null);

  const handleBooking = async () => {
    const bookingData = {
      doctorId,
      patientId: user.id, // Get the patient's ID from context
      date: selectedDate, // Date selected
      slot: {
        startTime: selectedSlot,
        endTime: selectedSlot, // You might need to adjust for the slot end time logic
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/bookings",
        bookingData
      );
      setBookingStatus("Booking Successful!");
    } catch (error) {
      setBookingStatus("Failed to book. Try again.");
    }
  };

  return (
    <div>
      <h2>Booking Details</h2>
      <p>Doctor: {doctorId}</p>
      <p>Slot: {selectedSlot}</p>
      <p>Date: {selectedDate}</p>

      <button onClick={handleBooking}>Book Now</button>

      {bookingStatus && <p>{bookingStatus}</p>}
    </div>
  );
};

export default BookingForm;
