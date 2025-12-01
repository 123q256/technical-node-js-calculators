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








  
}

module.exports = new CalculatorsServices();
