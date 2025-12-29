const router = require("express").Router();
const { asyncHandler, ApiResponse } = require("../../../middlewares/middlewares");
const SubCategoryServices = require("./subcategory.services");

const HttpCodes = require("http-codes");

/**
 * POST /api/category/add-calculator
 */
router.get(
  "/show-category",
  asyncHandler(async (req, res) => {
    const result = await SubCategoryServices.getCategoryCalculator(req.body);
    return res.status(HttpCodes.OK).json(new ApiResponse(result));
  })
);
/**
 * POST /api/category/add-calculator
 */
router.get(
  "/show-Subcategory",
  asyncHandler(async (req, res) => {
    const result = await SubCategoryServices.getshowSubcategory(req.body);
    return res.status(HttpCodes.OK).json(new ApiResponse(result));
  })
);


// ✅ GET /admin/category_name/sub-categories/:categoryId
router.get(
  "/sub-categories/:categoryId",
  asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    const result = await SubCategoryServices.getSubCategoriesByCategory(categoryId);
    return res.status(HttpCodes.OK).json(new ApiResponse(result));
  })
);



// ✅ Create Sub-Category
router.post(
  "/add-Sub-Category",
  asyncHandler(async (req, res) => {
    const result = await SubCategoryServices.createSubCategory(req.body);
    return res.status(HttpCodes.CREATED).json(new ApiResponse(result));
  })
);

// ✅ Get Sub-Category by ID (Edit)
router.get(
  "/show-Sub-Category/:id",
  asyncHandler(async (req, res) => {
    const result = await SubCategoryServices.getSubCategoryById(req.params.id);
    return res.status(HttpCodes.OK).json(new ApiResponse(result));
  })
);

// ✅ Update Sub-Category
router.put(
  "/update-Sub-Category/:id",
  asyncHandler(async (req, res) => {
    const result = await SubCategoryServices.updateSubCategory(req.params.id, req.body);
    return res.status(HttpCodes.OK).json(new ApiResponse(result));
  })
);

// ✅ Delete Sub-Category
router.delete(
  "/delete-Sub-Category/:id",
  asyncHandler(async (req, res) => {
    const result = await SubCategoryServices.deleteSubCategory(req.params.id);
    return res.status(HttpCodes.OK).json(new ApiResponse(result));
  })
);




module.exports = router;
