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
  /** getCalculationProbabilityCalculator
   * POST: /api/calculators-lol/probability-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationProbabilityCalculator(body) {
    let result = {};

    let option = body.tech_for;

    if (option === "1") {
      let nbr1 = Number(body.tech_nbr1);
      let event = Number(body.tech_event);

      if (!isNaN(nbr1) && !isNaN(event)) {
        let event_occur = +(event / nbr1).toFixed(3);
        let not_occur = +(1 - event_occur).toFixed(3);

        result.tech_event_occur = event_occur;
        result.tech_not_occur = not_occur;
        result.tech_Single = "active";
      } else {
        result.error = "Please fill All fields.";
      }
    } else if (option === "2") {
      let nbr2 = Number(body.tech_nbr2);
      let event_a = Number(body.tech_event_a);
      let event_b = Number(body.tech_event_b);

      if (!isNaN(nbr2) && !isNaN(event_a) && !isNaN(event_b)) {
        let event_a_occur = +(event_a / nbr2).toFixed(4);
        let not_a_occur = +(1 - event_a_occur).toFixed(4);
        let event_b_occur = +(event_b / nbr2).toFixed(4);
        let not_b_occur = +(1 - event_b_occur).toFixed(4);
        let both_events = +(event_a_occur * event_b_occur).toFixed(4);
        let either_events = +(
          event_a_occur +
          event_b_occur -
          both_events
        ).toFixed(4);
        let conditional = +(both_events / event_b_occur).toFixed(4);

        result = {
          tech_event_a_occur: event_a_occur,
          tech_not_a_occur: not_a_occur,
          tech_event_b_occur: event_b_occur,
          tech_not_b_occur: not_b_occur,
          tech_both_events: both_events,
          tech_either_events: either_events,
          tech_conditional: conditional,
          tech_Multiple: "active",
        };
      } else {
        result.error = "Please fill All fields.";
      }
    } else if (option === "3") {
      let pro_a = Number(body.tech_pro_a);
      let pro_b = Number(body.tech_pro_b);
      let format = body.format;

      if (!isNaN(pro_a) && !isNaN(pro_b)) {
        if (format === "2") {
          pro_a = pro_a / 100;
          pro_b = pro_b / 100;
        }

        let not_a_occur = +(1 - pro_a).toFixed(4);
        let not_b_occur = +(1 - pro_b).toFixed(4);
        let both_events = +(pro_a * pro_b).toFixed(4);
        let either_events = +(pro_a + pro_b - both_events).toFixed(5);
        let conditional = +(both_events / pro_b).toFixed(4);
        let not_both = +(pro_a + pro_b - 2 * both_events).toFixed(5);
        let nor_both = +(1 - either_events).toFixed(5);
        let anotb = +(pro_a * (1 - pro_b)).toFixed(5);
        let bnota = +((1 - pro_a) * pro_b).toFixed(5);

        result = {
          tech_not_a_occur: not_a_occur,
          tech_not_b_occur: not_b_occur,
          tech_both_events: both_events,
          tech_either_events: either_events,
          tech_conditional: conditional,
          tech_not_both: not_both,
          tech_nor_both: nor_both,
          tech_anotb: anotb,
          tech_bnota: bnota,
          tech_pro_a: pro_a,
          tech_pro_b: pro_b,
          tech_Solver: "events",
        };
      } else {
        result.error = "Please fill All fields.";
      }
    } else if (option === "4") {
      let eve_a = Number(body.tech_eve_a);
      let rep_a = Number(body.tech_rep_a);
      let eve_b = Number(body.tech_eve_b);
      let rep_b = Number(body.tech_rep_b);

      if (!isNaN(eve_a) && !isNaN(rep_a) && !isNaN(eve_b) && !isNaN(rep_b)) {
        result = {
          tech_Events: "events",
        };
      } else {
        result.error = "Please fill All fields.";
      }
    } else if (option === "5") {
      let andb = Number(body.tech_andb);
      let prob_b = Number(body.tech_prob_b);

      if (!isNaN(andb) && !isNaN(prob_b)) {
        result.tech_condi = +(andb / prob_b).toFixed(4);
      } else {
        result.error = "Please fill All fields.";
      }
    }

    return result;
  }

  /** getCalculationCoefficientOfVariationCalculator
   * POST: /api/calculators-lol/coefficient-of-variation-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationCoefficientOfVariationCalculator(body) {
    let result = {};

    let x = body.tech_x;
    let type = body.tech_type_;

    if (x && x.trim() !== "") {
      let cleaned = x.replace(/[\n\r\s,]+/g, ",");
      while (cleaned.includes(",,")) cleaned = cleaned.replace(",,", ",");

      let array = cleaned
        .split(",")
        .map((v) => v.trim())
        .filter((v) => v !== "");
      let count = array.length;
      let replace = cleaned.replace(/,/g, "+");

      let isAllNumbers = array.every((val) => !isNaN(val));
      let numericArray = array.map(Number);

      result.tech_count = count;
      result.tech_arr = array;
      result.tech_replace = replace;

      if (isAllNumbers) {
        let sum = numericArray.reduce((a, b) => a + b, 0);
        let mean = +(sum / count).toFixed(3);

        let d = 0;
        for (let val of numericArray) {
          d += Math.pow(val - mean, 2);
        }

        let s_d =
          type === "2" ? Math.sqrt(d / count) : Math.sqrt(d / (count - 1));
        s_d = +s_d.toFixed(4);

        let c = +(s_d / mean).toFixed(4);

        result.tech_sum = sum;
        result.tech_m = mean;
        result.tech_d = s_d;
        result.tech_c = c;
        result.tech_t_n = count;
      } else {
        result.error = "Please Enter Valid Input.";
      }
    } else {
      result.error = "Please fill All fields.";
    }

    return result;
  }

  /**
   * getCalculationHypergeometricCalculator: Service Method
   * POST: /api/calculators-lol/hypergeometric-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationHypergeometricCalculator(body) {
    // const { p: N, sp: K, s: n, ss: k, method, inc, rep, fun } = body;
    let N = body.tech_p;
    let K = body.tech_sp;
    let n = body.tech_s;
    let k = body.tech_ss;
    let method = body.tech_method;
    let inc = body.tech_inc;
    let rep = body.tech_rep;
    let fun = body.tech_fun;
    const result = {};

    // Validate required fields
    if (!isNumeric(N) || !isNumeric(K) || !isNumeric(n) || !isNumeric(k)) {
      result.error = "Please fill All fields.";
      return result;
    }

    // Calculate mean, variance, and standard deviation
    const mean = parseFloat(((n * K) / N).toFixed(6));
    const variance = n * (K / N) * ((N - K) / N) * ((N - n) / (N - 1));
    const sd = parseFloat(Math.sqrt(variance).toFixed(6));

    // Validation checks
    if (n > N) {
      result.error = "(N) Must be Greater Than (n).";
      return result;
    }
    if (K > N) {
      result.error = "(N) Must be Greater Than (K).";
      return result;
    }
    if (k > n) {
      result.error = "(n) Must be Greater Than (k).";
      return result;
    }

    // Helper function to check if value is numeric
    function isNumeric(val) {
      return !isNaN(parseFloat(val)) && isFinite(val);
    }

    // Factorial function
    function factorial(n) {
      if (n <= 1) return 1;
      let fact = 1;
      for (let i = 2; i <= n; i++) {
        fact *= i;
      }
      return fact;
    }
    // Combinations function
    function combinations(n, k) {
      if (n < k) return 0;
      return Number(factorial(n) / (factorial(k) * factorial(n - k)));
    }

    // Method 1: Single calculations
    if (method == "1") {
      const first = combinations(K, k);
      const second = combinations(N - K, n - k);
      const third = combinations(N, n);
      const a = parseFloat(((first * second) / third).toFixed(6));

      let b = 0;
      for (let i = 0; i < k; i++) {
        const f = combinations(K, i);
        const s = combinations(N - K, n - i);
        const t = combinations(N, n);
        b += (f * s) / t;
      }

      let c = 0;
      for (let i = 0; i <= k; i++) {
        const f = combinations(K, i);
        const s = combinations(N - K, n - i);
        const t = combinations(N, n);
        c += (f * s) / t;
      }

      let d = 0;
      for (let i = n; i > k; i--) {
        const f = combinations(K, i);
        const s = combinations(N - K, n - i);
        const t = combinations(N, n);
        d += (f * s) / t;
      }

      let e = 0;
      for (let i = n; i >= k; i--) {
        const f = combinations(K, i);
        const s = combinations(N - K, n - i);
        const t = combinations(N, n);
        e += (f * s) / t;
      }

      result.tech_a = a;
      result.tech_mean = mean;
      result.tech_b = parseFloat(b.toFixed(6));
      result.tech_variance = parseFloat(variance.toFixed(6));
      result.tech_sd = sd;
      result.tech_c = parseFloat(c.toFixed(6));
      result.tech_d = parseFloat(d.toFixed(6));
      result.tech_e = parseFloat(e.toFixed(6));
      result.tech_method = 1;
      return result;
    }
    // Method 2: Table generation
    else {
      if (!isNumeric(inc) || !isNumeric(rep) || rep > 20) {
        result.error = "Input Error";
        return result;
      }

      const increment = parseFloat(inc);
      const repetitions = parseInt(rep);
      let currentK = parseFloat(k);
      let table = "";
      let chart = "";
      let xval = "";
      // Function 1: Probability mass function
      if (fun == "1") {
        for (let i = 1; i <= repetitions; i++) {
          // Convert currentK to integer for combinations calculation
          const kInt = Math.round(currentK);
          const first = combinations(K, kInt);
          const second = combinations(N - K, n - kInt);
          const third = combinations(N, n);
          const a = (first * second) / third;
          chart += a + ",";
          xval += kInt + ",";
          table += `<tr><td class="py-2 border-b">${kInt}</td><td class="py-2 border-b">${a}</td><td class="py-2 border-b">${
            a * 100
          }%</td></tr>`;
          currentK += increment;
        }
      }

      // Function 2: Cumulative distribution (<=)
      if (fun == "2") {
        for (let j = 1; j <= repetitions; j++) {
          const kInt = Math.round(currentK);
          let a = 0;

          for (let i = 0; i <= kInt; i++) {
            const first = combinations(K, i);
            const second = combinations(N - K, n - i);
            const third = combinations(N, n);
            a += (first * second) / third;
          }

          chart += a + ",";
          xval += kInt + ",";
          table += `<tr><td class="py-2 border-b">${kInt}</td><td class="py-2 border-b">${a}</td><td class="py-2 border-b">${
            a * 100
          }%</td></tr>`;
          currentK += increment;
        }
      }

      // Function 3: Cumulative distribution (>=)
      if (fun == "3") {
        for (let j = 1; j < repetitions; j++) {
          const kInt = Math.round(currentK);
          let a = 0;

          for (let i = n; i >= kInt; i--) {
            const first = combinations(K, i);
            const second = combinations(N - K, n - i);
            const third = combinations(N, n);
            a += (first * second) / third;
          }

          chart += a + ",";
          xval += kInt + ",";
          table += `<tr><td class="py-2 border-b">${kInt}</td><td class="py-2 border-b">${a}</td><td class="py-2 border-b">${
            a * 100
          }%</td></tr>`;
          currentK += increment;
        }
      }

      result.tech_mean = mean;
      result.tech_sd = sd;
      result.tech_variance = parseFloat(variance.toFixed(6));
      result.tech_table = table;
      result.tech_chart = chart;
      result.tech_xval = xval;
      result.tech_method = 2;
      result.RESULT = 1;
      return result;
    }
  }

  /** getCalculationCovarianceCalculator
   * POST: /api/calculators-lol/covariance-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationCovarianceCalculator(body) {
    let param = {};

    let set_x = body.tech_set_x;
    let set_y = body.tech_set_y;
    let formula = body.tech_formula;
    let between = Number(body.tech_between);
    let devi_x = Number(body.tech_devi_x);
    let devi_y = Number(body.tech_devi_y);
    let matrix = body.tech_matrix;

    if (formula === "1") {
      if (set_x && set_y) {
        // Normalize inputs: replace spaces/newlines etc with commas
        set_x = set_x.replace(/[\s,\n\r]+/g, ",");
        while (set_x.includes(",,")) set_x = set_x.replace(/,,/g, ",");

        set_y = set_y.replace(/[\s,\n\r]+/g, ",");
        while (set_y.includes(",,")) set_y = set_y.replace(/,,/g, ",");

        let arrayX = set_x
          .split(",")
          .map((e) => e.trim())
          .filter((e) => e !== "");
        let arrayY = set_y
          .split(",")
          .map((e) => e.trim())
          .filter((e) => e !== "");

        // Validate numeric and equal length
        let check =
          arrayX.length === arrayY.length &&
          arrayX.every((val) => !isNaN(Number(val))) &&
          arrayY.every((val) => !isNaN(Number(val)));

        if (check) {
          let nbr = arrayX.length;
          let numsX = arrayX.map(Number);
          let numsY = arrayY.map(Number);

          let sumX = numsX.reduce((a, b) => a + b, 0);
          let sumY = numsY.reduce((a, b) => a + b, 0);

          let meanX = +(sumX / nbr).toFixed(2);
          let meanY = +(sumY / nbr).toFixed(2);

          let total = 0;
          for (let i = 0; i < nbr; i++) {
            let X1 = numsX[i] - meanX;
            let Y1 = numsY[i] - meanY;
            total += X1 * Y1;
          }

          let sample = +(total / nbr).toFixed(2);
          let population = +(total / (nbr - 1)).toFixed(2);

          param.tech_nbr = nbr;
          param.tech_mean_x = meanX;
          param.tech_mean_y = meanY;
          param.tech_sample = sample;
          param.tech_population = population;
          param.tech_formula = formula;

          return param;
        } else {
          param.error = "Please Check Your Input";
          return param;
        }
      } else {
        param.error = "Please Enter all value";
        return param;
      }
    }

    if (formula === "2") {
      if (!isNaN(between) && !isNaN(devi_x) && !isNaN(devi_y)) {
        param.tech_ans_2 = +(between * devi_x * devi_y).toFixed(2);
        param.tech_formula = formula;
        return param;
      } else {
        param.error = "Please fill All fields.";
        return param;
      }
    }

    if (formula === "3") {
      if (matrix) {
        let check = true;
        // split matrix string on ']' to get rows
        let matrixRows = matrix.split("]");
        let rows = matrixRows.length;
        if (rows < 2) {
          param.error = "Please Enter Matrix";
          return param;
        }

        // Extract first row to get column count
        let firstRowStr = matrixRows[0].split("[")[1];
        if (!firstRowStr) {
          param.error = "Invalid Matrix Format";
          return param;
        }
        let firstRow = firstRowStr
          .split(",")
          .map((e) => e.trim())
          .filter((e) => e !== "");
        let rowCount = firstRow.length;

        // Initialize arrays
        let arrayRow = new Array(rowCount).fill(0);
        let arrayAvg = new Array(rowCount).fill(0);

        for (let i = 0; i < rows - 1; i++) {
          let rowParts = matrixRows[i].split("[");
          if (rowParts.length < 2) {
            check = false;
            break;
          }
          let rowValues = rowParts[1]
            .split(",")
            .map((e) => e.trim())
            .filter((e) => e !== "");
          if (rowValues.length !== rowCount) {
            check = false;
            break;
          }

          for (let k = 0; k < rowCount; k++) {
            let val = Number(rowValues[k]);
            if (isNaN(val)) {
              check = false;
            } else {
              arrayRow[k] += val;
              arrayAvg[k] += val;
            }
          }
        }

        // Calculate averages
        for (let i = 0; i < rowCount; i++) {
          arrayAvg[i] = +(arrayAvg[i] / (rows - 1)).toFixed(2);
        }

        // Calculate final rows after subtracting averages
        let finalRows = Array(rows - 1)
          .fill(0)
          .map(() => new Array(rowCount).fill(0));

        for (let i = 0; i < rows - 1; i++) {
          let rowParts = matrixRows[i].split("[");
          let rowValues = rowParts[1]
            .split(",")
            .map((e) => e.trim())
            .filter((e) => e !== "");
          for (let j = 0; j < rowCount; j++) {
            finalRows[i][j] = Number(rowValues[j]) - arrayAvg[j];
          }
        }

        // Transpose rows
        let transRows = Array(rowCount)
          .fill(0)
          .map(() => new Array(rows - 1).fill(0));

        for (let i = 0; i < rowCount; i++) {
          for (let j = 0; j < rows - 1; j++) {
            transRows[i][j] = finalRows[j][i];
          }
        }

        // Multiply transRows and finalRows matrices
        let resultRows = Array(rowCount)
          .fill(0)
          .map(() => new Array(rowCount).fill(0));

        for (let i = 0; i < rowCount; i++) {
          for (let j = 0; j < rowCount; j++) {
            let sum = 0;
            for (let k = 0; k < rows - 1; k++) {
              sum += transRows[i][k] * finalRows[k][j];
            }
            resultRows[i][j] = sum;
          }
        }

        // Format output string
        let output = "";
        for (let i = 0; i < rowCount; i++) {
          output += "[ ";
          for (let j = 0; j < rowCount; j++) {
            let val = +(resultRows[i][j] / (rows - 1)).toFixed(5);
            output += j === rowCount - 1 ? `${val} ] <br>` : `${val} , `;
          }
        }

        if (check) {
          param.tech_output = output;
          param.tech_formula = formula;
          return param;
        } else {
          param.error = "Please Check Your Input";
          return param;
        }
      } else {
        param.error = "Please Enter Matrix";
        return param;
      }
    }

    // If formula not matched
    param.error = "Invalid formula value";
    return param;
  }

  /** getCalculationEmpiricalRuleCalculator
   * POST: /api/calculators-lol/empirical-rule-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationEmpiricalRuleCalculator(body) {
    let form = body.tech_form;
    let mean = body.tech_mean;
    let deviation = body.tech_deviation;
    let x = body.tech_x;
    let type_r = body.tech_type_r;

    let param = {};

    if (form === "summary") {
      if (!isNaN(mean) && !isNaN(deviation)) {
        let first = `${(mean - deviation).toFixed(2)} & ${(
          mean + deviation
        ).toFixed(2)}`;
        let second = `${(mean - 2 * deviation).toFixed(2)} & ${(
          mean +
          2 * deviation
        ).toFixed(2)}`;
        let third = `${(mean - 3 * deviation).toFixed(2)} & ${(
          mean +
          3 * deviation
        ).toFixed(2)}`;

        param = {
          tech_mean: mean,
          tech_devi: deviation,
          tech_first: first,
          tech_second: second,
          tech_third: third,
        };
        return param;
      } else {
        return { error: "Please Fill All Fields" };
      }
    } else {
      if (x && typeof x === "string") {
        let array = x
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s !== "");
        let numberCheck = array.every((val) => !isNaN(val));
        let count = array.length;

        if (numberCheck) {
          let numbers = array.map(Number);
          let sum = numbers.reduce((a, b) => a + b, 0);
          let meanVal = parseFloat((sum / count).toFixed(3));

          let d = 0;
          for (let val of numbers) {
            d += Math.pow(val - meanVal, 2);
          }

          let devi;
          if (type_r === "2") {
            devi = parseFloat(Math.sqrt((1 / count) * d).toFixed(4));
          } else {
            devi = parseFloat(Math.sqrt((1 / (count - 1)) * d).toFixed(4));
          }

          let first = `${(meanVal - devi).toFixed(2)} & ${(
            meanVal + devi
          ).toFixed(2)}`;
          let second = `${(meanVal - 2 * devi).toFixed(2)} & ${(
            meanVal +
            2 * devi
          ).toFixed(2)}`;
          let third = `${(meanVal - 3 * devi).toFixed(2)} & ${(
            meanVal +
            3 * devi
          ).toFixed(2)}`;

          param = {
            tech_count: count,
            tech_mean: meanVal,
            tech_devi: devi,
            tech_first: first,
            tech_second: second,
            tech_third: third,
          };
          return param;
        } else {
          return { error: "Please Fill All Fields" };
        }
      } else {
        return { error: "Please Fill All Fields" };
      }
    }
  }
  /** getCalculationMeanMedianModeRangeCalculator
   * POST: /api/calculators-lol/mean-median-mode-range-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationMeanMedianModeRangeCalculator(body) {
    let x = body.tech_x;

    let result = {};
    let check = true;

    if (!x) {
      check = false;
    }

    x = x.replace(/[\s,\n\r]+/g, ",");
    while (x.includes(",,")) x = x.replace(",,", ",");

    let numbers = x
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s !== "")
      .map(Number);

    for (let val of numbers) {
      if (isNaN(val)) {
        check = false;
        break;
      }
    }

    if (check) {
      numbers.sort((a, b) => a - b);
      let sum = numbers.reduce((a, b) => a + b, 0);
      let count = numbers.length;
      let average = +(sum / count).toFixed(4);

      // Median
      let median;
      if (count % 2 !== 0) {
        median = numbers[Math.floor(count / 2)];
      } else {
        let mid = count / 2;
        median = (numbers[mid] + numbers[mid - 1]) / 2;
      }

      function interpolate(array, position) {
        let floorIdx = Math.floor(position) - 1;
        let ceilIdx = Math.ceil(position) - 1;
        if (floorIdx === ceilIdx) {
          return array[floorIdx];
        } else {
          return (
            array[floorIdx] +
            (position - Math.floor(position)) *
              (array[ceilIdx] - array[floorIdx])
          );
        }
      }

      // Q1 and Q3
      let Q1_pos = (count + 1) / 4;
      let Q3_pos = (3 * (count + 1)) / 4;
      let Q1 = interpolate(numbers, Q1_pos);
      let Q3 = interpolate(numbers, Q3_pos);
      let IQR = Q3 - Q1;

      // Mode
      let freq = {};
      for (let n of numbers) {
        freq[n] = (freq[n] || 0) + 1;
      }

      let maxFreq = Math.max(...Object.values(freq));
      let mode = [];
      let hasRepeating = false;
      for (let key in freq) {
        if (freq[key] > 1 && freq[key] === maxFreq) {
          mode.push(Number(key));
          hasRepeating = true;
        }
      }

      if (!hasRepeating) {
        mode.push("No value appears more than once!");
      }

      result = {
        tech_Q1: Q1,
        tech_Q3: Q3,
        tech_IQR: IQR,
        tech_mode: mode,
        tech_median: median,
        tech_average: average,
        tech_count: count,
        tech_numbers: numbers,
      };
    } else {
      result.error = "Please enter numbers";
    }

    return result;
  }

  /** getCalculationQuartileCalculator
   * POST: /api/calculators-lol/quartile-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationQuartileCalculator(body) {
    let x = body.tech_x;
    let seprate = body.tech_seprate;

    let result = {};
    let check = true;

    if (!x || typeof x !== "string" || x.trim() === "") {
      check = false;
    }

    if (!seprate || typeof seprate !== "string") {
      seprate = " ";
    }

    let values = x
      .split(seprate)
      .map((v) => v.trim())
      .filter((v) => v !== "")
      .map(Number);

    for (let val of values) {
      if (isNaN(val)) {
        check = false;
        break;
      }
    }

    if (check) {
      if (values.length < 4) {
        return { error: "Please! enter 4 or more numbers" };
      }

      values.sort((a, b) => a - b);

      let count = values.length;
      let a1 = values[0];
      let a2 = values[count - 1];

      function quartil(arr) {
        let c = arr.length;
        let middleval = Math.floor((c - 1) / 2);
        let median;
        if (c % 2 !== 0) {
          median = arr[middleval];
        } else {
          let low = arr[middleval];
          let high = arr[middleval + 1];
          median = (low + high) / 2;
        }
        return Number(median.toFixed(1));
      }

      let second = quartil(values);

      let tmp = { first: [], third: [] };
      for (let val of values) {
        if (val < second) {
          tmp.first.push(val);
        } else if (val > second) {
          tmp.third.push(val);
        }
      }

      let first = quartil(tmp.first);
      let third = quartil(tmp.third);

      let min = Math.min(...values);
      let max = Math.max(...values);
      let iter = third - first;

      let sum = values.reduce((a, b) => a + b, 0);
      let average = +(sum / count).toFixed(4);

      let median;
      if (count % 2 !== 0) {
        median = values[Math.floor(count / 2)];
      } else {
        let center = count / 2;
        median = (values[center] + values[center - 1]) / 2;
      }

      let freqMap = {};
      for (let val of values) {
        freqMap[val] = (freqMap[val] || 0) + 1;
      }

      let maxFreq = Math.max(...Object.values(freqMap));
      let mode = Object.keys(freqMap)
        .filter((key) => freqMap[key] === maxFreq)
        .map(Number);

      let m = +(sum / count).toFixed(3);
      let d = values.reduce((acc, val) => acc + Math.pow(val - m, 2), 0);

      let s_d_p = +Math.sqrt(d / count).toFixed(4);
      let s_d_s = +Math.sqrt(d / (count - 1)).toFixed(4);

      result = {
        tech_a1: a1,
        tech_a2: a2,
        tech_first: first,
        tech_second: second,
        tech_third: third,
        tech_iter: iter,
        tech_mode: mode,
        tech_s_d_p: s_d_p,
        tech_s_d_s: s_d_s,
        tech_median: median,
        tech_average: average,
        tech_count: count,
        tech_numbers: values,
      };
    } else {
      result.error = "Please! Check Your Input";
    }

    return result;
  }

  /** getCalculationGeometricMeanCalculator
   * POST: /api/calculators-lol/geometric-mean-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationGeometricMeanCalculator(body) {
    let x = body.tech_x;
    let seprate = body.tech_seprate;

    let result = {};
    let check = true;

    if (!x || typeof x !== "string" || x.trim() === "") {
      return { error: "Please Enter Your Values" };
    }

    if (!seprate || typeof seprate !== "string") {
      seprate = " ";
    }

    let cleaned_input = x.replace(/[^0-9.\-%]/g, " ");
    let numbers = cleaned_input.trim().split(/\s+/);

    check = true;
    let type = "number";

    for (let value of numbers) {
      let clean_value = value.replace("%", "");
      if (isNaN(clean_value)) {
        check = false;
        break;
      }
      if (value.includes("-") || value.includes("%")) {
        type = "percentage";
      }
    }

    if (check) {
      numbers = numbers.map((val) => (val.includes("%") ? val : Number(val)));
      numbers.sort((a, b) => parseFloat(a) - parseFloat(b));
      let last_index = numbers.length - 1;
      let sol = "(";

      if (type === "number") {
        for (let i = 0; i < numbers.length; i++) {
          sol += ` ${numbers[i]}${i !== last_index ? " x" : " )"}`;
        }

        if (numbers.some((n) => n < 0)) {
          return { error: "Please Check Your Input" };
        }
      } else {
        let sol1 = "( ";
        let pro = 1;
        for (let i = 0; i < numbers.length; i++) {
          let value = parseFloat(numbers[i].toString().replace("%", ""));
          let term = 1 + value / 100;
          pro *= term;
          if (i !== last_index) {
            sol += ` (1 + ${value}/100) x`;
            sol1 += `${term} x `;
          } else {
            sol += ` (1 + ${value}/100) )`;
            sol1 += `${term} )`;
          }
        }
        let geo = +((Math.pow(pro, 1 / numbers.length) - 1) * 100).toFixed(4);

        result.tech_textline = "aa gai value";
        result.tech_sol1 = sol1;
        result.tech_pro = pro;
        result.tech_geo = `${geo}%`;
      }

      // For rest of calculations we convert all to numbers
      let numericValues = numbers.map((n) => parseFloat(n));
      let sum = numericValues.reduce((a, b) => a + b, 0);
      let count = numericValues.length;
      let average = +(sum / count).toFixed(4);

      let median;
      if (count % 2 !== 0) {
        median = numericValues[Math.floor(count / 2)];
      } else {
        let center = count / 2;
        median = (numericValues[center] + numericValues[center - 1]) / 2;
      }

      let d = 1;
      for (let val of numericValues) {
        d *= val;
      }

      let freqMap = {};
      for (let val of numericValues) {
        freqMap[val] = (freqMap[val] || 0) + 1;
      }
      let maxFreq = Math.max(...Object.values(freqMap));
      let mode = Object.keys(freqMap)
        .filter((k) => freqMap[k] === maxFreq)
        .map(Number);

      let m = +(sum / count).toFixed(3);

      result.tech_mode = mode;
      result.tech_sol = sol;
      result.tech_median = median;
      result.tech_average = average;
      result.tech_count = count;
      result.tech_tnumbers = numericValues;
      return result;
    } else {
      return { error: "Please Check Your Input" };
    }
  }

  /** getCalculationHarmonicMeanCalculator
   * POST: /api/calculators-lol/harmonic-mean-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationHarmonicMeanCalculator(body) {
    let x = body.tech_x;
    let seprateby = body.tech_seprateby;
    let seprate = body.tech_seprate;

    let result = {};
    let check = true;

    if (!x || typeof x !== "string" || x.trim() === "") {
      return { error: "Please Enter Your Values" };
    }

    // Determine actual separator
    if (seprateby === "space") {
      seprate = " ";
    } else if (seprateby === ",") {
      seprate = ",";
    } else if (!seprate || typeof seprate !== "string") {
      seprate = " "; // default fallback
    }

    let numbers = x
      .split(seprate)
      .map((v) => v.trim())
      .filter((v) => v !== "");

    for (let value of numbers) {
      if (isNaN(value)) {
        check = false;
        break;
      }
    }

    if (check) {
      numbers = numbers.map(Number);
      numbers.sort((a, b) => a - b);
      let last_index = numbers.length - 1;
      let sol = "(";
      let sol1 = "( ";
      let ans = 0;

      for (let i = 0; i < numbers.length; i++) {
        let value = numbers[i];
        let inv = 1 / value;
        ans += inv;

        if (i !== last_index) {
          sol += ` 1/${value} +`;
          sol1 += `${inv} + `;
        } else {
          sol += ` 1/${value} )`;
          sol1 += `${inv} )`;
        }
      }

      let sum = numbers.reduce((a, b) => a + b, 0);
      let count = numbers.length;
      let harmonicMean = +(count / ans).toFixed(5);
      let average = +(sum / count).toFixed(4);

      let median;
      if (count % 2 !== 0) {
        median = numbers[Math.floor(count / 2)];
      } else {
        let mid = count / 2;
        median = (numbers[mid] + numbers[mid - 1]) / 2;
      }

      let d = 1;
      for (let val of numbers) {
        d *= val;
      }

      let freqMap = {};
      for (let val of numbers) {
        freqMap[val] = (freqMap[val] || 0) + 1;
      }
      let maxFreq = Math.max(...Object.values(freqMap));
      let mode = Object.keys(freqMap)
        .filter((k) => freqMap[k] === maxFreq)
        .map(Number);

      result.tech_mode = mode;
      result.tech_sol = sol;
      result.tech_sol1 = sol1;
      result.tech_ans = harmonicMean;
      result.tech_median = median;
      result.tech_average = average;
      result.tech_count = count;
      result.tech_numbers = numbers;
      return result;
    } else {
      return { error: "Please Check Your Input" };
    }
  }

  /** getCalculationIQRCalculator
   * POST: /api/calculators-lol/interquartile-range-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationIQRCalculator(body) {
    let x = body.tech_x;
    let seprateby = body.tech_seprateby;
    let seprate = body.tech_seprate;

    let result = {};
    let check = true;

    if (!x || typeof x !== "string" || x.trim() === "") {
      return { error: "Please Enter Your Values" };
    }

    // Determine actual separator
    if (seprateby === "space") {
      seprate = " ";
    } else if (seprateby === ",") {
      seprate = ",";
    } else if (!seprate || typeof seprate !== "string") {
      seprate = " ";
    }

    let values = x
      .split(seprate)
      .map((v) => v.trim())
      .filter((v) => v !== "");
    for (let v of values) {
      if (isNaN(v)) {
        check = false;
        break;
      }
    }

    if (!check) {
      return { error: "Please! Check Your Input" };
    }

    values = values.map(Number).sort((a, b) => a - b);
    if (values.length < 4) {
      return { error: "Please! enter 4 or more numbers" };
    }

    const quartil = (arr) => {
      const count = arr.length;
      const mid = Math.floor((count - 1) / 2);
      if (count % 2 === 1) {
        return +arr[mid].toFixed(1);
      } else {
        return +((arr[mid] + arr[mid + 1]) / 2).toFixed(1);
      }
    };

    let count = values.length;
    let a1 = values[0];
    let a2 = values[count - 1];
    let second = quartil(values);

    let lowerHalf = values.filter((v) => v < second);
    let upperHalf = values.filter((v) => v > second);

    let first = quartil(lowerHalf);
    let third = quartil(upperHalf);

    let iter = +(third - first).toFixed(4);
    let sum = values.reduce((a, b) => a + b, 0);
    let average = +(sum / count).toFixed(4);

    let median;
    if (count % 2 !== 0) {
      median = values[Math.floor(count / 2)];
    } else {
      let mid = count / 2;
      median = (values[mid] + values[mid - 1]) / 2;
    }

    let freqMap = {};
    for (let v of values) {
      freqMap[v] = (freqMap[v] || 0) + 1;
    }
    let maxFreq = Math.max(...Object.values(freqMap));
    let mode = Object.keys(freqMap)
      .filter((k) => freqMap[k] === maxFreq)
      .map(Number);

    let mean = +(sum / count).toFixed(3);
    let d = 0;
    for (let v of values) {
      d += Math.pow(v - mean, 2);
    }

    let s_d_p = +Math.sqrt(d / count).toFixed(4);
    let s_d_s = +Math.sqrt(d / (count - 1)).toFixed(4);

    result.tech_a1 = a1;
    result.tech_a2 = a2;
    result.tech_first = first;
    result.tech_second = second;
    result.tech_third = third;
    result.tech_iter = iter;
    result.tech_mode = mode;
    result.tech_s_d_p = s_d_p;
    result.tech_s_d_s = s_d_s;
    result.tech_median = median;
    result.tech_average = average;
    result.tech_count = count;
    result.tech_numbers = values;

    return result;
  }

  /** getCalculationSumOfSquaresCalculator
   * POST: /api/calculators-lol/sum-of-squares-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationSumOfSquaresCalculator(body) {
    let x = body.tech_x;
    let seprateby = body.tech_seprateby;
    let seprate = body.tech_seprate;

    let result = {};
    let check = true;

    if (!x || typeof x !== "string" || x.trim() === "") {
      return { error: "Please Enter Your Values" };
    }

    // Determine actual separator
    if (seprateby === "space") {
      seprate = " ";
    } else if (seprateby === ",") {
      seprate = ",";
    } else if (!seprate || typeof seprate !== "string") {
      seprate = " ";
    }

    let numbers = x
      .split(seprate)
      .map((v) => v.trim())
      .filter((v) => v !== "");
    for (let v of numbers) {
      if (isNaN(v)) {
        check = false;
        break;
      }
    }

    if (!check) {
      return { error: "Please! Check Your Input" };
    }

    let ns = numbers.map(Number);
    let n = ns.length;
    let s = ns.reduce((a, b) => a + b, 0) / n;

    let ss = 0,
      su = 0,
      so = 0;
    for (let val of ns) {
      ss += Math.pow(val - s, 2);
      su += Math.pow(val, 2);
      so += val;
    }

    let sns = "",
      snns = "",
      soa = "",
      soas = "";
    ns.forEach((val, index) => {
      let diffSquared = Math.pow(val - s, 2);
      let square = Math.pow(val, 2);

      sns += `(${val} - ${s})<sup>2</sup>`;
      snns += `${diffSquared}`;
      soa += `(${val})<sup>2</sup>`;
      soas += `${square}`;

      if (index !== ns.length - 1) {
        sns += " + ";
        snns += " + ";
        soa += " + ";
        soas += " + ";
      }
    });

    result.tech_soas = soas;
    result.tech_soa = soa;
    result.tech_snns = snns;
    result.tech_sns = sns;
    result.tech_s = s;
    result.tech_so = so;
    result.tech_n = n;
    result.tech_su = su;
    result.tech_ss = ss;

    return result;
  }
  /**
   * getCalculationZScoreCalculator: Service Method
   * POST: /api/calculators-lol/z-score-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationZScoreCalculator(body) {
    const z_table = {
      "-4.0": {
        9: 0.00002,
        8: 0.00002,
        7: 0.00002,
        6: 0.00002,
        5: 0.00003,
        4: 0.00003,
        3: 0.00003,
        2: 0.00003,
        1: 0.00003,
        0: 0.00003,
      },
      "-3.9": {
        9: 0.00003,
        8: 0.00003,
        7: 0.00004,
        6: 0.00004,
        5: 0.00004,
        4: 0.00004,
        3: 0.00004,
        2: 0.00004,
        1: 0.00005,
        0: 0.00005,
      },
      "-3.8": {
        9: 0.00005,
        8: 0.00005,
        7: 0.00005,
        6: 0.00006,
        5: 0.00006,
        4: 0.00006,
        3: 0.00006,
        2: 0.00007,
        1: 0.00007,
        0: 0.00007,
      },
      "-3.7": {
        9: 0.00008,
        8: 0.00008,
        7: 0.00008,
        6: 0.00008,
        5: 0.00009,
        4: 0.00009,
        3: 0.0001,
        2: 0.0001,
        1: 0.0001,
        0: 0.00011,
      },
      "-3.6": {
        9: 0.00011,
        8: 0.00012,
        7: 0.00012,
        6: 0.00013,
        5: 0.00013,
        4: 0.00014,
        3: 0.00014,
        2: 0.00015,
        1: 0.00015,
        0: 0.00016,
      },
      "-3.5": {
        9: 0.00017,
        8: 0.00017,
        7: 0.00018,
        6: 0.00019,
        5: 0.00019,
        4: 0.0002,
        3: 0.00021,
        2: 0.00022,
        1: 0.00022,
        0: 0.00023,
      },
      "-3.4": {
        9: 0.00024,
        8: 0.00025,
        7: 0.00026,
        6: 0.00027,
        5: 0.00028,
        4: 0.00029,
        3: 0.0003,
        2: 0.00031,
        1: 0.00032,
        0: 0.00034,
      },
      "-3.3": {
        9: 0.00035,
        8: 0.00036,
        7: 0.00038,
        6: 0.00039,
        5: 0.0004,
        4: 0.00042,
        3: 0.00043,
        2: 0.00045,
        1: 0.00047,
        0: 0.00048,
      },
      "-3.2": {
        9: 0.0005,
        8: 0.00052,
        7: 0.00054,
        6: 0.00056,
        5: 0.00058,
        4: 0.0006,
        3: 0.00062,
        2: 0.00064,
        1: 0.00066,
        0: 0.00069,
      },
      "-3.1": {
        9: 0.00071,
        8: 0.00074,
        7: 0.00076,
        6: 0.00079,
        5: 0.00082,
        4: 0.00084,
        3: 0.00087,
        2: 0.0009,
        1: 0.00094,
        0: 0.00097,
      },
      "-3.0": {
        9: 0.001,
        8: 0.00104,
        7: 0.00107,
        6: 0.00111,
        5: 0.00114,
        4: 0.00118,
        3: 0.00122,
        2: 0.00126,
        1: 0.00131,
        0: 0.00135,
      },
      "-2.9": {
        9: 0.00139,
        8: 0.00144,
        7: 0.00149,
        6: 0.00154,
        5: 0.00159,
        4: 0.00164,
        3: 0.00169,
        2: 0.00175,
        1: 0.00181,
        0: 0.00187,
      },
      "-2.8": {
        9: 0.00193,
        8: 0.00199,
        7: 0.00205,
        6: 0.00212,
        5: 0.00219,
        4: 0.00226,
        3: 0.00233,
        2: 0.0024,
        1: 0.00248,
        0: 0.00256,
      },
      "-2.7": {
        9: 0.00264,
        8: 0.00272,
        7: 0.0028,
        6: 0.00289,
        5: 0.00298,
        4: 0.00307,
        3: 0.00317,
        2: 0.00326,
        1: 0.00336,
        0: 0.00347,
      },
      "-2.6": {
        9: 0.00357,
        8: 0.00368,
        7: 0.00379,
        6: 0.00391,
        5: 0.00402,
        4: 0.00415,
        3: 0.00427,
        2: 0.0044,
        1: 0.00453,
        0: 0.00466,
      },
      "-2.5": {
        9: 0.0048,
        8: 0.00494,
        7: 0.00508,
        6: 0.00523,
        5: 0.00539,
        4: 0.00554,
        3: 0.0057,
        2: 0.00587,
        1: 0.00604,
        0: 0.00621,
      },
      "-2.4": {
        9: 0.00639,
        8: 0.00657,
        7: 0.00676,
        6: 0.00695,
        5: 0.00714,
        4: 0.00734,
        3: 0.00755,
        2: 0.00776,
        1: 0.00798,
        0: 0.0082,
      },
      "-2.3": {
        9: 0.00842,
        8: 0.00866,
        7: 0.00889,
        6: 0.00914,
        5: 0.00939,
        4: 0.00964,
        3: 0.0099,
        2: 0.01017,
        1: 0.01044,
        0: 0.01072,
      },
      "-2.2": {
        9: 0.01101,
        8: 0.0113,
        7: 0.0116,
        6: 0.01191,
        5: 0.01222,
        4: 0.01255,
        3: 0.01287,
        2: 0.01321,
        1: 0.01355,
        0: 0.0139,
      },
      "-2.1": {
        9: 0.01426,
        8: 0.01463,
        7: 0.015,
        6: 0.01539,
        5: 0.01578,
        4: 0.01618,
        3: 0.01659,
        2: 0.017,
        1: 0.01743,
        0: 0.01786,
      },
      "-2.0": {
        9: 0.01831,
        8: 0.01876,
        7: 0.01923,
        6: 0.0197,
        5: 0.02018,
        4: 0.02068,
        3: 0.02118,
        2: 0.02169,
        1: 0.02222,
        0: 0.02275,
      },
      "-1.9": {
        9: 0.0233,
        8: 0.02385,
        7: 0.02442,
        6: 0.025,
        5: 0.02559,
        4: 0.02619,
        3: 0.0268,
        2: 0.02743,
        1: 0.02807,
        0: 0.02872,
      },
      "-1.8": {
        9: 0.02938,
        8: 0.03005,
        7: 0.03074,
        6: 0.03144,
        5: 0.03216,
        4: 0.03288,
        3: 0.03362,
        2: 0.03438,
        1: 0.03515,
        0: 0.03593,
      },
      "-1.7": {
        9: 0.03673,
        8: 0.03754,
        7: 0.03836,
        6: 0.0392,
        5: 0.04006,
        4: 0.04093,
        3: 0.04182,
        2: 0.04272,
        1: 0.04363,
        0: 0.04457,
      },
      "-1.6": {
        9: 0.04551,
        8: 0.04648,
        7: 0.04746,
        6: 0.04846,
        5: 0.04947,
        4: 0.0505,
        3: 0.05155,
        2: 0.05262,
        1: 0.0537,
        0: 0.0548,
      },
      "-1.5": {
        9: 0.0559,
        8: 0.0571,
        7: 0.0582,
        6: 0.0594,
        5: 0.0606,
        4: 0.0618,
        3: 0.063,
        2: 0.0643,
        1: 0.0655,
        0: 0.0668,
      },
      "-1.4": {
        9: 0.0681,
        8: 0.0694,
        7: 0.0708,
        6: 0.0721,
        5: 0.0735,
        4: 0.0749,
        3: 0.0764,
        2: 0.0778,
        1: 0.0793,
        0: 0.0808,
      },
      "-1.3": {
        9: 0.0823,
        8: 0.0838,
        7: 0.0853,
        6: 0.0869,
        5: 0.0885,
        4: 0.0901,
        3: 0.0918,
        2: 0.0934,
        1: 0.0951,
        0: 0.0968,
      },
      "-1.2": {
        9: 0.0985,
        8: 0.1003,
        7: 0.102,
        6: 0.1038,
        5: 0.1056,
        4: 0.1075,
        3: 0.1093,
        2: 0.1112,
        1: 0.1131,
        0: 0.1151,
      },
      "-1.1": {
        9: 0.117,
        8: 0.119,
        7: 0.121,
        6: 0.123,
        5: 0.1251,
        4: 0.1271,
        3: 0.1292,
        2: 0.1314,
        1: 0.1335,
        0: 0.1357,
      },
      "-1.0": {
        9: 0.1379,
        8: 0.1401,
        7: 0.1423,
        6: 0.1446,
        5: 0.1469,
        4: 0.1492,
        3: 0.1515,
        2: 0.1539,
        1: 0.1562,
        0: 0.1587,
      },
      "-0.9": {
        9: 0.1611,
        8: 0.1635,
        7: 0.166,
        6: 0.1685,
        5: 0.1711,
        4: 0.1736,
        3: 0.1762,
        2: 0.1788,
        1: 0.1814,
        0: 0.1841,
      },
      "-0.8": {
        9: 0.1867,
        8: 0.1894,
        7: 0.1922,
        6: 0.1949,
        5: 0.1977,
        4: 0.2005,
        3: 0.2033,
        2: 0.2061,
        1: 0.209,
        0: 0.2119,
      },
      "-0.7": {
        9: 0.2148,
        8: 0.2177,
        7: 0.2206,
        6: 0.2236,
        5: 0.2266,
        4: 0.2296,
        3: 0.2327,
        2: 0.2358,
        1: 0.2389,
        0: 0.242,
      },
      "-0.6": {
        9: 0.2451,
        8: 0.2483,
        7: 0.2514,
        6: 0.2546,
        5: 0.2578,
        4: 0.2611,
        3: 0.2643,
        2: 0.2676,
        1: 0.2709,
        0: 0.2743,
      },
      "-0.5": {
        9: 0.2776,
        8: 0.281,
        7: 0.2843,
        6: 0.2877,
        5: 0.2912,
        4: 0.2946,
        3: 0.2981,
        2: 0.3015,
        1: 0.305,
        0: 0.3085,
      },
      "-0.4": {
        9: 0.3121,
        8: 0.3156,
        7: 0.3192,
        6: 0.3228,
        5: 0.3264,
        4: 0.33,
        3: 0.3336,
        2: 0.3372,
        1: 0.3409,
        0: 0.3446,
      },
      "-0.3": {
        9: 0.3483,
        8: 0.352,
        7: 0.3557,
        6: 0.3594,
        5: 0.3632,
        4: 0.3669,
        3: 0.3707,
        2: 0.3745,
        1: 0.3783,
        0: 0.3821,
      },
      "-0.2": {
        9: 0.3829,
        8: 0.3897,
        7: 0.3936,
        6: 0.3974,
        5: 0.4013,
        4: 0.4052,
        3: 0.409,
        2: 0.4129,
        1: 0.4168,
        0: 0.4207,
      },
      "-0.1": {
        9: 0.4247,
        8: 0.4286,
        7: 0.4325,
        6: 0.4364,
        5: 0.4404,
        4: 0.4443,
        3: 0.4483,
        2: 0.4522,
        1: 0.4562,
        0: 0.4602,
      },
      "-0.0": {
        9: 0.4641,
        8: 0.4681,
        7: 0.4721,
        6: 0.4761,
        5: 0.4801,
        4: 0.484,
        3: 0.488,
        2: 0.492,
        1: 0.496,
        0: 0.5,
      },
      "0.0": {
        0: 0.5,
        1: 0.50399,
        2: 0.50798,
        3: 0.51197,
        4: 0.51595,
        5: 0.51994,
        6: 0.52392,
        7: 0.5279,
        8: 0.53188,
        9: 0.53586,
      },
      0.1: {
        0: 0.5398,
        1: 0.5438,
        2: 0.54776,
        3: 0.55172,
        4: 0.55567,
        5: 0.55966,
        6: 0.5636,
        7: 0.56749,
        8: 0.57142,
        9: 0.57535,
      },
      0.2: {
        0: 0.5793,
        1: 0.58317,
        2: 0.58706,
        3: 0.59095,
        4: 0.59483,
        5: 0.59871,
        6: 0.60257,
        7: 0.60642,
        8: 0.61026,
        9: 0.61409,
      },
      0.3: {
        0: 0.61791,
        1: 0.62172,
        2: 0.62552,
        3: 0.6293,
        4: 0.63307,
        5: 0.63683,
        6: 0.64058,
        7: 0.64431,
        8: 0.64803,
        9: 0.65173,
      },
      0.4: {
        0: 0.65542,
        1: 0.6591,
        2: 0.66276,
        3: 0.6664,
        4: 0.67003,
        5: 0.67364,
        6: 0.67724,
        7: 0.68082,
        8: 0.68439,
        9: 0.68793,
      },
      0.5: {
        0: 0.69146,
        1: 0.69497,
        2: 0.69847,
        3: 0.70194,
        4: 0.7054,
        5: 0.70884,
        6: 0.71226,
        7: 0.71566,
        8: 0.71904,
        9: 0.7224,
      },
      0.6: {
        0: 0.72575,
        1: 0.72907,
        2: 0.73237,
        3: 0.73565,
        4: 0.73891,
        5: 0.74215,
        6: 0.74537,
        7: 0.74857,
        8: 0.75175,
        9: 0.7549,
      },
      0.7: {
        0: 0.75804,
        1: 0.76115,
        2: 0.76424,
        3: 0.7673,
        4: 0.77035,
        5: 0.77337,
        6: 0.77637,
        7: 0.77935,
        8: 0.7823,
        9: 0.78524,
      },
      0.8: {
        0: 0.78814,
        1: 0.79103,
        2: 0.79389,
        3: 0.79673,
        4: 0.79955,
        5: 0.80234,
        6: 0.80511,
        7: 0.80785,
        8: 0.81057,
        9: 0.81327,
      },
      0.9: {
        0: 0.81594,
        1: 0.81859,
        2: 0.82121,
        3: 0.82381,
        4: 0.82639,
        5: 0.82894,
        6: 0.83147,
        7: 0.83398,
        8: 0.83646,
        9: 0.83891,
      },
      "1.0": {
        0: 0.84134,
        1: 0.84375,
        2: 0.84614,
        3: 0.84849,
        4: 0.85083,
        5: 0.85314,
        6: 0.85543,
        7: 0.85769,
        8: 0.85993,
        9: 0.86214,
      },
      1.1: {
        0: 0.86433,
        1: 0.8665,
        2: 0.86864,
        3: 0.87076,
        4: 0.87286,
        5: 0.87493,
        6: 0.87698,
        7: 0.879,
        8: 0.881,
        9: 0.88298,
      },
      1.2: {
        0: 0.88493,
        1: 0.88686,
        2: 0.88877,
        3: 0.89065,
        4: 0.89251,
        5: 0.89435,
        6: 0.89617,
        7: 0.89796,
        8: 0.89973,
        9: 0.90147,
      },
      1.3: {
        0: 0.9032,
        1: 0.9049,
        2: 0.90658,
        3: 0.90824,
        4: 0.90988,
        5: 0.91149,
        6: 0.91308,
        7: 0.91466,
        8: 0.91621,
        9: 0.91774,
      },
      1.4: {
        0: 0.91924,
        1: 0.92073,
        2: 0.9222,
        3: 0.92364,
        4: 0.92507,
        5: 0.92647,
        6: 0.92785,
        7: 0.92922,
        8: 0.93056,
        9: 0.93189,
      },
      1.5: {
        0: 0.93319,
        1: 0.93448,
        2: 0.93574,
        3: 0.93699,
        4: 0.93822,
        5: 0.93943,
        6: 0.94062,
        7: 0.94179,
        8: 0.94295,
        9: 0.94408,
      },
      1.6: {
        0: 0.9452,
        1: 0.9463,
        2: 0.94738,
        3: 0.94845,
        4: 0.9495,
        5: 0.95053,
        6: 0.95154,
        7: 0.95254,
        8: 0.95352,
        9: 0.95449,
      },
      1.7: {
        0: 0.95543,
        1: 0.95637,
        2: 0.95728,
        3: 0.95818,
        4: 0.95907,
        5: 0.95994,
        6: 0.9608,
        7: 0.96164,
        8: 0.96246,
        9: 0.96327,
      },
      1.8: {
        0: 0.96407,
        1: 0.96485,
        2: 0.96562,
        3: 0.96638,
        4: 0.96712,
        5: 0.96784,
        6: 0.96856,
        7: 0.96926,
        8: 0.96995,
        9: 0.97062,
      },
      1.9: {
        0: 0.97128,
        1: 0.97193,
        2: 0.97257,
        3: 0.9732,
        4: 0.97381,
        5: 0.97441,
        6: 0.975,
        7: 0.97558,
        8: 0.97615,
        9: 0.9767,
      },
      "2.0": {
        0: 0.97725,
        1: 0.97778,
        2: 0.97831,
        3: 0.97882,
        4: 0.97932,
        5: 0.97982,
        6: 0.9803,
        7: 0.98077,
        8: 0.98124,
        9: 0.98169,
      },
      2.1: {
        0: 0.98214,
        1: 0.98257,
        2: 0.983,
        3: 0.98341,
        4: 0.98382,
        5: 0.98422,
        6: 0.98461,
        7: 0.985,
        8: 0.98537,
        9: 0.98574,
      },
      2.2: {
        0: 0.9861,
        1: 0.98645,
        2: 0.98679,
        3: 0.98713,
        4: 0.98745,
        5: 0.98778,
        6: 0.98809,
        7: 0.9884,
        8: 0.9887,
        9: 0.98899,
      },
      2.3: {
        0: 0.98928,
        1: 0.98956,
        2: 0.98983,
        3: 0.9901,
        4: 0.99036,
        5: 0.99061,
        6: 0.99086,
        7: 0.99111,
        8: 0.99134,
        9: 0.99158,
      },
      2.4: {
        0: 0.9918,
        1: 0.99202,
        2: 0.99224,
        3: 0.99245,
        4: 0.99266,
        5: 0.99286,
        6: 0.99305,
        7: 0.99324,
        8: 0.99343,
        9: 0.99361,
      },
      2.5: {
        0: 0.99379,
        1: 0.99396,
        2: 0.99413,
        3: 0.9943,
        4: 0.99446,
        5: 0.99461,
        6: 0.99477,
        7: 0.99492,
        8: 0.99506,
        9: 0.9952,
      },
      2.6: {
        0: 0.99534,
        1: 0.99547,
        2: 0.9956,
        3: 0.99573,
        4: 0.99585,
        5: 0.99598,
        6: 0.99609,
        7: 0.99621,
        8: 0.99632,
        9: 0.99643,
      },
      2.7: {
        0: 0.99653,
        1: 0.99664,
        2: 0.99674,
        3: 0.99683,
        4: 0.99693,
        5: 0.99702,
        6: 0.99711,
        7: 0.9972,
        8: 0.99728,
        9: 0.99736,
      },
      2.8: {
        0: 0.99744,
        1: 0.99752,
        2: 0.9976,
        3: 0.99767,
        4: 0.99774,
        5: 0.99781,
        6: 0.99788,
        7: 0.99795,
        8: 0.99801,
        9: 0.99807,
      },
      2.9: {
        0: 0.99813,
        1: 0.99819,
        2: 0.99825,
        3: 0.99831,
        4: 0.99836,
        5: 0.99841,
        6: 0.99846,
        7: 0.99851,
        8: 0.99856,
        9: 0.99861,
      },
      "3.0": {
        0: 0.99865,
        1: 0.99869,
        2: 0.99874,
        3: 0.99878,
        4: 0.99882,
        5: 0.99886,
        6: 0.99889,
        7: 0.99893,
        8: 0.99896,
        9: 0.999,
      },
      3.1: {
        0: 0.99903,
        1: 0.99906,
        2: 0.9991,
        3: 0.99913,
        4: 0.99916,
        5: 0.99918,
        6: 0.99921,
        7: 0.99924,
        8: 0.99926,
        9: 0.99929,
      },
      3.2: {
        0: 0.99931,
        1: 0.99934,
        2: 0.99936,
        3: 0.99938,
        4: 0.9994,
        5: 0.99942,
        6: 0.99944,
        7: 0.99946,
        8: 0.99948,
        9: 0.9995,
      },
      3.3: {
        0: 0.99952,
        1: 0.99953,
        2: 0.99955,
        3: 0.99957,
        4: 0.99958,
        5: 0.9996,
        6: 0.99961,
        7: 0.99962,
        8: 0.99964,
        9: 0.99965,
      },
      3.4: {
        0: 0.99966,
        1: 0.99968,
        2: 0.99969,
        3: 0.9997,
        4: 0.99971,
        5: 0.99972,
        6: 0.99973,
        7: 0.99974,
        8: 0.99975,
        9: 0.99976,
      },
      3.5: {
        0: 0.99977,
        1: 0.99978,
        2: 0.99978,
        3: 0.99979,
        4: 0.9998,
        5: 0.99981,
        6: 0.99981,
        7: 0.99982,
        8: 0.99983,
        9: 0.99983,
      },
      3.6: {
        0: 0.99984,
        1: 0.99985,
        2: 0.99985,
        3: 0.99986,
        4: 0.99986,
        5: 0.99987,
        6: 0.99987,
        7: 0.99988,
        8: 0.99988,
        9: 0.99989,
      },
      3.7: {
        0: 0.99989,
        1: 0.9999,
        2: 0.9999,
        3: 0.9999,
        4: 0.99991,
        5: 0.99991,
        6: 0.99992,
        7: 0.99992,
        8: 0.99992,
        9: 0.99992,
      },
      3.8: {
        0: 0.99993,
        1: 0.99993,
        2: 0.99993,
        3: 0.99994,
        4: 0.99994,
        5: 0.99994,
        6: 0.99994,
        7: 0.99995,
        8: 0.99995,
        9: 0.99995,
      },
      3.9: {
        0: 0.99995,
        1: 0.99995,
        2: 0.99996,
        3: 0.99996,
        4: 0.99996,
        5: 0.99996,
        6: 0.99996,
        7: 0.99996,
        8: 0.99997,
        9: 0.99997,
      },
      "4.0": {
        0: 0.99997,
        1: 0.99997,
        2: 0.99997,
        3: 0.99997,
        4: 0.99997,
        5: 0.99997,
        6: 0.99998,
        7: 0.99998,
        8: 0.99998,
        9: 0.99998,
      },
    };
    const result = {};
    // Helper function to check if value is numeric
    const isNumeric = (val) => !isNaN(parseFloat(val)) && isFinite(val);
    // Helper function to get Z-URL
    const getZUrl = (rz) => {
      if (rz < -0.126 && rz > -0.376) return "z_score_-0.25";
      if (rz < -0.375 && rz > -0.626) return "z_score_-0.5";
      if (rz < -0.625 && rz > -0.876) return "z_score_-0.75";
      if (rz < -0.875 && rz > -1.126) return "z_score_-1";
      if (rz < -1.125 && rz > -1.376) return "z_score_-1.25";
      if (rz < -1.375 && rz > -1.626) return "z_score_-1.5";
      if (rz < -1.625 && rz > -1.876) return "z_score_-1.75";
      if (rz < -1.875 && rz > -2.126) return "z_score_-2";
      if (rz < -2.125 && rz > -2.376) return "z_score_-2.25";
      if (rz < -2.375 && rz > -2.626) return "z_score_-2.5";
      if (rz < -2.625 && rz > -2.876) return "z_score_-2.75";
      if (rz < -2.875 && rz > -3.126) return "z_score_-3";
      if (rz < -3.125 && rz > -3.376) return "z_score_-3.25";
      if (rz < -3.375 && rz > -3.626) return "z_score_-3.5";
      if (rz < -3.625 && rz > -3.876) return "z_score_-3.75";
      if (rz < -3.875 && rz > -4.126) return "z_score_-4";
      if (rz < -4.125) return "z_score_-4.25";
      if (rz > -0.126 && rz < 0.125) return "z_score_0";
      if (rz > 0.124 && rz < 0.375) return "z_score_0.25";
      if (rz > 0.374 && rz < 0.625) return "z_score_0.5";
      if (rz > 0.624 && rz < 0.875) return "z_score_0.75";
      if (rz > 0.874 && rz < 1.125) return "z_score_1";
      if (rz > 1.124 && rz < 1.375) return "z_score_1.25";
      if (rz > 1.374 && rz < 1.625) return "z_score_1.5";
      if (rz > 1.624 && rz < 1.875) return "z_score_1.75";
      if (rz > 1.874 && rz < 2.125) return "z_score_2";
      if (rz > 2.124 && rz < 2.375) return "z_score_2.25";
      if (rz > 2.374 && rz < 2.625) return "z_score_2.5";
      if (rz > 2.624 && rz < 2.875) return "z_score_2.75";
      if (rz > 2.874 && rz < 3.125) return "z_score_3";
      if (rz > 3.124 && rz < 3.375) return "z_score_3.25";
      if (rz > 3.374 && rz < 3.625) return "z_score_3.5";
      if (rz > 3.624 && rz < 3.875) return "z_score_3.75";
      if (rz > 3.874 && rz < 4.125) return "z_score_4";
      if (rz > 4.124) return "z_score_4.25";
    };
    // Calculate for 'dp' (Data Point)
    if (body.tech_to_calculate == "dp") {
      if (
        isNumeric(body.tech_dsvalue) &&
        isNumeric(body.tech_pmvalue) &&
        isNumeric(body.tech_psdvalue)
      ) {
        const x = parseFloat(body.tech_dsvalue);
        const u = parseFloat(body.tech_pmvalue);
        const o = parseFloat(body.tech_psdvalue);
        const ms = x - u;
        let rz = (x - u) / o;

        const rzStr = rz.toString();
        const rzCheck = rzStr.split("");
        let rzVal1, rzVal2;

        if (rzCheck.length > 1) {
          if (rz < 0) {
            if (rzCheck.length === 2) {
              rzVal1 = `${rzCheck[0]}${rzCheck[1]}.0`;
              rzVal2 = 0;
            } else {
              if (rzStr.length > 3) {
                rzVal1 = `${rzCheck[0]}${rzCheck[1]}${rzCheck[2]}${rzCheck[3]}`;
              }
              if (rzStr.length > 4) {
                rzVal2 = parseInt(rzCheck[4]);
              } else {
                rzVal2 = 0;
              }
            }
          } else {
            if (rzStr.length > 2) {
              rzVal1 = `${rzCheck[0]}${rzCheck[1]}${rzCheck[2]}`;
            }
            if (rzStr.length > 3) {
              rzVal2 = parseInt(rzCheck[3]);
            } else {
              rzVal2 = 0;
            }
          }
        } else {
          rzVal1 = `${rzCheck[0]}.0`;
          rzVal2 = 0;
        }

        let ltpv, rtpv;

        if (rz >= 4.1) {
          ltpv = 1;
          rtpv = 0;
        } else if (rz <= -4.1) {
          ltpv = 0;
          rtpv = 1;
        } else {
          ltpv = parseFloat((z_table[rzVal1]?.[rzVal2] || 0).toFixed(5));
          rtpv = parseFloat((1 - ltpv).toFixed(5));
        }

        const ttcl = ltpv - rtpv;
        const ttpv = 1 - Math.abs(ttcl);
        const zUrl = getZUrl(rz);

        result.tech_z_url = zUrl;
        result.tech_ltpv = Math.abs(ltpv);
        result.tech_rtpv = Math.abs(rtpv);
        result.tech_ttpv = Math.abs(ttpv);
        result.tech_ttcl = Math.abs(ttcl);
        result.tech_ms = ms;
        result.tech_rz = parseFloat(rz.toFixed(4));
        return result;
      } else {
        result.error = "Please fill all fields.";
        return result;
      }
    }
    // Calculate for 'sm' (Sample Mean)
    if (body.tech_to_calculate == "sm") {
      if (
        isNumeric(body.tech_snvalue) &&
        isNumeric(body.tech_pmvalue) &&
        isNumeric(body.tech_psdvalue) &&
        isNumeric(body.tech_smvalue)
      ) {
        const x = parseFloat(body.tech_smvalue);
        const n = parseFloat(body.tech_snvalue);
        const u = parseFloat(body.tech_pmvalue);
        const o = parseFloat(body.tech_psdvalue);
        const rz = (x - u) / (o / Math.sqrt(n));
        const ms = x - u;
        const sq = Math.sqrt(n);
        const mv = o / sq;

        result.tech_ms = ms;
        result.tech_mv = mv;
        result.tech_sq = sq;
        result.tech_rz = parseFloat(rz.toFixed(4));
        return result;
      } else {
        result.error = "Please fill all fields.";
        return result;
      }
    }
    // Calculate for 'ds' (Data Set)
    if (body.tech_to_calculate == "ds") {
      let check = true;

      if (!body.tech_x || !body.tech_pmvalue || !body.tech_psdvalue) {
        check = false;
      }

      const numbers = body.tech_x
        .split(",")
        .map((val) => val.trim())
        .filter((val) => val !== "");

      for (const value of numbers) {
        if (!isNumeric(value)) {
          check = false;
          break;
        }
      }

      if (check === true) {
        const n = numbers.length;
        const arr = numbers.map((val) => parseFloat(val));
        const sum = arr.reduce((acc, val) => acc + val, 0);
        const avg = sum / n;
        const u = parseFloat(body.tech_pmvalue);
        const o = parseFloat(body.tech_psdvalue);
        const rz = (avg - u) / (o / Math.sqrt(n));

        let a = "";
        arr.forEach((value, index) => {
          if (index !== arr.length - 1) {
            a += ` ${value} +`;
          } else {
            a += ` ${value} `;
          }
        });

        const sm = avg - u;
        const sq = Math.sqrt(n);
        const dv = o / sq;

        result.tech_avg = avg;
        result.tech_n = n;
        result.tech_a = a;
        result.tech_sum = sum;
        result.tech_sm = sm;
        result.tech_sq = sq;
        result.tech_dv = dv;
        result.tech_rz = parseFloat(rz.toFixed(4));
        return result;
      } else {
        result.error = "Please fill all fields.";
        return result;
      }
    }
    // Calculate for 'p' (P-Value)
    if (body.tech_to_calculate == "p") {
      if (isNumeric(body.tech_pvalue)) {
        const pva = parseFloat(body.tech_pvalue);

        if (pva > 0 && pva < 1) {
          result.tech_pva = pva;
          return result;
        } else {
          result.error = "Please Input value from 0 to 1.";
          return result;
        }
      } else {
        result.error = "Please Put P Value.";
        return result;
      }
    }
    return result;
  }
  /** getCalculationStandardErrorCalculator
   * POST: /api/calculators-lol/standard-error-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationStandardErrorCalculator(body) {
    let form = body.tech_form;
    let x = body.tech_x;
    let pmvalue = body.tech_pmvalue;
    let psdvalue = body.tech_psdvalue;
    let deviation = body.tech_deviation;
    let sample = body.tech_sample;

    let param = {};

    if (form === "raw") {
      let check = true;

      if (!x && !pmvalue && !psdvalue) {
        check = false;
      }

      if (x) {
        x = x.replace(/[\s,\n\r]+/g, ",");
        while (x.includes(",,")) {
          x = x.replace(",,", ",");
        }

        let numbers = x
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s !== "");

        for (let val of numbers) {
          if (isNaN(val)) {
            check = false;
            break;
          }
        }

        if (check) {
          numbers = numbers.map(Number);
          let count = numbers.length;
          let sum = numbers.reduce((a, b) => a + b, 0);
          let mean = sum / count;

          let arr1 = [];
          let v = "",
            v1 = "",
            v3 = "";

          for (let i = 0; i < numbers.length; i++) {
            let a = numbers[i] - mean;
            let b = Math.pow(a, 2);
            arr1.push(b);

            if (i !== numbers.length - 1) {
              v3 += ` ${b} +`;
              v1 += ` (${numbers[i]} - ${mean})² + `;
              v += ` (${a})² +`;
            } else {
              v3 += ` ${b} `;
              v1 += ` (${numbers[i]} - ${mean})² `;
              v += ` (${a})² `;
            }
          }

          let c = arr1.reduce((a, b) => a + b, 0);
          let v2 = count - 1;
          let v4 = 1 / v2;
          let v5 = v4 * c;
          let v6 = Math.sqrt(count);
          let d = Math.sqrt((1 / (count - 1)) * c);
          let e = Math.round(d * 10000) / 10000;
          let rv = Math.round(Math.sqrt(v5) * 10000) / 10000;
          let v7 = Math.round((e / v6) * 10000) / 10000;
          let se = Math.round((d / Math.sqrt(count)) * 10000) / 10000;

          param = {
            tech_count: count,
            tech_sum: sum,
            tech_mean: mean,
            tech_e: e,
            tech_se: se,
            tech_v: v,
            tech_v1: v1,
            tech_v2: v2,
            tech_v3: v3,
            tech_c: c,
            tech_v4: v4,
            tech_v5: v5,
            tech_rv: rv,
            tech_v6: v6,
            tech_v7: v7,
            tech_form: form,
          };
          return param;
        } else {
          return { error: "Please Input Some Values." };
        }
      }
    }

    if (form === "summary") {
      if (!isNaN(deviation) && !isNaN(sample)) {
        let sn = Math.round(Math.sqrt(sample) * 10000) / 10000;
        let se = Math.round((deviation / sn) * 10000) / 10000;

        param = {
          tech_se: se,
          tech_sn: sn,
          tech_form: form,
        };
        return param;
      } else {
        return { error: "Please! Check Your Input" };
      }
    }
  }

  /** getCalculationExpectedValueCalculator
   * POST: /api/calculators-lol/expected-value-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationExpectedValueCalculator(body) {
    let check = body.tech_check;
    let param = {};

    if (check === "txtar") {
      let xx = body.tech_xx;
      let px = body.tech_px;

      let valid = true;

      if (
        !Array.isArray(xx) ||
        !Array.isArray(px) ||
        xx.length === 0 ||
        px.length === 0
      ) {
        valid = false;
      }

      if (valid) {
        for (let val of xx) {
          if (isNaN(val)) valid = false;
        }
        for (let val of px) {
          if (isNaN(val)) valid = false;
        }
      }

      if (!valid) {
        return { error: "Please fill all fields." };
      }

      let n = xx.length;
      let n1 = px.length;
      let pxSum = parseFloat(
        px.reduce((a, b) => a + parseFloat(b), 0).toFixed(1)
      );

      if (n !== n1) {
        return { error: "X and P(X) must have same number of elements." };
      }
      if (pxSum !== 1) {
        return { error: "The sum of P(X) must be 1." };
      }

      let res = [];
      let show_res = "";
      let show_res1 = "";
      let txt = [];

      for (let i = 0; i < n; i++) {
        let val = parseFloat(xx[i]);
        let val1 = parseFloat(px[i]);
        let product = val * val1;
        res.push(product);

        let plus = i + 1 === n ? "" : "+";
        show_res += `( ${val} ) * ( ${val1} )${plus}`;
        show_res1 += `( ${product} )${plus}`;

        txt[i] = `
            <tr class='bg-white'>
              <td class='border p-2'>${val}</td>
              <td class='border p-2'>${val1}</td>
              <td class='border p-2'>${product}</td>
            </tr>
          `;
        param["show_val" + i] = txt[i];
      }

      let sum1 = xx.reduce((a, b) => a + parseFloat(b), 0);
      let sum2 = px.reduce((a, b) => a + parseFloat(b), 0);
      let ress = res.reduce((a, b) => a + b, 0);

      param["tech_show_res"] = show_res;
      param["tech_show_res1"] = show_res1;
      param["tech_sum1"] = sum1;
      param["tech_sum2"] = sum2;
      param["tech_ress"] = ress;

      return param;
    } else if (check === "table") {
      let td_value = parseInt(body.tech_td_value);
      let numbers = [];
      let numbers1 = [];

      for (let i = 1; i < td_value; i++) {
        let aKey = `a${i}`;
        let bKey = `b${i}`;
        let aVal = parseFloat(body[aKey]);
        let bVal = parseFloat(body[bKey]);

        if (!isNaN(aVal)) numbers.push(aVal);
        if (!isNaN(bVal)) numbers1.push(bVal);
      }

      let n = numbers.length;
      let n1 = numbers1.length;

      if (n !== n1) {
        return { error: "X and P(X) must have same number of elements." };
      }

      let pxSum = numbers1.reduce((a, b) => a + b, 0);
      if (pxSum !== 1) {
        return { error: "The sum of P(X) must be 1." };
      }

      let res = [];
      let show_res = "";
      let show_res1 = "";
      let txt = [];

      for (let i = 0; i < n; i++) {
        let val = numbers[i];
        let val1 = numbers1[i];
        let product = val * val1;
        res.push(product);

        let plus = i + 1 === n ? "" : "+";
        show_res += `( ${val} ) * ( ${val1} )${plus}`;
        show_res1 += `( ${product} )${plus}`;

        txt[i] = `
            <tr class='bg-white'>
              <td class='border p-2'>${val}</td>
              <td class='border p-2'>${val1}</td>
              <td class='border p-2'>${product}</td>
            </tr>
          `;
        param["show_val" + i] = txt[i];
      }

      let sum1 = numbers.reduce((a, b) => a + b, 0);
      let sum2 = numbers1.reduce((a, b) => a + b, 0);
      let ress = res.reduce((a, b) => a + b, 0);

      param["tech_show_res"] = show_res;
      param["tech_show_res1"] = show_res1;
      param["tech_sum1"] = sum1;
      param["tech_sum2"] = sum2;
      param["tech_ress"] = ress;

      return param;
    } else {
      return { error: "Please fill all fields." };
    }
  }
  /** getCalculationMadCalculator
   * POST: /api/calculators-lol/mad-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationMadCalculator(body) {
    let x = body.tech_x;
    let method = parseInt(body.tech_method);
    let m = parseFloat(body.tech_m);
    let data = [];
    let response = {};

    if (x) {
      x = x.replace(/[\s,\n\r]+/g, ","); // Normalize to single commas
      while (x.includes(",,")) x = x.replace(",,", ",");
      data = x
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s !== "");

      if (!data.every((v) => !isNaN(v))) {
        response.error = "Please! Check Your Input";
        return response;
      }

      data = data.map(Number);
      response.tech_x = x;
      response.tech_m = m;

      if (method === 0) {
        let sum = data.reduce((a, b) => a + b, 0);
        let n = data.length;
        let mean = sum / n;
        let diff = data.map((v) => Math.abs(mean - v));
        let sum1 = diff.reduce((a, b) => a + b, 0);
        let mad = sum1 / n;

        response.tech_n = n;
        response.tech_diff = diff;
        response.tech_sum1 = sum1;
        response.tech_mean = mean;
        response.tech_method = method;
        response.tech_mad = parseFloat(mad.toFixed(1));
        return response;
      } else if (method === 1) {
        data.sort((a, b) => a - b);
        let n = data.length;
        let median =
          n % 2 !== 0
            ? data[Math.floor(n / 2)]
            : (data[n / 2] + data[n / 2 - 1]) / 2;

        response.tech_median = median;

        let diff = data.map((v) => Math.abs(median - v));
        response.tech_diff = diff;

        diff.sort((a, b) => a - b);
        let n1 = diff.length;
        let median1 =
          n1 % 2 !== 0
            ? diff[Math.floor(n1 / 2)]
            : (diff[n1 / 2] + diff[n1 / 2 - 1]) / 2;

        response.tech_diff1 = diff;
        response.tech_mad = parseFloat(median1.toFixed(1));
        response.tech_method = method;
        return response;
      } else {
        let n = data.length;
        let diff = data.map((v) => Math.abs(m - v));
        let sum = diff.reduce((a, b) => a + b, 0);
        let mad = sum / n;

        response.tech_diff = diff;
        response.tech_sum = sum;
        response.tech_mad = parseFloat(mad.toFixed(1));
        response.tech_method = method;
        return response;
      }
    } else {
      response.error = "Please! Check Your Input";
      return response;
    }
  }

  /** getCalculationCombinationCalculator
   * POST: /api/calculators-lol/combination-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationCombinationCalculator(body) {
    const result = {};

    try {
      let n = BigInt(body.tech_n);
      let r = BigInt(body.tech_r);

      if (n > 999999n) {
        result.error = "n must be less than or equal to 999999";
        return result;
      }

      if (n < r) {
        result.error = "n must be greater than r";
        return result;
      }
      function factorial(n) {
        let result = 1n;
        for (let i = 2n; i <= n; i++) {
          result *= i;
        }
        return result;
      }
      const nMinusR = n - r;

      const factn = factorial(n);
      const factr = factorial(r);
      const factnr = factorial(nMinusR);

      const rnr = factr * factnr;
      const answer = factn / rnr;

      // Manually build all responses with string-safe versions
      result["tech_resans"] = answer.toString();
      result[
        "tech_step2res"
      ] = `= ${n.toString()}! / (${r.toString()}!(${nMinusR.toString()})!)`;
      result[
        "tech_step3res"
      ] = `= ${n.toString()}! / ${r.toString()}! x ${nMinusR.toString()}!`;
      result["tech_nans"] = n.toString();
      result["tech_rans"] = r.toString();

      return result;
    } catch (err) {
      return {
        error: "Invalid input or internal error.",
        details: err.message,
      };
    }
  }

  /** getCalculationPermutationCalculator
   * POST: /api/calculators-lol/permutation-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationPermutationCalculator(body) {
    let n = parseInt(body.tech_n);
    let r = parseInt(body.tech_r);
    let find = body.tech_find;

    let response = {};

    if (!isNaN(n) && !isNaN(r)) {
      response.tech_n = n;
      response.tech_r = r;
      response.tech_find = find;

      if (r <= n) {
        let n_fact = factorial(n);
        let r_fact = factorial(r);
        let nr = n - r;
        let nr_fact = factorial(nr);
        let nr_fact_prod = r_fact * nr_fact;

        let nr1 = n + r - 1;
        let nr1_fact = factorial(nr1);
        let n1 = n - 1;
        let n1_fact = factorial(n1);
        let nr1_fact_prod = r_fact * n1_fact;

        let comb = n_fact / nr_fact_prod;
        let perm = n_fact / nr_fact;
        let comb_rep = nr1_fact / nr1_fact_prod;
        let perm_rep = Math.pow(n, r);

        if (find === "2") {
          response.tech_perms = "perms";
        } else {
          response.tech_p_w_r = "p_w_r";
        }

        // Step 1 string
        let s1 = Array.from({ length: n }, (_, i) => i + 1).join(" * ");

        // Step 2 string
        let s2 = Array.from({ length: nr }, (_, i) => i + 1).join(" * ");

        response.tech_comb = comb;
        response.tech_perm = perm;
        response.tech_s1 = s1;
        response.tech_s2 = s2;
        response.tech_nr = nr;
        response.tech_n_fact = n_fact;
        response.tech_r_fact = r_fact;
        response.tech_nr_fact = nr_fact;
        response.tech_comb_rep = comb_rep;
        response.tech_perm_rep = perm_rep;

        if (n < 101) {
          response.tech_show_steps = "show_steps";
        }

        return response;
      } else {
        response.error = "r needs to be less than or equal to n";
        return response;
      }
    } else {
      response.error = "Please! Check Your Input";
      return response;
    }
  }

  /** getCalculationStandardDeviationCalculator
   * POST: /api/calculators-lol/standard-deviation-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationStandardDeviationCalculator(body) {
    let stdv_txt = body.tech_stdv_txt;
    let stdv_rad = body.tech_stdv_rad;

    function sanitize(input) {
      return String(input).trim().replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    stdv_txt = sanitize(stdv_txt);
    stdv_txt = stdv_txt.replace(/\s+/g, " ");
    stdv_rad = sanitize(stdv_rad);

    let check = true;

    if (!stdv_txt) check = false;

    stdv_txt = stdv_txt.replace(/[ ,\n\r]+/g, ",");
    while (stdv_txt.includes(",,")) stdv_txt = stdv_txt.replace(/,,/g, ",");

    let dataArr = stdv_txt
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s !== "")
      .map(Number);

    for (const value of dataArr) {
      if (isNaN(value)) check = false;
    }

    if (dataArr.length < 2) check = false;

    if (!check) {
      return { error: "Please! Check Your Input" };
    }

    const n = dataArr.length;
    const sum = dataArr.reduce((a, b) => a + b, 0);
    const mean = parseFloat((sum / n).toFixed(3));

    let sumSquaredDiff = 0;
    for (const value of dataArr) {
      sumSquaredDiff += Math.pow(value - mean, 2);
    }

    const mSym = stdv_rad === "population" ? "μ" : "x̄";
    const divisor = stdv_rad === "population" ? n : n - 1;
    const stdDev = parseFloat(Math.sqrt(sumSquaredDiff / divisor).toFixed(4));

    const variance = parseFloat(Math.pow(stdDev, 2).toFixed(2));
    const coefOfVar = parseFloat((stdDev / mean).toFixed(4));
    const stdErr = parseFloat((stdDev / Math.sqrt(n)).toFixed(4));

    let table = `<table class='w-full text-[18px]' style='border-collapse: collapse'><thead><tr class='bg-gray-100'><th class='border p-2 text-center text-blue'>xᵢ</th><th class='border p-2 text-center text-blue'>xᵢ - ${mSym}</th><th class='border p-2 text-center text-blue'>(xᵢ - ${mSym})²</th></tr></thead><tbody>`;
    let sumSq = 0;
    let frequencyMap = {};

    for (const val of dataArr) {
      const diff = val - mean;
      const squared = Math.pow(diff, 2);
      table += `<tr class='bg-white'><td class='border p-2 text-center'>${val}</td><td class='border p-2 text-center'>${diff.toFixed(
        3
      )}</td><td class='border p-2 text-center'>${squared.toFixed(
        3
      )}</td></tr>`;
      sumSq += squared;
      frequencyMap[val] = (frequencyMap[val] || 0) + 1;
    }

    table += `<tr class='bg-gray-100'><th class='border p-2 text-center text-blue'>Σxᵢ = ${sum}</th><th class='p-2 border'></th><th class='border p-2 text-center text-blue'>Σ(xᵢ - ${mSym})² = ${sumSq.toFixed(
      3
    )}</th></tr></tbody></table>`;

    let tablef = "";
    for (const [key, value] of Object.entries(frequencyMap)) {
      tablef += `<tr><td class='py-2 border-b'>${key}</td><td class='py-2 border-b'>${value} (${(
        (100 / n) *
        value
      ).toFixed(2)}%)</td></tr>`;
    }

    return {
      tech_put: (n / 100) * (1 - n / 100),
      tech_i: n,
      tech_mor: stdErr,
      tech_d: stdDev,
      tech_m: mean,
      tech_c: coefOfVar,
      tech_t_n: n,
      tech_v_2: variance,
      tech_sum: sum,
      tech_s_e: stdErr,
      tech_table: table,
      tech_tablef: tablef,
      tech_ar_sum: sumSq.toFixed(3),
      tech_stdv_rad: stdv_rad,
    };
  }

  /** getCalculationFiveNumberSummaryCalculator
   * POST: /api/calculators-lol/5-five-number-summary-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationFiveNumberSummaryCalculator(body) {
    let seprateby = body.tech_seprateby;
    let textarea = body.tech_textarea;

    if (!textarea || textarea.trim() === "") {
      return { error: "Please! Check Your Input" };
    }

    seprateby = seprateby === "space" ? " " : seprateby;
    let values = textarea
      .split(seprateby)
      .map((v) => v.trim())
      .filter((v) => v !== "");

    let isNumeric = values.every((val) => !isNaN(val));
    if (!isNumeric) {
      return { error: "Please! Check Your Input" };
    }

    values = values.map(Number).sort((a, b) => a - b);

    if (values.length < 2) {
      return { error: "Please! enter 2 or more numbers" };
    }

    let count = values.length;
    let a1 = values[0];
    let a2 = values[count - 1];

    const quartile = (arr) => {
      let sorted = [...arr].sort((a, b) => a - b);
      let mid = Math.floor((sorted.length - 1) / 2);
      if (sorted.length % 2) {
        return Number(sorted[mid].toFixed(1));
      } else {
        return Number(((sorted[mid] + sorted[mid + 1]) / 2).toFixed(1));
      }
    };

    let second = quartile(values);
    let tmp = { first: [], third: [] };
    values.forEach((val) => {
      if (val < second) tmp.first.push(val);
      else if (val > second) tmp.third.push(val);
    });

    let first = quartile(tmp.first);
    let third = quartile(tmp.third);
    let min = Math.min(...values);
    let max = Math.max(...values);
    let iter = third - first;
    let sum = values.reduce((acc, cur) => acc + cur, 0);
    let average = Number((sum / count).toFixed(4));

    let median;
    if (count % 2 !== 0) {
      median = values[Math.floor(count / 2)];
    } else {
      median = (values[count / 2 - 1] + values[count / 2]) / 2;
    }

    let freqMap = {};
    values.forEach((val) => {
      freqMap[val] = (freqMap[val] || 0) + 1;
    });

    let maxFreq = Math.max(...Object.values(freqMap));
    let mode = Object.keys(freqMap)
      .filter((k) => freqMap[k] === maxFreq)
      .map(Number);

    let mean = sum / count;
    let d = values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
    let s_d_p = Math.sqrt(d / count).toFixed(4);
    let s_d_s = Math.sqrt(d / (count - 1)).toFixed(4);

    return {
      tech_a1: a1,
      tech_a2: a2,
      tech_min: min,
      tech_max: max,
      tech_first: first,
      tech_second: second,
      tech_third: third,
      tech_iter: iter,
      tech_mode: mode,
      tech_s_d_p: s_d_p,
      tech_s_d_s: s_d_s,
      tech_median: median,
      tech_average: average,
      tech_count: count,
      tech_numbers: values,
      tech_desc: [...values].sort((a, b) => b - a),
    };
  }

  /** getCalculationConfidenceIntervalCalculator
   * POST: /api/calculators-lol/confidence-interval-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationConfidenceIntervalCalculator(body) {
    let x = parseFloat(body.tech_x);
    let s = parseFloat(body.tech_s);
    let n = parseFloat(body.tech_n);
    let cl = parseFloat(body.tech_cl);
    let z = parseFloat(body.tech_z);

    if (!isNaN(x) && !isNaN(s) && !isNaN(n) && !isNaN(cl) && !isNaN(z)) {
      if (n < 1 || cl < 0 || cl > 99.99) {
        return { error: "Please! Check Your Input" };
      }

      const sigFig = (value, digits) => {
        if (value === 0) return 0;
        const d = digits - Math.floor(Math.log10(Math.abs(value))) - 1;
        return Number(value.toFixed(d));
      };

      let se = s / Math.sqrt(n);
      let moe = z * se;
      let ci1 = x - moe;
      let ci2 = x + moe;
      let ci = `${x} ± ${sigFig(moe, 4)}`;
      let rtpv = (100 - cl) / 2 / 100;

      return {
        tech_se: sigFig(se, 5),
        tech_ci: ci,
        tech_ci1: sigFig(ci1, 4),
        tech_ci2: sigFig(ci2, 4),
        tech_lb: sigFig(ci1, 6),
        tech_ub: sigFig(ci2, 6),
        tech_moe: sigFig(moe, 5),
        tech_rtpv: rtpv,
        tech_zscore: sigFig(z, 7),
      };
    } else {
      return { error: "Please! Fill All The Fields" };
    }
  }

  /** getCalculationCentralLimittheoremCalculator
   * POST: /api/calculators-lol/central-limit-theorem-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationCentralLimittheoremCalculator(body) {
    const result = {};

    let u = parseFloat(body.tech_u);
    let o = parseFloat(body.tech_o);
    let n = parseFloat(body.tech_n);

    if (!isNaN(u) && !isNaN(o) && !isNaN(n)) {
      let s1 = Math.sqrt(n);
      let s = o / s1;
      let x = u;

      result.tech_s = s;
      result.tech_x = x;
      result.tech_s1 = s1;
      result.tech_o = o;
      result.tech_n = n;
      result.tech_u = u;
      return result;
    } else {
      return {
        error: "Please! Check Your Input",
      };
    }
  }

  /** getCalculationVarianceCalculator
   * POST: /api/calculators-lol/variance-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationVarianceCalculator(body) {
    let cal_meth = body.tech_cal_meth;
    let set = body.tech_set;

    if (!set || !cal_meth) {
      return { error: "Please check your input." };
    }

    let check = true;
    set = set.replace(/[\n\r\s]+/g, ",").replace(/,+/g, ",");
    let setArray = set
      .split(",")
      .map((v) => v.trim())
      .filter((v) => v !== "")
      .map(Number);

    if (setArray.length < 2 || setArray.some(isNaN)) {
      return { error: "Please check your input." };
    }

    setArray.sort((a, b) => a - b);
    let array_set = [...setArray];
    let i = setArray.length;
    let sum = setArray.reduce((a, b) => a + b, 0);
    let mean = parseFloat((sum / i).toFixed(3));
    let d = setArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);

    let s_d, mSym;
    if (cal_meth === "population") {
      s_d = Math.sqrt(d / i);
      mSym = "μ";
    } else {
      s_d = Math.sqrt(d / (i - 1));
      mSym = "x̄";
    }

    s_d = parseFloat(s_d.toFixed(4));
    let variance = parseFloat((s_d ** 2).toFixed(2));
    let c_v = parseFloat((s_d / mean).toFixed(4));

    // Table creation (as HTML string)
    let ss = 0;
    let table = `<table class='w-full text-[18px]' style='border-collapse: collapse'><thead><tr class='bg-gray-100'><th class='border p-2 text-center text-blue'>xᵢ</th><th class='border p-2 text-center text-blue'>xᵢ - ${mSym}</th><th class='border p-2 text-center text-blue'>(xᵢ - ${mSym})²</th></tr></thead><tbody>`;

    for (let f = 0; f < i; f++) {
      let xi = setArray[f];
      let diff = xi - mean;
      let sq = Math.pow(diff, 2);
      ss += sq;
      table += `<tr class='bg-white'><td class='border p-2 text-center'>${xi}</td><td class='border p-2 text-center'>${diff.toFixed(
        3
      )}</td><td class='border p-2 text-center'>${sq.toFixed(3)}</td></tr>`;
    }

    table += `<tr class='bg-gray-100'><th class='border p-2 text-center text-blue'>Σxᵢ = ${sum}</th><th class='border p-2'></th><th class='border p-2 text-center text-blue'>Σ(xᵢ - ${mSym})² = ${ss.toFixed(
      3
    )}</th></tr></tbody></table>`;

    return {
      tech_var: variance,
      tech_mean: mean,
      tech_s_d: s_d,
      tech_c_v: c_v,
      tech_t_n: i,
      tech_sum: sum,
      tech_table: table,
      tech_ss: parseFloat(ss.toFixed(3)),
      tech_cal_meth: cal_meth,
      tech_set: setArray,
      tech_array_set: array_set,
    };
  }

  /** getCalculationCoefficientOfDeterminationCalculator
   * POST: /api/calculators-lol/coefficient-of-determination-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationCoefficientOfDeterminationCalculator(body) {
    let x = body.tech_x;
    let y = body.tech_y;

    // Clean and normalize the input
    x = x
      .replace(/[\s,\n\r]+/g, ",")
      .replace(/,+/g, ",")
      .trim();
    y = y
      .replace(/[\s,\n\r]+/g, ",")
      .replace(/,+/g, ",")
      .trim();

    if (!x || !y) {
      return { error: "Please check your input." };
    }

    let set1 = x
      .split(",")
      .map((v) => v.trim())
      .filter((v) => v !== "");
    let set2 = y
      .split(",")
      .map((v) => v.trim())
      .filter((v) => v !== "");

    if (set1.some(isNaN) || set2.some(isNaN) || set1.length !== set2.length) {
      return { error: "Please check your input." };
    }

    set1 = set1.map(Number);
    set2 = set2.map(Number);

    const n = set1.length;
    const sumx = set1.reduce((a, b) => a + b, 0);
    const sumy = set2.reduce((a, b) => a + b, 0);

    let table = `<table class='w-full text-[18px]' style='border-collapse: collapse'><thead><tr class='bg-gray-100'><th class='border p-2 text-center text-blue'>Obs.</th><th class='border p-2 text-center text-blue'>X</th><th class='border p-2 text-center text-blue'>Y</th><th class='border p-2 text-center text-blue'>Xᵢ²</th><th class='border p-2 text-center text-blue'>Yᵢ²</th><th class='border p-2 text-center text-blue'>Xᵢ⋅Yᵢ</th></tr></thead><tbody>`;

    let sumxi = 0,
      sumyi = 0,
      sumxy = 0;
    for (let i = 0; i < n; i++) {
      const xi2 = Math.pow(set1[i], 2);
      const yi2 = Math.pow(set2[i], 2);
      const xyi = set1[i] * set2[i];
      sumxi += xi2;
      sumyi += yi2;
      sumxy += xyi;

      table += `<tr class='bg-white'><td class='border p-2 text-center'>${
        i + 1
      }</td><td class='border p-2 text-center'>${
        set1[i]
      }</td><td class='border p-2 text-center'>${
        set2[i]
      }</td><td class='border p-2 text-center'>${xi2}</td><td class='border p-2 text-center'>${yi2}</td><td class='border p-2 text-center'>${xyi}</td></tr>`;
    }
    table += `<tr class='bg-gray-100'><th class='border p-2 text-center text-blue'>Sum = </th><th class='border p-2 text-center text-blue'>${sumx}</th><th class='border p-2 text-center text-blue'>${sumy}</th><th class='border p-2 text-center text-blue'>${sumxi}</th><th class='border p-2 text-center text-blue'>${sumyi}</th><th class='border p-2 text-center text-blue'>${sumxy}</th></tr></tbody></table>`;

    const sumx2 = Math.pow(sumx, 2);
    const sumy2 = Math.pow(sumy, 2);

    const ssxx = sumxi - (1 / n) * sumx2;
    const ssyy = sumyi - (1 / n) * sumy2;
    const ssxy = sumxy - (1 / n) * sumx * sumy;
    const r = ssxy / Math.sqrt(ssxx * ssyy);
    const r2 = Math.pow(r, 2);

    const meanx = sumx / n;
    const meany = sumy / n;

    let s1 = "",
      s2 = "",
      s3 = "",
      s_d = 0,
      s_d1 = 0;
    for (let i = 0; i < n; i++) {
      const dx = set1[i] - meanx;
      const dy = set2[i] - meany;

      s1 +=
        `(${set1[i]} - ${meanx.toFixed(4)})(${set2[i]} - ${meany.toFixed(4)})` +
        (i < n - 1 ? " + " : "");
      s2 += `(${dx.toFixed(4)}*${dy.toFixed(4)})` + (i < n - 1 ? " + " : "");
      s3 += `(${(dx * dy).toFixed(4)})` + (i < n - 1 ? " + " : "");

      s_d += dx * dx;
      s_d1 += dy * dy;
    }

    const stdx = Math.sqrt(s_d / (n - 1));
    const stdy = Math.sqrt(s_d1 / (n - 1));
    const s11 = (n - 1) * stdx * stdy;

    const delta = n * sumxi - sumx2;
    const a = (n * sumxy - sumx * sumy) / delta;
    const b = (sumxi * sumy - sumx * sumxy) / delta;

    let sst = 0,
      sst_table = `<table class='w-full text-[18px]' style='border-collapse: collapse'><thead><tr class='bg-gray-100'><th class='border p-2 text-center text-blue'>i</th><th class='border p-2 text-center text-blue'>yᵢ</th><th class='border p-2 text-center text-blue'>ȳ</th><th class='border p-2 text-center text-blue'>(yᵢ - ȳ)²</th></tr></thead><tbody>`;
    for (let i = 0; i < n; i++) {
      const diff = Math.pow(set2[i] - meany, 2);
      sst_table += `<tr class='bg-white'><td class='border p-2 text-center'>${i}</td><td class='border p-2 text-center'>${
        set2[i]
      }</td><td class='border p-2 text-center'>${meany.toFixed(
        4
      )}</td><td class='border p-2 text-center'>${diff.toFixed(4)}</td></tr>`;
      sst += diff;
    }
    sst_table += `</tbody></table>`;

    let ssr = 0,
      ssr_table = `<table class='w-full text-[18px]' style='border-collapse: collapse'><thead><tr class='bg-gray-100'><th class='border p-2 text-center text-blue'>i</th><th class='border p-2 text-center text-blue'>x̂ᵢ</th><th class='border p-2 text-center text-blue'>ȳ</th><th class='border p-2 text-center text-blue'>(x̂ᵢ - ȳ)²</th></tr></thead><tbody>`;
    for (let i = 0; i < n; i++) {
      const yhat = a * set1[i] + b;
      const diff = Math.pow(yhat - meany, 2);
      ssr_table += `<tr class='bg-white'><td class='border p-2 text-center'>${i}</td><td class='border p-2 text-center'>${yhat.toFixed(
        4
      )}</td><td class='border p-2 text-center'>${meany.toFixed(
        4
      )}</td><td class='border p-2 text-center'>${diff.toFixed(4)}</td></tr>`;
      ssr += diff;
    }
    ssr_table += `</tbody></table>`;

    let sse = 0,
      sse_table = `<table class='w-full text-[18px]' style='border-collapse: collapse'><thead><tr class='bg-gray-100'><th class='border p-2 text-center text-blue'>i</th><th class='border p-2 text-center text-blue'>yᵢ</th><th class='border p-2 text-center text-blue'>x̂ᵢ</th><th class='border p-2 text-center text-blue'>(yᵢ - x̂ᵢ)²</th></tr></thead><tbody>`;
    for (let i = 0; i < n; i++) {
      const yhat = a * set1[i] + b;
      const diff = Math.pow(set2[i] - yhat, 2);
      sse_table += `<tr class='bg-white'><td class='border p-2 text-center'>${i}</td><td class='border p-2 text-center'>${
        set2[i]
      }</td><td class='border p-2 text-center'>${yhat.toFixed(
        4
      )}</td><td class='border p-2 text-center'>${diff.toFixed(4)}</td></tr>`;
      sse += diff;
    }
    sse_table += `</tbody></table>`;

    return {
      tech_n: n,
      tech_r: r.toFixed(4),
      tech_r2: r2.toFixed(4),
      tech_sumx: sumx.toFixed(4),
      tech_sumy: sumy.toFixed(4),
      tech_sumxi: sumxi.toFixed(4),
      tech_sumyi: sumyi.toFixed(4),
      tech_sumxy: sumxy.toFixed(4),
      tech_sumx2: sumx2.toFixed(4),
      tech_sumy2: sumy2.toFixed(4),
      tech_ssxx: ssxx.toFixed(4),
      tech_ssyy: ssyy.toFixed(4),
      tech_ssxy: ssxy.toFixed(4),
      tech_s_d: stdx.toFixed(4),
      tech_s_d1: stdy.toFixed(4),
      tech_s1: s1,
      tech_s2: s2,
      tech_s3: s3,
      tech_s11: s11.toFixed(4),
      tech_meanx: meanx.toFixed(4),
      tech_meany: meany.toFixed(4),
      tech_table: table,
      tech_sst: sst.toFixed(4),
      tech_ssr: ssr.toFixed(4),
      tech_sse: sse.toFixed(4),
      tech_a: a.toFixed(2),
      tech_b: b.toFixed(2),
      tech_sst_table: sst_table,
      tech_ssr_table: ssr_table,
      tech_sse_table: sse_table,
    };
  }

  /** getCalculationPointEstimateCalculator
   * POST: /api/calculators-lol/point-estimate-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationPointEstimateCalculator(body) {
    let success = parseFloat(body.tech_success);
    let trials = parseFloat(body.tech_trials);
    let ci = parseFloat(body.tech_ci);
    let result = {};

    if (!isNaN(success) && !isNaN(trials) && !isNaN(ci)) {
      if (success <= trials) {
        const z_table = {
          "0.0": [
            0.5, 0.50399, 0.50798, 0.51197, 0.51595, 0.51994, 0.52392, 0.5279,
            0.53188, 0.53586,
          ],
          0.1: [
            0.5398, 0.5438, 0.54776, 0.55172, 0.55567, 0.55966, 0.5636, 0.56749,
            0.57142, 0.57535,
          ],
          0.2: [
            0.5793, 0.58317, 0.58706, 0.59095, 0.59483, 0.59871, 0.60257,
            0.60642, 0.61026, 0.61409,
          ],
          0.3: [
            0.61791, 0.62172, 0.62552, 0.6293, 0.63307, 0.63683, 0.64058,
            0.64431, 0.64803, 0.65173,
          ],
          0.4: [
            0.65542, 0.6591, 0.66276, 0.6664, 0.67003, 0.67364, 0.67724,
            0.68082, 0.68439, 0.68793,
          ],
          0.5: [
            0.69146, 0.69497, 0.69847, 0.70194, 0.7054, 0.70884, 0.71226,
            0.71566, 0.71904, 0.7224,
          ],
          0.6: [
            0.72575, 0.72907, 0.73237, 0.73565, 0.73891, 0.74215, 0.74537,
            0.74857, 0.75175, 0.7549,
          ],
          0.7: [
            0.75804, 0.76115, 0.76424, 0.7673, 0.77035, 0.77337, 0.77637,
            0.77935, 0.7823, 0.78524,
          ],
          0.8: [
            0.78814, 0.79103, 0.79389, 0.79673, 0.79955, 0.80234, 0.80511,
            0.80785, 0.81057, 0.81327,
          ],
          0.9: [
            0.81594, 0.81859, 0.82121, 0.82381, 0.82639, 0.82894, 0.83147,
            0.83398, 0.83646, 0.83891,
          ],
          "1.0": [
            0.84134, 0.84375, 0.84614, 0.84849, 0.85083, 0.85314, 0.85543,
            0.85769, 0.85993, 0.86214,
          ],
          1.1: [
            0.86433, 0.8665, 0.86864, 0.87076, 0.87286, 0.87493, 0.87698, 0.879,
            0.881, 0.88298,
          ],
          1.2: [
            0.88493, 0.88686, 0.88877, 0.89065, 0.89251, 0.89435, 0.89617,
            0.89796, 0.89973, 0.90147,
          ],
          1.3: [
            0.9032, 0.9049, 0.90658, 0.90824, 0.90988, 0.91149, 0.91308,
            0.91466, 0.91621, 0.91774,
          ],
          1.4: [
            0.91924, 0.92073, 0.9222, 0.92364, 0.92507, 0.92647, 0.92785,
            0.92922, 0.93056, 0.93189,
          ],
          1.5: [
            0.93319, 0.93448, 0.93574, 0.93699, 0.93822, 0.93943, 0.94062,
            0.94179, 0.94295, 0.94408,
          ],
          1.6: [
            0.9452, 0.9463, 0.94738, 0.94845, 0.9495, 0.95053, 0.95154, 0.95254,
            0.95352, 0.95449,
          ],
          1.7: [
            0.95543, 0.95637, 0.95728, 0.95818, 0.95907, 0.95994, 0.9608,
            0.96164, 0.96246, 0.96327,
          ],
          1.8: [
            0.96407, 0.96485, 0.96562, 0.96638, 0.96712, 0.96784, 0.96856,
            0.96926, 0.96995, 0.97062,
          ],
          1.9: [
            0.97128, 0.97193, 0.97257, 0.9732, 0.97381, 0.97441, 0.975, 0.97558,
            0.97615, 0.9767,
          ],
          "2.0": [
            0.97725, 0.97778, 0.97831, 0.97882, 0.97932, 0.97982, 0.9803,
            0.98077, 0.98124, 0.98169,
          ],
          2.1: [
            0.98214, 0.98257, 0.983, 0.98341, 0.98382, 0.98422, 0.98461, 0.985,
            0.98537, 0.98574,
          ],
          2.2: [
            0.9861, 0.98645, 0.98679, 0.98713, 0.98745, 0.98778, 0.98809,
            0.9884, 0.9887, 0.98899,
          ],
          2.3: [
            0.98928, 0.98956, 0.98983, 0.9901, 0.99036, 0.99061, 0.99086,
            0.99111, 0.99134, 0.99158,
          ],
          2.4: [
            0.9918, 0.99202, 0.99224, 0.99245, 0.99266, 0.99286, 0.99305,
            0.99324, 0.99343, 0.99361,
          ],
          2.5: [
            0.99379, 0.99396, 0.99413, 0.9943, 0.99446, 0.99461, 0.99477,
            0.99492, 0.99506, 0.9952,
          ],
          2.6: [
            0.99534, 0.99547, 0.9956, 0.99573, 0.99585, 0.99598, 0.99609,
            0.99621, 0.99632, 0.99643,
          ],
          2.7: [
            0.99653, 0.99664, 0.99674, 0.99683, 0.99693, 0.99702, 0.99711,
            0.9972, 0.99728, 0.99736,
          ],
          2.8: [
            0.99744, 0.99752, 0.9976, 0.99767, 0.99774, 0.99781, 0.99788,
            0.99795, 0.99801, 0.99807,
          ],
          2.9: [
            0.99813, 0.99819, 0.99825, 0.99831, 0.99836, 0.99841, 0.99846,
            0.99851, 0.99856, 0.99861,
          ],
          "3.0": [
            0.99865, 0.99869, 0.99874, 0.99878, 0.99882, 0.99886, 0.99889,
            0.99893, 0.99896, 0.999,
          ],
          3.1: [
            0.99903, 0.99906, 0.9991, 0.99913, 0.99916, 0.99918, 0.99921,
            0.99924, 0.99926, 0.99929,
          ],
          3.2: [
            0.99931, 0.99934, 0.99936, 0.99938, 0.9994, 0.99942, 0.99944,
            0.99946, 0.99948, 0.9995,
          ],
          3.3: [
            0.99952, 0.99953, 0.99955, 0.99957, 0.99958, 0.9996, 0.99961,
            0.99962, 0.99964, 0.99965,
          ],
          3.4: [
            0.99966, 0.99968, 0.99969, 0.9997, 0.99971, 0.99972, 0.99973,
            0.99974, 0.99975, 0.99976,
          ],
          3.5: [
            0.99977, 0.99978, 0.99978, 0.99979, 0.9998, 0.99981, 0.99981,
            0.99982, 0.99983, 0.99983,
          ],
          3.6: [
            0.99984, 0.99985, 0.99985, 0.99986, 0.99986, 0.99987, 0.99987,
            0.99988, 0.99988, 0.99989,
          ],
          3.7: [
            0.99989, 0.9999, 0.9999, 0.9999, 0.99991, 0.99991, 0.99992, 0.99992,
            0.99992, 0.99992,
          ],
          3.8: [
            0.99993, 0.99993, 0.99993, 0.99994, 0.99994, 0.99994, 0.99994,
            0.99995, 0.99995, 0.99995,
          ],
          3.9: [
            0.99995, 0.99995, 0.99996, 0.99996, 0.99996, 0.99996, 0.99996,
            0.99996, 0.99997, 0.99997,
          ],
          "4.0": [
            0.99997, 0.99997, 0.99997, 0.99997, 0.99997, 0.99997, 0.99998,
            0.99998, 0.99998, 0.99998,
          ],
        };

        function sigFig(value, digits) {
          if (value === 0) {
            return 0;
          }
          let decimalPlaces =
            digits - Math.floor(Math.log10(Math.abs(value))) - 1;
          return parseFloat(value.toFixed(decimalPlaces));
        }

        let z1 = (1 + ci / 100) / 2;
        let zz = z1.toString().split(".")[1]?.length || 0;
        let z = "";
        let old = 0.5;

        outer: for (let keys in z_table) {
          let values = z_table[keys];
          for (let key = 0; key < values.length; key++) {
            let value = values[key];
            if (key > 0) old = values[key - 1];
            if (z1 === value) {
              z = parseFloat(keys) + key / 100;
              break outer;
            } else if (key === 0 && value > z1) {
              z = parseFloat(keys) + key / 100;
              break outer;
            } else if (value > z1) {
              z = parseFloat(keys) + (key - 1) / 100;
              break outer;
            }
          }
        }

        let z_2 = Math.pow(z, 2);
        let mle = success / trials;
        let laplace = (success + 1) / (trials + 2);
        let jeffrey = (success + 0.5) / (trials + 1);
        let wilson = (success + z_2 / 2) / (trials + z_2);
        let pe;

        if (mle <= 0.5) {
          pe = wilson;
        } else if (mle > 0.5 && mle < 0.9) {
          pe = mle;
        } else if (mle >= 0.9 && mle < 1.0) {
          pe = jeffrey < laplace ? jeffrey : laplace;
        } else if (mle === 1.0) {
          pe = laplace;
        }

        if (ci > 0) {
          z = -z;
        }

        result.tech_pe = sigFig(pe, 4);
        result.tech_z = sigFig(z, 4);
        result.tech_mle = sigFig(mle, 4);
        result.tech_laplace = sigFig(laplace, 4);
        result.tech_jeffrey = sigFig(jeffrey, 4);
        result.tech_wilson = sigFig(wilson, 4);
      } else {
        result.error =
          "The number of trials must be greater than the number of successes";
      }
    } else {
      result.error = "Please check your input.";
    }

    return result;
  }

  /** getCalculationRelativeFrequencyCalculator
   * POST: /api/calculators-lol/relative-frequency-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationRelativeFrequencyCalculator(body) {
    let data = body.tech_data;
    let freq = body.tech_freq;
    let k = parseInt(body.tech_k);
    let st_val = parseFloat(body.tech_st_val);
    let param = {};

    if (data && data.trim() !== "") {
      let check = true;

      data = data.replace(/[ ,\n\r]+/g, ",");
      data = data.replace(/[a-zA-Z]/g, "");
      while (data.includes(",,")) {
        data = data.replace(/,,/g, ",");
      }

      let set = data
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "")
        .map(Number);

      for (let value of set) {
        if (isNaN(value)) {
          check = false;
        }
        if (freq === "grp" && value < st_val) {
          param.error =
            "Number can't be less than the starting value of grouped data!";
          return param;
        }
      }

      if (freq === "grp" && (!k || isNaN(k))) {
        check = false;
      }

      if (!check) {
        param.error = "Please check your input.";
        return param;
      }

      let count = {};
      set.forEach((val) => (count[val] = (count[val] || 0) + 1));
      let n = set.length;

      let table = "";
      let rf_values = [];
      let rf1_values = [];

      if (freq === "ind") {
        table += `<table class='w-full text-[18px]' style='border-collapse: collapse'><thead><tr class='bg-gray-100'><th class='border p-2 text-center text-blue'>Element</th><th class='border p-2 text-center text-blue'>Frequency</th><th class='border p-2 text-center text-blue'>Relative Frequency</th><th class='border p-2 text-center text-blue'>Cumulative Relative Frequency</th></tr></thead><tbody>`;
        let cf = 0;
        let crf = 0;

        for (let key in count) {
          let f = count[key];
          cf += f;
          let rf = f / n;
          crf += rf;
          rf_values.push(rf);
          table += `<tr class='bg-white'><td class='border p-2 text-center'>${key}</td><td class='border p-2 text-center'>${f}</td><td class='border p-2 text-center'>${rf.toFixed(
            4
          )}</td><td class='border p-2 text-center'>${crf.toFixed(
            4
          )}</td></tr>`;
        }
        table += "</tbody></table>";
      }

      let ds = set.join(", ");
      set.sort((a, b) => a - b);
      let sum = set.reduce((a, b) => a + b, 0);
      let mean = sum / n;
      let average = parseFloat(mean.toFixed(4));
      let min = Math.min(...set);
      let max = Math.max(...set);
      let range = max - min;

      let median =
        n % 2 !== 0
          ? set[Math.floor(n / 2)]
          : (set[n / 2] + set[n / 2 - 1]) / 2;

      let m_max = Math.max(...Object.values(count));
      let mode = Object.keys(count).filter((k) => count[k] === m_max);

      let ss = 0,
        hm_sum = 0,
        asum = 0;
      set.forEach((val) => {
        ss += Math.pow(val - mean, 2);
        hm_sum += 1 / val;
        asum += Math.abs(val);
      });

      let hm = n / hm_sum;
      let s_d = Math.sqrt(ss / n);
      let s_d1 = Math.sqrt(ss / (n - 1));
      let variance = s_d * s_d;
      let c_v = s_d1 / mean;
      let gm = Math.pow(
        set.reduce((a, b) => a * b, 1),
        1 / n
      );
      let snr = mean / s_d1;

      let ad = set.reduce((acc, val) => acc + Math.abs(val - mean), 0);
      let mad = ad / n;

      function quartile(arr, q) {
        let pos = (arr.length + 1) * q;
        let base = Math.floor(pos) - 1;
        let rest = pos - Math.floor(pos);
        if (arr[base + 1] !== undefined) {
          return arr[base] + rest * (arr[base + 1] - arr[base]);
        } else {
          return arr[base];
        }
      }

      let q1 = quartile(set, 0.25);
      let q2 = quartile(set, 0.5);
      let q3 = quartile(set, 0.75);
      let iqr = q3 - q1;
      let qd = iqr / 2;
      let cqd = iqr / (q3 + q1);
      let uf = q1 - 1.5 * iqr;
      let lf = q3 + 1.5 * iqr;

      let z = set.map((val) => ((val - mean) / s_d).toFixed(4)).join(", ");
      let sds = set.join(", ");

      if (freq === "grp") {
        let ci = Math.round((max - min) / k + 1);
        let x = st_val;
        let group = [];
        let group_count = [];

        for (let i = 0; i < k; i++) {
          let next = x + ci;
          if (next > 10000000) {
            param.error = "A number can't be Greater Than 10000000";
            return param;
          }
          group.push(`${x} to ${next}`);
          let count = set.filter((val) => val >= x && val <= next).length;
          group_count.push(count);
          x = next + 1;
        }

        table = `<table class='w-full text-[18px]' style='border-collapse: collapse'><thead><tr class='bg-gray-100'><th class='border p-2 text-center text-blue'>Group</th><th class='border p-2 text-center text-blue'>Frequency</th><th class='border p-2 text-center text-blue'>Relative Frequency</th><th class='border p-2 text-center text-blue'>Cumulative Relative Frequency</th></tr></thead><tbody>`;
        let cf1 = 0,
          crf1 = 0;
        for (let i = 0; i < k; i++) {
          cf1 += group_count[i];
          let rf1 = group_count[i] / n;
          crf1 += rf1;
          rf1_values.push(rf1);
          table += `<tr class='bg-white'><td class='border p-2 text-center'>${
            group[i]
          }</td><td class='border p-2 text-center'>${
            group_count[i]
          }</td><td class='border p-2 text-center'>${rf1.toFixed(
            4
          )}</td><td class='border p-2 text-center'>${crf1.toFixed(
            4
          )}</td></tr>`;
        }
        table += "</tbody></table>";

        param.tech_group = group;
        param.tech_group_count = group_count;
      }

      Object.assign(param, {
        tech_table: table,
        tech_set: set,
        tech_ds: ds,
        tech_rf_values: rf_values,
        tech_rf1_values: rf1_values,
        tech_sds: sds,
        tech_n: n,
        tech_count: count,
        tech_mean: mean,
        tech_median: median,
        tech_mode: mode,
        tech_min: min,
        tech_max: max,
        tech_range: range,
        tech_sum: sum,
        tech_ss: ss,
        tech_asum: asum,
        tech_s_d: s_d,
        tech_s_d1: s_d1,
        tech_c_v: c_v,
        tech_snr: snr,
        tech_variance: variance,
        tech_gm: gm,
        tech_hm: hm,
        tech_ad: ad,
        tech_mad: mad,
        tech_q1: q1,
        tech_q2: q2,
        tech_q3: q3,
        tech_iqr: iqr,
        tech_qd: qd,
        tech_cqd: cqd,
        tech_uf: uf,
        tech_lf: lf,
        tech_z: z,
      });

      return param;
    } else {
      return { error: "Please check your input." };
    }
  }
  /**
   * getCalculationCorrelationCoefficientCalculator: Service Method
   * POST: /api/calculators-lol/correlation-coefficient-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationCorrelationCoefficientCalculator(body) {
    let x = body.tech_x;
    let y = body.tech_y;
    let method = body.tech_method;

    let check = true;
    const param = {};

    // Check if x and y are empty
    if (!x || !y) {
      check = false;
    }

    // Process x values
    let xStr = x.replace(/[ ,\n\r]/g, ",");
    while (xStr.includes(",,")) {
      xStr = xStr.replace(",,", ",");
    }

    let numbers = xStr
      .split(",")
      .map((val) => val.trim())
      .filter((val) => val !== "");

    // Validate x numbers
    for (const value of numbers) {
      if (isNaN(value) || value === "") {
        check = false;
      }
    }
    numbers = numbers.map((val) => parseFloat(val));

    // Process y values
    let yStr = y.replace(/[ ,\n\r]/g, ",");
    while (yStr.includes(",,")) {
      yStr = yStr.replace(",,", ",");
    }

    let numbersy = yStr
      .split(",")
      .map((val) => val.trim())
      .filter((val) => val !== "");

    // Validate y numbers
    for (const value of numbersy) {
      if (isNaN(value) || value === "") {
        check = false;
      }
    }
    numbersy = numbersy.map((val) => parseFloat(val));

    if (check === true) {
      // Significant figures helper function
      const sigFig = (value, digits) => {
        let decimalPlaces;
        if (value === 0) {
          decimalPlaces = digits - 1;
        } else if (value < 0) {
          decimalPlaces = digits - Math.floor(Math.log10(value * -1)) - 1;
        } else {
          decimalPlaces = digits - Math.floor(Math.log10(value)) - 1;
        }
        return parseFloat(value.toFixed(decimalPlaces));
      };

      if (numbers.length === numbersy.length) {
        let meanx, meany, countx, arr1, arr2, arr3, arr4, arr5, final;

        if (method == 1) {
          // Pearson correlation
          countx = numbers.length;
          const county = numbersy.length;
          meanx = numbers.reduce((a, b) => a + b, 0) / countx;
          meany = numbersy.reduce((a, b) => a + b, 0) / county;

          arr1 = [];
          arr2 = [];
          arr3 = [];
          arr4 = [];
          arr5 = [];

          for (let i = 0; i < countx; i++) {
            arr1.push(numbers[i] - meanx);
            arr2.push(Math.pow(numbers[i] - meanx, 2));
            arr3.push(numbersy[i] - meany);
            arr4.push(Math.pow(numbersy[i] - meany, 2));
            arr5.push((numbers[i] - meanx) * (numbersy[i] - meany));
          }

          const sumx = numbers.reduce((a, b) => a + b, 0);
          const sumy = numbersy.reduce((a, b) => a + b, 0);
          const mx = Math.sqrt(arr2.reduce((a, b) => a + b, 0) / countx);
          const my = Math.sqrt(arr4.reduce((a, b) => a + b, 0) / countx);
          final = (1 / countx) * (arr5.reduce((a, b) => a + b, 0) / (mx * my));
        } else {
          // Spearman rank correlation
          let rank1 = [];
          let rank2 = [];

          // Calculate ranks for x
          for (let i = 0; i < numbers.length; i++) {
            let count = numbers.length;
            for (let j = 0; j < numbers.length; j++) {
              if (numbers[i] !== numbers[j]) {
                if (numbers[j] >= numbers[i]) {
                  count--;
                }
              }
            }
            rank1.push(count);
          }

          // Calculate ranks for y
          for (let i = 0; i < numbersy.length; i++) {
            let count = numbersy.length;
            for (let j = 0; j < numbersy.length; j++) {
              if (numbersy[i] !== numbersy[j]) {
                if (numbersy[j] >= numbersy[i]) {
                  count--;
                }
              }
            }
            rank2.push(count);
          }

          // Handle tied ranks for rank2
          const countValues = (arr) => {
            const counts = {};
            arr.forEach((val) => {
              counts[val] = (counts[val] || 0) + 1;
            });
            return counts;
          };

          let double = {};
          const arrc = countValues(rank2);
          for (const [key, value] of Object.entries(arrc)) {
            if (value > 1) {
              const div = [];
              for (let i = 0; i < value; i++) {
                div.push(parseInt(key) - i);
              }
              double[key] = div.reduce((a, b) => a + b, 0) / value;
            }
          }

          let nrank2;
          if (Object.keys(double).length !== 0) {
            nrank2 = [...rank2];
            for (const [key1, value1] of Object.entries(double)) {
              for (let i = 0; i < rank2.length; i++) {
                if (parseInt(key1) === rank2[i]) {
                  nrank2[i] = value1;
                }
              }
            }
          }

          // Handle tied ranks for rank1
          let double1 = {};
          const arrc1 = countValues(rank1);
          for (const [key, value] of Object.entries(arrc1)) {
            if (value > 1) {
              const div1 = [];
              for (let i = 0; i < value; i++) {
                div1.push(parseInt(key) - i);
              }
              double1[key] = div1.reduce((a, b) => a + b, 0) / value;
            }
          }

          let nrank1;
          if (Object.keys(double1).length !== 0) {
            nrank1 = [...rank1];
            for (const [key1, value1] of Object.entries(double1)) {
              for (let i = 0; i < rank1.length; i++) {
                if (parseInt(key1) === rank1[i]) {
                  nrank1[i] = value1;
                }
              }
            }
          }

          const input1 = nrank1 || rank1;
          const input2 = nrank2 || rank2;
          numbers = input1;
          numbersy = input2;

          countx = numbers.length;
          const county = numbersy.length;
          meanx = numbers.reduce((a, b) => a + b, 0) / countx;
          meany = numbersy.reduce((a, b) => a + b, 0) / county;

          arr1 = [];
          arr2 = [];
          arr3 = [];
          arr4 = [];
          arr5 = [];

          for (let i = 0; i < countx; i++) {
            arr1.push(numbers[i] - meanx);
            arr2.push(Math.pow(numbers[i] - meanx, 2));
            arr3.push(numbersy[i] - meany);
            arr4.push(Math.pow(numbersy[i] - meany, 2));
            arr5.push((numbers[i] - meanx) * (numbersy[i] - meany));
          }

          const sumx = numbers.reduce((a, b) => a + b, 0);
          const sumy = numbersy.reduce((a, b) => a + b, 0);
          const mx = Math.sqrt(arr2.reduce((a, b) => a + b, 0) / countx);
          const my = Math.sqrt(arr4.reduce((a, b) => a + b, 0) / countx);
          final = (1 / countx) * (arr5.reduce((a, b) => a + b, 0) / (mx * my));
        }

        param.tech_numbers = numbers;
        param.tech_numbersy = numbersy;
        param.tech_method = method;
        param.tech_meanx = meanx;
        param.tech_meany = meany;
        param.tech_countx = countx;
        param.tech_arr1 = arr1;
        param.tech_arr2 = arr2;
        param.tech_arr3 = arr3;
        param.tech_arr4 = arr4;
        param.tech_arr5 = arr5;
        param.tech_final = final;
        param.tech_x = xStr;
        param.tech_y = yStr;
        return param;
      } else {
        param.error = "Please! Enter same number of scores for X and Y";
        return param;
      }
    } else {
      param.error = "Please check your input.";
      return param;
    }
  }

  /** getCalculationPoissonDistributionCalculator
   * POST: /api/calculators-lol/poisson-distribution-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationPoissonDistributionCalculator(body) {
    let x = body.tech_x;
    let mean = body.tech_mean;
    let con = body.tech_con;

    // Helper functions
    function isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function factorial(n) {
      if (n < 0) return NaN;
      if (n <= 1) return 1;
      let res = 1;
      for (let i = 2; i <= n; i++) res *= i;
      return res;
    }

    function pow(base, exponent) {
      return Math.pow(base, exponent);
    }

    function exp(value) {
      return Math.exp(value);
    }

    function round(value, decimals) {
      return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
    }

    const result = {
      param: {},
    };

    if (x < 0 || x > 440) {
      result.param.error =
        "This calculator is work with 0 to 440 for variable (x)";
      return result.param;
    }

    if (isNumeric(x) && isNumeric(mean) && isNumeric(con)) {
      let chart = "";
      let sum = "";
      let sumofex, power, expo, ans, factVal;

      if (con === "1") {
        factVal = factorial(x);
        expo = round(exp(-1 * mean), 4);
        power = pow(mean, x);
        sumofex = expo * power;
        ans = (exp(-1 * mean) * pow(mean, x)) / factVal;
        result.param.tech_fact = factVal;
      } else if (con === "2" || con === "5") {
        ans = 0;
        sum = "";
        result.param.tech_details = {};

        for (let i = 0; i < x; i++) {
          factVal = factorial(i);
          if (i == 0) {
            result.param.tech_first = (exp(-1 * mean) * pow(mean, i)) / factVal;
          }
          if (i != x - 1) {
            sum += (exp(-1 * mean) * pow(mean, i)) / factVal + " + <br>";
          } else {
            sum += (exp(-1 * mean) * pow(mean, i)) / factVal;
          }
          ans += (exp(-1 * mean) * pow(mean, i)) / factVal;
        }

        result.param.tech_ans = ans;
        result.param.tech_sum = sum;

        if (con == "2") {
          for (let currentX = 0; currentX < x; currentX++) {
            factVal = factorial(currentX);
            expo = round(exp(-1 * mean), 4);
            power = pow(mean, currentX);
            sumofex = expo * power;

            result.param.tech_details[currentX] = {
              fact: factVal,
              sumofex: sumofex,
              power: power,
              expo: expo,
              value: (exp(-1 * mean) * pow(mean, currentX)) / factVal,
            };
          }
        } else if (con == "5") {
          for (let currentX = 0; currentX <= x - 1; currentX++) {
            factVal = factorial(currentX);
            expo = round(exp(-1 * mean), 4);
            power = pow(mean, currentX);
            sumofex = expo * power;

            result.param.tech_details[currentX] = {
              fact: factVal,
              sumofex: sumofex,
              power: power,
              expo: expo,
              value: (exp(-1 * mean) * pow(mean, currentX)) / factVal,
            };
          }
        }
      } else if (con === "3" || con === "4") {
        ans = 0;
        sum = "";
        result.param.tech_details = {};

        for (let i = 0; i <= x; i++) {
          factVal = factorial(i);
          if (i == 0) {
            result.param.tech_first = (exp(-1 * mean) * pow(mean, i)) / factVal;
          }
          if (i != x) {
            sum += (exp(-1 * mean) * pow(mean, i)) / factVal + " + <br>";
          } else {
            sum += (exp(-1 * mean) * pow(mean, i)) / factVal;
          }
          ans += (exp(-1 * mean) * pow(mean, i)) / factVal;
        }

        result.param.tech_ans = ans;
        result.param.tech_sum = sum;

        if (con == "3") {
          for (let currentX = 0; currentX <= x; currentX++) {
            factVal = factorial(currentX);
            expo = round(exp(-1 * mean), 4);
            power = pow(mean, currentX);
            sumofex = expo * power;
            result.param.tech_details[currentX] = {
              fact: factVal,
              sumofex: sumofex,
              power: power,
              expo: expo,
              value: (exp(-1 * mean) * pow(mean, currentX)) / factVal,
            };
          }
        } else {
          for (let currentX = 0; currentX <= x; currentX++) {
            factVal = factorial(currentX);
            expo = round(exp(-1 * mean), 4);
            power = pow(mean, currentX);
            sumofex = expo * power;
            result.param.tech_details[currentX] = {
              fact: factVal,
              sumofex: sumofex,
              power: power,
              expo: expo,
              value: (exp(-1 * mean) * pow(mean, currentX)) / factVal,
            };
          }
        }

        result.param.tech_fact = factVal;
        result.param.tech_sum = sum;
      }

      for (let i = 0; i <= 15; i++) {
        factVal = factorial(i);
        chart += (exp(-1 * mean) * pow(mean, i)) / factVal + ",";
      }

      result.param.tech_sumofex = sumofex;
      result.param.tech_power = power;
      result.param.tech_expo = expo;
      result.param.tech_ans = ans;
      result.param.tech_chart = chart;
      return result.param;
    } else {
      result.param.error = "Please check your input.";
      return result.param;
    }
  }

  /** getCalculationBinomialDistributionCalculator
   * POST: /api/calculators-lol/binomial-distribution-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationBinomialDistributionCalculator(body) {
    let x = body.tech_x;
    let n = body.tech_n;
    let con = body.tech_con;
    let p = body.tech_p;

    // Helper functions
    function isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function factorial(num) {
      if (num < 0) return NaN;
      if (num <= 1) return 1;
      let result = 1;
      for (let i = 2; i <= num; i++) {
        result *= i;
      }
      return result;
    }

    const result = {
      param: {},
    };

    // Input validation
    if (n < 0 || n > 440) {
      result.param.error = "This calculator works with 0 to 440 for Trials (n)";
      return result.param;
    }
    if (p < 0 || p > 1) {
      result.param.error = "The probability must be between 0 and 1";
      return result.param;
    }
    if (x > n) {
      result.param.error =
        "The number of successes must be less than or equal to the number of trials";
      return result.param;
    }

    if (isNumeric(x) && isNumeric(n) && isNumeric(con) && isNumeric(p)) {
      let ans = 0;
      let table = [];

      // Helper function to calculate combination
      const combination = (n, k) => {
        return factorial(n) / (factorial(k) * factorial(n - k));
      };

      if (con === "1") {
        // Exactly x successes
        const nf = factorial(n);
        const xf = factorial(x);
        const nxf = factorial(n - x);
        ans = (nf / (xf * nxf)) * Math.pow(p, x) * Math.pow(1 - p, n - x);

        // Generate probability table
        for (let i = 0; i <= n; i++) {
          const ifact = factorial(i);
          const nifact = factorial(n - i);
          table.push(
            (factorial(n) / (ifact * nifact)) *
              Math.pow(p, i) *
              Math.pow(1 - p, n - i)
          );
        }
      } else if (con === "2") {
        // Fewer than x successes (x not included)
        for (let i = 0; i <= n; i++) {
          const prob =
            combination(n, i) * Math.pow(p, i) * Math.pow(1 - p, n - i);
          table.push(prob);
          if (i < x) {
            ans += prob;
          }
        }
      } else if (con === "3") {
        // x or fewer successes (x included)
        for (let i = 0; i <= n; i++) {
          const prob =
            combination(n, i) * Math.pow(p, i) * Math.pow(1 - p, n - i);
          table.push(prob);
          if (i <= x) {
            ans += prob;
          }
        }
      } else if (con === "4") {
        // More than x successes (x not included)
        // First generate full table
        for (let i = 0; i <= n; i++) {
          const prob =
            combination(n, i) * Math.pow(p, i) * Math.pow(1 - p, n - i);
          table.push(prob);
        }
        // Then sum probabilities after x
        for (let i = x + 1; i <= n; i++) {
          ans += table[i];
        }
      } else if (con === "5") {
        // x or more successes (x included)
        // First generate full table
        for (let i = 0; i <= n; i++) {
          const prob =
            combination(n, i) * Math.pow(p, i) * Math.pow(1 - p, n - i);
          table.push(prob);
        }
        // Then sum probabilities from x onward
        for (let i = x; i <= n; i++) {
          ans += table[i];
        }
      }

      result.param.tech_ans = ans;
      result.param.tech_table = table;
      return result.param;
    } else {
      result.param.error = "Please check your input";
      return result.param;
    }
  }

  /** getCalculationInvnormCalculator
   * POST: /api/calculators-lol/invnorm-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationInvnormCalculator(body) {
    let sd = parseFloat(body.tech_sd);
    let mean = parseFloat(body.tech_mean);
    let p = parseFloat(body.tech_p);

    let param = {};

    if (p < 0 || p > 1) {
      param.error = "The probability must be between 0 and 1";
      return param;
    }

    if (isNaN(sd) || isNaN(mean) || isNaN(p)) {
      param.error = "Please check your input.";
      return param;
    }

    function zinv(p) {
      const a1 = -39.6968302866538;
      const a2 = 220.946098424521;
      const a3 = -275.928510446969;
      const a4 = 138.357751867269;
      const a5 = -30.6647980661472;
      const a6 = 2.50662827745924;

      const b1 = -54.4760987982241;
      const b2 = 161.585836858041;
      const b3 = -155.698979859887;
      const b4 = 66.8013118877197;
      const b5 = -13.2806815528857;

      const c1 = -0.00778489400243029;
      const c2 = -0.322396458041136;
      const c3 = -2.40075827716184;
      const c4 = -2.54973253934373;
      const c5 = 4.37466414146497;
      const c6 = 2.93816398269878;

      const d1 = 0.00778469570904146;
      const d2 = 0.32246712907004;
      const d3 = 2.445134137143;
      const d4 = 3.75440866190742;

      const p_low = 0.02425;
      const p_high = 1 - p_low;

      let q, r, retVal;

      if (p < 0 || p > 1) {
        return 0;
      } else if (p < p_low) {
        q = Math.sqrt(-2 * Math.log(p));
        retVal =
          (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
          ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
      } else if (p <= p_high) {
        q = p - 0.5;
        r = q * q;
        retVal =
          ((((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q) /
          (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1);
      } else {
        q = Math.sqrt(-2 * Math.log(1 - p));
        retVal =
          -(((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
          ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
      }

      return retVal;
    }

    // Main calculations
    let x1 = zinv(p);
    let ll = -1 * (-1 * mean + sd * x1);
    let above = Math.round(1000000 * ll) / 1000000;

    x1 = zinv(p);
    let ul = mean + sd * x1;
    let blow = Math.round(1000000 * ul) / 1000000;

    let p2 = p / 2;
    x1 = zinv(0.5 - p2);
    ll = x1;
    ul = -1 * x1;
    ll = Math.round((mean + sd * ll) * 1000000) / 1000000;
    ul = Math.round((mean + sd * ul) * 1000000) / 1000000;

    x1 = zinv(p2);
    let ll1 = x1;
    let ul1 = -1 * x1;
    ll1 = Math.round((mean + sd * ll1) * 1000000) / 1000000;
    ul1 = Math.round((mean + sd * ul1) * 1000000) / 1000000;

    param.tech_above = above;
    param.tech_blow = blow;
    param.tech_ll = ll;
    param.tech_ul = ul;
    param.tech_ll1 = ll1;
    param.tech_ul1 = ul1;

    return param;
  }
  /**
   * getCalculationPValueCalculator: Service Method
   * POST: /api/calculators-lol/p-value-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
   async getCalculationPValueCalculator(body) {
       let tail = body.tech_tail;
        let testType = body.tech_with; 
        let score = body.tech_score;
        let deg = body.tech_deg;
        let deg2 = body.tech_deg2;
        let level = body.tech_level;
        let degree_freedom = body.tech_degree_freedom;

        const result = {};

        if (testType === undefined) {
          result.error = "Please! Check Your Input";
          return result;
      }


        // Z-distribution functions
        function zcdf(z) {
            let y, x, w;

            if (z === 0.0) {
                x = 0.0;
            } else {
                y = 0.5 * Math.abs(z);
                if (y > (6 * 0.5)) {
                    x = 1.0;
                } else if (y < 1.0) {
                    w = y * y;
                    x = ((((((((0.000124818987 * w
                        - 0.001075204047) * w + 0.005198775019) * w
                        - 0.019198292004) * w + 0.059054035642) * w
                        - 0.151968751364) * w + 0.319152932694) * w
                        - 0.531923007300) * w + 0.797884560593) * y * 2.0;
                } else {
                    y -= 2.0;
                    x = (((((((((((((-0.000045255659 * y
                        + 0.000152529290) * y - 0.000019538132) * y
                        - 0.000676904986) * y + 0.001390604284) * y
                        - 0.000794620820) * y - 0.002034254874) * y
                        + 0.006549791214) * y - 0.010557625006) * y
                        + 0.011630447319) * y - 0.009279453341) * y
                        + 0.005353579108) * y - 0.002141268741) * y
                        + 0.000535310849) * y + 0.999936657524;
                }
            }
            return z > 0.0 ? ((x + 1.0) * 0.5) : ((1.0 - x) * 0.5);
        }

        function zpval(score, tail) {
            let pval;
            if (tail === '0') {
                pval = 2 * zcdf(Math.abs(score) * (-1));
            } else if (tail === '-1') {
                pval = zcdf(score);
            } else if (tail === '2') {
                pval = 1 - zcdf(score);
            }
            return pval;
        }

        // Gamma and Beta functions
        function gammaln(x) {
            const cof = [
                76.18009172947146,
                -86.50532032941677,
                24.01409824083091,
                -1.231739572450155,
                0.1208650973866179e-2,
                -0.5395239384953e-5
            ];
            let ser = 1.000000000190015;
            let xx = x;
            let y = x;
            let tmp = (y = xx = x) + 5.5;
            tmp -= (xx + 0.5) * Math.log(tmp);
            for (let j = 0; j < 6; j++)
                ser += cof[j] / ++y;
            return Math.log(2.5066282746310005 * ser / xx) - tmp;
        }

        function betacf(x, a, b) {
            const fpmin = 1e-30;
            let m = 1;
            const qab = a + b;
            const qap = a + 1;
            const qam = a - 1;
            let c = 1;
            let d = 1 - qab * x / qap;
            let m2, aa, del, h;

            if (Math.abs(d) < fpmin)
                d = fpmin;
            d = 1 / d;
            h = d;

            for (m = 1; m <= 100; m++) {
                m2 = 2 * m;
                aa = m * (b - m) * x / ((qam + m2) * (a + m2));
                d = 1 + aa * d;
                if (Math.abs(d) < fpmin)
                    d = fpmin;
                c = 1 + aa / c;
                if (Math.abs(c) < fpmin)
                    c = fpmin;
                d = 1 / d;
                h *= d * c;
                aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
                d = 1 + aa * d;
                if (Math.abs(d) < fpmin)
                    d = fpmin;
                c = 1 + aa / c;
                if (Math.abs(c) < fpmin)
                    c = fpmin;
                d = 1 / d;
                del = d * c;
                h *= del;
                if (Math.abs(del - 1.0) < 3e-7)
                    break;
            }

            return h;
        }

        function ibeta(x, a, b) {
          // console.log('Inside ibeta:', x, a, b);
            const bt = (x === 0 || x === 1) ? 0 :
                Math.exp(gammaln(a + b) - gammaln(a) -
                    gammaln(b) + a * Math.log(x) + b *
                    Math.log(1 - x));
            if (x < 0 || x > 1)
                return false;
            if (x < (a + 1) / (a + b + 2))
                return bt * betacf(x, a, b) / a;

            return 1 - bt * betacf(1 - x, b, a) / b;
        }

        function tpval(t, df, alt) {
          // console.log(t,df,alt);
          let pval;
          if (alt == '0') {
            pval = 2 * tcdf(Math.abs(t) * (-1), df);
           
          } else if (alt == '-1') {
            pval = tcdf(t, df);
          } else if (alt == '2') {
                pval = 1 - tcdf(t, df);
                // console.log(pval,'bilal');
              }
            return pval;
        }

             // T-distribution functions
        function tcdf(x, dof) {
          const changenumber = Number(dof);
          const xnumberx = Number(x);
          const dof2 = changenumber / 2;
          // const bilalalal = x + Math.sqrt(x * x + dof);
          // console.log(xnumberx,dof,dof2,'gggg');
            // -0.02 3 1.5 gggg
            return ibeta((xnumberx + Math.sqrt(xnumberx * xnumberx + changenumber)) / (2 * Math.sqrt(xnumberx * xnumberx + changenumber)), dof2, dof2);
        }
        // Chi-square functions
        function lowRegGamma(a, x) {
            const aln = gammaln(a);
            let ap = a;
            let sum = 1 / a;
            let del = sum;
            let b = x + 1 - a;
            let c = 1 / 1.0e-30;
            let d = 1 / b;
            let h = d;
            let i = 1;
            const ITMAX = -~(Math.log((a >= 1) ? a : 1 / a) * 8.5 + a * 0.4 + 17);
            let an;

            if (x < 0 || a <= 0) {
                return 0;
            } else if (x < a + 1) {
                for (i = 1; i <= ITMAX; i++) {
                    sum += del *= x / ++ap;
                }
                return (sum * Math.exp(x * (-1) + a * Math.log(x) - (aln)));
            }
            for (; i <= ITMAX; i++) {
                an = i * (-1) * (i - a);
                b += 2;
                d = an * d + b;
                c = b + an / c;
                d = 1 / d;
                h *= d * c;
            }

            return (1 - h * Math.exp(x * (-1) + a * Math.log(x) - (aln)));
        }

        function chicdf(x, dof) {
            if (x < 0)
                return 0;
            return lowRegGamma(dof / 2, x / 2);
        }

        function chipval(chi, df, alt) {
            let pval;
            if (alt == '0') {
                const x = chicdf(chi, df);
                if (x <= 0.5) {
                    pval = 2 * x;
                } else {
                    pval = 2 * (1 - x);
                }
            } else if (alt <= '-1') {
                pval = chicdf(chi, df);
            } else if (alt >= '1') {
                pval = 1 - chicdf(chi, df);
            }
            return pval;
        }

        // F-distribution functions
        function Fcdf(x, df1, df2) {
            // console.log(x,df1,df2);
            const hellox = Number(x);
            const hellodf1 = Number(df1);
            const hellodf2 = Number(df2);
            if (x < 0)
                return 0;
            return ibeta((hellodf1 * hellox) / (hellodf1 * hellox + hellodf2), hellodf1 / 2, hellodf2 / 2);
        }

        function Fpval(F, df1, df2, alt) {
          // console.log(F,df1,df2,alt);
            let pval;
            if (alt == '0') {
                const x = Fcdf(F, df1, df2);
                if (x <= 0.5) {
                    pval = 2 * x;
                } else {
                    pval = 2 * (1 - x);
                }  
            } else if (alt <= '-1') {
                pval = Fcdf(F, df1, df2);
            } else if (alt <= '1') {
                pval = 1 - Fcdf(F, df1, df2);
            }
            return pval;
        }

        // Pearson correlation functions
        function calculateTStatistic(r, n) {
            return (r * Math.sqrt(n - 2)) / Math.sqrt(1 - r * r);
        }

        function betaIncomplete(x, a, b) {
            const gammalns = (x) => {
                const cof = [
                    76.18009172947146,
                    -86.50532032941677,
                    24.01409824083091,
                    -1.231739572450155,
                    0.1208650973866179e-2,
                    -0.5395239384953e-5
                ];
                let y = x;
                let tmp = x + 5.5;
                tmp -= (x + 0.5) * Math.log(tmp);
                let ser = 1.000000000190015;
                for (let j = 0; j < 6; j++) ser += cof[j] / ++y;
                return -tmp + Math.log(2.5066282746310005 * ser / x);
            };

            const betacfs = (x, a, b) => {
                const MAXIT = 100;
                const EPS = 3.0e-7;
                const FPMIN = 1.0e-30;
                const qab = a + b;
                const qap = a + 1.0;
                const qam = a - 1.0;
                let c = 1.0;
                let d = 1.0 - qab * x / qap;
                if (Math.abs(d) < FPMIN) d = FPMIN;
                d = 1.0 / d;
                let h = d;
                for (let m = 1, m2 = 2; m <= MAXIT; m++, m2 += 2) {
                    let aa = m * (b - m) * x / ((qam + m2) * (a + m2));
                    d = 1.0 + aa * d;
                    if (Math.abs(d) < FPMIN) d = FPMIN;
                    c = 1.0 + aa / c;
                    if (Math.abs(c) < FPMIN) c = FPMIN;
                    d = 1.0 / d;
                    h *= d * c;
                    aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
                    d = 1.0 + aa * d;
                    if (Math.abs(d) < FPMIN) d = FPMIN;
                    c = 1.0 + aa / c;
                    if (Math.abs(c) < FPMIN) c = FPMIN;
                    d = 1.0 / d;
                    h *= d * c;
                }
                return h;
            };

            const bt = (x == 0 || x == 1) ? 0 :
                Math.exp(gammalns(a + b) - gammalns(a) - gammalns(b) + a * Math.log(x) + b * Math.log(1 - x));
            if (x < 0.0 || x > 1.0) return 0.0;
            if (x < (a + 1.0) / (a + b + 2.0))
                return bt * betacfs(x, a, b) / a;
            else
                return 1.0 - bt * betacfs(1.0 - x, b, a) / b;
        }

        function tDistCDFs(t, df) {
            const x = df / (df + t * t);
            const a = df / 2.0;
            const b = 0.5;
            const betaIncompleteResult = betaIncomplete(x, a, b);
            return 1.0 - 0.5 * betaIncompleteResult;
        }

        function calculatePValue(t, df) {
            return 2 * (1 - tDistCDFs(t, df));
        }

        function pValueFromPearson(r, n) {
            const t = calculateTStatistic(r, n);
            const df = n - 2;
            return calculatePValue(t, df);
        }

        // Validation
        if (level < 0 || level > 1) {
            result.error = "Significance level must be a number between 0 and 1";
            return result;
        }

        let p;

        // Calculate p-value based on test type
        if (testType === 'z') {
            if (!isFinite(score) || !isFinite(level)) {
                result.error = "Please! Check Your Input";
                return result;
            }
            p = zpval(score, tail);
        } else if (testType === 't') {
            if (!isFinite(score) || !isFinite(deg) || !isFinite(level)) {
                result.error = "Please! Check Your Input";
                return result;
            }
            p = tpval(score, deg, tail);
            // console.log(p,score,deg,tail,'gagagagag');
        } else if (testType === 'chi') {
            if (!isFinite(score) || !isFinite(deg) || !isFinite(level)) {
                result.error = "Please! Check Your Input";
                return result;
            }
            p = chipval(score, deg, deg);
        } else if (testType === 'f') {
            if (!isFinite(score) || !isFinite(deg) || !isFinite(deg2) || !isFinite(level)) {
                result.error = "Please! Check Your Input";
                return result;
            }
            if (deg2 < 0) {
                result.error = "Your values for degrees of freedom cannot be negative.";
                return result;
            }
            p = Fpval(score, deg, deg2, level);
        } else if (testType === 'r') {
            if (!isFinite(score) || !isFinite(deg) || !isFinite(level)) {
                result.error = "Please! Check Your Input";
                return result;
            }
            if (score < -1 || score > 1 || deg <= 2) {
                result.error = "score must be between -1 and 1 and deg must be greater than 2";
                return result;
            }
            p = pValueFromPearson(score, deg);
        } else if (testType === 'q') {
            if (isFinite(score) && isFinite(deg) && isFinite(degree_freedom) && !isFinite(level)) {
                result.error = "Please! Check Your Input";
                return result;
            }
            if (deg < 2 || deg > 30) {
                result.error = "Degree of freedom must be between 2 and 30.";
                return result;
            }
            if (degree_freedom < 3) {
                result.error = "Degrees of freedom must be greater than or equal to 3.";
                return result;
            }
            result.tech_score = score;
            result.tech_deg = deg;
            result.tech_degree_freedom = degree_freedom;
            result.tech_level = level;
            return result;
        }

        // Determine interpretation
        const inter = p <= level ? '' : 'not';

        // Round p-value if decimal
      if (p != null && typeof p.toString === 'function') {
          if (p.toString().includes('.')) {
              p = Math.round(p * 1e7) / 1e7;
          }
      }


        result.tech_tail = tail;
        result.tech_inter = inter;
        result.tech_level = level;
        result.tech_p = p;
        result.RESULT = 1;

        return result;
    }
  /** getCalculationLinearRegressionCalculator
   * POST: /api/calculators-lol/linear-regression-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationLinearRegressionCalculator(body) {
    let x = body.tech_x;
    let y = body.tech_y;
    let estimate = body.tech_estimate;

    x = x.replace(/[\s,\n\r]+/g, ",").replace(/,+/g, ",");
    y = y.replace(/[\s,\n\r]+/g, ",").replace(/,+/g, ",");

    let numbers = x
      .split(",")
      .map((v) => v.trim())
      .filter((v) => v !== "");
    let numbersy = y
      .split(",")
      .map((v) => v.trim())
      .filter((v) => v !== "");

    let check =
      numbers.every((v) => !isNaN(v)) && numbersy.every((v) => !isNaN(v));

    let estimateArr = [];
    let checkEstimate = false;
    if (estimate && estimate.trim() !== "") {
      estimateArr = estimate.split(",").map((v) => v.trim());
      checkEstimate = estimateArr.every((v) => !isNaN(v));
    }

    if (!check) {
      return { error: "Please! Check Your Input" };
    }

    if (numbers.length !== numbersy.length) {
      return { error: "Please! Enter same number of values for X and Y" };
    }

    if (numbers.length > 100) {
      return { error: "This calculator support up to 100 number of values" };
    }

    numbers = numbers.map(Number);
    numbersy = numbersy.map(Number);

    const meanx = numbers.reduce((a, b) => a + b, 0) / numbers.length;
    const meany = numbersy.reduce((a, b) => a + b, 0) / numbersy.length;

    let arr1 = [],
      arr2 = [],
      arr3 = [],
      arr4 = [],
      arr5 = [];

    for (let i = 0; i < numbers.length; i++) {
      let dx = numbers[i] - meanx;
      let dy = numbersy[i] - meany;
      arr1.push(Number(dx.toFixed(5)));
      arr2.push(Number((dx * dx).toFixed(5)));
      arr3.push(Number(dy.toFixed(5)));
      arr4.push(Number((dy * dy).toFixed(5)));
      arr5.push(Number((dx * dy).toFixed(5)));
    }

    const ssx = arr2.reduce((a, b) => a + b, 0);
    const sp = arr5.reduce((a, b) => a + b, 0);
    const b = sp / ssx;
    const a = meany - b * meanx;

    let linex = [],
      liney = [];
    for (let i = 0; i <= Math.max(...numbers) + 1; i += 0.1) {
      linex.push(i);
      liney.push(Number((b * i + a).toFixed(5)));
    }

    let result = {
      tech_a: Number(a.toFixed(5)),
      tech_b: Number(b.toFixed(5)),
      tech_meanx: meanx,
      tech_meany: meany,
      tech_arr1: arr1,
      tech_arr2: arr2,
      tech_arr3: arr3,
      tech_arr5: arr5,
      tech_ssx: ssx,
      tech_sp: sp,
      tech_numbers: numbers,
      tech_numbersy: numbersy,
    };

    if (checkEstimate) {
      result.tech_estimate = estimateArr;
    }

    return result;
  }

  /** getCalculationOutliercalculator
   * POST: /api/calculators-lol/outlier-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationOutliercalculator(body) {
    let x = body.tech_x;

    x = x.replace(/[\s,\n\r]+/g, ",").replace(/,+/g, ",");
    let numbers = x
      .split(",")
      .map((v) => v.trim())
      .filter((v) => v !== "");

    let check = numbers.every((v) => !isNaN(v));
    let values = numbers.map(Number).filter((v) => !isNaN(v));

    if (!check) {
      return { error: "Please! Check Your Input" };
    }

    if (values.length < 4) {
      return { error: "Please! enter 4 or more numbers" };
    }

    values.sort((a, b) => a - b);
    let count = values.length;
    let median;

    if (count % 2 !== 0) {
      let center = Math.floor(count / 2);
      median = values[center];
    } else {
      let center = count / 2;
      median = (values[center - 1] + values[center]) / 2;
    }

    function quartile(arr) {
      let count = arr.length;
      let mid = Math.floor((count - 1) / 2);
      if (count % 2 !== 0) {
        return arr[mid];
      } else {
        return (arr[mid] + arr[mid + 1]) / 2;
      }
    }

    let second = quartile(values);

    let lowerHalf = values.filter((v) => v < second);
    let upperHalf = values.filter((v) => v > second);

    let first = quartile(lowerHalf);
    let third = quartile(upperHalf);

    let inner = third - first;
    let in_f1 = first - 1.5 * inner;
    let in_f2 = third + 1.5 * inner;

    let out_f1 = first - 3 * inner;
    let out_f2 = third + 3 * inner;

    let outlier = values.filter((v) => v < in_f1 || v > in_f2);
    let poutlier = values.filter((v) => v < out_f1 || v > out_f2);

    return {
      tech_values: values,
      tech_first: first,
      tech_third: third,
      tech_inner: inner,
      tech_in_f1: in_f1,
      tech_in_f2: in_f2,
      tech_out_f1: out_f1,
      tech_out_f2: out_f2,
      tech_outlier: outlier,
      tech_poutlier: poutlier,
      tech_median: median,
    };
  }

  /** getCalculationQuadraticRegressioncalculator
   * POST: /api/calculators-lol/quadratic-regression-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationQuadraticRegressioncalculator(body) {
    let x = body.tech_x;
    let y = body.tech_y;

    x = x.replace(/[\s,\n\r]+/g, ",").replace(/,+/g, ",");
    y = y.replace(/[\s,\n\r]+/g, ",").replace(/,+/g, ",");

    let numbersx = x
      .split(",")
      .map((v) => v.trim())
      .filter((v) => v !== "");
    let numbersy = y
      .split(",")
      .map((v) => v.trim())
      .filter((v) => v !== "");

    if (numbersx.length !== numbersy.length) {
      return { error: "Please! Enter same number of values for X and Y" };
    }

    let xvalues = [],
      yvalues = [],
      check = true;

    for (let val of numbersx) {
      if (isNaN(val)) check = false;
      xvalues.push(Number(val));
    }

    for (let val of numbersy) {
      if (isNaN(val)) check = false;
      yvalues.push(Number(val));
    }

    if (!check) {
      return { error: "Please! Check Your Input" };
    }

    let count = xvalues.length;
    let meanx = +(xvalues.reduce((a, b) => a + b, 0) / count).toFixed(3);
    let meany = +(yvalues.reduce((a, b) => a + b, 0) / count).toFixed(3);
    let x2 = xvalues.map((v) => v * v);
    let meanx2 = +(x2.reduce((a, b) => a + b, 0) / count).toFixed(3);

    let Sxx = [],
      Sxy = [],
      Sxx2 = [],
      Sx2x2 = [],
      Sx2y = [];

    for (let i = 0; i < count; i++) {
      let xi = xvalues[i];
      let yi = yvalues[i];
      let xi2 = xi * xi;

      Sxx.push((xi - meanx) * (xi - meanx));
      Sxy.push((xi - meanx) * (yi - meany));
      Sxx2.push((xi - meanx) * (xi2 - meanx2));
      Sx2x2.push((xi2 - meanx2) * (xi2 - meanx2));
      Sx2y.push((xi2 - meanx2) * (yi - meany));
    }

    let sum = (arr) => arr.reduce((a, b) => a + b, 0);
    let denom = sum(Sxx) * sum(Sx2x2) - Math.pow(sum(Sxx2), 2);

    let b = (sum(Sxy) * sum(Sx2x2) - sum(Sx2y) * sum(Sxx2)) / denom;
    let c = (sum(Sx2y) * sum(Sxx) - sum(Sxy) * sum(Sxx2)) / denom;
    let a = meany - b * meanx - c * meanx2;

    let SSE = [],
      SST = [];

    for (let i = 0; i < count; i++) {
      let xi = xvalues[i];
      let yi = yvalues[i];
      let predicted = a + b * xi + c * xi * xi;
      SSE.push((yi - predicted) ** 2);
      SST.push((yi - meany) ** 2);
    }

    let r2 = 1 - sum(SSE) / sum(SST);

    return {
      tech_xvalues: xvalues,
      tech_yvalues: yvalues,
      tech_meanx: meanx,
      tech_meanx2: meanx2,
      tech_meany: meany,
      tech_Sxx: Sxx,
      tech_Sxy: Sxy,
      tech_Sxx2: Sxx2,
      tech_Sx2x2: Sx2x2,
      tech_Sx2y: Sx2y,
      tech_SSE: SSE,
      tech_SST: SST,
      tech_a: a,
      tech_b: b,
      tech_c: c,
      tech_r2: r2,
    };
  }

  /** getCalculationPercentilecalculator
   * POST: /api/calculators-lol/percentile-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationPercentilecalculator(body) {
    let p = parseFloat(body.p);
    let x = body.x;
    let separate = body.seprate || " ";
    let advancedcheck = body.advancedcheck || false;

    if (!x || typeof x !== "string") {
      return { error: "Please provide input numbers as a string in 'x'" };
    }

    let numbers = x
      .split(separate)
      .map((item) => item.trim())
      .filter((item) => item !== "" && !isNaN(item))
      .map(Number);
    let check =
      numbers.length > 0 &&
      numbers.every((num) => typeof num === "number" && !isNaN(num));

    if (!check) {
      return { error: "Please check your input." };
    }

    numbers.sort((a, b) => a - b);

    if (numbers.length < 2) {
      return { error: "Please! enter 2 or more numbers" };
    }

    if (p < 0 || p > 100) {
      return { error: "Please! Check Your Percentile percentage" };
    }

    let n = numbers.length;
    let p_per = p / 100;

    // Method 1
    let ab = p_per * n;
    let final_ans11 = Math.ceil(ab);
    let xy = final_ans11 - 1;
    let final_ans1 = numbers[xy];

    // Method 2
    let n_sum_method2 = n - 1;
    let ans_method2 = p_per * n_sum_method2 + 1;
    let final_ans2;
    let ans2_method2, ceil_ans2, floor_ans2, diff2, b2, ans_diff2;

    if (!Number.isInteger(ans_method2)) {
      let decimalPart = ans_method2 % 1;
      ceil_ans2 = Math.ceil(ans_method2) - 1;
      floor_ans2 = Math.floor(ans_method2) - 1;
      diff2 = numbers[ceil_ans2] - numbers[floor_ans2];
      b2 = numbers[floor_ans2];
      ans_diff2 = decimalPart * diff2;
      final_ans2 = b2 + ans_diff2;
      ans2_method2 = decimalPart;
    } else {
      final_ans2 = numbers[ans_method2 - 1];
      ans2_method2 = 0;
    }

    // Method 3
    let n_sum = n + 1;
    let ans = n_sum * p_per;
    let final_ans;
    let ans2, ceil_ans, floor_ans, diff, b, ans_diff;

    if (!Number.isInteger(ans)) {
      let decimalPart = ans % 1;
      ceil_ans = Math.ceil(ans) - 1;
      floor_ans = Math.floor(ans) - 1;
      if (ceil_ans >= n) ceil_ans = n - 1;
      if (floor_ans >= n) floor_ans = n - 1;
      diff = numbers[ceil_ans] - numbers[floor_ans];
      b = numbers[floor_ans];
      ans_diff = decimalPart * diff;
      final_ans = b + ans_diff;
      ans2 = decimalPart;
    } else {
      final_ans = numbers[ans - 1];
      ans2 = 0;
    }

    let final_ans3 = [];

    if (advancedcheck === true) {
      for (let i = 0; i <= 100; i += 5) {
        let p_per3 = i / 100;
        let n_sum_method3 = n - 1;
        let ans_method3 = p_per3 * n_sum_method3 + 1;
        let decimalPart3 = ans_method3 % 1;
        let ceil_ans3 = Math.ceil(ans_method3) - 1;
        let floor_ans3 = Math.floor(ans_method3) - 1;
        let diff3 = numbers[ceil_ans3] - numbers[floor_ans3];
        let b3 = numbers[floor_ans3];
        let ans_diff3 = decimalPart3 * diff3;
        final_ans3.push(b3 + ans_diff3);
      }
    }

    return {
      tech_final_ans: final_ans,
      tech_final_ans2: final_ans2,
      tech_final_ans1: final_ans1,
      tech_p: p,
      tech_n: n,
      tech_b: b,
      tech_ans: ans,
      tech_ans2: ans2,
      tech_n_sum: n_sum,
      tech_p_per: p_per,
      tech_numbers: numbers,
      tech_diff: diff,
      tech_ans_diff: ans_diff,
      tech_n_sum_method2: n_sum_method2,
      tech_ans_method2: ans_method2,
      tech_ans2_method2: ans2_method2,
      tech_ans_diff2: ans_diff2,
      tech_ab: ab,
      tech_final_ans11: final_ans11,
      tech_final_ans3: final_ans3.length ? final_ans3 : undefined,
    };
  }

  /** getCalculationStemAndLeafPlotcalculator
   * POST: /api/calculators-lol/stem-leaf-plot-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationStemAndLeafPlotcalculator(body) {
    let x = body.tech_x;

    if (!x) {
      return { error: "Please check your input." };
    }

    x = x.replace(/[\s,\n\r]+/g, ",");
    while (x.includes(",,")) x = x.replace(",,", ",");

    let numbers = x
      .split(",")
      .map((v) => v.trim())
      .filter((v) => v !== "");
    let values = [...numbers].map(Number).sort((a, b) => a - b);

    if (values.length > 1000) {
      return { error: "You can enter up to 1000 numbers" };
    }

    let newObj = {};
    for (let value of values) {
      if (isNaN(value)) {
        return { error: "Please! Enter Valid Input" };
      }
      if (value > 9999) {
        return {
          error: "Single data points limited to 4 digits. (from 1 to 9999)",
        };
      }

      const strVal = String(value);
      if (strVal.length === 1) {
        if (!newObj[0]) newObj[0] = [];
        newObj[0].push(strVal);
      } else {
        const stem = strVal.slice(0, -1);
        const leaf = strVal.slice(-1);
        if (!newObj[stem]) newObj[stem] = [];
        newObj[stem].push(leaf);
      }
    }

    const min = Math.min(...values);
    const max = Math.max(...values);
    const count = values.length;
    const sum = values.reduce((a, b) => a + b, 0);
    const range = max - min;
    const mean = Number((sum / count).toFixed(5));

    let median;
    if (count % 2 !== 0) {
      const center = Math.floor(count / 2);
      median = values[center];
    } else {
      const mid = count / 2;
      median = (values[mid - 1] + values[mid]) / 2;
    }

    const freqMap = {};
    for (let val of values) {
      freqMap[val] = (freqMap[val] || 0) + 1;
    }

    const maxFreq = Math.max(...Object.values(freqMap));
    const mode = Object.keys(freqMap).filter((k) => freqMap[k] === maxFreq);

    const variance =
      values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) /
      (count - 1);
    const SD = Math.sqrt(variance);

    return {
      tech_new: newObj,
      tech_min: min,
      tech_max: max,
      tech_count: count,
      tech_sum: sum,
      tech_range: range,
      tech_mean: mean,
      tech_median: median,
      tech_mode: mode,
      tech_SD: SD,
      tech_var: variance,
    };
  }

  /** getCalculationShannonDiversityIndexcalculator
   * POST: /api/calculators-lol/shannon-diversity-index-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationShannonDiversityIndexcalculator(body) {
    let x = body.tech_x;
    let seprate = body.tech_seprate;

    if (!x) {
      return { error: "Please! Check Your Input" };
    }

    if (!seprate || seprate === "") {
      seprate = " ";
    }

    let numbers = x
      .split(seprate)
      .map((v) => v.trim())
      .filter((v) => v !== "");
    let allNumeric = numbers.every((val) => !isNaN(val));

    if (!allNumeric) {
      return { error: "Please! Check Your Input" };
    }

    numbers = numbers.map(Number);

    let sum = 0;
    let sum_of_squares = 0;
    let sum3 = 0;
    let sum2 = 0;
    let count_number = numbers.length;
    let array_sum = numbers.reduce((a, b) => a + b, 0);
    let array_sum2 = array_sum * array_sum - 1;
    let maximum = Math.max(...numbers);

    for (let i = 0; i < count_number; i++) {
      sum_of_squares = numbers[i] * (numbers[i] - 1);
      let ratio = numbers[i] / array_sum;
      let take_log = Math.log(ratio);
      let final_log = take_log * ratio;
      sum += final_log;
      sum2 += sum_of_squares;
      let calculate_d = (numbers[i] * numbers[i]) / (array_sum * array_sum);
      sum3 += calculate_d;
    }

    let simpson_index = sum2 / array_sum2;

    return {
      tech_shannon_diversity: sum,
      tech_count_elements: Math.log(count_number),
      tech_hitman: count_number,
      tech_sum: array_sum,
      tech_max: maximum,
      tech_simpson_index: simpson_index,
      tech_sum3: sum3,
    };
  }

  /** getCalculationDegreesOfFreedomcalculator
   * POST: /api/calculators-lol/degrees-of-freedom-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationDegreesOfFreedomcalculator(body) {
    let sample_size = body.sample_size;
    let sample_size_one = body.sample_size_one;
    let sample_size_two = body.sample_size_two;
    let variance_one = body.variance_one;
    let variance_two = body.variance_two;
    let c1 = body.c1;
    let r1 = body.r1;
    let k1 = body.k1;
    let d1 = body.d1;
    let d2 = body.d2;
    let selection = body.selection;
    let h = body.h;
    let sample_mean = body.sample_mean;
    let standard_deviation_three = body.standard_deviation_three;

    let param = {};
    let degrees_of_freedom;

    switch (selection) {
      case "1":
        if (
          !isNaN(sample_size) &&
          Number.isInteger(+sample_size) &&
          sample_size > 0
        ) {
          degrees_of_freedom = sample_size - 1;
        } else {
          return { error: "Please! Check Your Input" };
        }
        break;

      case "2":
        if (
          !isNaN(sample_size_one) &&
          !isNaN(sample_size_two) &&
          sample_size_one > 0 &&
          sample_size_two > 0
        ) {
          degrees_of_freedom = sample_size_one + sample_size_two;
          degrees_of_freedom = degrees_of_freedom - 2;
          console.log(degrees_of_freedom);
        } else {
          return { error: "Please! Check Your Input" };
        }
        break;

      case "3":
        if (
          !isNaN(sample_size_one) &&
          !isNaN(sample_size_two) &&
          sample_size_one > 0 &&
          sample_size_two > 0 &&
          !isNaN(variance_one) &&
          !isNaN(variance_two)
        ) {
          d1 = variance_one / sample_size_one + variance_two / sample_size_two;
          let d2_sq = Math.pow(d1, 2);
          let d3 =
            (variance_one * variance_one) /
            (Math.pow(sample_size_one, 2) * (sample_size_one - 1));
          let d4 =
            (variance_two * variance_two) /
            (Math.pow(sample_size_two, 2) * (sample_size_two - 1));
          degrees_of_freedom = d2_sq / (d3 + d4);
          param.tech_v1 = Math.sqrt(variance_one);
          param.tech_v2 = Math.sqrt(variance_two);
        } else {
          return { error: "Please! Check Your Input" };
        }
        break;

      case "4": // Chi-square
        if (!isNaN(r1) && !isNaN(c1) && r1 > 0 && c1 > 0) {
          degrees_of_freedom = (r1 - 1) * (c1 - 1);
          param.tech_degrees_of_freedom = degrees_of_freedom;
          return param;
        } else {
          return { error: "Please! Check Your Input" };
        }

      case "5":
        if (!isNaN(sample_size) && !isNaN(k1) && k1 > 0 && sample_size > 0) {
          let d3 = k1 - 1;
          let d2 = sample_size - k1;
          degrees_of_freedom = sample_size - 1;
          param.tech_d2 = d2;
          param.tech_d3 = d3;
        } else {
          return { error: "Please! Check Your Input" };
        }
        break;

      case "6":
        if (
          !isNaN(sample_size) &&
          !isNaN(h) &&
          !isNaN(sample_mean) &&
          !isNaN(standard_deviation_three) &&
          sample_size > 0 &&
          standard_deviation_three > 0
        ) {
          let t_statistic =
            (sample_mean - h) /
            (standard_deviation_three / Math.sqrt(sample_size));
          param.tech_t_statistic = t_statistic;
          degrees_of_freedom = sample_size - 1;
        } else {
          return { error: "Please! Check Your Input" };
        }
        break;

      default:
        return { error: "Invalid selection value" };
    }

    param.tech_degrees_of_freedom = degrees_of_freedom;
    return param;
  }

  /** getCalculationMidrangecalculator
   * POST: /api/calculators-lol/midrange-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationMidrangecalculator(body) {
    let x = body.tech_x;

    if (!x || typeof x !== "string") {
      return { error: "Please! Check Your Input" };
    }
    function isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }
    // Normalize input string
    x = x.replace(/[\s,\n\r]+/g, ",");
    while (x.includes(",,")) {
      x = x.replace(/,,/g, ",");
    }

    let numbers = x
      .split(",")
      .map((str) => str.trim())
      .filter((str) => str !== "");

    for (let val of numbers) {
      if (!isNumeric(val)) {
        return { error: "Please! Check Your Input" };
      }
    }

    let values = numbers.map(Number);
    values.sort((a, b) => a - b);

    let min = Math.min(...values);
    let max = Math.max(...values);
    let count = values.length;
    let sum = values.reduce((acc, cur) => acc + cur, 0);
    let range = max - min;
    let mean = parseFloat((sum / count).toFixed(5));

    let median;
    if (count % 2 !== 0) {
      median = values[Math.floor(count / 2)];
    } else {
      median = (values[count / 2 - 1] + values[count / 2]) / 2;
    }

    // Mode
    let freq = {};
    let mode = [];
    let maxFreq = 0;

    for (let val of values) {
      freq[val] = (freq[val] || 0) + 1;
      if (freq[val] > maxFreq) {
        maxFreq = freq[val];
      }
    }

    for (let key in freq) {
      if (freq[key] === maxFreq) {
        mode.push(Number(key));
      }
    }

    // Variance and Standard Deviation
    let variance =
      values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) /
      (count - 1);
    let SD = Math.sqrt(variance);
    let ans = (min + max) / 2;

    return {
      tech_ans: ans,
      tech_min: min,
      tech_max: max,
      tech_count: count,
      tech_sum: sum,
      tech_range: range,
      tech_mean: mean,
      tech_median: median,
      tech_mode: mode,
      tech_SD: SD,
      tech_var: variance,
    };
  }

  /** getCalculationRSDcalculator
   * POST: /api/calculators-lol/rsd-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationRSDcalculator(body) {
    let x = body.tech_x;
    let form = body.tech_form;
    let mean = body.tech_mean;
    let deviation = body.tech_deviation;
    // Helper function
    function isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

    if (form === "raw") {
      if (!x || typeof x !== "string") {
        return { error: "Please! Check Your Input" };
      }

      // Normalize input
      x = x.replace(/[\s,\n\r]+/g, ",");
      while (x.includes(",,")) {
        x = x.replace(/,,/g, ",");
      }

      let numbers = x
        .split(",")
        .map((str) => str.trim())
        .filter((str) => str !== "");

      for (let val of numbers) {
        if (!isNumeric(val)) {
          return { error: "Please! Check Your Input" };
        }
      }

      let values = numbers.map(Number).sort((a, b) => a - b);
      let min = Math.min(...values);
      let max = Math.max(...values);
      let count = values.length;
      let sum = values.reduce((a, b) => a + b, 0);
      let range = max - min;
      mean = parseFloat((sum / count).toFixed(5));

      let median;
      if (count % 2 !== 0) {
        median = values[Math.floor(count / 2)];
      } else {
        median = (values[count / 2 - 1] + values[count / 2]) / 2;
      }

      // Mode
      let freq = {};
      let mode = [];
      let maxFreq = 0;

      for (let val of values) {
        freq[val] = (freq[val] || 0) + 1;
        if (freq[val] > maxFreq) {
          maxFreq = freq[val];
        }
      }

      for (let key in freq) {
        if (freq[key] === maxFreq) {
          mode.push(Number(key));
        }
      }

      // Standard deviation, variance
      let d = values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
      let s_d = d / (count - 1);
      let psd = d / count;
      let SD = Math.sqrt(s_d);
      let PSD = Math.sqrt(psd);
      let rsd = (SD / mean) * 100;

      return {
        tech_rsd: rsd,
        tech_min: min,
        tech_max: max,
        tech_count: count,
        tech_sum: sum,
        tech_range: range,
        tech_mean: mean,
        tech_median: median,
        tech_mode: mode,
        tech_SD: SD,
        tech_PSD: PSD,
        tech_svar: s_d,
        tech_pvar: psd,
        tech_form: form,
      };
    } else {
      if (isNumeric(mean) && isNumeric(deviation)) {
        let rsd = (deviation / mean) * 100;
        return {
          tech_rsd: rsd,
          tech_form: form,
        };
      } else {
        return { error: "Please! Check Your Input" };
      }
    }
  }
  /** getCalculationChebyshevTheoremcalculator
   * POST: /api/calculators-lol/chebyshevs-theorem-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationChebyshevTheoremcalculator(body) {
    let operations = body.tech_operations;
    let first = body.tech_first;
    let second = body.tech_second;

    let result = {};
    let pehla, final_fans, final_sans;

    if (operations === 3) {
      if (first > 1) {
        if (second > 1) {
          let sq = Math.pow(first, 2);
          let f_ans = second / sq;
          final_fans = f_ans.toFixed(3);
          let s_ans = f_ans * 100;
          final_sans = s_ans >= 100 ? "100" : s_ans.toFixed(2);
          pehla = first;
        } else {
          return { error: "Please variance enter greater than 1" };
        }
      } else {
        return { error: "Please bound enter greater than 1." };
      }
    } else if (operations === 4) {
      if (first > 1) {
        if (second > 1) {
          let sq = Math.pow(first, 2);
          let f_ans = first * 4;
          let aja = 1 / sq;
          final_fans = aja.toFixed(3);
          let s_ans = aja * 100;
          final_sans = s_ans >= 100 ? "100" : s_ans.toFixed(2);
          pehla = f_ans;
        } else {
          return { error: "Please variance enter greater than 1" };
        }
      } else {
        return { error: "Please bound enter greater than 1." };
      }
    } else if (operations === 5) {
      if (first > 1) {
        pehla = Math.pow(first, 2);
        let aja = 1 / pehla;
        final_fans = aja.toFixed(3);
        final_sans = (1 - aja).toFixed(3);
      } else {
        return { error: "Please bound enter greater than 1." };
      }
    } else if (operations === 6) {
      if (first > 1) {
        pehla = 1 - first;
        let aja = 1 / pehla;
        final_fans = aja.toFixed(3);
        final_sans = aja >= 0 ? Math.sqrt(aja).toFixed(3) : "NaN";
      } else {
        return { error: "Please bound enter greater than 1." };
      }
    } else {
      return { error: "Invalid operation code" };
    }

    result.tech_operations = operations;
    result.tech_pehla = pehla;
    result.tech_final_fans = final_fans;
    result.tech_final_sans = final_sans;

    return result;
  }

  /** getCalculationBoxPlotcalculator
   * POST: /api/calculators-lol/box-plot-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationBoxPlotcalculator(body) {
    let x = body.tech_x;
    let seprate = body.tech_seprate;

    function quartil(arr) {
      let count = arr.length;
      let middleval = Math.floor((count - 1) / 2);
      let median;
      if (count % 2) {
        median = arr[middleval];
      } else {
        let low = arr[middleval];
        let high = arr[middleval + 1];
        median = (low + high) / 2;
      }
      return parseFloat(median.toFixed(1));
    }

    if (!x || x.trim() === "") {
      return { error: "Please! Check Your Input" };
    }

    if (!seprate) {
      seprate = " ";
    }

    let check = true;
    x = x.replace(/[\s,\n\r]+/g, ",");
    while (x.includes(",,")) x = x.replace(/,,/g, ",");

    let numbers = x
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s !== "");
    for (let value of numbers) {
      if (isNaN(value)) {
        check = false;
      }
    }

    if (!check) {
      return { error: "Please! Check Your Input" };
    }

    numbers = numbers.map(Number).sort((a, b) => a - b);

    if (numbers.length < 2) {
      return { error: "Please! enter 2 or more numbers" };
    }

    let maximum = Math.max(...numbers);
    let minimum = Math.min(...numbers);
    let second = quartil(numbers);

    let tmp = { first: [], third: [] };
    for (let val of numbers) {
      if (val > second) {
        tmp.third.push(val);
      } else if (val < second) {
        tmp.first.push(val);
      }
    }

    let first = quartil(tmp.first);
    let third = quartil(tmp.third);

    let count = numbers.length;
    let median;
    if (count % 2 !== 0) {
      let center = Math.floor(count / 2);
      median = numbers[center];
    } else {
      let center = count / 2;
      median = (numbers[center] + numbers[center - 1]) / 2;
    }

    return {
      tech_numbers: numbers,
      tech_count: count,
      tech_first: first,
      tech_third: third,
      tech_median: median,
      tech_maximum: maximum,
    };
  }

  /**
   * getCalculationProbabilityDensityFunctionCalculator: Service Method
   * POST: /api/calculators-lol/probability-density-function-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationProbabilityDensityFunctionCalculator(body) {
    const result = {};

    const select = body.tech_select;
    const a = parseFloat(body.tech_a);
    const b = parseFloat(body.tech_b);
    const c = parseFloat(body.tech_c);

    try {
      if (select == 1) {
        // Beta Distribution
        if (isNumeric(a) && isNumeric(b) && isNumeric(c)) {
          if (c < 0 || c > 1) {
            result.error = "x Must be greater than 0 and less than 1";
            return result;
          }

          const paramA = (a - 1).toString();
          const paramB = (b - 1).toString();
          const parem = `t**(${paramA})(1-t)**(${paramB})`;

          try {
            const params = new URLSearchParams();
            params.append("equ", parem);
            params.append("wrt", "t");
            params.append("lb", "0");
            params.append("ub", "1");

            const response = await axios.post(
              "http://167.172.134.148/only_integral",
              params,
              {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                timeout: 120000,
              }
            );

            const buffer = response.data;
            const B = parseFloat(buffer[0]);
            const ans = (1 / B) * Math.pow(c, a - 1) * Math.pow(1 - c, b - 1);

            result.tech_ans = ans;
            return result;
          } catch (error) {
            console.error("Select 1 Error:", error.message);
            result.error = "Server Busy! Please try again later";
            return result;
          }
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      } else if (select == 2) {
        // Chi-Square Distribution
        if (isNumeric(a) && isNumeric(b)) {
          const paramA = (a / 2 - 1).toString();
          const parem = `t**(${paramA})exp(-t)`;

          try {
            const params = new URLSearchParams();
            params.append("equ", parem);
            params.append("wrt", "t");
            params.append("lb", "0");
            params.append("ub", "oo");

            const response = await axios.post(
              "http://167.172.134.148/only_integral",
              params,
              {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                timeout: 120000,
              }
            );

            const buffer = response.data;
            const B = parseFloat(buffer[0]);
            const ans =
              (1 / (Math.pow(2, a / 2) * B)) *
              Math.pow(b, a / 2 - 1) *
              Math.exp((-1 * b) / 2);

            result.tech_ans = ans;
            return result;
          } catch (error) {
            console.error("Select 2 Error:", error.message);
            result.error = "Server Busy! Please try again later";
            return result;
          }
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      } else if (select == 3) {
        // F Distribution
        if (isNumeric(a) && isNumeric(b) && isNumeric(c)) {
          const paramA = Math.abs(a / 2 - 1).toString();
          const paramB = Math.abs(b / 2 - 1).toString();
          const parem = `t**(${paramA})(1-t)**(${paramB})`;

          try {
            const params = new URLSearchParams();
            params.append("equ", parem);
            params.append("wrt", "t");
            params.append("lb", "0");
            params.append("ub", "1");

            const response = await axios.post(
              "http://167.172.134.148/only_integral",
              params,
              {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                timeout: 120000,
              }
            );

            const buffer = response.data;
            const B = parseFloat(buffer[0]);

            // Calculate numerator and denominator separately for debugging
            const numerator = Math.sqrt(
              (Math.pow(a * c, a) * Math.pow(b, b)) / Math.pow(a * c + b, a + b)
            );
            const denominator = c * B;
            const ans = numerator / denominator;

            result.tech_ans = ans;
            return result;
          } catch (error) {
            console.error("Select 3 Error:", error.message);
            result.error = "Server Busy! Please try again later";
            return result;
          }
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      } else if (select == 4) {
        // Non-central t Distribution
        if (isNumeric(a) && isNumeric(b) && isNumeric(c)) {
          const paramA = (a / 2 - 1).toString();
          const parem = `t**(${paramA})exp(-t)`;

          const u = b;
          const v = a;
          const x = c;
          const uxValue = (u * x).toString();
          const x2PlusV = (Math.pow(x, 2) + v).toString();
          const parem1 = `y**(${v})*exp( -1/2 * ( y- ((${uxValue}) / (sqrt(${x2PlusV}) ) ))**2)`;

          try {
            const params = new URLSearchParams();
            params.append("equ", parem);
            params.append("equ1", parem1);
            params.append("wrt", "t");
            params.append("wrt1", "y");
            params.append("lb", "0");
            params.append("ub", "oo");

            const response = await axios.post(
              "http://167.172.134.148/only_integral",
              params,
              {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                timeout: 120000,
              }
            );

            const buffer = response.data;
            const B = parseFloat(buffer[0]);
            const int = parseFloat(buffer[1]);
            const up1 =
              Math.pow(v, v / 2) *
              Math.exp(
                -1 * ((v * Math.pow(u, 2)) / (2 * (Math.pow(x, 2) + v)))
              );
            const btm =
              up1 /
              (Math.sqrt(Math.PI) *
                B *
                Math.pow(2, (v - 1) / 2) *
                Math.pow(Math.pow(x, 2) + v, (v + 1) / 2));
            const ans = int * btm;

            result.tech_ans = ans;
            return result;
          } catch (error) {
            console.error("Select 4 Error:", error.message);
            result.error = "Server Busy! Please try again later";
            return result;
          }
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      } else if (select == 5) {
        // Normal Distribution
        if (isNumeric(a) && isNumeric(b) && isNumeric(c)) {
          const ans =
            (1 / Math.sqrt(2 * Math.PI * Math.pow(b, 2))) *
            Math.exp(-1 * (Math.pow(c - a, 2) / (2 * Math.pow(b, 2))));

          result.tech_ans = ans;
          return result;
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      } else if (select == 6) {
        // Standard Normal Distribution
        if (isNumeric(c)) {
          const ans =
            (1 / Math.sqrt(2 * Math.PI)) * Math.exp((-1 / 2) * Math.pow(c, 2));

          result.tech_ans = ans;
          return result;
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      } else if (select == 7) {
        // Student's t Distribution
        if (isNumeric(a) && isNumeric(b)) {
          const paramA = (a / 2 - 1).toString();
          const paramB = ((a + 1) / 2 - 1).toString();
          const parem = `t**(${paramA})exp(-t)`;
          const parem1 = `t**(${paramB})exp(-t)`;

          try {
            const params = new URLSearchParams();
            params.append("equ", parem);
            params.append("equ1", parem1);
            params.append("wrt", "t");
            params.append("lb", "0");
            params.append("ub", "oo");

            const response = await axios.post(
              "http://167.172.134.148/only_integral",
              params,
              {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                timeout: 120000,
              }
            );

            const buffer = response.data;
            const B = parseFloat(buffer[0]);
            const B1 = parseFloat(buffer[1]);
            const ans =
              (B1 / (Math.sqrt(a * Math.PI) * B)) *
              Math.pow(1 + Math.pow(b, 2) / a, (-1 / 2) * (a + 1));

            result.tech_ans = ans;
            return result;
          } catch (error) {
            console.error("Select 7 Error:", error.message);
            result.error = "Server Busy! Please try again later";
            return result;
          }
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      } else if (select == 8) {
        // Uniform Distribution
        if (isNumeric(a) && isNumeric(b) && isNumeric(c)) {
          let ans;
          if (c >= a && c <= b) {
            ans = 1 / (b - a);
          } else {
            ans = 0;
          }

          result.tech_ans = ans;
          return result;
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      }

      result.error = "Invalid selection";
      return result;
    } catch (error) {
      console.error("Main Error:", error.message);
      result.error = "An error occurred: " + error.message;
      return result;
    }

    // Helper function to check if value is numeric
    function isNumeric(value) {
      return !isNaN(parseFloat(value)) && isFinite(value);
    }
  }

  /** getCalculationbinomialCoefficientCalculator
   * POST: /api/calculators-lol/binomial-coefficient-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationbinomialCoefficientCalculator(body) {
    const result = {};

    let n = parseInt(body.tech_n);
    let k = parseInt(body.tech_k);

    if (isNaN(n) || isNaN(k)) {
      return { error: "Please! Check Your Input" };
    }

    if (k > n) {
      return { error: "n must be larger than or equal to k" };
    }

    function factorial(x) {
      if (x <= 1) return 1n;
      let fact = 1n;
      for (let i = 2n; i <= BigInt(x); i++) {
        fact *= i;
      }
      return fact;
    }

    try {
      let nFact = factorial(n);
      let kFact = factorial(k);
      let nkFact = factorial(n - k);

      let ans = nFact / (kFact * nkFact);
      result.tech_ans = ans.toString();
      return result;
    } catch (err) {
      return { error: "Please! Try a small number" };
    }
  }
  /** getCalculationPercentileRankcalculator
   * POST: /api/calculators-lol/percentile-rank-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationPercentileRankcalculator(body) {
    let x = body.tech_x;
    let find = Number(body.tech_find);
    let method = Number(body.tech_method);

    if (x && !isNaN(find)) {
      // Clean and normalize input string
      x = x.replace(/[\s,\n\r]+/g, ",");
      while (x.includes(",,")) {
        x = x.replace(/,,/g, ",");
      }

      // Parse numbers
      let numbers = x
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "");
      let values = [];
      let isNum = true;

      for (let i = 0; i < numbers.length; i++) {
        if (!isNaN(numbers[i])) {
          values.push(Number(numbers[i]));
        } else {
          isNum = false;
          break;
        }
      }

      if (isNum) {
        values.sort((a, b) => a - b);
        let count = 0;
        let same = 0;

        for (let i = 0; i < values.length; i++) {
          if (values[i] <= find) count++;
          if (values[i] === find) same++;
        }

        let pr;
        if (method === 1) {
          pr = (count / values.length) * 100;
        } else {
          pr = ((count - 0.5 * same) / values.length) * 100;
        }

        return {
          tech_pr: pr,
          tech_same: same,
          tech_count: count,
          tech_find: find,
          tech_values: values,
        };
      } else {
        return { error: "Please! Enter only numbers" };
      }
    } else {
      return { error: "Please! Check Your Input" };
    }
  }
  /** getCalculationCoinFlipcalculator
   * POST: /api/calculators-lol/coin-flip-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationCoinFlipcalculator(body) {
    let flips = Number(body.tech_flips);
    let heads = Number(body.tech_heads);
    let probablity = Number(body.tech_probablity);
    let type = body.tech_type;

    function factorial(num) {
      let result = 1;
      for (let i = num; i >= 1; i--) {
        result *= i;
      }
      return result;
    }

    function total_calculation(flips, heads, prob2) {
      let sub = flips - heads;
      let f4 = factorial(flips);
      let f5 = factorial(heads);
      let f6 = factorial(sub);
      let power = Math.pow(prob2, heads);
      let power2 = Math.pow(1 - prob2, sub);
      return (f4 / (f5 * f6)) * power * power2;
    }

    if (
      !["1", "2", "3"].includes(type) ||
      isNaN(flips) ||
      isNaN(heads) ||
      isNaN(probablity)
    ) {
      return { error: "Please! Check Your Input" };
    }

    if (flips < heads) {
      return {
        error:
          "The number of obtained heads cannot be greater than the number of tosses.",
      };
    }

    if (
      (type === "1" && (flips <= 0 || heads <= 0)) ||
      (type !== "1" && (flips < 0 || heads < 0))
    ) {
      return { error: "Enter Value Greater than zero" };
    }

    if (probablity < 0 || probablity > 1) {
      return { error: "Probablity must be between 0 and 1 inclusive" };
    }

    let sub = flips - heads;
    let f1 = factorial(flips);
    let f2 = factorial(heads);
    let f3 = factorial(sub);
    let powerP = Math.pow(probablity, heads);
    let powerP2 = Math.pow(1 - probablity, sub);
    let ans = (f1 / (f2 * f3)) * powerP * powerP2;

    let param = {
      tech_type: type,
      tech_flips: flips,
      tech_heads: heads,
      tech_probablity: probablity,
      tech_ans: ans,
    };

    if (type === "2") {
      let awa = [];
      for (let i = heads + 1; i <= flips; i++) {
        awa.push(total_calculation(flips, i, probablity));
      }
      param.tech_array_awa = awa;
      param.tech_summer = awa.reduce((a, b) => a + b, 0);
    }

    if (type === "3") {
      let awa = [];
      for (let i = 0; i <= heads; i++) {
        awa.push(total_calculation(flips, i, probablity));
      }
      param.tech_array_awa = awa;
      param.tech_summer = awa.reduce((a, b) => a + b, 0);
    }

    return param;
  }

  /** getCalculationRowScoreCalculator
   * POST: /api/calculators-lol/raw-score-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationRowScoreCalculator(body) {
    const result = {};

    let mean = parseFloat(body.tech_mean);
    let standardDeviation = parseFloat(body.tech_standard_daviation);
    let zScore = parseFloat(body.tech_z_score);
    let type = body.tech_type?.toString().trim();

    if (isNaN(mean) || isNaN(standardDeviation) || isNaN(zScore)) {
      return { error: "Please! Check Your Input" };
    }

    let res = mean + zScore * standardDeviation;

    result.tech_mean = mean;
    result.tech_standard_daviation = standardDeviation;
    result.tech_z_score = zScore;
    result.tech_res = res;
    result.tech_type = type;

    return result;
  }
  /**
   * getCalculationeffectSizeCalculator: Service Method
   * POST: /api/calculators-lol/effect-size-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationeffectSizeCalculator(body) {
    const result = {};

    // Extract and trim all request parameters
    const effectType = body.tech_effect_type?.toString().trim();
    const ronding = parseInt(body.tech_ronding?.toString().trim()) || 2;
    const c_x1 = parseFloat(body.tech_c_x1?.toString().trim());
    const c_s = parseFloat(body.tech_c_s?.toString().trim());
    const c_pm = parseFloat(body.tech_c_pm?.toString().trim());
    const x1 = parseFloat(body.tech_x1?.toString().trim());
    const x2 = parseFloat(body.tech_x2?.toString().trim());
    const n1 = parseFloat(body.tech_n1?.toString().trim());
    const n2 = parseFloat(body.tech_n2?.toString().trim());
    const s1 = parseFloat(body.tech_s1?.toString().trim());
    const s2 = parseFloat(body.tech_s2?.toString().trim());
    const p1 = parseFloat(body.tech_p1?.toString().trim());
    const p2 = parseFloat(body.tech_p2?.toString().trim());
    const ph_x2 = parseFloat(body.tech_ph_x2?.toString().trim());
    const ph_n1 = parseFloat(body.tech_ph_n1?.toString().trim());
    const cr_x2 = parseFloat(body.tech_cr_x2?.toString().trim());
    const cr_n1 = parseFloat(body.tech_cr_n1?.toString().trim());
    const row = parseFloat(body.tech_row?.toString().trim());
    const col = parseFloat(body.tech_col?.toString().trim());
    const ssr = parseFloat(body.tech_ssr?.toString().trim());
    const sst = parseFloat(body.tech_sst?.toString().trim());
    const ssg = parseFloat(body.tech_ssg?.toString().trim());
    const et_sst = parseFloat(body.tech_et_sst?.toString().trim());
    const r2f = parseFloat(body.tech_r2f?.toString().trim());
    const f2r = parseFloat(body.tech_f2r?.toString().trim());
    const t_value = parseFloat(body.tech_t_value?.toString().trim());
    const df = parseFloat(body.tech_df?.toString().trim());

    if (!effectType) {
      result.error = "Please! Check Your Input";
      return result;
    }

    const isNumeric = (value) => !isNaN(value) && isFinite(value);

    try {
      if (effectType === "cohen2e") {
        if (
          isNumeric(x1) &&
          isNumeric(x2) &&
          isNumeric(n1) &&
          isNumeric(n2) &&
          isNumeric(s1) &&
          isNumeric(s2)
        ) {
          const s1pow = Math.pow(s1, 2);
          const s2pow = Math.pow(s2, 2);
          const res = (n1 - 1) * Math.pow(s1, 2) + (n2 - 1) * Math.pow(s2, 2);
          const res2 = n1 + n2 - 2;
          const sqr = res / res2;
          const sqrt = Math.sqrt(sqr);
          const x1x2 = Math.abs(x1 - x2);
          const d = x1x2 / sqrt;
          const cohen2e = parseFloat(d.toFixed(ronding));

          Object.assign(result, {
            tech_x1: x1,
            tech_x2: x2,
            tech_n1: n1,
            tech_n2: n2,
            tech_s1: s1,
            tech_s2: s2,
            tech_s1pow: s1pow,
            tech_s2pow: s2pow,
            tech_res: res,
            tech_res2: res2,
            tech_sqr: sqr,
            tech_sqrt: sqrt,
            tech_x1x2: x1x2,
            tech_d: d,
            tech_cohen2e: cohen2e,
          });
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      } else if (effectType === "cohen2u") {
        if (
          isNumeric(x1) &&
          isNumeric(x2) &&
          isNumeric(n1) &&
          isNumeric(n2) &&
          isNumeric(s1) &&
          isNumeric(s2)
        ) {
          const s1pow = Math.pow(s1, 2);
          const s2pow = Math.pow(s2, 2);
          const res = s1pow + s2pow;
          const sqr = res / 2;
          const sqrt = Math.sqrt(sqr);
          const x1x2 = Math.abs(x1 - x2);
          const d = Math.abs(x1 - x2) / sqrt;
          const cohen2u = parseFloat(d.toFixed(ronding));

          Object.assign(result, {
            tech_x1: x1,
            tech_x2: x2,
            tech_n1: n1,
            tech_n2: n2,
            tech_s1: s1,
            tech_s2: s2,
            tech_s1pow: s1pow,
            tech_s2pow: s2pow,
            tech_res: res,
            tech_sqr: sqr,
            tech_sqrt: sqrt,
            tech_x1x2: x1x2,
            tech_d: d,
            tech_cohen2u: cohen2u,
          });
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      } else if (effectType === "cohen") {
        if (isNumeric(c_x1) && isNumeric(c_s) && isNumeric(c_pm)) {
          const d = c_x1 - c_pm;
          const c = Math.abs(d);
          const res = Math.abs(d) / c_s;
          const cohen = parseFloat(res.toFixed(ronding));

          Object.assign(result, {
            tech_c_x1: c_x1,
            tech_c_s: c_s,
            tech_c_pm: c_pm,
            tech_res: res,
            tech_c: c,
            tech_d: d,
            tech_cohen: cohen,
          });
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      } else if (effectType === "h") {
        if (isNumeric(p1) && isNumeric(p2)) {
          const p1sqr = Math.sqrt(p1);
          const p2sqr = Math.sqrt(p2);
          const arcp1 = Math.asin(p1sqr);
          const arcp2 = Math.asin(p2sqr);
          const res = 2 * (Math.asin(p1sqr) - Math.asin(p2sqr));
          const h = parseFloat(res.toFixed(ronding));

          Object.assign(result, {
            tech_p1: p1,
            tech_p2: p2,
            tech_p1sqr: p1sqr,
            tech_p2sqr: p2sqr,
            tech_arcp1: arcp1,
            tech_arcp2: arcp2,
            tech_h: h,
          });
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      } else if (effectType === "phi") {
        if (isNumeric(ph_x2) && isNumeric(ph_n1)) {
          const res = ph_x2 / ph_n1;
          const p = Math.sqrt(res);
          const phi = parseFloat(p.toFixed(ronding));

          Object.assign(result, {
            tech_ph_x2: ph_x2,
            tech_ph_n1: ph_n1,
            tech_res: res,
            tech_p: p,
            tech_phi: phi,
          });
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      } else if (effectType === "cramer") {
        if (
          isNumeric(cr_x2) &&
          isNumeric(cr_n1) &&
          isNumeric(row) &&
          isNumeric(col)
        ) {
          const r = row - 1;
          const c = col - 1;
          const min = Math.min(r, c);
          const res = cr_n1 * min;
          const v = cr_x2 / res;
          const x = Math.sqrt(v);
          const cramer = parseFloat(x.toFixed(ronding));

          Object.assign(result, {
            tech_cr_x2: cr_x2,
            tech_cr_n1: cr_n1,
            tech_row: row,
            tech_col: col,
            tech_r: r,
            tech_c: c,
            tech_min: min,
            tech_res: res,
            tech_v: v,
            tech_cramer: cramer,
          });
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      } else if (effectType === "r2") {
        if (isNumeric(ssr) && isNumeric(sst)) {
          const r = ssr / sst;
          const res = 1 - r;
          const f2 = r / res;
          const r2 = parseFloat(f2.toFixed(ronding));

          Object.assign(result, {
            tech_ssr: ssr,
            tech_sst: sst,
            tech_r: r,
            tech_res: res,
            tech_f2: f2,
            tech_r2: r2,
          });
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      } else if (effectType === "eta2") {
        if (isNumeric(ssg) && isNumeric(et_sst)) {
          const et = ssg / et_sst;
          const res = 1 - et;
          const e = et / res;
          const eta2 = parseFloat(e.toFixed(ronding));

          Object.assign(result, {
            tech_ssg: ssg,
            tech_et_sst: et_sst,
            tech_et: et,
            tech_res: res,
            tech_eta2: eta2,
          });
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      } else if (effectType === "r2f") {
        if (isNumeric(row)) {
          const res = 1 - r2f;
          const r = r2f / res;
          const rf = parseFloat(r.toFixed(ronding));

          Object.assign(result, {
            tech_r2f: r2f,
            tech_res: res,
            tech_r: r,
            tech_rf: rf,
          });
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      } else if (effectType === "f2r") {
        if (isNumeric(f2r)) {
          const res = 1 + f2r;
          const f = f2r / res;
          const fr = parseFloat(f.toFixed(ronding));

          Object.assign(result, {
            tech_f2r: f2r,
            tech_res: res,
            tech_f: f,
            tech_fr: fr,
          });
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      } else if (effectType === "dr") {
        if (isNumeric(t_value) && isNumeric(df)) {
          const res = 2 * t_value;
          const t = Math.pow(t_value, 2);
          const res2 = t + df;
          const ry = t / res2;
          const ryres = Math.sqrt(ry);
          const dfsqr = Math.sqrt(df);
          const d = res / dfsqr;
          const dr = parseFloat(d.toFixed(ronding));
          const r = parseFloat(ryres.toFixed(ronding));

          Object.assign(result, {
            tech_t_value: t_value,
            tech_df: df,
            tech_res: res,
            tech_d: d,
            tech_dr: dr,
            tech_dfsqr: dfsqr,
            tech_t: t,
            tech_res2: res2,
            tech_ry: ry,
            tech_r: r,
          });
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      } else {
        result.error = "Please! Check Your Input";
        return result;
      }

      result.tech_effect_type = effectType;
      return result;
    } catch (error) {
      result.error = "Calculation error: " + error.message;
      return result;
    }
  }
  /** getCalculationEmpiricalProbabilityCalculator
   * POST: /api/calculators-lol/empirical-probability-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationEmpiricalProbabilityCalculator(body) {
    const result = {};

    let first = parseFloat(body.tech_first);
    let second = parseFloat(body.tech_second);

    if (isNaN(first) || isNaN(second) || second === 0) {
      return { error: "Please! Check Your Input" };
    }

    let answer = parseFloat((first / second).toFixed(2));

    result.tech_answer = answer;
    result.tech_first = first;
    result.tech_second = second;

    return result;
  }

  async getCalculationSSEcalculator(body) {
    let x = body.tech_x;
    let y = body.tech_y;

    function sigFig(value, digits) {
      if (value === "") return null;
      if (value === 0) {
        return 0;
      }
      const decimalPlaces =
        digits - Math.floor(Math.log10(Math.abs(value))) - 1;
      return parseFloat(value.toFixed(decimalPlaces));
    }

    if (!x || !y) {
      return { error: "Please! Check Your Input" };
    }

    x = x
      .split(",")
      .map((val) => val.trim())
      .filter((val) => val !== "");
    y = y
      .split(",")
      .map((val) => val.trim())
      .filter((val) => val !== "");
    const n = x.length;

    if (n !== y.length) {
      return {
        error:
          "The number of values should be same in both sample data inputs.",
      };
    }

    let check = true;
    x = x.map((val, i) => {
      if (isNaN(val) || isNaN(y[i])) {
        check = false;
      }
      return Number(val);
    });
    y = y.map(Number);

    if (!check) {
      return { error: "Please! Check Your Input" };
    }

    let xi_sum = 0;
    let yi_sum = 0;
    let xy_sum = 0;

    for (let i = 0; i < n; i++) {
      xi_sum += x[i] ** 2;
      yi_sum += y[i] ** 2;
      xy_sum += x[i] * y[i];
    }

    const x_sum = x.reduce((a, b) => a + b, 0);
    const y_sum = y.reduce((a, b) => a + b, 0);

    const ss_xx = xi_sum - x_sum ** 2 / n;
    const ss_yy = yi_sum - y_sum ** 2 / n;
    const ss_xy = xy_sum - (x_sum * y_sum) / n;
    const beta_1 = ss_xy / ss_xx;
    const beta_0 = y_sum / n - beta_1 * (x_sum / n);
    const ss_r = beta_1 * ss_xy;
    const ss_e = ss_yy - ss_r;

    return {
      tech_x: x,
      tech_y: y,
      tech_n: n,
      tech_x_sum: x_sum,
      tech_xi_sum: xi_sum,
      tech_y_sum: y_sum,
      tech_yi_sum: yi_sum,
      tech_xy_sum: xy_sum,
      tech_ss_xx: ss_xx,
      tech_ss_yy: ss_yy,
      tech_ss_xy: ss_xy,
      tech_beta_1: beta_1,
      tech_beta_0: beta_0,
      tech_ss_r: ss_r,
      tech_ss_e: sigFig(ss_e, 5),
    };
  }

  /** getCalculationPredictionIntervalcalculator
   * POST: /api/calculators-lol/prediction-interval-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationPredictionIntervalcalculator(body) {
    let x = body.tech_x;
    let y = body.tech_y;
    let confidence = parseFloat(body.tech_confidence);
    let prediction = parseFloat(body.tech_prediction);

    let number = true;
    let equal = false;
    let array_num = 0;
    let x_sqr = [];
    let y_sqr = [];
    let x_sqr_sum = 0;
    let y_sqr_sum = 0;
    let x_mul_y = [];
    let xy_sum = 0;
    let x_sum = 0;
    let y_sum = 0;

    x = x.replace(/[\s,\n\r]+/g, ",");
    y = y.replace(/[\s,\n\r]+/g, ",");

    let array_x = x
      .split(",")
      .map((val) => val.trim())
      .filter((val) => val !== "");
    let array_y = y
      .split(",")
      .map((val) => val.trim())
      .filter((val) => val !== "");

    let level = 1 - confidence;
    let confidence_per = (confidence * 100).toFixed(0) + "%";

    array_x.forEach((val) => {
      if (isNaN(val)) number = false;
    });
    array_y.forEach((val) => {
      if (isNaN(val)) number = false;
    });

    if (array_x.length === array_y.length) {
      equal = true;
    }

    if (number && equal && !isNaN(confidence) && !isNaN(prediction)) {
      array_x = array_x.map(Number);
      array_y = array_y.map(Number);
      array_num = array_x.length;
      x_sum = array_x.reduce((a, b) => a + b, 0);
      y_sum = array_y.reduce((a, b) => a + b, 0);

      x_sqr = array_x.map((n) => n ** 2);
      y_sqr = array_y.map((n) => n ** 2);

      x_sqr_sum = x_sqr.reduce((a, b) => a + b, 0);
      y_sqr_sum = y_sqr.reduce((a, b) => a + b, 0);

      for (let i = 0; i < array_num; i++) {
        x_mul_y[i] = array_x[i] * array_y[i];
      }

      xy_sum = x_mul_y.reduce((a, b) => a + b, 0);

      let ssxx = parseFloat(
        (x_sqr_sum - (1 / array_num) * x_sum ** 2).toFixed(4)
      );
      let ssyy = parseFloat(
        (y_sqr_sum - (1 / array_num) * y_sum ** 2).toFixed(4)
      );
      let ssxy = parseFloat(
        (xy_sum - (1 / array_num) * x_sum * y_sum).toFixed(4)
      );

      let mean_x = parseFloat((x_sum / array_num).toFixed(4));
      let mean_y = parseFloat((y_sum / array_num).toFixed(4));

      let b1 = parseFloat((ssxy / ssxx).toFixed(4));
      let b0 = parseFloat((mean_y - b1 * mean_x).toFixed(4));
      let Y = parseFloat((b0 + b1 * prediction).toFixed(4));

      let ssRegression = parseFloat((b1 * ssxy).toFixed(4));
      let ssError = parseFloat((ssyy - ssRegression).toFixed(4));
      let mse = parseFloat((ssError / (array_num - 2)).toFixed(4));
      let errorEst = parseFloat(Math.sqrt(mse).toFixed(4));

      let E = parseFloat(
        (
          2.16 *
          Math.sqrt(
            mse * (1 + 1 / array_num + (prediction - mean_x) ** 2 / ssxx)
          )
        ).toFixed(4)
      );

      let piPov = Y - E;
      let piNeg = Y + E;

      return {
        tech_confidence_per: confidence_per,
        tech_level: level,
        tech_prediction: prediction,
        tech_array_num: array_num,
        tech_array_x: array_x,
        tech_array_y: array_y,
        tech_x_sum: x_sum,
        tech_y_sum: y_sum,
        tech_x_sqr: x_sqr,
        tech_y_sqr: y_sqr,
        tech_x_sqr_sum: x_sqr_sum,
        tech_y_sqr_sum: y_sqr_sum,
        tech_x_mul_y: x_mul_y,
        tech_xy_sum: xy_sum,
        tech_ssxx: ssxx,
        tech_ssyy: ssyy,
        tech_ssxy: ssxy,
        tech_mean_x: mean_x,
        tech_mean_y: mean_y,
        tech_b1: b1,
        tech_b0: b0,
        tech_Y: Y,
        tech_ssRegression: ssRegression,
        tech_ssError: ssError,
        tech_mse: mse,
        tech_errorEst: errorEst,
        tech_E: E,
        tech_piPov: piPov,
        tech_piNeg: piNeg,
      };
    } else {
      return { error: "Please! Check Your Input" };
    }
  }

  /** getCalculationScatterPlotMakercalculator
   * POST: /api/calculators-lol/scatter-plot-maker
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationScatterPlotMakercalculator(body) {
    let x = body.tech_x;
    let y = body.tech_y;
    let title = body.tech_title;
    let xaxis = body.tech_xaxis;
    let yaxis = body.tech_yaxis;
    let xmin = body.tech_xmin;
    let xmax = body.tech_xmax;
    let ymin = body.tech_ymin;
    let ymax = body.tech_ymax;
    let position = body.tech_position;
    let align = body.tech_align;

    if ((!x || x.trim() === "") && (!y || y.trim() === "")) {
      return { error: "Please! Check Your Input" };
    }

    x = x.replace(/[\s,\n\r]+/g, ",");
    y = y.replace(/[\s,\n\r]+/g, ",");

    let xArr = x
      .split(",")
      .map((val) => val.trim())
      .filter((val) => val !== "");
    let yArr = y
      .split(",")
      .map((val) => val.trim())
      .filter((val) => val !== "");

    let n = xArr.length;
    if (n !== yArr.length) {
      return {
        error:
          "The number of values should be same in both sample data inputs.",
      };
    }

    let check = true;
    for (let i = 0; i < n; i++) {
      if (isNaN(xArr[i]) || isNaN(yArr[i])) {
        check = false;
      }
    }

    if (!check) {
      return { error: "Invalid numeric values in x or y array." };
    }

    if (!title || title.trim() === "") title = "Scatter Plot";
    if (!xaxis || xaxis.trim() === "") xaxis = "X";
    if (!yaxis || yaxis.trim() === "") yaxis = "Y";

    return {
      tech_x: xArr.map(Number),
      tech_y: yArr.map(Number),
      tech_title: title,
      tech_xaxis: xaxis,
      tech_yaxis: yaxis,
      tech_xmin: xmin,
      tech_xmax: xmax,
      tech_ymin: ymin,
      tech_ymax: ymax,
      tech_position: position,
      tech_align: align,
    };
  }

  /** getCalculationResidualcalculator
   * POST: /api/calculators-lol/residual-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationResidualcalculator(body) {
    let x = body.tech_x;
    let y = body.tech_y;

    if ((!x || x.trim() === "") && (!y || y.trim() === "")) {
      return { error: "Please! Check Your Input" };
    }

    let xArr = x
      .split(",")
      .map((val) => val.trim())
      .filter((val) => val !== "");
    let yArr = y
      .split(",")
      .map((val) => val.trim())
      .filter((val) => val !== "");

    let n = xArr.length;
    if (n !== yArr.length) {
      return {
        error: "The number of values should be same in both data inputs.",
      };
    }

    let check = true;
    for (let i = 0; i < n; i++) {
      if (isNaN(xArr[i]) || isNaN(yArr[i])) {
        check = false;
        break;
      }
    }

    if (!check) {
      return { error: "Please! Check Your Input" };
    }

    xArr = xArr.map(Number);
    yArr = yArr.map(Number);

    let xi_sum = 0,
      yi_sum = 0,
      xy_sum = 0;
    let y_bar = [],
      yy_bar = [];

    for (let i = 0; i < n; i++) {
      xi_sum += xArr[i] ** 2;
      yi_sum += yArr[i] ** 2;
      xy_sum += xArr[i] * yArr[i];
    }

    let x_sum = xArr.reduce((a, b) => a + b, 0);
    let y_sum = yArr.reduce((a, b) => a + b, 0);

    let ss_xx = xi_sum - x_sum ** 2 / n;
    let ss_yy = yi_sum - y_sum ** 2 / n;
    let ss_xy = xy_sum - (x_sum * y_sum) / n;

    let beta_1 = ss_xy / ss_xx;
    let beta_0 = y_sum / n - beta_1 * (x_sum / n);

    for (let i = 0; i < n; i++) {
      let predicted = beta_0 + beta_1 * xArr[i];
      y_bar.push(predicted);
      yy_bar.push(yArr[i] - predicted);
    }

    return {
      tech_x: xArr,
      tech_y: yArr,
      tech_n: n,
      tech_x_sum: x_sum,
      tech_xi_sum: xi_sum,
      tech_y_sum: y_sum,
      tech_yi_sum: yi_sum,
      tech_xy_sum: xy_sum,
      tech_ss_xx: ss_xx,
      tech_ss_yy: ss_yy,
      tech_ss_xy: ss_xy,
      tech_beta_1: beta_1,
      tech_beta_0: beta_0,
      tech_y_bar: y_bar,
      tech_yy_bar: yy_bar,
    };
  }

  /** getCalculationResidualPlotcalculator
   * POST: /api/calculators-lol/residual-plot-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationResidualPlotcalculator(body) {
    let x = body.tech_x;
    let y = body.tech_y;

    if (!x || !y) {
      return { error: "Please! Check Your Input" };
    }

    let xArr = x
      .split(",")
      .map((val) => val.trim())
      .filter((val) => val !== "");
    let yArr = y
      .split(",")
      .map((val) => val.trim())
      .filter((val) => val !== "");

    let n = xArr.length;
    if (n !== yArr.length) {
      return {
        error: "The number of values should be same in both data inputs.",
      };
    }

    let check = true;
    for (let i = 0; i < n; i++) {
      if (isNaN(xArr[i]) || isNaN(yArr[i])) {
        check = false;
        break;
      }
    }

    if (!check) {
      return { error: "Please! Check Your Input" };
    }

    // Convert strings to numbers
    let xNums = xArr.map(Number);
    let yNums = yArr.map(Number);

    let xi_sum = 0;
    let yi_sum = 0;
    let xy_sum = 0;

    for (let i = 0; i < n; i++) {
      xi_sum += xNums[i] ** 2;
      yi_sum += yNums[i] ** 2;
      xy_sum += xNums[i] * yNums[i];
    }

    let x_sum = xNums.reduce((a, b) => a + b, 0);
    let y_sum = yNums.reduce((a, b) => a + b, 0);

    let ss_xx = xi_sum - x_sum ** 2 / n;
    let ss_yy = yi_sum - y_sum ** 2 / n;
    let ss_xy = xy_sum - (x_sum * y_sum) / n;

    let beta_1 = ss_xy / ss_xx;
    let beta_0 = y_sum / n - beta_1 * (x_sum / n);

    let y_bar = [];
    let yy_bar = [];

    for (let i = 0; i < n; i++) {
      let predicted = beta_0 + beta_1 * xNums[i];
      y_bar.push(predicted);
      yy_bar.push(yNums[i] - predicted);
    }

    return {
      tech_x: xNums,
      tech_y: yNums,
      tech_n: n,
      tech_x_sum: x_sum,
      tech_y_sum: y_sum,
      tech_xi_sum: xi_sum,
      tech_yi_sum: yi_sum,
      tech_xy_sum: xy_sum,
      tech_ss_xx: ss_xx,
      tech_ss_yy: ss_yy,
      tech_ss_xy: ss_xy,
      tech_beta_0: beta_0,
      tech_beta_1: beta_1,
      tech_y_bar: y_bar,
      tech_yy_bar: yy_bar,
    };
  }
  /**
   * getCalculationDecileCalculator: Service Method
   * POST: /api/calculators-lol/decile-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationDecileCalculator(body) {
    const x = body.tech_x;
    const decile = body.tech_decile;

    const param = {};
    let check = true;

    // Check if x is empty
    if (!x || x.trim() === "") {
      check = false;
    }

    // Replace spaces, commas, and newlines with commas
    let cleanedX = x.replace(/[\s,\n\r]+/g, ",");

    // Remove consecutive commas
    while (cleanedX.includes(",,")) {
      cleanedX = cleanedX.replace(/,,/g, ",");
    }

    // Split and filter the numbers
    const numbers = cleanedX
      .split(",")
      .map((val) => val.trim())
      .filter((val) => val !== "");

    // Validate all values are numeric
    for (const value of numbers) {
      if (isNaN(value) || value === "") {
        check = false;
        break;
      }
    }

    if (check === true) {
      // Chunk array into pairs of 2
      const sortArray = [];
      for (let i = 0; i < numbers.length; i += 2) {
        sortArray.push(numbers.slice(i, i + 2));
      }

      // Create ans_list by combining pairs with decimal point (keep as strings like PHP)
      const ansList = [];
      for (const value of sortArray) {
        if (value.length === 2) {
          ansList.push(value[0] + "." + value[1]);
        } else {
          ansList.push(value[0]);
        }
      }

      const totalValues = sortArray.length;
      const decilePos = (totalValues + 1) * (decile / 10);

      let mainAns;

      // Check if decile position is not a whole number
      if (!Number.isInteger(decilePos)) {
        const floorVal = Math.floor(decilePos);
        const ceilVal = Math.ceil(decilePos);
        const listFloorVal = ansList[floorVal - 1]; // Can be undefined if floorVal is 0
        const listCeilVal = ansList[ceilVal - 1]; // Can be undefined if ceilVal exceeds array length
        const floorMinus = decilePos - floorVal;

        // Convert to numbers for calculation
        // PHP treats null/undefined as 0 in arithmetic operations
        const numFloorVal = listFloorVal ? parseFloat(listFloorVal) : 0;
        const numCeilVal = listCeilVal ? parseFloat(listCeilVal) : 0;

        mainAns = numFloorVal + floorMinus * (numCeilVal - numFloorVal);

        param.tech_floor_val = floorVal;
        param.tech_ceil_val = ceilVal;
        param.tech_list_floor_val = listFloorVal || null;
        param.tech_list_ceil_val = listCeilVal || null;
        param.tech_floor_minus = floorMinus;
      } else {
        mainAns = parseFloat(ansList[decilePos - 1]);
      }

      param.tech_main_ans = mainAns;
      param.tech_total_values = totalValues;
      param.tech_ans_list = ansList;
      param.tech_decile_pos = decilePos;
    } else {
      param.error = "Please! Check Your Input";
      return param;
    }

    return param;
  }

  /**
   * getCalculationClassWidthCalculator: Service Method
   * POST: /api/calculators-lol/class-width-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationClassWidthCalculator(body) {
    const lowerBound = parseFloat(body.tech_lowerBound?.toString().trim()); // Changed from "minimum"
    const upperBound = parseFloat(body.tech_upperBound?.toString().trim()); // Changed from "maximum"
    const totalParts = parseFloat(body.tech_totalParts?.toString().trim()); // Changed from "number"

    const response = {};

    if (!isNaN(lowerBound) && !isNaN(upperBound) && !isNaN(totalParts)) {
      if (lowerBound < upperBound) {
        const width = (upperBound - lowerBound) / totalParts;
        const answer = Math.abs(width);

        response.tech_answer = answer;
        response.tech_lowerBound = lowerBound;
        response.tech_upperBound = upperBound;
        response.tech_totalParts = totalParts;
      } else {
        response.error =
          "The upper bound value must be greater than the lower bound value.";
      }
    } else {
      response.error = "Please! Check Your Input";
    }

    return response;
  }
  /** getCalculationRelativeRiskCalculator
   * POST: /api/calculators-lol/relative-risk-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationRelativeRiskCalculator(body) {
    const result = {};

    let e_disease = parseFloat(body.tech_e_disease);
    let e_no_disease = parseFloat(body.tech_e_no_disease);
    let c_disease = parseFloat(body.tech_c_disease);
    let c_no_disease = parseFloat(body.tech_c_no_disease);
    let confidenceLevel = body.tech_confidenceLevel; // Optional, not used in this logic
    let z_score = body.tech_z_score; // Optional, not used in this logic

    if (
      isNaN(e_disease) ||
      isNaN(e_no_disease) ||
      isNaN(c_disease) ||
      isNaN(c_no_disease)
    ) {
      return { error: "Please! Check Your Input" };
    }

    let riskExposed = e_disease / (e_disease + e_no_disease);
    let riskControl = c_disease / (c_disease + c_no_disease);
    let relative = riskExposed / riskControl;

    result.tech_relative = relative;
    result.tech_riskExposed = riskExposed;
    result.tech_riskControl = riskControl;

    return result;
  }

  /** getCalculationErrorPropagationcalculator
   * POST: /api/calculators-lol/error-propagation-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationErrorPropagationcalculator(body) {
    let x = parseFloat(body.tech_x);
    let y = parseFloat(body.tech_y);
    let delta_x = parseFloat(body.tech_delta_x);
    let delta_y = parseFloat(body.tech_delta_y);
    let optionSelect = body.tech_optionSelect;

    if (isNaN(x) || isNaN(y)) {
      return { error: "Please! Check Your Input" };
    }

    let z, delta_z;

    if (optionSelect) {
      if (optionSelect === "addition") {
        z = x + y;
        delta_z = Math.sqrt(Math.pow(delta_x, 2) + Math.pow(delta_y, 2));
      } else if (optionSelect === "subtraction") {
        z = x - y;
        delta_z = Math.sqrt(Math.pow(delta_x, 2) + Math.pow(delta_y, 2));
      } else if (optionSelect === "multiplication") {
        z = x * y;
        delta_z =
          z * Math.sqrt(Math.pow(delta_x / x, 2) + Math.pow(delta_y / y, 2));
      } else if (optionSelect === "division") {
        z = x / y;
        delta_z =
          z * Math.sqrt(Math.pow(delta_x / x, 2) + Math.pow(delta_y / y, 2));
      } else {
        return { error: "Invalid operation type" };
      }
    } else {
      return { error: "Option select is required" };
    }

    return {
      tech_z: z,
      tech_delta_z: delta_z,
    };
  }
  /**
   * getCalculationPertCalculator: Service Method
   * POST: /api/calculators-lol/pert-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationPertCalculator(body) {
    const optimistic = String(body.tech_optimistic || "").trim();
    const optimistic_one = String(body.tech_optimistic_one || "").trim();
    const optimistic_sec = String(body.tech_optimistic_sec || "").trim();
    const optimistic_unit = String(body.tech_optimistic_unit || "").trim();
    const pessimistic = String(body.tech_pessimistic || "").trim();
    const pessimistic_one = String(body.tech_pessimistic_one || "").trim();
    const pessimistic_sec = String(body.tech_pessimistic_sec || "").trim();
    const pessimistic_unit = String(body.tech_pessimistic_unit || "").trim();
    const most = String(body.tech_most || "").trim();
    const most_one = String(body.tech_most_one || "").trim();
    const most_sec = String(body.tech_most_sec || "").trim();
    const most_unit = String(body.tech_most_unit || "").trim();
    const desired = String(body.tech_desired || "").trim();
    const desired_one = String(body.tech_desired_one || "").trim();
    const desired_sec = String(body.tech_desired_sec || "").trim();
    const desired_unit = String(body.tech_desired_unit || "").trim();
    const output_unit = String(body.tech_output_unit || "").trim();
    const deviation_unit = String(body.tech_deviation_unit || "").trim();

    const param = {};

    // Helper function: time_unit
    function time_unit(optimistic, optimistic_unit) {
      let value = parseFloat(optimistic);
      if (optimistic_unit == "hrs") {
        value = value * 24;
      } else if (optimistic_unit == "days") {
        value = value * 1;
      } else if (optimistic_unit == "wks") {
        value = value / 7;
      } else if (optimistic_unit == "mos") {
        value = value / 30.417;
      } else if (optimistic_unit == "yrs") {
        value = value / 365;
      }
      return value;
    }

    // Helper function: other_time
    function other_time(optimistic_one, optimistic_sec, optimistic_unit) {
      let value;
      const val1 = parseFloat(optimistic_one);
      const val2 = parseFloat(optimistic_sec);

      if (optimistic_unit == "yrs/mos") {
        value = val1 * 365 + val2 * 30.417;
      } else if (optimistic_unit == "wks/days") {
        value = val1 * 7 + val2;
      } else if (optimistic_unit == "days/hrs") {
        value = val1 + val2 / 24;
      }
      return value;
    }

    // Helper function: secore
    function secore(x) {
      const pi = 3.1415927;
      const a = (8 * (pi - 3)) / (3 * pi * (4 - pi));
      const x2 = x * x;
      const ax2 = a * x2;
      const num = 4 / pi + ax2;
      const denom = 1 + ax2;
      const inner = (-x2 * num) / denom;
      const secore2 = 1 - Math.exp(inner);
      return Math.sqrt(secore2);
    }

    // Helper function: cdf
    function cdf(n) {
      if (n < 0) {
        return (1 - secore(n / Math.sqrt(2))) / 2;
      } else {
        return (1 + secore(n / Math.sqrt(2))) / 2;
      }
    }

    // Validation
    if (
      !isNaN(optimistic) &&
      !isNaN(pessimistic) &&
      !isNaN(most) &&
      !isNaN(desired)
    ) {
      // Process optimistic
      let optimistic_val;
      if (
        optimistic_unit === "yrs/mos" ||
        optimistic_unit === "wks/days" ||
        optimistic_unit === "days/hrs"
      ) {
        if (!isNaN(optimistic_one) && !isNaN(optimistic_sec)) {
          optimistic_val = other_time(
            optimistic_one,
            optimistic_sec,
            optimistic_unit
          );
          param.tech_optimistic = optimistic_val;
        } else {
          param.error = "Please! Check Your Input";
          return param;
        }
      } else {
        optimistic_val = time_unit(optimistic, optimistic_unit);
      }

      // Process pessimistic
      let pessimistic_val;
      if (
        pessimistic_unit === "yrs/mos" ||
        pessimistic_unit === "wks/days" ||
        pessimistic_unit === "days/hrs"
      ) {
        if (!isNaN(pessimistic_one) && !isNaN(pessimistic_sec)) {
          pessimistic_val = other_time(
            pessimistic_one,
            pessimistic_sec,
            pessimistic_unit
          );
          param.tech_pessimistic = pessimistic_val;
        } else {
          param.error = "Please! Check Your Input";
          return param;
        }
      } else {
        pessimistic_val = time_unit(pessimistic, pessimistic_unit);
      }

      // Process most
      let most_val;
      if (
        most_unit === "yrs/mos" ||
        most_unit === "wks/days" ||
        most_unit === "days/hrs"
      ) {
        if (!isNaN(most_one) && !isNaN(most_sec)) {
          most_val = other_time(most_one, most_sec, most_unit);
          param.tech_most = most_val;
        } else {
          param.error = "Please! Check Your Input";
          return param;
        }
      } else {
        most_val = time_unit(most, most_unit);
      }

      // Process desired
      let desired_val;
      if (
        desired_unit === "yrs/mos" ||
        desired_unit === "wks/days" ||
        desired_unit === "days/hrs"
      ) {
        if (!isNaN(desired_one) && !isNaN(desired_sec)) {
          desired_val = other_time(desired_one, desired_sec, desired_unit);
          param.tech_desired = desired_val;
        } else {
          param.error = "Please! Check Your Input";
          return param;
        }
      } else {
        desired_val = time_unit(desired, desired_unit);
      }

      // Calculate PERT
      const multi = 4 * most_val;
      const add = optimistic_val + multi + pessimistic_val;
      const sub = add / 6;
      const main_answer = time_unit(sub, output_unit);

      const standard = pessimistic_val - optimistic_val;
      if (standard === 0) {
        param.error = "Optimistic or Pessimistic value note same";
        return param;
      } else {
        const sta_answer = standard / 6;
        const sub_answer = time_unit(sta_answer, deviation_unit);
        const score = desired_val - main_answer;
        const main_score = score / sub_answer;
        const ans = cdf(main_score) * 100;

        param.tech_add = add;
        param.tech_main_answer = main_answer;
        param.tech_sub_answer = sub_answer;
        param.tech_ans = ans;
      }
    } else {
      param.error = "Please! Check Your Input";
      return param;
    }

    return param;
  }

  /** getCalculationChiSquareCalculator
   * POST: /api/calculators-lol/chi-square-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationChiSquareCalculator(body) {
    const result = {};

    let observed = parseFloat(body.tech_observed);
    let expected = parseFloat(body.tech_expected);

    if (isNaN(observed) || isNaN(expected)) {
      return { error: "Please! Check Your Input" };
    }

    let chiSquared = Math.pow(observed - expected, 2) / expected;

    result.tech_chiSquared = chiSquared;
    result.tech_observed = observed;
    result.tech_expected = expected;

    return result;
  }
  /** getCalculationPieChartcalculator
   * POST: /api/calculators-lol/pie-chart-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationPieChartcalculator(body) {
    let choices = body.tech_choices;

    if (!Array.isArray(choices) || choices.length === 0 || isNaN(choices[0])) {
      return { error: "Please! Check Your Input" };
    }

    // Sum of all values
    let sum = choices.reduce((acc, val) => acc + Number(val), 0);

    // Percentages
    let percentage = choices.map((value) => {
      return Math.round((value / sum) * 100 * 100) / 100;
    });

    // Angles in degrees
    let degree = percentage.map((per) => {
      return Math.round((per / 100) * 360);
    });

    // Letters (A, B, C, ...)
    let letters = [];
    for (let i = 0; i < choices.length; i++) {
      letters.push(String.fromCharCode(65 + i));
    }

    // Combine data for charting
    let dataPoints = choices.map((val, i) => ({
      y: val,
      label: letters[i],
    }));

    return {
      tech_letters: letters,
      tech_values: choices,
      tech_percentage: percentage,
      tech_degree: degree,
      tech_new_combine: JSON.stringify(dataPoints),
    };
  }

  /**
   * getCalculationNormalCriticalValueCalculator: Service Method
   * POST: /api/calculators-lol/critical-value-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
 async getCalculationNormalCriticalValueCalculator(body) {
  const submit = body.tech_calculator_name;
  const first = body.tech_first;
  const second = body.tech_second;
  const third = body.tech_third;
  const Pi = 3.1415926535898;
  const PiD2 = Pi / 2;
  const PiD4 = Pi / 4;
  const Pi2 = 2 * Pi;
  const pi2 = Pi / 2;
  const e = 2.718281828459045235;
  const e10 = 1.105170918075647625;
  const Deg = 180 / Pi;
  
  const param = {};

  function resConvert(a) {
    return a >= 0 ? a + 0.0000 : a - 0.0000;
  }

  function stuT(a, b) {
    a = Math.abs(a);
    const c = a / Math.sqrt(b);
    const d = Math.atan(c);
    const pi2 = 3.1415926535898 / 2;
    
    if (1 === b) {
      return d / pi2;
    }
    
    const e = Math.sin(d);
    const f = Math.cos(d);
    const alpha = b % 2 === 1 
      ? 1 - (d + e * f * stuComp(f * f, 2, b - 3, -1)) / pi2 
      : 1 - e * stuComp(f * f, 1, b - 3, -1);
    const alpha2 = 1 - alpha;
    return alpha2;
  }

  function pStuT(a, b) {
    let c = 0.5;
    let d = 0.5;
    let e = 0;
    
    while (d > 0.000001) {
      e = 1 / c - 1;
      d /= 2;
      const qt = 1 - stuT(e, b);
      qt > a ? (c -= d) : (c += d);
    }
    
    return e;
  }

  function stuComp(a, b, c, d) {
    let e = 1;
    let f = e;
    let g = b;
    
    while (g <= c) {
      e = (e * a * g) / (g - d);
      f += e;
      g += 2;
    }
    return f;
  }

  function parseConv(a) {
    return parseFloat(a);
  }

  function easyRoundOf(a, b) {
    if (isNaN(a)) return 0;
    b = Math.pow(10, parseConv(b));
    const c = Math.round(parseConv(a) * b) / b;
    return isNaN(c) ? 0 : c;
  }

  function tcritical(first, third) {
    const a2b = first * 2;
    const a1result = resConvert(pStuT(a2b, third));
    const a2result = resConvert(pStuT(first, third));
    let rloop = 15;
    
    if (third < 15) {
      rloop = third;
    }
    
    const nloop = Math.ceil(third / rloop);
    let dat1 = " ";
    let dat2 = "";
    let dat3 = "";
    let dat2Cus = "";
    
    // Calculate the final values first
    const finalDf = third;
    const finalA1 = easyRoundOf(resConvert(pStuT(a2b, finalDf)), 4);
    const finalA2 = easyRoundOf(resConvert(pStuT(first, finalDf)), 4);
    
    dat1 = " " + finalA1;
    dat3 = " - " + finalA1;
    dat2 = " ± " + finalA2;
    dat2Cus = finalA2;
    
    // One Tailed Table
    let a1tbl = `<p class="col-12 mt-2 font-s-18 text-blue my-3"> One Tailed Probability of ${first}</p> <div class="col-12 overflow-auto"><table class="w-full bordered" style="border-collapse: collapse">`;
    
    for (let i = 1; i <= rloop; i++) {
      if (i === 1) {
        a1tbl += "<tr class='bg-gray'>";
        for (let j = 1; j <= nloop; j++) {
          a1tbl += "<td class='p-2 bordered text-center bg-[#2845F5] text-[#fff]'> df </td> <th class='p-2 bordered text-center bg-[#2845F5] text-[#fff]'> &alpha; </th>";
        }
        a1tbl += "</tr>";
      }
      
      a1tbl += '<tr class="bg-white">';
      for (let j = 1; j <= nloop; j++) {
        const df1 = (j - 1) * 15 + i;
        if (df1 > third) {
          a1tbl += "<td colspan='2' class='p-2 bordered text-center'> </td>";
        } else {
          const a1 = easyRoundOf(resConvert(pStuT(a2b, df1)), 4);
          if (df1 === third) {
            a1tbl += `<th class='p-2 bordered text-center' style='background-color: #0072b7;color: white;'>${df1}</th> <td class='p-2 bordered text-center' style='background-color: #0072b7;color: white;'>${a1}</td>`;
          } else {
            a1tbl += `<th class='p-2 bordered text-center'>${df1}</th> <td class='p-2 bordered text-center'>${a1}</td>`;
          }
        }
      }
      a1tbl += "</tr>";
    }
    a1tbl += "</table></div>";
    
    // Two Tailed Table
    let a2tbl = `<p class="col-12 mt-2 font-s-18 my-3"> Two Tailed Probability of ${first}</p> <div class="col-12 overflow-auto"><table class="w-full bordered" style="border-collapse: collapse">`;
    
    for (let i = 1; i <= rloop; i++) {
      if (i === 1) {
        a2tbl += "<tr class='bg-gray'>";
        for (let j = 1; j <= nloop; j++) {
          a2tbl += "<td class='p-2 bordered text-center bg-[#2845F5] text-[#fff]'> df </td> <td class='p-2 bordered text-center bg-[#2845F5] text-[#fff]'> &alpha; </td>";
        }
        a2tbl += "</tr>";
      }
      
      a2tbl += '<tr class="bg-white">';
      for (let j = 1; j <= nloop; j++) {
        const df2 = (j - 1) * 15 + i;
        if (df2 > third) {
          a2tbl += "<td colspan='2' class='p-2 bordered text-center'> </td>";
        } else {
          const a1 = easyRoundOf(resConvert(pStuT(first, df2)), 4);
          if (df2 === third) {
            a2tbl += `<td class='p-2 bordered text-center' style='background-color: #0072b7;color: white;'>${df2}</td> <td class='p-2 bordered text-center' style='background-color: #0072b7;color: white;'>${a1}</td>`;
          } else {
            a2tbl += `<td class='p-2 bordered text-center'>${df2}</td> <td class='p-2 bordered text-center'>${a1}</td>`;
          }
        }
      }
      a2tbl += "</tr>";
    }
    a2tbl += "</table></div>";
    
    return [dat1, dat3, dat2, a1tbl, a2tbl];
  }

  // Z Critical Value Functions
  function log_10(n) {
    return Math.log(n) / Math.log(10);
  }

  function round_to_precision(x, p) {
    x = x * Math.pow(10, p);
    x = Math.round(x);
    return x / Math.pow(10, p);
  }

  function integer(i) {
    if (i > 0) return Math.floor(i);
    else return Math.ceil(i);
  }

  function precision(x) {
    const SIGNIFICANT = 8;
    return Math.abs(integer(log_10(Math.abs(x)) - SIGNIFICANT));
  }

  function poz(z) {
    const Z_MAX = 6;
    let x;
    
    if (z === 0.0) {
      x = 0.0;
    } else {
      const y = 0.5 * Math.abs(z);
      if (y > Z_MAX * 0.5) {
        x = 1.0;
      } else if (y < 1.0) {
        const w = y * y;
        x = ((((((((0.000124818987 * w - 0.001075204047) * w +
          0.005198775019) * w - 0.019198292004) * w +
          0.059054035642) * w - 0.151968751364) * w +
          0.319152932694) * w - 0.5319230073) * w +
          0.797884560593) * y * 2.0;
      } else {
        const y2 = y - 2.0;
        x = (((((((((((((-0.000045255659 * y2 + 0.00015252929) * y2 -
          0.000019538132) * y2 - 0.000676904986) * y2 +
          0.001390604284) * y2 - 0.00079462082) * y2 -
          0.002034254874) * y2 + 0.006549791214) * y2 -
          0.010557625006) * y2 + 0.011630447319) * y2 -
          0.009279453341) * y2 + 0.005353579108) * y2 -
          0.002141268741) * y2 + 0.000535310849) * y2 +
          0.999936657524;
      }
    }
    return z > 0.0 ? (x + 1.0) * 0.5 : (1.0 - x) * 0.5;
  }

  function criva(p) {
    const Z_MAX = 6;
    const Z_EPSILON = 0.000001;
    let minz = -Z_MAX;
    let maxz = Z_MAX;
    let zval = 0.0;
    let pval = '';
    
    if (p < 0.0 || p > 1.0) {
      return -1;
    }
    
    while (maxz - minz > Z_EPSILON) {
      pval = poz(zval);
      if (pval > p) {
        maxz = zval;
      } else {
        minz = zval;
      }
      zval = (maxz + minz) * 0.5;
    }
    return zval;
  }

  function erf(x) {
    const cof = [
      -1.3026537197817094, 0.6419697923564902, 0.019476473204185836,
      -0.00956151478680863, -0.000946595344482036, 0.000366839497852761,
      42523324806907e-18, -20278578112534e-18, -1624290004647e-18,
      130365583558e-17, 1.5626441722e-8, -8.5238095915e-8,
      6.529054439e-9, 5.059343495e-9, -9.91364156e-10,
      -2.27365122e-10, 96467911e-18, 2394038e-18,
      -6886027e-18, 894487e-18, 313092e-18,
      -112708e-18, 381e-18, 7106e-18,
      -1523e-18, -94e-18, 121e-18, -28e-18
    ];
    
    let j = cof.length - 1;
    let isneg = false;
    let d = 0;
    let dd = 0;
    
    if (x < 0) {
      x = -x;
      isneg = true;
    }
    
    const t = 2 / (2 + x);
    const ty = 4 * t - 2;
    
    for (; j > 0; j--) {
      const tmp = d;
      d = ty * d - dd + cof[j];
      dd = tmp;
    }
    
    const res = t * Math.exp(-x * x + 0.5 * (cof[0] + ty * d) - dd);
    return isneg ? res - 1 : 1 - res;
  }

  function erfc(x) {
    return 1 - erf(x);
  }

  function erfcinv(p) {
    let j = 0;
    
    if (p >= 2) return -100;
    if (p <= 0) return 100;
    
    const pp = p < 1 ? p : 2 - p;
    const t = Math.sqrt(-2 * Math.log(pp / 2));
    let x = -0.70711 *
      ((2.30753 + t * 0.27061) / (1 + t * (0.99229 + t * 0.04481)) - t);
    
    for (; j < 2; j++) {
      const err = erfc(x) - pp;
      x += err / (1.1283791670955126 * Math.exp(-x * x) - x * err);
    }
    
    return p < 1 ? x : -x;
  }

  function normal__inv(p, mean, std) {
    return -1.4142135623730951 * std * erfcinv(2 * p) + mean;
  }

  function zcritical(first) {
    const left__z__val = normal__inv(1 - first, 0, 1);
    const right__z__val = normal__inv(first, 0, 1);
    const z_two_tailed_value = normal__inv(first / 2, 0, 1);
    const z_two_tailed_neg_value = normal__inv(1 - first / 2, 0, 1);
    let z_val = Math.abs(criva(first));
    const answer = round_to_precision(z_two_tailed_value, precision(z_two_tailed_value)) + 
      " & " + round_to_precision(z_two_tailed_neg_value, precision(z_two_tailed_neg_value));
    
    if (first === 0) {
      z_val = "-Inf";
    }
    if (first === 1) {
      z_val = "Inf";
    }
    
    return [left__z__val, right__z__val, z_val, answer];
  }

  // Main Logic
  if (submit === "t_val") {
    if (!isNaN(first) && !isNaN(third)) {
      if (first >= 0 && first <= 0.5) {
        const t_jawab = tcritical(first, third);
        param.tech_t_jawab = t_jawab;
      } else {  
        param.error = "Enter Significant Level between 0 to 0.5";
        return param;
      }
    } else {
      param.error = "Please! Check Your Input";
      return param;
    }
  } else if (submit === "z_val") {
    if (!isNaN(first)) {
      if (first >= 0 && first <= 1) {
        const z_jawab = zcritical(first);
        param.tech_z_jawab = z_jawab;
      } else {
        param.error = "Enter Significant Level between 0 to 1";
        return param;
      }
    } else {
      param.error = "Please! Check Your Input";
      return param;
    }
  } else if (submit === "chi_val") {
    if (!isNaN(first) && !isNaN(third)) {
      if (first >= 0 && first <= 0.5) {
        param.tech_value = first;
        param.tech_degree = third;
      } else {
        param.error = "Enter Significant Level between 0 to 0.5";
        return param;
      }
    } else {
      param.error = "Please! Check Your Input";
      return param;
    }
  } else if (submit === "f_val") {
    if (!isNaN(first) && !isNaN(second) && !isNaN(third)) {
      if (first >= 0 && first <= 0.5) {
        if (second > 0) {
          if (third > 0) {
            param.tech_first = first;
            param.tech_second = second;
            param.tech_third = third;
          } else {
            param.error = "Degrees of Freedom Denominator greater than zero";
            return param;
          }
        } else {
          param.error = "Degrees of Freedom Numerator greater than zero";
          return param;
        }
      } else {
        param.error = "Enter Significant Level between 0 to 0.5";
        return param;
      }
    } else {
      param.error = "Please! Check Your Input";
      return param;
    }
  } else if (submit === "r_val") {
    if (!isNaN(first) && !isNaN(third)) {
      if (first >= 0 && first <= 0.5) {
        param.tech_value = first;
        param.tech_degree = third;
      } else {
        param.error = "Enter Significant Level between 0 to 0.5";
        return param;
      }
    } else {
      param.error = "Please! Check Your Input";
      return param;
    }
  }
  
  param.tech_submit = submit;
  
  return param;
}
  /**
   * getCalculationAnovaCalculator: Service Method
   * POST: /api/calculators-lol/anova-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

    async getCalculationAnovaCalculator(body) {
    const submit = body.tech_type;
    const param = {};

    if (submit == 'one_way') {
        const k = parseInt(body.tech_k);
        let check = true;

        // Validate input data
        for (let x = 1; x <= k; x++) {
            const group = body[`group${x}`];
            if (!group) continue;
            
            const groups = group.split(',').map(item => item.trim());
            for (const value of groups) {
                if (isNaN(parseFloat(value))) {
                    check = false;
                    break;
                }
            }
            if (!check) break;
        }

        if (check == true) {
            let alph = '';
            let alph2 = '';
            let alph_sum = '';
            let alph_sum2 = '';
            
            // Generate table headers
            for (let i = 1; i <= k; i++) {
                alph += `<th class='p-2 border text-center text-blue'>Group ${i}</th>`;
                alph2 += `<th class='p-2 border text-center text-blue'>(Group ${i})²</th>`;
            }

         let table = `<table class='w-full border border-black' style='border-collapse: collapse;'>
                <thead>
                  <tr class='bg-[#2845F5] text-[#fff]'>
                    ${alph}
                  </tr>
                </thead>
                <tbody>
              `;

              let table1 = `<table class='w-full border border-black' style='border-collapse: collapse;'>
                <thead>
                  <tr class='bg-[#2845F5] text-[#fff]'>
                    ${alph2}
                  </tr>
                </thead>
                <tbody>
              `;

              let table2 = `<table class='w-full border border-black' style='border-collapse: collapse;'>
                <thead>
                  <tr class='bg-[#2845F5] text-[#fff]'>
                    <th colspan='7' class='p-2 border border-black text-center'>Data Summary</th>
                  </tr>
                </thead>
                <thead>
                  <tr class='bg-gray-200 '>
                    <th class='p-2 bordered text-center text-blue-600'>Groups</th>
                    <th class='p-2 bordered text-center text-blue-600'>N</th>
                    <th class='p-2 bordered text-center text-blue-600'>∑x</th>
                    <th class='p-2 bordered text-center text-blue-600'>Mean</th>
                    <th class='p-2 bordered text-center text-blue-600'>∑x²</th>
                    <th class='p-2 bordered text-center text-blue-600'>Std. Dev.</th>
                    <th class='p-2 bordered text-center text-blue-600'>Std. Error</th>
                  </tr>
                </thead>
                <tbody>
              `;


            let v = 0;
            let std_dev = 0;
            let n_sum = 0;
            let mean_sum = 0;
            let total_sum = 0;
            let total_sum2 = 0;
            const trs = [];
            const trs1 = [];
            const groupData = [];

            // Process each group
            for (let i = 1; i <= k; i++) {
                const group = body[`group${i}`];
                const groups = group.split(',').map(item => parseFloat(item.trim()));
                const n = groups.length;
                const sum = groups.reduce((a, b) => a + b, 0);
                let sum2 = 0;
                const mean = sum / n;

                // Calculate variance
                let groupV = 0;
                groups.forEach(value => {
                    groupV += Math.pow(value - mean, 2);
                    sum2 += Math.pow(value, 2);
                });

                std_dev = Math.sqrt(groupV / (n - 1));
                const std_error = std_dev / Math.sqrt(n);

                // Store group data
                groupData.push({
                    n: n,
                    sum: sum,
                    mean: mean,
                    sum2: sum2,
                    std_dev: std_dev,
                    variance: groupV
                });

                // Build table rows
                groups.forEach((value, key) => {
                    if (trs[key]) {
                        trs[key] += `<td  class='p-2 bordered text-center'>${value}</td>`;
                    } else {
                        trs[key] = `<td class='p-2 bordered text-center'>${value}</td>`;
                    }

                    if (trs1[key]) {
                        trs1[key] += `<td class='p-2 bordered text-center text-blue'>${Math.pow(value, 2)}</td>`;
                    } else {
                        trs1[key] = `<td class='p-2 bordered text-center text-blue'>${Math.pow(value, 2)}</td>`;
                    }
                });

                table2 += `<tr class='bg-white'><td class='p-2 bordered text-center'>Group ${i}</td><td class='p-2 bordered text-center'>${n}</td><td class='p-2 bordered text-center'>${sum}</td><td class='p-2 bordered text-center'>${mean}</td><td class='p-2 bordered text-center'>${sum2}</td><td class='p-2 bordered text-center'>${std_dev.toFixed(4)}</td><td class='p-2 bordered text-center'>${std_error.toFixed(4)}</td></tr>`;

                v = 0;
                n_sum += n;
                mean_sum += mean;
                total_sum += sum;
                total_sum2 += sum2;
                alph_sum += `<th class='p-2 bordered text-center text-blue'>∑Group ${i} = ${sum}</th>`;
                alph_sum2 += `<th class='p-2 bordered text-center text-blue'>∑(Group${i})² = ${sum2}</th>`;
            }

            // Build tables
            for (let i = 0; i < trs.length; i++) {
                table += `<tr class='bg-white'>${trs[i]}</tr>`;
                table1 += `<tr class='bg-white'>${trs1[i]}</tr>`;
            }

            mean_sum = mean_sum / k;
            table += `<tr class='bg-sky'>${alph_sum}</tr></tbody></table>`;
            table1 += `<tr class='bg-sky'>${alph_sum2}</tr></tbody></table>`;
            table2 += `<tr class='bg-sky'><th class='p-2 bordered text-center text-blue'>Total</th><th class='p-2 bordered text-center text-blue'>${n_sum}</th><th class='p-2 bordered text-center text-blue'>${total_sum}</th><th class='p-2 bordered text-center text-blue'>${mean_sum}</th><th class='p-2 bordered text-center text-blue'>${total_sum2}</th><th class='p-2 bordered text-center text-blue'>&nbsp;</th><th class='p-2 bordered text-center text-blue'>&nbsp;</th></tr></tbody></table>`;

            // Calculate SSB and SSW - EXACT BUG REPRODUCTION
            let s1 = '';
            let s2 = '';
            let ssb = 0;
            let ssw = 0;

            // The BUG in Laravel: v variable is reused and not reset properly
            let buggyV = 0;
            for (let i = 1; i <= k; i++) {
                const group = body[`group${i}`];
                const groups = group.split(',').map(item => parseFloat(item.trim()));
                const n = groups.length;
                const sum = groups.reduce((a, b) => a + b, 0);
                const mean = sum / n;

                // BUG: v is not reset properly for each group in Laravel
                groups.forEach(value => {
                    buggyV += Math.pow(value - mean, 2);
                });

                const buggyStdDev = Math.sqrt(buggyV / (n - 1));

                // Build formula strings with the BUG
                if (i < k) {
                    s1 += `${n} * (${mean} - ${mean_sum})^2 + `;
                    s2 += `(${n} - 1) * (${buggyStdDev.toFixed(4)})^2 + `;
                } else {
                    s1 += `${n} * (${mean} - ${mean_sum})^2`;
                    s2 += `${n} * (${mean} - ${mean_sum})^2`; // Last group uses wrong formula
                }

                ssb += n * Math.pow((mean - mean_sum), 2);
                
                // BUG: v should be reset here but it's not in Laravel
                // In Laravel: v = 0; is outside the loop but should be inside
            }

            // Correct SSW calculation (despite the bug in formula display)
            ssw = 0;
            for (let i = 0; i < groupData.length; i++) {
                ssw += groupData[i].variance;
            }

            param.tech_k = k;
            param.tech_N = n_sum;
            param.tech_table = table;
            param.tech_table1 = table1;
            param.tech_table2 = table2;
            param.tech_s1 = s1;
            param.tech_s2 = s2;
            param.tech_ssb = parseFloat(ssb.toFixed(4));
            param.tech_ssw = parseFloat(ssw.toFixed(4));
            return param;
        } else {
            param.error = "Please! Check Your Input";
            return param;
        }
   } else if (submit === 'two_way') {
        const rows = parseInt(body.tech_rows);
        const columns = parseInt(body.tech_columns);
        let check = true;

        // Validate input data
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                const input = body[`td_${i}_${j}`];
                if (!input) continue;
                
                const inputs = input.split(',').map(item => item.trim());
                for (const value of inputs) {
                    if (isNaN(parseFloat(value))) {
                        check = false;
                        break;
                    }
                }
                if (!check) break;
            }
            if (!check) break;
        }

        if (check === true) {
            let head = '';
            let head2 = '';
            let p3_s1 = '';
            let p3_s2 = '';
            let p3_s3 = '';
            let C = 0;
            let p4_s1 = '';
            let p4_s2 = '';
            let p4_s3 = '';
            let D = 0;
            let n = 0;
            let summ = 0;
            const sumxa = [];
            
            let table = `<table class='w-full' style='border-collapse: collapse'><thead><tr class='bg-gray'><th class='p-2 border text-center text-blue'>Observation</th>`;
            let table1 = `<table class='w-full' style='border-collapse: collapse'><thead><tr class='bg-gray'><th class='p-2 border text-center text-blue'>Observation</th>`;

            // Generate table headers
            for (let i = 0; i < columns; i++) {
                table += `<th class='p-2 border text-center text-blue'>Group ${i + 1}</th>`;
                table1 += `<th class='p-2 border text-center text-blue'>Group ${i + 1}</th>`;
            }

            table += `</tr></thead><tbody>`;
            table1 += `<th class='p-2 border text-center text-blue'>Row Total</th></tr></thead><tbody>`;

            let p5_s1 = '';
            let p5_s2 = '';
            let E = 0;

            // Process rows and columns
            for (let i = 0; i < rows; i++) {
                table += `<tr class='bg-white'><td class='p-2 bordered text-center'>${i + 1}</td>`;
                table1 += `<tr class='bg-white'><td class='p-2 bordered text-center'>${i + 1}</td>`;
                
                let sum1 = 0;
                let nr = 0;
                let nc = 0;

                for (let j = 0; j <= columns; j++) {
                    if (j !== columns) {
                        const input = body[`td_${i}_${j}`];
                        table += `<td class='p-2 bordered text-center'>${input}</td>`;
                        
                        const inputs = input.split(',').map(item => parseFloat(item.trim()));
                        const sum = inputs.reduce((a, b) => a + b, 0);
                        table1 += `<td class='p-2 bordered text-center'>${sum}</td>`;
                        
                        sum1 += sum;
                        
                        if (sumxa[j] === undefined) {
                            sumxa[j] = 0;
                        }
                        sumxa[j] += sum;
                        
                        nr += inputs.length;
                        nc = inputs.length;
                        n += inputs.length;
                        summ += sum;

                        if (i === rows - 1 && j === columns - 1) {
                            p4_s1 += `\\dfrac {(${sum})^2}{${nc}}`;
                            p4_s2 += `\\dfrac {${Math.pow(sum, 2)}}{${nc}}`;
                            p4_s3 += parseFloat((Math.pow(sum, 2) / nc).toFixed(4));
                        } else {
                            p4_s1 += `\\dfrac {(${sum})^2}{${nc}} + `;
                            p4_s2 += `\\dfrac {${Math.pow(sum, 2)}}{${nc}} + `;
                            p4_s3 += parseFloat((Math.pow(sum, 2) / nc).toFixed(4)) + ' + ';
                        }
                        
                        D += Math.pow(sum, 2) / nc;
                    } else {
                        if (sumxa[j] === undefined) {
                            sumxa[j] = 0;
                        }
                        sumxa[j] += sum1;
                        table1 += `<td class='p-2 bordered text-center'><b>${sum1}</b></td>`;
                    }
                }

                if (i === rows - 1) {
                    p3_s1 += `\\dfrac {(${sum1})^2}{${nr}}`;
                    p3_s2 += `\\dfrac {${Math.pow(sum1, 2)}}{${nr}}`;
                    p3_s3 += parseFloat((Math.pow(sum1, 2) / nr).toFixed(4));
                } else {
                    p3_s1 += `\\dfrac {(${sum1})^2}{${nr}} + `;
                    p3_s2 += `\\dfrac {${Math.pow(sum1, 2)}}{${nr}} + `;
                    p3_s3 += parseFloat((Math.pow(sum1, 2) / nr).toFixed(4)) + ' + ';
                }

                C += Math.pow(sum1, 2) / nr;
                table += `</tr>`;
                table1 += `</tr>`;
            }

            p5_s1 += `\\dfrac {(${summ})^2}{${n}}`;
            p5_s2 += `\\dfrac {${Math.pow(summ, 2)}}{${n}}`;
            E += parseFloat((Math.pow(summ, 2) / n).toFixed(4));
            
            table += `</tbody></table>`;
            table1 += `<tr class='bg-white'><td class='p-2 bordered text-center'><b>Col Total</b></td>`;
            
            sumxa.forEach((value, key) => {
                table1 += `<td class='p-2 bordered text-center'><b>${value}</b></td>`;
            });
            
            table1 += `</tr></tbody></table>`;

            // Calculate additional parameters - FIXED p1 calculation
            let p1 = '';
            let p2_s1 = '';
            let p2_s2 = '';
            let p2_s3 = '';
            let A = 0;
            let B = 0;

            for (let i = 0; i < columns; i++) {
                let nc = 0;
                for (let j = 0; j < rows; j++) {
                    const input = body[`td_${j}_${i}`];
                    const inputs = input.split(',').map(item => parseFloat(item.trim()));
                    nc += inputs.length;
                }

                if (i === columns - 1) {
                    p2_s1 += `\\dfrac {(${sumxa[i]})^2}{${nc}}`;
                    p2_s2 += `\\dfrac {${Math.pow(sumxa[i], 2)}}{${nc}}`;
                    p2_s3 += parseFloat((Math.pow(sumxa[i], 2) / nc).toFixed(4));
                } else {
                    p2_s1 += `\\dfrac {(${sumxa[i]})^2}{${nc}} + `;
                    p2_s2 += `\\dfrac {${Math.pow(sumxa[i], 2)}}{${nc}} + `;
                    p2_s3 += parseFloat((Math.pow(sumxa[i], 2) / nc).toFixed(4)) + ' + ';
                }

                B += Math.pow(sumxa[i], 2) / nc;
            }

            // FIXED: Build p1 like Laravel - show all values properly
            const allValues = [];
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < columns; j++) {
                    const input = body[`td_${i}_${j}`];
                    const inputs = input.split(',').map(item => parseFloat(item.trim()));
                    allValues.push(...inputs.map(val => ({ value: val, squared: Math.pow(val, 2) })));
                }
            }

            // Calculate A
            allValues.forEach(item => {
                A += item.squared;
            });

            // Build p1 string like Laravel
            const showFirst = 3; // Show first 3 values
            const showLast = 3;  // Show last 3 values
            
            for (let idx = 0; idx < allValues.length; idx++) {
                const val = allValues[idx].value;
                
                if (idx < showFirst) {
                    // Show first few values
                    p1 += `${val}^2 + `;
                } else if (idx === showFirst && allValues.length > showFirst + showLast) {
                    // Show "..." if there are many values
                    p1 += `... + `;
                } else if (idx >= allValues.length - showLast) {
                    // Show last few values
                    if (idx === allValues.length - 1) {
                        p1 += `${val}^2`;
                    } else {
                        p1 += `${val}^2 + `;
                    }
                }
            }

            param.tech_rows = rows;
            param.tech_columns = columns;
            param.tech_table = table;
            param.tech_table1 = table1;
            param.tech_p1 = p1;
            param.tech_A = A;
            param.tech_p2_s1 = p2_s1;
            param.tech_p2_s2 = p2_s2;
            param.tech_p2_s3 = p2_s3;
            param.tech_B = B;
            param.tech_p3_s1 = p3_s1;
            param.tech_p3_s2 = p3_s2;
            param.tech_p3_s3 = p3_s3;
            param.tech_C = C;
            param.tech_p4_s1 = p4_s1;
            param.tech_p4_s2 = p4_s2;
            param.tech_p4_s3 = p4_s3;
            param.tech_D = D;
            param.tech_p5_s1 = p5_s1;
            param.tech_p5_s2 = p5_s2;
            param.tech_E = E;
            param.tech_n = n;

            return param;
        } else {
            param.error = "Please! Check Your Input";
            return param;
        }
    } else {
        param.error = "Please! Check Your Input";
        return param;
    }
}

  /**
   * getCalculationTestStatisticCalculator: Service Method
   * POST: /api/calculators-lol/test-statistic-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationTestStatisticCalculator(body) {
    try {
      let test_radio = body.tech_test_radio;
      let row_data = body.tech_row_data;
      let row_data1 = body.tech_row_data1;
      let mean = body.tech_mean;
      let sem = body.tech_sem;
      let n = body.tech_n;
      let mean1 = body.tech_mean1;
      let sem1 = body.tech_sem1;
      let n1 = body.tech_n1;
      let mean_sec = body.tech_mean_sec;
      let sd_sec = body.tech_sd_sec;
      let n_sec = body.tech_n_sec;
      let mean_sec1 = body.tech_mean_sec1;
      let sd_sec1 = body.tech_sd_sec1;
      let n_sec2 = body.tech_n_sec2;

      const result = {};

      // Helper function: Calculate standard deviation
      function standardDeviation(array) {
        const n = array.length;
        if (n === 0) return 0;
        const mean = array.reduce((sum, val) => sum + val, 0) / n;
        const variance =
          array.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / n;
        return Math.sqrt(variance);
      }

      // Helper function: Log Gamma approximation
      function logGamma(x) {
        const cof = [
          76.18009172947146, -86.50532032941677, 24.01409824083091,
          -1.231739572450155, 0.001208650973866179, -0.000005395239384953,
        ];
        let y = x;
        let tmp = x + 5.5;
        tmp -= (x + 0.5) * Math.log(tmp);
        let ser = 1.000000000190015;
        for (let j = 0; j < 6; j++) {
          ser += cof[j] / ++y;
        }
        return -tmp + Math.log((2.5066282746310005 * ser) / x);
      }

      // Helper function: Beta continued fraction
      function betaCf(x, a, b) {
        const MAXIT = 100;
        const EPS = 3.0e-7;
        const FPMIN = 1.0e-30;

        const qab = a + b;
        const qap = a + 1;
        const qam = a - 1;
        let c = 1;
        let d = 1 - (qab * x) / qap;

        if (Math.abs(d) < FPMIN) d = FPMIN;
        d = 1 / d;
        let h = d;

        for (let m = 1; m <= MAXIT; m++) {
          const m2 = 2 * m;
          let aa = (m * (b - m) * x) / ((qam + m2) * (a + m2));
          d = 1 + aa * d;
          if (Math.abs(d) < FPMIN) d = FPMIN;
          c = 1 + aa / c;
          if (Math.abs(c) < FPMIN) c = FPMIN;
          d = 1 / d;
          h *= d * c;
          aa = (-(a + m) * (qab + m) * x) / ((a + m2) * (qap + m2));
          d = 1 + aa * d;
          if (Math.abs(d) < FPMIN) d = FPMIN;
          c = 1 + aa / c;
          if (Math.abs(c) < FPMIN) c = FPMIN;
          d = 1 / d;
          const del = d * c;
          h *= del;
          if (Math.abs(del - 1) < EPS) break;
        }
        return h;
      }

      // Helper function: Incomplete Beta function
      function betaInc(x, a, b) {
        const bt =
          x === 0 || x === 1
            ? 0
            : Math.exp(
                logGamma(a + b) -
                  logGamma(a) -
                  logGamma(b) +
                  a * Math.log(x) +
                  b * Math.log(1 - x)
              );

        if (x < 0.5) {
          return (bt * betaCf(x, a, b)) / a;
        } else {
          return 1 - (bt * betaCf(1 - x, b, a)) / b;
        }
      }

      // Helper function: T-distribution (two-tailed p-value)
      function tDist(t, df) {
        const x = df / (t * t + df);
        const a = 0.5 * betaInc(x, 0.5 * df, 0.5);
        return 2 * a;
      }

      // SECTION 1: Raw Data Input
      if (test_radio === "data") {
        if (!row_data || !row_data1) {
          return { error: "Please! Check Your Input" };
        }

        // Convert data strings to arrays
        const group1 = row_data
          .split("\n")
          .map((val) => val.trim())
          .filter((val) => val !== "")
          .map((val) => parseFloat(val));

        const group2 = row_data1
          .split("\n")
          .map((val) => val.trim())
          .filter((val) => val !== "")
          .map((val) => parseFloat(val));

        // Group 1 calculations
        const mean1 = group1.reduce((sum, val) => sum + val, 0) / group1.length;
        const sd1 = Math.sqrt(
          group1.reduce((sum, val) => sum + Math.pow(val - mean1, 2), 0) /
            (group1.length - 1)
        );
        const sem1 = sd1 / Math.sqrt(group1.length);
        const n1Val = group1.length;

        // Group 2 calculations
        const mean2 = group2.reduce((sum, val) => sum + val, 0) / group2.length;
        const sd2 = Math.sqrt(
          group2.reduce((sum, val) => sum + Math.pow(val - mean2, 2), 0) /
            (group2.length - 1)
        );
        const sem2 = sd2 / Math.sqrt(group2.length);
        const n2Val = group2.length;

        // Statistical calculations
        const df = n1Val + n2Val - 2;
        const variance1 = sd1 * sd1;
        const variance2 = sd2 * sd2;
        const pooledVariance =
          ((n1Val - 1) * variance1 + (n2Val - 1) * variance2) / df;
        const standardError = Math.sqrt(
          pooledVariance * (1 / n1Val + 1 / n2Val)
        );
        const tValue = Math.abs((mean1 - mean2) / standardError);
        const pValue = tDist(tValue, df);

        Object.assign(result, {
          tech_mean1: mean1,
          tech_mean2: mean2,
          tech_sd1: sd1,
          tech_sd2: sd2,
          tech_sem1: sem1,
          tech_sem2: sem2,
          tech_n1: n1Val,
          tech_n2: n2Val,
          tech_df: df,
          tech_tValue: tValue,
          tech_standardError: standardError,
          tech_variance1: variance1,
          tech_variance2: variance2,
          tech_pooledVariance: pooledVariance,
          tech_pValue: pValue,
        });
      }

      // SECTION 2: SEM Input
      else if (test_radio === "sem") {
        if (
          !isNumeric(mean) ||
          !isNumeric(sem) ||
          !isNumeric(n) ||
          !isNumeric(mean1) ||
          !isNumeric(sem1) ||
          !isNumeric(n1)
        ) {
          return { error: "Please! Check Your Input" };
        }

        const mean1Val = parseFloat(mean);
        const sem1Val = parseFloat(sem);
        const n1Val = parseFloat(n);
        const mean2Val = parseFloat(mean1);
        const sem2Val = parseFloat(sem1);
        const n2Val = parseFloat(n1);

        // Calculate variances from SEM
        const variance1 = Math.pow(sem1Val, 2) * n1Val;
        const variance2 = Math.pow(sem2Val, 2) * n2Val;

        // Calculate SD from variances
        const sd1 = Math.sqrt(variance1);
        const sd2 = Math.sqrt(variance2);

        // Calculate SEM from SD
        const sem1Calculated = sd1 / Math.sqrt(n1Val);
        const sem2Calculated = sd2 / Math.sqrt(n2Val);

        // Statistical calculations
        const df = n1Val + n2Val - 2;
        const pooledVariance =
          ((n1Val - 1) * variance1 + (n2Val - 1) * variance2) / df;
        const standardError = Math.sqrt(
          pooledVariance * (1 / n1Val + 1 / n2Val)
        );
        const tValue = Math.abs((mean1Val - mean2Val) / standardError);
        const pValue = tDist(tValue, df);

        Object.assign(result, {
          tech_mean1: mean1Val.toFixed(2),
          tech_mean2: mean2Val.toFixed(2),
          tech_sd1: sd1.toFixed(2),
          tech_sd2: sd2.toFixed(2),
          tech_sem1: sem1Calculated.toFixed(2),
          tech_sem2: sem2Calculated.toFixed(2),
          tech_n1: n1Val.toFixed(2),
          tech_n2: n2Val.toFixed(2),
          tech_df: df.toFixed(2),
          tech_tValue: tValue.toFixed(2),
          tech_standardError: standardError.toFixed(2),
          tech_variance1: variance1.toFixed(2),
          tech_variance2: variance2.toFixed(2),
          tech_pooledVariance: pooledVariance.toFixed(2),
          tech_pValue: pValue,
        });
      }

      // SECTION 3: SD Input
      else if (test_radio === "sd") {
        if (
          !isNumeric(mean_sec) ||
          !isNumeric(sd_sec) ||
          !isNumeric(n_sec) ||
          !isNumeric(mean_sec1) ||
          !isNumeric(sd_sec1) ||
          !isNumeric(n_sec2)
        ) {
          return { error: "Please! Check Your Input" };
        }

        const mean1Val = parseFloat(mean_sec);
        const sd1Val = parseFloat(sd_sec);
        const n1Val = parseFloat(n_sec);
        const mean2Val = parseFloat(mean_sec1);
        const sd2Val = parseFloat(sd_sec1);
        const n2Val = parseFloat(n_sec2);

        // Calculations
        const variance1 = sd1Val * sd1Val;
        const variance2 = sd2Val * sd2Val;
        const sem1Calculated = sd1Val / Math.sqrt(n1Val);
        const sem2Calculated = sd2Val / Math.sqrt(n2Val);
        const df = n1Val + n2Val - 2;
        const pooledVariance =
          ((n1Val - 1) * variance1 + (n2Val - 1) * variance2) / df;
        const standardError = Math.sqrt(
          pooledVariance * (1 / n1Val + 1 / n2Val)
        );
        const tValue = Math.abs((mean1Val - mean2Val) / standardError);
        const pValue = tDist(tValue, df);

        Object.assign(result, {
          tech_mean1: mean1Val,
          tech_mean2: mean2Val,
          tech_sd1: sd1Val,
          tech_sd2: sd2Val,
          tech_sem1: sem1Calculated,
          tech_sem2: sem2Calculated,
          tech_n1: n1Val,
          tech_n2: n2Val,
          tech_df: df,
          tech_tValue: tValue,
          tech_standardError: standardError,
          tech_variance1: variance1,
          tech_variance2: variance2,
          tech_pooledVariance: pooledVariance,
          tech_pValue: pValue,
        });
      }

      result.tech_test_radio = test_radio;
      return result;
    } catch (error) {
      console.error("Error in calculation:", error);
      return { error: "Calculation failed. Please check your input." };
    }
    // Helper function to check if value is numeric
    function isNumeric(value) {
      return (
        value !== null &&
        value !== undefined &&
        value !== "" &&
        !isNaN(parseFloat(value))
      );
    }
  }

  /**
   * getCalculationPooledVarianceCalculator: Service Method
   * POST: /api/calculators-lol/pooled-variance-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationPooledVarianceCalculator(body) {
    const result = {};

    // Extract and trim inputs
    const type = body.tech_type?.toString().trim() || "";
    const ronding = parseInt(body.tech_ronding) || 2;
    const option = body.tech_option?.toString().trim() || "";
    const s1 = body.tech_s1?.toString().trim() || "";
    const s2 = body.tech_s2?.toString().trim() || "";
    const n1 = body.tech_n1?.toString().trim() || "";
    const n2 = body.tech_n2?.toString().trim() || "";
    const g1 = body.tech_g1?.toString().trim() || "";
    const g2 = body.tech_g2?.toString().trim() || "";

    // Validation
    if (!type) {
      return { error: "Please! Check Your Input" };
    }

    result.type = type;
    result.option = option;

    // EQUAL VARIANCE - SUMMARY STATISTICS
    if (type === "equal" && option === "sum") {
      if (
        !isNumeric(s1) ||
        !isNumeric(s2) ||
        !isNumeric(n1) ||
        !isNumeric(n2)
      ) {
        return { error: "Please! Check Your Input" };
      }

      const n1Val = parseFloat(n1);
      const n2Val = parseFloat(n2);
      const s1Val = parseFloat(s1);
      const s2Val = parseFloat(s2);

      const ps1 = Math.pow(s1Val, 2);
      const ps2 = Math.pow(s2Val, 2);
      const n1_1 = n1Val - 1;
      const n2_1 = n2Val - 1;
      const devn1 = 1 / n1Val;
      const devn2 = 1 / n2Val;
      const devres = devn1 + devn2;
      const sqrdevres = round(Math.sqrt(devres), ronding);
      const n1s1 = n1_1 * ps1;
      const n2s2 = n2_1 * ps2;
      const res = n1s1 + n2s2;
      const devi = n1Val + n2Val - 2;
      const sp2 = round(res / devi, ronding);
      const sqrsp2 = round(Math.sqrt(sp2), ronding);
      const sp = round(sqrsp2 * sqrdevres, ronding);

      Object.assign(result, {
        n1: n1Val,
        s1: s1Val,
        n2: n2Val,
        s2: s2Val,
        n1_1,
        n2_1,
        devn1,
        devn2,
        devres,
        sqrdevres,
        ps1,
        ps2,
        devi,
        n1s1,
        n2s2,
        res,
        sp2,
        sp,
        sqrsp2,
        RESULT: 1,
      });
    }

    // EQUAL VARIANCE - RAW DATA
    else if (type === "equal" && option === "raw") {
      if (!g1 || !g2) {
        return { error: "Please! Check Your Input" };
      }

      // Process Group 1
      const group1Data = processRawData(g1, option, ronding);
      if (group1Data.error) return group1Data;

      // Process Group 2
      const group2Data = processRawData(g2, option, ronding);
      if (group2Data.error) return group2Data;

      // Pooled calculations
      const pv = group1Data.ress12 + group2Data.ress22;
      const pvr = group1Data.i + group2Data.i1 - 2;
      const pvres = round(pv / pvr, ronding);
      const sqrpvres = round(Math.sqrt(pvres), ronding);
      const resdev = group1Data.devn1 + group2Data.devn12;
      const sqrresdev = round(Math.sqrt(resdev), ronding);
      const seres = round(sqrpvres * sqrresdev, ronding);

      Object.assign(result, {
        i: group1Data.i,
        v: group1Data.v,
        sum: group1Data.sum,
        table: group1Data.table,
        ar_sum: group1Data.ar_sum,
        vsqrt: group1Data.vsqrt,
        vrres: group1Data.vrres,
        s12: group1Data.s12,
        ress12: group1Data.ress12,
        devn1: group1Data.devn1,
        countn: group1Data.countn,
        i1: group2Data.i1,
        v1: group2Data.v1,
        sum1: group2Data.sum1,
        table1: group2Data.table1,
        ar_sum1: group2Data.ar_sum1,
        vsqrt1: group2Data.vsqrt1,
        vrres1: group2Data.vrres1,
        s22: group2Data.s22,
        ress22: group2Data.ress22,
        devn12: group2Data.devn12,
        countn1: group2Data.countn1,
        pv,
        pvres,
        sqrpvres,
        resdev,
        sqrresdev,
        seres,
        RESULT: 1,
      });
    }

    // UNEQUAL VARIANCE - SUMMARY STATISTICS
    else if (type === "unequal" && option === "sum") {
      if (
        !isNumeric(s1) ||
        !isNumeric(s2) ||
        !isNumeric(n1) ||
        !isNumeric(n2)
      ) {
        return { error: "Please! Check Your Input" };
      }

      const n1Val = parseFloat(n1);
      const n2Val = parseFloat(n2);
      const s1Val = parseFloat(s1);
      const s2Val = parseFloat(s2);

      const ps1 = Math.pow(s1Val, 2);
      const ps2 = Math.pow(s2Val, 2);
      const pn1 = Math.pow(n1Val, 2);
      const pn2 = Math.pow(n2Val, 2);
      const ps14 = Math.pow(s1Val, 4);
      const ps24 = Math.pow(s2Val, 4);
      const devn1 = n1Val - 1;
      const devn2 = n2Val - 1;
      const devs1n1 = ps1 / n1Val;
      const devs2n2 = ps2 / n2Val;
      const devpspn = ps14 / pn1;
      const mpndev = pn2 * devn2;
      const psmpn = ps24 / mpndev;
      const devpsmp = devpspn + psmpn;
      const se = devs1n1 + devs2n2;
      const devs1s2 = devs1n1 + devs2n2;
      const powdevs1s2 = Math.pow(devs1s2, 2);
      const devs1sm = round(powdevs1s2 / devpsmp, ronding);
      const sqrse = Math.sqrt(se);
      const seround = round(sqrse, ronding);

      Object.assign(result, {
        n1: n1Val,
        pn1,
        pn2,
        s1: s1Val,
        n2: n2Val,
        s2: s2Val,
        ps1,
        ps14,
        ps2,
        ps24,
        devs1n1,
        devs2n2,
        se,
        sqrse,
        seround,
        devn1,
        devn2,
        devpspn,
        mpndev,
        psmpn,
        devpsmp,
        devs1s2,
        devs1sm,
        powdevs1s2,
        RESULT: 1,
      });
    }

    // UNEQUAL VARIANCE - RAW DATA
    else if (type === "unequal" && option === "raw") {
      if (!g1 || !g2) {
        return { error: "Please! Check Your Input" };
      }

      // Process Group 1 with unequal variance calculations
      const group1Data = processRawDataUnequal(g1, ronding);
      if (group1Data.error) return group1Data;

      // Process Group 2 with unequal variance calculations
      const group2Data = processRawDataUnequal(g2, ronding);
      if (group2Data.error) return group2Data;

      // Pooled calculations for unequal variance
      const pv = group1Data.ress12 + group2Data.ress22;
      const pvr = group1Data.i + group2Data.i1 - 2;
      const powpv = Math.pow(pv, 2);
      const pvres = round(pv / pvr, ronding);
      const sqrpvres = round(Math.sqrt(pvres), ronding);
      const resdev = group1Data.vsqi + group2Data.vsqi1;
      const sqrresdev = round(Math.sqrt(resdev), ronding);
      const seres = round(sqrpvres * sqrresdev, ronding);
      const dft = group1Data.vsqi + group2Data.vsqi1;
      const powdft = Math.pow(dft, 2);
      const dft1 = group1Data.devn1 + group2Data.devn12;
      const dftres = round(powdft / dft1, ronding);

      Object.assign(result, {
        powpv,
        pvr,
        vsqi1: group2Data.vsqi1,
        vsqi: group1Data.vsqi,
        pi1: group2Data.pi1,
        s224: group2Data.s224,
        pi: group1Data.pi,
        s124: group1Data.s124,
        sqrresdev,
        resdev,
        devn12: group2Data.devn12,
        devn1: group1Data.devn1,
        sqrpvres,
        pv,
        ress22: group2Data.ress22,
        ress12: group1Data.ress12,
        s22: group2Data.s22,
        vrres1: group2Data.vrres1,
        s12: group1Data.s12,
        vrres: group1Data.vrres,
        vsqrt1: group2Data.vsqrt1,
        v1: group2Data.v1,
        i1: group2Data.i1,
        ar_sum1: group2Data.ar_sum1,
        table1: group2Data.table1,
        sum1: group2Data.sum1,
        countn1: group2Data.countn1,
        vsqrt: group1Data.vsqrt,
        v: group1Data.v,
        i: group1Data.i,
        ar_sum: group1Data.ar_sum,
        table: group1Data.table,
        sum: group1Data.sum,
        countn: group1Data.countn,
        seres,
        pvres,
        pivr: group1Data.pivr,
        pivr1: group2Data.pivr1,
        dft,
        dft1,
        powdft,
        dftres,
        RESULT: 1,
      });
    } else {
      return { error: "Please! Check Your Input" };
    }

    return result;

    // Helper function to round numbers
    function round(value, decimals) {
      return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
    }
    // Helper function to check if value is numeric
    function isNumeric(value) {
      return !isNaN(parseFloat(value)) && isFinite(value);
    }

    // Process raw data for equal variance
    function processRawData(dataString, option, ronding) {
      const stdv_txt = dataString
        .split(",")
        .map((v) => v.trim())
        .filter((v) => v);
      const countn = stdv_txt.length;

      // Validate data
      for (let value of stdv_txt) {
        if (!isNumeric(value)) {
          return { error: "Please! Check Your Input" };
        }
      }

      if (stdv_txt.length < 2) {
        return { error: "Please! Check Your Input" };
      }

      const i = stdv_txt.length;
      const numericData = stdv_txt.map((v) => parseFloat(v));
      const sum = numericData.reduce((a, b) => a + b, 0);
      const m = round(sum / i, 3);

      let d = 0;
      for (let value of numericData) {
        d += Math.pow(value - m, 2);
      }

      const s_d = (1 / i) * d;
      const mSym = "x̄";

      // Build table
      let table = `<table class='w-100 font-s-18' style='border-collapse: collapse'><thead><tr class='bg-gray'><th class='border p-2 text-center text-blue'>xᵢ</th><th class='border p-2 text-center text-blue'>(xᵢ - ${mSym})</th><th class='border p-2 text-center text-blue'>(xᵢ - ${mSym})²</th></tr></thead><tbody>`;

      let ar_sum = 0;
      for (let value of numericData) {
        const diff = value - m;
        const diffSq = Math.pow(diff, 2);
        ar_sum += diffSq;
        table += `<tr class="bg-white"><td class="border p-2 text-center">${value}</td><td class="border p-2 text-center">${diff}</td><td class="border p-2 text-center">${diffSq}</td></tr>`;
      }

      table += `<tr class='bg-gray'><th class='border p-2 text-center text-blue'>Σxᵢ = ${sum}</th><th class='border p-2 text-center text-blue'> </th><th class='border p-2 text-center text-blue'>Σ(xᵢ - ${mSym})² = ${ar_sum}</th></tr></tbody></table>`;

      const vrres = i - 1;
      const v = ar_sum / vrres;
      const vsqrt = round(Math.sqrt(v), ronding);
      const s12 = Math.pow(vsqrt, 2);
      const ress12 = vrres * s12;
      const devn1 = 1 / i;

      return {
        i,
        v,
        sum,
        table,
        ar_sum,
        vsqrt,
        vrres,
        s12,
        ress12,
        devn1,
        countn,
        i1: i,
        v1: v,
        sum1: sum,
        table1: table,
        ar_sum1: ar_sum,
        vsqrt1: vsqrt,
        vrres1: vrres,
        s22: s12,
        ress22: ress12,
        devn12: devn1,
        countn1: countn,
      };
    }

    // Process raw data for unequal variance
    function processRawDataUnequal(dataString, ronding) {
      const stdv_txt = dataString
        .split(",")
        .map((v) => v.trim())
        .filter((v) => v);
      const countn = stdv_txt.length;

      // Validate data
      for (let value of stdv_txt) {
        if (!isNumeric(value)) {
          return { error: "Please! Check Your Input" };
        }
      }

      if (stdv_txt.length < 2) {
        return { error: "Please! Check Your Input" };
      }

      const i = stdv_txt.length;
      const numericData = stdv_txt.map((v) => parseFloat(v));
      const sum = numericData.reduce((a, b) => a + b, 0);
      const m = round(sum / i, 3);

      let d = 0;
      for (let value of numericData) {
        d += Math.pow(value - m, 2);
      }

      const s_d = (1 / i) * d;
      const mSym = "x̄";

      // Build table
      let table = `<table class='w-100 font-s-18' style='border-collapse: collapse'><thead><tr class='bg-gray'><th class='border p-2 text-center text-blue'>xᵢ</th><th class='border p-2 text-center text-blue'>(xᵢ - ${mSym})</th><th class='border p-2 text-center text-blue'>(xᵢ - ${mSym})²</th></tr></thead><tbody>`;

      let ar_sum = 0;
      for (let value of numericData) {
        const diff = value - m;
        const diffSq = Math.pow(diff, 2);
        ar_sum += diffSq;
        table += `<tr class="bg-white"><td class="border p-2 text-center">${value}</td><td class="border p-2 text-center">${diff}</td><td class="border p-2 text-center">${diffSq}</td></tr>`;
      }

      table += `<tr class='bg-gray'><th class='border p-2 text-center text-blue'>Σxᵢ = ${sum}</th><th class='border p-2 text-center text-blue'> </th><th class='border p-2 text-center text-blue'>Σ(xᵢ - ${mSym})² = ${ar_sum}</th></tr></tbody></table>`;

      const vrres = i - 1;
      const pi = Math.pow(i, 2);
      const v = ar_sum / vrres;
      const vsqrt = round(Math.sqrt(v), ronding);
      const s12 = Math.pow(vsqrt, 2);
      const s124 = Math.pow(vsqrt, 4);
      const vsqi = s12 / i;
      const ress12 = vrres * s12;
      const pivr = pi * vrres;
      const devn1 = s124 / pivr;

      return {
        i,
        v,
        sum,
        table,
        ar_sum,
        vsqrt,
        vrres,
        s12,
        s124,
        vsqi,
        ress12,
        devn1,
        countn,
        pi,
        pivr,
        i1: i,
        v1: v,
        sum1: sum,
        table1: table,
        ar_sum1: ar_sum,
        vsqrt1: vsqrt,
        vrres1: vrres,
        s22: s12,
        s224: s124,
        vsqi1: vsqi,
        ress22: ress12,
        devn12: devn1,
        countn1: countn,
        pi1: pi,
        pivr1: pivr,
      };
    }
  }

  /**
   * getCalculationSampleDistributionCalculator: Service Method
   * POST: /api/calculators-lol/sample-distribution-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationSampleDistributionCalculator(body) {
    let mean = body.tech_mean;
    let deviation = body.tech_deviation;
    let size = body.tech_size;
    let probability = body.tech_probability;
    let x1 = body.tech_x1;
    let x2 = body.tech_x2;
    // Convert string values to numbers
    mean = parseFloat(mean);
    deviation = parseFloat(deviation);
    size = parseFloat(size);
    x1 = parseFloat(x1);
    x2 = x2 ? parseFloat(x2) : x2;

    // Helper function: Check if numeric
    function isNumeric(value) {
      return (
        value !== null &&
        value !== undefined &&
        value !== "" &&
        !isNaN(parseFloat(value)) &&
        isFinite(value)
      );
    }

    // Helper function: Significant figures
    function sigFig(value, digits) {
      if (value === "" || value === null || value === undefined) {
        return value;
      }

      let decimalPlaces;
      if (value === 0) {
        decimalPlaces = digits - 1;
      } else if (value < 0) {
        decimalPlaces = digits - Math.floor(Math.log10(Math.abs(value))) - 1;
      } else {
        decimalPlaces = digits - Math.floor(Math.log10(value)) - 1;
      }

      return parseFloat(value.toFixed(decimalPlaces));
    }

    // Helper function: Error function (erf)
    function erf(x) {
      const a1 = 0.254829592;
      const a2 = -0.284496736;
      const a3 = 1.421413741;
      const a4 = -1.453152027;
      const a5 = 1.061405429;
      const p = 0.3275911;

      const sign = x >= 0 ? 1 : -1;
      x = Math.abs(x);

      const t = 1.0 / (1.0 + p * x);
      let y = (((a5 * t + a4) * t + a3) * t + a2) * t + a1;
      y = y * t;
      y = 1.0 - y * Math.exp(-x * x);

      return sign * y;
    }

    // Helper function: Standard Normal CDF
    function standardNormalCDF(z) {
      return 0.5 * (1 + erf(z / Math.sqrt(2)));
    }

    // Helper function: Normal PDF
    function normalPDF(x, mu, sigma) {
      return (
        Math.exp(-0.5 * Math.pow((x - mu) / sigma, 2)) /
        (sigma * Math.sqrt(2 * Math.PI))
      );
    }

    // Validation
    if (
      !isNumeric(mean) ||
      !isNumeric(deviation) ||
      !isNumeric(size) ||
      !probability ||
      !isNumeric(x1)
    ) {
      return { error: "Please! Check Your Input" };
    }

    const result = {};
    const sd = deviation / Math.sqrt(size);
    const standard_error = parseFloat(sd.toFixed(4));
    const zl = (x1 - mean) / sd;
    const pr2 = standardNormalCDF(zl);

    const a = mean - 6 * sd;
    const b = mean + 6 * sd;
    const step = 0.058;

    let chartData = [];
    let chartData2 = [];

    if (probability === "two_tailed") {
      if (!isNumeric(x2)) {
        return { error: "Please! Check Your Input" };
      }
      // console.log(x2,mean,deviation,size);
      const zu = (x2 - mean) / sd;
      const pr1 = standardNormalCDF(zu);
      const pr = pr1 - pr2;

      if (x1 > x2) {
        return { error: "X₂ must be greater than X₁" };
      }

      // Clamp x1 and x2 to bounds
      let x1Clamped = x1;
      let x2Clamped = x2;

      if (x1Clamped > b) x1Clamped = b;
      if (x1Clamped < a) x1Clamped = a;
      if (x2Clamped > b) x2Clamped = b;
      if (x2Clamped < a) x2Clamped = a;

      // Generate chart data for left tail
      for (let i = a; i <= x1Clamped; i += step) {
        const xVal = sigFig(i, 5);
        const yVal = normalPDF(i, mean, sd);
        chartData.push([xVal, yVal, "", "", "", "", "", "", "", "", ""]);
      }

      // Generate chart data for middle (shaded area)
      for (let i = x1Clamped; i <= x2Clamped; i += step) {
        const xVal = sigFig(i, 5);
        const yVal = normalPDF(i, mean, sd);
        chartData.push([xVal, "", "", "", "", "", "", "", "", "", yVal]);
      }

      // Generate chart data for right tail
      for (let i = x2Clamped; i <= b; i += step) {
        const xVal = sigFig(i, 5);
        const yVal = normalPDF(i, mean, sd);
        chartData.push([xVal, yVal, "", "", "", "", "", "", "", "", ""]);
      }

      // Generate chartData2 (shaded area only)
      for (let i = x1Clamped; i <= x2Clamped; i += step) {
        const xVal = sigFig(i, 5);
        const yVal = normalPDF(i, mean, sd);
        chartData2.push([xVal, yVal, "", "", "", "", "", "", "", "", ""]);
      }

      result.tech_zu = zu;
      result.tech_pr = pr;
      result.tech_pr1 = pr1;
    } else if (probability === "left_tailed") {
      let x1Clamped = x1;
      if (x1Clamped > b) x1Clamped = b;
      if (x1Clamped < a) x1Clamped = a;

      // Generate chart data for left tail (shaded)
      for (let i = a; i <= x1Clamped; i += step) {
        const xVal = parseFloat(sigFig(i, 5));
        const yVal = parseFloat(normalPDF(i, mean, sd));
        chartData.push([xVal, yVal]);
      }

      // Generate chart data for right tail (unshaded)
      for (let i = x1Clamped; i <= b; i += step) {
        const xVal = parseFloat(sigFig(i, 5));
        const yVal = parseFloat(normalPDF(i, mean, sd));
        chartData.push([xVal, yVal]);
      }

      // Generate chartData2 (shaded area only)
      for (let i = a; i <= x1Clamped; i += step) {
        const xVal = sigFig(i, 5);
        const yVal = normalPDF(i, mean, sd);
        chartData2.push([xVal, yVal]);
      }
    } else {
      // right_tailed
      let x1Clamped = x1;
      if (x1Clamped > b) x1Clamped = b;
      if (x1Clamped < a) x1Clamped = a;

      // Generate chart data for left tail (unshaded)
      for (let i = a; i <= x1Clamped; i += step) {
        const xVal = sigFig(i, 5);
        const yVal = normalPDF(i, mean, sd);
        chartData.push([xVal, yVal]);
      }

      // Generate chart data for right tail (shaded)
      for (let i = x1Clamped; i <= b; i += step) {
        const xVal = sigFig(i, 5);
        const yVal = normalPDF(i, mean, sd);
        chartData.push([xVal, yVal]);
      }

      // Generate chartData2 (shaded area only)
      for (let i = a; i <= x1Clamped; i += step) {
        const xVal = sigFig(i, 5);
        const yVal = normalPDF(i, mean, sd);
        chartData2.push([xVal, yVal]);
      }
    }

    // Build result object - return original string values like Laravel
    result.tech_standard_error = standard_error;
    result.tech_mean = body.mean; // Original string value
    result.tech_deviation = body.deviation; // Original string value
    result.tech_probability = probability;
    result.tech_size = body.size; // Original string value
    result.tech_x1 = body.x1; // Original string value
    result.tech_x2 = body.x2; // Original string value
    result.tech_sd = sd;
    result.tech_zl = zl;
    result.tech_pr2 = pr2;
    result.tech_chartData = chartData;
    result.tech_chartData2 = chartData2;

    return result;
  }

  /** getCalculationAccuracycalculator
   * POST: /api/calculators-lol/accuracy-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationAccuracycalculator(body) {
    let true_positive = body.tech_true_positive?.trim();
    let false_negative = body.tech_false_negative?.trim();
    let false_positive = body.tech_false_positive?.trim();
    let true_negative = body.tech_true_negative?.trim();
    let prevalence = body.tech_prevalence?.trim();
    let sensitivity = body.tech_sensitivity?.trim();
    let specificity = body.tech_specificity?.trim();
    let observed_value = body.tech_observed_value?.trim();
    let accepted_value = body.tech_accepted_value?.trim();
    let method_unit = body.tech_method_unit?.trim();

    // Utility to check numeric
    function isNumeric(val) {
      return !isNaN(parseFloat(val)) && isFinite(val);
    }

    let answer;

    if (method_unit === "Standard method") {
      if (
        isNumeric(true_positive) &&
        isNumeric(false_negative) &&
        isNumeric(false_positive) &&
        isNumeric(true_negative)
      ) {
        let accu_add_sec = Number(true_positive) + Number(true_negative);
        let accu_add_all =
          accu_add_sec + Number(false_positive) + Number(false_negative);
        let accu_div = accu_add_sec / accu_add_all;
        answer = accu_div * 100;
      } else {
        return { error: "Please! Check Your Input" };
      }
    } else if (method_unit === "Prevalence method") {
      if (
        isNumeric(prevalence) &&
        isNumeric(sensitivity) &&
        isNumeric(specificity)
      ) {
        prevalence = Number(prevalence) / 100;
        let accu_se_pre =
          Number(sensitivity) * prevalence +
          Number(specificity) * (1 - prevalence);
        answer = accu_se_pre;
      } else {
        return { error: "Please! Check Your Input" };
      }
    } else {
      if (isNumeric(observed_value) && isNumeric(accepted_value)) {
        if (Number(accepted_value) === 0) {
          return { error: "Accepted value cannot be equal to zero." };
        }
        let per_error = Number(observed_value) - Number(accepted_value);
        let error_per = Math.abs(per_error) / Number(accepted_value);
        answer = error_per * 100;
      } else {
        return { error: "Please! Check Your Input" };
      }
    }

    return {
      tech_answer: answer,
      tech_method_unit: method_unit,
    };
  }

  /** getCalculationSampleSizecalculator
   * POST: /api/calculators-lol/sample-size-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationSampleSizecalculator(body) {
    let population = body.tech_population?.trim();
    let given_unit = body.tech_given_unit?.trim();
    let confidence_unit = body.tech_confidence_unit?.trim();
    let margin = body.tech_margin?.trim();
    let standard = body.tech_standard?.trim();
    let proportion = body.tech_proportion?.trim();
    let n_finite = body.tech_n_finite?.trim();

    function isNumeric(value) {
      return !isNaN(parseFloat(value)) && isFinite(value);
    }

    let param = {};
    let answer;

    // Convert confidence level to Z-score
    const confidenceMap = {
      "70%": 1.04,
      "75%": 1.15,
      "80%": 1.28,
      "85%": 1.44,
      "90%": 1.65,
      "95%": 1.96,
      "98%": 2.33,
      "99%": 2.58,
      "99.9%": 3.29,
    };
    confidence_unit = confidenceMap[confidence_unit] || 4.42;

    if (margin === "0" || proportion === "0") {
      return { error: "Accepted value cannot be equal to zero." };
    }

    if (population === "sample") {
      if (given_unit === "standard") {
        if (isNumeric(margin) && isNumeric(standard)) {
          margin = Number(margin) / 100;
          standard = Number(standard);
          let multiply = confidence_unit * standard;
          let divide = multiply / margin;
          let sub_answer = divide * divide;
          answer = Math.round(sub_answer);

          return {
            tech_margin: margin,
            tech_standard: standard,
            tech_confidence_unit: confidence_unit,
            tech_multiply: multiply,
            tech_divide: divide,
            tech_sub_answer: sub_answer,
            tech_answer: answer,
          };
        } else {
          return { error: "Please! Check Your Input" };
        }
      } else {
        if (isNumeric(margin) && isNumeric(proportion)) {
          margin = Number(margin) / 100;
          proportion = Number(proportion) / 100;
          let con_unit = confidence_unit ** 2;
          let minus = 1 - proportion;
          let marg = margin ** 2;
          let propro_sub = con_unit * proportion;
          let propro = propro_sub * minus;
          let propro_answer = propro / marg;
          answer = Math.round(propro_answer);

          return {
            tech_answer: answer,
            tech_confidence_unit: confidence_unit,
            tech_proportion: proportion,
            tech_margin: margin,
            tech_minus: minus,
            tech_marg: marg,
            tech_con_unit: con_unit,
            tech_propro: propro,
            tech_propro_answer: propro_answer,
          };
        } else {
          return { error: "Please! Check Your Input" };
        }
      }
    } else {
      if (given_unit === "standard") {
        if (isNumeric(margin) && isNumeric(standard) && isNumeric(n_finite)) {
          margin = Number(margin) / 100;
          standard = Number(standard);
          n_finite = Number(n_finite);

          let multiply = confidence_unit * standard;
          let divide = multiply / margin;
          let sub_answer = divide * divide;
          let n_answer = Math.round(sub_answer);
          let a_answer = n_answer * n_finite;
          let b_answer = n_answer + n_finite - 1;
          let answer_s = a_answer / b_answer;
          answer = Math.round(answer_s);

          return {
            tech_n_finite: n_finite,
            tech_margin: margin,
            tech_standard: standard,
            tech_confidence_unit: confidence_unit,
            tech_multiply: multiply,
            tech_divide: divide,
            tech_sub_answer: sub_answer,
            tech_a_answer: a_answer,
            tech_b_answer: b_answer,
            tech_answer: answer,
          };
        } else {
          return { error: "Please! Check Your Input" };
        }
      } else {
        if (isNumeric(margin) && isNumeric(proportion) && isNumeric(n_finite)) {
          margin = Number(margin) / 100;
          proportion = Number(proportion) / 100;
          n_finite = Number(n_finite);

          let con_unit = confidence_unit ** 2;
          let minus = 1 - proportion;
          let marg = margin ** 2;
          let propro_sub = con_unit * proportion;
          let propro = propro_sub * minus;
          let propro_answer = propro / marg;
          let sub_answer = Math.round(propro_answer);
          let a_answer = sub_answer * n_finite;
          let b_answer = sub_answer + n_finite - 1;
          let answer_s = a_answer / b_answer;
          answer = Math.round(answer_s);

          return {
            tech_n_finite: n_finite,
            tech_confidence_unit: confidence_unit,
            tech_proportion: proportion,
            tech_margin: margin,
            tech_minus: minus,
            tech_marg: marg,
            tech_con_unit: con_unit,
            tech_propro: propro,
            tech_propro_answer: propro_answer,
            tech_sub_answer: sub_answer,
            tech_a_answer: a_answer,
            tech_b_answer: b_answer,
            tech_answer: answer,
          };
        } else {
          return { error: "Please! Check Your Input" };
        }
      }
    }
  }

  /**
   * getCalculationNormalDistributionCalculator: Service Method
   * POST: /api/calculators-lol/normal-distribution-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationNormalDistributionCalculator(body) {
    let operations = body.tech_operations;
    let find_compare = body.tech_find_compare;
    let f_first = body.tech_f_first;
    let f_second = body.tech_f_second;
    let f_third = body.tech_f_third;
    let mean = body.tech_mean;
    let deviation = body.tech_deviation;
    let a = body.tech_a;
    let b = body.tech_b;
    let c = body.tech_c;
    let d = body.tech_d;
    let e1 = body.tech_e1;
    let e2 = body.tech_e2;
    let f = body.tech_f;

    const param = {};
    if (
      parseFloat(c) <= 0 ||
      parseFloat(c) >= 1 ||
      parseFloat(d) <= 0 ||
      parseFloat(d) >= 1 ||
      parseFloat(f) <= 0 ||
      parseFloat(f) >= 1
    ) {
      param.error = "Probability must be between 0 and 1";
      return param;
    }

    // Z-table data (same as before)
    const z_table = {
      "-4.0": {
        9: 0.00002,
        8: 0.00002,
        7: 0.00002,
        6: 0.00002,
        5: 0.00003,
        4: 0.00003,
        3: 0.00003,
        2: 0.00003,
        1: 0.00003,
        0: 0.00003,
      },
      "-3.9": {
        9: 0.00003,
        8: 0.00003,
        7: 0.00004,
        6: 0.00004,
        5: 0.00004,
        4: 0.00004,
        3: 0.00004,
        2: 0.00004,
        1: 0.00005,
        0: 0.00005,
      },
      "-3.8": {
        9: 0.00005,
        8: 0.00005,
        7: 0.00005,
        6: 0.00006,
        5: 0.00006,
        4: 0.00006,
        3: 0.00006,
        2: 0.00007,
        1: 0.00007,
        0: 0.00007,
      },
      "-3.7": {
        9: 0.00008,
        8: 0.00008,
        7: 0.00008,
        6: 0.00008,
        5: 0.00009,
        4: 0.00009,
        3: 0.0001,
        2: 0.0001,
        1: 0.0001,
        0: 0.00011,
      },
      "-3.6": {
        9: 0.00011,
        8: 0.00012,
        7: 0.00012,
        6: 0.00013,
        5: 0.00013,
        4: 0.00014,
        3: 0.00014,
        2: 0.00015,
        1: 0.00015,
        0: 0.00016,
      },
      "-3.5": {
        9: 0.00017,
        8: 0.00017,
        7: 0.00018,
        6: 0.00019,
        5: 0.00019,
        4: 0.0002,
        3: 0.00021,
        2: 0.00022,
        1: 0.00022,
        0: 0.00023,
      },
      "-3.4": {
        9: 0.00024,
        8: 0.00025,
        7: 0.00026,
        6: 0.00027,
        5: 0.00028,
        4: 0.00029,
        3: 0.0003,
        2: 0.00031,
        1: 0.00032,
        0: 0.00034,
      },
      "-3.3": {
        9: 0.00035,
        8: 0.00036,
        7: 0.00038,
        6: 0.00039,
        5: 0.0004,
        4: 0.00042,
        3: 0.00043,
        2: 0.00045,
        1: 0.00047,
        0: 0.00048,
      },
      "-3.2": {
        9: 0.0005,
        8: 0.00052,
        7: 0.00054,
        6: 0.00056,
        5: 0.00058,
        4: 0.0006,
        3: 0.00062,
        2: 0.00064,
        1: 0.00066,
        0: 0.00069,
      },
      "-3.1": {
        9: 0.00071,
        8: 0.00074,
        7: 0.00076,
        6: 0.00079,
        5: 0.00082,
        4: 0.00084,
        3: 0.00087,
        2: 0.0009,
        1: 0.00094,
        0: 0.00097,
      },
      "-3.0": {
        9: 0.001,
        8: 0.00104,
        7: 0.00107,
        6: 0.00111,
        5: 0.00114,
        4: 0.00118,
        3: 0.00122,
        2: 0.00126,
        1: 0.00131,
        0: 0.00135,
      },
      "-2.9": {
        9: 0.00139,
        8: 0.00144,
        7: 0.00149,
        6: 0.00154,
        5: 0.00159,
        4: 0.00164,
        3: 0.00169,
        2: 0.00175,
        1: 0.00181,
        0: 0.00187,
      },
      "-2.8": {
        9: 0.00193,
        8: 0.00199,
        7: 0.00205,
        6: 0.00212,
        5: 0.00219,
        4: 0.00226,
        3: 0.00233,
        2: 0.0024,
        1: 0.00248,
        0: 0.00256,
      },
      "-2.7": {
        9: 0.00264,
        8: 0.00272,
        7: 0.0028,
        6: 0.00289,
        5: 0.00298,
        4: 0.00307,
        3: 0.00317,
        2: 0.00326,
        1: 0.00336,
        0: 0.00347,
      },
      "-2.6": {
        9: 0.00357,
        8: 0.00368,
        7: 0.00379,
        6: 0.00391,
        5: 0.00402,
        4: 0.00415,
        3: 0.00427,
        2: 0.0044,
        1: 0.00453,
        0: 0.00466,
      },
      "-2.5": {
        9: 0.0048,
        8: 0.00494,
        7: 0.00508,
        6: 0.00523,
        5: 0.00539,
        4: 0.00554,
        3: 0.0057,
        2: 0.00587,
        1: 0.00604,
        0: 0.00621,
      },
      "-2.4": {
        9: 0.00639,
        8: 0.00657,
        7: 0.00676,
        6: 0.00695,
        5: 0.00714,
        4: 0.00734,
        3: 0.00755,
        2: 0.00776,
        1: 0.00798,
        0: 0.0082,
      },
      "-2.3": {
        9: 0.00842,
        8: 0.00866,
        7: 0.00889,
        6: 0.00914,
        5: 0.00939,
        4: 0.00964,
        3: 0.0099,
        2: 0.01017,
        1: 0.01044,
        0: 0.01072,
      },
      "-2.2": {
        9: 0.01101,
        8: 0.0113,
        7: 0.0116,
        6: 0.01191,
        5: 0.01222,
        4: 0.01255,
        3: 0.01287,
        2: 0.01321,
        1: 0.01355,
        0: 0.0139,
      },
      "-2.1": {
        9: 0.01426,
        8: 0.01463,
        7: 0.015,
        6: 0.01539,
        5: 0.01578,
        4: 0.01618,
        3: 0.01659,
        2: 0.017,
        1: 0.01743,
        0: 0.01786,
      },
      "-2.0": {
        9: 0.01831,
        8: 0.01876,
        7: 0.01923,
        6: 0.0197,
        5: 0.02018,
        4: 0.02068,
        3: 0.02118,
        2: 0.02169,
        1: 0.02222,
        0: 0.02275,
      },
      "-1.9": {
        9: 0.0233,
        8: 0.02385,
        7: 0.02442,
        6: 0.025,
        5: 0.02559,
        4: 0.02619,
        3: 0.0268,
        2: 0.02743,
        1: 0.02807,
        0: 0.02872,
      },
      "-1.8": {
        9: 0.02938,
        8: 0.03005,
        7: 0.03074,
        6: 0.03144,
        5: 0.03216,
        4: 0.03288,
        3: 0.03362,
        2: 0.03438,
        1: 0.03515,
        0: 0.03593,
      },
      "-1.7": {
        9: 0.03673,
        8: 0.03754,
        7: 0.03836,
        6: 0.0392,
        5: 0.04006,
        4: 0.04093,
        3: 0.04182,
        2: 0.04272,
        1: 0.04363,
        0: 0.04457,
      },
      "-1.6": {
        9: 0.04551,
        8: 0.04648,
        7: 0.04746,
        6: 0.04846,
        5: 0.04947,
        4: 0.0505,
        3: 0.05155,
        2: 0.05262,
        1: 0.0537,
        0: 0.0548,
      },
      "-1.5": {
        9: 0.0559,
        8: 0.0571,
        7: 0.0582,
        6: 0.0594,
        5: 0.0606,
        4: 0.0618,
        3: 0.063,
        2: 0.0643,
        1: 0.0655,
        0: 0.0668,
      },
      "-1.4": {
        9: 0.0681,
        8: 0.0694,
        7: 0.0708,
        6: 0.0721,
        5: 0.0735,
        4: 0.0749,
        3: 0.0764,
        2: 0.0778,
        1: 0.0793,
        0: 0.0808,
      },
      "-1.3": {
        9: 0.0823,
        8: 0.0838,
        7: 0.0853,
        6: 0.0869,
        5: 0.0885,
        4: 0.0901,
        3: 0.0918,
        2: 0.0934,
        1: 0.0951,
        0: 0.0968,
      },
      "-1.2": {
        9: 0.0985,
        8: 0.1003,
        7: 0.102,
        6: 0.1038,
        5: 0.1056,
        4: 0.1075,
        3: 0.1093,
        2: 0.1112,
        1: 0.1131,
        0: 0.1151,
      },
      "-1.1": {
        9: 0.117,
        8: 0.119,
        7: 0.121,
        6: 0.123,
        5: 0.1251,
        4: 0.1271,
        3: 0.1292,
        2: 0.1314,
        1: 0.1335,
        0: 0.1357,
      },
      "-1.0": {
        9: 0.1379,
        8: 0.1401,
        7: 0.1423,
        6: 0.1446,
        5: 0.1469,
        4: 0.1492,
        3: 0.1515,
        2: 0.1539,
        1: 0.1562,
        0: 0.1587,
      },
      "-0.9": {
        9: 0.1611,
        8: 0.1635,
        7: 0.166,
        6: 0.1685,
        5: 0.1711,
        4: 0.1736,
        3: 0.1762,
        2: 0.1788,
        1: 0.1814,
        0: 0.1841,
      },
      "-0.8": {
        9: 0.1867,
        8: 0.1894,
        7: 0.1922,
        6: 0.1949,
        5: 0.1977,
        4: 0.2005,
        3: 0.2033,
        2: 0.2061,
        1: 0.209,
        0: 0.2119,
      },
      "-0.7": {
        9: 0.2148,
        8: 0.2177,
        7: 0.2206,
        6: 0.2236,
        5: 0.2266,
        4: 0.2296,
        3: 0.2327,
        2: 0.2358,
        1: 0.2389,
        0: 0.242,
      },
      "-0.6": {
        9: 0.2451,
        8: 0.2483,
        7: 0.2514,
        6: 0.2546,
        5: 0.2578,
        4: 0.2611,
        3: 0.2643,
        2: 0.2676,
        1: 0.2709,
        0: 0.2743,
      },
      "-0.5": {
        9: 0.2776,
        8: 0.281,
        7: 0.2843,
        6: 0.2877,
        5: 0.2912,
        4: 0.2946,
        3: 0.2981,
        2: 0.3015,
        1: 0.305,
        0: 0.3085,
      },
      "-0.4": {
        9: 0.3121,
        8: 0.3156,
        7: 0.3192,
        6: 0.3228,
        5: 0.3264,
        4: 0.33,
        3: 0.3336,
        2: 0.3372,
        1: 0.3409,
        0: 0.3446,
      },
      "-0.3": {
        9: 0.3483,
        8: 0.352,
        7: 0.3557,
        6: 0.3594,
        5: 0.3632,
        4: 0.3669,
        3: 0.3707,
        2: 0.3745,
        1: 0.3783,
        0: 0.3821,
      },
      "-0.2": {
        9: 0.3829,
        8: 0.3897,
        7: 0.3936,
        6: 0.3974,
        5: 0.4013,
        4: 0.4052,
        3: 0.409,
        2: 0.4129,
        1: 0.4168,
        0: 0.4207,
      },
      "-0.1": {
        9: 0.4247,
        8: 0.4286,
        7: 0.4325,
        6: 0.4364,
        5: 0.4404,
        4: 0.4443,
        3: 0.4483,
        2: 0.4522,
        1: 0.4562,
        0: 0.4602,
      },
      "-0.0": {
        9: 0.4641,
        8: 0.4681,
        7: 0.4721,
        6: 0.4761,
        5: 0.4801,
        4: 0.484,
        3: 0.488,
        2: 0.492,
        1: 0.496,
        0: 0.5,
      },
      "0.0": {
        0: 0.5,
        1: 0.50399,
        2: 0.50798,
        3: 0.51197,
        4: 0.51595,
        5: 0.51994,
        6: 0.52392,
        7: 0.5279,
        8: 0.53188,
        9: 0.53586,
      },
      0.1: {
        0: 0.5398,
        1: 0.5438,
        2: 0.54776,
        3: 0.55172,
        4: 0.55567,
        5: 0.55966,
        6: 0.5636,
        7: 0.56749,
        8: 0.57142,
        9: 0.57535,
      },
      0.2: {
        0: 0.5793,
        1: 0.58317,
        2: 0.58706,
        3: 0.59095,
        4: 0.59483,
        5: 0.59871,
        6: 0.60257,
        7: 0.60642,
        8: 0.61026,
        9: 0.61409,
      },
      0.3: {
        0: 0.61791,
        1: 0.62172,
        2: 0.62552,
        3: 0.6293,
        4: 0.63307,
        5: 0.63683,
        6: 0.64058,
        7: 0.64431,
        8: 0.64803,
        9: 0.65173,
      },
      0.4: {
        0: 0.65542,
        1: 0.6591,
        2: 0.66276,
        3: 0.6664,
        4: 0.67003,
        5: 0.67364,
        6: 0.67724,
        7: 0.68082,
        8: 0.68439,
        9: 0.68793,
      },
      0.5: {
        0: 0.69146,
        1: 0.69497,
        2: 0.69847,
        3: 0.70194,
        4: 0.7054,
        5: 0.70884,
        6: 0.71226,
        7: 0.71566,
        8: 0.71904,
        9: 0.7224,
      },
      0.6: {
        0: 0.72575,
        1: 0.72907,
        2: 0.73237,
        3: 0.73565,
        4: 0.73891,
        5: 0.74215,
        6: 0.74537,
        7: 0.74857,
        8: 0.75175,
        9: 0.7549,
      },
      0.7: {
        0: 0.75804,
        1: 0.76115,
        2: 0.76424,
        3: 0.7673,
        4: 0.77035,
        5: 0.77337,
        6: 0.77637,
        7: 0.77935,
        8: 0.7823,
        9: 0.78524,
      },
      0.8: {
        0: 0.78814,
        1: 0.79103,
        2: 0.79389,
        3: 0.79673,
        4: 0.79955,
        5: 0.80234,
        6: 0.80511,
        7: 0.80785,
        8: 0.81057,
        9: 0.81327,
      },
      0.9: {
        0: 0.81594,
        1: 0.81859,
        2: 0.82121,
        3: 0.82381,
        4: 0.82639,
        5: 0.82894,
        6: 0.83147,
        7: 0.83398,
        8: 0.83646,
        9: 0.83891,
      },
      "1.0": {
        0: 0.84134,
        1: 0.84375,
        2: 0.84614,
        3: 0.84849,
        4: 0.85083,
        5: 0.85314,
        6: 0.85543,
        7: 0.85769,
        8: 0.85993,
        9: 0.86214,
      },
      1.1: {
        0: 0.86433,
        1: 0.8665,
        2: 0.86864,
        3: 0.87076,
        4: 0.87286,
        5: 0.87493,
        6: 0.87698,
        7: 0.879,
        8: 0.881,
        9: 0.88298,
      },
      1.2: {
        0: 0.88493,
        1: 0.88686,
        2: 0.88877,
        3: 0.89065,
        4: 0.89251,
        5: 0.89435,
        6: 0.89617,
        7: 0.89796,
        8: 0.89973,
        9: 0.90147,
      },
      1.3: {
        0: 0.9032,
        1: 0.9049,
        2: 0.90658,
        3: 0.90824,
        4: 0.90988,
        5: 0.91149,
        6: 0.91308,
        7: 0.91466,
        8: 0.91621,
        9: 0.91774,
      },
      1.4: {
        0: 0.91924,
        1: 0.92073,
        2: 0.9222,
        3: 0.92364,
        4: 0.92507,
        5: 0.92647,
        6: 0.92785,
        7: 0.92922,
        8: 0.93056,
        9: 0.93189,
      },
      1.5: {
        0: 0.93319,
        1: 0.93448,
        2: 0.93574,
        3: 0.93699,
        4: 0.93822,
        5: 0.93943,
        6: 0.94062,
        7: 0.94179,
        8: 0.94295,
        9: 0.94408,
      },
      1.6: {
        0: 0.9452,
        1: 0.9463,
        2: 0.94738,
        3: 0.94845,
        4: 0.9495,
        5: 0.95053,
        6: 0.95154,
        7: 0.95254,
        8: 0.95352,
        9: 0.95449,
      },
      1.7: {
        0: 0.95543,
        1: 0.95637,
        2: 0.95728,
        3: 0.95818,
        4: 0.95907,
        5: 0.95994,
        6: 0.9608,
        7: 0.96164,
        8: 0.96246,
        9: 0.96327,
      },
      1.8: {
        0: 0.96407,
        1: 0.96485,
        2: 0.96562,
        3: 0.96638,
        4: 0.96712,
        5: 0.96784,
        6: 0.96856,
        7: 0.96926,
        8: 0.96995,
        9: 0.97062,
      },
      1.9: {
        0: 0.97128,
        1: 0.97193,
        2: 0.97257,
        3: 0.9732,
        4: 0.97381,
        5: 0.97441,
        6: 0.975,
        7: 0.97558,
        8: 0.97615,
        9: 0.9767,
      },
      "2.0": {
        0: 0.97725,
        1: 0.97778,
        2: 0.97831,
        3: 0.97882,
        4: 0.97932,
        5: 0.97982,
        6: 0.9803,
        7: 0.98077,
        8: 0.98124,
        9: 0.98169,
      },
      2.1: {
        0: 0.98214,
        1: 0.98257,
        2: 0.983,
        3: 0.98341,
        4: 0.98382,
        5: 0.98422,
        6: 0.98461,
        7: 0.985,
        8: 0.98537,
        9: 0.98574,
      },
      2.2: {
        0: 0.9861,
        1: 0.98645,
        2: 0.98679,
        3: 0.98713,
        4: 0.98745,
        5: 0.98778,
        6: 0.98809,
        7: 0.9884,
        8: 0.9887,
        9: 0.98899,
      },
      2.3: {
        0: 0.98928,
        1: 0.98956,
        2: 0.98983,
        3: 0.9901,
        4: 0.99036,
        5: 0.99061,
        6: 0.99086,
        7: 0.99111,
        8: 0.99134,
        9: 0.99158,
      },
      2.4: {
        0: 0.9918,
        1: 0.99202,
        2: 0.99224,
        3: 0.99245,
        4: 0.99266,
        5: 0.99286,
        6: 0.99305,
        7: 0.99324,
        8: 0.99343,
        9: 0.99361,
      },
      2.5: {
        0: 0.99379,
        1: 0.99396,
        2: 0.99413,
        3: 0.9943,
        4: 0.99446,
        5: 0.99461,
        6: 0.99477,
        7: 0.99492,
        8: 0.99506,
        9: 0.9952,
      },
      2.6: {
        0: 0.99534,
        1: 0.99547,
        2: 0.9956,
        3: 0.99573,
        4: 0.99585,
        5: 0.99598,
        6: 0.99609,
        7: 0.99621,
        8: 0.99632,
        9: 0.99643,
      },
      2.7: {
        0: 0.99653,
        1: 0.99664,
        2: 0.99674,
        3: 0.99683,
        4: 0.99693,
        5: 0.99702,
        6: 0.99711,
        7: 0.9972,
        8: 0.99728,
        9: 0.99736,
      },
      2.8: {
        0: 0.99744,
        1: 0.99752,
        2: 0.9976,
        3: 0.99767,
        4: 0.99774,
        5: 0.99781,
        6: 0.99788,
        7: 0.99795,
        8: 0.99801,
        9: 0.99807,
      },
      2.9: {
        0: 0.99813,
        1: 0.99819,
        2: 0.99825,
        3: 0.99831,
        4: 0.99836,
        5: 0.99841,
        6: 0.99846,
        7: 0.99851,
        8: 0.99856,
        9: 0.99861,
      },
      "3.0": {
        0: 0.99865,
        1: 0.99869,
        2: 0.99874,
        3: 0.99878,
        4: 0.99882,
        5: 0.99886,
        6: 0.99889,
        7: 0.99893,
        8: 0.99896,
        9: 0.999,
      },
      3.1: {
        0: 0.99903,
        1: 0.99906,
        2: 0.9991,
        3: 0.99913,
        4: 0.99916,
        5: 0.99918,
        6: 0.99921,
        7: 0.99924,
        8: 0.99926,
        9: 0.99929,
      },
      3.2: {
        0: 0.99931,
        1: 0.99934,
        2: 0.99936,
        3: 0.99938,
        4: 0.9994,
        5: 0.99942,
        6: 0.99944,
        7: 0.99946,
        8: 0.99948,
        9: 0.9995,
      },
      3.3: {
        0: 0.99952,
        1: 0.99953,
        2: 0.99955,
        3: 0.99957,
        4: 0.99958,
        5: 0.9996,
        6: 0.99961,
        7: 0.99962,
        8: 0.99964,
        9: 0.99965,
      },
      3.4: {
        0: 0.99966,
        1: 0.99968,
        2: 0.99969,
        3: 0.9997,
        4: 0.99971,
        5: 0.99972,
        6: 0.99973,
        7: 0.99974,
        8: 0.99975,
        9: 0.99976,
      },
      3.5: {
        0: 0.99977,
        1: 0.99978,
        2: 0.99978,
        3: 0.99979,
        4: 0.9998,
        5: 0.99981,
        6: 0.99981,
        7: 0.99982,
        8: 0.99983,
        9: 0.99983,
      },
      3.6: {
        0: 0.99984,
        1: 0.99985,
        2: 0.99985,
        3: 0.99986,
        4: 0.99986,
        5: 0.99987,
        6: 0.99987,
        7: 0.99988,
        8: 0.99988,
        9: 0.99989,
      },
      3.7: {
        0: 0.99989,
        1: 0.9999,
        2: 0.9999,
        3: 0.9999,
        4: 0.99991,
        5: 0.99991,
        6: 0.99992,
        7: 0.99992,
        8: 0.99992,
        9: 0.99992,
      },
      3.8: {
        0: 0.99993,
        1: 0.99993,
        2: 0.99993,
        3: 0.99994,
        4: 0.99994,
        5: 0.99994,
        6: 0.99994,
        7: 0.99995,
        8: 0.99995,
        9: 0.99995,
      },
      3.9: {
        0: 0.99995,
        1: 0.99995,
        2: 0.99996,
        3: 0.99996,
        4: 0.99996,
        5: 0.99996,
        6: 0.99996,
        7: 0.99996,
        8: 0.99997,
        9: 0.99997,
      },
      "4.0": {
        0: 0.99997,
        1: 0.99997,
        2: 0.99997,
        3: 0.99997,
        4: 0.99997,
        5: 0.99997,
        6: 0.99998,
        7: 0.99998,
        8: 0.99998,
        9: 0.99998,
      },
    };

    // Helper function: zain
    const zain = (rz) => {
      const rzStr = String(rz);
      const rz_check = rzStr.split("");
      let rz_val1, rz_val2;

      if (rz_check.length > 1) {
        if (rz < 0) {
          if (rz_check.length === 2) {
            rz_val1 = `${rz_check[0]}${rz_check[1]}.0`;
            rz_val2 = 0;
          } else {
            rz_val1 = rzStr.substring(0, 4);
            rz_val2 = rzStr.length > 4 ? parseInt(rz_check[4]) : 0;
          }
        } else {
          rz_val1 = rzStr.substring(0, 3);
          rz_val2 = rzStr.length > 3 ? parseInt(rz_check[3]) : 0;
        }
      } else {
        rz_val1 = `${rz_check[0]}.0`;
        rz_val2 = 0;
      }

      let ltpv, rtpv;
      if (rz >= 4.1) {
        ltpv = 1;
        rtpv = 0;
      } else if (rz <= -4.1) {
        ltpv = 0;
        rtpv = 1;
      } else {
        ltpv = parseFloat(z_table[rz_val1]?.[rz_val2]?.toFixed(5) || 0);
        rtpv = parseFloat((1 - ltpv).toFixed(5));
      }

      const ttcl = ltpv - rtpv;
      const ttpv = 1 - Math.abs(ttcl);

      let z_url = getZUrl(rz);
      rz = parseFloat(rz.toFixed(4));
      return [z_url, ltpv, rtpv, ttpv, ttcl, rz];
    };

    // Helper function: getZUrl
    const getZUrl = (rz) => {
      rz = parseFloat(rz);
      if (rz < -0.126 && rz > -0.376) return "z_score_-0.25";
      if (rz < -0.375 && rz > -0.626) return "z_score_-0.5";
      if (rz < -0.625 && rz > -0.876) return "z_score_-0.75";
      if (rz < -0.875 && rz > -1.126) return "z_score_-1";
      if (rz < -1.125 && rz > -1.376) return "z_score_-1.25";
      if (rz < -1.375 && rz > -1.626) return "z_score_-1.5";
      if (rz < -1.625 && rz > -1.876) return "z_score_-1.75";
      if (rz < -1.875 && rz > -2.126) return "z_score_-2";
      if (rz < -2.125 && rz > -2.376) return "z_score_-2.25";
      if (rz < -2.375 && rz > -2.626) return "z_score_-2.5";
      if (rz < -2.625 && rz > -2.876) return "z_score_-2.75";
      if (rz < -2.875 && rz > -3.126) return "z_score_-3";
      if (rz < -3.125 && rz > -3.376) return "z_score_-3.25";
      if (rz < -3.375 && rz > -3.626) return "z_score_-3.5";
      if (rz < -3.625 && rz > -3.876) return "z_score_-3.75";
      if (rz < -3.875 && rz > -4.126) return "z_score_-4";
      if (rz < -4.125) return "z_score_-4.25";
      if (rz > -0.126 && rz < 0.125) return "z_score_0";
      if (rz > 0.124 && rz < 0.375) return "z_score_0.25";
      if (rz > 0.374 && rz < 0.625) return "z_score_0.5";
      if (rz > 0.624 && rz < 0.875) return "z_score_0.75";
      if (rz > 0.874 && rz < 1.125) return "z_score_1";
      if (rz > 1.124 && rz < 1.375) return "z_score_1.25";
      if (rz > 1.374 && rz < 1.625) return "z_score_1.5";
      if (rz > 1.624 && rz < 1.875) return "z_score_1.75";
      if (rz > 1.874 && rz < 2.125) return "z_score_2";
      if (rz > 2.124 && rz < 2.375) return "z_score_2.25";
      if (rz > 2.374 && rz < 2.625) return "z_score_2.5";
      if (rz > 2.624 && rz < 2.875) return "z_score_2.75";
      if (rz > 2.874 && rz < 3.125) return "z_score_3";
      if (rz > 3.124 && rz < 3.375) return "z_score_3.25";
      if (rz > 3.374 && rz < 3.625) return "z_score_3.5";
      if (rz > 3.624 && rz < 3.875) return "z_score_3.75";
      if (rz > 3.874 && rz < 4.125) return "z_score_4";
      if (rz > 4.124) return "z_score_4.25";
      return "z_score_";
    };

    // Helper function: zinv (inverse normal distribution)
    const zinv = (p) => {
      const a1 = -39.6968302866538;
      const a2 = 220.946098424521;
      const a3 = -275.928510446969;
      const a4 = 138.357751867269;
      const a5 = -30.6647980661472;
      const a6 = 2.50662827745924;
      const b1 = -54.4760987982241;
      const b2 = 161.585836858041;
      const b3 = -155.698979859887;
      const b4 = 66.8013118877197;
      const b5 = -13.2806815528857;
      const c1 = -7.78489400243029e-3;
      const c2 = -0.322396458041136;
      const c3 = -2.40075827716184;
      const c4 = -2.54973253934373;
      const c5 = 4.37466414146497;
      const c6 = 2.93816398269878;
      const d1 = 7.78469570904146e-3;
      const d2 = 0.32246712907004;
      const d3 = 2.445134137143;
      const d4 = 3.75440866190742;
      const p_low = 0.02425;
      const p_high = 1 - p_low;

      if (p < 0 || p > 1) {
        return 0;
      } else if (p < p_low) {
        const q = Math.sqrt(-2 * Math.log(p));
        return (
          (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
          ((((d1 * q + d2) * q + d3) * q + d4) * q + 1)
        );
      } else if (p <= p_high) {
        const q = p - 0.5;
        const r = q * q;
        return (
          ((((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q) /
          (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1)
        );
      } else {
        const q = Math.sqrt(-2 * Math.log(1 - p));
        return (
          -(((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
          ((((d1 * q + d2) * q + d3) * q + d4) * q + 1)
        );
      }
    };

    // Check if value is numeric
    const isNumeric = (val) => !isNaN(parseFloat(val)) && isFinite(val);

    // Main logic
    if (operations === "3") {
      if (find_compare === "1") {
        if (isNumeric(f_first) && isNumeric(f_second) && isNumeric(f_third)) {
          if (Number(f_first) > 0 && Number(f_first) < 1) {
            if (parseFloat(f_third) > 0) {
              let x1 = zinv(parseFloat(f_first));
              x1 = -1 * parseFloat(f_second) + parseFloat(f_third) * x1;
              const ul = parseFloat(f_second) + 3.1 * parseFloat(f_third);
              const ll = -1 * x1;
              const above = Math.round(10000000 * ll) / 10000000;

              x1 = zinv(parseFloat(f_first));
              x1 = parseFloat(f_second) + parseFloat(f_third) * x1;
              const blow = Math.round(10000000 * x1) / 10000000;

              const f_first2 = parseFloat(f_first) / 2;
              x1 = zinv(0.5 - f_first2);
              const ll_val =
                Math.round(
                  (parseFloat(f_second) + parseFloat(f_third) * x1) * 100000000
                ) / 100000000;
              const ul_val =
                Math.round(
                  (parseFloat(f_second) + parseFloat(f_third) * (-1 * x1)) *
                    100000000
                ) / 100000000;

              const f_first3 = parseFloat(f_first) / 2;
              x1 = zinv(f_first3);
              const ll1_val =
                Math.round(
                  (parseFloat(f_second) + parseFloat(f_third) * x1) * 100000000
                ) / 100000000;
              const ul1_val =
                Math.round(
                  (parseFloat(f_second) + parseFloat(f_third) * (-1 * x1)) *
                    100000000
                ) / 100000000;

              param.tech_z_url = getZUrl(parseFloat(f_first));
              param.tech_above_first = above;
              param.tech_blow_first = blow;
              param.tech_ll_first = ll_val;
              param.tech_ul_first = ul_val;
              param.tech_ll1_first = ll1_val;
              param.tech_ul1_first = ul1_val;
              param.tech_option1 = 1;
            } else {
              param.error = "The standard deviation must be greater than zero.";
              return param;
            }
          } else {
            param.error = "Probability must be between 0 and 1.";
            return param;
          }
        } else {
          param.error = "Please! Check Your Input";
          return param;
        }
      } else if (find_compare === "2") {
        if (isNumeric(f_first) && isNumeric(f_second) && isNumeric(f_third)) {
          if (parseFloat(f_third) > 0) {
            const ms_first = parseFloat(f_first) - parseFloat(f_second);
            const rz_first =
              (parseFloat(f_first) - parseFloat(f_second)) /
              parseFloat(f_third);
            const zaini_first = zain(rz_first);

            param.tech_z_url = getZUrl(Math.abs(zaini_first[1]));
            param.tech_z_url_first = zaini_first[0];
            param.tech_ltpv_first = Math.abs(zaini_first[1]);
            param.tech_rtpv_first = Math.abs(zaini_first[2]);
            param.tech_ttpv_first = Math.abs(zaini_first[3]);
            param.tech_ttcl_first = Math.abs(zaini_first[4]);
            param.tech_ms_first = ms_first;
            param.tech_rz_first = parseFloat(rz_first.toFixed(4));
            param.tech_option2 = 2;
          } else {
            param.error = "The standard deviation must be greater than zero.";
            return param;
          }
        } else {
          param.error = "Please! Check Your Input";
          return param;
        }
      }
    } else if (operations === "4") {
      // Collect errors instead of returning immediately
      const errors = [];
      // Handle operation 4 - value 'a'
      if (isNumeric(a)) {
        if (isNumeric(mean) && isNumeric(deviation)) {
          if (parseFloat(deviation) > 0) {
            const ms = parseFloat(a) - parseFloat(mean);
            const rzss =
              (parseFloat(a) - parseFloat(mean)) / parseFloat(deviation);
            const zaini = zain(rzss);
            const rz = Math.abs(zaini[1]);
            param.tech_z_url = getZUrl(Math.abs(zaini[1]));
            param.tech_ltpv = Math.abs(zaini[1]);
            param.tech_rtpv = Math.abs(zaini[2]);
            param.tech_ttpv = Math.abs(zaini[3]);
            param.tech_ttcl = Math.abs(zaini[4]);
            param.tech_ms = ms;
            param.tech_rz = parseFloat(rz.toFixed(4));
            param.tech_a = parseFloat(a);
          } else {
            errors.push("The standard deviation must be greater than zero.");
          }
        } else {
          errors.push("Please! Check Your Input for field 'a'");
        }
      }

      // Handle operation 4 - value 'b'
      if (isNumeric(b)) {
        if (isNumeric(mean) && isNumeric(deviation)) {
          if (parseFloat(deviation) > 0) {
            const ms2 = parseFloat(b) - parseFloat(mean);
            const rz2 =
              (parseFloat(b) - parseFloat(mean)) / parseFloat(deviation);
            const zaini2 = zain(rz2);

            param.tech_z_url2 = getZUrl(Math.abs(zaini2[2]));
            param.tech_ltpv2 = Math.abs(zaini2[1]);
            param.tech_rtpv2 = Math.abs(zaini2[2]);
            param.tech_ttpv2 = Math.abs(zaini2[3]);
            param.tech_ttcl2 = Math.abs(zaini2[4]);
            param.tech_ms2 = ms2;
            param.tech_rz2 = parseFloat(rz2.toFixed(4));
            param.tech_b = parseFloat(b);
          } else {
            // Don't add duplicate error
            if (
              !errors.includes(
                "The standard deviation must be greater than zero."
              )
            ) {
              errors.push("The standard deviation must be greater than zero.");
            }
          }
        } else {
          errors.push("Please! Check Your Input for field 'b'");
        }
      }

      // Handle operation 4 - value 'c'
      if (isNumeric(c)) {
        if (isNumeric(mean) && isNumeric(deviation)) {
          if (parseFloat(deviation) > 0) {
            if (parseFloat(c) > 0 && parseFloat(c) < 1) {
              let x1 = zinv(parseFloat(c));
              x1 = -1 * parseFloat(mean) + parseFloat(deviation) * x1;
              const ul = parseFloat(mean) + 3.1 * parseFloat(deviation);
              const ll = -1 * x1;
              const above = Math.round(10000000 * ll) / 10000000;

              x1 = zinv(parseFloat(c));
              x1 = parseFloat(mean) + parseFloat(deviation) * x1;
              const blow = Math.round(10000000 * x1) / 10000000;

              const c2 = parseFloat(c) / 2;
              x1 = zinv(0.5 - c2);
              const ll_val =
                Math.round(
                  (parseFloat(mean) + parseFloat(deviation) * x1) * 100000000
                ) / 100000000;
              const ul_val =
                Math.round(
                  (parseFloat(mean) + parseFloat(deviation) * (-1 * x1)) *
                    100000000
                ) / 100000000;

              const c3 = parseFloat(c) / 2;
              x1 = zinv(c3);
              const ll1_val =
                Math.round(
                  (parseFloat(mean) + parseFloat(deviation) * x1) * 100000000
                ) / 100000000;
              const ul1_val =
                Math.round(
                  (parseFloat(mean) + parseFloat(deviation) * (-1 * x1)) *
                    100000000
                ) / 100000000;

              param.tech_z_urlc = getZUrl(parseFloat(c));
              param.tech_above = above;
              param.tech_blow = blow;
              param.tech_ll = ll_val;
              param.tech_ul = ul_val;
              param.tech_ll1 = ll1_val;
              param.tech_ul1 = ul1_val;
              param.tech_c = parseFloat(c);
            } else {
              errors.push("Probability must be between 0 and 1 for field 'c'");
            }
          } else {
            // Don't add duplicate error
            if (
              !errors.includes(
                "The standard deviation must be greater than zero."
              )
            ) {
              errors.push("The standard deviation must be greater than zero.");
            }
          }
        } else {
          errors.push("Please! Check Your Input for field 'c'");
        }
      }

      // Handle operation 4 - value 'd'
      if (isNumeric(d)) {
        if (isNumeric(mean) && isNumeric(deviation)) {
          if (parseFloat(deviation) > 0) {
            if (parseFloat(d) > 0 && parseFloat(d) < 1) {
              let x1 = zinv(parseFloat(d));
              x1 = -1 * parseFloat(mean) + parseFloat(deviation) * x1;
              const ul = parseFloat(mean) + 3.1 * parseFloat(deviation);
              const ll = -1 * x1;
              const above = Math.round(10000000 * ll) / 10000000;

              x1 = zinv(parseFloat(d));
              x1 = parseFloat(mean) + parseFloat(deviation) * x1;
              const blow = Math.round(10000000 * x1) / 10000000;

              const d2 = parseFloat(d) / 2;
              x1 = zinv(0.5 - d2);
              const ll_val =
                Math.round(
                  (parseFloat(mean) + parseFloat(deviation) * x1) * 100000000
                ) / 100000000;
              const ul_val =
                Math.round(
                  (parseFloat(mean) + parseFloat(deviation) * (-1 * x1)) *
                    100000000
                ) / 100000000;

              const d3 = parseFloat(d) / 2;
              x1 = zinv(d3);
              const ll1_val =
                Math.round(
                  (parseFloat(mean) + parseFloat(deviation) * x1) * 100000000
                ) / 100000000;
              const ul1_val =
                Math.round(
                  (parseFloat(mean) + parseFloat(deviation) * (-1 * x1)) *
                    100000000
                ) / 100000000;

              param.tech_z_urld = getZUrl(parseFloat(d));
              param.tech_above2 = above;
              param.tech_blow2 = blow;
              param.tech_ll2 = ll_val;
              param.tech_ul2 = ul_val;
              param.tech_ll12 = ll1_val;
              param.tech_ul12 = ul1_val;
              param.tech_d = parseFloat(d);
            } else {
              errors.push("Probability must be between 0 and 1 for field 'd'");
            }
          } else {
            // Don't add duplicate error
            if (
              !errors.includes(
                "The standard deviation must be greater than zero."
              )
            ) {
              errors.push("The standard deviation must be greater than zero.");
            }
          }
        } else {
          errors.push("Please! Check Your Input for field 'd'");
        }
      }

      // Handle operation 4 - interval e1 and e2
      if (isNumeric(e1) && isNumeric(e2)) {
        if (isNumeric(mean) && isNumeric(deviation)) {
          if (parseFloat(deviation) > 0) {
            if (parseFloat(e1) < parseFloat(e2)) {
              const ms_e1 = parseFloat(e1) - parseFloat(mean);
              const rz_e1 =
                (parseFloat(e1) - parseFloat(mean)) / parseFloat(deviation);
              const zaini_e1 = zain(rz_e1);

              param.tech_z_url_e1 = zaini_e1[0];
              param.tech_ltpv_e1 = Math.abs(zaini_e1[1]);
              param.tech_rtpv_e1 = Math.abs(zaini_e1[2]);
              param.tech_ttpv_e1 = Math.abs(zaini_e1[3]);
              param.tech_ttcl_e1 = Math.abs(zaini_e1[4]);
              param.tech_ms_e1 = ms_e1;
              param.tech_rz_e1 = parseFloat(rz_e1.toFixed(4));

              const ms_e2 = parseFloat(e2) - parseFloat(mean);
              const rz_e2 =
                (parseFloat(e2) - parseFloat(mean)) / parseFloat(deviation);
              const zaini_e2 = zain(rz_e2);

              param.tech_z_url_e2 = zaini_e2[0];
              param.tech_ltpv_e2 = Math.abs(zaini_e2[1]);
              param.tech_rtpv_e2 = Math.abs(zaini_e2[2]);
              param.tech_ttpv_e2 = Math.abs(zaini_e2[3]);
              param.tech_ttcl_e2 = Math.abs(zaini_e2[4]);
              param.tech_ms_e2 = ms_e2;
              param.tech_rz_e2 = parseFloat(rz_e2.toFixed(4));
              param.tech_e1 = parseFloat(e1);
              param.tech_e2 = parseFloat(e2);

              const main_ans = Math.abs(zaini_e2[1]) - Math.abs(zaini_e1[1]);
              param.tech_z_urle = getZUrl(main_ans);
            } else {
              errors.push(
                "The left side of the interval has to be lesser than the right side."
              );
            }
          } else {
            // Don't add duplicate error
            if (
              !errors.includes(
                "The standard deviation must be greater than zero."
              )
            ) {
              errors.push("The standard deviation must be greater than zero.");
            }
          }
        } else {
          errors.push("Please! Check Your Input for fields 'e1' and 'e2'");
        }
      }

      // Handle operation 4 - value 'f'
      if (isNumeric(f)) {
        if (isNumeric(mean) && isNumeric(deviation)) {
          if (parseFloat(deviation) > 0) {
            if (parseFloat(f) > 0 && parseFloat(f) < 1) {
              let x1 = zinv(parseFloat(f));
              x1 = -1 * parseFloat(mean) + parseFloat(deviation) * x1;
              const ul = parseFloat(mean) + 3.1 * parseFloat(deviation);
              const ll = -1 * x1;
              const above = Math.round(10000000 * ll) / 10000000;

              x1 = zinv(parseFloat(f));
              x1 = parseFloat(mean) + parseFloat(deviation) * x1;
              const blow = Math.round(10000000 * x1) / 10000000;

              const f2 = parseFloat(f) / 2;
              x1 = zinv(0.5 - f2);
              const ll_val =
                Math.round(
                  (parseFloat(mean) + parseFloat(deviation) * x1) * 100000000
                ) / 100000000;
              const ul_val =
                Math.round(
                  (parseFloat(mean) + parseFloat(deviation) * (-1 * x1)) *
                    100000000
                ) / 100000000;

              const f3 = parseFloat(f) / 2;
              x1 = zinv(f3);
              const ll1_val =
                Math.round(
                  (parseFloat(mean) + parseFloat(deviation) * x1) * 100000000
                ) / 100000000;
              const ul1_val =
                Math.round(
                  (parseFloat(mean) + parseFloat(deviation) * (-1 * x1)) *
                    100000000
                ) / 100000000;

              param.tech_z_urlf = getZUrl(parseFloat(f));
              param.tech_abovef = above;
              param.tech_blowf = blow;
              param.tech_llf = ll_val;
              param.tech_ulf = ul_val;
              param.tech_ll1f = ll1_val;
              param.tech_ul1f = ul1_val;
              param.tech_f = parseFloat(f);
            } else {
              errors.push("Probability must be between 0 and 1 for field 'f'");
            }
          } else {
            // Don't add duplicate error
            if (
              !errors.includes(
                "The standard deviation must be greater than zero."
              )
            ) {
              errors.push("The standard deviation must be greater than zero.");
            }
          }
        } else {
          errors.push("Please! Check Your Input for field 'f'");
        }
      }
      // Add all errors to param if any exist
      // if (errors.length > 0) {
      //   param.errors = errors;
      // }
    }
    return param;
  }

  /** getCalculationZScoreToPercentilecalculator
   * POST: /api/calculators-lol/z-score-to-percentile
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationZScoreToPercentilecalculator(body) {
    let z_score_table = {
      "-3.9": {
        9: 0.00003,
        8: 0.00003,
        7: 0.00004,
        6: 0.00004,
        5: 0.00004,
        4: 0.00004,
        3: 0.00004,
        2: 0.00004,
        1: 0.00005,
        0: 0.00005,
      },
      "-3.8": {
        9: 0.00005,
        8: 0.00005,
        7: 0.00005,
        6: 0.00006,
        5: 0.00006,
        4: 0.00006,
        3: 0.00006,
        2: 0.00007,
        1: 0.00007,
        0: 0.00007,
      },
      "-3.7": {
        9: 0.00008,
        8: 0.00008,
        7: 0.00008,
        6: 0.00008,
        5: 0.00009,
        4: 0.00009,
        3: 0.0001,
        2: 0.0001,
        1: 0.0001,
        0: 0.00011,
      },
      "-3.6": {
        9: 0.00011,
        8: 0.00012,
        7: 0.00012,
        6: 0.00013,
        5: 0.00013,
        4: 0.00014,
        3: 0.00014,
        2: 0.00015,
        1: 0.00015,
        0: 0.00016,
      },
      "-3.5": {
        9: 0.00017,
        8: 0.00017,
        7: 0.00018,
        6: 0.00019,
        5: 0.00019,
        4: 0.0002,
        3: 0.00021,
        2: 0.00022,
        1: 0.00022,
        0: 0.00023,
      },
      "-3.4": {
        9: 0.00024,
        8: 0.00025,
        7: 0.00026,
        6: 0.00027,
        5: 0.00028,
        4: 0.00029,
        3: 0.0003,
        2: 0.00031,
        1: 0.00032,
        0: 0.00034,
      },
      "-3.3": {
        9: 0.00035,
        8: 0.00036,
        7: 0.00038,
        6: 0.00039,
        5: 0.0004,
        4: 0.00042,
        3: 0.00043,
        2: 0.00045,
        1: 0.00047,
        0: 0.00048,
      },
      "-3.2": {
        9: 0.0005,
        8: 0.00052,
        7: 0.00054,
        6: 0.00056,
        5: 0.00058,
        4: 0.0006,
        3: 0.00062,
        2: 0.00064,
        1: 0.00066,
        0: 0.00069,
      },
      "-3.1": {
        9: 0.00071,
        8: 0.00074,
        7: 0.00076,
        6: 0.00079,
        5: 0.00082,
        4: 0.00084,
        3: 0.00087,
        2: 0.0009,
        1: 0.00094,
        0: 0.00097,
      },
      "-3.0": {
        9: 0.001,
        8: 0.00104,
        7: 0.00107,
        6: 0.00111,
        5: 0.00114,
        4: 0.00118,
        3: 0.00122,
        2: 0.00126,
        1: 0.00131,
        0: 0.00135,
      },
      "-2.9": {
        9: 0.00139,
        8: 0.00144,
        7: 0.00149,
        6: 0.00154,
        5: 0.00159,
        4: 0.00164,
        3: 0.00169,
        2: 0.00175,
        1: 0.00181,
        0: 0.00187,
      },
      "-2.8": {
        9: 0.00193,
        8: 0.00199,
        7: 0.00205,
        6: 0.00212,
        5: 0.00219,
        4: 0.00226,
        3: 0.00233,
        2: 0.0024,
        1: 0.00248,
        0: 0.00256,
      },
      "-2.7": {
        9: 0.00264,
        8: 0.00272,
        7: 0.0028,
        6: 0.00289,
        5: 0.00298,
        4: 0.00307,
        3: 0.00317,
        2: 0.00326,
        1: 0.00336,
        0: 0.00347,
      },
      "-2.6": {
        9: 0.00357,
        8: 0.00368,
        7: 0.00379,
        6: 0.00391,
        5: 0.00402,
        4: 0.00415,
        3: 0.00427,
        2: 0.0044,
        1: 0.00453,
        0: 0.00466,
      },
      "-2.5": {
        9: 0.0048,
        8: 0.00494,
        7: 0.00508,
        6: 0.00523,
        5: 0.00539,
        4: 0.00554,
        3: 0.0057,
        2: 0.00587,
        1: 0.00604,
        0: 0.00621,
      },
      "-2.4": {
        9: 0.00639,
        8: 0.00657,
        7: 0.00676,
        6: 0.00695,
        5: 0.00714,
        4: 0.00734,
        3: 0.00755,
        2: 0.00776,
        1: 0.00798,
        0: 0.0082,
      },
      "-2.3": {
        9: 0.00842,
        8: 0.00866,
        7: 0.00889,
        6: 0.00914,
        5: 0.00939,
        4: 0.00964,
        3: 0.0099,
        2: 0.01017,
        1: 0.01044,
        0: 0.01072,
      },
      "-2.2": {
        9: 0.01101,
        8: 0.0113,
        7: 0.0116,
        6: 0.01191,
        5: 0.01222,
        4: 0.01255,
        3: 0.01287,
        2: 0.01321,
        1: 0.01355,
        0: 0.0139,
      },
      "-2.1": {
        9: 0.01426,
        8: 0.01463,
        7: 0.015,
        6: 0.01539,
        5: 0.01578,
        4: 0.01618,
        3: 0.01659,
        2: 0.017,
        1: 0.01743,
        0: 0.01786,
      },
      "-2.0": {
        9: 0.01831,
        8: 0.01876,
        7: 0.01923,
        6: 0.0197,
        5: 0.02018,
        4: 0.02068,
        3: 0.02118,
        2: 0.02169,
        1: 0.02222,
        0: 0.02275,
      },
      "-1.9": {
        9: 0.0233,
        8: 0.02385,
        7: 0.02442,
        6: 0.025,
        5: 0.02559,
        4: 0.02619,
        3: 0.0268,
        2: 0.02743,
        1: 0.02807,
        0: 0.02872,
      },
      "-1.8": {
        9: 0.02938,
        8: 0.03005,
        7: 0.03074,
        6: 0.03144,
        5: 0.03216,
        4: 0.03288,
        3: 0.03362,
        2: 0.03438,
        1: 0.03515,
        0: 0.03593,
      },
      "-1.7": {
        9: 0.03673,
        8: 0.03754,
        7: 0.03836,
        6: 0.0392,
        5: 0.04006,
        4: 0.04093,
        3: 0.04182,
        2: 0.04272,
        1: 0.04363,
        0: 0.04457,
      },
      "-1.6": {
        9: 0.04551,
        8: 0.04648,
        7: 0.04746,
        6: 0.04846,
        5: 0.04947,
        4: 0.0505,
        3: 0.05155,
        2: 0.05262,
        1: 0.0537,
        0: 0.0548,
      },
      "-1.5": {
        9: 0.0559,
        8: 0.0571,
        7: 0.0582,
        6: 0.0594,
        5: 0.0606,
        4: 0.0618,
        3: 0.063,
        2: 0.0643,
        1: 0.0655,
        0: 0.0668,
      },
      "-1.4": {
        9: 0.0681,
        8: 0.0694,
        7: 0.0708,
        6: 0.0721,
        5: 0.0735,
        4: 0.0749,
        3: 0.0764,
        2: 0.0778,
        1: 0.0793,
        0: 0.0808,
      },
      "-1.3": {
        9: 0.0823,
        8: 0.0838,
        7: 0.0853,
        6: 0.0869,
        5: 0.0885,
        4: 0.0901,
        3: 0.0918,
        2: 0.0934,
        1: 0.0951,
        0: 0.0968,
      },
      "-1.2": {
        9: 0.0985,
        8: 0.1003,
        7: 0.102,
        6: 0.1038,
        5: 0.1056,
        4: 0.1075,
        3: 0.1093,
        2: 0.1112,
        1: 0.1131,
        0: 0.1151,
      },
      "-1.1": {
        9: 0.117,
        8: 0.119,
        7: 0.121,
        6: 0.123,
        5: 0.1251,
        4: 0.1271,
        3: 0.1292,
        2: 0.1314,
        1: 0.1335,
        0: 0.1357,
      },
      "-1.0": {
        9: 0.1379,
        8: 0.1401,
        7: 0.1423,
        6: 0.1446,
        5: 0.1469,
        4: 0.1492,
        3: 0.1515,
        2: 0.1539,
        1: 0.1562,
        0: 0.1587,
      },
      "-0.9": {
        9: 0.1611,
        8: 0.1635,
        7: 0.166,
        6: 0.1685,
        5: 0.1711,
        4: 0.1736,
        3: 0.1762,
        2: 0.1788,
        1: 0.1814,
        0: 0.1841,
      },
      "-0.8": {
        9: 0.1867,
        8: 0.1894,
        7: 0.1922,
        6: 0.1949,
        5: 0.1977,
        4: 0.2005,
        3: 0.2033,
        2: 0.2061,
        1: 0.209,
        0: 0.2119,
      },
      "-0.7": {
        9: 0.2148,
        8: 0.2177,
        7: 0.2206,
        6: 0.2236,
        5: 0.2266,
        4: 0.2296,
        3: 0.2327,
        2: 0.2358,
        1: 0.2389,
        0: 0.242,
      },
      "-0.6": {
        9: 0.2451,
        8: 0.2483,
        7: 0.2514,
        6: 0.2546,
        5: 0.2578,
        4: 0.2611,
        3: 0.2643,
        2: 0.2676,
        1: 0.2709,
        0: 0.2743,
      },
      "-0.5": {
        9: 0.2776,
        8: 0.281,
        7: 0.2843,
        6: 0.2877,
        5: 0.2912,
        4: 0.2946,
        3: 0.2981,
        2: 0.3015,
        1: 0.305,
        0: 0.3085,
      },
      "-0.4": {
        9: 0.3121,
        8: 0.3156,
        7: 0.3192,
        6: 0.3228,
        5: 0.3264,
        4: 0.33,
        3: 0.3336,
        2: 0.3372,
        1: 0.3409,
        0: 0.3446,
      },
      "-0.3": {
        9: 0.3483,
        8: 0.352,
        7: 0.3557,
        6: 0.3594,
        5: 0.3632,
        4: 0.3669,
        3: 0.3707,
        2: 0.3745,
        1: 0.3783,
        0: 0.3821,
      },
      "-0.2": {
        9: 0.3859,
        8: 0.3897,
        7: 0.3936,
        6: 0.3974,
        5: 0.4013,
        4: 0.4052,
        3: 0.409,
        2: 0.4129,
        1: 0.4168,
        0: 0.4207,
      },
      "-0.1": {
        9: 0.4247,
        8: 0.4286,
        7: 0.4325,
        6: 0.4364,
        5: 0.4404,
        4: 0.4443,
        3: 0.4483,
        2: 0.4522,
        1: 0.4562,
        0: 0.4602,
      },
      "-0.0": {
        9: 0.4641,
        8: 0.4681,
        7: 0.4721,
        6: 0.4761,
        5: 0.4801,
        4: 0.484,
        3: 0.488,
        2: 0.492,
        1: 0.496,
        0: 0.5,
      },
      "0.0": {
        0: 0.5,
        1: 0.50399,
        2: 0.50798,
        3: 0.51197,
        4: 0.51595,
        5: 0.51994,
        6: 0.52392,
        7: 0.5279,
        8: 0.53188,
        9: 0.53586,
      },
      0.1: {
        0: 0.5398,
        1: 0.5438,
        2: 0.54776,
        3: 0.55172,
        4: 0.55567,
        5: 0.55966,
        6: 0.5636,
        7: 0.56749,
        8: 0.57142,
        9: 0.57535,
      },
      0.2: {
        0: 0.5793,
        1: 0.58317,
        2: 0.58706,
        3: 0.59095,
        4: 0.59483,
        5: 0.59871,
        6: 0.60257,
        7: 0.60642,
        8: 0.61026,
        9: 0.61409,
      },
      0.3: {
        0: 0.61791,
        1: 0.62172,
        2: 0.62552,
        3: 0.6293,
        4: 0.63307,
        5: 0.63683,
        6: 0.64058,
        7: 0.64431,
        8: 0.64803,
        9: 0.65173,
      },
      0.4: {
        0: 0.65542,
        1: 0.6591,
        2: 0.66276,
        3: 0.6664,
        4: 0.67003,
        5: 0.67364,
        6: 0.67724,
        7: 0.68082,
        8: 0.68439,
        9: 0.68793,
      },
      0.5: {
        0: 0.69146,
        1: 0.69497,
        2: 0.69847,
        3: 0.70194,
        4: 0.7054,
        5: 0.70884,
        6: 0.71226,
        7: 0.71566,
        8: 0.71904,
        9: 0.7224,
      },
      0.6: {
        0: 0.72575,
        1: 0.72907,
        2: 0.73237,
        3: 0.73565,
        4: 0.73891,
        5: 0.74215,
        6: 0.74537,
        7: 0.74857,
        8: 0.75175,
        9: 0.7549,
      },
      0.7: {
        0: 0.75804,
        1: 0.76115,
        2: 0.76424,
        3: 0.7673,
        4: 0.77035,
        5: 0.77337,
        6: 0.77637,
        7: 0.77935,
        8: 0.7823,
        9: 0.78524,
      },
      0.8: {
        0: 0.78814,
        1: 0.79103,
        2: 0.79389,
        3: 0.79673,
        4: 0.79955,
        5: 0.80234,
        6: 0.80511,
        7: 0.80785,
        8: 0.81057,
        9: 0.81327,
      },
      0.9: {
        0: 0.81594,
        1: 0.81859,
        2: 0.82121,
        3: 0.82381,
        4: 0.82639,
        5: 0.82894,
        6: 0.83147,
        7: 0.83398,
        8: 0.83646,
        9: 0.83891,
      },
      "1.0": {
        0: 0.84134,
        1: 0.84375,
        2: 0.84614,
        3: 0.84849,
        4: 0.85083,
        5: 0.85314,
        6: 0.85543,
        7: 0.85769,
        8: 0.85993,
        9: 0.86214,
      },
      1.1: {
        0: 0.86433,
        1: 0.8665,
        2: 0.86864,
        3: 0.87076,
        4: 0.87286,
        5: 0.87493,
        6: 0.87698,
        7: 0.879,
        8: 0.881,
        9: 0.88298,
      },
      1.2: {
        0: 0.88493,
        1: 0.88686,
        2: 0.88877,
        3: 0.89065,
        4: 0.89251,
        5: 0.89435,
        6: 0.89617,
        7: 0.89796,
        8: 0.89973,
        9: 0.90147,
      },
      1.3: {
        0: 0.9032,
        1: 0.9049,
        2: 0.90658,
        3: 0.90824,
        4: 0.90988,
        5: 0.91149,
        6: 0.91308,
        7: 0.91466,
        8: 0.91621,
        9: 0.91774,
      },
      1.4: {
        0: 0.91924,
        1: 0.92073,
        2: 0.9222,
        3: 0.92364,
        4: 0.92507,
        5: 0.92647,
        6: 0.92785,
        7: 0.92922,
        8: 0.93056,
        9: 0.93189,
      },
      1.5: {
        0: 0.93319,
        1: 0.93448,
        2: 0.93574,
        3: 0.93699,
        4: 0.93822,
        5: 0.93943,
        6: 0.94062,
        7: 0.94179,
        8: 0.94295,
        9: 0.94408,
      },
      1.6: {
        0: 0.9452,
        1: 0.9463,
        2: 0.94738,
        3: 0.94845,
        4: 0.9495,
        5: 0.95053,
        6: 0.95154,
        7: 0.95254,
        8: 0.95352,
        9: 0.95449,
      },
      1.7: {
        0: 0.95543,
        1: 0.95637,
        2: 0.95728,
        3: 0.95818,
        4: 0.95907,
        5: 0.95994,
        6: 0.9608,
        7: 0.96164,
        8: 0.96246,
        9: 0.96327,
      },
      1.8: {
        0: 0.96407,
        1: 0.96485,
        2: 0.96562,
        3: 0.96638,
        4: 0.96712,
        5: 0.96784,
        6: 0.96856,
        7: 0.96926,
        8: 0.96995,
        9: 0.97062,
      },
      1.9: {
        0: 0.97128,
        1: 0.97193,
        2: 0.97257,
        3: 0.9732,
        4: 0.97381,
        5: 0.97441,
        6: 0.975,
        7: 0.97558,
        8: 0.97615,
        9: 0.9767,
      },
      "2.0": {
        0: 0.97725,
        1: 0.97778,
        2: 0.97831,
        3: 0.97882,
        4: 0.97932,
        5: 0.97982,
        6: 0.9803,
        7: 0.98077,
        8: 0.98124,
        9: 0.98169,
      },
      2.1: {
        0: 0.98214,
        1: 0.98257,
        2: 0.983,
        3: 0.98341,
        4: 0.98382,
        5: 0.98422,
        6: 0.98461,
        7: 0.985,
        8: 0.98537,
        9: 0.98574,
      },
      2.2: {
        0: 0.9861,
        1: 0.98645,
        2: 0.98679,
        3: 0.98713,
        4: 0.98745,
        5: 0.98778,
        6: 0.98809,
        7: 0.9884,
        8: 0.9887,
        9: 0.98899,
      },
      2.3: {
        0: 0.98928,
        1: 0.98956,
        2: 0.98983,
        3: 0.9901,
        4: 0.99036,
        5: 0.99061,
        6: 0.99086,
        7: 0.99111,
        8: 0.99134,
        9: 0.99158,
      },
      2.4: {
        0: 0.9918,
        1: 0.99202,
        2: 0.99224,
        3: 0.99245,
        4: 0.99266,
        5: 0.99286,
        6: 0.99305,
        7: 0.99324,
        8: 0.99343,
        9: 0.99361,
      },
      2.5: {
        0: 0.99379,
        1: 0.99396,
        2: 0.99413,
        3: 0.9943,
        4: 0.99446,
        5: 0.99461,
        6: 0.99477,
        7: 0.99492,
        8: 0.99506,
        9: 0.9952,
      },
      2.6: {
        0: 0.99534,
        1: 0.99547,
        2: 0.9956,
        3: 0.99573,
        4: 0.99585,
        5: 0.99598,
        6: 0.99609,
        7: 0.99621,
        8: 0.99632,
        9: 0.99643,
      },
      2.7: {
        0: 0.99653,
        1: 0.99664,
        2: 0.99674,
        3: 0.99683,
        4: 0.99693,
        5: 0.99702,
        6: 0.99711,
        7: 0.9972,
        8: 0.99728,
        9: 0.99736,
      },
      2.8: {
        0: 0.99744,
        1: 0.99752,
        2: 0.9976,
        3: 0.99767,
        4: 0.99774,
        5: 0.99781,
        6: 0.99788,
        7: 0.99795,
        8: 0.99801,
        9: 0.99807,
      },
      2.9: {
        0: 0.99813,
        1: 0.99819,
        2: 0.99825,
        3: 0.99831,
        4: 0.99836,
        5: 0.99841,
        6: 0.99846,
        7: 0.99851,
        8: 0.99856,
        9: 0.99861,
      },
      "3.0": {
        0: 0.99865,
        1: 0.99869,
        2: 0.99874,
        3: 0.99878,
        4: 0.99882,
        5: 0.99886,
        6: 0.99889,
        7: 0.99893,
        8: 0.99896,
        9: 0.999,
      },
      3.1: {
        0: 0.99903,
        1: 0.99906,
        2: 0.9991,
        3: 0.99913,
        4: 0.99916,
        5: 0.99918,
        6: 0.99921,
        7: 0.99924,
        8: 0.99926,
        9: 0.99929,
      },
      3.2: {
        0: 0.99931,
        1: 0.99934,
        2: 0.99936,
        3: 0.99938,
        4: 0.9994,
        5: 0.99942,
        6: 0.99944,
        7: 0.99946,
        8: 0.99948,
        9: 0.9995,
      },
      3.3: {
        0: 0.99952,
        1: 0.99953,
        2: 0.99955,
        3: 0.99957,
        4: 0.99958,
        5: 0.9996,
        6: 0.99961,
        7: 0.99962,
        8: 0.99964,
        9: 0.99965,
      },
      3.4: {
        0: 0.99966,
        1: 0.99968,
        2: 0.99969,
        3: 0.9997,
        4: 0.99971,
        5: 0.99972,
        6: 0.99973,
        7: 0.99974,
        8: 0.99975,
        9: 0.99976,
      },
      3.5: {
        0: 0.99977,
        1: 0.99978,
        2: 0.99978,
        3: 0.99979,
        4: 0.9998,
        5: 0.99981,
        6: 0.99981,
        7: 0.99982,
        8: 0.99983,
        9: 0.99983,
      },
      3.6: {
        0: 0.99984,
        1: 0.99985,
        2: 0.99985,
        3: 0.99986,
        4: 0.99986,
        5: 0.99987,
        6: 0.99987,
        7: 0.99988,
        8: 0.99988,
        9: 0.99989,
      },
      3.7: {
        0: 0.99989,
        1: 0.9999,
        2: 0.9999,
        3: 0.9999,
        4: 0.99991,
        5: 0.99991,
        6: 0.99992,
        7: 0.99992,
        8: 0.99992,
        9: 0.99992,
      },
      3.8: {
        0: 0.99993,
        1: 0.99993,
        2: 0.99993,
        3: 0.99994,
        4: 0.99994,
        5: 0.99994,
        6: 0.99994,
        7: 0.99995,
        8: 0.99995,
        9: 0.99995,
      },
      3.9: {
        0: 0.99995,
        1: 0.99995,
        2: 0.99996,
        3: 0.99996,
        4: 0.99996,
        5: 0.99996,
        6: 0.99996,
        7: 0.99996,
        8: 0.99997,
        9: 0.99997,
      },
      "4.0": {
        0: 0.99997,
        1: 0.99997,
        2: 0.99997,
        3: 0.99997,
        4: 0.99997,
        5: 0.99997,
        6: 0.99998,
        7: 0.99998,
        8: 0.99998,
        9: 0.99998,
      },
    };

    let result = {};
    let z_score = body.tech_z_score?.toString().trim();

    function isDecimal(val) {
      return !Number.isInteger(Number(val));
    }

    if (!isNaN(z_score)) {
      let score = Math.round(z_score * 10) / 10;
      let inner_score = Math.round(z_score * 100) / 100;
      let res_val;
      let img;

      if (isDecimal(inner_score)) {
        if (z_score >= -3.9 && z_score <= 4.0) {
          let parts = inner_score.toString().split(".");
          let main_jawab = parts[1]?.substring(1, 2) || "0";
          res_val = z_score_table[score.toFixed(1)]?.[main_jawab];
        } else {
          res_val = z_score < -3.9 ? "0" : "1";
        }
      } else {
        let z_score_str = parseFloat(z_score).toFixed(1);
        if (z_score >= -3.9 && z_score <= 4.0) {
          let parts = z_score_str.split(".");
          let main_jawab = parts[1]?.substring(1, 2) || "0";
          res_val = z_score_table[z_score_str]?.[main_jawab];
        } else {
          res_val = z_score < -3.9 ? "0" : "1";
        }
      }

      if (score <= -3.8) {
        img = "-3.5 equal & above.png";
      } else if (score == -3.7) {
        img = "-3.5 equal & above.png";
      } else if (score == -3.6) {
        img = "-3.5 equal & above.png";
      } else if (score == -3.5) {
        img = "-3.5 equal & above.png";
      } else if (score == -3.4) {
        img = "-3.4.png";
      } else if (score == -3.3) {
        img = "-3.3.png";
      } else if (score == -3.2) {
        img = "-3.2.png";
      } else if (score == -3.1) {
        img = "-3.1.png";
      } else if (score == -3) {
        img = "-3.0.png";
      } else if (score == -2.9) {
        img = "-2.9.png";
      } else if (score == -2.8) {
        img = "-2.8.png";
      } else if (score == -2.7) {
        img = "-2.7.png";
      } else if (score == -2.6) {
        img = "-2.6.png";
      } else if (score == -2.5) {
        img = "-2.5.png";
      } else if (score == -2.4) {
        img = "-2.4.png";
      } else if (score == -2.3) {
        img = "-2.3.png";
      } else if (score == -2.2) {
        img = "-2.2.png";
      } else if (score == -2.1) {
        img = "-2.1.png";
      } else if (score == -2) {
        img = "-2.0.png";
      } else if (score == -1.9) {
        img = "-1.9.png";
      } else if (score == -1.8) {
        img = "-1.8.png";
      } else if (score == -1.7) {
        img = "-1.7.png";
      } else if (score == -1.6) {
        img = "-1.6.png";
      } else if (score == -1.5) {
        img = "-1.5.png";
      } else if (score == -1.4) {
        img = "-1.4.png";
      } else if (score == -1.3) {
        img = "-1.3.png";
      } else if (score == -1.2) {
        img = "-1.2.png";
      } else if (score == -1.1) {
        img = "-1.1.png";
      } else if (score == -1) {
        img = "-1.0.png";
      } else if (score == -0.9) {
        img = "-0.9.png";
      } else if (score == -0.8) {
        img = "-0.8.png";
      } else if (score == -0.7) {
        img = "-0.7.png";
      } else if (score == -0.6) {
        img = "-0.6.png";
      } else if (score == -0.5) {
        img = "-0.5.png";
      } else if (score == -0.4) {
        img = "-0.4.png";
      } else if (score == -0.3) {
        img = "-0.3.png";
      } else if (score == -0.2) {
        img = "-0.2.png";
      } else if (score == -0.1) {
        img = "-0.1.png";
      } else if (score == -0) {
        img = "-0.png";
      } else if (score == 0) {
        img = "0.png";
      } else if (score == 0.1) {
        img = "0.1.png";
      } else if (score == 0.2) {
        img = "0.2.png";
      } else if (score == 0.3) {
        img = "0.3.png";
      } else if (score == 0.4) {
        img = "0.4.png";
      } else if (score == 0.5) {
        img = "0.5.png";
      } else if (score == 0.6) {
        img = "0.6.png";
      } else if (score == 0.7) {
        img = "0.7.png";
      } else if (score == 0.8) {
        img = "0.8.png";
      } else if (score == 0.9) {
        img = "0.9.png";
      } else if (score == 1) {
        img = "1.0.png";
      } else if (score == 1.1) {
        img = "1.1.png";
      } else if (score == 1.2) {
        img = "1.2.png";
      } else if (score == 1.3) {
        img = "1.3.png";
      } else if (score == 1.4) {
        img = "1.4.png";
      } else if (score == 1.5) {
        img = "1.5.png";
      } else if (score == 1.6) {
        img = "1.6.png";
      } else if (score == 1.7) {
        img = "1.7.png";
      } else if (score == 1.8) {
        img = "1.8.png";
      } else if (score == 1.9) {
        img = "1.9.png";
      } else if (score == 2) {
        img = "2.0.png";
      } else if (score == 2.1) {
        img = "2.1.png";
      } else if (score == 2.2) {
        img = "2.2.png";
      } else if (score == 2.3) {
        img = "2.3.png";
      } else if (score == 2.4) {
        img = "2.4.png";
      } else if (score == 2.5) {
        img = "2.5.png";
      } else if (score == 2.6) {
        img = "2.6.png";
      } else if (score == 2.7) {
        img = "2.7.png";
      } else if (score == 2.8) {
        img = "2.8.png";
      } else if (score == 2.9) {
        img = "2.9.png";
      } else if (score == 3) {
        img = "3.0.png";
      } else if (score == 3.1) {
        img = "3.1.png";
      } else if (score == 3.2) {
        img = "3.2.png";
      } else if (score == 3.3) {
        img = "3.3.png";
      } else if (score == 3.4) {
        img = "3.4.png";
      } else if (score == 3.5) {
        img = "3.5.png";
      } else if (score == 3.6) {
        img = "3.5.png";
      } else if (score == 3.7) {
        img = "3.5.png";
      } else if (score >= 3.8) {
        img = "3.5.png";
      }
      result.tech_z_score = z_score;
      result.tech_score = score;
      result.tech_res_val = res_val;
      result.tech_img = img;
    } else {
      result.error = "Please! Check Your Input";
    }

    return result;
  }

  /** getCalculationPHapCalculator
   * POST: /api/calculators-lol/p-hat-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationPHapCalculator(body) {
    const result = {};

    let sample_size = parseFloat(body.tech_sample_size);
    let occurrences = parseFloat(body.tech_occurrences);

    if (isNaN(sample_size) || isNaN(occurrences)) {
      return { error: "Please! Check Your Input" };
    }

    let p_hat = occurrences / sample_size;

    result.tech_p_hat = p_hat;
    result.tech_sample_size = sample_size;
    result.tech_occurrences = occurrences;

    return result;
  }
}

module.exports = new CalculatorsServices();
