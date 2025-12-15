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
   * getCalculationAgeCalculator: Service Method
   * POST: /api/calculators-lol/age-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationAgeCalculator(body) {
    try {
      let day = body.tech_day;
      let month = body.tech_month;
      let year = body.tech_year;
      let day_sec = body.tech_day_sec;
      let month_sec = body.tech_month_sec;
      let year_sec = body.tech_year_sec;
      let submit = body.tech_submit;

      // Format dates
      const dob = `${String(year).padStart(4, "0")}-${String(month).padStart(
        2,
        "0"
      )}-${String(day).padStart(2, "0")}`;
      const e_date = `${String(year_sec).padStart(4, "0")}-${String(
        month_sec
      ).padStart(2, "0")}-${String(day_sec).padStart(2, "0")}`;

      // Parse dates
      const orderdob = dob.split("-");
      const orderdate = e_date.split("-");

      const e_year = parseInt(orderdate[0]);
      const e_month = parseInt(orderdate[1]);
      const e_day = parseInt(orderdate[2]);
      const dob_year = parseInt(orderdob[0]);
      const dob_month = parseInt(orderdob[1]);
      const dob_day = parseInt(orderdob[2]);

      // Validate inputs
      if (
        !Number.isInteger(dob_day) ||
        !Number.isInteger(dob_month) ||
        !Number.isInteger(dob_year) ||
        !Number.isInteger(e_day) ||
        !Number.isInteger(e_month) ||
        !Number.isInteger(e_year)
      ) {
        return { error: "Please check your input." };
      }

      const result = {};
      const dob_array = [
        `${String(dob_year).padStart(2, "0")}-${String(dob_month).padStart(
          2,
          "0"
        )}-${String(dob_day).padStart(2, "0")}`,
      ];
      const dates_array = [
        `${String(e_year).padStart(2, "0")}-${String(e_month).padStart(
          2,
          "0"
        )}-${String(e_day).padStart(2, "0")}`,
      ];

      // Initialize arrays
      const all_dob = [];
      const age_years = [];
      const age_months = [];
      const age_days = [];
      const all_users_days = [];
      const Total_years = [];
      const Total_months = [];
      const Total_weeks = [];
      const Total_days = [];
      const Total_hours = [];
      const Total_minuts = [];
      const Total_seconds = [];
      const N_r_days = [];
      const N_r_days_per = [];
      const breath = [];
      const heartBeats = [];
      const sleeping = [];
      const laughed = [];
      const half_brdy = [];
      const n_half_brdy_days = [];
      const blinking_times = [];
      const hair_length_mm = [];
      const hair_length_m = [];
      const nail_length_mm = [];
      const nail_length_m = [];
      const dog_age = [];
      const cat_age = [];
      const turtle_age = [];
      const horse_age = [];
      const cow_age = [];
      const elephant_age = [];
      const mercury_age = [];
      const venus_age = [];
      const mars_age = [];
      const jupiter_age = [];
      const saturn_age = [];

      for (let i = 0; i < dob_array.length; i++) {
        const dob_str = dob_array[i];
        const dobDate = new Date(dob_str);

        // Format date of birth
        all_dob.push(
          dobDate.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        );

        const date_str = dates_array[i];
        const endDate = new Date(date_str);

        // Calculate age difference
        const diff = this.calculateDateDifferenceage(dobDate, endDate);
        console.log(diff);
        age_years.push(diff.years);
        age_months.push(diff.months);
        age_days.push(diff.days);
        all_users_days.push(diff.totalDays);

        // Current date calculations
        const now = new Date();
        const dob_timestamp = dobDate.getTime();
        const end_timestamp = endDate.getTime();

        // Validate date
        if (end_timestamp - dob_timestamp <= 0) {
          return { error: "Invalid Date of Birth." };
        }

        // Calculate totals
        const diff_seconds = Math.floor((end_timestamp - dob_timestamp) / 1000);
        const totalyears = Math.floor(diff_seconds / 31536000);

        Total_years.push(totalyears);
        Total_months.push(Math.floor(diff_seconds / 2628000));
        Total_weeks.push(Math.floor(diff_seconds / 604800));

        const total_days = Math.floor(diff_seconds / 86400);
        Total_days.push(total_days);
        Total_hours.push(Math.floor(diff_seconds / 3600));

        const total_minuts = Math.floor(diff_seconds / 60);
        Total_minuts.push(total_minuts);
        Total_seconds.push(diff_seconds);

        // Next Birthday calculation
        const current_year = now.getFullYear();
        const current_month = now.getMonth() + 1;
        const current_day = now.getDate();

        let next_birthday_year = current_year;
        if (
          current_month > dob_month ||
          (current_month === dob_month && current_day >= dob_day)
        ) {
          next_birthday_year = current_year + 1;
        }

        const next_birthday = new Date(
          next_birthday_year,
          dob_month - 1,
          dob_day
        );
        const days_to_birthday = Math.floor(
          (next_birthday - now) / (1000 * 60 * 60 * 24)
        );

        N_r_days.push(days_to_birthday);
        N_r_days_per.push(Math.round((days_to_birthday / 365) * 100));

        // Health and life statistics
        breath.push(Math.round(0.5 * 15 * total_minuts));
        heartBeats.push(Math.round(72 * total_minuts));
        sleeping.push(
          Math.round(((totalyears * 365.25 * 8) / (365.25 * 24)) * 10) / 10
        );
        laughed.push(total_days * 10);

        // Half Birthday calculation
        const half_birthday_date = new Date(dobDate);
        half_birthday_date.setMonth(half_birthday_date.getMonth() + 6);

        let half_bd_year = current_year;
        const half_bd_month = half_birthday_date.getMonth() + 1;
        const half_bd_day = half_birthday_date.getDate();

        if (
          current_month > half_bd_month ||
          (current_month === half_bd_month && current_day > half_bd_day)
        ) {
          half_bd_year = current_year + 1;
        }

        const next_half_birthday = new Date(
          half_bd_year,
          half_bd_month - 1,
          half_bd_day
        );
        half_brdy.push(
          next_half_birthday.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        );

        const days_to_half_birthday = Math.floor(
          (next_half_birthday - now) / (1000 * 60 * 60 * 24)
        );
        n_half_brdy_days.push((days_to_half_birthday * 100) / 365);

        // Physical calculations
        blinking_times.push(diff.totalDays * 16800);
        hair_length_mm.push(diff.totalDays * 0.42);
        hair_length_m.push((diff.totalDays * 0.42) / 1000);
        nail_length_mm.push(diff.totalDays * 0.12);
        nail_length_m.push((diff.totalDays * 0.12) / 1000);

        // Animal age calculations
        dog_age.push(
          parseFloat((diff.totalDays * 0.0004657534246575342).toFixed(2))
        );
        cat_age.push(
          parseFloat((diff.totalDays * 0.0005753424657534247).toFixed(2))
        );
        turtle_age.push(
          parseFloat((diff.totalDays * 0.0068219178082192).toFixed(2))
        );
        horse_age.push(
          parseFloat((diff.totalDays * 0.001041095890411).toFixed(2))
        );
        cow_age.push(
          parseFloat((diff.totalDays * 0.0007671232876712329).toFixed(2))
        );
        elephant_age.push(
          parseFloat((diff.totalDays * 0.0018630136986301).toFixed(2))
        );

        // Planet age calculations
        mercury_age.push(
          parseFloat((diff.totalDays * 0.0113698630136986).toFixed(2))
        );
        venus_age.push(
          parseFloat((diff.totalDays * 0.0044383561643836).toFixed(2))
        );
        mars_age.push(
          parseFloat((diff.totalDays * 0.0014520547945205).toFixed(2))
        );
        jupiter_age.push(
          parseFloat((diff.totalDays * 0.0002191780821917808).toFixed(2))
        );
        saturn_age.push(
          parseFloat((diff.totalDays * 0.00008219178082191781).toFixed(2))
        );
      }

      // Combine years and days
      const sum_users_days = all_users_days.reduce((a, b) => a + b, 0);
      const combine_years = sum_users_days / 365.2425;
      const combine_years_ans = Math.floor(combine_years);
      const combine_days_ans = Math.floor(sum_users_days % 365.2425);

      // Combine remaining days
      const combine_r_days = Math.round(
        (365 - combine_days_ans) / dob_array.length
      );
      const today = new Date();
      const next_combine_date = new Date(today);
      next_combine_date.setDate(today.getDate() + combine_r_days);
      const next_combine_brdy = next_combine_date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const combine_r_days_per = Math.round((combine_r_days / 365) * 100);

      // Build result object
      result.tech_dob_array = dob_array;
      result.tech_dates_array = dates_array;
      result.tech_all_dob = all_dob;
      result.tech_N_r_days = N_r_days;
      result.tech_N_r_days_per = N_r_days_per;
      result.tech_combine_years_ans = combine_years_ans;
      result.tech_combine_days_ans = combine_days_ans;
      result.tech_combine_r_days = combine_r_days;
      result.tech_combine_r_days_per = combine_r_days_per;
      result.tech_next_combine_brdy = next_combine_brdy;
      result.tech_age_years = age_years;
      result.tech_age_months = age_months;
      result.tech_age_days = age_days;
      result.tech_half_brdy = half_brdy;
      result.tech_Total_years = Total_years;
      result.tech_Total_months = Total_months;
      result.tech_Total_weeks = Total_weeks;
      result.tech_Total_days = Total_days;
      result.tech_Total_hours = Total_hours;
      result.tech_Total_minuts = Total_minuts;
      result.tech_Total_seconds = Total_seconds;
      result.tech_breath = breath;
      result.tech_heartBeats = heartBeats;
      result.tech_sleeping = sleeping;
      result.tech_laughed = laughed;
      result.tech_blinking_times = blinking_times;
      result.tech_hair_length_mm = hair_length_mm;
      result.tech_hair_length_m = hair_length_m;
      result.tech_nail_length_mm = nail_length_mm;
      result.tech_nail_length_m = nail_length_m;
      result.tech_dog_age = dog_age;
      result.tech_cat_age = cat_age;
      result.tech_turtle_age = turtle_age;
      result.tech_horse_age = horse_age;
      result.tech_cow_age = cow_age;
      result.tech_elephant_age = elephant_age;
      result.tech_mercury_age = mercury_age;
      result.tech_venus_age = venus_age;
      result.tech_mars_age = mars_age;
      result.tech_jupiter_age = jupiter_age;
      result.tech_saturn_age = saturn_age;
      result.tech_submit = submit;

      return result;
    } catch (error) {
      console.error("Error in age calculation:", error);
      return { error: "An error occurred during calculation." };
    }
    // Helper function to calculate date difference
  }
  calculateDateDifferenceage(startDate, endDate) {
    let years = endDate.getFullYear() - startDate.getFullYear();
    let months = endDate.getMonth() - startDate.getMonth();
    let days = endDate.getDate() - startDate.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Calculate total days
    const totalDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));

    return { years, months, days, totalDays };
  }

  /**
   * getCalculationDistanceCalculator: Service Method
   * POST: /api/calculators-lol/distance-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationDistanceCalculator(body) {
    let submit = body.tech_submit;

    let lat1 = body.tech_lat1;
    let long1 = body.tech_long1;
    let lat2 = body.tech_lat2;
    let long2 = body.tech_long2;

    let deg1 = body.tech_deg1;
    let mint1 = body.tech_mint1;
    let sec1 = body.tech_sec1;
    let dir1 = body.tech_dir1;

    let deg2 = body.tech_deg2;
    let mint2 = body.tech_mint2;
    let sec2 = body.tech_sec2;
    let dir2 = body.tech_dir2;

    let deg21 = body.tech_deg21;
    let mint21 = body.tech_mint21;
    let sec21 = body.tech_sec21;
    let dir21 = body.tech_dir21;

    let deg22 = body.tech_deg22;
    let mint22 = body.tech_mint22;
    let sec22 = body.tech_sec22;
    let dir22 = body.tech_dir22;

    let to_cal = body.tech_to_cal;

    let param = {};

    const findDistance = (lat1, lon1, lat2, lon2) => {
      const theta = lon1 - lon2;
      let dist =
        Math.sin(degToRad(lat1)) * Math.sin(degToRad(lat2)) +
        Math.cos(degToRad(lat1)) *
          Math.cos(degToRad(lat2)) *
          Math.cos(degToRad(theta));
      dist = Math.acos(dist);
      dist = radToDeg(dist);
      const miles = dist * 60 * 1.1515;
      return miles;
    };

    const ConvertDMSToDD = (degrees, minutes, seconds, direction) => {
      let dd = Number(degrees) + Number(minutes) / 60 + Number(seconds) / 3600;
      if (direction === "S" || direction === "W") {
        dd *= -1;
      }
      return dd;
    };

    const degToRad = (deg) => (deg * Math.PI) / 180;
    const radToDeg = (rad) => (rad * 180) / Math.PI;

    if (to_cal === "decimal") {
      if (submit) {
        const miles = findDistance(
          Number(lat1),
          Number(long1),
          Number(lat2),
          Number(long2)
        );
        param.tech_mile = miles;
        param.tech_km = miles * 1.609344;
      } else {
        param.error = "Please! Check Your Input";
      }
    } else {
      if (submit) {
        const lat1_dd = ConvertDMSToDD(deg1, mint1, sec1, dir1);
        const long1_dd = ConvertDMSToDD(deg2, mint2, sec2, dir2);
        const lat2_dd = ConvertDMSToDD(deg21, mint21, sec21, dir21);
        const long2_dd = ConvertDMSToDD(deg22, mint22, sec22, dir22);
        const miles = findDistance(lat1_dd, long1_dd, lat2_dd, long2_dd);
        param.tech_mile = miles;
        param.tech_km = miles * 1.609344;
      } else {
        param.error = "Please! Check Your Input";
      }
    }

    return param;
  }

  /**
   * getCalculationLoveCalculator: Service Method
   * POST: /api/calculators-lol/love-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationLoveCalculator(body) {
    // Extracting names from the body
    const yourName = body.yourName; // Renaming 'you' to 'yourName'
    const partnerName = body.partnerName; // Renaming 'lover' to 'partnerName'

    // Initialize an object to store the response
    let result = {};

    // Check if both names are provided
    if (!yourName || !partnerName) {
      // Handle missing names with appropriate messages
      if (!yourName && !partnerName) {
        result.error =
          "Both your name and your partner's name are required to proceed.";
      } else if (!yourName) {
        result.error = "Your name is necessary to calculate the love score.";
      } else {
        result.error =
          "Your partner's name is required to calculate the love score.";
      }
      return result;
    }

    // Generate a random love score between 20 and 100
    const loveScore = Math.floor(Math.random() * (100 - 20 + 1)) + 20; // Changed from 'rand' to 'Math.random()'

    // Add the result to the response object
    result.loveScore = loveScore; // Changed 'RESULT' to 'loveScore'
    return result;
  }

  /**
   * getCalculationPPICalculator: Service Method
   * POST: /api/calculators-lol/ppi-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationPPICalculator(body) {
    const vertical = body.tech_v;
    const diagonal = body.tech_d;
    const horizontal = body.tech_h;
    const unit = body.tech_unit;

    let fieldsDone = 0;
    let numeric = 0;

    // Check if all fields are filled
    if (vertical && horizontal && diagonal) {
      fieldsDone = 1;
    }

    // Check if all values are numeric
    if (!isNaN(diagonal) && !isNaN(horizontal) && !isNaN(vertical)) {
      numeric = 1;
    }

    // Validation
    if (!fieldsDone) {
      return {
        error: "Please! Fill all the Input Fields",
      };
    }

    if (!numeric) {
      return {
        error: "Please! Fill all the Input Fields",
      };
    }

    // Convert diagonal based on unit
    let diagonalValue = parseFloat(diagonal);

    if (unit == "m") {
      diagonalValue = diagonalValue * 39.37;
    }
    if (unit == "cm") {
      diagonalValue = diagonalValue / 2.54;
    }
    if (unit == "ft") {
      diagonalValue = diagonalValue * 12;
    }
    if (unit == "yd") {
      diagonalValue = diagonalValue * 36;
    }

    const verticalNum = parseFloat(vertical);
    const horizontalNum = parseFloat(horizontal);

    // Calculate diagonal from resolution
    const dia =
      Math.round(
        Math.sqrt(Math.pow(verticalNum, 2) + Math.pow(horizontalNum, 2)) * 100
      ) / 100;

    // Calculate PPI
    const ppi =
      Math.sqrt(horizontalNum * horizontalNum + verticalNum * verticalNum) /
      diagonalValue;
    const ppiRounded = Math.round(ppi * 100) / 100;

    // Calculate PPI squared
    const ppis = Math.round(ppi * ppi * 100) / 100;

    // Calculate pixel size
    const pixls =
      horizontalNum /
      (Math.sqrt(horizontalNum * horizontalNum + verticalNum * verticalNum) /
        (diagonalValue * 25.4)) /
      horizontalNum;
    const pixlsRounded = Math.round(pixls * 10000) / 10000;

    // Calculate megapixels
    const mpx = (verticalNum * horizontalNum) / 1000000;

    // GCD function
    function gcd(a, b) {
      if (a === 0 || b === 0) {
        return Math.abs(Math.max(Math.abs(a), Math.abs(b)));
      }
      const r = a % b;
      return r !== 0 ? gcd(b, r) : Math.abs(b);
    }

    const gcdValue = gcd(horizontalNum, verticalNum);
    const ratio = horizontalNum / gcdValue + ":" + verticalNum / gcdValue;

    // Calculate screen dimensions
    const over = verticalNum / horizontalNum;
    const xd =
      Math.round(
        Math.sqrt(Math.pow(diagonalValue, 2) / (1 + Math.pow(over, 2))) * 100
      ) / 100;
    const yd = Math.round(xd * over * 100) / 100;
    const xdcm = Math.round(xd * 2.54 * 100) / 100;
    const ydcm = Math.round(yd * 2.54 * 100) / 100;
    const screen_size = Math.round(xd * yd * 100) / 100;
    const s_cm = Math.round(screen_size * 6.452 * 100) / 100;

    const screen_in = xd + "'' x " + yd + "'' = " + screen_size + " in²";
    const screen_cm =
      Math.round(xd * 2.54 * 100) / 100 +
      " cm x " +
      Math.round(yd * 2.54 * 100) / 100 +
      " cm = " +
      s_cm +
      " cm²";

    // Return values
    return {
      tech_PPI: ppiRounded,
      tech_dia: dia,
      tech_screen_in: screen_in,
      tech_screen_cm: screen_cm,
      tech_screen_size: screen_size + " in² ( " + s_cm + " cm² )",
      tech_xd: xd + '" ( ' + xdcm + " cm)",
      tech_yd: yd + '" ( ' + ydcm + " cm)",
      tech_ratio: ratio,
      tech_PPIS: ppis,
      tech_Pixls: pixlsRounded,
      tech_mpx: mpx,
    };
  }

  /**
   * getCalculationErACalculator: Service Method
   * POST: /api/calculators-lol/era-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationErACalculator(body) {
    let x = body.tech_x;
    let y = body.tech_y;
    let z = body.tech_z;
    let g = body.tech_g;

    let param = {};

    if (!isNaN(x) || !isNaN(y) || !isNaN(z)) {
      const earn_run = Number(x);
      let inning = Number(y);
      const game = g !== undefined && g !== "" ? Number(g) : 9;

      if (z !== undefined && z !== "") {
        inning = Number(y) + Number(z) / 3;
      }

      const era = parseFloat(((earn_run / inning) * game).toFixed(3));
      param.tech_era = era;
    } else {
      param.error = "Please! Fill all the Input Fields";
    }

    return param;
  }

  /**
   * getCalculationAgeDifferenceCalculator: Service Method
   * POST: /api/calculators-lol/age-difference-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationAgeDifferenceCalculator(body) {
    const submit = body.tech_selection;
    const dob_f = body.tech_dob_f;
    const dob_s = body.tech_dob_s;
    const year_1 = body.tech_year_1;
    const year_2 = body.tech_year_2;
    const age_1 = body.tech_age_1;
    const age_2 = body.tech_age_2;
    const current_date =
      body.tech_current_date || moment().format("YYYY-MM-DD"); // Request se current date lo

    let result = {};

    function calculateAgeDifference(date1Str, date2Str) {
      const start = moment(date1Str, "YYYY-MM-DD");
      const end = moment(date2Str, "YYYY-MM-DD");

      let from, to;
      if (start.isAfter(end)) {
        from = end.clone();
        to = start.clone();
      } else {
        from = start.clone();
        to = end.clone();
      }

      let years = to.year() - from.year();
      let months = to.month() - from.month();
      let days = to.date() - from.date();

      if (days < 0) {
        // borrow days from previous month
        const prevMonth = to.clone().subtract(1, "month");
        days += prevMonth.daysInMonth();
        months--;
      }

      if (months < 0) {
        months += 12;
        years--;
      }

      return { years, months, days };
    }

    if (submit == "1") {
      if (dob_f && dob_s) {
        const dobFirst = dob_f;
        const dobSecond = dob_s;
        const currentDate = current_date;

        const ageDiff = calculateAgeDifference(dobFirst, dobSecond);
        const age_diff_Year = ageDiff.years;
        const age_diff_Month = ageDiff.months;
        const age_diff_Day = ageDiff.days;

        const age_diff_in_days = Math.abs(
          moment(dobFirst, "YYYY-MM-DD").diff(
            moment(dobSecond, "YYYY-MM-DD"),
            "days"
          )
        );
        const age_diff_weeks = Math.floor(age_diff_in_days / 7);
        const age_diff_remaining_days = age_diff_in_days % 7;

        const ageFirst = calculateAgeDifference(currentDate, dobFirst);
        const ageFYear = ageFirst.years;
        const ageFMonth = ageFirst.months;
        const ageFDay = ageFirst.days;

        const ageSecond = calculateAgeDifference(currentDate, dobSecond);

        const ageSYear = ageSecond.years;
        const ageSMonth = ageSecond.months;
        const ageSDay = ageSecond.days;

        result = {
          tech_submit: submit,
          tech_age_diff_Day: age_diff_Day,
          tech_age_diff_Month: age_diff_Month,
          tech_age_diff_Year: age_diff_Year,
          tech_age_diff_in_days: age_diff_in_days,
          tech_age_diff_weeks: age_diff_weeks,
          tech_age_diff_remaining_days: age_diff_remaining_days,
          tech_ageFYear: ageFYear,
          tech_ageFMonth: ageFMonth,
          tech_ageFDay: ageFDay,
          tech_ageSYear: ageSYear,
          tech_ageSMonth: ageSMonth,
          tech_ageSDay: ageSDay,
        };
      } else {
        return {
          error: "Please! Select Correct Date",
        };
      }
    } else if (submit == "2") {
      if (year_1 && year_2) {
        const dobFirst = `${year_1}-01-01`;
        const dobSecond = `${year_2}-01-01`;

        const ageDiff = calculateAgeDifference(dobFirst, dobSecond);
        const age_diff_Year = ageDiff.years;
        const age_diff_Month = ageDiff.months;
        const age_diff_Day = ageDiff.days;

        const age_diff_in_days = Math.abs(
          moment(dobFirst, "YYYY-MM-DD").diff(
            moment(dobSecond, "YYYY-MM-DD"),
            "days"
          )
        );
        const age_diff_weeks = Math.floor(age_diff_in_days / 7);
        const age_diff_remaining_days = age_diff_in_days % 7;

        result = {
          tech_submit: submit,
          tech_age_diff_Day: age_diff_Day,
          tech_age_diff_Month: age_diff_Month,
          tech_age_diff_Year: age_diff_Year,
          tech_age_diff_in_days: age_diff_in_days,
          tech_age_diff_weeks: age_diff_weeks,
          tech_age_diff_remaining_days: age_diff_remaining_days,
        };
      } else {
        return {
          error: "Please! Select Correct Year",
        };
      }
    } else {
      if (!isNaN(age_1) && !isNaN(age_2)) {
        const age_diff_Year = Math.abs(parseFloat(age_2) - parseFloat(age_1));
        const age_diff_in_days = age_diff_Year * 365;

        result = {
          tech_submit: submit,
          tech_age_diff_Year: age_diff_Year,
          tech_age_diff_in_days: age_diff_in_days,
        };
      } else {
        return {
          error: "Please! Check Your Input",
        };
      }
    }

    return result;
  }

  /**
   * getCalculationAgeDifferenceCalculator: Service Method
   * POST: /api/calculators-lol/vorici-chromatic-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationVoriciChromaticCalculator(body) {
    let submit = body.tech_submit;
    let s_f = body.tech_s_f;
    let str_f = body.tech_str_f;
    let dex_f = body.tech_dex_f;
    let int_f = body.tech_int_f;
    let r_f = body.tech_r_f;
    let g_f = body.tech_g_f;
    let b_f = body.tech_b_f;

    let param = {};

    if (submit) {
      // Ensure that all input fields are provided
      param.tech_s_f = s_f;
      param.tech_str_f = str_f;
      param.tech_dex_f = dex_f;
      param.tech_int_f = int_f;
      param.tech_r_f = r_f;
      param.tech_g_f = g_f;
      param.tech_b_f = b_f;
    } else {
      param.error = "Please! Fill all the Input Fields";
    }

    return param;
  }

  /**
   * getCalculationFreightClassCalculator: Service Method
   * POST: /api/calculators-lol/freight-class-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationFreightClassCalculator(body) {
    let submit = body.tech_submit;
    let length = body.tech_length;
    let length_unit = body.tech_length_unit;
    let width = body.tech_width;
    let width_unit = body.tech_width_unit;
    let height = body.tech_height;
    let height_unit = body.tech_height_unit;
    let weight = body.tech_weight;
    let weight_unit = body.tech_weight_unit;
    let pq = body.tech_pq;
    let fr = body.tech_fr;
    let fr_unit = body.tech_fr_unit;
    let currancy = body.tech_currancy;

    const result = {};

    // Check for empty required fields
    if (!length || !width || !height || !weight || !pq) {
      result.error = "Please! Fill all the Input Fields";
      return result;
    }

    if (!submit) {
      result.error = "Please! Fill all the Input Fields";
      return result;
    }

    // Check pallet quantity
    if (pq < 1) {
      result.error = "Pallet Quantity cannot be zero or less.";
      return result;
    }

    // Significant figures function
    function sigFig(value, digits) {
      if (isNaN(value) || !isFinite(value)) return 0;

      let decimalPlaces;
      if (value === 0) {
        decimalPlaces = digits - 1;
      } else if (value < 0) {
        decimalPlaces = digits - Math.floor(Math.log10(-value)) - 1;
      } else {
        decimalPlaces = digits - Math.floor(Math.log10(value)) - 1;
      }

      // ✅ Clamp between 0 and 100
      decimalPlaces = Math.min(Math.max(decimalPlaces, 0), 100);

      return Number(value.toFixed(decimalPlaces));
    }

    let lengthValue = parseFloat(length);
    let widthValue = parseFloat(width);
    let heightValue = parseFloat(height);
    let weightValue = parseFloat(weight);
    let frValue = fr ? parseFloat(fr) : null;

    // ✅ FIX: fr_unit ko properly handle karo
    let frUnitValue = null;
    if (fr_unit) {
      // Agar fr_unit mein '/' hai toh uske baad ka part lo
      if (fr_unit.includes("/")) {
        frUnitValue = fr_unit.split("/").pop(); // Last part after '/'
      } else {
        frUnitValue = fr_unit;
      }

      // Agar currancy bhi provide hai toh use remove karo
      if (currancy && frUnitValue.startsWith(currancy)) {
        frUnitValue = frUnitValue.replace(currancy, "");
      }
    }

    // Convert length to inches
    if (!isNaN(lengthValue)) {
      const lengthConversions = {
        mm: 25.4,
        cm: 2.54,
        m: 0.0254,
        km: 0.0000254,
        ft: 0.08333,
        yd: 0.02778,
        mi: 0.000015783,
        nmi: 0.000013715,
      };
      if (lengthConversions[length_unit]) {
        lengthValue = lengthValue / lengthConversions[length_unit];
      }
    }

    // Convert width to inches
    if (!isNaN(widthValue)) {
      const widthConversions = {
        mm: 25.4,
        cm: 2.54,
        m: 0.0254,
        km: 0.0000254,
        ft: 0.08333,
        yd: 0.02778,
        mi: 0.000015783,
        nmi: 0.000013715,
      };
      if (widthConversions[width_unit]) {
        widthValue = widthValue / widthConversions[width_unit];
      }
    }

    // Convert height to inches
    if (!isNaN(heightValue)) {
      const heightConversions = {
        mm: 25.4,
        cm: 2.54,
        m: 0.0254,
        km: 0.0000254,
        ft: 0.08333,
        yd: 0.02778,
        mi: 0.000015783,
        nmi: 0.000013715,
      };
      if (heightConversions[height_unit]) {
        heightValue = heightValue / heightConversions[height_unit];
      }
    }

    // Convert weight to pounds
    if (!isNaN(weightValue)) {
      const weightConversions = {
        ug: 453592370,
        mg: 453592,
        g: 453.6,
        dag: 45.36,
        kg: 0.4536,
        t: 0.0004536,
        gr: 7000,
        dr: 256,
        oz: 16,
        stone: 0.07143,
        us_ton: 0.0005,
        long_ton: 0.0004464,
        "oz t": 14.583,
      };

      if (weightConversions[weight_unit]) {
        weightValue = weightValue / weightConversions[weight_unit];
      } else if (weight_unit === "earths") {
        weightValue = weightValue * 13166006297680889120775995;
      } else if (weight_unit === "me") {
        weightValue = weightValue / 497939698128157422761985444381;
      } else if (weight_unit === "u") {
        weightValue = weightValue / 273159675507180000000000000;
      }
    }

    // Convert freight rate to pounds
    // console.log('frUnitValue:', frUnitValue);

    if (frValue && !isNaN(frValue) && frUnitValue) {
      const frConversions = {
        ug: 453592370,
        mg: 453592,
        g: 453.6,
        dag: 45.36,
        kg: 0.4536,
        t: 0.0004536,
        gr: 7000,
        dr: 256,
        oz: 16,
        stone: 0.07143,
        us_ton: 0.0005,
        long_ton: 0.0004464,
        "oz t": 14.583,
      };

      if (frConversions[frUnitValue]) {
        frValue = frValue / frConversions[frUnitValue];
      } else if (frUnitValue === "earths") {
        frValue = frValue * 13166006297680889120775995;
      } else if (frUnitValue === "me") {
        frValue = frValue / 497939698128157422761985444381;
      } else if (frUnitValue === "u") {
        frValue = frValue / 273159675507180000000000000;
      }
    }

    // Calculate volume and density
    const total = lengthValue * widthValue * heightValue;
    const volume = (total / 1728) * pq;
    const density = weightValue / volume;
    const weightPerPallet = weightValue / pq;

    // Determine freight class
    let f_cls;
    if (density < 1) f_cls = 500;
    else if (density < 2) f_cls = 400;
    else if (density < 3) f_cls = 300;
    else if (density < 4) f_cls = 250;
    else if (density < 5) f_cls = 200;
    else if (density < 6) f_cls = 175;
    else if (density < 7) f_cls = 150;
    else if (density < 8) f_cls = 125;
    else if (density < 9) f_cls = 110;
    else if (density < 10) f_cls = 100;
    else if (density < 12) f_cls = 92.5;
    else if (density < 13) f_cls = 85;
    else if (density < 15) f_cls = 77.5;
    else if (density < 22) f_cls = 70;
    else if (density < 30) f_cls = 65;
    else if (density < 35) f_cls = 60;
    else if (density < 50) f_cls = 55;
    else f_cls = 50;

    // Calculate freight cost if freight rate provided
    if (frValue && !isNaN(frValue)) {
      const fc = frValue * 936.96;
      result.tech_fc = fc;
    }

    result.tech_weight = sigFig(weightPerPallet, 4);
    result.tech_volume = sigFig(volume, 4);
    result.tech_density = sigFig(density, 4);
    result.tech_f_cls = sigFig(f_cls, 4);

    return result;
  }

  /**
   * getCalculationAspectRatioCalculator: Service Method
   * POST: /api/calculators-lol/aspect-ratio-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationAspectRatioCalculator(body) {
    let ratios = body.tech_ratios;
    let w1 = body.tech_w1;
    let h1 = body.tech_h1;
    let w2 = body.tech_w2;
    let h2 = body.tech_h2;

    // Trim string values
    ratios = ratios?.trim();
    w1 = w1?.toString().trim();
    h1 = h1?.toString().trim();
    w2 = w2?.toString().trim();
    h2 = h2?.toString().trim();

    w1 = parseFloat(w1);
    h1 = parseFloat(h1);
    w2 = parseFloat(w2);
    h2 = parseFloat(h2);

    const response = {};

    if (!isNaN(w1) && !isNaN(h1)) {
      function gcd(a, b) {
        if (b === 0) return a;
        return gcd(b, a % b);
      }

      function reduceRatio(numerator, denominator) {
        if (numerator === denominator) return "1 : 1";
        const divisor = gcd(numerator, denominator);
        let left = numerator / divisor;
        let right = denominator / divisor;
        if (left == 8 && right == 5) {
          left = 16;
          right = 10;
        }
        return `${left} : ${right}`;
      }

      function solve(width, height, numerator, denominator) {
        if (!isNaN(width)) {
          return Math.round(width / (numerator / denominator));
        } else if (!isNaN(height)) {
          return Math.round(height * (numerator / denominator));
        } else {
          return "";
        }
      }

      function ratio2css(numerator, denominator) {
        let width = "";
        let height = "";
        if (numerator > denominator) {
          width = 200;
          height = solve(width, "", numerator, denominator);
        } else {
          height = 200;
          width = solve("", height, numerator, denominator);
        }
        return `width:${Math.round(width)}px;height:${Math.round(
          height
        )}px;line-height:${Math.round(height)}px`;
      }

      let x1v = w1;
      let y1v = h1;
      let stop = 0;
      const maxIterations = 10;
      while (!Number.isInteger(x1v) || !Number.isInteger(y1v)) {
        x1v *= 10;
        y1v *= 10;
        ++stop;
        if (stop > maxIterations) break;
      }

      if (!isNaN(w2) && isNaN(h2)) {
        h2 = (h1 / w1) * w2;
        response.tech_check = "h2";
        response.tech_ans = Math.round(h2 * 1000) / 1000;
      } else if (isNaN(w2) && !isNaN(h2)) {
        w2 = (w1 / h1) * h2;
        response.tech_check = "w2";
        response.tech_ans = Math.round(w2 * 1000) / 1000;
      } else if (!isNaN(w2) && !isNaN(h2)) {
        response.error = "Please enter either W₂ or H₂ to find the other.";
        return response;
      }

      const mode = w1 >= h1 ? "Landscape" : "Portrait";

      response.tech_asp_ratio = reduceRatio(w1, h1);
      response.tech_vsl_ratio = ratio2css(x1v, y1v);
      response.tech_pixels = (w1 * h1).toLocaleString();
      response.tech_mode = mode;
      return response;
    } else {
      return { error: "Please! Check Your Input" };
    }
  }

  /**
   * getCalculationBoardFootCalculator: Service Method
   * POST: /api/calculators-lol/board-foot-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationBoardFootCalculator(body) {
    let length = body.tech_length?.toString().trim();
    let no = body.tech_no?.toString().trim();
    let length_unit = body.tech_length_unit?.toString().trim();
    let width = body.tech_width?.toString().trim();
    let width_unit = body.tech_width_unit?.toString().trim();
    let thickness = body.tech_thickness?.toString().trim();
    let thickness_unit = body.tech_thickness_unit?.toString().trim();
    let price = body.tech_price?.toString().trim();

    // Convert strings to numbers
    length = parseFloat(length);
    no = parseFloat(no);
    width = parseFloat(width);
    thickness = parseFloat(thickness);

    const response = {};

    if (!isNaN(length) && !isNaN(no) && !isNaN(width) && !isNaN(thickness)) {
      // Thickness conversion to inches
      if (thickness_unit === "cm") {
        thickness *= 0.3937;
      } else if (thickness_unit === "m") {
        thickness *= 39.37;
      } else if (thickness_unit === "ft") {
        thickness *= 12;
      } else if (thickness_unit === "yd") {
        thickness *= 36;
      }

      // Width conversion to inches
      if (width_unit === "cm") {
        width *= 0.3937;
      } else if (width_unit === "m") {
        width *= 39.37;
      } else if (width_unit === "ft") {
        width *= 12;
      } else if (width_unit === "yd") {
        width *= 36;
      }

      // Length conversion to feet
      if (length_unit === "cm") {
        length *= 0.03281;
      } else if (length_unit === "m") {
        length *= 3.281;
      } else if (length_unit === "in") {
        length /= 12;
      } else if (length_unit === "yd") {
        length *= 3;
      }

      // Calculate board foot
      let ans = length * width * (thickness / 12);
      ans *= no;

      response.tech_ans = ans;
      return response;
    } else {
      return { error: "Please! Check Your Inputs" };
    }
  }

    /**
   * getCalculationEdpiCalculator: Service Method
   * POST: /api/calculators-lol/edpi-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationEdpiCalculator(body) {
    let dpi = body.tech_dpi?.toString().trim();
    let row = body.tech_row?.toString().trim();
    let sen = body.tech_sen?.toString().trim();
    let game = body.tech_game?.toString().trim();
    let win = body.tech_win?.toString().trim();
    let submit = body.tech_submit;

    // Convert to numeric
    dpi = parseFloat(dpi);
    row = parseFloat(row);
    sen = parseFloat(sen);
    game = parseInt(game);
    win = parseFloat(win);

    const response = {};

    if (submit) {
      // Helper: Calculate Sensitivity Type
      const CalcSn = (e, game) => {
        const s = e * 1;
        switch (game) {
          case 1:
          case 6:
            if (s > 0 && s < 700) return "Low Sens";
            if (s >= 700 && s < 1200) return "Medium Sens";
            if (s >= 1200) return "High Sens";
            break;
          case 3:
            if (s > 0 && s < 200) return "Low Sens";
            if (s >= 200 && s < 400) return "Medium Sens";
            if (s >= 400) return "High Sens";
            break;
          case 4:
            if (s > 0 && s < 40) return "Low Sens";
            if (s >= 40 && s < 80) return "Medium Sens";
            if (s >= 80) return "High Sens";
            break;
          case 5:
            if (s > 0 && s < 3000) return "Low Sens";
            if (s >= 3000 && s < 6000) return "Medium Sens";
            if (s >= 6000) return "High Sens";
            break;
          case 2:
          default:
            return "";
        }
      };

      // Helper: Calculate 360cm
      const Calc360 = (e, game) => {
        const coeff = {
          1: 0.022,
          2: 0.0066,
          3: 0.07,
          4: 0.005555,
          5: 0.0066,
          6: 0.021999,
        };
        const multiplier = coeff[game] || 0.022;
        return (360 / (multiplier * e)) * 2.54;
      };

      let ans = 0;
      if (game === 1) {
        let t = row === 0 ? win : 1;
        ans = dpi * sen * t;
      } else if (game === 4) {
        ans = (dpi * sen) / 100;
      } else {
        ans = dpi * sen;
      }

      const type = CalcSn(ans, game);
      const cm = Calc360(ans, game);
      const inch = cm / 2.54;

      response.tech_ans = parseFloat(ans.toFixed(2));
      response.tech_cm = parseFloat(cm.toFixed(2));
      response.tech_in = parseFloat(inch.toFixed(2));
      response.tech_type = type;
      return response;
    } else {
      return { error: "Please! Check Your Inputs" };
    }
  }

  /**
   * getCalculationVisaChanceCalculator: Service Method
   * POST: /api/calculators-lol/visa-chance-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationVisaChanceCalculator(body) {
    let name = body.tech_name?.trim();
    let resident = body.tech_resident?.trim();
    let nationality = body.tech_nationality?.trim();
    let travel = parseInt(body.tech_travel);

    const response = {};

    if (!travel || !nationality || !resident) {
      response.error = "Please! Check Your Inputs";
      return response;
    }

    const ec = [
      [],
      [
        "Albania",
        "Algeria",
        "Andorra",
        "Argentina",
        "Australia",
        "Austria",
        "Bahamas",
        "Bahrain",
        "Barbados",
        "Belgium",
        "Bolivia",
        "Bosnia & herzegovina",
        "Brazil",
        "Brunei darussalam",
        "Bulgaria",
        "Canada",
        "Chile",
        "China",
        "Colombia",
        "Costa rica",
        "Croatia",
        "Cuba",
        "Cyprus",
        "Czech republic",
        "Denmark",
        "Djibouti",
        "Ecuador",
        "Estonia",
        "Finland",
        "France",
        "Germany",
        "Greece",
        "Guatemala",
        "Holy see (vatican)",
        "Honduras",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran",
        "Ireland",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jordan",
        "Korea",
        "Kuwait",
        "Latvia",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macedonia",
        "Malaysia",
        "Maldives",
        "Malta",
        "Mauritius",
        "Mexico",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Morocco",
        "Nepal",
        "Netherlands",
        "New zealand",
        "Norway",
        "Oman",
        "Pakistan",
        "Panama",
        "Paraguay",
        "Peru",
        "Poland",
        "Portugal",
        "Qatar",
        "Romania",
        "San marino",
        "Saudi arabia",
        "Serbia",
        "Seychelles",
        "Singapore",
        "Slovakia",
        "Slovenia",
        "South africa",
        "Spain",
        "Sri lanka",
        "Sweden",
        "Switzerland",
        "Thailand",
        "Trinidad and tobago",
        "Turkey",
        "Turkmenistan",
        "United arab emirates",
        "United kingdom",
        "United states of america",
        "Vietnam",
      ],
      [
        "Afghanistan",
        "Albania",
        "Algeria",
        "American Samoa",
        "Andorra",
        "Angola",
        "Anguilla",
        "Antarctica",
        "Antigua and Barbuda",
        "Argentina",
        "Armenia",
        "Aruba",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bermuda",
        "Bhutan",
        "Bolivia",
        "Bosnia and Herzegovina",
        "Botswana",
        "Bouvet Island",
        "Brazil",
        "British Indian Ocean Territory",
        "Brunei Darussalam",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Cape Verde",
        "Cayman Islands",
        "Central African Republic",
        "Chad",
        "Chile",
        "China",
        "Christmas Island",
        "Cocos (Keeling) Islands",
        "Colombia",
        "Comoros",
        "Congo",
        "Cook Islands",
        "Costa Rica",
        "Croatia (Hrvatska)",
        "Cuba",
        "Cyprus",
        "Czech Republic",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic",
        "East Timor",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Ethiopia",
        "Falkland Islands (Malvinas)",
        "Faroe Islands",
        "Fiji",
        "Finland",
        "France",
        "France, Metropolitan",
        "French Guiana",
        "French Polynesia",
        "French Southern Territories",
        "Gabon",
        "Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Gibraltar",
        "Greece",
        "Greenland",
        "Grenada",
        "Guadeloupe",
        "Guam",
        "Guatemala",
        "Guernsey",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        "Heard and Mc Donald Islands",
        "Honduras",
        "Hong Kong",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran (Islamic Republic of)",
        "Iraq",
        "Ireland",
        "Isle of Man",
        "Israel",
        "Italy",
        "Ivory Coast",
        "Jamaica",
        "Japan",
        "Jersey",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Korea, Democratic People's Republic of",
        "Korea, Republic of",
        "Kosovo",
        "Kuwait",
        "Kyrgyzstan",
        "Lao People's Democratic Republic",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libyan Arab Jamahiriya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macau",
        "Macedonia",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands",
        "Martinique",
        "Mauritania",
        "Mauritius",
        "Mayotte",
        "Mexico",
        "Micronesia, Federated States of",
        "Moldova, Republic of",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Montserrat",
        "Morocco",
        "Mozambique",
        "Myanmar",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands",
        "Netherlands Antilles",
        "New Caledonia",
        "New Zealand",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "Niue",
        "Norfolk Island",
        "Northern Mariana Islands",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Palestine",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Pitcairn",
        "Poland",
        "Portugal",
        "Puerto Rico",
        "Qatar",
        "Reunion",
        "Romania",
        "Russian Federation",
        "Rwanda",
        "Saint Kitts and Nevis",
        "Saint Lucia",
        "Saint Vincent and the Grenadines",
        "Samoa",
        "San Marino",
        "Sao Tome and Principe",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "South Georgia South Sandwich Islands",
        "South Sudan",
        "Spain",
        "Sri Lanka",
        "St. Helena",
        "St. Pierre and Miquelon",
        "Sudan",
        "Suriname",
        "Svalbard and Jan Mayen Islands",
        "Swaziland",
        "Sweden",
        "Switzerland",
        "Syrian Arab Republic",
        "Taiwan",
        "Tajikistan",
        "Tanzania, United Republic of",
        "Thailand",
        "Togo",
        "Tokelau",
        "Tonga",
        "Trinidad and Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Turks and Caicos Islands",
        "Tuvalu",
        "Uganda",
        "Ukraine",
        "United Arab Emirates",
        "United Kingdom",
        "United States",
        "United States minor outlying islands",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Vatican City State",
        "Venezuela",
        "Vietnam",
        "Virgin Islands (British)",
        "Virgin Islands (U.S.)",
        "Wallis and Futuna Islands",
        "Western Sahara",
        "Yemen",
        "Zaire",
        "Zambia",
        "Zimbabwe",
      ],
    ];

    const lowerNationality = nationality.toLowerCase();
    const matchList = (ec[travel] || []).map((n) => n.toLowerCase());

    const ans = matchList.includes(lowerNationality)
      ? "There are more likely 99% chances of your visa eligibility!"
      : "There are more likely 50% chances of your visa eligibility!";

    response.tech_ans = ans;
    return response;
  }

  /**
   * getCalculationPopulationDensityCalculator: Service Method
   * POST: /api/calculators-lol/population-density-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationPopulationDensityCalculator(body) {
    let area = body.tech_area?.toString().trim();
    let no = body.tech_no?.toString().trim();

    const response = {};

    if (!isNaN(area) && !isNaN(no)) {
      let areaNum = parseFloat(area);
      let noNum = parseFloat(no);

      let ans = noNum / areaNum;
      response.tech_ans = Math.round(ans);
      return response;
    } else {
      response.error = "Please! Check Input Fields";
      return response;
    }
  }

  /**
   * getCalculationProratedrentCalculator: Service Method
   * POST: /api/calculators-lol/prorated-rent-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationProratedrentCalculator(body) {
    let date = body.tech_date?.toString().trim();
    let rent = parseFloat(body.tech_rent?.toString().trim());
    let bill_on = parseInt(body.tech_bill_on?.toString().trim());

    const response = {};

    if (!isNaN(rent) && !isNaN(bill_on) && date) {
      let dt = new Date(date);
      let year = dt.getFullYear();
      let mon = dt.getMonth(); // 0-indexed
      let day = dt.getDate();

      // Get total days in the current month
      let daysInMonth = new Date(year, mon + 1, 0).getDate();
      let per_day = rent / daysInMonth;
      let pror = 0;
      let days_in_mon = 0;
      let end_date = "";
      let res = 0;

      if (bill_on >= day || bill_on === 1) {
        res = 1;

        if (bill_on <= daysInMonth) {
          if (bill_on === 1) {
            days_in_mon = daysInMonth - day + 1;
            pror = per_day * days_in_mon;
            end_date = `${year}-${String(mon + 1).padStart(
              2,
              "0"
            )}-${daysInMonth}`;
          } else {
            days_in_mon = bill_on - day;
            pror = per_day * days_in_mon;
            end_date = `${year}-${String(mon + 1).padStart(2, "0")}-${String(
              bill_on - 1
            ).padStart(2, "0")}`;
          }
        } else {
          days_in_mon = 1;
          pror = per_day * days_in_mon;
          end_date = `${year}-${String(mon + 1).padStart(
            2,
            "0"
          )}-${daysInMonth}`;
        }
      } else if (bill_on < day) {
        res = 2;
        days_in_mon = daysInMonth - day + 1;
        pror = per_day * days_in_mon;

        let nextMonth = new Date(year, mon + 1, 1);
        let year1 = nextMonth.getFullYear();
        let mon1 = nextMonth.getMonth();
        let daysInNextMonth = new Date(year1, mon1 + 1, 0).getDate();
        let per_day1 = rent / daysInNextMonth;
        let days_in_mon1 = bill_on - 1;
        let pror1 = per_day1 * days_in_mon1;

        end_date = `${year1}-${String(mon1 + 1).padStart(2, "0")}-${String(
          bill_on - 1
        ).padStart(2, "0")}`;

        response.tech_d1 = daysInNextMonth;
        response.tech_per_day1 = parseFloat(per_day1.toFixed(2));
        response.tech_days_in_mon1 = days_in_mon1;
        response.tech_pror1 = parseFloat(pror1.toFixed(2));
      }

      response.tech_date = date;
      response.tech_d = daysInMonth;
      response.tech_per_day = parseFloat(per_day.toFixed(2));
      response.tech_days_in_mon = days_in_mon;
      response.tech_pror = parseFloat(pror.toFixed(2));
      response.tech_end_date = end_date;
      response.tech_res = res;
      return response;
    } else {
      response.error = "Please! Check Your Input";
      return response;
    }
  }

  /**
   * getCalculationKoreanAgeCalculator: Service Method
   * POST: /api/calculators-lol/korean-age-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationKoreanAgeCalculator(body) {
    const current_year = parseInt(body.tech_current_year?.toString().trim());
    const year = parseInt(body.tech_year?.toString().trim());
    const birthday_unit = body.tech_birthday_unit?.toString().trim(); // "1" or "2"
    const age = parseInt(body.tech_age?.toString().trim());
    const room_unit = body.tech_room_unit?.toString().trim(); // "1" or "2"

    const response = {};

    if (room_unit === "1") {
      // Calculate from year of birth
      if (!isNaN(year) && !isNaN(current_year)) {
        if (year < current_year) {
          const korean_age = current_year - year + 1;
          response.tech_korean_age = korean_age;
        } else {
          response.error =
            "It is must that your birth year is earlier than current one in case you are from the future";
        }
      } else {
        response.error = "Please! Check Your Inputs";
      }
    } else if (room_unit === "2") {
      // Calculate from international age
      if (!isNaN(age)) {
        if (age > 0) {
          let korean_age;
          if (birthday_unit === "1") {
            korean_age = age + 2;
          } else if (birthday_unit === "2") {
            korean_age = age + 1;
          }

          if (korean_age !== undefined) {
            response.tech_korean_age = korean_age;
          } else {
            response.error = "Invalid birthday unit";
          }
        } else {
          response.error = "Age Cannot be negative";
        }
      } else {
        response.error = "Please! Check Your Inputs";
      }
    } else {
      response.error = "Invalid room unit";
    }

    return response;
  }

  /**
   * getCalculationWinningPercentageCalculator: Service Method
   * POST: /api/calculators-lol/winning-percentage-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationWinningPercentageCalculator(body) {
    const win = parseFloat(body.tech_win?.toString().trim());
    const loss = parseFloat(body.tech_loss?.toString().trim());
    const tie =
      body.tie !== undefined ? parseFloat(body.tech_tie?.toString().trim()) : 0;
    const value =
      body.value !== undefined
        ? parseFloat(body.tech_value?.toString().trim())
        : null;

    const response = {};

    if (!isNaN(win) && !isNaN(loss)) {
      const no_games = win * loss;
      let total = win + loss;

      if (!isNaN(tie)) {
        total += tie;
      }

      let ans;
      if (!isNaN(value) && value !== 0) {
        ans = ((win + value * tie) / total) * 100;
      } else {
        ans = (win / total) * 100;
      }

      response.tech_ans = ans;
      response.tech_no_games = no_games;
    } else {
      response.error = "Please! Check Your Inputs";
    }

    return response;
  }

  /**
   * getCalculationMcgToMgCalculator: Service Method
   * POST: /api/calculators-lol/mcg-to-mg-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationMcgToMgCalculator(body) {
    const operations = body.tech_operations?.toString().trim();
    const first = parseFloat(body.tech_first?.toString().trim());

    const response = {};

    if (operations === "1") {
      if (!isNaN(first)) {
        response.tech_jawab = first / 1000;
      } else {
        response.error = "Please! Check Your Inputs";
        return response;
      }
    } else if (operations === "2") {
      if (!isNaN(first)) {
        response.tech_jawab = first * 1000;
      } else {
        response.error = "Please! Check Your Inputs";
        return response;
      }
    } else {
      response.error = "Invalid operation selected";
      return response;
    }

    response.tech_operations = operations;
    response.input_first = first;
    return response;
  }

  /**
   * getCalculationDownloadCalculator: Service Method
   * POST: /api/calculators-lol/download-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationDownloadCalculator(body) {
    const operations = body.tech_operations;
    const first = parseFloat(body.tech_first);
    const second = parseFloat(body.tech_second);
    const third = parseFloat(body.tech_third);
    const f_unit = body.tech_f_unit;
    const s_unit = body.tech_s_unit;
    const t_unit = body.tech_t_unit;

    const response = {};

    function calculate(unit, value) {
      const map = {
        B: value / 1e6,
        kB: value / 1e3,
        MB: value * 1,
        GB: value * 1e3,
        TB: value * 1e6,
        PB: value * 1e9,
        EB: value * 1e12,
        ZB: value * 1e15,
        YB: value * 1e18,
        bit: value / 8e6,
        kbit: value * 0.000125,
        Mbit: value / 8,
        Gbits: value * 125,
        Tbit: value * 125000,
        KiB: value * 0.001024,
        MiB: value * 1.0486,
        GiB: value * 1073.7,
        TiB: value * 1099512,
        PiB: value * 1125899907,
        EiB: value * 1152921504607,
        ZiB: value * 1180591620717411,
        YiB: value * 1208925819614629175,
        Kibit: value * 0.000128,
        Mibit: value * 0.13107,
        Gibit: value * 134.22,
        Tibit: value * 137439,
      };
      return map[unit] ?? 0;
    }

    function tim(unit, value) {
      const map = {
        sec: value,
        min: value * 60,
        hrs: value * 3600,
        days: value * 86400,
        wks: value * 604800,
        mos: value * 2629800,
        yrs: value * 31557600,
      };
      return map[unit] ?? 0;
    }

    let jawab = 0;
    if (operations === "1") {
      if (first > 0 && second > 0) {
        const size = calculate(f_unit, first);
        const speed = calculate(s_unit, second);
        jawab = size / speed;
        const bandwidths = [
          28800, 56000, 256000, 512000, 1000000, 2000000, 8000000, 24000000,
          10000000, 100000000, 7200000, 80000000, 1000000000,
        ];

        bandwidths.forEach((bw, i) => {
          const filetime = (size * 1024 * 8) / bw;
          const hours = String(Math.floor(filetime / 3600)).padStart(2, "0");
          const minutes = String(Math.floor((filetime % 3600) / 60)).padStart(
            2,
            "0"
          );
          const seconds = String(Math.floor(filetime % 60)).padStart(2, "0");
          response[`f${i + 1}`] = `${hours}:${minutes}:${seconds}`;
        });
      } else {
        response.error =
          first <= 0
            ? "Please input a file size greater than 0."
            : "Please enter a positive download speed.";
        return response;
      }
    } else if (operations === "2") {
      if (first > 0 && third > 0) {
        const size = calculate(f_unit, first);
        const time = tim(t_unit, third);
        jawab = size / time;
      } else {
        response.error =
          first <= 0
            ? "Please input a file size greater than 0."
            : "Please enter a download time greater than 0.";
        return response;
      }
    } else if (operations === "3") {
      if (second > 0 && third > 0) {
        const speed = calculate(s_unit, second);
        const time = tim(t_unit, third);
        jawab = speed * time;
      } else {
        response.error =
          second <= 0
            ? "Please enter a positive download speed."
            : "Please enter a download time greater than 0.";
        return response;
      }
    } else {
      response.error = "Invalid operation";
      return response;
    }

    response.tech_jawab = Math.round(jawab);
    return response;
  }

  /**
   * getCalculationSobrietyCalculator: Service Method
   * POST: /api/calculators-lol/sobriety-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationSobrietyCalculator(body) {
    let input = body.tech_input;
    let input2 = body.tech_input2;
    let submit = body.tech_submit;
    const result = {};

    if (!submit) {
      result.error = "Please! Check Your Input";
      return result;
    }

    try {
      // Detect date format and parse accordingly
      let s_date, e_date;

      // Check if format is YYYY-MM-DD or DD-MM-YYYY
      if (input.match(/^\d{4}-\d{2}-\d{2}$/)) {
        // Format: YYYY-MM-DD
        s_date = input.split("-");
        s_date = [s_date[2], s_date[1], s_date[0]]; // Convert to [DD, MM, YYYY]
      } else {
        // Format: DD-MM-YYYY
        s_date = input.split("-");
      }

      if (input2.match(/^\d{4}-\d{2}-\d{2}$/)) {
        // Format: YYYY-MM-DD
        e_date = input2.split("-");
        e_date = [e_date[2], e_date[1], e_date[0]]; // Convert to [DD, MM, YYYY]
      } else {
        // Format: DD-MM-YYYY
        e_date = input2.split("-");
      }

      const s_hour = 0;
      const s_min = 0;
      const s_sec = 0;
      const e_hour = 0;
      const e_min = 0;
      const e_sec = 0;

      // Create Date objects
      // s_date[0] = day, s_date[1] = month, s_date[2] = year
      const fromDate = new Date(s_date[2], s_date[1] - 1, s_date[0]);
      const toDate = new Date(e_date[2], e_date[1] - 1, e_date[0]);

      // Determine which date is earlier
      let startDate = fromDate <= toDate ? fromDate : toDate;
      let endDate = fromDate <= toDate ? toDate : fromDate;

      // Calculate difference in years, months, days
      let years = endDate.getFullYear() - startDate.getFullYear();
      let months = endDate.getMonth() - startDate.getMonth();
      let days = endDate.getDate() - startDate.getDate();

      // Adjust for negative days
      if (days < 0) {
        months--;
        const prevMonth = new Date(
          endDate.getFullYear(),
          endDate.getMonth(),
          0
        );
        days += prevMonth.getDate();
      }

      // Adjust for negative months
      if (months < 0) {
        years--;
        months += 12;
      }

      // Format dates
      const formatDate = (dateStr) => {
        let parts;
        if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
          parts = dateStr.split("-");
          parts = [parts[2], parts[1], parts[0]]; // Convert to [DD, MM, YYYY]
        } else {
          parts = dateStr.split("-");
        }
        const date = new Date(parts[2], parts[1] - 1, parts[0]);
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        return `${monthNames[date.getMonth()]} ${String(
          date.getDate()
        ).padStart(2, "0")}, ${date.getFullYear()}`;
      };

      let from = formatDate(input);
      let to = formatDate(input2);

      // Swap if needed to match original dates
      if (fromDate > toDate) {
        const temp = from;
        from = to;
        to = temp;
      }

      // Calculate timestamps
      const d1 = Math.floor(
        new Date(
          s_date[2],
          s_date[1] - 1,
          s_date[0],
          s_hour,
          s_min,
          s_sec
        ).getTime() / 1000
      );
      const d2 = Math.floor(
        new Date(
          e_date[2],
          e_date[1] - 1,
          e_date[0],
          e_hour,
          e_min,
          e_sec
        ).getTime() / 1000
      );
      const diff = Math.abs(d2 - d1);

      // Calculate hours, minutes, seconds (remaining after years, months, days)
      const hours = Math.floor(
        (diff -
          years * 365 * 60 * 60 * 24 -
          months * 30 * 60 * 60 * 24 -
          days * 60 * 60 * 24) /
          (60 * 60)
      );
      const minutes = Math.floor(
        (diff -
          years * 365 * 60 * 60 * 24 -
          months * 30 * 60 * 60 * 24 -
          days * 60 * 60 * 24 -
          hours * 60 * 60) /
          60
      );
      const seconds = Math.floor(
        diff -
          years * 365 * 60 * 60 * 24 -
          months * 30 * 60 * 60 * 24 -
          days * 60 * 60 * 24 -
          hours * 60 * 60 -
          minutes * 60
      );

      // Calculate days from months
      const day1 = months * 30.417;
      const d1_ans = parseFloat((day1 + days).toFixed(3));

      // Calculate total months
      const months1 = years * 12;
      const mon_ans = months1 + months;

      // Calculate total days between dates
      const days_ans = Math.floor(diff / (60 * 60 * 24));

      // Calculate total hours
      const hours_ans = days_ans * 24;

      // Calculate weeks
      const weeks = Math.floor(days_ans / 7);
      const w_days = weeks * 7;
      const wd_ans = days_ans - w_days;

      // Prepare result
      result.tech_from = from;
      result.tech_diff = diff;
      result.tech_to = to;
      result.tech_years = years;
      result.tech_months = months;
      result.tech_hours = parseFloat(hours.toFixed(1));
      result.tech_days = days;
      result.tech_d1_ans = d1_ans;
      result.tech_mon_ans = mon_ans;
      result.tech_days_ans = days_ans.toString();
      result.tech_hours_ans = hours_ans;
      result.tech_weeks = parseFloat(weeks.toFixed(1));
      result.tech_wd_ans = parseFloat(wd_ans.toFixed(1));

      return result;
    } catch (error) {
      console.error("Error in sobriety calculator:", error);
      result.error = "Please! Check Your Input";
      return result;
    }
  }

  /**
   * getCalculationKdCalculator: Service Method
   * POST: /api/calculators-lol/kd-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationKdCalculator(body) {
    let kills = body.tech_kills;
    let deaths = body.tech_deaths;
    let assists = body.tech_assists;

    let param = {};
    // Helper function
    function isNumeric(value) {
      return !isNaN(parseFloat(value)) && isFinite(value);
    }
    // Validate kills and deaths
    if (isNumeric(kills) && isNumeric(deaths)) {
      if (kills > 0 && deaths > 0) {
        const kd_ratio = kills / deaths;

        if (assists !== undefined && assists !== "") {
          if (isNumeric(assists)) {
            if (assists > 0) {
              const kda_ratio = (kills + assists) / deaths;
              param.kda_ratio = kda_ratio;
            } else {
              return { error: "Enter Positive Value" };
            }
          } else {
            return { error: "Please! Check Your Input" };
          }
        }

        param.tech_kd_ratio = kd_ratio;
        return param;
      } else {
        return { error: "Enter Positive Value" };
      }
    } else {
      return { error: "Please! Check Your Input" };
    }
  }

  /**
   * getCalculationDataTransferCalculator: Service Method
   * POST: /api/calculators-lol/data-transfer-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationDataTransferCalculator(body) {
    let first = body.tech_first;
    let f_unit = body.tech_f_unit;
    let second = body.tech_second;
    let s_unit = body.tech_s_unit;
    let kilo = body.tech_kilo;
    let overhead = body.tech_overhead;

    const param = {};

    function calculateHazar(a, b) {
      const conversions = {
        1: b / 1000000,
        2: b / 1000,
        3: b * 1,
        4: b * 1000,
        5: b * 1000000,
        6: b * 1000000000,
        7: b * 1000000000000,
        8: b * 1000000000000000,
        9: b * 1000000000000000000,
        10: b / 8000000,
        11: b * 0.000125,
        12: b / 8,
        13: b * 125,
        14: b * 125000,
        15: b * 0.001024,
        16: b * 1.0486,
        17: b * 1073.7,
        18: b * 1099512,
        19: b * 1125899907,
        20: b * 1152921504607,
        21: b * 1180591620717411,
        22: b * 1208925819614629175,
        23: b * 0.000128,
        24: b * 0.13107,
        25: b * 134.22,
        26: b * 137439,
      };
      return conversions[a] ?? b;
    }

    function calculateHazar24(a, b) {
      const conversions = {
        1: b / 1000024,
        2: b / 1024,
        3: b * 1,
        4: b * 1024,
        5: b * 1000024,
        6: b * 1000000024,
        7: b * 1000000000024,
        8: b * 1000000000000024,
        9: b * 1000000000000000024,
        10: b / 8000024,
        11: b * 0.000125,
        12: b / 8,
        13: b * 125,
        14: b * 125024,
        15: b * 0.001024,
        16: b * 1.0486,
        17: b * 1073.7,
        18: b * 1099512,
        19: b * 1125899907,
        20: b * 1152921504607,
        21: b * 1180591620717411,
        22: b * 1208925819614629175,
        23: b * 0.000128,
        24: b * 0.13107,
        25: b * 134.22,
        26: b * 137439,
      };
      return conversions[a] ?? b;
    }

    function formatTime(t) {
      const hours = String(Math.floor(t / 3600)).padStart(2, "0");
      const minutes = String(Math.floor((t % 3600) / 60)).padStart(2, "0");
      const seconds = String(Math.floor(t % 60)).padStart(2, "0");
      return `${hours}:${minutes}:${seconds}`;
    }

    if (isNaN(first) || isNaN(second)) {
      param.error = "Please check your input";
      return param;
    }

    let f1 = parseFloat(first);
    let s1 = parseFloat(second);

    const fUnit = parseInt(f_unit);
    const sUnit = parseInt(s_unit);
    const kiloVal = parseInt(kilo);
    const overheadVal = parseInt(overhead);

    if (kiloVal === 1) {
      f1 = calculateHazar24(fUnit, f1);
      s1 = calculateHazar24(sUnit, s1);
    } else if (kiloVal === 2) {
      f1 = calculateHazar(fUnit, f1);
      s1 = calculateHazar(fUnit, s1);
    }

    if (overheadVal === 2) f1 += f1 * 0.05;
    else if (overheadVal === 3) f1 += f1 * 0.1;
    else if (overheadVal === 4) f1 += f1 * 0.2;
    else if (overheadVal === 5) f1 += f1 * 0.3;
    else if (overheadVal === 6) f1 += f1 * 0.4;
    else if (overheadVal === 7) f1 += f1 * 0.5;

    if (f1 <= 0) {
      param.error = "Please input a file size greater than 0.";
      return param;
    }

    if (s1 <= 0) {
      param.error = "Please enter a positive download speed.";
      return param;
    }

    const jawab = Math.round(f1 / s1);
    const mainAns = formatTime(jawab);

    const bandwidths = [1.544, 10, 100, 1000, 10240, 480, 5120, 10240, 20480];
    const tableAns = bandwidths.map((bw) => {
      const filetime = (f1 * 1024 * 8) / (bw * 1024);
      return formatTime(filetime);
    });

    param.tech_jawab = jawab;
    param.tech_main_ans = mainAns;
    for (let i = 0; i < tableAns.length; i++) {
      param[`tech_f${i + 1}`] = tableAns[i];
    }

    return param;
  }

  /**
   * getCalculationWordsPerMinuteCalculator: Service Method
   * POST: /api/calculators-lol/words-per-minute-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationWordsPerMinuteCalculator(body) {
    let speak_speed = body.tech_speak_speed;
    let ss = body.tech_ss;
    let reading_speed = body.tech_reading_speed;
    let rs = body.tech_rs;
    let select = body.tech_select;
    let words = body.tech_words;
    let x = body.tech_x;

    const param = {};

    function formatTime(t, f = ":") {
      const hours = String(Math.floor(t / 3600)).padStart(2, "0");
      const minutes = String(Math.floor((t / 60) % 60)).padStart(2, "0");
      const seconds = String(Math.floor(t % 60)).padStart(2, "0");
      return `${hours}${f}${minutes}${f}${seconds}`;
    }

    if (!isNaN(ss) && !isNaN(rs)) {
      ss = parseFloat(ss);
      rs = parseFloat(rs);

      if (ss > 0) {
        if (rs > 0) {
          let speak_ans, read_ans;

          if (select == "1") {
            if (!isNaN(words)) {
              words = parseInt(words);
              if (words > 0) {
                speak_ans = words / ss;
                read_ans = words / rs;
              } else {
                param.error = "The number of words must be more than 0.";
                return param;
              }
            } else {
              param.error = "Please check your input";
              return param;
            }
          } else if (select == "2") {
            if (x && typeof x === "string" && x.trim().length > 0) {
              const para_words = x.trim().split(/\s+/).length;
              if (para_words > 0) {
                speak_ans = para_words / ss;
                read_ans = para_words / rs;
                param.tech_para_words = para_words;
              } else {
                param.error = "The number of words must be more than 0.";
                return param;
              }
            } else {
              param.error = "Please check your input";
              return param;
            }
          }

          const speak_time = formatTime(speak_ans * 60);
          const read_time = formatTime(read_ans * 60);

          param.tech_speak_ans = speak_ans;
          param.tech_read_ans = read_ans;
          param.tech_speak_time = speak_time;
          param.tech_read_time = read_time;

          return param;
        } else {
          param.error = "The reading speed must be more than 0.";
          return param;
        }
      } else {
        param.error = "The speaking speed must be more than 0.";
        return param;
      }
    } else {
      param.error = "Please check your input";
      return param;
    }
  }

  /**
   * getCalculationDeskHeightCalculator: Service Method
   * POST: /api/calculators-lol/desk-height-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationDeskHeightCalculator(body) {
    let units = body.tech_units;
    let height = body.tech_height;
    let height2 = body.tech_height2;
    let position = body.tech_position;

    let unit;
    if (units === "Centimeters") {
      unit = 2.54;
      height = parseFloat(height);
    } else if (units === "Feet and Inches") {
      unit = 1;
      height = parseFloat(height2);
    }

    const seat_min = (0.3219306 * height) / 2.54 - 5.312559;
    const seat_max = (0.2715447 * height) / 2.54 - 0.1796748;
    const table_min = (0.4739837 * height) / 2.54 - 6.677846;
    const table_max = (0.5528455 * height) / 2.54 - 9.427033;
    const monitor_min = (0.7248521 * height) / 2.54 - 1.95858;
    const monitor_max = (0.7376726 * height) / 2.54 - 1.21499;
    const table_min_standing = (0.6005917 * height) / 2.54 + 0.02662722;
    const table_max_standing = (0.6656805 * height) / 2.54 - 1.044379;
    const monitor_min_standing = (0.9674556 * height) / 2.54 - 2.464497;
    const monitor_max_standing = (0.9349112 * height) / 2.54 + 1.071006;

    let ans1 = "";
    let ans2 = "";
    let ans3 = "";

    if (position === "0") {
      ans1 = `${Math.round(seat_min * unit * 2) / 2} - ${
        Math.round(seat_max * unit * 2) / 2
      }`;
      ans2 = `${Math.round(table_min * unit * 2) / 2} - ${
        Math.round(table_max * unit * 2) / 2
      }`;
      ans3 = `${Math.round(monitor_min * unit * 2) / 2} - ${
        Math.round(monitor_max * unit * 2) / 2
      }`;
    } else if (position === "1") {
      ans2 = `${Math.round(table_min_standing * unit * 2) / 2} - ${
        Math.round(table_max_standing * unit * 2) / 2
      }`;
      ans3 = `${Math.round(monitor_min_standing * unit * 2) / 2} - ${
        Math.round(monitor_max_standing * unit * 2) / 2
      }`;
    }

    return {
      tech_units: units,
      tech_position: position,
      tech_ans1: ans1,
      tech_ans2: ans2,
      tech_ans3: ans3,
    };
  }

  /**
   * getCalculationHouseAgeCalculator: Service Method
   * POST: /api/calculators-lol/house-age-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationHouseAgeCalculator(body) {
    let build_date = body.tech_build_date;
    let structure_type = body.tech_structure_type;

    const result = {};

    // Validate inputs
    if (!structure_type || !build_date) {
      result.error = "Please! Check Your Input";
      return result;
    }

    try {
      // Parse build date
      const date1 = new Date(build_date);
      const date2 = new Date();

      // Check if build date is in the past
      if (date1 >= date2) {
        result.error = "Please! Check Your Input";
        return result;
      }

      // Calculate age difference
      let years = date2.getFullYear() - date1.getFullYear();
      let months = date2.getMonth() - date1.getMonth();
      let days = date2.getDate() - date1.getDate();

      // Adjust for negative days
      if (days < 0) {
        months--;
        const prevMonth = new Date(date2.getFullYear(), date2.getMonth(), 0);
        days += prevMonth.getDate();
      }

      // Adjust for negative months
      if (months < 0) {
        years--;
        months += 12;
      }

      // Determine predicted age based on structure type
      let predicted_age;

      switch (structure_type) {
        case "concrete":
          predicted_age = "50-60";
          break;
        case "cement-bricks":
          predicted_age = "75-100";
          break;
        case "wooden":
          predicted_age = "100-150";
          break;
        case "stone":
          predicted_age = "150-200";
          break;
        default:
          result.error = "Invalid structure type";
          return result;
      }

      // Prepare result
      result.tech_predicted_age = predicted_age;
      result.tech_years = years;
      result.tech_months = months;
      result.tech_days = days;

      return result;
    } catch (error) {
      console.error("Error in house age calculator:", error);
      result.error = "Please! Check Your Input";
      return result;
    }
  }

  /**
   * getCalculationBirthdayCalculator: Service Method
   * POST: /api/calculators-lol/birthday-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationBirthdayCalculator(body) {
    let next_birth = body.tech_next_birth;

    const result = {};

    if (!next_birth) {
      result.error = "Please Select Your Date of Birth.";
      return result;
    }

    try {
      const dob = next_birth; // yyyy-mm-dd format expected
      const currentDate = new Date();

      // Parse DOB
      const dob2 = dob.split("-");
      const birth_month = dob2[1];

      // Create date objects for age calculation
      const bdayDate = new Date(dob2[0], dob2[1] - 1, dob2[2]);
      const today = new Date();

      // Check if DOB is valid (not in future)
      if (bdayDate >= today) {
        result.error = "Invalid Date of Birth.";
        return result;
      }

      // Calculate age (years, months, days)
      let age_years = today.getFullYear() - bdayDate.getFullYear();
      let age_months = today.getMonth() - bdayDate.getMonth();
      let age_days = today.getDate() - bdayDate.getDate();

      if (age_days < 0) {
        age_months--;
        const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        age_days += prevMonth.getDate();
      }

      if (age_months < 0) {
        age_years--;
        age_months += 12;
      }

      // Current date details
      const year = currentDate.getFullYear();
      const mon = currentDate.getMonth() + 1;
      const mday = currentDate.getDate();
      const hour = currentDate.getHours();
      const min = currentDate.getMinutes();
      const sec = currentDate.getSeconds();

      // Calculate timestamps
      const d1 =
        new Date(dob2[0], dob2[1] - 1, dob2[2], hour, min, sec).getTime() /
        1000;
      const d2 = new Date(year, mon - 1, mday, hour, min, sec).getTime() / 1000;
      const diffSeconds = d2 - d1;

      if (diffSeconds <= 0) {
        result.error = "Invalid Date of Birth.";
        return result;
      }

      // Calculate totals
      const Totalyears = Math.floor(diffSeconds / 31536000);
      const Total_months = Math.floor(diffSeconds / 2628000);
      const Total_weeks = Math.floor(diffSeconds / 604800);
      const Total_days = Math.floor(diffSeconds / 86400);
      const Total_hours = Math.floor(diffSeconds / 3600);
      const Total_minuts = Math.floor(diffSeconds / 60);
      const Total_seconds = diffSeconds;

      // Calculate which day of week birthdays fell on
      const totalDays = [0, 0, 0, 0, 0, 0, 0];
      const daysName = [];

      for (let i = 0; i < age_years; i++) {
        const birthdayThisYear = new Date(bdayDate);
        birthdayThisYear.setFullYear(bdayDate.getFullYear() + i);
        const dayOfWeek = birthdayThisYear.getDay();
        const dayName = birthdayThisYear.toLocaleDateString("en-US", {
          weekday: "long",
        });
        totalDays[dayOfWeek]++;
        daysName.push(dayName);
      }

      // Calculate next birthday
      let nextBirthdayYear = year;
      if (
        mon > parseInt(dob2[1]) ||
        (mon === parseInt(dob2[1]) && mday >= parseInt(dob2[2]))
      ) {
        nextBirthdayYear = year + 1;
      }

      const nextBirthdayDate = new Date(nextBirthdayYear, dob2[1] - 1, dob2[2]);
      const todayDate = new Date(year, mon - 1, mday);

      // Calculate days until next birthday
      const timeDiff = nextBirthdayDate - todayDate;
      const remDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

      // Calculate months and days until next birthday
      let next_r_mon = nextBirthdayDate.getMonth() - todayDate.getMonth();
      let next_r_day = nextBirthdayDate.getDate() - todayDate.getDate();

      if (next_r_day < 0) {
        next_r_mon--;
        const prevMonth = new Date(
          nextBirthdayDate.getFullYear(),
          nextBirthdayDate.getMonth(),
          0
        );
        next_r_day += prevMonth.getDate();
      }

      if (next_r_mon < 0) {
        next_r_mon += 12;
      }

      // Format next birthday
      const nextBirth = nextBirthdayDate.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const n_brdy_days_per = (remDays / 365) * 100;

      // Calculate half birthday (6 months after DOB)
      const halfBirthdayDate = new Date(bdayDate);
      halfBirthdayDate.setMonth(halfBirthdayDate.getMonth() + 6);

      let halfBirthdayYear = year;
      const halfMonth = halfBirthdayDate.getMonth() + 1;
      const halfDay = halfBirthdayDate.getDate();

      if (mon > halfMonth || (mon === halfMonth && mday >= halfDay)) {
        halfBirthdayYear = year + 1;
      }

      const nextHalfBirthdayDate = new Date(
        halfBirthdayYear,
        halfMonth - 1,
        halfDay
      );
      const half_brdy = nextHalfBirthdayDate.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const halfTimeDiff = nextHalfBirthdayDate - todayDate;
      const next_half_r_days = Math.floor(halfTimeDiff / (1000 * 60 * 60 * 24));
      const n_half_brdy_days = Math.round((next_half_r_days / 365) * 100);

      // Prepare result
      result.tech_Age = age_years;
      result.tech_Age_months = age_months;
      result.tech_Age_days = age_days;
      result.tech_birth_month = birth_month;
      result.tech_N_r_months = next_r_mon;
      result.tech_N_r_days = next_r_day;
      result.tech_Years = Totalyears;
      result.tech_Months = Total_months;
      result.tech_Weeks = Total_weeks;
      result.tech_Days = Total_days;
      result.tech_Hours = Total_hours;
      result.tech_Min = Total_minuts;
      result.tech_nextBirth = nextBirth;
      result.tech_remDays = remDays;
      result.tech_totalDays = totalDays;
      result.tech_daysName = daysName;
      result.tech_n_brdy_days_per = parseFloat(n_brdy_days_per.toFixed(2));
      result.tech_half_brdy = half_brdy;
      result.tech_next_half_r_days = next_half_r_days;
      result.tech_n_half_brdy_days = n_half_brdy_days;

      return result;
    } catch (error) {
      console.error("Error in birthday calculator:", error);
      result.error = "Please Select Your Date of Birth.";
      return result;
    }
  }

  /**
   * getCalculationHalfBirthdayCalculator: Service Method
   * POST: /api/calculators-lol/half-birthday-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationHalfBirthdayCalculator(body) {
    let day = body.tech_day;
    let month = body.tech_month;
    let year = body.tech_year;

    const result = {};

    // Validate and format DOB
    if (!day || !month || !year) {
      result.error = "Please! Check Your Input";
      return result;
    }

    try {
      // Format DOB as YYYY-MM-DD
      const dob = `${String(year).padStart(4, "0")}-${String(month).padStart(
        2,
        "0"
      )}-${String(day).padStart(2, "0")}`;
      const dobDate = new Date(year, month - 1, day);
      const currentDate = new Date();

      // Check if DOB is valid (not in future)
      if (dobDate > currentDate) {
        result.error = "Please! Check Your Input";
        return result;
      }

      // Current date details
      const current = {
        year: currentDate.getFullYear(),
        mon: currentDate.getMonth() + 1,
        mday: currentDate.getDate(),
      };

      // Calculate quarter and half birthdays
      const dobDateObj = new Date(dob);

      // First quarter (3 months)
      const first_q_date = new Date(dobDateObj);
      first_q_date.setMonth(first_q_date.getMonth() + 3);
      const Q1 = [
        first_q_date.getFullYear(),
        first_q_date.getMonth() + 1,
        first_q_date.getDate(),
      ];

      // Half birthday (6 months)
      const half_date = new Date(dobDateObj);
      half_date.setMonth(half_date.getMonth() + 6);
      const Q2 = [
        half_date.getFullYear(),
        half_date.getMonth() + 1,
        half_date.getDate(),
      ];

      // Third quarter (9 months)
      const third_q_date = new Date(dobDateObj);
      third_q_date.setMonth(third_q_date.getMonth() + 9);
      const Q3 = [
        third_q_date.getFullYear(),
        third_q_date.getMonth() + 1,
        third_q_date.getDate(),
      ];

      // Birthday
      const bday = [year, month, day];

      // Determine next occurrence years for each date
      let year_q1, mon_q1, day_q1;
      if (
        Q1[1] > current.mon ||
        (Q1[1] === current.mon && Q1[2] > current.mday)
      ) {
        year_q1 = current.year;
        mon_q1 = Q1[1];
        day_q1 = Q1[2];
      } else {
        year_q1 = current.year + 1;
        mon_q1 = Q1[1];
        day_q1 = Q1[2];
      }

      let year_q2, mon_q2, day_q2;
      if (
        Q2[1] > current.mon ||
        (Q2[1] === current.mon && Q2[2] > current.mday)
      ) {
        year_q2 = current.year;
        mon_q2 = Q2[1];
        day_q2 = Q2[2];
      } else {
        year_q2 = current.year + 1;
        mon_q2 = Q2[1];
        day_q2 = Q2[2];
      }

      let year_q3, mon_q3, day_q3;
      if (
        Q3[1] > current.mon ||
        (Q3[1] === current.mon && Q3[2] > current.mday)
      ) {
        year_q3 = current.year;
        mon_q3 = Q3[1];
        day_q3 = Q3[2];
      } else {
        year_q3 = current.year + 1;
        mon_q3 = Q3[1];
        day_q3 = Q3[2];
      }

      let bd_year, bd_mon, bd_day;
      if (
        bday[1] > current.mon ||
        (bday[1] === current.mon && bday[2] > current.mday)
      ) {
        bd_year = current.year;
        bd_mon = bday[1];
        bd_day = bday[2];
      } else {
        bd_year = current.year + 1;
        bd_mon = bday[1];
        bd_day = bday[2];
      }

      // Format dates
      const formatDate = (year, month, day) => {
        const date = new Date(year, month - 1, day);
        return date.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      };

      const next_bday = formatDate(bd_year, bd_mon, bd_day);
      const next_half = formatDate(year_q2, mon_q2, day_q2);
      const first_Q = formatDate(year_q1, mon_q1, day_q1);
      const third_Q = formatDate(year_q3, mon_q3, day_q3);

      // Calculate days until each date
      const today = new Date(current.year, current.mon - 1, current.mday);

      const nextHalfDate = new Date(year_q2, mon_q2 - 1, day_q2);
      const q1Date = new Date(year_q1, mon_q1 - 1, day_q1);
      const q3Date = new Date(year_q3, mon_q3 - 1, day_q3);

      const next_half_days = Math.floor(
        (nextHalfDate - today) / (1000 * 60 * 60 * 24)
      );
      const first_Q_days = Math.floor((q1Date - today) / (1000 * 60 * 60 * 24));
      const third_Q_days = Math.floor((q3Date - today) / (1000 * 60 * 60 * 24));

      const day_per = (next_half_days * 100) / 365;

      // Prepare result
      result.tech_next_half = next_half;
      result.tech_day_per = parseFloat(day_per.toFixed(2));
      result.tech_next_half_days = next_half_days;
      result.tech_first_Q = first_Q;
      result.tech_first_Q_days = first_Q_days;
      result.tech_third_Q = third_Q;
      result.tech_third_Q_days = third_Q_days;
      result.tech_next_bday = next_bday;

      return result;
    } catch (error) {
      console.error("Error in half birthday calculator:", error);
      result.error = "Please! Check Your Input";
      return result;
    }
  }

  /**
   * getCalculationRingSizeCalculator: Service Method
   * POST: /api/calculators-lol/ring-size-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationRingSizeCalculator(body) {
    let unit = body.tech_unit;
    let cd = body.tech_to_measure;
    let dia_mm = body.tech_d_o_r_mm;
    let dia_in = body.tech_d_o_r_in;
    let cir_mm = body.tech_c_o_f_mm;
    let cir_in = body.tech_c_o_f_in;

    const param = {};
    let ring_size, uk_au, us_ca, f, g, j, s;
    if (
      !isNaN(cir_mm) &&
      !isNaN(cir_in) &&
      !isNaN(dia_mm) &&
      !isNaN(dia_in) &&
      cd !== "" &&
      unit !== ""
    ) {
      const pie = 3.14159;

      if (cd === "d_o_r") {
        if (unit === "millimeters") {
          ring_size = Math.round(dia_mm * pie * 100) / 100;
        } else if (unit === "inches") {
          ring_size = Math.round(dia_in * pie * 100) / 100;
        }
      } else if (cd === "c_o_f") {
        if (unit === "millimeters") {
          ring_size = Math.round((cir_mm / pie) * 100) / 100;
        } else if (unit === "inches") {
          ring_size = Math.round((cir_in / pie) * 1000) / 1000;
        }
      }

      if (
        ring_size == 9.91 ||
        ring_size == 0.388 ||
        ring_size == 31.13 ||
        ring_size == 1.23
      ) {
        us_ca = "0000";
        uk_au = "-";
        f = "-";
        g = "-";
        j = "-";
        s = "-";
      } else if (
        ring_size == 10.72 ||
        ring_size == 0.442 ||
        ring_size == 33.68 ||
        ring_size == 1.39
      ) {
        us_ca = "00";
        uk_au = "-";
        f = "-";
        g = "-";
        j = "-";
        s = "-";
      } else if (
        ring_size == 11.53 ||
        ring_size == 0.454 ||
        ring_size == 36.22 ||
        ring_size == 1.43
      ) {
        us_ca = "0";
        uk_au = "-";
        f = "-";
        g = "-";
        j = "-";
        s = "-";
      } else if (
        ring_size == 11.95 ||
        ring_size == 0.474 ||
        ring_size == 37.54 ||
        ring_size == 1.49
      ) {
        us_ca = "1/2";
        uk_au = "A";
        f = "-";
        g = "-";
        j = "-";
        s = "-";
      } else if (
        ring_size == 12.18 ||
        ring_size == 0.482 ||
        ring_size == 38.26 ||
        ring_size == 1.51
      ) {
        us_ca = "3/4";
        uk_au = "A 1/2";
        f = "-";
        g = "-";
        j = "-";
        s = "-";
      } else if (
        ring_size == 12.37 ||
        ring_size == 0.487 ||
        ring_size == 38.86 ||
        ring_size == 1.53
      ) {
        us_ca = "1";
        uk_au = "B";
        f = "-";
        g = "-";
        j = "1";
        s = "-";
      } else if (
        ring_size == 12.6 ||
        ring_size == 0.496 ||
        ring_size == 39.58 ||
        ring_size == 1.56
      ) {
        us_ca = "1 1/4";
        uk_au = "B 1/2";
        f = "-";
        g = "-";
        j = "1";
        s = "-";
      } else if (
        ring_size == 12.78 ||
        ring_size == 0.503 ||
        ring_size == 40.15 ||
        ring_size == 1.58
      ) {
        us_ca = "1 1/2";
        uk_au = "C";
        f = "-";
        g = "-";
        j = "-";
        s = "-";
      } else if (
        ring_size == 13.0 ||
        ring_size == 0.512 ||
        ring_size == 40.84 ||
        ring_size == 1.61
      ) {
        us_ca = "1 3/4";
        uk_au = "C 1/2";
        f = "-";
        g = "-";
        j = "-";
        s = "-";
      } else if (
        ring_size == 13.21 ||
        ring_size == 0.52 ||
        ring_size == 41.5 ||
        ring_size == 1.63
      ) {
        us_ca = "2";
        uk_au = "D";
        f = "41 1/2";
        g = "13 1/2";
        j = "2";
        s = "1 1/2";
      } else if (
        ring_size == 13.41 ||
        ring_size == 0.528 ||
        ring_size == 42.13 ||
        ring_size == 1.66
      ) {
        us_ca = "2 1/4";
        uk_au = "D 1/2";
        f = "-";
        g = "-";
        j = "-";
        s = "-";
      } else if (
        ring_size == 13.61 ||
        ring_size == 0.536 ||
        ring_size == 42.76 ||
        ring_size == 1.68
      ) {
        us_ca = "2 1/2";
        uk_au = "E";
        f = "42 3/4";
        g = "13 3/4";
        j = "3";
        s = "2 3/4";
      } else if (
        ring_size == 13.83 ||
        ring_size == 0.544 ||
        ring_size == 43.45 ||
        ring_size == 1.71
      ) {
        us_ca = "2 3/4";
        uk_au = "E 1/2";
        f = "-";
        g = "-";
        j = "-";
        s = "-";
      } else if (
        ring_size == 14.05 ||
        ring_size == 0.553 ||
        ring_size == 44.14 ||
        ring_size == 1.74
      ) {
        us_ca = "3";
        uk_au = "F";
        f = "44";
        g = "14";
        j = "4";
        s = "4";
      } else if (
        ring_size == 14.15 ||
        ring_size == 0.557 ||
        ring_size == 44.45 ||
        ring_size == 1.75
      ) {
        us_ca = "3 1/8";
        uk_au = "F 1/2";
        f = "-";
        g = "-";
        j = "-";
        s = "-";
      } else if (
        ring_size == 14.25 ||
        ring_size == 0.561 ||
        ring_size == 44.77 ||
        ring_size == 1.76
      ) {
        us_ca = "3 1/4";
        uk_au = "F 3/4";
        f = "-";
        g = "-";
        j = "-";
        s = "-";
      } else if (
        ring_size == 14.36 ||
        ring_size == 0.565 ||
        ring_size == 45.11 ||
        ring_size == 1.77
      ) {
        us_ca = "3 1/2";
        uk_au = "G 1/4";
        f = "45 1/4";
        g = "-";
        j = "5";
        s = "5 1/4";
      } else if (
        ring_size == 14.45 ||
        ring_size == 0.569 ||
        ring_size == 45.4 ||
        ring_size == 1.79
      ) {
        us_ca = "3 3/4";
        uk_au = "H";
        f = "46 1/2";
        g = "-";
        j = "-";
        s = "6 1/2";
      } else if (
        ring_size == 14.56 ||
        ring_size == 0.573 ||
        ring_size == 45.74 ||
        ring_size == 1.8
      ) {
        us_ca = "4";
        uk_au = "H 1/2";
        f = "-";
        g = "15";
        j = "7";
        s = "-";
      } else if (
        ring_size == 14.65 ||
        ring_size == 0.577 ||
        ring_size == 46.02 ||
        ring_size == 1.81
      ) {
        us_ca = "4 1/4";
        uk_au = "I";
        f = "47 3/4";
        g = "-";
        j = "-";
        s = "7 3/4";
      } else if (
        ring_size == 14.86 ||
        ring_size == 0.585 ||
        ring_size == 46.68 ||
        ring_size == 1.84
      ) {
        us_ca = "4 1/2";
        uk_au = "I 1/2";
        f = "-";
        g = "15 1/4";
        j = "8";
        s = "-";
      } else if (
        ring_size == 15.04 ||
        ring_size == 0.592 ||
        ring_size == 47.25 ||
        ring_size == 1.86
      ) {
        us_ca = "4 5/8";
        uk_au = "J";
        f = "49";
        g = "15 1/2";
        s = "9";
        j = "-";
      } else if (
        ring_size == 15.27 ||
        ring_size == 0.601 ||
        ring_size == 47.97 ||
        ring_size == 1.89
      ) {
        us_ca = "5";
        uk_au = "J 1/2";
        f = "-";
        g = "15 3/4";
        s = "-";
        j = "9";
      } else if (
        ring_size == 15.4 ||
        ring_size == 0.606 ||
        ring_size == 48.38 ||
        ring_size == 1.9
      ) {
        us_ca = "5 1/8";
        uk_au = "K";
        f = "50";
        g = "-";
        s = "10";
        j = "-";
      } else if (
        ring_size == 15.53 ||
        ring_size == 0.611 ||
        ring_size == 48.79 ||
        ring_size == 1.92
      ) {
        us_ca = "4 3/4";
        uk_au = "J 1/4";
        f = "-";
        g = "-";
        s = "-";
        j = "-";
      } else if (
        ring_size == 15.7 ||
        ring_size == 0.618 ||
        ring_size == 49.32 ||
        ring_size == 1.94
      ) {
        us_ca = "3 3/8";
        uk_au = "G";
        f = "-";
        g = "14 1/2";
        s = "-";
        j = "-";
      } else if (
        ring_size == 15.8 ||
        ring_size == 0.622 ||
        ring_size == 49.64 ||
        ring_size == 1.95
      ) {
        us_ca = "5 3/8";
        uk_au = "K 1/2";
        f = "-";
        g = "10";
        s = "-";
        j = "-";
      } else if (
        ring_size == 15.9 ||
        ring_size == 0.626 ||
        ring_size == 49.95 ||
        ring_size == 1.97
      ) {
        us_ca = "5 1/4";
        uk_au = "K 1/4";
        f = "-";
        g = "-";
        s = "-";
        j = "-";
      } else if (
        ring_size == 16.0 ||
        ring_size == 0.63 ||
        ring_size == 50.27 ||
        ring_size == 1.98
      ) {
        us_ca = "5 3/8";
        uk_au = "K 1/2";
        f = "-";
        g = "-";
        s = "-";
        j = "10";
      } else if (
        ring_size == 16.1 ||
        ring_size == 0.634 ||
        ring_size == 50.58 ||
        ring_size == 1.99
      ) {
        us_ca = "5 1/2";
        uk_au = "L";
        f = "51 3/4";
        g = "16";
        s = "11 3/4";
        j = "-";
      } else if (
        ring_size == 16.3 ||
        ring_size == 0.642 ||
        ring_size == 51.21 ||
        ring_size == 2.02
      ) {
        us_ca = "5 3/4";
        uk_au = "L 1/4";
        f = "-";
        g = "-";
        s = "-";
        j = "-";
      } else if (
        ring_size == 16.41 ||
        ring_size == 0.646 ||
        ring_size == 51.55 ||
        ring_size == 2.03
      ) {
        us_ca = "5 7/8";
        uk_au = "L 1/2";
        f = "-";
        g = "-";
        s = "-";
        j = "-";
      } else if (
        ring_size == 16.51 ||
        ring_size == 0.65 ||
        ring_size == 51.87 ||
        ring_size == 2.04
      ) {
        us_ca = "6";
        uk_au = "M";
        f = "52 3/4";
        g = "16 1/2";
        s = "12 3/4";
        j = "12";
      } else if (
        ring_size == 16.71 ||
        ring_size == 0.658 ||
        ring_size == 51.5 ||
        ring_size == 2.07
      ) {
        us_ca = "6 1/4";
        uk_au = "M 1/2";
        f = "-";
        g = "-";
        s = "-";
        j = "-";
      } else if (
        ring_size == 16.92 ||
        ring_size == 0.666 ||
        ring_size == 53.16 ||
        ring_size == 2.09
      ) {
        us_ca = "6 1/2";
        uk_au = "N";
        f = "54";
        g = "17";
        s = "14";
        j = "13";
      } else if (
        ring_size == 17.13 ||
        ring_size == 0.674 ||
        ring_size == 53.82 ||
        ring_size == 2.12
      ) {
        us_ca = "6 3/4";
        uk_au = "N 1/2";
        f = "-";
        g = "-";
        s = "-";
        j = "-";
      } else if (
        ring_size == 17.35 ||
        ring_size == 0.683 ||
        ring_size == 54.51 ||
        ring_size == 2.15
      ) {
        us_ca = "7";
        uk_au = "O";
        f = "55 1/4";
        g = "17 1/4";
        s = "15 1/4";
        j = "14";
      } else if (
        ring_size == 17.45 ||
        ring_size == 0.687 ||
        ring_size == 54.82 ||
        ring_size == 2.16
      ) {
        us_ca = "7 1/4";
        uk_au = "O 1/2";
        f = "-";
        g = "-";
        s = "-";
        j = "-";
      } else if (
        ring_size == 17.75 ||
        ring_size == 0.699 ||
        ring_size == 55.76 ||
        ring_size == 2.2
      ) {
        us_ca = "7 1/2";
        uk_au = "P";
        f = "56 1/2";
        g = "17 3/4";
        s = "16 1/2";
        j = "15";
      } else if (
        ring_size == 17.97 ||
        ring_size == 0.707 ||
        ring_size == 56.45 ||
        ring_size == 2.22
      ) {
        us_ca = "7 3/4";
        uk_au = "P 1/2";
        f = "-";
        g = "-";
        s = "-";
        j = "-";
      } else if (
        ring_size == 18.19 ||
        ring_size == 0.716 ||
        ring_size == 57.15 ||
        ring_size == 2.25
      ) {
        us_ca = "8";
        uk_au = "Q";
        f = "57 3/4";
        g = "18";
        s = "17 3/4";
        j = "16";
      } else if (
        ring_size == 18.35 ||
        ring_size == 0.722 ||
        ring_size == 57.65 ||
        ring_size == 2.27
      ) {
        us_ca = "8 1/4";
        uk_au = "Q 1/2";
        f = "-";
        g = "-";
        s = "-";
        j = "-";
      } else if (
        ring_size == 18.53 ||
        ring_size == 0.729 ||
        ring_size == 58.21 ||
        ring_size == 2.29
      ) {
        us_ca = "8 1/2";
        uk_au = "Q 3/4";
        f = "-";
        g = "18 1/2";
        s = "-";
        j = "17";
      } else if (
        ring_size == 18.61 ||
        ring_size == 0.733 ||
        ring_size == 58.47 ||
        ring_size == 2.3
      ) {
        us_ca = "8 5/8";
        uk_au = "R";
        f = "59";
        g = "14 1/2";
        s = "19";
        j = "-";
      } else if (
        ring_size == 18.69 ||
        ring_size == 0.736 ||
        ring_size == 58.72 ||
        ring_size == 2.31
      ) {
        us_ca = "8 3/4";
        uk_au = "R 1/4";
        f = "-";
        g = "-";
        s = "-";
        j = "-";
      } else if (
        ring_size == 18.8 ||
        ring_size == 0.738 ||
        ring_size == 59.06 ||
        ring_size == 2.32
      ) {
        us_ca = "8 7/8";
        uk_au = "R 1/2";
        f = "-";
        g = "-";
        s = "-";
        j = "-";
      } else if (
        ring_size == 18.89 ||
        ring_size == 0.748 ||
        ring_size == 59.34 ||
        ring_size == 2.35
      ) {
        us_ca = "9";
        uk_au = "R 3/4";
        f = "-";
        g = "19";
        s = "-";
        j = "18";
      } else if (
        ring_size == 19.1 ||
        ring_size == 0.752 ||
        ring_size == 60.0 ||
        ring_size == 2.36
      ) {
        us_ca = "9 1/8";
        uk_au = "S";
        f = "60 1/4";
        g = "-";
        s = "20 1/4";
        j = "-";
      } else if (
        ring_size == 19.22 ||
        ring_size == 0.757 ||
        ring_size == 60.38 ||
        ring_size == 2.38
      ) {
        us_ca = "9 1/4";
        uk_au = "S 1/4";
        f = "-";
        g = "-";
        s = "-";
        j = "-";
      } else if (
        ring_size == 19.31 ||
        ring_size == 0.761 ||
        ring_size == 60.66 ||
        ring_size == 2.39
      ) {
        us_ca = "9 3/8";
        uk_au = "S 1/2";
        f = "-";
        g = "-";
        s = "-";
        j = "-";
      } else if (
        ring_size == 19.41 ||
        ring_size == 0.764 ||
        ring_size == 60.98 ||
        ring_size == 2.4
      ) {
        us_ca = "9 1/2";
        uk_au = "S 3/4";
        f = "-";
        g = "19 1/2";
        s = "-";
        j = "19";
      } else if (
        ring_size == 19.51 ||
        ring_size == 0.768 ||
        ring_size == 61.29 ||
        ring_size == 2.41
      ) {
        us_ca = "9 5/8";
        uk_au = "T";
        f = "61 1/2";
        g = "-";
        s = "21 1/2";
        j = "-";
      } else if (
        ring_size == 19.62 ||
        ring_size == 0.772 ||
        ring_size == 61.64 ||
        ring_size == 2.43
      ) {
        us_ca = "9 3/4";
        uk_au = "T 1/4";
        f = "-";
        g = "-";
        s = "-";
        j = "-";
      } else if (
        ring_size == 19.84 ||
        ring_size == 0.781 ||
        ring_size == 62.33 ||
        ring_size == 2.45
      ) {
        us_ca = "10";
        uk_au = "T 1/2";
        f = "-";
        g = "20";
        s = "-";
        j = "20";
      } else if (
        ring_size == 20.02 ||
        ring_size == 0.788 ||
        ring_size == 62.89 ||
        ring_size == 2.48
      ) {
        us_ca = "10 1/4";
        uk_au = "U";
        f = "62 3/4";
        g = "_";
        s = "22 3/4";
        j = "21";
      } else if (
        ring_size == 20.2 ||
        ring_size == 0.797 ||
        ring_size == 63.46 ||
        ring_size == 2.5
      ) {
        us_ca = "10 1/2";
        uk_au = "U 1/2";
        f = "-";
        g = "20 1/4";
        s = "-";
        j = "22";
      } else if (
        ring_size == 20.32 ||
        ring_size == 0.8 ||
        ring_size == 63.84 ||
        ring_size == 2.51
      ) {
        us_ca = "10 5/8";
        uk_au = "V";
        f = "63";
        g = "-";
        s = "23 3/4";
        j = "-";
      } else if (
        ring_size == 20.44 ||
        ring_size == 0.805 ||
        ring_size == 64.21 ||
        ring_size == 2.53
      ) {
        us_ca = "10 3/4";
        uk_au = "V 1/4";
        f = "-";
        g = "-";
        s = "-";
        j = "-";
      } else if (
        ring_size == 20.68 ||
        ring_size == 0.814 ||
        ring_size == 64.97 ||
        ring_size == 2.56
      ) {
        us_ca = "11";
        uk_au = "V 1/2";
        f = "-";
        g = "20 3/4";
        s = "-";
        j = "23";
      } else if (
        ring_size == 20.76 ||
        ring_size == 0.817 ||
        ring_size == 65.22 ||
        ring_size == 2.57
      ) {
        us_ca = "11 1/8";
        uk_au = "W";
        f = "65";
        g = "-";
        s = "25";
        j = "-";
      } else if (
        ring_size == 20.85 ||
        ring_size == 0.821 ||
        ring_size == 65.5 ||
        ring_size == 2.58
      ) {
        us_ca = "11 1/4";
        uk_au = "W 1/4";
        f = "-";
        g = "-";
        s = "-";
        j = "-";
      } else if (
        ring_size == 20.94 ||
        ring_size == 0.824 ||
        ring_size == 65.78 ||
        ring_size == 2.59
      ) {
        us_ca = "11 3/8";
        uk_au = "W 1/2";
        f = "-";
        g = "-";
        s = "-";
        j = "-";
      } else if (
        ring_size == 21.08 ||
        ring_size == 0.83 ||
        ring_size == 66.22 ||
        ring_size == 2.61
      ) {
        us_ca = "11 1/2";
        uk_au = "W 3/4";
        f = "-";
        g = "21";
        s = "-";
        j = "24";
      } else if (
        ring_size == 21.18 ||
        ring_size == 0.834 ||
        ring_size == 66.54 ||
        ring_size == 2.62
      ) {
        us_ca = "11 5/8";
        uk_au = "X";
        f = "66 1/4";
        g = "-";
        s = "26 1/4";
        j = "-";
      } else if (
        ring_size == 21.24 ||
        ring_size == 0.836 ||
        ring_size == 66.73 ||
        ring_size == 2.63
      ) {
        us_ca = "11 3/4";
        uk_au = "X 1/4";
        f = "-";
        g = "-";
        s = "-";
        j = "-";
      } else if (
        ring_size == 21.3 ||
        ring_size == 0.839 ||
        ring_size == 66.92 ||
        ring_size == 2.64
      ) {
        us_ca = "11 7/8";
        uk_au = "X 1/2";
        f = "-";
        g = "-";
        s = "-";
        j = "-";
      } else if (
        ring_size == 21.49 ||
        ring_size == 0.846 ||
        ring_size == 67.51 ||
        ring_size == 2.66
      ) {
        us_ca = "12";
        uk_au = "Y";
        f = "67 1/2";
        g = "21 1/4";
        s = "27 1/2";
        j = "25";
      } else if (
        ring_size == 21.69 ||
        ring_size == 0.854 ||
        ring_size == 68.14 ||
        ring_size == 2.68
      ) {
        us_ca = "12 1/4";
        uk_au = "Y 1/2";
        f = "-";
        g = "-";
        s = "-";
        j = "-";
      } else if (
        ring_size == 21.89 ||
        ring_size == 0.862 ||
        ring_size == 68.77 ||
        ring_size == 2.71
      ) {
        us_ca = "12 1/2";
        uk_au = "Z";
        f = "68 3/4";
        g = "21 3/4";
        s = "28 3/4";
        j = "26";
      } else if (
        ring_size == 22.1 ||
        ring_size == 0.869 ||
        ring_size == 69.43 ||
        ring_size == 2.73
      ) {
        us_ca = "12 3/4";
        uk_au = "Z +1/2";
        f = "-";
        g = "-";
        s = "-";
        j = "-";
      } else if (
        ring_size == 22.33 ||
        ring_size == 0.879 ||
        ring_size == 70.15 ||
        ring_size == 2.76
      ) {
        us_ca = "13";
        uk_au = "Z+1";
        f = "-";
        g = "22";
        s = "-";
        j = "27";
      } else if (
        ring_size == 22.6 ||
        ring_size == 0.891 ||
        ring_size == 71 ||
        ring_size == 2.8
      ) {
        us_ca = "13 1/2";
        uk_au = "Z + 1.5";
        f = "-";
        g = "-";
        s = "-";
        j = "-";
      }

      return {
        tech_ring_size: ring_size,
        tech_uk_au: uk_au,
        tech_us_ca: us_ca,
        tech_f: f,
        tech_g: g,
        tech_j: j,
        tech_s: s,
        tech_unit: unit,
      };
    } else {
      param.error = "Please check your input";
      return param;
    }
  }

  /**
   * getCalculationShoeSizeCalculator: Service Method
   * POST: /api/calculators-lol/shoe-size-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationShoeSizeCalculator(body) {
    const result = {};

    // Separate input variables from body
    let gen = (body.tech_gen || "").trim();
    let country = (body.tech_country || "").trim();
    let size = parseFloat(body.tech_size || 0);

    // Validate input
    if (!isNaN(size) && size >= 0) {
      let fcm, fin, us, uk, eu, ko, wo, m, mj;

      if (country === "fcm") {
        fcm = size;
      } else if (country === "fin") {
        fcm = size * 2.54;
      } else if (country === "ko") {
        fcm = size / 10;
      } else if (country === "mj") {
        fcm = size;
      } else if (country === "m") {
        fcm = size / 10;
      }

      if (gen === "ad") {
        if (country === "us") {
          fcm = (size + 24) * 0.847 - 2 * 0.847;
        } else if (country === "uk") {
          fcm = (size + 25) * 0.847 - 2 * 0.847;
        } else if (country === "eu") {
          fcm = size * 0.667 - 2 * 0.667;
        }

        fin = fcm / 2.54;
        us = (fcm + 2 * 0.847) / 0.847 - 24;
        ko = ((us + 22) / 3) * 25.5;
        wo = (fcm + 2 * 0.847) / 0.847 - 23;
        uk = fin * 3 - 23;
        eu = Math.floor(1.27 * (uk + 23 + 2));
        m = fcm * 10;
        mj = fcm;
      } else if (gen === "c") {
        if (country === "us") {
          fcm = ((size + 11.5 - 0.4) * 0.847) / 1.08;
        } else if (country === "uk") {
          fcm = ((size + 12 - 0.4) * 0.847) / 1.08;
        } else if (country === "eu") {
          fcm = (size * 0.667) / 1.08;
        }

        ko = fcm * 10;
        fin = fcm / 2.54;
        us = (fcm * 1.08) / 0.847 - 11.5 + 0.4;
        uk = (fcm * 1.08) / 0.847 - 12 + 0.4;
        eu = (fcm + 2 * 0.667) / 0.667;
        m = fcm * 10;
        mj = fcm;
        wo = "not yet";
      }

      result.tech_us = us;
      result.tech_fcm = fcm;
      result.tech_fin = fin;
      result.tech_uk = uk;
      result.tech_eu = eu;
      result.tech_ko = ko;
      result.tech_wo = wo;
      result.tech_m = m;
      result.tech_mj = mj;
      result.tech_country = country;
      result.tech_gen = gen;
    } else {
      result.error = "Please! Check Your Input";
    }

    return result;
  }

  /**
   * getCalculationTravelTimeCalculator: Service Method
   * POST: /api/calculators-lol/travel-time-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationTravelTimeCalculator(body) {
    let distance = body.tech_distance;
    let distance_unit = body.tech_distance_unit;
    let speed = body.tech_speed;
    let speed_unit = body.tech_speed_unit;
    let break_hrs = body.tech_break_hrs;
    let break_min = body.tech_break_min;
    let dep_time = body.tech_dep_time;
    let fule_effi = body.tech_fule_effi;
    let fule_effi_unit = body.tech_fule_effi_unit;
    let price = body.tech_price;
    let price_unit = body.tech_price_unit;
    let currancy = body.tech_currancy;
    let passenger = body.tech_passenger;

    const result = {};

    // Helper function: Convert distance to km
    function convert_to_km(unit, value) {
      if (unit == "mi") {
        return value * 1.609;
      } else {
        console.log(value);
        return value;
      }
    }
    // Helper function: Convert fuel efficiency to km/l
    function convert_to_kmpl(unit, value) {
      if (unit == "mpg") {
        return value / 2.352;
      } else {
        return value;
      }
    }

    // Validate inputs
    if (
      !distance ||
      !speed ||
      break_hrs === undefined ||
      break_min === undefined ||
      !fule_effi ||
      !price ||
      !passenger ||
      !dep_time
    ) {
      result.error = "Please! Check Your Input";
      return result;
    }

    // Check if all numeric values are valid
    if (
      isNaN(parseFloat(distance)) ||
      isNaN(parseFloat(speed)) ||
      isNaN(parseFloat(break_hrs)) ||
      isNaN(parseFloat(break_min)) ||
      isNaN(parseFloat(fule_effi)) ||
      isNaN(parseFloat(price)) ||
      isNaN(parseFloat(passenger))
    ) {
      result.error = "Please! Check Your Input";
      return result;
    }

    try {
      // Remove currency symbol from price_unit
      let price_unit_clean = price_unit
        ? price_unit.replace(currancy || "", "").trim()
        : "liter";

      // Convert values
      const distance_f = convert_to_km(distance_unit, parseFloat(distance));
      const fule_effi_f = convert_to_kmpl(
        fule_effi_unit,
        parseFloat(fule_effi)
      );
      const speed_f = convert_to_km(speed_unit, parseFloat(speed));
      // console.log(distance_f,fule_effi_f,speed_f);
      // Convert price to per liter if it's per gallon
      const price_f =
        price_unit_clean.includes("liter") || price_unit_clean.includes("litre")
          ? parseFloat(price)
          : parseFloat(price) / 3.785;

      // Calculate break time in hours
      const break_hr =
        (parseFloat(break_hrs) * 60 + parseFloat(break_min)) / 60;

      // Calculate travel time
      const travel_time = distance_f / speed_f + break_hr;
      const hours = Math.floor(travel_time);
      const mins = Math.round((travel_time - hours) * 60);

      // Parse departure time
      const depTime = new Date(dep_time);

      // Add hours and minutes to departure time
      const arrivalTime = new Date(depTime);
      arrivalTime.setHours(arrivalTime.getHours() + hours);
      arrivalTime.setMinutes(arrivalTime.getMinutes() + mins);

      // Format dates
      const formatDate = (date) => {
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        const month = monthNames[date.getMonth()];
        const day = String(date.getDate()).padStart(2, "0");
        const year = date.getFullYear();

        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12; // 0 should be 12
        const hoursStr = String(hours).padStart(2, "0");

        return `${month} ${day}, ${year} ${hoursStr}:${minutes}:${seconds} ${ampm}`;
      };

      const depature = formatDate(depTime);
      const arrival = formatDate(arrivalTime);

      // Calculate fuel requirements
      const fule_req = distance_f / fule_effi_f;
      const fule_price = fule_req * price_f;
      const per_person = fule_price / parseFloat(passenger);
      // console.log(fule_price,fule_req,price_f);
      // Format numbers
      const formatNumber = (num, decimals = 2) => {
        return num.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      };

      // Prepare result
      result.tech_hours = hours;
      result.tech_mins = mins;
      result.tech_depature = depature;
      result.tech_arrival = arrival;
      result.tech_fule_price = formatNumber(fule_price, 2);
      result.tech_per_person = formatNumber(per_person, 2);
      return result;
    } catch (error) {
      console.error("Error in travel time calculator:", error);
      result.error = "Please! Check Your Input";
      return result;
    }
  }

  /**
   * getCalculationSleepCalculator: Service Method
   * POST: /api/calculators-lol/sleep-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationSleepCalculator(body) {
    let h = body.tech_h;
    let stype = body.tech_stype;

    const result = {};

    if (stype == "bedtime") {
      // Bedtime calculation
      // Current date ke sath time combine karo
      const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
      const dateTimeString = `${today} ${h}`;

      const baseDate = new Date(dateTimeString);
      const timestamp =
        Math.floor(baseDate.getTime() / 1000) + (14 * 60 + 45) * 60;
      const timestamp2 = timestamp + 90 * 60;
      const timestamp3 = timestamp2 + 90 * 60;
      const timestamp4 = timestamp3 + 90 * 60;
      const timestamp5 = timestamp4 + 90 * 60;
      const timestamp6 = timestamp5 + 90 * 60;

      result.tech_time = this.formatTimesleep(timestamp);
      result.tech_time2 = this.formatTimesleep(timestamp2);
      result.tech_time3 = this.formatTimesleep(timestamp3);
      result.tech_time4 = this.formatTimesleep(timestamp4);
      result.tech_time5 = this.formatTimesleep(timestamp5);
      result.tech_time6 = this.formatTimesleep(timestamp6);
    } else if (stype == "wkup") {
      // Wake up calculation - current time se calculate karo
      const now = new Date();
      const currentTimestamp = Math.floor(now.getTime() / 1000);
      const timestamp = currentTimestamp + (465 + 90) * 60;
      const timestamp2 = timestamp - 90 * 60;
      const timestamp3 = timestamp2 - 90 * 60;
      const timestamp4 = timestamp3 - 90 * 60;
      const timestamp5 = timestamp4 - 90 * 60;
      const timestamp6 = timestamp5 - 90 * 60;

      result.tech_time = this.formatTimesleep(timestamp);
      result.tech_time2 = this.formatTimesleep(timestamp2);
      result.tech_time3 = this.formatTimesleep(timestamp3);
      result.tech_time4 = this.formatTimesleep(timestamp4);
      result.tech_time5 = this.formatTimesleep(timestamp5);
      result.tech_time6 = this.formatTimesleep(timestamp6);
    } else {
      result.error = "Please! Check Your Inputs";
      return result;
    }

    result.tech_stype = stype;
    return result;
  }

  formatTimesleep(timestamp) {
    const date = new Date(timestamp * 1000);

    let hours = date.getUTCHours() + 5; // Pakistan Standard Time (UTC+5)
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();

    // Handle day overflow
    if (hours >= 24) {
      hours -= 24;
    }

    const period = hours >= 12 ? "pm" : "am";
    const displayHours = hours % 12 || 12; // Convert to 12-hour format

    const pad = (num) => String(num).padStart(2, "0");

    return `${pad(displayHours)}:${pad(minutes)}:${pad(seconds)}${period}`;
  }

  /**
   * getCalculationPantSizeCalculator: Service Method
   * POST: /api/calculators-lol/pant-size-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationPantSizeCalculator(body) {
    let submit = body.tech_submit;
    let weist = body.tech_weist;
    let length = body.tech_length;
    let gender = body.tech_gender;
    let measure = body.tech_measure;
    let measure_in_weiat = body.tech_measure_in_weiat;
    let measure_in_length = body.tech_measure_in_length;

    const result = {};

    // Measure conversion
    let measureInWeist = measure_in_weiat;
    let measureInLength = measure_in_length;

    if (measure_in_weiat == "cm") {
      measureInWeist = "centimeter_weist";
    } else if (measure_in_weiat == "dm") {
      measureInWeist = "decimeter_weist";
    } else if (measure_in_weiat == "in") {
      measureInWeist = "inches_weist";
    }

    if (measure_in_length == "cm") {
      measureInLength = "centimeter_length";
    } else if (measure_in_length == "dm") {
      measureInLength = "decimeter_length";
    } else if (measure_in_length == "in") {
      measureInLength = "inches_length";
    }

    if (!submit) {
      result.error = "Please! Check Your Input";
      return result;
    }

    // Women's table values
    const waist_women = [
      25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
    ];
    const length_women = [
      32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32,
    ];
    const inda_women = [
      26, 26, 28, 28, 30, 30, 32, 32, 34, 34, 36, 36, 38, 38, 40,
    ];
    const usa_women = [
      "25/32, 0, or XXS",
      "26/32, 2, or XS",
      "27/32, 4, or XS",
      "28/32, 6, or S",
      "29/32, 8, or S",
      "30/32, 10, or M",
      "31/32, 12, or M",
      "32/32, 14, or L",
      "33/32, 16, or L",
      "34/32, 18, or XL",
      "35/32, 20, or XL",
      "36/32, 22, or XXL",
      "37/32, 24, or XXL",
      "38/32, 26, or XXXL",
      "39/32, 28, or XXXL",
    ];
    const uk_women = [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32];
    const eu_women = [
      32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60,
    ];
    const it_women = [
      36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64,
    ];
    const ru_women = [
      38,
      "38/40",
      40,
      "42/44",
      46,
      48,
      50,
      54,
      58,
      "60/62",
      64,
      "66/68",
      70,
      "Not Available",
      "Not Available",
    ];
    const ja_women = [
      7,
      "7/9",
      9,
      "9/11",
      11,
      "11/13",
      13,
      "13/15",
      "13/15",
      15,
      "15/17",
      17,
      "Not Available",
      "Not Available",
      "Not Available",
    ];

    // Men's table values
    const waist_men = [28, 29, 30, 32, 33, 34, 36, 38, 40, 42, 44];
    const length_men = [30, 30, 32, 32, 32, 32, 34, 34, 34, 34, 34];
    const inda_men = [28, 30, 30, 32, 34, 34, 36, 38, 40, 42, 44];
    const usa_men = [
      "28/30, 30, or XS",
      "29/30, 32, or XS",
      "30/32, 34, or S",
      "32/32, 36, or S",
      "33/32, 38, or M",
      "34/32, 40, or M",
      "36/34, 42, or L",
      "38/34, 44, or L",
      "40/34, 46, or XL",
      "42/34, 48, or XL",
      "44/34, 50, or XXL",
    ];
    const uk_men = [30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50];
    const eu_men = [40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60];
    const it_men = [30, 32, 34, 46, 48, 50, 52, 54, 56, 58, 60];

    if (!weist || !length) {
      result.error = "Please! Check Your Input";
      return result;
    }

    let waistValue = parseFloat(weist);
    let lengthValue = parseFloat(length);

    if (measure === "pair") {
      waistValue = waistValue * 2;
    }

    let result_weist = "";
    let result_length = "";
    let result_india = "";
    let result_us = "";
    let result_uk = "";
    let result_eu = "";
    let result_it = "";
    let result_ru = "";
    let result_ja = "";
    let check_length = false;
    let check_weist = false;

    // Women Portion
    if (gender == "female") {
      // Measure check waist
      if (measureInWeist == "centimeter_weist") {
        for (let i = 0; i < waist_women.length; i++) {
          waist_women[i] = waist_women[i] * 2.54;
        }
        if (waistValue < 7.5) {
          result.error = "Waist should be greater then 7.5";
          return result;
        } else {
          check_weist = true;
        }
      } else if (measureInWeist == "decimeter_weist") {
        for (let i = 0; i < waist_women.length; i++) {
          waist_women[i] = waist_women[i] * 0.254;
        }
        if (waistValue < 7.5) {
          result.error = "Waist should be greater then 7.5";
          return result;
        } else {
          check_weist = true;
        }
      } else if (measureInWeist == "inches_weist") {
        if (waistValue < 15) {
          result.error = "Waist should be greater then 15";
          return result;
        } else {
          check_weist = true;
        }
      }

      // Measure check length
      if (measureInLength == "centimeter_length") {
        for (let i = 0; i < length_women.length; i++) {
          length_women[i] = length_women[i] * 2.54;
        }
        if (lengthValue < 7.5) {
          result.error = "Length should be greater then 7.5";
          return result;
        } else {
          check_length = true;
        }
      } else if (measureInLength === "decimeter_length") {
        for (let i = 0; i < length_women.length; i++) {
          length_women[i] = length_women[i] * 0.254;
        }
        if (lengthValue < 7.5) {
          result.error = "Length should be greater then 7.5";
          return result;
        } else {
          check_length = true;
        }
      } else if (measureInLength == "inches_length") {
        if (lengthValue < 15) {
          result.error = "Length should be greater then 15";
          return result;
        } else {
          check_length = true;
        }
      }

      if (check_weist && check_length) {
        for (let i = 0; i < waist_women.length; i++) {
          if (
            waistValue === waist_women[i] &&
            lengthValue === length_women[i]
          ) {
            result_weist = i;
            result_length = i;
            break;
          } else if (
            waistValue < waist_women[i] &&
            lengthValue < length_women[i]
          ) {
            result_weist = i;
            result_length = i;
            break;
          } else if (waistValue > waist_women[i]) {
            if (lengthValue > length_women[i]) {
              result_weist = "";
              result_length = "";
            } else if (lengthValue < length_women[i]) {
              result_weist = "";
              result_length = "";
            }
          } else {
            if (lengthValue === length_women[i]) {
              result_weist = i;
              result_length = i;
              break;
            }
            if (lengthValue < length_women[i]) {
              result_weist = i;
              result_length = i;
              break;
            } else {
              result_weist = "";
              result_length = "";
              break;
            }
          }
        }

        if (
          typeof result_weist == "number" &&
          typeof result_length == "number"
        ) {
          result_india = inda_women[result_weist];
          result_us = usa_women[result_weist];
          result_uk = uk_women[result_weist];
          result_eu = eu_women[result_weist];
          result_it = it_women[result_weist];
          result_ru = ru_women[result_weist];
          result_ja = ja_women[result_weist];
        } else {
          result.error = "Please Enter Correct Values!";
          return result;
        }
      } else {
        result.error = "Please Enter Correct Values!";
        return result;
      }

      result.tech_result_india = result_india;
      result.tech_result_us = result_us;
      result.tech_result_uk = result_uk;
      result.tech_result_eu = result_eu;
      result.tech_result_it = result_it;
      result.tech_result_ru = result_ru;
      result.tech_result_ja = result_ja;
      return result;
    } else if (gender === "male") {
      // Measure check waist
      if (measureInWeist == "centimeter_weist") {
        for (let i = 0; i < waist_men.length; i++) {
          waist_men[i] = waist_men[i] * 2.54;
        }
        if (waistValue < 7.5) {
          result.error = "Waist should be greater then 7.5";
          return result;
        } else {
          check_weist = true;
        }
      } else if (measureInWeist == "decimeter_weist") {
        for (let i = 0; i < waist_men.length; i++) {
          waist_men[i] = waist_men[i] * 0.254;
        }
        if (waistValue < 7.5) {
          result.error = "Waist should be greater then 7.5";
          return result;
        } else {
          check_weist = true;
        }
      } else if (measureInWeist == "inches_weist") {
        if (waistValue < 15) {
          result.error = "Waist should be greater then 15";
          return result;
        } else {
          check_weist = true;
        }
      }

      // Measure check length
      if (measureInLength == "centimeter_length") {
        for (let i = 0; i < length_men.length; i++) {
          length_men[i] = length_men[i] * 2.54;
        }
        if (lengthValue < 7.5) {
          result.error = "Length should be greater then 7.5";
          return result;
        } else {
          check_length = true;
        }
      } else if (measureInLength == "decimeter_length") {
        for (let i = 0; i < length_men.length; i++) {
          length_men[i] = length_men[i] * 0.254;
        }
        if (lengthValue < 7.5) {
          result.error = "Length should be greater then 7.5";
          return result;
        } else {
          check_length = true;
        }
      } else if (measureInLength == "inches_length") {
        if (lengthValue < 15) {
          result.error = "Length should be greater then 15";
          return result;
        } else {
          check_length = true;
        }
      }

      if (check_weist && check_length) {
        for (let i = 0; i < waist_men.length; i++) {
          if (waistValue == waist_men[i] && lengthValue == length_men[i]) {
            result_weist = i;
            result_length = i;
            break;
          } else if (waistValue < waist_men[i] && lengthValue < length_men[i]) {
            result_weist = i;
            result_length = i;
            break;
          } else if (waistValue > waist_men[i]) {
            if (lengthValue > length_men[i]) {
              result_weist = "";
              result_length = "";
            } else if (lengthValue < length_men[i]) {
              result_weist = "";
              result_length = "";
            }
          } else {
            if (lengthValue === length_men[i]) {
              result_weist = i;
              result_length = i;
              break;
            }
            if (lengthValue < length_men[i]) {
              result_weist = i;
              result_length = i;
              break;
            } else {
              result_weist = "";
              result_length = "";
              break;
            }
          }
        }

        if (
          typeof result_weist == "number" &&
          typeof result_length == "number"
        ) {
          result_india = inda_men[result_weist];
          result_us = usa_men[result_weist];
          result_uk = uk_men[result_weist];
          result_eu = eu_men[result_weist];
          result_it = it_men[result_weist];
        } else {
          result.error = "Please Enter Correct Values!";
          return result;
        }
      } else {
        result.error = "Please Enter Correct Values!";
        return result;
      }

      result.tech_result_india = result_india;
      result.tech_result_us = result_us;
      result.tech_result_uk = result_uk;
      result.tech_result_eu = result_eu;
      result.tech_result_it = result_it;
      result.tech_result_ru = result_ru;
      result.tech_result_ja = result_ja;
      return result;
    } else {
      result.error = "Please! Check Your Input";
      return result;
    }
  }

  /**
   * getCalculationCurtainSizeCalculator: Service Method
   * POST: /api/calculators-lol/curtain-size-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationCurtainSizeCalculator(body) {
    let type_curtain = (body.tech_type_curtain || "").trim();
    let fullness = (body.tech_fullness || "").trim();
    let w_height = parseFloat(body.tech_w_height);
    let w_width = parseFloat(body.tech_w_width);
    let wh_units = (body.tech_wh_units || "").trim();
    let ww_units = (body.tech_ww_units || "").trim();

    let result = {};

    if (!type_curtain) {
      result.error = "Please! Check Your Inputs";
      return result;
    }

    if (!isFinite(w_height) || !isFinite(w_width)) {
      result.error = "Please! Check Your Inputs";
      return result;
    }

    // Convert height units to inches
    if (wh_units === "mm") {
      w_height = w_height * 25.4;
    } else if (wh_units === "cm") {
      w_height = w_height * 2.54;
    } else if (wh_units === "m") {
      w_height = w_height / 39.37;
    } else if (wh_units === "ft") {
      w_height = w_height / 12;
      console.log(w_height);
    } else if (wh_units === "yd") {
      w_height = w_height / 36;
    }

    // Convert width units to inches
    if (ww_units === "mm") {
      w_width = w_width * 25.4;
    } else if (ww_units === "cm") {
      w_width = w_width * 2.54;
    } else if (ww_units === "m") {
      w_width = w_width / 39.37;
    } else if (ww_units === "ft") {
      w_width = w_width / 12;
    } else if (ww_units === "yd") {
      w_width = w_width / 36;
    }

    let c_lenght = 0;
    if (type_curtain === "sill_lenght") {
      c_lenght = w_height + 4;
    } else if (type_curtain === "cafe_length") {
      c_lenght = w_height / 2;
    } else if (type_curtain === "extra_long") {
      c_lenght = w_height + 4 + 6;
    }

    let c_width = 0;
    if (fullness === "std_full") {
      c_width = w_width * 2;
    } else if (fullness === "del_full") {
      c_width = w_width * 2.5;
    } else if (fullness === "ult_full") {
      c_width = w_width * 3;
    }

    result.tech_type_curtain = type_curtain;
    result.tech_w_height = w_height;
    result.tech_w_width = w_width;
    result.tech_c_lenght = c_lenght;
    result.tech_c_width = c_width;
    return result;
  }

  /**
   * getCalculationTeslaChargingCalculator: Service Method
   * POST: /api/calculators-lol/tesla-charging-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationTeslaChargingCalculator(body) {
    let main_unit = (body.tech_main_unit || "").trim();
    let battery = parseFloat(body.tech_battery);
    let electricity = parseFloat(body.tech_electricity);
    let type = (body.tech_type || "").trim();
    let price = parseFloat(body.tech_price);
    let distance = parseFloat(body.tech_distance);
    let units = (body.tech_units || "").trim();

    let result = {};

    if (main_unit === "Full Capacity Charging Cost") {
      if (isFinite(battery) && isFinite(electricity)) {
        let cost = battery * electricity;
        result.tech_cost = cost;
      } else {
        result.error = "Please! Check Your Inputs";
        return result;
      }
    } else if (main_unit === "Custom Distance Charging Cost") {
      const Model = {
        1: { name: "Tesla Model S (2013 - 60D)", capacity: 60, efficiency: 35 },
        2: { name: "Tesla Model S (2016 - 60D)", capacity: 62, efficiency: 32 },
        3: {
          name: "Tesla Model S (2017 - 100D)",
          capacity: 95,
          efficiency: 33,
        },
        4: { name: "Tesla Model 3 (2019)", capacity: 54, efficiency: 26 },
        5: { name: "Tesla Model 3 (2021)", capacity: 82, efficiency: 29 },
        6: { name: "Tesla Model X (2016 - 90D)", capacity: 90, efficiency: 34 },
        7: {
          name: "Tesla Model X (2016 - P100D)",
          capacity: 100,
          efficiency: 38,
        },
        8: { name: "Tesla Model Y (2021)", capacity: 75, efficiency: 24 },
        9: { name: "Chevrolet Bolt (2016)", capacity: 60, efficiency: 20.8 },
        10: { name: "Audi Q4 e-tron 50 quattro", capacity: 77, efficiency: 32 },
        11: { name: "Nissan Leaf", capacity: 36, efficiency: 28 },
        12: {
          name: "Hyundai IONIQ Electric",
          capacity: 38.3,
          efficiency: 24.5,
        },
        13: { name: "Citroen e-C4", capacity: 45, efficiency: 29 },
        14: { name: "Kia EV6", capacity: 58, efficiency: 26.5 },
        15: { name: "Kia Soul EV", capacity: 64, efficiency: 28 },
        16: { name: "BMW i3", capacity: 37.9, efficiency: 26 },
        17: { name: "BMW i4", capacity: 80, efficiency: 29 },
        18: { name: "Fiat 500e", capacity: 42, efficiency: 27.5 },
        19: { name: "Hyundai Kona Electric", capacity: 64, efficiency: 26 },
      };

      if (!type || !Model[type]) {
        result.error = "Please! Check Your Inputs";
        return result;
      }

      if (!isFinite(price) || !isFinite(distance)) {
        result.error = "Please! Check Your Inputs";
        return result;
      }

      let model = Model[type];
      let name = model.name;
      let capacity = model.capacity;
      let efficiency = model.efficiency;

      if (units === "mi") {
        distance = distance * 1.609; // Convert miles to km
      }

      efficiency = efficiency * 0.621; // Convert km/kw to mi/kw

      let cost = price * capacity;
      let res = price * distance * efficiency;
      let ec = res / 100;

      result.tech_name = name;
      result.tech_capacity = capacity;
      result.tech_efficiency = efficiency;
      result.tech_cost = cost;
      result.tech_ec = ec;
    } else {
      result.error = "Please! Check Your Inputs";
      return result;
    }
    return result;
  }

  /**
   * getCalculationCompressionHightCalculator: Service Method
   * POST: /api/calculators-lol/compression-height-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationCompressionHightCalculator(body) {
    let height = parseFloat(body.tech_height);
    let height_unit = (body.tech_height_unit || "").trim();
    let stone = parseFloat(body.tech_stone);
    let stone_unit = (body.tech_stone_unit || "").trim();
    let length = parseFloat(body.tech_length);
    let length_unit = (body.tech_length_unit || "").trim();
    let deck = parseFloat(body.tech_deck);
    let deck_unit = (body.tech_deck_unit || "").trim();

    function unitIn(value, unit) {
      return unit === "in" ? value : value * 39.37;
    }

    let result = {};

    if (
      isFinite(height) &&
      isFinite(stone) &&
      isFinite(length) &&
      isFinite(deck)
    ) {
      height = unitIn(height, height_unit);
      length = unitIn(length, length_unit);
      stone = unitIn(stone, stone_unit);
      deck = unitIn(deck, deck_unit);

      let compression_val = height - 0.5 * stone - length - deck;
      let compression_val_m = compression_val / 39.37;

      result.tech_compression_val = compression_val;
      result.tech_compression_val_m = compression_val_m;
    } else {
      result.error = "Please! Check Your Inputs";
      return result;
    }

    return result;
  }

  /**
   * getCalculationFuelCostCalculator: Service Method
   * POST: /api/calculators-lol/fuel-cost-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationFuelCostCalculator(body) {
    let distance = parseFloat(body.tech_distance);
    let d_units = (body.tech_d_units || "").trim();
    let f_efficiency = parseFloat(body.tech_f_efficiency);
    let f_eff_units = (body.tech_f_eff_units || "").trim();
    let f_price = parseFloat(body.tech_f_price);
    let f_p_units = (body.tech_f_p_units || "").trim();
    let currency = (body.tech_currancy || "").trim();

    let result = {};

    // Clean up currency from price unit (e.g., "$/L" -> "/L")
    f_p_units = f_p_units.replace(currency, "");

    if (isFinite(distance) && isFinite(f_efficiency) && isFinite(f_price)) {
      // Convert distance to kilometers if in miles
      if (d_units === "mi") {
        distance *= 1.6093;
      }

      // Convert fuel efficiency to km per liter
      if (f_eff_units === "L/100km") {
        f_efficiency = 100 / f_efficiency;
      } else if (f_eff_units === "US mpg") {
        f_efficiency = f_efficiency * 0.425144;
      } else if (f_eff_units === "UK mpg") {
        f_efficiency = f_efficiency * 0.354006;
      } else if (f_eff_units === "lpm") {
        f_efficiency = (1 / f_efficiency) * 1.6093;
      }

      // Convert fuel price to per liter
      if (f_p_units === "/cl") {
        f_price = f_price * 100;
      } else if (f_p_units === "/US gal") {
        f_price = f_price * 0.26;
      } else if (f_p_units === "/UK gal") {
        f_price = f_price * 0.22;
      }

      let fuel = distance / f_efficiency;
      let trip_cost = fuel * f_price;

      result.tech_distance = distance;
      result.tech_f_efficiency = f_efficiency;
      result.tech_f_eff_units = f_eff_units;
      result.tech_f_p_units = f_p_units;
      result.tech_f_price = f_price;
      result.tech_fuel = fuel;
      result.tech_trip_cost = trip_cost;
    } else {
      result.error = "Please! Check Your Inputs";
    }

    return result;
  }

  /**
   * getCalculationLawnMowingCostCalculator: Service Method
   * POST: /api/calculators-lol/lawn-mowing-cost-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationLawnMowingCostCalculator(body) {
    let type = (body.tech_type || "").trim();
    let charges = (body.tech_charges || "").trim();
    let mow_price = parseFloat(body.tech_mow_price);
    let m_p_units = (body.tech_m_p_units || "").trim();
    let currancy = (body.tech_currancy || "").trim();
    let area_mow = parseFloat(body.tech_area_mow);
    let a_m_units = (body.tech_a_m_units || "").trim();
    let hours_work = parseFloat(body.tech_hours_work);
    let mow_speed = parseFloat(body.tech_mow_speed);
    let mow_speed_units = (body.tech_mow_speed_units || "").trim();
    let mow_width = parseFloat(body.tech_mow_width);
    let mow_width_units = (body.tech_mow_width_units || "").trim();
    let mow_pro = parseFloat(body.tech_mow_pro);
    let to_mow = parseFloat(body.tech_to_mow);
    let to_mow_units = (body.tech_to_mow_units || "").trim();

    m_p_units = m_p_units.replace(currancy + " ", "");

    let result = {};

    function perAreaUnit(input, unit) {
      if (unit === "m²") input = input / 1000000;
      else if (unit === "ft²") input = input / 10760000;
      else if (unit === "yd²") input = input / 1196000;
      else if (unit === "a") input = input * 0.0001;
      else if (unit === "da") input = input * 0.001;
      else if (unit === "ha") input = input / 100;
      else if (unit === "ac") input = input / 247.1;
      return input;
    }

    if (type === "lawn_mowed") {
      if (charges === "area") {
        if (isFinite(mow_price) && isFinite(area_mow)) {
          if (m_p_units) mow_price = perAreaUnit(mow_price, m_p_units);
          if (a_m_units) area_mow = perAreaUnit(area_mow, a_m_units);
          let total_cost = mow_price * area_mow;

          result.tech_mow_price = mow_price;
          result.tech_area_mow = area_mow;
          result.tech_total_cost = total_cost;
        } else {
          return { error: "Please! Check Your Input" };
        }
      } else if (charges === "hour") {
        if (isFinite(mow_price) && isFinite(hours_work)) {
          let total_cost = mow_price * hours_work;
          result.tech_mow_price = mow_price;
          result.tech_hours_work = hours_work;
          result.tech_total_cost = total_cost;
        } else {
          return { error: "Please! Check Your Input" };
        }
      }

      result.charges = charges;
    } else if (type === "mowing_time") {
      if (isFinite(mow_speed) && isFinite(mow_width) && isFinite(mow_pro)) {
        if (mow_speed_units === "m/h") {
          mow_speed /= 1000;
        } else if (mow_speed_units === "ft/h") {
          mow_speed /= 3281;
        }

        if (mow_width_units === "cm") {
          mow_width /= 100000;
        } else if (mow_width_units === "m") {
          mow_width /= 1000;
        } else if (mow_width_units === "in") {
          mow_width /= 39370;
        } else if (mow_width_units === "ft") {
          mow_width /= 3281;
        }

        let res = mow_speed * mow_width;
        let per = mow_pro / 100;
        let m_cost = res * per;

        result.tech_mow_speed = mow_speed;
        result.tech_mow_width = mow_width;
        result.tech_mow_pro = mow_pro;
        result.tech_m_cost = m_cost;

        if (!isNaN(to_mow)) {
          if (to_mow_units) {
            to_mow = perAreaUnit(to_mow, to_mow_units);
          }
          let m_time = to_mow / m_cost;
          let hours = Math.floor(m_time);
          let minutes = Math.floor((m_time - hours) * 60);
          result.tech_to_mow = to_mow;
          result.tech_hours = hours;
          result.tech_minutes = minutes;
        }
      } else {
        return { error: "Please! Check Your Input" };
      }
    }

    result.tech_type = type;
    return result;
  }

  /**
   * getCalculationTvSizeCalculator: Service Method
   * POST: /api/calculators-lol/tv-size-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationTvSizeCalculator(body) {
    let selection = body.tech_selection;
    let size = body.tech_size;
    let size_unit = body.tech_size_unit;
    let resolution = body.tech_resolution;
    let angle = body.tech_angle;
    let angle_unit = body.tech_angle_unit;
    let distance = body.tech_distance;
    let distance_unit = body.tech_distance_unit;

    // Helper function to get total vertical pixels from resolution keyword
    function getPixelValue(resolution) {
      const pixelMap = {
        "480p": 480,
        "720p": 720,
        "1080p": 1080,
        ultra_hd: 2160,
        "4k": 2160,
        "8k": 4320,
      };
      return pixelMap[resolution] || 0;
    }

    // Helper to round to significant figures
    function sigFig(value, digits) {
      if (value !== "") {
        if (value === 0) return parseFloat(value.toFixed(digits - 1));
        let decimalPlaces =
          digits - Math.floor(Math.log10(Math.abs(value))) - 1;
        decimalPlaces = Math.max(decimalPlaces, 0); // Prevent negative decimals
        return parseFloat(value.toFixed(decimalPlaces));
      }
      return "";
    }

    let param = {};

    // Parse input numbers
    let sizeFloat = parseFloat(size);
    let distanceFloat = parseFloat(distance);
    let angleFloat = parseFloat(angle);

    // Output variables
    let width, height, pixels, new_angle, md, unit;
    let md_cm,
      md_m,
      md_ft,
      od = "",
      od_cm = "",
      od_m = "",
      od_ft = "";

    if (selection === "size") {
      // If calculating from screen size
      if (!isNaN(sizeFloat) && size_unit && resolution) {
        // Convert input size to inches
        if (size_unit === "cm") sizeFloat /= 2.54;
        else if (size_unit === "m") sizeFloat /= 0.0254;
        else if (size_unit === "ft") sizeFloat /= 0.08333;

        width = (16 / Math.sqrt(16 ** 2 + 9 ** 2)) * sizeFloat;
        height = sizeFloat * 0.49;

        pixels = (16 / 9) * getPixelValue(resolution);
        new_angle = pixels / 60;

        md = width / (2 * Math.tan((new_angle / 2) * (Math.PI / 180)));
        unit = size_unit;

        md_cm = md * 2.54;
        md_m = md * 0.0254;
        md_ft = md * 0.08333;
      } else {
        return { error: "Please! Check Your Input" };
      }
    } else if (selection === "distance") {
      // If calculating from distance
      if (!isNaN(distanceFloat) && distance_unit && resolution) {
        const jugaadValues = {
          "480p": 0.28616,
          "720p": 0.4322,
          "1080p": 0.658,
          ultra_hd: 1.434,
          "4k": 1.5556,
          "8k": 4.705,
        };
        const jugaad = jugaadValues[resolution];
        if (!jugaad) return { error: "Unsupported resolution" };

        pixels = (16 / 9) * getPixelValue(resolution);
        new_angle = pixels / 60;

        width =
          distanceFloat * (2 * Math.tan((new_angle / 2) * (Math.PI / 180)));
        width = width / 0.08333;

        sizeFloat = distanceFloat * jugaad;
        sizeFloat = sizeFloat / 0.08333;

        height = sizeFloat * 0.49;
        md = distanceFloat;
        unit = distance_unit;

        md_cm = md * 30.5;
        md_m = md * 0.305;
        md_ft = md;
        md = md * 12;
      } else {
        return { error: "Please! Check Your Input" };
      }
    } else {
      return { error: "Please! Check Your Input" };
    }

    // Calculate optimal viewing distance based on visual angle
    if (!isNaN(angleFloat) && angle_unit) {
      let angleRad =
        angle_unit === "deg" ? angleFloat * (Math.PI / 180) : angleFloat;
      if (angleRad > Math.PI) {
        return {
          error:
            "Flat screens have a 180° field of vision; you can't see beyond that angle (unless your nose is touching it 😉).",
        };
      }

      let tanVal = Math.tan(angleRad / 2);
      od = (0.5 * width) / tanVal;

      od_cm = od * 2.54;
      od_m = od * 0.0254;
      od_ft = od * 0.08333;
    }

    // Unit conversions
    let size_cm = sizeFloat * 2.54;
    let size_m = sizeFloat * 0.0254;
    let size_ft = sizeFloat * 0.08333;

    let width_cm = width * 2.54;
    let width_m = width * 0.0254;
    let width_ft = width * 0.08333;

    let height_cm = height * 2.54;
    let height_m = height * 0.0254;
    let height_ft = height * 0.08333;

    // Final formatted answer
    const ans = [
      sigFig(sizeFloat, 4),
      sigFig(width, 4),
      sigFig(height, 4),
      sigFig(od_ft, 3),
      sigFig(md_ft, 3),
    ];

    return {
      tech_ans: ans,
      tech_unit: unit,
      tech_units_cm: [
        sigFig(size_cm, 4),
        sigFig(width_cm, 4),
        sigFig(height_cm, 4),
        sigFig(od_cm, 3),
        sigFig(md_cm, 3),
      ],
      tech_units_m: [
        sigFig(size_m, 4),
        sigFig(width_m, 4),
        sigFig(height_m, 4),
        sigFig(od_m, 3),
        sigFig(md_m, 3),
      ],
      tech_units_in: [
        sigFig(sizeFloat, 4),
        sigFig(width, 4),
        sigFig(height, 4),
        sigFig(od, 3),
        sigFig(md, 3),
      ],
      tech_units_ft: [
        sigFig(size_ft, 4),
        sigFig(width_ft, 4),
        sigFig(height_ft, 4),
        sigFig(od_ft, 3),
        sigFig(md_ft, 3),
      ],
    };
  }

  /**
   * getCalculationRiverRockCalculator: Service Method
   * POST: /api/calculators-lol/river-rock-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationRiverRockCalculator(body) {
    let rock_type = body.tech_rock_type;
    let density = body.tech_density;
    let density_unit = body.tech_density_unit;
    let length = body.tech_length;
    let length_unit = body.tech_length_unit;
    let width = body.tech_width;
    let width_unit = body.tech_width_unit;
    let depth = body.tech_depth;
    let depth_unit = body.tech_depth_unit;
    let wastage = body.tech_wastage;
    let price = body.tech_price;
    let price_unit = body.tech_price_unit;
    let currancy = body.tech_currancy;

    price_unit = price_unit.replace(currancy, "");

    function sigFig(value, digits) {
      if (value !== "") {
        if (value === 0) {
          return Number(value.toFixed(digits - 1));
        }
        let decimalPlaces =
          digits - Math.floor(Math.log10(Math.abs(value))) - 1;
        return Number(value.toFixed(Math.max(0, decimalPlaces)));
      }
    }

    if (
      !isNaN(length) &&
      length_unit &&
      !isNaN(width) &&
      width_unit &&
      !isNaN(depth) &&
      depth_unit &&
      !isNaN(density)
    ) {
      length = parseFloat(length);
      width = parseFloat(width);
      depth = parseFloat(depth);
      density = parseFloat(density);
      wastage = parseFloat(wastage || 0);
      price = parseFloat(price || 0);

      // Unit conversions
      const unitMap = {
        mm: 1000,
        cm: 100,
        in: 39.3701,
        ft: 3.28084,
        yd: 1.093613,
      };

      if (unitMap[length_unit]) length = length / unitMap[length_unit];
      if (unitMap[width_unit]) width = width / unitMap[width_unit];
      if (unitMap[depth_unit]) depth = depth / unitMap[depth_unit];

      const densityConversions = {
        t_m3: 1 / 0.001,
        g_cm3: 1 / 0.001,
        lb_cu_in: 1 / 0.0000361273,
        lb_cu_ft: 1 / 0.062428,
        lb_cu_yd: 1 / 1.685555,
      };

      if (densityConversions[density_unit])
        density = density * densityConversions[density_unit];

      const area = width * length;
      const volume = area * depth * (1 + wastage / 100);
      let weight = volume * density * 0.001;

      let price_v = 0;
      let total_cost = 0;
      let price_v_units = [];

      if (!isNaN(price) && price_unit) {
        const priceConversions = {
          "/kg": 1000,
          "/lb": 2204.62,
          "/stone": 157.47,
          "/us_ton": 1.1,
          "/long_ton": 0.98,
        };
        if (priceConversions[price_unit])
          price = price * priceConversions[price_unit];

        price_v = (price * density) / 1000;
        total_cost = price * weight;

        price_v_units = [
          `${sigFig(price_v / 1000000, 3)}@@@cm³`,
          `${sigFig(price_v / 61023.74, 3)}@@@cu in`,
          `${sigFig(price_v * 0.03, 3)}@@@cu ft`,
          `${sigFig(price_v * 0.76, 3)}@@@cu yd`,
        ];
      }

      const volume_units = [
        `${sigFig(volume * 1000000, 3)}@@@cm³`,
        `${sigFig(volume * 61024, 3)}@@@cu in`,
        `${sigFig(volume * 35.3, 3)}@@@cu ft`,
        `${sigFig(volume * 1.308, 3)}@@@cu yd`,
      ];

      const weight_units = [
        `${sigFig(weight * 1000, 3)}@@@kg`,
        `${sigFig(weight * 2205, 3)}@@@lb`,
        `${sigFig(weight * 157.5, 3)}@@@stone`,
        `${sigFig(weight * 1.102, 3)}@@@US ton`,
        `${sigFig(weight * 0.984, 3)}@@@Long ton`,
      ];

      const area_units = [
        `${sigFig(area * 10000, 3)}@@@cm²`,
        `${sigFig(area * 0.000001, 3)}@@@km²`,
        `${sigFig(area * 1550, 3)}@@@in²`,
        `${sigFig(area * 10.76, 3)}@@@ft²`,
        `${sigFig(area * 1.196, 3)}@@@yd²`,
        `${sigFig(area * 0.000000386, 3)}@@@mi²`,
      ];

      return {
        tech_volume: sigFig(volume, 3),
        tech_volume_units: volume_units,
        tech_weight: sigFig(weight, 3),
        tech_weight_units: weight_units,
        tech_area: sigFig(area, 3),
        tech_area_units: area_units,
        tech_price_v: sigFig(price_v, 3),
        tech_price_v_units: price_v_units,
        tech_total_cost: sigFig(total_cost, 3),
      };
    } else {
      return { error: "Please! Check Your Inputs" };
    }
  }

  /**
   * getCalculationCircleSkirtCalculator: Service Method
   * POST: /api/calculators-lol/circle-skirt-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationCircleSkirtCalculator(body) {
    let type = body.tech_type;
    let length = body.tech_length;
    let length_unit = body.tech_length_unit;
    let waist = body.tech_waist;
    let waist_unit = body.tech_waist_unit;

    function convertToCm(value, unit) {
      switch (unit) {
        case "mm":
          return value * 0.1; // Millimeters to centimeters
        case "cm":
          return value; // Centimeters to centimeters
        case "m":
          return value * 100; // Meters to centimeters
        case "in":
          return value * 2.54; // Inches to centimeters
        case "ft":
          return value * 30.48; // Feet to centimeters
        default:
          return null; // Invalid unit
      }
    }

    if (!isNaN(length) && !isNaN(waist) && type) {
      length = parseFloat(length);
      waist = parseFloat(waist);

      let length_cm = convertToCm(length, length_unit);
      let waist_cm = convertToCm(waist, waist_unit);

      if (length_cm === null || waist_cm === null) {
        return { error: "Invalid unit provided" };
      }

      let radius_cm;

      // π = 3.14
      const pi = 3.14;
      if (type === "full") {
        radius_cm = waist_cm / (2 * pi) - 2;
      } else if (type === "three-quarter") {
        radius_cm = ((4 / 3) * waist_cm) / (2 * pi) - 2;
      } else if (type === "half") {
        radius_cm = (2 * waist_cm) / (2 * pi) - 2;
      } else if (type === "quarter") {
        radius_cm = (4 * waist_cm) / (2 * pi) - 2;
      } else {
        return { error: "Invalid skirt type" };
      }

      let radius_mm = radius_cm * 10;
      let radius_m = radius_cm / 100;
      let radius_in = radius_cm / 2.54;
      let radius_ft = radius_cm / 30.48;

      let fabric_length_cm = length_cm + radius_cm + 2;
      let fabric_length_mm = fabric_length_cm * 10;
      let fabric_length_m = fabric_length_cm / 100;
      let fabric_length_in = fabric_length_cm / 2.54;
      let fabric_length_ft = fabric_length_cm / 30.48;

      return {
        tech_radius_cm: Number(radius_cm.toFixed(2)),
        tech_radius_mm: Number(radius_mm.toFixed(2)),
        tech_radius_m: Number(radius_m.toFixed(2)),
        tech_radius_in: Number(radius_in.toFixed(2)),
        tech_radius_ft: Number(radius_ft.toFixed(2)),
        tech_fabric_length_cm: Number(fabric_length_cm.toFixed(2)),
        tech_fabric_length_mm: Number(fabric_length_mm.toFixed(2)),
        tech_fabric_length_m: Number(fabric_length_m.toFixed(2)),
        tech_fabric_length_in: Number(fabric_length_in.toFixed(2)),
        tech_fabric_length_ft: Number(fabric_length_ft.toFixed(2)),
      };
    } else {
      return { error: "Please! Check Your Inputs" };
    }
  }

  /**
   * getCalculationBotoxCostCalculator: Service Method
   * POST: /api/calculators-lol/botox-cost-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationBotoxCostCalculator(body) {
    let solve = body.tech_solve;
    let input_f = body.tech_input_f;
    let input_s = body.tech_input_s;

    if (isNaN(input_f) || isNaN(input_s)) {
      return { error: "Please! Check Your Input" };
    }

    let answer;

    // Check if solve is "1" or "2"
    if (solve === "1" || solve === "2") {
      answer = input_f / input_s; // Division
    } else {
      answer = input_f * input_s; // Multiplication
    }

    return {
      tech_answer: answer,
    };
  }
  /**
   * getCalculationYardsToTonsCalculator: Service Method
   * POST: /api/calculators-lol/yards-to-tons-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationYardsToTonsCalculator(body) {
    let density = body.tech_density;
    let density_unit = body.tech_density_unit;
    let cubic_yards = body.tech_cubic_yards;

    // Function to convert density to cubic yard based on the density unit
    function cubicYard(density, density_unit) {
      let total_cubic_yard = 0;

      if (density_unit === "lb/ft³") {
        total_cubic_yard = density / 74.074;
      } else if (density_unit === "kg/m³") {
        total_cubic_yard = density / 1187;
      }

      return total_cubic_yard;
    }

    // Check if the inputs are numeric
    if (isNaN(density) || isNaN(cubic_yards)) {
      return { error: "Please! Check Your Input" };
    }

    // Convert density and calculate tons
    density = cubicYard(density, density_unit);
    let tons = density * cubic_yards;
    let metric_tonnes = tons * 0.907185;
    let pounds = metric_tonnes * 2204.62;

    return {
      tech_tons: tons,
      tech_metric_tonnes: metric_tonnes,
      tech_pounds: pounds,
    };
  }
  /**
   * getCalculationDilutionRatioCalculator: Service Method
   * POST: /api/calculators-lol/dilution-ratio-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationDilutionRatioCalculator(body) {
    let final_volume = body.tech_final_volume;
    let final_unit = body.tech_final_unit;
    let dilution_ratio = body.tech_dilution_ratio;
    let concentrate_volume = body.tech_concentrate_volume;
    let concentrate_unit = body.tech_concentrate_unit;
    let water_volume = body.tech_water_volume;
    let water_unit = body.tech_water_unit;

    const dilutionUnit = (input, unit) => {
      const conversions = {
        "cm³": 0.001,
        "dm³": 1,
        "m³": 1000,
        cuin: 0.016387,
        cuft: 28.317,
        cuyd: 764.6,
        ml: 0.001,
        cl: 0.01,
        USgal: 3.7854,
        UKgal: 4.546,
      };
      return input * (conversions[unit] || 1);
    };

    const isNumeric = (n) => !isNaN(parseFloat(n)) && isFinite(n);

    if (
      isNumeric(final_volume) &&
      isNumeric(dilution_ratio) &&
      !concentrate_volume &&
      !water_volume
    ) {
      final_volume = dilutionUnit(final_volume, final_unit);
      let cv = final_volume / (parseFloat(dilution_ratio) + 1);
      let wv = cv * parseFloat(dilution_ratio);
      return {
        tech_res1: `${cv.toFixed(2)} liters`,
        tech_res11: cv.toFixed(2),
        tech_res2: `${wv.toFixed(2)} liters`,
        tech_res22: wv.toFixed(2),
        tech_name1: "Concentrate volume",
        tech_name2: "Water volume",
      };
    } else if (
      isNumeric(final_volume) &&
      !dilution_ratio &&
      isNumeric(concentrate_volume) &&
      !water_volume
    ) {
      final_volume = dilutionUnit(final_volume, final_unit);
      concentrate_volume = dilutionUnit(concentrate_volume, concentrate_unit);
      let dr = final_volume / concentrate_volume - 1;
      let wv = dr * concentrate_volume;
      return {
        tech_res1: `${dr.toFixed(1)} :1`,
        tech_res11: dr.toFixed(1),
        tech_res2: `${wv.toFixed(2)} liters`,
        tech_res22: wv.toFixed(2),
        tech_name1: "Dilution ratio",
        tech_name2: "Water volume",
      };
    } else if (
      isNumeric(final_volume) &&
      !dilution_ratio &&
      !concentrate_volume &&
      isNumeric(water_volume)
    ) {
      final_volume = dilutionUnit(final_volume, final_unit);
      water_volume = dilutionUnit(water_volume, water_unit);
      let cv = final_volume - water_volume;
      if (cv === 0) {
        return { error: "Please! Division by zero chose other values" };
      }
      let dr = water_volume / cv;
      return {
        tech_res1: `${dr.toFixed(2)} :1`,
        tech_res11: dr.toFixed(2),
        tech_res2: `${cv.toFixed(2)} liters`,
        tech_res22: cv.toFixed(2),
        tech_name1: "Dilution ratio",
        tech_name2: "Concentrate volume",
      };
    } else if (
      !final_volume &&
      isNumeric(dilution_ratio) &&
      isNumeric(concentrate_volume) &&
      !water_volume
    ) {
      concentrate_volume = dilutionUnit(concentrate_volume, concentrate_unit);
      let fv = concentrate_volume * (parseFloat(dilution_ratio) + 1);
      let wv = concentrate_volume * parseFloat(dilution_ratio);
      return {
        tech_res1: `${fv.toFixed(2)} liters`,
        tech_res11: fv.toFixed(2),
        tech_res2: `${wv.toFixed(2)} liters`,
        tech_res22: wv.toFixed(2),
        tech_name1: "Final volume",
        tech_name2: "Water volume",
      };
    } else if (
      !final_volume &&
      isNumeric(dilution_ratio) &&
      !concentrate_volume &&
      isNumeric(water_volume)
    ) {
      water_volume = dilutionUnit(water_volume, water_unit);
      if (parseFloat(dilution_ratio) === 0) {
        return { error: "Please! Division by zero, chose other values" };
      }
      let cv = water_volume / parseFloat(dilution_ratio);
      let fv = cv * (parseFloat(dilution_ratio) + 1);
      return {
        tech_res1: `${fv.toFixed(2)} liters`,
        tech_res11: fv.toFixed(2),
        tech_res2: `${cv.toFixed(2)} liters`,
        tech_res22: cv.toFixed(2),
        tech_name1: "Final volume",
        tech_name2: "Concentrate volume",
      };
    } else if (
      !final_volume &&
      !dilution_ratio &&
      isNumeric(concentrate_volume) &&
      isNumeric(water_volume)
    ) {
      concentrate_volume = dilutionUnit(concentrate_volume, concentrate_unit);
      water_volume = dilutionUnit(water_volume, water_unit);
      let dr = water_volume / concentrate_volume;
      let fv = concentrate_volume * (dr + 1);
      return {
        tech_res1: `${dr.toFixed(2)} :1`,
        tech_res11: dr.toFixed(2),
        tech_res2: `${fv.toFixed(2)} liters`,
        tech_res22: fv.toFixed(2),
        tech_name1: "Dilution ratio",
        tech_name2: "Final volume",
      };
    } else {
      return { error: "Please! Enter only two values to get your result" };
    }
  }

  /**
   * getCalculationgpMCalculator: Service Method
   * POST: /api/calculators-lol/gpm-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationgpMCalculator(body) {
    let volume = body.tech_volume?.toString().trim();
    let vol_unit = body.tech_vol_unit?.toString().trim();
    let time = body.tech_time?.toString().trim();
    let time_unit = body.tech_time_unit?.toString().trim();
    let ans_unit = body.tech_ans_unit?.toString().trim();

    function volume_convert(a, b) {
      const conversions = {
        "mm³": a * 0.00000026417,
        "cm³": a * 0.00026417,
        "dm³": a * 0.26417,
        "m³": a * 264.17,
        "cu in": a * 0.004329,
        "cu ft": a * 7.48,
        "cu yd": a * 201.97,
        ml: a * 0.00026417,
        cl: a * 0.0026417,
        liters: a * 0.26417,
        "US gal": a,
        "UK gal": a * 1.201,
        "US fl oz": a * 0.007813,
        "UK fl oz": a * 0.007506,
        cups: a * 0.0625,
        tbsp: a * 0.0039626,
        tsp: a * 0.0013209,
        "US qt": a * 0.25,
        "UK qt": a * 0.30024,
        "US pt": a * 0.125,
        "UK pt": a * 0.15012,
      };
      return conversions[b] ?? null;
    }

    function time_convert(a, b) {
      const conversions = {
        sec: a * 1,
        min: a * 60,
        hrs: a * 3600,
        days: a * 86400,
        wks: a * 604800,
        mos: a * 2629800,
        yrs: a * 31557600,
      };
      return conversions[b] ?? null;
    }

    function ans_convert(a, b) {
      const map = {
        1: { val: a * 1, unit: "US gal/s" },
        2: { val: a * 60, unit: "US gal/min" },
        3: { val: a * 3600, unit: "US gal/h" },
        4: { val: a * 86400, unit: "US gal/day" },
        5: { val: a * 0.8327, unit: "UK gal/s" },
        6: { val: a * 49.96, unit: "UK gal/min" },
        7: { val: a * 2997.6, unit: "UK gal/h" },
        8: { val: a * 71943, unit: "UK gal/day" },
        9: { val: a * 0.13368, unit: "ft³/s" },
        10: { val: a * 8.021, unit: "ft³/min" },
        11: { val: a * 481.25, unit: "ft³/h" },
        12: { val: a * 11550, unit: "ft³/day" },
        13: { val: a * 3785410, unit: "mm³/s" },
        14: { val: a * 0.0037854, unit: "m³/s" },
        15: { val: a * 0.22712, unit: "m³/min" },
        16: { val: a * 13.627, unit: "m³/h" },
        17: { val: a * 327.06, unit: "m³/day" },
        18: { val: a * 3.7854, unit: "L/s" },
        19: { val: a * 227.12, unit: "L/min" },
        20: { val: a * 13627, unit: "L/h" },
        21: { val: a * 327059, unit: "L/day" },
        22: { val: a * 227125, unit: "ml/min" },
        23: { val: a * 13627476, unit: "ml/h" },
        24: { val: a * 7680, unit: "US fl oz / min" },
        25: { val: a * 460800, unit: "US fl oz / h" },
        26: { val: a * 7994, unit: "UK fl oz / min" },
        27: { val: a * 479620, unit: "UK fl oz / h" },
        28: { val: a * 480, unit: "US pt / min" },
        29: { val: a * 28800, unit: "US pt / h" },
        30: { val: a * 399.7, unit: "UK pt / min" },
        31: { val: a * 23981, unit: "UK pt / h" },
      };
      return map[b] ?? null;
    }

    const param = {};

    if (!isNaN(volume) && !isNaN(time)) {
      const volConverted = volume_convert(parseFloat(volume), vol_unit);
      const timeConverted = time_convert(parseFloat(time), time_unit);

      if (volConverted == null || timeConverted == null) {
        return { error: "Invalid volume or time unit" };
      }

      const rawRate = volConverted / timeConverted;
      const result = ans_convert(rawRate, ans_unit);

      if (result == null) {
        return { error: "Invalid answer unit selection" };
      }

      param.tech_main_ans = result.val;
      param.tech_answer_unit = result.unit;
    } else {
      param.error = "Please! Check Your Inputs";
    }

    return param;
  }

  /**
   * getCalculationCeilingfanSizeCalculator: Service Method
   * POST: /api/calculators-lol/ceiling-fan-size-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationCeilingfanSizeCalculator(body) {
    let room_width = body.tech_room_width?.toString().trim();
    let room_length = body.tech_room_length?.toString().trim();
    let ceiling_height = body.tech_ceiling_height?.toString().trim();

    const param = {};

    if (!isNaN(room_width) && !isNaN(room_length) && !isNaN(ceiling_height)) {
      const width = parseFloat(room_width);
      const length = parseFloat(room_length);
      const height = parseFloat(ceiling_height);

      const squareFootage = width * length;

      let fanSize = "";
      if (squareFootage <= 75) {
        fanSize = "29 to 36 inches";
      } else if (squareFootage <= 144) {
        fanSize = "36 to 42 inches";
      } else if (squareFootage <= 225) {
        fanSize = "44 to 50 inches";
      } else {
        fanSize = "52 inches or larger";
      }

      const downrodLength = height >= 9 ? "6 inches" : "3 inches";

      param.tech_squareFootage = squareFootage;
      param.tech_fanSize = fanSize;
      param.tech_downrodLength = downrodLength;
    } else {
      param.error = "Please! Check Your Input";
    }

    return param;
  }

  /**
   * getCalculationCostPerMileDrivingCalculator: Service Method
   * POST: /api/calculators-lol/cost-per-mile-driving-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationCostPerMileDrivingCalculator(body) {
    let cost_of_gas = body.tech_cost_of_gas?.toString().trim();
    let miles_per_gallon = body.tech_miles_per_gallon?.toString().trim();
    let car_value = body.tech_car_value?.toString().trim();

    const param = {};

    if (!isNaN(cost_of_gas) && !isNaN(miles_per_gallon) && !isNaN(car_value)) {
      let gasCost = parseFloat(cost_of_gas); // e.g., 7
      let mpg = parseFloat(miles_per_gallon); // e.g., 7
      let carVal = parseFloat(car_value); // e.g., 4

      let car_value_div = carVal / 25000; // 0.00016
      let total_car_value = car_value_div * 0.03; // 4.8e-6
      let total_cost_mile = gasCost / mpg; // 1
      let answer = total_cost_mile + total_car_value + 0.05; // 1.0500048

      return {
        tech_answer: answer,
        tech_car_value: car_value_div,
        tech_total_car_value: total_car_value.toExponential(1), // "4.8e-6"
        tech_total_cost_mile: total_cost_mile,
        input_cost_of_gas: gasCost,
        input_miles_per_gallon: mpg,
        input_car_value: carVal,
      };
    } else {
      param.error = "Please! Check Your Input";
    }
  }

  /**
   * getCalculationGoldCostPerPoundCalculator: Service Method
   * POST: /api/calculators-lol/gold-cost-per-pound-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationGoldCostPerPoundCalculator(body) {
    let weight = body.tech_weight?.toString().trim();
    let cost = body.tech_cost?.toString().trim();

    const param = {};

    if (!isNaN(weight) && !isNaN(cost)) {
      let numericWeight = parseFloat(weight);
      let numericCost = parseFloat(cost);
      let GCP = numericCost / numericWeight;

      param.tech_GCP = parseFloat(GCP.toFixed(2)); // format to 2 decimal places
    } else {
      param.error = "Please! Check Your Input";
    }

    return param;
  }
  /**
   * getCalculationMoistureContentCalculator: Service Method
   * POST: /api/calculators-lol/moisture-content-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationMoistureContentCalculator(body) {
    let wet = body.tech_wet?.toString().trim();
    let wet_unit = body.tech_wet_unit?.toString().trim();
    let dry = body.tech_dry?.toString().trim();
    let dry_unit = body.tech_dry_unit?.toString().trim();

    const param = {};

    if (!isNaN(wet) && !isNaN(dry)) {
      wet = parseFloat(wet);
      dry = parseFloat(dry);

      // Convert wet units
      switch (wet_unit) {
        case "mg":
          wet = wet / 1_000_000;
          break;
        case "g":
          wet = wet / 1_000;
          break;
        case "oz":
          wet = wet / 35.27396;
          break;
        case "lb":
          wet = wet / 2.204623;
          break;
      }

      // Convert dry units
      switch (dry_unit) {
        case "mg":
          dry = dry / 1_000_000;
          break;
        case "g":
          dry = dry / 1_000;
          break;
        case "oz":
          dry = dry / 35.27396;
          break;
        case "lb":
          dry = dry / 2.204623;
          break;
      }

      const mc = ((wet - dry) / wet) * 100;

      param.tech_mc = mc;
    } else {
      param.error = "Please! Check Your Input";
    }

    return param;
  }
  /**
   * getCalculationShadedAreaCalculator: Service Method
   * POST: /api/calculators-lol/shaded-area-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationShadedAreaCalculator(body) {
    let solve = body.tech_solve?.toString().trim(); // e.g., "2@@m²"
    let input = body.tech_input?.toString().trim(); // e.g., "10"
    let in_unit = body.tech_in_unit?.toString().trim(); // e.g., "cm"

    const param = {};

    function convertInput(input, unit) {
      switch (unit) {
        case "m":
          return input * 1;
        case "AU":
          return input * 1.5e11;
        case "cm":
          return input * 0.001;
        case "km":
          return input * 1000;
        case "in":
          return input * 0.0254;
        case "ft":
          return input * 0.3048;
        case "mil":
          return input * 0.0000254;
        case "mm":
          return input * 0.001;
        case "nm":
          return input * 1e-9;
        case "mile":
          return input * 1609.344;
        case "parsec":
          return input * 3.08e16;
        case "pm":
          return input * 1e-12;
        case "yd":
          return input * 0.9144;
        default:
          return null;
      }
    }

    if (!isNaN(input)) {
      input = parseFloat(input);
      let convertedInput = convertInput(input, in_unit);

      if (convertedInput === null) {
        param.error = "Invalid input unit";
        return param;
      }

      const [val, unit] = solve.split("@@");
      const factor = parseFloat(val);

      const answer =
        Math.pow(convertedInput, 2) -
        3.14 * Math.pow(convertedInput / 2, 2) * factor;

      param.tech_answer = answer;
      param.tech_unit = unit;
    } else {
      param.error = "Please! Check Your Input";
    }

    return param;
  }

  /**
   * getCalculationEngneHourstoMilesCalculator: Service Method
   * POST: /api/calculators-lol/engine-hours-to-miles-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationEngneHourstoMilesCalculator(body) {
    const f_input = parseFloat(body.tech_f_input);
    const s_input = parseFloat(body.tech_s_input);

    const param = {};

    if (!isNaN(f_input) && !isNaN(s_input)) {
      const answer = f_input * s_input;

      param.tech_answer = answer;
      param.input_f_input = f_input;
      param.input_s_input = s_input;
    } else {
      param.error = "Please! Check Your Input";
    }

    return param;
  }

  /**
   * getCalculationMagnificationCalculator: Service Method
   * POST: /api/calculators-lol/magnification-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationMagnificationCalculator(body) {
    let d = parseFloat(body.tech_d);
    const d_unit = body.tech_d_unit;
    let f = parseFloat(body.tech_f);
    const f_unit = body.tech_f_unit;

    const param = {};

    function sigFig2(value, digits) {
      if (value === 0) {
        return 0;
      }
      const decimalPlaces =
        digits - Math.floor(Math.log10(Math.abs(value))) - 1;
      return parseFloat(value.toFixed(decimalPlaces));
    }

    if (!isNaN(d) && !isNaN(f)) {
      // Distance unit conversion
      switch (d_unit) {
        case "mm":
          d /= 1000;
          break;
        case "cm":
          d /= 100;
          break;
        case "km":
          d /= 0.001;
          break;
        case "in":
          d /= 39.3701;
          break;
        case "ft":
          d /= 3.28084;
          break;
        case "yd":
          d /= 1.093613;
          break;
        case "mi":
          d /= 0.000621371;
          break;
        case "nmi":
          d /= 0.000539957;
          break;
      }

      // Focal length unit conversion
      switch (f_unit) {
        case "mm":
          f /= 1000;
          break;
        case "cm":
          f /= 100;
          break;
        case "km":
          f /= 0.001;
          break;
        case "in":
          f /= 39.3701;
          break;
        case "ft":
          f /= 3.28084;
          break;
        case "yd":
          f /= 1.093613;
          break;
      }

      const k = Math.pow(d, 2) / 4 - f * d;
      if (k < 0) {
        param.error = "Oops! Something Went Wrong";
        return param;
      }

      const r = Math.sqrt(k);
      const h = d / 2 - r;
      const g = d / 2 + r;
      const m = h / g;

      param.tech_h = sigFig2(h, 5);
      param.tech_g = sigFig2(g, 5);
      param.tech_m = sigFig2(m, 5);
    } else {
      param.error = "Please! Check Your Input";
    }

    return param;
  }

  /**
   * getCalculationSplitBillCalculator: Service Method
   * POST: /api/calculators-lol/split-bill-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationSplitBillCalculator(body) {
    const billAmount = parseFloat(body.tech_bill_amount);
    const split = parseFloat(body.tech_split);
    const param = {};

    if (!isNaN(billAmount) && !isNaN(split)) {
      if (split === 0) {
        param.error =
          "Number of ways to split the bill value cannot be equal to zero.";
        return param;
      }

      const answer = billAmount / split;
      param.tech_answer = answer;
      param.input_billAmount = billAmount;
      param.input_split = split;
    } else {
      param.error = "Please! Check Your Input";
    }

    return param;
  }

  /**
   * getCalculationDrawLengthCalculator: Service Method
   * POST: /api/calculators-lol/draw-length-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationDrawLengthCalculator(body) {
    const length = parseFloat(body.tech_length);
    const param = {};

    if (!isNaN(length)) {
      const draw = length / 2.5;
      const arrow = draw + 1.5;
      const draw_cm = draw * 2.54;
      const arrow_cm = arrow * 2.54;

      param.tech_draw = draw;
      param.tech_arrow = arrow;
      param.tech_draw_cm = draw_cm;
      param.tech_arrow_cm = arrow_cm;
    } else {
      param.error = "Please! Check Your Input";
    }

    return param;
  }

  /**
   * getCalculationOnBasePercentageCalculator: Service Method
   * POST: /api/calculators-lol/on-base-percentage-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationOnBasePercentageCalculator(body) {
    const hits = parseFloat(body.tech_hits);
    const bases = parseFloat(body.tech_bases);
    const pitch = parseFloat(body.tech_pitch);
    const bats = parseFloat(body.tech_bats);
    const flies = parseFloat(body.tech_flies);

    const param = {};

    if (
      !isNaN(hits) &&
      !isNaN(bases) &&
      !isNaN(pitch) &&
      !isNaN(bats) &&
      !isNaN(flies)
    ) {
      const denominator = bats + bases + pitch + flies;
      if (denominator === 0) {
        param.error = "Division by zero error. Please check input values.";
        return param;
      }

      const answer = (hits + bases + pitch) / denominator;
      param.tech_answer = answer;
      param.input_hits = hits;
      param.input_bases = bases;
      param.input_pitch = pitch;
      param.input_bats = bats;
      param.input_flies = flies;
    } else {
      param.error = "Please! Check Your Input";
    }

    return param;
  }

  /**
   * getCalculationTaperCalculator: Service Method
   * POST: /api/calculators-lol/taper-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationTaperCalculator(body) {
    const major = parseFloat(body.tech_major);
    const majorUnit = body.tech_major_unit;
    const minor = parseFloat(body.tech_minor);
    const minorUnit = body.tech_minor_unit;
    const length = parseFloat(body.tech_length);
    const lengthUnit = body.tech_length_unit;

    const param = {};

    // Unit conversion function for length
    function taperUnit(length, lengthUnit) {
      let inches;
      switch (lengthUnit) {
        case "mm":
          inches = length / 25.4;
          break;
        case "in":
          inches = length * 1;
          break;
        case "cm":
          inches = length / 2.54;
          break;
        case "m":
          inches = length * 39.37;
          break;
        case "ft":
          inches = length / 12;
          break;
        default:
          inches = length;
      }
      return inches;
    }

    if (!isNaN(major) && !isNaN(minor) && !isNaN(length)) {
      const lengthMain = taperUnit(length, lengthUnit);
      const majorMain = taperUnit(major, majorUnit);
      const minorMain = taperUnit(minor, minorUnit);

      const taper = (majorMain - minorMain) / lengthMain;
      const main = taper * 1;
      const mainCm = taper / 2.54;
      const mainM = taper * 39.37;
      const mainFt = taper / 12;
      const mainMm = taper / 25.4;

      const sub = main / 2;
      const sudans = Math.atan(sub);
      const angle = (sudans * 180) / Math.PI; // Convert to degrees
      const answer = angle * 1;
      const answerRad = sudans;
      const answerGon = Math.pow(angle, 1.11111);

      param.tech_main = main;
      param.tech_main_cm = mainCm;
      param.tech_main_m = mainM;
      param.tech_main_ft = mainFt;
      param.tech_main_mm = mainMm;
      param.tech_answer = answer;
      param.tech_answer_rad = answerRad;
      param.tech_answer_gon = answerGon;
    } else {
      param.error = "Please! Check Your Input";
    }

    return param;
  }

  /**
   * getCalculationBatteryLifeCalculator: Service Method
   * POST: /api/calculators-lol/battery-life-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationBatteryLifeCalculator(body) {
    let batteryCapacity = parseFloat(body.tech_battery_capacity);
    const batteryUnits = body.tech_battery_units;
    const dischargeSafety = parseFloat(body.tech_discharge_safety);
    let deviceCon1 = parseFloat(body.tech_device_con1);
    const deviceCon1Units = body.tech_device_con1_units;
    let awakeTime = parseFloat(body.tech_awake_time);
    const awakeTimeUnits = body.tech_awake_time_units;
    let deviceCon2 = parseFloat(body.tech_device_con2);
    const deviceCon2Units = body.tech_device_con2_units;
    let sleepTime = parseFloat(body.tech_sleep_time);
    const sleepTimeUnits = body.tech_sleep_time_units;

    const param = {};
    if (
      !isNaN(batteryCapacity) &&
      !isNaN(dischargeSafety) &&
      !isNaN(deviceCon1) &&
      !isNaN(awakeTime) &&
      !isNaN(deviceCon2) &&
      !isNaN(sleepTime)
    ) {
      // Battery capacity units

      if (batteryUnits) {
        if (batteryUnits == "Ah") {
          batteryCapacity = batteryCapacity * 1000;
        } else if (batteryUnits == "mAh") {
          batteryCapacity = batteryCapacity;
        }
      }

      if (deviceCon1Units) {
        if (deviceCon1Units == "A") {
          deviceCon1 = deviceCon1 * 1000;
        } else if (deviceCon1Units == "µA") {
          deviceCon1 = deviceCon1 * 1000;
        }
      }

      if (awakeTimeUnits) {
        if (awakeTimeUnits == "sec") {
          awakeTime = awakeTime;
        } else if (awakeTimeUnits == "min") {
          awakeTime = awakeTime * 60;
        } else if (awakeTimeUnits == "hrs") {
          awakeTime = awakeTime * 3600;
        } else if (awakeTimeUnits == "days") {
          awakeTime = awakeTime * 86400;
        } else if (awakeTimeUnits == "wks") {
          awakeTime = awakeTime * 604800;
        } else if (awakeTimeUnits == "mos") {
          awakeTime = awakeTime * 2629800;
        } else if (awakeTimeUnits == "yrs") {
          awakeTime = awakeTime * 31557600;
        }
      }
      if (deviceCon2Units) {
        if (deviceCon1Units == "A") {
          deviceCon1 = deviceCon1 * 0.001;
        } else if (deviceCon1Units == "µA") {
          deviceCon1 = deviceCon1 * 1000;
        } else if (deviceCon1Units == "mA") {
          deviceCon1 = deviceCon1;
        }
      }

      if (sleepTimeUnits) {
        if (awakeTimeUnits == "sec") {
          sleepTime = sleepTime;
        } else if (sleepTime == "min") {
          sleepTime = sleepTime * 60;
        } else if (sleepTime == "hrs") {
          sleepTime = sleepTime * 3600;
        } else if (sleepTime == "days") {
          sleepTime = sleepTime * 86400;
        } else if (sleepTime == "wks") {
          sleepTime = sleepTime * 604800;
        } else if (sleepTime == "mos") {
          sleepTime = sleepTime * 2629800;
        } else if (sleepTime == "yrs") {
          sleepTime = sleepTime * 31557600;
        }
      }

      let per = dischargeSafety / 100;
      let x = 1 - per;
      let y = batteryCapacity / deviceCon1;
      let Battery_life = y * x;
      let Average_consumption =
        (deviceCon1 * awakeTime + deviceCon2 * sleepTime) /
        (awakeTime + sleepTime);
      param["tech_Battery_life"] = Battery_life;
      param["tech_Average_consumption"] = Average_consumption;
      param["input_battery_capacity"] = batteryCapacity;
      param["input_discharge_safety"] = dischargeSafety;
      param["input_device_con1"] = deviceCon1;
      param["input_awake_time"] = body.tech_awake_time;
      param["input_device_con2"] = deviceCon2;
      param["input_sleep_time"] = sleepTime;
    } else {
      param.error = "Please ! Check Input";
    }

    return param;
  }
  /**
   * getCalculationSluggingPercentageCalculator: Service Method
   * POST: /api/calculators-lol/slugging-percentage-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationSluggingPercentageCalculator(body) {
    const singles = parseFloat(body.tech_singles);
    const doubles = parseFloat(body.tech_doubles);
    const triples = parseFloat(body.tech_triples);
    const home = parseFloat(body.tech_home);
    const bats = parseFloat(body.tech_bats);

    const param = {};

    if (
      !isNaN(singles) &&
      !isNaN(doubles) &&
      !isNaN(triples) &&
      !isNaN(home) &&
      !isNaN(bats)
    ) {
      if (bats === 0) {
        param.error = "At Bats value cannot be equal to zero";
        return param;
      }

      const answer = (singles + 2 * doubles + 3 * triples + 4 * home) / bats;

      param.tech_answer = answer;
      param.tech_singles = singles;
      param.tech_doubles = doubles;
      param.tech_triples = triples;
      param.tech_home = home;
      param.tech_bats = bats;
    } else {
      param.error = "Please! Check Your Input";
    }

    return param;
  }

  /**
   * getCalculationMagicNumberCalculator: Service Method
   * POST: /api/calculators-lol/magic-number-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationMagicNumberCalculator(body) {
    const win = parseFloat(body.tech_win);
    const loss = parseFloat(body.tech_loss);

    const param = {};

    if (!isNaN(win) && !isNaN(loss)) {
      const answer = 162 - win - loss + 1;

      param.tech_answer = answer;
      param.input_win = win;
      param.input_loss = loss;
    } else {
      param.error = "Please! Check Your Input";
    }

    return param;
  }

  /**
   * getCalculationFabricCalculator: Service Method
   * POST: /api/calculators-lol/fabric-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationFabricCalculator(body) {
    let fabric = parseFloat(body.tech_fabric);
    const fabric_unit = body.tech_fabric_unit;
    let width = parseFloat(body.tech_width);
    const width_unit = body.tech_width_unit;
    let length = parseFloat(body.tech_length);
    const length_unit = body.tech_length_unit;
    const piece = parseFloat(body.tech_piece);
    const unit = body.tech_unit;

    const param = {};

    function convertUnit(value, unit) {
      switch (unit) {
        case "mm":
          return value * 1000;
        case "cm":
          return value * 100;
        case "m":
          return value;
        case "km":
          return value / 1000;
        case "in":
          return value * 39.37;
        case "ft":
          return value * 3.281;
        case "yd":
          return value * 1.094;
        default:
          return value;
      }
    }

    if (!isNaN(fabric) && !isNaN(width) && !isNaN(length) && !isNaN(piece)) {
      width = convertUnit(width, width_unit);
      fabric = convertUnit(fabric, fabric_unit);

      if (fabric === 0) {
        param.error = "fabric width cannot be equal to zero";
        return param;
      }

      if (width === 0) {
        param.error = "pieces to cut width cannot be equal to zero";
        return param;
      }

      const sub_across = fabric / width;
      const across = Math.round(sub_across);
      if (across === 0) {
        param.error = "across value cannot be equal to zero";
        return param;
      }

      const sub_down = piece / across;
      const down = Math.round(sub_down);

      length = convertUnit(length, length_unit);
      const sub_material = length * down;
      const material = Math.round(sub_material);
      const unit_material = convertUnit(material, unit);
      const answer = Math.round(unit_material);

      param.tech_answer = answer;
      param.tech_down = down;
      param.tech_across = across;
      param.tech_unit = unit;
      param.tech_piece = piece;
      param.tech_fabric = fabric;
      param.tech_width = width;
      param.tech_length = length;
      param.input_fabric = parseFloat(body.tech_fabric);
      param.input_width = parseFloat(body.tech_width);
      param.input_length = parseFloat(body.tech_length);
      param.input_piece = parseFloat(body.tech_piece);
    } else {
      param.error = "Please! Check Your Input";
    }

    return param;
  }

  /**
   * getCalculationSemestergradeCalculator: Service Method
   * POST: /api/calculators-lol/semester-grade-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationSemestergradeCalculator(body) {
    const f_grade = parseFloat(body.tech_f_grade);
    const f_weight = parseFloat(body.tech_f_weight);
    const s_grade = parseFloat(body.tech_s_grade);
    const s_weight = parseFloat(body.tech_s_weight);
    const l_grade = parseFloat(body.tech_l_grade);
    const l_weight = parseFloat(body.tech_l_weight);

    const param = {};

    if (
      !isNaN(f_grade) &&
      !isNaN(f_weight) &&
      !isNaN(s_grade) &&
      !isNaN(s_weight) &&
      !isNaN(l_grade) &&
      !isNaN(l_weight)
    ) {
      const semesterGrade =
        f_grade * f_weight + s_grade * s_weight + l_grade * l_weight;
      param.tech_semesterGrade = semesterGrade / 100;
    } else {
      param.error = "Please check input.";
    }

    return param;
  }

  /**
   * getCalculationDriveTimeCalculator: Service Method
   * POST: /api/calculators-lol/drive-time-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationDriveTimeCalculator(body) {
    let distance = body.tech_distance;
    let distance_unit = body.tech_distance_unit;
    let average_speed = body.tech_average_speed;
    let average_speed_unit = body.tech_average_speed_unit;
    let breaks = body.tech_breaks;
    let breaks_unit = body.tech_breaks_unit;
    let departure_time = body.tech_departure_time;
    let fuel_e = body.tech_fuel_e;
    let fuel_e_unit = body.tech_fuel_e_unit;
    let fuel_p = body.tech_fuel_p;
    let currancy = body.tech_currancy;
    let fuel_p_unit = body.tech_fuel_p_unit;
    let passengers = body.tech_passengers;

    const result = {};

    // Remove currency symbol from fuel price
    let fuelPrice = fuel_p;
    if (currancy && typeof fuel_p == "string") {
      fuelPrice = fuel_p.replace(currancy, "");
    }

    // Validate numeric inputs
    if (
      !this.isNumerictravel(distance) ||
      !this.isNumerictravel(average_speed) ||
      !this.isNumerictravel(passengers) ||
      !this.isNumerictravel(fuelPrice)
    ) {
      result.error = "Please ! Fill all the Input";
      return result;
    }

    // Convert to numbers
    let distanceValue = parseFloat(distance);
    let averageSpeedValue = parseFloat(average_speed);
    let breaksValue = parseFloat(breaks) || 0;
    let fuelEfficiency = parseFloat(fuel_e) || 0;
    let fuelPriceValue = parseFloat(fuelPrice);
    const passengersValue = parseFloat(passengers);

    // Convert breaks to minutes
    if (breaks_unit) {
      if (breaks_unit == "sec") {
        breaksValue = breaksValue / 60;
      } else if (breaks_unit == "hrs") {
        breaksValue = breaksValue * 60;
      } else if (breaks_unit == "days") {
        breaksValue = breaksValue * 24 * 60;
      } else if (breaks_unit == "wks") {
        breaksValue = breaksValue * 10080;
      }
    }

    // Convert distance to km
    if (distance_unit) {
      if (distance_unit == "km") {
        distanceValue = distanceValue;
      } else if (distance_unit == "m") {
        distanceValue = distanceValue / 1000;
      } else if (distance_unit == "mi") {
        distanceValue = Math.round(distanceValue * 1.609);
      } else if (distance_unit == "nmi") {
        distanceValue = distanceValue * 1.852;
      }
    }

    // Convert average speed to km/h
    if (average_speed_unit) {
      if (average_speed_unit == "km/h") {
        averageSpeedValue = averageSpeedValue;
      } else if (average_speed_unit == "m/s") {
        averageSpeedValue = averageSpeedValue * 3.6;
      } else if (average_speed_unit == "mph") {
        averageSpeedValue = averageSpeedValue * 1.609;
      }
    }

    // Convert fuel efficiency to L/100km
    if (fuel_e_unit) {
      if (fuel_e_unit == "L/100km") {
        fuelEfficiency = fuelEfficiency;
      } else if (fuel_e_unit == "us mpg") {
        fuelEfficiency = 235.215 / fuelEfficiency;
      } else if (fuel_e_unit == "uk mpg") {
        fuelEfficiency = 282.5 / fuelEfficiency;
      } else if (fuel_e_unit == "km/L") {
        fuelEfficiency = 100 / fuelEfficiency;
      }
    }

    // Convert fuel price to per liter
    if (fuel_p_unit) {
      if (fuel_p_unit == "/L") {
        fuelPriceValue = fuelPriceValue;
      } else if (fuel_p_unit == "/us gal") {
        fuelPriceValue = fuelPriceValue * 0.26;
      } else if (fuel_p_unit == "/uk gal") {
        fuelPriceValue = fuelPriceValue * 0.22;
      }
    }

    // Calculate total drive time
    const total_breaks_hours = breaksValue / 60;
    const total_drive_hours =
      distanceValue / averageSpeedValue + total_breaks_hours;

    // Calculate arrival time
    if (departure_time) {
      const departureDate = new Date(departure_time);
      const arrivalTimestamp =
        departureDate.getTime() + total_drive_hours * 3600 * 1000;
      const arrivalDate = new Date(arrivalTimestamp);

      // Format: "05 November 2025, 02:30 PM"
      const arrival_time = this.formatDateTimeTravel(arrivalDate);
      result.tech_arrival_time = arrival_time;
    }

    // Calculate total drive cost
    const total_drive_cost =
      (distanceValue / 100) * fuelEfficiency * fuelPriceValue;

    // Calculate drive cost per person
    const drive_cost_per_person = total_drive_cost / passengersValue;

    result.tech_total_drive_hours = total_drive_hours;
    result.tech_total_drive_cost = total_drive_cost;
    result.tech_drive_cost_per_person = drive_cost_per_person;

    return result;
  }

  // Helper function to check if value is numeric
  isNumerictravel(value) {
    if (value == null || value == undefined || value == "") {
      return false;
    }
    return !isNaN(parseFloat(value)) && isFinite(value);
  }

  // Helper function to format date time
  formatDateTimeTravel(date) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const day = String(date.getDate()).padStart(2, "0");
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12; // Convert to 12-hour format
    hours = String(hours).padStart(2, "0");

    return `${day} ${month} ${year}, ${hours}:${minutes} ${period}`;
  }

  /**
   * getCalculationScreenSizeCalculator: Service Method
   * POST: /api/calculators-lol/screen-size-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationScreenSizeCalculator(body) {
    let screen = body.tech_screen;
    let ratio_1 = body.tech_ratio_1;
    let ratio_2 = body.tech_ratio_2;
    let type = body.tech_type;
    let curvature = body.tech_curvature;
    let radius = body.tech_radius;
    let radius_units = body.tech_radius_units;
    let select_one = body.tech_select_one;
    let select_two = body.tech_select_two;
    let curved_dimensions = body.tech_curved_dimensions;
    let curved_dimensions_units = body.tech_curved_dimensions_units;
    let flat_dimensions = body.tech_flat_dimensions;
    let flat_dimensions_units = body.tech_flat_dimensions_units;
    const param = {};

    function conversionScreen(unit, value) {
      if (!unit) return value;
      switch (unit) {
        case "cm":
          return value / 2.54;
        case "m":
          return value / 0.0254;
        case "in":
          return value;
        case "ft":
          return value * 12;
        case "yd":
          return value * 36;
        case "mm":
          return value / 25.4;
        default:
          return value;
      }
    }

    const isNumeric = (n) => !isNaN(parseFloat(n)) && isFinite(n);

    if (type === "flat") {
      if (
        isNumeric(ratio_1) &&
        isNumeric(ratio_2) &&
        isNumeric(flat_dimensions)
      ) {
        const convertedFlatDim = conversionScreen(
          flat_dimensions_units,
          flat_dimensions
        );
        const r1 = parseFloat(ratio_1);
        const r2 = parseFloat(ratio_2);

        if (select_one === "Diagonal") {
          const width = (r1 / Math.sqrt(r1 ** 2 + r2 ** 2)) * convertedFlatDim;
          const height = (r2 / Math.sqrt(r1 ** 2 + r2 ** 2)) * convertedFlatDim;
          param.tech_screenArea = width * height;
          param.tech_width = width;
          param.tech_height = height;
        } else if (select_one === "Width") {
          const height = (r2 / r1) * convertedFlatDim;
          const diagonal = Math.sqrt(convertedFlatDim ** 2 + height ** 2);
          param.tech_screenArea = convertedFlatDim * height;
          param.tech_diagonal = diagonal;
          param.tech_height = height;
        } else if (select_one === "Height") {
          const width = (r1 / r2) * convertedFlatDim;
          const diagonal = Math.sqrt(width ** 2 + convertedFlatDim ** 2);
          param.tech_screenArea = width * convertedFlatDim;
          param.tech_width = width;
          param.tech_diagonal = diagonal;
        }
      } else {
        param.error = "Please! Check Your Input";
        return param;
      }
    } else {
      if (
        isNumeric(ratio_1) &&
        isNumeric(ratio_2) &&
        isNumeric(curved_dimensions)
      ) {
        let radius1 = conversionScreen(radius_units, radius);
        const convertedCurvedDim = conversionScreen(
          curved_dimensions_units,
          curved_dimensions
        );
        const r1 = parseFloat(ratio_1);
        const r2 = parseFloat(ratio_2);

        if (select_two === "Diagonal") {
          const height =
            (r2 / Math.sqrt(r1 ** 2 + r2 ** 2)) * convertedCurvedDim;
          const base_width = Math.sqrt(
            convertedCurvedDim ** 2 - Math.round(height, 1) ** 2
          );
          const screen_length = (r1 / r2) * height;
          const base_depth =
            radius1 * (1 - Math.cos(screen_length / (2 * radius1)));
          param.tech_screenArea = base_width * height;
          param.tech_base_width = base_width;
          param.tech_height = height;
          param.tech_base_depth = base_depth;
          param.tech_screen_length = screen_length;
        } else if (select_two === "Width") {
          const height = convertedCurvedDim / (r1 / r2);
          const diagonal = Math.sqrt(convertedCurvedDim ** 2 + height ** 2);
          const screen_length = (r1 / r2) * height;
          const base_depth =
            radius1 * (1 - Math.cos(screen_length / (2 * radius1)));
          param.tech_screenArea = convertedCurvedDim * height;
          param.tech_height = height;
          param.tech_diagonal = diagonal;
          param.tech_base_depth = base_depth;
          param.tech_screen_length = screen_length;
        } else if (select_two === "Height") {
          const base_width = convertedCurvedDim * (r1 / r2);
          const diagonal = Math.sqrt(base_width ** 2 + convertedCurvedDim ** 2);
          const screen_length = (r1 / r2) * convertedCurvedDim;
          const base_depth =
            radius1 * (1 - Math.cos(screen_length / (2 * radius1)));
          param.tech_base_width = base_width;
          param.tech_diagonal = diagonal;
          param.tech_screenArea = base_width * convertedCurvedDim;
          param.tech_base_depth = base_depth;
          param.tech_screen_length = screen_length;
        }
      } else {
        param.error = "Please! Check Your Input";
        return param;
      }
    }
    return param;
  }

  /**
   * getCalculationRecessedLightingCalculator: Service Method
   * POST: /api/calculators-lol/recessed-lighting-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationRecessedLightingCalculator(body) {
    let a = body.tech_a;
    let b = body.tech_b;
    let columns_fixture = body.tech_columns_fixture;
    let rows_fixture = body.tech_rows_fixture;

    const param = {};

    const isNumeric = (n) => !isNaN(parseFloat(n)) && isFinite(n);

    if (isNumeric(a) && isNumeric(b)) {
      a = parseFloat(a);
      b = parseFloat(b);
      columns_fixture = parseFloat(columns_fixture);
      rows_fixture = parseFloat(rows_fixture);

      const a_not = a / (2 * rows_fixture);
      const a_i = a / rows_fixture;
      const b_not = b / (2 * columns_fixture);
      const b_i = b / columns_fixture;
      const y_not = a / rows_fixture;
      const y_i = a / rows_fixture;
      const x_not = b / 2;
      const x_i = b / 2;

      param.tech_a_not = a_not;
      param.tech_a_i = a_i;
      param.tech_b_not = b_not;
      param.tech_b_i = b_i;
      param.tech_y_not = y_not;
      param.tech_y_i = y_i;
      param.tech_x_not = x_not;
      param.tech_x_i = x_i;
    } else {
      param.error = "Please! Check Your Input";
      return param;
    }

    return param;
  }

  /**
   * getCalculationCMFCalculator: Service Method
   * POST: /api/calculators-lol/cfm-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationCMFCalculator(body) {
    let length = body.tech_length;
    let length_units = body.tech_length_units;
    let width = body.tech_width;
    let width_units = body.tech_width_units;
    let celling = body.tech_celling;
    let celling_units = body.tech_celling_units;
    let airflow = body.tech_airflow;

    const param = {};

    const isNumeric = (n) => !isNaN(parseFloat(n)) && isFinite(n);

    function convertToMeters(value, unit) {
      if (unit === "m") return value;
      if (unit === "cm") return value * 0.01;
      if (unit === "in") return value * 0.0254;
      if (unit === "ft") return value * 0.3048;
      if (unit === "yd") return value * 0.9144;
      return null;
    }

    if (
      isNumeric(length) &&
      isNumeric(width) &&
      isNumeric(celling) &&
      isNumeric(airflow)
    ) {
      length = convertToMeters(parseFloat(length), length_units);
      width = convertToMeters(parseFloat(width), width_units);
      celling = convertToMeters(parseFloat(celling), celling_units);
      airflow = parseFloat(airflow);

      const floorArea = length * width;
      const volume = floorArea * celling;

      const airflow_rate = volume * airflow;
      const requiredAirFlow = (floorArea * celling * airflow) / 1.7;

      param.tech_floorArea = floorArea;
      param.tech_volume = volume;
      param.tech_airflow_rate = airflow_rate;
      param.tech_requiredAirFlow = requiredAirFlow;
    } else {
      param.error = "Please! Check Your Input";
      return param;
    }

    return param;
  }

  /**
   * getCalculationBoxFillCalculator: Service Method
   * POST: /api/calculators-lol/box-fill-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationBoxFillCalculator(body) {
    let conducting_wire_size = body.tech_conducting_wire_size;
    let clamps = body.tech_clamps;
    let conducting_wire = body.tech_conducting_wire;
    let fittings = body.tech_fittings;
    let devices = body.tech_devices;
    let grounding_conductor = body.tech_grounding_conductor;
    let largest_wire_size = body.tech_largest_wire_size;

    const param = {};
    let clamp_vol_allownce,
      conductor_fill_volume,
      clamp_fill_vol,
      fitt_vol_allownce,
      device_vol_allownce,
      fitt_fill_vol,
      device_fill_vol,
      grounding_fill_vol_allownce,
      grounding_fill_vol,
      larg_cond_wire,
      total_box_vol,
      total_volume_allowance_needed;
    const isNumeric = (n) => !isNaN(parseFloat(n)) && isFinite(n);

    if (
      isNumeric(conducting_wire) &&
      isNumeric(devices) &&
      isNumeric(grounding_conductor)
    ) {
      conducting_wire = parseFloat(conducting_wire);
      devices = parseFloat(devices);
      grounding_conductor = parseFloat(grounding_conductor);
      conducting_wire_size = parseFloat(conducting_wire_size);
      largest_wire_size = parseFloat(largest_wire_size);

      conductor_fill_volume = conducting_wire * conducting_wire_size;
      if (clamps == "yes") {
        clamp_vol_allownce = 1;
        clamp_fill_vol = conducting_wire_size;
      } else {
        clamp_vol_allownce = 0;
        clamp_fill_vol = 0;
      }
      if (fittings == "yes") {
        fitt_vol_allownce = 1;
        fitt_fill_vol = conducting_wire_size;
      } else {
        fitt_vol_allownce = 0;
        fitt_fill_vol = 0;
      }

      device_vol_allownce = devices * 2;
      device_fill_vol = device_vol_allownce * conducting_wire_size;
      grounding_fill_vol_allownce = grounding_conductor / 4;
      grounding_fill_vol = largest_wire_size * grounding_fill_vol_allownce;
      larg_cond_wire =
        grounding_conductor +
        device_vol_allownce +
        clamp_vol_allownce +
        fitt_vol_allownce;
      total_box_vol =
        conductor_fill_volume +
        clamp_fill_vol +
        fitt_fill_vol +
        device_fill_vol +
        grounding_fill_vol;
      total_volume_allowance_needed =
        conducting_wire +
        clamp_vol_allownce +
        fitt_vol_allownce +
        device_vol_allownce +
        grounding_fill_vol_allownce;

      param.tech_conducting_wire = conducting_wire;
      param.tech_conducting_wire_size = conducting_wire_size;
      param.tech_conductor_fill_volume = conductor_fill_volume;
      param.tech_clamp_vol_allownce = clamp_vol_allownce;
      param.tech_clamp_fill_vol = clamp_fill_vol;
      param.tech_fitt_vol_allownce = fitt_vol_allownce;
      param.tech_fitt_fill_vol = fitt_fill_vol;
      param.tech_device_vol_allownce = device_vol_allownce;
      param.tech_device_fill_vol = device_fill_vol;
      param.tech_grounding_fill_vol_allownce = grounding_fill_vol_allownce;
      param.tech_largest_wire_size = largest_wire_size;
      param.tech_grounding_fill_vol = grounding_fill_vol;
      param.tech_larg_cond_wire = larg_cond_wire;
      param.tech_total_volume_allowance_needed = total_volume_allowance_needed;
      param.tech_total_box_vol = total_box_vol;
    } else {
      param.error = "Please! Check Your Input";
      return param;
    }
    return param;
  }

  /**
   * getCalculationAnniversaryCalculator: Service Method
   * POST: /api/calculators-lol/anniversary-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationAnniversaryCalculator(body) {
    let date = body.tech_date;
    let current_date = body.tech_current_date;
    let one = body.tech_one;

    const result = {};

    if (one == "one" || one == "two" || one == "three") {
      if (!date) {
        result.error = "Please! Enter the date";
        return result;
      }

      // Parse dates
      const marriageStartDate = new Date(date);
      const currentDate = new Date(current_date);
      const today = new Date();

      // Calculate next anniversary date
      const currentYear = today.getFullYear();
      const marriageYear = marriageStartDate.getFullYear();
      const yearsElapsed = currentYear - marriageYear;

      // Create next anniversary date
      let nextAnniversary = new Date(marriageStartDate);
      nextAnniversary.setFullYear(
        marriageStartDate.getFullYear() + yearsElapsed
      );

      // Add 365 days to get the actual next anniversary
      nextAnniversary.setDate(nextAnniversary.getDate() + 365);

      // Format anniversary date
      const anniversaryDate =
        this.formatDateMonthDayYearanniversary(nextAnniversary);

      // Calculate days until anniversary
      const todayOnly = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );
      const anniversaryOnly = new Date(
        nextAnniversary.getFullYear(),
        nextAnniversary.getMonth(),
        nextAnniversary.getDate()
      );
      const daysUntilAnniversary = Math.floor(
        (anniversaryOnly - todayOnly) / (1000 * 60 * 60 * 24)
      );

      // Calculate marriage age
      const marriageAge = this.calculateDateDifferenceanniversary(
        marriageStartDate,
        currentDate
      );

      const yearsMarried = marriageAge.years;
      const monthsMarried = yearsMarried * 12 + marriageAge.months;
      const daysMarried = marriageAge.days;
      const totalDays = marriageAge.totalDays;

      result.tech_anniversaryDate = anniversaryDate;
      result.tech_daysUntilAnniversary = daysUntilAnniversary;
      result.tech_yearsMarried = yearsMarried;
      result.tech_monthsMarried = monthsMarried;
      result.tech_daysMarried = daysMarried;
      result.tech_marriage_age_weeks = Math.ceil(totalDays / 7);
      result.tech_marriage_age_days = totalDays;

      return result;
    } else {
      result.error = "Please! Enter the date";
      return result;
    }
  }

  /**
   * getCalculationTonnageCalculator: Service Method
   * POST: /api/calculators-lol/tonnage-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationTonnageCalculator(body) {
    let unit_weight = parseFloat(body.tech_unit_weight);
    let length = parseFloat(body.tech_length);
    let length_units = body.tech_length_units;
    let width = parseFloat(body.tech_width);
    let width_units = body.tech_width_units;
    let depth = parseFloat(body.tech_depth);
    let depth_units = body.tech_depth_units;
    let price_per = parseFloat(body.tech_price_per);
    let price_per_units = body.tech_price_per_units;
    let wastage = parseFloat(body.tech_wastage);

    const param = {};
    let tonnage, weight_needed, total_cost;
    const isNumeric = (n) => !isNaN(parseFloat(n)) && isFinite(n);

    if (price_per_units !== undefined) {
      if (price_per_units === "kg") {
        price_per = price_per;
      } else if (price_per_units === "t") {
        price_per = price_per * 1000;
      } else if (price_per_units === "lb") {
        price_per = price_per * 0.453592;
      } else if (price_per_units === "st") {
        price_per = price_per * 6.35029;
      }
    }

    function convertToM(value, unit) {
      if (unit === "m") {
        return value;
      } else if (unit === "cm") {
        return value * 100;
      } else if (unit === "in") {
        return value * 39.37;
      } else if (unit === "ft") {
        return value * 3.281;
      } else if (unit === "yd") {
        return value * 1.094;
      } else {
        return null;
      }
    }

    if (
      isNumeric(length) &&
      isNumeric(width) &&
      isNumeric(depth) &&
      isNumeric(price_per) &&
      isNumeric(wastage)
    ) {
      width = convertToM(width, width_units);
      length = convertToM(length, length_units);
      depth = convertToM(depth, depth_units);
      // Calculate area
      console.log(length, width);
      const area = length * width;
      console.log(area);
      // Calculate volume
      const volume = area * depth;

      // Calculate tonnage
      tonnage = Math.round(volume * unit_weight * 0.001, 2);

      // Calculate weight needed considering wastage
      weight_needed = Math.round(Math.round(tonnage) / (1 - wastage / 100), 2);

      // Calculate total cost
      total_cost = Math.round(weight_needed, 5) * price_per;

      param.tech_area = area;
      param.tech_volume = volume;
      param.tech_tonnage = tonnage;
      param.tech_weight_needed = weight_needed;
      param.tech_total_cost = total_cost;
    } else {
      param.error = "Please! Check Your Input";
      return param;
    }

    return param;
  }

  /**
   * getCalculationDunkCalculator: Service Method
   * POST: /api/calculators-lol/dunk-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationDunkCalculator(body) {
    let height = parseFloat(body.tech_height);
    let height_unit = body.tech_height_unit;
    let mass = parseFloat(body.tech_mass);
    let mass_unit = body.tech_mass_unit;
    let acceleration = parseFloat(body.tech_acceleration);
    let acceleration_unit = body.tech_acceleration_unit;
    let palm_size = parseFloat(body.tech_palm_size);
    let palm_size_unit = body.tech_palm_size_unit;
    let standing = parseFloat(body.tech_standing);
    let standing_unit = body.tech_standing_unit;

    const param = {};

    const isNumeric = (n) => !isNaN(parseFloat(n)) && isFinite(n);

    function unitConvert(unit, value) {
      switch (unit) {
        case "m":
          return value * 100;
        case "in":
          return value * 2.54;
        case "ft":
          return value * 30.48;
        case "yd":
          return value * 91.44;
        case "mm":
          return value * 0.1;
        case "km":
          return value * 1;
        case "mi":
          return value * 2.54;
        case "nmi":
          return value * 2.54;
        default:
          return value;
      }
    }

    function massUnitConvert(unit, value) {
      switch (unit) {
        case "g":
          return value * 0.001;
        case "t":
          return value * 1000;
        case "lb":
          return value * 0.4536;
        case "st":
          return value * 6.35;
        case "US ton":
          return value * 907.2;
        case "long ton":
          return value * 1016;
        case "Earths":
          return value * 5.9722e24;
        default:
          return value;
      }
    }

    function gravUnitConvert(unit, value) {
      switch (unit) {
        case "g":
          return value * 9.807;
        case "ft/s²":
          return value * 0.3048;
        default:
          return value;
      }
    }

    if (
      isNumeric(height) &&
      isNumeric(mass) &&
      isNumeric(acceleration) &&
      isNumeric(palm_size) &&
      isNumeric(standing)
    ) {
      height = unitConvert(height_unit, height);
      mass = massUnitConvert(mass_unit, mass);
      acceleration = gravUnitConvert(acceleration_unit, acceleration);
      palm_size = unitConvert(palm_size_unit, palm_size);
      standing = unitConvert(standing_unit, standing);

      const minimum_vertical_leap = height - standing + palm_size;
      const hang_time = +(
        Math.sqrt((8 * minimum_vertical_leap) / acceleration) / 10
      ).toFixed(3);
      const jumping_energy = +(
        (mass * acceleration * minimum_vertical_leap) /
        100
      ).toFixed(3);
      const initial_jumping_speed = +(
        Math.sqrt(2 * acceleration * minimum_vertical_leap) / 10
      ).toFixed(3);

      param.tech_minimum_vertical_leap = minimum_vertical_leap;
      param.tech_hang_time = hang_time;
      param.tech_jumping_energy = jumping_energy;
      param.tech_initial_jumping_speed = initial_jumping_speed;
    } else {
      param.error = "Please! Check Your Input";
    }

    return param;
  }

  /**
   * getCalculationNetherPortalCalculator: Service Method
   * POST: /api/calculators-lol/nether-portal-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationNetherPortalCalculator(body) {
    const submit = String(body.tech_submit || "").trim();
    const sim_adv = String(body.tech_sim_adv || "").trim();
    const cal = String(body.cal || "").trim();

    const x = parseFloat(body.tech_x);
    const y = parseFloat(body.tech_y);
    const z = parseFloat(body.tech_z);

    const x1 = parseFloat(body.tech_x1);
    const y1 = parseFloat(body.tech_y1);
    const z1 = parseFloat(body.tech_z1);
    const x2 = parseFloat(body.tech_x2);
    const y2 = parseFloat(body.tech_y2);
    const z2 = parseFloat(body.tech_z2);

    const param = {};

    const isNum = (val) => !isNaN(parseFloat(val)) && isFinite(val);

    if (!submit) {
      param.error = "Please! Check Your Input";
      return param;
    }

    if (sim_adv === "simple") {
      if (cal === "1") {
        if (!isNum(x) && !isNum(y) && !isNum(z)) {
          param.error = "Please! Check Your Input";
          return param;
        }

        const ox = isNum(x) ? x : 0;
        const oy = isNum(y) ? y : 0;
        const oz = isNum(z) ? z : 0;

        const nx = Math.floor(ox / 8);
        const ny = oy;
        const nz = Math.floor(oz / 8);

        if (oy > 123 && oy < 256) {
          param.tech_comment =
            "To correctly link your portal, it has to be placed on top of the Nether roof! The portal will, however, still work if it isn't on the roof.";
        }

        param.tech_x = nx;
        param.tech_y = ny;
        param.tech_z = nz;
        param.tech_share = "share";
      } else if (cal === "2") {
        if (!isNum(x) && !isNum(y) && !isNum(z)) {
          param.error = "Please! Check Your Input";
          return param;
        }

        const nx = isNum(x) ? x : 0;
        const ny = isNum(y) ? y : 0;
        const nz = isNum(z) ? z : 0;

        const ox = nx * 8;
        const oy = ny;
        const oz = nz * 8;

        if (ny > 123 && ny < 256) {
          param.tech_comment =
            "To correctly link your portal, it has to be placed on top of the Nether roof! The portal will, however, still work if it isn't on the roof.";
        }

        param.tech_x = ox;
        param.tech_y = oy;
        param.tech_z = oz;
        param.tech_share = "share";
      } else {
        param.error = "Please! Check Your Input";
        return param;
      }
    } else {
      if (
        isNum(x1) &&
        isNum(y1) &&
        isNum(z1) &&
        isNum(x2) &&
        isNum(y2) &&
        isNum(z2)
      ) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const dz = z2 - z1;
        const distance = Math.sqrt(dx ** 2 + dy ** 2 + dz ** 2);
        param.tech_distance = distance;
      } else {
        param.error = "Please! Check Your Input";
        return param;
      }
    }

    return param;
  }

  /**
   * getCalculationPointBuyCalculator: Service Method
   * POST: /api/calculators-lol/point-buy-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationPointBuyCalculator(body) {
    let racial_choice = body.tech_racial_choice;
    let strength = body.tech_strength;
    let dexerity = body.tech_dexerity;
    let intelligence = body.tech_intelligence;
    let wisdom = body.tech_wisdom;
    let charisma = body.tech_charisma;
    let constitution = body.tech_constitution;
    let choice = body.tech_choice;
    let strength1 = body.tech_strength1;
    let dexerity1 = body.tech_dexerity1;
    let intelligence1 = body.tech_intelligence1;
    let wisdom1 = body.tech_wisdom1;
    let charisma1 = body.tech_charisma1;
    let constitution1 = body.tech_constitution1;
    let points_budget = body.tech_points_budget;
    let smallest_score = body.tech_smallest_score;
    let largest_score = body.tech_largest_score;
    let s1 = body.tech_s1;
    let s2 = body.tech_s2;
    let s3 = body.tech_s3;
    let s4 = body.tech_s4;
    let s5 = body.tech_s5;
    let s6 = body.tech_s6;
    let s7 = body.tech_s7;
    let s8 = body.tech_s8;
    let s9 = body.tech_s9;
    let s10 = body.tech_s10;
    let s11 = body.tech_s11;
    let x1 = body.tech_s12;
    let x2 = body.tech_s13;
    let x3 = body.tech_s14;
    let x4 = body.tech_s15;
    let x5 = body.tech_s16;

    const result = {};

    // Helper function: calculate_sum (for choice 1)
    const calculateSum = (val1) => {
      const scoreMap = {
        8: 0,
        9: 1,
        10: 2,
        11: 3,
        12: 4,
        13: 5,
        14: 7,
        15: 9,
      };
      return scoreMap[String(val1)] || 0;
    };

    // Helper function: calculate_sum2 (for choice 2)
    const calculateSum2 = (
      val2,
      val3,
      val4,
      val5,
      val6,
      val7,
      val8,
      val9,
      val10,
      val11,
      val12,
      val13,
      val14,
      val15,
      val16,
      val17
    ) => {
      const scoreMap = {
        3: val13,
        4: val14,
        5: val15,
        6: val16,
        7: val17,
        8: val3,
        9: val4,
        10: val5,
        11: val6,
        12: val7,
        13: val8,
        14: val9,
        15: val10,
        16: val11,
        17: val12,
        18: val13,
      };
      return scoreMap[String(val2)] || 0;
    };

    // Helper function: calculate_sum2 for 8 parameters (simplified version)
    const calculateSum2Simple = (
      val2,
      val3,
      val4,
      val5,
      val6,
      val7,
      val8,
      val9,
      val10
    ) => {
      const scoreMap = {
        8: val3,
        9: val4,
        10: val5,
        11: val6,
        12: val7,
        13: val8,
        14: val9,
        15: val10,
      };
      return scoreMap[String(val2)] || 0;
    };

    // Choice 1: Standard Point Buy
    if (choice == "1") {
      // Racial choice 39 (custom)
      if (racial_choice == "39") {
        if (
          !this.isNumericdnd(strength) ||
          !this.isNumericdnd(dexerity) ||
          !this.isNumericdnd(intelligence) ||
          !this.isNumericdnd(wisdom) ||
          !this.isNumericdnd(charisma) ||
          !this.isNumericdnd(constitution) ||
          !this.isNumericdnd(strength1) ||
          !this.isNumericdnd(dexerity1) ||
          !this.isNumericdnd(intelligence1) ||
          !this.isNumericdnd(wisdom1) ||
          !this.isNumericdnd(charisma1) ||
          !this.isNumericdnd(constitution1)
        ) {
          result.error = "Please! Check Your Input";
          return result;
        }

        const str = parseFloat(strength);
        const dex = parseFloat(dexerity);
        const int = parseFloat(intelligence);
        const wis = parseFloat(wisdom);
        const cha = parseFloat(charisma);
        const con = parseFloat(constitution);

        if (
          str >= 3 &&
          str <= 15 &&
          dex >= 3 &&
          dex <= 15 &&
          int >= 3 &&
          int <= 15 &&
          wis >= 3 &&
          wis <= 15 &&
          cha >= 3 &&
          cha <= 15 &&
          con >= 3 &&
          con <= 15
        ) {
          const strength_value = calculateSum(str);
          const dexerity_value = calculateSum(dex);
          const intelligence_value = calculateSum(int);
          const wisdom_value = calculateSum(wis);
          const charisma_value = calculateSum(cha);
          const constitution_value = calculateSum(con);

          const sum =
            strength_value +
            dexerity_value +
            intelligence_value +
            wisdom_value +
            charisma_value +
            constitution_value;
          const total_sum = sum - 27;

          if (sum > 27) {
            result.error = `You are ${total_sum} points over budget`;
            return result;
          }

          result.tech_strength = str;
          result.tech_dexerity = dex;
          result.tech_constitution = con;
          result.tech_intelligence = int;
          result.tech_wisdom = wis;
          result.tech_charisma = cha;
          result.tech_strength_racial_bonus = parseFloat(strength1);
          result.tech_charisma_racial_bonus = parseFloat(charisma1);
          result.tech_dexerity_racial_bonus = parseFloat(dexerity1);
          result.tech_constitution_racial_bonus = parseFloat(constitution1);
          result.tech_intelligence_racial_bonus = parseFloat(intelligence1);
          result.tech_wisdom_racial_bonus = parseFloat(wisdom1);
          result.tech_strength_value = strength_value;
          result.tech_dexerity_value = dexerity_value;
          result.tech_intelligence_value = intelligence_value;
          result.tech_wisdom_value = wisdom_value;
          result.tech_charisma_value = charisma_value;
          result.tech_constitution_value = constitution_value;
          return result;
        }
      } else {
        // Other racial choices
        if (
          !this.isNumericdnd(strength) ||
          !this.isNumericdnd(dexerity) ||
          !this.isNumericdnd(intelligence) ||
          !this.isNumericdnd(wisdom) ||
          !this.isNumericdnd(charisma) ||
          !this.isNumericdnd(constitution)
        ) {
          result.error = "Please! Check Your Input";
          return result;
        }

        const str = parseFloat(strength);
        const dex = parseFloat(dexerity);
        const int = parseFloat(intelligence);
        const wis = parseFloat(wisdom);
        const cha = parseFloat(charisma);
        const con = parseFloat(constitution);

        if (
          str >= 3 &&
          str <= 15 &&
          dex >= 3 &&
          dex <= 15 &&
          int >= 3 &&
          int <= 15 &&
          wis >= 3 &&
          wis <= 15 &&
          cha >= 3 &&
          cha <= 15 &&
          con >= 3 &&
          con <= 15
        ) {
          const strength_value = calculateSum(str);
          const dexerity_value = calculateSum(dex);
          const intelligence_value = calculateSum(int);
          const wisdom_value = calculateSum(wis);
          const charisma_value = calculateSum(cha);
          const constitution_value = calculateSum(con);

          const devillers = racial_choice.split(".");
          const strength_racial_bonus = devillers[0];
          const dexerity_racial_bonus = devillers[1];
          const constitution_racial_bonus = devillers[2];
          const intelligence_racial_bonus = devillers[3];
          const wisdom_racial_bonus = devillers[4];
          const charisma_racial_bonus = devillers[5];

          const sum =
            strength_value +
            dexerity_value +
            intelligence_value +
            wisdom_value +
            charisma_value +
            constitution_value;
          const total_sum = sum - 27;

          if (sum > 27) {
            result.error = `You are ${total_sum} points over budget`;
            return result;
          }

          result.tech_strength = str;
          result.tech_dexerity = dex;
          result.tech_constitution = con;
          result.tech_intelligence = int;
          result.tech_wisdom = wis;
          result.tech_charisma = cha;
          result.tech_strength_racial_bonus = strength_racial_bonus;
          result.tech_charisma_racial_bonus = charisma_racial_bonus;
          result.tech_dexerity_racial_bonus = dexerity_racial_bonus;
          result.tech_constitution_racial_bonus = constitution_racial_bonus;
          result.tech_intelligence_racial_bonus = intelligence_racial_bonus;
          result.tech_wisdom_racial_bonus = wisdom_racial_bonus;
          result.tech_strength_value = strength_value;
          result.tech_dexerity_value = dexerity_value;
          result.tech_intelligence_value = intelligence_value;
          result.tech_wisdom_value = wisdom_value;
          result.tech_charisma_value = charisma_value;
          result.tech_constitution_value = constitution_value;
          return result;
        } else {
          result.error =
            "The score cannot be smaller than 3 and cannot larger than 18";
          return result;
        }
      }
    }
    // Choice 2: Custom Point Buy
    else if (choice == "2") {
      // Racial choice 39 (custom)
      if (racial_choice == "39") {
        if (
          !this.isNumericdnd(strength) ||
          !this.isNumericdnd(dexerity) ||
          !this.isNumericdnd(intelligence) ||
          !this.isNumericdnd(wisdom) ||
          !this.isNumericdnd(charisma) ||
          !this.isNumericdnd(constitution) ||
          !this.isNumericdnd(smallest_score) ||
          !this.isNumericdnd(largest_score) ||
          !this.isNumericdnd(points_budget) ||
          !this.isNumericdnd(s1) ||
          !this.isNumericdnd(s2) ||
          !this.isNumericdnd(s3) ||
          !this.isNumericdnd(s4) ||
          !this.isNumericdnd(s5) ||
          !this.isNumericdnd(s6) ||
          !this.isNumericdnd(strength1) ||
          !this.isNumericdnd(dexerity1) ||
          !this.isNumericdnd(intelligence1) ||
          !this.isNumericdnd(wisdom1) ||
          !this.isNumericdnd(charisma1) ||
          !this.isNumericdnd(constitution1) ||
          !this.isNumericdnd(s7) ||
          !this.isNumericdnd(s8) ||
          !this.isNumericdnd(s9) ||
          !this.isNumericdnd(s10) ||
          !this.isNumericdnd(s11) ||
          !this.isNumericdnd(x1) ||
          !this.isNumericdnd(x2) ||
          !this.isNumericdnd(x3) ||
          !this.isNumericdnd(x4) ||
          !this.isNumericdnd(x5)
        ) {
          result.error = "Please! Check Your Input";
          return result;
        }

        const smallScore = parseFloat(smallest_score);
        const largeScore = parseFloat(largest_score);

        if (
          !(
            smallScore >= 3 &&
            smallScore <= 8 &&
            largeScore >= 13 &&
            largeScore <= 18
          )
        ) {
          result.error =
            "The score cannot be smaller than 3 and cannot larger than 18";
          return result;
        }

        const str = parseFloat(strength);
        const dex = parseFloat(dexerity);
        const int = parseFloat(intelligence);
        const wis = parseFloat(wisdom);
        const cha = parseFloat(charisma);
        const con = parseFloat(constitution);

        if (
          str >= 3 &&
          str <= 18 &&
          dex >= 3 &&
          dex <= 18 &&
          int >= 3 &&
          int <= 18 &&
          wis >= 8 &&
          wis <= 18 &&
          cha >= 8 &&
          cha <= 18 &&
          con >= 8 &&
          con <= 18
        ) {
          const strength_value = calculateSum2(
            str,
            parseFloat(x1),
            parseFloat(x2),
            parseFloat(x3),
            parseFloat(x4),
            parseFloat(x5),
            parseFloat(s1),
            parseFloat(s2),
            parseFloat(s3),
            parseFloat(s4),
            parseFloat(s5),
            parseFloat(s6),
            parseFloat(s7),
            parseFloat(s8),
            parseFloat(s9),
            parseFloat(s10),
            parseFloat(s11)
          );

          const dexerity_value = calculateSum2(
            dex,
            parseFloat(x1),
            parseFloat(x2),
            parseFloat(x3),
            parseFloat(x4),
            parseFloat(x5),
            parseFloat(s1),
            parseFloat(s2),
            parseFloat(s3),
            parseFloat(s4),
            parseFloat(s5),
            parseFloat(s6),
            parseFloat(s7),
            parseFloat(s8),
            parseFloat(s9),
            parseFloat(s10),
            parseFloat(s11)
          );

          const intelligence_value = calculateSum2(
            int,
            parseFloat(x1),
            parseFloat(x2),
            parseFloat(x3),
            parseFloat(x4),
            parseFloat(x5),
            parseFloat(s1),
            parseFloat(s2),
            parseFloat(s3),
            parseFloat(s4),
            parseFloat(s5),
            parseFloat(s6),
            parseFloat(s7),
            parseFloat(s8),
            parseFloat(s9),
            parseFloat(s10),
            parseFloat(s11)
          );

          const wisdom_value = calculateSum2(
            wis,
            parseFloat(x1),
            parseFloat(x2),
            parseFloat(x3),
            parseFloat(x4),
            parseFloat(x5),
            parseFloat(s1),
            parseFloat(s2),
            parseFloat(s3),
            parseFloat(s4),
            parseFloat(s5),
            parseFloat(s6),
            parseFloat(s7),
            parseFloat(s8),
            parseFloat(s9),
            parseFloat(s10),
            parseFloat(s11)
          );

          const charisma_value = calculateSum2(
            cha,
            parseFloat(x1),
            parseFloat(x2),
            parseFloat(x3),
            parseFloat(x4),
            parseFloat(x5),
            parseFloat(s1),
            parseFloat(s2),
            parseFloat(s3),
            parseFloat(s4),
            parseFloat(s5),
            parseFloat(s6),
            parseFloat(s7),
            parseFloat(s8),
            parseFloat(s9),
            parseFloat(s10),
            parseFloat(s11)
          );

          const constitution_value = calculateSum2(
            con,
            parseFloat(x1),
            parseFloat(x2),
            parseFloat(x3),
            parseFloat(x4),
            parseFloat(x5),
            parseFloat(s1),
            parseFloat(s2),
            parseFloat(s3),
            parseFloat(s4),
            parseFloat(s5),
            parseFloat(s6),
            parseFloat(s7),
            parseFloat(s8),
            parseFloat(s9),
            parseFloat(s10),
            parseFloat(s11)
          );

          const sum =
            strength_value +
            dexerity_value +
            intelligence_value +
            wisdom_value +
            charisma_value +
            constitution_value;
          const budget = parseFloat(points_budget);
          const total_minus = sum - budget;

          if (sum > budget) {
            result.error = `You are ${total_minus} points over budget`;
            return result;
          }

          result.tech_strength = str;
          result.tech_dexerity = dex;
          result.tech_constitution = con;
          result.tech_intelligence = int;
          result.tech_wisdom = wis;
          result.tech_charisma = cha;
          result.tech_strength_racial_bonus = parseFloat(strength1);
          result.tech_charisma_racial_bonus = parseFloat(charisma1);
          result.tech_dexerity_racial_bonus = parseFloat(dexerity1);
          result.tech_constitution_racial_bonus = parseFloat(constitution1);
          result.tech_intelligence_racial_bonus = parseFloat(intelligence1);
          result.tech_wisdom_racial_bonus = parseFloat(wisdom1);
          result.tech_strength_value = strength_value;
          result.tech_dexerity_value = dexerity_value;
          result.tech_intelligence_value = intelligence_value;
          result.tech_wisdom_value = wisdom_value;
          result.tech_charisma_value = charisma_value;
          result.tech_constitution_value = constitution_value;
          return result;
        } else {
          result.error =
            "The base ability scores cannot be small than 8 and larger than 18";
          return result;
        }
      } else {
        // Other racial choices
        if (
          !this.isNumericdnd(strength) ||
          !this.isNumericdnd(dexerity) ||
          !this.isNumericdnd(intelligence) ||
          !this.isNumericdnd(wisdom) ||
          !this.isNumericdnd(charisma) ||
          !this.isNumericdnd(constitution) ||
          !this.isNumericdnd(smallest_score) ||
          !this.isNumericdnd(largest_score) ||
          !this.isNumericdnd(points_budget) ||
          !this.isNumericdnd(s1) ||
          !this.isNumericdnd(s2) ||
          !this.isNumericdnd(s3) ||
          !this.isNumericdnd(s4) ||
          !this.isNumericdnd(s5) ||
          !this.isNumericdnd(s6) ||
          !this.isNumericdnd(s7) ||
          !this.isNumericdnd(s8)
        ) {
          result.error = "Please! Check Your Input11";
          return result;
        }

        const smallScore = parseFloat(smallest_score);
        const largeScore = parseFloat(largest_score);
        const str = parseFloat(strength);
        const dex = parseFloat(dexerity);
        const int = parseFloat(intelligence);
        const wis = parseFloat(wisdom);
        const cha = parseFloat(charisma);
        const con = parseFloat(constitution);

        if (
          smallScore <= str &&
          smallScore <= dex &&
          smallScore <= int &&
          smallScore <= wis &&
          smallScore <= con &&
          smallScore <= cha &&
          smallScore >= 3 &&
          smallScore <= 18 &&
          largeScore >= 3 &&
          largeScore <= 18 &&
          smallScore !== largeScore &&
          largeScore > str &&
          largeScore > dex &&
          largeScore > cha &&
          largeScore > wis &&
          largeScore > int &&
          largeScore > con
        ) {
          if (
            str >= 8 &&
            str <= 15 &&
            dex >= 8 &&
            dex <= 15 &&
            int >= 8 &&
            int <= 15 &&
            wis >= 8 &&
            wis <= 15 &&
            cha >= 8 &&
            cha <= 15 &&
            con >= 8 &&
            con <= 15
          ) {
            const strength_value = calculateSum2Simple(
              str,
              parseFloat(s1),
              parseFloat(s2),
              parseFloat(s3),
              parseFloat(s4),
              parseFloat(s5),
              parseFloat(s6),
              parseFloat(s7),
              parseFloat(s8)
            );

            const dexerity_value = calculateSum2Simple(
              dex,
              parseFloat(s1),
              parseFloat(s2),
              parseFloat(s3),
              parseFloat(s4),
              parseFloat(s5),
              parseFloat(s6),
              parseFloat(s7),
              parseFloat(s8)
            );

            const intelligence_value = calculateSum2Simple(
              int,
              parseFloat(s1),
              parseFloat(s2),
              parseFloat(s3),
              parseFloat(s4),
              parseFloat(s5),
              parseFloat(s6),
              parseFloat(s7),
              parseFloat(s8)
            );

            const wisdom_value = calculateSum2Simple(
              wis,
              parseFloat(s1),
              parseFloat(s2),
              parseFloat(s3),
              parseFloat(s4),
              parseFloat(s5),
              parseFloat(s6),
              parseFloat(s7),
              parseFloat(s8)
            );

            const charisma_value = calculateSum2Simple(
              cha,
              parseFloat(s1),
              parseFloat(s2),
              parseFloat(s3),
              parseFloat(s4),
              parseFloat(s5),
              parseFloat(s6),
              parseFloat(s7),
              parseFloat(s8)
            );

            const constitution_value = calculateSum2Simple(
              con,
              parseFloat(s1),
              parseFloat(s2),
              parseFloat(s3),
              parseFloat(s4),
              parseFloat(s5),
              parseFloat(s6),
              parseFloat(s7),
              parseFloat(s8)
            );

            const sum =
              strength_value +
              dexerity_value +
              intelligence_value +
              wisdom_value +
              charisma_value +
              constitution_value;

            const devillers = racial_choice.split(".");
            const strength_racial_bonus = devillers[0];
            const dexerity_racial_bonus = devillers[1];
            const constitution_racial_bonus = devillers[2];
            const intelligence_racial_bonus = devillers[3];
            const wisdom_racial_bonus = devillers[4];
            const charisma_racial_bonus = devillers[5];

            const budget = parseFloat(points_budget);
            const total_minus = sum - budget;

            if (sum > budget) {
              result.error = `You are ${total_minus} points over budget`;
              return result;
            }

            result.tech_strength = str;
            result.tech_dexerity = dex;
            result.tech_constitution = con;
            result.tech_intelligence = int;
            result.tech_wisdom = wis;
            result.tech_charisma = cha;
            result.tech_strength_racial_bonus = strength_racial_bonus;
            result.tech_charisma_racial_bonus = charisma_racial_bonus;
            result.tech_dexerity_racial_bonus = dexerity_racial_bonus;
            result.tech_constitution_racial_bonus = constitution_racial_bonus;
            result.tech_intelligence_racial_bonus = intelligence_racial_bonus;
            result.tech_wisdom_racial_bonus = wisdom_racial_bonus;
            result.tech_strength_value = strength_value;
            result.tech_dexerity_value = dexerity_value;
            result.tech_intelligence_value = intelligence_value;
            result.tech_wisdom_value = wisdom_value;
            result.tech_charisma_value = charisma_value;
            result.tech_constitution_value = constitution_value;
            return result;
          } else {
            result.error =
              "The base ability scores cannot be small than 8 and larger than 18";
            return result;
          }
        } else {
          result.error =
            "The score cannot be smaller than 3 and cannot larger than 18";
          return result;
        }
      }
    }

    result.error = "Please! Check Your Input";
    return result;
  }

  // Helper function (reuse from previous code)
  isNumericdnd(value) {
    if (value === null || value === undefined || value === "") {
      return false;
    }
    return !isNaN(parseFloat(value)) && isFinite(value);
  }

  /**
   * getCalculationStairCalculator: Service Method
   * POST: /api/calculators-lol/stair-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationStairCalculator(body) {
    const stairInches = (a, b) => {
      if (b == "ft") {
        return a * 12;
      } else if (b == "in") {
        return a * 1;
      } else if (b == "yd") {
        return a * 36;
      } else if (b == "cm") {
        return a / 2.54;
      } else if (b == "m") {
        return a * 39.37;
      }
      return a;
    };
    const type = body.tech_type;
    const f_input = parseFloat(body.tech_f_input) || 0;
    const f_units = body.tech_f_units;
    var s_input = parseFloat(body.tech_s_input) || 0;
    const s_units = body.tech_s_units;
    const rise = body.tech_rise;
    const t_input = parseFloat(body.tech_t_input) || 0;
    const t_units = body.tech_t_units;
    const tread = body.tech_tread;
    const tread_input = parseFloat(body.tech_tread_input) || 0;
    const tread_units = body.tech_tread_units;
    const headroom = body.tech_headroom;
    const f_opening = parseFloat(body.tech_f_opening) || 0;
    const fo_units = body.tech_fo_units;
    const f_thickness = parseFloat(body.tech_f_thickness) || 0;
    const ft_units = body.tech_ft_units;
    const h_req = parseFloat(body.tech_h_req) || 0;
    const hr_units = body.tech_hr_units;
    const mount = body.tech_mount;

    const result = {};

    let inch,
      total_run_ans,
      run_ans,
      stair_ans,
      placement,
      mount_ans,
      step_ans,
      s_ans,
      str,
      angle_ans,
      answ;

    if (type == "first") {
      const f_input_in = stairInches(f_input, f_units);
      var s_input = stairInches(s_input, s_units);
      const t_input_in = stairInches(t_input, t_units);
      const tread_input_in = stairInches(tread_input, tread_units);
      if (f_input_in > 0 && s_input > 0) {
        if (rise == "1") {
          if (t_input_in > 0) {
            inch = t_input_in;
            inch = Number(inch.toFixed(2));
            const no_stair = s_input / t_input_in;
            stair_ans = Math.round(no_stair);
            total_run_ans = f_input_in * (stair_ans - 1);
            total_run_ans = Number(total_run_ans.toFixed(2));
            run_ans = f_input_in;
            run_ans = Number(run_ans.toFixed(2));
            const first_step = s_input - t_input_in;

            if (first_step <= 0) {
              step_ans = s_input;
              step_ans = Number(step_ans.toFixed(2));
            } else if (first_step > 0) {
              step_ans = first_step;
              step_ans = Number(step_ans.toFixed(2));
            }
          } else {
            result.error = "Please! Check Your Input";
            return result;
          }

          if (tread == "2") {
            if (tread_input_in > 0) {
              const f_step = s_input - t_input_in;
              if (f_step <= 0) {
                s_ans = s_input;
                s_ans = Number(s_ans.toFixed(2));
              } else if (f_step > 0) {
                s_ans = f_step;
                s_ans = Number(s_ans.toFixed(2));
              }
              placement = t_input_in + tread_input_in;
              placement = Number(placement.toFixed(2));
            } else {
              result.error = "Please! Check Your Input";
              return result;
            }
          }
        } else if (rise == "2") {
          if (t_input_in > 0) {
            inch = s_input / t_input_in;
            inch = Number(inch.toFixed(2));
            stair_ans = Math.round(t_input_in);
            total_run_ans = f_input_in * t_input_in;
            total_run_ans = Number(total_run_ans.toFixed(2));
            run_ans = f_input_in;
            run_ans = Number(run_ans.toFixed(2));
          } else {
            result.error = "Please! Check Your Input";
            return result;
          }

          if (tread == "2") {
            if (tread_input_in > 0) {
              const f_step = s_input - t_input_in;
              if (f_step <= 0) {
                s_ans = s_input;
                s_ans = Number(s_ans.toFixed(2));
              } else if (f_step > 0) {
                s_ans = f_step;
                s_ans = Number(s_ans.toFixed(2));
              }
              placement = tread_input_in;
              placement = Number(placement.toFixed(2));
            } else {
              result.error = "Please! Check Your Input";
              return result;
            }
          }
        }
      } else {
        result.error = "Please! Check Your Input";
        return result;
      }
    } else if (type == "second") {
      const f_input_in = stairInches(f_input, f_units);
      var s_input = stairInches(s_input, s_units);
      const t_input_in = stairInches(t_input, t_units);
      const tread_input_in = stairInches(tread_input, tread_units);

      if (f_input_in > 0 && s_input > 0) {
        if (rise == "1") {
          if (t_input_in > 0) {
            inch = t_input_in;
            inch = Number(inch.toFixed(2));
            const no_stair = s_input / t_input_in;
            stair_ans = Math.round(no_stair);
            total_run_ans = f_input_in;
            total_run_ans = Number(total_run_ans.toFixed(2));
            run_ans = f_input_in / stair_ans;
            run_ans = Number(run_ans.toFixed(2));
            const first_step = s_input - t_input_in;

            if (first_step <= 0) {
              step_ans = s_input;
              step_ans = Number(step_ans.toFixed(2));
            } else if (first_step > 0) {
              step_ans = first_step;
              step_ans = Number(step_ans.toFixed(2));
            }
          } else {
            result.error = "Please! Check Your Input";
            return result;
          }

          if (tread == "2") {
            if (tread_input_in > 0) {
              const f_step = s_input - t_input_in;
              if (f_step <= 0) {
                s_ans = s_input;
                s_ans = Number(s_ans.toFixed(2));
              } else if (f_step > 0) {
                s_ans = f_step;
                s_ans = Number(s_ans.toFixed(2));
              }
              placement = t_input_in + tread_input_in;
              placement = Number(placement.toFixed(2));
            } else {
              result.error = "Please! Check Your Input";
              return result;
            }
          }
        } else if (rise == "2") {
          if (t_input_in > 0) {
            inch = s_input / t_input_in;
            inch = Number(inch.toFixed(2));
            stair_ans = Math.round(t_input_in);
            total_run_ans = f_input_in;
            total_run_ans = Number(total_run_ans.toFixed(2));
            run_ans = f_input_in / stair_ans;
            run_ans = Number(run_ans.toFixed(2));
          } else {
            result.error = "Please! Check Your Input";
            return result;
          }

          if (tread == "2") {
            if (tread_input_in > 0) {
              const f_step = s_input - t_input_in;
              if (f_step <= 0) {
                s_ans = s_input;
                s_ans = Number(s_ans.toFixed(2));
              } else if (f_step > 0) {
                s_ans = f_step;
                s_ans = Number(s_ans.toFixed(2));
              }
              placement = tread_input_in;
              placement = Number(placement.toFixed(2));
            } else {
              result.error = "Please! Check Your Input";
              return result;
            }
          }
        }
      } else {
        result.error = "Please! Check Your Input";
        return result;
      }
    }

    if (mount == "1") {
      mount_ans = s_input - t_input;
      mount_ans = Number(mount_ans.toFixed(2));

      if (headroom == "2") {
        if (f_opening && f_thickness && h_req) {
          const f_opening_in = stairInches(f_opening, fo_units);
          const f_thickness_in = stairInches(f_thickness, ft_units);
          const h_req_in = stairInches(h_req, hr_units);

          if (f_opening_in > 0) {
            if (f_opening_in > 0 && f_opening_in < 5) {
              answ = inch - f_thickness_in;
            } else {
              answ = inch - f_thickness_in;
              for (let i = 0; i <= f_opening_in; i++) {
                if (i % 5 === 0) {
                  answ += inch;
                }
              }
              if (f_opening_in < 5) {
                // answ remains the same
              } else if (f_opening_in > 5) {
                answ -= inch;
              }
            }
          } else if (f_opening_in < 0) {
            if (f_opening_in < -1 && f_opening_in > -5) {
              answ = f_thickness_in * -1;
            } else {
              answ = inch + f_thickness_in;
              for (let i = -1; i >= f_opening_in; i--) {
                if (i % 5 === 0) {
                  answ += inch;
                }
              }
              answ *= -1;
            }
            if (f_opening_in > -5) {
              // answ remains the same
            } else if (f_opening_in < -5) {
              answ += inch;
            }
          }
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      }
    } else if (mount == "2") {
      mount_ans = s_input;

      if (headroom == "2") {
        if (f_opening && f_thickness && h_req) {
          const f_opening_in = stairInches(f_opening, fo_units);
          const f_thickness_in = stairInches(f_thickness, ft_units);
          const h_req_in = stairInches(h_req, hr_units);

          if (f_opening_in > 0) {
            if (f_opening_in >= 0 && f_opening_in < 5) {
              answ = f_thickness_in * -1;
            } else {
              answ = inch - f_thickness_in;
              for (let i = 0; i < f_opening_in; i++) {
                if (i % 5 === 0) {
                  answ += inch;
                }
              }
              answ -= inch;
            }
          } else if (f_opening_in < 0) {
            if (f_opening_in < -1 && f_opening_in > -5) {
              answ = f_thickness_in + inch;
              answ *= -1;
            } else {
              answ = inch + f_thickness_in;
              for (let i = -1; i > f_opening_in; i--) {
                if (i % 5 === 0) {
                  answ += inch;
                }
              }
              answ *= -1;
            }
          }
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      }
    }
    // console.log(mount_ans);
    if (total_run_ans && mount_ans) {
      str = Math.pow(total_run_ans, 2) + Math.pow(mount_ans, 2);
      str = Math.sqrt(str);
      str = Number(str.toFixed(2));

      if (str && mount_ans) {
        const angle = mount_ans / str;
        angle_ans = Math.asin(angle);
        angle_ans = angle_ans * (180 / Math.PI); // Convert radians to degrees
        angle_ans = Number(angle_ans.toFixed(2));
      }
    }

    // Add calculated values to result object
    if (inch !== undefined) result.tech_inch = inch;
    if (total_run_ans !== undefined) result.tech_total_run_ans = total_run_ans;
    if (run_ans !== undefined) result.tech_run_ans = run_ans;
    if (stair_ans !== undefined) result.tech_stair_ans = stair_ans;
    if (placement !== undefined) result.tech_placement = placement;
    if (mount_ans !== undefined) result.tech_mount_ans = mount_ans;
    if (str !== undefined) result.tech_str = str;
    if (step_ans !== undefined) result.tech_step_ans = step_ans;
    if (s_ans !== undefined) result.tech_s_ans = s_ans;
    if (angle_ans !== undefined) result.tech_angle_ans = angle_ans;
    if (answ !== undefined) result.tech_answ = answ;

    return result;
  }

  /**
   * getCalculationBattingAverageCalculator: Service Method
   * POST: /api/calculators-lol/batting-average-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationBattingAverageCalculator(body) {
    const operations = body.tech_operations;
    const first = parseFloat(body.tech_first) || 0;
    const second = parseFloat(body.tech_second) || 0;
    const third = parseFloat(body.tech_third) || 0;
    const four = parseFloat(body.tech_four) || 0;
    const five = parseFloat(body.tech_five) || 0;
    const fiveb = parseFloat(body.tech_fiveb) || 0;
    const seven = parseFloat(body.tech_seven) || 0;
    const eight = parseFloat(body.tech_eight) || 0;
    const nine = parseFloat(body.tech_nine) || 0;
    const ten = parseFloat(body.tech_ten) || 0;
    const quantity = parseFloat(body.tech_quantity) || 0;

    const result = {};
    let batting, heading;

    if (operations == "3") {
      if (!isNaN(first) && !isNaN(second) && !isNaN(third)) {
        const a1 = second - third;
        batting = first / a1;
        heading = "Cricket Batting Average";
      } else {
        result.error = "Please check your input";
        return result;
      }
    } else if (operations == "4") {
      if (!isNaN(first) && !isNaN(second)) {
        if (first != 0) {
          batting = second / first;
          heading = "Batting Average";
        } else {
          result.error = "At Bats cannot be zero";
          return result;
        }
      } else {
        result.error = "Please check your input";
        return result;
      }
    } else if (operations == "5") {
      if (
        !isNaN(first) &&
        !isNaN(second) &&
        !isNaN(third) &&
        !isNaN(four) &&
        !isNaN(five)
      ) {
        const a1_ans = second + third + four;
        const a2_ans = first + third + four + five;
        if (a2_ans != 0) {
          batting = a1_ans / a2_ans;
          heading = "On Base Percentage";
        } else {
          batting = 0;
          heading = "On Base Percentage";
        }
      } else {
        result.error = "Please check your input";
        return result;
      }
    } else if (operations == "6") {
      if (!isNaN(second) && !isNaN(third) && !isNaN(four) && !isNaN(first)) {
        if (first != 0) {
          const d2 = third * 2;
          const t3 = four * 3;
          const h4 = five * 4;
          const a1_ans = second + d2 + t3 + h4;
          batting = a1_ans / first;
          heading = "Slugging Percentage";
        } else {
          result.error = "At Bats cannot be zero";
          return result;
        }
      } else {
        result.error = "Please check your input";
        return result;
      }
    } else if (operations == "7") {
      if (
        !isNaN(first) &&
        !isNaN(second) &&
        !isNaN(third) &&
        !isNaN(four) &&
        !isNaN(five) &&
        !isNaN(fiveb) &&
        !isNaN(quantity) &&
        !isNaN(seven) &&
        !isNaN(eight)
      ) {
        if (eight != 0) {
          const d2 = second * 2;
          const t3 = third * 3;
          const h4 = four * 4;
          const TB = first + d2 + t3 + h4;
          const SLG = TB / eight;
          const OBP_T = five + quantity + seven;
          const OBP_D = eight + quantity + fiveb + seven;
          const OBP = OBP_T / OBP_D;
          if (OBP_D !== 0) {
            batting = OBP + SLG;
            heading = "On-Base Plus Slugging";
          } else {
            batting = 0;
            heading = "On-Base Plus Slugging";
          }
        } else {
          result.error = "At Bats cannot be zero";
          return result;
        }
      } else {
        result.error = "Please check your input";
        return result;
      }
    } else if (operations == "8") {
      if (
        !isNaN(first) &&
        !isNaN(second) &&
        !isNaN(third) &&
        !isNaN(four) &&
        !isNaN(five) &&
        !isNaN(fiveb) &&
        !isNaN(quantity) &&
        !isNaN(seven)
      ) {
        if (first != 0) {
          const NIBB = second * 0.72;
          const HBP = third * 0.72;
          const B1 = four * 0.9;
          const RBOE = seven * 0.92;
          const B2 = five * 1.24;
          const B3 = quantity * 1.56;
          const HR = fiveb * 1.95;
          const top_part = NIBB + HBP + B1 + RBOE + B2 + B3 + HR;
          batting = top_part / first;
          heading = "Weighted On Base Average";
        } else {
          result.error = "Appearances cannot be zero";
          return result;
        }
      } else {
        result.error = "Please check your input";
        return result;
      }
    } else if (operations == "9") {
      if (
        !isNaN(first) &&
        !isNaN(second) &&
        !isNaN(third) &&
        !isNaN(four) &&
        !isNaN(five)
      ) {
        const b_top = second - third;
        const b_down = first - five - third + four;
        if (b_down != 0) {
          batting = b_top / b_down;
          heading = "Batting Average on Balls in Play";
        } else {
          batting = 0;
          heading = "Batting Average on Balls in Play";
        }
      } else {
        result.error = "Please check your input";
        return result;
      }
    } else if (operations === "10") {
      if (!isNaN(first) && !isNaN(second) && !isNaN(third) && !isNaN(four)) {
        if (first != 0) {
          const t2 = third * 2;
          const h3 = four * 3;
          const top_ans = second + t2 + h3;
          batting = top_ans / first;
          heading = "Isolated Power";
        } else {
          result.error = "At Bats cannot be zero";
          return result;
        }
      } else {
        result.error = "Please check your input";
        return result;
      }
    } else if (operations == "11") {
      if (
        !isNaN(first) &&
        !isNaN(second) &&
        !isNaN(third) &&
        !isNaN(four) &&
        !isNaN(five) &&
        !isNaN(quantity) &&
        !isNaN(fiveb) &&
        !isNaN(seven) &&
        !isNaN(eight) &&
        !isNaN(nine) &&
        !isNaN(ten)
      ) {
        const f_part = second + third - ten + five - quantity;

        const s2_part = third - fiveb + five;
        const s3_part = 0.26 * s2_part;
        const s_part = four + s3_part;

        const t2_part = seven + eight + nine;
        const t_part = 0.52 * t2_part;

        const down_part = first + third + five + seven + eight;
        const top_part = f_part * s_part + t_part;
        if (down_part != 0) {
          batting = top_part / down_part;
          heading = "Runs Created";
        } else {
          batting = 0;
          heading = "Runs Created";
        }
      } else {
        result.error = "Please check your input";
        return result;
      }
    } else if (operations == "12") {
      if (
        !isNaN(first) &&
        !isNaN(second) &&
        !isNaN(third) &&
        !isNaN(four) &&
        !isNaN(five) &&
        !isNaN(quantity)
      ) {
        if (quantity != 0) {
          const f_part = first - second;
          const l_part = four - five;
          const top_part = third + f_part + l_part;
          batting = top_part / quantity;
          heading = "Secondary Average";
        } else {
          result.error = "At Bats cannot be zero";
          return result;
        }
      } else {
        result.error = "Please check your input";
        return result;
      }
    } else if (operations == "13") {
      if (!isNaN(first) && !isNaN(second) && !isNaN(third) && !isNaN(four)) {
        const d2 = second * 2;
        const t3 = third * 3;
        const h4 = four * 4;
        batting = first + d2 + t3 + h4;
        heading = "Total Bases";
      } else {
        result.error = "Please check your input";
        return result;
      }
    } else if (operations == "14") {
      if (!isNaN(first) && !isNaN(second)) {
        if (second != 0) {
          batting = first / second;
          heading = "At Bats per Home Run";
        } else {
          result.error = "Home Runs cannot be zero";
          return result;
        }
      } else {
        result.error = "Please check your input";
        return result;
      }
    } else if (operations == "15") {
      if (!isNaN(first) && !isNaN(second) && !isNaN(third)) {
        const top_part = first + second;
        const down_part = first + second + third;
        if (down_part != 0) {
          batting = top_part / down_part;
          heading = "Fielding Percentage";
        } else {
          batting = 0;
          heading = "Fielding Percentage";
        }
      } else {
        result.error = "Please check your input";
        return result;
      }
    } else if (operations == "16") {
      if (!isNaN(first) && !isNaN(second) && !isNaN(third)) {
        if (first != 0) {
          const top_part = second + third;
          batting = top_part / first;
          heading = "Range Factor Per Games Played";
        } else {
          result.error = "Games Played cannot be zero";
          return result;
        }
      } else {
        result.error = "Please check your input";
        return result;
      }
    } else if (operations == "17") {
      if (!isNaN(first) && !isNaN(second) && !isNaN(third)) {
        if (first != 0) {
          const t_part = second + third;
          const top_part = 9 * t_part;
          batting = top_part / first;
          heading = "Range Factor Per 9 Innings";
        } else {
          result.error = "Innings Played cannot be zero";
          return result;
        }
      } else {
        result.error = "Please check your input";
        return result;
      }
    } else if (operations == "18") {
      if (!isNaN(first) && !isNaN(second)) {
        if (second != 0) {
          const top_part = 9 * first;
          batting = top_part / second;
          heading = "ERA";
        } else {
          result.error = "Innings Pitched cannot be zero";
          return result;
        }
      } else {
        result.error = "Please check your input";
        return result;
      }
    } else if (operations == "19") {
      if (!isNaN(first) && !isNaN(second) && !isNaN(third)) {
        if (third != 0) {
          const top_part = first + second;
          batting = top_part / third;
          heading = "WHIP";
        } else {
          result.error = "Innings Pitched cannot be zero";
          return result;
        }
      } else {
        result.error = "Please check your input";
        return result;
      }
    } else if (operations == "20") {
      if (!isNaN(first) && !isNaN(second)) {
        if (first != 0) {
          const top_part = second / first;
          batting = 9 * top_part;
          heading = "Hits Allowed Per 9 Innings";
        } else {
          result.error = "Innings Pitched cannot be zero";
          return result;
        }
      } else {
        result.error = "Please check your input";
        return result;
      }
    } else if (operations == "21") {
      if (!isNaN(first) && !isNaN(second)) {
        if (first != 0) {
          const top_part = second / first;
          batting = 9 * top_part;
          heading = "Home Runs Allowed Per 9 Innings";
        } else {
          result.error = "Innings Pitched cannot be zero";
          return result;
        }
      } else {
        result.error = "Please check your input";
        return result;
      }
    } else if (operations == "22") {
      if (!isNaN(first) && !isNaN(second)) {
        if (first != 0) {
          const top_part = second / first;
          batting = 9 * top_part;
          heading = "Strikeouts Per 9 Innings";
        } else {
          result.error = "Innings Pitched cannot be zero";
          return result;
        }
      } else {
        result.error = "Please check your input";
        return result;
      }
    } else if (operations == "23") {
      if (!isNaN(first) && !isNaN(second)) {
        if (first != 0) {
          const top_part = second / first;
          batting = 9 * top_part;
          heading = "Walks Per 9 Innings";
        } else {
          result.error = "Innings Pitched cannot be zero";
          return result;
        }
      } else {
        result.error = "Please check your input";
        return result;
      }
    } else if (operations == "24") {
      if (!isNaN(first) && !isNaN(second)) {
        if (second != 0) {
          batting = first / second;
          heading = "Strikeout-to-Walk Ratio";
        } else {
          result.error = "Walks cannot be zero";
          return result;
        }
      } else {
        result.error = "Please check your input";
        return result;
      }
    } else {
      result.error = "Invalid operation";
      return result;
    }

    // Format the result to 3 decimal places
    batting = Number(batting.toFixed(3));

    result.tech_batting = batting;
    result.tech_heading = heading;
    return result;
  }

  /**
   * getCalculationMpgCalculator: Service Method
   * POST: /api/calculators-lol/mpg-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationMpgCalculator(body) {
    const type = body.tech_type;
    const operations = body.tech_operations;
    const first = parseFloat(body.tech_first) || 0;
    const units1 = body.tech_units1;
    const second = parseFloat(body.tech_second) || 0;
    const units2 = body.tech_units2;
    const third = parseFloat(body.tech_third) || 0;
    const units3 = body.tech_units3;
    const four = parseFloat(body.tech_four) || 0;
    const units4 = body.tech_units4;
    const ad_first = parseFloat(body.tech_ad_first) || 0;
    const ad_second = parseFloat(body.tech_ad_second) || 0;
    const ad_third = parseFloat(body.tech_ad_third) || 0;
    const ad_units3 = body.tech_ad_units3;
    const ad_four = parseFloat(body.tech_ad_four) || 0;
    const ad_units4 = body.tech_ad_units4;
    const currancy = body.tech_currancy;

    const result = {};

    // Helper functions
    const calculate1 = (a, b) => {
      if (a == "1") {
        return b / 1.609;
      } else if (a == "2") {
        return b * 1;
      }
      return b;
    };

    const calculate2 = (a, b) => {
      if (a == "1") {
        return b / 3.785;
      } else if (a == "2") {
        return b * 1;
      } else if (a == "3") {
        return b * 1.20095;
      }
      return b;
    };

    const calculate3 = (a, b) => {
      if (a == "1") {
        return b / 235.215;
      } else if (a == "2") {
        return b * 1;
      } else if (a == "3") {
        return b * 1.201;
      } else if (a == "4") {
        return b * 2.352145;
      }
      return b;
    };

    // Convert units to numeric codes
    let units1Code,
      units2Code,
      units3Code,
      units4Code,
      adUnits3Code,
      adUnits4Code;

    // Convert units1
    if (units1 == "km") {
      units1Code = "1";
    } else if (units1 == "mi") {
      units1Code = "2";
    } else {
      units1Code = units1;
    }

    // Convert units2
    if (units2 == "liters") {
      units2Code = "1";
    } else if (units2 == "US gal") {
      units2Code = "2";
    } else if (units2 == "UK gal") {
      units2Code = "3";
    } else {
      units2Code = units2;
    }

    // Convert units3
    if (units3 == "L/100km") {
      units3Code = "1";
    } else if (units3 == "US mpg") {
      units3Code = "2";
    } else if (units3 == "UK mpg") {
      units3Code = "3";
    } else if (units3 == "kmpl") {
      units3Code = "4";
    } else {
      units3Code = units3;
    }

    // Convert units4
    if (units4 == currancy + "liters") {
      units4Code = "1";
    } else if (units4 == "US gal") {
      units4Code = "2";
    } else if (units4 == "UK gal") {
      units4Code = "2";
    } else {
      units4Code = units4;
    }

    // Convert ad_units3
    if (ad_units3 == "liters") {
      adUnits3Code = "1";
    } else if (ad_units3 == "US gal") {
      adUnits3Code = "2";
    } else if (ad_units3 == "UK gal") {
      adUnits3Code = "2";
    } else {
      adUnits3Code = ad_units3;
    }

    // Convert ad_units4
    if (ad_units4 == currancy + "liters") {
      adUnits4Code = "1";
    } else if (ad_units4 == currancy + "US gal") {
      adUnits4Code = "2";
    } else if (ad_units4 == currancy + "UK gal") {
      adUnits4Code = "2";
    } else {
      adUnits4Code = ad_units4;
    }

    // Convert inputs
    const convertedFirst = calculate1(units1Code, first);
    const convertedSecond = calculate2(units2Code, second);
    const convertedThird = calculate3(units3Code, third);
    const convertedAdThird = calculate2(adUnits3Code, ad_third);

    let jawab,
      petrol,
      cost,
      distance,
      km_dis,
      mi_jawab,
      km_jawab,
      ad_cost,
      ad_petrol;

    if (type == "first") {
      if (operations == "1") {
        if (!isNaN(convertedSecond) && !isNaN(convertedThird)) {
          petrol = convertedSecond;
          jawab = convertedSecond * convertedThird;
        } else {
          result.error = "Please check your input";
          return result;
        }
      } else if (operations == "2") {
        if (!isNaN(convertedFirst) && !isNaN(convertedThird)) {
          if (convertedThird != 0) {
            jawab = convertedFirst / convertedThird;
            petrol = jawab;
          } else {
            result.error = "Fuel economy cannot be 0";
            return result;
          }
        } else {
          result.error = "Please check your input";
          return result;
        }
      } else if (operations == "3") {
        if (!isNaN(convertedFirst) && !isNaN(convertedSecond)) {
          if (convertedSecond != 0) {
            jawab = convertedFirst / convertedSecond;
            petrol = convertedSecond;
          } else {
            result.error = "Fuel used cannot be 0";
            return result;
          }
        } else {
          result.error = "Please check your input";
          return result;
        }
      } else {
        result.error = "Invalid operation";
        return result;
      }

      // Calculate cost
      if (!isNaN(four)) {
        if (units4Code == "1") {
          const cost1 = petrol * 3.785;
          cost = cost1 * four;
        } else if (units4Code == "2") {
          cost = petrol * four;
        } else if (units4Code == "3") {
          const cost1 = petrol / 1.201;
          cost = cost1 * four;
        } else {
          cost = 0;
        }
        cost = Number(cost.toFixed(3));
        result.tech_cost = cost;
      }

      result.tech_jawab = jawab;
    } else if (type == "second") {
      if (!isNaN(ad_first) && !isNaN(ad_second) && !isNaN(convertedAdThird)) {
        if (ad_second > ad_first) {
          if (convertedAdThird != 0) {
            ad_petrol = convertedAdThird;
            distance = ad_second - ad_first;
            mi_jawab = distance / convertedAdThird;
            km_dis = distance / 1.609;
            km_jawab = km_dis / convertedAdThird;
          } else {
            result.error = "Fuel used cannot be 0";
            return result;
          }
        } else {
          result.error = "End Trip must be greater than Start Trip";
          return result;
        }
      } else {
        result.error = "Please check your input";
        return result;
      }

      // Calculate additional cost
      if (!isNaN(ad_four)) {
        if (adUnits4Code == "1") {
          const ad_cost1 = ad_petrol * 3.785;
          ad_cost = ad_cost1 * ad_four;
        } else if (adUnits4Code == "2") {
          ad_cost = ad_petrol * ad_four;
        } else if (adUnits4Code == "3") {
          const ad_cost1 = ad_petrol / 1.201;
          ad_cost = ad_cost1 * ad_four;
        } else {
          ad_cost = 0;
        }
        ad_cost = Number(ad_cost.toFixed(3));
        result.tech_ad_cost = ad_cost;
      }

      result.tech_distance = distance;
      result.tech_km_dis = km_dis;
      result.tech_mi_jawab = mi_jawab;
      result.tech_km_jawab = km_jawab;
    } else {
      result.error = "Invalid type";
      return result;
    }

    return result;
  }

  /**
   * getCalculationAquariumCalculator: Service Method
   * POST: /api/calculators-lol/aquarium-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationAquariumCalculator(body) {
    const shape = body.tech_shape;
    const length = parseFloat(body.tech_length) || 0;
    const length_unit = body.tech_length_unit;
    const width = parseFloat(body.tech_width) || 0;
    const width_unit = body.tech_width_unit;
    const height = parseFloat(body.tech_height) || 0;
    const height_unit = body.tech_height_unit;
    const fill_depth = parseFloat(body.tech_fill_depth) || 0;
    const fill_depth_unit = body.tech_fill_depth_unit;
    const front_pane = parseFloat(body.tech_front_pane) || 0;
    const front_pane_unit = body.tech_front_pane_unit;
    const end_pane = parseFloat(body.tech_end_pane) || 0;
    const end_pane_unit = body.tech_end_pane_unit;
    const radius = parseFloat(body.tech_radius) || 0;
    const radius_unit = body.tech_radius_unit;
    const radius_one = parseFloat(body.tech_radius_one) || 0;
    const radius_one_unit = body.tech_radius_one_unit;
    const radius_two = parseFloat(body.tech_radius_two) || 0;
    const radius_two_unit = body.tech_radius_two_unit;
    const long_side = parseFloat(body.tech_long_side) || 0;
    const long_side_unit = body.tech_long_side_unit;
    const short_side = parseFloat(body.tech_short_side) || 0;
    const short_side_unit = body.tech_short_side_unit;
    const len_one = parseFloat(body.tech_len_one) || 0;
    const len_one_unit = body.tech_len_one_unit;
    const len_two = parseFloat(body.tech_len_two) || 0;
    const len_two_unit = body.tech_len_two_unit;
    const wid_one = parseFloat(body.tech_wid_one) || 0;
    const wid_one_unit = body.tech_wid_one_unit;
    const wid_two = parseFloat(body.tech_wid_two) || 0;
    const wid_two_unit = body.tech_wid_two_unit;
    const full_width = parseFloat(body.tech_full_width) || 0;
    const full_width_unit = body.tech_full_width_unit;

    const result = {};

    const convertCm = (value, unit) => {
      if (unit == "cm") {
        return value * 1;
      } else if (unit == "m") {
        return value * 100;
      } else if (unit == "in") {
        return value * 2.54;
      } else if (unit == "ft") {
        return value * 30.48;
      } else if (unit == "yd") {
        return value * 91.44;
      }
      return value;
    };

    let volume, filled_volume;

    if (shape == "1") {
      if (!isNaN(length) && !isNaN(width) && !isNaN(height)) {
        const lv = convertCm(length, length_unit);
        const wv = convertCm(width, width_unit);
        const hv = convertCm(height, height_unit);
        volume = lv * wv * hv;

        if (fill_depth != "" && !isNaN(fill_depth)) {
          if (fill_depth > height) {
            result.error =
              "The fill depth cannot be greater than the height of the aquarium.";
            return result;
          } else {
            const fv = convertCm(fill_depth, fill_depth_unit);
            filled_volume = lv * wv * fv;
            result.tech_filled_volume = filled_volume;
          }
        }
      } else {
        result.error = "Please! Check Input";
        return result;
      }
    } else if (shape == "2") {
      if (!isNaN(length)) {
        const lv = convertCm(length, length_unit);
        volume = lv * lv * lv;

        if (fill_depth != "" && !isNaN(fill_depth)) {
          if (fill_depth > length) {
            result.error =
              "The fill depth cannot be greater than the length of the aquarium.";
            return result;
          } else {
            const fv = convertCm(fill_depth, fill_depth_unit);
            filled_volume = lv * lv * fv;
            result.tech_filled_volume = filled_volume;
          }
        }
      } else {
        result.error = "Please! Check Input";
        return result;
      }
    } else if (shape == "3") {
      if (
        !isNaN(length) &&
        !isNaN(width) &&
        !isNaN(height) &&
        !isNaN(front_pane)
      ) {
        const lv = convertCm(length, length_unit);
        const wv = convertCm(width, width_unit);
        const hv = convertCm(height, height_unit);
        const fr_pane = convertCm(front_pane, front_pane_unit);
        volume = (wv * lv - (wv * (lv - fr_pane)) / 2) * hv;

        if (fill_depth != "" && !isNaN(fill_depth)) {
          if (fill_depth > height) {
            result.error =
              "The fill depth cannot be greater than the height of the aquarium.";
            return result;
          } else {
            const fv = convertCm(fill_depth, fill_depth_unit);
            filled_volume = (wv * lv - (wv * (lv - fr_pane)) / 2) * fv;
            result.tech_filled_volume = filled_volume;
          }
        }
      } else {
        result.error = "Please! Check Input";
        return result;
      }
    } else if (shape == "4" || shape == "5") {
      if (
        !isNaN(length) &&
        !isNaN(width) &&
        !isNaN(height) &&
        !isNaN(front_pane) &&
        !isNaN(end_pane)
      ) {
        const lv = convertCm(length, length_unit);
        const wv = convertCm(width, width_unit);
        const hv = convertCm(height, height_unit);
        const fr_pane = convertCm(front_pane, front_pane_unit);
        const en_pane = convertCm(end_pane, end_pane_unit);

        if (shape == "4") {
          volume = (wv * lv - ((lv - fr_pane) * (wv - en_pane)) / 2) * hv;
        } else if (shape == "5") {
          volume =
            0.5 *
            (wv * lv + wv * fr_pane + en_pane * lv - fr_pane * en_pane) *
            hv;
        }

        if (fill_depth != "" && !isNaN(fill_depth)) {
          if (fill_depth > height) {
            result.error =
              "The fill depth cannot be greater than the height of the aquarium.";
            return result;
          } else {
            const fv = convertCm(fill_depth, fill_depth_unit);
            if (shape == "4") {
              filled_volume =
                (wv * lv - ((lv - fr_pane) * (wv - en_pane)) / 2) * fv;
            } else if (shape == "5") {
              filled_volume =
                0.5 *
                (wv * lv + wv * fr_pane + en_pane * lv - fr_pane * en_pane) *
                fv;
            }
            result.tech_filled_volume = filled_volume;
          }
        }
      } else {
        result.error = "Please! Check Input";
        return result;
      }
    } else if (shape == "6" || shape == "7" || shape == "8") {
      if (!isNaN(height) && !isNaN(radius)) {
        const hv = convertCm(height, height_unit);
        const ra = convertCm(radius, radius_unit);

        if (shape == "6") {
          volume = Math.PI * ra * ra * hv;
        } else if (shape == "7") {
          volume = Math.PI * ra * ra * (hv / 2);
        } else if (shape == "8") {
          volume = Math.PI * ra * ra * (hv / 4);
        }

        if (fill_depth != "" && !isNaN(fill_depth)) {
          if (fill_depth > height) {
            result.error =
              "The fill depth cannot be greater than the height of the aquarium.";
            return result;
          } else {
            const fv = convertCm(fill_depth, fill_depth_unit);
            if (shape == "6") {
              filled_volume = Math.PI * ra * ra * fv;
            } else if (shape == "7") {
              filled_volume = Math.PI * ra * ra * (fv / 2);
            } else if (shape == "8") {
              filled_volume = Math.PI * ra * ra * (fv / 4);
            }
            result.tech_filled_volume = filled_volume;
          }
        }
      } else {
        result.error = "Please! Check Input";
        return result;
      }
    } else if (shape == "9") {
      if (!isNaN(height) && !isNaN(radius_one) && !isNaN(radius_two)) {
        const hv = convertCm(height, height_unit);
        const r1 = convertCm(radius_one, radius_one_unit);
        const r2 = convertCm(radius_two, radius_two_unit);
        volume = Math.PI * (hv * r1 * r2);

        if (fill_depth != "" && !isNaN(fill_depth)) {
          if (fill_depth > height) {
            result.error =
              "The fill depth cannot be greater than the height of the aquarium.";
            return result;
          } else {
            const fv = convertCm(fill_depth, fill_depth_unit);
            filled_volume = Math.PI * (r1 * r2 * fv);
            result.tech_filled_volume = filled_volume;
          }
        }
      } else {
        result.error = "Please! Check Input";
        return result;
      }
    } else if (shape == "10") {
      if (!isNaN(long_side) && !isNaN(short_side) && !isNaN(height)) {
        const hv = convertCm(height, height_unit);
        const l1 = convertCm(long_side, long_side_unit);
        const l2 = convertCm(short_side, short_side_unit);
        volume = 0.5 * (l1 * l1 + 2 * l2 * l1 - l2 * l2) * hv;

        if (fill_depth != "" && !isNaN(fill_depth)) {
          if (fill_depth > height) {
            result.error =
              "The fill depth cannot be greater than the height of the aquarium.";
            return result;
          } else {
            const fv = convertCm(fill_depth, fill_depth_unit);
            filled_volume = 0.5 * (l1 * l1 + 2 * l2 * l1 - l2 * l2) * fv;
            result.tech_filled_volume = filled_volume;
          }
        }
      } else {
        result.error = "Please! Check Input";
        return result;
      }
    } else if (shape == "11") {
      if (
        !isNaN(len_one) &&
        !isNaN(len_two) &&
        !isNaN(wid_one) &&
        !isNaN(wid_two) &&
        !isNaN(height)
      ) {
        const hv = convertCm(height, height_unit);
        const l1 = convertCm(len_one, len_one_unit);
        const l2 = convertCm(len_two, len_two_unit);
        const w1 = convertCm(wid_one, wid_one_unit);
        const w2 = convertCm(wid_two, wid_two_unit);
        volume = ((l1 - w2) * w1 + l2 * w2) * hv;

        if (fill_depth != "" && !isNaN(fill_depth)) {
          if (fill_depth > height) {
            result.error =
              "The fill depth cannot be greater than the height of the aquarium.";
            return result;
          } else {
            const fv = convertCm(fill_depth, fill_depth_unit);
            filled_volume = ((l1 - w2) * w1 + l2 * w2) * fv;
            result.tech_filled_volume = filled_volume;
          }
        }
      } else {
        result.error = "Please! Check Input";
        return result;
      }
    } else if (shape == "12") {
      if (!isNaN(len_one) && !isNaN(len_two) && !isNaN(height)) {
        const hv = convertCm(height, height_unit);
        const l1 = convertCm(len_one, len_one_unit);
        const l2 = convertCm(len_two, len_two_unit);
        volume = 0.5 * (l1 * l2 * hv);

        if (fill_depth != "" && !isNaN(fill_depth)) {
          if (fill_depth > height) {
            result.error =
              "The fill depth cannot be greater than the height of the aquarium.";
            return result;
          } else {
            const fv = convertCm(fill_depth, fill_depth_unit);
            filled_volume = 0.5 * (l1 * l2 * fv);
            result.tech_filled_volume = filled_volume;
          }
        }
      } else {
        result.error = "Please! Check Input";
        return result;
      }
    } else if (shape == "13") {
      if (
        !isNaN(length) &&
        !isNaN(width) &&
        !isNaN(height) &&
        !isNaN(full_width)
      ) {
        if (full_width > width) {
          const lv = convertCm(length, length_unit);
          const wv = convertCm(width, width_unit);
          const hv = convertCm(height, height_unit);
          const fw = convertCm(full_width, full_width_unit);
          const lvd = lv / 2;
          const diff = fw - wv;

          if (diff <= lvd) {
            volume = ((Math.PI * (lv / 2) * (fw - wv)) / 2 + lv * wv) * hv;
          } else {
            result.error =
              "The difference between full width and width should be smaller or equal to half of aquarium length";
            return result;
          }
        } else {
          result.error = "The full width should be greater than width";
          return result;
        }
      } else {
        result.error = "Please! Check Input";
        return result;
      }
    } else {
      result.error = "Invalid shape type";
      return result;
    }

    result.tech_volume = volume;
    return result;
  }

  /**
   * getCalculationPlantSpacingCalculator: Service Method
   * POST: /api/calculators-lol/plant-spacing
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationPlantSpacingCalculator(body) {
    const bed = body.tech_bed;
    const grid = body.tech_grid;
    const hedgerows = parseFloat(body.tech_hedgerows) || 0;
    const length = parseFloat(body.tech_length) || 0;
    const length_unit = body.tech_length_unit;
    const width = parseFloat(body.tech_width) || 0;
    const width_unit = body.tech_width_unit;
    const want = body.tech_want;
    const border = parseFloat(body.tech_border) || 0;
    const border_unit = body.tech_border_unit;
    const plant_spacing = parseFloat(body.tech_plant_spacing) || 0;
    const plant_spacing_unit = body.tech_plant_spacing_unit;
    const row_spacing = parseFloat(body.tech_row_spacing) || 0;
    const row_spacing_unit = body.tech_row_spacing_unit;
    const hedge = parseFloat(body.tech_hedge) || 0;
    const hedge_unit = body.tech_hedge_unit;
    const total_plants = parseFloat(body.tech_total_plants) || 0;
    const total_rows = parseFloat(body.tech_total_rows) || 0;
    const no_of_plant = parseFloat(body.tech_no_of_plant) || 0;
    const plant_price = parseFloat(body.tech_plant_price) || 0;

    const result = {};

    const convertToMeter = (unit, value) => {
      if (unit == "cm") {
        return value / 100;
      } else if (unit == "m") {
        return value;
      } else if (unit == "in") {
        return value / 39.37;
      } else if (unit == "ft") {
        return value / 3.281;
      } else if (unit == "yd") {
        return value / 1.094;
      } else if (unit == "dm") {
        return value / 10;
      }
      return value;
    };

    // Calculate total plant cost
    if (!isNaN(no_of_plant) && !isNaN(plant_price)) {
      const total_plant_cost = no_of_plant * plant_price;
      result.tech_total_plant_cost = total_plant_cost;
    } else {
      result.error = "Please! Check Your Input";
      return result;
    }

    if (bed == "grid") {
      if (grid == "square" || grid == "rectangular" || grid == "triangular") {
        if (!isNaN(length) && !isNaN(width) && !isNaN(border)) {
          const length_m = convertToMeter(length_unit, length);
          const width_m = convertToMeter(width_unit, width);
          const border_m = convertToMeter(border_unit, border);
          const area = length_m * width_m;

          if (grid == "square") {
            if (!isNaN(plant_spacing) && plant_spacing !== 0) {
              const plant_spacing_m = convertToMeter(
                plant_spacing_unit,
                plant_spacing
              );

              let plant_rows = 0;
              let plant_cols = 0;

              if (plant_spacing_m !== 0) {
                plant_rows = Math.ceil(
                  (length_m - border_m * 2) / plant_spacing_m
                );
                plant_cols = Math.ceil(
                  (width_m - border_m * 2) / plant_spacing_m
                );
              }

              const plants = plant_rows * plant_cols;

              result.tech_plant_rows = plant_rows;
              result.tech_plant_cols = plant_cols;
              result.tech_plants = plants;
              return result;
            } else {
              result.error = "Please! Check Your Input";
              return result;
            }
          } else if (grid == "triangular") {
            if (!isNaN(plant_spacing) && plant_spacing !== 0) {
              const plant_spacing_m = convertToMeter(
                plant_spacing_unit,
                plant_spacing
              );
              const row_spacing_calc = plant_spacing_m * 0.866;

              let odd_num_plant = 0;
              let evn_num_plant = 0;
              let total_rows_calc = 0;

              if (plant_spacing_m !== 0) {
                odd_num_plant = Math.floor(
                  (length_m - border_m * 2) / plant_spacing_m
                );
                evn_num_plant = Math.floor(
                  (length_m - border_m * 2 - plant_spacing_m * 0.5) /
                    plant_spacing_m
                );
              }

              if (row_spacing_calc !== 0) {
                total_rows_calc = Math.round(
                  (width_m - border_m * 2 - plant_spacing_m) /
                    row_spacing_calc +
                    1
                );
              }

              const evn_rows = Math.floor(total_rows_calc / 2);
              const odd_rows = Math.floor(total_rows_calc - evn_rows);
              const total_plants_calc =
                evn_num_plant * evn_rows + odd_num_plant * odd_rows;

              result.tech_total_plants = total_plants_calc;
              result.tech_total_rows = total_rows_calc;
              result.tech_row_spacing = Number(row_spacing_calc.toFixed(4));
              result.tech_plant_spacing_m = Number(plant_spacing_m.toFixed(4));
              result.tech_evn_rows = evn_rows;
              result.tech_odd_rows = odd_rows;
              result.tech_odd_num_plant = odd_num_plant;
              result.tech_evn_num_plant = evn_num_plant;
              return result;
            } else {
              result.error = "Please! Check Your Input";
              return result;
            }
          } else if (grid == "rectangular") {
            if (want == "amount") {
              if (
                !isNaN(row_spacing) &&
                !isNaN(plant_spacing) &&
                plant_spacing !== 0
              ) {
                const plant_spacing_m = convertToMeter(
                  plant_spacing_unit,
                  plant_spacing
                );
                const row_spacing_m = convertToMeter(
                  row_spacing_unit,
                  row_spacing
                );

                let plant_rows = 0;
                let plant_cols = 0;

                if (row_spacing_m !== 0) {
                  plant_rows = Math.ceil(
                    (length_m - border_m * 2) / row_spacing_m
                  );
                }

                if (plant_spacing_m !== 0) {
                  plant_cols = Math.ceil(
                    (width_m - border_m * 2) / plant_spacing_m
                  );
                }

                const plants = plant_rows * plant_cols;

                result.tech_plant_rows = plant_rows;
                result.tech_plant_cols = plant_cols;
                result.tech_plants = plants;
                return result;
              } else {
                result.error = "Please! Check Your Input";
                return result;
              }
            } else if (want == "arrange") {
              if (!isNaN(total_rows) && !isNaN(total_plants)) {
                const cols = total_plants / total_rows;
                const row_space = (length_m - border_m * 2) / total_rows;
                const plant_spacing_calc = (width_m - border_m * 2) / cols;

                result.tech_cols = cols;
                result.tech_row_space = Number(row_space.toFixed(4));
                result.tech_plant_spacing = Number(
                  plant_spacing_calc.toFixed(4)
                );
                return result;
              } else {
                result.error = "Please! Check Your Input";
                return result;
              }
            }
          }
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      }
    } else {
      if (want == "amount") {
        if (!isNaN(hedge) && !isNaN(plant_spacing) && !isNaN(hedgerows)) {
          const plant_spacing_m = convertToMeter(
            plant_spacing_unit,
            plant_spacing
          );
          const hedge_m = convertToMeter(hedge_unit, hedge);

          let plant_per_row = 0;
          if (plant_spacing_m !== 0) {
            plant_per_row = hedge_m / plant_spacing_m;
          }

          const total_plants_calc = Math.round(plant_per_row * hedgerows);

          result.tech_total_plants = total_plants_calc;
          return result;
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      } else {
        if (!isNaN(hedge) && !isNaN(total_plants) && !isNaN(hedgerows)) {
          const hedge_m = convertToMeter(hedge_unit, hedge);
          const plant_space = hedge_m / total_plants;
          const plant_per_row = Math.round(total_plants / hedgerows);

          result.tech_plant_space = plant_space;
          result.tech_plant_per_row = plant_per_row;
          return result;
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      }
    }

    // If no condition matched
    result.error = "Invalid input parameters";
    return result;
  }

  /**
   * getCalculationCBMCalculator: Service Method
   * POST: /api/calculators-lol/cbm-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationCBMCalculator(body) {
    let type = body.tech_type;
    let width = body.tech_width;
    let width_unit = body.tech_width_unit;
    let length = body.tech_length;
    let length_unit = body.tech_length_unit;
    let heigth = body.tech_heigth;
    let heigth_unit = body.tech_heigth_unit;
    let quantity = body.tech_quantity;
    let weight = body.tech_weight;
    let weight_unit = body.tech_weight_unit;

    const convertToCm = (unit, value) => {
      switch (unit) {
        case "m":
          return value * 100;
        case "mm":
          return value / 10;
        case "cm":
          return value;
        case "km":
          return value * 100000;
        case "in":
          return value * 2.54;
        case "ft":
          return value * 30.48;
        case "yd":
          return value * 91.44;
        case "mi":
          return value * 160934;
        default:
          return 0;
      }
    };

    const convertToMeter = (unit, value) => {
      switch (unit) {
        case "cm":
          return value / 100;
        case "mm":
          return value / 1000;
        case "m":
          return value;
        case "km":
          return value * 1000;
        case "in":
          return value / 39.37;
        case "ft":
          return value / 3.281;
        case "yd":
          return value / 1.094;
        case "mi":
          return value * 1609;
        default:
          return 0;
      }
    };

    const convertToKg = (unit, value) => {
      switch (unit) {
        case "ug":
          return value / 1e9;
        case "mg":
          return value / 1e6;
        case "g":
          return value / 1000;
        case "dag":
          return value / 100;
        case "lb":
          return value / 2.205;
        case "kg":
          return value;
        case "t":
          return value * 1000;
        case "gr":
          return value / 15432;
        case "dr":
          return value / 295;
        case "oz":
          return value / 35.274;
        case "stone":
          return value * 6.35;
        case "us-ton":
          return value * 907.2;
        case "long-ton":
          return value * 1016;
        case "earths":
          return value * 5.972e24;
        case "me":
          return value * 1.098e30;
        case "u":
          return value * 6.022e26;
        case "oz-t":
          return value / 32.151;
        default:
          return 0;
      }
    };

    const formatNumber = (value) => {
      return value.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    };

    const param = {};

    if (!isNaN(width) && !isNaN(length) && !isNaN(heigth) && !isNaN(quantity)) {
      const width_m = convertToMeter(width_unit, width);
      const length_m = convertToMeter(length_unit, length);
      const heigth_m = convertToMeter(heigth_unit, heigth);

      if (type === "basic") {
        const cbm = width_m * length_m * heigth_m * quantity;
        param.tech_cbm = formatNumber(cbm);
        return param;
      } else if (type === "advance") {
        if (!isNaN(weight)) {
          const width_cm = convertToCm(width_unit, width);
          const length_cm = convertToCm(length_unit, length);
          const heigth_cm = convertToCm(heigth_unit, heigth);
          const weight_kg = convertToKg(weight_unit, weight);

          const cbm = width_m * length_m * heigth_m;
          const total_cbm = cbm * quantity;
          const total_weight = weight_kg * quantity;
          const volumetric_weight = (width_cm * length_cm * heigth_cm) / 5000;
          const total_volumetric_weight = volumetric_weight * quantity;
          const size_20 = Math.floor(33.2 / cbm);
          const size_40 = Math.floor(67.67 / cbm);
          const size_40_hq = Math.floor(76.3 / cbm);
          const size_45_hq = Math.floor(88.4 / cbm);

          param.tech_cbm = formatNumber(cbm);
          param.tech_total_cbm = formatNumber(total_cbm);
          param.tech_total_weight = formatNumber(total_weight);
          param.tech_total_volumetric_weight = formatNumber(
            total_volumetric_weight
          );
          param.tech_size_20 = size_20;
          param.tech_size_40 = size_40;
          param.tech_size_40_hq = size_40_hq;
          param.tech_size_45_hq = size_45_hq;
          return param;
        } else {
          return { status: "error", message: "Please! Check Your Input" };
        }
      }
    } else {
      return { status: "error", message: "Please! Check Your Input" };
    }
  }

  /**
   * getCalculationBikeSizeCalculator: Service Method
   * POST: /api/calculators-lol/bike-size-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationBikeSizeCalculator(body) {
    let bike_for = body.tech_bike_for;
    let bike_type = body.tech_bike_type;
    let kids_age = body.tech_kids_age;
    let hight = body.tech_hight;
    let hight_unit = body.tech_hight_unit;
    let inseam_length = body.tech_inseam_length;
    let inseam_length_unit = body.tech_inseam_length_unit;

    function convertToCm(unit, value) {
      if (unit === "cm") return value;
      if (unit === "in") return value * 2.54;
      if (unit === "ft") return value * 30.48;
      if (unit === "mm") return value / 10;
      return null;
    }

    const param = {};

    if (bike_for) {
      if (bike_for === "kids") {
        if (kids_age) {
          let wheel_size, hight_result;

          if (kids_age === "2-3") {
            wheel_size = 12;
            hight_result = "86-102";
          } else if (kids_age === "2-4") {
            wheel_size = 14;
            hight_result = "94-109";
          } else if (kids_age === "4-6") {
            wheel_size = 16;
            hight_result = "109-122";
          } else if (kids_age === "5-8") {
            wheel_size = 20;
            hight_result = "114-130";
          } else if (kids_age === "8-11") {
            wheel_size = 24;
            hight_result = "122-135";
          } else if (kids_age === "11+") {
            wheel_size = 26;
            hight_result = "135-145";
          }

          param.tech_wheel_mm = (wheel_size * 25.4).toFixed(2);
          param.tech_wheel_cm = (wheel_size * 2.54).toFixed(2);
          param.tech_wheel_in = wheel_size;
          param.tech_wheel_ft = (wheel_size / 12).toFixed(2);
          param.tech_hight = hight_result;
          param.tech_kids_age = kids_age;
          return param;
        } else {
          return { error: "Please! Check Your Input" };
        }
      } else {
        if (bike_type && !isNaN(inseam_length) && !isNaN(hight)) {
          let inseam_cm = convertToCm(inseam_length_unit, inseam_length);
          let hight_cm = convertToCm(hight_unit, hight);

          let frame_size;
          if (["trekking", "city", "hybrid"].includes(bike_type)) {
            frame_size = inseam_cm * 0.64;
          } else if (bike_type === "road") {
            frame_size = inseam_cm * 0.67;
          } else if (bike_type === "mountain") {
            frame_size = inseam_cm * 0.67 - 11;
          }

          let crank_size_mm = inseam_cm * 1.25 + 65;

          param.tech_frame_mm = (frame_size * 10).toFixed(2);
          param.tech_frame_cm = frame_size.toFixed(2);
          param.tech_frame_in = (frame_size / 2.54).toFixed(2);
          param.tech_frame_ft = (frame_size / 30.48).toFixed(2);

          param.tech_crank_mm = crank_size_mm.toFixed(2);
          param.tech_crank_cm = (crank_size_mm / 10).toFixed(2);
          param.tech_crank_in = (crank_size_mm / 25.4).toFixed(2);
          param.tech_crank_ft = (crank_size_mm / 304.8).toFixed(2);

          param.tech_crank_dia_mm = (crank_size_mm * 2).toFixed(2);
          param.tech_crank_dia_cm = ((crank_size_mm / 10) * 2).toFixed(2);
          param.tech_crank_dia_in = ((crank_size_mm / 25.4) * 2).toFixed(2);
          param.tech_crank_dia_ft = ((crank_size_mm / 304.8) * 2).toFixed(2);

          param.tech_hight_mm = (hight_cm * 10).toFixed(2);
          param.tech_hight_cm = hight_cm.toFixed(2);
          param.tech_hight_in = (hight_cm / 2.54).toFixed(2);
          param.tech_hight_ft = (hight_cm / 30.48).toFixed(2);

          param.tech_inseam_mm = (inseam_cm * 10).toFixed(2);
          param.tech_inseam_cm = inseam_cm.toFixed(2);
          param.tech_inseam_in = (inseam_cm / 2.54).toFixed(2);
          param.tech_inseam_ft = (inseam_cm / 30.48).toFixed(2);
          return param;
        } else {
          return { error: "Please! Check Your Input" };
        }
      }
    } else {
      return { error: "Please! Check Your Input" };
    }
  }

  /**
   * getCalculationAcBtuCalculator: Service Method
   * POST: /api/calculators-lol/ac-btu-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationAcBtuCalculator(body) {
    let calculate = body.tech_calculate;
    let height = body.tech_height;
    let height_unit = body.tech_height_unit;
    let width = body.tech_width;
    let width_unit = body.tech_width_unit;
    let length = body.tech_length;
    let length_unit = body.ltech_ength_unit;
    let temperature = body.tech_temperature;
    let temperature_unit = body.tech_temperature_unit;
    let peoples = body.tech_peoples;
    let type = body.tech_type;
    let insulation_condition = body.tech_insulation_condition;
    let sun_exposure = body.tech_sun_exposure;
    let climate = body.tech_climate;

    function convertToFt(unit, value) {
      return unit === "m" ? value * 3.281 : value;
    }

    function formatNumber(num, decimals = 2) {
      return Number(num).toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
    }

    if (
      !isNaN(height) &&
      !isNaN(width) &&
      !isNaN(length) &&
      insulation_condition
    ) {
      let height_ft = convertToFt(height_unit, height);
      let width_ft = convertToFt(width_unit, width);
      let length_ft = convertToFt(length_unit, length);
      let area = width_ft * length_ft;

      let btu = 0;
      let total_btu = 0;

      if (calculate === "ac") {
        if (area <= 150) btu = 5000;
        else if (area <= 250) btu = 6000;
        else if (area <= 300) btu = 7000;
        else if (area <= 350) btu = 8000;
        else if (area <= 400) btu = 9000;
        else if (area <= 450) btu = 10000;
        else if (area <= 550) btu = 12000;
        else if (area <= 700) btu = 14000;
        else if (area <= 1000) btu = 18000;
        else if (area <= 1200) btu = 21000;
        else if (area <= 1500) btu = 24000;
        else if (area <= 2000) btu = 30000;
        else if (area <= 2500) btu = 34000;
        else btu = area * 20;

        total_btu = btu;

        if (height_ft > 8) {
          total_btu += (height_ft - 8) * 1000;
        }

        if (type && sun_exposure && climate && !isNaN(peoples)) {
          if (peoples > 2) {
            total_btu += (peoples - 2) * 600;
          }

          if (type === "living-room") total_btu += 1000;
          else if (type === "kitchen") total_btu += 4000;
          else if (type === "above-floor") total_btu += btu * 0.1;

          if (insulation_condition === "good") total_btu -= btu * 0.2;
          else if (insulation_condition === "poor") total_btu += btu * 0.2;

          if (sun_exposure === "shaded") total_btu -= btu * 0.1;
          else if (sun_exposure === "sunny") total_btu += btu * 0.1;

          if (climate === "cold") total_btu -= btu * 0.15;
          else if (climate === "hot") total_btu += btu * 0.2;
        } else {
          return { status: "error", message: "Please! Check Your Input" };
        }
      } else {
        if (temperature !== undefined && temperature !== null) {
          let temperature_f =
            temperature_unit === "cel"
              ? (temperature * 9) / 5 + 32
              : temperature;
          let final_temp = Math.abs(temperature_f - 30);

          btu = area * height_ft * final_temp * 0.135;
          total_btu = btu;

          if (insulation_condition === "good") total_btu -= btu * 0.4;
          else if (insulation_condition === "poor") total_btu = btu * 2.1;
        } else {
          return { status: "error", message: "Please! Check Your Input" };
        }
      }

      let ton = (total_btu / 12000).toFixed(2);
      let wattsValue = total_btu * 0.29307107017222;
      let kilowatts = (total_btu * 0.00029307107017222).toFixed(2);
      let hp_i = (total_btu * 0.0003930147789222).toFixed(2);
      let hp_e = hp_i;

      return {
        tech_ton: ton,
        tech_watts: formatNumber(wattsValue),
        tech_kilowatts: kilowatts,
        tech_hp_i: hp_i,
        tech_hp_e: hp_e,
        tech_total_btu: Math.round(total_btu),
      };
    } else {
      return { status: "error", message: "Please! Check Your Input" };
    }
  }

  /**
   * getCalculationGasCalculator: Service Method
   * POST: /api/calculators-lol/gas-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationGasCalculator(body) {
    const type = body.tech_type;
    const week_day = parseFloat(body.tech_week_day) || 0;
    const distance = parseFloat(body.tech_distance) || 0;
    const distance_unit = body.tech_distance_unit;
    const price = parseFloat(body.tech_price) || 0;
    const price_unit = body.tech_price_unit;
    const trip_type = parseFloat(body.tech_trip_type) || 0;
    const peoples = parseFloat(body.tech_peoples) || 0;
    const name_v1 = body.tech_name_v1;
    const fule_effi_v1 = parseFloat(body.tech_fule_effi_v1) || 0;
    const fule_effi_v1_unit = body.tech_fule_effi_v1_unit;
    const name_v2 = body.tech_name_v2;
    const fule_effi_v2 = parseFloat(body.tech_fule_effi_v2) || 0;
    const fule_effi_v2_unit = body.tech_fule_effi_v2_unit;
    const currancy = body.tech_currancy;

    const result = {};

    // Helper functions
    const convertToMile = (unit, value) => {
      if (unit == "km") {
        return value / 1.609;
      } else {
        return value;
      }
    };

    const convertToKm = (unit, value) => {
      if (unit == "mi") {
        return value * 1.609;
      } else {
        return value;
      }
    };

    const convertToMpg = (unit, value) => {
      if (unit == "kmpl") {
        return value * 2.352;
      } else {
        return value;
      }
    };

    const convertToKmpl = (unit, value) => {
      if (unit == "mpg") {
        return value / 2.352;
      } else {
        return value;
      }
    };

    // Remove currency symbol from price_unit
    const cleanPriceUnit = price_unit.replace(currancy, "");

    // Validate required inputs
    if (
      type &&
      trip_type &&
      name_v1 &&
      !isNaN(fule_effi_v2) &&
      name_v2 &&
      !isNaN(distance) &&
      !isNaN(week_day) &&
      !isNaN(price) &&
      !isNaN(fule_effi_v1)
    ) {
      let distance_f, fule_effi_v1_f, fule_effi_v2_f, price_f;

      if (distance_unit == "km") {
        distance_f = convertToKm(distance_unit, distance);
        fule_effi_v1_f = convertToKmpl(fule_effi_v1_unit, fule_effi_v1);
        fule_effi_v2_f = convertToKmpl(fule_effi_v2_unit, fule_effi_v2);
        price_f = cleanPriceUnit == " liter" ? price : price / 3.785;
      } else {
        distance_f = convertToMile(distance_unit, distance);
        fule_effi_v1_f = convertToMpg(fule_effi_v1_unit, fule_effi_v1);
        fule_effi_v2_f = convertToMpg(fule_effi_v2_unit, fule_effi_v2);
        price_f = cleanPriceUnit == " gallon" ? price : price * 3.785;
      }

      if (type == "first") {
        const fule_req = Number((distance_f / fule_effi_v1_f).toFixed(2));
        const fule_price_daily = Number((fule_req * price_f).toFixed(2));

        const fule_req_weekly = Number((fule_req * week_day).toFixed(2));
        const fule_price_weekly = Number(
          (fule_price_daily * week_day).toFixed(2)
        );

        const fule_req_biweekly = Number((fule_req_weekly * 2).toFixed(2));
        const fule_price_biweekly = Number((fule_price_weekly * 2).toFixed(2));

        const fule_req_monthly = Number((fule_req_weekly * 4.345).toFixed(2));
        const fule_price_monthly = Number(
          (fule_price_weekly * 4.345).toFixed(2)
        );

        const fule_req_yearly = Number((fule_req_weekly * 52).toFixed(2));
        const fule_price_yearly = Number((fule_price_weekly * 52).toFixed(2));

        if (peoples && !isNaN(peoples)) {
          const each_pay = Number((fule_price_daily / peoples).toFixed(2));
          result.tech_each_pay = each_pay;
        }

        result.tech_fule_req = fule_req;
        result.tech_fule_req_weekly = fule_req_weekly;
        result.tech_fule_req_biweekly = fule_req_biweekly;
        result.tech_fule_req_monthly = fule_req_monthly;
        result.tech_fule_req_yearly = fule_req_yearly;
        result.tech_fule_price_daily = fule_price_daily;
        result.tech_fule_price_weekly = fule_price_weekly;
        result.tech_fule_price_biweekly = fule_price_biweekly;
        result.tech_fule_price_monthly = fule_price_monthly;
        result.tech_fule_price_yearly = fule_price_yearly;
        return result;
      } else {
        const fule_req_v1 = Number(
          ((distance_f * trip_type) / fule_effi_v1_f).toFixed(2)
        );
        const price_price_v1 = Number((fule_req_v1 * price_f).toFixed(2));

        const fule_req_v2 = Number(
          ((distance_f * trip_type) / fule_effi_v2_f).toFixed(2)
        );
        const price_price_v2 = Number((fule_req_v2 * price_f).toFixed(2));

        const diff = Math.abs(price_price_v1 - price_price_v2);
        const weekly_saving = Number((diff * week_day).toFixed(2));
        const monthly_saving = Number((weekly_saving * 4.345).toFixed(2));
        const yearly_saving = Number((weekly_saving * 52).toFixed(2));

        result.tech_fule_req_v1 = fule_req_v1;
        result.tech_price_price_v1 = price_price_v1;
        result.tech_fule_req_v2 = fule_req_v2;
        result.tech_price_price_v2 = price_price_v2;
        result.tech_diff = diff;
        result.tech_weekly_saving = weekly_saving;
        result.tech_monthly_saving = monthly_saving;
        result.tech_yearly_saving = yearly_saving;
        return result;
      }
    } else {
      result.error = "Please! Check Your Input";
      return result;
    }
  }

  /**
   * getCalculationBlindSizeCalculator: Service Method
   * POST: /api/calculators-lol/blind-size-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationBlindSizeCalculator(body) {
    let type = body.tech_type?.trim();
    let top = parseFloat(body.tech_top);
    let t_units = body.tech_t_units?.trim();
    let width = parseFloat(body.tech_width);
    let w_units = body.tech_w_units?.trim();
    let bottom = parseFloat(body.tech_bottom);
    let b_units = body.tech_b_units?.trim();
    let h_left = parseFloat(body.tech_h_left);
    let l_units = body.tech_l_units?.trim();
    let h_center = parseFloat(body.tech_h_center);
    let c_units = body.tech_c_units?.trim();
    let h_right = parseFloat(body.tech_h_right);
    let r_units = body.tech_r_units?.trim();

    let param = {};

    if (!type) {
      param.error = "Please! Check Your Inputs";
      return param;
    }

    if (
      isNaN(top) ||
      isNaN(width) ||
      isNaN(bottom) ||
      isNaN(h_left) ||
      isNaN(h_center) ||
      isNaN(h_right)
    ) {
      param.error = "Please! Check Your Inputs";
      return param;
    }

    function convertToInches(value, unit) {
      if (unit === "mm") return value / 25.4;
      if (unit === "cm") return value / 2.54;
      if (unit === "ft") return value * 12;
      return value; // already in inches
    }

    top = convertToInches(top, t_units);
    width = convertToInches(width, w_units);
    bottom = convertToInches(bottom, b_units);
    h_left = convertToInches(h_left, l_units);
    h_center = convertToInches(h_center, c_units);
    h_right = convertToInches(h_right, r_units);

    let blind_width,
      blind_lenght,
      s_lenght = "";

    if (type === "inside") {
      blind_width = Math.min(top, width, bottom);
      blind_lenght = Math.min(h_left, h_center, h_right);
      s_lenght = blind_lenght - 0.25;
    } else if (type === "outside") {
      blind_width = Math.min(top, width, bottom) + 3;
      blind_lenght = Math.min(h_left, h_center, h_right) + 1.5;
    }

    param.tech_type = type;
    param.tech_blind_width = +blind_width.toFixed(2);
    param.tech_blind_lenght = +blind_lenght.toFixed(2);
    param.tech_s_lenght = s_lenght !== "" ? +s_lenght.toFixed(2) : "";

    return param;
  }

  /**
   * TireSizeCalculator: Service Method
   * POST: /api/calculators-lol/tire-size-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async TireSizeCalculator(data) {
    try {
      const { compare_with_another_tire } = data;

      // ========== HELPER FUNCTIONS ==========

      // Convert any unit to mm
      const convertToMm = (value, unit) => {
        const conversions = {
          mm: 1,
          cm: 10,
          in: 25.4,
        };
        return value * (conversions[unit] || 1);
      };

      // Convert mm to all units
      const convertFromMm = (valueMm) => {
        return {
          mm: valueMm,
          cm: valueMm / 10,
          in: valueMm / 25.4,
          ft: valueMm / 304.8,
        };
      };

      // Format tire construction type
      const formatConstruction = (construction) => {
        const constructionTypes = {
          radial: "Radial (R)",
          bias_belt: "Bias Belt (B)",
          diagonal: "Diagonal (D)",
          letter_not_present: "Not Specified",
        };
        return constructionTypes[construction] || "Not Specified";
      };

      // Format circumference with all unit options
      const formatCircumference = (circumferenceMm) => {
        const ftTotal = circumferenceMm / 304.8;
        const ftWhole = Math.floor(ftTotal);
        const inRemainder = Math.round((ftTotal - ftWhole) * 12);

        const mTotal = circumferenceMm / 1000;
        const mWhole = Math.floor(mTotal);
        const cmRemainder = Math.round((mTotal - mWhole) * 100);

        return {
          mm: circumferenceMm.toFixed(2),
          cm: (circumferenceMm / 10).toFixed(2),
          m: (circumferenceMm / 1000).toFixed(2),
          in: (circumferenceMm / 25.4).toFixed(2),
          ft: (circumferenceMm / 304.8).toFixed(2),
          yd: (circumferenceMm / 914.4).toFixed(2),
          "ft / in": `${ftWhole} ft ${inRemainder} in`,
          "m / cm": `${mWhole} m ${cmRemainder} cm`,
        };
      };

      // Calculate tire properties
      const calculateTire = (
        width,
        widthUnit,
        profileRatio,
        wheelDiameter,
        wheelDiameterUnit
      ) => {
        // Convert everything to mm
        const widthMm = convertToMm(width, widthUnit);
        const wheelDiameterMm = convertToMm(wheelDiameter, wheelDiameterUnit);

        // Formula: sidewall_height = (width × profile_ratio) / 100
        const sidewallHeightMm = (widthMm * profileRatio) / 100;

        // Formula: tire_diameter = wheel_diameter + (2 × sidewall_height)
        const tireDiameterMm = wheelDiameterMm + 2 * sidewallHeightMm;

        // Formula: circumference = π × tire_diameter
        const circumferenceMm = Math.PI * tireDiameterMm;

        // Revolutions per km and mile
        const revsPerKm = 1000000 / circumferenceMm; // 1 km = 1,000,000 mm
        const revsPerMi = 1609344 / circumferenceMm; // 1 mile = 1,609,344 mm

        return {
          sidewall_height_mm: sidewallHeightMm,
          tire_diameter_mm: tireDiameterMm,
          circumference_mm: circumferenceMm,
          revs_per_km: revsPerKm,
          revs_per_mi: revsPerMi,
        };
      };

      // ========== CONDITION 1: SINGLE TIRE ==========
      if (compare_with_another_tire === "no") {
        const {
          width,
          width_unit,
          profile_ratio,
          tire_construction,
          wheel_diameter,
          wheel_diameter_unit,
        } = data;

        // Validate inputs
        if (!width || !profile_ratio || !wheel_diameter) {
          return {
            status: "error",
            error: "Width, profile ratio, and wheel diameter are required.",
          };
        }

        // Calculate tire properties
        const result = calculateTire(
          width,
          width_unit,
          profile_ratio,
          wheel_diameter,
          wheel_diameter_unit
        );

        // Convert to all units
        const tireDiameter = convertFromMm(result.tire_diameter_mm);
        const sidewallHeight = convertFromMm(result.sidewall_height_mm);
        const circumference = formatCircumference(result.circumference_mm);

        return {
          status: "success",
          tire_info: {
            width: `${width} ${width_unit}`,
            profile_ratio: `${profile_ratio}%`,
            construction: formatConstruction(tire_construction),
            wheel_diameter: `${wheel_diameter} ${wheel_diameter_unit}`,
          },
          tire_diameter: {
            mm: tireDiameter.mm.toFixed(2),
            cm: tireDiameter.cm.toFixed(2),
            in: tireDiameter.in.toFixed(2),
            ft: tireDiameter.ft.toFixed(2),
          },
          sidewall_height: {
            mm: sidewallHeight.mm.toFixed(2),
            cm: sidewallHeight.cm.toFixed(2),
            in: sidewallHeight.in.toFixed(2),
          },
          circumference: circumference,
          revolutions: {
            "revs/km": result.revs_per_km.toFixed(2),
            "revs/mi": result.revs_per_mi.toFixed(2),
          },
        };
      }

      // ========== CONDITION 2: TIRE COMPARISON ==========
      else if (compare_with_another_tire === "yes") {
        const {
          width_one,
          width_one_unit,
          profile_ratio_one,
          tire_construction_one,
          wheel_diameter_one,
          wheel_diameter_one_unit,
          width_two,
          width_two_unit,
          profile_ratio_two,
          tire_construction_two,
          wheel_diameter_two,
          wheel_diameter_two_unit,
          speedometer_reading,
          speedometer_reading_unit,
        } = data;

        // Validate inputs
        if (
          !width_one ||
          !profile_ratio_one ||
          !wheel_diameter_one ||
          !width_two ||
          !profile_ratio_two ||
          !wheel_diameter_two
        ) {
          return {
            status: "error",
            error: "All tire parameters are required for comparison.",
          };
        }

        // Calculate both tires
        const tire1 = calculateTire(
          width_one,
          width_one_unit,
          profile_ratio_one,
          wheel_diameter_one,
          wheel_diameter_one_unit
        );

        const tire2 = calculateTire(
          width_two,
          width_two_unit,
          profile_ratio_two,
          wheel_diameter_two,
          wheel_diameter_two_unit
        );

        // Convert tire 1 to all units
        const tire1Diameter = convertFromMm(tire1.tire_diameter_mm);
        const tire1SidewallHeight = convertFromMm(tire1.sidewall_height_mm);
        const tire1Circumference = formatCircumference(tire1.circumference_mm);

        // Convert tire 2 to all units
        const tire2Diameter = convertFromMm(tire2.tire_diameter_mm);
        const tire2SidewallHeight = convertFromMm(tire2.sidewall_height_mm);
        const tire2Circumference = formatCircumference(tire2.circumference_mm);

        // Calculate differences (tire2 - tire1)
        const diameterDifferenceMm =
          tire2.tire_diameter_mm - tire1.tire_diameter_mm;
        const diameterDifferenceAbs = convertFromMm(
          Math.abs(diameterDifferenceMm)
        );

        // Percentage difference (can be negative)
        const diameterDifferencePercent = (
          (diameterDifferenceMm / tire1.tire_diameter_mm) *
          100
        ).toFixed(1);

        // Speedometer correction
        const speedometerValue = parseFloat(speedometer_reading || 100);
        const actualSpeedRatio =
          tire2.tire_diameter_mm / tire1.tire_diameter_mm;
        const actualSpeed = speedometerValue * actualSpeedRatio;

        // Convert speed units
        let actualSpeedKmh, actualSpeedMph;
        if (speedometer_reading_unit === "km/h") {
          actualSpeedKmh = actualSpeed;
          actualSpeedMph = actualSpeed / 1.60934;
        } else {
          actualSpeedMph = actualSpeed;
          actualSpeedKmh = actualSpeed * 1.60934;
        }

        // Check if difference is within safe range
        const isWithinSafeRange =
          Math.abs(parseFloat(diameterDifferencePercent)) <= 2.5;
        const safetyNote = isWithinSafeRange
          ? "✓ Within safe range (±2.5%)"
          : "⚠ Exceeds recommended difference (±2.5%)";

        return {
          status: "success",
          tire_one: {
            tire_info: {
              width: `${width_one} ${width_one_unit}`,
              profile_ratio: `${profile_ratio_one}%`,
              construction: formatConstruction(tire_construction_one),
              wheel_diameter: `${wheel_diameter_one} ${wheel_diameter_one_unit}`,
            },
            tire_diameter: {
              mm: tire1Diameter.mm.toFixed(0),
              cm: tire1Diameter.cm.toFixed(2),
              in: tire1Diameter.in.toFixed(2),
              ft: tire1Diameter.ft.toFixed(2),
            },
            sidewall_height: {
              mm: tire1SidewallHeight.mm.toFixed(1),
              cm: tire1SidewallHeight.cm.toFixed(2),
              in: tire1SidewallHeight.in.toFixed(2),
            },
            circumference: tire1Circumference,
            revolutions: {
              "revs/km": tire1.revs_per_km.toFixed(0),
              "revs/mi": tire1.revs_per_mi.toFixed(0),
            },
          },
          tire_two: {
            tire_info: {
              width: `${width_two} ${width_two_unit}`,
              profile_ratio: `${profile_ratio_two}%`,
              construction: formatConstruction(tire_construction_two),
              wheel_diameter: `${wheel_diameter_two} ${wheel_diameter_two_unit}`,
            },
            tire_diameter: {
              mm: tire2Diameter.mm.toFixed(0),
              cm: tire2Diameter.cm.toFixed(2),
              in: tire2Diameter.in.toFixed(2),
              ft: tire2Diameter.ft.toFixed(2),
            },
            sidewall_height: {
              mm: tire2SidewallHeight.mm.toFixed(1),
              cm: tire2SidewallHeight.cm.toFixed(2),
              in: tire2SidewallHeight.in.toFixed(2),
            },
            circumference: tire2Circumference,
            revolutions: {
              "revs/km": tire2.revs_per_km.toFixed(0),
              "revs/mi": tire2.revs_per_mi.toFixed(0),
            },
          },
          difference: {
            diameter_difference: {
              mm: diameterDifferenceMm.toFixed(0),
              cm: (diameterDifferenceMm / 10).toFixed(2),
              in: (diameterDifferenceMm / 25.4).toFixed(2),
            },
            diameter_difference_percent: `${diameterDifferencePercent}%`,
            is_safe: isWithinSafeRange,
            note: safetyNote,
          },
          speedometer_difference: {
            speedometer_reading: `${speedometer_reading || 100} ${
              speedometer_reading_unit || "km/h"
            }`,
            actual_speed: {
              "km/h": actualSpeedKmh.toFixed(2),
              mph: actualSpeedMph.toFixed(2),
            },
            speed_difference: {
              "km/h": (
                actualSpeedKmh -
                (speedometer_reading_unit === "km/h"
                  ? speedometerValue
                  : speedometerValue * 1.60934)
              ).toFixed(2),
              mph: (
                actualSpeedMph -
                (speedometer_reading_unit === "mph"
                  ? speedometerValue
                  : speedometerValue / 1.60934)
              ).toFixed(2),
            },
          },
        };
      }

      // ========== INVALID INPUT ==========
      else {
        return {
          status: "error",
          error: 'Invalid compare_with_another_tire value. Use "yes" or "no".',
        };
      }
    } catch (error) {
      return {
        status: "error",
        error: error.message || "Something went wrong in tire calculation.",
      };
    }
  }

  /**
   * getCalculationAverageTimeCalculator: Service Method
   * POST: /api/calculators-lol/average-time-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationAverageTimeCalculator(body) {
    let count_val = parseInt(body.tech_count_val);
    let inhour = body.tech_inhour;
    let inminutes = body.tech_inminutes;
    let inseconds = body.tech_inseconds;
    let inmiliseconds = body.tech_inmiliseconds;
    let checkbox1 = body.tech_checkbox1;
    let checkbox2 = body.tech_checkbox2;
    let checkbox3 = body.tech_checkbox3;
    let checkbox4 = body.tech_checkbox4;

    let param = {};
    let hour_list = [];
    let min_list = [];
    let sec_list = [];
    let mili_list = [];
    let hoursminsandsecs = [];

    // Helper functions
    function calc_time(times) {
      let total = 0;
      for (let time of times) {
        let [h, m, s] = time.split(":").map(Number);
        total += h * 3600 + m * 60 + s;
      }
      return total;
    }

    function avg_time(times) {
      let total = calc_time(times);
      let avg = Math.round(total / times.length);
      let h = Math.floor(avg / 3600);
      avg %= 3600;
      let m = Math.floor(avg / 60);
      let s = avg % 60;
      return [
        h.toString().padStart(2, "0"),
        m.toString().padStart(2, "0"),
        s.toString().padStart(2, "0"),
      ];
    }

    for (let i = 0; i < count_val; i++) {
      let hour =
        checkbox1 === false ? 0 : inhour[i] === "" ? 0 : parseFloat(inhour[i]);
      let minute =
        checkbox2 === false
          ? 0
          : inminutes[i] === ""
          ? 0
          : parseFloat(inminutes[i]);
      let second =
        checkbox3 === false
          ? 0
          : inseconds[i] === ""
          ? 0
          : parseFloat(inseconds[i]);
      let milisecond =
        checkbox4 === false
          ? 0
          : inmiliseconds[i] === ""
          ? 0
          : parseFloat(inmiliseconds[i]);

      if (isNaN(hour) || isNaN(minute) || isNaN(second) || isNaN(milisecond)) {
        param.error = "Please! Check Your Input";
        return param;
      }

      hour_list.push(hour);
      min_list.push(minute);
      sec_list.push(second);
      mili_list.push(milisecond);

      let total_seconds = hour * 3600 + minute * 60 + second;
      let hours = Math.floor(total_seconds / 3600);
      let mins = Math.floor((total_seconds % 3600) / 60);
      let secs = Math.floor(total_seconds % 60);
      hoursminsandsecs.push(
        `${hours.toString().padStart(2, "0")}:${mins
          .toString()
          .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
      );
    }

    let [hr, min, s] = avg_time(hoursminsandsecs);
    let total_milliseconds = mili_list.reduce((sum, val) => sum + val, 0);
    let avg_milliseconds = total_milliseconds / mili_list.length;

    param.tech_hour_list = hour_list;
    param.tech_min_list = min_list;
    param.tech_sec_list = sec_list;
    param.tech_mili_list = mili_list;
    param.tech_time_hour = hr;
    param.tech_time_minutes = min;
    param.tech_time_seconds = s;
    param.tech_time_miliseconds = avg_milliseconds;

    return param;
  }

  /**
   * getCalculationHourlyPayCalculator: Service Method
   * POST: /api/calculators-lol/hourly-pay-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationHourlyPayCalculator(body) {
    let paytype = parseFloat(body.tech_paytype);
    let status = body.tech_status;
    let paidtype = body.tech_paidtype;
    let working = body.tech_working;
    let grosspay = body.tech_grosspay;
    let wage = body.tech_wage;
    let overtimeType = body.tech_overtimeType;
    let h_over = body.tech_h_over;
    let w_over = body.tech_w_over;

    let param = {};
    let weekly_salary = [];
    let salaries = [];
    let overtimes = [];

    function calculateFederalTax(income, filingStatus, standardDeduction) {
      const federalTaxBrackets = {
        single: [
          [0, 11000, 0.1],
          [11000, 44725, 0.12],
          [44725, 95375, 0.22],
          [95375, 182100, 0.24],
          [182100, 231250, 0.32],
          [231250, 578125, 0.35],
          [578125, Infinity, 0.37],
        ],
        married: [
          [0, 22000, 0.1],
          [22000, 89450, 0.12],
          [89450, 190750, 0.22],
          [190750, 364200, 0.24],
          [364200, 462500, 0.32],
          [462500, 693750, 0.35],
          [693750, Infinity, 0.37],
        ],
        head_of_household: [
          [0, 15700, 0.1],
          [15700, 59850, 0.12],
          [59850, 95350, 0.22],
          [95350, 182100, 0.24],
          [182100, 231250, 0.32],
          [231250, 578100, 0.35],
          [578100, Infinity, 0.37],
        ],
      };

      let taxableIncome = income - standardDeduction;
      if (taxableIncome <= 0) return 0;

      let tax = 0;
      for (let [lower, upper, rate] of federalTaxBrackets[filingStatus]) {
        if (taxableIncome > lower) {
          let amountInBracket = Math.min(taxableIncome, upper) - lower;
          tax += amountInBracket * rate;
          if (taxableIncome <= upper) break;
        }
      }
      return tax;
    }

    if (paytype && status) {
      for (let i = 0; i < paidtype.length; i++) {
        if (paidtype[i] === "hourly") {
          if (!isNaN(working[i]) && !isNaN(wage[i])) {
            let weekly = working[i] * wage[i];
            weekly_salary.push(weekly);
            salaries.push(weekly);
          } else {
            param.error = "Please! Check Your Input.";
            return param;
          }
        } else {
          if (grosspay[i] === "per_year") {
            if (!isNaN(wage[i])) {
              let weekly = wage[i] / paytype;
              weekly_salary.push(weekly);
              salaries.push(weekly);
            } else {
              param.error = "Please! Check Your Input.";
              return param;
            }
          } else {
            if (!isNaN(wage[i])) {
              weekly_salary.push(wage[i]);
              salaries.push(wage[i]);
            } else {
              param.error = "Please! Check Your Input.";
              return param;
            }
          }
        }
      }

      for (let j = 0; j < overtimeType.length; j++) {
        if (overtimeType[j] && !isNaN(h_over[j]) && !isNaN(w_over[j])) {
          let overtimeRate = overtimeType[j] === "overtime" ? 1.5 : 2;
          let overtimePay = h_over[j] * w_over[j] * overtimeRate;
          weekly_salary.push(overtimePay);
          overtimes.push(overtimePay);
        }
      }

      let total_weekly_salary = weekly_salary.reduce((a, b) => a + b, 0);
      let annualSalary = total_weekly_salary * paytype;

      let medicareTax =
        (annualSalary * 0.0145) / (annualSalary / total_weekly_salary);
      let socialSecurityTax = Math.min(annualSalary, 160200) * 0.062;
      socialSecurityTax =
        socialSecurityTax / (annualSalary / total_weekly_salary);

      let standardDeduction = 13850;
      let federalTax = calculateFederalTax(
        annualSalary,
        status,
        standardDeduction
      );
      federalTax = federalTax / (annualSalary / total_weekly_salary);
      if (federalTax > 2) federalTax -= 2;

      let total_tax = medicareTax + socialSecurityTax + federalTax;
      let take_home = total_weekly_salary - total_tax;

      param.tech_salaries = salaries;
      param.tech_overtimes = overtimes;
      param.tech_weekly_salary = weekly_salary;
      param.tech_total_weekly_salary = parseFloat(
        total_weekly_salary.toFixed(2)
      );
      param.tech_annualSalary = parseFloat(annualSalary.toFixed(2));
      param.tech_medicareTax = parseFloat(medicareTax.toFixed(2));
      param.tech_socialSecurityTax = Math.round(socialSecurityTax);
      param.tech_federalTax = parseFloat(federalTax.toFixed(2));
      param.tech_total_tax = parseFloat(total_tax.toFixed(2));
      param.tech_take_home = parseFloat(take_home.toFixed(2));

      return param;
    } else {
      param.error = "Please! Check Your Input.";
      return param;
    }
  }

  /** getCalculationLogWeightCalculator
   * POST: /api/calculators-lol/hourly-pay-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationLogWeightCalculator(body) {
    let category = body.tech_category;
    let woodSelector = body.tech_woodSelector;
    let small_end = body.tech_small_end;
    let small_unit = body.tech_small_unit;
    let large_end = body.tech_large_end;
    let large_unit = body.tech_large_unit;
    let length = body.tech_length;
    let length_unit = body.tech_length_unit;
    let stack_w = body.tech_stack_w;
    let stackw_unit = body.tech_stackw_unit;
    let stack_h = body.tech_stack_h;
    let stackh_unit = body.tech_stackh_unit;
    let custom = body.tech_custom;
    let custom_unit = body.tech_custom_unit;
    let submit = body.tech_submit;

    woodSelector = woodSelector?.replace("@", "");

    if (!submit) {
      return { error: "Please check your input" };
    }

    function convertToSm(a, unit) {
      const conversions = {
        cm: 1,
        m: 100,
        in: 2.54,
        ft: 30.48,
        yd: 91.44,
        mm: 0.1,
      };
      return a * (conversions[unit] || 1);
    }

    function calculateToLb(a, unit) {
      const conversions = {
        kg: 2.20462,
        lb: 1,
        st: 14,
        us_tom: 2000,
        l_ton: 2240,
      };
      return a * (conversions[unit] || 1);
    }

    function unitToFt(a, unit) {
      const conversions = {
        "kg/m³": 0.062428,
        "lb/ft": 1,
        "lb/yd": 0.037037037,
        "g/cm³": 62.427961,
        "kg/cm³": 62427.960591578,
        "g/m³": 0.000062427961,
      };
      return a * (conversions[unit] || 1);
    }

    let dm_of_mid, volume, weight, quantity_stack, weight_stack;

    if (category === "log") {
      if (!isNaN(small_end)) {
        let ds = convertToSm(small_end, small_unit);
        let dl = convertToSm(large_end, large_unit);
        let len = convertToSm(length, length_unit);
        let custom_val = unitToFt(custom, custom_unit);
        let stackWidth = convertToSm(stack_w, stackw_unit);
        let stackHeight = convertToSm(stack_h, stackh_unit);

        dm_of_mid = (ds + ds) / 2;
        volume = len * ((Math.PI * dm_of_mid * dm_of_mid) / 4) * 0.000035315;
        volume = parseFloat(volume.toFixed(7));

        weight =
          woodSelector === "custom"
            ? volume * custom_val
            : volume * parseFloat(woodSelector);

        stackWidth /= ds;
        stackHeight /= dl;

        quantity_stack = stackWidth * stackHeight;
        weight_stack = quantity_stack * weight;
      } else {
        return { error: "Please check your input" };
      }
    } else if (category === "board") {
      if (!isNaN(small_end) && !isNaN(large_end)) {
        let ds = convertToSm(small_end, small_unit);
        let dl = convertToSm(large_end, large_unit);
        let len = convertToSm(length, length_unit);
        let custom_val = unitToFt(custom, custom_unit);
        let stackWidth = convertToSm(stack_w, stackw_unit);
        let stackHeight = convertToSm(stack_h, stackh_unit);

        dm_of_mid = (ds + ds) / 2;
        volume = len * ds * dl * 0.000035315;
        volume = parseFloat(volume.toFixed(7));

        weight =
          woodSelector === "custom"
            ? volume * custom_val
            : volume * parseFloat(woodSelector);

        stackWidth /= ds;
        stackHeight /= dl;

        quantity_stack = stackWidth * stackHeight;
        weight_stack = quantity_stack * weight;
      } else {
        return { error: "Please check your input" };
      }
    }

    return {
      tech_dm_of_mid: dm_of_mid,
      tech_volume: volume,
      tech_weight: weight,
      tech_quantity_stack: quantity_stack,
      tech_weight_stack: weight_stack,
    };
  }

  /** getCalculationWaterWeightCalculator
   * POST: /api/calculators-lol/hourly-pay-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationWaterWeightCalculator(body) {
    let from = parseFloat(body.tech_from);
    let vol = parseFloat(body.tech_vol);
    let temp = parseFloat(body.tech_temp);

    if (isFinite(from) && isFinite(vol) && isFinite(temp)) {
      let ans = (1.0e16 / (from / vol)) * temp;
      let lbs = ans * 0.0022;
      let onz = ans * 0.03527396195;
      let kg = ans * 0.001;

      return {
        tech_gram: ans,
        tech_lbs: lbs,
        tech_onz: onz,
        tech_kg: kg,
      };
    } else {
      return {
        error: "Please! Check Your Inputs",
      };
    }
  }

  /** getCalculationTurkeySizeCalculator
   * POST: /api/calculators-lol/turkey-size-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationTurkeySizeCalculator(body) {
    let adults = parseFloat(body.tech_adults);
    let children = parseFloat(body.tech_children);
    let leftovers = body.tech_leftovers;

    function convertToHoursMins(time, format = "%02d hrs %02d mins") {
      if (time < 1) return null;
      let hours = Math.floor(time / 60);
      let minutes = Math.round(time % 60);
      return format
        .replace("%02d", String(hours).padStart(2, "0"))
        .replace("%02d", String(minutes).padStart(2, "0"));
    }

    if (
      isFinite(adults) &&
      adults >= 0 &&
      isFinite(children) &&
      children >= 0
    ) {
      let mul1, mul2, turkey_weight;

      if (leftovers === "no") {
        mul1 = adults;
        mul2 = 0.5 * children;
      } else {
        mul1 = adults * 1.5;
        mul2 = 0.75 * children;
      }

      turkey_weight = mul1 + mul2;
      let inside_fridge = turkey_weight * 5;
      let cold_water = turkey_weight;
      let unstuffed_turkey = convertToHoursMins(turkey_weight * 15);
      let stuffed_turkey = convertToHoursMins(turkey_weight * 17.5);

      return {
        tech_turkey_weight: turkey_weight,
        tech_inside_fridge: inside_fridge,
        tech_cold_water: cold_water,
        tech_unstuffed_turkey: unstuffed_turkey,
        tech_stuffed_turkey: stuffed_turkey,
      };
    } else if (adults < 0) {
      return { error: "Number of adults cannot be lower than 0." };
    } else if (children < 0) {
      return { error: "Number of children cannot be lower than 0." };
    } else {
      return { error: "Please! Check Your Inputs" };
    }
  }

  /**
   * getCalculationHowManyPagesCalculator: Service Method
   * POST: /api/calculators-lol/how-many-pages-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationHowManyPagesCalculator(body) {
    const page = parseFloat(body.tech_page) || 0;
    const size = body.tech_size;
    const font = body.tech_font;
    const space = body.tech_space;
    const page2 = parseFloat(body.tech_page2) || 0;
    const title = body.tech_title;
    const lang = body.tech_lang;
    const main = parseInt(body.tech_main) || 0;

    const result = {};

    if (main == 1) {
      const fontSize = body.tech_size;
      const fontStyle = body.tech_font;
      const spacing = body.tech_space;
      const totalWords = parseFloat(body.tech_page) || 0;

      const data = {
        Times: {
          10: { single: 900, 1.5: 600, double: 400 },
          11: { single: 650, 1.5: 440, double: 320 },
          12: { single: 650, 1.5: 400, double: 300 },
          13: { single: 470, 1.5: 320, double: 220 },
          14: { single: 475, 1.5: 300, double: 230 },
        },
        Calibri: {
          10: { single: 900, 1.5: 560, double: 400 },
          11: { single: 600, 1.5: 385, double: 280 },
          12: { single: 650, 1.5: 400, double: 300 },
          13: { single: 435, 1.5: 270, double: 210 },
          14: { single: 430, 1.5: 300, double: 200 },
        },
        Courier: {
          10: { single: 650, 1.5: 450, double: 300 },
          12: { single: 450, 1.5: 310, double: 250 },
          13: { single: 325, 1.5: 210, double: 160 },
          14: { single: 350, 1.5: 220, double: 170 },
        },
        Garamond: {
          10: { single: 1000, 1.5: 630, double: 480 },
          11: { single: 680, 1.5: 460, double: 320 },
          12: { single: 700, 1.5: 450, double: 310 },
          13: { single: 500, 1.5: 320, double: 220 },
          14: { single: 500, 1.5: 310, double: 240 },
        },
        Verdana: {
          10: { single: 750, 1.5: 480, double: 370 },
          11: { single: 500, 1.5: 325, double: 220 },
          12: { single: 500, 1.5: 310, double: 230 },
          13: { single: 350, 1.5: 220, double: 170 },
          14: { single: 370, 1.5: 240, double: 200 },
        },
        Arial: {
          10: { single: 890, 1.5: 600, double: 400 },
          11: { single: 600, 1.5: 410, double: 310 },
          12: { single: 600, 1.5: 360, double: 260 },
          13: { single: 430, 1.5: 285, double: 210 },
          14: { single: 460, 1.5: 280, double: 200 },
        },
        Helvetica: {
          10: { single: 750, 1.5: 500, double: 480 },
          11: { single: 635, 1.5: 440, double: 320 },
          12: { single: 560, 1.5: 360, double: 280 },
          13: { single: 460, 1.5: 320, double: 220 },
          14: { single: 400, 1.5: 260, double: 190 },
        },
        "Century Gothic": {
          10: { single: 600, 1.5: 430, double: 310 },
          11: { single: 490, 1.5: 360, double: 220 },
          12: { single: 560, 1.5: 280, double: 210 },
          13: { single: 380, 1.5: 220, double: 190 },
          14: { single: 315, 1.5: 200, double: 150 },
        },
        Candara: {
          10: { single: 670, 1.5: 460, double: 350 },
          11: { single: 550, 1.5: 385, double: 280 },
          12: { single: 590, 1.5: 315, double: 220 },
          13: { single: 420, 1.5: 260, double: 190 },
          14: { single: 350, 1.5: 220, double: 170 },
        },
        Cambria: {
          10: { single: 710, 1.5: 490, double: 360 },
          11: { single: 590, 1.5: 400, double: 300 },
          12: { single: 490, 1.5: 320, double: 220 },
          13: { single: 435, 1.5: 270, double: 190 },
          14: { single: 380, 1.5: 220, double: 170 },
        },
      };

      // Check if font style and size exist in data
      if (!data[fontStyle] || !data[fontStyle][fontSize]) {
        result.error = "Invalid font style or size";
        return result;
      }

      const wordsPerPage = data[fontStyle][fontSize][spacing];

      if (!isNaN(totalWords) && totalWords > 0) {
        if (wordsPerPage && wordsPerPage > 0) {
          const pages = Math.ceil(totalWords / wordsPerPage);
          result.tech_counter = pages;
        } else {
          result.error = "Invalid spacing value";
          return result;
        }
      } else {
        result.error = "Please add Number of Words";
        return result;
      }
      return result;
    } else {
      if (title != "Empty" && page2 != "" && page2 != 0) {
        result.error =
          "Please choose either a title or a Enter length (not both).";
        return result;
      } else {
        let counter = 0;

        if (title == "Empty") {
          if (!page2 || page2 == 0) {
            result.error =
              "Please choose either a title or a Enter length (not both).";
            return result;
          } else {
            counter = page2 / 242;
          }
        } else if (title == "Quran") {
          counter = 604;
        } else if (title == "Bible") {
          counter = 1120;
        } else if (title == "Gatsby") {
          counter = 218;
        } else if (title == "Harry") {
          counter = 3407;
        } else if (title == "Av_noval") {
          counter = 300;
        } else if (title == "Hobbit") {
          counter = 310;
        } else if (title == "Rings") {
          counter = 1191;
        } else if (title == "Peace") {
          counter = 1225;
        } else if (title == "Pride") {
          counter = 248;
        } else if (title == "Rich") {
          counter = 336;
        } else if (title == "War") {
          counter = 1400;
        } else if (title == "Great_Ex") {
          counter = 544;
        } else if (title == "Shakespearean") {
          counter = 444;
        } else {
          result.error = "Invalid title selected";
          return result;
        }

        result.tech_counter = Number(counter.toFixed(0));
        return result;
      }
    }
  }

  /**
   * getCalculationHowManyWordsCalculator: Service Method
   * POST: /api/calculators-lol/how-many-words-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationHowManyWordsCalculator(body) {
    const page = parseFloat(body.tech_page) || 0;
    const size = body.tech_size;
    const font = body.tech_font;
    const space = body.tech_space;
    const page2 = parseFloat(body.tech_page2) || 0;
    const title = body.tech_title;
    const sp_title = body.tech_sp_title;
    const lang = body.tech_lang;
    const main = parseInt(body.tech_main) || 0;

    const result = {};

    if (main == 1) {
      const fontSize = body.tech_size;
      const fontStyle = body.tech_font;
      const spacing = body.tech_space;
      let wordCount = 0;

      const data = {
        Times: {
          10: { single: 900, 1.5: 600, double: 400 },
          11: { single: 650, 1.5: 440, double: 320 },
          12: { single: 650, 1.5: 400, double: 300 },
          13: { single: 470, 1.5: 320, double: 220 },
          14: { single: 475, 1.5: 300, double: 230 },
        },
        Calibri: {
          10: { single: 900, 1.5: 560, double: 400 },
          11: { single: 600, 1.5: 385, double: 280 },
          12: { single: 650, 1.5: 400, double: 300 },
          13: { single: 435, 1.5: 270, double: 210 },
          14: { single: 430, 1.5: 300, double: 200 },
        },
        Courier: {
          10: { single: 650, 1.5: 450, double: 300 },
          12: { single: 450, 1.5: 310, double: 250 },
          13: { single: 325, 1.5: 210, double: 160 },
          14: { single: 350, 1.5: 220, double: 170 },
        },
        Garamond: {
          10: { single: 1000, 1.5: 630, double: 480 },
          11: { single: 680, 1.5: 460, double: 320 },
          12: { single: 700, 1.5: 450, double: 310 },
          13: { single: 500, 1.5: 320, double: 220 },
          14: { single: 500, 1.5: 310, double: 240 },
        },
        Verdana: {
          10: { single: 750, 1.5: 480, double: 370 },
          11: { single: 500, 1.5: 325, double: 220 },
          12: { single: 500, 1.5: 310, double: 230 },
          13: { single: 350, 1.5: 220, double: 170 },
          14: { single: 370, 1.5: 240, double: 200 },
        },
        Arial: {
          10: { single: 890, 1.5: 600, double: 400 },
          11: { single: 600, 1.5: 410, double: 310 },
          12: { single: 600, 1.5: 360, double: 260 },
          13: { single: 430, 1.5: 285, double: 210 },
          14: { single: 460, 1.5: 280, double: 200 },
        },
        Helvetica: {
          10: { single: 750, 1.5: 500, double: 480 },
          11: { single: 635, 1.5: 440, double: 320 },
          12: { single: 560, 1.5: 360, double: 280 },
          13: { single: 460, 1.5: 320, double: 220 },
          14: { single: 400, 1.5: 260, double: 190 },
        },
        "Century Gothic": {
          10: { single: 600, 1.5: 430, double: 310 },
          11: { single: 490, 1.5: 360, double: 220 },
          12: { single: 560, 1.5: 280, double: 210 },
          13: { single: 380, 1.5: 220, double: 190 },
          14: { single: 315, 1.5: 200, double: 150 },
        },
        Candara: {
          10: { single: 670, 1.5: 460, double: 350 },
          11: { single: 550, 1.5: 385, double: 280 },
          12: { single: 590, 1.5: 315, double: 220 },
          13: { single: 420, 1.5: 260, double: 190 },
          14: { single: 350, 1.5: 220, double: 170 },
        },
        Cambria: {
          10: { single: 710, 1.5: 490, double: 360 },
          11: { single: 590, 1.5: 400, double: 300 },
          12: { single: 490, 1.5: 320, double: 220 },
          13: { single: 435, 1.5: 270, double: 190 },
          14: { single: 380, 1.5: 220, double: 170 },
        },
      };

      if (page && !isNaN(page)) {
        // Check if font data exists
        if (
          data[fontStyle] &&
          data[fontStyle][fontSize] &&
          data[fontStyle][fontSize][spacing]
        ) {
          const wordsPerPage = data[fontStyle][fontSize][spacing];
          wordCount = wordsPerPage * page;
        } else {
          result.error = "Invalid font style, size, or spacing";
          return result;
        }
      } else {
        result.error = "Please add Number of Pages";
        return result;
      }

      result.tech_counter = wordCount;
      return result;
    } else if (main == 2) {
      if (title != "Empty" && page2 != "" && page2 != 0) {
        result.error =
          "Please choose either a title or a Enter length (not both).";
        return result;
      } else {
        let counter = 0;

        if (title == "Empty") {
          if (!page2 || isNaN(page2)) {
            result.error =
              "Please choose either a title or a Enter length (not both).";
            return result;
          } else {
            counter = page2 * 242;
          }
        } else if (title == "Quran") {
          counter = 77439;
        } else if (title == "Bible") {
          counter = 783137;
        } else if (title == "Gatsby") {
          counter = 47094;
        } else if (title == "Harry") {
          counter = 1084170;
        } else if (title == "Av_noval") {
          counter = 90000;
        } else if (title == "Hobbit") {
          counter = 95022;
        } else if (title == "Rings") {
          counter = 455125;
        } else if (title == "Peace") {
          counter = 587287;
        } else if (title == "Pride") {
          counter = 122204;
        } else if (title == "Rich") {
          counter = 72000;
        } else if (title == "War") {
          counter = 587287;
        } else if (title == "Great_Ex") {
          counter = 132500;
        } else if (title == "Shakespearean") {
          counter = 29551;
        } else {
          result.error = "Invalid title selected";
          return result;
        }

        result.tech_counter = counter.toLocaleString();
        return result;
      }
    } else if (main == 3) {
      const currentTitle = sp_title;

      if (currentTitle != "Empty" && page2 != "" && page2 != 0) {
        result.error =
          "Please choose either a title or a Enter length (not both).";
        return result;
      } else {
        let counter = 0;

        if (currentTitle == "Empty") {
          if (!page2 || isNaN(page2)) {
            result.error =
              "Please choose either a title or a Enter length (not both).";
            return result;
          } else {
            counter = page2 * 130;
          }
        } else if (currentTitle == "Perfect") {
          counter = 4891;
        } else if (currentTitle == "Gettysburg") {
          counter = 272;
        } else if (currentTitle == "Dream") {
          counter = 1667;
        } else if (currentTitle == "Beaches") {
          counter = 3855;
        } else {
          result.error = "Invalid special title selected";
          return result;
        }

        result.tech_counter = counter.toLocaleString();
        return result;
      }
    } else if (main == 4) {
      let counter = 0;

      if (lang == "English") {
        counter = 170000;
      } else if (lang == "French") {
        counter = 70000;
      } else if (lang == "German") {
        counter = 145000;
      } else if (lang == "Russian") {
        counter = 150000;
      } else if (lang == "Spanish") {
        counter = 93000;
      } else if (lang == "Japanese") {
        counter = 500000;
      } else if (lang == "Korean") {
        counter = 511282;
      } else if (lang == "Portuguese") {
        counter = 818000;
      } else if (lang == "Swedish") {
        counter = 600000;
      } else if (lang == "Italian") {
        counter = 500000;
      } else if (lang == "Hindi") {
        counter = 183175;
      } else if (lang == "Urdu") {
        counter = 286563;
      } else if (lang == "Arabic") {
        counter = 170000;
      } else if (lang == "Turkish") {
        counter = 316000;
      } else if (lang == "Chinese") {
        counter = 370000;
      } else {
        result.error = "Invalid language selected";
        return result;
      }

      result.tech_counter = counter.toLocaleString();
      return result;
    } else {
      result.error = "Invalid main mode selected";
      return result;
    }
  }
}

module.exports = new CalculatorsServices();
