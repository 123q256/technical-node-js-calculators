const express = require("express");
const AuthController = require("../modules/auth/auth.controller");
const { CalculatorsController } = require("../modules/calculators/calculators");
const { CategoryController } = require("../modules/Category/category");
const BlogsController = require("../modules/blog/blog.controller");
const ContactController = require("../modules/contact/contact.controller");
const FeedbackController = require("../modules/feedback/feedback.controller");
const CalculatorFeedbackController = require("../modules/calculatorfeedback/calculatorfeedback.controller");
const CalculatorUserResponseController = require("../modules/user_response/user_response.controller");
const { AdminCalculatorController } = require("../modules/admin/calculator/calculator");
const { AdminCategoryController } = require("../modules/admin/category/category");
const { AdminBlogController } = require("../modules/admin/blogs/blog");
const { AdminuserController } = require("../modules/admin/user/user");
const { AdminSubcategoryController } = require("../modules/admin/subcategory/subcategory");
const { AdmiIimagesController } = require("../modules/admin/images/images"); 
const { AdminConverterController } = require("../modules/admin/converter/converter");
const { AdminSubconverterController } = require("../modules/admin/subconverter/subconverter");

const {
  CalculatorDetailsController,
} = require("../modules/calculator_details/calculator_details");
const router = express.Router();

router.use("/auth", AuthController);
router.use("/calculators-lol", CalculatorsController);
router.use("/blog", BlogsController);
router.use("/", CategoryController);
router.use("/calculator_detail", CalculatorDetailsController);
router.use("/contact", ContactController);
router.use("/feedback", FeedbackController);
router.use("/calculatorfeedback", CalculatorFeedbackController);
router.use("/userresponse", CalculatorUserResponseController);
router.use("/admin/allcalculator", AdminCalculatorController);
router.use("/admin/allblogs", AdminBlogController);
router.use("/admin/users", AdminuserController);
router.use("/admin/Sub-Category", AdminSubcategoryController);
router.use("/admin/blogs", AdminBlogController);
router.use("/admin/images", AdmiIimagesController);
router.use("/admin/converter", AdminConverterController);
router.use("/admin/subconverter", AdminSubconverterController);


router.use("/admin/category", AdminCategoryController);
router.use("/admin/category/:categoryId", AdminCategoryController);


router.use("/admin/allcalculator", AdminCalculatorController);
router.use("/admin/allblogs", AdminBlogController);
router.use("/admin/users", AdminuserController);
router.use("/admin/Sub-Category", AdminSubcategoryController);
router.use("/admin/blogs", AdminBlogController);
router.use("/admin/images", AdmiIimagesController);
router.use("/admin/converter", AdminConverterController);
router.use("/admin/subconverter", AdminSubconverterController);
router.use("/admin/category", AdminCategoryController);
router.use("/admin/category/:categoryId", AdminCategoryController);
module.exports = router;
