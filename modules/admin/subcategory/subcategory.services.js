const { Op } = require("sequelize");
const db = require("../../../models");
const HttpCodes = require("http-codes");
const { ApiError } = require("../../../middlewares/ApiError");

const { Calculators, Categories, SubCategories } = db;

class subcategoryService {
  /**
   * getSingleCategoryAndSubCategory: Service Method
   * POST: /api/category/:category-name
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  
async getCategoryCalculator() {
  try {
    const categories = await Categories.findAll({
      where: { category_del: 0 },        // sirf active categories
      attributes: ['category_id', 'category_name' ,'category_img','meta_title','meta_des','des','category_time'],  // sirf ye fields
      order: [['category_name', 'ASC']], // naam ke hisaab se sort karo
    });

    return categories;  // ya agar chaho to { categories } object me bhi return kar sakte ho

  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}
async getshowSubcategory() {
  try {
    const subcategories = await SubCategories.findAll({
      attributes: ['sub_category_id', 'sub_category_name', 'category_id', 'sub_category_time'],
      include: [
        {
          model: Categories,
          attributes: ['category_id', 'category_name', 'category_img', 'meta_title', 'meta_des', 'des', 'category_time'],
          where: { category_del: 0 }, // only active categories
          required: false, // 👈 this makes it a LEFT JOIN
        },
      ],
      order: [['sub_category_name', 'ASC']],
    });

    return subcategories;

  } catch (error) {
    console.error("Error fetching subcategories with category:", error);
    throw error;
  }
}


async getSubCategoriesByCategory(categoryId) {
  try {
    const subCategories = await SubCategories.findAll({
      where: { category_id: categoryId },  // filter by category_id
      attributes: ['sub_category_id', 'sub_category_name', 'category_id'], // use correct field names
      order: [['sub_category_name', 'ASC']],
    });
    return subCategories;
  } catch (error) {
    console.error("Error fetching sub-categories:", error);
    throw error;
  }
}



// ✅ Create Sub-Category
async createSubCategory(body) {
  try {
    const subCategory = await SubCategories.create({
      sub_category_name: body.sub_category_name,
      category_id: body.category_id,
      sub_category_time: new Date(),
    });
    return subCategory;
  } catch (error) {
    console.error("Error creating sub-category:", error);
    throw error;
  }
}

// ✅ Get Sub-Category by ID
async getSubCategoryById(id) {
  try {
    const subCategory = await SubCategories.findOne({
      where: { sub_category_id: id },
      attributes: ['sub_category_id', 'sub_category_name', 'category_id', 'sub_category_time'],
    });

    if (!subCategory) {
      throw new ApiError(HttpCodes.NOT_FOUND, "Sub-category not found");
    }

    return subCategory;
  } catch (error) {
    console.error("Error getting sub-category:", error);
    throw error;
  }
}

// ✅ Update Sub-Category
async updateSubCategory(id, body) {
  try {
    const subCategory = await SubCategories.findByPk(id);

    if (!subCategory) {
      throw new ApiError(HttpCodes.NOT_FOUND, "Sub-category not found");
    }

    subCategory.sub_category_name = body.sub_category_name || subCategory.sub_category_name;
    subCategory.category_id = body.category_id || subCategory.category_id;

    await subCategory.save();

    return subCategory;
  } catch (error) {
    console.error("Error updating sub-category:", error);
    throw error;
  }
}

// ✅ Delete Sub-Category
async deleteSubCategory(id) {
  try {
    const subCategory = await SubCategories.findByPk(id);

    if (!subCategory) {
      throw new ApiError(HttpCodes.NOT_FOUND, "Sub-category not found");
    }

    await subCategory.destroy();

    return { message: "Sub-category deleted successfully" };
  } catch (error) {
    console.error("Error deleting sub-category:", error);
    throw error;
  }
}

}

module.exports = new subcategoryService();
