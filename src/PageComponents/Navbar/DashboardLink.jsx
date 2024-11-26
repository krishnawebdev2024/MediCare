import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/userContext";
import { useDoctorContext } from "../../contexts/doctorContext";
import { useAdminContext } from "../../contexts/adminContext";

const DashboardLink = () => {
  const { user } = useAuthContext();
  const { doctor } = useDoctorContext();
  const { admin } = useAdminContext();

  // Determine the role and dashboard link
  const getDashboardLink = () => {
    if (admin?.role === "admin") {
      return (
        <Link
          to="/admindashboard"
          className="px-6 py-2 text-sm font-medium bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-500 transition-all duration-300"
        >
          Admin Dashboard
        </Link>
      );
    }
    if (doctor?.role === "doctor") {
      return (
        <Link
          to="/Doctordashboard"
          className="px-6 py-2 text-sm font-medium bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 dark:bg-green-700 dark:hover:bg-green-800 dark:focus:ring-green-500 transition-all duration-300"
        >
          Doctor Dashboard
        </Link>
      );
    }
    if (user?.role === "user") {
      return (
        <Link
          to="/Patientdashboard"
          className="px-6 py-2 text-sm font-medium bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-300 dark:bg-purple-700 dark:hover:bg-purple-800 dark:focus:ring-purple-500 transition-all duration-300"
        >
          Patient Dashboard
        </Link>
      );
    }
    // Fallback link
    return (
      <p className="text-gray-800 bg-yellow-100 border-l-4 border-yellow-500 px-4 py-2 rounded-md">
        Please log in to access your dashboard.
      </p>
    );
  };

  return (
    <div className="flex justify-center items-center mt-4">
      {getDashboardLink()}
    </div>
  );
};

export default DashboardLink;
