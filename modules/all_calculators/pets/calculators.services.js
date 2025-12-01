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
   * getCalculationDogPregnancyCalculator: Service Method
   * POST: /api/calculators-lol/dog-pregnancy-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationDogPregnancyCalculator(body) {
    const e_date = body.tech_e_date; // format: YYYY-MM-DD

    const din = 63;
    const startDate = new Date(e_date);

    // Step 1: Main due date after 63 days
    const dueDate = new Date(startDate);
    dueDate.setDate(dueDate.getDate() + din);

    const formattedDueDate = dueDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "2-digit",
      year: "numeric",
    });

    // Step 2: Weekly Ranges
    let e_date2 = new Date(startDate);
    e_date2.setDate(e_date2.getDate() + 1);

    let e_date3 = new Date(e_date2);
    e_date3.setDate(e_date3.getDate() + 6);

    let firstDates = [];
    let secondDates = [];

    for (let i = 0; i < 8; i++) {
      e_date2.setDate(e_date2.getDate() + 7);
      firstDates.push(new Date(e_date2));

      e_date3.setDate(e_date3.getDate() + 7);
      secondDates.push(new Date(e_date3));
    }

    const last1 = new Date(firstDates[7]);
    last1.setDate(last1.getDate() + 7);

    const last2 = new Date(secondDates[7]);
    last2.setDate(last2.getDate() + 7);

    const formatDate = (date) =>
      date.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      });

    const formatRange = (d1, d2) => `${formatDate(d1)} - ${formatDate(d2)}`;

    return {
      tech_date: formattedDueDate,
      tech_line: formatRange(firstDates[7], secondDates[7]),
      tech_line0: formatRange(firstDates[0], secondDates[0]),
      tech_line1: formatRange(firstDates[1], secondDates[1]),
      tech_line2: formatRange(firstDates[2], secondDates[2]),
      tech_line3: formatRange(firstDates[3], secondDates[3]),
      tech_line4: formatRange(firstDates[4], secondDates[4]),
      tech_line5: formatRange(firstDates[5], secondDates[5]),
      tech_line6: formatRange(firstDates[6], secondDates[6]),
      tech_line7: formatRange(firstDates[7], secondDates[7]),
      tech_line_l: formatRange(last1, last2),
    };
  }

  /**
   * getCalculationBenadrylForDogsCalculator: Service Method
   * POST: /api/calculators-lol/benadryl-for-dogs-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationBenadrylForDogsCalculator(body) {
    const dogWeight = body.dog_weight;
    let weightUnitMultiplier = body.weight_unit;

    // Convert weight unit to appropriate multiplier
    if (weightUnitMultiplier === "g") {
      weightUnitMultiplier = 0.0022046;
    } else if (weightUnitMultiplier === "dag") {
      weightUnitMultiplier = 0.022046;
    } else if (weightUnitMultiplier === "kg") {
      weightUnitMultiplier = 2.2046;
    } else if (weightUnitMultiplier === "oz") {
      weightUnitMultiplier = 0.0625;
    } else if (weightUnitMultiplier === "lbs") {
      weightUnitMultiplier = 1;
    } else if (weightUnitMultiplier === "stone") {
      weightUnitMultiplier = 14;
    }

    if (isNaN(dogWeight)) {
      return {
        errorMessage: "Please check your input.",
        resultCode: 0,
      };
    }

    if (dogWeight < 0) {
      return {
        errorMessage: "The dog's weight should be more than 0",
        resultCode: 0,
      };
    }

    // Calculate the dosage values
    const weightInPounds = dogWeight * weightUnitMultiplier;
    const benadrylDose = weightInPounds * 1;
    const liquidDose = weightInPounds / 2.5;

    return {
      benadrylDosage: benadrylDose,
      liquidDosage: liquidDose,
    };
  }

  /**
   * getCalculationCatCaloieCalculator: Service Method
   * POST: /api/calculators-lol/cat-calorie-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationCatCaloieCalculator(body) {
    let catWeight = body.tech_cat_weight;
    let catWeightUnit = body.tech_unit;
    let catCondition = body.tech_cat_condition;
    // Convert weight into kilograms
    if (catWeightUnit) {
      if (catWeightUnit === "kg") {
        catWeight = catWeight;
      } else if (catWeightUnit === "oz") {
        catWeight = catWeight / 35.274;
      } else if (catWeightUnit === "lbs") {
        catWeight = catWeight / 2.2046;
      }
    }

    let energyFactor = 0;

    if (catCondition) {
      switch (catCondition) {
        case "Neutered adult":
          energyFactor = 1.6;
          break;
        case "Non-neutered adult":
          energyFactor = 1.8;
          break;
        case "Weight loss":
          energyFactor = 1;
          break;
        case "Weight gain":
          energyFactor = 1.7;
          break;
        case "0-4 months old kitten":
          energyFactor = 3;
          break;
        case "4 months to adult cat":
          energyFactor = 2;
          break;
      }
    }
    if (!isNaN(catWeight)) {
      const weightInKg = catWeight;
      const restingCalories = Math.pow(weightInKg, 0.75) * 70;
      const totalMaintenanceCalories = restingCalories * energyFactor;
      return {
        tech_resting_energy: restingCalories,
        tech_maintenance_energy: totalMaintenanceCalories,
      };
    } else {
      return {
        error_message: "Please! Check your input.",
        result_code: 0,
      };
    }
  }

  /**
   * getCalculationPuppyWeigthCalculator: Service Method
   * POST: /api/calculators-lol/puppy-weight-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationPuppyWeigthCalculator(body) {
    const {
      dogWeight,
      weightChoice,
      dogAge,
      ageChoice,
      dogType,
      breedSelection,
    } = body;

    function get_value(breed) {
      let assign_one = "";
      let assign_two = "";

      if (breed == "Affenpinscher") {
        assign_one = "7-10 pounds";
        assign_two = "1";
      } else if (breed == "Afghan Hound") {
        assign_one = "50-60 pounds";
        assign_two = "1";
      } else if (breed == "Airedale Terrier") {
        assign_one = "50-70 pounds";
        assign_two = "1";
      } else if (breed == "Akita") {
        assign_one = "100-130 pounds";
        assign_two = "70-100 pounds";
      } else if (breed == "Alaskan Malamute") {
        assign_one = "85 pounds";
        assign_two = "75 pounds";
      } else if (breed == "American Cocker Spaniel") {
        assign_one = "45-65 pounds";
        assign_two = "1";
      } else if (breed == "American Eskimo Dog (toy)") {
        assign_one = "6-10 pounds";
        assign_two = "1";
      } else if (breed == "American Esmiko Dog (miniature)") {
        assign_one = "10-20 pounds";
        assign_two = "1";
      } else if (breed == "American Esmiko Dog") {
        assign_one = "25-35 pounds";
        assign_two = "1";
      } else if (breed == "American Foxhound") {
        assign_one = "65-70 pounds";
        assign_two = "60-65 pounds";
      } else if (breed == "American Hairless Terrier") {
        assign_one = "12-16 pounds";
        assign_two = "1";
      } else if (breed == "American Staffordshire Terrier") {
        assign_one = "50-70 pounds";
        assign_two = "40-55";
      } else if (breed == "Anatolian Shepherd Dog") {
        assign_one = "110-150 pounds";
        assign_two = "80-120 pounds";
      } else if (breed == "Australian Cattle Dog") {
        assign_one = "35-50 pounds";
        assign_two = "1";
      } else if (breed == "Australian Shepherd") {
        assign_one = "50-65 pounds";
        assign_two = "40-55 pounds";
      } else if (breed == "Basenji") {
        assign_one = "24 pounds";
        assign_two = "22 pounds";
      } else if (breed == "Basset Hound") {
        assign_one = "40-65 pounds";
        assign_two = "1";
      } else if (breed == "Beagle") {
        assign_one = "20-30 pounds";
        assign_two = "1";
      } else if (breed == "Bearded Collie") {
        assign_one = "45-55 pounds";
        assign_two = "1";
      } else if (breed == "Beauceron") {
        assign_one = "45-55 pounds";
        assign_two = "1";
      } else if (breed == "Belgian Shepherd") {
        assign_one = "45-55 pounds";
        assign_two = "1";
      } else if (breed == "Bedlington Terrier") {
        assign_one = "45-55 pounds";
        assign_two = "1";
      } else if (breed == "Belgian Shepherd Malinois") {
        assign_one = "45-55 pounds";
        assign_two = "1";
      } else if (breed == "Bernese Mountain Dog") {
        assign_one = "45-55 pounds";
        assign_two = "1";
      } else if (breed == "Bichon Frise") {
        assign_one = "45-55 pounds";
        assign_two = "1";
      } else if (breed == "Black and Tan Coonhound") {
        assign_one = "45-55 pounds";
        assign_two = "1";
      } else if (breed == "Black Russian Terrier") {
        assign_one = "45-55 pounds";
        assign_two = "1";
      } else if (breed == "Bloodhound") {
        assign_one = "45-55 pounds";
        assign_two = "1";
      } else if (breed == "Bluetick Coonhound") {
        assign_one = "45-55 pounds";
        assign_two = "1";
      } else if (breed == "Border Collie") {
        assign_one = "45-55 pounds";
        assign_two = "1";
      } else if (breed == "Border Terrier") {
        assign_one = "45-55 pounds";
        assign_two = "1";
      } else if (breed == "Borzoi") {
        assign_one = "45-55 pounds";
        assign_two = "1";
      } else if (breed == "Boston Terrier") {
        assign_one = "45-55 pounds";
        assign_two = "1";
      } else if (breed == "Briard") {
        assign_one = "45-55 pounds";
        assign_two = "1";
      } else if (breed == "Bouvier des Flandres") {
        assign_one = "45-55 pounds";
        assign_two = "1";
      } else if (breed == "Boxer") {
        assign_one = "45-55 pounds";
        assign_two = "1";
      } else if (breed == "Boykin Spaniel") {
        assign_one = "45-55 pounds";
        assign_two = "1";
      } else if (breed == "Brittany") {
        assign_one = "45-55 pounds";
        assign_two = "1";
      } else if (breed == "Bull Terrier") {
        assign_one = "45-55 pounds";
        assign_two = "1";
      } else if (breed == "Bulldog") {
        assign_one = "45-55 pounds";
        assign_two = "1";
      } else if (breed == "Bullmastiff") {
        assign_one = "45-55 pounds";
        assign_two = "1";
      } else if (breed == "Cairn Terrier") {
        assign_one = "14 pounds";
        assign_two = "13 pounds";
      } else if (breed == "Canaan Dog") {
        assign_one = "45-55 pounds";
        assign_two = "1";
      } else if (breed == "Cane Corso") {
        assign_one = "45-55 pounds";
        assign_two = "1";
      } else if (breed == "Cavalier King Charles Spaniel") {
        assign_one = "45-55 pounds";
        assign_two = "1";
      } else if (breed == "Cesky Terrier") {
        assign_one = "45-55 pounds";
        assign_two = "1";
      } else if (breed == "Chesapeake Bay Retriever") {
        assign_one = "45-55 pounds";
        assign_two = "1";
      } else if (breed == "Chihuahua") {
        assign_one = "45-55 pounds";
        assign_two = "1";
      } else if (breed == "Chinese Crested Dog") {
        assign_one = "8-12 pounds";
        assign_two = "1";
      } else if (breed == "Chinese Shar-Pei") {
        assign_one = "45-60 pounds";
        assign_two = "1";
      } else if (breed == "Chinook") {
        assign_one = "55-90 pounds";
        assign_two = "50-65";
      } else if (breed == "Chow Chow") {
        assign_one = "45-70 pounds";
        assign_two = "1";
      } else if (breed == "Collie") {
        assign_one = "60-75 pounds";
        assign_two = "50-65 pounds";
      } else if (breed == "Coton de Tulear") {
        assign_one = "9-15 pounds";
        assign_two = "8-13 pounds";
      } else if (breed == "Dachshund (miniature)") {
        assign_one = "up to 11 pounds";
        assign_two = "1";
      } else if (breed == "Dachshund") {
        assign_one = "16-32 pounds";
        assign_two = "1";
      } else if (breed == "Dalmatian") {
        assign_one = "45-70 pounds";
        assign_two = "1";
      } else if (breed == "Dandie Dinmont Terrier") {
        assign_one = "18-24 pounds";
        assign_two = "1";
      } else if (breed == "Doberman Pinscher") {
        assign_one = "16-32 pounds";
        assign_two = "1";
      } else if (breed == "Dogue de Bordeaux") {
        assign_one = "75-100 pounds";
        assign_two = "60-90";
      } else if (breed == "English Foxhound") {
        assign_one = "60-75 pounds";
        assign_two = "1";
      } else if (breed == "English Toy Spaniel") {
        assign_one = "8-14 pounds";
        assign_two = "1";
      } else if (breed == "Entlebucher Mountain Dog") {
        assign_one = "55-65 pounds";
        assign_two = "1";
      } else if (breed == "Finnish Lapphund") {
        assign_one = "33-53 pounds";
        assign_two = "1";
      } else if (breed == "Finnish Spitz") {
        assign_one = "25-33 pounds";
        assign_two = "20-28";
      } else if (breed == "French Bulldog") {
        assign_one = "under 28 pounds";
        assign_two = "1";
      } else if (breed == "German Pinscher") {
        assign_one = "25-45 pounds";
        assign_two = "1";
      } else if (breed == "German Shepherd Dog") {
        assign_one = "65-90 pounds";
        assign_two = "50-70 pounds";
      } else if (breed == "Giant Schnauzer") {
        assign_one = "60-85 pounds";
        assign_two = "55-75 pounds";
      } else if (breed == "Glen of Imaal Terrier") {
        assign_one = "32-40 pounds";
        assign_two = "1";
      } else if (breed == "Great Dane") {
        assign_one = "140-175 pounds";
        assign_two = "110-140 pounds";
      } else if (breed == "Great Pyrenee") {
        assign_one = "100 pounds or more";
        assign_two = "85 pounds or more";
      } else if (breed == "Greater Swiss Mountain Dog") {
        assign_one = "115-140 pounds";
        assign_two = "85-110 pounds";
      } else if (breed == "Greyhound") {
        assign_one = "65-70 pounds";
        assign_two = "60-65 pounds";
      } else if (breed == "Harrier") {
        assign_one = "45-60 pounds";
        assign_two = "1";
      } else if (breed == "Havanese") {
        assign_one = "7-13 pounds";
        assign_two = "1";
      } else if (breed == "Ibizan Hound") {
        assign_one = "50 pounds";
        assign_two = "45 pounds";
      } else if (breed == "Icelandic Sheepdog") {
        assign_one = "30 pounds";
        assign_two = "25 pounds";
      } else if (breed == "Irish Terrier") {
        assign_one = "27 pounds";
        assign_two = "25 pounds";
      } else if (breed == "Irish Wolfhound") {
        assign_one = "120 pounds";
        assign_two = "105 pounds";
      } else if (breed == "Italian Greyhound") {
        assign_one = "7-14 pounds";
        assign_two = "1";
      } else if (breed == "Japanese Chin") {
        assign_one = "7-11 pounds";
        assign_two = "1";
      } else if (breed == "Keeshonden") {
        assign_one = "34-45 pounds";
        assign_two = "1";
      } else if (breed == "Kerry Blue Terrier") {
        assign_one = "33-40 pounds";
        assign_two = "30-37 pounds";
      } else if (breed == "Komondorok") {
        assign_one = "100 pounds or more";
        assign_two = "30-37 pounds";
      } else if (breed == "Kuvaszok") {
        assign_one = "100-115 pounds";
        assign_two = "70-90 pounds";
      } else if (breed == "Lagottto Romagnoli") {
        assign_one = "28.5-35 pounds";
        assign_two = "24-31 pounds";
      } else if (breed == "Lakeland Terrier") {
        assign_one = "17 pounds";
        assign_two = "16 pounds";
      } else if (breed == "Leonberger") {
        assign_one = "110-170 pounds";
        assign_two = "90-140 pounds";
      } else if (breed == "Lhasa Apso") {
        assign_one = "12-18 pounds";
        assign_two = "1";
      } else if (breed == "Lowchen") {
        assign_one = "15 pounds";
        assign_two = "1";
      } else if (breed == "Maltese") {
        assign_one = "under 7 pounds";
        assign_two = "1";
      } else if (breed == "Manchester Terrier (Toy)") {
        assign_one = "under 7 pounds";
        assign_two = "1";
      } else if (breed == "Manchester Terrier") {
        assign_one = "12-22 pounds";
        assign_two = "1";
      } else if (breed == "Mastiff") {
        assign_one = "160-230 pounds";
        assign_two = "120-170 pounds";
      } else if (breed == "Miniature Pinscher") {
        assign_one = "8-10 pounds";
        assign_two = "1";
      } else if (breed == "Miniature Bull Terrier") {
        assign_one = "18-28 pounds";
        assign_two = "1";
      } else if (breed == "Miniature Schnauzer") {
        assign_one = "11-20 pounds";
        assign_two = "1";
      } else if (breed == "Neapolitan Mastiff") {
        assign_one = "150 pounds";
        assign_two = "110 pounds";
      } else if (breed == "Newfoundland") {
        assign_one = "130-150 pounds";
        assign_two = "100-120 pounds";
      } else if (breed == "Norfolk Terrier") {
        assign_one = "11-12 pounds";
        assign_two = "1";
      } else if (breed == "Norwegian Buhund") {
        assign_one = "31-40 pounds";
        assign_two = "26-35 pounds";
      } else if (breed == "Norwegian Elkhound") {
        assign_one = "55 pounds";
        assign_two = "48 pounds";
      } else if (breed == "Norwegian Lundehund") {
        assign_one = "20-30 pounds";
        assign_two = "1";
      } else if (breed == "Norwich Terrier") {
        assign_one = "12 pounds";
        assign_two = "1";
      } else if (breed == "Old English Sheepdog") {
        assign_one = "60-100 pounds";
        assign_two = "1";
      } else if (breed == "Otterhound") {
        assign_one = "115 pounds";
        assign_two = "80 pounds";
      } else if (breed == "Papillon") {
        assign_one = "5-10 pounds";
        assign_two = "1";
      } else if (breed == "Parson Russell Terrier") {
        assign_one = "13-17 pounds";
        assign_two = "1";
      } else if (breed == "Pekingese") {
        assign_one = "up to 14 pounds";
        assign_two = "1";
      } else if (breed == "Pembroke Welsh Corgi") {
        assign_one = "up to 30 pounds";
        assign_two = "up to 28 pounds";
      } else if (breed == "Petit Basset Griffon Vendeen") {
        assign_one = "25-40 pounds";
        assign_two = "1";
      } else if (breed == "Pharaoh Hound") {
        assign_one = "45-55 pounds";
        assign_two = "1";
      } else if (breed == "Plott") {
        assign_one = "50-60 pounds";
        assign_two = "40-55 pounds";
      } else if (breed == "Polish Lowland Sheepdog") {
        assign_one = "30-50 pounds";
        assign_two = "1";
      } else if (breed == "Pomeranian") {
        assign_one = "3-7 pounds";
        $assign_two = "1";
      } else if (breed == "Poodle") {
        assign_one = "60-70 pounds";
        $assign_two = "40-50";
      } else if (breed == "Portuguese Water Dog") {
        assign_one = "60-70 pounds";
        $assign_two = "40-50";
      } else if (breed == "Pug") {
        assign_one = "42-60 pounds";
        $assign_two = "35-50 pounds";
      } else if (breed == "Pulik") {
        assign_one = "25-35 pounds";
        assign_two = "1";
      } else if (breed == "Redbone Coonhound") {
        assign_one = "25-35 pounds";
        assign_two = "1";
      } else if (breed == "Retreiver (Chesapeake Bay)") {
        assign_one = "65-80 pounds";
        assign_two = "55-70 pounds";
      } else if (breed == "Retreiver (Curly Coated)") {
        assign_one = "60-95 pounds";
        assign_two = "1 pounds";
      } else if (breed == "Retreiver (Flat Coated)") {
        assign_one = "60-70 pounds";
        assign_two = "1";
      } else if (breed == "Retreiver (Golden)") {
        assign_one = "65-75 pounds";
        assign_two = "55-65 pounds";
      } else if (breed == "Retreiver (Labrador)") {
        assign_one = "65-80 pounds";
        assign_two = "55-70 pounds";
      } else if (breed == "Rhodesian Ridgeback") {
        assign_one = "85 pounds";
        assign_two = "70 pounds";
      } else if (breed == "Rottweiler") {
        assign_one = "95-135 pounds";
        assign_two = "80-100 pounds";
      } else if (breed == "Russel Terrier") {
        assign_one = "9-15 pounds";
        assign_two = "1";
      } else if (breed == "Saluki") {
        assign_one = "40-65 pounds";
        assign_two = "1";
      } else if (breed == "Samoyed") {
        assign_one = "45-65 pounds";
        assign_two = "35-50 pounds";
      } else if (breed == "Schipperke") {
        assign_one = "10-16 pounds";
        assign_two = "1";
      } else if (breed == "Scottish Deerhound") {
        assign_one = "85-110 pounds";
        assign_two = "75-95";
      } else if (breed == "Scottish Terrier") {
        assign_one = "19-22 pounds";
        assign_two = "18-21 pounds";
      } else if (breed == "Sealyham Terrier") {
        assign_one = "23-24 pounds";
        assign_two = "20-23 pounds";
      } else if (breed == "Setter (English)") {
        assign_one = "65-80 pounds";
        assign_two = "45-55 pounds";
      } else if (breed == "Setter (Gordon)") {
        assign_one = "55-80 pounds";
        assign_two = "45-70 pounds";
      } else if (breed == "Setter (Irish Red and White)") {
        assign_one = "42-60 pounds";
        assign_two = "35-50 pounds";
      } else if (breed == "Setter (Irish)") {
        assign_one = "70 pounds";
        assign_two = "60 pounds";
      } else if (breed == "Shedland Sheepdog") {
        assign_one = "15-25 pounds";
        assign_two = "1";
      } else if (breed == "Shiba Inu") {
        assign_one = "23 pounds";
        assign_two = "17 pounds";
      } else if (breed == "Shih Tzu") {
        assign_one = "9-16 pounds";
        assign_two = "1";
      } else if (breed == "Siberian Huskie") {
        assign_one = "45-60 pounds";
        assign_two = "35-50 pounds";
      } else if (breed == "Silky Terrier") {
        assign_one = "8-10 pounds";
        assign_two = "1";
      } else if (breed == "Syke Terrier") {
        assign_one = "35-45 pounds";
        assign_two = "30-40 pounds";
      } else if (breed == "Sloughi") {
        assign_one = "35-50 pounds";
        assign_two = "1";
      } else if (breed == "Soft Coated Wheaten Terrier") {
        assign_one = "35-50 pounds";
        assign_two = "1";
      } else if (breed == "Spaniel (American Water)") {
        assign_one = "35-40 pounds";
        assign_two = "30-35 pounds";
      } else if (breed == "Spaniel (Boykin)") {
        assign_one = "30-40 pounds";
        assign_two = "25-35 pounds";
      } else if (breed == "Spaniel (Clumber)") {
        assign_one = "70-85 pounds";
        assign_two = "55-70 pounds";
      } else if (breed == "Spaniel (English Cocker)") {
        assign_one = "28-34 pounds";
        assign_two = "26-32 pounds";
      } else if (breed == "Spaniel (English Springer)") {
        assign_one = "50 pounds";
        assign_two = "40 pounds";
      } else if (breed == "Spaniel (Field)") {
        assign_one = "35-50 pounds";
        assign_two = "1";
      } else if (breed == "Spaniel (Irish Water)") {
        assign_one = "55-68 pounds";
        assign_two = "45-58";
      } else if (breed == "Spaniel (Sussex)") {
        assign_one = "35-50 pounds";
        assign_two = "1";
      } else if (breed == "Spaniel (Welsh Springer)") {
        assign_one = "35-45 pounds";
        assign_two = "1";
      } else if (breed == "Spaniel Water Dog") {
        assign_one = "35-45 pounds";
        assign_two = "1";
      } else if (breed == "Spinoni Italiani") {
        assign_one = "40-49 pounds";
        assign_two = "31-40 pounds";
      } else if (breed == "St. Bernard") {
        assign_one = "140-180 pounds";
        assign_two = "120-140 pounds";
      } else if (breed == "Staffordshire Bull Terrier") {
        assign_one = "28-38 pounds";
        assign_two = "24-34 pounds";
      } else if (breed == "Spinoni Italiani") {
        assign_one = "55-60 pounds";
        assign_two = "1";
      } else if (breed == "Standard Schnauzer") {
        assign_one = "35-50 pounds";
        assign_two = "30-45 pounds";
      } else if (breed == "Swedish Vallhund") {
        assign_one = "20-35 pounds";
        assign_two = "1";
      } else if (breed == "Tibetan Mastiff") {
        assign_one = "90-150 pounds";
        assign_two = "70-120 pounds";
      } else if (breed == "Tibetan Terrier") {
        assign_one = "18-30 pounds";
        assign_two = "15-25 pounds";
      } else if (breed == "Tibetan Spaniel") {
        assign_one = "18-30 pounds";
        assign_two = "15-25 pounds";
      } else if (breed == "Toy Fox Terrier") {
        assign_one = "9-15 pounds";
        assign_two = "1";
      } else if (breed == "Treeing Walker Coonhound") {
        assign_one = "50-70 pounds";
        assign_two = "1";
      } else if (breed == "Vizsla") {
        assign_one = "55-60 pounds";
        assign_two = "44-55 pounds";
      } else if (breed == "Weimaraner") {
        assign_one = "70-90 pounds";
        assign_two = "55-75 pounds";
      } else if (breed == "Welsh Terrier") {
        assign_one = "20 pounds";
        assign_two = "18-20 pounds";
      } else if (breed == "West Highland White Terrier") {
        assign_one = "15-20 pounds";
        assign_two = "1";
      } else if (breed == "Whippet") {
        assign_one = "25-40 pounds";
        assign_two = "1";
      } else if (breed == "Wirehaired Pointing Griffon") {
        assign_one = "50-70 pounds";
        assign_two = "35-50 pounds";
      } else if (breed == "Wirehaired Vizsla") {
        assign_one = "55-65 pounds";
        assign_two = "1";
      } else if (breed == "Xoloitzcuintli") {
        assign_one = "30-55 pounds";
        assign_two = "1";
      } else if (breed == "Yorkshire Terrier") {
        assign_one = "7 pounds";
        assign_two = "1";
      }
      return [assign_one, assign_two];
    }

    const names = get_value(breedSelection);

    if (dogType === "first" || dogType === "second") {
      if (isNaN(dogWeight) || isNaN(dogAge)) {
        return { error: "Please! Check Your Input" };
      }

      let age_calculation;
      if (ageChoice === "wks") {
        if (dogAge > 52) {
          return {
            error: "Dogs above 12 months of age are considered adults!",
          };
        } else if (dogAge < 0) {
          return { error: "Age must be greater than zero" };
        } else {
          age_calculation = dogAge * 1;
        }
      } else if (ageChoice === "days") {
        if (dogAge > 365) {
          return {
            error: "Dogs above 12 months of age are considered adults!",
          };
        } else if (dogAge < 0) {
          return { error: "Age must be greater than zero" };
        } else {
          age_calculation = dogAge * 0.14286;
        }
      } else if (ageChoice === "mon") {
        if (dogAge > 13) {
          return {
            error: "Dogs above 12 months of age are considered adults!",
          };
        } else if (dogAge < 0) {
          return { error: "Age must be greater than zero" };
        } else {
          age_calculation = dogAge * 4.348;
        }
      }

      let convert;
      if (dogWeight > 0) {
        switch (weightChoice) {
          case "g":
            convert = dogWeight / 1000;
            break;
          case "dag":
            convert = dogWeight / 100;
            break;
          case "kg":
            convert = dogWeight;
            break;
          case "oz":
            convert = dogWeight / 35.274;
            break;
          case "lb":
            convert = dogWeight / 2.205;
            break;
          case "stone":
            convert = dogWeight * 6.35;
            break;
          default:
            return { error: "Invalid weight selection" };
        }
      } else {
        return { error: "Weight must be greater than zero" };
      }

      const calculation = (convert / age_calculation) * 52;
      const calculate2 = calculation / 10;
      const cal3 = calculation + calculate2;
      const cal4 = calculation - calculate2;

      if (calculation >= 156.5) {
        return {
          error:
            "The heaviest dog ever weighed exactly 345 lb (156.5 kg). Try not to exceed it!",
        };
      }

      let h1 = "",
        h2 = "",
        h3 = "",
        h4 = "",
        h5 = "";
      if (calculation < 5.4) {
        h1 = "bg-gradient text-white";
      } else if (calculation >= 5.4 && calculation <= 10) {
        h2 = "bg-gradient text-white";
      } else if (calculation > 10 && calculation <= 25.9) {
        h3 = "bg-gradient text-white";
      } else if (calculation > 25.9 && calculation <= 44.9) {
        h4 = "bg-gradient text-white";
      } else if (calculation >= 44.9) {
        h5 = "bg-gradient text-white";
      }

      const calculation2 = calculation;
      const calculation3 = calculation * 2.20462;

      return {
        tech_h1: h1,
        tech_h2: h2,
        tech_h3: h3,
        tech_h4: h4,
        tech_h5: h5,
        tech_puppy1: calculation2,
        tech_puppy2: calculation3,
        tech_cal3: cal3,
        tech_cal4: cal4,
        tech_type: dogType,
        tech_select_breed: breedSelection,
        tech_names_zero: names[0],
        tech_names_one: names[1],
      };
    }

    return { error: "Invalid type selection" };
  }

  /**
   * getCalculationPearsonAgeCalculator: Service Method
   * POST: /api/calculators-lol/pearson-age-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationPearsonAgeCalculator(body) {
    const dob = body.tech_date1;
    const date = body.tech_date;

    if (!dob || !date) {
      return { error: "Please Select Your Date of Birth." };
    }

    const dobParts = dob.split("-");
    const dateParts = date.split("-");

    const bday = moment(
      `${dobParts[2]}.${dobParts[1]}.${dobParts[0]}`,
      "DD.MM.YYYY"
    );
    const today = moment(
      `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}`,
      "DD.MM.YYYY"
    );
    const diff = moment.duration(today.diff(bday));

    const age_years = today.diff(bday, "years");
    bday.add(age_years, "years");
    const age_months = today.diff(bday, "months");
    bday.add(age_months, "months");
    const age_days = today.diff(bday, "days");

    const now = moment();
    const dobMoment = moment(dob, "YYYY-MM-DD");

    const d1 = dobMoment.unix();
    const d2 = now.unix();

    if (d2 - d1 <= 0) {
      return { error: "Invalid Date of Birth." };
    }

    const obj = new AgeCalculator();
    obj.calculateAge(d1 * 1000);
    const age = obj.getAge();
    const rank = obj.getRank(age);

    const Totalyears = Math.floor((d2 - d1) / 31536000);
    const Total_months = Math.floor((d2 - d1) / 2628000);
    const Total_weeks = Math.floor((d2 - d1) / 604800);
    const Total_days = Math.floor((d2 - d1) / 86400);
    const Total_hours = Math.floor((d2 - d1) / 3600);
    const Total_minuts = Math.floor((d2 - d1) / 60);
    const Total_seconds = d2 - d1;

    // ✅ Correct Next Birthday Calculation
    const birthDay = parseInt(dobParts[2], 10);
    const birthMonth = parseInt(dobParts[1], 10);

    let nextBirthdayYear = now.year();
    if (
      now.month() + 1 > birthMonth ||
      (now.month() + 1 === birthMonth && now.date() > birthDay)
    ) {
      nextBirthdayYear++;
    }

    const nextBirthday = moment(
      `${nextBirthdayYear}-${dobParts[1]}-${dobParts[2]}`,
      "YYYY-MM-DD"
    );
    const remaining = moment.duration(nextBirthday.diff(now));
    const N_r_months = Math.floor(remaining.asMonths());
    const N_r_days = nextBirthday.diff(
      now.clone().add(N_r_months, "months"),
      "days"
    );

    return {
      tech_Age: age,
      tech_Age_years: age_years,
      tech_Age_months: age_months,
      tech_Age_days: age_days,
      tech_birth_month: dobParts[1],
      tech_N_r_months: N_r_months,
      tech_N_r_days: N_r_days,
      tech_Years: Totalyears,
      tech_Months: Total_months,
      tech_Weeks: Total_weeks,
      tech_Days: Total_days,
      tech_Hours: Total_hours,
      tech_Min: Total_minuts,
      tech_Sec: Total_seconds,
    };
  }

  /**
   * getCalculationDogAgeCalculator: Service Method
   * POST: /api/calculators-lol/dog-age-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationDogAgeCalculator(body) {
    const tech_operations = body.tech_operations;
    const tech_brd = body.tech_brd;
    const tech_size = body.tech_size;
    const tech_age = parseFloat(body.tech_age);
    const tech_dogAge = parseFloat(body.tech_dogAge);
    const tech_dogBreed = body.tech_dogBreed;
    const tech_a = parseFloat(body.tech_a);
    const tech_b = parseFloat(body.tech_b);
    const tech_c = parseFloat(body.tech_c);

    let param = {};

    if (tech_operations === "1") {
      if (tech_brd === "1") {
        if (tech_age > 0 && tech_age < 20) {
          const f_ans = 16 * Math.log(tech_age);
          var answer = f_ans + 31;
        } else {
          param.error = "Please enter age between 1 and 20.";
          return param;
        }
      } else if (tech_brd === "2") {
        const kuty = [
          [0, 0, 0],
          [15, 15, 15],
          [24, 24, 24],
          [28, 28, 28],
          [32, 32, 32],
          [36, 36, 36],
          [40, 42, 45],
          [44, 47, 50],
          [48, 51, 55],
          [52, 56, 61],
          [56, 60, 66],
          [60, 65, 72],
          [64, 69, 77],
          [68, 74, 82],
          [72, 78, 88],
          [76, 83, 93],
          [80, 87, 120],
          [84, 92, 120],
          [88, 96, 120],
          [92, 101, 120],
        ];

        if (tech_age > 0 && tech_age < 20) {
          const parts = tech_age.toString().split(".");
          const index = parseInt(parts[0]);

          const calculateAge = (idx) => {
            const dogi_age1 = kuty[idx];
            const dogi_age2 = kuty[idx + 1];
            const show_baz1 = dogi_age1[tech_size - 1];
            const show_baz2 = dogi_age2[tech_size - 1];
            const percent = parseFloat("0." + parts[1]) * 100;
            const diff = show_baz2 - show_baz1;
            return show_baz1 + (diff / 100) * percent;
          };

          if (parts.length === 1) {
            answer = kuty[index][tech_size - 1];
          } else {
            answer = calculateAge(index);
          }
        } else {
          param.error = "Please enter age between 1 and 20.";
          return param;
        }
      }

      if (answer) {
        param.tech_answer = Number(answer).toFixed(answer % 1 === 0 ? 0 : 3);
      }
    } else if (tech_operations === "2") {
      if (!tech_dogAge || tech_dogAge <= 0) {
        param.error = "Please select Dog Age.";
        return param;
      }

      if (!tech_dogBreed || tech_dogBreed === "0") {
        param.error = "Please select Dog Breed.";
        return param;
      }

      if (!(tech_a >= 1)) {
        param.error = "Please enter First Year Aging greater than 0.";
        return param;
      }

      if (!(tech_b >= 1)) {
        param.error = "Please enter Second Year Aging greater than 0.";
        return param;
      }

      if (!(tech_c >= 1)) {
        param.error = "Please enter Human Life Expectancy greater than 0.";
        return param;
      }

      const [dogBreed1, dogBreed2] = tech_dogBreed.split("&&");
      const breeds = [
        [
          "Affenpinscher",
          12,
          14,
          "affenpinscher",
          "Small rodent hunting",
          "Families",
          "Moderate",
          "12-14 years",
          "25-27 cm",
          "3-4 kg",
          "Curious, Playful, Active",
          "Yes",
          "Black, gray, silver, Black and Tan",
        ],
        [
          "Afghan Hound",
          12,
          14,
          "afghan_hound",
          "Coursing and hunting",
          "Singles & Families",
          "High",
          "12-14 years",
          "63-68 cm",
          "25-29 kg",
          "Aloof, Happy, Independent",
          "Yes",
          "Black, Red, Cream",
        ],
        [
          "Airedale Terrier",
          10,
          12,
          "airedale_terrier",
          "Terrier Dogs",
          "Small Families",
          "High",
          "10-14 years",
          "58-61 cm",
          "23-29 kg",
          "Active, Intelligent, Loyal, Hard-Working, Athletic, Confident, Proud",
          "No",
          "Black, Grey, White, Tan",
        ],
        [
          "Akita",
          11,
          15,
          "akita",
          "Working Dogs",
          "Small Families, singles",
          "High",
          "11-15 years",
          "61-70 cm",
          "38-54 kg",
          "Active, loyal, willful, bold, courageous, intelligent, alert",
          "No",
          "Red, brindle, black, black brindle, blue brindle, brown, brown brindle, fawn, fawn brindle",
        ],
        [
          "Alaskan Malamute",
          13,
          16,
          "alaskan_malamute",
          "Working Dogs",
          "Families",
          "Medium",
          "12-16 years",
          "58-63 cm",
          "36-43 kg",
          "Intelligent, Active, Affectionate, Gentle, Independent",
          "No",
          "Black, white",
        ],
        [
          "American Cocker Spaniel",
          12,
          15,
          "american_cocker_spaniel",
          "Sporting Group",
          "Families, children",
          "Medium",
          "12-15 years",
          "37-39 cm",
          "11-14 kg",
          "Merry, Outgoing, Joyful, Trusing",
          "No",
          "Black, Red, Brown, Silver and Tan",
        ],
        [
          "American Eskimo Dog",
          13,
          15,
          "american_eskimo",
          "Circus performer",
          "Families & Friends",
          "High",
          "13-15 years",
          "38-48 cm",
          "8.2-16 kg",
          "Intelligent, Protective, Reserved, Alert",
          "No",
          "White, Biscuit",
        ],
        [
          "American Foxhound",
          10,
          12,
          "american_foxhound",
          "Hound Group",
          "Families",
          "Low",
          "10-12 years",
          "56-64 cm",
          "29-34 kg",
          "Kind, Loyal, Loving, Independent",
          "No",
          "White, White & cream, Red, Tri-color",
        ],
        [
          "American Staffordshire Terrier",
          10,
          12,
          "american_staffordshire_terrier",
          "Terrier Group",
          "Families and children",
          "Low",
          "12-16 years",
          "46-48 cm",
          "23-32 kg",
          "Attentive, Devoted, Courageous, Loyal",
          "No",
          "Sable, Black, Blue, Brown",
        ],
        [
          "American Water Spaniel",
          13,
          15,
          "default",
          "Bird flushing and retrieving",
          "Waterfowl hunters",
          "Low",
          "13-15 years",
          "38-46 cm",
          "14-20 kg",
          "Energetic, Intelligent, Protective",
          "No",
          "Solid liver, brown, dark chocolate",
        ],
        [
          "Anatolian Shepherd Dog",
          13,
          15,
          "default",
          "Working Group",
          "Families and Small children",
          "Low",
          "10-13 years",
          "74-81 cm",
          "41-68 kg",
          "Steady, Bold, Confident, Proud",
          "No",
          "Blue Fawn, Red Fawn, White, Brindle",
        ],
        [
          "Australian Cattle Dog",
          13,
          15,
          "australian_cattle_dog",
          "Herding Dogs",
          "Families with older children",
          "High",
          "12-15 years",
          "43-51 cm",
          "18-22 kg",
          "Loyal, Active",
          "No",
          "Red, Black, Chocolate, Blue, Grey",
        ],
        [
          "Australian Shepherd",
          13,
          15,
          "australian_shepherd",
          "Herding Dogs",
          "Families",
          "Medium",
          "13-15 years",
          "50 – 58 cm",
          "20 to 29kg",
          "Affectionate, Intelligent, Protective, Good-natured, Active",
          "No",
          "Red merles,Black Tricolor",
        ],
        [
          "Australian Silky Terrier",
          12,
          15,
          "australian_silky_terrier",
          "Terrier Group",
          "Person who wants adventure on a small scale",
          "Moderate Maintenance",
          "14 – 16 years",
          "23 – 26cm",
          "3 – 5kg",
          "Active, Lively, Stubborn, Mischievous",
          "Yes",
          "Black, Black and Tan, Blue, Blue and Tan, Blue Silver and tan, Cream, Grey, Fawn, Grey and Tan, Silver black and Tan, Silver and Platinum",
        ],
        [
          "Australian Terrier",
          12,
          15,
          "australian_terrier",
          "Terrier Dogs",
          "Singles, families",
          "Medium",
          "Up to 15 years",
          "23 – 28 cm",
          "5.5 to 7 kg",
          "Alert, Loyal, Spirited",
          "Yes",
          "Blue & Tan, Red, Sand",
        ],
        [
          "Basenji",
          12,
          16,
          "basenji",
          "Hound Dogs",
          "Couples and singles",
          "Low",
          "10-12 years",
          "Up to 45cm",
          "12 kg",
          "Alert, Playful, Energetic, Quiet",
          "Yes",
          "Black, Sand, Red, Tan",
        ],
        [
          "Basset Hound",
          10,
          12,
          "basset_hound",
          "Hound Dogs",
          "Families, singles",
          "Medium",
          "11-12 years",
          "30-38 cm",
          "18-27 kg",
          "Intelligent, independent, social, sharp-tempered, excited",
          "No",
          "Black, white, brown, red",
        ],
        [
          "Beagle",
          12,
          15,
          "beagle",
          "Hound Dogs",
          "Families",
          "Medium",
          "12-15 years",
          "33-41 cm",
          "8-14 kg",
          "Loyal, Gentle",
          "Yes",
          "White/brown",
        ],
        [
          "Bearded Collie",
          14,
          15,
          "bearded_collie",
          "Working Dog",
          "Families",
          "High Maintenance",
          "12 – 14 years",
          "50 – 56 cm",
          "20 – 25 kg",
          "Self-confidence, Hardy, Lively, Alert, Intelligent, Active",
          "No",
          "Black, Blue, Brown, Fawn",
        ],
        [
          "Beauceron",
          10,
          12,
          "default",
          "Boar herding, hunting, guarding",
          "Families and strangers",
          "Low",
          "10-12 years",
          "63-66 cm",
          "32-45 kg",
          "Calm, Protective, Fearless",
          "No",
          "Harlequin, Black with tan. Black, black and white",
        ],
        [
          "Belgian Shepherd",
          10,
          14,
          "belgian_shepherd",
          "Herding Group",
          "Families",
          "High",
          "10-14 years",
          "61-66 cm",
          "25-30 kg",
          "Powerful, Intelligent, Affectionate",
          "No",
          "Fawn or grey with black overlay and a black mask",
        ],
        [
          "Bedlington Terrier",
          12,
          14,
          "bedlington_terrier",
          "Killing rat, badger, other vermin",
          "Families",
          "High",
          " 12-14 years",
          "41-44 cm",
          "7.7-10 kg",
          "Loyal, energetic, friendly, headstrong",
          "Yes",
          "Sandy, Sandy & Tan, liver",
        ],
        [
          "Belgian Shepherd Malinois",
          12,
          14,
          "default",
          "Herding Group",
          "Families and Strangers",
          "High",
          "10-14 years",
          "61-66 cm",
          "25-30 kg",
          "Watchful, Hard-Working, Confident, Active",
          "No",
          "Mathogany, Tan, Black-tipped Fawn",
        ],
        [
          "Bernese Mountain Dog",
          7,
          8,
          "bernese_mountain_dog",
          "Working Dogs",
          "Families, singles",
          "Medium",
          "6-8 years",
          "61-70 cm",
          "45-53 kg",
          "Friendly, Easy-going, loving, alert, affectionate",
          "No",
          "Black, white",
        ],
        [
          "Bichon Frise",
          12,
          15,
          "bichon_frise",
          "Companion Dogs",
          "Singles, small families",
          "High",
          "12 to 15 years",
          "23 – 30 cm",
          "3 – 6 kg",
          "Playful, Gentle, Cheerful, Sensitive",
          "Yes",
          "White, White & Apricot, White & Buff",
        ],
        [
          "Black and Tan Coonhound",
          10,
          12,
          "default",
          "Hunting raccoons, night hunting",
          "Families and friendly",
          "Low",
          "10 – 12 years",
          "64–69 cm",
          "29 – 34 kg",
          "Even Tempered, Adaptable, Trusting, Easygoing",
          "No",
          "Black and tan",
        ],
        [
          "Black Russian Terrier",
          10,
          11,
          "black_russian_terrier",
          "Working Group",
          "Families and Singles",
          "Low",
          "10-11 years",
          "66-72 cm",
          "50-60 kg",
          "Stable, Confident, Energetic, Brave",
          "No",
          "Black, Salt & Pepper",
        ],
        [
          "Bloodhound",
          10,
          12,
          "bloodhound",
          "Trailing",
          "Children",
          "High",
          "10-12 years",
          "64-69 cm",
          "33-50 kg",
          "Stubborn, Affectionate, Even Tempered",
          "No",
          "Black and Tan, Liver and Tan, Red",
        ],
        [
          "Bluetick Coonhound",
          11,
          12,
          "default",
          "Hound",
          "Children",
          "Low",
          "11-12 years",
          "56-69 cm",
          "25-36 kg",
          "Intelligent, Active, Friendly",
          "No",
          "Bluetick",
        ],
        [
          "Border Collie",
          13,
          16,
          "border_collie",
          "Herding Dogs",
          "Families",
          "Medium-High",
          "13-16 years",
          "48-56 cm",
          "17-20 kg",
          "Intelligent, Obedient, Active",
          "No",
          "Red, Black, Chocolate, White, Merle",
        ],
        [
          "Border Terrier",
          12,
          15,
          "border_terrier",
          "Terrier Dogs",
          "Families, excellent with young kids",
          "Medium",
          "12-15 years",
          "33 – 41 cm",
          "5 -7 kg",
          "Intelligent, Alert, Fearless, Obedient",
          "Yes",
          "Blue & Tan, Red, Wheaten",
        ],
        [
          "Borzoi",
          7,
          10,
          "borzoi",
          "Hound Group",
          "Families",
          "Moderate",
          "7-10 years",
          "81-86 cm",
          "34-47 kg",
          "Quiet, Intelligent, Athletic, Respectful",
          "No",
          "Any color permissible",
        ],
        [
          "Boston Terrier",
          13,
          15,
          "boston_terrier",
          "Companion Dogs",
          "Families",
          "Medium-Low",
          "13-15 years",
          "40 – 45 cm",
          "6 to 11 kg",
          "Friendly, Intelligent, Lively",
          "No",
          "Seal & White, Black & White",
        ],
        [
          "Briard",
          10,
          12,
          "briard",
          "Herding, guarding sheep",
          "Families and Children",
          "High",
          "10-12 years",
          "58-69 cm",
          "27-41 kg",
          "Faithful, Intelligent, Obedient",
          "No",
          "Tawny, Grey, Black & grey",
        ],
        [
          "Bouvier des Flandres",
          10,
          12,
          "default",
          "Cattle herding",
          "Families",
          "High",
          "10-12 years",
          "62-68 cm",
          "35-40 kg",
          "Rational, Familial, Protective",
          "Yes",
          "Fawn, Black, Gray, Brindle",
        ],
        [
          "Boxer",
          10,
          12,
          "boxer",
          "Working Dogs",
          "Families",
          "Medium",
          "10-12 years",
          "53-60 cm",
          "30-32 kg",
          "Affectionate, active, watchful, alert, self-assured",
          "No",
          "Brown, red, white, black",
        ],
        [
          "Boykin Spaniel",
          14,
          16,
          "default",
          "Miscellaneous Class",
          "Families and hunters",
          "Moderate",
          "14-16 years",
          "39-46 cm",
          "14-18 kg",
          "Eager, Trainable, Companionable",
          "No",
          "Liver, Brown, Chocolate",
        ],
        [
          "Brittany",
          14,
          15,
          "brittany_spaniel",
          "Sporting Group",
          "Families",
          "Moderate",
          "12-15 years",
          "47-52 cm",
          "16-19 kg",
          "Attentive, Agile, Quick",
          "No",
          "Tri-color, Orange & White, Liver & White",
        ],
        [
          "Bull Terrier",
          11,
          14,
          "bull_terrier",
          "Terrier Dogs",
          "Families with older children",
          "Medium",
          "10-14 years",
          "51-60 cm",
          "20-33 kg",
          "Affectionate, active, loyal, stubborn",
          "No",
          "Brown, white, black, red",
        ],
        [
          "Bulldog",
          8,
          12,
          "default",
          "Non-Sporting Group",
          "Families and Children",
          "Low",
          "8-10 years",
          "31-40 cm",
          "18-23 kg",
          "Docile, Willful, Friendly",
          "No",
          "Piebald, White, Fawn and White",
        ],
        [
          "Bullmastiff",
          8,
          10,
          "bullmastiff",
          "Working Dogs",
          "Families with older children",
          "Medium",
          "8-10 years",
          "63-69 cm",
          "50-60 kg",
          "Loyal, stubborn, fearless, confident, independent",
          "Yes",
          "Fawn, brindle with markings on head",
        ],
        [
          "Cairn Terrier",
          12,
          15,
          "cairn_terrier",
          "Terrier Dogs",
          "Families",
          "Low – medium",
          "13-14 years",
          "25 to 33 cm",
          "6 to 8 kg",
          "Active, Hardy, Fearless, Gay, Intelligent",
          "Yes",
          "Black, Grey, Wheaten, Red",
        ],
        [
          "Canaan Dog",
          12,
          15,
          "canaan_dog",
          "Herding Group",
          "Children",
          "Low",
          "12-15 years",
          "51-61 cm",
          "18-25 kg",
          "Quick, Devoted, Alert, Intelligent",
          "No",
          "Black, Tan, Golden, Liver",
        ],
        [
          "Cane Corso",
          10,
          11,
          "cane_corso",
          "Working Dogs",
          "Families with young children",
          "High",
          "10-11 years",
          "64-68 cm",
          "45-50 kg",
          "Loyal, independent, Well-rounded, agile, energetic",
          "No",
          "black, grey and black, brindle",
        ],
        [
          "Cavalier King Charles Spaniel",
          9,
          14,
          "cavalier_king_charles_spaniel",
          "Companion Dogs",
          "Families",
          "Low – medium",
          "9-14 years",
          "30 to 33 cm",
          "5 to 8 kgs",
          "Playful, Gentle, Fearless, Patient, Adaptable",
          "No",
          "Black & Tan, Ruby, Tri-color",
        ],
        [
          "Cesky Terrier",
          12,
          15,
          "default",
          "Miscellaneous Class",
          "Families & Children",
          "High",
          "12-15 years",
          "10 to 13 in",
          "5.9 – 10 kg",
          "Cheerful, Calm, Reserved, Quiet",
          "Yes",
          "Grey blue, Light Cofee brown",
        ],
        [
          "Chesapeake Bay Retriever",
          10,
          12,
          "default",
          "Sporting Group",
          "Families and Children",
          "Moderate",
          "10-12 years",
          "58-66 cm",
          "29-36 kg",
          "Dominant, Happy, Affectionate, Quiet",
          "No",
          "Light Brown, Dark Brown, Deadgrass, Tan, Sedge",
        ],
        [
          "Chihuahua",
          10,
          18,
          "chihuahua",
          "Companion Dogs",
          "Singles, families with older Kids",
          "Medium",
          "10-18 years",
          "15 – 23 cm",
          "1.5 – 3 kg",
          "Devoted, Lively, Quick, Alert",
          "No",
          "Black, White, Fawn, Cream, Gold",
        ],
        [
          "Chinese Crested Dog",
          13,
          15,
          "chinese_crested_dog",
          "Toy dog",
          "Children",
          "High",
          "13-15 years",
          "28-33 cm",
          "3.2-5.4 kg",
          "Sweet-Tempered, Lively, Happy, Playful",
          "Yes",
          "Tri-color, Chocolate, Apricot",
        ],
        [
          "Chow Chow",
          9,
          12,
          "chow_chow",
          "Working Dogs",
          "Singles, small families",
          "Medium",
          "9-12 years",
          "43-50 cm",
          "25-32 kg",
          "Loyal, protective, reserved, aloof, dignified, stubborn, intelligent",
          "No",
          "black, blue, red faun, white coats",
        ],
        [
          "Clumber Spaniel",
          10,
          12,
          "default",
          "Sporting Group",
          "Families",
          "Moderate",
          "10-12 years",
          "46-51 cm",
          "25-39 kg",
          "Dignified, Great-hearted, Affectionate",
          "No",
          "White, Lemon & White",
        ],
        [
          "Curly Coated Retriever",
          9,
          14,
          "default",
          "Sporting Group",
          "Families, Children",
          "High",
          "9-14 years",
          "64-69 cm",
          "32-41 kg",
          "Clever, Intelligent, Sensitive, Trainable",
          "No",
          "Black, Liver",
        ],
        [
          "Dachshund",
          14,
          17,
          "dachshund",
          "Hound Dogs",
          "Singles, families",
          "Medium",
          "14-16 years",
          "20 – 27 cm",
          "4 – 5 kg",
          "Clever, Devoted, Active, Playful",
          "No",
          "Black, Black & Tan, Blue & Tan, Chocolate & Tan",
        ],
        [
          "Dalmatian",
          10,
          13,
          "dalmatian",
          "Companion Dogs",
          "Families with older children, Singles",
          "Medium-high",
          "10-13 years",
          "50-55 cm",
          "23-25 kg",
          "Energetic, Playful, Loyal",
          "Yes",
          "White with black spotted coat, brindle, mosaic, orange/lemon",
        ],
        [
          "Dandie Dinmont Terrier",
          12,
          15,
          "dandie_dinmont_terrier",
          "Terrier Group",
          "Children",
          "Moderate",
          "12-15 years",
          "8-11 ins",
          "8.2-11 kg",
          "Fun-loving, Determined, Independent, Lively",
          "Yes",
          "Pepper, Mustard",
        ],
        [
          "Doberman Pinscher",
          10,
          11,
          "doberman_pinscher",
          "Working Dogs",
          "Families",
          "Low",
          "10 – 13 years",
          "60 – 70 cm",
          "35 – 42kg",
          "Intelligent, Obedient, Fearless, Alert, Energetic, Loyal, Confident",
          "No",
          "White, Fawn, Black, Blue, Red, Black & Rust, Fawn",
        ],
        [
          "Dogue de Bordeaux",
          10,
          12,
          "default",
          "Working Dogs",
          "Families",
          "Medium",
          "10-12 years",
          "65-70 cm",
          "60-68 kg",
          "Intelligent, loyal, Sensitive, Active",
          "No",
          "Dark red, Fawn, mahogany, golden fawn",
        ],
        [
          "English Bulldog",
          8,
          12,
          "english_bulldog",
          "Companion Dogs",
          "Families",
          "Medium",
          "8 to 12 years",
          "31 – 40cm",
          "0–25 kg",
          "Gentle, affectionate, stubborn , Friendly. Docile. Devoted.",
          "No",
          "White, Fawn, Piebald, Brindle & White, Fawn & White, Red, Red Brindle, Red & White",
        ],
        [
          "English Cocker Spaniel",
          12,
          15,
          "english_cocker_spaniel",
          "Sporting Group",
          "Families",
          "High",
          "12-15 years",
          "38-43 cm",
          "13-14 kg",
          "Affectionate, Friendly, Quiet, Faithful",
          "No",
          "Orange Roan, Liver Roan, Blue Roan, Black",
        ],
        [
          "English Coonhound",
          11,
          12,
          "default",
          "Scenthound",
          "Families",
          "Low",
          "11-12 years",
          "56-69 cm",
          "18-30 kg",
          "High-Strung, Loyal, Energetic, Intelligent",
          "No",
          "Redtick, Red & White, Bluetick, Tricolor Ticked",
        ],
        [
          "English Foxhound",
          10,
          13,
          "default",
          "Hound Group",
          "Hunters and Families",
          "Low",
          "10-13 years",
          "56-63 cm",
          "29-34 kg",
          "Tolerant, Sociable, Gentle, Friendly",
          "No",
          "Tricolor, Lemon & White, White",
        ],
        [
          "English Mastiff",
          10,
          12,
          "english_mastiff",
          "Working Group",
          "Children",
          "Moderate",
          "6-12 years",
          "70-91 cm",
          "73-100 kg",
          "Good-natured, Dignified, Courageous, Calm",
          "No",
          "Fawn, Brindle, Apricot",
        ],
        [
          "English Setter",
          10,
          12,
          "english_setter",
          "Sporting Group",
          "Children",
          "High",
          "10-12 years",
          "25 to 27 in",
          "65 to 80 pounds",
          "Strong Willed, Eager, Hard-Working, Gentle",
          "No",
          "Blue Belton, Tricolor, Orange Belton, Liver Belton",
        ],
        [
          "English Springer Spaniel",
          12,
          14,
          "english_springer_spaniel",
          "Spaniel group",
          "Families",
          "Moderate",
          "12-14 years",
          "48-56 cm",
          "20-25 kg",
          "Affectionate, Attentive, Alert",
          "No",
          "Liver & White, Tricolor",
        ],
        [
          "Entlebucher Mountain Dog",
          11,
          15,
          "default",
          "Foundation Stock Service Program",
          "Children",
          "High",
          "11-15 years",
          "44-52 cm",
          "20-30 kg",
          "Self-confidence, Agile, Independent, Loyal",
          "No",
          "Tri-color",
        ],
        [
          "Field Spaniel",
          10,
          12,
          "default",
          "Sporting Group, Bird flushing, retrieving",
          "Families",
          "Moderate",
          "10-12 years",
          "17-18 in",
          "16-20 kg",
          "Adaptable, Sensitive, Sociable, Familial",
          "No",
          "Black, Blue Roan, Liver Roan, Liver",
        ],
        [
          "Finnish Lapphund",
          12,
          14,
          "default",
          "Foundation Stock Service Program",
          "Families",
          "Low",
          "12-14 years",
          "46-52 cm",
          "15-24 kg",
          "Keen, Courageous, Faithful, Calm",
          "No",
          "Black, White, Wolf-Sable, Sable, Brown",
        ],
        [
          "Finnish Spitz",
          12,
          14,
          "default",
          "Non-Sporting Group, Hunting birds, small mammals",
          "Families and Children",
          "Moderate",
          "12-14 years",
          "44-50 cm",
          "12-14 kg",
          "Vocal, Independent, Playful, Happy",
          "No",
          "Gold, Red Gold, Red",
        ],
        [
          "Flat-Coated Retriever",
          8,
          10,
          "default",
          "Sporting Group, Water retrieving",
          "Families",
          "Low",
          "8-14 years",
          "59-62 cm",
          "27-36 kg",
          "Outgoing, Optimistic, Confident, Friendly",
          "No",
          "Black, Liver",
        ],
        [
          "French Bulldog",
          10,
          12,
          "french_bulldog",
          "Companion Dogs",
          "Singles, families",
          "Medium",
          "10-15 years",
          "28-30 cm",
          "10 – 13kgs",
          "Playful, Lively, Affectionate, Bright, Keen, Athletic, Alert, Sociable, Patient, Easygoing",
          "No",
          "Brindle, Fawn, Pied",
        ],
        [
          "German Pinscher",
          12,
          14,
          "default",
          "Working Group",
          "Children",
          "High",
          "12-14 years",
          "25-30 cm",
          "11-20 kg",
          "Spirited, Intelligent, Even Tempered",
          "No",
          "Black, Brown, Red, Blue",
        ],
        [
          "German Shepherd",
          9,
          13,
          "german_shepherd",
          "Herding Dogs",
          "Families",
          "Medium",
          "12-14 years",
          "60-65 cm",
          "30-40 kg",
          "Intelligent, loyal, patient, active, aloof, reserved, protective",
          "No",
          "Mixture of gold and black",
        ],
        [
          "German Shorthaired Pointer",
          12,
          14,
          "german_shorthaired_pointer",
          "General hunting, Sporting Group",
          "Hunters",
          "Low",
          "12-14 years",
          "58-64 cm",
          "25-32 kg",
          "Boisterous, Affectionate, Bold, Cooperative",
          "No",
          "Liver Roan, Liver, Black & White, White & Chocolate",
        ],
        [
          "German Wirehaired Pointer",
          12,
          14,
          "german_wirehaired_pointer",
          "Sporting Group, General hunting, watch dog",
          "Gun Dog",
          "Moderate",
          "12-14 years",
          "61-68 cm",
          "27-32 kg",
          "Willful, Intelligent, Loyal, Active",
          "No",
          "Liver, Black & White, Roan, Liver & White",
        ],
        [
          "Giant Schnauzer",
          12,
          15,
          "giant_schnauzer",
          "Working Group, Herding, guarding",
          "Herding Dog",
          "Moderate",
          "12-15 years",
          "65-70 cm",
          "27-48 kg",
          "King, Dominant, Loyal, Powerful, Strong Willed",
          "Yes",
          "Salt & Pepper, Black",
        ],
        [
          "Glen of Imaal Terrier",
          13,
          14,
          "default",
          "Terrier Group",
          "Children",
          "High",
          "10-14 years",
          "13-i4 in",
          "15-16 kg",
          "Agile, Spirited, Loyal, Active",
          "No",
          "Blue Brindle, Wheaten",
        ],
        [
          "Golden Retriever",
          10,
          12,
          "golden_retriever",
          "Sporting Dogs",
          "Families",
          "Medium",
          "11-12 years",
          "58-61 cm",
          "29-34 kg",
          "Intelligent, Gentle, Friendly",
          "No",
          "Gold, cream",
        ],
        [
          "Gordon Setter",
          10,
          12,
          "gordon_setter",
          "Sporting Group",
          "Families and Children",
          "Low",
          "10-12 years",
          "61-69 cm",
          "25-36 kg",
          "Gay. Fearless, Confident, Active",
          "No",
          "Black & Tan",
        ],
        [
          "Great Dane",
          6,
          8,
          "great_dane",
          "Working Dogs",
          "Families",
          "Medium",
          "6-8 years",
          "76-86 cm",
          "54-91 kg",
          "Devoted, Reserved, Loving, Gentle, Friendly, Confident",
          "No",
          "Brindle, Fawn, Black, Mantle, Blue, Harlequin",
        ],
        [
          "Great Pyrenees",
          10,
          12,
          "great_pyrenees",
          "Sheep guardian, Working Group",
          "Families and Childrens",
          "Moderate",
          "10-12 years",
          "70-82 cm",
          "45-73 kg",
          "Gentle, Strong Willed, Patient, Fearless",
          "No",
          "Tan, White, Bedger, White",
        ],
        [
          "Greater Swiss Mountain Dog",
          10,
          11,
          "greater_swiss",
          "Working Group",
          "Childrens",
          "Low",
          "10-11 years",
          "65-72 cm",
          "55-65 kg",
          "Self-confidence, Loyal, Devoted, Fearless",
          "No",
          "Tri-color",
        ],
        [
          "Greyhound",
          10,
          12,
          "greyhound",
          "Lapdog, Hound Group",
          "Families",
          "Low",
          "10-14 years",
          "71-76 cm",
          "27-40 kg",
          "Even Tempered, Affectionate, Quiet, Intelligent",
          "No",
          "Brindle, Black, White, Fawn, Blue, Red",
        ],
        [
          "Griffon Bruxellois",
          12,
          15,
          "griffon_bruxellois",
          "Toy Dog",
          "Kids",
          "Low",
          "10-15 years",
          "9-11 inches",
          "8-10 pounds",
          "Sensitive, Companionable, Watchful, Alert",
          "Yes",
          "Black, Black & Tan, Blue, Blege, Brown",
        ],
        [
          "Harrier",
          10,
          12,
          "default",
          "Hound Group",
          "Childrens, Families",
          "Low",
          "10-12 years",
          "19-21 inches",
          "20-30 kg",
          "Outgoing, Cheerful, Active, Friendly",
          "No",
          "Lemon & white, Tri-color, White, Black & Tan",
        ],
        [
          "Havanese",
          13,
          15,
          "havanese",
          "Companion Dogs",
          "Families",
          "Low-medium",
          "13 – 15 years",
          "23 – 27 cm",
          "4.5 – 7.3 kg",
          "Playful, Gentle, Intelligent, Responsive, Affectionate, Companionable",
          "Yes",
          "Black, White, Tobacco, Fawn",
        ],
        [
          "Ibizan Hound",
          10,
          12,
          "ibizan_hound",
          "Coursing rabbits, Hound Group",
          "Families",
          "Low",
          "10-12 years",
          "66-72 cm",
          "20-30 kg",
          "Clownish, Stubborn, Independent, Active",
          "No",
          "White, Fawn, White & Red, Red",
        ],
        [
          "Icelandic Sheepdog",
          12,
          15,
          "icelandic_sheepdog",
          "Miscellaneous Class",
          "Childrens",
          "High",
          "12-15 years",
          "16.5-18 inches",
          "9.1-14 kg",
          "Cheerful, Hardy, Agile, Alert",
          "No",
          "White & black, White & Cream, Gold & White, Grey & White",
        ],
        [
          "Irish Red and White Setter",
          10,
          13,
          "default",
          "Sporting Group",
          "Small Kids",
          "High",
          "10-13 years",
          "62-66 cm",
          "25-34 kg",
          "Affectionate, Devoted, Loyal, Reliable",
          "No",
          "Red & White",
        ],
        [
          "Irish Setter",
          12,
          15,
          "irish_setter",
          "Sporting Dogs",
          "Families",
          "High",
          "10-14 years",
          "63-70 cm",
          "29-34 kg",
          "Fun, Playful, Outgoing, Loving, Sporty",
          "No",
          "Mahogany and chestnut",
        ],
        [
          "Irish Soft-coated Wheaten Terrier",
          12,
          15,
          "default",
          "Terrier Group",
          "Families",
          "High",
          "12-15 years",
          "46-48 cm",
          "16-20 kg",
          "Intelligent, Affectionate, Playful, Energetic, Spirited",
          "Yes",
          "Wheaten",
        ],
        [
          "Irish Terrier",
          13,
          15,
          "irish_terrier",
          "Terrier Dogs",
          "Families, Singles",
          "Low-Medium",
          "12-15 years",
          "40-46 cm",
          "10-12 kg",
          "Lively, Gentle",
          "Yes",
          "Bright red, golden red, red wheaten, solid wheaten",
        ],
        [
          "Irish Water Spaniel",
          10,
          12,
          "default",
          "Water retrieving, Sporting Group",
          "Families and Childrens",
          "high",
          "10-12 years",
          "56-61 cm",
          "25-30 kg",
          "Clownish, Quick, Intelligent, Alert, Active",
          "Yes",
          "Liver",
        ],
        [
          "Irish Wolfhound",
          6,
          10,
          "irish_wolfhound",
          "Coursing wolves, elk, Hound Group",
          "Childrens",
          "Moderate",
          "6-10 years",
          "30-32 inches",
          "120-155 lbs",
          "Sweet-Tempered, Thoughtful, Loyal, Dignified, Genrous",
          "No",
          "Black, White, Brindle, Fawn, Grey",
        ],
        [
          "Italian Greyhound",
          12,
          15,
          "italian_greyhound",
          "Companion Dogs",
          "Families with older kids",
          "Medium – low",
          "12-15 years",
          "30 to 40 cm",
          "3 – 5 kg",
          "Intelligent, Agile, Affectionate, Companionable, Athletic, Mischievous",
          "Yes",
          "Black, Fawn, Chocolate, Blue Fawn, Slate Grey, Red Fawn, Red, Blue, Tan, Sable, Yellow, Grey",
        ],
        [
          "Jack Russell Terrier",
          13,
          16,
          "jack_russell_terrier",
          "Terrier Dogs",
          "Families with older children",
          "Medium",
          "13-16 years",
          "25 to 38cm",
          "6 to 8kgs",
          "Stubborn, Fearless, Intelligent, Athletic, Energetic, Vocal",
          "No",
          "White, Black & White, White & Tan",
        ],
        [
          "Japanese Chin",
          12,
          14,
          "japanese_chin",
          "Lapdog, Toy Dog",
          "Childrens",
          "Moderate",
          "12-14 years",
          "8-11 inches",
          "1.4-8.6 kg",
          "Cat-like, Alert, Loyal, Intelligent, Independent",
          "No",
          "Tri-color, Black & White, Lemon & White, Sable & White",
        ],
        [
          "Keeshond",
          13,
          15,
          "keeshounds",
          "Barge watchdog, Non-Sporting Group",
          "Families & Childrens",
          "High",
          "13-15 years",
          "17-18 inches",
          "14-18 kg",
          "Bright, Agile, Playful, Obedient",
          "No",
          "Black, Grey, Black & Silver, Silver",
        ],
        [
          "Kerry Blue Terrier",
          13,
          15,
          "kerry_blue_terriers",
          "Kerry Blue Terrier",
          "Childrens",
          "High",
          "13-15 years",
          "46-51 cm",
          "15-18 kg",
          "Strong Willed, Alert, Loyal, Spirited",
          "Yes",
          "Black, Blue, Silver, Grey",
        ],
        [
          "King Charles Spaniel",
          12,
          14,
          "king_charles_spaniel",
          "Flushing small birds, companion, Toy Dog",
          "Childrens, Families and Strangers",
          "High",
          "9-14 years",
          "12-13 inches",
          "5.9-9.2 kg",
          "Playful, Sociable, Gentle, Affectionate, Patient",
          "No",
          "Black & Tan, Tri-color, Ruby",
        ],
        [
          "Komondor",
          10,
          12,
          "default",
          "Sheep guardian, Working Group",
          "Families",
          "High",
          "10-12 years",
          "71-76 cm",
          "50-60 kg",
          "Steady, Affectionate, fearless, Gentle",
          "No",
          "White, Black, Red, Green",
        ],
        [
          "Kuvasz",
          10,
          12,
          "default",
          "Guardian, hunting large game, Working Group",
          "Families",
          "Moderate",
          "10-12 years",
          "70-76 cm",
          "45-52 kg",
          "Protective, Intelligent, Patient, Loyal",
          "No",
          "White, Black, Blue, Brown, Pink",
        ],
        [
          "Labrador Retriever",
          12,
          13,
          "labrador_retriever",
          "Water retrieving, Sporting Group",
          "Kids and Families",
          "Low",
          "10-12 years",
          "57-62 cm",
          "29-36 kg",
          "Outgoing, Kind, Even Tempered, Agile",
          "No",
          "Black, Yellow, Chocolate",
        ],
        [
          "Lakeland Terrier",
          12,
          16,
          "lakeland_terrier",
          "Terrier Group",
          "Kids & Families",
          "Moderate",
          "12-16 years",
          "13.5-15 inches",
          "7-8 kg",
          "Intelligent, Friendly, Independent, Bold",
          "Yes",
          "Black, Grizzle & Tan, Black & Tan, Wheaten",
        ],
        [
          "Leonberger",
          8,
          9,
          "leonberger",
          "Guardian, appearance, Miscellaneous Class",
          "Kids",
          "High",
          "8-9 years",
          "72-80 cm",
          "48-75 kg",
          "Fearless, Loyal, Loving, Obedient",
          "No",
          "Red, Sandy, Yellow",
        ],
        [
          "Lhasa Apso",
          12,
          14,
          "lhasa_apso",
          "Companion Dogs",
          "Singles, families",
          "High",
          "13-15 years",
          "25 – 28 cm",
          "6 – 7 kg",
          "Playful, Lively, Obedient, Devoted, Fearless, Intelligent, Spirited, Alert, Assertive, Energetic, Friendly, Steady",
          "Yes",
          "black, white, black and tan",
        ],
        [
          "Lowchen",
          12,
          14,
          "default",
          "Non-Sporting Group",
          "Families and Childrens",
          "Low",
          "12-14 years",
          "33-36 cm",
          "5-8 kg",
          "Playful, Happy, Active, Intelligent",
          "Yes",
          "Black, Silver & Black, Cream, Black & Tan",
        ],
        [
          "Maltese",
          12,
          15,
          "maltese_dog",
          "Companion Dogs",
          "Singles, families with older children",
          "Low – medium",
          "12-15 years",
          "21 – 25 cm",
          "3 – 4 kg",
          "Playful, Lively, Affectionate, Docile, Fearless",
          "Yes",
          "White, Black, Blue, Red, Green, Yellow",
        ],
        [
          "Manchester Terrier",
          14,
          16,
          "default",
          "Terrier Group",
          "Families",
          "Low",
          "14-16 years",
          "15-16 inches",
          "5.4-10 kg",
          "Discerming, Keen, Active, Devoted",
          "No",
          "Black, Black & Tan, Tan, Blue",
        ],
        [
          "Mexican Hairless Dog",
          12,
          15,
          "mexican_hairless",
          " hairless Chinese, Foundation Stock Service Program",
          "Families, Old Childrens",
          "Low",
          "12-15 years",
          "28-33 cm",
          "4-25 kg",
          "Cheerful, Calm, Alert, Intelligent, Protective",
          "Yes",
          "Black, Brindle, Brown, Fawn",
        ],
        [
          "Miniature Pinscher",
          14,
          15,
          "miniature_pinscher",
          "Companion Dogs",
          "Families",
          "Medium-high",
          "10 to 14 years",
          "25–30 cm",
          "4–5 kg",
          "Playful, Outgoing, Responsive, Energetic, Friendly, Clever",
          "No",
          "Stag Red, Chocolate & Rust, Black & Tan, Red, Black & Rust, Chocolate & Tan",
        ],
        [
          "Miniature Schnauzer",
          12,
          15,
          "mininature_schnauzer",
          "Ratting, Terrier Group",
          "Childrens",
          "Moderate",
          "12-15 years",
          "30-36 cm",
          "5.4-9.1 kg",
          "Intelligent, Fearless, Obedient, Friendly",
          "Yes",
          "Black, Salt & Pepper, White",
        ],
        [
          "Neapolitan Mastiff",
          8,
          10,
          "default",
          "Working Group",
          "Old Childrens",
          "Low",
          "8-10 years",
          "63-77 cm",
          "60-70 kg",
          "Stubborn, Obedient, Dominant, Protective, Fearless",
          "No",
          "Black, Brindle, Tawny, Blue",
        ],
        [
          "Newfoundland",
          8,
          12,
          "newfoundland",
          "Working Dogs",
          "Families",
          "Medium",
          "8-10 years",
          "69 to 74cm",
          "65 to 69kgs",
          "Trainable, Sweet-Tempered, Gentle",
          "No",
          "Black, Black & White, Brown, Grey",
        ],
        [
          "Norfolk Terrier",
          12,
          15,
          "default",
          "Ratting, fox bolting, Terrier Group",
          "Childrens",
          "Moderate",
          "12-15 years",
          "9-10 inches",
          "5-5.4 kg",
          "Lovable, Fearless, Spirited, Happy",
          "Yes",
          "Grizzle, Black & Tan, Wheaten, Red",
        ],
        [
          "Norwegian Buhund",
          13,
          15,
          "default",
          "Miscellaneous Class",
          "Families",
          "Low",
          "13-15 years",
          "43-47 cm",
          "14-18 kg",
          "Fun-loving, Friendly, Courageous, Energetic, Agile",
          "No",
          "Black, Red Wheaten, Wheaten",
        ],
        [
          "Norwegian Elkhound",
          12,
          15,
          "default",
          "Hunting elk, Hound Group",
          "Kids",
          "Moderate",
          "12-15 years",
          "19-21 inches",
          "22-25 kg",
          "Hardy, Bold, Loyal, Alert, Strong Willed",
          "No",
          "Grey, Silver",
        ],
        [
          "Norwegian Lundehund",
          12,
          14,
          "default",
          "Northern Breed Group",
          "Kids",
          "Low",
          "12-14 years",
          "33-38 cm",
          "6-9 kg",
          "Energetic, loyal, Protective, Alert",
          "No",
          "Black, White, Sable & White, Grey, Red",
        ],
        [
          "Norwich Terrier",
          12,
          14,
          "norwich_terrier",
          "Ratting, fox bolting",
          "Families and Childrens",
          "Moderate",
          "12-14 years",
          "8-10 inches",
          "5-5.4 kg",
          "Hardy, Intelligent, Sensitive, Affectionate",
          "Yes",
          "Grizzle, Black & Tan, Red, Tan",
        ],
        [
          "Nova Scotia Duck Tolling Retriever",
          12,
          14,
          "nova_scotia_duck_tolling_retriever",
          "Sporting Group",
          "Childrens",
          "Low",
          "10-14 years",
          "45-54 cm",
          "20-23 kg",
          "Intelligent, Alert, Loving",
          "No",
          "Copper, Red, Red Golden",
        ],
        [
          "Old English Sheepdog",
          10,
          12,
          "old_english_sheepdog",
          "Herding Group",
          "Families",
          "Medium – high",
          "10-12 years",
          "56 – 61cm",
          "38 – 45kg",
          "Active, Intelligent, Loyal, Hard-Working, Athletic, Confident, Proud",
          "No",
          "Blue Merle, Blue, Grey, Grizzle",
        ],
        [
          "Otterhound",
          10,
          13,
          "default",
          "Hound Group",
          "Small Childrens and Families",
          "High",
          "10-13 years",
          "24-27 inches",
          "41-50 kg",
          "Amiable, Even Tempered, Boisterous",
          "No",
          "Black, Liver & Tan, Wheaten, Grey",
        ],
        [
          "Papillon",
          13,
          15,
          "papillon",
          "Companion Dogs",
          "Families",
          "Medium",
          "13-15 Years",
          "Up to 28 cm",
          "Up to 5 kg",
          "Intelligent, active",
          "No",
          "White and Brown",
        ],
        [
          "Parson Russell Terrier",
          13,
          15,
          "default",
          "Terrier Group",
          "Childrens",
          "Low",
          "13-15 years",
          "34-38 cm",
          "5.9-7.7 kg",
          "Energetic, Bold, Obedient, Intelligent",
          "No",
          "White & Tan, Tri-color, Black & White",
        ],
        [
          "Pekingese",
          12,
          15,
          "pekingese",
          "Companion Dogs",
          "Couples and singles",
          "High",
          "13-15 Years",
          "Up to 25 cm",
          "Up to 6 kg",
          "Confident, stubborn, Tough, Affectionate",
          "No",
          "Gold, sable, red, cream, tan, white",
        ],
        [
          "Pembroke Welsh Corgi",
          12,
          14,
          "pembroke_welsh_corgi",
          "Herding Group, Cattle drover",
          "children",
          "Low",
          "12-15 Years",
          "25-30 cm",
          "10-14 kg",
          "Tanacious, Friendly, Playful, Outgoing, Bold",
          "No",
          "Fawn, Black & White, Red, Black & Tan",
        ],
        [
          "Petit Basset Griffon Vendeen",
          12,
          14,
          "default",
          "Hound Group",
          "Childrens and families",
          "High",
          "12-14 years",
          "13.5-15 inches",
          "15-20 kg",
          "Extroverted, Lively, Independent, Friendly",
          "No",
          "Tri-color, Black & Tan, Fawn & White",
        ],
        [
          "Pharaoh Hound",
          11,
          14,
          "default",
          "Hunting rabbits, Hound Group",
          "Childrens",
          "Low",
          "11-14 years",
          "55-63 cm",
          "18-27 kg",
          "Affectionate, Sociable, Playful, Intelligent",
          "No",
          "Rich Tan, Tan, Red Golden",
        ],
        [
          "Plott Hound",
          12,
          14,
          "default",
          "Hound Group",
          "Childrens And Families",
          "High",
          "12-14 years",
          "50-71 cm",
          "23-27 kg",
          "Intelligent, Alert, Bold, Loyal",
          "No",
          "Black, Brown Brindle, Tan Brindle",
        ],
        [
          "Pointer",
          12,
          14,
          "default",
          "Sporting Group, General hunting, watch dog General hunting, watch dog",
          "Childrens",
          "Moderate",
          "12-17 years",
          "56-70 cm",
          "25-34 kg",
          "Even Tempered, Affectionate, Loyal, Amiable",
          "No",
          "Black, Orange & White, Black & White, Liver",
        ],
        [
          "Polish Lowland Sheepdog",
          12,
          15,
          "polish_lowland_sheepdog",
          "Herding Group",
          "Families",
          "High",
          "12-15 years",
          "45-50 cm",
          "18-23 kg",
          "Even Tempered, Lively, Self-confidence",
          "Yes",
          "Black, Tri-color, Black & White, Beige",
        ],
        [
          "Pomeranian",
          12,
          16,
          "pomeranian",
          "Companion Dogs",
          "Families and singles",
          "Medium",
          "12 – 16 Years",
          "13-28 cm",
          "Up to 4 kg",
          "Independent, Friendly",
          "No",
          "white, orange",
        ],
        [
          "Poodle",
          12,
          15,
          "poodle",
          "Companion Dogs",
          "Families",
          "Medium-high",
          "12-15 Years",
          "45-60 cm",
          "20-32 kg",
          "Trainable, Intelligent, Faithful, Alert, Instinctual, Active",
          "Yes",
          "Apricot, Black, White, Black & Tan, Cream, Black & White, Red, Silver, Blue, Brown, Sable, Grey",
        ],
        [
          "Portuguese Water Dog",
          12,
          15,
          "portuguese_water_dog",
          "Fishing aid, Working Group",
          "Families, Childrens",
          "High",
          "12-15 years",
          "50-57 cm",
          "18-27 kg",
          "Intelligent, Docile, Obedient, Brave, Impetuous",
          "Yes",
          "Black, White, White and Chocolate",
        ],
        [
          "Pug",
          12,
          15,
          "pug",
          "Companion Dogs",
          "Families and singles",
          "Low",
          "10-12 years",
          "30-36 cm",
          "6-9 kg",
          "Playful, Loyal",
          "Yes",
          "Black, Apricot, Fawn",
        ],
        [
          "Puli",
          12,
          16,
          "default",
          "Herding",
          "Childrens",
          "High",
          "12-16 years",
          "39-45 cm",
          "10-11 kg",
          "Intelligent, Loyal, Agile, Obedient",
          "Yes",
          "Black, White, Brindle, Cream",
        ],
        [
          "Pyrenean Shepherd",
          15,
          17,
          "default",
          "Miscellaneous Class",
          "Childrens",
          "High",
          "15-17 years",
          "40-50 cm",
          "20-25 kg",
          "Dedicated, Watchful, Bossy, Clever",
          "No",
          "Black, White, Merle, Brindle, Fawn",
        ],
        [
          "Redbone Coonhound",
          11,
          12,
          "default",
          "Miscellaneous Class",
          "Families",
          "High",
          "11-12 years",
          "56-68 cm",
          "20-32 kg",
          "Unflappable, Energetic, Companionable, Affectionate, Independent",
          "No",
          "Red & White, Red",
        ],
        [
          "Rhodesian Ridgeback",
          10,
          12,
          "rhodesian_ridgeback",
          "Hound Dogs",
          "Families with older children",
          "Medium – high",
          "10 – 12 years",
          "63–69 cm",
          "36–41 kg",
          "Strong Willed, Intelligent, Mischievous, Loyal, Dignified, Sensitive",
          "No",
          "Red Wheaten, Wheaten, Light Wheaten",
        ],
        [
          "Rottweiler",
          9,
          10,
          "rottweiler",
          "Working Dogs",
          "Families",
          "Medium",
          "8 – 10 years",
          "61 – 69 cm",
          "42 and 50 kg",
          "Obedient, Devoted, Fearless, Courageous, Alert, Self-assured, Good-natured, Calm, Steady, Confident",
          "No",
          "Black, Tan, Mahogany",
        ],
        [
          "Rough Collie",
          14,
          16,
          "default",
          "Herding, agility training, Herding Group",
          "Childrens",
          "Minimal—brushing once a week, bathing once a month, and twice a year they will blow their coat and need a little extra brushing during this time",
          "14-16 years",
          "56-61 cm",
          "20-34 kg",
          "Intelligent, Loyal, Active, Gentle, Friendly",
          "No",
          "White, Blue Merle, Tri0-color, Sable Merle",
        ],
        [
          "Saluki",
          12,
          14,
          "saluki",
          "Coursing gazelle and hare, Hound Group",
          "Childrens",
          "Moderate",
          "12-14 years",
          "23-28 inches",
          "18-27 kg",
          "Aloof, Intelligent, Quiet, Reserved",
          "No",
          "White, Cream, Gold, Tan, Red",
        ],
        [
          "Samoyed",
          12,
          14,
          "samoyed_huskey",
          "Working Dogs",
          "Families",
          "Medium",
          "12 – 13 years",
          "48 – 60 cm",
          "20–30 kg",
          "Playful, Stubborn, Lively, Alert, Friendly, Sociable",
          "Yes",
          "White, Cream",
        ],
        [
          "Schipperke",
          13,
          15,
          "default",
          "Coursing deer, Non-Sporting Group",
          "Childrens and Families",
          "Low",
          "13-15 years",
          "28-33 cm",
          "3-9 kg",
          "Curious, Fearless, Agile, Confident",
          "No",
          "Black, Apricot, Chocolate, Cream",
        ],
        [
          "Scottish Deerhound",
          8,
          11,
          "default",
          "Coursing deer, Hound Group",
          "Older Childrens",
          "Low",
          "8-11 years",
          "30-32 inches",
          "40-50 kg",
          "Dignified, Docile, Gentle, Friendly",
          "No",
          "Brindle, Fawn, Red Fawn, Grey",
        ],
        [
          "Scottish Terrier",
          12,
          15,
          "scottish_terrier",
          "Terrier Dogs",
          "Families with older children, singles",
          "Medium",
          "11-13 years",
          "up to 25 cm",
          "8-10 kg",
          "Independent, Intelligent",
          "No",
          "Dark grey, bringle, black, brown, near-white, blonde",
        ],
        [
          "Sealyham Terrier",
          12,
          14,
          "sealyham_terrier",
          "Terrier Group",
          "Families, older Childrens",
          "Low",
          "12-14 years",
          "28-30 cm",
          "8-9 kg",
          "Even Tempered, Fearless, Alert, Friendly",
          "Yes",
          "White, White & Chocolate, Badger & White",
        ],
        [
          "Shar Pei",
          9,
          11,
          "shar_pei",
          "Working Dogs",
          "Families with older children",
          "Medium",
          "9-11 years",
          "45-51 cm",
          "25-29 kg",
          "Active, independent, happy",
          "No",
          "Black, red, Red-fawn, fawn, black-pointed cream, blue, sable",
        ],
        [
          "Shetland Sheepdog",
          12,
          13,
          "shetland_sheepdog",
          "Herding Dogs",
          "Families",
          "Medium-High",
          "12-14 years",
          "33-41 cm",
          "8-12 kg",
          "Active, Loyal, Independent, Happy",
          "No",
          "Blue Merle, Sable, Tri-colour",
        ],
        [
          "Shiba Inu",
          12,
          15,
          "shiba_inu",
          "Non-Sporting Group",
          "Families",
          "Low",
          "12-15 years",
          "35-43 cm",
          "8-10 kg",
          "Charming, Keen, Confident, Fearless",
          "No",
          "Red Sesame, Black Sesame, Black & Tan",
        ],
        [
          "Shih Tzu",
          10,
          16,
          "shih_tzu",
          "Companion Dogs",
          "Families",
          "Medium-High",
          "10-16 years",
          "20.3-27.9 cm",
          "4-7.5 kg",
          "Intelligent",
          "No",
          "Black, Brown, Gold, Grey and Mixture",
        ],
        [
          "Siberian Huskie",
          12,
          15,
          "siberian_husky",
          "Working Dogs",
          "Singles, families with older children",
          "Medium",
          "12 to 15 years",
          "54–60 cm",
          "18–25 kg",
          "Intelligent, Alert,Outgoing, Gentle, Friendly",
          "No",
          "Black, Agouti, Sable, Piebald, Black & Tan, Grey, Black & White, Splash, Brown, Red, Silver, Copper",
        ],
        [
          "Skye Terrier",
          12,
          15,
          "skye_terrier",
          "Vermin hunting, Terrier group",
          "Families, Childrens and Strangers",
          "Moderate",
          "12-15 years",
          "24-25 cm",
          "16-18 kg",
          "Good-Tempered, Friendly, Loyal, Intelligent",
          "No",
          "Black, Fawn, Blue, Light Grey",
        ],
        [
          "Smooth Fox Terrier",
          12,
          15,
          "smooth_fox_terrier",
          "Fox bolting, Terrier Group",
          "Families",
          "High",
          "12-15 years",
          "36-41 cm",
          "6.8-8.6 kg",
          "Playful, Fearless, Affectionate, Active",
          "No",
          "White, White & Tan, Black & White, Tri-color",
        ],
        [
          "Spinone Italiano",
          12,
          14,
          "default",
          "Sporting Group",
          "Families and Childrens",
          "Low",
          "12-14 years",
          "60-70 cm",
          "34-39 kg",
          "Patient, Docile, Friendly, Gentle",
          "No",
          "Orange & White, Orange Roan, Brown Roan",
        ],
        [
          "St. Bernard",
          8,
          10,
          "saint_bernard",
          "Working Group",
          "Families",
          "High",
          "8-10 years",
          "70-90 cm",
          "64-82 kg",
          "Friendly, Gentle, Loyal, Calm",
          "No",
          "Red & White, Brownish-yellow, Reddish-brown-Mantle",
        ],
        [
          "Staffordshire Bull Terrier",
          12,
          14,
          "default",
          "Bull Terrier",
          "Childrens and Families",
          "Low",
          "12-14 years",
          "36-41 cm",
          "12-17 kg",
          "Fearless, Reliable, Courageous, Loyal, Bold",
          "No",
          "Black, White, Brindle, Fawn & White",
        ],
        [
          "Standard Schnauzer",
          12,
          14,
          "standard_schnnauzer",
          "Working Group, Ratting, guarding",
          "Childrens",
          "High",
          "13-16 years",
          "47-50 cm",
          "14-20 kg",
          "Trainable, Devoted, Good-natured, Lively",
          "Yes",
          "Black, Salt & Pepper",
        ],
        [
          "Sussex Spaniel",
          12,
          15,
          "default",
          "Sporting Group",
          "Families",
          "High",
          "12-15 years",
          "38-41 cm",
          "16-20 kg",
          "Cheerful, Devoted, Calm, Friendly",
          "No",
          "Golden Liver",
        ],
        [
          "Swedish Vallhund",
          12,
          14,
          "swedish_vallhund",
          "Herding Group",
          "Kids, Families and Strangers",
          "Low",
          "12-15 years",
          "32-34 cm",
          "9-14 kg",
          "Intelligent, Watchful, Fearless, Alert",
          "No",
          "Greyish Brown, Mahogany, Blue, Greyish Yellow",
        ],
        [
          "Tibetan Mastiff",
          10,
          12,
          "tibetian_mastiff",
          "Working Group",
          "Childrens",
          "Moderate",
          "12-15 years",
          "66-76 cm",
          "41-68 kg",
          "Stubborn, Active, Strong Willed, Intelligent",
          "No",
          "Black, Brown & Tan, Blue Grey",
        ],
        [
          "Tibetan Spaniel",
          12,
          15,
          "tibetan_spaniel",
          "Non-Sporting Group, Watchdog",
          "Childrens",
          "Moderate",
          "12-15 years",
          "9-10 inches",
          "4.1-6.8 kg",
          "Assertive, Willful, Intelligent, Playful",
          "No",
          "Sable, Black, White, Red, Black & Tan",
        ],
        [
          "Tibetan Terrier",
          12,
          15,
          "tibetan_terrier",
          "Non-Sporting Group",
          "Families",
          "Moderate",
          "12-15 years",
          "14-16 inches",
          "8-14 kg",
          "Amiable, Energetic, Reserved, Sensitive, Gentle",
          "Yes",
          "Piebald, Black, White, Brindle, Tri-color",
        ],
        [
          "Toy Fox Terrier",
          13,
          14,
          "toy_fox_terrier",
          "Terrier Group, Toy Dog",
          "Small Childrens",
          "Low",
          "13-14 years",
          "8.5-11.5 inches",
          "3.5-7 pounds",
          "Intelligent, Spirited, Loyal, Friendly, Playful",
          "No",
          "White & chocolate, White & Tan, Tri-color",
        ],
        [
          "Treeing Walker Coonhound",
          12,
          13,
          "default",
          "Foundation Stock Service Program, Hunters",
          "Childrens",
          "Low",
          "12-13 years",
          "56-69 cm",
          "23-32 kg",
          "Trainable, Confident, Affectionate, Clever",
          "No",
          "Black, White, Tri-color",
        ],
        [
          "Tervuren",
          12,
          14,
          "default",
          "Herding Group",
          "Childrens",
          "Low",
          "12-14 years",
          "60-66 cm",
          "25-29 kg",
          "Attentive, Loyal, Active, Protective",
          "No",
          "Black, Black & Cream, Fawn & Black, Brindle",
        ],
        [
          "Vizsla",
          12,
          15,
          "vizsla",
          "Sporting Group, Pointing and trailing",
          "Families and small Children",
          "High",
          "12-15 years",
          "56-64 cm",
          "20-30 kg",
          "Quiet, Energetic, Loyal, Affectionate",
          "No",
          "Golden Rust, Red Golden, Golden",
        ],
        [
          "Weimaraner",
          10,
          12,
          "weimaraner",
          "Sporting Dogs",
          "Families",
          "Medium",
          "10 – 12 years",
          "64 – 69 cm",
          "32 – 36 kgs",
          "Stubborn, Intelligent, Aloof, Alert, Energetic, Steady, Fast, Powerful",
          "No",
          "Mouse-gray, Silver, Silver-gray",
        ],
        [
          "Welsh Springer Spaniel",
          12,
          15,
          "default",
          "Flushing and retrieving birds, Sporting Group",
          "Families and strangers",
          "Moderate",
          "12-15 years",
          "46-48 cm",
          "16-20 kg",
          "Active, Stubborn, Playful, Loyal",
          "No",
          "White & Red",
        ],
        [
          "Welsh Terrier",
          12,
          15,
          "welsh_terrier",
          "Terrier Dogs",
          "Families & Singles",
          "Low",
          "10 to 14 years",
          "30 – 40 cm",
          "upto 9kg",
          "Intelligent, Alert, Friendly, Spirited",
          "Yes",
          "Black & Tan, Grizzle & Tan",
        ],
        [
          "West Highland White Terrier",
          12,
          16,
          "west_highland_white_terrier",
          "Terrier Group",
          "Families and Children",
          "Low",
          "12-16 years",
          "25-30 cm",
          "6.8-9.1 kg",
          "Intelligent, Courageous, Active, Alert, Loyal",
          "Yes",
          "Pink, Red, Blue, Black, White",
        ],
        [
          "Whippet",
          12,
          15,
          "whippet",
          "Hound Dogs",
          "Families",
          "Medium",
          "12-15 years",
          "47 – 56 cm",
          "10 to 13 kgs",
          "Lively, Quiet, Friendly",
          "No",
          "Black, Brindle, White, Fawn",
        ],
        [
          "Wire Hair Fox Terrier",
          13,
          14,
          "default",
          "Terrier Group",
          "Families and young Children",
          "High",
          "13-14 years",
          "36-41 cm",
          "7-9.5 kg",
          "Keen, Fearless, Active, Bold",
          "Yes",
          "White, White & Tan, Black & White, Tricolor",
        ],
        [
          "Wirehaired Pointing Griffon",
          10,
          12,
          "default",
          "Sporting Group",
          "Children",
          "High",
          "10-12 years",
          "55-60 cm",
          "23-27 kg",
          "Proud, Trainable, Vigilant, Loyal",
          "Yes",
          ";Grey & Tan, White & Chocolate, Chestnut, Liver",
        ],
        [
          "Xoloitzcuintle ",
          12,
          15,
          "xoloitzcuintli",
          "Non-Sporting Group",
          "Families",
          "Moderate",
          "12-15 years",
          "10-14 inches",
          "4-25 kg",
          "Aloof, Cheerful, Active, Calm",
          "Yes",
          "Black, Dark Brown, Brindle, Cooper & White",
        ],
        [
          "Yorkshire Terrier",
          13,
          16,
          "yorkshire_terrier",
          "Companion Dogs",
          "Families, Singles",
          "Low-Medium",
          "12-15 years",
          "15-17.5 cm",
          "Up to 3.2 kg",
          "Loyal, Active",
          "Yes, medium shedding",
          "Blue and tan",
        ],
      ];

      const data = breeds[parseInt(dogBreed1) - 1];

      const firstYearAge = tech_a;
      const secondYearAge = tech_b;
      const restHumanAge = tech_c;
      const dogAverageAge = (data[1] + data[2]) / 2;

      let dogHumanAge = 0;
      if (tech_dogAge > 2) {
        dogHumanAge =
          firstYearAge +
          secondYearAge +
          (tech_dogAge - 2) * (restHumanAge / (dogAverageAge - 2));
      } else if (tech_dogAge > 1) {
        dogHumanAge = firstYearAge + (tech_dogAge - 1) * secondYearAge;
      } else {
        dogHumanAge = tech_dogAge * firstYearAge;
      }

      let type = "";
      if (dogHumanAge > 44) {
        type = " a Senior dog";
      } else if (dogHumanAge > 18) {
        type = " an Adult dog";
      } else {
        type = " a Puppy dog";
      }

      param = {
        tech_dogHumanAge: dogHumanAge,
        tech_type: type,
        tech_data: data,
        tech_name: data[0],
        tech_dogAge: tech_dogAge,
        tech_a: tech_a,
        tech_b: tech_b,
        tech_c: tech_c,
        tech_images: data[3],
        tech_f1: data[4],
        tech_f2: data[5],
        tech_f3: data[6],
        tech_f4: data[7],
        tech_f5: data[8],
        tech_f6: data[9],
        tech_f7: data[10],
        tech_f8: data[11],
        tech_f9: data[12],
      };
    }

    param.tech_operations = tech_operations;
    return param;
  }

  /**
   * getCalculationDogCreateSizeCalculator: Service Method
   * POST: /api/calculators-lol/dog-crate-size-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationDogCreateSizeCalculator(body) {
    const extraLength = parseFloat(body.tech_extra_lenght?.toString().trim());
    let dogHeight = parseFloat(body.tech_height?.toString().trim());
    let dogHeightUnit = body.tech_h_units?.toString().trim();
    let dogLength = parseFloat(body.tech_length?.toString().trim());
    let dogLengthUnit = body.tech_l_units?.toString().trim();

    const result = {};

    function convertToCm(value, unit) {
      if (unit === "m") {
        return value * 100;
      } else if (unit === "in") {
        return value * 2.54;
      } else if (unit === "ft") {
        return value * 30.48;
      }
      return value;
    }

    if (!isNaN(dogHeight) && !isNaN(dogLength)) {
      if (dogLengthUnit) {
        dogLength = convertToCm(dogLength, dogLengthUnit);
      }
      if (dogHeightUnit) {
        dogHeight = convertToCm(dogHeight, dogHeightUnit);
      }

      const crateHeight = dogHeight + extraLength;
      const crateLength = dogLength + extraLength;

      result.tech_c_height = crateHeight;
      result.tech_c_lenght = crateLength;
      result.success = true;
    } else {
      result.error = "Please! Check your inputs.";
      result.success = false;
    }

    return result;
  }

  /**
   * getCalculationDogFoodCalculator: Service Method
   * POST: /api/calculators-lol/dog-food-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationDogFoodCalculator(body) {
    const result = {};
    const dogType = body.tech_type_unit?.trim();
    let dogWeight = parseFloat(body.tech_weight);
    const weightUnit = body.tech_weight_unit?.trim();

    if (isNaN(dogWeight) || dogWeight <= 0) {
      result.error =
        "The 's weight must be a numeric value greater than zero. 🐕‍🦺";
      return result;
    }

    // Convert weight to kilograms
    switch (weightUnit) {
      case "g":
        dogWeight = dogWeight / 1000;
        break;
      case "dag":
        dogWeight = dogWeight / 100;
        break;
      case "kg":
        break; // already in kg
      case "lb":
        dogWeight = dogWeight / 2.20462;
        break;
      default:
        result.error = "Invalid weight unit";
        return result;
    }

    // Calculate Resting Energy Requirement
    const RER = 70 * Math.pow(dogWeight, 0.75);

    // Map dog type to multiplication factor
    const factorMap = {
      "Puppy - 0 to 4 months": 3.0,
      "Puppy - 4 months to adult": 2.0,
      "Dog - inactive or obese prone": 1.2,
      "Dog (neutered/spayed) - average activity": 1.6,
      "Dog (intact) - average activity": 1.8,
      "Dog - weight loss needed": 1.0,
      "Dog - weight gain needed": 1.7,
      "Working dog - light work": 2.0,
      "Working dog - moderate work": 3.0,
      "Working dog - heavy work": 5.0,
      "Senior dog": 1.1,
    };

    // Check if dogType exists in the map
    const factor = factorMap[dogType];
    if (typeof factor === "undefined") {
      result.error = "Unsupported dog type. Kindly select a valid option.🐶";
      return result;
    }

    const answer = RER * factor;

    result.payload = {
      tech_answer: parseFloat(answer.toFixed(2)),
    };

    return result;
  }
}

module.exports = new CalculatorsServices();
