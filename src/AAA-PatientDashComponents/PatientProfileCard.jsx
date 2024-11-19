import React from "react";
import { useAuthContext } from "../contexts/userContext";

const PatientProfileCard = () => {
  const { user, loading, error } = useAuthContext();

  if (loading) {
    return <h1 className="text-center text-xl">Loading...</h1>;
  }

  if (error) {
    return <h1 className="text-center text-xl text-red-500">{error}</h1>;
  }

  if (!user) {
    return <h1 className="text-center text-xl">No user logged in</h1>;
  }

  return (
    <div className="flex justify-center py-10">
      <div className="max-w-sm w-full bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
        {/* Image */}
        <img
          src={user.image}
          alt={user.name}
          className="w-full h-48 object-cover object-center"
        />

        {/* Card content */}
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
          <p className="text-sm text-gray-600">{user.role}</p>
          <p className="mt-2 text-gray-500">ID: {user.id}</p>
          <p className="mt-1 text-gray-500">Email: {user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default PatientProfileCard;
