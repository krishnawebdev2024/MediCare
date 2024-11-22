import React, { useEffect, useState } from "react";
import { useDoctorContext } from "../contexts/doctorContext";
import { useAvailability } from "../doctorContextsAndBookingContexts/availabilityContext";

const DoctorCards = () => {
  const { doctors, loading, error, getDoctors } = useDoctorContext();
  const {
    fetchAvailabilitiesById,
    availabilities,
    loading: availabilityLoading,
    error: availabilityError,
  } = useAvailability();

  const [doctorId, setDoctorId] = useState(null);

  useEffect(() => {
    getDoctors();
  }, []);

  const handleShowAvailabilities = (id) => {
    setDoctorId(id); // Set the selected doctor's ID
    fetchAvailabilitiesById(id); // Fetch availabilities for the selected doctor
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>Error fetching doctors: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 grid grid-cols-1 gap-8">
      {doctors.length === 0 ? (
        <p className="text-center text-gray-500 col-span-full">
          No doctors available.
        </p>
      ) : (
        doctors.map((doctor) => (
          <div
            key={doctor._id}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden p-4 flex flex-col lg:flex-row space-y-4 lg:space-y-0"
          >
            {/* Doctor Image and Details Section */}
            <div className="flex-shrink-0 w-full lg:w-1/3">
              <img
                src={doctor.image}
                alt={`${doctor.name}'s avatar`}
                className="w-full h-48 object-cover rounded-lg shadow-md"
              />
              <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">
                {doctor.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {doctor.email}
              </p>
              <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                Role:{" "}
                {doctor.role.charAt(0).toUpperCase() + doctor.role.slice(1)}
              </p>
              <p className="mt-2 mb-4 text-xs text-gray-600 dark:text-gray-300">
                Doctor ID: {doctor._id}
              </p>

              {/* Action Buttons */}
              <div className="mt-4 flex flex-col space-y-3">
                <button
                  className="bg-blue-500 dark:bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg"
                  onClick={() => handleShowAvailabilities(doctor._id)}
                >
                  Show Availabilities
                </button>
              </div>
            </div>

            {/* Availabilities Results Section */}
            <div className="flex-grow w-full lg:w-2/3 lg:pl-6">
              {doctor._id === doctorId && (
                <div className="w-full mt-6 lg:mt-0 lg:w-1/2 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md">
                  {availabilityLoading ? (
                    <p>Loading availabilities...</p>
                  ) : availabilityError ? (
                    <p className="text-red-500">{availabilityError}</p>
                  ) : availabilities.length === 0 ? (
                    <p>No availability found for this doctor.</p>
                  ) : (
                    <div>
                      <h3 className="text-xl mb-2 text-gray-800 dark:text-white">
                        Available Dates and Slots:
                      </h3>
                      {availabilities.map((availability) => (
                        <div
                          key={availability._id}
                          className="mb-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition duration-150 ease-in-out"
                        >
                          <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                            Date:{" "}
                            {new Date(
                              availability.availability[0].date
                            ).toLocaleDateString()}
                          </h4>
                          <div>
                            {availability.availability[0].slots.map((slot) => (
                              <div
                                key={slot._id}
                                className="flex justify-between py-2 text-gray-700 dark:text-gray-300"
                              >
                                <span>
                                  {slot.startTime} - {slot.endTime}
                                </span>
                                <span>
                                  {slot.isBooked ? "Booked" : "Available"}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default DoctorCards;
