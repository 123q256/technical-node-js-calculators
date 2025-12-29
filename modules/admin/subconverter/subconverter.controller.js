const { asyncHandler, ApiResponse } = require("../../../middlewares/middlewares");
const HttpCodes = require("http-codes");
const AdminSubConverterServices = require("./subconverter.services");
const db = require("../../../models");

const router = require("express").Router();

/**
 * POST: Used to get calculation based on your age
 * /api/category/category-name
 */

router.post(
  "/create-subconverter",
  asyncHandler(async (req, res) => {
    return res
      .status(HttpCodes.OK)
      .json(
        new ApiResponse(
          await AdminSubConverterServices.createNewsubconverter(
            req.body
          )
        )
      );
  })
);

router.get(
  "/edit-subconverter/:id",
  asyncHandler(async (req, res) => {
    const result = await AdminSubConverterServices.editsubconverter(req.params.id, req.body);
    return res.status(HttpCodes.OK).json(new ApiResponse(result));
  })
);

// ✅ Update Blogs
router.put(
  "/update-subconverter/:id",
  asyncHandler(async (req, res) => {

    const result = await AdminSubConverterServices.updatesubconverter(req.params.id, req.body);
    return res.status(HttpCodes.OK).json(new ApiResponse(result));
  })
);

/**
 * get: Used to get calculation based on your age
 * /api/category/category-name
 */
router.get(
  "/cattegory-subconverter",
  asyncHandler(async (req, res) => {
    return res
      .status(HttpCodes.OK)
      .json(
        new ApiResponse(
          await AdminSubConverterServices.cattegorysubconverter(
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
router.get(
  "/subconverter",
  asyncHandler(async (req, res) => {
    return res
      .status(HttpCodes.OK)
      .json(
        new ApiResponse(
          await AdminSubConverterServices.subconverter(
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
  "/index-status-subconverter/:id",
  asyncHandler(async (req, res) => {
    return res
      .status(HttpCodes.OK)
      .json(
        new ApiResponse(
          await AdminSubConverterServices.indexStatussubconverter(
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
  "/showContent-status-subconverter/:id",
  asyncHandler(async (req, res) => {
    return res
      .status(HttpCodes.OK)
      .json(
        new ApiResponse(
          await AdminSubConverterServices.showContentStatussubconverter(
                    req.params.id
          )
        )
      );
  })
);



module.exports = router;
