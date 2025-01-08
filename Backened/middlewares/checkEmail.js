const { verifyEmail } = require("../services/verifyEmail");

async function checkEmail(req, res, next) {
  if (req.method === "POST" && req.path.startsWith("/generateOtp")) {
    const { email, purpose } = req.body;

    try {
      if (purpose === "resetPassword") {
        // For resetPassword, check if the email exists
        const emailVerified = await verifyEmail(email);

        if (!emailVerified) {
          return res.status(400).json({ error: "User doesn't exist" });
        }
      }

      // For registration or other purposes, skip email existence check
      next();
    } catch (error) {
      console.error("Error verifying email:", error.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    next();
  }
}

module.exports = {
  checkEmail
}