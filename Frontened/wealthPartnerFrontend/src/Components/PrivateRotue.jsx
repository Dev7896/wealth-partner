import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const PrivateRoute = ({ children }) => {
  const token = Cookies.get("authToken");

  // If no token exists, redirect to login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Verify the token with the backend
  const verifyToken = async () => {
    try {
      const response = await axios.post("http://localhost:8080/verifyToken", {
        token,
      });
      return response.data.valid; // Backend should return { valid: true/false }
    } catch (error) {
      console.error("Token verification failed", error.message);
      return false;
    }
  };

  // Verify token before rendering
  const isValid = verifyToken();

  if (!isValid) {
    return <Navigate to="/login" />;
  }

  return children; // Render the protected content if valid
};

export default PrivateRoute;
