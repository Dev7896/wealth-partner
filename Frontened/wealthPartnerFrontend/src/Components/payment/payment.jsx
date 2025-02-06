import React, { useState } from "react";
import axios from "axios";
import { showMessage } from "../LoginSections/SignupUtility";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const Payment = () => {
  const [redirect, setRedirect] = useState(false);
  const email = Cookies.get("email");

  const handlePayment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/payment/create-order",
        {
          email: email,
          amount: 500, // Amount in INR
        }
      );

      const { id, amount, currency } = response.data;

      const options = {
        key: "rzp_test_cqAaHl8YookqUc", // Replace with Razorpay Test Key ID
        amount,
        currency,
        name: "Wealth Partner",
        description: "Test Transaction",
        order_id: id,
        handler: (response) => {
          showMessage("Payment successful", "success");
          setRedirect(true); // ✅ Set state to trigger navigation
        },
        prefill: {
          name: "John Doe",
          email: email,
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ If redirect is true, navigate to /mainpage
  if (redirect) {
    return <Navigate to="/mainpage" />;
  }

  return (
    <button className="mt-8 landscape:self-start" onClick={handlePayment}>
      Purchase Plan
    </button>
  );
};

export default Payment;
