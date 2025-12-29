const { asyncHandler, ApiResponse } = require("../../../middlewares/middlewares");
const HttpCodes = require("http-codes");
const AdminConverterServices = require("./converter.services");
const db = require("../../../models");

const router = require("express").Router();

/**
 * POST: Used to get calculation based on your age
 * /api/category/category-name
 */

router.post(
  "/create-converter",
  asyncHandler(async (req, res) => {
    return res
      .status(HttpCodes.OK)
      .json(
        new ApiResponse(
          await AdminConverterServices.createNewconverter(
            req.body
          )
        )
      );
  })
);

router.get(
  "/edit-converter/:id",
  asyncHandler(async (req, res) => {
    const result = await AdminConverterServices.editconverter(req.params.id, req.body);
    return res.status(HttpCodes.OK).json(new ApiResponse(result));
  })
);

// ✅ Update Blogs
router.put(
  "/update-converter/:id",
  asyncHandler(async (req, res) => {

    const result = await AdminConverterServices.updateconverter(req.params.id, req.body);
    return res.status(HttpCodes.OK).json(new ApiResponse(result));
  })
);

/**
 * get: Used to get calculation based on your age
 * /api/category/category-name
 */
router.get(
  "/all-converter",
  asyncHandler(async (req, res) => {
    return res
      .status(HttpCodes.OK)
      .json(
        new ApiResponse(
          await AdminConverterServices.allconverters(
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
  "/index-status-converter/:id",
  asyncHandler(async (req, res) => {
    return res
      .status(HttpCodes.OK)
      .json(
        new ApiResponse(
          await AdminConverterServices.indexStatusconverter(
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
  "/showContent-status-converter/:id",
  asyncHandler(async (req, res) => {
    return res
      .status(HttpCodes.OK)
      .json(
        new ApiResponse(
          await AdminConverterServices.showContentStatusconverter(
                    req.params.id
          )
        )
      );
  })
);



module.exports = router;
