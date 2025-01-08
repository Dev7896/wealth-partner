import axios from "axios";
import swal from "sweetalert2";

export const verifyEmail = async (email) => {
  const API_KEY = "YOUR_ZEROBOUNCE_API_KEY"; // Replace with your actual API key
  const url = `https://api.zerobounce.net/v2/validate`;

  try {
    const response = await axios.get(url, {
      params: {
        api_key: "21172af77a5d4cf1814a8468dfd631e8",
        email: email,
      },
    });

    // Extract and return the response data
    const { status, sub_status, free_email, did_you_mean } = response.data;

    if (status === "valid") {
      console.log("The email is valid!");
      return true; // The email is valid
    } else {
      console.log(`Email invalid: ${status}, ${sub_status}`);
      if (did_you_mean) {
        console.log(`Did you mean: ${did_you_mean}?`);
      }
      return false; // The email is invalid
    }
  } catch (error) {
    console.error("Error verifying email:", error.message);
    throw error; // Handle error appropriately
  }
};

export function showMessage(message, icon) {
  swal.fire({
    title: `${message}`,
    icon: `${icon}`,
    timer: 6000,
    showCancelButton: true,
  });
}
