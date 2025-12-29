const { Op } = require("sequelize");
const db = require("../../../models");
const HttpCodes = require("http-codes");
const { ApiError } = require("../../../middlewares/ApiError");
const categoryService = require('../category/category.services'); // adjust path as needed
// services/AdminBlogServices.js

 // ✅ Create Category
 const path = require('path');
const fs = require('fs');
const { Calculators, Categories, SubCategories } = db;

class CategoryService {
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

  async  createCategory(data, files) {
    try {
      const { category_name, des, meta_title, meta_des } = data;

      let imagePath = null;

      // ✅ Check if image exists
      if (files && files.image) {
        console.log("📁 Image received:", files.image.name); // Debug log

        const uploadDir = path.join(__dirname, '../../../public/images/category-images');
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        const fileExt = path.extname(files.image.name);
        const fileName = `category_${Date.now()}${fileExt}`;
        const fullPath = path.join(uploadDir, fileName);

        // ✅ Ensure file is moved before continuing
        await new Promise((resolve, reject) => {
          files.image.mv(fullPath, (err) => {
            if (err) {
              console.error("❌ Error while uploading image:", err);
              reject(new Error('❌ Failed to upload image'));
            } else {
              console.log("✅ Image uploaded to:", fullPath);
              resolve();
            }
          });
        });

        // ✅ Save relative path for frontend use
        imagePath = `/images/category-images/${fileName}`;
      } else {
        console.warn("⚠️ No image received in request");
      }

      const currentTime = new Date();

      // ✅ Insert into DB
      const category = await Categories.create({
        category_name,
        category_img: imagePath,  // could be null if no file
        category_del: 0,
        category_time: currentTime,
        meta_title,
        meta_des,
        des,
      });

      return { message: '✅ Category created successfully', category };

    } catch (error) {
      console.error('❌ Error creating category:', error.message);
      throw error;
    }
  }

  // ✅ Get All Categories (already made)
  async getCategoryCalculator() {
    try {
      return await Categories.findAll({
        where: { category_del: 0 },
        attributes: ['category_id', 'category_name', 'category_img', 'meta_title', 'meta_des', 'des', 'category_time'],
        order: [['category_name', 'ASC']],
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  }

  // Get category by ID only, no update
  async editCategory(categoryId) {
    try {
      const category = await Categories.findByPk(categoryId);
      if (!category) {
        throw new Error("Category not found");
      }
      return category;
    } catch (error) {
      console.error("Error fetching category:", error);
      throw error;
    }
  }

  async updateCategory(categoryId, updateData , files) {
    try {
      const category = await Categories.findByPk(categoryId);
      if (!category) {
        throw new Error("Category not found");
      }


    // ✅ Handle image update
    if (files && files.image) {
      const uploadDir = path.join(__dirname, "../../../public/images/category-images");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Delete old image
    if (category.category_img) {
      const oldImagePath = path.normalize(
        path.join(__dirname, "../../../public", category.category_img.replace(/^\/+/, ""))
      );
      console.log("Trying to delete:", oldImagePath);

      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
        console.log("✅ Old image deleted");
      } else {
        console.log("⚠️ Old image NOT found at:", oldImagePath);
      }
    }

      const fileExt = path.extname(files.image.name);
      const fileName = `category_${Date.now()}${fileExt}`;
      const fullPath = path.join(uploadDir, fileName);

      // Move new file
      await files.image.mv(fullPath);

      // Update path in DB
      updateData.category_img = `/images/category-images/${fileName}`;
    }




      await category.update(updateData);
      return { message: "Category updated successfully", category };
    } catch (error) {
      console.error("Error updating category:", error);
      throw error;
    }
  }

  // ✅ Delete Category (Soft Delete)
  async deleteCategory(categoryId) {
    try {
      const category = await Categories.findByPk(categoryId);
      if (!category) {
        throw new Error("Category not found");
      }

      category.category_del = 1;
      await category.save();

      return { message: "Category deleted (soft) successfully" };
    } catch (error) {
      console.error("Error deleting category:", error);
      throw error;
    }
  }


}

module.exports = new CategoryService();


