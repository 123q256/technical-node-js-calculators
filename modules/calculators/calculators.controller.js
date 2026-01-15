const { asyncHandler, ApiResponse } = require("../../middlewares/middlewares");
const HttpCodes = require("http-codes");
const CalculatorsServices = require("./calculators.services");
const PetsCalculatorsServices = require("../all_calculators/pets/calculators.services");
const TimedateCalculatorsServices = require("../all_calculators/timedate/calculators.services");
const ConstructionCalculatorsServices = require("../all_calculators/construction/calculators.services");
const StatisticsCalculatorsServices = require("../all_calculators/statistics/calculators.services");
const ChemistryCalculatorsServices = require("../all_calculators/chemistry/calculators.services");
const PhysicsCalculatorsServices = require("../all_calculators/physics/calculators.services");
const FinanceCalculatorsServices = require("../all_calculators/finance/calculators.services");
const EverydayLifeCalculatorsServices = require("../all_calculators/everyday-life/calculators.services");
const HealthCalculatorsServices = require("../all_calculators/health/calculators.services");
const MathCalculatorsServices = require("../all_calculators/math/calculators.services");
const db = require("../../models");

const router = require("express").Router();

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/fifo-lifo-calculator
 */

router.post(
  "/fifo-lifo-calculator",
  asyncHandler(async (req, res) => {
    const result = await FinanceCalculatorsServices.FifoLifoCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);
/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/tire-size-calculator
 */

router.post(
  "/tire-size-calculator",
  asyncHandler(async (req, res) => {
    const result = await EverydayLifeCalculatorsServices.TireSizeCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);
/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/tire-size-calculator
 */

router.post(
  "/base-calculator",
  asyncHandler(async (req, res) => {
    const result = await MathCalculatorsServices.BaseNumberCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);
/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/height-comparison
 */

router.post(
  "/height-comparison",
  asyncHandler(async (req, res) => {
    const result = await HealthCalculatorsServices.HeightComparison(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);
/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/tire-size-calculator
 */

router.post(
  "/system-of-equations-calculator",
  asyncHandler(async (req, res) => {
    const result = await MathCalculatorsServices.SystemOfEquationsCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

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
      await ConstructionCalculatorsServices.getCalculationSquareInchesCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await StatisticsCalculatorsServices.getCalculationClassWidthCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await ChemistryCalculatorsServices.getCalculationBondOrderCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await PhysicsCalculatorsServices.getCalculationWavePeriodCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await FinanceCalculatorsServices.getCalculationwaterBillCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await EverydayLifeCalculatorsServices.getCalculationLoveCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationPercentErrorCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await HealthCalculatorsServices.getCalculationBenchPressCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await PetsCalculatorsServices.getCalculationDogPregnancyCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await PetsCalculatorsServices.getCalculationBenadrylForDogsCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await PetsCalculatorsServices.getCalculationCatCaloieCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await PetsCalculatorsServices.getCalculationPuppyWeigthCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await PetsCalculatorsServices.getCalculationPearsonAgeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await PetsCalculatorsServices.getCalculationDogAgeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await PetsCalculatorsServices.getCalculationDogCreateSizeCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await PetsCalculatorsServices.getCalculationDogFoodCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationRoundtoTheNearestCentCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationSquereRootCurveCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationLogBase2Calculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationComparingDecimalCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationDoublingtimeCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationVariationCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationFibonacciCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationCircumferenceToDiameterCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationAbsoluteChangeCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationVolumeOfSquareCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await HealthCalculatorsServices.getCalculationBinCreatinineRatioCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await HealthCalculatorsServices.getCalculationGramsTocaloriesCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await HealthCalculatorsServices.getCalculationMapCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await HealthCalculatorsServices.getCalculationOneRepMaxCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await HealthCalculatorsServices.getCalculationSVRCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await HealthCalculatorsServices.getCalculationTacoBarCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await HealthCalculatorsServices.getCalculationWaterIntakeCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await HealthCalculatorsServices.getCalculationIdiCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await HealthCalculatorsServices.getCalculationA1cCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await HealthCalculatorsServices.getCalculationIncidenceRateCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await HealthCalculatorsServices.getCalculationItRatioCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await HealthCalculatorsServices.getCalculationMaxHeartRateCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await HealthCalculatorsServices.getCalculationPackYearCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await HealthCalculatorsServices.getCalculationRuckingCaloriesCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await FinanceCalculatorsServices.getCalculationEbitCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await FinanceCalculatorsServices.getCalculationStampDutyCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await FinanceCalculatorsServices.getCalculationCTRCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await FinanceCalculatorsServices.getCalculationContributionMarginCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await FinanceCalculatorsServices.getCalculationYoutubeRevenueCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await FinanceCalculatorsServices.getCalculationBookValueCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await FinanceCalculatorsServices.getCalculationCostOfGoodsSoldCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await FinanceCalculatorsServices.getCalculationRentIncreaseCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await FinanceCalculatorsServices.getCalculationSalvageValueCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await FinanceCalculatorsServices.getCalculationRealEstateCommissionCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await FinanceCalculatorsServices.getCalculationGdpPerCapitaCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await FinanceCalculatorsServices.getCalculationPriceCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await FinanceCalculatorsServices.getCalculationBuyingPowerCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await FinanceCalculatorsServices.getCalculationCrossPriceElasticityCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await FinanceCalculatorsServices.getCalculationActualCashValueCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await FinanceCalculatorsServices.getCalculationNetWorthCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await FinanceCalculatorsServices.getCalculationCostBasisCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await FinanceCalculatorsServices.getCalculationComparativeAdvantageCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await FinanceCalculatorsServices.getCalculationCurrentRationCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await FinanceCalculatorsServices.getCalculationDeadWeightLossCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await FinanceCalculatorsServices.getCalculationReverSaleTaxCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await FinanceCalculatorsServices.getCalculationMarginalRevenueCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await FinanceCalculatorsServices.getCalculationCashBackCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await FinanceCalculatorsServices.getCalculationEarningPerShareCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await FinanceCalculatorsServices.getCalculationOptionProfitCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await FinanceCalculatorsServices.getCalculationDividendYieldCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await FinanceCalculatorsServices.getCalculationMarkdownCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await FinanceCalculatorsServices.getCalculationAGICalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await FinanceCalculatorsServices.getCalculationMPCCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await FinanceCalculatorsServices.getCalculationMaximumProfitCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await FinanceCalculatorsServices.getCalculationIncomeElasticityOfDemandCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await FinanceCalculatorsServices.getCalculationProfitMarginCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await FinanceCalculatorsServices.getCalculationEnterpriseValueCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await FinanceCalculatorsServices.getCalculationCPCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await FinanceCalculatorsServices.getCalculationOutTheDoorPriceCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await FinanceCalculatorsServices.getCalculationSalaryCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await HealthCalculatorsServices.getCalculationBmiCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await FinanceCalculatorsServices.getCalculationVatCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await FinanceCalculatorsServices.getCalculationSalestaxCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await FinanceCalculatorsServices.getCalculationPriceElasticaityDemandCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await FinanceCalculatorsServices.getCalculationWaccCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await FinanceCalculatorsServices.getCalculationEbitdaCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await FinanceCalculatorsServices.getCalculationPaypalFeeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await FinanceCalculatorsServices.getCalculationMarginOfErrorCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await FinanceCalculatorsServices.getCalculationCpmCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await FinanceCalculatorsServices.getCalculationMarkupCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await FinanceCalculatorsServices.getCalculationCapRateCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await FinanceCalculatorsServices.getCalculationCapmRateCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await FinanceCalculatorsServices.getCalculationMarginalCostCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await FinanceCalculatorsServices.getCalculationPercentOfSaleCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await FinanceCalculatorsServices.getCalculationOvertimeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await FinanceCalculatorsServices.getCalculationRoiCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await FinanceCalculatorsServices.getCalculationFutureValueOfAnnuityCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await FinanceCalculatorsServices.getCalculationUnemploymentRateCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await FinanceCalculatorsServices.getCalculationCostOfEquityCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await FinanceCalculatorsServices.getCalculationConsumerSurplusCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await FinanceCalculatorsServices.getCalculationStockCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await FinanceCalculatorsServices.getCalculationPayRaiseCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await FinanceCalculatorsServices.getCalculationRoasCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await FinanceCalculatorsServices.getCalculationTurboCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await FinanceCalculatorsServices.getCalculationCommissionCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await FinanceCalculatorsServices.getCalculationTimeAndaHalfCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await FinanceCalculatorsServices.getCalculationVariableCostCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await FinanceCalculatorsServices.getCalculationGrowthRateCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await FinanceCalculatorsServices.getCalculationLaborCostCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await FinanceCalculatorsServices.getCalculationBetaCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await FinanceCalculatorsServices.getCalculationGPDCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await FinanceCalculatorsServices.getCalculationNPSCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await FinanceCalculatorsServices.getCalculationBondPriceCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await FinanceCalculatorsServices.getCalculationOpportunityCostCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await FinanceCalculatorsServices.getCalculationCarDepreciationCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await FinanceCalculatorsServices.getCalculationPropertyDepreciationCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await FinanceCalculatorsServices.getCalculationPaybackPeriodCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await FinanceCalculatorsServices.getCalculationBasisPontCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await FinanceCalculatorsServices.getCalculationWeddingBudgetCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await FinanceCalculatorsServices.getCalculationEmloyeeCostCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await FinanceCalculatorsServices.getCalculationNPVCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await FinanceCalculatorsServices.getCalculationTipCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await FinanceCalculatorsServices.getCalculationHourlyToSalaryCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await FinanceCalculatorsServices.getCalculationSalaryToHourlyCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await FinanceCalculatorsServices.getCalculationRentSpitCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await FinanceCalculatorsServices.getCalculationARVCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await HealthCalculatorsServices.getCalculation6MinuteWalkTestCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await HealthCalculatorsServices.getCalculationRMRCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await HealthCalculatorsServices.getCalculationBMRCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await HealthCalculatorsServices.getCalculationIdealWeightCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await HealthCalculatorsServices.getCalculationLeanBodyMassCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await HealthCalculatorsServices.getCalculationBSACalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await HealthCalculatorsServices.getCalculationCorrectedCalciumCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await HealthCalculatorsServices.getCalculationANCCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await HealthCalculatorsServices.getCalculationALCCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await HealthCalculatorsServices.getCalculationReticulocyteCountCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await HealthCalculatorsServices.getCalculationCentorScoreCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await HealthCalculatorsServices.getCalculationChildPughCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await HealthCalculatorsServices.getCalculationWaistToHipRatioCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await HealthCalculatorsServices.getCalculationWaistToHeightRatioCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await HealthCalculatorsServices.getCalculationFFMICalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await HealthCalculatorsServices.getCalculationBodyShapeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await HealthCalculatorsServices.getCalculationWeightLossPercentageCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await HealthCalculatorsServices.getCalculationDosageCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await HealthCalculatorsServices.getCalculationBraSizeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await HealthCalculatorsServices.getCalculationImplantationCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await HealthCalculatorsServices.getCalculationBloodTypeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await HealthCalculatorsServices.getCalculationMelatoninDosageCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await HealthCalculatorsServices.getCalculationProstateVolumeCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await HealthCalculatorsServices.getCalculationDihybridcrossCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await HealthCalculatorsServices.getCalculationHCGCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await HealthCalculatorsServices.getCalculationDressSizeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await HealthCalculatorsServices.getCalculationTinettiCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await HealthCalculatorsServices.getCalculationDripRateCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await HealthCalculatorsServices.getCalculationStepstoCaloriesCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await HealthCalculatorsServices.getCalculationCholesterolRatioCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await HealthCalculatorsServices.getCalculationParacetamolDosageCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await HealthCalculatorsServices.getCalculationAmoxicillinPediatricDosageCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await HealthCalculatorsServices.getCalculationHarrisBenedictCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await HealthCalculatorsServices.getCalculationCaloriesBurnedBikingCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await HealthCalculatorsServices.getCalculationTreadmillCalorieCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await HealthCalculatorsServices.getCalculationWalkingCalorieCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await HealthCalculatorsServices.getCalculationEllipticalCalorieCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await HealthCalculatorsServices.getCalculationBulkingCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await HealthCalculatorsServices.getCalculationFoodCostCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await HealthCalculatorsServices.getCalculationStepsToMilesCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await HealthCalculatorsServices.getCalculationFatBurningHeartCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await HealthCalculatorsServices.getCalculationNNTCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await HealthCalculatorsServices.getCalculationAstAltRatioCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await HealthCalculatorsServices.getCalculationNetCarbsCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await HealthCalculatorsServices.getCalculationUrineOutputCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await HealthCalculatorsServices.getCalculationBishopScoreCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await HealthCalculatorsServices.getCalculationArmyBodyFatCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await HealthCalculatorsServices.getCalculationAdjustedBodyWeightCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await HealthCalculatorsServices.getCalculationDrugHalfLifeCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await HealthCalculatorsServices.getCalculationMacroCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await HealthCalculatorsServices.getCalculationMealCalorieCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await HealthCalculatorsServices.getCalculationTargetHeartRateCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await HealthCalculatorsServices.getCalculationWilksCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await HealthCalculatorsServices.getCalculationAlleleFrequencyCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await HealthCalculatorsServices.getCalculationWeightWatchersPointsCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await HealthCalculatorsServices.getCalculationWeightGainCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await HealthCalculatorsServices.getCalculationPediatricDoseCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await HealthCalculatorsServices.getCalculationMaintenanceCalorieCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await HealthCalculatorsServices.getCalculationBreastfeedingCalorieCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await HealthCalculatorsServices.getCalculationSwimmingCalorieCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await HealthCalculatorsServices.getCalculationProteinCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await EverydayLifeCalculatorsServices.getCalculationDistanceCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await EverydayLifeCalculatorsServices.getCalculationErACalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await EverydayLifeCalculatorsServices.getCalculationVoriciChromaticCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await EverydayLifeCalculatorsServices.getCalculationAspectRatioCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await EverydayLifeCalculatorsServices.getCalculationBoardFootCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await EverydayLifeCalculatorsServices.getCalculationEdpiCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await EverydayLifeCalculatorsServices.getCalculationVisaChanceCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await EverydayLifeCalculatorsServices.getCalculationPopulationDensityCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await EverydayLifeCalculatorsServices.getCalculationProratedrentCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await EverydayLifeCalculatorsServices.getCalculationKoreanAgeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await EverydayLifeCalculatorsServices.getCalculationWinningPercentageCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await EverydayLifeCalculatorsServices.getCalculationMcgToMgCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await EverydayLifeCalculatorsServices.getCalculationDownloadCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await EverydayLifeCalculatorsServices.getCalculationKdCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await EverydayLifeCalculatorsServices.getCalculationDataTransferCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await EverydayLifeCalculatorsServices.getCalculationWordsPerMinuteCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await EverydayLifeCalculatorsServices.getCalculationDeskHeightCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await EverydayLifeCalculatorsServices.getCalculationRingSizeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await EverydayLifeCalculatorsServices.getCalculationShoeSizeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await EverydayLifeCalculatorsServices.getCalculationCurtainSizeCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await EverydayLifeCalculatorsServices.getCalculationTeslaChargingCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await EverydayLifeCalculatorsServices.getCalculationCompressionHightCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await EverydayLifeCalculatorsServices.getCalculationFuelCostCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await EverydayLifeCalculatorsServices.getCalculationLawnMowingCostCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await EverydayLifeCalculatorsServices.getCalculationTvSizeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await EverydayLifeCalculatorsServices.getCalculationRiverRockCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await EverydayLifeCalculatorsServices.getCalculationCircleSkirtCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await EverydayLifeCalculatorsServices.getCalculationBotoxCostCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await EverydayLifeCalculatorsServices.getCalculationYardsToTonsCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await EverydayLifeCalculatorsServices.getCalculationDilutionRatioCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await EverydayLifeCalculatorsServices.getCalculationgpMCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await EverydayLifeCalculatorsServices.getCalculationCeilingfanSizeCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await EverydayLifeCalculatorsServices.getCalculationCostPerMileDrivingCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await EverydayLifeCalculatorsServices.getCalculationGoldCostPerPoundCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await EverydayLifeCalculatorsServices.getCalculationMoistureContentCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await EverydayLifeCalculatorsServices.getCalculationShadedAreaCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await EverydayLifeCalculatorsServices.getCalculationEngneHourstoMilesCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await EverydayLifeCalculatorsServices.getCalculationMagnificationCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await EverydayLifeCalculatorsServices.getCalculationSplitBillCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await EverydayLifeCalculatorsServices.getCalculationDrawLengthCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await EverydayLifeCalculatorsServices.getCalculationOnBasePercentageCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await EverydayLifeCalculatorsServices.getCalculationTaperCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await EverydayLifeCalculatorsServices.getCalculationBatteryLifeCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await EverydayLifeCalculatorsServices.getCalculationSluggingPercentageCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await EverydayLifeCalculatorsServices.getCalculationMagicNumberCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await EverydayLifeCalculatorsServices.getCalculationFabricCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await EverydayLifeCalculatorsServices.getCalculationSemestergradeCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await EverydayLifeCalculatorsServices.getCalculationScreenSizeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await EverydayLifeCalculatorsServices.getCalculationRecessedLightingCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await EverydayLifeCalculatorsServices.getCalculationCMFCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await EverydayLifeCalculatorsServices.getCalculationBoxFillCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await EverydayLifeCalculatorsServices.getCalculationTonnageCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await EverydayLifeCalculatorsServices.getCalculationDunkCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await EverydayLifeCalculatorsServices.getCalculationNetherPortalCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await EverydayLifeCalculatorsServices.getCalculationCBMCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await EverydayLifeCalculatorsServices.getCalculationBikeSizeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await EverydayLifeCalculatorsServices.getCalculationAcBtuCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await EverydayLifeCalculatorsServices.getCalculationBlindSizeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await EverydayLifeCalculatorsServices.getCalculationAverageTimeCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await EverydayLifeCalculatorsServices.getCalculationHourlyPayCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await EverydayLifeCalculatorsServices.getCalculationLogWeightCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await EverydayLifeCalculatorsServices.getCalculationWaterWeightCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await EverydayLifeCalculatorsServices.getCalculationTurkeySizeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await ChemistryCalculatorsServices.getCalculationAverageAtomicMassCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await ChemistryCalculatorsServices.getCalculationGibbsFreeEnergyCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await ChemistryCalculatorsServices.getCalculationvaporPressureCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await ChemistryCalculatorsServices.getCalculationEntropyCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await ChemistryCalculatorsServices.getCalculationSolutionDilutionCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await ChemistryCalculatorsServices.getCalculationChemicalEquationBalancerCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await ChemistryCalculatorsServices.getCalculationLimitingReactantCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await ChemistryCalculatorsServices.getCalculationRedoxReactionCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await ChemistryCalculatorsServices.getCalculationPPMCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await ChemistryCalculatorsServices.getCalculationMolalityCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await ChemistryCalculatorsServices.getCalculationMoleRatioCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await ChemistryCalculatorsServices.getCalculationMolarityCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await ChemistryCalculatorsServices.getCalculationDilutionCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await ChemistryCalculatorsServices.getCalculationAtomtoMolesCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await ChemistryCalculatorsServices.getCalculationGramstoAtomsCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await ChemistryCalculatorsServices.getCalculationPkaToPhCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await ChemistryCalculatorsServices.getCalculationTheoreticalyieldCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await ChemistryCalculatorsServices.getCalculationMolecularFormulaCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await ChemistryCalculatorsServices.getCalculationFormalChargeCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await ChemistryCalculatorsServices.getCalculationEquilibriumConstantCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await ChemistryCalculatorsServices.getCalculationElectronConfigurationCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await ChemistryCalculatorsServices.getCalculationMolarMassCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await ChemistryCalculatorsServices.getCalculationTitrationCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await ChemistryCalculatorsServices.getCalculationHalfLifeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await ChemistryCalculatorsServices.getCalculationMoleCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await ChemistryCalculatorsServices.getCalculationAtomicMassCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await ChemistryCalculatorsServices.getCalculationNernstEquationCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await ChemistryCalculatorsServices.getCalculationGramsToMolesCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await ChemistryCalculatorsServices.getCalculationMolesToGramsCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await ChemistryCalculatorsServices.getCalculationActivationEnergyCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await ChemistryCalculatorsServices.getCalculationMmolLToMgDlCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await ChemistryCalculatorsServices.getCalculationCFUCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await ChemistryCalculatorsServices.getCalculationMlToMolesCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await ChemistryCalculatorsServices.getCalculationSTPCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await ChemistryCalculatorsServices.getCalculationStoichiometryCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await ChemistryCalculatorsServices.getCalculationEmpiricalFormulaCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await ChemistryCalculatorsServices.getCalculationPercentYieldCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await PhysicsCalculatorsServices.getCalculationPowerToWeightRatioCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await PhysicsCalculatorsServices.getCalculationConstantOfProportionalityCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await PhysicsCalculatorsServices.getCalculationQuantmNumberCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await PhysicsCalculatorsServices.getCalculationCcTohpCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await StatisticsCalculatorsServices.getCalculationCombinationCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await StatisticsCalculatorsServices.getCalculationCentralLimittheoremCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await StatisticsCalculatorsServices.getCalculationbinomialCoefficientCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await StatisticsCalculatorsServices.getCalculationRowScoreCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await StatisticsCalculatorsServices.getCalculationEmpiricalProbabilityCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await StatisticsCalculatorsServices.getCalculationRelativeRiskCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await StatisticsCalculatorsServices.getCalculationChiSquareCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await StatisticsCalculatorsServices.getCalculationPHapCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await StatisticsCalculatorsServices.getCalculationStandardErrorCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await StatisticsCalculatorsServices.getCalculationEmpiricalRuleCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await StatisticsCalculatorsServices.getCalculationExpectedValueCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await StatisticsCalculatorsServices.getCalculationMadCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await StatisticsCalculatorsServices.getCalculationPermutationCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await StatisticsCalculatorsServices.getCalculationStandardDeviationCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await StatisticsCalculatorsServices.getCalculationFiveNumberSummaryCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await StatisticsCalculatorsServices.getCalculationConfidenceIntervalCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await StatisticsCalculatorsServices.getCalculationVarianceCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await StatisticsCalculatorsServices.getCalculationCoefficientOfDeterminationCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await StatisticsCalculatorsServices.getCalculationPointEstimateCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await StatisticsCalculatorsServices.getCalculationRelativeFrequencyCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await StatisticsCalculatorsServices.getCalculationProbabilityCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await StatisticsCalculatorsServices.getCalculationCoefficientOfVariationCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await StatisticsCalculatorsServices.getCalculationCovarianceCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await StatisticsCalculatorsServices.getCalculationMeanMedianModeRangeCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await StatisticsCalculatorsServices.getCalculationQuartileCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await StatisticsCalculatorsServices.getCalculationGeometricMeanCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await StatisticsCalculatorsServices.getCalculationHarmonicMeanCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await StatisticsCalculatorsServices.getCalculationIQRCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await StatisticsCalculatorsServices.getCalculationSumOfSquaresCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await StatisticsCalculatorsServices.getCalculationPoissonDistributionCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await StatisticsCalculatorsServices.getCalculationBinomialDistributionCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await StatisticsCalculatorsServices.getCalculationInvnormCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await StatisticsCalculatorsServices.getCalculationLinearRegressionCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await StatisticsCalculatorsServices.getCalculationOutliercalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await StatisticsCalculatorsServices.getCalculationQuadraticRegressioncalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await StatisticsCalculatorsServices.getCalculationPercentilecalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await StatisticsCalculatorsServices.getCalculationStemAndLeafPlotcalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await StatisticsCalculatorsServices.getCalculationDegreesOfFreedomcalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/midrange-calculator
 */
router.post(
  "/midrange-calculator",
  asyncHandler(async (req, res) => {
    const result = await StatisticsCalculatorsServices.getCalculationMidrangecalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await StatisticsCalculatorsServices.getCalculationRSDcalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await StatisticsCalculatorsServices.getCalculationChebyshevTheoremcalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await StatisticsCalculatorsServices.getCalculationBoxPlotcalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await StatisticsCalculatorsServices.getCalculationCoinFlipcalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await StatisticsCalculatorsServices.getCalculationPercentileRankcalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await StatisticsCalculatorsServices.getCalculationSSEcalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await StatisticsCalculatorsServices.getCalculationPredictionIntervalcalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await StatisticsCalculatorsServices.getCalculationScatterPlotMakercalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await StatisticsCalculatorsServices.getCalculationResidualcalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await StatisticsCalculatorsServices.getCalculationResidualPlotcalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await StatisticsCalculatorsServices.getCalculationErrorPropagationcalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await StatisticsCalculatorsServices.getCalculationPieChartcalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await StatisticsCalculatorsServices.getCalculationAccuracycalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await StatisticsCalculatorsServices.getCalculationSampleSizecalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await StatisticsCalculatorsServices.getCalculationZScoreToPercentilecalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await PhysicsCalculatorsServices.getCalculationCrossProductcalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await PhysicsCalculatorsServices.getCalculationInstantaneousVelocitycalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await PhysicsCalculatorsServices.getCalculationPhotonEnergycalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await PhysicsCalculatorsServices.getCalculationDotProductcalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await PhysicsCalculatorsServices.getCalculationVectorMagnitudecalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await PhysicsCalculatorsServices.getCalculationProjectileMotioncalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await PhysicsCalculatorsServices.getCalculationPotentialEnergycalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await PhysicsCalculatorsServices.getCalculationWavelengthcalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await PhysicsCalculatorsServices.getCalculationSpringConstantcalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await PhysicsCalculatorsServices.getCalculationDewPointcalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await PhysicsCalculatorsServices.getCalculationWetBulbcalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await PhysicsCalculatorsServices.getCalculationTerminalVelocityCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await PhysicsCalculatorsServices.getCalculationFrictionCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await PhysicsCalculatorsServices.getCalculationEscapeVelocityCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await PhysicsCalculatorsServices.getCalculationGravityCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await PhysicsCalculatorsServices.getCalculationArrowSpeedCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await PhysicsCalculatorsServices.getCalculationElectricityCostCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await PhysicsCalculatorsServices.getCalculationAirDensityCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await PhysicsCalculatorsServices.getCalculationTimeofFlightCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await PhysicsCalculatorsServices.getCalculationFrictionalForceCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await PhysicsCalculatorsServices.getCalculationMechanicalEnergyCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await PhysicsCalculatorsServices.getCalculationIndexOfRefractionCalculation(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await PhysicsCalculatorsServices.getCalculationWHPtoHPCalculation(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await PhysicsCalculatorsServices.getCalculationAverageSpeedCalculation(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await PhysicsCalculatorsServices.getCalculationdBmtoWattsCalculation(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await PhysicsCalculatorsServices.getCalculationdCapacitanceCalculation(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await PhysicsCalculatorsServices.getCalculationdAngleofDeviationCalculation(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await PhysicsCalculatorsServices.getCalculationdElectricPotentialCalculation(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await PhysicsCalculatorsServices.getCalculationdWaveSpeedCalculation(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await PhysicsCalculatorsServices.getCalculationdElectricFluxCalculation(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await PhysicsCalculatorsServices.getCalculationdAmpstoWattsCalculation(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await PhysicsCalculatorsServices.getCalculationdWattstoAmpsCalculation(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await PhysicsCalculatorsServices.getCalculationdResultantForceCalculation(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await PhysicsCalculatorsServices.getCalculationAverageVelocityCalculation(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await PhysicsCalculatorsServices.getCalculationAmpHourCalculation(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await PhysicsCalculatorsServices.getCalculationParallelResistorCalculation(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await PhysicsCalculatorsServices.getCalculationAngleofRefractionCalculation(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await PhysicsCalculatorsServices.getCalculationJouleCalculation(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await PhysicsCalculatorsServices.getCalculationEfficiencyCalculation(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await PhysicsCalculatorsServices.getCalculationVoltsToJoulesCalculation(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await PhysicsCalculatorsServices.getCalculationBuoyancyCalculation(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await PhysicsCalculatorsServices.getCalculationFPECalculation(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await PhysicsCalculatorsServices.getCalculationRelativeHumidityCalculation(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await PhysicsCalculatorsServices.getCalculationFrictionLossCalculation(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await PhysicsCalculatorsServices.getCalculationEnergyCostCalculation(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await PhysicsCalculatorsServices.getCalculationNewtonLawofCoolingCalculation(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await PhysicsCalculatorsServices.getCalculationWattHourCalculation(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await PhysicsCalculatorsServices.getCalculationSpeedofSoundCalculation(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await PhysicsCalculatorsServices.getCalculationSpecificGravityCalculation(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await StatisticsCalculatorsServices.getCalculationShannonDiversityIndexcalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationScientificNotationCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationPrimeFactorizationCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationModuloCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationMidpointCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationSlopeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationLongAdditionCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationStandardFormCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationAverageCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationLogAndAntilogCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationCentroidCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationQuadraticFormulaCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationQuotientAndRemainderCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationRoundingCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationFractionToDecimalCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationDecimalToFractionCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationFractionToPercentCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationPercentToFractionCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationMillionBillionLakhCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationPointSlopeFormCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationHemisphereCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationDiscriminantCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationEndpointCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationSlopeInterceptFormCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationExponentCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationSquareRootCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationBinaryCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationProportionCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationLinearInterpolationCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationPythagoreanTheoremCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationUnitCircleCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationArcLengthCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationArcsinCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationCosineCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationSineCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationArccosCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationArctanCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationTangentCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationSecantCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationCscCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationCotangentCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationECalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationParallelAndPerpendicularlineCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationCoterminalAngleCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationArithmeticSequenceCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationDoubleAngleCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationHalfAngleCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationPowerSetCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationVertexFormCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationSubsetCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationHyperbolaCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationGradientCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationMidpointRuleCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationMaclaurinSeriesCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationDifferenceQuotientCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationComplexNumberCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationWronskianCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationInverseLaplaceTransformCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationSummationCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationPolarCoordinatesCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationConvolutionCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationJacobianCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationWasherMethodCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationShellMethodCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationImplicitDifferentiationCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationCriticalPointCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationPartialDerivativeCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationAbsoluteValueCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationAreaUnderTheCurveCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationSecondDerivativeCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationDoubleIntegralCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationTripleIntegralCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationLimitCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationLaplaceTransformCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationInflectionPointCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationBinomialTheoremCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationUnitTangentVectorCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationRemainderTheoremCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationFOILCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationTrapezoidalRuleCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationNewtonsMethodCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationMeanValueTheoremCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationRiemannSumCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationInverseFunctionCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationCompositeFunctionCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationAreaBetweenTwoCurvesCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationZerosCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationGeometricSequenceCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationTruthTableCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationEvenOddFunctionCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationSyntheticDivisionCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationProductRuleDerivativeCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationOrthocenterCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationPolynomialLongDivisionCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationRadiusOfConvergenceCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationPowerSeriesCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationSimpsonRuleCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationCurlCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationSaddlePointCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationImproperIntegralCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationFourierSeriesCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationDivergenceCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationLeastToGreatestCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationAngleOfElevationCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationDilationCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationPercentageIncreaseCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationPercentageDecreaseCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationSphereCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationPercentageDifferenceCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationStandardFormtoSlopeInterceptFormCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationPolygonCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationGoldenRatioCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationImproperFractionstoMixedNumbersCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationMixedNumberstoImproperFractionsCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationLocalMaximaandMinimaCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationLCDCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationUnitRateCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationEquivalentFractionsCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationComparingFractionsCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationTimetoDecimalCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationPercenttoDecimalCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationDecimaltoPercentCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationIntegerCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationMultiplicativeInverseCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationInverseModuloCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationEquationLineCalculatorCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationFractionExponentCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationAmplitudeAndPeriodCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationExponentialGrowthCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationPerfectSquareTrinomialCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationPowerReducingFormulaCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationDiamondCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationCrossMultiplyCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationAreaSemicircleCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationAreaDegreeandLeadingCoefficientCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationEquivalentExpressionsCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationDescartesRuleSignsCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationFunctionOperationsCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationMultiplyingPolynomialsCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationInequalityCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationSolveforxCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationCombiningLikeTermsCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationRotationCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationReciprocalCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationCofunctionCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationAdditiveInverseCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationMonomialCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationLongMultiplicationCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationDivisibleCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationAverageValueFunctionCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationProductSumCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationPascalTriangleCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationOrderOfOperationsCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationCharacteristicPolynomialCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationXAndYInterceptsCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationDomainAndRangeCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationDistanceBetweenTwoPointsCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationSASTriangleCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationRadiusCircleCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationEquilateralTriangleCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationPointOfIntersectionCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationExponentialFunctionCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationPowerof10Calculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationSlopePercentageCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationChangeOfBaseFormulaCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationCompletingTheSquareCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationCubeRootCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationTruncatedPyramidCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationMixedNumberCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationFractionSimplifierCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationDeterminantCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationEigenvectorCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationNullSpaceCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationMatrixMultiplicationCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationSGPAToPercentageCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationHexCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationMatrixTransposeCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationWeightedAverageCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationTestGradeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationMarksPercentageCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationDecimalCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationVennDiagramCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationFundamentalCountingPrincipleCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationAveragePercentageCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationLinearIndependenceCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationPercentChangeCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationTaylorSeriesCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationDerivativeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await MathCalculatorsServices.getCalculationCircumcenterCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await ConstructionCalculatorsServices.getCalculationRoofPitchCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await ConstructionCalculatorsServices.getCalculationCubicFeetCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await ConstructionCalculatorsServices.getCalculationFeetAndInchesCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await ConstructionCalculatorsServices.getCalculationAcreageCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await ConstructionCalculatorsServices.getCalculationRebarCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await ConstructionCalculatorsServices.getCalculationPipeVolumeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await ConstructionCalculatorsServices.getCalculationMsPlateWeightCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await ConstructionCalculatorsServices.getCalculationPricePerSquareFootCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await ConstructionCalculatorsServices.getCalculationMaterialCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await ConstructionCalculatorsServices.getCalculationRetainingWallCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await ConstructionCalculatorsServices.getCalculationSquareyardsCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await ConstructionCalculatorsServices.getCalculationBrickCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await ConstructionCalculatorsServices.getCalculationMetalRoofCostCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await ConstructionCalculatorsServices.getCalculationRoofReplacementCostCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await ConstructionCalculatorsServices.getCalculationSodCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await ConstructionCalculatorsServices.getCalculationConcreteBlockCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await ConstructionCalculatorsServices.getCalculationCarpetCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await ConstructionCalculatorsServices.getCalculationCylinderVolumeCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await ConstructionCalculatorsServices.getCalculationFramingCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await ConstructionCalculatorsServices.getCalculationRoofingCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await ConstructionCalculatorsServices.getCalculationDeckingCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await ConstructionCalculatorsServices.getCalculationSonotubeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await ConstructionCalculatorsServices.getCalculationGravelCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await ConstructionCalculatorsServices.getCalculationMulchCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await ConstructionCalculatorsServices.getCalculationSandCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await ConstructionCalculatorsServices.getCalculationAsphaltCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await ConstructionCalculatorsServices.getCalculationSquareFootageCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await ConstructionCalculatorsServices.getCalculationConcreteCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await ConstructionCalculatorsServices.getCalculationPaverCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await ConstructionCalculatorsServices.getCalculationFenceCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await ConstructionCalculatorsServices.getCalculationTopSoilCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await ConstructionCalculatorsServices.getCalculationCubicYardCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await ConstructionCalculatorsServices.getCalculationTileCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await ConstructionCalculatorsServices.getCalculationFlooringCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await ConstructionCalculatorsServices.getCalculationWallpaperCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await ConstructionCalculatorsServices.getCalculationStudCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await ConstructionCalculatorsServices.getCalculationRampCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await ConstructionCalculatorsServices.getCalculationSquareMeterCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await ConstructionCalculatorsServices.getCalculationStoneCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await ConstructionCalculatorsServices.getCalculationRoomSizeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await ConstructionCalculatorsServices.getCalculationTankVolumeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await TimedateCalculatorsServices.getCalculationDaysSinceDateCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await TimedateCalculatorsServices.getCalculationhowManyDaysUntilMyBirthdayCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await TimedateCalculatorsServices.getCalculationhowManymonthsLeftIntheYearCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await TimedateCalculatorsServices.getCalculationhowManyWeeksLeftIntheYearCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await TimedateCalculatorsServices.getCalculationMonthFromNowCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await TimedateCalculatorsServices.getCalculationWeeksBetweenDatesCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await TimedateCalculatorsServices.getCalculationJuliansDateCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await TimedateCalculatorsServices.getCalculationDaysLeftInTheYearCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await TimedateCalculatorsServices.getCalculationDaysAgoCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await TimedateCalculatorsServices.getCalculationWeeksAgoCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await TimedateCalculatorsServices.getCalculationYearsAgoCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await TimedateCalculatorsServices.getCalculationHoursAgoCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await TimedateCalculatorsServices.getCalculationTimeUntilCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await TimedateCalculatorsServices.getCalculationHoursFromNowCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await TimedateCalculatorsServices.getCalculationyearFromTodayCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await TimedateCalculatorsServices.getCalculationWeekFromTodayCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await TimedateCalculatorsServices.getCalculationDaysFromTodayCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await TimedateCalculatorsServices.getCalculationWeekCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await TimedateCalculatorsServices.getCalculationDaysUntilCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await TimedateCalculatorsServices.getCalculationDaysElapsedTimeCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await TimedateCalculatorsServices.getCalculationAddTimeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await TimedateCalculatorsServices.getCalculationTimeDurationCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await TimedateCalculatorsServices.getCalculationBirthYearCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await TimedateCalculatorsServices.getCalculationWorkingDaysCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await TimedateCalculatorsServices.getCalculationDeadlineCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await TimedateCalculatorsServices.getCalculationMonthCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await TimedateCalculatorsServices.getCalculationReadingTimeCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await TimedateCalculatorsServices.getCalculationMilitaryTimeConverterCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
      await TimedateCalculatorsServices.getCalculationDateDurationCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await TimedateCalculatorsServices.getCalculationLeadTimeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await TimedateCalculatorsServices.getCalculationTimeSpanCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await TimedateCalculatorsServices.getCalculationTimeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await TimedateCalculatorsServices.getCalculationDateCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await StatisticsCalculatorsServices.getCalculationHypergeometricCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await StatisticsCalculatorsServices.getCalculationZScoreCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await StatisticsCalculatorsServices.getCalculationCorrelationCoefficientCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await StatisticsCalculatorsServices.getCalculationPValueCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await StatisticsCalculatorsServices.getCalculationProbabilityDensityFunctionCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await StatisticsCalculatorsServices.getCalculationeffectSizeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await StatisticsCalculatorsServices.getCalculationDecileCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await StatisticsCalculatorsServices.getCalculationPertCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await StatisticsCalculatorsServices.getCalculationAnovaCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await StatisticsCalculatorsServices.getCalculationTestStatisticCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await StatisticsCalculatorsServices.getCalculationPooledVarianceCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await StatisticsCalculatorsServices.getCalculationSampleDistributionCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await StatisticsCalculatorsServices.getCalculationNormalDistributionCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await StatisticsCalculatorsServices.getCalculationNormalCriticalValueCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await ChemistryCalculatorsServices.getCalculationNormalIdealGasLawCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await ChemistryCalculatorsServices.getCalculationMoleFractionCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await ChemistryCalculatorsServices.getCalculationCharlesLawCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await ChemistryCalculatorsServices.getCalculationPartialPressureCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await ChemistryCalculatorsServices.getCalculationPhCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await ChemistryCalculatorsServices.getCalculationBoylesLawCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await ChemistryCalculatorsServices.getCalculationCombinedGasLawCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await ChemistryCalculatorsServices.getCalculationGayLussacsLawCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await ChemistryCalculatorsServices.getCalculationMassPercentCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await ChemistryCalculatorsServices.getCalculationRateConstantCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await FinanceCalculatorsServices.getCalculationTaxCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await FinanceCalculatorsServices.getCalculationDiscountCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await FinanceCalculatorsServices.getCalculationGrossIncomeCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await FinanceCalculatorsServices.getCalculationMonthlyIncomeCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await FinanceCalculatorsServices.getCalculationMoneyCounterCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await FinanceCalculatorsServices.getCalculationdisCountedCashFlowCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await FinanceCalculatorsServices.getCalculationVaDisabilityCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await FinanceCalculatorsServices.getCalculationCagrCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await FinanceCalculatorsServices.getCalculationDepreciationCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await EverydayLifeCalculatorsServices.getCalculationAgeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await EverydayLifeCalculatorsServices.getCalculationPPICalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await EverydayLifeCalculatorsServices.getCalculationAgeDifferenceCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await EverydayLifeCalculatorsServices.getCalculationFreightClassCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await EverydayLifeCalculatorsServices.getCalculationSobrietyCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await EverydayLifeCalculatorsServices.getCalculationHouseAgeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await EverydayLifeCalculatorsServices.getCalculationBirthdayCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await EverydayLifeCalculatorsServices.getCalculationHalfBirthdayCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await EverydayLifeCalculatorsServices.getCalculationTravelTimeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await EverydayLifeCalculatorsServices.getCalculationSleepCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await EverydayLifeCalculatorsServices.getCalculationPantSizeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await EverydayLifeCalculatorsServices.getCalculationDriveTimeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await EverydayLifeCalculatorsServices.getCalculationAnniversaryCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await EverydayLifeCalculatorsServices.getCalculationPointBuyCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await EverydayLifeCalculatorsServices.getCalculationStairCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await EverydayLifeCalculatorsServices.getCalculationBattingAverageCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await EverydayLifeCalculatorsServices.getCalculationMpgCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await EverydayLifeCalculatorsServices.getCalculationAquariumCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await EverydayLifeCalculatorsServices.getCalculationPlantSpacingCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await EverydayLifeCalculatorsServices.getCalculationGasCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await EverydayLifeCalculatorsServices.getCalculationHowManyPagesCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await EverydayLifeCalculatorsServices.getCalculationHowManyWordsCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await HealthCalculatorsServices.getCalculationWeightlossCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await HealthCalculatorsServices.getCalculationOvulationCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await HealthCalculatorsServices.getCalculationPregnancyCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await HealthCalculatorsServices.getCalculationTdeeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await HealthCalculatorsServices.getCalculationCalorieDeficitCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await HealthCalculatorsServices.getCalculationIpptCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await HealthCalculatorsServices.getCalculationHeightPercentileCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await HealthCalculatorsServices.getCalculationJumpRopeCalorieCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await HealthCalculatorsServices.getCalculationBiologicalAgeCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await HealthCalculatorsServices.getCalculationPregnancyWeightGainCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await HealthCalculatorsServices.getCalculationStrokeVolumeCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await HealthCalculatorsServices.getCalculationNavyBodyFatCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await HealthCalculatorsServices.getCalculationEerCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await HealthCalculatorsServices.getCalculationAcftCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await HealthCalculatorsServices.getCalculationCarboplatinCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await HealthCalculatorsServices.getCalculationVo2MaxCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await HealthCalculatorsServices.getCalculationWeightPercentileCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await HealthCalculatorsServices.getCalculationHeightCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await HealthCalculatorsServices.getCalculationPaceCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await HealthCalculatorsServices.getCalculationBodyFatPercentageCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationPercentageCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationFractionCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationIntegralCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await MathCalculatorsServices.getCalculationCircumferenceCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationLCMCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationGCFCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationFactorialCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationRatioCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await MathCalculatorsServices.getCalculationIntervalNotationCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationFactoringCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await MathCalculatorsServices.getCalculationLinearApproximationCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await MathCalculatorsServices.getCalculationAverageRateOfChangeCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await MathCalculatorsServices.getCalculationEulersMethodCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationTriangleCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await MathCalculatorsServices.getCalculationTangentPlaneCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationPerimeterCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await MathCalculatorsServices.getCalculationAxisOfSymmetryCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await MathCalculatorsServices.getCalculationDistributivePropertyCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await MathCalculatorsServices.getCalculationRationalExpressionCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await MathCalculatorsServices.getCalculationAreaOfASectorCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await MathCalculatorsServices.getCalculationParallelogramCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await MathCalculatorsServices.getCalculationReferenceAngleCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await MathCalculatorsServices.getCalculationRationalOrIrrationalCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await MathCalculatorsServices.getCalculationSimplifyRadicalsCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await MathCalculatorsServices.getCalculationEllipseEquationCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationRrefCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationGematriaCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await MathCalculatorsServices.getCalculationRatioToFractionCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await MathCalculatorsServices.getCalculationGramSchmidtCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await MathCalculatorsServices.getCalculationVolumeOfTriangularPyramidCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationAreaCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await MathCalculatorsServices.getCalculationthirtytriangleCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await CalculatorsServices.getCalculationLiteralEquationsCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await MathCalculatorsServices.getCalculationTrigonometryCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationSohcahtoaCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await MathCalculatorsServices.getCalculationFortyFivetriangleCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await MathCalculatorsServices.getCalculationTwoComplementCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationLawOfSinesCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await MathCalculatorsServices.getCalculationLawOfCosinesCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await MathCalculatorsServices.getCalculationTangentLineCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await MathCalculatorsServices.getCalculationOnesComplementCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationHypotenuseCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await MathCalculatorsServices.getCalculationAngleBetweenTwoVectorsCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await MathCalculatorsServices.getCalculationDirectionalDerivativeCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await MathCalculatorsServices.getCalculationEigenvaluesCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await MathCalculatorsServices.getCalculationEquationOfCircleCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await MathCalculatorsServices.getCalculationGaussianEliminationCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationFinalGradeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await MathCalculatorsServices.getCalculationSubstitutionMethodCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await MathCalculatorsServices.getCalculationInverseMatrixCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await MathCalculatorsServices.getCalculationVectorAdditionCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await MathCalculatorsServices.getCalculationGaussSeidelCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await MathCalculatorsServices.getCalculationRationalizeTheDenominatorCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await MathCalculatorsServices.getCalculationSurfaceAreaCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await MathCalculatorsServices.getCalculationLengthOfCurveCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationDiagonalCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await MathCalculatorsServices.getCalculationRationalZerosCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await MathCalculatorsServices.getCalculationAugmentedMatrixCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await MathCalculatorsServices.getCalculationElementaryMatrixCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await MathCalculatorsServices.getCalculationDistanceFormulaCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await MathCalculatorsServices.getCalculationVolumeOfCapsuleCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await MathCalculatorsServices.getCalculationConicalFrustumVolumeCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await MathCalculatorsServices.getCalculationVolumeOfRectangleCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await MathCalculatorsServices.getCalculationSimilarTrianglesCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationVolumeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await MathCalculatorsServices.getCalculationParabolaCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await PhysicsCalculatorsServices.getCalculationVelocityCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await PhysicsCalculatorsServices.getCalculationDisplacementCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await PhysicsCalculatorsServices.getCalculationOhmsLawCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await PhysicsCalculatorsServices.getCalculationTorqueCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await PhysicsCalculatorsServices.getCalculationHorsepowerCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await PhysicsCalculatorsServices.getCalculationKinematicsCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await PhysicsCalculatorsServices.getCalculationInstantaneousRateOfChangeCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await PhysicsCalculatorsServices.getCalculationSpecificHeatCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await PhysicsCalculatorsServices.getCalculationWorkCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await PhysicsCalculatorsServices.getCalculationWaterViscosityCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await PhysicsCalculatorsServices.getCalculationUnitVectorCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await PhysicsCalculatorsServices.getCalculationCenterOfMassCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await PhysicsCalculatorsServices.getCalculationelEctricFieldCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await PhysicsCalculatorsServices.getCalculationelMomentOfInertiaCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await PhysicsCalculatorsServices.getCalculationelFreeFallCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await PhysicsCalculatorsServices.getCalculationelTransformerCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await PhysicsCalculatorsServices.getCalculationelSpeedDistanceTimeCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await PhysicsCalculatorsServices.getCalculationelVectorProjectionCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await PhysicsCalculatorsServices.getCalculationelVoltageDropCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await PhysicsCalculatorsServices.getCalculationelQuarterMileCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await PhysicsCalculatorsServices.getCalculationelCoulombsLawCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await PhysicsCalculatorsServices.getCalculationelSolarPanelCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await PhysicsCalculatorsServices.getCalculationelCentripetalForceCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await PhysicsCalculatorsServices.getCalculationelAngularAccelerationCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await PhysicsCalculatorsServices.getCalculationelTensionCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await PhysicsCalculatorsServices.getCalculationelHeatIndexCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await PhysicsCalculatorsServices.getCalculationelReynoldsNumberCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await PhysicsCalculatorsServices.getCalculationelChangeInMomentumCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await PhysicsCalculatorsServices.getCalculationelSnellsLawCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await PhysicsCalculatorsServices.getCalculationelImpulseCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await PhysicsCalculatorsServices.getCalculationeWattCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await PhysicsCalculatorsServices.getCalculationeTimeDilationCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await PhysicsCalculatorsServices.getCalculationeOrbitalPeriodCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await PhysicsCalculatorsServices.getCalculationeNormalForceCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await PhysicsCalculatorsServices.getCalculationeDensityAltitudeCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await PhysicsCalculatorsServices.getCalculationeKineticEnergyCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await PhysicsCalculatorsServices.getCalculationeMomentumCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await PhysicsCalculatorsServices.getCalculationeAngularVelocityCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await PhysicsCalculatorsServices.getCalculationeDensityCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await PhysicsCalculatorsServices.getCalculationeForceCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await PhysicsCalculatorsServices.getCalculationeEnthalpyCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await PhysicsCalculatorsServices.getCalculationeScaleCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await PhysicsCalculatorsServices.getCalculationeGearRatioCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await PhysicsCalculatorsServices.getCalculationeResistanceCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await PhysicsCalculatorsServices.getCalculationeWireSizeCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await PhysicsCalculatorsServices.getCalculationeDcWireSizeCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await PhysicsCalculatorsServices.getCalculationeBeamDeflectionCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result = await PhysicsCalculatorsServices.getCalculationeFlowRateCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await PhysicsCalculatorsServices.getCalculationeDimensionalAnalysisCalculator(
        req.body
      );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
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
    const result =
      await PhysicsCalculatorsServices.getCalculationeAccelerationCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/sig-fig-calculator
 */

router.post(
  "/sig-fig-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationeSigFigCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/uog-gpa-calculator
 */

router.post(
  "/uog-gpa-calculator",
  asyncHandler(async (req, res) => {
    const result = await HealthCalculatorsServices.getCalculationeUogGpaCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/iu-gpa-calculator
 */

router.post(
  "/iu-gpa-calculator",
  asyncHandler(async (req, res) => {
    const result = await HealthCalculatorsServices.getCalculationeiuGpaCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/asu-gpa-calculator
 */

router.post(
  "/asu-gpa-calculator",
  asyncHandler(async (req, res) => {
    const result = await HealthCalculatorsServices.getCalculationeAsuGpaCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/uf-gpa-calculator
 */

router.post(
  "/uf-gpa-calculator",
  asyncHandler(async (req, res) => {
    const result = await MathCalculatorsServices.getCalculationeUfGpaCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/ut-gpa-calculator
 */

router.post(
  "/ut-gpa-calculator",
  asyncHandler(async (req, res) => {
    const result = await MathCalculatorsServices.getCalculationeUtGpaCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/uc-gpa-calculator
 */

router.post(
  "/uc-gpa-calculator",
  asyncHandler(async (req, res) => {
    const result = await MathCalculatorsServices.getCalculationeUcGpaCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/gpa-calculator
 */

router.post(
  "/gpa-calculator",
  asyncHandler(async (req, res) => {
    const result = await MathCalculatorsServices.getCalculationeGpaCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/zakat-calculator
 */

router.post(
  "/zakat-calculator",
  asyncHandler(async (req, res) => {
    const result = await FinanceCalculatorsServices.getCalculationZakatCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/gratuity-calculator
 */

router.post(
  "/gratuity-calculator",
  asyncHandler(async (req, res) => {
    const result = await CalculatorsServices.getCalculationGratuityCalculator(
      req.body
    );

    // Check if result contains an error
    if (result && result.error) {
      return res
        .status(HttpCodes.BAD_REQUEST) // 400
        .json(new ApiResponse(result));
    }

    // Otherwise return success
    return res
      .status(HttpCodes.OK) // 200
      .json(new ApiResponse(result));
  })
);

/**
 * POST: Used to get calculation based on your age
 * /api/calculators-lol/bayes-theorem
 */

router.post(
  "/bayes-theorem-calculator",
  asyncHandler(async (req, res) => {
    const result =
      await CalculatorsServices.getCalculationBayesTheoremCalculator(req.body);

    // Check if result contains an error
    if (result && result.error) {
      return res
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
