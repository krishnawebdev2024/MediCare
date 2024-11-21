import React, { useEffect } from "react";
import { useAuthContext } from "../contexts/userContext"; // Assuming this is where your auth context is
import { useBooking } from "../doctorContextsAndBookingContexts/BookingContext"; // Assuming BookingContext is in this path

const BookedAppointments = () => {
  const { user, loading: userLoading, error: userError } = useAuthContext(); // Get user info from auth context
  const { fetchBookingsByPatient, bookings, loading, error } = useBooking(); // Get booking related functions from context

  useEffect(() => {
    if (user && user._id) {
      fetchBookingsByPatient(user._id); // Fetch bookings when user ID is available
    }
  }, [user]); // Run effect when user is available

  // Log the fetched data
  useEffect(() => {
    if (bookings && bookings.length > 0) {
      console.log("Fetched Bookings:", bookings); // Log bookings when they are available
    }
  }, [bookings]); // Run effect when bookings change

  if (userLoading) {
    return (
      <p className="text-center text-gray-500">Loading user information...</p>
    );
  }

  if (userError) {
    return (
      <p className="text-center text-red-500">
        Error loading user data: {userError}
      </p>
    );
  }

  if (loading) {
    return <p className="text-center text-gray-500">Loading bookings...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-500">
        Error fetching bookings: {error}
      </p>
    );
  }

  return (
    <div className="p-6 dark:bg-gray-800 bg-slate-50 text-white min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-indigo-400">Your Bookings</h2>
      {bookings && bookings.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <li
              key={booking._id}
              className="bg-gray-800 border border-spacing-1 border-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-semibold text-slate-400">
                  {booking.doctorId.name}
                </h3>
                <span className="text-sm text-gray-400">
                  {new Date(booking.date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-300 mb-2">
                Email: {booking.doctorId.email}
              </p>
              <p className="text-gray-300 mb-2">
                Status:{" "}
                <span
                  className={`font-semibold ${
                    booking.status === "pending"
                      ? "text-yellow-400"
                      : "text-green-500"
                  }`}
                >
                  {booking.status}
                </span>
              </p>
              <p className="text-gray-300">
                Slot: {booking.slot.startTime} - {booking.slot.endTime}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-400">
          No bookings found for this patient.
        </p>
      )}
    </div>
  );
};

export default BookedAppointments;
