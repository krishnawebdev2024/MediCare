import React from "react";
import { useAuthContext } from "../contexts/userContext";

const PatientProfileCard = () => {
  const { user, loading, error } = useAuthContext();

  if (loading) {
    return (
      <h1 className="text-center text-2xl text-indigo-500 font-bold">
        Loading...
      </h1>
    );
  }

  if (error) {
    return (
      <h1 className="text-center text-2xl text-red-600 font-bold">{error}</h1>
    );
  }

  if (!user) {
    return (
      <h1 className="text-center text-2xl text-gray-500">No user logged in</h1>
    );
  }

  return (
    <div className="flex justify-center items-center ">
      <div className="flex flex-col md:flex-row max-w-4xl w-full bg-white dark:bg-gray-800 shadow-xl rounded-3xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
        {/* Image Section */}
        <div className="w-full md:w-1/3 bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
          <img
            src={user.image}
            alt={user.name}
            className="w-40 h-40 rounded-full border-4 border-white shadow-lg"
          />
        </div>

        {/* Content Section */}
        <div className="w-full md:w-2/3 p-8">
          <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-2">
            {user.name}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            {user.role}
          </p>
          <div className="space-y-3">
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              <span className="font-bold">ID:</span> {user._id}
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              <span className="font-bold">Email:</span> {user.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfileCard;
