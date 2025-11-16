const { asyncHandler, ApiResponse } = require("../../middlewares/middlewares");
const HttpCodes = require("http-codes");
const CalculatorsServices = require("./calculators.services");
const db = require("../../models");

const router = require("express").Router();

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/cat-age-calculator
 */

router.post(
  "/cat-age-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationCatAgeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/square-inches-calculator
 */

router.post(
  "/square-inches-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationSquareInchesCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/class-width-calculator
 */

router.post(
  "/class-width-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationClassWidthCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/bond-order-calculator
 */

router.post(
  "/bond-order-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationBondOrderCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/wave-period-calculator
 */

router.post(
  "/wave-period-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationWavePeriodCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/water-bill-calculator
 */

router.post(
  "/water-bill-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationwaterBillCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/love-calculator
 */

router.post(
  "/love-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationLoveCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/percent-error-calculator
 */

router.post(
  "/percent-error-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationPercentErrorCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/bench-press-calculator
 */

router.post(
  "/bench-press-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationBenchPressCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/dog-pregnancy-calculator
 */

router.post(
  "/dog-pregnancy-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationDogPregnancyCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/benadryl-for-dogs-calculator
 */

router.post(
  "/benadryl-for-dogs-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationBenadrylForDogsCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/cat-calorie-calculator
 */

router.post(
  "/cat-calorie-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationCatCaloieCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/puppy-weight-calculator
 */

router.post(
  "/puppy-weight-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationPuppyWeigthCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/pearson-age-calculator
 */

router.post(
  "/pearson-age-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationPearsonAgeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/dog-age-calculator
 */

router.post(
  "/dog-age-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationDogAgeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/dog-crate-size-calculator
 */

router.post(
  "/dog-crate-size-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationDogCreateSizeCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/dog-food-calculator
 */

router.post(
  "/dog-food-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationDogFoodCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/date-calculator
 */

router.post(
  "/date-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationDateCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/round-to-the-nearest-cent
 */

router.post(
  "/round-to-the-nearest-cent",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationRoundtoTheNearestCentCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/square-root-curve-calculator
 */

router.post(
  "/square-root-curve-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationSquereRootCurveCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/log-base-2-calculator
 */

router.post(
  "/log-base-2-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationLogBase2Calculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/comparing-decimals-calculator
 */

router.post(
  "/comparing-decimals-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationComparingDecimalCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/doubling-time-calculator
 */

router.post(
  "/doubling-time-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationDoublingtimeCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/variation-calculator
 */
router.post(
  "/variation-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationVariationCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/fibonacci-calculator
 */

router.post(
  "/fibonacci-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationFibonacciCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/circumference-to-diameter-calculator
 */

router.post(
  "/circumference-to-diameter-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationCircumferenceToDiameterCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/absolute-change-calculator
 */

router.post(
  "/absolute-change-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationAbsoluteChangeCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/volume-of-square
 */

router.post(
  "/volume-of-square",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationVolumeOfSquareCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/bun-creatinine-ratio-calculator
 */

router.post(
  "/bun-creatinine-ratio-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationBinCreatinineRatioCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/grams-to-calories-calculator
 */

router.post(
  "/grams-to-calories-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationGramsTocaloriesCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/map-calculator
 */

router.post(
  "/map-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationMapCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/one-rep-max-calculator
 */

router.post(
  "/one-rep-max-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationOneRepMaxCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/svr-calculator
 */

router.post(
  "/svr-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationSVRCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/taco-bar-calculator
 */

router.post(
  "/taco-bar-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationTacoBarCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/water-intake-calculator
 */

router.post(
  "/water-intake-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationWaterIntakeCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/ldl-calculator
 */
router.post(
  "/ldl-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationIdiCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/a1c-calculator
 */

router.post(
  "/a1c-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationA1cCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/incidence-rate-calculator
 */

router.post(
  "/incidence-rate-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationIncidenceRateCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/it-ratio
 */

router.post(
  "/it-ratio",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationItRatioCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/max-heart-rate-calculator
 */

router.post(
  "/max-heart-rate-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationMaxHeartRateCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/pack-year-calculator
 */

router.post(
  "/pack-year-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationPackYearCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/rucking-calorie-calculator
 */

router.post(
  "/rucking-calorie-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationRuckingCaloriesCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/ebit-calculator
 */

router.post(
  "/ebit-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationEbitCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/stamp-duty-calculator
 */

router.post(
  "/stamp-duty-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationStampDutyCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/ctr-calculator
 */

router.post(
  "/ctr-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationCTRCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/contribution-margin-calculator
 */

router.post(
  "/contribution-margin-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationContributionMarginCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/youtube-revenue-calculator
 */

router.post(
  "/youtube-revenue-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationYoutubeRevenueCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/book-value-calculator
 */

router.post(
  "/book-value-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationBookValueCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/cost-of-goods-sold-calculator
 */

router.post(
  "/cost-of-goods-sold-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationCostOfGoodsSoldCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/rent-increase-calculator
 */

router.post(
  "/rent-increase-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationRentIncreaseCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/salvage-value-calculator
 */

router.post(
  "/salvage-value-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationSalvageValueCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/real-estate-commission-calculator
 */

router.post(
  "/real-estate-commission-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationRealEstateCommissionCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/gdp-per-capita-calculator
 */

router.post(
  "/gdp-per-capita-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationGdpPerCapitaCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/price-calculator
 */

router.post(
  "/price-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationPriceCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/buying-power-calculator
 */

router.post(
  "/buying-power-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationBuyingPowereCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/cross-price-elasticity-calculator
 */

router.post(
  "/cross-price-elasticity-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationCrossPriceElasticityCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/actual-cash-value-calculator
 */

router.post(
  "/actual-cash-value-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationActualCashValueCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/net-worth-calculator
 */

router.post(
  "/net-worth-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationNetWorthCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/cost-basis-calculator
 */

router.post(
  "/cost-basis-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationCostBasisCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/comparative-advantage-calculator
 */

router.post(
  "/comparative-advantage-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationComparativeAdvantageCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/current-ratio-calculator
 */

router.post(
  "/current-ratio-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationCurrentRationCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/deadweight-loss-calculator
 */

router.post(
  "/deadweight-loss-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationDeadWeightLossCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/reverse-sales-tax-calculator
 */

router.post(
  "/reverse-sales-tax-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationReverSaleTaxCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/marginal-revenue-calculator
 */

router.post(
  "/marginal-revenue-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationMarginalRevenueCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/cash-back-calculator
 */

router.post(
  "/cash-back-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationCashBackCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/earnings-per-share-calculator
 */

router.post(
  "/earnings-per-share-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationEarningPerShareCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/options-profit-calculator
 */

router.post(
  "/options-profit-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationOptionProfitCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/dividend-yield-calculator
 */

router.post(
  "/dividend-yield-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationDividendYieldCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/markdown-calculator
 */

router.post(
  "/markdown-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationMarkdownCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/agi-calculator
 */

router.post(
  "/agi-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationAGICalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/mpc-calculator
 */

router.post(
  "/mpc-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationMPCCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/maximum-profit-calculator
 */

router.post(
  "/maximum-profit-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationMaximumProfitCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/income-elasticity-of-demand-calculator
 */

router.post(
  "/income-elasticity-of-demand-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationIncomeElasticityOfDemandCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/profit-margin-calculator
 */

router.post(
  "/profit-margin-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationProfitMarginCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/enterprise-value-calculator
 */

router.post(
  "/enterprise-value-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationEnterpriseValueCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/cpc-calculator
 */

router.post(
  "/cpc-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationCPCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/out-the-door-price-calculator
 */

router.post(
  "/out-the-door-price-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationOutTheDoorPriceCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/salary-calculator
 */

router.post(
  "/salary-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationSalaryCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/salary-calculator
 */

router.post(
  "/bmi-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationIBMCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/vat-calculator
 */

router.post(
  "/vat-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationVatCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/salestax-calculator
 */

router.post(
  "/salestax-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationSalestaxCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/salestax-calculator
 */

router.post(
  "/price-elasticity-demand-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationPriceElasticaityDemandCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/wacc-calculator
 */

router.post(
  "/wacc-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationWaccCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/ebitda-calculator
 */

router.post(
  "/ebitda-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationEbitdaCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/paypal-fee-calculator
 */

router.post(
  "/paypal-fee-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationPaypalFeeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/margin-of-error-calculator
 */

router.post(
  "/margin-of-error-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationMarginOfErrorCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/cpm-calculator
 */

router.post(
  "/cpm-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationCpmCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/markup-calculator
 */
router.post(
  "/markup-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationMarkupCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/cap-rate-calculator
 */
router.post(
  "/cap-rate-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationCapRateCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/capm-calculator
 */
router.post(
  "/capm-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationCapmRateCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/marginal-cost-calculator
 */
router.post(
  "/marginal-cost-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationMarginalCostCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/percent-of-sales-calculator
 */
router.post(
  "/percent-of-sales-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationPercentOfSaleCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/overtime-calculator
 */
router.post(
  "/overtime-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationOvertimeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/roi-calculator
 */
router.post(
  "/roi-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationRoiCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/future-value-of-annuity
 */
router.post(
  "/future-value-of-annuity",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationFutureValueOfAnnuityCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/unemployment-rate-calculator
 */
router.post(
  "/unemployment-rate-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationUnemploymentRateCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/cost-of-equity-calculator
 */
router.post(
  "/cost-of-equity-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationCostOfEquityCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/consumer-surplus-calculator
 */
router.post(
  "/consumer-surplus-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationConsumerSurplusCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/stock-calculator
 */
router.post(
  "/stock-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationStockCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/pay-raise-calculator
 */
router.post(
  "/pay-raise-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationPayRaiseCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/roas-calculator
 */
router.post(
  "/roas-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationRoasCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/turo-calculator
 */
router.post(
  "/turo-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationTurboCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/commission-calculator
 */
router.post(
  "/commission-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationCommissionCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/time-and-a-half
 */
router.post(
  "/time-and-a-half",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationTimeAndaHalfCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/variable-cost-calculator
 */
router.post(
  "/variable-cost-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationVariableCostCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/growth-rate-calculator
 */
router.post(
  "/growth-rate-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationGrowthRateCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/labor-cost-calculator
 */
router.post(
  "/labor-cost-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationLaborCostCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/beta-calculator
 */
router.post(
  "/beta-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationBetaCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/gdp-calculator
 */
router.post(
  "/gdp-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationGPDCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/nps-calculator
 */
router.post(
  "/nps-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationNPSCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/bond-price-calculator
 */
router.post(
  "/bond-price-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationBondPriceCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/opportunity-cost-calculator
 */
router.post(
  "/opportunity-cost-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationOpportunityCostCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/car-depreciation-calculator
 */
router.post(
  "/car-depreciation-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationCarDepreciationCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/property-depreciation-calculator
 */
router.post(
  "/property-depreciation-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationPropertyDepreciationCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/payback-period-calculator
 */
router.post(
  "/payback-period-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationPaybackPeriodCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/basis-point-calculator
 */
router.post(
  "/basis-point-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationBasisPontCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/wedding-budget-calculator
 */
router.post(
  "/wedding-budget-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationWeddingBudgetCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/employee-cost-calculator
 */
router.post(
  "/employee-cost-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationEmloyeeCostCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/npv-calculator
 */
router.post(
  "/npv-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationNPVCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/tip-calculator
 */
router.post(
  "/tip-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationTipCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/hourly-to-salary-calculator
 */
router.post(
  "/hourly-to-salary-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationHourlyToSalaryCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/salary-to-hourly-calculator
 */
router.post(
  "/salary-to-hourly-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationSalaryToHourlyCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/rent-split-calculator
 */
router.post(
  "/rent-split-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationRentSpitCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/arv-calculator
 */
router.post(
  "/arv-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationARVCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/6-minute-walk-test
 */
router.post(
  "/6-minute-walk-test",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculation6MinuteWalkTestCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/rmr-calculator
 */
router.post(
  "/rmr-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationRMRCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/bmr-calculator
 */
router.post(
  "/bmr-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationBMRCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/ideal-weight-calculator
 */
router.post(
  "/ideal-weight-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationIdealWeightCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/lean-body-mass-calculator
 */
router.post(
  "/lean-body-mass-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationLeanBodyMassCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/bsa-calculator
 */
router.post(
  "/bsa-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationBSACalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);
/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/corrected-calcium-calculator
 */
router.post(
  "/corrected-calcium-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationCorrectedCalciumCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/anc-calculator
 */
router.post(
  "/anc-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationANCCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/alc-calculator
 */
router.post(
  "/alc-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationALCCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/reticulocyte-count-calculator
 */
router.post(
  "/reticulocyte-count-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationReticulocyteCountCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/centor-score-calculator
 */
router.post(
  "/centor-score-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationCentorScoreCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/child-pugh-calculator
 */
router.post(
  "/child-pugh-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationChildPughCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/waist-to-hip-ratio-calculator
 */
router.post(
  "/waist-to-hip-ratio-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationWaistToHipRatioCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/waist-to-height-ratio-calculator
 */
router.post(
  "/waist-to-height-ratio-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationWaistToHeightRatioCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/ffmi-calculator
 */
router.post(
  "/ffmi-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationFFMICalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/body-shape-calculator
 */
router.post(
  "/body-shape-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationBodyShapeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/weight-loss-percentage-calculator
 */
router.post(
  "/weight-loss-percentage-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationWeightLossPercentageCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/dosage-calculator
 */
router.post(
  "/dosage-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationDosageCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/bra-size-calculator
 */
router.post(
  "/bra-size-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationBraSizeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/implantation-calculator
 */
router.post(
  "/implantation-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationImplantationCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/blood-type-calculator
 */
router.post(
  "/blood-type-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationBloodTypeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/melatonin-dosage-calculator
 */
router.post(
  "/melatonin-dosage-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationMelatoninDosageCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/prostate-volume-calculator
 */
router.post(
  "/prostate-volume-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationProstateVolumeCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/dihybrid-cross-calculator
 */
router.post(
  "/dihybrid-cross-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationDihybridcrossCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/hcg-calculator
 */
router.post(
  "/hcg-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationHCGCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/dress-size-calculator
 */
router.post(
  "/dress-size-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationDressSizeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/tinetti-calculator
 */
router.post(
  "/tinetti-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationTinettiCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/drip-rate-calculator
 */
router.post(
  "/drip-rate-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationDripRateCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/steps-to-calories-calculator
 */
router.post(
  "/steps-to-calories-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationStepstoCaloriesCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/cholesterol-ratio-calculator
 */
router.post(
  "/cholesterol-ratio-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationCholesterolRatioCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/paracetamol-dosage-calculator
 */
router.post(
  "/paracetamol-dosage-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationParacetamolDosageCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/amoxicillin-pediatric-dosage-calculator
 */
router.post(
  "/amoxicillin-pediatric-dosage-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationAmoxicillinPediatricDosageCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/harris-benedict-calculator
 */
router.post(
  "/harris-benedict-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationHarrisBenedictCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/calories-burned-biking-calculator
 */
router.post(
  "/calories-burned-biking-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationCaloriesBurnedBikingCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/treadmill-calorie-calculator
 */
router.post(
  "/treadmill-calorie-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationTreadmillCalorieCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/walking-calorie-calculator
 */
router.post(
  "/walking-calorie-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationWalkingCalorieCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/elliptical-calorie-calculator
 */
router.post(
  "/elliptical-calorie-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationEllipticalCalorieCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/bulking-calculator
 */
router.post(
  "/bulking-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationBulkingCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/food-cost-calculator
 */
router.post(
  "/food-cost-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationFoodCostCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/steps-to-miles-calculator
 */
router.post(
  "/steps-to-miles-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationStepsToMilesCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/fat-burning-heart-rate
 */
router.post(
  "/fat-burning-heart-rate",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationFatBurningHeartCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/nnt-calculator
 */
router.post(
  "/nnt-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationNNTCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/ast-alt-ratio-calculator
 */
router.post(
  "/ast-alt-ratio-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationAstAltRatioCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/net-carbs-calculator
 */
router.post(
  "/net-carbs-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationNetCarbsCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/urine-output-calculator
 */
router.post(
  "/urine-output-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationUrineOutputCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/bishop-score-calculator
 */
router.post(
  "/bishop-score-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationBishopScoreCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/army-body-fat-calculator
 */
router.post(
  "/army-body-fat-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationArmyBodyFatCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/adjusted-body-weight-calculator
 */
router.post(
  "/adjusted-body-weight-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationAdjustedBodyWeightCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/bench-press-calculator
 */
router.post(
  "/bench-press-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationBenchPressCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/drug-half-life-calculator
 */
router.post(
  "/drug-half-life-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationDrugHalfLifeCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/macro-calculator
 */
router.post(
  "/macro-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationMacroCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/meal-calorie-calculator
 */
router.post(
  "/meal-calorie-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationMealCalorieCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/target-heart-rate-calculator
 */
router.post(
  "/target-heart-rate-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationTargetHeartRateCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/wilks-calculator
 */
router.post(
  "/wilks-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationWilksCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/allele-frequency-calculator
 */
router.post(
  "/allele-frequency-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationAlleleFrequencyCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/weight-watchers-points-calculator
 */
router.post(
  "/weight-watchers-points-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationWeightWatchersPointsCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/weight-gain-calculator
 */
router.post(
  "/weight-gain-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationWeightGainCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/pediatric-dose-calculator
 */
router.post(
  "/pediatric-dose-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationPediatricDoseCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/maintenance-calorie-calculator
 */
router.post(
  "/maintenance-calorie-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationMaintenanceCalorieCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/breastfeeding-calorie-calculator
 */
router.post(
  "/breastfeeding-calorie-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationBreastfeedingCalorieCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/swimming-calorie-calculator
 */
router.post(
  "/swimming-calorie-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationSwimmingCalorieCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/percent-of-sales-calculator
 */
router.post(
  "/percent-of-sales-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationPercentOfSaleCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/protein-calculator
 */
router.post(
  "/protein-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationProteinCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/distance-calculator
 */
router.post(
  "/distance-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationDistanceCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/era-calculator
 */
router.post(
  "/era-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationErACalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/vorici-chromatic-calculator
 */
router.post(
  "/vorici-chromatic-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationVoriciChromaticCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/aspect-ratio-calculator
 */
router.post(
  "/aspect-ratio-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationAspectRatioCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/board-foot-calculator
 */
router.post(
  "/board-foot-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationBoardFootCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/edpi-calculator
 */
router.post(
  "/edpi-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationEdpiCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/visa-chance-calculator
 */
router.post(
  "/visa-chance-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationVisaChanceCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/population-density-calculator
 */
router.post(
  "/population-density-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationPopulationDensityCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/prorated-rent-calculator
 */
router.post(
  "/prorated-rent-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationProratedrentCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/korean-age-calculator
 */
router.post(
  "/korean-age-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationKoreanAgeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/winning-percentage-calculator
 */
router.post(
  "/winning-percentage-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationWinningPercentageCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/mcg-to-mg-calculator
 */
router.post(
  "/mcg-to-mg-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationMcgToMgCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/download-calculator
 */
router.post(
  "/download-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationDownloadCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/sobriety-calculator
 */
router.post(
  "/kd-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationKdCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/data-transfer-calculator
 */
router.post(
  "/data-transfer-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationDataTransferCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/words-per-minute-calculator
 */
router.post(
  "/words-per-minute-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationWordsPerMinuteCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/desk-height-calculator
 */
router.post(
  "/desk-height-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationDeskHeightCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/ring-size-calculator
 */
router.post(
  "/ring-size-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationRingSizeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/shoe-size-calculator
 */
router.post(
  "/shoe-size-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationShoeSizeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/curtain-size-calculator
 */
router.post(
  "/curtain-size-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationCurtainSizeCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/tesla-charging-calculator
 */
router.post(
  "/tesla-charging-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationTeslaChargingCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/compression-height-calculator
 */
router.post(
  "/compression-height-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationCompressionHightCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/fuel-cost-calculator
 */
router.post(
  "/fuel-cost-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationFuelCostCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/lawn-mowing-cost-calculator
 */
router.post(
  "/lawn-mowing-cost-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationLawnMowingCostCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/tv-size-calculator
 */
router.post(
  "/tv-size-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationTvSizeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/river-rock-calculator
 */
router.post(
  "/river-rock-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationRiverRockCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/circle-skirt-calculator
 */
router.post(
  "/circle-skirt-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationCircleSkirtCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/botox-cost-calculator
 */
router.post(
  "/botox-cost-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationBotoxCostCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/yards-to-tons-calculator
 */
router.post(
  "/yards-to-tons-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationYardsToTonsCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/dilution-ratio-calculator
 */
router.post(
  "/dilution-ratio-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationDilutionRatioCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/gpm-calculator
 */
router.post(
  "/gpm-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationgpMCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/ceiling-fan-size-calculator
 */
router.post(
  "/ceiling-fan-size-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationCeilingfanSizeCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/cost-per-mile-driving-calculator
 */
router.post(
  "/cost-per-mile-driving-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationCostPerMileDrivingCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/gold-cost-per-pound-calculator
 */
router.post(
  "/gold-cost-per-pound-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationGoldCostPerPoundCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/moisture-content-calculator
 */
router.post(
  "/moisture-content-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationMoistureContentCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol//shaded-area-calculator
 */
router.post(
  "/shaded-area-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationShadedAreaCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/engine-hours-to-miles-calculator
 */
router.post(
  "/engine-hours-to-miles-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationEngneHourstoMilesCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/magnification-calculator
 */
router.post(
  "/magnification-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationMagnificationCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/split-bill-calculator
 */
router.post(
  "/split-bill-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationSplitBillCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/draw-length-calculator
 */
router.post(
  "/draw-length-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationDrawLengthCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/on-base-percentage-calculator
 */
router.post(
  "/on-base-percentage-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationOnBasePercentageCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/taper-calculator
 */
router.post(
  "/taper-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationTaperCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/battery-life-calculator
 */
router.post(
  "/battery-life-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationBatteryLifeCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/slugging-percentage-calculator
 */
router.post(
  "/slugging-percentage-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationSluggingPercentageCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/magic-number-calculator
 */
router.post(
  "/magic-number-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationMagicNumberCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/fabric-calculator
 */
router.post(
  "/fabric-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationFabricCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/semester-grade-calculator
 */
router.post(
  "/semester-grade-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationSemestergradeCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);
/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/screen-size-calculator
 */
router.post(
  "/screen-size-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationScreenSizeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/recessed-lighting-calculator
 */
router.post(
  "/recessed-lighting-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationRecessedLightingCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/cfm-calculator
 */
router.post(
  "/cfm-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationCMFCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/box-fill-calculator
 */
router.post(
  "/box-fill-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationBoxFillCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/tonnage-calculator
 */
router.post(
  "/tonnage-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationTonnageCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/dunk-calculator
 */
router.post(
  "/dunk-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationDunkCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/nether-portal-calculator
 */
router.post(
  "/nether-portal-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationNetherPortalCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/cbm-calculator
 */
router.post(
  "/cbm-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationCBMCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/bike-size-calculator
 */
router.post(
  "/bike-size-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationBikeSizeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/ac-btu-calculator
 */
router.post(
  "/ac-btu-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationAcBtuCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/blind-size-calculator
 */
router.post(
  "/blind-size-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationBlindSizeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/average-time-calculator
 */
router.post(
  "/average-time-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationAverageTimeCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/hourly-pay-calculator
 */
router.post(
  "/hourly-pay-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationHourlyPayCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/log-weight-calculator
 */
router.post(
  "/log-weight-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationLogWeightCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/water-weight-calculator
 */
router.post(
  "/water-weight-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationWaterWeightCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/turkey-size-calculator
 */
router.post(
  "/turkey-size-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationTurkeySizeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/average-atomic-mass-calculator
 */
router.post(
  "/average-atomic-mass-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationAverageAtomicMassCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/gibbs-free-energy-calculator
 */
router.post(
  "/gibbs-free-energy-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationGibbsFreeEnergyCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/vapor-pressure-calculator
 */
router.post(
  "/vapor-pressure-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationvaporPressureCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/entropy-calculator
 */
router.post(
  "/entropy-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationEntropyCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/solution-dilution-calculator
 */
router.post(
  "/solution-dilution-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationSolutionDilutionCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/chemical-equation-balancer-calculator
 */
router.post(
  "/chemical-equation-balancer-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationChemicalEquationBalancerCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/limiting-reactant-calculator
 */
router.post(
  "/limiting-reactant-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationLimitingReactantCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/redox-reaction-calculator
 */
router.post(
  "/redox-reaction-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationRedoxReactionCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/ppm-calculator
 */
router.post(
  "/ppm-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationPPMCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/molality-calculator
 */
router.post(
  "/molality-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationMolalityCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/mole-ratio-calculator
 */
router.post(
  "/mole-ratio-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationMoleRatioCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/molarity-calculator
 */
router.post(
  "/molarity-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationMolarityCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/dilution-calculator
 */
router.post(
  "/dilution-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationDilutionCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/atoms-to-moles-calculator
 */
router.post(
  "/atoms-to-moles-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationAtomtoMolesCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/atoms-to-moles-calculator
 */
router.post(
  "/atoms-to-moles-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationAtomtoMolesCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/grams-to-atoms-calculator
 */
router.post(
  "/grams-to-atoms-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationGramstoAtomsCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/pka-to-ph-calculator
 */
router.post(
  "/pka-to-ph-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationPkaToPhCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/theoretical-yield-calculator
 */
router.post(
  "/theoretical-yield-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationTheoreticalyieldCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/theoretical-yield-calculator
 */
router.post(
  "/molecular-formula-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationMolecularFormulaCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/formal-charge-calculator
 */
router.post(
  "/formal-charge-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationFormalChargeCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/equilibrium-constant-calculator
 */
router.post(
  "/equilibrium-constant-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationEquilibriumConstantCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/electron-configuration-calculator
 */
router.post(
  "/electron-configuration-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationElectronConfigurationCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/molar-mass-calculator
 */
router.post(
  "/molar-mass-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationMolarMassCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/titration-calculator
 */
router.post(
  "/titration-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationTitrationCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/half-life-calculator
 */
router.post(
  "/half-life-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationHalfLifeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/mole-calculator
 */
router.post(
  "/mole-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationMoleCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/atomic-mass-calculator
 */
router.post(
  "/atomic-mass-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationAtomicMassCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/nernst-equation-calculator
 */
router.post(
  "/nernst-equation-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationNernstEquationCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/grams-to-moles-calculator
 */
router.post(
  "/grams-to-moles-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationGramsToMolesCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/moles-to-grams-calculator
 */
router.post(
  "/moles-to-grams-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationMolesToGramsCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/activation-energy-calculator
 */
router.post(
  "/activation-energy-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationActivationEnergyCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/mmol-l-to-mg-dl-calculator
 */
router.post(
  "/mmol-l-to-mg-dl-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationMmolLToMgDlCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/cfu-calculator
 */
router.post(
  "/cfu-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationCFUCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/ml-to-moles-calculator
 */
router.post(
  "/ml-to-moles-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationMlToMolesCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/stp-calculator
 */
router.post(
  "/stp-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationSTPCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/stoichiometry-calculator
 */
router.post(
  "/stoichiometry-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationStoichiometryCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/empirical-formula-calculator
 */
router.post(
  "/empirical-formula-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationEmpiricalFormulaCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/percent-yield-calculator
 */
router.post(
  "/percent-yield-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationPercentYieldCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/power-to-weight-ratio-calculator
 */
router.post(
  "/power-to-weight-ratio-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationPowerToWeightRatioCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/constant-of-proportionality-calculator
 */
router.post(
  "/constant-of-proportionality-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationConstantOfProportionalityCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/quantum-number-calculator
 */
router.post(
  "/quantum-number-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationQuantmNumberCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/cc-to-hp-calculator
 */
router.post(
  "/cc-to-hp-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationCcTohpCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/combination-calculator
 */
router.post(
  "/combination-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationCombinationCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/central-limit-theorem-calculator
 */
router.post(
  "/central-limit-theorem-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationCentralLimittheoremCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/binomial-coefficient-calculator
 */
router.post(
  "/binomial-coefficient-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationbinomialCoefficientCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/raw-score-calculator
 */
router.post(
  "/raw-score-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationRowScoreCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/empirical-probability-calculator
 */
router.post(
  "/empirical-probability-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationEmpiricalProbabilityCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/relative-risk-calculator
 */
router.post(
  "/relative-risk-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationRelativeRiskCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/chi-square-calculator
 */
router.post(
  "/chi-square-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationChiSquareCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/p-hat-calculator
 */
router.post(
  "/p-hat-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationPHapCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/standard-error-calculator
 */
router.post(
  "/standard-error-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationStandardErrorCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/empirical-rule-calculator
 */
router.post(
  "/empirical-rule-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationEmpiricalRuleCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/expected-value-calculator
 */
router.post(
  "/expected-value-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationExpectedValueCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/mad-calculator
 */
router.post(
  "/mad-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationMadCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/permutation-calculator
 */
router.post(
  "/permutation-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationPermutationCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/standard-deviation-calculator
 */
router.post(
  "/standard-deviation-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationStandardDeviationCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/5-five-number-summary-calculator
 */
router.post(
  "/5-five-number-summary-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationFiveNumberSummaryCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/confidence-interval-calculator
 */
router.post(
  "/confidence-interval-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationConfidenceIntervalCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/variance-calculator
 */
router.post(
  "/variance-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationVarianceCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/coefficient-of-determination-calculator
 */
router.post(
  "/coefficient-of-determination-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationCoefficientOfDeterminationCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/point-estimate-calculator
 */
router.post(
  "/point-estimate-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationPointEstimateCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/relative-frequency-calculator
 */
router.post(
  "/relative-frequency-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationRelativeFrequencyCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/probability-calculator
 */
router.post(
  "/probability-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationProbabilityCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/coefficient-of-variation-calculator
 */
router.post(
  "/coefficient-of-variation-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationCoefficientOfVariationCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/covariance-calculator
 */
router.post(
  "/covariance-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationCovarianceCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/mean-median-mode-range-calculator
 */
router.post(
  "/mean-median-mode-range-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationMeanMedianModeRangeCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/quartile-calculator
 */
router.post(
  "/quartile-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationQuartileCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/geometric-mean-calculator
 */
router.post(
  "/geometric-mean-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationGeometricMeanCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/harmonic-mean-calculator
 */
router.post(
  "/harmonic-mean-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationHarmonicMeanCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/interquartile-range-calculator
 */
router.post(
  "/interquartile-range-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationIQRCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/sum-of-squares-calculator
 */
router.post(
  "/sum-of-squares-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationSumOfSquaresCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/poisson-distribution-calculator
 */
router.post(
  "/poisson-distribution-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationPoissonDistributionCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/binomial-distribution-calculator
 */
router.post(
  "/binomial-distribution-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationBinomialDistributionCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/invnorm-calculator
 */
router.post(
  "/invnorm-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationInvnormCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/linear-regression-calculator
 */
router.post(
  "/linear-regression-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationLinearRegressionCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/outlier-calculator
 */
router.post(
  "/outlier-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationOutliercalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/quadratic-regression-calculator
 */
router.post(
  "/quadratic-regression-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationQuadraticRegressioncalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/percentile-calculator
 */
router.post(
  "/percentile-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationPercentilecalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/stem-leaf-plot-calculator
 */
router.post(
  "/stem-leaf-plot-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationStemAndLeafPlotcalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/degrees-of-freedom-calculator
 */
router.post(
  "/degrees-of-freedom-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationDegreesOfFreedomcalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/probability-density-function-calculator
 */
router.post(
  "/midrange-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationMidrangecalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/rsd-calculator
 */
router.post(
  "/rsd-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationRSDcalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/chebyshevs-theorem-calculator
 */
router.post(
  "/chebyshevs-theorem-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationChebyshevTheoremcalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/box-plot-calculator
 */
router.post(
  "/box-plot-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationBoxPlotcalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/coin-flip-calculator
 */
router.post(
  "/coin-flip-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationCoinFlipcalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/percentile-rank-calculator
 */
router.post(
  "/percentile-rank-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationPercentileRankcalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/sse-calculator
 */
router.post(
  "/sse-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationSSEcalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/prediction-interval-calculator
 */
router.post(
  "/prediction-interval-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationPredictionIntervalcalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/scatter-plot-maker
 */
router.post(
  "/scatter-plot-maker",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationScatterPlotMakercalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/residual-calculator
 */
router.post(
  "/residual-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationResidualcalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/residual-plot-calculator
 */
router.post(
  "/residual-plot-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationResidualPlotcalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/error-propagation-calculator
 */
router.post(
  "/error-propagation-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationErrorPropagationcalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/pie-chart-calculator
 */
router.post(
  "/pie-chart-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationPieChartcalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/accuracy-calculator
 */
router.post(
  "/accuracy-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationAccuracycalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/sample-size-calculator
 */
router.post(
  "/sample-size-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationSampleSizecalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/z-score-to-percentile
 */
router.post(
  "/z-score-to-percentile",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationZScoreToPercentilecalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/cross-product-calculator
 */
router.post(
  "/cross-product-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationCrossProductcalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/instantaneous-velocity-calculator
 */
router.post(
  "/instantaneous-velocity-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationInstantaneousVelocitycalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/photon-energy-calculator
 */
router.post(
  "/photon-energy-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationPhotonEnergycalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/dot-product-calculator
 */
router.post(
  "/dot-product-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationDotProductcalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/vector-magnitude-calculator
 */
router.post(
  "/vector-magnitude-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationVectorMagnitudecalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/projectile-motion-calculator
 */
router.post(
  "/projectile-motion-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationProjectileMotioncalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/potential-energy-calculator
 */
router.post(
  "/potential-energy-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationPotentialEnergycalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/wavelength-calculator
 */
router.post(
  "/wavelength-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationWavelengthcalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/spring-constant-calculator
 */
router.post(
  "/spring-constant-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationSpringConstantcalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/dew-point-calculator
 */
router.post(
  "/dew-point-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationDewPointcalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/wet-bulb-calculator
 */
router.post(
  "/wet-bulb-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationWetBulbcalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/terminal-velocity-calculator
 */
router.post(
  "/terminal-velocity-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationTerminalVelocityCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/friction-calculator
 */
router.post(
  "/friction-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationFrictionCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/escape-velocity-calculator
 */
router.post(
  "/escape-velocity-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationEscapeVelocityCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/gravity-calculator
 */
router.post(
  "/gravity-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationGravityCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/arrow-speed-calculator
 */
router.post(
  "/arrow-speed-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationArrowSpeedCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/electricity-cost-calculator
 */
router.post(
  "/electricity-cost-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationElectricityCostCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/air-density-calculator
 */
router.post(
  "/air-density-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationAirDensityCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/time-of-flight-calculator
 */
router.post(
  "/time-of-flight-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationTimeofFlightCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/frictional-force-calculator
 */
router.post(
  "/frictional-force-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationFrictionalForceCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/mechanical-energy-calculator
 */
router.post(
  "/mechanical-energy-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationMechanicalEnergyCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/index-of-refraction-calculator
 */
router.post(
  "/index-of-refraction-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationIndexOfRefractionCalculation(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/whp-to-hp-calculator
 */
router.post(
  "/whp-to-hp-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationWHPtoHPCalculation(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/average-speed-calculator
 */
router.post(
  "/average-speed-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationAverageSpeedCalculation(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/dbm-to-watts
 */
router.post(
  "/dbm-to-watts",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationdBmtoWattsCalculation(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/capacitance-calculator
 */
router.post(
  "/capacitance-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationdCapacitanceCalculation(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/angle-of-deviation-calculator
 */
router.post(
  "/angle-of-deviation-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationdAngleofDeviationCalculation(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/electric-potential-calculator
 */
router.post(
  "/electric-potential-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationdElectricPotentialCalculation(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/wave-speed-calculator
 */
router.post(
  "/wave-speed-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationdWaveSpeedCalculation(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/electric-flux-calculator
 */
router.post(
  "/electric-flux-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationdElectricFluxCalculation(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/amps-to-watts-calculator
 */
router.post(
  "/amps-to-watts-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationdAmpstoWattsCalculation(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/watts-to-amps-calculator
 */
router.post(
  "/watts-to-amps-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationdWattstoAmpsCalculation(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/resultant-force-calculator
 */
router.post(
  "/resultant-force-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationdResultantForceCalculation(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/average-velocity-calculator
 */
router.post(
  "/average-velocity-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationAverageVelocityCalculation(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/amp-hour-calculator
 */
router.post(
  "/amp-hour-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationAmpHourCalculation(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/parallel-resistor-calculator
 */
router.post(
  "/parallel-resistor-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationParallelResistorCalculation(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/angle-of-refraction-calculator
 */
router.post(
  "/angle-of-refraction-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationAngleofRefractionCalculation(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/joule-calculator
 */
router.post(
  "/joule-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationJouleCalculation(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/efficiency-calculator
 */
router.post(
  "/efficiency-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationEfficiencyCalculation(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/volts-to-joules-calculator
 */
router.post(
  "/volts-to-joules-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationVoltsToJoulesCalculation(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/buoyancy-calculator
 */
router.post(
  "/buoyancy-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationBuoyancyCalculation(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/fpe-calculator
 */
router.post(
  "/fpe-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationFPECalculation(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/relative-humidity-calculator
 */
router.post(
  "/relative-humidity-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationRelativeHumidityCalculation(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/friction-loss-calculator
 */
router.post(
  "/friction-loss-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationFrictionLossCalculation(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/energy-cost-calculator
 */
router.post(
  "/energy-cost-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationEnergyCostCalculation(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/newtons-law-of-cooling-calculator
 */
router.post(
  "/newtons-law-of-cooling-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationNewtonLawofCoolingCalculation(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/watt-hour-calculator
 */
router.post(
  "/watt-hour-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationWattHourCalculation(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/speed-of-sound-calculator
 */
router.post(
  "/speed-of-sound-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationSpeedofSoundCalculation(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/specific-gravity-calculator
 */
router.post(
  "/specific-gravity-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationSpecificGravityCalculation(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/shannon-diversity-index-calculator
 */
router.post(
  "/shannon-diversity-index-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationShannonDiversityIndexcalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/scientific-notation-calculator
 */
router.post(
  "/scientific-notation-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationScientificNotationCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/prime-factorization-calculator
 */
router.post(
  "/prime-factorization-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationPrimeFactorizationCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/modulo-calculator
 */
router.post(
  "/modulo-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationModuloCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/midpoint-calculator
 */
router.post(
  "/midpoint-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationMidpointCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/slope-calculator
 */
router.post(
  "/slope-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationSlopeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/long-addition-calculator
 */
router.post(
  "/long-addition-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationLongAdditionCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/standard-form-calculator
 */
router.post(
  "/standard-form-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationStandardFormCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/average-calculator
 */
router.post(
  "/average-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationAverageCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/log-antilog-calculator
 */
router.post(
  "/log-antilog-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationLogAndAntilogCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/centroid-triangle-calculator
 */
router.post(
  "/centroid-triangle-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationCentroidCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/quadratic-formula-calculator
 */
router.post(
  "/quadratic-formula-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationQuadraticFormulaCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/remainder-calculator
 */
router.post(
  "/remainder-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationQuotientAndRemainderCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/rounding-numbers-calculator
 */
router.post(
  "/rounding-numbers-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationRoundingCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/fraction-to-decimal-calculator
 */
router.post(
  "/fraction-to-decimal-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationFractionToDecimalCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/decimal-to-fraction-calculator
 */
router.post(
  "/decimal-to-fraction-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationDecimalToFractionCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/fraction-to-percent-calculator
 */
router.post(
  "/fraction-to-percent-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationFractionToPercentCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/percent-to-fraction-calculator
 */
router.post(
  "/percent-to-fraction-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationPercentToFractionCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/million-billion-lakh-crore
 */
router.post(
  "/million-billion-lakh-crore",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationMillionBillionLakhCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/point-slope-form-calculator
 */
router.post(
  "/point-slope-form-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationPointSlopeFormCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/hemisphere-calculator
 */
router.post(
  "/hemisphere-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationHemisphereCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/discriminant-calculator
 */
router.post(
  "/discriminant-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationDiscriminantCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/endpoint-calculator
 */
router.post(
  "/endpoint-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationEndpointCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/slope-intercept-form-calculator
 */
router.post(
  "/slope-intercept-form-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationSlopeInterceptFormCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/exponent-calculator
 */
router.post(
  "/exponent-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationExponentCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/square-root-calculator
 */
router.post(
  "/square-root-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationSquareRootCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/binary-calculator
 */
router.post(
  "/binary-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationBinaryCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/proportion-calculator
 */
router.post(
  "/proportion-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationProportionCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/linear-interpolation-calculator
 */
router.post(
  "/linear-interpolation-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationLinearInterpolationCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/pythagorean-theorem-calculator
 */
router.post(
  "/pythagorean-theorem-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationPythagoreanTheoremCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/unit-circle-calculator
 */
router.post(
  "/unit-circle-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationUnitCircleCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/arc-length-calculator
 */
router.post(
  "/arc-length-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationArcLengthCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/arcsin-calculator
 */
router.post(
  "/arcsin-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationArcsinCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/cosine-calculator
 */
router.post(
  "/cosine-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationCosineCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/sine-calculator
 */
router.post(
  "/sine-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationSineCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/arccos-calculator
 */
router.post(
  "/arccos-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationArccosCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/arctan-calculator
 */
router.post(
  "/arctan-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationArctanCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/tangent-calculator
 */
router.post(
  "/tangent-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationTangentCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/secant-calculator
 */
router.post(
  "/secant-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationSecantCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/csc-calculator
 */
router.post(
  "/csc-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationCscCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/csc-calculator
 */
router.post(
  "/cotangent-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationCotangentCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/e-calculator
 */
router.post(
  "/e-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationECalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/parallel-and-perpendicular-calculator
 */
router.post(
  "/parallel-and-perpendicular-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationParallelAndPerpendicularlineCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/coterminal-angle-calculator
 */
router.post(
  "/coterminal-angle-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationCoterminalAngleCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/arithmetic-sequences-calculator
 */
router.post(
  "/arithmetic-sequences-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationArithmeticSequenceCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/double-angle-calculator
 */
router.post(
  "/double-angle-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationDoubleAngleCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/half-angle-calculator
 */
router.post(
  "/half-angle-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationHalfAngleCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/power-set-calculator
 */
router.post(
  "/power-set-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationPowerSetCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/vertex-form-calculator
 */
router.post(
  "/vertex-form-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationVertexFormCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/subset-calculator
 */
router.post(
  "/subset-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationSubsetCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/hyperbola-calculator
 */
router.post(
  "/hyperbola-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationHyperbolaCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/gradient-calculator
 */
router.post(
  "/gradient-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationGradientCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/midpoint-rule-calculator
 */
router.post(
  "/midpoint-rule-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationMidpointRuleCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/maclaurin-series-calculator
 */
router.post(
  "/maclaurin-series-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationMaclaurinSeriesCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/difference-quotient-calculator
 */
router.post(
  "/difference-quotient-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationDifferenceQuotientCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/complex-number-calculator
 */
router.post(
  "/complex-number-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationComplexNumberCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/wronskian-calculator
 */
router.post(
  "/wronskian-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationWronskianCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/inverse-laplace-transform-calculator
 */
router.post(
  "/inverse-laplace-transform-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationInverseLaplaceTransformCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/summation-calculator
 */
router.post(
  "/summation-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationSummationCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/polar-coordinates-calculator
 */
router.post(
  "/polar-coordinates-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationPolarCoordinatesCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/convolution-calculator
 */
router.post(
  "/convolution-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationConvolutionCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/jacobian-calculator
 */
router.post(
  "/jacobian-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationJacobianCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/washer-method-calculator
 */
router.post(
  "/washer-method-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationWasherMethodCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/shell-method-calculator
 */
router.post(
  "/shell-method-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationShellMethodCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/implicit-differentiation-calculator
 */
router.post(
  "/implicit-differentiation-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationImplicitDifferentiationCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/critical-points-calculator
 */
router.post(
  "/critical-points-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationCriticalPointCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/partial-derivative-calculator
 */
router.post(
  "/partial-derivative-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationPartialDerivativeCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/absolute-value-calculator
 */
router.post(
  "/absolute-value-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationAbsoluteValueCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/area-under-the-curve-calculator
 */
router.post(
  "/area-under-the-curve-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationAreaUnderTheCurveCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/second-derivative-calculator
 */
router.post(
  "/second-derivative-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationSecondDerivativeCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/double-integral-calculator
 */
router.post(
  "/double-integral-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationDoubleIntegralCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/triple-integral-calculator
 */
router.post(
  "/triple-integral-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationTripleIntegralCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/limit-calculator
 */
router.post(
  "/limit-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationLimitCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/laplace-transform-calculator
 */
router.post(
  "/laplace-transform-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationLaplaceTransformCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/inflection-point-calculator
 */
router.post(
  "/inflection-point-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationInflectionPointCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/binomial-theorem-calculator
 */
router.post(
  "/binomial-theorem-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationBinomialTheoremCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/unit-tangent-vector-calculator
 */
router.post(
  "/unit-tangent-vector-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationUnitTangentVectorCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/remainder-theorem-calculator
 */
router.post(
  "/remainder-theorem-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationRemainderTheoremCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/foil-calculator
 */
router.post(
  "/foil-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationFOILCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/trapezoidal-rule-calculator
 */
router.post(
  "/trapezoidal-rule-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationTrapezoidalRuleCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/newtons-method-calculator
 */
router.post(
  "/newtons-method-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationNewtonsMethodCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/mean-value-theorem-calculator
 */
router.post(
  "/mean-value-theorem-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationMeanValueTheoremCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/riemann-sum-calculator
 */
router.post(
  "/riemann-sum-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationRiemannSumCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/inverse-function-calculator
 */
router.post(
  "/inverse-function-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationInverseFunctionCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/composite-function-calculator
 */
router.post(
  "/composite-function-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationCompositeFunctionCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/area-between-two-curves-calculator
 */
router.post(
  "/area-between-two-curves-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationAreaBetweenTwoCurvesCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/zeros-calculator
 */
router.post(
  "/zeros-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationZerosCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/geometric-sequence-calculator
 */
router.post(
  "/geometric-sequence-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationGeometricSequenceCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/truth-table-calculator
 */
router.post(
  "/truth-table-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationTruthTableCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/even-odd-function-calculator
 */
router.post(
  "/even-odd-function-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationEvenOddFunctionCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/synthetic-division-calculator
 */
router.post(
  "/synthetic-division-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationSyntheticDivisionCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/product-rule-derivative-calculator
 */
router.post(
  "/product-rule-derivative-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationProductRuleDerivativeCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/orthocenter-calculator
 */
router.post(
  "/orthocenter-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationOrthocenterCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/polynomial-long-division-calculator
 */
router.post(
  "/polynomial-long-division-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationPolynomialLongDivisionCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/radius-of-convergence-calculator
 */
router.post(
  "/radius-of-convergence-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationRadiusOfConvergenceCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/power-series-calculator
 */
router.post(
  "/power-series-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationPowerSeriesCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/simpsons-rule-calculator
 */
router.post(
  "/simpsons-rule-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationSimpsonRuleCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/curl-calculator
 */
router.post(
  "/curl-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationCurlCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/saddle-point-calculator
 */
router.post(
  "/saddle-point-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationSaddlePointCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/improper-integral-calculator
 */
router.post(
  "/improper-integral-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationImproperIntegralCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/fourier-series-calculator
 */
router.post(
  "/fourier-series-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationFourierSeriesCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/divergence-calculator
 */
router.post(
  "/divergence-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationDivergenceCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/least-to-greatest-calculator
 */
router.post(
  "/least-to-greatest-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationLeastToGreatestCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/angle-of-elevation-calculator
 */
router.post(
  "/angle-of-elevation-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationAngleOfElevationCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/dilation-calculator
 */
router.post(
  "/dilation-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationDilationCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/percentage-increase-calculator
 */
router.post(
  "/percentage-increase-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationPercentageIncreaseCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/percentage-decrease-calculator
 */
router.post(
  "/percentage-decrease-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationPercentageDecreaseCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/sphere-calculator
 */
router.post(
  "/sphere-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationSphereCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/percentage-difference-calculator
 */
router.post(
  "/percentage-difference-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationPercentageDifferenceCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/standard-form-to-slope-intercept-form
 */
router.post(
  "/standard-form-to-slope-intercept-form",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationStandardFormtoSlopeInterceptFormCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/polygon-calculator
 */
router.post(
  "/polygon-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationPolygonCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/golden-ratio-calculator
 */
router.post(
  "/golden-ratio-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationGoldenRatioCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/improper-fractions-to-mixed-numbers
 */
router.post(
  "/improper-fractions-to-mixed-numbers",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationImproperFractionstoMixedNumbersCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/mixed-numbers-to-improper-fractions
 */
router.post(
  "/mixed-numbers-to-improper-fractions",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationMixedNumberstoImproperFractionsCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/local-maxima-and-minima-calculator
 */
router.post(
  "/local-maxima-and-minima-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationLocalMaximaandMinimaCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/lcd-calculator
 */
router.post(
  "/lcd-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationLCDCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/unit-rate-calculator
 */
router.post(
  "/unit-rate-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationUnitRateCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/equivalent-fractions-calculator
 */
router.post(
  "/equivalent-fractions-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationEquivalentFractionsCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/comparing-fractions-calculator
 */
router.post(
  "/comparing-fractions-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationComparingFractionsCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/time-to-decimal-calculator
 */
router.post(
  "/time-to-decimal-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationTimetoDecimalCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/percent-to-decimal-calculator
 */
router.post(
  "/percent-to-decimal-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationPercenttoDecimalCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/decimal-to-percent-calculator
 */
router.post(
  "/decimal-to-percent-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationDecimaltoPercentCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/integer-calculator
 */
router.post(
  "/integer-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationIntegerCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/multiplicative-inverse-calculator
 */
router.post(
  "/multiplicative-inverse-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationMultiplicativeInverseCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/inverse-modulo-calculator
 */
router.post(
  "/inverse-modulo-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationInverseModuloCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/equation-of-a-line-calculator
 */
router.post(
  "/equation-of-a-line-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationEquationLineCalculatorCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/fraction-exponent-calculator
 */
router.post(
  "/fraction-exponent-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationFractionExponentCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/amplitude-and-period-calculator
 */
router.post(
  "/amplitude-and-period-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationAmplitudeAndPeriodCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/exponential-growth-calculator
 */
router.post(
  "/exponential-growth-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationExponentialGrowthCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/perfect-square-trinomial-calculator
 */
router.post(
  "/perfect-square-trinomial-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationPerfectSquareTrinomialCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/power-reducing-formula-calculator
 */
router.post(
  "/power-reducing-formula-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationPowerReducingFormulaCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/diamond-calculator
 */
router.post(
  "/diamond-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationDiamondCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/cross-multiply-calculator
 */
router.post(
  "/cross-multiply-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationCrossMultiplyCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/area-of-a-semicircle
 */
router.post(
  "/area-of-a-semicircle",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationAreaSemicircleCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/degree-and-leading-coefficient
 */
router.post(
  "/degree-and-leading-coefficient",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationAreaDegreeandLeadingCoefficientCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/equivalent-expressions-calculator
 */
router.post(
  "/equivalent-expressions-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationEquivalentExpressionsCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/descartes-rule-of-signs-calculator
 */
router.post(
  "/descartes-rule-of-signs-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationDescartesRuleSignsCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/function-operations-calculator
 */
router.post(
  "/function-operations-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationFunctionOperationsCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/multiplying-polynomials-calculator
 */
router.post(
  "/multiplying-polynomials-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationMultiplyingPolynomialsCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/inequality-calculator
 */
router.post(
  "/inequality-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationInequalityCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/solve-for-x-calculator
 */
router.post(
  "/solve-for-x-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationSolveforxCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/combine-like-terms-calculator
 */
router.post(
  "/combine-like-terms-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationCombiningLikeTermsCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/rotation-calculator
 */
router.post(
  "/rotation-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationRotationCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/reciprocal-calculator
 */
router.post(
  "/reciprocal-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationReciprocalCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/cofunction-calculator
 */
router.post(
  "/cofunction-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationCofunctionCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/additive-inverse-calculator
 */
router.post(
  "/additive-inverse-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationAdditiveInverseCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/monomial-calculator
 */
router.post(
  "/monomial-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationMonomialCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/long-multiplication-calculator
 */
router.post(
  "/long-multiplication-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationLongMultiplicationCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/divisible-calculator
 */
router.post(
  "/divisible-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationDivisibleCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/average-value-of-function
 */
router.post(
  "/average-value-of-function",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationAverageValueFunctionCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/product-sum-calculator
 */
router.post(
  "/product-sum-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationProductSumCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/pascals-triangle-calculator
 */
router.post(
  "/pascals-triangle-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationPascalTriangleCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/order-of-operations-calculator
 */
router.post(
  "/order-of-operations-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationOrderOfOperationsCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/characteristic-polynomial-calculator
 */
router.post(
  "/characteristic-polynomial-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationCharacteristicPolynomialCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/intercepts-calculator
 */
router.post(
  "/intercepts-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationXAndYInterceptsCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/domain-and-range-calculator
 */
router.post(
  "/domain-and-range-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationDomainAndRangeCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/distance-between-two-points-calculator
 */
router.post(
  "/distance-between-two-points-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationDistanceBetweenTwoPointsCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/sas-triangle-calculator
 */
router.post(
  "/sas-triangle-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationSASTriangleCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/radius-of-a-circle-calculator
 */
router.post(
  "/radius-of-a-circle-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationRadiusCircleCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/equilateral-triangle-calculator
 */
router.post(
  "/equilateral-triangle-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationEquilateralTriangleCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/point-of-intersection
 */
router.post(
  "/point-of-intersection",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationPointOfIntersectionCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/exponential-function-calculator
 */
router.post(
  "/exponential-function-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationExponentialFunctionCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/power-of-10-calculator
 */
router.post(
  "/power-of-10-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationPowerof10Calculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/slope-percentage-calculator
 */
router.post(
  "/slope-percentage-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationSlopePercentageCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/change-of-base-formula-calculator
 */
router.post(
  "/change-of-base-formula-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationChangeOfBaseFormulaCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/completing-the-square-calculator
 */
router.post(
  "/completing-the-square-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationCompletingTheSquareCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/cube-root-calculator
 */
router.post(
  "/cube-root-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationCubeRootCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/truncated-pyramid-calculator
 */
router.post(
  "/truncated-pyramid-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationTruncatedPyramidCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/mixed-number-calculator
 */
router.post(
  "/mixed-number-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationMixedNumberCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/fraction-simplifier-calculator
 */
router.post(
  "/fraction-simplifier-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationFractionSimplifierCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/determinant-calculator
 */
router.post(
  "/determinant-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationDeterminantCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/eigenvectors-calculator
 */
router.post(
  "/eigenvectors-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationEigenvectorCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/null-space-calculator
 */
router.post(
  "/null-space-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationNullSpaceCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/matrix-multiplication-calculator
 */
router.post(
  "/matrix-multiplication-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationMatrixMultiplicationCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/sgpa-to-percentage-calculator
 */
router.post(
  "/sgpa-to-percentage-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationSGPAToPercentageCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/hex-calculator
 */
router.post(
  "/hex-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationHexCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/matrix-transpose-calculator
 */
router.post(
  "/matrix-transpose-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationMatrixTransposeCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/weighted-average-calculator
 */
router.post(
  "/weighted-average-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationWeightedAverageCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/test-calculator
 */
router.post(
  "/test-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationTestGradeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/marks-percentage-calculator
 */
router.post(
  "/marks-percentage-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationMarksPercentageCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/decimal-calculator
 */
router.post(
  "/decimal-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationDecimalCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/venn-diagram-calculator
 */
router.post(
  "/venn-diagram-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationVennDiagramCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/fundamental-counting-principle-calculator
 */
router.post(
  "/fundamental-counting-principle-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationFundamentalCountingPrincipleCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/average-percentage-calculator
 */
router.post(
  "/average-percentage-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationAveragePercentageCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/linear-independence-calculator
 */
router.post(
  "/linear-independence-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationLinearIndependenceCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/percentage-change-calculator
 */
router.post(
  "/percentage-change-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationPercentChangeCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/taylor-series-calculator
 */
router.post(
  "/taylor-series-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationTaylorSeriesCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/derivative-calculator
 */
router.post(
  "/derivative-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationDerivativeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/circumcenter-calculator
 */
router.post(
  "/circumcenter-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationCircumcenterCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/roof-pitch-calculator
 */
router.post(
  "/roof-pitch-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationRoofPitchCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/cubic-feet-calculator
 */
router.post(
  "/cubic-feet-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationCubicFeetCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/feet-and-inches-calculator
 */
router.post(
  "/feet-and-inches-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationFeetAndInchesCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/acreage-calculator
 */
router.post(
  "/acreage-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationAcreageCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/rebar-calculator
 */
router.post(
  "/rebar-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationRebarCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/pipe-volume-calculator
 */
router.post(
  "/pipe-volume-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationPipeVolumeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/ms-plate-weight-calculator
 */
router.post(
  "/ms-plate-weight-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationMsPlateWeightCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/ms-plate-weight-calculator
 */
router.post(
  "/price-per-square-foot-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationPricePerSquareFootCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/material-calculator
 */
router.post(
  "/material-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationMaterialCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/retaining-wall-calculator
 */
router.post(
  "/retaining-wall-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationRetainingWallCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);
/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/square-yards-calculator
 */
router.post(
  "/square-yards-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationSquareyardsCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/brick-calculator
 */
router.post(
  "/brick-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationBrickCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/metal-roof-cost-calculator
 */
router.post(
  "/metal-roof-cost-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationMetalRoofCostCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/roof-replacement-cost-calculator
 */
router.post(
  "/roof-replacement-cost-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationRoofReplacementCostCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/square-inches-calculator
 */
router.post(
  "/square-inches-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationSquareInchesCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/sod-calculator
 */
router.post(
  "/sod-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationSodCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/concrete-block-calculator
 */
router.post(
  "/concrete-block-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationConcreteBlockCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/carpet-calculator
 */
router.post(
  "/carpet-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationCarpetCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/cylinder-volume-calculator
 */
router.post(
  "/cylinder-volume-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationCylinderVolumeCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/framing-calculator
 */
router.post(
  "/framing-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationFramingCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/roofing-calculator
 */
router.post(
  "/roofing-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationRoofingCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/decking-calculator
 */
router.post(
  "/decking-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationDeckingCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/sonotube-calculator
 */
router.post(
  "/sonotube-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationSonotubeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/gravel-calculator
 */
router.post(
  "/gravel-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationGravelCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/mulch-calculator
 */
router.post(
  "/mulch-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationMulchCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/sand-calculator
 */
router.post(
  "/sand-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationSandCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/asphalt-calculator
 */
router.post(
  "/asphalt-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationAsphaltCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/square-footage-calculator
 */
router.post(
  "/square-footage-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationSquareFootageCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/concrete-calculator
 */
router.post(
  "/concrete-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationConcreteCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/paver-calculator
 */
router.post(
  "/paver-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationPaverCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/fence-calculator
 */
router.post(
  "/fence-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationFenceCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/topsoil-calculator
 */
router.post(
  "/topsoil-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationTopSoilCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/cubic-yard-calculator
 */
router.post(
  "/cubic-yard-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationCubicYardCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/tile-calculator
 */
router.post(
  "/tile-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationTileCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/flooring-calculator
 */
router.post(
  "/flooring-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationFlooringCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/wallpaper-calculator
 */
router.post(
  "/wallpaper-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationWallpaperCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/stud-calculator
 */
router.post(
  "/stud-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationStudCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/ramp-calculator
 */
router.post(
  "/ramp-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationRampCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/square-meter-calculator
 */
router.post(
  "/square-meter-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationSquareMeterCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/stone-calculator
 */
router.post(
  "/stone-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationStoneCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/room-size-calculator
 */
router.post(
  "/room-size-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationRoomSizeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/tank-volume-calculator
 */
router.post(
  "/tank-volume-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationTankVolumeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/days-since-date-calculator
 */
router.post(
  "/days-since-date-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationDaysSinceDateCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/how-many-days-until-my-birthday
 */
router.post(
  "/how-many-days-until-my-birthday",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationhowManyDaysUntilMyBirthdayCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/months-left-in-the-year
 */
router.post(
  "/months-left-in-the-year",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationhowManymonthsLeftIntheYearCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/weeks-left-in-the-year
 */
router.post(
  "/weeks-left-in-the-year",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationhowManyWeeksLeftIntheYearCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/months-from-now
 */
router.post(
  "/months-from-now",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationMonthFromNowCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/weeks-between-dates-calculator
 */
router.post(
  "/weeks-between-dates-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationWeeksBetweenDatesCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/julians-date-calculator
 */
router.post(
  "/julians-date-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationJuliansDateCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/days-left-in-the-year
 */
router.post(
  "/days-left-in-the-year",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationDaysLeftInTheYearCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/days-ago-calculator
 */
router.post(
  "/days-ago-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationDaysAgoCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/weeks-ago-calculator
 */
router.post(
  "/weeks-ago-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationWeeksAgoCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/years-ago-calculator
 */
router.post(
  "/years-ago-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationYearsAgoCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/hours-ago-calculator
 */
router.post(
  "/hours-ago-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationHoursAgoCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/time-until-calculator
 */
router.post(
  "/time-until-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationTimeUntilCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/hours-from-now
 */
router.post(
  "/hours-from-now",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationHoursFromNowCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/years-from-today
 */

router.post(
  "/years-from-today",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationyearFromTodayCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/weeks-from-today
 */

router.post(
  "/weeks-from-today",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationWeekFromTodayCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/days-from-today
 */

router.post(
  "/days-from-today",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationDaysFromTodayCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/week-calculator
 */

router.post(
  "/week-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationWeekCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/days-until-calculator
 */

router.post(
  "/days-until-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationDaysUntilCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);



/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/elapsed-time-calculator
 */

router.post(
  "/elapsed-time-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationDaysElapsedTimeCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/add-time-calculator
 */

router.post(
  "/add-time-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationAddTimeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/time-duration-calculator
 */

router.post(
  "/time-duration-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationTimeDurationCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/birth-year-calculator
 */

router.post(
  "/birth-year-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationBirthYearCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);



/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/working-days-calculator
 */

router.post(
  "/working-days-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationWorkingDaysCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/deadline-calculator
 */

router.post(
  "/deadline-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationDeadlineCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);



/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/month-calculator
 */

router.post(
  "/month-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationMonthCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/reading-time-calculator
 */

router.post(
  "/reading-time-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationReadingTimeCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/military-time-converter
 */

router.post(
  "/military-time-converter",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationMilitaryTimeConverterCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/date-duration-calculator
 */

router.post(
  "/date-duration-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationDateDurationCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);



/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/lead-time-calculator
 */

router.post(
  "/lead-time-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationLeadTimeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/time-span-calculator
 */

router.post(
  "/time-span-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationTimeSpanCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/time-calculator
 */

router.post(
  "/time-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationTimeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/date-calculator
 */

router.post(
  "/date-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationDateCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/hypergeometric-calculator
 */

router.post(
  "/hypergeometric-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationHypergeometricCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/z-score-calculator
 */

router.post(
  "/z-score-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationZScoreCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/correlation-coefficient-calculator
 */

router.post(
  "/correlation-coefficient-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationCorrelationCoefficientCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/p-value-calculator
 */

router.post(
  "/p-value-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationPValueCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/probability-density-function-calculator
 */

router.post(
  "/probability-density-function-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationProbabilityDensityFunctionCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/effect-size-calculator
 */

router.post(
  "/effect-size-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationeffectSizeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/decile-calculator
 */

router.post(
  "/decile-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationDecileCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/pert-calculator
 */

router.post(
  "/pert-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationPertCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/anova-calculator
 */

router.post(
  "/anova-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationAnovaCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/test-statistic-calculator
 */

router.post(
  "/test-statistic-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationTestStatisticCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/pooled-variance-calculator
 */

router.post(
  "/pooled-variance-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationPooledVarianceCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/sample-distribution-calculator
 */

router.post(
  "/sample-distribution-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationSampleDistributionCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/normal-distribution-calculator
 */

router.post(
  "/normal-distribution-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationNormalDistributionCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/critical-value-calculator
 */

router.post(
  "/critical-value-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationNormalCriticalValueCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/ideal-gas-law-calculator
 */

router.post(
  "/ideal-gas-law-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationNormalIdealGasLawCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/mole-fraction-calculator
 */

router.post(
  "/mole-fraction-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationMoleFractionCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/charles-law-calculator
 */

router.post(
  "/charles-law-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationCharlesLawCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/partial-pressure-calculator
 */

router.post(
  "/partial-pressure-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationPartialPressureCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/ph-calculator
 */

router.post(
  "/ph-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationPhCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/boyles-law-calculator
 */

router.post(
  "/boyles-law-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationBoylesLawCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/combined-gas-law-calculator
 */

router.post(
  "/combined-gas-law-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationCombinedGasLawCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/gay-lussacs-law-calculator
 */

router.post(
  "/gay-lussacs-law-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationGayLussacsLawCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/mass-percent-calculator
 */

router.post(
  "/mass-percent-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationMassPercentCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/rate-constant-calculator
 */

router.post(
  "/rate-constant-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationRateConstantCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/salary-calculator
 */

router.post(
  "/salary-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationSalaryCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/tax-calculator
 */

router.post(
  "/tax-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationTaxCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/discount-calculator
 */

router.post(
  "/discount-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationDiscountCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/gross-income-calculator
 */

router.post(
  "/gross-income-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationGrossIncomeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/monthly-income-calculator
 */

router.post(
  "/monthly-income-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationMonthlyIncomeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/money-counter-calculator
 */

router.post(
  "/money-counter-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationMoneyCounterCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/discounted-cash-flow-calculator
 */

router.post(
  "/discounted-cash-flow-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationdisCountedCashFlowCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/va-disability-calculator
 */

router.post(
  "/va-disability-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationVaDisdisabilityCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/cagr-calculator
 */

router.post(
  "/cagr-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationCagrCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/depreciation-calculator
 */

router.post(
  "/depreciation-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationDepreciationCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/age-calculator
 */

router.post(
  "/age-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationAgeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/ppi-calculator
 */

router.post(
  "/ppi-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationPPICalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/age-difference-calculator
 */

router.post(
  "/age-difference-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationAgeDifferenceCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/freight-class-calculator
 */

router.post(
  "/freight-class-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationFreightClassCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/sobriety-calculator
 */

router.post(
  "/sobriety-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationSobrietyCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/house-age-calculator
 */

router.post(
  "/house-age-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationHouseAgeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/birthday-calculator
 */

router.post(
  "/birthday-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationBirthdayCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/half-birthday-calculator
 */

router.post(
  "/half-birthday-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationHalfBirthdayCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/travel-time-calculator
 */

router.post(
  "/travel-time-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationTravelTimeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/sleep-calculator
 */

router.post(
  "/sleep-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationSleepCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/pant-size-calculator
 */

router.post(
  "/pant-size-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationPantSizeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/drive-time-calculator
 */

router.post(
  "/drive-time-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationDriveTimeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/anniversary-calculator
 */

router.post(
  "/anniversary-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationAnniversaryCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/point-buy-calculator
 */

router.post(
  "/point-buy-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationPointBuyCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/stair-calculator
 */

router.post(
  "/stair-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationStairCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/batting-average-calculator
 */

router.post(
  "/batting-average-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationBattingAverageCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/mpg-calculator
 */

router.post(
  "/mpg-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationMpgCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/aquarium-calculator
 */

router.post(
  "/aquarium-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationAquariumCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/plant-spacing-calculator
 */

router.post(
  "/plant-spacing-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationPlantSpacingCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/gas-calculator
 */

router.post(
  "/gas-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationGasCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/how-many-pages-calculator
 */

router.post(
  "/how-many-pages-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationHowManyPagesCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/how-many-words-calculator
 */

router.post(
  "/how-many-words-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationHowManyWordsCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/weightloss-calculator
 */

router.post(
  "/weightloss-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationWeightlossCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/ovulation-calculator
 */

router.post(
  "/ovulation-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationOvulationCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/pregnancy-calculator
 */

router.post(
  "/pregnancy-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationPregnancyCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/tdee-calculator
 */

router.post(
  "/tdee-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationTdeeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/calorie-deficit-calculator
 */

router.post(
  "/calorie-deficit-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationCalorieDeficitCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/ippt-calculator
 */

router.post(
  "/ippt-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationIpptCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/height-percentile-calculator
 */

router.post(
  "/height-percentile-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationHeightPercentileCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/jump-rope-calorie-calculator
 */

router.post(
  "/jump-rope-calorie-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationJumpRopeCalorieCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/biological-age-calculator
 */

router.post(
  "/biological-age-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationBiologicalAgeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/pregnancy-weight-gain-calculator
 */

router.post(
  "/pregnancy-weight-gain-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationPregnancyWeightGainCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/stroke-volume-calculator
 */

router.post(
  "/stroke-volume-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationStrokeVolumeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/navy-body-fat-calculator
 */

router.post(
  "/navy-body-fat-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationNavyBodyFatCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/eer-calculator
 */

router.post(
  "/eer-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationEerCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/acft-calculator
 */

router.post(
  "/acft-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationAcftCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/carboplatin-calculator
 */

router.post(
  "/carboplatin-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationCarboplatinCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/vo2-max-calculator
 */

router.post(
  "/vo2-max-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationVo2MaxCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/weight-percentile-calculator
 */

router.post(
  "/weight-percentile-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationWeightPercentileCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/height-calculator
 */

router.post(
  "/height-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationHeightCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/pace-calculator
 */

router.post(
  "/pace-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationPaceCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/body-fat-percentage-calculator
 */

router.post(
  "/body-fat-percentage-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationBodyFatPercentageCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/percentage-calculator
 */

router.post(
  "/percentage-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationPercentageCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/fraction-calculator
 */

router.post(
  "/fraction-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationFractionCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/integral-calculator
 */

router.post(
  "/integral-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationIntegralCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/circumference-calculator
 */

router.post(
  "/circumference-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationCircumferenceCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/lcm-calculator
 */

router.post(
  "/lcm-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationLCMCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);



/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/gcf-calculator
 */

router.post(
  "/gcf-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationGCFCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/factorial-calculator
 */

router.post(
  "/factorial-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationFactorialCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/ratio-calculator
 */

router.post(
  "/ratio-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationRatioCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/interval-notation-calculator
 */

router.post(
  "/interval-notation-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationIntervalNotationCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/factoring-calculator
 */

router.post(
  "/factoring-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationFactoringCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/linear-approximation-calculator
 */

router.post(
  "/linear-approximation-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationLinearApproximationCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/average-rate-of-change-calculator
 */

router.post(
  "/average-rate-of-change-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationAverageTateOfChangeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/eulers-method-calculator
 */

router.post(
  "/eulers-method-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationEulersMethodCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/triangle-calculator
 */

router.post(
  "/triangle-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationTriangleCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/tangent-plane-calculator
 */

router.post(
  "/tangent-plane-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationTangentPlaneCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/perimeter-calculator
 */

router.post(
  "/perimeter-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationPerimeterCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/axis-of-symmetry-calculator
 */

router.post(
  "/axis-of-symmetry-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationAxisOfSymmetryCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/distributive-property-calculator
 */

router.post(
  "/distributive-property-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationDistributivePropertyCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/rational-expression-calculator
 */

router.post(
  "/rational-expression-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationRationalExpressionCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/area-of-a-sector-calculator
 */

router.post(
  "/area-of-a-sector-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationAreaOfASectorCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/parallelogram-calculator
 */

router.post(
  "/parallelogram-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationParallelogramCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/reference-angle-calculator
 */

router.post(
  "/reference-angle-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationReferenceAngleCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/rational-or-irrational-calculator
 */

router.post(
  "/rational-or-irrational-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationRationalOrIrrationalCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/simplify-radicals-calculator
 */

router.post(
  "/simplify-radicals-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationSimplifyRadicalsCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/ellipse-equation-calculator
 */

router.post(
  "/ellipse-equation-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationEllipseEquationCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/rref-calculator
 */

router.post(
  "/rref-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationRrefCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/gematria-calculator
 */

router.post(
  "/gematria-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationGematriaCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/base-calculator
 */

router.post(
  "/base-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationBaseCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/ratio-to-fraction-calculator
 */

router.post(
  "/ratio-to-fraction-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationRatioToFractionCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/gram-schmidt-calculator
 */

router.post(
  "/gram-schmidt-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationGramSchmidtCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/volume-of-triangular-pyramid
 */

router.post(
  "/volume-of-triangular-pyramid",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationVolumeOfTriangularPyramidCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/area-calculator
 */

router.post(
  "/area-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationAreaCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/30-60-90-triangle-calculator
 */

router.post(
  "/30-60-90-triangle-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationthirtytriangleCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/literal-equations-calculator
 */

router.post(
  "/literal-equations-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationLiteralEquationsCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/trigonometry-calculator
 */

router.post(
  "/trigonometry-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationTrigonometryCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/sohcahtoa-calculator
 */

router.post(
  "/sohcahtoa-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationSohcahtoaCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/45-45-90-triangle-calculator
 */

router.post(
  "/45-45-90-triangle-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationFortyFivetriangleCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/twos-complement-calculator
 */

router.post(
  "/twos-complement-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationTwoComplementCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/law-of-sines-calculator
 */

router.post(
  "/law-of-sines-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationLawOfSinesCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/law-of-cosines-calculator
 */

router.post(
  "/law-of-cosines-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationLawOfCosinesCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/tangent-line-calculator
 */

router.post(
  "/tangent-line-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationTangentLineCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/ones-complement-calculator
 */

router.post(
  "/ones-complement-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationOnesComplementCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/hypotenuse-calculator
 */

router.post(
  "/hypotenuse-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationHypotenuseCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/angle-between-two-vectors-calculator
 */

router.post(
  "/angle-between-two-vectors-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationAngleBetweenTwoVectorsCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/directional-derivative-calculator
 */

router.post(
  "/directional-derivative-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationDirectionalDerivativeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/eigenvalues-calculator
 */

router.post(
  "/eigenvalues-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationEigenvaluesCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/equation-of-a-circle
 */

router.post(
  "/equation-of-a-circle",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationEquationOfCircleCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/gaussian-elimination-calculator
 */

router.post(
  "/gaussian-elimination-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationGaussianEliminationCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/final-grade-calculator
 */

router.post(
  "/final-grade-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationFinalGradeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/substitution-method-calculator
 */

router.post(
  "/substitution-method-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationSubstitutionMethodCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/system-of-equations-calculator
 */

router.post(
  "/system-of-equations-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationSystemOfEquationsCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/inverse-matrix-calculator
 */

router.post(
  "/inverse-matrix-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationInverseMatrixCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/vector-addition-calculator
 */

router.post(
  "/vector-addition-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationVectorAdditionCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/gauss-seidel-calculator
 */

router.post(
  "/gauss-seidel-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationGaussSeidelCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/rationalize-the-denominator-calculator
 */

router.post(
  "/rationalize-the-denominator-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationRationalizeTheDenominatorCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/surface-area-calculator
 */

router.post(
  "/surface-area-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationSurfaceAreaCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/length-of-curve-calculator
 */

router.post(
  "/length-of-curve-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationLengthOfCurveCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/diagonal-calculator
 */

router.post(
  "/diagonal-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationDiagonalCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/rational-zeros-calculator
 */

router.post(
  "/rational-zeros-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationRationalZerosCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/augmented-matrix-calculator
 */

router.post(
  "/augmented-matrix-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationAugmentedMatrixCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/elementary-matrix-calculator
 */

router.post(
  "/elementary-matrix-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationElementaryMatrixCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/distance-formula-calculator
 */

router.post(
  "/distance-formula-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationDistanceFormulaCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/volume-of-capsule
 */

router.post(
  "/volume-of-capsule",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationVolumeOfCapsuleCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/conical-frustum-volume-calculator
 */

router.post(
  "/conical-frustum-volume-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationConicalFrustumVolumeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/volume-of-a-rectangle
 */

router.post(
  "/volume-of-a-rectangle",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationVolumeOfRectangleCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/similar-triangles-calculator
 */

router.post(
  "/similar-triangles-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationSimilarTrianglesCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/volume-calculator
 */

router.post(
  "/volume-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationVolumeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/parabola-calculator
 */

router.post(
  "/parabola-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationParabolaCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/velocity-calculator
 */

router.post(
  "/velocity-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationVelocityCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/displacement-calculator
 */

router.post(
  "/displacement-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationDisplacementCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/ohms-law-calculator
 */

router.post(
  "/ohms-law-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationOhmsLawCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/torque-calculator
 */

router.post(
  "/torque-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationTorqueCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/horsepower-calculator
 */

router.post(
  "/horsepower-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationHorsepowerCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/kinematics-calculator
 */

router.post(
  "/kinematics-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationKinematicsCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/instantaneous-rate-of-change-calculator
 */

router.post(
  "/instantaneous-rate-of-change-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationInstantaneousRateOfChangeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/specific-heat-calculator
 */

router.post(
  "/specific-heat-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationSpecificHeatCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/work-calculator
 */

router.post(
  "/work-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationWorkCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/water-viscosity-calculator
 */

router.post(
  "/water-viscosity-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationWaterViscosityCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/unit-vector-calculator
 */

router.post(
  "/unit-vector-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationUnitVectorCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/center-of-mass-calculator
 */

router.post(
  "/center-of-mass-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationCenterOfMassCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/electric-field-calculator
 */

router.post(
  "/electric-field-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationelEctricFieldCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/moment-of-inertia-calculator
 */

router.post(
  "/moment-of-inertia-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationelMomentOfInertiaCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/free-fall-calculator
 */

router.post(
  "/free-fall-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationelFreeFallCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/transformer-calculator
 */

router.post(
  "/transformer-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationelTransformerCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/speed-distance-time-calculator
 */

router.post(
  "/speed-distance-time-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationelSpeedDistanceTimeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/vector-projection-calculator
 */

router.post(
  "/vector-projection-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationelVectorProjectionCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/voltage-drop-calculator
 */

router.post(
  "/voltage-drop-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationelVoltageDropCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/quarter-mile-calculator
 */

router.post(
  "/quarter-mile-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationelQuarterMileCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/coulombs-law-calculator
 */

router.post(
  "/coulombs-law-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationelCoulombsLawCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/solar-panel-calculator
 */

router.post(
  "/solar-panel-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationelSolarPanelCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/centripetal-force-calculator
 */

router.post(
  "/centripetal-force-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationelCentripetalForceCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/angular-acceleration-calculator
 */

router.post(
  "/angular-acceleration-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationelAngularAccelerationCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/tension-calculator
 */

router.post(
  "/tension-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationelTensionCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/heat-index-calculator
 */

router.post(
  "/heat-index-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationelHeatIndexCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/reynolds-number-calculator
 */

router.post(
  "/reynolds-number-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationelReynoldsNumberCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/change-in-momentum-calculator
 */

router.post(
  "/change-in-momentum-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationelChangeInMomentumCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/snells-law-calculator
 */

router.post(
  "/snells-law-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationelSnellsLawCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/impulse-calculator
 */

router.post(
  "/impulse-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationelImpulseCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/watt-calculator
 */

router.post(
  "/watt-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationeWattCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/time-dilation-calculator
 */

router.post(
  "/time-dilation-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationeTimeDilationCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/orbital-period-calculator
 */

router.post(
  "/orbital-period-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationeOrbitalPeriodCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/normal-force-calculator
 */

router.post(
  "/normal-force-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationeNormalForceCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/density-altitude-calculator
 */

router.post(
  "/density-altitude-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationeDensityAltitudeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/kinetic-energy-calculator
 */

router.post(
  "/kinetic-energy-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationeKineticEnergyCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/momentum-calculator
 */

router.post(
  "/momentum-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationeMomentumCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/angular-velocity-calculator
 */

router.post(
  "/angular-velocity-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationeAngularVelocityCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/density-calculator
 */

router.post(
  "/density-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationeDensityCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/force-calculator
 */

router.post(
  "/force-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationeForceCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/enthalpy-calculator
 */

router.post(
  "/enthalpy-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationeEnthalpyCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/scale-calculator
 */

router.post(
  "/scale-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationeScaleCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/gear-ratio-calculator
 */

router.post(
  "/gear-ratio-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationeGearRatioCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/resistance-calculator
 */

router.post(
  "/resistance-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationeResistanceCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/wire-size-calculator
 */

router.post(
  "/wire-size-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationeWireSizeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/dc-wire-size-calculator
 */

router.post(
  "/dc-wire-size-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationeDcWireSizeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/beam-deflection-calculator
 */

router.post(
  "/beam-deflection-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationeBeamDeflectionCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/flow-rate-calculator
 */

router.post(
  "/flow-rate-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationeFlowRateCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);


/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/dimensional-analysis-calculator
 */

router.post(
  "/dimensional-analysis-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationeDimensionalAnalysisCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/acceleration-calculator
 */

router.post(
  "/acceleration-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationeAccelerationCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);




module.exports = router;