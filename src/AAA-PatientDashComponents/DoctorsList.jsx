import React, { useEffect, useState } from "react";
import axios from "axios";

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [availability, setAvailability] = useState(null); // State to store availability data

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/doctors");
        const data = await response.json();
        setDoctors(data);
      } catch (err) {
        setError("Failed to fetch doctors");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Function to fetch doctor's availability by their ID
  const fetchAvailability = async (doctorId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/doctorAvailability/${doctorId}`
      );
      setAvailability(response.data); // Store the availability data in the state
    } catch (err) {
      console.error("Error fetching availability:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen dark:bg-gray-900">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen dark:bg-gray-900">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6 dark:bg-gray-900">
      {doctors.map((doctor) => (
        <div
          key={doctor._id}
          className="bg-white dark:bg-gray-800 dark:text-white rounded-lg shadow-md overflow-hidden"
        >
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold">{doctor.name}</h3>
            <p className="text-gray-600 dark:text-gray-400">{doctor.email}</p>
            <p className="text-gray-600 dark:text-gray-400">{doctor.role}</p>
            <p className="text-gray-600 dark:text-gray-400">ID: {doctor._id}</p>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => fetchAvailability(doctor._id)} // Fetch availability on button click
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none"
              >
                View Availability
              </button>
            </div>

            {/* Display availability */}
            {availability && availability[0]?.doctorId === doctor._id && (
              <div className="mt-4">
                <h4 className="text-lg font-semibold">Availability:</h4>
                {availability[0]?.availability.map((avail) => (
                  <div key={avail._id} className="mt-2">
                    <p className="text-sm font-semibold">
                      {new Date(avail.date).toLocaleDateString()}
                    </p>
                    <ul>
                      {avail.slots.map((slot) => (
                        <li key={slot._id} className="text-sm">
                          {slot.startTime} - {slot.endTime}{" "}
                          {slot.isBooked ? (
                            <span className="text-red-500">Booked</span>
                          ) : (
                            <span className="text-green-500">Available</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DoctorsList;
