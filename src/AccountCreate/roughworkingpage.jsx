import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (error) setError(null);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/login",
        formData,
        { withCredentials: true }
      );
      setSuccess("Login successful!");
      setError(null);
      // Redirect user after successful login
      navigate("/Patientdashboard"); // Replace with the route you want to redirect after login
    } catch (error) {
      setError(
        error.response?.data?.message || "Login failed. Please try again."
      );
      setSuccess(null);
    }
  };

  return (
    <div className="w-screen overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center py-6 px-[80px] mt-[80px]">
      <div className="bg-[#EFC712] dark:bg-slate-600 w-full h-full rounded-3xl overflow-hidden p-8">
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto p-4 space-y-4 bg-white shadow-lg rounded-md"
        >
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Log In
          </button>

          {/* Added links for Doctor and Admin login */}

          <div className="mt-4 flex flex-row justify-between items-center space-x-6">
            <Link to="/doctor-login" className="text-blue-600 hover:underline">
              Login as Doctor
            </Link>
            <Link to="/admin-login" className="text-blue-600 hover:underline">
              Login as Admin
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
