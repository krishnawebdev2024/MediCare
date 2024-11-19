// AvailableDates.js
import { useState, useEffect } from "react";
import axios from "axios";

const AvailableDates = ({ doctorId, onDateSelect }) => {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    if (doctorId) {
      const fetchDates = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/v1/availability/${doctorId}`
          );
          setDates(response.data); // Assuming response contains a list of available dates
        } catch (error) {
          console.error("Error fetching available dates", error);
        }
      };

      fetchDates();
    }
  }, [doctorId]);

  return (
    <div>
      <h2>Select a Date</h2>
      {dates.length > 0 ? (
        <select onChange={(e) => onDateSelect(e.target.value)}>
          <option value="">Select a date</option>
          {dates.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
      ) : (
        <p>No available dates for this doctor</p>
      )}
    </div>
  );
};

export default AvailableDates;
