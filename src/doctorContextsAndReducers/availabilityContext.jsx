import React, { createContext, useReducer, useContext } from "react";
import axios from "axios";
import availabilityReducer from "./availabilityReducer";

// Initial State
const initialState = {
  availabilities: [],
  loading: false,
  error: null,
  success: false,
};

// Base URL for API
const API_URL = "http://localhost:3000/api/v1/doctorAvailability";

// Create Context
const AvailabilityContext = createContext();

// Custom Hook for Convenience
export const useAvailability = () => {
  return useContext(AvailabilityContext);
};

// Provider Component
const AvailabilityProvider = ({ children }) => {
  const [state, dispatch] = useReducer(availabilityReducer, initialState);

  // Fetch All Availabilities
  const fetchAvailabilities = async (doctorId) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const response = await axios.get(`${API_URL}/${doctorId}`);

      dispatch({ type: "SET_AVAILABILITIES", payload: response.data });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.response ? error.response.data.message : error.message,
      });
    }
  };

  // Create New Availability
  const createAvailability = async (availabilityData) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const response = await axios.post(API_URL, availabilityData);
      dispatch({
        type: "ADD_AVAILABILITY",
        payload: response.data.newAvailability,
      });
      dispatch({ type: "SET_SUCCESS" });

      // Reset success after a timeout
      setTimeout(() => {
        dispatch({ type: "RESET_SUCCESS" });
      }, 3000);
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.response ? error.response.data.message : error.message,
      });
    }
  };

  // Update Existing Availability
  const updateAvailability = async (availabilityId, updatedData) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const response = await axios.put(
        `${API_URL}/${availabilityId}`,
        updatedData
      );
      dispatch({
        type: "UPDATE_AVAILABILITY",
        payload: response.data.updatedAvailability,
      });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.response ? error.response.data.message : error.message,
      });
    }
  };

  // Delete Availability
  const deleteAvailability = async (availabilityId) => {
    dispatch({ type: "SET_LOADING" });
    try {
      await axios.delete(`${API_URL}/${availabilityId}`);
      dispatch({ type: "DELETE_AVAILABILITY", payload: availabilityId });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.response ? error.response.data.message : error.message,
      });
    }
  };

  // Value for Context
  const contextValue = {
    availabilities: state.availabilities,
    loading: state.loading,
    error: state.error,
    success: state.success,
    fetchAvailabilities,
    createAvailability,
    updateAvailability,
    deleteAvailability,
  };

  return (
    <AvailabilityContext.Provider value={contextValue}>
      {children}
    </AvailabilityContext.Provider>
  );
};

export default AvailabilityProvider;
