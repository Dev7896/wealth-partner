import React from "react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import VerifOtp from "./VerifyOtp";
import { verifyEmail } from "./SignupUtility.js";
import { Link } from "react-router-dom";
import swal from "sweetalert2";
import loop from "../../assets/loop.svg";
import axios from "axios";
import { showMessage } from "./SignupUtility.js";
import Header from "../LandingPage/Header.jsx";
import { useNavigate } from "react-router-dom";
import signup from '../../assets/signup.svg'
// import '../../styles/LandingPage.css'

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
  const purpose = "signup";

  let [step, setStep] = useState(1);
  let [resetOtpKey, setResetOtpKey] = useState(0);
  let [otpRequestSend, setOtpRequestSend] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleEmailSubmit = async (data) => {
    const { email } = data;
    // const emailVerified = await verifyEmail(email);

    // if (!emailVerified) {
    //   showMessage("Invalid email", "error");
    //   return false;
    // }

    try {
      const response = await axios.post("http://localhost:8080/generateOtp", {
        email: email,
        purpose: purpose,
      });

      const result = response.data;

      console.log(result);

      if (result.success) {
        showMessage(result.success, "success");
        setOtpRequestSend(!otpRequestSend);
        // setStep(2);
      } else {
        showMessage(result.error, "error");
      }
    } catch (error) {
      console.error(error.message);
      showMessage("Error sending OTP", "error");
    }
  };

  async function handleFullFormSubmit(data) {
    const { username, email, password } = data;
    try {
      const response = await axios.post("http://localhost:8080/register", {
        username,
        email,
        password,
      });
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

  const [isChecked, setChecked] = useState(false);

  function handleClick() {
    setChecked(!isChecked);
  }

  return (
    <>
      <Header />
      <div className="form-wrapper">
        <form
          onSubmit={
            step === 1
              ? handleSubmit(handleEmailSubmit) // handling email
              : handleSubmit(handleFullFormSubmit) // handling full form
          }
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "16px",
            }}
          >
            <span style={{ fontSize: "large", marginRight: "6px" }}>
              Create an
            </span>
            <div className="container-tag">
              <p className="tag">Account</p>
              <img src={loop} alt="first image" className="circle" />
            </div>
          </div>
          <>
            <div style={{ position: "relative" }}>
              <input
                type="text"
                id="username"
                {...register("username", {
                  required: "username is required",
                  minLength: {
                    value: 3,
                    message: "username must be at least 3 characters",
                  },
                })}
                placeholder="Enter your username"
                disabled={otpRequestSend}
              />
              <i class="ri-user-3-fill ri-lg for-icon"></i>
              {errors.username && (
                <p className="error">{errors.username.message}</p>
              )}
            </div>
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

              <div className="checkbox">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleClick}
                />
                <p
                  style={{ display: "inline", cursor: "pointer" }}
                  onClick={handleClick}
                >
                  I agree to the terms and conditions
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Link className="link" to="/login">
                  Already a user?
                </Link>

                <button
                  id="submit"
                  type="submit"
                  disabled={isSubmitting || !isChecked}
                >
                  Signup
                </button>
              </div>
            </>
          )}
        </form>
        <img className="image" src={signup} alt="signup image" />
      </div>
    </>
  );
}
