import React, { useState } from "react";
/* import DoctorProfileCard from "../AA-DoctorDashComponents/DoctorProfileCard";
import CreateAvailability from "../AA-DoctorDashComponents/CreateAvailability";
import GetAvailability from "../AA-DoctorDashComponents/GetAvailability"; // Import GetAvailability
import UpdateAvailability from "../AA-DoctorDashComponents/UpdateAvailability";
import DeleteAvailability from "../AA-DoctorDashComponents/DeleteAvailability"; */
import PatientProfileCard from "../AAA-PatientDashComponents/PatientProfileCard";
import DoctorsList from "../AAA-PatientDashComponents/DoctorsList";
import AppointmentBooking from "../AAA-PatientDashComponents/AppointmentBooking";

import Logout from "../01-UserAccountCreate/Logout";

// Main Dashboard Layout
const PatientDashboardLayout = () => {
  const [activeComponent, setActiveComponent] = useState("profile");

  // Determine what to render based on the activeComponent state
  const renderContent = () => {
    switch (activeComponent) {
      case "profile":
        return <PatientProfileCard />;
      case "doctors":
        return <DoctorsList />;
      case "appointmentBooking":
        return <AppointmentBooking />;

      /* Add more cases for other components */

      /*      case "createAvailability":
        return <CreateAvailability />;
      case "getAvailability": // Add this case for GetAvailability
        return <GetAvailability />;
      case "updateAvailability": // Add this case for UpdateAvailability
        return <UpdateAvailability />;
      case "deleteAvailability": // Add this case for DeleteAvailability
        return <DeleteAvailability />; */

      case "logout":
        return <Logout />;
      default:
        return <PatientProfileCard />;
    }
  };

  return (
    <div className="flex min-h-screen mt-[80px] dark:bg-gray-900">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-64 p-4 dark:bg-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-white">
          Patient Dashboard
        </h2>
        <nav className="space-y-4">
          <button
            className={`w-full text-left p-3 rounded-md ${
              activeComponent === "profile"
                ? "bg-gray-600"
                : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveComponent("profile")}
          >
            Profile
          </button>

          {/* Doctors List */}
          <button
            className={`w-full text-left p-3 rounded-md ${
              activeComponent === "doctors"
                ? "bg-gray-600"
                : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveComponent("doctors")}
          >
            View Available Doctors
          </button>

          {/* Appointment Booking */}
          <button
            className={`w-full text-left p-3 rounded-md ${
              activeComponent === "appointmentBooking"
                ? "bg-gray-600"
                : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveComponent("appointmentBooking")}
          >
            Book Appointment
          </button>

          {/* Logout Button */}
          <button
            className="w-full text-left p-3 mt-4 rounded-md text-red-500 hover:bg-gray-700"
            onClick={() => setActiveComponent("logout")}
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 dark:bg-gray-800">
        {renderContent()}
      </div>
    </div>
  );
};

export default PatientDashboardLayout;
