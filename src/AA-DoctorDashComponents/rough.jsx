//import React, { useState } from "react";
//import { useAvailability } from "../doctorContextsAndReducers/availabilityContext";
//import { useDoctorContext } from "../contexts/doctorContext"; // Assuming you have this context for doctor data

import React, { useState } from "react";
import axios from "axios"; // Import axios for API calls
import { useDoctorContext } from "../contexts/doctorContext";

const CreateAvailability = () => {
  const { doctor } = useDoctorContext();

  const [date, setDate] = useState(""); // State to hold selected date
  const [slots, setSlots] = useState([{ startTime: "", endTime: "" }]); // State to hold time slots
  const [loading, setLoading] = useState(false); // Loading state for the button
  const [error, setError] = useState(null); // Error state to display messages
  const [success, setSuccess] = useState(false); // Success state to display success message

  const doctorId = doctor.id;

  // Function to add a new time slot
  const handleAddSlot = () => {
    setSlots([...slots, { startTime: "", endTime: "" }]);
  };

  // Handle changes in the time slots
  const handleSlotChange = (index, field, value) => {
    const updatedSlots = [...slots];
    updatedSlots[index][field] = value;
    setSlots(updatedSlots);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Filter the slots to ensure start and end times are both provided
    const formattedSlots = slots.filter(
      (slot) => slot.startTime && slot.endTime
    );

    // If no valid slots are available, show an error
    if (formattedSlots.length === 0) {
      setLoading(false);
      setError(
        "Please provide valid start and end times for at least one slot."
      );
      return;
    }

    const availabilityData = {
      doctorId: doctorId,
      date: date,
      slots: formattedSlots,
    };

    console.log("Sending Availability Data:", availabilityData); // Debug log

    try {
      // Send the POST request using axios
      await axios.post(
        "http://localhost:3000/api/v1/doctorAvailability",
        availabilityData
      );

      // Reset the form and messages after successful submission
      setDate("");
      setSlots([{ startTime: "", endTime: "" }]);
      setSuccess(true);
      setLoading(false);

      // Optional: Reset success message after a short delay
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      setLoading(false);
      setError("Failed to create availability. Please try again.");
      console.error("Error creating availability:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <p className="mt-2 text-gray-500">ID: {doctor.id}</p>

      <h2 className="text-3xl font-semibold text-center text-gray-800">
        Create New Availability
      </h2>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      {success && (
        <p className="text-green-500 text-center mt-4">
          Availability created successfully!
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {/* Date Picker */}
        <div>
          <label htmlFor="date" className="block text-gray-700">
            Select Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
            required
          />
        </div>

        {/* Slots Section */}
        <div>
          <label className="block text-gray-700">Available Slots</label>
          {slots.map((slot, index) => (
            <div key={index} className="flex space-x-4 mt-3">
              <div className="w-1/2">
                <input
                  type="time"
                  value={slot.startTime}
                  onChange={(e) =>
                    handleSlotChange(index, "startTime", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="w-1/2">
                <input
                  type="time"
                  value={slot.endTime}
                  onChange={(e) =>
                    handleSlotChange(index, "endTime", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddSlot}
            className="mt-4 text-indigo-600 hover:text-indigo-700"
          >
            + Add Another Slot
          </button>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className={`px-6 py-3 rounded-lg text-white ${
              loading ? "bg-gray-500" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Availability"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAvailability;
