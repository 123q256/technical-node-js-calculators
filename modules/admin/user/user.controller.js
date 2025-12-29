const router = require("express").Router();
const { asyncHandler, ApiResponse } = require("../../../middlewares/middlewares");
const AdminUserServices = require("./user.services");
const HttpCodes = require("http-codes");

/**
 * POST /api/category/add-calculator
 */
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const result = await AdminUserServices.getAdminAndEditorLogin(req.body);
    return res.status(HttpCodes.OK).json(new ApiResponse(result));
  })
);
router.get(
  "/getAllUers",
  asyncHandler(async (req, res) => {
    const result = await AdminUserServices.getAdminAndEditorUsers(req.body);
    return res.status(HttpCodes.OK).json(new ApiResponse(result));
  })
);
router.get(
  "/getAllUserResponse",
  asyncHandler(async (req, res) => {
    const result = await AdminUserServices.getAllUserResponses(req.body);
    return res.status(HttpCodes.OK).json(new ApiResponse(result));
  })
);


// ✅ Create Sub-Category
router.post(
  "/add-users",
  asyncHandler(async (req, res) => {
    const result = await AdminUserServices.createUser(req.body);
    return res.status(HttpCodes.CREATED).json(new ApiResponse(result));
  })
);

// ✅ Get Sub-Category by ID (Edit)
router.get(
  "/show-users/:id",
  asyncHandler(async (req, res) => {
    const result = await AdminUserServices.getUserById(req.params.id);
    return res.status(HttpCodes.OK).json(new ApiResponse(result));
  })
);

// ✅ Update Sub-Category
router.put(
  "/update-users/:id",
  asyncHandler(async (req, res) => {
    const result = await AdminUserServices.updateUer(req.params.id, req.body);
    return res.status(HttpCodes.OK).json(new ApiResponse(result));
  })
);

// ✅ Delete Sub-Category
router.delete(
  "/delete-users/:id",
  asyncHandler(async (req, res) => {
    const result = await AdminUserServices.deleteUser(req.params.id);
    return res.status(HttpCodes.OK).json(new ApiResponse(result));
  })
);

// ✅ Update Sub-Category
router.put(
  "/update-status/:id",
  asyncHandler(async (req, res) => {
    const result = await AdminUserServices.updatestatus(req.params.id, req.body);
    return res.status(HttpCodes.OK).json(new ApiResponse(result));
  })
);



module.exports = router;
