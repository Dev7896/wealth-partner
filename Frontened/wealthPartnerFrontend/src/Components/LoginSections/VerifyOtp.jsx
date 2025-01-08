import React, { useRef, useState, useEffect } from "react";
import "../../styles/Form.css";
import Swal from "sweetalert2";
import axios from 'axios' ;
export default function OTPInput({ resetKey ,gmail ,step ,setStep ,purpose }) {
  const inputRefs = useRef([]); // To hold references to input fields
  const [otp, setOtp] = useState(new Array(6).fill("")); // For a 6-digit OTP

  useEffect(() => {
    setOtp(new Array(6).fill(""));
  }, [resetKey]);

  const handleChange = async (value, index) => {
    // Allow only digits
    if (!/^\d$/.test(value) && value !== "") return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to the next field if input is valid
    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
    // When the last field is filled, trigger OTP verification
    if (index === otp.length - 1 && value) {
      const otpCode = newOtp.join(""); // Combine all digits into a string
      await verifyOtp(otpCode , gmail , purpose);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        inputRefs.current[index - 1].focus(); // Move focus to the previous field
      }
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  const verifyOtp = async (otpCode , gmail , purpose) => {
    try {
      const response = await axios.post("http://localhost:8080/verifyOtp", {
        email: gmail,
        otp: otpCode,
        purpose: purpose,
      });
      // console.log("OTP Verified:", response.data.success);
      // alert("OTP verified successfully!");
      const result = response.data ;
      if(result.success){
        setStep(2) ;
      }
      Swal.fire({
        icon: "success",
        text: result.success,
        timer : 2000 ,
      })
    } catch (error) {
      console.error(
        "OTP Verification Failed:",
        error.response?.data || error.message
      );
      alert("OTP verification failed. Please try again.");
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("Text").slice(0, 6); // Allow only 6 digits
    const newOtp = otp.map((_, i) => pastedData[i] || "");
    setOtp(newOtp);

    // Automatically focus the last filled input
    const nextIndex = Math.min(pastedData.length, inputRefs.current.length) - 1;
    if (nextIndex >= 0) {
      inputRefs.current[nextIndex].focus();
    }
  };

  return (
    <div>
      <div className="otp">
        {otp.map((value, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={value}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            ref={(el) => (inputRefs.current[index] = el)} // Set ref for each input
            className="otp-input"
          />
        ))}
      </div>
    </div>
  );
}
