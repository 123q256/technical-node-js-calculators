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
   * getCalculationDateCalculator: Service Method
   * POST: /api/calculators-lol/date-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationDateCalculator(body) {
    try {
      let dateTypes = body.dateTypes;
      // Date Duration fields
      let s_date_duration = body.s_date_duration;
      let e_date_duration = body.e_date_duration;
      let checkbox_duration = body.checkbox_duration;
      // Date Calculator fields
      let add_date_date = body.add_date_date;
      let date_method = body.date_method;
      let date_years = body.date_years;
      let date_months = body.date_months;
      let date_weeks = body.date_weeks;
      let date_days = body.date_days;
      let repeat = body.repeat;
      let add_hrs_f = body.add_hrs_f;
      let add_min_f = body.add_min_f;
      let add_sec_f = body.add_sec_f;
      let add_hrs_s = body.add_hrs_s;
      let add_min_s = body.add_min_s;
      let add_sec_s = body.add_sec_s;
      // Simple/Advanced fields
      let sim_adv = body.sim_adv;
      let s_date = body.s_date;
      let e_date = body.e_date;
      let add_date = body.add_date;
      let method = body.method;
      let years = body.years;
      let months = body.months;
      let weeks = body.weeks;
      let days = body.days;
      let end_inc = body.end_inc;
      let sat_inc = body.sat_inc;
      let holiday_c = body.holiday_c;
      let weekend_c = body.weekend_c;
      let cal_bus = body.cal_bus;
      let ex_in = body.ex_in;
      let satting = body.satting;
      // Weekday checkboxes
      let sun = body.sun;
      let mon = body.mon;
      let tue = body.tue;
      let wed = body.wed;
      let thu = body.thu;
      let fri = body.fri;
      let sat = body.sat;
      // Holiday checkboxes
      let nyd = body.nyd;
      let ind = body.ind;
      let vetd = body.vetd;
      let cheve = body.cheve;
      let chirs = body.chirs;
      let nye = body.nye;
      let mlkd = body.mlkd;
      let psd = body.psd;
      let memd = body.memd;
      let labd = body.labd;
      let cold = body.cold;
      let thankd = body.thankd;
      let blkf = body.blkf;
      // Custom holidays
      let total_i = body.total_i;
      let total_j = body.total_j;
      let d = body.d;
      let m = body.m;
      let n = body.n;

      const locale = body.locale || "en";

      if (locale !== "en") {
        // Date Duration Calculation
        if (dateTypes === "date_duration") {
          return this.calculateDateDuration({
            s_date_duration,
            e_date_duration,
            checkbox_duration,
          });
        }

        // Date Calculator
        else if (dateTypes === "date_calculator") {
          return this.calculateDateWithTime({
            add_date: add_date_date,
            method: date_method,
            years: date_years,
            months: date_months,
            weeks: date_weeks,
            days: date_days,
            repeat: repeat,
            add_hrs_f: add_hrs_f,
            add_min_f: add_min_f,
            add_sec_f: add_sec_f,
            add_hrs_s: add_hrs_s,
            add_min_s: add_min_s,
            add_sec_s: add_sec_s,
          });
        }

        // Simple/Advanced Calculator
        else {
          if (sim_adv === "simple") {
            return this.calculateSimpleDate({
              s_date: s_date,
              e_date: e_date,
              end_inc: end_inc,
              sat_inc: sat_inc,
              holiday_c: holiday_c,
              ex_in: ex_in,
              satting: satting,
              sun: sun,
              mon: mon,
              tue: tue,
              wed: wed,
              thu: thu,
              fri: fri,
              sat: sat,
              nyd: nyd,
              ind: ind,
              vetd: vetd,
              cheve: cheve,
              chirs: chirs,
              nye: nye,
              mlkd: mlkd,
              psd: psd,
              memd: memd,
              labd: labd,
              cold: cold,
              thankd: thankd,
              blkf: blkf,
              total_i: total_i,
              total_j: total_j,
              d: d,
              m: m,
              n: n,
            });
          } else if (cal_bus) {
            return this.calculateBusinessDays({
              add_date: add_date,
              days: days,
              method: method,
              weekend_c: weekend_c,
              nyd: nyd,
              ind: ind,
              vetd: vetd,
              cheve: cheve,
              chirs: chirs,
              nye: nye,
              mlkd: mlkd,
              psd: psd,
              memd: memd,
              labd: labd,
              cold: cold,
              thankd: thankd,
              blkf: blkf,
              total_j: total_j,
              d: d,
              m: m,
              n: n,
            });
          } else if (sim_adv === "advance") {
            return this.calculateAdvancedDate({
              add_date: add_date,
              method: method,
              years: years,
              months: months,
              weeks: weeks,
              days: days,
            });
          }
        }
      } else {
        // English locale - Date Calculator
        return this.calculateDateWithTime({
          add_date: add_date,
          method: method,
          years: years,
          months: months,
          weeks: weeks,
          days: days,
          repeat: repeat,
          add_hrs_f: add_hrs_f,
          add_min_f: add_min_f,
          add_sec_f: add_sec_f,
          add_hrs_s: add_hrs_s,
          add_min_s: add_min_s,
          add_sec_s: add_sec_s,
        });
      }

      return { error: "Invalid request" };
    } catch (error) {
      console.error("Date Calculator Error:", error);
      return { error: "An error occurred during calculation" };
    }
  }
  // Date Duration Calculation
  calculateDateDuration({
    s_date_duration,
    e_date_duration,
    checkbox_duration,
  }) {
    if (!s_date_duration || !e_date_duration) {
      return { error: "Please! Check Your Input.1111" };
    }

    let startDate = s_date_duration;
    let endDate = e_date_duration;

    if (checkbox_duration) {
      endDate = moment(e_date_duration).add(1, "day").format("YYYY-MM-DD");
    }

    const start = moment(startDate);
    const end = moment(endDate);

    const duration = moment.duration(end.diff(start));

    const years = duration.years();
    const months = duration.months();
    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    return {
      RESULT: 1,
      from: start.format("MMM DD, YYYY"),
      to: end.format("MMM DD, YYYY"),
      years: years,
      months: months,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }
  // Date Calculator with Time
  calculateDateWithTime({
    add_date,
    method,
    years = 0,
    months = 0,
    weeks = 0,
    days = 0,
    repeat = 1,
    add_hrs_f = 0,
    add_min_f = 0,
    add_sec_f = 0,
    add_hrs_s = 0,
    add_min_s = 0,
    add_sec_s = 0,
  }) {
    if (!add_date || !method) {
      return { error: "Please! Check Your Input." };
    }

    const hasTime =
      add_hrs_f ||
      add_min_f ||
      add_sec_f ||
      add_hrs_s ||
      add_min_s ||
      add_sec_s;

    // Initialize base date with time if provided
    let baseDate = moment(add_date);

    if (hasTime) {
      baseDate
        .hour(parseInt(add_hrs_f) || 0)
        .minute(parseInt(add_min_f) || 0)
        .second(parseInt(add_sec_f) || 0);
    }

    const fromDate = baseDate.format(
      hasTime ? "dddd, MMM DD, YYYY hh:mm:ss A" : "dddd, MMM DD, YYYY"
    );
    const results = [];

    // Clone base date for iterations
    let currentDate = baseDate.clone();

    for (let i = 0; i < repeat; i++) {
      if (method === "add") {
        currentDate.add({
          years: parseInt(years) || 0,
          months: parseInt(months) || 0,
          weeks: parseInt(weeks) || 0,
          days: parseInt(days) || 0,
          hours: parseInt(add_hrs_s) || 0,
          minutes: parseInt(add_min_s) || 0,
          seconds: parseInt(add_sec_s) || 0,
        });
      } else {
        currentDate.subtract({
          years: parseInt(years) || 0,
          months: parseInt(months) || 0,
          weeks: parseInt(weeks) || 0,
          days: parseInt(days) || 0,
          hours: parseInt(add_hrs_s) || 0,
          minutes: parseInt(add_min_s) || 0,
          seconds: parseInt(add_sec_s) || 0,
        });
      }

      // Clone current date to avoid mutation issues
      results.push(
        currentDate
          .clone()
          .format(
            hasTime ? "dddd, MMM DD, YYYY hh:mm:ss A" : "dddd, MMM DD, YYYY"
          )
      );
    }

    return {
      RESULT: 1,
      from: fromDate,
      method: method,
      years: String(years).padStart(2, "0"),
      months: String(months).padStart(2, "0"),
      weeks: String(weeks).padStart(2, "0"),
      days: String(days).padStart(2, "0"),
      ans: results,
      repeat: String(repeat),
      ...(hasTime && {
        add_hrs_f: String(add_hrs_f).padStart(2, "0"),
        add_min_f: String(add_min_f).padStart(2, "0"),
        add_sec_f: String(add_sec_f).padStart(2, "0"),
        add_hrs_s: String(add_hrs_s).padStart(2, "0"),
        add_min_s: String(add_min_s).padStart(2, "0"),
        add_sec_s: String(add_sec_s).padStart(2, "0"),
      }),
    };
  }
  // Simple Date Calculation (with workdays/holidays)
  calculateSimpleDate(params) {
    // const { s_date, e_date, end_inc } = params;
    let s_date = params.s_date;
    let e_date = params.e_date;
    let end_inc = params.end_inc;

    if (!s_date || !e_date) {
      return { error: "Please enter start and end date" };
    }

    let startDate = moment(s_date);
    let endDate = moment(e_date);

    if (end_inc) {
      endDate.add(1, "day");
    }

    const workdaysData = this.getWorkdays(startDate, endDate, params);

    const duration = moment.duration(endDate.diff(startDate));

    return {
      from: startDate.format("MMM DD, YYYY"),
      to: endDate.format("MMM DD, YYYY"),
      count_days: "active",
      years: duration.years(),
      months: duration.months(),
      days: duration.days(),
      hours: duration.hours(),
      minutes: duration.minutes(),
      seconds: duration.seconds(),
      getworkdays: workdaysData,
      t_days:
        workdaysData.workdays + workdaysData.weekend + workdaysData.holidays,
      ...workdaysData.extraData,
    };
  }

  // Business Days Calculator
  calculateBusinessDays(params) {
    // const { add_date, days, method, weekend_c } = params;
    let add_date = params.add_date;
    let days = params.days;
    let method = params.method;
    let weekend_c = params.weekend_c;

    if (!isNaN(days) && add_date) {
      let date = moment(add_date);
      let businessDays = parseInt(days);
      let weekends = 0;
      let holidays = 0;

      if (weekend_c === "no") {
        // Skip weekends
        const direction = method === "+" ? 1 : -1;
        let count = 0;

        while (count < businessDays) {
          date.add(direction, "days");
          const dayOfWeek = date.day();

          if (dayOfWeek === 0 || dayOfWeek === 6) {
            weekends++;
          } else {
            count++;
          }
        }
      } else {
        // Include holidays logic here
        const holidaysList = this.getHolidaysList(params, date.year());
        // Implementation similar to PHP version
      }

      return {
        from: moment(add_date).format("dddd, MMM DD, YYYY"),
        from_s: moment(add_date).format("MMM DD, YYYY"),
        date: date.format("dddd, MMM DD, YYYY"),
        date_e: date.format("MMM DD, YYYY"),
        holidays: holidays,
        weekends: weekends,
      };
    }

    return { error: "Please Check Your Input" };
  }

  // Advanced Date Calculation
  calculateAdvancedDate({
    add_date,
    method,
    years = 0,
    months = 0,
    weeks = 0,
    days = 0,
  }) {
    if (!isNaN(years) || !isNaN(months) || !isNaN(weeks) || !isNaN(days)) {
      const date = moment(add_date);
      const operation = method === "+" ? "add" : "subtract";

      date[operation]({
        years: parseInt(years) || 0,
        months: parseInt(months) || 0,
        weeks: parseInt(weeks) || 0,
        days: parseInt(days) || 0,
      });

      const description = `${
        method === "+" ? "Added" : "Subtracted"
      } ${years} years, ${months} months, ${weeks} weeks, ${days} days`;

      return {
        from: moment(add_date).format("dddd, MMM DD, YYYY"),
        from_s: moment(add_date).format("MMM DD, YYYY"),
        add_days: "active",
        date: date.format("dddd, MMM DD, YYYY"),
        des: description,
      };
    }

    return { error: "Please Check Your Input" };
  }

  // Get Workdays Helper
  getWorkdays(startDate, endDate, params) {
    // const { sat_inc, holiday_c } = params;
    let sat_inc = params.sat_inc;
    let holiday_c = params.holiday_c;

    let workdays = 0;
    let weekend = 0;
    let holidays = 0;
    const holidayDates = [];

    if (holiday_c === "yes") {
      // Build holiday list
      const holidaysList = this.getHolidaysList(
        params,
        startDate.year(),
        endDate.year()
      );

      // Count days
      let current = startDate.clone();
      while (current.isSameOrBefore(endDate)) {
        const dayOfWeek = current.day();
        const isWeekend = dayOfWeek === 0 || (dayOfWeek === 6 && !sat_inc);
        const isHoliday = holidaysList.some((h) =>
          current.isSame(h.date, "day")
        );

        if (isWeekend) {
          weekend++;
        } else if (isHoliday) {
          holidays++;
          holidayDates.push(current.format("dddd, MMM DD, YYYY"));
        } else {
          workdays++;
        }

        current.add(1, "day");
      }
    } else {
      // Simple calculation without holidays
      let current = startDate.clone();
      while (current.isSameOrBefore(endDate)) {
        const dayOfWeek = current.day();
        const isWeekend = dayOfWeek === 0 || (dayOfWeek === 6 && !sat_inc);

        if (isWeekend) {
          weekend++;
        } else {
          workdays++;
        }

        current.add(1, "day");
      }
    }

    return {
      workdays: workdays,
      weekend: weekend,
      holidays: holidays,
      get_holi: holidayDates,
      extraData: {},
    };
  }

  // Get Holidays List
  getHolidaysList(params, startYear, endYear = startYear) {
    const holidays = [];
    // const { nyd, ind, vetd, cheve, chirs, nye, mlkd, psd, memd, labd, cold, thankd, blkf } = params;
    let nyd = params.nyd;
    let ind = params.ind;
    let vetd = params.vetd;
    let cheve = params.cheve;
    let chirs = params.chirs;
    let nye = params.nye;
    let mlkd = params.mlkd;
    let psd = params.psd;
    let memd = params.memd;
    let labd = params.labd;
    let cold = params.cold;
    let thankd = params.thankd;
    let blkf = params.blkf;

    for (let year = startYear; year <= endYear; year++) {
      // Fixed date holidays
      if (nyd)
        holidays.push({
          date: moment(`${year}-01-01`),
          name: "New Year's Day",
        });
      if (ind)
        holidays.push({
          date: moment(`${year}-07-04`),
          name: "Independence Day",
        });
      if (vetd)
        holidays.push({ date: moment(`${year}-11-11`), name: "Veteran's Day" });
      if (cheve)
        holidays.push({ date: moment(`${year}-12-24`), name: "Christmas Eve" });
      if (chirs)
        holidays.push({ date: moment(`${year}-12-25`), name: "Christmas" });
      if (nye)
        holidays.push({
          date: moment(`${year}-12-31`),
          name: "New Year's Eve",
        });

      // Floating holidays
      if (mlkd)
        holidays.push({
          date: this.getNthWeekday(year, 0, 1, 3),
          name: "M. L. King Day",
        });
      if (psd)
        holidays.push({
          date: this.getNthWeekday(year, 1, 1, 3),
          name: "President's Day",
        });
      if (memd)
        holidays.push({
          date: this.getNthWeekday(year, 4, 1, -1),
          name: "Memorial Day",
        });
      if (labd)
        holidays.push({
          date: this.getNthWeekday(year, 8, 1, 1),
          name: "Labor Day",
        });
      if (cold)
        holidays.push({
          date: this.getNthWeekday(year, 9, 1, 2),
          name: "Columbus Day",
        });
      if (thankd)
        holidays.push({
          date: this.getNthWeekday(year, 10, 4, 4),
          name: "Thanksgiving",
        });
      if (blkf)
        holidays.push({
          date: this.getNthWeekday(year, 10, 5, 4),
          name: "Black Friday",
        });
    }

    return holidays;
  }

  // Get Nth Weekday of Month
  getNthWeekday(year, month, weekday, n) {
    // month: 0-11, weekday: 0-6 (0=Sunday), n: 1-5 or -1 for last
    const date = moment({ year, month, day: 1 });

    if (n === -1) {
      // Last occurrence
      date.endOf("month");
      while (date.day() !== weekday) {
        date.subtract(1, "day");
      }
    } else {
      // Nth occurrence
      let count = 0;
      while (count < n) {
        if (date.day() === weekday) count++;
        if (count < n) date.add(1, "day");
      }
    }

    return date;
  }

  /**
   * getCalculationTimeCalculator: Service Method
   * POST: /api/calculators-lol/time-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationTimeCalculator(body) {
    const locale = body.locale || "en";
    let submitt;
    if (locale == "en") {
      return handleEnglishLocale(body);
    } else {
      return handleUrduLocale(body);
    }

    function handleEnglishLocale(body) {
      const submitt = body.tech_sim_adv;

      if (submitt === "time_first") {
        return calculateTimeAddSubtract(body);
      } else if (submitt === "time_second") {
        return calculateDateTimeAddSubtract(body);
      } else if (submitt === "time_third") {
        return calculateTimeExpression(body);
      } else {
        return { error: "please check your input" };
      }
    }

    function calculateTimeAddSubtract(body) {
      let t_days = body.tech_t_days;
      let t_hours = body.tech_t_hours;
      let t_min = body.tech_t_min;
      let t_sec = body.tech_t_sec;
      let t_method = body.tech_t_method;
      let te_days = body.tech_te_days;
      let te_hours = body.tech_te_hours;
      let te_min = body.tech_te_min;
      let te_sec = body.tech_te_sec;

      // Validation for time 1
      if (!t_days && !t_hours && !t_min && !t_sec) {
        return { error: "Please enter any input at time 1" };
      }

      // Set defaults
      t_days = t_days || 0;
      t_hours = t_hours || 0;
      t_min = t_min || 0;
      t_sec = t_sec || 0;

      // Validation for time 2
      if (!te_days && !te_hours && !te_min && !te_sec) {
        return { error: "Please enter any input at time 2" };
      }

      te_days = te_days || 0;
      te_hours = te_hours || 0;
      te_min = te_min || 0;
      te_sec = te_sec || 0;

      let seconds, min, hour, days, method;

      if (t_method === "plus") {
        seconds = parseInt(t_sec) + parseInt(te_sec);
        min = parseInt(t_min) + parseInt(te_min);
        hour = parseInt(t_hours) + parseInt(te_hours);
        days = parseInt(t_days) + parseInt(te_days);

        while (seconds >= 60) {
          min += 1;
          seconds -= 60;
        }
        while (min >= 60) {
          hour += 1;
          min -= 60;
        }
        while (hour >= 24) {
          days += 1;
          hour -= 24;
        }
        method = "+";
      } else {
        t_days = parseInt(t_days);
        t_hours = parseInt(t_hours);
        t_min = parseInt(t_min);
        t_sec = parseInt(t_sec);
        te_days = parseInt(te_days);
        te_hours = parseInt(te_hours);
        te_min = parseInt(te_min);
        te_sec = parseInt(te_sec);

        if (t_days > te_days) {
          if (te_sec > t_sec) {
            t_sec += 60;
            t_min -= 1;
          }
          if (te_min > t_min) {
            t_min += 60;
            t_hours -= 1;
          }
          if (te_hours > t_hours) {
            t_hours += 24;
            t_days -= 1;
          }
        }

        seconds = t_sec - te_sec;
        min = t_min - te_min;
        hour = t_hours - te_hours;
        days = t_days - te_days;

        while (seconds >= 60) {
          min += 1;
          seconds -= 60;
        }
        while (min >= 60) {
          hour += 1;
          min -= 60;
        }
        while (hour >= 24) {
          days += 1;
          hour -= 24;
        }
        method = "-";
      }

      let totalDays = min + seconds / 60;
      totalDays = hour + totalDays / 60;
      totalDays = days + totalDays / 24;

      const totalHours = totalDays * 24;
      const totalMin = totalDays * 24 * 60;
      const totalSec = totalDays * 24 * 60 * 60;

      return {
        tech_submitt: submitt,
        tech_t_method: method,
        tech_t_sec: parseInt(body.t_sec) || 0,
        tech_t_min: parseInt(body.t_min) || 0,
        tech_t_hours: parseInt(body.t_hours) || 0,
        tech_t_days: parseInt(body.t_days) || 0,
        tech_te_sec: parseInt(body.te_sec) || 0,
        tech_te_min: parseInt(body.te_min) || 0,
        tech_te_hours: parseInt(body.te_hours) || 0,
        tech_te_days: parseInt(body.te_days) || 0,
        tech_totalDays: totalDays,
        tech_totalHours: totalHours,
        tech_totalMin: totalMin,
        tech_totalSec: totalSec,
        tech_seconds: seconds,
        tech_min: min,
        tech_hour: hour,
        tech_days: days,
      };
    }

    function calculateDateTimeAddSubtract(body) {
      let td_date = body.tech_td_date;
      let t_hours = body.tech_t_hours;
      let t_min = body.tech_t_min;
      let t_sec = body.tech_t_sec;
      let td_method = body.tech_td_method;
      let td_days = body.tech_td_days;
      let td_hours = body.tech_td_hours;
      let td_min = body.tech_td_min;
      let td_sec = body.tech_td_sec;
      let am_pm = body.tech_am_pm;

      if (!isNumeric(t_hours) || !isNumeric(t_min) || !isNumeric(t_sec)) {
        return { error: "Please provide a valid start time." };
      }

      if (!td_date) {
        return { error: "Please! Enter Start Date." };
      }

      // Default values
      const addSec = parseInt(td_sec) || 0;
      const addMin = parseInt(td_min) || 0;
      const addHours = parseInt(td_hours) || 0;
      const addDays = parseInt(td_days) || 0;

      // Time string banao - t_hours, t_min, t_sec se (NOT ts_hours!)
      let time;
      if (am_pm == "am" || am_pm == "pm") {
        time = `${t_hours}:${t_min}:${t_sec} ${am_pm}`;
      } else {
        time = `${t_hours}:${t_min}:${t_sec}`;
      }

      const date = td_date;
      const dateTime = date;

      // Method set karo
      let method;
      if (td_method == "plus") {
        method = "add";
      } else {
        method = "subtract";
      }

      // Laravel format: strtotime("$dateTime $time ...")
      let resDate = moment(`${dateTime} ${time}`, "YYYY-MM-DD h:m:s A");

      // Add/Subtract in exact Laravel sequence
      resDate = resDate[method](addDays, "days");
      resDate = resDate[method](addHours, "hours");
      resDate = resDate[method](addMin, "minutes");
      resDate = resDate[method](addSec, "seconds");

      // Format output
      const finalDate = resDate.format("MMMM, DD, YYYY");
      const resDay = resDate.format("dddd");
      let resTime = resDate.format("hh:mm:ss A");

      if (am_pm == "24") {
        resTime = resDate.format("HH:mm:ss");
      }

      return {
        tech_finalDate: finalDate,
        tech_resTime: resTime,
        tech_resDay: resDay,
      };
    }

    function calculateTimeExpression(body) {
      let input = body.tech_input;

      if (!input) {
        return { error: "please check your input" };
      }

      const components = input.split(/\s*([\+\-\*\/])\s*/);
      let totalDuration = 0; // Total duration in seconds

      for (let i = 0; i < components.length; i++) {
        const part = components[i];

        if (i % 2 === 0) {
          const matches = [...part.matchAll(/(\d+)([dhms])/g)];
          let duration = 0;

          for (const match of matches) {
            const value = parseInt(match[1]);
            const unit = match[2];

            switch (unit) {
              case "d":
                duration += value * 86400;
                break;
              case "h":
                duration += value * 3600;
                break;
              case "m":
                duration += value * 60;
                break;
              case "s":
                duration += value;
                break;
            }
          }

          if (i === 0 || components[i - 1] === "+") {
            totalDuration += duration;
          } else if (components[i - 1] === "-") {
            totalDuration -= duration;
          } else if (components[i - 1] === "*" || components[i - 1] === "/") {
            return { error: "please check your input" };
          }
        }
      }

      const days = Math.floor(totalDuration / 86400);
      const hours = Math.floor((totalDuration % 86400) / 3600);
      const minutes = Math.floor((totalDuration % 3600) / 60);
      const seconds = totalDuration % 60;

      const totleresult = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      const secondsResult = totalDuration;
      const mintsResult = totalDuration / 60;
      const hoursResult = totalDuration / 3600;
      const daysResult = totalDuration / 86400;

      return {
        tech_totleresult: totleresult,
        tech_days: days,
        tech_hours: hours,
        tech_minutes: minutes,
        tech_seconds: seconds,
        tech_secondsResult: secondsResult,
        tech_mintsResult: mintsResult,
        tech_hoursResult: hoursResult,
        tech_daysResult: daysResult,
      };
    }

    function handleUrduLocale(body) {
      const time_type = body.tech_time_type;

      if (time_type == "1") {
        return calculateTimeAddSubtractUrdu(body);
      } else if (time_type == "2") {
        return calculateTimeDifference(body);
      } else if (time_type == "3") {
        return calculateDateTimeFromStart(body);
      } else if (time_type == "4") {
        return calculateDateTimeDifference(body);
      }

      return { error: "Invalid time_type" };
    }

    function calculateTimeAddSubtractUrdu(body) {
      let t_days = body.tech_t_days;
      let t_hours = body.tech_t_hours;
      let t_min = body.tech_t_min;
      let t_sec = body.tech_t_sec;
      let t_method = body.tech_t_method;

      let te_days = body.tech_te_days;
      let te_hours = body.tech_te_hours;
      let te_min = body.tech_te_min;
      let te_sec = body.tech_te_sec;

      // Convert to arrays if not already
      te_sec = Array.isArray(te_sec) ? te_sec : [te_sec];
      te_min = Array.isArray(te_min) ? te_min : [te_min];
      te_hours = Array.isArray(te_hours) ? te_hours : [te_hours];
      te_days = Array.isArray(te_days) ? te_days : [te_days];

      // Validation
      if (!t_days && !t_hours && !t_min && !t_sec) {
        return { error: "Please enter any input at time 1" };
      }

      t_days = t_days || 0;
      t_hours = t_hours || 0;
      t_min = t_min || 0;
      t_sec = t_sec || 0;

      if (
        !te_days.length &&
        !te_hours.length &&
        !te_min.length &&
        !te_sec.length
      ) {
        return { error: "Please enter any input at time 2" };
      }

      const sumArray = (arr) =>
        arr.reduce((a, b) => parseInt(a || 0) + parseInt(b || 0), 0);

      let seconds, min, hour, days, method;

      if (t_method === "plus") {
        seconds = parseInt(t_sec) + sumArray(te_sec);
        min = parseInt(t_min) + sumArray(te_min);
        hour = parseInt(t_hours) + sumArray(te_hours);
        days = parseInt(t_days) + sumArray(te_days);

        while (seconds >= 60) {
          min += 1;
          seconds -= 60;
        }
        while (min >= 60) {
          hour += 1;
          min -= 60;
        }
        while (hour >= 24) {
          days += 1;
          hour -= 24;
        }
        method = "+";
      } else {
        t_days = parseInt(t_days);
        t_hours = parseInt(t_hours);
        t_min = parseInt(t_min);
        t_sec = parseInt(t_sec);

        const te_days_sum = sumArray(te_days);
        const te_hours_sum = sumArray(te_hours);
        const te_min_sum = sumArray(te_min);
        const te_sec_sum = sumArray(te_sec);

        if (t_days > te_days_sum) {
          if (te_sec_sum > t_sec) {
            t_sec += 60;
            t_min -= 1;
          }
          if (te_min_sum > t_min) {
            t_min += 60;
            t_hours -= 1;
          }
          if (te_hours_sum > t_hours) {
            t_hours += 24;
            t_days -= 1;
          }
        }

        seconds = t_sec - te_sec_sum;
        min = t_min - te_min_sum;
        hour = t_hours - te_hours_sum;
        days = t_days - te_days_sum;

        while (seconds >= 60) {
          min += 1;
          seconds -= 60;
        }
        while (min >= 60) {
          hour += 1;
          min -= 60;
        }
        while (hour >= 24) {
          days += 1;
          hour -= 24;
        }
        method = "-";
      }

      let totalDays = min + seconds / 60;
      totalDays = hour + totalDays / 60;
      totalDays = days + totalDays / 24;

      const totalHours = totalDays * 24;
      const totalMin = totalDays * 24 * 60;
      const totalSec = totalDays * 24 * 60 * 60;

      return {
        tech_t_method: method,
        tech_t_sec: parseInt(body.tech_t_sec) || 0,
        tech_t_min: parseInt(body.tech_t_min) || 0,
        tech_t_hours: parseInt(body.tech_t_hours) || 0,
        tech_t_days: parseInt(body.tech_t_days) || 0,
        tech_te_sec: te_sec,
        tech_te_min: te_min,
        tech_te_hours: te_hours,
        tech_te_days: te_days,
        tech_totalDays: totalDays,
        tech_totalHours: totalHours,
        tech_totalMin: totalMin,
        tech_totalSec: totalSec,
        tech_seconds: seconds,
        tech_min: min,
        tech_hour: hour,
        tech_days: days,
      };
    }

    function calculateTimeDifference(body) {
      let startTime = body.tech_s_time;
      let endTime = body.tech_e_time;

      if (!startTime || !endTime) {
        return { error: "Please Add Both Time." };
      }

      const start = moment(startTime, "HH:mm:ss");
      let end = moment(endTime, "HH:mm:ss");

      if (end.isBefore(start)) {
        end.add(1, "day");
      }

      const duration = moment.duration(end.diff(start));

      return {
        tech_hours: duration.hours(),
        tech_minutes: duration.minutes(),
        tech_seconds: duration.seconds(),
      };
    }

    function calculateDateTimeFromStart(body) {
      let s_date = body.tech_s_date;
      let et_time = body.tech_et_time;
      let st_days = body.tech_st_days;
      let st_hours = body.tech_st_hours;
      let st_min = body.tech_st_min;
      let st_sec = body.tech_st_sec;
      let td_method = body.tech_td_method;

      if (!s_date || !et_time) {
        return { error: "Please Enter Time." };
      }

      const days = st_days || 0;
      const hours = st_hours || 0;
      const minutes = st_min || 0;
      const seconds = st_sec || 0;

      if (
        !isNumeric(days) ||
        !isNumeric(hours) ||
        !isNumeric(minutes) ||
        !isNumeric(seconds)
      ) {
        return { error: "Please Fill all the Input Fields." };
      }

      let startDateTime = moment(`${s_date} ${et_time}`);

      if (td_method === "plus") {
        startDateTime
          .add(days, "days")
          .add(hours, "hours")
          .add(minutes, "minutes")
          .add(seconds, "seconds");
      } else {
        startDateTime
          .subtract(days, "days")
          .subtract(hours, "hours")
          .subtract(minutes, "minutes")
          .subtract(seconds, "seconds");
      }

      return {
        tech_formattedDate: startDateTime.format("YYYY-MM-DD"),
        tech_formattedTime: startDateTime.format("hh:mm:ss A"),
      };
    }

    function calculateDateTimeDifference(body) {
      let fs_date = body.tech_fs_date;
      let ft_time = body.tech_ft_time;
      let fe_date = body.tech_fe_date;
      let fe_time = body.tech_fe_time;

      if (!fs_date || !ft_time || !fe_date || !fe_time) {
        return { error: "Please Fill all the Fields." };
      }

      const startDateTime = moment(`${fs_date} ${ft_time}`);
      const endDateTime = moment(`${fe_date} ${fe_time}`);

      const duration = moment.duration(endDateTime.diff(startDateTime));

      return {
        tech_days: Math.floor(duration.asDays()),
        tech_hours: duration.hours(),
        tech_minutes: duration.minutes(),
        tech_seconds: duration.seconds(),
      };
    }
    function isNumeric(value) {
      return !isNaN(parseFloat(value)) && isFinite(value);
    }
  }

  /**
   * getCalculationTimeSpanCalculator: Service Method
   * POST: /api/calculators-lol/time-span-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationTimeSpanCalculator(body) {
    try {
      // ✅ Extract inputs
      let clock_format = body.tech_clock_format;
      let s_hour = parseInt(body.tech_s_hour);
      let s_min = parseInt(body.tech_s_min);
      let s_sec = parseInt(body.tech_s_sec);
      let s_ampm = body.tech_s_ampm;
      let e_hour = parseInt(body.tech_e_hour);
      let e_min = parseInt(body.tech_e_min);
      let e_sec = parseInt(body.tech_e_sec);
      let e_ampm = body.tech_e_ampm;

      // ✅ Validate inputs
      if (
        isNaN(s_hour) ||
        isNaN(s_min) ||
        isNaN(s_sec) ||
        isNaN(e_hour) ||
        isNaN(e_min) ||
        isNaN(e_sec)
      ) {
        return { status: "error", message: "Please! Check Your Input" };
      }

      // ✅ Helper: convert 12h -> 24h
      function to24Hour(hour, ampm) {
        if (ampm === "pm" && hour < 12) return hour + 12;
        if (ampm === "am" && hour === 12) return 0;
        return hour;
      }

      // ✅ Helper: zero-pad
      function pad(num) {
        return String(num).padStart(2, "0");
      }

      // ✅ Convert start/end to total seconds
      let startSeconds, endSeconds;

      if (clock_format == 12) {
        if (!s_ampm || !e_ampm) {
          return { status: "error", message: "Please! Check Your Input" };
        }
        startSeconds = to24Hour(s_hour, s_ampm) * 3600 + s_min * 60 + s_sec;
        endSeconds = to24Hour(e_hour, e_ampm) * 3600 + e_min * 60 + e_sec;
      } else {
        startSeconds = s_hour * 3600 + s_min * 60 + s_sec;
        endSeconds = e_hour * 3600 + e_min * 60 + e_sec;
      }

      // ✅ Calculate differences
      let diffSeconds = endSeconds - startSeconds;
      let absDiff = Math.abs(diffSeconds);

      let h = Math.floor(absDiff / 3600);
      let m = Math.floor((absDiff % 3600) / 60);
      let s = Math.floor(absDiff % 60);

      // ✅ Laravel format ke according values set karein
      let tech_first_to_second,
        tech_first_to_second_over_night,
        tech_second_to_first,
        tech_second_to_first_over_night;

      if (diffSeconds >= 0) {
        // Normal case
        tech_first_to_second = `${pad(h)}:${pad(m)}:${pad(s)}`; // "05:00:00"
        tech_first_to_second_over_night = `${pad(h + 24)}:${pad(m)}:${pad(s)}`; // "29:00:00"
        tech_second_to_first = `-${pad(h)}:${pad(m)}:${pad(s)}`; // "-05:00:00"
        tech_second_to_first_over_night = `${pad(24 - h)}:${pad(m)}:${pad(s)}`; // "19:00:00"
      } else {
        // Reverse case
        tech_first_to_second = `-${pad(h)}:${pad(m)}:${pad(s)}`; // "-05:00:00"
        tech_first_to_second_over_night = `${pad(24 - h)}:${pad(m)}:${pad(s)}`; // "19:00:00"
        tech_second_to_first = `${pad(h)}:${pad(m)}:${pad(s)}`; // "05:00:00"
        tech_second_to_first_over_night = `${pad(h + 24)}:${pad(m)}:${pad(s)}`; // "29:00:00"
      }

      // ✅ Final result exactly matching Laravel format
      return {
        status: "success",
        payload: {
          tech_first_to_second: tech_first_to_second,
          tech_first_to_second_over_night: tech_first_to_second_over_night,
          tech_second_to_first: tech_second_to_first,
          tech_second_to_first_over_night: tech_second_to_first_over_night,
        },
      };
    } catch (error) {
      return { status: "error", message: error.message };
    }
  }

  /**
   * getCalculationLeadTimeCalculator: Service Method
   * POST: /api/calculators-lol/lead-time-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationLeadTimeCalculator(body) {
    // Helper function to convert time to hours and minutes
    const convertToHoursMins = (time, format = "%02d Hours %02d Minutes") => {
      if (time < 1) {
        return;
      }
      const hours = Math.floor(time / 60);
      const minutes = time % 60;
      return sprintf(format, hours, minutes);
    };

    // Helper function for sprintf (since Node.js doesn't have it natively)
    const sprintf = (format, ...args) => {
      let i = 0;
      return format.replace(/%(\w+)/g, (match, type) => {
        const arg = args[i++];
        switch (type) {
          case "02d":
            return arg.toString().padStart(2, "0");
          default:
            return arg;
        }
      });
    };

    // Helper function to convert time units
    const convert = (first_value, units) => {
      if (units === "sec") {
        return first_value / 86400;
      } else if (units === "min") {
        return first_value / 1440;
      } else if (units === "hrs") {
        return first_value / 24;
      } else if (units === "wks") {
        return first_value * 7;
      } else if (units === "mos") {
        return first_value * 30.417;
      } else if (units === "yrs") {
        return first_value * 365;
      }
      return first_value;
    };

    try {
      let type, pre_time, pre_units, p_time, p_units, post_time, post_units;
      let place_time, receive_time, s_delay, supply_units, r_delay, r_units;

      // Check if data comes from POST or GET (in Node.js, we typically use body)
      if (body.tech_submit || body.tech_res_link) {
        type = body.tech_type ? body.tech_type.trim() : "";
        pre_time = body.tech_pre_time ? body.tech_pre_time.trim() : "";
        pre_units = body.tech_pre_units ? body.tech_pre_units.trim() : "";
        p_time = body.tech_p_time ? body.tech_p_time.trim() : "";
        p_units = body.tech_p_units ? body.tech_p_units.trim() : "";
        post_time = body.tech_post_time ? body.tech_post_time.trim() : "";
        post_units = body.tech_post_units ? body.tech_post_units.trim() : "";
        place_time = body.tech_place_time ? body.tech_place_time.trim() : "";
        receive_time = body.tech_receive_time
          ? body.tech_receive_time.trim()
          : "";
        s_delay = body.tech_s_delay ? body.tech_s_delay.trim() : "";
        supply_units = body.tech_supply_units
          ? body.tech_supply_units.trim()
          : "";
        r_delay = body.tech_r_delay ? body.tech_r_delay.trim() : "";
        r_units = body.tech_r_units ? body.tech_r_units.trim() : "";
      } else {
        return { error: "Please! Check Your Input" };
      }

      if (!type) {
        return { error: "Please! Check Your Input" };
      }

      const result = { type };

      if (type === "manufac") {
        if (isNumeric(pre_time) && isNumeric(p_time) && isNumeric(post_time)) {
          if (pre_units) {
            pre_time = convert(parseFloat(pre_time), pre_units);
          }
          if (p_units) {
            p_time = convert(parseFloat(p_time), p_units);
          }
          if (post_units) {
            post_time = convert(parseFloat(post_time), post_units);
          }

          const manufac =
            parseFloat(pre_time) + parseFloat(p_time) + parseFloat(post_time);

          result.tech_pre_time = pre_time;
          result.tech_p_time = p_time;
          result.tech_post_time = post_time;
          result.tech_manufac = manufac;
        } else {
          return { error: "Please! Check Your Input" };
        }
      } else if (type === "order") {
        if (place_time && receive_time) {
          const from_time = new Date(place_time).getTime();
          const to_time = new Date(receive_time).getTime();

          if (isNaN(from_time) || isNaN(to_time)) {
            return { error: "Please! Check Your Input - Invalid date format" };
          }

          const diff_minutes = Math.round(
            Math.abs(from_time - to_time) / (1000 * 60)
          );
          const timeDiff = convertToHoursMins(diff_minutes);

          result.tech_timeDiff = timeDiff;
          result.tech_diff_minutes = diff_minutes;
        } else {
          return { error: "Please! Check Your Input" };
        }
      } else if (type === "supply") {
        if (isNumeric(s_delay) && isNumeric(r_delay)) {
          if (supply_units) {
            s_delay = convert(parseFloat(s_delay), supply_units);
          }
          if (r_units) {
            r_delay = convert(parseFloat(r_delay), r_units);
          }

          const supply = parseFloat(s_delay) + parseFloat(r_delay);

          result.tech_s_delay = s_delay;
          result.tech_r_delay = r_delay;
          result.tech_supply = supply;
        } else {
          return { error: "Please! Check Your Input" };
        }
      } else {
        return { error: "Please! Check Your Input" };
      }

      return result;
    } catch (error) {
      console.error("Error in lead time calculation:", error);
      return { error: "Please! Check Your Input" };
    }

    // Helper function to check if value is numeric
    function isNumeric(value) {
      return !isNaN(parseFloat(value)) && isFinite(value);
    }
  }

  /**
   * getCalculationDateDurationCalculator: Service Method
   * POST: /api/calculators-lol/date-duration-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  // dateDurationCalculator.js
  async getCalculationDateDurationCalculator(body) {
    const s_date = body.tech_s_date;
    const e_date = body.tech_e_date;
    const checkbox = body.tech_checkbox;

    const result = {};

    if (!s_date || !e_date) {
      result.error = "Please! Check Your Input.";
      return result;
    }

    let start = dayjs(s_date, "YYYY-MM-DD");
    let end = dayjs(e_date, "YYYY-MM-DD");

    // ✅ Include end date if checkbox is true
    let displayEnd = end;
    if (checkbox) {
      end = end.add(1, "day"); // Include end date in calculation
      displayEnd = end.subtract(1, "day"); // But display original end date
    }

    // Swap if start is after end
    if (start.isAfter(end)) {
      [start, end] = [end, start];
    }

    const fromFormatted = start.format("MMM DD, YYYY");
    const toFormatted = displayEnd.format("MMM DD, YYYY");

    // Calculate year, month, day difference manually
    let tempStart = start.clone();
    let years = 0,
      months = 0,
      days = 0;

    while (tempStart.add(1, "year").isSameOrBefore(end)) {
      tempStart = tempStart.add(1, "year");
      years++;
    }

    while (tempStart.add(1, "month").isSameOrBefore(end)) {
      tempStart = tempStart.add(1, "month");
      months++;
    }

    while (tempStart.add(1, "day").isSameOrBefore(end)) {
      tempStart = tempStart.add(1, "day");
      days++;
    }

    // Total seconds between
    const diffInSeconds = Math.abs(end.unix() - start.unix());

    // Remove seconds from Y/M/D
    const totalUsedSec =
      years * 365 * 24 * 60 * 60 +
      months * 30 * 24 * 60 * 60 +
      days * 24 * 60 * 60;
    const remaining = diffInSeconds - totalUsedSec;

    const hrs = Math.floor(remaining / 3600);
    const mins = Math.floor((remaining % 3600) / 60);
    const secs = remaining % 60;

    return {
      tech_from: fromFormatted,
      tech_to: toFormatted,
      tech_years: years,
      tech_months: months,
      tech_days: days,
      tech_hours: hrs,
      tech_minutes: mins,
      tech_seconds: secs,
    };
  }

  /**
   * getCalculationMilitaryTimeConverterCalculator: Service Method
   * POST: /api/calculators-lol/military-time-converter
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationMilitaryTimeConverterCalculator(body) {
    const conversion = body.tech_conversion;
    const military_time = body.tech_military_time;
    const hours = body.tech_hours;
    const hur = body.tech_hur;
    const min = body.tech_min;
    const am_pm = body.tech_am_pm;

    function eng_time(num) {
      const reading = [
        "zero ",
        "one ",
        "two ",
        "three ",
        "four ",
        "five ",
        "six ",
        "seven ",
        "eight ",
        "nine ",
        "ten ",
        "eleven ",
        "twelve ",
        "thirteen ",
        "fourteen ",
        "fifteen ",
        "sixteen ",
        "seventeen ",
        "eighteen ",
        "nineteen ",
        "twenty ",
        "twenty-one ",
        "twenty-two ",
        "twenty-three ",
        "twenty-four ",
        "twenty-five ",
        "twenty-six ",
        "twenty-seven ",
        "twenty-eight ",
        "twenty-nine ",
        "thirty ",
        "thirty-one ",
        "thirty-two ",
        "thirty-three ",
        "thirty-four ",
        "thirty-five ",
        "thirty-six ",
        "thirty-seven ",
        "thirty-eight ",
        "thirty-nine ",
        "forty ",
        "forty-one ",
        "forty-two ",
        "forty-three ",
        "forty-four ",
        "forty-five ",
        "forty-six ",
        "forty-seven ",
        "forty-eight ",
        "forty-nine ",
        "fifty ",
        "fifty-one ",
        "fifty-two ",
        "fifty-three ",
        "fifty-four ",
        "fifty-five ",
        "fifty-six ",
        "fifty-seven ",
        "fifty-eight ",
        "fifty-nine ",
      ];

      let f_two = num.substring(0, 2); // hour
      let l_two = num.substring(2, 4); // minute
      let hr = reading[parseInt(f_two)];
      let minText = reading[parseInt(l_two)];

      // ✅ Always prefix "zero" when hour < 10
      if (parseInt(f_two) < 10) {
        hr = "zero " + hr.trim() + " ";
      }

      return hr + minText;
    }

    if (conversion === "1") {
      if (isNaN(military_time)) {
        return { status: "error", message: "Please! Check Your Input" };
      }

      const originalInput = military_time.toString();
      const padded = originalInput.padStart(4, "0");
      const hourStr = padded.slice(0, padded.length - 2);
      const minuteStr = padded.slice(-2);
      const hour = parseInt(hourStr);
      const minute = parseInt(minuteStr);

      if (hour < 0 || hour >= 24 || minute < 0 || minute >= 60) {
        return { status: "error", message: "Please! Check Your Input" };
      }

      const chubees_ghante = `${hourStr}:${minuteStr}`;
      const bara_ghante = dayjs(chubees_ghante, "HH:mm").format("h:mm a");
      const eng_word = eng_time(`${hourStr}${minuteStr}`);

      return {
        status: "success",
        payload: {
          tech_military_time: originalInput,
          tech_eng_word: eng_word.trim(),
          tech_bara_ghante: bara_ghante,
          tech_chubees_ghante: chubees_ghante,
        },
      };
    }

    // Convert 12-hour or 24-hour time to military
    else if (conversion === "2") {
      if (isNaN(hur) || isNaN(min)) {
        return { status: "error", message: "Please! Check Your Input" };
      }

      if (hours === "24h") {
        const hrStr = hur.toString().padStart(2, "0");
        const minStr = min.toString().padStart(2, "0");
        const time = hrStr + minStr;
        const chubees_ghante = `${hrStr}:${minStr}`;
        const eng_word = eng_time(time);

        return {
          status: "success",
          payload: {
            tech_bara_ghante: chubees_ghante,
            tech_chubees_ghante: chubees_ghante,
            tech_military_time: time,
            tech_eng_word: eng_word.trim(),
          },
        };
      } else if (hours === "12h") {
        const hrStr = hur.toString().padStart(2, "0");
        const minStr = min.toString().padStart(2, "0");
        const time = `${hrStr}:${minStr} ${am_pm}`;
        const hrs_ans = dayjs(time, "hh:mm a").format("HH");
        const min_ans = dayjs(time, "hh:mm a").format("mm");
        const chubees_ghante = `${hrs_ans}:${min_ans}`;
        const military_time = hrs_ans + min_ans;
        const eng_word = eng_time(military_time);

        return {
          status: "success",
          payload: {
            tech_military_time: military_time,
            tech_eng_word: eng_word.trim(),
            tech_bara_ghante: time,
            tech_chubees_ghante: chubees_ghante,
          },
        };
      }
    }

    return { status: "error", message: "Invalid conversion type" };
  }

  /**
   * getCalculationReadingTimeCalculator: Service Method
   * POST: /api/calculators-lol/reading-time-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationReadingTimeCalculator(body) {
    try {
      // Extract input and sanitize
      const reading_speed = body.tech_reading_speed
        ? body.tech_reading_speed.trim()
        : "";
      const read_pages = parseFloat(body.tech_read_pages);
      const book_unit = body.tech_book_unit ? body.tech_book_unit.trim() : "";
      const book_leng = parseFloat(body.tech_book_leng);
      const daily_reading = parseFloat(body.tech_daily_reading);
      const total_unit = body.tech_total_unit
        ? body.tech_total_unit.trim()
        : "";
      const time_unit = body.tech_time_unit ? body.tech_time_unit.trim() : "";
      const reading_unit = body.tech_reading_unit
        ? body.tech_reading_unit.trim()
        : "";
      const period_unit = body.tech_period_unit
        ? body.tech_period_unit.trim()
        : "";

      // ✅ Validate numeric inputs
      if (!isFinite(read_pages) || !isFinite(book_leng)) {
        return { error: "Please! Check Your Input" };
      }

      let adjusted_read_pages = read_pages;
      if (book_unit === "hr") {
        adjusted_read_pages = read_pages / 60;
      }

      // Base answer (minutes)
      let answer = book_leng / adjusted_read_pages;
      let answer_main = "";

      // ✅ Handle total unit conversion
      if (total_unit === "min") {
        answer_main = `${answer} min`;
      } else if (total_unit === "hr") {
        answer = answer / 60;
        answer = parseFloat(answer.toFixed(3));
        answer_main = `${answer} hrs`;
      } else if (total_unit === "min/hr") {
        const hours = Math.floor(answer / 60);
        const minutes = Math.round(answer % 60);
        answer_main = `${hours} hrs ${minutes} min`;
      }

      let total_daily_reading = "";
      let period_spent = "";

      // ✅ Handle daily reading and period conversions
      if (isFinite(daily_reading)) {
        const dly_reading = answer / book_leng;
        const dly_reading_min = dly_reading * 1440;
        let total_daily_reading_val = daily_reading / dly_reading_min;
        let period_spent_val = (answer / daily_reading) * 1440;

        // --- Convert total_daily_reading ---
        switch (reading_unit) {
          case "min":
            total_daily_reading = `${total_daily_reading_val.toFixed(3)} min`;
            break;
          case "hr":
            total_daily_reading = `${(total_daily_reading_val * 60).toFixed(
              3
            )} hrs`;
            break;
          case "day":
            total_daily_reading = `${(total_daily_reading_val * 1440).toFixed(
              3
            )} days`;
            break;
          case "week":
            total_daily_reading = `${(total_daily_reading_val * 10080).toFixed(
              3
            )} wks`;
            break;
          case "month":
            total_daily_reading = `${(total_daily_reading_val * 43800).toFixed(
              3
            )} mons`;
            break;
          case "year":
            total_daily_reading = `${(total_daily_reading_val * 525600).toFixed(
              3
            )} yrs`;
            break;
        }

        // --- Convert period_spent ---
        const minutesPerYear = 365 * 24 * 60;
        const minutesPerMonth = 30 * 24 * 60;
        const minutesPerWeek = 7 * 24 * 60;
        const minutesPerDay = 24 * 60;

        switch (period_unit) {
          case "min":
            period_spent = `${period_spent_val} min`;
            break;
          case "hr":
            period_spent = `${(period_spent_val / 60).toFixed(1)} hrs`;
            break;
          case "day":
            period_spent = `${(period_spent_val / 1440).toFixed(1)} day`;
            break;
          case "week":
            period_spent = `${(period_spent_val / 10080).toFixed(1)} wks`;
            break;
          case "month":
            period_spent = `${(period_spent_val / 43800).toFixed(1)} mons`;
            break;
          case "year":
            period_spent = `${(period_spent_val / 525600).toFixed(1)} yrs`;
            break;
          case "minutes/hour": {
            const hours = Math.floor(period_spent_val / 60);
            const minutes = Math.floor(period_spent_val % 60);
            period_spent = `${hours} hr ${minutes} min`;
            break;
          }
          case "year/month/day": {
            const years = Math.floor(period_spent_val / minutesPerYear);
            let remaining = period_spent_val % minutesPerYear;
            const months = Math.floor(remaining / minutesPerMonth);
            remaining = remaining % minutesPerMonth;
            const days = Math.floor(remaining / minutesPerDay);
            period_spent = `${years} year ${months} mon ${days} day`;
            break;
          }
          case "week/day": {
            const weeks = Math.floor(period_spent_val / minutesPerWeek);
            const days = Math.floor(
              (period_spent_val % minutesPerWeek) / minutesPerDay
            );
            period_spent = `${weeks} week ${days} day`;
            break;
          }
          case "day/hour/minutes": {
            const days = Math.floor(period_spent_val / minutesPerDay);
            let remaining = period_spent_val % minutesPerDay;
            const hours = Math.floor(remaining / 60);
            const minutes = Math.floor(remaining % 60);
            period_spent = `${days} day, ${hours} hr, ${minutes} min`;
            break;
          }
        }
      }

      // ✅ Final Response
      return {
        tech_answer: answer_main,
        tech_total_daily_reading: total_daily_reading,
        tech_period_spent: period_spent,
      };
    } catch (error) {
      return { error: "Something went wrong", details: error.message };
    }
  }

  /**
   * getCalculationMonthCalculator: Service Method
   * POST: /api/calculators-lol/month-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationMonthCalculator(body) {
    try {
      // Extract & sanitize inputs
      const start_date = body.tech_start_date
        ? body.tech_start_date.trim()
        : "";
      const end_date = body.tech_end_date ? body.tech_end_date.trim() : "";

      if (!start_date || !end_date) {
        return { error: "Please! Check Your Input" };
      }

      // Parse dates
      const start = dayjs.utc(start_date);
      const end = dayjs.utc(end_date);

      if (!start.isValid() || !end.isValid()) {
        return { error: "Invalid date format" };
      }

      // Ensure correct order
      const from = start.isBefore(end) ? start : end;
      const to = start.isBefore(end) ? end : start;

      // Calculate difference
      const yearsDiff = to.diff(from, "year");
      const monthsDiff = to.diff(from.add(yearsDiff, "year"), "month");
      const daysDiff = to.diff(
        from.add(yearsDiff, "year").add(monthsDiff, "month"),
        "day"
      );

      const totalMonths = yearsDiff * 12 + monthsDiff;

      return {
        tech_months: totalMonths,
        tech_days: daysDiff,
      };
    } catch (error) {
      return { error: "Something went wrong", details: error.message };
    }
  }

  /**
   * getCalculationDeadlineCalculator: Service Method
   * POST: /api/calculators-lol/deadline-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationDeadlineCalculator(body) {
    try {
      const date = body.tech_date?.trim();
      const period = body.tech_period?.trim();
      const number = body.tech_number ? parseFloat(body.tech_number) : null;
      const before_after = body.tech_before_after?.trim();

      let param = {};

      // ✅ Validation
      if (!date || isNaN(number)) {
        param.error = "Please check your input.";
        return param;
      }

      const parsedDate = dayjs(date, "YYYY-MM-DD", true);
      if (!parsedDate.isValid()) {
        param.error = "Invalid date format. Please use YYYY-MM-DD.";
        return param;
      }

      // ✅ Determine period
      let interval;
      if (period === "Days") {
        interval = "day";
      } else if (period === "Weeks") {
        interval = "week";
      } else if (period === "Years") {
        interval = "year";
      } else {
        param.error = "Invalid period. Please select Days, Weeks, or Years.";
        return param;
      }

      // ✅ Apply before/after logic
      let resultDate;
      if (before_after === "Before") {
        resultDate = parsedDate.subtract(number, interval);
      } else {
        resultDate = parsedDate.add(number, interval);
      }

      // ✅ Format final result
      const formatted = resultDate.format("MMM DD, YYYY");

      param.tech_answer = formatted;
      return param;
    } catch (error) {
      return { error: "An unexpected error occurred: " + error.message };
    }
  }

  /**
   * getCalculationWorkingDaysCalculator: Service Method
   * POST: /api/calculators-lol/working-days-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationWorkingDaysCalculator(body) {
    try {
      const start_date = body.tech_start_date?.trim();
      const end_date = body.tech_end_date?.trim();
      const working_days = body.tech_working_days?.trim(); // "Exclude weekends", "Exclude only Sunday", "Include all days"
      const include_end_date = body.tech_include_end_date?.trim(); // "Yes" or "No"
      const submit = body.tech_submit;

      // ✅ Validation
      if (!start_date || !end_date) {
        return { error: "Please provide both the starting and ending dates" };
      }

      const start = dayjs(start_date, "YYYY-MM-DD");
      const end = dayjs(end_date, "YYYY-MM-DD");

      if (!start.isValid() || !end.isValid()) {
        return { error: "Invalid date format" };
      }

      // ✅ Helper function (same as PHP’s calculateWorkingDays)
      function calculateWorkingDays(startDate, endDate, type) {
        let result = 0;
        let current = startDate;

        while (current.isBefore(endDate) || current.isSame(endDate, "day")) {
          const currentDay = current.day(); // 0 = Sunday, 6 = Saturday

          if (type === "Exclude weekends") {
            if (currentDay !== 6 && currentDay !== 0) result++;
          } else if (type === "Exclude only Sunday") {
            if (currentDay !== 0) result++;
          } else if (type === "Include all days") {
            result++;
          }

          current = current.add(1, "day");
        }

        return result;
      }

      // ✅ Calculate working days
      let result = 0;

      if (working_days == "Exclude weekends") {
        result = calculateWorkingDays(start, end, "Exclude weekends");
      } else if (working_days == "Exclude only Sunday") {
        result = calculateWorkingDays(start, end, "Exclude only Sunday");
      } else {
        // Include all days
        result = Math.ceil(end.diff(start, "day"));
      }

      // ✅ Handle "Include end date" toggle
      if (include_end_date == "No") {
        result--;
      }

      // ✅ Ensure result not negative
      if (result < 0) result = 0;

      // ✅ Return result
      return {
        status: "success",
        payload: {
          tech_answer: result,
          tech_result: 1,
        },
      };
    } catch (error) {
      return { error: error.message };
    }
  }

  /**
   * getCalculationBirthYearCalculator: Service Method
   * POST: /api/calculators-lol/birth-year-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationBirthYearCalculator(body) {
    try {
      const date = body.tech_date;
      const age = parseFloat(body.tech_age);
      const ageUnit = body.tech_age_unit;
      const choose = body.tech_choose;
      const submit = body.tech_submit;

      // ✅ Validation check (similar to Laravel)
      if (!date || isNaN(age) || !ageUnit || !choose || !submit) {
        return { error: "Please! Check Your Input" };
      }

      let newDate = dayjs(date);
      if (!newDate.isValid()) {
        return { error: "Invalid date" };
      }

      // ✅ Subtract based on age unit
      switch (ageUnit) {
        case "years":
          newDate = newDate.subtract(age, "year");
          break;
        case "months":
          newDate = newDate.subtract(age, "month");
          break;
        case "weeks":
          newDate = newDate.subtract(age, "week");
          break;
        case "days":
          newDate = newDate.subtract(age, "day");
          break;
        case "hours":
          newDate = newDate.subtract(age, "hour");
          break;
        case "minutes":
          newDate = newDate.subtract(age, "minute");
          break;
        case "second":
          newDate = newDate.subtract(age, "second");
          break;
        default:
          return { error: "Invalid age unit" };
      }

      // ✅ Extract the year
      let newYear = newDate.year();

      // ✅ Apply "before" logic (same as Laravel)
      if (choose === "before") {
        newYear = newYear - 1;
      }

      // ✅ Return same format as Laravel
      return {
        tech_newYear: newYear,
      };
    } catch (error) {
      return { error: error.message };
    }
  }

  /**
   * getCalculationTimeDurationCalculator: Service Method
   * POST: /api/calculators-lol/time-duration-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationTimeDurationCalculator(body) {
    const result = {};
    // Extract and trim input values
    const t_start_h = String(body.tech_t_start_h || "").trim();
    const t_start_m = String(body.tech_t_start_m || "").trim();
    const t_start_s = String(body.tech_t_start_s || "").trim();
    const t_start_ampm = String(body.tech_t_start_ampm || "").trim();
    const t_end_h = String(body.tech_t_end_h || "").trim();
    const t_end_m = String(body.tech_t_end_m || "").trim();
    const t_end_s = String(body.tech_t_end_s || "").trim();
    const t_end_ampm = String(body.tech_t_end_ampm || "").trim();
    const start_date = String(body.tech_start_date || "").trim();
    const end_date = String(body.tech_end_date || "").trim();
    const d_start_h = String(body.tech_d_start_h || "").trim();
    const d_start_m = String(body.tech_d_start_m || "").trim();
    const d_start_s = String(body.tech_d_start_s || "").trim();
    const d_start_ampm = String(body.tech_d_start_ampm || "").trim();
    const d_end_h = String(body.tech_d_end_h || "").trim();
    const d_end_m = String(body.tech_d_end_m || "").trim();
    const d_end_s = String(body.tech_d_end_s || "").trim();
    const d_end_ampm = String(body.tech_d_end_ampm || "").trim();
    const submit = String(body.tech_submit || "").trim();
    const calculator_time = String(body.tech_calculator_time || "").trim();

    let start_time_res, end_time_res, days_ans;

    if (calculator_time == "date_cal") {
      // Time Calculator Logic - FIXED: Use actual dates from input
      let start_h = parseInt(t_start_h);
      let start_m = parseInt(t_start_m);
      let start_s = parseInt(t_start_s);
      let end_h = parseInt(t_end_h);
      let end_m = parseInt(t_end_m);
      let end_s = parseInt(t_end_s);

      // Validation
      if (isNaN(start_h) || start_h > 23 || start_h < 0) {
        result.error = "Please enter a valid Start Hour.";
        return result;
      }
      if (isNaN(end_h) || end_h > 23 || end_h < 0) {
        result.error = "Please enter a valid End Hour.";
        return result;
      }
      if (isNaN(start_m) || start_m > 59 || start_m < 0 || t_start_m === "") {
        result.error = "Please enter a valid Start Minute.";
        return result;
      }
      if (isNaN(end_m) || end_m > 59 || end_m < 0 || t_end_m === "") {
        result.error = "Please enter a valid End Minute.";
        return result;
      }
      if (isNaN(start_s) || start_s > 59 || start_s < 0 || t_start_s === "") {
        result.error = "Please enter a valid Start Second.";
        return result;
      }
      if (isNaN(end_s) || end_s > 59 || end_s < 0 || t_end_s === "") {
        result.error = "Please enter a valid End Second.";
        return result;
      }

      // Handle empty or 0 hours
      if (!start_h || start_h === 0) {
        start_h = 12;
      }
      if (!end_h || end_h === 0) {
        end_h = 12;
      }

      // Format time components
      const formatted_start_h = String(start_h).padStart(2, "0");
      const formatted_start_m = String(start_m).padStart(2, "0");
      const formatted_start_s = String(start_s).padStart(2, "0");

      // Build start time
      let start_time_str;
      if (start_h <= 12) {
        start_time_str = `${formatted_start_h}:${formatted_start_m}:${formatted_start_s} ${t_start_ampm}`;
        start_time_res = moment(start_time_str, "hh:mm:ss a");
      } else {
        start_time_str = `${formatted_start_h}:${formatted_start_m}:${formatted_start_s}`;
        start_time_res = moment(start_time_str, "HH:mm:ss");
      }

      // Format end time components
      const formatted_end_h = String(end_h).padStart(2, "0");
      const formatted_end_m = String(end_m).padStart(2, "0");
      const formatted_end_s = String(end_s).padStart(2, "0");

      // Build end time
      let end_time_str;
      if (end_h <= 12) {
        end_time_str = `${formatted_end_h}:${formatted_end_m}:${formatted_end_s} ${t_end_ampm}`;
        end_time_res = moment(end_time_str, "hh:mm:ss a");
      } else {
        end_time_str = `${formatted_end_h}:${formatted_end_m}:${formatted_end_s}`;
        end_time_res = moment(end_time_str, "HH:mm:ss");
      }

      // FIXED: Use actual dates from input instead of hardcoded dates
      start_time_res = moment(
        `${start_date} ${start_time_res.format("HH:mm:ss")}`
      );
      end_time_res = moment(`${end_date} ${end_time_res.format("HH:mm:ss")}`);

      // Calculate day difference
      days_ans = Math.floor(end_time_res.diff(start_time_res, "days", true));
    } else {
      // Date Calculator Logic
      let start_h = parseInt(d_start_h);
      let start_m = parseInt(d_start_m);
      let start_s = parseInt(d_start_s);
      let end_h = parseInt(d_end_h);
      let end_m = parseInt(d_end_m);
      let end_s = parseInt(d_end_s);

      // Validation
      if (isNaN(start_h) || start_h > 23 || start_h < 0) {
        result.error = "Please enter a valid Start Hour.";
        return result;
      }
      if (isNaN(end_h) || end_h > 23 || end_h < 0) {
        result.error = "Please enter a valid End Hour.";
        return result;
      }
      if (isNaN(start_m) || start_m > 59 || start_m < 0 || d_start_m === "") {
        result.error = "Please enter a valid Start Minute.";
        return result;
      }
      if (isNaN(end_m) || end_m > 59 || end_m < 0 || d_end_m === "") {
        result.error = "Please enter a valid End Minute.";
        return result;
      }
      if (isNaN(start_s) || start_s > 59 || start_s < 0 || d_start_s === "") {
        result.error = "Please enter a valid Start Second.";
        return result;
      }
      if (isNaN(end_s) || end_s > 59 || end_s < 0 || d_end_s === "") {
        result.error = "Please enter a valid End Second.";
        return result;
      }

      // Handle empty or 0 hours
      if (!start_h || start_h === 0) {
        start_h = 12;
      }
      if (!end_h || end_h === 0) {
        end_h = 12;
      }

      // Format time components (using d_ variables for date calculator)
      const formatted_start_h = String(start_h).padStart(2, "0");
      const formatted_start_m = String(start_m).padStart(2, "0");
      const formatted_start_s = String(start_s).padStart(2, "0");

      // Build start time
      let start_time_str;
      if (start_h <= 12) {
        start_time_str = `${formatted_start_h}:${formatted_start_m}:${formatted_start_s} ${d_start_ampm}`;
        const start_time_temp = moment(start_time_str, "hh:mm:ss a");
        start_time_str = start_time_temp.format("HH:mm:ss");
      } else {
        start_time_str = `${formatted_start_h}:${formatted_start_m}:${formatted_start_s}`;
      }

      // Format end time components
      const formatted_end_h = String(end_h).padStart(2, "0");
      const formatted_end_m = String(end_m).padStart(2, "0");
      const formatted_end_s = String(end_s).padStart(2, "0");

      // Build end time
      let end_time_str;
      if (end_h <= 12) {
        end_time_str = `${formatted_end_h}:${formatted_end_m}:${formatted_end_s} ${d_end_ampm}`;
        const end_time_temp = moment(end_time_str, "hh:mm:ss a");
        end_time_str = end_time_temp.format("HH:mm:ss");
      } else {
        end_time_str = `${formatted_end_h}:${formatted_end_m}:${formatted_end_s}`;
      }

      // Combine dates with times
      start_time_res = moment(`${start_date} ${start_time_str}`);
      end_time_res = moment(`${end_date} ${end_time_str}`);

      // Calculate day difference
      const dStart = moment(start_date);
      const dEnd = moment(end_date);
      days_ans = dEnd.diff(dStart, "days");
    }

    // Calculate duration
    const duration = moment.duration(end_time_res.diff(start_time_res));

    const days = Math.floor(duration.asDays());
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    // Calculate totals
    const total_days = parseFloat(duration.asDays().toFixed(2));
    const total_hours = parseFloat(duration.asHours().toFixed(2));
    const total_minutes = parseFloat(duration.asMinutes().toFixed(2));
    const total_seconds = parseFloat(duration.asSeconds().toFixed(2));

    // Prepare result
    result.tech_days_ans = days;
    result.tech_hours = hours;
    result.tech_minutes = minutes;
    result.tech_seconds = seconds;
    result.tech_total_days = total_days;
    result.tech_total_hours = total_hours;
    result.tech_total_minutes = total_minutes;
    result.tech_total_seconds = total_seconds;
    result.tech_calculator_time = submit;
    return {
      status: "success",
      payload: result,
    };
  }

  /**
   * getCalculationAddTimeCalculator: Service Method
   * POST: /api/calculators-lol/add-time-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationAddTimeCalculator(body) {
    try {
      // ✅ Extract inputs safely (arrays or falsy)
      let inhour = body.tech_inhour || false;
      let inminutes = body.tech_inminutes || false;
      let inseconds = body.tech_inseconds || false;
      let inmiliseconds = body.tech_inmiliseconds || false;

      let checkbox1 = body.tech_checkbox1 || false;
      let checkbox2 = body.tech_checkbox2 || false;
      let checkbox3 = body.tech_checkbox3 || false;
      let checkbox4 = body.tech_checkbox4 || false;

      let count_val = parseInt(body.tech_count_val);

      // ✅ Helper: Convert milliseconds into h:m:s:ms
      function convertMilliseconds(milliseconds) {
        let seconds = 0;
        let minutes = 0;
        let hours = 0;

        if (milliseconds >= 1000) {
          seconds += Math.floor(milliseconds / 1000);
          milliseconds %= 1000;
        }

        if (seconds >= 60) {
          minutes += Math.floor(seconds / 60);
          seconds %= 60;
        }

        if (minutes >= 60) {
          hours += Math.floor(minutes / 60);
          minutes %= 60;
        }

        return [hours, minutes, seconds, milliseconds];
      }

      // ✅ Initialize totals
      let time_hour = 0;
      let time_minutes = 0;
      let time_seconds = 0;
      let time_miliseconds = 0;

      let hour_list = [];
      let min_list = [];
      let sec_list = [];
      let mili_list = [];

      for (let i = 0; i < count_val; i++) {
        // 🧩 Handle checkboxes (if unchecked, make value 0)
        let h = checkbox1 ? inhour?.[i] || 0 : 0;
        let m = checkbox2 ? inminutes?.[i] || 0 : 0;
        let s = checkbox3 ? inseconds?.[i] || 0 : 0;
        let ms = checkbox4 ? inmiliseconds?.[i] || 0 : 0;

        // ✅ Convert empty strings to 0 and ensure numeric
        h = h === "" ? 0 : parseFloat(h);
        m = m === "" ? 0 : parseFloat(m);
        s = s === "" ? 0 : parseFloat(s);
        ms = ms === "" ? 0 : parseFloat(ms);

        if (!isNaN(h) && !isNaN(m) && !isNaN(s) && !isNaN(ms)) {
          time_hour += h;
          time_minutes += m;
          time_seconds += s;
          time_miliseconds += ms;

          hour_list.push(h);
          min_list.push(m);
          sec_list.push(s);
          mili_list.push(ms);
        } else {
          return { error: "Please! Check Your Input" };
        }
      }

      // ✅ Convert overflow milliseconds to h:m:s
      let [hours, minutes, seconds, remainingMilliseconds] =
        convertMilliseconds(time_miliseconds);
      time_hour += hours;
      time_minutes += minutes;
      time_seconds += seconds;
      time_miliseconds = remainingMilliseconds;

      // ✅ Normalize minutes and seconds
      if (time_minutes >= 60) {
        time_hour += Math.floor(time_minutes / 60);
        time_minutes %= 60;
      }

      if (time_seconds >= 60) {
        time_minutes += Math.floor(time_seconds / 60);
        time_seconds %= 60;
        if (time_minutes >= 60) {
          time_hour += Math.floor(time_minutes / 60);
          time_minutes %= 60;
        }
      }

      // ✅ Final result
      return {
        tech_hour_list: hour_list,
        tech_min_list: min_list,
        tech_sec_list: sec_list,
        tech_mili_list: mili_list,
        tech_time_hour: time_hour,
        tech_time_minutes: time_minutes,
        tech_time_seconds: time_seconds,
        tech_time_miliseconds: time_miliseconds,
      };
    } catch (err) {
      return { error: err.message };
    }
  }

  /**
   * getCalculationDaysElapsedTimeCalculator: Service Method
   * POST: /api/calculators-lol/elapsed-time-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationDaysElapsedTimeCalculator(body) {
    try {
      // Extract all inputs
      const main_units = body.tech_main_units?.trim();
      const elapsed_start = parseFloat(body.tech_elapsed_start);
      const elapsed_start_one = parseFloat(body.tech_elapsed_start_one);
      const elapsed_start_sec = parseFloat(body.tech_elapsed_start_sec);
      const elapsed_start_three = parseFloat(body.tech_elapsed_start_three);
      const elapsed_start_unit = body.tech_elapsed_start_unit?.trim();

      const elapsed_end = parseFloat(body.tech_elapsed_end);
      const elapsed_end_one = parseFloat(body.tech_elapsed_end_one);
      const elapsed_end_sec = parseFloat(body.tech_elapsed_end_sec);
      const elapsed_end_three = parseFloat(body.tech_elapsed_end_three);
      const elapsed_end_unit = body.tech_elapsed_end_unit?.trim();

      const clock_format = body.tech_clock_format?.trim();
      let clock_hour = parseFloat(body.tech_clock_hour);
      let clock_minute = parseFloat(body.tech_clock_minute);
      let clock_second = parseFloat(body.tech_clock_second);
      const clock_start_unit = body.tech_clock_start_unit?.trim();
      let clock_hur = parseFloat(body.tech_clock_hur);
      let clock_mints = parseFloat(body.tech_clock_mints);
      let clock_secs = parseFloat(body.tech_clock_secs);
      const clock_end_unit = body.tech_clock_end_unit?.trim();

      // Helper functions
      const time_unit = (value, unit) => {
        if (unit === "sec") return value;
        if (unit === "mins") return value * 60;
        if (unit === "hrs") return value * 3600;
        return value;
      };

      const other_time = (v1, v2, unit) => {
        if (unit === "mins/sec") return v1 * 60 + v2;
        if (unit === "hrs/mins") return v1 * 3600 + v2 * 60;
        return 0;
      };

      const other_time_sec = (v1, v2, v3, unit) => {
        if (unit === "hrs/mins/sec") return v1 * 3600 + v2 * 60 + v3;
        return 0;
      };

      let hours = 0,
        minutes = 0,
        seconds = 0,
        answer = 0;

      // ───────────────────────────────────────────────
      // 🧮 CASE 1: "elapsed" (unit-based calculation)
      // ───────────────────────────────────────────────
      if (main_units == "elapsed") {
        if (
          [
            elapsed_start,
            elapsed_start_one,
            elapsed_start_sec,
            elapsed_start_three,
            elapsed_end,
            elapsed_end_one,
            elapsed_end_sec,
            elapsed_end_three,
          ].every((v) => !isNaN(v))
        ) {
          let start, end;

          // Convert start time
          if (["sec", "mins", "hrs"].includes(elapsed_start_unit)) {
            start = time_unit(elapsed_start, elapsed_start_unit);
          } else if (elapsed_start_unit === "hrs/mins/sec") {
            start = other_time_sec(
              elapsed_start_one,
              elapsed_start_sec,
              elapsed_start_three,
              elapsed_start_unit
            );
          } else {
            start = other_time(
              elapsed_start_one,
              elapsed_start_sec,
              elapsed_start_unit
            );
          }

          // Convert end time
          if (["sec", "mins", "hrs"].includes(elapsed_end_unit)) {
            end = time_unit(elapsed_end, elapsed_end_unit);
          } else if (elapsed_end_unit === "hrs/mins/sec") {
            end = other_time_sec(
              elapsed_end_one,
              elapsed_end_sec,
              elapsed_end_three,
              elapsed_end_unit
            );
          } else {
            end = other_time(
              elapsed_end_one,
              elapsed_end_sec,
              elapsed_end_unit
            );
          }

          if (end < start) {
            return {
              error: "The end time should be greater than the start time",
            };
          }

          answer = end - start;
          hours = Math.floor(answer / 3600);
          minutes = Math.floor((answer % 3600) / 60);
          seconds = answer % 60;
        } else {
          return { error: "Please! Check Your Input" };
        }
      }

      // ───────────────────────────────────────────────
      // 🕐 CASE 2: CLOCK FORMAT (12hr or 24hr)
      // ───────────────────────────────────────────────
      else {
        if (clock_format == "24") {
          if (
            [
              clock_hour,
              clock_minute,
              clock_second,
              clock_hur,
              clock_mints,
              clock_secs,
            ].every((v) => !isNaN(v))
          ) {
            if (clock_hour > clock_hur)
              return { error: "End time must be later than start time." };
            if (clock_hour >= 24)
              return { error: "Start time hour must be less than 24." };
            if (clock_minute >= 60)
              return { error: "Start time minute must be less than 60." };
            if (clock_second >= 60)
              return { error: "Start time second must be less than 60." };
            if (clock_hur >= 24)
              return { error: "End time hour must be less than 24." };
            if (clock_mints >= 60)
              return { error: "End time minute must be less than 60." };
            if (clock_secs >= 60)
              return { error: "End time second must be less than 60." };

            const start_seconds =
              clock_hour * 3600 + clock_minute * 60 + clock_second;
            const end_seconds =
              clock_hur * 3600 + clock_mints * 60 + clock_secs;

            answer = end_seconds - start_seconds;
            hours = Math.floor(answer / 3600);
            minutes = Math.floor((answer % 3600) / 60);
            seconds = answer % 60;
          } else {
            return { error: "Please! Check Your Input" };
          }
        }

        // ───────────────────────────────────────────────
        // 12-hour clock format
        // ───────────────────────────────────────────────
        else {
          if (
            [
              clock_hour,
              clock_minute,
              clock_second,
              clock_hur,
              clock_mints,
              clock_secs,
            ].every((v) => !isNaN(v))
          ) {
            if (clock_hour >= 12)
              return { error: "Start clock time hour should be less than 12" };
            if (clock_minute >= 60)
              return { error: "Start clock minute should be less than 60" };
            if (clock_second >= 60)
              return { error: "Start clock second should be less than 60" };
            if (clock_hur >= 12)
              return { error: "End clock time hour should be less than 12" };
            if (clock_mints >= 60)
              return { error: "End clock minute should be less than 60" };
            if (clock_secs >= 60)
              return { error: "End clock second should be less than 60" };

            // Convert 12-hour to 24-hour format
            if (clock_start_unit === "PM" && clock_hour !== 12)
              clock_hour += 12;
            if (clock_end_unit === "PM" && clock_hur !== 12) clock_hur += 12;

            const start_time =
              clock_hour * 3600 + clock_minute * 60 + clock_second;
            const end_time = clock_hur * 3600 + clock_mints * 60 + clock_secs;

            answer = end_time - start_time;

            // Handle negative duration (PM → AM transition)
            if (answer < 0) answer += 24 * 60 * 60;

            hours = Math.floor(answer / 3600);
            minutes = Math.floor((answer % 3600) / 60);
            seconds = answer % 60;
          } else {
            return { error: "Please! Check Your Input" };
          }
        }
      }

      // ✅ Final result
      return {
        tech_hours: hours,
        tech_minutes: minutes,
        tech_seconds: seconds,
        tech_answer: answer,
      };
    } catch (error) {
      return { error: error.message };
    }
  }

  /**
   * getCalculationDaysUntilCalculator: Service Method
   * POST: /api/calculators-lol/days-until-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationDaysUntilCalculator(body) {
    try {
      const current = body.tech_current;
      const next = body.tech_next;
      const startEvent = body.tech_startEvent;
      const inc_all = body.tech_inc_all;
      const inc_day = body.tech_inc_day;
      const weekDay = body.tech_weekDay; // array or single value

      if (!current || !next) {
        return { error: "Please! Check Your Input" };
      }

      const date1 = dayjs.utc(current);
      const date2 = dayjs.utc(next);

      if (!date1.isValid() || !date2.isValid()) {
        return { error: "Invalid date(s) provided" };
      }

      // Calculate difference
      const totaldays = Math.abs(date2.diff(date1, "day"));
      const weeks = Math.floor(totaldays / 7);
      const days = totaldays % 7;
      const months = Math.abs(date2.diff(date1, "month"));

      let adjTotalDays = totaldays;
      let adjDays = days;
      let hours = 0;

      // ➕ Include one extra day
      if (inc_day) {
        adjDays += 1;
        adjTotalDays += 1;
      }

      // ⚙️ Handle "Include All" and "Selected Weekdays"
      if (!inc_all) {
        if (!weekDay || weekDay.length === 0) {
          adjDays = 0;
          hours = 0;
        } else {
          const selectedDays = Array.isArray(weekDay) ? weekDay : [weekDay];
          const additionalDays = selectedDays.length;

          if (additionalDays > 0) {
            adjDays = weeks * additionalDays + adjDays;
            hours = adjDays * 24;
          }
        }
      }

      // ✅ Final response
      return {
        tech_totaldays: adjTotalDays,
        tech_months: months,
        tech_weeks: weeks,
        tech_days: adjDays,
        tech_hours: hours,
      };
    } catch (error) {
      return { error: error.message };
    }
  }

  /**
   * getCalculationWeekCalculator: Service Method
   * POST: /api/calculators-lol/week-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationWeekCalculator(body) {
    try {
      const current = body.tech_current; // e.g., "2025-10-26"
      const next = body.tech_next; // optional
      const number = parseInt(body.tech_number);
      const stype = body.tech_stype; // "s_date" | "e_date" | undefined

      const date1 = dayjs.utc(current);

      if (stype == "s_date") {
        // ➕ Add weeks
        if (isNaN(number)) {
          return { error: "Please input Number of weeks" };
        }
        const addedDate = date1.add(number, "week");
        return { tech_adding: addedDate.format("MMMM D, YYYY") };
      } else if (stype == "e_date") {
        // ➖ Subtract weeks
        if (isNaN(number)) {
          return { error: "Please input Number of weeks" };
        }
        const subtractedDate = date1.subtract(number, "week");
        return { tech_subbtract: subtractedDate.format("MMMM D, YYYY") };
      } else {
        // 🔄 Difference in weeks between two dates
        const date2 = dayjs.utc(next);
        if (!date2.isValid() || !date1.isValid()) {
          return { error: "Invalid date(s) provided" };
        }

        const totalDays = Math.abs(date1.diff(date2, "day"));
        const weeks = Math.floor(totalDays / 7);
        return { tech_weeks: weeks };
      }
    } catch (error) {
      return { error: error.message };
    }
  }

  /**
   * getCalculationDaysFromTodayCalculator: Service Method
   * POST: /api/calculators-lol/days-from-today
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationDaysFromTodayCalculator(body) {
    try {
      const number = parseInt(body.tech_number);
      const current = body.tech_current; // e.g. "2025-10-26"

      if (isNaN(number)) {
        return { error: "Please add Number of days" };
      }

      const date = dayjs.utc(current);
      let resultDate;

      // ✅ Add or subtract days based on input
      if (number >= 1 || number === 0) {
        resultDate = date.add(number, "day");
      } else if (number <= -1) {
        resultDate = date.subtract(Math.abs(number), "day");
      }

      // ✅ Prepare output (same as Laravel)
      return {
        tech_date_name: resultDate.format("dddd"),
        tech_t_date: resultDate.format("MMMM D, YYYY"), // e.g., October 20, 2025
        tech_uk_date: resultDate.format("D MMMM, YYYY"), // e.g., 20 October, 2025
        tech_number: resultDate.format("DD/MM/YY"), // e.g., 20/10/25
        tech_usa_num: resultDate.format("MM/DD/YY"), // e.g., 10/20/25
        tech_iso: resultDate.format("YYYY-MM-DD"), // e.g., 2025-10-20
      };
    } catch (error) {
      return { error: error.message };
    }
  }

  /**
   * getCalculationWeekFromTodayCalculator: Service Method
   * POST: /api/calculators-lol/weeks-from-today
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationWeekFromTodayCalculator(body) {
    try {
      const number = parseInt(body.tech_number);
      const current = body.tech_current; // e.g. "2025-10-26"

      if (isNaN(number)) {
        return { error: "Please add Number of Weeks" };
      }

      const date = dayjs.utc(current);
      let resultDate;

      // ✅ Add or subtract weeks
      if (number >= 1 || number === 0) {
        resultDate = date.add(number, "week");
      } else {
        resultDate = date.subtract(Math.abs(number), "week");
      }

      // ✅ Leap year check
      const isLeapYear =
        (resultDate.year() % 4 === 0 && resultDate.year() % 100 !== 0) ||
        resultDate.year() % 400 === 0;

      const daysInYear = isLeapYear ? 366 : 365;
      const weeksInYear = 52;

      // ✅ Compute week/day of year manually
      const startOfYear = resultDate.startOf("year");
      const currentDayOfYear = resultDate.diff(startOfYear, "day") + 1;
      const currentWeekOfYear = Math.ceil(currentDayOfYear / 7);

      // ✅ Build output
      return {
        tech_date_name: resultDate.format("dddd"),
        tech_t_date: resultDate.format("MMMM D, YYYY"),
        tech_daysInYear: daysInYear,
        tech_weeksInYear: weeksInYear,
        tech_currentWeekOfYear: currentWeekOfYear,
        tech_currentDayOfYear: currentDayOfYear,
        // Optional formats:
        tech_uk_date: resultDate.format("D MMMM, YYYY"),
        tech_number: resultDate.format("DD/MM/YY"),
        tech_usa_num: resultDate.format("MM/DD/YY"),
        tech_iso: resultDate.format("YYYY-MM-DD"),
      };
    } catch (error) {
      return { error: error.message };
    }
  }

  /**
   * getCalculationyearFromTodayCalculator: Service Method
   * POST: /api/calculators-lol/years-from-today
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationyearFromTodayCalculator(body) {
    try {
      const number = parseInt(body.tech_number);
      const current = body.tech_current; // e.g. "2025-10-26"

      if (isNaN(number)) {
        return { error: "Please add Number of Years" };
      }

      const date1 = dayjs.utc(current);

      let dateAfterAddingYear;
      if (number >= 1 || number === 0) {
        // ✅ Add years
        dateAfterAddingYear = date1.add(number, "year");
      } else {
        // ✅ Subtract years
        dateAfterAddingYear = date1.subtract(Math.abs(number), "year");
      }

      // ✅ Calculate differences
      const daysDifference = Math.abs(date1.diff(dateAfterAddingYear, "day"));
      const weeksDifference = Math.abs(date1.diff(dateAfterAddingYear, "week"));

      // ✅ Format output
      return {
        tech_: number >= 0 ? weeksDifference : `-${weeksDifference}`,
        tech_DayOfYear: number >= 0 ? daysDifference : `-${daysDifference}`,
        tech_date_name: dateAfterAddingYear.format("dddd"),
        tech_t_date: dateAfterAddingYear.format("MMMM D, YYYY"),
        // Optional formats if needed:
        tech_uk_date: dateAfterAddingYear.format("D MMMM, YYYY"),
        tech_number_format: dateAfterAddingYear.format("DD/MM/YY"),
        tech_usa_num: dateAfterAddingYear.format("MM/DD/YY"),
        tech_iso: dateAfterAddingYear.format("YYYY-MM-DD"),
      };
    } catch (error) {
      return { error: error.message };
    }
  }

  /**
   * getCalculationHoursFromNowCalculator: Service Method
   * POST: /api/calculators-lol/hours-from-now
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationHoursFromNowCalculator(body) {
    try {
      const hours = parseInt(body.tech_hours);
      const minutes = parseInt(body.tech_minuts);
      const seconds = parseInt(body.tech_sec);
      const hrs = parseInt(body.tech_hrs);
      const min = parseInt(body.tech_min);

      // ✅ Create initial time (UTC)
      const date1 = dayjs.utc().hour(hours).minute(minutes).second(seconds);

      // ✅ Add given hours and minutes
      const hoursAdding = date1.add(hrs, "hour").add(min, "minute");

      // ✅ Return formatted data
      return {
        tech_original_time: date1.format("HH:mm:ss"),
        tech_new_time: hoursAdding.format("HH:mm:ss"),
        tech_full_date: hoursAdding.format("YYYY-MM-DD HH:mm:ss"),
      };
    } catch (error) {
      return { error: error.message };
    }
  }

  /**
   * getCalculationTimeUntilCalculator: Service Method
   * POST: /api/calculators-lol/time-until-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationTimeUntilCalculator(body) {
    try {
      const currentInput = body.tech_current; // e.g. "2025-10-18 10:30:00"
      const nextInput = body.tech_next; // e.g. "2025-12-25 12:00:00"

      // ✅ Parse dates in UTC
      const currentTime = dayjs.utc(currentInput);
      const nextTime = dayjs.utc(nextInput);
      const today = dayjs.utc();

      // ✅ Validate date inputs
      if (!currentTime.isValid() || !nextTime.isValid()) {
        return { error: "Please enter valid dates" };
      }

      // ✅ Ensure next date is not in the past
      if (nextTime.isBefore(today)) {
        return { error: "Next date cannot be less than today's date." };
      }

      // ✅ Total seconds difference
      const totalSeconds = nextTime.diff(currentTime, "second");

      // ✅ Break down into time units
      const years = Math.floor(totalSeconds / (365 * 24 * 60 * 60));
      const months = Math.floor(
        (totalSeconds % (365 * 24 * 60 * 60)) / (30 * 24 * 60 * 60)
      );
      const days = Math.floor(
        (totalSeconds % (30 * 24 * 60 * 60)) / (24 * 60 * 60)
      );
      const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
      const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
      const seconds = totalSeconds % 60;

      // ✅ Return structured response
      return {
        tech_years: years,
        tech_months: months,
        tech_days: days,
        tech_hours: hours,
        tech_minutes: minutes,
        tech_seconds: seconds,
      };
    } catch (error) {
      return { error: error.message };
    }
  }

  /**
   * getCalculationHoursAgoCalculator: Service Method
   * POST: /api/calculators-lol/hours-ago-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationHoursAgoCalculator(body) {
    try {
      const hours = parseInt(body.tech_hours);
      const minutes = parseInt(body.tech_minutes);
      const seconds = parseInt(body.tech_seconds);
      const hrs = parseInt(body.tech_hrs);
      const min = parseInt(body.tech_min);

      // ✅ Create base time from inputs (use UTC)
      let current = dayjs.utc().hour(hours).minute(minutes).second(seconds);

      // ✅ Validate input
      if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
        return { error: "Invalid current time" };
      }

      let result = {};

      // ✅ Case 1: Subtract time if current >= 1
      if (hours >= 1 || minutes >= 1 || seconds >= 1) {
        const timeSubtract = current
          .subtract(hrs, "hour")
          .subtract(min, "minute");

        const t_date = timeSubtract.format("MMMM D, YYYY");
        const days = Math.abs(current.diff(timeSubtract, "day"));

        result.tech_days = days;
        result.tech_t_date = t_date;
        result.tech_time = timeSubtract.format("hh:mm A");
      }
      // ✅ Case 2: Add time if current < 1
      else {
        const timeAdd = current
          .add(Math.abs(hrs), "hour")
          .add(Math.abs(min), "minute");

        const t_date = timeAdd.format("MMMM D, YYYY");
        const days = Math.abs(current.diff(timeAdd, "day"));

        result.tech_days = days;
        result.tech_t_date = t_date;
        result.tech_time = timeAdd.format("hh:mm A");
      }

      return result;
    } catch (error) {
      return { error: error.message };
    }
  }

  /**
   * getCalculationYearsAgoCalculator: Service Method
   * POST: /api/calculators-lol/years-ago-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationYearsAgoCalculator(body) {
    try {
      const number = parseInt(body.tech_number);
      const current = body.tech_current; // e.g. "2025-10-26"

      // ✅ Validate inputs
      if (isNaN(number)) {
        return { error: "Please add Number of Years" };
      }

      const dateNow = dayjs.utc(current, "YYYY-MM-DD");
      if (!dateNow.isValid()) {
        return { error: "Invalid current date" };
      }

      let targetDate;

      // ✅ Case 1: Subtract years if number >= 1
      if (number >= 1) {
        targetDate = dateNow.subtract(number, "year");
      }
      // ✅ Case 2: Add years if number < 0
      else {
        targetDate = dateNow.add(Math.abs(number), "year");
      }

      // ✅ Calculate differences
      const daysDifference = Math.abs(dateNow.diff(targetDate, "day"));
      const weeksDifference = Math.abs(dateNow.diff(targetDate, "week"));
      const monthsDifference = Math.abs(dateNow.diff(targetDate, "month"));

      // ✅ Build response
      const result = {
        tech_DayOfYear: daysDifference,
        tech_WeekOfYear: weeksDifference,
        tech_diffInMonths: monthsDifference,
        tech_date_name: targetDate.format("dddd"), // Day name
        tech_t_date: targetDate.format("MMMM D, YYYY"), // Example: October 18, 2025
      };

      return result;
    } catch (error) {
      return { error: error.message };
    }
  }

  /**
   * getCalculationWeeksAgoCalculator: Service Method
   * POST: /api/calculators-lol/weeks-ago-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationWeeksAgoCalculator(body) {
    try {
      // ✅ Support both Laravel-style and tech_ prefix
      const number = parseInt(body.tech_number);
      const current = body.tech_current; // e.g. "2025-10-26"

      if (isNaN(number)) {
        return {
          status: "success",
          payload: { error: "Please add Number of Weeks" },
        };
      }

      const date = dayjs.utc(current, "YYYY-MM-DD");
      if (!date.isValid()) {
        return {
          status: "success",
          payload: { error: "Invalid current date" },
        };
      }

      let targetDate;

      // ✅ Laravel logic replication
      if (number <= -1 || number === 0) {
        targetDate = date.add(Math.abs(number), "week");
      } else if (number >= 1) {
        targetDate = date.subtract(number, "week");
      }

      const isLeap = targetDate.isLeapYear();
      const daysInYear = isLeap ? 366 : 365;
      const weeksInYear = 52;
      const currentWeekOfYear = targetDate.week();
      const currentDayOfYear = targetDate.dayOfYear();

      const result = {
        tech_date_name: targetDate.format("dddd"),
        tech_t_date: targetDate.format("MMMM D, YYYY"),
        tech_daysInYear: daysInYear,
        tech_weeksInYear: weeksInYear,
        tech_currentWeekOfYear: currentWeekOfYear,
        tech_currentDayOfYear: currentDayOfYear,
      };

      return { status: "success", payload: result };
    } catch (error) {
      return { status: "fail", message: error.message };
    }
  }

  /**
   * getCalculationDaysAgoCalculator: Service Method
   * POST: /api/calculators-lol/days-ago-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationDaysAgoCalculator(body) {
    try {
      const number = parseInt(body.tech_number);
      const current = body.tech_current; // e.g., "2025-10-18"

      if (isNaN(number)) {
        return { error: "Please add Number of Weeks" };
      }

      const date = dayjs.utc(current, "YYYY-MM-DD");
      if (!date.isValid()) {
        return { error: "Invalid current date" };
      }

      let targetDate;

      // ✅ Match Laravel logic:
      if (number <= -1 || number === 0) {
        // Add days (abs of negative number)
        targetDate = date.add(Math.abs(number), "day");
      } else if (number >= 1) {
        // Subtract days
        targetDate = date.subtract(number, "day");
      }

      const isLeap = targetDate.isLeapYear();
      const daysInYear = isLeap ? 366 : 365;
      const weeksInYear = 52;
      const currentWeekOfYear = targetDate.week();
      const currentDayOfYear = targetDate.dayOfYear();

      const result = {
        tech_date_name: targetDate.format("dddd"),
        tech_t_date: targetDate.format("MMMM D, YYYY"),
        tech_daysInYear: daysInYear,
        tech_weeksInYear: weeksInYear,
        tech_currentWeekOfYear: currentWeekOfYear,
        tech_currentDayOfYear: currentDayOfYear,
      };

      return { status: "success", payload: result };
    } catch (error) {
      return { status: "fail", message: error.message };
    }
  }

  /**
   * getCalculationDaysLeftInTheYearCalculator: Service Method
   * POST: /api/calculators-lol/days-left-in-the-year
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationDaysLeftInTheYearCalculator(body) {
    try {
      const day = parseInt(body.tech_day);
      const month = parseInt(body.tech_month);
      const year = parseInt(body.tech_year);

      if (isNaN(day) || isNaN(month) || isNaN(year)) {
        return { error: "Invalid date input" };
      }

      // ✅ Create proper date
      const dob = dayjs.utc(`${year}-${month}-${day}`, "YYYY-M-D");
      if (!dob.isValid()) {
        return { error: "Invalid date format" };
      }

      const date1 = dob.format("dddd, MMMM DD, YYYY");
      const now = dob; // same as Carbon($date1)

      // ✅ Leap year check
      const leapYear = now.isLeapYear();
      const daysInYear = leapYear ? 366 : 365;

      // ✅ End of the year
      const endOfYear = dayjs.utc(`${year}-12-31 23:59:59`);

      // ✅ Differences
      const daysRemaining = endOfYear.diff(now, "day");
      const weeksRemaining = endOfYear.diff(now, "week");
      const remainingDaysAfterWeeks = daysRemaining - weeksRemaining * 7;

      const monthsRemaining = endOfYear.diff(now, "month");
      const remainingDaysAfterMonths = daysRemaining - monthsRemaining * 30;

      const hoursRemaining = endOfYear.diff(now, "hour");

      // ✅ Prepare result
      const result = {
        tech_date1: date1,
        tech_now: now.format("MM-DD-YYYY"),
        tech_daysRemaining: daysRemaining,
        tech_weeksRemaining: weeksRemaining,
        tech_remainingDaysAfterWeeks: remainingDaysAfterWeeks,
        tech_monthsRemaining: monthsRemaining,
        tech_remainingDaysAfterMonths: remainingDaysAfterMonths,
        tech_hoursRemaining: hoursRemaining,
        tech_isLeapYear: leapYear,
        tech_daysInYear: daysInYear,
      };

      return { status: "success", payload: result };
    } catch (error) {
      return { status: "fail", message: error.message };
    }
  }

  /**
   * getCalculationJuliansDateCalculator: Service Method
   * POST: /api/calculators-lol/julians-date-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationJuliansDateCalculator(body) {
    const result = {};

    const day = parseInt(body.tech_day);
    const month = parseInt(body.tech_month);
    const year = parseInt(body.tech_year);
    const timecheck = body.tech_timecheck;
    const julian = parseFloat(body.tech_julian);

    // Format date string
    const dob = `${year.toString().padStart(4, "0")}-${month
      .toString()
      .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

    // Format date1 (e.g., "Monday, January 01, 2024")
    const date1Obj = new Date(year, month - 1, day);
    const date1 = date1Obj.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "2-digit",
    });

    if (timecheck === "stat") {
      // Gregorian to Julian Date conversion
      let adjYear = year;
      let adjMonth = month;

      if (adjMonth <= 2) {
        adjYear -= 1;
        adjMonth += 12;
      }

      const A = Math.floor(adjYear / 100);
      const B = 2 - A + Math.floor(A / 4);
      const julianDate =
        Math.floor(365.25 * (adjYear + 4716)) +
        Math.floor(30.6001 * (adjMonth + 1)) +
        day +
        B -
        1524.5;

      result.tech_julianDate = julianDate;
    } else {
      // Julian Date to Gregorian conversion
      if (!julian && julian !== 0) {
        return { error: "Please Enter Julian Date" };
      }

      let adjJulian = julian + 0.5;
      const Z = Math.floor(adjJulian);
      const F = adjJulian - Z;

      let A;
      if (Z < 2299161) {
        A = Z;
      } else {
        const alpha = Math.floor((Z - 1867216.25) / 36524.25);
        A = Z + 1 + alpha - Math.floor(alpha / 4);
      }

      const B = A + 1524;
      const C = Math.floor((B - 122.1) / 365.25);
      const D = Math.floor(365.25 * C);
      const E = Math.floor((B - D) / 30.6001);

      let calcDay = B - D - Math.floor(30.6001 * E) + F;

      let calcMonth;
      if (E < 14) {
        calcMonth = E - 1;
      } else {
        calcMonth = E - 13;
      }

      let calcYear;
      if (calcMonth > 2) {
        calcYear = C - 4716;
      } else {
        calcYear = C - 4715;
      }

      calcYear = Math.floor(calcYear);
      calcMonth = Math.floor(calcMonth);
      calcDay = Math.floor(calcDay);

      // Calculate day of week using standard Julian Day formula
      // This matches PHP's internal calculation
      const jd = Math.floor(julian + 0.5);
      const dayOfWeekIndex = (jd + 4) % 7;
      const dayNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const monthNames = [
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

      const dayOfWeek = dayNames[dayOfWeekIndex];
      const monthName = monthNames[calcMonth - 1];
      const dayStr = calcDay.toString().padStart(2, "0");

      // Format: "Tuesday, -4712 July 27"
      const jul_date = `${dayOfWeek}, ${calcYear} ${monthName} ${dayStr}`;

      result.tech_jul_date = jul_date;
    }

    result.tech_date1 = date1;

    return result;
  }
  /**
   * getCalculationWeeksBetweenDatesCalculator: Service Method
   * POST: /api/calculators-lol/weeks-between-dates-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationWeeksBetweenDatesCalculator(body) {
    try {
      const day = parseInt(body.tech_day);
      const month = parseInt(body.tech_month);
      const year = parseInt(body.tech_year);
      const day1 = parseInt(body.tech_day1);
      const month1 = parseInt(body.tech_month1);
      const year1 = parseInt(body.tech_year1);

      // Create UTC dates
      const date1 = dayjs.utc(`${year}-${month}-${day}`, "YYYY-M-D");
      const date2 = dayjs.utc(`${year1}-${month1}-${day1}`, "YYYY-M-D");

      // Validate both dates
      if (!date1.isValid() || !date2.isValid()) {
        return { error: "Invalid date(s) provided" };
      }

      // Calculate absolute difference in days
      const totalDays = Math.abs(date2.diff(date1, "day"));
      const weeks = Math.floor(totalDays / 7);
      const days = totalDays % 7;

      // Return result (mimicking Laravel's structure)
      return {
        tech_date1: date1.format("YYYY-MM-DD"),
        tech_date2: date2.format("YYYY-MM-DD"),
        tech_weeks: weeks,
        tech_days: days,
      };
    } catch (error) {
      console.error(
        "Error in getCalculationWeeksBetweenDatesCalculator:",
        error
      );
      return { error: "Internal Server Error" };
    }
  }

  /**
   * getCalculationMonthFromNowCalculator: Service Method
   * POST: /api/calculators-lol/months-from-now
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationMonthFromNowCalculator(body) {
    try {
      const number = parseInt(body.tech_number);
      const current = body.tech_current;

      if (!isNaN(number)) {
        if (number >= 1 || number == 0) {
          const date1 = dayjs.utc(current);
          const dateAfterAddingMonths = date1.add(number, "month");

          const isLeap = dateAfterAddingMonths.isLeapYear();
          const daysInYear = isLeap ? 366 : 365;
          const weeksInYear = 52;
          const currentWeekOfYear = dateAfterAddingMonths.isoWeek(); // ✅ ISO-based week number
          const currentDayOfYear = dateAfterAddingMonths.dayOfYear();

          return {
            tech_date_name: dateAfterAddingMonths.format("dddd"),
            tech_t_date: dateAfterAddingMonths.format("MMMM D, YYYY"),
            tech_daysInYear: daysInYear,
            tech_weeksInYear: weeksInYear,
            tech_currentWeekOfYear: currentWeekOfYear,
            tech_currentDayOfYear: currentDayOfYear,
          };
        } else if (number <= -1) {
          const date2 = dayjs.utc(current);
          const dateAfterSubtractingMonths = date2.subtract(
            Math.abs(number),
            "month"
          );

          const isLeap = dateAfterSubtractingMonths.isLeapYear();
          const daysInYear = isLeap ? 366 : 365;
          const weeksInYear = 52;
          const currentWeekOfYear = dateAfterSubtractingMonths.isoWeek(); // ✅ ISO-based week number
          const currentDayOfYear = dateAfterSubtractingMonths.dayOfYear();

          return {
            tech_date_name: dateAfterSubtractingMonths.format("dddd"),
            tech_t_date: dateAfterSubtractingMonths.format("MMMM D, YYYY"),
            tech_daysInYear: daysInYear,
            tech_weeksInYear: weeksInYear,
            tech_currentWeekOfYear: currentWeekOfYear,
            tech_currentDayOfYear: currentDayOfYear,
          };
        }
      } else {
        return { error: "Please add Number of Months" };
      }
    } catch (error) {
      console.error("Error in getCalculationMonthFromNowCalculator:", error);
      return { error: "Internal Server Error" };
    }
  }

  /**
   * getCalculationhowManyWeeksLeftIntheYearCalculator: Service Method
   * POST: /api/calculators-lol/weeks-left-in-the-year
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationhowManyWeeksLeftIntheYearCalculator(body) {
    try {
      const day = parseInt(body.tech_day);
      const month = parseInt(body.tech_month);
      const year = parseInt(body.tech_year);

      // Validate input
      const now = dayjs.utc(`${year}-${month}-${day}`, "YYYY-M-D");
      if (!now.isValid()) {
        return { error: "Invalid date provided" };
      }

      // Check leap year
      const isLeap = now.isLeapYear();
      const daysInYear = isLeap ? 366 : 365;
      const weeksInYear = 52;

      // End of current year
      const endOfYear = dayjs.utc(`${year}-12-31T23:59:59Z`);

      // Calculate differences
      const daysRemaining = endOfYear.diff(now, "day");
      const weeksRemaining = endOfYear.diff(now, "week");
      const remainingDaysAfterWeeks = daysRemaining - weeksRemaining * 7;

      const monthsRemaining = endOfYear.diff(now, "month");
      const remainingDaysAfterMonths = daysRemaining - monthsRemaining * 30; // Approximation
      const hoursRemaining = endOfYear.diff(now, "hour");

      // Return results (same structure as Laravel version)
      return {
        tech_now: now.format("MM-DD-YYYY"),
        tech_isLeapYear: isLeap,
        tech_daysInYear: daysInYear,
        tech_weeksInYear: weeksInYear,
        tech_daysRemaining: daysRemaining,
        tech_weeksRemaining: weeksRemaining,
        tech_remainingDaysAfterWeeks: remainingDaysAfterWeeks,
        tech_monthsRemaining: monthsRemaining,
        tech_remainingDaysAfterMonths: remainingDaysAfterMonths,
        tech_hoursRemaining: hoursRemaining,
      };
    } catch (error) {
      console.error("Error calculating weeks left:", error);
      return { error: "Internal Server Error" };
    }
  }

  /**
   * getCalculationhowManymonthsLeftIntheYearCalculator: Service Method
   * POST: /api/calculators-lol/months-left-in-the-year
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationhowManymonthsLeftIntheYearCalculator(body) {
    try {
      const day = parseInt(body.tech_day);
      const month = parseInt(body.tech_month);
      const year = parseInt(body.tech_year);

      // Create current date in UTC
      const now = dayjs.utc(`${year}-${month}-${day}`, "YYYY-M-D");
      if (!now.isValid()) {
        return { error: "Invalid date provided" };
      }

      // Check leap year
      const isLeap = now.isLeapYear();
      const daysInYear = isLeap ? 366 : 365;
      const weeksInYear = 52;

      // End of current year
      const endOfYear = dayjs.utc(`${year}-12-31T23:59:59Z`);

      // Calculate differences
      const daysRemaining = endOfYear.diff(now, "day");
      const weeksRemaining = endOfYear.diff(now, "week");
      const remainingDaysAfterWeeks = daysRemaining - weeksRemaining * 7;

      const monthsRemaining = endOfYear.diff(now, "month");
      const remainingDaysAfterMonths = daysRemaining - monthsRemaining * 30; // Approximation

      const hoursRemaining = endOfYear.diff(now, "hour");

      return {
        tech_now: now.format("MM-DD-YYYY"),
        tech_isLeapYear: isLeap,
        tech_daysInYear: daysInYear,
        tech_weeksInYear: weeksInYear,
        tech_daysRemaining: daysRemaining,
        tech_weeksRemaining: weeksRemaining,
        tech_remainingDaysAfterWeeks: remainingDaysAfterWeeks,
        tech_monthsRemaining: monthsRemaining,
        tech_remainingDaysAfterMonths: remainingDaysAfterMonths,
        tech_hoursRemaining: hoursRemaining,
      };
    } catch (error) {
      console.error("Error calculating months left:", error);
      return { error: "Internal Server Error" };
    }
  }

  /**
   * getCalculationhowManyDaysUntilMyBirthdayCalculator: Service Method
   * POST: /api/calculators-lol/how-many-days-until-my-birthday
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationhowManyDaysUntilMyBirthdayCalculator(body) {
    try {
      // ✅ Define the Age class inside the function
      class Age {
        constructor() {
          this.age = "";
        }

        calculateAge(timestamp) {
          const now = dayjs.utc();
          const birthDate = dayjs.utc(timestamp);

          let age = now.year() - birthDate.year();
          const monthDiff = now.month() - birthDate.month();
          const dayDiff = now.date() - birthDate.date();

          if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
          }

          this.age = age;
        }

        getAge2() {
          return this.age;
        }

        getRank(rank) {
          const strRank = String(rank);
          const last = parseInt(strRank.slice(-1));
          const secLast = parseInt(strRank.slice(-2, -1));
          let ext;

          if (last > 3 || last === 0) ext = "th";
          else if (last === 3) ext = "rd";
          else if (last === 2) ext = "nd";
          else ext = "st";

          if (
            (last === 1 && secLast === 1) ||
            (last === 2 && secLast === 1) ||
            (last === 3 && secLast === 1)
          ) {
            ext = "th";
          }

          return `${rank}${ext}`;
        }
      }

      // ✅ Extract input values
      const day = parseInt(body.tech_day);
      const month = parseInt(body.tech_month);
      const year = parseInt(body.tech_year);

      // ✅ Validate DOB
      const dob = dayjs.utc(`${year}-${month}-${day}`, "YYYY-M-D");
      if (!dob.isValid()) {
        return { error: "Invalid date of birth" };
      }

      // ✅ Calculate age
      const ageObj = new Age();
      ageObj.calculateAge(dob.toDate().getTime());
      const age = ageObj.getAge2();

      // ✅ Get current date
      const now = dayjs.utc();

      // ✅ Find next birthday
      let nextBirthday = dayjs.utc(`${now.year()}-${month}-${day}`, "YYYY-M-D");
      if (nextBirthday.isBefore(now)) {
        nextBirthday = nextBirthday.add(1, "year");
      }

      // ✅ Calculate differences
      const daysUntilNextBirthday = nextBirthday.diff(now, "day");
      const diffInHours = nextBirthday.diff(now, "hour");
      const diffInMinutes = nextBirthday.diff(now, "minute");
      const diffInMonths = nextBirthday.diff(now, "month");

      // ✅ Build and return response
      return {
        tech_nextBirthday: nextBirthday.format("YYYY-MM-DD"),
        tech_dob: dob.format("MM-DD-YYYY"),
        tech_age: age,
        tech_diffInHours: diffInHours,
        tech_diffInMinutes: diffInMinutes,
        tech_diffInMonths: diffInMonths,
        tech_daysUntilNextBirthday: daysUntilNextBirthday,
      };
    } catch (error) {
      console.error("Error:", error);
      return { error: "Internal server error" };
    }
  }

  /**
   * getCalculationDaysSinceDateCalculator: Service Method
   * POST: /api/calculators-lol/days-since-date-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationDaysSinceDateCalculator(body) {
    try {
      const day = parseInt(body.tech_day);
      const month = parseInt(body.tech_month);
      const year = parseInt(body.tech_year);
      const day1 = parseInt(body.tech_day1);
      const month1 = parseInt(body.tech_month1);
      const year1 = parseInt(body.tech_year1);

      // Create dates
      let date1 = dayjs.utc(`${year}-${month}-${day}`, "YYYY-M-D");
      let date2 = dayjs.utc(`${year1}-${month1}-${day1}`, "YYYY-M-D");

      // Ensure correct order
      if (date2.isBefore(date1)) {
        const temp = date1;
        date1 = date2;
        date2 = temp;
      }

      // Total days (same as Laravel)
      const totaldays = date2.diff(date1, "day");

      let workingDays = 0;
      let holidays = 0;
      let currentDate = date1;

      // Loop until the day BEFORE date2 (to match Laravel)
      while (currentDate.isBefore(date2, "day")) {
        const dayOfWeek = currentDate.day(); // 0=Sun, 6=Sat
        if (dayOfWeek === 0 || dayOfWeek === 6) {
          holidays++;
        } else {
          workingDays++;
        }
        currentDate = currentDate.add(1, "day");
      }

      return {
        workingDays,
        holidays,
        totaldays,
      };
    } catch (error) {
      console.error("Error in getCalculationDaysSinceDateCalculator:", error);
      return { error: "Invalid input or calculation error." };
    }
  }
}

module.exports = new CalculatorsServices();
