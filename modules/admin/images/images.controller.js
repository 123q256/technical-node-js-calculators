const router = require("express").Router();
const { asyncHandler, ApiResponse } = require("../../../middlewares/middlewares");
const HttpCodes = require("http-codes");
const ImagesService = require("./images.services");
const upload = require("../../../middlewares/multer");

// 📥 GET all images
router.get(
  "/images_all",
  asyncHandler(async (req, res) => {
    const result = await ImagesService.getImagesAll();
    return res.status(HttpCodes.OK).json(new ApiResponse(result));
  })
);

// 📤 POST/upload single image
router.post(
  "/AddImages",
  asyncHandler(async (req, res) => {
    const result = await ImagesService.saveImage(req.files);
    return res.status(HttpCodes.OK).json(new ApiResponse(result));
  })
);



module.exports = router;
