const express = require("express");
const AuthController = require("../modules/auth/auth.controller");
const { CalculatorsController } = require("../modules/calculators/calculators");
const { CategoryController } = require("../modules/Category/category");
const BlogsController = require("../modules/blog/blog.controller");
const ContactController = require("../modules/contact/contact.controller");
const FeedbackController = require("../modules/feedback/feedback.controller");
const CalculatorFeedbackController = require("../modules/calculatorfeedback/calculatorfeedback.controller");
const CalculatorUserResponseController = require("../modules/user_response/user_response.controller");
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

module.exports = router;
