import React, { useState } from "react";
import axios from "axios";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [availability, setAvailability] = useState(null); // To store availability data

  // Function to fetch doctors on button click
  const fetchDoctors = async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch("http://localhost:3000/api/v1/doctors");
      const data = await response.json();
      setDoctors(data); // Set doctors data
    } catch (err) {
      setError("Failed to fetch doctors"); // Set error if fetch fails
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Function to fetch doctor's availability by their ID on button click
  const fetchAvailability = async (doctorId) => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/doctorAvailability/${doctorId}`
      );
      setAvailability(response.data); // Store availability data
    } catch (err) {
      console.error("Error fetching availability:", err);
      setError("Failed to fetch availability"); // Set error if fetch fails
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div>
      <h1>Doctors List</h1>
      {/* Button to fetch doctors */}
      <button
        onClick={fetchDoctors}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Fetch Doctors
      </button>
      {loading && <p>Loading...</p>} {/* Show loading indicator */}
      {error && <p>{error}</p>} {/* Display error message if any */}
      {/* Display list of doctors */}
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor.id} className="mt-2">
            {doctor.name}
            {/* Button to fetch availability for each doctor */}
            <button
              onClick={() => fetchAvailability(doctor.id)}
              className="bg-green-500 text-white p-2 ml-2 rounded"
            >
              Check Availability
            </button>
          </li>
        ))}
      </ul>
      {/* Display availability if available */}
      {availability && (
        <div className="mt-4">
          <h3 className="text-lg font-bold">Doctor Availability</h3>
          <ul>
            {availability.map((slot, index) => (
              <li key={index} className="mt-1">
                {slot.startTime} - {slot.endTime}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DoctorList;
