const { asyncHandler, ApiResponse } = require("../../middlewares/middlewares");
const HttpCodes = require("http-codes");
const UserResponseServices = require("./user_response.services");
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
          await UserResponseServices.createUserResponseService(req.body)
        )
      );
  })
);

module.exports = router;
