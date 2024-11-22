import React, { useEffect, useState } from "react";
import { useDoctorContext } from "../contexts/doctorContext";
import { useAvailability } from "../doctorContextsAndBookingContexts/availabilityContext";

const DoctorCards = () => {
  const { doctors, loading, error, getDoctors } = useDoctorContext();
  const {
    fetchAvailabilitiesById,
    availabilities,
    loading: availabilitiesLoading,
    error: availabilitiesError,
  } = useAvailability();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    getDoctors();
  }, []);

  const handleFetchAvailability = (doctorId) => {
    fetchAvailabilitiesById(doctorId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDoctor(null); // Reset selected doctor
  };

  const renderAvailabilitySlots = () => {
    return availabilities.map((availability) => (
      <div key={availability._id} className="p-4 border-b">
        <h4 className="text-lg font-semibold">
          {new Date(availability.date).toLocaleDateString()}
        </h4>
        {availability.slots.map((slot) => (
          <div
            key={slot._id}
            className="flex justify-between items-center mt-2"
          >
            <span>{`${slot.startTime} - ${slot.endTime}`}</span>
            <span
              className={`text-sm ${
                slot.isBooked ? "text-red-500" : "text-green-500"
              }`}
            >
              {slot.isBooked ? "Booked" : "Available"}
            </span>
          </div>
        ))}
      </div>
    ));
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
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {doctors.length === 0 ? (
        <p className="text-center text-gray-500 col-span-full">
          No doctors available.
        </p>
      ) : (
        doctors.map((doctor) => (
          <div
            key={doctor._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden p-2"
          >
            <img
              src={doctor.image}
              alt={`${doctor.name}'s avatar`}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {doctor.name}
              </h3>
              <p className="text-sm text-gray-500">{doctor.email}</p>
              <p className="mt-2 text-xs text-gray-400">
                Role:{" "}
                {doctor.role.charAt(0).toUpperCase() + doctor.role.slice(1)}
              </p>
              <p className="mt-2 mb-4 text-xs text-gray-600">
                Doctor ID: {doctor._id}
              </p>
              <div className="mt-4 flex flex-col space-y-3">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg"
                  onClick={() => handleFetchAvailability(doctor._id)}
                >
                  Show Availabilities
                </button>
              </div>
            </div>
          </div>
        ))
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                Availabilities for {selectedDoctor ? selectedDoctor.name : ""}
              </h2>
              <button
                className="text-red-500 font-bold"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
            <div className="overflow-y-auto max-h-80">
              {availabilitiesLoading ? (
                <div className="text-center text-gray-500">
                  Loading availabilities...
                </div>
              ) : availabilitiesError ? (
                <div className="text-center text-red-500">
                  Error fetching availabilities: {availabilitiesError}
                </div>
              ) : (
                renderAvailabilitySlots()
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorCards;
