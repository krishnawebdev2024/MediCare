import React, { useState } from "react";
import axios from "axios"; // For sending the booking request
import { useAuthContext } from "../contexts/userContext"; // To get the patient's ID

const AppointmentBooking = ({ doctor, availability }) => {
  const { user } = useAuthContext(); // Get the logged-in user's info
  const [selectedDate, setSelectedDate] = useState(""); // Store the selected date
  const [selectedSlot, setSelectedSlot] = useState(null); // Store the selected slot
  const [statusMessage, setStatusMessage] = useState(""); // To display booking status

  // Function to book an appointment
  const bookAppointment = async () => {
    if (!selectedDate || !selectedSlot) {
      setStatusMessage("Please select a date and time slot.");
      return;
    }

    const bookingData = {
      doctorId: doctor._id,
      patientId: user.id,
      date: selectedDate,
      slot: selectedSlot,
    };

    try {
      await axios.post("http://localhost:3000/api/v1/bookings", bookingData);
      setStatusMessage("Appointment booked successfully!");
    } catch (error) {
      console.error("Error booking appointment:", error);
      setStatusMessage("Failed to book the appointment.");
    }
  };

  return (
    <div>
      <h2>Book an Appointment with Dr. {doctor.name}</h2>

      {/* Select Date */}
      <label>
        Date:
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </label>

      {/* Display Available Slots */}
      <h3>Available Slots</h3>
      {availability.map((avail) =>
        avail.slots.map((slot) => (
          <button
            key={slot._id}
            onClick={() => setSelectedSlot(slot)} // Save the selected slot
            disabled={slot.isBooked} // Disable if already booked
            className={`p-2 m-2 rounded ${
              slot.isBooked ? "bg-red-500" : "bg-green-500"
            }`}
          >
            {slot.startTime} - {slot.endTime}
          </button>
        ))
      )}

      {/* Confirm Booking Button */}
      <button
        onClick={bookAppointment}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Confirm Appointment
      </button>

      {/* Status Message */}
      {statusMessage && <p>{statusMessage}</p>}
    </div>
  );
};

export default AppointmentBooking;
