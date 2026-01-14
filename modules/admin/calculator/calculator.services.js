const { Op } = require("sequelize");
const db = require("../../../models");
const HttpCodes = require("http-codes");
const { ApiError } = require("../../../middlewares/ApiError");
const path = require("path");
const fs = require("fs");

const folderPath = path.join(__dirname, "../../../public/keys");


const { Calculators, Categories, SubCategories } = db;

// const { Calculators, Categories, SubCategories } = db;

class CalculatorsServices {

  /**
   * getSingleCategoryAndSubCategory: Service Method
   * POST: /api/category/:category-name
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

    async createNewCalculator(data) {
      try {
        const {
          category_name,
          sub_category_id,
          tech_calculator_title,
          tech_calculator_detail,
          tech_calculator_link,
          tech_meta_title,
          tech_meta_des,
          tech_lang_keys,
          tech_parent,
          tech_no_index,
          tech_related_cal,
          tech_cal_cat,
          tech_cal_sub_cat,
          tech_is_calculator = "Calculator",
          tech_content,
          tech_content_show,
        } = data;

        if (!category_name) {
          return { success: false, message: "❌ 'category_name' is required but missing" };
        }

        if (!sub_category_id) {
          return { success: false, message: "❌ 'sub_category_id' is required but missing" };
        }

        const category = await Categories.findOne({ where: { category_name } });
        if (!category) return { success: false, message: "Category not found" };

        const subCategory = await SubCategories.findOne({
          where: { sub_category_id, category_id: category.category_id },
        });
        if (!subCategory) {
          return { success: false, message: "Subcategory not found for the selected category" };
        }

        // 🔍 Duplicate check
        if (tech_calculator_link) {
          const existing = await Calculators.findOne({
            where: { tech_calculator_link }
          });

          if (existing) {
            return {
              success: false,
              message: "'tech_calculator_link' already exists in the Calculators table.",
            };
          }
        }

        // ✅ Create the calculator
        const newCalculator = await Calculators.create({
          tech_calculator_title,
          tech_calculator_detail: tech_calculator_detail || null,
          tech_calculator_link: tech_calculator_link || null,
          tech_meta_title: tech_meta_title || null,
          tech_meta_des: tech_meta_des || null,
            tech_lang_keys: tech_lang_keys ? JSON.stringify(
            Object.fromEntries(
              JSON.parse(tech_lang_keys).map(({ key, value }) => [key, value])
            )
          ) : null,
          tech_parent: tech_parent || null,
          tech_no_index,
          tech_related_cal: tech_related_cal || null,
          tech_cal_cat: category.category_name,
          tech_cal_sub_cat: String(subCategory.sub_category_id),
          tech_is_calculator,
          tech_content: tech_content || null,
          tech_content_show,
        });

        // 📝 Save to file
        const folderPath = path.join(__dirname, "../../../public/keys");
        const sanitizedTitle = tech_calculator_link.replace(/[^a-zA-Z0-9-_]/g, "_");
        let fileName = `${sanitizedTitle}.txt`;
        let filePath = path.join(folderPath, fileName);

        if (!fs.existsSync(folderPath)) {
          fs.mkdirSync(folderPath, { recursive: true });
        }

        let counter = 1;
        while (fs.existsSync(filePath)) {
          fileName = `${sanitizedTitle}_${counter}.txt`;
          filePath = path.join(folderPath, fileName);
          counter++;
        }

        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");

        console.log(`✅ File saved: ${fileName}`);

        return {
          success: true,
          message: "✅ Calculator created successfully in Calculators table.",
          calculator: newCalculator,
        };

      } catch (error) {
        console.error("❌ Error creating calculator:", error);
        return {
          success: false,
          message: "Something went wrong while creating calculator",
          error: error.message,
        };
      }
    }
    // ✅ Get Calculator by ID (from Calculators only)
    async editcalculator(calculator_id) {
      try {
        const calculator = await Calculators.findByPk(calculator_id);

        if (!calculator) {
          throw new Error("Calculator not found.");
        }

        return {
          success: true,
          message: "Calculator found.",
          data: calculator
        };

      } catch (error) {
        console.error("Error fetching Calculator:", error);
        return {
          success: false,
          message: "Error fetching Calculator: " + error.message
        };
      }
    }

    async updateCalculator(calculator_id, updateData) {
    try {
        const folderPath = path.join(__dirname, "../../../public/keys");
      // 🔍 Find existing record
          const oldRecord = await Calculators.findByPk(calculator_id);
          if (!oldRecord) {
            return { success: false, message: "❌ Calculator not found in Calculators table." };
          }
          const {
            category_name,
            sub_category_id,
            tech_calculator_title,
            tech_calculator_link,
          } = updateData;

          // ✅ Validate category and subcategory if provided
          if (category_name) {
            const category = await Categories.findOne({ where: { category_name } });
            if (!category) {
              return { success: false, message: "❌ Category not found." };
            }

            if (sub_category_id) {
              const subCategory = await SubCategories.findOne({
                where: { sub_category_id, category_id: category.category_id },
              });

              if (!subCategory) {
                return {
                  success: false,
                  message: "❌ Subcategory not found for the selected category.",
                };
              }

              updateData.tech_cal_cat = category.category_name;
              updateData.tech_cal_sub_cat = String(subCategory.sub_category_id);
            }
          }
          // 🔁 Duplicate link check in same table, excluding self
          if (tech_calculator_link) {
            const duplicates = await Calculators.findAll({
              where: {
                tech_calculator_link,
                id: { [Op.ne]: calculator_id },
              },
            });

            if (duplicates.length >= 2) {
              return {
                success: false,
                message: "❌ tech_calculator_link already exists multiple times in Calculators table.",
              };
            }
          }
          // 🗑 Delete old file if exists
          if (oldRecord.tech_calculator_link) {
            const sanitizedTitle = oldRecord.tech_calculator_link.replace(/[^a-zA-Z0-9-_]/g, "_");
            const files = fs.readdirSync(folderPath);
            const matchingFile = files.find(file => file.startsWith(sanitizedTitle));
            if (matchingFile) {
              fs.unlinkSync(path.join(folderPath, matchingFile));
              console.log(`🗑 Deleted old file: ${matchingFile}`);
            }
          }
          // 📝 Save new file
          const newSanitizedTitle = updateData.tech_calculator_link
            ? updateData.tech_calculator_link.replace(/[^a-zA-Z0-9-_]/g, "_")
            : oldRecord.tech_calculator_link.replace(/[^a-zA-Z0-9-_]/g, "_");

          let newFileName = `${newSanitizedTitle}.txt`;
          let filePath = path.join(folderPath, newFileName);

          let counter = 1;
          while (fs.existsSync(filePath)) {
            newFileName = `${newSanitizedTitle}_${counter}.txt`;
            filePath = path.join(folderPath, newFileName);
            counter++;
          }

          fs.writeFileSync(filePath, JSON.stringify(updateData, null, 2), "utf-8");
          // 🛠 Update record
          await Calculators.update(updateData, { where: { id: calculator_id } });
          const updated = await Calculators.findByPk(calculator_id);
          return {
            success: true,
            message: `✅ Calculator updated successfully in Calculators table.`,
            updated,
            table: "Calculators",
          };

        } catch (error) {
          console.error("❌ Error updating calculator:", error);
          return {
            success: false,
            message: "Something went wrong while updating calculator",
            error: error.message,
          };
        }
    }

    async allcalculators() {
      try {
        const calculators = await Calculators.findAll({
          attributes: [
            "id",
            "tech_calculator_title",
            "tech_calculator_link",
            "tech_meta_title",
            "tech_meta_des",
            "tech_cal_cat",
            "tech_no_index",
            "tech_cal_sub_cat",
            "tech_is_calculator",
            "tech_content_show",
          ],
            where: {
          tech_is_calculator: 'Calculator',  // ← yeh condition lagai hai
      },
          order: [["id", "DESC"]],
        });

        return calculators;
      } catch (error) {
        console.error("Error fetching calculators:", error);
        throw error;
      }
    }

    async indexStatus(id) {
      try {
        const calculator = await Calculators.findOne({
          attributes: ["id", "tech_no_index"],
          where: {
            id: id,
            tech_is_calculator: "Calculator",
          },
        });

        if (!calculator) {
          throw new Error("Calculator not found or not a valid Calculator entry.");
        }

        // Toggle the value
        const newValue = calculator.tech_no_index == 0 ? 1 : 0;

        await Calculators.update(
          { tech_no_index: newValue },
          { where: { id: calculator.id } }
        );

        const updated = await Calculators.findByPk(calculator.id);

        return {
          success: true,
          message: "tech_no_index updated successfully.",
          data: updated,
        };

      } catch (error) {
        console.error("Error updating tech_no_index:", error);
        return {
          success: false,
          message: "Error updating tech_no_index: " + error.message,
        };
      }
    }

    async showContentStatus(id) {
      try {
        const calc = await Calculators.findOne({
          attributes: ["id", "tech_content_show"],
          where: {
            id: id,
            tech_is_calculator: "Calculator",
          },
        });

        if (!calc) {
          throw new Error("Calculator not found or not of type 'Calculator'");
        }

        const newValue = calc.tech_content_show == 0 ? 1 : 0;

        await Calculators.update(
          { tech_content_show: newValue },
          { where: { id: id } }
        );

        const updated = await Calculators.findOne({ where: { id: id } });

        return {
          success: true,
          message: `tech_content_show updated successfully.`,
          data: updated,
        };
      } catch (error) {
        console.error("Error updating tech_content_show:", error);
        return {
          success: false,
          message: "Error updating tech_content_show: " + error.message,
        };
      }
    }

    async Converter() {
      try {
        const calculators = await Calculators.findAll({
          attributes: [
            "id",
            "tech_calculator_title",
            "tech_calculator_link",
            "tech_meta_title",
            "tech_meta_des",
            "tech_cal_cat",
            "tech_no_index",
            "tech_cal_sub_cat",
            "tech_is_calculator",
            "tech_content_show",
          ],
            where: {
          tech_is_calculator: 'Converter',  // ← yeh condition lagai hai
      },
          order: [["id", "DESC"]],
        });

        return calculators;
      } catch (error) {
        console.error("Error fetching calculators:", error);
        throw error;
      }
    }

    async SubConverter() {
      try {
        const calculators = await Calculators.findAll({
          attributes: [
            "id",
            "tech_calculator_title",
            "tech_calculator_link",
            "tech_meta_title",
            "tech_meta_des",
            "tech_cal_cat",
            "tech_no_index",
            "tech_cal_sub_cat",
            "tech_is_calculator",
            "tech_content_show",
          ],
            where: {
          tech_is_calculator: 'Sub-Converter',  // ← yeh condition lagai hai
      },
          order: [["id", "DESC"]],
        });

        return calculators;
      } catch (error) {
        console.error("Error fetching calculators:", error);
        throw error;
      }
    }




}

module.exports = new CalculatorsServices();
