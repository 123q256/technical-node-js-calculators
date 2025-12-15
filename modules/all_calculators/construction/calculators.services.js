const { Op, col } = require("sequelize");
const db = require("../../models");
const HttpCodes = require("http-codes");
const { ApiError } = require("../../middlewares/ApiError");
const dayjs = require("dayjs");
const isoWeek = require("dayjs/plugin/isoWeek");
const dayOfYear = require("dayjs/plugin/dayOfYear");
const isLeapYear = require("dayjs/plugin/isLeapYear");

dayjs.extend(isoWeek);
dayjs.extend(dayOfYear);
dayjs.extend(isLeapYear);
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
const localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

const moment = require("moment");
const momenttimezone = require("moment-timezone");
const customParseFormat = require("dayjs/plugin/customParseFormat");
const duration = require("dayjs/plugin/duration");
dayjs.extend(customParseFormat);
dayjs.extend(duration);
const sprintf = require("sprintf-js").sprintf;
const isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
dayjs.extend(isSameOrBefore);

const weekday = require("dayjs/plugin/weekday");
dayjs.extend(weekday);

const weekOfYear = require("dayjs/plugin/weekOfYear");
dayjs.extend(weekOfYear);

const advancedFormat = require("dayjs/plugin/advancedFormat");
dayjs.extend(advancedFormat);

require("moment-duration-format");

require("moment-precise-range-plugin");
const math = require("mathjs");
const momentBase = require("moment");
const axios = require("axios");
const qs = require("qs");
const { factorial } = require("mathjs"); // Ensure mathjs is installed
const { DateTime } = require("luxon"); // use luxon or native Date for date handling

class AgeCalculator {
  constructor() {
    this.age = 0;
  }

  calculateAge(timestamp) {
    const birthDate = new Date(timestamp);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    this.age = age;
  }

  getAge() {
    return this.age;
  }

  getRank(age) {
    return age + 1; // Example rank logic
  }
}

class CalculatorsServices {
  async getCalculationRoofPitchCalculator(body) {
    try {
      let submit = body.tech_submit;
      let x = body.tech_x;
      let y = body.tech_y;
      let unit = body.tech_unit;
      let unit_r = body.tech_unit_r;
      let unit_a = body.tech_unit_a;
      let from = body.tech_from;

      let rise = parseFloat(x);
      let run = parseFloat(y);

      // Validate numeric inputs
      if (isNaN(rise) || isNaN(run)) {
        return {
          error: "Please! Fill all the Input Fields",
        };
      }

      let pitch, rafter, angle, xValue, P;

      // Helper function to convert to meters
      const convertToMeters = (value, unitType) => {
        switch (unitType) {
          case "ft":
            return value / 3.281;
          case "in":
            return value / 39.37;
          case "yd":
            return value / 1.094;
          default:
            return value;
        }
      };

      // Case 1: Rise and Run provided
      if (from === "1") {
        rise = convertToMeters(rise, unit);
        run = convertToMeters(run, unit_r);

        P = `${Math.round(rise * 3.281)}/${Math.round(run * 3.281 * 2)}`;
        pitch = Math.round((rise / run) * 100 * 100) / 100;
        rafter = Math.round(Math.sqrt(rise * rise + run * run) * 100) / 100;
        angle =
          Math.round(Math.atan(pitch / 100) * (180 / Math.PI) * 100) / 100;
        xValue = Math.round((pitch / 100) * 12 * 100) / 100;
      }

      // Case 2: Rise and Rafter provided
      else if (from === "2") {
        rafter = parseFloat(y);
        rise = convertToMeters(rise, unit);
        rafter = convertToMeters(rafter, unit_r);

        run = Math.round(Math.sqrt(rafter * rafter - rise * rise) * 100) / 100;
        P = `${Math.round(rise * 3.281)}/${Math.round(run * 3.281 * 2)}`;
        pitch = Math.round((rise / run) * 100 * 100) / 100;
        angle =
          Math.round(Math.atan(pitch / 100) * (180 / Math.PI) * 100) / 100;
        xValue = Math.round((pitch / 100) * 12 * 100) / 100;
      }

      // Case 3: Run and Rafter provided
      else if (from === "3") {
        run = parseFloat(x);
        rafter = parseFloat(y);
        run = convertToMeters(run, unit);
        rafter = convertToMeters(rafter, unit_r);

        rise = Math.round(Math.sqrt(rafter * rafter - run * run) * 100) / 100;
        P = `${Math.round(rise * 3.281)}/${Math.round(run * 3.281 * 2)}`;
        pitch = Math.round((rise / run) * 100 * 100) / 100;
        angle =
          Math.round(Math.atan(pitch / 100) * (180 / Math.PI) * 100) / 100;
        xValue = Math.round((pitch / 100) * 12 * 100) / 100;
      }

      // Case 4: Rise and Pitch provided
      else if (from === "4") {
        pitch = parseFloat(y);
        rise = convertToMeters(rise, unit);

        run = Math.round((rise / pitch) * 100 * 100) / 100;
        P = `${Math.round(rise * 3.281)}/${Math.round(run * 3.281 * 2)}`;
        rafter = Math.round(Math.sqrt(rise * rise + run * run) * 100) / 100;
        angle =
          Math.round(Math.atan(pitch / 100) * (180 / Math.PI) * 100) / 100;
        xValue = Math.round((pitch / 100) * 12 * 100) / 100;
      }

      // Case 5: Rise and Angle provided
      else if (from === "5") {
        angle = parseFloat(y);
        rise = convertToMeters(rise, unit);

        // Convert angle to radians if in degrees
        if (unit_a === "deg") {
          angle = (angle * Math.PI) / 180;
        }

        pitch = Math.round(Math.tan(angle) * 100 * 100) / 100;
        run = Math.round((rise / pitch) * 100 * 100) / 100;
        P = `${Math.round(rise * 3.281)}/${Math.round(run * 3.281 * 2)}`;
        rafter = Math.round(Math.sqrt(rise * rise + run * run) * 100) / 100;
        xValue = Math.round((pitch / 100) * 12 * 100) / 100;
        angle = (angle * 180) / Math.PI; // Convert back to degrees
      }

      // Case 6: Rise and X (rise per foot) provided
      else if (from === "6") {
        xValue = parseFloat(y);
        rise = convertToMeters(rise, unit);

        pitch = Math.round(((xValue * 100) / 12) * 100) / 100;
        run = Math.round((rise / pitch) * 100 * 100) / 100;
        P = `${Math.round(rise * 3.281)}/${Math.round(run * 3.281 * 2)}`;
        rafter = Math.round(Math.sqrt(rise * rise + run * run) * 100) / 100;
        angle =
          Math.round(Math.atan(pitch / 100) * (180 / Math.PI) * 100) / 100;
      }

      // Case 7: Run and Pitch provided
      else if (from === "7") {
        run = parseFloat(x);
        pitch = parseFloat(y);
        run = convertToMeters(run, unit);

        rise = Math.round(((run * pitch) / 100) * 100) / 100;
        P = `${Math.round(rise * 3.281)}/${Math.round(run * 3.281 * 2)}`;
        rafter = Math.round(Math.sqrt(rise * rise + run * run) * 100) / 100;
        angle =
          Math.round(Math.atan(pitch / 100) * (180 / Math.PI) * 100) / 100;
        xValue = Math.round((pitch / 100) * 12 * 100) / 100;
      }

      // Case 8: Run and Angle provided
      else if (from === "8") {
        run = parseFloat(x);
        angle = parseFloat(y);
        run = convertToMeters(run, unit);

        // Convert angle to radians if in degrees
        if (unit_a === "deg") {
          angle = (angle * Math.PI) / 180;
        }

        pitch = Math.round(Math.tan(angle) * 100 * 100) / 100;
        rise = Math.round(((run * pitch) / 100) * 100) / 100;
        P = `${Math.round(rise * 3.281)}/${Math.round(run * 3.281 * 2)}`;
        rafter = Math.round(Math.sqrt(rise * rise + run * run) * 100) / 100;
        xValue = Math.round((pitch / 100) * 12 * 100) / 100;
        angle = (angle * 180) / Math.PI; // Convert back to degrees
      }

      // Case 9: Run and X (rise per foot) provided
      else if (from === "9") {
        run = parseFloat(x);
        xValue = parseFloat(y);
        run = convertToMeters(run, unit);

        pitch = Math.round(((xValue * 100) / 12) * 100) / 100;
        rise = Math.round(((run * pitch) / 100) * 100) / 100;
        P = `${Math.round(rise * 3.281)}/${Math.round(run * 3.281 * 2)}`;
        rafter = Math.round(Math.sqrt(rise * rise + run * run) * 100) / 100;
        angle =
          Math.round(Math.atan(pitch / 100) * (180 / Math.PI) * 100) / 100;
      }

      // Case 10: Rafter and Pitch provided
      else if (from === "10") {
        rafter = parseFloat(x);
        pitch = parseFloat(y);
        rafter = convertToMeters(rafter, unit);

        // Note: Original code had error - calculating rise from run which wasn't defined
        // Correcting: rafter^2 = rise^2 + run^2 and pitch = rise/run
        // So: rise = rafter * sin(atan(pitch/100))
        const pitchAngle = Math.atan(pitch / 100);
        rise = Math.round(rafter * Math.sin(pitchAngle) * 100) / 100;
        run = Math.round(rafter * Math.cos(pitchAngle) * 100) / 100;

        P = `${Math.round(rise * 3.281)}/${Math.round(run * 3.281 * 2)}`;
        angle = Math.round(pitchAngle * (180 / Math.PI) * 100) / 100;
        xValue = Math.round((pitch / 100) * 12 * 100) / 100;
      }

      // Return calculated values
      return {
        tech_pitch: pitch,
        tech_rise: Math.round(rise * 100) / 100,
        tech_run: Math.round(run * 100) / 100,
        tech_rafter: rafter,
        tech_angle: angle,
        tech_x: xValue,
        tech_P: P,
      };
    } catch (error) {
      console.error("Calculation Error:", error);
      return {
        error: "An error occurred during calculation",
      };
    }
  }

  async getCalculationCubicFeetCalculator(body) {
    try {
      let length = body.tech_length;
      let width = body.tech_width;
      let height = body.tech_height;

      let length_unit = body.tech_length_unit;
      let width_unit = body.tech_width_unit;
      let height_unit = body.tech_height_unit;

      let weight = body.tech_weight;
      let weight_unit = body.tech_weight_unit;

      let quantity = body.tech_quantity;
      let price = body.tech_price;
      let price_unit = body.tech_price_unit;

      let room_unit = body.tech_room_unit;

      let area = body.tech_area;
      let area_unit = body.tech_area_unit;

      const param = {};

      // ========== ROOM UNIT 1 ========== //
      if (room_unit === "1") {
        if (isNumeric(length) && isNumeric(width) && isNumeric(height)) {
          // Helper conversion functions
          function calculate(a, b) {
            switch (b) {
              case "ft":
                return a * 1;
              case "in":
                return a * 0.0833333;
              case "yd":
                return a * 3;
              case "cm":
                return a * 0.0328084;
              case "m":
                return a * 3.28084;
              case "mm":
                return a * 0.003281;
              case "km":
                return a * 3281;
              case "mi":
                return a * 5280;
              case "nmi":
                return a * 6076;
              default:
                return a;
            }
          }

          function calculate2(a, b) {
            return calculate(a, b);
          }

          function converting(a, b) {
            switch (b) {
              case "cm":
                return a * 1;
              case "ft":
                return a * 30.48;
              case "m":
                return a * 100;
              case "in":
                return a * 2.54;
              case "yd":
                return a * 91.44;
              case "km":
                return a * 100000;
              case "mm":
                return a * 0.1;
              case "mi":
                return a * 160934;
              case "nmi":
                return a * 185200;
              default:
                return a;
            }
          }

          const l = calculate(length, length_unit);
          const w = calculate(width, width_unit);
          const h = calculate(height, height_unit);
          let volume = l * w * h;

          const calculate_meter_cube = volume / 35.3147;
          const calculate_cubic_yards = volume * 0.03704;
          const calculate_cubic_inches = volume / 0.0005787;
          const calculate_cubic_centimeters = volume * 28317;

          const v1 = converting(length, length_unit);
          const v2 = converting(width, width_unit);
          const v3 = converting(height, height_unit);
          const volumetric_weight = (v1 * v2 * v3) / 5000;
          const volumetric_weight2 = volumetric_weight * 2.205;

          const v4 = calculate2(length, length_unit);
          const v5 = calculate2(width, width_unit);
          const v6 = calculate2(height, height_unit);

          const twenty_ft = 1165 / (v4 * v5 * v6);
          const fourty_ft = 2350 / (v4 * v5 * v6);
          const fourty_high_cube = 2694 / (v4 * v5 * v6);

          // Quantity
          if (quantity && quantity != 0) {
            volume = volume * quantity;
          }

          // Weight
          if (weight && weight != 0) {
            if (weight_unit == "lbs") {
              param.tech_weight_unit = weight_unit;
              const weight_convert = weight * 0.454;
              param.tech_weight = weight;
              param.tech_weight_convert = weight_convert;
            } else if (weight_unit == "kg") {
              param.tech_weight_unit = weight_unit;
              const weight_convert = weight * 2.205;
              param.tech_weight = weight;
              param.tech_weight_convert = weight_convert;
            }
          }

          // Price
          if (price && price != 0 && weight != "") {
            switch (price_unit) {
              case "ft³":
                price = price * 1;
                break;
              case "yd³":
                price = price * 0.04;
                break;
              case "m³":
                price = price * 0.03;
                break;
              case "cm³":
                price = price * 28316.85;
                break;
              case "in³":
                price = price * 1.728;
                break;
            }
            volume = volume * price;
            param.tech_estimated_price = price;
          }

          param.tech_volume = volume;
          param.tech_cubic_meter = calculate_meter_cube;
          param.tech_cubic_yards = calculate_cubic_yards;
          param.tech_cubic_inches = calculate_cubic_inches;
          param.tech_cubic_centimeters = calculate_cubic_centimeters;
          param.tech_weight = weight;
          param.tech_volumetric_weight = volumetric_weight;
          param.tech_volumetric_weight2 = volumetric_weight2;
          param.tech_twenty_ft = twenty_ft;
          param.tech_fourty_ft = fourty_ft;
          param.tech_fourty_high_cube = fourty_high_cube;
          param.tech_l = l;
          param.tech_w = w;
          param.tech_h = h;
          return param;
        } else {
          return { error: "Please! Check Your Input" };
        }
      }

      // ========== ROOM UNIT 2 ========== //
      else if (room_unit === "2") {
        if (isNumeric(area) && isNumeric(height)) {
          let convert13;
          switch (area_unit) {
            case "ft":
              convert13 = area * 1;
              break;
            case "in":
              convert13 = area * 0.00694444;
              break;
            case "yd":
              convert13 = area * 9;
              break;
            case "cm":
              convert13 = area * 0.00107639;
              break;
            case "m":
              convert13 = area * 10.7639;
              break;
            default:
              convert13 = area;
          }

          function calculate_three(a, b) {
            switch (b) {
              case "ft":
                return a * 1;
              case "in":
                return a * 0.0833333;
              case "yd":
                return a * 3;
              case "cm":
                return a * 0.0328084;
              case "m":
                return a * 3.28084;
              case "mm":
                return a * 0.003281;
              case "km":
                return a * 3281;
              case "mi":
                return a * 5280;
              case "nmi":
                return a * 6076.12;
              default:
                return a;
            }
          }

          const h1 = calculate_three(height, height_unit);
          let volume = convert13 * h1;
          let estimated_price = 0;

          if (price && price != 0) {
            switch (price_unit) {
              case "ft³":
                price = price * 1;
                break;
              case "yd³":
                price = price * 0.04;
                break;
              case "m³":
                price = price * 0.03;
                break;
              case "cm³":
                price = price * 28316.85;
                break;
              case "in³":
                price = price * 1728;
                break;
            }
            estimated_price = volume * price;
          }

          if (quantity && quantity != 0) {
            volume = volume * quantity;
          }

          param.tech_volume = volume;
          const calculate_meter_cube = volume / 35.3147;
          const calculate_cubic_yards = volume * 27;
          const calculate_cubic_inches = volume / 0.0005787;
          const calculate_cubic_centimeters = volume * 28317;

          param.tech_cubic_meter = calculate_meter_cube;
          param.tech_cubic_yards = calculate_cubic_yards;
          param.tech_cubic_inches = calculate_cubic_inches;
          param.tech_cubic_centimeters = calculate_cubic_centimeters;
          param.tech_estimated_price = estimated_price;
          param.tech_h1 = h1;
          param.tech_convert13 = convert13;

          return param;
        } else {
          return { error: "Please! Check Your Input" };
        }
      }

      // Default case
      return { error: "Invalid room_unit" };
    } catch (error) {
      console.error(error);
      return { error: "Server error occurred" };
    }
    // Helper: check numeric
    function isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }
  }

  async getCalculationFeetAndInchesCalculator(body) {
    // Extract inputs (Laravel-style converted to JS)
    let feet1 = body.tech_feet1;
    let inches1 = body.tech_inches1;
    let operations = body.tech_operations;
    let feet2 = body.tech_feet2;
    let inches2 = body.tech_inches2;

    const ft_unit = "ft";
    const in_unit = "in";
    const baran = 12;

    let result = {};

    // Helper: convert "2 1/2" or "3/4" etc to decimal
    function calculation(inches) {
      let intPart = 0;
      let fracPart = 0;
      const parts = inches.toString().trim().split(" ");
      if (parts.length >= 1) {
        intPart = parseFloat(parts[0]);
      }
      if (parts.length >= 2) {
        const [top, bottom] = parts[1].split("/");
        fracPart = parseFloat(top) / parseFloat(bottom);
      }
      return intPart + fracPart;
    }

    // Helper: convert "1/2" to decimal
    function convertToDecimal(inches) {
      const [num, den] = inches.split("/");
      return Math.round((parseFloat(num) / parseFloat(den)) * 1e6) / 1e6;
    }

    // Helper: convert float back to fraction string
    function float2rat(n, tolerance = 1e-6) {
      let h1 = 1,
        h2 = 0,
        k1 = 0,
        k2 = 1;
      let b = 1 / n;
      do {
        b = 1 / b;
        let a = Math.floor(b);
        let aux = h1;
        h1 = a * h1 + h2;
        h2 = aux;
        aux = k1;
        k1 = a * k1 + k2;
        k2 = aux;
        b = b - a;
      } while (Math.abs(n - h1 / k1) > n * tolerance);

      if (k1 >= 2) {
        const div = h1 / k1;
        const intPart = Math.floor(div);
        const mod = h1 % k1;
        if (intPart >= 1) {
          return `${intPart} ${mod}/${k1}`;
        } else {
          return `${h1}/${k1}`;
        }
      } else if (k1 <= 1) {
        return `${h1}`;
      }
    }

    // --- Validation check ---
    if (!isNaN(feet1) && !isNaN(feet2) && inches1 !== "" && inches2 !== "") {
      // Convert fractional or mixed inputs
      const fractionPattern = /^(?:\d+\/\d+)$/;
      const mixedPattern = /^(\d+(?: \d+\/\d+)?)$/;

      if (fractionPattern.test(inches1) && fractionPattern.test(inches2)) {
        inches1 = convertToDecimal(inches1);
        inches2 = convertToDecimal(inches2);
      } else if (mixedPattern.test(inches1) && mixedPattern.test(inches2)) {
        inches1 = calculation(inches1);
        inches2 = calculation(inches2);
      } else if (mixedPattern.test(inches1) && fractionPattern.test(inches2)) {
        inches1 = calculation(inches1);
        inches2 = convertToDecimal(inches2);
      } else if (fractionPattern.test(inches1) && mixedPattern.test(inches2)) {
        inches1 = convertToDecimal(inches1);
        inches2 = calculation(inches2);
      }

      let ft, in_, ft2, in2, ft_div;

      // --- Operation 1: Addition ---
      if (operations === "1") {
        in_ = parseFloat(inches1) + parseFloat(inches2);
        ft = parseFloat(feet1) + parseFloat(feet2);
        in_ = in_ / baran;
        if (!in_.toString().includes(".")) {
          ft = ft + in_;
        } else {
          const [f, i] = in_.toString().split(".");
          const b = parseFloat("0." + i);
          ft = ft + parseFloat(f);
          in_ = b * baran;
          in_ = float2rat(in_);
        }
      }

      // --- Operation 2: Subtraction ---
      else if (operations === "2") {
        if (feet1 >= feet2 && inches1 >= inches2) {
          in_ = inches1 - inches2;
          ft = feet1 - feet2;
          in_ = in_ / baran;
          if (!in_.toString().includes(".")) {
            ft = ft + in_;
          } else {
            const [f, i] = in_.toString().split(".");
            const b = parseFloat("0." + i);
            ft = ft + parseFloat(f);
            in_ = b * baran;
            in_ = float2rat(in_);
          }
        } else if (feet1 <= feet2 && inches1 <= inches2) {
          in_ = inches1 - inches2;
          ft = feet1 - feet2;
          in_ = in_ / baran;
          if (!in_.toString().includes(".")) {
            ft = ft + in_;
          } else {
            const [f, i] = in_.toString().split(".");
            const b = parseFloat("0." + i);
            ft = ft + parseFloat(f);
            in_ = b * baran;
            in_ = float2rat(in_);
          }
        } else if (feet1 >= feet2 && inches1 <= inches2) {
          while (inches1 < inches2) {
            inches2 -= baran;
            feet2 += 1;
          }
          in_ = inches1 - inches2;
          ft = feet1 - feet2;
          in_ = in_ / baran;
          if (!in_.toString().includes(".")) {
            ft = ft + in_;
          } else {
            const [f, i] = in_.toString().split(".");
            const b = parseFloat("0." + i);
            ft = ft + parseFloat(f);
            in_ = b * baran;
            in_ = float2rat(in_);
          }
        } else if (feet1 <= feet2 && inches1 >= inches2) {
          while (inches1 > inches2) {
            inches1 -= baran;
            feet1 += 1;
          }
          while (inches1 < inches2) {
            inches2 -= baran;
            feet2 += 1;
          }
          in_ = inches1 - inches2;
          ft = feet1 - feet2;
          in_ = in_ / baran;
          if (!in_.toString().includes(".")) {
            ft = ft + in_;
          } else {
            const [f, i] = in_.toString().split(".");
            const b = parseFloat("0." + i);
            ft = ft + parseFloat(f);
            in_ = b * baran;
            in_ = float2rat(in_);
          }
        }
      }

      // --- Operation 3: Multiplication ---
      else if (operations === "3") {
        const ft1 = feet1 * baran;
        const ft2_ = feet2 * baran;
        const fot1 = ft1 + inches1;
        const fot2 = ft2_ + inches2;
        ft2 = fot1 * fot2;
        const in1 = inches1 / baran;
        const in2_ = inches2 / baran;
        const inc1 = in1 + Number(feet1);
        const inc2 = in2_ + Number(feet2);
        const c = inc1 * inc2;
        in2 = Number(c).toFixed(4);
      }

      // --- Operation 4: Division ---
      else if (operations === "4") {
        const ft1 = feet1 * baran;
        const ft21 = feet2 * baran;
        const fot1 = ft1 + inches1;
        const fot2 = ft21 + inches2;
        const a = fot1 / fot2;
        ft_div = Number(a).toFixed(4);
      }

      // Prepare result
      result.tech_ft_unit = ft_unit;
      result.tech_in_unit = in_unit;
      if (ft !== undefined) result.tech_ft = ft;
      if (in_ !== undefined) result.tech_in = in_;
      if (ft2 !== undefined) result.tech_ft2 = ft2;
      if (in2 !== undefined) result.tech_in2 = in2;
      if (ft_div !== undefined) result.tech_ft_div = ft_div;
    } else {
      result.error = "Please! Check Your Inputs";
    }

    return result;
  }

  async getCalculationAcreageCalculator(body) {
    try {
      let to_cal = Number(body.tech_to_cal);
      let length = Number(body.tech_length);
      let length_unit = body.tech_length_unit;
      let width = Number(body.tech_width);
      let width_unit = body.tech_width_unit;
      let area = Number(body.tech_area);
      let area_unit = body.tech_area_unit;
      let price = Number(body.tech_price);
      let price_unit = body.tech_price_unit;
      let currancy = body.tech_currancy;

      let result = {};

      // Calculate Area (when length and width are given)
      if (to_cal === 1) {
        if (!isNaN(length) && !isNaN(width)) {
          // Convert width to meters
          if (width_unit === "cm") {
            width = width * 0.01;
          } else if (width_unit === "in") {
            width = width * 0.0254;
          } else if (width_unit === "ft") {
            width = width * 0.3048;
          } else if (width_unit === "yd") {
            width = width * 0.9144;
          } else if (width_unit === "mm") {
            width = width * 0.001;
          }

          area = Number(width) * Number(length);
          let perimeter = Number(Number(width) * 2 + Number(length) * 2);
          console.log(area, width, length);
          // Calculate price if provided
          if (!isNaN(price) && price > 0) {
            let ans = 0;
            if (price_unit === "/mm²") {
              ans = area * 1000000;
            } else if (price_unit === "/cm²") {
              ans = area * 10000;
            } else if (price_unit === "/m²") {
              ans = area * 1;
            } else if (price_unit === "/in²") {
              ans = area * 1550.003;
            } else if (price_unit === "/ft²") {
              ans = area * 10.7639;
            } else if (price_unit === "/yd²") {
              ans = area * 1.19599;
            } else if (price_unit === "/ac") {
              ans = area * 0.0002471054;
            } else if (price_unit === "/ha") {
              ans = area * 0.0001;
            }
            let final_price = Number(ans) * Number(price);
            result.tech_final_price = final_price;
          }

          result.tech_area = area;
          result.tech_perimeter = perimeter;
          return result;
        } else {
          result.error = "Please! Check Your Inputs";
          return result;
        }
      }

      // Calculate Length (when width and area are given)
      else if (to_cal === 2) {
        if (!isNaN(width) && !isNaN(area)) {
          // Convert width to meters
          if (width_unit === "cm") {
            width = width * 0.01;
          } else if (width_unit === "in") {
            width = width * 0.0254;
          } else if (width_unit === "ft") {
            width = width * 0.3048;
          } else if (width_unit === "yd") {
            width = width * 0.9144;
          } else if (width_unit === "mm") {
            width = width * 0.001;
          }

          // Convert area to square meters
          if (area_unit === "mm²") {
            area = area * 0.000001;
          } else if (area_unit === "cm²") {
            area = area * 0.0001;
          } else if (area_unit === "m²") {
            area = area * 1;
          } else if (area_unit === "in²") {
            area = area * 0.00064516;
          } else if (area_unit === "ft²") {
            area = area * 0.092903;
          } else if (area_unit === "yd²") {
            area = area * 0.836127;
          } else if (area_unit === "ac") {
            area = area * 4046.86;
          } else if (area_unit === "ha") {
            area = area * 10000;
          }

          length = Number(area) / Number(width);
          let perimeter = Number(Number(width) * 2 + Number(length) * 2);

          // Calculate price if provided
          if (!isNaN(price) && price > 0) {
            let ans = 0;
            if (price_unit === "/mm²") {
              ans = area * 1000000;
            } else if (price_unit === "/cm²") {
              ans = area * 10000;
            } else if (price_unit === "/m²") {
              ans = area * 1;
            } else if (price_unit === "/in²") {
              ans = area * 1550.003;
            } else if (price_unit === "/ft²") {
              ans = area * 10.7639;
            } else if (price_unit === "/yd²") {
              ans = area * 1.19599;
            } else if (price_unit === "/ac") {
              ans = area * 0.0002471054;
            } else if (price_unit === "/ha") {
              ans = area * 0.0001;
            }
            let final_price = Number(ans) * Number(price);
            result.tech_final_price = final_price;
          }

          result.tech_length = length;
          result.tech_perimeter = perimeter;
          return result;
        } else {
          result.error = "Please! Check Your Inputs";
          return result;
        }
      }

      // Calculate Width (when length and area are given)
      else if (to_cal === 3) {
        if (!isNaN(length) && !isNaN(area)) {
          // Convert length to meters
          if (length_unit === "cm") {
            length = length * 0.01;
          } else if (length_unit === "in") {
            length = length * 0.0254;
          } else if (length_unit === "ft") {
            length = length * 0.3048;
          } else if (length_unit === "yd") {
            length = length * 0.9144;
          } else if (length_unit === "mm") {
            length = length * 0.001;
          }

          // Convert area to square meters
          if (area_unit === "mm²") {
            area = area * 0.000001;
          } else if (area_unit === "cm²") {
            area = area * 0.0001;
          } else if (area_unit === "m²") {
            area = area * 1;
          } else if (area_unit === "in²") {
            area = area * 0.00064516;
          } else if (area_unit === "ft²") {
            area = area * 0.092903;
          } else if (area_unit === "yd²") {
            area = area * 0.836127;
          } else if (area_unit === "ac") {
            area = area * 4046.86;
          } else if (area_unit === "ha") {
            area = area * 10000;
          }

          width = Number(area) / Number(length);
          let perimeter = Number(Number(width) * 2 + Number(length) * 2);

          // Calculate price if provided
          if (!isNaN(price) && price > 0) {
            let ans = 0;
            if (price_unit === "/mm²") {
              ans = area * 1000000;
            } else if (price_unit === "/cm²") {
              ans = area * 10000;
            } else if (price_unit === "/m²") {
              ans = area * 1;
            } else if (price_unit === "/in²") {
              ans = area * 1550.003;
            } else if (price_unit === "/ft²") {
              ans = area * 10.7639;
            } else if (price_unit === "/yd²") {
              ans = area * 1.19599;
            } else if (price_unit === "/ac") {
              ans = area * 0.0002471054;
            } else if (price_unit === "/ha") {
              ans = area * 0.0001;
            }
            let final_price = Number(ans) * Number(price);
            result.tech_final_price = final_price;
          }

          result.tech_width = width;
          result.tech_perimeter = perimeter;
          return result;
        } else {
          result.error = "Please! Check Your Inputs";
          return result;
        }
      }
    } catch (error) {
      console.error("Error in getCalculationAcreageCalculator:", error);
      return { error: "An error occurred during calculation" };
    }
  }

  async getCalculationRebarCalculator(body) {
    try {
      // Extract all input values from body
      let {
        tech_first,
        tech_units1,
        tech_second,
        tech_units2,
        tech_third,
        tech_units3,
        tech_four,
        tech_units4,
        tech_five,
        tech_units5,
        tech_six,
        tech_units6,
        tech_currancy,
      } = body;

      let param = {};
      let convert, convert2, convert3;
      // 🧩 Remove currency prefix if present
      if (tech_units5 && tech_currancy) {
        tech_units5 = tech_units5.replace(tech_currancy + " ", "");
      }

      // ✅ Helper Functions (Converted from PHP)

      function cm_unit(a, b) {
        if (a == "cm") {
          convert = b * 1;
        } else if (a == "m") {
          convert = b * 100;
        } else if (a == "km") {
          convert = b * 100000;
        } else if (a == "in") {
          convert = b * 2.54;
        } else if (a == "ft") {
          convert = b * 30.48;
        } else if (a == "yd") {
          convert = b * 91.44;
        } else if (a == "mi") {
          convert = b * 30.48;
        }
        return convert;
      }
      function cm_unit2(a, b) {
        if (a == "mm") {
          convert2 = b / 10;
        } else if (a == "cm") {
          convert2 = b * 1;
        } else if (a == "m") {
          convert2 = b * 100;
        } else if (a == "in") {
          convert2 = b * 2.54;
        } else if (a == "ft") {
          convert2 = b * 30.48;
        } else if (a == "yd") {
          convert2 = b * 91.44;
        }
        return convert2;
      }
      function cm_unit3(a, b) {
        if (a == "cm") {
          convert3 = b * 1;
        } else if (a == "m") {
          convert3 = b * 100;
        } else if (a == "in") {
          convert3 = b * 2.54;
        } else if (a == "ft") {
          convert3 = b * 30.48;
        } else if (a == "yd") {
          convert3 = b * 91.44;
        }
        return convert3;
      }

      // ✅ Validate numeric inputs
      if (
        !isNaN(tech_first) &&
        !isNaN(tech_second) &&
        !isNaN(tech_third) &&
        !isNaN(tech_four) &&
        !isNaN(tech_five) &&
        !isNaN(tech_six)
      ) {
        // Convert all to cm
        let first = cm_unit(tech_units1, Number(tech_first));
        let second = cm_unit(tech_units2, Number(tech_second));
        let third = cm_unit2(tech_units3, Number(tech_third));
        let four = cm_unit2(tech_units4, Number(tech_four));
        let five = cm_unit3(tech_units5, Number(tech_five));
        let six = cm_unit3(tech_units6, Number(tech_six));

        // Main calculations
        const mul1 = 2 * four;
        const grid_len = first - mul1;
        const grid_wid = second - mul1;

        const rebar_col = grid_len / third;
        const rebar_row = grid_wid / third;
        const part1 = rebar_col * grid_wid;
        const part2 = rebar_row * grid_len;
        const trl = part1 + part2;

        const price_s = five * six;
        const rebar_pie = trl / six;
        const cost = Math.round(rebar_pie) * price_s;

        // ✅ Return structured result
        param.tech_grid_len = grid_len;
        param.tech_grid_wid = grid_wid;
        param.tech_trl = trl;
        param.tech_rebar_pie = rebar_pie;
        param.tech_cost = cost;
        param.tech_price_s = price_s;
        return param;
      } else {
        return { error: "Please check your input" };
      }
    } catch (err) {
      return { error: err.message || "Something went wrong!" };
    }
  }

  async getCalculationPipeVolumeCalculator(body) {
    try {
      // Extract input values
      let {
        tech_inner_diameter,
        tech_inner_diameter_unit,
        tech_length,
        tech_length_unit,
        tech_density,
        tech_density_unit,
      } = body;

      let param = {};
      let val1, val2;
      function convert_inches2(unit, value) {
        if (unit == "cm") {
          val1 = value * 0.393701;
        } else if (unit == "m") {
          val1 = value * 39.3701;
        } else if (unit == "in") {
          val1 = value * 1;
        } else if (unit == "ft") {
          val1 = value * 12;
        } else if (unit == "yd") {
          val1 = value * 36;
        } else if (unit == "mm") {
          val1 = value * 0.0393701;
        }
        return val1;
      }
      function convert_unit2(unit2, value2) {
        if (unit2 == "kg/m³") {
          val2 = value2 * 0.000036127;
        } else if (unit2 == "kg/dm³") {
          val2 = value2 * 0.036127;
        } else if (unit2 == "kg/L") {
          val2 = value2 * 0.036127292;
        } else if (unit2 == "g/mL") {
          val2 = value2 * 0.036127292;
        } else if (unit2 == "g/cm³") {
          val2 = value2 * 0.036127292;
        } else if (unit2 == "oz/cu in") {
          val2 = value2 * 0.0625;
        } else if (unit2 == "lb/cu in") {
          val2 = value2 * 1;
        } else if (unit2 == "lb/cu ft") {
          val2 = value2 * 0.000578703704;
        } else if (unit2 == "lb/US gal") {
          val2 = value2 * 0.00432900433;
        } else if (unit2 == "g/L") {
          val2 = value2 * 0.00003612729;
        } else if (unit2 == "g/dL") {
          val2 = value2 * 0.00036127292;
        } else if (unit2 == "mg/L") {
          val2 = value2 * 3.6127292e-8;
        }
        return val2;
      }

      // ✅ Validation
      if (
        !isNaN(tech_inner_diameter) &&
        !isNaN(tech_length) &&
        !isNaN(tech_density)
      ) {
        if (tech_inner_diameter > 0 && tech_length > 0) {
          // Convert to inches
          const inv = convert_inches2(
            tech_inner_diameter_unit,
            Number(tech_inner_diameter)
          );
          const lnv = convert_inches2(tech_length_unit, Number(tech_length));

          // Compute volume and weight
          const k = inv / 2;
          const volume = 3.14159265 * k * k * lnv; // cubic inches
          const wv = convert_unit2(tech_density_unit, Number(tech_density));
          const weight = volume * wv;

          // ✅ Return structured response
          param.tech_volume = volume;
          param.tech_weight = weight;
          return param;
        } else {
          return { error: "Please! Enter Positive Value" };
        }
      } else {
        return { error: "Please! Check Your Input" };
      }
    } catch (err) {
      return { error: err.message || "Something went wrong!" };
    }
  }

  async getCalculationMsPlateWeightCalculator(body) {
    try {
      // Shape properties
      let st_type = body.tech_st_type;
      let st_shape = body.tech_st_shape;
      let quantity = body.tech_quantity;

      // Dimension properties
      let length = body.tech_length;
      let length_unit = body.tech_length_unit;
      let width = body.tech_width;
      let width_unit = body.tech_width_unit;
      let thickness = body.tech_thickness;
      let thickness_unit = body.tech_thickness_unit;
      let side = body.tech_side;
      let side_unit = body.tech_side_unit;
      let diameter = body.tech_diameter;
      let diameter_unit = body.tech_diameter_unit;

      // Area properties
      let area = body.tech_area;
      let area_unit = body.tech_area_unit;

      let param = {};
      let val3, ans;
      // ✅ Helper functions
      function centi(unit3, value3) {
        if (unit3 == "mm²") {
          val3 = value3 * 0.01;
        } else if (unit3 == "cm²") {
          val3 = value3 * 1;
        } else if (unit3 == "m²") {
          val3 = value3 * 10000;
        } else if (unit3 == "km²") {
          val3 = value3 * 10000000000;
        } else if (unit3 == "in²") {
          val3 = value3 * 6.452;
        } else if (unit3 == "ft²") {
          val3 = value3 * 929;
        } else if (unit3 == "yd²") {
          val3 = value3 * 8361;
        } else if (unit3 == "mi²") {
          val3 = value3 * 25899881103;
        }
        return val3;
      }
      function convert_to_cmeter(value, unit) {
        if (unit == "cm") {
          ans = value * 1;
        } else if (unit == "mm") {
          ans = value * 0.1;
        } else if (unit == "in") {
          ans = value * 2.54;
        } else if (unit == "ft") {
          ans = value * 30.58;
        } else if (unit == "yd") {
          ans = value * 91.44;
        } else if (unit == "m") {
          ans = value * 100;
        }
        return ans;
      }

      // ✅ Convert numeric safely
      const n = (v) => (isNaN(Number(v)) ? null : Number(v));

      // Assign numeric values
      const _st_type = n(st_type);
      const _st_shape = String(st_shape);
      const _length = n(length);
      const _width = n(width);
      const _thickness = n(thickness);
      const _side = n(side);
      const _diameter = n(diameter);
      const _area = n(area);
      const _quantity = n(quantity);

      let areaResult = 0,
        volume = 0,
        weight = 0;

      // ✅ Shape conditions
      if (_st_shape == "1") {
        if (_length > 0 && _width > 0 && _thickness > 0 && _quantity > 0) {
          const lv = convert_to_cmeter(_length, length_unit);
          const wv = convert_to_cmeter(_width, width_unit);
          const thv = convert_to_cmeter(_thickness, thickness_unit);
          areaResult = lv * wv;
          volume = thv * areaResult;
          weight = _quantity * _st_type * volume;
        } else {
          return { error: "Please! Enter Positive Value" };
        }
      } else if (_st_shape == "2") {
        if (_thickness > 0 && _side > 0 && _quantity > 0) {
          const areaValue = convert_to_cmeter(_side, side_unit) ** 2;
          const thv = convert_to_cmeter(_thickness, thickness_unit);
          volume = thv * areaValue;
          weight = _quantity * _st_type * volume;
          areaResult = areaValue;
        } else {
          return { error: "Please! Enter Positive Value" };
        }
      } else if (_st_shape == "3") {
        if (_thickness > 0 && _diameter > 0 && _quantity > 0) {
          const dv = convert_to_cmeter(_diameter, diameter_unit);
          const div = (dv / 2) ** 2;
          areaResult = div * 3.141592653;
          const thv = convert_to_cmeter(_thickness, thickness_unit);
          volume = thv * areaResult;
          weight = _quantity * _st_type * volume;
        } else {
          return { error: "Please! Enter Positive Value" };
        }
      } else if (_st_shape == "4") {
        if (_area > 0 && _thickness > 0 && _quantity > 0) {
          const areaValue = centi(area_unit, _area);
          const thv = convert_to_cmeter(_thickness, thickness_unit);
          volume = thv * areaValue;
          weight = _quantity * _st_type * volume;
          areaResult = areaValue;
        } else {
          return { error: "Please! Enter Positive Value" };
        }
      } else {
        return { error: "Invalid st_shape option" };
      }

      param.tech_area = areaResult;
      param.tech_volume = volume;
      param.tech_weight = weight;

      return { status: "success", payload: param };
    } catch (err) {
      return { status: "error", payload: { error: err.message } };
    }
  }

  async getCalculationPricePerSquareFootCalculator(body) {
    let calculate = body.tech_calculate;
    let pp = Number(body.tech_pp);
    let area_measure = Number(body.tech_area_measure);
    let area_measure_unit = body.tech_area_measure_unit;
    let pp1 = Number(body.tech_pp1);
    let area_measure1 = Number(body.tech_area_measure1);
    let area_measure_unit1 = body.tech_area_measure_unit1;
    let pp2 = Number(body.tech_pp2);
    let area_measure2 = Number(body.tech_area_measure2);
    let area_measure_unit2 = body.tech_area_measure_unit2;
    let compare = body.tech_compare;
    let compare2 = body.tech_compare2;
    let pp_unit = body.tech_pp_unit;
    let pp1_unit = body.tech_pp1_unit;
    let pp2_unit = body.tech_pp2_unit;

    // helper function for area conversion
    function unitconver(val1, val2) {
      if (val2 === "ft²") return val1 * 1;
      else if (val2 === "m²") return val1 * 10.764;
      else if (val2 === "in²") return val1 * 0.006944;
      else return val1 * 9; // default case
    }

    let param = {};

    try {
      let res, res1, res2;

      // Base calculation
      if (["1", "2", "3"].includes(calculate)) {
        if (!isNaN(pp) && !isNaN(area_measure)) {
          if (area_measure > 0) {
            let am = unitconver(area_measure, area_measure_unit);
            if (calculate === "1" || calculate === "2") res = pp / am;
            else if (calculate === "3") res = pp * am;

            param.tech_pp_unit = pp_unit;
          } else {
            param.error = "Square Footage must be greater than zero";
            return param;
          }
        } else {
          param.error = "Please! Check Input";
          return param;
        }
      }

      // Comparison 1
      if (compare === "2") {
        if (["1", "2", "3"].includes(calculate)) {
          if (!isNaN(pp1) && !isNaN(area_measure1)) {
            if (area_measure1 > 0) {
              let am1 = unitconver(area_measure1, area_measure_unit1);
              if (calculate === "1" || calculate === "2") res1 = pp1 / am1;
              else if (calculate === "3") res1 = pp1 * am1;

              param.tech_pp1_unit = pp1_unit;
              param.tech_res1 = res1;
              param.tech_compare = compare;
            } else {
              param.error = "Square Footage must be greater than zero";
              return param;
            }
          } else {
            param.error = "Please! Check Input";
            return param;
          }
        }
      }

      // Comparison 2
      if (compare2 === "2") {
        if (["1", "2", "3"].includes(calculate)) {
          if (!isNaN(pp2) && !isNaN(area_measure2)) {
            if (area_measure2 > 0) {
              let am2 = unitconver(area_measure2, area_measure_unit2);
              if (calculate === "1" || calculate === "2") res2 = pp2 / am2;
              else if (calculate === "3") res2 = pp2 * am2;

              param.tech_pp2_unit = pp2_unit;
              param.tech_res2 = res2;
              param.tech_compare2 = compare2;
            } else {
              param.error = "Square Footage must be greater than zero";
              return param;
            }
          } else {
            param.error = "Please! Check Input";
            return param;
          }
        }
      }

      param.tech_res = res;
      param.tech_calculate = calculate;
      return param;
    } catch (err) {
      return { error: err.message || "Unexpected Error" };
    }
  }

  async getCalculationMaterialCalculator(body) {
    const operations = body.tech_operations;
    const ex_drop = body.tech_ex_drop;
    const first = body.tech_first;
    const units1 = body.tech_units1;
    const second = body.tech_second;
    const units2 = body.tech_units2;
    const third = body.tech_third;
    const units3 = body.tech_units3;
    const four = body.tech_four;
    const units4 = body.tech_units4;
    const five = body.tech_five;
    const units5 = body.tech_units5;
    const six = body.tech_six;
    const units6 = body.tech_units6;
    const seven = body.tech_seven;
    const units7 = body.tech_units7;
    const currancy = body.tech_currancy;

    const param = {};
    let convert1;
    function feet(unit, value) {
      if (unit == "in") {
        return value; // Already in inches
      } else if (unit == "ft") {
        return value * 12; // Convert feet to inches
      } else if (unit == "cm") {
        return value * 0.3937; // Convert centimeters to inches
      } else if (unit == "m") {
        return value * 39.3701; // Convert meters to inches
      } else if (unit == "yd") {
        return value * 36; // Convert yards to inches
      } else {
        return "Invalid unit";
      }
    }
    function feet2(unit, value) {
      if (unit == "in³") {
        return value; // Already in inches
      } else if (unit == "ft³") {
        return value * 12; // Convert feet to inches
      } else if (unit == "cm³") {
        return value * 0.3937; // Convert centimeters to inches
      } else if (unit == "m³") {
        return value * 39.3701; // Convert meters to inches
      } else if (unit == "yd³") {
        return value * 36; // Convert yards to inches
      } else {
        return "Invalid unit";
      }
    }
    function lb(a, b) {
      if (a == "lb") {
        // dd(a,b);
        convert1 = b * 1;
      } else if (a == "t") {
        convert1 = b * 2000;
      } else if (a == "long t") {
        convert1 = b * 2240;
      } else if (a == "kg") {
        convert1 = b * 2.205;
      }
      return convert1;
    }

    // Clean currency symbols
    const cleanUnit6 = units6?.replace(currancy + " ", "");
    const cleanUnit7 = units7?.replace(currancy + " ", "");

    let area, volume, weight;

    // 🔹 Operation 1
    if (operations === "1") {
      if (!isNaN(first) && !isNaN(second) && !isNaN(third)) {
        const f1 = feet(units1, Number(first));
        const f2 = feet(units2, Number(second));
        const f3 = feet(units3, Number(third));

        area = f1 * f2;
        volume = area * f3;
        weight = ex_drop * (volume / 1728);

        param.tech_area = area;
        param.tech_volume = volume;
      } else {
        return { error: "Please! Check Your Input" };
      }
    }

    // 🔹 Operation 2
    else if (operations === "2") {
      if (!isNaN(third) && !isNaN(four)) {
        const f3 = feet(units3, Number(third));
        const f4 = feet(units4, Number(four));

        volume = f4 * f3;
        weight = ex_drop * (volume / 1728);

        param.tech_volume = volume;
      } else {
        return { error: "Please! Check Your Input" };
      }
    }

    // 🔹 Operation 3
    else if (operations === "3") {
      if (!isNaN(five)) {
        const f5 = feet2(units5, Number(five));
        volume = f5;
        weight = ex_drop * (volume / 1728);
      } else {
        return { error: "Please! Check Your Input" };
      }
    }

    // 🔹 Cost Mass Calculation
    if (!isNaN(six)) {
      const s6 = lb(cleanUnit6, Number(six));
      console.log(s6);
      param.tech_cost_mass = s6 * weight;
    }

    // 🔹 Cost Volume Calculation
    if (!isNaN(seven)) {
      const s7 = feet2(cleanUnit7, Number(seven));
      param.tech_cost_volume = volume * s7;
    }

    param.tech_weight = weight;

    return param;
  }

  async getCalculationRetainingWallCalculator(body) {
    let wall_length = body.tech_wall_length;
    let wall_length_unit = body.tech_wall_length_unit;
    let wall_height = body.tech_wall_height;
    let wall_height_unit = body.tech_wall_height_unit;
    let block_height = body.tech_block_height;
    let block_height_unit = body.tech_block_height_unit;
    let block_length = body.tech_block_length;
    let block_length_unit = body.tech_block_length_unit;
    let wall_block_price = body.tech_wall_block_price;
    let cap_height = body.tech_cap_height;
    let cap_height_unit = body.tech_cap_height_unit;
    let cap_length = body.tech_cap_length;
    let cap_length_unit = body.tech_cap_length_unit;
    let cap_block_price = body.tech_cap_block_price;
    let backfill_thickness = body.tech_backfill_thickness;
    let backfill_thickness_unit = body.tech_backfill_thickness_unit;
    let backfill_length = body.tech_backfill_length;
    let backfill_length_unit = body.tech_backfill_length_unit;
    let backfill_height = body.tech_backfill_height;
    let backfill_height_unit = body.tech_backfill_height_unit;
    let backfill_price = body.tech_backfill_price;
    let backfill_price_unit = body.tech_backfill_price_unit;
    let currancy = body.tech_currancy;

    const param = {};

    // Remove currency symbol
    const clean_backfill_price_unit = backfill_price_unit?.replace(
      currancy + " ",
      ""
    );

    // 🔹 Convert to meter
    function convert_to_meter(unit, value) {
      let ans = 0;
      if (unit == "cm") ans = value / 100;
      else if (unit == "m") ans = value;
      else if (unit == "in") ans = value / 39.37;
      else if (unit == "ft") ans = value / 3.281;
      else if (unit == "yd") ans = value / 1.094;
      else if (unit == "dm") ans = value / 10;
      return ans;
    }

    // 🔹 Convert to price unit (same as Laravel)
    function convert_to_price_unit(unit, value) {
      let ans = 0;
      if (unit == "dag") ans = value * 100;
      else if (unit == "lb") ans = value * 2.205;
      else if (unit == "kg") ans = value;
      else if (unit == "t") ans = value / 1000;
      else if (unit == "oz") ans = value * 35.274;
      else if (unit == "stone") ans = value / 6.35;
      else if (unit == "Us ton") ans = value / 907.2;
      else if (unit == "Long ton") ans = value / 1016;
      // ⚠️ Laravel returns nothing if unit doesn't match — we replicate that:
      else ans = 0;
      return ans;
    }

    if (
      !isNaN(wall_height) &&
      !isNaN(block_height) &&
      !isNaN(cap_length) &&
      !isNaN(backfill_thickness) &&
      !isNaN(backfill_height) &&
      !isNaN(backfill_length) &&
      !isNaN(backfill_price) &&
      !isNaN(block_length) &&
      !isNaN(cap_block_price) &&
      !isNaN(wall_block_price) &&
      !isNaN(wall_length)
    ) {
      const wall_height_m = convert_to_meter(
        wall_height_unit,
        Number(wall_height)
      );
      const block_height_m = convert_to_meter(
        block_height_unit,
        Number(block_height)
      );
      const wall_length_m = convert_to_meter(
        wall_length_unit,
        Number(wall_length)
      );
      const block_length_m = convert_to_meter(
        block_length_unit,
        Number(block_length)
      );
      const cap_length_m = convert_to_meter(
        cap_length_unit,
        Number(cap_length)
      );
      const backfill_thickness_m = convert_to_meter(
        backfill_thickness_unit,
        Number(backfill_thickness)
      );
      const backfill_length_m = convert_to_meter(
        backfill_length_unit,
        Number(backfill_length)
      );
      const backfill_height_m = convert_to_meter(
        backfill_height_unit,
        Number(backfill_height)
      );

      const block_rows = Math.ceil(wall_height_m / block_height_m);
      const block_columns = Math.ceil(wall_length_m / block_length_m);
      const blocks = block_columns * (block_rows - 1);
      const blocks_price = blocks * wall_block_price;

      const caps = wall_length_m / cap_length_m;
      const caps_price = caps * cap_block_price;

      const backfill_volume =
        backfill_thickness_m * backfill_length_m * backfill_height_m;
      const backfill_weight = 1346 * backfill_volume;

      // ✅ Match Laravel: invalid unit should make price 0
      const backfill_weight_unit = convert_to_price_unit(
        clean_backfill_price_unit,
        backfill_weight
      );
      const backfill_total_price =
        backfill_weight_unit > 0 ? backfill_weight_unit * backfill_price : 0;

      const total_cost = backfill_total_price + blocks_price + caps_price;

      param.tech_blocks = Math.ceil(blocks);
      param.tech_blocks_price = Math.ceil(blocks_price);
      param.tech_caps = Math.ceil(caps);
      param.tech_caps_price = Math.ceil(caps_price);
      param.tech_backfill_volume = Number(backfill_volume.toFixed(3));
      param.tech_backfill_weight = Math.ceil(backfill_weight);
      param.tech_backfill_total_price = Math.ceil(backfill_total_price);
      param.tech_total_cost = Math.ceil(total_cost);

      return param;
    } else {
      return { error: "Please! Check Your Input" };
    }
  }

  async getCalculationSquareyardsCalculator(body) {
    let first = body.tech_first;
    let unit1 = body.tech_unit1;
    let second = body.tech_second;
    let unit2 = body.tech_unit2;
    let third = body.tech_third;
    let unit3 = body.tech_unit3;
    let currancy = body.tech_currancy;

    const param = {};

    // Remove currency symbol (like "$ " etc.)
    unit3 = unit3?.replace(currancy + " ", "");

    // --- Convert length to centimeters ---
    function con_cm(a, b) {
      if (a === "mm") {
        return b / 10;
      } else if (a === "cm") {
        return b * 1;
      } else if (a === "m") {
        return b * 100;
      } else if (a === "in") {
        return b * 2.54;
      } else if (a === "ft") {
        return b * 30.48;
      } else if (a === "yd") {
        return b * 91.44;
      }
      return b;
    }

    // --- Convert area to square centimeters ---
    function con_cm_sq(a, b) {
      if (a === "mm²") {
        return b / 10;
      } else if (a === "cm²") {
        return b * 1;
      } else if (a === "dm") {
        return b * 10;
      } else if (a === "m²") {
        return b * 100;
      } else if (a === "km²") {
        return b * 100000;
      } else if (a === "in²") {
        return b * 2.54;
      } else if (a === "ft²") {
        return b * 30.48;
      } else if (a === "yd²") {
        return b * 91.44;
      } else if (a === "a") {
        return b * 1000000;
      } else if (a === "da") {
        return b * 1000;
      } else if (a === "ha") {
        return b * 100000000;
      } else if (a === "ac") {
        return b * 40468564.224;
      }
      return b;
    }

    // --- Validate numeric inputs ---
    if (!isNaN(first) && !isNaN(second) && !isNaN(third)) {
      first = con_cm(unit1, Number(first));
      second = con_cm(unit2, Number(second));
      third = con_cm_sq(unit3, Number(third));

      const yd_ans = first * second;
      const price = yd_ans * third;

      param.tech_yd_ans = yd_ans;
      param.tech_price = price;

      return param;
    } else {
      return { error: "Please! Check Your Input" };
    }
  }

  async getCalculationBrickCalculator(body) {
    const param = {};

    // Extract inputs
    let wall_type = body.tech_wall_type?.trim();
    let wall_length = Number(body.tech_wall_length);
    let wall_length_unit = body.tech_wall_length_unit?.trim();
    let wall_width = Number(body.tech_wall_width);
    let wall_width_unit = body.tech_wall_width_unit?.trim();
    let wall_height = Number(body.tech_wall_height);
    let wall_height_unit = body.tech_wall_height_unit?.trim();

    // Brick Fields
    let brick_type = body.tech_brick_type?.trim();
    let brick_wastage = Number(body.tech_brick_wastage);
    let mortar_joint_thickness = Number(body.tech_mortar_joint_thickness);
    let mortar_joint_thickness_unit =
      body.tech_mortar_joint_thickness_unit?.trim();
    let brick_length = Number(body.tech_brick_length);
    let brick_length_unit = body.tech_brick_length_unit?.trim();
    let brick_width = Number(body.tech_brick_width);
    let brick_width_unit = body.tech_brick_width_unit?.trim();
    let brick_height = Number(body.tech_brick_height);
    let brick_height_unit = body.tech_brick_height_unit?.trim();

    // Mortar Fields
    let with_motar = body.tech_with_motar?.trim();
    let wet_volume = Number(body.tech_wet_volume);
    let wet_volume_unit = body.tech_wet_volume_unit?.trim();
    let mortar_wastage = Number(body.tech_mortar_wastage);
    let mortar_ratio = body.tech_mortar_ratio?.trim();
    let bag_size = Number(body.tech_bag_size);
    let bag_size_unit = body.tech_bag_size_unit?.trim();

    // Cost Fields
    let price_per_brick = Number(body.tech_price_per_brick);
    let price_of_cement = Number(body.tech_price_of_cement);
    let price_sand_per_volume = Number(body.tech_price_sand_per_volume);
    let price_sand_volume_unit = body.tech_price_sand_volume_unit?.trim();
    let currancy = body.tech_currancy;

    // Remove currency symbol
    price_sand_volume_unit = price_sand_volume_unit?.replace(
      currancy + " ",
      ""
    );
    let ans;
    // ---------------------- Conversion Functions ----------------------
    function convert_to_meter(unit, value) {
      if (unit == "cm") {
        ans = value / 100;
      } else if (unit == "m") {
        ans = value;
      } else if (unit == "in") {
        ans = value / 39.37;
      } else if (unit == "ft") {
        ans = value / 3.281;
      } else if (unit == "yd") {
        ans = value / 1.094;
      } else if (unit == "dm") {
        ans = value / 10;
      } else if (unit == "mm") {
        ans = value / 1000;
      }
      return ans;
    }
    function convert_to_millimeter(unit, value) {
      if (unit == "cm") {
        ans = value * 10;
      } else if (unit == "m") {
        ans = value * 1000;
      } else if (unit == "in") {
        ans = value * 25.4;
      } else if (unit == "ft") {
        ans = value * 304.8;
      } else if (unit == "yd") {
        ans = value * 914.4;
      } else if (unit == "dm") {
        ans = value * 100;
      } else if (unit == "mm") {
        ans = value;
      }
      return ans;
    }
    function convert_to_kilo(unit, value) {
      if (unit == "g") {
        ans = value / 1000;
      } else if (unit == "lb") {
        ans = value / 2.205;
      } else if (unit == "t") {
        ans = value * 1000;
      } else if (unit == "stone") {
        ans = value * 6.35029;
      } else if (unit == "kg") {
        ans = value;
      }
      return ans;
    }
    function convert_to_meter_cube(unit, value) {
      if (unit == "cm³") {
        ans = value / 1000000;
      } else if (unit == "cu_ft") {
        ans = value / 35.315;
      } else if (unit == "cu_yd") {
        ans = value / 1.308;
      } else if (unit == "m³") {
        ans = value;
      }
      return ans;
    }

    // ---------------------- Validation ----------------------
    if (
      !isNaN(wall_width) &&
      !isNaN(mortar_joint_thickness) &&
      !isNaN(brick_width)
    ) {
      if (
        wall_length >= 0 &&
        wall_width >= 0 &&
        wall_height >= 0 &&
        mortar_joint_thickness >= 0 &&
        brick_wastage >= 0 &&
        brick_length >= 0 &&
        brick_width >= 0 &&
        brick_height >= 0 &&
        price_per_brick >= 0
      ) {
        // Convert wall & brick dimensions
        wall_length = convert_to_meter(wall_length_unit, wall_length);
        wall_width = convert_to_meter(wall_width_unit, wall_width);
        wall_height = convert_to_meter(wall_height_unit, wall_height);
        mortar_joint_thickness = convert_to_meter(
          mortar_joint_thickness_unit,
          mortar_joint_thickness
        );

        // Wall area
        const wall_area = wall_length * wall_height;

        // Brick conversion
        if (brick_type === "1" || brick_type === 1) {
          brick_length = convert_to_meter(brick_length_unit, brick_length);
          brick_height = convert_to_meter(brick_height_unit, brick_height);
          brick_width = convert_to_meter(brick_width_unit, brick_width);
        } else {
          const brick_array = brick_type.split("x");
          brick_length = convert_to_meter("in", Number(brick_array[0]));
          brick_height = convert_to_meter("in", Number(brick_array[1]));
        }

        // Brick area
        const brick_sum =
          (brick_length + mortar_joint_thickness) *
          (brick_height + mortar_joint_thickness);
        let no_of_bricks = Math.ceil(wall_area / brick_sum);
        const wastage = Math.ceil((brick_wastage * no_of_bricks) / 100);
        let no_of_bricks_with_wastage = Math.round(no_of_bricks + wastage);

        if (wall_type === "double") {
          no_of_bricks *= 2;
          no_of_bricks_with_wastage *= 2;
        }

        // Cost of bricks
        const cost_of_bricks = price_per_brick * no_of_bricks_with_wastage;

        // Without mortar
        if (with_motar === "no") {
          param.tech_wall_area = wall_area;
          param.tech_no_of_bricks = no_of_bricks;
          param.tech_no_of_bricks_with_wastage = no_of_bricks_with_wastage;
          param.tech_cost_of_bricks = cost_of_bricks;
          return param;
        }

        // With mortar
        else if (with_motar === "yes") {
          if (
            !isNaN(wet_volume) &&
            !isNaN(mortar_wastage) &&
            !isNaN(bag_size) &&
            !isNaN(price_of_cement) &&
            !isNaN(price_sand_per_volume)
          ) {
            if (
              wet_volume >= 0 &&
              mortar_wastage >= 0 &&
              bag_size >= 0 &&
              price_of_cement >= 0 &&
              price_sand_per_volume >= 0
            ) {
              // Mortar calculations
              wet_volume = convert_to_meter_cube(wet_volume_unit, wet_volume);
              const dry_volume = wet_volume + (52 * wet_volume) / 100;
              const dry_volume_wastage = (mortar_wastage * dry_volume) / 100;
              const dry_volume_with_wastage = dry_volume + dry_volume_wastage;

              // Mortar ratio
              const ratio = mortar_ratio.split(":").map(Number);
              const cement_ratio = ratio[0];
              const sand_ratio = ratio[1];
              const total_ratio = cement_ratio + sand_ratio;

              const volume_of_cement = Number(
                (
                  (dry_volume_with_wastage * cement_ratio) /
                  total_ratio
                ).toFixed(4)
              );
              const weight_of_cement = volume_of_cement * 1440;
              bag_size = convert_to_kilo(bag_size_unit, bag_size);
              const number_of_bags = Math.ceil(weight_of_cement / bag_size);

              const volume_of_sand = Number(
                ((dry_volume_with_wastage * sand_ratio) / total_ratio).toFixed(
                  4
                )
              );

              const sand_vol_converted = convert_to_meter_cube(
                price_sand_volume_unit,
                price_sand_per_volume
              );
              const price_of_sand = sand_vol_converted * volume_of_sand;
              const price_for_cement = number_of_bags * price_of_cement;
              const mortar_cost = price_for_cement + price_of_sand;

              const total_cost = cost_of_bricks + mortar_cost;

              // Results
              param.tech_wall_area = wall_area;
              param.tech_no_of_bricks = no_of_bricks;
              param.tech_no_of_bricks_with_wastage = no_of_bricks_with_wastage;
              param.tech_cost_of_bricks = cost_of_bricks;
              param.tech_dry_volume = dry_volume;
              param.tech_dry_volume_with_wastage = dry_volume_with_wastage;
              param.tech_volume_of_cement = volume_of_cement;
              param.tech_number_of_bags = number_of_bags;
              param.tech_volume_of_sand = volume_of_sand;
              param.tech_mortar_cost = mortar_cost;
              param.tech_total_cost = total_cost;

              return param;
            } else {
              return { error: "Please! Enter Positive Values" };
            }
          } else {
            return { error: "Please! Check Your Input" };
          }
        }
      } else {
        return { error: "Please! Enter Positive Values" };
      }
    } else {
      return { error: "Please! Check Your Input" };
    }
  }

  async getCalculationMetalRoofCostCalculator(body) {
    try {
      let type = body.tech_type;
      let r_length = body.tech_r_length;
      let rl_units = body.tech_rl_units;
      let r_width = body.tech_r_width;
      let rw_units = body.tech_rw_units;
      let roof_pitch = body.tech_roof_pitch;
      let p_length = body.tech_p_length;
      let pl_units = body.tech_pl_units;
      let p_width = body.tech_p_width;
      let pw_units = body.tech_pw_units;
      let cost = body.tech_cost;

      // Roof pitch conversion table
      const roofPitch = {
        "1:12": { value: 1.003 },
        "2:12": { value: 1.014 },
        "3:12": { value: 1.031 },
        "4:12": { value: 1.054 },
        "5:12": { value: 1.083 },
        "6:12": { value: 1.118 },
        "7:12": { value: 1.158 },
        "8:12": { value: 1.202 },
        "9:12": { value: 1.25 },
        "10:12": { value: 1.302 },
        "11:12": { value: 1.357 },
        "12:12": { value: 1.414 },
        "13:12": { value: 1.474 },
        "14:12": { value: 1.537 },
        "15:12": { value: 1.601 },
        "16:12": { value: 1.667 },
        "17:12": { value: 1.734 },
        "18:12": { value: 1.803 },
        "19:12": { value: 1.873 },
        "20:12": { value: 1.944 },
        "21:12": { value: 2.016 },
        "22:12": { value: 2.088 },
        "23:12": { value: 2.162 },
        "24:12": { value: 2.236 },
        "25:12": { value: 2.311 },
        "26:12": { value: 2.386 },
        "27:12": { value: 2.462 },
        "28:12": { value: 2.539 },
        "29:12": { value: 2.615 },
        "30:12": { value: 2.693 },
      };

      // Convert to feet based on unit
      const roofUnit = (input, unit) => {
        if (unit == "cm") return input * 0.03281;
        if (unit == "dm") return input * 0.3281;
        if (unit == "m") return input * 3.281;
        if (unit == "in") return input * 0.08333;
        if (unit == "yd") return input * 3;
        return input; // default case (already feet)
      };

      // Ensure numeric input
      if (
        !isNaN(r_length) &&
        !isNaN(r_width) &&
        !isNaN(p_length) &&
        !isNaN(p_width) &&
        !isNaN(cost)
      ) {
        // Convert all lengths/widths to feet
        if (rl_units) r_length = roofUnit(Number(r_length), rl_units);
        if (rw_units) r_width = roofUnit(Number(r_width), rw_units);
        if (pl_units) p_length = roofUnit(Number(p_length), pl_units);
        if (pw_units) p_width = roofUnit(Number(p_width), pw_units);

        let r_area, p_area, panel, expense, value;

        if (type == "yes") {
          // Without roof pitch
          r_area = r_length * r_width;
          p_area = p_length * p_width;
          panel = Math.round(r_area / p_area);
          expense = cost * panel;
        } else if (type === "no") {
          // With roof pitch
          const Detail = roofPitch[roof_pitch];
          if (!Detail) {
            return { error: "Invalid roof pitch option" };
          }
          value = Detail.value;
          r_area = r_length * r_width * value;
          p_area = p_length * p_width;
          panel = Math.round(r_area / p_area);
          expense = cost * panel;
        } else {
          return { error: "Invalid type value" };
        }

        // ✅ Final structured response
        const result = {
          tech_type: type,
          tech_r_length: r_length,
          tech_r_width: r_width,
          tech_p_length: p_length,
          tech_p_width: p_width,
          tech_cost: cost,
          tech_r_area: r_area,
          tech_p_area: p_area,
          tech_panel: panel,
          tech_expense: expense,
        };

        if (type == "no") {
          result.tech_roof_pitch = roof_pitch;
          result.tech_value = value;
        }

        return result;
      } else {
        return { error: "Please! Check Your Input" };
      }
    } catch (err) {
      return { error: "An unexpected error occurred", details: err.message };
    }
  }

  async getCalculationRoofReplacementCostCalculator(body) {
    try {
      const size1 = body.tech_size1;
      const size2 = body.tech_size2;
      const slop = body.tech_slop;
      const difficulty = body.tech_difficulty;
      const existing = body.tech_existing;
      const floor = body.tech_floor;
      const material = body.tech_material;
      const region = body.tech_region;

      // ✅ Validate numeric input
      if (isNaN(size1) || isNaN(size2)) {
        return { error: "Please! Check Your Inputs" };
      }

      // ✅ Prepare form data
      const formData = new URLSearchParams();
      formData.append("size1", size1);
      formData.append("device", "desk");
      formData.append("size2", size2);
      formData.append("material", material);
      formData.append("slop", slop);
      formData.append("difficulty", difficulty);
      formData.append("sky", "");
      formData.append("ridge", "");
      formData.append("floor", floor);
      formData.append("existing", existing);
      formData.append("region", region);

      // ✅ Make POST request with axios
      const response = await axios.post(
        "https://www.roofcalc.org/scripts/calc-widget-test.php",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Cookie: "PHPSESSID=9886c1db5ddcc7f383052a97e803ef26",
          },
          httpsAgent: new (
            await import("https")
          ).Agent({
            rejectUnauthorized: false, // ⚠️ Disable SSL verification like in PHP
          }),
          timeout: 10000, // 10 seconds timeout
        }
      );

      const data = response.data;

      // ✅ Extract all $ amounts using regex (like preg_match_all)
      const matches = data.match(/\$[0-9,]+/g);
      const result = matches || [];

      // ✅ Return structured output
      return {
        tech_result: result,
      };
    } catch (error) {
      // ✅ Error handling
      return {
        error: error.response
          ? `API Error: ${error.response.statusText}`
          : `Request Error: ${error.message}`,
      };
    }
  }

  async getCalculationSquareInchesCalculator(body) {
    let length = body.tech_length;
    let l_units = body.tech_l_units;
    let width = body.tech_width;
    let w_units = body.tech_w_units;
    let price = body.tech_price;

    // Convert to numbers where needed
    length = Number(length);
    width = Number(width);
    price = Number(price);

    // Helper function to convert to inches
    function squareToInches(value, unit) {
      if (unit == "ft") return value * 12;
      if (unit == "in") return value * 1;
      if (unit == "yd") return value * 36;
      if (unit == "cm") return value / 2.54;
      if (unit == "m") return value * 39.37;
      if (unit == "mi") return value / 1000;
      if (unit == "km") return value * 39370;
      if (unit == "mm") return value / 25.4; // Added mm conversion
      return NaN;
    }

    const param = {};

    if (!isNaN(length) && !isNaN(width)) {
      const lengthInches = squareToInches(length, l_units);
      const widthInches = squareToInches(width, w_units);

      if (isNaN(lengthInches) || isNaN(widthInches)) {
        param.error = "Invalid unit type";
        return param;
      }

      const square_inches = lengthInches * widthInches;
      param.tech_square_inches = square_inches;

      if (!isNaN(price)) {
        param.tech_cost = square_inches * price;
      }

      return param;
    } else {
      param.error = "Please! Check Your Inputs";
      return param;
    }
  }

  async getCalculationSodCalculator(body) {
    const method = body.tech_method;
    const length = body.tech_length;
    const length_unit = body.tech_length_unit;
    const width = body.tech_width;
    const width_unit = body.tech_width_unit;
    const area = body.tech_area;
    const area_unit = body.tech_area_unit;
    const price = body.tech_price;

    let param = {};

    // Helper function to round to significant figures
    function sigFig3(value, digits) {
      if (value === 0) return 0;
      const decimalPlaces =
        digits - Math.floor(Math.log10(Math.abs(value))) - 1;
      return Number(value.toFixed(decimalPlaces));
    }

    let total_area, rolls, pallets, acres;

    if (method === "lw" && !isNaN(length) && !isNaN(width)) {
      let l = Number(length);
      let w = Number(width);

      // ✅ Convert length units to feet
      if (length_unit == "cm") l = l / 30.48;
      else if (length_unit == "m") l = l / 0.3048;
      else if (length_unit == "km") l = l / 0.0003048;
      else if (length_unit == "in") l = l / 12;
      else if (length_unit == "yd") l = l / 0.33333;
      else if (length_unit == "mi") l = l / 0.0001894;

      // ✅ Convert width units to feet
      if (width_unit == "cm") w = w / 30.48;
      else if (width_unit == "m") w = w / 0.3048;
      else if (width_unit == "km") w = w / 0.0003048;
      else if (width_unit == "in") w = w / 12;
      else if (width_unit == "yd") w = w / 0.33333;
      else if (width_unit == "mi") w = w / 0.0001894;

      if (length_unit === "m" && width_unit === "m") {
        l = l * 0.3048;
        w = w * 0.3048;

        total_area = l * w;
        rolls = total_area + 1;
        pallets = total_area / 40;
        acres = total_area * 0.0001;
        param["tech_meter"] = "meter";
      } else {
        total_area = l * w;
        rolls = total_area / 10;
        pallets = total_area / 450;
        acres = total_area * 0.000022957;
      }
    } else if (method === "area" && !isNaN(area)) {
      let a = Number(area);

      // ✅ Area conversion to square feet
      if (area_unit == "km²") a = a / 0.0000000929;
      else if (area_unit == "yd²") a = a / 0.1111;
      else if (area_unit == "mi²") a = a / 0.00000003587;
      else if (area_unit == "a") a = a / 0.000929;
      else if (area_unit == "da") a = a / 0.0000929;
      else if (area_unit == "ha") a = a / 0.0001;
      else if (area_unit == "ac") a = a / 0.000022957;
      else if (area_unit == "soccer fields") a = a / 0.000013012;

      if (area_unit === "m²" || area_unit === "ha") {
        total_area = a;
        rolls = total_area;
        pallets = total_area / 40;
        acres = total_area * 0.0001;
        param["tech_meter"] = "meter";
      } else {
        total_area = a;
        rolls = total_area / 10;
        pallets = total_area / 450;
        acres = total_area * 0.000022957;
      }
    } else {
      param["error"] = "Please! Check Your Input";
      return param;
    }

    // ✅ Cost calculation
    if (!isNaN(price)) {
      const cost = price * rolls;
      const cost_ft2 = cost / total_area;
      param["tech_cost"] = cost.toFixed(2);
      param["tech_cost_ft2"] = cost_ft2.toFixed(2);
    }

    // ✅ Final results
    param["tech_total_area"] = Number(total_area).toLocaleString();
    param["tech_rolls"] = Number(rolls).toLocaleString();
    param["tech_pallets"] = pallets.toFixed(2);
    param["tech_acres"] = acres.toFixed(3);

    return param;
  }

  async getCalculationConcreteBlockCalculator(body) {
    const width = body.tech_width;
    const height = body.tech_height;
    const width_unit = body.tech_width_unit;
    const height_unit = body.tech_height_unit;
    const block_size = body.tech_block_size;
    const block_price = body.tech_block_price;

    let param = {};

    let w = Number(width);
    let h = Number(height);
    let price = Number(block_price);

    // ✅ Unit conversion for height
    if (height_unit) {
      if (height_unit == "cm") {
        h = h * 0.3937;
      } else if (height_unit == "mm") {
        h = h * 0.03937;
      } else if (height_unit == "m") {
        h = h * 39.37;
      } else if (height_unit == "in") {
        // Already inches
      } else if (height_unit == "ft") {
        h = h * 12;
      }
    }

    // ✅ Unit conversion for width
    if (width_unit) {
      if (width_unit == "cm") {
        w = w * 0.3937;
      } else if (width_unit == "mm") {
        w = w * 0.03937;
      } else if (width_unit == "m") {
        w = w * 39.37;
      } else if (width_unit == "in") {
        // Already inches
      } else if (width_unit == "ft") {
        w = w * 12;
      }
    }

    // ✅ Validation
    if (!isNaN(w) && !isNaN(h) && !isNaN(price)) {
      const wall_area = w * h;
      let block_area = 0;

      // ✅ Block size mapping
      if (block_size == "16x8") {
        block_area = 16 * 8;
      } else if (block_size == "8x8") {
        block_area = 8 * 8;
      } else if (block_size == "12x8") {
        block_area = 12 * 8;
      } else if (block_size == "8x4") {
        block_area = 8 * 4;
      } else if (block_size == "12x4") {
        block_area = 12 * 4;
      } else if (block_size == "16x4") {
        block_area = 16 * 4;
      } else {
        param["error"] = "Invalid block size.";
        return param;
      }

      // ✅ Calculations
      const blocks_needed = Math.round(wall_area / block_area);
      const total_block_cost = blocks_needed * price;
      const mortar_estimation = Math.ceil(blocks_needed / 100) * 3;

      // ✅ Assign results
      param["tech_wall_area"] = wall_area;
      param["tech_blocks_needed"] = blocks_needed;
      param["tech_total_block_cost"] = total_block_cost;
      param["tech_mortar_estimation"] = mortar_estimation;
    } else {
      param["error"] = "Please check input.";
      return param;
    }

    return param;
  }

  async getCalculationCarpetCalculator(body) {
    const shape = body.tech_shape;
    const length = body.tech_length;
    const length_unit = body.tech_length_unit;
    const width = body.tech_width;
    const width_unit = body.tech_width_unit;
    const radius = body.tech_radius;
    const radius_unit = body.tech_radius_unit;
    const axis_a = body.tech_axis_a;
    const axis_a_unit = body.tech_axis_a_unit;
    const axis_b = body.tech_axis_b;
    const axis_b_unit = body.tech_axis_b_unit;
    const side = body.tech_side;
    const side_unit = body.tech_side_unit;
    const sides = body.tech_sides;
    const sides_unit = body.tech_sides_unit;
    const carpet = body.tech_carpet;
    const carpet_unit = body.tech_carpet_unit;
    const price = body.tech_price;
    const price_unit = body.tech_price_unit;
    const currancy = body.tech_currancy;

    let param = {};

    // 🔹 Clean values
    let l = Number(length);
    let w = Number(width);
    let r = Number(radius);
    let a = Number(axis_a);
    let b = Number(axis_b);
    let s = Number(side);
    let ss = Number(sides);
    let c = Number(carpet);
    let p = Number(price);

    // 🔹 Remove currency symbol from price_unit
    let cleanPriceUnit = price_unit
      ? price_unit.replace(currancy + " ", "")
      : "";

    // 🔹 Unit conversion for carpet dimensions
    function carpetUnits(value, unit) {
      if (unit === "cm") {
        return value / 100;
      } else if (unit === "dm") {
        return value / 10;
      } else if (unit === "in") {
        return value * 0.0254;
      } else if (unit === "ft") {
        return value * 0.3048;
      } else if (unit === "yd") {
        return value * 0.9144;
      } else {
        return value; // assume meters
      }
    }

    // 🔹 Unit conversion for price
    function priceUnits(value, unit) {
      if (unit === "cm²") {
        return value / 10000;
      } else if (unit === "dm²") {
        return value / 100;
      } else if (unit === "in²") {
        return value / 1550.0031;
      } else if (unit === "ft²") {
        return value / 10.7639;
      } else if (unit === "yd²") {
        return value / 1.19599;
      } else {
        return value; // assume m²
      }
    }

    let answer = null;
    let sub_answer = null;

    // 🔹 Shape-based logic
    if (shape === "Rectangle") {
      if (isFinite(l) && isFinite(w) && isFinite(p)) {
        l = carpetUnits(l, length_unit);
        w = carpetUnits(w, width_unit);
        answer = l * w;
        sub_answer = answer * p;
      } else {
        param["error"] = "Please! Check Your Input";
        return param;
      }
    } else if (shape === "Circle") {
      if (isFinite(r) && isFinite(p)) {
        r = carpetUnits(r, radius_unit);
        answer = Math.PI * Math.pow(r, 2);
        sub_answer = answer * p;
      } else {
        param["error"] = "Please! Check Your Input";
        return param;
      }
    } else if (shape === "Ellipse") {
      if (isFinite(a) && isFinite(b) && isFinite(p)) {
        a = carpetUnits(a, axis_a_unit);
        b = carpetUnits(b, axis_b_unit);
        answer = a * b * Math.PI;
        sub_answer = answer * p;
      } else {
        param["error"] = "Please! Check Your Input";
        return param;
      }
    } else if (shape === "Pentagon") {
      if (isFinite(s) && isFinite(p)) {
        s = carpetUnits(s, side_unit);
        answer = (s * s * Math.sqrt(25 + 10 * Math.sqrt(5))) / 4;
        sub_answer = answer * p;
      } else {
        param["error"] = "Please! Check Your Input";
        return param;
      }
    } else if (shape === "Hexagon") {
      if (isFinite(ss) && isFinite(p)) {
        ss = carpetUnits(ss, sides_unit);
        answer = (3 / 2) * Math.sqrt(3) * Math.pow(ss, 2);
        sub_answer = answer * p;
      } else {
        param["error"] = "Please! Check Your Input";
        return param;
      }
    } else {
      if (isFinite(c) && isFinite(p)) {
        answer = priceUnits(c, carpet_unit);
        sub_answer = answer * p;
      } else {
        param["error"] = "Please! Check Your Input";
        return param;
      }
    }

    // ✅ Final response
    param["tech_answer"] = answer;
    param["tech_sub_answer"] = sub_answer;

    return param;
  }

  async getCalculationCylinderVolumeCalculator(body) {
    try {
      let f_height = body.tech_f_height;
      let f_height_units = body.tech_f_height_units;
      let f_radius = body.tech_f_radius;
      let f_radius_units = body.tech_f_radius_units;
      let s_height = body.tech_s_height;
      let s_height_units = body.tech_s_height_units;
      let external = body.tech_external;
      let external_units = body.tech_external_units;
      let internal = body.tech_internal;
      let internal_units = body.tech_internal_units;

      // Helper function: convert all to centimeters
      function convert_unit(unit, value) {
        if (!unit) return value;
        value = Number(value);

        switch (unit) {
          case "cm":
            return value;
          case "mm":
            return value / 0.1;
          case "m":
            return value * 100;
          case "km":
            return value * 100000;
          case "in":
            return value * 2.54;
          case "ft":
            return value * 30.48;
          case "yd":
            return value * 91.44;
          case "mi":
            return value * 160934.4;
          default:
            return value;
        }
      }

      // Validate all numeric inputs
      if (
        isNaN(f_height) ||
        isNaN(f_radius) ||
        isNaN(s_height) ||
        isNaN(external) ||
        isNaN(internal)
      ) {
        return { error: "Please! Check Your Input" };
      }

      // Convert units
      f_height = convert_unit(f_height_units, f_height);
      f_radius = convert_unit(f_radius_units, f_radius);
      s_height = convert_unit(s_height_units, s_height);
      external = convert_unit(external_units, external);
      internal = convert_unit(internal_units, internal);

      // Calculate volumes
      const vol1 = Math.PI * Math.pow(f_radius, 2) * f_height;
      const vol2 =
        (Math.PI * s_height * (Math.pow(external, 2) - Math.pow(internal, 2))) /
        4;

      return {
        tech_vol1: vol1,
        tech_vol2: vol2,
      };
    } catch (err) {
      return { error: "Server error occurred" };
    }
  }

  async getCalculationFramingCalculator(body) {
    try {
      let wall = body.tech_wall;
      let wall_unit = body.tech_wall_unit;
      let spacing = body.tech_spacing;
      let spacing_unit = body.tech_spacing_unit;
      let price = body.tech_price;
      let estimated = body.tech_estimated;

      // Helper function to convert to meters
      function framing_units(value, unit) {
        value = Number(value);
        switch (unit) {
          case "cm":
            return value / 100;
          case "dm":
            return value / 10;
          case "in":
            return value * 0.0254;
          case "ft":
            return value * 0.3048;
          case "yd":
            return value * 0.9144;
          case "m":
          default:
            return value;
        }
      }

      // Validate numeric inputs
      if (isNaN(wall) || isNaN(spacing) || isNaN(price) || isNaN(estimated)) {
        return { error: "Please! Check Your Input" };
      }

      // Convert units
      wall = framing_units(wall, wall_unit);
      spacing = framing_units(spacing, spacing_unit);

      // Prevent divide-by-zero
      if (spacing == 0) {
        return { error: "oc spacing cannot be equal to zero" };
      }

      // Calculations
      const answer = wall / spacing + 1; // number of studs
      const wastages = answer * (estimated / 100);
      const wastage = wastages * price;
      const studs = price * answer;
      const sub_answer = studs + wastage; // total cost including wastage

      return {
        tech_answer: answer,
        tech_sub_answer: sub_answer,
      };
    } catch (err) {
      return { error: "Server error occurred" };
    }
  }

  async getCalculationRoofingCalculator(body) {
    try {
      let length = body.tech_length;
      let length_units = body.tech_length_units;
      let width = body.tech_width;
      let width_units = body.tech_width_units;
      let pitch = body.tech_pitch;
      let price = body.tech_price;
      let price_units = body.tech_price_units;

      // Convert value to meters
      function conversion(unit, value) {
        value = Number(value);
        switch (unit) {
          case "cm":
            return value / 100;
          case "m":
            return value;
          case "in":
            return value * 0.0254;
          case "ft":
            return value * 0.3048;
          case "yd":
            return value * 0.9144;
          default:
            return value;
        }
      }

      // Convert price per area to price per m²
      if (price_units) {
        price = Number(price);
        switch (price_units) {
          case "m²":
            price = price;
            break;
          case "mm²":
            price /= 0.000001;
            break;
          case "cm²":
            price /= 0.0001;
            break;
          case "in²":
            price /= 0.00064516;
            break;
          case "ft²":
            price /= 0.09290304;
            break;
          case "yd²":
            price /= 0.83612736;
            break;
        }
      }

      // Validate inputs
      if (isNaN(length) || isNaN(width) || isNaN(pitch) || isNaN(price)) {
        return { error: "Please check input." };
      }

      // Convert units to meters
      length = conversion(length_units, length);
      width = conversion(width_units, width);

      // Core calculations
      const house_area = length * width;
      const slop = (pitch * 12) / 100;
      const pitch_rad = Math.atan(pitch / 100);
      const pitch_deg = (pitch_rad * 180) / Math.PI;
      const roof_area = house_area / Math.cos((pitch_deg * Math.PI) / 180);
      const cost = roof_area * price;

      // Return results
      return {
        tech_house_area: house_area,
        tech_slop: slop,
        tech_pitch_deg: pitch_deg,
        tech_roof_area: roof_area,
        tech_cost: cost,
      };
    } catch (err) {
      return { error: "Server error occurred" };
    }
  }

  async getCalculationDeckingCalculator(body) {
    let deck_length = body.tech_deck_length;
    let deck_length_unit = body.tech_deck_length_unit;
    let deck_width = body.tech_deck_width;
    let deck_width_unit = body.tech_deck_width_unit;
    let board_length = body.tech_board_length;
    let board_length_unit = body.tech_board_length_unit;
    let board_width = body.tech_board_width;
    let board_width_unit = body.tech_board_width_unit;
    let material = body.tech_material;
    let price = body.tech_price;
    let Cost = body.tech_Cost;

    // Trim all string inputs
    deck_length = deck_length?.toString().trim();
    deck_length_unit = deck_length_unit?.toString().trim();
    deck_width = deck_width?.toString().trim();
    deck_width_unit = deck_width_unit?.toString().trim();
    board_length = board_length?.toString().trim();
    board_length_unit = board_length_unit?.toString().trim();
    board_width = board_width?.toString().trim();
    board_width_unit = board_width_unit?.toString().trim();
    material = material?.toString().trim();
    price = price?.toString().trim();
    Cost = Cost?.toString().trim();

    // Convert to numbers
    deck_length = Number(deck_length);
    deck_width = Number(deck_width);
    board_length = Number(board_length);
    board_width = Number(board_width);
    price = Number(price);
    Cost = Number(Cost);

    // Helper function for unit conversion
    function unit_change(value, unit) {
      if (unit == "cm") {
        return value * 30.48;
      } else if (unit == "m") {
        return value / 3.28084;
      } else if (unit == "in") {
        return value * 12;
      } else if (unit == "ft") {
        return value;
      }
      return value;
    }

    const result = {};

    // Validate numeric inputs
    if (
      !isFinite(deck_length) ||
      !isFinite(deck_width) ||
      !isFinite(board_length) ||
      !isFinite(board_width) ||
      !isFinite(price) ||
      !isFinite(Cost)
    ) {
      result.error = "Please check your input";
      return result;
    }

    // Zero-value validations
    if (deck_length == 0) {
      result.error = "length value cannot be equal to zero";
      return result;
    }
    if (deck_width == 0) {
      result.error = "width value cannot be equal to zero";
      return result;
    }
    if (board_length == 0) {
      result.error = "length value cannot be equal to zero";
      return result;
    }
    if (board_width == 0) {
      result.error = "width value cannot be equal to zero";
      return result;
    }
    if (price == 0) {
      result.error = "price per board value cannot be equal to zero";
      return result;
    }
    if (Cost == 0) {
      result.error = "cost of fasteners value cannot be equal to zero";
      return result;
    }

    // Unit conversions
    deck_length = unit_change(deck_length, deck_length_unit);
    deck_width = unit_change(deck_width, deck_width_unit);
    board_length = unit_change(board_length, board_length_unit);
    board_width = unit_change(board_width, board_width_unit);

    // Calculations
    const size_deck = deck_length * deck_width; // ans 1
    const size_board = board_length * board_width; // ans 2
    const numbers = Math.round((size_deck / size_board) * 1.1); // ans 3
    const materialValue = size_deck / 100;
    const nails = materialValue * 350; // ans 4
    const clips = nails / 2; // ans 5
    const price_boards = numbers * price; // ans 6
    const Cost_boards = price_boards + Cost; // ans 7

    // Build response
    result.tech_size_deck = size_deck;
    result.tech_size_board = size_board;
    result.tech_numbers = numbers;
    result.tech_nails = nails;
    result.tech_clips = clips;
    result.tech_price_boards = price_boards;
    result.tech_Cost_boards = Cost_boards;

    return result;
  }

  async getCalculationSonotubeCalculator(body) {
    let size_unit = body.tech_size_unit;
    let height = body.tech_height;
    let height_unit = body.tech_height_unit;
    let quantity = body.tech_quantity;
    let concerete_mix_unit = body.tech_concerete_mix_unit;
    let density = body.tech_density;
    let density_unit = body.tech_density_unit;
    let concrete_ratio_unit = body.tech_concrete_ratio_unit;
    let bag_size = body.tech_bag_size;
    let bag_size_unit = body.tech_bag_size_unit;
    let waste = body.tech_waste;
    let Cost_bag_mix = body.tech_Cost_bag_mix;
    let Cost_of_cement = body.tech_Cost_of_cement;
    let Cost_of_cement_unit = body.tech_Cost_of_cement_unit;
    let Cost_of_sand = body.tech_Cost_of_sand;
    let Cost_of_sand_unit = body.tech_Cost_of_sand_unit;
    let Cost_of_gravel = body.tech_Cost_of_gravel;
    let Cost_of_gravel_unit = body.tech_Cost_of_gravel_unit;

    // Trim all inputs
    const trimVal = (v) => (typeof v === "string" ? v.trim() : v);
    size_unit = trimVal(size_unit);
    height = Number(trimVal(height));
    height_unit = trimVal(height_unit);
    quantity = Number(trimVal(quantity));
    concerete_mix_unit = trimVal(concerete_mix_unit);
    density = Number(trimVal(density));
    density_unit = trimVal(density_unit);
    concrete_ratio_unit = trimVal(concrete_ratio_unit);
    bag_size = Number(trimVal(bag_size));
    bag_size_unit = trimVal(bag_size_unit);
    waste = Number(trimVal(waste));
    Cost_bag_mix = Number(trimVal(Cost_bag_mix));
    Cost_of_cement = Number(trimVal(Cost_of_cement));
    Cost_of_cement_unit = trimVal(Cost_of_cement_unit);
    Cost_of_sand = Number(trimVal(Cost_of_sand));
    Cost_of_sand_unit = trimVal(Cost_of_sand_unit);
    Cost_of_gravel = Number(trimVal(Cost_of_gravel));
    Cost_of_gravel_unit = trimVal(Cost_of_gravel_unit);

    const result = {};

    // Size mapping
    const sizeMap = {
      "6 (15.24 cm)": 6 / 2,
      "8 (20.32 cm)": 8 / 2,
      "10 (25.40 cm)": 10 / 2,
      "12 (30.48 cm)": 12 / 2,
      "14 (35.56 cm)": 14 / 2,
      "16 (40.64 cm)": 16 / 2,
      "18 (45.72 cm)": 18 / 2,
      "20 (50.80 cm)": 20 / 2,
      "22 (55.88 cm)": 22 / 2,
      "24 (60.96 cm)": 24 / 2,
      "26 (66.04 cm)": 26 / 2,
      "28 (71.12 cm)": 28 / 2,
      "30 (76.20 cm)": 30 / 2,
      "32 (81.28 cm)": 32 / 2,
      "34 (86.36 cm)": 34 / 2,
      "36 (91.44 cm)": 36 / 2,
      "40 (101.60 cm)": 40 / 2,
      "42 (106.68 cm)": 42 / 2,
      "48 (121.91 cm)": 48 / 2,
      "54 (137.16 cm)": 54 / 2,
      "60 (152.40 cm)": 60 / 2,
    };
    const size = sizeMap[size_unit] ?? 0;

    // Helper conversions
    const section_height = (val, unit) => {
      if (unit === "cm") return val * 2.54;
      if (unit === "m") return val / 39.37;
      if (unit === "in") return val;
      if (unit === "ft") return val / 12;
      if (unit === "yd") return val / 36;
      return val;
    };

    const section_density = (val, unit) => {
      if (unit === "kg/m³") return val * 16.01846;
      if (unit === "lb/cu ft") return val;
      if (unit === "lb/cu yd") return val * 27;
      if (unit === "g/cm³") return val * 0.01601846;
      return val;
    };

    const section_bag_size = (val, unit) => {
      if (unit === "kg") return val;
      if (unit === "lb") return val * 2.205;
      return val;
    };

    const section_two = (val, unit) => {
      if (unit === "cm³") return val * 28320;
      if (unit === "m³") return val / 35.315;
      if (unit === "cu ft") return val;
      if (unit === "cu yd") return val / 27;
      return val;
    };

    // Input validation
    if (!isFinite(height) || !isFinite(quantity)) {
      return { error: "Please! Check Your Input" };
    }

    if (height === 0) return { error: "height value cannot be equal to zero" };
    if (quantity === 0)
      return { error: "quantity value cannot be equal to zero" };

    // Volume calculation
    const heightIn = section_height(height, height_unit);
    const radius = size * size;
    const volume = (Math.round(3.1415 * radius * heightIn) / 1728) * quantity;

    // CASE 1: Pre-mixed concrete bags
    if (concerete_mix_unit === "I'll get pre-mixed concrete bags") {
      if (
        !isFinite(density) ||
        !isFinite(bag_size) ||
        !isFinite(waste) ||
        !isFinite(Cost_bag_mix)
      ) {
        return { error: "Please! Check Your Input" };
      }
      if (density === 0)
        return { error: "concrete density value cannot be equal to zero" };
      if (bag_size === 0)
        return { error: "bag size value cannot be equal to zero" };
      if (waste === 0) return { error: "waste value cannot be equal to zero" };
      if (Cost_bag_mix === 0)
        return {
          error:
            "Cost of each bag of pre-mix concrete value cannot be equal to zero",
        };

      const densityz = section_density(density, density_unit);
      const weight = volume * densityz;
      const bagSize = section_bag_size(bag_size, bag_size_unit);
      const bagEffective = bagSize * (1 - waste / 100);
      const bags = Math.round(weight / 2.205 / bagEffective);
      const costTotal = Cost_bag_mix * bags;
      const perUnit = Number((costTotal / volume).toFixed(2));
      const costPerColumn = perUnit * volume;

      result.tech_weghits = weight;
      result.tech_bagsz = bags;
      result.tech_per_units = perUnit;
      result.tech_cost_per_colums = costPerColumn;
      result.tech_total_costz = costPerColumn;
    }

    // CASE 2: Manual concrete mix
    else {
      if (
        !isFinite(waste) ||
        !isFinite(Cost_of_cement) ||
        !isFinite(Cost_of_sand) ||
        !isFinite(Cost_of_gravel)
      ) {
        return { error: "Please! Check Your Input" };
      }

      if (waste === 0) return { error: "waste value cannot be equal to zero" };
      if (Cost_of_cement === 0)
        return {
          error: "cost of cement per volume value cannot be equal to zero",
        };
      if (Cost_of_sand === 0)
        return {
          error: "cost of sand per volume value cannot be equal to zero",
        };
      if (Cost_of_gravel === 0)
        return {
          error: "cost of gravel per volume value cannot be equal to zero",
        };

      const total_volume = volume * (1 + waste / 100);
      const value_cement = (total_volume * 1) / (size * 2);

      let ratio_of_sand = 0;
      let ratio_of_gravel = 0;

      if (concrete_ratio_unit === "1:5:10 (5.0 MPa or 725 psi)") {
        ratio_of_sand = 5;
        ratio_of_gravel = 10;
      } else if (concrete_ratio_unit === "1:4:8 (7.5 MPa or 1085 psi)") {
        ratio_of_sand = 4;
        ratio_of_gravel = 8;
      } else if (concrete_ratio_unit === "1:3:6 (10.0 MPa or 1450 psi)") {
        ratio_of_sand = 3;
        ratio_of_gravel = 6;
      } else if (concrete_ratio_unit === "1:2:4 (15.0 MPa or 2175 psi)") {
        ratio_of_sand = 2;
        ratio_of_gravel = 4;
      } else if (concrete_ratio_unit === "1:1.5:3 (20.0 MPa or 2900 psi)") {
        ratio_of_sand = 1.5;
        ratio_of_gravel = 3;
      }

      const value_sand = (total_volume * ratio_of_sand) / (size * 2);
      const value_gravel = (total_volume * ratio_of_gravel) / (size * 2);

      const cementCost =
        section_two(Cost_of_cement, Cost_of_cement_unit) * value_cement;
      const sandCost =
        section_two(Cost_of_sand, Cost_of_sand_unit) * value_sand;
      const gravelCost =
        section_two(Cost_of_gravel, Cost_of_gravel_unit) * value_gravel;
      const total_cost = cementCost + sandCost + gravelCost;

      result.tech_total_volume = total_volume;
      result.tech_value_cement = value_cement;
      result.tech_value_sand = value_sand;
      result.tech_value_gravel = value_gravel;
      result.tech_total_costszz = total_cost;
    }

    // Final output
    result.tech_volume = volume;
    return result;
  }

  async getCalculationGravelCalculator(body) {
    try {
      let from = body.tech_from;
      let to_calculate = body.tech_to_calculate;
      let length = body.tech_length;
      let l_unit = body.tech_l_unit;
      let volume = body.tech_volume;
      let v_unit = body.tech_v_unit;
      let width = body.tech_width;
      let w_unit = body.tech_w_unit;
      let area = body.tech_area;
      let a_unit = body.tech_a_unit;
      let depth = body.tech_depth;
      let d_unit = body.tech_d_unit;
      let density = body.tech_density;
      let dn_unit = body.tech_dn_unit;
      let price = body.tech_price;
      let p_unit = body.tech_p_unit;
      let currancy = body.tech_currancy;
      let diameter = body.tech_diameter;
      let dia_unit = body.tech_dia_unit;

      const param = {};

      // Clean price unit
      if (p_unit) p_unit = p_unit.replace(`${currancy} `, "");

      // ✅ Helper function for unit conversions
      const convertToFeet = (value, unit) => {
        if (unit === "in") return value / 12;
        if (unit === "yd") return value * 3;
        if (unit === "cm") return value / 30.48;
        if (unit === "m") return value * 3.28084;
        return value;
      };

      const convertDensity = (value, unit) => {
        if (unit === "lb/yd³") return value / 27;
        if (unit === "t/yd³") return value / 74.074;
        if (unit === "kg/m³") return value / 16.018;
        return value;
      };

      const convertPriceWeight = (weight, priceUnit) => {
        if (priceUnit === "kg") return weight / 2.205;
        if (priceUnit === "g") return weight * 453.59;
        if (priceUnit === "t") return weight / 2205;
        return weight;
      };

      // ===============================
      // 🟢 RECTANGULAR SECTION
      // ===============================
      if (from == "rec") {
        // ---- CASE 1: Length, Width, Depth ----
        if (to_calculate == "1") {
          if (isNaN(length) || isNaN(width) || isNaN(depth) || isNaN(density)) {
            param.error = "Please! Check Your Input";
            return param;
          }

          length = convertToFeet(length, l_unit);
          width = convertToFeet(width, w_unit);
          depth = convertToFeet(depth, d_unit);
          density = convertDensity(density, dn_unit);

          const area = +(length * width).toFixed(3);
          const volume = +(depth * area).toFixed(3);
          const weight = +(density * volume).toFixed(3);

          if (price) {
            let p_weight = convertPriceWeight(weight, p_unit);
            param.tech_price = +(p_weight * price).toFixed(3);
          }

          Object.assign(param, {
            tech_area: area,
            tech_weight: weight,
            tech_volume: volume,
          });
          return param;
        }

        // ---- CASE 2: Area, Depth ----
        if (to_calculate == "2") {
          if (isNaN(area) || isNaN(depth) || isNaN(density)) {
            param.error = "Please! Check Your Input";
            return param;
          }

          if (a_unit === "m²") area = area * 10.764;
          else if (a_unit === "yd²") area = area * 9;

          depth = convertToFeet(depth, d_unit);
          density = convertDensity(density, dn_unit);

          const volume = +(depth * area).toFixed(3);
          const weight = +(density * volume).toFixed(3);

          if (price) {
            let p_weight = convertPriceWeight(weight, p_unit);
            param.tech_price = +(p_weight * price).toFixed(3);
          }

          Object.assign(param, {
            tech_area: area,
            tech_weight: weight,
            tech_volume: volume,
          });
          return param;
        }

        // ---- CASE 3: Volume ----
        if (to_calculate == "3") {
          if (isNaN(volume) || isNaN(density)) {
            param.error = "Please! Check Your Input";
            return param;
          }

          if (v_unit === "m³") volume = volume * 35.315;
          else if (v_unit === "yd³") volume = volume * 27;

          density = convertDensity(density, dn_unit);
          const weight = +(density * volume).toFixed(3);

          if (price) {
            let p_weight = convertPriceWeight(weight, p_unit);
            param.tech_price = +(p_weight * price).toFixed(3);
          }

          Object.assign(param, {
            tech_weight: weight,
            tech_volume: volume,
          });
          return param;
        }
      }

      // ===============================
      // 🟢 CIRCULAR SECTION
      // ===============================
      else {
        if (isNaN(diameter) || isNaN(density)) {
          param.error = "Please! Check Your Input";
          return param;
        }

        diameter = convertToFeet(diameter, dia_unit);
        depth = convertToFeet(depth, d_unit);
        density = convertDensity(density, dn_unit);

        const area = Math.PI * Math.pow(diameter / 2, 2);
        const volume = +(depth * area).toFixed(3);
        const weight = +(density * volume).toFixed(3);

        if (price) {
          let p_weight = convertPriceWeight(weight, p_unit);
          param.tech_price = +(p_weight * price).toFixed(3);
        }

        Object.assign(param, {
          tech_area: area,
          tech_weight: weight,
          tech_volume: volume,
        });
        return param;
      }
    } catch (error) {
      return { error: "An unexpected error occurred", message: error.message };
    }
  }

  async getCalculationMulchCalculator(body) {
    try {
      const param = {};

      // Extract all values from body
      const m_shape = body["tech_m_shape"];
      const length = parseFloat(body.tech_length);
      const length_unit = body.tech_length1;
      const width = parseFloat(body.tech_width);
      const width_unit = body.tech_width1;
      const area = parseFloat(body["tech_sqr_ft"]);
      const area_unit = body["tech_sqr_ft1"];
      const depth = parseFloat(body.tech_depth);
      const depth_unit = body.tech_depth1;
      const bag_size = parseFloat(body.tech_bag_size);
      const bag_size1 = body.tech_bag_size1;
      const price_bag = parseFloat(body.tech_price_bag);
      const m_type = body["tech_m_type"];
      const check = body.tech_check;
      const g = body.tech_g;
      const diameter = parseFloat(body.tech_diameter);
      const diameter_unit = body.tech_diameter1;
      const side1 = parseFloat(body.tech_side1);
      const side1_unit = body.tech_side11;
      const side2 = parseFloat(body.tech_side2);
      const side2_unit = body.tech_side21;
      // Helper functions
      function isNumeric(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
      }

      function round(value, decimals) {
        return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
      }

      function convertToFeet(value, unit) {
        switch (unit) {
          case "in":
            return value / 12;
          case "yd":
            return value * 3;
          case "cm":
            return value / 30.48;
          case "m":
            return value * 3.281;
          case "ft":
          default:
            return value;
        }
      }

      function convertToInches(value, unit) {
        switch (unit) {
          case "ft":
            return value * 12;
          case "yd":
            return value * 36;
          case "cm":
            return value / 2.54;
          case "m":
            return value * 39.37;
          case "in":
          default:
            return value;
        }
      }

      function convertBagSize(bagSize, unit) {
        switch (unit) {
          case "m³":
            return bagSize * 35.315;
          case "cu yd":
            return bagSize * 27;
          case "liters":
            return bagSize / 28.317;
          case "cu ft":
          default:
            return bagSize;
        }
      }

      // Rectangle/Square shape
      if (m_shape === "0") {
        // Using length and width
        if (check === "g1_value" || g === "g1") {
          if (isNumeric(length) && isNumeric(width) && isNumeric(depth)) {
            let convertedLength = convertToFeet(length, length_unit);
            let convertedWidth = convertToFeet(width, width_unit);
            let convertedDepth = convertToInches(depth, depth_unit);

            const garden_size = convertedLength * convertedWidth;
            const cubic_yards =
              (convertedLength * convertedWidth * convertedDepth) / 324;
            const cubic_ft = cubic_yards * 27;
            const cubic_meters = cubic_yards / 1.308;
            const liters = cubic_meters * 1000;

            // Calculate bags needed
            if (isNumeric(bag_size)) {
              let convertedBagSize = convertBagSize(bag_size, bag_size1);
              const size = cubic_ft / convertedBagSize;
              param.tech_size = round(size, 2);

              if (isNumeric(price_bag)) {
                const total_cost = price_bag * size;
                param.tech_total_cost = round(total_cost, 2);
              }
            }

            // Calculate based on mulch type
            if (m_type === "6") {
              const size1 = (garden_size / 235) * convertedDepth * 2;
              param.tech_size1 = round(size1, 2);
              if (isNumeric(price_bag)) {
                const total_cost1 = price_bag * size1;
                param.tech_total_cost1 = round(total_cost1, 2);
              }
            }

            if (m_type === "10") {
              const size1 = (garden_size / 235) * convertedDepth;
              param.tech_size1 = round(size1, 2);
              if (isNumeric(price_bag)) {
                const total_cost1 = price_bag * size1;
                param.tech_total_cost1 = round(total_cost1, 2);
              }
            }

            param.tech_garden_size = round(garden_size, 2);
            param.tech_cubic_yards = round(cubic_yards, 2);
            param.tech_cubic_ft = round(cubic_ft, 2);
            param.tech_cubic_meters = round(cubic_meters, 2);
            param.tech_liters = round(liters, 2);

            return param;
          } else {
            param.error = "Please! Check Your Input";
            return param;
          }
        }
        // Using area directly
        else {
          if (isNumeric(area) && isNumeric(depth)) {
            let convertedArea = area;

            if (area_unit === "acres") {
              area = area * 43560;
            }

            let convertedDepth = depth;

            const cubic_yards = (convertedArea * convertedDepth) / 324;
            const cubic_ft = cubic_yards * 27;
            const cubic_meters = cubic_yards / 1.308;
            const liters = cubic_meters * 1000;

            // Calculate bags needed
            if (isNumeric(bag_size)) {
              let convertedBagSize = convertBagSize(bag_size, bag_size1);
              const size = cubic_ft / convertedBagSize;
              param.tech_size = round(size, 2);

              if (isNumeric(price_bag)) {
                const total_cost = price_bag * size;
                param.tech_total_cost = round(total_cost, 2);
              }
            }

            // Calculate based on mulch type
            if (m_type === "6") {
              const size1 = (convertedArea / 235) * convertedDepth * 2;
              param.tech_size1 = round(size1, 2);
              if (isNumeric(price_bag)) {
                const total_cost1 = price_bag * size1;
                param.tech_total_cost1 = round(total_cost1, 2);
              }
            }

            if (m_type === "10") {
              const size1 = (convertedArea / 235) * convertedDepth;
              param.tech_size1 = round(size1, 2);
              if (isNumeric(price_bag)) {
                const total_cost1 = price_bag * size1;
                param.tech_total_cost1 = round(total_cost1, 2);
              }
            }

            param.tech_garden_size = round(convertedArea, 2);
            param.tech_cubic_yards = round(cubic_yards, 2);
            param.tech_cubic_ft = round(cubic_ft, 2);
            param.tech_cubic_meters = round(cubic_meters, 2);
            param.tech_liters = round(liters, 2);
            return param;
          } else {
            param.error = "Please! Check Your Input";
            return param;
          }
        }
      }
      // Circle shape
      else if (m_shape === "1") {
        if (isNumeric(diameter) && isNumeric(depth)) {
          let convertedDiameter = convertToFeet(diameter, diameter_unit);
          let convertedDepth = convertToInches(depth, depth_unit);

          const radius = convertedDiameter * 0.5;
          const garden_size = radius * radius * 3.1452;
          const cubic_yards = ((convertedDepth / 12) * garden_size) / 27;
          const cubic_ft = cubic_yards * 27;
          const cubic_meters = cubic_yards / 1.308;
          const liters = cubic_meters * 1000;

          // Calculate bags needed
          if (isNumeric(bag_size)) {
            let convertedBagSize = convertBagSize(bag_size, bag_size1);
            const size = cubic_ft / convertedBagSize;
            param.tech_size = round(size, 2);

            if (isNumeric(price_bag)) {
              const total_cost = price_bag * size;
              param.tech_total_cost = round(total_cost, 2);
            }
          }

          // Calculate based on mulch type
          if (m_type === "6") {
            const size1 = (garden_size / 235) * convertedDepth * 2;
            param.size1 = round(size1, 2);
            if (isNumeric(price_bag)) {
              const total_cost1 = price_bag * size1;
              param.tech_total_cost1 = round(total_cost1, 2);
            }
          }

          if (m_type === "10") {
            const size1 = (garden_size / 235) * convertedDepth;
            param.tech_size1 = round(size1, 2);
            if (isNumeric(price_bag)) {
              const total_cost1 = price_bag * size1;
              param.tech_total_cost1 = round(total_cost1, 2);
            }
          }

          param.tech_garden_size = round(garden_size, 0);
          param.tech_cubic_yards = round(cubic_yards, 2);
          param.tech_cubic_ft = round(cubic_ft, 2);
          param.tech_cubic_meters = round(cubic_meters, 2);
          param.tech_liters = round(liters, 2);
          return param;
        } else {
          param.error = "Please! Check Your Input";
          return param;
        }
      }
      // Triangle shape
      else if (m_shape === "2") {
        if (isNumeric(side1) && isNumeric(side2) && isNumeric(depth)) {
          let convertedSide1 = convertToFeet(side1, side1_unit);
          let convertedSide2 = convertToFeet(side2, side2_unit);
          let convertedDepth = convertToInches(depth, depth_unit);

          const garden_size = convertedSide1 * convertedSide2 * 0.5;
          const cubic_yards = ((convertedDepth / 12) * garden_size) / 27;
          const cubic_ft = cubic_yards * 27;
          const cubic_meters = cubic_yards / 1.308;
          const liters = cubic_meters * 1000;

          // Calculate bags needed
          if (isNumeric(bag_size)) {
            let convertedBagSize = convertBagSize(bag_size, bag_size1);
            const size = cubic_ft / convertedBagSize;
            param.tech_size = round(size, 2);

            if (isNumeric(price_bag)) {
              const total_cost = price_bag * size;
              param.tech_total_cost = round(total_cost, 2);
            }
          }

          // Calculate based on mulch type
          if (m_type === "6") {
            const size1 = (garden_size / 235) * convertedDepth * 2;
            param.tech_size1 = round(size1, 2);
            if (isNumeric(price_bag)) {
              const total_cost1 = price_bag * size1;
              param.tech_total_cost1 = round(total_cost1, 2);
            }
          }

          if (m_type === "10") {
            const size1 = (garden_size / 235) * convertedDepth;
            param.tech_size1 = round(size1, 2);
            if (isNumeric(price_bag)) {
              const total_cost1 = price_bag * size1;
              param.tech_total_cost1 = round(total_cost1, 2);
            }
          }

          param.tech_garden_size = round(garden_size, 2);
          param.tech_cubic_yards = round(cubic_yards, 2);
          param.tech_cubic_ft = round(cubic_ft, 2);
          param.tech_cubic_meters = round(cubic_meters, 2);
          param.tech_liters = round(liters, 2);

          return param;
        } else {
          param.error = "Please! Check Your Input";
          return param;
        }
      }

      param.error = "Invalid shape selected";
      return param;
    } catch (error) {
      console.error("Error in mulch calculation:", error);
      return { error: "An error occurred during calculation" };
    }
  }

  async getCalculationSandCalculator(body) {
    let length = parseFloat(body.tech_length);
    let length_unit = body.tech_length_unit;
    let width = parseFloat(body.tech_width);
    let width_unit = body.tech_width_unit;
    let area = parseFloat(body.tech_area);
    let area_unit = body.tech_area_unit;
    let depth = parseFloat(body.tech_depth);
    let depth_unit = body.tech_depth_unit;
    let volume = parseFloat(body.tech_volume);
    let volume_unit = body.tech_volume_unit;
    let density = parseFloat(body.tech_density);
    let density_unit = body.tech_density_unit;
    let mass_price = parseFloat(body.tech_mass_price);
    let mass_price_unit = body.tech_mass_price_unit;
    let volume_price = parseFloat(body.tech_volume_price);
    let volume_price_unit = body.tech_volume_price_unit;
    const shape = body.tech_shape;
    let g = body.tech_g;
    let diameter = parseFloat(body.tech_diameter);
    let diameter_unit = body.tech_diameter_unit;
    let c_price = parseFloat(body.tech_c_price);
    const hiddencurrancy = body.tech_hiddencurrancy || "";

    let param = {};

    // Area unit conversions
    if (area_unit === "mm²") {
      area_unit = "mm2";
    } else if (area_unit === "cm²") {
      area_unit = "cm2";
    } else if (area_unit === "m²") {
      area_unit = "m2";
    } else if (area_unit === "in²") {
      area_unit = "in2";
    } else if (area_unit === "ft²") {
      area_unit = "ft2";
    } else if (area_unit === "yd²") {
      area_unit = "yd2";
    } else if (area_unit === "hectares") {
      area_unit = "ha";
    } else if (area_unit === "acres") {
      area_unit = "ac";
    } else if (area_unit === "soccer fields") {
      area_unit = "sf";
    }

    // Volume unit conversions
    if (volume_unit === "mm³") {
      volume_unit = "mm3";
    } else if (volume_unit === "cm³") {
      volume_unit = "cm3";
    } else if (volume_unit === "m³") {
      volume_unit = "m3";
    } else if (volume_unit === "in³") {
      volume_unit = "in3";
    } else if (volume_unit === "ft³") {
      volume_unit = "ft3";
    } else if (volume_unit === "yd³") {
      volume_unit = "yd3";
    }

    // Density unit conversions
    if (density_unit === "kg/m³") {
      density_unit = "kg_m3";
    } else if (density_unit === "t/m³") {
      density_unit = "t_m3";
    } else if (density_unit === "g/cm³") {
      density_unit = "g_cm3";
    } else if (density_unit === "oz/in³") {
      density_unit = "oz_in3";
    } else if (density_unit === "lb/in³") {
      density_unit = "lb_in3";
    } else if (density_unit === "lb/ft³") {
      density_unit = "lb_ft3";
    } else if (density_unit === "lb/yd³") {
      density_unit = "lb_yd3";
    }

    // Mass price unit conversions
    if (mass_price_unit === hiddencurrancy + "µg") {
      mass_price_unit = "ug";
    } else if (mass_price_unit === hiddencurrancy + "mg") {
      mass_price_unit = "mg";
    } else if (mass_price_unit === hiddencurrancy + "g") {
      mass_price_unit = "g";
    } else if (mass_price_unit === hiddencurrancy + "kg") {
      mass_price_unit = "kg";
    } else if (mass_price_unit === hiddencurrancy + "t") {
      mass_price_unit = "t";
    } else if (mass_price_unit === hiddencurrancy + "lb") {
      mass_price_unit = "lb";
    } else if (mass_price_unit === hiddencurrancy + "stone") {
      mass_price_unit = "stone";
    } else if (mass_price_unit === hiddencurrancy + "US ton") {
      mass_price_unit = "us_ton";
    } else if (mass_price_unit === hiddencurrancy + "Long ton") {
      mass_price_unit = "long_ton";
    }

    // Volume price unit conversions
    if (volume_price_unit === hiddencurrancy + "mm³") {
      volume_price_unit = "mm3";
    } else if (volume_price_unit === hiddencurrancy + "cm³") {
      volume_price_unit = "cm3";
    } else if (volume_price_unit === hiddencurrancy + "m³") {
      volume_price_unit = "m3";
    } else if (volume_price_unit === hiddencurrancy + "in³") {
      volume_price_unit = "in3";
    } else if (volume_price_unit === hiddencurrancy + "ft³") {
      volume_price_unit = "ft3";
    } else if (volume_price_unit === hiddencurrancy + "yd³") {
      volume_price_unit = "yd3";
    }

    // Rectangle Shape
    if (shape === "0") {
      // Method 1
      if (g === "g1") {
        if (
          !isNaN(length) &&
          !isNaN(width) &&
          !isNaN(depth) &&
          !isNaN(density)
        ) {
          // Conversion of length units in feet
          if (length_unit === "mm") {
            length = length / 305;
          }
          if (length_unit === "cm") {
            length = length / 30.48;
          }
          if (length_unit === "m") {
            length = length * 3.281;
          }
          if (length_unit === "in") {
            length = length / 12;
          }
          if (length_unit === "yd") {
            length = length * 3;
          }

          // Conversion of width units in feet
          if (width_unit === "mm") {
            width = width / 305;
          }
          if (width_unit === "cm") {
            width = width / 30.48;
          }
          if (width_unit === "m") {
            width = width * 3.281;
          }
          if (width_unit === "in") {
            width = width / 12;
          }
          if (width_unit === "yd") {
            width = width * 3;
          }

          // Conversion of depth units in feet
          if (depth_unit === "in") {
            depth = depth / 12;
          }
          if (depth_unit === "yd") {
            depth = depth * 3;
          }
          if (depth_unit === "cm") {
            depth = depth / 30.48;
          }
          if (depth_unit === "m") {
            depth = depth * 3.281;
          }

          // Conversion of density units in pound/cubic feet
          if (density_unit === "kg_m3") {
            density = density * 0.062428;
          }
          if (density_unit === "t_m3" || density_unit === "g_cm3") {
            density = density * 62.428;
          }
          if (density_unit === "oz_in3") {
            density = density * 108;
          }
          if (density_unit === "lb_in3") {
            density = density * 1728;
          }
          if (density_unit === "lb_yd3") {
            density = density * 0.037037;
          }

          // Calculation
          area = length * width;
          volume = area * depth;
          let weight = volume * density;
          weight = weight * 0.000453592;

          // Conversion of volume units for display
          const mm3 = volume * 28316847;
          const cm3 = volume * 28316.85;
          const m3 = volume * 0.02831685;
          const in3 = volume * 1728;
          const yd3 = volume * 0.037037;

          // Conversion of weight units for display
          const grams = weight * 1000000;
          const kg = weight * 1000;
          const oz = weight * 35273.96;
          const lb = weight * 2204.623;
          const stone = weight * 157.473;
          const us_ton = weight * 1.102311;
          const long_ton = weight * 0.984207;

          param = {
            tech_mm3: Math.round(mm3 * 100) / 100,
            tech_cm3: Math.round(cm3 * 100) / 100,
            tech_m3: Math.round(m3 * 100) / 100,
            tech_in3: Math.round(in3 * 100) / 100,
            tech_yd3: Math.round(yd3 * 100) / 100,
            tech_g: Math.round(grams * 100) / 100,
            tech_kg: Math.round(kg * 100) / 100,
            tech_oz: Math.round(oz * 100) / 100,
            tech_lb: Math.round(lb * 100) / 100,
            tech_stone: Math.round(stone * 100) / 100,
            tech_us_ton: Math.round(us_ton * 100) / 100,
            tech_long_ton: Math.round(long_ton * 100) / 100,
            tech_volume: Math.round(volume * 10000) / 10000,
            tech_weight: Math.round(weight * 10000) / 10000,
          };

          if (!isNaN(mass_price) && mass_price > 0) {
            let adjusted_mass_price = mass_price;

            if (mass_price_unit === "ug") {
              adjusted_mass_price = mass_price * 1000000000000;
            }
            if (mass_price_unit === "mg") {
              adjusted_mass_price = mass_price * 1000000000;
            }
            if (mass_price_unit === "g") {
              adjusted_mass_price = mass_price * 1000000;
            }
            if (mass_price_unit === "dag") {
              adjusted_mass_price = mass_price * 100000;
            }
            if (mass_price_unit === "kg") {
              adjusted_mass_price = mass_price * 1000;
            }
            if (mass_price_unit === "gr") {
              adjusted_mass_price = mass_price * 15432358.35;
            }
            if (mass_price_unit === "dr") {
              adjusted_mass_price = mass_price * 564383.39;
            }
            if (mass_price_unit === "oz") {
              adjusted_mass_price = mass_price * 35273.96;
            }
            if (mass_price_unit === "lb") {
              adjusted_mass_price = mass_price * 2204.62;
            }
            if (mass_price_unit === "stone") {
              adjusted_mass_price = mass_price * 157.47;
            }
            if (mass_price_unit === "us_ton") {
              adjusted_mass_price = mass_price * 1.1;
            }
            if (mass_price_unit === "long_ton") {
              adjusted_mass_price = mass_price / 0.98;
            }

            const cost = adjusted_mass_price * weight;
            param.tech_cost = Math.round(cost * 100) / 100;
          }

          // Conversion of volume price units in feet
          if (!isNaN(volume_price) && volume_price > 0) {
            let adjusted_volume_price = volume_price;

            if (volume_price_unit === "mm3") {
              adjusted_volume_price = volume_price * 764554857.98;
            }
            if (volume_price_unit === "cm3") {
              adjusted_volume_price = volume_price * 764554.86;
            }
            if (volume_price_unit === "m3") {
              adjusted_volume_price = volume_price * 0.76;
            }
            if (volume_price_unit === "in3") {
              adjusted_volume_price = volume_price * 46656;
            }
            if (volume_price_unit === "yd3") {
              adjusted_volume_price = volume_price * 27;
            }

            const adjusted_weight = weight / 1.22;
            const cost = adjusted_volume_price * adjusted_weight;
            param.tech_cost = Math.round(cost * 100) / 100;
          }

          console.log(param);
          return param;
        } else {
          param.error = "please check your inputs...";
          return param;
        }
      }
      // Method 2
      else if (g === "g2") {
        if (!isNaN(area) && !isNaN(depth) && !isNaN(density)) {
          // Conversion of area units in square feet
          if (area_unit === "mm2") {
            area = area * 0.0000107639;
          }
          if (area_unit === "cm2") {
            area = area * 0.00107639;
          }
          if (area_unit === "m2") {
            area = area * 10.7639;
          }
          if (area_unit === "in2") {
            area = area * 0.00694444;
          }
          if (area_unit === "yd2") {
            area = area * 9;
          }
          if (area_unit === "ha") {
            area = area * 107639;
          }
          if (area_unit === "ac") {
            area = area * 43560;
          }
          if (area_unit === "sf") {
            area = area * 76854.3;
          }

          // Conversion of depth units in feet
          if (depth_unit === "in") {
            depth = depth / 12;
          }
          if (depth_unit === "yd") {
            depth = depth * 3;
          }
          if (depth_unit === "cm") {
            depth = depth / 30.48;
          }
          if (depth_unit === "m") {
            depth = depth * 3.281;
          }

          // Conversion of density units in pound/cubic feet
          if (density_unit === "kg_m3") {
            density = density * 0.062428;
          }
          if (density_unit === "t_m3" || density_unit === "g_cm3") {
            density = density * 62.428;
          }
          if (density_unit === "oz_in3") {
            density = density * 108;
          }
          if (density_unit === "lb_in3") {
            density = density * 1728;
          }
          if (density_unit === "lb_yd3") {
            density = density * 0.037037;
          }

          // Calculation
          volume = area * depth;
          let weight = volume * density;
          weight = weight * 0.000453592;

          // Conversion of volume units for display
          const mm3 = volume * 28316847;
          const cm3 = volume * 28316.85;
          const m3 = volume * 0.02831685;
          const in3 = volume * 1728;
          const yd3 = volume * 0.037037;

          // Conversion of weight units for display
          const grams = weight * 1000000;
          const kg = weight * 1000;
          const oz = weight * 35273.96;
          const lb = weight * 2204.623;
          const stone = weight * 157.473;
          const us_ton = weight * 1.102311;
          const long_ton = weight * 0.984207;

          param = {
            tech_mm3: Math.round(mm3 * 100) / 100,
            tech_cm3: Math.round(cm3 * 100) / 100,
            tech_m3: Math.round(m3 * 100) / 100,
            tech_in3: Math.round(in3 * 100) / 100,
            tech_yd3: Math.round(yd3 * 100) / 100,
            tech_g: Math.round(grams * 100) / 100,
            tech_kg: Math.round(kg * 100) / 100,
            tech_oz: Math.round(oz * 100) / 100,
            tech_lb: Math.round(lb * 100) / 100,
            tech_stone: Math.round(stone * 100) / 100,
            tech_us_ton: Math.round(us_ton * 100) / 100,
            tech_long_ton: Math.round(long_ton * 100) / 100,
            tech_volume: Math.round(volume * 10000) / 10000,
            tech_weight: Math.round(weight * 10000) / 10000,
          };

          if (!isNaN(mass_price) && mass_price > 0) {
            let adjusted_mass_price = mass_price;

            if (mass_price_unit === "ug") {
              adjusted_mass_price = mass_price * 1000000000000;
            }
            if (mass_price_unit === "mg") {
              adjusted_mass_price = mass_price * 1000000000;
            }
            if (mass_price_unit === "g") {
              adjusted_mass_price = mass_price * 1000000;
            }
            if (mass_price_unit === "dag") {
              adjusted_mass_price = mass_price * 100000;
            }
            if (mass_price_unit === "kg") {
              adjusted_mass_price = mass_price * 1000;
            }
            if (mass_price_unit === "gr") {
              adjusted_mass_price = mass_price * 15432358.35;
            }
            if (mass_price_unit === "dr") {
              adjusted_mass_price = mass_price * 564383.39;
            }
            if (mass_price_unit === "oz") {
              adjusted_mass_price = mass_price * 35273.96;
            }
            if (mass_price_unit === "lb") {
              adjusted_mass_price = mass_price * 2204.62;
            }
            if (mass_price_unit === "stone") {
              adjusted_mass_price = mass_price * 157.47;
            }
            if (mass_price_unit === "us_ton") {
              adjusted_mass_price = mass_price * 1.1;
            }
            if (mass_price_unit === "long_ton") {
              adjusted_mass_price = mass_price / 0.98;
            }

            const cost = adjusted_mass_price * weight;
            param.tech_cost = Math.round(cost * 100) / 100;
          }

          // Conversion of volume price units in feet
          if (!isNaN(volume_price) && volume_price > 0) {
            let adjusted_volume_price = volume_price;

            if (volume_price_unit === "mm3") {
              adjusted_volume_price = volume_price * 764554857.98;
            }
            if (volume_price_unit === "cm3") {
              adjusted_volume_price = volume_price * 764554.86;
            }
            if (volume_price_unit === "m3") {
              adjusted_volume_price = volume_price * 0.76;
            }
            if (volume_price_unit === "in3") {
              adjusted_volume_price = volume_price * 46656;
            }
            if (volume_price_unit === "yd3") {
              adjusted_volume_price = volume_price * 27;
            }

            const adjusted_weight = weight / 1.22;
            const cost = adjusted_volume_price * adjusted_weight;
            param.tech_cost = Math.round(cost * 100) / 100;
          }

          console.log(param);
          return param;
        } else {
          param.error = "please check your inputs...";
          return param;
        }
      }
      // Method 3
      else {
        if (!isNaN(volume) && !isNaN(density)) {
          // Conversion of volume units in cubic feet
          if (volume_unit === "mm3") {
            volume = volume * 0.0000000353147;
          }
          if (volume_unit === "cm3") {
            volume = volume * 0.0000353147;
          }
          if (volume_unit === "m3") {
            volume = volume * 35.3147;
          }
          if (volume_unit === "in3") {
            volume = volume * 0.000578704;
          }
          if (volume_unit === "yd3") {
            volume = volume * 27;
          }

          // Conversion of density units in pound/cubic feet
          if (density_unit === "kg_m3") {
            density = density * 0.062428;
          }
          if (density_unit === "t_m3" || density_unit === "g_cm3") {
            density = density * 62.428;
          }
          if (density_unit === "oz_in3") {
            density = density * 108;
          }
          if (density_unit === "lb_in3") {
            density = density * 1728;
          }
          if (density_unit === "lb_yd3") {
            density = density * 0.037037;
          }

          // Calculation
          let weight = volume * density;
          weight = weight * 0.000453592;

          // Conversion of weight units for display
          const grams = weight * 1000000;
          const kg = weight * 1000;
          const oz = weight * 35273.96;
          const lb = weight * 2204.623;
          const stone = weight * 157.473;
          const us_ton = weight * 1.102311;
          const long_ton = weight * 0.984207;

          param = {
            tech_: Math.round(grams * 100) / 100,
            tech_kg: Math.round(kg * 100) / 100,
            tech_oz: Math.round(oz * 100) / 100,
            tech_lb: Math.round(lb * 100) / 100,
            tech_stone: Math.round(stone * 100) / 100,
            tech_us_ton: Math.round(us_ton * 100) / 100,
            tech_long_ton: Math.round(long_ton * 100) / 100,
            tech_weight: Math.round(weight * 10000) / 10000,
          };

          if (!isNaN(mass_price) && mass_price > 0) {
            let adjusted_mass_price = mass_price;

            if (mass_price_unit === "ug") {
              adjusted_mass_price = mass_price * 1000000000000;
            }
            if (mass_price_unit === "mg") {
              adjusted_mass_price = mass_price * 1000000000;
            }
            if (mass_price_unit === "g") {
              adjusted_mass_price = mass_price * 1000000;
            }
            if (mass_price_unit === "dag") {
              adjusted_mass_price = mass_price * 100000;
            }
            if (mass_price_unit === "kg") {
              adjusted_mass_price = mass_price * 1000;
            }
            if (mass_price_unit === "gr") {
              adjusted_mass_price = mass_price * 15432358.35;
            }
            if (mass_price_unit === "dr") {
              adjusted_mass_price = mass_price * 564383.39;
            }
            if (mass_price_unit === "oz") {
              adjusted_mass_price = mass_price * 35273.96;
            }
            if (mass_price_unit === "lb") {
              adjusted_mass_price = mass_price * 2204.62;
            }
            if (mass_price_unit === "stone") {
              adjusted_mass_price = mass_price * 157.47;
            }
            if (mass_price_unit === "us_ton") {
              adjusted_mass_price = mass_price * 1.1;
            }
            if (mass_price_unit === "long_ton") {
              adjusted_mass_price = mass_price / 0.98;
            }

            const cost = adjusted_mass_price * weight;
            param.tech_cost = Math.round(cost * 100) / 100;
          }

          // Conversion of volume in required units
          if (!isNaN(volume_price) && volume_price > 0) {
            let converted_volume = volume;

            if (volume_price_unit === "mm3") {
              converted_volume = volume * 28316847;
            }
            if (volume_price_unit === "cm3") {
              converted_volume = volume * 28316.85;
            }
            if (volume_price_unit === "m3") {
              converted_volume = volume * 0.02831685;
            }
            if (volume_price_unit === "in3") {
              converted_volume = volume * 1728;
            }
            if (volume_price_unit === "yd3") {
              converted_volume = volume * 0.037037;
            }

            const cost = volume_price * converted_volume;
            param.tech_cost = Math.round(cost * 100) / 100;
          }

          console.log(param);
          return param;
        } else {
          param.error = "please check your inputs...";
          return param;
        }
      }
    }

    // Circle Shape
    if (shape === "1") {
      if (!isNaN(diameter) && !isNaN(depth)) {
        // Conversion of diameter units in feet
        if (diameter_unit === "in") {
          diameter = diameter / 12;
        }
        if (diameter_unit === "yd") {
          diameter = diameter * 3;
        }
        if (diameter_unit === "cm") {
          diameter = diameter / 30.48;
        }
        if (diameter_unit === "m") {
          diameter = diameter * 3.281;
        }

        // Conversion of depth units in feet
        if (depth_unit === "in") {
          depth = depth * 0.0833333;
        }
        if (depth_unit === "yd") {
          depth = depth * 3;
        }
        if (depth_unit === "cm") {
          depth = depth * 0.0328084;
        }
        if (depth_unit === "m") {
          depth = depth * 3.28084;
        }

        // Calculation
        const radius = diameter / 2;
        const circle_area = Math.PI * Math.pow(radius, 2);
        volume = circle_area * depth;
        let weight = volume * 100;
        weight = weight * 0.000453592;

        // Conversion of volume units for display
        const mm3 = volume * 28316847;
        const cm3 = volume * 28316.85;
        const m3 = volume * 0.02831685;
        const in3 = volume * 1728;
        const yd3 = volume * 0.037037;

        // Conversion of weight units for display
        const grams = weight * 1000000;
        const kg = weight * 1000;
        const oz = weight * 35274;
        const lb = weight * 2204.62;
        const stone = weight * 157.473;
        const us_ton = weight * 1.10231;
        const long_ton = weight * 0.984207;

        param = {
          tech_mm3: Math.round(mm3 * 10000) / 10000,
          tech_cm3: Math.round(cm3 * 10000) / 10000,
          tech_m3: Math.round(m3 * 10000) / 10000,
          tech_in3: Math.round(in3 * 10000) / 10000,
          tech_yd3: Math.round(yd3 * 10000) / 10000,
          tech_g: Math.round(grams * 100) / 100,
          tech_kg: Math.round(kg * 100) / 100,
          tech_oz: Math.round(oz * 100) / 100,
          tech_lb: Math.round(lb * 100) / 100,
          tech_stone: Math.round(stone * 100) / 100,
          tech_us_ton: Math.round(us_ton * 100) / 100,
          tech_long_ton: Math.round(long_ton * 100) / 100,
          tech_volume: Math.round(volume * 10000) / 10000,
          tech_weight: Math.round(weight * 10000) / 10000,
        };

        // Calculation of price unit
        if (!isNaN(c_price) && c_price > 0) {
          const cost = c_price * weight;
          param.tech_cost = Math.round(cost * 100) / 100;
        }
        return param;
      } else {
        param.error = "please check your inputs...";
        return param;
      }
    }

    // If no valid shape
    param.error = "Invalid shape value";
    return param;
  }

  async getCalculationAsphaltCalculator(body) {
    try {
      const submit = body.tech_submit;
      const cal = body.tech_cal;
      let length = parseFloat(body.tech_length);
      const length_unit = body.tech_length_unit;
      let width = parseFloat(body.tech_width);
      const width_unit = body.tech_width_unit;
      let area = parseFloat(body.tech_area);
      const area_unit = body.tech_area_unit;
      let depth = parseFloat(body.tech_depth);
      const depth_unit = body.tech_depth_unit;
      let volume = parseFloat(body.tech_volume);
      const volume_unit = body.tech_volume_unit;
      let density = parseFloat(body.tech_density);
      const density_unit = body.tech_density_unit;
      let cs_depth = parseFloat(body.tech_cs_depth);
      const cs_depth_unit = body.tech_cs_depth_unit;
      let depth_dr = parseFloat(body.tech_depth_dr);
      const depth_dr_unit = body.tech_depth_dr_unit;
      let cost = parseFloat(body.tech_cost);
      const cost_unit = body.tech_cost_unit;

      const result = {};

      if (submit) {
        // Unit conversions
        if (isNumeric(length)) {
          if (length_unit === "km") {
            length = length / 0.001;
          } else if (length_unit === "ft") {
            length = length / 3.281;
          } else if (length_unit === "yd") {
            length = length / 1.0936;
          } else if (length_unit === "mi") {
            length = length / 0.0006214;
          }
        }

        if (isNumeric(width)) {
          if (width_unit === "km") {
            width = width / 0.001;
          } else if (width_unit === "ft") {
            width = width / 3.281;
          } else if (width_unit === "yd") {
            width = width / 1.0936;
          } else if (width_unit === "mi") {
            width = width / 0.0006214;
          }
        }

        if (isNumeric(area)) {
          if (area_unit === "km2") {
            area = area / 0.000001;
          } else if (area_unit === "in2") {
            area = area / 1550;
          } else if (area_unit === "ft2") {
            area = area / 10.764;
          }
        }

        if (isNumeric(depth)) {
          if (depth_unit === "mm") {
            depth = depth / 10;
          } else if (depth_unit === "m") {
            depth = depth / 0.01;
          } else if (depth_unit === "in") {
            depth = depth / 0.3937;
          } else if (depth_unit === "ft") {
            depth = depth / 0.03281;
          }
        }

        if (isNumeric(volume)) {
          if (volume_unit === "cu_ft") {
            volume = volume / 35.315;
          } else if (volume_unit === "us_gal") {
            volume = volume / 264.17;
          } else if (volume_unit === "uk_gal") {
            volume = volume / 219.97;
          }
        }

        if (isNumeric(density)) {
          if (density_unit === "lb_cu_ft") {
            density = density / 0.06243;
          }
        }

        if (isNumeric(cs_depth)) {
          if (cs_depth_unit === "mm") {
            cs_depth = cs_depth / 25.4;
          } else if (cs_depth_unit === "cm") {
            cs_depth = cs_depth / 2.54;
          } else if (cs_depth_unit === "m") {
            cs_depth = cs_depth / 0.0254;
          } else if (cs_depth_unit === "ft") {
            cs_depth = cs_depth / 0.08333;
          }
        }

        if (isNumeric(depth_dr)) {
          // CORRECTION: Use depth_dr_unit instead of cs_depth_unit
          if (depth_dr_unit === "mm") {
            depth_dr = depth_dr / 25.4;
          } else if (depth_dr_unit === "cm") {
            depth_dr = depth_dr / 2.54;
          } else if (depth_dr_unit === "m") {
            depth_dr = depth_dr / 0.0254;
          } else if (depth_dr_unit === "ft") {
            depth_dr = depth_dr / 0.08333;
          }
        }

        if (isNumeric(cost)) {
          if (cost_unit === "kg") {
            cost = cost * 1000;
          } else if (cost_unit === "lb") {
            cost = cost * 2204.62;
          } else if (cost_unit === "us_ton") {
            cost = cost * 1.1;
          } else if (cost_unit === "long_ton") {
            cost = cost * 0.98;
          }
        }

        // Calculations based on calculation type
        if (
          cal === "lwt" &&
          isNumeric(length) &&
          isNumeric(width) &&
          isNumeric(depth) &&
          isNumeric(density)
        ) {
          const calcArea = length * width;
          const calcVolume = (calcArea * depth) / 100;
          const asphalt = calcVolume * density * 0.001;
          const kg = asphalt * 1000;
          const lb = asphalt * 2204.6;
          const us_ton = asphalt * 1.1023;
          const long_ton = asphalt * 0.9842;

          result.tech_area = calcArea;
          result.tech_volume = calcVolume;
          result.tech_asphalt = round(asphalt, 5);
          result.tech_kg = kg;
          result.tech_lb = lb;
          result.tech_us_ton = us_ton;
          result.tech_long_ton = long_ton;

          if (isNumeric(cost)) {
            result.tech_total_cost = cost * asphalt;
          }
        } else if (
          cal === "at" &&
          isNumeric(area) &&
          isNumeric(depth) &&
          isNumeric(density)
        ) {
          const calcVolume = (area * depth) / 100;
          const asphalt = calcVolume * density * 0.001;
          const kg = asphalt * 1000;
          const lb = asphalt * 2204.6;
          const us_ton = asphalt * 1.1023;
          const long_ton = asphalt * 0.9842;

          result.tech_volume = calcVolume;
          result.tech_asphalt = round(asphalt, 5);
          result.tech_kg = kg;
          result.tech_lb = lb;
          result.tech_us_ton = us_ton;
          result.tech_long_ton = long_ton;

          if (isNumeric(cost)) {
            result.tech_total_cost = cost * asphalt;
          }
        } else if (cal === "vad" && isNumeric(volume) && isNumeric(density)) {
          const asphalt = volume * density * 0.001;
          const kg = asphalt * 1000;
          const lb = asphalt * 2204.6;
          const us_ton = asphalt * 1.1023;
          const long_ton = asphalt * 0.9842;

          result.tech_asphalt = round(asphalt, 5);
          result.tech_kg = kg;
          result.tech_lb = lb;
          result.tech_us_ton = us_ton;
          result.tech_long_ton = long_ton;

          if (isNumeric(cost)) {
            result.tech_total_cost = cost * asphalt;
          }
        } else if (
          cal === "csn" &&
          isNumeric(area) &&
          isNumeric(depth) &&
          isNumeric(cs_depth)
        ) {
          const calcVolume = (area * depth) / 100;
          const asphalt = calcVolume * 2400 * 0.001;
          const calcArea = area / 0.0929;
          const stone = (calcArea * cs_depth) / 180;
          const kg = asphalt * 1000;
          const lb = asphalt * 2204.6;
          const us_ton = asphalt * 1.1023;
          const long_ton = asphalt * 0.9842;

          result.tech_asphalt = round(asphalt, 5);
          result.tech_stone = round(stone, 5);
          result.tech_kg = kg;
          result.tech_lb = lb;
          result.tech_us_ton = us_ton;
          result.tech_long_ton = long_ton;

          if (isNumeric(cost)) {
            result.tech_total_cost = cost * asphalt;
          }
        } else if (
          cal === "dtbr" &&
          isNumeric(area) &&
          isNumeric(depth) &&
          isNumeric(depth_dr)
        ) {
          const calcVolume = (area * depth) / 100;
          const asphalt = calcVolume * density * 0.001;
          // CORRECTION: Convert area from m² to ft² for dirt calculation
          const calcAreaFt2 = area / 0.0929;
          const dirt = (calcAreaFt2 * depth_dr) / 320;

          const kg = asphalt * 1000;
          const lb = asphalt * 2204.6;
          const us_ton = asphalt * 1.1023;
          const long_ton = asphalt * 0.9842;

          result.tech_asphalt = round(asphalt, 5);
          result.tech_dirt = round(dirt, 5);
          result.tech_kg = kg;
          result.tech_lb = lb;
          result.tech_us_ton = us_ton;
          result.tech_long_ton = long_ton;

          if (isNumeric(cost)) {
            result.total_cost = cost * asphalt;
          }
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }

        return result;
      } else {
        result.error = "Please! Check Your Input";
        return result;
      }
    } catch (error) {
      console.error("Error in asphalt calculation:", error);
      return { error: "An error occurred during calculation" };
    }
    // Helper functions
    function isNumeric(value) {
      return !isNaN(parseFloat(value)) && isFinite(value);
    }

    function round(value, decimals) {
      return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
    }
  }

 
  async getCalculationSquareFootageCalculator(body) {
    try {
      let width = body.tech_width ?? [];
        let axisa = body.tech_axisa ?? [];
        let axisb = body.tech_axisb ?? [];

        let sidealength = body.tech_sidealength ?? [];
        let sideblength = body.tech_sideblength ?? [];
        let sideclength = body.tech_sideclength ?? []; // may be missing

        let sidealength_unit = body.tech_sidealength_unit ?? [];
        let sideblength_unit = body.tech_sideblength_unit ?? [];
        let sideclength_unit = body.tech_sideclength_unit ?? []; // may be missing

        let quantity = Number(body.tech_quantity ?? 1);

        let height = body.tech_height ?? [];
        let length = body.tech_length ?? [];

        let inner_length = body.tech_inner_length ?? [];
        let inner_width = body.tech_inner_width ?? [];

        let length_unit = body.tech_length_unit ?? [];
        let width_unit = body.tech_width_unit ?? [];

        let diameter = body.tech_diameter ?? [];
        let diameter_unit = body.tech_diameter_unit ?? [];

        let inner_diameter = body.tech_inner_diameter ?? [];
        let inner_diameter_unit = body.tech_inner_diameter_unit ?? [];

        let inner_length_unit = body.tech_inner_length_unit ?? [];
        let inner_width_unit = body.tech_inner_width_unit ?? [];

        let border_width = body.tech_border_width ?? [];
        let border_width_unit = body.tech_border_width_unit ?? [];

        let radius = body.tech_radius ?? [];
        let radius_unit = body.tech_radius_unit ?? [];

        let angle = body.tech_angle ?? [];
        let sides = body.tech_sides ?? [];

        let outer_diameter = body.tech_outer_diameter ?? [];
        let outer_diameter_unit = body.tech_outer_diameter_unit ?? [];

        let height_unit = body.tech_height_unit ?? [];
        let base_unit = body.tech_base_unit ?? [];
        let base = body.tech_base ?? [];

        let room_unit = body.tech_room_unit ?? 1;

        let shape_unit = body.tech_shape_unit ?? [];

        let price = body.tech_price ?? 0;
        let price_unit = body.tech_price_unit ?? "ft²";


      // Unit conversion helper
      function calculate(unit, value) {
        if (unit === "in") return value * 0.0833333;
        if (unit === "ft") return value * 1;
        if (unit === "yd") return value * 3;
        if (unit === "mm") return value * 0.00328084;
        if (unit === "cm") return value * 0.0328084;
        if (unit === "m") return value * 3.28084;
        return value;
      }

      let i = 0;
      let sum = 0;
      let param = {};

      if (room_unit == "1" || room_unit == "2") {
        while (i < shape_unit.length) {
          let area = 0;

          switch (shape_unit[i]) {
            case "sq":
              if (!isNaN(sidealength[i]) && !isNaN(quantity)) {
                let conv = calculate(sidealength_unit[i], sidealength[i]);
                area = conv * conv * quantity;
              } else return { error: "Please! Check Your Input." };
              break;

            case "rec":
              if (!isNaN(length[i]) && !isNaN(width[i]) && !isNaN(quantity)) {
                let l = calculate(length_unit[i], length[i]);
                let w = calculate(width_unit[i], width[i]);
                area = l * w * quantity;
              } else return { error: "Please! Check Your Input." };
              break;

            case "recbor":
              if (
                !isNaN(inner_width[i]) &&
                !isNaN(inner_length[i]) &&
                !isNaN(border_width[i]) &&
                !isNaN(quantity)
              ) {
                let l = calculate(inner_length_unit[i], length[i]);
                let w = calculate(inner_width_unit[i], inner_width[i]);
                let b = calculate(border_width_unit[i], border_width[i]);
                let inner_area = l * w;
                let total_area = (l + 2 * b) * (w + 2 * b);
                area = total_area - inner_area;
              } else return { error: "Please! Check Your Input." };
              break;

            case "tra":
              if (
                !isNaN(sidealength[i]) &&
                !isNaN(sideblength[i]) &&
                !isNaN(height[i]) &&
                !isNaN(quantity)
              ) {
                let a = calculate(sidealength_unit[i], sidealength[i]);
                let b = calculate(sideblength_unit[i], sideblength[i]);
                let h = calculate(height_unit[i], height[i]);
                area = ((a + b) / 2) * h;
              } else return { error: "Please! Check Your Input." };
              break;

            case "para":
              if (!isNaN(base[i]) && !isNaN(height[i]) && !isNaN(quantity)) {
                let b = calculate(base_unit[i], base[i]);
                let h = calculate(height_unit[i], height[i]);
                area = b * h;
              } else return { error: "Please! Check Your Input." };
              break;

            case "tri":
             if (
                  sidealength?.[i] !== undefined &&
                  sideblength?.[i] !== undefined &&
                  sideclength?.[i] !== undefined &&
                  !isNaN(sidealength[i]) &&
                  !isNaN(sideblength[i]) &&
                  !isNaN(sideclength[i]) &&
                  !isNaN(quantity)
                ) {
                let a = calculate(sidealength_unit[i], sidealength[i]);
                let b = calculate(sideblength_unit[i], sideblength[i]);
                let c = calculate(sideclength_unit[i], sideclength[i]);
                area =
                  (1 / 4) *
                  Math.sqrt(
                    (a + b + c) * (b + c - a) * (c + a - b) * (a + b - c)
                  );
              } else return { error: "Please! Check Your Input." };
              break;

            case "cir":
              if (!isNaN(diameter[i]) && !isNaN(quantity)) {
                let d = calculate(diameter_unit[i], diameter[i]);
                area = 3.14 * Math.pow(d / 2, 2);
              } else return { error: "Please! Check Your Input." };
              break;

            case "ell":
              if (!isNaN(axisa[i]) && !isNaN(axisb[i]) && !isNaN(quantity)) {
                let a = calculate(axisa_unit[i], axisa[i]);
                let b = calculate(axisb_unit[i], axisb[i]);
                area = 3.14 * a * b;
              } else return { error: "Please! Check Your Input." };
              break;

            case "sec":
              if (!isNaN(radius[i]) && !isNaN(angle[i]) && !isNaN(quantity)) {
                let r = calculate(radius_unit[i], radius[i]);
                area = 3.14 * r * r * (angle[i] / 360);
              } else return { error: "Please! Check Your Input." };
              break;

            case "hex":
              if (!isNaN(sidealength[i]) && !isNaN(quantity)) {
                let s = calculate(sidealength_unit[i], sidealength[i]);
                area = (3 * Math.sqrt(3) * Math.pow(s, 2)) / 2;
              } else return { error: "Please! Check Your Input." };
              break;

            case "oct":
              if (!isNaN(sidealength[i]) && !isNaN(quantity)) {
                let s = calculate(sidealength_unit[i], sidealength[i]);
                area = 2 * Math.pow(s, 2) * (1 + Math.sqrt(2));
              } else return { error: "Please! Check Your Input." };
              break;

            case "ann":
              if (
                !isNaN(inner_diameter[i]) &&
                !isNaN(outer_diameter[i]) &&
                !isNaN(quantity)
              ) {
                let outer = calculate(
                  outer_diameter_unit[i],
                  outer_diameter[i]
                );
                let inner = calculate(
                  inner_diameter_unit[i],
                  inner_diameter[i]
                );
                area = 3.14 * (Math.pow(outer / 2, 2) - Math.pow(inner / 2, 2));
              } else return { error: "Please! Check Your Input." };
              break;

            case "cirborder":
              if (
                !isNaN(border_width[i]) &&
                !isNaN(inner_diameter[i]) &&
                !isNaN(quantity)
              ) {
                let inner = calculate(
                  inner_diameter_unit[i],
                  inner_diameter[i]
                );
                let border = calculate(border_width_unit[i], border_width[i]);
                let outer_d = inner + 2 * border;
                let outer_area = 3.14 * Math.pow(outer_d / 2, 2);
                let inner_area = 3.14 * Math.pow(inner / 2, 2);
                area = outer_area - inner_area;
              } else return { error: "Please! Check Your Input." };
              break;
          }

          sum += area;
          i++;
        }

        // Price handling
        if (price != "" && !isNaN(price)) {
          let convert_price = 0;
          if (price_unit == "ft²") convert_price = price * 1;
          else if (price_unit == "yd²") convert_price = price * 0.11;
          else if (price_unit == "m²") convert_price = price * 0.09;

          param.tech_ans = sum;
          param.tech_sqyards = sum * 0.11111;
          param.tech_sqmeters = sum * 0.092903;
          param.tech_acres = sum * 0.0000229568;
          param.tech_cost = sum * convert_price;
          return param;
        } else {
          param.tech_ans = sum * quantity;
          param.tech_sqyards = sum * 0.11111;
          param.tech_sqmeters = sum * 0.092903;
          param.tech_acres = sum * 0.0000229568;
          return param;
        }
      }

      return { error: "Please! Check Your Input." };
    } catch (error) {
      return { error: "An unexpected error occurred: " + error.message };
    }
  }

  async getCalculationConcreteCalculator(body) {
    try {
      let operations = body.tech_operations;
      let first = parseFloat(body.tech_first);
      let second = parseFloat(body.tech_second);
      let third = parseFloat(body.tech_third);
      let four = parseFloat(body.tech_four);
      let five = parseFloat(body.tech_five);
      let fiveb = parseFloat(body.tech_fiveb);
      let quantity = parseFloat(body.tech_quantity);
      let units1 = body.tech_units1;
      let units2 = body.tech_units2;
      let units3 = body.tech_units3;
      let units4 = body.tech_units4;
      let units5 = body.tech_units5;
      let price_unit = body.tech_price_unit;
      let price = parseFloat(body.tech_price);

      let result = {};

      // Price unit conversion
      if (price_unit === "ft³") {
        price_unit = "1";
      } else if (price_unit === "yd³") {
        price_unit = "2";
      } else if (price_unit === "m³") {
        price_unit = "3";
      }

      // Helper function for unit conversion to feet
      function calculate_con(a, b) {
        let convert;
        if (b === "ft") {
          convert = a * 1;
        } else if (b === "in") {
          convert = a * 0.0833333;
        } else if (b === "yd") {
          convert = a * 3;
        } else if (b === "cm") {
          convert = a * 0.0328084;
        } else if (b === "m") {
          convert = a * 3.28084;
        }
        return convert;
      }

      let cubic_feet, cubic_yard, cubic_meter;

      // Operation 3: Rectangular/Square Slab
      if (operations === "3") {
        if (
          !isNaN(first) &&
          !isNaN(second) &&
          !isNaN(third) &&
          !isNaN(quantity)
        ) {
          first = calculate_con(first, units1);
          second = calculate_con(second, units2);
          third = calculate_con(third, units3);
          cubic_feet = first * second * third;
          cubic_yard = cubic_feet / 27;
          cubic_meter = cubic_feet * 0.0283;
          // console.log(cubic_feet,cubic_yard,cubic_meter);
        } else {
          return { error: "Please! Check Your Input" };
        }
      }
      // Operation 4: Circular Slab
      else if (operations === "4") {
        if (!isNaN(first) && !isNaN(second) && !isNaN(quantity)) {
          first = calculate_con(first, units1);
          second = calculate_con(second, units2);
          let sq_val = second / 2;
          let final_val = sq_val * sq_val;
          let area = 3.14 * final_val;
          cubic_feet = first * area;
          cubic_yard = cubic_feet / 27;
          cubic_meter = cubic_feet * 0.0283;
        } else {
          return { error: "Please! Check Your Input" };
        }
      }
      // Operation 5: Wall
      else if (operations === "5") {
        if (
          !isNaN(first) &&
          !isNaN(second) &&
          !isNaN(third) &&
          !isNaN(quantity)
        ) {
          first = calculate_con(first, units1);
          second = calculate_con(second, units2);
          third = calculate_con(third, units3);
          cubic_feet = first * second * third;
          cubic_yard = cubic_feet / 27;
          cubic_meter = cubic_feet * 0.0283;
        } else {
          return { error: "Please! Check Your Input" };
        }
      }
      // Operation 6: Footing
      else if (operations === "6") {
        if (
          !isNaN(first) &&
          !isNaN(second) &&
          !isNaN(third) &&
          !isNaN(quantity)
        ) {
          first = calculate_con(first, units1);
          second = calculate_con(second, units2);
          third = calculate_con(third, units3);
          cubic_feet = first * second * third;
          cubic_yard = cubic_feet / 27;
          cubic_meter = cubic_feet * 0.0283;
        } else {
          return { error: "Please! Check Your Input" };
        }
      }
      // Operation 7: Column
      else if (operations === "7") {
        if (
          !isNaN(first) &&
          !isNaN(second) &&
          !isNaN(third) &&
          !isNaN(quantity)
        ) {
          first = calculate_con(first, units1);
          second = calculate_con(second, units2);
          third = calculate_con(third, units3);
          cubic_feet = first * second * third;
          cubic_yard = cubic_feet / 27;
          cubic_meter = cubic_feet * 0.0283;
        } else {
          return { error: "Please! Check Your Input" };
        }
      }
      // Operation 8: Circular Column
      else if (operations === "8") {
        if (!isNaN(first) && !isNaN(second) && !isNaN(quantity)) {
          first = calculate_con(first, units1);
          second = calculate_con(second, units2);
          let area = 3.14 * Math.pow(second / 2, 2);
          cubic_feet = first * area;
          cubic_yard = cubic_feet / 27;
          cubic_meter = cubic_feet * 0.0283;
        } else {
          return { error: "Please! Check Your Input" };
        }
      }
      // Operation 9: Stairs (with fiveb)
      else if (operations === "9") {
        if (
          !isNaN(first) &&
          !isNaN(second) &&
          !isNaN(third) &&
          !isNaN(four) &&
          !isNaN(fiveb) &&
          !isNaN(quantity)
        ) {
          first = calculate_con(first, units1);
          second = calculate_con(second, units2);
          third = calculate_con(third, units3);
          four = calculate_con(four, units4);
          let middle = second * fiveb;
          let step1 = first * middle * four;
          let step2 = third * middle * four;
          cubic_feet = step1 + step2;
          cubic_yard = cubic_feet / 27;
          cubic_meter = cubic_feet * 0.0283;
        } else {
          return { error: "Please! Check Your Input" };
        }
      }
      // Operation 10: Curb/Gutter
      else if (operations === "10") {
        if (
          !isNaN(first) &&
          !isNaN(second) &&
          !isNaN(third) &&
          !isNaN(four) &&
          !isNaN(five) &&
          !isNaN(quantity)
        ) {
          first = calculate_con(first, units1);
          second = calculate_con(second, units2);
          third = calculate_con(third, units3);
          four = calculate_con(four, units4);
          five = calculate_con(five, units5);
          let mid = second + four;
          let step1 = first * mid * five;
          let step2 = third * four * five;
          cubic_feet = step1 + step2;
          cubic_yard = cubic_feet / 27;
          cubic_meter = cubic_feet * 0.0283;
        } else {
          return { error: "Please! Check Your Input" };
        }
      } else {
        return { error: "Please! Check Your Input" };
      }

      // Apply quantity
      if (!isNaN(quantity)) {
        cubic_feet = cubic_feet * quantity;
        cubic_yard = cubic_yard * quantity;
        cubic_meter = cubic_meter * quantity;
      }

      // Calculate price based on unit
      if (!isNaN(price) && price > 0) {
        if (price_unit === "1") {
          let ft_price = cubic_feet * price;
          result.tech_ft_price = parseFloat(ft_price.toFixed(2));
        } else if (price_unit === "2") {
          let yd_price = cubic_yard * price;
          result.tech_yd_price = parseFloat(yd_price.toFixed(2));
        } else if (price_unit === "3") {
          let m_price = cubic_meter * price;
          result.tech_m_price = parseFloat(m_price.toFixed(2));
        }
      }

      // Format cubic values
      cubic_feet = parseFloat(cubic_feet.toFixed(2));
      cubic_yard = parseFloat(cubic_yard.toFixed(2));
      cubic_meter = parseFloat(cubic_meter.toFixed(2));

      // Calculate weight in pounds and kilograms
      let lb = 133 * parseInt(cubic_feet);
      let kg = parseInt(cubic_meter) * 2130;
      // Calculate bags needed (40lb, 60lb, 80lb)
      let lb_40 = parseFloat((lb / 40).toFixed(2));
      let lb_60 = parseFloat((lb / 60).toFixed(2));
      let lb_80 = parseFloat((lb / 80).toFixed(2));
      let kg_40 = parseFloat((kg / 40).toFixed(2));
      let kg_60 = parseFloat((kg / 60).toFixed(2));
      let kg_80 = parseFloat((kg / 80).toFixed(2));

      // Build result object
      result = {
        ...result,
        tech_lb: lb,
        tech_kg: kg,
        tech_lb_40: lb_40,
        tech_lb_60: lb_60,
        tech_lb_80: lb_80,
        tech_kg_40: kg_40,
        tech_kg_60: kg_60,
        tech_kg_80: kg_80,
        tech_cubic_feet: cubic_feet,
        tech_cubic_yard: cubic_yard,
        tech_cubic_meter: cubic_meter,
      };

      return { status: "success", payload: result };
    } catch (err) {
      return { status: "error", message: err.message };
    }
  }

  async getCalculationPaverCalculator(body) {
    try {
      let operations = body.tech_operations;
      let first = body.tech_first;
      let second = body.tech_second;
      let third = body.tech_third;
      let four = body.tech_four;
      let fiveb = body.tech_fiveb;
      let units1 = body.tech_units1;
      let units2 = body.tech_units2;
      let units3 = body.tech_units3;
      let units4 = body.tech_units4;
      let price = body.tech_price;
      let cost = body.tech_cost;
      let cost_unit = body.tech_cost_unit;
      let currancy = body.tech_currancy;
      let price_unit = body.tech_price_unit;
      // Parse numbers safely
      first = Number(first) || 0;
      second = Number(second) || 0;
      third = Number(third) || 0;
      four = Number(four) || 0;
      fiveb = Number(fiveb) || 0;
      price = Number(price) || 0;
      cost = Number(cost) || 0;
      currancy = currancy || ""; // ✅ ensure it’s a string

      // Normalize price and cost units (support null currancy)
      if (price_unit === currancy + "ft²" || price_unit === "ft²")
        price_unit = "1";
      else if (price_unit === currancy + "m²" || price_unit === "m²")
        price_unit = "2";

      if (cost_unit === currancy + "ft²" || cost_unit === "ft²")
        cost_unit = "1";
      else if (cost_unit === currancy + "m²" || cost_unit === "m²")
        cost_unit = "2";

      // Unit converter
      function unit_convertc(a, b) {
        a = Number(a);
        if (isNaN(a)) return 0;
        switch (b) {
          case "ft":
            return a * 1;
          case "in":
            return a * 0.0833333;
          case "yd":
            return a * 3;
          case "cm":
            return a * 0.0328084;
          case "m":
            return a * 3.28084;
          case "mi":
            return a * 5280;
          case "km":
            return a * 3281;
          case "mm":
            return a * 0.00328084;
          default:
            return 0;
        }
      }

      let area_ans = 0,
        patio_area_ans = 0,
        no_paver = 0,
        price_p = 0,
        cost_p = 0,
        total_cost = 0;
      const result = {};

      // Operation 3
      if (operations == "3") {
        if (first && second) {
          first = unit_convertc(first, units1);
          second = unit_convertc(second, units2);
          third = unit_convertc(third, units3);
          four = unit_convertc(four, units4);
          patio_area_ans = third * four;
          area_ans = first * second;
        } else return { error: "Please! Check Your Input" };
      }

      // Operation 4
      else if (operations == "4") {
        if (first && second && fiveb) {
          first = unit_convertc(first, units1);
          second = unit_convertc(second, units2);
          third = unit_convertc(third, units3);
          four = unit_convertc(four, units4);
          area_ans = first * second * fiveb;
          patio_area_ans = third * four;
        } else return { error: "Please! Check Your Input" };
      }

      // Operation 5
      else if (operations == "5") {
        if (first) {
          first = unit_convertc(first, units1);
          const sq_val = first / 2;
          const final_val = sq_val * sq_val;
          area_ans = 3.14 * final_val;
          third = unit_convertc(third, units3);
          four = unit_convertc(four, units4);
          patio_area_ans = third * four;
        } else return { error: "Please! Check Your Input" };
      }

      // Safe rounding
      area_ans = Number(area_ans.toFixed(7)) || 0;
      patio_area_ans = Number(patio_area_ans.toFixed(7)) || 0;

      // Paver count
      if (area_ans > 0 && patio_area_ans > 0) {
        const no_p = area_ans / patio_area_ans;
        no_paver = Math.ceil(no_p);
      }

      result.tech_area_ans = area_ans;
      result.tech_patio_area_ans = patio_area_ans;
      result.tech_no_paver = no_paver;

      // Price & cost calculation
      if (price > 0) {
        price_p = price * no_paver;
        result.tech_price_p = Number(price_p.toFixed(2));

        if (price > 0 && cost > 0) {
          if (cost_unit === "1") cost_p = cost * area_ans * 1;
          else if (cost_unit === "2") cost_p = cost * area_ans * 10.7639;

          cost_p = Number(cost_p.toFixed(2)) || 0;
          result.tech_cost_p = cost_p;

          total_cost = price_p + cost_p;
          result.tech_total_cost = Number(total_cost.toFixed(2));
        } else {
          return { error: "Please enter both cost and price" };
        }
      }

      return result;
    } catch (error) {
      console.error("Calculation Error:", error);
      return { error: "Internal Server Error" };
    }
  }

  async getCalculationFenceCalculator(body) {
    try {
      let f_length = body.tech_f_length;
      let fl_units = body.tech_fl_units;
      let post_space = body.tech_post_space;
      let po_units = body.tech_po_units;
      let first = body.tech_first;
      let units1 = body.tech_units1;
      let second = body.tech_second;
      let p_width = body.tech_p_width;
      let pw_units = body.tech_pw_units;
      let p_spacing = body.tech_p_spacing;
      let ps_units = body.tech_ps_units;
      let third = body.tech_third;
      let units3 = body.tech_units3;
      let four = body.tech_four;
      let units4 = body.tech_units4;
      let drop1 = body.tech_drop1;
      let drop2 = body.tech_drop2;
      let drop3 = body.tech_drop3;
      const param = {};

      // ---- Helper Conversion Functions ----
      function convert_units(a, b) {
        if (b == "ft") return a * 1;
        else if (b == "in") return a * 0.0833333;
        else if (b == "yd") return a * 3;
        else if (b == "cm") return a * 0.0328084;
        else if (b == "m") return a * 3.28084;
        else if (b == "mi") return a * 5280;
        else if (b == "km") return a * 3281;
        return a;
      }

      function fconvert_inches(a, b) {
        if (b == "ft") return a * 12;
        else if (b == "in") return a;
        else if (b == "yd") return a * 36;
        else if (b == "cm") return a / 2.54;
        else if (b == "m") return a * 39.37;
        else if (b == "mi") return a / 1000;
        else if (b == "km") return a * 39370;
        return a;
      }

      // ---- Fence Length & Posts ----
      if (isNaN(f_length) || isNaN(post_space)) {
        return { error: "Please! Enter the data" };
      }

      let fLen = convert_units(Number(f_length), fl_units);
      let postSpace = convert_units(Number(post_space), po_units);
      fLen += 0.4;
      postSpace += 0.4;
      fLen = Math.round(fLen);
      postSpace = Math.round(postSpace);

      let no_post = fLen / postSpace + 1;
      no_post += 0.4;
      no_post = Math.round(no_post);
      const no_sections = no_post - 1;

      // ---- Height Calculation ----
      let post_heigth = 0;
      let fence_heigth = 0;

      if (isNaN(first)) return { error: "Please! Enter the data" };

      if (drop1 == "2") {
        const val = convert_units(Number(first), units1);
        post_heigth = (val * 1.5).toFixed(2);
      } else if (drop1 === "1") {
        const val = convert_units(Number(first), units1);
        post_heigth = val.toFixed(2);
        fence_heigth = (val / 1.5).toFixed(2);
      }

      // ---- Rails Calculation ----
      let no_rails = 0;
      let rails_section = 0;

      if (isNaN(second)) return { error: "Please! Enter the data" };

      if (drop2 == "2") {
        no_rails = second * no_sections;
      } else if (drop2 == "1") {
        if (no_sections == 0)
          return {
            error: "Your answer is 0 and 0 cannot be divided by a number",
          };
        rails_section = second / no_sections;
      }

      // ---- Pickets ----
      if (isNaN(p_width) || isNaN(p_spacing))
        return { error: "Please! Enter the data" };

      const pWidth = fconvert_inches(Number(p_width), pw_units);
      const pSpacing = fconvert_inches(Number(p_spacing), ps_units);
      const fLen2 = fLen * 12;
      let no_pickets = fLen2 / (pWidth + pSpacing);
      no_pickets += 0.4;
      no_pickets = Math.round(no_pickets);

      // ---- Concrete Volume ----
      let c_volume = 0;
      if (drop3 == "1") {
        if (isNaN(third) || isNaN(four))
          return { error: "Please! Enter the data" };

        const thirdVal = fconvert_inches(Number(third), units3);
        const fourVal = fconvert_inches(Number(four), units4);
        const postH2 = Number(post_heigth) * 12;
        const buried = postH2 / 3;
        const p_volume = thirdVal * fourVal * buried;
        const h_volume = thirdVal * 3 * (fourVal * 3) * buried;
        c_volume = (h_volume - p_volume) * no_post;
      } else if (drop3 == "2") {
        if (isNaN(third)) return { error: "Please! Enter the data" };

        const thirdVal = fconvert_inches(Number(third), units3);
        const postH2 = Number(post_heigth) * 12;
        const radius = thirdVal / 2;
        const sq_radius = radius * radius;
        const buried = postH2 / 3;
        const p_volume = sq_radius * buried * 3.14;
        const c_radius = radius * 3;
        const sq_cradius = c_radius * c_radius;
        const h_volume = sq_cradius * buried * 3.14;
        c_volume = (h_volume - p_volume) * no_post;
      }

      // ---- Final Volume Units ----
      let ft_volume = 0;
      let yd_volume = 0;
      if (c_volume) {
        ft_volume = (c_volume / 1728).toFixed(2);
        yd_volume = (c_volume / 46656).toFixed(2);
      }

      // ---- Prepare Response ----
      if (no_post) param.tech_no_post = no_post;
      if (no_sections) param.tech_no_sections = no_sections;
      if (post_heigth) param.tech_post_heigth = Number(post_heigth);
      if (fence_heigth) param.tech_fence_heigth = Number(fence_heigth);
      if (no_rails) param.tech_no_rails = no_rails;
      if (rails_section) param.tech_rails_section = rails_section;
      if (no_pickets) param.tech_no_pickets = no_pickets;
      if (c_volume) param.tech_c_volume = c_volume;
      if (ft_volume) param.tech_ft_volume = ft_volume;
      if (yd_volume) param.tech_yd_volume = yd_volume;

      return {
        status: "success",
        payload: param,
      };
    } catch (error) {
      console.error("Calculation Error:", error);
      return { status: "error", message: error.message };
    }
  }

  async getCalculationTopSoilCalculator(body) {
    try {
      let length = body.tech_length;
      let width = body.tech_width;
      let depth = body.tech_depth;
      let area = body.tech_area;
      let length_unit = body.tech_length_unit;
      let width_unit = body.tech_width_unit;
      let depth_unit = body.tech_depth_unit;
      let area_unit = body.tech_area_unit;
      let calculation_unit = body.tech_calculation_unit;
      let purchase_unit = body.tech_purchase_unit;
      let bag_size = body.tech_bag_size;
      let bag_size_unit = body.tech_bag_size_unit;
      let price_per_bag = body.tech_price_per_bag;
      let price_per_ton = body.tech_price_per_ton;

      const ton = 0.05;
      const result = {};

      // ---------------- Conversion Functions ----------------

      function calculate10(a, b) {
        switch (b) {
          case "ft":
            return a * 1;
          case "in":
            return a * 0.0833333;
          case "yd":
            return a * 3;
          case "cm":
            return a * 0.0328084;
          case "m":
            return a * 3.28084;
          case "km":
            return a * 3281;
          case "mi":
            return a * 5280;
          default:
            return 0;
        }
      }

      function volume(c, d) {
        switch (c) {
          case "sq ft":
            return d * 1;
          case "sq yd":
            return d * 9;
          case "sq m":
            return d * 0.836127;
          default:
            return 0;
        }
      }

      function calculate_feet(e, f) {
        switch (e) {
          case "cu ft":
            return [f * 1, 20.02];
          case "cu yd":
            return [f * 27, 0.74];
          case "cu m":
            return [f * 35.3147, 0.57];
          case "lbs":
            return [f * 0.016018614545451, 2000];
          case "kg":
            return [f * 0.035315, 907.18];
          case "liters":
            return [f * 0.0353147, 566.99];
          default:
            return [0, 0];
        }
      }

      // ---------------- Main Calculations ----------------
      let calculation = 0;

      // Case 1: Length × Width × Depth
      if (calculation_unit == "1") {
        if (
          !isNaN(length) &&
          !isNaN(width) &&
          !isNaN(depth) &&
          length > 0 &&
          width > 0 &&
          depth > 0
        ) {
          const lengthValue = calculate10(Number(length), length_unit);
          const widthValue = calculate10(Number(width), width_unit);
          const depthValue = calculate10(Number(depth), depth_unit);
          calculation = lengthValue * widthValue * depthValue;
        } else {
          return { error: "Please! Check Your Input" };
        }
      }

      // Case 2: Area × Depth
      if (calculation_unit == "2") {
        if (!isNaN(area) && !isNaN(depth) && area > 0 && depth > 0) {
          const depthValue = calculate10(Number(depth), depth_unit);
          const areaValue = volume(area_unit, Number(area));
          calculation = depthValue * areaValue;
        } else {
          return { error: "Please! Check Your Input" };
        }
      }

      // ---------------- Purchase Unit Calculations ----------------

      if (purchase_unit == "1") {
        // CASE: Only volume given
        if (!bag_size && !price_per_bag) {
          return {
            tech_calculation: calculation,
            tech_bag1: calculation / 0.75,
            tech_bag2: calculation / 1,
            tech_bag3: calculation / 1.5,
            tech_bag4: calculation / 2,
            tech_bag5: calculation / 3,
            tech_bag6: calculation / 25,
          };
        }

        // CASE: Bag size given, no price
        if (bag_size && !price_per_bag) {
          if (!isNaN(bag_size) && bag_size > 0) {
            const number_of_bags = calculate_feet(
              bag_size_unit,
              Number(bag_size)
            );
            const calculate_number_of_bags = calculation / number_of_bags[0];
            return {
              tech_calculation: calculation,
              tech_number_of_bags: calculate_number_of_bags,
              tech_bag_size_unit: bag_size_unit,
            };
          } else {
            return { error: "Please! Enter Number Only Number" };
          }
        }

        // CASE: Bag size + price both given
        if (bag_size && price_per_bag) {
          if (
            !isNaN(bag_size) &&
            !isNaN(price_per_bag) &&
            bag_size > 0 &&
            price_per_bag > 0
          ) {
            const number_of_bags = calculate_feet(
              bag_size_unit,
              Number(bag_size)
            );
            const calculate_number_of_bags = calculation / number_of_bags[0];
            const total_cost = Number(price_per_bag) * calculate_number_of_bags;
            return {
              tech_calculation: calculation,
              tech_number_of_bags: calculate_number_of_bags,
              tech_total_cost: total_cost,
              tech_bag_size: bag_size,
              tech_price_per_bag: price_per_bag,
              tech_price_in_ton: (price_per_bag * number_of_bags[1]) / bag_size,
              tech_bag_size_unit: bag_size_unit,
            };
          } else {
            return { error: "Please! Enter Number Only Number" };
          }
        }

        // CASE: Only price given
        if (price_per_bag && !bag_size) {
          if (!isNaN(price_per_bag) && price_per_bag > 0) {
            return {
              tech_calculation: calculation,
            };
          } else {
            return { error: "Please! Enter Number Only Number" };
          }
        }
      }

      // CASE: Purchase unit = ton
      if (purchase_unit == "2") {
        if (!isNaN(price_per_ton) && price_per_ton > 0) {
          const calculate_cost = calculation * ton;
          return {
            tech_calculate_cost: calculate_cost,
            tech_calculation: calculation,
          };
        }
      }

      return { error: "Please! Check Your Input or Purchase Unit" };
    } catch (error) {
      console.error("Calculation Error (Topsoil):", error);
      return { error: "Calculation Failed", message: error.message };
    }
  }

  async getCalculationCubicYardCalculator(body) {
    try {
      let operations = body.tech_operations;
      let first = body.tech_first;
      let second = body.tech_second;
      let third = body.tech_third;
      let four = body.tech_four;
      let quantity = body.tech_quantity;
      let units1 = body.tech_units1;
      let units2 = body.tech_units2;
      let units3 = body.tech_units3;
      let units4 = body.tech_units4;
      let price_unit = body.tech_price_unit;
      let price = body.tech_price;
      let extra_area = body.tech_extra_area;
      let extra_units = body.tech_extra_units;
      let currancy = body.tech_currancy;

      const param = {};

      // Remove currency symbols from price_unit
      if (currancy && price_unit) {
        price_unit = price_unit.replace(currancy, "").trim();
      }

      // Conversion: linear
      const calculate = (a, b) => {
        switch (b) {
          case "ft":
            return a * 1;
          case "in":
            return a * 0.0833333;
          case "yd":
            return a * 3;
          case "cm":
            return a * 0.0328084;
          case "m":
            return a * 3.28084;
          default:
            return 0;
        }
      };

      // Conversion: square
      const calculate_square = (x, y) => {
        switch (y) {
          case "ft²":
            return x * 1;
          case "in²":
            return x * 0.00694444;
          case "yd²":
            return x * 9;
          case "cm²":
            return x * 0.00107639;
          case "m²":
            return x * 10.7639;
          default:
            return 0;
        }
      };

      // Helper: format numbers
      const fmt = (num) => (isNaN(num) ? 0 : Number(num.toFixed(2)));

      let cubic_feet = 0,
        cubic_yard = 0,
        cubic_meter = 0,
        cubic_cm = 0,
        cubic_in = 0;
      let estimated_price = null;

      // ------------------- OPERATION CASES -------------------
      const π = 3.14;

      switch (operations) {
        case "3": {
          if ([first, second, third, quantity].every(Number)) {
            first = calculate(+first, units1);
            second = calculate(+second, units2);
            third = calculate(+third, units3);
            cubic_feet = first * second * third;
          } else return { error: "Please check your input" };
          break;
        }

        case "4": {
          if ([first, second, quantity].every(Number)) {
            first = calculate(+first, units1);
            second = calculate(+second, units2);
            cubic_feet = first * Math.pow(second, 2);
          } else return { error: "Please check your input" };
          break;
        }

        case "5": {
          if ([first, second, third, four, quantity].every(Number)) {
            first = calculate(+first, units1);
            second = calculate(+second, units2);
            third = calculate(+third, units3);
            four = calculate(+four, units4);
            const inner = second * third;
            const border = four * 2;
            const total = (second + border) * (third + border);
            const diff = total - inner;
            cubic_feet = first * diff;
          } else return { error: "Please check your input" };
          break;
        }

        case "6": {
          if ([first, second, quantity].every(Number)) {
            first = calculate(+first, units1);
            second = calculate(+second, units2);
            const area = π * Math.pow(second / 2, 2);
            cubic_feet = first * area;
          } else return { error: "Please check your input" };
          break;
        }

        case "7": {
          if ([first, second, third, quantity].every(Number)) {
            first = calculate(+first, units1);
            second = calculate(+second, units2);
            third = calculate(+third, units3);
            const outerD = second + 2 * third;
            const outerA = π * Math.pow(outerD / 2, 2);
            const innerA = π * Math.pow(second / 2, 2);
            const area = outerA - innerA;
            cubic_feet = first * area;
          } else return { error: "Please check your input" };
          break;
        }

        case "8": {
          if ([first, second, third, quantity].every(Number)) {
            first = calculate(+first, units1);
            second = calculate(+second, units2);
            third = calculate(+third, units3);
            const outerA = π * Math.pow(second / 2, 2);
            const innerA = π * Math.pow(third / 2, 2);
            const area = outerA - innerA;
            cubic_feet = first * area;
          } else return { error: "Please check your input" };
          break;
        }

        case "9": {
          if ([first, second, third, four, quantity].every(Number)) {
            first = calculate(+first, units1);
            second = calculate(+second, units2);
            third = calculate(+third, units3);
            four = calculate(+four, units4);
            const a1 = second + third + four;
            const a2 = third + four - second;
            const a3 = four + second - third;
            const a4 = second + third - four;
            const area = 0.25 * Math.sqrt(a1 * a2 * a3 * a4);
            cubic_feet = first * area;
          } else return { error: "Please check your input" };
          break;
        }

        case "10": {
          if ([first, second, third, four, quantity].every(Number)) {
            first = calculate(+first, units1);
            second = calculate(+second, units2);
            third = calculate(+third, units3);
            four = calculate(+four, units4);
            const avg = (second + third) / 2;
            const area = avg * four;
            cubic_feet = first * area;
          } else return { error: "Please check your input" };
          break;
        }

        case "11": {
          if ([first, quantity].every(Number)) {
            first = calculate(+first, units1);
            cubic_feet = Math.pow(first, 3);
          } else return { error: "Please check your input" };
          break;
        }

        case "12": {
          if ([first, second, quantity].every(Number)) {
            first = calculate(+first, units1);
            second = calculate(+second, units2);
            cubic_feet = Math.pow(first, 2) * second * π;
          } else return { error: "Please check your input" };
          break;
        }

        case "13": {
          if ([first, second, third, quantity].every(Number)) {
            first = calculate(+first, units1);
            second = calculate(+second, units2);
            third = calculate(+third, units3);
            if (first > second) {
              const area = π * (Math.pow(first, 2) - Math.pow(second, 2));
              cubic_feet = third * area;
            } else {
              return {
                error: "Outer Radius must be greater than Inner Radius",
              };
            }
          } else return { error: "Please check your input" };
          break;
        }

        case "14": {
          if ([first, quantity].every(Number)) {
            first = calculate(+first, units1);
            cubic_feet = (2 * π * Math.pow(first, 3)) / 3;
          } else return { error: "Please check your input" };
          break;
        }

        case "15": {
          if ([first, second, quantity].every(Number)) {
            first = calculate(+first, units1);
            second = calculate(+second, units2);
            cubic_feet = π * Math.pow(first, 2) * (second / 3);
          } else return { error: "Please check your input" };
          break;
        }

        case "16": {
          if ([extra_area, second, quantity].every(Number)) {
            const area = calculate_square(+extra_area, extra_units);
            second = calculate(+second, units2);
            cubic_feet = (area * second) / 3;
          } else return { error: "Please check your input" };
          break;
        }

        case "17": {
          if ([extra_area, second, quantity].every(Number)) {
            const area = calculate_square(+extra_area, extra_units);
            second = calculate(+second, units2);
            cubic_feet = area * second;
          } else return { error: "Please check your input" };
          break;
        }

        default:
          return { error: "Invalid operation" };
      }

      // ------------------- Common Calculations -------------------
      cubic_yard = cubic_feet / 27;
      cubic_meter = cubic_feet * 0.0283;
      cubic_cm = cubic_feet * 28317;
      cubic_in = cubic_feet * 1728;

      if (quantity) {
        cubic_feet *= +quantity;
        cubic_yard *= +quantity;
        cubic_meter *= +quantity;
        cubic_cm *= +quantity;
        cubic_in *= +quantity;
      }

      // ------------------- Price Calculation -------------------
      if (!isNaN(price)) {
        if (price_unit == "ft³") {
          estimated_price = fmt(cubic_feet * price);
        } else if (price_unit == "yd³") {
          estimated_price = fmt(cubic_yard * price);
        } else if (price_unit == "m³") {
          estimated_price = fmt(cubic_meter * price);
        }
      }

      // ------------------- Final Response -------------------
      return {
        tech_cubic_feet: fmt(cubic_feet),
        tech_cubic_yard: fmt(cubic_yard),
        tech_cubic_meter: fmt(cubic_meter),
        tech_cubic_cm: fmt(cubic_cm),
        tech_cubic_in: fmt(cubic_in),
        ...(estimated_price && { tech_estimated_price: estimated_price }),
      };
    } catch (error) {
      console.error("Calculation Error (Cubic Yard):", error);
      return { error: "Calculation Failed", message: error.message };
    }
  }

  async getCalculationTileCalculator(body) {
    try {
      let {
        tech_area_length: area_length,
        tech_area_length_unit: area_length_unit,
        tech_area_width: area_width,
        tech_area_width_unit: area_width_unit,
        tech_tile_length: tile_length,
        tech_tile_length_unit: tile_length_unit,
        tech_tile_width: tile_width,
        tech_tile_width_unit: tile_width_unit,
        tech_gap_size: gap_size,
        tech_gap_size_unit: gap_size_unit,
        tech_waste: waste,
        tech_price: price,
        tech_price_unit: price_unit,
        tech_box_size: box_size,
        tech_total_area: total_area,
        tech_total_area_unit: total_area_unit,
        tech_calculation_unit: calculation_unit,
        tech_currency: currency,
      } = body;

      const param = {};

      // Price unit ko normalize karein
      if (price_unit === `${currency}tile`) {
        price_unit = "tile";
      } else if (price_unit === `${currency}box`) {
        price_unit = "box";
      } else if (price_unit === `${currency}inch²`) {
        price_unit = "in²";
      } else if (price_unit === `${currency}feet²`) {
        price_unit = "ft²";
      } else if (price_unit === `${currency}yard²`) {
        price_unit = "yd²";
      } else if (price_unit === `${currency}acre`) {
        price_unit = "ac";
      } else if (price_unit === `${currency}meter²`) {
        price_unit = "m²";
      }

      // Helper function: Convert to inches
      const convertInches = (value, unit) => {
        const conversions = {
          ft: value * 12,
          in: value * 1,
          yd: value * 36,
          cm: value * 0.393701,
          m: value * 39.3701,
          mm: value * 0.0393701,
        };
        return conversions[unit] || 0;
      };

      // Helper function: Convert to feet
      const convertFeet = (unit, value) => {
        const conversions = {
          ft: value * 1,
          in: value * 0.0833333,
          yd: value * 3,
          cm: value * 0.0328084,
          m: value * 3.28084,
          mm: value * 0.00328084,
        };
        return conversions[unit] || 0;
      };

      // Helper function: Captain (area conversion)
      const captain = (unit, value) => {
        const conversions = {
          ft: value * 144,
          m: value * 1550,
          yd: value * 9,
          in: value * 1,
          cm: value * 0.155,
        };
        return conversions[unit] || 0;
      };

      let area_length_value, area_width_value, a1;

      // Calculation based on unit type
      if (calculation_unit === "1" || calculation_unit === 1) {
        if (!isNaN(area_length) && !isNaN(area_width)) {
          area_length_value = convertInches(
            parseFloat(area_length),
            area_length_unit
          );
          area_width_value = convertInches(
            parseFloat(area_width),
            area_width_unit
          );
          a1 = area_length_value * area_width_value;
        } else {
          param.error = "Please! Check Your Input";
          return param;
        }
      } else if (calculation_unit === "2" || calculation_unit === 2) {
        if (!isNaN(total_area)) {
          area_length_value = captain(total_area_unit, parseFloat(total_area));
          area_width_value = 1;
          a1 = area_length_value * area_width_value;
        } else {
          param.error = "Please! Check Your Input";
          return param;
        }
      }

      // Tile calculations
      if (
        !isNaN(tile_length) &&
        !isNaN(tile_width) &&
        !isNaN(gap_size) &&
        !isNaN(waste)
      ) {
        const tile_length_value = convertInches(
          parseFloat(tile_length),
          tile_length_unit
        );
        const tile_width_value = convertInches(
          parseFloat(tile_width),
          tile_width_unit
        );
        const gap_size_value = convertInches(
          parseFloat(gap_size),
          gap_size_unit
        );

        const a2 =
          (tile_length_value + gap_size_value) *
          (tile_width_value + gap_size_value);
        let formula = a1 / a2;

        // Add waste percentage
        if (waste !== "" && waste != null) {
          const diff = (parseFloat(waste) / 100) * formula;
          formula = formula + diff;
        }

        const final_formula = formula;

        // Calculate Area Size
        const size1 = convertFeet(area_length_unit, parseFloat(area_length));
        const size2 = convertFeet(area_width_unit, parseFloat(area_width));
        const calculate_size = size1 * size2;

        // Box size calculation
        if (box_size !== "" && box_size != null) {
          if (parseFloat(box_size) < 0) {
            param.error = "Please! Enter Positive Value";
            return param;
          } else if (!isNaN(box_size)) {
            const calculate_box_size = final_formula / parseFloat(box_size);
            param.calculate_box_size = calculate_box_size;
          } else {
            param.error = "Please! Check Your Input";
            return param;
          }
        }

        // Price calculation
        if (price !== "" && price != null) {
          if (parseFloat(price) < 0) {
            param.error = "Please! Enter Positive Value";
            return param;
          } else if (!isNaN(price)) {
            let p;

            if (price_unit === "tile") {
              p = final_formula * parseFloat(price);
            } else if (price_unit === "box") {
              if (!isNaN(box_size) && box_size !== "" && box_size != null) {
                p = (final_formula / parseFloat(box_size)) * parseFloat(price);
              } else {
                param.error = "Please Fill Box Value";
                return param;
              }
            } else if (price_unit === "in²") {
              p = parseFloat(price) * 144;
            } else if (price_unit === "ft²") {
              p = parseFloat(price) * calculate_size;
            } else if (price_unit === "yd²") {
              p = parseFloat(price) * 0.11;
            } else if (price_unit === "ac") {
              p = parseFloat(price) * 0.0000229568;
            } else if (price_unit === "m²") {
              p = parseFloat(price) * 0.09;
            }

            param.tech_price_per_tile = p;
          } else {
            param.error = "Enter values greater than zero";
            return param;
          }
        }

        param.tech_calculate_size = calculate_size;
        param.tech_formula = final_formula;

        return param;
      } else {
        param.error = "Please! Check Your Input";
        return param;
      }
    } catch (error) {
      console.error("Error in tile calculator:", error);
      return { error: "Calculation failed. Please check your inputs." };
    }
  }

  async getCalculationFlooringCalculator(body) {
    try {
      let room_length = body.tech_room_length;
      let room_length_unit = body.tech_room_length_unit;
      let room_width = body.tech_room_width;
      let room_width_unit = body.tech_room_width_unit;
      let cost = body.tech_cost;
      let cost_unit = body.tech_cost_unit;
      let waste_factor = body.tech_waste_factor;
      let currancy = body.tech_currancy;

      if (currancy && typeof cost_unit === "string") {
        cost_unit = cost_unit.replace(currancy, "").trim();
      }

      // ----------------- Helper Conversions -----------------
      function unit_convert1(unit, value) {
        switch (unit) {
          case "cm":
            return value * 0.01;
          case "m":
            return value * 1;
          case "in":
            return value * 0.0254;
          case "ft":
            return value * 0.3048;
          default:
            return 0;
        }
      }

      function unit_convert2(unit, value) {
        switch (unit.trim()) {
          case "ft²":
            return 10.76 * value;
          case "yd²":
            return 1.2 * value;
          case "m²":
            return 1 * value;
          default:
            return 0;
        }
      }

      // ----------------- Step 2: Calculate area -----------------
      let sum = 0;

      // ensure arrays (just like Laravel's multi-input handling)
      if (!Array.isArray(room_length)) room_length = [room_length];
      if (!Array.isArray(room_width)) room_width = [room_width];
      if (!Array.isArray(room_length_unit))
        room_length_unit = [room_length_unit];
      if (!Array.isArray(room_width_unit)) room_width_unit = [room_width_unit];

      for (let i = 0; i < room_length.length && i < room_width.length; i++) {
        const lenUnit = room_length_unit[i];
        const widUnit = room_width_unit[i];
        const lenVal = Number(room_length[i]);
        const widVal = Number(room_width[i]);

        if (isNaN(lenVal) || isNaN(widVal)) {
          return { error: "Please! Check Your Input" };
        }

        const length_value = unit_convert1(lenUnit, lenVal);
        const width_value = unit_convert1(widUnit, widVal);

        sum += length_value * width_value;
      }

      // ----------------- Step 3: Handle price & waste -----------------
      let result = {};

      const hasCost = cost !== undefined && cost !== "" && !isNaN(cost);
      const hasWaste =
        waste_factor !== undefined &&
        waste_factor !== "" &&
        !isNaN(waste_factor);

      if (hasCost && !hasWaste) {
        const cost_value = unit_convert2(cost_unit, Number(cost));
        result.tech_price = +(cost_value * sum).toFixed(6);
        result.tech_area = +sum.toFixed(6);
        result.tech_total_material = +sum.toFixed(6);
      } else if (hasCost && hasWaste) {
        const cost_value = unit_convert2(cost_unit, Number(cost));
        const waste_calc = (sum * Number(waste_factor)) / 100;
        result.tech_area = +sum.toFixed(6);
        result.tech_total_material = +(sum + waste_calc).toFixed(6);
        result.tech_price = +(result.tech_total_material * cost_value).toFixed(
          6
        );
      } else {
        result.tech_area = +sum.toFixed(6);
        result.tech_total_material = +sum.toFixed(6);
      }

      // ----------------- Step 4: Final Output -----------------
      result.RESULT = 1;
      return result;
    } catch (err) {
      console.error("Calculation Error:", err);
      return { error: "Server error occurred" };
    }
  }

  async getCalculationWallpaperCalculator(body) {
    try {
      // Extract body values
      let type = body.tech_type;
      let room_length = body.tech_room_length;
      let room_length_unit = body.tech_room_length_unit;
      let room_width = body.tech_room_width;
      let room_width_unit = body.tech_room_width_unit;
      let room_height = body.tech_room_height;
      let room_height_unit = body.tech_room_height_unit;
      let door_height = body.tech_door_height;
      let door_height_unit = body.tech_door_height_unit;
      let door_width = body.tech_door_width;
      let door_width_unit = body.tech_door_width_unit;
      let no_of_doors = body.tech_no_of_doors;
      let window_height = body.tech_window_height;
      let window_height_unit = body.tech_window_height_unit;
      let window_width = body.tech_window_width;
      let window_width_unit = body.tech_window_width_unit;
      let no_of_windows = body.tech_no_of_windows;
      let roll_length = body.tech_roll_length;
      let roll_length_unit = body.tech_roll_length_unit;
      let roll_width = body.tech_roll_width;
      let roll_width_unit = body.tech_roll_width_unit;
      let cost = body.tech_cost;
      let pattern = body.tech_pattern;
      let pattern_unit = body.tech_pattern_unit;
      let wall_width = body.tech_wall_width;
      let wall_width_unit = body.tech_wall_width_unit;
      let wall_height = body.tech_wall_height;
      let wall_height_unit = body.tech_wall_height_unit;

      // Convert to numbers where needed
      room_length = Number(room_length);
      room_width = Number(room_width);
      room_height = Number(room_height);
      door_height = Number(door_height);
      door_width = Number(door_width);
      no_of_doors = Number(no_of_doors);
      window_height = Number(window_height);
      window_width = Number(window_width);
      no_of_windows = Number(no_of_windows);
      roll_length = Number(roll_length);
      roll_width = Number(roll_width);
      cost = Number(cost);
      pattern = Number(pattern);
      wall_width = Number(wall_width);
      wall_height = Number(wall_height);

      const param = {};

      // Unit conversion helper
      function unit_convert(unit, value) {
        switch (unit) {
          case "cm":
            return value * 0.01;
          case "m":
            return value * 1;
          case "in":
            return value * 0.0254;
          case "ft":
            return value * 0.3048;
          case "yd":
            return value * 0.9144;
          default:
            return 0;
        }
      }

      let wall_area = 0;
      let wall_height_value = 0;

      // --- Type 1 (Single Wall) ---
      if (type == "1") {
        if (
          !isNaN(wall_width) &&
          !isNaN(wall_height) &&
          wall_width > 0 &&
          wall_height > 0
        ) {
          const wall_width_value = unit_convert(wall_width_unit, wall_width);
          wall_height_value = unit_convert(wall_height_unit, wall_height);
          wall_area = wall_height_value * wall_width_value;
        } else {
          return { error: "Please! Check Your Input" };
        }
      }

      // --- Type 2 (Room with Four Walls) ---
      else if (type == "2") {
        if (
          !isNaN(room_length) &&
          !isNaN(room_width) &&
          !isNaN(room_height) &&
          room_length > 0 &&
          room_width > 0 &&
          room_height > 0
        ) {
          const rlv = unit_convert(room_length_unit, room_length);
          const rwv = unit_convert(room_width_unit, room_width);
          wall_height_value = unit_convert(room_height_unit, room_height);
          wall_area = (rlv + rwv + rlv + rwv) * wall_height_value;
        } else {
          return { error: "Please! Check Your Input" };
        }
      }

      // --- Door Area ---
      let door_area = 0;
      if (
        !isNaN(door_height) &&
        !isNaN(door_width) &&
        !isNaN(no_of_doors) &&
        door_height > 0 &&
        door_width > 0 &&
        no_of_doors > 0
      ) {
        const door_width_value = unit_convert(door_width_unit, door_width);
        const door_height_value = unit_convert(door_height_unit, door_height);
        door_area = door_height_value * door_width_value * no_of_doors;
      } else {
        return { error: "Please! Check Your Input" };
      }

      // --- Window Area ---
      let window_area = 0;
      if (
        !isNaN(window_height) &&
        !isNaN(window_width) &&
        !isNaN(no_of_windows) &&
        window_height > 0 &&
        window_width > 0 &&
        no_of_windows > 0
      ) {
        const window_width_value = unit_convert(
          window_width_unit,
          window_width
        );
        const window_height_value = unit_convert(
          window_height_unit,
          window_height
        );
        window_area = window_height_value * window_width_value * no_of_windows;
      } else {
        return { error: "Please! Check Your Input" };
      }

      // --- Roll Area ---
      let roll_area = 0;
      if (!isNaN(roll_length) && !isNaN(roll_width) && !isNaN(pattern)) {
        const roll_width_value = unit_convert(roll_width_unit, roll_width);
        const roll_length_value = unit_convert(roll_length_unit, roll_length);
        roll_area = roll_width_value * roll_length_value;
      } else {
        return { error: "Please! Check Your Input" };
      }

      // --- Final Calculations ---
      const adjusted_wall_area = wall_area - door_area - window_area;
      const number_of_rolls = adjusted_wall_area / roll_area;

      let costs = 0;
      if (cost !== "" && !isNaN(cost)) {
        costs = number_of_rolls * cost;
      }

      // --- Response ---
      return {
        status: "success",
        payload: {
          tech_area: wall_area,
          tech_door_area: door_area,
          tech_window_area: window_area,
          tech_adjusted_height: Number(wall_height_value.toFixed(2)),
          tech_adjusted_wall_area: adjusted_wall_area,
          tech_number_of_rolls: number_of_rolls,
          tech_costs: costs,
        },
      };
    } catch (error) {
      return { status: "error", message: error.message };
    }
  }

  async getCalculationStudCalculator(body) {
    try {
      // Destructure input body
      let want = body.tech_want;
      let wall_end_stud = body.tech_wall_end_stud;
      let wall_on = body.tech_wall_on;
      let hight = body.tech_hight;
      let hight_unit = body.tech_hight_unit;
      let length = body.tech_length;
      let length_unit = body.tech_length_unit;
      let stud_spacing = body.tech_stud_spacing;
      let stud_spacing_unit = body.tech_stud_spacing_unit;
      let stud_width = body.tech_stud_width;
      let stud_width_unit = body.tech_stud_width_unit;
      let rim_joist_width = body.tech_rim_joist_width;
      let rim_joist_width_unit = body.tech_rim_joist_width_unit;
      let subfloor_thickness = body.tech_subfloor_thickness;
      let subfloor_thickness_unit = body.tech_subfloor_thickness_unit;
      let estimated_waste = body.tech_estimated_waste;
      let stud_price = body.tech_stud_price;

      // Convert numeric inputs
      wall_end_stud = Number(wall_end_stud);
      hight = Number(hight);
      length = Number(length);
      stud_spacing = Number(stud_spacing);
      stud_width = Number(stud_width);
      rim_joist_width = Number(rim_joist_width);
      subfloor_thickness = Number(subfloor_thickness);
      estimated_waste = Number(estimated_waste);
      stud_price = Number(stud_price);

      // Unit conversion function
      function convert_to_in(unit, value) {
        if (unit === "in") return value;
        else if (unit === "cm") return value / 2.54;
        else if (unit === "ft") return value * 12;
        return 0;
      }

      // Validation
      if (
        want &&
        !isNaN(wall_end_stud) &&
        !isNaN(hight) &&
        !isNaN(length) &&
        !isNaN(stud_spacing)
      ) {
        const length_in = convert_to_in(length_unit, length);
        const hight_in = convert_to_in(hight_unit, hight);
        const stud_spacing_in = convert_to_in(stud_spacing_unit, stud_spacing);

        // Studs calculation
        const studs = Math.ceil(
          length_in / stud_spacing_in + 1 + wall_end_stud
        );
        const studs_cost = studs * stud_price;
        const total_cost = studs_cost + (studs_cost * estimated_waste) / 100;

        // Finished length of studs (in feet)
        const finished_length_of_studs = Number(
          ((hight_in - 2 * 2.75) / 12).toFixed(2)
        );

        // Wall area (in ft²)
        const wall_area = hight_in * length_in;
        const wall_area_ft = wall_area / 144;

        // Lumber calculations
        const lumber8 = Math.ceil(length_in / 12 / 8);
        const lumber10 = Math.ceil(length_in / 12 / 10);
        const lumber12 = Math.ceil(length_in / 12 / 12);

        // Response object
        const param = {
          tech_studs: studs,
          tech_total_cost: total_cost,
          tech_finished_length_of_studs: finished_length_of_studs,
          tech_wall_area_ft: wall_area_ft,
          tech_lumber8: lumber8,
          tech_lumber10: lumber10,
          tech_lumber12: lumber12,
        };

        // If want = sheet or all
        if (want === "sheet" || want === "all") {
          if (!isNaN(rim_joist_width) && !isNaN(subfloor_thickness)) {
            const rim_joist_width_in = convert_to_in(
              rim_joist_width_unit,
              rim_joist_width
            );
            const subfloor_thickness_in = convert_to_in(
              subfloor_thickness_unit,
              subfloor_thickness
            );
            const extra =
              ((rim_joist_width_in + subfloor_thickness_in) * length_in) / 144;
            const sheets_req = Number(((wall_area_ft + extra) / 32).toFixed(3));

            param.tech_sheets_req = sheets_req;
          } else {
            return { error: "Please! Check Your Input" };
          }
        }

        // If want = board or all
        if (want === "board" || want === "all") {
          if (!isNaN(stud_width)) {
            const stud_width_in = convert_to_in(stud_width_unit, stud_width);
            const board_footage = (stud_width_in * 96) / 12;
            param.tech_board_footage = board_footage;
          } else {
            return { error: "Please! Check Your Input" };
          }
        }

        // Final output
        return {
          status: "success",
          payload: {
            ...param,
          },
        };
      } else {
        return { error: "Please! Check Your Input" };
      }
    } catch (error) {
      return { status: "error", message: error.message };
    }
  }

  async getCalculationRampCalculator(body) {
    try {
      let appli = body.tech_appli;
      let unit = body.tech_unit;
      let unit0 = body.tech_unit0;
      let unit1 = body.tech_unit1;
      let unit2 = body.tech_unit2;
      let r_type = body.tech_r_type;
      let no = body.tech_no;
      let no1 = body.tech_no1;
      let no2 = body.tech_no2;
      let width = body.tech_width;
      let calc = body.tech_calc;

      appli = appli?.trim();
      unit = unit?.trim();
      unit0 = unit0?.trim();
      unit1 = unit1?.trim();
      unit2 = unit2?.trim();
      r_type = r_type?.trim();
      calc = calc?.trim();

      const param = {};

      // -------------------- CASE 1: calc == "one" --------------------
      if (calc === "one") {
        if (!isNaN(no)) {
          no = parseFloat(no);
          let r, ramplength;

          switch (appli) {
            case "a":
              r = 1 / 12;
              ramplength = no * 12;
              break;
            case "b":
              r = 1 / 16;
              ramplength = no * 16;
              break;
            case "c":
              r = 1 / 20;
              ramplength = no * 20;
              break;
            case "d":
              r = 2 / 12;
              ramplength = (no * 12) / 2;
              break;
            case "e":
              r = 3 / 12;
              ramplength = (no * 12) / 3;
              break;
            default:
              return { error: "Invalid appli value" };
          }

          const grade = r * 100;
          const rad = Math.atan(r);
          const deg = (rad * 180) / Math.PI;
          let runs = Math.sqrt(Math.pow(ramplength, 2) - Math.pow(no, 2));

          const millirad = rad * 1000;
          const microrad = rad * 1000000;
          const minarc = rad * ((60 * 180) / Math.PI);
          const secarc = rad * ((3600 * 180) / Math.PI);
          const gradian = rad * (200 / Math.PI);
          const turns = rad / (2 * Math.PI);
          let pirad = deg * (Math.PI / 180);
          pirad = pirad / Math.PI;

          param.tech_millirad = Number(millirad.toFixed(1));
          param.tech_microrad = Math.round(microrad);
          param.tech_secarc = Math.round(secarc);
          param.tech_gradian = Number(gradian.toFixed(2));
          param.tech_turns = Number(turns.toFixed(5));
          param.tech_pirad = Number(pirad.toFixed(5));
          param.tech_minarc = Math.round(minarc);
          param.tech_grade = Number(grade.toFixed(2));
          param.tech_r_type = r_type;
          param.tech_appli = appli;
          param.tech_runs = Number(runs.toFixed(3));
          param.tech_unit = unit;
          param.tech_deg = Number(deg.toFixed(2));
          param.tech_rad = Number(rad.toFixed(4));
          param.tech_ramplength = ramplength;

          return { status: "success", payload: param };
        } else {
          return { error: "Please! Check your input" };
        }
      }

      // -------------------- CASE 2: calc != "one" --------------------
      else {
        function ramp(unit, value) {
          value = parseFloat(value);
          switch (unit) {
            case "mm":
              return value / 10;
            case "cm":
              return value * 1;
            case "m":
              return value * 100;
            case "in":
              return value * 2.54;
            case "ft":
              return value * 30.48;
            default:
              return value;
          }
        }

        no1 = ramp(unit0, no1);
        no2 = ramp(unit1, no2);
        width = ramp(unit2, width);

        if (!isNaN(no) && !isNaN(no2) && !isNaN(width)) {
          no = parseFloat(no);
          const Hypotenuse1 = Math.pow(no1, 2) + Math.pow(no2, 2);
          const Hypotenuse = Math.sqrt(Hypotenuse1);
          const alpha1 =
            Math.pow(no2, 2) + Math.pow(Hypotenuse, 2) - Math.pow(no1, 2);
          const alpha2 = alpha1 / (2 * no2 * Hypotenuse);
          const alpha = Math.acos(alpha2) * (180 / Math.PI);
          const beta = 90 - alpha;
          const area = no1 * no2 + width * (no1 + no2 + Hypotenuse);
          const volume = (no1 * no2 * width) / 2;
          const sv = area / volume;

          param.tech_unit = unit;
          param.tech_Hypotenuse = Number(Hypotenuse.toFixed(3));
          param.tech_Hypotenuse1 = Hypotenuse1;
          param.tech_alpha = Number(alpha.toFixed(3));
          param.tech_alpha2 = Number(alpha2.toFixed(3));
          param.tech_alpha1 = Number(alpha1.toFixed(3));
          param.tech_beta = Number(beta.toFixed(4));
          param.tech_area = Number(area.toFixed(3));
          param.tech_volume = Number(volume.toFixed(3));
          param.tech_sv = Number(sv.toFixed(3));
          param.tech_no1 = no1;
          param.tech_no2 = no2;
          param.tech_width = width;

          return { status: "success", payload: param };
        } else {
          return { error: "Please! Check your input" };
        }
      }
    } catch (error) {
      return { error: "Server error occurred", details: error.message };
    }
  }

  async getCalculationSquareMeterCalculator(body) {
    try {
      let volume_select = body.tech_volume_select;
      let length = body.tech_length;
      let l_units = body.tech_l_units;
      let width = body.tech_width;
      let w_units = body.tech_w_units;
      let side = body.tech_side;
      let s_units = body.tech_s_units;
      let quantity = body.tech_quantity;
      let price = body.tech_price;

      const param = {};

      // Parse & sanitize inputs
      volume_select = parseInt(volume_select);
      length = parseFloat(length);
      width = parseFloat(width);
      side = parseFloat(side);
      quantity = quantity ? parseFloat(quantity) : 1;
      price =
        price !== undefined && price !== null && price !== ""
          ? parseFloat(price)
          : null;

      // ✅ Conversion function to meters
      function meterconvert(value, unit) {
        switch (unit) {
          case "mm":
            return value / 1000;
          case "cm":
            return value / 100;
          case "in":
            return value / 39.37;
          case "ft":
            return value / 3.281;
          case "yd":
            return value / 1.094;
          default:
            return value;
        }
      }

      // Convert all dimensions to meters
      const length_m = meterconvert(length, l_units);
      const width_m = meterconvert(width, w_units);
      const side_m = meterconvert(side, s_units);

      let res = 0;
      let cost = 0;

      // ✅ CASE 1: Rectangle (volume_select = 1)
      if (volume_select === 1) {
        if (isNaN(length_m)) {
          return { error: "Please! Check Your Inputs" };
        }

        res = width_m * length_m;
        if (isNaN(price)) {
          res = res * quantity;
        } else {
          cost = price * res;
        }
      }

      // ✅ CASE 2: Square (volume_select = 2)
      else if (volume_select === 2) {
        res = Math.pow(width_m, 2);
        if (isNaN(price)) {
          res = res * quantity;
        } else {
          cost = price * res;
        }
      }

      // ✅ CASE 3: Circle (volume_select = 3)
      else if (volume_select === 3) {
        if (isNaN(length_m)) {
          return { error: "Please! Check Your Inputs" };
        }

        const radi = length_m / 2;
        res = 3.1416 * Math.pow(radi, 2);
        if (isNaN(price)) {
          res = res * quantity;
        } else {
          cost = price * res;
        }
      }

      // ✅ CASE 4: Triangle (default)
      else {
        if (isNaN(length_m) || isNaN(width_m) || isNaN(side_m)) {
          return { error: "Please! Check Your Inputs" };
        }

        res =
          0.25 *
          Math.sqrt(
            (length_m + width_m + side_m) *
              (-length_m + width_m + side_m) *
              (length_m - width_m + side_m) *
              (length_m + width_m - side_m)
          );

        if (isNaN(price)) {
          res = res * quantity;
        } else {
          cost = price * res;
        }
      }

      // ✅ Prepare final output
      if (!isNaN(price)) {
        param.tech_res = Number(res.toFixed(6));
        param.tech_cost = Number(cost.toFixed(6));
      } else {
        param.tech_res = Number(res.toFixed(6));
      }

      return { status: "success", payload: param };
    } catch (error) {
      return { error: "Server error occurred", details: error.message };
    }
  }

  async getCalculationStoneCalculator(body) {
    // Extract and trim input values
    const selection = (body.tech_selection || "").toString().trim();
    const length = (body.tech_length || "").toString().trim();
    const length_unit = (body.tech_length_unit || "").toString().trim();
    const width = (body.tech_width || "").toString().trim();
    const width_unit = (body.tech_width_unit || "").toString().trim();
    const area = (body.tech_area || "").toString().trim();
    const area_unit = (body.tech_area_unit || "").toString().trim();
    const depth = (body.tech_depth || "").toString().trim();
    const depth_unit = (body.tech_depth_unit || "").toString().trim();
    const volume = (body.tech_volume || "").toString().trim();
    const volume_unit = (body.tech_volume_unit || "").toString().trim();
    const material = (body.tech_material || "").toString().trim();
    let price = (body.tech_price || "").toString().trim();
    let price_unit = (body.tech_price_unit || "").toString().trim();
    const currancy = body.tech_currancy || "";

    // Remove currency from price_unit
    if (currancy) {
      price_unit = price_unit.replace(currancy + " ", "");
    }

    const result = {};

    // Helper function: Convert units to feet
    function unit_ft(a, b) {
      let ans1 = 0;
      if (b === "cm") {
        ans1 = a / 30.48;
      } else if (b === "m") {
        ans1 = a * 3.281;
      } else if (b === "in") {
        ans1 = a / 12;
      } else if (b === "yd") {
        ans1 = a * 3;
      } else if (b === "ft") {
        ans1 = a * 1;
      }
      return ans1;
    }

    // Helper function: Convert area units to ft²
    function unit_area(aa, bb) {
      let ans2 = 0;
      if (bb === "ft²") {
        ans2 = aa * 1;
      } else if (bb === "yd²") {
        ans2 = aa * 9;
      } else if (bb === "m²") {
        ans2 = aa * 10.764;
      }
      return ans2;
    }

    // Helper function: Convert volume units to ft³
    function unit_vol(a, b) {
      let ans3 = 0;
      if (b === "ft³") {
        ans3 = a * 1;
      } else if (b === "yd³") {
        ans3 = a * 27;
      } else if (b === "m³") {
        ans3 = a * 35.315;
      }
      return ans3;
    }

    // Helper function: Calculate material tons (imperial)
    function material_val(a, b) {
      let tons1 = 0,
        tons2 = 0;

      // Convert to string for comparison
      const matStr = b.toString();

      if (matStr === "105") {
        tons1 = a * 1.4;
        tons2 = a * 1.7;
      } else if (matStr === "150") {
        tons1 = a * 1.5;
        tons2 = a * 1.7;
      } else if (matStr === "160") {
        tons1 = a * 1.5;
        tons2 = a * 1.7;
      } else if (matStr === "145") {
        tons1 = a * 1.3;
        tons2 = a * 1.5;
      } else if (matStr === "168") {
        tons1 = a * 1.5;
        tons2 = a * 1.7;
      } else if (matStr === "188") {
        tons1 = a * 1;
        tons2 = a * 1.3;
      } else if (matStr === "100") {
        tons1 = a * 1.7;
        tons2 = a * 2;
      }
      return [tons1, tons2];
    }

    // Helper function: Calculate material tons (metric)
    function material_m(a, b) {
      let tons1 = 0,
        tons2 = 0;

      // Convert to string for comparison
      const matStr = b.toString();

      if (matStr === "105") {
        tons1 = a * 1.66;
        tons2 = a * 2.02;
      } else if (matStr === "150") {
        tons1 = a * 1.78;
        tons2 = a * 2.02;
      } else if (matStr === "160") {
        tons1 = a * 1;
        tons2 = a * 2.02;
      } else if (matStr === "145") {
        tons1 = a * 1.54;
        tons2 = a * 1.78;
      } else if (matStr === "168") {
        tons1 = a * 1.78;
        tons2 = a * 2.02;
      } else if (matStr === "188") {
        tons1 = a * 1.19;
        tons2 = a * 1.54;
      } else if (matStr === "100") {
        tons1 = a * 2.02;
        tons2 = a * 2.34;
      }
      return [tons1, tons2];
    }

    // Main calculation logic
    let cubicyd1 = 0,
      array = [0, 0];

    if (selection == "1") {
      // Length x Width x Depth calculation
      if (
        !isNaN(parseFloat(length)) &&
        !isNaN(parseFloat(width)) &&
        !isNaN(parseFloat(depth))
      ) {
        const lengthFt = unit_ft(parseFloat(length), length_unit);
        const widthFt = unit_ft(parseFloat(width), width_unit);
        const depthFt = unit_ft(parseFloat(depth), depth_unit);
        const cubicyd = lengthFt * widthFt * depthFt;
        cubicyd1 = cubicyd / 27;
        array = material_val(cubicyd1, material);
        result.tech_cubicyd1 = cubicyd1;
        result.tech_array = array;
      } else {
        result.error = "Please! Check Your Input";
        return result;
      }
    } else if (selection == "2") {
      // Area x Depth calculation
      if (!isNaN(parseFloat(area)) && !isNaN(parseFloat(depth))) {
        const areaFt = unit_area(parseFloat(area), area_unit);
        const depthFt = unit_ft(parseFloat(depth), depth_unit);
        let cubicyd;
        if (area_unit === "3" && depth_unit === "m") {
          cubicyd = (areaFt / 10.764) * (depthFt / 3.281);
        } else {
          cubicyd = areaFt * depthFt;
        }
        cubicyd1 = cubicyd / 27;
        array = material_val(cubicyd1, material);
        result.tech_array = array;
        result.tech_cubicyd1 = cubicyd1;
      } else {
        result.error = "Please! Check Your Input";
        return result;
      }
    } else if (selection == "3") {
      // Volume calculation
      if (!isNaN(parseFloat(volume))) {
        if (volume_unit === "1") {
          cubicyd1 = parseFloat(volume) / 27;
          array = material_val(cubicyd1, material);
        } else if (volume_unit === "2") {
          cubicyd1 = parseFloat(volume);
          array = material_val(cubicyd1, material);
        } else {
          cubicyd1 = parseFloat(volume);
          array = material_m(cubicyd1, material);
        }
        result.tech_cubicyd1 = cubicyd1;
        result.tech_array = array;
      } else {
        result.error = "Please! Check Your Input";
        return result;
      }
    }

    // Price calculation
    if (!isNaN(parseFloat(price)) && array) {
      const priceNum = parseFloat(price);
      if (price_unit === "per ton") {
        const price_ton = array.map((v) => v * priceNum);
        result.tech_price_ton = price_ton;
      } else {
        const price_cu = priceNum * cubicyd1;
        result.tech_price_cu = price_cu;
      }
      result.tech_price = priceNum;
    }

    return result;
  }

  async getCalculationRoomSizeCalculator(body) {
    try {
      let submit = body.tech_name;
      let lenght_f = body.tech_lenght_f;
      let lenght_in = body.tech_lenght_in;
      let width_f = body.tech_width_f;
      let width_in = body.tech_width_in;
      let perce = body.tech_perce;
      let lenght_m = body.tech_lenght_m;
      let width_m = body.tech_width_m;
      let param = {};

      // Check which mode we are in: 'feet' or 'meter'
      if (submit === "feet") {
        const lengthCount = lenght_f.length;
        const widthCount = width_f.length;

        let lenght_foot = 0;

        for (let i = 0; i < Math.min(lengthCount, widthCount); i++) {
          const lf = lenght_f[i] === "" ? 0 : Number(lenght_f[i]);
          const li = lenght_in[i] === "" ? 0 : Number(lenght_in[i]);
          const wf = width_f[i] === "" ? 0 : Number(width_f[i]);
          const wi = width_in[i] === "" ? 0 : Number(width_in[i]);

          // Validate numeric inputs
          if ((isNaN(lf) && isNaN(li)) || (isNaN(wf) && isNaN(wi))) {
            param.error = "Please! Check Your Input";
            return param;
          }

          const lengthInFeet = lf + li / 12;
          const widthInFeet = wf + wi / 12;
          lenght_foot += lengthInFeet * widthInFeet;
        }

        const f_r_s = lenght_foot;
        if (perce != 0 && f_r_s != 0) {
          const p = (Number(perce) / 100) * f_r_s;
          const perc = f_r_s + p;
          param["perc"] = perc;
        }

        param["f_r_s"] = f_r_s;
      } else if (submit === "meter") {
        const lengthCount = lenght_m.length;
        const widthCount = width_m.length;

        let m_lenght_sum = 0;

        for (let i = 0; i < Math.min(lengthCount, widthCount); i++) {
          const lm = Number(lenght_m[i]);
          const wm = Number(width_m[i]);

          if (isNaN(lm) || isNaN(wm)) {
            param.error = "Please! Check Your Input";
            return param;
          }

          m_lenght_sum += lm * wm;
        }

        const m_r_s = m_lenght_sum;

        if (perce != 0 && m_r_s != 0) {
          const p = (Number(perce) / 100) * m_r_s;
          const perc = m_r_s + p;
          param["perc"] = perc;
        }

        param["m_r_s"] = m_r_s;
      }

      // Common params
      param["submit"] = submit;
      param["perce"] = perce;
      param["RESULT"] = 1;

      return param;
    } catch (error) {
      return { error: "An error occurred during calculation." };
    }
  }

  async getCalculationTankVolumeCalculator(body) {
    const {
      tech_operations: operations,
      tech_first: first,
      tech_second: second,
      tech_third: third,
      tech_four: four,
      tech_units1: units1,
      tech_units2: units2,
      tech_units3: units3,
      tech_units4: units4,
      tech_fill_units: fill_units,
      tech_fill: fill,
    } = body;

    const result = {};
    // Unit conversion function

    function inchesConvert(value, unit) {
      const conversions = {
        ft: value * 12,
        in: value * 1,
        cm: value / 2.54,
        m: value * 39.37,
        mm: value / 25.4,
      };
      return conversions[unit] || value;
    }

    let v_tank, v_fill, per_ans;

    try {
      // Operation 3: Horizontal Cylinder
      if (operations == "3") {
        if (!isNaN(first) && !isNaN(second)) {
          const length = inchesConvert(parseFloat(first), units1);
          const diameter = inchesConvert(parseFloat(second), units2);
          const r = diameter / 2;
          const sq_r = Math.pow(r, 2);
          v_tank = 3.14 * sq_r * length;
          // console.log(v_tank);
          if (!isNaN(fill)) {
            const fillHeight = inchesConvert(parseFloat(fill), fill_units);
            console.log(fillHeight);
            if (fillHeight <= diameter) {
              const a_ans1 = r - fillHeight;
              const f_ans1 = a_ans1 / r;
              const acoc_ans = Math.acos(f_ans1);
              const angle_ans = 2 * acoc_ans;
              const sin_ans = Math.sin(angle_ans);
              const angle_sin = angle_ans - sin_ans;
              v_fill = 0.5 * sq_r * angle_sin * length;
              per_ans = (fillHeight / diameter) * 100;
            } else {
              return { error: "It seems your tank is over filled." };
            }
          }
        } else {
          return { error: "Invalid input values." };
        }
      }

      // Operation 4: Vertical Cylinder
      else if (operations == "4") {
        if (!isNaN(first) && !isNaN(second)) {
          const height = inchesConvert(parseFloat(first), units1);
          const diameter = inchesConvert(parseFloat(second), units2);
          const r = diameter / 2;
          const sq_r = Math.pow(r, 2);
          v_tank = Math.PI * sq_r * height;

          if (!isNaN(fill)) {
            const fillHeight = inchesConvert(parseFloat(fill), fill_units);
            if (fillHeight <= height) {
              v_fill = Math.PI * sq_r * fillHeight;
              per_ans = (fillHeight / height) * 100;
            } else {
              return { error: "It seems your tank is over filled." };
            }
          }
        } else {
          return { error: "Invalid input values." };
        }
      }

      // Operation 5: Rectangular Tank
      else if (operations == "5") {
        if (!isNaN(first) && !isNaN(second) && !isNaN(third)) {
          const height = inchesConvert(parseFloat(first), units1);
          const width = inchesConvert(parseFloat(second), units2);
          const length = inchesConvert(parseFloat(third), units3);
          v_tank = height * width * length;

          if (!isNaN(fill)) {
            const fillHeight = inchesConvert(parseFloat(fill), fill_units);
            if (fillHeight <= height) {
              v_fill = width * length * fillHeight;
              per_ans = (fillHeight / height) * 100;
            } else {
              return { error: "It seems your tank is over filled." };
            }
          }
        } else {
          return { error: "Invalid input values." };
        }
      }

      // Operation 6: Horizontal Capsule
      else if (operations == "6") {
        if (!isNaN(first) && !isNaN(second) && !isNaN(third)) {
          const height = inchesConvert(parseFloat(first), units1);
          const width = inchesConvert(parseFloat(second), units2);
          const length = inchesConvert(parseFloat(third), units3);

          if (width > height) {
            const r = height / 2;
            const sq_r = Math.pow(r, 2);
            const a = width - height;
            const ra = 2 * r * a;
            const pi_sqr = Math.PI * sq_r;
            v_tank = (pi_sqr + ra) * length;

            if (!isNaN(fill)) {
              const fillHeight = inchesConvert(parseFloat(fill), fill_units);
              if (fillHeight <= height) {
                const a_ans1 = r - fillHeight;
                const f_ans1 = a_ans1 / r;
                const acoc_ans = Math.acos(f_ans1);
                const angle_ans = 2 * acoc_ans;
                const sin_ans = Math.sin(angle_ans);
                const angle_sin = angle_ans - sin_ans;
                const v_segment = 0.5 * sq_r * angle_sin * length;
                const v_fill3 = a * length * fillHeight;
                v_fill = v_segment + v_fill3;
                per_ans = (fillHeight / height) * 100;
              } else {
                return { error: "It seems your tank is over filled." };
              }
            }
          } else {
            return { error: "Width must be greater than height" };
          }
        } else {
          return { error: "Invalid input values." };
        }
      }

      // Operation 7: Vertical Capsule
      else if (operations == "7") {
        if (!isNaN(first) && !isNaN(second) && !isNaN(third)) {
          const height = inchesConvert(parseFloat(first), units1);
          const width = inchesConvert(parseFloat(second), units2);
          const length = inchesConvert(parseFloat(third), units3);

          if (height > width) {
            const r = width / 2;
            const sq_r = Math.pow(r, 2);
            const a = height - width;
            const h_r = height - r;
            const ra = 2 * r * a;
            const pi_sqr = Math.PI * sq_r;
            v_tank = (pi_sqr + ra) * length;

            if (!isNaN(fill)) {
              const fillHeight = inchesConvert(parseFloat(fill), fill_units);
              if (fillHeight <= height) {
                if (fillHeight < r) {
                  const a_ans1 = r - fillHeight;
                  const f_ans1 = a_ans1 / r;
                  const acoc_ans = Math.acos(f_ans1);
                  const angle_ans = 2 * acoc_ans;
                  const sin_ans = Math.sin(angle_ans);
                  const angle_sin = angle_ans - sin_ans;
                  v_fill = 0.5 * sq_r * angle_sin * length;
                } else if (fillHeight > r && fillHeight < a) {
                  const f_r = fillHeight - r;
                  const v_fill_1 = 0.5 * Math.PI * sq_r * length;
                  const v_fill_2 = f_r * length * width;
                  v_fill = v_fill_1 + v_fill_2;
                } else if (h_r < height && fillHeight < height) {
                  const a_ans1 = r - fillHeight;
                  const f_ans1 = a_ans1 / r;
                  const acoc_ans = Math.acos(f_ans1);
                  const angle_ans = 2 * acoc_ans;
                  const sin_ans = Math.sin(angle_ans);
                  const angle_sin = angle_ans - sin_ans;
                  const v_segment =
                    Math.PI * sq_r * length - 0.5 * sq_r * angle_sin * length;
                  v_fill = v_tank - v_segment;
                }
                per_ans = (fillHeight / height) * 100;
              } else {
                return { error: "It seems your tank is over filled." };
              }
            }
          } else {
            return { error: "Height must be greater than Width" };
          }
        } else {
          return { error: "Invalid input values." };
        }
      }

      // Operation 8: Horizontal Dish Ends
      else if (operations == "8") {
        if (!isNaN(first) && !isNaN(second)) {
          const length = inchesConvert(parseFloat(first), units1);
          const diameter = inchesConvert(parseFloat(second), units2);
          const r = diameter / 2;
          const sq_r = Math.pow(r, 2);
          const pi_sqr = Math.PI * sq_r;
          const ra = 1.33333333333 * r;
          const ra_a = ra + length;
          v_tank = pi_sqr * ra_a;

          if (!isNaN(fill)) {
            const fillHeight = inchesConvert(parseFloat(fill), fill_units);
            if (fillHeight <= diameter) {
              const a_ans1 = r - fillHeight;
              const f_ans1 = a_ans1 / r;
              const acoc_ans = Math.acos(f_ans1);
              const angle_ans = 2 * acoc_ans;
              const sin_ans = Math.sin(angle_ans);
              const angle_sin = angle_ans - sin_ans;
              const v_segment = 0.5 * sq_r * angle_sin * length;

              let v_fill2 =
                fillHeight < diameter ? v_segment : v_tank - v_segment;

              const sq_fill = Math.pow(fillHeight, 2);
              const pi_fill = Math.PI * sq_fill;
              const step1_ans = pi_fill / 3;
              const d1 = 1.5 * diameter;
              const step2_ans = d1 - fillHeight;
              const step_ans = step1_ans * step2_ans;
              v_fill = v_fill2 + step_ans;
              per_ans = (fillHeight / diameter) * 100;
            } else {
              return { error: "It seems your tank is over filled." };
            }
          }
        } else {
          return { error: "Invalid input values." };
        }
      }

      // Operation 9: Vertical Dish Ends
      else if (operations == "9") {
        if (!isNaN(first) && !isNaN(second)) {
          const length = inchesConvert(parseFloat(first), units1);
          const diameter = inchesConvert(parseFloat(second), units2);
          const r = diameter / 2;
          const sq_r = Math.pow(r, 2);
          const pi_sqr = Math.PI * sq_r;
          const ra = 1.33333333333 * r;
          const ra_a = ra + length;
          v_tank = pi_sqr * ra_a;

          if (!isNaN(fill)) {
            const fillHeight = inchesConvert(parseFloat(fill), fill_units);
            const condition = length + diameter;
            const r_length = r + length;

            if (fillHeight <= condition) {
              if (fillHeight < r) {
                const sq_fill = Math.pow(fillHeight, 2);
                const pi_fill = Math.PI * sq_fill;
                const step1_ans = pi_fill / 3;
                const d1 = 1.5 * diameter;
                const step2_ans = d1 - fillHeight;
                v_fill = step1_ans * step2_ans;
              } else if (fillHeight > r && fillHeight < r_length) {
                const sq_c = Math.pow(r, 3);
                const stepans = fillHeight - r;
                v_fill =
                  0.6666666666 * Math.PI * sq_c + Math.PI * sq_r * stepans;
              } else if (r_length < fillHeight) {
                const sq_fill = Math.pow(fillHeight, 2);
                const pi_fill = Math.PI * sq_fill;
                const step1_ans = pi_fill / 3;
                const d1 = 1.5 * diameter;
                const step_ans = length + diameter - fillHeight;
                const step3 = d1 - step_ans;
                const final_step = step1_ans * step3;
                v_fill = v_tank - final_step;
              }
              per_ans = (fillHeight / condition) * 100;
            } else {
              return { error: "It seems your tank is over filled." };
            }
          }
        } else {
          return { error: "Invalid input values." };
        }
      }

      // Operation 12: Horizontal Oval
      else if (operations == "12") {
        if (!isNaN(first) && !isNaN(second) && !isNaN(third)) {
          const height = inchesConvert(parseFloat(first), units1);
          const width = inchesConvert(parseFloat(second), units2);
          const length = inchesConvert(parseFloat(third), units3);
          const h4 = height / 4;
          v_tank = Math.PI * width * length * h4;

          if (!isNaN(fill)) {
            const fillHeight = inchesConvert(parseFloat(fill), fill_units);
            if (fillHeight <= height) {
              const w4 = width / 4;
              const sq_fill = Math.pow(fillHeight, 2);
              const sq_h = Math.pow(height, 2);
              const square_f = fillHeight / height;
              const square_s = sq_fill / sq_h;
              const sq_ans = 4 * square_f - 4 * square_s;
              const square_ans = Math.sqrt(sq_ans);
              const fh = 2 * square_f;
              const ans_1 = 1 - fh;
              const a_ans_1 = Math.acos(ans_1);
              const answer1 = a_ans_1 - ans_1;
              const final_ans2 = answer1 * square_ans;
              v_fill = height * length * w4 * final_ans2;
              if (v_fill < 0) {
                v_fill = v_fill * -1;
              }
              per_ans = (fillHeight / height) * 100;
            } else {
              return { error: "It seems your tank is over filled." };
            }
          }
        } else {
          return { error: "Invalid input values." };
        }
      }

      // Operation 13: Vertical Cylinder with Cone Bottom
      else if (operations == "13") {
        if (!isNaN(first) && !isNaN(second) && !isNaN(third) && !isNaN(four)) {
          const topDia = inchesConvert(parseFloat(first), units1);
          const botDia = inchesConvert(parseFloat(second), units2);
          const cylHeight = inchesConvert(parseFloat(third), units3);
          const coneHeight = inchesConvert(parseFloat(four), units4);

          if (topDia > botDia) {
            const R_top = topDia / 2;
            const sq_Rtop = Math.pow(R_top, 2);
            const v_cylinder = Math.PI * sq_Rtop * cylHeight;

            const R_bot = botDia / 2;
            const sq_Rbot = Math.pow(R_bot, 2);
            const main_part = sq_Rtop + R_top * R_bot + sq_Rbot;
            const v_frustum = 0.3333333333 * Math.PI * coneHeight * main_part;

            v_tank = v_frustum + v_cylinder;

            if (!isNaN(fill)) {
              const fillHeight = parseFloat(fill);
              if (fillHeight <= coneHeight) {
                const diff = topDia - botDia;
                const z2 = botDia / diff;
                const z = coneHeight * z2;
                const fill_z = fillHeight + z;
                const con_z = coneHeight + z;
                const diff2 = fill_z / con_z;
                const R = 0.5 * topDia * diff2;
                const square_R = Math.pow(R, 2);
                const Answ = square_R + R * R_bot + sq_Rbot;
                v_fill = 0.333333333 * Math.PI * coneHeight * Answ;
                per_ans = (fillHeight / coneHeight) * 100;
              } else if (fillHeight > coneHeight) {
                const radi = topDia - botDia;
                const radius = radi / 2;
                const radius_sq = Math.pow(radius, 2);
                const ans1 = fillHeight - coneHeight;
                const c_volume = Math.PI * radius_sq * ans1;
                v_fill = v_frustum + c_volume;
              }
            }
          } else {
            return {
              error: "Top diameter should be bigger than bottom diameter.",
            };
          }
        } else {
          return { error: "Invalid input values." };
        }
      }

      // Operation 14: Vertical Cylinder with Cone Top
      else if (operations == "14") {
        if (!isNaN(first) && !isNaN(second) && !isNaN(third) && !isNaN(four)) {
          const topDia = inchesConvert(parseFloat(first), units1);
          const botDia = inchesConvert(parseFloat(second), units2);
          const cylHeight = inchesConvert(parseFloat(third), units3);
          const coneHeight = inchesConvert(parseFloat(four), units4);

          if (botDia > topDia) {
            const R_top = topDia / 2;
            const sq_Rtop = Math.pow(R_top, 2);
            const v_cylinder = Math.PI * sq_Rtop * cylHeight;

            const R_bot = botDia / 2;
            const sq_Rbot = Math.pow(R_bot, 2);
            const main_part = sq_Rtop + R_top * R_bot + sq_Rbot;
            const v_frustum = 0.3333333333 * Math.PI * coneHeight * main_part;

            v_tank = v_frustum + v_cylinder;

            if (!isNaN(fill)) {
              const fillHeight = parseFloat(fill);
              if (fillHeight <= coneHeight) {
                const diff = topDia - botDia;
                const z2 = botDia / diff;
                const z = coneHeight * z2;
                const fill_z = fillHeight + z;
                const con_z = coneHeight + z;
                const diff2 = fill_z / con_z;
                const R = 0.5 * topDia * diff2;
                const square_R = Math.pow(R, 2);
                const Answ = square_R + R * R_bot + sq_Rbot;
                v_fill = 0.333333333 * Math.PI * coneHeight * Answ;
                per_ans = (fillHeight / coneHeight) * 100;
              } else if (fillHeight > coneHeight) {
                const radi = topDia - botDia;
                const radius = radi / 2;
                const radius_sq = Math.pow(radius, 2);
                const ans1 = fillHeight - coneHeight;
                const c_volume = Math.PI * radius_sq * ans1;
                v_fill = v_frustum + c_volume;
              }
            }
          } else {
            return {
              error: "Bottom diameter should be bigger than top diameter.",
            };
          }
        } else {
          return { error: "Invalid input values." };
        }
      }

      // Operation 15: Cone
      else if (operations == "15") {
        if (!isNaN(first) && !isNaN(second) && !isNaN(third)) {
          const topDia = inchesConvert(parseFloat(first), units1);
          const botDia = inchesConvert(parseFloat(second), units2);
          const height = inchesConvert(parseFloat(third), units3);

          if (topDia > botDia) {
            const R_top = topDia / 2;
            const sq_Rtop = Math.pow(R_top, 2);
            const R_bot = botDia / 2;
            const sq_Rbot = Math.pow(R_bot, 2);
            const main_part = sq_Rtop + R_top * R_bot + sq_Rbot;
            v_tank = 0.3333333333 * Math.PI * height * main_part;

            if (!isNaN(fill)) {
              const fillHeight = inchesConvert(parseFloat(fill), fill_units);
              if (fillHeight <= topDia) {
                const diff = topDia - botDia;
                const z2 = botDia / diff;
                const z = height * z2;
                const fill_z = fillHeight + z;
                const con_z = z + height;
                const fill_con = fill_z / con_z;
                const R = 0.5 * topDia * fill_con;
                const square_R = Math.pow(R, 2);
                const Answ = square_R + R * R_bot + sq_Rbot;
                v_fill = 0.333333333 * Math.PI * height * Answ;
                per_ans = (fillHeight / four) * 100;
              } else {
                return { error: "It seems your tank is over filled." };
              }
            }
          } else {
            return {
              error: "Top diameter should be bigger than bottom diameter.",
            };
          }
        } else {
          return { error: "Invalid input values." };
        }
      }

      // Operation 16: Sphere
      else if (operations == "16") {
        if (!isNaN(first)) {
          const diameter = inchesConvert(parseFloat(first), units1);
          const r = diameter / 2;
          const cube_r = Math.pow(r, 3);
          v_tank = 1.333333333 * Math.PI * cube_r;

          if (!isNaN(fill)) {
            const fillHeight = inchesConvert(parseFloat(fill), fill_units);
            if (fillHeight < diameter) {
              const r2 = fillHeight / 2;
              const cube_r2 = Math.pow(r2, 3);
              v_fill = 1.333333333 * Math.PI * cube_r2;
              per_ans = (fillHeight / four) * 100;
            } else {
              return { error: "It seems your tank is over filled." };
            }
          }
        } else {
          return { error: "Invalid input values." };
        }
      }

      // Convert volumes to different units
      if (v_tank !== undefined) {
        result.tech_v_tank = v_tank;
        result.tech_v_feet = v_tank / 1728;
        result.tech_v_liter = v_tank / 61.024;
        result.tech_v_meter = v_tank / 61024;
        result.tech_us_gallons = v_tank / 231;
        result.tech_v_yard = v_tank / 46656;
        result.tech_v_cm = v_tank * 16.387;
      }

      if (v_fill !== undefined) {
        result.tech_v_fill = v_fill;
        result.tech_v_feet_fill = v_fill / 1728;
        result.tech_v_liter_fill = v_fill / 61.024;
        result.tech_v_meter_fill = v_fill / 61024;
        result.tech_us_gallons_fill = v_fill / 231;
        result.tech_v_yard_fill = v_fill / 46656;
        result.tech_v_cm_fill = v_fill * 16.387;
        result.tech_per_ans = per_ans;
      }

      return result;
    } catch (error) {
      return { error: "Calculation error: " + error.message };
    }
  }
}

module.exports = new CalculatorsServices();
