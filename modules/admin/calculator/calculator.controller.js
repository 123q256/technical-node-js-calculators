const { asyncHandler, ApiResponse } = require("../../../middlewares/middlewares");
const HttpCodes = require("http-codes");
const AdminCalculatorServices = require("./calculator.services");
const db = require("../../../models");

const router = require("express").Router();

/**
 * POST: Used to get calculation based on your age
 * /api/category/category-name
 */


router.post(
  "/create-calculator",
  asyncHandler(async (req, res) => {
    return res
      .status(HttpCodes.OK)
      .json(
        new ApiResponse(
          await AdminCalculatorServices.createNewCalculator(
            req.body
          )
        )
      );
  })
);

router.get(
  "/edit-calculator/:id",
  asyncHandler(async (req, res) => {
    const result = await AdminCalculatorServices.editcalculator(req.params.id, req.body);
    return res.status(HttpCodes.OK).json(new ApiResponse(result));
  })
);

// ✅ Update Blogs
router.put(
  "/update-calculator/:id",
  asyncHandler(async (req, res) => {

    const result = await AdminCalculatorServices.updateCalculator(req.params.id, req.body);
    return res.status(HttpCodes.OK).json(new ApiResponse(result));
  })
);

/**
 * get: Used to get calculation based on your age
 * /api/category/category-name
 */
router.get(
  "/calculator",
  asyncHandler(async (req, res) => {
    return res
      .status(HttpCodes.OK)
      .json(
        new ApiResponse(
          await AdminCalculatorServices.allcalculators(
            req.body
          )
        )
      );
  })
);

/**
 * get: Used to get calculation based on your age
 * /api/category/category-name
 */
router.post(
  "/index-status/:id",
  asyncHandler(async (req, res) => {
    return res
      .status(HttpCodes.OK)
      .json(
        new ApiResponse(
          await AdminCalculatorServices.indexStatus(
            req.params.id
          )
        )
      );
  })
);
/**
 * get: Used to get calculation based on your age
 * /api/category/category-name
 */
router.post(
  "/showContent-status/:id",
  asyncHandler(async (req, res) => {
    return res
      .status(HttpCodes.OK)
      .json(
        new ApiResponse(
          await AdminCalculatorServices.showContentStatus(
                    req.params.id
          )
        )
      );
  })
);



module.exports = router;
