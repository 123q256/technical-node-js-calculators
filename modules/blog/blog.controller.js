const { asyncHandler, ApiResponse } = require("../../middlewares/middlewares");
const HttpCodes = require("http-codes");
const db = require("../../models");
const BlogsServices = require("./blog.services");

const router = require("express").Router();

/**
 * POST: Used to get calculation based on your age
 * /api/blog
 */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    return res
      .status(HttpCodes.OK)
      .json(new ApiResponse(await BlogsServices.getAllBlogs(req.query)));
  })
);

/**
 * GET: Get Single Blog By url
 * /api/blog/:url
 */
router.get(
  "/:url",
  asyncHandler(async (req, res) => {
    return res
      .status(HttpCodes.OK)
      .json(
        new ApiResponse(
          await BlogsServices.getSingleBlogsService(req.params.url)
        )
      );
  })
);

module.exports = router;
