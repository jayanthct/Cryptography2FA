import React, { useState } from "react";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";

const TwoFactor = () => {
  const location = useLocation();
  const history = useHistory();
  const { userId } = location.state;

  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/verify-2fa", {
        userId,
        code,
      });

      // On successful verification, store JWT and redirect to dashboard
      localStorage.setItem("jwt", response.data.token);
      history.push("/dashboard");
    } catch (err) {
      setError("Invalid 2FA code or server error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Enter 2FA Code</h2>
        <form onSubmit={handleVerify}>
          <input
            type="text"
            placeholder="Enter 2FA Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default TwoFactor;
