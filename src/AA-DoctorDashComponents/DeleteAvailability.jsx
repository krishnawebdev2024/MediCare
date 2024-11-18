import React, { useEffect } from "react";
import { useAvailability } from "../doctorContextsAndReducers/availabilityContext";
import { useDoctorContext } from "../contexts/doctorContext";

const DeleteAvailability = () => {
  const { doctor } = useDoctorContext();
  const {
    availabilities,
    fetchAvailabilities,
    deleteAvailability,
    loading,
    error,
  } = useAvailability();

  const doctorId = doctor?.id;

  // Fetch availabilities when the component mounts
  useEffect(() => {
    if (doctorId) {
      fetchAvailabilities(doctorId);
    }
  }, []);
  //}, [doctorId, fetchAvailabilities]);

  // Handle Delete
  const handleDelete = (availabilityId) => {
    if (window.confirm("Are you sure you want to delete this availability?")) {
      deleteAvailability(availabilityId);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4 dark:text-white">
        Delete Availability
      </h2>

      {/* Show Loading or Error */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Show Availabilities */}
      <ul className="space-y-4">
        {availabilities.map((availability) => (
          <li
            key={availability._id}
            className="p-4 border rounded flex flex-col space-y-4"
          >
            <div>
              <p className="dark:text-white">
                <strong>Date:</strong>{" "}
                {new Date(
                  availability.availability[0]?.date
                ).toLocaleDateString()}
              </p>
              <p className="dark:text-white">
                <strong>Slots:</strong>
              </p>
              <ul className="space-y-2">
                {availability.availability[0]?.slots.map((slot) => (
                  <li
                    key={slot._id}
                    className={`p-4 rounded-lg shadow-md flex justify-between items-center 
      ${
        slot.isBooked
          ? "bg-red-100 border-l-4 border-red-500"
          : "bg-green-100 border-l-4 border-green-500"
      }`}
                  >
                    <div>
                      <p className="font-semibold text-gray-800">
                        {slot.startTime} - {slot.endTime}
                      </p>
                      <p
                        className={`text-sm ${
                          slot.isBooked ? "text-red-500" : "text-green-500"
                        }`}
                      >
                        {slot.isBooked ? "Booked" : "Available to be Booked"}
                      </p>
                    </div>
                    <div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          slot.isBooked
                            ? "bg-red-500 text-white"
                            : "bg-green-500 text-white"
                        }`}
                      >
                        {slot.isBooked ? "Reserved" : "Free"}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => handleDelete(availability._id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 self-end"
            >
              Delete Availability
            </button>
          </li>
        ))}
      </ul>

      {/* No availabilities */}
      {availabilities.length === 0 && !loading && (
        <p className="text-gray-500">
          No availabilities found for this doctor.
        </p>
      )}
    </div>
  );
};

export default DeleteAvailability;
