require('dotenv').config();  // Make sure to load the .env file

const nodemailer = require("nodemailer");

// Nodemailer transporter using the values from .env
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,  // Use the SMTP host from the environment variables
  port: process.env.SMTP_PORT,  // Use the SMTP port from the environment variables
  secure: false,  // Set to false if you're using port 587 (TLS)
  auth: {
    user: process.env.SMTP_USER,  // Use the SMTP user (email) from the environment variables
    pass: process.env.SMTP_PASS,  // Use the SMTP password from the environment variables
  },
});

/**
 * Send OTP to user's email
 * @param {string} email - User's email
 * @param {string} otpCode - OTP code to send
 */
const sendOtpToEmail = async (email, otpCode) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_USER,  // Use the sender email from the environment variables
      to: email,
      subject: "Your OTP Code",
      html: `
        <div style="font-family: Arial, sans-serif; font-size: 16px;">
          <p>Dear user,</p>
          <p>Your OTP code is: <strong>${otpCode}</strong></p>
          <p>This code will expire in 5 minutes.</p>
          <br/>
          <p>Thank you!</p>
        </div>
      `,
    };

    // Send email using transporter
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);  // Log the response for debugging
  } catch (error) {
    console.error("Error sending OTP email:", error);  // Log any errors
    throw new Error("Unable to send OTP email at the moment.");
  }
};

module.exports = {
  sendOtpToEmail,
};
