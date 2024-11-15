import { useAdminContext } from "../contexts/adminContext";
import { useNavigate } from "react-router-dom";

const LogoutAdmin = () => {
  const { logout, loading, error } = useAdminContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); // Calls the logout function from context
      navigate("/admin-login"); // Redirect to admin login page after successful logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Logging out...</p> // Show loading text while logging out
      ) : (
        <button onClick={handleLogout} className="w-full btn btn-primary">
          Logout
        </button>
      )}
      {error && <p className="text-red-500">{error}</p>}{" "}
      {/* Display error if it occurs */}
    </div>
  );
};

export default LogoutAdmin;
