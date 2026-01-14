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

    async createNewsubconverter(data) {
      console.log("🔍 Incoming data:", data);
      try {
        const {
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
          tech_is_calculator = "Sub-Converter",
          tech_content,
          tech_content_show,
        } = data;

        // 🔍 Duplicate check
        if (tech_calculator_link) {
          const existing = await Calculators.findOne({
            where: { tech_calculator_link }
          });

          if (existing) {
            return {
              success: false,
              message: "'tech_calculator_link' already exists in the Sub-Converter table.",
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
            tech_no_index: tech_no_index,
            tech_related_cal: tech_related_cal || null,
            tech_cal_cat: tech_cal_cat,
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
          message: "✅ Sub-Converter created successfully in Sub-Converter table.",
          calculator: newCalculator,
        };

      } catch (error) {
        console.error("❌ Error creating Sub-Converter:", error);
        return {
          success: false,
          message: "Something went wrong while creating calculator",
          error: error.message,
        };
      }
    }
    // ✅ Get Calculator by ID (from Calculators only)
    async editsubconverter(calculator_id) {
      try {
        const calculator = await Calculators.findByPk(calculator_id);

        if (!calculator) {
          throw new Error("Sub-Converter not found.");
        }

        return {
          success: true,
          message: "Sub-Converter found.",
          data: calculator
        };

      } catch (error) {
        console.error("Error fetching Sub-Converter:", error);
        return {
          success: false,
          message: "Error fetching Sub-Converter: " + error.message
        };
      }
    }
    


    async  updatesubconverter(calculator_id, updateData) {
    try {
      // Pehle existing record le lo
      const oldRecord = await Calculators.findByPk(calculator_id);
      if (!oldRecord) {
        return { success: false, message: "❌Sub Converter not found in Calculators table." };
      }

      // Agar tech_lang_keys aaye to usko format karo
      if (updateData.tech_lang_keys) {
      try {
        const parsed = JSON.parse(updateData.tech_lang_keys);

        if (typeof parsed == 'object' && !Array.isArray(parsed)) {
          updateData.tech_lang_keys = JSON.stringify(parsed);
        } else if (Array.isArray(parsed)) {
          updateData.tech_lang_keys = JSON.stringify(
            Object.fromEntries(parsed.map(({ key, value }) => [key, value]))
          );
        } else {
          throw new Error("tech_lang_keys format not recognized");
        }

      } catch (err) {
        console.warn("❌ Invalid tech_lang_keys format:", err);
        updateData.tech_lang_keys = null;
      }
    }


      // Duplicate link check, except current record
      if (updateData.tech_calculator_link) {
        const duplicates = await Calculators.findAll({
          where: {
            tech_calculator_link: updateData.tech_calculator_link,
            id: { [Op.ne]: calculator_id },
          }
        });

        if (duplicates.length >= 1) {
          return {
            success: false,
            message: "❌ tech_calculator_link already exists in another record.",
          };
        }
      }

      // Update database record
      await Calculators.update(updateData, { where: { id: calculator_id } });
      const updatedCalculator = await Calculators.findByPk(calculator_id);

      // File save path
      const folderPath = path.join(__dirname, "../../../public/keys");
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }

      // Delete old file(s) starting with old link name
      if (oldRecord.tech_calculator_link) {
        const oldSanitized = oldRecord.tech_calculator_link.replace(/[^a-zA-Z0-9-_]/g, "_");
        const files = fs.readdirSync(folderPath);
        files.forEach(file => {
          if (file.startsWith(oldSanitized)) {
            fs.unlinkSync(path.join(folderPath, file));
            console.log(`🗑 Deleted old file: ${file}`);
          }
        });
      }

      // Prepare new file name unique
      const newSanitized = updateData.tech_calculator_link
        ? updateData.tech_calculator_link.replace(/[^a-zA-Z0-9-_]/g, "_")
        : oldRecord.tech_calculator_link.replace(/[^a-zA-Z0-9-_]/g, "_");

      let fileName = `${newSanitized}.txt`;
      let filePath = path.join(folderPath, fileName);
      let counter = 1;
      while (fs.existsSync(filePath)) {
        fileName = `${newSanitized}_${counter}.txt`;
        filePath = path.join(folderPath, fileName);
        counter++;
      }

      // Write updated data to file (you can choose what to save, here full updateData)
      fs.writeFileSync(filePath, JSON.stringify(updateData, null, 2), "utf-8");
      console.log(`✅ File saved: ${fileName}`);

      return {
        success: true,
        message: "✅ ❌Sub Converter updated successfully in Calculators table.",
        updated: updatedCalculator,
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



    async cattegorysubconverter() {
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
        console.error("Error fetching Sub-Converter:", error);
        throw error;
      }
    }
    async subconverter() {
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
        console.error("Error fetching Sub-Converter:", error);
        throw error;
      }
    }

    async indexStatussubconverter(id) {
      try {
        const calculator = await Calculators.findOne({
          attributes: ["id", "tech_no_index"],
          where: {
            id: id,
            tech_is_calculator: "Sub-Converter",
          },
        });

        if (!calculator) {
          throw new Error("Sub-Converter not found or not a valid Sub-Converter entry.");
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

    async showContentStatussubconverter(id) {
      try {
        const calc = await Calculators.findOne({
          attributes: ["id", "tech_content_show"],
          where: {
            id: id,
            tech_is_calculator: "Sub-Converter",
          },
        });

        if (!calc) {
          throw new Error("Sub-Converter not found or not of type 'Sub-Converter'");
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


}

module.exports = new CalculatorsServices();
