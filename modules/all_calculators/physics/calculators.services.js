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
   * getCalculationVelocityCalculator: Service Method
   * POST: /api/calculators-lol/velocity-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationVelocityCalculator(body) {
    const request = body;
    const result = {};

    const velo_value = request.tech_velo_value;
    const dem = request.tech_dem;
    const collection = request.tech_collection;
    const dis1_unit = request.tech_dis_unit;
    const time_unit = request.tech_time_unit;
    const val_unit = request.tech_val_unit;
    const val_units = request.tech_val_units;

    const iv_unit = request.tech_iv_unit;
    const acc_unit = request.tech_acc_unit;
    const atime_unit = request.tech_atime_unit;
    const fv_unit = request.tech_fv_unit;

    // Helper function for velocity conversion (single value)
    function velocityfun(velocity, units) {
      if (units == "km/h") {
        return velocity / 3.6;
      } else if (units == "ft/s") {
        return velocity / 3.28084;
      } else if (units == "mph") {
        return velocity / 2.23694;
      } else if (units == "kn") {
        return velocity / 1.94384;
      } else if (units == "ft/m") {
        return velocity / 196.8504;
      } else if (units == "cm/s") {
        return velocity / 100;
      } else if (units == "m/min") {
        return velocity / 60;
      } else {
        return velocity;
      }
    }

    // Helper function for time conversion (single value)
    function convertTime(time, units) {
      if (units == "min") {
        return time * 60;
      } else if (units == "hrs") {
        return time * 3600;
      } else if (units == "days") {
        return time * 86400;
      } else if (units == "wks") {
        return time * 604800;
      } else if (units == "mon") {
        return time * 2.628e6;
      } else if (units == "yrs") {
        return time * 3.154e7;
      } else {
        return time;
      }
    }

    // Helper function for distance conversion
    function distancefun(a, b) {
      if (b == "cm") {
        return parseInt(a / 100);
      } else if (b == "km") {
        return parseInt(a * 1000);
      } else if (b == "in") {
        return parseInt(a * 0.0254);
      } else if (b == "ft") {
        return parseInt(a * 0.3048);
      } else if (b == "yd") {
        return parseInt(a * 0.9144);
      } else if (b == "mi") {
        return parseInt(a * 1609.34);
      } else {
        return parseInt(a);
      }
    }

    // Helper function for velocity array conversion
    function velocity(velocities, units) {
      const converted_velocities = [];
      velocities.forEach((value, index) => {
        const numValue = parseFloat(value);
        const unit = units[index] || "";
        if (unit == "km/h") {
          converted_velocities.push(numValue / 3.6);
        } else if (unit == "ft/s") {
          converted_velocities.push(numValue / 3.28084);
        } else if (unit == "mph") {
          converted_velocities.push(numValue / 2.23694);
        } else if (unit == "kn") {
          converted_velocities.push(numValue / 1.94384);
        } else if (unit == "ft/m") {
          converted_velocities.push(numValue / 196.8504);
        } else if (unit == "cm/s") {
          converted_velocities.push(numValue / 100);
        } else if (unit == "m/min") {
          converted_velocities.push(numValue / 60);
        } else {
          converted_velocities.push(numValue);
        }
      });
      return converted_velocities;
    }

    // Helper function for time array conversion
    function convertTimeArray(times, units) {
      const converted_times = [];
      times.forEach((value, index) => {
        const numValue = parseFloat(value);
        const unit = units[index] || "";
        if (unit == "min") {
          converted_times.push(numValue * 60);
        } else if (unit == "hrs") {
          converted_times.push(numValue * 3600);
        } else if (unit == "days") {
          converted_times.push(numValue * 86400);
        } else if (unit == "wks") {
          converted_times.push(numValue * 604800);
        } else if (unit == "mon") {
          converted_times.push(numValue * 2.628e6);
        } else if (unit == "yrs") {
          converted_times.push(numValue * 3.154e7);
        } else {
          converted_times.push(numValue);
        }
      });
      return converted_times;
    }

    if (velo_value == "1") {
      // Basic velocity, distance, time calculation
      const distance = parseFloat(request.tech_x);
      const time = parseFloat(request.tech_y);
      const velocity_val = parseFloat(request.tech_vel);

      const distances = distancefun(distance, dis1_unit);
      const velocitys = velocityfun(velocity_val, val_units);
      const times = convertTime(time, time_unit);

      let ans;
      if (dem === "dc") {
        // Distance Calculation
        ans = Math.round(velocitys * times * 10000) / 10000;
        result.tech_ans_t = "Distance";
      } else if (dem == "av") {
        // Velocity Calculation
        if (times == 0) {
          ans = 0;
        } else {
          ans = Math.round((distances / times) * 10000) / 10000;
        }
        result.tech_ans_t = "Velocity";
      } else {
        // Time Calculation
        if (velocitys == 0) {
          ans = "Infinity";
        } else {
          ans = Math.round((distances / velocitys) * 10000) / 10000;
        }
        result.tech_ans_t = "Time";
      }

      result.tech_ans = ans;
      return result;
    } else if (velo_value == "3") {
      // Average velocity calculation
      let vs = request.tech_z;
      const vs_unit = request.tech_val_unit;
      let avt = request.tech_aty;
      const avt_unit = request.tech_ytime_unit;

      vs = velocity(vs, vs_unit);
      avt = convertTimeArray(avt, avt_unit);

      if (Array.isArray(vs) && Array.isArray(avt)) {
        const total_time = avt.reduce((sum, val) => sum + parseFloat(val), 0);
        let weighted_sum = 0;

        for (let key = 0; key < vs.length; key++) {
          const vel = parseInt(vs[key]);
          const time_val = parseInt(avt[key]);

          if (!isNaN(vel) && !isNaN(time_val)) {
            weighted_sum += vs[key] * avt[key];
          } else {
            result.error = "Please! Check Your Input";
            return result;
          }
        }

        if (total_time > 0) {
          const average_velocity = weighted_sum / total_time;
          result.tech_ans = Math.round(average_velocity * 10000) / 10000;
          result.tech_unit = "m/s";
        } else {
          result.error = "Total time must be greater than zero";
          return result;
        }
        result.tech_ans_t = "Avrage Velocity";
      }

      return result;
    } else if (velo_value == "2") {
      // Acceleration-based calculations
      let ans, unit;

      if (collection == "1") {
        // Calculate initial velocity from acceleration, time, and final velocity
        let a = parseFloat(request.tech_acc);

        if (acc_unit == "ft/s²") a *= 0.3048;
        if (acc_unit == "in/s²") a *= 0.0254;
        if (acc_unit == "cm/s²") a *= 0.01;
        if (acc_unit == "mi/s²") a *= 1609.344;
        if (acc_unit == "km/s²") a *= 100;
        if (acc_unit == "g") a *= 0.10197162129779;

        let time = parseFloat(request.tech_y1);
        if (atime_unit == "min") time *= 60;
        if (atime_unit == "hrs") time *= 3600;
        if (atime_unit == "days") time *= 86400;
        if (atime_unit == "wks") time *= 604800;
        if (atime_unit == "mos") time *= 2.628e6;
        if (atime_unit == "yrs") time *= 3.154e7;

        let fv = parseFloat(request.tech_z1);
        if (fv_unit == "m/s") fv = fv;
        if (fv_unit == "km/h") fv /= 3.6;
        if (fv_unit == "ft/s") fv /= 3.28084;
        if (fv_unit == "mph") fv /= 2.23694;
        if (fv_unit == "kn") fv /= 1.94384;
        if (fv_unit == "ft/m") fv /= 196.8504;
        if (fv_unit == "cm/s") fv /= 100;
        if (fv_unit == "m/min") fv /= 60;

        result.tech_ans_t = "Velocity";
        ans = Math.round((fv - a * time) * 10000) / 10000;
        unit = "m/s";
      } else if (collection == "2") {
        // Calculate final velocity from initial velocity, acceleration, and time
        let time = parseFloat(request.tech_y1);
        if (atime_unit == "min") time *= 60;
        if (atime_unit == "hrs") time *= 3600;
        if (atime_unit == "days") time *= 86400;
        if (atime_unit == "wks") time *= 604800;
        if (atime_unit == "mos") time *= 2.628e6;
        if (atime_unit == "yrs") time *= 3.154e7;

        let iv = parseFloat(request.tech_x1);
        if (iv_unit == "km/h") iv /= 3.6;
        if (iv_unit == "ft/s") iv /= 3.28084;
        if (iv_unit == "mph") iv /= 2.23694;
        if (iv_unit == "kn") iv /= 1.94384;
        if (iv_unit == "ft/m") iv /= 196.8504;
        if (iv_unit == "cm/s") iv /= 100;
        if (iv_unit == "m/min") iv /= 60;

        let a = parseFloat(request.tech_acc);
        if (acc_unit == "ft/s²") a *= 0.3048;
        if (acc_unit == "in/s²") a *= 0.0254;
        if (acc_unit == "cm/s²") a *= 0.01;
        if (acc_unit == "mi/s²") a *= 1609.344;
        if (acc_unit == "km/s²") a *= 100;

        result.tech_ans_t = "Velocity";
        ans = Math.round((iv + a * time) * 10000) / 10000;
        unit = "m/s";
      } else if (collection == "3") {
        // Calculate acceleration from initial velocity, final velocity, and time
        let time = parseFloat(request.tech_y1);
        if (atime_unit == "min") time *= 60;
        if (atime_unit == "hrs") time *= 3600;
        if (atime_unit == "days") time *= 86400;
        if (atime_unit == "wks") time *= 604800;
        if (atime_unit == "mos") time *= 2.628e6;
        if (atime_unit == "yrs") time *= 3.154e7;

        let iv = parseFloat(request.tech_x1);
        if (iv_unit == "km/h") iv /= 3.6;
        if (iv_unit == "ft/s") iv /= 3.28084;
        if (iv_unit == "mph") iv /= 2.23694;
        if (iv_unit == "kn") iv /= 1.94384;
        if (iv_unit == "ft/m") iv /= 196.8504;
        if (iv_unit == "cm/s") iv /= 100;
        if (iv_unit == "m/min") iv /= 60;

        let fv = parseFloat(request.tech_z1);
        if (fv_unit == "km/h") fv /= 3.6;
        if (fv_unit == "ft/s") fv /= 3.28084;
        if (fv_unit == "mph") fv /= 2.23694;
        if (fv_unit == "kn") fv /= 1.94384;
        if (fv_unit == "ft/m") fv /= 196.8504;
        if (fv_unit == "cm/s") fv /= 100;
        if (fv_unit == "m/min") fv /= 60;

        result.tech_ans_t = "Acceleration";
        ans = Math.round(((fv - iv) / time) * 10000) / 10000;
        unit = "m/s²";
      } else {
        // Calculate time from initial velocity, final velocity, and acceleration
        let a = parseFloat(request.tech_acc);
        if (acc_unit == "ft/s²") a *= 0.3048;
        if (acc_unit == "in/s²") a *= 0.0254;
        if (acc_unit == "cm/s²") a *= 0.01;
        if (acc_unit == "mi/s²") a *= 1609.344;
        if (acc_unit == "km/s²") a *= 100;
        if (acc_unit == "g") a *= 0.10197162129779;

        let iv = parseFloat(request.tech_x1);
        if (iv_unit == "km/h") iv /= 3.6;
        if (iv_unit == "ft/s") iv /= 3.28084;
        if (iv_unit == "mph") iv /= 2.23694;
        if (iv_unit == "kn") iv /= 1.94384;
        if (iv_unit == "ft/m") iv /= 196.8504;
        if (iv_unit == "cm/s") iv /= 100;
        if (iv_unit == "m/min") iv /= 60;

        let fv = parseFloat(request.tech_z1);
        if (fv_unit == "km/h") fv /= 3.6;
        if (fv_unit == "ft/s") fv /= 3.28084;
        if (fv_unit == "mph") fv /= 2.23694;
        if (fv_unit == "kn") fv /= 1.94384;
        if (fv_unit == "ft/m") fv /= 196.8504;
        if (fv_unit == "cm/s") fv /= 100;
        if (fv_unit == "m/min") fv /= 60;

        result.tech_ans_t = "Time";
        ans = Math.round(((fv - iv) / a) * 10000) / 10000;
        unit = "s";
      }

      result.tech_ans = ans;
      return result;
    }

    return result;
  }

  /**
   * getCalculationDisplacementCalculator: Service Method
   * POST: /api/calculators-lol/displacement-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationDisplacementCalculator(body) {
    const request = body;
    const param = {};

    const dispKnown = request.tech_known;
    let check = false;

    if (dispKnown) {
      if (dispKnown === "1") {
        // Formula: displacement = average velocity × time
        const sldsp = request.tech_sldsp;
        let avg = parseFloat(request.tech_av);
        const slav = request.tech_slav;
        let tme = parseFloat(request.tech_tm);
        const sltm = request.tech_sltm;
        check = true;

        param.tech_avg = `${request.tech_av} ${slav}`;

        // Convert average velocity to m/s
        if (slav === "ft/s") {
          avg = avg * 0.3048;
        }
        if (slav === "km/h") {
          avg = avg * 0.277778;
        }
        if (slav === "km/s") {
          avg = avg * 1000;
        }
        if (slav === "mi/s") {
          avg = avg * 1609.34;
        }
        if (slav === "mph") {
          avg = avg / 2.237;
        }

        param.tech_tme = `${request.tech_tm} ${sltm}`;

        // Convert time to seconds
        if (sltm === "min") {
          tme = tme * 60;
        }
        if (sltm === "h") {
          tme = tme * 60 * 60;
        }

        // Calculate displacement in meters
        let dsp = avg * tme;

        // Convert to desired unit
        if (sldsp === "cm") {
          dsp = dsp * 100;
        }
        if (sldsp === "in") {
          dsp = dsp * 39.37;
        }
        if (sldsp === "ft") {
          dsp = dsp * 3.281;
        }
        if (sldsp === "km") {
          dsp = dsp / 1000;
        }
        if (sldsp === "mi") {
          dsp = dsp / 1609.35;
        }

        param.tech_dsp = `${Math.round(dsp * 10000) / 10000} ${sldsp}`;
      } else if (dispKnown === "2") {
        // Formula: displacement = (initial velocity × time) + (0.5 × acceleration × time²)
        const sldsp = request.tech_sldsp;
        let tme = parseFloat(request.tech_tm);
        const sltm = request.tech_sltm;
        let iv = parseFloat(request.tech_iv);
        const sliv = request.tech_sliv;
        let acce = parseFloat(request.tech_acc);
        const slacc = request.tech_slacc;

        check = true;

        param.tech_ivs = `${request.tech_iv} ${sliv}`;

        // Convert initial velocity to m/s
        if (sliv === "ft/s") {
          iv = iv * 0.3048;
        }
        if (sliv === "km/h") {
          iv = iv * 0.277778;
        }
        if (sliv === "km/s") {
          iv = iv * 1000;
        }
        if (sliv === "mi/s") {
          iv = iv * 1609.34;
        }
        if (sliv === "mph") {
          iv = iv / 2.237;
        }

        param.tech_tme = `${request.tech_tm} ${sltm}`;

        // Convert time to seconds
        if (sltm === "min") {
          tme = tme * 60;
        }
        if (sltm === "h") {
          tme = tme * 60 * 60;
        }

        param.tech_acce = `${request.tech_acc} ${slacc}`;

        // Convert acceleration to m/s²
        if (slacc === "ft/s²") {
          acce = acce * 0.3048;
        }

        // Calculate displacement in meters
        let dsp = iv * tme + 0.5 * (acce * Math.pow(tme, 2));

        // Convert to desired unit
        if (sldsp === "cm") {
          dsp = dsp * 100;
        }
        if (sldsp === "in") {
          dsp = dsp * 39.37;
        }
        if (sldsp === "ft") {
          dsp = dsp * 3.281;
        }
        if (sldsp === "km") {
          dsp = dsp / 1000;
        }
        if (sldsp === "mi") {
          dsp = dsp / 1609.35;
        }

        param.tech_dsp = `${Math.round(dsp * 10000) / 10000} ${sldsp}`;
      } else if (dispKnown === "3") {
        // Formula: displacement = 0.5 × (initial velocity + final velocity) × time
        const sldsp = request.tech_sldsp;
        let tme = parseFloat(request.tech_tm);
        const sltm = request.tech_sltm;
        let iv = parseFloat(request.tech_iv);
        const sliv = request.tech_sliv;
        let fv = parseFloat(request.tech_fv);
        const slfv = request.tech_slfv;
        check = true;

        param.tech_ivs = `${request.tech_iv} ${sliv}`;

        // Convert initial velocity to m/s
        if (sliv === "ft/s") {
          iv = iv * 0.3048;
        }
        if (sliv === "km/h") {
          iv = iv * 0.277778;
        }
        if (sliv === "km/s") {
          iv = iv * 1000;
        }
        if (sliv === "mi/s") {
          iv = iv * 1609.34;
        }
        if (sliv === "mph") {
          iv = iv / 2.237;
        }

        param.tech_tme = `${request.tech_tm} ${sltm}`;

        // Convert time to seconds
        if (sltm === "min") {
          tme = tme * 60;
        }
        if (sltm === "h") {
          tme = tme * 60 * 60;
        }

        param.tech_fvs = `${request.tech_fv} ${slfv}`;

        // Convert final velocity to m/s
        if (slfv === "ft/s") {
          fv = fv * 0.3048;
        }
        if (slfv === "km/h") {
          fv = fv * 0.277778;
        }
        if (slfv === "km/s") {
          fv = fv * 1000;
        }
        if (slfv === "mi/s") {
          fv = fv * 1609.34;
        }
        if (slfv === "mph") {
          fv = fv / 2.237;
        }

        // Calculate displacement in meters
        let dsp = 0.5 * (fv + iv) * tme;

        // Convert to desired unit
        if (sldsp === "cm") {
          dsp = dsp * 100;
        }
        if (sldsp === "in") {
          dsp = dsp * 39.37;
        }
        if (sldsp === "ft") {
          dsp = dsp * 3.281;
        }
        if (sldsp === "km") {
          dsp = dsp / 1000;
        }
        if (sldsp === "mi") {
          dsp = dsp / 1609.35;
        }

        param.tech_dsp = `${Math.round(dsp * 10000) / 10000} ${sldsp}`;
      } else if (dispKnown === "4") {
        // Multiple velocity-time pairs
        check = true;

        const vlocInpAr = [];
        const vlocSlcAr = [];
        const timiInpAr = [];
        const timiSlcAr = [];
        const vloReslt = [];

        for (let i = 0; i < 10; i++) {
          const vloInRaw = request[`tech_vloc_${i}`];
          const vloSl = request[`tech_slvloc_${i}`];
          const timInRaw = request[`tech_timi_${i}`];
          const timSl = request[`tech_sltimi_${i}`];

          // Skip if values don't exist or are empty
          if (!vloInRaw || !timInRaw || vloInRaw === "" || timInRaw === "") {
            continue;
          }

          let vloIn = parseFloat(vloInRaw);

          // Convert velocity to m/s
          if (vloSl === "ft/s") {
            vloIn = vloIn * 0.3048;
          }
          if (vloSl === "km/h") {
            vloIn = vloIn * 0.277778;
          }
          if (vloSl === "km/s") {
            vloIn = vloIn * 1000;
          }
          if (vloSl === "mi/s") {
            vloIn = vloIn * 1609.34;
          }
          if (vloSl === "mph") {
            vloIn = vloIn / 2.237;
          }
          vlocInpAr.push(vloIn);
          vlocSlcAr.push(vloSl);

          let timIn = parseFloat(timInRaw);

          // Convert time to seconds
          if (timSl === "min") {
            timIn = timIn * 60;
          }
          if (timSl === "h") {
            timIn = timIn * 60 * 60;
          }
          timiInpAr.push(timIn);
          timiSlcAr.push(timSl);

          vloReslt.push(vloIn * timIn);
        }

        const sldsp = request.tech_sldsp;

        // Sum all displacements (in meters)
        const sumInMeters = vloReslt.reduce((a, b) => a + b, 0);
        let dsp = sumInMeters;

        // Convert to desired unit
        if (sldsp === "cm") {
          dsp = dsp * 100;
        }
        if (sldsp === "in") {
          dsp = dsp * 39.37;
        }
        if (sldsp === "ft") {
          dsp = dsp * 3.281;
        }
        if (sldsp === "km") {
          dsp = dsp / 1000;
        }
        if (sldsp === "mi") {
          dsp = dsp / 1609.35;
        }

        param.tech_dsp = `${Math.round(dsp * 10000) / 10000} ${sldsp}`;
        param.tech_dspft = Math.round(sumInMeters * 3.281 * 10000) / 10000;
        param.tech_dspkm = Math.round((sumInMeters / 1000) * 10000) / 10000;
        param.tech_dspmi = Math.round((sumInMeters / 1609.35) * 10000) / 10000;
      }
    }

    if (check === true) {
      return param;
    } else {
      param.error = "Please fill all fields.";
      return param;
    }
  }

  /**
   * getCalculationOhmsLawCalculator: Service Method
   * POST: /api/calculators-lol/ohms-law-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationOhmsLawCalculator(body) {
    const param = {};
    const request = body;

    // Helper function to check if value is numeric and not empty
    const isNumeric = (value) => {
      return (
        value !== null && value !== undefined && value !== "" && !isNaN(value)
      );
    };

    // Voltage and Current given
    if (isNumeric(request.tech_voltage) && isNumeric(request.tech_current)) {
      if (!isNumeric(request.resistance) && !isNumeric(request.tech_power)) {
        let voltage = parseFloat(request.tech_voltage);
        let current = parseFloat(request.tech_current);

        // Convert to base units
        if (request.tech_unit_v == "KV") voltage = voltage * 1000;
        if (request.tech_unit_v == "mV") voltage = voltage * 0.001;
        if (request.tech_unit_i == "mA") current = current / 1000;

        // Calculate
        let resistance = Math.round((voltage / current) * 100000) / 100000;
        let power = Math.round(voltage * current * 100000) / 100000;

        // Convert back to display units
        if (request.tech_unit_r == "kΩ") resistance = resistance * 0.001;
        if (request.tech_unit_p == "kW") power = power / 1000;
        if (request.tech_unit_v == "KV") voltage = voltage / 1000;
        if (request.tech_unit_v == "mV") voltage = voltage / 0.001;
        if (request.tech_unit_i == "mA") current = current * 1000;

        param.tech_voltage = `${voltage} ${request.tech_unit_v}`;
        param.tech_current = `${current} ${request.tech_unit_i}`;
        param.tech_resistance = `${resistance} ${request.tech_unit_r}`;
        param.tech_power = `${power} ${request.tech_unit_p}`;

        return param;
      } else {
        param.error = "Please enter two values.";
        return param;
      }
    }

    // Voltage and Resistance given
    else if (
      isNumeric(request.tech_voltage) &&
      isNumeric(request.tech_resistance)
    ) {
      if (!isNumeric(request.tech_current) && !isNumeric(request.tech_power)) {
        let voltage = parseFloat(request.tech_voltage);
        let resistance = parseFloat(request.tech_resistance);

        if (request.tech_unit_r == "kΩ") resistance = resistance * 1000;
        if (request.tech_unit_v == "KV") voltage = voltage * 1000;
        if (request.tech_unit_v == "mV") voltage = voltage * 0.001;

        let current = Math.round((voltage / resistance) * 100000) / 100000;
        let power =
          Math.round((Math.pow(voltage, 2) / resistance) * 100000) / 100000;

        if (request.tech_unit_r == "kΩ") resistance = resistance * 0.001;
        if (request.tech_unit_p == "kW") power = power / 1000;
        if (request.tech_unit_v == "KV") voltage = voltage / 1000;
        if (request.tech_unit_v == "mV") voltage = voltage / 0.001;
        if (request.tech_unit_i == "mA") current = current * 1000;

        param.tech_voltage = `${voltage} ${request.tech_unit_v}`;
        param.tech_current = `${current} ${request.tech_unit_i}`;
        param.tech_resistance = `${resistance} ${request.tech_unit_r}`;
        param.tech_power = `${power} ${request.tech_unit_p}`;

        return param;
      } else {
        param.error = "Please enter two values.";
        return param;
      }
    }

    // Voltage and Power given
    else if (isNumeric(request.tech_voltage) && isNumeric(request.tech_power)) {
      if (
        !isNumeric(request.tech_current) &&
        !isNumeric(request.tech_resistance)
      ) {
        let voltage = parseFloat(request.tech_voltage);
        let power = parseFloat(request.tech_power);

        if (request.tech_unit_v == "KV") voltage = voltage * 1000;
        if (request.tech_unit_v == "mV") voltage = voltage * 0.001;
        if (request.tech_unit_p == "kW") power = power * 1000;

        let current = Math.round((power / voltage) * 100000) / 100000;
        let resistance = Math.round((voltage / current) * 100000) / 100000;

        if (request.tech_unit_r == "kΩ") resistance = resistance * 0.001;
        if (request.tech_unit_p == "kW") power = power / 1000;
        if (request.tech_unit_v == "KV") voltage = voltage / 1000;
        if (request.tech_unit_v == "mV") voltage = voltage / 0.001;
        if (request.tech_unit_i == "mA") current = current * 1000;

        param.tech_voltage = `${voltage} ${request.tech_unit_v}`;
        param.tech_current = `${current} ${request.tech_unit_i}`;
        param.tech_resistance = `${resistance} ${request.tech_unit_r}`;
        param.tech_power = `${power} ${request.tech_unit_p}`;

        return param;
      } else {
        param.error = "Please enter two values.";
        return param;
      }
    }

    // Current and Resistance given
    else if (
      isNumeric(request.tech_current) &&
      isNumeric(request.tech_resistance)
    ) {
      if (!isNumeric(request.tech_voltage) && !isNumeric(request.tech_power)) {
        let resistance = parseFloat(request.tech_resistance);
        let current = parseFloat(request.tech_current);

        if (request.tech_unit_r == "kΩ") resistance = resistance * 1000;
        if (request.tech_unit_i == "mA") current = current / 1000;

        let voltage = Math.round(resistance * current * 100000) / 100000;
        let power =
          Math.round(Math.pow(current, 2) * resistance * 100000) / 100000;

        if (request.tech_unit_r == "kΩ") resistance = resistance * 0.001;
        if (request.tech_unit_p == "kW") power = power / 1000;
        if (request.tech_unit_v == "KV") voltage = voltage / 1000;
        if (request.tech_unit_v == "mV") voltage = voltage / 0.001;
        if (request.tech_unit_i == "mA") current = current * 1000;

        param.tech_voltage = `${voltage} ${request.tech_unit_v}`;
        param.tech_current = `${current} ${request.tech_unit_i}`;
        param.tech_resistance = `${resistance} ${request.tech_unit_r}`;
        param.tech_power = `${power} ${request.tech_unit_p}`;

        return param;
      } else {
        param.error = "Please enter two values.";
        return param;
      }
    }

    // Current and Power given
    else if (isNumeric(request.tech_current) && isNumeric(request.tech_power)) {
      if (
        !isNumeric(request.tech_voltage) &&
        !isNumeric(request.tech_resistance)
      ) {
        let power = parseFloat(request.tech_power);
        let current = parseFloat(request.tech_current);

        if (request.tech_unit_i == "mA") current = current / 1000;
        if (request.tech_unit_p == "kW") power = power * 1000;

        let voltage = Math.round((power / current) * 100000) / 100000;
        let resistance = Math.round((voltage / current) * 100000) / 100000;

        if (request.tech_unit_r == "kΩ") resistance = resistance * 0.001;
        if (request.tech_unit_p == "kW") power = power / 1000;
        if (request.tech_unit_v == "KV") voltage = voltage / 1000;
        if (request.tech_unit_v == "mV") voltage = voltage / 0.001;
        if (request.tech_unit_i == "mA") current = current * 1000;

        param.tech_voltage = `${voltage} ${request.tech_unit_v}`;
        param.tech_current = `${current} ${request.tech_unit_i}`;
        param.tech_resistance = `${resistance} ${request.tech_unit_r}`;
        param.tech_power = `${power} ${request.tech_unit_p}`;

        return param;
      } else {
        param.error = "Please enter two values.";
        return param;
      }
    }

    // Power and Resistance given
    else if (
      isNumeric(request.tech_power) &&
      isNumeric(request.tech_resistance)
    ) {
      if (!isNumeric(request.voltage) && !isNumeric(request.tech_current)) {
        let resistance = parseFloat(request.tech_resistance);
        let power = parseFloat(request.tech_power);

        if (request.tech_unit_r == "kΩ") resistance = resistance * 1000;
        if (request.tech_unit_p == "kW") power = power * 1000;

        let voltage =
          Math.round(Math.sqrt(resistance * power) * 100000) / 100000;
        let current = Math.round((voltage / resistance) * 100000) / 100000;

        if (request.tech_unit_r == "kΩ") resistance = resistance * 0.001;
        if (request.tech_unit_p == "kW") power = power / 1000;
        if (request.tech_unit_v == "KV") voltage = voltage / 1000;
        if (request.tech_unit_v == "mV") voltage = voltage / 0.001;
        if (request.tech_unit_i == "mA") current = current * 1000;

        param.tech_voltage = `${voltage} ${request.tech_unit_v}`;
        param.tech_current = `${current} ${request.tech_unit_i}`;
        param.tech_resistance = `${resistance} ${request.tech_unit_r}`;
        param.tech_power = `${power} ${request.tech_unit_p}`;

        return param;
      } else {
        param.error = "Please enter two values.";
        return param;
      }
    }

    // Invalid input
    else {
      param.error = "Please enter two values.";
      return param;
    }
  }

  /** getCalculationCrossProductcalculator
   * POST: /api/calculators-lol/cross-product-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationCrossProductcalculator(body) {
    let a_rep = body.tech_a_rep;
    let ax = body.tech_ax;
    let ay = body.tech_ay;
    let az = body.tech_az;
    let a1 = body.tech_a1;
    let a2 = body.tech_a2;
    let a3 = body.tech_a3;
    let b1 = body.tech_b1;
    let b2 = body.tech_b2;
    let b3 = body.tech_b3;
    let b_rep = body.tech_b_rep;
    let bx = body.tech_bx;
    let by = body.tech_by;
    let bz = body.tech_bz;
    let aa1 = body.tech_aa1;
    let aa2 = body.tech_aa2;
    let aa3 = body.tech_aa3;
    let bb1 = body.tech_bb1;
    let bb2 = body.tech_bb2;
    let bb3 = body.tech_bb3;

    function isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }
    let check = false;

    if (a_rep === "coor") {
      if (isNumeric(ax) && isNumeric(ay) && isNumeric(az)) {
        check = true;
      } else {
        check = false;
      }
    } else {
      if (
        isNumeric(a1) &&
        isNumeric(a2) &&
        isNumeric(a3) &&
        isNumeric(b1) &&
        isNumeric(b2) &&
        isNumeric(b3)
      ) {
        check = true;
      } else {
        check = false;
      }
    }

    if (b_rep === "coor") {
      if (isNumeric(bx) && isNumeric(by) && isNumeric(bz)) {
        check = true;
      } else {
        check = false;
      }
    } else {
      if (
        isNumeric(aa1) &&
        isNumeric(aa2) &&
        isNumeric(aa3) &&
        isNumeric(bb1) &&
        isNumeric(bb2) &&
        isNumeric(bb3)
      ) {
        check = true;
      } else {
        check = false;
      }
    }

    if (check === true) {
      return {
        tech_cross: "active",
      };
    } else {
      return {
        error: "Please fill all fields.",
      };
    }
  }

  /** getCalculationInstantaneousVelocitycalculator
   * POST: /api/calculators-lol/instantaneous-velocity-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationInstantaneousVelocitycalculator(body) {
    let i_d = body.tech_i_d;
    let i_d_unit = body.tech_i_d_unit;
    let f_d = body.tech_f_d;
    let f_d_unit = body.tech_f_d_unit;
    let i_tt = body.tech_i_tt;
    let i_tt_unit = body.tech_i_tt_unit;
    let f_tt = body.tech_f_tt;
    let f_tt_unit = body.tech_f_tt_unit;

    let result = {};

    function isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function round(n) {
      return Math.round(n * 100000) / 100000;
    }

    // Convert distances to meters
    if (isNumeric(i_d)) {
      i_d = parseFloat(i_d);
      if (i_d_unit === "cm") i_d = i_d / 100;
      else if (i_d_unit === "km") i_d = i_d / 0.001;
      else if (i_d_unit === "in") i_d = i_d / 39.37;
      else if (i_d_unit === "ft") i_d = i_d / 3.281;
      else if (i_d_unit === "yd") i_d = i_d / 1.0936;
      else if (i_d_unit === "mi") i_d = i_d / 0.0006214;
    }

    if (isNumeric(f_d)) {
      f_d = parseFloat(f_d);
      if (f_d_unit === "cm") f_d = f_d / 100;
      else if (f_d_unit === "km") f_d = f_d / 0.001;
      else if (f_d_unit === "in") f_d = f_d / 39.37;
      else if (f_d_unit === "ft") f_d = f_d / 3.281;
      else if (f_d_unit === "yd") f_d = f_d / 1.0936;
      else if (f_d_unit === "mi") f_d = f_d / 0.0006214;
    }

    // Convert time to seconds
    if (isNumeric(i_tt)) {
      i_tt = parseFloat(i_tt);
      if (i_tt_unit === "min") i_tt = i_tt / 0.016667;
      else if (i_tt_unit === "hrs") i_tt = i_tt / 0.0002778;
    }

    if (isNumeric(f_tt)) {
      f_tt = parseFloat(f_tt);
      if (f_tt_unit === "min") f_tt = f_tt / 0.016667;
      else if (f_tt_unit === "hrs") f_tt = f_tt / 0.0002778;
    }

    if (
      isNumeric(i_d) &&
      isNumeric(f_d) &&
      isNumeric(i_tt) &&
      isNumeric(f_tt)
    ) {
      let s1 = f_d - i_d;
      let s2 = f_tt - i_tt;
      let iv = s1 / s2;

      result.tech_method = "iv";
      result.tech_iv = round(iv);
      result.tech_id = round(i_d);
      result.tech_fd = round(f_d);
      result.tech_itt = round(i_tt);
      result.tech_ftt = round(f_tt);
      result.tech_s1 = round(s1);
      result.tech_s2 = round(s2);
    } else {
      result.error = "Please! Fill All The Fields!";
    }

    return result;
  }

  /**
   * getCalculationTorqueCalculator: Service Method
   * POST: /api/calculators-lol/torque-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationTorqueCalculator(body) {
    const param = {};

    // Helper function to convert angle units to radians
    function convertToRadians(angle, unit) {
      switch (unit) {
        case "deg":
          return angle * (Math.PI / 180);
        case "gon":
          return angle * 0.01570796;
        case "tr":
          return angle * 6.28319;
        case "arcmin":
          return angle * 0.000290888;
        case "arcsec":
          return angle * 0.00000484814;
        case "mrad":
          return angle * 0.001;
        case "μrad":
          return angle * 0.000001;
        default:
          return angle;
      }
    }

    // Helper function to convert from radians to other angle units
    function convertFromRadians(angle, unit) {
      switch (unit) {
        case "deg":
          return angle * (180 / Math.PI);
        case "gon":
          return angle * 63.662;
        case "tr":
          return angle * 0.159155;
        case "arcmin":
          return angle * 3437.75;
        case "arcsec":
          return angle * 206265;
        case "mrad":
          return angle / 0.001;
        case "μrad":
          return angle * 1000000;
        default:
          return angle;
      }
    }

    if (body.tech_to == 1) {
      // Mechanical Torque Calculation
      if (
        !isNaN(body.tech_distance) &&
        !isNaN(body.tech_force) &&
        !isNaN(body.tech_angle) &&
        (!body.tech_torque || body.tech_torque == "")
      ) {
        // Calculate torque from distance, force, angle
        let dis = parseFloat(body.tech_distance);
        switch (body.tech_dis_u) {
          case "mm":
            dis /= 1000;
            break;
          case "cm":
            dis /= 100;
            break;
          case "km":
            dis *= 1000;
            break;
          case "ft":
            dis *= 0.3048;
            break;
          case "yd":
            dis *= 0.9144;
            break;
          case "in":
            dis /= 39.37;
            break;
        }

        let force = parseFloat(body.tech_force);
        switch (body.tech_for_u) {
          case "kN":
            force *= 1000;
            break;
          case "MN":
            force *= 1000000;
            break;
          case "GN":
            force *= 1000000000;
            break;
          case "TN":
            force *= 1000000000000;
            break;
        }

        let angle = convertToRadians(
          parseFloat(body.tech_angle),
          body.tech_ang_u
        );
        let tor = dis * force * Math.sin(angle);

        switch (body.tech_tor_u) {
          case "kg-cm":
            tor = Math.round(tor * 10.19716 * 100000) / 100000;
            break;
          case "ft-lb":
            tor = Math.round(tor * 0.737562 * 100000) / 100000;
            break;
          default:
            tor = Math.round(tor * 100000) / 100000;
        }

        param.tech_dis =
          (isNaN(body.tech_distance) ? NaN : body.tech_distance) +
          " " +
          (body.tech_dis_u ?? "");
        param.tech_force =
          (isNaN(body.tech_force) ? NaN : body.tech_force) +
          " " +
          (body.tech_for_u ?? "");
        param.tech_angle =
          (isNaN(body.tech_angle) ? NaN : body.tech_angle) +
          " " +
          (body.tech_ang_u ?? "");
        param.tech_tor =
          (isNaN(tor) ? NaN : tor) + " " + (body.tech_tor_u ?? "");

        return param;
      } else if (
        !isNaN(body.tech_torque) &&
        !isNaN(body.tech_force) &&
        !isNaN(body.tech_angle) &&
        (!body.tech_distance || body.tech_distance == "")
      ) {
        // Calculate distance from torque, force, angle
        let tor = parseFloat(body.tech_torque);
        switch (body.tech_tor_u) {
          case "kg-cm":
            tor /= 10.19716;
            break;
          case "ft-lb":
            tor /= 0.737562;
            break;
        }

        let force = parseFloat(body.tech_force);
        switch (body.tech_for_u) {
          case "kN":
            force *= 1000;
            break;
          case "MN":
            force *= 1000000;
            break;
          case "GN":
            force *= 1000000000;
            break;
          case "TN":
            force *= 1000000000000;
            break;
        }

        let angle = convertToRadians(
          parseFloat(body.tech_angle),
          body.tech_ang_u
        );
        let dis = tor / (force * Math.sin(angle));

        switch (body.tech_dis_u) {
          case "mm":
            dis = Math.round(dis * 1000 * 100000) / 100000;
            break;
          case "cm":
            dis = Math.round(dis * 100 * 100000) / 100000;
            break;
          case "km":
            dis = Math.round((dis / 1000) * 100000) / 100000;
            break;
          case "ft":
            dis = Math.round((dis / 0.3048) * 100000) / 100000;
            break;
          case "yd":
            dis = Math.round((dis / 0.9144) * 100000) / 100000;
            break;
          case "in":
            dis = Math.round(dis * 39.37 * 100000) / 100000;
            break;
          default:
            dis = Math.round(dis * 100000) / 100000;
        }

        param.tech_tor =
          (isNaN(body.tech_torque) ? NaN : body.tech_torque) +
          " " +
          (body.tech_tor_u ?? "");
        param.tech_force =
          (isNaN(body.tech_force) ? NaN : body.tech_force) +
          " " +
          (body.tech_for_u ?? "");
        param.tech_angle =
          (isNaN(body.tech_angle) ? NaN : body.tech_angle) +
          " " +
          (body.tech_ang_u ?? "");
        param.tech_dis =
          (isNaN(dis) ? NaN : dis) + " " + (body.tech_dis_u ?? "");

        return param;
      } else if (
        !isNaN(body.tech_distance) &&
        !isNaN(body.tech_torque) &&
        !isNaN(body.tech_angle) &&
        (!body.tech_force || body.tech_force == "")
      ) {
        // Calculate force from distance, torque, angle
        let dis = parseFloat(body.tech_distance);
        switch (body.dis_u) {
          case "mm":
            dis /= 1000;
            break;
          case "cm":
            dis /= 100;
            break;
          case "km":
            dis *= 1000;
            break;
          case "ft":
            dis *= 0.3048;
            break;
          case "yd":
            dis *= 0.9144;
            break;
          case "in":
            dis /= 39.37;
            break;
        }

        let tor = parseFloat(body.tech_torque);
        switch (body.tech_tor_u) {
          case "kg-cm":
            tor /= 10.19716;
            break;
          case "ft-lb":
            tor /= 0.737562;
            break;
        }

        let angle = convertToRadians(
          parseFloat(body.tech_angle),
          body.tech_ang_u
        );
        let force = tor / (dis * Math.sin(angle));

        switch (body.tech_for_u) {
          case "kN":
            force = Math.round((force / 1000) * 100000) / 100000;
            break;
          case "MN":
            force = Math.round((force / 1000000) * 10000000) / 10000000;
            break;
          case "GN":
            force =
              Math.round((force / 1000000000) * 10000000000) / 10000000000;
            break;
          case "TN":
            force =
              Math.round((force / 1000000000000) * 100000000000000) /
              100000000000000;
            break;
          default:
            force = Math.round(force * 100000) / 100000;
        }

        param.tech_dis =
          (isNaN(body.tech_distance) ? "NaN" : body.tech_distance) +
          " " +
          (body.tech_dis_u ?? "");
        param.tech_force =
          (isNaN(force) ? "NaN" : force) + " " + (body.tech_for_u ?? "");
        param.tech_angle =
          (isNaN(body.tech_angle) ? "NaN" : body.tech_angle) +
          " " +
          (body.tech_ang_u ?? "");
        param.tech_tor =
          (isNaN(body.tech_torque) ? "NaN" : body.tech_torque) +
          " " +
          (body.tech_tor_u ?? "");

        return param;
      } else if (
        !isNaN(body.tech_distance) &&
        !isNaN(body.tech_torque) &&
        !isNaN(body.tech_force) &&
        (!body.tech_angle || body.tech_angle == "")
      ) {
        // Calculate angle from distance, torque, force
        let dis = parseFloat(body.tech_distance);
        switch (body.tech_dis_u) {
          case "mm":
            dis /= 1000;
            break;
          case "cm":
            dis /= 100;
            break;
          case "km":
            dis *= 1000;
            break;
          case "ft":
            dis *= 0.3048;
            break;
          case "yd":
            dis *= 0.9144;
            break;
          case "in":
            dis /= 39.37;
            break;
        }

        let tor = parseFloat(body.tech_torque);
        switch (body.tech_tor_u) {
          case "kg-cm":
            tor /= 10.19716;
            break;
          case "ft-lb":
            tor /= 0.737562;
            break;
        }

        let force = parseFloat(body.tech_force);
        switch (body.tech_for_u) {
          case "kN":
            force *= 1000;
            break;
          case "MN":
            force *= 1000000;
            break;
          case "GN":
            force *= 1000000000;
            break;
          case "TN":
            force *= 1000000000000;
            break;
        }

        let angle = Math.asin(tor / (dis * force));
        angle = convertFromRadians(angle, body.tech_ang_u);
        angle = Math.round(angle * 100000) / 100000;

        param.tech_dis =
          (isNaN(body.tech_distance) ? "NaN" : body.tech_distance) +
          " " +
          (body.tech_dis_u ?? "");
        param.tech_force =
          (isNaN(body.tech_force) ? "NaN" : body.tech_force) +
          " " +
          (body.tech_for_u ?? "");
        param.tech_angle =
          (isNaN(angle) ? "NaN" : angle) + " " + (body.tech_ang_u ?? "");
        param.tech_tor =
          (isNaN(body.tech_torque) ? "NaN" : body.tech_torque) +
          " " +
          (body.tech_tor_u ?? "");

        return param;
      } else {
        param.error = "Please! enter any three values";
        return param;
      }
    } else if (body.tech_to == 2) {
      // Magnetic Torque Calculation
      const getCurrentMultiplier = (unit) => {
        switch (unit) {
          case "A":
            return { multiplier: 1, unit: "A" };
          case "mA":
            return { multiplier: 0.001, unit: "mA" };
          case "kA":
            return { multiplier: 1000, unit: "kA" };
          case "μA":
            return { multiplier: 0.000001, unit: "μA" };
          case "boit":
            return { multiplier: 10, unit: "boi" };
          default:
            return { multiplier: 1, unit: "A" };
        }
      };

      const getAreaMultiplier = (unit) => {
        switch (unit) {
          case "m²":
            return { multiplier: 1, unit: "m²" };
          case "km²":
            return { multiplier: 1000000, unit: "km²" };
          case "Mile²":
            return { multiplier: 2589988.1103, unit: "Mile²" };
          case "ac":
            return { multiplier: 4046.8564224, unit: "ac" };
          case "yd²":
            return { multiplier: 0.83612735998838, unit: "yd²" };
          case "ft²":
            return { multiplier: 0.0929030399987, unit: "ft²" };
          case "in²":
            return { multiplier: 0.000645156, unit: "in²" };
          case "cm²":
            return { multiplier: 0.0001, unit: "cm²" };
          case "mm²":
            return { multiplier: 0.000001, unit: "mm²" };
          default:
            return { multiplier: 1, unit: "m²" };
        }
      };

      const getMagneticMultiplier = (unit) => {
        switch (unit) {
          case "T":
            return { multiplier: 1, unit: "T" };
          case "mT":
            return { multiplier: 0.001, unit: "mT" };
          case "μT":
            return { multiplier: 0.000001, unit: "μT" };
          default:
            return { multiplier: 1, unit: "T" };
        }
      };

      // Calculate torque from loop, angle, current, area, mag
      if (
        !isNaN(body.tech_loop) &&
        !isNaN(body.tech_angle_c) &&
        !isNaN(body.tech_current) &&
        !isNaN(body.tech_area) &&
        !isNaN(body.tech_mag) &&
        (!body.tech_tor || body.tech_tor == "")
      ) {
        const angle = convertToRadians(
          parseFloat(body.tech_angle_c),
          body.tech_angc_u
        );
        const currentInfo = getCurrentMultiplier(body.tech_cur_u);
        const areaInfo = getAreaMultiplier(body.tech_area_u);
        const magInfo = getMagneticMultiplier(body.tech_mag_u);

        const loop = parseFloat(body.tech_loop);
        const current = parseFloat(body.tech_current) * currentInfo.multiplier;
        const area = parseFloat(body.tech_area) * areaInfo.multiplier;
        const mag = parseFloat(body.tech_mag) * magInfo.multiplier;

        let tor = loop * current * mag * area * Math.sin(angle);
        // console.log(loop)
        switch (body.tech_torc_u) {
          case "kg-cm":
            tor = Math.round(tor * 10.19716 * 100000) / 100000;
            break;
          case "ft-lb":
            tor = Math.round(tor * 0.737562 * 100000) / 100000;
            break;
          default:
            tor = Math.round(tor * 100000) / 100000;
        }

        param.tech_tor =
          (isNaN(tor) ? "NaN" : tor) + " " + (body.tech_torc_u ?? "");
        param.tech_loop = isNaN(loop) ? "NaN" : loop;
        param.tech_angle =
          (isNaN(body.tech_angle_c) ? "NaN" : body.tech_angle_c) +
          " " +
          (body.tech_angc_u ?? "");
        param.tech_area =
          (isNaN(body.tech_area) ? "NaN" : body.tech_area) +
          " " +
          (areaInfo.unit ?? "");
        param.tech_mag =
          (isNaN(body.mag) ? "NaN" : body.mag) + " " + (magInfo.unit ?? "");
        param.tech_current =
          (isNaN(body.tech_current) ? "NaN" : body.tech_current) +
          " " +
          (currentInfo.unit ?? "");

        return param;
      } else if (
        !isNaN(body.tech_tor) &&
        !isNaN(body.tech_angle_c) &&
        !isNaN(body.tech_current) &&
        !isNaN(body.tech_area) &&
        !isNaN(body.tech_mag) &&
        (!body.tech_loop || body.tech_loop == "")
      ) {
        // Calculate loop from torque, angle, current, area, mag
        const angle = convertToRadians(
          parseFloat(body.tech_angle_c),
          body.tech_angc_u
        );
        let tor = parseFloat(body.tech_tor);
        switch (body.tech_torc_u) {
          case "kg-cm":
            tor /= 10.19716;
            break;
          case "ft-lb":
            tor /= 0.737562;
            break;
        }

        const currentInfo = getCurrentMultiplier(body.tech_cur_u);
        const areaInfo = getAreaMultiplier(body.tech_area_u);
        const magInfo = getMagneticMultiplier(body.tech_mag_u);

        const current = parseFloat(body.tech_current) * currentInfo.multiplier;
        const area = parseFloat(body.tech_area) * areaInfo.multiplier;
        const mag = parseFloat(body.tech_mag) * magInfo.multiplier;

        const loop = tor / (current * mag * area * Math.sin(angle));
        const roundedLoop = Math.round(loop * 1000000) / 1000000;

        param.tech_tor =
          (isNaN(body.tech_tor) ? "NaN" : body.tech_tor) +
          " " +
          (body.tech_torc_u ?? "");
        param.tech_loop = isNaN(roundedLoop) ? "NaN" : roundedLoop;
        param.tech_angle =
          (isNaN(body.tech_angle_c) ? "NaN" : body.tech_angle_c) +
          " " +
          (body.tech_angc_u ?? "");
        param.tech_area =
          (isNaN(body.tech_area) ? "NaN" : body.tech_area) +
          " " +
          (areaInfo.unit ?? "");
        param.tech_mag =
          (isNaN(body.tech_mag) ? "NaN" : body.tech_mag) +
          " " +
          (magInfo.unit ?? "");
        param.tech_current =
          (isNaN(body.tech_current) ? "NaN" : body.tech_current) +
          " " +
          (currentInfo.unit ?? "");

        return param;
      } else if (
        !isNaN(body.tech_loop) &&
        !isNaN(body.tech_angle_c) &&
        !isNaN(body.tech_tor) &&
        !isNaN(body.tech_area) &&
        !isNaN(body.tech_mag) &&
        (!body.tech_current || body.tech_current == "")
      ) {
        // Calculate current from loop, angle, torque, area, mag
        const angle = convertToRadians(
          parseFloat(body.tech_angle_c),
          body.tech_angc_u
        );
        const loop = parseFloat(body.tech_loop);
        let tor = parseFloat(body.tech_tor);
        switch (body.tech_torc_u) {
          case "kg-cm":
            tor /= 10.19716;
            break;
          case "ft-lb":
            tor /= 0.737562;
            break;
        }

        const areaInfo = getAreaMultiplier(body.tech_area_u);
        const magInfo = getMagneticMultiplier(body.tech_mag_u);
        const currentInfo = getCurrentMultiplier(body.tech_cur_u);

        const area = parseFloat(body.tech_area) * areaInfo.multiplier;
        const mag = parseFloat(body.tech_mag) * magInfo.multiplier;

        let current = tor / (loop * mag * area * Math.sin(angle));
        current = current / currentInfo.multiplier;
        current = Math.round(current * 10000000) / 10000000;

        param.tech_tor =
          (isNaN(body.tech_tor) ? "NaN" : body.tech_tor) +
          " " +
          (body.tech_torc_u ?? "");
        param.tech_loop = isNaN(loop) ? "NaN" : loop;
        param.tech_angle =
          (isNaN(body.tech_angle_c) ? "NaN" : body.tech_angle_c) +
          " " +
          (body.tech_angc_u ?? "");
        param.tech_area =
          (isNaN(body.tech_area) ? "NaN" : body.tech_area) +
          " " +
          (areaInfo.unit ?? "");
        param.tech_mag =
          (isNaN(body.tech_mag) ? "NaN" : body.tech_mag) +
          " " +
          (magInfo.unit ?? "");
        param.tech_current =
          (isNaN(current) ? "NaN" : current) + " " + (currentInfo.unit ?? "");

        return param;
      } else if (
        !isNaN(body.tech_loop) &&
        !isNaN(body.tech_angle_c) &&
        !isNaN(body.tech_current) &&
        !isNaN(body.tech_tor) &&
        !isNaN(body.tech_mag) &&
        (!body.tech_area || body.tech_area == "")
      ) {
        // Calculate area from loop, angle, current, torque, mag
        const angle = convertToRadians(
          parseFloat(body.tech_angle_c),
          body.tech_angc_u
        );
        const loop = parseFloat(body.tech_loop);
        const currentInfo = getCurrentMultiplier(body.tech_cur_u);
        let tor = parseFloat(body.tech_tor);
        switch (body.tech_torc_u) {
          case "kg-cm":
            tor /= 10.19716;
            break;
          case "ft-lb":
            tor /= 0.737562;
            break;
        }

        const magInfo = getMagneticMultiplier(body.tech_mag_u);
        const areaInfo = getAreaMultiplier(body.tech_area_u);

        const current = parseFloat(body.tech_current) * currentInfo.multiplier;
        const mag = parseFloat(body.tech_mag) * magInfo.multiplier;

        let area = tor / (loop * current * mag * Math.sin(angle));
        area = area / areaInfo.multiplier;
        area = Math.round(area * 10000000) / 10000000;

        param.tech_tor =
          (isNaN(body.tech_tor) ? "NaN" : body.tech_tor) +
          " " +
          (body.tech_torc_u ?? "");
        param.tech_loop = isNaN(loop) ? "NaN" : loop;
        param.tech_angle =
          (isNaN(body.tech_angle_c) ? "NaN" : body.tech_angle_c) +
          " " +
          (body.tech_angc_u ?? "");
        param.tech_area =
          (isNaN(area) ? "NaN" : area) + " " + (areaInfo.unit ?? "");
        param.tech_mag =
          (isNaN(body.tech_mag) ? "NaN" : body.tech_mag) +
          " " +
          (magInfo.unit ?? "");
        param.tech_current =
          (isNaN(body.tech_current) ? "NaN" : body.tech_current) +
          " " +
          (currentInfo.unit ?? "");

        return param;
      } else if (
        !isNaN(body.tech_loop) &&
        !isNaN(body.tech_angle_c) &&
        !isNaN(body.tech_current) &&
        !isNaN(body.tech_area) &&
        !isNaN(body.tech_tor) &&
        (!body.tech_mag || body.tech_mag == "")
      ) {
        // Calculate mag from loop, angle, current, area, torque
        const angle = convertToRadians(
          parseFloat(body.tech_angle_c),
          body.tech_angc_u
        );
        const loop = parseFloat(body.tech_loop);
        let tor = parseFloat(body.tech_tor);
        switch (body.tech_torc_u) {
          case "kg-cm":
            tor /= 10.19716;
            break;
          case "ft-lb":
            tor /= 0.737562;
            break;
        }

        const currentInfo = getCurrentMultiplier(body.tech_cur_u);
        const areaInfo = getAreaMultiplier(body.tech_area_u);
        const magInfo = getMagneticMultiplier(body.tech_mag_u);
        const current = parseFloat(body.tech_current) * currentInfo.multiplier;
        const area = parseFloat(body.tech_area) * areaInfo.multiplier;

        let mag = tor / (loop * current * area * Math.sin(angle));
        mag = mag / magInfo.multiplier;
        param.tech_tor =
          (isNaN(body.tech_tor) ? "NaN" : body.tech_tor) +
          " " +
          (body.tech_torc_u ?? "");
        param.tech_loop = isNaN(loop) ? "NaN" : loop;
        param.tech_angle =
          (isNaN(body.tech_angle_c) ? "NaN" : body.tech_angle_c) +
          " " +
          (body.tech_angc_u ?? "");
        param.tech_area =
          (isNaN(body.tech_area) ? "NaN" : body.tech_area) +
          " " +
          (areaInfo.unit ?? "");
        param.tech_mag =
          (isNaN(mag) ? "NaN" : mag) + " " + (magInfo.unit ?? "");
        param.tech_current =
          (isNaN(body.tech_current) ? "NaN" : body.tech_current) +
          " " +
          (currentInfo.unit ?? "");

        return param;
      } else if (
        !isNaN(body.tech_loop) &&
        !isNaN(body.tech_tor) &&
        !isNaN(body.tech_current) &&
        !isNaN(body.tech_area) &&
        !isNaN(body.tech_mag) &&
        (!body.tech_angle_c || body.tech_angle_c == "")
      ) {
        // Calculate angle from loop, torque, current, area, mag
        let tor = parseFloat(body.tech_tor);
        switch (body.tech_torc_u) {
          case "kg-cm":
            tor /= 10.19716;
            break;
          case "ft-lb":
            tor /= 0.737562;
            break;
        }

        const loop = parseFloat(body.tech_loop);
        const currentInfo = getCurrentMultiplier(body.tech_cur_u);
        const areaInfo = getAreaMultiplier(body.tech_area_u);
        const magInfo = getMagneticMultiplier(body.tech_mag_u);

        const current = parseFloat(body.tech_current) * currentInfo.multiplier;
        const area = parseFloat(body.tech_area) * areaInfo.multiplier;
        const mag = parseFloat(body.tech_mag) * magInfo.multiplier;

        let angle = Math.asin(tor / (loop * current * mag * area));
        angle = convertFromRadians(angle, body.tech_angc_u);
        angle = Math.round(angle * 100000) / 100000;

        param.tech_tor =
          (isNaN(body.tech_tor) ? "NaN" : body.tech_tor) +
          " " +
          (body.tech_torc_u ?? "");
        param.tech_loop = isNaN(loop) ? "NaN" : loop;
        param.tech_angle =
          (isNaN(angle) ? "NaN" : angle) + " " + (body.tech_angc_u ?? "");
        param.tech_area =
          (isNaN(body.tech_area) ? "NaN" : body.tech_area) +
          " " +
          (areaInfo.unit ?? "");
        param.tech_mag =
          (isNaN(body.tech_mag) ? "NaN" : body.tech_mag) +
          " " +
          (magInfo.unit ?? "");
        param.tech_current =
          (isNaN(body.tech_current) ? "NaN" : body.tech_current) +
          " " +
          (currentInfo.unit ?? "");

        return param;
      } else {
        param.error = "Please! enter any five values";
        return param;
      }
    } else if (body.tech_to == 3) {
      // Vector Cross Product Calculation
      if (
        !isNaN(body.tech_ax) &&
        !isNaN(body.tech_ay) &&
        !isNaN(body.tech_az) &&
        !isNaN(body.tech_bx) &&
        !isNaN(body.tech_by) &&
        !isNaN(body.tech_bz)
      ) {
        const ax = parseFloat(body.tech_ax);
        const ay = parseFloat(body.tech_ay);
        const az = parseFloat(body.tech_az);
        const bx = parseFloat(body.tech_bx);
        const by = parseFloat(body.tech_by);
        const bz = parseFloat(body.tech_bz);

        const ans_a1 = ay * bz - by * az;
        const ans_a2 = (ax * bz - bx * az) * -1;
        const ans_a3 = ax * by - bx * ay;

        const ans =
          ans_a1 +
          "i " +
          (ans_a2 < 0 ? ans_a2 : "+" + ans_a2) +
          "j " +
          (ans_a3 < 0 ? ans_a3 : "+" + ans_a3) +
          "k";

        param.tech_ans = ans;
        return param;
      } else {
        param.error = "Please! enter Distance Vector & Force Vector";
        return param;
      }
    } else {
      param.error = "Invalid calculation type";
      return param;
    }
  }

  /**
   * getCalculationHorsepowerCalculator: Service Method
   * POST: /api/calculators-lol/horsepower-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationHorsepowerCalculator(body) {
    const param = {};

    if (body.tech_method == 1) {
      if (!isNaN(body.tech_weight) && !isNaN(body.tech_time)) {
        let weight = parseFloat(body.tech_weight);
        if (body.tech_unit_w == "kg") {
          weight = weight * 2.2046;
        }

        let time = parseFloat(body.tech_time);
        if (body.tech_unit_t == "min") {
          time = time * 60;
        } else if (body.tech_unit_t == "h") {
          time = time * 60 * 60;
        }

        const hp = weight / Math.pow(time / 5.825, 3);
        const value_exp = hp.toString().split(".");
        const hpm = parseFloat(
          value_exp[0] +
            "." +
            (value_exp[1] ? value_exp[1].substring(0, 1) : "0")
        );
        const hpmet = Math.round(hpm * 1.01387 * 10) / 10;
        const hpkw = Math.round(hpm * 0.746 * 10) / 10;
        const hpw = Math.round(hpm * 746 * 10) / 10;

        param.tech_hpm = isNaN(hpm) ? "NaN" : hpm;
        param.tech_hpmet = isNaN(hpmet) ? "NaN" : hpmet;
        param.tech_hpkw = isNaN(hpkw) ? "NaN" : hpkw;
        param.tech_hpw = isNaN(hpw) ? "NaN" : hpw;

        return param;
      } else {
        param.error = "Please! fill all fields";
        return param;
      }
    } else if (body.tech_method == 2) {
      if (!isNaN(body.tech_weight) && !isNaN(body.tech_speed)) {
        let weight = parseFloat(body.tech_weight);
        if (body.tech_unit_w == "kg") {
          weight = weight * 2.2046;
        }

        let speed = parseFloat(body.tech_speed);
        if (body.tech_unit_s == "km/h") {
          speed = speed / 0.621371;
        } else if (body.tech_unit_s == "km/s") {
          speed = speed * 2236.94;
        } else if (body.tech_unit_s == "m/s") {
          speed = speed * 2.237;
        }

        const hp = weight * Math.pow(speed / 234, 3);
        const value_exp = hp.toString().split(".");
        const hpm = parseFloat(
          value_exp[0] +
            "." +
            (value_exp[1] ? value_exp[1].substring(0, 1) : "0")
        );
        const hpmet = Math.round(hpm * 1.01387 * 10) / 10;
        const hpkw = Math.round(hpm * 0.746 * 10) / 10;
        const hpw = Math.round(hpm * 746 * 10) / 10;

        param.tech_hpm = isNaN(hpm) ? "NaN" : hpm;
        param.tech_hpmet = isNaN(hpmet) ? "NaN" : hpmet;
        param.tech_hpkw = isNaN(hpkw) ? "NaN" : hpkw;
        param.tech_hpw = isNaN(hpw) ? "NaN" : hpw;

        return param;
      } else {
        param.error = "Please! fill all fields";
        return param;
      }
    } else if (body.tech_method == 4) {
      if (
        !isNaN(body.tech_force) &&
        !isNaN(body.tech_distance) &&
        !isNaN(body.tech_btime)
      ) {
        let force = parseFloat(body.tech_force);
        let dis = parseFloat(body.tech_distance);
        const time = parseFloat(body.tech_btime);

        if (body.tech_dis_u == "mm") {
          dis = dis / 1000;
        } else if (body.tech_dis_u == "cm") {
          dis = dis / 100;
        } else if (body.tech_dis_u == "km") {
          dis = dis * 1000;
        } else if (body.tech_dis_u == "ft") {
          dis = dis * 0.3048;
        } else if (body.tech_dis_u == "yd") {
          dis = dis * 0.9144;
        }

        if (body.tech_for_u == "kN") {
          force = force * 1000;
        } else if (body.tech_for_u == "MN") {
          force = force * 1000000;
        } else if (body.tech_for_u == "GN") {
          force = force * 1000000000;
        } else if (body.tech_for_u == "TN") {
          force = force * 1000000000000;
        }

        const hp = force * (dis / time);
        param.tech_hp = isNaN(hp) ? "NaN" : hp;
        return param;
      } else {
        param.error = "Please! fill all fields";
        return param;
      }
    } else if (body.tech_method == 3) {
      if (body.tech_to == 1) {
        if (!isNaN(body.tech_rpm) && !isNaN(body.tech_tor)) {
          const rpm = parseFloat(body.tech_rpm);
          const tor = parseFloat(body.tech_tor);
          const hp = (rpm * tor) / 5252;
          const value_exp = hp.toString().split(".");

          let hpm;
          if (value_exp[1]) {
            hpm = parseFloat(value_exp[0] + "." + value_exp[1].substring(0, 2));
          } else {
            hpm = parseFloat(value_exp[0]);
          }

          const hpmet = Math.round(hpm * 1.01387 * 10) / 10;
          const hpkw = Math.round(hpm * 0.746 * 10) / 10;
          const hpw = Math.round(hpm * 746 * 10) / 10;

          param.tech_hpm = isNaN(hpm) ? "NaN" : hpm;
          param.tech_hpmet = isNaN(hpmet) ? "NaN" : hpmet;
          param.tech_hpkw = isNaN(hpkw) ? "NaN" : hpkw;
          param.tech_hpw = isNaN(hpw) ? "NaN" : hpw;

          return param;
        } else {
          param.error = "Please! fill all fields";
          return param;
        }
      } else if (body.tech_to == 2) {
        if (!isNaN(body.rpm) && !isNaN(body.tech_hors)) {
          const rpm = parseFloat(body.tech_rpm);
          const hp = parseFloat(body.tech_hors);
          const tor = Math.round(((hp * 5252) / rpm) * 10000) / 10000;
          param.tech_tor = isNaN(tor) ? "NaN" : tor.toFixed(4);
          return param;
        } else {
          param.error = "Please! fill all fields";
          return param;
        }
      }
    }
  }

  /** getCalculationPhotonEnergycalculator
   * POST: /api/calculators-lol/photon-energy-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationPhotonEnergycalculator(body) {
    let wave = body.tech_wave;
    let freq = body.tech_freq;
    let unit_w = body.tech_unit_w;
    let unit_f = body.tech_unit_f;

    let result = {};
    const h = 6.6260695729e-34; // Planck's constant
    const c = 2.99792458e8; // Speed of light

    function isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function formatScientific(val) {
      const parts = val.toExponential().split("e");
      return `${parseFloat(parts[0]).toFixed(4)} x 10<sup>${parseInt(
        parts[1]
      )}</sup>`;
    }

    // Check if wave is provided
    if (isNumeric(wave)) {
      wave = parseFloat(wave);
      switch (unit_w) {
        case "Å":
          wave = wave / 1e10;
          break;
        case "nm":
          wave = wave / 1e9;
          break;
        case "μm":
          wave = wave / 1e6;
          break;
        case "mm":
          wave = wave / 1000;
          break;
        case "km":
          wave = wave * 1000;
          break;
      }

      let energy = (h * c) / wave;
      let frequency = energy / h;
      let en = energy;
      let energyFormatted = formatScientific(energy);

      result.tech_energy = energyFormatted;
      result.tech_en = en;
      result.tech_frequency = Math.round(frequency * 1000) / 1000;
      return result;
    } else if (isNumeric(freq)) {
      freq = parseFloat(freq);
      switch (unit_f) {
        case "kHz":
          freq *= 1e3;
          break;
        case "MHz":
          freq *= 1e6;
          break;
        case "GHz":
          freq *= 1e9;
          break;
        case "THz":
          freq *= 1e12;
          break;
        case "RPM":
          freq /= 60;
          break;
      }

      let energy = h * freq;
      let wave = (h * c) / energy;
      let en = energy;
      let energyFormatted = formatScientific(energy);

      result.tech_energy = energyFormatted;
      result.tech_en = en;
      result.tech_wave = Math.round(wave * 1000) / 1000;
      return result;
    } else {
      result.error = "Please fill all fields.";
      return result;
    }
  }

  /** getCalculationDotProductcalculator
   * POST: /api/calculators-lol/dot-product-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationDotProductcalculator(body) {
    let input1 = body.tech_input1;
    let input2 = body.tech_input2;

    let result = {};

    let components = input1.split(",").map((v) => v.trim());
    let components2 = input2.split(",").map((v) => v.trim());

    function isNumericArray(arr) {
      return arr.every((val) => !isNaN(val));
    }

    if (!isNumericArray(components) || !isNumericArray(components2)) {
      result.error = "Sets may contain only integers and decimals";
      return result;
    }

    if (components.length !== components2.length) {
      result.error = "The input arrays must have the same length.";
      return result;
    }

    if (input1 && input2) {
      let a = components.map(Number);
      let b = components2.map(Number);

      let products = a.map((val, idx) => val * b[idx]);
      let prod = products.reduce((sum, val) => sum + val, 0);

      let sumSqA = a.reduce((sum, val) => sum + val ** 2, 0);
      let sumSqB = b.reduce((sum, val) => sum + val ** 2, 0);

      let mgntd_a = Math.sqrt(sumSqA);
      let mgntd_b = Math.sqrt(sumSqB);

      let angle = prod / (mgntd_a * mgntd_b);
      let theta = Math.acos(angle);
      let deg = theta * (180 / Math.PI);

      result.tech_components = a;
      result.tech_components2 = b;
      result.tech_mgntd_a = Math.round(mgntd_a * 100) / 100;
      result.tech_mgntd_b = Math.round(mgntd_b * 100) / 100;
      result.tech_prod = prod;
      result.tech_angle = Math.round(angle * 1e7) / 1e7;
      result.tech_deg = Math.round(deg * 1e5) / 1e5;
      return result;
    } else {
      result.error = "Please Fill All The Fields";
      return result;
    }
  }
  /**
   * getCalculationKinematicsCalculator: Service Method
   * POST: /api/calculators-lol/kinematics-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationKinematicsCalculator(body) {
    const param = {};
    let check = false;
    let iv, fv, time, a, dis;
    let ivDisplay, fvDisplay, timeDisplay, aDisplay, disDisplay;

    // Helper functions
    const isNumeric = (value) => !isNaN(parseFloat(value)) && isFinite(value);
    const isEmpty = (value) =>
      value == undefined || value == null || value == "";
    const round = (value, decimals) =>
      Number(Math.round(value + "e" + decimals) + "e-" + decimals);

    // Convert velocity to m/s
    const convertVelocityToMs = (value, unit) => {
      let result = parseFloat(value);
      switch (unit) {
        case "ft/s":
          return result / 3.281;
        case "km/h":
          return result / 3.6;
        case "km/s":
          return result * 1000;
        case "mi/s":
          return result * 1609.35;
        case "mph":
          return result / 2.237;
        default:
          return result;
      }
    };

    // Convert acceleration to m/s²
    const convertAccelerationToMs2 = (value, unit) => {
      let result = parseFloat(value);
      if (unit == "ft/s²") return result / 3.2808399;
      return result;
    };

    // Convert time to seconds
    const convertTimeToSeconds = (value, unit) => {
      let result = parseFloat(value);
      switch (unit) {
        case "min":
          return result * 60;
        case "h":
          return result * 60 * 60;
        default:
          return result;
      }
    };

    // Convert distance to meters
    const convertDistanceToMeters = (value, unit) => {
      let result = parseFloat(value);
      switch (unit) {
        case "cm":
          return result / 100;
        case "in":
          return result / 39.37;
        case "ft":
          return result / 3.281;
        case "km":
          return result / 1000;
        case "mi":
          return result * 1609.35;
        case "yd":
          return result / 1.094;
        default:
          return result;
      }
    };

    // Format velocity for display
    const formatVelocity = (value, unit) => {
      let result = parseFloat(value);
      switch (unit) {
        case "ft/s":
          return round(result * 3.281, 4);
        case "km/h":
          return round(result * 3.6, 4);
        case "km/s":
          return round(result / 1000, 4);
        case "mi/s":
          return round(result / 1609.35, 4);
        case "mph":
          return round(result * 2.237, 4);
        default:
          return round(result, 4);
      }
    };

    // Format acceleration for display
    const formatAcceleration = (value, unit) => {
      let result = parseFloat(value);
      if (unit == "ft/s²") return round(result * 3.2808399, 4);
      return round(result, 4);
    };

    // Format distance for display
    const formatDistance = (value, unit) => {
      let result = parseFloat(value);
      switch (unit) {
        case "cm":
          return round(result * 100, 4);
        case "in":
          return round(result * 39.37, 4);
        case "ft":
          return round(result * 3.281, 4);
        case "km":
          return round(result * 1000, 4);
        case "mi":
          return round(result / 1609.35, 4);
        case "yd":
          return round(result * 1.094, 4);
        default:
          return round(result, 4);
      }
    };

    // Format time for display
    const formatTime = (value, unit) => {
      let result = parseFloat(value);
      switch (unit) {
        case "min":
          return round(result / 60, 4);
        case "h":
          return round(result / 60 / 60, 4);
        default:
          return round(result, 4);
      }
    };

    // Case 1: iv, fv, ct provided
    if (
      isNumeric(body.tech_iv) &&
      isNumeric(body.tech_fv) &&
      isNumeric(body.tech_ct)
    ) {
      if (
        !isEmpty(body.tech_cac) ||
        body.tech_cac == "0" ||
        !isEmpty(body.tech_cdis) ||
        body.tech_cdis == "0"
      ) {
        param.error = "Please enter any three values";
        return param;
      } else {
        check = true;
        iv = convertVelocityToMs(body.tech_iv, body.tech_ivU);
        fv = convertVelocityToMs(body.tech_fv, body.tech_fvU);
        time = convertTimeToSeconds(body.tech_ct, body.tech_ctU);

        a = (fv - iv) / time;
        dis = iv * time + 0.5 * a * Math.pow(time, 2);

        ivDisplay = body.tech_iv + " " + body.tech_ivU;
        fvDisplay = body.tech_fv + " " + body.tech_fvU;
        timeDisplay = body.tech_ct + " " + body.tech_ctU;
        aDisplay = formatAcceleration(a, body.tech_cacU) + " " + body.tech_cacU;
        disDisplay =
          formatDistance(dis, body.tech_cdisU) + " " + body.tech_cdisU;
      }
    }
    // Case 2: iv, fv, cac provided
    else if (
      isNumeric(body.tech_iv) &&
      isNumeric(body.tech_fv) &&
      isNumeric(body.tech_cac)
    ) {
      if (
        !isEmpty(body.tech_ct) ||
        body.tech_ct == "0" ||
        !isEmpty(body.tech_cdis) ||
        body.tech_cdis == "0"
      ) {
        param.error = "Please fill all fields.";
        return param;
      } else {
        check = true;
        iv = convertVelocityToMs(body.tech_iv, body.tech_ivU);
        fv = convertVelocityToMs(body.tech_fv, body.tech_fvU);
        a = convertAccelerationToMs2(body.tech_cac, body.tech_cacU);

        time = (fv - iv) / a;
        dis = iv * time + 0.5 * a * Math.pow(time, 2);

        ivDisplay = body.tech_iv + " " + body.tech_ivU;
        fvDisplay = body.tech_fv + " " + body.tech_fvU;
        aDisplay = body.tech_cac + " " + body.tech_cacU;
        timeDisplay = formatTime(time, body.tech_ctU) + " " + body.tech_ctU;
        disDisplay =
          formatDistance(dis, body.tech_cdisU) + " " + body.tech_cdisU;
      }
    }
    // Case 3: ct, fv, cac provided
    else if (
      isNumeric(body.tech_ct) &&
      isNumeric(body.tech_fv) &&
      isNumeric(body.tech_cac)
    ) {
      if (
        !isEmpty(body.tech_iv) ||
        body.tech_iv == "0" ||
        !isEmpty(body.tech_cdis) ||
        body.tech_cdis == "0"
      ) {
        param.error = "Please fill all fields.";
        return param;
      } else {
        check = true;
        time = convertTimeToSeconds(body.tech_ct, body.tech_ctU);
        fv = convertVelocityToMs(body.tech_fv, body.tech_fvU);
        a = convertAccelerationToMs2(body.tech_cac, body.tech_cacU);

        iv = fv - a * time;
        dis = iv * time + 0.5 * a * Math.pow(time, 2);

        timeDisplay = body.tech_ct + " " + body.tech_ctU;
        fvDisplay = body.tech_fv + " " + body.tech_fvU;
        aDisplay = body.tech_cac + " " + body.tech_cacU;
        ivDisplay = formatVelocity(iv, body.tech_ivU) + " " + body.tech_ivU;
        disDisplay =
          formatDistance(dis, body.tech_cdisU) + " " + body.tech_cdisU;
      }
    }
    // Case 4: ct, iv, cac provided
    else if (
      isNumeric(body.tech_ct) &&
      isNumeric(body.tech_iv) &&
      isNumeric(body.tech_cac)
    ) {
      if (
        !isEmpty(body.tech_fv) ||
        body.tech_fv == "0" ||
        !isEmpty(body.tech_cdis) ||
        body.tech_cdis == "0"
      ) {
        param.error = "Please fill all fields.";
        return param;
      } else {
        check = true;
        time = convertTimeToSeconds(body.tech_ct, body.tech_ctU);
        iv = convertVelocityToMs(body.tech_iv, body.tech_ivU);
        a = convertAccelerationToMs2(body.tech_cac, body.tech_cacU);

        fv = a * time + iv;
        dis = iv * time + 0.5 * a * Math.pow(time, 2);

        ivDisplay = body.tech_iv + " " + body.tech_ivU;
        timeDisplay = body.tech_ct + " " + body.tech_ctU;
        aDisplay = body.tech_cac + " " + body.tech_cacU;
        fvDisplay = formatVelocity(fv, body.tech_fvU) + " " + body.tech_fvU;
        disDisplay =
          formatDistance(dis, body.tech_cdisU) + " " + body.tech_cdisU;
      }
    }
    // Case 5: cdis, iv, ct provided
    else if (
      isNumeric(body.tech_cdis) &&
      isNumeric(body.tech_iv) &&
      isNumeric(body.tech_ct)
    ) {
      if (
        !isEmpty(body.tech_fv) ||
        body.tech_fv == "0" ||
        !isEmpty(body.tech_cac) ||
        body.tech_cac == "0"
      ) {
        param.error = "Please fill all fields.";
        return param;
      } else {
        check = true;
        dis = convertDistanceToMeters(body.tech_cdis, body.tech_cdisU);
        time = convertTimeToSeconds(body.tech_ct, body.tech_ctU);
        iv = convertVelocityToMs(body.tech_iv, body.tech_ivU);

        a = (2 * (dis - iv * time)) / Math.pow(time, 2);
        fv = a * time + iv;

        ivDisplay = body.tech_iv + " " + body.tech_ivU;
        timeDisplay = body.tech_ct + " " + body.tech_ctU;
        disDisplay = body.tech_cdis + " " + body.tech_cdisU;
        aDisplay = formatAcceleration(a, body.tech_cacU) + " " + body.tech_cacU;
        fvDisplay = formatVelocity(fv, body.tech_fvU) + " " + body.tech_fvU;
      }
    }
    // Case 6: cdis, fv, ct provided
    else if (
      isNumeric(body.tech_cdis) &&
      isNumeric(body.tech_fv) &&
      isNumeric(body.tech_ct)
    ) {
      if (
        !isEmpty(body.tech_iv) ||
        body.tech_iv == "0" ||
        !isEmpty(body.tech_cac) ||
        body.tech_cac == "0"
      ) {
        param.error = "Please fill all fields.";
        return param;
      } else {
        check = true;
        dis = convertDistanceToMeters(body.tech_cdis, body.tech_cdisU);
        time = convertTimeToSeconds(body.tech_ct, body.tech_ctU);
        fv = convertVelocityToMs(body.tech_fv, body.tech_fvU);

        iv = (2 * dis) / time - fv;
        a = (2 * (dis - iv * time)) / Math.pow(time, 2);

        fvDisplay = body.tech_fv + " " + body.tech_fvU;
        timeDisplay = body.tech_ct + " " + body.tech_ctU;
        disDisplay = body.tech_cdis + " " + body.tech_cdisU;
        aDisplay = formatAcceleration(a, body.tech_cacU) + " " + body.tech_cacU;
        ivDisplay = formatVelocity(iv, body.tech_ivU) + " " + body.tech_ivU;
      }
    }
    // Case 7: cdis, iv, cac provided
    else if (
      isNumeric(body.tech_cdis) &&
      isNumeric(body.tech_iv) &&
      isNumeric(body.tech_cac)
    ) {
      if (
        !isEmpty(body.tech_fv) ||
        body.tech_fv == "0" ||
        !isEmpty(body.tech_ct) ||
        body.tech_ct == "0"
      ) {
        param.error = "Please fill all fields.";
        return param;
      } else {
        check = true;
        dis = convertDistanceToMeters(body.tech_cdis, body.tech_cdisU);
        iv = convertVelocityToMs(body.tech_iv, body.tech_ivU);
        a = convertAccelerationToMs2(body.tech_cac, body.tech_cacU);

        time = Math.sqrt((2 * dis) / a);
        fv = Math.sqrt(Math.pow(iv, 2) + 2 * a * dis);

        ivDisplay = body.tech_iv + " " + body.tech_ivU;
        disDisplay = body.tech_cdis + " " + body.tech_cdisU;
        aDisplay = body.tech_cac + " " + body.tech_cacU;
        fvDisplay = formatVelocity(fv, body.tech_fvU) + " " + body.tech_fvU;
        timeDisplay = formatTime(time, body.tech_ctU) + " " + body.tech_ctU;
      }
    }
    // Case 8: cdis, fv, cac provided
    else if (
      isNumeric(body.tech_cdis) &&
      isNumeric(body.tech_fv) &&
      isNumeric(body.tech_cac)
    ) {
      if (
        !isEmpty(body.tech_iv) ||
        body.tech_iv == "0" ||
        !isEmpty(body.tech_ct) ||
        body.tech_ct == "0"
      ) {
        param.error = "Please fill all fields.";
        return param;
      } else {
        check = true;
        dis = convertDistanceToMeters(body.tech_cdis, body.tech_cdisU);
        fv = convertVelocityToMs(body.tech_fv, body.tech_fvU);
        a = convertAccelerationToMs2(body.tech_cac, body.tech_cacU);

        iv = Math.sqrt(Math.pow(fv, 2) - 2 * a * dis);
        time = (fv - iv) / a;

        fvDisplay = body.tech_fv + " " + body.tech_fvU;
        disDisplay = body.tech_cdis + " " + body.tech_cdisU;
        aDisplay = body.tech_cac + " " + body.tech_cacU;
        ivDisplay = formatVelocity(iv, body.tech_ivU) + " " + body.tech_ivU;
        timeDisplay = formatTime(time, body.tech_ctU) + " " + body.tech_ctU;
      }
    }
    // Case 9: cdis, iv, fv provided
    else if (
      isNumeric(body.tech_cdis) &&
      isNumeric(body.tech_iv) &&
      isNumeric(body.tech_fv)
    ) {
      if (
        !isEmpty(body.tech_cac) ||
        body.tech_cac == "0" ||
        !isEmpty(body.tech_ct) ||
        body.tech_ct == "0"
      ) {
        param.error = "Please fill all fields.";
        return param;
      } else {
        check = true;
        dis = convertDistanceToMeters(body.tech_cdis, body.tech_cdisU);
        iv = convertVelocityToMs(body.tech_iv, body.tech_ivU);
        fv = convertVelocityToMs(body.tech_fv, body.tech_fvU);

        a = (Math.pow(fv, 2) - Math.pow(iv, 2)) / (2 * dis);
        time = (fv - iv) / a;

        timeDisplay = formatTime(time, body.tech_ctU) + " " + body.tech_ctU;
        aDisplay = formatAcceleration(a, body.tech_cacU) + " " + body.tech_cacU;
        ivDisplay = body.tech_iv + " " + body.tech_ivU;
        fvDisplay = body.tech_fv + " " + body.tech_fvU;
        disDisplay = body.tech_cdis + " " + body.tech_cdisU;
      }
    }
    // Case 10: cdis, ct, cac provided
    else if (
      isNumeric(body.tech_cdis) &&
      isNumeric(body.tech_ct) &&
      isNumeric(body.tech_cac)
    ) {
      if (
        !isEmpty(body.tech_iv) ||
        body.tech_iv == "0" ||
        !isEmpty(body.tech_fv) ||
        body.tech_fv == "0"
      ) {
        param.error = "Please fill all fields.";
        return param;
      } else {
        check = true;
        dis = convertDistanceToMeters(body.tech_cdis, body.tech_cdisU);
        time = convertTimeToSeconds(body.tech_ct, body.tech_ctU);
        a = convertAccelerationToMs2(body.tech_cac, body.tech_cacU);

        iv = (dis - 0.5 * a * Math.pow(time, 2)) / time;
        fv = iv + a * time;

        fvDisplay = formatVelocity(fv, body.tech_fvU) + " " + body.tech_fvU;
        ivDisplay = formatVelocity(iv, body.tech_ivU) + " " + body.tech_ivU;
        disDisplay = body.tech_cdis + " " + body.tech_cdisU;
        aDisplay = body.tech_cac + " " + body.tech_cacU;
        timeDisplay = body.tech_ct + " " + body.tech_ctU;
      }
    }

    if (check === true) {
      param.tech_iv = ivDisplay;
      param.tech_fv = fvDisplay;
      param.tech_time = timeDisplay;
      param.tech_dis = disDisplay;
      param.tech_a = aDisplay;
      return param;
    } else {
      param.error = "Please fill all fields.";
      return param;
    }
  }

  /**
   * getCalculationInstantaneousRateOfChangeCalculator: Service Method
   * POST: /api/calculators-lol/instantaneous-rate-of-change-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationInstantaneousRateOfChangeCalculator(body) {
    const param = {};
    const EnterEq = body.tech_EnterEq;
    const x = body.tech_x;
    // Helper functions
    const isNumeric = (value) => {
      return !isNaN(parseFloat(value)) && isFinite(value);
    };

    const isEmpty = (value) => {
      return value == undefined || value == null || value == "";
    };

    const parseScientificNotation = (value) => {
      if (typeof value == "number") return value;
      if (typeof value == "string") {
        // Handle scientific notation like '1.32e+23'
        if (value.includes("e")) {
          const [coefficient, exponent] = value.split("e");
          return parseFloat(coefficient) * Math.pow(10, parseFloat(exponent));
        }
        return parseFloat(value);
      }
      return value;
    };

    const formatLargeNumber = (value) => {
      if (value == null || value == undefined) return value;

      const numValue = parseScientificNotation(value);

      // For very large numbers, return as string to avoid precision issues
      if (Math.abs(numValue) > 1e15) {
        return numValue.toString();
      }

      // For normal numbers, round to 7 decimal places
      try {
        return Number(parseFloat(numValue).toFixed(7));
      } catch (error) {
        console.log("Rounding failed, returning original value:", numValue);
        return numValue;
      }
    };

    // Security check
    if (
      !EnterEq ||
      /(<|>|&|php|print_r|print|echo|script|&|%)/i.test(EnterEq)
    ) {
      param.error = "Please fill all fields.";
      return param;
    }

    if (isNumeric(x) && !isEmpty(EnterEq)) {
      let parem = EnterEq;
      // Apply transformations
      parem = parem.replace(/M\(x\) =/g, "");
      parem = parem.replace(/f\(x\) =/g, "");
      parem = parem.replace(/Square root/g, "sqrt");
      parem = parem.replace(/√/g, "sqrt");
      parem = parem.replace(/ /g, "");
      parem = parem.replace(/y=/g, "");
      parem = parem.replace(/\+/g, "plus");
      parem = parem.replace(/%20/g, "");
      parem = parem.replace(/{/g, "(");
      parem = parem.replace(/}/g, ")");
      parem = parem.replace(/e\^/g, "exp");
      parem = parem.replace(/exp\^/g, "exp");
      parem = parem.replace(/\^/g, "**");
      parem = parem.replace(/e\^sqrt\(x\)/g, "exp(2*x)");

      try {
        const axios = require("axios");

        const response = await axios.post(
          "http://167.172.134.148/new-i_r_o_c",
          {
            equ: parem,
            x: parseFloat(x),
          },
          {
            timeout: 120000,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        const buffer = response.data;

        if (Array.isArray(buffer) && buffer.length >= 3) {
          param.tech_equation = buffer[2];

          // Handle the derivative value
          let derivValue = buffer[0];

          // Convert and format the number
          param.tech_deriv = formatLargeNumber(derivValue);

          param.stech_teps = buffer[1];
        } else {
          param.error = "Invalid response from calculation service";
        }
        return param;
      } catch (error) {
        console.error("Error calling Python service:", error.message);
        param.error = "Calculation service unavailable. Please try again.";
        return param;
      }
    } else {
      param.error = "Please provide valid equation and x value.";
      return param;
    }
  }

  /**
   * getCalculationSpecificHeatCalculator: Service Method
   * POST: /api/calculators-lol/specific-heat-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationSpecificHeatCalculator(body) {
    let param = {};

    // Extract parameters (same as PHP)
    let find = body.tech_find;
    let by = body.tech_by;
    let q = body.tech_q;
    let q_unit = body.tech_q_unit;
    let it = body.tech_it;
    let it_unit = body.tech_it_unit;
    let ft = body.tech_ft;
    let ft_unit = body.tech_ft_unit;
    let dt = body.tech_dt;
    let dt_unit = body.tech_dt_unit;
    let m = body.tech_m;
    let m_unit = body.tech_m_unit;
    let c = body.tech_c;
    let c_unit = body.tech_c_unit;
    let sub = body.tech_sub;

    // Same condition check
    if ((by == "change" && dt == "0") || (by == "i_f_t" && ft - it == 0)) {
      param.error = "Change of temperature cannot be zero!";
      return param;
    }

    // Unit Conversion (exact same logic)
    if (!isNaN(q)) {
      q = parseFloat(q);
      if (q_unit == "kJ") {
        q = q / 0.001;
      } else if (q_unit == "mJ") {
        q = q / 0.000001;
      } else if (q_unit == "Wh") {
        q = q / 0.000277778;
      } else if (q_unit == "kWh") {
        q = q / 0.000000277778;
      } else if (q_unit == "ft-lbs") {
        q = q / 0.737562;
      } else if (q_unit == "kcal") {
        q = q / 0.0002390057;
      } else if (q_unit == "eV") {
        q = q / 6241534918267100245;
      }
    }

    if (!isNaN(it)) {
      it = parseFloat(it);
      if (it_unit == "°F") {
        it = it / 1.8;
      }
    }

    if (!isNaN(ft)) {
      ft = parseFloat(ft);
      if (ft_unit == "°F") {
        ft = ft / 1.8;
      }
    }

    if (!isNaN(dt)) {
      dt = parseFloat(dt);
      if (dt_unit == "°F") {
        dt = dt / 1.8;
      }
    }

    if (!isNaN(m)) {
      m = parseFloat(m);
      if (m_unit == "µg") {
        m = m / 1000000000;
      } else if (m_unit == "mg") {
        m = m / 1000000;
      } else if (m_unit == "g") {
        m = m / 1000;
      } else if (m_unit == "t") {
        m = m / 0.001;
      } else if (m_unit == "oz") {
        m = m / 35.27396;
      } else if (m_unit == "lb") {
        m = m / 2.204623;
      } else if (m_unit == "stone") {
        m = m / 0.157473;
      } else if (m_unit == "US ton") {
        m = m / 0.001102311;
      } else if (m_unit == "Long ton") {
        m = m / 0.000984207;
      } else if (m_unit == "Earths") {
        m = m * 5972000000000000000000000;
      } else if (m_unit == "me") {
        m = m / 1097769122809886380500592292548;
      } else if (m_unit == "u") {
        m = m / 602214000000000000000000000;
      } else if (m_unit == "oz t") {
        m = m / 32.15075;
      }
    }

    if (!isNaN(c)) {
      c = parseFloat(c);
      if (c_unit == "J/(g·K)" || c_unit == "J/(g·°C)") {
        c = c / 0.001;
      } else if (c_unit == "cal/(kg·K)" || c_unit == "cal/(kg·°C)") {
        c = c / 0.2388915;
      } else if (
        c_unit == "cal/(g·K)" ||
        c_unit == "kcal/(kg·K)" ||
        c_unit == "cal/(g·°C)" ||
        c_unit == "kcal/(kg·°C)"
      ) {
        c = c / 0.0002388915;
      }
    }

    // Same calculation logic
    if (
      find == "energy" &&
      by == "change" &&
      !isNaN(dt) &&
      !isNaN(m) &&
      !isNaN(c)
    ) {
      let s = m * c;
      q = s * dt;
      param.tech_s = isNaN(s) ? "NaN" : s;
      param.tech_q = Math.round(q * 1000) / 1000;
    } else if (
      find == "energy" &&
      by == "i_f_t" &&
      !isNaN(it) &&
      !isNaN(ft) &&
      !isNaN(m) &&
      !isNaN(c)
    ) {
      dt = ft - it;
      let s = m * c;
      q = s * dt;
      param.check = "q_i_f";
      param.tech_s = isNaN(s) ? "NaN" : s;
      param.tech_q = Math.round(q * 1000) / 1000;
    } else if (
      find == "specific_heat" &&
      by == "change" &&
      !isNaN(q) &&
      !isNaN(dt) &&
      !isNaN(m)
    ) {
      let s = m * dt;
      c = q / s;
      param.tech_s = isNaN(s) ? "NaN" : s;
      param.tech_c = Math.round(c * 1000) / 1000;
    } else if (
      find == "specific_heat" &&
      by == "i_f_t" &&
      !isNaN(q) &&
      !isNaN(it) &&
      !isNaN(ft) &&
      !isNaN(m)
    ) {
      dt = ft - it;
      let s = m * dt;
      c = q / s;
      param.check = "c_i_f";
      param.tech_s = isNaN(s) ? "NaN" : s;
      param.tech_c = Math.round(c * 1000) / 1000;
    } else if (
      find == "mass" &&
      by == "change" &&
      !isNaN(q) &&
      !isNaN(dt) &&
      !isNaN(c)
    ) {
      let s = c * dt;
      m = q / s;
      param.tech_s = isNaN(s) ? "NaN" : s;
      param.tech_m = Math.round(m * 1000) / 1000;
    } else if (
      find == "mass" &&
      by == "i_f_t" &&
      !isNaN(q) &&
      !isNaN(it) &&
      !isNaN(ft) &&
      !isNaN(c)
    ) {
      dt = ft - it;
      let s = c * dt;
      m = q / s;
      param.check = "m_i_f";
      param.tech_s = isNaN(s) ? "NaN" : s;
      param.tech_m = Math.round(m * 1000) / 1000;
    } else if (
      find == "itemp" &&
      !isNaN(q) &&
      !isNaN(ft) &&
      !isNaN(m) &&
      !isNaN(c)
    ) {
      let s = m * c;
      let s1 = q / s;
      it = s1 - ft;
      param.tech_s = isNaN(s) ? "NaN" : s;
      param.tech_s1 = isNaN(s1) ? "NaN" : s1;
      param.tech_it = Math.round(it * 1000) / 1000;
    } else if (
      find == "ftemp" &&
      !isNaN(q) &&
      !isNaN(it) &&
      !isNaN(m) &&
      !isNaN(c)
    ) {
      let s = m * c;
      let s1 = q / s;
      ft = s1 + it;
      param.tech_s = isNaN(s) ? "NaN" : s;
      param.tech_s1 = isNaN(s1) ? "NaN" : s1;
      param.tech_ft = Math.round(ft * 1000) / 1000;
    } else {
      param.error = "Please! Fill All The Fields!";
      return param;
    }

    // Same substance handling
    if (sub != "select") {
      let subs = sub.split("@");
      let sub_val = subs[0];
      let sub_name = subs[1];

      if (sub_val !== undefined) {
        param.tech_sub = isNaN(sub_val) ? "NaN" : sub_val;
        param.tech_sub1 = sub_name;
      }
    }

    // Store converted values
    param.tech_q1 = isNaN(q) ? "NaN" : q;
    param.tech_it1 = isNaN(it) ? "NaN" : it;
    param.tech_ft1 = isNaN(ft) ? "NaN" : ft;
    param.tech_dt1 = isNaN(dt) ? "NaN" : dt;
    param.tech_m1 = isNaN(m) ? "NaN" : m;
    param.tech_c1 = isNaN(c) ? "NaN" : c;

    return param;
  }

  /**
   * getCalculationWorkCalculator: Service Method
   * POST: /api/calculators-lol/work-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationWorkCalculator(body) {
    const param = {};

    // Extract all parameters from request body using let
    let method = body.tech_method;
    let method1 = body.tech_method1;
    let find = body.tech_find;
    let find1 = body.tech_find1;
    let find2 = body.tech_find2;
    let f = parseFloat(body.tech_f);
    let f_unit = body.tech_f_unit;
    let d = parseFloat(body.tech_d);
    let d_unit = body.tech_d_unit;
    let w = parseFloat(body.tech_w);
    let w_unit = body.tech_w_unit;
    let p = parseFloat(body.tech_p);
    let p_unit = body.tech_p_unit;
    let t = parseFloat(body.tech_t);
    let t_unit = body.tech_t_unit;
    let m = parseFloat(body.tech_m);
    let m_unit = body.tech_m_unit;
    let v0 = parseFloat(body.tech_v0);
    let v0_unit = body.tech_v0_unit;
    let v1 = parseFloat(body.tech_v1);
    let v1_unit = body.tech_v1_unit;

    // Temporary variables for calculations
    let s1, s2, s3, s4;

    if (!isNaN(f) && isFinite(f)) {
      if (f_unit == "kn") {
        f = f / 0.001;
      } else if (f_unit == "mn") {
        f = f / 0.000001;
      } else if (f_unit == "gn") {
        f = f / 0.000000001;
      } else if (f_unit == "tn") {
        f = f / 0.000000000001;
      }
    }

    if (!isNaN(d) && isFinite(d)) {
      if (d_unit == "mm") {
        d = d / 1000;
      } else if (d_unit == "cm") {
        d = d / 100;
      } else if (d_unit == "km") {
        d = d / 0.001;
      } else if (d_unit == "in") {
        d = d / 39.37;
      } else if (d_unit == "ft") {
        d = d / 3.281;
      } else if (d_unit == "yd") {
        d = d / 1.0936;
      } else if (d_unit == "mi") {
        d = d / 0.0006214;
      } else if (d_unit == "nmi") {
        d = d / 0.00054;
      }
    }

    if (!isNaN(v0) && isFinite(v0)) {
      if (v0_unit == "kmh") {
        v0 = v0 / 3.6;
      } else if (v0_unit == "fts") {
        v0 = v0 / 3.281;
      } else if (v0_unit == "mph") {
        v0 = v0 / 2.237;
      } else if (v0_unit == "knots") {
        v0 = v0 / 1.944;
      } else if (v0_unit == "ftmin") {
        v0 = v0 / 196.85;
      }
    }

    if (!isNaN(v1) && isFinite(v1)) {
      if (v1_unit == "kmh") {
        v1 = v1 / 3.6;
      } else if (v1_unit == "fts") {
        v1 = v1 / 3.281;
      } else if (v1_unit == "mph") {
        v1 = v1 / 2.237;
      } else if (v1_unit == "knots") {
        v1 = v1 / 1.944;
      } else if (v1_unit == "ftmin") {
        v1 = v1 / 196.85;
      }
    }

    if (!isNaN(w) && isFinite(w)) {
      if (w_unit == "kj") {
        w = w / 0.001;
      } else if (w_unit == "mj") {
        w = w / 0.000001;
      } else if (w_unit == "wh") {
        w = w / 0.0002778;
      } else if (w_unit == "kwh") {
        w = w / 0.0000002778;
      } else if (w_unit == "ft_lbs") {
        w = w / 0.7376;
      } else if (w_unit == "kcal") {
        w = w / 0.000239;
      } else if (w_unit == "ev") {
        w = w / 6241534918267100245;
      }
    }

    if (!isNaN(m) && isFinite(m)) {
      if (m_unit == "mg") {
        m = m / 1000000;
      } else if (m_unit == "g") {
        m = m / 1000;
      } else if (m_unit == "t") {
        m = m / 0.001;
      } else if (m_unit == "oz") {
        m = m / 35.274;
      } else if (m_unit == "lb") {
        m = m / 2.2046;
      } else if (m_unit == "stone") {
        m = m / 0.15747;
      } else if (m_unit == "us_ton") {
        m = m / 0.0011023;
      } else if (m_unit == "long_ton") {
        m = m / 0.0009842;
      }
    }

    if (!isNaN(p) && isFinite(p)) {
      if (p_unit == "mW") {
        p = p / 1000;
      } else if (p_unit == "kw") {
        p = p / 0.001;
      } else if (p_unit == "MW") {
        p = p / 0.000001;
      } else if (p_unit == "gw") {
        p = p / 0.000000001;
      } else if (p_unit == "btu_h") {
        p = p / 3.412;
      } else if (p_unit == "hp_l") {
        p = p / 0.001341;
      }
    }

    if (!isNaN(t) && isFinite(t)) {
      if (t_unit == "min") {
        t = t / 0.016667;
      } else if (t_unit == "hrs") {
        t = t / 0.0002778;
      } else if (t_unit == "days") {
        t = t / 0.000011574;
      } else if (t_unit == "wks") {
        t = t / 0.0000016534;
      } else if (t_unit == "mos") {
        t = t / 0.00000038026;
      } else if (t_unit == "yrs") {
        t = t / 0.00000003169;
      }
    }

    if (
      method == "work" &&
      method1 == "fnd" &&
      find == "work" &&
      !isNaN(f) &&
      !isNaN(d)
    ) {
      w = f * d;
      param["tech_work"] = "work";
      param["tech_w"] = isNaN(w) ? "NaN" : Math.round(w * 10000) / 10000;
      param["tech_f"] = isNaN(f) ? "NaN" : f;
      param["tech_d"] = isNaN(d) ? "NaN" : d;
    } else if (
      method == "work" &&
      method1 == "fnd" &&
      find == "force" &&
      !isNaN(w) &&
      !isNaN(d)
    ) {
      f = w / d;
      param["tech_force"] = "force";
      param["tech_f"] = isNaN(f) ? "NaN" : Math.round(f * 10000) / 10000;
      param["tech_w"] = isNaN(w) ? "NaN" : w;
      param["tech_d"] = isNaN(d) ? "NaN" : d;
    } else if (
      method == "work" &&
      method1 == "fnd" &&
      find == "dsplcmnt" &&
      !isNaN(w) &&
      !isNaN(f)
    ) {
      d = w / f;
      param["tech_dsplcmnt"] = "dsplcmnt";
      param["tech_d"] = isNaN(d) ? "NaN" : Math.round(d * 10000) / 10000;
      param["tech_w"] = isNaN(w) ? "NaN" : w;
      param["tech_f"] = isNaN(f) ? "NaN" : f;
    } else if (
      method == "work" &&
      method1 == "velocity" &&
      find2 == "work2" &&
      !isNaN(m) &&
      !isNaN(v0) &&
      !isNaN(v1)
    ) {
      s1 = m / 2;
      s2 = Math.pow(v1, 2);
      s3 = Math.pow(v0, 2);
      s4 = s2 - s3;
      w = s1 * s4;
      param["tech_work1"] = "work1";
      param["tech_w"] = isNaN(w) ? "NaN" : Math.round(w * 10000) / 10000;
      param["tech_m"] = isNaN(m) ? "NaN" : m;
      param["tech_v0"] = isNaN(v0) ? "NaN" : v0;
      param["tech_v1"] = isNaN(v1) ? "NaN" : v1;
      param["tech_s1"] = isNaN(s1) ? "NaN" : s1;
      param["tech_s2"] = isNaN(s2) ? "NaN" : s2;
      param["tech_s3"] = isNaN(s3) ? "NaN" : s3;
      param["tech_s4"] = isNaN(s4) ? "NaN" : s4;
    } else if (
      method == "work" &&
      method1 == "velocity" &&
      find2 == "v0" &&
      !isNaN(m) &&
      !isNaN(w) &&
      !isNaN(v1)
    ) {
      s1 = Math.pow(v1, 2);
      s2 = 2 / m;
      s3 = s2 * w;
      s4 = s1 - s3;
      v0 = Math.sqrt(s4);
      param["tech_i_v"] = "i_v";
      param["tech_v0"] = isNaN(v0) ? "NaN" : Math.round(v0 * 10000) / 10000;
      param["tech_w"] = isNaN(w) ? "NaN" : w;
      param["tech_m"] = isNaN(m) ? "NaN" : m;
      param["tech_v1"] = isNaN(v1) ? "NaN" : v1;
      param["tech_s1"] = isNaN(s1) ? "NaN" : s1;
      param["tech_s2"] = isNaN(s2) ? "NaN" : s2;
      param["tech_s3"] = isNaN(s3) ? "NaN" : s3;
      param["tech_s4"] = isNaN(s4) ? "NaN" : s4;
    } else if (
      method == "work" &&
      method1 == "velocity" &&
      find2 == "v1" &&
      !isNaN(m) &&
      !isNaN(w) &&
      !isNaN(v0)
    ) {
      s1 = Math.pow(v0, 2);
      s2 = 2 / m;
      s3 = s2 * w;
      s4 = s1 + s3;
      v1 = Math.sqrt(s4);
      param["tech_f_v"] = "f_v";
      param["tech_v1"] = isNaN(v1) ? "NaN" : Math.round(v1 * 10000) / 10000;
      param["tech_w"] = isNaN(w) ? "NaN" : w;
      param["tech_m"] = isNaN(m) ? "NaN" : m;
      param["tech_v0"] = isNaN(v0) ? "NaN" : v0;
      param["tech_s1"] = isNaN(s1) ? "NaN" : s1;
      param["tech_s2"] = isNaN(s2) ? "NaN" : s2;
      param["tech_s3"] = isNaN(s3) ? "NaN" : s3;
      param["tech_s4"] = isNaN(s4) ? "NaN" : s4;
    } else if (
      method == "work" &&
      method1 == "velocity" &&
      find2 == "mass" &&
      !isNaN(w) &&
      !isNaN(v0) &&
      !isNaN(v1)
    ) {
      s1 = 2 * w;
      s2 = Math.pow(v1, 2);
      s3 = Math.pow(v0, 2);
      s4 = s2 - s3;
      if (s4 === 0) {
        m = 0;
      } else {
        m = s1 / s4;
      }
      param["tech_mass"] = "mass";
      param["tech_m"] = isNaN(m) ? "NaN" : Math.round(m * 10000) / 10000;
      param["tech_w"] = isNaN(w) ? "NaN" : w;
      param["tech_v0"] = isNaN(v0) ? "NaN" : v0;
      param["tech_v1"] = isNaN(v1) ? "NaN" : v1;
      param["tech_s1"] = isNaN(s1) ? "NaN" : s1;
      param["tech_s2"] = isNaN(s2) ? "NaN" : s2;
      param["tech_s3"] = isNaN(s3) ? "NaN" : s3;
      param["tech_s4"] = isNaN(s4) ? "NaN" : s4;
    } else if (
      method == "power" &&
      find1 == "power" &&
      !isNaN(w) &&
      !isNaN(t)
    ) {
      p = w / t;
      param["tech_power"] = "power";
      param["tech_p"] = isNaN(p) ? "NaN" : Math.round(p * 10000) / 10000;
      param["tech_w"] = isNaN(w) ? "NaN" : w;
      param["tech_t"] = isNaN(t) ? "NaN" : t;
    } else if (
      method == "power" &&
      find1 == "work1" &&
      !isNaN(p) &&
      !isNaN(t)
    ) {
      w = p * t;
      param["tech_work2"] = "work2";
      param["tech_w"] = isNaN(w) ? "NaN" : Math.round(w * 10000) / 10000;
      param["tech_p"] = isNaN(p) ? "NaN" : p;
      param["tech_t"] = isNaN(t) ? "NaN" : t;
    } else if (method == "power" && find1 == "time" && !isNaN(w) && !isNaN(p)) {
      t = w / p;
      param["time"] = "time";
      param["tech_t"] = isNaN(t) ? "NaN" : Math.round(t * 10000) / 10000;
      param["tech_p"] = isNaN(p) ? "NaN" : p;
      param["tech_w"] = isNaN(w) ? "NaN" : w;
    } else {
      param["error"] = "Please fill all fields.";
      return param;
    }

    param["tech_f"] = f;

    return param;
  }

  /** getCalculationVectorMagnitudecalculator
   * POST: /api/calculators-lol/vector-magnitude-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationVectorMagnitudecalculator(body) {
    let result = {};

    let dem = body.tech_dem;
    let a_rep = body.tech_a_rep;
    let ax = body.tech_ax;
    let ay = body.tech_ay;
    let az = body.tech_az;
    let w = body.tech_w;
    let t = body.tech_t;
    let a1 = body.tech_a1;
    let a2 = body.tech_a2;
    let a3 = body.tech_a3;
    let a4 = body.tech_a4;
    let a5 = body.tech_a5;
    let b1 = body.tech_b1;
    let b2 = body.tech_b2;
    let b3 = body.tech_b3;
    let b4 = body.tech_b4;
    let b5 = body.tech_b5;

    dem = dem?.toString().trim();
    a_rep = a_rep?.toString().trim();
    ax = parseFloat(ax);
    ay = parseFloat(ay);
    az = parseFloat(az);
    w = parseFloat(w);
    t = parseFloat(t);
    a1 = parseFloat(a1);
    a2 = parseFloat(a2);
    a3 = parseFloat(a3);
    a4 = parseFloat(a4);
    a5 = parseFloat(a5);
    b1 = parseFloat(b1);
    b2 = parseFloat(b2);
    b3 = parseFloat(b3);
    b4 = parseFloat(b4);
    b5 = parseFloat(b5);

    function isNumeric(val) {
      return typeof val === "number" && !isNaN(val);
    }

    if (a_rep === "coor") {
      if (dem === "2") {
        if (isNumeric(ax) && isNumeric(ay)) {
          let mag = Math.sqrt(ax ** 2 + ay ** 2);
          result.tech_mag = +mag.toFixed(5);
          return result;
        }
      } else if (dem === "3") {
        if (isNumeric(ax) && isNumeric(ay) && isNumeric(az)) {
          let mag = Math.sqrt(ax ** 2 + ay ** 2 + az ** 2);
          result.tech_mag = +mag.toFixed(5);
          return result;
        }
      } else if (dem === "4") {
        if (isNumeric(ax) && isNumeric(ay) && isNumeric(az) && isNumeric(w)) {
          let mag = Math.sqrt(ax ** 2 + ay ** 2 + az ** 2 + w ** 2);
          result.tech_mag = +mag.toFixed(5);
          return result;
        }
      } else if (dem === "5") {
        if (
          isNumeric(ax) &&
          isNumeric(ay) &&
          isNumeric(az) &&
          isNumeric(w) &&
          isNumeric(t)
        ) {
          let mag = Math.sqrt(ax ** 2 + ay ** 2 + az ** 2 + w ** 2 + t ** 2);
          result.tech_mag = +mag.toFixed(5);
          return result;
        }
      }
    } else {
      // when a_rep != 'coor', calculate vector difference between points a and b
      if (dem === "2") {
        if (isNumeric(a1) && isNumeric(a2) && isNumeric(b1) && isNumeric(b2)) {
          let dx = b1 - a1;
          let dy = b2 - a2;
          let mag = Math.sqrt(dx ** 2 + dy ** 2);
          result.tech_mag = +mag.toFixed(5);
          return result;
        }
      } else if (dem === "3") {
        if (
          isNumeric(a1) &&
          isNumeric(a2) &&
          isNumeric(a3) &&
          isNumeric(b1) &&
          isNumeric(b2) &&
          isNumeric(b3)
        ) {
          let dx = b1 - a1;
          let dy = b2 - a2;
          let dz = b3 - a3;
          let mag = Math.sqrt(dx ** 2 + dy ** 2 + dz ** 2);
          result.tech_mag = +mag.toFixed(5);
          return result;
        }
      } else if (dem === "4") {
        if (
          isNumeric(a1) &&
          isNumeric(a2) &&
          isNumeric(a3) &&
          isNumeric(a4) &&
          isNumeric(b1) &&
          isNumeric(b2) &&
          isNumeric(b3) &&
          isNumeric(b4)
        ) {
          let dx = b1 - a1;
          let dy = b2 - a2;
          let dz = b3 - a3;
          let dw = b4 - a4;
          let mag = Math.sqrt(dx ** 2 + dy ** 2 + dz ** 2 + dw ** 2);
          result.tech_mag = +mag.toFixed(5);
          return result;
        }
      } else if (dem === "5") {
        if (
          isNumeric(a1) &&
          isNumeric(a2) &&
          isNumeric(a3) &&
          isNumeric(a4) &&
          isNumeric(a5) &&
          isNumeric(b1) &&
          isNumeric(b2) &&
          isNumeric(b3) &&
          isNumeric(b4) &&
          isNumeric(b5)
        ) {
          let dx = b1 - a1;
          let dy = b2 - a2;
          let dz = b3 - a3;
          let dw = b4 - a4;
          let dt = b5 - a5;
          let mag = Math.sqrt(dx ** 2 + dy ** 2 + dz ** 2 + dw ** 2 + dt ** 2);
          result.tech_mag = +mag.toFixed(5);
          return result;
        }
      }
    }

    result.error = "Please! Check Your Input";
    return result;
  }

  /**
   * getCalculationeDimensionalAnalysisCalculator: Service Method
   * POST: /api/calculators-lol/dimensional-analysis-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationeDimensionalAnalysisCalculator(body) {
    let pq1 = body.tech_pq1;
    let pq1_unit = body.tech_pq1_unit;

    let pq2 = body.tech_pq2;
    let pq2_unit = body.tech_pq2_unit;

    const result = {};

    // Helper functions
    const gcd = (a, b) => {
      a = Math.abs(a);
      b = Math.abs(b);
      if (a < b) {
        [b, a] = [a, b];
      }
      if (b == 0) {
        return 1;
      }
      let r = a % b;
      while (r > 0) {
        a = b;
        b = r;
        r = a % b;
      }
      return b;
    };

    const reduce = (num, den) => {
      const g = gcd(num, den);
      return [num / g, den / g];
    };

    const sigFig = (value, digits) => {
      if (value == 0) {
        return 0;
      }

      const valueAbs = Math.abs(value);
      let decimalPlaces;

      if (valueAbs < 1) {
        // For numbers less than 1, count leading zeros after decimal
        const logValue = Math.log10(valueAbs);
        decimalPlaces = digits + Math.floor(-logValue);
      } else {
        // For numbers 1 or greater
        const logValue = Math.log10(valueAbs);
        decimalPlaces = digits - Math.floor(logValue) - 1;
      }

      const multiplier = Math.pow(10, decimalPlaces);
      return Math.round(value * multiplier) / multiplier;
    };

    // Unit conversion mapping
    const getUnitValue = (unit) => {
      const unitMap = {
        mm: "1.0E+34@1",
        cm: "1.0E+33@2",
        m: "1.0E+31@5",
        km: "1.0E+28@8",
        in: "3.9370078740157E+32@3",
        ft: "3.2808398950131E+31@4",
        yd: "1.0936132983377E+31@6",
        mi: "6.2136994949495E+27@9",
        fur: "4.9709595959596E+28@7",
      };
      return unitMap[unit] || unit;
    };

    try {
      // Convert units
      const convertedPq1Unit = getUnitValue(pq1_unit);
      const convertedPq2Unit = getUnitValue(pq2_unit);

      // Validate inputs
      if (
        !pq1 ||
        !pq2 ||
        !convertedPq1Unit ||
        !convertedPq2Unit ||
        isNaN(parseFloat(pq1)) ||
        isNaN(parseFloat(pq2))
      ) {
        result.error = "Please fill all fields.";
        return result;
      }

      const numPq1 = parseFloat(pq1);
      const numPq2 = parseFloat(pq2);

      // Save input data (commented out as it seems to be for logging)
      /*
        const put_input = {
          pq1: numPq1,
          pq1_unit: convertedPq1Unit,
          pq2: numPq2,
          pq2_unit: convertedPq2Unit,
          time: new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' })
        };
        */

      // Process the dimensional analysis
      const processedPq1Unit = convertedPq1Unit.replace(/plus/g, "+");
      const processedPq2Unit = convertedPq2Unit.replace(/plus/g, "+");

      const pq1_exp = processedPq1Unit.split("@");
      const pq2_exp = processedPq2Unit.split("@");

      let upr, btm;

      if (processedPq1Unit == processedPq2Unit) {
        [upr, btm] = reduce(numPq1, numPq2);
        result.tech_check = "check";
      } else if (parseInt(pq1_exp[1]) > parseInt(pq2_exp[1])) {
        const cnvrt =
          parseFloat(pq2_exp[0]) / (parseFloat(pq1_exp[0]) / numPq1);
        [upr, btm] = reduce(cnvrt, numPq2);
        result.tech_cnvrt1 = sigFig(cnvrt, 8);
      } else {
        const cnvrt =
          parseFloat(pq1_exp[0]) / (parseFloat(pq2_exp[0]) / numPq2);
        [upr, btm] = reduce(numPq1, cnvrt);
        result.tech_cnvrt2 = sigFig(cnvrt, 8);
      }

      const res = upr / btm;
      const res1 = btm / upr;

      // Set results
      result.tech_upr = sigFig(upr, 8);
      result.tech_btm = sigFig(btm, 8);
      result.tech_res = sigFig(res, 8);
      result.tech_res1 = sigFig(res1, 8);
      result.tech_pq1 = sigFig(numPq1, 8);
      result.tech_pq2 = sigFig(numPq2, 8);
      return result;
    } catch (error) {
      result.error = "An error occurred during calculation";
      return result;
    }
  }

  /** getCalculationProjectileMotioncalculator
   * POST: /api/calculators-lol/projectile-motion-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationProjectileMotioncalculator(body) {
    let method = body.tech_method?.trim();
    let a = parseFloat(body.tech_a);
    let a_unit = body.tech_a_unit?.trim();
    let h = parseFloat(body.tech_h);
    let h_unit = body.tech_h_unit?.trim();
    let v = parseFloat(body.tech_v);
    let v_unit = body.tech_v_unit?.trim();
    let g = parseFloat(body.tech_g);
    let g_unit = body.tech_g_unit?.trim();
    let t = parseFloat(body.tech_t);
    let t_unit = body.tech_t_unit?.trim();

    let param = {};

    const sigFig = (value, digits) => {
      if (value === 0) return 0;
      let d = digits - Math.floor(Math.log10(Math.abs(value))) - 1;
      let decimalPlaces = Math.max(0, Math.min(d, 100)); // Clamp between 0 and 100
      return parseFloat(value.toFixed(decimalPlaces));
    };

    if (
      isFinite(a) &&
      isFinite(h) &&
      isFinite(v) &&
      isFinite(g) &&
      a_unit &&
      h_unit &&
      v_unit &&
      g_unit
    ) {
      // Convert height
      if (h_unit === "cm") {
        h = h / 100;
      } else if (h_unit === "km") {
        h = h / 0.001;
      } else if (h_unit === "in") {
        h = h / 39.37;
      } else if (h_unit === "ft") {
        h = h / 3.281;
      } else if (h_unit === "yd") {
        h = h / 1.0936;
      } else if (h_unit === "mi") {
        h = h / 0.0006214;
      }

      // Convert velocity
      if (v_unit === "kmh") {
        v = v / 3.6;
      } else if (v_unit === "fts") {
        v = v / 3.28;
      } else if (v_unit === "mph") {
        v = v / 2.237;
      }

      // Convert time
      if (isFinite(t)) {
        if (t_unit === "min") {
          t = t * 60;
        } else if (t_unit === "hrs") {
          t = t * 3600;
        }
      }

      // Calculate horizontal and vertical components
      let vx, vy;
      if (a_unit === "deg") {
        vx = v * Math.cos((a * Math.PI) / 180);
        vy = v * Math.sin((a * Math.PI) / 180);
      } else {
        vx = v * Math.cos(a);
        vy = v * Math.sin(a);
      }

      // Convert gravity
      if (g_unit === "g") {
        g = g * 9.807;
      }

      // Perform calculations
      if (method === "tof") {
        let tof =
          h === 0
            ? (2 * vy) / g
            : (vy + Math.sqrt(Math.pow(vy, 2) + 2 * g * h)) / g;

        param.tech_check = "tof";
        param.tech_tof = sigFig(tof, 4);
      } else if (method === "range") {
        let r =
          h === 0
            ? (2 * vx * vy) / g
            : vx * ((vy + Math.sqrt(Math.pow(vy, 2) + 2 * g * h)) / g);

        param.tech_check = "range";
        param.tech_r = sigFig(r, 4);
      } else if (method === "mh") {
        let hmax =
          h === 0 ? Math.pow(vy, 2) / (2 * g) : h + Math.pow(vy, 2) / (2 * g);

        param.tech_check = "mh";
        param.tech_hmax = sigFig(hmax, 4);
      } else if (method === "fp" && isFinite(t)) {
        let x = vx * t;
        let y = h + vy * t - (g * Math.pow(t, 2)) / 2;
        let hv = vx;
        let vv = vy - g * t;
        let vel = Math.sqrt(hv ** 2 + vv ** 2);

        param.tech_check = "fp";
        param.tech_x = sigFig(x, 4);
        param.tech_y = sigFig(y, 4);
        param.tech_hv = sigFig(hv, 4);
        param.tech_vv = sigFig(vv, 4);
        param.tech_vel = sigFig(vel, 4);
      } else {
        return { error: "Please fill all fields." };
      }

      param.tech_g = sigFig(g, 4);
      param.tech_vx = sigFig(vx, 4);
      param.tech_vy = sigFig(vy, 4);
      return param;
    } else {
      return { error: "Please fill all fields." };
    }
  }

  /**
   * getCalculationWaterViscosityCalculator: Service Method
   * POST: /api/calculators-lol/water-viscosity-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationWaterViscosityCalculator(body) {
    const param = {};

    let temp = parseFloat(body.tech_temp);
    const unit = body.tech_unit;

    if (!isNaN(temp)) {
      if (unit == "f") {
        temp = ((temp - 32) * 5) / 9;
      } else if (unit == "k") {
        temp = temp - 273.15;
      }

      if (temp < 0 || temp > 370) {
        param["error"] = "This calculator only works up to 698°F or 370°C.";
        return param;
      }

      let ans, ans1, ans3;

      // First calculation block for ans
      if (temp >= 0 && temp <= 2) {
        ans = 1.788 + (temp - 0) * -0.05725;
      } else if (temp > 2 && temp <= 3) {
        ans = 1.6735 + (temp - 2) * -0.0545;
      } else if (temp > 3 && temp <= 4) {
        ans = 1.619 + (temp - 3) * -0.0517;
      } else if (temp > 4 && temp <= 5) {
        ans = 1.5673 + (temp - 4) * -0.04909;
      } else if (temp > 5 && temp <= 6) {
        ans = 1.5182 + (temp - 5) * -0.0467;
      } else if (temp > 6 && temp <= 7) {
        ans = 1.4715 + (temp - 6) * -0.0444;
      } else if (temp > 7 && temp <= 8) {
        ans = 1.4271 + (temp - 7) * -0.0424;
      } else if (temp > 8 && temp <= 9) {
        ans = 1.3847 + (temp - 8) * -0.0403;
      } else if (temp > 9 && temp <= 10) {
        ans = 1.3444 + (temp - 9) * -0.0385;
      } else if (temp > 10 && temp <= 11) {
        ans = 1.3059 + (temp - 10) * -0.0367;
      } else if (temp > 11 && temp <= 12) {
        ans = 1.2692 + (temp - 11) * -0.0352;
      } else if (temp > 12 && temp <= 13) {
        ans = 1.234 + (temp - 12) * -0.0335;
      } else if (temp > 13 && temp <= 14) {
        ans = 1.2005 + (temp - 13) * -0.0322;
      } else if (temp > 14 && temp <= 15) {
        ans = 1.1683 + (temp - 14) * -0.0308;
      } else if (temp > 15 && temp <= 16) {
        ans = 1.1375 + (temp - 15) * -0.0294;
      } else if (temp > 16 && temp <= 17) {
        ans = 1.1081 + (temp - 16) * -0.0283;
      } else if (temp > 17 && temp <= 18) {
        ans = 1.0798 + (temp - 17) * -0.0272;
      } else if (temp > 18 && temp <= 19) {
        ans = 1.0526 + (temp - 18) * -0.026;
      } else if (temp > 19 && temp <= 20) {
        ans = 1.0266 + (temp - 19) * -0.025;
      } else if (temp > 20 && temp <= 21) {
        ans = 1.0016 + (temp - 20) * -0.0241;
      } else if (temp > 21 && temp <= 22) {
        ans = 0.9775 + (temp - 21) * -0.0231;
      } else if (temp > 22 && temp <= 23) {
        ans = 0.9544 + (temp - 22) * -0.0223;
      } else if (temp > 23 && temp <= 24) {
        ans = 0.9321 + (temp - 23) * -0.0214;
      } else if (temp > 24 && temp <= 25) {
        ans = 0.9107 + (temp - 24) * -0.0207;
      } else if (temp > 25 && temp <= 26) {
        ans = 0.89 + (temp - 25) * -0.0199;
      } else if (temp > 26 && temp <= 27) {
        ans = 0.8701 + (temp - 26) * -0.0192;
      } else if (temp > 27 && temp <= 28) {
        ans = 0.8509 + (temp - 27) * -0.0185;
      } else if (temp > 28 && temp <= 29) {
        ans = 0.8324 + (temp - 28) * -0.0179;
      } else if (temp > 29 && temp <= 30) {
        ans = 0.8145 + (temp - 29) * -0.0173;
      } else if (temp > 30 && temp <= 31) {
        ans = 0.7972 + (temp - 30) * -0.0167;
      } else if (temp > 31 && temp <= 32) {
        ans = 0.7805 + (temp - 31) * -0.0161;
      } else if (temp > 32 && temp <= 33) {
        ans = 0.7644 + (temp - 32) * -0.0156;
      } else if (temp > 33 && temp <= 34) {
        ans = 0.7488 + (temp - 33) * -0.0151;
      } else if (temp > 34 && temp <= 35) {
        ans = 0.7337 + (temp - 34) * -0.0146;
      } else if (temp > 35 && temp <= 36) {
        ans = 0.7191 + (temp - 35) * -0.0141;
      } else if (temp > 36 && temp <= 37) {
        ans = 0.705 + (temp - 36) * -0.0137;
      } else if (temp > 37 && temp <= 38) {
        ans = 0.6913 + (temp - 37) * -0.0133;
      } else if (temp > 38 && temp <= 39) {
        ans = 0.678 + (temp - 38) * -0.0128;
      } else if (temp > 39 && temp <= 40) {
        ans = 0.6652 + (temp - 39) * -0.0125;
      } else if (temp > 40 && temp <= 45) {
        ans = 0.6527 + (temp - 40) * -0.01138;
      } else if (temp > 45 && temp <= 50) {
        ans = 0.5958 + (temp - 45) * -0.00986;
      } else if (temp > 50 && temp <= 55) {
        ans = 0.5465 + (temp - 50) * -0.00858;
      } else if (temp > 55 && temp <= 60) {
        ans = 0.5036 + (temp - 55) * -0.00752;
      } else if (temp > 60 && temp <= 65) {
        ans = 0.466 + (temp - 60) * -0.00662;
      } else if (temp > 65 && temp <= 70) {
        ans = 0.4329 + (temp - 65) * -0.00558;
      } else if (temp > 70 && temp <= 75) {
        ans = 0.4035 + (temp - 70) * -0.00522;
      } else if (temp > 75 && temp <= 80) {
        ans = 0.3774 + (temp - 75) * -0.00468;
      } else if (temp > 80 && temp <= 90) {
        ans = 0.354 + (temp - 80) * -0.00391;
      } else if (temp > 90 && temp <= 100) {
        ans = 0.3149 + (temp - 90) * -0.00324;
      } else if (temp > 100 && temp <= 110) {
        ans = 0.2825 + (temp - 100) * -0.00235;
      } else if (temp > 110 && temp <= 120) {
        ans = 0.259 + (temp - 110) * -0.00216;
      } else if (temp > 120 && temp <= 130) {
        ans = 0.2374 + (temp - 120) * -0.00196;
      } else if (temp > 130 && temp <= 140) {
        ans = 0.2178 + (temp - 130) * -0.00167;
      } else if (temp > 140 && temp <= 150) {
        ans = 0.2011 + (temp - 140) * -0.00147;
      } else if (temp > 150 && temp <= 160) {
        ans = 0.1864 + (temp - 150) * -0.00128;
      } else if (temp > 160 && temp <= 170) {
        ans = 0.1736 + (temp - 160) * -0.00108;
      } else if (temp > 170 && temp <= 180) {
        ans = 0.1628 + (temp - 170) * -0.00098;
      } else if (temp > 180 && temp <= 190) {
        ans = 0.153 + (temp - 180) * -0.00088;
      } else if (temp > 190 && temp <= 200) {
        ans = 0.1442 + (temp - 190) * -0.00078;
      } else if (temp > 200 && temp <= 210) {
        ans = 0.1364 + (temp - 200) * -0.00059;
      } else if (temp > 210 && temp <= 220) {
        ans = 0.1305 + (temp - 210) * -0.00059;
      } else if (temp > 220 && temp <= 230) {
        ans = 0.1246 + (temp - 220) * -0.00049;
      } else if (temp > 230 && temp <= 240) {
        ans = 0.1197 + (temp - 230) * -0.00049;
      } else if (temp > 240 && temp <= 250) {
        ans = 0.1148 + (temp - 240) * -0.00049;
      } else if (temp > 250 && temp <= 260) {
        ans = 0.1099 + (temp - 250) * -0.0004;
      } else if (temp > 260 && temp <= 270) {
        ans = 0.1059 + (temp - 260) * -0.00039;
      } else if (temp > 270 && temp <= 280) {
        ans = 0.102 + (temp - 270) * -0.00039;
      } else if (temp > 280 && temp <= 290) {
        ans = 0.0981 + (temp - 280) * -0.00039;
      } else if (temp > 290 && temp <= 300) {
        ans = 0.0942 + (temp - 290) * -0.0003;
      } else if (temp > 300 && temp <= 310) {
        ans = 0.0912 + (temp - 300) * -0.00029;
      } else if (temp > 310 && temp <= 320) {
        ans = 0.0883 + (temp - 310) * -0.0003;
      } else if (temp > 320 && temp <= 330) {
        ans = 0.0853 + (temp - 320) * -0.00039;
      } else if (temp > 330 && temp <= 340) {
        ans = 0.0814 + (temp - 330) * -0.00039;
      } else if (temp > 340 && temp <= 350) {
        ans = 0.0775 + (temp - 340) * -0.00049;
      } else if (temp > 350 && temp <= 360) {
        ans = 0.0726 + (temp - 350) * -0.00059;
      } else if (temp > 360 && temp <= 370) {
        ans = 0.0667 + (temp - 360) * -0.00098;
      }

      // Second calculation block for ans1
      if (temp >= 0 && temp <= 2) {
        ans1 = (1.788 + (temp - 0) * -0.05725) / (0.9999 + (temp - 0) * -0.0);
      } else if (temp > 2 && temp <= 3) {
        ans1 =
          (1.6735 + (temp - 2) * -0.0545) / (0.9999 + (temp - 2) * -0.0001);
      } else if (temp > 3 && temp <= 4) {
        ans1 = (1.619 + (temp - 3) * -0.0517) / (1.0 + (temp - 3) * -0.0);
      } else if (temp > 4 && temp <= 5) {
        ans1 = (1.5673 + (temp - 4) * -0.04909) / (1.0 + (temp - 4) * -0.0);
      } else if (temp > 5 && temp <= 6) {
        ans1 = (1.5182 + (temp - 5) * -0.0467) / (1.0 + (temp - 5) * -0.0001);
      } else if (temp > 6 && temp <= 7) {
        ans1 = (1.4715 + (temp - 6) * -0.0444) / (0.9999 + (temp - 6) * -0.0);
      } else if (temp > 7 && temp <= 8) {
        ans1 = (1.4271 + (temp - 7) * -0.0424) / (0.9999 + (temp - 7) * -0.0);
      } else if (temp > 8 && temp <= 9) {
        ans1 =
          (1.3847 + (temp - 8) * -0.0403) / (0.9999 + (temp - 8) * -0.0001);
      } else if (temp > 9 && temp <= 10) {
        ans1 =
          (1.3444 + (temp - 9) * -0.0385) / (0.9998 + (temp - 9) * -0.0001);
      } else if (temp > 10 && temp <= 11) {
        ans1 =
          (1.3059 + (temp - 10) * -0.0367) / (0.9997 + (temp - 10) * -0.0001);
      } else if (temp > 11 && temp <= 12) {
        ans1 =
          (1.2692 + (temp - 11) * -0.0352) / (0.9996 + (temp - 11) * -0.0001);
      } else if (temp > 12 && temp <= 13) {
        ans1 =
          (1.234 + (temp - 12) * -0.0335) / (0.9995 + (temp - 12) * -0.0001);
      } else if (temp > 13 && temp <= 14) {
        ans1 =
          (1.2005 + (temp - 13) * -0.0322) / (0.9994 + (temp - 13) * -0.0002);
      } else if (temp > 14 && temp <= 15) {
        ans1 =
          (1.1683 + (temp - 14) * -0.0308) / (0.9992 + (temp - 14) * -0.0001);
      } else if (temp > 15 && temp <= 16) {
        ans1 =
          (1.1375 + (temp - 15) * -0.0294) / (0.9991 + (temp - 15) * -0.0002);
      } else if (temp > 16 && temp <= 17) {
        ans1 =
          (1.1081 + (temp - 16) * -0.0283) / (0.9989 + (temp - 16) * -0.0001);
      } else if (temp > 17 && temp <= 18) {
        ans1 =
          (1.0798 + (temp - 17) * -0.0272) / (0.9988 + (temp - 17) * -0.0002);
      } else if (temp > 18 && temp <= 19) {
        ans1 =
          (1.0526 + (temp - 18) * -0.026) / (0.9986 + (temp - 18) * -0.0002);
      } else if (temp > 19 && temp <= 20) {
        ans1 =
          (1.0266 + (temp - 19) * -0.025) / (0.9984 + (temp - 19) * -0.0002);
      } else if (temp > 20 && temp <= 21) {
        ans1 =
          (1.0016 + (temp - 20) * -0.0241) / (0.9982 + (temp - 20) * -0.0002);
      } else if (temp > 21 && temp <= 22) {
        ans1 =
          (0.9775 + (temp - 21) * -0.0231) / (0.998 + (temp - 21) * -0.0002);
      } else if (temp > 22 && temp <= 23) {
        ans1 =
          (0.9544 + (temp - 22) * -0.0223) / (0.9978 + (temp - 22) * -0.0003);
      } else if (temp > 23 && temp <= 24) {
        ans1 =
          (0.9321 + (temp - 23) * -0.0214) / (0.9975 + (temp - 23) * -0.0002);
      } else if (temp > 24 && temp <= 25) {
        ans1 =
          (0.9107 + (temp - 24) * -0.0207) / (0.9973 + (temp - 24) * -0.0003);
      } else if (temp > 25 && temp <= 26) {
        ans1 = (0.89 + (temp - 25) * -0.0199) / (0.997 + (temp - 25) * -0.0002);
      } else if (temp > 26 && temp <= 27) {
        ans1 =
          (0.8701 + (temp - 26) * -0.0192) / (0.9968 + (temp - 26) * -0.0003);
      } else if (temp > 27 && temp <= 28) {
        ans1 =
          (0.8509 + (temp - 27) * -0.0185) / (0.9965 + (temp - 27) * -0.0003);
      } else if (temp > 28 && temp <= 29) {
        ans1 =
          (0.8324 + (temp - 28) * -0.0179) / (0.9962 + (temp - 28) * -0.0003);
      } else if (temp > 29 && temp <= 30) {
        ans1 =
          (0.8145 + (temp - 29) * -0.0173) / (0.9959 + (temp - 29) * -0.0003);
      } else if (temp > 30 && temp <= 31) {
        ans1 =
          (0.7972 + (temp - 30) * -0.0167) / (0.9956 + (temp - 30) * -0.0003);
      } else if (temp > 31 && temp <= 32) {
        ans1 =
          (0.7805 + (temp - 31) * -0.0161) / (0.9953 + (temp - 31) * -0.0003);
      } else if (temp > 32 && temp <= 33) {
        ans1 =
          (0.7644 + (temp - 32) * -0.0156) / (0.995 + (temp - 32) * -0.0003);
      } else if (temp > 33 && temp <= 34) {
        ans1 =
          (0.7488 + (temp - 33) * -0.0151) / (0.9947 + (temp - 33) * -0.0003);
      } else if (temp > 34 && temp <= 35) {
        ans1 =
          (0.7337 + (temp - 34) * -0.0146) / (0.9944 + (temp - 34) * -0.0004);
      } else if (temp > 35 && temp <= 36) {
        ans1 =
          (0.7191 + (temp - 35) * -0.0141) / (0.994 + (temp - 35) * -0.0003);
      } else if (temp > 36 && temp <= 37) {
        ans1 =
          (0.705 + (temp - 36) * -0.0137) / (0.9937 + (temp - 36) * -0.0004);
      } else if (temp > 37 && temp <= 38) {
        ans1 =
          (0.6913 + (temp - 37) * -0.0133) / (0.9933 + (temp - 37) * -0.0003);
      } else if (temp > 38 && temp <= 39) {
        ans1 =
          (0.678 + (temp - 38) * -0.0128) / (0.993 + (temp - 38) * -0.0004);
      } else if (temp > 39 && temp <= 40) {
        ans1 =
          (0.6652 + (temp - 39) * -0.0125) / (0.9926 + (temp - 39) * -0.0004);
      } else if (temp > 40 && temp <= 45) {
        ans1 =
          (0.6527 + (temp - 40) * -0.01138) / (0.9922 + (temp - 40) * -0.0004);
      } else if (temp > 45 && temp <= 50) {
        ans1 =
          (0.5958 + (temp - 45) * -0.00986) / (0.9902 + (temp - 45) * -0.00044);
      } else if (temp > 50 && temp <= 55) {
        ans1 =
          (0.5465 + (temp - 50) * -0.00858) / (0.988 + (temp - 50) * -0.00046);
      } else if (temp > 55 && temp <= 60) {
        ans1 =
          (0.5036 + (temp - 55) * -0.00752) / (0.9857 + (temp - 55) * -0.0005);
      } else if (temp > 60 && temp <= 65) {
        ans1 =
          (0.466 + (temp - 60) * -0.00662) / (0.9832 + (temp - 60) * -0.00052);
      } else if (temp > 65 && temp <= 70) {
        ans1 =
          (0.4329 + (temp - 65) * -0.00558) / (0.9806 + (temp - 65) * -0.00056);
      } else if (temp > 70 && temp <= 75) {
        ans1 =
          (0.4035 + (temp - 70) * -0.00522) / (0.9778 + (temp - 70) * -0.0006);
      } else if (temp > 75 && temp <= 80) {
        ans1 =
          (0.3774 + (temp - 75) * -0.00468) / (0.9748 + (temp - 75) * -0.0006);
      } else if (temp > 80 && temp <= 90) {
        ans1 =
          (0.354 + (temp - 80) * -0.00391) / (0.9718 + (temp - 80) * -0.00065);
      } else if (temp > 90 && temp <= 100) {
        ans1 =
          (0.3149 + (temp - 90) * -0.00324) / (0.9653 + (temp - 90) * -0.00069);
      } else if (temp > 100 && temp <= 110) {
        ans1 =
          (0.2825 + (temp - 100) * -0.00235) /
          (0.9584 + (temp - 100) * -0.00074);
      } else if (temp > 110 && temp <= 120) {
        ans1 =
          (0.259 + (temp - 110) * -0.00216) / (0.951 + (temp - 110) * -0.00079);
      } else if (temp > 120 && temp <= 130) {
        ans1 =
          (0.2374 + (temp - 120) * -0.00196) /
          (0.9431 + (temp - 120) * -0.00083);
      } else if (temp > 130 && temp <= 140) {
        ans1 =
          (0.2178 + (temp - 130) * -0.00167) /
          (0.9348 + (temp - 130) * -0.00087);
      } else if (temp > 140 && temp <= 150) {
        ans1 =
          (0.2011 + (temp - 140) * -0.00147) /
          (0.9261 + (temp - 140) * -0.00091);
      } else if (temp > 150 && temp <= 160) {
        ans1 =
          (0.1864 + (temp - 150) * -0.00128) /
          (0.917 + (temp - 150) * -0.00096);
      } else if (temp > 160 && temp <= 170) {
        ans1 =
          (0.1736 + (temp - 160) * -0.00108) /
          (0.9074 + (temp - 160) * -0.00101);
      } else if (temp > 170 && temp <= 180) {
        ans1 =
          (0.1628 + (temp - 170) * -0.00098) /
          (0.8973 + (temp - 170) * -0.00104);
      } else if (temp > 180 && temp <= 190) {
        ans1 =
          (0.153 + (temp - 180) * -0.00088) /
          (0.8869 + (temp - 180) * -0.00109);
      } else if (temp > 190 && temp <= 200) {
        ans1 =
          (0.1442 + (temp - 190) * -0.00078) / (0.876 + (temp - 190) * -0.0013);
      } else if (temp > 200 && temp <= 210) {
        ans1 =
          (0.1364 + (temp - 200) * -0.00059) /
          (0.863 + (temp - 200) * -0.00102);
      } else if (temp > 210 && temp <= 220) {
        ans1 =
          (0.1305 + (temp - 210) * -0.00059) /
          (0.8528 + (temp - 210) * -0.00125);
      } else if (temp > 220 && temp <= 230) {
        ans1 =
          (0.1246 + (temp - 220) * -0.00049) /
          (0.8403 + (temp - 220) * -0.0013);
      } else if (temp > 230 && temp <= 240) {
        ans1 =
          (0.1197 + (temp - 230) * -0.00049) /
          (0.8273 + (temp - 230) * -0.00137);
      } else if (temp > 240 && temp <= 250) {
        ans1 =
          (0.1148 + (temp - 240) * -0.00049) /
          (0.8136 + (temp - 240) * -0.00146);
      } else if (temp > 250 && temp <= 260) {
        ans1 =
          (0.1099 + (temp - 250) * -0.0004) / (0.799 + (temp - 250) * -0.0015);
      } else if (temp > 260 && temp <= 270) {
        ans1 =
          (0.1059 + (temp - 260) * -0.00039) /
          (0.784 + (temp - 260) * -0.00161);
      } else if (temp > 270 && temp <= 280) {
        ans1 =
          (0.102 + (temp - 270) * -0.00039) /
          (0.7679 + (temp - 270) * -0.00172);
      } else if (temp > 280 && temp <= 290) {
        ans1 =
          (0.0981 + (temp - 280) * -0.00039) /
          (0.7507 + (temp - 280) * -0.00184);
      } else if (temp > 290 && temp <= 300) {
        ans1 =
          (0.0942 + (temp - 290) * -0.0003) /
          (0.7323 + (temp - 290) * -0.00198);
      } else if (temp > 300 && temp <= 310) {
        ans1 =
          (0.0912 + (temp - 300) * -0.00029) /
          (0.7125 + (temp - 300) * -0.00214);
      } else if (temp > 310 && temp <= 320) {
        ans1 =
          (0.0883 + (temp - 310) * -0.0003) / (0.6911 + (temp - 310) * -0.0024);
      } else if (temp > 320 && temp <= 330) {
        ans1 =
          (0.0853 + (temp - 320) * -0.00039) /
          (0.6671 + (temp - 320) * -0.00269);
      } else if (temp > 330 && temp <= 340) {
        ans1 =
          (0.0814 + (temp - 330) * -0.00039) /
          (0.6402 + (temp - 330) * -0.00301);
      } else if (temp > 340 && temp <= 350) {
        ans1 =
          (0.0775 + (temp - 340) * -0.00049) /
          (0.6101 + (temp - 340) * -0.00357);
      } else if (temp > 350 && temp <= 360) {
        ans1 =
          (0.0726 + (temp - 350) * -0.00059) /
          (0.5744 + (temp - 350) * -0.00464);
      } else if (temp > 360 && temp <= 370) {
        ans1 =
          (0.0667 + (temp - 360) * -0.00098) /
          (0.4505 + (temp - 360) * -0.00775);
      }

      // Third calculation block for ans3
      if (temp >= 0 && temp <= 2) {
        ans3 = 0.9999 + (temp - 0) * -0.0;
      } else if (temp > 2 && temp <= 3) {
        ans3 = 0.9999 + (temp - 2) * -0.0001;
      } else if (temp > 3 && temp <= 4) {
        ans3 = 1.0 + (temp - 3) * -0.0;
      } else if (temp > 4 && temp <= 5) {
        ans3 = 1.0 + (temp - 4) * -0.0;
      } else if (temp > 5 && temp <= 6) {
        ans3 = 1.0 + (temp - 5) * -0.0001;
      } else if (temp > 6 && temp <= 7) {
        ans3 = 0.9999 + (temp - 6) * -0.0;
      } else if (temp > 7 && temp <= 8) {
        ans3 = 0.9999 + (temp - 7) * -0.0;
      } else if (temp > 8 && temp <= 9) {
        ans3 = 0.9999 + (temp - 8) * -0.0001;
      } else if (temp > 9 && temp <= 10) {
        ans3 = 0.9998 + (temp - 9) * -0.0001;
      } else if (temp > 10 && temp <= 11) {
        ans3 = 0.9997 + (temp - 10) * -0.0001;
      } else if (temp > 11 && temp <= 12) {
        ans3 = 0.9996 + (temp - 11) * -0.0001;
      } else if (temp > 12 && temp <= 13) {
        ans3 = 0.9995 + (temp - 12) * -0.0001;
      } else if (temp > 13 && temp <= 14) {
        ans3 = 0.9994 + (temp - 13) * -0.0002;
      } else if (temp > 14 && temp <= 15) {
        ans3 = 0.9992 + (temp - 14) * -0.0001;
      } else if (temp > 15 && temp <= 16) {
        ans3 = 0.9991 + (temp - 15) * -0.0002;
      } else if (temp > 16 && temp <= 17) {
        ans3 = 0.9989 + (temp - 16) * -0.0001;
      } else if (temp > 17 && temp <= 18) {
        ans3 = 0.9988 + (temp - 17) * -0.0002;
      } else if (temp > 18 && temp <= 19) {
        ans3 = 0.9986 + (temp - 18) * -0.0002;
      } else if (temp > 19 && temp <= 20) {
        ans3 = 0.9984 + (temp - 19) * -0.0002;
      } else if (temp > 20 && temp <= 21) {
        ans3 = 0.9982 + (temp - 20) * -0.0002;
      } else if (temp > 21 && temp <= 22) {
        ans3 = 0.998 + (temp - 21) * -0.0002;
      } else if (temp > 22 && temp <= 23) {
        ans3 = 0.9978 + (temp - 22) * -0.0003;
      } else if (temp > 23 && temp <= 24) {
        ans3 = 0.9975 + (temp - 23) * -0.0002;
      } else if (temp > 24 && temp <= 25) {
        ans3 = 0.9973 + (temp - 24) * -0.0003;
      } else if (temp > 25 && temp <= 26) {
        ans3 = 0.997 + (temp - 25) * -0.0002;
      } else if (temp > 26 && temp <= 27) {
        ans3 = 0.9968 + (temp - 26) * -0.0003;
      } else if (temp > 27 && temp <= 28) {
        ans3 = 0.9965 + (temp - 27) * -0.0003;
      } else if (temp > 28 && temp <= 29) {
        ans3 = 0.9962 + (temp - 28) * -0.0003;
      } else if (temp > 29 && temp <= 30) {
        ans3 = 0.9959 + (temp - 29) * -0.0003;
      } else if (temp > 30 && temp <= 31) {
        ans3 = 0.9956 + (temp - 30) * -0.0003;
      } else if (temp > 31 && temp <= 32) {
        ans3 = 0.9953 + (temp - 31) * -0.0003;
      } else if (temp > 32 && temp <= 33) {
        ans3 = 0.995 + (temp - 32) * -0.0003;
      } else if (temp > 33 && temp <= 34) {
        ans3 = 0.9947 + (temp - 33) * -0.0003;
      } else if (temp > 34 && temp <= 35) {
        ans3 = 0.9944 + (temp - 34) * -0.0004;
      } else if (temp > 35 && temp <= 36) {
        ans3 = 0.994 + (temp - 35) * -0.0003;
      } else if (temp > 36 && temp <= 37) {
        ans3 = 0.9937 + (temp - 36) * -0.0004;
      } else if (temp > 37 && temp <= 38) {
        ans3 = 0.9933 + (temp - 37) * -0.0003;
      } else if (temp > 38 && temp <= 39) {
        ans3 = 0.993 + (temp - 38) * -0.0004;
      } else if (temp > 39 && temp <= 40) {
        ans3 = 0.9926 + (temp - 39) * -0.0004;
      } else if (temp > 40 && temp <= 45) {
        ans3 = 0.9922 + (temp - 40) * -0.0004;
      } else if (temp > 45 && temp <= 50) {
        ans3 = 0.9902 + (temp - 45) * -0.00044;
      } else if (temp > 50 && temp <= 55) {
        ans3 = 0.988 + (temp - 50) * -0.00046;
      } else if (temp > 55 && temp <= 60) {
        ans3 = 0.9857 + (temp - 55) * -0.0005;
      } else if (temp > 60 && temp <= 65) {
        ans3 = 0.9832 + (temp - 60) * -0.00052;
      } else if (temp > 65 && temp <= 70) {
        ans3 = 0.9806 + (temp - 65) * -0.00056;
      } else if (temp > 70 && temp <= 75) {
        ans3 = 0.9778 + (temp - 70) * -0.0006;
      } else if (temp > 75 && temp <= 80) {
        ans3 = 0.9748 + (temp - 75) * -0.0006;
      } else if (temp > 80 && temp <= 90) {
        ans3 = 0.9718 + (temp - 80) * -0.00065;
      } else if (temp > 90 && temp <= 100) {
        ans3 = 0.9653 + (temp - 90) * -0.00069;
      } else if (temp > 100 && temp <= 110) {
        ans3 = 0.9584 + (temp - 100) * -0.00074;
      } else if (temp > 110 && temp <= 120) {
        ans3 = 0.951 + (temp - 110) * -0.00079;
      } else if (temp > 120 && temp <= 130) {
        ans3 = 0.9431 + (temp - 120) * -0.00083;
      } else if (temp > 130 && temp <= 140) {
        ans3 = 0.9348 + (temp - 130) * -0.00087;
      } else if (temp > 140 && temp <= 150) {
        ans3 = 0.9261 + (temp - 140) * -0.00091;
      } else if (temp > 150 && temp <= 160) {
        ans3 = 0.917 + (temp - 150) * -0.00096;
      } else if (temp > 160 && temp <= 170) {
        ans3 = 0.9074 + (temp - 160) * -0.00101;
      } else if (temp > 170 && temp <= 180) {
        ans3 = 0.8973 + (temp - 170) * -0.00104;
      } else if (temp > 180 && temp <= 190) {
        ans3 = 0.8869 + (temp - 180) * -0.00109;
      } else if (temp > 190 && temp <= 200) {
        ans3 = 0.876 + (temp - 190) * -0.0013;
      } else if (temp > 200 && temp <= 210) {
        ans3 = 0.863 + (temp - 200) * -0.00102;
      } else if (temp > 210 && temp <= 220) {
        ans3 = 0.8528 + (temp - 210) * -0.00125;
      } else if (temp > 220 && temp <= 230) {
        ans3 = 0.8403 + (temp - 220) * -0.0013;
      } else if (temp > 230 && temp <= 240) {
        ans3 = 0.8273 + (temp - 230) * -0.00137;
      } else if (temp > 240 && temp <= 250) {
        ans3 = 0.8136 + (temp - 240) * -0.00146;
      } else if (temp > 250 && temp <= 260) {
        ans3 = 0.799 + (temp - 250) * -0.0015;
      } else if (temp > 260 && temp <= 270) {
        ans3 = 0.784 + (temp - 260) * -0.00161;
      } else if (temp > 270 && temp <= 280) {
        ans3 = 0.7679 + (temp - 270) * -0.00172;
      } else if (temp > 280 && temp <= 290) {
        ans3 = 0.7507 + (temp - 280) * -0.00184;
      } else if (temp > 290 && temp <= 300) {
        ans3 = 0.7323 + (temp - 290) * -0.00198;
      } else if (temp > 300 && temp <= 310) {
        ans3 = 0.7125 + (temp - 300) * -0.00214;
      } else if (temp > 310 && temp <= 320) {
        ans3 = 0.6911 + (temp - 310) * -0.0024;
      } else if (temp > 320 && temp <= 330) {
        ans3 = 0.6671 + (temp - 320) * -0.00269;
      } else if (temp > 330 && temp <= 340) {
        ans3 = 0.6402 + (temp - 330) * -0.00301;
      } else if (temp > 340 && temp <= 350) {
        ans3 = 0.6101 + (temp - 340) * -0.00357;
      } else if (temp > 350 && temp <= 360) {
        ans3 = 0.5744 + (temp - 350) * -0.00464;
      } else if (temp > 360 && temp <= 370) {
        ans3 = 0.4505 + (temp - 360) * -0.00775;
      }

      param["tech_ans"] = isNaN(ans) ? "NaN" : ans;
      param["tech_ans1"] = isNaN(ans1) ? "NaN" : ans1;
      param["tech_ans2"] = isNaN(ans3) ? "NaN" : ans3;

      return param;
    } else {
      param["error"] = "Please! Enter Water temperature";
      return param;
    }
  }

  /**
   * getCalculationUnitVectorCalculator: Service Method
   * POST: /api/calculators-lol/unit-vector-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationUnitVectorCalculator(body) {
    const param = {};

    const method = body.tech_method ? body.tech_method.trim() : "";
    const dimen = body.tech_dimen ? body.tech_dimen.trim() : "";
    const find = body.tech_find ? body.tech_find.trim() : "";
    const find1 = body.tech_find1 ? body.tech_find1.trim() : "";
    let x = parseFloat(body.tech_x);
    let y = parseFloat(body.tech_y);
    let z = parseFloat(body.tech_z);
    let fx = parseFloat(body.tech_fx);
    let fy = parseFloat(body.tech_fy);
    let fz = parseFloat(body.tech_fz);

    if (!isNaN(x) && !isNaN(y) && !isNaN(z) && method && dimen) {
      if (method == "normalize") {
        if (dimen == "2d") {
          if (!isNaN(x) && !isNaN(y)) {
            const magnitude = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
            const vx = x / magnitude;
            const vy = y / magnitude;
            param["tech_vx"] = isNaN(vx) ? "NaN" : vx;
            param["tech_vy"] = isNaN(vy) ? "NaN" : vy;
            param["tech_magnitude"] = isNaN(magnitude) ? "NaN" : magnitude;
          } else {
            param["error"] = "Please fill all fields.";
            return param;
          }
        } else if (dimen == "3d") {
          if (!isNaN(x) && !isNaN(y) && !isNaN(z)) {
            const magnitude = Math.sqrt(
              Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2)
            );
            const vx = x / magnitude;
            const vy = y / magnitude;
            const vz = z / magnitude;
            param["tech_vx"] = isNaN(vx) ? "NaN" : vx;
            param["tech_vy"] = isNaN(vy) ? "NaN" : vy;
            param["tech_vz"] = isNaN(vz) ? "NaN" : vz;
            param["tech_magnitude"] = isNaN(magnitude) ? "NaN" : magnitude;
          } else {
            param["error"] = "Please fill all fields.";
            return param;
          }
        }
      } else if (method == "find") {
        if (dimen == "2d") {
          if (find == "x") {
            if (!isNaN(fy)) {
              fx = Math.sqrt(1 - Math.pow(fy, 2));
              const check = Math.round(Math.pow(fx, 2) + Math.pow(fy, 2));
              if (fy > 1) {
                param["error"] =
                  "Unit vector components must be less than or equal to 1";
                return param;
              }
              if (check != 1) {
                param["error"] = "It is not possible to create unit vector";
                return param;
              }
              param["tech_fx"] = isNaN(fx) ? "NaN" : fx;
            } else {
              param["error"] = "Please! Check Your Input";
              return param;
            }
          } else if (find == "y") {
            if (!isNaN(fx)) {
              fy = Math.sqrt(1 - Math.pow(fx, 2));
              const check = Math.round(Math.pow(fx, 2) + Math.pow(fy, 2));
              if (fx > 1) {
                param["error"] =
                  "Unit vector components must be less than or equal to 1";
                return param;
              }
              if (check != 1) {
                param["error"] = "It is not possible to create unit vector";
                return param;
              }
              param["tech_fy"] = isNaN(fy) ? "NaN" : fy;
            } else {
              param["error"] = "Please! Check Your Input";
              return param;
            }
          }
        } else if (dimen == "3d") {
          if (find1 == "x") {
            if (!isNaN(fy) && !isNaN(fz)) {
              fx = Math.sqrt(1 - (Math.pow(fy, 2) + Math.pow(fz, 2)));
              const check = Math.round(
                Math.pow(fx, 2) + Math.pow(fy, 2) + Math.pow(fz, 2)
              );
              if (fy > 1 || fz > 1) {
                param["error"] =
                  "Unit vector components must be less than or equal to 1";
                return param;
              }
              if (check != 1) {
                param["error"] = "It is not possible to create unit vector";
                return param;
              }
              param["tech_fx"] = isNaN(fx) ? "NaN" : fx;
            } else {
              param["error"] = "Please! Check Your Input";
              return param;
            }
          } else if (find1 == "y") {
            if (!isNaN(fx) && !isNaN(fz)) {
              fy = Math.sqrt(1 - (Math.pow(fx, 2) + Math.pow(fz, 2)));
              const check = Math.round(
                Math.pow(fx, 2) + Math.pow(fy, 2) + Math.pow(fz, 2)
              );
              if (fx > 1 || fz > 1) {
                param["error"] =
                  "Unit vector components must be less than or equal to 1";
                return param;
              }
              if (check != 1) {
                param["error"] = "It is not possible to create unit vector";
                return param;
              }
              param["tech_fy"] = isNaN(fy) ? "NaN" : fy;
            } else {
              param["error"] = "Please! Check Your Input";
              return param;
            }
          } else if (find1 == "z") {
            if (!isNaN(fx) && !isNaN(fy)) {
              fz = Math.sqrt(1 - (Math.pow(fx, 2) + Math.pow(fy, 2)));
              const check = Math.round(
                Math.pow(fx, 2) + Math.pow(fy, 2) + Math.pow(fz, 2)
              );
              if (fx > 1 || fy > 1) {
                param["error"] =
                  "Unit vector components must be less than or equal to 1";
                return param;
              }
              if (check != 1) {
                param["error"] = "It is not possible to create unit vector";
                return param;
              }
              param["tech_fz"] = fz;
            } else {
              param["error"] = "Please fill all fields.";
              return param;
            }
          }
        }
      } else {
        param["error"] = "Please fill all fields.";
        return param;
      }

      if (dimen == "2d") {
        let deg;
        if (method == "normalize") {
          if (x >= 0 && y >= 0) {
            deg = Math.atan(y / x);
          } else if (x >= 0 && y < 0) {
            deg = Math.PI * 2 + Math.atan(y / x);
          } else if (x < 0 && y >= 0) {
            deg = Math.PI + Math.atan(y / x);
          } else if (x < 0 && y < 0) {
            deg = Math.PI + Math.atan(y / x);
          }
        } else if (method == "find") {
          if (fx >= 0 && fy >= 0) {
            deg = Math.atan(fy / fx);
          } else if (fx >= 0 && fy < 0) {
            deg = Math.PI * 2 + Math.atan(fy / fx);
          } else if (fx < 0 && fy >= 0) {
            deg = Math.PI + Math.atan(fy / fx);
          } else if (fx < 0 && fy < 0) {
            deg = Math.PI + Math.atan(fy / fx);
          }
        }
        param["tech_deg"] = deg * (180 / Math.PI); // rad2deg conversion
      }

      param["tech_x"] = body.tech_x;
      param["tech_y"] = body.tech_y;
      param["tech_z"] = body.tech_z;
      param["tech_fx"] = body.tech_fx;
      param["tech_fy"] = body.tech_fy;
      param["tech_fz"] = body.tech_fz;
      return param;
    } else {
      param["error"] = "Please fill all fields.";
      return param;
    }
  }

  /** getCalculationPotentialEnergycalculator
   * POST: /api/calculators-lol/potential-energy-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationPotentialEnergycalculator(body) {
    let cal = body.tech_cal?.trim();
    let mass = parseFloat(body.tech_mass);
    let mass_unit = body.tech_mass_unit?.trim();
    let gravity = parseFloat(body.tech_gravity);
    let gravity_unit = body.tech_gravity_unit?.trim();
    let height = parseFloat(body.tech_height);
    let height_unit = body.tech_height_unit?.trim();
    let pe = parseFloat(body.tech_pe);
    let pe_unit = body.tech_pe_unit?.trim();

    const sigFig = (value, digits) => {
      if (value === 0) return 0;
      let d = digits - Math.floor(Math.log10(Math.abs(value))) - 1;
      let decimalPlaces = Math.max(0, Math.min(d, 100));
      return parseFloat(value.toFixed(decimalPlaces));
    };

    if (isFinite(mass)) {
      if (mass_unit === "ug") {
        mass = mass / 1000000000;
      } else if (mass_unit === "mg") {
        mass = mass * 1000000;
      } else if (mass_unit === "g") {
        mass = mass / 1000;
      } else if (mass_unit === "dag") {
        mass = mass / 100;
      } else if (mass_unit === "t") {
        mass = mass / 0.001;
      } else if (mass_unit === "gr") {
        mass = mass / 15432;
      } else if (mass_unit === "dr") {
        mass = mass / 564.4;
      } else if (mass_unit === "oz") {
        mass = mass / 35.274;
      } else if (mass_unit === "lb") {
        mass = mass / 2.2046;
      } else if (mass_unit === "stone") {
        mass = mass / 0.15747;
      } else if (mass_unit === "us_ton") {
        mass = mass / 0.0011023;
      } else if (mass_unit === "long_ton") {
        mass = mass / 0.0009842;
      } else if (mass_unit === "earths") {
        mass = mass * 5972000000000000000000000;
      } else if (mass_unit === "me") {
        mass = mass / 1097769122809886380500592292548;
      } else if (mass_unit === "u") {
        mass = mass / 602214000000000000000000000;
      } else if (mass_unit === "oz_t") {
        mass = mass / 32.15075;
      }
    }
    if (isFinite(gravity)) {
      if (gravity_unit === "cm_s2") {
        gravity = gravity * 0.01;
      } else if (gravity_unit === "in_s2") {
        gravity = gravity / 39.370078740157;
      } else if (gravity_unit === "mi_h_s") {
        gravity = gravity / 2.24;
      } else if (gravity_unit === "g") {
        gravity = gravity / 0.10193679918451;
      }
    }
    if (isFinite(height)) {
      if (height_unit === "mm") {
        height = height / 1000;
      } else if (height_unit === "cm") {
        height = height / 100;
      } else if (height_unit === "km") {
        height = height / 0.001;
      } else if (height_unit === "in") {
        height = height / 39.37;
      } else if (height_unit === "ft") {
        height = height / 3.281;
      } else if (height_unit === "yd") {
        height = height / 1.0936;
      } else if (height_unit === "mi") {
        height = height / 0.0006214;
      } else if (height_unit === "nmi") {
        height = height / 0.00054;
      }
    }

    let param = {};

    if (
      cal === "mass" &&
      isFinite(gravity) &&
      isFinite(height) &&
      isFinite(pe)
    ) {
      console.log(gravity, height);
      mass = pe * (gravity * height);
      param.tech_ans = sigFig(mass, 4);
      param.tech_unit = "kg";
      param.tech_g = gravity;
      param.tech_h = height;
      param.tech_pe = pe;
    } else if (
      cal === "gravity" &&
      isFinite(mass) &&
      isFinite(height) &&
      isFinite(pe)
    ) {
      gravity = pe * (mass * height);
      param.tech_ans = sigFig(gravity, 4);
      param.tech_unit = "m/s²";
      param.tech_m = mass;
      param.tech_h = height;
      param.tech_pe = pe;
    } else if (
      cal === "height" &&
      isFinite(mass) &&
      isFinite(gravity) &&
      isFinite(pe)
    ) {
      height = pe * (mass * gravity);
      param.tech_ans = sigFig(height, 4);
      param.tech_unit = "m";
      param.tech_m = mass;
      param.tech_g = gravity;
      param.tech_pe = pe;
    } else if (
      cal === "pe" &&
      isFinite(mass) &&
      isFinite(gravity) &&
      isFinite(height)
    ) {
      pe = mass * gravity * height;
      param.tech_ans = sigFig(pe, 4);
      param.tech_unit = "J";
      param.tech_m = mass;
      param.tech_g = gravity;
      param.tech_h = height;
    } else {
      param.error = "Please fill all fields.";
      return param;
    }

    param.tech_cal = cal;
    param.tech_mass = sigFig(mass, 4);
    return param;
  }

  /** getCalculationWavelengthcalculator
   * POST: /api/calculators-lol/wavelength-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationWavelengthcalculator(body) {
    let find = body.tech_find?.trim();
    let velocity = parseFloat(body.tech_velocity);
    let velocity_unit = body.tech_velocity_unit?.trim();
    let frequency = parseFloat(body.tech_frequency);
    let frequency_unit = body.tech_frequency_unit?.trim();
    let wavelength = parseFloat(body.tech_wavelength);
    let wavelength_unit = body.tech_wavelength_unit?.trim();

    let result = {};

    if (!isNaN(wavelength)) {
      if (wavelength_unit === "nm") {
        wavelength = wavelength / 1000000000;
      } else if (wavelength_unit === "um") {
        wavelength = wavelength / 1000000;
      } else if (wavelength_unit === "mm") {
        wavelength = wavelength / 1000;
      } else if (wavelength_unit === "cm") {
        wavelength = wavelength / 100;
      } else if (wavelength_unit === "km") {
        wavelength = wavelength / 0.001;
      } else if (wavelength_unit === "in") {
        wavelength = wavelength / 39.3701;
      } else if (wavelength_unit === "ft") {
        wavelength = wavelength / 3.28084;
      } else if (wavelength_unit === "yd") {
        wavelength = wavelength / 1.093613;
      } else if (wavelength_unit === "mi") {
        wavelength = wavelength / 0.000621371;
      }
    }
    if (!isNaN(frequency)) {
      if (frequency_unit === "khz") {
        frequency = frequency / 0.001;
      } else if (frequency_unit === "mhz") {
        frequency = frequency / 0.000001;
      } else if (frequency_unit === "ghz") {
        frequency = frequency / 0.000000001;
      } else if (frequency_unit === "thz") {
        frequency = frequency / 0.000000000001;
      }
    }
    if (!isNaN(velocity)) {
      if (velocity_unit === "cms") {
        velocity = velocity / 100;
      } else if (velocity_unit === "kmh") {
        velocity = velocity / 3.6;
      } else if (velocity_unit === "fts") {
        velocity = velocity / 3.28084;
      } else if (velocity_unit === "mph") {
        velocity = velocity / 2.236936;
      } else if (velocity_unit === "knots") {
        velocity = velocity / 1.943844;
      } else if (velocity_unit === "c") {
        velocity = velocity / 0.00000000333564;
      }
    }

    if (find === "wavelength" && !isNaN(frequency) && !isNaN(velocity)) {
      wavelength = velocity / frequency;
      const wavenumber = frequency / velocity;
      result = {
        tech_unit: "m",
        tech_ans: wavelength,
        tech_wn: wavenumber.toFixed(12),
        tech_wavelength: wavelength,
        tech_velocity: velocity,
        tech_find: find,
      };
    } else if (find === "frequency" && !isNaN(wavelength) && !isNaN(velocity)) {
      frequency = velocity / wavelength;
      const wavenumber = frequency / velocity;
      result = {
        tech_unit: "Hz",
        tech_ans: frequency,
        tech_wn: wavenumber.toFixed(12),
        tech_wavelength: wavelength,
        tech_velocity: velocity,
        tech_find: find,
      };
    } else if (find === "velocity" && !isNaN(wavelength) && !isNaN(frequency)) {
      velocity = frequency * wavelength;
      const wavenumber = frequency / velocity;
      result = {
        tech_unit: "m/s",
        tech_ans: velocity,
        tech_wn: wavenumber.toFixed(12),
        tech_wavelength: wavelength,
        tech_frequency: frequency,
        tech_find: find,
      };
    } else {
      result = {
        error: "Please fill all fields.",
      };
    }

    return result;
  }

  /**
   * getCalculationCenterOfMassCalculator: Service Method
   * POST: /api/calculators-lol/center-of-mass-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationCenterOfMassCalculator(body) {
    const param = {};

    let i = 1;
    const how = parseInt(body.tech_how);
    const dem = parseInt(body.tech_dem);
    const mass = [];
    const xs = [];
    const ys = [];
    const zs = [];
    let check = true;

    for (i = 1; i <= how; i++) {
      const m = parseFloat(body["tech_m" + i]);
      const x = parseFloat(body["tech_x" + i]);

      if (!isNaN(m) && !isNaN(x)) {
        // Convert mass units
        const mUnit = body["tech_m" + i + "_unit"];
        let convertedM = m;
        if (mUnit == "lbs") {
          convertedM *= 0.4536;
        } else if (mUnit == "g") {
          convertedM *= 0.001;
        }
        mass.push(convertedM);

        // Convert x units
        const xUnit = body["tech_x" + i + "_unit"];
        let convertedX = x;
        if (xUnit == "m") {
          convertedX *= 100;
        } else if (xUnit == "in") {
          convertedX *= 2.54;
        } else if (xUnit == "ft") {
          convertedX *= 30.48;
        } else if (xUnit == "yd") {
          convertedX *= 91.44;
        }
        xs.push(convertedX);
      } else {
        check = false;
        break;
      }

      if (dem == 2 || dem == 3) {
        const y = parseFloat(body["tech_y" + i]);

        if (!isNaN(y)) {
          // Convert y units
          const yUnit = body["tech_y" + i + "_unit"];
          let convertedY = y;
          if (yUnit == "m") {
            convertedY *= 100;
          } else if (yUnit == "in") {
            convertedY *= 2.54;
          } else if (yUnit == "ft") {
            convertedY *= 30.48;
          } else if (yUnit == "yd") {
            convertedY *= 91.44;
          }
          ys.push(convertedY);
        } else {
          check = false;
          break;
        }
      }

      if (dem == 3) {
        const z = parseFloat(body["tech_z" + i]);

        if (!isNaN(z)) {
          // Convert z units
          const zUnit = body["tech_z" + i + "_unit"];
          let convertedZ = z;
          if (zUnit == "m") {
            convertedZ *= 100;
          } else if (zUnit == "in") {
            convertedZ *= 2.54;
          } else if (zUnit == "ft") {
            convertedZ *= 30.48;
          } else if (zUnit == "yd") {
            convertedZ *= 91.44;
          }
          zs.push(convertedZ);
        } else {
          check = false;
          break;
        }
      }
    }

    if (check == true) {
      // Calculate x center of mass
      let xcm = 0;
      mass.forEach((value, key) => {
        xcm = xcm + value * xs[key];
      });

      const totalMass = mass.reduce((sum, current) => sum + current, 0);
      let ansx = xcm / totalMass;

      // Convert result units for x
      const resUnit = body.tech_res_unit;
      if (resUnit == "m") {
        ansx = ansx * 0.01;
      } else if (resUnit == "in") {
        ansx = ansx * 0.3937;
      } else if (resUnit == "ft") {
        ansx = ansx * 0.03281;
      } else if (resUnit == "yd") {
        ansx = ansx * 0.010936;
      }

      if (dem == 2 || dem == 3) {
        // Calculate y center of mass
        let ycm = 0;
        mass.forEach((value, key) => {
          ycm = ycm + value * ys[key];
        });
        let ansy = ycm / totalMass;

        // Convert result units for y
        if (resUnit == "m") {
          ansy = ansy * 0.01;
        } else if (resUnit == "in") {
          ansy = ansy * 0.3937;
        } else if (resUnit == "ft") {
          ansy = ansy * 0.03281;
        } else if (resUnit == "yd") {
          ansy = ansy * 0.010936;
        }
        param["tech_ansy"] = ansy;
      }

      if (dem == 3) {
        // Calculate z center of mass
        let zcm = 0;
        mass.forEach((value, key) => {
          zcm = zcm + value * zs[key];
        });
        let ansz = zcm / totalMass;

        // Convert result units for z
        if (resUnit == "m") {
          ansz = ansz * 0.01;
        } else if (resUnit == "in") {
          ansz = ansz * 0.3937;
        } else if (resUnit == "ft") {
          ansz = ansz * 0.03281;
        } else if (resUnit == "yd") {
          ansz = ansz * 0.010936;
        }
        param["tech_ansz"] = ansz;
      }

      param["tech_ansx"] = ansx;
      param["tech_unit"] = resUnit;
      return param;
    } else {
      param["error"] = "Please fill all fields.";
      return param;
    }
  }

  /** getCalculationSpringConstantcalculator
   * POST: /api/calculators-lol/spring-constant-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationSpringConstantcalculator(body) {
    let selection = body.tech_selection?.trim();
    let val1 = parseFloat(body.tech_spring_constant);
    let val2 = parseFloat(body.tech_spring_displacement);
    let val3 = parseFloat(body.tech_spring_force);
    let spring_displacement_unit = body.tech_spring_displacement_unit?.trim();

    let result = {};

    // Displacement unit conversion to meters
    const convertToMeters = (value, unit) => {
      if (unit === "m") return value;
      if (unit === "mm") return value / 1000;
      if (unit === "cm") return value / 100;
      if (unit === "inches") return value / 39.3701;
      if (unit === "feet") return value / 3.28084;
      if (unit === "yards") return value / 1.093613;
      return value;
    };

    // Displacement unit conversion from meters
    const convertFromMeters = (value, unit) => {
      if (unit === "m") return value;
      if (unit === "mm") return value * 1000;
      if (unit === "cm") return value * 100;
      if (unit === "inches") return value * 39.3701;
      if (unit === "feet") return value * 3.28084;
      if (unit === "yards") return value * 1.093613;
      return value;
    };

    if (selection === "1") {
      if (!isNaN(val1) && !isNaN(val2)) {
        let displacement = convertToMeters(val2, spring_displacement_unit);
        let force = -1 * displacement * val1;
        result.tech_fahad1 = force;
      } else {
        result.error = "Please fill all fields.";
      }
    } else if (selection === "2") {
      if (!isNaN(val2) && !isNaN(val3)) {
        let springConstant = val3 / val2;
        let converted =
          -1 * convertFromMeters(springConstant, spring_displacement_unit);
        result.tech_fahad2 = converted;
      } else {
        result.error = "Please fill all fields.";
      }
    } else if (selection === "3") {
      if (!isNaN(val1) && !isNaN(val3)) {
        let an = val3 / val1;
        result.tech_an = an;
        result.tech_ans = -1 * (an * 1000); // mm
        result.tech_ans1 = -1 * (an * 100); // cm
        result.tech_ans2 = -1 * (an * 39.3701); // inches
        result.tech_ans3 = -1 * (an * 3.28084); // feet
        result.tech_ans4 = -1 * (an * 1.093613); // yards
      } else {
        result.error = "Please fill all fields.";
      }
    }

    return result;
  }

  /**
   * getCalculationelEctricFieldCalculator: Service Method
   * POST: /api/calculators-lol/electric-field-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationelEctricFieldCalculator(body) {
    const param = {};

    const charge = parseFloat(body.tech_charge);
    const c_unit = body.tech_c_unit ? body.tech_c_unit.trim() : "";
    const distance = parseFloat(body.tech_distance);
    const d_unit = body.tech_d_unit ? body.tech_d_unit.trim() : "";
    const selection = body.tech_selection;
    const per = parseFloat(body.tech_per);
    const distance1 = body.tech_distance1 || [];
    const charge1 = body.tech_charge1 || [];
    const selection3 = body.tech_selection3;
    const field = parseFloat(body.tech_electric_field);
    const charge_unit = body.tech_charge_unit || [];
    const distance_unit = body.tech_distance_unit || [];

    const d_unit_name = [
      "nm",
      "μm",
      "mm",
      "cm",
      "m",
      "km",
      "in",
      "ft",
      "yd",
      "mi",
    ];
    const c_unit_name = ["PC", "NC", "μC", "mC", "C", "e"];

    const d_unit_index = d_unit_name.indexOf(d_unit) + 1;
    const c_unit_index = c_unit_name.indexOf(c_unit) + 1;

    let convert;
    let convert2;

    if (
      !isNaN(charge) &&
      !isNaN(distance) &&
      !isNaN(per) &&
      charge != 0 &&
      distance > 0 &&
      per != 0
    ) {
      if (selection == "1") {
        if (selection3 == "1") {
          if (c_unit_index == 1) {
            convert = charge * 0.000001;
          } else if (c_unit_index == 2) {
            convert = charge * 0.000000001;
          } else if (c_unit_index == 3) {
            convert = charge * 0.000001;
          } else if (c_unit_index == 4) {
            convert = charge * 0.001;
          } else if (c_unit_index == 5) {
            convert = charge * 1;
          } else if (c_unit_index == 6) {
            convert = charge * 1.60218e-19;
          } else {
            param["error"] = "Invalid charge unit";
            return param;
          }

          if (d_unit_index == 1) {
            convert2 = distance * 0.000000001;
          } else if (d_unit_index == 2) {
            convert2 = distance * 0.000001;
          } else if (d_unit_index == 3) {
            convert2 = distance * 0.001;
          } else if (d_unit_index == 4) {
            convert2 = distance * 0.01;
          } else if (d_unit_index == 5) {
            convert2 = distance * 1;
          } else if (d_unit_index == 6) {
            convert2 = distance * 1000;
          } else if (d_unit_index == 7) {
            convert2 = distance * 0.0254;
          } else if (d_unit_index == 8) {
            convert2 = distance * 0.3048;
          } else if (d_unit_index == 9) {
            convert2 = distance * 0.9144;
          } else if (d_unit_index == 10) {
            convert2 = distance * 1609.3;
          } else {
            param["error"] = "Invalid distance unit";
            return param;
          }

          const field3 =
            (8.9875517923e9 * convert) / (convert2 * convert2) / per;
          param["tech_answer"] = field3;
          return param;
        } else if (selection3 == "2") {
          if (c_unit_index == 1) {
            convert = charge * 0.000001;
          } else if (c_unit_index == 2) {
            convert = charge * 0.000000001;
          } else if (c_unit_index == 3) {
            convert = charge * 0.000001;
          } else if (c_unit_index == 4) {
            convert = charge * 0.001;
          } else if (c_unit_index == 5) {
            convert = charge * 1;
          } else if (c_unit_index == 6) {
            convert = charge * 1.60218e-19;
          } else {
            param["error"] = "Invalid charge unit";
            return param;
          }

          const distance_formula = (8.9875517923e9 * convert) / field / per;
          const sqrt = Math.sqrt(distance_formula);
          param["tech_answer1"] = sqrt;
          return param;
        } else if (selection3 == "3") {
          if (d_unit_index == 1) {
            convert2 = distance * 0.000000001;
          } else if (d_unit_index == 2) {
            convert2 = distance * 0.000001;
          } else if (d_unit_index == 3) {
            convert2 = distance * 0.001;
          } else if (d_unit_index == 4) {
            convert2 = distance * 0.01;
          } else if (d_unit_index == 5) {
            convert2 = distance * 1;
          } else if (d_unit_index == 6) {
            convert2 = distance * 1000;
          } else if (d_unit_index == 7) {
            convert2 = distance * 0.0254;
          } else if (d_unit_index == 8) {
            convert2 = distance * 0.3048;
          } else if (d_unit_index == 9) {
            convert2 = distance * 0.9144;
          } else if (d_unit_index == 10) {
            convert2 = distance * 1609.3;
          } else {
            param["error"] = "Invalid distance unit";
            return param;
          }

          const charge_formula =
            (field * (convert2 * convert2)) / 8.9875517923e9 / per;
          param["tech_answer2"] = charge_formula;
          return param;
        }
      }
    } else {
      param["error"] = "Please! Check Your Input";
      return param;
    }

    if (selection == "2") {
      let formula2 = 0;
      let i = 0;
      const c1 = charge1.length;
      const d1 = distance1.length;

      // Calculate formula2 from arrays
      while (i < c1 && i < d1) {
        const chargeVal = parseFloat(charge1[i]);
        const distanceVal = parseFloat(distance1[i]);

        console.log(
          `Processing index ${i}: charge=${chargeVal}, distance=${distanceVal}`
        );

        if (
          !isNaN(chargeVal) &&
          !isNaN(distanceVal) &&
          chargeVal > 0 &&
          distanceVal > 0
        ) {
          const value1 = chargeVal;
          const value2 = charge_unit[i];
          const value2_index = c_unit_name.indexOf(value2) + 1;

          let con;
          if (value2_index == 1) {
            con = value1 * 0.000001;
          } else if (value2_index == 2) {
            con = value1 * 0.000000001;
          } else if (value2_index == 3) {
            con = value1 * 0.000001;
          } else if (value2_index == 4) {
            con = value1 * 0.001;
          } else if (value2_index == 5) {
            con = value1 * 1;
          } else if (value2_index == 6) {
            con = value1 * 1.60218e-19;
          } else {
            console.log(`Invalid charge unit: ${value2}`);
            param["error"] = `Invalid charge unit: ${value2}`;
            return param;
          }

          const value3 = distanceVal;
          const value4 = distance_unit[i];
          const value4_index = d_unit_name.indexOf(value4) + 1;

          let con2;
          if (value4_index == 1) {
            con2 = value3 * 0.000000001;
          } else if (value4_index == 2) {
            con2 = value3 * 0.000001;
          } else if (value4_index == 3) {
            con2 = value3 * 0.001;
          } else if (value4_index == 4) {
            con2 = value3 * 0.01;
          } else if (value4_index == 5) {
            con2 = value3 * 1;
          } else if (value4_index == 6) {
            con2 = value3 * 1000;
          } else if (value4_index == 7) {
            con2 = value3 * 0.0254;
          } else if (value4_index == 8) {
            con2 = value3 * 0.3048;
          } else if (value4_index == 9) {
            con2 = value3 * 0.9144;
          } else if (value4_index == 10) {
            con2 = value3 * 1609.3;
          } else {
            console.log(`Invalid distance unit: ${value4}`);
            param["error"] = `Invalid distance unit: ${value4}`;
            return param;
          }

          const partial = (8.9875517923e9 * con) / (con2 * con2);

          formula2 = formula2 + partial;
          i++;
        } else {
          param["error"] = "Please! Check Your Input in array values";
          return param;
        }
      }

      // Calculate main charge and distance
      if (
        !isNaN(charge) &&
        !isNaN(distance) &&
        !isNaN(per) &&
        charge > 0 &&
        distance > 0 &&
        per > 0
      ) {
        if (c_unit_index == 1) {
          convert = charge * 0.000001;
        } else if (c_unit_index == 2) {
          convert = charge * 0.000000001;
        } else if (c_unit_index == 3) {
          convert = charge * 0.000001;
        } else if (c_unit_index == 4) {
          convert = charge * 0.001;
        } else if (c_unit_index == 5) {
          convert = charge * 1;
        } else if (c_unit_index == 6) {
          convert = charge * 1.60218e-19;
        } else {
          param["error"] = "Invalid main charge unit";
          return param;
        }

        if (d_unit_index == 1) {
          convert2 = distance * 0.000000001;
        } else if (d_unit_index == 2) {
          convert2 = distance * 0.000001;
        } else if (d_unit_index == 3) {
          convert2 = distance * 0.001;
        } else if (d_unit_index == 4) {
          convert2 = distance * 0.01;
        } else if (d_unit_index == 5) {
          convert2 = distance * 1;
        } else if (d_unit_index == 6) {
          convert2 = distance * 1000;
        } else if (d_unit_index == 7) {
          convert2 = distance * 0.0254;
        } else if (d_unit_index == 8) {
          convert2 = distance * 0.3048;
        } else if (d_unit_index == 9) {
          convert2 = distance * 0.9144;
        } else if (d_unit_index == 10) {
          convert2 = distance * 1609.3;
        } else {
          param["error"] = "Invalid main distance unit";
          return param;
        }
      } else {
        param["error"] = "Please! Check Your main Input";
        return param;
      }

      const mainField =
        (8.9875517923e9 * convert) / (convert2 * convert2) / per;
      const field2 = mainField + formula2;
      param["tech_answer3"] = field2;
      return param;
    }

    param["error"] = "Please! Check Your Input";
    return param;
  }

  /**
   * getCalculationelMomentOfInertiaCalculator: Service Method
   * POST: /api/calculators-lol/moment-of-inertia-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationelMomentOfInertiaCalculator(body) {
    const param = {};

    const selection = body.tech_selection;
    const b_width = parseFloat(body.tech_b_width);
    const height = parseFloat(body.tech_height);
    const dis_to_height = parseFloat(body.tech_dis_to_height);
    const rad = parseFloat(body.tech_radius);
    const tfw = parseFloat(body.tech_tfw);
    const tft = parseFloat(body.tech_tft);
    const bfw = parseFloat(body.tech_bfw);
    const bft = parseFloat(body.tech_bft);
    const wh = parseFloat(body.tech_wh);
    const wt = parseFloat(body.tech_wt);
    const r = parseFloat(body.tech_r);
    const h1 = parseFloat(body.tech_h1);
    const b1 = parseFloat(body.tech_b1);
    const lft = parseFloat(body.tech_lft);
    const lfh = parseFloat(body.tech_lfh);
    const rad2 = parseFloat(body.tech_radius2);
    const unit = body.tech_unit;

    param["m2"] = `${unit}<sup>2</sup>`;
    param["m4"] = `${unit}<sup>4</sup>`;
    param["m"] = `${unit}`;
    param["m3"] = `${unit}<sup>3</sup>`;

    if (
      !isNaN(b_width) &&
      !isNaN(height) &&
      !isNaN(dis_to_height) &&
      b_width > 0 &&
      height > 0 &&
      dis_to_height > 0
    ) {
      if (selection == "1") {
        //Triangle
        const calculate_ix = (b_width * (height * height * height)) / 36;
        const calculate_iy =
          height * (b_width * b_width * b_width) -
          height * dis_to_height * (b_width * b_width) +
          (b_width * height * (dis_to_height * dis_to_height)) / 36;
        const calculate_area = (b_width * height) / 2;
        const elastic_section_modulus1 = (b_width * height * height) / 24;
        const elastic_section_modulus2 = (b_width * b_width * b_width) / 24;
        const calculate_cy = height / 3;
        const calculate_cx = height / 2;

        param["tech_answer1"] = isNaN(calculate_ix) ? "NaN" : calculate_ix;
        param["tech_answer2"] = isNaN(calculate_iy) ? "NaN" : calculate_iy;
        param["tech_answer3"] = isNaN(calculate_cy) ? "NaN" : calculate_cy;
        param["tech_answer4"] = isNaN(calculate_cx) ? "NaN" : calculate_cx;
        param["tech_answer5"] = isNaN(calculate_area) ? "NaN" : calculate_area;
        param["tech_answer6"] = isNaN(elastic_section_modulus1)
          ? "NaN"
          : elastic_section_modulus1;
        param["tech_answer7"] = isNaN(elastic_section_modulus1)
          ? "NaN"
          : elastic_section_modulus1;
        return param;
      }
    } else {
      param["error"] = "Please fill all fields.";
      return param;
    }

    if (!isNaN(b_width) && !isNaN(height) && b_width > 0 && height > 0) {
      if (selection == "2") {
        //Rectangle
        const calculate_ix = (b_width * height * height * height) / 12;
        const calculate_iy = (height * b_width * b_width * b_width) / 12;
        const calculate_cy = height / 2;
        const calculate_cx = b_width / 2;
        const calculate_area = b_width * height;
        const elastic_section_modulus1 = calculate_ix / calculate_cy;
        const elastic_section_modulus2 = calculate_iy / calculate_cx;
        const jc =
          (1 / 12) * (b_width * height) * (b_width * b_width) + height * height;

        param["tech_answer1"] = isNaN(calculate_ix) ? "NaN" : calculate_ix;
        param["tech_answer2"] = isNaN(calculate_iy) ? "NaN" : calculate_iy;
        param["tech_answer3"] = isNaN(calculate_cy) ? "NaN" : calculate_cy;
        param["tech_answer4"] = isNaN(calculate_cx) ? "NaN" : calculate_cx;
        param["tech_answer5"] = isNaN(calculate_area) ? "NaN" : calculate_area;
        param["tech_answer6"] = isNaN(elastic_section_modulus1)
          ? "NaN"
          : elastic_section_modulus1;
        param["tech_answer7"] = isNaN(elastic_section_modulus2)
          ? "NaN"
          : elastic_section_modulus2;

        return param;
      }
    } else {
      param["error"] = "Please fill all fields.";
      return param;
    }

    if (!isNaN(rad) && !isNaN(rad2) && rad > 0 && rad2 > 0) {
      if (selection == "3") {
        if (rad > rad2) {
          const calculate_ix =
            (Math.PI / 64) * (rad * rad * rad * rad) -
            (Math.PI / 64) * (rad2 * rad2 * rad2 * rad2);
          const calculate_iy =
            (Math.PI / 64) * (rad * rad * rad * rad) -
            (Math.PI / 64) * (rad2 * rad2 * rad2 * rad2);
          const d1 = rad / 2;
          const d2 = rad2 / 2;
          const calculate_area = (d1 * d1 - d2 * d2) * Math.PI;
          const calculate_cy = rad / 2;
          const calculate_cx = rad / 2;
          const elastic_section_modulus1 = calculate_ix / calculate_cy;
          const elastic_section_modulus2 = calculate_iy / calculate_cx;
          param["tech_answer1"] = isNaN(calculate_ix) ? "NaN" : calculate_ix;
          param["tech_answer2"] = isNaN(calculate_iy) ? "NaN" : calculate_iy;
          param["tech_answer3"] = isNaN(calculate_cy) ? "NaN" : calculate_cy;
          param["tech_answer4"] = isNaN(calculate_cx) ? "NaN" : calculate_cx;
          param["tech_answer5"] = isNaN(calculate_area)
            ? "NaN"
            : calculate_area;
          param["tech_answer6"] = isNaN(elastic_section_modulus1)
            ? "NaN"
            : elastic_section_modulus1;
          param["tech_answer7"] = isNaN(elastic_section_modulus2)
            ? "NaN"
            : elastic_section_modulus2;
          return param;
        } else {
          param["error"] = "D must be larger than d";
          return param;
        }
      }
    } else {
      param["error"] = "Please fill all fields.";
      return param;
    }

    if (!isNaN(rad)) {
      if (selection == "4") {
        //Circle
        const calculate_ix = (Math.PI / 64) * rad * rad * rad * rad;
        const calculate_iy = (Math.PI / 64) * rad * rad * rad * rad;
        const calculate_area = (Math.PI * rad * rad) / 4;
        const calculate_cy = rad / 2;
        const calculate_cx = rad / 2;
        const elastic_section_modulus1 = calculate_ix / calculate_cy;
        const elastic_section_modulus2 = calculate_iy / calculate_cx;

        param["tech_answer1"] = isNaN(calculate_ix) ? "NaN" : calculate_ix;
        param["tech_answer2"] = isNaN(calculate_iy) ? "NaN" : calculate_iy;
        param["tech_answer3"] = isNaN(calculate_cy) ? "NaN" : calculate_cy;
        param["tech_answer4"] = isNaN(calculate_cx) ? "NaN" : calculate_cx;
        param["tech_answer5"] = isNaN(calculate_area) ? "NaN" : calculate_area;
        param["tech_answer6"] = isNaN(elastic_section_modulus1)
          ? "NaN"
          : elastic_section_modulus1;
        param["tech_answer7"] = isNaN(elastic_section_modulus2)
          ? "NaN"
          : elastic_section_modulus2;
        return param;
      }
    } else {
      param["error"] = "Please fill all fields.";
      return param;
    }

    if (
      !isNaN(b_width) &&
      !isNaN(height) &&
      !isNaN(h1) &&
      !isNaN(b1) &&
      b_width > 0 &&
      height > 0 &&
      h1 > 0 &&
      b1 > 0
    ) {
      if (selection == "7") {
        if (b_width > h1 && height > b1) {
          //Hollow Rectangular
          const calculate_area = b_width * height - h1 * b1;
          const calculate_ix =
            (b_width * height * height * height) / 12 -
            (b1 * h1 * h1 * h1) / 12;
          const calculate_iy =
            (b_width * b_width * b_width * height) / 12 -
            (b1 * b1 * b1 * h1) / 12;
          const calculate_cy = b_width / 2;
          const calculate_cx = height / 2;
          const section_modulus1 = calculate_ix / calculate_cx;
          const section_modulus2 = calculate_iy / calculate_cy;

          param["tech_answer1"] = isNaN(calculate_ix) ? "NaN" : calculate_ix;
          param["tech_answer2"] = isNaN(calculate_iy) ? "NaN" : calculate_iy;
          param["tech_answer3"] = isNaN(calculate_cy) ? "NaN" : calculate_cy;
          param["tech_answer4"] = isNaN(calculate_cx) ? "NaN" : calculate_cx;
          param["tech_answer5"] = isNaN(calculate_area)
            ? "NaN"
            : calculate_area;
          param["tech_answer6"] = isNaN(section_modulus1)
            ? "NaN"
            : section_modulus1;
          param["tech_answer7"] = isNaN(section_modulus2)
            ? "NaN"
            : section_modulus2;

          return param;
        } else {
          param["error"] =
            "h1 must be larger than h and b must be larger than b1";
          return param;
        }
      }
    } else {
      param["error"] = "Please fill all fields.";
      return param;
    }

    if (
      !isNaN(bfw) &&
      !isNaN(bft) &&
      !isNaN(tft) &&
      !isNaN(tfw) &&
      !isNaN(wt) &&
      !isNaN(wh) &&
      bfw > 0 &&
      bft > 0 &&
      tft > 0 &&
      tfw > 0 &&
      wh > 0 &&
      wt > 0
    ) {
      if (selection == "8") {
        //I-Beam
        let x3, x2;
        const a1 = bfw * bft;
        const a2 = wt * wh;
        const a3 = tfw * tft;
        const total_area = a1 + a2 + a3;
        const x1 = (x2 = x3 = tfw);
        const y1 = bft / 2;
        const y2 = bft + wh / 2;
        const y3 = bft + wh + tft / 2;
        const y_dash = (a1 * y1 + a2 * y2 + a3 * y3) / (a1 + a2 + a3);
        const x_dash = tfw;
        const hy1 = y_dash - y1;
        const xx1 = (bfw * bft * bft * bft) / 12 + a1 * (hy1 * hy1);
        const hy2 = y_dash - y2;
        const xx2 = (wt * wh * wh * wh) / 12 + a2 * (hy2 * hy2);
        const hy3 = y_dash - y3;
        const xx3 = (tfw * tft * tft * tft) / 12 + a3 * (hy3 * hy3);
        const total_x = xx1 + xx2 + xx3;
        const hx1 = x_dash - x1;
        const hx2 = x_dash - x2;
        const hx3 = x_dash - x3;
        const ans1 = (bfw * bfw * bfw * bft) / 12;
        const ans2 = (wt * wt * wt * wh) / 12;
        const ans3 = (tfw * tfw * tfw * tft) / 12;
        const ans_y = ans1 + ans2 + ans3;
        const section_modulus1 = total_x / y_dash;
        const section_modulus2 = ans_y / x_dash;

        param["tech_answer1"] = isNaN(total_x) ? "NaN" : total_x;
        param["tech_answer2"] = isNaN(ans_y) ? "NaN" : ans_y;
        param["tech_answer3"] = isNaN(y_dash) ? "NaN" : y_dash;
        param["tech_answer4"] = isNaN(x_dash) ? "NaN" : x_dash;
        param["tech_answer5"] = isNaN(total_area) ? "NaN" : total_area;
        param["tech_answer6"] = isNaN(section_modulus1)
          ? "NaN"
          : section_modulus1;
        param["tech_answer7"] = isNaN(section_modulus2)
          ? "NaN"
          : section_modulus2;
        return param;
      }
    } else {
      param["error"] = "Please fill all fields.";
      return param;
    }

    if (
      !isNaN(bfw) &&
      !isNaN(bft) &&
      !isNaN(lfh) &&
      !isNaN(lft) &&
      bfw > 0 &&
      bft > 0 &&
      lfh > 0 &&
      lft > 0
    ) {
      if (selection == "9") {
        //L-Beam
        const a1 = bfw * bft;
        const a2 = lfh * lft;
        const total_area = a1 + a2;
        const x1 = bfw / 2;
        const x2 = bft / 2;
        const y1 = lft / 2;
        const y2 = lft + lfh / 2;
        const x_dash = (a1 * x1 + a2 * x2) / (a1 + a2);
        const y_dash = (a1 * y1 + a2 * y2) / (a1 + a2);
        const hy1 = y_dash - y1;
        const xx1 = (bfw * bft * bft * bft) / 12 + a1 * (hy1 * hy1);
        const hy2 = y_dash - y2;
        const xx2 = (lft * lfh * lfh * lfh) / 12 + a2 * (hy2 * hy2);
        const xxx = xx1 + xx2;
        const hx1 = x_dash - x1;
        const yy1 = (bft * bfw * bfw * bfw) / 12 + a1 * (hx1 * hx1);
        const hx2 = x_dash - x2;
        const yy2 = (lfh * lft * lft * lft) / 12 + a2 * (hx2 * hx2);
        const yyy = yy1 + yy2;
        const section_modulus1 = xxx / y_dash;
        const section_modulus2 = yyy / x_dash;

        param["tech_answer1"] = isNaN(xxx) ? "NaN" : xxx;
        param["tech_answer2"] = isNaN(yyy) ? "NaN" : yyy;
        param["tech_answer3"] = isNaN(y_dash) ? "NaN" : y_dash;
        param["tech_answer4"] = isNaN(x_dash) ? "NaN" : x_dash;
        param["tech_answer5"] = isNaN(total_area) ? "NaN" : total_area;
        param["tech_answer6"] = isNaN(section_modulus1)
          ? "NaN"
          : section_modulus1;
        param["tech_answer7"] = isNaN(section_modulus2)
          ? "NaN"
          : section_modulus2;
        return param;
      }
    } else {
      param["error"] = "Please fill all fields.";
      return param;
    }

    if (
      !isNaN(tfw) &&
      !isNaN(tft) &&
      !isNaN(wh) &&
      !isNaN(wt) &&
      tfw > 0 &&
      tft > 0 &&
      wh > 0 &&
      wh > 0
    ) {
      if (selection == "10") {
        //T-Beam
        const a1 = tft * tfw;
        const a2 = wh * wt;
        const area = a1 + a2;
        const y1 = tfw + tft / 2;
        const y2 = wh / 2;
        var x_bar = wh / 2;
        const x1 = tfw / 2;
        const x2 = tfw / 2;
        var x_bar = (a1 * x1 + a2 * x2) / (a1 + a2);
        const y_bar = (a1 * y1 + a2 * y2) / (a1 + a2);
        const xx1 =
          (tfw * tft * tft * tft) / 12 + a1 * ((y_bar - y1) * (y_bar - y1));
        const h2 = y_bar - y2;
        const xx2 = (wh * wh * wh * wt) / 12 + a2 * (h2 * h2);
        const xxx = xx1 + xx2;
        const hx1 = x_bar - x1;
        const yy1 = (wh * wh * wh * wt) / 12 + a1 * (hx1 - hx1);
        const hx2 = x_bar - x2;
        const yy2 = (wh * wt * wt * wt) / 12 + a2 * (hx2 - hx2);
        const yyy = yy1 + yy2;

        param["tech_answer1"] = isNaN(xxx) ? "NaN" : xxx;
        param["tech_answer2"] = isNaN(yyy) ? "NaN" : yyy;
        param["tech_answer3"] = isNaN(y_bar) ? "NaN" : y_bar;
        param["tech_answer4"] = isNaN(x_bar) ? "NaN" : x_bar;
        param["tech_answer5"] = isNaN(area) ? "NaN" : area;
        param["tech_answer6"] = isNaN(xxx / y_bar) ? "NaN" : xxx / y_bar;
        param["tech_answer7"] = isNaN(yyy / x_bar) ? "NaN" : yyy / x_bar;

        return param;
      }
    } else {
      param["error"] = "Please fill all fields.";
      return param;
    }

    if (
      !isNaN(bfw) &&
      !isNaN(bft) &&
      !isNaN(tfw) &&
      !isNaN(tft) &&
      !isNaN(wt) &&
      !isNaN(h1) &&
      bfw > 0 &&
      bft > 0 &&
      tfw > 0 &&
      tft > 0 &&
      tfw > 0 &&
      wt > 0 &&
      h1 > 0
    ) {
      if (selection == "11") {
        //Channel
        const a1 = bfw * bft;
        const a2 = wt * h1;
        const a3 = tfw * tft;
        const total_area = a1 + a2 + a3;
        const x1 = bfw / 2;
        const x2 = wt / 2;
        const x3 = tfw / 2;
        const x_dash = (a1 * x1 + a2 * x2 + a3 * x3) / (a1 + a2 + a3);
        const y1 = bft / 2;
        const y2 = bft + h1 / 2;
        const y3 = bft + h1 + wt / 2;
        const y_dash = (a1 * y1 + a2 * y2 + a3 * y3) / (a1 + a2 + a3);
        const hy1 = y_dash - y1;
        const xx1 = (bfw * bft * bft * bft) / 12 + a1 * (hy1 * hy1);
        const hy2 = y_dash - y2;
        const xx2 = (wt * h1 * h1 * h1) / 12 + a2 * (hy2 * hy2);
        const hy3 = y_dash - y3;
        const xx3 = (tfw * tft * tft * tft) / 12 + a3 * (hy3 * hy3);
        const calculate_ix = xx1 + xx2 + xx3;
        const hx1 = x_dash - x1;
        const yy1 = (bft * bfw * bfw * bfw) / 12 + a1 * (hx1 * hx1);
        const hx2 = x_dash - x2;
        const yy2 = (wt * wt * wt * h1) / 12 + a2 * (hx2 * hx2);
        const hx3 = x_dash - x3;
        const yy3 = (tfw * tfw * tfw * tft) / 12 + a3 * (hx3 * hx3);
        const yyy = yy1 + yy2 + yy3;

        param["tech_answer1"] = isNaN(calculate_ix) ? "NaN" : calculate_ix;
        param["tech_answer2"] = isNaN(yyy) ? "NaN" : yyy;
        param["tech_answer3"] = isNaN(y_dash) ? "NaN" : y_dash;
        param["tech_answer4"] = isNaN(x_dash) ? "NaN" : x_dash;
        param["tech_answer5"] = isNaN(total_area) ? "NaN" : total_area;
        param["tech_answer6"] = isNaN(calculate_ix / y_dash)
          ? "NaN"
          : calculate_ix / y_dash;
        param["tech_answer7"] = isNaN(yyy / x_dash) ? "NaN" : yyy / x_dash;

        return param;
      }
    } else {
      param["error"] = "Please fill all fields.";
      return param;
    }

    param["error"] = "Please fill all fields.";
    return param;
  }

  /**
   * getCalculationelFreeFallCalculator: Service Method
   * POST: /api/calculators-lol/free-fall-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationelFreeFallCalculator(body) {
    let acceleration = body.tech_acceleration;
    let a_unit = body.tech_a_unit;
    let height = body.tech_height;
    let velocity = body.tech_velocity;
    let v_unit = body.tech_v_unit;
    let h_unit = body.tech_h_unit;
    let time = body.tech_time;
    let t_unit = body.tech_t_unit;
    let velocity_one = body.tech_velocity_one;
    let v_one_unit = body.tech_v_one_unit;
    let selection = body.tech_selection;

    const result = {};

    // Convert velocity unit to numeric value
    let vUnit = v_unit;
    if (v_unit == "m/s²") vUnit = "1";
    else if (v_unit == "km/h") vUnit = "2";
    else if (v_unit == "ft/s") vUnit = "3";
    else if (v_unit == "mph") vUnit = "4";
    else if (v_unit == "knots") vUnit = "5";
    else if (v_unit == "km/s") vUnit = "6";
    else if (v_unit == "mi/s") vUnit = "7";
    else if (v_unit == "ft/min") vUnit = "8";
    else if (v_unit == "m/min") vUnit = "9";

    // Convert acceleration unit to numeric value
    let aUnit = a_unit;
    if (a_unit == "m/s²") aUnit = "1";
    else if (a_unit == "g") aUnit = "2";
    else if (a_unit == "ft/s²") aUnit = "3";

    // Convert height unit to numeric value
    let hUnit = h_unit;
    if (h_unit == "cm") hUnit = "1";
    else if (h_unit == "m") hUnit = "2";
    else if (h_unit == "km") hUnit = "3";
    else if (h_unit == "in") hUnit = "4";
    else if (h_unit == "ft") hUnit = "5";
    else if (h_unit == "yd") hUnit = "6";
    else if (h_unit == "mi") hUnit = "7";

    // Convert time unit to numeric value
    let tUnit = t_unit;
    if (t_unit == "sec") tUnit = "1";
    else if (t_unit == "min") tUnit = "2";
    else if (t_unit == "hrs") tUnit = "3";

    // Convert velocity_one unit to numeric value
    let vOneUnit = v_one_unit;
    if (v_one_unit == "cm") vOneUnit = "1";
    else if (v_one_unit == "km/h") vOneUnit = "2";
    else if (v_one_unit === "ft/s") vOneUnit = "3";
    else if (v_one_unit == "mph") vOneUnit = "4";
    else if (v_one_unit == "knots") vOneUnit = "5";
    else if (v_one_unit == "km/s") vOneUnit = "6";
    else if (v_one_unit == "mi/s") vOneUnit = "7";
    else if (v_one_unit == "ft/min") vOneUnit = "8";
    else if (v_one_unit == "m/min") vOneUnit = "9";

    // Selection 1: Calculate time and final velocity from height
    if (selection == "1") {
      if (
        isFinite(acceleration) &&
        isFinite(velocity) &&
        isFinite(height) &&
        acceleration > 0 &&
        height > 0
      ) {
        // Convert acceleration to m/s²
        let convert;
        if (aUnit == "1") convert = acceleration * 1;
        else if (aUnit == "2") convert = acceleration * 9.80665;
        else if (aUnit == "3") convert = acceleration * 0.3048;

        // Convert velocity to m/s
        let convert1;
        if (vUnit == "1") convert1 = velocity * 1;
        else if (vUnit == "2") convert1 = velocity * 0.2778;
        else if (vUnit == "3") convert1 = velocity * 0.3048;
        else if (vUnit == "4") convert1 = velocity * 0.447;
        else if (vUnit == "5") convert1 = velocity * 0.5144;
        else if (vUnit == "6") convert1 = velocity * 1000;
        else if (vUnit == "7") convert1 = velocity * 1609.3;
        else if (vUnit == "8") convert1 = velocity * 0.00508;
        else if (vUnit == "9") convert1 = velocity * 0.016667;

        // Convert height to meters
        let convert2;
        if (hUnit == "1") convert2 = height * 0.01;
        else if (hUnit == "2") convert2 = height * 1;
        else if (hUnit == "3") convert2 = height * 1000;
        else if (hUnit == "4") convert2 = height * 0.0254;
        else if (hUnit == "5") convert2 = height * 0.3048;
        else if (hUnit == "6") convert2 = height * 0.9144;
        else if (hUnit == "7") convert2 = height * 1609.344;

        const t = Math.sqrt((2 * convert2) / convert);
        const v = Math.sqrt(2 * convert * convert2);
        result.tech_answer1 = isNaN(t) ? "NaN" : t;
        result.tech_answer2 = isNaN(v) ? "NaN" : v;

        return result;
      } else {
        result.error = "Please fill all fields.";
        return result;
      }
    }
    // Selection 2: Calculate height and final velocity from time
    else if (selection == "2") {
      if (
        isFinite(acceleration) &&
        isFinite(velocity) &&
        isFinite(time) &&
        acceleration > 0 &&
        time > 0
      ) {
        // Convert acceleration to m/s²
        let convert;
        if (aUnit == "1") convert = acceleration * 1;
        else if (aUnit == "2") convert = acceleration * 9.80665;
        else if (aUnit == "3") convert = acceleration * 0.3048;

        // Convert velocity to m/s
        let convert1;
        if (vUnit == "1") convert1 = velocity * 1;
        else if (vUnit == "2") convert1 = velocity * 0.2778;
        else if (vUnit == "3") convert1 = velocity * 0.3048;
        else if (vUnit == "4") convert1 = velocity * 0.447;
        else if (vUnit == "5") convert1 = velocity * 0.5144;
        else if (vUnit == "6") convert1 = velocity * 1000;
        else if (vUnit == "7") convert1 = velocity * 1609.3;
        else if (vUnit == "8") convert1 = velocity * 0.00508;
        else if (vUnit == "9") convert1 = velocity * 0.016667;

        // Convert time to seconds
        let convert3;
        if (tUnit == "1") convert3 = time * 1;
        else if (tUnit == "2") convert3 = time * 60;
        else if (tUnit == "3") convert3 = time * 3600;

        const h = (1 / 2) * (convert * convert3 * convert3);
        const v = convert1 + convert * convert3;

        result.tech_answer3 = isNaN(h) ? "NaN" : h;
        result.tech_answer4 = isNaN(v) ? "NaN" : v;
        return result;
      } else {
        result.error = "Please fill all fields.";
        return result;
      }
    }
    // Selection 3: Calculate time and height from two velocities
    else if (selection == "3") {
      if (
        isFinite(acceleration) &&
        isFinite(velocity) &&
        isFinite(velocity_one) &&
        acceleration > 0 &&
        velocity > 0
      ) {
        // Convert acceleration to m/s²
        let convert;
        if (aUnit == "1") convert = acceleration * 1;
        else if (aUnit == "2") convert = acceleration * 9.80665;
        else if (aUnit == "3") convert = acceleration * 0.3048;

        // Convert velocity to m/s
        let convert1;
        if (vUnit == "1") convert1 = velocity * 1;
        else if (vUnit == "2") convert1 = velocity * 0.2778;
        else if (vUnit == "3") convert1 = velocity * 0.3048;
        else if (vUnit == "4") convert1 = velocity * 0.447;
        else if (vUnit == "5") convert1 = velocity * 0.5144;
        else if (vUnit == "6") convert1 = velocity * 1000;
        else if (vUnit == "7") convert1 = velocity * 1609.3;
        else if (vUnit == "8") convert1 = velocity * 0.00508;
        else if (vUnit == "9") convert1 = velocity * 0.016667;

        // Convert velocity_one to m/s
        let convert4;
        if (vOneUnit == "1") convert4 = velocity_one * 1;
        else if (vOneUnit == "2") convert4 = velocity_one * 0.2778;
        else if (vOneUnit == "3") convert4 = velocity_one * 0.3048;
        else if (vOneUnit === "4") convert4 = velocity_one * 0.447;
        else if (vOneUnit == "5") convert4 = velocity_one * 0.5144;
        else if (vOneUnit == "6") convert4 = velocity_one * 1000;
        else if (vOneUnit == "7") convert4 = velocity_one * 1609.3;
        else if (vOneUnit == "8") convert4 = velocity_one * 0.00508;
        else if (vOneUnit == "9") convert4 = velocity_one * 0.016667;

        if (convert4 > convert1) {
          const t = (convert4 - convert1) / convert;
          const h = convert1 * t + 0.5 * convert * (t * t);

          result.tech_answer5 = isNaN(t) ? "NaN" : t;
          result.tech_answer6 = isNaN(h) ? "NaN" : h;
          return result;
        } else {
          result.error =
            "Time of Fall Should Have a Positive Value.Height should have a positive value";
          return result;
        }
      } else {
        result.error = "Please fill all fields.";
        return result;
      }
    }

    return result;
  }

  /** getCalculationDewPointcalculator
   * POST: /api/calculators-lol/dew-point-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationDewPointcalculator(body) {
    let to_cal = body.tech_to_cal;
    let temp = parseFloat(body.tech_temp);
    let temp_unit = body.tech_temp_unit;
    let hum = parseFloat(body.tech_hum);
    let dew = parseFloat(body.tech_dew);
    let dew_unit = body.tech_dew_unit;

    let result = {};
    const a = 17.62;
    const b = 243.12;

    // Convert units to °C
    if (temp_unit == "°C") {
      temp_unit = 1;
    } else if (temp_unit == "°F") {
      temp_unit = 2;
    } else if (temp_unit == "K") {
      temp_unit = 3;
    }

    if (dew_unit == "°C") {
      dew_unit = 1;
    } else if (dew_unit == "°F") {
      dew_unit = 2;
    } else if (dew_unit == "K") {
      dew_unit = 3;
    }

    if (to_cal === "1") {
      if (!isNaN(temp) && !isNaN(hum)) {
        if (temp_unit === "2") {
          temp = ((temp - 32) * 5) / 9;
        } else if (temp_unit === "3") {
          temp = temp - 273.15;
        }

        if (temp < -45) {
          result.error =
            "Temperature should be greater than or equal to -45 °C (-49 °F)";
          return result;
        }

        let afun = Math.log(hum / 100) + (a * temp) / (b + temp);
        let dp = (b * afun) / (a - afun);

        result.tech_dew = dp;
      } else {
        result.error = "Please fill all fields.";
      }
    } else if (to_cal === "2") {
      if (!isNaN(dew) && !isNaN(temp)) {
        if (temp_unit === "2") {
          temp = ((temp - 32) * 5) / 9;
        } else if (temp_unit === "3") {
          temp = temp - 273.15;
        }
        if (dew_unit === "2") {
          dew = ((dew - 32) * 5) / 9;
        } else if (dew_unit === "3") {
          dew = dew - 273.15;
        }

        if (temp < -45 || dew < -45) {
          result.error =
            "Temperature should be greater than or equal to -45 °C (-49 °F)";
          return result;
        }

        let rh_numer = 100.0 * Math.exp((a * dew) / (dew + b));
        let rh_denom = Math.exp((a * temp) / (temp + b));
        hum = rh_numer / rh_denom;

        result.tech_hum = hum;
      } else {
        result.error = "Please fill all fields.";
      }
    } else if (to_cal === "3") {
      if (!isNaN(hum) && !isNaN(dew)) {
        if (dew_unit === "2") {
          dew = ((dew - 32) * 5) / 9;
        } else if (dew_unit === "3") {
          dew = dew - 273.15;
        }
        if (dew < -45) {
          result.error =
            "Temperature should be greater than or equal to -45 °C (-49 °F)";
          return result;
        }

        let gamma = (a * dew) / (b + dew);
        let temp_numer = b * (gamma - Math.log(hum / 100));
        let temp_denom = a + Math.log(hum / 100) - gamma;
        temp = temp_numer / temp_denom;

        result.tech_temp = temp;
      } else {
        result.error = "Please fill all fields.";
      }
    }

    return result;
  }

  /** getCalculationWetBulbcalculator
   * POST: /api/calculators-lol/wet-bulb-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationWetBulbcalculator(body) {
    let temp = parseFloat(body.tech_temp);
    let temp_unit = body.tech_temp_unit;
    let temp1 = parseFloat(body.tech_temp1);
    let temp1_unit = body.tech_temp1_unit;
    let hum = parseFloat(body.tech_hum);

    let result = {};

    // Convert units to °C
    if (temp_unit == "°C") {
      temp_unit = 1;
    } else if (temp_unit == "°F") {
      temp_unit = 2;
    } else if (temp_unit == "K") {
      temp_unit = 3;
    }

    if (temp1_unit == "°C") {
      temp1_unit = 1;
    } else if (temp1_unit == "°F") {
      temp1_unit = 2;
    } else if (temp1_unit == "K") {
      temp1_unit = 3;
    }

    if (!isNaN(temp) && !isNaN(hum)) {
      if (temp_unit == "2") {
        temp = ((temp - 32) * 5) / 9;
      } else if (temp_unit == "3") {
        temp = temp - 273.15;
      }

      if (temp < -20 || temp > 50) {
        result.error =
          "This calculator only works for temperatures between -20 °C and 50 °C.";
        return result;
      }

      let ans =
        temp * Math.atan(0.151977 * Math.sqrt(hum + 8.313659)) +
        Math.atan(temp + hum) -
        Math.atan(hum - 1.676331) +
        0.00391838 * Math.pow(hum, 1.5) * Math.atan(0.023101 * hum) -
        4.686035;

      let indoor = 0.7 * ans + 0.3 * temp;
      result.tech_ans = ans;
      result.tech_indoor = indoor;

      if (!isNaN(temp1)) {
        if (temp1_unit === "2") {
          temp1 = ((temp1 - 32) * 5) / 9;
        } else if (temp1_unit === "3") {
          temp1 = temp1 - 273.15;
        }

        let outdoor = 0.7 * ans + 0.2 * temp1 + 0.1 * temp;
        result.tech_outdoor = outdoor;
      }
    } else {
      result.error = "Please fill all fields.";
    }

    return result;
  }

  /** getCalculationPowerToWeightRatioCalculator
   * POST: /api/calculators-lol/power-to-weight-ratio-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationPowerToWeightRatioCalculator(body) {
    let power = body.tech_power;
    let power_unit = body.tech_power_unit;
    let weight = body.tech_weight;
    let weight_unit = body.tech_weight_unit;

    let convert, convert2;
    function convert_power(a, b) {
      if ((a = "w")) {
        convert = b * 0.001;
      } else if ((a = "kw")) {
        convert = b * 1;
      } else if ((a = "hpl")) {
        convert = b * 0.7457;
      } else if ((a = "hpm")) {
        convert = b * 0.7355;
      } else if ((a = "js")) {
        convert = b * 0.001;
      } else if ((a = "kjs")) {
        convert = b * 1;
      } else if ((a = "nms")) {
        convert = b * 0.001;
      }
      return convert;
    }
    function convert_weight(c, d) {
      if (c == "kg") {
        convert2 = d * 1;
      } else if ((c = "g")) {
        convert2 = d * 0.001;
      } else if ((c = "t")) {
        convert2 = d * 1000;
      } else if ((c = "lb")) {
        convert2 = d * 0.4536;
      } else if ((c = "oz")) {
        convert2 = d * 0.02835;
      } else if ((c = "us")) {
        convert2 = d * 907.2;
      } else if ((c = "long")) {
        convert2 = d * 1016;
      } else if ((c = "mg")) {
        convert2 = d * 0.000001;
      } else if (c == "gr") {
        convert2 = d * 0.00006479891;
      }
      return convert2;
    }

    let result = {};

    if (!isNaN(power) && !isNaN(weight)) {
      let powerValue = convert_power(power_unit, power);
      let weightValue = convert_weight(weight_unit, weight);
      let ratio = powerValue / weightValue;

      result.tech_answer = ratio;
    } else {
      result.error = "Please fill all fields.";
    }

    return result;
  }

  /**
   * getCalculationelTransformerCalculator: Service Method
   * POST: /api/calculators-lol/transformer-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationelTransformerCalculator(body) {
    let phase_unit = body.tech_phase_unit;
    let transformer_rating = body.tech_transformer_rating;
    let transformer_rating_unit = body.tech_transformer_rating_unit;
    let primary_transformer_voltage = body.tech_primary_transformer_voltage;
    let primary_transformer_unit = body.tech_primary_transformer_unit;
    let secondary_transformer_voltage = body.tech_secondary_transformer_voltage;
    let secondary_transformer_unit = body.tech_secondary_transformer_unit;
    let primary_current = body.tech_primary_current;
    let secondary_current = body.tech_secondary_current;
    let primary_winding = body.tech_primary_winding;
    let secondary_winding = body.tech_secondary_winding;
    let calculation_unit = body.tech_calculation_unit;
    let kva = body.tech_kva;
    let volts = body.tech_volts;
    let amperes = body.tech_amperes;
    let impedance = body.tech_impedance;
    let eddy_current = body.tech_eddy_current;
    let thickness = body.tech_thickness;
    let flux_density = body.tech_flux_density;
    let frequency = body.tech_frequency;
    let hysteresis_constant = body.tech_hysteresis_constant;
    let number_of_turns = body.tech_number_of_turns;

    const result = {};

    // Helper function to convert rating units to kVA
    function ratingUnit(unit, value) {
      if (unit == "VA") {
        return value / 1000;
      } else if (unit == "kVA") {
        return value * 1;
      } else if (unit == "MVA") {
        return value * 1000;
      }
      return value;
    }

    // Helper function to convert voltage units to Volts
    function transformerUnit(unit, value) {
      if (unit == "V") {
        return value * 1;
      } else if (unit == "kV") {
        return value * 1000;
      } else if (unit == "MV") {
        return value * 1000000;
      }
      return value;
    }

    // Calculation Unit 1: Find Secondary Voltage
    if (calculation_unit == "1") {
      if (
        isFinite(primary_winding) &&
        isFinite(secondary_winding) &&
        isFinite(primary_transformer_voltage)
      ) {
        const primary_voltage_value = transformerUnit(
          primary_transformer_unit,
          primary_transformer_voltage
        );
        const calculate_secondary_voltage =
          primary_transformer_voltage * (secondary_winding / primary_winding);
        result.tech_secondary_voltage = isNaN(calculate_secondary_voltage)
          ? "NaN"
          : calculate_secondary_voltage;
      } else {
        result.error = "Please fill all fields.";
        return result;
      }
    }
    // Calculation Unit 2: Find Primary Voltage
    else if (calculation_unit == "2") {
      if (
        isFinite(primary_winding) &&
        isFinite(secondary_winding) &&
        isFinite(secondary_transformer_voltage)
      ) {
        const secondary_voltage_value = transformerUnit(
          secondary_transformer_unit,
          secondary_transformer_voltage
        );
        const calculate_primary_voltage =
          secondary_voltage_value * (primary_winding / secondary_winding);
        result.tech_primary_voltage = isNaN(calculate_primary_voltage)
          ? "NaN"
          : calculate_primary_voltage;
      } else {
        result.error = "Please fill all fields.";
        return result;
      }
    }
    // Calculation Unit 3: Find Secondary Winding
    else if (calculation_unit == "3") {
      if (
        isFinite(primary_winding) &&
        isFinite(secondary_transformer_voltage) &&
        isFinite(primary_transformer_voltage)
      ) {
        const secondary_voltage_value = transformerUnit(
          secondary_transformer_unit,
          secondary_transformer_voltage
        );
        const primary_voltage_value = transformerUnit(
          primary_transformer_unit,
          primary_transformer_voltage
        );
        const calculate_secondary_winding =
          secondary_voltage_value * (primary_winding / primary_voltage_value);
        result.tech_secondary_winding = isNaN(calculate_secondary_winding)
          ? "NaN"
          : calculate_secondary_winding;
      } else {
        result.error = "Please fill all fields.";
        return result;
      }
    }
    // Calculation Unit 4: Find Primary Winding
    else if (calculation_unit == "4") {
      if (
        isFinite(secondary_winding) &&
        isFinite(secondary_transformer_voltage) &&
        isFinite(primary_transformer_voltage)
      ) {
        const secondary_voltage_value = transformerUnit(
          secondary_transformer_unit,
          secondary_transformer_voltage
        );
        const primary_voltage_value = transformerUnit(
          primary_transformer_unit,
          primary_transformer_voltage
        );
        const calculate_primary_winding =
          primary_voltage_value * (secondary_winding / secondary_voltage_value);
        result.tech_primary_winding = isNaN(calculate_primary_winding)
          ? "NaN"
          : calculate_primary_winding;
      } else {
        result.error = "Please fill all fields.";
        return result;
      }
    }
    // Calculation Unit 5: Secondary Current
    else if (calculation_unit == "5") {
      if (
        isFinite(primary_current) &&
        isFinite(primary_winding) &&
        isFinite(secondary_winding)
      ) {
        const calculate_secondary_current =
          primary_current * (primary_winding / secondary_winding);
        result.tech_secondary_current = isNaN(calculate_secondary_current)
          ? "NaN"
          : calculate_secondary_current;
      } else {
        result.error = "Please fill all fields.";
        return result;
      }
    }
    // Calculation Unit 6: Primary Current
    else if (calculation_unit == "6") {
      if (
        isFinite(secondary_current) &&
        isFinite(primary_winding) &&
        isFinite(secondary_winding)
      ) {
        const calculate_primary_current =
          (secondary_current * secondary_winding) / primary_winding;
        result.tech_primary_current = isNaN(calculate_primary_current)
          ? "NaN"
          : calculate_primary_current;
      } else {
        result.error = "Please fill all fields.";
        return result;
      }
    }
    // Calculation Unit 7: Secondary Winding
    else if (calculation_unit == "7") {
      if (
        isFinite(secondary_current) &&
        isFinite(primary_current) &&
        isFinite(primary_winding)
      ) {
        const calculate_secondary_winding =
          (primary_current * primary_winding) / secondary_current;
        result.tech_secondary_winding = isNaN(calculate_secondary_winding)
          ? "NaN"
          : calculate_secondary_winding;
      } else {
        result.error = "Please fill all fields.";
        return result;
      }
    }
    // Calculation Unit 8: Primary Winding
    else if (calculation_unit == "8") {
      if (
        isFinite(secondary_current) &&
        isFinite(primary_current) &&
        isFinite(secondary_winding)
      ) {
        const calculate_primary_winding =
          (secondary_current * secondary_winding) / primary_current;
        result.tech_primary_winding = isNaN(calculate_primary_winding)
          ? "NaN"
          : calculate_primary_winding;
      } else {
        result.error = "Please fill all fields.";
        return result;
      }
    }
    // Calculation Unit 9: Full Load Current and Turn Ratio
    else if (calculation_unit == "9") {
      if (
        isFinite(transformer_rating) &&
        isFinite(primary_transformer_voltage) &&
        isFinite(secondary_transformer_voltage) &&
        isFinite(impedance)
      ) {
        const transformer_rating_value = ratingUnit(
          transformer_rating_unit,
          transformer_rating
        );
        const primary_transformer_voltage_value = transformerUnit(
          primary_transformer_unit,
          primary_transformer_voltage
        );
        const secondary_transformer_voltage_value = transformerUnit(
          secondary_transformer_unit,
          secondary_transformer_voltage
        );

        let primary_full_load_current,
          secondary_full_load_current,
          turn_ratio,
          type,
          impedance_value;

        if (phase_unit == "1") {
          primary_full_load_current =
            (transformer_rating_value * 1000) /
            primary_transformer_voltage_value;
          secondary_full_load_current =
            (transformer_rating_value * 1000) /
            secondary_transformer_voltage_value;
          turn_ratio =
            primary_transformer_voltage_value /
            secondary_transformer_voltage_value;
          type = "Single Phase Step Up Transformer";

          if (impedance == 0) {
            impedance_value = "INF";
          } else {
            impedance_value = secondary_full_load_current / (impedance * 10);
          }
        } else if (phase_unit == "3") {
          primary_full_load_current =
            (transformer_rating_value * 1000) /
            (primary_transformer_voltage_value * 1.732);
          secondary_full_load_current =
            (transformer_rating_value * 1000) /
            (secondary_transformer_voltage_value * 1.732);
          turn_ratio =
            primary_transformer_voltage_value /
            secondary_transformer_voltage_value;
          type = "Three Phase Step Up Transformer";

          if (impedance == 0) {
            impedance_value = "INF";
          } else {
            impedance_value = secondary_full_load_current / (impedance * 10);
          }
        }

        result.tech_type = type;
        result.tech_impedance_value = isNaN(impedance_value)
          ? "NaN"
          : impedance_value;
        result.tech_primary_full_load_current = isNaN(primary_full_load_current)
          ? "NaN"
          : primary_full_load_current;
        result.tech_secondary_full_load_current = isNaN(
          secondary_full_load_current
        )
          ? "NaN"
          : secondary_full_load_current;
        result.tech_turn_ratio = isNaN(turn_ratio) ? "NaN" : turn_ratio;
      } else {
        result.error = "Please fill all fields.";
        return result;
      }
    }
    // Calculation Unit 10: Calculate Amperes
    else if (calculation_unit == "10") {
      if (isFinite(volts) && isFinite(kva)) {
        let calculate_amps;
        if (phase_unit == "1") {
          calculate_amps = (kva / volts) * 1000;
        } else if (phase_unit == "3") {
          calculate_amps = (kva / volts / 1.732) * 1000;
        }
        result.tech_calculate_amps = isNaN(calculate_amps)
          ? "NaN"
          : calculate_amps;
      } else {
        result.error = "Please fill all fields.";
        return result;
      }
    }
    // Calculation Unit 11: Calculate KVA
    else if (calculation_unit == "11") {
      if (isFinite(volts) && isFinite(amperes)) {
        let calculate_kva;
        if (phase_unit == "1") {
          calculate_kva = (volts * amperes) / 1000;
        } else if (phase_unit == "3") {
          calculate_kva = (volts * amperes * 1.732) / 1000;
        }
        result.tech_calculate_kva = isNaN(calculate_kva)
          ? "NaN"
          : calculate_kva;
      } else {
        result.error = "Please fill all fields.";
        return result;
      }
    }
    // Calculation Unit 12: Calculate Volts
    else if (calculation_unit == "12") {
      if (isFinite(kva) && isFinite(amperes)) {
        let calculate_volts;
        if (phase_unit == "1") {
          calculate_volts = kva / (amperes / 1000);
        } else if (phase_unit == "3") {
          calculate_volts = kva / ((amperes * 1.732) / 1000);
        }
        result.tech_calculate_volts = isNaN(calculate_volts)
          ? "NaN"
          : calculate_volts;
      } else {
        result.error = "Please fill all fields.";
        return result;
      }
    }
    // Calculation Unit 13: Copper Loss, Eddy Current Loss, and Hysteresis Loss
    else if (calculation_unit == "13") {
      if (
        isFinite(primary_current) &&
        isFinite(secondary_current) &&
        isFinite(primary_winding) &&
        isFinite(secondary_winding) &&
        isFinite(eddy_current) &&
        isFinite(thickness) &&
        isFinite(flux_density) &&
        isFinite(frequency) &&
        isFinite(hysteresis_constant)
      ) {
        const total_copper =
          primary_current * primary_current * primary_winding +
          secondary_current * secondary_current * secondary_winding;
        const eddy_current_loss =
          eddy_current *
          (thickness * thickness) *
          (flux_density * flux_density * (frequency * frequency));
        const hysteresis_loss =
          hysteresis_constant * frequency * Math.pow(flux_density, 1.6);

        result.tech_total_copper = isNaN(total_copper) ? "NaN" : total_copper;
        result.tech_eddy_current_loss = isNaN(eddy_current_loss)
          ? "NaN"
          : eddy_current_loss;
        result.tech_hysteresis_loss = isNaN(hysteresis_loss)
          ? "NaN"
          : hysteresis_loss;
      } else {
        result.error = "Please fill all fields.";
        return result;
      }
    }
    // Calculation Unit 14: RMS Value
    else if (calculation_unit == "14") {
      if (
        isFinite(frequency) &&
        isFinite(number_of_turns) &&
        isFinite(flux_density)
      ) {
        const rms_value = 4.44 * frequency * number_of_turns * flux_density;
        result.tech_rms = isNaN(rms_value) ? "NaN" : rms_value;
      } else {
        result.error = "Please fill all fields.";
        return result;
      }
    }

    return result;
  }

  /**
   * getCalculationelSpeedDistanceTimeCalculator: Service Method
   * POST: /api/calculators-lol/speed-distance-time-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationelSpeedDistanceTimeCalculator(body) {
    let operations = body.tech_operations;
    let first = body.tech_first;
    let second = body.tech_second;
    let third = body.tech_third;
    let f_unit = body.tech_f_unit;
    let s_unit = body.tech_s_unit;
    let t_unit = body.tech_t_unit;

    const result = {};

    // Helper function to convert distance to meters
    function distance(value, unit) {
      if (unit == "inch") {
        return value / 39.37;
      } else if (unit == "foot") {
        return value / 3.281;
      } else if (unit == "yard") {
        return value / 1.094;
      } else if (unit == "mile") {
        return value * 1609;
      } else if (unit == "centimeter") {
        return value / 100;
      } else if (unit == "meter") {
        return value * 1;
      } else if (unit == "kilometer") {
        return value * 1000;
      } else if (unit == "nautical mile") {
        return value * 1852;
      }
      return value;
    }

    // Helper function to convert time to seconds
    function time2(value, unit) {
      if (unit == "year") {
        return value * 31540000;
      } else if (unit == "day") {
        return value * 86400;
      } else if (unit == "hour") {
        return value * 3600;
      } else if (unit == "minute") {
        return value * 60;
      } else if (unit == "second") {
        return value * 1;
      }
      return value;
    }

    // Helper function to convert speed to meters per second
    function speed(value, unit) {
      if (unit == "inch per second") {
        return value / 39.37;
      } else if (unit == "inch per minute") {
        return value * 0.000423333;
      } else if (unit == "foot per second") {
        return value * 0.3048;
      } else if (unit == "foot per minute") {
        return value * 0.00508;
      } else if (unit == "foot per hour") {
        return value * 0.0000846667;
      } else if (unit == "yard per second") {
        return value * 0.9144;
      } else if (unit == "yard per minute") {
        return value * 0.01524;
      } else if (unit == "yard per hour") {
        return value * 0.000254;
      } else if (unit == "centimeter per second") {
        return value * 0.01;
      } else if (unit == "centimeter per minute") {
        return value * 0.0001667;
      } else if (unit == "meter per second") {
        return value * 1;
      } else if (unit == "meter per minute") {
        return value * 0.01667;
      } else if (unit == "meter per hour") {
        return value * 0.0002777778;
      } else if (unit == "mile per second") {
        return value * 1609.344;
      } else if (unit == "mile per minute") {
        return value * 26.8224;
      } else if (unit == "mile per hour") {
        return value * 0.44704;
      } else if (unit == "kilometer per second") {
        return value * 1000;
      } else if (unit == "kilometer per hour") {
        return value * 0.2777778;
      } else if (unit == "knot (nautical mi/h)") {
        return value * 0.5144444;
      }
      return value;
    }

    // Operation 3: Calculate Speed (Distance / Time)
    if (operations == "3") {
      if (t_unit == "hhmmss") {
        if (isFinite(second) && third) {
          const firstConverted = speed(first, f_unit);
          const secondConverted = distance(second, s_unit);

          if (third !== 0) {
            const pace = third.split(":");
            let pace_check = true;

            for (const value of pace) {
              if (!isFinite(parseFloat(value))) {
                pace_check = false;
                break;
              }
            }

            if (pace_check == false) {
              result.error = "Please fill all fields.";
              return result;
            } else if (pace_check == true) {
              let tsec = 0;

              if (pace.length === 3) {
                const hour = parseFloat(pace[0]);
                const min = parseFloat(pace[1]);
                const sec = parseFloat(pace[2]);
                tsec = hour * 60 * 60 + min * 60 + sec;
              } else if (pace.length === 2) {
                const min = parseFloat(pace[0]);
                const sec = parseFloat(pace[1]);
                tsec = min * 60 + sec;
              } else if (pace.length === 1) {
                const sec = parseFloat(pace[0]);
                tsec = sec;
              }

              const answer = secondConverted / tsec;
              const select = operations;

              result.tech_answer = isNaN(answer) ? "NaN" : answer;
              result.tech_select = select;
            }
          } else {
            result.error = "Time cannot be 0.";
            return result;
          }
        } else {
          result.error = "Please fill all fields.";
          return result;
        }
      } else {
        if (isFinite(second) && isFinite(third)) {
          const firstConverted = speed(first, f_unit);
          const secondConverted = distance(second, s_unit);
          const thirdConverted = time2(third, t_unit);

          if (thirdConverted != 0) {
            const answer = secondConverted / thirdConverted;
            const select = operations;

            result.tech_answer = isNaN(answer) ? "NaN" : answer;
            result.tech_select = select;
          } else {
            result.error = "Time cannot be 0.";
            return result;
          }
        } else {
          result.error = "Please check your input";
          return result;
        }
      }
    }
    // Operation 4: Calculate Distance (Speed * Time)
    else if (operations == "4") {
      if (isFinite(first) && isFinite(third)) {
        const firstConverted = speed(first, f_unit);
        const thirdConverted = time2(third, t_unit);
        const answer = firstConverted * thirdConverted;
        const select = operations;

        result.tech_answer = isNaN(answer) ? "NaN" : answer;
        result.tech_select = select;
      } else {
        result.error = "Please check your input";
        return result;
      }
    }
    // Operation 5: Calculate Time (Distance / Speed)
    else if (operations == "5") {
      if (isFinite(first) && isFinite(second)) {
        const firstConverted = speed(first, f_unit);
        const secondConverted = distance(second, s_unit);

        if (firstConverted != 0) {
          const answer = secondConverted / firstConverted;
          const clock = Math.round(answer);

          const hours = Math.floor(clock / 3600);
          const min = Math.floor((clock / 60) % 60);
          const sec = clock % 60;

          const time_show = `${String(hours).padStart(2, "0")}:${String(
            min
          ).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
          const hoursStr = String(hours).padStart(2, "0");
          const minStr = String(min).padStart(2, "0");
          const secStr = String(sec).padStart(2, "0");
          const select = operations;

          result.tech_answer = isNaN(answer) ? "NaN" : answer;
          result.tech_select = select;
          result.tech_time_show = time_show;
          result.tech_hours = hoursStr;
          result.tech_min = minStr;
          result.tech_sec = secStr;
        } else {
          result.error = "Please check your input";
          return result;
        }
      } else {
        result.error = "Please! check your input.";
        return result;
      }
    }

    return result;
  }
  /** getCalculationConstantOfProportionalityCalculator
   * POST: /api/calculators-lol/constant-of-proportionality-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationConstantOfProportionalityCalculator(body) {
    let y = typeof body.tech_y === "string" ? body.tech_y.trim() : body.tech_y;
    let x = typeof body.tech_x === "string" ? body.tech_x.trim() : body.tech_x;

    let result = {};

    if (!isNaN(y) && !isNaN(x)) {
      let answer = parseFloat(y) / parseFloat(x);
      result.tech_ans = parseFloat(answer.toFixed(5));
      result.tech_x = x;
      result.tech_y = y;
    } else {
      result.error = "Please fill all fields.";
    }

    return result;
  }

  /**
   * getCalculationelVectorProjectionCalculator: Service Method
   * POST: /api/calculators-lol/vector-projection-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationelVectorProjectionCalculator(body) {
    let ax = body.tech_ax;
    let ay = body.tech_ay;
    let az = body.tech_az;
    let bx = body.tech_bx;
    let by = body.tech_by;
    let bz = body.tech_bz;
    let dem = body.tech_dem;
    let vector_representation = body.tech_vector_representation;
    let vector_b = body.tech_vector_b;
    let first_aa = body["tech_1aa"];
    let second_aa = body["tech_2aa"];
    let third_aa = body["tech_3aa"];
    let first_bb = body["tech_1bb"];
    let second_bb = body["tech_2bb"];
    let third_bb = body["tech_3bb"];
    let first_a = body["tech_1a"];
    let second_a = body["tech_2a"];
    let third_a = body["tech_3a"];
    let first_b = body["tech_1b"];
    let second_b = body["tech_2b"];
    let third_b = body["tech_3b"];

    const result = {};

    // Helper function to calculate GCD
    function gcd(a, b) {
      a = Math.abs(a);
      b = Math.abs(b);

      if (a < b) {
        [a, b] = [b, a];
      }
      if (b === 0) {
        return 1;
      }
      let r = a % b;
      while (r > 0) {
        a = b;
        b = r;
        r = a % b;
      }
      return b;
    }

    // Helper function to reduce fraction
    function reduce(num, den) {
      const g = gcd(num, den);
      return [num / g, den / g];
    }

    // Global function to simplify vector fractions
    function globalFunction(vector_unit, vector_u) {
      const g = gcd(vector_unit, vector_u);
      const [upr, btm] = reduce(vector_unit, vector_u);
      return [upr, btm];
    }

    // 3D Vector Calculations
    if (dem === "3") {
      // Case 1: Coordinate & Coordinate (3D)
      if (vector_representation === "coor" && vector_b === "coor") {
        if (
          isFinite(ax) &&
          isFinite(ay) &&
          isFinite(az) &&
          isFinite(bx) &&
          isFinite(by) &&
          isFinite(bz)
        ) {
          const vector_unit = ax * bx + ay * by + az * bz;
          const vector_u = bx * bx + by * by + bz * bz;

          let first_vector = vector_unit;
          let second_vector = vector_u;
          let call0, call1;

          if (
            Math.ceil(Math.sqrt(vector_u)) === Math.floor(Math.sqrt(vector_u))
          ) {
            first_vector = vector_unit;
            second_vector = vector_u;
          } else {
            first_vector = vector_unit;
            second_vector = vector_u;
            const calling = globalFunction(vector_unit, vector_u);
            call0 = calling[0];
            call1 = calling[1];
          }

          result.tech_vector_representation = vector_representation;
          result.tech_vector_b = vector_b;
          result.tech_vector_unit = first_vector;
          result.tech_vector_u = second_vector;
          result.tech_ax = bx;
          result.tech_ay = by;
          result.tech_az = bz;
          result.tech_f1 = ax;
          result.tech_f2 = ay;
          result.tech_f3 = az;
          result.tech_call0 = call0;
          result.tech_call1 = call1;
          result.tech_dem = dem;
          return result;
        }
      }
      // Case 2: Coordinate & Point (3D)
      else if (vector_representation === "coor" && vector_b === "point") {
        if (
          isFinite(first_aa) &&
          isFinite(second_aa) &&
          isFinite(third_aa) &&
          isFinite(first_bb) &&
          isFinite(second_bb) &&
          isFinite(third_bb) &&
          isFinite(ax) &&
          isFinite(ay) &&
          isFinite(az)
        ) {
          const bxCalc = first_bb - first_aa;
          const byCalc = second_bb - second_aa;
          const bzCalc = third_bb - third_aa;

          const vector_unit = ax * bxCalc + ay * byCalc + az * bzCalc;
          const vector_u = bxCalc * bxCalc + byCalc * byCalc + bzCalc * bzCalc;

          let first_vector = vector_unit;
          let second_vector = vector_u;
          let call0, call1;

          if (
            Math.ceil(Math.sqrt(vector_u)) === Math.floor(Math.sqrt(vector_u))
          ) {
            first_vector = vector_unit;
            second_vector = vector_u;
          } else {
            first_vector = vector_unit;
            second_vector = vector_u;
            const calling = globalFunction(vector_unit, vector_u);
            call0 = calling[0];
            call1 = calling[1];
          }

          result.tech_vector_representation = vector_representation;
          result.tech_vector_b = vector_b;
          result.tech_vector_unit = first_vector;
          result.tech_vector_u = second_vector;
          result.tech_ax = bxCalc;
          result.tech_ay = byCalc;
          result.tech_az = bzCalc;
          result.tech_f1 = ax;
          result.tech_f2 = ay;
          result.tech_f3 = az;
          result.tech_call0 = call0;
          result.tech_call1 = call1;
          result.tech_first_aa = first_aa;
          result.tech_second_aa = second_aa;
          result.tech_third_aa = third_aa;
          result.tech_first_bb = first_bb;
          result.tech_second_bb = second_bb;
          result.tech_third_bb = third_bb;
          result.tech_dem = dem;
          return result;
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      }
      // Case 3: Point & Coordinate (3D)
      else if (vector_representation === "point" && vector_b === "coor") {
        if (
          isFinite(first_a) &&
          isFinite(second_a) &&
          isFinite(third_a) &&
          isFinite(first_b) &&
          isFinite(second_b) &&
          isFinite(third_b) &&
          isFinite(bx) &&
          isFinite(by) &&
          isFinite(bz)
        ) {
          const cx = first_b - first_a;
          const cy = second_b - second_a;
          const cz = third_b - third_a;

          const vector_unit = bx * cx + by * cy + cz * bz;
          const vector_u = bx * bx + by * by + bz * bz;

          let first_vector = vector_unit;
          let second_vector = vector_u;
          let call0, call1;

          if (
            Math.ceil(Math.sqrt(vector_u)) === Math.floor(Math.sqrt(vector_u))
          ) {
            first_vector = vector_unit;
            second_vector = vector_u;
          } else {
            first_vector = vector_unit;
            second_vector = vector_u;
            const calling = globalFunction(vector_unit, vector_u);
            call0 = calling[0];
            call1 = calling[1];
          }

          result.tech_vector_representation = vector_representation;
          result.tech_vector_b = vector_b;
          result.tech_vector_unit = first_vector;
          result.tech_vector_u = second_vector;
          result.tech_ax = cx;
          result.tech_ay = cy;
          result.tech_az = cz;
          result.tech_bx = bx;
          result.tech_by = by;
          result.tech_bz = bz;
          result.tech_dem = dem;
          result.tech_call0 = call0;
          result.tech_call1 = call1;
          return result;
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      }
      // Case 4: Point & Point (3D)
      else if (vector_representation === "point" && vector_b === "point") {
        if (
          isFinite(first_a) &&
          isFinite(second_a) &&
          isFinite(third_a) &&
          isFinite(first_b) &&
          isFinite(second_b) &&
          isFinite(third_b) &&
          isFinite(first_aa) &&
          isFinite(second_aa) &&
          isFinite(third_aa) &&
          isFinite(first_bb) &&
          isFinite(second_bb) &&
          isFinite(third_bb)
        ) {
          const cx = first_b - first_a;
          const cy = second_b - second_a;
          const cz = third_b - third_a;
          const dx = first_bb - first_aa;
          const dy = second_bb - second_aa;
          const dz = third_bb - third_aa;

          const vector_unit = dx * cx + dy * cy + dz * cz;
          const vector_u = dx * dx + dy * dy + dz * dz;

          let first_vector = vector_unit;
          let second_vector = vector_u;
          let call0, call1;

          if (
            Math.ceil(Math.sqrt(vector_u)) === Math.floor(Math.sqrt(vector_u))
          ) {
            first_vector = vector_unit;
            second_vector = vector_u;
          } else {
            first_vector = vector_unit;
            second_vector = vector_u;
            const calling = globalFunction(vector_unit, vector_u);
            call0 = calling[0];
            call1 = calling[1];
          }

          result.tech_vector_representation = vector_representation;
          result.tech_vector_b = vector_b;
          result.tech_vector_unit = first_vector;
          result.tech_vector_u = second_vector;
          result.tech_ax = cx;
          result.tech_ay = cy;
          result.tech_az = cz;
          result.tech_ex = dx;
          result.tech_ey = dy;
          result.tech_ez = dz;
          result.tech_call0 = call0;
          result.tech_call1 = call1;
          result.tech_dem = dem;
          return result;
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      }
    }
    // 2D Vector Calculations
    else if (dem == "2") {
      // Case 1: Coordinate & Coordinate (2D)
      if (vector_representation == "coor" && vector_b == "coor") {
        if (isFinite(ax) && isFinite(ay) && isFinite(bx) && isFinite(by)) {
          const vector_unit = ax * bx + ay * by;
          const vector_u = bx * bx + by * by;

          let first_vector = vector_unit;
          let second_vector = vector_u;
          let call0, call1;

          if (
            Math.ceil(Math.sqrt(vector_u)) === Math.floor(Math.sqrt(vector_u))
          ) {
            first_vector = vector_unit;
            second_vector = vector_u;
          } else {
            first_vector = vector_unit;
            second_vector = vector_u;
            const calling = globalFunction(vector_unit, vector_u);
            call0 = calling[0];
            call1 = calling[1];
          }

          result.tech_vector_representation = vector_representation;
          result.tech_vector_b = vector_b;
          result.tech_vector_unit = first_vector;
          result.tech_vector_u = second_vector;
          result.tech_ax = bx;
          result.tech_ay = by;
          result.tech_bx = ax;
          result.tech_by = ay;
          result.tech_dem = dem;
          result.tech_call0 = call0;
          result.tech_call1 = call1;
          return result;
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      }
      // Case 2: Coordinate & Point (2D)
      else if (vector_representation == "coor" && vector_b == "point") {
        if (
          isFinite(first_aa) &&
          isFinite(second_aa) &&
          isFinite(first_bb) &&
          isFinite(second_bb) &&
          isFinite(ax) &&
          isFinite(ay)
        ) {
          const bxCalc = first_bb - first_aa;
          const byCalc = second_bb - second_aa;

          const vector_unit = ax * bxCalc + ay * byCalc;
          const vector_u = bxCalc * bxCalc + byCalc * byCalc;

          let first_vector = vector_unit;
          let second_vector = vector_u;
          let call0, call1;

          if (
            Math.ceil(Math.sqrt(vector_u)) === Math.floor(Math.sqrt(vector_u))
          ) {
            first_vector = vector_unit;
            second_vector = vector_u;
          } else {
            first_vector = vector_unit;
            second_vector = vector_u;
            const calling = globalFunction(vector_unit, vector_u);
            call0 = calling[0];
            call1 = calling[1];
          }

          result.tech_vector_representation = vector_representation;
          result.tech_vector_b = vector_b;
          result.tech_vector_unit = first_vector;
          result.tech_vector_u = second_vector;
          result.tech_ax = bxCalc;
          result.tech_ay = byCalc;
          result.tech_ex = ax;
          result.tech_ey = ay;
          result.tech_dem = dem;
          result.tech_call0 = call0;
          result.tech_call1 = call1;
          return result;
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      }
      // Case 3: Point & Coordinate (2D)
      else if (vector_representation == "point" && vector_b == "coor") {
        if (
          isFinite(first_a) &&
          isFinite(second_a) &&
          isFinite(first_b) &&
          isFinite(second_b) &&
          isFinite(bx) &&
          isFinite(by)
        ) {
          const cx = first_b - first_a;
          const cy = second_b - second_a;

          const vector_unit = bx * cx + by * cy;
          const vector_u = bx * bx + by * by;

          let first_vector = vector_unit;
          let second_vector = vector_u;
          let call0, call1;

          if (
            Math.ceil(Math.sqrt(vector_u)) === Math.floor(Math.sqrt(vector_u))
          ) {
            first_vector = vector_unit;
            second_vector = vector_u;
          } else {
            first_vector = vector_unit;
            second_vector = vector_u;
            const calling = globalFunction(vector_unit, vector_u);
            call0 = calling[0];
            call1 = calling[1];
          }

          result.tech_vector_representation = vector_representation;
          result.tech_vector_b = vector_b;
          result.tech_vector_unit = first_vector;
          result.tech_vector_u = second_vector;
          result.tech_ax = bx;
          result.tech_ay = by;
          result.tech_cx = cx;
          result.tech_cy = cy;
          result.tech_dem = dem;
          result.tech_call0 = call0;
          result.tech_call1 = call1;
          return result;
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      }
      // Case 4: Point & Point (2D)
      else if (vector_representation === "point" && vector_b === "point") {
        if (
          isFinite(first_a) &&
          isFinite(second_a) &&
          isFinite(first_b) &&
          isFinite(second_b) &&
          isFinite(first_aa) &&
          isFinite(second_aa) &&
          isFinite(first_bb) &&
          isFinite(second_bb)
        ) {
          const cx = first_b - first_a;
          const cy = second_b - second_a;
          const dx = first_bb - first_aa;
          const dy = second_bb - second_aa;

          const vector_unit = dx * cx + dy * cy;
          const vector_u = dx * dx + dy * dy;

          let first_vector = vector_unit;
          let second_vector = vector_u;
          let call0, call1;

          if (
            Math.ceil(Math.sqrt(vector_u)) === Math.floor(Math.sqrt(vector_u))
          ) {
            first_vector = vector_unit;
            second_vector = vector_u;
          } else {
            first_vector = vector_unit;
            second_vector = vector_u;
            const calling = globalFunction(vector_unit, vector_u);
            call0 = calling[0];
            call1 = calling[1];
          }

          result.tech_vector_representation = vector_representation;
          result.tech_vector_b = vector_b;
          result.tech_vector_unit = first_vector;
          result.tech_vector_u = second_vector;
          result.tech_ax = cx;
          result.tech_ay = cy;
          result.tech_dx = dx;
          result.tech_dy = dy;
          result.tech_dem = dem;
          result.tech_call0 = call0;
          result.tech_call1 = call1;
          return result;
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      }
    }

    return result;
  }

  /**
   * getCalculationelVoltageDropCalculator: Service Method
   * POST: /api/calculators-lol/voltage-drop-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationelVoltageDropCalculator(body) {
    let phase_unit = body.tech_phase_unit;
    let wire_material_unit = body.tech_wire_material_unit;
    let wire_size_unit = body.tech_wire_size_unit;
    let wire_length = body.tech_wire_length;
    let wire_length_unit = body.tech_wire_length_unit;
    let load_current = body.tech_load_current;
    let conductors = body.tech_conductors;
    let voltage = body.tech_voltage;
    let calculate_unit = body.tech_calculate_unit;
    let power_voltage = body.tech_power_voltage;
    let wire_resistance = body.tech_wire_resistance;
    let wire_resistance_unit = body.tech_wire_resistance_unit;
    let wire_diameter_size_unit = body.tech_wire_diameter_size_unit;
    let wire_diameter_size = body.tech_wire_diameter_size;
    let cable_length = body.tech_cable_length;
    let cable_length_unit = body.tech_cable_length_unit;
    let load_current_unit = body.tech_load_current_unit;
    let resistivity = body.tech_resistivity;
    let wire_material_unit_two = body.tech_wire_material_unit_two;
    let gauge = body.tech_gauge;
    let find_unit = body.tech_find_unit;
    let max_voltage_drop = body.tech_max_voltage_drop;
    let voltage_unit = body.tech_voltage_unit;
    let raceway = body.tech_raceway;
    let insulation = body.tech_insulation;

    // Arrays
    const amps60 = [
      15, 20, 30, 40, 55, 70, 85, 95, 110, 125, 145, 165, 195, 215, 240, 260,
      280, 320, 355, 385, 400, 410, 435, 455, 495, 520, 545, 560,
    ];
    const amps75 = [
      20, 25, 35, 50, 65, 85, 100, 115, 130, 150, 175, 200, 230, 255, 285, 310,
      335, 380, 420, 460, 475, 490, 520, 545, 590, 625, 650, 665,
    ];
    const amps90 = [
      25, 30, 40, 55, 75, 95, 115, 130, 145, 170, 195, 225, 260, 290, 320, 350,
      380, 430, 475, 520, 535, 555, 585, 615, 665, 705, 735, 750,
    ];
    const amps60al = [
      0, 20, 25, 30, 40, 55, 65, 75, 85, 100, 115, 130, 150, 170, 190, 210, 225,
      260, 285, 310, 320, 330, 355, 375, 405, 435, 455, 470,
    ];
    const amps75al = [
      0, 20, 30, 40, 50, 65, 75, 90, 100, 120, 135, 155, 180, 205, 230, 250,
      270, 310, 340, 375, 385, 395, 425, 445, 485, 520, 545, 560,
    ];
    const amps90al = [
      0, 25, 35, 45, 60, 75, 85, 100, 115, 135, 150, 175, 205, 230, 255, 280,
      305, 350, 385, 420, 435, 450, 480, 500, 545, 585, 615, 630,
    ];
    const fa60 = [
      25, 30, 40, 60, 80, 105, 120, 140, 165, 195, 225, 260, 300, 340, 375, 420,
      455, 515, 575, 630, 655, 680, 730, 780, 890, 980, 1070, 1155,
    ];
    const fa75 = [
      30, 35, 50, 70, 95, 125, 145, 170, 195, 230, 265, 310, 360, 405, 445, 505,
      545, 620, 690, 755, 785, 815, 870, 935, 1065, 1175, 1280, 1385,
    ];
    const fa90 = [
      35, 40, 55, 80, 105, 140, 165, 190, 220, 260, 300, 350, 405, 455, 505,
      570, 615, 700, 780, 855, 885, 920, 985, 1055, 1200, 1325, 1445, 1560,
    ];
    const fa60al = [
      0, 25, 35, 45, 60, 80, 95, 110, 130, 150, 175, 200, 235, 265, 290, 330,
      355, 405, 455, 500, 515, 535, 580, 625, 710, 795, 875, 960,
    ];
    const fa75al = [
      0, 30, 40, 55, 75, 100, 115, 135, 155, 180, 210, 240, 280, 315, 350, 395,
      425, 485, 540, 595, 620, 645, 700, 750, 855, 950, 1050, 1150,
    ];
    const fa90al = [
      0, 35, 40, 60, 80, 110, 130, 150, 175, 205, 235, 275, 315, 355, 395, 445,
      480, 545, 615, 675, 700, 725, 785, 845, 960, 1075, 1185, 1335,
    ];
    const kcmil = [
      4110, 6530, 10380, 16510, 26240, 41740, 52620, 66360, 83690, 105600,
      133100, 167800, 211600, 250000, 300000, 350000, 400000, 500000, 600000,
      700000, 750000, 800000, 900000, 1000000, 1250000, 1500000, 1750000,
      2000000,
    ];
    const wires = [
      "14 AWG",
      "12 AWG",
      "10 AWG",
      "8 AWG",
      "6 AWG",
      "4 AWG",
      "3 AWG",
      "2 AWG",
      "1 AWG",
      "1/0 AWG",
      "2/0 AWG",
      "3/0 AWG",
      "4/0 AWG",
      "250 kcmil",
      "300 kcmil",
      "350 kcmil",
      "400 kcmil",
      "500 kcmil",
      "600 kcmil",
      "700 kcmil",
      "750 kcmil",
      "800 kcmil",
      "900 kcmil",
      "1000 kcmil",
      "1250 kcmil",
      "1500 kcmil",
      "1750 kcmil",
      "2000 kcmil",
    ];

    let ans60 = 0;
    let ans75 = 0;
    let ans90 = 0;
    let sizevd = 0;
    let sizevs = 0;
    let vd = 0;
    let vdp = 0;

    const result = {};

    // Helper functions
    function convert_voltage(c, d) {
      if (c == "volts") {
        return d * 1;
      } else if (c == "kilovolts") {
        return d * 0.001;
      }
      return d;
    }

    function convert_impedance(c, d) {
      let convert8;
      if (c == "km") {
        convert8 = 3280.839895;
      } else if (c == "m") {
        convert8 = d * 3.28084;
      } else if (c == "tft") {
        convert8 = 1000;
      } else if (c == "hft") {
        convert8 = d * 0.001;
      } else if (c == "mqm") {
        convert8 = d * 3280839.895;
      } else if (c == "mft") {
        convert8 = d * 1000000;
      }
      return convert8;
    }

    function calculates(a, b) {
      let convert1;
      if (a == "in") {
        convert1 = b * 0.0833333;
      } else if (a == "ft") {
        convert1 = b * 1;
      } else if (a == "yd") {
        convert1 = b * 3;
      } else if (a == "mm") {
        convert1 = b * 0.00328084;
      } else if (a == "cm") {
        convert1 = b * 0.0328084;
      } else if (a == "m") {
        convert1 = b * 3.28084;
      }
      return convert1;
    }

    function convert_current(c, d, phase_current, voltage) {
      let converting;

      if (phase_current == "1") {
        // DC
        if (c == "am") {
          converting = d * 1;
        } else if (c == "mi") {
          converting = d * 0.001;
        } else if (c == "wa") {
          converting = d / voltage;
        } else if (c == "kva") {
          converting = (d * 1000) / voltage;
        } else if (c == "kW") {
          converting = (d * 1000) / voltage;
        } else if (c == "hp") {
          converting = 746 / (voltage * (95 * 100));
        }
      } else if (phase_current == "2") {
        // AC Single Phase
        if (c == "am") {
          converting = d * 1;
        } else if (c == "mi") {
          converting = d * 0.001;
        } else if (c == "wa") {
          converting = d / voltage;
        } else if (c == "kva") {
          converting = (d * 1000) / voltage;
        } else if (c == "kW") {
          converting = (d * 1000) / voltage;
        } else if (c == "hp") {
          converting = 746 / (voltage * (95 * 100));
        }
      } else if (phase_current == "3") {
        // AC Three Phase
        if (c == "am") {
          converting = d * 1;
        } else if (c == "mi") {
          converting = d * 0.001;
        } else if (c == "wa") {
          converting = d / voltage;
        } else if (c == "kva") {
          converting = (d * 1000) / (Math.sqrt(3) * voltage);
        } else if (c == "kW") {
          converting = (d * 1000) / (Math.sqrt(3) * voltage);
        } else if (c == "hp") {
          converting = 746 / (Math.sqrt(3) * voltage * (95 * 100));
        }
      }

      return converting;
    }

    // Main calculation logic
    if (calculate_unit == "1") {
      if (
        isNumeric(load_current) &&
        isNumeric(voltage) &&
        isNumeric(conductors) &&
        isNumeric(power_voltage) &&
        isNumeric(cable_length) &&
        isNumeric(wire_diameter_size) &&
        isNumeric(resistivity)
      ) {
        if (conductors < 0) {
          result.error = "Number of conductors must be greater than zero";
          return result;
        }

        let resisvity_value;
        if (wire_material_unit == "cu") {
          resisvity_value = 1.72e-8;
        } else if (wire_material_unit == "al") {
          resisvity_value = 2.82e-8;
        } else if (wire_material_unit == "cs") {
          resisvity_value = 1.43e-7;
        } else if (wire_material_unit == "es") {
          resisvity_value = 4.6e-7;
        } else if (wire_material_unit == "go") {
          resisvity_value = 2.44e-8;
        } else if (wire_material_unit == "ni") {
          resisvity_value = 1.1e-6;
        } else if (wire_material_unit == "nic") {
          resisvity_value = 6.99e-8;
        } else if (wire_material_unit == "si") {
          resisvity_value = 1.59e-8;
        }

        let d;
        let wire_size_value = wire_diameter_size;

        if (wire_diameter_size_unit == "AWG") {
          if (wire_size_value == "000000" || wire_size_value == "6/0")
            wire_size_value = -5;
          if (wire_size_value == "00000" || wire_size_value == "5/0")
            wire_size_value = -4;
          if (wire_size_value == "0000" || wire_size_value == "4/0")
            wire_size_value = -3;
          if (wire_size_value == "000" || wire_size_value == "3/0")
            wire_size_value = -2;
          if (wire_size_value == "00" || wire_size_value == "2/0")
            wire_size_value = -1;

          if (wire_size_value > 40) {
            result.error = "AWG>40 is not valid";
            return result;
          }
          d = 0.127e-3 * Math.pow(92, (36 - wire_size_value) / 39);
        } else if (wire_diameter_size_unit == "inch") {
          d = (25.4 * wire_size_value) / 1000;
        } else if (wire_diameter_size_unit == "mm") {
          d = wire_size_value / 1000;
        }

        let cable_length_value = cable_length;
        if (cable_length_unit == "ft") {
          cable_length_value = cable_length * 0.3048;
        }

        const a = (3.14 * d * d) / 4.0;
        const r = (2 * resisvity_value * cable_length_value) / a;
        const convert_voltage_value = convert_voltage(voltage_unit, voltage);
        const load_current_value = convert_current(
          load_current_unit,
          load_current,
          phase_unit,
          convert_voltage_value
        );

        vd = load_current_value * r;
        if (phase_unit == "3") {
          vd = vd * (1.732 / 2);
        }
        vdp = vd / (voltage * 100);
        result.tech_wire_resistance = r;
      } else {
        result.error = "Please fill all fields.";
        return result;
      }
    } else if (calculate_unit == "2") {
      if (
        isNumeric(load_current) &&
        isNumeric(voltage) &&
        isNumeric(conductors) &&
        isNumeric(wire_length) &&
        isNumeric(resistivity) &&
        isNumeric(gauge)
      ) {
        let wire_value;
        if (wire_material_unit_two == "0") {
          wire_value = 12.9;
        } else if (wire_material_unit_two == "1") {
          wire_value = 21.2;
        }

        let gauge_value = gauge;
        if (gauge_value == "000000" || gauge_value == "6/0") gauge_value = -5;
        if (gauge_value == "00000" || gauge_value == "5/0") gauge_value = -4;
        if (gauge_value == "0000" || gauge_value == "4/0") gauge_value = -3;
        if (gauge_value == "000" || gauge_value == "3/0") gauge_value = -2;
        if (gauge_value == "00" || gauge_value == "2/0") gauge_value = -1;

        const din = 0.005 * Math.pow(92, (36 - gauge_value) / 39);
        const dmm = 0.127 * Math.pow(92, (36 - gauge_value) / 39);
        const amil = 1000 * din * din;
        const ain = (3.14 / 4) * din * din;
        const amm = (3.14 / 4) * dmm * dmm;
        const rft = (0.3048e9 * resistivity) / (25.4 * 25.4 * ain);
        const rm = (1e9 * resistivity) / amm;
        const save_amil = amil * 1000;

        if (find_unit == "1") {
          if (phase_unit == "1" || phase_unit == "2") {
            const wire_length_value = calculates(wire_length_unit, wire_length);
            const convert_current_value = convert_current(
              load_current_unit,
              load_current,
              phase_unit,
              voltage
            );
            vd =
              (2 * wire_value * convert_current_value * wire_length_value) /
              save_amil;
            vdp = vd / voltage;
          } else if (phase_unit === "3") {
            const wire_length_value = calculates(wire_length_unit, wire_length);
            const convert_current_value = convert_current(
              load_current_unit,
              load_current,
              phase_unit,
              voltage
            );
            vd =
              (Math.sqrt(3) *
                wire_value *
                convert_current_value *
                wire_length_value) /
              wire_size_unit;
            vdp = vd / voltage;
          }

          result.tech_din = isNaN(din) ? "NaN" : din;
          result.tech_dmm = isNaN(dmm) ? "NaN" : dmm;
          result.tech_amil = isNaN(amil) ? "NaN" : amil;
          result.tech_ain = isNaN(ain) ? "NaN" : ain;
          result.tech_amm = isNaN(amm) ? "NaN" : amm;
        }

        if (find_unit == "2") {
          // Minimum Conductor Size
          if (isNumeric(max_voltage_drop)) {
            if (wire_material_unit_two == "0") {
              wire_value = 12.9;
            } else if (wire_material_unit_two == "1") {
              wire_value = 21.2;
            }

            if (load_current > 0 && voltage > 0 && cable_length > 0) {
              const Vd = voltage * max_voltage_drop;
              const Cm =
                (phase_unit * wire_value * cable_length * load_current) / Vd;

              for (let i = 0; i < kcmil.length; i++) {
                if (kcmil[i] >= Cm) {
                  sizevd = i;
                  break;
                } else if (Cm > 2000000) {
                  sizevd = 30;
                }
              }

              if (wire_material_unit_two == 0 && raceway == 0) {
                if (insulation == 0) {
                  ans60 = load_current;
                  for (let i = 0; i < amps60.length; i++) {
                    if (amps60[i] > ans60) {
                      sizevs = i;
                      break;
                    } else if (load_current > 560) {
                      sizevs = 30;
                    }
                  }
                } else if (insulation == 1) {
                  ans75 = load_current;
                  for (let i = 0; i < amps75.length; i++) {
                    if (amps75[i] > ans75) {
                      sizevs = i;
                      break;
                    } else if (load_current > 665) {
                      sizevs = 30;
                    }
                  }
                } else if (insulation == 2) {
                  ans90 = load_current;
                  for (let i = 0; i < amps90.length; i++) {
                    if (amps90[i] > ans90) {
                      sizevs = i;
                      break;
                    } else if (load_current > 750) {
                      sizevs = 30;
                    }
                  }
                }
              } else if (wire_material_unit_two == 1 && raceway == 0) {
                if (insulation == 0) {
                  ans60 = load_current;
                  for (let i = 0; i < amps60al.length; i++) {
                    if (amps60al[i] > ans60) {
                      sizevs = i;
                      break;
                    } else if (load_current > 470) {
                      sizevs = 30;
                    }
                  }
                } else if (insulation == 1) {
                  ans75 = load_current;
                  for (let i = 0; i < amps75al.length; i++) {
                    if (amps75al[i] > ans75) {
                      sizevs = i;
                      break;
                    } else if (load_current > 560) {
                      sizevs = 30;
                    }
                  }
                } else if (insulation == 2) {
                  ans90 = load_current;
                  for (let i = 0; i < amps90al.length; i++) {
                    if (amps90al[i] > ans90) {
                      sizevs = i;
                      break;
                    } else if (load_current > 630) {
                      sizevs = 30;
                    }
                  }
                }
              } else if (wire_material_unit_two == 0 && raceway == 1) {
                if (insulation == 0) {
                  ans60 = load_current;
                  for (let i = 0; i < fa60.length; i++) {
                    if (fa60[i] > ans60) {
                      sizevs = i;
                      break;
                    } else if (load_current > 1155) {
                      sizevs = 30;
                    }
                  }
                } else if (insulation == 1) {
                  ans75 = load_current;
                  for (let i = 0; i < fa75.length; i++) {
                    if (fa75[i] > ans75) {
                      sizevs = i;
                      break;
                    } else if (load_current > 1385) {
                      sizevs = 30;
                    }
                  }
                } else if (insulation == 2) {
                  ans90 = load_current;
                  for (let i = 0; i < fa90.length; i++) {
                    if (fa90[i] > ans90) {
                      sizevs = i;
                      break;
                    } else if (load_current > 1560) {
                      sizevs = 30;
                    }
                  }
                }
              } else if (wire_material_unit_two == 1 && raceway == 1) {
                if (insulation == 0) {
                  ans60 = load_current;
                  for (let i = 0; i < fa60al.length; i++) {
                    if (fa60al[i] > ans60) {
                      sizevs = i;
                      break;
                    } else if (load_current > 1155) {
                      sizevs = 30;
                    }
                  }
                } else if (insulation == 1) {
                  ans75 = load_current;
                  for (let i = 0; i < fa75al.length; i++) {
                    if (fa75al[i] > ans75) {
                      sizevs = i;
                      break;
                    } else if (load_current > 1385) {
                      sizevs = 30;
                    }
                  }
                } else if (insulation == 2) {
                  ans90 = load_current;
                  for (let i = 0; i < fa90al.length; i++) {
                    if (fa90al[i] > ans90) {
                      sizevs = i;
                      break;
                    } else if (load_current > 1560) {
                      sizevs = 30;
                    }
                  }
                }
              }

              let wire_size;
              let final;
              if (sizevd == 30 || sizevs == 30) {
                wire_size = ">2000kmcil";
                const calculate_voltage_drop =
                  (max_voltage_drop / 100) * voltage;
                final = voltage - calculate_voltage_drop + " V";
              } else if (sizevd >= sizevs) {
                wire_size = wires[sizevd];
                const calculate_voltage_drop =
                  (max_voltage_drop / 100) * voltage;
                final = voltage - calculate_voltage_drop + " V";
              } else {
                wire_size = wires[sizevs];
                const calculate_voltage_drop =
                  (max_voltage_drop / 100) * voltage;
                final = voltage - calculate_voltage_drop + " V";
              }

              result.tech_wire_size = wire_size;
              result.tech_final = final;
            } else {
              result.error = "Please fill all fields.";
              return result;
            }
          } else {
            result.error = "Please fill all fields.";
            return result;
          }
        } else if (find_unit == "3") {
          // Maximum Circuit Distance
          if (isNumeric(max_voltage_drop)) {
            if (phase_unit == "1" || phase_unit == "2") {
              const convert_current_value = convert_current(
                load_current_unit,
                load_current,
                phase_unit,
                voltage
              );
              const wire_length_value = calculates(
                wire_length_unit,
                wire_length
              );
              const voltagee = (max_voltage_drop * voltage) / 100;
              const vd_calc = voltagee * amil * 1000;
              const vg = 2 * wire_value * convert_current_value;
              const vv = vd_calc / vg;
              result.tech_vv = isNaN(vv) ? "NaN" : vv;
            } else if (phase_unit == "3") {
              const convert_current_value = convert_current(
                load_current_unit,
                load_current,
                phase_unit,
                voltage
              );
              const wire_length_value = calculates(
                wire_length_unit,
                wire_length
              );
              const voltagee = (max_voltage_drop * voltage) / 100;
              const vd_calc = voltagee * amil * 1000;
              const vg = Math.sqrt(3) * wire_value * convert_current_value;
              const vv = vd_calc / vg;
              result.tech_vv = isNaN(vv) ? "NaN" : vv;
            }

            return result;
          } else {
            result.error = "Please fill all fields.";
            return result;
          }
        }
      } else {
        result.error = "Please fill all fields.";
        return result;
      }
    } else if (calculate_unit == "3") {
      if (
        isNumeric(wire_resistance) &&
        isNumeric(voltage) &&
        isNumeric(load_current)
      ) {
        if (phase_unit == "1" || phase_unit == "2") {
          const wire_resistance_value = convert_impedance(
            wire_resistance_unit,
            wire_resistance
          );
          const wire_length_value = calculates(wire_length_unit, wire_length);
          const convert_current_value = convert_current(
            load_current_unit,
            load_current,
            phase_unit,
            voltage
          );
          vd =
            (2 * wire_resistance * convert_current_value * wire_length_value) /
            wire_resistance_value;
          vd = vd * 100;
          vdp = vd / voltage;
        } else if (phase_unit == "3") {
          const wire_resistance_value = convert_impedance(
            wire_resistance_unit,
            wire_resistance
          );
          const convert_current_value = convert_current(
            load_current_unit,
            load_current,
            phase_unit,
            voltage
          );
          const wire_length_value = calculates(wire_length_unit, wire_length);
          vd =
            (2 * wire_resistance * convert_current_value * wire_length_value) /
            wire_resistance_value;
          vdp = vd / voltage;
          vd = vd * 100;
        }
      } else {
        result.error = "Please fill all fields.";
        return result;
      }
    }

    result.tech_voltage_drop_formula = isNaN(vd / conductors)
      ? "NaN"
      : vd / conductors;
    result.tech_voltage_drop_percentage = isNaN(vdp) ? "NaN" : vdp;
    result.tech_voltage = isNaN(voltage) ? "NaN" : voltage;

    return result;

    // Helper function to check if numeric
    function isNumeric(value) {
      return !isNaN(parseFloat(value)) && isFinite(value);
    }
  }

  /**
   * getCalculationelQuarterMileCalculator: Service Method
   * POST: /api/calculators-lol/quarter-mile-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationelQuarterMileCalculator(body) {
    let equation = body.tech_equation;
    let weight = body.tech_weight;
    let weight_unit = body.tech_weight_unit;
    let power = body.tech_power;
    let power_unit = body.tech_power_unit;
    let sample_unit = body.tech_sample_unit;
    let trap = body.tech_trap;
    let et = body.tech_et;
    let selection = body.tech_selection;

    const result = {};
    let elapsed_time;
    let trap_speed;

    // Helper function to convert weight
    function convertWeight(unit, value) {
      let value1;
      if (unit == "(kg)") {
        value1 = value * 2.2046;
      } else if (unit == "(t)") {
        value1 = value * 2204.6;
      } else if (unit == "(lb)") {
        value1 = value * 1;
      } else if (unit == "4") {
        value1 = value * 2000;
      } else if (unit == "5") {
        value1 = value * 2240;
      }
      return value1;
    }

    // Helper function to convert power
    function convertPower(unit2, value2) {
      let value3;
      if (unit2 == "watts (W)") {
        value3 = value2 * 0.001341;
      } else if (unit2 == "kilowatts (kW") {
        value3 = value2 * 1.341;
      } else if (unit2 == "megawatts (mW)") {
        value3 = value2 * 0.0007457;
      } else if (unit2 == "mechanical horsepowers hp (l)") {
        value3 = value2 * 1;
      } else if (unit2 == "metric horsepowers hp (M)") {
        value3 = value2 * 0.9863;
      }
      return value3;
    }

    // Helper function to check if numeric
    function isNumeric(value) {
      return !isNaN(parseFloat(value)) && isFinite(value);
    }

    // Equation 1: Huntington
    if (equation == "1") {
      if (selection == "1") {
        // Find Trap Speed and Elapsed Time
        if (isNumeric(weight) && isNumeric(power)) {
          const w_value = convertWeight(weight_unit, weight);
          const p_value = convertPower(power_unit, power);
          elapsed_time = 6.29 * Math.pow(w_value / p_value, 1 / 3);
          trap_speed = 224 * Math.pow(p_value / w_value, 1 / 3);
        } else {
          result.error = "Please fill all fields.";
          return result;
        }
      } else if (selection == "2") {
        // Find PowerHorse and Elapsed Time
        if (isNumeric(weight) && isNumeric(trap)) {
          const trap_value = trap / 224;
          const w_value = convertWeight(weight_unit, weight);
          const weight_value = Math.pow(trap_value, 3) * w_value;
          elapsed_time = 6.269 * Math.pow(w_value / weight_value, 1 / 3);
          result.tech_elapsed_time = isNaN(elapsed_time) ? "NaN" : elapsed_time;
          result.tech_final_value = isNaN(weight_value) ? "NaN" : weight_value;
        } else {
          result.error = "Please fill all fields.";
          return result;
        }
      } else if (selection == "3") {
        // Find PowerHorse and Trap speed
        if (isNumeric(weight) && isNumeric(et)) {
          const trap_value = et / 6.29;
          const w_value = convertWeight(weight_unit, weight);
          const weight_value = w_value / Math.pow(trap_value, 3);
          trap_speed = 224 * Math.pow(weight_value / w_value, 1 / 3);
          result.tech_final_value = isNaN(weight_value) ? "NaN" : weight_value;
          result.tech_trap_speed = isNaN(trap_speed) ? "NaN" : trap_speed;
        } else {
          result.error = "Please fill all fields.";
          return result;
        }
      }

      result.tech_elapsed_time = elapsed_time;
      result.tech_trap_speed = trap_speed;
      return result;
    }

    // Equation 2
    else if (equation == "2") {
      if (selection == "1") {
        // Calculate Elapsed Time and Trap Speed
        if (isNumeric(weight) && isNumeric(power)) {
          const w_value = convertWeight(weight_unit, weight);
          const p_value = convertPower(power_unit, power);
          elapsed_time = 6.269 * Math.pow(w_value / p_value, 1 / 3);
          trap_speed = 230 * Math.pow(p_value / w_value, 1 / 3);
        } else {
          result.error = "Please fill all fields.";
          return result;
        }
      } else if (selection == "2") {
        // Find PowerHorse && Elapsed Time
        if (isNumeric(weight) && isNumeric(trap)) {
          const trap_value = trap / 230;
          const w_value = convertWeight(weight_unit, weight);
          const weight_value = Math.pow(trap_value, 3) * w_value;
          elapsed_time = 6.269 * Math.pow(w_value / weight_value, 1 / 3);
          result.tech_elapsed_time = isNaN(elapsed_time) ? "NaN" : elapsed_time;
          result.tech_final_value = isNaN(weight_value) ? "NaN" : weight_value;
        } else {
          result.error = "Please fill all fields.";
          return result;
        }
      } else if (selection == "3") {
        // Find PowerHorse
        if (isNumeric(weight) && isNumeric(et)) {
          const trap_value = et / 6.269;
          const w_value = convertWeight(weight_unit, weight);
          const weight_value = w_value / Math.pow(trap_value, 3);
          trap_speed = 230 * Math.pow(weight_value / w_value, 1 / 3);
          result.tech_final_value = isNaN(weight_value) ? "NaN" : weight_value;
          result.tech_trap_speed = isNaN(trap_speed) ? "NaN" : trap_speed;
        } else {
          result.error = "Please fill all fields.";
          return result;
        }
      }

      result.tech_elapsed_time = elapsed_time;
      result.tech_trap_speed = trap_speed;
      return result;
    }

    // Equation 3
    else if (equation == "3") {
      if (selection == "1") {
        // Calculate Elapsed Time and Power
        if (isNumeric(weight) && isNumeric(power)) {
          const w_value = convertWeight(weight_unit, weight);
          const p_value = convertPower(power_unit, power);

          if (sample_unit == "kilowatts (kW)") {
            // Wheel horsepower
            elapsed_time = 5.825 * Math.pow(w_value / p_value, 1 / 3);
            trap_speed = 246 * Math.pow(p_value / w_value, 1 / 3);
          } else if (sample_unit == "megawatts (mW)") {
            // Flywheel horsepower
            elapsed_time = 5.825 * Math.pow(w_value / (p_value * 0.89), 1 / 3);
            trap_speed = 246 * Math.pow((p_value * 0.89) / w_value, 1 / 3);
          }

          const one_eight = elapsed_time * 0.695 - 0.22;
          const sixty = elapsed_time * 0.138 + 0.17;
          result.tech_one_eight = isNaN(one_eight) ? "NaN" : one_eight;
          result.tech_sixty = isNaN(sixty) ? "NaN" : sixty;
          console.log(one_eight, sixty);
        } else {
          result.error = "Please fill all fields.";
          return result;
        }
      } else if (selection == "2") {
        // Find HorsePower
        if (isNumeric(weight) && isNumeric(trap)) {
          const w_value = convertWeight(weight_unit, weight);
          const trap_value = trap / 234;
          const weight_value = Math.pow(trap_value, 3) * w_value;
          elapsed_time = 5.825 * Math.pow(w_value / weight_value, 1 / 3);
          result.tech_elapsed_time = isNaN(elapsed_time) ? "NaN" : elapsed_time;
          result.tech_final_value = isNaN(weight_value) ? "NaN" : weight_value;
        } else {
          result.error = "Please fill all fields.";
          return result;
        }
      } else if (selection == "3") {
        // Find HorsePower
        if (isNumeric(weight) && isNumeric(et)) {
          const w_value = convertWeight(weight_unit, weight);
          const trap_value = et / 5.825;
          const weight_value = w_value / Math.pow(trap_value, 3);
          trap_speed = 246 * Math.pow(weight_value / w_value, 1 / 3);
          result.tech_trap_speed = isNaN(trap_speed) ? "NaN" : trap_speed;
          result.tech_final_value = isNaN(weight_value) ? "NaN" : weight_value;
        } else {
          result.error = "Please fill all fields.";
          return result;
        }
      }

      result.tech_elapsed_time = elapsed_time;
      result.tech_trap_speed = trap_speed;
      return result;
    }

    return result;
  }

  /** getCalculationTerminalVelocityCalculator
   * POST: /api/calculators-lol/terminal-velocity-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationTerminalVelocityCalculator(body) {
    let shapes = body.tech_shapes;
    let mass = body.tech_mass;
    let mass_unit = body.tech_mass_unit;
    let area = body.tech_area;
    let area_unit = body.tech_area_unit;
    let drag_coefficient = body.tech_drag_coefficient;
    let density = body.tech_density;
    let density_unit = body.tech_density_unit;
    let gravity = body.tech_gravity;
    let gravity_unit = body.tech_gravity_unit;

    function convertMass(value, unit) {
      switch (unit) {
        case "mg":
          return value * 0.000001;
        case "g":
          return value * 0.001;
        case "kg":
          return value * 1;
        case "t":
          return value * 1000;
        case "gr":
          return value * 0.0000648;
        case "oz":
          return value * 0.02835;
        case "lb":
          return value * 0.4536;
        default:
          return null;
      }
    }

    function convertArea(value, unit) {
      switch (unit) {
        case "mm²":
          return value * 0.000001;
        case "cm²":
          return value * 0.001;
        case "m²":
          return value * 1;
        case "in²":
          return value * 1000;
        case "yd²":
          return value * 0.0000648;
        default:
          return null;
      }
    }

    function convertDensity(value, unit) {
      switch (unit) {
        case "kg/m³":
          return value * 1;
        case "lb cu/ft":
          return value * 16.02;
        case "g/cm³":
          return value * 1000;
        case "kg/cm³":
          return value * 1000000;
        default:
          return null;
      }
    }

    function convertGravity(value, unit) {
      switch (unit) {
        case "m/s²":
          return value * 1;
        case "ft/s²":
          return value * 0.3048;
        default:
          return null;
      }
    }

    if (
      !isNaN(mass) &&
      !isNaN(area) &&
      !isNaN(drag_coefficient) &&
      !isNaN(density) &&
      !isNaN(gravity) &&
      mass > 0 &&
      area > 0 &&
      drag_coefficient > 0 &&
      density > 0 &&
      gravity > 0
    ) {
      let m = convertMass(mass, mass_unit);
      let a = convertArea(area, area_unit);
      let f = convertDensity(density, density_unit);
      let d = convertGravity(gravity, gravity_unit);

      let terminal_velocity = Math.sqrt(
        (2 * m * d) / (f * a * drag_coefficient)
      );
      let drag_coefficient_area = a * drag_coefficient;

      return {
        tech_terminal_velocity: terminal_velocity,
        tech_drag_coefficient_area: drag_coefficient_area,
      };
    } else {
      return { error: "Please! Check Your Input" };
    }
  }

  /** getCalculationFrictionCalculator
   * POST: /api/calculators-lol/friction-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationFrictionCalculator(body) {
    let calculate = body.tech_calculate;
    let fr_co = body.tech_fr_co;
    let force = body.tech_force;
    let force_unit = body.tech_force_unit;
    let fr = body.tech_fr;
    let fr_unit = body.tech_fr_unit;
    let mass = body.tech_mass;
    let plane = body.tech_plane;
    let gravity = body.tech_gravity;

    function frictionUnit(unit, value) {
      switch (unit) {
        case "N":
          return value * 1;
        case "kN":
          return value * 1000;
        case "MN":
          return value * 1000000;
        case "GN":
          return value * 1000000000;
        case "TN":
          return value * 1000000000000;
        default:
          return null;
      }
    }

    let result = {};

    if (calculate === "1") {
      // Calculate Friction Coefficient
      if (!isNaN(force) && !isNaN(fr) && force > 0 && fr > 0) {
        let fr_value = frictionUnit(fr_unit, fr);
        let force_value = frictionUnit(force_unit, force);
        let friction_coefficient = fr_value / force_value;
        result.tech_friction_coefficient = friction_coefficient;
      } else {
        return { error: "Please fill all fields." };
      }
    } else if (calculate === "2") {
      // Calculate Normal Force
      if (!isNaN(fr) && !isNaN(fr_co) && fr > 0 && fr_co > 0) {
        let force_value = frictionUnit(fr_unit, fr);
        let calculate_force = force_value / fr_co;
        result.tech_calculate_force = calculate_force;
      } else {
        return { error: "Please fill all fields." };
      }
    } else if (calculate === "3") {
      // Friction
      if (!isNaN(force) && !isNaN(fr_co) && force > 0 && fr_co > 0) {
        let force_value = frictionUnit(force_unit, force);
        let friction = force_value * fr_co;
        result.tech_friction = friction;
      } else {
        return { error: "Please fill all fields." };
      }
    } else if (calculate === "4") {
      // Inclined Plane Friction
      if (
        !isNaN(mass) &&
        !isNaN(plane) &&
        !isNaN(fr_co) &&
        !isNaN(gravity) &&
        mass > 0
      ) {
        if (fr_co > 0 && fr_co < 1) {
          let read = Math.cos((plane * Math.PI) / 180);
          let force_value = fr_co * mass * gravity * read;
          result.tech_friction2 = force_value;
        } else {
          return {
            error:
              "Please! Coefficient of friction should be in the range between 0 and 1",
          };
        }
      } else {
        return { error: "Please fill all fields." };
      }
    } else {
      return { error: "Invalid calculation option." };
    }

    return result;
  }

  /** getCalculationEscapeVelocityCalculator
   * POST: /api/calculators-lol/escape-velocity-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationEscapeVelocityCalculator(body) {
    let planet = body.tech_planet;
    let mass = body.tech_mass;
    let mass_unit = body.tech_mass_unit;
    let radius = body.tech_radius;
    let radius_unit = body.tech_radius_unit;
    let orbit = body.tech_orbit;
    let gravity = body.tech_gravity;
    let galaxy_mass = body.tech_galaxy_mass;
    let find = body.tech_find;
    let escape_velocity = body.tech_escape_velocity;
    let escape_unit = body.tech_escape_unit;

    function planetUnit(unit, value) {
      switch (unit) {
        case "kg":
          return value * 1;
        case "t":
          return value * 1000;
        case "lb":
          return value * 0.453592;
        case "oz":
          return value * 0.0283495;
        default:
          return null;
      }
    }

    function escapeUnit(unit2, value2) {
      switch (unit2) {
        case "m/s":
          return value2 * 1;
        case "km/h":
          return value2 * 0.277778;
        case "mph":
          return value2 * 0.44704;
        case "km/s":
          return value2 * 1000;
        default:
          return null;
      }
    }

    let result = {};

    if (find === "1") {
      // Find Escape Velocity
      if (
        !isNaN(mass) &&
        !isNaN(radius) &&
        !isNaN(orbit) &&
        !isNaN(gravity) &&
        !isNaN(galaxy_mass)
      ) {
        let method = 1;
        let mass_value = planetUnit(mass_unit, mass);
        let first = (2 * gravity * mass_value) / radius;
        let escape_velocity = Math.sqrt(first / 1000) / 1000;
        let second = (gravity * mass_value) / radius;
        let first_cosmic_velocity = Math.sqrt(second / 1000) / 1000;
        let third = orbit * 1.496e11;
        let orbital_speed = Math.sqrt((gravity * galaxy_mass) / third);
        let orbit_period = Math.sqrt(orbit * orbit * orbit);

        result.tech_escape_velocity = escape_velocity;
        result.tech_first_cosmic_velocity = first_cosmic_velocity;
        result.tech_orbital_speed = orbital_speed;
        result.tech_orbital_period = orbit_period;
        result.tech_method = method;
      } else {
        return { error: "Please fill all fields." };
      }
    } else if (find === "2") {
      // Find Mass
      if (
        !isNaN(escape_velocity) &&
        !isNaN(radius) &&
        !isNaN(orbit) &&
        !isNaN(gravity) &&
        !isNaN(galaxy_mass)
      ) {
        let method = 2;
        let escape_value = escapeUnit(escape_unit, escape_velocity);
        let find_mass = (escape_value ** 2 * radius) / (2 * gravity);
        let first_cosmic_velocity = Math.sqrt(2) / escape_value;
        let third = orbit * 1.496e11;
        let orbital_speed = Math.sqrt((gravity * galaxy_mass) / third);
        let orbit_period = Math.sqrt(orbit * orbit * orbit);

        result.tech_method = method;
        result.tech_escape_velocity = escape_velocity;
        result.tech_first_cosmic_velocity = first_cosmic_velocity;
        result.tech_orbital_speed = orbital_speed;
        result.tech_mass_value = find_mass;
        result.tech_orbital_period = orbit_period;
        return result;
      } else {
        return { error: "Please fill all fields." };
      }
    } else if (find === "3") {
      // Find Radius
      if (
        !isNaN(escape_velocity) &&
        !isNaN(mass) &&
        !isNaN(orbit) &&
        !isNaN(gravity) &&
        !isNaN(galaxy_mass)
      ) {
        let method = 3;
        let escape_value = escapeUnit(escape_unit, escape_velocity);
        let mass_value = planetUnit(mass_unit, mass);
        let find_radius = (2 * gravity * mass_value) / escape_value ** 2;
        let radius_value = find_radius / 1000;
        let first_cosmic_velocity = Math.sqrt(2) / escape_value;
        let third = orbit * 1.496e11;
        let orbital_speed = Math.sqrt((gravity * galaxy_mass) / third);
        let orbit_period = Math.sqrt(orbit * orbit * orbit);

        result.tech_method = method;
        result.tech_escape_velocity = escape_velocity;
        result.tech_mass_value = radius_value;
        result.tech_first_cosmic_velocity = first_cosmic_velocity;
        result.tech_orbital_speed = orbital_speed;
        result.tech_orbital_period = orbit_period;
      } else {
        return { error: "Please fill all fields." };
      }
    }

    return result;
  }

  /**
   * getCalculationelCoulombsLawCalculator: Service Method
   * POST: /api/calculators-lol/coulombs-law-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationelCoulombsLawCalculator(body) {
    let selection1 = body.tech_selection1;
    let selection2 = body.tech_selection2;
    let charge_one = body.tech_charge_one;
    let charge_one_unit = body.tech_charge_one_unit;
    let charge_two = body.tech_charge_two;
    let charge_two_unit = body.tech_charge_two_unit;
    let distance = body.tech_distance;
    let distance_unit = body.tech_distance_unit;
    let force = body.tech_force;
    let force_unit = body.tech_force_unit;
    let constant = body.tech_constant;
    let choose = body.tech_choose;
    let charge_three = body.tech_charge_three;
    let charge_three_unit = body.tech_charge_three_unit;

    const result = {};

    // Helper function to convert force
    function force_convert(unit, value) {
      let val1;
      if (unit == "mN") {
        val1 = value * 0.001;
      } else if (unit == "N") {
        val1 = value * 1;
      } else if (unit == "kN") {
        val1 = value * 1000;
      } else if (unit == "MN") {
        val1 = value * 1000000;
      } else if (unit == "GN") {
        val1 = value * 1000000000;
      } else if (unit == "TN") {
        val1 = value * 1000000000000;
      } else if (unit == "pdl") {
        val1 = value * 0.138255;
      } else if (unit == "lbf") {
        val1 = value * 4.44822;
      }
      return val1;
    }

    // Helper function to convert charge
    function charge_convert(unit2, value2) {
      let val2;
      if (unit2 == "pC") {
        val2 = value2 * 0.000000000001;
      } else if (unit2 == "nC") {
        val2 = value2 * 0.000000001;
      } else if (unit2 == "μC") {
        val2 = value2 * 0.000001;
      } else if (unit2 == "mC") {
        val2 = value2 * 0.001;
      } else if (unit2 == "C") {
        val2 = value2 * 1;
      } else if (unit2 == "e") {
        val2 = value2 * 1000000000000;
      } else if (unit2 == "Ah") {
        val2 = value2 * 3600;
      } else if (unit2 == "mAh") {
        val2 = value2 * 3.6;
      }
      return val2;
    }

    // Helper function to convert distance
    function distance_convert(unit3, value3) {
      let val3;
      if (unit3 == "nm") {
        val3 = value3 * 0.000000001;
      } else if (unit3 == "μm") {
        val3 = value3 * 0.000001;
      } else if (unit3 == "mm") {
        val3 = value3 * 0.001;
      } else if (unit3 == "cm") {
        val3 = value3 * 0.01;
      } else if (unit3 == "m") {
        val3 = value3 * 1;
      } else if (unit3 == "km") {
        val3 = value3 * 1000;
      } else if (unit3 == "in") {
        val3 = value3 * 0.0254;
      } else if (unit3 == "ft") {
        val3 = value3 * 0.3048;
      } else if (unit3 == "yd") {
        val3 = value3 * 0.9144;
      }
      return val3;
    }

    // Helper function to check if numeric
    function isNumeric(value) {
      return !isNaN(parseFloat(value)) && isFinite(value);
    }

    const brendon = constant * 1000000000;

    // Choose option 1: Same charges (q1 = q2)
    if (choose == "1") {
      if (selection2 == "1") {
        // Find Force
        if (
          isNumeric(charge_three) &&
          isNumeric(distance) &&
          isNumeric(constant)
        ) {
          if (distance > 0) {
            const charge_three_value = charge_convert(
              charge_three_unit,
              charge_three
            );
            const distance_value = distance_convert(distance_unit, distance);
            const force_result =
              (brendon * (charge_three_value * charge_three_value)) /
              (distance_value * distance_value);
            result.tech_force = isNaN(force_result) ? "NaN" : force_result;
          } else {
            result.error = "Distance must be a positive value greater than 0";
            return result;
          }
        } else {
          result.error = "Please fill all fields.";
          return result;
        }
      } else if (selection2 == "2") {
        // Find Charge
        if (isNumeric(force) && isNumeric(constant) && isNumeric(distance)) {
          if (distance > 0) {
            const force_value = force_convert(force_unit, force);
            const distance_value = distance_convert(distance_unit, distance);
            const charge =
              (force_value * distance_value * distance_value) / brendon;
            const charging = Math.sqrt(charge);
            result.tech_charging = isNaN(charging) ? "NaN" : charging;
          } else {
            result.error = "Distance must be a positive value greater than 0";
            return result;
          }
        } else {
          result.error = "Please fill all fields.";
          return result;
        }
      } else if (selection2 == "3") {
        // Find Distance
        if (
          isNumeric(force) &&
          isNumeric(constant) &&
          isNumeric(charge_three)
        ) {
          const force_value = force_convert(force_unit, force);
          const charge_three_value = charge_convert(
            charge_three_unit,
            charge_three
          );
          const distance_calc =
            (brendon * (charge_three_value * charge_three_value)) / force_value;
          const distancing = Math.sqrt(distance_calc);
          result.tech_distancing = isNaN(distancing) ? "NaN" : distancing;
        } else {
          result.error = "Please fill all fields.";
          return result;
        }
      }
    }

    // Choose option 2: Different charges (q1 ≠ q2)
    else if (choose == "2") {
      if (selection1 == "1") {
        // Find Force
        if (
          isNumeric(charge_one) &&
          isNumeric(charge_two) &&
          isNumeric(constant) &&
          isNumeric(distance)
        ) {
          if (distance > 0) {
            const charge_one_value = charge_convert(
              charge_one_unit,
              charge_one
            );
            const charge_two_value = charge_convert(
              charge_two_unit,
              charge_two
            );
            const distance_value = distance_convert(distance_unit, distance);
            const force_result =
              (brendon * (charge_one_value * charge_two_value)) /
              (distance_value * distance_value);
            result.tech_force = isNaN(force_result) ? "NaN" : force_result;
          } else {
            result.error = "Distance must be a positive value greater than 0";
            return result;
          }
        } else {
          result.error = "Please fill all fields.";
          return result;
        }
      } else if (selection1 == "2") {
        // Find Charge One
        if (
          isNumeric(force) &&
          isNumeric(charge_two) &&
          isNumeric(constant) &&
          isNumeric(distance)
        ) {
          if (distance > 0) {
            const charge_two_value = charge_convert(
              charge_two_unit,
              charge_two
            );
            const force_value = force_convert(force_unit, force);
            const distance_value = distance_convert(distance_unit, distance);
            const chargo =
              (force_value * distance_value * distance_value) /
              (brendon * charge_two_value);
            result.tech_charge_one = isNaN(chargo) ? "NaN" : chargo;
            result.tech_method = 1;
          } else {
            result.error = "Distance must be a positive value greater than 0";
            return result;
          }
        } else {
          result.error = "Please fill all fields.";
          return result;
        }
      } else if (selection1 == "3") {
        // Find Charge Two
        if (
          isNumeric(force) &&
          isNumeric(charge_one) &&
          isNumeric(constant) &&
          isNumeric(distance)
        ) {
          if (distance > 0) {
            const charge_one_value = charge_convert(
              charge_one_unit,
              charge_one
            );
            const force_value = force_convert(force_unit, force);
            const distance_value = distance_convert(distance_unit, distance);
            const chargo =
              (force_value * distance_value * distance_value) /
              (brendon * charge_one_value);
            result.tech_charge_one = isNaN(chargo) ? "NaN" : chargo;
            result.tech_method = 2;
          } else {
            result.error = "Distance must be a positive value greater than 0";
            return result;
          }
        } else {
          result.error = "Please fill all fields.";
          return result;
        }
      } else if (selection1 == "4") {
        // Find Distance
        if (
          isNumeric(force) &&
          isNumeric(charge_one) &&
          isNumeric(constant) &&
          isNumeric(charge_two)
        ) {
          const charge_one_value = charge_convert(charge_one_unit, charge_one);
          const charge_two_value = charge_convert(charge_two_unit, charge_two);
          const force_value = force_convert(force_unit, force);
          const distance_calc =
            (brendon * (charge_one_value * charge_two_value)) / force_value;
          const distancing = Math.sqrt(distance_calc);
          result.tech_distancing = isNaN(distancing) ? "NaN" : distancing;
        } else {
          result.error = "Please fill all fields.";
          return result;
        }
      }
    }
    return result;
  }

  /** getCalculationGravityCalculator
   * POST: /api/calculators-lol/gravity-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationGravityCalculator(body) {
    let calculate = body.tech_calculate;
    let mass_one = body.tech_mass_one;
    let mass_one_unit = body.tech_mass_one_unit;
    let mass_two = body.tech_mass_two;
    let mass_two_unit = body.tech_mass_two_unit;
    let gravitational_force = body.tech_gravitational_force;
    let gravitational_force_unit = body.tech_gravitational_force_unit;
    let distance = body.tech_distance;
    let distance_unit = body.tech_distance_unit;
    let constant = body.tech_constant;
    let latitude = body.tech_latitude;
    let height = body.tech_height;
    let height_unit = body.tech_height_unit;

    const param = {};

    const distance_converts = (unit, value) => {
      const map = {
        nm: value * 1e-9,
        μm: value * 1e-6,
        mm: value * 1e-3,
        cm: value * 1e-2,
        m: value,
        km: value * 1e3,
        in: value * 0.0254,
        ft: value * 0.3048,
        yd: value * 0.9144,
      };
      return map[unit] ?? 0;
    };

    const mass_convert = (unit, value) => {
      const map = {
        g: value * 1e-3,
        kg: value,
        t: value * 1e3,
        oz: value * 0.0283495,
        lb: value * 0.453592,
        stone: value * 6.35029,
        "US ton": value * 907.185,
        "Long ton": value * 1016.047,
        Earths: value * 5.9722e24,
        Suns: value * 1.989e30,
        me: 0,
        mp: 0,
        mn: 0,
      };
      return map[unit] ?? 0;
    };

    const force_converts = (unit, value) => {
      const map = {
        mN: value * 1e-3,
        N: value,
        kN: value * 1e3,
        MN: value * 1e6,
        GN: value * 1e9,
        TN: value * 1e12,
        pdl: value * 0.138255,
        lbf: value * 4.44822,
      };
      return map[unit] ?? 0;
    };

    const height_u = (unit, value) => {
      return unit === "m" ? value * 3.28084 : value;
    };

    let buttler = constant * 0.00000000001;

    if (calculate === "1") {
      // Gravitational Force
      if (mass_one > 0 && mass_two > 0 && distance > 0) {
        let m1 = mass_convert(mass_one_unit, mass_one);
        let m2 = mass_convert(mass_two_unit, mass_two);
        let d = distance_converts(distance_unit, distance);
        let force = (buttler * m1 * m2) / (d * d);
        param.tech_force = force;
      } else {
        return { error: "Please fill all fields." };
      }
    } else if (calculate === "2") {
      // Mass 1
      if (mass_two > 0 && distance > 0 && gravitational_force > 0) {
        let f = force_converts(gravitational_force_unit, gravitational_force);
        let m2 = mass_convert(mass_two_unit, mass_two);
        let d = distance_converts(distance_unit, distance);
        let m1 = (f * d * d) / (buttler * m2);
        param.tech_first_mass = m1;
      } else {
        return { error: "Please fill all fields." };
      }
    } else if (calculate === "3") {
      // Mass 2
      if (mass_one > 0 && distance > 0 && gravitational_force > 0) {
        let f = force_converts(gravitational_force_unit, gravitational_force);
        let m1 = mass_convert(mass_one_unit, mass_one);
        let d = distance_converts(distance_unit, distance);
        let m2 = (f * d * d) / (buttler * m1);
        param.tech_second_mass = m2;
      } else {
        return { error: "Please fill all fields." };
      }
    } else if (calculate === "4") {
      // Distance
      if (mass_one > 0 && mass_two > 0 && gravitational_force > 0) {
        let f = force_converts(gravitational_force_unit, gravitational_force);
        let m1 = mass_convert(mass_one_unit, mass_one);
        let m2 = mass_convert(mass_two_unit, mass_two);
        console.log(buttler, m1, m2, f);
        let d = (buttler * m1 * m2) / f;
        param.tech_distance = d;
      } else {
        return { error: "Please fill all fields." };
      }
    } else if (calculate === "5") {
      // Gravity at latitude/height
      if (!isNaN(latitude) && !isNaN(height)) {
        let h = height_u(height_unit, height);
        let phi = latitude * (Math.PI / 180);
        let g =
          9.780327 *
          (1 +
            0.0053024 * Math.sin(phi) ** 2 -
            0.0000058 * Math.sin(2 * phi) ** 2);
        g += -3.086e-6 * h;
        param.tech_g = g;
      } else {
        return { error: "Please fill all fields." };
      }
    }

    return param;
  }

  /**
   * getCalculationelSolarPanelCalculator: Service Method
   * POST: /api/calculators-lol/solar-panel-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationelSolarPanelCalculator(body) {
    let first = body.tech_first;
    let units1 = body.tech_units1;
    let operations1 = body.tech_operations1;
    let operations2 = body.tech_operations2;
    let operations3 = body.tech_operations3;
    let operations4 = body.tech_operations4;
    let second = body.tech_second;
    let third = body.tech_third;
    let four = body.tech_four;
    let five = body.tech_five;
    let units5 = body.tech_units5;
    let six = body.tech_six;
    let units6 = body.tech_units6;
    let seven = body.tech_seven;
    let units7 = body.tech_units7;

    const result = {};

    // Helper function to check if numeric
    function isNumeric(value) {
      return !isNaN(parseFloat(value)) && isFinite(value);
    }

    // Helper function for calculate1 (time conversion)
    function calculate1(a, b) {
      let convert1;
      if (a == "yr") {
        convert1 = b * 1;
      } else if (a == "mon") {
        convert1 = b * 12;
      }
      return convert1;
    }

    // Helper function for calculate22 (area conversion for five)
    function calculate22(a, b) {
      let times;
      if (a == "m²") {
        times = b * 1;
      } else if (a == "km²") {
        times = b * 1000000;
      } else if (a == "ft²") {
        times = b / 10.764;
      } else if (a == "yd²") {
        times = b / 1.196;
      } else if (a == "mi²") {
        times = b * 2590000;
      }
      return times;
    }

    // Helper function for calculate3 (area conversion for six)
    function calculate3(a, b) {
      let magr;
      if (a == "cm²") {
        magr = b / 10000;
      } else if (a == "m²") {
        magr = b * 1;
      } else if (a == "in²") {
        magr = b / 1550;
      } else if (a == "ft²") {
        magr = b / 10.764;
      }
      return magr;
    }

    // Helper function for calculate4 (power conversion)
    function calculate4(a, b) {
      let mahiya;
      if (a == "W") {
        mahiya = b * 1;
      } else if (a == "kW") {
        mahiya = b * 1000;
      }
      return mahiya;
    }

    // Convert values using helper functions
    const first_value = calculate1(units1, first);
    const five_value = calculate22(units5, five);
    const six_value = calculate3(units6, six);
    const seven_value = calculate4(units7, seven);

    // Data arrays
    const DATA = [
      ["Afghanistan (Kabul)", "3991871818", "5"],
      ["Albania (Tirane)", "610081066", "4"],
      ["Algeria (Algiers)", "3846714522", "4.3"],
      ["Am. Samoa (Pago Pago)", "3469450532", "3.9"],
      ["Andorra (Andorra la Vella)", "4235243971", "3.9"],
      ["Angola (Luanda)", "2309985589", "4.3"],
      ["Antigua and Barbuda (W. Indies)", "2798681724", "5"],
      ["Argentina (Buenos Aires)", "3131707929", "4.5"],
      ["Armenia (Yerevan)", "3031656872", "4.3"],
      ["Aruba (Oranjestad)", "1000404369", "4.8"],
      ["Australia (Canberra)", "1343256469", "4.5"],
      ["Austria (Vienna)", "2566595460", "3.2"],
      ["Azerbaijan (Baku)", "970496281", "3.8"],
      ["Bahamas (Nassau)", "3661532231", "4.6"],
      ["Bahrain (Manama)", "1607956302", "4.9"],
      ["Bangladesh (Dhaka)", "3652811140", "3.8"],
      ["Barbados (Bridgetown)", "3590402118", "4.8"],
      ["Belarus (Minsk)", "3722655827", "2.9"],
      ["Belgium (Brussels)", "1299554482", "2.9"],
      ["Belize (Belmopan)", "256266363", "4.2"],
      ["Benin (Porto-Novo)", "865682789", "3.8"],
      ["Bhutan (Thimphu)", "3295512309", "4.1"],
      ["Bolivia (La Paz)", "3386483712", "5.2"],
      ["Bosnia and Herzegovina (Sarajevo)", "1254960087", "3.5"],
      ["Botswana (Gaborone)", "674609032", "5"],
      ["Brazil (Brasilia)", "1095373230", "4.5"],
      ["British Virgin Islands (Road Town)", "2994264545", "4.6"],
      ["Brunei Darussalam (Bandar Seri Begawan)", "2563478298", "4"],
      ["Bulgaria (Sofia)", "3589381075", "3.7"],
      ["Burkina Faso (Ouagadougou)", "833105926", "4.6"],
      ["Burundi (Bujumbura)", "2732860778", "4.3"],
      ["Cambodia (Phnom Penh)", "1414021081", "4.3"],
      ["Cameroon (Yaounde)", "1831675825", "3.9"],
      ["Canada", "1711396312", "3.2"],
      ["Cape Verde (Praia)", "1149614655", "4.8"],
      ["Cayman Islands (George Town)", "216077578", "4.6"],
      ["Central African Republic (Bangui)", "2456381780", "4.3"],
      ["Chad (N'Djamena)", "3698166179", "4.7"],
      ["Chile (Santiago)", "3289191001", "4.8"],
      ["China (Beijing)", "827779408", "3.7"],
      ["Colombia (Bogota)", "1726653727", "3.9"],
      ["Comros (Moroni)", "195680681", "4"],
      ["Congo (Brazzaville)", "2289137567", "4"],
      ["Congo (Kinshasa)", "2209700001", "3.8"],
      ["Costa Rica (San Jose)", "2859341299", "4"],
      ["Cote d'Ivoire (Yamoussoukro)", "1977815041", "3.9"],
      ["Croatia (Zagreb)", "3003063492", "3.4"],
      ["Cuba (Havana)", "4071425341", "4.5"],
      ["Cyprus (Nicosia)", "204841218", "4.7"],
      ["Czech Republic (Prague)", "996478966", "3"],
      ["Denmark (Copenhagen)", "764509872", "2.9"],
      ["Djibouti (Djibouti)", "329371752", "5"],
      ["Dominica (Roseau)", "3292674871", "4.7"],
      ["Dominica Republic (Santo Domingo)", "197838988", "4.4"],
      ["East Timor (Dili)", "1431618658", "4.9"],
      ["Ecuador (Quito)", "553239032", "4.5"],
      ["Egypt (Cairo)", "1381863594", "4.9"],
      ["El Salvador (San Salvador)", "1003348054", "4.8"],
      ["Equatorial Guinea (Malabo)", "1047691502", "3.6"],
      ["Eritrea (Asmara)", "2179093092", "5.4"],
      ["Estonia (Tallinn)", "2514150519", "2.9"],
      ["Ethiopia (Addis Ababa)", "3699252067", "4.6"],
      ["Falkland Islands (Stanley)", "3740070421", "4"],
      ["Faroe Islands (Torshavn)", "11434331", "2"],
      ["Fiji (Suva)", "3207488962", "3.4"],
      ["Finland (Helsinki)", "2606916439", "2.5"],
      ["France (Paris)", "3023064619", "3.1"],
      ["Gabon (Libreville)", "3968687439", "3.9"],
      ["Gambia (Banjul)", "2171881135", "4.7"],
      ["Georgia (Tbilisi)", "2710156945", "3.8"],
      ["Germany (Berlin)", "1573821537", "2.9"],
      ["Ghana (Accra)", "3843936568", "4.2"],
      ["Greece (Athens)", "1301321358", "4.4"],
      ["Greenland (Nuuk)", "2912615512", "2"],
      ["Guadeloupe (Basse-Terre)", "2654694218", "3.6"],
      ["Guatemala (Guatemala)", "1356714202", "4.5"],
      ["Guernsey (St. Peter Port)", "1682628571", "3.2"],
      ["Guiana (Cayenne)", "2606409875", "4.3"],
      ["Guinea (Conakry)", "915998772", "4.3"],
      ["Guinea-Bissau (Bissau)", "795049445", "4.5"],
      ["Guyana (Georgetown)", "2009679134", "4.4"],
      ["Haiti (Port-au-Prince)", "3095822688", "4.7"],
      ["Heard and McDonald Islands()", "4221146578", "1.9"],
      ["Honduras (Tegucigalpa)", "2347237514", "4.4"],
      ["Hungary (Budapest)", "2362275024", "3.4"],
      ["Iceland (Reykjavik)", "2052092450", "1.5"],
      ["India (New Delhi)", "720672287", "4"],
      ["Indonesia (Jakarta)", "1381773541", "3.7"],
      ["Iran (Tehran)", "3133000988", "4.8"],
      ["Iraq (Baghdad)", "3554251891", "4.6"],
      ["Ireland (Dublin)", "2296089771", "2.6"],
      ["Israel (Jerusalem)", "3556052957", "5.1"],
      ["Italy (Rome)", "1276344126", "4.2"],
      ["Jamaica (Kingston)", "3633754639", "4.7"],
      ["Jordan (Amman)", "1034068660", "5.1"],
      ["Kazakhstan (Astana)", "3076808606", "3.5"],
      ["Kenya (Nairobi)", "722935436", "4.2"],
      ["Kiribati (Tarawa)", "1002242718", "4.5"],
      ["Kuwait (Kuwait)", "3048930687", "4.8"],
      ["Kyrgyzstan (Bishkek)", "717666272", "4"],
      ["Laos (Vientiane)", "136466098", "3.9"],
      ["Latvia (Riga)", "1009138951", "2.9"],
      ["Lebanon (Beirut)", "1374067137", "4.6"],
      ["Lesotho (Maseru)", "2667881322", "5.1"],
      ["Liberia (Monrovia)", "1968781200", "3.9"],
      ["Libya (Tripoli)", "4257803592", "4.7"],
      ["Liechtenstein (Vaduz)", "121291457", "3.2"],
      ["Lithuania (Vilnius)", "3887877908", "2.8"],
      ["Luxembourg (Luxembourg City)", "2989898092", "3"],
      ["Macao, China (Macau)", "84436167", "3.4"],
      ["Macedonia (Skopje)", "282587261", "3.8"],
      ["Madagascar (Antananarivo)", "1607417683", "4.7"],
      ["Malawi (Lilongwe)", "1077346167", "4.7"],
      ["Malaysia (Kuala Lumpur)", "2556432463", "3.6"],
      ["Maldives (Male)", "3520300004", "4.5"],
      ["Mali (Bamako)", "2041362033", "4.6"],
      ["Malta (Valletta)", "1973061101", "4.5"],
      ["Martinique (Fort-de-France)", "2610122375", "4.6"],
      ["Mauritania (Nouakchott)", "4152331390", "4.9"],
      ["Mayotte (Mamoudzou)", "2884156795", "4.6"],
      ["Mexico (Mexico City)", "1546145819", "5"],
      ["Micronesia (Palikir)", "341419522", "3.6"],
      ["Moldova (Chisinau)", "2987065369", "3.5"],
      ["Mozambique (Maputo)", "3698439937", "4.3"],
      ["Myanmar (Yangon)", "4045074134", "4"],
      ["Namibia (Windhoek)", "787293352", "5.4"],
      ["Nepal (Kathmandu)", "1673272026", "4.3"],
      ["Netherlands (Amsterdam)", "1374142707", "2.9"],
      ["Netherlands Antilles (Willemstad)", "450066022", "4.8"],
      ["New Caledonia (Noumea)", "3460824970", "4.4"],
      ["New Zealand (Wellington)", "3751197466", "3.6"],
      ["Nicaragua (Managua)", "2257579921", "4.5"],
      ["Niger (Niamey)", "3581953643", "4.6"],
      ["Nigeria (Abuja)", "1504549367", "4.1"],
      ["Norfolk Island (Kingston)", "3623646402", "4.2"],
      ["North Korea (Pyongyang)", "2189793320", "3.9"],
      ["Northern Mariana Islands (Saipan)", "895647190", "4.7"],
      ["Norway (Oslo)", "201239791", "2.8"],
      ["Oman (Muscat)", "220380149", "5"],
      ["Pakistan (Islamabad)", "2664544349", "4.2"],
      ["Palau (Koror)", "4072701490", "4"],
      ["Panama (Panama City)", "4036959384", "3.9"],
      ["Papua New Guinea (Port Moresby)", "3255397662", "4.4"],
      ["Paraguay (Asuncion)", "1478565796", "4.3"],
      ["Peru (Lima)", "3504549447", "3.9"],
      ["Philippines (Manila)", "115412715", "3.8"],
      ["Poland (Warsaw)", "1658193578", "3"],
      ["Polynesia (Papeete)", "2148674221", "4.6"],
      ["Portugal (Lisbon)", "3840916265", "4.4"],
      ["Puerto Rico (San Juan)", "3137840658", "4.5"],
      ["Qatar (Doha)", "4239190508", "4.8"],
      ["Rawanda (Kigali)", "1892921828", "4.2"],
      ["Romania (Bucharest)", "3434379517", "3.6"],
      ["Russia(Moscow)", "3298823943", "2.9"],
      ["Saint Kitts and Nevis (Basseterre)", "3521668174", "4.8"],
      ["Saint Lucia (Castries)", "1125842730", "4.5"],
      ["Saint Pierre and Miquelon (Saint-Pierre)", "2334458601", "3.1"],
      ["Saint vincent and the Grenadines (Kingstown)", "3052485915", "4.8"],
      ["Samoa (Apia)", "248727382", "4.3"],
      ["San Marino (San Marino)", "3605759662", "3.8"],
      ["Sao Tome and Principe (Sao Tome)", "1200290637", "3.2"],
      ["Saudi Arabia (Riyadh)", "1663068746", "5.1"],
      ["Senegal (Dakar)", "1652783615", "4.8"],
      ["Serbia (Belgrade)", "892945963", "3.5"],
      ["Sierra Leone (Freetown)", "2465024753", "4.1"],
      ["Slovakia (Bratislava)", "1727188336", "3.3"],
      ["Slovenia (Ljubljana)", "1318894682", "3.4"],
      ["Solomon Islands (Honiara)", "1964117431", "4"],
      ["Somalia (Mogadishu)", "4104232972", "4.9"],
      ["South Africa (Pretoria)", "107408729", "4.9"],
      ["South Korea (Seoul)", "3688100084", "3.8"],
      ["Spain (Madrid)", "4228850213", "4.5"],
      ["Sudan (Khartoum)", "2332764244", "4.9"],
      ["Suriname (Paramaribo)", "2487072959", "4.2"],
      ["Swaziland (Mbabane)", "2904932956", "4.4"],
      ["Sweden (Stockholm)", "717713027", "2.9"],
      ["Switzerland (Bern)", "2257415609", "3.5"],
      ["Syria (Damascus)", "2035327206", "5.2"],
      ["Tajikistan (Dushanbe)", "2206761006", "4.3"],
      ["Tanzania (Dodoma)", "3399419241", "5"],
      ["Thailand (Bangkok)", "1907461772", "3.9"],
      ["Togo (Lome)", "178080526", "4.1"],
      ["Tonga (Nuku'alofa)", "2771626202", "4"],
      ["Tunisia (Tunis)", "3500410102", "4.3"],
      ["Turkey (Ankara)", "3456977417", "4.2"],
      ["Turkmenistan (Ashgabat)", "3070535762", "4.1"],
      ["Tuvalu (Funafuti)", "2661233985", "4.1"],
      ["Uganda (Kampala)", "2240997522", "4.2"],
      ["Ukraine (Kiev)", "3697749896", "3.2"],
      ["United Arab Emirates (Abu Dhabi)", "2636792982", "5"],
      ["United Kingdom (London)", "3752346309", "2.8"],
      ["Uruguay (Montevideo)", "4204565486", "4.3"],
      ["US of Virgin Islands (Charlotte Amalie)", "2572039332", "4.7"],
      ["USA", "4229717202", "4.6"],
      ["Uzbekistan (Tashkent)", "2948553792", "4.2"],
      ["Vanuatu (Port-Vila)", "679793930", "3.8"],
      ["Venezuela (Caracas)", "1062949898", "4.4"],
      ["Viet Nam (Hanoi)", "2678485620", "2.9"],
      ["Zambia (Lusaka)", "3678211569", "4.9"],
      ["Zimbabwe (Harare)", "2976182253", "4.9"],
    ];

    const DATA_Canada = [
      ["Alberta (Calgary)", "239695018", "4.1"],
      ["Alberta (Edmonton)", "1192758017", "3.9"],
      ["British Columbia (Nelson)", "3429941298", "3.1"],
      ["British Columbia (Vancouver)", "818410939", "3.4"],
      ["British Columbia (Victoria)", "385806281", "3.7"],
      ["Manitoba (Winnipeg)", "2428951261", "4"],
      ["New Brunswick (Fredericton)", "1842276924", "3.7"],
      ["Newfoundland (St. John's)", "996453466", "3.1"],
      ["Northwest Territories (Yellowknife)", "3629411594", "3.1"],
      ["Nova Scotia (Halifax)", "271236675", "3.6"],
      ["Nunavut (Iqaluit)", "312101358", "3"],
      ["Ontario (Kingston)", "2143505671", "3.7"],
      ["Ontario (London)", "324522438", "3.6"],
      ["Ontario (Ottawa)", "1615532888", "3.8"],
      ["Ontario (Toronto)", "3641369057", "3.7"],
      ["Quebec (Montreal)", "3969240345", "3.7"],
      ["Quebec (Quebec)", "3557161857", "3.7"],
      ["Saskatchewan (Moose Jaw)", "3772090893", "4.2"],
      ["Yukon (Whitehorse)", "1482142919", "2.5"],
    ];

    const DATA_USA = [
      ["Alaska (Anchorage)", "4135142354", "2.5"],
      ["Alaska (Juneau)", "3567611943", "2.4"],
      ["Alaska (Sitka)", "282885990", "2.5"],
      ["Alabama (Birmingham)", "2935373997", "4.2"],
      ["Alabama (Mobile)", "2957510412", "4.4"],
      ["Alabama (Montgomery)", "4037531327", "4.3"],
      ["Alaska (Nome)", "1605565051", "2.5"],
      ["Arizona (Flagstaff)", "3326595849", "5.2"],
      ["Arizona (Phoenix)", "4290516658", "5.2"],
      ["Arkansas (Hot Springs)", "532292244", "4.1"],
      ["California (El Centro)", "3961047602", "5.3"],
      ["California (Fresno)", "973820569", "4.9"],
      ["California (Long Beach)", "2539053497", "4.9"],
      ["California (Los Angeles)", "2318008416", "5"],
      ["California (Oakland)", "2489059847", "4.8"],
      ["California (Sacramento)", "2638060327", "4.8"],
      ["California (San Diego)", "2647141316", "4.9"],
      ["California (San Francisco)", "406059073", "4.8"],
      ["California (San Jose)", "4029578609", "4.9"],
      ["Colorado (Denver)", "3687682113", "4.7"],
      ["Colorado (Grand Junction)", "1335943443", "4.7"],
      ["Connecticut (New Haven)", "36738583", "4"],
      ["D.C. (Washington)", "3719346", "4"],
      ["Florida (Jacksonville)", "3920459310", "4.4"],
      ["Florida (Key West)", "2960020496", "4.8"],
      ["Florida (Miami)", "1432328791", "4.5"],
      ["Florida (Tampa)", "550749899", "4.6"],
      ["Georgia (Atlanta)", "1664661147", "4.3"],
      ["Georgia (Savannah)", "2937334420", "4.4"],
      ["Hawaii (Honolulu)", "3766290767", "4.8"],
      ["Idaho (Boise)", "2641863014", "4.3"],
      ["Idaho (Idaho Falls)", "3493397125", "4.3"],
      ["Idaho (Lewiston)", "1255609491", "3.9"],
      ["Illinois (Chicago)", "1826265227", "3.8"],
      ["Illinois (Springfield)", "2837119342", "4"],
      ["Indiana (Indianapolis)", "2103264087", "3.9"],
      ["Iowa (Des Moines)", "3656095951", "4"],
      ["Iowa (Dubuque)", "2121687642", "3.9"],
      ["Kansas (Wichita)", "2087743131", "4.4"],
      ["Kentucky (Louisville)", "376431321", "3.9"],
      ["Louisiana (New Orleans)", "1519673836", "4.3"],
      ["Louisiana (Shreveport)", "1279592367", "4.2"],
      ["Maine (Bangor)", "3308637761", "3.8"],
      ["Maine (Eastport)", "3642634395", "3.7"],
      ["Maine (Portland)", "3882219611", "3.9"],
      ["Maryland (Baltimore)", "1032825865", "4"],
      ["Massachusetts (Boston)", "3277586614", "4"],
      ["Massachusetts (Springfield)", "479413252", "3.9"],
      ["Michigan (Detroit)", "1899119109", "3.7"],
      ["Michigan (Grand Rapids)", "3859683753", "3.6"],
      ["Minnesota (Duluth)", "207643724", "3.8"],
      ["Minnesota (Minneapolis)", "3651222668", "3.9"],
      ["Mississippi (Jackson)", "2093733510", "4.2"],
      ["Missouri (Kansas City)", "256734123", "4.2"],
      ["Missouri (Springfield)", "4208371662", "4.2"],
      ["Missouri (St. Louis)", "2756189513", "4"],
      ["Montana (Havre)", "4287468968", "4.2"],
      ["Montana (Helena)", "3777891619", "4"],
      ["Nebraska (Lincoln)", "2762107793", "4.2"],
      ["Nebraska (Omaha)", "3390856537", "4.1"],
      ["Nevada (Las Vegas)", "1117405525", "5.2"],
      ["Nevada (Reno)", "2555244568", "5"],
      ["New Hampshire (Manchester)", "3992825310", "3.9"],
      ["New Jersey (Newark)", "1217007721", "3.9"],
      ["New Mexico (Albuquerque)", "1621290412", "5.2"],
      ["New Mexico (Carlsbad)", "2415518855", "5.1"],
      ["New Mexico (Santa Fe)", "2805863579", "5.1"],
      ["New York (Albany)", "1340824682", "3.8"],
      ["New York (Buffalo)", "754074823", "3.6"],
      ["New York (New York)", "20791028", "3.9"],
      ["New York (Syracuse)", "763931607", "3.5"],
      ["North Carolina (Charlotte)", "3186558084", "4.2"],
      ["North Carolina (Raleigh)", "2259750002", "4.2"],
      ["North Carolina (Wilmington)", "4277570694", "4.3"],
      ["North Dakota (Bismarck)", "3181259271", "4.1"],
      ["North Dakota (Fargo)", "4193613631", "3.9"],
      ["Ohio (Cincinnati)", "1422758227", "3.8"],
      ["Ohio (Cleveland)", "1861861379", "3.6"],
      ["Ohio (Columbus)", "3164563067", "3.7"],
      ["Ohio (Toledo)", "2550438542", "3.7"],
      ["Oklahoma (Oklahoma City)", "1681490500", "4.5"],
      ["Oklahoma (Tulsa)", "4206178633", "4.3"],
      ["Oregon (Baker)", "729822444", "4.3"],
      ["Oregon (Eugene)", "2170094742", "3.7"],
      ["Oregon (Klamath Falls)", "3402233410", "4.6"],
      ["Oregon (Portland)", "3363193965", "3.4"],
      ["Pennsylvania (Philadelphia)", "1299423297", "3.9"],
      ["Pennsylvania (Pittsburgh)", "970297448", "3.5"],
      ["Puerto Rico (San Juan)", "1539437238", "4.5"],
      ["Rhode Island (Providence)", "3911276065", "4"],
      ["South Carolina (Charleston)", "3182739933", "4.4"],
      ["South Carolina (Columbia)", "762574785", "4.3"],
      ["South Dakota (Pierre)", "2689947897", "4.1"],
      ["South Dakota (Sioux Falls)", "2048851752", "4.1"],
      ["Tennessee (Knoxville)", "433533562", "4.1"],
      ["Tennessee (Memphis)", "1651492633", "4.1"],
      ["Tennessee (Nashville)", "671663705", "4"],
      ["Texas (Amarillo)", "2866585036", "5"],
      ["Texas (Austin)", "2243588821", "4.2"],
      ["Texas (Dallas)", "1479087934", "4.3"],
      ["Texas (El Paso)", "1637142286", "5.4"],
      ["Texas (Fort Worth)", "3843654916", "4.4"],
      ["Texas (Houston)", "2127765283", "4.1"],
      ["Texas (San Antonio)", "81106563", "4.2"],
      ["Utah (Richfield)", "4165216658", "4.7"],
      ["Utah (Salt Lake City)", "4025123996", "4.3"],
      ["Vermont (Montpelier)", "302888773", "3.6"],
      ["Virginia (Richmond)", "3822420444", "4.1"],
      ["Virginia (Roanoke)", "3108219435", "4.1"],
      ["Virginia (Virginia Beach)", "1286211148", "4.2"],
      ["Washington (Seattle)", "629060436", "3.4"],
      ["Washington (Spokane)", "555339570", "3.7"],
      ["West Virginia (Charleston)", "228560527", "3.7"],
      ["Wisconsin (Milwaukee)", "1549092292", "3.9"],
      ["Wyoming (Cheyenne)", "2049746331", "4.6"],
    ];

    // Validation
    if (first_value > 0) {
      if (second > 0) {
        if (third > 0 && four > 0) {
          if (third <= 100 && four <= 100) {
            if (five_value > 0) {
              if (isNumeric(six)) {
                if (isNumeric(seven)) {
                  let div1;
                  let shph;

                  if (operations1 == 1) {
                    div1 = 365 * second;
                  } else if (operations1 == 2) {
                    const [c_value, c_name] = operations2.split("&&");
                    const data1 = parseInt(c_value) - 1;
                    const c_array = DATA[data1];

                    if (c_array[1] === "1711396312") {
                      // Canada
                      const [can_value, can_name] = operations3.split("&&");
                      const can_data1 = parseInt(can_value) - 1;
                      const can_array = DATA_Canada[can_data1];
                      div1 = 365 * parseFloat(can_array[2]);
                      shph = parseFloat(can_array[2]);
                    } else if (c_array[1] === "4229717202") {
                      // USA
                      const [usa_value, usa_name] = operations4.split("&&");
                      const usa_data1 = parseInt(usa_value) - 1;
                      const usa_array = DATA_USA[usa_data1];
                      div1 = 365 * parseFloat(usa_array[2]);
                      shph = parseFloat(usa_array[2]);
                    } else {
                      // Other countries
                      div1 = 365 * parseFloat(c_array[2]);
                      shph = parseFloat(c_array[2]);
                    }

                    result.tech_shph = isNaN(shph) ? "NaN" : shph;
                  }

                  const sao = first_value / div1;
                  const div2 = parseFloat(third) / parseFloat(four);
                  let sas_ans = sao * div2;
                  sas_ans = Math.round(sas_ans * 100) / 100;
                  const mul1 = sas_ans * 1000;
                  const mul2 = second * seven_value;
                  let panels_ans;
                  if (mul2 === 0) {
                    panels_ans = 0;
                  } else {
                    panels_ans = mul1 / mul2;
                  }

                  const area_ans = six_value * Math.round(panels_ans);
                  let line;

                  if (five_value >= area_ans) {
                    line =
                      "You have sufficient space for your solar panel system! ☀️";
                  } else if (five_value < area_ans) {
                    line =
                      "Oops! You don't seem to have enough space for your solar panel system! 😰";
                  }

                  result.tech_sas_ans = isNaN(sas_ans) ? "NaN" : sas_ans;
                  result.tech_panels_ans = isNaN(panels_ans)
                    ? "NaN"
                    : Math.round(panels_ans);
                  result.tech_area_ans = isNaN(area_ans) ? "NaN" : area_ans;
                  result.tech_line = line;

                  return result;
                } else {
                  result.error = "Please check your input";
                  return result;
                }
              } else {
                result.error = "Please check your input";
                return result;
              }
            } else {
              result.error = "Area cannot be negative!";
              return result;
            }
          } else {
            result.error = "Percentage cannot be greater than 100!";
            return result;
          }
        } else {
          result.error = "Percentage must be greater than zero!";
          return result;
        }
      } else {
        result.error = "No. of hours cannot be negative!";
        return result;
      }
    } else {
      result.error = "Electricity consumption cannot be negative!";
      return result;
    }
  }

  /**
   * getCalculationelCentripetalForceCalculator: Service Method
   * POST: /api/calculators-lol/centripetal-force-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationelCentripetalForceCalculator(body) {
    let find = body.tech_find;
    let mass = body.tech_mass;
    let mass_unit = body.tech_mass_unit;
    let radius = body.tech_radius;
    let radius_unit = body.tech_radius_unit;
    let t_velocity = body.tech_t_velocity;
    let t_velocity_unit = body.tech_t_velocity_unit;
    let c_force = body.tech_c_force;
    let c_force_unit = body.tech_c_force_unit;
    let angular_velocity = body.tech_angular_velocity;
    let angular_velocity_unit = body.tech_angular_velocity_unit;
    let centripetal_acceleration = body.tech_centripetal_acceleration;
    let centripetal_acceleration_unit = body.tech_centripetal_acceleration_unit;

    const result = {};

    // Helper function to check if numeric
    function isNumeric(value) {
      return !isNaN(parseFloat(value)) && isFinite(value);
    }

    // Mass unit conversion
    let mass_unit_value;
    if (mass_unit == "g") {
      mass_unit_value = 0.001;
    } else if (mass_unit == "kg") {
      mass_unit_value = 1;
    } else if (mass_unit == "t") {
      mass_unit_value = 1000;
    } else if (mass_unit == "oz") {
      mass_unit_value = 0.02835;
    } else if (mass_unit == "lb") {
      mass_unit_value = 0.4536;
    } else if (mass_unit == "stone") {
      mass_unit_value = 6.35;
    } else if (mass_unit == "US ton") {
      mass_unit_value = 907.2;
    } else if (mass_unit == "Long ton") {
      mass_unit_value = 1016;
    } else if (mass_unit == "Earths") {
      mass_unit_value = 5972200000000000000000000;
    } else if (mass_unit == "Suns") {
      mass_unit_value = 1989000000000000000000000000000;
    }

    // Radius unit conversion
    let radius_unit_value;
    if (radius_unit == "mm") {
      radius_unit_value = 0.001;
    } else if (radius_unit == "cm") {
      radius_unit_value = 0.01;
    } else if (radius_unit == "m") {
      radius_unit_value = 1;
    } else if (radius_unit == "km") {
      radius_unit_value = 1000;
    } else if (radius_unit == "in") {
      radius_unit_value = 0.0254;
    } else if (radius_unit == "ft") {
      radius_unit_value = 0.3048;
    } else if (radius_unit == "yd") {
      radius_unit_value = 0.9144;
    } else if (radius_unit == "mi") {
      radius_unit_value = 1609.3;
    } else if (radius_unit == "ly") {
      radius_unit_value = 9460700000000000;
    } else if (radius_unit == "au") {
      radius_unit_value = 149597870700;
    }

    // Tangential velocity unit conversion
    let t_velocity_unit_value;
    if (t_velocity_unit == "m/s") {
      t_velocity_unit_value = 1;
    } else if (t_velocity_unit == "km/h") {
      t_velocity_unit_value = 0.2778;
    } else if (t_velocity_unit == "ft/s") {
      t_velocity_unit_value = 0.3048;
    } else if (t_velocity_unit == "mph") {
      t_velocity_unit_value = 1.6093;
    } else if (t_velocity_unit == "ft/min") {
      t_velocity_unit_value = 0.00508;
    } else if (t_velocity_unit == "m/min") {
      t_velocity_unit_value = 0.016667;
    }

    // Force unit conversion
    let c_force_unit_value;
    if (c_force_unit == "N") {
      c_force_unit_value = 1;
    } else if (c_force_unit == "kN") {
      c_force_unit_value = 1000;
    } else if (c_force_unit == "pdl") {
      c_force_unit_value = 0.13826;
    } else if (c_force_unit == "lbf") {
      c_force_unit_value = 4.448;
    }

    // Angular velocity unit conversion
    let angular_velocity_unit_value;
    if (angular_velocity_unit == "rpm") {
      angular_velocity_unit_value = 0.10472;
    } else if (angular_velocity_unit == "rad/s") {
      angular_velocity_unit_value = 1;
    } else if (angular_velocity_unit == "Hz") {
      angular_velocity_unit_value = 6.283;
    }

    // Centripetal acceleration unit conversion
    let centripetal_acceleration_unit_value;
    if (centripetal_acceleration_unit == "m/s²") {
      centripetal_acceleration_unit_value = 1;
    } else if (centripetal_acceleration_unit == "g") {
      centripetal_acceleration_unit_value = 9.807;
    } else if (centripetal_acceleration_unit == "ft/s²") {
      centripetal_acceleration_unit_value = 0.3048;
    }

    // Main calculation logic based on find parameter
    if (find == "1") {
      // Find Mass
      if (
        isNumeric(c_force) &&
        isNumeric(radius) &&
        isNumeric(t_velocity) &&
        c_force > 0 &&
        radius > 0 &&
        t_velocity > 0
      ) {
        const c_force_value = c_force_unit_value * c_force;
        const radius_value = radius_unit_value * radius;
        const t_velocity_value = t_velocity_unit_value * t_velocity;
        const find_mass =
          (c_force_value * radius_value) /
          (t_velocity_value * t_velocity_value);

        result.tech_mass = isNaN(find_mass) ? "NaN" : find_mass;
        result.tech_r = isNaN(radius_value) ? "NaN" : radius_value;
        result.tech_c = isNaN(c_force_value) ? "NaN" : c_force_value;
        result.tech_v = isNaN(t_velocity_value) ? "NaN" : t_velocity_value;
      } else {
        result.error = "Please fill all fields.";
        return result;
      }
    } else if (find == "2") {
      // Find Radius
      if (
        isNumeric(c_force) &&
        isNumeric(mass) &&
        isNumeric(t_velocity) &&
        c_force > 0 &&
        mass > 0 &&
        t_velocity > 0
      ) {
        const c_force_value = c_force_unit_value * c_force;
        const mass_value = mass_unit_value * mass;
        const t_velocity_value = t_velocity_unit_value * t_velocity;
        const find_radius =
          (mass_value * t_velocity_value * t_velocity_value) / c_force_value;

        result.tech_radius = isNaN(find_radius) ? "NaN" : find_radius;
        result.tech_m = isNaN(mass_value) ? "NaN" : mass_value;
        result.tech_c = isNaN(c_force_value) ? "NaN" : c_force_value;
        result.tech_v = isNaN(t_velocity_value) ? "NaN" : t_velocity_value;
      } else {
        result.error = "Please fill all fields.";
        return result;
      }
    } else if (find == "3") {
      // Find Tangential Velocity
      if (
        isNumeric(c_force) &&
        isNumeric(mass) &&
        isNumeric(radius) &&
        c_force > 0 &&
        mass > 0 &&
        radius > 0
      ) {
        const c_force_value = c_force_unit_value * c_force;
        const mass_value = mass_unit_value * mass;
        const radius_value = radius * radius_unit_value;
        const find_velocity = Math.sqrt(
          (radius_value * c_force_value) / mass_value
        );

        result.tech_velocity = isNaN(find_velocity) ? "NaN" : find_velocity;
        result.tech_m = isNaN(mass_value) ? "NaN" : mass_value;
        result.tech_c = isNaN(c_force_value) ? "NaN" : c_force_value;
        result.tech_r = isNaN(radius_value) ? "NaN" : radius_value;
      } else {
        result.error = "Please fill all fields.";
        return result;
      }
    } else if (find == "4") {
      // Find Centripetal Force
      if (
        isNumeric(t_velocity) &&
        isNumeric(mass) &&
        isNumeric(radius) &&
        t_velocity > 0 &&
        mass > 0 &&
        radius > 0
      ) {
        const t_velocity_value = t_velocity_unit_value * t_velocity;
        const mass_value = mass_unit_value * mass;
        const radius_value = radius * radius_unit_value;
        const find_centripetal_force =
          (mass_value * t_velocity_value * t_velocity_value) / radius_value;

        result.tech_centripetal_force = isNaN(find_centripetal_force)
          ? "NaN"
          : find_centripetal_force;
        result.tech_m = isNaN(mass_value) ? "NaN" : mass_value;
        result.tech_v = isNaN(t_velocity_value) ? "NaN" : t_velocity_value;
        result.tech_r = isNaN(radius_value) ? "NaN" : radius_value;
      } else {
        result.error = "Please fill all fields.";
        return result;
      }
    } else if (find == "5") {
      // Find Angular Velocity
      if (
        isNumeric(c_force) &&
        isNumeric(mass) &&
        isNumeric(radius) &&
        c_force > 0 &&
        mass > 0 &&
        radius > 0
      ) {
        const c_force_value = c_force_unit_value * c_force;
        const mass_value = mass_unit_value * mass;
        const radius_value = radius * radius_unit_value;
        const angular_velocity_result = Math.sqrt(
          c_force_value / (mass_value * radius_value)
        );

        result.tech_angular_velocity = isNaN(angular_velocity_result)
          ? "NaN"
          : angular_velocity_result;
        result.tech_m = isNaN(mass_value) ? "NaN" : mass_value;
        result.tech_c = isNaN(c_force_value) ? "NaN" : c_force_value;
        result.tech_r = isNaN(radius_value) ? "NaN" : radius_value;
      } else {
        result.error = "Please fill all fields.";
        return result;
      }
    } else if (find == "6") {
      // Find Centripetal Acceleration
      if (
        isNumeric(t_velocity) &&
        isNumeric(radius) &&
        t_velocity > 0 &&
        radius > 0
      ) {
        const t_velocity_value = t_velocity_unit_value * t_velocity;
        const radius_value = radius * radius_unit_value;
        const find_angular_acceleration =
          (t_velocity_value * t_velocity_value) / radius_value;

        result.tech_ac = isNaN(find_angular_acceleration)
          ? "NaN"
          : find_angular_acceleration;
        result.tech_v = isNaN(t_velocity_value) ? "NaN" : t_velocity_value;
        result.tech_r = isNaN(radius_value) ? "NaN" : radius_value;
      } else {
        result.error = "Please fill all fields.";
        return result;
      }
    }

    return result;
  }

  /** getCalculationArrowSpeedCalculator
   * POST: /api/calculators-lol/arrow-speed-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationArrowSpeedCalculator(body) {
    let first = body.tech_first;
    let units1 = body.tech_units1;
    let second = body.tech_second;
    let units2 = body.tech_units2;
    let third = body.tech_third;
    let units3 = body.tech_units3;
    let four = body.tech_four;
    let units4 = body.tech_units4;
    let five = body.tech_five;
    let units5 = body.tech_units5;

    function unit1(a, b) {
      if (a === "m/s") return b * 3.281;
      if (a === "km/h") return b / 1.097;
      if (a === "ft/s") return b;
      if (a === "mph") return b * 1.467;
      if (a === "knots") return b * 1.688;
    }

    function unit2(a, b) {
      if (a === "mm") return b / 25.4;
      if (a === "cm") return b / 2.54;
      if (a === "m") return b * 39.37;
      if (a === "km") return b * 39370;
      if (a === "in") return b;
      if (a === "ft") return b * 12;
      if (a === "yd") return b * 36;
      if (a === "mi") return b * 63360;
      if (a === "nmi") return b * 72910;
    }

    function unit3(a, b) {
      if (a === "g") return b / 453.6;
      if (a === "kg") return b * 2.205;
      if (a === "gr") return b / 7000;
      if (a === "oz") return b / 16;
      if (a === "lb") return b;
      if (a === "stone") return b * 14;
    }

    function unit4(a, b) {
      if (a === "mg") return b / 64.799;
      if (a === "g") return b * 15.432;
      if (a === "dag") return b * 154.3;
      if (a === "kg") return b * 15430;
      if (a === "gr") return b;
      if (a === "dr") return b * 60;
      if (a === "oz") return b * 437.5;
      if (a === "lb") return b * 7000;
      if (a === "stone") return b * 98000;
    }

    first = unit1(units1, first);
    second = unit2(units2, second);
    third = unit3(units3, third);
    four = unit4(units4, four);
    five = unit4(units5, five);

    if (
      isFinite(first) &&
      isFinite(second) &&
      isFinite(third) &&
      isFinite(four) &&
      isFinite(five)
    ) {
      let minus1 = second - 30;
      let mul1 = minus1 * 10;
      let div1 = five / 3;
      let part1 = first + mul1 - div1;

      let mul2 = 5 * third;
      let minus2 = four - mul2;
      let div2 = minus2 / 3;
      let minus_mul = div2 * -1;
      let part2 = Math.min(0, minus_mul);

      let speed = part1 + part2;
      let s_ms = speed / 3.281;
      let w_kg = four / 15430;
      let momentum = s_ms * w_kg;
      let sq_speed = Math.pow(s_ms, 2);
      let last_mul = w_kg * sq_speed;
      let k_energy = last_mul / 2;

      return {
        tech_speed: speed,
        tech_momentum: momentum,
        tech_k_energy: k_energy,
      };
    } else {
      return {
        error: "Please fill all fields.",
      };
    }
  }

  /**
   * getCalculationelAngularAccelerationCalculator: Service Method
   * POST: /api/calculators-lol/angular-acceleration-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationelAngularAccelerationCalculator(body) {
    let find = body.tech_find;
    let select1 = body.tech_select1;

    let ta = parseFloat(body.tech_ta) || 0;
    let ta_unit = body.tech_ta_unit;

    let ra = parseFloat(body.tech_ra) || 0;
    let ra_unit = body.tech_ra_unit;

    let aa = parseFloat(body.tech_aa) || 0;
    let select2 = body.tech_select2;

    let torque = parseFloat(body.tech_torque) || 0;
    let moment = parseFloat(body.tech_moment) || 0;

    let select3 = body.tech_select3;

    let inv = parseFloat(body.tech_inv) || 0;
    let inv_unit = body.tech_inv_unit;

    let fnv = parseFloat(body.tech_fnv) || 0;
    let fnv_unit = body.tech_fnv_unit;

    let time = parseFloat(body.tech_time) || 0;
    let time_unit = body.tech_time_unit;

    const result = {};
    let method;
    let ans;

    // Helper function to check if numeric
    function isNumeric(value) {
      return !isNaN(parseFloat(value)) && isFinite(value);
    }

    // Tangential acceleration unit conversion
    let ta_unit_value;
    if (ta_unit == "m/s²") {
      ta_unit_value = 1;
    } else if (ta_unit == "g") {
      ta_unit_value = 9.807;
    }

    // Initial angular velocity unit conversion
    let inv_unit_value;
    if (inv_unit == "rad/s") {
      inv_unit_value = 1;
    } else if (inv_unit == "rpm") {
      inv_unit_value = 0.10472;
    } else if (inv_unit == "Hz") {
      inv_unit_value = 6.283;
    }

    // Final angular velocity unit conversion
    let fnv_unit_value;
    if (fnv_unit == "rad/s") {
      fnv_unit_value = 1;
    } else if (fnv_unit == "rpm") {
      fnv_unit_value = 0.10472;
    } else if (fnv_unit == "Hz") {
      fnv_unit_value = 6.283;
    }

    // Time unit conversion
    let time_unit_value;
    if (time_unit == "sec") {
      time_unit_value = 1;
    } else if (time_unit == "min") {
      time_unit_value = 60;
    } else if (time_unit == "hrs") {
      time_unit_value = 3600;
    } else if (time_unit == "days") {
      time_unit_value = 86400;
    } else if (time_unit == "wks") {
      time_unit_value = 604800;
    } else if (time_unit == "mos") {
      time_unit_value = 2629800;
    } else if (time_unit == "yrs") {
      time_unit_value = 31557600;
    }

    // Helper function to convert radius
    function radius_convert(unit3, value3) {
      let val3;
      if (unit3 == "mm") {
        val3 = value3 * 0.001;
      } else if (unit3 == "cm") {
        val3 = value3 * 0.01;
      } else if (unit3 == "m") {
        val3 = value3 * 1;
      } else if (unit3 == "km") {
        val3 = value3 * 1000;
      } else if (unit3 == "in") {
        val3 = value3 * 0.0254;
      } else if (unit3 == "ft") {
        val3 = value3 * 0.3048;
      } else if (unit3 == "yd") {
        val3 = value3 * 0.9144;
      } else if (unit3 == "mi") {
        val3 = value3 * 1609.3;
      }
      return val3;
    }

    // Main calculation logic
    if (find == "0") {
      if (select1 == "angular_acceleration") {
        method = 1;
        if (isNumeric(ta) && isNumeric(ra)) {
          // Angular Acceleration
          const ta_value = ta * ta_unit_value;
          const ra_value = radius_convert(ra_unit, ra);
          ans = ta_value / ra_value;
          result.tech_first_value = isNaN(ta_value) ? "NAN" : ta_value;
          result.tech_second_value = isNaN(ra_value) ? "NAN" : ra_value;
        } else {
          result.error = "Please fill all fields.";
          return result;
        }
      } else if (select1 == "radius") {
        // Radius
        method = 2;
        if (isNumeric(ta) && isNumeric(aa)) {
          const ta_value = ta * ta_unit_value;
          const aa_value = aa;
          ans = ta_value / aa_value;
          result.tech_first_value = isNaN(aa_value) ? "NAN" : aa_value;
          result.tech_second_value = isNaN(ta_value) ? "NAN" : ta_value;
        } else {
          result.error = "Please fill all fields.";
          return result;
        }
      } else if (select1 == "tangential_acceleration") {
        // Tangential acceleration
        method = 3;
        if (isNumeric(ra) && isNumeric(aa)) {
          const aa_value = aa;
          const ra_value = radius_convert(ra_unit, ra);
          ans = ra_value * aa_value;
          result.tech_first_value = isNaN(aa_value) ? "NAN" : aa_value;
          result.tech_second_value = isNaN(ra_value) ? "NAN" : ra_value;
        } else {
          result.error = "Please fill all fields.";
          return result;
        }
      }
    } else if (find == "1") {
      if (select3 == "angular_acceleration_three") {
        method = 4;
        if (isNumeric(time) && isNumeric(inv) && isNumeric(fnv)) {
          const inv_value = inv * inv_unit_value;
          const fnv_value = fnv * fnv_unit_value;
          const time_value = time * time_unit_value;
          ans = (fnv_value - inv_value) / time_value;
          result.tech_first_value = isNaN(inv_value) ? "NAN" : inv_value;
          result.tech_second_value = isNaN(fnv_value) ? "NAN" : fnv_value;
          result.tech_third_value = isNaN(time_value) ? "NAN" : time_value;
        } else {
          result.error = "Please fill all fields.";
          return result;
        }
      } else if (select3 == "time") {
        method = 5;
        if (isNumeric(aa) && isNumeric(inv) && isNumeric(fnv)) {
          const inv_value = inv * inv_unit_value;
          const fnv_value = fnv * fnv_unit_value;
          const aa_value = aa;
          ans = (fnv_value - inv_value) / aa_value;
          result.tech_first_value = isNaN(inv_value) ? "NAN" : inv_value;
          result.tech_second_value = isNaN(fnv_value) ? "NAN" : fnv_value;
          result.tech_third_value = isNaN(aa_value) ? "NAN" : aa_value;
        } else {
          result.error = "Please fill all fields.";
          return result;
        }
      } else if (select3 == "inv") {
        method = 6;
        if (isNumeric(time) && isNumeric(aa) && isNumeric(fnv)) {
          const time_value = time * time_unit_value;
          const fnv_value = fnv * fnv_unit_value;
          const aa_value = aa;
          ans = fnv_value - time_value * aa_value;
          result.tech_first_value = isNaN(fnv_value) ? "NAN" : fnv_value;
          result.tech_second_value = isNaN(time_value) ? "NAN" : time_value;
          result.tech_third_value = isNaN(aa_value) ? "NAN" : aa_value;
        } else {
          result.error = "Please fill all fields.";
          return result;
        }
      } else if (select3 == "fnv") {
        method = 7;
        if (isNumeric(time) && isNumeric(aa) && isNumeric(inv)) {
          const time_value = time * time_unit_value;
          const inv_value = inv * inv_unit_value;
          const aa_value = aa;
          ans = time_value * aa_value + inv_value;
          result.tech_first_value = isNaN(inv_value) ? "NAN" : inv_value;
          result.tech_second_value = isNaN(time_value) ? "NAN" : time_value;
          result.tech_third_value = isNaN(aa_value) ? "NAN" : aa_value;
        } else {
          result.error = "Please fill all fields.";
          return result;
        }
      }
    } else if (find == "2") {
      if (select2 == "angular_acceleration_two") {
        method = 8;
        if (isNumeric(torque) && isNumeric(moment)) {
          ans = torque / moment;
          result.tech_first_value = isNaN(torque) ? "NAN" : torque;
          result.tech_second_value = isNaN(moment) ? "NAN" : moment;
        } else {
          result.error = "Please fill all fields.";
          return result;
        }
      } else if (select2 == "mass") {
        method = 9;
        if (isNumeric(torque) && isNumeric(aa)) {
          ans = torque / aa;
          result.tech_first_value = isNaN(torque) ? "NAN" : torque;
          result.tech_second_value = isNaN(aa) ? "NAN" : aa;
        } else {
          result.error = "Please fill all fields.";
          return result;
        }
      } else if (select2 == "total_torque_two") {
        method = 10;
        if (isNumeric(aa) && isNumeric(moment)) {
          ans = aa * moment;
          result.tech_first_value = isNaN(moment) ? "NAN" : moment;
          result.tech_second_value = isNaN(aa) ? "NAN" : aa;
        } else {
          result.error = "Please fill all fields.";
          return result;
        }
      }
    }

    result.tech_method = method;
    result.tech_ans = isNaN(ans) ? "NAN" : ans;
    return result;
  }

  /**
   * getCalculationelTensionCalculator: Service Method
   * POST: /api/calculators-lol/tension-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationelTensionCalculator(body) {
    let type = body.tech_type;
    let operations1 = parseFloat(body.tech_operations1) || 0;
    let operations2 = parseFloat(body.tech_operations2) || 0;

    let first = parseFloat(body.tech_first) || 0;
    let unit1 = body.tech_unit1;

    let second = parseFloat(body.tech_second) || 0;
    let unit2 = body.tech_unit2;

    let third = parseFloat(body.tech_third) || 0;
    let unit3 = body.tech_unit3;

    let four = parseFloat(body.tech_four) || 0;
    let unit4 = body.tech_unit4;

    let five = parseFloat(body.tech_five) || 0;
    let unit5 = body.tech_unit5;

    let six = parseFloat(body.tech_six) || 0;
    let unit6 = body.tech_unit6;

    let seven = parseFloat(body.tech_seven) || 0;
    let unit7 = body.tech_unit7;

    const result = {};

    // Helper function to check if numeric
    function isNumeric(value) {
      return !isNaN(parseFloat(value)) && isFinite(value);
    }

    // Helper function to convert mass to kg
    function kilo(a, b) {
      let convert;
      if (a == "mg") {
        convert = b / 1000000;
      } else if (a == "g") {
        convert = b / 1000;
      } else if (a == "kg") {
        convert = b * 1;
      } else if (a == "t") {
        convert = b * 1000;
      } else if (a == "oz") {
        convert = b / 35.274;
      } else if (a == "lb") {
        convert = b / 2.205;
      }
      return convert;
    }

    // Helper function to convert acceleration to m/s²
    function meter(a, b) {
      let convert2;
      if (a == "m/s²") {
        convert2 = b * 1;
      } else if (a == "g") {
        convert2 = b * 9.807;
      } else if (a == "ft/s²") {
        convert2 = b * 0.3048;
      }
      return convert2;
    }

    // Helper function to convert angle to degrees
    function degree(a, b) {
      let convert3;
      if (a == "deg") {
        convert3 = b * 1;
      } else if (a == "rad") {
        convert3 = b * 57.296;
      } else if (a == "gon") {
        convert3 = b * 0.9;
      }
      return convert3;
    }

    // Helper function to convert force to Newton
    function newton(a, b) {
      let convert4;
      if (a == "N") {
        convert4 = b * 1;
      } else if (a == "kN") {
        convert4 = b * 1000;
      } else if (a == "MN") {
        convert4 = b * 1000000;
      } else if (a == "lbf") {
        convert4 = b * 4.44822;
      } else if (a == "kip") {
        convert4 = b * 4448.2216;
      }
      return convert4;
    }

    // Convert all input values
    const first_value = kilo(unit1, first);
    const second_value = kilo(unit2, second);
    const third_value = kilo(unit3, third);
    const four_value = meter(unit4, four);
    const five_value = degree(unit5, five);
    const six_value = degree(unit6, six);
    const seven_value = newton(unit7, seven);

    // Main calculation logic
    if (type == "1") {
      if (operations1 == "1") {
        if (isNumeric(first) && isNumeric(four)) {
          if (first_value > 0) {
            if (four_value > 0) {
              const weight = first_value * four_value;
              const t_ans = weight;
              result.tech_weight = isNaN(weight) ? "NAN" : weight;
              result.tech_t_ans = isNaN(t_ans) ? "NAN" : t_ans;
            } else {
              result.error =
                "Please input a gravitational acceleration that is greater than 0.";
              return result;
            }
          } else {
            result.error =
              "Please input a positive value for the object's mass.";
            return result;
          }
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      } else if (operations1 == "2") {
        const answer1 = first_value * four_value;
        const cos_a = Math.cos((five_value * Math.PI) / 180);
        const sin_b = Math.sin((six_value * Math.PI) / 180);
        const cos_b = Math.cos((six_value * Math.PI) / 180);
        const sin_a = Math.sin((five_value * Math.PI) / 180);

        const multiply = cos_a * sin_b;
        const divide = multiply / cos_b;
        const t1 = divide + sin_a;
        const t1_ans = answer1 / t1;

        const multiply2 = cos_b * sin_a;
        const divide2 = multiply2 / cos_a;
        const t2 = divide2 + sin_b;
        const t2_ans = answer1 / t2;

        result.tech_weight2 = isNaN(answer1) ? "NAN" : answer1;
        result.tech_t1_ans = isNaN(t1_ans) ? "NAN" : t1_ans;
        result.tech_t2_ans = isNaN(t2_ans) ? "NAN" : t2_ans;
      }
    } else if (type == "2") {
      if (operations2 == "1") {
        if (isNumeric(first) && isNumeric(five) && isNumeric(seven)) {
          if (first_value > 0) {
            if (five_value > 0 && five_value < 90) {
              if (seven_value > 0) {
                const cos = Math.cos((five_value * Math.PI) / 180);
                const mul = cos * seven_value;
                const ans = mul / first_value;
                const answer2 = seven_value;
                result.tech_ans = isNaN(ans) ? "NAN" : ans;
                result.tech_op21 = isNaN(answer2) ? "NAN" : answer2;
              } else {
                result.error = "Acceleration must be of positive value.";
                return result;
              }
            } else {
              result.error =
                "Please enter a positive value for angle θ that is also less than 90 degrees.";
              return result;
            }
          } else {
            result.error = "Please enter a positive value for mass.";
            return result;
          }
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      } else if (operations2 == "2") {
        if (
          isNumeric(first) &&
          isNumeric(second) &&
          isNumeric(five) &&
          isNumeric(seven)
        ) {
          if (first_value > 0) {
            if (second_value > 0) {
              if (five_value > 0 && five_value < 90) {
                if (seven_value > 0) {
                  const both_add = first_value + second_value;
                  const answer2 = seven_value;
                  const cos = Math.cos((five_value * Math.PI) / 180);
                  const mul = cos * seven_value;
                  const ans = mul / both_add;
                  const answer = seven_value;
                  const answer2_calc = ans * second_value;
                  result.tech_ans = isNaN(ans) ? "NAN" : ans;
                  result.tech_op22 = isNaN(answer) ? "NAN" : answer;
                  result.tech_answer2 = isNaN(answer2_calc)
                    ? "NAN"
                    : answer2_calc;
                } else {
                  result.error = "Acceleration must be of positive value.";
                  return result;
                }
              } else {
                result.error =
                  "Please enter a positive value for angle θ that is also less than 90 degrees.";
                return result;
              }
            } else {
              result.error = "Please enter a positive value for second mass";
              return result;
            }
          } else {
            result.error = "Please enter a positive value for first mass.";
            return result;
          }
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      } else if (operations2 == "3") {
        if (
          isNumeric(first) &&
          isNumeric(third) &&
          isNumeric(second) &&
          isNumeric(five) &&
          isNumeric(seven)
        ) {
          if (first_value > 0) {
            if (second_value > 0) {
              if (five_value > 0 && five_value < 90) {
                if (seven_value > 0) {
                  if (third_value > 0) {
                    const both_add = first_value + second_value + third_value;
                    const answer2 = seven_value;
                    const cos = Math.cos((five_value * Math.PI) / 180);
                    const mul = cos * seven_value;
                    const ans = mul / both_add;
                    const answer2_calc = seven_value;
                    const answer3 = ans * (second_value + third_value);
                    const answer4 = ans * third_value;
                    result.tech_ans = isNaN(ans) ? "NAN" : ans;
                    result.tech_answer2 = isNaN(answer2_calc)
                      ? "NAN"
                      : answer2_calc;
                    result.tech_op23 = isNaN(answer3) ? "NAN" : answer3;
                    result.tech_answer4 = isNaN(answer4) ? "NAN" : answer4;
                  } else {
                    result.error =
                      "Please enter a positive value for third mass.";
                    return result;
                  }
                } else {
                  result.error = "Acceleration must be of positive value.";
                  return result;
                }
              } else {
                result.error =
                  "Please enter a positive value for angle θ that is also less than 90 degrees.";
                return result;
              }
            } else {
              result.error = "Please enter a positive value for second mass";
              return result;
            }
          } else {
            result.error = "Please enter a positive value for first mass.";
            return result;
          }
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      }
    }

    return result;
  }
  /** getCalculationElectricityCostCalculator
   * POST: /api/calculators-lol/electricity-cost-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationElectricityCostCalculator(body) {
    let type = body.tech_unit_type;

    let f_first = body.tech_f_first;
    let f_second = body.tech_f_second;
    let f_third = body.tech_f_third;

    let first = body.tech_first;
    let units1 = body.tech_units1;
    let second = body.tech_second;

    let third = body.tech_third;
    let units3 = body.tech_units3;

    function watt(a, b) {
      if (a === "mW") return b / 1000;
      if (a === "W") return b;
      if (a === "kW") return b * 1000;
      if (a === "MW") return b * 1000000;
      if (a === "GW") return b * 1000000000;
      if (a === "BTU") return b * 0.293071;
      if (a === "hp(l)") return b * 745.7;
    }

    function mont(a, b) {
      if (a === "days") return b * 30.4375;
      if (a === "wks") return b * 4.34821;
      if (a === "mons") return b;
      if (a === "yrs") return b * 0.0833333;
    }

    let answer, cost;

    if (type === "simple") {
      first = watt(units1, first);
      third = mont(units3, third);

      if (isFinite(first) && isFinite(second) && isFinite(third)) {
        let multiply = first * third;
        answer = multiply / 1000;
        cost = answer * second;
      } else {
        return { error: "Please fill all fields." };
      }
    } else if (type === "advance") {
      if (isFinite(f_first) && isFinite(f_second) && isFinite(f_third)) {
        let mul1 = f_second * 30;
        let mul2 = mul1 * f_first;
        answer = mul2 / 1000;
        cost = answer * f_third;
      } else {
        return { error: "Please fill all fields." };
      }
    }

    return {
      tech_answer: answer,
      tech_cost: cost,
    };
  }

  /** getCalculationAirDensityCalculator
   * POST: /api/calculators-lol/air-density-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationAirDensityCalculator(body) {
    let first = body.tech_first;
    let unit1 = body.tech_unit1;
    let second = body.tech_second;
    let unit2 = body.tech_unit2;
    let operations1 = body.tech_operations1;
    let third = body.tech_third;

    let convert1, convert2;
    function pascal(a, b) {
      if ((a = "Pa")) {
        convert1 = b * 1;
      } else if ((a = "mb")) {
        convert1 = b * 100;
      } else if ((a = "bar")) {
        convert1 = b * 100000;
      } else if ((a = "psi")) {
        convert1 = b * 6895;
      } else if ((a = "atm")) {
        convert1 = b * 101325;
      } else if ((a = "torr")) {
        convert1 = b * 133.32;
      } else if ((a = "hPa")) {
        convert1 = b * 100;
      } else if ((a = "kPa")) {
        convert1 = b * 1000;
      } else if ((a = "inHg")) {
        convert1 = b * 3386.4;
      } else if ((a = "mmHg")) {
        convert1 = b * 133.32;
      }
      return convert1;
    }
    function kelvinC(a, b) {
      if ((a = "°C")) {
        convert2 = b * 1;
      } else if ((a = "°F")) {
        convert2 = (b - 32) * 0.55555555555555555555555555555556;
      } else if ((a = "K")) {
        convert2 = b - 273.15;
      }
      return convert2;
    }
    function kelvinK(a, b) {
      if ((a = "°C")) {
        convert2 = b + 274.15;
      } else if ((a = "°F")) {
        convert2 = (b - 32) * 0.55555555555555555555555555555556 + 273.15;
      } else if ((a = "K")) {
        convert2 = b * 1;
      }
      return convert2;
    }

    let result = { tech_operations1: operations1 };

    if (operations1 == "1") {
      first = pascal(unit1, first);
      // console.log(second,'ggg');
      second = kelvinK(unit2, second);

      if (isFinite(first) && isFinite(second)) {
        let mul = second * 287.05;
        console.log(first, mul);
        result.tech_air_density = first / mul;
      } else {
        return { error: "Please fill all fields." };
      }
    } else if (operations1 == "2") {
      first = pascal(unit1, first);
      second = kelvinC(unit2, second);

      if (isFinite(first) && isFinite(second) && isFinite(third)) {
        if (third > 0) {
          let P = first / 6895;
          let T = second * 1.8 + 32 + 459.67;
          let psi = third / 100;
          let Md = 28.97;
          let Mw = 18.0;
          let Rbar = 1545;
          let ps =
            0.08865 *
            Math.exp((-0.002369 * (T - 8375.65) * (T - 491.67)) / (T - 28.818));
          let air_density =
            ((P * Md + psi * ps * (Mw - Md)) / Rbar / T / 12 / 32.174) *
            12 *
            12 *
            12;

          let add = second + 237.3;
          let mul1 = 7.5 * second;
          let div = mul1 / add;
          let base = Math.pow(10, div);
          let p1 = base * 6.1078;
          let pv = p1 * third;
          let pd = first - pv;
          let d_mul1 = 287.058 * first;
          let d_mul2 = third * first;

          let l_div = d_mul1 === 0 ? 0 : pd / d_mul1;
          let r_div = d_mul2 === 0 ? 0 : pv / d_mul2;

          let p = l_div + r_div;
          let a_ln = Math.log10(third / 100);
          let a = a_ln + (17.62 * second) / (243.12 + second);
          let dp = (243.12 * a) / (17.62 - a);

          result.tech_dp = dp;
          result.tech_pv = pv;
          result.tech_pd = pd;
          result.tech_air_density = air_density;
        } else {
          return { error: "Relative humidity must be greater than zero!" };
        }
      } else {
        return { error: "Please fill all fields." };
      }
    }

    return result;
  }

  /**
   * getCalculationelHeatIndexCalculator: Service Method
   * POST: /api/calculators-lol/heat-index-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationelHeatIndexCalculator(body) {
    const request = body;
    const param = {};

    let find = request.tech_find;
    let temp = parseFloat(request.tech_temp);
    let temp_unit = request.tech_temp_unit;
    let hum = parseFloat(request.tech_hum);
    let hum_unit = request.tech_hum_unit;
    let dew_point = parseFloat(request.tech_dew_point);
    let dew_point_unit = request.tech_dew_point_unit;

    if (temp_unit == "°C") {
      temp_unit = "1";
    } else if (temp_unit == "°F") {
      temp_unit = "2";
    } else if (temp_unit == "°K") {
      temp_unit = "3";
    }

    if (hum_unit == "%") {
      hum_unit = "1";
    } else if (hum_unit == "‰") {
      hum_unit = "0.1";
    } else if (hum_unit == "‱") {
      hum_unit = "0.0001";
    }

    if (dew_point_unit == "°C") {
      dew_point_unit = "1";
    } else if (dew_point_unit == "°F") {
      dew_point_unit = "2";
    } else if (dew_point_unit == "°K") {
      dew_point_unit = "3";
    }

    const a = 17.62;
    const b = 243.12;
    const tmv = temp;
    let hi, tmp, ans;

    if (find == "1") {
      if (temp_unit == "1") {
        if (!isNaN(temp) && !isNaN(hum)) {
          tmp = temp;
          temp = (temp * 9) / 5 + 32;
          if (hum > 100) {
            param.error = "Relative humidity cannot exceed 100%.";
            return param;
          } else if (hum < 0) {
            param.error = "Relative humidity cannot be less than 0%.";
            return param;
          } else if (temp <= 40.0) {
            hi = temp;
          } else {
            hum = hum * hum_unit;
            let hitemp = 61.0 + (temp - 68.0) * 1.2 + hum * 0.094;
            let fptemp = temp;
            let hifinal = 0.5 * (fptemp + hitemp);
            if (hifinal > 79) {
              hi =
                -42.379 +
                2.04901523 * temp +
                10.14333127 * hum -
                0.22475541 * temp * hum -
                6.83783 * Math.pow(10, -3) * Math.pow(temp, 2) -
                5.481717 * Math.pow(10, -2) * Math.pow(hum, 2) +
                1.22874 * Math.pow(10, -3) * Math.pow(temp, 2) * hum +
                8.5282 * Math.pow(10, -4) * temp * Math.pow(hum, 2) -
                1.99 * Math.pow(10, -6) * Math.pow(temp, 2) * Math.pow(hum, 2);
              if (hum <= 13 && temp >= 80 && temp <= 112) {
                let adj1 = (13.0 - hum) / 4.0;
                let adj2 = Math.sqrt((17.0 - Math.abs(temp - 95.0)) / 17.0);
                let adj = adj1 * adj2;
                hi = hi - adj;
              } else if (hum > 85 && temp >= 80 && temp <= 87) {
                let adj1 = (hum - 85.0) / 10.0;
                let adj2 = (87.0 - temp) / 5.0;
                let adj = adj1 * adj2;
                hi = hi + adj;
              }
            } else {
              hi = hifinal;
            }
          }
        } else {
          param.error = "Please fill all fields.";
          return param;
        }
      } else if (temp_unit == "2") {
        tmp = temp;
        if (!isNaN(temp) && !isNaN(hum)) {
          if (hum > 100) {
            param.error = "Relative humidity cannot exceed 100%.";
            return param;
          } else if (hum < 0) {
            param.error = "Relative humidity cannot be less than 0%.";
            return param;
          } else if (temp <= 40.0) {
            hi = temp;
          } else {
            hum = hum * hum_unit;
            let hitemp = 61.0 + (temp - 68.0) * 1.2 + hum * 0.094;
            let fptemp = temp;
            let hifinal = 0.5 * (fptemp + hitemp);
            if (hifinal > 79) {
              hi =
                -42.379 +
                2.04901523 * temp +
                10.14333127 * hum -
                0.22475541 * temp * hum -
                6.83783 * Math.pow(10, -3) * Math.pow(temp, 2) -
                5.481717 * Math.pow(10, -2) * Math.pow(hum, 2) +
                1.22874 * Math.pow(10, -3) * Math.pow(temp, 2) * hum +
                8.5282 * Math.pow(10, -4) * temp * Math.pow(hum, 2) -
                1.99 * Math.pow(10, -6) * Math.pow(temp, 2) * Math.pow(hum, 2);
              if (hum <= 13 && temp >= 80.0 && temp <= 112.0) {
                let adj1 = (13.0 - hum) / 4.0;
                let adj2 = Math.sqrt((17.0 - Math.abs(temp - 95.0)) / 17.0);
                let adj = adj1 * adj2;
                hi = hi - adj;
              } else if (hum > 85 && temp >= 80 && temp <= 87) {
                let adj1 = (hum - 85.0) / 10.0;
                let adj2 = (87.0 - temp) / 5.0;
                let adj = adj1 * adj2;
                hi = hi + adj;
              }
            } else {
              hi = hifinal;
            }
          }
        } else {
          param.error = "Please fill all fields.";
          return param;
        }
      } else if (temp_unit == "3") {
        tmp = temp;
        if (!isNaN(temp) && !isNaN(hum)) {
          hi = ((temp - 273.15) * 9) / 5 + 32.0;
        } else {
          param.error = "Please fill all fields.";
          return param;
        }
      }
      if (temp_unit == "2") {
        tmp = ((tmp - 32) * 5) / 9;
      } else if (temp_unit == "3") {
        tmp = tmp - 273.15;
      }
      let afun = Math.log(hum / 100) + (a * tmp) / (b + tmp);
      let dp = (b * afun) / (a - afun);
      param.tech_dp = !isFinite(dp) || isNaN(dp) ? "NAN" : dp;
    } else if (find == "2") {
      if (
        temp_unit == "1" ||
        (temp_unit == "2" && dew_point_unit == "1") ||
        dew_point_unit == "2" ||
        dew_point_unit == "3"
      ) {
        if (!isNaN(temp) && !isNaN(dew_point)) {
          tmp = temp;
          let dew = dew_point;
          if (temp_unit == "1") {
            temp = (temp * 9) / 5 + 32;
          }
          if (dew_point_unit == "1") {
            dew_point = (dew_point * 9) / 5 + 32;
          }
          let tc2 = (temp - 32) * 0.556;
          let tdc2 = (dew_point - 32) * 0.556;
          if (tc2 < tdc2) {
            param.error =
              "Dew Point temperature cannot be greater than the air temperature.";
            return param;
          } else if (temp <= 40.0) {
            hi = temp;
          } else {
            let vaporpressure =
              6.11 * Math.pow(10, 7.5 * (tdc2 / (237.7 + tdc2)));
            let satvaporpressure =
              6.11 * Math.pow(10, 7.5 * (tc2 / (237.7 + tc2)));
            let RHumidity2 = Math.round(
              100.0 * (vaporpressure / satvaporpressure)
            );
            let hitemp = 61.0 + (temp - 68.0) * 1.2 + RHumidity2 * 0.094;
            let fptemp = temp;
            let hifinal = 0.5 * (fptemp + hitemp);
            if (hifinal > 79.0) {
              hi =
                -42.379 +
                2.04901523 * temp +
                10.14333127 * RHumidity2 -
                0.22475541 * temp * RHumidity2 -
                6.83783 * Math.pow(10, -3) * Math.pow(temp, 2) -
                5.481717 * Math.pow(10, -2) * Math.pow(RHumidity2, 2) +
                1.22874 * Math.pow(10, -3) * Math.pow(temp, 2) * RHumidity2 +
                8.5282 * Math.pow(10, -4) * temp * Math.pow(RHumidity2, 2) -
                1.99 *
                  Math.pow(10, -6) *
                  Math.pow(temp, 2) *
                  Math.pow(RHumidity2, 2);

              if (RHumidity2 <= 13.0 && temp >= 80.0 && temp <= 112.0) {
                let adj1 = (13.0 - RHumidity2) / 4.0;
                let adj2 = Math.sqrt((17.0 - Math.abs(temp - 95.0)) / 17.0);
                let adj = adj1 * adj2;
                hi = hi - adj;
              } else if (RHumidity2 > 85.0 && temp >= 80.0 && temp <= 87.0) {
                let adj1 = (RHumidity2 - 85.0) / 10.0;
                let adj2 = (87.0 - temp) / 5.0;
                let adj = adj1 * adj2;
                hi = hi + adj;
              }
            } else {
              hi = hifinal;
            }
          }

          if (temp_unit == "2") {
            tmp = ((tmp - 32) * 5) / 9;
          } else if (temp_unit == "3") {
            tmp = tmp - 273.15;
          }
          if (dew_point_unit == "2") {
            dew = ((dew - 32) * 5) / 9;
          } else if (dew_point_unit == "3") {
            dew = dew - 273.15;
          }
          let rh_numer = 100.0 * Math.exp((a * dew) / (dew + b));
          let rh_denom = Math.exp((a * tmp) / (tmp + b));
          hum = rh_numer / rh_denom;
          param.tech_hum = !isFinite(hum) || isNaN(hum) ? "NAN" : hum;
        } else {
          param.error = "Please fill all fields.";
          return param;
        }
      } else {
        if (!isNaN(temp) && !isNaN(dew_point)) {
          hi = (temp - 273.15) * 1.8 + 32;
          tmp = temp;
          if (temp_unit == "3") {
            tmp = tmp - 273.15;
          }
          let rh_numer = 100.0 * Math.exp((a * dew_point) / (dew_point + b));
          let rh_denom = Math.exp((a * tmp) / (tmp + b));
          hum = rh_numer / rh_denom;
          console.log(hum, "bilal");

          param.tech_hum = !isFinite(hum) || isNaN(hum) ? "NAN" : hum;
        } else {
          param.error = "Please! Check Your Input";
          return param;
        }
      }
    } else if (find == "3") {
      if (dew_point_unit == "1" || dew_point_unit == "2") {
        if (!isNaN(hum) && !isNaN(dew_point)) {
          if (hum > 100) {
            param.error = "Relative humidity cannot exceed 100%.";
            return param;
          } else if (hum <= 0) {
            param.error = "Relative humidity must be greater than 0%";
            return param;
          } else {
            if (dew_point_unit === "2") {
              dew_point = ((dew_point - 32) * 5) / 9;
            } else if (dew_point_unit === "3") {
              dew_point = dew_point - 273.15;
            }
            let gamma = (a * dew_point) / (b + dew_point);
            let temp_numer = b * (gamma - Math.log(hum / 100.0));
            let temp_denom = a + Math.log(hum / 100.0) - gamma;
            temp = Math.round(temp_numer / temp_denom);

            param.tech_temp = !isFinite(temp) || isNaN(temp) ? "NAN" : temp;
            temp = (temp * 9) / 5 + 32;
            tmp = temp;
            if (temp <= 40.0) {
              hi = temp;
            } else {
              hum = hum * hum_unit;
              let hitemp = 61.0 + (temp - 68.0) * 1.2 + hum * 0.094;
              let fptemp = temp;
              let hifinal = 0.5 * (fptemp + hitemp);
              if (hifinal > 79) {
                hi =
                  -42.379 +
                  2.04901523 * temp +
                  10.14333127 * hum -
                  0.22475541 * temp * hum -
                  6.83783 * Math.pow(10, -3) * Math.pow(temp, 2) -
                  5.481717 * Math.pow(10, -2) * Math.pow(hum, 2) +
                  1.22874 * Math.pow(10, -3) * Math.pow(temp, 2) * hum +
                  8.5282 * Math.pow(10, -4) * temp * Math.pow(hum, 2) -
                  1.99 *
                    Math.pow(10, -6) *
                    Math.pow(temp, 2) *
                    Math.pow(hum, 2);
                if (hum <= 13 && temp >= 80 && temp <= 112) {
                  let adj1 = (13.0 - hum) / 4.0;
                  let adj2 = Math.sqrt((17.0 - Math.abs(temp - 95.0)) / 17.0);
                  let adj = adj1 * adj2;
                  hi = hi - adj;
                } else if (hum > 85 && temp >= 80 && temp <= 87) {
                  let adj1 = (hum - 85.0) / 10.0;
                  let adj2 = (87.0 - temp) / 5.0;
                  let adj = adj1 * adj2;
                  hi = hi + adj;
                }
              } else {
                hi = hifinal;
              }
            }
          }
        } else {
          param.error = "Please fill all fields.";
          return param;
        }
      }
    }
    ans = Math.log(hum / 100) + (a * parseFloat(tmp)) / (b + parseFloat(tmp));
    param.tech_tmv = !isFinite(tmv) || isNaN(tmv) ? "NAN" : tmv;
    param.tech_temp_unit = temp_unit;
    param.tech_ans = !isFinite(ans) || isNaN(ans) ? "NAN" : ans;
    param.tech_hi = !isFinite(hi) || isNaN(hi) ? "NAN" : hi;
    param.tech_humm = !isFinite(hum) || isNaN(hum) ? "NAN" : hum;

    return param;
  }

  /**
   * getCalculationelReynoldsNumberCalculator: Service Method
   * POST: /api/calculators-lol/reynolds-number-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationelReynoldsNumberCalculator(body) {
    const param = {};

    const fluid_substance = body.tech_fluid_substance;
    let fluid_velocity = body.tech_fluid_velocity;
    const fluid_velocity_unit = body.tech_fluid_velocity_unit;
    let linear_dimension = body.tech_linear_dimension;
    const linear_dimension_unit = body.tech_linear_dimension_unit;
    let dynamic_velocity = body.tech_dynamic_velocity;
    const dynamic_velocity_unit = body.tech_dynamic_velocity_unit;
    let fluid_density = body.tech_fluid_density;
    const fluid_density_unit = body.tech_fluid_density_unit;

    function convert_to_meter(unit, value) {
      let ans1;
      if (unit == "mm") {
        ans1 = value / 100;
      } else if (unit == "cm") {
        ans1 = value / 1000;
      } else if (unit == "m") {
        ans1 = value;
      } else if (unit == "km") {
        ans1 = value * 1000;
      } else if (unit == "in") {
        ans1 = value / 39.37;
      } else if (unit == "ft") {
        ans1 = value / 3.281;
      } else if (unit == "yd") {
        ans1 = value / 1.094;
      } else if (unit == "mi") {
        ans1 = value * 1609;
      }
      return ans1;
    }

    function convert_to_meter_per_sec(unit, value) {
      let ans2;
      if (unit == "m-s") {
        ans2 = value;
      } else if (unit == "km-h") {
        ans2 = value / 3.6;
      } else if (unit == "ft/s") {
        ans2 = value / 3.281;
      } else if (unit == "mi-h") {
        ans2 = value / 2.237;
      }
      return ans2;
    }

    function convert_to_kg_m3(unit, value) {
      let ans3;
      if (unit == "kg/m³") {
        ans3 = value;
      } else if (unit == "kg/dm³") {
        ans3 = value * 1000;
      } else if (unit == "t/m³") {
        ans3 = value * 1000;
      } else if (unit == "g/cm³") {
        ans3 = value * 1000;
      } else if (unit == "oz/cu in") {
        ans3 = value * 1730;
      } else if (unit == "lb/cu in") {
        ans3 = value * 27680;
      } else if (unit == "lb/cu ft") {
        ans3 = value * 16.02;
      } else if (unit == "lb/cu yd") {
        ans3 = value * 0.5933;
      }
      return ans3;
    }

    function convert_to_kg_m_s(unit, value) {
      let ans;
      if (unit == "kg-m-s") {
        ans = value;
      } else if (unit == "p") {
        ans = value * 0.1;
      } else if (unit == "cp") {
        ans = value * 0.001;
      } else if (unit == "mpas") {
        ans = value * 0.001;
      } else if (unit == "pas") {
        ans = value * 1;
      } else if (unit == "slug") {
        ans = value * 47.88;
      } else if (unit == "lbfs-ft2") {
        ans = value * 47.88;
      } else if (unit == "lb-fts") {
        ans = value * 1.4882;
      } else if (unit == "dynas-cm2") {
        ans = value * 0.1;
      } else if (unit == "g-cms") {
        ans = value * 0.1;
      } else if (unit == "reyn") {
        ans = value * 6890;
      }
      return ans;
    }

    if (fluid_substance && !isNaN(fluid_velocity) && !isNaN(linear_dimension)) {
      let density, dynamic, kinematic;

      if (fluid_substance == "custom") {
        if (
          !isNaN(dynamic_velocity) &&
          !isNaN(fluid_density) &&
          fluid_density > 0
        ) {
          density = convert_to_kg_m3(fluid_density_unit, fluid_density);
          dynamic = convert_to_kg_m_s(dynamic_velocity_unit, dynamic_velocity);
          kinematic = dynamic / density;
        } else {
          param.error = "Please fill all fields.";
          return param;
        }
      } else {
        const array = fluid_substance.split("|");
        density = parseFloat(array[0]);
        dynamic = parseFloat(array[1]);
        kinematic = parseFloat(array[2]);
      }

      const linear_dimension_m = convert_to_meter(
        linear_dimension_unit,
        linear_dimension
      );
      const fluid_velocity_m = convert_to_meter_per_sec(
        fluid_velocity_unit,
        fluid_velocity
      );
      const reynolds = Math.round(
        (fluid_velocity_m * linear_dimension_m) / kinematic
      );

      param.tech_kinematic = isNaN(kinematic) ? "NAN" : kinematic;
      param.tech_reynolds = isNaN(reynolds) ? "NAN" : reynolds;
      return param;
    } else {
      param.error = "Please fill all fields.";
      return param;
    }
  }

  /** getCalculationTimeofFlightCalculator
   * POST: /api/calculators-lol/time-of-flight-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationTimeofFlightCalculator(body) {
    let a = parseFloat(body.tech_a);
    let a_unit = body.tech_a_unit?.trim();
    let h = parseFloat(body.tech_h);
    let h_unit = body.tech_h_unit?.trim();
    let v = parseFloat(body.tech_v);
    let v_unit = body.tech_v_unit?.trim();
    let g = parseFloat(body.tech_g);
    let g_unit = body.tech_g_unit?.trim();

    let param = {};

    function sigFig(value, digits) {
      if (value === 0) {
        return 0;
      }
      const decimalPlaces =
        digits - Math.floor(Math.log10(Math.abs(value))) - 1;
      return parseFloat(value.toFixed(decimalPlaces));
    }

    if (
      !isNaN(a) &&
      !isNaN(h) &&
      !isNaN(v) &&
      !isNaN(g) &&
      a_unit &&
      h_unit &&
      v_unit &&
      g_unit
    ) {
      // Convert height
      if (h_unit === "cm") h /= 100;
      else if (h_unit === "km") h /= 0.001;
      else if (h_unit === "in") h /= 39.37;
      else if (h_unit === "ft") h /= 3.281;
      else if (h_unit === "yd") h /= 1.0936;
      else if (h_unit === "mi") h /= 0.0006214;

      // Convert velocity
      if (v_unit === "kmh") v /= 3.6;
      else if (v_unit === "fts") v /= 3.28;
      else if (v_unit === "mph") v /= 2.237;

      let vx, vy, sin;
      if (a_unit === "deg") {
        vx = v * Math.cos((a * Math.PI) / 180);
        sin = Math.sin((a * Math.PI) / 180);
        vy = v * sin;
      } else {
        vx = v * Math.cos(a);
        sin = Math.sin(a);
        vy = v * sin;
      }

      // Convert gravity
      if (g_unit === "g") {
        g = g * 9.807;
      }

      let tof;
      if (h === 0) {
        const res = 2 * vy;
        tof = (2 * vy) / g;
        param["res"] = sigFig(res, 4);
      } else {
        const gh = 2 * g * h;
        const pvy = Math.pow(vy, 2);
        const vs2gh = pvy + gh;
        const sqrvs2gh = Math.sqrt(vs2gh);
        const vysqrt = vy + sqrvs2gh;
        tof = vysqrt / g;

        param["tech_pvy"] = pvy;
        param["tech_gh"] = gh;
        param["tech_vs2gh"] = vs2gh;
        param["tech_sqrvs2gh"] = sqrvs2gh;
        param["tech_vysqrt"] = sigFig(vysqrt, 4);
      }

      param["tech_h"] = h;
      param["tech_a"] = a;
      param["tech_sin"] = sigFig(sin, 4);
      param["tech_v"] = sigFig(v, 4);
      param["tech_tof"] = sigFig(tof, 4);
      param["tech_check"] = "tof";
      param["tech_g"] = sigFig(g, 4);
      param["tech_vx"] = sigFig(vx, 4);
      param["tech_vy"] = sigFig(vy, 4);
      return param;
    } else {
      return { error: "Please fill all fields." };
    }
  }

  /** getCalculationFrictionalForceCalculator
   * POST: /api/calculators-lol/frictional-force-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationFrictionalForceCalculator(body) {
    let calculate = body.tech_calculate;
    let fr_co = parseFloat(body.tech_fr_co);
    let force = parseFloat(body.tech_force);
    let force_unit = body.tech_force_unit?.trim();
    let fr = parseFloat(body.tech_fr);
    let fr_unit = body.tech_fr_unit?.trim();
    let mass = parseFloat(body.tech_mass);
    let plane = parseFloat(body.tech_plane);
    let gravity = parseFloat(body.tech_gravity);

    let param = {};

    function frictional_unit(unit, value) {
      switch (unit) {
        case "N":
          return value * 1;
        case "kN":
          return value * 1000;
        case "MN":
          return value * 1000000;
        case "GN":
          return value * 1000000000;
        case "TN":
          return value * 1000000000000;
        default:
          return NaN;
      }
    }

    if (calculate === "1") {
      // Calculate Friction Coefficient
      if (!isNaN(force) && !isNaN(fr) && force > 0 && fr > 0) {
        const fr_value = frictional_unit(fr_unit, fr);
        const force_value = frictional_unit(force_unit, force);
        const friction_coefficient = fr_value / force_value;

        param["tech_friction_coefficient"] = friction_coefficient;
        param["tech_fr_value"] = fr_value;
        param["tech_force_value"] = force_value;
      } else {
        return { error: "Please fill all fields." };
      }
    } else if (calculate === "2") {
      // Calculate Normal Force
      if (!isNaN(fr) && !isNaN(fr_co) && fr > 0 && fr_co > 0) {
        const force_value = frictional_unit(fr_unit, fr);
        const calculate_force = force_value / fr_co;

        param["tech_calculate_force"] = calculate_force;
        param["tech_force_value"] = force_value;
        param["tech_fr_co"] = fr_co;
      } else {
        return { error: "Please fill all fields." };
      }
    } else if (calculate === "3") {
      // Friction Force
      if (!isNaN(force) && !isNaN(fr_co) && force > 0 && fr_co > 0) {
        const force_value = frictional_unit(force_unit, force);
        const friction = force_value * fr_co;

        param["tech_friction"] = friction;
        param["tech_force_value"] = force_value;
        param["tech_fr_co"] = fr_co;
      } else {
        return { error: "Please fill all fields." };
      }
    } else if (calculate === "4") {
      // Inclined Plane Friction
      if (
        !isNaN(mass) &&
        !isNaN(plane) &&
        !isNaN(fr_co) &&
        !isNaN(gravity) &&
        mass > 0
      ) {
        if (fr_co > 0 && fr_co < 1) {
          const read = Math.cos((plane * Math.PI) / 180);
          const force_value = fr_co * mass * gravity * read;

          param["tech_friction2"] = force_value;
          param["tech_mass"] = mass;
          param["tech_fr_co"] = fr_co;
          param["tech_plane"] = plane;
          param["tech_read"] = read;
          param["tech_gravity"] = gravity;
        } else {
          return {
            error: "Please! Coefficient of friction should be between 0 and 1",
          };
        }
      } else {
        return { error: "Please fill all fields." };
      }
    }

    return param;
  }

  /** getCalculationQuantmNumberCalculator
   * POST: /api/calculators-lol/quantum-number-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationQuantmNumberCalculator(body) {
    let type = body.tech_type;
    let value = parseInt(body.tech_value);
    let result = {};

    if (type === "principal") {
      if (!isNaN(value)) {
        let angular_momentum = "";
        for (let i = 0; i < value; i++) {
          angular_momentum += i.toString();
        }

        let table = `<table class='w-full text-[18px]'><tr><td class='py-2 border-b'><strong>Principal quantum number (𝑛)</strong></td><td class='py-2 border-b'><strong>Angular momentum quantum number (𝑙)</strong></td><td class='py-2 border-b'><strong>Magnetic quantum number (𝘮ₗ)</strong></td></tr>`;

        for (let i = 0; i < value; i++) {
          let inner = -i;
          for (let j = inner; j <= i; j++) {
            table += `<tr><td class="py-2 border-b">${value}</td><td class="py-2 border-b">${i}</td><td class="py-2 border-b">${j}</td></tr>`;
          }
        }

        table += "</table>";

        result.tech_table = table;
        result.tech_angular_momentum = angular_momentum;
        result.tech_value = value;
      } else {
        return { error: "Please fill all fields." };
      }
    } else if (type === "angular") {
      if (!isNaN(value)) {
        let resultString = "";
        for (let j = -value; j <= value; j++) {
          resultString += "," + j;
        }
        let magnetic = resultString.replace(/^,/, "");
        let num_orbital = 2 * value + 1;

        result.tech_magnetic = magnetic;
        result.tech_num_orbital = num_orbital;
      } else {
        return { error: "Please fill all fields." };
      }
    } else {
      return { error: "Please fill all fields." };
    }

    result.tech_type = type;
    return result;
  }

  /** getCalculationMechanicalEnergyCalculator
   * POST: /api/calculators-lol/mechanical-energy-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationMechanicalEnergyCalculator(body) {
    let mass = parseFloat(body.tech_mass);
    let mass_unit = body.tech_mass_unit?.trim();
    let velocity = parseFloat(body.tech_velocity);
    let velocity_unit = body.tech_velocity_unit?.trim();
    let height = parseFloat(body.tech_height);
    let height_unit = body.tech_height_unit?.trim();
    let engergyunit = body.tech_engergyunit?.trim();

    let param = {};

    function unit_kg(a, b) {
      switch (b) {
        case "kg":
          return a * 1;
        case "g":
          return a / 1000;
        case "mg":
          return a / 1000000;
        case "mu-gr":
          return a / 1000000000;
        case "ct":
          return a / 5000;
        case "lbs":
          return a / 2.205;
        case "troy":
          return a * 0.0311;
        case "ozm":
          return a * 0.02834952;
        case "slug":
          return a * 14.594;
        case "ton(short)":
          return a * 907.2;
        default:
          return NaN;
      }
    }

    function unit_ms(a, b) {
      switch (b) {
        case "m/s":
          return a * 1;
        case "ft/min":
          return a / 196.9;
        case "ft/s":
          return a / 3.281;
        case "km/hr":
          return a / 3.6;
        case "knot (int'l)":
          return a / 1.944;
        case "mph":
          return a / 2.237;
        case "miles/hr":
          return a / 1.151;
        case "miles/min":
          return a * 0.447 * 60;
        case "miles/s":
          return a / 1609;
        case "speed of light":
          return a * 299800000;
        default:
          return NaN;
      }
    }

    function unit_m(a, b) {
      switch (b) {
        case "m":
          return a * 1;
        case "AU":
          return a * 149600000000;
        case "cm":
          return a / 100;
        case "km":
          return a * 1000;
        case "ft":
          return a / 3.281;
        case "in":
          return a / 39.37;
        case "mil":
          return a / 39370;
        case "mm":
          return a / 1000;
        case "nm":
          return a / 1000000000;
        case "mile":
          return a * 1609;
        case "parsec":
          return a * 3.086e16;
        case "pm":
          return a / 1000000000000;
        case "yd":
          return a / 1.094;
        default:
          return NaN;
      }
    }

    function energy_unit(a, b) {
      switch (b) {
        case "1":
          return a * 1;
        case "2":
          return a / 1055;
        case "3":
          return a / 1055;
        case "4":
          return a * 0.239006;
        case "5":
          return a * 6.242e18;
        case "6":
          return a * 10000000;
        case "7":
          return a / 1.356;
        case "8":
          return a * 23.73036;
        case "9":
          return a * 0.0000003725061361;
        case "10":
          return a / 4184;
        case "11":
          return a / 3600000;
        case "12":
          return a / 4184000000;
        case "13":
          return a * 1;
        case "14":
          return a / 3600;
        case "15":
          return a * 1;
        default:
          return NaN;
      }
    }

    if (!isNaN(mass) && !isNaN(velocity) && !isNaN(height)) {
      mass = unit_kg(mass, mass_unit);
      velocity = unit_ms(velocity, velocity_unit);
      height = unit_m(height, height_unit);

      let kinatic_eng = 0.5 * mass * velocity ** 2;
      let potentional_eng = mass * 9.8 * height;
      let mechanical_eng = kinatic_eng + potentional_eng;

      let mechanical_energy = energy_unit(mechanical_eng, engergyunit);
      let kinatic_engrgy = energy_unit(kinatic_eng, engergyunit);
      let potentional_engergy = energy_unit(potentional_eng, engergyunit);

      param.tech_mass = mass;
      param.tech_velocity = velocity;
      param.tech_height = height;
      param.tech_kinatic_eng = kinatic_eng;
      param.tech_potentional_eng = potentional_eng;
      param.tech_mechanical_eng = mechanical_eng;
      param.tech_mechanical_energy = mechanical_energy;
      param.tech_kinatic_engrgy = kinatic_engrgy;
      param.tech_potentional_engergy = potentional_engergy;
    } else {
      return { error: "Please fill all fields." };
    }

    return param;
  }

  /** getCalculationIndexOfRefractionCalculation
   * POST: /api/calculators-lol/index-of-refraction-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationIndexOfRefractionCalculation(body) {
    let selection = body.tech_selection?.trim();
    let medium_v = body.tech_medium_v?.trim();
    let medium_value = parseFloat(body.tech_medium_value);
    let medium_value_unit = body.tech_medium_value_unit?.trim();
    let medium_value_unit1 = body.tech_medium_value_unit1?.trim();
    let medium_v2 = body.tech_medium_v2?.trim();
    let medium_value2 = parseFloat(body.tech_medium_value2);

    let param = {};

    function speed_unit(a, b) {
      if (b == "m/s") {
        return a / 1000;
      } else if (b == "km/s") {
        return a * 1;
      } else if (b == "mi/s") {
        return a * 1.609;
      } else if (b == "c") {
        return a * 299800;
      } else {
        return NaN;
      }
    }
    if (selection === "1") {
      if (!isNaN(medium_value) && !isNaN(medium_value2)) {
        medium_value = speed_unit(medium_value, medium_value_unit);
        console.log(medium_value);
        let index_of_refraction = 299792.46 / medium_value;
        param.tech_index_of_refraction = index_of_refraction;
      } else {
        return { error: "Please fill all fields." };
      }
    } else if (selection === "2") {
      if (!isNaN(medium_value) && !isNaN(medium_value2)) {
        medium_value = speed_unit(medium_value, medium_value_unit);

        medium_value2 = speed_unit(medium_value2, medium_value_unit1);

        console.log(medium_value, medium_value2);

        let index_of_refraction = 299792.46 / medium_value;
        let index_of_refraction2 = 299792.46 / medium_value2;
        let reflective_index = index_of_refraction2 / index_of_refraction;
        param.tech_reflective_index = reflective_index;
      } else {
        return { error: "Please fill all fields." };
      }
    } else {
      return { error: "Invalid selection value." };
    }

    return param;
  }

  /**
   * getCalculationelChangeInMomentumCalculator: Service Method
   * POST: /api/calculators-lol/change-in-momentum-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationelChangeInMomentumCalculator(body) {
    const operations = body.tech_operation ? body.tech_operation.trim() : "";
    const mass = body.tech_mass ? body.tech_mass.trim() : "";
    const mass_unit = body.tech_mass_unit ? body.tech_mass_unit.trim() : "";
    const i_velocity = body.tech_i_velocity ? body.tech_i_velocity.trim() : "";
    const i_velocity_unit = body.tech_i_velocity_unit
      ? body.tech_i_velocity_unit.trim()
      : "";
    const f_velocity = body.tech_f_velocity ? body.tech_f_velocity.trim() : "";
    const f_velocity_unit = body.tech_f_velocity_unit
      ? body.tech_f_velocity_unit.trim()
      : "";
    const c_velocity = body.tech_c_velocity ? body.tech_c_velocity.trim() : "";
    const c_velocity_unit = body.tech_c_velocity_unit
      ? body.tech_c_velocity_unit.trim()
      : "";
    const force = body.tech_force ? body.tech_force.trim() : "";
    const force_unit = body.tech_force_unit ? body.tech_force_unit.trim() : "";
    const time = body.tech_time ? body.tech_time.trim() : "";
    const time_unit = body.tech_time_unit ? body.tech_time_unit.trim() : "";

    // Mass unit conversion function
    function m_unit(a, b) {
      a = parseFloat(a);
      let m_val;

      switch (b) {
        case "kg":
          m_val = a * 1;
          break;
        case "g":
          m_val = a / 1000;
          break;
        case "mg":
          m_val = a / 0.000001;
          break;
        case "µg":
          m_val = a / 1000000000;
          break;
        case "tons(t)":
          m_val = a * 1000;
          break;
        case "US ton":
          m_val = a * 907.2;
          break;
        case "long ton":
          m_val = a * 1016;
          break;
        case "oz":
          m_val = a / 35.274;
          break;
        case "lb":
          m_val = a / 2.205;
          break;
        case "stone":
          m_val = a * 6.35;
          break;
        case "me":
          m_val = a / 1098000000000000000000000000000;
          break;
        case "u":
          m_val = a / 602200000000000000000000000;
          break;
        default:
          m_val = null;
      }

      return m_val;
    }

    // Velocity unit conversion function
    function v_unit(a, b) {
      a = parseFloat(a);
      let v_value;

      switch (b) {
        case "m/s":
          v_value = a * 1;
          break;
        case "km/h":
          v_value = a / 3.6;
          break;
        case "ft/s":
          v_value = a / 3.281;
          break;
        case "mph":
          v_value = a / 2.237;
          break;
        case "knots":
          v_value = a * 1.944;
          break;
        case "ft/min":
          v_value = a / 196.9;
          break;
        default:
          v_value = null;
      }

      return v_value;
    }

    // Force unit conversion function
    function f_unit(a, b) {
      a = parseFloat(a);
      let force_val;

      switch (b) {
        case "N":
          force_val = a * 1;
          break;
        case "KN":
          force_val = a * 1000;
          break;
        case "MN":
          force_val = a * 1000000;
          break;
        case "4GN":
          force_val = a * 1000000000;
          break;
        case "TN":
          force_val = a * 1000000000000;
          break;
        default:
          force_val = null;
      }

      return force_val;
    }

    // Time unit conversion function
    function t_unit(a, b) {
      a = parseFloat(a);
      let time_val;

      switch (b) {
        case "sec":
          time_val = a * 1;
          break;
        case "min":
          time_val = a * 60;
          break;
        case "hr":
          time_val = a * 3600;
          break;
        default:
          time_val = null;
      }

      return time_val;
    }

    // Convert all units to base units
    const massValue = m_unit(mass, mass_unit);
    const i_velocityValue = v_unit(i_velocity, i_velocity_unit);
    const f_velocityValue = v_unit(f_velocity, f_velocity_unit);
    const c_velocityValue = v_unit(c_velocity, c_velocity_unit);
    const forceValue = f_unit(force, force_unit);
    const timeValue = t_unit(time, time_unit);

    const result = {};
    let change_momentum_val;
    if (operations == "1") {
      if (
        !isNaN(massValue) &&
        !isNaN(i_velocityValue) &&
        !isNaN(f_velocityValue)
      ) {
        const initial_momentum = massValue * i_velocityValue;
        const final_momentum = massValue * f_velocityValue;
        const change_velocity_val = f_velocityValue - i_velocityValue;
        change_momentum_val = massValue * change_velocity_val;

        result.tech_initial_momentum = initial_momentum;
        result.tech_final_momentum = final_momentum;
        result.tech_change_velocity_val = change_velocity_val;
      } else {
        result.error = "Please fill all fields.";
        return result;
      }
    } else if (operations == "2") {
      if (!isNaN(massValue) && !isNaN(c_velocityValue)) {
        change_momentum_val = massValue * c_velocityValue;
      } else {
        result.error = "Please fill all fields.";
        return result;
      }
    } else if (operations == "3") {
      if (!isNaN(forceValue) && !isNaN(timeValue)) {
        change_momentum_val = forceValue * timeValue;
      } else {
        result.error = "Please fill all fields.";
        return result;
      }
    }

    result.tech_change_momentum_val = change_momentum_val;
    return result;
  }

  /**
   * getCalculationelChangeInMomentumCalculator: Service Method
   * POST: /api/calculators-lol/snells-law-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationelSnellsLawCalculator(body) {
    const calculation = body.tech_calculation || "";
    const medium1 = body.tech_medium1 || "";
    const n1 = body.tech_n1 || "";
    const medium2 = body.tech_medium2 || "";
    const n2 = body.tech_n2 || "";
    let angle_first = body.tech_angle_first || "";
    const angle_f_unit = body.tech_angle_f_unit || "";
    let angle_second = body.tech_angle_second || "";
    const angle_s_unit = body.tech_angle_s_unit || "";

    // Angle conversion function
    function convert_angle(unit, value) {
      let converted;

      switch (unit) {
        case "deg":
          converted = value * 0.0174533;
          break;
        case "rad":
          converted = value * 1;
          break;
        case "gon":
          converted = value * 0.01570796;
          break;
        case "tr":
          converted = value * 6.28319;
          break;
        case "arcmin":
          converted = value * 0.000290888;
          break;
        case "arcsec":
          converted = value * 0.00000484814;
          break;
        case "mrad":
          converted = value * 0.001;
          break;
        case "μrad":
          converted = value * 0.000001;
          break;
        case "* π rad":
          converted = value * 3.14159;
          break;
        default:
          converted = value;
      }

      return converted;
    }

    // Convert angles to radians
    angle_first = convert_angle(angle_f_unit, parseFloat(angle_first));
    angle_second = convert_angle(angle_s_unit, parseFloat(angle_second));

    const result = {};
    let jawab;

    if (calculation == "from1") {
      if (
        medium2 &&
        !isNaN(parseFloat(n2)) &&
        !isNaN(angle_first) &&
        angle_f_unit &&
        !isNaN(angle_second) &&
        angle_s_unit
      ) {
        jawab =
          (parseFloat(n2) * Math.sin(angle_second)) / Math.sin(angle_first);
      } else {
        result.error = "Please fill all fields.";
        return result;
      }
    } else if (calculation == "from2") {
      if (
        medium1 &&
        !isNaN(parseFloat(n1)) &&
        !isNaN(angle_first) &&
        angle_f_unit &&
        !isNaN(angle_second) &&
        angle_s_unit
      ) {
        jawab =
          (parseFloat(n1) * Math.sin(angle_first)) / Math.sin(angle_second);
      } else {
        result.error = "Please fill all fields.";
        return result;
      }
    } else if (calculation == "from3") {
      if (
        medium1 &&
        !isNaN(parseFloat(n1)) &&
        medium2 &&
        !isNaN(parseFloat(n2)) &&
        !isNaN(angle_second) &&
        angle_s_unit
      ) {
        jawab = Math.asin(
          (parseFloat(n2) * Math.sin(angle_second)) / parseFloat(n1)
        );
      } else {
        result.error = "Please fill all fields.";
        return result;
      }
    } else if (calculation == "from4") {
      if (
        medium1 &&
        !isNaN(parseFloat(n1)) &&
        medium2 &&
        !isNaN(parseFloat(n2)) &&
        !isNaN(angle_first) &&
        angle_f_unit
      ) {
        jawab = Math.asin(
          (parseFloat(n1) * Math.sin(angle_first)) / parseFloat(n2)
        );
      } else {
        result.error = "Please fill all fields.";
        return result;
      }
    }

    result.tech_angle_first = angle_first;
    result.tech_angle_second = angle_second;
    result.tech_calculation = calculation;
    result.tech_jawab = jawab;

    return result;
  }

  /** getCalculationCcTohpCalculator
   * POST: /api/calculators-lol/cc-to-hp-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationCcTohpCalculator(body) {
    let solve = body.tech_solve;
    let input = parseFloat(body.tech_input);
    let result = {};

    if (!isNaN(input)) {
      let answer;

      if (solve === "1") {
        // cc to hp
        answer = input / 15;
      } else {
        // hp to cc
        answer = input * 15;
      }

      result.tech_answer = answer;
    } else {
      result.error = "Please fill all fields.";
    }

    return result;
  }

  /**
   * getCalculationelImpulseCalculator: Service Method
   * POST: /api/calculators-lol/impulse-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationelImpulseCalculator(body) {
    const calculation = body.tech_calculation
      ? body.tech_calculation.trim()
      : "";
    const impulse = body.tech_impulse ? body.tech_impulse.trim() : "";
    const j_units = body.tech_j_units ? body.tech_j_units.trim() : "";
    const force = body.tech_force ? body.tech_force.trim() : "";
    const f_units = body.tech_f_units ? body.tech_f_units.trim() : "";
    const time = body.tech_time ? body.tech_time.trim() : "";
    const t_units = body.tech_t_units ? body.tech_t_units.trim() : "";
    const impulse_ans_units = body.tech_impulse_ans_units
      ? body.tech_impulse_ans_units.trim()
      : "";
    const force_ans_units = body.tech_force_ans_units
      ? body.tech_force_ans_units.trim()
      : "";
    const time_ans_units = body.tech_time_ans_units
      ? body.tech_time_ans_units.trim()
      : "";

    // Impulse unit conversion function
    function imp_units(a, b) {
      a = parseFloat(a);
      let imp_unit;

      switch (b) {
        case "dyn·s":
          imp_unit = a * 0.00001;
          break;
        case "dyn·min":
          imp_unit = a * 0.0006;
          break;
        case "dyn·h":
          imp_unit = a * 0.036;
          break;
        case "kg·m/s":
          imp_unit = a * 1;
          break;
        case "N·s":
          imp_unit = a * 1;
          break;
        case "N·min":
          imp_unit = a * 60;
          break;
        case "N·h":
          imp_unit = a * 3600;
          break;
        case "mN·s":
          imp_unit = a * 0.001;
          break;
        case "mN·min":
          imp_unit = a * 0.06;
          break;
        case "kN·s":
          imp_unit = a * 1000;
          break;
        case "kN·min":
          imp_unit = a * 60000;
          break;
        default:
          imp_unit = null;
      }

      return imp_unit;
    }

    // Force unit conversion function
    function force_units(a, b) {
      a = parseFloat(a);
      let force_unit;

      switch (b) {
        case "dyn":
          force_unit = a * 0.00001;
          break;
        case "kgf":
          force_unit = a * 9.80665;
          break;
        case "N":
          force_unit = a * 1;
          break;
        case "kN":
          force_unit = a * 1000;
          break;
        case "kip":
          force_unit = a * 4448.222;
          break;
        case "lbf":
          force_unit = a * 4.448222;
          break;
        case "ozf":
          force_unit = a * 0.2780139;
          break;
        case "pdl":
          force_unit = a * 0.138255;
          break;
        default:
          force_unit = null;
      }

      return force_unit;
    }

    // Time unit conversion function
    function time_units(a, b) {
      a = parseFloat(a);
      let time_unit;

      switch (b) {
        case "sec":
          time_unit = a * 1;
          break;
        case "min":
          time_unit = a * 60;
          break;
        case "hr":
          time_unit = a * 3600;
          break;
        default:
          time_unit = null;
      }

      return time_unit;
    }

    // Convert all units to base units
    const impulseValue = imp_units(impulse, j_units);
    const forceValue = force_units(force, f_units);
    const timeValue = time_units(time, t_units);

    const result = {};
    let answer;
    let unit_ans;

    if (calculation === "1") {
      // Calculate impulse from force and time
      if (!isNaN(forceValue) && !isNaN(timeValue)) {
        const imp_jawab = forceValue * timeValue;

        switch (impulse_ans_units) {
          case "dyn·s":
            answer = imp_jawab * 100000;
            break;
          case "dyn·min":
            answer = imp_jawab * 1666.666666667;
            break;
          case "dyn·h":
            answer = imp_jawab * 27.77777777778;
            break;
          case "kg·m/s":
            answer = imp_jawab * 1;
            break;
          case "N·s":
            answer = imp_jawab * 1;
            break;
          case "N·min":
            answer = imp_jawab * 0.01666666666667;
            break;
          case "N·h":
            answer = imp_jawab * 0.0002777777777778;
            break;
          case "mN·s":
            answer = imp_jawab * 1000;
            break;
          case "mN·min":
            answer = imp_jawab * 16.66666666667;
            break;
          case "kN·s":
            answer = imp_jawab * 0.001;
            break;
          case "kN·min":
            answer = imp_jawab * 0.00001666666666667;
            break;
        }
        unit_ans = impulse_ans_units;
      } else {
        result.error = "Please fill all fields.";
        return result;
      }
    } else if (calculation === "2") {
      // Calculate force from impulse and time
      if (!isNaN(impulseValue) && !isNaN(timeValue)) {
        const force_jawab = impulseValue / timeValue;

        switch (force_ans_units) {
          case "dyn":
            answer = force_jawab * 100000;
            break;
          case "kgf":
            answer = force_jawab * 0.1019716213;
            break;
          case "N":
            answer = force_jawab * 1;
            break;
          case "kN":
            answer = force_jawab * 0.001;
            break;
          case "kip":
            answer = force_jawab * 0.0002248089237;
            break;
          case "lbf":
            answer = force_jawab * 0.2248089237;
            break;
          case "ozf":
            answer = force_jawab * 3.596942455;
            break;
          case "pdl":
            answer = force_jawab * 7.233011464;
            break;
        }
        unit_ans = force_ans_units;
      } else {
        result.error = "Please fill all fields.";
        return result;
      }
    } else {
      // Calculate time from impulse and force
      if (!isNaN(impulseValue) && !isNaN(forceValue)) {
        const time_jawab = impulseValue / forceValue;

        switch (time_ans_units) {
          case "sec":
            answer = time_jawab * 1;
            break;
          case "min":
            answer = time_jawab / 60;
            break;
          case "hr":
            answer = time_jawab / 3600;
            break;
        }
        unit_ans = time_ans_units;
      } else {
        result.error = "Please fill all fields.";
        return result;
      }
    }

    result.tech_answer = answer;
    result.tech_unit_ans = unit_ans;
    return result;
  }

  /** getCalculationWHPtoHPCalculation
   * POST: /api/calculators-lol/whp-to-hp-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationWHPtoHPCalculation(body) {
    let submit = body.tech_type;
    let dt = parseFloat(body.tech_dt);
    let whp = parseFloat(body.tech_whp);
    let dtlf = parseFloat(body.tech_dtlf);
    let ehp = parseFloat(body.tech_ehp);

    let param = {};

    if (submit === "whpToHp") {
      if (!isNaN(dt) && !isNaN(whp)) {
        let hp = whp / (1 - dt);
        param.tech_submit = submit;
        param.tech_whp = whp;
        param.tech_dt = dt;
        param.tech_hp = hp.toFixed(2);
      } else {
        param.error = "Please! Check Your Input";
      }
    } else {
      if (!isNaN(dtlf) && !isNaN(ehp)) {
        whp = ehp / dtlf;
        param.tech_submit = submit;
        param.tech_ehp = ehp;
        param.tech_dtlf = dtlf;
        param.tech_whp = whp.toFixed(2);
      } else {
        param.error = "Please! Check Your Input";
      }
    }

    return param;
  }

  /** getCalculationAverageSpeedCalculation
   * POST: /api/calculators-lol/average-speed-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationAverageSpeedCalculation(body) {
    let t_hours = parseFloat(body.tech_t_hours);
    let t_min = parseFloat(body.tech_t_min);
    let t_sec = parseFloat(body.tech_t_sec);
    let distance = parseFloat(body.tech_distance);
    let distance_unit = body.tech_distance_unit;

    let param = {};

    function speed_unitsadd(a, b) {
      if (b == "miles") {
        return a * 1609;
      } else if (b == "km") {
        return a * 1000;
      } else if (b == "yards") {
        return a / 1.094;
      } else if (b == "foot") {
        return a / 3.281;
      } else if (b == "meters") {
        return a;
      }
      return null;
    }

    if (!isNaN(t_hours) && !isNaN(t_min) && !isNaN(t_sec) && !isNaN(distance)) {
      let dis_val = speed_unitsadd(distance, distance_unit);
      console.log(dis_val);
      let total_seconds = t_hours * 3600 + t_min * 60 + t_sec;
      let ans_mps = dis_val / total_seconds;
      let ans_mphh = ans_mps * 3600;
      let ans_ydph = ans_mps * 3937;
      let ans_ftph = ans_mps * 11810;
      let ans_mph = ans_mps * 2.237;
      let ans_kmh = ans_mps * 3.6;

      param.tech_ans_mps = ans_mps;
      param.tech_ans_mph = ans_mph;
      param.tech_ans_kmh = ans_kmh;
      param.tech_ans_mphh = ans_mphh;
      param.tech_ans_ydph = ans_ydph;
      param.tech_ans_ftph = ans_ftph;
    } else {
      param.error = "Please fill all fields.";
    }

    return param;
  }

  /** getCalculationdBmtoWattsCalculation
   * POST: /api/calculators-lol/dbm-to-watts
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationdBmtoWattsCalculation(body) {
    let calculation = String(body.tech_calculation).trim();
    let input = parseFloat(body.tech_input);
    let param = {};

    if (!isNaN(input)) {
      let answer;
      let unit;

      if (calculation === "1") {
        let divide = input / 10;
        let pow = Math.pow(10, divide);
        answer = pow / 1000;
        unit = "W";
      } else if (calculation === "2") {
        let divide = input / 10;
        let pow = Math.pow(10, divide);
        let watts = pow / 1000;
        answer = watts * 1000;
        unit = "mW";
      } else if (calculation === "3") {
        answer = 10 * Math.log10(input) + 30;
        unit = "dBm";
      } else {
        let miliwatts = input * 1000;
        answer = 10 * Math.log10(miliwatts);
        unit = "dBm";
      }

      param.tech_unit = unit;
      param.tech_answer = answer;
    } else {
      param.error = "Please! Check Your Input";
    }

    return param;
  }

  /** getCalculationdCapacitanceCalculation
   * POST: /api/calculators-lol/capacitance-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationdCapacitanceCalculation(body) {
    let area = parseFloat(body.tech_area);
    let area_unit = String(body.tech_area_unit).trim();
    let permittivity = parseFloat(body.tech_permittivity);
    let distance = parseFloat(body.tech_distance);
    let dis_unit = String(body.tech_dis_unit).trim();
    let param = {};

    function areaConvert(a, b) {
      switch (b) {
        case "mm²":
          return a * 1;
        case "cm²":
          return a * 100;
        case "m²":
          return a * 1000000;
        case "in²":
          return a * 645.16;
        case "ft²":
          return a * 92900;
        default:
          return a * 836100; // yd² or fallback
      }
    }

    function disConvert(a, b) {
      switch (b) {
        case "mm":
          return a * 1;
        case "cm":
          return a * 10;
        case "m":
          return a * 1000;
        case "in":
          return a * 25.4;
        case "ft":
          return a * 304.8;
        default:
          return a * 914.4; // yd or fallback
      }
    }

    area = areaConvert(area, area_unit);
    distance = disConvert(distance, dis_unit);

    if (!isNaN(area) && !isNaN(distance) && !isNaN(permittivity)) {
      if (permittivity <= 0) {
        param.error = "Capacitance should be greater than 0";
        return param;
      }

      let mf_ans = (permittivity * area) / distance;
      let f_ans = 0.001 * mf_ans;
      let microf_ans = 1000 * mf_ans;
      let nf_ans = 1000000 * mf_ans;
      let pf_ans = 1000000000 * mf_ans;

      param.tech_mf_ans = mf_ans;
      param.tech_f_ans = f_ans;
      param.tech_microf_ans = microf_ans;
      param.tech_nf_ans = nf_ans;
      param.tech_pf_ans = pf_ans;
    } else {
      param.error = "Please! Check Your Input";
    }

    return param;
  }

  /** getCalculationdAngleofDeviationCalculation
   * POST: /api/calculators-lol/angle-of-deviation-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationdAngleofDeviationCalculation(body) {
    let incidence = parseFloat(body.tech_incidence);
    let incidence_unit = String(body.tech_incidence_unit).trim();
    let emergence = parseFloat(body.tech_emergence);
    let emergence_unit = String(body.tech_emergence_unit).trim();
    let prism = parseFloat(body.tech_prism);
    let prism_unit = String(body.tech_prism_unit).trim();
    let deviation_unit = String(body.tech_deviation_unit).trim(); // not used, but retained
    let param = {};

    function unitsOfDeviation(value, unit) {
      switch (unit) {
        case "circle":
          return value * 360;
        case "cycle":
          return value * 359.8981;
        case "degree":
          return value;
        case "gon":
          return value * 0.9;
        case "gradian":
          return value * 0.9;
        case "mil":
          return value * 0.05625;
        case "milliradian":
          return value * 0.057296;
        case "minute":
          return value * 0.016667;
        case "minutes of arc":
          return value * 0.016667;
        case "point":
          return value * 11.25;
        case "quadrant":
          return value * 90;
        case "quartercircle":
          return value * 90;
        case "right angle":
          return value * 90;
        case "radian":
          return value * 57.29578;
        case "revolution":
          return value * 360;
        case "turn":
          return value * 360;
        case "second":
          return value * 0.000278;
        case "semicircle":
          return value * 180;
        case "sextant":
          return value * 60;
        case "sign":
          return value * 30;
        default:
          return NaN;
      }
    }

    if (!isNaN(incidence) && !isNaN(emergence) && !isNaN(prism)) {
      incidence = unitsOfDeviation(incidence, incidence_unit);
      emergence = unitsOfDeviation(emergence, emergence_unit);
      prism = unitsOfDeviation(prism, prism_unit);

      let deviation = incidence + emergence - prism;

      param.tech_deviation = deviation;
      param.tech_incidence = incidence;
      param.tech_emergence = emergence;
      param.tech_prism = prism;
    } else {
      param.error = "Please! Check Your Input";
    }

    return param;
  }

  /** getCalculationdElectricPotentialCalculation
   * POST: /api/calculators-lol/electric-potential-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationdElectricPotentialCalculation(body) {
    let potential_type = body.tech_potential_type;
    let points = body.tech_points;
    let Q = body.tech_Q;
    let unit_Q = body.tech_unit_Q;
    let charge = body.tech_charge;
    let charge_unit = body.tech_charge_unit;
    let R = body.tech_R;
    let unit_R = body.tech_unit_R;
    let distance = body.tech_distance;
    let distance_unit = body.tech_distance_unit;
    let E = parseFloat(body.tech_E);
    let U = body.tech_U;
    let U_unit = body.tech_U_unit;

    let param = {};

    function convertToCoulomb(value, unit) {
      switch (unit) {
        case "C":
          return value;
        case "e":
          return value * 1.6022e-19;
        case "mC":
          return value * 1e-3;
        case "μC":
          return value * 1e-6;
        case "nC":
          return value * 1e-9;
        case "PC":
          return value * 1e-12;
        default:
          return NaN;
      }
    }

    function convertToMeter(value, unit) {
      switch (unit) {
        case "m":
          return value;
        case "cm":
          return value * 0.01;
        case "mm":
          return value * 0.001;
        case "μm":
          return value * 1e-6;
        case "nm":
          return value * 1e-9;
        case "in":
          return value * 0.0254;
        case "ft":
          return value * 0.3048;
        case "yd":
          return value * 0.9144;
        default:
          return NaN;
      }
    }

    function convertToJoules(value, unit) {
      switch (unit) {
        case "J":
          return value;
        case "kJ":
          return value * 1000;
        case "MJ":
          return value * 1e6;
        case "Wh":
          return value * 3600;
        case "kWh":
          return value * 3.6e6;
        case "kcal":
          return value * 4184;
        case "eV":
          return value * 1.60218e-19;
        default:
          return NaN;
      }
    }

    let v;

    if (potential_type === "single-point") {
      if (
        !isNaN(charge) &&
        !isNaN(distance) &&
        charge_unit &&
        distance_unit &&
        !isNaN(E)
      ) {
        let coulombs = convertToCoulomb(parseFloat(charge), charge_unit);
        let meters = convertToMeter(parseFloat(distance), distance_unit);
        v = (8.99e9 * coulombs) / meters / E;
      } else {
        param.error = "Please! Check Your Input";
        return param;
      }
    } else if (potential_type === "multi-point") {
      if (
        Array.isArray(Q) &&
        Array.isArray(R) &&
        Array.isArray(unit_Q) &&
        Array.isArray(unit_R) &&
        !isNaN(points) &&
        !isNaN(E)
      ) {
        let QR = [];

        for (let i = 0; i < points; i++) {
          let coulombs = convertToCoulomb(parseFloat(Q[i]), unit_Q[i]);
          let meters = convertToMeter(parseFloat(R[i]), unit_R[i]);
          QR[i] = meters > 0 ? coulombs / meters : 0;
        }

        let QRSum = QR.reduce((sum, val) => sum + val, 0);
        v = (8.99e9 * QRSum) / E;
      } else {
        param.error = "Please! Check Your Input";
        return param;
      }
    } else if (potential_type === "difference") {
      if (!isNaN(U) && U_unit && !isNaN(charge) && charge_unit) {
        let coulombs = convertToCoulomb(parseFloat(charge), charge_unit);
        let joules = convertToJoules(parseFloat(U), U_unit);
        v = joules / coulombs;
      } else {
        param.error = "Please! Check Your Input";
        return param;
      }
    } else {
      param.error = "Invalid potential_type";
      return param;
    }

    let scientificNotation = v.toExponential(3);
    let [mantissa, exponent] = scientificNotation.split("e");
    let answer = `${mantissa} X 10<sup>${parseInt(exponent)}</sup>`;

    param.tech_answer = answer;
    return param;
  }

  /**
   * getCalculationWavePeriodCalculator: Service Method
   * POST: /api/calculators-lol/wave-period-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationWavePeriodCalculator(body) {
    const calculationType = body.calculationType; // sim_adv
    const frequencyValue = parseFloat(body.frequency); // frequency
    const frequencyInSeconds = parseFloat(body.frequencyInSeconds); // frequency_sec
    const waveLength = parseFloat(body.waveLength); // wavelength
    const waveSpeed = parseFloat(body.waveSpeed); // wave_speed

    let response = {};

    if (calculationType === "simple") {
      if (!isNaN(frequencyValue)) {
        if (frequencyValue > 0) {
          const wavePeriod = 1 / frequencyValue;
          response.wavePeriod = wavePeriod;
          response.calculationType = calculationType;
        } else {
          response.error = "Frequency must be greater than zero.";
        }
      } else {
        response.error = "Please! Check Your Input.";
      }
    } else if (calculationType === "advanced") {
      if (!isNaN(waveLength) && !isNaN(waveSpeed)) {
        const wavePeriod = waveLength / waveSpeed;
        response.wavePeriod = wavePeriod;
        response.calculationType = calculationType;
      } else {
        response.error = "Please! Check Your Input.";
      }
    }

    return response;
  }

  /** getCalculationAngleofRefractionCalculation
   * POST: /api/calculators-lol/angle-of-refraction-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationAngleofRefractionCalculation(body) {
    let calculation = body.tech_calculation;
    let medium1 = body.tech_medium1;
    let n1 = parseFloat(body.tech_n1);
    let medium2 = body.tech_medium2;
    let n2 = parseFloat(body.tech_n2);
    let angle_first = parseFloat(body.tech_angle_first);
    let angle_f_unit = body.tech_angle_f_unit;
    let angle_second = parseFloat(body.tech_angle_second);
    let angle_s_unit = body.tech_angle_s_unit;

    function convertAngle(unit, value) {
      switch (unit) {
        case "deg":
          return value * 0.0174533;
        case "rad":
          return value * 1;
        case "gon":
          return value * 0.01570796;
        case "tr":
          return value * 6.28319;
        case "arcmin":
          return value * 0.000290888;
        case "arcsec":
          return value * 0.00000484814;
        case "mrad":
          return value * 0.001;
        case "μrad":
          return value * 0.000001;
        case "* π rad":
          return value * 3.14159;
        default:
          return NaN;
      }
    }

    angle_first = convertAngle(angle_f_unit, angle_first);
    angle_second = convertAngle(angle_s_unit, angle_second);

    let jawab;
    if (calculation === "from1") {
      if (
        medium2 &&
        !isNaN(n2) &&
        !isNaN(angle_first) &&
        angle_f_unit &&
        !isNaN(angle_second) &&
        angle_s_unit
      ) {
        jawab = (n2 * Math.sin(angle_second)) / Math.sin(angle_first);
      } else {
        return { error: "Please! Check Your Input" };
      }
    } else if (calculation === "from2") {
      if (
        medium1 &&
        !isNaN(n1) &&
        !isNaN(angle_first) &&
        angle_f_unit &&
        !isNaN(angle_second) &&
        angle_s_unit
      ) {
        jawab = (n1 * Math.sin(angle_first)) / Math.sin(angle_second);
      } else {
        return { error: "Please! Check Your Input" };
      }
    } else if (calculation === "from3") {
      if (
        medium1 &&
        !isNaN(n1) &&
        medium2 &&
        !isNaN(n2) &&
        !isNaN(angle_second) &&
        angle_s_unit
      ) {
        jawab = Math.asin((n2 * Math.sin(angle_second)) / n1);
      } else {
        return { error: "Please! Check Your Input" };
      }
    } else if (calculation === "from4") {
      if (
        medium1 &&
        !isNaN(n1) &&
        medium2 &&
        !isNaN(n2) &&
        !isNaN(angle_first) &&
        angle_f_unit
      ) {
        jawab = Math.asin((n1 * Math.sin(angle_first)) / n2);
      } else {
        return { error: "Please! Check Your Input" };
      }
    }

    return {
      tech_angle_first: angle_first,
      tech_angle_second: angle_second,
      tech_calculation: calculation,
      tech_jawab: jawab,
    };
  }

  /** getCalculationJouleCalculation
   * POST: /api/calculators-lol/joule-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationJouleCalculation(body) {
    let mass = parseFloat(body.tech_mass);
    let mass_unit = parseFloat(body.tech_mass_unit);
    let velocity = parseFloat(body.tech_velocity);
    let velocity_unit = parseFloat(body.tech_velocity_unit);
    let joule_unit_label = body.tech_joule_unit;

    let unit;

    function convertJouleUnit(energy, joule_unit) {
      if (joule_unit == "Joule (J)") {
        unit = energy / 1;
      } else if (joule_unit == "BTU (mean)") {
        unit = energy / 1055.87;
      } else if (joule_unit == "BTU (thermochemical)") {
        unit = energy / 1054.35;
      } else if (joule_unit == "Calorie (SI) (cal)") {
        unit = energy / 4.1868;
      } else if (joule_unit == "Electron volt (eV)") {
        unit = energy / 0.00000000000000000016;
      } else if (joule_unit == "Erg (erg)") {
        unit = energy / 0.0000001;
      } else if (joule_unit == "Foot-pound force") {
        unit = energy / 1.355818;
      } else if (joule_unit == "Foot-poundal") {
        unit = energy / 0.0421;
      } else if (joule_unit == "Horsepower-hour") {
        unit = energy / 2684077.3;
      } else if (joule_unit == "Kilocalorie (SI)(kcal)") {
        unit = energy / 4186.8;
      } else if (joule_unit == "Kilowatt-hour (kW hr)") {
        unit = energy / 3600000;
      } else if (joule_unit == "Ton of TNT") {
        unit = energy / 4200000000;
      } else if (joule_unit == "Volt-coulomb (V Cb)") {
        unit = energy / 1;
      } else if (joule_unit == "Watt-hour (W hr)") {
        unit = energy / 3600;
      } else if (joule_unit == "Watt-second (W sec)") {
        unit = energy / 1;
      }
      return unit;
    }

    if (!isNaN(mass) && !isNaN(velocity)) {
      let massSI = mass * mass_unit;
      let velocitySI = velocity * velocity_unit;
      let velocitySquared = velocitySI * velocitySI;
      let energy = massSI * velocitySquared;
      let convertedEnergy = convertJouleUnit(energy, joule_unit_label);

      if (convertedEnergy === null) {
        return { error: "Unsupported unit type." };
      }

      let answer = 0.5 * convertedEnergy;

      return {
        tech_answer: answer,
      };
    } else {
      return { error: "Please! Check Your Input" };
    }
  }

  /** getCalculationEfficiencyCalculation
   * POST: /api/calculators-lol/efficiency-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationEfficiencyCalculation(body) {
    let solve = body.tech_solve;
    let en_ou = parseFloat(body.tech_en_ou);
    let en_ou_unit = body.tech_en_ou_unit;
    let en_in = parseFloat(body.tech_en_in);
    let en_in_unit = body.tech_en_in_unit;
    let en_ef = parseFloat(body.tech_en_ef);

    function en_convert(value, unit) {
      switch (unit) {
        case "J":
          return value;
        case "kJ":
          return value * 1000;
        case "MJ":
          return value * 1000000;
        case "Wh":
          return value * 3600;
        case "kWh":
          return value * 3600000;
        case "ft-lbs":
          return value * 1.3558;
        case "kcal":
          return value * 4184;
        default:
          return value / 6.242e18; // fallback for unknown unit (e.g., eV)
      }
    }

    en_ou = en_convert(en_ou, en_ou_unit);
    en_in = en_convert(en_in, en_in_unit);

    let answer;

    if (solve === "1") {
      if (!isNaN(en_ou) && !isNaN(en_in)) {
        answer = (en_ou / en_in) * 100;
      } else {
        return { error: "Please! Check Your Input" };
      }
    } else if (solve === "2") {
      if (!isNaN(en_ou) && !isNaN(en_ef)) {
        answer = (en_ou * 100) / en_ef;
      } else {
        return { error: "Please! Check Your Input" };
      }
    } else {
      if (!isNaN(en_in) && !isNaN(en_ef)) {
        answer = (en_ef / 100) * en_in;
      } else {
        return { error: "Please! Check Your Input" };
      }
    }

    return {
      tech_answer: answer,
    };
  }

  /** getCalculationVoltsToJoulesCalculation
   * POST: /api/calculators-lol/volts-to-joules-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationVoltsToJoulesCalculation(body) {
    let volts = parseFloat(body.tech_volts);
    let coulombs = parseFloat(body.tech_coulombs);
    let joules = parseFloat(body.tech_joules);
    let Solve_unit = body.tech_Solve_unit;

    function solveValues(Solve_unit, volts, coulombs, joules) {
      if (Solve_unit === "Joules") {
        return volts * coulombs;
      } else if (Solve_unit === "Volts") {
        return joules / coulombs;
      } else if (Solve_unit === "Coulombs") {
        return joules / volts;
      }
      return null;
    }

    if (!isNaN(volts) && !isNaN(coulombs) && !isNaN(joules)) {
      let answer = solveValues(Solve_unit, volts, coulombs, joules);
      return {
        tech_answer: answer,
      };
    } else {
      return { error: "Please! Check Your Input" };
    }
  }

  /** getCalculationBuoyancyCalculation
   * POST: /api/calculators-lol/buoyancy-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationBuoyancyCalculation(body) {
    let density = parseFloat(body.tech_density);
    let volume = parseFloat(body.tech_volume);
    let gravity = parseFloat(body.tech_gravity);

    if (!isNaN(density) && !isNaN(volume) && !isNaN(gravity)) {
      let answer = density * volume * gravity;
      return {
        tech_answer: answer,
      };
    } else {
      return {
        error: "Please! Check Your Input",
      };
    }
  }

  /** getCalculationFPECalculation
   * POST: /api/calculators-lol/fpe-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationFPECalculation(body) {
    let velocity = parseFloat(body.tech_velocity);
    let weight = parseFloat(body.tech_weight);

    if (!isNaN(velocity) && !isNaN(weight)) {
      let answer = (velocity * velocity * weight) / 450240;
      return {
        tech_answer: answer,
      };
    } else {
      return {
        error: "Please! Check Your Input",
      };
    }
  }

  /**
   * getCalculationeWattCalculator: Service Method
   * POST: /api/calculators-lol/watt-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationeWattCalculator(body) {
    let resistance = body.tech_resistance ? body.tech_resistance.trim() : "";
    const resistance_unit = body.tech_resistance_unit
      ? body.tech_resistance_unit.trim()
      : "";
    let current = body.tech_current ? body.tech_current.trim() : "";
    const current_unit = body.tech_current_unit
      ? body.tech_current_unit.trim()
      : "";
    let voltage = body.tech_voltage ? body.tech_voltage.trim() : "";
    const voltage_unit = body.tech_voltage_unit
      ? body.tech_voltage_unit.trim()
      : "";
    let power = body.tech_power ? body.tech_power.trim() : "";
    const power_unit = body.tech_power_unit ? body.tech_power_unit.trim() : "";

    // Resistance unit conversion function
    function Resistance_Unit(resistance, unit) {
      resistance = parseFloat(resistance);

      if (unit == "kΩ") {
        resistance *= 1000;
      }
      if (unit == "MΩ") {
        resistance *= 1000000;
      }
      return resistance;
    }

    // Current unit conversion function
    function Current_Unit(current, unit) {
      current = parseFloat(current);

      if (unit == "μA") {
        current *= 0.000001;
      }
      if (unit == "mA") {
        current *= 0.001;
      }
      if (unit == "kA") {
        current *= 1000;
      }
      if (unit == "MA") {
        current *= 1000000;
      }
      return current;
    }

    // Voltage unit conversion function
    function Voltage_Unit(voltage, unit) {
      voltage = parseFloat(voltage);

      if (unit == "μV") {
        voltage *= 0.000001;
      }
      if (unit == "mV") {
        voltage *= 0.001;
      }
      if (unit == "kV") {
        voltage *= 1000;
      }
      if (unit == "MV") {
        voltage *= 1000000;
      }
      return voltage;
    }

    // Power unit conversion function
    function Power_Unit(power, unit) {
      power = parseFloat(power);

      if (unit == "μW") {
        power *= 0.000001;
      } else if (unit == "mW") {
        power *= 0.001;
      } else if (unit == "kW") {
        power *= 1000;
      } else if (unit == "MW") {
        power *= 1000000;
      }
      return power;
    }

    // Count filled fields
    let filledCount = 0;
    if (resistance !== "" && !isNaN(parseFloat(resistance))) {
      filledCount++;
    }
    if (current != "" && !isNaN(parseFloat(current))) {
      filledCount++;
    }
    if (voltage != "" && !isNaN(parseFloat(voltage))) {
      filledCount++;
    }
    if (power != "" && !isNaN(parseFloat(power))) {
      filledCount++;
    }

    const result = {};

    if (filledCount == 2) {
      // Case 1: Resistance and Current provided
      if (
        resistance != "" &&
        !isNaN(parseFloat(resistance)) &&
        current != "" &&
        !isNaN(parseFloat(current))
      ) {
        resistance = Resistance_Unit(resistance, resistance_unit);
        current = Current_Unit(current, current_unit);
        voltage = current * resistance;
        power = current * voltage;
        result.tech_voltage = isNaN(voltage) ? "NAN" : voltage;
        result.tech_power = isNaN(power) ? "NAN" : power;
      }
      // Case 2: Resistance and Voltage provided
      else if (
        resistance != "" &&
        !isNaN(parseFloat(resistance)) &&
        voltage != "" &&
        !isNaN(parseFloat(voltage))
      ) {
        resistance = Resistance_Unit(resistance, resistance_unit);
        voltage = Voltage_Unit(voltage, voltage_unit);
        current = voltage / resistance;
        power = current * voltage;
        result.tech_current = isNaN(current) ? "NAN" : current;
        result.tech_power = isNaN(power) ? "NAN" : power;
      }
      // Case 3: Resistance and Power provided
      else if (
        resistance != "" &&
        !isNaN(parseFloat(resistance)) &&
        power != "" &&
        !isNaN(parseFloat(power))
      ) {
        resistance = Resistance_Unit(resistance, resistance_unit);
        power = Power_Unit(power, power_unit);
        current = Math.sqrt(power / resistance);
        voltage = current * resistance;
        result.tech_current = isNaN(current) ? "NAN" : current;
        result.tech_voltage = isNaN(voltage) ? "NAN" : voltage;
      }
      // Case 4: Current and Voltage provided
      else if (
        current != "" &&
        !isNaN(parseFloat(current)) &&
        voltage != "" &&
        !isNaN(parseFloat(voltage))
      ) {
        current = Current_Unit(current, current_unit);
        voltage = Voltage_Unit(voltage, voltage_unit);
        resistance = voltage / current;
        power = voltage * current;
        result.tech_resistance = isNaN(resistance) ? "NAN" : resistance;
        result.tech_power = isNaN(power) ? "NAN" : power;
      }
      // Case 5: Current and Power provided
      else if (
        current != "" &&
        !isNaN(parseFloat(current)) &&
        power != "" &&
        !isNaN(parseFloat(power))
      ) {
        current = Current_Unit(current, current_unit);
        power = Power_Unit(power, power_unit);
        resistance = power / (current * current);
        voltage = power / current;
        result.tech_resistance = isNaN(resistance) ? "NAN" : resistance;
        result.tech_voltage = isNaN(voltage) ? "NAN" : voltage;
      }
      // Case 6: Voltage and Power provided
      else {
        power = Power_Unit(power, power_unit);
        voltage = Voltage_Unit(voltage, voltage_unit);
        current = power / voltage;
        resistance = voltage / current;
        result.tech_current = isNaN(current) ? "NAN" : current;
        result.tech_resistance = isNaN(resistance) ? "NAN" : resistance;
      }
    } else {
      result.error = "Please fill exactly 2 input fields.";
      return result;
    }

    return result;
  }

  /** getCalculationRelativeHumidityCalculation
   * POST: /api/calculators-lol/relative-humidity-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationRelativeHumidityCalculation(body) {
    let temperature = parseFloat(body.tech_temperature);
    let temperature_unit = body.tech_temperature_unit;
    let point = parseFloat(body.tech_point);
    let point_unit = body.tech_point_unit;

    function framing_units(value, unit) {
      if (unit === "°F") {
        value = ((value - 32) * 5) / 9;
      } else if (unit === "K") {
        value = value - 273.15;
      } else {
        value = value;
      }
      return value;
    }

    if (temperature_unit === "°C" && temperature >= 61) {
      return { error: "temperature should be 60 °C equal or lower" };
    } else if (temperature_unit === "°F" && temperature >= 141) {
      return { error: "Temperature should be lower 140 °F equal or lower" };
    } else if (temperature_unit === "K" && temperature == 0) {
      return { error: "Temperature should be 273.15 k equal or upper" };
    }

    if (!isNaN(temperature) && !isNaN(point)) {
      let tempC = framing_units(temperature, temperature_unit);
      let pointC = framing_units(point, point_unit);
      let Pws = 6.112 * Math.exp((17.67 * tempC) / (tempC + 243.5));
      let Pw = 6.112 * Math.exp((17.67 * pointC) / (pointC + 243.5));
      let answer = (Pw / Pws) * 100;

      return {
        tech_answer: answer,
      };
    } else {
      return { error: "Please! Check Your Input" };
    }
  }

  /** getCalculationFrictionLossCalculation
   * POST: /api/calculators-lol/friction-loss-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationFrictionLossCalculation(body) {
    let pipe_diameter = parseFloat(body.tech_pipe_diameter);
    let pipe_diameter_unit = body.tech_pipe_diameter_unit;
    let pipe_length = parseFloat(body.tech_pipe_length);
    let pipe_length_unit = body.tech_pipe_length_unit;
    let volumetric = parseFloat(body.tech_volumetric);
    let volumetric_unit = body.tech_volumetric_unit;
    let material = parseFloat(body.tech_material);

    let pipe_ans, volumetric_ans;

    function pipeConvert(a, b) {
      if (b === "mm") {
        pipe_ans = a / 1000;
      } else if (b === "cm") {
        pipe_ans = a / 100;
      } else if (b === "m") {
        pipe_ans = a * 1;
      } else if (b === "in") {
        pipe_ans = a / 39.37;
      } else {
        pipe_ans = a / 3.281;
      }
      return pipe_ans;
    }

    function volumetricConvert(a, b) {
      if (b === "1") {
        volumetric_ans = a * 0.0037854;
      } else if (b === "2") {
        volumetric_ans = a * 0.00006309;
      } else if (b === "3") {
        volumetric_ans = a * 0.0000010515;
      } else if (b === "4") {
        volumetric_ans = a * 0.004546;
      } else if (b === "5") {
        volumetric_ans = a * 0.00007577;
      } else if (b === "6") {
        volumetric_ans = a * 0.0000012628;
      } else if (b === "7") {
        volumetric_ans = a * 0.028317;
      } else if (b === "8") {
        volumetric_ans = a * 0.00047195;
      } else if (b === "9") {
        volumetric_ans = a * 0.000007866;
      } else if (b === "10") {
        volumetric_ans = a * 1;
      } else if (b === "11") {
        volumetric_ans = a * 0.016667;
      } else if (b === "12") {
        volumetric_ans = a * 0.0002778;
      } else if (b === "13") {
        volumetric_ans = a * 0.001;
      } else if (b === "14") {
        volumetric_ans = a * 0.000016667;
      } else if (b === "15") {
        volumetric_ans = a * 0.0000002778;
      } else if (b === "16") {
        volumetric_ans = a * 0.000000016667;
      } else {
        volumetric_ans = a * 0.0000000002778;
      }
      return volumetric_ans;
    }

    if (isNaN(pipe_diameter) || isNaN(pipe_length) || isNaN(volumetric)) {
      return { error: "Please! Check Your Input" };
    }

    pipe_diameter = pipeConvert(pipe_diameter, pipe_diameter_unit);
    pipe_length = pipeConvert(pipe_length, pipe_length_unit);

    const unitNames = [
      "US gal/s",
      "US gal/min",
      "US gal/hr",
      "UK gal/s",
      "UK gal/min",
      "UK gal/hr",
      "ft³/s",
      "ft³/min",
      "ft³/hr",
      "m³/s",
      "m³/min",
      "m³/hr",
      "L/s",
      "L/min",
      "L/hr",
      "ml/min",
      "ml/hr",
    ];

    let volumetricIndex = unitNames.indexOf(volumetric_unit);
    volumetric = volumetricConvert(volumetric, volumetricIndex);
    console.log(volumetric, material);
    let up_div = Math.pow(volumetric / material, 1.852);
    let head_loss =
      (10.67 * pipe_length * up_div) / Math.pow(pipe_diameter, 4.87);
    let pressure_loss = (head_loss * 9810) / 100000;

    return {
      tech_head_loss: head_loss,
      tech_pressure_loss: pressure_loss,
      tech_material: material,
    };
  }

  /** getCalculationEnergyCostCalculation
   * POST: /api/calculators-lol/energy-cost-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationEnergyCostCalculation(body) {
    let hours_per_day = parseFloat(body.tech_hours_per_day);
    let power = parseFloat(body.tech_power);
    let power_units = body.tech_power_units;
    let cost = parseFloat(body.tech_cost);
    let cost_units = body.tech_cost_units;
    let currancy = body.tech_currancy;

    if (power_units) {
      if (power_units == "watts (W)") {
        power = power;
      } else if (power_units == "kilowatts (kW)") {
        power = power * 1000;
      }
    }

    if (cost_units && currancy) {
      cost_units = cost_units.replace(currancy + "/", "");
      if (cost_units) {
        if (cost_units == "/rupee") {
          cost = cost * 100;
        } else if (cost_units == "/peso") {
          cost = cost * 100;
        } else if (cost_units == "/pence") {
          cost = cost;
        } else if (cost_units == "/cent") {
          cost = cost;
        }
      }

      // if 'pence' or 'cent', cost stays the same
    }

    if (isNaN(hours_per_day) || isNaN(power) || isNaN(cost)) {
      return { error: "Please! Check Your Input" };
    }

    if (power === 0 || hours_per_day === 0) {
      return { error: "Value cannot be zero! Check Input" };
    }

    let energy_consumed_per_day = (power * hours_per_day) / 1000;
    let energy_cost_per_day = (energy_consumed_per_day * cost) / 100;
    let energy_cost_per_month = energy_cost_per_day * 30;
    let energy_cost_per_year = energy_cost_per_day * 365;

    return {
      tech_energy_cost_per_day: energy_cost_per_day,
      tech_energy_cost_per_month: energy_cost_per_month,
      tech_energy_cost_per_year: energy_cost_per_year,
    };
  }

  /**
   * getCalculationeTimeDilationCalculator: Service Method
   * POST: /api/calculators-lol/time-dilation-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationeTimeDilationCalculator(body) {
    const interval = body.tech_interval ? body.tech_interval.trim() : "";
    const interval_one = body.tech_interval_one
      ? body.tech_interval_one.trim()
      : "";
    const interval_sec = body.tech_interval_sec
      ? body.tech_interval_sec.trim()
      : "";
    const interval_unit = body.tech_interval_unit
      ? body.tech_interval_unit.trim()
      : "";
    const velocity = body.tech_velocity ? body.tech_velocity.trim() : "";
    const velocity_unit = body.tech_velocity_unit
      ? body.tech_velocity_unit.trim()
      : "";

    // Speed unit conversion function (converts to km/s)
    function speed_unit1(velocity, velocity_unit) {
      velocity = parseFloat(velocity);

      if (velocity_unit == "m/s") {
        velocity = velocity / 1000;
      } else if (velocity_unit == "km/s") {
        velocity = velocity;
      } else if (velocity_unit == "mi/s") {
        velocity = velocity * 0.621371;
      } else if (velocity_unit == "c") {
        velocity = velocity * 0.00000333564;
      }
      return velocity;
    }

    // Time unit conversion function (converts to seconds)
    function time_unit(interval, interval_unit) {
      interval = parseFloat(interval);

      if (interval_unit == "sec") {
        interval = interval;
      } else if (interval_unit == "mins") {
        interval = interval * 60;
      } else if (interval_unit == "hrs") {
        interval = interval * 3600;
      } else if (interval_unit == "days") {
        interval = interval * 86400;
      } else if (interval_unit == "wks") {
        interval = interval * 604800;
      } else if (interval_unit == "mos") {
        interval = interval * 2629800;
      } else if (interval_unit == "yrs") {
        interval = interval * 31557600;
      }
      return interval;
    }

    // Combined time unit conversion function
    function other_time(interval_one, interval_sec, interval_unit) {
      interval_one = parseFloat(interval_one);
      interval_sec = parseFloat(interval_sec);
      let interval;

      if (interval_unit == "mins/sec") {
        interval = interval_one * 60 + interval_sec;
      } else if (interval_unit == "hrs/mins") {
        interval = interval_one * 3600 + interval_sec * 60;
      } else if (interval_unit == "yrs/mos") {
        interval = interval_one * 31557600 + interval_sec * 2629800;
      } else if (interval_unit == "wks/days") {
        interval = interval_one * 604800 + interval_sec * 86400;
      }
      return interval;
    }

    const result = {};
    let answer;

    // Check if using combined time units
    if (
      interval_unit == "mins/sec" ||
      interval_unit == "hrs/mins" ||
      interval_unit == "yrs/mos" ||
      interval_unit == "wks/days"
    ) {
      // Check if both fields are empty
      if (
        (interval_one == "" || interval_one == undefined) &&
        (interval_sec == "" || interval_sec == undefined)
      ) {
        result.error = "Please! Check Your Input";
        return result;
      }

      // Set default values if empty
      let interval_one_val = interval_one == "" ? 0 : interval_one;
      let interval_sec_val = interval_sec == "" ? 0 : interval_sec;

      if (
        !isNaN(parseFloat(interval_one_val)) &&
        !isNaN(parseFloat(interval_sec_val)) &&
        !isNaN(parseFloat(velocity))
      ) {
        const intervalValue = other_time(
          interval_one_val,
          interval_sec_val,
          interval_unit
        );
        const velocityValue = speed_unit1(velocity, velocity_unit);
        const observer_velocity_m_s = velocityValue * 1000;
        const speed_of_light = 299792458;
        const lorentz_factor =
          1 / Math.sqrt(1 - observer_velocity_m_s ** 2 / speed_of_light ** 2);
        answer = lorentz_factor * intervalValue;
        result.tech_answer = answer;
      } else {
        result.error = "Please! Check Your Input";
        return result;
      }
    } else {
      // Using single time unit
      if (!isNaN(parseFloat(interval)) && !isNaN(parseFloat(velocity))) {
        const intervalValue = time_unit(interval, interval_unit);
        const velocityValue = speed_unit1(velocity, velocity_unit);
        const observer_velocity_m_s = velocityValue * 1000;
        const speed_of_light = 299792458;
        const lorentz_factor =
          1 / Math.sqrt(1 - observer_velocity_m_s ** 2 / speed_of_light ** 2);
        answer = lorentz_factor * intervalValue;
        result.tech_answer = answer;
      } else {
        result.error = "Please! Check Your Input";
        return result;
      }
    }

    return result;
  }

  /**
   * getCalculationeOrbitalPeriodCalculator: Service Method
   * POST: /api/calculators-lol/orbital-period-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationeOrbitalPeriodCalculator(body) {
    const density = body.tech_density ? body.tech_density.trim() : "";
    const density_unit = body.tech_density_unit
      ? body.tech_density_unit.trim()
      : "";
    const Semi = body.tech_Semi ? body.tech_Semi.trim() : "";
    const Semi_unit = body.tech_Semi_unit ? body.tech_Semi_unit.trim() : "";
    const first = body.tech_first ? body.tech_first.trim() : "";
    const first_unit = body.tech_first_unit ? body.tech_first_unit.trim() : "";
    const second = body.tech_second ? body.tech_second.trim() : "";
    const second_unit = body.tech_second_unit
      ? body.tech_second_unit.trim()
      : "";

    // Central body density unit conversion function (converts to g/cm³)
    function central_unit(density, density_unit) {
      density = parseFloat(density);

      if (density_unit == "kg/m³") {
        density = density * 1000;
      } else if (density_unit == "lb/ft³") {
        density = density * 62.428;
      } else if (density_unit == "lb/yd³") {
        density = density * 1686;
      } else if (density_unit == "g/cm³") {
        density = density;
      } else if (density_unit == "kg/cm³") {
        density = density / 1000;
      } else if (density_unit == "mg/cm³") {
        density = density * 1000;
      } else if (density_unit == "g/m³") {
        density = density * 1e6;
      }
      return density;
    }

    // Mass unit conversion function (converts to kg)
    function mass_unit(first, first_unit) {
      first = parseFloat(first);

      if (first_unit == "kg") {
        first = first;
      } else if (first_unit == "t") {
        first = first / 1000;
      } else if (first_unit == "lb") {
        first = first * 2.205;
      } else if (first_unit == "st") {
        first = first / 6.35;
      } else if (first_unit == "US ton") {
        first = first / 907.2;
      } else if (first_unit == "long ton") {
        first = first / 1016;
      } else if (first_unit == "earth") {
        first = first * 5972000000000000000000;
      } else if (first_unit == "sun") {
        first = first / 1e6;
      }
      return first;
    }

    // Semi-major axis unit conversion function (converts to meters)
    function major_unit(Semi, Semi_unit) {
      Semi = parseFloat(Semi);

      if (Semi_unit == "m") {
        Semi = Semi;
      } else if (Semi_unit == "km") {
        Semi = Semi / 1000;
      } else if (Semi_unit == "yd") {
        Semi = Semi / 0.9144;
      } else if (Semi_unit == "mi") {
        Semi = Semi / 1609.34;
      } else if (Semi_unit == "nmi") {
        Semi = Semi / 1852;
      } else if (Semi_unit == "Ro") {
        Semi = Semi / 1.36e7;
      } else if (Semi_unit == "ly") {
        Semi = Semi / 9.461e15;
      } else if (Semi_unit == "au") {
        Semi = Semi / 149597870700;
      } else if (Semi_unit == "pcs") {
        Semi = Semi / 20626480624740;
      }
      return Semi;
    }

    const result = {};

    // Validate inputs
    if (
      !isNaN(parseFloat(density)) &&
      !isNaN(parseFloat(Semi)) &&
      !isNaN(parseFloat(first)) &&
      !isNaN(parseFloat(second))
    ) {
      // Check for zero values
      if (parseFloat(density) == 0) {
        result.error = "central body density value cannot be equal to zero";
        return result;
      }

      if (parseFloat(Semi) == 0) {
        result.error = "semi-major axis value cannot be equal to zero";
        return result;
      }

      if (parseFloat(first) == 0) {
        result.error = "first body mass value cannot be equal to zero";
        return result;
      }

      if (parseFloat(second) == 0) {
        result.error = "second body mass value cannot be equal to zero";
        return result;
      }

      // Gravitational constant
      const G = 6.6743e-11;

      // Convert all units
      const densityValue = central_unit(density, density_unit);
      const SemiValue = major_unit(Semi, Semi_unit);
      const firstValue = mass_unit(first, first_unit);
      const secondValue = mass_unit(second, second_unit);

      // Calculate orbital period using density
      const density_si = densityValue * 1000;
      const orbital_period = Math.sqrt((3 * Math.PI) / (G * density_si));
      const orbital_period_hours = orbital_period / 3600;
      const answer = orbital_period_hours * 1000;

      // Calculate binary orbital period using Kepler's third law
      const tbinary =
        2 *
        Math.PI *
        Math.sqrt(Math.pow(SemiValue, 3) / (G * (firstValue + secondValue)));
      const hours = tbinary / 3600;
      const sub_answer = hours;

      result.tech_sub_answer = sub_answer;
      result.tech_answer = answer;
    } else {
      result.error = "Please! Check Your Input";
      return result;
    }

    return result;
  }

  /**
   * getCalculationeNormalForceCalculator: Service Method
   * POST: /api/calculators-lol/normal-force-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationeNormalForceCalculator(body) {
    const surface = body.tech_surface || "";
    const external = body.tech_external || "";
    let angle = body.tech_angle || "";
    const angle_units = body.tech_angle_units || "";
    let outside_force = body.tech_outside_force || "";
    const outside_force_units = body.tech_outside_force_units || "";
    let mass = body.tech_mass || "";
    const mass_units = body.tech_mass_units || "";

    // Convert mass to kilograms
    if (mass_units) {
      mass = parseFloat(mass);

      switch (mass_units) {
        case "µg":
          mass = mass / 1000000000; // micrograms to kg
          break;
        case "mg":
          mass = mass / 1000000; // milligrams to kg
          break;
        case "g":
          mass = mass / 1000; // grams to kg
          break;
        case "dag":
          mass = mass / 100; // decagrams to kg
          break;
        case "kg":
          // already in kg
          break;
        case "t":
          mass = mass / 0.001; // metric tons to kg
          break;
        case "gr":
          mass = mass / 15432; // grains to kg
          break;
        case "dr":
          mass = mass / 564.4; // drams to kg
          break;
        case "oz":
          mass = mass / 35.274; // ounces to kg
          break;
        case "lb":
          mass = mass / 2.2046; // pounds to kg
          break;
      }
    }

    // Convert angle to degrees
    if (angle_units) {
      angle = parseFloat(angle);

      switch (angle_units) {
        case "deg":
          angle = angle; // already in degrees
          break;
        case "ran": // radians
          angle = angle * 0.017453;
          break;
        case "gon": // gradians
          angle = angle * 1.111;
          break;
        case "tr": // turns
          angle = angle * 0.002778;
          break;
      }
    }

    // Convert outside force to Newtons
    if (outside_force_units) {
      outside_force = parseFloat(outside_force);

      switch (outside_force_units) {
        case "N":
          outside_force = outside_force; // already in Newtons
          break;
        case "KN":
          outside_force = outside_force * 0.001;
          break;
        case "MN":
          outside_force = outside_force * 0.000001;
          break;
        case "GN":
          outside_force = outside_force * 0.000000001;
          break;
        case "TN":
          outside_force = outside_force * 0.000000000001;
          break;
      }
    }

    const result = {};
    let normal_force;

    // Helper function to convert degrees to radians
    function deg2rad(degrees) {
      return degrees * (Math.PI / 180);
    }

    if (surface == "inclined") {
      // Inclined surface: N = mg * cos(θ)
      if (!isNaN(mass) && !isNaN(angle)) {
        normal_force = mass * 9.80665 * Math.cos(deg2rad(angle));
        result.tech_normal_force = normal_force;
      } else {
        result.error = "Please! Check Your Input";
        return result;
      }
    } else {
      // Horizontal surface
      if (external == "no") {
        // No external force: N = mg
        if (!isNaN(mass)) {
          normal_force = mass * 9.80665;
          result.tech_normal_force = normal_force;
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      } else if (external == "downward") {
        // Downward external force: N = mg + F*sin(θ)
        if (!isNaN(mass) && !isNaN(angle) && !isNaN(outside_force)) {
          const angle_rad = deg2rad(angle);
          normal_force = mass * 9.80665 + outside_force * Math.sin(angle_rad);
          result.tech_normal_force = normal_force;
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      } else if (external == "upward") {
        // Upward external force: N = mg - F*sin(θ)
        if (!isNaN(mass) && !isNaN(angle) && !isNaN(outside_force)) {
          const angle_rad = deg2rad(angle);
          normal_force = mass * 9.80665 - outside_force * Math.sin(angle_rad);
          result.tech_normal_force = normal_force;
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      }
    }

    return result;
  }

  /** getCalculationNewtonLawofCoolingCalculation
   * POST: /api/calculators-lol/newtons-law-of-cooling-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationNewtonLawofCoolingCalculation(body) {
    let ambient = parseFloat(body.tech_ambient);
    let ambient_units = body.tech_ambient_units;
    let initial_temperature = parseFloat(body.tech_initial_temperature);
    let initial_temp_units = body.tech_initial_temp_units;
    let area = parseFloat(body.tech_area);
    let area_units = body.tech_area_units;
    let heat_capacity = parseFloat(body.tech_heat_capacity);
    let heat_capacity_units = body.tech_heat_capacity_units;
    let heat_transfer_co = parseFloat(body.tech_heat_transfer_co);
    let heat_transfer_co_units = body.tech_heat_transfer_co_units;
    let temp_after = parseFloat(body.tech_temp_after);
    let temp_after_units = body.tech_temp_after_units;

    if (ambient_units) {
      if (ambient_units == "°C") {
        ambient = ambient;
      } else if (ambient_units == "°F") {
        ambient = ((ambient - 32) * 5) / 9;
      } else if (ambient_units == "K") {
        ambient = ambient - 273.15;
      }
    }
    if (initial_temp_units) {
      if (initial_temp_units == "°C") {
        initial_temperature = initial_temperature;
      } else if (initial_temp_units == "°F") {
        initial_temperature = ((initial_temperature - 32) * 5) / 9;
      } else if (initial_temp_units == "K") {
        initial_temperature = initial_temperature - 273.15;
      }
    }
    if (heat_capacity_units) {
      if (heat_capacity_units == "J/K") {
        heat_capacity = heat_capacity;
      } else if (heat_capacity_units == "J/°C") {
        heat_capacity = heat_capacity;
      } else if (heat_capacity_units == "BTU/°F") {
        heat_capacity = heat_capacity / 0.0005266;
      }
    }
    if (temp_after_units) {
      if (temp_after_units == "sec") {
        temp_after = temp_after;
      } else if (temp_after_units == "min") {
        temp_after = temp_after * 60;
      } else if (temp_after_units == "hrs") {
        temp_after = temp_after * 3600;
      }
    }
    if (heat_transfer_co_units) {
      if (heat_transfer_co_units == "W/(m²·K)") {
        heat_transfer_co = heat_transfer_co;
      } else if (heat_transfer_co_units == "BTU/(h·ft²·°F)") {
        heat_transfer_co = heat_transfer_co * 0.1761;
      }
    }
    if (area_units) {
      if (area_units == "mm²") {
        area = area / 1000000;
      } else if (area_units == "cm²") {
        area = area / 10000;
      } else if (area_units == "m²") {
        area = area;
      } else if (area_units == "km²") {
        area = area * 1000000;
      } else if (area_units == "in²") {
        area = area * 0.00064516;
      } else if (area_units == "ft²") {
        area = area * 0.092903;
      } else if (area_units == "yd²") {
        area = area * 0.836127;
      }
    }

    if (
      isFinite(ambient) &&
      isFinite(initial_temperature) &&
      isFinite(area) &&
      isFinite(heat_capacity) &&
      isFinite(heat_transfer_co) &&
      isFinite(temp_after)
    ) {
      let k = (heat_transfer_co * area) / heat_capacity;
      let temperature =
        ambient + (initial_temperature - ambient) * Math.exp(-k * temp_after);

      return {
        tech_k: k,
        tech_temperature: temperature,
      };
    } else {
      return {
        error: "Please! Check Your Input",
      };
    }
  }

  /** getCalculationWattHourCalculation
   * POST: /api/calculators-lol/watt-hour-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationWattHourCalculation(body) {
    let volt = parseFloat(body.tech_volt);
    let volt_unit = body.tech_volt_unit;
    let charge = parseFloat(body.tech_charge);
    let charge_unit = body.tech_charge_unit;
    let power = parseFloat(body.tech_power);
    let power_unit = body.tech_power_unit;
    let hour = parseFloat(body.tech_hour);
    let hour_unit = body.tech_hour_unit;

    let convert;
    function convertVolt(a, b) {
      if (b == "nv") {
        convert = a * 0.000000001;
      } else if (b == "μV") {
        convert = a * 0.000001;
      } else if (b == "mV") {
        convert = a * 0.001;
      } else if (b == "kV") {
        convert = a * 0.001;
      } else if (b == "MV") {
        convert = a * 1000000;
      } else if (b == "V") {
        convert = a * 1;
      }
      return convert;
    }
    function convertWatt(a, b) {
      if (b == "mW") {
        convert = a * 0.001;
      } else if (b == "W") {
        convert = a * 1;
      } else if (b == "kW") {
        convert = a * 1000;
      } else if (b == "MW") {
        convert = a * 1000000;
      } else if (b == "BTU/h") {
        convert = a * 0.293071;
      } else if (b == "hp(I)") {
        convert = a * 745.7;
      } else if (b == "hp(E)") {
        convert = a * 746;
      }
      return convert;
    }
    function convertHourToHrs(a, b) {
      // ["ms", "sec", "min","hrs","dys","wks","mns","yrs"];
      if (b == "ms") {
        convert = a / 3600000;
      } else if (b == "sec") {
        convert = a / 3600;
      } else if (b == "min") {
        convert = a / 60;
      } else if (b == "hrs") {
        convert = a * 1;
      } else if (b == "dys") {
        convert = a * 24;
      } else if (b == "wks") {
        convert = a * 604800;
      } else if (b == "m") {
        convert = a * 2628000;
      } else if (b == "yrs") {
        convert = a * 31536000;
      }
      return convert;
    }
    function convertChargeToAh(a, b) {
      if (b == "C") {
        convert = a / 3600;
      } else if (b == "Ah") {
        convert = a * 1;
      } else if (b == "mAh") {
        convert = a / 3600000;
      }

      return convert;
    }

    let response = {};

    if (!volt && !charge && !power && !hour) {
      response.error = "Please! Check Your Input";
      return response;
    }

    if (!isNaN(volt) && !isNaN(charge)) {
      volt = convertVolt(volt, volt_unit);
      charge = convertChargeToAh(charge, charge_unit);
      let energy = volt * charge;
      let energy_k = energy / 1000;
      response.tech_type = "energy";
      response.tech_energy = energy;
      response.tech_energy_k = energy_k;
    }

    if (!isNaN(power) && !isNaN(hour)) {
      power = convertWatt(power, power_unit);
      hour = convertHourToHrs(hour, hour_unit);
      let watt_h = parseFloat((power * hour).toFixed(5));
      let watt_hk = parseFloat(((power * hour) / 1000).toFixed(5));
      response.tech_type2 = "watt";
      response.tech_watt_h = watt_h;
      response.tech_watt_hk = watt_hk;
    }

    return response;
  }

  /** getCalculationSpeedofSoundCalculation
   * POST: /api/calculators-lol/speed-of-sound-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationSpeedofSoundCalculation(body) {
    let temperature_air_units = body.tech_temperature_air_units;
    let temperature_air = parseFloat(body.tech_temperature_air);
    let select_unit = body.tech_select_unit; // Currently unused
    let f_values = body.tech_f_values; // Currently unused
    let c_values = body.tech_c_values; // Currently unused

    if (temperature_air_units) {
      if (temperature_air_units == "°C") {
        temperature_air = temperature_air * 1;
      } else if (temperature_air_units == "°F") {
        temperature_air = ((temperature_air - 32) * 5) / 9;
      } else if (temperature_air_units == "K") {
        temperature_air = temperature_air - 273.15;
      }
    }

    let response = {};

    if (isNaN(temperature_air)) {
      response.error = "Please! Check Your Input";
      return response;
    }

    let gamma = 1.4;
    let specificGasConstant = 287;
    let temperatureKelvin = temperature_air + 273.15;

    let speedOfSound = Math.sqrt(
      gamma * specificGasConstant * temperatureKelvin
    );

    response.tech_speedOfSound = speedOfSound.toFixed(2);
    return response;
  }

  /** getCalculationSpecificGravityCalculation
   * POST: /api/calculators-lol/specific-gravity-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationSpecificGravityCalculation(body) {
    let t_fluid = body.tech_t_fluid;
    let density = parseFloat(body.tech_density);
    let density_unit = body.tech_density_unit;

    let response = {};

    function central_unit(density, density_unit) {
      if (density_unit == "kg/m³") {
        density = density;
      } else if (density_unit == "lb/ft³") {
        density = density * 16.0185;
      } else if (density_unit == "lb/yd³") {
        density = density * 0.593276;
      } else if (density_unit == "g/cm³") {
        density = density * 1000;
      } else if (density_unit == "kg/cm³") {
        density = density / 1000000;
      } else if (density_unit == "mg/cm³") {
        density = density * 0.001;
      } else if (density_unit == "g/m³") {
        density = density * 1000;
      } else if (density_unit == "g/dm³") {
        density = density * 100;
      }
      return density;
    }

    if (isNaN(density) || !t_fluid || !density_unit) {
      response.error = "Please! Check Your Input";
      return response;
    }

    if (t_fluid === "ls") {
      let dens = central_unit(density, density_unit);
      if (isNaN(dens)) {
        response.error = "Please! Check Your Input";
        return response;
      }
      let gravity = parseFloat((dens / 1000).toFixed(5));
      response.tech_gravity = gravity;
    } else {
      let gs_gravity = parseFloat((density / 28.96469).toFixed(5));
      response.tech_gs_gravity = gs_gravity;
    }

    return response;
  }

  /**
   * getCalculationeDensityAltitudeCalculator: Service Method
   * POST: /api/calculators-lol/density-altitude-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationeDensityAltitudeCalculator(body) {
    const air_temp = body.tech_air_temp || "";
    const air_temp_unit = body.tech_air_temp_unit || "";
    const dewpoint = body.tech_dewpoint || "";
    const dewpoint_unit = body.tech_dewpoint_unit || "";
    const altimeter_setting = body.tech_altimeter_setting || "";
    const altimeter_setting_unit = body.tech_altimeter_setting_unit || "";
    const station_elevation = body.tech_station_elevation || "";
    const station_elevation_unit = body.tech_station_elevation_unit || "";

    // Round array values to specified decimal places
    function roundArray(ogArray, roundTo = 2) {
      return ogArray.map((innerArray) =>
        innerArray.map((value) => parseFloat(value.toFixed(roundTo)))
      );
    }

    // Generate linearly spaced array
    function linespace(nPoints, initValue, endValue) {
      if (initValue == undefined) {
        initValue = 0;
      }
      if (endValue == undefined) {
        endValue = nPoints;
      }

      if (endValue < initValue) {
        const temp = endValue;
        endValue = initValue;
        initValue = temp;
      }

      const myArray = [];
      const stepSize = (endValue - initValue) / nPoints;

      for (let i = initValue; i <= endValue; i += stepSize) {
        myArray.push(i);
      }

      return myArray;
    }

    // Generate chart data
    function dataToChart(
      xValues,
      whichFunction,
      relative_humidity,
      station_elevation,
      altimeter_setting
    ) {
      whichFunction = whichFunction || 0;
      const chartData = [];

      switch (whichFunction) {
        case 1:
          xValues.forEach((x) => {
            chartData.push([
              x,
              densityAltitude(
                x,
                relative_humidity,
                station_elevation,
                altimeter_setting
              ),
            ]);
          });
          break;
        default:
          xValues.forEach((x) => {
            chartData.push([x, efofex(x)]);
          });
          break;
      }

      return chartData;
    }

    // Calculate density altitude
    function densityAltitude(
      x,
      relative_humidity,
      station_elevation,
      altimeter_setting
    ) {
      const RH = relative_humidity;
      const stationElevation = station_elevation;
      const altimeterSetting = altimeter_setting;

      const P = Math.pow(
        Math.pow(altimeterSetting, 0.190263) - 8.417286e-5 * stationElevation,
        1 / 0.190263
      );
      const alpha = Math.log(RH) + (17.62 * x) / (243.12 + x);
      const dewPoint = (243.12 * alpha) / (17.62 - alpha);

      const Pv_corrections =
        dewPoint *
        (0.43884187e-8 +
          dewPoint *
            (-0.29883885e-10 +
              dewPoint *
                (0.21874425e-12 +
                  dewPoint *
                    (-0.17892321e-14 +
                      dewPoint *
                        (0.11112018e-16 + dewPoint * -0.30994571e-19)))));

      const Pv =
        6.1078 /
        Math.pow(
          0.99999683 +
            dewPoint *
              (-0.90826951e-2 +
                dewPoint *
                  (0.78736169e-4 +
                    dewPoint * (-0.61117958e-6 + Pv_corrections))),
          8
        );

      const Pd = P - Pv;
      const airDensity =
        (Pd / (287.0531 * (x + 273.15)) + Pv / (461.4964 * (x + 273.15))) * 100;
      const altitudeGeopotential =
        (44.3308 - 42.2665 * Math.pow(airDensity, 0.234969)) * 1000;

      return altitudeGeopotential;
    }

    // Example function
    function efofex(x) {
      return Math.cos(x) * x;
    }

    // Temperature unit conversion to Celsius
    function tempUnitConvert(unit, value) {
      value = parseFloat(value);

      if (unit == "°F") {
        value = (value - 32) / 1.8;
      } else if (unit == "K") {
        value = value - 273.15;
      }
      return value;
    }

    // Altimeter setting conversion to millibars
    function alt_pascal(a, b) {
      b = parseFloat(b);
      let value;

      if (a == "mb") {
        value = b * 1;
      } else if (a == "hpa") {
        value = b * 1;
      } else if (a == "inHg") {
        value = b * 33.864;
      } else if (a == "mmHg") {
        value = b * 1.3332;
      }
      return value;
    }

    // Station elevation conversion to meters
    function stationConvert(unit, value) {
      value = parseFloat(value);

      if (unit == "in") {
        value = value * 0.0254;
      } else if (unit == "ft") {
        value = value * 0.3048;
      } else if (unit == "yd") {
        value = value * 0.9144;
      } else if (unit == "mi") {
        value = value * 133.32;
      }
      return value;
    }

    const result = {};

    // Validate numeric inputs
    if (
      !isNaN(parseFloat(air_temp)) &&
      !isNaN(parseFloat(dewpoint)) &&
      !isNaN(parseFloat(altimeter_setting)) &&
      !isNaN(parseFloat(station_elevation))
    ) {
      const airTempValue = parseFloat(air_temp);
      const dewpointValue = parseFloat(dewpoint);

      if (airTempValue >= dewpointValue) {
        const temperature = tempUnitConvert(air_temp_unit, airTempValue);
        const point = tempUnitConvert(dewpoint_unit, dewpointValue);

        const Pws =
          6.112 * Math.exp((17.67 * temperature) / (temperature + 243.5));
        const Pw = 6.112 * Math.exp((17.67 * point) / (point + 243.5));
        const relative_humidity = Pws == 0 ? 0 : (Pw / Pws) * 100;

        let altimeter_setting_val = alt_pascal(
          altimeter_setting_unit,
          altimeter_setting
        );

        if (altimeter_setting_val >= 800 && altimeter_setting_val <= 1200) {
          let station_elevation_val = stationConvert(
            station_elevation_unit,
            station_elevation
          );

          if (station_elevation_val >= -500 && station_elevation_val <= 10000) {
            const absolute_pressure = Math.pow(
              Math.pow(altimeter_setting_val, 0.190263) -
                8.417286 * Math.pow(10, -5) * station_elevation_val,
              1 / 0.190263
            );

            const rh = parseFloat((relative_humidity / 100).toFixed(2));
            const tpow = (7.5 * temperature) / (temperature + 273.3);
            const pow_val = Math.pow(10, tpow);
            const pv = rh * 6.1078 * pow_val;
            const pd = absolute_pressure - pv;

            const ltp = pd * 100;
            const lbp = 287.058 * (temperature + 273.15);
            const p1 = ltp / lbp;

            const rtp = pv * 100;
            const rbp = 461.495 * (temperature + 273.15);
            const p2 = rtp / rbp;

            const air_density = p1 + p2;
            const density_altitude =
              44.3308 - 42.2665 * Math.pow(air_density, 0.234969);
            const relative_density = (air_density / 1.225) * 100;

            const nPoints = 61;
            const initialX = -18;
            const finalX = 43;
            let chartData;

            if (finalX > initialX && nPoints > 1) {
              const xValues = linespace(nPoints, initialX, finalX);
              chartData = dataToChart(
                xValues,
                1,
                rh,
                station_elevation_val,
                altimeter_setting_val
              );
              chartData = roundArray(chartData, 1);
            }

            result.tech_relative_humidity = isNaN(relative_humidity)
              ? "NAN"
              : relative_humidity;
            result.tech_air_density = isNaN(air_density) ? "NAN" : air_density;
            result.tech_relative_density = isNaN(relative_density)
              ? "NAN"
              : relative_density;
            result.tech_absolute_pressure = isNaN(absolute_pressure)
              ? "NAN"
              : absolute_pressure;
            result.tech_density_altitude = isNaN(density_altitude)
              ? "NAN"
              : density_altitude;
            result.tech_chartData = JSON.stringify(chartData);
          } else {
            result.error =
              "Station elevation should be between -500 and 10,000 m (1,640 and 32,808 ft).";
            return result;
          }
        } else {
          result.error =
            "The altimeter setting should be between 800 and 1200 mb (23.6 to 35.4 inHg).";
          return result;
        }
      } else {
        result.error = "DewPoint Cannot be greater than air temperature";
        return result;
      }
    } else {
      result.error = "Please Check Your Input.";
      return result;
    }

    return result;
  }

  /**
   * getCalculationeKineticEnergyCalculator: Service Method
   * POST: /api/calculators-lol/kinetic-energy-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationeKineticEnergyCalculator(body) {
    const result = {};

    // Linear Kinetic Energy
    if (body.tech_submit == "linear") {
      // Calculate Velocity
      if (body.tech_to_cal == "velo") {
        if (
          !isNaN(parseFloat(body.tech_kin)) &&
          !isNaN(parseFloat(body.tech_mass))
        ) {
          let kin = parseFloat(body.tech_kin);
          let mass = parseFloat(body.tech_mass);

          // Convert kinetic energy to Joules
          if (body.tech_unit_k == "kJ") {
            kin = kin * 1000;
          } else if (body.tech_unit_k == "MJ") {
            kin = kin * 1000000;
          } else if (body.tech_unit_k == "Wh") {
            kin = kin * 3600;
          } else if (body.tech_unit_k == "kWh") {
            kin = kin * 3.6e6;
          }

          // Convert mass to kg
          if (body.tech_unit_m == "mg") {
            mass = mass / 1e6;
          } else if (body.tech_unit_m == "g") {
            mass = mass / 1000;
          } else if (body.tech_unit_m == "lbs") {
            mass = mass / 2.205;
          }

          const velocity = parseFloat(Math.sqrt((kin * 2) / mass).toFixed(4));
          result.tech_velocity = velocity;
          return result;
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      }

      // Calculate Mass
      else if (body.tech_to_cal == "mass") {
        if (
          !isNaN(parseFloat(body.tech_kin)) &&
          !isNaN(parseFloat(body.tech_velocity))
        ) {
          let kin = parseFloat(body.tech_kin);
          let velocity = parseFloat(body.tech_velocity);

          // Convert kinetic energy to Joules
          if (body.tech_unit_k == "kJ") {
            kin = kin * 1000;
          } else if (body.tech_unit_k == "MJ") {
            kin = kin * 1000000;
          } else if (body.tech_unit_k == "Wh") {
            kin = kin * 3600;
          } else if (body.tech_unit_k == "kWh") {
            kin = kin * 3.6e6;
          }

          // Convert velocity to m/s
          if (body.tech_unit_v == "miles/s") {
            velocity = velocity * 1609;
          } else if (body.tech_unit_v == "km/s") {
            velocity = velocity * 1000;
          } else if (body.tech_unit_v == "ft/s") {
            velocity = velocity / 3.281;
          } else if (body.tech_unit_v == "in/s") {
            velocity = velocity / 39.37;
          } else if (body.tech_unit_v == "yd/s") {
            velocity = velocity / 1.094;
          } else if (body.tech_unit_v == "km/h") {
            velocity = velocity / 3.6;
          } else if (body.tech_unit_v == "m/h") {
            velocity = velocity / 2.237;
          }

          const mass = parseFloat(
            ((2 * kin) / Math.pow(velocity, 2)).toFixed(4)
          );
          result.tech_mass = mass;
          return result;
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      }

      // Calculate Kinetic Energy
      else if (body.tech_to_cal == "kin") {
        if (
          !isNaN(parseFloat(body.tech_velocity)) &&
          !isNaN(parseFloat(body.tech_mass))
        ) {
          let velocity = parseFloat(body.tech_velocity);
          let mass = parseFloat(body.tech_mass);

          // Convert velocity to m/s
          if (body.tech_unit_v == "miles/s") {
            velocity = velocity * 1609;
          } else if (body.tech_unit_v == "km/s") {
            velocity = velocity * 1000;
          } else if (body.tech_unit_v == "ft/s") {
            velocity = velocity / 3.281;
          } else if (body.tech_unit_v == "in/s") {
            velocity = velocity / 39.37;
          } else if (body.tech_unit_v == "yd/s") {
            velocity = velocity / 1.094;
          } else if (body.tech_unit_v == "km/h") {
            velocity = velocity / 3.6;
          } else if (body.tech_unit_v == "m/h") {
            velocity = velocity / 2.237;
          }

          // Convert mass to kg
          if (body.tech_unit_m == "mg") {
            mass = mass / 1e6;
          } else if (body.tech_unit_m == "g") {
            mass = mass / 1000;
          } else if (body.tech_unit_m == "lbs") {
            mass = mass / 2.205;
          }

          const kin = parseFloat(
            ((mass * Math.pow(velocity, 2)) / 2).toFixed(4)
          );
          result.tech_kin = kin;
          return result;
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      } else {
        result.error = "Please! Check Your Input";
        return result;
      }
    }

    // Rotational Kinetic Energy
    else {
      // Calculate Angular Velocity
      if (body.tech_to_calr == "a_v") {
        if (
          !isNaN(parseFloat(body.tech_r_kin)) &&
          !isNaN(parseFloat(body.tech_moment))
        ) {
          let kin = parseFloat(body.tech_r_kin);
          let mass = parseFloat(body.tech_moment);

          // Convert kinetic energy to Joules
          if (body.tech_unit_k == "kJ") {
            kin = kin * 1000;
          } else if (body.tech_unit_k == "MJ") {
            kin = kin * 1000000;
          } else if (body.tech_unit_k == "Wh") {
            kin = kin * 3600;
          } else if (body.tech_unit_k == "kWh") {
            kin = kin * 3.6e6;
          }

          // Convert moment of inertia to kg·m²
          if (body.tech_unit_i == "lbs*ft²") {
            mass = mass * 0.04214;
          }

          const a_velocity = parseFloat(Math.sqrt((kin * 2) / mass).toFixed(4));
          result.tech_a_velocity = a_velocity;
          return result;
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      }

      // Calculate Moment of Inertia
      else if (body.tech_to_calr == "moi") {
        if (
          !isNaN(parseFloat(body.tech_r_kin)) &&
          !isNaN(parseFloat(body.tech_a_velocity))
        ) {
          let kin = parseFloat(body.tech_r_kin);
          let velocity = parseFloat(body.tech_a_velocity);

          // Convert kinetic energy to Joules
          if (body.tech_unit_k == "kJ") {
            kin = kin * 1000;
          } else if (body.tech_unit_k == "MJ") {
            kin = kin * 1000000;
          } else if (body.tech_unit_k == "Wh") {
            kin = kin * 3600;
          } else if (body.tech_unit_k == "kWh") {
            kin = kin * 3.6e6;
          }

          // Convert angular velocity to rad/s
          if (body.tech_unit_v_r == "rpm") {
            velocity = velocity * 0.10472;
          } else if (body.tech_unit_v_r == "Hz") {
            velocity = velocity * 6.283;
          }

          const moment = parseFloat(
            ((2 * kin) / Math.pow(velocity, 2)).toFixed(4)
          );
          result.tech_moment = moment;
          return result;
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      }

      // Calculate Rotational Kinetic Energy
      else if (body.tech_to_calr == "r_kin") {
        if (
          !isNaN(parseFloat(body.tech_a_velocity)) &&
          !isNaN(parseFloat(body.tech_moment))
        ) {
          let velocity = parseFloat(body.tech_a_velocity);
          let mass = parseFloat(body.tech_moment);

          // Note: Commented out in original PHP code
          // if (body.tech_unit_v_r === 'rpm') {
          //     velocity = velocity * 0.10472;
          // }

          // Convert moment of inertia to kg·m²
          if (body.tech_unit_i == "lbs*ft²") {
            mass = mass * 0.04214;
          }

          const kin = parseFloat(
            ((mass * Math.pow(velocity, 2)) / 2).toFixed(4)
          );
          result.tech_r_kin = kin;
          return result;
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      } else {
        result.error = "Please! Check Your Input";
        return result;
      }
    }
  }

  /**
   * getCalculationeAccelerationCalculator: Service Method
   * POST: /api/calculators-lol/acceleration-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationeAccelerationCalculator(body) {
    let iv = parseFloat(body.tech_iv);
    let ivU = body.tech_ivU;
    let fv = parseFloat(body.tech_fv);
    let fvU = body.tech_fvU;
    let ct = parseFloat(body.tech_ct);
    let ctU = body.tech_ctU;
    let acc = parseFloat(body.tech_acc);
    let accU = body.tech_accU;
    let cdis = parseFloat(body.tech_cdis);
    let cdisU = body.tech_cdisU;
    let velo_value = parseFloat(body.tech_velo_value);
    let mass = parseFloat(body.tech_mass);
    let masU = body.tech_masU;
    let force = parseFloat(body.tech_force);
    let forceU = body.tech_forceU;

    // Convert to numbers (same as PHP casting) - use let instead of const
    let cdisNum = parseInt(cdis) || 0;
    let massNum = parseInt(mass) || 0;
    let forceNum = parseInt(force) || 0;

    function convertTovelocity(a, b) {
      a = parseFloat(a) || 0;
      let val;
      if (b == "ft/s") {
        val = a * 0.3048;
      } else if (b == "km/h") {
        val = a * 0.27777777778;
      } else if (b == "km/s") {
        val = a * 1000;
      } else if (b == "mi/s") {
        val = a * 1609.344;
      } else if (b == "mph") {
        val = a * 0.44704;
      } else if (b == "m/s") {
        val = a;
      } else {
        return null;
      }
      return val;
    }

    function convertTotime(a, b) {
      a = parseFloat(a) || 0;
      let val1;
      if (b == "sec") {
        val1 = a * 1;
      } else if (b == "h") {
        val1 = a * 3600;
      } else if (b == "min") {
        val1 = a * 60;
      } else {
        val1 = a;
      }
      return val1;
    }

    function accaccess(a, b) {
      a = parseFloat(a) || 0;
      let val2;
      if (b == "m/s") {
        val2 = a * 1;
      } else if (b == "ft/s") {
        val2 = a * 0.3048;
      } else if (b == "km/h") {
        val2 = a * 0.277778;
      } else if (b == "km/s") {
        val2 = a * 1000;
      } else if (b == "mi/s") {
        val2 = a * 1609.34;
      } else if (b == "mph") {
        val2 = a * 0.44704;
      } else {
        val2 = null;
      }
      return val2;
    }

    function convertToMeters(a, b) {
      a = parseFloat(a) || 0;
      let val3;
      if (b == "cm") {
        val3 = a * 0.01;
      } else if (b == "in") {
        val3 = a * 0.0254;
      } else if (b == "ft") {
        val3 = a * 0.3048;
      } else if (b == "km") {
        val3 = a * 1000;
      } else if (b == "mi") {
        val3 = a * 1609.344;
      } else if (b == "yd") {
        val3 = a * 0.9144;
      } else {
        val3 = a;
      }
      return val3;
    }

    function forceToN(a, b) {
      a = parseFloat(a) || 0;
      let val4;
      if (b == "kN") {
        val4 = a * 1000;
      } else if (b == "MN") {
        val4 = a * 1000000;
      } else if (b == "GN") {
        val4 = a * 1000000000;
      } else if (b == "TN") {
        val4 = a * 1000000000000;
      } else if (b == "pdl") {
        val4 = a * 0.138255;
      } else if (b == "lbf") {
        val4 = a * 4.44822;
      } else if (b == "dyn") {
        val4 = a * 0.00001;
      } else {
        val4 = a;
      }
      return val4;
    }

    function massToKg(a, b) {
      a = parseFloat(a) || 0;
      let val5;
      if (b == "kg") {
        val5 = a * 1;
      } else if (b == "g") {
        val5 = a * 0.001;
      } else if (b == "mg") {
        val5 = a * 0.000001;
      } else if (b == "t") {
        val5 = a * 1000;
      } else if (b == "gr") {
        val5 = a * 0.001;
      } else if (b == "dr") {
        val5 = a * 0.00177185;
      } else if (b == "oz") {
        val5 = a * 0.0283495;
      } else if (b == "lbs") {
        val5 = a * 0.453592;
      } else if (b == "us ton") {
        val5 = a * 907.18474;
      } else if (b == "long ton") {
        val5 = a * 1016.0469088;
      } else {
        val5 = a;
      }
      return val5;
    }

    // Convert all values - use different variable names to avoid conflicts
    const massConverted = massToKg(massNum, masU);
    const forceConverted = forceToN(forceNum, forceU);
    const accConverted = accaccess(acc, accU);
    const ivConverted = convertTovelocity(iv, ivU);
    const fvConverted = convertTovelocity(fv, fvU);
    const cdisConverted = convertToMeters(cdisNum, cdisU);
    const ctConverted = convertTotime(ct, ctU);

    const param = {};

    if (velo_value == 1) {
      if (
        ivConverted != null &&
        fvConverted != null &&
        ctConverted != null &&
        !acc
      ) {
        const ans = (fvConverted - ivConverted) / ctConverted;
        param.tech_unit = "m/s²";
        param.tech_ans = ans;
      }
    } else if (velo_value == 2) {
      if (
        ivConverted != null &&
        cdisConverted != null &&
        ctConverted != null &&
        !acc
      ) {
        const ans =
          (2 * (cdisConverted - ivConverted * ctConverted)) /
          Math.pow(ctConverted, 2);
        param.tech_unit = "m/s²";
        param.tech_ans = ans;
      }
    } else {
      if (forceConverted != null && massConverted != null && !acc) {
        const ans = forceConverted / massConverted;
        param.tech_unit = "m/s²";
        param.tech_ans = ans;
      }
    }

    return param;
  }

  /** getCalculationAverageVelocityCalculation
   * POST: /api/calculators-lol/average-velocity-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationAverageVelocityCalculation(body) {
    let x = body.tech_x;
    let y = body.tech_y;
    let ivUnit = body.tech_iv;
    let fvUnit = body.tech_fv;
    let method = body.tech_method;

    let param = {};

    if (isFinite(x) && isFinite(y)) {
      let velocityA = parseFloat(x);
      let velocityB = parseFloat(y);

      // Convert initial velocity to m/s
      if (ivUnit === "ft/s") velocityA /= 3.281;
      else if (ivUnit === "km/h") velocityA /= 3.6;
      else if (ivUnit === "km/s") velocityA *= 1000;
      else if (ivUnit === "mi/s") velocityA *= 1609.35;
      else if (ivUnit === "mph") velocityA /= 2.237;

      // Convert final velocity to m/s
      if (fvUnit === "ft/s") velocityB /= 3.281;
      else if (fvUnit === "km/h") velocityB /= 3.6;
      else if (fvUnit === "km/s") velocityB *= 1000;
      else if (fvUnit === "mi/s") velocityB *= 1609.35;
      else if (fvUnit === "mph") velocityB /= 2.237;

      let iv, fv, ave;

      if (method === "1") {
        iv = `${x} ${ivUnit}`;
        fv = `${y} ${fvUnit}`;
        ave = `${((velocityA + velocityB) / 2).toFixed(5)} m/s`;
      } else if (method === "2") {
        ave = `${x} ${ivUnit}`;
        fv = `${y} ${fvUnit}`;
        iv = `${(velocityA * 2 - velocityB).toFixed(5)} m/s`;
      } else if (method === "3") {
        ave = `${x} ${ivUnit}`;
        iv = `${y} ${fvUnit}`;
        fv = `${(velocityA * 2 - velocityB).toFixed(5)} m/s`;
      } else if (method === "4") {
        iv = `${x} ${ivUnit}`;
        fv = `${y} ${fvUnit}`;
        ave = `${(
          (2 * velocityA * velocityB) /
          (velocityA + velocityB)
        ).toFixed(5)} m/s`;
      }

      param.tech_iv = iv;
      param.tech_fv = fv;
      param.tech_ave = ave;
      return param;
    } else {
      param.error = "Please fill all fields.";
      return param;
    }
  }

  /**
   * getCalculationeMomentumCalculator: Service Method
   * POST: /api/calculators-lol/momentum-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationeMomentumCalculator(body) {
    const result = {};

    // Linear Momentum (p = mv)
    if (body.tech_type == "velocity") {
      // Calculate Momentum
      if (body.tech_to_cal == "mom") {
        if (
          !isNaN(parseFloat(body.tech_mass)) &&
          !isNaN(parseFloat(body.tech_velocity))
        ) {
          let velocity = parseFloat(body.tech_velocity);

          // Convert velocity to m/s
          if (body.tech_unit_v === "miles/s") {
            velocity = velocity * 1609;
          } else if (body.tech_unit_v === "km/s") {
            velocity = velocity * 1000;
          } else if (body.tech_unit_v === "ft/s") {
            velocity = velocity / 3.281;
          } else if (body.tech_unit_v === "in/s") {
            velocity = velocity / 39.37;
          } else if (body.tech_unit_v === "yd/s") {
            velocity = velocity / 1.094;
          } else if (body.tech_unit_v === "km/h") {
            velocity = velocity / 3.6;
          } else if (body.tech_unit_v === "m/h") {
            velocity = velocity / 2.237;
          }

          let mass = parseFloat(body.tech_mass);

          // Convert mass to kg
          if (body.tech_unit_m == "mg") {
            mass = mass / 1e6;
          } else if (body.tech_unit_m == "g") {
            mass = mass / 1000;
          } else if (body.tech_unit_m == "lbs") {
            mass = mass / 2.205;
          }

          const mom = parseFloat((mass * velocity).toFixed(5));
          result.tech_mom = mom;
          return result;
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      }

      // Calculate Mass
      else if (body.tech_to_cal == "mass") {
        if (
          !isNaN(parseFloat(body.tech_velocity)) &&
          !isNaN(parseFloat(body.tech_mom))
        ) {
          let mom = parseFloat(body.tech_mom);

          // Convert momentum to kg⋅m/s
          if (body.tech_unit_k == "Nm") {
            mom = mom / 0.01666667;
          } else if (body.tech_unit_k == "Nh") {
            mom = mom / 0.000277778;
          } else if (body.tech_unit_k == "lb-ft") {
            mom = mom / 0.22482;
          }

          let velocity = parseFloat(body.tech_velocity);

          // Convert velocity to m/s
          if (body.tech_unit_v == "miles/s") {
            velocity = velocity * 1609;
          } else if (body.tech_unit_v == "km/s") {
            velocity = velocity * 1000;
          } else if (body.tech_unit_v == "ft/s") {
            velocity = velocity / 3.281;
          } else if (body.tech_unit_v == "in/s") {
            velocity = velocity / 39.37;
          } else if (body.tech_unit_v == "yd/s") {
            velocity = velocity / 1.094;
          } else if (body.tech_unit_v == "km/h") {
            velocity = velocity / 3.6;
          } else if (body.tech_unit_v == "m/h") {
            velocity = velocity / 2.237;
          }

          const mass = parseFloat((mom / velocity).toFixed(5));
          result.tech_mass = mass;
          return result;
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      }

      // Calculate Velocity
      else if (body.tech_to_cal == "velo") {
        if (
          !isNaN(parseFloat(body.tech_mom)) &&
          !isNaN(parseFloat(body.tech_mass))
        ) {
          let mom = parseFloat(body.tech_mom);

          // Convert momentum to kg⋅m/s
          if (body.tech_unit_k == "Nm") {
            mom = mom / 0.01666667;
          } else if (body.tech_unit_k == "Nh") {
            mom = mom / 0.000277778;
          } else if (body.tech_unit_k == "lb-ft") {
            mom = mom / 0.22482;
          }

          let mass = parseFloat(body.tech_mass);

          // Convert mass to kg
          if (body.tech_unit_m == "mg") {
            mass = mass / 1e6;
          } else if (body.tech_unit_m == "g") {
            mass = mass / 1000;
          } else if (body.tech_unit_m == "lbs") {
            mass = mass / 2.205;
          }

          const velo = parseFloat((mom / mass).toFixed(5));
          result.tech_velo = velo;
          return result;
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      }
    }

    // Impulse-Momentum (p = F⋅t)
    else {
      // Calculate Momentum (from Force and Time)
      if (body.tech_to_calr == "mom_t") {
        if (
          !isNaN(parseFloat(body.tech_force)) &&
          !isNaN(parseFloat(body.tech_time))
        ) {
          let force = parseFloat(body.tech_force);

          // Convert force to Newtons
          if (body.tech_unit_f == "KN") {
            force = force * 1000;
          } else if (body.tech_unit_f == "MN") {
            force = force * 1000000;
          }

          let time = parseFloat(body.tech_time);

          // Convert time to seconds
          if (body.tech_unit_t == "min") {
            time = time * 60;
          } else if (body.tech_unit_t == "h") {
            time = time * 60 * 60;
          }

          const momt = parseFloat((force * time).toFixed(5));
          result.tech_momt = momt;
          return result;
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      }

      // Calculate Force
      else if (body.tech_to_calr == "force") {
        if (
          !isNaN(parseFloat(body.tech_mom_t)) &&
          !isNaN(parseFloat(body.tech_time))
        ) {
          let mom = parseFloat(body.tech_mom_t);

          // Convert momentum to kg⋅m/s
          if (body.tech_unit_mt == "Nm") {
            mom = mom / 0.01666667;
          } else if (body.tech_unit_mt == "Nh") {
            mom = mom / 0.000277778;
          } else if (body.tech_unit_mt == "lb-ft") {
            mom = mom / 0.22482;
          }

          let time = parseFloat(body.tech_time);

          // Convert time to seconds
          if (body.tech_unit_t == "min") {
            time = time * 60;
          } else if (body.tech_unit_t == "h") {
            time = time * 60 * 60;
          }

          const forcet = parseFloat((mom / time).toFixed(5));
          result.tech_forcet = forcet;
          return result;
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      }

      // Calculate Time
      else if (body.tech_to_calr == "time_c") {
        if (
          !isNaN(parseFloat(body.tech_mom_t)) &&
          !isNaN(parseFloat(body.tech_force))
        ) {
          let mom = parseFloat(body.tech_mom_t);

          // Convert momentum to kg⋅m/s
          if (body.tech_unit_mt == "Nm") {
            mom = mom / 0.01666667;
          } else if (body.tech_unit_mt == "Nh") {
            mom = mom / 0.000277778;
          } else if (body.tech_unit_mt == "lb-ft") {
            mom = mom / 0.22482;
          }

          let force = parseFloat(body.tech_force);

          // Convert force to Newtons
          if (body.tech_unit_f == "KN") {
            force = force * 1000;
          } else if (body.tech_unit_f == "MN") {
            force = force * 1000000;
          }

          const time = parseFloat((mom / force).toFixed(5));
          result.tech_time = time;
          return result;
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      }
    }

    result.error = "Please! Check Your Input";
    return result;
  }

  /**
   * getCalculationeAngularVelocityCalculator: Service Method
   * POST: /api/calculators-lol/angular-velocity-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationeAngularVelocityCalculator(body) {
    let method = body.tech_method ? body.tech_method.trim() : "";
    const g = body.tech_g ? body.tech_g.trim() : "";
    const gg = body.tech_gg ? body.tech_gg.trim() : "";
    const check = body.tech_check ? body.tech_check.trim() : "";
    let ac = body.tech_ac ? body.tech_ac.trim() : "";
    const ac1 = body.tech_ac1 ? body.tech_ac1.trim() : "";
    let t = body.tech_t ? body.tech_t.trim() : "";
    const t1 = body.tech_t1 ? body.tech_t1.trim() : "";
    let av = body.tech_av ? body.tech_av.trim() : "";
    const av1 = body.tech_av1 ? body.tech_av1.trim() : "";
    let vel = body.tech_vel ? body.tech_vel.trim() : "";
    const vel1 = body.tech_vel1 ? body.tech_vel1.trim() : "";
    let rad = body.tech_rad ? body.tech_rad.trim() : "";
    const rad1 = body.tech_rad1 ? body.tech_rad1.trim() : "";
    const rpm = body.tech_rpm ? body.tech_rpm.trim() : "";
    let rds_m = body.tech_rds_m ? body.tech_rds_m.trim() : "";
    const rds_m1 = body.tech_rds_m1 ? body.tech_rds_m1.trim() : "";

    // Significant figures function with safety checks
    function sigFigA(value, digits) {
      // Handle edge cases
      if (!isFinite(value) || isNaN(value)) {
        return 0;
      }

      if (value == 0) {
        return 0;
      }

      // For very small numbers, just use fixed precision
      if (Math.abs(value) < 1e-10) {
        return parseFloat(value.toFixed(10));
      }

      let decimalPlaces;
      const absValue = Math.abs(value);

      try {
        decimalPlaces = digits - Math.floor(Math.log10(absValue)) - 1;
        // Clamp between 0 and 20 for safety (100 is too much)
        decimalPlaces = Math.max(0, Math.min(20, decimalPlaces));
        return parseFloat(value.toFixed(decimalPlaces));
      } catch (e) {
        // Fallback to simple rounding
        return parseFloat(value.toFixed(4));
      }
    }

    // Convert angular change to radians
    if (!isNaN(parseFloat(ac))) {
      ac = parseFloat(ac);

      if (ac1 == "deg") {
        ac = ac / 57.3;
      } else if (ac1 == "gon") {
        ac = ac / 63.66;
      } else if (ac1 == "tr") {
        ac = ac / 0.15915;
      } else if (ac1 == "arcmin") {
        ac = ac / 3438;
      } else if (ac1 == "arcsec") {
        ac = ac / 206265;
      } else if (ac1 == "mrad") {
        ac = ac / 1000;
      } else if (ac1 == "urad") {
        ac = ac / 1000000;
      } else if (ac1 == "pirad") {
        ac = ac / 0.3183;
      }
    }

    // Convert time to seconds
    if (!isNaN(parseFloat(t))) {
      t = parseFloat(t);

      if (t1 == "min") {
        t = t / 0.016667;
      } else if (t1 == "hrs") {
        t = t / 0.0002778;
      } else if (t1 == "days") {
        t = t / 0.000011574;
      } else if (t1 == "weeks") {
        t = t / 0.0000016534;
      } else if (t1 == "months") {
        t = t / 0.00000038026;
      } else if (t1 == "year") {
        t = t / 0.00000003169;
      }
    }

    // Convert angular velocity to rad/s
    if (!isNaN(parseFloat(av))) {
      av = parseFloat(av);

      if (av1 == "rpm") {
        av = av / 9.55;
      } else if (av1 == "hz") {
        av = av / 0.15915;
      }
    }

    // Convert velocity to m/s
    if (!isNaN(parseFloat(vel))) {
      vel = parseFloat(vel);

      if (vel1 == "km/s") {
        vel = vel / 0.001;
      } else if (vel1 == "km/h") {
        vel = vel / 3.6;
      } else if (vel1 == "ft/s") {
        vel = vel / 3.281;
      } else if (vel1 == "mi/s") {
        vel = vel / 0.000621371;
      } else if (vel1 == "mi/h") {
        vel = vel / 2.237;
      } else if (vel1 == "knots") {
        vel = vel / 1.944;
      }
    }

    // Convert radius to meters - FIXED
    if (!isNaN(parseFloat(rad))) {
      rad = parseFloat(rad);

      if (rad1 == "mm") {
        rad = rad / 1000;
      } else if (rad1 == "cm") {
        rad = rad / 100;
      } else if (rad1 == "km") {
        rad = rad * 1000; // FIXED: was * 0.001
      } else if (rad1 == "in") {
        rad = rad / 39.37;
      } else if (rad1 == "ft") {
        rad = rad / 3.281; // FIXED: was * 3.281
      } else if (rad1 == "yd") {
        rad = rad / 1.0936; // FIXED: was * 1.0936
      } else if (rad1 == "mi") {
        rad = rad / 0.0006214; // FIXED: was * 0.0006214
      } else if (rad1 == "nmi") {
        rad = rad / 0.00054; // FIXED: was * 0.00054
      }
    }

    // Convert distance to meters
    if (!isNaN(parseFloat(rds_m))) {
      rds_m = parseFloat(rds_m);

      if (rds_m1 == "ft") {
        rds_m = rds_m / 3.281;
      } else if (rds_m1 == "cm") {
        rds_m = rds_m / 100;
      } else if (rds_m1 == "in") {
        rds_m = rds_m / 39.37;
      } else if (rds_m1 == "yd") {
        rds_m = rds_m / 1.094;
      }
    }

    const result = {};

    // Method 0: Angular Change and Time
    if (method == "0") {
      // Calculate Angular Velocity
      if (check == "g1_value" || g == "ang_vel") {
        if (!isNaN(ac) && !isNaN(t)) {
          const ang_vel = ac / t;
          const ang_vel_hertz = ang_vel * 0.15915;
          const ang_vel_rpm = ang_vel_hertz * 60;

          result.tech_ang_vel = "ang_vel";
          result.tech_res_unit = "rad/s";
          result.tech_ans = sigFigA(ang_vel, 4);
          result.tech_ang_vel_rpm = sigFigA(ang_vel_rpm, 4);
          result.tech_ang_vel_hertz = sigFigA(ang_vel_hertz, 4);
          result.tech_ac = ac;
          result.tech_t = t;
          return result;
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      }

      // Calculate Angular Change
      else if (check == "g2_value" || g == "ang_chnge") {
        if (!isNaN(t) && !isNaN(av)) {
          const ang_chnge = t * av;
          const ang_chnge_deg = ang_chnge * 57.3;
          const ang_chnge_gon = ang_chnge * 63.66;
          const ang_chnge_tr = ang_chnge * 0.15915;
          const ang_chnge_arcmin = ang_chnge * 3438;
          const ang_chnge_arcsec = ang_chnge * 206265;
          const ang_chnge_mrad = ang_chnge * 1000;
          const ang_chnge_urad = ang_chnge * 1000000;
          const ang_chnge_pirad = ang_chnge * 0.3183;

          result.tech_ang_chnge = "ang_chnge";
          result.tech_res_unit = "rad";
          result.tech_ans = sigFigA(ang_chnge, 4);
          result.tech_ang_chnge_deg = sigFigA(ang_chnge_deg, 4);
          result.tech_ang_chnge_gon = sigFigA(ang_chnge_gon, 4);
          result.tech_ang_chnge_tr = sigFigA(ang_chnge_tr, 4);
          result.tech_ang_chnge_arcmin = sigFigA(ang_chnge_arcmin, 4);
          result.tech_ang_chnge_arcsec = sigFigA(ang_chnge_arcsec, 4);
          result.tech_ang_chnge_mrad = sigFigA(ang_chnge_mrad, 4);
          result.tech_ang_chnge_urad = sigFigA(ang_chnge_urad, 4);
          result.tech_ang_chnge_pirad = sigFigA(ang_chnge_pirad, 4);
          result.tech_av = av;
          result.tech_t = t;
          return result;
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      }

      // Calculate Time
      else if (check == "g3_value" || g == "time") {
        if (!isNaN(ac) && !isNaN(av)) {
          const time_val = ac / av;
          const t_min = time_val * 0.016667;
          const t_hrs = time_val * 0.0002778;
          const t_days = time_val * 0.000011574;
          const t_wks = time_val * 0.0000016534;
          const t_mos = time_val * 0.00000038026;
          const t_yrs = time_val * 0.00000003169;

          result.tech_time = "time";
          result.tech_res_unit = "secs";
          result.tech_ans = sigFigA(time_val, 4);
          result.tech_t_min = sigFigA(t_min, 4);
          result.tech_t_hrs = sigFigA(t_hrs, 4);
          result.tech_t_days = sigFigA(t_days, 4);
          result.tech_t_wks = sigFigA(t_wks, 4);
          result.tech_t_mos = sigFigA(t_mos, 4);
          result.tech_t_yrs = sigFigA(t_yrs, 4);
          result.tech_ac = ac;
          result.tech_av = av;
          return result;
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      } else {
        result.error = "Please! Check Your Input";
        return result;
      }
    }

    // Method 1: Velocity and Radius
    else if (method == "1") {
      // Calculate Angular Velocity
      if (check == "g11_value" || gg == "angle_vel1") {
        if (!isNaN(vel) && !isNaN(rad)) {
          const ang_vel = vel / rad;
          const ang_vel_hertz = ang_vel * 0.15915;
          const ang_vel_rpm = ang_vel_hertz * 60;

          result.tech_ang_vel1 = "ang_vel1";
          result.tech_res_unit = "rad/s";
          result.tech_ans = sigFigA(ang_vel, 4);
          result.tech_ang_vel_rpm = sigFigA(ang_vel_rpm, 4);
          result.tech_ang_vel_hertz = sigFigA(ang_vel_hertz, 4);
          result.tech_vel = vel;
          result.tech_rad = rad;
          return result;
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      }

      // Calculate Velocity
      else if (check == "g12_value" || gg == "velocity") {
        if (!isNaN(av) && !isNaN(rad)) {
          const vel_val = rad * av;
          const vel_kmps = vel_val * 0.001;
          const vel_kmph = vel_val * 3.6;
          const vel_ftps = vel_val * 3.281;
          const vel_mips = vel_val * 0.000621371;
          const vel_miph = vel_val * 2.237;
          const vel_knots = vel_val * 1.944;

          result.tech_velocity = "velocity";
          result.tech_res_unit = "m/s";
          result.tech_ans = sigFigA(vel_val, 4);
          result.tech_vel_kmps = sigFigA(vel_kmps, 4);
          result.tech_vel_kmph = sigFigA(vel_kmph, 4);
          result.tech_vel_ftps = sigFigA(vel_ftps, 4);
          result.tech_vel_mips = sigFigA(vel_mips, 4);
          result.tech_vel_miph = sigFigA(vel_miph, 4);
          result.tech_vel_knots = sigFigA(vel_knots, 4);
          result.tech_av = av;
          result.tech_rad = rad;
          return result;
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      }

      // Calculate Radius
      else if (check == "g13_value" || gg == "radius") {
        if (!isNaN(av) && !isNaN(vel)) {
          const rad_val = vel / av;
          const rad_mm = rad_val * 1000;
          const rad_cm = rad_val * 100;
          const rad_km = rad_val * 0.001;
          const rad_in = rad_val * 39.37;
          const rad_ft = rad_val * 3.281;
          const rad_yd = rad_val * 1.0936;
          const rad_mi = rad_val * 0.0006214;
          const rad_nmi = rad_val * 0.00054;

          result.tech_radius = "radius";
          result.tech_res_unit = "m";
          result.tech_ans = sigFigA(rad_val, 4);
          result.tech_rad_mm = sigFigA(rad_mm, 4);
          result.tech_rad_cm = sigFigA(rad_cm, 4);
          result.tech_rad_km = sigFigA(rad_km, 4);
          result.tech_rad_in = sigFigA(rad_in, 4);
          result.tech_rad_ft = sigFigA(rad_ft, 4);
          result.tech_rad_yd = sigFigA(rad_yd, 4);
          result.tech_rad_mi = sigFigA(rad_mi, 4);
          result.tech_rad_nmi = sigFigA(rad_nmi, 4);
          result.tech_av = av;
          result.tech_vel = vel;
          return result;
        } else {
          result.error = "Please! Check Your Input";
          return result;
        }
      } else {
        result.error = "Please! Check Your Input";
        return result;
      }
    }

    // Method 2: RPM to Angular and Linear Velocity
    else if (method == "2") {
      if (!isNaN(parseFloat(rpm)) && !isNaN(rds_m)) {
        const rpm_val = parseFloat(rpm);
        const ang_vel = (2 * Math.PI * rpm_val) / 60;
        const l_v = ang_vel * rds_m;
        const ang_vel_hertz = ang_vel * 0.15915;
        const ang_vel_rpm = ang_vel_hertz * 60;
        const vel_kmps = l_v * 0.001;
        const vel_kmph = l_v * 3.6;
        const vel_ftps = l_v * 3.281;
        const vel_mips = l_v * 0.000621371;
        const vel_miph = l_v * 2.237;
        const vel_knots = l_v * 1.944;

        result.tech_rpm = "rpm";
        result.tech_res_unit = "rad/s";
        result.tech_ans = sigFigA(ang_vel, 4);
        result.tech_ang_vel_rpm = sigFigA(ang_vel_rpm, 4);
        result.tech_ang_vel_hertz = sigFigA(ang_vel_hertz, 4);
        result.tech_l_v = sigFigA(l_v, 4);
        result.tech_vel_kmps = sigFigA(vel_kmps, 4);
        result.tech_vel_kmph = sigFigA(vel_kmph, 4);
        result.tech_vel_ftps = sigFigA(vel_ftps, 4);
        result.tech_vel_mips = sigFigA(vel_mips, 4);
        result.tech_vel_miph = sigFigA(vel_miph, 4);
        result.tech_vel_knots = sigFigA(vel_knots, 4);
        result.tech_rpm_input = rpm_val;
        result.tech_rds_m = rds_m;
        return result;
      } else {
        result.error = "Please! Check Your Input";
        return result;
      }
    } else {
      result.error = "Please! Check Your Input";
      return result;
    }
  }

  /**
   * getCalculationeDensityCalculator: Service Method
   * POST: /api/calculators-lol/density-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationeDensityCalculator(body) {
    const param = {};
    const to_cals = body.tech_to_cals;
    const calc = body.tech_calc;

    let check = false;

    if (calc == "simple") {
      check = true;

      if (to_cals == "density") {
        const dens_unt = body.tech_dens_unt;
        const volOrg = parseFloat(body.tech_vol);
        let vol = parseFloat(body.tech_vol);
        const slvol = body.tech_slvol;
        const masOrg = parseFloat(body.tech_mas);
        let mas = parseFloat(body.tech_mas);
        const slmas = body.tech_slmas;

        if (!isNumeric(vol) || !isNumeric(mas)) {
          param.error = "Please check your input";
          return param;
        }

        // Mass conversions
        mas = convertMass(mas, slmas, "to_kg");

        // Volume conversions
        vol = convertVolume(vol, slvol, "to_m3");

        const dnsCal = mas / vol;

        // Density unit conversion
        const finalDensity = convertDensity(dnsCal, dens_unt, "output");

        param.tech_anstitle = "d";
        param.tech_ansval = finalDensity + " " + dens_unt;
        param.tech_anstitle1 = "m";
        param.tech_ansval1 = masOrg + " " + slmas;
        param.tech_anstitle2 = "v";
        param.tech_ansval2 = volOrg + " " + slvol;
        param.tech_ansval3 = Math.pow(volOrg, 1 / 3) + " " + slvol;
      } else if (to_cals == "volume") {
        const volu_unt = body.tech_volu_unt;
        const dnsOrg = parseFloat(body.tech_dns);
        let dns = parseFloat(body.tech_dns);
        const sldns = body.tech_sldns;
        const masOrg = parseFloat(body.tech_mas);
        let mas = parseFloat(body.tech_mas);
        const slmas = body.tech_slmas;

        if (!isNumeric(dns) || !isNumeric(mas)) {
          param.error = "Please check your input";
          return param;
        }

        // Mass conversions
        mas = convertMass(mas, slmas, "to_kg");

        // Density conversions
        dns = convertDensity(dns, sldns, "to_kg_m3");

        const vol = mas / dns;

        // Volume unit conversion for output
        const finalVolume = convertVolume(vol, volu_unt, "from_m3");

        param.tech_anstitle = "v";
        param.tech_ansval = finalVolume + " " + volu_unt;
        param.tech_anstitle2 = "d";
        param.tech_ansval2 = dnsOrg + " " + sldns;
        param.tech_anstitle1 = "m";
        param.tech_ansval1 = masOrg + " " + slmas;
        param.tech_ansval3 = Math.pow(finalVolume, 1 / 3) + " " + volu_unt;
      } else if (to_cals == "mass") {
        const mass_unt = body.tech_mass_unt;
        const dnsOrg = parseFloat(body.tech_dns);
        let dns = parseFloat(body.tech_dns);
        const sldns = body.tech_sldns;
        const volOrg = parseFloat(body.tech_vol);
        let vol = parseFloat(body.tech_vol);
        const slvol = body.tech_slvol;

        if (!isNumeric(dns) || !isNumeric(vol)) {
          param.error = "Please check your input";
          return param;
        }

        // Density conversions
        dns = convertDensity(dns, sldns, "to_kg_m3");

        // Volume conversions
        vol = convertVolume(vol, slvol, "to_m3");

        let mas = dns * vol;

        // Mass unit conversion for output
        mas = convertMass(mas, mass_unt, "from_kg");

        param.tech_anstitle = "m";
        param.tech_ansval = mas + " " + mass_unt;
        param.tech_anstitle2 = "d";
        param.tech_ansval2 = dnsOrg + " " + sldns;
        param.tech_anstitle1 = "v";
        param.tech_ansval1 = volOrg + " " + slvol;
        param.tech_ansval3 = Math.pow(volOrg, 1 / 3) + " " + slvol;
      }
    } else {
      check = true;
      const dens_unt = body.tech_dens_unt;
      const sladvol = body.tech_sladvol;
      const masOrg = parseFloat(body.tech_mas);
      let mas = parseFloat(body.tech_mas);
      const slmas = body.tech_slmas;
      const lgnOrg = parseFloat(body.tech_lgn);
      let lgn = parseFloat(body.tech_lgn);
      const sllgn = body.tech_sllgn;
      const wdtOrg = parseFloat(body.tech_wdt);
      let wdt = parseFloat(body.tech_wdt);
      const slwdt = body.tech_slwdt;
      const hgtOrg = parseFloat(body.tech_hgt);
      let hgt = parseFloat(body.tech_hgt);
      const slhgt = body.tech_slhgt;

      if (
        !isNumeric(lgn) ||
        !isNumeric(wdt) ||
        !isNumeric(hgt) ||
        !isNumeric(mas)
      ) {
        param.error = "Please check your input";
        return param;
      }

      // Mass conversions
      mas = convertMass(mas, slmas, "to_kg");

      // Length conversions to cm
      lgn = convertLength(lgn, sllgn, "to_cm");
      wdt = convertLength(wdt, slwdt, "to_cm");
      hgt = convertLength(hgt, slhgt, "to_cm");

      // Calculate volume in m³
      const vol_m3 = (lgn * wdt * hgt) / 1000000;

      // Convert volume to desired output unit
      let vol = convertVolume(vol_m3, sladvol, "from_m3");

      // Convert back to m³ for density calculation
      const volss = convertVolume(vol, sladvol, "to_m3");

      let dnsCal = mas / volss;

      // Density unit conversion
      dnsCal = convertDensity(dnsCal, dens_unt, "output");

      param.tech_anstitle = "d";
      param.tech_ansval = dnsCal + " " + dens_unt;
      param.tech_vlme = vol + " " + sladvol;
      param.tech_mass = masOrg + " " + slmas;
      param.tech_lngt = lgnOrg + " " + sllgn;
      param.tech_wdth = wdtOrg + " " + slwdt;
      param.tech_hgth = hgtOrg + " " + slhgt;
      param.tech_ansval3 = Math.pow(vol, 1 / 3) + " " + sladvol;
    }

    if (check == true) {
      return param;
    } else {
      param.error = "Please check your input";
      return param;
    }

    // Helper functions
    function isNumeric(value) {
      return !isNaN(parseFloat(value)) && isFinite(value);
    }

    function convertMass(value, unit, direction) {
      const conversions = {
        µg: 1000000000,
        mg: 1000000,
        g: 1000,
        dag: 100,
        t: 0.001,
        gr: 15432.36,
        dr: 564.383,
        oz: 35.27396,
        lb: 2.204623,
        stone: 0.157473,
        US_ton: 0.001102311,
        Long_ton: 0.000984207,
        Earths: 1 / 5972000000000000000000000,
        Suns: 1 / 1989000000000000000000000000000,
        me: 1097769122809886380500592292548,
        mp: 597863320194489720965829062,
        mn: 597040375333014195351371993,
        u: 602214000000000000000000000,
        oz_t: 32.15075,
      };

      if (direction == "to_kg") {
        return value / (conversions[unit] || 1);
      } else {
        // from_kg
        return value * (conversions[unit] || 1);
      }
    }

    function convertVolume(value, unit, direction) {
      const conversions = {
        "mm³": 1000000000,
        "cm³": 1000000,
        "dm³": 1000,
        cu_in: 61024,
        cu_ft: 35.315,
        cu_yd: 1.308,
        ml: 1000000,
        cl: 100000,
        liters: 1000,
        hl: 10,
        US_gal: 264.17,
        UK_gal: 219.97,
        US_fl_oz: 33814,
        UK_fl_oz: 35195,
        cups: 4227,
        tbsp: 66667,
        tsp: 200000,
        US_qt: 1056.7,
        UK_qt: 879.9,
        US_pt: 2113.4,
        UK_pt: 1759.8,
      };

      if (direction == "to_m3") {
        return value / (conversions[unit] || 1);
      } else {
        // from_m3
        return value * (conversions[unit] || 1);
      }
    }

    function convertDensity(value, unit, direction) {
      const conversions = {
        "kg/dm³": 1000,
        "kg/L": 1000,
        "g/mL": 1000,
        "t/m³": 1000,
        "g/cm³": 1000,
        "oz/cu_in": 1730,
        "lb/cu_in": 27680,
        "lb/cu_ft": 16.018,
        "lb/cu_yd": 1 / 1.6855549959513,
        "lb/us_gal": 120,
        "g/l": 1,
        "g/dl": 10,
        "mg/l": 0.001,
      };

      if (direction == "to_kg_m3") {
        return value * (conversions[unit] || 1);
      } else {
        // output
        return value / (conversions[unit] || 1);
      }
    }

    function convertLength(value, unit, direction) {
      const conversions = {
        mm: 0.1,
        m: 100,
        in: 2.54,
        ft: 30.48,
        yd: 91.44,
      };

      if (direction == "to_cm") {
        return value * (conversions[unit] || 1);
      }
      return value; // Add reverse conversion if needed
    }
  }

  /**
   * getCalculationeForceCalculator: Service Method
   * POST: /api/calculators-lol/force-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationeForceCalculator(body) {
    const param = {};
    const submit = body.tech_unit_type?.trim();

    let cal, f, f_unit, m, m_unit, a, a_unit, sigfig;
    let question, a_f, g_f, f_v;

    if (submit === "m1") {
      cal = body.tech_cal?.trim();
      f = body.tech_f?.trim();
      f_unit = body.tech_f_unit?.trim();
      m = body.tech_m?.trim();
      m_unit = body.tech_m_unit?.trim();
      a = body.tech_a?.trim();
      a_unit = body.tech_a_unit?.trim();
      sigfig = body.tech_sigfig?.trim();
    } else if (submit === "m2") {
      question = body.tech_question?.trim();
      a_f = body.tech_a_f?.trim();
      g_f = body.tech_g_f?.trim();
      f_v = body.tech_f_v?.trim();
    }

    let check = false;

    if (submit === "m1") {
      if (
        isNumeric(f) &&
        isNumeric(m) &&
        isNumeric(a) &&
        !empty(f_unit) &&
        !empty(m_unit) &&
        !empty(a_unit) &&
        !empty(sigfig) &&
        !empty(cal)
      ) {
        check = true;
      }
    } else if (submit === "m2") {
      if (isNumeric(a_f) && isNumeric(g_f) && !empty(f_v) && !empty(question)) {
        check = true;
      }
    }

    if (check === true) {
      if (submit === "m1") {
        // Convert to numbers
        f = parseFloat(f);
        m = parseFloat(m);
        a = parseFloat(a);

        // Unit Conversion
        if (isNumeric(f)) {
          f = convertForce(f, f_unit, "to_N");
        }

        if (isNumeric(m)) {
          m = convertMass(m, m_unit, "to_kg");
        }

        if (isNumeric(a)) {
          a = convertAcceleration(a, a_unit, "to_ms2");
        }

        if (cal === "f" && isNumeric(m) && isNumeric(a)) {
          let force = m * a;
          if (sigfig !== "auto") {
            force = sigFig(force, parseInt(sigfig));
          }
          param.tech_ans = force + " N";
          param.tech_m = m;
          param.tech_a = a;
        } else if (cal === "m" && isNumeric(f) && isNumeric(a)) {
          let mass = f / a;
          param.tech_ans = mass + " kg";
          param.tech_f = f;
          param.tech_a = a;
        } else if (cal === "a" && isNumeric(f) && isNumeric(m)) {
          let acceleration = f / m;
          param.tech_ans = acceleration + " m/s²";
          param.tech_f = f;
          param.tech_m = m;
        } else {
          param.error = "Please fill all fields.";
          return param;
        }
        param.tech_share = "share";
      } else if (submit === "m2") {
        if (question === "yes" && isNumeric(a_f) && isNumeric(g_f)) {
          a_f = parseFloat(a_f);
          g_f = parseFloat(g_f);
          const nf = a_f + g_f;
          param.tech_nf = sigFig(nf, 4);
        } else if (question === "no" && !empty(f_v)) {
          const forceValues = f_v
            .split(",")
            .map((val) => val.trim())
            .filter((val) => val !== "");

          // Validate all values are numeric
          for (const value of forceValues) {
            if (!isNumeric(value)) {
              param.error = "Please fill all fields.";
              return param;
            }
          }

          const numericValues = forceValues.map((val) => parseFloat(val));
          const nf = numericValues.reduce((sum, val) => sum + val, 0);

          const ex = numericValues.join(" + ");

          param.tech_nf = sigFig(nf, 4);
          param.tech_ex = ex;
        } else {
          param.error = "Please fill all fields.";
          return param;
        }
      }

      return param;
    } else {
      param.error = "Please fill all fields.";
      return param;
    }

    // Helper functions
    function isNumeric(value) {
      if (typeof value == "number") return true;
      if (typeof value != "string") return false;
      return !isNaN(value) && !isNaN(parseFloat(value)) && isFinite(value);
    }

    function empty(value) {
      return value == undefined || value == null || value == "";
    }

    function sigFig(value, digits) {
      if (value == 0) {
        return 0;
      }

      if (value < 0) {
        const decimalPlaces =
          digits - Math.floor(Math.log10(Math.abs(value))) - 1;
        return Number(value.toFixed(Math.max(0, decimalPlaces)));
      } else {
        const decimalPlaces = digits - Math.floor(Math.log10(value)) - 1;
        return Number(value.toFixed(Math.max(0, decimalPlaces)));
      }
    }

    function convertForce(value, unit, direction) {
      const conversions = {
        dyn: 100000,
        kgf: 1 / 9.80665,
        kn: 0.001,
        mn: 0.000001,
        gn: 0.000000001,
        tn: 0.000000000001,
        kip: 1 / 4448.222,
        ibf: 1 / 4.44822,
        ozf: 1 / 0.2780139,
        pdl: 1 / 0.138255,
      };

      if (direction == "to_N") {
        if (unit == "dyn") return value / conversions.dyn;
        if (unit == "kgf") return value * conversions.kgf;
        if (unit == "kn") return value / conversions.kn;
        if (unit == "mn") return value / conversions.mn;
        if (unit == "gn") return value / conversions.gn;
        if (unit == "tn") return value / conversions.tn;
        if (unit == "kip") return value * conversions.kip;
        if (unit == "ibf") return value * conversions.ibf;
        if (unit == "ozf") return value * conversions.ozf;
        if (unit == "pdl") return value * conversions.pdl;
      }
      return value;
    }

    function convertMass(value, unit, direction) {
      const conversions = {
        ug: 1000000000,
        mg: 1 / 1000000,
        g: 1000,
        dag: 100,
        t: 0.001,
        gr: 15432,
        dr: 564.4,
        oz: 35.274,
        lb: 2.2046,
        stone: 0.15747,
        us_ton: 0.0011023,
        long_ton: 0.0009842,
        earths: 1 / 5972000000000000000000000,
      };

      if (direction == "to_kg") {
        if (unit == "ug") return value / conversions.ug;
        if (unit == "mg") return value * conversions.mg;
        if (unit == "g") return value / conversions.g;
        if (unit == "dag") return value / conversions.dag;
        if (unit == "t") return value / conversions.t;
        if (unit == "gr") return value / conversions.gr;
        if (unit == "dr") return value / conversions.dr;
        if (unit == "oz") return value / conversions.oz;
        if (unit == "lb") return value / conversions.lb;
        if (unit == "stone") return value / conversions.stone;
        if (unit == "us_ton") return value / conversions.us_ton;
        if (unit == "long_ton") return value / conversions.long_ton;
        if (unit == "earths") return value * conversions.earths;
      }
      return value;
    }

    function convertAcceleration(value, unit, direction) {
      const conversions = {
        in_s2: 39.370078740157,
        ft_s2: 3.2808398950131,
        cm_s2: 0.01,
        mi_s2: 0.00062137119223733,
        mi_hs: 2.236936292054,
        km_s2: 0.001,
        km_hs: 3.6,
      };

      if (direction == "to_ms2") {
        if (unit == "in_s2") return value / conversions.in_s2;
        if (unit == "ft_s2") return value / conversions.ft_s2;
        if (unit == "cm_s2") return value * conversions.cm_s2;
        if (unit == "mi_s2") return value / conversions.mi_s2;
        if (unit == "mi_hs") return value / conversions.mi_hs;
        if (unit == "km_s2") return value / conversions.km_s2;
        if (unit == "km_hs") return value / conversions.km_hs;
      }
      return value;
    }
  }

  /**
   * getCalculationeEnthalpyCalculator: Service Method
   * POST: /api/calculators-lol/enthalpy-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationeEnthalpyCalculator(body) {
    const param = {};

    const DATA_A = {
      None: "0",
      Custom: "0",
      "Ag(s)": "0",
      "Ag⁺(aq)": "105.58",
      "Ag₂O(s)": "-31.05",
      "Ag₂S(s)": "-31.8",
      "AgBr(aq)": "-15.98",
      "AgBr(s)": "-100.37",
      "AgCl(aq)": "-61.58",
      "AgCl(s)": "-127.7",
      "AgI(aq)": "50.38",
      "AgI(s)": "-61.84",
      "AgNO₃(s)": "-124.39",
      "Al(s)": "0",
      "Al₂O₃(s)": "-1669.8",
      "Al³⁺(aq)": "-524.7",
      "AlCl₃(s)": "-704.2",
      "As(s) ": "0",
      "As₂S₃(s) ": "-169",
      "AsO₄³⁻(aq)": "-888.14",
      "B(s)": "0",
      "B₂O₃(s)": "-1272.8",
      "Ba(s)": "0",
      "Ba²⁺(aq)": "-537.64",
      "BaCl₂(s)": "-860.1",
      "BaCO₃(aq)": "-1214.78",
      "BaCO₃(s)": "-1218.8",
      "BaO(s)": "-558.1",
      "BaSO₄(s)": "-1465.2",
      "BF₃(g)": "-1137",
      "Br⁻(aq)": "-121.55",
      "Br(g)": "111.88",
      "Br₂(g)": "30.907",
      "Br₂(l)": "0",
      "C(g)": "716.68",
      "C(s) - Diamond": "1.88",
      "C(s) - Graphite": "0",
      "CH₃CHO(g)": "-166.19",
      "CH₃CHO(l) - Acetaldehyde": "-192.3",
      "CH₃COCH₃(l) - Acetone": "-248.1",
      "CH₃COOH(aq)": "-485.76",
      "CH₃COOH(l) - Acetic acid": "-484.5",
      "CH₃NH₂(g) - Methylamine": "-22.97",
      "CH₃OH(g)": "-200.66",
      "CH₃OH(l) - Methanol": "-238.6",
      "CH₄(g) - Methane": "-74.81",
      "CHCl₃(l)": "-131.8",
      "(COOH)₂(s) - Oxalic acid": "-827.2",
      "C₂H₂(g) - Acetylene": "226.73",
      "C₂H₄(g) - Ethylene": "52.28",
      "C₂H₅OH(g)": "-235.1",
      "C₂H₅OH(l) - Ethanol": "-277.69",
      "C₂H₆(g) - Ethane": "-84.68",
      "C₃H₆(g) - Cyclopropane ": "53.3",
      "C₃H₆(g) - Propylene": "20.42",
      "C₃H₈(g) - Propane": "-103.8",
      "C₄H₁₀(g) - Butane": "-126.15",
      "C₅H₁₂(g) - Pentane": "-146.44",
      "C₆H₁₂(l) - Cyclohexane": "-156.4",
      "C₆H₁₂O₆(s) - Fructose": "-1266",
      "C₆H₁₂O₆(s) - Glucose": "-1273",
      "C₆H₁₄(l) - Haxane": "-198.7",
      "C₆H₅COOH(s) - Benzoic acid": "-385.1",
      "C₆H₅NH₂(l) - Aniline": "31.6",
      "C₆H₅OH(s) - Phenol": "-164.6",
      "C₆H₆(l) - Benzene": "49.03",
      "C₇H₈(l) - Toluene": "12",
      "C₈H₁₈(l) - Octane": "-250.1",
      "C₁₂H₂₂O₁₁(s) - Sucrose": "-2220",
      "CO(g)": "-110.5",
      "CO(NH₂)₂(s) - Urea": "-333.51",
      "CO₂(g)": "-393.5",
      "CO₃²⁻(aq)": "-677.14",
      "CCl₄(g)": "-102.9",
      "CCl₄(l)": "-139.5",
      "Ca(g)": "178.2",
      "Ca(OH)₂(aq)": "-1002.82",
      "Ca(OH)₂(s)": "-986.6",
      "Ca(s)": "0",
      "Ca²⁺(aq)": "-542.83",
      "CaBr₂(s)": "-682.8",
      "CaC₂(s)": "-59.8",
      "CaCl₂(aq)": "-877.1",
      "CaCl₂(s)": "-795",
      "CaCO₃(aq)": "-1219.97",
      "CaCO₃(s)": "-1207.1",
      "CaF₂(aq)": "-1208.09",
      "CaF₂(s)": "-1219.6",
      "CaO(s)": "-635.5",
      "CaSO₄(aq)": "-1452.1",
      "CaSO₄(s)": "-1432.7",
      "Ce(s)": "0",
      "Ce³⁺(aq)": "-696.2",
      "Ce⁴⁺(aq)": "-537.2",
      "Cl(g)": "121.68",
      "Cl⁻(aq)": "-167.16",
      "Cl₂(g)": "0",
      "CoO(s)": "-239.3",
      "Cr₂O₃(s)": "-1128.4",
      "CS₂(l)": "89.7",
      "Cu(s)": "0",
      "Cu⁺(aq)": "71.67",
      "Cu²⁺(aq)": "64.77",
      "Cu₂O(s)": "-168.6",
      "CuO(s)": "-157.3",
      "CuS(s)": "-48.5",
      "CuSO₄(s)": "-771.36",
      "D₂(g)": "0",
      "D₂O(l)": "-294.6",
      "D₂O(g)": "-249.2",
      "F⁻(aq)": "-332.63",
      "F₂(g)": "0",
      "Fe(s)": "0",
      "Fe²⁺(aq)": "-89.1",
      "Fe³⁺(aq)": "-48.5",
      "FeO(s)": "-272.04",
      "Fe₂O₃(s) - Hematite": "-824.2",
      "Fe₃O₄(s) - Magnetite": "-1118.4",
      "FeS(s) - α": "-100",
      "FeS₂(s) ": "-178.2",
      "H(g)": "217.97",
      "H⁺(aq)": "0",
      "H₂(g)": "0",
      "H₂O(g) - Water vapor": "-241.8",
      "H₂O(l) - Water": "-285.83",
      "H₂O₂(aq)": "-191.17",
      "H₂O₂(l)": "-187.8",
      "H₂S(aq)": "-39.7",
      "H₂S(g)": "-20.63",
      "H₂SO₄(aq)": "-909.27",
      "H₂SO₄(l)": "-813.99",
      "H₃PO₃(aq)": "-964",
      "H₃PO₄(aq)": "-277.4",
      "H₃PO₄(l)": "-1266.9",
      "HBr(g)": "-36.23",
      "HCHO(g) - Formaldehyde": "-108.57",
      "HCl(aq)": "-167.16",
      "HCl(g)": "-92.31",
      "HCN(g)": "135.1",
      "HCN(l)": "108.87",
      "HCOOH(l) - Formic acid": "-424.72",
      "HF(aq)": "-332.36",
      "HF(g)": "-271.1",
      "Hg(g)": "61.32",
      "Hg(l)": "0",
      "Hg₂Cl₂(s)": "-265.22",
      "HgO(s)": "-90.83",
      "HgS(s)": "-58.2",
      "HI(g)": "26.48",
      "HN₃(g)": "294.1",
      "HNO₃(aq)": "-207.36",
      "HNO₃(l)": "-174.1",
      "I⁻(aq)": "-55.19",
      "I₂(g)": "62.44",
      "I₂(s)": "0",
      "K(g)": "89.24",
      "K(s)": "0",
      "K⁺(aq)": "-252.38",
      "K₂S(aq)": "-471.5",
      "K₂S(s)": "-380.7",
      "KBr(s)": "-393.8",
      "KCl(s)": "-436.75",
      "KClO₃(s)": "-397.73",
      "KClO₄(s)": "-432.75",
      "KF(s)": "-567.27",
      "KI(s)": "-327.9",
      "KOH(aq)": "-482.37",
      "KOH(s)": "-424.76",
      "Mg(g)": "147.7",
      "Mg(OH)₂(s)": "-924.7",
      "Mg(s)": "0",
      "Mg²⁺(aq)": "-466.85",
      "MgBr₂(s)": "-524.3",
      "MgCl₂(s)": "-641.8",
      "MgCO₃(s)": "-1095.8",
      "MgO(s)": "-601.7",
      "MgSO₄(s)": "-1278.2",
      "MnO(s)": "-384.9",
      "MnO₂(s)": "-519.7",
      "N₂(g)": "0",
      "N₂H₄(g)": "95.4",
      "N₂H₄(l)": "50.63",
      "N₂O(g)": "82.05",
      "N₂O₄(g)": "9.16",
      "N₂O₄(l)": "-19.5",
      "Na(g)": "107.32",
      "Na(s)": "0",
      "Na⁺(aq)": "-240.12",
      "Na₂CO₃(s)": "-1130.9",
      "NaBr(s)": "-361.06",
      "NaCl(s)": "-411.15",
      "NaF(s)": "-569",
      "NaHCO₃(s)": "-947.7",
      "NaI(s)": "-287.78",
      "NaOH(aq)": "-470.11",
      "NaOH(s)": "-425.61",
      "NH₂CH₂COOH(s) - Glycine": "-532.9",
      "NH₂OH(s)": "-114.2",
      "NH₃(aq)": "-80.29",
      "NH₃(g) - Ammonia": "-46.11",
      "NH₄⁺(aq)": "-132.51",
      "NH₄Cl(s)": "-314.43",
      "NH₄ClO₄(s)": "-295.31",
      "NH₄NO₃(s)": "-365.56",
      "NiO(s)": "-244.3",
      "NO(g)": "90.25",
      "NO₂(g)": "33.18",
      "NO₃⁻(aq)": "-205",
      "O₂(g)": "0",
      "O₃(g)": "142.7",
      "OH⁻(aq)": "-229.99",
      "P(s)": "0",
      "P₄(g)": "58.91",
      "P₄O₁₀(s)": "-2984",
      "Pb(s)": "0",
      "Pb²⁺(aq)": "-1.7",
      "Pb₃O₄(s)": "-734.7",
      "PbBr₂(aq)": "-244.8",
      "PbBr₂(s)": "-278.7",
      "PbCl₂(s)": "-359.2",
      "PbO(s)": "-217.9",
      "PbO₂(s)": "-277.4",
      "PbSO₄(s)": "-919.94",
      "PCl₃(g)": "-287",
      "PCl₃(l)": "-319.7",
      "PCl₅(g)": "-374.9",
      "PCl₅(s)": "-443.5",
      "PH₃(g)": "5.4",
      "S(s) - Monoclinic": "0.33",
      "S(s) - Rhombic": "0",
      "S²⁻(aq)": "33.1",
      "SbCl₃(g)": "-313.8",
      "SbCl₅(g) ": "-394.34",
      "SbH₃(g) ": "145.11",
      "SF₆(g)": "-1209",
      "Si(s)": "0",
      "SiO₂(s)": "-859.4",
      "SiO₂(s) - α": "-910.94",
      "Sn(s) - Gray": "-2.09",
      "Sn(s) - White": "0",
      "SnCl₂(s)": "-349.8",
      "SnCl₄(l)": "-545.2",
      "SnO(s)": "-285.8",
      "SnO₂(s)": "-580.7",
      "SO₂(g)": "-296.83",
      "SO₃(g)": "-395.72",
      "SO₄²⁻(aq)": "-909.27",
      "Zn(s)": "0",
      "Zn²⁺(aq)": "-153.89",
      "ZnO(s)": "-348.28",
      "ZnS(s)": "-202.9",
    };

    // Extract all parameters from body
    const calEnthalpy = body.tech_calEnthalpy?.trim();
    const calFrom = body.tech_calFrom?.trim();
    const calFrom1 = body.tech_calFrom1?.trim();
    const q1 = body.tech_q1?.trim();
    const q1_unit = body.tech_q1_unit?.trim();
    const q2 = body.tech_q2?.trim();
    const q2_unit = body.tech_q2_unit?.trim();
    const v1 = body.tech_v1?.trim();
    const v1_unit = body.tech_v1_unit?.trim();
    const v2 = body.tech_v2?.trim();
    const v2_unit = body.tech_v2_unit?.trim();
    const p = body.tech_p?.trim();
    const p_unit = body.tech_p_unit?.trim();
    const changeQ = body.tech_changeQ?.trim();
    const changeQ_unit = body.tech_changeQ_unit?.trim();
    const changeV = body.tech_changeV?.trim();
    const changeV_unit = body.tech_changeV_unit?.trim();
    const a_n = body.tech_a_n?.trim();
    const rA = body.tech_rA?.trim();
    const rA_val = body.tech_rA_val?.trim();
    const rA_values = body.tech_rA_values?.trim();
    const b_n = body.tech_b_n?.trim();
    const rB = body.tech_rB?.trim();
    const rB_val = body.tech_rB_val?.trim();
    const rB_values = body.tech_rB_values?.trim();
    const c_n = body.tech_c_n?.trim();
    const rC = body.tech_rC?.trim();
    const rC_val = body.tech_rC_val?.trim();
    const rC_values = body.tech_rC_values?.trim();
    const d_n = body.tech_d_n?.trim();
    const pD = body.tech_pD?.trim();
    const pD_val = body.tech_pD_val?.trim();
    const pD_values = body.tech_pD_values?.trim();
    const e_n = body.tech_e_n?.trim();
    const pE = body.tech_pE?.trim();
    const pE_val = body.tech_pE_val?.trim();
    const pE_values = body.tech_pE_values?.trim();
    const f_n = body.tech_f_n?.trim();
    const pF = body.tech_pF?.trim();
    const pF_val = body.tech_pF_val?.trim();
    const pF_values = body.tech_pF_values?.trim();

    const rA_values_val = DATA_A[rA_values] || "0";
    const rB_values_val = DATA_A[rB_values] || "0";
    const rC_values_val = DATA_A[rC_values] || "0";
    const pD_values_val = DATA_A[pD_values] || "0";
    const pE_values_val = DATA_A[pE_values] || "0";
    const pF_values_val = DATA_A[pF_values] || "0";

    // Helper function for significant figures
    function sigFigs(value, digits) {
      if (value === 0.0) {
        return 0;
      }

      if (value < 0) {
        const decimalPlaces =
          digits - Math.floor(Math.log10(Math.abs(value))) - 1;
        return Number(value.toFixed(Math.max(0, decimalPlaces)));
      } else {
        const decimalPlaces = digits - Math.floor(Math.log10(value)) - 1;
        return Number(value.toFixed(Math.max(0, decimalPlaces)));
      }
    }

    // Convert pressure units to Pa
    let p_converted = parseFloat(p);
    if (isNumeric(p)) {
      if (p_unit == "bar") {
        p_converted = p_converted / 0.00001;
      } else if (p_unit == "psi") {
        p_converted = p_converted / 0.00014504;
      } else if (p_unit == "at") {
        p_converted = p_converted / 0.000010197;
      } else if (p_unit == "atm") {
        p_converted = p_converted / 0.00000987;
      } else if (p_unit == "torr") {
        p_converted = p_converted / 0.0075;
      } else if (p_unit == "hpa") {
        p_converted = p_converted / 0.01;
      } else if (p_unit == "kpa") {
        p_converted = p_converted / 0.001;
      } else if (p_unit == "mpa") {
        p_converted = p_converted / 0.000001;
      } else if (p_unit == "gpa") {
        p_converted = p_converted / 0.000000001;
      } else if (p_unit == "in_hg") {
        p_converted = p_converted / 0.0002953;
      } else if (p_unit == "mmhg") {
        p_converted = p_converted / 0.0075;
      }
    }

    // Convert q1 units to J
    let q1_converted = parseFloat(q1);
    if (isNumeric(q1)) {
      if (q1_unit == "J") {
        // Already in J
      } else if (q1_unit == "kJ") {
        q1_converted = q1_converted * 1000;
      } else if (q1_unit == "MJ") {
        q1_converted = q1_converted / 1e-6;
      } else if (q1_unit == "Wh") {
        q1_converted = q1_converted / 0.0002778;
      } else if (q1_unit == "kWh") {
        q1_converted = q1_converted / 3.6e6;
      } else if (q1_unit == "ft_lbs") {
        q1_converted = q1_converted * 1.356;
      } else if (q1_unit == "kcal") {
        q1_converted = q1_converted * 4184;
      } else if (q1_unit == "eV") {
        q1_converted = q1_converted / 6.242e18;
      }
    }

    // Convert q2 units to J
    let q2_converted = parseFloat(q2);
    if (isNumeric(q2)) {
      if (q2_unit == "J") {
        // Already in J
      } else if (q2_unit == "kJ") {
        q2_converted = q2_converted * 1000;
      } else if (q2_unit == "MJ") {
        q2_converted = q2_converted / 1e-6;
      } else if (q2_unit == "Wh") {
        q2_converted = q2_converted / 0.0002778;
      } else if (q2_unit == "kWh") {
        q2_converted = q2_converted / 3.6e6;
      } else if (q2_unit == "ft_lbs") {
        q2_converted = q2_converted * 1.356;
      } else if (q2_unit == "kcal") {
        q2_converted = q2_converted * 4184;
      } else if (q2_unit == "eV") {
        q2_converted = q2_converted / 6.242e18;
      }
    }

    // Convert changeQ units to J
    let changeQ_converted = parseFloat(changeQ);
    if (isNumeric(changeQ)) {
      if (changeQ_unit == "J") {
        // Already in J
      } else if (changeQ_unit == "KJ") {
        changeQ_converted = changeQ_converted / 0.001;
      } else if (changeQ_unit == "MJ") {
        changeQ_converted = changeQ_converted / 0.000001;
      } else if (changeQ_unit == "Wh") {
        changeQ_converted = changeQ_converted / 0.0002778;
      } else if (changeQ_unit == "kWh") {
        changeQ_converted = changeQ_converted / 3.6e6;
      } else if (changeQ_unit == "ft_lbs") {
        changeQ_converted = changeQ_converted * 1.356;
      } else if (changeQ_unit == "kcal") {
        changeQ_converted = changeQ_converted / 0.000239;
      } else if (changeQ_unit == "eV") {
        changeQ_converted = changeQ_converted / 6241534918267100245;
      }
    }

    // Convert v1 units to m³
    let v1_converted = parseFloat(v1);
    if (isNumeric(v1)) {
      if (v1_unit == "mm3") {
        v1_converted = v1_converted / 1000000000;
      } else if (v1_unit == "cm3") {
        v1_converted = v1_converted / 1000000;
      } else if (v1_unit == "dm3") {
        v1_converted = v1_converted / 1000;
      } else if (v1_unit == "m3") {
        // Already in m³
      } else if (v1_unit == "cu_in") {
        v1_converted = v1_converted / 61024;
      } else if (v1_unit == "cu_ft") {
        v1_converted = v1_converted / 35.315;
      } else if (v1_unit == "cu_yd") {
        v1_converted = v1_converted / 1.308;
      } else if (v1_unit == "ml") {
        v1_converted = v1_converted / 1000000;
      } else if (v1_unit == "cl") {
        v1_converted = v1_converted / 100000;
      } else if (v1_unit == "liters") {
        v1_converted = v1_converted / 1000;
      } else if (v1_unit == "us_gal") {
        v1_converted = v1_converted / 264.17;
      } else if (v1_unit == "uk_gal") {
        v1_converted = v1_converted / 219.97;
      } else if (v1_unit == "us_fl_oz") {
        v1_converted = v1_converted / 33814;
      } else if (v1_unit == "uk_fl_oz") {
        v1_converted = v1_converted / 35195;
      } else if (v1_unit == "cups") {
        v1_converted = v1_converted / 4227;
      } else if (v1_unit == "tbsp") {
        v1_converted = v1_converted / 66667;
      } else if (v1_unit == "tsp") {
        v1_converted = v1_converted / 200000;
      } else if (v1_unit == "us_qt") {
        v1_converted = v1_converted / 1056.7;
      } else if (v1_unit == "uk_qt") {
        v1_converted = v1_converted / 879.9;
      } else if (v1_unit == "us_pt") {
        v1_converted = v1_converted / 2113.4;
      } else if (v1_unit == "uk_pt") {
        v1_converted = v1_converted / 1759.8;
      }
    }

    // Convert v2 units to m³
    let v2_converted = parseFloat(v2);
    if (isNumeric(v2)) {
      if (v2_unit == "mm3") {
        v2_converted = v2_converted / 1000000000;
      } else if (v2_unit == "cm3") {
        v2_converted = v2_converted / 1000000;
      } else if (v2_unit == "dm3") {
        v2_converted = v2_converted / 1000;
      } else if (v2_unit === "m3") {
        // Already in m³
      } else if (v2_unit == "cu_in") {
        v2_converted = v2_converted / 61024;
      } else if (v2_unit == "cu_ft") {
        v2_converted = v2_converted / 35.315;
      } else if (v2_unit == "cu_yd") {
        v2_converted = v2_converted / 1.308;
      } else if (v2_unit == "ml") {
        v2_converted = v2_converted / 1000000;
      } else if (v2_unit == "cl") {
        v2_converted = v2_converted / 100000;
      } else if (v2_unit == "liters") {
        v2_converted = v2_converted / 1000;
      } else if (v2_unit == "us_gal") {
        v2_converted = v2_converted / 264.17;
      } else if (v2_unit == "uk_gal") {
        v2_converted = v2_converted / 219.97;
      } else if (v2_unit == "us_fl_oz") {
        v2_converted = v2_converted / 33814;
      } else if (v2_unit == "uk_fl_oz") {
        v2_converted = v2_converted / 35195;
      } else if (v2_unit == "cups") {
        v2_converted = v2_converted / 4227;
      } else if (v2_unit == "tbsp") {
        v2_converted = v2_converted / 66667;
      } else if (v2_unit == "tsp") {
        v2_converted = v2_converted / 200000;
      } else if (v2_unit == "us_qt") {
        v2_converted = v2_converted / 1056.7;
      } else if (v2_unit == "uk_qt") {
        v2_converted = v2_converted / 879.9;
      } else if (v2_unit == "us_pt") {
        v2_converted = v2_converted / 2113.4;
      } else if (v2_unit == "uk_pt") {
        v2_converted = v2_converted / 1759.8;
      }
    }

    // Convert changeV units to m³
    let changeV_converted = parseFloat(changeV);
    if (isNumeric(changeV)) {
      if (changeV_unit == "mm3") {
        changeV_converted = changeV_converted / 1000000000;
      } else if (changeV_unit == "cm3") {
        changeV_converted = changeV_converted / 1000000;
      } else if (changeV_unit == "dm3") {
        changeV_converted = changeV_converted / 1000;
      } else if (changeV_unit == "cu_in") {
        changeV_converted = changeV_converted / 61024;
      } else if (changeV_unit == "cu_ft") {
        changeV_converted = changeV_converted / 35.315;
      } else if (changeV_unit == "cu_yd") {
        changeV_converted = changeV_converted / 1.308;
      } else if (changeV_unit == "ml") {
        changeV_converted = changeV_converted / 1000000;
      } else if (changeV_unit == "cl") {
        changeV_converted = changeV_converted / 100000;
      } else if (changeV_unit == "liters") {
        changeV_converted = changeV_converted / 1000;
      } else if (changeV_unit == "us_gal") {
        changeV_converted = changeV_converted / 264.17;
      } else if (changeV_unit == "uk_gal") {
        changeV_converted = changeV_converted / 219.97;
      } else if (changeV_unit == "us_fl_oz") {
        changeV_converted = changeV_converted / 33814;
      } else if (changeV_unit == "uk_fl_oz") {
        changeV_converted = changeV_converted / 35195;
      } else if (changeV_unit == "cups") {
        changeV_converted = changeV_converted / 4227;
      } else if (changeV_unit == "tbsp") {
        changeV_converted = changeV_converted / 66667;
      } else if (changeV_unit == "tsp") {
        changeV_converted = changeV_converted / 200000;
      } else if (changeV_unit == "us_qt") {
        changeV_converted = changeV_converted / 1056.7;
      } else if (changeV_unit == "uk_qt") {
        changeV_converted = changeV_converted / 879.9;
      } else if (changeV_unit == "us_pt") {
        changeV_converted = changeV_converted / 2113.4;
      } else if (changeV_unit == "uk_pt") {
        changeV_converted = changeV_converted / 1759.8;
      }
    }

    if (calEnthalpy == "enthalpyFormula") {
      if (calFrom == "byStandard") {
        if (
          isNumeric(q1_converted) &&
          isNumeric(q2_converted) &&
          isNumeric(v1_converted) &&
          isNumeric(v2_converted) &&
          isNumeric(p_converted)
        ) {
          const changeH =
            q2_converted -
            q1_converted +
            p_converted * (v2_converted - v1_converted);
          const initial_enth = q1_converted + v1_converted * p_converted;
          const Final_enth = q2_converted + v2_converted * p_converted;
          param.tech_check = "byStandard";
          param.tech_ans = sigFigs(changeH, 4);
          param.tech_initial_enth = initial_enth;
          param.tech_Final_enth = Final_enth;
          param.tech_q1 = q1_converted;
          param.tech_q2 = q2_converted;
          param.tech_v1 = v1_converted;
          param.tech_v2 = v2_converted;
          param.tech_p = p_converted;
        } else {
          param.error = "Please fill all fields.";
          return param;
        }
      } else if (calFrom == "byChange") {
        if (
          isNumeric(changeQ_converted) &&
          isNumeric(changeV_converted) &&
          isNumeric(p_converted)
        ) {
          const changeH = changeQ_converted + p_converted * changeV_converted;
          param.tech_check = "byChange";
          param.tech_ans = sigFigs(changeH, 4);
          param.tech_changeQ = changeQ_converted;
          param.tech_changeV = changeV_converted;
          param.tech_p = p_converted;
        } else {
          param.error = "Please fill all fields.";
          return param;
        }
      } else {
        param.error = "Please fill all fields.";
        return param;
      }
    } else if (calEnthalpy == "reactionScheme") {
      const rA_text = rA_values;
      const rA_value = parseFloat(rA_values_val);

      const rB_text = rB_values;
      const rB_value = parseFloat(rB_values_val);

      const rC_text = rC_values;
      const rC_value = parseFloat(rC_values_val);

      const pD_text = pD_values;
      const pD_value = parseFloat(pD_values_val);

      const pE_text = pE_values;
      const pE_value = parseFloat(pE_values_val);

      const pF_text = pF_values;
      const pF_value = parseFloat(pF_values_val);

      const a_num = parseFloat(a_n) || 0;
      const b_num = parseFloat(b_n) || 0;
      const c_num = parseFloat(c_n) || 0;
      const d_num = parseFloat(d_n) || 0;
      const e_num = parseFloat(e_n) || 0;
      const f_num = parseFloat(f_n) || 0;

      if (
        (a_num <= 0 && b_num <= 0 && c_num <= 0) ||
        (rA_text === "None" && rB_text === "None" && rC_text === "None")
      ) {
        param.error = "Reaction requires at least one reactant.";
        return param;
      }
      if (
        (d_num <= 0 && e_num <= 0 && f_num <= 0) ||
        (pD_text === "None" && pE_text === "None" && pF_text === "None")
      ) {
        param.error = "Reaction requires at least one product.";
        return param;
      }

      let equation = "";
      let text = "";
      let text_vals = "";
      let reactants = 0;

      if (a_num !== 0 && rA_text !== "None") {
        equation = a_num + " " + rA_text;
        reactants = a_num * rA_value;
        text += rA_text + "@@@";
        text_vals += rA_value + "@@@";
      }

      if (b_num !== 0 && rB_text !== "None") {
        if (equation !== "") {
          equation += " + " + b_num + " " + rB_text;
          reactants += b_num * rB_value;
        } else {
          equation += b_num + " " + rB_text;
          reactants = b_num * rB_value;
        }
        text += rB_text + "@@@";
        text_vals += rB_value + "@@@";
      }

      if (c_num !== 0 && rC_text !== "None") {
        if (equation !== "") {
          equation += " + " + c_num + " " + rC_text;
          reactants += c_num * rC_value;
        } else {
          equation += c_num + " " + rC_text;
          reactants = c_num * rC_value;
        }
        text += rC_text + "@@@";
        text_vals += rC_value + "@@@";
      }

      let equation1 = "";
      let products = 0;

      if (d_num !== 0 && pD_text !== "None") {
        equation1 = d_num + " " + pD_text;
        products = d_num * pD_value;
        text += pD_text + "@@@";
        text_vals += pD_value + "@@@";
      }

      if (e_num !== 0 && pE_text !== "None") {
        if (equation1 !== "") {
          equation1 += " + " + e_num + " " + pE_text;
          products += e_num * pE_value;
        } else {
          equation1 += e_num + " " + pE_text;
          products = e_num * pE_value;
        }
        text += pE_text + "@@@";
        text_vals += pE_value + "@@@";
      }

      if (f_num !== 0 && pF_text !== "None") {
        if (equation1 !== "") {
          equation1 += " + " + f_num + " " + pF_text;
          products += f_num * pF_value;
        } else {
          equation1 += f_num + " " + pF_text;
          products = f_num * pF_value;
        }
        text += pF_text + "@@@";
        text_vals += pF_value + "@@@";
      }

      const reaction = equation + " → " + equation1;
      const ans = products - reactants;
      const textArray = text.split("@@@").filter((item) => item != "");
      const textValsArray = text_vals
        .split("@@@")
        .filter((item) => item != "")
        .map((val) => parseFloat(val));

      param.tech_ans = ans;
      param.tech_reaction = reaction;
      param.tech_text = textArray;
      param.tech_text_vals = textValsArray;
    } else {
      param.error = "Please fill all fields.";
      return param;
    }

    return param;

    // Helper function to check if value is numeric
    function isNumeric(value) {
      if (typeof value == "number") return true;
      if (typeof value != "string") return false;
      return !isNaN(value) && !isNaN(parseFloat(value)) && isFinite(value);
    }
  }

  /**
   * getCalculationeScaleCalculator: Service Method
   * POST: /api/calculators-lol/scale-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationeScaleCalculator(body) {
    const param = {};

    const scaled_length = body.tech_scaled_length;
    const scaled_length_unit = body.tech_scaled_length_unit;
    const real_length = body.tech_real_length;
    const real_length_unit = body.tech_real_length_unit;
    const choice = body.tech_choice;
    const y1 = body.tech_y1;
    const y2 = body.tech_y2;

    // Helper function to convert to millimeters
    function calculate(a, b) {
      if (!a || !b) return 0;

      a = parseFloat(a);
      switch (b) {
        case "ft":
          return a * 304.8;
        case "in":
          return a * 25.4;
        case "yd":
          return a * 914.4;
        case "cm":
          return a * 10;
        case "m":
          return a * 1000;
        case "mm":
          return a * 1;
        case "km":
          return a * 1000000;
        case "mi":
          return a * 1609344;
        default:
          return a;
      }
    }

    // Helper function to convert to millimeters (duplicate of calculate - keeping for consistency)
    function calculate2(a, b) {
      if (!a || !b) return 0;

      a = parseFloat(a);
      switch (b) {
        case "ft":
          return a * 304.8;
        case "in":
          return a * 25.4;
        case "yd":
          return a * 914.4;
        case "cm":
          return a * 10;
        case "m":
          return a * 1000;
        case "mm":
          return a * 1;
        case "km":
          return a * 1000000;
        case "mi":
          return a * 1609344;
        default:
          return a;
      }
    }

    // Helper function to calculate scale ratio
    function answer1(val1, val1_unit, val2, val2_unit) {
      const v1 = calculate(val1, val1_unit);
      const v2 = calculate(val2, val2_unit);

      let v5, v6;

      if (v2 >= v1) {
        const v3 = v2 / v1;
        const v4 = v2 / v2; // This will always be 1
        v5 = v4 + ":" + v3;
        v6 = v4 / v3;
      } else {
        const v3 = v1 / v2;
        const v4 = v1 / v1; // This will always be 1
        v5 = v3 + ":" + v4;
        v6 = v3 / v4;
      }

      return [v5, v6];
    }

    // Helper function for unit conversion (appears unused in the main logic)
    function calculate33(a, b) {
      if (!a || !b) return 0;

      a = parseFloat(a);
      switch (b) {
        case "ft":
          return a * 1;
        case "in":
          return a * 12;
        case "yd":
          return a / 0.333333;
        case "cm":
          return a * 30.48;
        case "m":
          return a / 3.281;
        case "mm":
          return a * 1304.8;
        case "km":
          return a / 3281;
        case "mi":
          return a / 5280;
        default:
          return a;
      }
    }

    // Main logic based on choice
    if (choice == "1") {
      if (
        isNumeric(scaled_length) &&
        isNumeric(real_length) &&
        scaled_length > 0 &&
        real_length > 0 &&
        scaled_length_unit &&
        real_length_unit
      ) {
        const ch = answer1(
          scaled_length,
          scaled_length_unit,
          real_length,
          real_length_unit
        );

        param.tech_v5 = ch[0];
        param.tech_v6 = ch[1];
        return param;
      } else {
        param.error = "Please fill all fields.";
        return param;
      }
    } else if (choice == "2") {
      if (
        isNumeric(y1) &&
        isNumeric(y2) &&
        isNumeric(real_length) &&
        y1 > 0 &&
        y2 > 0 &&
        real_length > 0
      ) {
        const z = parseFloat(y1) / parseFloat(y2);
        const answer = z * parseFloat(real_length);

        param.tech_answer = answer;
        return param;
      } else {
        param.error = "Please fill all fields.";
        return param;
      }
    } else {
      if (
        isNumeric(y1) &&
        isNumeric(y2) &&
        isNumeric(real_length) &&
        y1 > 0 &&
        y2 > 0 &&
        real_length > 0
      ) {
        const z = parseFloat(y1) / parseFloat(y2);
        const answer = parseFloat(real_length) / z;

        param.tech_answer = answer;
        return param;
      } else {
        param.error = "Please fill all fields.";
        return param;
      }
    }

    // Helper function to check if value is numeric
    function isNumeric(value) {
      if (typeof value === "number") return true;
      if (typeof value !== "string") return false;
      return !isNaN(value) && !isNaN(parseFloat(value)) && isFinite(value);
    }
  }

  /**
   * getCalculationeGearRatioCalculator: Service Method
   * POST: /api/calculators-lol/gear-ratio-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationeGearRatioCalculator(body) {
    const param = {};

    const type = body.tech_type;
    const f_first = body.tech_f_first;
    const f_second = body.tech_f_second;
    const f_third = body.tech_f_third;
    const ft_unit = body.tech_ft_unit;
    const f_four = body.tech_f_four;
    const ff_unit = body.tech_ff_unit;
    const transmissions = body.tech_transmissions;
    const s_first = body.tech_s_first;
    const s_second = body.tech_s_second;
    const s_third = body.tech_s_third;
    const s_four = body.tech_s_four;
    const s_five = body.tech_s_five;
    const s_six = body.tech_s_six;

    // Helper function to round numbers
    function round_num(n, places) {
      let tens = 1;
      while (places > 0) {
        tens = tens * 10;
        places--;
      }
      n = n * tens;
      n = Math.round(n);
      n = n / tens;
      return n;
    }

    // Helper function to get number or return '0'
    function GetNumber(n) {
      if (n > 0) {
        return n;
      } else {
        return "0";
      }
    }

    // Helper function to convert rotation units to RPM
    function rotation(a, b) {
      if (!a || !b) return 0;

      b = parseFloat(b);
      switch (a) {
        case "rpm":
          return b * 1;
        case "rad/s":
          return b * 9.55;
        case "Hz":
          return b * 60;
        default:
          return b;
      }
    }

    // Helper function to convert torque units to Nm
    function torque(a, b) {
      if (!a || !b) return 0;

      b = parseFloat(b);
      switch (a) {
        case "Nm":
          return b * 1;
        case "kg-cm":
          return b * 0.09807;
        case "J/rad":
          return b * 1;
        case "ft-lb":
          return b * 1.3558;
        default:
          return b;
      }
    }

    // Convert input values
    const f_third_converted = rotation(ft_unit, f_third);
    const f_four_converted = torque(ff_unit, f_four);

    if (type == "first") {
      if (
        isNumeric(f_first) &&
        isNumeric(f_second) &&
        isNumeric(f_third_converted) &&
        isNumeric(f_four_converted)
      ) {
        const f_first_num = parseFloat(f_first);
        const f_second_num = parseFloat(f_second);

        if (f_first_num >= 3) {
          if (f_second_num >= 3) {
            const gear_ratio = f_first_num / f_second_num;
            const mechanical = f_second_num / f_first_num;
            const output_rot = gear_ratio * f_third_converted;
            const output_tor = mechanical * f_four_converted;

            param.tech_gear_ratio = gear_ratio;
            param.tech_mechanical = mechanical;
            param.tech_output_rot = output_rot;
            param.tech_output_tor = output_tor;
          } else {
            param.error =
              "This calculator only determines gear ratios for gears with 3 or more teeth.";
            return param;
          }
        } else {
          param.error =
            "This calculator is limited to gears with 3 or more teeth.";
          return param;
        }
      } else {
        param.error = "Please! Check Your Input";
        return param;
      }
    } else if (type == "second") {
      if (
        isNumeric(s_first) &&
        isNumeric(s_second) &&
        isNumeric(s_third) &&
        isNumeric(s_four) &&
        isNumeric(s_five) &&
        isNumeric(s_six)
      ) {
        let transratio1_value,
          transratio2_value,
          transratio3_value,
          transratio4_value,
          transratio5_value,
          transratio6_value;

        // Transmission ratio mappings
        const transmissionRatios = {
          "T-5 2.95 - .63": ["2.95", "1.94", "1.34", "1.00", ".63", ""],
          "Magnum XL 2.66 - .50": [
            "2.66",
            "1.78",
            "1.30",
            "1.00",
            ".74",
            ".50",
          ],
          "Magnum XL 2.97 - .63": [
            "2.97",
            "2.10",
            "1.46",
            "1.00",
            ".80",
            ".63",
          ],
          "Magnum 2.66 - .63": ["2.66", "1.78", "1.30", "1.00", ".80", ".63"],
          "Magnum 2.97 - .50": ["2.97", "2.10", "1.46", "1.00", ".74", ".50"],
          "Magnum-F 2.66 - .63": ["2.66", "1.78", "1.30", "1.00", ".80", ".63"],
          "Magnum-F 2.97 - .63": ["2.97", "2.10", "1.46", "1.00", ".80", ".63"],
          "Magnum-F 2.66 - .50": ["2.66", "1.78", "1.30", "1.00", ".74", ".50"],
          "Magnum-F 2.97 - .50": ["2.97", "2.10", "1.46", "1.00", ".74", ".50"],
          "TKO-500 3.27 - .68": ["3.27", "1.98", "1.34", "1.00", ".68", ""],
          "TKO-600 2.87 - .64": ["2.87", "1.89", "1.28", "1.00", ".64", ""],
          "TKO-600 2.87 - .82": ["2.87", "1.89", "1.28", "1.00", ".82", ""],
          "TKX 3.27 - .72": ["3.27", "1.98", "1.34", "1.00", ".72", ""],
          "TKX 2.87 - .81": ["2.87", "1.89", "1.28", "1.00", ".81", ""],
          "TKX 2.87 - .68": ["2.87", "1.89", "1.28", "1.00", ".68", ""],
          "GM Muncie 2.20 - 1.00": ["2.20", "1.64", "1.28", "1.00", "", ""],
          "Ford Toploader 2.32 - 1.00": [
            "2.32",
            "1.69",
            "1.29",
            "1.00",
            "",
            "",
          ],
          "Ford Toploader 2.78 - 1.00": [
            "2.78",
            "1.93",
            "1.36",
            "1.00",
            "",
            "",
          ],
          "A-833 HEMI 4-Speed 2.44 - 1.00": [
            "2.44",
            "1.77",
            "1.34",
            "1.00",
            "",
            "",
          ],
        };

        if (transmissionRatios[transmissions]) {
          [
            transratio1_value,
            transratio2_value,
            transratio3_value,
            transratio4_value,
            transratio5_value,
            transratio6_value,
          ] = transmissionRatios[transmissions];
        } else {
          param.error = "Invalid transmission type selected.";
          return param;
        }

        const s_first_num = parseFloat(s_first);
        const s_second_num = parseFloat(s_second);
        const s_third_num = parseFloat(s_third);
        const s_four_num = parseFloat(s_four);
        const s_five_num = parseFloat(s_five);
        const s_six_num = parseFloat(s_six);

        const GearFactor =
          (s_first_num * s_third_num * 0.002975) / s_second_num;

        const mph1 = GetNumber(
          round_num(GearFactor / parseFloat(transratio1_value), 2)
        );
        const mph2 = GetNumber(
          round_num(GearFactor / parseFloat(transratio2_value), 2)
        );
        const mph3 = GetNumber(
          round_num(GearFactor / parseFloat(transratio3_value), 2)
        );
        const mph4 = GetNumber(
          round_num(GearFactor / parseFloat(transratio4_value), 2)
        );
        const mph5 = GetNumber(
          round_num(GearFactor / parseFloat(transratio5_value), 2)
        );
        const mph6 = GetNumber(
          round_num(GearFactor / parseFloat(transratio6_value), 2)
        );

        const mph1_value = mph1;
        const mph2_value = GetNumber(mph2) > 0 ? mph2 : "";
        const mph3_value = GetNumber(mph3) > 0 ? mph3 : "";
        const mph4_value = GetNumber(mph4) > 0 ? mph4 : "";
        const mph5_value = GetNumber(mph5) > 0 ? mph5 : "";
        const mph6_value = GetNumber(mph6) > 0 ? mph6 : "";

        const height = (s_four_num / 25.4) * (s_six_num / 100) * 2 + s_five_num;
        const width = s_four_num / 25.4;

        param.tech_height = height;
        param.tech_width = width;
        param.tech_mph1_value = mph1_value;
        param.tech_mph2_value = mph2_value;
        param.tech_mph3_value = mph3_value;
        param.tech_mph4_value = mph4_value;
        param.tech_mph5_value = mph5_value;
        param.tech_mph6_value = mph6_value;
        param.tech_transratio1_value = transratio1_value;
        param.tech_transratio2_value = transratio2_value;
        param.tech_transratio3_value = transratio3_value;
        param.tech_transratio4_value = transratio4_value;
        param.tech_transratio5_value = transratio5_value;
        param.tech_transratio6_value = transratio6_value;
      } else {
        param.error = "Please! Check Your Input";
        return param;
      }
    }

    param.tech_type = type;
    return param;

    // Helper function to check if value is numeric
    function isNumeric(value) {
      if (typeof value == "number") return true;
      if (typeof value != "string") return false;
      return !isNaN(value) && !isNaN(parseFloat(value)) && isFinite(value);
    }
  }

  /** getCalculationAmpHourCalculation
   * POST: /api/calculators-lol/amp-hour-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationAmpHourCalculation(body) {
    let find = body.tech_find;
    let vol = parseFloat(body.tech_vol);
    let bc = parseFloat(body.tech_bc);
    let bc_unit = body.tech_bc_unit;
    let wt_hour = parseFloat(body.tech_wt_hour);
    let wt_hour_unit = body.tech_wt_hour_unit;
    let c_rate = parseFloat(body.tech_c_rate);
    let type = body.tech_type;
    let load_size = parseFloat(body.tech_load_size);
    let load_duration = parseFloat(body.tech_load_duration);
    let tempchk = body.tech_temp_chk;
    let agechk = body.tech_age_chk;
    let batteries = body.tech_batteries;

    let param = {};
    let ans, dc;

    // Normalize units
    if (bc_unit === "Ah") bc_unit = 1;
    else if (bc_unit === "mAh") bc_unit = 0.001;

    if (wt_hour_unit === "kJ") wt_hour_unit = 0.2778;
    else if (wt_hour_unit === "MJ") wt_hour_unit = 277.8;
    else if (wt_hour_unit === "Wh") wt_hour_unit = 1;
    else if (wt_hour_unit === "kWh") wt_hour_unit = 1000;

    if (type === "first") {
      if (find === "1") {
        if (isFinite(vol) && isFinite(wt_hour) && isFinite(c_rate)) {
          let wt_val = wt_hour * wt_hour_unit;
          ans = wt_val / vol;
          let bc_val = ans;
          dc = c_rate * bc_val;
        } else {
          param.error = "Please! Check Input";
          return param;
        }
      } else if (find === "2") {
        if (isFinite(bc) && isFinite(wt_hour) && isFinite(c_rate)) {
          let wt_val = wt_hour * wt_hour_unit;
          let bc_val = bc * bc_unit;
          ans = wt_val / bc_val;
          dc = c_rate * bc_val;
        } else {
          param.error = "Please! Check Input";
          return param;
        }
      } else if (find === "3") {
        if (isFinite(bc) && isFinite(vol) && isFinite(c_rate)) {
          let bc_val = bc * bc_unit;
          ans = bc_val * vol;
          dc = c_rate * bc_val;
        } else {
          param.error = "Please! Check Input";
          return param;
        }
      }
      param.tech_find = find;
      param.tech_dc = dc;
      param.tech_c_rate = c_rate;
    } else if (type === "second") {
      if (isFinite(load_size) && isFinite(load_duration)) {
        let E3 = load_size;
        let E4 = load_duration;
        let E9 = agechk === "checked" ? 0.05 : 0;
        let E14 = tempchk === "checked" ? 0.1 : 0;

        let typeValue = 1;
        if (batteries === "gel") typeValue = 1.15;
        else if (batteries === "agm") typeValue = 1.1;
        else if (batteries === "flooded") typeValue = 1.4;

        let E25 = E3 * 20;
        let E26 = E4 / 20;
        let E27 = E9 + E14 + typeValue;
        let E28 = Math.pow(E25, E27);
        let E29 = E28 * E26;
        let E30 = Math.log(E29);
        let E31 = E30 / E27;
        ans = Math.ceil(Math.exp(E31)) * 2;
      } else {
        param.error = "Please! Check Input";
        return param;
      }
    }

    param.tech_type = type;
    param.tech_ans = ans;
    return param;
  }

  /** getCalculationParallelResistorCalculation
   * POST: /api/calculators-lol/parallel-resistor-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationParallelResistorCalculation(body) {
    let mode = body.tech_mode;
    let res_val = body.tech_res_val; // array of values
    let unit = body.tech_unit; // array of corresponding unit multipliers
    let missing = body.tech_missing;
    let mis_unit = body.tech_mis_unit;

    let array = [];

    // Convert mis_unit
    // if (mis_unit === "nm") {
    //   mis_unit = 0.001;
    // } else if (mis_unit === "μm") {
    //   mis_unit = 1;
    // } else if (mis_unit === "mm") {
    //   mis_unit = 1000;
    // } else if (mis_unit === "cm") {
    //   mis_unit = 1000000;
    // }

    //  mΩ   Ω  kΩ  MΩ
    // Convert mis_unit
    if (mis_unit == "mΩ") {
      mis_unit = 0.001;
    } else if (mis_unit == "Ω") {
      mis_unit = 1;
    } else if (mis_unit == "kΩ") {
      mis_unit = 1000;
    } else if (mis_unit == "MΩ") {
      mis_unit = 1000000;
    }

    // Validate and process resistors
    for (let y = 0; y < res_val.length; y++) {
      let val = parseFloat(res_val[y]);
      let scale = parseFloat(unit[y]);

      if (!isFinite(val) || !isFinite(scale)) {
        return { error: "Please fill all fields." };
      }

      if (val === 0) {
        return { error: "Resistor value greater than zero." };
      }

      array.push(1 / (val * scale));
    }

    let lcm = array.reduce((acc, val) => acc + val, 0);
    let main_ans;

    if (mode == "1") {
      main_ans = 1 / lcm;
    } else if (mode == "2") {
      let missingValue = parseFloat(missing) * mis_unit;

      if (!isFinite(missingValue)) {
        return { error: "Please fill all fields." };
      }

      if (missingValue < 0) {
        return { error: "Desired Total Resistance cannot be negative.." };
      }

      main_ans = 1 / (1 / missingValue - lcm);
    }

    let answer, displayUnit;

    if (main_ans > 1000) {
      answer = main_ans / 1000;
      displayUnit = "kΩ";
    } else {
      answer = main_ans;
      displayUnit = "Ω";
    }

    return {
      tech_mode: mode,
      tech_answer: answer,
      tech_unit: displayUnit,
    };
  }

  /**
   * getCalculationeResistanceCalculator: Service Method
   * POST: /api/calculators-lol/resistance-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationeResistanceCalculator(body) {
    const param = {};

    const operations = body.tech_operations;
    const band = body.tech_band;
    const first = body.tech_first;
    const second = body.tech_second;
    const third = body.tech_third;
    const multi = body.tech_multi;
    const tolerance = body.tech_tolerance;
    const temp = body.tech_temp;
    const x = body.tech_x;
    const length = body.tech_length;
    const l_unit = body.tech_l_unit;
    const diameter = body.tech_diameter;
    const d_unit = body.tech_d_unit;
    const conductivity = body.tech_conductivity;

    // Helper function for length conversion to meters
    function con(a, b) {
      if (!a || !b) return 0;

      b = parseFloat(b);
      switch (a) {
        case "ft":
          return b / 3.281;
        case "yd":
          return b / 1.094;
        case "in":
          return b / 39.37;
        case "mile":
          return b * 1609;
        case "m":
          return b * 1;
        case "km":
          return b * 1000;
        case "cm":
          return b / 100;
        default:
          return b;
      }
    }

    // Resistor color bands data
    const bands = {
      black: [0, 1, " Ω", "0", "250ppm/K (U)"],
      brown: [1, 10, " Ω", "±1% (F)", "100ppm/K (S)"],
      red: [2, 100, " Ω", "±2% (G)", "50ppm/K (R)"],
      orange: [3, 1, " kΩ", "±0.05% (W)", "15ppm/K (P)"],
      yellow: [4, 10, " kΩ", "±0.02% (P)", "25ppm/K (Q)"],
      green: [5, 100, " kΩ", "±0.5% (D)", "20ppm/K (Z)"],
      blue: [6, 1, " MΩ", "±0.25% (C)", "10ppm/K (Z)"],
      violet: [7, 10, " MΩ", "±0.1% (B)", "5ppm/K (M)"],
      grey: [8, 100, " MΩ", "±0.01% (L)", "1ppm/K (K)"],
      white: [9, 1, " GΩ", "0", 0],
      gold: [0, 0.1, " Ω", "±5% (J)", 0],
      silver: [0, 0.01, " Ω", "±10% (K)", 0],
    };

    let answer;

    if (operations == "1") {
      // Resistor color code calculation
      if (band == "3") {
        const first_data = bands[first];
        const second_data = bands[second];
        const multi_data = bands[multi];
        const resistanceValue =
          parseInt(first_data[0].toString() + second_data[0].toString()) *
          multi_data[1];
        answer = resistanceValue + multi_data[2] + " ±20% (M)";
      } else if (band == "4") {
        const first_data = bands[first];
        const second_data = bands[second];
        const multi_data = bands[multi];
        const tol_data = bands[tolerance];
        const resistanceValue =
          parseInt(first_data[0].toString() + second_data[0].toString()) *
          multi_data[1];
        answer = resistanceValue + multi_data[2] + " " + tol_data[3];
      } else if (band == "5") {
        const first_data = bands[first];
        const second_data = bands[second];
        const third_data = bands[third];
        const multi_data = bands[multi];
        const tol_data = bands[tolerance];

        let divide;
        if (multi_data[1] === 10 || multi_data[1] === 0.01) {
          divide = 100;
        } else if (multi_data[1] === 100 || multi_data[1] === 0.1) {
          divide = 10;
        } else {
          divide = multi_data[1];
        }

        const resistanceValue =
          parseInt(
            first_data[0].toString() +
              second_data[0].toString() +
              third_data[0].toString()
          ) / divide;
        answer = resistanceValue + multi_data[2] + " " + tol_data[3];
      } else if (band == "6") {
        const first_data = bands[first];
        const second_data = bands[second];
        const third_data = bands[third];
        const multi_data = bands[multi];
        const tol_data = bands[tolerance];
        const temp_data = bands[temp];

        let divide;
        if (multi_data[1] == 10 || multi_data[1] == 0.01) {
          divide = 100;
        } else if (multi_data[1] == 100 || multi_data[1] == 0.1) {
          divide = 10;
        } else {
          divide = multi_data[1];
        }

        const resistanceValue =
          parseInt(
            first_data[0].toString() +
              second_data[0].toString() +
              third_data[0].toString()
          ) / divide;
        answer =
          resistanceValue +
          multi_data[2] +
          " " +
          tol_data[3] +
          " " +
          temp_data[4];
      }
    } else if (operations == "2") {
      // Series resistance calculation
      if (x && x.trim() != "") {
        let check = true;
        const numbers = x
          .split(",")
          .map((val) => val.trim())
          .filter((val) => val !== "");

        // Validate all values are numeric
        for (const value of numbers) {
          if (!isNumeric(value)) {
            check = false;
            break;
          }
        }

        if (check == true) {
          const numericValues = numbers.map((val) => parseFloat(val));
          answer = numericValues.reduce((sum, val) => sum + val, 0);
        } else {
          param.error = "Please! Check Your Input";
          return param;
        }
      } else {
        param.error = "Please! Check Your Input";
        return param;
      }
    } else if (operations == "3") {
      // Resistivity calculation
      if (isNumeric(length) && isNumeric(diameter) && isNumeric(conductivity)) {
        const length_converted = con(l_unit, length);
        const diameter_converted = con(d_unit, diameter);
        const divide = diameter_converted / 2;
        const radius = 3.14 * Math.pow(divide, 2);
        const mul = radius * parseFloat(conductivity);
        answer = length_converted / mul;
      } else {
        param.error = "Please! Check Your Input";
        return param;
      }
    }

    param.tech_operations = operations;
    param.tech_answer = answer;
    return param;

    // Helper function to check if value is numeric
    function isNumeric(value) {
      if (typeof value === "number") return true;
      if (typeof value !== "string") return false;
      return !isNaN(value) && !isNaN(parseFloat(value)) && isFinite(value);
    }
  }

  /**
   * getCalculationeWireSizeCalculator: Service Method
   * POST: /api/calculators-lol/wire-size-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationeWireSizeCalculator(body) {
    const param = {};

    const submit = body.tech_unit_type?.trim();
    const type = body.tech_type?.trim();
    const s_voltage = body.tech_s_voltage?.trim();
    const sv_units = body.tech_sv_units?.trim();
    const voltage_drop = body.tech_voltage_drop?.trim();
    const c_units = body.tech_c_units?.trim();
    const current = body.tech_current?.trim();
    const current_unit = body.tech_current_unit?.trim();
    const wire_length = body.tech_wire_length?.trim();
    const wl_units = body.tech_wl_units?.trim();
    const w_temp = body.tech_w_temp?.trim();
    const wt_units = body.tech_wt_units?.trim();
    const wire_gauge = body.tech_wire_gauge?.trim();
    const wire_diameter = body.tech_wire_diameter?.trim();
    const wd_units = body.tech_wd_units?.trim();

    // AWG wire gauge data
    const AWG = {
      "0000 (4/0)": {
        inches: 0.46,
        mm: 11.684,
        kcmil: 211.6,
        "mm²": 107,
        ft: 0.049,
        m: 0.1608,
      },
      "000 (3/0)": {
        inches: 0.4096,
        mm: 10.405,
        kcmil: 167.81,
        "mm²": 85,
        ft: 0.0618,
        m: 0.2028,
      },
      "00 (2/0)": {
        inches: 0.3648,
        mm: 9.266,
        kcmil: 133.08,
        "mm²": 67.4,
        ft: 0.0779,
        m: 0.2557,
      },
      "0 (1/0)": {
        inches: 0.3249,
        mm: 8.251,
        kcmil: 105.53,
        "mm²": 53.5,
        ft: 0.0983,
        m: 0.3224,
      },
      1: {
        inches: 0.2893,
        mm: 7.348,
        kcmil: 83.693,
        "mm²": 42.4,
        ft: 0.1239,
        m: 0.4066,
      },
      2: {
        inches: 0.2576,
        mm: 6.544,
        kcmil: 66.371,
        "mm²": 33.6,
        ft: 0.1563,
        m: 0.5127,
      },
      3: {
        inches: 0.2294,
        mm: 5.827,
        kcmil: 52.635,
        "mm²": 26.7,
        ft: 0.197,
        m: 0.6464,
      },
      4: {
        inches: 0.2043,
        mm: 5.189,
        kcmil: 41.741,
        "mm²": 21.1,
        ft: 0.2485,
        m: 0.8152,
      },
      5: {
        inches: 0.1819,
        mm: 4.621,
        kcmil: 33.102,
        "mm²": 16.8,
        ft: 0.3133,
        m: 1.028,
      },
      6: {
        inches: 0.162,
        mm: 4.115,
        kcmil: 26.251,
        "mm²": 13.3,
        ft: 0.3951,
        m: 1.296,
      },
      7: {
        inches: 0.1443,
        mm: 3.665,
        kcmil: 20.818,
        "mm²": 10.5,
        ft: 0.4982,
        m: 1.634,
      },
      8: {
        inches: 0.1285,
        mm: 3.264,
        kcmil: 16.51,
        "mm²": 8.36,
        ft: 0.6282,
        m: 1.634,
      },
      9: {
        inches: 0.1144,
        mm: 2.906,
        kcmil: 13.093,
        "mm²": 6.63,
        ft: 0.7921,
        m: 2.599,
      },
      10: {
        inches: 0.1019,
        mm: 2.588,
        kcmil: 10.383,
        "mm²": 5.26,
        ft: 0.9988,
        m: 3.277,
      },
      11: {
        inches: 0.0907,
        mm: 2.305,
        kcmil: 8.234,
        "mm²": 4.17,
        ft: 1.26,
        m: 4.132,
      },
      12: {
        inches: 0.0808,
        mm: 2.053,
        kcmil: 6.53,
        "mm²": 3.31,
        ft: 1.588,
        m: 5.211,
      },
      13: {
        inches: 0.072,
        mm: 1.828,
        kcmil: 5.178,
        "mm²": 2.62,
        ft: 2.003,
        m: 6.571,
      },
      14: {
        inches: 0.0641,
        mm: 1.628,
        kcmil: 4.107,
        "mm²": 2.08,
        ft: 2.525,
        m: 8.285,
      },
      15: {
        inches: 0.0571,
        mm: 1.45,
        kcmil: 3.257,
        "mm²": 1.65,
        ft: 3.184,
        m: 10.448,
      },
      16: {
        inches: 0.0508,
        mm: 1.291,
        kcmil: 2.583,
        "mm²": 1.31,
        ft: 4.015,
        m: 13.174,
      },
      17: {
        inches: 0.0453,
        mm: 1.15,
        kcmil: 2.048,
        "mm²": 1.04,
        ft: 5.063,
        m: 16.612,
      },
      18: {
        inches: 0.0403,
        mm: 1.024,
        kcmil: 1.624,
        "mm²": 0.823,
        ft: 6.385,
        m: 20.948,
      },
      19: {
        inches: 0.0403,
        mm: 1.024,
        kcmil: 1.624,
        "mm²": 0.653,
        ft: 6.385,
        m: 20.948,
      },
      20: {
        inches: 0.032,
        mm: 0.8118,
        kcmil: 1.022,
        "mm²": 0.518,
        ft: 10.152,
        m: 33.308,
      },
      21: {
        inches: 0.0285,
        mm: 0.7229,
        kcmil: 0.8101,
        "mm²": 0.41,
        ft: 12.802,
        m: 42.001,
      },
      22: {
        inches: 0.0253,
        mm: 0.6438,
        kcmil: 0.6424,
        "mm²": 0.326,
        ft: 16.143,
        m: 52.962,
      },
      23: {
        inches: 0.0226,
        mm: 0.5733,
        kcmil: 0.5095,
        "mm²": 0.258,
        ft: 20.356,
        m: 66.784,
      },
      24: {
        inches: 0.0201,
        mm: 0.5106,
        kcmil: 0.404,
        "mm²": 0.205,
        ft: 25.668,
        m: 84.213,
      },
      25: {
        inches: 0.0179,
        mm: 0.4547,
        kcmil: 0.3204,
        "mm²": 0.162,
        ft: 32.367,
        m: 106.19,
      },
      26: {
        inches: 0.0159,
        mm: 0.4049,
        kcmil: 0.2541,
        "mm²": 0.129,
        ft: 40.814,
        m: 133.9,
      },
      27: {
        inches: 0.0142,
        mm: 0.3606,
        kcmil: 0.2015,
        "mm²": 0.102,
        ft: 51.466,
        m: 168.85,
      },
      28: {
        inches: 0.0126,
        mm: 0.3211,
        kcmil: 0.1598,
        "mm²": 0.081,
        ft: 64.897,
        m: 212.92,
      },
      29: {
        inches: 0.0113,
        mm: 0.2859,
        kcmil: 0.1267,
        "mm²": 0.0642,
        ft: 81.833,
        m: 268.48,
      },
      30: {
        inches: 0.01,
        mm: 0.2546,
        kcmil: 0.1005,
        "mm²": 0.0509,
        ft: 103.19,
        m: 338.55,
      },
      31: {
        inches: 0.008928,
        mm: 0.2268,
        kcmil: 0.0797,
        "mm²": 0.0404,
        ft: 130.12,
        m: 426.9,
      },
      32: {
        inches: 0.00795,
        mm: 0.2019,
        kcmil: 0.0632,
        "mm²": 0.032,
        ft: 164.08,
        m: 538.32,
      },
      33: {
        inches: 0.00708,
        mm: 0.1798,
        kcmil: 0.0501,
        "mm²": 0.0254,
        ft: 206.9,
        m: 678.8,
      },
      34: {
        inches: 0.006305,
        mm: 0.006305,
        kcmil: 0.0398,
        "mm²": 0.0201,
        ft: 260.9,
        m: 260.9,
      },
      35: {
        inches: 0.005615,
        mm: 0.1426,
        kcmil: 0.0315,
        "mm²": 0.016,
        ft: 328.98,
        m: 1079.3,
      },
      36: {
        inches: 0.005,
        mm: 0.127,
        kcmil: 0.025,
        "mm²": 0.0127,
        ft: 414.84,
        m: 1361,
      },
      37: {
        inches: 0.004453,
        mm: 0.1131,
        kcmil: 0.0198,
        "mm²": 0.01,
        ft: 523.1,
        m: 1716.2,
      },
      38: {
        inches: 0.003965,
        mm: 0.1007,
        kcmil: 0.0157,
        "mm²": 0.007967,
        ft: 659.62,
        m: 2164.1,
      },
      39: {
        inches: 0.003531,
        mm: 0.0897,
        kcmil: 0.0125,
        "mm²": 0.00632,
        ft: 831.77,
        m: 2728.9,
      },
      40: {
        inches: 0.003145,
        mm: 0.0799,
        kcmil: 0.009888,
        "mm²": 0.00501,
        ft: 1048.8,
        m: 3441.1,
      },
    };

    // Helper function for material properties
    function munits(unit) {
      const result = {};
      switch (unit) {
        case "copper":
          result.unit = 1.68;
          result.tempCoefficient = 0.00404;
          break;
        case "aluminum":
          result.unit = 2.65;
          result.tempCoefficient = 0.0039;
          break;
        case "gold":
          result.unit = 2.44;
          result.tempCoefficient = 0;
          break;
        case "silver":
          result.unit = 1.59;
          result.tempCoefficient = 0;
          break;
        case "nickel":
          result.unit = 6.99;
          result.tempCoefficient = 0;
          break;
        case "steel":
          result.unit = 1;
          result.tempCoefficient = 0;
          break;
        default:
          result.unit = 1.68;
          result.tempCoefficient = 0.00404;
      }
      return result;
    }

    // Helper function to find nearest AWG value by cross-sectional area
    function getNearestValue(arr, target) {
      let nearest = null;
      let minDiff = Number.MAX_SAFE_INTEGER;
      let index = null;
      let return_val = null;

      for (const [key, value] of Object.entries(arr)) {
        const mm_val = value["mm²"];
        const diff = Math.abs(mm_val - target);
        if (diff < minDiff) {
          minDiff = diff;
          nearest = mm_val;
          index = key;
          return_val = value;
        }
      }

      return [nearest, index, return_val];
    }

    // Helper function to find nearest AWG value by diameter
    function getNearestValueDiameter(arr, diameter) {
      let nearest = null;
      let minDiff = Number.MAX_SAFE_INTEGER;
      let index = null;
      let return_val = null;

      for (const [key, value] of Object.entries(arr)) {
        const mm_val = value["inches"];
        const diff = Math.abs(mm_val - diameter);
        if (diff < minDiff) {
          minDiff = diff;
          nearest = mm_val;
          index = key;
          return_val = value;
        }
      }

      return [nearest, index, return_val];
    }

    // Initialize variables to avoid reference errors
    let res = null;
    let metalunit = null;
    let am = null;
    let v = null;

    // Main logic
    if (submit == "wire_size") {
      if (
        isNumeric(s_voltage) &&
        isNumeric(voltage_drop) &&
        isNumeric(current) &&
        isNumeric(wire_length) &&
        isNumeric(w_temp)
      ) {
        let s_voltage_converted = parseFloat(s_voltage);
        let current_converted = parseFloat(current);
        let wire_length_converted = parseFloat(wire_length);
        let w_temp_converted = parseFloat(w_temp);

        // Convert source voltage units
        if (sv_units) {
          switch (sv_units) {
            case "mV":
              s_voltage_converted = s_voltage_converted * 0.001;
              break;
            case "kV":
              s_voltage_converted = s_voltage_converted * 1000;
              break;
            case "MV":
              s_voltage_converted = s_voltage_converted * 1000000;
              break;
          }
        }

        // Convert current units
        if (current_unit) {
          switch (current_unit) {
            case "mA":
              current_converted = current_converted * 0.001;
              break;
            case "µA":
              current_converted = current_converted * 0.000001;
              break;
          }
        }

        // Convert wire length units to meters
        if (wl_units) {
          switch (wl_units) {
            case "cm":
              wire_length_converted = wire_length_converted * 0.01;
              break;
            case "km":
              wire_length_converted = wire_length_converted * 1000;
              break;
            case "in":
              wire_length_converted = wire_length_converted * 0.0254;
              break;
            case "ft":
              wire_length_converted = wire_length_converted * 0.3048;
              break;
            case "yd":
              wire_length_converted = wire_length_converted * 0.9144;
              break;
            case "mi":
              wire_length_converted = wire_length_converted * 1609.3;
              break;
            case "°C": // This seems incorrect - °C is temperature, not length
              // Assuming this should be meters by default
              break;
          }
        }

        // Convert temperature units
        if (wt_units) {
          switch (wt_units) {
            case "°F":
              w_temp_converted = ((w_temp_converted - 32) * 5) / 9; // Fixed: Convert to Celsius
              break;
            case "K":
              w_temp_converted = w_temp_converted - 273.15; // Fixed: Convert to Celsius
              break;
            case "°C":
              // Already in Celsius, no conversion needed
              break;
          }
        }

        if (type == "single_phase") {
          const result = munits(c_units);
          metalunit = result.unit;
          const tempCoefficient = result.tempCoefficient;

          if (w_temp_converted >= 50) {
            metalunit =
              metalunit * (1 + tempCoefficient * (w_temp_converted - 20));
          }

          const pow = Math.pow(10, -8);
          res =
            current_converted * metalunit * pow * (2 * wire_length_converted);
          const v_d = parseFloat(voltage_drop) / 100;
          v = v_d * s_voltage_converted;
          am = res / v;
          const single_phase = am * 1000000;
          const s_data = getNearestValue(AWG, single_phase);

          param.tech_single_phase = single_phase;
          param.tech_s_data = s_data;
        } else if (type == "three_phase") {
          const result = munits(c_units);
          metalunit = result.unit;

          if (w_temp_converted >= 50) {
            const tempCoefficient = result.tempCoefficient;
            metalunit =
              metalunit * (1 + tempCoefficient * (w_temp_converted - 20));
          }

          const sqrt = Math.sqrt(3);
          const pow = Math.pow(10, -8);
          res =
            sqrt * current_converted * metalunit * pow * wire_length_converted;
          const v_d = parseFloat(voltage_drop) / 100;
          v = v_d * s_voltage_converted;
          am = res / v;
          const three_phase = Math.round(am * 1000000 * 100) / 100;
          const t_data = getNearestValue(AWG, three_phase);

          param.tech_three_phase = three_phase;
          param.tech_t_data = t_data;
          param.tech_sqrt = sqrt;
        }

        param.tech_type = type;
        param.tech_res = res;
        param.tech_s_voltage = s_voltage_converted;
        param.tech_voltage_drop = voltage_drop;
        param.tech_current = current_converted;
        param.tech_metalunit = metalunit;
        param.tech_wire_length = wire_length_converted;
        param.tech_c_units = c_units;
        param.tech_am = am;
        param.tech_v = v;
      } else {
        param.error = "Please fill all fields.";
        return param;
      }
    } else if (submit === "wire_diameter") {
      if (wire_gauge) {
        let inches, mm, kcmil, sqinches, mm2;

        if (wire_gauge.endsWith("-kcmil")) {
          const parts = wire_gauge.split("-");
          const new_string = parts[0];
          kcmil = parseFloat(new_string);
          const sd_in = kcmil / 1000;
          inches = Math.sqrt(sd_in);
          mm = inches * 25.4;
          const p = Math.pow(mm, 2);
          const pai = 3.14 / 4;
          sqinches = pai * sd_in;
          mm2 = pai * p;
        } else {
          const modelDetail = AWG[wire_gauge];
          inches = modelDetail["inches"];
          mm = modelDetail["mm"];
          kcmil = modelDetail["kcmil"];
          const in_val = kcmil / 1000;
          const pai = 3.14 / 4;
          sqinches = pai * in_val;
          mm2 = modelDetail["mm²"];
        }

        param.tech_inches = inches;
        param.tech_sqinches = sqinches;
        param.tech_mm = mm;
        param.tech_kcmil = kcmil;
        param.tech_mm2 = mm2;
      } else {
        param.error = "Please fill all fields.";
        return param;
      }
    } else if (submit === "wire_gauge") {
      if (isNumeric(wire_diameter)) {
        let wire_diameter_converted = parseFloat(wire_diameter);

        // Convert diameter units to inches
        if (wd_units) {
          switch (wd_units) {
            case "mm":
              wire_diameter_converted = wire_diameter_converted / 25.4;
              break;
            case "cm":
              wire_diameter_converted = wire_diameter_converted / 2.54;
              break;
            case "in":
              // Already in inches, no conversion needed
              break;
          }
        }

        const d_data = getNearestValueDiameter(AWG, wire_diameter_converted);
        const p = Math.pow(wire_diameter_converted, 2);
        const kcmil = p * 1000;
        const pai = 22 / 7;
        const dpai = pai / 4;
        const inches = kcmil / 1000;
        const square_in = inches * dpai;

        param.tech_d_data = d_data;
        param.tech_square_in = square_in;
      } else {
        param.error = "Please fill all fields.";
        return param;
      }
    } else {
      param.error = "Please fill all fields.";
      return param;
    }

    param.tech_submit = submit;
    return param;

    // Helper function to check if value is numeric
    function isNumeric(value) {
      if (typeof value === "number") return true;
      if (typeof value !== "string") return false;
      return !isNaN(value) && !isNaN(parseFloat(value)) && isFinite(value);
    }
  }

  /**
   * getCalculationeDcWireSizeCalculator: Service Method
   * POST: /api/calculators-lol/dc-wire-size-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationeDcWireSizeCalculator(body) {
    const param = {};

    const submit = body.tech_wire?.trim();
    const type = body.tech_type?.trim();
    const s_voltage = body.tech_s_voltage?.trim();
    const sv_units = body.tech_sv_units?.trim();
    const voltage_drop = body.tech_voltage_drop?.trim();
    const c_units = body.tech_c_units?.trim();
    const current = body.tech_current?.trim();
    const current_unit = body.tech_current_unit?.trim();
    const wire_length = body.tech_wire_length?.trim();
    const wl_units = body.tech_wl_units?.trim();
    const w_temp = body.tech_w_temp?.trim();
    const wt_units = body.tech_wt_units?.trim();
    const wire_gauge = body.tech_wire_gauge?.trim();
    const wire_diameter = body.tech_wire_diameter?.trim();
    const wd_units = body.tech_wd_units?.trim();

    // AWG wire gauge data
    const AWG = {
      "0000 (4/0)": {
        inches: 0.46,
        mm: 11.684,
        kcmil: 211.6,
        "mm²": 107,
        ft: 0.049,
        m: 0.1608,
      },
      "000 (3/0)": {
        inches: 0.4096,
        mm: 10.405,
        kcmil: 167.81,
        "mm²": 85,
        ft: 0.0618,
        m: 0.2028,
      },
      "00 (2/0)": {
        inches: 0.3648,
        mm: 9.266,
        kcmil: 133.08,
        "mm²": 67.4,
        ft: 0.0779,
        m: 0.2557,
      },
      "0 (1/0)": {
        inches: 0.3249,
        mm: 8.251,
        kcmil: 105.53,
        "mm²": 53.5,
        ft: 0.0983,
        m: 0.3224,
      },
      1: {
        inches: 0.2893,
        mm: 7.348,
        kcmil: 83.693,
        "mm²": 42.4,
        ft: 0.1239,
        m: 0.4066,
      },
      2: {
        inches: 0.2576,
        mm: 6.544,
        kcmil: 66.371,
        "mm²": 33.6,
        ft: 0.1563,
        m: 0.5127,
      },
      3: {
        inches: 0.2294,
        mm: 5.827,
        kcmil: 52.635,
        "mm²": 26.7,
        ft: 0.197,
        m: 0.6464,
      },
      4: {
        inches: 0.2043,
        mm: 5.189,
        kcmil: 41.741,
        "mm²": 21.1,
        ft: 0.2485,
        m: 0.8152,
      },
      5: {
        inches: 0.1819,
        mm: 4.621,
        kcmil: 33.102,
        "mm²": 16.8,
        ft: 0.3133,
        m: 1.028,
      },
      6: {
        inches: 0.162,
        mm: 4.115,
        kcmil: 26.251,
        "mm²": 13.3,
        ft: 0.3951,
        m: 1.296,
      },
      7: {
        inches: 0.1443,
        mm: 3.665,
        kcmil: 20.818,
        "mm²": 10.5,
        ft: 0.4982,
        m: 1.634,
      },
      8: {
        inches: 0.1285,
        mm: 3.264,
        kcmil: 16.51,
        "mm²": 8.36,
        ft: 0.6282,
        m: 1.634,
      },
      9: {
        inches: 0.1144,
        mm: 2.906,
        kcmil: 13.093,
        "mm²": 6.63,
        ft: 0.7921,
        m: 2.599,
      },
      10: {
        inches: 0.1019,
        mm: 2.588,
        kcmil: 10.383,
        "mm²": 5.26,
        ft: 0.9988,
        m: 3.277,
      },
      11: {
        inches: 0.0907,
        mm: 2.305,
        kcmil: 8.234,
        "mm²": 4.17,
        ft: 1.26,
        m: 4.132,
      },
      12: {
        inches: 0.0808,
        mm: 2.053,
        kcmil: 6.53,
        "mm²": 3.31,
        ft: 1.588,
        m: 5.211,
      },
      13: {
        inches: 0.072,
        mm: 1.828,
        kcmil: 5.178,
        "mm²": 2.62,
        ft: 2.003,
        m: 6.571,
      },
      14: {
        inches: 0.0641,
        mm: 1.628,
        kcmil: 4.107,
        "mm²": 2.08,
        ft: 2.525,
        m: 8.285,
      },
      15: {
        inches: 0.0571,
        mm: 1.45,
        kcmil: 3.257,
        "mm²": 1.65,
        ft: 3.184,
        m: 10.448,
      },
      16: {
        inches: 0.0508,
        mm: 1.291,
        kcmil: 2.583,
        "mm²": 1.31,
        ft: 4.015,
        m: 13.174,
      },
      17: {
        inches: 0.0453,
        mm: 1.15,
        kcmil: 2.048,
        "mm²": 1.04,
        ft: 5.063,
        m: 16.612,
      },
      18: {
        inches: 0.0403,
        mm: 1.024,
        kcmil: 1.624,
        "mm²": 0.823,
        ft: 6.385,
        m: 20.948,
      },
      19: {
        inches: 0.0403,
        mm: 1.024,
        kcmil: 1.624,
        "mm²": 0.653,
        ft: 6.385,
        m: 20.948,
      },
      20: {
        inches: 0.032,
        mm: 0.8118,
        kcmil: 1.022,
        "mm²": 0.518,
        ft: 10.152,
        m: 33.308,
      },
      21: {
        inches: 0.0285,
        mm: 0.7229,
        kcmil: 0.8101,
        "mm²": 0.41,
        ft: 12.802,
        m: 42.001,
      },
      22: {
        inches: 0.0253,
        mm: 0.6438,
        kcmil: 0.6424,
        "mm²": 0.326,
        ft: 16.143,
        m: 52.962,
      },
      23: {
        inches: 0.0226,
        mm: 0.5733,
        kcmil: 0.5095,
        "mm²": 0.258,
        ft: 20.356,
        m: 66.784,
      },
      24: {
        inches: 0.0201,
        mm: 0.5106,
        kcmil: 0.404,
        "mm²": 0.205,
        ft: 25.668,
        m: 84.213,
      },
      25: {
        inches: 0.0179,
        mm: 0.4547,
        kcmil: 0.3204,
        "mm²": 0.162,
        ft: 32.367,
        m: 106.19,
      },
      26: {
        inches: 0.0159,
        mm: 0.4049,
        kcmil: 0.2541,
        "mm²": 0.129,
        ft: 40.814,
        m: 133.9,
      },
      27: {
        inches: 0.0142,
        mm: 0.3606,
        kcmil: 0.2015,
        "mm²": 0.102,
        ft: 51.466,
        m: 168.85,
      },
      28: {
        inches: 0.0126,
        mm: 0.3211,
        kcmil: 0.1598,
        "mm²": 0.081,
        ft: 64.897,
        m: 212.92,
      },
      29: {
        inches: 0.0113,
        mm: 0.2859,
        kcmil: 0.1267,
        "mm²": 0.0642,
        ft: 81.833,
        m: 268.48,
      },
      30: {
        inches: 0.01,
        mm: 0.2546,
        kcmil: 0.1005,
        "mm²": 0.0509,
        ft: 103.19,
        m: 338.55,
      },
      31: {
        inches: 0.008928,
        mm: 0.2268,
        kcmil: 0.0797,
        "mm²": 0.0404,
        ft: 130.12,
        m: 426.9,
      },
      32: {
        inches: 0.00795,
        mm: 0.2019,
        kcmil: 0.0632,
        "mm²": 0.032,
        ft: 164.08,
        m: 538.32,
      },
      33: {
        inches: 0.00708,
        mm: 0.1798,
        kcmil: 0.0501,
        "mm²": 0.0254,
        ft: 206.9,
        m: 678.8,
      },
      34: {
        inches: 0.006305,
        mm: 0.006305,
        kcmil: 0.0398,
        "mm²": 0.0201,
        ft: 260.9,
        m: 260.9,
      },
      35: {
        inches: 0.005615,
        mm: 0.1426,
        kcmil: 0.0315,
        "mm²": 0.016,
        ft: 328.98,
        m: 1079.3,
      },
      36: {
        inches: 0.005,
        mm: 0.127,
        kcmil: 0.025,
        "mm²": 0.0127,
        ft: 414.84,
        m: 1361,
      },
      37: {
        inches: 0.004453,
        mm: 0.1131,
        kcmil: 0.0198,
        "mm²": 0.01,
        ft: 523.1,
        m: 1716.2,
      },
      38: {
        inches: 0.003965,
        mm: 0.1007,
        kcmil: 0.0157,
        "mm²": 0.007967,
        ft: 659.62,
        m: 2164.1,
      },
      39: {
        inches: 0.003531,
        mm: 0.0897,
        kcmil: 0.0125,
        "mm²": 0.00632,
        ft: 831.77,
        m: 2728.9,
      },
      40: {
        inches: 0.003145,
        mm: 0.0799,
        kcmil: 0.009888,
        "mm²": 0.00501,
        ft: 1048.8,
        m: 3441.1,
      },
    };

    // Helper function for material properties
    function munits(unit) {
      const result = {};
      switch (unit) {
        case "copper":
          result.unit = 1.68;
          result.tempCoefficient = 0.00404;
          break;
        case "aluminum":
          result.unit = 2.65;
          result.tempCoefficient = 0.0039;
          break;
        case "gold":
          result.unit = 2.44;
          result.tempCoefficient = 0;
          break;
        case "silver":
          result.unit = 1.59;
          result.tempCoefficient = 0;
          break;
        case "nickel":
          result.unit = 6.99;
          result.tempCoefficient = 0;
          break;
        case "steel":
          result.unit = 1;
          result.tempCoefficient = 0;
          break;
        default:
          result.unit = 1.68;
          result.tempCoefficient = 0.00404;
      }
      return result;
    }

    // Helper function to find nearest AWG value by cross-sectional area
    function getNearestValue(arr, target) {
      let nearest = null;
      let minDiff = Number.MAX_SAFE_INTEGER;
      let index = null;
      let return_val = null;

      for (const [key, value] of Object.entries(arr)) {
        const mm_val = value["mm²"];
        const diff = Math.abs(mm_val - target);
        if (diff < minDiff) {
          minDiff = diff;
          nearest = mm_val;
          index = key;
          return_val = value;
        }
      }

      return [nearest, index, return_val];
    }

    // Helper function to find nearest AWG value by diameter
    function getNearestValueDiameter(arr, diameter) {
      let nearest = null;
      let minDiff = Number.MAX_SAFE_INTEGER;
      let index = null;
      let return_val = null;

      for (const [key, value] of Object.entries(arr)) {
        const mm_val = value["inches"];
        const diff = Math.abs(mm_val - diameter);
        if (diff < minDiff) {
          minDiff = diff;
          nearest = mm_val;
          index = key;
          return_val = value;
        }
      }

      return [nearest, index, return_val];
    }

    // Initialize variables to avoid reference errors
    let res = null;
    let metalunit = null;
    let am = null;
    let v = null;

    // Main logic
    if (submit === "wire_size") {
      if (
        isNumeric(s_voltage) &&
        isNumeric(voltage_drop) &&
        isNumeric(current) &&
        isNumeric(wire_length) &&
        isNumeric(w_temp)
      ) {
        let s_voltage_converted = parseFloat(s_voltage);
        let current_converted = parseFloat(current);
        let wire_length_converted = parseFloat(wire_length);
        let w_temp_converted = parseFloat(w_temp);

        // Convert source voltage units
        if (sv_units) {
          switch (sv_units) {
            case "mV":
              s_voltage_converted = s_voltage_converted * 0.001;
              break;
            case "kV":
              s_voltage_converted = s_voltage_converted * 1000;
              break;
            case "MV":
              s_voltage_converted = s_voltage_converted * 1000000;
              break;
          }
        }

        // Convert current units
        if (current_unit) {
          switch (current_unit) {
            case "mA":
              current_converted = current_converted * 0.001;
              break;
            case "µA":
              current_converted = current_converted * 0.000001;
              break;
          }
        }

        // Convert wire length units to meters
        if (wl_units) {
          switch (wl_units) {
            case "cm":
              wire_length_converted = wire_length_converted * 0.01;
              break;
            case "km":
              wire_length_converted = wire_length_converted * 1000;
              break;
            case "in":
              wire_length_converted = wire_length_converted * 0.0254;
              break;
            case "ft":
              wire_length_converted = wire_length_converted * 0.3048;
              break;
            case "yd":
              wire_length_converted = wire_length_converted * 0.9144;
              break;
            case "mi":
              wire_length_converted = wire_length_converted * 1609.3;
              break;
          }
        }

        // Convert temperature units
        if (wt_units) {
          switch (wt_units) {
            case "°F":
              w_temp_converted = ((w_temp_converted - 32) * 5) / 9; // Convert to Celsius
              break;
            case "K":
              w_temp_converted = w_temp_converted - 273.15; // Convert to Celsius
              break;
          }
        }

        if (type === "single_phase") {
          const result = munits(c_units);
          metalunit = result.unit;
          const tempCoefficient = result.tempCoefficient;

          if (w_temp_converted >= 50) {
            metalunit =
              metalunit * (1 + tempCoefficient * (w_temp_converted - 20));
          }

          const pow = Math.pow(10, -8);
          res =
            current_converted * metalunit * pow * (2 * wire_length_converted);
          const v_d = parseFloat(voltage_drop) / 100;
          v = v_d * s_voltage_converted;
          am = res / v;
          const single_phase = am * 1000000;
          const s_data = getNearestValue(AWG, single_phase);

          param.tech_single_phase = single_phase;
          param.tech_s_data = s_data;
        } else if (type === "three_phase") {
          const result = munits(c_units);
          metalunit = result.unit;

          if (w_temp_converted >= 50) {
            const tempCoefficient = result.tempCoefficient;
            metalunit =
              metalunit * (1 + tempCoefficient * (w_temp_converted - 20));
          }

          const sqrt = Math.sqrt(3);
          const pow = Math.pow(10, -8);
          res =
            sqrt * current_converted * metalunit * pow * wire_length_converted;
          const v_d = parseFloat(voltage_drop) / 100;
          v = v_d * s_voltage_converted;
          am = res / v;
          const three_phase = Math.round(am * 1000000 * 100) / 100;
          const t_data = getNearestValue(AWG, three_phase);

          param.tech_three_phase = three_phase;
          param.tech_t_data = t_data;
          param.tech_sqrt = sqrt;
        }

        param.tech_type = type;
        param.tech_res = res;
        param.tech_s_voltage = s_voltage_converted;
        param.tech_voltage_drop = voltage_drop;
        param.tech_current = current_converted;
        param.tech_metalunit = metalunit;
        param.tech_wire_length = wire_length_converted;
        param.tech_c_units = c_units;
        param.tech_am = am;
        param.tech_v = v;
      } else {
        param.error = "Please! Check Your Input";
        return param;
      }
    } else if (submit === "wire_diameter") {
      if (wire_gauge) {
        let inches, mm, kcmil, sqinches, mm2;

        if (wire_gauge.endsWith("-kcmil")) {
          const parts = wire_gauge.split("-");
          const new_string = parts[0];
          kcmil = parseFloat(new_string);
          const sd_in = kcmil / 1000;
          inches = Math.sqrt(sd_in);
          mm = inches * 25.4;
          const p = Math.pow(mm, 2);
          const pai = 3.14 / 4;
          sqinches = pai * sd_in;
          mm2 = pai * p;
        } else {
          const modelDetail = AWG[wire_gauge];
          if (modelDetail) {
            inches = modelDetail["inches"];
            mm = modelDetail["mm"];
            kcmil = modelDetail["kcmil"];
            const in_val = kcmil / 1000;
            const pai = 3.14 / 4;
            sqinches = pai * in_val;
            mm2 = modelDetail["mm²"];
          } else {
            param.error = "Invalid wire gauge selected";
            return param;
          }
        }

        param.tech_inches = inches;
        param.tech_sqinches = sqinches;
        param.tech_mm = mm;
        param.tech_kcmil = kcmil;
        param.tech_mm2 = mm2;
      } else {
        param.error = "Please! Check Your Input";
        return param;
      }
    } else if (submit == "wire_gauge") {
      if (isNumeric(wire_diameter)) {
        let wire_diameter_converted = parseFloat(wire_diameter);

        // Convert diameter units to inches
        if (wd_units) {
          switch (wd_units) {
            case "mm":
              wire_diameter_converted = wire_diameter_converted / 25.4;
              break;
            case "cm":
              wire_diameter_converted = wire_diameter_converted / 2.54;
              break;
          }
        }

        const d_data = getNearestValueDiameter(AWG, wire_diameter_converted);
        const p = Math.pow(wire_diameter_converted, 2);
        const kcmil = p * 1000;
        const pai = 22 / 7;
        const dpai = pai / 4;
        const inches = kcmil / 1000;
        const square_in = inches * dpai;

        param.tech_d_data = d_data;
        param.tech_square_in = square_in;
      } else {
        param.error = "Please! Check Your Input11";
        return param;
      }
    } else {
      param.error = "Please! Check Your Input";
      return param;
    }

    param.tech_submit = submit;
    return param;

    // Helper function to check if value is numeric
    function isNumeric(value) {
      if (typeof value == "number") return true;
      if (typeof value != "string") return false;
      return !isNaN(value) && !isNaN(parseFloat(value)) && isFinite(value);
    }
  }

  /** getCalculationdResultantForceCalculation
   * POST: /api/calculators-lol/resultant-force-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationdResultantForceCalculation(body) {
    let forces = body.tech_force;
    let angles = body.tech_angle;

    let param = {};

    function degToRad(degrees) {
      return degrees * (Math.PI / 180);
    }

    function calculateResultantForce(forces, angles) {
      let Fx = 0;
      let Fy = 0;

      for (let i = 0; i < forces.length; i++) {
        Fx += forces[i] * Math.cos(degToRad(angles[i]));
        Fy += forces[i] * Math.sin(degToRad(angles[i]));
      }

      let magnitude = Math.sqrt(Fx ** 2 + Fy ** 2);
      let direction = Math.atan2(Fy, Fx) * (180 / Math.PI);

      return {
        Fx,
        Fy,
        magnitude,
        direction,
      };
    }

    if (Array.isArray(forces) && Array.isArray(angles)) {
      if (forces.length !== angles.length) {
        param.error = "Number of forces and angle must be the same.";
        return param;
      }

      const result = calculateResultantForce(forces, angles);

      param.tech_Horizontal = result.Fx;
      param.tech_Vertical = result.Fy;
      param.tech_Magnitude = result.magnitude;
      param.tech_Direction = result.direction;
      return param;
    } else {
      param.error = "Please! Check Your Input";
      return param;
    }
  }

  /** getCalculationdAmpstoWattsCalculation
   * POST: /api/calculators-lol/amps-to-watts-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationdAmpstoWattsCalculation(body) {
    let current_type = body.tech_current_type;
    let current = parseFloat(body.tech_current);
    let current_unit = body.tech_current_unit;
    let voltage_type = body.tech_voltage_type;
    let voltage = parseFloat(body.tech_voltage);
    let voltage_unit = body.tech_voltage_unit;
    let power = parseFloat(body.tech_power);

    let param = {};

    function convertVoltage(value, unit) {
      if (unit === "mV") return value / 1000;
      if (unit === "V") return value;
      return value * 1000; // Assume kV
    }

    function convertCurrent(value, unit) {
      if (unit === "mA") return value / 1000;
      if (unit === "A") return value;
      return value * 1000; // Assume kA
    }

    if (!isNaN(current) && !isNaN(voltage)) {
      current = convertCurrent(current, current_unit);
      voltage = convertVoltage(voltage, voltage_unit);

      let power_ans = 0;

      if (current_type === "DC") {
        power_ans = current * voltage;
      } else if (current_type === "AC") {
        if (!isNaN(power)) {
          power_ans = current * voltage * power;
        } else {
          param.error = "Please! Check Your Input";
          return param;
        }
      } else {
        if (!isNaN(power)) {
          if (voltage_type === "ltl") {
            power_ans = 1.7320508 * current * voltage * power;
          } else {
            power_ans = 3 * current * voltage * power;
          }
        } else {
          param.error = "Please! Check Your Input";
          return param;
        }
      }

      param.tech_power_ans = power_ans;
      return param;
    } else {
      param.error = "Please! Check Your Input";
      return param;
    }
  }

  /** getCalculationdWattstoAmpsCalculation
   * POST: /api/calculators-lol/watts-to-amps-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationdWattstoAmpsCalculation(body) {
    let current_type = body.tech_current_type;
    let power = parseFloat(body.tech_power);
    let power_unit = body.tech_power_unit;
    let voltage_type = body.tech_voltage_type;
    let voltage = parseFloat(body.tech_voltage);
    let voltage_unit = body.tech_voltage_unit;
    let power_factor = parseFloat(body.tech_power_factor);

    let param = {};

    function convert(value, unit) {
      if (unit === "mW" || unit === "mV") return value / 1000;
      if (unit === "W" || unit === "V") return value;
      return value * 1000; // Assume kW/kV
    }

    if (!isNaN(power) && !isNaN(voltage)) {
      power = convert(power, power_unit);
      voltage = convert(voltage, voltage_unit);

      let amps_ans = 0;

      if (current_type === "DC") {
        amps_ans = power / voltage;
      } else if (current_type === "AC") {
        if (!isNaN(power_factor)) {
          amps_ans = power / (voltage * power_factor);
        } else {
          param.error = "Please! Check Your Input";
          return param;
        }
      } else {
        if (!isNaN(power_factor)) {
          if (voltage_type === "ltl") {
            amps_ans = power / (1.7320508 * voltage * power_factor);
          } else {
            amps_ans = power / (3 * voltage * power_factor);
          }
        } else {
          param.error = "Please! Check Your Input";
          return param;
        }
      }

      param.tech_amps_ans = amps_ans;
      return param;
    } else {
      param.error = "Please! Check Your Input";
      return param;
    }
  }

  /**
   * getCalculationeBeamDeflectionCalculator: Service Method
   * POST: /api/calculators-lol/beam-deflection-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationeBeamDeflectionCalculator(body) {
    let operations = body.tech_operations;
    let shape_1 = body.tech_shape_1;
    let shape_2 = body.tech_shape_2;
    let first = body.tech_first;
    let second = body.tech_second;
    let third = body.tech_third;
    let four = body.tech_four;
    let five = body.tech_five;
    let six = body.tech_six;
    let seven = body.tech_seven;
    let unit1 = body.tech_unit1;
    let unit2 = body.tech_unit2;
    let unit3 = body.tech_unit3;
    let unit4 = body.tech_unit4;
    let unit5 = body.tech_unit5;
    let unit6 = body.tech_unit6;
    let unit7 = body.tech_unit7;
    let shape1_extra = body.tech_shape1_extra;

    const result = {};

    // Conversion functions
    const m = (a, b) => {
      const conversions = {
        cm: b / 100,
        mm: b / 1000,
        m: b * 1,
        in: b / 39.37,
        ft: b / 3.281,
        yd: b / 1.094,
      };
      return conversions[a] || b;
    };

    const kn = (a, b) => {
      const conversions = {
        N: b / 1000,
        kN: b * 1,
        MN: b * 1000,
        GN: b * 1000000,
        TN: b * 1000000000,
        ibf: b * 0.004448,
        kip: b * 4.448,
      };
      return conversions[a] || b;
    };

    const mpa = (a, b) => {
      const conversions = {
        Pa: b * 0.000001,
        psi: b * 0.006895,
        kPa: b * 0.001,
        MPa: b * 1,
        GPa: b * 1000,
        "kN/m²": b * 0.001,
      };
      return conversions[a] || b;
    };

    const m4 = (a, b) => {
      const conversions = {
        "m⁴": b * 1,
        "cm⁴": b * 0.00000001,
        "mm⁴": b * 0.000000000001,
        "in⁴": b * 0.0000004162,
        "ft⁴": b * 0.008631,
      };
      return conversions[a] || b;
    };

    const nm = (a, b) => {
      const conversions = {
        "N/m": b * 1,
        "kN/m": b * 1000,
        "ibf/in": b * 175.13,
        "ibf/ft": b * 14.594,
        "dyn/cm": b * 0.001,
        "kip/ft": b * 14594,
        "kip/in": b * 175128,
      };
      return conversions[a] || b;
    };

    const dnm = (a, b) => {
      const conversions = {
        "N.m": b * 1,
        "kgf.cm": b * 0.09807,
        "J/rad": b * 1,
        "ibf.ft": b * 1.3558,
        "ibf.in": b * 0.11298,
      };
      return conversions[a] || b;
    };

    try {
      // Convert all inputs to standard units
      const convertedFirst = m(unit1, parseFloat(first));
      const convertedSecond = kn(unit2, parseFloat(second));
      const convertedThird = mpa(unit3, parseFloat(third));
      const convertedFour = m4(unit4, parseFloat(four));
      const convertedFive = m(unit5, parseFloat(five));
      const convertedSix = nm(unit6, parseFloat(six));
      const convertedSeven = dnm(unit7, parseFloat(seven));

      let stiffness, max_def;

      if (operations == "1") {
        if (shape_1 == "1") {
          if (
            !isNaN(convertedFirst) &&
            !isNaN(convertedSecond) &&
            !isNaN(convertedThird) &&
            !isNaN(convertedFour)
          ) {
            const l_cube = Math.pow(convertedFirst, 3);
            const upper_mul = convertedSecond * l_cube;
            const lower_mul = 48 * convertedThird * convertedFour;
            stiffness = convertedThird * convertedFour;
            max_def = upper_mul / lower_mul;
          } else {
            result.error = "Please! Check Your Input";
            return result;
          }
        } else if (shape_1 == "2") {
          if (
            !isNaN(convertedFirst) &&
            !isNaN(convertedSecond) &&
            !isNaN(convertedThird) &&
            !isNaN(convertedFour) &&
            !isNaN(convertedFive)
          ) {
            if (convertedFive < convertedFirst) {
              const distance_b = convertedFirst - convertedFive;
              stiffness = convertedThird * convertedFour;
              const lower_mul = 48 * convertedThird * convertedFour;
              const up_minus =
                3 * Math.pow(convertedFirst, 2) - 4 * Math.pow(distance_b, 2);
              const up_mul = convertedSecond * distance_b * up_minus;
              max_def = up_mul / lower_mul;
              result.tech_distance_b = distance_b;
            } else {
              result.error =
                'Please input a value for "a" that is smaller than the span length, "L".';
              return result;
            }
          } else {
            result.error = "Please! Check Your Input";
            return result;
          }
        } else if (shape_1 == "3") {
          if (
            !isNaN(convertedFirst) &&
            !isNaN(convertedSix) &&
            !isNaN(convertedThird) &&
            !isNaN(convertedFour)
          ) {
            const l_four = Math.pow(convertedFirst, 4);
            const upper_mul = 5 * convertedSix * l_four;
            const lower_mul = 384 * convertedThird * convertedFour;
            stiffness = convertedThird * convertedFour;
            max_def = upper_mul / lower_mul;
          } else {
            result.error = "Please! Check Your Input";
            return result;
          }
        } else if (shape_1 == "4") {
          if (
            !isNaN(convertedFirst) &&
            !isNaN(convertedSix) &&
            !isNaN(convertedThird) &&
            !isNaN(convertedFour)
          ) {
            if (shape1_extra == "1") {
              const l_four = Math.pow(convertedFirst, 4);
              const upper_mul = 0.00652 * convertedSix * l_four;
              stiffness = convertedThird * convertedFour;
              max_def = upper_mul / stiffness / 1000;
            } else if (shape1_extra === "2") {
              const l_four = Math.pow(convertedFirst, 4);
              const upper_mul = 0.00652 * convertedSix * l_four;
              stiffness = convertedThird * convertedFour;
              max_def = upper_mul / stiffness / 1000;
              const x = convertedFirst / 1.9256;
              result.tech_x = x;
            }
          } else {
            result.error = "Please! Check Your Input";
            return result;
          }
        } else if (shape_1 == "5") {
          if (
            !isNaN(convertedFirst) &&
            !isNaN(convertedSix) &&
            !isNaN(convertedThird) &&
            !isNaN(convertedFour)
          ) {
            const l_four = Math.pow(convertedFirst, 4);
            const upper_mul = convertedSix * l_four;
            const lower_mul = 120 * convertedThird * convertedFour;
            stiffness = convertedThird * convertedFour;
            max_def = upper_mul / lower_mul;
          } else {
            result.error = "Please! Check Your Input";
            return result;
          }
        } else if (shape_1 == "6") {
          if (
            !isNaN(convertedFirst) &&
            !isNaN(convertedSeven) &&
            !isNaN(convertedThird) &&
            !isNaN(convertedFour)
          ) {
            if (shape1_extra == "1") {
              const l_sq = Math.pow(convertedFirst, 2);
              const upper_mul = convertedSeven * l_sq;
              const lower_mul = 9 * Math.sqrt(3) * convertedSeven * l_sq;
              stiffness = convertedThird * convertedFour;
              max_def = upper_mul / lower_mul / 1000;
            } else if (shape1_extra === "2") {
              const l_sq = Math.pow(convertedFirst, 2);
              const upper_mul = convertedSeven * l_sq;
              const lower_mul = 9 * Math.sqrt(3) * convertedSeven * l_sq;
              stiffness = convertedThird * convertedFour;
              max_def = upper_mul / lower_mul / 1000;
              const x = convertedFirst / 1.723;
              result.tech_x = x;
            }
          } else {
            result.error = "Please! Check Your Input";
            return result;
          }
        }
      } else if (operations == "2") {
        if (shape_2 == "1") {
          if (
            !isNaN(convertedFirst) &&
            !isNaN(convertedSecond) &&
            !isNaN(convertedThird) &&
            !isNaN(convertedFour)
          ) {
            const l_cube = Math.pow(convertedFirst, 3);
            const upper_mul = convertedSecond * l_cube;
            const lower_mul = 3 * convertedThird * convertedFour;
            stiffness = convertedThird * convertedFour;
            max_def = upper_mul / lower_mul;
          } else {
            result.error = "Please! Check Your Input";
            return result;
          }
        } else if (shape_2 == "2") {
          if (
            !isNaN(convertedFirst) &&
            !isNaN(convertedSecond) &&
            !isNaN(convertedThird) &&
            !isNaN(convertedFour) &&
            !isNaN(convertedFive)
          ) {
            if (convertedFive < convertedFirst) {
              const distance_b = convertedFirst - convertedFive;
              const upper_mul =
                convertedSecond *
                Math.pow(convertedFive, 2) *
                (3 * convertedFirst - convertedFive);
              const lower_mul = 6 * convertedThird * convertedFour;
              stiffness = convertedThird * convertedFour;
              max_def = upper_mul / lower_mul;
              result.tech_distance_b = distance_b;
            } else {
              result.error =
                'Please input a value for "a" that is smaller than the span length, "L".';
              return result;
            }
          } else {
            result.error = "Please! Check Your Input";
            return result;
          }
        } else if (shape_2 == "3") {
          if (
            !isNaN(convertedFirst) &&
            !isNaN(convertedSix) &&
            !isNaN(convertedThird) &&
            !isNaN(convertedFour)
          ) {
            const upper_mul = convertedSix * Math.pow(convertedFirst, 4);
            const lower_mul = 8 * convertedThird * convertedFour;
            stiffness = convertedThird * convertedFour;
            max_def = upper_mul / lower_mul / 1000;
          } else {
            result.error = "Please! Check Your Input";
            return result;
          }
        } else if (shape_2 == "4") {
          if (
            !isNaN(convertedFirst) &&
            !isNaN(convertedSix) &&
            !isNaN(convertedThird) &&
            !isNaN(convertedFour)
          ) {
            const upper_mul = convertedSix * Math.pow(convertedFirst, 4);
            const lower_mul = 30 * convertedThird * convertedFour;
            stiffness = convertedThird * convertedFour;
            max_def = upper_mul / lower_mul / 1000;
          } else {
            result.error = "Please! Check Your Input";
            return result;
          }
        } else if (shape_2 == "5") {
          if (
            !isNaN(convertedFirst) &&
            !isNaN(convertedSix) &&
            !isNaN(convertedThird) &&
            !isNaN(convertedFour)
          ) {
            const upper_mul = 11 * convertedSix * Math.pow(convertedFirst, 4);
            const lower_mul = 120 * convertedThird * convertedFour;
            stiffness = convertedThird * convertedFour;
            max_def = upper_mul / lower_mul / 1000;
          } else {
            result.error = "Please! Check Your Input";
            return result;
          }
        } else if (shape_2 == "6") {
          if (
            !isNaN(convertedFirst) &&
            !isNaN(convertedSix) &&
            !isNaN(convertedThird) &&
            !isNaN(convertedFour)
          ) {
            const upper_mul = convertedSix * Math.pow(convertedFirst, 4);
            const lower_mul = 8 * convertedThird * convertedFour;
            stiffness = convertedThird * convertedFour;
            max_def = upper_mul / lower_mul / 1000;
          } else {
            result.error = "Please! Check Your Input";
            return result;
          }
        }
      }

      result.tech_stiffness = stiffness;
      result.tech_max_def = max_def;

      return result;
    } catch (error) {
      result.error = "An error occurred during calculation";
      return result;
    }
  }

  /** getCalculationdWaveSpeedCalculation
   * POST: /api/calculators-lol/wave-speed-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationdWaveSpeedCalculation(body) {
    let frequency = parseFloat(body.tech_frequency);
    let f_unit = body.tech_f_unit;
    let wavelength = parseFloat(body.tech_wavelength);
    let w_units = body.tech_w_units;

    let param = {};

    if (!isNaN(frequency) && !isNaN(wavelength)) {
      // Frequency unit conversion
      switch (f_unit) {
        case "kHz":
          frequency *= 1e3;
          break;
        case "MHz":
          frequency *= 1e6;
          break;
        case "GHz":
          frequency *= 1e9;
          break;
        case "THz":
          frequency *= 1e12;
          break;
      }

      // Wavelength unit conversion
      switch (w_units) {
        case "nm":
          wavelength *= 1e-9;
          break;
        case "μm":
          wavelength *= 1e-6;
          break;
        case "mm":
          wavelength *= 1e-3;
          break;
        case "cm":
          wavelength *= 1e-2;
          break;
        case "km":
          wavelength *= 1e3;
          break;
        case "in":
          wavelength *= 0.0254;
          break;
        case "ft":
          wavelength *= 0.3048;
          break;
        case "yd":
          wavelength *= 0.9144;
          break;
        case "mi":
          wavelength *= 1609.344;
          break;
      }

      let t = 1 / frequency; // Period
      let vn = 1 / wavelength; // Wavenumber
      let v = frequency * wavelength; // Wave speed

      param.tech_frequency = frequency;
      param.tech_wavelength = wavelength;
      param.tech_t = t;
      param.tech_vn = vn;
      param.tech_v = v;

      return param;
    } else {
      param.error = "Please! Check Your Input";
      return param;
    }
  }

  /** getCalculationdElectricFluxCalculation
   * POST: /api/calculators-lol/electric-flux-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationdElectricFluxCalculation(body) {
    let electric = parseFloat(body.tech_electric?.toString().trim());
    let surface = parseFloat(body.tech_surface?.toString().trim());
    let degree = parseFloat(body.tech_degree?.toString().trim());
    let charge = parseFloat(body.tech_charge?.toString().trim());
    let unit = body.tech_unit?.toString().trim();
    let constant = parseFloat(body.tech_const?.toString().trim());
    let power = parseFloat(body.tech_power?.toString().trim());

    let param = {};

    function sigFig1(value, digits) {
      if (value === 0) return 0;
      let decimalPlaces = digits - Math.floor(Math.log10(Math.abs(value))) - 1;
      return Number(value.toFixed(decimalPlaces));
    }

    if (
      !isNaN(electric) &&
      !isNaN(surface) &&
      !isNaN(degree) &&
      !isNaN(charge) &&
      !isNaN(constant) &&
      !isNaN(power)
    ) {
      // Charge unit conversion
      switch (unit) {
        case "picocoulomb":
          charge *= 0.001;
          break;
        case "microcoulomb":
          charge *= 1000;
          break;
        case "millicoulomb":
          charge *= 1e6;
          break;
        case "coulomb":
          charge *= 1e9;
          break;
        case "elementry":
          charge *= 1.602e-10;
          break;
        case "ampere":
          charge *= 3.6e12;
          break;
        case "milliampere":
          charge *= 3.6e9;
          break;
      }

      // Gauss Law calculation
      let total = constant * Math.pow(10, power);
      let flux = charge / total;

      // Inward flux
      let sum = 180 - degree;
      let cos = Math.cos((sum * Math.PI) / 180);
      let inward = electric * surface * cos;

      // Outward flux
      let cosOutward = Math.cos((degree * Math.PI) / 180);
      let outward = electric * surface * cosOutward;

      param.tech_flux = flux;
      param.tech_inward = sigFig1(inward, 6);
      param.tech_cosoutward = sigFig1(cosOutward, 5);
      param.tech_outward = sigFig1(outward, 6);
      param.tech_electric = electric;
      param.tech_surface = surface;
      param.tech_degree = degree;
      param.tech_charge = charge;
      param.tech_const = constant;
      param.tech_power = power;
      param.tech_cos = sigFig1(cos, 4);
      param.tech_sum = sum;
      return param;
    } else {
      param.error = "Please! Check Your Input";
      return param;
    }
  }

  /**
   * getCalculationeFlowRateCalculator: Service Method
   * POST: /api/calculators-lol/flow-rate-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationeFlowRateCalculator(body) {
    let diameter = body.tech_diameter;
    let diameter_unit = body.tech_diameter_unit;

    let velocity = body.tech_velocity;
    let velocity_unit = body.tech_velocity_unit;

    let density = body.tech_density;
    let density_unit = body.tech_density_unit;

    let filled = body.tech_filled;
    let filled_unit = body.tech_filled_unit;

    let height = body.tech_height;
    let height_unit = body.tech_height_unit;

    let width = body.tech_width;
    let width_unit = body.tech_width_unit;

    let cross = body.tech_cross;
    let cross_unit = body.tech_cross_unit;

    let choice_unit = body.tech_choice_unit;

    let top_width = body.tech_top_width;
    let top_width_unit = body.tech_top_width_unit;

    let bottom_width = body.tech_bottom_width;
    let bottom_width_unit = body.tech_bottom_width_unit;

    let dynamic_viscosity_unit = body.tech_dynamic_viscosity_unit;
    let dynamic_viscosity = body.tech_dynamic_viscosity;

    let pipe_length = body.tech_pipe_length;
    let pipe_length_unit = body.tech_pipe_length_unit;

    let pressure_end = body.tech_pressure_end;
    let pressure_end_unit = body.tech_pressure_end_unit;

    let pressure_start = body.tech_pressure_start;
    let pressure_start_unit = body.tech_pressure_start_unit;

    let conversion_type = body.tech_conversion_type;

    let volume = body.tech_volume;
    let volume_unit = body.tech_volume_unit;

    let time = body.tech_time;
    let time_unit = body.tech_time_unit;

    const result = {};

    // Conversion functions
    const convert_centimeter = (a, b) => {
      const conversions = {
        cm: b * 0.01,
        m: b * 1,
        in: b * 0.0254,
        ft: b * 0.3048,
        yd: b * 0.9144,
        mm: b * 0.001,
      };
      return conversions[a] || b;
    };

    const convert_unit1 = (c, d) => {
      const conversions = {
        ms: d * 1,
        fts: d * 0.3048,
      };
      return conversions[c] || d;
    };

    const convert_density = (c, d) => {
      const conversions = {
        kg: d * 1,
        lb1: d * 16.02,
        lb2: d * 0.5933,
        g: d * 1000,
      };
      return conversions[c] || d;
    };

    const convert_cross = (c, d) => {
      const conversions = {
        "m²": d * 1,
        "cm²": d * 0.0001,
        "in²": d * 0.0006452,
        "ft²": d * 0.0929,
        "yd²": d * 0.8361,
      };
      return conversions[c] || d;
    };

    const convert_pascal = (e, f) => {
      const conversions = {
        Pa: f * 1,
        kPa: f * 1000,
        MPa: f * 1000000,
        GPa: f * 1000000000,
        mbar: f * 100,
        bar: f * 100000,
        atm: f * 101325,
        mmHg: f * 133.322,
        mmH2O: f * 9.80665,
        psi: f * 6894.76,
      };
      return conversions[e] || f;
    };

    const convert_dynamic_viscosity = (g, h) => {
      const conversions = {
        kgms: h * 1,
        nsm2: h * 1,
        pas: h * 1,
        cp: h * 0.001,
      };
      return conversions[g] || h;
    };

    const convert_volume = (e, f) => {
      const conversions = {
        "fluid-ounce": f * 0.0078125,
        quart: f * 0.25,
        pint: f * 0.150119,
        gallon: f * 1,
        milliliter: f * 0.000264172,
        liter: f * 0.264172,
        "cubic-foot": f * 7.48052,
        "cubic-inch": f * 0.004329,
        "cubic-centimeter": f * 0.000264172,
        "cubic-meter": f * 264.172,
      };
      return conversions[e] || f;
    };

    const convert_time = (e, f) => {
      const conversions = {
        second: f * 0.0166667,
        minute: f * 1,
        hour: f * 60,
        day: f * 1440,
      };
      return conversions[e] || f;
    };

    try {
      let volumetric_flow_rate, mass_flow_rate;

      // Fixed comparison operators from = to ===
      if (conversion_type == "1") {
        if (choice_unit == "cp") {
          if (!isNaN(density) && !isNaN(diameter) && !isNaN(velocity)) {
            const diameter_value = convert_centimeter(
              diameter_unit,
              parseFloat(diameter)
            );
            const velocity_value = convert_unit1(
              velocity_unit,
              parseFloat(velocity)
            );
            const density_value = convert_density(
              density_unit,
              parseFloat(density)
            );

            volumetric_flow_rate =
              Math.PI * Math.pow(diameter_value / 2, 2) * velocity_value;
            mass_flow_rate = volumetric_flow_rate * density_value;
            result.tech_mass_flow_rate = mass_flow_rate;
          } else {
            result.error = "Please fill all fields.";
            return result;
          }
        } else if (choice_unit == "cpf") {
          if (
            !isNaN(density) &&
            !isNaN(diameter) &&
            !isNaN(velocity) &&
            !isNaN(filled)
          ) {
            const diameter_value = convert_centimeter(
              diameter_unit,
              parseFloat(diameter)
            );
            const velocity_value = convert_unit1(
              velocity_unit,
              parseFloat(velocity)
            );
            const filled_value = convert_centimeter(
              filled_unit,
              parseFloat(filled)
            );
            const density_value = convert_density(
              density_unit,
              parseFloat(density)
            );

            volumetric_flow_rate =
              Math.PI *
              Math.pow(diameter_value / 2, 2) *
              velocity_value *
              filled_value;
            mass_flow_rate = volumetric_flow_rate * density_value;
            result.tech_mass_flow_rate = mass_flow_rate;
          } else {
            result.error = "Please fill all fields.";
            return result;
          }
        } else if (choice_unit == "rec") {
          if (
            !isNaN(height) &&
            !isNaN(width) &&
            !isNaN(density) &&
            !isNaN(velocity)
          ) {
            const height_value = convert_centimeter(
              height_unit,
              parseFloat(height)
            );
            const width_value = convert_centimeter(
              width_unit,
              parseFloat(width)
            );
            const velocity_value = convert_unit1(
              velocity_unit,
              parseFloat(velocity)
            );
            const density_value = convert_density(
              density_unit,
              parseFloat(density)
            );

            volumetric_flow_rate = height_value * width_value * velocity_value;
            mass_flow_rate = volumetric_flow_rate * density_value;
            result.tech_mass_flow_rate = mass_flow_rate;
          } else {
            result.error = "Please fill all fields.";
            return result;
          }
        } else if (choice_unit == "trap") {
          if (
            !isNaN(top_width) &&
            !isNaN(bottom_width) &&
            !isNaN(width) &&
            !isNaN(velocity) &&
            !isNaN(density)
          ) {
            const top_width_value = convert_centimeter(
              top_width_unit,
              parseFloat(top_width)
            );
            const bottom_width_value = convert_centimeter(
              bottom_width_unit,
              parseFloat(bottom_width)
            );
            const width_value = convert_centimeter(
              width_unit,
              parseFloat(width)
            );
            const velocity_value = convert_unit1(
              velocity_unit,
              parseFloat(velocity)
            );
            const density_value = convert_density(
              density_unit,
              parseFloat(density)
            );

            volumetric_flow_rate =
              (velocity_value *
                width_value *
                (top_width_value + bottom_width_value)) /
              2;
            mass_flow_rate = volumetric_flow_rate * density_value;
            result.tech_mass_flow_rate = mass_flow_rate;
          } else {
            result.error = "Check Input";
            return result;
          }
        } else if (choice_unit == "other") {
          if (!isNaN(density) && !isNaN(velocity) && !isNaN(cross)) {
            const cross_value = convert_cross(cross_unit, parseFloat(cross));
            const velocity_value = convert_unit1(
              velocity_unit,
              parseFloat(velocity)
            );
            const density_value = convert_density(
              density_unit,
              parseFloat(density)
            );

            volumetric_flow_rate = cross_value * velocity_value;
            mass_flow_rate = volumetric_flow_rate * density_value;
            result.tech_mass_flow_rate = mass_flow_rate;
          } else {
            result.error = "Please fill all fields.";
            return result;
          }
        }
      } else if (conversion_type == "2") {
        if (
          !isNaN(diameter) &&
          !isNaN(pipe_length) &&
          !isNaN(pressure_start) &&
          !isNaN(pressure_end) &&
          !isNaN(dynamic_viscosity) &&
          !isNaN(density)
        ) {
          const diameter_value = convert_centimeter(
            diameter_unit,
            parseFloat(diameter)
          );
          const pipe_length_value = convert_centimeter(
            pipe_length_unit,
            parseFloat(pipe_length)
          );
          const pressure_start_value = convert_pascal(
            pressure_start_unit,
            parseFloat(pressure_start)
          );
          const pressure_end_value = convert_pascal(
            pressure_end_unit,
            parseFloat(pressure_end)
          );
          const density_value = convert_density(
            density_unit,
            parseFloat(density)
          );
          const viscosity_value = convert_dynamic_viscosity(
            dynamic_viscosity_unit,
            parseFloat(dynamic_viscosity)
          );

          volumetric_flow_rate =
            (Math.PI *
              (Math.pow(diameter_value / 2, 4) *
                (pressure_start_value - pressure_end_value))) /
            (8 * viscosity_value * pipe_length_value);
          mass_flow_rate = volumetric_flow_rate * density_value;
          result.tech_mass_flow_rate = mass_flow_rate;
        } else {
          result.error = "Please fill all fields.";
          return result;
        }
      } else if (conversion_type == "3") {
        if (!isNaN(time) && !isNaN(volume)) {
          const time_value = convert_time(time_unit, parseFloat(time));
          const volume_value = convert_volume(volume_unit, parseFloat(volume));

          volumetric_flow_rate = (volume_value / time_value) * 6.30902e-5;
          result.tech_mass_flow_rate = "";
        } else {
          result.error = "Please fill all fields.";
          return result;
        }
      }

      result.tech_volumetric_flow_rate = volumetric_flow_rate;

      return result;
    } catch (error) {
      result.error = "An error occurred during calculation";
      return result;
    }
  }
}  

module.exports = new CalculatorsServices();
