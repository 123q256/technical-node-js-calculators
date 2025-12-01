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
  /**
   * getCalculationNormalIdealGasLawCalculator: Service Method
   * POST: /api/calculators-lol/ideal-gas-law-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationNormalIdealGasLawCalculator(body) {
    const request = body;

    if (
      isNumeric(request.tech_x) &&
      isNumeric(request.tech_y) &&
      isNumeric(request.tech_z)
    ) {
      let ans, ans1;

      if (request.tech_method == "press") {
        let volum = parseFloat(request.tech_x);

        // Volume unit conversions
        if (request.tech_x_v_unit == "cm³") {
          volum = volum / 1e6;
        }
        if (request.tech_x_v_unit == "mm³") {
          volum = volum / 1e9;
        }
        if (request.tech_x_v_unit == "dm³") {
          volum = volum / 1000;
        }
        if (request.tech_x_v_unit == "ft³") {
          volum = volum / 35.315;
        }
        if (request.tech_x_v_unit == "in³") {
          volum = volum / 61024;
        }

        let temp = parseFloat(request.tech_z);
        // Temperature unit conversions
        if (request.tech_z_t_unit == "°C") {
          temp = temp + 273.15;
        }
        if (request.tech_z_t_unit == "°F") {
          temp = ((temp - 32) * 5) / 9 + 273.15;
        }

        let amount = parseFloat(request.tech_y);
        // Amount unit conversions
        // console.log(request.tech_y_s_unit,amount);
        if (request.tech_y_s_unit == "abc") {
          amount = amount / 1e6;
        }
        if (request.tech_y_s_unit == "mmol") {
          amount = amount / 1000;
        }
        // console.log(volum,temp,amount);
        // ans = round((amount * request.R * temp) / volum, 3) + " Pascal";
        // ans1 = round((amount * request.R * temp) / volum, 3);
        ans1 = ((amount * request.tech_R * temp) / volum).toFixed(3);
        if (ans1 == "0.000") {
          ans1 = parseFloat(ans1).toFixed(1);
        }
        ans = ans1 + " Pascal";
      }

      if (request.tech_method == "volume") {
        let temp = parseFloat(request.tech_x);
        // Temperature unit conversions
        if (request.tech_x_t_unit == "°C") {
          temp = temp + 273.15;
        }
        if (request.tech_x_t_unit == "°F") {
          temp = ((temp - 32) * 5) / 9 + 273.15;
        }

        let amount = parseFloat(request.tech_y);
        // Amount unit conversions
        if (request.tech_y_s_unit == "abc") {
          amount = amount / 1e6;
        }
        if (request.tech_y_s_unit == "mmol") {
          amount = amount / 1000;
        }

        let press = parseFloat(request.tech_z);
        // Pressure unit conversions
        if (request.tech_z_p_unit == "psi") {
          press = press * 6894.757;
        }
        if (request.tech_z_p_unit == "bar") {
          press = press * 100000;
        }
        if (request.tech_z_p_unit == "atm") {
          press = press * 101325;
        }
        if (request.tech_z_p_unit == "at") {
          press = press * 98067;
        }
        if (
          request.tech_z_p_unit == "Torr" ||
          request.tech_z_p_unit == "mmHg"
        ) {
          press = press * 133.322;
        }
        if (request.tech_z_p_unit == "kPa") {
          press = press * 1000;
        }

        // ans = round((amount * request.tech_R * temp) / press, 5) + " m³";
        // ans1 = round((amount * request.tech_R * temp) / press, 5);
        ans1 = ((amount * request.tech_R * temp) / press).toFixed(5);
        if (ans1 == "0.00000") {
          ans1 = parseFloat(ans1).toFixed(1);
        }
        ans = ans1 + " m³";
      }

      if (request.tech_method == "temp") {
        let volum = parseFloat(request.tech_x);
        // Volume unit conversions
        if (request.tech_x_v_unit == "cm³") {
          volum = volum / 1e6;
        }
        if (request.tech_x_v_unit == "ft³") {
          volum = volum / 35.315;
        }
        if (request.tech_x_v_unit == "dm³") {
          volum = volum / 1000;
        }
        if (request.tech_x_v_unit == "in³") {
          volum = volum / 61024;
        }

        let amount = parseFloat(request.tech_y);
        // Amount unit conversions
        if (request.tech_y_s_unit == "abc") {
          amount = amount / 1e6;
        }
        if (request.tech_y_s_unit == "mmol") {
          amount = amount / 1000;
        }

        let press = parseFloat(request.tech_z);
        // Pressure unit conversions
        if (request.tech_z_p_unit == "psi") {
          press = press * 6894.757;
        }
        if (request.tech_z_p_unit == "bar") {
          press = press * 100000;
        }
        if (request.tech_z_p_unit == "atm") {
          press = press * 101325;
        }
        if (request.tech_z_p_unit == "at") {
          press = press * 98067;
        }
        if (
          request.tech_z_p_unit == "Torr" ||
          request.tech_z_p_unit == "mmHg"
        ) {
          press = press * 133.322;
        }
        if (request.tech_z_p_unit == "kPa") {
          press = press * 1000;
        }
        //  console.log(volum,amount,press);
        // ans = round((press * volum) / (request.tech_R * amount), 5) + " Kelvin";
        // ans1 = round((press * volum) / (request.tech_R * amount), 5);
        ans1 = ((press * volum) / (request.tech_R * amount)).toFixed(5);
        if (ans1 == "0.00000") {
          ans1 = ((press * volum) / (request.tech_R * amount)).toFixed(1);
        }
        ans = ans1 + " Kelvin";
      }

      if (request.tech_method === "sub") {
        let volum = parseFloat(request.tech_x);
        // Volume unit conversions
        if (request.tech_x_v_unit == "cm³") {
          volum = volum / 1e6;
        }
        if (request.tech_x_v_unit == "ft³") {
          volum = volum / 35.315;
        }
        if (request.tech_x_v_unit == "dm³") {
          volum = volum / 1000;
        }
        if (request.tech_x_v_unit == "in³") {
          volum = volum / 61024;
        }

        let press = parseFloat(request.tech_y);
        // Pressure unit conversions
        if (request.tech_y_p_unit == "psi") {
          press = press * 6894.757;
        }
        if (request.tech_y_p_unit == "bar") {
          press = press * 100000;
        }
        if (request.tech_y_p_unit == "atm") {
          press = press * 101325;
        }
        if (request.tech_y_p_unit == "at") {
          press = press * 98067;
        }
        if (
          request.tech_y_p_unit == "Torr" ||
          request.tech_y_p_unit == "mmHg"
        ) {
          press = press * 133.322;
        }
        if (request.tech_y_p_unit == "kPa") {
          press = press * 1000;
        }

        let temp = parseFloat(request.tech_z);
        // Temperature unit conversions
        if (request.tech_z_t_unit == "°C") {
          temp = temp + 273.15;
        }
        if (request.tech_z_t_unit == "°F") {
          temp = ((temp - 32) * 5) / 9 + 273.15;
        }
        const presssub = parseFloat(press);
        const volumsub = parseFloat(volum);
        const tempsub = parseFloat(temp);
        const Rsub = parseFloat(request.tech_R);

        ans1 = ((presssub * volumsub) / (Rsub * tempsub)).toFixed(5);
        if (ans1 == "0.00000") {
          ans1 = ((presssub * volumsub) / (Rsub * tempsub)).toFixed(1);
        }
        ans = ans1 + " mol";
      }

      return {
        tech_ans: ans,
        tech_ans1: ans1,
      };
    } else {
      return {
        error: "Please! Check Your Input.",
      };
    }
    // Helper functions
    function isNumeric(value) {
      return !isNaN(parseFloat(value)) && isFinite(value);
    }

    function round(value, decimals) {
      return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
    }
  }

  /**
   * getCalculationMoleFractionCalculator: Service Method
   * POST: /api/calculators-lol/mole-fraction-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationMoleFractionCalculator(body) {
    let x = body.tech_x;
    let y = body.tech_y;
    let z = body.tech_z;
    let a = body.tech_a;

    let unit_x = body.tech_unit_x;
    let unit_y = body.tech_unit_y;
    let unit_z = body.tech_unit_z;
    let unit_a = body.tech_unit_a;

    let divide_x = body.tech_divide_x;
    let divide_y = body.tech_divide_y;
    let divide_z = body.tech_divide_z;
    let divide_a = body.tech_divide_a;

    const param = {};

    // Helper function to check if value is numeric
    const isNumeric = (val) =>
      val !== undefined && val !== null && val !== "" && !isNaN(val);

    // Helper function to convert units to moles
    const convertToMoles = (value, unit, divideBy) => {
      let result = parseFloat(value);
      if (unit == "Gram") {
        result = result / parseFloat(divideBy);
      }
      if (unit == "Millimole") {
        result = result / 1000;
      }
      if (unit == "Kilomole") {
        result = result * 1000;
      }
      if (unit == "PoundMole") {
        result = result * 9.223e18;
      }

      return result;
    };

    // Case 1: x and y provided
    if (isNumeric(x) && isNumeric(y) && !isNumeric(z) && !isNumeric(a)) {
      if (unit_x == "Gram" && !isNumeric(divide_x)) {
        param.error = "Please enter gram value too.";
        return param;
      }
      if (unit_y == "Gram" && !isNumeric(divide_y)) {
        param.error = "Please enter gram value too.";
        return param;
      }

      const Solute = convertToMoles(x, unit_x, divide_x);
      const Solvent = convertToMoles(y, unit_y, divide_y);
      const sol = parseFloat((Solute + Solvent).toFixed(5));
      const mol = parseFloat((Solute / (Solute + Solvent)).toFixed(5));
      // console.log(Solute,Solvent);
      param.tech_Solute = Solute;
      param.tech_Solvent = Solvent;
      param.tech_sol = sol;
      param.tech_mol = mol;

      return param;
    }

    // Case 2: x and z provided
    else if (isNumeric(x) && isNumeric(z) && !isNumeric(y) && !isNumeric(a)) {
      if (unit_z == "Gram" && !isNumeric(divide_z)) {
        param.error = "Please enter gram value too.";
        return param;
      }
      if (unit_x == "Gram" && !isNumeric(divide_x)) {
        param.error = "Please enter gram value too.";
        return param;
      }

      const Solute = convertToMoles(x, unit_x, divide_x);
      const sol = convertToMoles(z, unit_z, divide_z);
      const Solvent = sol - Solute;
      const mol = parseFloat((Solute / (Solute + Solvent)).toFixed(5));

      param.tech_Solute = Solute;
      param.tech_Solvent = Solvent;
      param.tech_sol = sol;
      param.tech_mol = mol;

      return param;
    }

    // Case 3: x and a provided
    else if (isNumeric(x) && isNumeric(a) && !isNumeric(y) && !isNumeric(z)) {
      if (unit_x == "Gram" && !isNumeric(divide_x)) {
        param.error = "Please enter gram value too.";
        return param;
      }
      if (unit_a == "Gram" && !isNumeric(divide_a)) {
        param.error = "Please enter gram value too.";
        return param;
      }
      console.log(x, unit_x, divide_x);
      const Solute = convertToMoles(x, unit_x, divide_x);
      const mol = convertToMoles(a, unit_a, divide_a);
      const Solvent = parseFloat((Solute / mol - Solute).toFixed(2));
      const sol = parseFloat((Solute + Solvent).toFixed(2));
      // console.log(Solute,mol);
      param.tech_Solute = Solute;
      param.tech_Solvent = Solvent;
      param.tech_sol = sol;
      param.tech_mol = mol;

      return param;
    }

    // Case 4: y and z provided
    else if (isNumeric(y) && isNumeric(z) && !isNumeric(x) && !isNumeric(a)) {
      if (unit_z == "Gram" && !isNumeric(divide_z)) {
        param.error = "Please enter gram value too.";
        return param;
      }
      if (unit_y == "Gram" && !isNumeric(divide_y)) {
        param.error = "Please enter gram value too.";
        return param;
      }

      const sol = convertToMoles(z, unit_z, divide_z);
      const Solvent = convertToMoles(y, unit_y, divide_y);
      const Solute = sol - Solvent;
      const mol = parseFloat((Solute / (Solute + Solvent)).toFixed(5));

      param.tech_Solute = Solute;
      param.tech_Solvent = Solvent;
      param.tech_sol = sol;
      param.tech_mol = mol;

      return param;
    }

    // Case 5: y and a provided
    else if (isNumeric(y) && isNumeric(a) && !isNumeric(x) && !isNumeric(z)) {
      if (unit_a == "Gram" && !isNumeric(divide_a)) {
        param.error = "Please enter gram value too.";
        return param;
      }
      if (unit_y == "Gram" && !isNumeric(divide_y)) {
        param.error = "Please enter gram value too.";
        return param;
      }

      const Solvent = convertToMoles(y, unit_y, divide_y);
      const mol = convertToMoles(a, unit_a, divide_a);
      const Solute = parseFloat(((mol * Solvent * -1) / (mol - 1)).toFixed(3));
      const sol = Solute + Solvent;

      param.tech_Solute = Solute;
      param.tech_Solvent = Solvent;
      param.tech_sol = sol;
      param.tech_mol = mol;

      return param;
    }

    // Case 6: z and a provided
    else if (isNumeric(z) && isNumeric(a) && !isNumeric(x) && !isNumeric(y)) {
      if (unit_a == "Gram" && !isNumeric(divide_a)) {
        param.error = "Please enter gram value too.";
        return param;
      }
      if (unit_z == "Gram" && !isNumeric(divide_z)) {
        param.error = "Please enter gram value too.";
        return param;
      }

      const mol = convertToMoles(a, unit_a, divide_a);
      const sol = convertToMoles(z, unit_z, divide_z);
      const Solute = parseFloat((sol * mol).toFixed(3));
      const Solvent = sol - Solute;

      param.tech_Solute = Solute;
      param.tech_Solvent = Solvent;
      param.tech_sol = sol;
      param.tech_mol = mol;

      return param;
    }

    // Default case: error
    else {
      param.error = "Please fill any two fields.";
      return param;
    }
  }
  /** getCalculationPercentYieldCalculator
   * POST: /api/calculators-lol/percent-yield-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationPercentYieldCalculator(body) {
    let method = body.tech_method;
    let x = body.tech_x;
    let y = body.tech_y;
    let z = body.tech_z;
    let unit_x = body.tech_unit_x;
    let unit_y = body.tech_unit_y;

    let result = {};

    // Convert unit values
    function convertToGrams(value, unit) {
      if (unit === "µg") return value / 1e6;
      if (unit === "mg") return value / 1000;
      if (unit === "kg") return value * 1000;
      if (unit === "lbs") return value * 454;
      return value;
    }

    if (method === "1") {
      if (!isNaN(x) && !isNaN(y)) {
        let actual = convertToGrams(parseFloat(y), unit_y);
        let ther = convertToGrams(parseFloat(x), unit_x);
        let ans = Math.round((actual / ther) * 100 * 100) / 100;
        result.tech_ans = ans;
      } else {
        result.error = "Please Fill All Fields.";
      }
    }

    if (method === "2") {
      if (!isNaN(z) && !isNaN(y)) {
        let actual = convertToGrams(parseFloat(y), unit_y);
        let ans = Math.round((actual / parseFloat(z)) * 100 * 100) / 100;
        result.tech_ans = ans;
      } else {
        result.error = "Please Fill All Fields.";
      }
    }

    if (method === "3") {
      if (!isNaN(z) && !isNaN(y)) {
        let actual = convertToGrams(parseFloat(y), unit_y);
        let ans = Math.round(((actual * parseFloat(z)) / 100) * 100) / 100;
        result.tech_ans = ans;
      } else {
        result.error = "Please Fill All Fields.";
      }
    }

    return result;
  }

  /** getCalculationTheoreticalyieldCalculator
   * POST: /api/calculators-lol/theoretical-yield-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationTheoreticalyieldCalculator(body) {
    let lx = parseFloat(body.tech_lx);
    let ly = parseFloat(body.tech_ly);
    let dx = parseFloat(body.tech_dx);
    let dy = parseFloat(body.tech_dy);
    let sx = parseFloat(body.tech_sx);
    let unit_x = body.tech_unit_x;

    let response = {};

    if (
      isFinite(lx) &&
      isFinite(ly) &&
      isFinite(dx) &&
      isFinite(dy) &&
      isFinite(sx)
    ) {
      let mass = lx;

      if (unit_x === "µg") {
        mass = mass / 1e6;
      } else if (unit_x === "mg") {
        mass = mass / 1000;
      } else if (unit_x === "kg") {
        mass = mass * 1000;
      } else if (unit_x === "lbs") {
        mass = mass * 454;
      }

      let mole = Math.round((mass / ly) * 100) / 100; // rounded to 2 decimal places
      let ans = Math.round(dx * dy * 100) / 100;
      let st = Math.round(dx * (sx / mole) * 100) / 100;

      response.tech_mole = mole;
      response.tech_st = st;
      response.tech_ans = ans;
      return response;
    } else {
      return { error: "Please! Check Your Input." };
    }
  }
  /** getCalculationEmpiricalFormulaCalculator
   * POST: /api/calculators-lol/empirical-formula-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationEmpiricalFormulaCalculator(body) {
    let e1 = body.tech_e1;
    let e2 = body.tech_e2;
    let e3 = body.tech_e3;
    let e4 = body.tech_e4;
    let e5 = body.tech_e5;
    let e6 = body.tech_e6;
    let m1 = body.tech_m1;
    let m2 = body.tech_m2;
    let m3 = body.tech_m3;
    let m4 = body.tech_m4;
    let m5 = body.tech_m5;
    let m6 = body.tech_m6;

    let periodicValues = {
      H: 1.008,
      He: 4.0026,
      Li: 6.94,
      Be: 9.0122,
      B: 10.81,
      C: 12.011,
      N: 14.007,
      O: 15.999,
      F: 18.998,
      Ne: 20.18,
      Na: 22.99,
      Mg: 24.305,
      Al: 26.982,
      Si: 28.085,
      P: 30.974,
      S: 32.06,
      Cl: 35.45,
      Ar: 39.948,
      K: 39.098,
      Ca: 40.078,
      Sc: 44.956,
      Ti: 47.867,
      V: 50.942,
      Cr: 51.996,
      Mn: 54.938,
      Fe: 55.845,
      Co: 58.933,
      Ni: 58.693,
      Cu: 63.546,
      Zn: 65.38,
      Ga: 69.723,
      Ge: 72.63,
      As: 74.922,
      Se: 78.971,
      Br: 79.904,
      Kr: 83.798,
      Rb: 85.468,
      Sr: 87.62,
      Y: 88.906,
      Zr: 91.224,
      Nb: 92.906,
      Mo: 95.95,
      Tc: 98,
      Ru: 101.07,
      Rh: 102.91,
      Pd: 106.42,
      Ag: 107.87,
      Cd: 112.41,
      In: 114.82,
      Sn: 118.71,
      Sb: 121.76,
      Te: 127.6,
      I: 126.9,
      Xe: 131.29,
      Cs: 132.91,
      Ba: 137.33,
      La: 138.91,
      Ce: 140.12,
      Pr: 140.91,
      Nd: 144.24,
      Pm: 145,
      Sm: 150.36,
      Eu: 151.96,
      Gd: 157.25,
      Tb: 158.93,
      Dy: 162.5,
      Ho: 164.93,
      Er: 167.26,
      Tm: 168.93,
      Yb: 173.05,
      Lu: 174.97,
      Hf: 178.49,
      Ta: 180.95,
      W: 183.84,
      Re: 186.21,
      Os: 190.23,
      Ir: 192.22,
      Pt: 195.08,
      Au: 196.97,
      Hg: 200.59,
      Tl: 204.38,
      Pb: 207.2,
      Bi: 208.98,
      Po: 209,
      At: 210,
      Rn: 222,
      Fr: 223,
      Ra: 226,
      Ac: 227,
      Th: 232.04,
      Pa: 231.04,
      U: 238.03,
      Np: 237,
      Pu: 244,
      Am: 243,
      Cm: 247,
      Bk: 247,
      Cf: 251,
      Es: 252,
      Fm: 257,
      Md: 258,
      No: 259,
      Lr: 266,
      Rf: 267,
      Db: 268,
      Sg: 269,
      Bh: 270,
      Hs: 277,
      Mt: 278,
      Ds: 281,
      Rg: 282,
      Cn: 285,
      Nh: 286,
      Fl: 289,
      Mc: 290,
      Lv: 293,
      Ts: 294,
      Og: 294,
    };

    let param = {};
    let check = true;
    let values = [];

    for (let i = 1; i <= 6; i++) {
      let e = body[`tech_e${i}`];
      let m = body[`tech_m${i}`];

      if (e && !isNaN(m)) {
        e = String(e).trim();
        values.push(`${e}-${m}`);
      } else if ((e && isNaN(m)) || (!e && m)) {
        check = false;
      }
    }

    let moles = [],
      s1 = "",
      s2 = "",
      s3 = "",
      s4 = "",
      s5 = "",
      s6 = "",
      res = [];

    if (check && values.length) {
      for (let val of values) {
        let [symbol, mass] = val.split("-");
        let el =
          symbol.trim().charAt(0).toUpperCase() +
          symbol.trim().slice(1).toLowerCase();

        s1 += `<td class='border-b p-2 text-[18px]'> ${el} </td>`;
        param.tech_s1 = s1;

        if (periodicValues[el]) {
          let mol = Number(mass) / periodicValues[el];
          moles.push(mol);
          s2 += `<td class='border-b p-2 text-[18px]'> ${mass}g </td>`;
          s3 += `<td class='border-b p-2 text-[22px]'>\\( \\frac {${mass}}{${periodicValues[el]}} \\)</td>`;
          param.tech_s2 = s2;
          param.tech_s3 = s3;
        } else {
          return { error: "Please! Check Your Input" };
        }
      }

      let minVal = Math.min(...moles);

      moles.forEach((mol, idx) => {
        let rounded = Math.round(mol);
        let ratio = Math.round(mol / minVal);
        s4 += `<td class='border-b p-2 text-[18px]'> ${rounded} </td>`;
        s5 += `<td class='border-b p-2 text-[22px]'>\\( \\frac {${rounded}}{${Math.round(
          minVal
        )}} \\)</td>`;
        s6 += `<td class='border-b p-2 text-[18px]'>${ratio}</td>`;
        res.push(ratio === 1 ? "" : ratio);
      });

      param.tech_s4 = s4;
      param.tech_s5 = s5;
      param.tech_s6 = s6;

      let formula = values
        .map((val, idx) => {
          let el = val.split("-")[0];
          let sym =
            el.trim().charAt(0).toUpperCase() +
            el.trim().slice(1).toLowerCase();
          return `${sym}<sub class='text-green'>${res[idx]}</sub>`;
        })
        .join("");

      param.tech_formula = formula;
      param.tech_count = values.length;
      return param;
    } else {
      return { error: "Please! Check Your Input." };
    }
  }

  /**
   * getCalculationCharlesLawCalculator: Service Method
   * POST: /api/calculators-lol/charles-law-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationCharlesLawCalculator(body) {
    let find = body.tech_find;
    let v1 = body.tech_v1;
    let v1_unit = body.tech_v1_unit;
    let t1 = body.tech_t1;
    let t1_unit = body.tech_t1_unit;
    let v2 = body.tech_v2;
    let v2_unit = body.tech_v2_unit;
    let t2 = body.tech_t2;
    let t2_unit = body.tech_t2_unit;
    let p = body.tech_p;
    let n = body.tech_n;
    let R = body.tech_R;
    let p_unit = body.tech_p_unit;

    const result = {};

    // Check if all required values are numeric
    if (
      isNaN(parseFloat(v1)) ||
      isNaN(parseFloat(t1)) ||
      isNaN(parseFloat(v2)) ||
      isNaN(parseFloat(t2)) ||
      isNaN(parseFloat(p)) ||
      isNaN(parseFloat(n)) ||
      isNaN(parseFloat(R))
    ) {
      result.error = "Please! Check Your Input.";
      return result;
    }

    // Convert to numbers
    let v1_converted = parseFloat(v1);
    let t1_converted = parseFloat(t1);
    let v2_converted = parseFloat(v2);
    let t2_converted = parseFloat(t2);
    let p_converted = parseFloat(p);
    let n_converted = parseFloat(n);
    let R_converted = parseFloat(R);

    // Unit Conversion for V1
    if (!isNaN(v1_converted)) {
      if (v1_unit === "mm³") {
        v1_converted = v1_converted / 1000000000;
      } else if (v1_unit === "cm³" || v1_unit === "ml") {
        v1_converted = v1_converted / 1000000;
      } else if (v1_unit === "dm³" || v1_unit === "liters") {
        v1_converted = v1_converted / 1000;
      } else if (v1_unit === "cu in") {
        v1_converted = v1_converted / 61024;
      } else if (v1_unit === "cu ft") {
        v1_converted = v1_converted / 35.315;
      } else if (v1_unit === "cu yd") {
        v1_converted = v1_converted / 1.308;
      }
    }

    // Unit Conversion for T1
    if (!isNaN(t1_converted)) {
      if (t1_unit === "c" || t1_unit === "°C") {
        t1_converted = t1_converted + 273.15;
      } else if (t1_unit === "f" || t1_unit === "°F") {
        t1_converted = (t1_converted - 32) * (5 / 9) + 273.15;
      }
    }

    // Unit Conversion for V2
    if (!isNaN(v2_converted)) {
      if (v2_unit === "mm³") {
        v2_converted = v2_converted / 1000000000;
      } else if (v2_unit === "cm³" || v2_unit === "ml") {
        v2_converted = v2_converted / 1000000;
      } else if (v2_unit === "dm³" || v2_unit === "liters") {
        v2_converted = v2_converted / 1000;
      } else if (v2_unit === "cu in") {
        v2_converted = v2_converted / 61024;
      } else if (v2_unit === "cu ft") {
        v2_converted = v2_converted / 35.315;
      } else if (v2_unit === "cu yd") {
        v2_converted = v2_converted / 1.308;
      }
    }

    // Unit Conversion for T2
    if (!isNaN(t2_converted)) {
      if (t2_unit === "c" || t2_unit === "°C") {
        t2_converted = t2_converted + 273.15;
      } else if (t2_unit === "f" || t2_unit === "°F") {
        t2_converted = (t2_converted - 32) * (5 / 9) + 273.15;
      }
    }

    // Unit Conversion for P (pressure)
    if (!isNaN(p_converted)) {
      if (p_unit === "bar") {
        p_converted = p_converted / 0.00001;
      } else if (p_unit === "psi") {
        p_converted = p_converted / 0.00014504;
      } else if (p_unit === "at") {
        p_converted = p_converted / 0.000010197;
      } else if (p_unit === "atm") {
        p_converted = p_converted / 0.00000987;
      } else if (p_unit === "Torr") {
        p_converted = p_converted / 0.0075;
      } else if (p_unit === "hPa") {
        p_converted = p_converted / 0.01;
      } else if (p_unit === "kPa") {
        p_converted = p_converted / 0.001;
      } else if (p_unit === "MPa") {
        p_converted = p_converted / 0.000001;
      } else if (p_unit === "GPa") {
        p_converted = p_converted / 0.000000001;
      } else if (p_unit === "in Hg") {
        p_converted = p_converted / 0.0002953;
      } else if (p_unit === "mmHg") {
        p_converted = p_converted / 0.0075;
      }
    }

    // Calculations based on 'find' parameter
    if (
      find === "v1" &&
      !isNaN(t1_converted) &&
      !isNaN(v2_converted) &&
      !isNaN(t2_converted)
    ) {
      const v1_result = (v2_converted / t2_converted) * t1_converted;
      console.log(v2_converted, t2_converted, t1_converted);
      const mm3 = v1_result * 1000000000;
      const cm3 = v1_result * 1000000;
      const dm3 = v1_result * 1000;
      const cu_in = v1_result * 61024;
      const cu_ft = v1_result * 35.315;
      const cu_yd = v1_result * 1.308;
      const p_val = 101325;
      const n_val = (p_val * v1_result) / (R_converted * t1_converted);

      result.tech_v1 = Math.round(v1_result * 100000) / 100000;
      result.tech_p = p_val;
      result.tech_n = Math.round(n_val * 100000) / 100000;
      result.tech_mm3 = mm3;
      result.tech_cm3 = cm3;
      result.tech_dm3 = dm3;
      result.tech_cu_in = cu_in;
      result.tech_cu_ft = cu_ft;
      result.tech_cu_yd = cu_yd;
    } else if (
      find === "t1" &&
      !isNaN(v1_converted) &&
      !isNaN(v2_converted) &&
      !isNaN(t2_converted)
    ) {
      const t1_result = (t2_converted / v2_converted) * v1_converted;
      const c = t1_result - 273.15;
      const f = (t1_result - 273.15) * (9 / 5) + 32;
      const p_val = 101325;
      const n_val = (p_val * v1_converted) / (R_converted * t1_result);

      result.tech_t1 = Math.round(t1_result * 100000) / 100000;
      result.tech_p = p_val;
      result.tech_n = Math.round(n_val * 100000) / 100000;
      result.tech_c = c;
      result.tech_f = f;
    } else if (
      find === "v2" &&
      !isNaN(v1_converted) &&
      !isNaN(t1_converted) &&
      !isNaN(t2_converted)
    ) {
      const v2_result = (v1_converted / t1_converted) * t2_converted;
      const mm3 = v2_result * 1000000000;
      const cm3 = v2_result * 1000000;
      const dm3 = v2_result * 1000;
      const cu_in = v2_result * 61024;
      const cu_ft = v2_result * 35.315;
      const cu_yd = v2_result * 1.308;
      const p_val = 101325;
      const n_val = (p_val * v1_converted) / (R_converted * t1_converted);

      result.tech_v2 = Math.round(v2_result * 100000) / 100000;
      result.tech_p = p_val;
      result.tech_n = Math.round(n_val * 100000) / 100000;
      result.tech_mm3 = mm3;
      result.tech_cm3 = cm3;
      result.tech_dm3 = dm3;
      result.tech_cu_in = cu_in;
      result.tech_cu_ft = cu_ft;
      result.tech_cu_yd = cu_yd;
    } else if (
      find === "t2" &&
      !isNaN(v1_converted) &&
      !isNaN(t1_converted) &&
      !isNaN(v2_converted)
    ) {
      const t2_result = (t1_converted / v1_converted) * v2_converted;
      const c = t2_result - 273.15;
      const f = (t2_result - 273.15) * (9 / 5) + 32;
      const p_val = 101325;
      const n_val = (p_val * v1_converted) / (R_converted * t1_converted);

      result.tech_t2 = Math.round(t2_result * 100000) / 100000;
      result.tech_p = p_val;
      result.tech_n = Math.round(n_val * 100000) / 100000;
      result.tech_c = c;
      result.tech_f = f;
    } else if (
      find === "p" &&
      !isNaN(v1_converted) &&
      !isNaN(t1_converted) &&
      !isNaN(v2_converted) &&
      !isNaN(t2_converted) &&
      !isNaN(n_converted) &&
      !isNaN(R_converted)
    ) {
      const p_result =
        (n_converted * R_converted * t1_converted) / v1_converted;
      const bar = p_result * 0.00001;
      const psi = p_result * 0.00014504;
      const at = p_result * 0.000010197;
      const atm = p_result * 0.00000987;
      const torr = p_result * 0.0075;
      const hpa = p_result * 0.01;
      const kpa = p_result * 0.001;
      const mpa = p_result * 0.000001;
      const gpa = p_result * 0.000000001;
      const in_hg = p_result * 0.0002953;
      const mmhg = p_result * 0.0075;

      result.tech_p_val = Math.round(p_result * 100000) / 100000;
      result.tech_bar = bar;
      result.tech_psi = psi;
      result.tech_at = at;
      result.tech_atm = atm;
      result.tech_torr = torr;
      result.tech_hpa = hpa;
      result.tech_kpa = kpa;
      result.tech_mpa = mpa;
      result.tech_gpa = gpa;
      result.tech_in_hg = in_hg;
      result.tech_mmhg = mmhg;
    } else if (
      find === "n" &&
      !isNaN(v1_converted) &&
      !isNaN(t1_converted) &&
      !isNaN(v2_converted) &&
      !isNaN(t2_converted) &&
      !isNaN(p_converted) &&
      !isNaN(R_converted)
    ) {
      const n_result =
        (p_converted * v1_converted) / (R_converted * t1_converted);
      result.n_val = Math.round(n_result * 100000) / 100000;
    } else {
      result.error = "Please! Fill All The Fields.";
      return result;
    }

    result.RESULT = 1;
    return result;
  }

  /** getCalculationElectronConfigurationCalculator
   * POST: /api/calculators-lol/electron-configuration-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationElectronConfigurationCalculator(body) {
    let element = body.tech_element;

    if (!element) {
      return { error: "Element is required" };
    }

    const periodicTable = {
      H: [1, "Hydrogen", "Gas", 1.008, "1s¹", "N/A", "1s¹"],
      He: [2, "Helium", "Gas", 4.0026, "1s²", "N/A", "1s²"],
      Li: [3, "Lithium", "Solid", 6.94, "1s²2s¹", "[He]2s¹", "2s¹"],
      Be: [4, "Beryllium", "Solid", 9.0122, "1s²2s²", "[He]2s²", "2s²"],
      B: [5, "Boron", "Solid", 10.81, "1s²2s²2p¹", "[He]2s²2p¹", "2s²2p¹"],
      C: [6, "Carbon", "Solid", 12.011, "1s²2s²2p²", "[He]2s²2p²", "2s²2s²"],
      N: [7, "Nitrogen", "Gas", 14.007, "1s²2s²2p³", "[He]2s²2p³", "2s²2p³"],
      O: [8, "Oxygen", "Gas", 15.999, "1s²2s²2p⁴", "[He]2s²2p⁴", "2s²2p⁴"],
      F: [9, "Fluorine", "Gas", 18.998, "1s²2s²2p⁵", "[He]2s²2p⁵", "2s²2p⁵"],
      Ne: [10, "Neon", "Gas", 20.18, "1s²2s²2p⁶", "[He]2s²2p⁶", "2s²2p⁶"],
      Na: [11, "Sodium", "Solid", 22.99, "1s²2s²2p⁶3s¹", "[Ne]3s¹", "3s¹"],
      Mg: [12, "Magnesium", "Solid", 24.305, "1s²2s²2p⁶3s²", "[Ne]3s²", "3s²"],
      Al: [
        13,
        "Aluminum",
        "Solid",
        26.982,
        "1s²2s²2p⁶3s²3p¹",
        "[Ne]3s²3p¹",
        "3s²3p¹",
      ],
      Si: [
        14,
        "Silicon",
        "Solid",
        28.085,
        "1s²2s²2p⁶3s²3p²",
        "[Ne]3s²3p²",
        "3s²3p²",
      ],
      P: [
        15,
        "Phosphorus",
        "Solid",
        30.974,
        "1s²2s²2p⁶3s²3p³",
        "[Ne]3s²3p³",
        "3s²3p³",
      ],
      S: [
        16,
        "Sulfur",
        "Solid",
        32.06,
        "1s²2s²2p⁶3s²3p⁴",
        "[Ne]3s²3p⁴",
        "3s²3p⁴",
      ],
      Cl: [
        17,
        "Chlorine",
        "Gas",
        35.45,
        "1s²2s²2p⁶3s²3p⁵",
        "[Ne]3s²3p⁵",
        "3s²3p⁵",
      ],
      Ar: [
        18,
        "Argon",
        "Gas",
        39.948,
        "1s²2s²2p⁶3s²3p⁶",
        "[Ne]3s²3p⁶",
        "3s²3p⁶",
      ],
      K: [
        19,
        "Potassium",
        "Solid",
        39.098,
        "1s²2s²2p⁶3s²3p⁶4s¹",
        "[Ar]4s¹",
        "4s¹",
      ],
      Ca: [
        20,
        "Calcium",
        "Solid",
        40.078,
        "1s²2s²2p⁶3s²3p⁶4s²",
        "[Ar]4s²",
        "4s²",
      ],
      Sc: [
        21,
        "Scandium",
        "Solid",
        44.956,
        "1s²2s²2p⁶3s²3p⁶3d¹4s²",
        "[Ar]4s²3d¹",
        "3d¹4s²",
      ],
      Ti: [
        22,
        "Titanium",
        "Solid",
        47.867,
        "1s²2s²2p⁶3s²3p⁶3d²4s²",
        "[Ar]4s²3d²",
        "3d²4s²",
      ],
      V: [
        23,
        "Vanadium",
        "Solid",
        50.942,
        "1s²2s²2p⁶3s²3p⁶3d³4s²",
        "[Ar]4s²3d³",
        "3d³4s²",
      ],
      Cr: [
        24,
        "Chromium",
        "Solid",
        51.996,
        "1s²2s²2p⁶3s²3p⁶3d⁵4s¹",
        "[Ar]3d⁵4s¹",
        "3d⁵4s¹",
      ],
      Mn: [
        25,
        "Manganese",
        "Solid",
        54.938,
        "1s²2s²2p⁶3s²3p⁶3d⁵4s²",
        "[Ar]4s²3d⁵",
        "3d⁵4s²",
      ],
      Fe: [
        26,
        "Iron",
        "Solid",
        55.845,
        "1s²2s²2p⁶3s²3p⁶3d64s²",
        "[Ar]4s²3d⁶",
        "3d64s²",
      ],
      Co: [
        27,
        "Cobalt",
        "Solid",
        58.933,
        "1s²2s²2p⁶3s²3p⁶3d⁷4s²",
        "[Ar]4s²3d⁷",
        "3d⁷4s²",
      ],
      Ni: [
        28,
        "Nickel",
        "Solid",
        58.693,
        "1s²2s²2p⁶3s²3p⁶3d⁸4s²",
        "[Ar]4s²3d⁸",
        "3d⁸4s²",
      ],
      Cu: [
        29,
        "Copper",
        "Solid",
        63.546,
        "1s²2s²2p⁶3s²3p⁶3d¹⁰4s¹",
        "[Ar]4s¹3d¹⁰",
        "3d¹⁰4s¹",
      ],
      Zn: [
        30,
        "Zinc",
        "Solid",
        65.38,
        "1s²2s²2p⁶3s²3p⁶3d¹⁰4s²",
        "[Ar]4s²3d¹⁰",
        "3d¹⁰4s²",
      ],
      Ga: [
        31,
        "Gallium",
        "Solid",
        69.723,
        "1s²2s²2p⁶3s²3p⁶3d¹⁰4s²4p¹",
        "[Ar]4s²3d¹⁰4p¹",
        "4s²4p¹",
      ],
      Ge: [
        32,
        "Germanium",
        "Solid",
        72.63,
        "1s²2s²2p⁶3s²3p⁶3d¹⁰4s²4p²",
        "[Ar]4s²3d¹⁰4p²",
        "4s²4p²",
      ],
      As: [
        33,
        "Arsenic",
        "Solid",
        74.922,
        "1s²2s²2p⁶3s²3p⁶3d¹⁰4s²4p³",
        "[Ar]4s²3d¹⁰4p³",
        "4s²4p³",
      ],
      Se: [
        34,
        "Selenium",
        "Solid",
        78.971,
        "1s²2s²2p⁶3s²3p⁶3d¹⁰4s²4p⁴",
        "[Ar]4s²3d¹⁰4p⁴",
        "4s²4p⁴",
      ],
      Br: [
        35,
        "Bromine",
        "Liquid",
        79.904,
        "1s²2s²2p⁶3s²3p⁶3d¹⁰4s²4p⁵",
        "[Ar]4s²3d¹⁰4p⁵",
        "4s²4p⁵",
      ],
      Kr: [
        36,
        "Krypton",
        "Gas",
        83.798,
        "1s²2s²2p⁶3s²3p⁶3d¹⁰4s²4p⁶",
        "[Ar]4s²3d¹⁰4p⁶",
        "4s²4p⁶",
      ],
      Rb: [
        37,
        "Rubidium",
        "Solid",
        85.468,
        "1s²2s²2p⁶3s²3p⁶3d¹⁰4s²4p⁶5s¹",
        "[Kr]5s¹",
        "5s¹",
      ],
      Sr: [
        38,
        "Strontium",
        "Solid",
        87.62,
        "1s²2s²2p⁶3s²3p⁶3d¹⁰4s²4p⁶5s²",
        "[Kr]5s²",
        "5s²",
      ],
      Y: [
        39,
        "Yttrium",
        "Solid",
        88.906,
        "1s²2s²2p⁶3s²3p⁶3d¹⁰4s²4p⁶4d¹5s²",
        "[Kr]5s²4d¹",
        "4d¹5s²",
      ],
      Zr: [
        40,
        "Zirconium",
        "Solid",
        91.224,
        "1s²2s²2p⁶3s²3p⁶3d¹⁰4s²4p⁶4d²5s²",
        "[Kr]5s²4d²",
        "4d²5s²",
      ],
      Nb: [
        41,
        "Niobium",
        "Solid",
        92.906,
        "1s²2s²2p⁶3s²3p⁶3d¹⁰4s²4p⁶4d⁴5s¹",
        "[Kr]5s¹4d⁴",
        "4d⁴5s¹",
      ],
      Mo: [
        42,
        "Molybdenum",
        "Solid",
        95.95,
        "1s²2s²2p⁶3s²3p⁶3d¹⁰4s²4p⁶4d⁵5s¹",
        "[Kr]5s¹4d⁵",
        "4d⁵5s¹",
      ],
      Tc: [
        43,
        "Technetium",
        "Solid",
        98,
        "1s²2s²2p⁶3s²3p⁶3d¹⁰4s²4p⁶4d⁵5s²",
        "[Kr]5s²4d⁵",
        "4d⁵5s²",
      ],
      Ru: [
        44,
        "Ruthenium",
        "Solid",
        101.07,
        "1s²2s²2p⁶3s²3p⁶3d¹⁰4s²4p⁶4d⁷5s¹",
        "[Kr]5s¹4d⁷",
        "4d⁷5s¹",
      ],
      Rh: [
        45,
        "Rhodium",
        "Solid",
        102.91,
        "1s²2s²2p⁶3s²3p⁶3d¹⁰4s²4p⁶4d⁸5s¹",
        "[Kr]5s¹4d⁸",
        "4d⁸5s¹",
      ],
      Pd: [
        46,
        "Palladium",
        "Solid",
        106.42,
        "1s²2s²2p⁶3s²3p⁶3d¹⁰4s²4p⁶4d¹⁰",
        "[Kr]4d¹⁰",
        "4d¹⁰",
      ],
      Ag: [
        47,
        "Silver",
        "Solid",
        107.87,
        "1s²2s²2p⁶3s²3p⁶3d¹⁰4s²4p⁶4d¹⁰5s¹",
        "[Kr]5s¹4d¹⁰",
        "4d¹⁰5s¹",
      ],
      Cd: [
        48,
        "Cadmium",
        "Solid",
        112.41,
        "1s²2s²2p⁶3s²3p⁶3d¹⁰4s²4p⁶4d¹⁰5s²",
        "[Kr]5s²4d¹⁰",
        "4d¹⁰5s²",
      ],
      In: [
        49,
        "Indium",
        "Solid",
        114.82,
        "1s²2s²2p⁶3s²3p⁶3d¹⁰4s²4p⁶4d¹⁰5s²5p¹",
        "[Kr]5s²4d¹⁰5p¹",
        "5s²5p¹",
      ],
      Sn: [
        50,
        "Tin",
        "Solid",
        118.71,
        "1s²2s²2p⁶3s²3p⁶3d¹⁰4s²4p⁶4d¹⁰5s²5p²",
        "[Kr]5s²4d¹⁰5p²",
        "5s²5p²",
      ],
      Sb: [
        51,
        "Antimony",
        "Solid",
        121.76,
        "1s²2s²2p⁶3s²3p⁶3d¹⁰4s²4p⁶4d¹⁰5s²5p³",
        "[Kr]5s²4d¹⁰5p³",
        "5s²5p³",
      ],
      Te: [
        52,
        "Tellurium",
        "Solid",
        127.6,
        "1s²2s²2p⁶3s²3p⁶3d¹⁰4s²4p⁶4d¹⁰5s²5p⁴",
        "[Kr]5s²4d¹⁰5p⁴",
        "5s²5p⁴",
      ],
      I: [
        53,
        "Iodine",
        "Solid",
        126.9,
        "1s²2s²2p⁶3s²3p⁶3d¹⁰4s²4p⁶4d¹⁰5s²5p⁵",
        "[Kr]5s²4d¹⁰5p⁵",
        "5s²5p⁵",
      ],
      Xe: [
        54,
        "Xenon",
        "Gas",
        131.29,
        "1s²2s²2p⁶3s²3p⁶3d¹⁰4s²4p⁶4d¹⁰5s²5p⁶",
        "[Kr]5s²4d¹⁰5p⁶",
        "5s²5p⁶",
      ],
      Cs: [
        55,
        "Cesium",
        "Solid",
        132.91,
        "1s²2s²2p⁶3s²3p⁶3d¹⁰4s²4p⁶4d¹⁰5s²5p⁶6s¹",
        "[Xe]6s¹",
        "6s¹",
      ],
      Ba: [
        56,
        "Barium",
        "Solid",
        137.33,
        "1s²2s²2p⁶3s²3p⁶3d¹⁰4s²4p⁶4d¹⁰5s²5p⁶6s²",
        "[Xe]6s²",
        "6s²",
      ],
      La: [
        57,
        "Lanthanum",
        "Solid",
        138.91,
        "1s²2s²2p⁶3s²3p⁶3d¹⁰4s²4p⁶4d¹⁰5s²5p⁶6s²5d¹",
        "[Xe]6s²5d¹",
        "6s²5d¹",
      ],
      Ce: [
        58,
        "Cerium",
        "Solid",
        140.12,
        "1s²2s²2p⁶3s²3p⁶3d¹⁰4s²4p⁶4d¹⁰5s²5p⁶6s²4f¹5d¹",
        "[Xe]6s²4f¹5d¹",
        "6s²4f¹5d¹",
      ],
      Pr: [
        59,
        "Praseodymium",
        "Solid",
        140.91,
        "1s²2s²2p⁶3s²3p⁶3d¹⁰4s²4p⁶4d¹⁰5s²5p⁶6s²4f³",
        "[Xe]6s²4f³",
        "6s²4f³",
      ],
      Nd: [
        60,
        "Neodymium",
        "Solid",
        144.24,
        "1s²2s²2p⁶3s²3p⁶3d¹⁰4s²4p⁶4d¹⁰5s²5p⁶6s²4f⁴",
        "[Xe]6s²4f⁴",
        "6s²4f⁴",
      ],
      Pm: [
        61,
        "Promethium",
        "Solid",
        145,
        "1s²2s²2p⁶3s²3p⁶3d¹⁰4s²4p⁶4d¹⁰5s²5p⁶6s²4f⁵",
        "[Xe]6s²4f⁵",
        "6s²4f⁵",
      ],
      Sm: [
        62,
        "Samarium",
        "Solid",
        150.36,
        "1s²2s²2p⁶3s²3p⁶3d¹⁰4s²4p⁶4d¹⁰5s²5p⁶6s²4f⁶",
        "[Xe]6s²4f⁶",
        "6s²4f⁶",
      ],
      Eu: [
        63,
        "Europium",
        "Solid",
        151.96,
        "1s²2s²2p⁶3s²3p⁶3d¹⁰4s²4p⁶4d¹⁰5s²5p⁶6s²4f⁷",
        "[Xe]6s²4f⁷",
        "6s²4f⁷",
      ],
      Gd: [
        64,
        "Gadolinium",
        "Solid",
        157.25,
        "1s²2s²2p⁶3s²3p⁶3d¹⁰4s²4p⁶4d¹⁰5s²5p⁶5d¹6s²4f⁷",
        "[Xe]6s²4f⁷5d¹",
        "6s²4f⁷5d¹",
      ],
      Tb: [
        65,
        "Terbium",
        "Solid",
        158.93,
        "1s²2s²2p⁶3s²3p⁶3d¹⁰4s²4p⁶4d¹⁰5s²5p⁶6s²4f⁹",
        "[Xe]6s²4f⁹",
        "6s²4f⁹",
      ],
      Dy: [
        66,
        "Dysprosium",
        "Solid",
        162.5,
        "1s²2s²2p⁶3s²3p⁶3d¹⁰4s²4p⁶4d¹⁰5s²5p⁶6s²4f¹⁰",
        "[Xe]6s²4f¹⁰",
        "6s²4f¹⁰",
      ],
      Ho: [
        67,
        "Holmium",
        "Solid",
        164.93,
        "1s²2s²2p⁶3s²3p⁶3d¹⁰4s²4p⁶4d¹⁰5s²5p⁶6s²4f¹¹",
        "[Xe]6s²4f¹¹",
        "6s²4f¹¹",
      ],
      Er: [
        68,
        "Erbium",
        "Solid",
        167.26,
        "1s²2s²2p⁶3s²3p⁶3d¹⁰4s²4p⁶4d¹⁰5s²5p⁶6s²4f¹²",
        "[Xe]6s²4f¹²",
        "6s²4f¹²",
      ],
      Tm: [
        69,
        "Thulium",
        "Solid",
        168.93,
        "1s²2s²2p⁶3s²3p⁶4s²3d¹⁰4p⁶4d¹⁰5s²5p⁶6s²4f¹³",
        "[Xe]6s²4f¹³",
        "6s²4f¹³",
      ],
      Yb: [
        70,
        "Ytterbium",
        "Solid",
        173.05,
        "1s²2s²2p⁶3s²3p⁶4s²3d¹⁰4p⁶4d¹⁰5s²5p⁶6s²4f¹⁴",
        "[Xe]6s²4f¹⁴",
        "6s²4f¹⁴",
      ],
      Lu: [
        71,
        "Lutetium",
        "Solid",
        174.97,
        "1s²2s²2p⁶3s²3p⁶4s²3d¹⁰4p⁶4d¹⁰5s²5p⁶6s²4f¹⁴5d¹",
        "[Xe]6s²4f¹⁴5d¹",
        "6s²⁴5d¹",
      ],
      Hf: [
        72,
        "Hafnium",
        "Solid",
        178.49,
        "1s²2s²2p⁶3s²3p⁶4s²3d¹⁰4p⁶4d¹⁰5s²5p⁶6s²4f¹⁴5d²",
        "[Xe]6s²4f¹⁴5d²",
        "6s²5d²",
      ],
      Ta: [
        73,
        "Tantalum",
        "Solid",
        180.95,
        "1s²2s²2p⁶3s²3p⁶4s²3d¹⁰4p⁶4d¹⁰5s²5p⁶6s²4f¹⁴5d³",
        "[Xe]6s²4f¹⁴5d³",
        "6s²5d³",
      ],
      W: [
        74,
        "Tungsten",
        "Solid",
        183.84,
        "1s²2s²2p⁶3s²3p⁶4s²3d¹⁰4p⁶4d¹⁰5s²5p⁶6s²4f¹⁴5d⁴",
        "[Xe]6s²4f¹⁴5d⁴",
        "6s²5d⁴",
      ],
      Re: [
        75,
        "Rhenium",
        "Solid",
        186.21,
        "1s²2s²2p⁶3s²3p⁶4s²3d¹⁰4p⁶4d¹⁰5s²5p⁶6s²4f¹⁴5d⁵",
        "[Xe]6s²4f¹⁴5d⁵",
        "6s²5d⁵",
      ],
      Os: [
        76,
        "Osmium",
        "Solid",
        190.23,
        "1s²2s²2p⁶3s²3p⁶4s²3d¹⁰4p⁶4d¹⁰5s²5p⁶6s²4f¹⁴5d6",
        "[Xe]6s²4f¹⁴5d⁶",
        "6s²5d⁶",
      ],
      Ir: [
        77,
        "Iridium",
        "Solid",
        192.22,
        "1s²2s²2p⁶3s²3p⁶4s²3d¹⁰4p⁶4d¹⁰5s²5p⁶6s²4f¹⁴5d⁷",
        "[Xe]6s²4f¹⁴5d⁷",
        "6s²5d⁷",
      ],
      Pt: [
        78,
        "Platinum",
        "Solid",
        195.08,
        "1s²2s²2p⁶3s²3p⁶4s²3d¹⁰4p⁶4d¹⁰5s²5p⁶6s¹4f¹⁴5d⁹",
        "[Xe]6s¹4f¹⁴5d⁹",
        "6s¹5d⁹",
      ],
      Au: [
        79,
        "Gold",
        "Solid",
        196.97,
        "1s²2s²2p⁶3s²3p⁶4s²3d¹⁰4p⁶4d¹⁰5s²5p⁶6s¹4f¹⁴5d¹⁰",
        "[Xe]6s¹4f¹⁴5d¹⁰",
        "6s¹5d¹⁰",
      ],
      Hg: [
        80,
        "Mercury",
        "Solid",
        200.59,
        "1s²2s²2p⁶3s²3p⁶4s²3d¹⁰4p⁶4d¹⁰5s²5p⁶6s²4f¹⁴5d¹⁰",
        "[Xe]6s²4f¹⁴5d¹⁰",
        "6s²5d¹⁰",
      ],
      Tl: [
        81,
        "Thallium",
        "Solid",
        204.38,
        "1s²2s²2p⁶3s²3p⁶4s²3d¹⁰4p⁶4d¹⁰5s²5p⁶6s²4f¹⁴5d¹⁰6p¹",
        "[Xe]6s²4f¹⁴5d¹⁰6p¹",
        "6s²6p¹",
      ],
      Pb: [
        82,
        "Lead",
        "Solid",
        207.2,
        "1s²2s²2p⁶3s²3p⁶4s²3d¹⁰4p⁶4d¹⁰5s²5p⁶6s²4f¹⁴5d¹⁰6p²",
        "[Xe]6s²4f¹⁴5d¹⁰6p²",
        "6s²6p²",
      ],
      Bi: [
        83,
        "Bismuth",
        "Solid",
        208.98,
        "1s²2s²2p⁶3s²3p⁶4s²3d¹⁰4p⁶4d¹⁰5s²5p⁶6s²4f¹⁴5d¹⁰6p³",
        "[Xe]6s²4f¹⁴5d¹⁰6p³",
        "6s²6p³",
      ],
      Po: [
        84,
        "Polonium",
        "Solid",
        209,
        "1s²2s²2p⁶3s²3p⁶4s²3d¹⁰4p⁶4d¹⁰5s²5p⁶6s²4f¹⁴5d¹⁰6p⁴",
        "[Xe]6s²4f¹⁴5d¹⁰6p⁴",
        "6s²6p⁴",
      ],
      At: [
        85,
        "Astatine",
        "Solid",
        210,
        "1s²2s²2p⁶3s²3p⁶4s²3d¹⁰4p⁶4d¹⁰5s²5p⁶6s²4f¹⁴5d¹⁰6p⁵",
        "[Xe]6s²4f¹⁴5d¹⁰6p⁵",
        "6s²6p⁵",
      ],
      Rn: [
        86,
        "Radon",
        "Gas",
        222,
        "1s²2s²2p⁶3s²3p⁶4s²3d¹⁰4p⁶4d¹⁰5s²5p⁶6s²4f¹⁴5d¹⁰6p⁶",
        "[Xe]6s²4f¹⁴5d¹⁰6p⁶",
        "6s²6p⁶",
      ],
      Fr: [
        87,
        "Francium",
        "Solid",
        223,
        "1s²2s²2p⁶3s²3p⁶4s²3d¹⁰4p⁶4d¹⁰5s²5p⁶6s²4f¹⁴5d¹⁰6p⁶7s¹",
        "[Rn]7s¹",
        "7s¹",
      ],
      Ra: [
        88,
        "Radium",
        "Solid",
        226,
        "1s²2s²2p⁶3s²3p⁶4s²3d¹⁰4p⁶4d¹⁰5s²5p⁶6s²4f¹⁴5d¹⁰6p⁶7s²",
        "[Rn]7s²",
        "7s²",
      ],
      Ac: [
        89,
        "Actinium",
        "Solid",
        227,
        "1s²2s²2p⁶3s²3p⁶4s²3d¹⁰4p⁶4d¹⁰5s²5p⁶6s²4f¹⁴5d¹⁰6p⁶6d¹7s²",
        "[Rn]7s²6d¹",
        "7s²6d¹",
      ],
      Th: [
        90,
        "Thorium",
        "Solid",
        232.04,
        "1s²2s²2p⁶3s²3p⁶4s²3d¹⁰4p⁶4d¹⁰5s²5p⁶6s²4f¹⁴5d¹⁰6p⁶6d²7s²",
        "[Rn]7s²6d²",
        "7s²6d²",
      ],
      Pa: [
        91,
        "Protactinium",
        "Solid",
        231.04,
        "1s²2s²2p⁶3s²3p⁶4s²3d¹⁰4p⁶4d¹⁰5s²5p⁶6s²4f¹⁴5d¹⁰6p⁶7s²5f²6d¹",
        "[Rn]7s²5f²6d¹",
        "7s²5f²6d¹",
      ],
      U: [
        92,
        "Uranium",
        "Solid",
        238.03,
        "1s²2s²2p⁶3s²3p⁶4s²3d¹⁰4p⁶4d¹⁰5s²5p⁶6s²4f¹⁴5d¹⁰6p⁶7s²5f³6d¹",
        "[Rn]7s²5f³6d¹",
        "7s²5f³6d¹",
      ],
      Np: [
        93,
        "Neptunium",
        "Solid",
        237,
        "1s²2s²2p⁶3s²3p⁶4s²3d¹⁰4p⁶4d¹⁰5s²5p⁶6s²6p⁶4f¹⁴5d¹⁰7s²5f⁴6d¹ ",
        "[Rn]7s²5f⁴6d¹",
        "7s²5f⁴6d¹ ",
      ],
      Pu: [
        94,
        "Plutonium",
        "Solid",
        244,
        "1s²2s²2p⁶3s²3p⁶4s²3d¹⁰4p⁶4d¹⁰5s²6s²4f¹⁴5d¹⁰6p⁶7s²5f⁶5p⁶",
        "[Rn]7s²5f⁶",
        "7s²5f⁶",
      ],
      Am: [
        95,
        "Americium",
        "Solid",
        243,
        "1s²2s²2p⁶3s²3p⁶4s²3d¹⁰4p⁶4d¹⁰5s²5p⁶6s²4f¹⁴5d¹⁰6p⁶7s²5f⁷",
        "[Rn]7s²5f⁷",
        "7s²5f⁷",
      ],
      Cm: [
        96,
        "Curium",
        "Solid",
        247,
        "1s²2s²2p⁶3s²3p⁶4s²3d¹⁰4p⁶4d¹⁰5s²5p⁶6s²4f¹⁴5d¹⁰6p⁶7s²5f⁷6d¹",
        "[Rn]7s²5f⁷6d¹",
        "7s²5f⁷6d¹",
      ],
      Bk: [
        97,
        "Berkelium",
        "Solid",
        247,
        "1s²2s²2p⁶3s²3p⁶4s²3d¹⁰4p⁶4d¹⁰5s²5p⁶6s²4f¹⁴5d¹⁰6p⁶7s²5f⁹",
        "[Rn]7s²5f⁹",
        "7s²5f⁹",
      ],
      Cf: [
        98,
        "Californium",
        "Solid",
        251,
        "1s²2s²2p⁶3s²3p⁶4s²3d¹⁰4p⁶4d¹⁰5s²5p⁶6s²4f¹⁴5d¹⁰6p⁶7s²5f¹⁰",
        "[Rn]7s²5f¹⁰",
        "7s²5f¹⁰",
      ],
      Es: [
        99,
        "Einsteinium",
        "Solid",
        252,
        "1s²2s²2p⁶3s²3p⁶4s²3d¹⁰4p⁶4d¹⁰5s²5p⁶6s²4f¹⁴5d¹⁰6p⁶7s²5f¹¹",
        "[Rn]7s²5f¹¹",
        "7s²5f¹¹",
      ],
      Fm: [
        100,
        "Fermium",
        "Solid",
        257,
        "1s²2s²2p⁶3s²3p⁶4s²3d¹⁰4p⁶4d¹⁰5s²5p⁶6s²4f¹⁴5d¹⁰6p⁶7s²5f¹²",
        "[Rn]5f¹²7s²",
        "5f¹²7s²",
      ],
      Md: [
        101,
        "Mendelevium",
        "Solid",
        258,
        "1s²2s²2p⁶3s²3p⁶4s²3d¹⁰4p⁶4d¹⁰5s²5p⁶6s²4f¹⁴5d¹⁰6p⁶7s²5f¹³",
        "[Rn]7s²5f¹³",
        "7s²5f¹³",
      ],
      No: [
        102,
        "Nobelium",
        "Solid",
        259,
        "1s²2s²2p⁶3s²3p⁶4s²3d¹⁰4p⁶4d¹⁰5s²5p⁶6s²4f¹⁴5d¹⁰6p⁶7s²5f¹⁴",
        "[Rn]7s²5f¹⁴",
        "7s²5f¹⁴",
      ],
      Lr: [
        103,
        "Lawrencium",
        "Solid",
        266,
        "1s²2s²2p⁶3s²3p⁶4s²3d¹⁰4p⁶4d¹⁰5s²5p⁶6s²4f¹⁴5d¹⁰6p⁶7s²5f¹⁴7p¹",
        "[Rn]7s²5f¹⁴6d¹",
        "7s²7p¹",
      ],
      Rf: [
        104,
        "Rutherfordium",
        "Solid",
        267,
        "1s²2s²2p⁶3s²3p⁶4s²3d¹⁰4p⁶4d¹⁰5s²5p⁶6s²4f¹⁴5d¹⁰6p⁶7s²5f¹⁴6d²",
        "[Rn]7s²5f¹⁴6d²",
        "7s²6d²",
      ],
      Db: [
        105,
        "Dubnium",
        "Solid",
        268,
        "1s²2s²2p⁶3s²3p⁶4s²3d¹⁰4p⁶4d¹⁰5s²5p⁶6s²4f¹⁴5d¹⁰6p⁶7s²5f¹⁴6d³",
        "[Rn]7s²5f¹⁴6d³",
        "7s²6d³",
      ],
      Sg: [
        106,
        "Seaborgium",
        "Solid",
        269,
        "1s²2s²2p⁶3s²3p⁶4s²3d¹⁰4p⁶4d¹⁰5s²5p⁶6s²4f¹⁴5d¹⁰6p⁶7s²5f¹⁴6d⁴",
        "[Rn]7s²5f¹⁴6d⁴",
        "7s²6d⁴",
      ],
      Bh: [
        107,
        "Bohrium",
        "Solid",
        270,
        "1s²2s²2p⁶3s²3p⁶3d¹⁰4s²4p⁶4d¹⁰5s²5p⁶6s²4f¹⁴5d¹⁰6p⁶7s²5f¹⁴6d⁵",
        "[Rn]7s²5f¹⁴6d⁵",
        "7s²6d⁵",
      ],
      Hs: [
        108,
        "Hassium",
        "Solid",
        277,
        "1s²2s²2p⁶3s²3p⁶3d¹⁰4s²4p⁶4d¹⁰5s²5p⁶6s²4f¹⁴5d¹⁰6p⁶7s²5f¹⁴6d⁶",
        "[Rn]7s²5f¹⁴6d⁶",
        "7s²6d⁶",
      ],
      Mt: [
        109,
        "Meitnerium",
        "Solid",
        278,
        "1s²2s²2p⁶3s²3p⁶3d¹⁰4s²4p⁶4d¹⁰5s²5p⁶6s²4f¹⁴5d¹⁰6p⁶7s²5f¹⁴6d⁷",
        "[Rn]7s²5f¹⁴6d⁷",
        "7s²6d⁷",
      ],
      Ds: [
        110,
        "Darmstadtium",
        "Solid (Expected)",
        281,
        "1s²2s²2p⁶3s²3p⁶3d¹⁰4s²4p⁶4d¹⁰5s²5p⁶6s²4f¹⁴5d¹⁰6p⁶7s²5f¹⁴6d⁸",
        "[Rn]7s²5f¹⁴6d⁸",
        "7s²6d⁸",
      ],
      Rg: [
        111,
        "Roentgenium",
        "Solid (Expected)",
        282,
        "1s²2s²2p⁶3s²3p⁶3d¹⁰4s²4p⁶4d¹⁰5s²5p⁶6s²4f¹⁴5d¹⁰6p⁶7s²5f¹⁴6d⁹",
        "[Rn]7s²5f¹⁴6d⁹",
        "7s²6d⁹",
      ],
      Cn: [
        112,
        "Copernicium",
        "Solid (Expected)",
        285,
        "1s²2s²2p⁶3s²3p⁶3d¹⁰4s²4p⁶4d¹⁰5s²5p⁶6s²4f¹⁴5d¹⁰6p⁶6d¹⁰7s²5f¹⁴",
        "[Rn]7s²5f¹⁴6d¹⁰",
        "7s²6d¹⁰",
      ],
      Nh: [
        113,
        "Nihonium",
        "Solid (Expected)",
        286,
        "1s²2s²2p⁶3s²3p⁶3d¹⁰4s²4p⁶4d¹⁰5s²5p⁶6s²4f¹⁴5d¹⁰6p⁶7s²5f¹⁴6d¹⁰7p¹",
        "[Rn]5f¹⁴6d¹⁰7s²7p¹",
        "7s²7p¹",
      ],
      Fl: [
        114,
        "Flerovium",
        "Solid (Expected)",
        289,
        "1s²2s²2p⁶3s²3p⁶3d¹⁰4s²4p⁶4d¹⁰5s²5p⁶6s²4f¹⁴5d¹⁰6p⁶7s²5f¹⁴6d¹⁰7p²",
        "[Rn]7s²7p²5f¹⁴6d¹⁰",
        "7s²7p²",
      ],
      Mc: [
        115,
        "Moscovium",
        "Solid (Expected)",
        290,
        "1s²2s²2p⁶3s²3p⁶3d¹⁰4s²4p⁶4d¹⁰5s²5p⁶6s²4f¹⁴5d¹⁰6p⁶7s²5f¹⁴6d¹⁰7p³",
        "[Rn]7s²7p³5f¹⁴6d¹⁰",
        "7s²7p³",
      ],
      Lv: [
        116,
        "Livermorium",
        "Solid (Expected)",
        293,
        "1s²2s²2p⁶3s²3p⁶3d¹⁰4s²4p⁶4d¹⁰5s²5p⁶6s²4f¹⁴5d¹⁰6p⁶7s²5f¹⁴6d¹⁰7p⁴",
        "[Rn]7s²7p⁴5f¹⁴6d¹⁰",
        "7s²7p⁴",
      ],
      Ts: [
        117,
        "Tennessine",
        "Solid (Expected)",
        294,
        "1s²2s²2p⁶3s²3p⁶3d¹⁰4s²4p⁶4d¹⁰5s²5p⁶6s²4f¹⁴5d¹⁰6p⁶7s²5f¹⁴6d¹⁰7p⁵",
        "[Rn]7s²7p⁵5f¹⁴6d¹⁰",
        "7s²7p⁵",
      ],
      Og: [
        118,
        "Oganesson",
        "Gas (Expected)",
        294,
        "1s²2s²2p⁶3s²3p⁶3d¹⁰4s²4p⁶4d¹⁰5s²5p⁶6s²4f¹⁴5d¹⁰6p⁶7s²5f¹⁴6d¹⁰7p⁶",
        "[Rn]7s²7p⁶5f¹⁴6d¹⁰",
        "7s²7p⁶",
      ],
    };

    const result = periodicTable[element];

    if (!result) {
      return { error: "Element not found in the periodic table." };
    }

    return {
      tech_atomicNumber: result[0],
      tech_element: result[1],
      tech_phase: result[2],
      tech_atomicMass: result[3],
      tech_configuration: result[4],
      tech_nobleGasNotation: result[5],
      tech_valenceConfiguration: result[6],
    };
  }

  /** getCalculationMolarMassCalculator
   * POST: /api/calculators-lol/molar-mass-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationMolarMassCalculator(body) {
    let f = (body.tech_f || "").trim();

    // Basic input validation - similar regex to PHP
    const forbiddenPattern =
      /<|>|\&|php|print_r|print|echo|script|sin|cos|tan|arcsin|arccos|arctan|&|%/i;
    if (forbiddenPattern.test(f)) {
      return { error: "Please Enter Valid Input." };
    }

    if (!f) {
      return { error: "Please! Check Your Input." };
    }

    // Prepare the input string similar to PHP str_replace
    let parem = f;
    parem = parem.replace(/\s+/g, "");
    parem = parem.replace(/%20/g, "");
    parem = parem.replace(/\+/g, "plus");
    parem = parem.replace(/{/g, "(");
    parem = parem.replace(/}/g, ")");
    parem = parem.replace(/e\^/g, "exp");
    parem = parem.replace(/exp\^/g, "exp");
    parem = parem.replace(/\^/g, "**");
    parem = parem.replace(/e\^sqrt\(x\)/g, "exp(2*x)");

    try {
      const response = await axios.get("http://167.172.134.148/molar", {
        timeout: 120000,
        params: { f: parem },
      });

      const buffer = response.data.split("@@@");

      let mass = buffer[2];
      let atoms = buffer[5];
      let elem = buffer[6].split("###");
      let mm = buffer[7].split("###");
      let num = buffer[8].split("###");
      let rm = buffer[9].split("###");
      let frac = buffer[10].split("###");
      let t_mm = buffer[11];

      let table = `<table class='col-12' cellspacing='0'>
              <thead>
                  <tr>
                      <th class='text-start border-b py-2 pe-2'>Element</th>
                      <th class='text-start border-b py-2 pe-2'>No. of Atoms</th>
                      <th class='text-start border-b py-2 pe-2'>Molar Mass (MM)</th>
                      <th class='text-start border-b py-2 pe-2'>(%)</th>
                      <th class='text-start py-2'>Subtotal Mass</th>
                  </tr>
              </thead>
              <tbody>`;

      table += `<tr><td class='border-b py-2'>&nbsp;</td><td class='border-b py-2'>&nbsp;</td><td class='border-b py-2'>(g/mol)</td><td class='border-b py-2'>(%)</td><td class='border-b py-2'>(g/mol)</td></tr>`;

      for (let i = 0; i < elem.length - 1; i++) {
        table += `<tr>
                  <td class='border-b py-2'>${elem[i]}</td>
                  <td class='border-b py-2'>${num[i]}</td>
                  <td class='border-b py-2'>${parseFloat(mm[i]).toFixed(4)}</td>
                  <td class='border-b py-2'>${parseFloat(frac[i]).toFixed(
                    2
                  )}</td>
                  <td class='border-b py-2'>${parseFloat(rm[i]).toFixed(4)}</td>
              </tr>`;
      }

      table += `<tr>
              <th class='text-start py-2'>Total</th>
              <th class='text-start py-2'>${atoms}</th>
              <th class='text-start py-2'>${parseFloat(t_mm).toFixed(4)}</th>
              <th class='text-start py-2'>100.00</th>
              <th class='text-start py-2'>${parseFloat(mass).toFixed(4)}</th>
          </tr></tbody></table>`;

      return {
        tech_hill: buffer[0],
        tech_emp: buffer[1],
        tech_mass: parseFloat(mass).toFixed(4),
        tech_n_mass: parseFloat(buffer[3]).toFixed(4),
        tech_m_mass: parseFloat(buffer[4]).toFixed(4),
        tech_atoms: atoms,
        tech_table: table,
        tech_elem: elem,
        tech_frac: frac,
      };
    } catch (error) {
      return { error: "Please! Check Your Input." };
    }
  }

  /** getCalculationTitrationCalculator
   * POST: /api/calculators-lol/titration-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationTitrationCalculator(body) {
    let cal = (body.tech_cal || "").trim();
    let ma = parseFloat((body.tech_ma || "").toString().trim());
    let ma_unit = (body.tech_ma_unit || "").trim();
    let va = parseFloat((body.tech_va || "").toString().trim());
    let va_unit = (body.tech_va_unit || "").trim();
    let mb = parseFloat((body.tech_mb || "").toString().trim());
    let mb_unit = (body.tech_mb_unit || "").trim();
    let vb = parseFloat((body.tech_vb || "").toString().trim());
    let vb_unit = (body.tech_vb_unit || "").trim();
    let hp = parseFloat((body.tech_hp || "").toString().trim());
    let oh = parseFloat((body.tech_oh || "").toString().trim());

    // Helper function to convert molarity units to M (molar)
    function convertMolarity(value, unit) {
      if (isNaN(value)) return NaN;
      switch (unit) {
        case "pM":
          return value * 1e-12;
        case "nM":
          return value * 1e-9;
        case "μM":
          return value * 1e-6;
        case "mM":
          return value * 1e-3;
        default:
          return value;
      }
    }

    // Helper function to convert volume units to liters
    function convertVolume(value, unit) {
      if (isNaN(value)) return NaN;
      switch (unit) {
        case "mm³":
          return value * 1e-6;
        case "cm³":
          return value * 1e-3;
        case "dm³":
          return value * 1;
        case "m³":
          return value * 1000;
        case "cu in":
          return value * 0.0163871;
        case "cu ft":
          return value * 28.3168;
        case "cu yd":
          return value * 764.555;
        case "ml":
          return value * 0.001;
        case "cl":
          return value * 0.01;
        case "l":
          return value * 1;
        case "us gal":
          return value * 3.78541;
        case "uk gal":
          return value * 4.54609;
        case "us fl oz":
          return value * 0.0295735;
        case "uk fl oz":
          return value * 0.0284131;
        default:
          return value;
      }
    }

    // Convert units to standard units
    ma = convertMolarity(ma, ma_unit);
    va = convertVolume(va, va_unit);
    mb = convertMolarity(mb, mb_unit);
    vb = convertVolume(vb, vb_unit);

    // Validate numeric inputs
    if ([ma, va, mb, vb, hp, oh].some((x) => isNaN(x))) {
      return { error: "Please! Check Your Input." };
    }

    // Calculation cases
    if (cal === "ma") {
      // ma = (oh * mb * vb) / (va * hp)
      let ans = (oh * mb * vb) / (va * hp);

      return {
        tech_ans: `${ans} <span class="text-green font-s-25">M</span>`,
        tech_ans_pm: `${ans * 1e-12} pM`,
        tech_ans_nm: `${ans * 1e-9} nM`,
        tech_ans_um: `${ans * 1e-6} μM`,
        tech_ans_mm: `${ans * 1e-3} mM`,
      };
    } else if (cal === "va") {
      // va = (oh * mb * vb) / (ma * hp)
      let ans = (oh * mb * vb) / (ma * hp);

      return {
        tech_ans: `${ans} <span class="text-green font-s-25">liter</span>`,
        tech_ans_nl: `${ans * 1e-9} nL`,
        tech_ans_ul: `${ans * 1e-6} μL`,
        tech_ans_ml: `${ans * 1e-3} mL`,
      };
    } else if (cal === "hp") {
      // hp = (oh * mb * vb) / (ma * va)
      let tech_ans = (oh * mb * vb) / (ma * va);

      return { tech_ans };
    } else if (cal === "mb") {
      // mb = (hp * ma * va) / (oh * vb)
      let ans = (hp * ma * va) / (oh * vb);

      return {
        tech_ans: `${ans} <span class="font-s20">M</span>`,
        tech_ans_pm: `${ans * 1e-12} pM`,
        tech_ans_nm: `${ans * 1e-9} nM`,
        tech_ans_um: `${ans * 1e-6} μM`,
        tech_ans_mm: `${ans * 1e-3} mM`,
      };
    } else if (cal === "vb") {
      // vb = (hp * ma * va) / (oh * mb)
      let ans = (hp * ma * va) / (oh * mb);

      return {
        tech_ans: `${ans} <span class="font-s20">liter</span>`,
        tech_ans_nl: `${ans * 1e-9} nL`,
        tech_ans_ul: `${ans * 1e-6} μL`,
        ans_ml: `${ans * 1e-3} mL`,
      };
    } else if (cal === "oh") {
      // oh = (hp * ma * va) / (vb * mb)
      let tech_ans = (hp * ma * va) / (vb * mb);

      return { tech_ans };
    } else {
      return { error: "Please! Check Your Input." };
    }
  }

  /** getCalculationHalfLifeCalculator
   * POST: /api/calculators-lol/half-life-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationHalfLifeCalculator(body) {
    let calculator_name = body.tech_calculator_name?.trim();
    let param = {};

    let check = false;

    if (calculator_name === "calculator1") {
      let find = body.tech_find?.trim();
      let nt = parseFloat(body.tech_nt?.trim());
      let n0 = parseFloat(body.tech_n0?.trim());
      let t = parseFloat(body.tech_t?.trim());
      let t1_2 = parseFloat(body.tech_t1_2?.trim());

      if (!isNaN(nt) && !isNaN(n0) && !isNaN(t) && !isNaN(t1_2)) {
        check = true;
      }

      if (check) {
        if (find === "nt") {
          let s1 = t / t1_2;
          let s2 = Math.pow(0.5, s1);
          nt = n0 * s2;
          param = {
            tech_ans: nt,
            tech_s1: s1,
            tech_s2: s2,
            tech_share: "share",
          };
        } else if (find === "n0") {
          let s1 = t / t1_2;
          let s2 = Math.pow(0.5, s1);
          n0 = nt / s2;
          param = {
            tech_ans: n0,
            tech_s1: s1,
            tech_s2: s2,
            tech_share: "share",
          };
        } else if (find === "t") {
          let s1 = nt / n0;
          let s2 = Math.log(s1);
          let s3 = t1_2 * s2;
          let s4 = -Math.log(2);
          t = s3 / s4;
          param = {
            tech_ans: t,
            tech_s1: s1,
            tech_s2: s2,
            tech_s3: s3,
            tech_s4: s4,
            tech_share: "share",
          };
        } else if (find === "t1_2") {
          let s1 = nt / n0;
          let s2 = Math.log(s1);
          let s3 = -Math.log(2);
          let s4 = t * s3;
          t1_2 = s4 / s2;
          param = {
            tech_ans: t1_2,
            tech_s1: s1,
            tech_s2: s2,
            tech_s3: s3,
            tech_s4: s4,
            tech_share: "share",
          };
        } else {
          param = { error: "Please! Check Your Input." };
        }
      }
    } else {
      let find_by = body.tech_find_by?.trim();
      let t_1_2 = parseFloat(body.tech_t_1_2?.trim());
      let T = parseFloat(body.tech_T?.trim());
      let lamda = parseFloat(body.tech_lamda?.trim());

      if (!isNaN(t_1_2) && !isNaN(T) && !isNaN(lamda)) {
        check = true;
      }

      if (check) {
        if (find_by === "t_1_2") {
          T = t_1_2 / Math.log(2);
          lamda = Math.log(2) / t_1_2;
        } else if (find_by === "T") {
          t_1_2 = T * Math.log(2);
          lamda = Math.log(2) / t_1_2;
        } else if (find_by === "lamda") {
          t_1_2 = Math.log(2) / lamda;
          T = t_1_2 / Math.log(2);
        } else {
          return { error: "Please! Check Your Input." };
        }

        param = {
          tech_t_1_2: t_1_2,
          tech_T: T,
          tech_lamda: lamda,
        };
      }
    }

    if (!check && !param.RESULT) {
      param = { error: "Please! Check Your Input." };
    }

    return param;
  }

  /** getCalculationMoleCalculator
   * POST: /api/calculators-lol/mole-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationMoleCalculator(body) {
    let cal = body.tech_cal?.trim();
    let mass = parseFloat(body.tech_mass?.trim());
    let mass_unit = body.tech_mass_unit?.trim();
    let mw = parseFloat(body.tech_mw?.trim());
    let moles = parseFloat(body.tech_moles?.trim());
    let moles_unit = body.tech_moles_unit?.trim();
    let param = {};

    if (!isNaN(mass) && !isNaN(mw) && !isNaN(moles)) {
      function sigFig(value, digits) {
        if (value === 0) return 0;
        const decimalPlaces = Math.max(
          0,
          Math.min(100, digits - Math.floor(Math.log10(Math.abs(value))) - 1)
        );
        return Number(value.toFixed(decimalPlaces));
      }

      // Convert mass to grams
      const massConversions = {
        pg: 1e-12,
        ng: 1e-9,
        μg: 1e-6,
        mg: 1e-3,
        dag: 10,
        kg: 1000,
        t: 1e6,
        oz: 28.35,
        lbs: 453.6,
        stones: 6350,
        "US ton": 907185,
        "Long ton": 1016047,
        u: 1 / 6.02214e23,
      };
      if (massConversions[mass_unit]) {
        mass *= massConversions[mass_unit];
      }

      // Convert moles to base mol
      const molesConversions = {
        mM: 1e-3,
        μM: 1e-6,
        nM: 1e-9,
        pM: 1e-12,
      };
      if (molesConversions[moles_unit]) {
        moles *= molesConversions[moles_unit];
      }

      if (cal === "mass") {
        mass = mw * moles;

        param.tech_ans = `${sigFig(
          mass,
          4
        )} <span class="text-green font-s-25">g</span>`;
        param.tech_ans_pg = `${sigFig(mass / 1e-12, 4)} pg`;
        param.tech_ans_ng = `${sigFig(mass / 1e-9, 4)} ng`;
        param.tech_ans_ug = `${sigFig(mass / 1e-6, 4)} μg`;
        param.tech_ans_mg = `${sigFig(mass / 1e-3, 4)} mg`;
        param.tech_ans_dag = `${sigFig(mass / 10, 4)} dag`;
        param.tech_ans_kg = `${sigFig(mass / 1000, 4)} kg`;
        param.tech_ans_t = `${sigFig(mass / 1e6, 4)} t`;
        param.tech_ans_oz = `${sigFig(mass / 28.35, 4)} oz`;
        param.tech_ans_lb = `${sigFig(mass / 453.6, 4)} lb`;
        param.tech_ans_stone = `${sigFig(mass / 6350, 4)} stone`;
        param.tech_ans_us_ton = `${sigFig(mass / 907185, 4)} US ton`;
        param.tech_ans_long_ton = `${sigFig(mass / 1016047, 4)} Long ton`;
        param.tech_ans_u = `${sigFig(mass * 6.02214e23, 4)} u`;
      } else if (cal === "mw") {
        mw = mass / moles;
        param.tech_ans = `${sigFig(
          mw,
          4
        )} <span class="text-green font-s-25">g/mol</span>`;
      } else if (cal === "moles") {
        moles = mass / mw;

        param.tech_ans = `${sigFig(
          moles,
          4
        )} <span class="text-green font-s-25">M</span>`;
        param.tech_ans_mm = `${sigFig(moles / 1e-3, 4)} mM`;
        param.tech_ans_um = `${sigFig(moles / 1e-6, 4)} μM`;
        param.tech_ans_nm = `${sigFig(moles / 1e-9, 4)} nM`;
        param.tech_ans_pm = `${sigFig(moles / 1e-12, 4)} pM`;
      } else {
        return { error: "Please! Check Your Input." };
      }

      // Molecules calculations
      let molecules_23 = sigFig(moles * 6.02214076, 4);
      param.tech_molecules_23 = `${molecules_23}x10²³`;
      param.tech_molecules_22 = `${sigFig(molecules_23 * 10, 4)}x10²²`;
      param.tech_molecules_24 = `${sigFig(molecules_23 * 0.1, 4)}x10²⁴`;

      return param;
    } else {
      return { error: "Please! Check Your Input." };
    }
  }

  /** getCalculationAtomicMassCalculator
   * POST: /api/calculators-lol/atomic-mass-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationAtomicMassCalculator(body) {
    let z = parseInt(body.tech_z);
    let n = parseInt(body.tech_n);
    let param = {};

    if (isNaN(z) || isNaN(n)) {
      param.error = "Please! Check Your Input.";
      return param;
    }

    function checkIsotope(isotopeList, z, n) {
      return isotopeList.some((item) => item[0] === z && item[1] === n);
    }

    const elementSymbols = [
      "H",
      "He",
      "Li",
      "Be",
      "B",
      "C",
      "N",
      "O",
      "F",
      "Ne",
      "Na",
      "Mg",
      "Al",
      "Si",
      "P",
      "S",
      "Cl",
      "Ar",
      "K",
      "Ca",
      "Sc",
      "Ti",
      "V",
      "Cr",
      "Mn",
      "Fe",
      "Co",
      "Ni",
      "Cu",
      "Zn",
      "Ga",
      "Ge",
      "As",
      "Se",
      "Br",
      "Kr",
      "Rb",
      "Sr",
      "Y",
      "Zr",
      "Nb",
      "Mo",
      "Tc",
      "Ru",
      "Rh",
      "Pd",
      "Ag",
      "Cd",
      "In",
      "Sn",
      "Sb",
      "Te",
      "I",
      "Xe",
      "Cs",
      "Ba",
      "La",
      "Ce",
      "Pr",
      "Nd",
      "Pm",
      "Sm",
      "Eu",
      "Gd",
      "Tb",
      "Dy",
      "Ho",
      "Er",
      "Tm",
      "Yb",
      "Lu",
      "Hf",
      "Ta",
      "W",
      "Re",
      "Os",
      "Ir",
      "Pt",
      "Au",
      "Hg",
      "Tl",
      "Pb",
      "Bi",
      "Po",
      "At",
      "Rn",
      "Fr",
      "Ra",
      "Ac",
      "Th",
      "Pa",
      "U",
      "Np",
      "Pu",
      "Am",
      "Cm",
      "Bk",
      "Cf",
      "Es",
      "Fm",
      "Md",
      "No",
      "Lr",
      "Rf",
      "Db",
      "Sg",
      "Bh",
      "Hs",
      "Mt",
      "Ds",
      "Rg",
      "Cn",
      "Nh",
      "Fl",
      "Mc",
      "Lv",
      "Ts",
      "Og",
    ];

    const stableIsotopes = [
      [52, 76],
      [54, 70],
      [36, 42],
      [54, 82],
      [32, 44],
      [56, 74],
      [34, 48],
      [48, 68],
      [20, 28],
      [83, 126],
      [40, 56],
      [52, 78],
      [60, 90],
      [42, 58],
      [63, 88],
      [74, 106],
      [23, 27],
      [48, 65],
      [62, 86],
      [60, 84],
      [76, 110],
      [72, 102],
      [49, 66],
      [64, 88],
      [78, 112],
      [62, 85],
      [57, 81],
      [37, 50],
      [75, 112],
      [71, 105],
      [90, 142],
      [92, 146],
      [19, 21],
      [92, 143],
      [94, 150],
      [62, 84],
      [41, 51],
      [92, 144],
      [82, 123],
      [53, 76],
      [96, 151],
      [72, 110],
      [46, 61],
      [43, 54],
      [43, 55],
      [25, 28],
      [66, 88],
      [26, 34],
      [83, 127],
      [55, 80],
      [93, 144],
      [64, 86],
      [40, 53],
      [4, 6],
      [13, 13],
      [94, 148],
      [83, 125],
      [96, 152],
      [17, 19],
      [34, 45],
      [92, 142],
      [50, 76],
      [36, 45],
      [43, 56],
      [75, 111],
      [92, 141],
      [93, 143],
      [20, 21],
      [28, 31],
      [90, 140],
      [57, 80],
      [82, 120],
      [91, 140],
      [94, 145],
      [41, 53],
      [96, 149],
      [96, 154],
      [95, 148],
      [90, 139],
      [94, 146],
      [6, 8],
      [96, 150],
      [67, 96],
      [42, 51],
      [88, 138],
      [97, 150],
      [67, 99],
      [98, 153],
      [41, 50],
      [80, 114],
      [47, 61],
      [95, 146],
      [98, 151],
      [97, 151],
      [18, 21],
      [77, 115],
      [65, 93],
      [95, 147],
      [14, 18],
      [84, 125],
      [28, 35],
      [62, 89],
      [94, 144],
      [65, 92],
      [64, 84],
      [92, 140],
      [22, 22],
      [78, 115],
      [50, 71],
      [63, 87],
      [18, 24],
      [83, 124],
      [72, 106],
      [55, 82],
      [96, 147],
      [38, 52],
      [82, 128],
      [89, 138],
      [96, 148],
      [61, 84],
      [41, 52],
      [94, 147],
      [48, 65],
      [63, 89],
      [98, 152],
      [1, 2],
      [36, 49],
      [56, 77],
      [63, 91],
      [76, 118],
      [88, 140],
      [61, 85],
      [27, 33],
      [63, 92],
      [81, 123],
      [71, 103],
      [45, 56],
      [45, 57],
      [84, 124],
      [94, 142],
      [51, 74],
      [26, 29],
      [98, 154],
      [61, 86],
      [11, 11],
      [55, 79],
      [69, 102],
      [90, 138],
      [72, 100],
      [73, 106],
      [71, 102],
      [99, 153],
      [48, 61],
      [93, 142],
      [44, 62],
      [61, 83],
      [62, 83],
      [98, 150],
      [97, 152],
      [23, 26],
      [25, 29],
      [50, 69],
      [58, 86],
      [99, 155],
      [27, 30],
      [32, 36],
      [61, 82],
      [47, 63],
      [30, 35],
      [64, 89],
      [45, 57],
      [79, 116],
      [77, 117],
      [75, 109],
      [96, 146],
      [20, 25],
      [71, 106],
      [52, 69],
      [66, 93],
      [71, 103],
      [84, 126],
      [58, 81],
      [50, 73],
      [69, 101],
      [64, 87],
      [74, 107],
      [34, 41],
      [52, 71],
      [50, 63],
      [73, 109],
      [52, 75],
      [39, 49],
      [100, 157],
      [76, 109],
      [69, 99],
      [63, 86],
      [43, 54],
      [16, 19],
      [37, 46],
      [21, 25],
      [40, 48],
      [33, 40],
      [27, 29],
      [74, 111],
      [77, 115],
      [65, 95],
      [27, 31],
      [75, 108],
      [72, 103],
      [74, 114],
      [38, 47],
      [40, 55],
      [43, 52],
      [41, 50],
      [98, 156],
      [51, 73],
      [53, 72],
      [39, 52],
      [52, 73],
      [63, 85],
      [4, 3],
      [101, 157],
      [38, 51],
      [49, 65],
      [64, 82],
      [80, 123],
      [94, 143],
      [48, 67],
      [26, 33],
      [72, 109],
      [61, 87],
      [47, 58],
      [99, 156],
      [44, 59],
      [54, 73],
      [75, 109],
      [41, 54],
      [18, 19],
      [52, 77],
      [37, 47],
      [96, 145],
      [58, 83],
      [70, 99],
      [101, 159],
      [24, 27],
      [96, 144],
      [91, 142],
      [38, 44],
      [15, 18],
      [72, 107],
      [90, 144],
      [63, 84],
      [74, 104],
      [92, 138],
      [99, 154],
      [52, 69],
      [90, 137],
      [37, 49],
      [98, 155],
      [33, 41],
      [91, 139],
      [46, 57],
      [45, 54],
      [23, 25],
      [76, 115],
      [83, 122],
      [63, 93],
      [88, 137],
      [15, 17],
      [50, 67],
      [59, 84],
      [77, 112],
      [55, 81],
      [53, 73],
      [56, 84],
      [51, 75],
      [81, 121],
      [54, 77],
      [77, 113],
      [56, 75],
      [88, 135],
      [32, 39],
      [60, 87],
      [94, 152],
      [77, 116],
      [78, 110],
      [41, 51],
      [89, 136],
      [55, 76],
      [50, 75],
      [68, 101],
      [64, 85],
      [69, 98],
      [54, 75],
      [84, 122],
      [34, 38],
      [47, 59],
      [71, 100],
      [53, 78],
      [99, 158],
      [47, 64],
      [65, 96],
      [92, 145],
      [71, 101],
      [71, 106],
      [55, 77],
      [83, 123],
      [79, 117],
      [28, 28],
      [52, 66],
      [63, 82],
      [51, 69],
      [25, 27],
      [61, 87],
      [65, 91],
      [65, 90],
      [54, 79],
      [73, 110],
      [83, 127],
      [97, 148],
      [52, 67],
      [63, 83],
      [20, 27],
      [93, 141],
      [45, 56],
      [78, 115],
      [43, 53],
      [92, 139],
      [70, 105],
      [53, 71],
      [78, 117],
      [51, 76],
      [86, 136],
      [75, 111],
      [88, 136],
      [46, 54],
      [41, 54],
      [66, 100],
      [60, 80],
      [21, 26],
      [39, 48],
      [40, 49],
      [31, 36],
      [52, 80],
      [58, 76],
      [79, 120],
      [81, 120],
      [100, 153],
      [78, 113],
      [49, 62],
      [44, 53],
      [42, 57],
      [51, 71],
      [33, 38],
      [79, 119],
      [80, 117],
      [39, 51],
      [75, 107],
      [69, 103],
      [29, 38],
      [21, 23],
      [56, 72],
      [35, 42],
      [70, 96],
      [73, 104],
      [93, 146],
      [65, 88],
      [28, 38],
      [94, 153],
      [79, 119],
      [48, 67],
      [61, 88],
      [54, 79],
      [82, 121],
      [93, 145],
      [95, 145],
      [68, 104],
      [71, 99],
      [30, 42],
      [62, 91],
      [78, 124],
      [21, 27],
      [97, 149],
      [80, 115],
      [77, 111],
      [57, 83],
      [99, 155],
      [32, 37],
      [56, 77],
      [33, 44],
      [51, 68],
      [64, 83],
      [79, 115],
      [91, 138],
      [98, 148],
      [28, 29],
      [45, 60],
      [35, 47],
      [36, 43],
      [58, 79],
      [71, 98],
      [58, 85],
      [99, 152],
      [38, 45],
      [55, 74],
      [105, 163],
      [91, 141],
      [76, 117],
      [69, 96],
      [52, 79],
      [89, 137],
      [68, 92],
      [61, 90],
      [56, 79],
      [50, 71],
      [67, 99],
      [33, 43],
      [81, 119],
      [33, 39],
      [90, 141],
      [100, 152],
      [96, 156],
      [65, 91],
      [75, 114],
      [80, 117],
      [74, 113],
      [97, 151],
      [72, 101],
      [41, 55],
      [65, 89],
      [93, 143],
      [19, 24],
      [76, 106],
      [91, 137],
      [24, 24],
      [65, 89],
      [82, 118],
      [46, 66],
      [12, 16],
      [45, 55],
      [53, 80],
      [54, 68],
      [100, 155],
      [43, 52],
      [75, 106],
      [78, 119],
      [57, 78],
      [77, 117],
      [59, 83],
      [79, 121],
      [64, 95],
      [58, 77],
      [79, 114],
      [65, 86],
      [27, 28],
      [65, 87],
      [75, 113],
      [54, 71],
      [40, 57],
      [77, 109],
      [40, 46],
      [35, 41],
      [52, 67],
      [95, 147],
      [72, 98],
      [63, 94],
      [11, 13],
      [36, 40],
      [39, 47],
      [86, 125],
      [41, 49],
      [77, 108],
      [92, 148],
      [31, 41],
      [30, 39],
      [46, 63],
      [39, 48],
      [53, 70],
      [76, 115],
      [76, 107],
      [63, 87],
      [29, 35],
      [75, 107],
      [78, 122],
      [53, 77],
      [19, 23],
      [72, 99],
      [95, 144],
      [80, 113],
      [83, 120],
      [32, 45],
      [83, 121],
      [78, 111],
      [82, 130],
      [80, 115],
      [73, 102],
      [94, 151],
      [77, 110],
      [68, 97],
      [39, 54],
      [95, 149],
      [103, 163],
      [65, 89],
      [76, 107],
      [66, 89],
      [38, 53],
      [79, 117],
      [31, 35],
      [62, 94],
      [52, 75],
      [82, 119],
      [63, 89],
      [30, 32],
      [54, 81],
      [27, 31],
      [51, 77],
      [58, 79],
      [94, 140],
      [73, 111],
      [99, 151],
      [46, 55],
      [26, 26],
      [69, 104],
      [73, 107],
      [66, 91],
      [85, 125],
      [73, 103],
      [69, 97],
      [99, 157],
      [68, 103],
      [81, 118],
      [85, 126],
      [34, 39],
      [42, 51],
      [91, 143],
      [53, 82],
      [48, 59],
      [37, 45],
      [66, 87],
      [55, 72],
      [89, 139],
      [43, 56],
      [59, 86],
      [76, 113],
      [84, 123],
      [42, 48],
      [101, 156],
      [46, 65],
      [60, 79],
      [72, 108],
      [85, 124],
      [47, 66],
      [65, 91],
      [81, 117],
      [100, 151],
      [60, 78],
      [67, 93],
      [51, 67],
      [94, 149],
      [79, 113],
      [49, 61],
      [58, 75],
      [43, 51],
      [39, 46],
      [31, 42],
      [80, 112],
      [57, 75],
      [45, 54],
      [105, 162],
      [71, 108],
      [37, 44],
      [97, 146],
      [49, 66],
      [36, 49],
      [44, 61],
      [35, 45],
      [59, 80],
      [51, 78],
      [97, 147],
      [49, 60],
      [72, 112],
      [65, 84],
      [50, 60],
      [21, 23],
      [30, 41],
      [57, 84],
      [57, 76],
      [21, 22],
      [77, 118],
      [80, 113],
      [71, 105],
      [103, 159],
      [82, 120],
      [39, 53],
      [84, 120],
      [58, 74],
      [65, 85],
      [48, 69],
      [29, 32],
      [82, 127],
      [100, 154],
      [97, 153],
      [68, 93],
      [75, 115],
      [39, 51],
      [79, 112],
      [73, 100],
      [47, 65],
      [98, 149],
      [77, 107],
      [77, 113],
      [22, 23],
      [67, 100],
      [62, 72],
      [96, 143],
      [81, 116],
      [36, 52],
      [16, 22],
      [38, 49],
      [51, 66],
      [89, 135],
      [43, 50],
      [39, 46],
      [61, 89],
      [38, 54],
      [100, 156],
      [14, 17],
      [25, 31],
      [28, 37],
      [77, 118],
      [74, 102],
      [48, 69],
      [52, 64],
      [60, 81],
      [67, 94],
      [86, 124],
      [82, 116],
      [96, 142],
      [35, 48],
      [66, 86],
      [73, 105],
      [78, 109],
      [66, 99],
      [104, 163],
      [53, 79],
      [68, 90],
      [32, 34],
      [56, 73],
      [62, 88],
      [74, 103],
      [45, 61],
      [56, 73],
      [59, 79],
      [53, 68],
      [50, 77],
      [54, 69],
      [78, 108],
      [95, 150],
      [41, 48],
      [76, 119],
      [49, 68],
      [77, 109],
      [70, 107],
      [81, 117],
      [81, 115],
      [36, 47],
      [9, 9],
      [18, 23],
      [69, 94],
      [91, 148],
      [83, 118],
      [85, 122],
      [86, 138],
      [38, 42],
      [76, 105],
      [84, 121],
      [60, 89],
      [83, 119],
      [99, 150],
      [65, 82],
      [40, 47],
      [56, 70],
      [49, 64],
      [27, 34],
      [44, 51],
      [95, 143],
      [85, 123],
      [58, 75],
      [35, 40],
      [63, 89],
      [101, 158],
      [78, 119],
      [88, 142],
      [57, 85],
      [33, 45],
      [82, 117],
      [32, 46],
      [98, 157],
      [81, 115],
      [77, 119],
      [53, 79],
      [56, 83],
      [32, 43],
      [53, 67],
      [105, 161],
      [101, 155],
      [59, 78],
      [36, 51],
      [70, 94],
      [68, 95],
      [36, 41],
      [70, 108],
      [95, 142],
      [62, 80],
      [41, 56],
      [78, 107],
      [81, 114],
      [52, 77],
      [47, 57],
      [49, 61],
      [73, 101],
      [31, 37],
      [38, 47],
      [77, 113],
      [67, 95],
      [82, 122],
      [41, 48],
      [47, 56],
      [96, 153],
      [72, 111],
      [89, 140],
      [52, 65],
      [93, 147],
      [72, 110],
      [83, 129],
      [51, 65],
      [65, 83],
      [105, 165],
    ];

    const radioactiveIsotopes = [
      // Add any known radioactive isotopes here if needed.
    ];

    const a = z + n;

    if (z > 118) {
      param.error = "To date, the maximum number of protons is 118.";
      return param;
    } else if (n > 177) {
      param.error = "To date, the maximum number of neutrons is 177.";
      return param;
    } else if (a > 0 && z > 0 && n >= 0) {
      param.tech_symbol = elementSymbols[z - 1];

      if (checkIsotope(stableIsotopes, z, n)) {
        param.tech_stable = "Stable";
      } else if (checkIsotope(radioactiveIsotopes, z, n)) {
        param.tech_unstable = "Unstable";
      } else {
        param.tech_unobserved = "Unobserved";
      }

      param.tech_a = a;
      param.tech_asi = a * 1.66;
      return param;
    }

    param.error = "Please! Check Your Input.";
    return param;
  }

  /** getCalculationNernstEquationCalculator
   * POST: /api/calculators-lol/nernst-equation-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationNernstEquationCalculator(body) {
    let cal = String(body.tech_cal).trim();
    let ecell = parseFloat(body.tech_ecell);
    let ecell_unit = String(body.tech_ecell_unit).trim();
    let eo = parseFloat(body.tech_eo);
    let eo_unit = String(body.tech_eo_unit).trim();
    let t = parseFloat(body.tech_t);
    let t_unit = String(body.tech_t_unit).trim();
    let n = parseFloat(body.tech_n);
    let q = parseFloat(body.tech_q);

    let param = {};

    if (isNaN(ecell) || isNaN(eo) || isNaN(t) || isNaN(n) || isNaN(q)) {
      param.error = "Please! Check Your Input.";
      return param;
    }

    // Convert units
    if (ecell_unit === "mV") {
      ecell *= 0.001;
    }
    if (eo_unit === "mV") {
      eo *= 0.001;
    }
    if (t_unit === "°C") {
      t = t * 1 + 273.15;
    } else if (t_unit === "°F") {
      t = ((t - 32) * 5) / 9 + 273.15;
    }

    const r = 0.00008617332;

    try {
      if (cal === "ecell") {
        ecell = eo - (r * t * Math.log(q)) / n;
        param.tech_ans = `${ecell} <span class="text-green font-s-25">V</span>`;
      } else if (cal === "eo") {
        eo = ecell + (r * t * Math.log(q)) / n;
        param.tech_ans = `${eo} <span class="text-green font-s-25">V</span>`;
      } else if (cal === "t") {
        const denominator = Math.log(q) * r;
        if (denominator === 0) {
          t = Infinity;
        } else {
          t = ((eo - ecell) * n) / denominator;
        }
        param.tech_ans = `${t} <span class="text-green font-s-25">K</span>`;
      } else if (cal === "n") {
        if (eo - ecell === 0) {
          n = Infinity;
        } else {
          n = (Math.log(q) * r * t) / (eo - ecell);
        }
        param.tech_ans = n;
      } else if (cal === "q") {
        if (r * t === 0) {
          q = Infinity;
        } else {
          q = Math.exp((n * (eo - ecell)) / (r * t));
        }
        param.tech_ans = q;
      } else {
        param.error = "Please! Check Your Input.";
        return param;
      }

      return param;
    } catch (e) {
      param.error = "An error occurred during calculation.";
      return param;
    }
  }

  /**
   * getCalculationPartialPressureCalculator: Service Method
   * POST: /api/calculators-lol/partial-pressure-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationPartialPressureCalculator(body) {
    let formula = body.tech_formula;
    let to_cal1 = body.tech_to_cal1;
    let total = body.tech_total;
    let total_unit = body.tech_total_unit;
    let mole = body.tech_mole;
    let partial = body.tech_partial;
    let part_unit = body.tech_part_unit;
    let to_cal2 = body.tech_to_cal2;
    let amole = body.tech_amole;
    let temp = body.tech_temp;
    let temp_unit = body.tech_temp_unit;
    let volume = body.tech_volume;
    let vol_unit = body.tech_vol_unit;
    let partial1 = body.tech_partial1;
    let part_unit1 = body.tech_part_unit1;
    let to_cal3 = body.tech_to_cal3;
    let gas = body.tech_gas;
    let cons = body.tech_cons;
    let conc = body.tech_conc;
    let conc_unit = body.tech_conc_unit;
    let partial2 = body.tech_partial2;
    let part_unit2 = body.tech_part_unit2;
    let to_cal4 = body.tech_to_cal4;
    let gas1 = body.tech_gas1;
    let mole1 = body.tech_mole1;
    let partial3 = body.tech_partial3;
    let cons1 = body.tech_cons1;
    let cons1_unit2 = body.tech_cons1_unit2;
    let part_unit3 = body.tech_part_unit3;

    const param = {};

    try {
      if (formula == "1") {
        if (to_cal1 == "1") {
          if (isNumeric(total) && isNumeric(mole)) {
            if (mole > 1) {
              param.error = "Mole fraction value can't be greater than 1.";
              return param;
            } else {
              const ans = total * mole;
              param.tech_mode = 1;
              param.tech_ans = ans;
              param.tech_unit = total_unit;
              return param;
            }
          } else {
            param.error = "Please! Check Your Input.";
            return param;
          }
        } else if (to_cal1 == "2") {
          if (isNumeric(total) && isNumeric(partial)) {
            let convertedPartial = parseFloat(partial);
            let convertedTotal = parseFloat(total);

            if (part_unit !== total_unit) {
              convertedPartial = convertPressure(
                convertedPartial,
                part_unit,
                "Pa"
              );
              convertedTotal = convertPressure(
                convertedTotal,
                total_unit,
                "Pa"
              );
            }

            const ans = convertedPartial / convertedTotal;
            param.tech_mode = 2;
            param.tech_ans = ans;
            return param;
          } else {
            param.error = "Please! Check Your Input.";
            return param;
          }
        } else if (to_cal1 == "3") {
          if (isNumeric(partial) && isNumeric(mole)) {
            if (mole > 1) {
              param.error = "Mole fraction value can't be greater than 1.";
              return param;
            } else {
              const ans = partial / mole;
              param.tech_mode = 3;
              param.tech_ans = ans;
              param.tech_unit = part_unit;
              return param;
            }
          } else {
            param.error = "Please! Check Your Input.";
            return param;
          }
        }
      } else if (formula == "2") {
        if (to_cal2 == "1") {
          if (isNumeric(amole) && isNumeric(temp) && isNumeric(volume)) {
            let convertedVolume = parseFloat(volume);
            let convertedTemp = parseFloat(temp);

            convertedVolume = convertVolume(convertedVolume, vol_unit, "m³");
            convertedTemp = convertTemperature(convertedTemp, temp_unit, "K");

            const ans = (amole * 8.3145 * convertedTemp) / convertedVolume;
            param.tech_mode = 4;
            param.tech_ans = ans;
            return param;
          } else {
            param.error = "Please! Check Your Input.";
            return param;
          }
        } else if (to_cal2 == "2") {
          if (isNumeric(amole) && isNumeric(temp) && isNumeric(partial1)) {
            let convertedPartial1 = convertPressure(
              parseFloat(partial1),
              part_unit1,
              "Pa"
            );
            let convertedTemp = convertTemperature(
              parseFloat(temp),
              temp_unit,
              "K"
            );

            const ans = (amole * 8.3145 * convertedTemp) / convertedPartial1;
            param.tech_mode = 5;
            param.tech_ans = ans;
            return param;
          } else {
            param.error = "Please! Check Your Input.";
            return param;
          }
        } else if (to_cal2 == "3") {
          if (isNumeric(amole) && isNumeric(volume) && isNumeric(partial1)) {
            let convertedVolume = convertVolume(
              parseFloat(volume),
              vol_unit,
              "m³"
            );
            let convertedPartial1 = convertPressure(
              parseFloat(partial1),
              part_unit1,
              "Pa"
            );

            const ans =
              (convertedVolume * convertedPartial1) / (amole * 8.3145);
            param.tech_mode = 6;
            param.tech_ans = ans;
            return param;
          } else {
            param.error = "Please! Check Your Input.";
            return param;
          }
        } else if (to_cal2 == "4") {
          if (isNumeric(temp) && isNumeric(volume) && isNumeric(partial1)) {
            let convertedVolume = convertVolume(
              parseFloat(volume),
              vol_unit,
              "m³"
            );
            let convertedPartial1 = convertPressure(
              parseFloat(partial1),
              part_unit1,
              "Pa"
            );
            let convertedTemp = convertTemperature(
              parseFloat(temp),
              temp_unit,
              "K"
            );

            const ans =
              (convertedVolume * convertedPartial1) / (convertedTemp * 8.3145);
            param.tech_mode = 7;
            param.tech_ans = ans;
            return param;
          } else {
            param.error = "Please! Check Your Input.";
            return param;
          }
        }
      } else if (formula == "3") {
        let gasConstant;

        switch (gas) {
          case "1":
            gasConstant = 77942230;
            break;
          case "2":
            gasConstant = 129903716;
            break;
          case "3":
            gasConstant = 2979968;
            break;
          case "4":
            gasConstant = 166106126;
            break;
          case "5":
            gasConstant = 273851078;
            break;
          case "6":
            gasConstant = 225166442;
            break;
          case "7":
            gasConstant = 72374421;
            break;
          case "8":
            gasConstant = 106657735;
            break;
          case "9":
            if (!isNumeric(cons)) {
              param.error = "Please! Check Your Input.";
              return param;
            } else {
              gasConstant = 101325 * cons;
            }
            break;
          default:
            param.error = "Invalid gas selection";
            return param;
        }

        if (to_cal3 == "1") {
          if (isNumeric(gasConstant) && isNumeric(conc)) {
            let convertedConc = convertConcentration(
              parseFloat(conc),
              conc_unit,
              "M"
            );
            const ans = gasConstant * convertedConc;
            param.tech_mode = 4;
            param.tech_ans = ans;
            return param;
          } else {
            param.error = "Please! Check Your Input.";
            return param;
          }
        } else if (to_cal3 == "2") {
          if (isNumeric(gasConstant) && isNumeric(partial2)) {
            let convertedPartial2 = convertPressure(
              parseFloat(partial2),
              part_unit2,
              "Pa"
            );
            const ans = convertedPartial2 / gasConstant;
            param.tech_mode = 8;
            param.tech_ans = ans;
            return param;
          } else {
            param.error = "Please! Check Your Input.";
            return param;
          }
        }
      } else if (formula == "4") {
        let gasConstant1;

        switch (gas1) {
          case "1":
            gasConstant1 = 4315431750;
            break;
          case "2":
            gasConstant1 = 7193061750;
            break;
          case "3":
            gasConstant1 = 165159750;
            break;
          case "4":
            gasConstant1 = 9197270250;
            break;
          case "5":
            gasConstant1 = 15168352500;
            break;
          case "6":
            gasConstant1 = 12462975000;
            break;
          case "7":
            gasConstant1 = 4007403750;
            break;
          case "8":
            gasConstant1 = 5905221000;
            break;
          case "9":
            if (!isNumeric(cons1)) {
              param.error = "Please! Check Your Input.";
              return param;
            } else {
              gasConstant1 = convertPressure(
                parseFloat(cons1),
                cons1_unit2,
                "Pa"
              );
            }
            break;
          default:
            param.error = "Invalid gas selection";
            return param;
        }

        if (to_cal4 == "1") {
          if (isNumeric(mole1) && isNumeric(gasConstant1)) {
            if (mole1 > 1) {
              param.error = "Mole fraction value can't be greater than 1.";
              return param;
            } else {
              const ans = mole1 * gasConstant1;
              param.tech_mode = 4;
              param.tech_ans = ans;
              return param;
            }
          } else {
            param.error = "Please! Check Your Input.";
            return param;
          }
        } else if (to_cal4 == "2") {
          if (isNumeric(partial3) && isNumeric(gasConstant1)) {
            let convertedPartial3 = convertPressure(
              parseFloat(partial3),
              part_unit3,
              "Pa"
            );
            const ans = convertedPartial3 / gasConstant1;
            param.tech_mode = 2;
            param.tech_ans = ans;
            return param;
          } else {
            param.error = "Please! Check Your Input.";
            return param;
          }
        }
      }

      param.error = "Invalid formula or calculation type";
      return param;
    } catch (error) {
      param.error = "Calculation error: " + error.message;
      return param;
    }

    // Helper functions
    function isNumeric(value) {
      return !isNaN(parseFloat(value)) && isFinite(value);
    }

    function convertPressure(value, fromUnit, toUnit = "Pa") {
      const conversionFactors = {
        Bar: 100000,
        Torr: 133.32,
        psi: 6895,
        atm: 101325,
        hPa: 100,
        MPa: 1000000,
        kPa: 1000,
        GPa: 1000000000,
        mmHg: 133.32,
        "in Hg": 3386.4,
        Pa: 1,
      };

      if (conversionFactors[fromUnit]) {
        return value * conversionFactors[fromUnit];
      }
      return value;
    }

    function convertVolume(value, fromUnit, toUnit = "m³") {
      const conversionFactors = {
        "cm³": 1e-6,
        "mm³": 1e-9,
        "dm³": 0.001,
        "ft³": 0.0283168,
        "yd³": 0.764555,
        "in³": 1.63871e-5,
        litre: 0.001,
        "m³": 1,
      };

      if (conversionFactors[fromUnit]) {
        return value * conversionFactors[fromUnit];
      }
      return value;
    }

    function convertTemperature(value, fromUnit, toUnit = "K") {
      if (fromUnit === "°C") {
        return value + 273.15;
      } else if (fromUnit === "°F") {
        return ((value - 32) * 5) / 9 + 273.15;
      }
      return value; // Assuming it's already in Kelvin
    }

    function convertConcentration(value, fromUnit, toUnit = "M") {
      const conversionFactors = {
        mM: 0.001,
        μM: 1e-6,
        nM: 1e-9,
        pM: 1e-12,
        fM: 1e-15,
        aM: 1e-18,
        zM: 1e-21,
        yM: 1e-24,
        M: 1,
      };

      if (conversionFactors[fromUnit]) {
        return value * conversionFactors[fromUnit];
      }
      return value;
    }
  }

  /** getCalculationMolecularFormulaCalculator
   * POST: /api/calculators-lol/molecular-formula-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationMolecularFormulaCalculator(body) {
    let no1 = parseFloat(body.tech_no1);
    let opt1 = body.tech_opt1?.trim();
    let no2 = parseFloat(body.tech_no2);
    let opt2 = body.tech_opt2?.trim();

    let response = {};

    if (isFinite(no1) && isFinite(no2) && opt1 && opt2) {
      let [nbr1, name] = opt1.split("@@");
      let [nbr2, name2] = opt2.split("@@");

      nbr1 = parseFloat(nbr1);
      nbr2 = parseFloat(nbr2);

      if (!isFinite(nbr1) || !isFinite(nbr2)) {
        response.error = "Invalid compound structure in opt1 or opt2.";
        return response;
      }

      let final_result1 = no1 / nbr1;
      let final_result2 = no2 / nbr2;
      let final_result3 = final_result1 / final_result2;

      response.tech_mode = 2;
      response.tech_name = name;
      response.tech_name2 = name2;
      response.tech_nbr1 = nbr1;
      response.tech_nbr2 = nbr2;
      response.tech_no1 = no1;
      response.tech_no2 = no2;
      response.tech_final_result1 = final_result1;
      response.tech_final_result2 = final_result2;
      response.tech_final_result3 = final_result3;

      return response;
    } else {
      return { error: "Please! Check Your Input." };
    }
  }

  /** getCalculationFormalChargeCalculator
   * POST: /api/calculators-lol/formal-charge-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationFormalChargeCalculator(body) {
    let V = parseFloat(body.tech_V);
    let LP = parseFloat(body.tech_LP);
    let BE = parseFloat(body.tech_BE);

    let response = {};

    if (isFinite(V) && isFinite(LP) && isFinite(BE)) {
      let formal = V - (LP + 0.5 * BE);

      response.tech_formal = formal;
      return response;
    } else {
      response.error = "Please! Check Your Input.";
      return response;
    }
  }

  /** getCalculationGramsToMolesCalculator
   * POST: /api/calculators-lol/grams-to-moles-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationGramsToMolesCalculator(body) {
    let chemical_selection = body.tech_chemical_selection;
    let unit = body.tech_unit;
    let mm_unit = body.tech_mm_unit;
    let mm = parseFloat(body.tech_mm);
    let m_unit = body.tech_m_unit;
    let m = parseFloat(body.tech_m);
    let nm = parseFloat(body.tech_nm);
    let nm_unit = body.tech_nm_unit;

    if (nm_unit == "mol") {
      nm_unit = "1";
    } else if (nm_unit == "mmol") {
      nm_unit = "2";
    } else if (nm_unit == "μmol") {
      nm_unit = "3";
    } else if (nm_unit == "nmol") {
      nm_unit = "4";
    } else if (nm_unit == "pmol") {
      nm_unit = "5";
    }

    if (m_unit == "ng") {
      m_unit = "1";
    } else if (m_unit == "µg") {
      m_unit = "2";
    } else if (m_unit == "mg") {
      m_unit = "3";
    } else if (m_unit == "g") {
      m_unit = "4";
    } else if (m_unit == "dag") {
      m_unit = "5";
    } else if (m_unit == "kg") {
      m_unit = "6";
    }

    if (mm_unit == "g/mol") {
      mm_unit = "1";
    } else if (mm_unit == "dag/mol") {
      mm_unit = "2";
    } else if (mm_unit == "kg/mol") {
      mm_unit = "3";
    }

    let param = {};
    let mm_convert, m_convert, ans1, ans2, nm_convert, ans3, ans4, ans5, ans6;
    if (unit === "1") {
      if (!isNaN(mm) && !isNaN(m) && mm > 0 && m > 0) {
        if (mm_unit == "1") {
          mm_convert = mm * 1;
        } else if (mm_unit == "2") {
          mm_convert = mm * 10;
        } else if (mm_unit == "3") {
          mm_convert = mm * 1000;
        }
        if (m_unit == "1") {
          m_convert = m * 0.000000001;
        } else if (m_unit == "2") {
          m_convert = m * 0.000001;
        } else if (m_unit == "3") {
          m_convert = m * 0.001;
        } else if (m_unit == "4") {
          m_convert = m * 1;
        } else if (m_unit == "5") {
          m_convert = m * 10;
        } else if (m_unit == "6") {
          m_convert = m * 1000;
        }
        ans1 = m_convert / mm_convert;
        ans2 = ans1 * 6.02214085774;

        param.tech_ans90 = m_convert;
        param.tech_ans91 = mm_convert;
        param.tech_ans1 = ans1;
        param.tech_ans2 = ans2;
      } else {
        param.error = "Please! Check Your Input.";
      }
    } else if (unit === "2") {
      if (!isNaN(mm) && !isNaN(nm) && mm > 0 && nm > 0) {
        if (mm_unit == "1") {
          mm_convert = mm * 1;
        } else if (mm_unit == "2") {
          mm_convert = mm * 10;
        } else if (mm_unit == "3") {
          mm_convert = mm * 1000;
        }
        if (nm_unit == "1") {
          nm_convert = nm * 1;
        } else if (nm_unit == "2") {
          nm_convert = nm * 0.001;
        } else if (nm_unit == "3") {
          nm_convert = nm * 0.000001;
        } else if (nm_unit == "4") {
          nm_convert = nm * 0.000000001;
        } else if (nm_unit == "5") {
          nm_convert = nm * 0.000000000001;
        }
        ans3 = nm_convert * mm_convert;
        ans4 = nm_convert * 6.02214085774;

        param.tech_ans90 = mm_convert;
        param.tech_ans91 = nm_convert;
        param.tech_ans3 = ans3;
        param.tech_ans4 = ans4;
      } else {
        param.error = "Please! Check Your Input.";
      }
    } else if (unit === "3") {
      if (!isNaN(m) && !isNaN(nm) && m > 0 && nm > 0) {
        if (m_unit == "1") {
          m_convert = m * 0.000000001;
        } else if (m_unit == "2") {
          m_convert = m * 0.000001;
        } else if (m_unit == "3") {
          m_convert = m * 0.001;
        } else if (m_unit == "4") {
          m_convert = m * 1;
        } else if (m_unit == "5") {
          m_convert = m * 10;
        } else if (m_unit == "6") {
          m_convert = m * 1000;
        }
        if (nm_unit == "1") {
          nm_convert = nm * 1;
        } else if (nm_unit == "2") {
          nm_convert = nm * 0.001;
        } else if (nm_unit == "3") {
          nm_convert = nm * 0.000001;
        } else if (nm_unit == "4") {
          nm_convert = nm * 0.000000001;
        } else if (nm_unit == "5") {
          nm_convert = nm * 0.000000000001;
        }
        ans5 = m_convert / nm_convert;
        ans6 = nm_convert * 6.02214085774;

        param.tech_ans5 = ans5;
        param.tech_ans6 = ans6;
        param.tech_ans90 = m_convert;
        param.tech_ans91 = nm_convert;
      } else {
        param.error = "Please! Check Your Input.";
      }
    }

    return param;
  }

  /** getCalculationMolesToGramsCalculator
   * POST: /api/calculators-lol/moles-to-grams-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationMolesToGramsCalculator(body) {
    let {
      tech_chemical_selection,
      tech_unit: unit,
      tech_mm_unit: mm_unit,
      tech_mm: mm,
      tech_m_unit: m_unit,
      tech_m: m,
      tech_nm: nm,
      tech_nm_unit: nm_unit,
    } = body;

    let param = {};
    let nmUnits,
      mm_convert,
      m_convert,
      ans1,
      ans2,
      ans3,
      ans4,
      ans5,
      ans6,
      nm_convert;

    if (nm_unit == "mol") {
      nm_unit = "1";
    } else if (nm_unit == "mmol") {
      nm_unit = "2";
    } else if (nm_unit == "μmol") {
      nm_unit = "3";
    } else if (nm_unit == "nmol") {
      nm_unit = "4";
    } else if (nm_unit == "pmol") {
      nm_unit = "5";
    }

    if (m_unit == "ng") {
      m_unit = "1";
    } else if (m_unit == "µg") {
      m_unit = "2";
    } else if (m_unit == "mg") {
      m_unit = "3";
    } else if (m_unit == "g") {
      m_unit = "4";
    } else if (m_unit == "dag") {
      m_unit = "5";
    } else if (m_unit == "kg") {
      m_unit = "6";
    }

    if (mm_unit == "g/mol") {
      mm_unit = "1";
    } else if (mm_unit == "dag/mol") {
      mm_unit = "2";
    } else if (mm_unit == "kg/mol") {
      mm_unit = "3";
    }

    if (unit === "1") {
      if (!isNaN(mm) && !isNaN(m) && mm > 0 && m > 0) {
        if (mm_unit == "1") {
          mm_convert = mm * 1;
        } else if (mm_unit == "2") {
          mm_convert = mm * 10;
        } else if (mm_unit == "3") {
          mm_convert = mm * 1000;
        }
        if (m_unit == "1") {
          m_convert = m * 0.000000001;
        } else if (m_unit == "2") {
          m_convert = m * 0.000001;
        } else if (m_unit == "3") {
          m_convert = m * 0.001;
        } else if (m_unit == "4") {
          m_convert = m * 1;
        } else if (m_unit == "5") {
          m_convert = m * 10;
        } else if (m_unit == "6") {
          m_convert = m * 1000;
        }
        ans1 = m_convert / mm_convert;
        ans2 = ans1 * 6.02214085774;

        param = {
          tech_ans90: m_convert,
          tech_ans91: mm_convert,
          tech_ans1: ans1,
          tech_ans2: ans2,
        };
      } else {
        param.error = "Please! Check Your Input.";
      }
    } else if (unit === "2") {
      if (!isNaN(mm) && !isNaN(nm) && mm > 0 && nm > 0) {
        if (mm_unit == "1") {
          mm_convert = mm * 1;
        } else if (mm_unit == "2") {
          mm_convert = mm * 10;
        } else if (mm_unit == "3") {
          mm_convert = mm * 1000;
        }
        if (nm_unit == "1") {
          nm_convert = nm * 1;
        } else if (nm_unit == "2") {
          nm_convert = nm * 0.001;
        } else if (nm_unit == "3") {
          nm_convert = nm * 0.000001;
        } else if (nm_unit == "4") {
          nm_convert = nm * 0.000000001;
        } else if (nm_unit == "5") {
          nm_convert = nm * 0.000000000001;
        }
        ans3 = nm_convert * mm_convert;
        ans4 = nm_convert * 6.02214085774;

        param = {
          tech_ans90: mm_convert,
          tech_ans91: nm_convert,
          tech_ans3: ans3,
          tech_ans4: ans4,
        };
      } else {
        param.error = "Please! Check Your Input.";
      }
    } else if (unit === "3") {
      if (!isNaN(m) && !isNaN(nm) && m > 0 && nm > 0) {
        if (m_unit == "1") {
          m_convert = m * 0.000000001;
        } else if (m_unit == "2") {
          m_convert = m * 0.000001;
        } else if (m_unit == "3") {
          m_convert = m * 0.001;
        } else if (m_unit == "4") {
          m_convert = m * 1;
        } else if (m_unit == "5") {
          m_convert = m * 10;
        } else if (m_unit == "6") {
          m_convert = m * 1000;
        }
        if (nm_unit == "1") {
          nm_convert = nm * 1;
        } else if (nm_unit == "2") {
          nm_convert = nm * 0.001;
        } else if (nm_unit == "3") {
          nm_convert = nm * 0.000001;
        } else if (nm_unit == "4") {
          nm_convert = nm * 0.000000001;
        } else if (nm_unit == "5") {
          nm_convert = nm * 0.000000000001;
        }
        ans5 = m_convert / nm_convert;
        ans6 = nm_convert * 6.02214085774;

        param = {
          tech_ans90: m_convert,
          tech_ans91: nm_convert,
          tech_ans5: ans5,
          tech_ans6: ans6,
        };
      } else {
        param.error = "Please! Check Your Input.";
      }
    }

    return param;
  }

  /**
   * getCalculationPhCalculator: Service Method
   * POST: /api/calculators-lol/ph-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationPhCalculator(body) {
    let concentration = body.tech_concentration;
    let con_units = body.tech_con_units;
    let chemical_name = body.tech_chemical_name;
    let chemical_selection = body.tech_chemical_selection;
    let post_space = body.tech_post_space;
    let po_units = body.tech_po_units;
    let f_length = body.tech_f_length;
    let fl_units = body.tech_fl_units;
    let operation = body.tech_operation;
    let second = body.tech_second;

    const result = {};

    // Helper function to convert concentration units to M (Molar)
    function convertUnits(a, b) {
      const conversions = {
        M: 1,
        mM: 0.001,
        µM: 0.000001,
        nM: 0.000000001,
        pM: 0.000000000001,
        fM: 0.000000000000001,
        aM: 0.000000000000000001,
        zM: 0.000000000000000000001,
      };
      return a * (conversions[b] || 1);
    }

    // Helper function to convert weight units to grams
    function convertWeight(c, d) {
      const conversions = {
        ng: c / 1000000000,
        µg: c / 1000000,
        mg: c / 1000,
        g: c * 1,
        dag: c * 10,
        kg: c * 1000,
        gr: c / 15.432,
        dr: c * 3.41,
        lbs: c * 454,
        stones: c * 6350,
        "oz t": c * 31.103,
        oz: c * 28.35,
        t: c * 1000000,
      };
      return conversions[d] || c;
    }

    // Helper function to convert volume units to liters
    function convertVolume(x, y) {
      const conversions = {
        "mm³": x / 1000000,
        "cm³": x / 1000,
        "dm³": x * 1,
        "m³": x * 1000,
        "in³": x * 61.024,
        "ft³": x * 28.317,
        ml: x / 1000,
        cl: x / 100,
        liters: x * 1,
        "US gal": x * 3.785,
        "UK gal": x * 4.546,
        "US fl oz": x / 33.814,
        "UK fl oz": x / 35.195,
      };
      return conversions[y] || x;
    }

    try {
      let pH, pho, OH, H, pka;
      let chemicalValue;

      if (chemical_selection === "1") {
        if (concentration > 0) {
          // Convert chemical_name to number
          chemicalValue = parseFloat(chemical_name);

          const conc = convertUnits(parseFloat(concentration), con_units);
          const res1 = chemicalValue * conc;
          const res2 = Math.sqrt(res1);
          const res3 = Math.log10(res2);
          pH = res3 * -1;
          H = Math.pow(10, -pH);
          pho = 14 - pH;
          OH = Math.pow(10, -pho);
          const pk_a = Math.log10(chemicalValue);
          pka = pk_a * -1;

          pH = pH.toFixed(4);
          pho = pho.toFixed(2);
          pka = pka.toFixed(3);
        } else {
          result.error = "Please! Concentration greater than 0.";
          return result;
        }
      } else if (chemical_selection === "2") {
        if (concentration > 0) {
          // Convert chemical_name to number
          chemicalValue = parseFloat(chemical_name);

          const conc = convertUnits(parseFloat(concentration), con_units);
          const res1 = chemicalValue * conc * 4;
          const res2 = Math.sqrt(res1);
          const re = (res2 - chemicalValue) / 2;
          const ans1 = 0.00000000000001 / re;
          const res3 = Math.log10(ans1);
          pH = res3 * -1;
          H = Math.pow(10, -pH);
          pho = 14 - pH;
          OH = Math.pow(10, -pho);
          const pk_a = Math.log10(chemicalValue);
          pka = pk_a * -1;

          pH = pH.toFixed(4);
          pho = pho.toFixed(2);
          pka = pka.toFixed(3);
        } else {
          result.error = "Please! Concentration greater than 0.";
          return result;
        }
      } else if (chemical_selection === "3") {
        if (parseFloat(f_length) > 0 && parseFloat(post_space) > 0) {
          const length = convertWeight(parseFloat(f_length), fl_units);
          const volume = convertVolume(parseFloat(post_space), po_units);

          // Check if chemical_name contains '&'
          let v, m;
          if (chemical_name.includes("&")) {
            [v, m] = chemical_name.split("&").map(parseFloat);
          } else {
            // If no '&', treat chemical_name as Ka value (v) with default molecular weight
            v = parseFloat(chemical_name);
            m = 1; // Default molecular weight
          }

          const moles = m !== 0 ? length / m : 0;
          const conc = volume !== 0 ? moles / volume : 0;

          // Check if calculation will result in valid numbers
          if (conc <= 0 || v <= 0) {
            result.error = "Invalid calculation parameters";
            return result;
          }

          const res1 = v * conc;
          const res2 = Math.sqrt(res1);
          const res3 = Math.log10(res2);
          pH = res3 * -1;
          H = Math.pow(10, -pH);
          pho = 14 - pH;
          OH = Math.pow(10, -pho);
          const pk_a = Math.log10(v);
          pka = pk_a * -1;

          // Check for Infinity or NaN
          if (!isFinite(pH) || !isFinite(pho)) {
            pH = "inf";
            pho = "inf";
            OH = Infinity;
          } else {
            pH = pH.toFixed(4);
            pho = pho.toFixed(2);
          }
          pka = pka.toFixed(3);
        } else {
          result.error = "Please! Input greater than 0.";
          return result;
        }
      } else if (chemical_selection === "4") {
        if (parseFloat(f_length) > 0 && parseFloat(post_space) > 0) {
          const length = convertWeight(parseFloat(f_length), fl_units);
          const volume = convertVolume(parseFloat(post_space), po_units);

          // Check if chemical_name contains '&'
          let v, m;
          if (chemical_name.includes("&")) {
            [v, m] = chemical_name.split("&").map(parseFloat);
          } else {
            // If no '&', treat chemical_name as Kb value (v) with default molecular weight
            v = parseFloat(chemical_name);
            m = 1; // Default molecular weight
          }

          const moles = m !== 0 ? length / m : 0;
          const conc = volume !== 0 ? moles / volume : 0;

          // Check if calculation will result in valid numbers
          if (conc <= 0 || v <= 0) {
            result.error = "Invalid calculation parameters";
            return result;
          }

          const res3 = Math.log10(conc);
          pho = res3 * -1;
          pH = 14 - pho;
          H = Math.pow(10, -pH);
          OH = Math.pow(10, -pho);
          const pk_a = Math.log10(v);
          pka = pk_a * -1;

          // Check for Infinity or NaN
          if (!isFinite(pH) || !isFinite(pho)) {
            pH = "inf";
            pho = "inf";
          } else {
            pH = pH.toFixed(4);
            pho = pho.toFixed(2);
          }
          pka = pka.toFixed(3);
        } else {
          result.error = "Please! Input greater than 0.";
          return result;
        }
      } else if (chemical_selection === "5") {
        if (operation === "1") {
          if (parseFloat(concentration) > 0) {
            const conc = convertUnits(parseFloat(concentration), con_units);
            const res3 = Math.log10(conc);
            pH = res3 * -1;
            pho = 14 - pH;
            OH = Math.pow(10, -pho);

            pH = pH.toFixed(4);
            pho = pho.toFixed(4);
          } else {
            result.error = "Please! Input greater than 0.";
            return result;
          }
        } else if (operation === "2") {
          if (!isNaN(second)) {
            pH = 14 - parseFloat(second);
            H = Math.pow(10, -pH);
            OH = Math.pow(10, -parseFloat(second));
          } else {
            result.error = "Please! Input greater than 0.";
            return result;
          }
        } else if (operation === "3") {
          if (parseFloat(concentration) > 0) {
            const conc = convertUnits(parseFloat(concentration), con_units);
            const res3 = Math.log10(conc);
            pho = res3 * -1;
            pH = 14 - pho;
            H = Math.pow(10, -pH);
          } else {
            result.error = "Please! Input greater than 0.";
            return result;
          }
        }
      }

      // Add non-empty values to result
      if (pH !== undefined) result.tech_pH = pH;
      if (pho !== undefined) result.tech_pho = pho;
      if (OH !== undefined) result.tech_OH = OH;
      if (H !== undefined) result.tech_H = H;
      if (pka !== undefined) result.tech_pka = pka;

      return result;
    } catch (error) {
      result.error = "Calculation error: " + error.message;
      return result;
    }
  }

  /** getCalculationEquilibriumConstantCalculator
   * POST: /api/calculators-lol/equilibrium-constant-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationEquilibriumConstantCalculator(body) {
    let concentration_one = parseFloat(body.tech_concentration_one);
    let concentration_one_unit = body.tech_concentration_one_unit;
    let concentration_two = parseFloat(body.tech_concentration_two);
    let concentration_two_unit = body.tech_concentration_two_unit;
    let concentration_three = parseFloat(body.tech_concentration_three);
    let concentration_three_unit = body.tech_concentration_three_unit;
    let concentration_four = parseFloat(body.tech_concentration_four);
    let concentration_four_unit = body.tech_concentration_four_unit;

    let a = parseFloat(body.tech_a);
    let b = parseFloat(body.tech_b);
    let c = parseFloat(body.tech_c);
    let d = parseFloat(body.tech_d);
    let selection = body.tech_selection;
    let chemical_equation = body.tech_chemical_equation || "";
    let total_pressure = parseFloat(body.tech_total_pressure);

    let response = {};

    // Input validation for chemical equation
    if (/[<>&]|php|print_r|print|echo|script|%/i.test(chemical_equation)) {
      response.error = "Please Enter Valid Input.";
      return response;
    }

    // Helper: Convert unit
    function convertUnit(unit, value) {
      switch (unit) {
        case "M":
          return value * 1;
        case "mM":
          return value * 0.001;
        case "μM":
          return value * 1e-6;
        case "nM":
          return value * 1e-9;
        case "pM":
          return value * 1e-12;
        case "fM":
          return value * 1e-15;
        case "aM":
        case "zM":
        case "yM":
          return value * 0;
        default:
          return NaN;
      }
    }

    if (chemical_equation) {
      if (selection === "1") {
        if (
          isFinite(concentration_one) &&
          isFinite(concentration_two) &&
          isFinite(concentration_three) &&
          isFinite(concentration_four) &&
          isFinite(a) &&
          isFinite(b) &&
          isFinite(c) &&
          isFinite(d)
        ) {
          let first_value = convertUnit(
            concentration_one_unit,
            concentration_one
          );
          let second_value = convertUnit(
            concentration_two_unit,
            concentration_two
          );
          let third_value = convertUnit(
            concentration_three_unit,
            concentration_three
          );
          let fourth_value = convertUnit(
            concentration_four_unit,
            concentration_four
          );

          let Kc =
            (Math.pow(third_value, c) * Math.pow(fourth_value, d)) /
            (Math.pow(second_value, b) * Math.pow(first_value, a));

          response.tech_answer = Kc;
          response.tech_opt = selection;
          return response;
        } else {
          response.error = "Please! Check Your Input.";
          return response;
        }
      } else if (selection === "2") {
        if (isFinite(total_pressure) && chemical_equation !== "") {
          response.tech_equation = chemical_equation;
          response.tech_total_pressure = total_pressure;
          response.tech_opt = selection;
          return response;
        } else {
          response.error = "Please! Check Your Input.";
          return response;
        }
      }
    }

    response.error = "Please Enter Valid Input.";
    return response;
  }

  /** getCalculationAtomtoMolesCalculator
   * POST: /api/calculators-lol/atoms-to-moles-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationAtomtoMolesCalculator(body) {
    let form = body.tech_form?.trim();
    let x = parseFloat(body.tech_x?.trim());

    let response = {};

    if (isFinite(x)) {
      let ans;

      if (form === "raw") {
        // Convert atomic mass unit to grams
        ans = x * 1.66053907e-24;
      } else {
        // Convert grams to number of atoms/moles
        ans = x * 6.02214076e23;
      }

      response.tech_ans = ans;
      return response;
    } else {
      return { error: "Please! Check Your Input." };
    }
  }

  /** getCalculationGramstoAtomsCalculator
   * POST: /api/calculators-lol/grams-to-atoms-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationGramstoAtomsCalculator(body) {
    let form = body.tech_form?.trim();
    let x = parseFloat(body.tech_x?.trim());
    let y = parseFloat(body.tech_y?.trim());

    let response = {};

    if (isFinite(x)) {
      const na = 6.02214076e23;
      let ans;

      if (form === "raw") {
        ans = (na * y) / x;
      } else {
        ans = (y * x) / na;
      }

      response.tech_ans = ans.toExponential(3); // Same as sprintf('%.3e', ...) in PHP
      return response;
    } else {
      return { error: "Please! Check Your Input." };
    }
  }

  /**
   * getCalculationBoylesLawCalculator: Service Method
   * POST: /api/calculators-lol/boyles-law-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationBoylesLawCalculator(body) {
    let find = body.tech_find;
    let v1 = body.tech_v1;
    let v1_unit = body.tech_v1_unit;
    let p1 = body.tech_p1;
    let p1_unit = body.tech_p1_unit;
    let v2 = body.tech_v2;
    let v2_unit = body.tech_v2_unit;
    let p2 = body.tech_p2;
    let p2_unit = body.tech_p2_unit;
    let R = body.tech_R;
    let temp = body.tech_temp;
    let temp_unit = body.tech_temp_unit;
    let amount = body.tech_amount;

    const result = {};

    // Pressure conversion function
    function convertPressure(unit, value) {
      const conversions = {
        Pa: 1,
        Bar: 100000,
        psi: 6895,
        at: 98068,
        atm: 101325,
        Torr: 133.32,
        hPa: 100,
        kPa: 1000,
        MPa: 1000,
        GPa: 1000000000,
        "in Hg": 3386.4,
        mmHg: 133.32,
      };
      return value * (conversions[unit] || 1);
    }

    // Volume conversion function
    function convertVolume(unit, value) {
      const conversions = {
        "mm³": 0.000000001,
        "cm³": 0.000001,
        "dm³": 0.001,
        "m³": 1,
        "in³": 0.000016387,
        "ft³": 0.028317,
        "yd³": 0.7646,
        ml: 0.000001,
        liters: 0.001,
      };
      return value * (conversions[unit] || 1);
    }

    // Temperature conversion function
    function convertTemp(unit, value) {
      if (unit === "°C") {
        return value + 273.15;
      } else if (unit === "°F") {
        return (value - 32) * (5 / 9) + 273.15;
      } else if (unit === "K") {
        return value;
      }
      return value;
    }

    let method, formula, content;

    if (find === "1") {
      // Find Volume V2
      if (isNumeric(p1) && isNumeric(v1) && isNumeric(p2)) {
        method = 1;
        const pressure_one = convertPressure(p1_unit, p1);
        const volume_one = convertVolume(v1_unit, v1);
        const pressure_two = convertPressure(p2_unit, p2);
        formula = (pressure_one * volume_one) / pressure_two;
        content = "Final Volume (V₂)";
      } else {
        result.error = "Please! Check Your Input.";
        return result;
      }
    } else if (find === "2") {
      // Find Pressure P2
      if (isNumeric(p1) && isNumeric(v1) && isNumeric(v2)) {
        method = 2;
        const pressure_one = convertPressure(p1_unit, p1);
        const volume_one = convertVolume(v1_unit, v1);
        const volume_two = convertVolume(v2_unit, v2);
        formula = pressure_one * (volume_one / volume_two);
        content = "Final Pressure (P₂)";
      } else {
        result.error = "Please! Check Your Input.";
        return result;
      }
    } else if (find === "3") {
      // Find Volume V1
      if (isNumeric(p1) && isNumeric(p2) && isNumeric(v2)) {
        method = 3;
        const pressure_one = convertPressure(p1_unit, p1);
        const pressure_two = convertPressure(p2_unit, p2);
        const volume_two = convertVolume(v2_unit, v2);
        formula = pressure_two * (volume_two / pressure_one);
        content = "Initial Volume (V₁)";
      } else {
        result.error = "Please! Check Your Input.";
        return result;
      }
    } else if (find === "4") {
      // Find Pressure P1
      if (isNumeric(v1) && isNumeric(v2) && isNumeric(p2)) {
        method = 4;
        const pressure_two = convertPressure(p2_unit, p2);
        const volume_one = convertVolume(v1_unit, v1);
        const volume_two = convertVolume(v2_unit, v2);
        formula = pressure_two * (volume_two / volume_one);
        content = "Initial Pressure (P₁)";
      } else {
        result.error = "Please! Check Your Input.";
        return result;
      }
    } else if (find === "5") {
      // Find Temperature
      if (isNumeric(p1) && isNumeric(v1) && isNumeric(R) && isNumeric(amount)) {
        method = 5;
        const final = (p1 * v1) / (R * amount);
        content = "Temperature";
        result.tech_method = method;
        result.tech_content = content;
        result.tech_pooran = final;
        return result;
      }
    } else if (find === "6") {
      // Find Amount of Gas
      if (isNumeric(p1) && isNumeric(v1) && isNumeric(R) && isNumeric(temp)) {
        method = 6;
        const temp_value = convertTemp(temp_unit, temp);
        const f = p1 * v1;
        const s = R * temp_value;
        const final = f / s;
        content = "Amount of gas (n)";
        result.tech_content = content;
        result.tech_final = final;
      } else {
        result.error = "Please! Check Your Input.";
        return result;
      }
    }

    const tempValue = 295;
    const first = p1 * v1;
    const second = R * tempValue;
    const final = first / second;

    result.tech_ans = formula;
    result.tech_method = method;
    result.tech_temp = tempValue;
    result.tech_n = parseFloat(final.toFixed(3));
    result.tech_content = content;

    return result;

    // Helper function to check if value is numeric
    function isNumeric(value) {
      return !isNaN(parseFloat(value)) && isFinite(value);
    }
  }

  /**
   * getCalculationCombinedGasLawCalculator: Service Method
   * POST: /api/calculators-lol/combined-gas-law-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationCombinedGasLawCalculator(body) {
    let calculation = body.tech_calculation;
    let pressure_one = body.tech_pressure_one;
    let pressure_one_unit = body.tech_pressure_one_unit;
    let pressure_two = body.tech_pressure_two;
    let pressure_two_unit = body.tech_pressure_two_unit;
    let volume_one = body.tech_volume_one;
    let volume_one_unit = body.tech_volume_one_unit;
    let volume_two = body.tech_volume_two;
    let volume_two_unit = body.tech_volume_two_unit;
    let temp_one = body.tech_temp_one;
    let temp_one_unit = body.tech_temp_one_unit;
    let temp_two = body.tech_temp_two;
    let temp_two_unit = body.tech_temp_two_unit;

    let val3;
    // Helper function for pressure conversion to Pascal
    const pre = (unit, value) => {
      const conversions = {
        Pa: 1,
        kPa: 1000,
        Bar: 100000,
        atm: 101325,
        hPa: 100,
        mbar: 100,
        mmHg: 133.32,
      };
      return value * (conversions[unit] || 1);
    };

    // Helper function for volume conversion to m³
    const vol = (unit, value) => {
      const conversions = {
        "m³": 1,
        l: 0.001,
        ml: 0.000001,
        "ft³": 0.0283168,
        "in³": 1.63871e-5,
      };
      return value * (conversions[unit] || 1);
    };

    // Helper function for temperature conversion to Kelvin

    function temp(unit3, value3) {
      if (unit3 == "°C") {
        val3 = Number(value3) + 273.15;
      } else if (unit3 == "°F") {
        val3 = (Number(value3) - 32) * (5 / 9) + 273.15;
      } else if (unit3 == "K") {
        val3 = Number(value3) * 1;
      }
      return val3;
    }

    const result = {};
    let method;

    try {
      switch (calculation) {
        case "1": // Temperature Two
          if (
            isNumeric(pressure_one) &&
            isNumeric(pressure_two) &&
            isNumeric(volume_one) &&
            isNumeric(volume_two) &&
            isNumeric(temp_one)
          ) {
            method = 1;
            const pressure_two_value = pre(pressure_two_unit, pressure_two);
            const pressure_one_value = pre(pressure_one_unit, pressure_one);
            const volume_two_value = vol(volume_two_unit, volume_two);
            const volume_one_value = vol(volume_one_unit, volume_one);
            const temp_one_value = temp(temp_one_unit, temp_one);
            const tf =
              (pressure_two_value * volume_two_value * temp_one_value) /
              (pressure_one_value * volume_one_value);
            result.tech_temperature = tf;
          } else {
            result.error = "Please! Check Your Input.";
            return result;
          }
          break;

        case "2": // Volume One
          method = 2;
          if (
            isNumeric(pressure_one) &&
            isNumeric(pressure_two) &&
            isNumeric(temp_two) &&
            isNumeric(volume_two) &&
            isNumeric(temp_one)
          ) {
            const pressure_two_value = pre(pressure_two_unit, pressure_two);
            const pressure_one_value = pre(pressure_one_unit, pressure_one);
            const volume_two_value = vol(volume_two_unit, volume_two);
            const temp_two_value = temp(temp_two_unit, temp_two);
            const temp_one_value = temp(temp_one_unit, temp_one);
            const vi =
              Math.round(
                ((pressure_two_value * volume_two_value * temp_one_value) /
                  (temp_two_value * pressure_one_value)) *
                  100
              ) / 100;
            result.tech_volume = vi;
          } else {
            result.error = "Please! Check Your Input.";
            return result;
          }
          break;

        case "3": // Pressure One
          method = 3;
          if (
            isNumeric(volume_one) &&
            isNumeric(pressure_two) &&
            isNumeric(temp_two) &&
            isNumeric(volume_two) &&
            isNumeric(temp_one)
          ) {
            const pressure_two_value = pre(pressure_two_unit, pressure_two);
            const volume_one_value = vol(volume_one_unit, volume_one);
            const volume_two_value = vol(volume_two_unit, volume_two);
            const temp_two_value = temp(temp_two_unit, temp_two);
            const temp_one_value = temp(temp_one_unit, temp_one);
            const pi =
              Math.round(
                ((pressure_two_value * volume_two_value * temp_one_value) /
                  (temp_two_value * volume_one_value)) *
                  100
              ) / 100;
            result.tech_pressure = pi;
          } else {
            result.error = "Please! Check Your Input.";
            return result;
          }
          break;

        case "4": // Temperature One
          method = 4;
          if (
            isNumeric(volume_one) &&
            isNumeric(pressure_two) &&
            isNumeric(temp_two) &&
            isNumeric(volume_two) &&
            isNumeric(pressure_one)
          ) {
            const pressure_two_value = pre(pressure_two_unit, pressure_two);
            const volume_one_value = vol(volume_one_unit, volume_one);
            const volume_two_value = vol(volume_two_unit, volume_two);
            const temp_two_value = temp(temp_two_unit, temp_two);
            const pressure_one_value = pre(pressure_one_unit, pressure_one);
            const ti =
              Math.round(
                ((pressure_one_value * volume_one_value * temp_two_value) /
                  (pressure_two_value * volume_two_value)) *
                  100
              ) / 100;
            result.tech_temperature = ti;
          } else {
            result.error = "Please! Check Your Input.";
            return result;
          }
          break;

        case "5": // Volume Two
          method = 5;
          if (
            isNumeric(volume_one) &&
            isNumeric(pressure_two) &&
            isNumeric(temp_two) &&
            isNumeric(temp_one) &&
            isNumeric(pressure_one)
          ) {
            const pressure_two_value = pre(pressure_two_unit, pressure_two);
            const volume_one_value = vol(volume_one_unit, volume_one);
            const temp_one_value = temp(temp_one_unit, temp_two);
            const temp_two_value = temp(temp_two_unit, temp_two);
            const pressure_one_value = pre(pressure_one_unit, pressure_one);
            const vf =
              Math.round(
                ((temp_two_value * pressure_one_value * volume_one_value) /
                  (temp_one_value * pressure_two_value)) *
                  100
              ) / 100;
            result.tech_volume = vf;
            // console.log(pressure_two_value,volume_one_value,temp_one_value,temp_two_value,pressure_one_value)
          } else {
            result.error = "Please! Check Your Input.";
            return result;
          }
          break;

        case "6": // Pressure Two
          method = 6;
          if (
            isNumeric(volume_one) &&
            isNumeric(pressure_one) &&
            isNumeric(temp_two) &&
            isNumeric(volume_two) &&
            isNumeric(temp_one)
          ) {
            const pressure_one_value = pre(pressure_one_unit, pressure_one);
            const volume_one_value = vol(volume_one_unit, volume_one);
            const volume_two_value = vol(volume_two_unit, volume_two);
            const temp_two_value = temp(temp_two_unit, temp_two);
            const temp_one_value = temp(temp_one_unit, temp_one);
            // const pf = Math.round(((temp_two_value * pressure_one_value * volume_one_value) /
            //            (temp_one_value * volume_two_value)) * 100) / 100;
            // result.pressure = pf;
            const pf =
              (temp_two_value * pressure_one_value * volume_one_value) /
              (temp_one_value * volume_two_value);
            if (Math.abs(pf) < 1e-4) {
              result.pressure = pf.toExponential();
            } else {
              result.pressure = Math.round(pf * 100) / 100;
            }
          } else {
            result.error = "Please! Check Your Input.";
            return result;
          }
          break;

        default:
          result.error = "Invalid calculation type.";
          return result;
      }

      result.tech_method = method;
      return result;
    } catch (error) {
      return {
        error: "Calculation error occurred.",
        details: error.message,
      };
    }

    // Helper function to check if value is numeric
    function isNumeric(value) {
      return (
        value !== null &&
        value !== undefined &&
        value !== "" &&
        !isNaN(Number(value))
      );
    }
  }

  /**
   * getCalculationGayLussacsLawCalculator: Service Method
   * POST: /api/calculators-lol/gay-lussacs-law-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationGayLussacsLawCalculator(body) {
    const result = {};

    const selection = body.tech_selection;
    const p1 = body.tech_p1;
    const p1_unit = body.tech_p1_unit;
    const t1 = body.tech_t1;
    const t1_unit = body.tech_t1_unit;
    const p2 = body.tech_p2;
    const p2_unit = body.tech_p2_unit;
    const t2 = body.tech_t2;
    const t2_unit = body.tech_t2_unit;
    const R = body.tech_R;
    const amount = body.tech_amount;
    const v1 = body.tech_v1;

    // Pressure conversion
    function pre(unit, value) {
      switch (unit) {
        case "Pa":
          return value * 1;
        case "Bar":
          return value * 100000;
        case "psi":
          return value * 6895;
        case "at":
          return value * 98068;
        case "atm":
          return value * 101325;
        case "Torr":
          return value * 133.32;
        case "hPa":
          return value * 100;
        case "kPa":
          return value * 1000;
        case "MPa":
          return value * 1000000;
        case "GPa":
          return value * 1000000000;
        case "inHg":
          return value * 3386.4;
        case "mmHg":
          return value * 133.32;
        default:
          return NaN;
      }
    }

    // Volume conversion
    function vol(unit2, value2) {
      switch (unit2) {
        case "mm³":
          return value2 * 0.000000001;
        case "cm³":
          return value2 * 0.000001;
        case "dm³":
          return value2 * 0.001;
        case "m³":
          return value2 * 1;
        case "in³":
          return value2 * 0.000016387;
        case "ft³":
          return value2 * 0.028317;
        case "yd³":
          return value2 * 0.7646;
        case "ml":
          return value2 * 0.000001;
        case "liters":
          return value2 * 0.001;
        default:
          return NaN;
      }
    }

    // Temperature conversion
    function temp(unit3, value3) {
      value3 = Number(value3);
      switch (unit3) {
        case "°C":
          return value3 + 273.15;
        case "°F":
          return (value3 - 32) * (5 / 9) + 273.15;
        case "K":
          return value3 * 1;
        default:
          return NaN;
      }
    }

    let method, temp2;

    // Selection logic
    if (selection === "1") {
      // Final Temperature (T2)
      method = 1;
      if (!isNaN(p1) && !isNaN(p2) && !isNaN(t1)) {
        const p1_value = pre(p1_unit, p1);
        const p2_value = pre(p2_unit, p2);
        const t1_value = temp(t1_unit, t1);
        temp2 = (t1_value * p2_value) / p1_value;
      } else {
        result.error = "Please! Check Your Input.";
        return result;
      }
    } else if (selection === "2") {
      // Final Pressure (P2)
      method = 2;
      if (!isNaN(t1) && !isNaN(t2) && !isNaN(p1)) {
        const p1_value = pre(p1_unit, p1);
        const t1_value = temp(t1_unit, t1);
        const t2_value = temp(t2_unit, t2);
        temp2 = (p1_value * t2_value) / t1_value;
      } else {
        result.error = "Please! Check Your Input.";
        return result;
      }
    } else if (selection === "3") {
      // Initial Pressure (P1)
      method = 3;
      if (!isNaN(t1) && !isNaN(t2) && !isNaN(p2)) {
        const p2_value = pre(p2_unit, p2);
        const t1_value = temp(t1_unit, t1);
        const t2_value = temp(t2_unit, t2);
        temp2 = (t1_value * p2_value) / t2_value;
      } else {
        result.error = "Please! Check Your Input.";
        return result;
      }
    } else if (selection === "4") {
      // Initial Temperature (T1)
      method = 4;
      if (!isNaN(p1) && !isNaN(p2) && !isNaN(t2)) {
        const p1_value = pre(p1_unit, p1);
        const p2_value = pre(p2_unit, p2);
        const t2_value = temp(t2_unit, t2);
        temp2 = (t2_value / p2_value) * p1_value;
      } else {
        result.error = "Please! Check Your Input.";
        return result;
      }
    } else if (selection === "5") {
      // Volume Calculation
      method = 5;
      if (!isNaN(p1) && !isNaN(t1) && !isNaN(amount) && !isNaN(R)) {
        const calculate_volume = (amount * R * t1) / p1;
        result.tech_calculate_volume = calculate_volume;
        result.tech_method = method;
        return result;
      } else {
        result.error = "Please! Check Your Input.";
        return result;
      }
    } else if (selection === "6") {
      // Amount of Gas (n)
      method = 6;
      if (!isNaN(p1) && !isNaN(t1) && !isNaN(v1) && !isNaN(R)) {
        const n = (p1 * v1) / (R * t1);
        result.tech_n = n;
        result.tech_method = method;
        return result;
      } else {
        result.error = "Please! Check Your Input.";
        return result;
      }
    }

    const amount_of_gas = 1;
    const calculate_volume = (amount_of_gas * R * t1) / p1;

    result.tech_volume = calculate_volume;
    result.tech_amount_of_gas = amount_of_gas;
    result.tech_method = method;
    result.tech_temp = temp2;

    return result;
  }

  /**
   * getCalculationMassPercentCalculator: Service Method
   * POST: /api/calculators-lol/mass-percent-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationMassPercentCalculator(body) {
    let find = body.tech_find;
    let mass_solute = body.tech_mass_solute;
    let mass_solute_unit = body.tech_mass_solute_unit;
    let mass_solvent = body.tech_mass_solvent;
    let mass_solvent_unit = body.tech_mass_solvent_unit;
    let mass_percentage = body.tech_mass_percentage;
    let mass_chemical = body.tech_mass_chemical;
    let mass_chemical_unit = body.tech_mass_chemical_unit;
    let total_mass_compound = body.tech_total_mass_compound;
    let total_mass_compound_unit = body.tech_total_mass_compound_unit;
    let first_value = body.tech_first_value;
    let first_value_unit = body.tech_first_value_unit;
    let second_value = body.tech_second_value;
    let second_value_unit = body.tech_second_value_unit;
    let third_value = body.tech_third_value;
    let third_value_unit = body.tech_third_value_unit;
    let four_value = body.tech_four_value;
    let four_value_unit = body.tech_four_value_unit;
    let five_value = body.tech_five_value;
    let five_value_unit = body.tech_five_value_unit;
    let six_value = body.tech_six_value;
    let six_value_unit = body.tech_six_value_unit;

    const result = {};

    // Mass conversion function
    function massConvert(unit, value) {
      const conversions = {
        µg: 0.000000001,
        mg: 0.000001,
        g: 0.001,
        dag: 0.01,
        kg: 1,
        t: 1000,
        oz: 0.02835,
        lbs: 0.4536,
      };
      return conversions[unit] ? value * conversions[unit] : value;
    }

    // Find atomic mass function
    function findAtomicMass(valueUnit, value) {
      console.log(valueUnit, value);
      const atomicMasses = {
        "Atomic mass amu": 12,
        "H (Hydrogen)": 1.00784,
        "He (Helium)": 4.002602,
        "Li (Lithium)": 6.941,
        "Be (Beryllium)": 9.0122,
        "B (Boron)": 10.811,
        "C (Carbon)": 12.011,
        "N (Nitrogen)": 14.0067,
        "O (Oxygen)": 15.9994,
        "F (Fluorine)": 18.998403,
        "Ne (Neon)": 20.179,
        "Na (Sodium)": 22.98977,
        "Mg (Magnesium)": 24.305,
        "Al (Aluminium)": 26.98154,
        "Si (Silicon)": 28.0855,
        "P (Phosphorus)": 30.97376,
        "S (Sulfur)": 32.06,
        "Cl (Chlorine)": 35.453,
        "Ar (Argon)": 39.0983,
        "K (Potassium)": 39.948,
        "Ca (Calcium)": 40.08,
        "Sc (Scandium)": 44.9559,
        "Ti (Titanium)": 47.9,
        "V (Vanadium)": 50.9415,
        "Cr (Chromium)": 51.996,
        "Mn (Manganese)": 54.938,
        "Fe (Iron)": 55.847,
        "Co ( Cobalt)": 58.9332,
        "Ni (Nickel)": 58.7,
        "Cu (Copper)": 63.546,
        "Zn (Zinc)": 65.38,
      };

      const atomicMass = atomicMasses[valueUnit];
      if (valueUnit === "Atomic mass amu") {
        return [atomicMass, atomicMass];
      }
      return [atomicMass * value, atomicMass];
    }

    // Helper function to check if value is numeric
    function isNumeric(value) {
      return !isNaN(parseFloat(value)) && isFinite(value);
    }

    let method;

    try {
      if (find === "1") {
        // Mass Percentage
        method = 1;
        if (isNumeric(mass_solute) && isNumeric(mass_solvent)) {
          const massSoluteValue = massConvert(
            mass_solute_unit,
            parseFloat(mass_solute)
          );
          const massSolventValue = massConvert(
            mass_solvent_unit,
            parseFloat(mass_solvent)
          );
          const massSolution = massSoluteValue + massSolventValue;

          const massPercent =
            massSolution !== 0 ? (massSoluteValue / massSolution) * 100 : 0;

          result.tech_mass_solution = massSolution;
          result.tech_mass_percent = massPercent;
          result.tech_method = method;
        } else {
          result.error = "Please! Check Your Input.";
          return result;
        }
      } else if (find === "2") {
        // Mass Solute
        method = 2;
        if (isNumeric(mass_solvent) && isNumeric(mass_percentage)) {
          const massSolventVal = parseFloat(mass_solvent);
          const massPercentVal = parseFloat(mass_percentage);
          const massSoluteCalc =
            (massSolventVal * massPercentVal) / 100 +
            massSolventVal / massPercentVal;
          const massSolution = massSolventVal + massSoluteCalc;

          result.tech_mass_solution = massSolution;
          result.tech_mass_solute = massSoluteCalc;
          result.tech_method = method;
        } else {
          result.error = "Please! Check Your Input.";
          return result;
        }
      } else if (find === "3") {
        // Mass Solvent
        method = 3;
        if (isNumeric(mass_solute) && isNumeric(mass_percentage)) {
          const massSoluteVal = parseFloat(mass_solute);
          const massPercentVal = parseFloat(mass_percentage);
          const massSolventCalc =
            (massSoluteVal * 100) / massPercentVal - massSoluteVal;
          const massSolution = massSoluteVal + massSolventCalc;

          result.tech_mass_solution = massSolution;
          result.tech_mass_solvent = massSolventCalc;
          result.tech_method = method;
        } else {
          result.error = "Please! Check Your Input.";
          return result;
        }
      } else if (find === "4") {
        // Mass Percentage for a Chemical
        method = 4;
        if (isNumeric(mass_chemical) && isNumeric(total_mass_compound)) {
          const massChemicalValue = massConvert(
            mass_chemical_unit,
            parseFloat(mass_chemical)
          );
          const massCompoundValue = massConvert(
            total_mass_compound_unit,
            parseFloat(total_mass_compound)
          );
          const massPercent = (massChemicalValue * 100) / massCompoundValue;

          result.tech_mass_percent = massPercent;
          result.tech_method = method;
        } else {
          result.error = "Please! Check Your Input.";
          return result;
        }
      } else if (find === "5") {
        // Mass of chemical
        method = 5;
        if (isNumeric(total_mass_compound) && isNumeric(mass_percentage)) {
          const massCompoundValue = massConvert(
            total_mass_compound_unit,
            parseFloat(total_mass_compound)
          );
          const massOfChemical =
            (parseFloat(mass_percentage) / 100) * massCompoundValue;

          result.tech_mass_of_chemical = massOfChemical;
          result.tech_method = method;
        } else {
          result.error = "Please! Check Your Input.";
          return result;
        }
      } else if (find === "6") {
        // Total Mass of Compound
        method = 6;
        if (isNumeric(mass_chemical) && isNumeric(mass_percentage)) {
          const massChemicalValue = massConvert(
            mass_chemical_unit,
            parseFloat(mass_chemical)
          );
          const totalMassCompound =
            (parseFloat(mass_percentage) / 100) * massChemicalValue;

          result.tech_total_mass_compound = totalMassCompound;
          result.tech_method = method;
        } else {
          result.error = "Please! Check Your Input.";
          return result;
        }
      } else if (find === "7") {
        // Atomic Mass Calculation
        method = 7;
        if (first_value && isNumeric(first_value)) {
          const call = [];
          let value = 1;

          const root = findAtomicMass(
            first_value_unit,
            parseFloat(first_value)
          );
          console.log(root);
          call.push(root[0]);
          result.tech_punk = parseFloat(first_value);
          result.tech_punk1 = root[1];
          result.tech_value1 = value;
          result.tech_name1 = first_value_unit;
          result.tech_atomic1 = root;

          if (isNumeric(second_value) && second_value) {
            value = 2;
            const root2 = findAtomicMass(
              second_value_unit,
              parseFloat(second_value)
            );
            call.push(root2[0]);
            result.tech_punk2 = parseFloat(second_value);
            result.tech_punk3 = root2[1];
            result.tech_value2 = value;
            result.tech_name2 = second_value_unit;
            result.tech_atomic2 = root2;
          }

          if (isNumeric(third_value) && third_value) {
            value = 3;
            const root3 = findAtomicMass(
              third_value_unit,
              parseFloat(third_value)
            );
            call.push(root3[0]);
            result.tech_punk4 = parseFloat(third_value);
            result.tech_punk5 = root3[1];
            result.tech_value3 = value;
            result.tech_name3 = third_value_unit;
            result.tech_atomic3 = root3;
          }

          if (isNumeric(four_value) && four_value) {
            value = 4;
            const root4 = findAtomicMass(
              four_value_unit,
              parseFloat(four_value)
            );
            call.push(root4[0]);
            result.tech_punk6 = parseFloat(four_value);
            result.tech_punk7 = root4[1];
            result.tech_value4 = value;
            result.tech_name4 = four_value_unit;
            result.tech_atomic4 = root4;
          }

          if (isNumeric(five_value) && five_value) {
            value = 5;
            const root5 = findAtomicMass(
              five_value_unit,
              parseFloat(five_value)
            );
            call.push(root5[0]);
            result.tech_punk8 = parseFloat(five_value);
            result.tech_punk9 = root5[1];
            result.tech_value5 = value;
            result.tech_name5 = five_value_unit;
            result.tech_atomic5 = root5;
          }

          if (isNumeric(six_value) && six_value) {
            value = 6;
            const root6 = findAtomicMass(six_value_unit, parseFloat(six_value));
            call.push(root6[0]);
            result.tech_punk10 = parseFloat(six_value);
            result.tech_punk11 = root6[1];
            result.tech_value6 = value;
            result.tech_name6 = six_value_unit;
            result.tech_atomic6 = root6;
          }

          const totalMass = call.reduce((sum, val) => sum + val, 0);
          result.tech_call = totalMass;
          result.tech_method = method;
        } else {
          result.error = "Please! Check Your Input.";
          return result;
        }
      }
      return result;
    } catch (error) {
      return {
        error: "An error occurred during calculation.",
        details: error.message,
      };
    }
  }

  /** getCalculationStoichiometryCalculator
   * POST: /api/calculators-lol/stoichiometry-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationStoichiometryCalculator(body) {
    let { tech_eq: eq } = body;
    eq = String(eq).trim();

    // Input validation
    const invalidPattern = /<|>|&|php|print_r|print|echo|script|%/i;
    if (invalidPattern.test(eq)) {
      return { error: "Please Enter Valid Input." };
    }

    if (!eq) {
      return { error: "Please! Check Your Input." };
    }

    try {
      let parem = eq
        .replace(/\s+/g, "")
        .replace(/%20/g, "")
        .replace(/\+/g, "plus")
        .replace(/{/g, "(")
        .replace(/}/g, ")")
        .replace(/e\^/g, "exp")
        .replace(/exp\^/g, "exp")
        .replace(/\^/g, "**")
        .replace(/e\^sqrt\(x\)/g, "exp(2*x)");

      let [r, p] = parem.split("=");
      let option = 2;

      const formData = qs.stringify({ r, p });

      const response = await axios.post(
        "http://167.172.134.148/stoichiometry",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          timeout: 120000,
        }
      );

      const result = response.data.split("@@@");
      let inp = parem.replace(/plus/g, "+");

      return {
        tech_inp: inp,
        tech_be: result[0],
        tech_mols: result[1],
        tech_atoms: result[2],
        tech_chemical_equation: eq,
        tech_option: option,
      };
    } catch (err) {
      console.error(err.message);
      return { error: "Please enter any one value." };
    }
  }

  /** getCalculationPkaToPhCalculator
   * POST: /api/calculators-lol/pka-to-ph-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationPkaToPhCalculator(body) {
    const buf_unit = body.tech_buf_unit;
    const ka = parseFloat(body.tech_ka);
    const acid = parseFloat(body.tech_acid);
    const acid_unit = body.tech_acid_unit;
    const salt = parseFloat(body.tech_salt);
    const salt_unit = body.tech_salt_unit;
    const convert = body.tech_convert;
    const ph_input = parseFloat(body.tech_ph);

    const response = {};

    const log10 = (x) => Math.log(x) / Math.LN10;

    const getUnitMultiplier = (unit) => {
      switch (unit) {
        case "M":
          return 1;
        case "mM":
          return 0.001;
        case "μM":
          return 0.000001;
        default:
          return 0;
      }
    };

    const acid_unitx = getUnitMultiplier(acid_unit);
    const salt_unitx = getUnitMultiplier(salt_unit);

    const isValidNumber = (val) => isFinite(val) && val > 0;

    if (convert === "1") {
      // Convert from Ka to pH
      if (
        (buf_unit === "1" || buf_unit === "2") &&
        isValidNumber(ka) &&
        isValidNumber(acid) &&
        isValidNumber(salt)
      ) {
        const av = acid * acid_unitx;
        const sv = salt * salt_unitx;

        if (av <= 0 || sv <= 0) {
          return {
            error: "Converted acid/salt value must be greater than zero.",
          };
        }

        let pka = -log10(ka);
        if (pka === -0) pka = 0;

        let ph;
        if (buf_unit === "1") {
          ph = pka - log10(av / sv);
        } else {
          ph = 14 - pka + log10(av / sv);
        }

        if (!isFinite(ph)) {
          return { error: "Calculation resulted in an invalid pH value." };
        }

        response.tech_unit = buf_unit;
        response.tech_pka = pka;
        response.tech_ph = ph;
      } else {
        return {
          error:
            "Please! Enter positive numeric values for Ka, Acid, and Salt.",
        };
      }
    } else if (convert === "2") {
      // Convert from pH to Ka
      if (
        (buf_unit === "1" || buf_unit === "2") &&
        isValidNumber(ph_input) &&
        isValidNumber(acid) &&
        isValidNumber(salt)
      ) {
        const av = acid * acid_unitx;
        const sv = salt * salt_unitx;

        if (av <= 0 || sv <= 0) {
          return {
            error: "Converted acid/salt value must be greater than zero.",
          };
        }

        let pka;
        if (buf_unit === "1") {
          pka = ph_input + log10(av / sv);
        } else {
          pka = 14 - ph_input + log10(av / sv);
        }

        const pk = Math.pow(10, -pka);

        if (!isFinite(pka) || !isFinite(pk)) {
          return {
            error: "Calculation resulted in an invalid pKa or Ka value.",
          };
        }

        response.tech_unit = buf_unit;
        response.tech_pka = pka;
        response.tech_pk = pk;
      } else {
        return {
          error:
            "Please! Enter positive numeric values for pH, Acid, and Salt.",
        };
      }
    } else {
      return { error: "Invalid conversion type." };
    }

    return response;
  }

  /** getCalculationSTPCalculator
   * POST: /api/calculators-lol/stp-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationSTPCalculator(body) {
    let {
      tech_volume: volume,
      tech_volume_units: volume_units,
      tech_temp: temp,
      tech_temp_units: temp_units,
      tech_pressure: pressure,
      tech_pressure_units: pressure_units,
    } = body;

    volume = Number(volume);
    temp = Number(temp);
    pressure = Number(pressure);

    if (!isNaN(volume) && !isNaN(temp) && !isNaN(pressure)) {
      // Volume unit conversion to dm³
      const volumeConversions = {
        "mm³": volume * 0.000001,
        "cm³": volume * 0.001,
        "dm³": volume * 1,
        "m³": volume * 1000,
        "cu in": volume * 0.016387,
        "cu ft": volume * 28.317,
        "cu yd": volume * 764.6,
        ml: volume * 0.001,
        cl: volume * 0.01,
      };
      if (volume_units in volumeConversions)
        volume = volumeConversions[volume_units];

      // Temperature conversion to Kelvin
      if (temp_units === "°F") {
        temp = ((temp - 32) * 5) / 9 + 273.15;
      } else if (temp_units === "°C") {
        temp += 273.15;
      }

      // Pressure conversion to mmHg
      const pressureConversions = {
        Pa: pressure * 0.0075,
        bar: pressure * 750,
        psi: pressure * 51.71,
        at: pressure * 735.6,
        atm: pressure * 760,
        hPa: pressure * 0.75,
        kPa: pressure * 7.5,
        MPa: pressure * 7500,
        GPa: pressure * 7500617,
        inHg: pressure * 25.4,
        mmHg: pressure,
      };
      if (pressure_units in pressureConversions)
        pressure = pressureConversions[pressure_units];

      // STP Calculations
      let t = 273.15 / temp;
      let v = volume * t;
      let p = pressure / 760;
      let vstp = v * p;
      let moles = vstp / 22.4;

      return {
        tech_vstp: vstp,
        tech_moles: moles,
        tech_volume: volume,
        tech_temp: temp,
        tech_pressure: pressure,
      };
    } else {
      return {
        error: "Please! Check Your Input.",
      };
    }
  }

  /** getCalculationCFUCalculator
   * POST: /api/calculators-lol/cfu-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationCFUCalculator(body) {
    let {
      tech_nc: nc,
      tech_df: df,
      tech_volume: volume,
      tech_volume_units: volume_units,
    } = body;

    nc = Number(nc);
    df = Number(df);
    volume = Number(volume);

    if (!isNaN(nc) && !isNaN(df) && !isNaN(volume)) {
      if (volume_units) {
        if (volume_units === "mm³") {
          volume *= 0.000000001;
        } else if (volume_units === "cm³") {
          volume *= 0.000001;
        } else if (volume_units === "dm³") {
          volume *= 0.001;
        } else if (volume_units === "cu in") {
          volume *= 0.000016387;
        } else if (volume_units === "cu ft") {
          volume *= 0.028317;
        } else if (volume_units === "cu yd") {
          volume *= 0.7646;
        } else if (volume_units === "ml") {
          volume *= 0.000001;
        } else if (volume_units === "cl") {
          volume *= 0.00001;
        } else if (volume_units === "l") {
          volume *= 0.001;
        }
      }

      const res = nc * df;
      const cfu = res / volume;

      return {
        tech_nc: nc,
        tech_df: df,
        tech_volume: volume,
        tech_res: res,
        tech_cfu: cfu,
      };
    } else {
      return {
        error: "Please! Check Your Input.",
      };
    }
  }

  /** getCalculationMlToMolesCalculator
   * POST: /api/calculators-lol/ml-to-moles-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationMlToMolesCalculator(body) {
    let {
      tech_volume: volume,
      tech_volume_unit: volume_unit,
      tech_molarity: molarity,
      tech_molarity_unit: molarity_unit,
    } = body;

    volume = Number(volume);
    molarity = Number(molarity);
    let vol_u, mol_u, answer;
    // Convert unit names to identifiers
    if (volume_unit == "mL") {
      volume_unit = "1";
    } else if (volume_unit == "L") {
      volume_unit = "2";
    } else if (volume_unit == "uL") {
      volume_unit = "3";
    }

    if (molarity_unit == "M") {
      molarity_unit = "1";
    } else if (molarity_unit == "mM") {
      molarity_unit = "2";
    } else if (molarity_unit == "uM") {
      molarity_unit = "3";
    }

    // Unit conversion functions
    function volume_units(a, b) {
      if (b == "1") {
        vol_u = a / 1000;
      } else if (b == "2") {
        vol_u = a * 1;
      } else if (b == "3") {
        vol_u = a * 0.000001;
      }
      return vol_u;
    }
    function molarity_units(a, b) {
      if (b == "1") {
        mol_u = a * 1;
      } else if (b == "2") {
        mol_u = a / 1000;
      } else if (b == "3") {
        mol_u = a / 1000000;
      }
      return mol_u;
    }

    if (!isNaN(volume) && !isNaN(molarity)) {
      volume = volume_units(volume, volume_unit);
      molarity = molarity_units(molarity, molarity_unit);
      answer = volume * molarity;
      return {
        tech_answer: answer,
      };
    } else {
      return {
        error: "Please! Check Your Input.",
      };
    }
  }

  /** getCalculationMmolLToMgDlCalculator
   * POST: /api/calculators-lol/mmol-l-to-mg-dl-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationMmolLToMgDlCalculator(body) {
    let { tech_solve: solve, tech_input: input } = body;

    input = Number(input);

    if (!isNaN(input)) {
      let answer;

      if (solve === "1") {
        answer = input * 18;
      } else {
        answer = input / 18;
      }

      return {
        tech_answer: answer,
      };
    } else {
      return {
        error: "Please! Check Your Input.",
      };
    }
  }
  /** getCalculationActivationEnergyCalculator
   * POST: /api/calculators-lol/activation-energy-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationActivationEnergyCalculator(body) {
    let {
      tech_temperature: temperature,
      tech_rate: rate,
      tech_const: constValue,
      tech_tempUnit: tempUnit,
      tech_rateUnits: rateUnits,
      tech_constUnits: constUnits,
    } = body;
    let input;
    temperature = Number(temperature);
    rate = Number(rate);
    constValue = Number(constValue);

    // Helper: Convert to per second
    function convertToPerSecond(value, unit) {
      if (unit === "sec") {
        input = value;
      } else if (unit === "min") {
        input = value * 60;
      } else if (unit === "hour") {
        input = value * 3600;
      } else if (unit === "day") {
        input = value * 86400;
      } else if (unit === "week") {
        input = value * 86400 * 7;
      } else if (unit === "month") {
        input = value * (30 * 86400);
      } else if (unit === "year") {
        input = value * (365.25 * 24 * 3600);
      }
      return input;
    }

    let param = {};

    if (!isNaN(temperature) && !isNaN(rate) && !isNaN(constValue)) {
      // Temperature conversion to Kelvin
      if (tempUnit === "fahrenheit") {
        temperature = ((temperature - 32) * 5) / 9 + 273.15;
      } else if (tempUnit === "celsius") {
        temperature = temperature + 273.15;
      }

      // Convert rate and const to per second
      rate = convertToPerSecond(rate, rateUnits);
      constValue = convertToPerSecond(constValue, constUnits);

      // Calculate activation energy
      let x = -0.008314 * temperature;
      let log = Math.log(rate / constValue);
      let res = x * log;

      let joule = res * 1000;
      let megajoule = res * 0.001;
      let calories = res * 239;
      let kilocalories = res * 0.239;

      param = {
        tech_temperature: temperature,
        tech_log: log,
        tech_rate: rate,
        tech_const: constValue,
        tech_res: res,
        tech_joule: joule,
        tech_megajoule: megajoule,
        tech_calories: calories,
        tech_kilocalories: kilocalories,
      };
    } else {
      param.error = "Please! Check Your Input.";
    }

    return param;
  }

  /** getCalculationAverageAtomicMassCalculator
   * POST: /api/calculators-lol/average-atomic-mass-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationAverageAtomicMassCalculator(body) {
    let isotopes_no = body.tech_isotopes_no;
    let per = body.tech_per;
    let per_unit = body.tech_per_unit;
    let mass = body.tech_mass;

    let param = {};

    if (
      typeof isotopes_no === "number" &&
      Array.isArray(per) &&
      Array.isArray(per_unit) &&
      Array.isArray(mass)
    ) {
      let am_array = [];

      for (let i = 0; i < isotopes_no; i++) {
        if (per_unit[i] !== undefined && !isNaN(per[i]) && !isNaN(mass[i])) {
          let abundance = per_unit[i] === "decimal" ? per[i] : per[i] / 100;
          am_array[i] = mass[i] * abundance;
        } else {
          param.error = "Please! Check Your Input.";
          return param;
        }
      }

      let amSum = am_array.reduce((a, b) => a + b, 0);

      param.tech_amSum = amSum;
      param.tech_per = per;
      param.tech_mass = mass;
      return param;
    } else {
      param.error = "Please! Check Your Input.";
      return param;
    }
  }

  /**
   * getCalculationBondOrderCalculator: Service Method
   * POST: /api/calculators-lol/bond-order-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationBondOrderCalculator(body) {
    const calculationType = body.tech_calculationType;
    const firstInput = parseFloat(body.tech_firstInput);
    const secondInput = parseFloat(body.tech_secondInput);

    let response = {};

    if (!isNaN(firstInput) && !isNaN(secondInput)) {
      let result;

      if (calculationType === "1") {
        result = 0.5 * (firstInput - secondInput);
      } else if (calculationType === "2") {
        result = 2 * firstInput + secondInput;
      } else {
        result = (firstInput * 2 - secondInput) * -1;
      }

      response = {
        tech_calculatedAnswer: result,
        tech_firstInput: firstInput,
        tech_secondInput: secondInput,
      };
    } else {
      response = {
        error: "Please! Check Your Input.",
      };
    }

    return response;
  }

  /** getCalculationGibbsFreeEnergyCalculator
   * POST: /api/calculators-lol/gibbs-free-energy-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationGibbsFreeEnergyCalculator(body) {
    let entropy = body.tech_entropy;
    let enthalpy = body.tech_enthalpy;
    let temperature = body.tech_temperature;
    let enthalpy_units = body.tech_enthalpy_units;
    let entropy_units = body.tech_entropy_units;
    let t_units = body.tech_t_units;

    let param = {};

    // Convert entropy units to KJ
    if (entropy_units) {
      if (entropy_units == "KJ") {
        entropy = entropy;
      } else if (entropy_units == "cal") {
        entropy = entropy * 0.004184;
      } else if (entropy_units == "kcal") {
        entropy = entropy * 4.184;
      } else if (entropy_units == "J") {
        entropy = entropy * 0.001;
      }
    }

    if (enthalpy_units) {
      if (enthalpy_units == "KJ") {
        enthalpy = enthalpy;
      } else if (enthalpy_units == "cal") {
        enthalpy = enthalpy * 0.004184;
      } else if (enthalpy_units == "kcal") {
        enthalpy = enthalpy * 4.184;
      } else if (enthalpy_units == "J") {
        enthalpy = enthalpy * 0.001;
      }
    }
    if (t_units) {
      if (t_units == "°F") {
        temperature = ((temperature - 32) * 5) / 9 + 273.15;
      } else if (t_units == "°C") {
        temperature = temperature + 273.15;
      }
    }

    // Validate numeric inputs
    if (
      typeof enthalpy === "number" &&
      typeof entropy === "number" &&
      typeof temperature === "number"
    ) {
      let gibbs_free_energy = enthalpy * 1000 - temperature * entropy * 1000; // J
      let gibbs = gibbs_free_energy / 1000; // KJ

      param.tech_gibbs = gibbs;
      param.tech_enthalpy = body.tech_enthalpy;
      param.tech_entropy = body.tech_entropy;
      param.tech_temperature = body.tech_temperature;
      return param;
    } else {
      param.error = "Please! Check Your Input.";
      return param;
    }
  }

  /** getCalculationvaporPressureCalculator
   * POST: /api/calculators-lol/vapor-pressure-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationvaporPressureCalculator(body) {
    let t1 = body.tech_t1;
    let t1_units = body.tech_t1_units;
    let t2 = body.tech_t2;
    let t2_units = body.tech_t2_units;
    let p1 = body.tech_p1;
    let p1_units = body.tech_p1_units; // not used in calculation, assumed already in correct unit
    let deltaHvap = body.tech_deltaHvap;
    let deltaHvap_units = body.tech_deltaHvap_units;
    let p_sol = body.tech_p_sol;
    let p_sol_units = body.tech_p_sol_units;
    let x_sol = body.tech_x_sol;

    let param = {};

    function convertToKelvin(value, unit) {
      switch (unit) {
        case "°C":
          return value + 273.15;
        case "°F":
          return ((value - 32) * 5) / 9 + 273.15;
        case "k":
          return value;
        case "°R":
          return (value * 5) / 9;
        case "°De":
          return 373.15 - (value * 2) / 3;
        case "°N":
          return (value * 100) / 33 + 273.15;
        case "°Ré":
          return (value * 5) / 4 + 273.15;
        case "°Rø":
          return ((value - 7.5) * 40) / 21 + 273.15;
        default:
          return null;
      }
    }

    function convertToPascals(value, unit) {
      switch (unit) {
        case "Pa":
          return value;
        case "Bar":
          return value * 100000;
        case "psi":
          return value * 6894.76;
        case "at":
        case "atm":
          return value * 101325;
        case "Torr":
          return value * 133.322;
        case "hPa":
          return value * 100;
        case "kPa":
          return value * 1000;
        case "MPa":
          return value * 1000000;
        case "GPa":
          return value * 1000000000;
        default:
          return null;
      }
    }

    function convertToJoules(value, unit) {
      switch (unit) {
        case "J":
          return value;
        case "KJ":
          return value * 1000;
        case "MJ":
          return value * 1000000;
        case "Wh":
          return value * 3600;
        case "KWh":
          return value * 3.6e6;
        case "ft-lb":
          return value * 1.35582;
        case "kcal":
          return value * 4184;
        default:
          return null;
      }
    }

    if (
      typeof t1 === "number" &&
      typeof t2 === "number" &&
      typeof p1 === "number" &&
      typeof deltaHvap === "number" &&
      typeof p_sol === "number" &&
      typeof x_sol === "number"
    ) {
      t1 = convertToKelvin(t1, t1_units);
      t2 = convertToKelvin(t2, t2_units);
      deltaHvap = convertToJoules(deltaHvap, deltaHvap_units);
      p_sol = convertToPascals(p_sol, p_sol_units);
      const R = 8.314;

      const rightSide = (-deltaHvap / R) * (1 / t2 - 1 / t1);
      let p2 = p1 * Math.exp(rightSide);
      let xsolvent = p_sol * x_sol;

      param.tech_p2 = p2;
      param.tech_xsolvent = xsolvent;
      return param;
    } else {
      param.error = "Please! Check Your Input.";
      return param;
    }
  }

  /**
   * getCalculationRateConstantCalculator: Service Method
   * POST: /api/calculators-lol/rate-constant-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationRateConstantCalculator(body) {
    const unit_x = body.tech_unit_x?.trim();
    const module_x = body.tech_module_x?.trim();
    const module_y = body.tech_module_y?.trim();
    const module_z = body.tech_module_z?.trim();
    let unit_a = body.tech_unit_a?.trim();
    let unit_b = body.tech_unit_b?.trim();
    let unit_c = body.tech_unit_c?.trim();
    let time_a = body.tech_time_a?.trim();
    let time_b = body.tech_time_b?.trim();
    let time_c = body.tech_time_c?.trim();
    const half_a = body.tech_half_a?.trim();
    const half_b = body.tech_half_b?.trim();
    const half_c = body.tech_half_c?.trim();
    const con_a = body.tech_con_a?.trim();
    const con_b = body.tech_con_b?.trim();
    const con_c = body.tech_con_c?.trim();

    // Unit A conversion
    if (unit_a == "M") {
      unit_a = "0";
    } else if (unit_a == "mM") {
      unit_a = "1";
    } else if (unit_a == "μM") {
      unit_a = "2";
    } else if (unit_a == "nM") {
      unit_a = "3";
    }

    // Time A conversion
    if (time_a == "μs") {
      time_a = "0";
    } else if (time_a == "ms") {
      time_a = "1";
    } else if (time_a == "sec") {
      time_a = "2";
    } else if (time_a == "min") {
      time_a = "3";
    } else if (time_a == "min/sec") {
      time_a = "4";
    } else if (time_a == "hrs") {
      time_a = "6";
    }

    // Unit B conversion
    if (unit_b == "M") {
      unit_b = "0";
    } else if (unit_b == "mM") {
      unit_b = "1";
    } else if (unit_b == "μM") {
      unit_b = "2";
    } else if (unit_b == "nM") {
      unit_b = "3";
    }

    // Time B conversion
    if (time_b == "μs") {
      time_b = "0";
    } else if (time_b == "ms") {
      time_b = "1";
    } else if (time_b == "sec") {
      time_b = "2";
    } else if (time_b == "min") {
      time_b = "3";
    } else if (time_b == "min/sec") {
      time_b = "4";
    } else if (time_b == "hrs") {
      time_b = "6";
    }

    // Unit C conversion
    if (unit_c == "M") {
      unit_c = "0";
    } else if (unit_c == "mM") {
      unit_c = "1";
    } else if (unit_c == "μM") {
      unit_c = "2";
    } else if (unit_c == "nM") {
      unit_c = "3";
    }

    // Time C conversion
    if (time_c == "μs") {
      time_c = "0";
    } else if (time_c == "ms") {
      time_c = "1";
    } else if (time_c == "sec") {
      time_c = "2";
    } else if (time_c == "min") {
      time_c = "3";
    } else if (time_c == "min/sec") {
      time_c = "4";
    } else if (time_c == "hrs") {
      time_c = "6";
    }

    // Helper function for concentration calculation
    function calculate(a, b) {
      let convert;
      if (b == "0") {
        convert = a * 1;
      } else if (b == "1") {
        convert = a * 0.001;
      } else if (b == "2") {
        convert = a * 0.000001;
      } else if (b == "3") {
        convert = a * 0.000000001;
      }
      return convert;
    }

    // Helper function for time calculation
    function calculatet(a, b) {
      let convert;
      if (b == "0") {
        convert = a * 0.000001;
      } else if (b == "1") {
        convert = a * 0.001;
      } else if (b == "2") {
        convert = a * 1;
      } else if (b == "3") {
        convert = a * 60;
      } else if (b == "4") {
        convert = a * 3600;
      }
      return convert;
    }

    let check = true;
    let rate_res, k_res, b_res, c_res, a_res;
    k_res = 0;
    rate_res = 0;
    if (unit_x == "uni") {
      if (module_x === "0") {
        if (!isNaN(con_a) && !isNaN(half_a)) {
          const conca = calculate(parseFloat(con_a), unit_a);
          const htime = calculatet(parseFloat(half_a), time_a);
          k_res = conca / (2 * htime);
          rate_res = k_res;
        } else {
          check = false;
        }
      } else if (module_x == "1") {
        if (!isNaN(con_a) && !isNaN(half_a)) {
          const conca = calculate(parseFloat(con_a), unit_a);
          const htime = calculatet(parseFloat(half_a), time_a);
          k_res = 0.693 / htime;
          rate_res = k_res * conca;
        } else {
          check = false;
        }
      } else {
        if (!isNaN(con_a) && !isNaN(half_a)) {
          const conca = calculate(parseFloat(con_a), unit_a);
          const htime = calculatet(parseFloat(half_a), time_a);
          k_res = 1 / (htime * conca);
          rate_res = k_res * (conca * conca);
        } else {
          check = false;
        }
      }
    } else if (unit_x == "bi") {
      if (module_x == "1" && module_y == "1") {
        if (!isNaN(con_a) && !isNaN(half_a)) {
          const conca = calculate(parseFloat(con_a), unit_a);
          const concb = calculate(parseFloat(con_b), unit_b);
          const htime = calculatet(parseFloat(half_a), time_b);
          k_res = 0.693 / htime;
          rate_res = k_res * conca * concb;
          rate_res = parseFloat(rate_res.toFixed(15));
        } else {
          check = false;
        }
      } else if (module_x == "1" && module_y == "2") {
        if (!isNaN(con_a) && !isNaN(half_a)) {
          const conca = calculate(parseFloat(con_a), unit_a);
          const concb = calculate(parseFloat(con_b), unit_b);
          const htime = calculatet(parseFloat(half_a), time_b);
          k_res = 0.693 / htime;
          b_res = 1 / (k_res * concb);
          b_res = Math.round(b_res);
          rate_res = k_res * conca * (concb * concb);
          rate_res = parseFloat(rate_res.toFixed(15));
        } else {
          check = false;
        }
      } else if (module_x == "2" && module_y == "1") {
        if (!isNaN(con_a) && !isNaN(half_a)) {
          const conca = calculate(parseFloat(con_a), unit_a);
          const concb = calculate(parseFloat(con_b), unit_b);
          const htime = calculatet(parseFloat(half_a), time_b);
          k_res = 1 / (conca * htime);
          b_res = 0.693 / k_res;
          b_res = parseFloat(b_res.toFixed(8));
          rate_res = k_res * concb * (conca * conca);
          rate_res = parseFloat(rate_res.toFixed(12));
        } else {
          check = false;
        }
      }
    } else {
      if (module_x == "1" && module_y == "1" && module_z == "1") {
        if (
          (!isNaN(con_a) && !isNaN(con_b)) ||
          !isNaN(con_c) ||
          (!isNaN(half_a) && !isNaN(half_b)) ||
          !isNaN(half_c)
        ) {
          const conca = calculate(parseFloat(con_a), unit_a);
          const concb = calculate(parseFloat(con_b), unit_b);
          const concd = calculate(parseFloat(con_c), unit_c);
          const htime = calculatet(parseFloat(half_a), time_a);
          k_res = 0.693 / htime;
          rate_res = k_res * conca * concb * concd;
          rate_res = parseFloat(rate_res.toFixed(15));
        } else {
          check = false;
        }
      } else if (module_x == "1" && module_y == "2" && module_z == "1") {
        if (
          (!isNaN(con_a) && !isNaN(con_b)) ||
          !isNaN(con_c) ||
          (!isNaN(half_a) && !isNaN(half_b)) ||
          !isNaN(half_c)
        ) {
          const conca = calculate(parseFloat(con_a), unit_a);
          const concb = calculate(parseFloat(con_b), unit_b);
          const concc = calculate(parseFloat(con_c), unit_c);
          const htime = calculatet(parseFloat(half_a), time_a);
          k_res = 0.693 / htime;
          b_res = 1 / (k_res * concb);
          b_res = parseFloat(b_res.toFixed(5));
          rate_res = k_res * conca * concb * concb * concc;
          rate_res = parseFloat(rate_res.toFixed(15));
        } else {
          check = false;
        }
      } else if (module_x == "1" && module_y == "1" && module_z == "2") {
        if (
          (!isNaN(con_a) && !isNaN(con_b)) ||
          !isNaN(con_c) ||
          (!isNaN(half_a) && !isNaN(half_b)) ||
          !isNaN(half_c)
        ) {
          const conca = calculate(parseFloat(con_a), unit_a);
          const concb = calculate(parseFloat(con_b), unit_b);
          const concc = calculate(parseFloat(con_c), unit_c);
          const htime = calculatet(parseFloat(half_a), time_a);
          k_res = 0.693 / htime;
          c_res = 1 / (k_res * concc);
          c_res = parseFloat(c_res.toFixed(5));
          rate_res = k_res * conca * concb * concc * concc;
          rate_res = parseFloat(rate_res.toFixed(15));
        } else {
          check = false;
        }
      } else if (module_x == "2" && module_y == "1" && module_z == "1") {
        if (
          (!isNaN(con_a) && !isNaN(con_b)) ||
          !isNaN(con_c) ||
          (!isNaN(half_a) && !isNaN(half_b)) ||
          !isNaN(half_c)
        ) {
          const conca = calculate(parseFloat(con_a), unit_a);
          const concb = calculate(parseFloat(con_b), unit_b);
          const concc = calculate(parseFloat(con_c), unit_c);
          const htime = calculatet(parseFloat(half_b), time_b);
          k_res = 0.693 / htime;
          c_res = 1 / (k_res * conca);
          c_res = parseFloat(c_res.toFixed(5));
          rate_res = k_res * conca * conca * concb * concc;
          rate_res = parseFloat(rate_res.toFixed(15));
        } else {
          check = false;
        }
      } else if (module_x == "2" && module_y == "2" && module_z == "1") {
        if (
          (!isNaN(con_a) && !isNaN(con_b)) ||
          !isNaN(con_c) ||
          (!isNaN(half_a) && !isNaN(half_b)) ||
          !isNaN(half_c)
        ) {
          const conca = calculate(parseFloat(con_a), unit_a);
          const concb = calculate(parseFloat(con_b), unit_b);
          const concc = calculate(parseFloat(con_c), unit_c);
          const htime = calculatet(parseFloat(half_c), time_c);
          k_res = 0.693 / htime;
          a_res = 1 / (k_res * conca);
          a_res = parseFloat(a_res.toFixed(5));
          b_res = 1 / (k_res * concb);
          b_res = parseFloat(b_res.toFixed(5));
          rate_res = k_res * conca * conca * concb * concb * concc;
          rate_res = parseFloat(rate_res.toFixed(15));
        } else {
          check = false;
        }
      } else if (module_x == "1" && module_y == "2" && module_z == "2") {
        if (
          (!isNaN(con_a) && !isNaN(con_b)) ||
          !isNaN(con_c) ||
          (!isNaN(half_a) && !isNaN(half_b)) ||
          !isNaN(half_c)
        ) {
          const conca = calculate(parseFloat(con_a), unit_a);
          const concb = calculate(parseFloat(con_b), unit_b);
          const concc = calculate(parseFloat(con_c), unit_c);
          const htime = calculatet(parseFloat(half_a), time_a);
          k_res = 0.693 / htime;
          c_res = 1 / (k_res * concc);
          c_res = parseFloat(c_res.toFixed(5));
          b_res = 1 / (k_res * concb);
          b_res = parseFloat(b_res.toFixed(5));
          rate_res = k_res * concc * concc * concb * concb * conca;
          rate_res = parseFloat(rate_res.toFixed(15));
        } else {
          check = false;
        }
      } else if (module_x == "2" && module_y == "2" && module_z == "2") {
        if (
          (!isNaN(con_a) && !isNaN(con_b)) ||
          !isNaN(con_c) ||
          (!isNaN(half_a) && !isNaN(half_b)) ||
          !isNaN(half_c)
        ) {
          const conca = calculate(parseFloat(con_a), unit_a);
          const concb = calculate(parseFloat(con_b), unit_b);
          const concc = calculate(parseFloat(con_c), unit_c);
          const htime = calculatet(parseFloat(half_a), time_a);
          k_res = 1 / (htime * conca);
          k_res = parseFloat(k_res.toFixed(5));
          b_res = 1 / (k_res * concb);
          b_res = parseFloat(b_res.toFixed(5));
          c_res = 1 / (k_res * concc);
          c_res = parseFloat(c_res.toFixed(5));
          rate_res = k_res * conca * conca * concb * concb * concc * concc;
          rate_res = parseFloat(rate_res.toFixed(15));
        } else {
          check = false;
        }
      }
    }
    if (check === true) {
      return {
        tech_rate_res: rate_res,
        tech_k_res: k_res,
      };
    } else {
      return {
        error: "Please! Check Your Input.",
      };
    }
  }

  /** getCalculationEntropyCalculator
   * POST: /api/calculators-lol/entropy-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationEntropyCalculator(body) {
    let point_unit = body.tech_point_unit?.trim();
    let products = body.tech_products?.toString().trim();
    let products_unit = body.tech_products_unit?.trim();
    let reactants = body.tech_reactants?.toString().trim();
    let reactants_unit = body.tech_reactants_unit?.trim();
    let enthalpy = body.tech_enthalpy?.toString().trim();
    let enthalpy_unit = body.tech_enthalpy_unit?.trim();
    let temperature = body.tech_temperature?.toString().trim();
    let temperature_unit = body.tech_temperature_unit?.trim();
    let entropy = body.tech_entropy?.toString().trim();
    let entropy_unit = body.tech_entropy_unit?.trim();
    let base_unit = body.tech_base_unit?.trim();
    let moles = body.tech_moles?.toString().trim();
    let initial = body.tech_initial?.toString().trim();
    let initial_unit = body.tech_initial_unit?.trim();
    let pre_one_unit = body.tech_pre_one_unit?.trim();
    let final = body.tech_final?.toString().trim();
    let final_unit = body.tech_final_unit?.trim();
    let pre_two_unit = body.tech_pre_two_unit?.trim();

    let param = {};

    // Conversion stubs (define your actual logic here)

    function joules_unit(value, unit) {
      value = parseFloat(value);
      if (isNaN(value)) return null;

      switch (unit.toLowerCase()) {
        case "j/mol*k":
          return value;
        case "kj/mol*k":
          return value * 1000;
        case "mj/mol*k":
          return value * 1000000;
        case "wh/mol*k":
          return value * 3600;
        case "kwh/mol*k":
          return value * 3.6e6;
        case "ft-lb/mol*k":
          return value / 0.7375621493;
        case "cal/mol*k":
          return value * 4.184;
        case "kcal/mol*k":
          return value * 4184;
        case "ev/mol*k":
          return value / 6.242e18;
        default:
          return null; // Unsupported unit
      }
    }
    function joulez_unit(value, unit) {
      value = parseFloat(value);
      if (isNaN(value)) return null;

      switch (unit.toLowerCase()) {
        case "j":
          return value;
        case "kj":
          return value * 1000;
        case "mj":
          return value * 1000000;
        case "wh":
          return value * 3600;
        case "kwh":
          return value * 3.6e6;
        case "ft-lb":
          return value / 0.7375621493;
        case "cal":
          return value * 4.184;
        case "kcal":
          return value * 4184;
        case "ev":
          return value / 6.242e18;
        default:
          return null; // Unsupported unit
      }
    }
    function joulesz_unit(value, unit) {
      value = parseFloat(value);
      if (isNaN(value)) return null;

      switch (unit.toLowerCase()) {
        case "j/k":
          return value;
        case "kj/k":
          return value * 1000;
        case "mj/k":
          return value * 1000000;
        case "wh/k":
          return value * 3600;
        case "kwh/k":
          return value * 3.6e6;
        case "ft-lb/k":
          return value / 0.7375621493;
        case "cal/k":
          return value * 4.184;
        case "kcal/k":
          return value * 4184;
        case "ev/k":
          return value / 6.242e18;
        default:
          return null; // Unsupported unit
      }
    }
    function temp_unit(temperature, temperature_unit) {
      temperature = parseFloat(temperature); // Ensure it's a number

      if (isNaN(temperature)) {
        return null;
      }
      switch (temperature_unit) {
        case "°C":
          return temperature + 273.15; // Celsius to Kelvin
        case "°F":
          return (temperature - 32) * (5 / 9) + 273.15; // Fahrenheit to Kelvin
        case "K":
          return temperature; // Already Kelvin
        default:
          return null; // Invalid unit
      }
    }
    function firstunit(initial, initial_unit) {
      initial = parseFloat(initial);
      if (isNaN(initial)) return null;
      switch (initial_unit) {
        case "mm³":
          return initial;
        case "cm³":
          return initial * 1000;
        case "dm³":
          return initial * 1000000;
        case "m³":
          return initial * 1000000000;
        case "in³":
          return initial / 0.00006102; // 1 in³ = 16,387.064 mm³
        case "ft³":
          return initial * 28316846.592;
        case "ml":
          return initial / 0.001;
        case "cl":
          return initial * 10000;
        case "l":
          return initial * 1000000;
        case "US gal":
          return initial * 3785411.784;
        case "UK gal":
          return initial * 4546090.05;
        case "US fl oz":
          return initial / 0.000033814;
        case "UK fl oz":
          return initial / 0.000035195;
        default:
          return null; // Unsupported unit
      }
    }

    function sec_unit(initial, pre_one_unit) {
      initial = parseFloat(initial);
      if (isNaN(initial)) return null;

      switch (pre_one_unit) {
        case "Pa":
          return initial;
        case "Bar":
          return initial * 100000;
        case "psi":
          return initial * 6895;
        case "at":
          return initial / 0.0000101972;
        case "atm":
          return initial / 0.000009869;
        case "Torr":
          return initial * 133.3;
        case "hPa":
          return initial * 100;
        case "kPa":
          return initial * 1000;
        case "MPa":
          return initial * 1000000;
        case "GPa":
          return initial * 1000000000;
        case "inHg":
          return initial * 3386.39;
        case "mmHg":
          return initial * 133.322;
        default:
          return null; // Unsupported unit
      }
    }

    if (point_unit === "entropy change for a reaction") {
      if (!isNaN(products) && !isNaN(reactants)) {
        products = joules_unit(products, products_unit);
        reactants = joules_unit(reactants, reactants_unit);

        if (products == 0 || reactants == 0) {
          param.error =
            products == 0
              ? "total entropy Of Products value cannot be equal to zero."
              : "total entropy Of reactants value cannot be equal to zero.";
          return param;
        }

        param.entropy_reaction = products - reactants;
      } else {
        param.error = "Please! Check Your Input.";
        return param;
      }
    } else if (point_unit === "gibbs free energy ΔG = ΔH - T*ΔS") {
      if (!isNaN(enthalpy) && !isNaN(temperature) && !isNaN(entropy)) {
        enthalpy = joulez_unit(enthalpy, enthalpy_unit);
        entropy = joulesz_unit(entropy, entropy_unit);
        temperature = temp_unit(temperature, temperature_unit);
        param.tech_gibbs = enthalpy - temperature * entropy;
      } else {
        param.error = "Please! Check Your Input.";
        return param;
      }
    } else if (point_unit === "isothermal entropy change of an ideal gas") {
      if (base_unit === "volume") {
        if (!isNaN(moles) && !isNaN(initial) && !isNaN(final)) {
          if (
            parseFloat(moles) == 0 ||
            parseFloat(initial) == 0 ||
            parseFloat(final) == 0
          ) {
            param.error = "moles, initial, or final cannot be zero.";
            return param;
          }

          initial = firstunit(initial, initial_unit);
          final = firstunit(final, final_unit);
          param.tech_answer =
            parseFloat(moles) * 8.3145 * Math.log(final / initial);
        } else {
          param.error = "Please! Check Your Input.";
          return param;
        }
      } else if (base_unit === "pressure") {
        if (!isNaN(moles) && !isNaN(initial) && !isNaN(final)) {
          initial = sec_unit(initial, pre_one_unit);
          final = sec_unit(final, pre_two_unit);
          param.tech_answers =
            -parseFloat(moles) * 8.3145 * Math.log(final / initial);
        } else {
          param.error = "Please! Check Your Input.";
          return param;
        }
      } else {
        param.error = "Please! Check Your Input.";
        return param;
      }
    } else {
      param.error = "Please! Check Your Input.";
      return param;
    }
    return param;
  }

  /** getCalculationSolutionDilutionCalculator
   * POST: /api/calculators-lol/solution-dilution-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationSolutionDilutionCalculator(body) {
    let concentration = parseFloat(body.tech_concentration);
    let concentration_unit = body.tech_concentration_unit?.trim();
    let volume = parseFloat(body.tech_volume);
    let volume_unit = body.tech_volume_unit?.trim();
    let final = parseFloat(body.tech_final);
    let final_unit = body.tech_final_unit?.trim();

    function convertToMolar(value, unit) {
      switch (unit) {
        case "M":
          return value;
        case "mM":
          return value / 1000;
        case "μM":
          return value / 1000000;
        case "nM":
          return value / 1000000000;
        case "pM":
          return value / 1000000000000;
        case "fM":
          return value / 1000000000000000;
        case "aM":
          return value / 1e18;
        case "zM":
          return value / 1e21;
        case "yM":
          return value / 1e24;
        default:
          return null;
      }
    }

    function unitToLiters(value, unit) {
      switch (unit) {
        case "mm³":
          return value / 1e9;
        case "cm³":
          return value / 1000;
        case "dm³":
          return value;
        case "m³":
          return value * 1000;
        case "in³":
          return value / 61023.7;
        case "ft³":
          return value * 28.3168;
        case "yd³":
          return value / 764.555;
        case "ml":
          return value / 1000;
        case "cl":
          return value / 100;
        case "l":
          return value;
        case "US gal":
          return value * 3.78541;
        case "UK gal":
          return value * 4.54609;
        case "US fl oz":
          return value / 33.814;
        case "UK fl oz":
          return value / 35.1951;
        case "cups":
          return value * 0.284131;
        case "tbsp":
          return value / 67.628;
        case "tsp":
          return value / 202.884;
        case "US qt":
          return value * 0.946353;
        case "UK qt":
          return value * 1.13652;
        case "US pt":
          return value / 1.05669;
        case "UK pt":
          return value / 1.13652;
        default:
          return null;
      }
    }

    let param = {};

    if (!isNaN(concentration) && !isNaN(volume) && !isNaN(final)) {
      let convertedConcentration = convertToMolar(
        concentration,
        concentration_unit
      );
      let convertedVolume = unitToLiters(volume, volume_unit);
      let convertedFinal = convertToMolar(final, final_unit);
      if (convertedFinal === 0 || convertedFinal === null) {
        param.error = "Concentration (final) cannot be zero or invalid.";
        return param;
      }

      let answer = (convertedConcentration * convertedVolume) / convertedFinal;

      param.tech_answer = answer;
      return param;
    } else {
      param.error = "Please! Check Your Input.";
      return param;
    }
  }

  /** getCalculationChemicalEquationBalancerCalculator
   * POST: /api/calculators-lol/chemical-equation-balancer-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationChemicalEquationBalancerCalculator(body) {
    let eq = body.tech_eq?.trim();
    let param = {};

    if (!eq || /<|&|php|print_r|print|echo|script|%/i.test(eq)) {
      param.error = "Please Enter Valid Input.";
      return param;
    }

    // Prepare the equation
    let parem = eq
      .replace(/\s+/g, "")
      .replace(/→|->/g, "=")
      .replace(/%20/g, "")
      .replace(/\+/g, "plus")
      .replace(/{/g, "(")
      .replace(/}/g, ")")
      .replace(/\^/g, "**");

    let [r, p] = parem.split("=");
    let option = 2;

    try {
      let response = await axios.get("http://167.172.134.148/limiting", {
        params: { r, p },
        timeout: 120000,
      });

      if (response.status !== 200 || !response.data.includes("@@@")) {
        param.error = "Please! Check Your Equation.";
        return param;
      }

      let [be, mols, atoms] = response.data.split("@@@");
      let inp = parem.replace(/plus/g, "+");

      param.tech_inp = inp;
      param.tech_be = be;
      param.tech_mols = mols;
      param.tech_atoms = atoms;
      param.tech_chemical_equation = eq.replace(/→|->/g, "=");
      param.tech_option = option;
      return param;
    } catch (error) {
      param.error = "Please! Check Your Input.";
      return param;
    }
  }

  /** getCalculationLimitingReactantCalculator
   * POST: /api/calculators-lol/limiting-reactant-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationLimitingReactantCalculator(body) {
    let eq = (body.tech_eq || "").trim();

    // Validation against potentially dangerous input
    const invalidPattern = /<|>|&|php|print_r|print|echo|script|%/i;
    if (invalidPattern.test(eq)) {
      return { error: "Please Enter Valid Input." };
    }

    if (!eq) {
      return { error: "Please! Check Your Input." };
    }

    try {
      let parem = eq;
      parem = parem.replace(/\s+/g, "");
      parem = parem.replace(/%20/g, "");
      parem = parem.replace(/\+/g, "plus");
      parem = parem.replace(/{/g, "(");
      parem = parem.replace(/}/g, ")");
      parem = parem.replace(/e\^sqrt\(x\)/g, "exp(2*x)");
      parem = parem.replace(/e\^|exp\^/g, "exp");
      parem = parem.replace(/\^/g, "**");

      const [r, p] = parem.split("=");
      const option = 2;

      const response = await axios.get("http://167.172.134.148/limiting", {
        params: { r, p },
        timeout: 120000, // 120 seconds
      });

      const buffer = response.data.split("@@@");
      const inp = parem.replace(/plus/g, "+");

      return {
        teach_inp: inp,
        teach_be: buffer[0],
        teach_mols: buffer[1],
        teach_atoms: buffer[2],
        teach_chemical_equation: eq,
        teach_option: option,
      };
    } catch (error) {
      return { error: "Please! Check Your Input." };
    }
  }

  /** getCalculationRedoxReactionCalculator
   * POST: /api/calculators-lol/redox-reaction-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationRedoxReactionCalculator(body) {
    let eq = (body.tech_eq || "").trim();

    if (eq) {
      eq = eq.replace(/plus/g, "+");

      return {
        tech_eq: eq,
      };
    } else {
      return {
        error: "Please! Check Your Input.",
      };
    }
  }

  /** getCalculationPPMCalculator
   * POST: /api/calculators-lol/ppm-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationPPMCalculator(body) {
    let type = body.tech_calculator_name;
    let operations = body.tech_operations;
    let first = body.tech_first;
    let drop1 = body.tech_drop1;
    let drop2 = body.tech_drop2;
    let drop3 = body.tech_drop3;
    let second = body.tech_second;
    let drop4 = body.tech_drop4;
    let third = body.tech_third;

    let response = { tech_type: type };

    first = parseFloat(first);
    second = parseFloat(second);
    third = parseFloat(third);

    if (type === "calculator1") {
      if (isNaN(first)) {
        return { error: "Please! Check Your Input." };
      }

      switch (operations) {
        case "1":
          response.tech_answer1 = first;
          response.tech_answer2 = first * 100;
          response.tech_answer3 = first * 1000;
          response.tech_answer4 = first * 1000000;
          response.tech_answer5 = first * 1000000000;
          response.tech_answer6 = first * 1000000000000;
          break;
        case "2":
          response.tech_answer1 = first / 100;
          response.tech_answer2 = first;
          response.tech_answer3 = first * 10;
          response.tech_answer4 = first * 10000;
          response.tech_answer5 = first * 10000000;
          response.tech_answer6 = first * 10000000000;
          break;
        case "3":
          response.tech_answer1 = first / 1000;
          response.tech_answer2 = first / 10;
          response.tech_answer3 = first;
          response.tech_answer4 = first * 1000;
          response.tech_answer5 = first * 1000000;
          response.tech_answer6 = first * 1000000000;
          break;
        case "4":
          response.tech_answer1 = first / 1000000;
          response.tech_answer2 = first / 10000;
          response.tech_answer3 = first / 1000;
          response.tech_answer4 = first;
          response.tech_answer5 = first * 1000;
          response.tech_answer6 = first * 1000000;
          break;
        case "5":
          response.tech_answer1 = first / 1000000000;
          response.tech_answer2 = first / 10000000;
          response.tech_answer3 = first / 1000000;
          response.tech_answer4 = first / 1000;
          response.tech_answer5 = first;
          response.tech_answer6 = first * 1000;
          break;
        case "6":
          response.tech_answer1 = first / 1000000000000;
          response.tech_answer2 = first / 10000000000;
          response.tech_answer3 = first / 1000000000;
          response.tech_answer4 = first / 1000000;
          response.tech_answer5 = first / 1000;
          response.tech_answer6 = first;
          break;
        default:
          return { error: "Please! Check Your Input." };
      }
    } else if (type === "calculator2") {
      if (drop1 == 1 || drop1 == 2) {
        if (drop2 == 1) {
          if (drop4 == 1) {
            if (isNaN(second) || isNaN(third))
              return { error: "Please! Check Your Input." };
            let jawab1 = third * second;
            response.tech_jawab2 = parseFloat((jawab1 / 24.45).toFixed(3));
          } else if (drop4 == 2) {
            if (isNaN(second) || isNaN(third))
              return { error: "Please! Check Your Input." };
            let jawab1 = third * 24.45;
            response.tech_jawab2 = parseFloat((jawab1 / second).toFixed(3));
          }
        } else if (drop2 == 2) {
          if (drop4 == 1) {
            if (isNaN(second) || isNaN(third))
              return { error: "Please! Check Your Input." };
            let jawab1 = third * second;
            let jawab3 = jawab1 / 24.45;
            response.tech_jawab2 = jawab3 / 100000000000;
          } else if (drop4 == 2) {
            if (isNaN(second) || isNaN(third))
              return { error: "Please! Check Your Input." };
            let jawab1 = third * 24.45;
            let jawab3 = jawab1 / second;
            response.tech_jawab2 = jawab3 * 100000000000;
          }
        }
      } else if (drop1 == 3) {
        if (drop2 == 1) {
          if (drop4 == 1) {
            if (isNaN(third)) return { error: "Please! Check Your Input." };
            response.tech_jawab2 = parseFloat((third * 1.29).toFixed(3));
          } else if (drop4 == 2) {
            if (isNaN(third)) return { error: "Please! Check Your Input." };
            response.tech_jawab2 = parseFloat((third * 0.773).toFixed(3));
          }
        } else if (drop2 == 2) {
          if (drop4 == 1) {
            if (isNaN(third)) return { error: "Please! Check Your Input." };
            response.tech_jawab2 = parseFloat((third * 1000).toFixed(3));
          } else if (drop4 == 2) {
            if (isNaN(third)) return { error: "Please! Check Your Input." };
            response.tech_jawab2 = parseFloat((third / 1000).toFixed(3));
          }
        }
      }
    } else {
      return { error: "Invalid calculator_name" };
    }

    return response;
  }

  /** getCalculationMolalityCalculator
   * POST: /api/calculators-lol/molality-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationMolalityCalculator(body) {
    let find = body.tech_find;
    let amount_solute = parseFloat(body.tech_amount_solute);
    let amount_solute_unit = body.tech_amount_solute_unit;
    let mass_solvent = parseFloat(body.tech_mass_solvent);
    let mass_solvent_unit = body.tech_mass_solvent_unit;
    let molality = parseFloat(body.tech_molality);
    let molality_unit = body.tech_molality_unit;
    let type = body.tech_type;
    let density = parseFloat(body.tech_density);
    let density_unit = parseFloat(body.tech_density_unit);
    let molecular_mass_solute = parseFloat(body.tech_molecular_mass_solute);
    let molecular_mass_solute_unit = parseFloat(
      body.tech_molecular_mass_solute_unit
    );

    let response = {};

    const unitConversion = {
      amount_solute_unit: {
        mol: 1,
        mmol: 0.001,
        µmol: 1e-6,
        nmol: 1e-9,
        pmol: 1e-12,
      },
      mass_solvent_unit: {
        µg: 1e-9,
        mg: 1e-6,
        g: 0.001,
        dag: 0.01,
        kg: 1,
        oz: 0.02835,
        lbs: 0.4536,
      },
      molality_unit: {
        "mol/µg": 1e-9,
        "mol/mg": 1e-6,
        "mol/g": 0.001,
        "mol/dag": 0.01,
        "mol/kg": 1,
        "mol/oz": 0.02835,
        "mol/lbs": 0.4536,
      },
    };

    amount_solute_unit =
      unitConversion.amount_solute_unit[amount_solute_unit] || 1;
    mass_solvent_unit =
      unitConversion.mass_solvent_unit[mass_solvent_unit] || 1;
    molality_unit = unitConversion.molality_unit[molality_unit] || 1;

    if (type === "first") {
      if (find === "1") {
        if (!isNaN(amount_solute) && !isNaN(mass_solvent)) {
          let amount_solute_value = amount_solute * amount_solute_unit;
          let mass_solvent_value = mass_solvent * mass_solvent_unit;
          let calculate_molality = amount_solute_value / mass_solvent_value;
          response.tech_molality = calculate_molality;
        } else {
          return { error: "Please! Check Your Input." };
        }
      } else if (find === "2") {
        if (!isNaN(molality) && !isNaN(mass_solvent)) {
          let mass_solvent_value = mass_solvent * mass_solvent_unit;
          let calculate_molality_value = molality * molality_unit;
          let amount_of_solute = mass_solvent_value * calculate_molality_value;
          response.tech_amount_of_solute = amount_of_solute;
        } else {
          return { error: "Please! Check Your Input." };
        }
      } else if (find === "3") {
        if (!isNaN(molality) && !isNaN(amount_solute)) {
          let amount_solute_value = amount_solute * amount_solute_unit;
          let calculate_molality_value = molality * molality_unit;
          let mass_of_solvent = amount_solute_value / calculate_molality_value;
          response.tech_amount_of_solvent = mass_of_solvent;
        } else {
          return { error: "Please! Check Your Input." };
        }
      }

      response.tech_method = find;
    } else if (type === "second") {
      if (
        !isNaN(density) &&
        !isNaN(molecular_mass_solute) &&
        !isNaN(molality)
      ) {
        let density_value = density * density_unit;
        let molecular_mass_solute_value =
          molecular_mass_solute / molecular_mass_solute_unit;
        let calculate_molality_value = molality * molality_unit;
        let calculate_molarity =
          density_value /
          (1 / calculate_molality_value + molecular_mass_solute_value / 1000);
        response.tech_molality = calculate_molarity;
      } else {
        return { error: "Please! Check Your Input." };
      }
    }

    response.tech_type = type;
    return response;
  }

  /** getCalculationMoleRatioCalculator
   * POST: /api/calculators-lol/mole-ratio-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationMoleRatioCalculator(body) {
    let find = body.tech_find;
    let first_coefficient = body.tech_first_coefficient;
    let first_product = body.tech_first_product;
    let moles = body.tech_moles;

    let z = 0;
    let y = 0;
    let response = {};

    if (find === "1" || find === "2" || find === "3") {
      for (let i = 0; i < first_coefficient.length; i++) {
        if (isFinite(first_coefficient[i]) && first_coefficient[i] > 0) {
          z++;
        } else {
          response.error = "Please! Check Your Input.";
          return response;
        }
      }

      for (let j = 0; j < first_product.length; j++) {
        if (isFinite(first_product[j]) && first_product[j] > 0) {
          y++;
        } else {
          response.error = "Please! Check Your Input.";
          return response;
        }
      }
    }

    if (find === "2" && Array.isArray(moles)) {
      for (let k = 0; k < first_coefficient.length - 1; k++) {
        let smith =
          (moles[k] * first_coefficient[k + 1]) / first_coefficient[k];
        // You can add smith to response if needed
        // Example: response[`smith_${k}`] = smith;
      }
    }

    if (z === first_coefficient.length && y === first_product.length) {
      response.tch_coefficient = first_coefficient;
      response.tch_first_product = first_product;
    }

    return response;
  }

  /** getCalculationMolarityCalculator
   * POST: /api/calculators-lol/molarity-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationMolarityCalculator(body) {
    let cal = String(body.tech_cal).trim();
    let mass = parseFloat(body.tech_mass);
    let mass_unit = String(body.tech_mass_unit).trim();
    let vol = parseFloat(body.tech_vol);
    let vol_unit = String(body.tech_vol_unit).trim();
    let conc = parseFloat(body.tech_conc);
    let conc_unit = String(body.tech_conc_unit).trim();
    let sc = parseFloat(body.tech_sc);
    let sc_unit = String(body.tech_sc_unit).trim();
    let dc = parseFloat(body.tech_dc);
    let dc_unit = String(body.tech_dc_unit).trim();
    let dv = parseFloat(body.tech_dv);
    let dv_unit = String(body.tech_dv_unit).trim();
    let mw = parseFloat(body.tech_mw);

    let response = {};

    const isValid = [mass, vol, conc, mw, sc, dc, dv].every((v) => !isNaN(v));

    if (!isValid) {
      response.error = "Please! Check Your Input.";
      return response;
    }

    // Unit conversions
    const unitConvert = {
      mass: { pg: 1e-12, ng: 1e-9, μg: 1e-6, mg: 1e-3, kg: 1e3 },
      vol: { nL: 1e-9, μL: 1e-6, mL: 1e-3 },
      conc: { fM: 1e-15, pM: 1e-12, nM: 1e-9, μM: 1e-6, mM: 1e-3 },
    };

    if (mass_unit in unitConvert.mass) mass *= unitConvert.mass[mass_unit];
    if (conc_unit in unitConvert.conc) conc *= unitConvert.conc[conc_unit];
    if (vol_unit in unitConvert.vol) vol *= unitConvert.vol[vol_unit];
    if (sc_unit in unitConvert.conc) sc *= unitConvert.conc[sc_unit];
    if (dc_unit in unitConvert.conc) dc *= unitConvert.conc[dc_unit];
    if (dv_unit in unitConvert.vol) dv *= unitConvert.vol[dv_unit];

    if (cal === "mass" && !isNaN(conc) && !isNaN(mw) && !isNaN(vol)) {
      mass = conc * vol * mw;
      response.tech_ans = `${(mass / 0.001).toFixed(
        4
      )} <span class="text-green font-s-25">mg</span>`;
      response.tech_ans_pg = `${(mass / 1e-12).toFixed(4)} pg`;
      response.tech_ans_ng = `${(mass / 1e-9).toFixed(4)} ng`;
      response.tech_ans_ug = `${(mass / 1e-6).toFixed(4)} μg`;
      response.tech_ans_g = `${mass.toFixed(4)} g`;
      response.tech_ans_kg = `${(mass / 1e6).toFixed(4)} kg`;
    } else if (cal === "vol" && !isNaN(mass) && !isNaN(mw) && !isNaN(conc)) {
      vol = mass / (conc * mw);
      response.tech_ans = `${(vol / 0.001).toFixed(
        4
      )} <span class="text-green font-s-25">mL</span>`;
      response.tech_ans_nl = `${(vol / 1e-9).toFixed(4)} nL`;
      response.tech_ans_ul = `${(vol / 1e-6).toFixed(4)} μL`;
      response.tech_ans_l = `${vol.toFixed(4)} L`;
    } else if (cal === "mol" && !isNaN(mass) && !isNaN(mw) && !isNaN(vol)) {
      let mol = mass / (vol * mw);
      response.tech_ans = `${(mol / 1e-3).toFixed(
        4
      )} <span class="text-green font-s-25">mM</span>`;
      response.tech_ans_fm = `${(mol / 1e-15).toFixed(4)} fM`;
      response.tech_ans_pm = `${(mol / 1e-12).toFixed(4)} pM`;
      response.tech_ans_nm = `${(mol / 1e-9).toFixed(4)} nM`;
      response.tech_ans_um = `${(mol / 1e-6).toFixed(4)} μM`;
      response.tech_ans_m = `${mol.toFixed(4)} M`;
    } else if (cal === "rv" && !isNaN(sc) && !isNaN(dc) && !isNaN(dv)) {
      if (dc > sc) {
        response.error =
          "Desired Concentration shouldn't be greater than Stock Concentration.";
        return response;
      }
      let rv = (dc / sc) * dv;
      response.tech_ans = `${(rv / 0.001).toFixed(
        4
      )} <span class="text-green font-s-25">mL</span>`;
      response.tech_ans_nl = `${(rv / 1e-9).toFixed(4)} nL`;
      response.tech_ans_ul = `${(rv / 1e-6).toFixed(4)} μL`;
      response.tech_ans_l = `${rv.toFixed(4)} L`;
    } else {
      response.error = "Please! Check Your Input.";
      return response;
    }

    return response;
  }
  /** getCalculationDilutionCalculator
   * POST: /api/calculators-lol/dilution-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationDilutionCalculator(body) {
    let cal = body.tech_cal;
    let c1 = body.tech_c1;
    let c1_unit = body.tech_c1_unit;
    let v1 = body.tech_v1;
    let v1_unit = body.tech_v1_unit;
    let c2 = body.tech_c2;
    let c2_unit = body.tech_c2_unit;
    let v2 = body.tech_v2;
    let v2_unit = body.tech_v2_unit;

    c1 = parseFloat(c1);
    v1 = parseFloat(v1);
    c2 = parseFloat(c2);
    v2 = parseFloat(v2);

    let response = {};

    if (isFinite(c1) && isFinite(v1) && isFinite(c2) && isFinite(v2)) {
      // Convert concentration units to M
      if (c1_unit === "fM") c1 *= 1e-15;
      else if (c1_unit === "pM") c1 *= 1e-12;
      else if (c1_unit === "nM") c1 *= 1e-9;
      else if (c1_unit === "μM") c1 *= 1e-6;
      else if (c1_unit === "mM") c1 *= 1e-3;

      if (c2_unit === "fM") c2 *= 1e-15;
      else if (c2_unit === "pM") c2 *= 1e-12;
      else if (c2_unit === "nM") c2 *= 1e-9;
      else if (c2_unit === "μM") c2 *= 1e-6;
      else if (c2_unit === "mM") c2 *= 1e-3;

      // Convert volume units to L
      if (v1_unit === "nL") v1 *= 1e-9;
      else if (v1_unit === "μL") v1 *= 1e-6;
      else if (v1_unit === "mL") v1 *= 1e-3;

      if (v2_unit === "nL") v2 *= 1e-9;
      else if (v2_unit === "μL") v2 *= 1e-6;
      else if (v2_unit === "mL") v2 *= 1e-3;

      if (cal === "c1") {
        c1 = (c2 * v2) / v1;
        response.tech_ans = `${(c1 / 1e-3).toFixed(
          4
        )} <span class="text-green font-s-25">mM</span>`;
        response.tech_ans_fm = `${(c1 / 1e-15).toFixed(4)} fM`;
        response.tech_ans_pm = `${(c1 / 1e-12).toFixed(4)} pM`;
        response.tech_ans_nm = `${(c1 / 1e-9).toFixed(4)} nM`;
        response.tech_ans_um = `${(c1 / 1e-6).toFixed(4)} μM`;
        response.tech_ans_m = `${c1.toFixed(4)} M`;
      } else if (cal === "v1") {
        v1 = (c2 * v2) / c1;
        response.tech_ans = `${(v1 / 1e-3).toFixed(
          4
        )} <span class="text-green font-s-25">mL</span>`;
        response.tech_ans_nl = `${(v1 / 1e-9).toFixed(4)} nL`;
        response.tech_ans_ul = `${(v1 / 1e-6).toFixed(4)} μL`;
        response.tech_ans_l = `${v1.toFixed(4)} L`;
      } else if (cal === "c2") {
        c2 = (c1 * v1) / v2;
        response.tech_ans = `${(c2 / 1e-3).toFixed(
          4
        )} <span class="text-green font-s-25">mM</span>`;
        response.tech_ans_fm = `${(c2 / 1e-15).toFixed(4)} fM`;
        response.tech_ans_pm = `${(c2 / 1e-12).toFixed(4)} pM`;
        response.tech_ans_nm = `${(c2 / 1e-9).toFixed(4)} nM`;
        response.tech_ans_um = `${(c2 / 1e-6).toFixed(4)} μM`;
        response.tech_ans_m = `${c2.toFixed(4)} M`;
      } else if (cal === "v2") {
        v2 = (c1 * v1) / c2;
        response.tech_ans = `${(v2 / 1e-3).toFixed(
          4
        )} <span class="text-green font-s-25">mL</span>`;
        response.tech_ans_nl = `${(v2 / 1e-9).toFixed(4)} nL`;
        response.tech_ans_ul = `${(v2 / 1e-6).toFixed(4)} μL`;
        response.tech_ans_l = `${v2.toFixed(4)} L`;
      } else {
        response.error = "Please! Check Your Input.";
        return response;
      }

      return response;
    } else {
      return { error: "Please! Check Your Input." };
    }
  }
}

module.exports = new CalculatorsServices();
