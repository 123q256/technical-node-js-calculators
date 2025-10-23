const { asyncHandler, ApiResponse } = require("../../middlewares/middlewares");
const HttpCodes = require("http-codes");
const CalculatorFeedbackServices = require("./calculatorfeedback.services");
const db = require("../../models");

const router = require("express").Router();

/**
 * POST: Used to get calculation based on your age
 * /api/category/category-name
 */
router.post(
  "/",
  asyncHandler(async (req, res) => {
    return res
      .status(HttpCodes.OK)
      .json(
        new ApiResponse(
          await CalculatorFeedbackServices.createCalculatorFeedbackEmailService(req.body)
        )
      );
  })
);

module.exports = router;
