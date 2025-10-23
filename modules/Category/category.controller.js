const { asyncHandler, ApiResponse } = require("../../middlewares/middlewares");
const HttpCodes = require("http-codes");
const CategoryServices = require("./category.services");
const db = require("../../models");

const router = require("express").Router();

/**
 * POST: Used to get calculation based on your age
 * /api/category/category-name
 */
router.get(
  "/:category_name",
  asyncHandler(async (req, res) => {
    return res
      .status(HttpCodes.OK)
      .json(
        new ApiResponse(
          await CategoryServices.getSingleCategoryAndSubCategory(
            req.params.category_name
          )
        )
      );
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/category/
 */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    return res
      .status(HttpCodes.OK)
      .json(new ApiResponse(await CategoryServices.getAllCategoryCalculator()));
  })
);

module.exports = router;
