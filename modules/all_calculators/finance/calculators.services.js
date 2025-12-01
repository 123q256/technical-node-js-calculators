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
   * getCalculationSalaryCalculator: Service Method
   * POST: /api/calculators-lol/salary-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationSalaryCalculator(body) {
    const param = {};

    const salary = parseFloat(body.salary);
    const week_hours = parseFloat(body.hours);
    const week_day = parseFloat(body.days);
    const holidays = parseFloat(body.holidays) || 0;
    const vacation = parseFloat(body.vacation) || 0;
    const total_leaves = holidays + vacation;

    if (!isNaN(salary) && !isNaN(week_hours)) {
      const yearly_hours = week_hours * 52;
      const daily_hours = week_hours / week_day;

      let hourly, daily, week, bi_week, yearly, monthly, sami_month, quarterly;
      let a_hourly,
        a_daily,
        a_week,
        a_bi_week,
        a_monthly,
        a_sami_month,
        a_quarterly,
        a_yearly;

      if (body.per === "Hourly") {
        hourly = salary;
        daily = +(salary * daily_hours).toFixed(2);
        week = +(week_hours * salary).toFixed(2);
        bi_week = +(week * 2).toFixed(2);
        yearly = +(yearly_hours * salary).toFixed(2);
        monthly = +(yearly / 12).toFixed(2);
        sami_month = +(monthly / 2).toFixed(2);
        quarterly = +(yearly / 4).toFixed(2);
      } else if (body.per === "Daily") {
        daily = salary;
        hourly = +(salary / daily_hours).toFixed(2);
        week = +(week_hours * hourly).toFixed(2);
        bi_week = +(week * 2).toFixed(2);
        yearly = +(yearly_hours * hourly).toFixed(2);
        monthly = +(yearly / 12).toFixed(2);
        sami_month = +(monthly / 2).toFixed(2);
        quarterly = +(yearly / 4).toFixed(2);
      } else if (body.per === "Weekly") {
        a_week = salary;
        a_hourly = +(a_week / week_hours).toFixed(2);
        a_daily = +(a_hourly * daily_hours).toFixed(2);
        a_bi_week = +(a_week * 2).toFixed(2);
        a_yearly = +(yearly_hours * a_hourly).toFixed(2);
        a_monthly = +(a_yearly / 12).toFixed(2);
        a_sami_month = +(a_monthly / 2).toFixed(2);
        a_quarterly = +(a_yearly / 4).toFixed(2);
      } else if (body.per === "Bi-Weekly") {
        a_bi_week = salary;
        a_week = +(a_bi_week * 2).toFixed(2);
        a_hourly = +(a_week / week_hours).toFixed(2);
        a_daily = +(a_hourly * daily_hours).toFixed(2);
        a_yearly = +(yearly_hours * a_hourly).toFixed(2);
        a_monthly = +(a_yearly / 12).toFixed(2);
        a_sami_month = +(a_monthly / 2).toFixed(2);
        a_quarterly = +(a_yearly / 4).toFixed(2);
      } else if (body.per === "Semi-Monthly") {
        a_sami_month = salary;
        a_monthly = +(a_sami_month * 2).toFixed(2);
        a_yearly = +(a_monthly * 12).toFixed(2);
        a_quarterly = +(a_yearly / 4).toFixed(2);
        a_hourly = +(a_yearly / yearly_hours).toFixed(2);
        a_daily = +(a_hourly * daily_hours).toFixed(2);
        a_week = +(week_hours * a_daily).toFixed(2);
        a_bi_week = +(a_week * 2).toFixed(2);
      } else if (body.per === "Monthly") {
        a_yearly = +(salary * 12).toFixed(2);
        a_quarterly = +(a_yearly / 4).toFixed(2);
        a_sami_month = +(salary / 2).toFixed(2);
        a_hourly = +(a_yearly / yearly_hours).toFixed(2);
        a_week = +(week_hours * a_hourly).toFixed(2);
        a_bi_week = +(a_week * 2).toFixed(2);
        a_daily = +(a_hourly * daily_hours).toFixed(2);
        a_monthly = salary;
      } else if (body.per === "Quarterly") {
        a_quarterly = salary;
        a_yearly = +(a_quarterly * 4).toFixed(2);
        a_hourly = +(a_yearly / yearly_hours).toFixed(2);
        a_daily = +(a_hourly * daily_hours).toFixed(2);
        a_week = +(week_hours * a_daily).toFixed(2);
        a_bi_week = +(a_week / 2).toFixed(2);
        a_monthly = +(a_yearly / 12).toFixed(2);
        a_sami_month = +(a_monthly / 2).toFixed(2);
      } else if (body.per === "Annual") {
        a_yearly = salary;
        a_hourly = +(a_yearly / yearly_hours).toFixed(2);
        a_daily = +(a_hourly * daily_hours).toFixed(2);
        a_week = +(week_hours * a_hourly).toFixed(2);
        a_bi_week = +(a_week * 2).toFixed(2);
        a_monthly = +(a_yearly / 12).toFixed(2);
        a_sami_month = +(a_monthly / 2).toFixed(2);
        a_quarterly = +(a_yearly * 4).toFixed(2);
      }
      if (total_leaves !== 0) {
        if (body.per === "Hourly" || body.per === "Daily") {
          const sub_salary = daily * total_leaves;
          a_yearly = +(yearly - sub_salary).toFixed(2);
          a_hourly = +(a_yearly / yearly_hours).toFixed(2);
          a_quarterly = +(a_yearly / 4).toFixed(2);
          a_monthly = +(a_yearly / 12).toFixed(2);
          a_sami_month = +(a_monthly / 2).toFixed(2);
          a_daily = +(a_hourly * daily_hours).toFixed(2);
          a_week = +(week_hours * a_hourly).toFixed(2);
          a_bi_week = +(a_week * 2).toFixed(2);
        } else {
          const hh = (260 - total_leaves) / 5;
          hourly = +(a_monthly / ((hh / 12) * week_hours)).toFixed(2);
          yearly = +(hourly * yearly_hours).toFixed(2);
          quarterly = +(yearly / 4).toFixed(2);
          monthly = +(yearly / 12).toFixed(2);
          sami_month = +(monthly / 2).toFixed(2);
          daily = +(hourly * daily_hours).toFixed(2);
          week = +(week_hours * hourly).toFixed(2);
          bi_week = +(week * 2).toFixed(2);
        }
      } else {
        if (body.per === "Hourly" || body.per === "Daily") {
          a_yearly = yearly;
          a_quarterly = quarterly;
          a_monthly = monthly;
          a_sami_month = sami_month;
          a_bi_week = bi_week;
          a_week = week;
          a_daily = daily;
          a_hourly = hourly;
        } else {
          yearly = a_yearly;
          quarterly = a_quarterly;
          monthly = a_monthly;
          sami_month = a_sami_month;
          bi_week = a_bi_week;
          week = a_week;
          daily = a_daily;
          hourly = a_hourly;
        }
      }

      let tax;
      if (!isNaN(body.tax)) {
        if (body.are === 1) {
          tax = body.tax / 100;
        } else {
          tax = 1 - body.tax / 100;
        }
      }

      Object.assign(param, {
        Hourly: +hourly.toFixed(2),
        Daily: daily,
        Week: week,
        Bi_week: bi_week,
        Monthly: monthly,
        Sami_month: sami_month,
        Quarterly: quarterly,
        Yearly: yearly,
        a_Hourly: +a_hourly.toFixed(2),
        a_Daily: a_daily,
        a_Week: a_week,
        a_Bi_week: a_bi_week,
        a_Monthly: a_monthly,
        a_Sami_month: a_sami_month,
        a_Quarterly: a_quarterly,
        a_Yearly: a_yearly,
        RESULT: 1,
      });

      if (typeof tax !== "undefined") {
        param.tax = tax;
      }

      return param;
    } else {
      return {
        error: "Please fill all fields.",
      };
    }
  }
  /**
   * getCalculationTaxCalculator: Service Method
   * POST: /api/calculators-lol/tax-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationTaxCalculator(body) {
    const result = {};

    // Validate input
    if (!this.isNumeric(body.tech_income) || !body.tech_f_state) {
      result.error = "Please! Check Your Input.";
      return result;
    }

    let income = parseFloat(body.tech_income);
    let s = 0;
    let tax = 0;
    let m_tax = 0;

    // Deduct k_con if provided
    if (this.isNumeric(body.tech_k_con)) {
      income = income - parseFloat(body.tech_k_con);
    }

    // Deduct IRA if provided
    if (this.isNumeric(body.tech_ira)) {
      income = income - parseFloat(body.tech_ira);
    }

    // Handle itemized deductions
    if (body.tech_ded == "i") {
      if (body.tech_item) {
        income = income - parseFloat(body.tech_item);
        s = parseFloat(body.tech_item);
      } else {
        result.error = "Please Itemized Deductions.";
        return result;
      }
    }

    // Tax Year 2019
    if (body.tech_tax_year == "2019") {
      if (body.tech_ded == "s") {
        if (body.tech_f_state == "s" || body.tech_f_state == "m_s") {
          if (body.tech_age < 65) {
            income = income - 12200;
            s = 12200;
          } else {
            income = income - 13800;
            s = 13800;
          }
        } else if (body.tech_f_state === "m_j") {
          if (body.tech_age < 65) {
            income = income - 24400;
            s = 24400;
          } else {
            income = income - 25700;
            s = 25700;
          }
        } else {
          if (body.tech_age < 65) {
            income = income - 18350;
            s = 18350;
          } else {
            income = income - 19950;
            s = 19950;
          }
        }
      }

      // Handle negative income
      if (income < 0) {
        return this.handleNegativeIncome(body);
      }

      // Calculate tax based on filing status
      if (body.tech_f_state == "s") {
        tax = this.calculateTax2019Single(income);
        m_tax = this.getMarginalTaxRate2019Single(income);
      } else if (body.tech_f_state == "m_j" || body.tech_f_state == "w") {
        tax = this.calculateTax2019MarriedJoint(income);
        m_tax = this.getMarginalTaxRate2019MarriedJoint(income);
      } else if (body.tech_f_state == "m_s") {
        tax = this.calculateTax2019MarriedSeparate(income);
        m_tax = this.getMarginalTaxRate2019MarriedSeparate(income);
      } else if (body.tech_f_state == "h") {
        tax = this.calculateTax2019HeadOfHousehold(income);
        m_tax = this.getMarginalTaxRate2019HeadOfHousehold(income);
      }
    }
    // Tax Year 2020
    else if (body.tech_tax_year == "2020") {
      if (body.tech_ded == "s") {
        if (body.tech_f_state == "s" || body.tech_f_state == "m_s") {
          income = income - 12400;
          s = 12400;
        } else if (body.tech_f_state == "m_j") {
          income = income - 24800;
          s = 24800;
        } else {
          income = income - 18650;
          s = 18650;
        }
      }

      // Handle negative income
      if (income < 0) {
        return this.handleNegativeIncome(body);
      }

      // Calculate tax based on filing status
      if (body.tech_f_state == "s") {
        tax = this.calculateTax2020Single(income);
        m_tax = this.getMarginalTaxRate2020Single(income);
      } else if (body.tech_f_state == "m_j" || body.tech_f_state == "w") {
        tax = this.calculateTax2020MarriedJoint(income);
        m_tax = this.getMarginalTaxRate2020MarriedJoint(income);
      } else if (body.tech_f_state == "m_s") {
        tax = this.calculateTax2020MarriedSeparate(income);
        m_tax = this.getMarginalTaxRate2020MarriedSeparate(income);
      } else if (body.tech_f_state == "h") {
        tax = this.calculateTax2020HeadOfHousehold(income);
        m_tax = this.getMarginalTaxRate2020HeadOfHousehold(income);
      }
    }

    // Calculate final results
    const a = income;
    const b = Math.round((tax / body.tech_income) * 100 * 100) / 100;
    const c = tax;
    let d = 0;

    if (this.isNumeric(body.tech_tax_with)) {
      d = parseFloat(body.tech_tax_with);
      tax = tax - d;
    }

    result.a = this.formatNumber(a);
    result.b = b;
    result.s = s;
    result.m_tax = m_tax;
    result.c = this.formatNumber(c);
    result.d = this.formatNumber(d);

    if (tax > 0) {
      result.e = this.formatNumber(tax);
    }
    if (tax < 0) {
      result.f = this.formatNumber(Math.abs(tax));
    }

    result.RESULT = 1;
    return result;
  }

  /**
   * getCalculationStampDutyCalculator: Service Method
   * POST: /api/calculators-lol/stamp-duty-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationStampDutyCalculator(body) {
    let param = {};
    let { tech_unit_type, value, tech_uk_method } = body;

    const ausval = Number(body.tech_ausval);
    let aus_a;
    let aus_b;
    let aus_c;
    let aus_d;
    let v;
    if (tech_unit_type === "uk") {
      value = parseFloat(value);
      if (!isNaN(value)) {
        let a = 0,
          b = 0,
          c = 0,
          d = 0,
          e = 0;
        let as = 0,
          bs = 0,
          cs = 0,
          ds = 0,
          es = 0;
        let stamp_duty = 0;

        if (tech_uk_method === "single") {
          if (value < 125000) {
            param.error = "You don't need to pay stamp duty.";
            return param;
          }
          if (value <= 250000 && value > 125000) {
            bs = value - 125000;
            b = bs * 0.02;
            stamp_duty = b;
          }
          if (value > 250000) {
            b = 2500;
            bs = 125000;
          }
          if (value <= 925000 && value > 250000) {
            cs = value - 250000;
            c = cs * 0.05;
            stamp_duty = c + b;
          }
          if (value > 925000) {
            c = 33750;
            cs = 675000;
          }
          if (value <= 1500000 && value > 925000) {
            ds = value - 925000;
            d = ds * 0.1;
            stamp_duty = d + c + b;
          }
          if (value > 1500000) {
            d = 57500;
            ds = 575000;
            es = value - 1500000;
            e = es * 0.12;
            stamp_duty = e + d + c + b;
          }
        }

        if (tech_uk_method === "add") {
          if (value <= 125000) {
            as = value;
            a = as * 0.03;
            stamp_duty = a;
          }
          if (value > 125000) {
            a = 3750;
            as = 125000;
          }
          if (value <= 250000 && value > 125000) {
            bs = value - 125000;
            b = bs * 0.05;
            stamp_duty = b + a;
          }
          if (value > 250000) {
            b = 6250;
            bs = 125000;
          }
          if (value <= 925000 && value > 250000) {
            cs = value - 250000;
            c = cs * 0.08;
            stamp_duty = c + b + a;
          }
          if (value > 925000) {
            c = 54000;
            cs = 675000;
          }
          if (value <= 1500000 && value > 925000) {
            ds = value - 925000;
            d = ds * 0.13;
            stamp_duty = d + c + b + a;
          }
          if (value > 1500000) {
            d = 74750;
            ds = 575000;
            es = value - 1500000;
            e = es * 0.15;
            stamp_duty = e + d + c + b + a;
          }
        }

        if (tech_uk_method === "first") {
          if (value <= 300000) {
            param.error = "You don't need to pay stamp duty.";
            return param;
          }
          if (value > 500000) {
            a = 5000;
            as = 175000;
          }
          if (value <= 500000 && value > 300000) {
            bs = value - 300000;
            b = bs * 0.05;
            stamp_duty = b + a;
          }
          if (value > 500000) {
            b = 10000;
            bs = 200000;
          }
          if (value <= 925000 && value > 500000) {
            cs = value - 500000;
            c = cs * 0.05;
            stamp_duty = c + b + a;
          }
          if (value > 925000) {
            c = 21250;
            cs = 425000;
          }
          if (value <= 1500000 && value > 925000) {
            ds = value - 925000;
            d = ds * 0.1;
            stamp_duty = d + c + b + a;
          }
          if (value > 1500000) {
            d = 57500;
            ds = 575000;
            es = value - 1500000;
            e = es * 0.12;
            stamp_duty = e + d + c + b + a;
          }
        }

        const percent = ((stamp_duty / value) * 100).toFixed(2);

        param = {
          a: a.toFixed(2),
          as: as.toFixed(2),
          b: b.toFixed(2),
          bs: bs.toFixed(2),
          c: c.toFixed(2),
          cs: cs.toFixed(2),
          d: d.toFixed(2),
          ds: ds.toFixed(2),
          e: e.toFixed(2),
          es: es.toFixed(2),
          percent,
          stamp_duty: stamp_duty.toFixed(2),
          Add: "active",
        };
        return param;
      } else {
        return { error: "Please Fill the Field." };
      }
    }
    if (tech_unit_type === "aus") {
      // Leave this block empty for now as requested
      if (ausval != "") {
        if (body.tech_aus_method === "nsw") {
          let value = ausval;

          if (
            body.tech_first === "no" ||
            body.tech_property === "invest" ||
            body.tech_property === "land" ||
            value > 800000 ||
            body.tech_property === "live"
          ) {
            if (value <= 14000) {
              aus_a = (value / 100) * 1.25;
            } else if (value <= 30000) {
              aus_a = ((value - 14000) / 100) * 1.5 + 175;
            } else if (value <= 81000) {
              aus_a = ((value - 30000) / 100) * 1.75 + 415;
            } else if (value <= 304000) {
              aus_a = ((value - 81000) / 100) * 3.5 + 1307;
            } else if (value <= 1013000) {
              aus_a = ((value - 304000) / 100) * 4.5 + 9112;
            } else if (value < 3040000) {
              aus_a = ((value - 1013000) / 100) * 5.5 + 41017;
            } else {
              aus_a = ((value - 3040000) / 100) * 7.0 + 152502;
            }
          }

          if (
            body.tech_first === "yes" &&
            body.tech_property === "live" &&
            ausval < 800000
          ) {
            if (ausval <= 650000) {
              aus_a = 0;
            } else if (ausval < 800000) {
              aus_a = ausval * (21 / 100) - 136510;
            }
          }

          const aus_b = 219;
          const aus_c = 109.5;
          const aus_d = aus_a + aus_b + aus_c;

          param["tech_aus_a"] = aus_a.toFixed(2);
          param["tech_aus_b"] = aus_b.toFixed(2);
          param["tech_aus_c"] = aus_c.toFixed(2);
          param["tech_aus_d"] = aus_d.toFixed(2);
          param["RESULT"] = 1;
          param["tech_sub"] = "active";
          return param;
        }
        if (body.tech_aus_method === "vic") {
          value = body.tech_ausval;
          if (
            body.tech_first === "no" ||
            body.tech_property === "invest" ||
            body.tech_property === "land" ||
            value > 750000
          ) {
            if (value <= 25000) {
              aus_a = (value / 100) * 1.4;
            }
            if (value <= 130000 && value > 25000) {
              value = value - 25000;
              aus_a = (value / 100) * 2.4;
              aus_a = aus_a + 350;
            }
            if (value <= 960000 && value > 130000) {
              value = value - 130000;
              aus_a = (value / 100) * 6;
              aus_a = aus_a + 2870;
            }
            if (value > 960000) {
              aus_a = (value / 100) * 5.5;
            }
          }
          if (body.tech_property === "live" && body.tech_first === "no") {
            if (value <= 25000) {
              aus_a = (value / 100) * 1.4;
            }
            if (value <= 130000 && value > 25000) {
              value = value - 25000;
              aus_a = (value / 100) * 2.4;
              aus_a = aus_a + 350;
            }
            if (value <= 440000 && value > 130000) {
              value = value - 130000;
              aus_a = (value / 100) * 5;
              aus_a = aus_a + 2870;
            }
            if (value <= 550000 && value > 440000) {
              value = value - 440000;
              aus_a = (value / 100) * 6;
              aus_a = aus_a + 18370;
            }
            if (value <= 960000 && value > 550000) {
              value = value - 550000;
              aus_a = (value / 100) * 6;
              aus_a = aus_a + 28070;
            }
            if (value > 960000) {
              aus_a = (value / 100) * 5.5;
            }
          }
          if (body.tech_first === "yes" && body.tech_property === "live") {
            if (value <= 600000) {
              aus_a = 0;
            }
            if (value > 600000 && value < 605000) {
              aus_a = (value - 600000) * 0.209;
            }
            if (value === 605000) {
              aus_a = 1045;
            }
            if (value > 605000 && value < 610000) {
              value = value - 605000;
              aus_a = value * 0.2129 + 1045;
            }
            if (value === 610000) {
              aus_a = (value - 600000) * 0.2111;
            }
            if (value > 610000 && value < 615000) {
              value = value - 610000;
              aus_a = value * 0.2129 + 2111.33;
            }
            if (value === 615000) {
              aus_a = (value - 600000) * 0.2131;
            }
            if (value > 615000 && value < 620000) {
              value = value - 615000;
              aus_a = value * 0.2195 + 3197.0;
            }
            if (value === 620000) {
              aus_a = 4302.67;
            }
            if (value > 620000 && value < 625000) {
              value = value - 620000;
              aus_a = value * 0.2195 + 4302.67;
            }
            if (value === 625000) {
              aus_a = 5428;
            }
            if (value > 625000 && value < 630000) {
              value = value - 625000;
              aus_a = value * 0.228 + 5428;
            }
            if (value === 630000) {
              aus_a = 6574.0;
            }
            if (value > 630000 && value < 635000) {
              value = value - 630000;
              aus_a = value * 0.232 + 6574;
            }
            if (value === 635000) {
              aus_a = 7739.67;
            }
            if (value > 635000 && value < 640000) {
              value = value - 635000;
              aus_a = value * 0.236 + 7739.67;
            }
            if (value === 640000) {
              aus_a = 8925.33;
            }
            if (value > 640000 && value < 645000) {
              value = value - 640000;
              aus_a = value * 0.2403 + 8925.33;
            }
            if (value === 645000) {
              aus_a = 10131;
            }
            if (value > 645000 && value < 650000) {
              value = value - 645000;
              aus_a = value * 0.2443 + 10131;
            }
            if (value === 650000) {
              aus_a = 11357;
            }
            if (value > 650000 && value < 655000) {
              value = value - 650000;
              aus_a = value * 0.2482 + 11357;
            }
            if (value === 655000) {
              aus_a = 12602.33;
            }
            if (value > 655000 && value < 660000) {
              value = value - 655000;
              aus_a = value * 0.2523 + 12602.33;
            }
            if (value === 660000) {
              aus_a = 13868.0;
            }
            if (value > 660000 && value < 665000) {
              value = value - 660000;
              aus_a = value * 0.2563 + 13868.0;
            }
            if (value === 665000) {
              aus_a = 15153.67;
            }
            if (value > 665000 && value < 670000) {
              value = value - 665000;
              aus_a = value * 0.2603 + 15153.67;
            }
            if (value === 670000) {
              aus_a = 16459.33;
            }
            if (value > 670000 && value < 675000) {
              value = value - 670000;
              aus_a = value * 0.2643 + 16459.33;
            }
            if (value === 675000) {
              aus_a = 17785.0;
            }
            if (value > 675000 && value < 680000) {
              value = value - 675000;
              aus_a = value * 0.2683 + 17785.0;
            }
            if (value === 680000) {
              aus_a = 19130.67;
            }
            if (value > 680000 && value < 685000) {
              value = value - 680000;
              aus_a = value * 0.2723 + 19130.67;
            }
            if (value === 685000) {
              aus_a = 20496.33;
            }
            if (value > 685000 && value < 690000) {
              value = value - 685000;
              aus_a = value * 0.2763 + 20496.33;
            }
            if (value === 690000) {
              aus_a = 21882.0;
            }
            if (value > 690000 && value < 695000) {
              value = value - 690000;
              aus_a = value * 0.2803 + 21882.0;
            }
            if (value === 695000) {
              aus_a = 23287.67;
            }
            if (value > 695000 && value < 700000) {
              value = value - 695000;
              aus_a = value * 0.2843 + 23287.67;
            }
            if (value === 700000) {
              aus_a = 24713.33;
            }
            if (value > 700000 && value < 705000) {
              value = value - 700000;
              aus_a = value * 0.2883 + 24713.33;
            }
            if (value === 705000) {
              aus_a = 26159.0;
            }
            if (value > 705000 && value < 710000) {
              value = value - 705000;
              aus_a = value * 0.2923 + 26159.0;
            }
            if (value === 710000) {
              aus_a = 27624.67;
            }
            if (value > 710000 && value < 715000) {
              value = value - 710000;
              aus_a = value * 0.2963 + 27624.67;
            }
            if (value === 715000) {
              aus_a = 29110.33;
            }
            if (value > 715000 && value < 720000) {
              value = value - 715000;
              aus_a = value * 0.3003 + 29110.33;
            }
            if (value === 720000) {
              aus_a = 30616.0;
            }
            if (value > 720000 && value < 725000) {
              value = value - 720000;
              aus_a = value * 0.3043 + 30616.0;
            }
            if (value === 725000) {
              aus_a = 32141.67;
            }
            if (value > 725000 && value < 730000) {
              value = value - 725000;
              aus_a = value * 0.3083 + 32141.67;
            }
            if (value === 730000) {
              aus_a = 33687.33;
            }
            if (value > 730000 && value < 735000) {
              value = value - 730000;
              aus_a = value * 0.3123 + 33687.33;
            }
            if (value === 735000) {
              aus_a = 35253.0;
            }
            if (value > 735000 && value < 740000) {
              value = value - 735000;
              aus_a = value * 0.3163 + 35253.0;
            }
            if (value === 740000) {
              aus_a = 36838.67;
            }
            if (value > 740000 && value < 745000) {
              value = value - 740000;
              aus_a = value * 0.3203 + 36838.67;
            }
            if (value === 745000) {
              aus_a = 38444.33;
            }
            if (value > 745000 && value < 750000) {
              value = value - 745000;
              aus_a = value * 0.3243 + 38444.33;
            }
            if (value === 750000) {
              aus_a = 40070;
            }
          }
          aus_b = (body.tech_ausval / 1000) * 2.34 + 96.1;
          if (aus_b > 3606) {
            aus_b = 3606;
          }
          aus_c = 116.8;
          aus_d = aus_a + aus_b + aus_c;

          param["tech_aus_a"] = aus_a.toFixed(2);
          param["tech_aus_b"] = aus_b.toFixed(2);
          param["tech_aus_c"] = aus_c.toFixed(2);
          param["tech_aus_d"] = aus_d.toFixed(2);
          param["RESULT"] = 1;
          param["tech_sub"] = "active";
          return param;
        }
        if (body.tech_aus_method === "qld") {
          aus_b = 192;
          if (body.tech_ausval > 180000) {
            aus_b = aus_b + (body.tech_ausval - 180000) * 0.0036;
          }
          aus_c = 192;
          value = body.tech_ausval;
          if (body.tech_property === "live") {
            if (value <= 350000) {
              aus_a = (value / 100) * 1;
            }
            if (value > 350000 && value <= 540000) {
              value = value - 350000;
              aus_a = (value / 100) * 3.5 + 3500;
            }
            if (value > 540000 && value <= 1000000) {
              value = value - 540000;
              aus_a = (value / 100) * 4.5 + 10150;
            }
            if (value > 1000000) {
              value = value - 1000000;
              aus_a = (value / 100) * 5.75 + 30850;
            }
          }
          if (
            body.tech_property === "invest" ||
            body.tech_property === "land"
          ) {
            if (value <= 5000) {
              aus_a = 0;
            }
            if (value > 5000 && value <= 75000) {
              value = value - 5000;
              aus_a = (value / 100) * 1.5;
            }
            if (value > 75000 && value <= 540000) {
              value = value - 75000;
              aus_a = (value / 100) * 3.5 + 1050;
            }
            if (value > 540000 && value <= 1000000) {
              value = value - 540000;
              aus_a = (value / 100) * 4.5 + 17325;
            }
            if (value > 1000000) {
              value = value - 1000000;
              aus_a = (value / 100) * 5.75 + 38025;
            }
          }
          if (body.tech_first === "yes" && body.tech_property === "live") {
            if (aus_a < 8925) {
              aus_a = 0;
            }
            if (aus_a >= 8925 && aus_a < 9100) {
              aus_a = aus_a - 7875;
            }
            if (aus_a >= 9100 && aus_a < 9275) {
              aus_a = aus_a - 7000;
            }
            if (aus_a >= 9275 && aus_a < 9450) {
              aus_a = aus_a - 6125;
            }
            if (aus_a >= 9450 && aus_a < 9625) {
              aus_a = aus_a - 5250;
            }
            if (aus_a >= 9625 && aus_a < 9800) {
              aus_a = aus_a - 4375;
            }
            if (aus_a >= 9800 && aus_a < 9975) {
              aus_a = aus_a - 3500;
            }
            if (aus_a >= 9975 && aus_a < 10150) {
              aus_a = aus_a - 2625;
            }
            if (aus_a >= 10150 && aus_a < 10375) {
              aus_a = aus_a - 1750;
            }
            if (aus_a >= 10375 && aus_a < 10600) {
              aus_a = aus_a - 875;
            }
            if (aus_a >= 10600) {
              aus_a = aus_a - 0;
            }
          }
          aus_d = aus_a + aus_b + aus_c;
          param["tech_aus_a"] = aus_a.toFixed(2);
          param["tech_aus_b"] = aus_b.toFixed(2);
          param["tech_aus_c"] = aus_c.toFixed(2);
          param["tech_aus_d"] = aus_d.toFixed(2);
          param["RESULT"] = 1;
          param["tech_sub"] = "active";
          return param;
        }
        if (body.tech_aus_method === "wa") {
          value = body.tech_ausval;
          if (body.tech_property === "land") {
            if (value <= 80000) {
              aus_a = (value / 100) * 1.9;
            }
            if (value > 80000 && value <= 100000) {
              value = value - 80000;
              aus_a = (value / 100) * 2.85 + 1520;
            }
            if (value > 100000 && value <= 250000) {
              value = value - 100000;
              aus_a = (value / 100) * 3.8 + 2090;
            }
            if (value > 250000 && value <= 500000) {
              value = value - 250000;
              aus_a = (value / 100) * 4.75 + 7790;
            }
            if (value > 500000) {
              value = value - 500000;
              aus_a = (value / 100) * 5.15 + 19665;
            }
          }
          if (
            body.tech_property === "live" ||
            body.tech_property === "invest"
          ) {
            if (value <= 120000) {
              aus_a = (value / 100) * 1.9;
            }
            if (value > 120000 && value <= 150000) {
              value = value - 120000;
              aus_a = (value / 100) * 2.85 + 2280;
            }
            if (value > 150000 && value <= 360000) {
              aus_a = ((value - 150000) / 100) * 3.8 + 3135;
            }
            if (value > 360000 && value <= 725000) {
              aus_a = ((value - 360000) / 100) * 4.75 + 11115;
            }
            if (value > 725000) {
              aus_a = ((value - 725000) / 100) * 5.15 + 28453;
            }
          }
          if (body.tech_first === "yes" && body.tech_property === "live") {
            value = body.tech_ausval;
            if (value <= 430000) {
              aus_a = 0;
            }
            if (value > 430000 && value <= 530000) {
              aus_a = ((value - 430000) / 100) * 19.19;
            }
          }
          if (body.tech_first === "yes" && body.tech_property === "land") {
            value = body.tech_ausval;
            if (value <= 300000) {
              aus_a = 0;
            }
            if (value > 300000 && value <= 400000) {
              aus_a = ((value - 300000) / 100) * 13.01;
            }
          }
          if (body.tech_ausval <= 85000) {
            aus_b = 174.7;
          }
          if (body.tech_ausval > 85000 && body.tech_ausval <= 120000) {
            aus_b = 184.7;
          }
          if (body.tech_ausval > 120000 && body.tech_ausval <= 200000) {
            aus_b = 204.7;
          }
          if (body.tech_ausval > 200000) {
            aus_b = ((body.tech_ausval - 200000) / 100000) * 20 + 204.7;
          }
          aus_c = 174.7;
          aus_d = aus_a + aus_b + aus_c;
          param["tech_aus_a"] = aus_a.toFixed(2);
          param["tech_aus_b"] = aus_b.toFixed(2);
          param["tech_aus_c"] = aus_c.toFixed(2);
          param["tech_aus_d"] = aus_d.toFixed(2);

          param["RESULT"] = 1;
          param["tech_sub"] = "active";
          return param;
        }
        if (body.tech_aus_method === "sa") {
          value = body.tech_ausval;
          if (value <= 12000) {
            aus_a = (value / 100) * 1.0;
          }
          if (value > 12000 && value <= 30000) {
            aus_a = ((value - 12000) / 100) * 2.0 + 120;
          }
          if (value > 30000 && value <= 50000) {
            aus_a = ((value - 30000) / 100) * 3.0 + 480;
          }
          if (value > 50000 && value <= 100000) {
            aus_a = ((value - 50000) / 100) * 3.5 + 1080;
          }
          if (value > 100000 && value <= 200000) {
            aus_a = ((value - 100000) / 100) * 4.0 + 2830;
          }
          if (value > 200000 && value <= 250000) {
            aus_a = ((value - 200000) / 100) * 4.25 + 6830;
          }
          if (value > 250000 && value <= 300000) {
            aus_a = ((value - 250000) / 100) * 4.75 + 8955;
          }
          if (value > 300000 && value <= 500000) {
            aus_a = ((value - 300000) / 100) * 5.0 + 11330;
          }
          if (value > 500000) {
            aus_a = ((value - 500000) / 100) * 5.5 + 21330;
          }
          if (body.tech_first === "yes" && body.tech_property === "live") {
            if (value <= 430000) {
              aus_a = 0;
            }
            if (value > 430000 && value <= 530000) {
              aus_a = ((value - 430000) / 100) * 19.19;
            }
          }
          if (body.tech_first === "yes" && body.tech_property === "land") {
            if (value <= 300000) {
              aus_a = 0;
            }
            if (value > 300000 && value <= 400000) {
              aus_a = ((value - 300000) / 100) * 13.01;
            }
          }
          if (body.tech_ausval <= 5000) {
            aus_b = 163;
          }
          if (body.tech_ausval > 5000 && body.tech_ausval <= 20000) {
            aus_b = 182;
          }
          if (body.tech_ausval > 20000 && body.tech_ausval <= 40000) {
            aus_b = 199;
          }
          if (body.tech_ausval > 40000) {
            val = body.tech_ausval - 500000;
            if (val >= 0) {
              aus_b = (val / 1000) * 82.5 + 280;
            } else {
              aus_b = 280;
            }
          }
          aus_c = 163;
          aus_d = aus_a + aus_b + aus_c;
          param["tech_aus_a"] = aus_a.toFixed(2);
          param["tech_aus_b"] = aus_b.toFixed(2);
          param["tech_aus_c"] = aus_c.toFixed(2);
          param["tech_aus_d"] = aus_d.toFixed(2);
          param["RESULT"] = 1;
          param["tech_sub"] = "active";
          return param;
        }
        if (body.tech_aus_method === "nt") {
          value = body.tech_ausval;
          if (value <= 525000) {
            v = value / 1000;
            aus_a = 0.06571441 * v * v + 15 * v;
          }
          if (value > 525000 && value <= 2999999) {
            aus_a = (value / 100) * 4.95;
          }
          if (value >= 3000000 && value < 5000000) {
            aus_a = (value / 100) * 5.75;
          }
          if (value >= 5000000) {
            aus_a = (value / 100) * 5.95;
          }
          aus_b = aus_c = 149;
          aus_d = aus_a + aus_b + aus_c;
          param["tech_aus_a"] = aus_a.toFixed(2);
          param["tech_aus_b"] = aus_b.toFixed(2);
          param["tech_aus_c"] = aus_c.toFixed(2);
          param["tech_aus_d"] = aus_d.toFixed(2);
          param["RESULT"] = 1;
          param["tech_sub"] = "active";
          return param;
        }
        if (body.tech_aus_method === "act") {
          value = body.tech_ausval;
          if (value <= 200000) {
            aus_a = (value / 100) * 1.3;
          }
          if (value > 200000 && value <= 300000) {
            aus_a = ((value - 200000) / 100) * 2.3 + 2600;
          }
          if (value > 300000 && value <= 500000) {
            aus_a = ((value - 300000) / 100) * 3.6 + 4900;
          }
          if (value > 500000 && value <= 750000) {
            aus_a = ((value - 500000) / 100) * 4.56 + 12100;
          }
          if (value > 750000 && value <= 1000000) {
            aus_a = ((value - 750000) / 100) * 6.1 + 23500;
          }
          if (value > 1000000 && value <= 1455000) {
            aus_a = ((value - 1000000) / 100) * 6.6 + 38750;
          }
          if (value > 1455000) {
            aus_a = (value / 100) * 4.73;
          }
          if (body.tech_first === "yes" && body.tech_property === "live") {
            if (value <= 470000) {
              aus_a = 0;
            }
            if (value > 470000 && value <= 607000) {
              aus_a = ((value - 470000) / 100) * 12.35;
            }
          }
          if (body.tech_first === "yes" && body.tech_property === "land") {
            if (value <= 281200) {
              aus_a = 0;
            }
            if (value > 281200 && value <= 329500) {
              aus_a = ((value - 281200) / 100) * 12.3;
            }
          }
          aus_b = 409.0;
          aus_c = 153.0;
          aus_d = aus_a + aus_b + aus_c;
          param["tech_aus_a"] = aus_a.toFixed(2);
          param["tech_aus_b"] = aus_b.toFixed(2);
          param["tech_aus_c"] = aus_c.toFixed(2);
          param["tech_aus_d"] = aus_d.toFixed(2);
          param["RESULT"] = 1;
          param["tech_sub"] = "active";
          return param;
        }
        if (body.tech_aus_method === "tas") {
          value = body.tech_ausval;
          if (value <= 3000) {
            aus_a = 50;
          }
          if (value > 3000 && value <= 25000) {
            aus_a = ((value - 3000) / 100) * 1.75 + 50;
          }
          if (value > 25000 && value <= 75000) {
            aus_a = ((value - 25000) / 100) * 2.25 + 435;
          }
          if (value > 75000 && value <= 200000) {
            aus_a = ((value - 75000) / 100) * 3.5 + 1560;
          }
          if (value > 200000 && value <= 375000) {
            aus_a = ((value - 200000) / 100) * 4 + 5935;
          }
          if (value > 375000 && value <= 725000) {
            aus_a = ((value - 375000) / 100) * 4.25 + 12935;
          }
          if (value > 725000) {
            aus_a = ((value - 725000) / 100) * 4.5 + 27810;
          }
          aus_b = 212.22;
          aus_c = 138.51;
          aus_d = aus_a + aus_b + aus_c;
          param["tech_aus_a"] = aus_a.toFixed(2);
          param["tech_aus_b"] = aus_b.toFixed(2);
          param["tech_aus_c"] = aus_c.toFixed(2);
          param["tech_aus_d"] = aus_d.toFixed(2);
          param["tech_sub"] = "active";
          return param;
        }
      } else {
        return { error: "Please Enter Purchase Price." };
      }
    }
  }

  /**
   * getCalculationVatCalculator: Service Method
   * POST: /api/calculators-lol/vat-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationVatCalculator(body) {
    let vat = body.tech_vat;
    let amount = body.tech_amount;
    let method = body.tech_method;
    const param = {};

    // Validation
    if (!vat || !amount) {
      param.error = "Please fill all fields.";
      return param;
    }
    if (isNaN(vat) || isNaN(amount)) {
      param.error = "Invalid Input.";
      return param;
    }

    let vatAmount, net, gross;

    if (method === "add") {
      net = amount;
      vatAmount = (vat * amount) / 100;
      gross = amount + vatAmount;
    } else {
      gross = amount;
      const vatMultiplier = 1 + vat / 100;
      net = parseFloat((amount / vatMultiplier).toFixed(2));
      vatAmount = amount - net;
    }

    // Return values
    param.tech_vatAmount = vatAmount;
    param.tech_net = net;
    param.tech_gross = gross;
    return param;
  }

  /**
   * getCalculationSalestaxCalculator: Service Method
   * POST: /api/calculators-lol/salestax-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationSalestaxCalculator(body) {
    let vat = body.tech_vat;
    let amount = body.tech_amount;
    let method = body.tech_method;

    const param = {};

    // Check if vat and amount are numeric
    if (isNaN(vat) || isNaN(amount)) {
      param.error = "Please fill any two fields.";
      return param;
    }

    let vatAmount, netBill;

    if (method === "add") {
      vatAmount = (vat * amount) / 100;
      netBill = amount + vatAmount;
    } else {
      const vatMultiplier = 1 + vat / 100;
      netBill = parseFloat((amount / vatMultiplier).toFixed(2));
      vatAmount = amount - netBill;
    }

    // Prepare response
    param.tech_vatAmount = parseFloat(vatAmount.toFixed(2));
    param.tech_netBill = parseFloat(netBill.toFixed(2));
    return param;
  }

  /**
   * getCalculationPriceElasticaityDemandCalculator: Service Method
   * POST: /api/calculators-lol/price-elasticity-demand-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationPriceElasticaityDemandCalculator(body) {
    let unit_type = body.tech_unit_type;
    let method = body.tech_method;
    let prince = body.tech_prince;
    let quantity = body.tech_quantity;
    let n_q = body.tech_n_q;
    let i_q = body.tech_i_q;
    let n_p = body.tech_n_p;
    let i_p = body.tech_i_p;
    let i_r = body.tech_i_r;
    let f_r = body.tech_f_r;
    let inc = body.tech_inc;
    const param = {};
    function isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function round(num, decimals) {
      return Number(Math.round(num + "e" + decimals) + "e-" + decimals);
    }

    function getDemandType(PED) {
      console.log(PED);
      const absPED = Math.abs(PED); // ABS lelo, taake negative value ka magnitude mile
      if (absPED > 1) {
        return "Elastic Demand";
      } else if (absPED === 1) {
        return "Unitary Elastic";
      } else if (absPED < 1 && absPED > 0) {
        return "Inelastic Demand";
      } else if (absPED === 0) {
        return "Perfectly Inelastic";
      } else {
        return "Invalid PED";
      }
    }

    if (unit_type === "Revenue") {
      if (isNumeric(i_r) && isNumeric(f_r)) {
        if (
          isNumeric(i_r) &&
          isNumeric(f_r) &&
          (inc === undefined || inc === "")
        ) {
          if (i_r == 0) {
            var r_percent = "0";
          } else {
            var r_percent = round(((f_r - i_r) / i_r) * 100, 2);
          }
          param.tech_i_r = i_r;
          param.tech_f_r = f_r;
          param.tech_r_percent = r_percent;
          param.tech_rev = "active";
          return param;
        } else {
          param.error = "Please Enter Only Two Values.";
          return param;
        }
      }

      if (isNumeric(f_r) && isNumeric(inc)) {
        if (
          (i_r === undefined || i_r === "") &&
          isNumeric(f_r) &&
          isNumeric(inc)
        ) {
          const incFactor = inc / 100 + 1;
          const i_r_calc = round(f_r / incFactor, 2);
          param.tech_i_r = i_r_calc;
          param.tech_f_r = f_r;
          param.tech_r_percent = inc;
          param.tech_rev = "active";
          return param;
        } else {
          param.error = "Please Enter Only Two Values.";
          return param;
        }
      }

      if (isNumeric(i_r) && isNumeric(inc)) {
        if (
          (f_r === undefined || f_r === "") &&
          isNumeric(i_r) &&
          isNumeric(inc)
        ) {
          const incFactor = inc / 100;
          const f_r_calc = round(i_r + i_r * incFactor, 2);
          param.tech_i_r = i_r;
          param.tech_f_r = f_r_calc;
          param.tech_r_percent = inc;
          param.tech_rev = "active";
          return param;
        } else {
          param.error = "Please Enter Only Two Values.";
          return param;
        }
      }

      param.error = "Please Enter Only Two Values.";
      return param;
    } else if (method === "1") {
      if (
        isNumeric(i_p) &&
        isNumeric(n_p) &&
        isNumeric(i_q) &&
        isNumeric(n_q)
      ) {
        let PED;
        if (i_p == n_p) {
          PED = (n_q - i_q) / ((n_q + i_q) / 2);
        } else {
          PED =
            (n_q - i_q) / ((n_q + i_q) / 2) / ((n_p - i_p) / ((n_p + i_p) / 2));
        }

        PED = round(PED, 4);

        const type = getDemandType(PED);
        const i_r = i_p * i_q;
        const f_r = n_p * n_q;
        const r_percent = round(((f_r - i_r) / i_r) * 100, 2);

        param.tech_type = type;
        param.tech_i_r = i_r;
        param.tech_f_r = f_r;
        param.tech_r_percent = r_percent;
        param.tech_PED = PED;
        param.tech_method = method;
        return param;
      } else {
        param.error = "Please fill all fields.";
        return param;
      }
    } else if (method === "2") {
      if (
        isNumeric(i_p) &&
        isNumeric(n_p) &&
        isNumeric(i_q) &&
        isNumeric(n_q)
      ) {
        let PED;
        if (i_p == n_p) {
          PED = (n_q - i_q) / i_q;
        } else {
          PED = (n_q - i_q) / i_q / ((n_p - i_p) / i_p);
        }

        PED = round(PED, 4);

        const type = getDemandType(PED);
        const i_r = i_p * i_q;
        const f_r = n_p * n_q;
        const r_percent = round(((f_r - i_r) / i_r) * 100, 2);

        param.tech_type = type;
        param.tech_i_r = i_r;
        param.tech_f_r = f_r;
        param.tech_r_percent = r_percent;
        param.tech_PED = PED;
        param.tech_method = method;
        return param;
      } else {
        param.error = "Please fill all fields.";
        return param;
      }
    } else if (method === "3") {
      if (isNumeric(quantity) && isNumeric(prince)) {
        let PED = quantity / prince;
        PED = round(PED, 4);

        const type = getDemandType(PED);

        param.tech_type = type;
        param.tech_PED = PED;
        param.tech_method = method;
        return param;
      } else {
        param.error = "Please fill all fields.";
        return param;
      }
    }

    param.error = "Invalid Request.";
    return param;
  }

  /**
   * getCalculationDiscountCalculator: Service Method
   * POST: /api/calculators-lol/discount-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationDiscountCalculator(request) {
    const param = {};
    // console.log(request);
    var amount = parseFloat(request.amount) || 0;
    const off = parseFloat(request.off) || 0;
    const pay = parseFloat(request.pay) || 0;
    const saving = parseFloat(request.saving) || 0;
    const myLang = request.lang;

    if (myLang == "ar") {
      if (request.form_a) {
        if (request.form_a == "first1") {
          if (!isNaN(request.first1) && !isNaN(request.thir)) {
            const first = parseFloat(request.first1);
            const sec = parseFloat(request.thir);
            const third = Math.round((sec / 100) * first * 100) / 100;
            const dis = first - third;

            param.third = third;
            param.arabic = third;
            param.dis = dis;
            param.RESULT = 1;
            return param;
          } else {
            param.error = "Please! Check Your Input.";
            return param;
          }
        } else if (request.form_a == "sec") {
          if (!isNaN(request.sec) && !isNaN(request.thir)) {
            const sec = parseFloat(request.sec);
            const thir = parseFloat(request.thir);
            const first = Math.round((sec / (1 - thir / 100)) * 100) / 100;
            const dis = first - sec;

            param.first = first;
            param.arabic = first;
            param.dis = dis;
            param.RESULT = 1;
            return param;
          } else {
            param.error = "Please! Check Your Input.";
            return param;
          }
        } else if (request.form_a == "thir") {
          if (!isNaN(request.sec) && !isNaN(request.first1)) {
            const first = parseFloat(request.first1);
            const sec = parseFloat(request.sec);
            const dis = first - sec;
            const thirl = Math.round((dis / first) * 100 * 100) / 100;

            param.thirl = thirl;
            param.arabic = thirl;
            param.dis = dis;
            param.RESULT = 1;
            return param;
          } else {
            param.error = "Please! Check Your Input.";
            return param;
          }
        }
      }
    } else if (myLang == "id") {
      if (!isNaN(request.id_rp) && !isNaN(request.id_p)) {
        const id_rp = parseFloat(request.id_rp);
        const id_p = parseFloat(request.id_p);
        const discount_id = Math.round(id_rp * (id_p / 100) * 100) / 100;

        param.discount_id = discount_id;
        param.RESULT = 1;
        return param;
      } else {
        param.error = "Harga Awal & Diskon tidak boleh kosong.";
        return param;
      }
    } else if (myLang == "tr") {
      const type = request.typet;

      if (!isNaN(request.tx) && !isNaN(request.ty)) {
        let nor, ora, mik, ind;

        const tx = parseFloat(request.tx);
        const ty = parseFloat(request.ty);

        if (type == "1") {
          nor = tx;
          ora = ty;
          mik = Math.round((ora / 100) * nor * 100) / 100;
          ind = nor - mik;
        } else if (type == "2") {
          nor = tx;
          ind = ty;
          mik = nor - ind;
          ora = Math.round((mik / nor) * 100 * 100) / 100;
        } else if (type == "3") {
          nor = tx;
          mik = ty;
          ind = nor - mik;
          ora = Math.round((mik / nor) * 100 * 100) / 100;
        } else if (type == "4") {
          ind = tx;
          ora = ty;
          nor = Math.round((ind / (1 - ora / 100)) * 100) / 100;
          mik = nor - ind;
        } else if (type == "5") {
          ind = tx;
          mik = ty;
          nor = ind + mik;
          ora = Math.round((mik / nor) * 100 * 100) / 100;
        }

        param.nor = nor;
        param.ind = ind;
        param.mik = mik;
        param.ora = ora;
        return param;
      } else {
        param.error = "Lütfen tüm alanları doldurun.";
        return param;
      }
    } else {
      if (request.type === "1") {
        if (isNaN(amount) && isNaN(off) && isNaN(pay) && isNaN(saving)) {
          param.error = "Please fill the fields.";
          return param;
        }

        let ans, payt, tax, taxt;

        if (request.tax === "no") {
          if (!request.sale || isNaN(parseFloat(request.sale))) {
            param.error = "Please fill Tax field.";
            return param;
          }

          if (!pay && !saving) {
            ans = (amount / 100) * off;
            // console.log(ans,amount,off);
            payt = amount - ans;
            tax = Math.round((parseFloat(request.sale) / 100) * amount);
            taxt = tax - (tax / 100) * off;
            param.tax = tax;
            param.taxt = taxt;
            var amount = amount + tax;
            ans = (amount / 100) * off;
            param.pay = amount - ans;
          } else if (!pay && !off) {
            tax = parseFloat(request.sale) / 100;
            tax = 100 * (1 + tax);
            ans = (saving / tax) * 100;
            ans = ans.toFixed(3) + "%";
            param.pay = amount - saving;
          } else if (!off && !saving) {
            tax = parseFloat(request.sale) / 100;
            tax = amount * (1 + tax);
            ans = (parseFloat(request.sale) / tax) * 100;
            ans = ans.toFixed(4) + " %";
            param.pay = amount - pay;
          } else if (!amount && !saving) {
            tax = parseFloat(request.sale) / 100;
            tax = 100 * (1 + tax);
            const percent = off / 100;
            const original_pr = tax / (1 - percent);
            param.pay = original_pr - tax;
            ans = original_pr;
          } else if (!amount && !off) {
            tax = parseFloat(request.sale) / 100;
            tax = 100 * (1 + tax);
            param.pay = tax + saving;
            ans = (saving / param.pay) * 100;
            ans = ans.toFixed(3);
          }
        } else {
          if (!pay && !saving) {
            ans = (amount / 100) * off;
            param.pay = amount - ans;
            payt = amount - ans;
          } else if (!pay && !off) {
            ans = (saving / amount) * 100 + "%";
            param.pay = amount - saving;
            payt = amount - ans;
          } else if (!amount && !pay) {
            ans = (saving / 100) * off;
            param.pay = saving - ans;
            payt = saving - ans;
          } else if (!amount && !saving) {
            const percent = off / 100;
            const original_pr = pay / (1 - percent);
            ans = (original_pr - pay).toFixed(4);
            param.pay = original_pr.toFixed(4);
          } else if (!off && !saving) {
            ans = amount - pay;
            param.pay = ans;
            payt = ans;
          } else if (!amount && !off) {
            param.pay = saving + pay;
            ans = (saving / param.pay) * 100;
            ans = ans.toFixed(3);
            payt = saving - ans;
          }
        }
        // console.log(amount);
        param.amount = amount;
        param.Ans = ans;
        param.off = off;
        if (!param.pay) param.pay = pay;
        param.payt = payt;
        param.RESULT = 1;
        // console.log(param);
        return param;
      } else if (request.type === "2") {
        const p1 = parseFloat(request.p1);
        const p2 = parseFloat(request.p2);
        const off = parseFloat(request.off);

        if (isNaN(p1) || isNaN(p2) || isNaN(off)) {
          param.error = "Please fill All fields.";
          return param;
        }

        let ans, pay, payt, tax, taxt, total;

        if (request.tax === "no") {
          if (isNaN(parseFloat(request.sale))) {
            param.error = "Please fill All fields.";
            return param;
          }

          if (p1 <= p2) {
            ans = (p1 / 100) * off;
            payt = p1 - ans + p2;
            tax = (p1 / 100) * parseFloat(request.sale);
            let newP1 = p1 + tax;
            ans = (newP1 / 100) * off;
            const tax2 = (p2 / 100) * parseFloat(request.sale);
            const newP2 = tax2 + p2;
            pay = newP1 - ans + newP2;
            tax = tax + tax2;
            taxt = pay - payt;
          } else {
            ans = (p2 / 100) * off;
            payt = p2 - ans + p1;
            tax = (p2 / 100) * parseFloat(request.sale);
            let newP2 = p2 + tax;
            ans = (newP2 / 100) * off;
            const tax2 = (p1 / 100) * parseFloat(request.sale);
            const newP1 = tax2 + p1;
            pay = newP2 - ans + newP1;
            tax = tax + tax2;
            taxt = pay - payt;
          }
          total =
            parseFloat(request.p1) + parseFloat(request.p2) + parseFloat(tax);
          param.tax = tax;
          param.taxt = taxt;
        } else {
          if (p1 <= p2) {
            ans = (p1 / 100) * off;
            pay = p1 - ans + p2;
            payt = p1 - ans + p2;
          } else {
            ans = (p2 / 100) * off;
            pay = p2 - ans + p1;
            payt = p2 - ans + p1;
          }
          total = parseFloat(p1) + parseFloat(p2);
        }

        const ave = parseFloat((pay / 2).toFixed(2));
        const stand = 2;

        param.amount = parseFloat(request.p1) + parseFloat(request.p2);
        param.Ans = ans;
        param.ave = ave;
        param.per = parseFloat(((ans / total) * 100).toFixed(1));
        param.stand = stand;
        param.pay = pay;
        param.payt = payt;
        param.RESULT = 1;
        // console.log(ans,total);
        return param;
      } else if (request.type === "3") {
        const p1 = parseFloat(request.p1);
        const p2 = parseFloat(request.p2);
        const p3 = parseFloat(request.p3);
        const off = parseFloat(request.off);

        if (isNaN(p1) || isNaN(p2) || isNaN(p3) || isNaN(off)) {
          param.error = "Please fill All fields.";
          return param;
        }

        let ans, pay, payt, tax, taxt, total;

        if (request.tax === "no") {
          if (isNaN(parseFloat(request.sale))) {
            param.error = "Please fill All fields.";
            return false;
          }

          let minPrice = Math.min(p1, p2, p3);
          ans = (minPrice / 100) * off;
          payt =
            minPrice -
            ans +
            (p1 === minPrice ? p2 + p3 : p2 === minPrice ? p1 + p3 : p1 + p2);

          const tax1 = (p1 / 100) * parseFloat(request.sale);
          const tax2 = (p2 / 100) * parseFloat(request.sale);
          const tax3 = (p3 / 100) * parseFloat(request.sale);

          const newP1 = p1 + tax1;
          const newP2 = p2 + tax2;
          const newP3 = p3 + tax3;

          minPrice = Math.min(newP1, newP2, newP3);
          ans = (minPrice / 100) * off;
          pay =
            minPrice -
            ans +
            (newP1 === minPrice
              ? newP2 + newP3
              : newP2 === minPrice
              ? newP1 + newP3
              : newP1 + newP2);

          tax = tax1 + tax2 + tax3;
          taxt = pay - payt;
          total =
            parseFloat(request.p1) +
            parseFloat(request.p2) +
            parseFloat(request.p3) +
            parseFloat(tax);
          param.tax = tax;
          param.taxt = taxt;
        } else {
          const minPrice = Math.min(p1, p2, p3);
          ans = (minPrice / 100) * off;
          pay =
            minPrice -
            ans +
            (p1 === minPrice ? p2 + p3 : p2 === minPrice ? p1 + p3 : p1 + p2);
          payt = pay;
          total = p1 + p2 + p3;
        }

        const ave = parseFloat((pay / 3).toFixed(2));
        const stand = 3;

        param.amount =
          parseFloat(request.p1) +
          parseFloat(request.p2) +
          parseFloat(request.p3);
        param.Ans = ans;
        param.ave = ave;
        param.per = parseFloat(((ans / total) * 100).toFixed(1));
        param.stand = stand;
        param.pay = pay;
        param.payt = payt;
        param.RESULT = 1;
        console.log(param);
        return param;
      } else if (request.type === "4") {
        // Type 4 is identical to Type 1
        return this.getCalculationDiscountCalculator({ ...request, type: "1" });
      } else if (request.type === "5") {
        const p1 = parseFloat(request.p1);
        const p2 = parseFloat(request.p2);

        if (isNaN(p1) || isNaN(p2)) {
          param.error = "Please fill All fields.";
          return param;
        }

        let ans, pay, payt, tax, taxt, total;

        if (request.tax === "no") {
          if (isNaN(parseFloat(request.sale))) {
            param.error = "Please fill All fields.";
            return param;
          }

          if (p1 <= p2) {
            ans = p1;
            payt = p1 - ans + p2;
            tax = (p1 / 100) * parseFloat(request.sale);
            const newP1 = p1 + tax;
            ans = newP1;
            const tax2 = (p2 / 100) * parseFloat(request.sale);
            const newP2 = tax2 + p2;
            pay = newP1 - ans + newP2;
            tax = tax + tax2;
            taxt = pay - payt;
          } else {
            ans = p2;
            payt = p2 - ans + p1;
            tax = (p2 / 100) * parseFloat(request.sale);
            const newP2 = p2 + tax;
            ans = newP2;
            const tax2 = (p1 / 100) * parseFloat(request.sale);
            const newP1 = tax2 + p1;
            pay = newP2 - ans + newP1;
            tax = tax + tax2;
            taxt = pay - payt;
          }
          total =
            parseFloat(request.p1) + parseFloat(request.p2) + parseFloat(tax);
          param.tax = tax;
          param.taxt = taxt;
        } else {
          if (p1 <= p2) {
            ans = p1;
            pay = p1 - ans + p2;
            payt = p1 - ans + p2;
          } else {
            ans = p2;
            pay = p2 - ans + p1;
            payt = p2 - ans + p1;
          }
          total = p1 + p2;
        }

        const ave = parseFloat((pay / 2).toFixed(2));
        const stand = 2;

        param.amount = parseFloat(request.p1) + parseFloat(request.p2);
        param.Ans = ans;
        param.ave = ave;
        param.per = parseFloat(((ans / total) * 100).toFixed(1));
        param.stand = stand;
        param.pay = pay;
        param.payt = payt;
        param.RESULT = 1;
        // console.log(param);
        return param;
      } else if (request.type === "6") {
        const p1 = parseFloat(request.p1);
        const p2 = parseFloat(request.p2);
        const p3 = parseFloat(request.p3);

        if (isNaN(p1) || isNaN(p2) || isNaN(p3)) {
          param.error = "Please fill All fields.";
          return param;
        }

        let ans, pay, payt, tax, taxt, total;
        const minPrice = Math.min(p1, p2, p3);

        if (request.tax === "no") {
          if (isNaN(parseFloat(request.sale))) {
            param.error = "Please fill All fields.";
            return param;
          }

          ans = minPrice;
          payt =
            minPrice -
            ans +
            (p1 === minPrice ? p2 + p3 : p2 === minPrice ? p1 + p3 : p1 + p2);

          const tax1 = (p1 / 100) * parseFloat(request.sale);
          const tax2 = (p2 / 100) * parseFloat(request.sale);
          const tax3 = (p3 / 100) * parseFloat(request.sale);

          const newP1 = p1 + tax1;
          const newP2 = p2 + tax2;
          const newP3 = p3 + tax3;

          const newMinPrice = Math.min(newP1, newP2, newP3);
          ans = newMinPrice;
          pay =
            newMinPrice -
            ans +
            (newP1 === newMinPrice
              ? newP2 + newP3
              : newP2 === newMinPrice
              ? newP1 + newP3
              : newP1 + newP2);

          tax = tax1 + tax2 + tax3;
          taxt = pay - payt;
          total =
            parseFloat(request.p1) +
            parseFloat(request.p2) +
            parseFloat(request.p3) +
            parseFloat(tax);
          param.tax = tax;
          param.taxt = taxt;
        } else {
          ans = minPrice;
          pay =
            minPrice -
            ans +
            (p1 === minPrice ? p2 + p3 : p2 === minPrice ? p1 + p3 : p1 + p2);
          payt = pay;
          total = p1 + p2 + p3;
        }

        const ave = parseFloat((pay / 3).toFixed(2));
        const stand = 3;

        param.amount =
          parseFloat(request.p1) +
          parseFloat(request.p2) +
          parseFloat(request.p3);
        param.Ans = ans;
        param.ave = ave;
        param.per = parseFloat(((ans / total) * 100).toFixed(1));
        param.stand = stand;
        param.pay = pay;
        param.payt = payt;
        param.RESULT = 1;
        // console.log(param);
        return param;
      } else if (request.type === "7") {
        const p1 = parseFloat(request.p1);
        const p2 = parseFloat(request.p2);
        const p3 = parseFloat(request.p3);
        const p4 = parseFloat(request.p4);

        if (isNaN(p1) || isNaN(p2) || isNaN(p3) || isNaN(p4)) {
          param.error = "Please fill All fields.";
          return param;
        }

        let ans, pay, payt, tax, taxt, total, per;
        const minPrice = Math.min(p1, p2, p3, p4);

        if (request.tax === "no") {
          if (isNaN(parseFloat(request.sale))) {
            param.error = "Please fill All fields.";
            return param;
          }

          ans = minPrice;
          const others = [p1, p2, p3, p4]
            .filter((p) => p !== minPrice)
            .reduce((a, b) => a + b, 0);
          payt = minPrice - ans + others;

          const tax1 = (p1 / 100) * parseFloat(request.sale);
          const tax2 = (p2 / 100) * parseFloat(request.sale);
          const tax3 = (p3 / 100) * parseFloat(request.sale);
          const tax4 = (p4 / 100) * parseFloat(request.sale);

          const newP1 = p1 + tax1;
          const newP2 = p2 + tax2;
          const newP3 = p3 + tax3;
          const newP4 = p4 + tax4;

          const newMinPrice = Math.min(newP1, newP2, newP3, newP4);
          ans = newMinPrice;
          const newOthers = [newP1, newP2, newP3, newP4]
            .filter((p) => p !== newMinPrice)
            .reduce((a, b) => a + b, 0);
          pay = newMinPrice - ans + newOthers;

          tax = tax1 + tax2 + tax3 + tax4;
          taxt = pay - payt;
          total =
            parseFloat(request.p1) +
            parseFloat(request.p2) +
            parseFloat(request.p3) +
            parseFloat(request.p4) +
            parseFloat(tax);
          per = parseFloat(((ans / total) * 100).toFixed(1));
          param.tax = tax;
          param.taxt = taxt;
        } else {
          ans = minPrice;
          const others = [p1, p2, p3, p4]
            .filter((p) => p !== minPrice)
            .reduce((a, b) => a + b, 0);
          pay = minPrice - ans + others;
          payt = pay;
          total = p1 + p2 + p3 + p4;
          per = parseFloat(((ans / total) * 100).toFixed(1));

          if (per > 25) {
            per = 25;
            total = p1 + p2 + p3;
            const save = parseFloat((total * 0.25).toFixed(2));
            pay = parseFloat((total - save).toFixed(2));
            payt = parseFloat((total - save).toFixed(2));
          }
        }

        const ave = parseFloat((pay / 4).toFixed(2));
        const stand = 4;

        param.amount =
          parseFloat(request.p1) +
          parseFloat(request.p2) +
          parseFloat(request.p3) +
          parseFloat(request.p4);
        param.Ans = ans;
        param.ave = ave;
        param.per = per;
        param.stand = stand;
        param.pay = pay;
        param.payt = payt;
        param.RESULT = 1;
        // console.log(param);
        return param;
      } else if (request.type === "8") {
        const amount = parseFloat(request.amount);
        const off = parseFloat(request.off);
        const off2 = parseFloat(request.off2);

        if (isNaN(amount) || isNaN(off) || isNaN(off2)) {
          param.error = "Please fill All fields.";
          return param;
        }

        let ans, pay, payt, tax, taxt, effect;

        if (request.tax === "no") {
          if (isNaN(parseFloat(request.sale))) {
            param.error = "Please fill All fields.";
            return param;
          }

          const off1 = parseFloat(((amount / 100) * off).toFixed(2));
          const off_2 = parseFloat((((amount - off1) / 100) * off2).toFixed(2));
          ans = off1 + off_2;
          payt = amount - ans;
          tax = parseFloat(
            ((parseFloat(request.sale) / 100) * amount).toFixed(2)
          );
          const newAmount = amount + tax;
          const newOff1 = parseFloat(((newAmount / 100) * off).toFixed(2));
          const newOff2 = parseFloat(
            (((newAmount - newOff1) / 100) * off2).toFixed(2)
          );
          ans = newOff1 + newOff2;
          pay = newAmount - ans;
          taxt = pay - payt;
          effect = parseFloat(((ans / newAmount) * 100).toFixed(2));
          param.tax = tax;
          param.taxt = taxt;
        } else {
          const off1 = parseFloat(((amount / 100) * off).toFixed(2));
          const off_2 = parseFloat((((amount - off1) / 100) * off2).toFixed(2));
          ans = off1 + off_2;
          pay = amount - ans;
          payt = amount - ans;
          effect = parseFloat(
            ((ans / parseFloat(request.amount)) * 100).toFixed(2)
          );
        }

        param.amount = parseFloat(request.amount);
        param.Ans = ans;
        param.pay = pay;
        param.effect = effect;
        param.sum = `${
          parseFloat(request.off) + parseFloat(request.off2)
        }% (${parseFloat(request.off)}% + ${parseFloat(request.off2)}%)`;
        param.payt = payt;
        param.RESULT = 1;
        // console.log(param);
        return param;
      } else if (request.type === "9") {
        const amount = parseFloat(request.amount);
        const off = parseFloat(request.off);
        const off2 = parseFloat(request.off2);
        const off3 = parseFloat(request.off3);
        const sale = parseFloat(request.sale);
        // console.log(sale);
        if (isNaN(amount) || isNaN(off) || isNaN(off2) || isNaN(off3)) {
          param.error = "Please fill All fields.";
          return param;
        }

        let ans, pay, payt, tax, taxt, effect;

        if (request.tax == "no") {
          if (isNaN(parseFloat(request.sale))) {
            param.error = "Please fill All fields.";
            return param;
          }

          const off1 = parseFloat(((amount / 100) * off).toFixed(2));
          const off_2 = parseFloat((((amount - off1) / 100) * off2).toFixed(2));
          const off_3 = parseFloat(
            (((amount - off1 - off_2) / 100) * off3).toFixed(2)
          );
          ans = off1 + off_2 + off_3;
          payt = amount - ans;

          tax = Math.round((sale / 100) * amount);
          // console.log(sale,amount,tax);
          const newAmount = amount + tax;
          const newOff1 = Math.round((newAmount / 100) * off * 100) / 100;
          const newOff2 =
            Math.round(((newAmount - newOff1) / 100) * off2 * 100) / 100;
          const newOff3 =
            Math.round(((newAmount - newOff1 - newOff2) / 100) * off3 * 100) /
            100;

          ans = newOff1 + newOff2 + newOff3;
          pay = newAmount - ans;
          taxt = pay - payt;
          effect = parseFloat(((ans / newAmount) * 100).toFixed(2));
          param.tax = tax; // no
          param.taxt = taxt; // no
        } else {
          const off1 = parseFloat(((amount / 100) * off).toFixed(2));
          const off_2 = parseFloat((((amount - off1) / 100) * off2).toFixed(2));
          const off_3 = parseFloat(
            (((amount - off1 - off_2) / 100) * off3).toFixed(2)
          );
          ans = off1 + off_2 + off_3;
          pay = amount - ans;
          payt = amount - ans;
          effect = parseFloat(
            ((ans / parseFloat(request.amount)) * 100).toFixed(2)
          );
        }

        param.amount = parseFloat(request.amount);
        param.Ans = ans; // no
        param.pay = pay; ///no
        param.effect = effect;
        param.sum = `${
          parseFloat(request.off) +
          parseFloat(request.off2) +
          parseFloat(request.off3)
        }% (${parseFloat(request.off)}% + ${parseFloat(
          request.off2
        )}% + ${parseFloat(request.off3)}%)`;
        param.payt = payt;
        param.RESULT = 1;
        // console.log(param);
        return param;
      } else if (request.type === "10") {
        const nbr = parseFloat(request.nbr);
        const up = parseFloat(request.up);
        const fix = parseFloat(request.fix);

        if (isNaN(nbr) || isNaN(up) || isNaN(fix)) {
          param.error = "Please fill All fields.";
          return param;
        }

        let amount, ans, pay, payt, tax, taxt;

        if (request.tax === "no") {
          if (isNaN(parseFloat(request.sale))) {
            param.error = "Please fill All fields.";
            return param;
          }

          amount = nbr * up;
          tax = parseFloat(
            ((parseFloat(request.sale) / 100) * amount).toFixed(2)
          );
          taxt = parseFloat(
            ((parseFloat(request.sale) / 100) * fix).toFixed(2)
          );
          payt = fix;
          pay = fix + taxt;
          const total = amount + tax;
          ans = total - pay;
          param.tax = tax;
          param.taxt = taxt;
        } else {
          pay = fix;
          payt = fix;
          amount = nbr * up;
          ans = amount - pay;
        }

        param.amount = amount;
        param.Ans = ans;
        param.pay = pay;
        param.payt = payt;
        param.RESULT = 1;
        // console.log(param);
        return param;
      }

      param.error = "Invalid type";
      return param;
    }
  }

  /**
   * getCalculationProfitMarginCalculator: Service Method
   * POST: /api/calculators-lol/profit-margin-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationProfitMarginCalculator(body) {
    const param = {};
    const { tech_x, tech_y, tech_method } = body;

    if (typeof tech_x === "number" && typeof tech_y === "number") {
      if (tech_method === "Gross") {
        const margin = parseFloat(
          ((100 * (tech_y - tech_x)) / tech_y).toFixed(2)
        );
        const profit = tech_y - tech_x;
        const mark = parseFloat(((profit / tech_x) * 100).toFixed(2));

        param.tech_margin = `${margin} %`;
        param.tech_profit = `${profit}`;
        param.tech_mark = `${mark} %`;

        return param;
      }

      if (tech_method === "Net") {
        const margin = parseFloat(((tech_y / tech_x) * 100).toFixed(2));
        param.tech_margin = `${margin} %`;
        return param;
      }

      if (tech_method === "Operating") {
        const margin = parseFloat(((tech_y / tech_x) * 100).toFixed(2));
        param.tech_operating = `${margin} %`;
        return param;
      }
    } else {
      param.error = "Please fill all fields.";
      return param;
    }
  }

  /**
   * getCalculationEnterpriseValueCalculator: Service Method
   * POST: /api/calculators-lol/enterprise-value-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationEnterpriseValueCalculator(body) {
    const param = {};
    const { tech_cs, tech_ps, tech_mvd, tech_mi, tech_ce } = body;

    if (
      typeof tech_cs === "number" &&
      typeof tech_ps === "number" &&
      typeof tech_mvd === "number" &&
      typeof tech_mi === "number" &&
      typeof tech_ce === "number"
    ) {
      const EV = tech_cs + tech_ps + tech_mvd + tech_mi - tech_ce;
      param.tech_ev = EV.toLocaleString(); // Format the result as a number with commas
      return param;
    } else {
      param.error = "Please fill all fields.";
      return param;
    }
  }

  /**
   * getCalculationEbitdaCalculator: Service Method
   * POST: /api/calculators-lol/ebitda-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationEbitdaCalculator(body) {
    let param = {};

    // Helper functions
    function isNumeric(value) {
      return !isNaN(parseFloat(value)) && isFinite(value);
    }

    if (!body || typeof body !== "object") {
      param.error = "Invalid input!";
      return param;
    }

    let unit_type = body.tech_unit_type;
    let x = body.tech_x;
    let y = body.tech_y;
    let a = body.tech_a;
    let d = body.tech_d;
    let rev = body.tech_rev;
    let net = body.tech_net;
    let Interest = body.tech_Interest;
    let Taxes = body.tech_Taxes;
    let ae = body.tech_ae;
    let de = body.tech_de;

    if (unit_type === "simple") {
      if (isNumeric(x) && isNumeric(y) && isNumeric(a) && isNumeric(d)) {
        const ebitda = x - y + a + d;
        const margin = Math.round((ebitda / x) * 100 * 100) / 100; // Round to 2 decimals
        param.tech_ebitda = ebitda;
        param.tech_margin = margin + " %";
        return param;
      } else {
        param.error = "Please fill all fields.";
        return param;
      }
    } else if (unit_type === "extended") {
      if (
        isNumeric(rev) &&
        isNumeric(net) &&
        isNumeric(Interest) &&
        isNumeric(Taxes) &&
        isNumeric(ae) &&
        isNumeric(de)
      ) {
        const ebitda = net + Interest + Taxes + de + ae;
        const margin = Math.round((ebitda / rev) * 100 * 100) / 100;
        param.tech_ebitda = ebitda;
        param.tech_extended = "active";
        param.tech_margin = margin + " %";
        return param;
      } else {
        param.error = "Please fill all fields.";
        return param;
      }
    } else {
      param.error = "Invalid unit_type!";
      return param;
    }
  }

  /**
   * getCalculationEbitCalculator: Service Method
   * POST: /api/calculators-lol/ebit-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationEbitCalculator(body) {
    const x = body.tech_x;
    const y = body.tech_y;

    const isNumeric = (val) => !isNaN(parseFloat(val)) && isFinite(val);

    let results = {};

    if (isNumeric(x) && isNumeric(y)) {
      // Calculate EBIT
      const ebit = x - y;

      // Store the results
      results.tech_ebit = ebit;
    } else {
      results.error = "Please fill all fields.";
    }

    return results;
  }

  /**
   * getCalculationCPCalculator: Service Method
   * POST: /api/calculators-lol/cpc-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationCPCalculator(body) {
    const param = {};
    const { tech_method, tech_x, tech_y } = body;

    if (
      tech_method &&
      typeof tech_x === "number" &&
      typeof tech_y === "number"
    ) {
      let cpc;
      if (tech_method === "cpc") {
        cpc = tech_x / tech_y;
        param.ans = `${cpc}`;
      } else if (tech_method === "cost") {
        cpc = tech_x * tech_y;
        param.ans = `${cpc}`;
      } else if (tech_method === "click") {
        cpc = tech_x / tech_y;
        param.ans = cpc;
      }
      return param;
    } else {
      param.error = "Please fill all fields.";
      return param;
    }
  }

  /**
   * getCalculationWaccCalculator: Service Method
   * POST: /api/calculators-lol/wacc-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationWaccCalculator(body) {
    let param = {};

    // Helper functions
    function isNumeric(value) {
      return !isNaN(parseFloat(value)) && isFinite(value);
    }

    function round(value, decimals) {
      return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
    }

    if (!body || typeof body !== "object") {
      param.error = "Invalid input!";
      return param;
    }

    if (body.tech_unit_type === "debt") {
      if (
        isNumeric(body.tech_risk) &&
        isNumeric(body.tech_beta) &&
        isNumeric(body.tech_eq)
      ) {
        const eq = round(body.tech_risk + body.tech_beta * body.tech_eq, 4);
        param.tech_eq = eq;
        return param;
      } else {
        param.error = "Please! Check Your Input";
        return param;
      }
    } else if (body.tech_unit_type === "cd") {
      if (isNumeric(body.tech_rate) && isNumeric(body.tech_tax)) {
        if (
          isNumeric(body.tech_risk) &&
          isNumeric(body.tech_beta) &&
          isNumeric(body.tech_eq)
        ) {
          const eq = round(body.tech_risk + body.tech_beta * body.tech_eq, 4);
          param.tech_eq = eq;
        }
        const cd = round(
          (body.tech_rate / 100) * (1 - body.tech_tax / 100) * 100,
          4
        );
        param.tech_cd = cd;
        return param;
      } else {
        param.error = "Please! Check Your Input";
        return param;
      }
    } else {
      if (
        isNumeric(body.tech_a) &&
        isNumeric(body.tech_b) &&
        isNumeric(body.tech_c) &&
        isNumeric(body.tech_d) &&
        isNumeric(body.tech_e)
      ) {
        const D = body.tech_a;
        let RD = body.tech_b / 100;
        const E = body.tech_c;
        let RE = body.tech_d / 100;
        let T = body.tech_e / 100;

        const wacc = round(
          ((E / (E + D)) * RE + (D / (E + D)) * RD * (1 - T)) * 100,
          4
        );
        const pfe = round((E / (E + D)) * 100, 4);
        const pfd = round((D / (E + D)) * 100, 4);

        RD = RD * 100;
        RE = RE * 100;
        T = T * 100;

        param = {
          tech_wacc: wacc,
          tech_D: D,
          tech_RD: RD,
          tech_E: E,
          tech_RE: RE,
          tech_pfe: pfe,
          tech_pfd: pfd,
          tech_T: T,
        };
        return param;
      } else {
        param.error = "Please! Check Your Input";
        return param;
      }
    }
  }

  /**
   * getCalculationPaypalFeeCalculator: Service Method
   * POST: /api/calculators-lol/paypal-fee-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationPaypalFeeCalculator(body) {
    let param = {};

    // Helper function
    function isNumeric(value) {
      return !isNaN(parseFloat(value)) && isFinite(value);
    }

    if (!body || typeof body !== "object") {
      param.error = "Invalid input!";
      return param;
    }

    let x = body.tech_x;
    let rate = body.tech_rate;

    if (isNumeric(x)) {
      let fee = 0;
      let send = 0;

      switch (rate) {
        case "0":
          fee = Math.round(((2.9 / 100) * x + 0.3) * 100) / 100;
          send = Math.round(((100 * x + 30) / (100 - 2.9)) * 100) / 100;
          break;
        case "1":
          fee = Math.round(((2.7 / 100) * x + 0.3) * 100) / 100;
          send = Math.round(((100 * x + 30) / (100 - 2.7)) * 100) / 100;
          break;
        case "2":
          fee = Math.round(((2.2 / 100) * x + 0.3) * 100) / 100;
          send = Math.round(((100 * x + 30) / (100 - 2.2)) * 100) / 100;
          break;
        case "3":
          fee = Math.round(((5 / 100) * x + 0.05) * 100) / 100;
          send = Math.round(((100 * x + 5) / (100 - 5)) * 100) / 100;
          break;
        case "4":
          fee = Math.round(((4.4 / 100) * x + 0.3) * 100) / 100;
          send = Math.round(((100 * x + 30) / (100 - 4.4)) * 100) / 100;
          break;
        case "5":
          fee = Math.round(((4.2 / 100) * x + 0.3) * 100) / 100;
          send = Math.round(((100 * x + 30) / (100 - 4.2)) * 100) / 100;
          break;
        case "6":
          fee = Math.round(((3.7 / 100) * x + 0.3) * 100) / 100;
          send = Math.round(((100 * x + 30) / (100 - 3.7)) * 100) / 100;
          break;
        case "7":
          fee = Math.round(((6.5 / 100) * x + 0.05) * 100) / 100;
          send = Math.round(((100 * x + 5) / (100 - 6.5)) * 100) / 100;
          break;
        case "8":
          fee = Math.round((2.7 / 100) * x * 100) / 100;
          send = Math.round(((100 * x) / (100 - 2.7)) * 100) / 100;
          break;
        case "9":
          fee = Math.round(((3.5 / 100) * x + 0.15) * 100) / 100;
          send = Math.round(((100 * x + 15) / (100 - 3.5)) * 100) / 100;
          break;
        case "10":
          fee = Math.round(((3.1 / 100) * x + 0.3) * 100) / 100;
          send = Math.round(((100 * x + 30) / (100 - 3.1)) * 100) / 100;
          break;
        default:
          param.error = "Invalid rate!";
          return param;
      }

      const receive = Math.round((x - fee) * 100) / 100;
      const fee1 = Math.round((send - x) * 100) / 100;

      param.tech_receive = receive.toFixed(2);
      param.tech_send = send.toFixed(2);
      param.tech_fee = fee.toFixed(2);
      param.tech_fee1 = fee1.toFixed(2);

      return param;
    } else {
      param.error = "Please fill all fields.";
      return param;
    }
  }

  /**
   * getCalculationMarginOfErrorCalculator: Service Method
   * POST: /api/calculators-lol/margin-of-error-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationMarginOfErrorCalculator(body) {
    let per = body.tech_per;
    let x = body.tech_x;
    let y = body.tech_y;
    let z = body.tech_z;

    if (per && x && y && z) {
      let perValue = per.split("@")[0];
      let p = x / 100;
      let n = y;
      let Na = z;
      let ans = 0;

      if (perValue == 11 || perValue == 22) {
        perValue = 2.05;
      }

      ans =
        Math.round(
          ((perValue * Math.sqrt(p * (1 - p))) / Math.sqrt(n)) * 10000
        ) / 10000;

      if (Na !== undefined && Na !== null && Na !== "") {
        if (n == Na) {
          ans = 0;
        } else {
          ans =
            (Math.round(
              ((perValue * Math.sqrt(p * (1 - p))) /
                Math.sqrt(((Na - 1) * n) / (Na - n))) *
                10000
            ) /
              10000) *
            100;
        }
      }

      return {
        tech_ans: `±${ans}%`,
        tech_x: body.tech_x,
        tech_y: body.tech_y,
        tech_z: body.tech_z,
        tech_per: body.tech_per,
      };
    } else {
      return {
        error: "Please fill all fields.",
      };
    }
  }

  /**
   * getCalculationCpmCalculator: Service Method
   * POST: /api/calculators-lol/cpm-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationCpmCalculator(body) {
    let checkbox = body.tech_checkbox;
    let xf = body.tech_xf;
    let yf = body.tech_yf;
    let xs = body.tech_xs;
    let ys = body.tech_ys;
    let methodf = body.tech_methodf;
    let methods = body.tech_methods;
    let x = body.tech_x;
    let y = body.tech_y;
    let method = body.tech_method;
    let currency = body.tech_my_current;

    // Helper functions
    function isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function roundToThree(num) {
      return Math.round(num * 1000) / 1000;
    }

    if (checkbox) {
      // Checkbox selected case
      if (isNumeric(xf) && isNumeric(yf) && isNumeric(xs) && isNumeric(ys)) {
        let ansf, anss, cpmf, cpms;

        if (methodf === "cpm") {
          ansf = roundToThree((1000 * yf) / xf);
          cpmf = ansf;
          ansf = `${currency} ${ansf}`;
        } else if (methodf === "tc") {
          ansf = roundToThree((xf * yf) / 1000);
          cpmf = xf;
          ansf = `${currency} ${ansf}`;
        } else {
          cpmf = xf;
          ansf = roundToThree((1000 * yf) / xf);
        }

        if (methods === "cpm") {
          anss = roundToThree((1000 * ys) / xs);
          cpms = anss;
          anss = `${currency} ${anss}`;
        } else if (methods === "tc") {
          anss = roundToThree((xs * ys) / 1000);
          cpms = xs;
          anss = `${currency} ${anss}`;
        } else {
          cpms = xs;
          anss = roundToThree((1000 * ys) / xs);
        }
        return {
          tech_ansf: ansf,
          tech_cpmf: cpmf,
          tech_anss: anss,
          tech_cpms: cpms,
          tech_methodf: methodf,
          tech_methods: methods,
        };
      } else {
        return {
          error: "Please fill all fields.",
        };
      }
    } else {
      // Without checkbox case
      if (isNumeric(x) && isNumeric(y)) {
        let ansResult;
        if (method === "cpm") {
          ansResult = x == 0 ? 0 : roundToThree((1000 * y) / x);
        } else if (method === "tc") {
          ansResult = x == 0 ? 0 : roundToThree((x * y) / 1000);
        } else {
          ansResult = x == 0 ? 0 : roundToThree((1000 * y) / x);
        }

        return {
          tech_ans: `${currency} ${ansResult}`,
          tech_method: method,
        };
      } else {
        return {
          error: "Please fill all fields.",
        };
      }
    }
  }

  /**
   * getCalculationMarkupCalculator: Service Method
   * POST: /api/calculators-lol/markup-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationMarkupCalculator(body) {
    let to_cal = body.tech_to_cal;
    let a = body.tech_a;
    let b = body.tech_b;
    let c = body.tech_c;
    let d = body.tech_d;

    let result = {};

    if (to_cal === "1") {
      if (!isNaN(a) && !isNaN(b)) {
        let cost = parseFloat(a);
        let markup = parseFloat(b);
        let revenue = cost + cost * (markup / 100);
        let profit = revenue - cost;
        let margin = (100 * profit) / revenue;

        result = {
          tech_cost: cost.toFixed(2),
          tech_markup: markup.toFixed(2),
          tech_revenue: revenue.toFixed(2),
          tech_profit: profit.toFixed(2),
          tech_margin: margin.toFixed(2),
        };
      } else {
        result.error = "Please fill all fields.";
      }
    } else if (to_cal === "2") {
      if (!isNaN(a) && !isNaN(c)) {
        let cost = parseFloat(a);
        let revenue = parseFloat(c);
        let profit = revenue - cost;
        let margin = (100 * profit) / revenue;
        let markup = (100 * profit) / cost;

        result = {
          tech_cost: cost.toFixed(2),
          tech_markup: markup.toFixed(2),
          tech_revenue: revenue.toFixed(2),
          tech_profit: profit.toFixed(2),
          tech_margin: margin.toFixed(2),
        };
      } else {
        result.error = "Please fill all fields.";
      }
    } else if (to_cal === "3") {
      if (!isNaN(a) && !isNaN(d)) {
        let cost = parseFloat(a);
        let profit = parseFloat(d);
        let revenue = profit + cost;
        let margin = (100 * profit) / revenue;
        let markup = (100 * profit) / cost;

        result = {
          tech_cost: cost.toFixed(2),
          tech_markup: markup.toFixed(2),
          tech_revenue: revenue.toFixed(2),
          tech_profit: profit.toFixed(2),
          tech_margin: margin.toFixed(2),
        };
      } else {
        result.error = "Please fill all fields.";
      }
    } else if (to_cal === "4") {
      if (!isNaN(b) && !isNaN(c)) {
        let markup = parseFloat(b);
        let revenue = parseFloat(c);
        let margin = (markup / 100 / (1 + markup / 100)) * 100;
        let cost = revenue - (margin * revenue) / 100;
        let profit = revenue - cost;

        result = {
          tech_cost: cost.toFixed(2),
          tech_markup: markup.toFixed(2),
          tech_revenue: revenue.toFixed(2),
          tech_profit: profit.toFixed(2),
          tech_margin: margin.toFixed(2),
        };
      } else {
        result.error = "Please fill all fields.";
      }
    } else if (to_cal === "5") {
      if (!isNaN(b) && !isNaN(d)) {
        let markup = parseFloat(b);
        let profit = parseFloat(d);
        let margin = (markup / 100 / (1 + markup / 100)) * 100;
        let revenue = (100 * profit) / margin;
        let cost = revenue - (margin * revenue) / 100;

        result = {
          tech_cost: cost.toFixed(2),
          tech_markup: markup.toFixed(2),
          tech_revenue: revenue.toFixed(2),
          tech_profit: profit.toFixed(2),
          tech_margin: margin.toFixed(2),
        };
      } else {
        result.error = "Please fill all fields.";
      }
    } else if (to_cal === "6") {
      if (!isNaN(c) && !isNaN(d)) {
        let revenue = parseFloat(c);
        let profit = parseFloat(d);
        let cost = revenue - profit;
        let markup = (100 * profit) / cost;
        let margin = (markup / 100 / (1 + markup / 100)) * 100;

        result = {
          tech_cost: cost.toFixed(2),
          tech_markup: markup.toFixed(2),
          tech_revenue: revenue.toFixed(2),
          tech_profit: profit.toFixed(2),
          tech_margin: margin.toFixed(2),
        };
      } else {
        result.error = "Please fill all fields.";
      }
    } else {
      result.error = "Please fill all fields.";
    }

    return result;
  }

  /**
   * getCalculationIncomeElasticityOfDemandCalculator: Service Method
   * POST: /api/calculators-lol/income-elasticity-of-demand-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationIncomeElasticityOfDemandCalculator(body) {
    const param = {};
    const { tech_i_p, tech_n_p, tech_i_q, tech_n_q } = body;

    // Helper function to round numbers
    const round = (num, dec = 2) => {
      return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
    };

    // Validate if all inputs are numbers
    if (
      isFinite(tech_i_p) &&
      isFinite(tech_n_p) &&
      isFinite(tech_i_q) &&
      isFinite(tech_n_q)
    ) {
      const pi = (tech_n_q - tech_i_q) / tech_i_q;
      const pq = (tech_n_p - tech_i_p) / tech_i_p;
      const eq = (tech_n_q - tech_i_q) / (tech_n_q + tech_i_q);
      const ep = (tech_n_p - tech_i_p) / (tech_n_p + tech_i_p);
      const ie = eq / ep;
      const ir = tech_i_p * tech_i_q;
      const fr = tech_n_p * tech_n_q;
      const R = round(tech_i_p * tech_i_q - tech_n_p * tech_n_q, 2);

      let rs = "";
      if (R > 0) {
        rs = "Elastic Demand";
      } else if (R === 1) {
        rs = "Unitary Elastic";
      } else if (R < 1) {
        rs = "Inelastic Demand";
      } else if (R === 0) {
        rs = "Perfectly Inelastic";
      } else {
        rs = "Perfectly Elastic";
      }

      const rin = round(((fr - ir) / ir) * 100, 2);
      const cq = round(pi, 2);
      const cp = round(pq, 2);

      param.ie = ie;
      param.ir = ir;
      param.fr = fr;
      param.sr = rs;
      param.cq = cq;
      param.cp = cp;
      param.rin = rin;

      return param;
    } else {
      param.error = "Please fill all fields.";
      return param;
    }
  }

  /**
   * getCalculationCapRateCalculator: Service Method
   * POST: /api/calculators-lol/cap-rate-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationCapRateCalculator(body) {
    // Separate variables
    let prop_val = body.tech_prop_val;
    let ann_grs_inc = body.tech_ann_grs_inc;
    let op_exp = body.tech_op_exp;
    let op_exp_unit = body.tech_op_exp_unit;
    let vac_rate = body.tech_vac_rate;

    // Remove commas
    prop_val = prop_val ? prop_val.toString().replace(/,/g, "") : "0";
    ann_grs_inc = ann_grs_inc ? ann_grs_inc.toString().replace(/,/g, "") : "0";
    op_exp = op_exp ? op_exp.toString().replace(/,/g, "") : "0";
    vac_rate = vac_rate ? vac_rate.toString().replace(/,/g, "") : "0";

    let param = {};

    // Check if inputs are numeric
    if (!isNaN(prop_val) && !isNaN(ann_grs_inc) && !isNaN(op_exp)) {
      vac_rate = isNaN(vac_rate) ? 0 : parseFloat(vac_rate);

      prop_val = parseFloat(prop_val);
      ann_grs_inc = parseFloat(ann_grs_inc);
      op_exp = parseFloat(op_exp);

      let vac_rate1 = (vac_rate / 100) * ann_grs_inc;
      let grs_op_inc = ann_grs_inc - vac_rate1;
      let ann_net_inc = 0;

      if (op_exp_unit === "%") {
        ann_net_inc =
          ((100 - op_exp) / 100) * ((100 - vac_rate) / 100) * ann_grs_inc;
        param["percent"] = "%";
      } else {
        ann_net_inc = grs_op_inc - op_exp;
      }

      let cap = (ann_net_inc / prop_val) * 100;

      param["tech_grs_op_inc"] = Math.round(grs_op_inc).toLocaleString();
      param["tech_ann_net_inc"] = Math.round(ann_net_inc).toLocaleString();
      param["tech_cap"] = parseFloat(cap.toFixed(3));
      param["tech_prop_val"] = Math.round(prop_val).toLocaleString();
      param["tech_ann_grs_inc"] = Math.round(ann_grs_inc).toLocaleString();
      param["tech_op_exp"] = Math.round(op_exp).toLocaleString();
      param["tech_vac_rate"] = Math.round(vac_rate).toLocaleString();
      param["tech_vac_rate1"] = Math.round(vac_rate1).toLocaleString();
      param["input_prop_val"] = body.tech_prop_val;
      param["input_ann_grs_inc"] = body.tech_ann_grs_inc;
      param["input_op_exp"] = body.tech_op_exp;
      param["input_op_exp_unit"] = body.tech_op_exp_unit;
      param["input_vac_rate"] = body.tech_vac_rate;

      return param;
    } else {
      param["error"] = "Please! Check Your Input";
      return param;
    }
  }

  /**
   * getCalculationCapmRateCalculator: Service Method
   * POST: /api/calculators-lol/capm-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationCapmRateCalculator(body) {
    // Separate variables
    let cal = body.tech_cal;
    let rf = body.tech_rf;
    let rm = body.tech_rm;
    let bi = body.tech_bi;
    let r = body.tech_r;

    let param = {};

    if (cal && !isNaN(rf) && !isNaN(rm) && !isNaN(bi) && !isNaN(r)) {
      rf = parseFloat(rf);
      rm = parseFloat(rm);
      bi = parseFloat(bi);
      r = parseFloat(r);

      let eq_market_prem = 0;
      let risk_prem = 0;
      let r_mr = 0;
      let r_mrp = 0;

      if (cal === "R" && !isNaN(rf) && !isNaN(rm) && !isNaN(bi)) {
        eq_market_prem = rm - rf;
        risk_prem = bi * eq_market_prem;
        r = rf + risk_prem;
        r_mr = (rm * bi) / rf;
        r_mrp = r + r_mr;
      } else if (cal === "Bi" && !isNaN(r) && !isNaN(rf) && !isNaN(rm)) {
        let s1 = r - rf;
        eq_market_prem = rm - rf;
        if (eq_market_prem > 0) {
          bi = s1 / eq_market_prem;
        } else {
          bi = 0;
        }
        risk_prem = bi * eq_market_prem;
        r_mr = (rm * bi) / rf;
        r_mrp = r + r_mr;
        param["s1"] = parseFloat(s1.toFixed(3));
      } else if (cal === "Rf" && !isNaN(r) && !isNaN(rm) && !isNaN(bi)) {
        let s1 = bi * rm;
        let s2 = s1 - r;
        let s3 = bi - 1;
        rf = s2 / s3;
        eq_market_prem = rm - rf;
        risk_prem = bi * eq_market_prem;
        r_mr = (rm * bi) / rf;
        r_mrp = r + r_mr;
        param["tech_s1"] = parseFloat(s1.toFixed(3));
        param["tech_s2"] = parseFloat(s2.toFixed(3));
        param["tech_s3"] = parseFloat(s3.toFixed(3));
      } else if (cal === "Rm" && !isNaN(r) && !isNaN(rf) && !isNaN(bi)) {
        let s1 = bi - 1;
        let s2 = rf * s1;
        let s3 = s2 + r;
        rm = s3 / bi;
        eq_market_prem = rm - rf;
        risk_prem = bi * eq_market_prem;
        r_mr = (rm * bi) / rf;
        r_mrp = r + r_mr;
        param["tech_s1"] = parseFloat(s1.toFixed(3));
        param["tech_s2"] = parseFloat(s2.toFixed(3));
        param["tech_s3"] = parseFloat(s3.toFixed(3));
      } else {
        param["error"] = "Please fill all fields.";
        return param;
      }

      param["tech_cal"] = cal;
      param["tech_R"] = parseFloat(r.toFixed(3));
      param["tech_Rp"] = parseFloat(risk_prem.toFixed(3));
      param["tech_Emp"] = parseFloat(eq_market_prem.toFixed(3));
      param["tech_Rf"] = parseFloat(rf.toFixed(3));
      param["tech_Rm"] = parseFloat(rm.toFixed(3));
      param["tech_Bi"] = parseFloat(bi.toFixed(3));
      param["tech_Rmr"] = parseFloat(r_mr.toFixed(3));
      param["tech_Rmrp"] = parseFloat(r_mrp.toFixed(3));
      param["input_cal"] = body.tech_cal;
      param["input_rf"] = body.tech_rf;
      param["input_rm"] = body.tech_rm;
      param["input_bi"] = body.tech_bi;
      param["input_r"] = body.tech_r;

      return param;
    } else {
      param["error"] = "Please fill all fields.";
      return param;
    }
  }

  /**
   * getCalculationMarginalCostCalculator: Service Method
   * POST: /api/calculators-lol/marginal-cost-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationMarginalCostCalculator(body) {
    let unit_type = body.tech_unit_type;

    // Variables separate
    let dc, dq, dq_unit, sr;
    let cc, fc, cq, cq_unit, fq, fq_unit, gr;

    let param = {}; // same as $this->param in PHP

    if (unit_type === "sr") {
      dc = body.tech_dc;
      dq = body.tech_dq;
      dq_unit = body.tech_dq_unit;
      sr = unit_type;
    } else {
      cc = body.tech_cc;
      fc = body.tech_fc;
      cq = body.tech_cq;
      cq_unit = body.tech_cq_unit;
      fq = body.tech_fq;
      fq_unit = body.tech_fq_unit;
      gr = unit_type;
    }

    let check = false;

    if (sr) {
      if (!isNaN(dc) && !isNaN(dq) && dq_unit) {
        check = true;
      }
    } else {
      if (
        !isNaN(cc) &&
        !isNaN(fc) &&
        !isNaN(cq) &&
        !isNaN(fq) &&
        cq_unit &&
        fq_unit
      ) {
        check = true;
      }
    }

    if (check) {
      if (dq_unit) {
        if (dq_unit === "pairs") {
          dq = dq * 2;
        } else if (dq_unit === "decades") {
          dq = dq * 10;
        } else if (dq_unit === "dozens") {
          dq = dq * 12;
        }
      }

      if (cq_unit) {
        if (cq_unit === "pairs") {
          cq = cq * 2;
        } else if (cq_unit === "decades") {
          cq = cq * 10;
        } else if (cq_unit === "dozens") {
          cq = cq * 12;
        }
      }

      if (fq_unit) {
        if (fq_unit === "pairs") {
          fq = fq * 2;
        } else if (fq_unit === "decades") {
          fq = fq * 10;
        } else if (fq_unit === "dozens") {
          fq = fq * 12;
        }
      }

      let mc, dcFinal, dqFinal;

      if (sr) {
        if (!isNaN(dc) && !isNaN(dq)) {
          mc = dc / dq;
          dcFinal = dc;
          dqFinal = dq;
          param["tech_check"] = "m1";
        }
      } else if (gr) {
        if (!isNaN(cc) && !isNaN(fc) && !isNaN(cq) && !isNaN(fq)) {
          dcFinal = fc - cc;
          dqFinal = fq - cq;
          mc = dcFinal / dqFinal;
          param["tech_check"] = "m2";
          param["tech_cc"] = cc;
          param["tech_fc"] = fc;
          param["tech_cq"] = cq;
          param["tech_fq"] = fq;
        }
      } else {
        param["error"] = "Please fill all fields.";
        return param;
      }

      param["tech_mc"] = mc;
      param["tech_dc"] = dcFinal;
      param["tech_dq"] = dqFinal;

      return param;
    } else {
      param["error"] = "Please fill all fields.";
      return param;
    }
  }

  /**
   * getCalculationOvertimeCalculator: Service Method
   * POST: /api/calculators-lol/overtime-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationOvertimeCalculator(body) {
    // Separate variables from body
    let pay = body.tech_pay;
    let per = body.tech_per;
    let timeper = "h_m"; // Hardcoded as in your PHP code
    let multi = body.tech_multi;
    let time = body.tech_time;
    let over = body.tech_over;
    let overper = body.tech_overper; // not used but extracted

    let param = {};

    if (!isNaN(pay) && per && !isNaN(multi)) {
      let hourly = pay;

      if (per === "hour") {
        hourly = hourly;
      } else if (per === "day") {
        hourly = hourly / 8;
      } else if (per === "week") {
        hourly = hourly / 40;
      } else {
        hourly = hourly / 173.6;
      }

      let monthTime = time;

      if (timeper === "h_m") {
        monthTime = monthTime;
      } else if (timeper === "d_m") {
        monthTime = monthTime * 8;
      } else if (timeper === "w_m") {
        monthTime = monthTime * 5 * 8;
      } else if (timeper === "h_w") {
        monthTime = monthTime * 4.344;
      } else if (timeper === "d_w") {
        monthTime = monthTime * 8 * 4.345;
      } else if (timeper === "h_d") {
        monthTime = monthTime * 5 * 4.345;
      }

      let regPay = +(hourly * monthTime);

      let overPayPerHour = +(multi * hourly);
      let overHour = +over;
      let overTotalPay = +(overHour * overPayPerHour);

      param["tech_overPayPerHour"] = overPayPerHour;
      param["tech_overTotalPay"] = overTotalPay;
      param["tech_regPay"] = regPay;
      param["tech_total"] = overTotalPay + regPay;
      return param;
    } else {
      param["error"] = "Please fill all fields.";
      return param;
    }
  }

  /**
   * getCalculationMaximumProfitCalculator: Service Method
   * POST: /api/calculators-lol/maximum-profit-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationMaximumProfitCalculator(body) {
    const param = {};
    const p = Number(body.tech_p);
    const Q = Number(body.tech_Q);
    const C = Number(body.tech_C);

    if (isFinite(p) && isFinite(Q) && isFinite(C)) {
      const R = p * Q;
      const cost = C * p;
      const profit = R - cost;

      param.tech_R = R;
      param.tech_profit = profit;
      return param;
    } else {
      param.error = "Please! Check Your Input";
      return param;
    }
  }

  /**
   * getCalculationRoiCalculator: Service Method
   * POST: /api/calculators-lol/roi-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationRoiCalculator(body) {
    function tech_years(tech_a, tech_b) {
      if (tech_b === "1") {
        return tech_a / 365;
      } else if (tech_b === "2") {
        return tech_a / 12;
      } else if (tech_b === "3") {
        return tech_a / 52.143;
      } else if (tech_b === "4") {
        return tech_a * 1;
      }
      return tech_a;
    }

    function tech_dateDiffInDays(tech_date1, tech_date2) {
      const tech_diff = new Date(tech_date2) - new Date(tech_date1);
      return Math.abs(Math.round(tech_diff / (1000 * 60 * 60 * 24)));
    }

    function tech_formatNumberWithCommas(tech_num) {
      const tech_parts = parseFloat(tech_num).toFixed(4).split(".");
      tech_parts[0] = tech_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return tech_parts.join(".");
    }

    const {
      tech_invest: tech_invest,
      tech_return: tech_returnAmount,
      tech_find: tech_find,
      tech_annualized: tech_annualized,
      tech_date: tech_date,
      tech_s_date: tech_s_date,
      tech_e_date: tech_e_date,
      tech_length: tech_length,
      tech_length_unit: tech_length_unit,
      tech_compare: tech_compare,
      tech_invest_compare: tech_invest_compare,
      tech_return_compare: tech_return_compare,
      tech_find_compare: tech_find_compare,
      tech_annualized_compare: tech_annualized_compare,
      tech_date_compare: tech_date_compare,
      tech_s_date_compare: tech_s_date_compare,
      tech_e_date_compare: tech_e_date_compare,
      tech_length_compare: tech_length_compare,
      tech_length_unit_compare: tech_length_unit_compares,
    } = body;

    let result = {};
    let tech_annualized_answer, tech_time, tech_loss, tech_gain, tech_roi;

    // Convert length units to numeric values
    let tech_length_unit_val = "1";
    if (tech_length_unit === "days") tech_length_unit_val = "1";
    else if (tech_length_unit === "weeks") tech_length_unit_val = "2";
    else if (tech_length_unit === "months") tech_length_unit_val = "3";
    else if (tech_length_unit === "years") tech_length_unit_val = "4";

    let tech_length_unit_compare_val = "1";
    if (tech_length_unit_compares === "days")
      tech_length_unit_compare_val = "1";
    else if (tech_length_unit_compares === "weeks")
      tech_length_unit_compare_val = "2";
    else if (tech_length_unit_compares === "months")
      tech_length_unit_compare_val = "3";
    else if (tech_length_unit_compares === "years")
      tech_length_unit_compare_val = "4";

    // Validate required fields
    if (tech_invest === undefined || tech_returnAmount === undefined) {
      result.error = "Investment and return amount are required";
      return result;
    }

    // Main calculation
    if (!(tech_invest <= 0)) {
      if (!(tech_returnAmount <= 0)) {
        const tech_answer = tech_returnAmount - tech_invest;

        if (tech_answer >= 0) {
          tech_loss = "0.00";
          tech_gain = tech_answer;
        } else {
          tech_loss = (-1 * tech_answer).toFixed(2);
          tech_gain = "0.00";
        }

        const tech_a1 = tech_answer / tech_invest;
        tech_roi = (tech_a1 * 100).toFixed(2);

        if (tech_find === "1") {
          if (tech_date === "1") {
            if (!tech_s_date || !tech_e_date) {
              result.error = "Start and end dates are required";
              return result;
            }

            let tech_from = new Date(tech_s_date);
            let tech_to = new Date(tech_e_date);

            if (tech_from > tech_to)
              [tech_from, tech_to] = [tech_to, tech_from];

            result.tech_from = tech_from.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });
            result.tech_to = tech_to.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });

            const tech_days = tech_dateDiffInDays(tech_from, tech_to);
            const tech_yrs = tech_days / 365;
            const tech_top_n = 1 / tech_yrs;
            const tech_inner1 = 1 + tech_a1;
            const tech_outer = Math.pow(tech_inner1, tech_top_n);
            const tech_annual_ans = tech_outer - 1;
            tech_annualized_answer = tech_annual_ans * 100;
            tech_time = tech_yrs;
          } else if (tech_date === "2") {
            if (!tech_length || tech_length == 0) {
              result.error = "Investment Length cannot be zero.";
              return result;
            }

            const tech_length_yrs = tech_years(
              tech_length,
              tech_length_unit_val
            );
            const tech_n_top = 1 / tech_length_yrs;
            const tech_inner = 1 + tech_a1;
            const tech_final = Math.pow(tech_inner, tech_n_top);
            const tech_annualized_ans1 = tech_final - 1;
            tech_annualized_answer = tech_annualized_ans1 * 100;
            tech_time = tech_length_yrs;
          }

          if (tech_annualized_answer !== undefined) {
            result.tech_annualized_answer = tech_formatNumberWithCommas(
              tech_annualized_answer
            );
          }
        } else if (tech_find === "2") {
          if (!tech_annualized) {
            result.error = "Annualized rate is required";
            return result;
          }

          const tech_annual = tech_annualized / 100;
          const tech_plus_roi = 1 + tech_a1;
          const tech_left = tech_annual + 1;
          const tech_log_left = Math.log(tech_left);
          const tech_log_right = Math.log(tech_plus_roi);

          let tech_ans =
            tech_log_right === 0 ? 0 : tech_log_left / tech_log_right;
          tech_time = tech_ans === 0 ? 0 : 1 / tech_ans;
        }
      } else {
        result.error = "The minimum returned amount is 0.";
        return result;
      }
    } else {
      result.error = "You have to invest some money!";
      return result;
    }

    // Comparison calculation
    if (tech_compare === "2") {
      if (
        tech_invest_compare === undefined ||
        tech_return_compare === undefined
      ) {
        result.error = "Comparison investment and return amount are required";
        return result;
      }

      if (!(tech_invest_compare <= 0)) {
        if (!(tech_return_compare <= 0)) {
          const tech_answer2 = tech_return_compare - tech_invest_compare;
          let tech_loss2, tech_gain2;

          if (tech_answer2 >= 0) {
            tech_loss2 = "0.00";
            tech_gain2 = tech_answer2.toFixed(2);
          } else {
            tech_loss2 = (-1 * tech_answer2).toFixed(2);
            tech_gain2 = "0.00";
          }

          const tech_a12 = tech_answer2 / tech_invest_compare;
          const tech_roi2 = (tech_a12 * 100).toFixed(2);
          let tech_annualized_answer2, tech_time2;

          if (tech_find_compare === "1") {
            if (tech_date_compare === "1") {
              if (!tech_s_date_compare || !tech_e_date_compare) {
                result.error = "Comparison start and end dates are required";
                return result;
              }

              let tech_from2 = new Date(tech_s_date_compare);
              let tech_to2 = new Date(tech_e_date_compare);

              if (tech_from2 > tech_to2)
                [tech_from2, tech_to2] = [tech_to2, tech_from2];

              result.tech_from2 = tech_from2.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              });
              result.tech_to2 = tech_to2.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              });

              const tech_days2 = tech_dateDiffInDays(tech_from2, tech_to2);
              const tech_yrs2 = tech_days2 / 365;
              const tech_top_n2 = 1 / tech_yrs2;
              const tech_inner12 = 1 + tech_a12;
              const tech_outer2 = Math.pow(tech_inner12, tech_top_n2);
              const tech_annual_ans2 = tech_outer2 - 1;
              tech_annualized_answer2 = tech_annual_ans2 * 100;
              tech_time2 = tech_yrs2;
            } else if (tech_date_compare === "2") {
              if (!tech_length_compare || tech_length_compare == 0) {
                result.error = "Comparison investment length cannot be zero";
                return result;
              }

              const tech_length_compare_yrs = tech_years(
                tech_length_compare,
                tech_length_unit_compare_val
              );
              const tech_n_top2 = 1 / tech_length_compare_yrs;
              const tech_inner2 = 1 + tech_a12;
              const tech_final2 = Math.pow(tech_inner2, tech_n_top2);
              const tech_annualized_ans12 = tech_final2 - 1;
              tech_annualized_answer2 = tech_annualized_ans12 * 100;
              tech_time2 = tech_length_compare_yrs;
            }

            if (tech_annualized_answer2 !== undefined) {
              result.tech_annualized_answer2 = tech_formatNumberWithCommas(
                tech_annualized_answer2
              );
            }
          } else if (tech_find_compare === "2") {
            if (!tech_annualized_compare) {
              result.error = "Comparison annualized rate is required";
              return result;
            }

            const tech_annual2 = tech_annualized_compare / 100;
            const tech_plus_roi2 = 1 + tech_a12;
            const tech_left2 = tech_annual2 + 1;
            const tech_log_left2 = Math.log(tech_left2);
            const tech_log_right2 = Math.log(tech_plus_roi2);
            const tech_ans2 = tech_log_left2 / tech_log_right2;
            tech_time2 = 1 / tech_ans2;
          }

          result.tech_time2 = parseFloat(tech_time2.toFixed(3));
          result.tech_loss2 = tech_loss2;
          result.tech_gain2 = tech_gain2;
          result.tech_roi2 = tech_roi2;
        } else {
          result.error = "The minimum comparison returned amount is 0.";
          return result;
        }
      } else {
        result.error = "You have to invest some money for comparison!";
        return result;
      }
    }

    // Common result properties
    result.tech_time =
      tech_time !== undefined ? parseFloat(tech_time.toFixed(3)) : undefined;
    result.tech_loss = tech_loss;
    result.tech_gain = tech_gain;
    result.tech_roi = tech_roi;
    result.tech_compare = tech_compare;
    result.tech_find = tech_find;
    result.tech_date = tech_date;
    result.tech_s_date = tech_s_date;
    result.tech_e_date = tech_e_date;

    return result;
  }

  /**
   * getCalculationFutureValueOfAnnuityCalculator: Service Method
   * POST: /api/calculators-lol/future-value-of-annuity
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationFutureValueOfAnnuityCalculator(body) {
    let payment = parseFloat(body.tech_payment);
    let interest = parseFloat(body.tech_interest);
    let term = parseFloat(body.tech_term);
    let term_unit = body.tech_term_unit;
    let compounding = parseFloat(body.tech_compounding);
    let payment_fre = parseFloat(body.tech_payment_fre);
    let annuity_type = body.tech_annuity_type;
    let g = body.tech_g ? parseFloat(body.tech_g) : null;

    function yearsConvert(term, term_unit) {
      if (term_unit === "mons") {
        return term / 12;
      } else if (term_unit === "yrs") {
        return term * 1;
      }
      return term;
    }

    let param = {};

    if (!isNaN(payment) && !isNaN(interest) && !isNaN(term)) {
      term = yearsConvert(term, term_unit);
      let r = interest / 100;
      let i = r / compounding;
      let n = term * compounding;
      let f_part = 1 + i;
      let s_part = Math.pow(f_part, n);
      let up_part = s_part - 1;
      let l_part = payment / i;

      let annuity;
      if (annuity_type === "mons") {
        annuity = up_part * l_part;
      } else if (annuity_type === "yrs") {
        let annuity_ans = up_part * l_part;
        annuity = annuity_ans * f_part;
      }

      if (!isNaN(g)) {
        if (g === i) {
          let n1 = n - 1;
          let s_part2 = Math.pow(f_part, n1);
          annuity = payment * n * s_part2;
        } else if (g !== i) {
          let G = g / 100;
          let ig = i - G;
          let iG = 1 + G;
          let ig_part = Math.pow(iG, n);
          let part1 = payment / ig;
          let part2 = s_part - ig_part;
          annuity = part1 * part2;
        }
      }

      if (compounding === 366) {
        let ry = r * term;
        let e1 = Math.pow(Math.E, ry);
        let e2 = Math.pow(Math.E, r);
        let top = e1 - 1;
        let down = e2 - 1;
        let annu = top / down;
        annuity = payment * annu;
      }

      let div = r / compounding;
      let top_div = compounding / payment_fre;
      let final_a = div + 1;
      let overall = Math.pow(final_a, top_div);
      let res = overall - 1;
      let equ = payment_fre * res * 100;
      let equ2 = equ;

      if (payment_fre === 1) {
        term = term * 1;
        annuity = annuity * 1;
        equ2 = equ;
      } else if (payment_fre === 2) {
        term = term * 2;
        annuity = annuity * 2;
        equ2 = equ / 2;
      } else if (payment_fre === 4) {
        term = term * 4;
        annuity = annuity * 4;
        equ2 = equ / 4;
      } else if (payment_fre === 12) {
        term = term * 12;
        annuity = annuity * 12;
        equ2 = equ / 12;
      } else if (payment_fre === 52) {
        term = term * 52;
        annuity = annuity * 52;
        equ2 = equ / 52;
      } else if (payment_fre === 365) {
        term = term * 365;
        annuity = annuity * 365;
        equ2 = equ / 365;
      }

      param["tech_term"] = term.toFixed(2);
      param["tech_annuity"] = annuity.toFixed(2);
      param["tech_equ"] = equ.toFixed(4);
      param["tech_equ2"] = equ2.toFixed(4);
    } else {
      param["error"] = "Please! Check Your Input";
    }

    return param;
  }

  /**
   * getCalculationUnemploymentRateCalculator: Service Method
   * POST: /api/calculators-lol/unemployment-rate-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationUnemploymentRateCalculator(body) {
    let employed_people = parseFloat(body.tech_employed_people);
    let unemployed_people = parseFloat(body.tech_unemployed_people);
    let adult_population = body.tech_adult_population;
    let calculate = body.tech_calculate;
    let labor_force = parseFloat(body.tech_labor_force);
    let unemployment_rate = parseFloat(body.tech_unemployment_rate);

    let param = {};
    let method;

    if (calculate == "1") {
      method = 1;
      if (!isNaN(employed_people) && !isNaN(unemployed_people)) {
        let cal_labor_force = employed_people + unemployed_people;
        let cal_unemployed_people = (unemployed_people / cal_labor_force) * 100;
        param["tech_labor_force"] = cal_labor_force.toFixed(2);
        param["tech_unemployment_rate"] = cal_unemployed_people.toFixed(2);
      } else {
        param["error"] = "Please fill all fields.";
        return param;
      }
    } else if (calculate == "2") {
      method = 2;
      if (!isNaN(labor_force) && !isNaN(unemployment_rate)) {
        let percent = unemployment_rate / 100;
        let unemployment = labor_force * percent;
        let employment = labor_force - unemployment;
        param["tech_unemployment"] = unemployment.toFixed(2);
        param["tech_employment"] = employment.toFixed(2);
      } else {
        param["error"] = "Please fill all fields.";
        return param;
      }
    }

    if (adult_population !== "") {
      adult_population = parseFloat(adult_population);
      if (!isNaN(adult_population)) {
        let cal_labor_force = employed_people + unemployed_people;
        let labor_force_participation =
          (cal_labor_force / adult_population) * 100;
        param["tech_labor_force_participation"] =
          labor_force_participation.toFixed(2);
      } else {
        param["error"] = "Please fill all fields.";
        return param;
      }
    }

    param["tech_method"] = method;

    return param;
  }

  /**
   * getCalculationCostOfEquityCalculator: Service Method
   * POST: /api/calculators-lol/cost-of-equity-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationCostOfEquityCalculator(body) {
    let pay = body.tech_pay;
    let dividend_per_share = parseFloat(body.tech_dividend_per_share);
    let current_market_value = parseFloat(body.tech_current_market_value);
    let growth_rate_dividend = parseFloat(body.tech_growth_rate_dividend);
    let risk_rate_return = parseFloat(body.tech_risk_rate_return);
    let market_rate_return = parseFloat(body.tech_market_rate_return);
    let beta = parseFloat(body.tech_beta);

    let param = {};
    let final_answer;

    if (pay == "1") {
      if (
        !isNaN(dividend_per_share) &&
        !isNaN(current_market_value) &&
        !isNaN(growth_rate_dividend)
      ) {
        let ans =
          dividend_per_share / current_market_value +
          growth_rate_dividend / 100;
        final_answer = ans * 100;
      } else {
        param["error"] = "Please fill all fields.";
        return param;
      }
    } else if (pay == "2") {
      if (
        !isNaN(risk_rate_return) &&
        !isNaN(market_rate_return) &&
        !isNaN(beta)
      ) {
        final_answer =
          risk_rate_return + beta * (market_rate_return - risk_rate_return);
      } else {
        param["error"] = "Please fill all fields.";
        return param;
      }
    } else {
      param["error"] = "Invalid pay option.";
      return param;
    }

    param["tech_ans"] = final_answer.toFixed(2);
    param["tech_pay"] = pay;

    return param;
  }

  /**
   * getCalculationConsumerSurplusCalculator: Service Method
   * POST: /api/calculators-lol/consumer-surplus-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationConsumerSurplusCalculator(body) {
    let operations1 = body.tech_operations1;
    let operations2 = body.tech_operations2;
    let first = parseFloat(body.tech_first);
    let second = parseFloat(body.tech_second);
    let third = parseFloat(body.tech_third);
    let four = parseFloat(body.tech_four);
    let five = parseFloat(body.tech_five);

    let param = {};
    let answer1, answer2, pmax, ps, line1, line2;

    if (operations1 == "1") {
      if (!isNaN(first) && !isNaN(second) && !isNaN(third)) {
        answer1 = second - first;
        pmax = second;
        line1 = "Consumer Surplus";
        ps = answer1 + five;
      } else {
        param["error"] = "Please fill all fields.";
        return param;
      }
    } else if (operations1 == "2") {
      if (!isNaN(first) && !isNaN(second) && !isNaN(five)) {
        answer1 = second - first;
        pmax = second;
        ps = first + five;
        line1 = "Actual Price";
      } else {
        param["error"] = "Please fill all fields.";
        return param;
      }
    } else if (operations1 == "3") {
      if (!isNaN(first) && !isNaN(second) && !isNaN(five)) {
        answer1 = second + first;
        pmax = answer1;
        ps = first + five;
        line1 = "Willing Price";
      } else {
        param["error"] = "Please fill all fields.";
        return param;
      }
    } else {
      param["error"] = "Invalid operations1 option.";
      return param;
    }

    if (operations2 == "1") {
      if (!isNaN(third) && !isNaN(four)) {
        let mul1 = four * 0.5;
        answer2 = mul1 - pmax - third;
        line2 = "Extended Consumer Surplus";
      } else {
        param["error"] = "Please fill all fields.";
        return param;
      }
    } else if (operations2 == "2") {
      if (!isNaN(third) && !isNaN(four)) {
        let mul1 = 0.5 * four;
        answer2 = mul1 - pmax - third;
        line2 = "Equilibrium Price";
      } else {
        param["error"] = "Please fill all fields.";
        return param;
      }
    } else if (operations2 == "3") {
      if (!isNaN(third) && !isNaN(four)) {
        let div = four / 0.5;
        answer2 = div + pmax + third;
        line2 = "Equilibrium Quantity";
      } else {
        param["error"] = "Please fill all fields.";
        return param;
      }
    } else {
      param["error"] = "Invalid operations2 option.";
      return param;
    }

    param["tech_answer1"] = answer1.toFixed(2);
    param["tech_answer2"] = answer2.toFixed(2);
    param["tech_line1"] = line1;
    param["tech_ps"] = ps.toFixed(2);
    param["tech_line2"] = line2;
    param["tech_operations1"] = operations1;
    param["tech_operations2"] = operations2;
    return param;
  }

  /**
   * getCalculationStockCalculator: Service Method
   * POST: /api/calculators-lol/stock-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationStockCalculator(body) {
    let first = body.tech_first;
    let second = body.tech_second;
    let third = body.tech_third;
    let t_unit = body.tech_t_unit;
    let four = body.tech_four;
    let five = body.tech_five;
    let f_unit = body.tech_f_unit;
    let cgt = body.tech_cgt;
    let mycurrency = body.tech_mycurrency;

    let param = {};

    if (t_unit === "%") {
      t_unit = 1;
    } else {
      t_unit = 0.01;
    }

    if (f_unit === "%") {
      f_unit = 1;
    } else {
      f_unit = 0.01;
    }
    // if (t_unit === '%') {
    //     t_unit = 1;
    // } else if (t_unit === mycurrency) {
    //     t_unit = 0.01;
    // }

    // if (f_unit === '%') {
    //     f_unit = 1;
    // } else if (f_unit === mycurrency) {
    //     f_unit = 0.01;
    // }

    third = third * t_unit;
    five = five * f_unit;

    if (
      !isNaN(first) &&
      !isNaN(second) &&
      !isNaN(third) &&
      !isNaN(four) &&
      !isNaN(five) &&
      !isNaN(cgt)
    ) {
      if (cgt > 0) {
        let div1 = first / 100;
        let mul1 = second * third;
        let b_c = 0;

        if (t_unit === 1) {
          b_c = div1 * mul1;
        } else if (t_unit === 0.01) {
          b_c = third * 100;
        }

        let net_by = second * first;
        let netby_ans = net_by + b_c;

        let mul2 = four * five;
        let s_c = 0;

        if (f_unit === 1) {
          s_c = div1 * mul2;
        } else if (f_unit === 0.01) {
          s_c = five * 100;
        }

        let net_sa = four * first;
        let netsa_ans = net_sa - s_c;

        let profit = netsa_ans - netby_ans;
        let pro_per = profit / cgt;
        let pro_ans = profit - pro_per;

        let roi = profit / netby_ans;
        let roi_ans = roi * 100;
        let roi_ans1 = roi_ans / cgt;
        let roi_answer = roi_ans - roi_ans1;

        let per = five / 100;
        let minus_per = 1 - per;
        let mul_no = first * minus_per;
        let break_ans = netby_ans / mul_no;

        param.tech_b_c = b_c;
        param.tech_netby_ans = netby_ans;
        param.tech_s_c = s_c;
        param.tech_netsa_ans = netsa_ans;
        param.tech_profit = pro_ans;
        param.tech_roi_ans = roi_answer;
        param.tech_break_ans = break_ans;
      } else {
        param.error = "CGT Rate cannot be negative.";
      }
    } else {
      param.error = "Please fill all fields.";
    }

    return param;
  }

  /**
   * getCalculationPayRaiseCalculator: Service Method
   * POST: /api/calculators-lol/pay-raise-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationPayRaiseCalculator(body) {
    let pay = body.tech_pay;
    let period = body.tech_period;
    let hour = body.tech_hour;
    let type = body.tech_type;
    let newAmount = body.tech_new;

    let param = {};

    if (!isNaN(pay) && !isNaN(hour) && !isNaN(newAmount)) {
      let hourly,
        weekly,
        monthly,
        yearly,
        incHour,
        incWeek,
        incMonth,
        incYear,
        percent;

      if (period == 1) {
        hourly = pay;
        weekly = pay * hour;
        monthly = Math.round(weekly * 4.3333 * 1000) / 1000;
        yearly = weekly * 52;
      } else if (period == 2) {
        hourly = pay / hour;
        weekly = pay;
        monthly = Math.round(weekly * 4.3333 * 1000) / 1000;
        yearly = weekly * 52;
      } else if (period == 3) {
        monthly = pay;
        yearly = monthly * 12;
        weekly = Math.round(((monthly * 12) / 52) * 1000) / 1000;
        hourly = weekly / hour;
      } else if (period == 4) {
        yearly = pay;
        monthly = yearly / 12;
        weekly = Math.round(((monthly * 12) / 52) * 1000) / 1000;
        hourly = weekly / hour;
      }

      if (type == 1) {
        incHour = hourly * (newAmount / 100);
        incWeek = weekly * (newAmount / 100);
        incMonth = monthly * (newAmount / 100);
        incYear = yearly * (newAmount / 100);
        percent = newAmount;
      } else {
        if (period == 1) {
          percent = (newAmount / hourly) * 100;
        } else if (period == 2) {
          percent = (newAmount / weekly) * 100;
        } else if (period == 3) {
          percent = (newAmount / monthly) * 100;
        } else if (period == 4) {
          percent = (newAmount / yearly) * 100;
        }
        incHour = hourly * (percent / 100);
        incWeek = weekly * (percent / 100);
        incMonth = monthly * (percent / 100);
        incYear = yearly * (percent / 100);
      }

      param.tech_percent = Math.round(percent * 100) / 100;
      param.tech_incHour = Math.round(incHour * 1000) / 1000;
      param.tech_incWeek = Math.round(incWeek * 1000) / 1000;
      param.tech_incMonth = Math.round(incMonth * 1000) / 1000;
      param.tech_incYear = Math.round(incYear * 1000) / 1000;
      param.tech_hourly = Math.round(hourly * 1000) / 1000;
      param.tech_weekly = Math.round(weekly * 1000) / 1000;
      param.tech_monthly = Math.round(monthly * 1000) / 1000;
      param.tech_yearly = Math.round(yearly * 1000) / 1000;
      param.tech_type = type;
      return param;
    } else {
      param.error = "Please fill all fields.";
      return param;
    }
  }

  /**
   * getCalculationRoasCalculator: Service Method
   * POST: /api/calculators-lol/roas-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationRoasCalculator(body) {
    let first = body.tech_first;
    let hidden_currency = body.tech_hidden_currency;
    let operations1 = body.tech_operations1;
    let second = body.tech_second;
    let third = body.tech_third;

    let param = {};

    if (operations1 == 1) {
      if (!isNaN(first) && !isNaN(second)) {
        let divide1 = second / first;
        let answer1 = divide1 * 100;
        let line = "";

        if (!isNaN(third)) {
          let answer2 = third - first;
          param.tech_answer2 = answer2;
        }

        if (answer1 > 0 && answer1 < 400) {
          line = `❌ Danger! Your ROAS is ${answer1.toFixed(
            2
          )}% that is alarming. If return is less than 400% ROAS, you are in loss. So you actually spend more on ad campaign.`;
        } else if (answer1 >= 400 && answer1 < 800) {
          line = `🚫 Your ROAS is ${answer1.toFixed(
            2
          )}% that is fair enough. But you must target 800% and spend more than before in ads.`;
        } else if (answer1 >= 800) {
          line = `✔ Great! Your ROAS is ${answer1.toFixed(
            2
          )}% that is fairly good enough.`;
        }

        param.tech_answer1 = answer1;
        param.tech_line = line;
        param.tech_first = first;
        param.tech_second = second;
        param.tech_operations1 = operations1;
        return param;
      } else {
        param.error = "Please fill all fields.";
        return param;
      }
    } else if (operations1 == 2) {
      if (!isNaN(first)) {
        if (first > 0) {
          let answer1 = first * 8;
          let answer2 = answer1 * 10;
          let line = `✅ Aim for ${hidden_currency} ${answer1} as climbing 800% ROAS will let you earn good initiatives.`;

          param.tech_answer1 = answer1;
          param.tech_answer2 = answer2;
          param.tech_line = line;
          param.tech_first = first;
          param.tech_second = second;
          param.tech_operations1 = operations1;
          return param;
        } else {
          param.error = "Money spent on ads cannot be negative or zero";
          return param;
        }
      } else {
        param.error = "Please fill all fields.";
        return param;
      }
    } else {
      param.error = "Invalid operation selected.";
      return param;
    }
  }

  /**
   * getCalculationMPCCalculator: Service Method
   * POST: /api/calculators-lol/mpc-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationMPCCalculator(body) {
    const param = {};
    const income = Number(body.tech_income);
    const save = Number(body.tech_save);

    function setVeri(inss, sv) {
      return isFinite(inss) && isFinite(sv);
    }

    function getAns(income, save) {
      if (income === 0) {
        throw new Error("Division by zero.");
      }
      return save / income;
    }

    try {
      if (setVeri(income, save)) {
        const ans = getAns(income, save);
        param.tech_ans = parseFloat(ans.toFixed(4));
        return param;
      } else {
        param.error = "Please! Check Your Input";
        return param;
      }
    } catch (e) {
      param.error = "Please! Check Your Input";
      return param;
    }
  }

  /**
   * getCalculationTurboCalculator: Service Method
   * POST: /api/calculators-lol/turo-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationTurboCalculator(body) {
    let type = body.tech_type;
    let operations = body.tech_operations;
    let first = body.tech_first;
    let second = body.tech_second;
    let third = body.tech_third;
    let four = body.tech_four;
    let f_first = body.tech_f_first;
    let f_second = body.tech_f_second;
    let f_third = body.tech_f_third;

    let param = {};

    if (type === "first") {
      if (!isNaN(f_first) && !isNaN(f_second) && !isNaN(f_third)) {
        let multiply = f_third * f_second;
        let answer = multiply - f_first;
        let heading = "Turo Profit";

        param.tech_answer = answer;
        param.tech_heading = heading;
        param.tech_type = type;
        return param;
      } else {
        param.error = "Please fill all fields.";
        param.tech_type = type;
        return param;
      }
    } else if (type === "second") {
      if (operations === "1") {
        if (!isNaN(first) && !isNaN(second)) {
          let answer = first * second;
          let heading = "Income";

          param.tech_answer = answer;
          param.tech_heading = heading;
          param.tech_type = type;
          param.tech_operations = operations;
          return param;
        } else {
          param.error = "Please fill all fields.";
          param.tech_type = type;
          param.tech_operations = operations;
          return param;
        }
      } else if (operations === "2") {
        if (!isNaN(first) && !isNaN(second) && !isNaN(third)) {
          let divide = first / third;
          let answer = divide + second;
          answer = parseFloat(answer.toFixed(2));
          let heading = "Lease Details";

          param.tech_answer = answer;
          param.tech_heading = heading;
          param.tech_type = type;
          param.tech_operations = operations;
          return param;
        } else {
          param.error = "Please fill all fields.";
          param.tech_type = type;
          param.tech_operations = operations;
          return param;
        }
      } else if (operations === "3") {
        if (!isNaN(first) && !isNaN(second) && !isNaN(third) && !isNaN(four)) {
          let answer = first + second + 50 + four;
          let heading = "Expenses";

          param.tech_answer = answer;
          param.tech_heading = heading;
          param.tech_type = type;
          param.tech_operations = operations;
          return param;
        } else {
          param.error = "Please fill all fields.";
          return param;
        }
      }
    }

    param.error = "Invalid operation or type.";
    return param;
  }

  /**
   * getCalculationAGICalculator: Service Method
   * POST: /api/calculators-lol/agi-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationAGICalculator(body) {
    // Collect and parse all 24 inputs
    const inputs = [];
    for (let i = 1; i <= 24; i++) {
      const key = `tech_input${i}`;
      const value = Number(body[key]);
      if (!isFinite(value)) {
        return {
          error: "Please! Check Your Input",
        };
      }
      inputs.push(value);
    }

    // Calculate add1 (sum of input1 to input13)
    const tech_add1 = inputs.slice(0, 13).reduce((sum, val) => sum + val, 0);
    // Calculate add2 (sum of input14 to input24)
    const tech_add2 = inputs.slice(13).reduce((sum, val) => sum + val, 0);
    // Subtract
    const tech_minus = tech_add1 - tech_add2;

    return {
      tech_add1,
      tech_add2,
      tech_minus,
    };
  }

  /**
   * getCalculationMarkdownCalculator: Service Method
   * POST: /api/calculators-lol/markdown-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationMarkdownCalculator(body) {
    const tech_osp = Number(body.tech_osp); // Original Selling Price
    const tech_asp = Number(body.tech_asp); // Actual Selling Price

    if (
      isFinite(tech_osp) &&
      isFinite(tech_asp) &&
      tech_osp > 0 &&
      tech_asp > 0
    ) {
      if (tech_asp < tech_osp) {
        const tech_markdown = tech_osp - tech_asp;
        const tech_markdown_percent = (tech_markdown / tech_asp) * 100;

        return {
          tech_markdown,
          tech_markdown_percent: parseFloat(tech_markdown_percent.toFixed(2)),
        };
      } else {
        return {
          error: "Original Selling Price > Actual Selling Price",
        };
      }
    } else {
      return {
        error: "Please! Check Your Input",
      };
    }
  }

  /**
   * getCalculationCommissionCalculator: Service Method
   * POST: /api/calculators-lol/commission-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationCommissionCalculator(body) {
    let find = body.tech_find;
    let select1 = body.tech_select1;
    let sale_price = body.tech_sale_price;
    let commission_rate = body.tech_commission_rate;
    let commission_amount = body.tech_commission_amount;

    let param = {};

    if (find === "1" || find === "2") {
      let method = 1;

      if (select1 === "commission") {
        if (
          !isNaN(sale_price) &&
          !isNaN(commission_rate) &&
          sale_price > 0 &&
          commission_rate > 0
        ) {
          let answer = (sale_price * commission_rate) / 100;
          param.tech_sale_price = sale_price;
          param.tech_commission_rate = commission_rate;
          param.tech_answer = answer;
          param.tech_method = method;
          return param;
        } else {
          param.error = "Please fill all fields.";
          return param;
        }
      } else if (select1 === "sale_price") {
        method = 2;
        if (
          !isNaN(commission_rate) &&
          !isNaN(commission_amount) &&
          commission_rate > 0 &&
          commission_amount > 0
        ) {
          let answer = (commission_amount / commission_rate) * 100;
          param.tech_commission_rate = commission_rate;
          param.tech_commission_amount = commission_amount;
          param.tech_answer = answer;
          param.tech_method = method;
          return param;
        } else {
          param.error = "Please fill all fields.";
          return param;
        }
      } else if (select1 === "commission_rate") {
        method = 3;
        if (
          !isNaN(sale_price) &&
          !isNaN(commission_amount) &&
          sale_price > 0 &&
          commission_amount > 0
        ) {
          let answer = (commission_amount / sale_price) * 100;
          param.tech_sale_price = sale_price;
          param.tech_commission_amount = commission_amount;
          param.tech_answer = answer;
          param.tech_method = method;
          return param;
        } else {
          param.error = "Please fill all fields.";
          return param;
        }
      }
    }

    param.error = "Invalid calculation method or missing fields.";
    return param;
  }

  /**
   * getCalculationDividendYieldCalculator: Service Method
   * POST: /api/calculators-lol/dividend-yield-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationDividendYieldCalculator(body) {
    const tech_first = Number(body.tech_first); // Dividends per period
    const tech_operations = String(body.tech_operations); // 1=Annual, 2=Semi-Annual, 3=Quarterly, 4=Monthly
    const tech_second = Number(body.tech_second); // Share price

    if (isFinite(tech_first) && isFinite(tech_second)) {
      if (tech_first < 0) {
        return { error: "Dividends per period should not be negative." };
      }

      if (tech_second < 0) {
        return { error: "Share price should not be negative." };
      }

      let tech_annual_div = 0;

      switch (tech_operations) {
        case "1":
          tech_annual_div = tech_first;
          break;
        case "2":
          tech_annual_div = tech_first * 2;
          break;
        case "3":
          tech_annual_div = tech_first * 4;
          break;
        case "4":
          tech_annual_div = tech_first * 12;
          break;
        default:
          return { error: "Invalid operation type. Use 1, 2, 3, or 4." };
      }

      const tech_divide = tech_annual_div / tech_second;
      const tech_dividend_yield = tech_divide * 100;

      return {
        tech_annual_div,
        tech_dividend_yield,
      };
    } else {
      return { error: "Please! Check Your Input" };
    }
  }

  /**
   * getCalculationGrossIncomeCalculator: Service Method
   * POST: /api/calculators-lol/gross-income-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationGrossIncomeCalculator(body) {
    const pay_frequency = body.tech_pay_frequency;
    const type = body.tech_type;
    const pay_method = body.tech_pay_method;
    const amount = parseFloat(body.tech_amount);
    const filer_status = body.tech_filer_status;

    const param = {};

    if (pay_frequency && type && filer_status && pay_method && !isNaN(amount)) {
      let total_amount;

      // ====== STEP 1: Calculate total yearly amount ======
      if (type === "Bonus") {
        total_amount = amount;
      } else {
        if (pay_method === "Per-Year") {
          total_amount = amount;
        } else {
          if (pay_frequency === "Daily") {
            total_amount = amount * (365 - 104);
          } else if (pay_frequency === "Weekly") {
            total_amount = amount * 52;
          } else if (pay_frequency === "Bi-Weekly") {
            total_amount = amount * 26;
          } else if (pay_frequency === "Semi-Monthly") {
            total_amount = amount * 24;
          } else if (pay_frequency === "Monthly") {
            total_amount = amount * 12;
          } else if (pay_frequency === "Quarterly") {
            total_amount = amount * 4;
          } else {
            total_amount = amount;
          }
        }
      }

      // ====== STEP 2: Per-frequency amount ======
      let per_frequency;
      if (pay_frequency === "Daily") {
        per_frequency = Math.round((total_amount / (365 - 104)) * 100) / 100;
      } else if (pay_frequency === "Weekly") {
        per_frequency = Math.round((total_amount / 52) * 100) / 100;
      } else if (pay_frequency === "Bi-Weekly") {
        per_frequency = Math.round((total_amount / 26) * 100) / 100;
      } else if (pay_frequency === "Semi-Monthly") {
        per_frequency = Math.round((total_amount / 24) * 100) / 100;
      } else if (pay_frequency === "Monthly") {
        per_frequency = Math.round((total_amount / 12) * 100) / 100;
      } else if (pay_frequency === "Quarterly") {
        per_frequency = Math.round((total_amount / 4) * 100) / 100;
      } else {
        per_frequency = total_amount;
      }

      // ====== STEP 3: Security & Medicare deductions ======
      const secrity_per = 6.2;
      const medicare_per = 1.45;
      const secrity_amount_frequency = per_frequency * 0.062;
      const secrity_amount_yearly = total_amount * 0.062;
      const medicare_amount_frequency = per_frequency * 0.0145;
      const medicare_amount_yearly = total_amount * 0.0145;

      // ====== STEP 4: Tax brackets ======
      let tax_per = 0;
      let tax_amount_frequency = 0;
      let net_frequency_amount = 0;
      let tax_amount_yearly = 0;
      let yearly_net_income = 0;

      function setTax(percent) {
        tax_per = percent;
        tax_amount_frequency = per_frequency * (percent / 100);
        net_frequency_amount =
          Math.round(
            (per_frequency -
              tax_amount_frequency -
              secrity_amount_frequency -
              medicare_amount_frequency) *
              100
          ) / 100;
        tax_amount_yearly = total_amount * (percent / 100);
        yearly_net_income =
          Math.round(
            (total_amount -
              tax_amount_yearly -
              secrity_amount_yearly -
              medicare_amount_yearly) *
              100
          ) / 100;
      }

      // ====== STEP 5: Apply tax based on filer status ======
      if (filer_status === "single") {
        if (total_amount <= 10275) setTax(10);
        else if (total_amount <= 41775) setTax(12);
        else if (total_amount <= 89075) setTax(22);
        else if (total_amount <= 170050) setTax(24);
        else if (total_amount <= 215950) setTax(32);
        else if (total_amount <= 539900) setTax(35);
        else setTax(37);
      } else if (filer_status === "married-jointly") {
        if (total_amount <= 20550) setTax(10);
        else if (total_amount <= 83550) setTax(12);
        else if (total_amount <= 178150) setTax(22);
        else if (total_amount <= 340100) setTax(24);
        else if (total_amount <= 431900) setTax(32);
        else if (total_amount <= 647850) setTax(35);
        else setTax(37);
      } else if (filer_status === "married-separately") {
        if (total_amount <= 10275) setTax(10);
        else if (total_amount <= 41775) setTax(12);
        else if (total_amount <= 89075) setTax(22);
        else if (total_amount <= 170050) setTax(24);
        else if (total_amount <= 215950) setTax(32);
        else if (total_amount <= 323925) setTax(35);
        else setTax(37);
      } else if (filer_status === "head") {
        if (total_amount <= 14650) setTax(10);
        else if (total_amount <= 55900) setTax(12);
        else if (total_amount <= 89050) setTax(22);
        else if (total_amount <= 170050) setTax(24);
        else if (total_amount <= 215950) setTax(32);
        else if (total_amount <= 539900) setTax(35);
        else setTax(37);
      }

      // ====== STEP 6: Percent summaries ======
      const net_income_per = (yearly_net_income * 100) / total_amount;
      const net_tax_per =
        ((secrity_amount_yearly + medicare_amount_yearly + tax_amount_yearly) *
          100) /
        total_amount;

      // ====== STEP 7: Prepare result ======
      param.tech_total_amount =
        Math.round(total_amount).toLocaleString("en-US");
      param.tech_yearly_net_income =
        Math.round(yearly_net_income).toLocaleString("en-US");
      param.tech_secrity_amount_yearly = Math.round(
        secrity_amount_yearly
      ).toLocaleString("en-US");
      param.tech_medicare_amount_yearly = Math.round(
        medicare_amount_yearly
      ).toLocaleString("en-US");
      param.tech_tax_amount_yearly =
        Math.round(tax_amount_yearly).toLocaleString("en-US");
      param.tech_secrity_per = secrity_per;
      param.tech_medicare_per = medicare_per;
      param.tech_tax_per = tax_per;
      param.tech_per_frequency =
        Math.round(per_frequency).toLocaleString("en-US");
      param.tech_net_frequency_amount =
        Math.round(net_frequency_amount).toLocaleString("en-US");
      param.tech_tax_amount_frequency =
        Math.round(tax_amount_frequency).toLocaleString("en-US");
      param.tech_secrity_amount_frequency = Math.round(
        secrity_amount_frequency
      ).toLocaleString("en-US");
      param.tech_medicare_amount_frequency = Math.round(
        medicare_amount_frequency
      ).toLocaleString("en-US");
      param.tech_net_income_per = net_income_per;
      param.tech_net_tax_per = net_tax_per;
      param.tech_pay_frequency = pay_frequency;
      param.tech_filer_status = filer_status;
      param.tech_type = type;
      return param;
    } else {
      return { error: "Please fill all fields." };
    }
  }

  /**
   * getCalculationOptionProfitCalculator: Service Method
   * POST: /api/calculators-lol/options-profit-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationOptionProfitCalculator(body) {
    const tech_ot = String(body.tech_ot).trim().toLowerCase();
    const tech_sp = Number(body.tech_sp);
    const tech_op = Number(body.tech_op);
    const tech_stp = Number(body.tech_stp);
    const tech_nc = Number(body.tech_nc);

    if (
      tech_ot &&
      isFinite(tech_sp) &&
      isFinite(tech_op) &&
      isFinite(tech_stp) &&
      isFinite(tech_nc) &&
      tech_sp >= 0 &&
      tech_op >= 0 &&
      tech_stp >= 0 &&
      tech_nc >= 0
    ) {
      const tech_ec = tech_nc * 100;
      let tech_ans;

      if (tech_ot === "c") {
        tech_ans = (tech_sp - tech_stp - tech_op) * tech_ec;
      } else if (tech_ot === "p") {
        tech_ans = (tech_stp - (tech_sp + tech_op)) * tech_ec;
      } else {
        return {
          error: 'Invalid option type. Use "c" for call or "p" for put.',
        };
      }

      return {
        tech_ans,
        tech_ot,
        tech_sp,
        tech_op,
        tech_stp,
        tech_nc,
        tech_ec,
      };
    } else {
      return {
        error: "Please! Check Your Input",
      };
    }
  }

  /**
   * getCalculationTimeAndaHalfCalculator: Service Method
   * POST: /api/calculators-lol/time-and-a-half
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationTimeAndaHalfCalculator(body) {
    let currency = body.tech_currency.trim();
    let normal_pay = parseFloat(body.tech_normal_pay.trim());
    let normal_time = parseFloat(body.tech_normal_time.trim());
    let over_time = parseFloat(body.tech_over_time.trim());
    let multiplier = parseFloat(body.tech_multiplier.trim());
    let pay_period = parseInt(body.tech_pay_period.trim(), 10);

    let param = {};

    if (
      !isNaN(normal_pay) &&
      !isNaN(normal_time) &&
      !isNaN(over_time) &&
      !isNaN(pay_period)
    ) {
      if (
        normal_pay >= 0 &&
        normal_time >= 0 &&
        over_time >= 0 &&
        pay_period >= 0
      ) {
        let half,
          half_pay,
          Overtime_Pay_per_Year,
          standered_pay,
          total,
          Regular_Pay_per_Year,
          Total_Pay_per_Year;

        if (
          (over_time === "" && normal_pay === 0) ||
          (over_time === 0 && normal_pay === 0)
        ) {
          half = "";
          half_pay = 0;
          Overtime_Pay_per_Year = 0;
          normal_pay = 0;
          normal_time = 0;
        } else if (over_time === 0 || over_time === "") {
          half = normal_pay * multiplier;
          half_pay = 0;
          Overtime_Pay_per_Year = 0;
        } else {
          half = normal_pay * multiplier;
          half_pay = normal_pay * multiplier * over_time;
          Overtime_Pay_per_Year = half_pay * pay_period;
        }

        if (normal_pay === 0 && normal_time === 0) {
          standered_pay = 0;
          total = "";
          Regular_Pay_per_Year = 0;
          Total_Pay_per_Year = 0;
        } else {
          standered_pay = normal_pay * normal_time;
          total = standered_pay + half_pay;
          Regular_Pay_per_Year = standered_pay * pay_period;
          Total_Pay_per_Year = total * pay_period;
        }

        param.tech_currency = currency;
        param.tech_normal_pay = normal_pay;
        param.tech_half = half;
        param.tech_half_pay = half_pay;
        param.tech_Overtime_Pay_per_Year = Overtime_Pay_per_Year;
        param.tech_standed_pay = standered_pay;
        param.tech_total = total;
        param.tech_Regular_Pay_per_Year = Regular_Pay_per_Year;
        param.tech_Total_Pay_per_Year = Total_Pay_per_Year;
        param.tech_multiplier = multiplier;
        param.tech_over_time = over_time;
        param.tech_normal_time = normal_time;

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
   * getCalculationVariableCostCalculator: Service Method
   * POST: /api/calculators-lol/variable-cost-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationVariableCostCalculator(body) {
    let type = body.tech_type;
    let cost = parseFloat(body.tech_cost.trim());
    let output = parseFloat(body.tech_output.trim());

    let param = {};

    if (type && (type === "average_cost" || type === "variable_cost")) {
      if (isNaN(cost) || isNaN(output)) {
        param.error = "Please fill all fields.";
        return param;
      }

      if (type === "average_cost") {
        let av_cost = cost / output;
        param.tech_cost = cost;
        param.tech_output = output;
        param.tech_av_cost = av_cost;
      } else if (type === "variable_cost") {
        let v_cost = cost - output;
        param.tech_cost = cost;
        param.tech_output = output;
        param.tech_v_cost = v_cost;
      }
    } else {
      param.error = "Please fill all fields.";
      return param;
    }

    param.tech_type = type;
    return param;
  }

  /**
   * getCalculationGrowthRateCalculator: Service Method
   * POST: /api/calculators-lol/growth-rate-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationGrowthRateCalculator(body) {
    let operation = body.tech_operation.trim();
    let present_val = parseFloat(body.tech_present_val.trim());
    let past_val = parseFloat(body.tech_past_val.trim());
    let time_val = parseFloat(body.tech_time_val.trim());

    let param = {};

    if (operation === "1") {
      if (isNaN(present_val) || isNaN(past_val)) {
        param.error = "Please! Check Your Input";
        param.tech_operation = operation;
        return param;
      }

      let growth_diff = present_val - past_val;
      let growth_val = growth_diff / past_val;
      let growth_percent = growth_val * 100;
      param.tech_growth_diff = growth_diff;
      param.tech_growth_val = growth_val;
      param.tech_growth_percent = growth_percent;
    } else if (operation === "2") {
      if (isNaN(present_val) || isNaN(past_val) || isNaN(time_val)) {
        param.error = "Please! Check Your Input";
        param.tech_operation = operation;
        return param;
      }

      let growth_sub = present_val / past_val;
      let time_p = 1 / time_val;
      let g_val = Math.pow(growth_sub, time_p);
      let growth_val = g_val - 1;
      let growth_percent = growth_val * 100;
      param.tech_growth_sub = growth_sub;
      param.tech_g_val = g_val;
      param.tech_growth_val = growth_val;
      param.tech_growth_percent = growth_percent;
    } else {
      param.error = "Invalid operation";
      return param;
    }

    param.tech_present_val = present_val;
    param.tech_past_val = past_val;
    param.tech_time_val = time_val;
    param.tech_operation = operation;
    return param;
  }

  /**
   * getCalculationLaborCostCalculator: Service Method
   * POST: /api/calculators-lol/labor-cost-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationLaborCostCalculator(body) {
    let h_p_w = parseFloat(body.tech_h_p_w);
    let p_r = parseFloat(body.tech_p_r);
    let a_d_p_y = parseFloat(body.tech_a_d_p_y);
    let tax = parseFloat(body.tech_tax);
    let insurance = parseFloat(body.tech_insurance);
    let benefits = parseFloat(body.tech_benefits);
    let overtime = parseFloat(body.tech_overtime);
    let supplies = parseFloat(body.tech_supplies);
    let total_revenue = parseFloat(body.tech_total_revenue);

    let param = {};

    if (
      !isNaN(h_p_w) &&
      !isNaN(p_r) &&
      !isNaN(a_d_p_y) &&
      !isNaN(tax) &&
      !isNaN(insurance) &&
      !isNaN(benefits) &&
      !isNaN(overtime) &&
      !isNaN(supplies) &&
      !isNaN(total_revenue)
    ) {
      let g_h_per_year = h_p_w * 52;
      let gross_pay = g_h_per_year * p_r;
      let n_w_p_year = a_d_p_y * 8;
      let net_h_work = g_h_per_year - n_w_p_year;
      let annual_cost = tax + insurance + benefits + overtime + supplies;
      let annual_p_labor_cost = gross_pay + annual_cost;
      let h_l_cost = annual_p_labor_cost / net_h_work;
      let l_c_percentge = annual_p_labor_cost / total_revenue;

      param.tech_annual_p_labor_cost = annual_p_labor_cost;
      param.tech_h_l_cost = h_l_cost;
      param.tech_g_h_per_year = g_h_per_year;
      param.tech_gross_pay = gross_pay;
      param.tech_n_w_p_year = n_w_p_year;
      param.tech_net_h_work = net_h_work;
      param.tech_annual_cost = annual_cost;
      param.tech_l_c_percentge = l_c_percentge;
    } else {
      param.error = "Please fill all fields.";
      return param;
    }

    param.tech_h_p_w = h_p_w;
    param.tech_p_r = p_r;
    param.tech_a_d_p_y = a_d_p_y;
    param.tech_tax = tax;
    param.tech_insurance = insurance;
    param.tech_benefits = benefits;
    param.tech_overtime = overtime;
    param.tech_supplies = supplies;
    param.tech_total_revenue = total_revenue;

    return param;
  }

  /**
   * getCalculationEarningPerShareCalculator: Service Method
   * POST: /api/calculators-lol/earnings-per-share-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationEarningPerShareCalculator(body) {
    const tech_net_income = Number(body.tech_net_income);
    const tech_dividends = Number(body.tech_dividends);
    const tech_common_shares = Number(body.tech_common_shares);

    if (
      isFinite(tech_net_income) &&
      isFinite(tech_dividends) &&
      isFinite(tech_common_shares)
    ) {
      if (tech_common_shares <= 0) {
        return {
          error: "Number of common shares should be an integer greater than 0.",
        };
      }

      const share_income = tech_net_income - tech_dividends;
      const tech_share_dividends = share_income / tech_common_shares;

      return {
        tech_share_dividends,
        tech_net_income,
        tech_dividends,
        tech_common_shares,
      };
    } else {
      return {
        error: "Please! Check Your Input",
      };
    }
  }
  /**
   * getCalculationBetaCalculator: Service Method
   * POST: /api/calculators-lol/beta-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationBetaCalculator(body) {
    let rs = body.tech_rs;
    let rm = body.tech_rm;

    // Function to calculate significant figures
    function sigFig(value, digits) {
      if (value !== "") {
        let decimalPlaces;
        if (value === 0) {
          decimalPlaces = digits - 1;
        } else if (value < 0) {
          decimalPlaces = digits - Math.floor(Math.log10(Math.abs(value))) - 1;
        } else {
          decimalPlaces = digits - Math.floor(Math.log10(value)) - 1;
        }
        let answer = Number(value.toFixed(decimalPlaces));
        return answer;
      }
    }

    let param = {};

    if (!rs || !rm) {
      param.error = "Please! Check Your Input.";
      return param;
    }

    // Convert comma-separated string to an array of numbers
    rs = rs.split(",").map((value) => parseFloat(value.trim()));
    rm = rm.split(",").map((value) => parseFloat(value.trim()));

    const n = rs.length;

    if (n !== rm.length) {
      param.error = "The number of values should be same in both inputs.";
      return param;
    }

    let check = true;

    // Check if all values are numeric
    for (let i = 0; i < n; i++) {
      if (isNaN(rs[i]) || isNaN(rm[i])) {
        check = false;
        break;
      }
    }

    if (check) {
      let xy_sum = 0;
      let xi2 = [];
      let yi2 = [];

      // Calculate necessary sums
      for (let i = 0; i < n; i++) {
        xi2.push(Math.pow(rm[i], 2));
        yi2.push(Math.pow(rs[i], 2));
        xy_sum += rm[i] * rs[i];
      }

      const rs_sum = rs.reduce((acc, val) => acc + val, 0);
      const rm_sum = rm.reduce((acc, val) => acc + val, 0);
      const xi2_sum = xi2.reduce((acc, val) => acc + val, 0);
      const yi2_sum = yi2.reduce((acc, val) => acc + val, 0);

      const ss_xx = xi2_sum - Math.pow(rm_sum, 2) / n;
      const ss_yy = yi2_sum - Math.pow(rs_sum, 2) / n;
      const ss_xy = xy_sum - (rm_sum * rs_sum) / n;
      const beta_1 = ss_xy / ss_xx;

      param.tech_n = n;
      param.tech_rs = rs;
      param.tech_rm = rm;
      param.tech_rs_sum = rs_sum;
      param.tech_rm_sum = rm_sum;
      param.tech_xi2 = xi2;
      param.tech_yi2 = yi2;
      param.tech_xi2_sum = xi2_sum;
      param.tech_yi2_sum = yi2_sum;
      param.tech_xy_sum = xy_sum;
      param.tech_ss_xx = ss_xx;
      param.tech_ss_yy = ss_yy;
      param.tech_ss_xy = ss_xy;
      param.tech_beta_1 = sigFig(beta_1, 4);
    } else {
      param.error = "Please! Check Your Input";
    }

    return param;
  }

  /**
   * getCalculationCashBackCalculator: Service Method
   * POST: /api/calculators-lol/cash-back-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationCashBackCalculator(body) {
    const tech_purchase = Number(body.tech_purchase);
    const tech_cash = Number(body.tech_cash);

    if (isFinite(tech_purchase) && isFinite(tech_cash)) {
      const tech_answer = tech_purchase * (tech_cash / 100);
      return {
        tech_answer,
        tech_purchase,
        tech_cash,
      };
    } else {
      return {
        error: "Please! Check Your Input.",
      };
    }
  }

  /**
   * getCalculationMarginalRevenueCalculator: Service Method
   * POST: /api/calculators-lol/marginal-revenue-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationMarginalRevenueCalculator(body) {
    const tech_initial_re = Number(body.tech_initial_re);
    const tech_initial_qu = Number(body.tech_initial_qu);
    const tech_final_re = Number(body.tech_final_re);
    const tech_final_qu = Number(body.tech_final_qu);

    if (
      isFinite(tech_initial_re) &&
      isFinite(tech_initial_qu) &&
      isFinite(tech_final_re) &&
      isFinite(tech_final_qu)
    ) {
      const tech_total_rev = tech_final_re - tech_initial_re;
      const tech_quantity = tech_final_qu - tech_initial_qu;

      // Avoid division by zero
      if (tech_quantity === 0) {
        return {
          error: "Quantity change cannot be zero.",
        };
      }

      const tech_marginal_rev = tech_total_rev / tech_quantity;

      return {
        tech_total_rev,
        tech_quantity,
        tech_marginal_rev,
      };
    } else {
      return {
        error: "Please! Check Your Input.",
      };
    }
  }

  /**
   * getCalculationReverSaleTaxCalculator: Service Method
   * POST: /api/calculators-lol/reverse-sales-tax-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationReverSaleTaxCalculator(body) {
    const tech_final = Number(body.tech_final);
    const tech_sale = Number(body.tech_sale);

    if (isFinite(tech_final) && isFinite(tech_sale)) {
      const tech_sales = tech_sale / 100;
      const tech_reverse = tech_final / (1 + tech_sales);

      return {
        tech_reverse,
        tech_final,
        tech_sale,
      };
    } else {
      return {
        error: "Please! Check Your Input.",
      };
    }
  }

  /**
   * getCalculationDeadWeightLossCalculator: Service Method
   * POST: /api/calculators-lol/deadweight-loss-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationDeadWeightLossCalculator(body) {
    const tech_original_price = Number(body.tech_original_price);
    const tech_new_price = Number(body.tech_new_price);
    const tech_original_quantity = Number(body.tech_original_quantity);
    const tech_new_quantity = Number(body.tech_new_quantity);

    if (
      isFinite(tech_original_price) &&
      isFinite(tech_new_price) &&
      isFinite(tech_original_quantity) &&
      isFinite(tech_new_quantity)
    ) {
      const tech_total_price = tech_new_price - tech_original_price;
      const tech_total_quantity = tech_original_quantity - tech_new_quantity;
      const tech_dead = tech_total_price * tech_total_quantity;
      const tech_deadweight = tech_dead / 2;

      return {
        tech_deadweight,
        tech_dead,
        tech_total_price,
        tech_total_quantity,
        tech_original_price,
        tech_new_price,
        tech_original_quantity,
        tech_new_quantity,
      };
    } else {
      return {
        error: "Please! Check Your Input.",
      };
    }
  }

  /**
   * getCalculationMonthlyIncomeCalculator: Service Method
   * POST: /api/calculators-lol/monthly-income-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationMonthlyIncomeCalculator(body) {
    const param = {};
    const pay = body.tech_pay;
    const first = parseFloat(body.tech_first);
    const second = parseFloat(body.tech_second);

    let hourly_income,
      daily_income,
      weekly_income,
      bi_weekly_income,
      sami_monthly_income,
      monthly_income,
      quarterly_income,
      annual_income;

    if (pay == "1") {
      if (!isNaN(first) && !isNaN(second)) {
        annual_income = first * second * 52;
        monthly_income = Math.round(annual_income / 12);
        sami_monthly_income = Math.round((monthly_income / 2) * 100) / 100;
        daily_income = first * 8;
        weekly_income = first * second;
        bi_weekly_income = Math.round(weekly_income * 2);
        hourly_income = first;
        quarterly_income = Math.round((annual_income / 4) * 100) / 100;
      } else {
        param.error = "Please! Check Your Input.";
        return param;
      }
    } else if (pay == "2") {
      if (!isNaN(first) && !isNaN(second)) {
        daily_income = first;
        weekly_income = first * second;
        hourly_income = Math.round((first / 8) * 100) / 100;
        annual_income = hourly_income * 40 * 52;
        monthly_income = Math.round(annual_income / 12);
        sami_monthly_income = Math.round((monthly_income / 2) * 100) / 100;
        bi_weekly_income = Math.round(weekly_income * 2);
        quarterly_income = Math.round((annual_income / 4) * 100) / 100;
      } else {
        param.error = "Please! Check Your Input.";
        return param;
      }
    } else if (pay == "3") {
      if (!isNaN(first)) {
        daily_income = Math.round((first / 5) * 100) / 100;
        weekly_income = first;
        hourly_income = Math.round((first / 40) * 100) / 100;
        annual_income = hourly_income * 40 * 52;
        monthly_income = Math.round((annual_income / 12) * 100) / 100;
        sami_monthly_income = Math.round((monthly_income / 2) * 100) / 100;
        bi_weekly_income = Math.round(weekly_income * 2);
        quarterly_income = Math.round((annual_income / 4) * 100) / 100;
      } else {
        param.error = "Please! Check Your Input.";
        return param;
      }
    } else if (pay == "4") {
      if (!isNaN(first)) {
        weekly_income = Math.round((first / 2) * 100) / 100;
        daily_income = Math.round((weekly_income / 5) * 100) / 100;
        hourly_income = Math.round((daily_income / 8) * 100) / 100;
        annual_income = hourly_income * 40 * 52;
        monthly_income = Math.round((annual_income / 12) * 100) / 100;
        sami_monthly_income = Math.round((monthly_income / 2) * 100) / 100;
        bi_weekly_income = first;
        quarterly_income = Math.round((annual_income / 4) * 100) / 100;
      } else {
        param.error = "Please! Check Your Input.";
        return param;
      }
    } else if (pay == "5") {
      if (!isNaN(first)) {
        sami_monthly_income = first;
        monthly_income = Math.round(sami_monthly_income * 2);
        annual_income = monthly_income * 12;
        weekly_income = Math.round((annual_income / 52) * 100) / 100;
        daily_income = Math.round((weekly_income / 5) * 100) / 100;
        hourly_income = Math.round((daily_income / 8) * 100) / 100;
        bi_weekly_income = weekly_income * 2;
        quarterly_income = Math.round((annual_income / 4) * 100) / 100;
      } else {
        param.error = "Please! Check Your Input.";
        return param;
      }
    } else if (pay == "6") {
      if (!isNaN(first)) {
        quarterly_income = first;
        annual_income = first * 4;
        weekly_income = Math.round((annual_income / 52) * 100) / 100;
        monthly_income = Math.round((annual_income / 12) * 100) / 100;
        sami_monthly_income = Math.round((monthly_income / 2) * 100) / 100;
        daily_income = Math.round((weekly_income / 5) * 100) / 100;
        hourly_income = Math.round((daily_income / 8) * 100) / 100;
        bi_weekly_income = weekly_income * 2;
      } else {
        param.error = "Please! Check Your Input.";
        return param;
      }
    } else {
      if (!isNaN(first)) {
        weekly_income = Math.round((first / 52) * 100) / 100;
        daily_income = Math.round((weekly_income / 5) * 100) / 100;
        hourly_income = Math.round((daily_income / 8) * 100) / 100;
        annual_income = first;
        monthly_income = Math.round((annual_income / 12) * 100) / 100;
        bi_weekly_income = weekly_income * 2;
        sami_monthly_income = Math.round((monthly_income / 2) * 100) / 100;
        quarterly_income = Math.round((annual_income / 4) * 100) / 100;
      } else {
        param.error = "Please! Check Your Input.";
        return param;
      }
    }

    param.tech_hourly_income = hourly_income;
    param.tech_daily_income = daily_income;
    param.tech_weekly_income = weekly_income;
    param.tech_bi_weekly_income = bi_weekly_income;
    param.tech_sami_monthly_income = sami_monthly_income;
    param.tech_monthly_income = monthly_income;
    param.tech_quarterly_income = quarterly_income;
    param.tech_annual_income = annual_income;

    return param;
  }

  /**
   * getCalculationCurrentRationCalculator: Service Method
   * POST: /api/calculators-lol/current-ratio-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationCurrentRationCalculator(body) {
    const tech_assets = Number(body.tech_assets);
    const tech_liabilities = Number(body.tech_liabilities);

    if (isFinite(tech_assets) && isFinite(tech_liabilities)) {
      const tech_answer = tech_assets / tech_liabilities;
      return {
        tech_answer,
        tech_assets,
        tech_liabilities,
      };
    } else {
      return {
        error: "Please! Check Your Input.",
      };
    }
  }

  /**
   * getCalculationComparativeAdvantageCalculator: Service Method
   * POST: /api/calculators-lol/comparative-advantage-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationComparativeAdvantageCalculator(body) {
    const { tech_first, tech_second, tech_third, tech_four } = body;

    if (isFinite(tech_first) && isFinite(tech_second) && isFinite(tech_third)) {
      const tech_X_A = +(tech_second / tech_first).toFixed(2);
      const tech_X_B = +(tech_first / tech_second).toFixed(2);
      const tech_Y_A = +(tech_four / tech_third).toFixed(2);
      const tech_Y_B = +(tech_third / tech_four).toFixed(2);

      return {
        tech_X_A,
        tech_X_B,
        tech_Y_A,
        tech_Y_B,
        tech_first,
        tech_second,
        tech_third,
        tech_four,
      };
    } else {
      return {
        error: "Please! Check Your Input.",
      };
    }
  }

  /**
   * getCalculationActualCashValueCalculator: Service Method
   * POST: /api/calculators-lol/actual-cash-value-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationActualCashValueCalculator(body) {
    const { tech_price, tech_expected, tech_current } = body;

    if (
      !isNaN(tech_price) &&
      isFinite(tech_price) &&
      !isNaN(tech_expected) &&
      isFinite(tech_expected) &&
      !isNaN(tech_current) &&
      isFinite(tech_current)
    ) {
      if (tech_current > tech_expected) {
        return {
          error:
            "Current life of the item cannot be larger than the expected life of the item.",
        };
      }

      const acv = (tech_price * (tech_expected - tech_current)) / tech_expected;

      return {
        tech_acv: parseFloat(acv.toFixed(2)),
      };
    } else {
      return {
        error: "Please! Check Your Input.",
      };
    }
  }

  /**
   * getCalculationCrossPriceElasticityCalculator: Service Method
   * POST: /api/calculators-lol/cross-price-elasticity-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationCrossPriceElasticityCalculator(body) {
    const { tech_first, tech_second, tech_third, tech_four } = body;

    if (
      !isNaN(tech_first) &&
      isFinite(tech_first) &&
      !isNaN(tech_second) &&
      isFinite(tech_second) &&
      !isNaN(tech_third) &&
      isFinite(tech_third) &&
      !isNaN(tech_four) &&
      isFinite(tech_four)
    ) {
      const lamda_a = tech_first - tech_third;
      const lamda_b = tech_second - tech_four;

      const elasticity =
        ((tech_first + tech_third) / (tech_second + tech_four)) *
        (lamda_b / lamda_a);

      return {
        tech_elasticity: parseFloat(elasticity.toFixed(2)),
      };
    } else {
      return {
        error: "Please! Check Your Input.",
      };
    }
  }

  /**
   * getCalculationBuyingPowereCalculator: Service Method
   * POST: /api/calculators-lol/buying-power-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationBuyingPowereCalculator(body) {
    const amount = parseFloat(body.tech_amount);
    const reference = parseInt(body.tech_reference);
    const target = parseInt(body.tech_target);
    const param = {};

    const data = {
      1913: 9.9,
      1914: 10,
      1915: 10.1,
      1916: 10.9,
      1917: 12.8,
      1918: 15.1,
      1919: 17.3,
      1920: 20,
      1921: 17.9,
      1922: 16.8,
      1923: 17.1,
      1924: 17.1,
      1925: 17.5,
      1926: 17.7,
      1927: 17.4,
      1928: 17.1,
      1929: 17.1,
      1930: 16.7,
      1931: 15.2,
      1932: 13.7,
      1933: 13,
      1934: 13.4,
      1935: 13.7,
      1936: 13.9,
      1937: 14.4,
      1938: 14.1,
      1939: 13.9,
      1940: 14,
      1941: 14.7,
      1942: 16.3,
      1943: 17.3,
      1944: 17.6,
      1945: 18,
      1946: 19.5,
      1947: 22.3,
      1948: 24.1,
      1949: 23.8,
      1950: 24.1,
      1951: 26,
      1952: 26.5,
      1953: 26.7,
      1954: 26.9,
      1955: 26.8,
      1956: 27.2,
      1957: 28.1,
      1958: 28.9,
      1959: 29.1,
      1960: 29.6,
      1961: 29.9,
      1962: 30.2,
      1963: 30.6,
      1964: 31,
      1965: 31.5,
      1966: 32.4,
      1967: 33.4,
      1968: 34.8,
      1969: 36.7,
      1970: 38.8,
      1971: 40.5,
      1972: 41.8,
      1973: 44.4,
      1974: 49.3,
      1975: 53.8,
      1976: 56.9,
      1977: 60.6,
      1978: 65.2,
      1979: 72.6,
      1980: 82.4,
      1981: 90.9,
      1982: 96.5,
      1983: 99.6,
      1984: 103.9,
      1985: 107.6,
      1986: 109.6,
      1987: 113.6,
      1988: 118.3,
      1989: 124,
      1990: 130.7,
      1991: 136.2,
      1992: 140.3,
      1993: 144.5,
      1994: 148.2,
      1995: 152.4,
      1996: 156.9,
      1997: 160.5,
      1998: 163,
      1999: 166.6,
      2000: 172.2,
      2001: 177.1,
      2002: 179.9,
      2003: 184,
      2004: 188.9,
      2005: 195.3,
      2006: 201.6,
      2007: 207.3,
      2008: 215.303,
      2009: 214.537,
      2010: 218.056,
      2011: 224.939,
      2012: 229.594,
      2013: 232.957,
      2014: 236.736,
      2015: 237.017,
      2016: 240.007,
      2017: 245.12,
      2018: 251.107,
      2019: 255.657,
      2020: 258.811,
      2021: 270.97,
    };

    if (!isNaN(amount) && !isNaN(reference) && !isNaN(target)) {
      if (reference < 1913 || reference > 2021) {
        param.error = "The reference year should be between 1913 and 2021.";
        return param;
      }
      if (target < 1913 || target > 2021) {
        param.error = "The target year should be between 1913 and 2021.";
        return param;
      }

      const result = amount * (data[target] / data[reference]);
      param.tech_result = parseFloat(result.toFixed(2));
    } else {
      param.error = "Please! Check Your Input.";
    }

    return param;
  }

  /**
   * getCalculationPriceCalculator: Service Method
   * POST: /api/calculators-lol/price-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationPriceCalculator(body) {
    const price = parseFloat(body.tech_price);
    const gross = parseFloat(body.tech_gross);
    const param = {};

    if (!isNaN(price) && !isNaN(gross)) {
      if (gross < 0 || gross > 100) {
        param.error = "Enter Margin 0% to 100%";
        return param;
      }

      const grossDecimal = gross / 100;
      const revenue = price / (1 - grossDecimal);
      const gross_profit = revenue * grossDecimal;
      const mark_up = (gross_profit / price) * 100;

      param.tech_revenue = parseFloat(revenue.toFixed(2));
      param.tech_gross_profit = parseFloat(gross_profit.toFixed(2));
      param.tech_mark_up = parseFloat(mark_up.toFixed(2));
      param.tech_price = price;
      param.tech_gross = gross;
    } else {
      param.error = "Please! Check Your Input";
    }

    return param;
  }

  /**
   * getCalculationGdpPerCapitaCalculator: Service Method
   * POST: /api/calculators-lol/gdp-per-capita-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationGdpPerCapitaCalculator(body) {
    const real = parseFloat((body.tech_real || "").toString().trim());
    const real_unit = (body.tech_real_unit || "")
      .toString()
      .trim()
      .toLowerCase();
    const population = parseFloat(
      (body.tech_population || "").toString().trim()
    );
    const population_unit = (body.tech_population_unit || "")
      .toString()
      .trim()
      .toLowerCase();

    const param = {};

    function capital(value, unit) {
      switch (unit) {
        case "thousand":
          return value * 1;
        case "million":
          return value * 1000;
        case "billion":
          return value * 1000000;
        default:
          return value;
      }
    }

    if (!isNaN(real) && !isNaN(population)) {
      if (population === 0) {
        param.error = "Please! Check Your Input";
        return param;
      }

      const convertedReal = capital(real, real_unit);
      const convertedPopulation = capital(population, population_unit);

      const answer = convertedReal / convertedPopulation;

      param.tech_answer = answer;
      param.tech_real = real;
      param.tech_real_unit = real_unit;
      param.tech_population = population;
      param.tech_population_unit = population_unit;
    } else {
      param.error = "Please! Check Your Input";
    }

    return param;
  }

  /**
   * getCalculationGPDCalculator: Service Method
   * POST: /api/calculators-lol/gdp-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationGPDCalculator(body) {
    const consumption = body.tech_consumption;
    const consumption_unit = body.tech_consumption_unit;
    const investment = body.tech_investment;
    const investment_unit = body.tech_investment_unit;
    const purchases = body.tech_purchases;
    const purchases_unit = body.tech_purchases_unit;
    const exports = body.tech_exports;
    const exports_unit = body.tech_exports_unit;
    const imports = body.tech_imports;
    const imports_unit = body.tech_imports_unit;

    const units = (value, unit) => {
      let convertedValue = parseFloat(value);
      if (unit === "million") {
        return convertedValue * 1;
      } else if (unit === "billion") {
        return convertedValue * 1000;
      } else if (unit === "trillion") {
        return convertedValue * 1000000;
      }
      return convertedValue;
    };

    // Check if all values are numbers
    if (
      !isNaN(consumption) &&
      !isNaN(investment) &&
      !isNaN(purchases) &&
      !isNaN(exports) &&
      !isNaN(imports)
    ) {
      // Convert to the correct units
      const consumptionValue = units(consumption, consumption_unit);
      const investmentValue = units(investment, investment_unit);
      const purchasesValue = units(purchases, purchases_unit);
      const exportsValue = units(exports, exports_unit);
      const importsValue = units(imports, imports_unit);

      // Calculate net export and GDP
      const netExport = exportsValue - importsValue;
      const gdp =
        consumptionValue + investmentValue + purchasesValue + netExport;

      // Return the result
      return {
        tech_net_export: netExport,
        tech_gdp: gdp,
        input_consumption: body.tech_consumption,
        input_investment: body.tech_investment,
        input_purchases: body.tech_purchases,
        input_exports: body.tech_exports,
        input_imports: body.tech_imports,
      };
    } else {
      return {
        error: "Please! Check Your Input",
      };
    }
  }

  /**
   * getCalculationNPSCalculator: Service Method
   * POST: /api/calculators-lol/nps-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationNPSCalculator(body) {
    let score_ten = body.tech_score_ten;
    let score_nine = body.tech_score_nine;
    let score_eight = body.tech_score_eight;
    let score_seven = body.tech_score_seven;
    let score_six = body.tech_score_six;
    let score_five = body.tech_score_five;
    let score_four = body.tech_score_four;
    let score_three = body.tech_score_three;
    let score_two = body.tech_score_two;
    let score_one = body.tech_score_one;
    let score_zero = body.tech_score_zero;

    // Check if all values are numbers
    if (
      !isNaN(score_ten) &&
      !isNaN(score_nine) &&
      !isNaN(score_eight) &&
      !isNaN(score_seven) &&
      !isNaN(score_six) &&
      !isNaN(score_five) &&
      !isNaN(score_four) &&
      !isNaN(score_three) &&
      !isNaN(score_two) &&
      !isNaN(score_one) &&
      !isNaN(score_zero)
    ) {
      // Calculate good, neutral, and bad scores
      const good = parseFloat(score_ten) + parseFloat(score_nine);
      const neutral = parseFloat(score_eight) + parseFloat(score_seven);
      const bad =
        parseFloat(score_six) +
        parseFloat(score_five) +
        parseFloat(score_four) +
        parseFloat(score_three) +
        parseFloat(score_two) +
        parseFloat(score_one) +
        parseFloat(score_zero);
      const total = good + neutral + bad;

      // Check if total is zero
      if (total === 0) {
        return {
          error: "Check Your Input Total NPS not equal to zero",
        };
      }

      // Calculate the NPS score
      const answer = ((good / total - bad / total) * 100).toFixed(2); // Rounded to 2 decimal places
      return {
        tech_good: good,
        tech_neutral: neutral,
        tech_bad: bad,
        tech_total: total,
        tech_answer: answer,
        tech_score_ten: score_ten,
        tech_score_nine: score_nine,
        tech_score_eight: score_eight,
        tech_score_seven: score_seven,
        tech_score_six: score_six,
        tech_score_five: score_five,
        tech_score_four: score_four,
        tech_score_three: score_three,
        tech_score_two: score_two,
        tech_score_one: score_one,
        tech_score_zero: score_zero,
      };
    } else {
      return {
        error: "Please fill all fields.",
      };
    }
  }

  /**
   * getCalculationRealEstateCommissionCalculator: Service Method
   * POST: /api/calculators-lol/real-estate-commission-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationRealEstateCommissionCalculator(body) {
    const housePrice = parseFloat(
      (body.tech_housePrice || "").toString().trim()
    );
    const commissionRate = parseFloat(
      (body.tech_commissionRate || "").toString().trim()
    );

    const param = {};

    if (!isNaN(housePrice) && !isNaN(commissionRate)) {
      const commissionAmount = (commissionRate / 100) * housePrice;
      const ownerReceives = housePrice - commissionAmount;

      param.tech_commissionAmount = commissionAmount;
      param.tech_ownerReceives = ownerReceives;
    } else {
      param.error = "Please! Check Your Input";
    }

    return param;
  }

  /**
   * getCalculationSalvageValueCalculator: Service Method
   * POST: /api/calculators-lol/salvage-value-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationSalvageValueCalculator(body) {
    const original = parseFloat((body.tech_original || "").toString().trim());
    const rate = parseFloat((body.tech_rate || "").toString().trim());
    const year = parseFloat((body.tech_year || "").toString().trim());

    const param = {};

    if (!isNaN(original) && !isNaN(rate) && !isNaN(year)) {
      const rates = rate / 100;
      const answer = original * Math.pow(1 - rates, year);

      param.tech_answer = answer;
      param.tech_original = original;
      param.tech_rate = rate;
      param.tech_year = year;
    } else {
      param.error = "Please! Check Your Input";
    }

    return param;
  }

  /**
   * getCalculationPercentOfSaleCalculator: Service Method
   * POST: /api/calculators-lol/percent-of-sales-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationPercentOfSaleCalculator(body) {
    const item = parseFloat((body.tech_item || "").toString().trim());
    const sale = parseFloat((body.tech_sale || "").toString().trim());

    const param = {};

    if (!isNaN(item) && !isNaN(sale)) {
      if (sale === 0) {
        param.error = "Total Sales value cannot be equal to zero.";
        return param;
      }

      const answer = (item / sale) * 100;

      param.tech_answer = answer;
      param.tech_item = item;
      param.tech_sale = sale;
    } else {
      param.error = "Please! Check Your Input";
    }

    return param;
  }

  /**
   * getCalculationRentIncreaseCalculator: Service Method
   * POST: /api/calculators-lol/rent-increase-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationRentIncreaseCalculator(body) {
    const rent = parseFloat(body.tech_rent);
    const year = parseFloat(body.tech_year);
    let numbers = parseFloat(body.tech_numbers);
    const numbers_unit = (body.tech_numbers_unit || "").trim();

    const param = {};

    // Convert time units to years
    if (numbers_unit === "wks") {
      numbers = numbers / 52.143;
    } else if (numbers_unit === "mos") {
      numbers = numbers / 12;
    }

    if (!isNaN(rent) && !isNaN(year) && !isNaN(numbers)) {
      if (rent === 0) {
        param.error = "Current Annual Rent value cannot be equal to zero.";
        return param;
      }
      if (year === 0) {
        param.error =
          "Average Rent Change Per Year value cannot be equal to zero.";
        return param;
      }
      if (numbers === 0) {
        param.error = "Number Of Years value cannot be equal to zero.";
        return param;
      }

      const years = year / 100;
      const answer = rent * Math.pow(1 + years, numbers);

      param.tech_answer = answer;
      param.tech_rent = rent;
      param.tech_year = year;
      param.tech_numbers = body.tech_numbers;
    } else {
      param.error = "Please! Check Your Input";
    }

    return param;
  }

  /**
   * getCalculationCostOfGoodsSoldCalculator: Service Method
   * POST: /api/calculators-lol/cost-of-goods-sold-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationCostOfGoodsSoldCalculator(body) {
    const inventory = parseFloat(body.tech_inventory);
    const purchases = parseFloat(body.tech_purchases);
    const e_inventory = parseFloat(body.tech_e_inventory);

    const param = {};

    if (!isNaN(inventory) && !isNaN(purchases) && !isNaN(e_inventory)) {
      const COGS = inventory + purchases - e_inventory;
      param.tech_COGS = COGS;
      param.tech_inventory = inventory;
      param.tech_purchases = purchases;
      param.tech_e_inventory = e_inventory;
    } else {
      param.error = "Please check your input.";
    }

    return param;
  }

  /**
   * getCalculationBookValueCalculator: Service Method
   * POST: /api/calculators-lol/book-value-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationBookValueCalculator(body) {
    const acquisition = parseFloat(body.tech_acquisition);
    const depreciation = parseFloat(body.tech_depreciation);

    const param = {};

    if (!isNaN(acquisition) && !isNaN(depreciation)) {
      const book = acquisition - depreciation;

      param.tech_book = book;
      param.tech_acquisition = acquisition;
      param.tech_depreciation = depreciation;
    } else {
      param.error = "Please check your input.";
    }

    return param;
  }

  /**
   * getCalculationYoutubeRevenueCalculator: Service Method
   * POST: /api/calculators-lol/youtube-revenue-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationYoutubeRevenueCalculator(body) {
    const video = parseFloat(body.tech_video);
    const average = parseFloat(body.tech_average);
    const click = parseFloat(body.tech_click);

    const param = {};

    if (!isNaN(video) && !isNaN(average) && !isNaN(click)) {
      const averageClicks = video * (click / 100);
      const averageRevenue = averageClicks * average;

      param.tech_averageClicks = averageClicks;
      param.tech_averageRevenue = averageRevenue;
    } else {
      param.error = "Please check your input.";
    }

    return param;
  }

  /**
   * getCalculationBondPriceCalculator: Service Method
   * POST: /api/calculators-lol/bond-price-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationBondPriceCalculator(body) {
    let faceValue = body.tech_faceValue;
    let couponRate = body.tech_couponRate;
    let yearsToMaturity = body.tech_yearsToMaturity;
    let frequency = body.tech_frequency;
    let yieldRate = body.tech_yieldRate;

    if (
      !isNaN(faceValue) &&
      !isNaN(couponRate) &&
      !isNaN(yearsToMaturity) &&
      !isNaN(frequency) &&
      !isNaN(yieldRate)
    ) {
      const couponRateDecimal = couponRate / 100;
      const yieldDecimal = yieldRate / 100;

      // Function to calculate the bond price
      function calculateBondPrice(
        faceValue,
        couponRateDecimal,
        yearsToMaturity,
        yieldDecimal
      ) {
        const couponPayment = faceValue * couponRateDecimal;
        const totalPayments = yearsToMaturity;
        let presentValue = 0;

        for (let i = 1; i <= totalPayments; i++) {
          presentValue += couponPayment / Math.pow(1 + yieldDecimal, i);
        }
        presentValue += faceValue / Math.pow(1 + yieldDecimal, totalPayments);

        return presentValue;
      }

      const bondPrice = calculateBondPrice(
        faceValue,
        couponRateDecimal,
        yearsToMaturity,
        yieldDecimal
      );
      const couponPayment = (faceValue * couponRateDecimal) / frequency;
      const annualPayment = faceValue * couponRateDecimal;

      return {
        tech_couponPayment: parseFloat(couponPayment.toFixed(2)),
        tech_annual: parseFloat(annualPayment.toFixed(2)),
        tech_bondPrice: parseFloat(bondPrice.toFixed(2)),
      };
    } else {
      return {
        error: "Please check your input.",
      };
    }
  }

  /**
   * getCalculationContributionMarginCalculator: Service Method
   * POST: /api/calculators-lol/contribution-margin-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationContributionMarginCalculator(body) {
    const selling_price = parseFloat(body.tech_selling_price);
    const variable_cost = parseFloat(body.tech_variable_cost);
    const number_units = parseFloat(body.tech_number_units);
    const fixed_cost = parseFloat(body.tech_fixed_cost);

    const param = {};

    // Validate numeric input
    if (
      !isNaN(selling_price) &&
      !isNaN(variable_cost) &&
      !isNaN(number_units) &&
      !isNaN(fixed_cost)
    ) {
      const contribution_margin =
        selling_price * number_units - variable_cost * number_units;
      const contribution_margin_ratio =
        contribution_margin / (selling_price * number_units);
      const profit = contribution_margin - fixed_cost;

      param.tech_contribution_margin = contribution_margin;
      param.tech_contribution_margin_ratio = contribution_margin_ratio * 100; // in percentage
      param.tech_profit = profit;
    } else {
      param.error = "Please check your input.";
    }

    return param;
  }

  /**
   * getCalculationNetWorthCalculator: Service Method
   * POST: /api/calculators-lol/net-worth-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationNetWorthCalculator(body) {
    const {
      tech_as_real,
      tech_as_check,
      tech_as_saving,
      tech_as_retire,
      tech_as_car,
      tech_as_other,
      tech_li_real,
      tech_li_card,
      tech_li_loan,
      tech_li_stload,
      tech_li_car,
      tech_li_other,
      res_link,
    } = body;

    // Validate all inputs are numeric
    const allValues = [
      tech_as_real,
      tech_as_check,
      tech_as_saving,
      tech_as_retire,
      tech_as_car,
      tech_as_other,
      tech_li_real,
      tech_li_card,
      tech_li_loan,
      tech_li_stload,
      tech_li_car,
      tech_li_other,
    ];

    const allAreNumeric = allValues.every(
      (value) => !isNaN(value) && isFinite(value)
    );

    if (allAreNumeric) {
      const assets =
        +tech_as_real +
        +tech_as_check +
        +tech_as_saving +
        +tech_as_retire +
        +tech_as_car +
        +tech_as_other;
      const liabilities =
        +tech_li_real +
        +tech_li_card +
        +tech_li_loan +
        +tech_li_stload +
        +tech_li_car +
        +tech_li_other;
      const net_worth = assets - liabilities;

      return {
        tech_assets: parseFloat(assets.toFixed(2)),
        tech_liabilities: parseFloat(liabilities.toFixed(2)),
        tech_net_worth: parseFloat(net_worth.toFixed(2)),
      };
    } else {
      return {
        error: "Please! Check Your Input.",
      };
    }
  }

  /**
   * getCalculationCTRCalculator: Service Method
   * POST: /api/calculators-lol/ctr-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationCTRCalculator(body) {
    const impression = body.tech_impression;
    const clicks = body.tech_clicks;
    const param = {};

    if (!isNaN(impression) && !isNaN(clicks)) {
      const ctr = clicks / impression;
      param.tech_ctr = ctr;
      param.tech_impression = impression;
      param.tech_clicks = clicks;
    } else {
      param.error = "Please check your input.";
    }

    return param;
  }

  /**
   * getCalculationOpportunityCostCalculator: Service Method
   * POST: /api/calculators-lol/opportunity-cost-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationOpportunityCostCalculator(body) {
    let return_best = body.tech_return_best;
    let return_choose = body.tech_return_choose;
    let param = {};
    // Trim and convert to numbers
    const bestReturn = parseFloat(return_best?.toString().trim());
    const chosenReturn = parseFloat(return_choose?.toString().trim());

    if (!isNaN(bestReturn) && !isNaN(chosenReturn)) {
      param.tech_OpportunityCost = bestReturn - chosenReturn;
      param.tech_return_best = bestReturn;
      param.tech_return_choose = chosenReturn;
    } else {
      param.error = "Please! Check Your Input";
    }

    return param;
  }

  /**
   * FifoLifoCalculator: Service Method
   * POST: /api/calculators-lol/fifo-lifo-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async FifoLifoCalculator(data) {
    try {
      const {
        method, // "fifo" or "lifo"
        no_of_purchases_unit,
        no_of_purchases_unit_price,
        total_units_sold,
      } = data;

      // 1️⃣ Validate input
      if (
        !method ||
        !no_of_purchases_unit ||
        !no_of_purchases_unit_price ||
        !total_units_sold
      ) {
        return { error: "All fields are required." };
      }

      if (no_of_purchases_unit.length !== no_of_purchases_unit_price.length) {
        return { error: "Units and prices arrays must have the same length." };
      }

      // 2️⃣ Convert strings to numbers
      const units = no_of_purchases_unit.map(Number);
      const prices = no_of_purchases_unit_price.map(Number);
      const unitsSold = parseInt(total_units_sold);

      // 3️⃣ Calculate total units purchased
      const totalUnitsPurchased = units.reduce((sum, u) => sum + u, 0);

      // 4️⃣ Check if enough units available
      if (unitsSold > totalUnitsPurchased) {
        return { error: "Cannot sell more units than purchased." };
      }

      // 5️⃣ Create purchase records
      const purchases = units.map((unit, index) => ({
        sr_no: index + 1,
        units_purchased: unit,
        price_per_unit: prices[index],
        cost_of_goods_purchased: unit * prices[index],
        units_sold: 0,
        units_remaining: unit,
        cogs: 0,
        inventory_value: unit * prices[index],
      }));

      // 6️⃣ Calculate COGS based on method
      let remainingUnitsToSell = unitsSold;
      let totalCOGS = 0;

      if (method.toLowerCase() === "fifo") {
        // FIFO: Sell from first purchase first
        for (let i = 0; i < purchases.length && remainingUnitsToSell > 0; i++) {
          const unitsToSellFromThisBatch = Math.min(
            purchases[i].units_purchased,
            remainingUnitsToSell
          );

          purchases[i].units_sold = unitsToSellFromThisBatch;
          purchases[i].units_remaining =
            purchases[i].units_purchased - unitsToSellFromThisBatch;
          purchases[i].cogs =
            unitsToSellFromThisBatch * purchases[i].price_per_unit;
          purchases[i].inventory_value =
            purchases[i].units_remaining * purchases[i].price_per_unit;

          totalCOGS += purchases[i].cogs;
          remainingUnitsToSell -= unitsToSellFromThisBatch;
        }
      } else if (method.toLowerCase() === "lifo") {
        // LIFO: Sell from last purchase first
        for (
          let i = purchases.length - 1;
          i >= 0 && remainingUnitsToSell > 0;
          i--
        ) {
          const unitsToSellFromThisBatch = Math.min(
            purchases[i].units_purchased,
            remainingUnitsToSell
          );

          purchases[i].units_sold = unitsToSellFromThisBatch;
          purchases[i].units_remaining =
            purchases[i].units_purchased - unitsToSellFromThisBatch;
          purchases[i].cogs =
            unitsToSellFromThisBatch * purchases[i].price_per_unit;
          purchases[i].inventory_value =
            purchases[i].units_remaining * purchases[i].price_per_unit;

          totalCOGS += purchases[i].cogs;
          remainingUnitsToSell -= unitsToSellFromThisBatch;
        }
      } else {
        return { error: 'Invalid method. Use "fifo" or "lifo".' };
      }

      // 7️⃣ Calculate totals
      const totalCostOfGoodsPurchased = purchases.reduce(
        (sum, p) => sum + p.cost_of_goods_purchased,
        0
      );
      const totalUnitsSold = unitsSold;
      const totalUnitsRemaining = totalUnitsPurchased - totalUnitsSold;
      const totalInventoryValue = purchases.reduce(
        (sum, p) => sum + p.inventory_value,
        0
      );

      // 8️⃣ Return result

      return {
        status: "success",
        method: method.toUpperCase(),
        summary: {
          cost_of_goods_purchased: totalCostOfGoodsPurchased,
          cost_of_goods_sold: totalCOGS,
          ending_inventory_value: totalInventoryValue,
        },
        details: purchases.map((p) => ({
          sr_no: p.sr_no,
          units_purchased: p.units_purchased,
          price_per_unit: p.price_per_unit,
          cost_of_goods_purchased: p.cost_of_goods_purchased,
          units_sold: p.units_sold,
          units_remaining: p.units_remaining,
          cogs: p.cogs,
          inventory_value: p.inventory_value,
        })),
        totals: {
          total_units_purchased: totalUnitsPurchased,
          total_cost_of_goods_purchased: totalCostOfGoodsPurchased,
          total_units_sold: totalUnitsSold,
          total_units_remaining: totalUnitsRemaining,
          total_cogs: totalCOGS,
          total_inventory_value: totalInventoryValue,
        },
      };
    } catch (error) {
      return {
        status: "error",
        error:
          error.message || "Something went wrong in FIFO/LIFO calculation.",
      };
    }
  }

  /**
   * getCalculationDepreciationCalculator: Service Method
   * POST: /api/calculators-lol/depreciation-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationDepreciationCalculator(request) {
    try {
      // Reset param
      this.param = {};

      // Set currency
      const hiddenCurrency = request.hiddent_currency || "$";

      // Validate method
      if (!request.method) {
        this.param.error = "Please! Check Your Input";
        return this.param;
      }

      // Route to appropriate method
      switch (request.method) {
        case "Straight":
          return this.calculateStraightLine(request, hiddenCurrency);

        case "Declining":
          return this.calculateDeclining(request, hiddenCurrency);

        case "sum":
          return this.calculateSumOfYears(request, hiddenCurrency);

        case "Reducing":
          return this.calculateReducing(request, hiddenCurrency);

        case "unit_of_pro":
          return this.calculateUnitOfProduction(request, hiddenCurrency);

        default:
          this.param.error = "Invalid depreciation method";
          return this.param;
      }
    } catch (error) {
      this.param.error = error.message || "An error occurred";
      return this.param;
    }
  }
  // Straight Line Method
  calculateStraightLine(request, hiddenCurrency) {
    if (!this.validateInput(request, ["asset", "salvage", "year", "date"])) {
      this.param.error = "Please! Check Your Input";
      return this.param;
    }

    const { year, salvage, asset, date, conver, round } = request;
    let asset1 = asset;
    let depreciation = 0;
    let cDepreciation = 0;
    let table = "";
    let des = "";
    let bookDes = "";
    let totalYears = "";
    let totalBookValue = "";

    const dateArray = date.split("-");
    const startMonth = parseInt(dateArray[2]);
    let startYear = parseInt(dateArray[1]);

    const rate = this.roundValue(100 / year, 2);

    if (conver == "0") {
      // Full year convention
      for (let i = 0; i < Number(year); i++) {
        startYear = parseInt(dateArray[2]) + i;
        totalYears += startYear + ",";

        depreciation = this.calculateDepreciation(
          (asset - salvage) * (rate / 100),
          round
        );
        cDepreciation = this.roundValue(
          cDepreciation + depreciation,
          round === "yes" ? 0 : 2
        );
        let endBookValue = this.roundValue(
          asset - cDepreciation,
          round === "yes" ? 0 : 2
        );

        // Check if end book value is less than salvage
        if (endBookValue < salvage) {
          endBookValue = salvage;
          cDepreciation = cDepreciation - depreciation;
          depreciation = asset1 - salvage;
          cDepreciation = cDepreciation + depreciation;
        }

        totalBookValue += endBookValue + ",";
        table += this.generateTableRow(
          startYear,
          asset1,
          rate,
          depreciation,
          cDepreciation,
          endBookValue,
          hiddenCurrency
        );
        des += depreciation + ",";
        bookDes += asset1 + ",";
        asset1 = asset - cDepreciation;
      }
    } else {
      // Partial year convention
      const months = this.calculateMonths(conver, startMonth);

      for (let i = 0; i <= Number(year) - 1; i++) {
        startYear = parseInt(dateArray[2]) + i;
        totalYears += startYear + ",";

        depreciation = this.calculateDepreciation(
          (asset - salvage) * (rate / 100),
          round
        );
        cDepreciation = this.roundValue(
          cDepreciation + depreciation,
          round == "yes" ? 0 : 2
        );
        let endBookValue = this.roundValue(
          asset - cDepreciation,
          round == "yes" ? 0 : 2
        );

        if (endBookValue < salvage) {
          endBookValue = salvage;
          depreciation = asset1 - salvage;
          cDepreciation = cDepreciation + depreciation;
        }

        if (i == 0) {
          // First year partial depreciation
          const firstYearDep = 12 / months;
          cDepreciation = cDepreciation - depreciation;
          depreciation = this.calculateDepreciation(
            depreciation / firstYearDep,
            round
          );
          cDepreciation = this.roundValue(
            cDepreciation + depreciation,
            round == "yes" ? 0 : 2
          );
          endBookValue = this.roundValue(
            asset - cDepreciation,
            round == "yes" ? 0 : 2
          );

          const rate1 = this.roundValue(
            (depreciation / (asset - salvage)) * 100,
            2
          );
          table += this.generateTableRow(
            startYear,
            asset1,
            rate1,
            depreciation,
            cDepreciation,
            endBookValue,
            hiddenCurrency
          );
          des += depreciation + ",";
          bookDes += asset1 + ",";
        } else {
          table += this.generateTableRow(
            startYear,
            asset1,
            rate,
            depreciation,
            cDepreciation,
            endBookValue,
            hiddenCurrency
          );
          des += depreciation + ",";
          bookDes += asset1 + ",";
        }

        totalBookValue += endBookValue + ",";
        asset1 = asset - cDepreciation;
      }
    }

    this.param.table = table;
    this.param.des = des;
    this.param.book_des = bookDes;
    this.param.total_years = totalYears;
    this.param.total_book_value = totalBookValue;
    this.param.RESULT = 1;
    return this.param;
  }
  // Declining Balance Method
  calculateDeclining(request, hiddenCurrency) {
    if (
      !this.validateInput(request, [
        "asset",
        "salvage",
        "year",
        "Factor",
        "date",
      ])
    ) {
      this.param.error = "Please! Check Your Input";
      return this.param;
    }

    const { year, salvage, asset, Factor, date, conver, round } = request;
    let asset1 = asset;
    let depreciation = 0;
    let cDepreciation = 0;
    let table = "";
    let des = "";
    let bookDes = "";
    let totalYears = "";
    let totalBookValue = "";

    const dateArray = date.split("-");
    const startMonth = parseInt(dateArray[2]);
    let startYear = parseInt(dateArray[1]);

    let rate = this.roundValue((1 / year) * Factor * 100, 2);

    if (conver == "0") {
      for (let i = 0; i < Number(year); i++) {
        startYear = parseInt(dateArray[2]) + i;
        totalYears += startYear + ",";

        depreciation = this.calculateDepreciation(asset1 * (rate / 100), round);
        cDepreciation = this.roundValue(
          cDepreciation + depreciation,
          round == "yes" ? 0 : 2
        );
        let endBookValue = this.roundValue(
          asset - cDepreciation,
          round == "yes" ? 0 : 2
        );

        if (endBookValue < salvage) {
          endBookValue = salvage;
          cDepreciation = cDepreciation - depreciation;
          depreciation = asset1 - salvage;
          cDepreciation = cDepreciation + depreciation;
          rate = this.roundValue((depreciation / asset1) * 100, 2);
        }

        if (i == Number(year) - 1 && endBookValue > salvage) {
          endBookValue = salvage;
          cDepreciation = cDepreciation - depreciation;
          depreciation = asset1 - salvage;
          cDepreciation = cDepreciation + depreciation;
          rate = this.roundValue((depreciation / asset1) * 100, 2);
        }

        totalBookValue += endBookValue + ",";
        table += this.generateTableRow(
          startYear,
          asset1,
          rate,
          depreciation,
          cDepreciation,
          endBookValue,
          hiddenCurrency
        );
        des += depreciation + ",";
        bookDes += asset1 + ",";
        asset1 = asset - cDepreciation;
      }
    } else {
      const months = this.calculateMonths(conver, startMonth);

      for (let i = 0; i < Number(year); i++) {
        startYear = parseInt(dateArray[2]) + i;
        totalYears += startYear + ",";

        depreciation = this.calculateDepreciation(asset1 * (rate / 100), round);
        cDepreciation = this.roundValue(
          cDepreciation + depreciation,
          round === "yes" ? 0 : 2
        );
        let endBookValue = this.roundValue(
          asset - cDepreciation,
          round === "yes" ? 0 : 2
        );

        if (endBookValue < salvage) {
          endBookValue = salvage;
          depreciation = asset1 - salvage;
          cDepreciation = cDepreciation + depreciation;
          rate = this.roundValue((depreciation / asset1) * 100, 2);
        }

        if (i == Number(year) - 1 && endBookValue > salvage) {
          endBookValue = salvage;
          cDepreciation = cDepreciation - depreciation;
          depreciation = asset1 - salvage;
          cDepreciation = cDepreciation + depreciation;
          rate = this.roundValue((depreciation / asset1) * 100, 2);
        }

        if (i == 0) {
          cDepreciation = 0;
          const rate1 = this.roundValue((rate / 12) * months, 2);
          depreciation = this.calculateDepreciation(
            asset1 * (rate1 / 100),
            round
          );
          cDepreciation = this.roundValue(
            cDepreciation + depreciation,
            round === "yes" ? 0 : 2
          );
          endBookValue = this.roundValue(
            asset - cDepreciation,
            round === "yes" ? 0 : 2
          );
          table += this.generateTableRow(
            startYear,
            asset1,
            rate1,
            depreciation,
            cDepreciation,
            endBookValue,
            hiddenCurrency
          );
        } else {
          table += this.generateTableRow(
            startYear,
            asset1,
            rate,
            depreciation,
            cDepreciation,
            endBookValue,
            hiddenCurrency
          );
        }

        des += depreciation + ",";
        bookDes += asset1 + ",";
        totalBookValue += endBookValue + ",";
        asset1 = asset - cDepreciation;
      }
    }

    this.param.table = table;
    this.param.des = des;
    this.param.book_des = bookDes;
    this.param.total_years = totalYears;
    this.param.total_book_value = totalBookValue;
    this.param.RESULT = 1;
    return this.param;
  }
  // Sum of Years Digits Method
  calculateSumOfYears(request, hiddenCurrency) {
    if (!this.validateInput(request, ["asset", "salvage", "year", "date"])) {
      this.param.error = "Please! Check Your Input";
      return this.param;
    }

    const { year, salvage, asset, date, conver, round } = request;
    let asset1 = asset;
    let depreciation = 0;
    let cDepreciation = 0;
    let table = "";
    let des = "";
    let bookDes = "";
    let totalYears = "";
    let totalBookValue = "";

    // Parse date - PHP format: MM-YYYY-DD or similar
    // So index[1] = YYYY, index[2] = MM/DD depending on format
    const dateArray = date.split("-");
    let startYear = parseInt(dateArray[1]); // Year from index 1 (like PHP)
    const startMonth = parseInt(dateArray[2]); // Month from index 2 (like PHP)

    // Calculate sum of years
    let sum = 0;
    for (let j = Number(year); j > 0; j--) {
      sum += j;
    }

    if (conver == "0") {
      for (let i = 0; i < year; i++) {
        const rate = this.roundValue(((year - i) / sum) * 100, 2);
        startYear = parseInt(dateArray[2]) + i; // Year calculation from dateArray[2]
        totalYears += startYear + ",";

        depreciation = this.calculateDepreciation(
          (asset - salvage) * (rate / 100),
          round
        );
        cDepreciation = this.roundValue(
          cDepreciation + depreciation,
          round == "yes" ? 0 : 2
        );
        let endBookValue = this.roundValue(
          asset - cDepreciation,
          round == "yes" ? 0 : 2
        );

        if (endBookValue < salvage) {
          endBookValue = salvage;
          cDepreciation = cDepreciation - depreciation;
          depreciation = asset1 - salvage;
          cDepreciation = cDepreciation + depreciation;
          rate = this.roundValue((depreciation / (asset - salvage)) * 100, 2);
        }

        if (i == year - 1 && endBookValue > salvage) {
          endBookValue = salvage;
          cDepreciation = cDepreciation - depreciation;
          depreciation = asset1 - salvage;
          cDepreciation = cDepreciation + depreciation;
          rate = this.roundValue((depreciation / (asset - salvage)) * 100, 2);
        }

        totalBookValue += endBookValue + ",";
        table += this.generateTableRow(
          startYear,
          asset1,
          rate,
          depreciation,
          cDepreciation,
          endBookValue,
          hiddenCurrency
        );
        des += depreciation + ",";
        bookDes += asset1 + ",";
        asset1 = asset - cDepreciation;
      }
    } else {
      const months = this.calculateMonths(conver, startMonth);
      for (let i = 0; i <= year; i++) {
        let rateCalc = ((year - i) / sum) * 100;
        console.log(rateCalc);
        let rate = this.roundValue(rateCalc, 2);
        startYear = parseInt(dateArray[2]) + i; // Year calculation from dateArray[2]
        totalYears += startYear + ",";

        if (i == 0) {
          // First year with partial depreciation
          cDepreciation = 0;
          rateCalc = ((year - i) / sum) * 100; // Recalculate without rounding
          const rate1 = this.roundValue((rateCalc / 12) * months, 2);
          depreciation = this.calculateDepreciation(
            (asset - salvage) * (rate1 / 100),
            round
          );
          cDepreciation = this.roundValue(
            cDepreciation + depreciation,
            round == "yes" ? 0 : 2
          );
          let endBookValue = this.roundValue(
            asset - cDepreciation,
            round == "yes" ? 0 : 2
          );

          table += this.generateTableRow(
            startYear,
            asset1,
            rate1,
            depreciation,
            cDepreciation,
            endBookValue,
            hiddenCurrency
          );
          des += depreciation + ",";
          bookDes += asset1 + ",";
          totalBookValue += endBookValue + ",";
          asset1 = asset - cDepreciation;
        } else {
          // Subsequent years - calculate fresh
          depreciation = this.calculateDepreciation(
            (asset - salvage) * (rate / 100),
            round
          );
          cDepreciation = this.roundValue(
            cDepreciation + depreciation,
            round == "yes" ? 0 : 2
          );
          let endBookValue = this.roundValue(
            asset - cDepreciation,
            round == "yes" ? 0 : 2
          );

          if (endBookValue < salvage) {
            endBookValue = salvage;
            depreciation = asset1 - salvage;
            cDepreciation = cDepreciation + depreciation;
            rate = this.roundValue((depreciation / (asset - salvage)) * 100, 2);
          }

          if (i == year) {
            if (endBookValue > salvage) {
              endBookValue = salvage;
              cDepreciation = cDepreciation - depreciation;
              depreciation = asset1 - salvage;
              cDepreciation = cDepreciation + depreciation;
              rate = this.roundValue(
                (depreciation / (asset - salvage)) * 100,
                2
              );
            }
          }

          table += this.generateTableRow(
            startYear,
            asset1,
            rate,
            depreciation,
            cDepreciation,
            endBookValue,
            hiddenCurrency
          );
          des += depreciation + ",";
          bookDes += asset1 + ",";
          totalBookValue += endBookValue + ",";
          asset1 = asset - cDepreciation;
        }
      }
    }

    this.param.table = table;
    this.param.des = des;
    this.param.book_des = bookDes;
    this.param.total_years = totalYears;
    this.param.total_book_value = totalBookValue;
    this.param.RESULT = 1;
    return this.param;
  }
  // Reducing Balance Method
  calculateReducing(request, hiddenCurrency) {
    if (!this.validateInput(request, ["asset", "salvage", "year", "date"])) {
      this.param.error = "Please! Check Your Input";
      return this.param;
    }

    const { year, salvage: rate, asset, date, conver, round } = request;
    let asset1 = asset;
    let depreciation = 0;
    let cDepreciation = 0;
    let table = "";
    let des = "";
    let bookDes = "";
    let totalYears = "";
    let totalBookValue = "";

    const dateArray = date.split("-");
    const startMonth = parseInt(dateArray[2]);
    let startYear = parseInt(dateArray[1]);

    if (conver == "0") {
      for (let i = 0; i < Number(year); i++) {
        startYear = parseInt(dateArray[2]) + i;
        totalYears += startYear + ",";

        depreciation = this.calculateDepreciation(asset1 * (rate / 100), round);
        cDepreciation = this.roundValue(
          cDepreciation + depreciation,
          round == "yes" ? 0 : 2
        );
        const endBookValue = this.roundValue(
          asset - cDepreciation,
          round == "yes" ? 0 : 2
        );

        totalBookValue += endBookValue + ",";
        table += this.generateTableRow(
          startYear,
          asset1,
          rate,
          depreciation,
          cDepreciation,
          endBookValue,
          hiddenCurrency
        );
        des += depreciation + ",";
        bookDes += asset1 + ",";
        asset1 = asset - cDepreciation;
      }
    } else {
      const months = this.calculateMonths(conver, startMonth);

      for (let i = 0; i < Number(year); i++) {
        startYear = parseInt(dateArray[2]) + i;
        totalYears += startYear + ",";

        depreciation = this.calculateDepreciation(asset1 * (rate / 100), round);
        cDepreciation = this.roundValue(
          cDepreciation + depreciation,
          round == "yes" ? 0 : 2
        );
        let endBookValue = this.roundValue(
          asset - cDepreciation,
          round == "yes" ? 0 : 2
        );

        if (i == 0) {
          cDepreciation = 0;
          const rate1 = this.roundValue((rate / 12) * months, 2);
          depreciation = this.calculateDepreciation(
            asset1 * (rate1 / 100),
            round
          );
          cDepreciation = this.roundValue(
            cDepreciation + depreciation,
            round == "yes" ? 0 : 2
          );
          endBookValue = this.roundValue(
            asset - cDepreciation,
            round == "yes" ? 0 : 2
          );
          table += this.generateTableRow(
            startYear,
            asset1,
            rate1,
            depreciation,
            cDepreciation,
            endBookValue,
            hiddenCurrency
          );
        } else {
          table += this.generateTableRow(
            startYear,
            asset1,
            rate,
            depreciation,
            cDepreciation,
            endBookValue,
            hiddenCurrency
          );
        }

        des += depreciation + ",";
        bookDes += asset1 + ",";
        totalBookValue += endBookValue + ",";
        asset1 = asset - cDepreciation;
      }
    }

    this.param.table = table;
    this.param.des = des;
    this.param.book_des = bookDes;
    this.param.total_years = totalYears;
    this.param.total_book_value = totalBookValue;
    this.param.RESULT = 1;
    return this.param;
  }
  // Unit of Production Method
  calculateUnitOfProduction(request, hiddenCurrency) {
    if (!this.validateInput(request, ["asset", "salvage", "u_of_p"])) {
      this.param.error = "Please! Check Your Input";
      return this.param;
    }

    const { asset, salvage, year, u_of_p } = request;

    const depreciableBase = asset - salvage;
    const depreciationPerUnit = depreciableBase / Number(year);
    const depreciationForPeriod = depreciationPerUnit * u_of_p;

    this.param.Depreciable_Base = this.formatNumber(depreciableBase);
    this.param.Depreciation_Per_Unit = this.formatNumber(depreciationPerUnit);
    this.param.Depreciation_for_Period = this.formatNumber(
      depreciationForPeriod
    );
    return this.param;
  }
  // Helper Methods
  validateInput(request, requiredFields) {
    for (const field of requiredFields) {
      if (
        request[field] === undefined ||
        request[field] === null ||
        request[field] === ""
      ) {
        return false;
      }
      // Check if numeric fields are actually numeric
      if (["asset", "salvage", "year", "Factor", "u_of_p"].includes(field)) {
        if (isNaN(parseFloat(request[field]))) {
          return false;
        }
      }
    }
    return true;
  }
  calculateMonths(conver, startMonth) {
    if (conver === "3") {
      return 12.5 - startMonth;
    }
    if (conver === "4") {
      return 13 - startMonth;
    }
    if (conver === "1") {
      if (startMonth <= 3) return 13 - 2.5;
      if (startMonth > 3 && startMonth <= 6) return 13 - 5.5;
      if (startMonth > 6 && startMonth <= 9) return 13 - 8.5;
      if (startMonth > 9 && startMonth <= 12) return 13 - 10.5;
    }
    if (conver === "2") {
      return 6;
    }
    return 12;
  }
  calculateDepreciation(value, round) {
    return round === "yes" ? Math.round(value) : this.roundValue(value, 2);
  }
  roundValue(value, decimals = 2) {
    return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
  }
  formatNumber(value) {
    return value.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  }
  generateTableRow(
    year,
    beginningValue,
    rate,
    depreciation,
    cumDepreciation,
    endingValue,
    currency
  ) {
    return `<tr>
          <td class="py-2 border-b">${year}</td>
          <td class="py-2 border-b">${currency} ${beginningValue}</td>
          <td class="py-2 border-b">${rate}%</td>
          <td class="py-2 border-b">${currency} ${depreciation}</td>
          <td class="py-2 border-b">${currency} ${cumDepreciation}</td>
          <td class="py-2 border-b">${currency} ${endingValue}</td>
        </tr>`;
  }

  /**
   * getCalculationCarDepreciationCalculator: Service Method
   * POST: /api/calculators-lol/car-depreciation-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationCarDepreciationCalculator(body) {
    let car_cost = body.tech_car_cost;
    let c_age = body.tech_c_age;
    let car_year = body.tech_car_year;
    let rate_level = body.tech_rate_level;
    let hiddent_currency = body.tech_hiddent_currency;

    let result = {};

    car_cost = parseFloat(car_cost);
    c_age = parseInt(c_age);
    car_year = parseInt(car_year);
    rate_level = String(rate_level).trim();
    hiddent_currency = String(hiddent_currency).trim();

    if (
      isNaN(car_cost) ||
      isNaN(c_age) ||
      isNaN(car_year) ||
      !rate_level ||
      isNaN(car_cost)
    ) {
      result.error = "Please! Check Your Input";
      return result;
    }

    let asset = car_cost;
    let asset1 = car_cost;
    let depreciation = 0;
    let c_depreciation = 0;
    let table = "";
    let total_years = "";
    let total_book_value = "";

    for (let i = 1; i <= car_year; i++) {
      let rate = 0;
      if (rate_level === "1") {
        rate = 21.4;
      } else if (rate_level === "2") {
        rate = 15.6;
      } else {
        rate = 10.4;
      }

      if (i === 1 && c_age === 0) {
        if (rate_level === "1") {
          rate = 35.0;
        } else if (rate_level === "2") {
          rate = 25.0;
        } else {
          rate = 16.0;
        }
      }

      total_years += i + ",";
      depreciation = parseFloat(((asset1 * rate) / 100).toFixed(2));
      c_depreciation = parseFloat((c_depreciation + depreciation).toFixed(2));
      let end_book_value = parseFloat((asset - c_depreciation).toFixed(2));
      total_book_value += end_book_value + ",";

      table += `<tr><td className="py-2 border-b">${i}</td><td className="py-2 border-b"> ${hiddent_currency} ${asset1}</td><td className="py-2 border-b">${rate}%</td><td className="py-2 border-b"> ${hiddent_currency} ${depreciation}</td><td className="py-2 border-b"> ${hiddent_currency} ${c_depreciation}</td><td className="py-2 border-b"> ${hiddent_currency} ${end_book_value}</td></tr>`;

      asset1 = asset - c_depreciation;
    }

    result.tech_table = table;
    result.tech_total_years = total_years;
    result.tech_total_book_value = total_book_value;

    return result;
  }

  /**
   * getCalculationPropertyDepreciationCalculator: Service Method
   * POST: /api/calculators-lol/property-depreciation-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationPropertyDepreciationCalculator(body) {
    let basis = body.tech_basis;
    let recovery = body.tech_recovery;
    let round = body.tech_round;
    let date1 = body.tech_date1;
    let hiddent_currency = body.tech_hiddent_currency;

    // Helper functions
    function isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function roundNumber(value, decimals) {
      return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
    }

    const result = {};

    // Validate inputs
    if (!isNumeric(basis) || !isNumeric(recovery) || !date1) {
      result.error = "Please! Check Your Input";
      return result;
    }

    const asset = parseFloat(basis);
    let asset1 = parseFloat(basis);
    let depreciation = 0;
    let c_depreciation = 0;
    let table = "";
    let total_years = [];
    let total_book_value = [];

    // Parse date (assuming format YYYY-MM-DD)
    const dateParts = date1.split("-");
    const startYear = parseInt(dateParts[0]);
    const startMonth = parseInt(dateParts[1]);

    for (let i = 0; i <= recovery; i++) {
      let rate = roundNumber(100 / recovery, 2);

      // First year partial calculation
      if (i === 0) {
        const months = 12.5 - startMonth;
        rate = rate / 12;
        rate = roundNumber(rate * months, 2);
      }

      const currentYear = startYear + i;
      total_years.push(currentYear);

      // Calculate depreciation based on rounding preference
      if (round === "yes") {
        depreciation = Math.round(asset * (rate / 100));
        c_depreciation = Math.round(c_depreciation + depreciation);
      } else {
        depreciation = roundNumber(asset * (rate / 100), 2);
        c_depreciation = roundNumber(c_depreciation + depreciation, 2);
      }

      let end_book_value =
        round === "yes"
          ? Math.round(asset - c_depreciation)
          : roundNumber(asset - c_depreciation, 2);

      // Handle negative book value
      if (end_book_value < 0) {
        end_book_value = 0;
        c_depreciation = c_depreciation - depreciation;
        depreciation = asset1;
        c_depreciation = c_depreciation + depreciation;
        rate = roundNumber((depreciation / asset) * 100, 2);
      }

      total_book_value.push(end_book_value);

      // Build HTML table row
      table += `<tr>
                    <td className="py-2 border-b">${currentYear}</td>
                    <td className="py-2 border-b">${hiddent_currency} ${asset1.toFixed(
        round === "yes" ? 0 : 2
      )}</td>
                    <td className="py-2 border-b">${rate}%</td>
                    <td className="py-2 border-b">${hiddent_currency} ${depreciation.toFixed(
        round === "yes" ? 0 : 2
      )}</td>
                    <td className="py-2 border-b">${hiddent_currency} ${c_depreciation.toFixed(
        round === "yes" ? 0 : 2
      )}</td>
                    <td className="py-2 border-b">${hiddent_currency} ${end_book_value.toFixed(
        round === "yes" ? 0 : 2
      )}</td>
                </tr>`;

      asset1 = asset - c_depreciation;
    }

    // Convert arrays to comma-separated strings
    result.tech_total_years = total_years.join(",");
    result.tech_total_book_value = total_book_value.join(",");
    result.tech_table = table;

    return result;
  }

  /**
   * getCalculationPaybackPeriodCalculator: Service Method
   * POST: /api/calculators-lol/payback-period-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationPaybackPeriodCalculator(body) {
    let unit_type = body.tech_unit_type;
    let initial = body.tech_initial;
    let cash = body.tech_cash;
    let in_de = body.tech_in_de;
    let year = body.tech_year_first;
    let discount = body.tech_discount;
    let add_sub = body.tech_add_sub;
    let initial2 = body.tech_initial2;
    let discount2 = body.tech_discount2;
    let count = body.tech_count;
    let currency = body.tech_currency;
    let currency1 = body.tech_currency1;

    let result = {};
    let param = {};

    if (unit_type === "same") {
      if (
        typeof initial === "number" &&
        typeof cash === "number" &&
        typeof in_de === "number" &&
        typeof year === "number" &&
        typeof discount === "number"
      ) {
        if (year <= 100) {
          let total = initial;
          let cdcf = initial * -1;
          let cdcf_ = initial * -1;
          let table = "";
          let com = 0;
          let back = 0;
          let dis_back = 0;

          let currentCash = cash;
          for (let i = 1; i <= year; i++) {
            if (i !== 1) {
              if (add_sub === "in") {
                currentCash += currentCash * (in_de / 100);
              } else {
                currentCash -= currentCash * (in_de / 100);
              }
            }
            const pv = currentCash / Math.pow(1 + discount / 100, i);
            com += pv;
            table += `<tr><td className='py-2 border-b'>Year ${i}</td><td className='py-2 border-b'>${currency} ${currentCash.toFixed(
              2
            )}</td><td className='py-2 border-b'>${currency} ${(
              cdcf + currentCash
            ).toFixed(
              2
            )}</td><td className='py-2 border-b'>${currency} ${pv.toFixed(
              2
            )}</td><td className='py-2 border-b'>${currency} ${(
              cdcf_ + pv
            ).toFixed(2)}</td></tr>`;
            cdcf += currentCash;
            cdcf_ += pv;
          }
          com /= year;
          const percent = ((com / total) * 100).toFixed(3);

          // Calculate payback period
          let i = 1;
          currentCash = cash;
          cdcf = 0;
          cdcf_ = 0;

          while (initial > cdcf_) {
            if (i !== 1) {
              if (add_sub === "in") {
                currentCash = currentCash + currentCash * (in_de / 100);
              } else {
                currentCash = currentCash - currentCash * (in_de / 100);
              }
            }
            const pv = currentCash / Math.pow(1 + discount / 100, i);
            cdcf_ += pv;
            if (cdcf_ >= initial && !dis_back) {
              const A = i - 1;
              const B = initial - (cdcf_ - pv);
              const C = pv;
              dis_back = (A + B / C).toFixed(3);
            }
            i++;
          }

          // Calculate non-discounted payback period
          i = 1;
          currentCash = cash;
          cdcf = 0;

          while (initial > cdcf) {
            if (i !== 1) {
              if (add_sub === "in") {
                currentCash = currentCash + currentCash * (in_de / 100);
              } else {
                currentCash = currentCash - currentCash * (in_de / 100);
              }
            }
            cdcf += currentCash;
            if (cdcf >= initial && !back) {
              const A = i - 1;
              const B = initial - (cdcf - currentCash);
              const C = currentCash;
              back = (A + B / C).toFixed(3);
            }
            i++;
          }

          result = {
            tech_back: back,
            tech_same: back,
            tech_percent: percent,
            tech_total: total,
            tech_dis_back: dis_back,
            tech_table: table,
          };
        } else {
          result.error =
            "Please provide a positive number of years that is 100 or less.";
        }
      } else {
        result.error = "Please! Check Your Input ";
      }
    } else if (unit_type === "not_same") {
      if (!isNaN(body.tech_initial2) && !isNaN(body.tech_discount2)) {
        const total = Number(body.tech_initial2);
        const discount = Number(body.tech_discount2);

        let cdcf = total * -1;
        let cdcf_ = total * -1;

        const put_input = {
          initial2: body.tech_initial2,
          discount2: body.tech_discount2,
          count: body.tech_count,
          time: new Date().toLocaleString("en-GB", {
            timeZone: "Asia/Karachi",
          }),
        };
        const save_input = [put_input];

        let table = "";
        let ave = 0;
        let total_back = 0;
        let distotal_back = 0;
        let ave_dis = 0;
        let ave_i = 0;
        let back, dis_back;
        let back_check = false;
        let dis_back_check = false;

        for (let i = 1; i <= body.tech_count; i++) {
          if (!isNaN(i)) {
            const cash = i;
            ave += cash;
            ave_i++;

            const pv = cash / Math.pow(1 + discount / 100, i);
            ave_dis += pv;

            table += `<tr><td className='py-2 border-b'>Year ${i}</td><td className='py-2 border-b'>${
              body.tech_currency1
            }${cash.toFixed(2)}</td><td className='py-2 border-b'>${
              body.tech_currency1
            }${(cdcf + cash).toFixed(2)}</td><td className='py-2 border-b'>${
              body.tech_currency1
            }${pv.toFixed(2)}</td><td className='py-2 border-b'>${
              body.tech_currency1
            }${(cdcf_ + pv).toFixed(2)}</td></tr>`;

            cdcf += cash;
            total_back += cash;

            if (cdcf >= 0 && back === undefined) {
              const A = i - 1;
              const B = total - (total_back - cash);
              const C = cash;
              back = +(A + B / C).toFixed(3);
              back_check = true;
            }

            cdcf_ += pv;
            distotal_back += pv;

            if (cdcf_ >= 0 && dis_back === undefined) {
              const A = i - 1;
              const B = total - (distotal_back - pv);
              const C = pv;
              dis_back = +(A + B / C).toFixed(3);
              dis_back_check = true;
            }
          }
        }

        let ave_cash = ave_i === 0 ? 0 : +(ave / ave_i).toFixed(2);
        let ave_cash_d = ave_i === 0 ? 0 : +(ave_dis / ave_i).toFixed(2);

        if (!dis_back_check) {
          param["dis_not_back"] = true;
          let i = 1;
          let temp_cdcf = 0;

          while (total > temp_cdcf) {
            temp_cdcf += ave_cash_d;
            if (temp_cdcf >= total) {
              const A = i - 1;
              const B = total - (temp_cdcf - ave_cash_d);
              const C = ave_cash_d;
              dis_back = +(A + B / C).toFixed(3);
            }
            i++;
          }
        }

        if (!back_check) {
          param["not_back"] = true;
          let i = 1;
          let temp_cdcf = 0;

          while (total > temp_cdcf) {
            temp_cdcf += ave_cash;
            if (temp_cdcf >= total) {
              const A = i - 1;
              const B = total - (temp_cdcf - ave_cash);
              const C = ave_cash;
              back = +(A + B / C).toFixed(3);
            }
            i++;
          }
        }

        param["tech_ave_i"] = ave_i;
        param["tech_ave_cash"] = ave_cash;
        param["tech_ave_cash_d"] = ave_cash_d;
        param["tech_back"] = back;
        param["tech_total"] = total;
        param["tech_dis_back"] = dis_back;
        param["tech_table"] = table;
        return param;
      } else {
        param["error"] = "Please! Check Your Input";
        return param;
      }
    }
    return result;
  }

  /**
   * getCalculationBasisPontCalculator: Service Method
   * POST: /api/calculators-lol/basis-point-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationBasisPontCalculator(body) {
    let dec = body.tech_dec;
    let percent = body.tech_percent;
    let perm = body.tech_perm;
    let bsp = body.tech_bsp;
    let unit_type = body.tech_unit_type;
    let bps1 = body.tech_bps1;
    let bps_unit = body.tech_bps_unit;
    let of = body.tech_of;
    let equals = body.tech_equals;

    let param = {};

    if (bps_unit === "decimal") {
      bps_unit = "1";
    } else if (bps_unit === "percent") {
      bps_unit = "2";
    } else if (bps_unit === "permil") {
      bps_unit = "3";
    } else if (bps_unit === "bps") {
      bps_unit = "4";
    }

    if (unit_type === "submit") {
      if (!isNaN(dec) && percent === "" && perm === "" && bsp === "") {
        percent = dec * 100;
        perm = dec * 1000;
        bsp = dec * 10000;
        param.tech_percent = percent;
        param.tech_perm = perm;
        param.tech_bsp = bsp;
        param.tech_ans = 1;
        return param;
      } else if (dec === "" && !isNaN(percent) && perm === "" && bsp === "") {
        dec = percent / 100;
        perm = percent * 10;
        bsp = percent * 100;
        param.tech_dec = dec;
        param.tech_perm = perm;
        param.tech_bsp = bsp;
        param.tech_ans = 2;
        return param;
      } else if (dec === "" && percent === "" && !isNaN(perm) && bsp === "") {
        dec = perm / 1000;
        percent = perm / 10;
        bsp = perm * 10;
        param.tech_dec = dec;
        param.tech_percent = percent;
        param.tech_bsp = bsp;
        param.tech_ans = 3;
        return param;
      } else if (dec === "" && percent === "" && perm === "" && !isNaN(bsp)) {
        dec = bsp / 10000;
        percent = bsp / 100;
        perm = bsp / 10;
        param.tech_dec = dec;
        param.tech_perm = perm;
        param.tech_percent = percent;
        param.tech_ans = 4;
        return param;
      } else {
        param.error = "Please! Check Your Input";
        return param;
      }
    } else if (unit_type === "submit1") {
      if (!isNaN(bps1) && !isNaN(of) && equals === "") {
        if (bps_unit === "1") {
          bps1 = bps1 * 10000;
        } else if (bps_unit === "2") {
          bps1 = bps1 * 100;
        } else if (bps_unit === "3") {
          bps1 = bps1 * 10;
        }

        equals = (bps1 * of) / 10000;
        param.tech_equals = equals;
        param.tech_of = of;
        param.tech_bps1 = bps1;
        param.tech_ans = 5;
        return param;
      } else if (!isNaN(bps1) && of === "" && !isNaN(equals)) {
        if (bps_unit === "1") {
          bps1 = bps1 * 10000;
        } else if (bps_unit === "2") {
          bps1 = bps1 * 100;
        } else if (bps_unit === "3") {
          bps1 = bps1 * 10;
        }
        of = (equals * 10000) / bps1;
        param.tech_equals = equals;
        param.tech_of = of;
        param.tech_bps1 = bps1;
        param.tech_ans = 5;
        return param;
      } else if (bps1 === "" && !isNaN(of) && !isNaN(equals)) {
        bps1 = (equals * 10000) / of;
        param.tech_equals = equals;
        param.tech_of = of;
        param.tech_bps1 = bps1;
        param.tech_ans = 5;
        return param;
      } else {
        param.error = "Please! Check Your Input";
        return param;
      }
    }
  }

  /**
   * getCalculationWeddingBudgetCalculator: Service Method
   * POST: /api/calculators-lol/wedding-budget-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationWeddingBudgetCalculator(body) {
    let spend = body.tech_spend ? parseFloat(body.tech_spend) : 0;
    let guest = body.tech_guest ? parseFloat(body.tech_guest) : 0;
    let dress = body.tech_dress ? parseFloat(body.tech_dress) : 0;
    let jewelery = body.tech_jewelery ? parseFloat(body.tech_jewelery) : 0;
    let accessories = body.tech_accessories
      ? parseFloat(body.tech_accessories)
      : 0;
    let ring = body.tech_ring ? parseFloat(body.tech_ring) : 0;
    let makeup = body.tech_makeup ? parseFloat(body.tech_makeup) : 0;
    let stationery = body.tech_stationery
      ? parseFloat(body.tech_stationery)
      : 0;
    let photography = body.tech_photography
      ? parseFloat(body.tech_photography)
      : 0;
    let florist = body.tech_florist ? parseFloat(body.tech_florist) : 0;
    let planner = body.tech_planner ? parseFloat(body.tech_planner) : 0;
    let venue = body.tech_venue ? parseFloat(body.tech_venue) : 0;
    let dinner = body.tech_dinner ? parseFloat(body.tech_dinner) : 0;
    let catering = body.tech_catering ? parseFloat(body.tech_catering) : 0;
    let cake = body.tech_cake ? parseFloat(body.tech_cake) : 0;
    let DJs = body.tech_DJs ? parseFloat(body.tech_DJs) : 0;
    let liquors = body.tech_liquors ? parseFloat(body.tech_liquors) : 0;
    let ceremony = body.tech_ceremony ? parseFloat(body.tech_ceremony) : 0;
    let officiant = body.tech_officiant ? parseFloat(body.tech_officiant) : 0;
    let hotel = body.tech_hotel ? parseFloat(body.tech_hotel) : 0;
    let transportation = body.tech_transportation
      ? parseFloat(body.tech_transportation)
      : 0;
    let other = body.tech_other ? parseFloat(body.tech_other) : 0;
    let clickvalue1 = body.tech_clickvalue1
      ? parseFloat(body.tech_clickvalue1)
      : 0;
    let clickvalue2 = body.tech_clickvalue2
      ? parseFloat(body.tech_clickvalue2)
      : 0;
    let clickvalue3 = body.tech_clickvalue3
      ? parseFloat(body.tech_clickvalue3)
      : 0;
    let clickvalue4 = body.tech_clickvalue4
      ? parseFloat(body.tech_clickvalue4)
      : 0;
    let clickvalue5 = body.tech_clickvalue5
      ? parseFloat(body.tech_clickvalue5)
      : 0;

    let param = {};

    if (!isNaN(spend) && !isNaN(guest) && guest !== 0) {
      let bride_groom = dress + jewelery + accessories + ring + makeup;
      let sub_contractors = stationery + photography + florist + planner;
      let food_drinks = venue + dinner + catering + cake + DJs + liquors;
      let ceremony_total = ceremony + officiant;
      let trans_accomo = hotel + transportation;
      let total =
        bride_groom +
        sub_contractors +
        food_drinks +
        ceremony_total +
        trans_accomo;
      let average_cost = (total + other) / guest;
      let budget_balance = spend - total;

      param = {
        tech_average_cost: average_cost,
        tech_budget_balance: budget_balance,
        tech_bride_groom: bride_groom,
        tech_sub_contractors: sub_contractors,
        tech_food_drinks: food_drinks,
        tech_ceremony_total: ceremony_total,
        tech_trans_accomo: trans_accomo,
        tech_other: other,
        tech_spend: spend,
        tech_dress: dress,
        tech_jewelery: jewelery,
        tech_accessories: accessories,
        tech_ring: ring,
        tech_makeup: makeup,
        tech_clickvalue1: clickvalue1,
        tech_clickvalue2: clickvalue2,
        tech_clickvalue3: clickvalue3,
        tech_clickvalue4: clickvalue4,
        tech_clickvalue5: clickvalue5,
      };
    } else {
      param = {
        error: "Please fill all fields.",
      };
    }

    return param;
  }

  /**
   * getCalculationEmloyeeCostCalculator: Service Method
   * POST: /api/calculators-lol/employee-cost-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationEmloyeeCostCalculator(body) {
    let unit_type = body.tech_unit_type;
    let rate = body.tech_rate;
    let hour_worked = body.tech_hour_worked;
    let month = body.tech_month;
    let benefits = body.tech_benefits ?? 0; // if null or undefined, default to 0
    let health = body.tech_health ?? 0;
    let dental = body.tech_dental ?? 0;
    let vision = body.tech_vision ?? 0;
    let perk_name = body.tech_perk_name; // assume array
    let annual_contribution = body.tech_annual_contribution; // assume array

    rate = parseFloat(rate);
    hour_worked = parseFloat(hour_worked);
    month = parseFloat(month);
    benefits = parseFloat(benefits);
    health = parseFloat(health);
    dental = parseFloat(dental);
    vision = parseFloat(vision);

    let param = {};

    function calculatePerk(perk_name, annual_contribution) {
      let perk = 0;
      let name_array = [];
      let perk_val = [];

      for (
        let i = 0;
        i < perk_name.length && i < annual_contribution.length;
        i++
      ) {
        name_array.push(perk_name[i]);
        perk_val.push(parseFloat(annual_contribution[i]));
        perk += parseFloat(annual_contribution[i]);
      }
      return [name_array, perk, perk_val];
    }

    if (unit_type === "hourly") {
      if (!isNaN(rate) && !isNaN(hour_worked) && !isNaN(month)) {
        let emp_rate = rate * 4.66484 * hour_worked * month;
        let emp_h_r = emp_rate + benefits + health + dental + vision;

        if (perk_name && annual_contribution) {
          const [name_array, perk, perk_val] = calculatePerk(
            perk_name,
            annual_contribution
          );
          param.tech_perk_array = name_array;
          param.tech_perk = perk;
          param.tech_perk_val = perk_val;
          param.tech_emp_h_r_p = emp_h_r + perk;
        }

        param.tech_emp_h_r = emp_h_r;
        param.tech_rate = rate;
        param.tech_hour_worked = hour_worked;
        param.tech_benefits = benefits;
        param.tech_health = health;
        param.tech_dental = dental;
        param.tech_vision = vision;
        param.tech_month = month;
        param.tech_emp_rate = emp_rate;
      } else {
        param.error = "Please Enter valid values.";
        return param;
      }
    } else if (unit_type === "salary") {
      if (!isNaN(rate) && !isNaN(month)) {
        let per_anum = rate * 0.0765;
        let anual_salary =
          per_anum + rate + benefits + health + dental + vision;

        if (perk_name && annual_contribution) {
          const [name_array, perk, perk_val] = calculatePerk(
            perk_name,
            annual_contribution
          );
          param.tech_perk_array = name_array;
          param.tech_perk = perk;
          param.tech_perk_val = perk_val;
          param.tech_emp_h_r_p = anual_salary + perk;
        }

        param.tech_anual_salary = anual_salary;
        param.tech_rate = rate;
        param.tech_per_anum = per_anum;
        param.tech_benefits = benefits;
        param.tech_health = health;
        param.tech_dental = dental;
        param.tech_vision = vision;
      } else {
        param.error = "Please Enter valid values.";
        return param;
      }
    } else {
      param.error = "Invalid unit type.";
      return param;
    }

    param.tech_submit = unit_type;
    return param;
  }

  /**
   * getCalculationNPVCalculator: Service Method
   * POST: /api/calculators-lol/npv-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationNPVCalculator(body) {
    let initial = body.tech_initial;
    let discount = body.tech_discount;
    let year = body.tech_year; // year should be an array of values

    let param = {}; // to store and return results

    if (
      typeof initial === "number" &&
      typeof discount === "number" &&
      Array.isArray(year)
    ) {
      discount = discount / 100;
      let all_npv = [];

      for (let i = 1; i <= year.length; i++) {
        let npv_btm = Math.pow(1 + discount, i);
        all_npv.push(year[i - 1] / npv_btm);
      }

      let npv_ans = all_npv.reduce((a, b) => a + b, 0) - initial;
      let total_return = year.reduce((a, b) => a + b, 0) - initial;
      let gross_return = (total_return / initial) * 100;
      let net_cash_flow = (initial / 100) * gross_return;

      // DataPoints for Chart
      let dataPoints = year.map((value, index) => ({
        y: parseInt(value),
        label: `Year ${index + 1}`,
      }));

      param.tech_npv_ans = parseFloat(npv_ans.toFixed(2));
      param.tech_gross_return = parseFloat(gross_return.toFixed(2));
      param.tech_net_cash_flow = parseFloat(net_cash_flow.toFixed(2));
      param.tech_dataPoints = dataPoints;
      param.tech_year = year;
      param.tech_arrayLength = year.length;
    } else {
      param.error = "Please fill all fields correctly.";
      return param;
    }

    return param;
  }

  /**
   * getCalculationMoneyCounterCalculator: Service Method
   * POST: /api/calculators-lol/money-counter-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationMoneyCounterCalculator(body) {
    const param = {};

    // Extract parameters from body
    const currency = body.tech_currency;
    const checkbox1 = body.tech_checkbox1 || false;
    const checkbox2 = body.tech_checkbox2 || false;
    const checkbox3 = body.tech_checkbox3 || false;
    const bank_notes = body.tech_bank_notes || false;
    const coins = body.tech_coins || false;
    const rolls = body.tech_rolls || false;

    // Initialize arrays
    let note_total = [];
    let note_quantity = [];
    let note_input = [];
    let coins_total = [];
    let coins_quantity = [];
    let coins_input = [];
    let rolls_total = [];
    let rolls_quantity = [];
    let rolls_input = [];
    let rolls_count_ans = [];

    // Define currency configurations
    let note_values, coins_values, rolls_values, rolls_count, ans_currency;

    switch (currency) {
      case "USD":
        note_values = ["1", "2", "5", "10", "20", "50", "100"];
        coins_values = ["0.01", "0.05", "0.10", "0.25", "0.50", "1.00"];
        rolls_values = ["0.01", "0.05", "0.10", "0.25", "0.50", "1.00"];
        rolls_count = ["50", "40", "50", "40", "20", "25"];
        ans_currency = "$";
        break;
      case "EUR":
        note_values = ["5", "10", "20", "50", "100", "200", "500"];
        coins_values = [
          "0.01",
          "0.02",
          "0.05",
          "0.10",
          "0.20",
          "0.50",
          "1.00",
          "2.00",
        ];
        rolls_values = [
          "0.01",
          "0.02",
          "0.05",
          "0.10",
          "0.20",
          "0.50",
          "1.00",
          "2.00",
        ];
        rolls_count = ["50", "50", "50", "40", "40", "40", "25", "25"];
        ans_currency = "€";
        break;
      case "JPY":
        note_values = ["1000", "2000", "5000", "10000"];
        coins_values = ["1.00", "5.00", "10.00", "50.00", "100.00", "500.00"];
        rolls_values = ["1.00", "5.00", "10.00", "50.00", "100.00", "500.00"];
        rolls_count = ["50", "50", "50", "50", "50", "50"];
        ans_currency = "¥";
        break;
      case "GBP":
        note_values = ["5", "10", "20", "50"];
        coins_values = [
          "0.01",
          "0.02",
          "0.05",
          "0.10",
          "0.20",
          "0.50",
          "1.00",
          "2.00",
        ];
        rolls_values = [
          "0.01",
          "0.02",
          "0.05",
          "0.10",
          "0.20",
          "0.50",
          "1.00",
          "2.00",
        ];
        rolls_count = ["100", "50", "100", "50", "50", "20", "20", "10"];
        ans_currency = "£";
        break;
      case "AUD":
        note_values = ["5", "10", "20", "50", "100"];
        coins_values = ["0.05", "0.10", "0.20", "0.50", "2.00"];
        rolls_values = ["0.05", "0.10", "0.20", "0.50", "1.00", "2.00"];
        rolls_count = ["40", "40", "20", "20", "20", "25"];
        ans_currency = "$";
        break;
      case "CAD":
        note_values = ["1", "5", "10", "20", "50", "100"];
        coins_values = ["0.01", "0.05", "0.10", "0.25", "0.50", "1.00", "2.00"];
        rolls_values = ["0.01", "0.05", "0.10", "0.25", "0.50", "1.00", "2.00"];
        rolls_count = ["50", "40", "50", "40", "25", "25", "25"];
        ans_currency = "$";
        break;
      case "CHF":
        note_values = ["10", "20", "50", "100", "200", "1000"];
        coins_values = ["0.05", "0.10", "0.20", "0.50", "1.00", "2.00", "5.00"];
        rolls_values = ["0.05", "0.10", "0.20", "0.50", "1.00", "2.00", "5.00"];
        rolls_count = ["50", "50", "50", "50", "50", "50", "50"];
        ans_currency = "fr";
        break;
      case "SEK":
        note_values = ["20", "50", "100", "200", "500", "1000"];
        coins_values = ["1.00", "2.00", "5.00", "10.00"];
        rolls_values = ["1.00", "2.00", "5.00", "10.00"];
        rolls_count = ["50", "50", "40", "25"];
        ans_currency = "kr";
        break;
      case "MXN":
        note_values = ["20", "50", "100", "200", "500", "1000"];
        coins_values = [
          "0.05",
          "0.10",
          "0.20",
          "0.50",
          "1.00",
          "2.00",
          "5.00",
          "10.00",
          "20.00",
        ];
        ans_currency = "$";
        break;
      case "NZD":
        note_values = ["10", "20", "50", "100"];
        coins_values = ["0.10", "0.20", "0.50", "1.00", "2.00"];
        rolls_values = ["0.10", "0.20", "0.50", "1.00", "2.00"];
        rolls_count = ["50", "25", "20", "25", "25"];
        ans_currency = "$";
        break;
      case "INR":
        note_values = ["2", "5", "10", "20", "50", "100", "200", "500", "2000"];
        coins_values = ["0.50", "1.00", "2.00", "5.00", "10.00", "20.00"];
        rolls_values = ["0.50", "1.00", "2.00", "5.00", "10.00", "20.00"];
        rolls_count = ["100", "100", "100", "100", "100", "100"];
        ans_currency = "₹";
        break;
      default:
        note_values = ["20", "50", "100", "200", "500", "1000"];
        coins_values = [
          "0.01",
          "0.05",
          "0.10",
          "0.25",
          "1.00",
          "5.00",
          "10.00",
          "20.00",
        ];
        ans_currency = "₱";
    }

    // Process bank notes - ONLY if checkbox1 is true
    if (checkbox1 != false && checkbox1 != "false") {
      const noteOneNotEmpty =
        bank_notes &&
        bank_notes.some((element) => element !== "" && element != null);
      if (!noteOneNotEmpty) {
        param.error = "Please fill all fields.";
        return param;
      }

      // Calculate bank notes totals
      note_values.forEach((value, key) => {
        if (bank_notes && bank_notes[key] && !isNaN(bank_notes[key])) {
          note_total.push(parseFloat(value) * parseFloat(bank_notes[key]));
          note_quantity.push(value);
          note_input.push(bank_notes[key]);
        }
      });
    } else {
      // If checkbox1 is false, skip bank notes calculations
      note_total = [];
      note_quantity = [];
      note_input = [];
    }

    // Process coins - ONLY if checkbox2 is true
    if (checkbox2 != false && checkbox2 != "false") {
      const coinsOneNotEmpty =
        coins && coins.some((element) => element !== "" && element != null);
      if (!coinsOneNotEmpty) {
        param.error = "Please fill all fields.";
        return param;
      }

      // Calculate coins totals
      coins_values.forEach((value, key) => {
        if (coins && coins[key] && !isNaN(coins[key])) {
          coins_total.push(parseFloat(value) * parseFloat(coins[key]));
          coins_quantity.push(value);
          coins_input.push(coins[key]);
        }
      });
    } else {
      // If checkbox2 is false, skip coins calculations
      coins_total = [];
      coins_quantity = [];
      coins_input = [];
    }

    // Process rolls for supported currencies ONLY if checkbox3 is true
    const supportedCurrencies = [
      "USD",
      "EUR",
      "JPY",
      "GBP",
      "AUD",
      "CAD",
      "CHF",
      "SEK",
      "NZD",
      "INR",
    ];

    if (
      supportedCurrencies.includes(currency) &&
      checkbox3 !== false &&
      checkbox3 !== "false"
    ) {
      const rollsOneNotEmpty =
        rolls && rolls.some((element) => element !== "" && element != null);
      if (!rollsOneNotEmpty) {
        param.error = "Please fill all fields.";
        return param;
      }

      if (rolls_values) {
        rolls_values.forEach((value, key) => {
          if (rolls && rolls[key] && !isNaN(rolls[key])) {
            rolls_total.push(
              parseFloat(value) *
                parseFloat(rolls[key]) *
                parseFloat(rolls_count[key])
            );
            rolls_quantity.push(value);
            rolls_input.push(rolls[key]);
            rolls_count_ans.push(rolls_count[key]);
          }
        });
      }

      param.tech_rolls_total = rolls_total;
      param.tech_rolls_quantity = rolls_quantity;
      param.tech_rolls_input = rolls_input;
      if (rolls_count_ans.length > 0) {
        param.rolls_count_ans = rolls_count_ans;
      }
    } else {
      // If checkbox3 is false or currency not supported, set empty arrays
      param.tech_rolls_total = [];
      param.tech_rolls_quantity = [];
      param.tech_rolls_input = [];
    }

    // Calculate total money
    const total_money =
      coins_total.reduce((a, b) => a + b, 0) +
      note_total.reduce((a, b) => a + b, 0) +
      rolls_total.reduce((a, b) => a + b, 0);

    // Set response parameterstech_
    param.tech_total_money = Math.round(total_money * 100) / 100;
    param.tech_note_total = note_total;
    param.tech_note_quantity = note_quantity;
    param.tech_note_input = note_input;
    param.tech_coins_total = coins_total;
    param.tech_coins_quantity = coins_quantity;
    param.tech_coins_input = coins_input;
    param.tech_ans_currency = ans_currency;

    // Convert checkbox values to match Laravel format
    param.tech_checkbox1 =
      checkbox1 == true || checkbox1 == "true" || checkbox1 == "1"
        ? "1"
        : false;
    param.tech_checkbox2 =
      checkbox2 == true || checkbox2 == "true" || checkbox2 == "1"
        ? "1"
        : false;
    param.tech_checkbox3 =
      checkbox3 == true || checkbox3 == "true" || checkbox3 == "1"
        ? "1"
        : false;

    param.tech_currency = currency;

    return param;
  }

  /**
   * getCalculationCostBasisCalculator: Service Method
   * POST: /api/calculators-lol/cost-basis-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationCostBasisCalculator(body) {
    const { tech_stock, tech_shares, tech_prices } = body;

    const shares_values = [];
    const prices_values = [];
    const upr = [];

    if (Array.isArray(tech_shares) && Array.isArray(tech_prices)) {
      for (let i = 0; i < tech_shares.length; i++) {
        const share = tech_shares[i];
        const price = tech_prices[i];

        if (
          isFinite(share) &&
          isFinite(price) &&
          share !== null &&
          price !== null
        ) {
          shares_values.push(Number(share));
          prices_values.push(Number(price));
          upr.push(share * price);
        }
      }

      if (shares_values.length >= 2 && prices_values.length >= 2) {
        const total_shares = shares_values.reduce((a, b) => a + b, 0);
        const cost_basis = upr.reduce((a, b) => a + b, 0) / total_shares;
        const stock_profit = (tech_stock - cost_basis) * total_shares;
        const percentage = ((tech_stock - cost_basis) / cost_basis) * 100;

        return {
          tech_cost_basis: +cost_basis.toFixed(2),
          tech_stock_profit: +stock_profit.toFixed(2),
          tech_percentage: +percentage.toFixed(2),
          total_shares,
          shares_values,
          prices_values,
          tech_arrayLengthshere: shares_values.length + 1,
          tech_arrayLengthprice: prices_values.length + 1,
        };
      } else {
        return {
          error: "At least two stock purchases are required.",
          tech_shares: tech_shares,
          tech_prices: tech_prices,
        };
      }
    } else {
      return {
        error: "Shares and prices must be arrays.",
      };
    }
  }

  /**
   * getCalculationdisCountedCashFlowCalculator: Service Method
   * POST: /api/calculators-lol/discounted-cash-flow-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationdisCountedCashFlowCalculator(body) {
    const param = {};

    // Extract parameters from body
    const main_unit = body.tech_main_unit?.trim();
    const input = body.tech_input || [];
    const cash = parseFloat(body.tech_cash?.trim()) || 0;
    const outstanding = parseFloat(body.tech_outstanding?.trim()) || 0;
    const perpetual = parseFloat(body.tech_perpetual?.trim()) || 0;
    const wacc = parseFloat(body.tech_wacc?.trim()) || 0;
    const shares = parseFloat(body.tech_shares?.trim()) || 0;
    const price = parseFloat(body.tech_price?.trim()) || 0;
    const earnings = parseFloat(body.tech_earnings?.trim()) || 0;
    const discount = parseFloat(body.tech_discount?.trim()) || 0;
    const growth = parseFloat(body.tech_growth?.trim()) || 0;
    const growth_time = parseFloat(body.tech_growth_time?.trim()) || 0;
    const growth_time_one = parseFloat(body.tech_growth_time_one?.trim()) || 0;
    const growth_time_sec = parseFloat(body.tech_growth_time_sec?.trim()) || 0;
    const growth_unit = body.tech_growth_unit?.trim();
    const terminal = parseFloat(body.tech_terminal?.trim()) || 0;
    const terminal_time = parseFloat(body.tech_terminal_time?.trim()) || 0;
    const terminal_one = parseFloat(body.tech_terminal_one?.trim()) || 0;
    const terminal_sec = parseFloat(body.tech_terminal_sec?.trim()) || 0;
    const terminal_unit = body.tech_terminal_unit?.trim();

    if (main_unit == "Earnings per share (EPS)") {
      // Validation for EPS calculations
      if (
        (!growth_time_one && !growth_time_sec) ||
        (!terminal_one && !terminal_sec)
      ) {
        param.error = "Please! Enter Input.";
        return param;
      }

      let growth_time_final = growth_time_one || 0;
      let terminal_time_final = terminal_one || 0;

      // Handle growth time conversion
      if (growth_unit == "yrs/mos") {
        growth_time_final =
          (growth_time_one || 0) + (growth_time_sec || 0) / 12;
      } else if (growth_unit == "mos") {
        growth_time_final = (growth_time || 0) / 12;
      } else {
        growth_time_final = growth_time || 0;
      }

      // Handle terminal time conversion
      if (terminal_unit == "yrs/mos") {
        terminal_time_final = (terminal_one || 0) + (terminal_sec || 0) / 12;
      } else if (terminal_unit == "mos") {
        terminal_time_final = (terminal_time || 0) / 12;
      } else {
        terminal_time_final = terminal_time || 0;
      }

      // Validate numeric inputs
      if (
        !isNaN(earnings) &&
        !isNaN(discount) &&
        !isNaN(growth) &&
        !isNaN(growth_time_final) &&
        !isNaN(terminal) &&
        !isNaN(terminal_time_final)
      ) {
        if (discount == 0) {
          param.error = "discount rate Value is greater than or not equal to.";
          return param;
        }

        // Calculate coefficient
        const coefficient = (1 + growth / 100) / (1 + discount / 100);

        // Growth value calculation
        const groeth_answer =
          (earnings *
            coefficient *
            (1 - Math.pow(coefficient, growth_time_final))) /
          (1 - coefficient);

        // Terminal value calculation
        const coefficient_b = (1 + terminal / 100) / (1 + discount / 100);
        const terminal_answer =
          (earnings *
            Math.pow(coefficient, growth_time_final) *
            coefficient_b *
            (1 - Math.pow(coefficient_b, terminal_time_final))) /
          (1 - coefficient_b);

        // Total intrinsic value
        const Total_intrinsic_answer = groeth_answer + terminal_answer;

        // Set response parameters
        param.tech_groeth_answer = groeth_answer;
        param.tech_terminal_answer = terminal_answer;
        param.tech_Total_intrinsic_answer = Total_intrinsic_answer;
        param.tech_main_unit = main_unit;
        param.tech_growth_unit = growth_unit;
        param.tech_terminal_unit = terminal_unit;
        param.tech_input = input;
        param.tech_length = input.length + 1;

        return param;
      } else {
        param.error = "Please! Check Your Input.";
        return param;
      }
    } else {
      // FCFF (Free Cash Flow to Firm) calculations
      if (
        !isNaN(cash) &&
        !isNaN(outstanding) &&
        !isNaN(perpetual) &&
        !isNaN(wacc) &&
        !isNaN(shares) &&
        !isNaN(price) &&
        !isNaN(growth_time_one) &&
        !isNaN(growth_time_sec) &&
        !isNaN(terminal_one) &&
        !isNaN(terminal_sec) &&
        terminal_unit &&
        growth_unit
      ) {
        // Process input array
        const nawi_array = [];
        for (let i = 0; i < input.length; i++) {
          if (!isNaN(parseFloat(input[i]))) {
            nawi_array[i + 1] = parseFloat(input[i]);
          }
        }

        if (nawi_array.length < 1) {
          param.error = "Please! Check Your Input.";
          return param;
        }

        const fcff_last = nawi_array[nawi_array.length - 1];

        // Validate WACC
        if (wacc == 0) {
          param.error = "wacc value is greater than or not equal to.";
          return param;
        }

        // Calculate terminal value
        const terminal_value =
          (fcff_last * (1 + perpetual / 100)) / (wacc / 100 - perpetual / 100);

        // Calculate firm value function
        const calculateFirmValue = (fcffArray, wacc) => {
          let firmValue = 0;
          for (const [t, fcff] of Object.entries(fcffArray)) {
            const discountFactor = Math.pow(1 + wacc / 100, parseInt(t));
            firmValue += fcff / discountFactor;
          }
          return firmValue;
        };

        const result = calculateFirmValue(nawi_array, wacc);
        const nz = Object.keys(nawi_array).length;
        const value_firm = Math.pow(1 + wacc / 100, nz);
        const ans_sec = terminal_value / value_firm;

        // Final calculations
        const answer_sec = result + ans_sec;
        const net_debt = outstanding - cash;
        const equdiry = answer_sec - net_debt;

        // Validate shares
        if (shares == 0) {
          param.error =
            "Outstanding Shares value is greater than or not equal to.";
          return param;
        }

        const fair_val = equdiry / shares;

        if (fair_val == 0) {
          param.error = "fair value is greater than or not equal to.";
          return param;
        }

        const percentage = ((price - fair_val) * 100) / fair_val;

        // Set response parameters
        param.tech_terminal_value = terminal_value;
        param.tech_answer_sec = answer_sec;
        param.tech_equdiry = equdiry;
        param.tech_fair_val = fair_val;
        param.tech_percentage = percentage;
        param.tech_main_unit = main_unit;
        param.tech_input = input;
        param.tech_growth_unit = growth_unit;
        param.tech_terminal_unit = terminal_unit;
        param.tech_length = input.length + 1;

        return param;
      } else {
        param.error = "Please! Check Your Input.";
        return param;
      }
    }
  }

  /**
   * getCalculationVaDisdisabilityCalculator: Service Method
   * POST: /api/calculators-lol/va-disability-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationVaDisdisabilityCalculator(body) {
    const param = {};

    // Extract parameters from body
    const right_arm = parseFloat(body.tech_right_arm?.trim()) || 0;
    const left_arm = parseFloat(body.tech_left_arm?.trim()) || 0;
    const right_leg = parseFloat(body.tech_right_leg?.trim()) || 0;
    const left_leg = parseFloat(body.tech_left_leg?.trim()) || 0;
    const right_foot = parseFloat(body.tech_right_foot?.trim()) || 0;
    const left_foot = parseFloat(body.tech_left_foot?.trim()) || 0;
    const back = parseFloat(body.tech_back?.trim()) || 0;
    const ssd = parseFloat(body.tech_ssd?.trim()) || 0;
    const ptsd = parseFloat(body.tech_ptsd?.trim()) || 0;
    const tinnitus = parseFloat(body.tech_tinnitus?.trim()) || 0;
    const migraines = parseFloat(body.tech_migraines?.trim()) || 0;
    const sleep_apnea = parseFloat(body.tech_sleep_apnea?.trim()) || 0;
    const bilateral_upper = parseFloat(body.tech_bilateral_upper?.trim()) || 0;
    const bilateral_lower = parseFloat(body.tech_bilateral_lower?.trim()) || 0;
    const others = parseFloat(body.tech_others?.trim()) || 0;
    const status = body.tech_status?.trim();
    const attendance = body.tech_attendance?.trim();
    const under_age = body.tech_under_age?.trim();
    const over_age = body.tech_over_age?.trim();
    const parent = body.tech_parent?.trim();

    // Create disabilities array and filter out zeros
    const disabilities = [
      right_arm,
      left_arm,
      right_leg,
      left_leg,
      right_foot,
      left_foot,
      back,
      ssd,
      ptsd,
      tinnitus,
      migraines,
      sleep_apnea,
      bilateral_upper,
      bilateral_lower,
      others,
    ];

    const filteredDisabilities = disabilities.filter((value) => value !== 0);
    const newDisabilitiesArray = filteredDisabilities;
    const arraytotal = newDisabilitiesArray.length;

    // Sort in descending order
    newDisabilitiesArray.sort((a, b) => b - a);

    let total_cumulative = 0;

    // Calculate cumulative disability
    if (arraytotal == 0) {
      param.error = "Please! select disability";
      return param;
    } else if (arraytotal === 1) {
      total_cumulative = newDisabilitiesArray[0];
    } else if (arraytotal === 2) {
      const val_first = newDisabilitiesArray[0];
      const val_sec = newDisabilitiesArray[1];

      const a = ((100 - val_first) * val_sec) / 100;
      const cdis = Math.round(val_first + a);
      total_cumulative = cdis;
    } else {
      const answers = [];
      let cdis = 0;

      for (let i = 0; i < arraytotal - 1; i++) {
        if (i == 0) {
          const a =
            ((100 - newDisabilitiesArray[i]) * newDisabilitiesArray[i + 1]) /
            100;
          cdis = Math.round(newDisabilitiesArray[i] + a);
        }
        if (i != 0) {
          const jawab = ((100 - cdis) * newDisabilitiesArray[i + 1]) / 100;
          cdis = cdis + jawab;
          answers.push(Math.round(cdis));
        }
      }
      total_cumulative =
        answers.length > 0 ? answers[answers.length - 1] : cdis;
    }

    // Determine total combined rating and index
    let total_combined = 0;
    let total_combined_index = 0;

    if (total_cumulative < 15) {
      total_combined = 10;
      total_combined_index = 0;
    } else if (total_cumulative < 25) {
      total_combined = 20;
      total_combined_index = 1;
    } else if (total_cumulative < 35) {
      total_combined = 30;
      total_combined_index = 2;
    } else if (total_cumulative < 45) {
      total_combined = 40;
      total_combined_index = 3;
    } else if (total_cumulative < 55) {
      total_combined = 50;
      total_combined_index = 4;
    } else if (total_cumulative < 65) {
      total_combined = 60;
      total_combined_index = 5;
    } else if (total_cumulative < 75) {
      total_combined = 70;
      total_combined_index = 6;
    } else if (total_cumulative < 85) {
      total_combined = 80;
      total_combined_index = 7;
    } else if (total_cumulative < 95) {
      total_combined = 90;
      total_combined_index = 8;
    } else {
      total_combined = 100;
      total_combined_index = 9;
    }

    // VA compensation model
    const model = {
      alone: [
        171.23, 338.49, 524.31, 755.28, 1075.16, 1361.88, 1716.28, 1995.01,
        2241.91, 3737.85,
      ],
      VeteranChild: [
        171.23, 338.49, 565.31, 810.28, 1144.16, 1444.88, 1813.29, 2106.01,
        2366.91, 3877.22,
      ],
      veteranparent: [
        171.23, 338.49, 574.31, 821.28, 1158.16, 1461.88, 1833.28, 2128.01,
        2391.91, 3905.11,
      ],
      VeteranSpouse: [
        171.23, 338.49, 586.31, 838.28, 1179.16, 1486.88, 1861.28, 2161.01,
        2428.91, 3946.25,
      ],
      VeteranParentChild: [
        171.23, 338.49, 615.31, 876.28, 1227.16, 1544.88, 1930.28, 2239.01,
        2516.91, 4044.48,
      ],
      VeterantwoParents: [
        171.23, 338.49, 624.31, 887.28, 1241.16, 1561.88, 1950.28, 2261.01,
        2541.91, 4072.37,
      ],
      VeteranSpouseChild: [
        171.23, 338.49, 632.31, 899.28, 1255.16, 1577.88, 1968.28, 2283.01,
        2565.91, 4098.87,
      ],
      VeteranspouseoneParent: [
        171.23, 338.49, 636.31, 904.28, 1262.16, 1586.88, 1978.28, 2294.01,
        2578.91, 4113.51,
      ],
      VeterantwoParentsChild: [
        171.23, 338.49, 665.31, 942.28, 1310.16, 1644.88, 2047.28, 2372.01,
        2666.91, 4211.74,
      ],
      VeteranspouseoneParentoneChild: [
        171.23, 338.49, 682.31, 965.28, 1338.16, 1677.88, 2085.28, 2416.01,
        2715.91, 4266.13,
      ],
      VeteranSpousetwoParents: [
        171.23, 338.49, 688.31, 970.28, 1345.16, 1686.88, 2095.28, 2427.01,
        2727.91, 4280.77,
      ],
      VeteranSpousetwoParentsoneChild: [
        171.23, 338.49, 732.31, 1031.28, 1421.16, 1777.88, 2202.28, 2549.01,
        2865.91, 4433.39,
      ],
      additionalchildrenunderage: [
        0.0, 0.0, 31.0, 41.0, 51.0, 62.0, 72.0, 82.0, 93.0, 103.55,
      ],
      overagechildren: [
        0.0, 0.0, 100.0, 133.0, 167.0, 200.0, 234.0, 267.0, 301.0, 334.49,
      ],
      aidandattendance: [
        0.0, 0.0, 57.0, 76.0, 95.0, 114.0, 134.0, 153.0, 172.0, 191.14,
      ],
    };

    let rate = 0;

    // Determine base rate based on status and dependencies
    if (status == "Single") {
      rate = model["alone"][total_combined_index];
    }

    if (status == "Single" && (under_age == "1" || over_age == "1")) {
      rate = model["VeteranChild"][total_combined_index];
    }

    if (status == "Single" && parent == "1") {
      rate = model["veteranparent"][total_combined_index];
    }

    if (status == "Single" && parent == "2") {
      rate = model["VeterantwoParents"][total_combined_index];
    }

    if (
      status == "Single" &&
      parent == "1" &&
      (under_age == "1" || over_age == "1")
    ) {
      rate = model["VeteranParentChild"][total_combined_index];
    }

    if (
      status == "Single" &&
      parent == "2" &&
      (under_age == "1" || over_age == "1")
    ) {
      rate = model["VeterantwoParentsChild"][total_combined_index];
    }

    if (status == "Married") {
      rate = model["VeteranSpouse"][total_combined_index];
    }

    if (status == "Married" && (under_age == "1" || over_age == "1")) {
      rate = model["VeteranSpouseChild"][total_combined_index];
    }

    if (status == "Married" && parent == "1") {
      rate = model["VeteranspouseoneParent"][total_combined_index];
    }

    if (
      status == "Married" &&
      parent == "1" &&
      (under_age == "1" || over_age == "1")
    ) {
      rate = model["VeteranspouseoneParentoneChild"][total_combined_index];
    }

    if (status == "Married" && parent == "2") {
      rate = model["VeteranSpousetwoParents"][total_combined_index];
    }

    if (
      status == "Married" &&
      parent == "2" &&
      (under_age == "1" || over_age == "1")
    ) {
      rate = model["VeteranSpousetwoParentsoneChild"][total_combined_index];
    }

    // Add aid and attendance if applicable
    if (attendance == "Yes") {
      rate += model["aidandattendance"][total_combined_index];
    }

    // Add additional children under age
    if (under_age != "1" && under_age) {
      const underAgeCount = parseInt(under_age) || 0;
      rate +=
        underAgeCount *
        model["additionalchildrenunderage"][total_combined_index];
    }

    // Add additional children over age
    if (over_age != "1" && over_age) {
      const overAgeCount = parseInt(over_age) || 0;
      rate += overAgeCount * model["overagechildren"][total_combined_index];
    }

    // Set response parameters
    param.tech_total_cumulative = total_cumulative;
    param.tech_total_combined = total_combined;
    param.tech_rate = rate;
    param.tech_status = status;

    return param;
  }

  /**
   * getCalculationCagrCalculator: Service Method
   * POST: /api/calculators-lol/cagr-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationCagrCalculator(body) {
    const param = {};

    // Extract parameters from body
    const units = body.tech_unit_type?.trim();
    const starting_first = parseFloat(body.tech_starting_first?.trim()) || 0;
    const ending_first = parseFloat(body.tech_ending_first?.trim()) || 0;
    const years_first = parseFloat(body.tech_years_first?.trim()) || 0;
    const months_first = parseFloat(body.tech_months_first?.trim()) || 0;
    const days_first = parseFloat(body.tech_days_first?.trim()) || 0;
    const starting_sec = parseFloat(body.tech_starting_sec?.trim()) || 0;
    const ending_sec = parseFloat(body.tech_ending_sec?.trim()) || 0;
    const start_date = body.tech_start_date?.trim();
    const ending_date = body.tech_ending_date?.trim();
    const starting_third = parseFloat(body.tech_starting_third?.trim()) || 0;
    const cagr = parseFloat(body.tech_cagr?.trim()) || 0;
    const years_third = parseFloat(body.tech_years_third?.trim()) || 0;
    const months_third = parseFloat(body.tech_months_third?.trim()) || 0;
    const days_third = parseFloat(body.tech_days_third?.trim()) || 0;

    // Helper function to calculate total days

    function calculateTotalDays(years, months, days) {
      let total_dayse = years * 365 + months * 30 + days;
      return total_dayse;
    }

    // Helper function to calculate date difference in days
    const calculateDateDifference = (startDate, endDate) => {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const timeDiff = end.getTime() - start.getTime();
      return Math.floor(timeDiff / (1000 * 3600 * 24));
    };

    // Validation checks
    if (units == "one" && starting_first >= ending_first) {
      param.error =
        "ending value is greater than or not equal to starting value.";
      return param;
    }

    if (units == "two" && starting_sec >= ending_sec) {
      param.error =
        "ending value is greater than or not equal to starting value.";
      return param;
    }

    if (units == "one" && !years_first && !months_first && !days_first) {
      param.error = "Please! Check Enter Input.";
      return param;
    }

    if (units === "three" && !years_third && !months_third && !days_third) {
      param.error = "Please! Check Enter Input.";
      return param;
    }

    if (units == "two") {
      if (!start_date) {
        param.error = "Please! Check Start Date Input.";
        return param;
      }
      if (!ending_date) {
        param.error = "Please! Check Ending Date Input.";
        return param;
      }
    }

    // Process based on unit type
    if (units == "one") {
      if (!isNaN(starting_first) && !isNaN(ending_first)) {
        const total_days = calculateTotalDays(
          years_first,
          months_first,
          days_first
        );

        if (total_days <= 0) {
          param.error = "Please! add at least one day";
          return param;
        }

        // Calculate CAGR
        const cagr_value =
          Math.pow(ending_first / starting_first, 365 / total_days) - 1;

        // Calculate doubling time
        const double = Math.log(2) / Math.log(1 + cagr_value);
        const yearx = Math.floor(double);
        const fractional_part = double - yearx;
        const total_dayz = fractional_part * 365;
        const monthz = Math.floor(total_dayz / 30);
        // const dayz = Math.round(total_dayz % 30);
        const dayz = Math.floor(total_dayz % 30);

        const table_year = total_days / 365;
        const cagr_percentage = cagr_value * 100;

        // Format time strings
        const year =
          years_first <= 1 ? `${years_first} year` : `${years_first} years`;
        const months =
          months_first <= 1
            ? `${months_first} month`
            : `${months_first} months`;
        const days =
          days_first <= 1 ? `${days_first} day` : `${days_first} days`;

        // Set response parameters
        param.tech_total_days = total_days;
        param.tech_cagr_percentage = cagr_percentage;
        param.tech_year = year;
        param.tech_months = months;
        param.tech_days = days;
        param.tech_dayz = dayz;
        param.tech_monthz = monthz;
        param.tech_yearx = yearx;
        param.tech_table_year = table_year;
      } else {
        param.error = "Please! Check Your Input";
        return param;
      }
    } else if (units == "two") {
      if (!isNaN(starting_sec) && !isNaN(ending_sec)) {
        const total_days = calculateDateDifference(start_date, ending_date);

        if (total_days <= 0) {
          param.error = "Please! add at least one day.";
          return param;
        }

        // Calculate CAGR
        const cagr_value =
          Math.pow(ending_sec / starting_sec, 365 / total_days) - 1;

        // Calculate doubling time
        const double = Math.log(2) / Math.log(1 + cagr_value);
        const yearx = Math.floor(double);
        const fractional_part = double - yearx;
        const total_dayz = fractional_part * 365;
        const monthz = Math.floor(total_dayz / 30);
        // const dayz = Math.round(total_dayz % 30);
        const dayz = Math.floor(total_dayz % 30);
        const table_year = Math.round(total_days / 365);
        const cagr_percentage = cagr_value * 100;

        // Set response parameters
        param.tech_total_days = total_days;
        param.tech_cagr_percentage = cagr_percentage;
        param.tech_dayz = dayz;
        param.tech_monthz = monthz;
        param.tech_yearx = yearx;
        param.tech_table_year = table_year;
      } else {
        param.error = "Please fill all fields.";
        return param;
      }
    } else if (units == "three") {
      if (!isNaN(starting_third) && !isNaN(cagr)) {
        const total_days_years =
          calculateTotalDays(years_third, months_third, days_third) / 365;
        // console.log(total_days_years);
        if (total_days_years <= 0) {
          param.error = "Please! add at least one day.";
          return param;
        }

        if (cagr <= 0) {
          param.error = "Please! Check Your CAGR Input.";
          return param;
        }

        // Calculate future value
        const cagr_percentage =
          starting_third * Math.pow(1 + cagr / 100, total_days_years);

        // Calculate doubling time
        // const cagr_decimal = cagr / 100;
        const double = Math.log(2) / Math.log(1 + cagr);
        const yearx = Math.floor(double);
        const fractional_part = double - yearx;
        const total_dayz = fractional_part * 365;
        const monthz = Math.floor(total_dayz / 30);
        // const dayz = Math.round(total_dayz % 30);
        const dayz = Math.floor(total_dayz % 30);
        // Format time strings
        const year =
          years_third <= 1 ? `${years_third} year` : `${years_third} years`;
        const months =
          months_third <= 1
            ? `${months_third} month`
            : `${months_third} months`;
        const days =
          days_third <= 1 ? `${days_third} day` : `${days_third} days`;

        // Set response parameters
        param.tech_cagr_percentage = cagr_percentage;
        param.tech_dayz = dayz; // no
        param.tech_monthz = monthz;
        param.tech_yearx = yearx; // no
        param.tech_total_days = total_days_years;
        param.tech_year = year;
        param.tech_months = months;
        param.tech_days = days;
      } else {
        param.error = "Please fill all fields.";
        return param;
      }
    } else {
      param.error = "Please fill all fields.";
      return param;
    }

    return param;
  }

  /**
   * getCalculationTipCalculator: Service Method
   * POST: /api/calculators-loltip-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationTipCalculator(body) {
    // Separate input variables
    let tipFor = body.tech_for;
    let bill = body.tech_x;
    let xs = body.tech_xs;
    let tip = body.tech_y;
    let person = body.tech_z;
    let round = body.tech_round;
    let rounds = body.tech_rounds;
    // const { for: tipFor, x: bill, xs, y: tip, z: person, round, rounds } = body;

    // Helper function to check if value is numeric
    function isNumeric(value) {
      return !isNaN(value) && value !== null && value !== "";
    }

    // Helper function for rounding
    function roundNumber(value, precision = 0) {
      return precision
        ? parseFloat(value.toFixed(precision))
        : Math.round(value);
    }

    let response = {};

    // Handle single tip calculation
    if (tipFor === "single") {
      if (isNumeric(xs)) {
        response.tech_single = 1;
        return response;
      } else {
        response.error = "Please! Fill all the Input Fields";
        return response;
      }
    } else {
      // Handle multiple person tip calculation
      if (isNumeric(bill) && isNumeric(tip) && isNumeric(person)) {
        let a, b, c, d;

        if (round === "yes") {
          a = roundNumber((tip / 100) * bill);
          b = roundNumber(bill + a);
          c = roundNumber(a / person);
          d = roundNumber(b / person);
        } else {
          a = roundNumber((tip / 100) * bill, 2);
          b = roundNumber(bill + a, 2);
          c = roundNumber(a / person, 2);
          d = roundNumber(b / person, 2);
        }

        response.tech_a = a;
        response.tech_b = b;
        response.tech_c = c;
        response.tech_d = d;
        return response;
      } else {
        response.error = "Please! Fill all the Input Fields";
        return response;
      }
    }
  }

  /**
   * getCalculationHourlyToSalaryCalculator: Service Method
   * POST: /api/calculators-lol/hourly-to-salary-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationHourlyToSalaryCalculator(body) {
    // Separate input variables
    let first = body.tech_first;
    let second = body.tech_second;
    let third = body.tech_third;
    let car = body.tech_car;

    let response = {};
    // Helper function to check if value is numeric
    function isNumeric(value) {
      return !isNaN(value) && value !== null && value !== "";
    }

    // Check if inputs are numeric
    if (isNumeric(first) && isNumeric(second) && isNumeric(third)) {
      let annuly = first * second * third;
      let weekly = first * second;
      let monthly = annuly / 12;

      response.tech_annuly = annuly;
      response.tech_weekly = weekly;
      response.tech_monthly = monthly;
    } else {
      response.error = "Please! Check Your Input";
      return response;
    }

    response.car = car;
    return response;
  }

  /**
   * getCalculationSalaryToHourlyCalculator: Service Method
   * POST: /api/calculators-lol/salary-to-hourly-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationSalaryToHourlyCalculator(body) {
    // Separate input variables
    let salary = body.tech_salary;
    let hweek = body.tech_hweek;
    let hyear = body.tech_hyear;
    let type = body.tech_type;
    let currency = body.tech_currency;
    // Helper function to check if value is numeric
    function isNumeric(value) {
      return !isNaN(value) && value !== null && value !== "";
    }
    let response = {};

    // Check if inputs are numeric and type is not empty
    if (
      isNumeric(salary) &&
      isNumeric(hweek) &&
      isNumeric(hyear) &&
      type !== ""
    ) {
      let median_sal,
        name = "";

      // Set median salary based on currency
      if (currency === "$") {
        median_sal = 53924;
        name = "Of US Median";
      } else if (currency === "£") {
        median_sal = 31285;
        name = "Of UK Median";
      } else {
        median_sal = 53924;
      }

      if (hweek > 0 && hyear > 0 && salary > 0) {
        let weekly_rate, hourly_rate, monthaly_rate, mean;

        // Perform calculations based on type
        if (type === "an") {
          weekly_rate = salary / hyear;
          hourly_rate = weekly_rate / hweek;
          monthaly_rate = salary / 12;
          mean = (salary / median_sal) * 100;
        } else if (type === "mo") {
          monthaly_rate = salary;
          hourly_rate = (monthaly_rate * 12) / hyear / hweek;
          weekly_rate = hourly_rate * hweek;
          mean = (salary / median_sal) * 100;
        } else if (type === "we") {
          weekly_rate = salary;
          hourly_rate = weekly_rate / hweek;
          monthaly_rate = (hourly_rate * hyear * hweek) / 12;
          mean = (salary / median_sal) * 100;
        } else if (type === "da") {
          hourly_rate = salary / (hweek / 5);
          weekly_rate = hourly_rate * hweek;
          monthaly_rate = (hourly_rate * hyear * hweek) / 12;
          mean = (salary / median_sal) * 100;
        }

        // Set values in the response object
        response.tech_hourly_rate = hourly_rate;
        response.tech_weekly_rate = weekly_rate;
        response.tech_monthaly_rate = monthaly_rate;
        response.tech_mean = mean;
        response.tech_name = name;
        response.tech_currency = currency;
        return response;
      } else {
        response.error = "Please! Enter the Correct Value";
        return response;
      }
    } else {
      response.error = "Please! Check Your Input";
      return response;
    }
  }

  /**
   * getCalculationRentSpitCalculator: Service Method
   * POST: /api/calculators-lol/rent-split-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationRentSpitCalculator(body) {
    // Separate input variables
    let total_rent = body.tech_total_rent;
    let total_area = body.tech_total_area;
    let bedrooms = body.tech_bedrooms;
    let room_area = body.tech_room_area;
    let persons = body.tech_persons;
    let bath = body.tech_bath;

    // Helper function to check if value is numeric
    function isNumeric(value) {
      return !isNaN(value) && value !== null && value !== "";
    }

    // Helper function to sum an array of numbers
    function sumArray(arr) {
      return arr.reduce((acc, val) => acc + val, 0);
    }

    let response = {};

    // Check if inputs are numeric and not empty
    if (
      isNumeric(total_rent) &&
      isNumeric(total_area) &&
      bedrooms > 0 &&
      persons.length > 0 &&
      room_area.length > 0 &&
      bath.length > 0
    ) {
      if (total_area >= sumArray(room_area) + sumArray(bath)) {
        let common_area = total_area - sumArray(room_area) - sumArray(bath);
        let rent_per_sq = total_rent / (total_area - common_area);

        let room_rent = [];
        for (let i = 0; i < bedrooms; i++) {
          room_rent[i] = ((room_area[i] + bath[i]) * rent_per_sq) / persons[i];
        }

        response.tech_room_rent = room_rent;
        return response;
      } else {
        response.error =
          "Combined square footage of rooms should not exceed total square footage of house";
        return response;
      }
    } else {
      response.error = "Please! Check Your Input";
      return response;
    }
  }

  /**
   * getCalculationwaterBillCalculator: Service Method
   * POST: /api/calculators-lol/water-bill-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationwaterBillCalculator(body) {
    // Extract water rate and gallon usage from the body
    const waterRate = parseFloat(body.waterRate); // Renaming $water to waterRate
    const gallonUsage = parseFloat(body.gallonUsage); // Renaming $gallon to gallonUsage

    // Initialize an object to hold the response
    let result = {};

    // Check if both water rate and gallon usage are valid numbers
    if (!isNaN(waterRate) && !isNaN(gallonUsage)) {
      // Calculate the bill
      const billAmount = waterRate * gallonUsage;
      // Prepare the response with the calculated bill

      result.totalBill = billAmount; // Renamed 'bill' to 'totalBill'

      result.status = 1; // Renamed 'RESULT' to 'status'
    } else {
      // If inputs are not valid, add an error message to the response
      result.error = "Please! Check Your Input";
    }

    // Return the result object
    return result;
  }

  /**
   * getCalculationOutTheDoorPriceCalculator: Service Method
   * POST: /api/calculators-lol/out-the-door-price-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationOutTheDoorPriceCalculator(body) {
    const param = {};
    const { tech_car, tech_dealership, tech_taxes } = body;

    if (
      typeof tech_car === "number" &&
      typeof tech_dealership === "number" &&
      typeof tech_taxes === "number"
    ) {
      const answer = tech_car + tech_dealership + tech_taxes;
      param.tech_answer = answer;
      param.tech_car = tech_car;
      param.tech_dealership = tech_dealership;
      param.tech_taxes = tech_taxes;
      return param;
    } else {
      param.error = "Please! Check Your Input";
      return param;
    }
  }
  /**
   * getCalculationARVCalculator: Service Method
   * POST: /api/calculators-lol/arv-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationARVCalculator(body) {
    const method_unit = body.tech_method_unit.trim();
    const property = parseFloat(body.tech_property.trim());
    const area = parseFloat(body.tech_area.trim());
    const area_unit = body.tech_area_unit.trim();
    const value = parseFloat(body.tech_value.trim());
    const total = parseFloat(body.tech_total.trim());
    const total_unit = body.tech_total_unit.trim();
    const average = parseFloat(body.tech_average.trim());
    const average_unit = body.tech_average_unit.trim();
    const cost = parseFloat(body.tech_cost.trim());
    const purchase = parseFloat(body.tech_purchase.trim());

    let response = {};

    // Function to handle area unit conversions
    function arv_units(area, area_unit) {
      if (area_unit === "m²") {
        return area; // No conversion needed for m²
      } else if (area_unit === "ft²") {
        return area * 0.092903; // Convert ft² to m²
      } else if (area_unit === "yd²") {
        return area * 0.836127; // Convert yd² to m²
      } else if (area_unit === "mi²") {
        return area * 2.58999e6; // Convert mi² to m²
      } else {
        return "Unsupported unit or invalid input.";
      }
    }

    // Input validation
    if (
      isNaN(area) ||
      isNaN(total) ||
      isNaN(property) ||
      isNaN(value) ||
      isNaN(average) ||
      isNaN(cost) ||
      isNaN(purchase)
    ) {
      response.error = "Please! Check Your Input";
      return response;
    }

    if (area == 0) {
      response.error = "Average Area Price value cannot be equal to zero";
      return response;
    }
    if (total == 0) {
      response.error =
        "Total area of the property value cannot be equal to zero";
      return response;
    }
    if (property == 0) {
      response.error = "Property current value cannot be equal to zero";
      return response;
    }
    if (value == 0) {
      response.error = "Value of renovations cannot be equal to zero";
      return response;
    }
    if (average == 0) {
      response.error = "Repair cost value cannot be equal to zero";
      return response;
    }
    if (cost == 0) {
      response.error = "Total cost of renovation cannot be equal to zero";
      return response;
    }
    if (purchase == 0) {
      response.error = "Investor's purchase rule value cannot be equal to zero";
      return response;
    }
    if (purchase > 100) {
      response.error = "Investor's purchase rule % cannot exceed 100%";
      return response;
    }

    // ARV calculation logic
    let after_repair_value;
    if (method_unit === "Value Of The Property") {
      after_repair_value = property + value; // After repair value is property value + renovation value
    } else {
      const areas = arv_units(area, area_unit);
      const totals = arv_units(total, total_unit);
      after_repair_value = areas * totals; // After repair value = area * total
    }

    const averages = arv_units(average, average_unit);
    const requires_repairs = cost / averages; // Cost of repairs divided by average repair cost
    const maximum_bid_price = after_repair_value * (purchase / 100) - cost; // Maximum bid price
    const percentage = Math.abs(purchase - 100); // Difference between purchase and 100%
    const roi = (percentage / 100) * after_repair_value; // Return on investment

    // Return the response with calculated values
    response.tech_after_repair_value = after_repair_value;
    response.tech_requires_repairs = requires_repairs;
    response.tech_maximum_bid_price = maximum_bid_price;
    response.tech_percentage = percentage;
    response.tech_roi = roi;
    return response;
  }

  /**
   * getCalculationZakatCalculator: Service Method
   * POST: /api/calculators-lol/zakat-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationZakatCalculator(body) {
    try {
      // Nisab thresholds for different currencies
      const nisabThresholds = {
        PKR: { gold: 808400, silver: 62876 },
        GBP: { gold: 6364.04, silver: 454.91 },
        USD: { gold: 8084.0, silver: 628.76 },
        CAD: { gold: 11418.98, silver: 888.14 },
      };

      const zakatRate = 0.025; // 2.5%

      // Helper function to round to 2 decimals
      const roundToTwoDecimals = (value) => {
        return Math.round((parseFloat(value) + Number.EPSILON) * 100) / 100;
      };

      // Helper function to calculate total from values
      const calculateTotal = (values) => {
        let total = 0;
        if (Array.isArray(values)) {
          values.forEach((value) => {
            total += parseFloat(value) || 0;
          });
        }
        return total;
      };

      // Extract data from request body
      const {
        currency = "USD",
        nisabType = "silver", // Default to silver if not provided
        // Assets
        cashInHand = 0,
        bankAccounts = 0,
        futureDeposits = 0,
        cashGivenOut = 0,
        otherIncome = 0,
        investments = 0,
        preciousMetals = 0,
        propertyValue = 0,
        stocksBonds = 0,
        addingValues = [],
        // Liabilities
        cashBorrowed = 0,
        wagesOwed = 0,
        immediateDebts = 0,
        zakatPaidAdvance = 0,
        minusValues = [],
      } = body;

      // Calculate total assets
      let totalAssets = 0;
      totalAssets += parseFloat(cashInHand) || 0;
      totalAssets += parseFloat(bankAccounts) || 0;
      totalAssets += parseFloat(futureDeposits) || 0;
      totalAssets += parseFloat(cashGivenOut) || 0;
      totalAssets += parseFloat(otherIncome) || 0;
      totalAssets += parseFloat(investments) || 0;
      totalAssets += parseFloat(preciousMetals) || 0;
      totalAssets += parseFloat(propertyValue) || 0;
      totalAssets += parseFloat(stocksBonds) || 0;
      totalAssets += calculateTotal(addingValues);

      // Calculate total liabilities
      let totalLiabilities = 0;
      totalLiabilities += parseFloat(cashBorrowed) || 0;
      totalLiabilities += parseFloat(wagesOwed) || 0;
      totalLiabilities += parseFloat(immediateDebts) || 0;
      totalLiabilities += parseFloat(zakatPaidAdvance) || 0;
      totalLiabilities += calculateTotal(minusValues);

      // Calculate net wealth
      const netWealth = totalAssets - totalLiabilities;

      // Get nisab threshold based on selected type
      let nisabThreshold;
      if (nisabThresholds[currency]) {
        nisabThreshold =
          nisabType === "gold"
            ? nisabThresholds[currency].gold
            : nisabThresholds[currency].silver;
      } else {
        nisabThreshold =
          nisabType === "gold"
            ? nisabThresholds.USD.gold
            : nisabThresholds.USD.silver;
      }

      // Check if wealth meets nisab
      const meetsNisab = netWealth >= nisabThreshold;

      // Calculate zakat payable
      const zakatPayable = meetsNisab ? netWealth * zakatRate : 0;

      // Determine message based on zakat payable
      let message = "";
      if (zakatPayable === 0) {
        if (!meetsNisab) {
          message = "Zakat is not applicable on you!";
        } else {
          message = "Zakat is not applicable on you!";
        }
      } else {
        message = `Zakat payable: ${roundToTwoDecimals(
          zakatPayable
        )} ${currency}`;
      }

      // Prepare response
      const result = {
        success: true,
        data: {
          currency,
          nisabType,
          totalAssets: roundToTwoDecimals(totalAssets),
          totalLiabilities: roundToTwoDecimals(totalLiabilities),
          netWealth: roundToTwoDecimals(netWealth),
          nisabThreshold: roundToTwoDecimals(nisabThreshold),
          meetsNisab,
          zakatPayable: roundToTwoDecimals(zakatPayable),
          zakatRate: zakatRate,
          message: message,
          breakdown: {
            assets: {
              cashInHand: roundToTwoDecimals(cashInHand),
              bankAccounts: roundToTwoDecimals(bankAccounts),
              futureDeposits: roundToTwoDecimals(futureDeposits),
              cashGivenOut: roundToTwoDecimals(cashGivenOut),
              otherIncome: roundToTwoDecimals(otherIncome),
              investments: roundToTwoDecimals(investments),
              preciousMetals: roundToTwoDecimals(preciousMetals),
              propertyValue: roundToTwoDecimals(propertyValue),
              stocksBonds: roundToTwoDecimals(stocksBonds),
              additionalValues: addingValues.map((val) =>
                roundToTwoDecimals(val)
              ),
            },
            liabilities: {
              cashBorrowed: roundToTwoDecimals(cashBorrowed),
              wagesOwed: roundToTwoDecimals(wagesOwed),
              immediateDebts: roundToTwoDecimals(immediateDebts),
              zakatPaidAdvance: roundToTwoDecimals(zakatPaidAdvance),
              minusValues: minusValues.map((val) => roundToTwoDecimals(val)),
            },
          },
        },
      };

      return result;
    } catch (error) {
      console.error("Zakat calculation error:", error);
      return {
        success: false,
        error: "Failed to calculate zakat",
        message: error.message,
      };
    }
  }
}

module.exports = new CalculatorsServices();
