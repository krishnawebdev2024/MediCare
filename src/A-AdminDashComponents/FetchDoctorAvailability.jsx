import React, { useState } from "react";
import { useAvailability } from "../doctorContextsAndBookingContexts/availabilityContext";

const FetchDoctorAvailability = () => {
  const { fetchAvailabilitiesById, availabilities, loading, error } =
    useAvailability();
  const [doctorId, setDoctorId] = useState("");

  const handleFetch = () => {
    if (doctorId) {
      fetchAvailabilitiesById(doctorId);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Fetch Doctor Availability</h2>

      {/* Input for Doctor ID */}
      <div className="mb-4">
        <input
          type="text"
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
          placeholder="Enter Doctor ID"
          className="border border-gray-300 p-2 rounded"
        />
        <button
          onClick={handleFetch}
          disabled={loading}
          className="ml-4 bg-blue-500 text-white p-2 rounded disabled:bg-gray-300"
        >
          {loading ? "Loading..." : "Fetch Availability"}
        </button>
      </div>

      {/* Error message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Display Availabilities */}
      {availabilities.length > 0 && !loading && (
        <div>
          <h3 className="text-xl mb-2">Available Dates and Slots:</h3>
          {availabilities.map((availability) => (
            <div
              key={availability._id}
              className="mb-4 p-4 border border-gray-200 rounded"
            >
              <h4 className="text-lg font-semibold">
                Date:{" "}
                {new Date(
                  availability.availability[0].date
                ).toLocaleDateString()}
              </h4>
              <div>
                {availability.availability[0].slots.map((slot) => (
                  <div key={slot._id} className="flex justify-between py-2">
                    <span>
                      {slot.startTime} - {slot.endTime}
                    </span>
                    <span>{slot.isBooked ? "Booked" : "Available"}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No availability found */}
      {availabilities.length === 0 && !loading && !error && (
        <p>No availability found for this doctor.</p>
      )}
    </div>
  );
};

export default FetchDoctorAvailability;
