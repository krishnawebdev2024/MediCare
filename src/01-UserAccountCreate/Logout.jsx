import { useAuthContext } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { logout, loading, error } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); // Calls the logout function from context

      navigate("/patient-login"); // Redirect to login page after successful logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Logging out...</p> // Show loading text while logging out
      ) : (
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 rounded-md font-bold text-white bg-blue-500 hover:bg-blue-600 
           dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 shadow-md"
        >
          Are you sure you want to log out?
        </button>
      )}
      {error && <p className="text-red-500">{error}</p>}{" "}
      {/* Display error if it occurs */}
    </div>
  );
};

export default Logout;
