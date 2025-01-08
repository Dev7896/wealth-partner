const User = require("../models/user");
const OTP = require("../models/otp");
const sendOtpEmail = require("../services/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Create a new user and save to the database
    const user = await User.create({ username, email, password });

    return res.status(201).json({ success: "User registered successfully" });
  } catch (error) {
    console.error(error);

    // Check for validation errors or other issues
    if (error.code === 11000) {
      // Duplicate email or username
      return res
        .status(400)
        .json({ error: "Email or Username already exists" });
    }

    // General error handling
    return res.status(500).json({ error: "Error registering user" });
  }
};

const validateLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if both fields are provided
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Find the user by email
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ error: "User Not Found" });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email }, // Payload
      process.env.JWT_SECRET, // Secret key (store securely in .env)
      { expiresIn: "3d" } // Expiry time (3 days)
    );

    // Send success response with the token
    return res.status(200).json({
      success: "Login successful",
      token, // Send the token
      user: { username: user.username, email: user.email }, // Optional user details
    });
  } catch (error) {
    console.error("Error in validateLogin:", error.message);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = validateLogin;

const forgetPassword = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    // Find the user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Update the password (triggers `pre-save` middleware to hash the password)
    user.password = password;
    await user.save();

    res.status(200).json({ success: "Password updated successfully" });
  } catch (error) {
    console.error("Error in forgetPassword:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const generateAndSend = async (req, res) => {
  const { email, purpose } = req.body;

  if (!email || !purpose) {
    return res.status(400).json({ error: "Email and purpose are required" });
  }

  try {
    const otp = await OTP.createOtp(email, purpose);
    await sendOtpEmail(email, otp, purpose);
    return res.status(200).json({ success: "OTP sent successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error sending OTP" });
  }
};

const otpVerification = async (req, res) => {
  const { email, otp, purpose } = req.body;

  try {
    const isVerified = await OTP.verifyOtp(email, otp, purpose);
    if (!isVerified) {
      return res.status(400).json({ error: "Invalid OTP or OTP expired" });
    }
    return res.status(200).json({ success: "OTP verified successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error verifying OTP" });
  }
};

const verifyToken = (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ valid: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.json({ valid: true });
  } catch (error) {
    return res.status(401).json({ valid: false });
  }
};

module.exports = {
  register,
  generateAndSend,
  otpVerification,
  validateLogin,
  forgetPassword,
  verifyToken,
};
