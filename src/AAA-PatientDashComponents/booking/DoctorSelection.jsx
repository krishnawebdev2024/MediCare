// DoctorSelection.js
import { useState, useEffect } from "react";
import axios from "axios";

const DoctorSelection = ({ onDoctorSelect }) => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Fetch the list of doctors when the component mounts
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/doctors"
        );
        setDoctors(response.data); // Assuming response returns an array of doctors
      } catch (error) {
        console.error("Error fetching doctors", error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div>
      <h2>Select a Doctor</h2>
      <select onChange={(e) => onDoctorSelect(e.target.value)}>
        <option value="">Select a doctor</option>
        {doctors.map((doctor) => (
          <option key={doctor._id} value={doctor._id}>
            {doctor.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DoctorSelection;
