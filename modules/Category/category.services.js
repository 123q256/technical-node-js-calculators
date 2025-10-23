const { Op } = require("sequelize");
const db = require("../../models");
const HttpCodes = require("http-codes");
const { ApiError } = require("../../middlewares/ApiError");

const { Calculators, Categories, SubCategories } = db;

class CalculatorsServices {
  /**
   * getSingleCategoryAndSubCategory: Service Method
   * POST: /api/category/:category-name
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getSingleCategoryAndSubCategory(category_name) {
    try {
      const category = await Categories.findOne({
        where: { category_name },
        attributes: [
          "category_id",
          "category_name",
          "des",
          "meta_title",
          "meta_des",
        ],
      });

      if (!category) {
        return { message: "Category not found" };
      }

      const subCategories = await SubCategories.findAll({
        where: { category_id: category.category_id },
        attributes: ["sub_category_id", "sub_category_name"],
      });

      if (subCategories.length === 0) {
        return { message: "No subcategories found for this category" };
      }

      const subCategoryIds = subCategories.map((sub) => sub.sub_category_id);

      const calculators = await Calculators.findAll({
        where: {
          tech_cal_sub_cat: subCategoryIds,
          tech_no_index: 1, // ✅ Filter only those calculators with tech_no_index === 1
        },
        attributes: [
          "tech_calculator_title",
          "tech_calculator_link",
          "tech_cal_sub_cat",
        ],
      });

      // **Filter only those subcategories which have calculators**
      const formattedSubCategories = subCategories
        .map((sub) => {
          const filteredCalculators = calculators.filter(
            (calc) => calc.tech_cal_sub_cat == sub.sub_category_id
          );

          if (filteredCalculators.length === 0) {
            return null; // Skip empty subcategories
          }

          return {
            sub_category_name: sub.sub_category_name,
            calculators: filteredCalculators,
          };
        })
        .filter(Boolean); // Remove null values from the array
      return {
        category,
        subCategories: formattedSubCategories,
      };
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  /**
   * getAllCategoryCalculator: Service Method
   * POST: /api/category/-name
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getAllCategoryCalculator() {
    const category = await Categories.findAll({
      attributes: ["category_id", "category_name"],
    });

    const calculators = await Promise.all(
      category.map(async (item) => {
        // For each category, find the associated calculators by category_name
        const calculator_category = await Calculators.findAll({
          where: {
            tech_cal_cat: item.category_name, // Match the category_name
          },
          attributes: ["tech_calculator_title", "tech_calculator_link"], // Only fetch needed fields
        });

        // Filter out calculators where the tech_calculator_link contains "/"
        const filteredCalculators = calculator_category.filter((calc) => {
          return !calc.tech_calculator_link.includes("/"); // Remove any calculators with "/"
        });

        return {
          category_name: item.category_name,
          calculators: filteredCalculators,
        };
      })
    );

    return calculators; // Return the result
  }
}

module.exports = new CalculatorsServices();
