import React from "react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import VerifOtp from "../Components/LoginSections/VerifyOtp.jsx";
import { verifyEmail } from "../Components/LoginSections/SignupUtility.js";
import { Link } from "react-router-dom";
import swal from "sweetalert2";
import loop from "../assets/loop.svg";
import axios from "axios";
import { showMessage } from "../Components/LoginSections/SignupUtility.js";
import Header from "../Components/LandingPage/Header.jsx";
import { useNavigate } from "react-router-dom";
import forget from '../assets/forget.svg'

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const email = watch("email");
  const password = watch("password");
  const eyeView = <i class="ri-eye-line ri-lg right"></i>;
  const eyeCrossView = <i class="ri-eye-off-line ri-lg right"></i>;
  const purpose = "resetPassword";

  let [step, setStep] = useState(1);
  let [resetOtpKey, setResetOtpKey] = useState(0);
  let [otpRequestSend, setOtpRequestSend] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const generateOtp = (length) => {
    let otp = "";
    for (let i = 0; i < length; i++) {
      otp += Math.floor(Math.random() * 10); // Generates a digit between 0-9
    }
    return otp;
  };

  const handleEmailSubmit = async (data) => {
    const { email } = data;

    // Generate OTP
    const id = generateOtp(6);

    try {
      // Send OTP
      const response = await axios.post(
        `http://localhost:8080/generateOtp/${id}`,
        {
          email,
          purpose,
        }
      );

      const result = response.data;

      if (result.success) {
        showMessage(result.success, "success");
        setOtpRequestSend(!otpRequestSend); // Move to next step
      } else {
        showMessage(result.error, "error");
      }
    } catch (error) {
      console.error(error.message);
      showMessage("Error sending OTP", "error");
    }
  };

  async function handleForgetPassword(data) {
    const { email } = data;
    try {
      const response = await axios.post(
        "http://localhost:8080/forgetPassword",
        {
          email,
          password,
        }
      );
      const result = response.data;
      if (result.success) {
        showMessage(result.success, "success");
        reset();
        setResetOtpKey((prevState) => prevState + 1);
        setOtpRequestSend(!otpRequestSend);
        setStep(1);
        navigate("/login");
      } else {
        showMessage(result.error, "error");
        navigate("/signup");
      }
      return true;
    } catch (error) {
      console.log("error", error.message);
    }
  }

  useEffect(() => {
    const passwordInputs = document.querySelectorAll(".password");
    passwordInputs.forEach((element) => {
      element.type = isPasswordVisible ? "text" : "password";
    });
  }, [isPasswordVisible]);
  function setView() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  // const [isChecked, setChecked] = useState(false);

  // function handleClick() {
  //   setChecked(!isChecked);
  // }

  return (
    <>
      <Header />
      <div className="form-wrapper">
      <form
        onSubmit={
          step === 1
            ? handleSubmit(handleEmailSubmit) // handling email
            : handleSubmit(handleForgetPassword) // handling full form
        }
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            // paddingLeft: "10%",
            marginTop: "16px",
          }}
        >
          <span style={{ fontSize: "large", marginRight: "6px" }}>Recover</span>
          <div className="container-tag">
            <p className="tag">Account</p>
            <img src={loop} alt="first image" className="circle" />
          </div>
        </div>
        <>
          <div style={{ position: "relative" }}>
            <input
              type="email"
              {...register("email", {
                required: "email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              })}
              placeholder="Enter your email"
              disabled={otpRequestSend}
            />
            <i class="ri-mail-fill ri-lg for-icon"></i>
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>
          <button disabled={isSubmitting}>send</button>

          {otpRequestSend && (
            <div>
              <VerifOtp
                resetKey={resetOtpKey}
                gmail={email}
                step={step}
                setStep={setStep}
                purpose={purpose}
              />
            </div>
          )}
        </>

        {step === 2 && (
          <>
            <div style={{ position: "relative" }}>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
                    message:
                      "Password must contain at least one uppercase letter, one number, and one special character",
                  },
                })}
                placeholder="Enter your password"
                className="password"
              />
              <i class="ri-lock-2-fill ri-lg for-icon"></i>
              <span onClick={setView}>
                {isPasswordVisible ? eyeView : eyeCrossView}
              </span>
              {errors.password && (
                <p className="error">{errors.password.message}</p>
              )}
            </div>

            <div style={{ position: "relative" }}>
              <input
                type="password"
                {...register("cnfpassword", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
                    message:
                      "Password must contain at least one uppercase letter, one number, and one special character",
                  },
                  validate: (value) =>
                    value === password || "passwords do not match",
                })}
                className="password"
                placeholder="confirm password"
              />
              <i class="ri-lock-2-fill ri-lg for-icon"></i>
              <span onClick={setView}>
                {isPasswordVisible ? eyeView : eyeCrossView}
              </span>
              {errors.cnfpassword && (
                <p className="error">{errors.cnfpassword.message}</p>
              )}
            </div>
            <button id="submit" type="submit" disabled={isSubmitting}>
              change
            </button>
          </>
        )}
      </form>
        <img className="image" src={forget} alt="" />
      </div>
    </>
  );
}
