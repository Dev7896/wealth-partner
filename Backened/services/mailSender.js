const nodemailer = require('nodemailer');
require('dotenv').config();

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'Gmail', 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

const sendOtpEmail = async (recipientEmail, otpCode, purpose) => {
  try {
    // Email content
    const subject = `Your OTP for ${purpose}`;
    const htmlContent = `
      <p>Hello,</p>
      <p>Your OTP for ${purpose} is: <strong>${otpCode}</strong></p>
      <p>This OTP is valid for 5 minutes. If you did not request this, please ignore this email.</p>
      <p>Best regards,<br>Wealth Partner Management Team</p>
    `;

    // Email options
    const mailOptions = {
      from: `"Wealth Partner" <${process.env.EMAIL_USER}>`, // Sender's name and email
      to: recipientEmail,
      subject,
      html: htmlContent,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('OTP email sent successfully');
  } catch (error) {
    console.error('Error sending OTP email:', error.message);
    throw new Error('Failed to send OTP email');
  }
};

module.exports = sendOtpEmail;
