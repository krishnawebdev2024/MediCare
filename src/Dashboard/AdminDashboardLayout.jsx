import React, { useState } from "react";

import UpdateBookingStatus from "../A-AdminDashComponents/UpdateBookingStatus";
import AdminProfileCard from "../A-AdminDashComponents/AdminProfileCard ";
import Inbox from "../A-AdminDashComponents/Inbox";

import LogoutAdmin from "../02-AdminAccountCreate/LogoutAdmin";

// Main Dashboard Layout
const AdminDashboardLayout = () => {
  const [activeComponent, setActiveComponent] = useState("profile");

  // Determine what to render based on the activeComponent state
  const renderContent = () => {
    switch (activeComponent) {
      case "profile":
        return <AdminProfileCard />;

      case "updateBookingStatus": // Add this case for UpdateBookingStatus
        return <UpdateBookingStatus />;

      case "inbox": // Add this case for Inbox
        return <Inbox />;

      case "logout":
        return <LogoutAdmin />;
      default:
        return <AdminProfileCard />;
    }
  };

  return (
    <div className="flex min-h-screen mt-[80px] dark:bg-gray-900">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-64 p-4 dark:bg-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-white">Admin Dashboard</h2>
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
          {/* Inbox Button */}
          <button
            className={`w-full text-left p-3 rounded-md ${
              activeComponent === "inbox" ? "bg-gray-600" : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveComponent("inbox")} // Switch to Inbox
          >
            Inbox
          </button>

          {/* Update Booking Status Button */}
          <button
            className={`w-full text-left p-3 rounded-md ${
              activeComponent === "updateBookingStatus"
                ? "bg-gray-600"
                : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveComponent("updateBookingStatus")} // Switch to UpdateBookingStatus
          >
            Update Booking Status
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

export default AdminDashboardLayout;
