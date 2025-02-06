import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const PrivateRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null);
  const [paymentDone, setPaymentDone] = useState(true); // Default to true
  const token = Cookies.get("authToken");
  const email = Cookies.get("email");

  useEffect(() => {
    const verifyToken = async () => {
      if (!token || !email) {
        setIsValid(false);
        return;
      }
      try {
        const response = await axios.post("http://localhost:8080/verifyToken", {
          email,
          token,
        });

        if (response.data.paymentDone === false) {
          setPaymentDone(false);
        }

        setIsValid(response.data.valid); 
      } catch (error) {
        console.error("Token verification failed", error.message);
        setIsValid(false);
      }
    };

    verifyToken();
  }, [token, email]);

  if (isValid === null) {
    return <div>Loading...</div>; // Show loading while verifying
  }

  if (!paymentDone) {
    return <Navigate to="/pricing" />;
  }
  if (!isValid) {
    return <Navigate to="/login" />;
  }
// console.log(paymentDone  , isValid)

  return children; // Render protected content if valid and payment is done
};

export default PrivateRoute;
