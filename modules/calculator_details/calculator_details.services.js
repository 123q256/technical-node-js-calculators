const { Op } = require("sequelize");
const db = require("../../models");
const HttpCodes = require("http-codes");
const { ApiError } = require("../../middlewares/ApiError");

const { Calculators } = db;

class CalculatorDetailsServices {
  /**
   * getSingleCalculatorDetails: Service Method
   * POST: /api/calculator_detail/:tech_calculator_link-name
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getSingleCalculatorDetails(body) {
    const { tech_calculator_link } = body;

    if (!tech_calculator_link) {
      return { message: "tech_calculator_link is required" }
    }

    const calculator = await Calculators.findOne({
      where: { tech_calculator_link },
    });

    if (!calculator) {
      return { message: "Calculator not found" };
    }

    let relatedCalculatorData = null;
    if (calculator.tech_related_cal) {
      try {
        relatedCalculatorData = JSON.parse(calculator.tech_related_cal);
      } catch (error) {
        return { message: "Error parsing related calculator data" };
      }
    }

    let langKeysData = null;
    if (calculator.tech_lang_keys) {
      try {
        langKeysData = JSON.parse(calculator.tech_lang_keys);
      } catch (error) {
        console.error("Error parsing tech_lang_keys:", error);
        return { message: "Error parsing language keys data" };
      }
    }

    const response = {
      ...calculator.toJSON(), // Spread the calculator data into the response
      tech_related_cal: relatedCalculatorData, // Add the parsed related calculator data
      tech_lang_keys: langKeysData, // Add the parsed language keys data
    };

    // Return the calculator data along with the parsed related data and language keys
    return response;
  }

  /**
   * getSingleConverterDetails: Service Method
   * POST: /api/calculator_detail/coverter
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getSingleConverterDetails(body) {
    const { tech_calculator_link } = body;

    if (!tech_calculator_link) {
        return { message: "tech_calculator_link is required" }
    }
    const calculator = await Calculators.findOne({
      where: { tech_calculator_link },
    });
   


     if (calculator.tech_is_calculator == "Converter") {
       const sub_cn = tech_calculator_link
        .split('-') // Splits the string by hyphens, e.g., ["volume", "converter"]
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalizes the first letter of each word, e.g., ["Volume", "Converter"]
        .join(' ') // Joins the words back with spaces, e.g., "Volume Converter"
        .trim(); // Removes any leading/trailing whitespace (good practice, though not strictly needed for this example)

        const all_sub = await Calculators.findAll({
          where: {
            tech_cal_cat: sub_cn,
          },
          attributes: ['tech_calculator_link'],
        });
        const filtered = all_sub.filter(item => {
        const firstPart = item.tech_calculator_link.split('/')[0];
        return firstPart.length !== 2;
        });
        return {
          calculator,
          all_sub:filtered,
        };
      } else if(calculator.tech_is_calculator == "Sub-Converter") {
         const sub_cn = calculator.tech_cal_cat

        const all_sub = await Calculators.findAll({
          where: {
            tech_cal_cat: sub_cn,
          },
          attributes: ['tech_calculator_link'],
        });
        const filtered = all_sub.filter(item => {
        const firstPart = item.tech_calculator_link.split('/')[0];
        return firstPart.length !== 2;
        });
        return {
          calculator,
          all_sub:filtered,
        };
      }
        //   if (!calculator) {
        //  return { message: "Calculator not found" }
        // }

    // Return the calculator data along with the parsed related data and language keys
    return calculator;
  }

  /**
   * getAllConvertorService: Service Method
   * GET: /api/calculator_detail/convertor
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getAllConvertorService(body) {
   
    const converter = await Calculators.findAll({
      where: { tech_is_calculator : "Converter" },
      attributes: ["tech_calculator_link","tech_calculator_title"],
    });

    if (!converter) {
      return res.status(404).json({ message: "Converter not found" });
    }
    // Return the calculator data along with the parsed related data and language keys
    return converter;
  }
  /**
   * getAllSubConverterService: Service Method
   * GET: /api/calculator_detail/convertor
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getAllSubConverterService(search) {
    if (!search || search.trim() === '') {
      return []; // Return empty array if search is empty
  }

    const converter = await Calculators.findAll({
      where: {
        [Op.and]: [
          { tech_is_calculator: "Sub-Converter" },
          {
            tech_parent: { [Op.like]: `%${search}%` }, // corrected here
          },
        ],
      },
      attributes: ["tech_calculator_link", "tech_calculator_title"],
    });
    
    if (!converter) {
      return res.status(404).json({ message: "Converter not found" });
    }
    // Return the calculator data along with the parsed related data and language keys
    return converter;
  }

  /**
   * getSingleCalculatorLanguage: Service Method
   * POST: /api/calculator_detail/:calculator_name
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getSingleCalculatorLanguage(tech_calculator_link) {
    try {
      const calculators = await Calculators.findAll({
        where: {
          [Op.or]: [
            { tech_calculator_link: tech_calculator_link }, // Exact match
            {
              tech_calculator_link: { [Op.like]: `%/${tech_calculator_link}` },
            },
          ],
        },
        attributes: ["tech_calculator_link"],
      });

      if (!calculators || calculators.length === 0) {
        return { message: "No calculators found" };
      }

      return calculators; // This will return an array of all matched records
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
}

module.exports = new CalculatorDetailsServices();
