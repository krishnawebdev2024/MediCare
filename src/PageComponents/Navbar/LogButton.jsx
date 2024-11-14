import React, { useState, useEffect } from "react";

const LogButton = () => {
  const [buttonText, setButtonText] = useState("Login");

  useEffect(() => {
    // Check if token cookie is present by looking for 'token' in document.cookie
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));

    // If token exists, set button text to "Logout", else "Login"
    if (token) {
      setButtonText("Logout");
    } else {
      setButtonText("Login");
    }
  }, []);

  return (
    <nav className="p-4 bg-blue-600 text-white">
      <button className="bg-white text-blue-600 px-4 py-2 rounded">
        {buttonText}
      </button>
    </nav>
  );
};

export default LogButton;
