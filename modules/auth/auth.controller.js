const { asyncHandler, ApiResponse } = require("../../middlewares/middlewares");
const HttpCodes = require("http-codes");
const AuthServices = require("./auth.services");
const verifyToken = require("../../middlewares/authMiddleware");

const router = require("express").Router();

// Register new user
router.post(
  "/register",
  asyncHandler(async (req, res) => {
    return res
      .status(HttpCodes.CREATED)
      .json(new ApiResponse(await AuthServices.registerNewUser(req.body)));
  })
);

router.post(
  "/otp-verify",
  asyncHandler(async (req, res) => {
    return res
      .status(HttpCodes.OK)
      .json(new ApiResponse(await AuthServices.verifyOtpForUser(req.body)));
  })
);

router.post(
  "/otp-reset-password",
  asyncHandler(async (req, res) => {
    return res
      .status(HttpCodes.OK)
      .json(
        new ApiResponse(await AuthServices.verifyOtpForResetPassword(req.body))
      );
  })
);

// Login user
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    return res
      .status(HttpCodes.OK)
      .json(new ApiResponse(await AuthServices.loginUser(req.body)));
  })
);

router.get(
  "/profile",
  verifyToken,
  asyncHandler(async (req, res) => {
    return res
      .status(HttpCodes.OK)
      .json(new ApiResponse(await AuthServices.getUserProfile(req)));
  })
);

router.put(
  "/update-profile",
  verifyToken,
  asyncHandler(async (req, res) => {
    return res
      .status(HttpCodes.OK)
      .json(
        new ApiResponse(
          await AuthServices.updateUserProfile(req.body, req.user.id)
        )
      );
  })
);

// Refresh access token
router.post(
  "/refresh-token",
  asyncHandler(async (req, res) => {
    const { refreshToken } = req.body;
    return res
      .status(HttpCodes.OK)
      .json(
        new ApiResponse(await AuthServices.refreshAccessToken(refreshToken))
      );
  })
);

// Forgot password (send OTP)
router.post(
  "/forgot-password",
  asyncHandler(async (req, res) => {
    return res
      .status(HttpCodes.OK)
      .json(new ApiResponse(await AuthServices.forgotPassword(req.body)));
  })
);

// Reset password (verify OTP and set new password)
router.post(
  "/reset-password",
  asyncHandler(async (req, res) => {
    return res
      .status(HttpCodes.OK)
      .json(
        new ApiResponse(await AuthServices.verifyOtpAndResetPassword(req.body))
      );
  })
);

module.exports = router;
