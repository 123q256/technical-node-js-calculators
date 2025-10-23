const { asyncHandler, ApiResponse } = require("../../middlewares/middlewares");
const HttpCodes = require("http-codes");
const FeedbackServices = require("./feedback.services");
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
          await FeedbackServices.createFeedbackEmailService(req.body)
        )
      );
  })
);

module.exports = router;
