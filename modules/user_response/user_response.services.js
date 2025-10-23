const { Op } = require("sequelize");
const db = require("../../models");
const HttpCodes = require("http-codes");
const nodemailer = require("nodemailer");
const { ApiError } = require("../../middlewares/ApiError");

const { UserResponse } = db;

class UserResponseServices {
  /**
   * createUserResponseService: Service Method
   * POST: /api/userresponse/
   * @param {Object} body Having Properties for Creating
   * @returns Object with message property having success method
   */
  async createUserResponseService(data) {
    const { calculator_name, page, feedback } = data;

    if (!calculator_name || !page || !["like", "dislike"].includes(feedback)) {
      throw new ApiError("Invalid input data", HttpCodes.BAD_REQUEST);
    }

    const saved = await UserResponse.create({
      calculator_name,
      page,
      feedback,
    });

    return {
      message: "Feedback saved successfully",
      data: saved,
    };
  }
}

module.exports = new UserResponseServices();
