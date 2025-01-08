const mongoose = require("mongoose");
const generateOtp = require("../services/otpGenerator");
const sendOtpEmail = require("../services/otpGenerator");

const otpSchema = new mongoose.Schema(
  {
    otpCode: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    purpose: {
      type: String,
      enum: ["signup", "resetPassword"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

otpSchema.statics.createOtp = async function (email, purpose) {
  const otpCode = generateOtp();
  const expiresAt = Date.now() + 3 * 60 * 1000; // Setting expiry to 3 minutes from now

  const otp = new this({
    otpCode,
    email,
    expiresAt,
    purpose,
  });

  await otp.save();
  return otpCode;
};

otpSchema.statics.verifyOtp = async function (email, otpCode, purpose) {
  const otp = await this.findOne({
    email,
    otpCode,
    purpose,
    expiresAt: { $gt: Date.now() }, // Ensure the OTP has not expired
    verified: false, // Ensure it hasn't been used
  });

  if (!otp) {
    throw new Error("Invalid or expired OTP");
  }

  // Mark as verified
  otp.verified = true;
  await otp.save();

  return true; // OTP is valid and verified
};

const OTP = mongoose.model("OTP", otpSchema);

module.exports = OTP;
