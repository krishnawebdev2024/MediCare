import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboardLayout = () => {
  const [doctors, setDoctors] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch doctors when the component mounts
  useEffect(() => {
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

    fetchDoctors();
  }, []); // Empty dependency array, so it runs once on component mount

  // Fetch doctor's availability when doctorId changes
  useEffect(() => {
    if (doctors.length > 0) {
      // Assume that we are fetching availability for the first doctor
      const doctorId = doctors[0]._id;
      const fetchAvailability = async () => {
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

      fetchAvailability();
    }
  }, [doctors]); // Runs when doctors data changes (after it's fetched)

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <h2>Doctors</h2>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor._id}>{doctor.name}</li>
        ))}
      </ul>

      <h2>Doctor Availability</h2>
      <ul>
        {availability.map((slot) => (
          <li key={slot._id}>
            {slot.startTime} - {slot.endTime}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboardLayout;
