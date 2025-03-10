export { default as Signup } from "../../pages/Signup";
export { default as Login } from "../../pages/Login";
export { default as ForgetPassword } from "../../pages/ForgetPassword";
import otpGenerator from "otp-generator";

export const sendOtpRequest = async (email) => {
  try {
    const response = await fetch("https://your-backend.com/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (data.success) {
      console.log("OTP sent successfully");
    }
  } catch (error) {
    console.error("Error sending OTP:", error);
  }
};
