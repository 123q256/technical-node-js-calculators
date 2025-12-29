const router = require("express").Router();
const { asyncHandler, ApiResponse } = require("../../../middlewares/middlewares");
const AdminCalculatorServices = require("./category.services");
const HttpCodes = require("http-codes");

/**
 * POST /api/category/add-calculator
 */
router.get(
  "/show-category",
  asyncHandler(async (req, res) => {
    const result = await AdminCalculatorServices.getCategoryCalculator(req.body);
    return res.status(HttpCodes.OK).json(new ApiResponse(result));
  })
);
/**
 * POST /api/category/add-calculator
 */
router.get(
  "/show-Subcategory",
  asyncHandler(async (req, res) => {
    const result = await AdminCalculatorServices.getshowSubcategory(req.body);
    return res.status(HttpCodes.OK).json(new ApiResponse(result));
  })
);


// ✅ GET /admin/category_name/sub-categories/:categoryId
router.get(
  "/sub-categories/:categoryId",
  asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    const result = await AdminCalculatorServices.getSubCategoriesByCategory(categoryId);
    return res.status(HttpCodes.OK).json(new ApiResponse(result));
  })
);



// ✅ Create Category
router.post(
  "/add-category",
  asyncHandler(async (req, res) => {
    const result = await AdminCalculatorServices.createCategory(req.body,req.files);
    return res.status(HttpCodes.CREATED).json(new ApiResponse(result));
  })
);

// ✅ Read All Categories
router.get(
  "/show-category",
  asyncHandler(async (req, res) => {
    const result = await AdminCalculatorServices.getCategoryCalculator();
    return res.status(HttpCodes.OK).json(new ApiResponse(result));
  })
);


router.get(
  "/show-category/:id",
  asyncHandler(async (req, res) => {
    const result = await AdminCalculatorServices.editCategory(req.params.id);
    return res.status(HttpCodes.OK).json(new ApiResponse(result));
  })
);


// ✅ Update Category
router.put(
  "/update-category/:id",
  asyncHandler(async (req, res) => {
    const result = await AdminCalculatorServices.updateCategory(req.params.id, req.body,req.files);
    return res.status(HttpCodes.OK).json(new ApiResponse(result));
  })
);

// ✅ Delete Category (Soft Delete)
router.delete(
  "/delete-category/:id",
  asyncHandler(async (req, res) => {
    const result = await AdminCalculatorServices.deleteCategory(req.params.id);
    return res.status(HttpCodes.OK).json(new ApiResponse(result));
  })
);





module.exports = router;
