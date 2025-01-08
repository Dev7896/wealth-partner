const otpGenerator = require("otp-generator");

function generateOtp() {
  const otp = otpGenerator.generate(6, {
    digits: true, // Ensure the OTP is numeric
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
  return otp;
}

module.exports = generateOtp;

