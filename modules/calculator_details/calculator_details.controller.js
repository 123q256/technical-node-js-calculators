const { asyncHandler, ApiResponse } = require("../../middlewares/middlewares");
const HttpCodes = require("http-codes");
const CalculatorDetailsServices = require("./calculator_details.services");
const db = require("../../models");

const router = require("express").Router();

/**
 * POST: Used to get calculation based on your age
 *  /api/calculator_detail/:tech_calculator_link_name
 */
router.post(
  "/",
  asyncHandler(async (req, res) => {
    return res
      .status(HttpCodes.OK)
      .json(
        new ApiResponse(
          await CalculatorDetailsServices.getSingleCalculatorDetails(req.body)
        )
      );
  })
);


/**
 * POST: Used to get calculation based on your age
 *  /api/calculator_detail/:tech_converter_link_name
 */
router.post(
  "/converter",
  asyncHandler(async (req, res) => {
    return res
      .status(HttpCodes.OK)
      .json(
        new ApiResponse(
          await CalculatorDetailsServices.getSingleConverterDetails(req.body)
        )
      );
  })
);


/**
 * GET: Used to get calculation based on your age
 *  /api/calculator_detail/convertor
 */
router.get(
  "/converter",
  asyncHandler(async (req, res) => {
    return res
      .status(HttpCodes.OK)
      .json(
        new ApiResponse(
          await CalculatorDetailsServices.getAllConvertorService()
        )
      );
  })
);

/**
 * GET: Used to get calculation based on your age
 *  /api/calculator_detail/convertor/:
 */
router.get(
  "/sub-converter",
  asyncHandler(async (req, res) => {
    return res
      .status(HttpCodes.OK)
      .json(
        new ApiResponse(
          await CalculatorDetailsServices.getAllSubConverterService(req.query.q)
        )
      );
  })
);

/**
 * POST: Used to get calculation based on your age
 *  /api/calculator_detail/:calculator_name
 */
router.get(
  "/calculator_lang/:tech_calculator_link",
  asyncHandler(async (req, res) => {
    return res
      .status(HttpCodes.OK)
      .json(
        new ApiResponse(
          await CalculatorDetailsServices.getSingleCalculatorLanguage(
            req.params.tech_calculator_link
          )
        )
      );
  })
);

module.exports = router;
