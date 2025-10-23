const { Op, where } = require("sequelize");
const db = require("../../models");
const HttpCodes = require("http-codes");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendOtpToEmail } = require("../../utils/mailer"); // Assume you have this
const { ApiError } = require("../../middlewares/ApiError");
const fs = require("fs");
const path = require("path");

const ACCESS_TOKEN_SECRET = "euwjhfilrwebdlsuifkjb3whks";
const REFRESH_TOKEN_SECRET = "euwjhfilrwebdlsuifkjb3whks";
const OTP_EXPIRY_MINUTES = 5; // 5 minutes

const PROFILE_IMG_PATH = path.join(__dirname, "../uploads/profile_images");

// ensure folder exists
if (!fs.existsSync(PROFILE_IMG_PATH)) {
  fs.mkdirSync(PROFILE_IMG_PATH, { recursive: true });
}

class AuthServices {
  /**
   * Register New User
   */
  async registerNewUser(data) {
    const { name, email, password } = data;

    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("User already exists with this email.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.User.create({
      name,
      email,
      password: hashedPassword,
      email_verified_at: null,
    });

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    const otp_data = await db.UserOtp.create({
      user_id: user.id,
      otp_code: otpCode,
      expiry_time: new Date(Date.now() + OTP_EXPIRY_MINUTES * 60000),
    });

    await sendOtpToEmail(email, otpCode);

    return {
      message: "User registered successfully. OTP sent to email.",
      otp_id: otp_data.id,
      email: email,
    };
  }

  async getUserProfile(req) {
    const id = req.user?.id;
    if (!id) {
      throw new Error("User ID not found in request");
    }

    const user = await db.User.findOne({ where: { id } });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  async verifyOtpForUser(data) {
    const { email, otp, otp_id } = data;

    // Step 1: Check if the user exists
    const existingUser = await db.User.findOne({ where: { email } });
    if (!existingUser) {
      return { success: false, message: "User not found with this email." };
    }

    // Step 2: Check if the OTP exists in the user_otp table for the given user ID
    const userOtpRecord = await db.UserOtp.findOne({
      where: { user_id: existingUser.id, otp_code: otp, id: otp_id },
    });

    if (!userOtpRecord) {
      return { success: false, message: "Invalid OTP." };
    }

    // Step 3: Check if the OTP is still valid (optional)
    const otpExpirationTime = userOtpRecord.createdAt; // Assuming OTP creation time is saved in the 'createdAt' field
    const currentTime = new Date();
    const otpValidityPeriod = 5 * 60 * 1000; // 5 minutes expiration

    if (currentTime - otpExpirationTime > otpValidityPeriod) {
      return { success: false, message: "OTP has expired." };
    }

    // Step 4: If OTP matches and is valid, mark the user as verified
    existingUser.email_verified_at = currentTime;
    await existingUser.save();

    // Step 5: Optionally delete OTP record from user_otp table after verification (for security)
    await userOtpRecord.destroy();

    return { success: true, message: "User verified successfully." };
  }

  async verifyOtpForResetPassword(data) {
    const { email, otp, otp_id } = data;

    // Step 1: Check if the user exists
    const existingUser = await db.User.findOne({ where: { email } });
    if (!existingUser) {
      return { success: false, message: "User not found with this email." };
    }

    // Step 2: Check if the OTP exists in the user_otp table for the given user ID
    const userOtpRecord = await db.UserOtp.findOne({
      where: { user_id: existingUser.id, otp_code: otp, id: otp_id },
    });

    if (!userOtpRecord) {
      return { success: false, message: "Invalid OTP." };
    }

    // Step 3: Check if the OTP is still valid (optional)
    const otpExpirationTime = userOtpRecord.createdAt; // Assuming OTP creation time is saved in the 'createdAt' field
    const currentTime = new Date();
    const otpValidityPeriod = 5 * 60 * 1000; // 5 minutes expiration

    if (currentTime - otpExpirationTime > otpValidityPeriod) {
      return { success: false, message: "OTP has expired." };
    }

    return { success: true, message: "User verified successfully." };
  }
  /**
   * Login User
   */
  async loginUser(body) {
    const { email, password } = body;

    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      throw new Error("Invalid credentials.");
    }

    // Step 2: Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials.");
    }

    // Step 3: Generate access token and refresh token
    const accessToken = jwt.sign({ id: user.id }, ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign({ id: user.id }, REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });

    // Step 4: Store the refresh token in the user's remember_token column
    user.remember_token = refreshToken;
    await user.save();

    // Step 5: Return tokens and user data
    return {
      accessToken,
      refreshToken,
    };
  }

  /**
   * Refresh Access Token
   */
  async refreshAccessToken(refreshToken) {
    try {
      const Token = await db.User.findOne({
        where: { remember_token: refreshToken },
      });

      if (!Token) {
        throw new ApiError(
          "User not found.",
          HttpCodes.NOT_FOUND,
          "USER_NOT_FOUND"
        );
      }

      const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);

      const accessToken = jwt.sign({ id: decoded.id }, ACCESS_TOKEN_SECRET, {
        expiresIn: "1d",
      });

      return {
        accessToken,
      };
    } catch (error) {
      throw new Error("Invalid or expired refresh token.");
    }
  }

  /**
   * Forgot Password
   */
  async forgotPassword(body) {
    const { email } = body;
    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      throw new ApiError(
        "User not found with this email.",
        HttpCodes.NOT_FOUND,
        "USER_NOT_FOUND"
      );
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    await db.UserOtp.destroy({ where: { user_id: user.id } });

    const otp_data = await db.UserOtp.create({
      user_id: user.id,
      otp_code: otpCode,
      expiry_time: new Date(Date.now() + OTP_EXPIRY_MINUTES * 60000),
    });

    await sendOtpToEmail(email, otpCode);

    return {
      message: "OTP sent to your email for password reset.",
      otp_id: otp_data?.id,
    };
  }

  /**
   * Reset Password
   */
  async verifyOtpAndResetPassword(body) {
    const { email, otp_id, newPassword } = body;

    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      throw new ApiError(
        "User not found with this email.",
        HttpCodes.NOT_FOUND,
        "USER_NOT_FOUND"
      );
    }

    const userOtp = await db.UserOtp.findOne({
      where: {
        id: otp_id,
        user_id: user.id, // added this for stronger verification
      },
    });

    if (!userOtp) {
      throw new Error("Invalid OTP.");
    }

    if (new Date() > new Date(userOtp.expiry_time)) {
      throw new Error("OTP has expired.");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.User.update(
      { password: hashedPassword },
      { where: { id: user.id } }
    );

    await db.UserOtp.destroy({ where: { id: userOtp.id } });

    return {
      message: "Password reset successfully.",
    };
  }
  async updateUserProfile(body, userId) {
    const { name, email, image } = body;

    const user = await db.User.findByPk(userId);
    if (!user) {
      throw new ApiError(
        "User not found.",
        HttpCodes.NOT_FOUND,
        "USER_NOT_FOUND"
      );
    }

    let profileImagePath = user.image;

    if (image) {
      const matches = image.match(/^data:.+\/(.+);base64,(.*)$/);
      if (!matches || matches.length !== 3) {
        throw new ApiError(
          "Invalid image format.",
          HttpCodes.BAD_REQUEST,
          "BAD_REQUEST"
        );
      }

      const ext = matches[1];
      const data = matches[2];
      const buffer = Buffer.from(data, "base64");

      const fileName = `user_${userId}_${Date.now()}.${ext}`;
      const filePath = path.join(PROFILE_IMG_PATH, fileName);

      fs.writeFileSync(filePath, buffer);

      profileImagePath = `/uploads/profile_images/${fileName}`;
    }

    await user.update({
      name,
      email,
      image: profileImagePath,
    });

    return {
      message: "Profile updated successfully",
    };
  }
}

module.exports = new AuthServices();
