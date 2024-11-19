import React from "react";
import { useDoctorContext } from "../contexts/doctorContext";

const DoctorProfileCard = () => {
  const { doctor, loading, error, checkSession } = useDoctorContext();

  if (loading) {
    return <h1 className="text-center text-xl text-gray-300">Loading...</h1>;
  }

  if (error) {
    return <h1 className="text-center text-xl text-red-500">{error}</h1>;
  }

  if (!doctor) {
    return (
      <h1 className="text-center text-xl text-gray-300">No doctor logged in</h1>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 py-10">
      <div className="max-w-md w-full bg-gray-800 text-white shadow-xl rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
        {/* Image */}
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-56 object-cover object-center rounded-t-lg"
        />

        {/* Card content */}
        <div className="p-6">
          <h2 className="text-3xl font-bold text-white mb-2">{doctor.name}</h2>
          <p className="text-sm text-gray-400 mb-4">{doctor.role}</p>
          <div className="space-y-2">
            <p className="text-gray-300">
              <span className="font-semibold">ID:</span> {doctor._id}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold">Email:</span> {doctor.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfileCard;
