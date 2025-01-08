import loop from "../../assets/loop.svg";
import { useForm } from "react-hook-form";
import { showMessage } from "./SignupUtility.js";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/Form.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../LandingPage/Header.jsx";
import Cookies from "js-cookie";
import login from "../../assets/login.svg";

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const eyeView = <i class="ri-eye-line ri-lg right"></i>;
  const eyeCrossView = <i class="ri-eye-off-line ri-lg right"></i>;

  async function handleLogin(data) {
    try {
      const { email, password } = data;
      const response = await axios.post("http://localhost:8080/validateLogin", {
        email,
        password,
      });

      const result = response.data;

      if (result.success && result.token) {
        // Set JWT token in cookies with security attributes
        Cookies.set("authToken", result.token, {
          expires: 3, // 3 days
          secure: true, // Ensures the cookie is sent over HTTPS
          sameSite: "Strict", // Prevents CSRF attacks
          path: "/", // Accessible to the whole site
        });

        showMessage(result.success, "success");
        navigate("/mainpage");
      }
    } catch (error) {
      showMessage("Invalid email or password", "error");
      console.error(error.message);
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
  const [rememberMe, setRememberMe] = useState(false);

  function handleClick() {
    setChecked(!isChecked);
  }
  function handleRememberMe() {
    setRememberMe(!rememberMe);
  }

  return (
    <>
      <Header />
      <div className="form-wrapper">
        <form onSubmit={handleSubmit(handleLogin)}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              // paddingLeft: "10%",
              marginTop: "16px",
            }}
          >
            <span style={{ fontSize: "large", marginRight: "6px" }}>
              Register
            </span>
            <div className="container-tag">
              <p className="tag">Account</p>
              <img src={loop} alt="first image" className="circle" />
            </div>
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
            />
            <i class="ri-mail-fill ri-lg for-icon"></i>
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>

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
          <div className="checkbox">
            <input type="checkbox" checked={isChecked} onChange={handleClick} />
            <p
              style={{ display: "inline", cursor: "pointer" }}
              onClick={handleClick}
            >
              I agree to the terms and conditions
            </p>
          </div>
          <div className="checkbox">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={handleRememberMe}
            />
            <p
              style={{ display: "inline", cursor: "pointer" }}
              onClick={handleRememberMe}
            >
              remember me
            </p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link className="link" to="/forgetPassword">
              Forget password?
            </Link>

            <button
              id="submit"
              type="submit"
              disabled={isSubmitting || !isChecked}
            >
              Login
            </button>
          </div>
        </form>
        <img className="image" src={login} alt="description" />
      </div>
    </>
  );
}
