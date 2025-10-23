const { Op } = require("sequelize");
const db = require("../../models");
const HttpCodes = require("http-codes");
const nodemailer = require("nodemailer");
const { ApiError } = require("../../middlewares/ApiError");

const { Calculators, Categories, SubCategories } = db;

class CalculatorFeedbackServices {
  /**
   * createCalculatorFeedbackEmailService: Service Method
   * POST: /api/calculatorfeedback/
   * @param {Object} body Having Properties for Creating
   * @returns Object with message property having success method
   */
  async createCalculatorFeedbackEmailService(data) {
    // Destructuring data from request
    const { name, email, message, calName } = data;

    // Simple validation
    if (!name || !email || !message || !calName) {
      throw new ApiError(
        "All fields are required.",
        HttpCodes.BAD_REQUEST,
        "INVALID_REQ_BODY"
      );
    }

    // Create transporter for sending the email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // SMTP host (e.g., "smtp.gmail.com")
      port: process.env.SMTP_PORT, // SMTP port (e.g., 587)
      secure: process.env.SMTP_PORT === "465", // Set to true for 465, false for others
      auth: {
        user: process.env.SMTP_USER, // SMTP username
        pass: process.env.SMTP_PASS, // SMTP password
      },
    });

    // Email options
    const mailOptions = {
      from: email, // Sender's email
      to: process.env.CONTACT_TO_EMAIL, // Recipient's email (e.g., company contact email)
      html: `
      <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
        <h2 style="color: #2845F5; font-size: 20px; margin-bottom: 20px;">
            You have received a new message from the Calculator Feedback form.
          </h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Calculator:</strong> ${calName}</p>
        <p><strong>Message:</strong></p>
        <p style="margin-left: 10px;">${message}</p>
      </div>
    `
    
      // HTML version (if needed)
      // html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Subject:</strong> ${subject}</p><p><strong>Message:</strong> ${message}</p>`
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return {
      message: "Email sent successfully",
    };
  }
}

module.exports = new CalculatorFeedbackServices();
