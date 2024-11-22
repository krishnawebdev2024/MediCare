import { useContext, createContext, useReducer, useEffect } from "react";
import axios from "axios";
import doctorsReducer from "../reducers/doctorsReducer";

const DoctorContext = createContext();

const initialState = {
  loading: false,
  doctor: null,
  doctors: [],
  error: null,
};

export const DoctorProvider = ({ children }) => {
  const [{ loading, doctor, doctors, error }, dispatch] = useReducer(
    doctorsReducer,
    initialState
  );

  const API_URL = "http://localhost:3000";

  // Login action for doctor
  const login = async (email, password) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const response = await axios.post(
        ` ${API_URL}/api/v1/doctors/login`,
        { email, password },
        { withCredentials: true }
      );

      if (response.data && response.data.doctor) {
        const doctorData = response.data.doctor;
        localStorage.setItem("loggedInDoctor", JSON.stringify(doctorData));

        dispatch({ type: "LOGIN", payload: doctorData });
        return doctorData;
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (err) {
      dispatch({
        type: "SET_ERROR",
        payload: err.response?.data?.message || "Login failed",
      });
      throw err;
    }
  };

  // Fetch all doctors
  const getDoctors = async () => {
    dispatch({ type: "SET_LOADING" });
    try {
      const response = await axios.get(`${API_URL}/api/v1/doctors`);
      dispatch({ type: "SET_DOCTORS", payload: response.data });
    } catch (err) {
      dispatch({
        type: "SET_ERROR",
        payload: err.response?.data?.message || "Failed to retrieve doctors",
      });
    }
  };

  // Fetch doctor by ID
  const getDoctorById = async (id) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const response = await axios.get(`${API_URL}/api/v1/doctors/${id}`);
      dispatch({ type: "SET_DOCTOR", payload: response.data });
    } catch (err) {
      dispatch({
        type: "SET_ERROR",
        payload: err.response?.data?.message || "Failed to retrieve doctor",
      });
    }
  };

  // Logout action for doctor
  const logout = async () => {
    dispatch({ type: "SET_LOADING" });
    try {
      await axios.post(
        `${API_URL}/api/v1/doctors/logout`,
        {},
        { withCredentials: true }
      );

      localStorage.removeItem("loggedInDoctor");

      dispatch({ type: "LOGOUT" });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: "Logout failed" });
    }
  };

  // Check session for doctor
  const checkSession = async () => {
    dispatch({ type: "SET_LOADING" });
    try {
      const response = await axios.get(`${API_URL}/api/v1/doctors/session`, {
        withCredentials: true,
      });
      if (response.data.authenticated) {
        dispatch({ type: "SET_DOCTOR", payload: response.data.doctor });
      } else {
        dispatch({ type: "LOGOUT" });
      }
    } catch (err) {
      //      console.error("Error checking session:", err);
      dispatch({ type: "LOGOUT" });
    }
  };

  // Check session on mount
  useEffect(() => {
    checkSession();
  }, []);

  return (
    <DoctorContext.Provider
      value={{
        doctor,
        doctors,
        loading,
        error,
        login,
        logout,
        getDoctors,
        getDoctorById,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};

export const useDoctorContext = () => useContext(DoctorContext);
