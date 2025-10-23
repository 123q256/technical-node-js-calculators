const { body, param, query } = require("express-validator");
const { ApiError,  } = require("../../middlewares/middlewares");
const { validateRequest } = require("../../validators/validators");

class AuthValidators {
  /**
   * POST: /api/action-logs/
   */
  validateGetAllActionLogsData = [
    query("path")
      .optional()
      .isString()
      .withMessage("path must be a string if provided"),

    validateRequest({
      validQueryFields: ["q", "page", "limit", "action_type", "path"],
    }),
  ];
}

module.exports = new AuthValidators();