import React, { useState } from "react";
import DoctorProfileCard from "../AA-DoctorDashComponents/DoctorProfileCard";
import LogoutDoctor from "../03-DoctorAccountCreate/LogoutDoctor";

// Components for each section
const Analytics = () => (
  <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-md">
    <h1 className="text-xl font-bold mb-4 text-black dark:text-white">
      Analytics
    </h1>
    <p className="text-gray-700 dark:text-gray-300">
      Analytics and performance data go here.
    </p>
  </div>
);

const Settings = () => (
  <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-md">
    <h1 className="text-xl font-bold mb-4 text-black dark:text-white">
      Settings
    </h1>
    <p className="text-gray-700 dark:text-gray-300">
      Settings and preferences go here.
    </p>
  </div>
);

// Main Dashboard Layout
const DoctorDashboardLayout = () => {
  const [activeComponent, setActiveComponent] = useState("profile");

  // Determine what to render based on the activeComponent state
  const renderContent = () => {
    switch (activeComponent) {
      case "profile":
        return <DoctorProfileCard />;
      case "analytics":
        return <Analytics />;
      case "settings":
        return <Settings />;
      case "logout":
        return <LogoutDoctor />;
      default:
        return <Analytics />;
    }
  };

  return (
    <div className="flex h-screen mt-[80px] dark:bg-gray-900">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-64 p-4 dark:bg-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-white">Doctor Dashboard</h2>
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
          <button
            className={`w-full text-left p-3 rounded-md ${
              activeComponent === "analytics"
                ? "bg-gray-600"
                : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveComponent("analytics")}
          >
            Analytics
          </button>
          <button
            className={`w-full text-left p-3 rounded-md ${
              activeComponent === "settings"
                ? "bg-gray-600"
                : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveComponent("settings")}
          >
            Settings
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

export default DoctorDashboardLayout;
