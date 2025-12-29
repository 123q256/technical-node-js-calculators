const router = require("express").Router();
const { asyncHandler, ApiResponse } = require("../../../middlewares/middlewares");
const AdminBlogsServices = require("./blog.services");
const HttpCodes = require("http-codes");
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // or use diskStorage if needed

/**
 * POST /api/category/add-calculator
 */
router.get(
  "/all-blogs",
  asyncHandler(async (req, res) => {
    const result = await AdminBlogsServices.getAllBlogs(req.body);
    return res.status(HttpCodes.OK).json(new ApiResponse(result));
  })
);


// ✅ Create Blogs
router.post(
  "/add-Blogs",
  asyncHandler(async (req, res) => {
    const result = await AdminBlogsServices.createBlogs(req.body, req.files);
    return res.status(HttpCodes.CREATED).json(new ApiResponse(result));
  })
);


// router.post(
//   "/add-Blogs",
//   asyncHandler(async (req, res) => {
//     console.log('Received body:', req.body);  // check request body
//     const result = await AdminBlogsServices.createBlogs(req.body);
//     return res.status(HttpCodes.CREATED).json(new ApiResponse(result));
//   })
// );

// ✅ Read All Categories
router.get(
  "/show-Blogs",
  asyncHandler(async (req, res) => {
    const result = await AdminBlogsServices.getBlogsCalculator();
    return res.status(HttpCodes.OK).json(new ApiResponse(result));
  })
);


router.get(
  "/Edit-Blogs/:id",
  asyncHandler(async (req, res) => {
    const result = await AdminBlogsServices.editBlogs(req.params.id);
    return res.status(HttpCodes.OK).json(new ApiResponse(result));
  })
);


// ✅ Update Blogs
router.put(
  "/update-Blogs/:id",
  asyncHandler(async (req, res) => {
    const result = await AdminBlogsServices.updateBlogs(req.params.id, req.body,req.files);
    return res.status(HttpCodes.OK).json(new ApiResponse(result));
  })
);

// ✅ Delete Blogs (Soft Delete)
router.delete(
  "/delete-Blogs/:id",
  asyncHandler(async (req, res) => {
    const result = await AdminBlogsServices.deleteBlogs(req.params.id);
    return res.status(HttpCodes.OK).json(new ApiResponse(result));
  })
);


// ✅ Update 
router.put(
  "/update-status/:id",
  asyncHandler(async (req, res) => {
    const result = await AdminBlogsServices.updatestatus(req.params.id, req.body);
    return res.status(HttpCodes.OK).json(new ApiResponse(result));
  })
);






module.exports = router;
