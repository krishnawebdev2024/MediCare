// AvailableSlots.js
import { useState, useEffect } from "react";
import axios from "axios";

const AvailableSlots = ({ doctorId, selectedDate, onSlotSelect }) => {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    if (doctorId && selectedDate) {
      const fetchSlots = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/v1/slots/${doctorId}?date=${selectedDate}`
          );
          setSlots(response.data); // Assuming response contains a list of available slots
        } catch (error) {
          console.error("Error fetching available slots", error);
        }
      };

      fetchSlots();
    }
  }, [doctorId, selectedDate]);

  return (
    <div>
      <h2>Select a Slot</h2>
      {slots.length > 0 ? (
        <select onChange={(e) => onSlotSelect(e.target.value)}>
          <option value="">Select a slot</option>
          {slots.map((slot) => (
            <option key={slot.startTime} value={slot.startTime}>
              {slot.startTime} - {slot.endTime}
            </option>
          ))}
        </select>
      ) : (
        <p>No available slots for this date</p>
      )}
    </div>
  );
};

export default AvailableSlots;
