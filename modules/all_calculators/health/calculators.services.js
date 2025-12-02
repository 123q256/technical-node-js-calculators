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
   * getCalculationWeightlossCalculator: Service Method
   * POST: /api/calculators-lol/weightloss-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationWeightlossCalculator(body) {
    // Extract request data
    const submit = body.tech_unit;
    const gender = body.tech_gender;
    const age = body.tech_age;
    const height_ft = body.tech_height_ft;
    const height_in = body.tech_height_in;
    const height_cm = body.tech_height_cm;
    const hightUnit = body.tech_hightUnit;
    const weight = body.tech_weight;
    const lose_w = body.tech_lose_w;
    const lose_unit = body.tech_lose_unit;
    const activity = body.tech_activity;
    const weight_unit = body.tech_unit;
    const start = body.tech_start;
    const end = body.tech_target;
    const choose = body.tech_choose;
    const enter_calories = body.tech_enter_calories;

    const all_activites = [
      [
        2.3,
        "Activity promoting video game (e.g., Wii Fit), light effort (e.g., balance, yoga)",
        "Activity promoting video game",
      ],
      [
        3.8,
        "Activity promoting video game (e.g., Wii Fit), moderate effort (e.g., aerobic, resistance)",
        "Activity promoting video game",
      ],
      [
        7.2,
        "Activity promoting video/arcade game (e.g., Exergaming, Dance Dance Revolution), vigorous effort",
        "Activity promoting video game",
      ],
      [10.0, "Aerobic dance wearing 10-15 lb weights", "aerobics"],
      [7.3, "Aerobic, general", "aerobics"],
      [7.3, "Aerobic, high impact", "aerobics"],
      [5.0, "Aerobic, low impact", "aerobics"],
      [9.5, "Aerobic, step, with 10 - 12 inch step", "aerobics"],
      [5.5, "Aerobic, step, with 4-inch step", "aerobics"],
      [7.5, "Aerobic, step, with 6 - 8 inch step", "aerobics"],
      [
        5.5,
        "Alaska Native Games, Eskimo Olympics, general",
        "Alaska Native Games",
      ],
      [5.5, "Anishinaabe Jingle Dancing", "Anishinaabe Jingle Dancing"],
      [4.3, "Archery, non-hunting", "Archery"],
      [
        5.0,
        "Army type obstacle course exercise, boot camp training program",
        "Army type obstacle course exercise",
      ],
      [8.5, "Auto racing, open wheel", "Auto racing"],
      [
        2.5,
        "Automobile or light truck (not a semi) driving",
        "Automobile or light truck driving",
      ],
      [7.0, "Backpacking (Taylor Code 050)", "Backpacking"],
      [
        7.8,
        "Backpacking, hiking or organized walking with a daypack",
        "Backpacking",
      ],
      [7.0, "Badminton, competitive (Taylor Code 450)", "Badminton"],
      [5.5, "Badminton, social singles and doubles, general", "Badminton"],
      [
        5.0,
        "Ballet, modern, or jazz, general, rehearsal or class",
        "Ballet, modern, or jazz",
      ],
      [
        6.8,
        "Ballet, modern, or jazz, performance, vigorous effort",
        "Ballet, modern, or jazz",
      ],
      [11.3, "Ballroom dancing, competitive, general", "Ballroom"],
      [5.5, "Ballroom, fast (Taylor Code 125)", "Ballroom"],
      [
        3.0,
        "Ballroom, slow (e.g., waltz, foxtrot, slow dancing, samba, tango, 19th century dance, mambo, cha cha)",
        "Ballroom",
      ],
      [9.3, "Basketball, drills, practice", "Basketball"],
      [8.0, "Basketball, game (Taylor Code 490)", "Basketball"],
      [6.5, "Basketball, general", "Basketball"],
      [6.0, "Basketball, non-game, general (Taylor Code 480)", "Basketball"],
      [7.0, "Basketball, officiating (Taylor Code 500)", "Basketball"],
      [4.5, "Basketball, shooting baskets", "Basketball"],
      [7.8, "Basketball, wheelchair", "Basketball"],
      [8.5, "Bench step class, general", "Bench step class"],
      [6.8, "Bicycling, 10-11.9 mph, leisure, slow, light effort", "Bicycling"],
      [
        8.5,
        "Bicycling, 12 mph, seated, hands on brake hoods or bar drops, 80 rpm",
        "Bicycling",
      ],
      [
        9.0,
        "Bicycling, 12 mph, standing, hands on brake hoods, 60 rpm",
        "Bicycling",
      ],
      [8.0, "Bicycling, 12-13.9 mph, leisure, moderate effort", "Bicycling"],
      [
        10.0,
        "Bicycling, 14-15.9 mph, racing or leisure, fast, vigorous effort",
        "Bicycling",
      ],
      [
        12.0,
        "Bicycling, 16-19 mph, racing/not drafting or > 19 mph drafting, very fast, racing general",
        "Bicycling",
      ],
      [
        4.0,
        "Bicycling, <10 mph, leisure, to work or for pleasure (Taylor Code 115)",
        "Bicycling",
      ],
      [15.8, "Bicycling, > 20 mph, racing, not drafting", "Bicycling"],
      [8.5, "Bicycling, BMX", "Bicycling"],
      [7.5, "Bicycling, general", "Bicycling"],
      [3.5, "Bicycling, leisure, 5.5 mph", "Bicycling"],
      [5.8, "Bicycling, leisure, 9.4 mph", "Bicycling"],
      [16.0, "Bicycling, mountain, competitive, racing", "Bicycling"],
      [8.5, "Bicycling, mountain, general", "Bicycling"],
      [14.0, "Bicycling, mountain, uphill, vigorous", "Bicycling"],
      [5.8, "Bicycling, on dirt or farm road, moderate pace", "Bicycling"],
      [
        8.8,
        "Bicycling, stationary, 101-160 watts, vigorous effort",
        "Bicycling",
      ],
      [
        11.0,
        "Bicycling, stationary, 161-200 watts, vigorous effort",
        "Bicycling",
      ],
      [
        14.0,
        "Bicycling, stationary, 201-270 watts, very vigorous effort",
        "Bicycling",
      ],
      [
        3.5,
        "Bicycling, stationary, 30-50 watts, very light to light effort",
        "Bicycling",
      ],
      [
        4.8,
        "Bicycling, stationary, 51-89 watts, light-to-moderate effort",
        "Bicycling",
      ],
      [
        6.8,
        "Bicycling, stationary, 90-100 watts, moderate to vigorous effort",
        "Bicycling",
      ],
      [7.0, "Bicycling, stationary, general", "Bicycling"],
      [8.5, "Bicycling, stationary, RPM/Spin bike class", "Bicycling"],
      [6.8, "Bicycling, to/from work, self selected pace", "Bicycling"],
      [2.5, "Billiards", "Billiards"],
      [2.5, "Bird watching, slow walk", "Bird watching"],
      [2.5, "Boating, power, driving", "Boating"],
      [1.3, "Boating, power, passenger, light", "Boating"],
      [3.0, "Bowling (Taylor Code 390)", "Bowling"],
      [3.8, "Bowling, indoor, bowling alley", "Bowling"],
      [12.8, "Boxing, in ring, general", "Boxing"],
      [5.5, "Boxing, punching bag", "Boxing"],
      [7.8, "Boxing, sparring", "Boxing"],
      [7.0, "Broomball", "Broomball"],
      [
        8.0,
        "Calisthenics (e.g., push ups, sit ups, pull-ups, jumping jacks), vigorous effort",
        "Calisthenics",
      ],
      [
        3.8,
        "Calisthenics (e.g., push ups, sit ups, pull-ups, lunges), moderate effort",
        "Calisthenics",
      ],
      [
        2.8,
        "Calisthenics (e.g., situps, abdominal crunches), light effort",
        "Calisthenics",
      ],
      [
        3.5,
        "Calisthenics, light or moderate effort, general (e.g., back exercises), going up & down from floor (Taylor Code 150)",
        "Calisthenics",
      ],
      [
        3.3,
        "Canoeing, harvesting wild rice, knocking rice off the stalks",
        "Canoeing",
      ],
      [4.0, "Canoeing, on camping trip (Taylor Code 270)", "Canoeing"],
      [7.0, "Canoeing, portaging", "Canoeing"],
      [2.8, "Canoeing, rowing, 2.0-3.9 mph, light effort", "Canoeing"],
      [5.8, "Canoeing, rowing, 4.0-5.9 mph, moderate effort", "Canoeing"],
      [
        3.5,
        "Canoeing, rowing, for pleasure, general (Taylor Code 250)",
        "Canoeing",
      ],
      [
        12.0,
        "Canoeing, rowing, in competition, or crew or sculling (Taylor Code 260)",
        "Canoeing",
      ],
      [
        12.5,
        "Canoeing, rowing, kayaking, competition, >6 mph, vigorous effort",
        "Canoeing",
      ],
      [
        3.5,
        "Caribbean dance (Abakua, Beguine, Bellair, Bongo, Brukin's, Caribbean Quadrills, Dinki Mini, Gere, Gumbay, Ibo, Jonkonnu, Kumina, Oreisha, Jambu)",
        "0",
      ],
      [5.0, "Carrying 1 to 15 lb load, upstairs", "Carrying"],
      [2.3, "Carrying 15 lb child, slow walking", "Carrying"],
      [
        5.0,
        "Carrying 15 pound load (e.g. suitcase), level ground or downstairs",
        "Carrying",
      ],
      [6.0, "Carrying 16 to 24 lb load, upstairs", "Carrying"],
      [8.0, "Carrying 25 to 49 lb load, upstairs", "Carrying"],
      [10.0, "Carrying 50 to 74 lb load, upstairs", "Carrying"],
      [12.0, "Carrying > 74 lb load, upstairs", "Carrying"],
      [8.3, "Carrying load upstairs, general", "Carrying"],
      [6.0, "Cheerleading, gymnastic moves, competitive", "Cheerleading"],
      [
        5.8,
        "Children's games, adults playing (e.g., hopscotch, 4-square, dodgeball, playground apparatus, t-ball, tetherball, marbles, arcade games), moderate effort",
        "Childrens games",
      ],
      [
        8.0,
        "Circuit training, including kettlebells, some aerobic movement with minimal rest, general, vigorous intensity",
        "Circuit training",
      ],
      [4.3, "Circuit training, moderate effort", "Circuit training"],
      [6.5, "Climbing hills with 0 to 9 lb load", "Climbing"],
      [7.3, "Climbing hills with 10 to 20 lb load", "Climbing"],
      [8.3, "Climbing hills with 21 to 42 lb load", "Climbing"],
      [9.0, "Climbing hills with 42+ lb load", "Climbing"],
      [6.3, "Climbing hills, no load", "Climbing"],
      [8.0, "Coaching, actively playing sport with players", "Coaching"],
      [
        4.0,
        "Coaching, football, soccer, basketball, baseball, swimming, etc.",
        "Coaching",
      ],
      [4.8, "Cricket, batting, bowling, fielding", "Cricket"],
      [3.3, "Croquet", "Croquet"],
      [4.0, "Curling", "Curling"],
      [3.5, "Curves(TM) Eexercise routines in women", "Curves"],
      [2.5, "Darts, wall or lawn", "Darts"],
      [3.5, "Descending stairs", "Descending"],
      [3.0, "Diving, springboard or platform", "Diving"],
      [7.5, "Dog sledding, mushing", "Dog sledding"],
      [2.5, "Dog sledding, passenger", "Dog sledding"],
      [6.0, "Drag racing, pushing or driving a car", "Drag racing"],
      [5.0, "Elliptical trainer, moderate effort", "Elliptical trainer"],
      [
        4.5,
        "Ethnic or cultural dancing (e.g., Greek, Middle Eastern, hula, salsa, merengue, bamba y plena, flamenco, belly, and swing)",
        "Ethnic",
      ],
      [6.0, "Fencing", "Fencing"],
      [1.8, "Flying airplane or helicopter", "Flying airplane"],
      [2.5, "Football or baseball, playing catch", "Football"],
      [8.0, "Football, competitive", "Football"],
      [8.0, "Football, touch, flag, general (Taylor Code 510)", "Football"],
      [4.0, "Football, touch, flag, light effort", "Football"],
      [3.0, "Frisbee playing, general", "Frisbee"],
      [8.0, "Frisbee, ultimate", "Frisbee"],
      [
        7.8,
        "General dancing (e.g., disco, folk, Irish step dancing, line dancing, polka, contra, country)",
        "General dancing",
      ],
      [4.8, "Golf, general", "Golf"],
      [3.0, "Golf, miniature, driving range", "Golf"],
      [3.5, "Golf, using power cart (Taylor Code 070)", "Golf"],
      [4.3, "Golf, walking, carrying clubs", "Golf"],
      [5.3, "Golf, walking, pulling clubs", "Golf"],
      [3.8, "Gymnastics, general", "Gymnastics"],
      [4.0, "Hacky sack", "Hacky sack"],
      [12.0, "Handball, general (Taylor Code 520)", "Handball"],
      [8.0, "Handball, team", "Handball"],
      [3.5, "Hang gliding", "Hang gliding"],
      [
        5.0,
        "Health club exercise classes, general, gym/weight training combined in one visit",
        "Health club",
      ],
      [7.8, "Health club exercise, conditioning classes", "Health club"],
      [5.5, "Health club exercise, general (Taylor Code 160)", "Health club"],
      [4.0, "High ropes course, multiple elements", "High ropes course"],
      [
        5.3,
        "Hiking or walking at a normal pace through fields and hillsides",
        "Hiking",
      ],
      [6.0, "Hiking, cross country (Taylor Code 040)", "Hiking"],
      [7.8, "Hockey, field", "Hockey"],
      [10.0, "Hockey, ice, competitive", "Hockey"],
      [8.0, "Hockey, ice, general", "Hockey"],
      [3.8, "Home exercise, general", "Home exercise"],
      [1.8, "Horse cart, driving, standing or sitting", "Horse cart"],
      [
        4.3,
        "Horse chores, feeding, watering, cleaning stalls, implied walking and lifting loads",
        "Horse chores",
      ],
      [7.3, "Horseback riding, canter or gallop", "Horseback riding"],
      [5.5, "Horseback riding, general", "Horseback riding"],
      [9.0, "Horseback riding, jumping", "Horseback riding"],
      [5.8, "Horseback riding, trotting", "Horseback riding"],
      [3.8, "Horseback riding,walking", "Horseback riding"],
      [3.0, "Horseshoe pitching, quoits", "Horseshoe pitching"],
      [2.0, "Ice fishing, sitting", "Ice fishing"],
      [12.0, "Jai alai", "Jai alai"],
      [7.0, "Jet skiing, driving, in water", "Jet skiing"],
      [
        6.0,
        "Jog/walk combination (jogging component of less than 10 minutes) (Taylor Code 180)",
        "walk combination",
      ],
      [7.0, "Jogging, general", "Jogging"],
      [8.0, "Jogging, in place", "Jogging"],
      [4.5, "Jogging, on a mini-tramp", "Jogging"],
      [4.0, "Juggling", "Juggling"],
      [5.0, "Kayaking, moderate effort", "Kayaking"],
      [7.0, "Kickball", "Kickball"],
      [8.0, "Lacrosse", "Lacrosse"],
      [3.3, "Lawn bowling, bocce ball, outdoor", "Lawn bowling"],
      [3.5, "Loading /unloading a car, implied walking", "unloading a car"],
      [8.0, "Marching rapidly, military, no pack", "Marching rapidly"],
      [4.5, "Marching, moderate speed, military, no pack", "Marching"],
      [
        10.3,
        "Martial arts, different types, moderate pace (e.g., judo, jujitsu, karate, kick boxing, tae kwan do, tai-bo, Muay Thai boxing)",
        "Martial arts",
      ],
      [
        5.3,
        "Martial arts, different types, slower pace, novice performers, practice",
        "Martial arts",
      ],
      [
        4.0,
        "Moto-cross, off-road motor sports, all-terrain vehicle, general",
        "Moto-cross",
      ],
      [3.5, "Motor scooter, motorcycle", "Motor scooter"],
      [6.0, "Moving ice house, set up/drill holes", "Moving ice house"],
      [9.0, "Orienteering", "Orienteering"],
      [6.0, "Paddle boarding, standing", "Paddle boarding"],
      [4.0, "Paddle boat", "Paddle boat"],
      [6.0, "Paddleball, casual, general (Taylor Code 460)", "Paddleball"],
      [10.0, "Paddleball, competitive", "Paddleball"],
      [3.0, "Pilates, general", "Pilates"],
      [8.0, "Polo, on horseback", "Polo"],
      [6.3, "Pulling rickshaw", "Pulling rickshaw"],
      [3.8, "Pushing a wheelchair, non-occupational", "Pushing a wheelchair"],
      [
        4.0,
        "Pushing or pulling stroller with child or walking with children, 2.5 to 3.1 mph",
        "Pushing",
      ],
      [
        6.0,
        "Pushing plane in and out of hangar",
        "Pushing plane in and out of hangar",
      ],
      [6.5, "Race walking", "Race walking"],
      [10.0, "Racquetball, competitive", "Racquetball"],
      [7.0, "Racquetball, general (Taylor Code 470)", "Racquetball"],
      [
        3.5,
        "Resistance (weight) training, multiple exercises, 8-15 repetitions at varied resistance",
        "Resistance",
      ],
      [
        5.0,
        "Resistance (weight) training, squats , slow or explosive effort",
        "Resistance",
      ],
      [
        6.0,
        "Resistance training (weight lifting, free weight, nautilus or universal), power lifting or body building, vigorous effort (Taylor Code 210)",
        "Resistance",
      ],
      [1.3, "Riding in a bus or train", "Riding in a bus or train"],
      [1.3, "Riding in a car or truck", "Riding in a car or truck"],
      [
        5.8,
        "Rock climbing, ascending or traversing rock, low-to-moderate difficulty",
        "Rock climbing",
      ],
      [7.5, "Rock climbing, ascending rock, high difficulty", "Rock climbing"],
      [5.0, "Rock climbing, rappelling", "Rock climbing"],
      [
        8.0,
        "Rock or mountain climbing (Taylor Code 470) (Formerly code = 17120)",
        "Rock or mountain climbing",
      ],
      [4.0, "Rodeo sports, general, light effort", "Rodeo sports"],
      [5.5, "Rodeo sports, general, moderate effort", "Rodeo sports"],
      [7.0, "Rodeo sports, general, vigorous effort", "Rodeo sports"],
      [
        7.5,
        "Rollerblading, in-line skating, 14.4 km/h (9.0 mph), recreational pace",
        "Rollerblading",
      ],
      [
        9.8,
        "Rollerblading, in-line skating, 17.7 km/h (11.0 mph), moderate pace, exercise training",
        "Rollerblading",
      ],
      [
        12.3,
        "Rollerblading, in-line skating, 21.0 to 21.7 km/h (13.0 to 13.6 mph), fast pace, exercise training",
        "Rollerblading",
      ],
      [
        14.0,
        "Rollerblading, in-line skating, 24.0 km/h (15.0 mph), maximal effort",
        "Rollerblading",
      ],
      [12.3, "Rope jumping, fast pace, 120-160 skips/min", "Rope jumping"],
      [
        11.8,
        "Rope jumping, moderate pace, 100-120 skips/min, general, 2 foot skip, plain bounce",
        "Rope jumping",
      ],
      [
        8.8,
        "Rope jumping, slow pace, < 100 skips/min, 2 foot skip, rhythm bounce",
        "Rope jumping",
      ],
      [12.3, "Rope skipping, general", "Rope skipping"],
      [6.0, "Rowing, stationary ergometer, general, vigorous effort", "Rowing"],
      [7.0, "Rowing, stationary, 100 watts, moderate effort", "Rowing"],
      [8.5, "Rowing, stationary, 150 watts, vigorous effort", "Rowing"],
      [12.0, "Rowing, stationary, 200 watts, very vigorous effort", "Rowing"],
      [4.8, "Rowing, stationary, general, moderate effort", "Rowing"],
      [6.3, "Rugby, touch, non-competitive", "Rugby"],
      [8.3, "Rugby, union, team, competitive", "Rugby"],
      [8.0, "Running, (Taylor code 200)", "Running"],
      [14.5, "Running, 10 mph (6 min/mile)", "Running"],
      [16.0, "Running, 11 mph (5.5 min/mile)", "Running"],
      [19.0, "Running, 12 mph (5 min/mile)", "Running"],
      [19.8, "Running, 13 mph (4.6 min/mile)", "Running"],
      [23.0, "Running, 14 mph (4.3 min/mile)", "Running"],
      [6.0, "Running, 4 mph (13 min/mile)", "Running"],
      [8.3, "Running, 5 mph (12 min/mile)", "Running"],
      [9.0, "Running, 5.2 mph (11.5 min/mile)", "Running"],
      [9.8, "Running, 6 mph (10 min/mile)", "Running"],
      [10.5, "Running, 6.7 mph (9 min/mile)", "Running"],
      [11.0, "Running, 7 mph (8.5 min/mile)", "Running"],
      [11.5, "Running, 7.5 mph (8 min/mile)", "Running"],
      [11.8, "Running, 8 mph (7.5 min/mile)", "Running"],
      [12.3, "Running, 8.6 mph (7 min/mile)", "Running"],
      [12.8, "Running, 9 mph (6.5 min/mile)", "Running"],
      [9.0, "Running, cross country", "Running"],
      [13.3, "Running, marathon", "Running"],
      [10.0, "Running, on a track, team practice", "Running"],
      [15.0, "Running, stairs, up", "Running"],
      [
        8.0,
        "Running, training, pushing a wheelchair or baby carrier",
        "Running",
      ],
      [
        4.5,
        "Saddling, cleaning, grooming, harnessing and unharnessing horse",
        "Saddling",
      ],
      [
        3.0,
        "Sailing, boat and board sailing, windsurfing, ice sailing, general (Taylor Code 235)",
        "Sailing",
      ],
      [4.5, "Sailing, in competition", "Sailing"],
      [
        3.3,
        "Sailing, Sunfish/Laser/Hobby Cat, Keel boats, ocean sailing, yachting, leisure",
        "Sailing",
      ],
      [3.0, "Shuffleboard", "Shuffleboard"],
      [6.0, "Skateboarding, competitive, vigorous effort", "Skateboarding"],
      [5.0, "Skateboarding, general, moderate effort", "Skateboarding"],
      [7.0, "Skating, ice dancing", "Skating"],
      [5.5, "Skating, ice, 9 mph or less", "Skating"],
      [7.0, "Skating, ice, general (Taylor Code 360)", "Skating"],
      [
        9.0,
        "Skating, ice, rapidly, more than 9 mph, not competitive",
        "Skating",
      ],
      [7.0, "Skating, roller (Taylor Code 360)", "Skating"],
      [13.3, "Skating, speed, competitive", "Skating"],
      [7.0, "Ski jumping, climb up carrying skis", "Ski jumping"],
      [6.8, "Ski machine, general", "Ski machine"],
      [
        6.8,
        "Skiing, cross country, 2.5 mph, slow or light effort, ski walking",
        "Skiing",
      ],
      [
        9.0,
        "Skiing, cross country, 4.0-4.9 mph, moderate speed and effort, general",
        "Skiing",
      ],
      [
        12.5,
        "Skiing, cross country, 5.0-7.9 mph, brisk speed, vigorous effort",
        "Skiing",
      ],
      [15.0, "Skiing, cross country, >8.0 mph, elite skier, racing", "Skiing"],
      [
        15.5,
        "Skiing, cross country, hard snow, uphill, maximum, snow mountaineering",
        "Skiing",
      ],
      [13.5, "Skiing, cross-country, biathlon, skating technique", "Skiing"],
      [13.3, "Skiing, cross-country, skating", "Skiing"],
      [
        4.3,
        "Skiing, downhill, alpine or snowboarding, light effort, active time only",
        "Skiing",
      ],
      [
        5.3,
        "Skiing, downhill, alpine or snowboarding, moderate effort, general, active time only",
        "Skiing",
      ],
      [8.0, "Skiing, downhill, vigorous effort, racing", "Skiing"],
      [7.0, "Skiing, general", "Skiing"],
      [12.5, "Skiing, roller, elite racers", "Skiing"],
      [6.0, "Skiing, water or wakeboarding (Taylor Code 220)", "Skiing"],
      [15.8, "Skindiving, fast", "Skindiving"],
      [11.8, "Skindiving, moderate", "Skindiving"],
      [
        7.0,
        "Skindiving, scuba diving, general (Taylor Code 310)",
        "Skindiving",
      ],
      [3.5, "Skydiving, base jumping, bungee jumping", "Skindiving"],
      [
        7.0,
        "Sledding, tobogganing, bobsledding, luge (Taylor Code 370)",
        "Sledding",
      ],
      [11.0, "Slide board exercise, general", "Slide board exercise"],
      [6.0, "Slimnastics, Jazzercise", "Slimnastics"],
      [5.0, "Snorkeling (Taylor Code 310)", "Snorkeling"],
      [2.5, "Snow blower, walking and pushing", "Snow blower"],
      [5.3, "Snow shoeing, moderate effort", "Snow shoeing"],
      [10.0, "Snow shoeing, vigorous effort", "Snow shoeing"],
      [5.3, "Snow shoveling, by hand, moderate effort", "Snow shoveling"],
      [7.5, "Snow shoveling, by hand, vigorous effort", "Snow shoveling"],
      [3.5, "Snowmobiling, driving, moderate", "Snowmobiling"],
      [2.0, "Snowmobiling, passenger", "Snowmobiling"],
      [7.0, "Soccer, casual, general (Taylor Code 540)", "Soccer"],
      [10.0, "Soccer, competitive", "Soccer"],
      [
        5.0,
        "Softball or baseball, fast or slow pitch, general (Taylor Code 440)",
        "Softball",
      ],
      [4.0, "Softball, officiating", "Softball"],
      [4.0, "Softball, practice", "Softball"],
      [6.0, "Softball,pitching", "Softball"],
      [
        3.3,
        "Sports spectator, very excited, emotional, physically moving",
        "Sports spectator",
      ],
      [12.0, "Squash (Taylor Code 530)", "Squash"],
      [7.3, "Squash, general", "Squash"],
      [8.8, "Stair climbing, fast pace", "Stair climbing"],
      [4.0, "Stair climbing, slow pace", "Stair climbing"],
      [
        8.0,
        "Stair climbing, using or climbing up ladder (Taylor Code 030)",
        "Stair climbing",
      ],
      [9.0, "Stair-treadmill ergometer, general", "Stair-treadmill ergometer"],
      [2.3, "Stretching, mild", "Stretching"],
      [5.0, "Surfing, body or board, competitive", "Surfing"],
      [3.0, "Surfing, body or board, general", "Surfing"],
      [9.8, "Swimming laps, freestyle, fast, vigorous effort", "Swimming"],
      [
        5.8,
        "Swimming laps, freestyle, front crawl, slow, light or moderate effort",
        "Swimming",
      ],
      [
        9.5,
        "Swimming, backstroke, general, training or competition",
        "Swimming",
      ],
      [4.8, "Swimming, backstroke, recreational", "Swimming"],
      [
        10.3,
        "Swimming, breaststroke, general, training or competition",
        "Swimming",
      ],
      [5.3, "Swimming, breaststroke, recreational", "Swimming"],
      [13.8, "Swimming, butterfly, general", "Swimming"],
      [
        10.0,
        "Swimming, crawl, fast speed, ~75 yards/minute, vigorous effort",
        "Swimming",
      ],
      [
        8.3,
        "Swimming, crawl, medium speed, ~50 yards/minute, vigorous effort",
        "Swimming",
      ],
      [6.0, "Swimming, lake, ocean, river (Taylor Codes 280, 295)", "Swimming"],
      [6.0, "Swimming, leisurely, not lap swimming, general", "Swimming"],
      [7.0, "Swimming, sidestroke, general", "Swimming"],
      [8.0, "Swimming, synchronized", "Swimming"],
      [9.8, "Swimming, treading water, fast, vigorous effort", "Swimming"],
      [3.5, "Swimming, treading water, moderate effort, general", "Swimming"],
      [4.0, "Table tennis, ping pong (Taylor Code 410)", "Table tennis"],
      [3.0, "Tai chi, qi gong, general", "Tai chi"],
      [1.5, "Tai chi, qi gong, sitting, light effort", "Tai chi"],
      [4.8, "Tap", "Tap"],
      [
        6.8,
        "Teaching exercise class (e.g., aerobic, water)",
        "Teaching exercise class",
      ],
      [4.5, "Tennis, doubles", "Tennis"],
      [6.0, "Tennis, doubles (Taylor Code 430)", "Tennis"],
      [7.3, "Tennis, general", "Tennis"],
      [5.0, "Tennis, hitting balls, non-game play, moderate effort", "Tennis"],
      [8.0, "Tennis, singles (Taylor Code 420)", "Tennis"],
      [2.8, "Therapeutic exercise ball, Fitball exercise", "Therapeutic"],
      [
        6.0,
        "Track and field (e.g., high jump, long jump, triple jump, javelin, pole vault)",
        "Track and field",
      ],
      [
        4.0,
        "Track and field (e.g., shot, discus, hammer throw)",
        "Track and field",
      ],
      [
        10.0,
        "Track and field (e.g., steeplechase, hurdles)",
        "Track and field",
      ],
      [4.5, "Trampoline, competitive", "Trampoline"],
      [3.5, "Trampoline, recreational", "Trampoline"],
      [
        2.5,
        "Truck, semi, tractor, > 1 ton, or bus, driving",
        "Truck, semi, tractor",
      ],
      [2.3, "Tubing, floating on a river, general", "Tubing"],
      [5.0, "Unicycling", "Unicycling"],
      [2.8, "Upper body exercise, arm ergometer", "Upper body exercise"],
      [
        4.3,
        "Upper body exercise, stationary bicycle - Airdyne (arms only) 40 rpm, moderate",
        "Upper body exercise",
      ],
      [5.0, "Using crutches", "Using crutches"],
      [
        4.0,
        "Video exercise workouts, TV conditioning programs (e.g., cardio-resistance), moderate effort",
        "Video exercise",
      ],
      [
        6.0,
        "Video exercise workouts, TV conditioning programs (e.g., cardio-resistance), vigorous effort",
        "Video exercise",
      ],
      [
        2.3,
        "Video exercise workouts, TV conditioning programs (e.g., yoga, stretching), light effort",
        "Video exercise",
      ],
      [4.0, "Volleyball (Taylor Code 400)", "Volleyball"],
      [8.0, "Volleyball, beach, in sand", "Volleyball"],
      [6.0, "Volleyball, competitive, in gymnasium", "Volleyball"],
      [
        3.0,
        "Volleyball, non-competitive, 6 - 9 member team, general",
        "Volleyball",
      ],
      [3.5, "Walking for pleasure (Taylor Code 010)", "Walking"],
      [
        3.5,
        "Walking for transportation, 2.8-3.2 mph, level, moderate pace, firm surface",
        "Walking",
      ],
      [
        2.5,
        "Walking from house to car or bus, from car or bus to go places, from car or bus to and from the worksite",
        "Walking",
      ],
      [3.0, "Walking the dog", "Walking"],
      [
        2.5,
        "Walking to neighbor's house or family's house for social reasons",
        "Walking",
      ],
      [2.8, "Walking, 2.0 mph, level, slow pace, firm surface", "Walking"],
      [3.3, "Walking, 2.5 mph, downhill", "Walking"],
      [3.0, "Walking, 2.5 mph, level, firm surface", "Walking"],
      [
        3.5,
        "Walking, 2.8 to 3.2 mph, level, moderate pace, firm surface",
        "Walking",
      ],
      [5.3, "Walking, 2.9 to 3.5 mph, uphill, 1 to 5% grade", "Walking"],
      [8.0, "Walking, 2.9 to 3.5 mph, uphill, 6% to 15% grade", "Walking"],
      [
        4.3,
        "Walking, 3.5 mph, level, brisk, firm surface, walking for exercise",
        "Walking",
      ],
      [
        5.0,
        "Walking, 4.0 mph, level, firm surface, very brisk pace",
        "Walking",
      ],
      [
        7.0,
        "Walking, 4.5 mph, level, firm surface, very, very brisk",
        "Walking",
      ],
      [8.3, "Walking, 5.0 mph, level, firm surface", "Walking"],
      [9.8, "Walking, 5.0 mph, uphill, 3% grade", "Walking"],
      [6.0, "Walking, backwards, 3.5 mph, level", "Walking"],
      [8.0, "Walking, backwards, 3.5 mph, uphill, 5% grade", "Walking"],
      [
        4.8,
        "Walking, for exercise, 3.5 to 4 mph, with ski poles, Nordic walking, level, moderate pace",
        "Walking",
      ],
      [
        9.5,
        "Walking, for exercise, 5.0 mph, with ski poles, Nordic walking, level, fast pace",
        "Walking",
      ],
      [
        6.8,
        "Walking, for exercise, with ski poles, Nordic walking, uphill",
        "Walking",
      ],
      [3.5, "Walking, for pleasure, work break", "Walking"],
      [4.8, "Walking, grass track", "Walking"],
      [2.0, "Walking, household", "Walking"],
      [
        2.0,
        "Walking, less than 2.0 mph, level, strolling, very slow",
        "Walking",
      ],
      [4.5, "Walking, normal pace, plowed field or sand", "Walking"],
      [2.5, "Walking, to and from an outhouse", "Walking"],
      [4.0, "Walking, to work or class (Taylor Code 015)", "Walking"],
      [7.0, "Wallyball, general", "Wallyball"],
      [5.5, "Water aerobics, water calisthenics", "Water aerobics"],
      [
        5.3,
        "Water aerobics, water calisthenics, water exercise",
        "Water aerobics",
      ],
      [9.8, "Water jogging", "Water jogging"],
      [10.0, "Water polo", "Water polo"],
      [3.0, "Water volleyball", "Water volleyball"],
      [2.5, "Water walking, light effort, slow pace", "Water walking"],
      [4.5, "Water walking, moderate effort, moderate pace", "Water walking"],
      [6.8, "Water walking, vigorous effort, brisk pace", "Water walking"],
      [1.3, "Whirlpool, sitting", "Whirlpool"],
      [5.0, "Whitewater rafting, kayaking, or canoeing", "Whitewater rafting"],
      [11.0, "Windsurfing or kitesurfing, crossing trial", "Windsurfing"],
      [13.5, "Windsurfing, competition, pumping for speed", "Windsurfing"],
      [5.0, "Windsurfing, not pumping for speed", "Windsurfing"],
      [6.0, "Wrestling (one match = 5 minutes)", "Wresling"],
      [2.5, "Yoga, Hatha", "yoga"],
      [2.0, "Yoga, Nadisodhana", "yoga"],
      [4.0, "Yoga, Power", "yoga"],
      [3.3, "Yoga, Surya Namaskar", "yoga"],
    ];

    function getClosest(search, arr) {
      let closest = null;
      for (const item of arr) {
        const [calories_burn_act, act_name_ans_pandran, act_img_name] =
          item.split("@@");
        if (
          closest == null ||
          Math.abs(search - closest) > Math.abs(calories_burn_act - search)
        ) {
          closest = calories_burn_act;
        }
      }
      return closest;
    }

    if (
      isNumeric(age) &&
      isNumeric(weight) &&
      isNumeric(lose_w) &&
      gender &&
      activity
    ) {
      let lose_w_lbs, lose_w_kg;

      if (lose_unit == "lbs") {
        lose_w_lbs = lose_w;
        lose_w_kg = lose_w / 2.205;
      } else {
        lose_w_kg = lose_w;
        lose_w_lbs = lose_w * 2.205;
      }

      let weight_lbs, weight_kg, new_lose_kg, new_lose_lbs;

      if (weight_unit == "lbs") {
        weight_lbs = weight;
        weight_kg = weight / 2.205;
        new_lose_kg = lose_w_lbs / 2.205;
        new_lose_lbs = lose_w_lbs;
      } else {
        weight_kg = weight;
        weight_lbs = weight * 2.205;
        new_lose_kg = lose_w_lbs * 2.205;
        new_lose_lbs = lose_w_lbs;
      }

      const weight_diff_kg = weight_kg - new_lose_kg;
      const weight_diff_lbs = weight_lbs - new_lose_lbs;

      let final_height_cm;

      if (hightUnit == "ft/in") {
        if (isNumeric(height_ft) && isNumeric(height_in)) {
          if (body.tech_unit_ft_in == "ft/in") {
            final_height_cm = height_ft * 30.48;
            if (height_in != null) {
              const height_in_cm = height_in * 2.54;
              final_height_cm += height_in_cm;
            }
          }
        } else {
          return { error: "Please Enter Height." };
        }
      } else {
        if (isNumeric(height_cm)) {
          final_height_cm = height_cm;
        } else {
          return { error: "Please Enter Height." };
        }
      }

      const height_m = final_height_cm / 100;
      const height_in_total = final_height_cm / 2.54;

      let new_BMR, ibw;

      if (gender == "Male") {
        new_BMR = Math.round(
          10 * weight_kg + 6.25 * final_height_cm - 5 * age + 5
        );
        ibw = 50 + 2.3 * (height_in_total - 60);
      } else {
        new_BMR = Math.round(
          10 * weight_kg + 6.25 * final_height_cm - 5 * age - 161
        );
        ibw = 45.5 + 2.3 * (height_in_total - 60);
      }

      const BMI = Math.round((weight_kg / (height_m * height_m)) * 100) / 100;
      let you_are;

      if (BMI <= 18.5) {
        you_are = "Underweight";
      } else if (BMI > 18.5 && BMI <= 24.9) {
        you_are = "Normal Weight";
      } else if (BMI > 24.9 && BMI <= 29.9) {
        you_are = "Overweight";
      } else if (BMI > 29.9 && BMI <= 35) {
        you_are = "Obesity";
      } else {
        you_are = "Severe Obesity";
      }

      const activity_multiplier = Math.round(new_BMR * activity);
      const calories = Math.round(new_BMR + activity_multiplier);

      let calories_less, calories_daily, pounds_daily, days;

      if (choose == "by_calories") {
        if (!enter_calories) {
          return { error: "Enter Kcal/day are you ready to reduce." };
        }
        calories_less = enter_calories;
        calories_daily = calories - calories_less;
        pounds_daily = Math.round((calories_less / 3500) * 1000) / 1000;
        days = Math.round(weight_diff_lbs / pounds_daily);
      } else {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const timeDiff = endDate.getTime() - startDate.getTime();
        days = Math.ceil(timeDiff / (1000 * 3600 * 24));

        if (days == 0) {
          return { error: "Start and target dates must not be the same." };
        }

        pounds_daily = Math.round((weight_diff_lbs / days) * 100) / 100;
        calories_less = Math.round(pounds_daily * 3500);
        calories_daily = calories - calories_less;
      }

      const sab_ki_calories_pandran = [];
      const sab_ki_calories_adha = [];
      const sab_ki_calories_pona = [];
      const sab_ki_calories_hour = [];
      const sab_ki_calories_sawa = [];
      const sab_ki_calories_dher = [];
      const sab_ki_calories_pone = [];
      const sab_ki_calories_do = [];

      for (const act_val of all_activites) {
        sab_ki_calories_pandran.push(
          Math.round(new_BMR * act_val[0] * (15 / 1440)) +
            "@@" +
            act_val[1] +
            "@@" +
            act_val[2]
        );
        sab_ki_calories_adha.push(
          Math.round(new_BMR * act_val[0] * (30 / 1440)) +
            "@@" +
            act_val[1] +
            "@@" +
            act_val[2]
        );
        sab_ki_calories_pona.push(
          Math.round(new_BMR * act_val[0] * (45 / 1440)) +
            "@@" +
            act_val[1] +
            "@@" +
            act_val[2]
        );
        sab_ki_calories_hour.push(
          Math.round(new_BMR * act_val[0] * (60 / 1440)) +
            "@@" +
            act_val[1] +
            "@@" +
            act_val[2]
        );
        sab_ki_calories_sawa.push(
          Math.round(new_BMR * act_val[0] * (75 / 1440)) +
            "@@" +
            act_val[1] +
            "@@" +
            act_val[2]
        );
        sab_ki_calories_dher.push(
          Math.round(new_BMR * act_val[0] * (90 / 1440)) +
            "@@" +
            act_val[1] +
            "@@" +
            act_val[2]
        );
        sab_ki_calories_pone.push(
          Math.round(new_BMR * act_val[0] * (105 / 1440)) +
            "@@" +
            act_val[1] +
            "@@" +
            act_val[2]
        );
        sab_ki_calories_do.push(
          Math.round(new_BMR * act_val[0] * (120 / 1440)) +
            "@@" +
            act_val[1] +
            "@@" +
            act_val[2]
        );
      }

      const diff_array_pandran = [];
      const diff_array_adha = [];
      const diff_array_pona = [];
      const diff_array = [];
      const diff_array_sawa = [];
      const diff_array_dher = [];
      const diff_array_pone = [];
      const diff_array_do = [];

      for (let i = 0; i < sab_ki_calories_hour.length; i++) {
        const [cal_ans_pandran, name_ans_pandran, img_name_pandran] =
          sab_ki_calories_pandran[i].split("@@");
        const [cal_ans_adha, name_ans_adha, img_name_adha] =
          sab_ki_calories_adha[i].split("@@");
        const [cal_ans_pona, name_ans_pona, img_name_pona] =
          sab_ki_calories_pona[i].split("@@");
        const [cal_ans, name_ans, img_name] =
          sab_ki_calories_hour[i].split("@@");
        const [cal_ans_sawa, name_ans_sawa, img_name_sawa] =
          sab_ki_calories_sawa[i].split("@@");
        const [cal_ans_dher, name_ans_dher, img_name_dher] =
          sab_ki_calories_dher[i].split("@@");
        const [cal_ans_pone, name_ans_pone, img_name_pone] =
          sab_ki_calories_pone[i].split("@@");
        const [cal_ans_do, name_ans_do, img_name_do] =
          sab_ki_calories_do[i].split("@@");

        diff_array_pandran.push([
          Math.abs(cal_ans_pandran - calories_less),
          cal_ans_pandran,
          name_ans_pandran,
          img_name_pandran,
        ]);
        diff_array_adha.push([
          Math.abs(cal_ans_adha - calories_less),
          cal_ans_adha,
          name_ans_adha,
          img_name_adha,
        ]);
        diff_array_pona.push([
          Math.abs(cal_ans_pona - calories_less),
          cal_ans_pona,
          name_ans_pona,
          img_name_pona,
        ]);
        diff_array.push([
          Math.abs(cal_ans - calories_less),
          cal_ans,
          name_ans,
          img_name,
        ]);
        diff_array_sawa.push([
          Math.abs(cal_ans_sawa - calories_less),
          cal_ans_sawa,
          name_ans_sawa,
          img_name_sawa,
        ]);
        diff_array_dher.push([
          Math.abs(cal_ans_dher - calories_less),
          cal_ans_dher,
          name_ans_dher,
          img_name_dher,
        ]);
        diff_array_pone.push([
          Math.abs(cal_ans_pone - calories_less),
          cal_ans_pone,
          name_ans_pone,
          img_name_pone,
        ]);
        diff_array_do.push([
          Math.abs(cal_ans_do - calories_less),
          cal_ans_do,
          name_ans_do,
          img_name_do,
        ]);
      }

      diff_array_pandran.sort((a, b) => a[0] - b[0]);
      diff_array_adha.sort((a, b) => a[0] - b[0]);
      diff_array_pona.sort((a, b) => a[0] - b[0]);
      diff_array.sort((a, b) => a[0] - b[0]);
      diff_array_sawa.sort((a, b) => a[0] - b[0]);
      diff_array_dher.sort((a, b) => a[0] - b[0]);
      diff_array_pone.sort((a, b) => a[0] - b[0]);
      diff_array_do.sort((a, b) => a[0] - b[0]);

      const slice_pandran = diff_array_pandran.slice(0, 15);
      const slice_adha = diff_array_adha.slice(0, 15);
      const slice_pona = diff_array_pona.slice(0, 15);
      const slice = diff_array.slice(0, 15);
      const slice_sawa = diff_array_sawa.slice(0, 15);
      const slice_dher = diff_array_dher.slice(0, 15);
      const slice_pone = diff_array_pone.slice(0, 15);
      const slice_do = diff_array_do.slice(0, 15);

      const final_array_pandran = [];
      const final_array_adha = [];
      const final_array_pona = [];
      const final_array = [];
      const final_array_sawa = [];
      const final_array_dher = [];
      const final_array_pone = [];
      const final_array_do = [];

      for (let i = 0; i < slice.length; i++) {
        final_array_pandran.push(
          slice_pandran[i][1] +
            "@@" +
            slice_pandran[i][2] +
            "@@" +
            slice_pandran[i][3]
        );
        final_array_adha.push(
          slice_adha[i][1] + "@@" + slice_adha[i][2] + "@@" + slice_adha[i][3]
        );
        final_array_pona.push(
          slice_pona[i][1] + "@@" + slice_pona[i][2] + "@@" + slice_pona[i][3]
        );
        final_array.push(slice[i][1] + "@@" + slice[i][2] + "@@" + slice[i][3]);
        final_array_sawa.push(
          slice_sawa[i][1] + "@@" + slice_sawa[i][2] + "@@" + slice_sawa[i][3]
        );
        final_array_dher.push(
          slice_dher[i][1] + "@@" + slice_dher[i][2] + "@@" + slice_dher[i][3]
        );
        final_array_pone.push(
          slice_pone[i][1] + "@@" + slice_pone[i][2] + "@@" + slice_pone[i][3]
        );
        final_array_do.push(
          slice_do[i][1] + "@@" + slice_do[i][2] + "@@" + slice_do[i][3]
        );
      }

      final_array_pandran.sort();
      final_array_adha.sort();
      final_array_pona.sort();
      final_array.sort();
      final_array_sawa.sort();
      final_array_dher.sort();
      final_array_pone.sort();
      final_array_do.sort();

      const activity_first =
        Math.round(((0.2 * new_BMR * 7) / 3500) * 100) / 100;
      const activity_second =
        Math.round(((0.375 * new_BMR * 7) / 3500) * 100) / 100;
      const activity_third =
        Math.round(((0.55 * new_BMR * 7) / 3500) * 100) / 100;
      const activity_four =
        Math.round(((0.725 * new_BMR * 7) / 3500) * 100) / 100;
      const activity_five =
        Math.round(((0.9 * new_BMR * 7) / 3500) * 100) / 100;

      const ans_weight = submit == "lbs" ? weight_lbs : weight_kg;

      return {
        tech_PoundsDaily: pounds_daily,
        tech_CaloriesDaily: calories_daily,
        tech_Calories: calories,
        tech_days: days,
        tech_ans_weight: ans_weight,
        tech_BMR: new_BMR,
        tech_BMI: BMI,
        tech_you_are: you_are,
        tech_ibw: ibw,
        tech_submit: submit,
        tech_lose_w: lose_w,
        tech_weight: weight,
        tech_final_array_pandran: final_array_pandran,
        tech_final_array_adha: final_array_adha,
        tech_final_array_pona: final_array_pona,
        tech_final_array: final_array,
        tech_final_array_sawa: final_array_sawa,
        tech_final_array_dher: final_array_dher,
        tech_final_array_pone: final_array_pone,
        tech_final_array_do: final_array_do,
        tech_diff_array_pandran: diff_array_pandran,
        tech_diff_array_adha: diff_array_adha,
        tech_diff_array_pona: diff_array_pona,
        tech_diff_array: diff_array,
        tech_diff_array_sawa: diff_array_sawa,
        tech_diff_array_dher: diff_array_dher,
        tech_diff_array_pone: diff_array_pone,
        tech_diff_array_do: diff_array_do,
        tech_activity_first: activity_first,
        tech_activity_second: activity_second,
        tech_activity_third: activity_third,
        tech_activity_four: activity_four,
        tech_activity_five: activity_five,
      };
    } else {
      return { error: "Please! Check Your Input." };
    }

    // Helper function to check if value is numeric
    function isNumeric(value) {
      return !isNaN(parseFloat(value)) && isFinite(value);
    }
  }

  /**
   * getCalculationOvulationCalculator: Service Method
   * POST: /api/calculators-lol/ovulation-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationOvulationCalculator(body) {
    const request = body;

    // Validate input
    if (!isNaN(request.tech_days) && request.tech_date) {
      const datepicker = request.tech_date;
      const exp = datepicker.split("-");
      let dateyear = parseInt(exp[0]);
      let datemonth = parseInt(exp[1]);
      let dateday = parseInt(exp[2]);

      // Set default values
      let days = parseInt(request.tech_days) || 28;
      let ldays = parseInt(request.tech_Luteal) || 14;

      let table = "";

      // Helper function to format date
      const formatDate = (d, format) => {
        const months = [
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
        const month = months[d.getMonth()];
        const day = String(d.getDate()).padStart(2, "0");
        const year = d.getFullYear();

        if (format == "M d, Y") return `${month} ${day}, ${year}`;
        if (format == "M d") return `${month} ${day}`;
        if (format == "M d - ") return `${month} ${day} - `;
        if (format == "M d ") return `${month} ${day} `;
        if (format == "Y-m-d")
          return `${year}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
            d.getDate()
          ).padStart(2, "0")}`;
        return d;
      };

      // Helper function to add days
      const addDays = (date, days) => {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
      };

      // Parse date string to create proper date
      const parseDate = (dateStr) => {
        const parts = dateStr.split(", ");
        const monthDay = parts[0].split(" ");
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
        const month = monthNames.indexOf(monthDay[0]);
        const day = parseInt(monthDay[1]);
        const year = parts[1] ? parseInt(parts[1]) : new Date().getFullYear();
        return new Date(year, month, day);
      };

      // Initial date
      const date = `${dateyear}-${datemonth}-${dateday}`;
      const dateObj = new Date(dateyear, datemonth - 1, dateday);

      const start_period = formatDate(dateObj, "M d, Y");
      const start_perio = formatDate(dateObj, "M d");
      const save1 = formatDate(dateObj, "M d ");
      const save2 = formatDate(addDays(dateObj, 6), "M d");
      const save = `${save1}to ${save2}`;

      // Next period calculation
      const next_period_date = addDays(dateObj, days);
      const next_period = formatDate(next_period_date, "M d, Y");
      const save3 = formatDate(next_period_date, "M d");
      const save4 = formatDate(addDays(next_period_date, -6), "M d");
      const saven = `${save4} to ${save3}`;

      // Ovulation date calculation
      const ovu_date_obj = addDays(next_period_date, -ldays);
      const ovu_date = formatDate(ovu_date_obj, "M d, Y");
      const firstday = formatDate(addDays(ovu_date_obj, -2), "M d");
      const lastday = formatDate(addDays(ovu_date_obj, 2), "M d");
      const testdate = formatDate(addDays(ovu_date_obj, 9), "M d, Y");
      const inter = formatDate(addDays(addDays(ovu_date_obj, 2), -7), "M d - ");

      const diff = 280 + (days - 28);
      const duedate = formatDate(addDays(dateObj, diff), "M d, Y");

      // Build table first row
      table += `<tr><td class="border-b-dark font-s-12">${start_perio}</td><td class="border-b-dark font-s-12 border-s-dark">${firstday} - ${lastday}</td><td class="border-b-dark font-s-12 border-s-dark">${duedate}</td></tr>`;

      // Build table rows for next 5 cycles
      let current_period_str = start_period;
      for (let i = 0; i < 5; i++) {
        const current = parseDate(current_period_str);
        const next_current = addDays(current, days);
        current_period_str = formatDate(next_current, "M d, Y");
        const start_period_display = formatDate(next_current, "M d");

        const next = addDays(next_current, days);
        const ovu = addDays(next, -ldays);
        const first = formatDate(addDays(ovu, -2), "M d");
        const last = formatDate(addDays(ovu, 2), "M d");
        const d_date = formatDate(addDays(next_current, diff), "M d, Y");
        const border_b = i == 4 ? "" : "border-b-dark";

        table += `<tr><td class="${border_b} font-s-12">${start_period_display}</td><td class="${border_b} font-s-12 border-s-dark">${first} - ${last}</td><td class="${border_b} font-s-12 border-s-dark">${d_date}</td></tr>`;
      }

      // Calculate chance
      const aj_ki_date = formatDate(new Date(), "M d, Y");
      const one = formatDate(addDays(ovu_date_obj, -2), "M d, Y");
      const two = formatDate(addDays(ovu_date_obj, -1), "M d, Y");
      const three = formatDate(addDays(ovu_date_obj, 2), "M d, Y");
      const four = formatDate(addDays(ovu_date_obj, 1), "M d, Y");

      let chance;
      if (aj_ki_date == ovu_date) {
        chance = "High";
      } else if (
        aj_ki_date == one ||
        aj_ki_date == two ||
        aj_ki_date == three ||
        aj_ki_date == four
      ) {
        chance = "Medium";
      } else {
        chance = "Low";
      }

      // Calculate all event dates - FIXED LOGIC
      const event1 = formatDate(dateObj, "Y-m-d");
      const event2 = formatDate(next_period_date, "Y-m-d");
      const event3 = formatDate(addDays(ovu_date_obj, -2), "Y-m-d");
      const event4 = formatDate(addDays(ovu_date_obj, -1), "Y-m-d");
      const event5 = formatDate(ovu_date_obj, "Y-m-d");
      const event6 = formatDate(addDays(ovu_date_obj, 1), "Y-m-d");
      const event7 = formatDate(addDays(ovu_date_obj, 2), "Y-m-d");

      // event8-12: Next fertile window
      const event7_date = addDays(ovu_date_obj, 2);
      const event8 = formatDate(addDays(event7_date, days - 4), "Y-m-d");
      const event9 = formatDate(addDays(event7_date, days - 3), "Y-m-d");
      const event10 = formatDate(addDays(event7_date, days - 2), "Y-m-d");
      const event11 = formatDate(addDays(event7_date, days - 1), "Y-m-d");
      const event12 = formatDate(addDays(event7_date, days), "Y-m-d");

      // event13-17: Third fertile window
      const event13 = formatDate(
        addDays(event7_date, days + (days - 4)),
        "Y-m-d"
      );
      const event14 = formatDate(
        addDays(event7_date, days + (days - 3)),
        "Y-m-d"
      );
      const event15 = formatDate(
        addDays(event7_date, days + (days - 2)),
        "Y-m-d"
      );
      const event16 = formatDate(
        addDays(event7_date, days + (days - 1)),
        "Y-m-d"
      );
      const event17 = formatDate(addDays(event7_date, days + days), "Y-m-d");

      // event18-22: Fourth fertile window
      const event18 = formatDate(
        addDays(event7_date, days * 2 + (days - 4)),
        "Y-m-d"
      );
      const event19 = formatDate(
        addDays(event7_date, days * 2 + (days - 3)),
        "Y-m-d"
      );
      const event20 = formatDate(
        addDays(event7_date, days * 2 + (days - 2)),
        "Y-m-d"
      );
      const event21 = formatDate(
        addDays(event7_date, days * 2 + (days - 1)),
        "Y-m-d"
      );
      const event22 = formatDate(
        addDays(event7_date, days * 2 + days),
        "Y-m-d"
      );

      // event23-27: Fifth fertile window
      const event23 = formatDate(
        addDays(event7_date, days * 3 + (days - 4)),
        "Y-m-d"
      );
      const event24 = formatDate(
        addDays(event7_date, days * 3 + (days - 3)),
        "Y-m-d"
      );
      const event25 = formatDate(
        addDays(event7_date, days * 3 + (days - 2)),
        "Y-m-d"
      );
      const event26 = formatDate(
        addDays(event7_date, days * 3 + (days - 1)),
        "Y-m-d"
      );
      const event27 = formatDate(
        addDays(event7_date, days * 3 + days),
        "Y-m-d"
      );

      // event28-32: Sixth fertile window
      const event28 = formatDate(
        addDays(event7_date, days * 4 + (days - 4)),
        "Y-m-d"
      );
      const event29 = formatDate(
        addDays(event7_date, days * 4 + (days - 3)),
        "Y-m-d"
      );
      const event30 = formatDate(
        addDays(event7_date, days * 4 + (days - 2)),
        "Y-m-d"
      );
      const event31 = formatDate(
        addDays(event7_date, days * 4 + (days - 1)),
        "Y-m-d"
      );
      const event32 = formatDate(
        addDays(event7_date, days * 4 + days),
        "Y-m-d"
      );

      const lasttime_date = addDays(ovu_date_obj, -2);
      lasttime_date.setHours(0, 0, 0, 0);
      const lasttime = Math.floor(lasttime_date.getTime() / 1000);

      // Return result object
      return {
        tech_Date: date,
        tech_First_day: firstday,
        tech_Ovu_date: ovu_date,
        tech_Last_day: lastday,
        tech_Next_period: next_period,
        tech_table: table,
        tech_test: testdate,
        tech_inter: inter,
        tech_save: save,
        tech_saven: saven,
        tech_chance: chance,
        tech_Due_date: duedate,
        tech_event1: event1,
        tech_event2: event2,
        tech_event3: event3,
        tech_event4: event4,
        tech_event5: event5,
        tech_event6: event6,
        tech_event7: event7,
        tech_event8: event8,
        tech_event9: event9,
        tech_event10: event10,
        tech_event11: event11,
        tech_event12: event12,
        tech_event13: event13,
        tech_event14: event14,
        tech_event15: event15,
        tech_event16: event16,
        tech_event17: event17,
        tech_event18: event18,
        tech_event19: event19,
        tech_event20: event20,
        tech_event21: event21,
        tech_event22: event22,
        tech_event23: event23,
        tech_event24: event24,
        tech_event25: event25,
        tech_event26: event26,
        tech_event27: event27,
        tech_event28: event28,
        tech_event29: event29,
        tech_event30: event30,
        tech_event31: event31,
        tech_event32: event32,
        tech_lasttime: lasttime,
        request: request,
      };
    } else {
      return {
        error: "Invalid Input.",
      };
    }
  }

  /**
   * getCalculationIBMCalculator: Service Method
   * POST: /api/calculators-lol/bmi-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationIBMCalculator(body) {
    // const { age, height_cm, ft_in, weight, stage, gender, unit_type } = body;

    let age = body.tech_age;
    let height_cm = body.tech_height_cm;
    let ft_in = body.tech_ft_in;
    let weight = body.tech_weight;
    let stage = body.tech_stage;
    let gender = body.tech_gender;
    let unit_type = body.tech_unit_type;

    let param = {};
    let result = {};
    let height_in;

    if (isNaN(weight)) {
      param.error = "Please Check Your Input.";
      return param;
    }

    if (age > 20) {
      param.error = "Age value Must be less than or equal to 20 ";
      return param;
    }

    let heightInCm = height_cm;

    if (unit_type === "lbs") {
      if (!ft_in) {
        param.error = "Please Select Height";
        return param;
      }
      heightInCm = ft_in * 2.54;
    } else {
      if (!height_cm) {
        param.error = "Please Enter Height";
        return param;
      }
      weight = weight * 2.205; // Convert weight to lbs
    }

    const heightInInches = Math.round(heightInCm / 2.54);
    const bmi = (weight * 703) / (heightInInches * heightInInches);
    const roundBmi = Math.round(bmi * 100) / 100;

    if (stage == "child") {
      const n = [
        50, 50.399, 50.798, 51.197, 51.595, 51.994, 52.392, 52.79, 53.188,
        53.586, 53.983, 54.38, 54.776, 55.172, 55.567, 55.962, 56.356, 56.749,
        57.142, 57.535, 57.926, 58.317, 58.706, 59.095, 59.483, 59.871, 60.257,
        60.642, 61.026, 61.409, 61.791, 62.172, 62.552, 62.93, 63.307, 63.683,
        64.058, 64.431, 64.803, 65.173, 65.542, 65.91, 66.276, 66.64, 67.003,
        67.364, 67.724, 68.082, 68.439, 68.793, 69.146, 69.497, 69.847, 70.194,
        70.54, 70.884, 71.226, 71.566, 71.904, 72.24, 72.575, 72.907, 73.237,
        73.565, 73.891, 74.215, 74.537, 74.857, 75.175, 75.49, 75.804, 76.115,
        76.424, 76.73, 77.035, 77.337, 77.637, 77.935, 78.23, 78.524, 78.814,
        79.103, 79.389, 79.673, 79.955, 80.234, 80.511, 80.785, 81.057, 81.327,
        81.594, 81.859, 82.121, 82.381, 82.639, 82.894, 83.147, 83.398, 83.646,
        83.891, 84.134, 84.375, 84.614, 84.849, 85.083, 85.314, 85.543, 85.769,
        85.993, 86.214, 86.433, 86.65, 86.864, 87.076, 87.286, 87.493, 87.698,
        87.9, 88.1, 88.298, 88.493, 88.686, 88.877, 89.065, 89.251, 89.435,
        89.617, 89.796, 89.973, 90.147, 90.32, 90.49, 90.658, 90.824, 90.988,
        91.149, 91.308, 91.466, 91.621, 91.774, 91.924, 92.073, 92.22, 92.364,
        92.507, 92.647, 92.785, 92.922, 93.056, 93.189, 93.319, 93.448, 93.574,
        93.699, 93.822, 93.943, 94.062, 94.179, 94.295, 94.408, 94.52, 94.63,
        94.738, 94.845, 94.95, 95.053, 95.154, 95.254, 95.352, 95.449, 95.543,
        95.637, 95.728, 95.818, 95.907, 95.994, 96.08, 96.164, 96.246, 96.327,
        96.407, 96.485, 96.562, 96.638, 96.712, 96.784, 96.856, 96.926, 96.995,
        97.062, 97.128, 97.193, 97.257, 97.32, 97.381, 97.441, 97.5, 97.558,
        97.615, 97.67, 97.725, 97.778, 97.831, 97.882, 97.932, 97.982, 98.03,
        98.077, 98.124, 98.169, 98.214, 98.257, 98.3, 98.341, 98.382, 98.422,
        98.461, 98.5, 98.537, 98.574, 98.61, 98.645, 98.679, 98.713, 98.745,
        98.778, 98.809, 98.84, 98.87, 98.899, 98.928, 98.956, 98.983, 99.01,
        99.036, 99.061, 99.086, 99.111, 99.134, 99.158, 99.18, 99.202, 99.224,
        99.245, 99.266, 99.286, 99.305, 99.324, 99.343, 99.361, 99.379, 99.396,
        99.413, 99.43, 99.446, 99.461, 99.477, 99.492, 99.506, 99.52, 99.534,
        99.547, 99.56, 99.573, 99.585, 99.598, 99.609, 99.621, 99.632, 99.643,
        99.653, 99.664, 99.674, 99.683, 99.693, 99.702, 99.711, 99.72, 99.728,
        99.736, 99.744, 99.752, 99.76, 99.767, 99.774, 99.781, 99.788, 99.795,
        99.801, 99.807, 99.813, 99.819, 99.825, 99.831, 99.836, 99.841, 99.846,
        99.851, 99.856, 99.861, 99.865, 99.869, 99.874, 99.878, 99.882, 99.886,
        99.889, 99.893, 99.896, 99.9,
      ];

      let L, M, S, zScore, thisPercentile;

      const ageMonths = age * 12;

      if (gender == "Male") {
        if (ageMonths >= 24 && ageMonths < 25) {
          L = -1.982373595;
          M = 16.54777487;
          S = 0.080127429;
        } else if (ageMonths >= 25 && ageMonths < 26) {
          L = -1.924100169;
          M = 16.49442763;
          S = 0.079233994;
        } else if (ageMonths >= 26 && ageMonths < 27) {
          L = -1.86549793;
          M = 16.44259552;
          S = 0.078389356;
        } else if (ageMonths >= 27 && ageMonths < 28) {
          L = -1.807261899;
          M = 16.3922434;
          S = 0.077593501;
        } else if (ageMonths >= 28 && ageMonths < 29) {
          L = -1.750118905;
          M = 16.34333654;
          S = 0.076846462;
        } else if (ageMonths >= 29 && ageMonths < 30) {
          L = -1.69481584;
          M = 16.29584097;
          S = 0.076148308;
        } else if (ageMonths >= 30 && ageMonths < 31) {
          L = -1.642106779;
          M = 16.24972371;
          S = 0.075499126;
        } else if (ageMonths >= 31 && ageMonths < 32) {
          L = -1.592744414;
          M = 16.20495268;
          S = 0.074898994;
        } else if (ageMonths >= 32 && ageMonths < 33) {
          L = -1.547442391;
          M = 16.16149871;
          S = 0.074347997;
        } else if (ageMonths >= 33 && ageMonths < 34) {
          L = -1.506902601;
          M = 16.11933258;
          S = 0.073846139;
        } else if (ageMonths >= 34 && ageMonths < 35) {
          L = -1.471770047;
          M = 16.07842758;
          S = 0.07339337;
        } else if (ageMonths >= 35 && ageMonths < 36) {
          L = -1.442628957;
          M = 16.03875896;
          S = 0.072989551;
        } else if (ageMonths >= 36 && ageMonths < 37) {
          L = -1.419991255;
          M = 16.00030401;
          S = 0.072634432;
        } else if (ageMonths >= 37 && ageMonths < 38) {
          L = -1.404277619;
          M = 15.96304277;
          S = 0.072327649;
        } else if (ageMonths >= 38 && ageMonths < 39) {
          L = -1.39586317;
          M = 15.92695418;
          S = 0.07206864;
        } else if (ageMonths >= 39 && ageMonths < 40) {
          L = -1.394935252;
          M = 15.89202582;
          S = 0.071856805;
        } else if (ageMonths >= 40 && ageMonths < 41) {
          L = -1.401671596;
          M = 15.85824093;
          S = 0.071691278;
        } else if (ageMonths >= 41 && ageMonths < 42) {
          L = -1.416100312;
          M = 15.82558822;
          S = 0.071571093;
        } else if (ageMonths >= 42 && ageMonths < 43) {
          L = -1.438164899;
          M = 15.79405728;
          S = 0.071495113;
        } else if (ageMonths >= 43 && ageMonths < 44) {
          L = -1.467669032;
          M = 15.76364255;
          S = 0.071462106;
        } else if (ageMonths >= 44 && ageMonths < 45) {
          L = -1.504376347;
          M = 15.73433668;
          S = 0.071470646;
        } else if (ageMonths >= 45 && ageMonths < 46) {
          L = -1.547942838;
          M = 15.70613566;
          S = 0.071519218;
        } else if (ageMonths >= 46 && ageMonths < 47) {
          L = -1.597896397;
          M = 15.67904062;
          S = 0.071606277;
        } else if (ageMonths >= 47 && ageMonths < 48) {
          L = -1.653732283;
          M = 15.65305192;
          S = 0.071730167;
        } else if (ageMonths >= 48 && ageMonths < 49) {
          L = -1.714869347;
          M = 15.62817269;
          S = 0.071889214;
        } else if (ageMonths >= 49 && ageMonths < 50) {
          L = -1.780673181;
          M = 15.604408;
          S = 0.072081737;
        } else if (ageMonths >= 50 && ageMonths < 51) {
          L = -1.850468473;
          M = 15.58176458;
          S = 0.072306081;
        } else if (ageMonths >= 51 && ageMonths < 52) {
          L = -1.923551865;
          M = 15.56025067;
          S = 0.072560637;
        } else if (ageMonths >= 52 && ageMonths < 53) {
          L = -1.999220429;
          M = 15.5398746;
          S = 0.07284384;
        } else if (ageMonths >= 53 && ageMonths < 54) {
          L = -2.076707178;
          M = 15.52064993;
          S = 0.073154324;
        } else if (ageMonths >= 54 && ageMonths < 55) {
          L = -2.155348017;
          M = 15.50258427;
          S = 0.073490667;
        } else if (ageMonths >= 55 && ageMonths < 56) {
          L = -2.234438552;
          M = 15.48568973;
          S = 0.073851672;
        } else if (ageMonths >= 56 && ageMonths < 57) {
          L = -2.313321723;
          M = 15.46997718;
          S = 0.074236235;
        } else if (ageMonths >= 57 && ageMonths < 58) {
          L = -2.391381273;
          M = 15.45545692;
          S = 0.074643374;
        } else if (ageMonths >= 58 && ageMonths < 59) {
          L = -2.468032491;
          M = 15.44213961;
          S = 0.075072264;
        } else if (ageMonths >= 59 && ageMonths < 60) {
          L = -2.542781541;
          M = 15.43003207;
          S = 0.075522104;
        } else if (ageMonths >= 60 && ageMonths < 61) {
          L = -2.61516595;
          M = 15.41914163;
          S = 0.07599225;
        } else if (ageMonths >= 61 && ageMonths < 62) {
          L = -2.684789516;
          M = 15.40947356;
          S = 0.076482128;
        } else if (ageMonths >= 62 && ageMonths < 63) {
          L = -2.751316949;
          M = 15.40103139;
          S = 0.076991232;
        } else if (ageMonths >= 63 && ageMonths < 64) {
          L = -2.81445945;
          M = 15.39381785;
          S = 0.077519149;
        } else if (ageMonths >= 64 && ageMonths < 65) {
          L = -2.87402476;
          M = 15.38783094;
          S = 0.07806539;
        } else if (ageMonths >= 65 && ageMonths < 66) {
          L = -2.92984048;
          M = 15.38306945;
          S = 0.078629592;
        } else if (ageMonths >= 66 && ageMonths < 67) {
          L = -2.981796828;
          M = 15.37952958;
          S = 0.079211369;
        } else if (ageMonths >= 67 && ageMonths < 68) {
          L = -3.029831343;
          M = 15.37720582;
          S = 0.079810334;
        } else if (ageMonths >= 68 && ageMonths < 69) {
          L = -3.073924224;
          M = 15.37609107;
          S = 0.080426086;
        } else if (ageMonths >= 69 && ageMonths < 70) {
          L = -3.114093476;
          M = 15.37617677;
          S = 0.081058206;
        } else if (ageMonths >= 70 && ageMonths < 71) {
          L = -3.15039004;
          M = 15.37745304;
          S = 0.081706249;
        } else if (ageMonths >= 71 && ageMonths < 72) {
          L = -3.182893018;
          M = 15.37990886;
          S = 0.082369741;
        } else if (ageMonths >= 72 && ageMonths < 73) {
          L = -3.21170511;
          M = 15.38353217;
          S = 0.083048178;
        } else if (ageMonths >= 73 && ageMonths < 74) {
          L = -3.23694834;
          M = 15.38831005;
          S = 0.083741021;
        } else if (ageMonths >= 74 && ageMonths < 75) {
          L = -3.25876011;
          M = 15.39422883;
          S = 0.0844477;
        } else if (ageMonths >= 75 && ageMonths < 76) {
          L = -3.277281546;
          M = 15.40127496;
          S = 0.085167651;
        } else if (ageMonths >= 76 && ageMonths < 77) {
          L = -3.292683774;
          M = 15.40943252;
          S = 0.085900184;
        } else if (ageMonths >= 77 && ageMonths < 78) {
          L = -3.305124073;
          M = 15.41868691;
          S = 0.086644667;
        } else if (ageMonths >= 78 && ageMonths < 79) {
          L = -3.314768951;
          M = 15.42902273;
          S = 0.087400421;
        } else if (ageMonths >= 79 && ageMonths < 80) {
          L = -3.321785992;
          M = 15.44042439;
          S = 0.088166744;
        } else if (ageMonths >= 80 && ageMonths < 81) {
          L = -3.326345795;
          M = 15.45287581;
          S = 0.088942897;
        } else if (ageMonths >= 81 && ageMonths < 82) {
          L = -3.328602731;
          M = 15.46636218;
          S = 0.089728202;
        } else if (ageMonths >= 82 && ageMonths < 83) {
          L = -3.328725277;
          M = 15.48086704;
          S = 0.090521875;
        } else if (ageMonths >= 83 && ageMonths < 84) {
          L = -3.32687018;
          M = 15.49637465;
          S = 0.091323162;
        } else if (ageMonths >= 84 && ageMonths < 85) {
          L = -3.323188896;
          M = 15.51286936;
          S = 0.092131305;
        } else if (ageMonths >= 85 && ageMonths < 86) {
          L = -3.317827016;
          M = 15.53033563;
          S = 0.092945544;
        } else if (ageMonths >= 86 && ageMonths < 87) {
          L = -3.310923871;
          M = 15.54875807;
          S = 0.093765118;
        } else if (ageMonths >= 87 && ageMonths < 88) {
          L = -3.302612272;
          M = 15.56812143;
          S = 0.09458927;
        } else if (ageMonths >= 88 && ageMonths < 89) {
          L = -3.293018361;
          M = 15.58841065;
          S = 0.095417247;
        } else if (ageMonths >= 89 && ageMonths < 90) {
          L = -3.282260813;
          M = 15.60961101;
          S = 0.096248301;
        } else if (ageMonths >= 90 && ageMonths < 91) {
          L = -3.270454609;
          M = 15.63170735;
          S = 0.097081694;
        } else if (ageMonths >= 91 && ageMonths < 92) {
          L = -3.257703616;
          M = 15.65468563;
          S = 0.097916698;
        } else if (ageMonths >= 92 && ageMonths < 93) {
          L = -3.244108214;
          M = 15.67853139;
          S = 0.098752593;
        } else if (ageMonths >= 93 && ageMonths < 94) {
          L = -3.229761713;
          M = 15.70323052;
          S = 0.099588675;
        } else if (ageMonths >= 94 && ageMonths < 95) {
          L = -3.214751287;
          M = 15.72876911;
          S = 0.100424251;
        } else if (ageMonths >= 95 && ageMonths < 96) {
          L = -3.199158184;
          M = 15.75513347;
          S = 0.101258643;
        } else if (ageMonths >= 96 && ageMonths < 97) {
          L = -3.18305795;
          M = 15.78231007;
          S = 0.102091189;
        } else if (ageMonths >= 97 && ageMonths < 98) {
          L = -3.166520664;
          M = 15.8102856;
          S = 0.102921245;
        } else if (ageMonths >= 98 && ageMonths < 99) {
          L = -3.1496103;
          M = 15.83904708;
          S = 0.103748189;
        } else if (ageMonths >= 99 && ageMonths < 100) {
          L = -3.132389637;
          M = 15.86858123;
          S = 0.104571386;
        } else if (ageMonths >= 100 && ageMonths < 101) {
          L = -3.114911153;
          M = 15.89887562;
          S = 0.105390269;
        } else if (ageMonths >= 101 && ageMonths < 102) {
          L = -3.097226399;
          M = 15.92991765;
          S = 0.106204258;
        } else if (ageMonths >= 102 && ageMonths < 103) {
          L = -3.079383079;
          M = 15.96169481;
          S = 0.107012788;
        } else if (ageMonths >= 103 && ageMonths < 104) {
          L = -3.061423765;
          M = 15.99419489;
          S = 0.107815327;
        } else if (ageMonths >= 104 && ageMonths < 105) {
          L = -3.043386071;
          M = 16.02740607;
          S = 0.108611374;
        } else if (ageMonths >= 105 && ageMonths < 106) {
          L = -3.025310003;
          M = 16.0613159;
          S = 0.109400388;
        } else if (ageMonths >= 106 && ageMonths < 107) {
          L = -3.007225737;
          M = 16.09591292;
          S = 0.110181915;
        } else if (ageMonths >= 107 && ageMonths < 108) {
          L = -2.989164598;
          M = 16.13118532;
          S = 0.110955478;
        } else if (ageMonths >= 108 && ageMonths < 109) {
          L = -2.971148225;
          M = 16.16712234;
          S = 0.111720691;
        } else if (ageMonths >= 109 && ageMonths < 110) {
          L = -2.953208047;
          M = 16.20371168;
          S = 0.112477059;
        } else if (ageMonths >= 110 && ageMonths < 111) {
          L = -2.935363951;
          M = 16.24094239;
          S = 0.1132242;
        } else if (ageMonths >= 111 && ageMonths < 112) {
          L = -2.917635157;
          M = 16.27880346;
          S = 0.113961734;
        } else if (ageMonths >= 112 && ageMonths < 113) {
          L = -2.900039803;
          M = 16.31728385;
          S = 0.114689291;
        } else if (ageMonths >= 113 && ageMonths < 114) {
          L = -2.882593796;
          M = 16.35637267;
          S = 0.115406523;
        } else if (ageMonths >= 114 && ageMonths < 115) {
          L = -2.865311266;
          M = 16.39605916;
          S = 0.116113097;
        } else if (ageMonths >= 115 && ageMonths < 116) {
          L = -2.848204697;
          M = 16.43633265;
          S = 0.116808702;
        } else if (ageMonths >= 116 && ageMonths < 117) {
          L = -2.831285052;
          M = 16.47718256;
          S = 0.117493042;
        } else if (ageMonths >= 117 && ageMonths < 118) {
          L = -2.81456189;
          M = 16.51859843;
          S = 0.11816584;
        } else if (ageMonths >= 118 && ageMonths < 119) {
          L = -2.79804347;
          M = 16.56056987;
          S = 0.118826835;
        } else if (ageMonths >= 119 && ageMonths < 120) {
          L = -2.781736856;
          M = 16.60308661;
          S = 0.119475785;
        } else if (ageMonths >= 120 && ageMonths < 121) {
          L = -2.765648008;
          M = 16.64613844;
          S = 0.120112464;
        } else if (ageMonths >= 121 && ageMonths < 122) {
          L = -2.749782197;
          M = 16.68971518;
          S = 0.120736656;
        } else if (ageMonths >= 122 && ageMonths < 123) {
          L = -2.734142443;
          M = 16.73380695;
          S = 0.121348181;
        } else if (ageMonths >= 123 && ageMonths < 124) {
          L = -2.718732873;
          M = 16.77840363;
          S = 0.121946849;
        } else if (ageMonths >= 124 && ageMonths < 125) {
          L = -2.703555506;
          M = 16.82349538;
          S = 0.122532501;
        } else if (ageMonths >= 125 && ageMonths < 126) {
          L = -2.688611957;
          M = 16.86907238;
          S = 0.123104991;
        } else if (ageMonths >= 126 && ageMonths < 127) {
          L = -2.673903164;
          M = 16.91512487;
          S = 0.123664186;
        } else if (ageMonths >= 127 && ageMonths < 128) {
          L = -2.659429443;
          M = 16.96164317;
          S = 0.124209969;
        } else if (ageMonths >= 128 && ageMonths < 129) {
          L = -2.645190534;
          M = 17.00861766;
          S = 0.124742239;
        } else if (ageMonths >= 129 && ageMonths < 130) {
          L = -2.631185649;
          M = 17.05603879;
          S = 0.125260905;
        } else if (ageMonths >= 130 && ageMonths < 131) {
          L = -2.617413511;
          M = 17.10389705;
          S = 0.125765895;
        } else if (ageMonths >= 131 && ageMonths < 132) {
          L = -2.603872392;
          M = 17.15218302;
          S = 0.126257147;
        } else if (ageMonths >= 132 && ageMonths < 133) {
          L = -2.590560148;
          M = 17.20088732;
          S = 0.126734613;
        } else if (ageMonths >= 133 && ageMonths < 134) {
          L = -2.577474253;
          M = 17.25000062;
          S = 0.12719826;
        } else if (ageMonths >= 134 && ageMonths < 135) {
          L = -2.564611831;
          M = 17.29951367;
          S = 0.127648067;
        } else if (ageMonths >= 135 && ageMonths < 136) {
          L = -2.551969684;
          M = 17.34941726;
          S = 0.128084023;
        } else if (ageMonths >= 136 && ageMonths < 137) {
          L = -2.539539972;
          M = 17.39970308;
          S = 0.128506192;
        } else if (ageMonths >= 137 && ageMonths < 138) {
          L = -2.527325681;
          M = 17.45036072;
          S = 0.128914497;
        } else if (ageMonths >= 138 && ageMonths < 139) {
          L = -2.515320235;
          M = 17.50138161;
          S = 0.129309001;
        } else if (ageMonths >= 139 && ageMonths < 140) {
          L = -2.503519447;
          M = 17.55275674;
          S = 0.129689741;
        } else if (ageMonths >= 140 && ageMonths < 141) {
          L = -2.491918934;
          M = 17.60447714;
          S = 0.130056765;
        } else if (ageMonths >= 141 && ageMonths < 142) {
          L = -2.480514136;
          M = 17.6565339;
          S = 0.130410133;
        } else if (ageMonths >= 142 && ageMonths < 143) {
          L = -2.469300331;
          M = 17.70891811;
          S = 0.130749913;
        } else if (ageMonths >= 143 && ageMonths < 144) {
          L = -2.458272656;
          M = 17.76162094;
          S = 0.131076187;
        } else if (ageMonths >= 144 && ageMonths < 145) {
          L = -2.447426113;
          M = 17.81463359;
          S = 0.131389042;
        } else if (ageMonths >= 145 && ageMonths < 146) {
          L = -2.436755595;
          M = 17.86794729;
          S = 0.131688579;
        } else if (ageMonths >= 146 && ageMonths < 147) {
          L = -2.426255887;
          M = 17.92155332;
          S = 0.131974905;
        } else if (ageMonths >= 147 && ageMonths < 148) {
          L = -2.415921689;
          M = 17.97544299;
          S = 0.132248138;
        } else if (ageMonths >= 148 && ageMonths < 149) {
          L = -2.405747619;
          M = 18.02960765;
          S = 0.132508403;
        } else if (ageMonths >= 149 && ageMonths < 150) {
          L = -2.395728233;
          M = 18.08403868;
          S = 0.132755834;
        } else if (ageMonths >= 150 && ageMonths < 151) {
          L = -2.385858029;
          M = 18.1387275;
          S = 0.132990575;
        } else if (ageMonths >= 151 && ageMonths < 152) {
          L = -2.376131459;
          M = 18.19366555;
          S = 0.133212776;
        } else if (ageMonths >= 152 && ageMonths < 153) {
          L = -2.366542942;
          M = 18.24884431;
          S = 0.133422595;
        } else if (ageMonths >= 153 && ageMonths < 154) {
          L = -2.357086871;
          M = 18.3042553;
          S = 0.133620197;
        } else if (ageMonths >= 154 && ageMonths < 155) {
          L = -2.347757625;
          M = 18.35989003;
          S = 0.133805756;
        } else if (ageMonths >= 155 && ageMonths < 156) {
          L = -2.338549576;
          M = 18.41574009;
          S = 0.133979452;
        } else if (ageMonths >= 156 && ageMonths < 157) {
          L = -2.3294571;
          M = 18.47179706;
          S = 0.13414147;
        } else if (ageMonths >= 157 && ageMonths < 158) {
          L = -2.320474586;
          M = 18.52805255;
          S = 0.134292005;
        } else if (ageMonths >= 158 && ageMonths < 159) {
          L = -2.311596446;
          M = 18.5844982;
          S = 0.134431256;
        } else if (ageMonths >= 159 && ageMonths < 160) {
          L = -2.302817124;
          M = 18.64112567;
          S = 0.134559427;
        } else if (ageMonths >= 160 && ageMonths < 161) {
          L = -2.294131107;
          M = 18.69792663;
          S = 0.134676731;
        } else if (ageMonths >= 161 && ageMonths < 162) {
          L = -2.285532933;
          M = 18.75489278;
          S = 0.134783385;
        } else if (ageMonths >= 162 && ageMonths < 163) {
          L = -2.277017201;
          M = 18.81201584;
          S = 0.134879611;
        } else if (ageMonths >= 163 && ageMonths < 164) {
          L = -2.268578584;
          M = 18.86928753;
          S = 0.134965637;
        } else if (ageMonths >= 164 && ageMonths < 165) {
          L = -2.260211837;
          M = 18.92669959;
          S = 0.135041695;
        } else if (ageMonths >= 165 && ageMonths < 166) {
          L = -2.251911809;
          M = 18.98424378;
          S = 0.135108024;
        } else if (ageMonths >= 166 && ageMonths < 167) {
          L = -2.243673453;
          M = 19.04191185;
          S = 0.135164867;
        } else if (ageMonths >= 167 && ageMonths < 168) {
          L = -2.235491842;
          M = 19.09969557;
          S = 0.135212469;
        } else if (ageMonths >= 168 && ageMonths < 169) {
          L = -2.227362173;
          M = 19.15758672;
          S = 0.135251083;
        } else if (ageMonths >= 169 && ageMonths < 170) {
          L = -2.21927979;
          M = 19.21557707;
          S = 0.135280963;
        } else if (ageMonths >= 170 && ageMonths < 171) {
          L = -2.211240187;
          M = 19.27365839;
          S = 0.135302371;
        } else if (ageMonths >= 171 && ageMonths < 172) {
          L = -2.203239029;
          M = 19.33182247;
          S = 0.135315568;
        } else if (ageMonths >= 172 && ageMonths < 173) {
          L = -2.195272161;
          M = 19.39006106;
          S = 0.135320824;
        } else if (ageMonths >= 173 && ageMonths < 174) {
          L = -2.187335625;
          M = 19.44836594;
          S = 0.135318407;
        } else if (ageMonths >= 174 && ageMonths < 175) {
          L = -2.179425674;
          M = 19.50672885;
          S = 0.135308594;
        } else if (ageMonths >= 175 && ageMonths < 176) {
          L = -2.171538789;
          M = 19.56514153;
          S = 0.135291662;
        } else if (ageMonths >= 176 && ageMonths < 177) {
          L = -2.163671689;
          M = 19.62359571;
          S = 0.135267891;
        } else if (ageMonths >= 177 && ageMonths < 178) {
          L = -2.155821357;
          M = 19.6820831;
          S = 0.135237567;
        } else if (ageMonths >= 178 && ageMonths < 179) {
          L = -2.147985046;
          M = 19.74059538;
          S = 0.135200976;
        } else if (ageMonths >= 179 && ageMonths < 180) {
          L = -2.140160305;
          M = 19.7991242;
          S = 0.135158409;
        } else if (ageMonths >= 180 && ageMonths < 181) {
          L = -2.132344989;
          M = 19.85766121;
          S = 0.135110159;
        } else if (ageMonths >= 181 && ageMonths < 182) {
          L = -2.124537282;
          M = 19.916198;
          S = 0.135056522;
        } else if (ageMonths >= 182 && ageMonths < 183) {
          L = -2.116735712;
          M = 19.97472615;
          S = 0.134997797;
        } else if (ageMonths >= 183 && ageMonths < 184) {
          L = -2.108939167;
          M = 20.03323719;
          S = 0.134934285;
        } else if (ageMonths >= 184 && ageMonths < 185) {
          L = -2.10114692;
          M = 20.09172262;
          S = 0.134866291;
        } else if (ageMonths >= 185 && ageMonths < 186) {
          L = -2.093358637;
          M = 20.15017387;
          S = 0.134794121;
        } else if (ageMonths >= 186 && ageMonths < 187) {
          L = -2.085574403;
          M = 20.20858236;
          S = 0.134718085;
        } else if (ageMonths >= 187 && ageMonths < 188) {
          L = -2.077794735;
          M = 20.26693944;
          S = 0.134638494;
        } else if (ageMonths >= 188 && ageMonths < 189) {
          L = -2.070020599;
          M = 20.32523642;
          S = 0.134555663;
        } else if (ageMonths >= 189 && ageMonths < 190) {
          L = -2.062253431;
          M = 20.38346455;
          S = 0.13446991;
        } else if (ageMonths >= 190 && ageMonths < 191) {
          L = -2.054495145;
          M = 20.44161501;
          S = 0.134381553;
        } else if (ageMonths >= 191 && ageMonths < 192) {
          L = -2.046748156;
          M = 20.49967894;
          S = 0.134290916;
        } else if (ageMonths >= 192 && ageMonths < 193) {
          L = -2.039015385;
          M = 20.5576474;
          S = 0.134198323;
        } else if (ageMonths >= 193 && ageMonths < 194) {
          L = -2.031300282;
          M = 20.6155114;
          S = 0.134104101;
        } else if (ageMonths >= 194 && ageMonths < 195) {
          L = -2.023606828;
          M = 20.67326189;
          S = 0.134008581;
        } else if (ageMonths >= 195 && ageMonths < 196) {
          L = -2.015942013;
          M = 20.73088905;
          S = 0.133912066;
        } else if (ageMonths >= 196 && ageMonths < 197) {
          L = -2.008305745;
          M = 20.7883851;
          S = 0.133814954;
        } else if (ageMonths >= 197 && ageMonths < 198) {
          L = -2.000706389;
          M = 20.84574003;
          S = 0.133717552;
        } else if (ageMonths >= 198 && ageMonths < 199) {
          L = -1.993150137;
          M = 20.90294449;
          S = 0.1336202;
        } else if (ageMonths >= 199 && ageMonths < 200) {
          L = -1.985643741;
          M = 20.95998909;
          S = 0.133523244;
        } else if (ageMonths >= 200 && ageMonths < 201) {
          L = -1.97819451;
          M = 21.01686433;
          S = 0.133427032;
        } else if (ageMonths >= 201 && ageMonths < 202) {
          L = -1.970810308;
          M = 21.07356067;
          S = 0.133331914;
        } else if (ageMonths >= 202 && ageMonths < 203) {
          L = -1.96349954;
          M = 21.1300685;
          S = 0.133238245;
        } else if (ageMonths >= 203 && ageMonths < 204) {
          L = -1.956271141;
          M = 21.18637813;
          S = 0.133146383;
        } else if (ageMonths >= 204 && ageMonths < 205) {
          L = -1.949134561;
          M = 21.24247982;
          S = 0.13305669;
        } else if (ageMonths >= 205 && ageMonths < 206) {
          L = -1.942099744;
          M = 21.29836376;
          S = 0.132969531;
        } else if (ageMonths >= 206 && ageMonths < 207) {
          L = -1.935177101;
          M = 21.35402009;
          S = 0.132885274;
        } else if (ageMonths >= 207 && ageMonths < 208) {
          L = -1.92837748;
          M = 21.40943891;
          S = 0.132804292;
        } else if (ageMonths >= 208 && ageMonths < 209) {
          L = -1.921712136;
          M = 21.46461026;
          S = 0.132726962;
        } else if (ageMonths >= 209 && ageMonths < 210) {
          L = -1.915192685;
          M = 21.51952414;
          S = 0.132653664;
        } else if (ageMonths >= 210 && ageMonths < 211) {
          L = -1.908831065;
          M = 21.57417053;
          S = 0.132584784;
        } else if (ageMonths >= 211 && ageMonths < 212) {
          L = -1.902639482;
          M = 21.62853937;
          S = 0.132520711;
        } else if (ageMonths >= 212 && ageMonths < 213) {
          L = -1.896630358;
          M = 21.68262062;
          S = 0.132461838;
        } else if (ageMonths >= 213 && ageMonths < 214) {
          L = -1.890816268;
          M = 21.73640419;
          S = 0.132408563;
        } else if (ageMonths >= 214 && ageMonths < 215) {
          L = -1.885209876;
          M = 21.78988003;
          S = 0.132361289;
        } else if (ageMonths >= 215 && ageMonths < 216) {
          L = -1.879823505;
          M = 21.84303819;
          S = 0.132320427;
        } else if (ageMonths >= 216 && ageMonths < 217) {
          L = -1.874670324;
          M = 21.8958685;
          S = 0.132286382;
        } else if (ageMonths >= 217 && ageMonths < 218) {
          L = -1.869760299;
          M = 21.94836168;
          S = 0.1322596;
        } else if (ageMonths >= 218 && ageMonths < 219) {
          L = -1.865113245;
          M = 22.00050569;
          S = 0.132240418;
        } else if (ageMonths >= 219 && ageMonths < 220) {
          L = -1.860734944;
          M = 22.05229242;
          S = 0.13222933;
        } else if (ageMonths >= 220 && ageMonths < 221) {
          L = -1.85663384;
          M = 22.10371305;
          S = 0.132226801;
        } else if (ageMonths >= 221 && ageMonths < 222) {
          L = -1.852827186;
          M = 22.15475603;
          S = 0.132233201;
        } else if (ageMonths >= 222 && ageMonths < 223) {
          L = -1.849323204;
          M = 22.20541249;
          S = 0.132248993;
        } else if (ageMonths >= 223 && ageMonths < 224) {
          L = -1.846131607;
          M = 22.255673;
          S = 0.132274625;
        } else if (ageMonths >= 224 && ageMonths < 225) {
          L = -1.843261294;
          M = 22.30552831;
          S = 0.132310549;
        } else if (ageMonths >= 225 && ageMonths < 226) {
          L = -1.840720248;
          M = 22.3549693;
          S = 0.132357221;
        } else if (ageMonths >= 226 && ageMonths < 227) {
          L = -1.83851544;
          M = 22.40398706;
          S = 0.132415103;
        } else if (ageMonths >= 227 && ageMonths < 228) {
          L = -1.83665586;
          M = 22.45257182;
          S = 0.132484631;
        } else if (ageMonths >= 228 && ageMonths < 229) {
          L = -1.835138046;
          M = 22.50071778;
          S = 0.132566359;
        } else if (ageMonths >= 229 && ageMonths < 230) {
          L = -1.833972004;
          M = 22.54841437;
          S = 0.132660699;
        } else if (ageMonths >= 230 && ageMonths < 231) {
          L = -1.833157751;
          M = 22.59565422;
          S = 0.132768153;
        } else if (ageMonths >= 231 && ageMonths < 232) {
          L = -1.83269562;
          M = 22.64242956;
          S = 0.132889211;
        } else if (ageMonths >= 232 && ageMonths < 233) {
          L = -1.832584342;
          M = 22.68873292;
          S = 0.133024368;
        } else if (ageMonths >= 233 && ageMonths < 234) {
          L = -1.832820974;
          M = 22.73455713;
          S = 0.133174129;
        } else if (ageMonths >= 234 && ageMonths < 235) {
          L = -1.833400825;
          M = 22.7798953;
          S = 0.133338999;
        } else if (ageMonths >= 235 && ageMonths < 236) {
          L = -1.834317405;
          M = 22.82474087;
          S = 0.133519496;
        } else if (ageMonths >= 236 && ageMonths < 237) {
          L = -1.83555752;
          M = 22.86908912;
          S = 0.133716192;
        } else if (ageMonths >= 237 && ageMonths < 238) {
          L = -1.837119466;
          M = 22.91293151;
          S = 0.133929525;
        } else if (ageMonths >= 238 && ageMonths < 239) {
          L = -1.838987063;
          M = 22.95626373;
          S = 0.134160073;
        } else if (ageMonths >= 239 && ageMonths < 240) {
          L = -1.841146139;
          M = 22.99908062;
          S = 0.134408381;
        } else if (ageMonths >= 240 && ageMonths < 241) {
          L = -1.843580575;
          M = 23.04137734;
          S = 0.134675001;
        }
        zScore = (Math.pow(roundBmi / M, L) - 1) / (L * S);
      }

      if (gender == "Female") {
        if (ageMonths >= 24 && ageMonths < 25) {
          L = -1.024496827;
          M = 16.38804056;
          S = 0.085025838;
        } else if (ageMonths >= 25 && ageMonths < 26) {
          L = -1.102698353;
          M = 16.3189719;
          S = 0.084214052;
        } else if (ageMonths >= 26 && ageMonths < 27) {
          L = -1.18396635;
          M = 16.25207985;
          S = 0.083455124;
        } else if (ageMonths >= 27 && ageMonths < 28) {
          L = -1.268071036;
          M = 16.18734669;
          S = 0.082748284;
        } else if (ageMonths >= 28 && ageMonths < 29) {
          L = -1.354751525;
          M = 16.12475448;
          S = 0.082092737;
        } else if (ageMonths >= 29 && ageMonths < 30) {
          L = -1.443689692;
          M = 16.06428762;
          S = 0.081487717;
        } else if (ageMonths >= 30 && ageMonths < 31) {
          L = -1.53454192;
          M = 16.00593001;
          S = 0.080932448;
        } else if (ageMonths >= 31 && ageMonths < 32) {
          L = -1.626928093;
          M = 15.94966631;
          S = 0.080426175;
        } else if (ageMonths >= 32 && ageMonths < 33) {
          L = -1.720434829;
          M = 15.89548197;
          S = 0.079968176;
        } else if (ageMonths >= 33 && ageMonths < 34) {
          L = -1.814635262;
          M = 15.84336179;
          S = 0.079557735;
        } else if (ageMonths >= 34 && ageMonths < 35) {
          L = -1.909076262;
          M = 15.79329146;
          S = 0.079194187;
        } else if (ageMonths >= 35 && ageMonths < 36) {
          L = -2.003296102;
          M = 15.7452564;
          S = 0.078876895;
        } else if (ageMonths >= 36 && ageMonths < 37) {
          L = -2.096828937;
          M = 15.69924188;
          S = 0.078605255;
        } else if (ageMonths >= 37 && ageMonths < 38) {
          L = -2.189211877;
          M = 15.65523282;
          S = 0.078378696;
        } else if (ageMonths >= 38 && ageMonths < 39) {
          L = -2.279991982;
          M = 15.61321371;
          S = 0.078196674;
        } else if (ageMonths >= 39 && ageMonths < 40) {
          L = -2.368732949;
          M = 15.57316843;
          S = 0.078058667;
        } else if (ageMonths >= 40 && ageMonths < 41) {
          L = -2.455021314;
          M = 15.53508019;
          S = 0.077964169;
        } else if (ageMonths >= 41 && ageMonths < 42) {
          L = -2.538471972;
          M = 15.49893145;
          S = 0.077912684;
        } else if (ageMonths >= 42 && ageMonths < 43) {
          L = -2.618732901;
          M = 15.46470384;
          S = 0.077903716;
        } else if (ageMonths >= 43 && ageMonths < 44) {
          L = -2.695488973;
          M = 15.43237817;
          S = 0.077936763;
        } else if (ageMonths >= 44 && ageMonths < 45) {
          L = -2.768464816;
          M = 15.40193436;
          S = 0.078011309;
        } else if (ageMonths >= 45 && ageMonths < 46) {
          L = -2.837426693;
          M = 15.37335154;
          S = 0.078126817;
        } else if (ageMonths >= 46 && ageMonths < 47) {
          L = -2.902178205;
          M = 15.34660842;
          S = 0.078282739;
        } else if (ageMonths >= 47 && ageMonths < 48) {
          L = -2.962580386;
          M = 15.32168181;
          S = 0.078478449;
        } else if (ageMonths >= 48 && ageMonths < 49) {
          L = -3.018521987;
          M = 15.29854897;
          S = 0.078713325;
        } else if (ageMonths >= 49 && ageMonths < 50) {
          L = -3.069936555;
          M = 15.27718618;
          S = 0.078986694;
        } else if (ageMonths >= 50 && ageMonths < 51) {
          L = -3.116795864;
          M = 15.2575692;
          S = 0.079297841;
        } else if (ageMonths >= 51 && ageMonths < 52) {
          L = -3.159107331;
          M = 15.23967338;
          S = 0.079646006;
        } else if (ageMonths >= 52 && ageMonths < 53) {
          L = -3.196911083;
          M = 15.22347371;
          S = 0.080030389;
        } else if (ageMonths >= 53 && ageMonths < 54) {
          L = -3.230276759;
          M = 15.20894491;
          S = 0.080450145;
        } else if (ageMonths >= 54 && ageMonths < 55) {
          L = -3.259300182;
          M = 15.19606152;
          S = 0.080904391;
        } else if (ageMonths >= 55 && ageMonths < 56) {
          L = -3.284099963;
          M = 15.18479799;
          S = 0.081392203;
        } else if (ageMonths >= 56 && ageMonths < 57) {
          L = -3.30481415;
          M = 15.17512871;
          S = 0.081912623;
        } else if (ageMonths >= 57 && ageMonths < 58) {
          L = -3.321596954;
          M = 15.16702811;
          S = 0.082464661;
        } else if (ageMonths >= 58 && ageMonths < 59) {
          L = -3.334615646;
          M = 15.16047068;
          S = 0.083047295;
        } else if (ageMonths >= 59 && ageMonths < 60) {
          L = -3.344047622;
          M = 15.15543107;
          S = 0.083659478;
        } else if (ageMonths >= 60 && ageMonths < 61) {
          L = -3.35007771;
          M = 15.15188405;
          S = 0.084300139;
        } else if (ageMonths >= 61 && ageMonths < 62) {
          L = -3.352893805;
          M = 15.14980479;
          S = 0.0849682;
        } else if (ageMonths >= 62 && ageMonths < 63) {
          L = -3.352691376;
          M = 15.14916825;
          S = 0.085662539;
        } else if (ageMonths >= 63 && ageMonths < 64) {
          L = -3.34966438;
          M = 15.14994984;
          S = 0.086382035;
        } else if (ageMonths >= 64 && ageMonths < 65) {
          L = -3.343998803;
          M = 15.15212585;
          S = 0.087125591;
        } else if (ageMonths >= 65 && ageMonths < 66) {
          L = -3.335889574;
          M = 15.15567186;
          S = 0.087892047;
        } else if (ageMonths >= 66 && ageMonths < 67) {
          L = -3.325522491;
          M = 15.16056419;
          S = 0.088680264;
        } else if (ageMonths >= 67 && ageMonths < 68) {
          L = -3.31307846;
          M = 15.16677947;
          S = 0.089489106;
        } else if (ageMonths >= 68 && ageMonths < 69) {
          L = -3.298732648;
          M = 15.17429464;
          S = 0.090317434;
        } else if (ageMonths >= 69 && ageMonths < 70) {
          L = -3.282653831;
          M = 15.18308694;
          S = 0.091164117;
        } else if (ageMonths >= 70 && ageMonths < 71) {
          L = -3.265003896;
          M = 15.1931339;
          S = 0.092028028;
        } else if (ageMonths >= 71 && ageMonths < 72) {
          L = -3.245937506;
          M = 15.20441335;
          S = 0.092908048;
        } else if (ageMonths >= 72 && ageMonths < 73) {
          L = -3.225606516;
          M = 15.21690296;
          S = 0.093803033;
        } else if (ageMonths >= 73 && ageMonths < 74) {
          L = -3.204146115;
          M = 15.2305815;
          S = 0.094711916;
        } else if (ageMonths >= 74 && ageMonths < 75) {
          L = -3.181690237;
          M = 15.24542745;
          S = 0.095633595;
        } else if (ageMonths >= 75 && ageMonths < 76) {
          L = -3.158363475;
          M = 15.26141966;
          S = 0.096566992;
        } else if (ageMonths >= 76 && ageMonths < 77) {
          L = -3.134282833;
          M = 15.27853728;
          S = 0.097511046;
        } else if (ageMonths >= 77 && ageMonths < 78) {
          L = -3.109557879;
          M = 15.29675967;
          S = 0.09846471;
        } else if (ageMonths >= 78 && ageMonths < 79) {
          L = -3.084290931;
          M = 15.31606644;
          S = 0.099426955;
        } else if (ageMonths >= 79 && ageMonths < 80) {
          L = -3.058577292;
          M = 15.33643745;
          S = 0.100396769;
        } else if (ageMonths >= 80 && ageMonths < 81) {
          L = -3.032505499;
          M = 15.35785274;
          S = 0.101373159;
        } else if (ageMonths >= 81 && ageMonths < 82) {
          L = -3.0061576;
          M = 15.38029261;
          S = 0.10235515;
        } else if (ageMonths >= 82 && ageMonths < 83) {
          L = -2.979609448;
          M = 15.40373754;
          S = 0.103341788;
        } else if (ageMonths >= 83 && ageMonths < 84) {
          L = -2.952930993;
          M = 15.42816819;
          S = 0.104332139;
        } else if (ageMonths >= 84 && ageMonths < 85) {
          L = -2.926186592;
          M = 15.45356545;
          S = 0.105325289;
        } else if (ageMonths >= 85 && ageMonths < 86) {
          L = -2.899435307;
          M = 15.47991037;
          S = 0.106320346;
        } else if (ageMonths >= 86 && ageMonths < 87) {
          L = -2.872731211;
          M = 15.50718419;
          S = 0.10731644;
        } else if (ageMonths >= 87 && ageMonths < 88) {
          L = -2.846123683;
          M = 15.53536829;
          S = 0.108312721;
        } else if (ageMonths >= 88 && ageMonths < 89) {
          L = -2.819657704;
          M = 15.56444426;
          S = 0.109308364;
        } else if (ageMonths >= 89 && ageMonths < 90) {
          L = -2.793374145;
          M = 15.5943938;
          S = 0.110302563;
        } else if (ageMonths >= 90 && ageMonths < 91) {
          L = -2.767310047;
          M = 15.6251988;
          S = 0.111294537;
        } else if (ageMonths >= 91 && ageMonths < 92) {
          L = -2.741498897;
          M = 15.65684126;
          S = 0.112283526;
        } else if (ageMonths >= 92 && ageMonths < 93) {
          L = -2.715970894;
          M = 15.68930333;
          S = 0.113268793;
        } else if (ageMonths >= 93 && ageMonths < 94) {
          L = -2.690753197;
          M = 15.7225673;
          S = 0.114249622;
        } else if (ageMonths >= 94 && ageMonths < 95) {
          L = -2.665870146;
          M = 15.75661555;
          S = 0.115225321;
        } else if (ageMonths >= 95 && ageMonths < 96) {
          L = -2.641343436;
          M = 15.79143062;
          S = 0.116195218;
        } else if (ageMonths >= 96 && ageMonths < 97) {
          L = -2.617192204;
          M = 15.82699517;
          S = 0.117158667;
        } else if (ageMonths >= 97 && ageMonths < 98) {
          L = -2.593430614;
          M = 15.86329241;
          S = 0.118115073;
        } else if (ageMonths >= 98 && ageMonths < 99) {
          L = -2.570076037;
          M = 15.90030484;
          S = 0.119063807;
        } else if (ageMonths >= 99 && ageMonths < 100) {
          L = -2.547141473;
          M = 15.93801545;
          S = 0.12000429;
        } else if (ageMonths >= 100 && ageMonths < 101) {
          L = -2.524635245;
          M = 15.97640787;
          S = 0.120935994;
        } else if (ageMonths >= 101 && ageMonths < 102) {
          L = -2.502569666;
          M = 16.01546483;
          S = 0.121858355;
        } else if (ageMonths >= 102 && ageMonths < 103) {
          L = -2.48095189;
          M = 16.05516984;
          S = 0.12277087;
        } else if (ageMonths >= 103 && ageMonths < 104) {
          L = -2.459785573;
          M = 16.09550688;
          S = 0.123673085;
        } else if (ageMonths >= 104 && ageMonths < 105) {
          L = -2.439080117;
          M = 16.13645881;
          S = 0.124564484;
        } else if (ageMonths >= 105 && ageMonths < 106) {
          L = -2.418838304;
          M = 16.17800955;
          S = 0.125444639;
        } else if (ageMonths >= 106 && ageMonths < 107) {
          L = -2.399063683;
          M = 16.22014281;
          S = 0.126313121;
        } else if (ageMonths >= 107 && ageMonths < 108) {
          L = -2.379756861;
          M = 16.26284277;
          S = 0.127169545;
        } else if (ageMonths >= 108 && ageMonths < 109) {
          L = -2.360920527;
          M = 16.30609316;
          S = 0.128013515;
        } else if (ageMonths >= 109 && ageMonths < 110) {
          L = -2.342557728;
          M = 16.34987759;
          S = 0.128844639;
        } else if (ageMonths >= 110 && ageMonths < 111) {
          L = -2.324663326;
          M = 16.39418118;
          S = 0.129662637;
        } else if (ageMonths >= 111 && ageMonths < 112) {
          L = -2.307240716;
          M = 16.43898741;
          S = 0.130467138;
        } else if (ageMonths >= 112 && ageMonths < 113) {
          L = -2.290287663;
          M = 16.48428082;
          S = 0.131257852;
        } else if (ageMonths >= 113 && ageMonths < 114) {
          L = -2.273803847;
          M = 16.53004554;
          S = 0.132034479;
        } else if (ageMonths >= 114 && ageMonths < 115) {
          L = -2.257782149;
          M = 16.57626713;
          S = 0.132796819;
        } else if (ageMonths >= 115 && ageMonths < 116) {
          L = -2.242227723;
          M = 16.62292864;
          S = 0.133544525;
        } else if (ageMonths >= 116 && ageMonths < 117) {
          L = -2.227132805;
          M = 16.67001572;
          S = 0.134277436;
        } else if (ageMonths >= 117 && ageMonths < 118) {
          L = -2.212495585;
          M = 16.71751288;
          S = 0.134995324;
        } else if (ageMonths >= 118 && ageMonths < 119) {
          L = -2.19831275;
          M = 16.76540496;
          S = 0.135697996;
        } else if (ageMonths >= 119 && ageMonths < 120) {
          L = -2.184580762;
          M = 16.81367689;
          S = 0.136385276;
        } else if (ageMonths >= 120 && ageMonths < 121) {
          L = -2.171295888;
          M = 16.86231366;
          S = 0.137057004;
        } else if (ageMonths >= 121 && ageMonths < 122) {
          L = -2.158454232;
          M = 16.91130036;
          S = 0.137713039;
        } else if (ageMonths >= 122 && ageMonths < 123) {
          L = -2.146051754;
          M = 16.96062216;
          S = 0.138353254;
        } else if (ageMonths >= 123 && ageMonths < 124) {
          L = -2.134084303;
          M = 17.0102643;
          S = 0.138977537;
        } else if (ageMonths >= 124 && ageMonths < 125) {
          L = -2.122547629;
          M = 17.06021213;
          S = 0.139585795;
        } else if (ageMonths >= 125 && ageMonths < 126) {
          L = -2.111437411;
          M = 17.11045106;
          S = 0.140177947;
        } else if (ageMonths >= 126 && ageMonths < 127) {
          L = -2.100749266;
          M = 17.16096656;
          S = 0.140753927;
        } else if (ageMonths >= 127 && ageMonths < 128) {
          L = -2.090478774;
          M = 17.21174424;
          S = 0.141313686;
        } else if (ageMonths >= 128 && ageMonths < 129) {
          L = -2.080621484;
          M = 17.26276973;
          S = 0.141857186;
        } else if (ageMonths >= 129 && ageMonths < 130) {
          L = -2.071172932;
          M = 17.31402878;
          S = 0.142384404;
        } else if (ageMonths >= 130 && ageMonths < 131) {
          L = -2.062128649;
          M = 17.3655072;
          S = 0.142895332;
        } else if (ageMonths >= 131 && ageMonths < 132) {
          L = -2.053484173;
          M = 17.4171909;
          S = 0.143389972;
        } else if (ageMonths >= 132 && ageMonths < 133) {
          L = -2.045235058;
          M = 17.46906585;
          S = 0.143868341;
        } else if (ageMonths >= 133 && ageMonths < 134) {
          L = -2.03737688;
          M = 17.52111811;
          S = 0.144330469;
        } else if (ageMonths >= 134 && ageMonths < 135) {
          L = -2.029906684;
          M = 17.57333347;
          S = 0.144776372;
        } else if (ageMonths >= 135 && ageMonths < 136) {
          L = -2.022817914;
          M = 17.62569869;
          S = 0.145206138;
        } else if (ageMonths >= 136 && ageMonths < 137) {
          L = -2.016107084;
          M = 17.67819987;
          S = 0.145619819;
        } else if (ageMonths >= 137 && ageMonths < 138) {
          L = -2.009769905;
          M = 17.7308234;
          S = 0.146017491;
        } else if (ageMonths >= 138 && ageMonths < 139) {
          L = -2.003802134;
          M = 17.78355575;
          S = 0.146399239;
        } else if (ageMonths >= 139 && ageMonths < 140) {
          L = -1.998199572;
          M = 17.83638347;
          S = 0.146765161;
        } else if (ageMonths >= 140 && ageMonths < 141) {
          L = -1.992958064;
          M = 17.88929321;
          S = 0.147115364;
        } else if (ageMonths >= 141 && ageMonths < 142) {
          L = -1.988073505;
          M = 17.94227168;
          S = 0.147449967;
        } else if (ageMonths >= 142 && ageMonths < 143) {
          L = -1.983541835;
          M = 17.9953057;
          S = 0.147769097;
        } else if (ageMonths >= 143 && ageMonths < 144) {
          L = -1.979359041;
          M = 18.04838216;
          S = 0.148072891;
        } else if (ageMonths >= 144 && ageMonths < 145) {
          L = -1.975521156;
          M = 18.10148804;
          S = 0.148361495;
        } else if (ageMonths >= 145 && ageMonths < 146) {
          L = -1.972024258;
          M = 18.15461039;
          S = 0.148635067;
        } else if (ageMonths >= 146 && ageMonths < 147) {
          L = -1.968864465;
          M = 18.20773639;
          S = 0.148893769;
        } else if (ageMonths >= 147 && ageMonths < 148) {
          L = -1.966037938;
          M = 18.26085325;
          S = 0.149137776;
        } else if (ageMonths >= 148 && ageMonths < 149) {
          L = -1.963540872;
          M = 18.31394832;
          S = 0.14936727;
        } else if (ageMonths >= 149 && ageMonths < 150) {
          L = -1.961369499;
          M = 18.36700902;
          S = 0.149582439;
        } else if (ageMonths >= 150 && ageMonths < 151) {
          L = -1.959520079;
          M = 18.42002284;
          S = 0.149783482;
        } else if (ageMonths >= 151 && ageMonths < 152) {
          L = -1.9579889;
          M = 18.47297739;
          S = 0.149970604;
        } else if (ageMonths >= 152 && ageMonths < 153) {
          L = -1.956772271;
          M = 18.52586035;
          S = 0.15014402;
        } else if (ageMonths >= 153 && ageMonths < 154) {
          L = -1.95586652;
          M = 18.57865951;
          S = 0.15030395;
        } else if (ageMonths >= 154 && ageMonths < 155) {
          L = -1.955267984;
          M = 18.63136275;
          S = 0.150450621;
        } else if (ageMonths >= 155 && ageMonths < 156) {
          L = -1.954973011;
          M = 18.68395801;
          S = 0.15058427;
        } else if (ageMonths >= 156 && ageMonths < 157) {
          L = -1.954977947;
          M = 18.73643338;
          S = 0.150705138;
        } else if (ageMonths >= 157 && ageMonths < 158) {
          L = -1.955279136;
          M = 18.788777;
          S = 0.150813475;
        } else if (ageMonths >= 158 && ageMonths < 159) {
          L = -1.955872909;
          M = 18.84097713;
          S = 0.150909535;
        } else if (ageMonths >= 159 && ageMonths < 160) {
          L = -1.956755579;
          M = 18.89302212;
          S = 0.150993582;
        } else if (ageMonths >= 160 && ageMonths < 161) {
          L = -1.957923436;
          M = 18.94490041;
          S = 0.151065883;
        } else if (ageMonths >= 161 && ageMonths < 162) {
          L = -1.959372737;
          M = 18.99660055;
          S = 0.151126714;
        } else if (ageMonths >= 162 && ageMonths < 163) {
          L = -1.9610997;
          M = 19.04811118;
          S = 0.151176355;
        } else if (ageMonths >= 163 && ageMonths < 164) {
          L = -1.963100496;
          M = 19.09942105;
          S = 0.151215094;
        } else if (ageMonths >= 164 && ageMonths < 165) {
          L = -1.96537124;
          M = 19.15051899;
          S = 0.151243223;
        } else if (ageMonths >= 165 && ageMonths < 166) {
          L = -1.967907983;
          M = 19.20139397;
          S = 0.151261042;
        } else if (ageMonths >= 166 && ageMonths < 167) {
          L = -1.970706706;
          M = 19.25203503;
          S = 0.151268855;
        } else if (ageMonths >= 167 && ageMonths < 168) {
          L = -1.973763307;
          M = 19.30243131;
          S = 0.151266974;
        } else if (ageMonths >= 168 && ageMonths < 169) {
          L = -1.977073595;
          M = 19.35257209;
          S = 0.151255713;
        } else if (ageMonths >= 169 && ageMonths < 170) {
          L = -1.980633277;
          M = 19.40244671;
          S = 0.151235395;
        } else if (ageMonths >= 170 && ageMonths < 171) {
          L = -1.984437954;
          M = 19.45204465;
          S = 0.151206347;
        } else if (ageMonths >= 171 && ageMonths < 172) {
          L = -1.988483106;
          M = 19.50135548;
          S = 0.151168902;
        } else if (ageMonths >= 172 && ageMonths < 173) {
          L = -1.992764085;
          M = 19.55036888;
          S = 0.151123398;
        } else if (ageMonths >= 173 && ageMonths < 174) {
          L = -1.997276103;
          M = 19.59907464;
          S = 0.15107018;
        } else if (ageMonths >= 174 && ageMonths < 175) {
          L = -2.002014224;
          M = 19.64746266;
          S = 0.151009595;
        } else if (ageMonths >= 175 && ageMonths < 176) {
          L = -2.00697335;
          M = 19.69552294;
          S = 0.150942;
        } else if (ageMonths >= 176 && ageMonths < 177) {
          L = -2.012148213;
          M = 19.7432456;
          S = 0.150867753;
        } else if (ageMonths >= 177 && ageMonths < 178) {
          L = -2.017533363;
          M = 19.79062086;
          S = 0.150787221;
        } else if (ageMonths >= 178 && ageMonths < 179) {
          L = -2.023123159;
          M = 19.83763907;
          S = 0.150700774;
        } else if (ageMonths >= 179 && ageMonths < 180) {
          L = -2.028911755;
          M = 19.88429066;
          S = 0.150608788;
        } else if (ageMonths >= 180 && ageMonths < 181) {
          L = -2.034893091;
          M = 19.9305662;
          S = 0.150511645;
        } else if (ageMonths >= 181 && ageMonths < 182) {
          L = -2.041060881;
          M = 19.97645636;
          S = 0.150409731;
        } else if (ageMonths >= 182 && ageMonths < 183) {
          L = -2.047408604;
          M = 20.02195192;
          S = 0.15030344;
        } else if (ageMonths >= 183 && ageMonths < 184) {
          L = -2.05392949;
          M = 20.06704377;
          S = 0.150193169;
        } else if (ageMonths >= 184 && ageMonths < 185) {
          L = -2.060616513;
          M = 20.11172291;
          S = 0.150079322;
        } else if (ageMonths >= 185 && ageMonths < 186) {
          L = -2.067462375;
          M = 20.15598047;
          S = 0.149962308;
        } else if (ageMonths >= 186 && ageMonths < 187) {
          L = -2.074459502;
          M = 20.19980767;
          S = 0.14984254;
        } else if (ageMonths >= 187 && ageMonths < 188) {
          L = -2.081600029;
          M = 20.24319586;
          S = 0.149720441;
        } else if (ageMonths >= 188 && ageMonths < 189) {
          L = -2.088875793;
          M = 20.28613648;
          S = 0.149596434;
        } else if (ageMonths >= 189 && ageMonths < 190) {
          L = -2.096278323;
          M = 20.32862109;
          S = 0.149470953;
        } else if (ageMonths >= 190 && ageMonths < 191) {
          L = -2.103798828;
          M = 20.37064138;
          S = 0.149344433;
        } else if (ageMonths >= 191 && ageMonths < 192) {
          L = -2.111428194;
          M = 20.41218911;
          S = 0.149217319;
        } else if (ageMonths >= 192 && ageMonths < 193) {
          L = -2.119156972;
          M = 20.45325617;
          S = 0.14909006;
        } else if (ageMonths >= 193 && ageMonths < 194) {
          L = -2.126975375;
          M = 20.49383457;
          S = 0.14896311;
        } else if (ageMonths >= 194 && ageMonths < 195) {
          L = -2.134873266;
          M = 20.5339164;
          S = 0.148836931;
        } else if (ageMonths >= 195 && ageMonths < 196) {
          L = -2.142840157;
          M = 20.57349387;
          S = 0.148711989;
        } else if (ageMonths >= 196 && ageMonths < 197) {
          L = -2.150865204;
          M = 20.61255929;
          S = 0.148588757;
        } else if (ageMonths >= 197 && ageMonths < 198) {
          L = -2.158937201;
          M = 20.65110506;
          S = 0.148467715;
        } else if (ageMonths >= 198 && ageMonths < 199) {
          L = -2.167044578;
          M = 20.6891237;
          S = 0.148349348;
        } else if (ageMonths >= 199 && ageMonths < 200) {
          L = -2.175176987;
          M = 20.72660728;
          S = 0.14823412;
        } else if (ageMonths >= 200 && ageMonths < 201) {
          L = -2.183317362;
          M = 20.76355011;
          S = 0.148122614;
        } else if (ageMonths >= 201 && ageMonths < 202) {
          L = -2.191457792;
          M = 20.79994337;
          S = 0.148015249;
        } else if (ageMonths >= 202 && ageMonths < 203) {
          L = -2.199583649;
          M = 20.83578051;
          S = 0.147912564;
        } else if (ageMonths >= 203 && ageMonths < 204) {
          L = -2.207681525;
          M = 20.87105449;
          S = 0.147815078;
        } else if (ageMonths >= 204 && ageMonths < 205) {
          L = -2.215737645;
          M = 20.90575839;
          S = 0.147723315;
        } else if (ageMonths >= 205 && ageMonths < 206) {
          L = -2.223739902;
          M = 20.93988477;
          S = 0.147637768;
        } else if (ageMonths >= 206 && ageMonths < 207) {
          L = -2.231667995;
          M = 20.97342858;
          S = 0.147559083;
        } else if (ageMonths >= 207 && ageMonths < 208) {
          L = -2.239511942;
          M = 21.00638171;
          S = 0.147487716;
        } else if (ageMonths >= 208 && ageMonths < 209) {
          L = -2.247257081;
          M = 21.0387374;
          S = 0.14742421;
        } else if (ageMonths >= 209 && ageMonths < 210) {
          L = -2.254885145;
          M = 21.07048996;
          S = 0.147369174;
        } else if (ageMonths >= 210 && ageMonths < 211) {
          L = -2.26238209;
          M = 21.10163241;
          S = 0.147323144;
        } else if (ageMonths >= 211 && ageMonths < 212) {
          L = -2.269731517;
          M = 21.13215845;
          S = 0.147286698;
        } else if (ageMonths >= 212 && ageMonths < 213) {
          L = -2.276917229;
          M = 21.16206171;
          S = 0.147260415;
        } else if (ageMonths >= 213 && ageMonths < 214) {
          L = -2.283925442;
          M = 21.1913351;
          S = 0.147244828;
        } else if (ageMonths >= 214 && ageMonths < 215) {
          L = -2.290731442;
          M = 21.21997472;
          S = 0.147240683;
        } else if (ageMonths >= 215 && ageMonths < 216) {
          L = -2.29732427;
          M = 21.24797262;
          S = 0.147248467;
        } else if (ageMonths >= 216 && ageMonths < 217) {
          L = -2.303687802;
          M = 21.27532239;
          S = 0.14726877;
        } else if (ageMonths >= 217 && ageMonths < 218) {
          L = -2.309799971;
          M = 21.30201933;
          S = 0.147302299;
        } else if (ageMonths >= 218 && ageMonths < 219) {
          L = -2.315651874;
          M = 21.32805489;
          S = 0.147349514;
        } else if (ageMonths >= 219 && ageMonths < 220) {
          L = -2.32121731;
          M = 21.35342563;
          S = 0.147411215;
        } else if (ageMonths >= 220 && ageMonths < 221) {
          L = -2.326481911;
          M = 21.37812462;
          S = 0.147487979;
        } else if (ageMonths >= 221 && ageMonths < 222) {
          L = -2.331428139;
          M = 21.40214589;
          S = 0.147580453;
        } else if (ageMonths >= 222 && ageMonths < 223) {
          L = -2.336038473;
          M = 21.42548351;
          S = 0.147689289;
        } else if (ageMonths >= 223 && ageMonths < 224) {
          L = -2.34029545;
          M = 21.44813156;
          S = 0.14781515;
        } else if (ageMonths >= 224 && ageMonths < 225) {
          L = -2.344181703;
          M = 21.47008412;
          S = 0.147958706;
        } else if (ageMonths >= 225 && ageMonths < 226) {
          L = -2.34768;
          M = 21.49133529;
          S = 0.148120633;
        } else if (ageMonths >= 226 && ageMonths < 227) {
          L = -2.350773286;
          M = 21.51187918;
          S = 0.148301619;
        } else if (ageMonths >= 227 && ageMonths < 228) {
          L = -2.353444725;
          M = 21.53170989;
          S = 0.148502355;
        } else if (ageMonths >= 228 && ageMonths < 229) {
          L = -2.355677743;
          M = 21.55082155;
          S = 0.148723546;
        } else if (ageMonths >= 229 && ageMonths < 230) {
          L = -2.35745607;
          M = 21.56920824;
          S = 0.148965902;
        } else if (ageMonths >= 230 && ageMonths < 231) {
          L = -2.358763788;
          M = 21.58686406;
          S = 0.149230142;
        } else if (ageMonths >= 231 && ageMonths < 232) {
          L = -2.359585369;
          M = 21.60378309;
          S = 0.149516994;
        } else if (ageMonths >= 232 && ageMonths < 233) {
          L = -2.359905726;
          M = 21.61995939;
          S = 0.149827195;
        } else if (ageMonths >= 233 && ageMonths < 234) {
          L = -2.359710258;
          M = 21.635387;
          S = 0.150161492;
        } else if (ageMonths >= 234 && ageMonths < 235) {
          L = -2.358980464;
          M = 21.65006126;
          S = 0.150520734;
        } else if (ageMonths >= 235 && ageMonths < 236) {
          L = -2.357714508;
          M = 21.6639727;
          S = 0.150905439;
        } else if (ageMonths >= 236 && ageMonths < 237) {
          L = -2.355892424;
          M = 21.67711736;
          S = 0.151316531;
        } else if (ageMonths >= 237 && ageMonths < 238) {
          L = -2.353501353;
          M = 21.68948935;
          S = 0.151754808;
        } else if (ageMonths >= 238 && ageMonths < 239) {
          L = -2.350528726;
          M = 21.70108288;
          S = 0.152221086;
        } else if (ageMonths >= 239 && ageMonths < 240) {
          L = -2.346962247;
          M = 21.71189225;
          S = 0.152716206;
        } else if (ageMonths >= 240 && ageMonths < 241) {
          L = -2.342796948;
          M = 21.72190973;
          S = 0.153240872;
        }
        zScore = (Math.pow(roundBmi / M, L) - 1) / (L * S);
      }

      const az = Math.abs(zScore);

      if (zScore < -3.09) {
        thisPercentile = 0.1;
      } else if (zScore > 3.09) {
        thisPercentile = 99.9;
      } else {
        thisPercentile = n[Math.round(az * 100)];
      }

      if (zScore < 0) {
        thisPercentile = 100 - thisPercentile;
      }

      thisPercentile = Math.round(thisPercentile * 10) / 10;

      let status, color, left;
      if (thisPercentile < 5) {
        status = "Underweight";
        param.tech_under = "bg-blue-800 text-white";
        color = "#20BEC8";
        left = "3";
      } else if (thisPercentile >= 5 && thisPercentile < 85) {
        status = "Healthy Weight";
        param.tech_healthy = "bg-green-800 text-white";
        color = "#10951D";
      } else if (thisPercentile >= 85 && thisPercentile < 95) {
        status = "Overweight";
        param.tech_over = "bg-turmeric text-white";
        color = "#CABE52";
      } else if (thisPercentile >= 95) {
        status = "Obese";
        param.tech_obese1 = "bg-red-800 text-white";
        color = "#FF0000";
      }

      if (thisPercentile >= 5 && thisPercentile < 10) {
        left = "13";
      }
      if (thisPercentile >= 10 && thisPercentile < 40) {
        left = "20";
      }
      if (thisPercentile >= 40 && thisPercentile < 60) {
        left = "30";
      }
      if (thisPercentile >= 60 && thisPercentile < 80) {
        left = "45";
      }
      if (thisPercentile >= 80 && thisPercentile < 85) {
        left = "48";
      }
      if (thisPercentile >= 85 && thisPercentile < 90) {
        left = "56";
      }
      if (thisPercentile >= 90 && thisPercentile < 95) {
        left = "70";
      }
      if (thisPercentile >= 95) {
        left = "82";
      }

      param.tech_child = "active";
      param.tech_BMI_kid = roundBmi;
      param.tech_percent = thisPercentile;
      param.tech_Status = status;
      param.tech_color = color;
      param.tech_left = left;
      param.tech_stage = stage;
      return param;
    } else {
      const convert_height = heightInInches;
      const BMI =
        Math.round(((weight * 703) / (convert_height * convert_height)) * 100) /
        100;
      const weight_lbs = weight / 2.205;
      const height_m = convert_height / 39.37;
      const PI = Math.round((weight_lbs / Math.pow(height_m, 3)) * 10) / 10;

      let status = "";
      let rotate = "";
      let color = "";
      let left = "";

      if (BMI <= 18.5) {
        status = "Underweight.";
        rotate = "-95";
        color = "#20BEC8";
        left = "2";
        result["tech_under"] = "bg-blue-800 text-white";
      } else if (BMI > 18.5 && BMI <= 24.9) {
        status = "Healthy Weight.";
        rotate = "-82";
        color = "#10951D";
        left = "26";
        result["tech_healthy"] = "bg-green-800 text-white";
      } else if (BMI > 24.9 && BMI <= 29.9) {
        status = "Overweight.";
        rotate = "-45";
        color = "#CABE52";
        left = "50";
        result["tech_over"] = "bg-turmeric text-white";
      } else if (BMI > 29.9 && BMI <= 34.9) {
        status = "Obese";
        rotate = "0";
        color = "#FF0000";
        left = "74";
        result["tech_obese1"] = "bg-red-800 text-white";
      } else if (BMI > 34.9 && BMI <= 39.9) {
        status = "Severely Obese.";
        rotate = "45";
        color = "#FF0000";
        left = "80";
        result["tech_obese2"] = "bg-red-800 text-white";
      } else {
        status = "Morbidly Obese.";
        rotate = "90";
        color = "#FF0000";
        left = "80";
        result["tech_obese3"] = "bg-red-800 text-white";
      }

      let Robinson, Miller, Devine, Hamwi;

      if (gender == "Female") {
        Robinson = Math.round(49 + 1.7 * (convert_height - 60));
        Miller = Math.round(53.1 + 1.36 * (convert_height - 60));
        Devine = Math.round(45.5 + 2.3 * (convert_height - 60));
        Hamwi = Math.round(45 + 2.2 * (convert_height - 60));
      } else {
        Robinson = Math.round(52 + 1.9 * (convert_height - 60));
        Miller = Math.round(56.2 + 1.41 * (convert_height - 60));
        Devine = Math.round(50 + 2.3 * (convert_height - 60));
        Hamwi = Math.round(48 + 2.7 * (convert_height - 60));
      }
      let ibw = "";
      if (unit_type === "lbs") {
        ibw = `${Math.round(Robinson * 2.205)} - ${Math.round(
          Hamwi * 2.205
        )} lbs`;
      } else if (unit_type === "kg") {
        ibw = `${Robinson} - ${Hamwi} kg`;
      }

      const heightFeet = Math.floor(ft_in / 12);
      const heightInch = ft_in % 12;

      // Return Values
      result["tech_BMI"] = BMI;
      result["tech_ibw"] = ibw;
      result["tech_PI"] = PI;
      result["tech_Add"] = "active";
      result["tech_Standerd"] = "active";
      result["tech_Feet"] = heightFeet;
      result["tech_Inch"] = heightInch;
      result["tech_Status"] = status;
      result["tech_Rotate"] = rotate;
      result["tech_color"] = color;
      result["tech_left"] = left;
      result["tech_stage"] = stage;
      return result;
    }
  }

  /**
   * getCalculationOvulationCalculator: Service Method
   * POST: /api/calculators-lol/pregnancy-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationPregnancyCalculator(body) {
    const param = {};
    let fieldsDone = 0;

    // Check if date is provided
    if (!body.tech_date) {
      param.error = "Please Fill All Fields.";
      return param;
    }

    fieldsDone = 1;
    const dop = body.tech_date; // Expected format: YYYY-MM-DD
    const dop2 = dop.split("-");

    // Convert month string to number
    let month = parseInt(dop2[1], 10);
    const year = parseInt(dop2[0], 10);
    const day = parseInt(dop2[2], 10);

    let ovu_date, modi_ageEsimated, due_date;
    let weeksRemaining, daysRemaining;

    if (body.tech_method == "Last") {
      // Last Menstrual Period method
      if (!body.tech_cycle) {
        param.error = "Please Fill All Fields.";
        return param;
      }

      const cycle = parseInt(body.tech_cycle, 10);
      const startDate = new Date(year, month - 1, day);

      // Calculate ovulation date
      const ovuDateTime = new Date(startDate);
      ovuDateTime.setDate(ovuDateTime.getDate() + cycle - 14);
      ovu_date = formatDate(ovuDateTime, "MMM dd, yyyy");

      // Calculate due date (ovulation + 266 days)
      const dueDateTime = new Date(ovuDateTime);
      dueDateTime.setDate(dueDateTime.getDate() + 266);
      modi_ageEsimated = formatDate(dueDateTime, "MMM dd, yyyy");

      // Calculate current pregnancy progress
      const bday = new Date(dueDateTime);
      bday.setDate(bday.getDate() - 280);
      const today = new Date();
      const diff = dateDiff(bday, today);

      const months = diff.months;
      if (months > 9) {
        param.error = "You are not pregnant yet.";
        return param;
      }

      const days = months * 30.417 + diff.days;
      weeksRemaining = Math.floor(days / 7);
      daysRemaining = Math.floor(days % 7);
    } else if (body.tech_method == "Due") {
      // Due Date method
      const dueDate = new Date(year, month - 1, day);

      // Calculate ovulation date (due date - 266 days)
      const ovuDateTime = new Date(dueDate);
      ovuDateTime.setDate(ovuDateTime.getDate() - 266);
      ovu_date = formatDate(ovuDateTime, "MMM dd, yyyy");

      due_date = formatDate(dueDate, "MMM dd, yyyy");
      modi_ageEsimated = formatDate(dueDate, "MM/dd/yyyy");

      // Calculate current pregnancy progress
      const bday = new Date(dueDate);
      bday.setDate(bday.getDate() - 280);
      const today = new Date();
      const diff = dateDiff(bday, today);

      const months = diff.months;

      if (months > 9) {
        param.error = "You are not pregnant yet.";
        return param;
      }

      const days = months * 30.417 + diff.days;
      weeksRemaining = Math.floor(days / 7);
      daysRemaining = Math.floor(days % 7);
    } else if (body.tech_method == "Conception") {
      // Conception Date method
      const conceptionDate = new Date(year, month - 1, day);
      ovu_date = formatDate(conceptionDate, "MMM dd, yyyy");

      // Calculate due date (conception + 266 days)
      const dueDateTime = new Date(conceptionDate);
      dueDateTime.setDate(dueDateTime.getDate() + 266);
      due_date = formatDate(dueDateTime, "yyyy-MM-dd");
      modi_ageEsimated = formatDate(dueDateTime, "MM/dd/yyyy");

      // Calculate current pregnancy progress
      const bday = new Date(dueDateTime);
      bday.setDate(bday.getDate() - 280);
      const today = new Date();
      const diff = dateDiff(bday, today);

      const months = diff.months;
      if (months > 9) {
        param.error = "You are not pregnant yet.";
        return param;
      }

      const days = months * 30.417 + diff.days;
      weeksRemaining = Math.floor(days / 7);
      daysRemaining = Math.floor(days % 7);
    } else if (body.tech_method == "IVF") {
      // IVF Transfer Date method
      let ivfDays = body.tech_ivf;

      // Convert string values to numbers
      if (ivfDays == "Last") {
        ivfDays = 280;
      } else if (ivfDays == "Due") {
        ivfDays = 0;
      } else if (ivfDays == "Conception") {
        ivfDays = 266;
      } else if (ivfDays == "IVF") {
        ivfDays = 266;
      } else if (ivfDays == "Ultrasound") {
        ivfDays = 250;
      }

      const daysToAdd = 266 - ivfDays;
      const transferDate = new Date(year, month - 1, day);

      // Calculate due date
      const dueDateTime = new Date(transferDate);
      dueDateTime.setDate(dueDateTime.getDate() + daysToAdd);
      due_date = formatDate(dueDateTime, "yyyy-MM-dd");
      modi_ageEsimated = formatDate(dueDateTime, "MM/dd/yyyy");

      // Calculate ovulation date (due date - 38 weeks)
      const ovuDateTime = new Date(dueDateTime);
      ovuDateTime.setDate(ovuDateTime.getDate() - 38 * 7);
      ovu_date = formatDate(ovuDateTime, "MMM dd, yyyy");

      // Calculate current pregnancy progress
      const bday = new Date(dueDateTime);
      bday.setDate(bday.getDate() - 280);
      const today = new Date();
      const diff = dateDiff(bday, today);

      const months = diff.months;
      if (months > 9) {
        param.error = "You are not pregnant yet.";
        return param;
      }

      const days = months * 30.417 + diff.days;
      weeksRemaining = Math.floor(days / 7);
      daysRemaining = Math.floor(days % 7);
    } else if (body.tech_method == "Ultrasound") {
      // Ultrasound method
      const weeks = body.tech_week ? parseInt(body.tech_week, 10) : 0;
      const days = body.tech_days ? parseInt(body.tech_days, 10) : 0;

      // Check if at least one value is numeric and greater than 0
      if ((isNaN(weeks) || weeks === 0) && (isNaN(days) || days === 0)) {
        param.error = "Please enter weeks or days.";
        return param;
      }

      const pregLength = 40 * 7; // 280 days
      const totalDays = weeks * 7 + days;

      // Calculate pregnancy start date (subtract totalDays from scan date)
      const scanDate = new Date(year, month - 1, day);
      const pregStartDate = new Date(scanDate);
      pregStartDate.setDate(pregStartDate.getDate() - totalDays);

      // Calculate due date (add 280 days to pregnancy start date)
      const dueDateTime = new Date(pregStartDate);
      dueDateTime.setDate(dueDateTime.getDate() + pregLength);
      due_date = formatDate(dueDateTime, "yyyy-MM-dd");
      modi_ageEsimated = due_date;

      // Calculate ovulation date (due date - 38 weeks)
      const ovuDateTime = new Date(dueDateTime);
      ovuDateTime.setDate(ovuDateTime.getDate() - 38 * 7);
      ovu_date = formatDate(ovuDateTime, "MMM dd, yyyy");

      // Calculate current pregnancy progress
      const today = new Date();
      const diff = dateDiff(pregStartDate, today);

      const months = diff.months; // Now this matches Laravel's $diff->m
      console.log("Years:", diff.years, "Months:", months, "Days:", diff.days);

      if (months > 9 || diff.years > 0) {
        param.error = "You are not pregnant yet.";
        return param;
      }

      const calcDays = months * 30.417 + diff.days;
      weeksRemaining = Math.floor(calcDays / 7);
      daysRemaining = Math.floor(calcDays % 7);
    }

    // Check if due date has passed
    const today = new Date();
    const estimatedDate = new Date(modi_ageEsimated);

    // normalize both to midnight (date-only)
    today.setHours(0, 0, 0, 0);
    estimatedDate.setHours(0, 0, 0, 0);
    // console.log(today,modi_ageEsimated);
    if (today > estimatedDate) {
      param.error = "You are not pregnant yet.111";
      return param;
    }

    // Check if all fields are done
    if (!fieldsDone) {
      param.error = "Please Fill All Fields.";
      return param;
    }

    // Set trimester indicators
    if (weeksRemaining >= 0 && weeksRemaining < 5) {
      param.tech_one_t = "bg-dark-blue text-white";
    } else if (weeksRemaining > 4 && weeksRemaining < 9) {
      param.tech_two_t = "bg-dark-blue text-white";
    } else if (weeksRemaining > 8 && weeksRemaining < 14) {
      param.tech_three_t = "bg-dark-blue text-white";
    } else if (weeksRemaining > 13 && weeksRemaining < 18) {
      param.tech_four_t = "bg-dark-blue text-white";
    } else if (weeksRemaining > 17 && weeksRemaining < 22) {
      param.tech_five_t = "bg-dark-blue text-white";
    } else if (weeksRemaining > 21 && weeksRemaining < 28) {
      param.tech_six_t = "bg-dark-blue text-white";
    } else if (weeksRemaining > 27 && weeksRemaining < 32) {
      param.tech_seven_t = "bg-dark-blue text-white";
    } else if (weeksRemaining > 31 && weeksRemaining < 36) {
      param.tech_eight_t = "bg-dark-blue text-white";
    } else if (weeksRemaining > 35 && weeksRemaining < 41) {
      param.tech_nine_t = "bg-dark-blue text-white";
    }

    // Set return values
    param.tech_RemainingWeeks = weeksRemaining;
    param.tech_RemainingDays = daysRemaining;
    param.tech_EstimatedAge = modi_ageEsimated;
    param.tech_ovu_date = ovu_date;

    return param;

    // Helper function to calculate date difference

    // Helper function to calculate date difference (like Laravel's DateTime diff)
    function dateDiff(date1, date2) {
      const d1 = new Date(date1);
      const d2 = new Date(date2);

      // Calculate year and month difference
      let years = d2.getFullYear() - d1.getFullYear();
      let months = d2.getMonth() - d1.getMonth();
      let days = d2.getDate() - d1.getDate();

      // Adjust if days are negative
      if (days < 0) {
        months--;
        const lastMonth = new Date(d2.getFullYear(), d2.getMonth(), 0);
        days += lastMonth.getDate();
      }

      // Adjust if months are negative
      if (months < 0) {
        years--;
        months += 12;
      }

      // Return only months within current year cycle (like Laravel's DateInterval->m)
      // Laravel's ->m is the month component, not total months
      return {
        years: years,
        months: months, // This is like $diff->m (0-11 range)
        days: days,
      };
    }

    // Helper function to format dates
    function formatDate(date, format) {
      const d = new Date(date);
      const months = [
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

      if (format == "MMM dd, yyyy") {
        return `${months[d.getMonth()]} ${String(d.getDate()).padStart(
          2,
          "0"
        )}, ${d.getFullYear()}`;
      } else if (format == "MM/dd/yyyy") {
        return `${String(d.getMonth() + 1).padStart(2, "0")}/${String(
          d.getDate()
        ).padStart(2, "0")}/${d.getFullYear()}`;
      } else if (format == "yyyy-MM-dd") {
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
          2,
          "0"
        )}-${String(d.getDate()).padStart(2, "0")}`;
      }

      return d.toString();
    }
  }

  /**
   * getCalculationTdeeCalculator: Service Method
   * POST: /api/calculators-lol/tdee-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationTdeeCalculator(body) {
    const result = {};
    try {
      let age = body.tech_age;
      let gender = body.tech_gender;
      let ft_in = body.tech_ft_in;
      let inputWeight = body.tech_weight;
      let percent = body.tech_percent;
      let activity = body.tech_activity;
      let unit = body.tech_unit;
      let height_ft = body.tech_height_ft;
      let height_in = body.tech_height_in;
      let inputHeightCm = body.tech_height_cm;
      let hightUnit = body.tech_hightUnit;
      let unit_ft_in = body.tech_unit_ft_in;

      // Validation
      if (
        !age ||
        !inputWeight ||
        !gender ||
        !activity ||
        isNaN(age) ||
        isNaN(inputWeight)
      ) {
        result.error = "Please fill All fields.";
        return result;
      }

      if (percent && percent > 100) {
        result.error = "Body Fat Percentage cannot greater than 100.";
        return result;
      }

      // Weight conversion
      let weight = parseFloat(inputWeight);
      if (unit == "lbs") {
        weight = weight / 2.205;
      }

      // Height conversion to cm
      let height_cm;

      if (hightUnit == "ft/in") {
        if (ft_in) {
          height_cm = parseFloat(ft_in) * 2.54;
        } else {
          if (
            height_ft &&
            height_in &&
            !isNaN(height_ft) &&
            !isNaN(height_in)
          ) {
            if (unit_ft_in === "ft/in") {
              height_cm = parseFloat(height_ft) * 30.48;
              if (height_in != null) {
                const heightInCm = parseFloat(height_in) * 2.54;
                height_cm = height_cm + heightInCm;
              }
            }
          } else {
            result.error = "Please Enter Height.";
            return result;
          }
        }
      } else {
        if (inputHeightCm && !isNaN(inputHeightCm)) {
          height_cm = parseFloat(inputHeightCm);
        } else {
          result.error = "Please Enter Height.";
          return result;
        }
      }

      // Calculate BMI
      const height_m = height_cm / 100;
      const BMI = Math.round((weight / (height_m * height_m)) * 100) / 100;

      // Determine BMI category
      let you_are;
      if (BMI <= 18.5) {
        you_are = "Underweight";
      } else if (BMI > 18.5 && BMI <= 24.9) {
        you_are = "Normal Weight";
      } else if (BMI > 24.9 && BMI <= 29.9) {
        you_are = "Overweight";
      } else if (BMI > 29.9 && BMI <= 35) {
        you_are = "Obesity";
      } else {
        you_are = "Severe Obesity";
      }

      // Calculate BMR (Mifflin-St Jeor Equation)
      let BMR;
      if (gender == "female") {
        BMR = Math.round(weight * 10 + height_cm * 6.25 - age * 5 - 161);
      } else {
        BMR = Math.round(10 * weight + 6.25 * height_cm - 5 * age + 5);
      }

      // Calculate TDEE
      let tdee;
      const activityMultipliers = {
        Sedentary: 1.2,
        "Lightly Active": 1.375,
        "Moderately Active": 1.55,
        "Very Active": 1.725,
        "Extra Active": 1.9,
      };

      tdee = Math.round(BMR * (activityMultipliers[activity] || 1.2));

      // Helper function for macro calculations
      const calculateMacros = (
        calories,
        proPercent,
        fatPercent,
        carbPercent
      ) => {
        const pro = (proPercent * calories) / 100;
        const pro_ans = Math.round(pro / 4);

        const fat = (fatPercent * calories) / 100;
        const fat_ans = Math.round(fat / 9);

        const carb = (carbPercent * calories) / 100;
        const carb_ans = Math.round(carb / 4);

        const total = pro_ans + fat_ans + carb_ans;

        return {
          pro_per_ans: Math.round((pro_ans / total) * 100),
          fat_per_ans: Math.round((fat_ans / total) * 100),
          carb_per_ans: Math.round((carb_ans / total) * 100),
        };
      };

      // MAINTENANCE
      const main_mod = calculateMacros(tdee, 30, 35, 35);
      const main_low = calculateMacros(tdee, 40, 40, 20);
      const main_high = calculateMacros(tdee, 30, 20, 50);

      // CUTTING
      const cut_mod = calculateMacros(tdee - 500, 30, 35, 35);
      const cut_low = calculateMacros(tdee - 500, 40, 40, 20);
      const cut_high = calculateMacros(tdee - 500, 30, 20, 50);

      // BULKING
      const bulk_mod = calculateMacros(tdee + 500, 30, 35, 35);
      const bulk_low = calculateMacros(tdee + 500, 40, 40, 20);
      const bulk_high = calculateMacros(tdee + 500, 30, 20, 50);

      // Populate result object
      result.tech_tdee = tdee;
      result.tech_height_cm = height_cm;
      result.tech_weight = weight;
      result.tech_BMR = Math.round(BMR);
      result.tech_BMI = BMI;
      result.tech_you_are = you_are;
      result.tech_calories = tdee;
      result.tech_submit = unit;

      // Maintenance
      result.tech_main_mod_pro_per_ans = main_mod.pro_per_ans;
      result.tech_main_mod_fat_per_ans = main_mod.fat_per_ans;
      result.tech_main_mod_carb_per_ans = main_mod.carb_per_ans;

      result.tech_main_low_pro_per_ans = main_low.pro_per_ans;
      result.tech_main_low_fat_per_ans = main_low.fat_per_ans;
      result.tech_main_low_carb_per_ans = main_low.carb_per_ans;

      result.tech_main_high_pro_per_ans = main_high.pro_per_ans;
      result.tech_main_high_fat_per_ans = main_high.fat_per_ans;
      result.tech_main_high_carb_per_ans = main_high.carb_per_ans;

      // Cutting
      result.tech_cut_mod_pro_per_ans = cut_mod.pro_per_ans;
      result.tech_cut_mod_fat_per_ans = cut_mod.fat_per_ans;
      result.tech_cut_mod_carb_per_ans = cut_mod.carb_per_ans;

      result.tech_cut_low_pro_per_ans = cut_low.pro_per_ans;
      result.tech_cut_low_fat_per_ans = cut_low.fat_per_ans;
      result.tech_cut_low_carb_per_ans = cut_low.carb_per_ans;

      result.tech_cut_high_pro_per_ans = cut_high.pro_per_ans;
      result.tech_cut_high_fat_per_ans = cut_high.fat_per_ans;
      result.tech_cut_high_carb_per_ans = cut_high.carb_per_ans;

      // Bulking
      result.tech_bulk_mod_pro_per_ans = bulk_mod.pro_per_ans;
      result.tech_bulk_mod_fat_per_ans = bulk_mod.fat_per_ans;
      result.tech_bulk_mod_carb_per_ans = bulk_mod.carb_per_ans;

      result.tech_bulk_low_pro_per_ans = bulk_low.pro_per_ans;
      result.tech_bulk_low_fat_per_ans = bulk_low.fat_per_ans;
      result.tech_bulk_low_carb_per_ans = bulk_low.carb_per_ans;

      result.tech_bulk_high_pro_per_ans = bulk_high.pro_per_ans;
      result.tech_bulk_high_fat_per_ans = bulk_high.fat_per_ans;
      result.tech_bulk_high_carb_per_ans = bulk_high.carb_per_ans;

      result.tech_disable = "disable";
      return result;
    } catch (error) {
      result.error = "An error occurred during calculation.";
      console.error("TDEE Calculation Error:", error);
      return result;
    }
  }

  /**
   * getCalculationCalorieDeficitCalculator: Service Method
   * POST: /api/calculators-lol/calorie-deficit-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationCalorieDeficitCalculator(body) {
    let submit = body.tech_unit_type;
    let gender = body.tech_gender;
    let age = body.tech_age;
    let ft_in = body.tech_ft_in;
    let height_cm = body.tech_height_cm;
    let weight = body.tech_weight;
    let target = body.tech_target;
    let activity = body.tech_activity;
    // Helper functions
    function isNumeric(value) {
      return !isNaN(parseFloat(value)) && isFinite(value);
    }

    function getDateDifference(start, end) {
      let years = end.getFullYear() - start.getFullYear();
      let months = end.getMonth() - start.getMonth();
      let days = end.getDate() - start.getDate();

      if (days < 0) {
        months--;
        const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
        days += prevMonth.getDate();
      }

      if (months < 0) {
        years--;
        months += 12;
      }

      return { years, months, days };
    }

    function formatDate(date) {
      const months = [
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
      const day = date.getDate().toString().padStart(2, "0");
      const month = months[date.getMonth()];
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    }

    // Custom rounding function
    function customRound(num) {
      if (num >= 50) {
        return Math.ceil(num / 100) * 100;
      } else {
        return Math.ceil(num / 50) * 50;
      }
    }

    // Validation
    if (
      !isNumeric(age) ||
      !isNumeric(weight) ||
      !isNumeric(target) ||
      !gender ||
      !activity
    ) {
      return { error: "Please! Check your input." };
    }

    let weight_kg, target_kg, height_cm_val;

    if (submit == "lbs") {
      if (!ft_in) {
        return { error: "Please Select Height." };
      }
      weight_kg = weight / 2.205;
      target_kg = target / 2.205;
      height_cm_val = ft_in * 2.54;
    } else {
      if (!height_cm) {
        return { error: "Please Enter Height." };
      }
      weight_kg = weight;
      target_kg = target;
      height_cm_val = height_cm;
    }

    if (target > weight) {
      return {
        error: "Your target weight must be lower than your current weight.",
      };
    }

    const height_m = height_cm_val / 100;
    const height_in = height_cm_val / 2.54;
    const weight_lbs = weight_kg * 2.205;
    const target_lbs = target_kg * 2.205;

    let RMR, BMR, LBM, RMR_target, BMR_target, LBM_target;
    let Robinson, Miller, Devine, Hamwi;

    if (gender === "Male") {
      RMR = Math.round(66 + 13.7 * weight_kg + 5 * height_cm_val - 6.8 * age);
      BMR = Math.round(height_cm_val * 6.25 + weight_kg * 10 - age * 5 + 5);
      LBM = Math.round(0.3281 * weight + 0.33929 * height_cm_val - 29.5336);
      RMR_target = Math.round(
        66 + 13.7 * target_kg + 5 * height_cm_val - 6.8 * age
      );
      BMR_target = Math.round(
        height_cm_val * 6.25 + target_kg * 10 - age * 5 + 5
      );
      LBM_target = Math.round(
        0.3281 * target_kg + 0.33929 * height_cm_val - 29.5336
      );
      Robinson = Math.round(52 + 1.9 * (height_in - 60));
      Miller = Math.round(56.2 + 1.41 * (height_in - 60));
      Devine = Math.round(50 + 2.3 * (height_in - 60));
      Hamwi = Math.round(48 + 2.7 * (height_in - 60));
    } else {
      RMR = Math.round(655 + 9.6 * weight_kg + 1.8 * height_cm_val - 4.7 * age);
      BMR = Math.round(height_cm_val * 6.25 + weight_kg * 10 - age * 5 - 161);
      LBM = Math.round(0.29569 * weight + 0.41813 * height_cm_val - 43.2933);
      RMR_target = Math.round(
        655 + 9.6 * target_kg + 1.8 * height_cm_val - 4.7 * age
      );
      BMR_target = Math.round(
        height_cm_val * 6.25 + target_kg * 10 - age * 5 - 161
      );
      LBM_target = Math.round(
        0.29569 * target_kg + 0.41813 * height_cm_val - 43.2933
      );
      Robinson = Math.round(49 + 1.7 * (height_in - 60));
      Miller = Math.round(53.1 + 1.36 * (height_in - 60));
      Devine = Math.round(45.5 + 2.3 * (height_in - 60));
      Hamwi = Math.round(45 + 2.2 * (height_in - 60));
    }

    const BMI = Math.round((weight_kg / (height_m * height_m)) * 100) / 100;
    const BMI_target =
      Math.round((target_kg / (height_m * height_m)) * 100) / 100;

    let ibw;
    if (Hamwi >= Miller) {
      ibw = Miller + " - " + Hamwi;
    } else {
      ibw = Hamwi + " - " + Miller;
    }

    if (submit == "lbs") {
      Miller = Miller * 2.205;
      Hamwi = Hamwi * 2.205;
      if (Hamwi >= Miller) {
        ibw = Math.round(Miller) + "-" + Math.round(Hamwi);
      } else {
        ibw = Math.round(Hamwi) + "-" + Math.round(Miller);
      }
    }

    const tdee = Math.round(BMR * activity);
    const tdee_target = Math.round(BMR_target * activity);

    const first_num = tdee.toString().substring(0, 2);
    const last_num = tdee.toString().slice(-2);

    let table_cal;
    if (parseInt(last_num) < 50) {
      table_cal = parseInt(first_num + "00");
    } else {
      table_cal = parseInt(first_num + "50");
    }

    let x = table_cal;
    const main_cal_less = tdee - table_cal;
    let jama = 50;
    const intake_cal_array = [];

    while (x >= 1000) {
      const intake_cal = x;
      const calories_less = jama + main_cal_less;
      const calories_daily = intake_cal - calories_less;
      const pounds_daily = Math.round((calories_less / 3500) * 1000) / 1000;
      const days = Math.round((weight_lbs - target_lbs) / pounds_daily);

      const start_date = new Date();
      const end_date = new Date(start_date);
      end_date.setDate(start_date.getDate() + days);

      const diff = getDateDifference(start_date, end_date);
      let yrs;
      if (diff.years > 0) {
        yrs = `${diff.years} years ${diff.months} months ${diff.days} days`;
      } else {
        yrs = `${diff.months} months ${diff.days} days`;
      }

      const NewDate = formatDate(end_date);
      intake_cal_array.push(
        `${intake_cal}@@${yrs}@@${NewDate}@@${calories_less}`
      );

      x -= 50;
      jama += 50;
    }

    const weight_loss_cal = Math.round(0.8 * tdee);
    const calorie_def_cal = Math.round(tdee - weight_loss_cal);

    // Calculate final days and pounds_daily
    const final_calories_less = jama - 50 + main_cal_less;
    const final_pounds_daily =
      Math.round((final_calories_less / 3500) * 1000) / 1000;
    const final_days = Math.round(
      (weight_lbs - target_lbs) / final_pounds_daily
    );

    return {
      tech_height_in: height_in,
      tech_tdee: tdee,
      tech_RMR: RMR,
      tech_LBM: LBM,
      tech_tdee_target: tdee_target,
      tech_RMR_target: RMR_target,
      tech_LBM_target: LBM_target,
      tech_BMI: BMI,
      tech_BMI_target: BMI_target,
      tech_intake_cal_array: intake_cal_array,
      tech_age: age,
      tech_gender: gender,
      tech_weight: weight,
      tech_submit: submit,
      tech_target: target,
      tech_activity: activity,
      tech_days: final_days,
      tech_pounds_daily: final_pounds_daily,
      tech_BMR: BMR,
      tech_ibw: ibw,
      tech_weight_loss_cal: weight_loss_cal,
      tech_calorie_def_cal: calorie_def_cal,
    };
  }

  /**
   * getCalculation6MinuteWalkTestCalculator: Service Method
   * POST: /api/calculators-lol/6-minute-walk-test
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculation6MinuteWalkTestCalculator(body) {
    let age = body.tech_age;
    let weight = body.tech_weight;
    let distance = body.tech_distance;
    let heightFt = body.tech_height_ft;
    let heightIn = body.tech_height_in;
    let heightCm = body.tech_height_cm;
    let unit = body.tech_unit;
    let unit_ft_in = body.tech_unit_ft_in;
    let gender = body.tech_gender;
    let dis_unit = body.tech_dis_unit;

    let result = {};

    // Validate inputs
    if (
      !isNaN(age) &&
      !isNaN(weight) &&
      !isNaN(distance) &&
      (!isNaN(heightFt) || !isNaN(heightIn) || !isNaN(heightCm))
    ) {
      let wt = parseFloat(weight);
      let dist = parseFloat(distance);
      let ht_cm = parseFloat(heightCm);
      let ht_ft = parseFloat(heightFt);
      let ht_in = parseFloat(heightIn);

      // Convert weight from lbs to kg
      if (unit === "lbs") {
        wt = wt / 2.205;
      }

      // Convert height from ft/in to cm
      if (unit_ft_in === "ft/in") {
        ht_cm = ht_ft * 30.48;
        if (!isNaN(ht_in)) {
          ht_cm += ht_in * 2.54;
        }
      }

      // Gender-based calculation
      let ans = 0;
      let limit = 0;

      if (gender === "Male") {
        ans = Math.round(7.57 * ht_cm - 5.02 * age - 1.76 * wt - 309);
        limit = ans - 153;
      } else {
        ans = Math.round(2.11 * ht_cm - 5.78 * age - 2.29 * wt + 667);
        limit = ans - 139;
      }

      // Convert distance from feet to meters
      if (dis_unit === "ft") {
        dist = dist / 3.281;
      }

      const percent = Math.round((dist / ans) * 100);

      result = {
        tech_Ans: ans,
        tech_limit: limit,
        tech_Percent: percent,
      };
    } else {
      result = {
        error: "Please fill All the Required fields.",
      };
    }

    return result;
  }

  /**
   * getCalculationRMRCalculator: Service Method
   * POST: /api/calculators-lol/rmr-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationRMRCalculator(body) {
    let age = body.tech_age;
    let weight = body.tech_weight;
    let height_ft = body.tech_height_ft;
    let height_in = body.tech_height_in;
    let height_cm = body.tech_height_cm;
    let unit = body.tech_unit;
    let unit_h = body.tech_unit_h;
    let gender = body.tech_gender;
    let result = {};

    if (
      !isNaN(age) &&
      !isNaN(weight) &&
      (!isNaN(height_ft) || !isNaN(height_in) || !isNaN(height_cm))
    ) {
      age = parseFloat(age);
      weight = parseFloat(weight);
      height_ft = parseFloat(height_ft);
      height_in = parseFloat(height_in);
      height_cm = parseFloat(height_cm);

      // Convert weight to kg if in lbs
      if (unit === "lbs") {
        weight = weight / 2.205;
      }

      // Convert height to cm if provided in ft/in
      if (unit_h === "ft/in") {
        height_cm = height_ft * 30.48;
        if (!isNaN(height_in)) {
          height_cm += height_in * 2.54;
        }
      }

      let rmr;

      if (gender === "Female") {
        rmr = parseFloat(
          (655 + 9.6 * weight + 1.8 * height_cm - 4.7 * age).toFixed(2)
        );
      } else {
        rmr = parseFloat(
          (66 + 13.7 * weight + 5 * height_cm - 6.8 * age).toFixed(2)
        );
      }

      result = {
        tech_RMR: rmr,
      };
    } else {
      result = {
        error: "Please fill All fields.",
      };
    }

    return result;
  }

  /**
   * getCalculationBMRCalculator: Service Method
   * POST: /api/calculators-lol/bmr-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationBMRCalculator(body) {
    let age = body.tech_age;
    let weight = body.tech_weight;
    let height_ft = body.tech_height_ft;
    let height_in = body.tech_height_in;
    let height_cm = body.tech_height_cm;
    let unit = body.tech_unit;
    let unit_ft_in = body.tech_unit_ft_in;
    let gender = body.tech_gender;
    let result = {};

    if (
      !isNaN(age) &&
      !isNaN(weight) &&
      (!isNaN(height_ft) || !isNaN(height_in) || !isNaN(height_cm))
    ) {
      age = parseFloat(age);
      weight = parseFloat(weight);
      height_ft = parseFloat(height_ft);
      height_in = parseFloat(height_in);
      height_cm = parseFloat(height_cm);

      // Convert weight to kg if in lbs
      if (unit === "lbs") {
        weight = weight / 2.205;
      }

      // Convert height to cm if in ft/in
      if (unit_ft_in === "ft/in") {
        height_cm = height_ft * 30.48;
        if (!isNaN(height_in)) {
          height_cm += height_in * 2.54;
        }
      }

      let bmr, hbmr, sbmr;

      if (gender === "Female") {
        bmr = parseFloat(
          (9.99 * weight + 6.25 * height_cm - 4.92 * age - 161).toFixed(2)
        );
        hbmr = parseFloat(
          (447.593 + 9.247 * weight + 3.098 * height_cm - 4.33 * age).toFixed(2)
        );

        if (age >= 18 && age < 30) {
          sbmr = 14.818 * weight + 486.6;
        } else if (age >= 30 && age < 60) {
          sbmr = 8.126 * weight + 845.6;
        } else if (age >= 60) {
          sbmr = 9.082 * weight + 658.5;
        }
      } else {
        bmr = parseFloat(
          (9.99 * weight + 6.25 * height_cm - 4.92 * age + 5).toFixed(2)
        );
        hbmr = parseFloat(
          (88.362 + 13.397 * weight + 4.799 * height_cm - 5.677 * age).toFixed(
            2
          )
        );

        if (age >= 18 && age < 30) {
          sbmr = 15.057 * weight + 692.2;
        } else if (age >= 30 && age < 60) {
          sbmr = 11.472 * weight + 873.1;
        } else if (age >= 60) {
          sbmr = 11.711 * weight + 587.7;
        }
      }

      result = {
        tech_BMR: bmr,
        tech_hbmr: hbmr,
        tech_sbmr: parseFloat(sbmr.toFixed(2)),
      };
    } else {
      result = {
        error: "Please Fill All Fields.",
      };
    }

    return result;
  }

  /**
   * getCalculationIdealWeightCalculator: Service Method
   * POST: /api/calculators-lol/ideal-weight-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationIdealWeightCalculator(body) {
    let age = body.tech_age;
    let weight = body.tech_weight;
    let gender = body.tech_gender;
    let heightFt = body.tech_height_ft;
    let heightIn = body.tech_height_in;
    let heightCm = body.tech_height_cm;
    let unit = body.tech_unit;
    let unit_ft_in = body.tech_unit_ft_in;
    let hidden_nameunit = body.tech_hidden_nameunit;

    if (
      !isNaN(age) &&
      !isNaN(weight) &&
      (!isNaN(heightFt) || !isNaN(heightIn) || !isNaN(heightCm))
    ) {
      let param = {};
      let height_cm = heightCm;
      if (unit_ft_in === "ft/in") {
        height_cm = heightFt * 30.48;
        if (heightIn != null) {
          height_cm += heightIn * 2.54;
        }
      }

      let height_in = height_cm / 2.54;
      let weight_kg = weight;

      if (unit === "lbs") {
        weight_kg = weight / 2.205;
      }

      const height_meters = height_in / 39.37;
      let ans = 0;

      if (gender === "Female") {
        if (height_in < 60) {
          const Intuitive = +(45.5 - 2.3 * (60 - height_in)).toFixed(2);
          const Baseline = +(45.5 - 0.758 * (60 - height_in)).toFixed(2);
          ans = Baseline;
          Object.assign(param, {
            tech_Intuitive: Intuitive,
            tech_Baseline: Baseline,
          });
        } else {
          const Robinson = +(49 + 1.7 * (height_in - 60)).toFixed(2);
          const Miller = +(53.1 + 1.36 * (height_in - 60)).toFixed(2);
          ans = +(45.5 + 2.3 * (height_in - 60)).toFixed(2);
          const Devine = ans;
          const Hamwi = +(45 + 2.2 * (height_in - 60)).toFixed(2);
          const Broca = +(
            height_cm -
            100 -
            (height_cm - 100) * (15 / 100)
          ).toFixed(2);
          const Lorentz = +(height_cm - 100 - (height_cm - 150) / 2).toFixed(2);
          const Peterson = +(
            2.2 * 22 +
            3.5 * 22 * (height_meters - 1.5)
          ).toFixed(2);
          const Lemmens = +(22 * Math.pow(height_meters, 2)).toFixed(2);
          const BMI_Method = +(25 * (height_meters * height_meters)).toFixed(2);
          Object.assign(param, {
            tech_Robinson: Robinson,
            tech_Miller: Miller,
            tech_Devine: Devine,
            tech_Hamwi: Hamwi,
            tech_Broca: Broca,
            tech_Lorentz: Lorentz,
            tech_Peterson: Peterson,
            tech_Lemmens: Lemmens,
            tech_BMI_Method: BMI_Method,
          });
        }
      } else {
        if (height_in < 60) {
          const Intuitive = +(50 - 2.3 * (60 - height_in)).toFixed(2);
          const Baseline = +(50 - 0.833 * (60 - height_in)).toFixed(2);
          ans = Baseline;
          Object.assign(param, {
            tech_Intuitive: Intuitive,
            tech_Baseline: Baseline,
          });
        } else {
          const Robinson = +(52 + 1.9 * (height_in - 60)).toFixed(2);
          const Miller = +(56.2 + 1.41 * (height_in - 60)).toFixed(2);
          ans = +(50 + 2.3 * (height_in - 60)).toFixed(2);
          const Devine = ans;
          const Hamwi = +(48 + 2.7 * (height_in - 60)).toFixed(2);
          const Broca = +(
            height_cm -
            100 -
            (height_cm - 100) * (10 / 100)
          ).toFixed(2);
          const Lorentz = +(height_cm - 100 - (height_cm - 150) / 4).toFixed(2);
          const Peterson = +(
            2.2 * 22 +
            3.5 * 22 * (height_meters - 1.5)
          ).toFixed(2);
          const Lemmens = +(22 * Math.pow(height_meters, 2)).toFixed(2);
          const BMI_Method = +(25 * (height_meters * height_meters)).toFixed(2);
          Object.assign(param, {
            tech_Robinson: Robinson,
            tech_Miller: Miller,
            tech_Devine: Devine,
            tech_Hamwi: Hamwi,
            tech_Broca: Broca,
            tech_Lorentz: Lorentz,
            tech_Peterson: Peterson,
            tech_Lemmens: Lemmens,
            tech_BMI_Method: BMI_Method,
          });
        }
      }

      const bmi_range1 = +(18.5 * (height_meters * height_meters)).toFixed(2);
      const bmi_range2 = +(25 * (height_meters * height_meters)).toFixed(2);

      let abw, Percent, bmi;
      if (unit === "kg") {
        abw = +(ans + 0.4 * (weight - ans)).toFixed(2) + " kg";
        Percent = +(((weight - ans) / ans) * 100).toFixed(2) + " %";
        bmi = +(weight / Math.pow(height_meters, 2)).toFixed(2);
      } else {
        abw = +(ans * 2.205 + 0.4 * (weight - ans * 2.205)).toFixed(2) + " lbs";
        Percent =
          +(((weight - ans * 2.205) / (ans * 2.205)) * 100).toFixed(2) + " %";
        bmi = +(weight / 2.205 / Math.pow(height_meters, 2)).toFixed(2);
      }

      let lbw;
      if (gender === "Female") {
        lbw = +((9270 * weight_kg) / (8780 + 244 * bmi)).toFixed(2);
      } else {
        lbw = +((9270 * weight_kg) / (6680 + 216 * bmi)).toFixed(2);
      }

      param.tech_ans =
        unit === "kg"
          ? `${ans} <span className='text-blue font-s-20'>kg</span>`
          : `${(ans * 2.205).toFixed(
              2
            )} <span className='text-blue font-s-20'>lbs</span>`;
      param.tech_lbw =
        unit === "kg" ? `${lbw} kg` : `${(lbw * 2.205).toFixed(2)} lbs`;
      param.tech_abw = abw;
      param.tech_hidden_nameunit = hidden_nameunit;
      param.tech_Percent = Percent;
      param.tech_bmi = bmi + " kg/m<sup>2</sup>";
      param.tech_bsa =
        +(
          0.007184 *
          Math.pow(weight_kg, 0.425) *
          Math.pow(height_cm, 0.725)
        ).toFixed(2) + " M<sup>2</sup>";
      param.tech_BMI1 = `${bmi_range1} - ${bmi_range2} kg`;
      param.tech_BMI2 = `${(bmi_range1 * 2.205).toFixed(2)} - ${(
        bmi_range2 * 2.205
      ).toFixed(2)} lbs`;

      return param;
    } else {
      return {
        hidden_nameunit,
        error: "Please Fill All fields.",
      };
    }
  }

  /**
   * getCalculationLeanBodyMassCalculator: Service Method
   * POST: /api/calculators-lol/lean-body-mass-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationLeanBodyMassCalculator(body) {
    let weight = body.tech_weight;
    let heightFt = body.tech_height_ft;
    let heightIn = body.tech_height_in;
    let heightCm = body.tech_height_cm;
    let unit = body.tech_unit;
    let unit_ft_in = body.tech_unit_ft_in;
    let gender = body.tech_gender;
    let formula = body.tech_formula;

    let param = {};

    if (
      !isNaN(weight) &&
      (!isNaN(heightFt) || !isNaN(heightIn) || !isNaN(heightCm))
    ) {
      weight = parseFloat(weight);
      heightFt = parseFloat(heightFt) || 0;
      heightIn = parseFloat(heightIn) || 0;
      heightCm = parseFloat(heightCm) || 0;

      if (unit === "lbs") {
        weight = weight / 2.205;
      }

      if (unit_ft_in === "ft/in") {
        heightCm = heightFt * 30.48;
        if (heightIn) {
          heightCm += heightIn * 2.54;
        }
      }

      let Boer, James, Hume, Peters, Boer_per, James_per, Hume_per, Peters_per;

      if (gender === "Female") {
        Boer = 0.252 * weight + 0.473 * heightCm - 48.3;
        Boer_per = (Boer / weight) * 100;

        James = 1.07 * weight - 148 * Math.pow(weight / heightCm, 2);
        James_per = (James / weight) * 100;

        Hume = 0.29569 * weight + 0.41813 * heightCm - 43.2933;
        Hume_per = (Hume / weight) * 100;
      } else {
        Boer = 0.407 * weight + 0.267 * heightCm - 19.2;
        Boer_per = (Boer / weight) * 100;

        James = 1.1 * weight - 128 * Math.pow(weight / heightCm, 2);
        James_per = (James / weight) * 100;

        Hume = 0.3281 * weight + 0.33929 * heightCm - 29.5336;
        Hume_per = (Hume / weight) * 100;
      }

      Peters = 0.0817 * (Math.pow(weight, 0.6469) * Math.pow(heightCm, 0.7236));
      Peters_per = (Peters / weight) * 100;

      if (unit === "lbs") {
        Boer = Boer * 2.205;
        James = James * 2.205;
        Hume = Hume * 2.205;
        Peters = Peters * 2.205;
      }

      Boer = parseFloat(Boer.toFixed(2));
      James = parseFloat(James.toFixed(2));
      Hume = parseFloat(Hume.toFixed(2));
      Peters = parseFloat(Peters.toFixed(2));

      Boer_per = parseFloat(Boer_per.toFixed(2));
      James_per = parseFloat(James_per.toFixed(2));
      Hume_per = parseFloat(Hume_per.toFixed(2));
      Peters_per = parseFloat(Peters_per.toFixed(2));

      let ans = 0;
      let ans_per = 0;

      switch (formula) {
        case "Boer":
          param["tech_Boer_f"] = "bg-gradient text-white";
          ans = Boer;
          ans_per = Boer_per;
          break;
        case "James":
          param["tech_James_f"] = "bg-gradient text-white";
          ans = James;
          ans_per = James_per;
          break;
        case "Hume":
          param["tech_Hume_f"] = "bg-gradient text-white";
          ans = Hume;
          ans_per = Hume_per;
          break;
        case "Peters":
          param["tech_Peters_f"] = "bg-gradient text-white";
          ans = Peters;
          ans_per = Peters_per;
          break;
      }

      param["tech_Boer"] = `${Boer} ${unit}`;
      param["tech_Boer_per"] = Boer_per;
      param["tech_James"] = `${James} ${unit}`;
      param["tech_James_per"] = James_per;
      param["tech_Hume"] = `${Hume} ${unit}`;
      param["tech_Hume_per"] = Hume_per;
      param["tech_Peters"] = `${Peters} ${unit}`;
      param["tech_Peters_per"] = Peters_per;
      param["tech_ans"] = ans;
      param["tech_ans_per"] = ans_per;

      return param;
    } else {
      return { error: "Please Fill All Fields." };
    }
  }

  /**
   * getCalculationBSACalculator: Service Method
   * POST: /api/calculators-lol/bsa-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationBSACalculator(body) {
    let weight = body.tech_weight;
    let gender = body.tech_gender;
    let unit = body.tech_unit;
    let heightFt = body.tech_height_ft;
    let heightIn = body.tech_height_in;
    let heightCm = body.tech_height_cm;
    let unit_ft_in = body.tech_unit_ft_in;

    let response = {};

    if (
      !isNaN(weight) &&
      (!isNaN(heightFt) || !isNaN(heightIn) || !isNaN(heightCm))
    ) {
      weight = parseFloat(weight);
      heightFt = parseFloat(heightFt) || 0;
      heightIn = parseFloat(heightIn) || 0;
      heightCm = parseFloat(heightCm) || 0;

      if (unit === "lbs") {
        weight = weight / 2.205;
      }

      if (unit_ft_in === "ft/in") {
        heightCm = heightFt * 30.48;
        if (heightIn) {
          heightCm += heightIn * 2.54;
        }
      }

      const DuBois = +(
        0.007184 *
        Math.pow(weight, 0.425) *
        Math.pow(heightCm, 0.725)
      ).toFixed(2);
      const Mosteller = +(
        0.016667 *
        Math.sqrt(weight) *
        Math.sqrt(heightCm)
      ).toFixed(2);
      const Haycock = +(
        0.024265 *
        Math.pow(weight, 0.5378) *
        Math.pow(heightCm, 0.3964)
      ).toFixed(2);
      const Gehan = +(
        0.0235 *
        Math.pow(weight, 0.51456) *
        Math.pow(heightCm, 0.42246)
      ).toFixed(2);
      const Boyd = +(
        0.0333 *
        Math.pow(weight, 0.6157 - 0.0188 * Math.log10(weight)) *
        Math.pow(heightCm, 0.3)
      ).toFixed(2);
      const Fujimoto = +(
        0.008883 *
        Math.pow(weight, 0.444) *
        Math.pow(heightCm, 0.663)
      ).toFixed(2);
      const Takahira = +(
        0.007241 *
        Math.pow(weight, 0.425) *
        Math.pow(heightCm, 0.725)
      ).toFixed(2);

      let Schlich;
      if (gender === "Male") {
        Schlich = +(
          0.000579479 *
          Math.pow(weight, 0.38) *
          Math.pow(heightCm, 1.24)
        ).toFixed(2);
      } else {
        Schlich = +(
          0.000975482 *
          Math.pow(weight, 0.46) *
          Math.pow(heightCm, 1.08)
        ).toFixed(2);
      }

      response = {
        tech_DuBois: DuBois,
        tech_Mosteller: Mosteller,
        tech_Haycock: Haycock,
        tech_Gehan: Gehan,
        tech_Boyd: Boyd,
        tech_Fujimoto: Fujimoto,
        tech_Takahira: Takahira,
        tech_Schlich: Schlich,
      };
    } else {
      response.error = "Please fill all fields.";
    }

    return response;
  }

  /**
   * getCalculationWaterIntakeCalculator: Service Method
   * POST: /api/calculators-lol/water-intake-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationWaterIntakeCalculator(body) {
    let { tech_gender, tech_weight, tech_weather, tech_unit, tech_activity } =
      body;

    tech_weight = parseFloat(tech_weight);
    tech_weather = parseFloat(tech_weather);
    tech_activity = parseFloat(tech_activity);

    if (!isNaN(tech_weight)) {
      if (tech_unit === "kg") {
        tech_weight = tech_weight * 2.205;
      }

      let tdee = 0;
      if (tech_gender === "Female") {
        tdee = Math.round(tech_weight * 0.45 * 10) / 10;
      } else if (tech_gender === "Male") {
        tdee = Math.round(tech_weight * 0.5 * 10) / 10;
      }

      let add = 0;
      if (tech_activity !== 0) {
        const plus = Math.round(tdee * tech_activity * 10) / 10;
        add += plus;
      }

      if (tech_weather !== 0) {
        const plus = Math.round(tdee * tech_weather * 10) / 10;
        add += plus;
      }

      tdee = Math.round((tdee + add) * 10) / 10;

      const im_ounce = Math.round(tdee * 1.04084 * 10) / 10;
      const us_ounce = tdee;
      const tdee_ml = Math.round(tdee * 29.5735 * 10) / 10;
      const cups = Math.round((tdee_ml / 237) * 10) / 10;
      const liter = Math.round((tdee_ml / 1000) * 10) / 10;

      return {
        tech_water: tdee_ml,
        tech_us_ounce: us_ounce + 1,
        tech_im_ounce: im_ounce,
        tech_cups: cups + 1,
        tech_liter: liter,
      };
    } else {
      return { error: "Please Fill All The Fields." };
    }
  }

  /**
   * getCalculationCorrectedCalciumCalculator: Service Method
   * POST: /api/calculators-lol/corrected-calcium-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationCorrectedCalciumCalculator(body) {
    let calcium = body.tech_calcium;
    let albumin = body.tech_albumin;
    let normal = body.tech_normal;
    let unit_c = body.tech_unit_c;
    let unit_a = body.tech_unit_a;
    let unit_n = body.tech_unit_n;

    let response = {};

    if (!isNaN(calcium) && !isNaN(albumin) && !isNaN(normal)) {
      calcium = parseFloat(calcium);
      albumin = parseFloat(albumin);
      normal = parseFloat(normal);

      if (unit_c === "mmol/l") {
        calcium = calcium * 4.0;
      }

      if (unit_a === "g/L") {
        albumin = albumin * 0.1;
      }

      if (unit_n === "g/L") {
        normal = normal * 0.1;
      }

      let Calcium_res = +(0.8 * (normal - albumin) + calcium).toFixed(1);

      if (unit_c === "mmol/l") {
        Calcium_res = Calcium_res / 4.0;
      }

      response = {
        tech_Calcium_res: +Calcium_res.toFixed(2),
        input_calcium: body.tech_calcium,
        input_albumin: body.tech_albumin,
        input_normal: body.tech_normal,
        input_unit_c: body.tech_unit_c,
        input_unit_a: body.tech_unit_a,
        input_unit_n: body.tech_unit_n,
      };
    } else {
      response = {
        error: "Please fill all fields.",
      };
    }

    return response;
  }

  /**
   * getCalculationANCCalculator: Service Method
   * POST: /api/calculators-lol/anc-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationANCCalculator(body) {
    let wbs = body.tech_wbs;
    let segs = body.tech_segs;
    let bands = body.tech_bands;
    let response = {};

    // Check if any non-submit field is empty
    let isValid = true;
    for (let key in body) {
      if (
        key !== "submit" &&
        (body[key] === "" || body[key] === null || body[key] === undefined)
      ) {
        isValid = false;
        break;
      }
    }

    if (!isNaN(wbs) && !isNaN(segs) && !isNaN(bands) && isValid) {
      wbs = parseFloat(wbs);
      segs = parseFloat(segs);
      bands = parseFloat(bands);

      let anc = (wbs * (segs + bands)) / 100;

      response = {
        tech_anc: +anc.toFixed(2),
      };
    } else {
      response = {
        error: "Please Fill All Fields.",
      };
    }

    return response;
  }

  /**
   * getCalculationALCCalculator: Service Method
   * POST: /api/calculators-lol/alc-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationALCCalculator(body) {
    let wbc = body.tech_wbs;
    let l = body.tech_l;

    let response = {};

    if (!isNaN(wbc) && !isNaN(l)) {
      wbc = parseFloat(wbc);
      l = parseFloat(l);

      let alc = parseFloat(((l / 100) * wbc).toFixed(3));

      response = {
        tech_alc: alc,
      };
    } else {
      response = {
        error: "Please Fill All Fields.",
      };
    }

    return response;
  }

  /**
   * getCalculationReticulocyteCountCalculator: Service Method
   * POST: /api/calculators-lol/reticulocyte-count-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationReticulocyteCountCalculator(body) {
    let x = body.tech_x;
    let y = body.tech_y;
    let z = body.tech_z;

    let response = {};

    if (!isNaN(x) && !isNaN(y) && !isNaN(z)) {
      let r = parseFloat(x);
      let h = parseFloat(y);
      let n = parseFloat(z);

      let reticulocyteIndex = r * (h / n);

      let maturationFactor;
      if (h < 20) {
        maturationFactor = 2.5;
      } else if (h < 25) {
        maturationFactor = 2.0;
      } else if (h < 35) {
        maturationFactor = 1.5;
      } else {
        maturationFactor = 1.0;
      }

      let correctedCount = reticulocyteIndex / maturationFactor;

      let ans, ans_p;
      if (reticulocyteIndex < 2) {
        ans = "Hypoproliferation";
        ans_p = "Reticulocyte index <2 indicates Hypoproliferation";
      } else {
        ans = "Adequate";
        ans_p = "Reticulocyte index ≥2 indicates Adequate response";
      }

      response = {
        tech_x: parseFloat(reticulocyteIndex.toFixed(2)),
        tech_y: parseFloat(correctedCount.toFixed(3)),
        tech_ans: ans,
        tech_ans_p: ans_p,
      };
    } else {
      response = {
        error: "Please Fill All Fields.",
      };
    }

    return response;
  }

  /**
   * getCalculationCentorScoreCalculator: Service Method
   * POST: /api/calculators-lol/centor-score-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationCentorScoreCalculator(body) {
    let tonsils = body.tech_tonsils;
    let cough = body.tech_cough;
    let lymph = body.tech_lymph;
    let age = body.tech_age;
    let temp = body.tech_temp;
    let unit = body.tech_unit;
    let response = {};

    // Validate all inputs are present (allowing 0 as valid)
    if (
      tonsils !== undefined &&
      cough !== undefined &&
      lymph !== undefined &&
      age !== undefined &&
      temp !== undefined &&
      unit !== undefined &&
      !isNaN(age) &&
      !isNaN(temp)
    ) {
      tonsils = parseInt(tonsils);
      cough = parseInt(cough);
      lymph = parseInt(lymph);
      age = parseFloat(age);
      temp = parseFloat(temp);

      let ageScore;
      if (age < 15) {
        ageScore = 1;
      } else if (age >= 15 && age < 45) {
        ageScore = 0;
      } else {
        ageScore = -1;
      }

      let tempScore = 0;
      if (unit === "°C") {
        tempScore = temp > 38 ? 1 : 0;
      } else {
        tempScore = temp > 100.4 ? 1 : 0;
      }

      let ans = tonsils + cough + lymph + ageScore + tempScore;
      let per = "";
      let text = "";

      if (ans === 0) {
        per = "(1 - 2.5 %)";
        text = "There is no need for further testing or antibiotics.";
      } else if (ans === 1) {
        per = "(5 - 10 %)";
        text = "There is no need for further testing or antibiotics.";
      } else if (ans === 2) {
        per = "(11 - 17 %)";
        text = "At this point, rapid strep testing and/or culture (Optional).";
      } else if (ans === 3) {
        per = "(28 - 35 %)";
        text =
          "There is a need to consider rapid strep testing and/or culture.";
      } else {
        per = "(51 - 53 %)";
        text = "There is a need to treat empirically using antibiotics.";
      }

      response = {
        tech_ans: `${ans} Points`,
        tech_per: per,
        tech_text: text,
      };
    } else {
      response = {
        error: "Please Fill All Fields.",
      };
    }

    return response;
  }

  /**
   * getCalculationChildPughCalculator: Service Method
   * POST: /api/calculators-lol/child-pugh-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationChildPughCalculator(body) {
    let a = body.tech_a;
    let e = body.tech_e;
    let b = body.tech_b;
    let as = body.tech_as;
    let i = body.tech_i;
    let response = {};

    // Check if all required fields are provided
    if ([a, e, b, as, i].every((val) => val !== undefined && val !== "")) {
      a = parseInt(a);
      e = parseInt(e);
      b = parseInt(b);
      as = parseInt(as);
      i = parseInt(i);

      const ans = a + e + i + b + as;

      let classGroup = "";
      let ansa = "";
      let ansb = "";
      let percent1 = "";
      let percent2 = "";

      if (ans === 5 || ans === 6) {
        classGroup = "A";
        ansa = "Life Expectancy : 15-20 years";
        ansb = "Abdominal surgery peri-operative mortality: 10%";
        percent1 = "100";
        percent2 = "85";
      } else if (ans > 6 && ans < 10) {
        classGroup = "B";
        ansa = "Indication for transplant evaluation";
        ansb = "Abdominal surgery peri-operative mortality: 30%";
        percent1 = "81";
        percent2 = "57";
      } else {
        classGroup = "C";
        ansa = "Life Expectancy : 1-3 years";
        ansb = "Abdominal surgery peri-operative mortality: 82%";
        percent1 = "45";
        percent2 = "35";
      }

      response = {
        tech_ans: `${ans} Points`,
        tech_class: classGroup,
        tech_ansa: ansa,
        tech_ansb: ansb,
        tech_percent1: percent1,
        tech_percent2: percent2,
      };
    } else {
      response = {
        error: "Please Fill All Fields.",
      };
    }

    return response;
  }

  /**
   * getCalculationWaistToHipRatioCalculator: Service Method
   * POST: /api/calculators-lol/waist-to-hip-ratio-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationWaistToHipRatioCalculator(body) {
    let w = body.tech_w;
    let h = body.tech_h;
    let unit = body.tech_unit;
    let unit1 = body.tech_unit1;
    let gender = body.tech_gender;
    let response = {};

    if (!isNaN(w) && !isNaN(h)) {
      w = parseFloat(w);
      h = parseFloat(h);

      let ans = 0;

      // Unit conversion
      if (unit === unit1) {
        ans = parseFloat((w / h).toFixed(3));
      } else {
        if (unit === "in") {
          w = w * 2.54;
          ans = parseFloat((w / h).toFixed(3));
        } else if (unit1 === "in") {
          h = h * 2.54;
          ans = parseFloat((w / h).toFixed(3));
        }
      }

      // Always convert waist to cm for classification
      let waist = unit === "in" ? w * 2.54 : w;

      // Optional classification logic (still commented out)
      /*
          if (gender === 'male') {
              if (waist <= 90) response.health = "bg-green-800 text-white";
              else if (waist > 90 && waist <= 102) response.inc = "bg-orange text-white";
              else if (waist > 102) response.risk = "bg-red-800 text-white";
  
              if (ans <= 0.95) response.low = "bg-green-800 text-white";
              else if (ans > 0.95 && ans <= 1.0) response.mod = "bg-orange text-white";
              else if (ans > 1.0) response.high = "bg-red-800 text-white";
          } else {
              if (waist <= 80) response.health = "bg-green-800 text-white";
              else if (waist > 80 && waist <= 88) response.inc = "bg-orange text-white";
              else if (waist > 88) response.risk = "bg-red-800 text-white";
  
              if (ans <= 0.80) response.low = "bg-green-800 text-white";
              else if (ans > 0.80 && ans <= 0.84) response.mod = "bg-orange text-white";
              else if (ans > 0.84) response.high = "bg-red-800 text-white";
          }
          */

      response.tech_ans = ans;
      response.inpit_w = body.tech_w;
      response.inpit_h = body.tech_h;
      response.inpit_unit = body.tech_unit;
      response.inpit_unit1 = body.tech_unit1;
    } else {
      response.error = "Please Fill All Fields.";
    }

    return response;
  }

  /**
   * getCalculationWaistToHeightRatioCalculator: Service Method
   * POST: /api/calculators-lol/waist-to-height-ratio-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationWaistToHeightRatioCalculator(body) {
    let height_ft = body.tech_height_ft;
    let height_in = body.tech_height_in;
    let height_cm = body.tech_height_cm;
    let waist = body.tech_waist;
    let unit_ft_in = body.tech_unit_ft_in;
    let unit = body.tech_unit;
    let gender = body.tech_gender;

    let response = {};
    let color = "";
    let left = "";
    let ans = 0;

    if (
      (!isNaN(height_ft) || !isNaN(height_in) || !isNaN(height_cm)) &&
      !isNaN(waist)
    ) {
      // Convert height to cm
      let total_height_cm = 0;

      if (unit_ft_in === "ft/in") {
        if (!isNaN(height_ft)) {
          total_height_cm += parseFloat(height_ft) * 30.48;
        }
        if (!isNaN(height_in)) {
          total_height_cm += parseFloat(height_in) * 2.54;
        }
      } else {
        total_height_cm = parseFloat(height_cm);
      }

      // Convert waist to cm if it's in inches
      if (unit === "in") {
        waist = parseFloat(waist) * 2.54;
      } else {
        waist = parseFloat(waist);
      }

      // Ratio calculation
      ans = parseFloat((waist / total_height_cm).toFixed(2));

      if (gender === "Male") {
        if (ans < 0.34) {
          color = "#20BEC8";
          left = "2%";
          response.tech_under = "Underweight";
          response.tech_xslim = "bg-blue-800 text-white";
        } else if (ans > 0.34 && ans < 0.42) {
          color = "#20BEC8";
          left = "2%";
          response.tech_slim = "bg-blue-800 text-white";
          response.tech_under = "Underweight";
        } else if (ans >= 0.42 && ans <= 0.52) {
          color = "#10951D";
          left = "26%";
          response.tech_healthy = "Healthy";
          response.tech_health = "bg-green-800 text-white";
        } else if (ans >= 0.53 && ans <= 0.57) {
          color = "#CABE52";
          left = "50%";
          response.tech_over = "Overweight";
          response.tech_overc = "bg-yellow-800 text-white";
        } else if (ans > 0.58 && ans <= 0.62) {
          color = "#FF0000";
          left = "50%";
          response.tech_over = "Overweight";
          response.tech_overh = "bg-red-800 text-white";
        } else if (ans >= 0.63 && ans <= 0.8) {
          color = "#FF0000";
          left = "74%";
          response.tech_obese = "Obese";
          response.tech_obesew = "bg-red-800 text-white";
        } else if (ans > 0.8) {
          color = "#FF0000";
          left = "80%";
          response.tech_obese = "Obese";
          response.tech_obesew = "bg-red-800 text-white";
        }
      } else if (gender === "Female") {
        if (ans < 0.34) {
          color = "#20BEC8";
          left = "2%";
          response.tech_under = "Underweight";
          response.tech_xslim = "bg-blue-800 text-white";
        } else if (ans > 0.34 && ans < 0.42) {
          color = "#20BEC8";
          left = "2%";
          response.tech_slim = "bg-blue-800 text-white";
          response.tech_under = "Underweight";
        } else if (ans >= 0.42 && ans <= 0.48) {
          color = "#10951D";
          left = "26%";
          response.tech_healthy = "Healthy";
          response.tech_health = "bg-green-800 text-white";
        } else if (ans >= 0.49 && ans <= 0.53) {
          color = "#CABE52";
          left = "50%";
          response.tech_over = "Overweight";
          response.tech_overc = "bg-yellow-800 text-white";
        } else if (ans > 0.53 && ans <= 0.57) {
          color = "#FF0000";
          left = "50%";
          response.tech_over = "Overweight";
          response.tech_overh = "bg-red-800 text-white";
        } else if (ans >= 0.58 && ans <= 0.8) {
          color = "#FF0000";
          left = "74%";
          response.tech_obese = "Obese";
          response.tech_obesew = "bg-red-800 text-white";
        } else if (ans > 0.8) {
          color = "#FF0000";
          left = "80%";
          response.tech_obese = "Obese";
          response.tech_obesew = "bg-red-800 text-white";
        }
      }

      response.tech_ratio = ans;
      response.tech_color = color;
      response.tech_left = left;
    } else {
      response.error = "Please Fill All Fields.";
    }

    return response;
  }

  /**
   * getCalculationFFMICalculator: Service Method
   * POST: /api/calculators-lol/ffmi-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationFFMICalculator(body) {
    const result = {};

    let height_ft = Number(body.tech_height_ft);
    let height_in = Number(body.tech_height_in);
    let height_cm = Number(body.tech_height_cm);
    let percent = Number(body.tech_percent);
    let weight = Number(body.tech_weight);
    let unit = body.tech_unit;
    let unit_ft_in = body.tech_unit_ft_in;

    if (
      !isNaN(weight) &&
      !isNaN(percent) &&
      (!isNaN(height_ft) || !isNaN(height_in) || !isNaN(height_cm))
    ) {
      // Convert weight if in lbs
      if (unit === "lbs") {
        weight = weight / 2.205;
      }

      // Handle ft/in to cm
      if (unit_ft_in === "ft/in") {
        height_cm = height_ft * 30.48;
        if (height_in != null) {
          height_cm += height_in * 2.54;
        }
      }

      // Convert height to meters
      let height_inch = height_cm / 2.54;
      let height_m = height_inch / 39.37;

      // Calculations
      let body_fat = +(weight * (percent / 100)).toFixed(2);
      let lean = +(weight * (1 - percent / 100)).toFixed(2);
      let ffmi = +(lean / Math.pow(height_m, 2)).toFixed(2);
      let nffmi = +(ffmi + 6.1 * (1.8 - height_m)).toFixed(2);
      let bmi = +(weight / Math.pow(height_m, 2)).toFixed(2);

      let cat = "";
      // if (ffmi < 18) {
      //   result.skinny = "purple text-white";
      //   cat = "Below Average";
      // } else if (ffmi >= 18 && ffmi < 20) {
      //   result.average = "cyan text-white";
      //   cat = "Average";
      // } else if (ffmi >= 20 && ffmi < 22) {
      //   result.fat = "red text-white";
      //   cat = "Above Average";
      // } else if (ffmi >= 22 && ffmi < 23) {
      //   result.athlete = "orange text-white";
      //   cat = "Excellent";
      // } else if (ffmi >= 23 && ffmi < 26) {
      //   result.gym = "orange text-white";
      //   cat = "Superior";
      // } else if (ffmi >= 26 && ffmi < 28) {
      //   result.body = "bg-gradient text-white";
      //   cat = "Suspicion of steroid use";
      // } else {
      //   result.unlikely = "bg-gradient text-white";
      //   cat = "Unlikely";
      // }
      if (ffmi < 18) {
        result.skinny = "bg-purple-600 text-white";
        cat = "Below Average";
      } else if (ffmi >= 18 && ffmi < 20) {
        result.average = "bg-cyan-600 text-white";
        cat = "Average";
      } else if (ffmi >= 20 && ffmi < 22) {
        result.fat = "bg-red-600 text-white";
        cat = "Above Average";
      } else if (ffmi >= 22 && ffmi < 23) {
        result.athlete = "bg-orange-500 text-white";
        cat = "Excellent";
      } else if (ffmi >= 23 && ffmi < 26) {
        result.gym = "bg-orange-700 text-white";
        cat = "Superior";
      } else if (ffmi >= 26 && ffmi < 28) {
        result.body =
          "bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-white";
        cat = "Suspicion of steroid use";
      } else {
        result.unlikely =
          "bg-gradient-to-r from-gray-700 via-red-700 to-black text-white";
        cat = "Unlikely";
      }

      result.tech_body_fat = body_fat;
      result.tech_lean = lean;
      result.tech_ffmi = ffmi;
      result.tech_nffmi = nffmi;
      result.tech_bmi = bmi;
      result.tech_cat = cat;

      return result;
    } else {
      return {
        error: "Please Fill All Fields.",
      };
    }
  }

  /**
   * getCalculationBodyShapeCalculator: Service Method
   * POST: /api/calculators-lol/body-shape-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationBodyShapeCalculator(body) {
    let high = parseFloat(body.tech_high);
    let chest = parseFloat(body.tech_chest);
    let waist = parseFloat(body.tech_waist);
    let hip = parseFloat(body.tech_hip);
    let high_units = body.tech_high_units;
    let chest_units = body.tech_bust_units;
    let waist_units = body.tech_waist_units;
    let hip_units = body.tech_hip_units;
    let gender = body.tech_gender;

    const cm_convert = (val, unit) => {
      return unit === "cm" ? val * 2.54 : val;
    };

    if (isFinite(high) && isFinite(chest) && isFinite(waist) && isFinite(hip)) {
      high = cm_convert(high, high_units);
      chest = cm_convert(chest, chest_units);
      waist = cm_convert(waist, waist_units);
      hip = cm_convert(hip, hip_units);

      let shape = "";
      let img = "";

      if (gender === "men") {
        if (
          Math.abs(chest - waist) <= 2 &&
          Math.abs(waist - hip) <= 2 &&
          Math.abs(hip - high) <= 2
        ) {
          shape = "Rectangle";
          img = "Rectangle_man";
        } else if (chest > waist && chest > hip) {
          shape = "Inverted Triangle";
          img = "male_inver_tri";
        } else if (
          chest > waist &&
          chest > high &&
          !(chest > waist && chest > hip && chest > high)
        ) {
          shape = "Trapezoid";
          img = "Trapezoid";
        } else if (hip > chest && high > chest) {
          shape = "Triangle";
          img = "male_tri";
        } else if (waist > chest && waist > hip) {
          shape = "Oval";
          img = "Oval_man";
        } else if (waist > chest && waist > high) {
          shape = "Triangle";
          img = "Triangle_man";
        } else {
          shape = "Oval";
          img = "Oval_man";
        }
      } else {
        if (
          chest - hip <= 1 &&
          hip - chest < 3.6 &&
          (chest - waist >= 9 || hip - waist >= 10)
        ) {
          shape = "Hourglass";
          img = "Hourglass";
        } else if (
          hip - chest >= 3.6 &&
          hip - chest < 10 &&
          hip - waist >= 9 &&
          high / waist < 1.193
        ) {
          shape = "Bottom Hourglass";
          img = "Bottom_Hourglass";
        } else if (chest - hip > 1 && chest - hip < 10 && chest - waist >= 9) {
          shape = "Top Hourglass";
          img = "Top_Hourglass";
        } else if (
          hip - chest > 2 &&
          hip - waist >= 7 &&
          high / waist >= 1.193
        ) {
          shape = "Spoon";
          img = "Spoon";
        } else if (hip - chest >= 3.6 && hip - waist < 9) {
          shape = "Triangle";
          img = "Triangle";
        } else if (chest - hip >= 3.6 && chest - waist < 9) {
          shape = "Inverted Triangle";
          img = "Inverted_Triangle";
        } else if (
          hip - chest < 3.6 &&
          chest - hip < 3.6 &&
          chest - waist < 9 &&
          hip - waist < 10
        ) {
          shape = "Rectangle";
          img = "Rectangle";
        } else if (chest > waist && hip > high) {
          shape = "Top Hourglass";
          img = "Top_Hourglass";
        } else {
          shape = "Rectangle";
          img = "Rectangle";
        }
      }

      const whr = parseFloat((waist / hip).toFixed(2));

      return {
        tech_shape: shape,
        tech_img: img,
        tech_whr: whr,
      };
    } else {
      return {
        error: "Please Input Values!",
      };
    }
  }
  /**
   * getCalculationIpptCalculator: Service Method
   * POST: /api/calculators-lol/ippt-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationIpptCalculator(body) {
    if (isNaN(body.tech_age) || isNaN(body.tech_push) || isNaN(body.tech_sit)) {
      return { error: "Please! Check Your Input." };
    }

    let age = Number(body.tech_age);
    let push = Number(body.tech_push) - 1;
    let sit = Number(body.tech_sit) - 1;
    let gender = body.gender;
    let time = gender == "Male" ? body.tech_time : body.tech_time_fe;
    let type = body.tech_type;

    // ✅ Determine Age Group
    let age_g = 0;
    if (age < 22) age_g = 0;
    else if (age > 21 && age < 25) age_g = 1;
    else if (age > 24 && age < 28) age_g = 2;
    else if (age > 27 && age < 31) age_g = 3;
    else if (age > 30 && age < 34) age_g = 4;
    else if (age > 33 && age < 37) age_g = 5;
    else if (age > 36 && age < 40) age_g = 6;
    else if (age > 39 && age < 43) age_g = 7;
    else if (age > 42 && age < 46) age_g = 8;
    else if (age > 45 && age < 49) age_g = 9;
    else if (age > 48 && age < 52) age_g = 10;
    else if (age > 51 && age < 55) age_g = 11;
    else if (age > 54 && age < 58) age_g = 12;
    else if (age > 57 && age < 61) age_g = 13;

    // ✅ Male / Female Scoring Arrays
    if (gender == "Male") {
      var pusha = [
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 4, 6, 8, 9, 10, 11,
          12, 13, 14, 15, 15, 16, 16, 16, 17, 17, 17, 18, 18, 18, 19, 19, 19,
          20, 20, 20, 20, 21, 21, 21, 21, 22, 22, 22, 22, 23, 23, 23, 23, 24,
          24, 24, 24, 25,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 4, 6, 8, 9, 10, 11, 12,
          13, 14, 15, 15, 16, 16, 16, 17, 17, 17, 18, 18, 18, 19, 19, 19, 20,
          20, 20, 20, 21, 21, 21, 21, 22, 22, 22, 22, 23, 23, 23, 23, 24, 24,
          24, 24, 25, 25,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 4, 6, 8, 9, 10, 11, 12, 13,
          14, 15, 15, 16, 16, 16, 17, 17, 17, 18, 18, 18, 19, 19, 19, 20, 20,
          20, 20, 21, 21, 21, 21, 22, 22, 22, 22, 23, 23, 23, 23, 24, 24, 24,
          24, 25, 25, 25,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 4, 6, 8, 9, 10, 11, 12, 13, 14,
          15, 15, 16, 16, 16, 17, 17, 17, 18, 18, 18, 19, 19, 19, 20, 20, 20,
          20, 21, 21, 21, 21, 22, 22, 22, 22, 23, 23, 23, 23, 24, 24, 24, 24,
          25, 25, 25, 25,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 4, 6, 8, 9, 10, 11, 12, 13, 14,
          15, 15, 16, 16, 16, 17, 17, 17, 18, 18, 18, 19, 19, 19, 20, 20, 20,
          20, 21, 21, 21, 21, 22, 22, 22, 22, 23, 23, 23, 23, 24, 24, 24, 24,
          25, 25, 25, 25, 25,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 4, 6, 8, 9, 10, 11, 12, 13, 14, 15,
          15, 16, 16, 16, 17, 17, 17, 18, 18, 18, 19, 19, 19, 20, 20, 20, 20,
          21, 21, 21, 21, 22, 22, 22, 22, 23, 23, 23, 23, 24, 24, 24, 24, 25,
          25, 25, 25, 25, 25,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 4, 6, 8, 9, 10, 11, 12, 13, 14, 15, 15,
          16, 16, 16, 17, 17, 17, 18, 18, 18, 19, 19, 19, 20, 20, 20, 20, 21,
          21, 21, 21, 22, 22, 22, 22, 23, 23, 23, 23, 24, 24, 24, 24, 25, 25,
          25, 25, 25, 25, 25,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 1, 2, 4, 6, 8, 9, 10, 11, 12, 13, 14, 15, 15, 16,
          16, 16, 17, 17, 17, 18, 18, 18, 19, 19, 19, 20, 20, 20, 20, 21, 21,
          21, 21, 22, 22, 22, 22, 23, 23, 23, 23, 24, 24, 24, 24, 25, 25, 25,
          25, 25, 25, 25, 25,
        ],
        [
          0, 0, 0, 0, 0, 0, 1, 2, 4, 6, 8, 9, 10, 11, 12, 13, 14, 15, 15, 16,
          16, 16, 17, 17, 17, 18, 18, 18, 19, 19, 19, 20, 20, 20, 21, 21, 21,
          21, 22, 22, 22, 22, 23, 23, 23, 23, 24, 24, 24, 24, 25, 25, 25, 25,
          25, 25, 25, 25, 25, 25,
        ],
        [
          0, 0, 0, 0, 0, 1, 2, 4, 6, 8, 9, 10, 11, 12, 13, 14, 15, 15, 16, 16,
          16, 17, 17, 17, 18, 18, 18, 19, 19, 19, 20, 20, 20, 21, 21, 21, 22,
          22, 22, 22, 23, 23, 23, 23, 24, 24, 24, 24, 25, 25, 25, 25, 25, 25,
          25, 25, 25, 25, 25, 25,
        ],
        [
          0, 0, 0, 0, 1, 2, 4, 6, 8, 9, 10, 11, 12, 13, 14, 15, 15, 16, 16, 16,
          17, 17, 17, 18, 18, 18, 19, 19, 19, 20, 20, 20, 21, 21, 21, 22, 22,
          22, 23, 23, 23, 23, 24, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25,
          25, 25, 25, 25, 25, 25,
        ],
        [
          0, 0, 0, 1, 2, 4, 6, 8, 9, 10, 11, 12, 13, 14, 15, 15, 16, 16, 16, 17,
          17, 17, 18, 18, 18, 19, 19, 19, 20, 20, 20, 21, 21, 21, 22, 22, 22,
          23, 23, 23, 24, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
          25, 25, 25, 25, 25, 25,
        ],
        [
          0, 0, 1, 2, 4, 6, 8, 9, 10, 11, 12, 13, 14, 15, 15, 16, 16, 16, 17,
          17, 17, 18, 18, 18, 19, 19, 19, 20, 20, 21, 21, 21, 22, 22, 22, 23,
          23, 23, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
          25, 25, 25, 25, 25, 25, 25,
        ],
        [
          0, 1, 2, 4, 6, 8, 9, 10, 11, 12, 13, 14, 15, 15, 16, 16, 16, 17, 17,
          17, 18, 18, 18, 19, 19, 19, 20, 20, 21, 21, 22, 22, 22, 23, 23, 23,
          24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
          25, 25, 25, 25, 25, 25, 25,
        ],
      ];

      var sita = [
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 6, 7, 7,
          8, 9, 10, 11, 12, 13, 13, 14, 14, 15, 16, 17, 18, 18, 19, 19, 20, 20,
          20, 20, 21, 21, 21, 21, 21, 22, 22, 22, 22, 23, 23, 23, 23, 24, 24,
          24, 25,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 6, 7, 7, 8,
          9, 10, 11, 12, 13, 13, 14, 14, 15, 16, 17, 18, 18, 19, 19, 20, 20, 20,
          20, 20, 21, 21, 21, 21, 22, 22, 22, 22, 23, 23, 23, 23, 24, 24, 24,
          25, 25,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 9,
          10, 11, 12, 13, 13, 14, 14, 15, 16, 17, 18, 18, 19, 19, 20, 20, 20,
          20, 21, 21, 21, 21, 22, 22, 22, 22, 23, 23, 23, 23, 24, 24, 24, 24,
          25, 25, 25,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 9, 10,
          11, 12, 13, 13, 14, 14, 15, 16, 17, 18, 18, 19, 19, 20, 20, 20, 20,
          20, 21, 21, 21, 21, 22, 22, 22, 22, 23, 23, 23, 23, 24, 24, 24, 25,
          25, 25, 25,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 9, 10, 11,
          12, 13, 14, 14, 15, 16, 16, 17, 18, 18, 19, 19, 20, 20, 20, 20, 21,
          21, 21, 21, 22, 22, 22, 22, 23, 23, 23, 23, 24, 24, 24, 24, 25, 25,
          25, 25, 25,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 9, 10, 11,
          12, 13, 14, 14, 15, 16, 16, 17, 18, 18, 19, 19, 20, 20, 20, 20, 20,
          21, 21, 23, 21, 22, 22, 22, 22, 23, 23, 23, 23, 24, 24, 24, 25, 25,
          25, 25, 25, 25,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 9, 10, 11, 12,
          13, 14, 14, 15, 16, 16, 17, 18, 18, 19, 19, 20, 20, 20, 20, 21, 21,
          21, 21, 22, 22, 22, 22, 23, 23, 23, 23, 24, 24, 24, 24, 25, 25, 25,
          25, 25, 25, 25,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 9, 10, 11, 12, 13,
          14, 14, 15, 16, 16, 17, 18, 18, 19, 19, 20, 20, 20, 20, 20, 21, 21,
          23, 21, 22, 22, 22, 22, 23, 23, 23, 23, 24, 24, 24, 25, 25, 25, 25,
          25, 25, 25, 25,
        ],
        [
          0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 9, 10, 11, 12, 13, 14,
          14, 15, 16, 16, 17, 18, 18, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21,
          22, 22, 22, 22, 23, 23, 23, 23, 24, 24, 24, 25, 25, 25, 25, 25, 25,
          25, 25, 25, 25,
        ],
        [
          0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 9, 10, 11, 12, 13, 14,
          14, 15, 16, 16, 17, 18, 18, 19, 19, 20, 20, 20, 20, 20, 21, 21, 21,
          23, 22, 22, 22, 23, 23, 23, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25,
          25, 25, 25, 25, 25,
        ],
        [
          0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 9, 10, 11, 12, 13, 14, 14,
          15, 16, 16, 17, 18, 18, 19, 19, 20, 20, 20, 20, 20, 21, 21, 21, 21,
          22, 22, 22, 23, 23, 23, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25,
          25, 25, 25, 25, 25,
        ],
        [
          0, 0, 0, 1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 9, 10, 11, 12, 13, 14, 14, 15,
          16, 16, 17, 18, 18, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 22, 22,
          22, 23, 23, 23, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
          25, 25, 25, 25, 25,
        ],
        [
          0, 0, 1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 9, 10, 11, 12, 13, 14, 14, 15, 16,
          16, 17, 18, 18, 19, 19, 20, 20, 20, 20, 23, 21, 21, 22, 22, 22, 23,
          23, 23, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
          25, 25, 25, 25, 25,
        ],
        [
          0, 1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 9, 10, 11, 12, 13, 14, 14, 15, 16,
          16, 17, 18, 18, 19, 19, 20, 20, 20, 21, 21, 21, 22, 22, 22, 23, 23,
          23, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
          25, 25, 25, 25, 25, 25,
        ],
      ];

      var timea = [
        [
          50, 49, 48, 47, 46, 45, 44, 43, 42, 41, 40, 39, 38, 38, 37, 37, 36,
          36, 35, 35, 34, 33, 32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21,
          20, 19, 18, 16, 14, 12, 10, 8, 6, 4, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0,
        ],
        [
          50, 50, 49, 48, 47, 46, 45, 44, 43, 42, 41, 40, 39, 38, 38, 37, 37,
          36, 36, 35, 35, 34, 33, 32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22,
          21, 20, 19, 18, 16, 14, 12, 10, 8, 6, 4, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0,
        ],
        [
          50, 50, 50, 49, 48, 47, 46, 45, 44, 43, 42, 41, 40, 39, 38, 38, 37,
          37, 36, 36, 35, 35, 34, 33, 32, 31, 30, 29, 28, 27, 26, 25, 24, 23,
          22, 21, 20, 19, 18, 16, 14, 12, 10, 8, 6, 4, 2, 1, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0,
        ],
        [
          50, 50, 50, 50, 50, 49, 48, 47, 46, 45, 44, 43, 42, 41, 40, 39, 38,
          38, 37, 37, 36, 36, 35, 35, 34, 33, 32, 31, 30, 29, 28, 27, 26, 25,
          24, 23, 22, 21, 20, 19, 18, 16, 14, 12, 10, 8, 6, 4, 2, 1, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0,
        ],
        [
          50, 50, 50, 50, 50, 50, 49, 48, 47, 46, 45, 44, 43, 42, 41, 40, 39,
          38, 38, 37, 37, 36, 36, 35, 35, 34, 33, 32, 31, 30, 29, 28, 27, 26,
          25, 24, 23, 22, 21, 20, 19, 18, 16, 14, 12, 10, 8, 6, 4, 2, 1, 0, 0,
          0, 0, 0, 0, 0, 0, 0,
        ],
        [
          50, 50, 50, 50, 50, 50, 50, 49, 48, 47, 46, 45, 44, 43, 42, 41, 40,
          39, 38, 38, 37, 37, 36, 36, 35, 35, 34, 33, 32, 31, 30, 29, 28, 27,
          26, 25, 24, 23, 22, 21, 20, 19, 18, 16, 14, 12, 10, 8, 6, 4, 2, 1, 0,
          0, 0, 0, 0, 0, 0, 0,
        ],
        [
          50, 50, 50, 50, 50, 50, 50, 50, 49, 48, 47, 46, 45, 44, 43, 42, 41,
          40, 39, 38, 38, 37, 37, 36, 36, 35, 35, 34, 33, 32, 31, 30, 29, 28,
          27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 16, 14, 12, 10, 8, 6, 4, 2, 1,
          0, 0, 0, 0, 0, 0, 0,
        ],
        [
          50, 50, 50, 50, 50, 50, 50, 50, 50, 49, 48, 47, 46, 45, 44, 43, 42,
          41, 40, 39, 38, 38, 37, 37, 36, 36, 35, 35, 34, 33, 32, 31, 30, 29,
          28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 16, 14, 12, 10, 8, 6, 4,
          2, 1, 0, 0, 0, 0, 0, 0,
        ],
        [
          50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 49, 48, 47, 46, 45, 44, 43,
          42, 41, 40, 39, 38, 38, 37, 37, 36, 36, 35, 35, 34, 33, 32, 31, 30,
          29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 16, 14, 12, 10, 8, 6,
          4, 2, 1, 0, 0, 0, 0, 0,
        ],
        [
          50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 49, 48, 47, 46, 45, 44,
          43, 42, 41, 40, 39, 38, 38, 37, 37, 36, 36, 35, 35, 34, 33, 32, 31,
          30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 16, 14, 12, 10, 8,
          6, 4, 2, 1, 0, 0, 0, 0,
        ],
        [
          50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 49, 48, 47, 46, 45,
          44, 43, 42, 41, 40, 39, 38, 38, 37, 37, 36, 36, 35, 35, 34, 33, 32,
          31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 16, 14, 12,
          10, 8, 6, 4, 2, 1, 0, 0, 0,
        ],
        [
          50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 49, 48, 47, 46,
          45, 44, 43, 42, 41, 40, 39, 38, 38, 37, 37, 36, 36, 35, 35, 34, 33,
          32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 16, 14,
          12, 10, 8, 6, 4, 2, 1, 0, 0,
        ],
        [
          50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 49, 48, 47,
          46, 45, 44, 43, 42, 41, 40, 39, 38, 38, 37, 37, 36, 36, 35, 35, 34,
          33, 32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 16,
          14, 12, 10, 8, 6, 4, 2, 1, 0,
        ],
        [
          50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 49, 48,
          47, 46, 45, 44, 43, 42, 41, 40, 39, 38, 38, 37, 37, 36, 36, 35, 35,
          34, 33, 32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18,
          16, 14, 12, 10, 8, 6, 4, 2, 1,
        ],
      ];
    } else {
      var pusha = [
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 5, 10, 15, 15, 16, 17,
          18, 18, 18, 19, 19, 19, 20, 20, 20, 20, 20, 21, 21, 21, 21, 22, 22,
          22, 22, 23, 23, 23, 23, 24, 24, 24, 24, 24, 25,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 5, 10, 15, 15, 16, 17, 18,
          18, 18, 19, 19, 19, 20, 20, 20, 20, 20, 21, 21, 21, 21, 22, 22, 22,
          22, 23, 23, 23, 23, 24, 24, 24, 24, 25, 25, 25,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 5, 10, 15, 15, 16, 17, 18, 18,
          18, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 22, 22, 22, 22, 23,
          23, 23, 23, 24, 24, 24, 24, 25, 25, 25, 25, 25,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 5, 10, 15, 15, 16, 17, 18, 18, 18,
          19, 19, 19, 20, 20, 20, 21, 21, 21, 21, 22, 22, 22, 22, 23, 23, 23,
          23, 24, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 5, 10, 15, 15, 16, 17, 18, 18, 18,
          19, 19, 19, 20, 20, 20, 21, 21, 21, 22, 22, 22, 22, 23, 23, 23, 23,
          24, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 5, 10, 15, 15, 16, 17, 18, 18, 18, 19,
          19, 19, 20, 20, 20, 21, 21, 21, 22, 22, 22, 23, 23, 23, 23, 24, 24,
          24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 0, 1, 5, 10, 15, 15, 16, 17, 18, 18, 18, 19, 19,
          19, 20, 20, 20, 21, 21, 21, 22, 22, 22, 23, 23, 23, 24, 24, 24, 24,
          25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 1, 5, 10, 15, 15, 16, 17, 18, 18, 18, 19, 19, 19,
          20, 20, 20, 21, 21, 21, 22, 22, 22, 23, 23, 23, 24, 24, 24, 25, 25,
          25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
        ],
        [
          0, 0, 0, 0, 0, 0, 1, 5, 10, 15, 15, 16, 17, 18, 18, 19, 19, 19, 20,
          20, 20, 21, 21, 21, 22, 22, 22, 23, 23, 23, 24, 24, 24, 25, 25, 25,
          25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
        ],
        [
          0, 0, 0, 0, 0, 1, 5, 10, 15, 15, 16, 17, 18, 18, 19, 19, 20, 20, 20,
          21, 21, 21, 22, 22, 22, 23, 23, 23, 24, 24, 24, 25, 25, 25, 25, 25,
          25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
        ],
        [
          0, 0, 0, 0, 1, 5, 10, 15, 15, 16, 17, 18, 18, 19, 19, 20, 20, 21, 21,
          22, 22, 22, 23, 23, 23, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25,
          25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
        ],
        [
          0, 0, 0, 1, 5, 10, 15, 15, 16, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22,
          22, 23, 23, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
          25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
        ],
        [
          0, 0, 1, 5, 10, 15, 15, 16, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22,
          22, 23, 23, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
          25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
        ],
        [
          0, 1, 5, 10, 15, 15, 16, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22,
          23, 23, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
          25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 50,
        ],
      ];

      var sita = [
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 4, 6, 8, 10, 11, 12,
          13, 14, 15, 15, 16, 16, 17, 18, 18, 18, 19, 19, 19, 20, 20, 20, 21,
          21, 21, 22, 22, 22, 23, 23, 23, 24, 24, 24, 24, 25,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 4, 6, 8, 10, 11, 12, 13,
          14, 15, 15, 16, 16, 17, 18, 18, 18, 19, 19, 19, 20, 20, 20, 21, 21,
          21, 22, 22, 22, 23, 23, 23, 24, 24, 24, 25, 25, 25,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 4, 6, 8, 10, 11, 12, 13, 14,
          15, 15, 16, 16, 17, 18, 18, 19, 19, 19, 20, 20, 20, 21, 21, 21, 22,
          22, 22, 23, 23, 23, 24, 24, 24, 25, 25, 25, 25, 25,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 4, 6, 8, 10, 11, 12, 13, 14,
          15, 15, 16, 16, 17, 18, 18, 19, 19, 20, 20, 20, 21, 21, 21, 22, 22,
          22, 23, 23, 23, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 4, 6, 8, 10, 11, 12, 13, 14, 15,
          15, 16, 16, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 22, 23, 23,
          23, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 4, 6, 8, 10, 11, 12, 13, 14, 15, 15,
          16, 16, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 23, 24,
          24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 4, 6, 8, 10, 11, 12, 13, 14, 15, 15, 16,
          16, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 23, 24, 24,
          24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
        ],
        [
          0, 0, 0, 0, 0, 0, 0, 1, 2, 4, 6, 8, 10, 11, 12, 13, 14, 15, 15, 16,
          16, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 23, 24, 24,
          24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
        ],
        [
          0, 0, 0, 0, 0, 0, 1, 2, 4, 6, 8, 10, 11, 12, 13, 14, 15, 15, 16, 16,
          17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 24, 25,
          25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
        ],
        [
          0, 0, 0, 0, 0, 1, 2, 4, 6, 8, 10, 11, 12, 13, 14, 15, 15, 16, 16, 17,
          18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 25,
          25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
        ],
        [
          0, 0, 0, 0, 1, 2, 4, 6, 8, 10, 11, 12, 13, 14, 15, 15, 16, 16, 17, 18,
          18, 19, 19, 20, 21, 22, 23, 23, 24, 24, 25, 25, 25, 25, 25, 25, 25,
          25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
        ],
        [
          0, 0, 0, 1, 2, 4, 6, 8, 10, 11, 12, 13, 14, 15, 15, 16, 16, 17, 18,
          18, 19, 19, 20, 21, 22, 23, 23, 24, 24, 25, 25, 25, 25, 25, 25, 25,
          25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
        ],
        [
          0, 0, 1, 2, 4, 6, 8, 10, 11, 12, 13, 14, 15, 15, 16, 16, 17, 18, 18,
          19, 19, 20, 21, 22, 23, 23, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25,
          25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
        ],
        [
          0, 1, 2, 4, 6, 8, 10, 11, 12, 13, 14, 15, 15, 16, 16, 17, 18, 18, 19,
          19, 20, 21, 22, 23, 23, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25,
          25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
        ],
      ];

      var timea = [
        [
          50, 49, 48, 47, 47, 46, 46, 45, 45, 44, 44, 43, 43, 42, 42, 41, 41,
          39, 39, 38, 38, 38, 37, 37, 37, 36, 36, 36, 35, 35, 35, 34, 34, 33,
          33, 32, 32, 31, 31, 30, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20,
          18, 16, 14, 12, 10, 8, 6, 4, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0,
        ],
        [
          50, 50, 50, 49, 48, 47, 46, 46, 45, 45, 44, 44, 43, 43, 42, 42, 41,
          41, 39, 39, 38, 38, 38, 37, 37, 37, 36, 36, 36, 35, 35, 35, 34, 34,
          33, 33, 32, 32, 31, 31, 30, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21,
          20, 18, 16, 14, 12, 10, 8, 6, 4, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0,
        ],
        [
          50, 50, 50, 50, 49, 48, 47, 46, 46, 45, 45, 44, 44, 43, 43, 42, 42,
          41, 41, 39, 39, 38, 38, 38, 37, 37, 37, 36, 36, 36, 35, 35, 35, 34,
          34, 33, 33, 32, 32, 31, 31, 30, 30, 29, 28, 27, 26, 25, 24, 23, 22,
          21, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0,
        ],
        [
          50, 50, 50, 50, 50, 49, 48, 47, 46, 46, 45, 45, 44, 44, 43, 43, 42,
          42, 41, 41, 39, 39, 38, 38, 38, 37, 37, 37, 36, 36, 36, 35, 35, 35,
          34, 34, 33, 33, 32, 32, 31, 31, 30, 30, 29, 28, 27, 26, 25, 24, 23,
          22, 21, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0,
        ],
        [
          50, 50, 50, 50, 50, 50, 49, 48, 47, 46, 46, 45, 45, 44, 44, 43, 43,
          42, 42, 41, 41, 39, 39, 38, 38, 38, 37, 37, 37, 36, 36, 36, 35, 35,
          35, 34, 34, 33, 33, 32, 32, 31, 31, 30, 30, 29, 28, 27, 26, 25, 24,
          23, 22, 21, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2, 1, 0, 0, 0, 0, 0, 0,
          0, 0, 0,
        ],
        [
          50, 50, 50, 50, 50, 50, 50, 49, 48, 47, 46, 46, 45, 45, 44, 44, 43,
          43, 42, 42, 41, 41, 39, 39, 38, 38, 38, 37, 37, 37, 36, 36, 36, 35,
          35, 35, 34, 34, 33, 33, 32, 32, 31, 31, 30, 30, 29, 28, 27, 26, 25,
          24, 23, 22, 21, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2, 1, 0, 0, 0, 0, 0,
          0, 0, 0,
        ],
        [
          50, 50, 50, 50, 50, 50, 50, 50, 49, 48, 47, 46, 46, 45, 45, 44, 44,
          43, 43, 42, 42, 41, 41, 39, 39, 38, 38, 38, 37, 37, 37, 36, 36, 36,
          35, 35, 35, 34, 34, 33, 33, 32, 32, 31, 31, 30, 30, 29, 28, 27, 26,
          25, 24, 23, 22, 21, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2, 1, 0, 0, 0, 0,
          0, 0, 0,
        ],
        [
          50, 50, 50, 50, 50, 50, 50, 50, 50, 49, 48, 47, 46, 46, 45, 45, 44,
          44, 43, 43, 42, 42, 41, 41, 39, 39, 38, 38, 38, 37, 37, 37, 36, 36,
          36, 35, 35, 35, 34, 34, 33, 33, 32, 32, 31, 31, 30, 30, 29, 28, 27,
          26, 25, 24, 23, 22, 21, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2, 1, 0, 0,
          0, 0, 0, 0,
        ],
        [
          50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 49, 48, 47, 46, 46, 45, 45,
          44, 44, 43, 43, 42, 42, 41, 41, 39, 39, 38, 38, 38, 37, 37, 37, 36,
          36, 36, 35, 35, 35, 34, 34, 33, 33, 32, 32, 31, 31, 30, 30, 29, 28,
          27, 26, 25, 24, 23, 22, 21, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2, 1, 0,
          0, 0, 0, 0,
        ],
        [
          50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 49, 48, 47, 46, 46, 45,
          45, 44, 44, 43, 43, 42, 42, 41, 41, 39, 39, 38, 38, 38, 37, 37, 37,
          36, 36, 36, 35, 35, 35, 34, 34, 33, 33, 32, 32, 31, 31, 30, 30, 29,
          28, 27, 26, 25, 24, 23, 22, 21, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2, 1,
          0, 0, 0, 0,
        ],
        [
          50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 49, 48, 47,
          46, 45, 44, 44, 43, 43, 42, 42, 41, 41, 39, 39, 38, 38, 38, 37, 37,
          37, 36, 36, 36, 35, 35, 35, 34, 34, 33, 33, 32, 32, 31, 31, 30, 30,
          29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 18, 16, 14, 12, 10, 8, 6, 4,
          2, 1, 0, 0, 0,
        ],
        [
          50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 49, 48,
          47, 46, 45, 44, 44, 43, 43, 42, 42, 41, 41, 39, 39, 38, 38, 38, 37,
          37, 37, 36, 36, 36, 35, 35, 35, 34, 34, 33, 33, 32, 32, 31, 31, 30,
          30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 18, 16, 14, 12, 10, 8, 6,
          4, 2, 1, 0, 0,
        ],
        [
          50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
          49, 48, 47, 46, 45, 44, 43, 43, 42, 42, 41, 41, 39, 39, 38, 38, 38,
          37, 37, 37, 36, 36, 36, 35, 35, 35, 34, 34, 33, 33, 32, 32, 31, 31,
          30, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 18, 16, 14, 12, 10, 8,
          6, 4, 2, 1, 0,
        ],
        [
          50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50,
          50, 50, 49, 48, 47, 46, 45, 44, 43, 42, 42, 41, 41, 39, 39, 38, 38,
          38, 37, 37, 37, 36, 36, 36, 35, 35, 35, 34, 34, 33, 33, 32, 32, 31,
          31, 30, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 18, 16, 14, 12,
          10, 8, 6, 4, 2, 1,
        ],
      ];
    }

    // ✅ Get Scores
    const push_s = pusha[age_g][push];
    const sit_s = sita[age_g][sit];
    const run_s = timea[age_g][time];
    const score = push_s + sit_s + run_s;

    // ✅ Determine Status
    let status = "";
    let to_next = 0;

    if (score < 51) {
      status = "Fail";
      to_next = 51 - score;
    } else if (type == "NSF" && score < 61) {
      status = "Fail";
      to_next = 61 - score;
    } else if (type == "NSM" && score > 50 && score < 61) {
      status = "Pass";
      to_next = 61 - score;
    } else if (type == "NSF" && score > 60 && score < 75) {
      status = "Pass";
      to_next = 75 - score;
    } else if (type == "NSM" && score > 60 && score < 75) {
      status = "incentive";
      to_next = 75 - score;
    } else if (score > 74 && score < 85) {
      status = "Silver";
      to_next = 85 - score;
    } else if (score > 84 && score < 90) {
      status = "Gold";
      to_next = 90 - score;
    } else if (score > 89) {
      status = "Gold1";
    }

    // ✅ Male & Female Running Time Lists
    const male_r = [
      "18:20",
      "18:10",
      "18:00",
      "17:50",
      "17:40",
      "17:30",
      "17:20",
      "17:10",
      "17:00",
      "16:50",
      "16:40",
      "16:30",
      "16:20",
      "16:10",
      "16:00",
      "15:50",
      "15:40",
      "15:30",
      "15:20",
      "15:10",
      "15:00",
      "14:50",
      "14:40",
      "14:30",
      "14:20",
      "14:10",
      "14:00",
      "13:50",
      "13:40",
      "13:30",
      "13:20",
      "13:10",
      "13:00",
      "12:50",
      "12:40",
      "12:30",
      "12:20",
      "12:10",
      "12:00",
      "11:50",
      "11:40",
      "11:30",
      "11:20",
      "11:10",
      "11:00",
      "10:50",
      "10:40",
      "10:30",
      "10:20",
      "10:10",
      "10:00",
      "9:50",
      "9:40",
      "9:30",
      "9:20",
      "9:10",
      "9:00",
      "8:50",
      "8:40",
      "8:30",
    ];

    const female_r = [
      "10:00",
      "10:10",
      "10:20",
      "10:30",
      "10:40",
      "10:50",
      "11:00",
      "11:10",
      "11:20",
      "11:30",
      "11:40",
      "11:50",
      "12:00",
      "12:10",
      "12:20",
      "12:30",
      "12:40",
      "12:50",
      "13:00",
      "13:10",
      "13:20",
      "13:30",
      "13:40",
      "13:50",
      "14:00",
      "14:10",
      "14:20",
      "14:30",
      "14:40",
      "14:50",
      "15:00",
      "15:10",
      "15:20",
      "15:30",
      "15:40",
      "15:50",
      "16:00",
      "16:10",
      "16:20",
      "16:30",
      "16:40",
      "16:50",
      "17:00",
      "17:10",
      "17:20",
      "17:30",
      "17:40",
      "17:50",
      "18:00",
      "18:10",
      "18:20",
      "18:30",
      "18:40",
      "18:50",
      "19:00",
      "19:10",
      "19:20",
      "19:30",
      "19:40",
      "19:50",
      "20:00",
      "20:10",
      "20:20",
      "20:30",
      "20:40",
      "20:50",
      "21:00",
      "21:10",
      "21:20",
      "21:30",
      "21:40",
      "21:50",
      "22:00",
      "22:10",
    ];

    // ✅ Needed push-ups/sit-ups for next level
    const need_push_val = push_s + to_next;
    const need_push = pusha[age_g].indexOf(need_push_val) + 1;

    const need_sit_val = sit_s + to_next;
    const need_sit = sita[age_g].indexOf(need_sit_val) + 1;

    // ✅ Return Response
    return {
      tech_status: status,
      tech_need_push: need_push,
      tech_need_sit: need_sit,
      tech_to_next: to_next,
      tech_score: score,
      tech_push_s: push_s,
      tech_sit_s: sit_s,
      tech_run_s: run_s,
    };
  }

  /**
   * getCalculationWeightLossPercentageCalculator: Service Method
   * POST: /api/calculators-lol/weight-loss-percentage-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationWeightLossPercentageCalculator(body) {
    let inw = body.tech_inw;
    let crw = body.tech_crw;
    let unit = body.tech_unit;
    let unit1 = body.tech_unit1;

    let param = {};

    inw = parseFloat(inw);
    crw = parseFloat(crw);

    if (!isNaN(inw) && !isNaN(crw)) {
      let inw_lbs, inw_kg, crw_lbs, crw_kg, pw, wg;

      if (unit === "lbs") {
        inw_lbs = inw;
        inw_kg = inw / 2.20462;
      } else {
        inw_lbs = inw * 2.20462;
        inw_kg = inw;
      }

      if (unit1 === "lb") {
        crw_lbs = crw;
        crw_kg = crw / 2.20462;
      } else {
        crw_lbs = crw * 2.20462;
        crw_kg = crw;
      }

      if (unit === unit1) {
        pw = parseFloat((((inw - crw) / inw) * 100).toFixed(2));
        wg = `${crw - inw} ${unit1}`;
      } else {
        if (unit === "kg") inw = inw * 2.20462;
        if (unit1 === "lbs") crw = crw * 2.20462;
        pw = parseFloat((((inw - crw) / inw) * 100).toFixed(2));
        wg = `${crw - inw} lbs`;
      }

      param.tech_pw = pw;
      param.tech_wg = wg;
      param.tech_inw_lbs = inw_lbs.toFixed(2);
      param.tech_inw_kg = inw_kg.toFixed(2);
      param.tech_crw_lbs = crw_lbs.toFixed(2);
      param.tech_crw_kg = crw_kg.toFixed(2);

      return param;
    } else {
      return { error: "Please! Check Your Input." };
    }
  }

  /**
   * getCalculationDosageCalculator: Service Method
   * POST: /api/calculators-lol/dosage-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationDosageCalculator(body) {
    let w = body.tech_w;
    let w1 = body.tech_w1;
    let d = body.tech_d;
    let d1 = body.tech_d1;
    let f = body.tech_f;
    let mc = body.tech_mc;
    let mc1 = body.tech_mc1;
    let param = {};

    w = parseFloat(w);
    d = parseFloat(d);
    mc = parseFloat(mc);

    if (mc1 === "g/L") {
      mc1 = "gl";
    } else if (mc1 === "mg/mL") {
      mc1 = "mgl";
    } else if (mc1 === "µg/L") {
      mc1 = "ugl";
    } else if (mc1 === "mg/mL") {
      mc1 = "mg-ml";
    } else if (mc1 === "µg/mL") {
      mc1 = "ug-ml";
    }

    if (d1 === "µg/kg") {
      d1 = "u-kg";
    } else if (d1 === "mg/kg") {
      d1 = "mg-kg";
    } else if (d1 === "g/kg") {
      d1 = "g-kg";
    }

    if (w1 === "kg") {
      w1 = "kg";
    } else if (w1 === "lbs") {
      w1 = "lb";
    }

    if (!isNaN(w) && !isNaN(d)) {
      if (w1 === "lb") {
        w = w / 2.205;
      }

      if (d1 === "u-kg") {
        d = d / 1000;
      }

      if (d1 === "g-kg") {
        d = d * 1000;
      }

      if (mc1 === "mgl" || mc1 === "ug-ml") {
        mc = mc / 1000;
      }

      if (mc1 === "ugl") {
        mc = mc / 1000000;
      }

      let tdose = w * d;
      let gr = tdose / 1000;
      let ug = tdose * 1000;
      let dose;

      if (f != 1) {
        switch (f) {
          case "4h":
            dose = tdose / 6;
            break;
          case "3h":
            dose = tdose / 8;
            break;
          case "2h":
            dose = tdose / 12;
            break;
          case "h":
            dose = tdose / 24;
            break;
          default:
            dose = tdose / parseFloat(f);
        }
        param["tech_dose"] = dose;
      }

      if (!isNaN(mc)) {
        let lq_dose = tdose / mc;
        let g = lq_dose / 1000;

        param["tech_lq_dose"] = parseFloat(lq_dose.toFixed(2));
        param["tech_g"] = parseFloat(g.toFixed(2));

        if (f != 1) {
          let lq_dose1 = dose / mc;
          param["tech_lq_dose1"] = parseFloat(lq_dose1.toFixed(2));
        }
      }

      param["tech_tdose"] = parseFloat(tdose.toFixed(1));
      param["tech_ug"] = parseFloat(ug.toFixed(2));
      param["tech_gr"] = parseFloat(gr.toFixed(2));

      return param;
    } else {
      return { error: "Please fill all fields." };
    }
  }

  /**
   * getCalculationBraSizeCalculator: Service Method
   * POST: /api/calculators-lol/bra-size-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationBraSizeCalculator(body) {
    let bust = parseFloat(body.tech_bust);
    let unit = body.tech_unit?.trim();
    let band = parseFloat(body.tech_band);
    let unit1 = body.tech_unit1?.trim();

    let response = {};

    if (!isNaN(bust) && !isNaN(band)) {
      const sizes = {
        0: ["AA", "AA", "AA", "AA", "AA"],
        1: ["A", "A", "A", "A", "A"],
        2: ["B", "B", "B", "B", "B"],
        3: ["C", "C", "C", "C", "C"],
        4: ["D", "D", "D", "E", "E"],
        5: ["DD/E", "DD", "DD", "F", "F"],
        6: ["DDD/F", "E", "E", "G", "G"],
        7: ["DDDD/G", "F", "F", "H", "H"],
        8: ["H", "G", "FF", "J", "J"],
        9: ["I", "H", "G", "K", "K"],
        10: ["J", "I", "GG", "L", "L"],
        11: ["K", "J", "H", "M", "M"],
        12: ["L", "K", "HH", "O", "O"],
        13: ["M", "L", "J", "P", "P"],
        14: ["N", "M", "JJ", "Q", "Q"],
        15: ["O", "N", "K", "S", "S"],
        16: ["P", "O", "KK", "T", "T"],
        17: ["Q", "P", "L", "U", "U"],
        18: ["R", "Too big bust size", "LL", "V", "V"],
        19: [
          "Too big bust size",
          "Too big bust size",
          "Too big bust size",
          "Y",
          "Y",
        ],
        20: [
          "Too big bust size",
          "Too big bust size",
          "Too big bust size",
          "Z",
          "Z",
        ],
      };

      let main_bust = bust;
      let main_band = band;

      if (unit === "cm") bust = Math.round(bust / 2.54);
      if (unit1 === "cm") band = Math.round(band / 2.54);

      let diff;
      if (band % 2 === 0) {
        diff = Math.round(bust) - Math.round(band);
      } else {
        band = band > main_band ? band - 1 : band + 1;
        diff = Math.round(bust) - Math.round(band);
      }

      if (band > bust) {
        response.error = "Bust size must be greater than Band size.";
        return response;
      }

      let aus, eu, fr;
      if (band < 26) {
        band = aus = eu = fr = "Band too small";
      } else {
        let diff1 = band - 26;
        aus = 4 + diff1;
        eu = 55 + diff1 * 2.5;
        fr = 70 + diff1 * 2.5;
      }

      let ans =
        diff > 20
          ? [
              "Too big bust size",
              "Too big bust size",
              "Too big bust size",
              "Too big bust size",
              "Too big bust size",
            ]
          : sizes[diff] || [
              "Unknown",
              "Unknown",
              "Unknown",
              "Unknown",
              "Unknown",
            ];

      response.tech_band = band;
      response.tech_aus = aus;
      response.tech_ans = ans;
      response.tech_eu = eu;
      response.tech_fr = fr;
    } else {
      response.error = "Please Check Your Input.";
    }

    return response;
  }

  /**
   * getCalculationImplantationCalculator: Service Method
   * POST: /api/calculators-lol/implantation-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationImplantationCalculator(body) {
    let know = body.tech_know;
    let ovd = body.tech_ovd;
    let lp = body.tech_lp;
    let mcl = body.tech_mcl;
    let ivf = body.tech_ivf;

    know = (know || "").trim();
    ovd = (ovd || "").trim();
    lp = (lp || "").trim();
    mcl = parseInt(mcl) || 0;
    ivf = (ivf || "").trim();

    let result = {};

    let ovulationDate;

    if (know === "yes" && ovd) {
      ovulationDate = moment(ovd);
    } else if (know === "no" && lp) {
      const days = mcl - 14;
      ovulationDate = moment(lp).add(days, "days");
    } else {
      result.error = "Please Check Your Input.";
      return result;
    }

    const formattedOvulationDate = ovulationDate.format("MMM DD, YYYY");

    let table = `<table className="w-full" cellspacing="0">
              <thead className="bggreen_implantation_calculator">
                  <tr>
                      <td colspan="3" className="text-center border-2 radius-t-10 px-3 py-2">
                          Ovulation Date: "${formattedOvulationDate}"
                      </td>
                  </tr>
                  <tr>
                      <td className="radius-bl-10 px-3 py-2">Days Past Ovulation (DPO)</td>
                      <td className="px-3">Date</td>
                      <td className="radius-br-10 px-3">Probability of Implantation</td>
                  </tr>
              </thead>
              <tbody>`;

    for (let i = 0; i < 17; i++) {
      const impDate = ovulationDate
        .clone()
        .add(i, "days")
        .format("MMM DD, YYYY");
      let cmnt = "";
      let clr = "";

      if (i === 0) {
        cmnt = "Ovulation";
        clr = "clr_0";
      } else if (i > 0 && i < 6) {
        cmnt = "Travel inside Fallopian tube";
        clr = "clr_1";
      } else if ((i > 5 && i < 9) || (i > 9 && i < 13)) {
        cmnt = "Implantation possible";
        clr = "clr_2";
      } else if (i === 9) {
        cmnt = "Implantation very possible";
        clr = "clr_3";
      } else if (i > 12 && i < 15) {
        cmnt = "Implantation unlikely";
        clr = "clr_1";
      } else {
        cmnt = "Missed Period: Pregnancy Test?";
        clr = "clr_4";
      }

      const border = i < 16 ? "border-b" : "";
      table += `<tr className='${clr}'><th className='text-start ${border} px-3 py-3'>${i} DPO</th><td className='${border} px-3'>${impDate}</td><td className='${border} px-3'>${cmnt}</td></tr>`;
    }

    table += "</tbody></table>";

    if (ivf) {
      const ivfDate = moment(ivf).add(5, "days").format("MMM DD, YYYY");
      result.tech_ivf = ivfDate;
    }

    result.tech_table = table;
    return result;
  }

  /**
   * getCalculationMapCalculator: Service Method
   * POST: /api/calculators-lol/one-rep-max-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationOneRepMaxCalculator(body) {
    let tech_weight = parseFloat(body.tech_weight);
    let tech_weight_unit = (body.tech_weight_unit || "").trim().toLowerCase();
    let tech_rep = parseFloat(body.tech_rep);

    if (!isNaN(tech_weight) && !isNaN(tech_rep)) {
      // Convert weight from lbs to kg
      if (tech_weight_unit === "lbs") {
        tech_weight = tech_weight * 0.4536;
      }

      // Calculate 1RM
      let tech_ans = tech_weight * tech_rep * 0.0333 + tech_weight;

      // Convert back to lbs if original input was in lbs
      if (tech_weight_unit === "lbs") {
        tech_ans = tech_ans * 2.2046;
      }

      return {
        tech_ans,
        tech_request: body,
      };
    } else {
      return {
        error: "Please! Check your input.",
      };
    }
  }

  /**
   * getCalculationBloodTypeCalculator: Service Method
   * POST: /api/calculators-lol/blood-type-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationBloodTypeCalculator(body) {
    let op = body.tech_selection;
    let op1 = body.tech_c_unit;
    let op2 = body.tech_selection3;
    let op3 = body.tech_d_unit;

    let A = 0,
      B = 0,
      AB = 0,
      O = 0;
    let Rhpos = 0,
      Rhneg = 0;

    // Blood group logic
    if (op === "0" && op2 === "0") {
      A = 0;
      B = 0;
      AB = 0;
      O = 100;
    }
    if (op === "1" && op2 === "1") {
      A = 93.75;
      B = 0;
      AB = 0;
      O = 6.25;
    }
    if (op === "2" && op2 === "2") {
      A = 0;
      B = 93.75;
      AB = 0;
      O = 6.25;
    }
    if (op === "3" && op2 === "3") {
      A = 25;
      B = 25;
      AB = 50;
      O = 0;
    }
    if ((op === "0" && op2 === "1") || (op === "1" && op2 === "0")) {
      A = 75;
      B = 0;
      AB = 0;
      O = 25;
    }
    if ((op === "0" && op2 === "2") || (op === "2" && op2 === "0")) {
      A = 0;
      B = 75;
      AB = 0;
      O = 25;
    }
    if ((op === "0" && op2 === "3") || (op === "3" && op2 === "0")) {
      A = 50;
      B = 50;
      AB = 0;
      O = 0;
    }
    if ((op === "1" && op2 === "2") || (op === "2" && op2 === "1")) {
      A = 18.75;
      B = 18.75;
      AB = 56.25;
      O = 6.25;
    }
    if ((op === "1" && op2 === "3") || (op === "3" && op2 === "1")) {
      A = 50;
      B = 12.5;
      AB = 37.5;
      O = 0;
    }
    if ((op === "2" && op2 === "3") || (op === "3" && op2 === "2")) {
      A = 12.5;
      B = 50;
      AB = 37.5;
      O = 0;
    }

    // Rh factor logic
    if (op1 === "0" && op3 === "0") {
      Rhpos = 93.75;
      Rhneg = 6.25;
    }
    if ((op1 === "0" && op3 === "1") || (op1 === "1" && op3 === "0")) {
      Rhpos = 75;
      Rhneg = 25;
    }
    if (op1 === "1" && op3 === "1") {
      Rhpos = 0;
      Rhneg = 100;
    }

    return {
      tech_A: A,
      tech_B: B,
      tech_AB: AB,
      tech_O: O,
      tech_rhpos: Rhpos,
      tech_rhneg: Rhneg,
    };
  }

  /**
   * getCalculationMelatoninDosageCalculator: Service Method
   * POST: /api/calculators-lol/melatonin-dosage-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationMelatoninDosageCalculator(body) {
    let selection = body.tech_selection;
    let selection1 = body.tech_selection3;
    let units = body.tech_d_unit;
    let inputs = body.tech_charge;

    let unit;
    if (units === "days") {
      unit = 1;
    } else if (units === "weeks") {
      unit = 2;
    } else if (units === "months") {
      unit = 3;
    } else if (units === "years") {
      unit = 4;
    } else {
      unit = units; // in case it's already converted
    }

    let days,
      weeks,
      months,
      years,
      cn,
      drops,
      applications,
      tablets,
      strips,
      ml,
      ans2,
      ans3,
      ans4,
      ans1_second,
      ans1_third,
      ans1_four,
      tablet;

    if (isNaN(inputs) || inputs <= 0) {
      return { error: "Please! Enter value greater than 0." };
    }

    if (unit == 1) {
      days = "days";
      cn = inputs * 1;
    } else if (unit == 2) {
      weeks = "weeks";
      cn = inputs * 7;
    } else if (unit == 3) {
      months = "months";
      const cn1 = inputs * 30.44;
      const cn2 = cn1 + 0.4;
      cn = Math.round(cn2);
    } else if (unit == 4) {
      years = "years";
      const cn1 = inputs * 365.25;
      const cn2 = cn1 + 0.4;
      cn = Math.round(cn2);
    }

    let answer1, answer2, answer3, answer4, ans1, ans1_first;

    switch (selection) {
      case "1":
        answer1 = "0.3-5";
        answer2 = "Taken 1 h before sleep.";
        switch (selection1) {
          case "1":
            answer3 = "Number of tablets needed for a";
            tablets = "tablets";
            answer4 = inputs;
            ans1_first = cn * 5;
            const ans1_sec = ans1_first / 3;
            ans1_second = Math.round(ans1_sec + 0.4);
            ans1_third = cn;
            const ans1_four1 = ans1_first / 10;
            ans1_four = Math.round(ans1_four1 + 0.4);
            ans1 = "1 mg →";
            ans2 = "3 mg →";
            ans3 = "5 mg →";
            ans4 = "10 mg →";
            break;
          case "2":
            answer3 = "Volume needed for a";
            answer4 = inputs;
            drops = "drops";
            ml = "mL";
            ans1 = "1 mg/25ml →";
            ans1_first = cn * 125;
            ans1_second = ans1_first / 5;
            break;
          case "3":
            answer3 = "Number of spray applications needed for";
            answer4 = inputs;
            applications = "applications";
            ans1 = "0.5 mg/application →";
            ans1_first = cn * 10;
            break;
          case "4":
            answer3 = "Number of strips needed for";
            answer4 = inputs;
            strips = "strips";
            ans1 = "1 mg →";
            ans2 = "3 mg →";
            const ans1_first1 = cn * 5;
            ans1_first = Math.round(ans1_first1 + 0.4);
            const ans1_sec1 = ans1_first / 3;
            ans1_second = Math.round(ans1_sec1 + 0.4);
            break;
        }
        break;
      case "2":
        answer1 = "1-6";
        answer2 =
          "For eastbound flights (e.g., US to Europe) take melatonin for two days before the flight, around 7 PM. Continue taking melatonin for 4 days after arrival, right before going to bed.";
        switch (selection1) {
          case "1":
            answer3 = "Number of tablets needed for a";
            tablets = "tablets";
            answer4 = inputs;
            ans1_first = cn * 6;
            const ans1_sec = ans1_first / 3;
            ans1_second = Math.round(ans1_sec + 0.4);
            const ans1_third1 = ans1_first / 5;
            ans1_third = Math.round(ans1_third1 + 0.4);
            const ans1_four1 = ans1_first / 10;
            ans1_four = Math.round(ans1_four1 + 0.4);
            ans1 = "1 mg →";
            ans2 = "3 mg →";
            ans3 = "5 mg →";
            ans4 = "10 mg →";
            break;
          case "2":
            answer3 = "Volume needed for a";
            answer4 = inputs;
            drops = "drops";
            ml = "mL";
            ans1 = "1 mg/25ml →";
            ans1_first = cn * 150;
            ans1_second = ans1_first / 5;
            break;
          case "3":
            answer3 = "Number of spray applications needed for";
            answer4 = inputs;
            applications = "applications";
            ans1 = "0.5 mg/application →";
            ans1_first = cn * 12;
            break;
          case "4":
            answer3 = "Number of strips needed for";
            answer4 = inputs;
            strips = "strips";
            ans1 = "1 mg →";
            ans2 = "3 mg →";
            const ans1_first1 = cn * 6;
            ans1_first = Math.round(ans1_first1 + 0.4);
            const ans1_sec1 = ans1_first / 3;
            ans1_second = Math.round(ans1_sec1 + 0.4);
            break;
        }
        break;
      case "3":
        answer1 = "1-6";
        answer2 =
          "For westbound flights (e.g., Europe to the US) take melatonin for 4 days after arrival, right before going to bed.";
        switch (selection1) {
          case "1":
            answer3 = "Number of tablets needed for a";
            tablets = "tablets";
            answer4 = inputs;
            ans1_first = cn * 6;
            const ans1_sec = cn * 2;
            ans1_second = Math.round(ans1_sec + 0.4);
            const ans1_third1 = ans1_first / 5;
            ans1_third = Math.round(ans1_third1 + 0.4);
            const ans1_four1 = ans1_first / 10;
            ans1_four = Math.round(ans1_four1 + 0.4);
            ans1 = "1 mg →";
            ans2 = "3 mg →";
            ans3 = "5 mg →";
            ans4 = "10 mg →";
            break;
          case "2":
            answer3 = "Volume needed for a";
            answer4 = inputs;
            drops = "drops";
            ml = "mL";
            ans1 = "1 mg/25ml →";
            ans1_first = cn * 150;
            ans1_second = ans1_first / 5;
            break;
          case "3":
            answer3 = "Number of spray applications needed for";
            answer4 = inputs;
            applications = "applications";
            ans1 = "0.5 mg/application →";
            ans1_first = cn * 12;
            break;
          case "4":
            answer3 = "Number of strips needed for";
            answer4 = inputs;
            strips = "strips";
            ans1 = "1 mg →";
            ans2 = "3 mg →";
            const ans1_first1 = cn * 6;
            ans1_first = Math.round(ans1_first1 + 0.4);
            const ans1_sec1 = ans1_first / 3;
            ans1_second = Math.round(ans1_sec1 + 0.4);
            break;
        }
        break;
      case "4":
        answer1 = "0.5";
        answer2 = "Take melatonin around 9-10 PM, before going to sleep.";
        switch (selection1) {
          case "1":
            answer3 = "Number of tablets needed for a";
            tablet = "tablets";
            answer4 = inputs;
            const ans1_first1s = cn * 0.5;
            ans1_first = Math.round(ans1_first1s + 0.4);
            const ans1_sec = ans1_first / 3;
            ans1_second = Math.round(ans1_sec + 0.4);
            ans1 = "1 mg →";
            ans2 = "3 mg →";
            break;
          case "2":
            answer3 = "Volume needed for a";
            answer4 = inputs;
            drops = "drops";
            ml = "mL";
            ans1 = "1 mg/25ml →";
            ans1_first = cn * 12.5;
            ans1_second = cn * 2.5;
            break;
          case "3":
            answer3 = "Number of spray applications needed for";
            answer4 = inputs;
            applications = "applications";
            ans1 = "0.5 mg/application →";
            ans1_first = cn;
            break;
          case "4":
            answer3 = "Number of strips needed for";
            answer4 = inputs;
            strips = "strips";
            ans1 = "1 mg →";
            const ans1_first1 = cn * 0.5;
            ans1_first = Math.round(ans1_first1 + 0.4);
            break;
        }
        break;
      case "5":
        answer1 = "2.5";
        answer2 = "Taken daily, for up to 4 weeks.";
        switch (selection1) {
          case "1":
            answer3 = "Number of tablets needed for a";
            tablets = "tablets";
            answer4 = inputs;
            const ans1_first1d = cn * 2.5;
            ans1_first = Math.round(ans1_first1d + 0.4);
            const ans1_sec = ans1_first / 3;
            ans1_second = Math.round(ans1_sec + 0.4);
            const ans1_third1 = ans1_first / 5;
            ans1_third = Math.round(ans1_third1 + 0.4);
            const ans1_four1 = ans1_first / 10;
            ans1_four = Math.round(ans1_four1 + 0.4);
            ans1 = "1 mg →";
            ans2 = "3 mg →";
            ans3 = "5 mg →";
            ans4 = "10 mg →";
            break;
          case "2":
            answer3 = "Volume needed for a";
            answer4 = inputs;
            drops = "drops";
            ml = "mL";
            ans1 = "1 mg/25ml →";
            ans1_first = cn * 62.5;
            ans1_second = ans1_first / 5;
            break;
          case "3":
            answer3 = "Number of spray applications needed for";
            answer4 = inputs;
            applications = "applications";
            ans1 = "0.5 mg/application →";
            const ans1_first1e = cn * 5;
            ans1_first = Math.round(ans1_first1e + 0.4);
            break;
          case "4":
            answer3 = "Number of strips needed for";
            answer4 = inputs;
            strips = "strips";
            ans1 = "1 mg →";
            ans2 = "3 mg →";
            const ans1_first1 = cn * 2.5;
            ans1_first = Math.round(ans1_first1 + 0.4);
            const ans1_sec1 = ans1_first / 3;
            ans1_second = Math.round(ans1_sec1 + 0.4);
            break;
        }
        break;
      case "6":
        answer1 = "10";
        answer2 = "Taken daily, for up to 8 weeks.";
        switch (selection1) {
          case "1":
            answer3 = "Number of tablets needed for a";
            tablets = "tablets";
            answer4 = inputs;
            const ans1_first1 = cn * 10;
            ans1_first = Math.round(ans1_first1 + 0.4);
            const ans1_sec = ans1_first / 3;
            ans1_second = Math.round(ans1_sec + 0.4);
            const ans1_third1 = ans1_first / 5;
            ans1_third = Math.round(ans1_third1 + 0.4);
            const ans1_four1 = ans1_first / 10;
            ans1_four = Math.round(ans1_four1 + 0.4);
            ans1 = "1 mg →";
            ans2 = "3 mg →";
            ans3 = "5 mg →";
            ans4 = "10 mg →";
            break;
          case "2":
            answer3 = "Volume needed for a";
            answer4 = inputs;
            drops = "drops";
            ml = "mL";
            ans1 = "1 mg/25ml →";
            ans1_first = cn * 250;
            ans1_second = ans1_first / 5;
            break;
          case "3":
            answer3 = "Number of spray applications needed for";
            answer4 = inputs;
            applications = "applications";
            ans1 = "0.5 mg/application →";
            ans1_first = cn * 20;
            break;
          case "4":
            answer3 = "Number of strips needed for";
            answer4 = inputs;
            strips = "strips";
            ans1 = "1 mg →";
            ans2 = "3 mg →";
            const ans1_first111 = cn * 10;
            ans1_first = Math.round(ans1_first111 + 0.4);
            const ans1_sec1 = ans1_first / 3;
            ans1_second = Math.round(ans1_sec1 + 0.4);
            break;
        }
        break;
      default:
        return { error: "Invalid selection" };
    }

    return {
      tech_answer1: answer1,
      tech_answer2: answer2,
      tech_answer3: answer3,
      tech_answer4: answer4,
      tech_ans1: ans1,
      tech_ans2: ans2,
      tech_ans3: ans3,
      tech_ans4: ans4,
      tech_ans1_first: ans1_first,
      tech_ans1_second: ans1_second,
      tech_ans1_third: ans1_third,
      tech_ans1_four: ans1_four,
      tech_tablets: tablets,
      tech_tablet: tablet,
      tech_ml: ml,
      tech_drops: drops,
      tech_unit: unit,
      tech_applications: applications,
      tech_strips: strips,
      tech_cn: cn,
      tech_years: years,
      tech_days: days,
      tech_weeks: weeks,
      tech_months: months,
    };
  }

  /**
   * getCalculationProstateVolumeCalculator: Service Method
   * POST: /api/calculators-lol/prostate-volume-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationProstateVolumeCalculator(body) {
    let length = body.tech_length;
    let length_unit = body.tech_length_unit;
    let width = body.tech_width;
    let width_unit = body.tech_width_unit;
    let height = body.tech_height;
    let height_unit = body.tech_height_unit;
    let psa = body.tech_psa;

    // Unit conversion map
    const unitMap = {
      mm: 10,
      cm: 1,
      dm: 0.1,
      m: 0.01,
      km: 0.00001,
      mi: 0.000006213711922373,
      in: 0.3937007874016,
      ft: 0.03280839895013,
      yd: 0.01093613298338,
    };

    let result = {};

    // Convert to float
    length = parseFloat(length);
    width = parseFloat(width);
    height = parseFloat(height);
    psa = parseFloat(psa);

    if (!isNaN(length) && !isNaN(width) && !isNaN(height)) {
      let first = length * unitMap[length_unit];
      let second = width * unitMap[width_unit];
      let third = height * unitMap[height_unit];

      let div = Math.PI / 6;
      let div2 = (5 * Math.PI) / 24;

      let answer = first * second * third * div;
      let answer22 = first * second * third * div2;

      let answer2 = 0;
      let answer23 = 0;

      if (!isNaN(psa)) {
        if (psa !== 0) {
          answer2 = psa / answer;
          answer23 = psa / answer22;
        }
      }

      result.tech_answer = answer;
      result.tech_answer22 = answer22;
      result.tech_answer2 = answer2;
      result.tech_answer23 = answer23;
    } else {
      result.error = "Please! Check your input.";
    }

    return result;
  }

  /**
   * getCalculationSVRCalculator: Service Method
   * POST: /api/calculators-lol/svr-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationSVRCalculator(body) {
    let tech_map = parseFloat(body.tech_map);
    let tech_map_unit = (body.tech_map_unit || "").trim();
    let tech_cvp = parseFloat(body.tech_cvp);
    let tech_cvp_unit = (body.tech_cvp_unit || "").trim();
    let tech_co = parseFloat(body.tech_co);
    let tech_co_unit = (body.tech_co_unit || "").trim();

    const convertUnit = (unit, type) => {
      if (type === "pressure") {
        switch (unit) {
          case "cmH2O":
            return 0.735559;
          case "kPa":
            return 7.50062;
          case "atm":
            return 760;
          case "psi":
            return 51.7149;
          default:
            return 1; // mmHg
        }
      }
      if (type === "flow") {
        return unit === "mL/min" ? 1000 : 1; // L/min default
      }
      return 1;
    };

    let tech_map_unit_val = convertUnit(tech_map_unit, "pressure");
    let tech_cvp_unit_val = convertUnit(tech_cvp_unit, "pressure");
    let tech_co_unit_val = convertUnit(tech_co_unit, "flow");

    if (
      !isNaN(tech_map) &&
      !isNaN(tech_cvp) &&
      !isNaN(tech_co) &&
      tech_map > 0 &&
      tech_cvp > 0 &&
      tech_co > 0
    ) {
      const tech_map_value = tech_map * tech_map_unit_val;
      const tech_cvp_value = tech_cvp * tech_cvp_unit_val;
      const tech_co_value = tech_co * tech_co_unit_val;

      const tech_cal1 = tech_map_value - tech_cvp_value;
      const tech_cal2 = tech_cal1 / tech_co_value;
      const tech_svr = 80 * tech_cal2;

      return {
        tech_svr,
      };
    } else {
      return {
        error: "Please! Check Your Input.",
      };
    }
  }

  /**
   * getCalculationDihybridcrossCalculator: Service Method
   * POST: /api/calculators-lol/dihybrid-cross-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationDihybridcrossCalculator(body) {
    const mother1 = body.tech_mtype1 ? body.tech_mtype1.trim() : "";
    const mother2 = body.tech_mtype2 ? body.tech_mtype2.trim() : "";
    const father1 = body.tech_ftype1 ? body.tech_ftype1.trim() : "";
    const father2 = body.tech_ftype2 ? body.tech_ftype2.trim() : "";

    const result = {
      tech_table: "",
      tech_finalRes: null,
      tech_tablResults: [],
    };

    function isNumeric(value) {
      return /^\d+$/.test(value);
    }
    if (
      isNumeric(mother1) &&
      isNumeric(mother2) &&
      isNumeric(father1) &&
      isNumeric(father2)
    ) {
      let m1, m2, m3, m4;
      let f1, f2, f3, f4;

      // Mother's gametes
      if (mother1 === "0" && mother2 === "0") {
        m1 = m2 = m3 = m4 = "AB";
      } else if (mother1 === "0" && mother2 === "1") {
        m1 = m2 = "AB";
        m3 = m4 = "Ab";
      } else if (mother1 === "0" && mother2 === "2") {
        m1 = m2 = m3 = m4 = "Ab";
      } else if (mother1 === "1" && mother2 === "1") {
        m1 = "AB";
        m2 = "Ab";
        m3 = "aB";
        m4 = "ab";
      } else if (mother1 === "1" && mother2 === "0") {
        m1 = m2 = "AB";
        m3 = m4 = "aB";
      } else if (mother1 === "1" && mother2 === "2") {
        m1 = m2 = "Ab";
        m3 = m4 = "ab";
      } else if (mother1 === "2" && mother2 === "0") {
        m1 = m2 = m3 = m4 = "aB";
      } else if (mother1 === "2" && mother2 === "1") {
        m1 = m2 = "aB";
        m3 = m4 = "ab";
      } else if (mother1 === "2" && mother2 === "2") {
        m1 = m2 = m3 = m4 = "ab";
      }

      // Father's gametes
      if (father1 === "0" && father2 === "0") {
        f1 = f2 = f3 = f4 = "AB";
      } else if (father1 === "0" && father2 === "1") {
        f1 = f2 = "AB";
        f3 = f4 = "Ab";
      } else if (father1 === "0" && father2 === "2") {
        f1 = f2 = f3 = f4 = "Ab";
      } else if (father1 === "1" && father2 === "1") {
        f1 = "AB";
        f2 = "Ab";
        f3 = "aB";
        f4 = "ab";
      } else if (father1 === "1" && father2 === "0") {
        f1 = f2 = "AB";
        f3 = f4 = "aB";
      } else if (father1 === "1" && father2 === "2") {
        f1 = f2 = "Ab";
        f3 = f4 = "ab";
      } else if (father1 === "2" && father2 === "0") {
        f1 = f2 = f3 = f4 = "aB";
      } else if (father1 === "2" && father2 === "1") {
        f1 = f2 = "aB";
        f3 = f4 = "ab";
      } else if (father1 === "2" && father2 === "2") {
        f1 = f2 = f3 = f4 = "ab";
      }

      // Generate table
      result.tech_table = `<table className="dihybrid-cross-calculator" cellspacing="0">
              <tr>
                  <td className="border-b py-2"><b>♂️\\♀️</b></td>
                  <td className="border-b"><b>${m1}</b></td>
                  <td className="border-b py-2"><b>${m2}</b></td>
                  <td className="border-b"><b>${m3}</b></td>
                  <td className="border-b py-2"><b>${m4}</b></td>
              </tr>
              <tr>
                  <td className="border-b py-2"><b>${f1}</b></td>
                  <td className="border-b py-2">${m1[0]}${f1[0]}${m1[1]}${f1[1]}</td>
                  <td className="border-b py-2">${m2[0]}${f1[0]}${m2[1]}${f1[1]}</td>
                  <td className="border-b py-2">${m3[0]}${f1[0]}${m3[1]}${f1[1]}</td>
                  <td className="border-b py-2">${m4[0]}${f1[0]}${m4[1]}${f1[1]}</td>
              </tr>
              <tr>
                  <td className="border-b py-2"><b>${f2}</b></td>
                  <td className="border-b py-2">${m1[0]}${f2[0]}${m1[1]}${f2[1]}</td>
                  <td className="border-b py-2">${m2[0]}${f2[0]}${m2[1]}${f2[1]}</td>
                  <td className="border-b py-2">${m3[0]}${f2[0]}${m3[1]}${f2[1]}</td>
                  <td className="border-b py-2">${m4[0]}${f2[0]}${m4[1]}${f2[1]}</td>
              </tr>
              <tr>
                  <td className="border-b py-2"><b>${f3}</b></td>
                  <td className="border-b py-2">${m1[0]}${f3[0]}${m1[1]}${f3[1]}</td>
                  <td className="border-b py-2">${m2[0]}${f3[0]}${m2[1]}${f3[1]}</td>
                  <td className="border-b py-2">${m3[0]}${f3[0]}${m3[1]}${f3[1]}</td>
                  <td className="border-b py-2">${m4[0]}${f3[0]}${m4[1]}${f3[1]}</td>
              </tr>
              <tr>
                  <td className="py-2"><b>${f4}</b></td>
                  <td>${m1[0]}${f4[0]}${m1[1]}${f4[1]}</td>
                  <td>${m2[0]}${f4[0]}${m2[1]}${f4[1]}</td>
                  <td>${m3[0]}${f4[0]}${m3[1]}${f4[1]}</td>
                  <td>${m4[0]}${f4[0]}${m4[1]}${f4[1]}</td>
              </tr>
          </table>`;

      const tablMother = [parseInt(mother1), parseInt(mother2)];
      const tablFather = [parseInt(father1), parseInt(father2)];

      const tablProp = [
        [
          [1, 0.5, 0],
          [0.5, 0.25, 0],
          [0, 0, 0],
        ],
        [
          [0, 0.5, 1],
          [0.5, 0.5, 0.5],
          [1, 0.5, 0],
        ],
        [
          [0, 0, 0],
          [0, 0.25, 0.5],
          [0, 0.5, 1],
        ],
      ];

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          result.tech_tablResults[3 * i + j] =
            tablProp[i][tablMother[0]][tablFather[0]] *
            tablProp[j][tablMother[1]][tablFather[1]];
        }
      }

      function getTablResults(mother1, father1, mother2, father2, idx) {
        const tablMother = [parseInt(mother1), parseInt(mother2)];
        const tablFather = [parseInt(father1), parseInt(father2)];
        const tablProp = [
          [
            [1, 0.5, 0],
            [0.5, 0.25, 0],
            [0, 0, 0],
          ],
          [
            [0, 0.5, 1],
            [0.5, 0.5, 0.5],
            [1, 0.5, 0],
          ],
          [
            [0, 0, 0],
            [0, 0.25, 0.5],
            [0, 0.5, 1],
          ],
        ];
        const tech_tablResults = [];
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            tech_tablResults[3 * i + j] =
              tablProp[i][tablMother[0]][tablFather[0]] *
              tablProp[j][tablMother[1]][tablFather[1]];
          }
        }
        return tech_tablResults[idx];
      }

      result.tech_finalRes = getTablResults(
        mother1,
        father1,
        mother2,
        father2,
        0
      );
    } else {
      result.error = "Please Check Your Input.";
    }

    return result;
  }

  /**
   * getCalculationHCGCalculator: Service Method
   * POST: /api/calculators-lol/hcg-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationHCGCalculator(body) {
    let first = parseFloat(body.tech_first);
    let second = parseFloat(body.tech_second);
    let third = parseFloat(body.tech_third);
    let unit3 = body.tech_unit3;

    function din(a, b) {
      if (a === "hours") {
        return b * 0.04167;
      } else if (a === "days") {
        return b * 1;
      } else {
        return 0; // fallback for unsupported units
      }
    }

    third = din(unit3, third);

    if (!isNaN(first) && !isNaN(second) && !isNaN(third)) {
      let difference = second - first;
      let pos = Math.abs(difference);
      let div1 = pos / first;
      let percent = div1 * 100;
      let div2 = second / first;
      let log = Math.log2(div2);
      let t2 = third / log;
      let hours = t2 * 24;
      let f_div = 24 / hours;
      let s_div = 48 / hours;
      let f_pow = Math.pow(2, f_div);
      let s_pow = Math.pow(2, s_div);
      let f_min = f_pow - 1;
      let s_min = s_pow - 1;
      let i1 = f_min * 100;
      let i2 = s_min * 100;

      return {
        tech_difference: difference,
        tech_percent: percent,
        tech_t2: t2,
        tech_i1: i1,
        tech_i2: i2,
      };
    } else {
      return {
        error: "Please! check your input.",
      };
    }
  }

  /**
   * getCalculationHeightPercentileCalculator: Service Method
   * POST: /api/calculators-lol/height-percentile-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationHeightPercentileCalculator(body) {
    let height_ft = body.tech_height_ft;
    let height_in = body.tech_height_in;
    let height_cm = body.tech_height_cm;
    let age = body.tech_age;
    let age_unit = body.tech_age_unit;
    let gender = body.tech_gender;
    let unit_ft_in = body.tech_unit_ft_in;

    let ageUnit = age_unit;
    if (age_unit == "days") {
      ageUnit = 1;
    } else if (age_unit == "weeks") {
      ageUnit = 2;
    } else if (age_unit == "months") {
      ageUnit = 3;
    } else if (age_unit == "years") {
      ageUnit = 4;
    }

    function umar(a, b) {
      let kini;
      if (a == "1") {
        kini = b / 365;
      } else if (a == "2") {
        kini = b / 52.143;
      } else if (a == "3") {
        kini = b / 12;
      } else if (a == "4") {
        kini = b * 1;
      }
      return kini;
    }

    const girls_to_13w = [
      {
        name: "a",
        uid: "4292594509",
        values: {
          age: 0,
          P01: "43.4",
          P1: "44.8",
          P3: "45.6",
          P5: "46.1",
          P10: "46.8",
          P15: "47.2",
          P25: "47.9",
          P50: "49.1",
          P75: "50.4",
          P85: "51.1",
          P90: "51.5",
          P95: "52.2",
          P97: "52.7",
          P99: "53.5",
          P999: "54.9",
        },
      },
      {
        name: 1,
        uid: "1320094567",
        values: {
          age: 1,
          P01: "44.5",
          P1: "45.9",
          P3: "46.8",
          P5: "47.2",
          P10: "47.9",
          P15: "48.4",
          P25: "49.1",
          P50: "50.3",
          P75: "51.6",
          P85: "52.3",
          P90: "52.7",
          P95: "53.4",
          P97: "53.9",
          P99: "54.7",
          P999: "56.1",
        },
      },
      {
        name: 2,
        uid: "2956171945",
        values: {
          age: 2,
          P01: "45.6",
          P1: "47.1",
          P3: "47.9",
          P5: "48.4",
          P10: "49.1",
          P15: "49.5",
          P25: "50.2",
          P50: "51.5",
          P75: "52.8",
          P85: "53.5",
          P90: 54,
          P95: "54.6",
          P97: "55.1",
          P99: "55.9",
          P999: "57.4",
        },
      },
      {
        name: 3,
        uid: "655667886",
        values: {
          age: 3,
          P01: "46.5",
          P1: 48,
          P3: "48.8",
          P5: "49.3",
          P10: 50,
          P15: "50.5",
          P25: "51.2",
          P50: "52.5",
          P75: "53.8",
          P85: "54.5",
          P90: "54.9",
          P95: "55.6",
          P97: "56.1",
          P99: "56.9",
          P999: "58.4",
        },
      },
      {
        name: 4,
        uid: "1735974756",
        values: {
          age: 4,
          P01: "47.4",
          P1: "48.9",
          P3: "49.7",
          P5: "50.2",
          P10: "50.9",
          P15: "51.4",
          P25: "52.1",
          P50: "53.4",
          P75: "54.7",
          P85: "55.4",
          P90: "55.9",
          P95: "56.6",
          P97: 57,
          P99: "57.9",
          P999: "59.4",
        },
      },
      {
        name: 5,
        uid: "2331707210",
        values: {
          age: 5,
          P01: "48.2",
          P1: "49.7",
          P3: "50.5",
          P5: 51,
          P10: "51.7",
          P15: "52.2",
          P25: "52.9",
          P50: "54.2",
          P75: "55.6",
          P85: "56.3",
          P90: "56.8",
          P95: "57.5",
          P97: "57.9",
          P99: "58.8",
          P999: "60.3",
        },
      },
      {
        name: 6,
        uid: "627454600",
        values: {
          age: 6,
          P01: "48.9",
          P1: "50.4",
          P3: "51.3",
          P5: "51.8",
          P10: "52.5",
          P15: 53,
          P25: "53.7",
          P50: "55.1",
          P75: "56.4",
          P85: "57.1",
          P90: "57.6",
          P95: "58.3",
          P97: "58.8",
          P99: "59.7",
          P999: "61.2",
        },
      },
      {
        name: 7,
        uid: "926254527",
        values: {
          age: 7,
          P01: "49.6",
          P1: "51.2",
          P3: "52.1",
          P5: "52.5",
          P10: "53.3",
          P15: "53.8",
          P25: "54.5",
          P50: "55.8",
          P75: "57.2",
          P85: "57.9",
          P90: "58.4",
          P95: "59.1",
          P97: "59.6",
          P99: "60.5",
          P999: 62,
        },
      },
      {
        name: 8,
        uid: "1934482258",
        values: {
          age: 8,
          P01: "50.3",
          P1: "51.9",
          P3: "52.8",
          P5: "53.2",
          P10: 54,
          P15: "54.5",
          P25: "55.2",
          P50: "56.6",
          P75: "57.9",
          P85: "58.7",
          P90: "59.2",
          P95: "59.9",
          P97: "60.4",
          P99: "61.3",
          P999: "62.8",
        },
      },
      {
        name: 9,
        uid: "915270415",
        values: {
          age: 9,
          P01: 51,
          P1: "52.5",
          P3: "53.4",
          P5: "53.9",
          P10: "54.7",
          P15: "55.2",
          P25: "55.9",
          P50: "57.3",
          P75: "58.7",
          P85: "59.4",
          P90: "59.9",
          P95: "60.6",
          P97: "61.1",
          P99: 62,
          P999: "63.6",
        },
      },
      {
        name: 10,
        uid: "1188328851",
        values: {
          age: 10,
          P01: "51.6",
          P1: "53.2",
          P3: "54.1",
          P5: "54.6",
          P10: "55.3",
          P15: "55.8",
          P25: "56.6",
          P50: "57.9",
          P75: "59.3",
          P85: "60.1",
          P90: "60.6",
          P95: "61.3",
          P97: "61.8",
          P99: "62.7",
          P999: "64.3",
        },
      },
      {
        name: 11,
        uid: "108398006",
        values: {
          age: 11,
          P01: "52.2",
          P1: "53.8",
          P3: "54.7",
          P5: "55.2",
          P10: "55.9",
          P15: "56.4",
          P25: "57.2",
          P50: "58.6",
          P75: 60,
          P85: "60.7",
          P90: "61.2",
          P95: 62,
          P97: "62.5",
          P99: "63.4",
          P999: 65,
        },
      },
      {
        name: 12,
        uid: "2249598896",
        values: {
          age: 12,
          P01: "52.7",
          P1: "54.3",
          P3: "55.3",
          P5: "55.8",
          P10: "56.5",
          P15: 57,
          P25: "57.8",
          P50: "59.2",
          P75: "60.6",
          P85: "61.4",
          P90: "61.9",
          P95: "62.6",
          P97: "63.1",
          P99: "64.1",
          P999: "65.6",
        },
      },
      {
        name: 13,
        uid: "728608598",
        values: {
          age: 13,
          P01: "53.3",
          P1: "54.9",
          P3: "55.8",
          P5: "56.3",
          P10: "57.1",
          P15: "57.6",
          P25: "58.4",
          P50: "59.8",
          P75: "61.2",
          P85: 62,
          P90: "62.5",
          P95: "63.2",
          P97: "63.7",
          P99: "64.7",
          P999: "66.3",
        },
      },
    ];

    const boys_to_5y = [
      {
        name: "a",
        uid: "4292594509",
        values: {
          age: 0,
          P01: "43.4",
          P1: "44.8",
          P3: "45.6",
          P5: "46.1",
          P10: "46.8",
          P15: "47.2",
          P25: "47.9",
          P50: "49.1",
          P75: "50.4",
          P85: "51.1",
          P90: "51.5",
          P95: "52.2",
          P97: "52.7",
          P99: "53.5",
          P999: "54.9",
        },
      },
      {
        name: 1,
        uid: "1694182680",
        values: {
          age: 1,
          P01: "47.6",
          P1: "49.1",
          P3: 50,
          P5: "50.5",
          P10: "51.2",
          P15: "51.7",
          P25: "52.4",
          P50: "53.7",
          P75: 55,
          P85: "55.7",
          P90: "56.2",
          P95: "56.9",
          P97: "57.4",
          P99: "58.2",
          P999: "59.7",
        },
      },
      {
        name: 2,
        uid: "3836906478",
        values: {
          age: 2,
          P01: "50.8",
          P1: "52.3",
          P3: "53.2",
          P5: "53.7",
          P10: "54.5",
          P15: 55,
          P25: "55.7",
          P50: "57.1",
          P75: "58.4",
          P85: "59.2",
          P90: "59.7",
          P95: "60.4",
          P97: "60.9",
          P99: "61.8",
          P999: "63.4",
        },
      },
      {
        name: 3,
        uid: "1857069783",
        values: {
          age: 3,
          P01: "53.3",
          P1: "54.9",
          P3: "55.8",
          P5: "56.3",
          P10: "57.1",
          P15: "57.6",
          P25: "58.4",
          P50: "59.8",
          P75: "61.2",
          P85: 62,
          P90: "62.5",
          P95: "63.3",
          P97: "63.8",
          P99: "64.7",
          P999: "66.3",
        },
      },
      {
        name: 4,
        uid: "2510953547",
        values: {
          age: 4,
          P01: "55.4",
          P1: "57.1",
          P3: 58,
          P5: "58.5",
          P10: "59.3",
          P15: "59.8",
          P25: "60.6",
          P50: "62.1",
          P75: "63.5",
          P85: "64.3",
          P90: "64.9",
          P95: "65.7",
          P97: "66.2",
          P99: "67.1",
          P999: "68.8",
        },
      },
      {
        name: 5,
        uid: "2879534329",
        values: {
          age: 5,
          P01: "57.2",
          P1: "58.9",
          P3: "59.9",
          P5: "60.4",
          P10: "61.2",
          P15: "61.7",
          P25: "62.5",
          P50: 64,
          P75: "65.5",
          P85: "66.3",
          P90: "66.9",
          P95: "67.7",
          P97: "68.2",
          P99: "69.2",
          P999: "70.9",
        },
      },
      {
        name: 6,
        uid: "3934177210",
        values: {
          age: 6,
          P01: "58.7",
          P1: "60.5",
          P3: "61.5",
          P5: 62,
          P10: "62.8",
          P15: "63.4",
          P25: "64.2",
          P50: "65.7",
          P75: "67.3",
          P85: "68.1",
          P90: "68.6",
          P95: "69.5",
          P97: 70,
          P99: 71,
          P999: "72.7",
        },
      },
      {
        name: 7,
        uid: "4181026999",
        values: {
          age: 7,
          P01: "60.1",
          P1: "61.9",
          P3: "62.9",
          P5: "63.5",
          P10: "64.3",
          P15: "64.9",
          P25: "65.7",
          P50: "67.3",
          P75: "68.8",
          P85: "69.7",
          P90: "70.3",
          P95: "71.1",
          P97: "71.6",
          P99: "72.7",
          P999: "74.4",
        },
      },
      {
        name: 8,
        uid: "1331713863",
        values: {
          age: 8,
          P01: "61.4",
          P1: "63.2",
          P3: "64.3",
          P5: "64.9",
          P10: "65.7",
          P15: "66.3",
          P25: "67.2",
          P50: "68.7",
          P75: "70.3",
          P85: "71.2",
          P90: "71.8",
          P95: "72.6",
          P97: "73.2",
          P99: "74.3",
          P999: "76.1",
        },
      },
      {
        name: 9,
        uid: "2290555629",
        values: {
          age: 9,
          P01: "62.7",
          P1: "64.5",
          P3: "65.6",
          P5: "66.2",
          P10: 67,
          P15: "67.6",
          P25: "68.5",
          P50: "70.1",
          P75: "71.8",
          P85: "72.6",
          P90: "73.2",
          P95: "74.1",
          P97: "74.7",
          P99: "75.8",
          P999: "77.6",
        },
      },
      {
        name: 10,
        uid: "2889369098",
        values: {
          age: 10,
          P01: "63.9",
          P1: "65.7",
          P3: "66.8",
          P5: "67.4",
          P10: "68.3",
          P15: "68.9",
          P25: "69.8",
          P50: "71.5",
          P75: "73.1",
          P85: 74,
          P90: "74.6",
          P95: "75.5",
          P97: "76.1",
          P99: "77.2",
          P999: "79.1",
        },
      },
      {
        name: 11,
        uid: "2996673809",
        values: {
          age: 11,
          P01: 65,
          P1: "66.9",
          P3: 68,
          P5: "68.6",
          P10: "69.5",
          P15: "70.2",
          P25: "71.1",
          P50: "72.8",
          P75: "74.5",
          P85: "75.4",
          P90: 76,
          P95: "76.9",
          P97: "77.5",
          P99: "78.6",
          P999: "80.6",
        },
      },
      {
        name: 12,
        uid: "2016267904",
        values: {
          age: 12,
          P01: "66.1",
          P1: 68,
          P3: "69.2",
          P5: "69.8",
          P10: "70.7",
          P15: "71.3",
          P25: "72.3",
          P50: 74,
          P75: "75.8",
          P85: "76.7",
          P90: "77.3",
          P95: "78.3",
          P97: "78.9",
          P99: 80,
          P999: 82,
        },
      },
      {
        name: 13,
        uid: "2499511250",
        values: {
          age: 13,
          P01: "67.1",
          P1: "69.1",
          P3: "70.3",
          P5: "70.9",
          P10: "71.8",
          P15: "72.5",
          P25: "73.4",
          P50: "75.2",
          P75: 77,
          P85: "77.9",
          P90: "78.6",
          P95: "79.5",
          P97: "80.2",
          P99: "81.3",
          P999: "83.3",
        },
      },
      {
        name: 14,
        uid: "3001587822",
        values: {
          age: 14,
          P01: "68.1",
          P1: "70.1",
          P3: "71.3",
          P5: 72,
          P10: "72.9",
          P15: "73.6",
          P25: "74.6",
          P50: "76.4",
          P75: "78.2",
          P85: "79.2",
          P90: "79.8",
          P95: "80.8",
          P97: "81.4",
          P99: "82.6",
          P999: "84.7",
        },
      },
      {
        name: 15,
        uid: "2541104492",
        values: {
          age: 15,
          P01: 69,
          P1: "71.1",
          P3: "72.4",
          P5: 73,
          P10: 74,
          P15: "74.7",
          P25: "75.7",
          P50: "77.5",
          P75: "79.4",
          P85: "80.3",
          P90: 81,
          P95: 82,
          P97: "82.7",
          P99: "83.9",
          P999: 86,
        },
      },
      {
        name: 16,
        uid: "3609313349",
        values: {
          age: 16,
          P01: 70,
          P1: "72.1",
          P3: "73.3",
          P5: 74,
          P10: 75,
          P15: "75.7",
          P25: "76.7",
          P50: "78.6",
          P75: "80.5",
          P85: "81.5",
          P90: "82.2",
          P95: "83.2",
          P97: "83.9",
          P99: "85.1",
          P999: "87.2",
        },
      },
      {
        name: 17,
        uid: "3392822480",
        values: {
          age: 17,
          P01: "70.9",
          P1: 73,
          P3: "74.3",
          P5: 75,
          P10: 76,
          P15: "76.7",
          P25: "77.7",
          P50: "79.7",
          P75: "81.6",
          P85: "82.6",
          P90: "83.3",
          P95: "84.4",
          P97: 85,
          P99: "86.3",
          P999: "88.5",
        },
      },
      {
        name: 18,
        uid: "3429818064",
        values: {
          age: 18,
          P01: "71.7",
          P1: 74,
          P3: "75.2",
          P5: "75.9",
          P10: 77,
          P15: "77.7",
          P25: "78.7",
          P50: "80.7",
          P75: "82.7",
          P85: "83.7",
          P90: "84.4",
          P95: "85.5",
          P97: "86.2",
          P99: "87.5",
          P999: "89.7",
        },
      },
      {
        name: 19,
        uid: "73114113",
        values: {
          age: 19,
          P01: "72.6",
          P1: "74.8",
          P3: "76.2",
          P5: "76.9",
          P10: "77.9",
          P15: "78.7",
          P25: "79.7",
          P50: "81.7",
          P75: "83.7",
          P85: "84.8",
          P90: "85.5",
          P95: "86.6",
          P97: "87.3",
          P99: "88.6",
          P999: "90.9",
        },
      },
      {
        name: 20,
        uid: "3424860360",
        values: {
          age: 20,
          P01: "73.4",
          P1: "75.7",
          P3: 77,
          P5: "77.7",
          P10: "78.8",
          P15: "79.6",
          P25: "80.7",
          P50: "82.7",
          P75: "84.7",
          P85: "85.8",
          P90: "86.6",
          P95: "87.7",
          P97: "88.4",
          P99: "89.7",
          P999: 92,
        },
      },
      {
        name: 21,
        uid: "99668725",
        values: {
          age: 21,
          P01: "74.2",
          P1: "76.5",
          P3: "77.9",
          P5: "78.6",
          P10: "79.7",
          P15: "80.5",
          P25: "81.6",
          P50: "83.7",
          P75: "85.7",
          P85: "86.8",
          P90: "87.6",
          P95: "88.7",
          P97: "89.4",
          P99: "90.8",
          P999: "93.1",
        },
      },
      {
        name: 22,
        uid: "1332685489",
        values: {
          age: 22,
          P01: 75,
          P1: "77.3",
          P3: "78.7",
          P5: "79.5",
          P10: "80.6",
          P15: "81.4",
          P25: "82.5",
          P50: "84.6",
          P75: "86.7",
          P85: "87.8",
          P90: "88.6",
          P95: "89.7",
          P97: "90.5",
          P99: "91.9",
          P999: "94.2",
        },
      },
      {
        name: 23,
        uid: "2477842487",
        values: {
          age: 23,
          P01: "75.7",
          P1: "78.1",
          P3: "79.6",
          P5: "80.3",
          P10: "81.5",
          P15: "82.2",
          P25: "83.4",
          P50: "85.5",
          P75: "87.7",
          P85: "88.8",
          P90: "89.6",
          P95: "90.7",
          P97: "91.5",
          P99: "92.9",
          P999: "95.3",
        },
      },
      {
        name: 24,
        uid: "3947959837",
        values: {
          age: 24,
          P01: "76.4",
          P1: "78.9",
          P3: "80.3",
          P5: "81.1",
          P10: "82.3",
          P15: "83.1",
          P25: "84.2",
          P50: "86.4",
          P75: "88.6",
          P85: "89.8",
          P90: "90.6",
          P95: "91.7",
          P97: "92.5",
          P99: "93.9",
          P999: "96.4",
        },
      },
      {
        name: 25,
        uid: "3437703006",
        values: {
          age: 25,
          P01: "76.5",
          P1: 79,
          P3: "80.4",
          P5: "81.2",
          P10: "82.4",
          P15: "83.2",
          P25: "84.4",
          P50: "86.6",
          P75: "88.8",
          P85: 90,
          P90: "90.8",
          P95: 92,
          P97: "92.8",
          P99: "94.2",
          P999: "96.7",
        },
      },
      {
        name: 26,
        uid: "2008451231",
        values: {
          age: 26,
          P01: "77.2",
          P1: "79.7",
          P3: "81.2",
          P5: 82,
          P10: "83.2",
          P15: 84,
          P25: "85.2",
          P50: "87.4",
          P75: "89.7",
          P85: "90.9",
          P90: "91.7",
          P95: "92.9",
          P97: "93.7",
          P99: "95.2",
          P999: "97.7",
        },
      },
      {
        name: 27,
        uid: "3869042796",
        values: {
          age: 27,
          P01: "77.8",
          P1: "80.4",
          P3: "81.9",
          P5: "82.7",
          P10: "83.9",
          P15: "84.8",
          P25: 86,
          P50: "88.3",
          P75: "90.6",
          P85: "91.8",
          P90: "92.6",
          P95: "93.8",
          P97: "94.6",
          P99: "96.1",
          P999: "98.7",
        },
      },
      {
        name: 28,
        uid: "488631192",
        values: {
          age: 28,
          P01: "78.5",
          P1: "81.1",
          P3: "82.6",
          P5: "83.5",
          P10: "84.7",
          P15: "85.5",
          P25: "86.8",
          P50: "89.1",
          P75: "91.4",
          P85: "92.7",
          P90: "93.5",
          P95: "94.7",
          P97: "95.6",
          P99: "97.1",
          P999: "99.7",
        },
      },
      {
        name: 29,
        uid: "225902613",
        values: {
          age: 29,
          P01: "79.1",
          P1: "81.8",
          P3: "83.4",
          P5: "84.2",
          P10: "85.4",
          P15: "86.3",
          P25: "87.6",
          P50: "89.9",
          P75: "92.2",
          P85: "93.5",
          P90: "94.4",
          P95: "95.6",
          P97: "96.4",
          P99: 98,
          P999: "100.7",
        },
      },
      {
        name: 30,
        uid: "3905580519",
        values: {
          age: 30,
          P01: "79.8",
          P1: "82.5",
          P3: 84,
          P5: "84.9",
          P10: "86.2",
          P15: 87,
          P25: "88.3",
          P50: "90.7",
          P75: "93.1",
          P85: "94.3",
          P90: "95.2",
          P95: "96.5",
          P97: "97.3",
          P99: "98.9",
          P999: "101.6",
        },
      },
      {
        name: 31,
        uid: "4141214059",
        values: {
          age: 31,
          P01: "80.4",
          P1: "83.1",
          P3: "84.7",
          P5: "85.6",
          P10: "86.9",
          P15: "87.7",
          P25: 89,
          P50: "91.4",
          P75: "93.9",
          P85: "95.2",
          P90: 96,
          P95: "97.3",
          P97: "98.2",
          P99: "99.8",
          P999: "102.5",
        },
      },
      {
        name: 32,
        uid: "2921275721",
        values: {
          age: 32,
          P01: 81,
          P1: "83.8",
          P3: "85.4",
          P5: "86.2",
          P10: "87.5",
          P15: "88.4",
          P25: "89.7",
          P50: "92.2",
          P75: "94.6",
          P85: "95.9",
          P90: "96.8",
          P95: "98.2",
          P97: 99,
          P99: "100.6",
          P999: "103.4",
        },
      },
      {
        name: 33,
        uid: "3413164629",
        values: {
          age: 33,
          P01: "81.6",
          P1: "84.4",
          P3: 86,
          P5: "86.9",
          P10: "88.2",
          P15: "89.1",
          P25: "90.4",
          P50: "92.9",
          P75: "95.4",
          P85: "96.7",
          P90: "97.6",
          P95: 99,
          P97: "99.8",
          P99: "101.5",
          P999: "104.3",
        },
      },
      {
        name: 34,
        uid: "3660971566",
        values: {
          age: 34,
          P01: "82.2",
          P1: 85,
          P3: "86.7",
          P5: "87.5",
          P10: "88.9",
          P15: "89.8",
          P25: "91.1",
          P50: "93.6",
          P75: "96.2",
          P85: "97.5",
          P90: "98.4",
          P95: "99.8",
          P97: "100.6",
          P99: "102.3",
          P999: "105.1",
        },
      },
      {
        name: 35,
        uid: "47436646",
        values: {
          age: 35,
          P01: "82.7",
          P1: "85.6",
          P3: "87.3",
          P5: "88.2",
          P10: "89.5",
          P15: "90.5",
          P25: "91.8",
          P50: "94.4",
          P75: "96.9",
          P85: "98.3",
          P90: "99.2",
          P95: "100.5",
          P97: "101.4",
          P99: "103.1",
          P999: 106,
        },
      },
      {
        name: 36,
        uid: "3561310937",
        values: {
          age: 36,
          P01: "83.3",
          P1: "86.2",
          P3: "87.9",
          P5: "88.8",
          P10: "90.2",
          P15: "91.1",
          P25: "92.5",
          P50: "95.1",
          P75: "97.6",
          P85: 99,
          P90: "99.9",
          P95: "101.3",
          P97: "102.2",
          P99: "103.9",
          P999: "106.8",
        },
      },
      {
        name: 37,
        uid: "1340891525",
        values: {
          age: 37,
          P01: "83.8",
          P1: "86.8",
          P3: "88.5",
          P5: "89.4",
          P10: "90.8",
          P15: "91.7",
          P25: "93.1",
          P50: "95.7",
          P75: "98.3",
          P85: "99.7",
          P90: "100.7",
          P95: "102.1",
          P97: 103,
          P99: "104.7",
          P999: "107.6",
        },
      },
      {
        name: 38,
        uid: "3975654557",
        values: {
          age: 38,
          P01: "84.4",
          P1: "87.4",
          P3: "89.1",
          P5: 90,
          P10: "91.4",
          P15: "92.4",
          P25: "93.8",
          P50: "96.4",
          P75: 99,
          P85: "100.5",
          P90: "101.4",
          P95: "102.8",
          P97: "103.7",
          P99: "105.5",
          P999: "108.5",
        },
      },
      {
        name: 39,
        uid: "4249632025",
        values: {
          age: 39,
          P01: "84.9",
          P1: "87.9",
          P3: "89.7",
          P5: "90.6",
          P10: 92,
          P15: 93,
          P25: "94.4",
          P50: "97.1",
          P75: "99.7",
          P85: "101.2",
          P90: "102.1",
          P95: "103.6",
          P97: "104.5",
          P99: "106.3",
          P999: "109.3",
        },
      },
      {
        name: 40,
        uid: "3256697291",
        values: {
          age: 40,
          P01: "85.4",
          P1: "88.5",
          P3: "90.3",
          P5: "91.2",
          P10: "92.6",
          P15: "93.6",
          P25: "95.1",
          P50: "97.7",
          P75: "100.4",
          P85: "101.9",
          P90: "102.9",
          P95: "104.3",
          P97: "105.2",
          P99: 107,
          P999: "110.1",
        },
      },
      {
        name: 41,
        uid: "1994271769",
        values: {
          age: 41,
          P01: 86,
          P1: 89,
          P3: "90.8",
          P5: "91.8",
          P10: "93.2",
          P15: "94.2",
          P25: "95.7",
          P50: "98.4",
          P75: "101.1",
          P85: "102.6",
          P90: "103.6",
          P95: 105,
          P97: 106,
          P99: "107.8",
          P999: "110.8",
        },
      },
      {
        name: 42,
        uid: "3024703670",
        values: {
          age: 42,
          P01: "86.5",
          P1: "89.6",
          P3: "91.4",
          P5: "92.4",
          P10: "93.8",
          P15: "94.8",
          P25: "96.3",
          P50: 99,
          P75: "101.8",
          P85: "103.3",
          P90: "104.3",
          P95: "105.7",
          P97: "106.7",
          P99: "108.5",
          P999: "111.6",
        },
      },
      {
        name: 43,
        uid: "539761812",
        values: {
          age: 43,
          P01: 87,
          P1: "90.1",
          P3: 92,
          P5: "92.9",
          P10: "94.4",
          P15: "95.4",
          P25: "96.9",
          P50: "99.7",
          P75: "102.4",
          P85: "103.9",
          P90: "104.9",
          P95: "106.4",
          P97: "107.4",
          P99: "109.2",
          P999: "112.4",
        },
      },
      {
        name: 44,
        uid: "1131637531",
        values: {
          age: 44,
          P01: "87.5",
          P1: "90.7",
          P3: "92.5",
          P5: "93.5",
          P10: 95,
          P15: 96,
          P25: "97.5",
          P50: "100.3",
          P75: "103.1",
          P85: "104.6",
          P90: "105.6",
          P95: "107.1",
          P97: "108.1",
          P99: 110,
          P999: "113.1",
        },
      },
      {
        name: 45,
        uid: "770128760",
        values: {
          age: 45,
          P01: 88,
          P1: "91.2",
          P3: 93,
          P5: 94,
          P10: "95.6",
          P15: "96.6",
          P25: "98.1",
          P50: "100.9",
          P75: "103.7",
          P85: "105.3",
          P90: "106.3",
          P95: "107.8",
          P97: "108.8",
          P99: "110.7",
          P999: "113.9",
        },
      },
      {
        name: 46,
        uid: "867275806",
        values: {
          age: 46,
          P01: "88.5",
          P1: "91.7",
          P3: "93.6",
          P5: "94.6",
          P10: "96.1",
          P15: "97.2",
          P25: "98.7",
          P50: "101.5",
          P75: "104.4",
          P85: "105.9",
          P90: 107,
          P95: "108.5",
          P97: "109.5",
          P99: "111.4",
          P999: "114.6",
        },
      },
      {
        name: 47,
        uid: "413845457",
        values: {
          age: 47,
          P01: "88.9",
          P1: "92.2",
          P3: "94.1",
          P5: "95.1",
          P10: "96.7",
          P15: "97.7",
          P25: "99.3",
          P50: "102.1",
          P75: 105,
          P85: "106.6",
          P90: "107.6",
          P95: "109.2",
          P97: "110.2",
          P99: "112.1",
          P999: "115.3",
        },
      },
      {
        name: 48,
        uid: "2294614592",
        values: {
          age: 48,
          P01: "89.4",
          P1: "92.7",
          P3: "94.6",
          P5: "95.6",
          P10: "97.2",
          P15: "98.3",
          P25: "99.8",
          P50: "102.7",
          P75: "105.6",
          P85: "107.2",
          P90: "108.3",
          P95: "109.8",
          P97: "110.8",
          P99: "112.8",
          P999: 116,
        },
      },
      {
        name: 49,
        uid: "2068353644",
        values: {
          age: 49,
          P01: "89.9",
          P1: "93.2",
          P3: "95.1",
          P5: "96.2",
          P10: "97.8",
          P15: "98.8",
          P25: "100.4",
          P50: "103.3",
          P75: "106.3",
          P85: "107.8",
          P90: "108.9",
          P95: "110.5",
          P97: "111.5",
          P99: "113.4",
          P999: "116.7",
        },
      },
      {
        name: 50,
        uid: "1795226332",
        values: {
          age: 50,
          P01: "90.4",
          P1: "93.7",
          P3: "95.7",
          P5: "96.7",
          P10: "98.3",
          P15: "99.4",
          P25: "100.9",
          P50: "103.9",
          P75: "106.9",
          P85: "108.4",
          P90: "109.5",
          P95: "111.1",
          P97: "112.1",
          P99: "114.1",
          P999: "117.5",
        },
      },
      {
        name: 51,
        uid: "1971330515",
        values: {
          age: 51,
          P01: "90.8",
          P1: "94.2",
          P3: "96.2",
          P5: "97.2",
          P10: "98.8",
          P15: "99.9",
          P25: "101.5",
          P50: "104.5",
          P75: "107.5",
          P85: "109.1",
          P90: "110.1",
          P95: "111.8",
          P97: "112.8",
          P99: "114.8",
          P999: "118.1",
        },
      },
      {
        name: 52,
        uid: "1318538245",
        values: {
          age: 52,
          P01: "91.3",
          P1: "94.7",
          P3: "96.7",
          P5: "97.7",
          P10: "99.3",
          P15: "100.4",
          P25: 102,
          P50: 105,
          P75: "108.1",
          P85: "109.7",
          P90: "110.8",
          P95: "112.4",
          P97: "113.4",
          P99: "115.4",
          P999: "118.8",
        },
      },
      {
        name: 53,
        uid: "2514551350",
        values: {
          age: 53,
          P01: "91.7",
          P1: "95.2",
          P3: "97.2",
          P5: "98.2",
          P10: "99.9",
          P15: 101,
          P25: "102.6",
          P50: "105.6",
          P75: "108.6",
          P85: "110.3",
          P90: "111.4",
          P95: 113,
          P97: "114.1",
          P99: "116.1",
          P999: "119.5",
        },
      },
      {
        name: 54,
        uid: "3747670552",
        values: {
          age: 54,
          P01: "92.2",
          P1: "95.6",
          P3: "97.6",
          P5: "98.7",
          P10: "100.4",
          P15: "101.5",
          P25: "103.1",
          P50: "106.2",
          P75: "109.2",
          P85: "110.9",
          P90: 112,
          P95: "113.6",
          P97: "114.7",
          P99: "116.7",
          P999: "120.2",
        },
      },
      {
        name: 55,
        uid: "2605612880",
        values: {
          age: 55,
          P01: "92.6",
          P1: "96.1",
          P3: "98.1",
          P5: "99.2",
          P10: "100.9",
          P15: 102,
          P25: "103.6",
          P50: "106.7",
          P75: "109.8",
          P85: "111.5",
          P90: "112.6",
          P95: "114.3",
          P97: "115.3",
          P99: "117.4",
          P999: "120.9",
        },
      },
      {
        name: 56,
        uid: "163409046",
        values: {
          age: 56,
          P01: 93,
          P1: "96.6",
          P3: "98.6",
          P5: "99.7",
          P10: "101.4",
          P15: "102.5",
          P25: "104.2",
          P50: "107.3",
          P75: "110.4",
          P85: "112.1",
          P90: "113.2",
          P95: "114.9",
          P97: 116,
          P99: 118,
          P999: "121.5",
        },
      },
      {
        name: 57,
        uid: "1692115043",
        values: {
          age: 57,
          P01: "93.5",
          P1: 97,
          P3: "99.1",
          P5: "100.2",
          P10: "101.9",
          P15: 103,
          P25: "104.7",
          P50: "107.8",
          P75: 111,
          P85: "112.6",
          P90: "113.8",
          P95: "115.5",
          P97: "116.6",
          P99: "118.6",
          P999: "122.2",
        },
      },
      {
        name: 58,
        uid: "588246151",
        values: {
          age: 58,
          P01: "93.9",
          P1: "97.5",
          P3: "99.6",
          P5: "100.7",
          P10: "102.4",
          P15: "103.5",
          P25: "105.2",
          P50: "108.4",
          P75: "111.5",
          P85: "113.2",
          P90: "114.4",
          P95: "116.1",
          P97: "117.2",
          P99: "119.3",
          P999: "122.8",
        },
      },
      {
        name: 59,
        uid: "144235665",
        values: {
          age: 59,
          P01: "94.3",
          P1: "97.9",
          P3: 100,
          P5: "101.1",
          P10: "102.8",
          P15: 104,
          P25: "105.7",
          P50: "108.9",
          P75: "112.1",
          P85: "113.8",
          P90: "114.9",
          P95: "116.7",
          P97: "117.8",
          P99: "119.9",
          P999: "123.5",
        },
      },
      {
        name: 60,
        uid: "1501489022",
        values: {
          age: 60,
          P01: "94.7",
          P1: "98.4",
          P3: "100.5",
          P5: "101.6",
          P10: "103.3",
          P15: "104.5",
          P25: "106.2",
          P50: "109.4",
          P75: "112.6",
          P85: "114.4",
          P90: "115.5",
          P95: "117.2",
          P97: "118.4",
          P99: "120.5",
          P999: "124.1",
        },
      },
      {
        name: 61,
        uid: "430782244",
        values: {
          age: 61,
          P01: "96.076",
          P1: "99.583",
          P3: "101.629",
          P5: "102.712",
          P10: "104.381",
          P15: "105.506",
          P25: "107.168",
          P50: "110.265",
          P75: "113.362",
          P85: "115.023",
          P90: "116.149",
          P95: "117.817",
          P97: "118.9",
          P99: "120.946",
          P999: "124.453",
        },
      },
      {
        name: 62,
        uid: "1304649232",
        values: {
          age: 62,
          P01: "96.516",
          P1: "100.047",
          P3: "102.106",
          P5: "103.197",
          P10: "104.876",
          P15: "106.01",
          P25: "107.683",
          P50: "110.801",
          P75: "113.918",
          P85: "115.592",
          P90: "116.725",
          P95: "118.404",
          P97: "119.495",
          P99: "121.554",
          P999: "125.086",
        },
      },
      {
        name: 63,
        uid: "3948184828",
        values: {
          age: 63,
          P01: "96.953",
          P1: "100.508",
          P3: "102.581",
          P5: "103.679",
          P10: "105.37",
          P15: "106.51",
          P25: "108.195",
          P50: "111.334",
          P75: "114.473",
          P85: "116.157",
          P90: "117.298",
          P95: "118.989",
          P97: "120.087",
          P99: "122.16",
          P999: "125.715",
        },
      },
      {
        name: 64,
        uid: "2595030366",
        values: {
          age: 64,
          P01: "97.39",
          P1: "100.968",
          P3: "103.054",
          P5: "104.16",
          P10: "105.861",
          P15: "107.009",
          P25: "108.704",
          P50: "111.864",
          P75: "115.023",
          P85: "116.718",
          P90: "117.866",
          P95: "119.568",
          P97: "120.673",
          P99: "122.76",
          P999: "126.337",
        },
      },
      {
        name: 65,
        uid: "2817129998",
        values: {
          age: 65,
          P01: "97.82",
          P1: "101.421",
          P3: "103.522",
          P5: "104.634",
          P10: "106.347",
          P15: "107.503",
          P25: "109.209",
          P50: "112.39",
          P75: "115.57",
          P85: "117.276",
          P90: "118.432",
          P95: "120.145",
          P97: "121.257",
          P99: "123.358",
          P999: "126.959",
        },
      },
      {
        name: 66,
        uid: "1434310053",
        values: {
          age: 66,
          P01: "98.246",
          P1: "101.871",
          P3: "103.985",
          P5: "105.105",
          P10: "106.829",
          P15: "107.992",
          P25: "109.71",
          P50: "112.911",
          P75: "116.112",
          P85: "117.83",
          P90: "118.993",
          P95: "120.717",
          P97: "121.837",
          P99: "123.951",
          P999: "127.576",
        },
      },
      {
        name: 67,
        uid: "700646132",
        values: {
          age: 67,
          P01: "98.668",
          P1: "102.316",
          P3: "104.444",
          P5: "105.571",
          P10: "107.307",
          P15: "108.478",
          P25: "110.206",
          P50: "113.428",
          P75: "116.65",
          P85: "118.378",
          P90: "119.549",
          P95: "121.285",
          P97: "122.412",
          P99: "124.54",
          P999: "128.188",
        },
      },
      {
        name: 68,
        uid: "3040033768",
        values: {
          age: 68,
          P01: "99.089",
          P1: "102.76",
          P3: "104.902",
          P5: "106.036",
          P10: "107.782",
          P15: "108.96",
          P25: "110.699",
          P50: "113.941",
          P75: "117.183",
          P85: "118.922",
          P90: "120.1",
          P95: "121.846",
          P97: "122.98",
          P99: "125.122",
          P999: "128.793",
        },
      },
      {
        name: 69,
        uid: "3714514231",
        values: {
          age: 69,
          P01: "99.504",
          P1: "103.198",
          P3: "105.353",
          P5: "106.494",
          P10: "108.252",
          P15: "109.437",
          P25: "111.188",
          P50: "114.45",
          P75: "117.712",
          P85: "119.463",
          P90: "120.648",
          P95: "122.406",
          P97: "123.547",
          P99: "125.702",
          P999: "129.396",
        },
      },
      {
        name: 70,
        uid: "2632755756",
        values: {
          age: 70,
          P01: "99.914",
          P1: "103.632",
          P3: "105.801",
          P5: "106.949",
          P10: "108.717",
          P15: "109.91",
          P25: "111.672",
          P50: "114.955",
          P75: "118.238",
          P85: "119.999",
          P90: "121.192",
          P95: "122.961",
          P97: "124.109",
          P99: "126.277",
          P999: "129.995",
        },
      },
      {
        name: 71,
        uid: "3066781923",
        values: {
          age: 71,
          P01: "100.324",
          P1: "104.064",
          P3: "106.246",
          P5: "107.401",
          P10: "109.18",
          P15: "110.38",
          P25: "112.152",
          P50: "115.455",
          P75: "118.758",
          P85: "120.53",
          P90: "121.73",
          P95: "123.509",
          P97: "124.664",
          P99: "126.846",
          P999: "130.586",
        },
      },
      {
        name: 72,
        uid: "2078397296",
        values: {
          age: 72,
          P01: "100.726",
          P1: "104.49",
          P3: "106.685",
          P5: "107.847",
          P10: "109.637",
          P15: "110.845",
          P25: "112.628",
          P50: "115.951",
          P75: "119.274",
          P85: "121.057",
          P90: "122.265",
          P95: "124.055",
          P97: "125.217",
          P99: "127.412",
          P999: "131.176",
        },
      },
      {
        name: 73,
        uid: "1729440127",
        values: {
          age: 73,
          P01: "101.125",
          P1: "104.912",
          P3: "107.12",
          P5: "108.29",
          P10: "110.091",
          P15: "111.306",
          P25: "113.1",
          P50: "116.443",
          P75: "119.787",
          P85: "121.581",
          P90: "122.796",
          P95: "124.597",
          P97: "125.766",
          P99: "127.975",
          P999: "131.761",
        },
      },
      {
        name: 74,
        uid: "418257979",
        values: {
          age: 74,
          P01: "101.525",
          P1: "105.333",
          P3: "107.555",
          P5: "108.731",
          P10: "110.543",
          P15: "111.765",
          P25: "113.569",
          P50: "116.932",
          P75: "120.296",
          P85: "122.1",
          P90: "123.322",
          P95: "125.134",
          P97: "126.31",
          P99: "128.532",
          P999: "132.34",
        },
      },
      {
        name: 75,
        uid: "2741082608",
        values: {
          age: 75,
          P01: "101.918",
          P1: "105.75",
          P3: "107.985",
          P5: "109.169",
          P10: "110.991",
          P15: "112.221",
          P25: "114.036",
          P50: "117.42",
          P75: "120.803",
          P85: "122.619",
          P90: "123.848",
          P95: "125.67",
          P97: "126.854",
          P99: "129.089",
          P999: "132.921",
        },
      },
      {
        name: 76,
        uid: "3602540926",
        values: {
          age: 76,
          P01: "102.31",
          P1: "106.165",
          P3: "108.414",
          P5: "109.604",
          P10: "111.437",
          P15: "112.674",
          P25: "114.501",
          P50: "117.905",
          P75: "121.308",
          P85: "123.135",
          P90: "124.372",
          P95: "126.205",
          P97: "127.396",
          P99: "129.644",
          P999: "133.499",
        },
      },
      {
        name: 77,
        uid: "845527562",
        values: {
          age: 77,
          P01: "102.704",
          P1: "106.581",
          P3: "108.842",
          P5: "110.04",
          P10: "111.884",
          P15: "113.128",
          P25: "114.965",
          P50: "118.388",
          P75: "121.811",
          P85: "123.648",
          P90: "124.892",
          P95: "126.736",
          P97: "127.934",
          P99: "130.195",
          P999: "134.072",
        },
      },
      {
        name: 78,
        uid: "880310114",
        values: {
          age: 78,
          P01: "103.093",
          P1: "106.993",
          P3: "109.268",
          P5: "110.472",
          P10: "112.327",
          P15: "113.579",
          P25: "115.426",
          P50: "118.87",
          P75: "122.314",
          P85: "124.161",
          P90: "125.413",
          P95: "127.268",
          P97: "128.472",
          P99: "130.747",
          P999: "134.647",
        },
      },
      {
        name: 79,
        uid: "1584461390",
        values: {
          age: 79,
          P01: "103.48",
          P1: "107.403",
          P3: "109.692",
          P5: "110.903",
          P10: "112.769",
          P15: "114.028",
          P25: "115.887",
          P50: "119.351",
          P75: "122.815",
          P85: "124.674",
          P90: "125.932",
          P95: "127.798",
          P97: "129.01",
          P99: "131.298",
          P999: "135.221",
        },
      },
      {
        name: 80,
        uid: "149966327",
        values: {
          age: 80,
          P01: "103.867",
          P1: "107.813",
          P3: "110.114",
          P5: "111.333",
          P10: "113.21",
          P15: "114.476",
          P25: "116.346",
          P50: "119.83",
          P75: "123.315",
          P85: "125.184",
          P90: "126.451",
          P95: "128.327",
          P97: "129.546",
          P99: "131.848",
          P999: "135.794",
        },
      },
      {
        name: 81,
        uid: "2312031320",
        values: {
          age: 81,
          P01: "104.255",
          P1: "108.223",
          P3: "110.538",
          P5: "111.764",
          P10: "113.651",
          P15: "114.924",
          P25: "116.805",
          P50: "120.308",
          P75: "123.812",
          P85: "125.693",
          P90: "126.966",
          P95: "128.853",
          P97: "130.079",
          P99: "132.394",
          P999: "136.362",
        },
      },
      {
        name: 82,
        uid: "3476139249",
        values: {
          age: 82,
          P01: "104.638",
          P1: "108.63",
          P3: "110.958",
          P5: "112.191",
          P10: "114.089",
          P15: "115.37",
          P25: "117.261",
          P50: "120.785",
          P75: "124.31",
          P85: "126.201",
          P90: "127.482",
          P95: "129.38",
          P97: "130.613",
          P99: "132.941",
          P999: "136.932",
        },
      },
      {
        name: 83,
        uid: "624866038",
        values: {
          age: 83,
          P01: "105.02",
          P1: "109.034",
          P3: "111.376",
          P5: "112.616",
          P10: "114.525",
          P15: "115.814",
          P25: "117.716",
          P50: "121.26",
          P75: "124.805",
          P85: "126.707",
          P90: "127.995",
          P95: "129.905",
          P97: "131.145",
          P99: "133.486",
          P999: "137.501",
        },
      },
      {
        name: 84,
        uid: "601447789",
        values: {
          age: 84,
          P01: "105.4",
          P1: "109.437",
          P3: "111.793",
          P5: "113.04",
          P10: "114.96",
          P15: "116.256",
          P25: "118.169",
          P50: "121.734",
          P75: "125.299",
          P85: "127.212",
          P90: "128.508",
          P95: "130.428",
          P97: "131.675",
          P99: "134.03",
          P999: "138.068",
        },
      },
      {
        name: 85,
        uid: "1847062413",
        values: {
          age: 85,
          P01: "105.778",
          P1: "109.839",
          P3: "112.207",
          P5: "113.461",
          P10: "115.393",
          P15: "116.696",
          P25: "118.62",
          P50: "122.205",
          P75: "125.791",
          P85: "127.715",
          P90: "129.018",
          P95: "130.949",
          P97: "132.203",
          P99: "134.572",
          P999: "138.633",
        },
      },
      {
        name: 86,
        uid: "1221853667",
        values: {
          age: 86,
          P01: "106.154",
          P1: "110.238",
          P3: "112.62",
          P5: "113.881",
          P10: "115.824",
          P15: "117.134",
          P25: "119.069",
          P50: "122.675",
          P75: "126.281",
          P85: "128.216",
          P90: "129.526",
          P95: "131.469",
          P97: "132.73",
          P99: "135.112",
          P999: "139.196",
        },
      },
      {
        name: 87,
        uid: "4114931826",
        values: {
          age: 87,
          P01: "106.529",
          P1: "110.635",
          P3: "113.031",
          P5: "114.299",
          P10: "116.253",
          P15: "117.571",
          P25: "119.517",
          P50: "123.143",
          P75: "126.769",
          P85: "128.715",
          P90: "130.033",
          P95: "131.986",
          P97: "133.255",
          P99: "135.65",
          P999: "139.757",
        },
      },
      {
        name: 88,
        uid: "2324485048",
        values: {
          age: 88,
          P01: "106.901",
          P1: "111.031",
          P3: "113.44",
          P5: "114.716",
          P10: "116.68",
          P15: "118.006",
          P25: "119.962",
          P50: "123.609",
          P75: "127.256",
          P85: "129.213",
          P90: "130.538",
          P95: "132.502",
          P97: "133.778",
          P99: "136.187",
          P999: "140.317",
        },
      },
      {
        name: 89,
        uid: "1017747503",
        values: {
          age: 89,
          P01: "107.272",
          P1: "111.425",
          P3: "113.848",
          P5: "115.131",
          P10: "117.106",
          P15: "118.439",
          P25: "120.406",
          P50: "124.074",
          P75: "127.741",
          P85: "129.709",
          P90: "131.041",
          P95: "133.017",
          P97: "134.299",
          P99: "136.722",
          P999: "140.875",
        },
      },
      {
        name: 90,
        uid: "1505881967",
        values: {
          age: 90,
          P01: "107.641",
          P1: "111.818",
          P3: "114.254",
          P5: "115.543",
          P10: "117.53",
          P15: "118.87",
          P25: "120.849",
          P50: "124.536",
          P75: "128.224",
          P85: "130.202",
          P90: "131.543",
          P95: "133.529",
          P97: "134.819",
          P99: "137.255",
          P999: "141.431",
        },
      },
      {
        name: 91,
        uid: "3488173932",
        values: {
          age: 91,
          P01: "108.008",
          P1: "112.208",
          P3: "114.657",
          P5: "115.954",
          P10: "117.951",
          P15: "119.299",
          P25: "121.288",
          P50: "124.996",
          P75: "128.704",
          P85: "130.694",
          P90: "132.042",
          P95: "134.039",
          P97: "135.336",
          P99: "137.785",
          P999: "141.984",
        },
      },
      {
        name: 92,
        uid: "401697859",
        values: {
          age: 92,
          P01: "108.373",
          P1: "112.596",
          P3: "115.058",
          P5: "116.363",
          P10: "118.371",
          P15: "119.726",
          P25: "121.726",
          P50: "125.454",
          P75: "129.183",
          P85: "131.183",
          P90: "132.538",
          P95: "134.546",
          P97: "135.851",
          P99: "138.313",
          P999: "142.536",
        },
      },
      {
        name: 93,
        uid: "2397012861",
        values: {
          age: 93,
          P01: "108.736",
          P1: "112.981",
          P3: "115.458",
          P5: "116.769",
          P10: "118.788",
          P15: "120.15",
          P25: "122.162",
          P50: "125.91",
          P75: "129.659",
          P85: "131.671",
          P90: "133.033",
          P95: "135.052",
          P97: "136.363",
          P99: "138.84",
          P999: "143.085",
        },
      },
      {
        name: 94,
        uid: "590217990",
        values: {
          age: 94,
          P01: "109.096",
          P1: "113.365",
          P3: "115.854",
          P5: "117.173",
          P10: "119.203",
          P15: "120.573",
          P25: "122.595",
          P50: "126.364",
          P75: "130.133",
          P85: "132.155",
          P90: "133.525",
          P95: "135.555",
          P97: "136.874",
          P99: "139.363",
          P999: "143.632",
        },
      },
      {
        name: 95,
        uid: "1259371169",
        values: {
          age: 95,
          P01: "109.455",
          P1: "113.746",
          P3: "116.249",
          P5: "117.575",
          P10: "119.616",
          P15: "120.993",
          P25: "123.026",
          P50: "126.816",
          P75: "130.605",
          P85: "132.638",
          P90: "134.015",
          P95: "136.056",
          P97: "137.382",
          P99: "139.885",
          P999: "144.176",
        },
      },
      {
        name: 96,
        uid: "890803329",
        values: {
          age: 96,
          P01: "109.811",
          P1: "114.126",
          P3: "116.642",
          P5: "117.975",
          P10: "120.027",
          P15: "121.411",
          P25: "123.456",
          P50: "127.265",
          P75: "131.075",
          P85: "133.119",
          P90: "134.503",
          P95: "136.555",
          P97: "137.888",
          P99: "140.404",
          P999: "144.719",
        },
      },
      {
        name: 97,
        uid: "3747565444",
        values: {
          age: 97,
          P01: "110.166",
          P1: "114.504",
          P3: "117.034",
          P5: "118.373",
          P10: "120.436",
          P15: "121.828",
          P25: "123.883",
          P50: "127.713",
          P75: "131.543",
          P85: "133.598",
          P90: "134.99",
          P95: "137.053",
          P97: "138.392",
          P99: "140.922",
          P999: "145.26",
        },
      },
      {
        name: 98,
        uid: "779671503",
        values: {
          age: 98,
          P01: "110.519",
          P1: "114.88",
          P3: "117.423",
          P5: "118.77",
          P10: "120.844",
          P15: "122.243",
          P25: "124.309",
          P50: "128.159",
          P75: "132.009",
          P85: "134.075",
          P90: "135.474",
          P95: "137.548",
          P97: "138.895",
          P99: "141.438",
          P999: "145.799",
        },
      },
      {
        name: 99,
        uid: "2353325356",
        values: {
          age: 99,
          P01: "110.871",
          P1: "115.254",
          P3: "117.811",
          P5: "119.165",
          P10: "121.249",
          P15: "122.656",
          P25: "124.733",
          P50: "128.603",
          P75: "132.474",
          P85: "134.551",
          P90: "135.957",
          P95: "138.042",
          P97: "139.396",
          P99: "141.953",
          P999: "146.336",
        },
      },
      {
        name: 100,
        uid: "2983512797",
        values: {
          age: 100,
          P01: "111.221",
          P1: "115.627",
          P3: "118.197",
          P5: "119.558",
          P10: "121.654",
          P15: "123.068",
          P25: "125.156",
          P50: "129.047",
          P75: "132.937",
          P85: "135.025",
          P90: "136.439",
          P95: "138.535",
          P97: "139.896",
          P99: "142.466",
          P999: "146.872",
        },
      },
      {
        name: 101,
        uid: "3769753469",
        values: {
          age: 101,
          P01: "111.57",
          P1: "115.999",
          P3: "118.583",
          P5: "119.951",
          P10: "122.058",
          P15: "123.479",
          P25: "125.578",
          P50: "129.489",
          P75: "133.4",
          P85: "135.498",
          P90: "136.92",
          P95: "139.026",
          P97: "140.394",
          P99: "142.978",
          P999: "147.407",
        },
      },
      {
        name: 102,
        uid: "289944114",
        values: {
          age: 102,
          P01: "111.914",
          P1: "116.367",
          P3: "118.965",
          P5: "120.341",
          P10: "122.459",
          P15: "123.888",
          P25: "125.998",
          P50: "129.93",
          P75: "133.862",
          P85: "135.972",
          P90: "137.401",
          P95: "139.519",
          P97: "140.895",
          P99: "143.493",
          P999: "147.946",
        },
      },
      {
        name: 103,
        uid: "2174618243",
        values: {
          age: 103,
          P01: "112.261",
          P1: "116.738",
          P3: "119.349",
          P5: "120.731",
          P10: "122.86",
          P15: "124.297",
          P25: "126.418",
          P50: "130.37",
          P75: "134.323",
          P85: "136.444",
          P90: "137.881",
          P95: "140.01",
          P97: "141.392",
          P99: "144.003",
          P999: "148.48",
        },
      },
      {
        name: 104,
        uid: "3159005784",
        values: {
          age: 104,
          P01: "112.608",
          P1: "117.107",
          P3: "119.732",
          P5: "121.121",
          P10: "123.261",
          P15: "124.705",
          P25: "126.837",
          P50: "130.81",
          P75: "134.783",
          P85: "136.915",
          P90: "138.359",
          P95: "140.499",
          P97: "141.889",
          P99: "144.513",
          P999: "149.013",
        },
      },
      {
        name: 105,
        uid: "1635282944",
        values: {
          age: 105,
          P01: "112.953",
          P1: "117.476",
          P3: "120.114",
          P5: "121.511",
          P10: "123.662",
          P15: "125.113",
          P25: "127.256",
          P50: "131.25",
          P75: "135.243",
          P85: "137.386",
          P90: "138.837",
          P95: "140.988",
          P97: "142.385",
          P99: "145.023",
          P999: "149.546",
        },
      },
      {
        name: 106,
        uid: "2635518549",
        values: {
          age: 106,
          P01: "113.298",
          P1: "117.844",
          P3: "120.496",
          P5: "121.9",
          P10: "124.062",
          P15: "125.521",
          P25: "127.675",
          P50: "131.688",
          P75: "135.702",
          P85: "137.856",
          P90: "139.315",
          P95: "141.477",
          P97: "142.881",
          P99: "145.532",
          P999: "150.078",
        },
      },
      {
        name: 107,
        uid: "1879569795",
        values: {
          age: 107,
          P01: "113.643",
          P1: "118.212",
          P3: "120.877",
          P5: "122.288",
          P10: "124.461",
          P15: "125.928",
          P25: "128.093",
          P50: "132.127",
          P75: "136.161",
          P85: "138.326",
          P90: "139.792",
          P95: "141.965",
          P97: "143.377",
          P99: "146.042",
          P999: "150.611",
        },
      },
      {
        name: 108,
        uid: "1683816934",
        values: {
          age: 108,
          P01: "113.987",
          P1: "118.58",
          P3: "121.258",
          P5: "122.677",
          P10: "124.861",
          P15: "126.334",
          P25: "128.51",
          P50: "132.565",
          P75: "136.62",
          P85: "138.796",
          P90: "140.27",
          P95: "142.454",
          P97: "143.872",
          P99: "146.551",
          P999: "151.143",
        },
      },
      {
        name: 109,
        uid: "4176610999",
        values: {
          age: 109,
          P01: "114.331",
          P1: "118.947",
          P3: "121.639",
          P5: "123.064",
          P10: "125.26",
          P15: "126.741",
          P25: "128.928",
          P50: "133.003",
          P75: "137.079",
          P85: "139.266",
          P90: "140.747",
          P95: "142.942",
          P97: "144.367",
          P99: "147.06",
          P999: "151.675",
        },
      },
      {
        name: 110,
        uid: "3844025369",
        values: {
          age: 110,
          P01: "114.674",
          P1: "119.313",
          P3: "122.019",
          P5: "123.451",
          P10: "125.658",
          P15: "127.146",
          P25: "129.344",
          P50: "133.44",
          P75: "137.536",
          P85: "139.735",
          P90: "141.223",
          P95: "143.429",
          P97: "144.862",
          P99: "147.568",
          P999: "152.207",
        },
      },
      {
        name: 111,
        uid: "3683987628",
        values: {
          age: 111,
          P01: "115.016",
          P1: "119.678",
          P3: "122.398",
          P5: "123.838",
          P10: "126.055",
          P15: "127.551",
          P25: "129.76",
          P50: "133.877",
          P75: "137.994",
          P85: "140.203",
          P90: "141.699",
          P95: "143.916",
          P97: "145.356",
          P99: "148.076",
          P999: "152.738",
        },
      },
      {
        name: 112,
        uid: "137361947",
        values: {
          age: 112,
          P01: "115.361",
          P1: "120.046",
          P3: "122.779",
          P5: "124.226",
          P10: "126.454",
          P15: "127.957",
          P25: "130.177",
          P50: "134.313",
          P75: "138.449",
          P85: "140.669",
          P90: "142.172",
          P95: "144.4",
          P97: "145.847",
          P99: "148.58",
          P999: "153.265",
        },
      },
      {
        name: 113,
        uid: "451296020",
        values: {
          age: 113,
          P01: "115.702",
          P1: "120.41",
          P3: "123.156",
          P5: "124.61",
          P10: "126.85",
          P15: "128.36",
          P25: "130.591",
          P50: "134.748",
          P75: "138.905",
          P85: "141.136",
          P90: "142.647",
          P95: "144.886",
          P97: "146.34",
          P99: "149.086",
          P999: "153.795",
        },
      },
      {
        name: 114,
        uid: "2373802134",
        values: {
          age: 114,
          P01: "116.042",
          P1: "120.773",
          P3: "123.533",
          P5: "124.995",
          P10: "127.245",
          P15: "128.763",
          P25: "131.005",
          P50: "135.183",
          P75: "139.361",
          P85: "141.603",
          P90: "143.121",
          P95: "145.371",
          P97: "146.833",
          P99: "149.592",
          P999: "154.324",
        },
      },
      {
        name: 115,
        uid: "667841728",
        values: {
          age: 115,
          P01: "116.385",
          P1: "121.139",
          P3: "123.912",
          P5: "125.38",
          P10: "127.641",
          P15: "129.167",
          P25: "131.419",
          P50: "135.617",
          P75: "139.814",
          P85: "142.067",
          P90: "143.592",
          P95: "145.853",
          P97: "147.322",
          P99: "150.095",
          P999: "154.849",
        },
      },
      {
        name: 116,
        uid: "1272808188",
        values: {
          age: 116,
          P01: "116.723",
          P1: "121.501",
          P3: "124.287",
          P5: "125.763",
          P10: "128.035",
          P15: "129.568",
          P25: "131.832",
          P50: "136.05",
          P75: "140.269",
          P85: "142.532",
          P90: "144.065",
          P95: "146.337",
          P97: "147.813",
          P99: "150.6",
          P999: "155.377",
        },
      },
      {
        name: 117,
        uid: "2924658003",
        values: {
          age: 117,
          P01: "117.065",
          P1: "121.865",
          P3: "124.665",
          P5: "126.147",
          P10: "128.43",
          P15: "129.97",
          P25: "132.245",
          P50: "136.483",
          P75: "140.721",
          P85: "142.996",
          P90: "144.536",
          P95: "146.819",
          P97: "148.301",
          P99: "151.101",
          P999: "155.901",
        },
      },
      {
        name: 118,
        uid: "292285188",
        values: {
          age: 118,
          P01: "117.402",
          P1: "122.225",
          P3: "125.039",
          P5: "126.529",
          P10: "128.823",
          P15: "130.371",
          P25: "132.656",
          P50: "136.915",
          P75: "141.174",
          P85: "143.46",
          P90: "145.008",
          P95: "147.302",
          P97: "148.792",
          P99: "151.605",
          P999: "156.429",
        },
      },
      {
        name: 119,
        uid: "1775430122",
        values: {
          age: 119,
          P01: "117.743",
          P1: "122.589",
          P3: "125.416",
          P5: "126.912",
          P10: "129.217",
          P15: "130.772",
          P25: "133.068",
          P50: "137.347",
          P75: "141.626",
          P85: "143.923",
          P90: "145.478",
          P95: "147.782",
          P97: "149.279",
          P99: "152.106",
          P999: "156.952",
        },
      },
      {
        name: 120,
        uid: "2517110824",
        values: {
          age: 120,
          P01: "118.083",
          P1: "122.952",
          P3: "125.792",
          P5: "127.296",
          P10: "129.611",
          P15: "131.174",
          P25: "133.481",
          P50: "137.78",
          P75: "142.078",
          P85: "144.385",
          P90: "145.948",
          P95: "148.263",
          P97: "149.767",
          P99: "152.607",
          P999: "157.476",
        },
      },
      {
        name: 121,
        uid: "3473313914",
        values: {
          age: 121,
          P01: "118.424",
          P1: "123.315",
          P3: "126.169",
          P5: "127.679",
          P10: "130.006",
          P15: "131.575",
          P25: "133.893",
          P50: "138.212",
          P75: "142.531",
          P85: "144.849",
          P90: "146.418",
          P95: "148.744",
          P97: "150.255",
          P99: "153.108",
          P999: 158,
        },
      },
      {
        name: 122,
        uid: "1917767853",
        values: {
          age: 122,
          P01: "118.765",
          P1: "123.679",
          P3: "126.546",
          P5: "128.064",
          P10: "130.401",
          P15: "131.978",
          P25: "134.306",
          P50: "138.645",
          P75: "142.984",
          P85: "145.313",
          P90: "146.89",
          P95: "149.227",
          P97: "150.745",
          P99: "153.611",
          P999: "158.525",
        },
      },
      {
        name: 123,
        uid: "4188619211",
        values: {
          age: 123,
          P01: "119.107",
          P1: "124.044",
          P3: "126.924",
          P5: "128.449",
          P10: "130.797",
          P15: "132.381",
          P25: "134.72",
          P50: "139.08",
          P75: "143.439",
          P85: "145.778",
          P90: "147.362",
          P95: "149.71",
          P97: "151.235",
          P99: "154.115",
          P999: "159.052",
        },
      },
      {
        name: 124,
        uid: "3109720063",
        values: {
          age: 124,
          P01: "119.451",
          P1: "124.411",
          P3: "127.304",
          P5: "128.836",
          P10: "131.195",
          P15: "132.786",
          P25: "135.136",
          P50: "139.516",
          P75: "143.895",
          P85: "146.245",
          P90: "147.837",
          P95: "150.196",
          P97: "151.728",
          P99: "154.621",
          P999: "159.581",
        },
      },
      {
        name: 125,
        uid: "2302253123",
        values: {
          age: 125,
          P01: "119.796",
          P1: "124.779",
          P3: "127.685",
          P5: "129.224",
          P10: "131.594",
          P15: "133.193",
          P25: "135.554",
          P50: "139.954",
          P75: "144.354",
          P85: "146.715",
          P90: "148.314",
          P95: "150.684",
          P97: "152.223",
          P99: "155.129",
          P999: "160.112",
        },
      },
      {
        name: 126,
        uid: "2964250079",
        values: {
          age: 126,
          P01: "120.147",
          P1: "125.152",
          P3: "128.071",
          P5: "129.617",
          P10: "131.998",
          P15: "133.604",
          P25: "135.975",
          P50: "140.395",
          P75: "144.814",
          P85: "147.186",
          P90: "148.792",
          P95: "151.172",
          P97: "152.718",
          P99: "155.638",
          P999: "160.643",
        },
      },
      {
        name: 127,
        uid: "338678783",
        values: {
          age: 127,
          P01: "120.496",
          P1: "125.525",
          P3: "128.458",
          P5: "130.011",
          P10: "132.403",
          P15: "134.016",
          P25: "136.399",
          P50: "140.839",
          P75: "145.279",
          P85: "147.661",
          P90: "149.275",
          P95: "151.666",
          P97: "153.22",
          P99: "156.153",
          P999: "161.181",
        },
      },
      {
        name: 128,
        uid: "1263138964",
        values: {
          age: 128,
          P01: "120.853",
          P1: "125.904",
          P3: "128.85",
          P5: "130.41",
          P10: "132.812",
          P15: "134.433",
          P25: "136.826",
          P50: "141.286",
          P75: "145.746",
          P85: "148.139",
          P90: "149.76",
          P95: "152.162",
          P97: "153.722",
          P99: "156.668",
          P999: "161.719",
        },
      },
      {
        name: 129,
        uid: "1817793496",
        values: {
          age: 129,
          P01: "121.212",
          P1: "126.286",
          P3: "129.245",
          P5: "130.812",
          P10: "133.225",
          P15: "134.853",
          P25: "137.257",
          P50: "141.737",
          P75: "146.217",
          P85: "148.621",
          P90: "150.249",
          P95: "152.662",
          P97: "154.229",
          P99: "157.188",
          P999: "162.261",
        },
      },
      {
        name: 130,
        uid: "3021169938",
        values: {
          age: 130,
          P01: "121.575",
          P1: "126.671",
          P3: "129.644",
          P5: "131.218",
          P10: "133.642",
          P15: "135.277",
          P25: "137.692",
          P50: "142.192",
          P75: "146.692",
          P85: "149.106",
          P90: "150.742",
          P95: "153.165",
          P97: "154.74",
          P99: "157.712",
          P999: "162.808",
        },
      },
      {
        name: 131,
        uid: "933563622",
        values: {
          age: 131,
          P01: "121.94",
          P1: "127.06",
          P3: "130.046",
          P5: "131.627",
          P10: "134.062",
          P15: "135.704",
          P25: "138.13",
          P50: "142.65",
          P75: "147.17",
          P85: "149.596",
          P90: "151.239",
          P95: "153.673",
          P97: "155.255",
          P99: "158.241",
          P999: "163.36",
        },
      },
      {
        name: 132,
        uid: "230550625",
        values: {
          age: 132,
          P01: "122.314",
          P1: "127.455",
          P3: "130.454",
          P5: "132.042",
          P10: "134.487",
          P15: "136.137",
          P25: "138.573",
          P50: "143.113",
          P75: "147.652",
          P85: "150.088",
          P90: "151.738",
          P95: "154.183",
          P97: "155.771",
          P99: "158.77",
          P999: "163.912",
        },
      },
      {
        name: 133,
        uid: "2510808441",
        values: {
          age: 133,
          P01: "122.686",
          P1: "127.851",
          P3: "130.863",
          P5: "132.458",
          P10: "134.915",
          P15: "136.572",
          P25: "139.019",
          P50: "143.58",
          P75: "148.14",
          P85: "150.587",
          P90: "152.244",
          P95: "154.701",
          P97: "156.296",
          P99: "159.308",
          P999: "164.473",
        },
      },
      {
        name: 134,
        uid: "2619878640",
        values: {
          age: 134,
          P01: "123.067",
          P1: "128.254",
          P3: "131.279",
          P5: "132.882",
          P10: "135.349",
          P15: "137.013",
          P25: "139.471",
          P50: "144.051",
          P75: "148.631",
          P85: "151.089",
          P90: "152.754",
          P95: "155.221",
          P97: "156.823",
          P99: "159.848",
          P999: "165.036",
        },
      },
      {
        name: 135,
        uid: "2556350469",
        values: {
          age: 135,
          P01: "123.451",
          P1: "128.661",
          P3: "131.7",
          P5: "133.309",
          P10: "135.787",
          P15: "137.459",
          P25: "139.927",
          P50: "144.528",
          P75: "149.128",
          P85: "151.596",
          P90: "153.268",
          P95: "155.746",
          P97: "157.355",
          P99: "160.394",
          P999: "165.604",
        },
      },
      {
        name: 136,
        uid: "3460670524",
        values: {
          age: 136,
          P01: "123.845",
          P1: "129.077",
          P3: "132.128",
          P5: "133.744",
          P10: "136.232",
          P15: "137.911",
          P25: "140.39",
          P50: "145.009",
          P75: "149.629",
          P85: "152.108",
          P90: "153.786",
          P95: "156.275",
          P97: "157.89",
          P99: "160.942",
          P999: "166.174",
        },
      },
      {
        name: 137,
        uid: "3314160856",
        values: {
          age: 137,
          P01: "124.238",
          P1: "129.493",
          P3: "132.558",
          P5: "134.181",
          P10: "136.681",
          P15: "138.367",
          P25: "140.857",
          P50: "145.496",
          P75: "150.136",
          P85: "152.626",
          P90: "154.312",
          P95: "156.811",
          P97: "158.435",
          P99: "161.5",
          P999: "166.754",
        },
      },
      {
        name: 138,
        uid: "504113973",
        values: {
          age: 138,
          P01: "124.641",
          P1: "129.918",
          P3: "132.996",
          P5: "134.626",
          P10: "137.136",
          P15: "138.829",
          P25: "141.33",
          P50: "145.989",
          P75: "150.649",
          P85: "153.149",
          P90: "154.842",
          P95: "157.352",
          P97: "158.982",
          P99: "162.06",
          P999: "167.337",
        },
      },
      {
        name: 139,
        uid: "1400014522",
        values: {
          age: 139,
          P01: "125.049",
          P1: "130.348",
          P3: "133.439",
          P5: "135.076",
          P10: "137.597",
          P15: "139.297",
          P25: "141.808",
          P50: "146.488",
          P75: "151.167",
          P85: "153.678",
          P90: "155.379",
          P95: "157.899",
          P97: "159.536",
          P99: "162.627",
          P999: "167.927",
        },
      },
      {
        name: 140,
        uid: "1168911856",
        values: {
          age: 140,
          P01: "125.462",
          P1: "130.784",
          P3: "133.888",
          P5: "135.532",
          P10: "138.064",
          P15: "139.771",
          P25: "142.293",
          P50: "146.993",
          P75: "151.692",
          P85: "154.214",
          P90: "155.922",
          P95: "158.453",
          P97: "160.097",
          P99: "163.201",
          P999: "168.524",
        },
      },
      {
        name: 141,
        uid: "3128175767",
        values: {
          age: 141,
          P01: "125.88",
          P1: "131.225",
          P3: "134.343",
          P5: "135.994",
          P10: "138.536",
          P15: "140.252",
          P25: "142.784",
          P50: "147.504",
          P75: "152.224",
          P85: "154.757",
          P90: "156.472",
          P95: "159.014",
          P97: "160.665",
          P99: "163.783",
          P999: "169.128",
        },
      },
      {
        name: 142,
        uid: "3558648845",
        values: {
          age: 142,
          P01: "126.309",
          P1: "131.676",
          P3: "134.807",
          P5: "136.465",
          P10: "139.017",
          P15: "140.74",
          P25: "143.283",
          P50: "148.022",
          P75: "152.762",
          P85: "155.305",
          P90: "157.027",
          P95: "159.58",
          P97: "161.238",
          P99: "164.369",
          P999: "169.736",
        },
      },
      {
        name: 143,
        uid: "2307687108",
        values: {
          age: 143,
          P01: "126.743",
          P1: "132.133",
          P3: "135.277",
          P5: "136.942",
          P10: "139.505",
          P15: "141.235",
          P25: "143.789",
          P50: "148.548",
          P75: "153.307",
          P85: "155.861",
          P90: "157.59",
          P95: "160.154",
          P97: "161.819",
          P99: "164.963",
          P999: "170.353",
        },
      },
      {
        name: 144,
        uid: "1262322983",
        values: {
          age: 144,
          P01: "127.184",
          P1: "132.597",
          P3: "135.754",
          P5: "137.426",
          P10: 140,
          P15: "141.737",
          P25: "144.301",
          P50: "149.081",
          P75: "153.86",
          P85: "156.425",
          P90: "158.162",
          P95: "160.736",
          P97: "162.408",
          P99: "165.565",
          P999: "170.977",
        },
      },
      {
        name: 145,
        uid: "279612429",
        values: {
          age: 145,
          P01: "127.636",
          P1: "133.07",
          P3: "136.24",
          P5: "137.919",
          P10: "140.504",
          P15: "142.248",
          P25: "144.823",
          P50: "149.621",
          P75: "154.42",
          P85: "156.995",
          P90: "158.739",
          P95: "161.323",
          P97: "163.002",
          P99: "166.172",
          P999: "171.607",
        },
      },
      {
        name: 146,
        uid: "3142117998",
        values: {
          age: 146,
          P01: "128.09",
          P1: "133.548",
          P3: "136.731",
          P5: "138.417",
          P10: "141.013",
          P15: "142.764",
          P25: "145.35",
          P50: "150.169",
          P75: "154.989",
          P85: "157.575",
          P90: "159.326",
          P95: "161.922",
          P97: "163.608",
          P99: "166.791",
          P999: "172.249",
        },
      },
      {
        name: 147,
        uid: "3231907183",
        values: {
          age: 147,
          P01: "128.559",
          P1: "134.039",
          P3: "137.235",
          P5: "138.927",
          P10: "141.533",
          P15: "143.291",
          P25: "145.887",
          P50: "150.726",
          P75: "155.564",
          P85: "158.16",
          P90: "159.918",
          P95: "162.524",
          P97: "164.217",
          P99: "167.413",
          P999: "172.892",
        },
      },
      {
        name: 148,
        uid: "197365089",
        values: {
          age: 148,
          P01: "129.031",
          P1: "134.533",
          P3: "137.743",
          P5: "139.442",
          P10: "142.059",
          P15: "143.825",
          P25: "146.432",
          P50: "151.29",
          P75: "156.148",
          P85: "158.755",
          P90: "160.521",
          P95: "163.138",
          P97: "164.837",
          P99: "168.046",
          P999: "173.549",
        },
      },
      {
        name: 149,
        uid: "2572357721",
        values: {
          age: 149,
          P01: "129.515",
          P1: "135.039",
          P3: "138.261",
          P5: "139.967",
          P10: "142.595",
          P15: "144.367",
          P25: "146.985",
          P50: "151.862",
          P75: "156.74",
          P85: "159.357",
          P90: "161.13",
          P95: "163.757",
          P97: "165.464",
          P99: "168.686",
          P999: "174.21",
        },
      },
      {
        name: 150,
        uid: "3333712994",
        values: {
          age: 150,
          P01: "130.005",
          P1: "135.551",
          P3: "138.786",
          P5: "140.499",
          P10: "143.137",
          P15: "144.917",
          P25: "147.545",
          P50: "152.442",
          P75: "157.34",
          P85: "159.968",
          P90: "161.748",
          P95: "164.386",
          P97: "166.099",
          P99: "169.334",
          P999: "174.88",
        },
      },
      {
        name: 151,
        uid: "2104858378",
        values: {
          age: 151,
          P01: "130.506",
          P1: "136.073",
          P3: "139.321",
          P5: "141.041",
          P10: "143.689",
          P15: "145.475",
          P25: "148.114",
          P50: "153.03",
          P75: "157.946",
          P85: "160.584",
          P90: "162.371",
          P95: "165.019",
          P97: "166.739",
          P99: "169.986",
          P999: "175.554",
        },
      },
      {
        name: 152,
        uid: "514590605",
        values: {
          age: 152,
          P01: "131.007",
          P1: "136.598",
          P3: "139.859",
          P5: "141.585",
          P10: "144.244",
          P15: "146.038",
          P25: "148.687",
          P50: "153.623",
          P75: "158.56",
          P85: "161.209",
          P90: "163.003",
          P95: "165.661",
          P97: "167.388",
          P99: "170.649",
          P999: "176.24",
        },
      },
      {
        name: 153,
        uid: "2398471900",
        values: {
          age: 153,
          P01: "131.523",
          P1: "137.134",
          P3: "140.407",
          P5: "142.14",
          P10: "144.809",
          P15: "146.609",
          P25: "149.268",
          P50: "154.222",
          P75: "159.177",
          P85: "161.836",
          P90: "163.636",
          P95: "166.305",
          P97: "168.038",
          P99: "171.311",
          P999: "176.922",
        },
      },
      {
        name: 154,
        uid: "4041165890",
        values: {
          age: 154,
          P01: "132.037",
          P1: "137.67",
          P3: "140.956",
          P5: "142.696",
          P10: "145.375",
          P15: "147.183",
          P25: "149.852",
          P50: "154.826",
          P75: "159.8",
          P85: "162.469",
          P90: "164.276",
          P95: "166.956",
          P97: "168.695",
          P99: "171.981",
          P999: "177.614",
        },
      },
      {
        name: 155,
        uid: "791916420",
        values: {
          age: 155,
          P01: "132.56",
          P1: "138.214",
          P3: "141.512",
          P5: "143.258",
          P10: "145.947",
          P15: "147.762",
          P25: "150.441",
          P50: "155.433",
          P75: "160.425",
          P85: "163.104",
          P90: "164.919",
          P95: "167.608",
          P97: "169.354",
          P99: "172.652",
          P999: "178.306",
        },
      },
      {
        name: 156,
        uid: "326613932",
        values: {
          age: 156,
          P01: "133.09",
          P1: "138.763",
          P3: "142.073",
          P5: "143.825",
          P10: "146.524",
          P15: "148.344",
          P25: "151.033",
          P50: "156.043",
          P75: "161.052",
          P85: "163.741",
          P90: "165.561",
          P95: "168.26",
          P97: "170.012",
          P99: "173.322",
          P999: "178.996",
        },
      },
      {
        name: 157,
        uid: "3943529072",
        values: {
          age: 157,
          P01: "133.621",
          P1: "139.314",
          P3: "142.635",
          P5: "144.394",
          P10: "147.102",
          P15: "148.929",
          P25: "151.627",
          P50: "156.654",
          P75: "161.681",
          P85: "164.379",
          P90: "166.206",
          P95: "168.914",
          P97: "170.673",
          P99: "173.994",
          P999: "179.687",
        },
      },
      {
        name: 158,
        uid: "3092908032",
        values: {
          age: 158,
          P01: "134.152",
          P1: "139.866",
          P3: "143.198",
          P5: "144.963",
          P10: "147.681",
          P15: "149.514",
          P25: "152.221",
          P50: "157.266",
          P75: "162.311",
          P85: "165.018",
          P90: "166.851",
          P95: "169.569",
          P97: "171.334",
          P99: "174.666",
          P999: "180.38",
        },
      },
      {
        name: 159,
        uid: "2750463162",
        values: {
          age: 159,
          P01: "134.684",
          P1: "140.417",
          P3: "143.761",
          P5: "145.532",
          P10: "148.259",
          P15: "150.099",
          P25: "152.815",
          P50: "157.878",
          P75: "162.94",
          P85: "165.656",
          P90: "167.496",
          P95: "170.223",
          P97: "171.994",
          P99: "175.338",
          P999: "181.071",
        },
      },
      {
        name: 160,
        uid: "4045070226",
        values: {
          age: 160,
          P01: "135.219",
          P1: "140.97",
          P3: "144.325",
          P5: "146.102",
          P10: "148.837",
          P15: "150.683",
          P25: "153.408",
          P50: "158.487",
          P75: "163.566",
          P85: "166.291",
          P90: "168.137",
          P95: "170.872",
          P97: "172.649",
          P99: "176.004",
          P999: "181.756",
        },
      },
      {
        name: 161,
        uid: "81391415",
        values: {
          age: 161,
          P01: "135.756",
          P1: "141.525",
          P3: "144.89",
          P5: "146.671",
          P10: "149.415",
          P15: "151.266",
          P25: 154,
          P50: "159.094",
          P75: "164.188",
          P85: "166.921",
          P90: "168.772",
          P95: "171.516",
          P97: "173.298",
          P99: "176.663",
          P999: "182.432",
        },
      },
      {
        name: 162,
        uid: "1329091151",
        values: {
          age: 162,
          P01: "136.285",
          P1: "142.072",
          P3: "145.447",
          P5: "147.235",
          P10: "149.987",
          P15: "151.844",
          P25: "154.586",
          P50: "159.696",
          P75: "164.806",
          P85: "167.548",
          P90: "169.405",
          P95: "172.158",
          P97: "173.945",
          P99: "177.321",
          P999: "183.108",
        },
      },
      {
        name: 163,
        uid: "3164086796",
        values: {
          age: 163,
          P01: "136.815",
          P1: "142.618",
          P3: "146.004",
          P5: "147.796",
          P10: "150.557",
          P15: "152.419",
          P25: "155.169",
          P50: "160.294",
          P75: "165.419",
          P85: "168.169",
          P90: "170.031",
          P95: "172.791",
          P97: "174.584",
          P99: "177.969",
          P999: "183.773",
        },
      },
      {
        name: 164,
        uid: "1140954684",
        values: {
          age: 164,
          P01: "137.345",
          P1: "143.164",
          P3: "146.558",
          P5: "148.356",
          P10: "151.123",
          P15: "152.991",
          P25: "155.748",
          P50: "160.886",
          P75: "166.024",
          P85: "168.782",
          P90: "170.649",
          P95: "173.417",
          P97: "175.214",
          P99: "178.608",
          P999: "184.427",
        },
      },
      {
        name: 165,
        uid: "2986250480",
        values: {
          age: 165,
          P01: "137.87",
          P1: "143.704",
          P3: "147.107",
          P5: "148.909",
          P10: "151.684",
          P15: "153.556",
          P25: "156.32",
          P50: "161.472",
          P75: "166.624",
          P85: "169.388",
          P90: "171.26",
          P95: "174.035",
          P97: "175.837",
          P99: "179.24",
          P999: "185.074",
        },
      },
      {
        name: 166,
        uid: "2306330411",
        values: {
          age: 166,
          P01: "138.389",
          P1: "144.238",
          P3: "147.649",
          P5: "149.456",
          P10: "152.238",
          P15: "154.115",
          P25: "156.886",
          P50: "162.05",
          P75: "167.215",
          P85: "169.986",
          P90: "171.863",
          P95: "174.645",
          P97: "176.452",
          P99: "179.863",
          P999: "185.712",
        },
      },
      {
        name: 167,
        uid: "3261233776",
        values: {
          age: 167,
          P01: "138.901",
          P1: "144.764",
          P3: "148.184",
          P5: "149.995",
          P10: "152.784",
          P15: "154.665",
          P25: "157.444",
          P50: "162.621",
          P75: "167.798",
          P85: "170.576",
          P90: "172.458",
          P95: "175.246",
          P97: "177.057",
          P99: "180.477",
          P999: "186.34",
        },
      },
      {
        name: 168,
        uid: "2172835202",
        values: {
          age: 168,
          P01: "139.41",
          P1: "145.286",
          P3: "148.714",
          P5: "150.529",
          P10: "153.323",
          P15: "155.209",
          P25: "157.993",
          P50: "163.182",
          P75: "168.37",
          P85: "171.154",
          P90: "173.04",
          P95: "175.834",
          P97: "177.649",
          P99: "181.077",
          P999: "186.953",
        },
      },
      {
        name: 169,
        uid: "2205288039",
        values: {
          age: 169,
          P01: "139.916",
          P1: "145.803",
          P3: "149.237",
          P5: "151.055",
          P10: "153.855",
          P15: "155.744",
          P25: "158.534",
          P50: "163.732",
          P75: "168.93",
          P85: "171.72",
          P90: "173.609",
          P95: "176.409",
          P97: "178.227",
          P99: "181.661",
          P999: "187.548",
        },
      },
      {
        name: 170,
        uid: "2284826073",
        values: {
          age: 170,
          P01: "140.408",
          P1: "146.307",
          P3: "149.747",
          P5: "151.569",
          P10: "154.375",
          P15: "156.268",
          P25: "159.063",
          P50: "164.272",
          P75: "169.48",
          P85: "172.275",
          P90: "174.168",
          P95: "176.974",
          P97: "178.796",
          P99: "182.237",
          P999: "188.136",
        },
      },
      {
        name: 171,
        uid: "2641770925",
        values: {
          age: 171,
          P01: "140.894",
          P1: "146.804",
          P3: "150.25",
          P5: "152.075",
          P10: "154.886",
          P15: "156.782",
          P25: "159.582",
          P50: "164.799",
          P75: "170.017",
          P85: "172.817",
          P90: "174.713",
          P95: "177.523",
          P97: "179.349",
          P99: "182.795",
          P999: "188.704",
        },
      },
      {
        name: 172,
        uid: "271759548",
        values: {
          age: 172,
          P01: "141.37",
          P1: "147.289",
          P3: "150.742",
          P5: "152.57",
          P10: "155.385",
          P15: "157.284",
          P25: "160.088",
          P50: "165.314",
          P75: "170.541",
          P85: "173.345",
          P90: "175.244",
          P95: "178.059",
          P97: "179.887",
          P99: "183.34",
          P999: "189.259",
        },
      },
      {
        name: 173,
        uid: "1031940298",
        values: {
          age: 173,
          P01: "141.841",
          P1: "147.767",
          P3: "151.224",
          P5: "153.055",
          P10: "155.874",
          P15: "157.775",
          P25: "160.583",
          P50: "165.816",
          P75: "171.05",
          P85: "173.858",
          P90: "175.759",
          P95: "178.578",
          P97: "180.409",
          P99: "183.866",
          P999: "189.792",
        },
      },
      {
        name: 174,
        uid: "3443775443",
        values: {
          age: 174,
          P01: "142.3",
          P1: "148.234",
          P3: "151.695",
          P5: "153.528",
          P10: "156.35",
          P15: "158.254",
          P25: "161.065",
          P50: "166.305",
          P75: "171.545",
          P85: "174.356",
          P90: "176.26",
          P95: "179.082",
          P97: "180.915",
          P99: "184.376",
          P999: "190.31",
        },
      },
      {
        name: 175,
        uid: "1048606429",
        values: {
          age: 175,
          P01: "142.747",
          P1: "148.688",
          P3: "152.153",
          P5: "153.988",
          P10: "156.813",
          P15: "158.72",
          P25: "161.534",
          P50: "166.78",
          P75: "172.025",
          P85: "174.84",
          P90: "176.746",
          P95: "179.572",
          P97: "181.407",
          P99: "184.872",
          P999: "190.812",
        },
      },
      {
        name: 176,
        uid: "1846791124",
        values: {
          age: 176,
          P01: "143.184",
          P1: "149.131",
          P3: "152.599",
          P5: "154.436",
          P10: "157.265",
          P15: "159.173",
          P25: "161.991",
          P50: "167.242",
          P75: "172.492",
          P85: "175.31",
          P90: "177.218",
          P95: "180.047",
          P97: "181.884",
          P99: "185.352",
          P999: "191.299",
        },
      },
      {
        name: 177,
        uid: "1135524415",
        values: {
          age: 177,
          P01: "143.614",
          P1: "149.566",
          P3: "153.037",
          P5: "154.875",
          P10: "157.705",
          P15: "159.615",
          P25: "162.435",
          P50: "167.69",
          P75: "172.945",
          P85: "175.765",
          P90: "177.674",
          P95: "180.505",
          P97: "182.343",
          P99: "185.814",
          P999: "191.766",
        },
      },
      {
        name: 178,
        uid: "343553084",
        values: {
          age: 178,
          P01: "144.034",
          P1: "149.989",
          P3: "153.463",
          P5: "155.302",
          P10: "158.135",
          P15: "160.045",
          P25: "162.867",
          P50: "168.126",
          P75: "173.384",
          P85: "176.206",
          P90: "178.116",
          P95: "180.949",
          P97: "182.788",
          P99: "186.262",
          P999: "192.217",
        },
      },
      {
        name: 179,
        uid: "3983184467",
        values: {
          age: 179,
          P01: "144.443",
          P1: "150.402",
          P3: "153.877",
          P5: "155.718",
          P10: "158.552",
          P15: "160.464",
          P25: "163.287",
          P50: "168.548",
          P75: "173.809",
          P85: "176.633",
          P90: "178.545",
          P95: "181.379",
          P97: "183.219",
          P99: "186.695",
          P999: "192.653",
        },
      },
      {
        name: 180,
        uid: "3560003606",
        values: {
          age: 180,
          P01: "144.841",
          P1: "150.803",
          P3: "154.28",
          P5: "156.121",
          P10: "158.957",
          P15: "160.869",
          P25: "163.694",
          P50: "168.958",
          P75: "174.222",
          P85: "177.047",
          P90: "178.959",
          P95: "181.795",
          P97: "183.636",
          P99: "187.113",
          P999: "193.075",
        },
      },
      {
        name: 181,
        uid: "2234758627",
        values: {
          age: 181,
          P01: "145.234",
          P1: "151.196",
          P3: "154.674",
          P5: "156.516",
          P10: "159.352",
          P15: "161.265",
          P25: "164.09",
          P50: "169.355",
          P75: "174.62",
          P85: "177.445",
          P90: "179.358",
          P95: "182.194",
          P97: "184.036",
          P99: "187.513",
          P999: "193.476",
        },
      },
      {
        name: 182,
        uid: "4177063850",
        values: {
          age: 182,
          P01: "145.616",
          P1: "151.579",
          P3: "155.057",
          P5: "156.899",
          P10: "159.735",
          P15: "161.648",
          P25: "164.474",
          P50: "169.739",
          P75: "175.004",
          P85: "177.83",
          P90: "179.743",
          P95: "182.579",
          P97: "184.421",
          P99: "187.899",
          P999: "193.862",
        },
      },
      {
        name: 183,
        uid: "3844135236",
        values: {
          age: 183,
          P01: "145.986",
          P1: "151.95",
          P3: "155.428",
          P5: "157.27",
          P10: "160.106",
          P15: "162.019",
          P25: "164.845",
          P50: "170.11",
          P75: "175.375",
          P85: "178.201",
          P90: "180.114",
          P95: "182.95",
          P97: "184.792",
          P99: "188.27",
          P999: "194.233",
        },
      },
      {
        name: 184,
        uid: "3258713263",
        values: {
          age: 184,
          P01: "146.346",
          P1: "152.309",
          P3: "155.787",
          P5: "157.629",
          P10: "160.465",
          P15: "162.378",
          P25: "165.203",
          P50: "170.468",
          P75: "175.733",
          P85: "178.558",
          P90: "180.471",
          P95: "183.307",
          P97: "185.149",
          P99: "188.627",
          P999: "194.59",
        },
      },
      {
        name: 185,
        uid: "3139626585",
        values: {
          age: 185,
          P01: "146.696",
          P1: "152.658",
          P3: "156.135",
          P5: "157.976",
          P10: "160.812",
          P15: "162.725",
          P25: "165.55",
          P50: "170.814",
          P75: "176.078",
          P85: "178.902",
          P90: "180.815",
          P95: "183.651",
          P97: "185.492",
          P99: "188.97",
          P999: "194.931",
        },
      },
      {
        name: 186,
        uid: "2767316396",
        values: {
          age: 186,
          P01: "147.035",
          P1: "152.995",
          P3: "156.472",
          P5: "158.313",
          P10: "161.147",
          P15: "163.06",
          P25: "165.884",
          P50: "171.147",
          P75: "176.41",
          P85: "179.234",
          P90: "181.146",
          P95: "183.981",
          P97: "185.822",
          P99: "189.298",
          P999: "195.259",
        },
      },
      {
        name: 187,
        uid: "2933110036",
        values: {
          age: 187,
          P01: "147.369",
          P1: "153.326",
          P3: "156.801",
          P5: "158.641",
          P10: "161.474",
          P15: "163.386",
          P25: "166.208",
          P50: "171.468",
          P75: "176.728",
          P85: "179.55",
          P90: "181.462",
          P95: "184.295",
          P97: "186.135",
          P99: "189.61",
          P999: "195.567",
        },
      },
      {
        name: 188,
        uid: "1281656912",
        values: {
          age: 188,
          P01: "147.688",
          P1: "153.643",
          P3: "157.116",
          P5: "158.955",
          P10: "161.787",
          P15: "163.698",
          P25: "166.519",
          P50: "171.777",
          P75: "177.035",
          P85: "179.857",
          P90: "181.767",
          P95: "184.599",
          P97: "186.439",
          P99: "189.912",
          P999: "195.866",
        },
      },
      {
        name: 189,
        uid: "1867385945",
        values: {
          age: 189,
          P01: "148.002",
          P1: "153.953",
          P3: "157.424",
          P5: "159.262",
          P10: "162.092",
          P15: "164.001",
          P25: "166.821",
          P50: "172.075",
          P75: "177.329",
          P85: "180.148",
          P90: "182.058",
          P95: "184.888",
          P97: "186.726",
          P99: "190.197",
          P999: "196.147",
        },
      },
      {
        name: 190,
        uid: "505316266",
        values: {
          age: 190,
          P01: "148.307",
          P1: "154.253",
          P3: "157.721",
          P5: "159.557",
          P10: "162.385",
          P15: "164.293",
          P25: "167.111",
          P50: "172.361",
          P75: "177.611",
          P85: "180.428",
          P90: "182.336",
          P95: "185.164",
          P97: 187,
          P99: "190.468",
          P999: "196.414",
        },
      },
      {
        name: 191,
        uid: "1725374003",
        values: {
          age: 191,
          P01: "148.596",
          P1: "154.538",
          P3: "158.004",
          P5: "159.839",
          P10: "162.665",
          P15: "164.572",
          P25: "167.388",
          P50: "172.634",
          P75: "177.881",
          P85: "180.697",
          P90: "182.604",
          P95: "185.43",
          P97: "187.265",
          P99: "190.731",
          P999: "196.673",
        },
      },
      {
        name: 192,
        uid: "1234191081",
        values: {
          age: 192,
          P01: "148.88",
          P1: "154.817",
          P3: "158.28",
          P5: "160.113",
          P10: "162.937",
          P15: "164.842",
          P25: "167.655",
          P50: "172.897",
          P75: "178.139",
          P85: "180.952",
          P90: "182.857",
          P95: "185.68",
          P97: "187.514",
          P99: "190.976",
          P999: "196.913",
        },
      },
      {
        name: 193,
        uid: "2073103163",
        values: {
          age: 193,
          P01: "149.155",
          P1: "155.085",
          P3: "158.545",
          P5: "160.377",
          P10: "163.197",
          P15: "165.1",
          P25: "167.91",
          P50: "173.147",
          P75: "178.384",
          P85: "181.194",
          P90: "183.097",
          P95: "185.917",
          P97: "187.749",
          P99: "191.209",
          P999: "197.139",
        },
      },
      {
        name: 194,
        uid: "4135110570",
        values: {
          age: 194,
          P01: "149.419",
          P1: "155.344",
          P3: "158.799",
          P5: "160.629",
          P10: "163.446",
          P15: "165.348",
          P25: "168.155",
          P50: "173.386",
          P75: "178.617",
          P85: "181.424",
          P90: "183.325",
          P95: "186.142",
          P97: "187.972",
          P99: "191.428",
          P999: "197.352",
        },
      },
      {
        name: 195,
        uid: "3815559940",
        values: {
          age: 195,
          P01: "149.674",
          P1: "155.591",
          P3: "159.043",
          P5: "160.871",
          P10: "163.685",
          P15: "165.584",
          P25: "168.388",
          P50: "173.613",
          P75: "178.838",
          P85: "181.641",
          P90: "183.54",
          P95: "186.355",
          P97: "188.182",
          P99: "191.634",
          P999: "197.551",
        },
      },
      {
        name: 196,
        uid: "2257090442",
        values: {
          age: 196,
          P01: "149.919",
          P1: "155.829",
          P3: "159.276",
          P5: "161.102",
          P10: "163.913",
          P15: "165.809",
          P25: "168.609",
          P50: "173.828",
          P75: "179.047",
          P85: "181.847",
          P90: "183.743",
          P95: "186.554",
          P97: "188.38",
          P99: "191.827",
          P999: "197.737",
        },
      },
      {
        name: 197,
        uid: "3411115778",
        values: {
          age: 197,
          P01: "150.154",
          P1: "156.056",
          P3: "159.499",
          P5: "161.322",
          P10: "164.13",
          P15: "166.024",
          P25: "168.82",
          P50: "174.032",
          P75: "179.244",
          P85: "182.041",
          P90: "183.935",
          P95: "186.742",
          P97: "188.565",
          P99: "192.008",
          P999: "197.91",
        },
      },
      {
        name: 198,
        uid: "19388084",
        values: {
          age: 198,
          P01: "150.38",
          P1: "156.274",
          P3: "159.712",
          P5: "161.533",
          P10: "164.336",
          P15: "166.228",
          P25: "169.02",
          P50: "174.225",
          P75: "179.43",
          P85: "182.223",
          P90: "184.114",
          P95: "186.917",
          P97: "188.738",
          P99: "192.176",
          P999: "198.071",
        },
      },
      {
        name: 199,
        uid: "2852858453",
        values: {
          age: 199,
          P01: "150.596",
          P1: "156.482",
          P3: "159.915",
          P5: "161.733",
          P10: "164.532",
          P15: "166.421",
          P25: "169.21",
          P50: "174.407",
          P75: "179.604",
          P85: "182.393",
          P90: "184.282",
          P95: "187.081",
          P97: "188.899",
          P99: "192.332",
          P999: "198.218",
        },
      },
      {
        name: 200,
        uid: "1068750170",
        values: {
          age: 200,
          P01: "150.803",
          P1: "156.68",
          P3: "160.108",
          P5: "161.923",
          P10: "164.719",
          P15: "166.604",
          P25: "169.389",
          P50: "174.578",
          P75: "179.768",
          P85: "182.552",
          P90: "184.438",
          P95: "187.233",
          P97: "189.049",
          P99: "192.477",
          P999: "198.354",
        },
      },
      {
        name: 201,
        uid: "957430453",
        values: {
          age: 201,
          P01: "151.001",
          P1: "156.869",
          P3: "160.292",
          P5: "162.104",
          P10: "164.895",
          P15: "166.778",
          P25: "169.558",
          P50: "174.739",
          P75: "179.92",
          P85: "182.701",
          P90: "184.583",
          P95: "187.374",
          P97: "189.187",
          P99: "192.609",
          P999: "198.477",
        },
      },
      {
        name: 202,
        uid: "3600189363",
        values: {
          age: 202,
          P01: "151.191",
          P1: "157.049",
          P3: "160.466",
          P5: "162.275",
          P10: "165.061",
          P15: "166.941",
          P25: "169.717",
          P50: "174.89",
          P75: "180.062",
          P85: "182.838",
          P90: "184.718",
          P95: "187.504",
          P97: "189.313",
          P99: "192.73",
          P999: "198.588",
        },
      },
      {
        name: 203,
        uid: "2405910515",
        values: {
          age: 203,
          P01: "151.366",
          P1: "157.216",
          P3: "160.628",
          P5: "162.435",
          P10: "165.217",
          P15: "167.094",
          P25: "169.865",
          P50: "175.03",
          P75: "180.195",
          P85: "182.967",
          P90: "184.844",
          P95: "187.626",
          P97: "189.432",
          P99: "192.844",
          P999: "198.694",
        },
      },
      {
        name: 204,
        uid: "2700706876",
        values: {
          age: 204,
          P01: "151.539",
          P1: "157.378",
          P3: "160.784",
          P5: "162.588",
          P10: "165.365",
          P15: "167.238",
          P25: "170.005",
          P50: "175.161",
          P75: "180.317",
          P85: "183.083",
          P90: "184.957",
          P95: "187.734",
          P97: "189.538",
          P99: "192.944",
          P999: "198.783",
        },
      },
      {
        name: 205,
        uid: "2380778449",
        values: {
          age: 205,
          P01: "151.704",
          P1: "157.532",
          P3: "160.932",
          P5: "162.732",
          P10: "165.504",
          P15: "167.374",
          P25: "170.136",
          P50: "175.282",
          P75: "180.429",
          P85: "183.19",
          P90: "185.061",
          P95: "187.833",
          P97: "189.633",
          P99: "193.033",
          P999: "198.861",
        },
      },
      {
        name: 206,
        uid: "2527733938",
        values: {
          age: 206,
          P01: "151.856",
          P1: "157.674",
          P3: "161.068",
          P5: "162.866",
          P10: "165.633",
          P15: "167.5",
          P25: "170.257",
          P50: "175.395",
          P75: "180.533",
          P85: "183.29",
          P90: "185.157",
          P95: "187.925",
          P97: "189.722",
          P99: "193.116",
          P999: "198.935",
        },
      },
      {
        name: 207,
        uid: "2473704154",
        values: {
          age: 207,
          P01: "152.006",
          P1: "157.813",
          P3: "161.201",
          P5: "162.994",
          P10: "165.756",
          P15: "167.62",
          P25: "170.372",
          P50: "175.5",
          P75: "180.627",
          P85: "183.379",
          P90: "185.243",
          P95: "188.005",
          P97: "189.798",
          P99: "193.186",
          P999: "198.993",
        },
      },
      {
        name: 208,
        uid: "2496321499",
        values: {
          age: 208,
          P01: "152.143",
          P1: "157.941",
          P3: "161.322",
          P5: "163.113",
          P10: "165.87",
          P15: "167.73",
          P25: "170.477",
          P50: "175.596",
          P75: "180.715",
          P85: "183.462",
          P90: "185.322",
          P95: "188.079",
          P97: "189.87",
          P99: "193.251",
          P999: "199.048",
        },
      },
      {
        name: 209,
        uid: "3124782586",
        values: {
          age: 209,
          P01: "152.28",
          P1: "158.066",
          P3: "161.44",
          P5: "163.227",
          P10: "165.979",
          P15: "167.835",
          P25: "170.577",
          P50: "175.685",
          P75: "180.793",
          P85: "183.535",
          P90: "185.391",
          P95: "188.143",
          P97: "189.93",
          P99: "193.304",
          P999: "199.09",
        },
      },
      {
        name: 210,
        uid: "298051321",
        values: {
          age: 210,
          P01: "152.406",
          P1: "158.181",
          P3: "161.549",
          P5: "163.333",
          P10: "166.079",
          P15: "167.932",
          P25: "170.668",
          P50: "175.767",
          P75: "180.866",
          P85: "183.602",
          P90: "185.455",
          P95: "188.202",
          P97: "189.986",
          P99: "193.354",
          P999: "199.129",
        },
      },
      {
        name: 211,
        uid: "1299803586",
        values: {
          age: 211,
          P01: "152.526",
          P1: "158.29",
          P3: "161.652",
          P5: "163.432",
          P10: "166.173",
          P15: "168.023",
          P25: "170.754",
          P50: "175.843",
          P75: "180.933",
          P85: "183.664",
          P90: "185.513",
          P95: "188.254",
          P97: "190.035",
          P99: "193.396",
          P999: "199.16",
        },
      },
      {
        name: 212,
        uid: "1352546306",
        values: {
          age: 212,
          P01: "152.641",
          P1: "158.394",
          P3: "161.749",
          P5: "163.526",
          P10: "166.262",
          P15: "168.108",
          P25: "170.834",
          P50: "175.913",
          P75: "180.993",
          P85: "183.719",
          P90: "185.564",
          P95: "188.3",
          P97: "190.077",
          P99: "193.433",
          P999: "199.185",
        },
      },
      {
        name: 213,
        uid: "609848827",
        values: {
          age: 213,
          P01: "152.752",
          P1: "158.493",
          P3: "161.842",
          P5: "163.615",
          P10: "166.346",
          P15: "168.188",
          P25: "170.909",
          P50: "175.978",
          P75: "181.048",
          P85: "183.768",
          P90: "185.61",
          P95: "188.341",
          P97: "190.114",
          P99: "193.463",
          P999: "199.204",
        },
      },
      {
        name: 214,
        uid: "2467335667",
        values: {
          age: 214,
          P01: "152.858",
          P1: "158.588",
          P3: "161.93",
          P5: "163.7",
          P10: "166.425",
          P15: "168.264",
          P25: "170.979",
          P50: "176.038",
          P75: "181.097",
          P85: "183.812",
          P90: "185.651",
          P95: "188.376",
          P97: "190.146",
          P99: "193.488",
          P999: "199.218",
        },
      },
      {
        name: 215,
        uid: "2631080298",
        values: {
          age: 215,
          P01: "152.961",
          P1: "158.679",
          P3: "162.014",
          P5: "163.781",
          P10: "166.5",
          P15: "168.335",
          P25: "171.044",
          P50: "176.094",
          P75: "181.143",
          P85: "183.852",
          P90: "185.687",
          P95: "188.406",
          P97: "190.173",
          P99: "193.508",
          P999: "199.226",
        },
      },
      {
        name: 216,
        uid: "2108238642",
        values: {
          age: 216,
          P01: "153.06",
          P1: "158.766",
          P3: "162.095",
          P5: "163.857",
          P10: "166.571",
          P15: "168.402",
          P25: "171.106",
          P50: "176.145",
          P75: "181.184",
          P85: "183.887",
          P90: "185.718",
          P95: "188.432",
          P97: "190.195",
          P99: "193.523",
          P999: "199.23",
        },
      },
      {
        name: 217,
        uid: "1505008879",
        values: {
          age: 217,
          P01: "153.15",
          P1: "158.846",
          P3: "162.168",
          P5: "163.928",
          P10: "166.637",
          P15: "168.464",
          P25: "171.163",
          P50: "176.192",
          P75: "181.222",
          P85: "183.921",
          P90: "185.748",
          P95: "188.457",
          P97: "190.217",
          P99: "193.539",
          P999: "199.235",
        },
      },
      {
        name: 218,
        uid: "3383194047",
        values: {
          age: 218,
          P01: "153.243",
          P1: "158.927",
          P3: "162.242",
          P5: "163.998",
          P10: "166.701",
          P15: "168.525",
          P25: "171.218",
          P50: "176.237",
          P75: "181.255",
          P85: "183.949",
          P90: "185.772",
          P95: "188.476",
          P97: "190.231",
          P99: "193.546",
          P999: "199.23",
        },
      },
      {
        name: 219,
        uid: "1989401026",
        values: {
          age: 219,
          P01: "153.328",
          P1: "159.001",
          P3: "162.31",
          P5: "164.062",
          P10: "166.76",
          P15: "168.581",
          P25: "171.269",
          P50: "176.278",
          P75: "181.287",
          P85: "183.975",
          P90: "185.795",
          P95: "188.494",
          P97: "190.246",
          P99: "193.555",
          P999: "199.228",
        },
      },
      {
        name: 220,
        uid: "1323052124",
        values: {
          age: 220,
          P01: "153.41",
          P1: "159.073",
          P3: "162.375",
          P5: "164.124",
          P10: "166.817",
          P15: "168.634",
          P25: "171.317",
          P50: "176.316",
          P75: "181.316",
          P85: "183.999",
          P90: "185.815",
          P95: "188.508",
          P97: "190.257",
          P99: "193.56",
          P999: "199.222",
        },
      },
      {
        name: 221,
        uid: "740013408",
        values: {
          age: 221,
          P01: "153.49",
          P1: "159.142",
          P3: "162.438",
          P5: "164.183",
          P10: "166.871",
          P15: "168.684",
          P25: "171.362",
          P50: "176.352",
          P75: "181.342",
          P85: "184.019",
          P90: "185.833",
          P95: "188.52",
          P97: "190.266",
          P99: "193.562",
          P999: "199.213",
        },
      },
      {
        name: 222,
        uid: "993165819",
        values: {
          age: 222,
          P01: "153.574",
          P1: "159.213",
          P3: "162.502",
          P5: "164.243",
          P10: "166.925",
          P15: "168.734",
          P25: "171.406",
          P50: "176.385",
          P75: "181.364",
          P85: "184.036",
          P90: "185.845",
          P95: "188.527",
          P97: "190.269",
          P99: "193.558",
          P999: "199.196",
        },
      },
      {
        name: 223,
        uid: "1025189630",
        values: {
          age: 223,
          P01: "153.645",
          P1: "159.274",
          P3: "162.557",
          P5: "164.295",
          P10: "166.973",
          P15: "168.779",
          P25: "171.446",
          P50: "176.416",
          P75: "181.386",
          P85: "184.054",
          P90: "185.86",
          P95: "188.537",
          P97: "190.276",
          P99: "193.559",
          P999: "199.188",
        },
      },
      {
        name: 224,
        uid: "1537328397",
        values: {
          age: 224,
          P01: "153.719",
          P1: "159.337",
          P3: "162.613",
          P5: "164.349",
          P10: "167.02",
          P15: "168.823",
          P25: "171.485",
          P50: "176.445",
          P75: "181.406",
          P85: "184.067",
          P90: "185.87",
          P95: "188.542",
          P97: "190.277",
          P99: "193.554",
          P999: "199.172",
        },
      },
      {
        name: 225,
        uid: "2412384672",
        values: {
          age: 225,
          P01: "153.792",
          P1: "159.398",
          P3: "162.668",
          P5: "164.4",
          P10: "167.066",
          P15: "168.866",
          P25: "171.522",
          P50: "176.472",
          P75: "181.423",
          P85: "184.079",
          P90: "185.878",
          P95: "188.545",
          P97: "190.276",
          P99: "193.547",
          P999: "199.153",
        },
      },
      {
        name: 226,
        uid: "2338598534",
        values: {
          age: 226,
          P01: "153.863",
          P1: "159.458",
          P3: "162.721",
          P5: "164.45",
          P10: "167.111",
          P15: "168.906",
          P25: "171.557",
          P50: "176.498",
          P75: "181.438",
          P85: "184.089",
          P90: "185.885",
          P95: "188.546",
          P97: "190.274",
          P99: "193.537",
          P999: "199.132",
        },
      },
      {
        name: 227,
        uid: "3070697871",
        values: {
          age: 227,
          P01: "153.927",
          P1: "159.512",
          P3: "162.77",
          P5: "164.495",
          P10: "167.151",
          P15: "168.943",
          P25: "171.59",
          P50: "176.521",
          P75: "181.453",
          P85: "184.099",
          P90: "185.891",
          P95: "188.547",
          P97: "190.273",
          P99: "193.53",
          P999: "199.115",
        },
      },
      {
        name: 228,
        uid: "2595842587",
        values: {
          age: 228,
          P01: "153.99",
          P1: "159.565",
          P3: "162.817",
          P5: "164.539",
          P10: "167.19",
          P15: "168.979",
          P25: "171.621",
          P50: "176.543",
          P75: "181.466",
          P85: "184.107",
          P90: "185.896",
          P95: "188.548",
          P97: "190.27",
          P99: "193.522",
          P999: "199.097",
        },
      },
    ];

    const boys_to_13w = [
      {
        name: "a",
        uid: "1589549939",
        values: {
          age: 0,
          P01: 44,
          P1: "45.5",
          P3: "46.3",
          P5: "46.8",
          P10: "47.5",
          P15: "47.9",
          P25: "48.6",
          P50: "49.9",
          P75: "51.2",
          P85: "51.8",
          P90: "52.3",
          P95: 53,
          P97: "53.4",
          P99: "54.3",
          P999: "55.7",
        },
      },
      {
        name: 1,
        uid: "1309102428",
        values: {
          age: 1,
          P01: "45.2",
          P1: "46.7",
          P3: "47.5",
          P5: 48,
          P10: "48.7",
          P15: "49.1",
          P25: "49.8",
          P50: "51.1",
          P75: "52.4",
          P85: "53.1",
          P90: "53.6",
          P95: "54.2",
          P97: "54.7",
          P99: "55.5",
          P999: 57,
        },
      },
      {
        name: 2,
        uid: "3205415503",
        values: {
          age: 2,
          P01: "46.4",
          P1: "47.9",
          P3: "48.8",
          P5: "49.2",
          P10: "49.9",
          P15: "50.4",
          P25: "51.1",
          P50: "52.3",
          P75: "53.6",
          P85: "54.3",
          P90: "54.8",
          P95: "55.5",
          P97: "55.9",
          P99: "56.8",
          P999: "58.3",
        },
      },
      {
        name: 3,
        uid: "1029676985",
        values: {
          age: 3,
          P01: "47.4",
          P1: "48.9",
          P3: "49.8",
          P5: "50.2",
          P10: "50.9",
          P15: "51.4",
          P25: "52.1",
          P50: "53.4",
          P75: "54.7",
          P85: "55.4",
          P90: "55.9",
          P95: "56.6",
          P97: 57,
          P99: "57.9",
          P999: "59.3",
        },
      },
      {
        name: 4,
        uid: "1524543629",
        values: {
          age: 4,
          P01: "48.4",
          P1: "49.9",
          P3: "50.7",
          P5: "51.2",
          P10: "51.9",
          P15: "52.4",
          P25: "53.1",
          P50: "54.4",
          P75: "55.7",
          P85: "56.4",
          P90: "56.9",
          P95: "57.6",
          P97: 58,
          P99: "58.9",
          P999: "60.4",
        },
      },
      {
        name: 5,
        uid: "3324676590",
        values: {
          age: 5,
          P01: "49.3",
          P1: "50.8",
          P3: "51.7",
          P5: "52.1",
          P10: "52.8",
          P15: "53.3",
          P25: 54,
          P50: "55.3",
          P75: "56.7",
          P85: "57.4",
          P90: "57.8",
          P95: "58.6",
          P97: 59,
          P99: "59.9",
          P999: "61.4",
        },
      },
      {
        name: 6,
        uid: "2861606192",
        values: {
          age: 6,
          P01: "50.2",
          P1: "51.7",
          P3: "52.5",
          P5: 53,
          P10: "53.7",
          P15: "54.2",
          P25: "54.9",
          P50: "56.2",
          P75: "57.6",
          P85: "58.3",
          P90: "58.8",
          P95: "59.5",
          P97: "59.9",
          P99: "60.8",
          P999: "62.3",
        },
      },
      {
        name: 7,
        uid: "1891408407",
        values: {
          age: 7,
          P01: 51,
          P1: "52.5",
          P3: "53.4",
          P5: "53.8",
          P10: "54.5",
          P15: 55,
          P25: "55.7",
          P50: "57.1",
          P75: "58.4",
          P85: "59.1",
          P90: "59.6",
          P95: "60.3",
          P97: "60.8",
          P99: "61.7",
          P999: "63.2",
        },
      },
      {
        name: 8,
        uid: "3962747673",
        values: {
          age: 8,
          P01: "51.7",
          P1: "53.3",
          P3: "54.1",
          P5: "54.6",
          P10: "55.3",
          P15: "55.8",
          P25: "56.5",
          P50: "57.9",
          P75: "59.2",
          P85: 60,
          P90: "60.4",
          P95: "61.2",
          P97: "61.6",
          P99: "62.5",
          P999: 64,
        },
      },
      {
        name: 9,
        uid: "2156180893",
        values: {
          age: 9,
          P01: "52.5",
          P1: 54,
          P3: "54.9",
          P5: "55.4",
          P10: "56.1",
          P15: "56.6",
          P25: "57.3",
          P50: "58.7",
          P75: 60,
          P85: "60.7",
          P90: "61.2",
          P95: "61.9",
          P97: "62.4",
          P99: "63.3",
          P999: "64.8",
        },
      },
      {
        name: 10,
        uid: "2889875267",
        values: {
          age: 10,
          P01: "53.2",
          P1: "54.7",
          P3: "55.6",
          P5: "56.1",
          P10: "56.8",
          P15: "57.3",
          P25: 58,
          P50: "59.4",
          P75: "60.7",
          P85: "61.5",
          P90: 62,
          P95: "62.7",
          P97: "63.2",
          P99: "64.1",
          P999: "65.6",
        },
      },
      {
        name: 11,
        uid: "188111283",
        values: {
          age: 11,
          P01: "53.8",
          P1: "55.4",
          P3: "56.3",
          P5: "56.8",
          P10: "57.5",
          P15: 58,
          P25: "58.7",
          P50: "60.1",
          P75: "61.5",
          P85: "62.2",
          P90: "62.7",
          P95: "63.4",
          P97: "63.9",
          P99: "64.8",
          P999: "66.3",
        },
      },
      {
        name: 12,
        uid: "2298099179",
        values: {
          age: 12,
          P01: "54.5",
          P1: 56,
          P3: "56.9",
          P5: "57.4",
          P10: "58.2",
          P15: "58.7",
          P25: "59.4",
          P50: "60.8",
          P75: "62.1",
          P85: "62.9",
          P90: "63.4",
          P95: "64.1",
          P97: "64.6",
          P99: "65.5",
          P999: 67,
        },
      },
      {
        name: 13,
        uid: "399350150",
        values: {
          age: 13,
          P01: "55.1",
          P1: "56.6",
          P3: "57.6",
          P5: 58,
          P10: "58.8",
          P15: "59.3",
          P25: 60,
          P50: "61.4",
          P75: "62.8",
          P85: "63.5",
          P90: 64,
          P95: "64.8",
          P97: "65.2",
          P99: "66.2",
          P999: "67.7",
        },
      },
    ];

    const girls_to_5y = [
      {
        name: "a",
        uid: "1589549939",
        values: {
          age: 0,
          P01: 44,
          P1: "45.5",
          P3: "46.3",
          P5: "46.8",
          P10: "47.5",
          P15: "47.9",
          P25: "48.6",
          P50: "49.9",
          P75: "51.2",
          P85: "51.8",
          P90: "52.3",
          P95: 53,
          P97: "53.4",
          P99: "54.3",
          P999: "55.7",
        },
      },
      {
        name: 1,
        uid: "4093758805",
        values: {
          age: 1,
          P01: "48.7",
          P1: "50.2",
          P3: "51.1",
          P5: "51.5",
          P10: "52.2",
          P15: "52.7",
          P25: "53.4",
          P50: "54.7",
          P75: 56,
          P85: "56.7",
          P90: "57.2",
          P95: "57.9",
          P97: "58.4",
          P99: "59.3",
          P999: "60.7",
        },
      },
      {
        name: 2,
        uid: "4049563981",
        values: {
          age: 2,
          P01: "52.2",
          P1: "53.8",
          P3: "54.7",
          P5: "55.1",
          P10: "55.9",
          P15: "56.4",
          P25: "57.1",
          P50: "58.4",
          P75: "59.8",
          P85: "60.5",
          P90: 61,
          P95: "61.7",
          P97: "62.2",
          P99: "63.1",
          P999: "64.6",
        },
      },
      {
        name: 3,
        uid: "3461950553",
        values: {
          age: 3,
          P01: "55.1",
          P1: "56.7",
          P3: "57.6",
          P5: "58.1",
          P10: "58.8",
          P15: "59.3",
          P25: "60.1",
          P50: "61.4",
          P75: "62.8",
          P85: "63.5",
          P90: 64,
          P95: "64.8",
          P97: "65.3",
          P99: "66.2",
          P999: "67.7",
        },
      },
      {
        name: 4,
        uid: "5364138",
        values: {
          age: 4,
          P01: "57.5",
          P1: 59,
          P3: 60,
          P5: "60.5",
          P10: "61.2",
          P15: "61.7",
          P25: "62.5",
          P50: "63.9",
          P75: "65.3",
          P85: 66,
          P90: "66.6",
          P95: "67.3",
          P97: "67.8",
          P99: "68.7",
          P999: "70.3",
        },
      },
      {
        name: 5,
        uid: "2984285765",
        values: {
          age: 5,
          P01: "59.4",
          P1: 61,
          P3: "61.9",
          P5: "62.4",
          P10: "63.2",
          P15: "63.7",
          P25: "64.5",
          P50: "65.9",
          P75: "67.3",
          P85: "68.1",
          P90: "68.6",
          P95: "69.4",
          P97: "69.9",
          P99: "70.8",
          P999: "72.4",
        },
      },
      {
        name: 6,
        uid: "935059469",
        values: {
          age: 6,
          P01: 61,
          P1: "62.6",
          P3: "63.6",
          P5: "64.1",
          P10: "64.9",
          P15: "65.4",
          P25: "66.2",
          P50: "67.6",
          P75: "69.1",
          P85: "69.8",
          P90: "70.4",
          P95: "71.1",
          P97: "71.6",
          P99: "72.6",
          P999: "74.2",
        },
      },
      {
        name: 7,
        uid: "2162721115",
        values: {
          age: 7,
          P01: "62.5",
          P1: "64.1",
          P3: "65.1",
          P5: "65.6",
          P10: "66.4",
          P15: "66.9",
          P25: "67.7",
          P50: "69.2",
          P75: "70.6",
          P85: "71.4",
          P90: "71.9",
          P95: "72.7",
          P97: "73.2",
          P99: "74.2",
          P999: "75.9",
        },
      },
      {
        name: 8,
        uid: "125627344",
        values: {
          age: 8,
          P01: "63.8",
          P1: "65.5",
          P3: "66.5",
          P5: 67,
          P10: "67.8",
          P15: "68.3",
          P25: "69.1",
          P50: "70.6",
          P75: "72.1",
          P85: "72.9",
          P90: "73.4",
          P95: "74.2",
          P97: "74.7",
          P99: "75.7",
          P999: "77.4",
        },
      },
      {
        name: 9,
        uid: "3418199007",
        values: {
          age: 9,
          P01: 65,
          P1: "66.8",
          P3: "67.7",
          P5: "68.3",
          P10: "69.1",
          P15: "69.6",
          P25: "70.5",
          P50: 72,
          P75: "73.5",
          P85: "74.3",
          P90: "74.8",
          P95: "75.7",
          P97: "76.2",
          P99: "77.2",
          P999: "78.9",
        },
      },
      {
        name: 10,
        uid: "2989642416",
        values: {
          age: 10,
          P01: "66.2",
          P1: 68,
          P3: 69,
          P5: "69.5",
          P10: "70.4",
          P15: "70.9",
          P25: "71.7",
          P50: "73.3",
          P75: "74.8",
          P85: "75.6",
          P90: "76.2",
          P95: 77,
          P97: "77.6",
          P99: "78.6",
          P999: "80.3",
        },
      },
      {
        name: 11,
        uid: "1933077736",
        values: {
          age: 11,
          P01: "67.3",
          P1: "69.1",
          P3: "70.2",
          P5: "70.7",
          P10: "71.6",
          P15: "72.1",
          P25: 73,
          P50: "74.5",
          P75: "76.1",
          P85: 77,
          P90: "77.5",
          P95: "78.4",
          P97: "78.9",
          P99: 80,
          P999: "81.7",
        },
      },
      {
        name: 12,
        uid: "3974467696",
        values: {
          age: 12,
          P01: "68.4",
          P1: "70.2",
          P3: "71.3",
          P5: "71.8",
          P10: "72.7",
          P15: "73.3",
          P25: "74.1",
          P50: "75.7",
          P75: "77.4",
          P85: "78.2",
          P90: "78.8",
          P95: "79.7",
          P97: "80.2",
          P99: "81.3",
          P999: "83.1",
        },
      },
      {
        name: 13,
        uid: "3537086184",
        values: {
          age: 13,
          P01: "69.4",
          P1: "71.3",
          P3: "72.4",
          P5: "72.9",
          P10: "73.8",
          P15: "74.4",
          P25: "75.3",
          P50: "76.9",
          P75: "78.6",
          P85: "79.4",
          P90: 80,
          P95: "80.9",
          P97: "81.5",
          P99: "82.6",
          P999: "84.4",
        },
      },
      {
        name: 14,
        uid: "576952500",
        values: {
          age: 14,
          P01: "70.4",
          P1: "72.3",
          P3: "73.4",
          P5: 74,
          P10: "74.9",
          P15: "75.5",
          P25: "76.4",
          P50: 78,
          P75: "79.7",
          P85: "80.6",
          P90: "81.2",
          P95: "82.1",
          P97: "82.7",
          P99: "83.8",
          P999: "85.7",
        },
      },
      {
        name: 15,
        uid: "3702332655",
        values: {
          age: 15,
          P01: "71.3",
          P1: "73.3",
          P3: "74.4",
          P5: 75,
          P10: "75.9",
          P15: "76.5",
          P25: "77.4",
          P50: "79.1",
          P75: "80.9",
          P85: "81.8",
          P90: "82.4",
          P95: "83.3",
          P97: "83.9",
          P99: 85,
          P999: 87,
        },
      },
      {
        name: 16,
        uid: "2629194847",
        values: {
          age: 16,
          P01: "72.2",
          P1: "74.2",
          P3: "75.4",
          P5: 76,
          P10: "76.9",
          P15: "77.5",
          P25: "78.5",
          P50: "80.2",
          P75: 82,
          P85: "82.9",
          P90: "83.5",
          P95: "84.5",
          P97: "85.1",
          P99: "86.2",
          P999: "88.2",
        },
      },
      {
        name: 17,
        uid: "4002604646",
        values: {
          age: 17,
          P01: "73.1",
          P1: "75.1",
          P3: "76.3",
          P5: "76.9",
          P10: "77.9",
          P15: "78.5",
          P25: "79.5",
          P50: "81.2",
          P75: 83,
          P85: 84,
          P90: "84.6",
          P95: "85.6",
          P97: "86.2",
          P99: "87.4",
          P999: "89.4",
        },
      },
      {
        name: 18,
        uid: "133910667",
        values: {
          age: 18,
          P01: "73.9",
          P1: 76,
          P3: "77.2",
          P5: "77.8",
          P10: "78.8",
          P15: "79.5",
          P25: "80.4",
          P50: "82.3",
          P75: "84.1",
          P85: "85.1",
          P90: "85.7",
          P95: "86.7",
          P97: "87.3",
          P99: "88.5",
          P999: "90.6",
        },
      },
      {
        name: 19,
        uid: "2724884999",
        values: {
          age: 19,
          P01: "74.7",
          P1: "76.8",
          P3: "78.1",
          P5: "78.7",
          P10: "79.7",
          P15: "80.4",
          P25: "81.4",
          P50: "83.2",
          P75: "85.1",
          P85: "86.1",
          P90: "86.8",
          P95: "87.8",
          P97: "88.4",
          P99: "89.7",
          P999: "91.8",
        },
      },
      {
        name: 20,
        uid: "97698012",
        values: {
          age: 20,
          P01: "75.5",
          P1: "77.7",
          P3: "78.9",
          P5: "79.6",
          P10: "80.6",
          P15: "81.3",
          P25: "82.3",
          P50: "84.2",
          P75: "86.1",
          P85: "87.1",
          P90: "87.8",
          P95: "88.8",
          P97: "89.5",
          P99: "90.7",
          P999: "92.9",
        },
      },
      {
        name: 21,
        uid: "2943559141",
        values: {
          age: 21,
          P01: "76.3",
          P1: "78.4",
          P3: "79.7",
          P5: "80.4",
          P10: "81.5",
          P15: "82.2",
          P25: "83.2",
          P50: "85.1",
          P75: "87.1",
          P85: "88.1",
          P90: "88.8",
          P95: "89.9",
          P97: "90.5",
          P99: "91.8",
          P999: 94,
        },
      },
      {
        name: 22,
        uid: "3376612254",
        values: {
          age: 22,
          P01: 77,
          P1: "79.2",
          P3: "80.5",
          P5: "81.2",
          P10: "82.3",
          P15: 83,
          P25: "84.1",
          P50: 86,
          P75: 88,
          P85: "89.1",
          P90: "89.8",
          P95: "90.9",
          P97: "91.6",
          P99: "92.9",
          P999: "95.1",
        },
      },
      {
        name: 23,
        uid: "3494845315",
        values: {
          age: 23,
          P01: "77.7",
          P1: 80,
          P3: "81.3",
          P5: 82,
          P10: "83.1",
          P15: "83.8",
          P25: "84.9",
          P50: "86.9",
          P75: 89,
          P85: 90,
          P90: "90.8",
          P95: "91.9",
          P97: "92.6",
          P99: "93.9",
          P999: "96.2",
        },
      },
      {
        name: 24,
        uid: "3273731722",
        values: {
          age: 24,
          P01: "78.4",
          P1: "80.7",
          P3: "82.1",
          P5: "82.8",
          P10: "83.9",
          P15: "84.6",
          P25: "85.8",
          P50: "87.8",
          P75: "89.9",
          P85: 91,
          P90: "91.7",
          P95: "92.8",
          P97: "93.6",
          P99: "94.9",
          P999: "97.3",
        },
      },
      {
        name: 25,
        uid: "169556906",
        values: {
          age: 25,
          P01: "78.3",
          P1: "80.7",
          P3: "82.1",
          P5: "82.8",
          P10: 84,
          P15: "84.7",
          P25: "85.9",
          P50: 88,
          P75: "90.1",
          P85: "91.2",
          P90: 92,
          P95: "93.1",
          P97: "93.8",
          P99: "95.2",
          P999: "97.6",
        },
      },
      {
        name: 26,
        uid: "1531721040",
        values: {
          age: 26,
          P01: 79,
          P1: "81.4",
          P3: "82.8",
          P5: "83.6",
          P10: "84.7",
          P15: "85.5",
          P25: "86.7",
          P50: "88.8",
          P75: "90.9",
          P85: "92.1",
          P90: "92.9",
          P95: 94,
          P97: "94.8",
          P99: "96.2",
          P999: "98.6",
        },
      },
      {
        name: 27,
        uid: "2591991239",
        values: {
          age: 27,
          P01: "79.6",
          P1: "82.1",
          P3: "83.5",
          P5: "84.3",
          P10: "85.5",
          P15: "86.3",
          P25: "87.4",
          P50: "89.6",
          P75: "91.8",
          P85: 93,
          P90: "93.8",
          P95: "94.9",
          P97: "95.7",
          P99: "97.1",
          P999: "99.6",
        },
      },
      {
        name: 28,
        uid: "2883704525",
        values: {
          age: 28,
          P01: "80.2",
          P1: "82.8",
          P3: "84.2",
          P5: 85,
          P10: "86.2",
          P15: 87,
          P25: "88.2",
          P50: "90.4",
          P75: "92.6",
          P85: "93.8",
          P90: "94.6",
          P95: "95.8",
          P97: "96.6",
          P99: "98.1",
          P999: "100.6",
        },
      },
      {
        name: 29,
        uid: "2189393354",
        values: {
          age: 29,
          P01: "80.8",
          P1: "83.4",
          P3: "84.9",
          P5: "85.7",
          P10: "86.9",
          P15: "87.7",
          P25: "88.9",
          P50: "91.2",
          P75: "93.4",
          P85: "94.7",
          P90: "95.5",
          P95: "96.7",
          P97: "97.5",
          P99: 99,
          P999: "101.5",
        },
      },
      {
        name: 30,
        uid: "1338886867",
        values: {
          age: 30,
          P01: "81.4",
          P1: 84,
          P3: "85.5",
          P5: "86.3",
          P10: "87.6",
          P15: "88.4",
          P25: "89.6",
          P50: "91.9",
          P75: "94.2",
          P85: "95.5",
          P90: "96.3",
          P95: "97.5",
          P97: "98.3",
          P99: "99.9",
          P999: "102.5",
        },
      },
      {
        name: 31,
        uid: "2874105084",
        values: {
          age: 31,
          P01: 82,
          P1: "84.6",
          P3: "86.2",
          P5: 87,
          P10: "88.2",
          P15: "89.1",
          P25: "90.3",
          P50: "92.7",
          P75: 95,
          P85: "96.2",
          P90: "97.1",
          P95: "98.4",
          P97: "99.2",
          P99: "100.7",
          P999: "103.4",
        },
      },
      {
        name: 32,
        uid: "3579270741",
        values: {
          age: 32,
          P01: "82.5",
          P1: "85.2",
          P3: "86.8",
          P5: "87.6",
          P10: "88.9",
          P15: "89.7",
          P25: 91,
          P50: "93.4",
          P75: "95.7",
          P85: 97,
          P90: "97.9",
          P95: "99.2",
          P97: 100,
          P99: "101.5",
          P999: "104.2",
        },
      },
      {
        name: 33,
        uid: "572763733",
        values: {
          age: 33,
          P01: "83.1",
          P1: "85.8",
          P3: "87.4",
          P5: "88.2",
          P10: "89.5",
          P15: "90.4",
          P25: "91.7",
          P50: "94.1",
          P75: "96.5",
          P85: "97.8",
          P90: "98.6",
          P95: "99.9",
          P97: "100.8",
          P99: "102.4",
          P999: "105.1",
        },
      },
      {
        name: 34,
        uid: "3809508546",
        values: {
          age: 34,
          P01: "83.6",
          P1: "86.4",
          P3: 88,
          P5: "88.8",
          P10: "90.1",
          P15: 91,
          P25: "92.3",
          P50: "94.8",
          P75: "97.2",
          P85: "98.5",
          P90: "99.4",
          P95: "100.7",
          P97: "101.5",
          P99: "103.2",
          P999: "105.9",
        },
      },
      {
        name: 35,
        uid: "2832660290",
        values: {
          age: 35,
          P01: "84.1",
          P1: "86.9",
          P3: "88.5",
          P5: "89.4",
          P10: "90.7",
          P15: "91.6",
          P25: 93,
          P50: "95.4",
          P75: "97.9",
          P85: "99.2",
          P90: "100.1",
          P95: "101.4",
          P97: "102.3",
          P99: "103.9",
          P999: "106.7",
        },
      },
      {
        name: 36,
        uid: "2593086519",
        values: {
          age: 36,
          P01: "84.6",
          P1: "87.5",
          P3: "89.1",
          P5: 90,
          P10: "91.3",
          P15: "92.2",
          P25: "93.6",
          P50: "96.1",
          P75: "98.6",
          P85: "99.9",
          P90: "100.8",
          P95: "102.2",
          P97: "103.1",
          P99: "104.7",
          P999: "107.5",
        },
      },
      {
        name: 37,
        uid: "2576968997",
        values: {
          age: 37,
          P01: "85.1",
          P1: 88,
          P3: "89.7",
          P5: "90.6",
          P10: "91.9",
          P15: "92.8",
          P25: "94.2",
          P50: "96.7",
          P75: "99.3",
          P85: "100.6",
          P90: "101.5",
          P95: "102.9",
          P97: "103.8",
          P99: "105.5",
          P999: "108.3",
        },
      },
      {
        name: 38,
        uid: "3163459531",
        values: {
          age: 38,
          P01: "85.6",
          P1: "88.5",
          P3: "90.2",
          P5: "91.1",
          P10: "92.5",
          P15: "93.4",
          P25: "94.8",
          P50: "97.4",
          P75: "99.9",
          P85: "101.3",
          P90: "102.2",
          P95: "103.6",
          P97: "104.5",
          P99: "106.2",
          P999: "109.1",
        },
      },
      {
        name: 39,
        uid: "4294052699",
        values: {
          age: 39,
          P01: "86.1",
          P1: "89.1",
          P3: "90.8",
          P5: "91.7",
          P10: "93.1",
          P15: 94,
          P25: "95.4",
          P50: 98,
          P75: "100.6",
          P85: 102,
          P90: "102.9",
          P95: "104.3",
          P97: "105.2",
          P99: "106.9",
          P999: "109.9",
        },
      },
      {
        name: 40,
        uid: "250775112",
        values: {
          age: 40,
          P01: "86.6",
          P1: "89.6",
          P3: "91.3",
          P5: "92.2",
          P10: "93.7",
          P15: "94.6",
          P25: 96,
          P50: "98.6",
          P75: "101.3",
          P85: "102.7",
          P90: "103.6",
          P95: 105,
          P97: "105.9",
          P99: "107.7",
          P999: "110.6",
        },
      },
      {
        name: 41,
        uid: "4094003707",
        values: {
          age: 41,
          P01: "87.1",
          P1: "90.1",
          P3: "91.9",
          P5: "92.8",
          P10: "94.2",
          P15: "95.2",
          P25: "96.6",
          P50: "99.2",
          P75: "101.9",
          P85: "103.3",
          P90: "104.3",
          P95: "105.7",
          P97: "106.6",
          P99: "108.4",
          P999: "111.4",
        },
      },
      {
        name: 42,
        uid: "833569153",
        values: {
          age: 42,
          P01: "87.6",
          P1: "90.6",
          P3: "92.4",
          P5: "93.3",
          P10: "94.8",
          P15: "95.7",
          P25: "97.2",
          P50: "99.9",
          P75: "102.5",
          P85: 104,
          P90: "104.9",
          P95: "106.4",
          P97: "107.3",
          P99: "109.1",
          P999: "112.1",
        },
      },
      {
        name: 43,
        uid: "2968591951",
        values: {
          age: 43,
          P01: "88.1",
          P1: "91.1",
          P3: "92.9",
          P5: "93.9",
          P10: "95.3",
          P15: "96.3",
          P25: "97.7",
          P50: "100.4",
          P75: "103.1",
          P85: "104.6",
          P90: "105.6",
          P95: 107,
          P97: 108,
          P99: "109.8",
          P999: "112.8",
        },
      },
      {
        name: 44,
        uid: "543345448",
        values: {
          age: 44,
          P01: "88.5",
          P1: "91.6",
          P3: "93.4",
          P5: "94.4",
          P10: "95.9",
          P15: "96.8",
          P25: "98.3",
          P50: 101,
          P75: "103.8",
          P85: "105.2",
          P90: "106.2",
          P95: "107.7",
          P97: "108.6",
          P99: "110.4",
          P999: "113.5",
        },
      },
      {
        name: 45,
        uid: "1532667843",
        values: {
          age: 45,
          P01: 89,
          P1: "92.1",
          P3: "93.9",
          P5: "94.9",
          P10: "96.4",
          P15: "97.4",
          P25: "98.9",
          P50: "101.6",
          P75: "104.4",
          P85: "105.8",
          P90: "106.8",
          P95: "108.3",
          P97: "109.3",
          P99: "111.1",
          P999: "114.2",
        },
      },
      {
        name: 46,
        uid: "3991254004",
        values: {
          age: 46,
          P01: "89.5",
          P1: "92.6",
          P3: "94.4",
          P5: "95.4",
          P10: "96.9",
          P15: "97.9",
          P25: "99.4",
          P50: "102.2",
          P75: 105,
          P85: "106.5",
          P90: "107.5",
          P95: 109,
          P97: "109.9",
          P99: "111.8",
          P999: "114.9",
        },
      },
      {
        name: 47,
        uid: "3897932360",
        values: {
          age: 47,
          P01: "89.9",
          P1: "93.1",
          P3: "94.9",
          P5: "95.9",
          P10: "97.4",
          P15: "98.5",
          P25: 100,
          P50: "102.8",
          P75: "105.6",
          P85: "107.1",
          P90: "108.1",
          P95: "109.6",
          P97: "110.6",
          P99: "112.4",
          P999: "115.6",
        },
      },
      {
        name: 48,
        uid: "1523726453",
        values: {
          age: 48,
          P01: "90.4",
          P1: "93.6",
          P3: "95.4",
          P5: "96.4",
          P10: 98,
          P15: 99,
          P25: "100.5",
          P50: "103.3",
          P75: "106.2",
          P85: "107.7",
          P90: "108.7",
          P95: "110.2",
          P97: "111.2",
          P99: "113.1",
          P999: "116.3",
        },
      },
      {
        name: 49,
        uid: "2666968585",
        values: {
          age: 49,
          P01: "90.8",
          P1: 94,
          P3: "95.9",
          P5: "96.9",
          P10: "98.5",
          P15: "99.5",
          P25: 101,
          P50: "103.9",
          P75: "106.7",
          P85: "108.3",
          P90: "109.3",
          P95: "110.8",
          P97: "111.8",
          P99: "113.7",
          P999: 117,
        },
      },
      {
        name: 50,
        uid: "1664314738",
        values: {
          age: 50,
          P01: "91.3",
          P1: "94.5",
          P3: "96.4",
          P5: "97.4",
          P10: 99,
          P15: 100,
          P25: "101.6",
          P50: "104.4",
          P75: "107.3",
          P85: "108.9",
          P90: "109.9",
          P95: "111.5",
          P97: "112.5",
          P99: "114.4",
          P999: "117.6",
        },
      },
      {
        name: 51,
        uid: "3071254588",
        values: {
          age: 51,
          P01: "91.7",
          P1: 95,
          P3: "96.9",
          P5: "97.9",
          P10: "99.5",
          P15: "100.5",
          P25: "102.1",
          P50: 105,
          P75: "107.9",
          P85: "109.5",
          P90: "110.5",
          P95: "112.1",
          P97: "113.1",
          P99: 115,
          P999: "118.3",
        },
      },
      {
        name: 52,
        uid: "1165396677",
        values: {
          age: 52,
          P01: "92.1",
          P1: "95.5",
          P3: "97.4",
          P5: "98.4",
          P10: 100,
          P15: "101.1",
          P25: "102.6",
          P50: "105.6",
          P75: "108.5",
          P85: "110.1",
          P90: "111.1",
          P95: "112.7",
          P97: "113.7",
          P99: "115.7",
          P999: 119,
        },
      },
      {
        name: 53,
        uid: "1938953078",
        values: {
          age: 53,
          P01: "92.6",
          P1: "95.9",
          P3: "97.9",
          P5: "98.9",
          P10: "100.5",
          P15: "101.6",
          P25: "103.2",
          P50: "106.1",
          P75: "109.1",
          P85: "110.7",
          P90: "111.7",
          P95: "113.3",
          P97: "114.3",
          P99: "116.3",
          P999: "119.6",
        },
      },
      {
        name: 54,
        uid: "3800210561",
        values: {
          age: 54,
          P01: 93,
          P1: "96.4",
          P3: "98.4",
          P5: "99.4",
          P10: 101,
          P15: "102.1",
          P25: "103.7",
          P50: "106.7",
          P75: "109.6",
          P85: "111.2",
          P90: "112.3",
          P95: "113.9",
          P97: 115,
          P99: "116.9",
          P999: "120.3",
        },
      },
      {
        name: 55,
        uid: "3638779759",
        values: {
          age: 55,
          P01: "93.5",
          P1: "96.9",
          P3: "98.8",
          P5: "99.9",
          P10: "101.5",
          P15: "102.6",
          P25: "104.2",
          P50: "107.2",
          P75: "110.2",
          P85: "111.8",
          P90: "112.9",
          P95: "114.5",
          P97: "115.6",
          P99: "117.6",
          P999: 121,
        },
      },
      {
        name: 56,
        uid: "2271954843",
        values: {
          age: 56,
          P01: "93.9",
          P1: "97.3",
          P3: "99.3",
          P5: "100.4",
          P10: 102,
          P15: "103.1",
          P25: "104.7",
          P50: "107.8",
          P75: "110.8",
          P85: "112.4",
          P90: "113.5",
          P95: "115.2",
          P97: "116.2",
          P99: "118.2",
          P999: "121.6",
        },
      },
      {
        name: 57,
        uid: "3319396319",
        values: {
          age: 57,
          P01: "94.3",
          P1: "97.8",
          P3: "99.8",
          P5: "100.9",
          P10: "102.5",
          P15: "103.6",
          P25: "105.3",
          P50: "108.3",
          P75: "111.4",
          P85: 113,
          P90: "114.1",
          P95: "115.8",
          P97: "116.8",
          P99: "118.8",
          P999: "122.3",
        },
      },
      {
        name: 58,
        uid: "1502254666",
        values: {
          age: 58,
          P01: "94.8",
          P1: "98.3",
          P3: "100.3",
          P5: "101.4",
          P10: 103,
          P15: "104.1",
          P25: "105.8",
          P50: "108.9",
          P75: "111.9",
          P85: "113.6",
          P90: "114.7",
          P95: "116.4",
          P97: "117.4",
          P99: "119.5",
          P999: 123,
        },
      },
      {
        name: 59,
        uid: "3781244486",
        values: {
          age: 59,
          P01: "95.2",
          P1: "98.7",
          P3: "100.8",
          P5: "101.9",
          P10: "103.5",
          P15: "104.7",
          P25: "106.3",
          P50: "109.4",
          P75: "112.5",
          P85: "114.2",
          P90: "115.3",
          P95: 117,
          P97: "118.1",
          P99: "120.1",
          P999: "123.6",
        },
      },
      {
        name: 60,
        uid: "3913722680",
        values: {
          age: 60,
          P01: "95.6",
          P1: "99.2",
          P3: "101.2",
          P5: "102.3",
          P10: 104,
          P15: "105.2",
          P25: "106.8",
          P50: 110,
          P75: "113.1",
          P85: "114.8",
          P90: "115.9",
          P95: "117.6",
          P97: "118.7",
          P99: "120.7",
          P999: "124.3",
        },
      },
      {
        name: 61,
        uid: "3968796314",
        values: {
          age: 61,
          P01: "94.851",
          P1: "98.498",
          P3: "100.624",
          P5: "101.75",
          P10: "103.485",
          P15: "104.655",
          P25: "106.382",
          P50: "109.602",
          P75: "112.821",
          P85: "114.549",
          P90: "115.719",
          P95: "117.453",
          P97: "118.579",
          P99: "120.706",
          P999: "124.352",
        },
      },
      {
        name: 62,
        uid: "1926228040",
        values: {
          age: 62,
          P01: "95.274",
          P1: "98.946",
          P3: "101.087",
          P5: "102.221",
          P10: "103.967",
          P15: "105.145",
          P25: "106.884",
          P50: "110.126",
          P75: "113.367",
          P85: "115.107",
          P90: "116.285",
          P95: "118.031",
          P97: "119.165",
          P99: "121.306",
          P999: "124.977",
        },
      },
      {
        name: 63,
        uid: "276734375",
        values: {
          age: 63,
          P01: "95.693",
          P1: "99.389",
          P3: "101.545",
          P5: "102.686",
          P10: "104.444",
          P15: "105.63",
          P25: "107.382",
          P50: "110.645",
          P75: "113.909",
          P85: "115.66",
          P90: "116.846",
          P95: "118.604",
          P97: "119.745",
          P99: "121.901",
          P999: "125.597",
        },
      },
      {
        name: 64,
        uid: "1935845972",
        values: {
          age: 64,
          P01: "96.107",
          P1: "99.828",
          P3: "101.998",
          P5: "103.147",
          P10: "104.917",
          P15: "106.111",
          P25: "107.874",
          P50: "111.16",
          P75: "114.445",
          P85: "116.208",
          P90: "117.402",
          P95: "119.172",
          P97: "120.321",
          P99: "122.491",
          P999: "126.212",
        },
      },
      {
        name: 65,
        uid: "2722387667",
        values: {
          age: 65,
          P01: "96.52",
          P1: "100.265",
          P3: "102.449",
          P5: "103.606",
          P10: "105.387",
          P15: "106.589",
          P25: "108.363",
          P50: "111.67",
          P75: "114.976",
          P85: "116.751",
          P90: "117.952",
          P95: "119.733",
          P97: "120.89",
          P99: "123.074",
          P999: "126.819",
        },
      },
      {
        name: 66,
        uid: "1801737758",
        values: {
          age: 66,
          P01: "96.926",
          P1: "100.696",
          P3: "102.894",
          P5: "104.059",
          P10: "105.851",
          P15: "107.061",
          P25: "108.847",
          P50: "112.175",
          P75: "115.504",
          P85: "117.29",
          P90: "118.499",
          P95: "120.292",
          P97: "121.456",
          P99: "123.655",
          P999: "127.424",
        },
      },
      {
        name: 67,
        uid: "3816341125",
        values: {
          age: 67,
          P01: "97.332",
          P1: "101.125",
          P3: "103.337",
          P5: "104.509",
          P10: "106.313",
          P15: "107.53",
          P25: "109.327",
          P50: "112.677",
          P75: "116.026",
          P85: "117.823",
          P90: "119.04",
          P95: "120.844",
          P97: "122.016",
          P99: "124.229",
          P999: "128.022",
        },
      },
      {
        name: 68,
        uid: "2299436138",
        values: {
          age: 68,
          P01: "97.733",
          P1: "101.55",
          P3: "103.776",
          P5: "104.955",
          P10: "106.771",
          P15: "107.995",
          P25: "109.804",
          P50: "113.174",
          P75: "116.544",
          P85: "118.353",
          P90: "119.577",
          P95: "121.393",
          P97: "122.572",
          P99: "124.798",
          P999: "128.615",
        },
      },
      {
        name: 69,
        uid: "4030610008",
        values: {
          age: 69,
          P01: "98.131",
          P1: "101.971",
          P3: "104.212",
          P5: "105.398",
          P10: "107.224",
          P15: "108.457",
          P25: "110.276",
          P50: "113.667",
          P75: "117.058",
          P85: "118.878",
          P90: "120.11",
          P95: "121.937",
          P97: "123.123",
          P99: "125.363",
          P999: "129.203",
        },
      },
      {
        name: 70,
        uid: "4271451318",
        values: {
          age: 70,
          P01: "98.525",
          P1: "102.389",
          P3: "104.643",
          P5: "105.836",
          P10: "107.674",
          P15: "108.914",
          P25: "110.745",
          P50: "114.156",
          P75: "117.568",
          P85: "119.399",
          P90: "120.639",
          P95: "122.477",
          P97: "123.67",
          P99: "125.924",
          P999: "129.788",
        },
      },
      {
        name: 71,
        uid: "975409861",
        values: {
          age: 71,
          P01: "98.916",
          P1: "102.803",
          P3: "105.071",
          P5: "106.272",
          P10: "108.12",
          P15: "109.368",
          P25: "111.21",
          P50: "114.642",
          P75: "118.075",
          P85: "119.916",
          P90: "121.164",
          P95: "123.013",
          P97: "124.213",
          P99: "126.481",
          P999: "130.368",
        },
      },
      {
        name: 72,
        uid: "2768087330",
        values: {
          age: 72,
          P01: "99.304",
          P1: "103.214",
          P3: "105.496",
          P5: "106.703",
          P10: "108.563",
          P15: "109.818",
          P25: "111.671",
          P50: "115.124",
          P75: "118.578",
          P85: "120.431",
          P90: "121.685",
          P95: "123.545",
          P97: "124.753",
          P99: "127.034",
          P999: "130.945",
        },
      },
      {
        name: 73,
        uid: "2649971862",
        values: {
          age: 73,
          P01: "99.692",
          P1: "103.626",
          P3: "105.92",
          P5: "107.135",
          P10: "109.005",
          P15: "110.267",
          P25: "112.131",
          P50: "115.604",
          P75: "119.077",
          P85: "120.94",
          P90: "122.203",
          P95: "124.073",
          P97: "125.288",
          P99: "127.582",
          P999: "131.515",
        },
      },
      {
        name: 74,
        uid: "2317805115",
        values: {
          age: 74,
          P01: "100.079",
          P1: "104.034",
          P3: "106.342",
          P5: "107.564",
          P10: "109.445",
          P15: "110.714",
          P25: "112.588",
          P50: "116.081",
          P75: "119.574",
          P85: "121.448",
          P90: "122.718",
          P95: "124.599",
          P97: "125.821",
          P99: "128.128",
          P999: "132.084",
        },
      },
      {
        name: 75,
        uid: "2987046175",
        values: {
          age: 75,
          P01: "100.46",
          P1: "104.439",
          P3: "106.76",
          P5: "107.989",
          P10: "109.881",
          P15: "111.158",
          P25: "113.043",
          P50: "116.557",
          P75: "120.07",
          P85: "121.956",
          P90: "123.232",
          P95: "125.125",
          P97: "126.354",
          P99: "128.675",
          P999: "132.654",
        },
      },
      {
        name: 76,
        uid: "3839387394",
        values: {
          age: 76,
          P01: "100.847",
          P1: "104.848",
          P3: "107.181",
          P5: "108.417",
          P10: "110.319",
          P15: "111.603",
          P25: "113.499",
          P50: "117.031",
          P75: "120.563",
          P85: "122.459",
          P90: "123.743",
          P95: "125.645",
          P97: "126.881",
          P99: "129.215",
          P999: "133.215",
        },
      },
      {
        name: 77,
        uid: "838665935",
        values: {
          age: 77,
          P01: "101.23",
          P1: "105.253",
          P3: "107.599",
          P5: "108.842",
          P10: "110.755",
          P15: "112.046",
          P25: "113.952",
          P50: "117.504",
          P75: "121.057",
          P85: "122.963",
          P90: "124.254",
          P95: "126.167",
          P97: "127.41",
          P99: "129.756",
          P999: "133.779",
        },
      },
      {
        name: 78,
        uid: "3604004576",
        values: {
          age: 78,
          P01: "101.611",
          P1: "105.657",
          P3: "108.016",
          P5: "109.266",
          P10: "111.19",
          P15: "112.488",
          P25: "114.405",
          P50: "117.977",
          P75: "121.549",
          P85: "123.466",
          P90: "124.764",
          P95: "126.688",
          P97: "127.938",
          P99: "130.297",
          P999: "134.343",
        },
      },
      {
        name: 79,
        uid: "4288201111",
        values: {
          age: 79,
          P01: "101.996",
          P1: "106.063",
          P3: "108.435",
          P5: "109.691",
          P10: "111.626",
          P15: "112.931",
          P25: "114.858",
          P50: "118.449",
          P75: "122.04",
          P85: "123.967",
          P90: "125.272",
          P95: "127.207",
          P97: "128.463",
          P99: "130.835",
          P999: "134.902",
        },
      },
      {
        name: 80,
        uid: "2590690822",
        values: {
          age: 80,
          P01: "102.376",
          P1: "106.466",
          P3: "108.851",
          P5: "110.115",
          P10: "112.06",
          P15: "113.372",
          P25: "115.31",
          P50: "118.921",
          P75: "122.532",
          P85: "124.47",
          P90: "125.782",
          P95: "127.727",
          P97: "128.99",
          P99: "131.376",
          P999: "135.465",
        },
      },
      {
        name: 81,
        uid: "661306056",
        values: {
          age: 81,
          P01: "102.76",
          P1: "106.872",
          P3: "109.27",
          P5: "110.54",
          P10: "112.495",
          P15: "113.814",
          P25: "115.762",
          P50: "119.393",
          P75: "123.023",
          P85: "124.971",
          P90: "126.29",
          P95: "128.246",
          P97: "129.515",
          P99: "131.914",
          P999: "136.025",
        },
      },
      {
        name: 82,
        uid: "1330435487",
        values: {
          age: 82,
          P01: "103.144",
          P1: "107.278",
          P3: "109.688",
          P5: "110.965",
          P10: "112.931",
          P15: "114.257",
          P25: "116.215",
          P50: "119.865",
          P75: "123.514",
          P85: "125.473",
          P90: "126.799",
          P95: "128.765",
          P97: "130.041",
          P99: "132.452",
          P999: "136.585",
        },
      },
      {
        name: 83,
        uid: "3856719168",
        values: {
          age: 83,
          P01: "103.529",
          P1: "107.684",
          P3: "110.107",
          P5: "111.391",
          P10: "113.367",
          P15: "114.7",
          P25: "116.669",
          P50: "120.337",
          P75: "124.006",
          P85: "125.975",
          P90: "127.308",
          P95: "129.284",
          P97: "130.568",
          P99: "132.991",
          P999: "137.146",
        },
      },
      {
        name: 84,
        uid: "29131266",
        values: {
          age: 84,
          P01: "103.917",
          P1: "108.093",
          P3: "110.529",
          P5: "111.819",
          P10: "113.805",
          P15: "115.145",
          P25: "117.123",
          P50: "120.81",
          P75: "124.498",
          P85: "126.476",
          P90: "127.816",
          P95: "129.802",
          P97: "131.092",
          P99: "133.528",
          P999: "137.704",
        },
      },
      {
        name: 85,
        uid: "3985664247",
        values: {
          age: 85,
          P01: "104.302",
          P1: "108.5",
          P3: "110.949",
          P5: "112.245",
          P10: "114.242",
          P15: "115.589",
          P25: "117.578",
          P50: "121.284",
          P75: "124.991",
          P85: "126.98",
          P90: "128.327",
          P95: "130.323",
          P97: "131.62",
          P99: "134.068",
          P999: "138.266",
        },
      },
      {
        name: 86,
        uid: "3048211084",
        values: {
          age: 86,
          P01: "104.691",
          P1: "108.91",
          P3: "111.371",
          P5: "112.674",
          P10: "114.681",
          P15: "116.035",
          P25: "118.034",
          P50: "121.759",
          P75: "125.484",
          P85: "127.483",
          P90: "128.837",
          P95: "130.843",
          P97: "132.146",
          P99: "134.607",
          P999: "138.826",
        },
      },
      {
        name: 87,
        uid: "110214633",
        values: {
          age: 87,
          P01: "105.077",
          P1: "109.318",
          P3: "111.792",
          P5: "113.102",
          P10: "115.119",
          P15: "116.48",
          P25: "118.489",
          P50: "122.234",
          P75: "125.978",
          P85: "127.988",
          P90: "129.349",
          P95: "131.366",
          P97: "132.676",
          P99: "135.149",
          P999: "139.39",
        },
      },
      {
        name: 88,
        uid: "574047370",
        values: {
          age: 88,
          P01: "105.467",
          P1: "109.73",
          P3: "112.216",
          P5: "113.532",
          P10: "115.559",
          P15: "116.927",
          P25: "118.946",
          P50: "122.71",
          P75: "126.473",
          P85: "128.493",
          P90: "129.86",
          P95: "131.887",
          P97: "133.204",
          P99: "135.69",
          P999: "139.952",
        },
      },
      {
        name: 89,
        uid: "1606933422",
        values: {
          age: 89,
          P01: "105.862",
          P1: "110.145",
          P3: "112.643",
          P5: "113.965",
          P10: "116.002",
          P15: "117.376",
          P25: "119.405",
          P50: "123.187",
          P75: "126.968",
          P85: "128.997",
          P90: "130.371",
          P95: "132.408",
          P97: "133.731",
          P99: "136.229",
          P999: "140.511",
        },
      },
      {
        name: 90,
        uid: "3441949055",
        values: {
          age: 90,
          P01: "106.254",
          P1: "110.558",
          P3: "113.068",
          P5: "114.397",
          P10: "116.444",
          P15: "117.825",
          P25: "119.864",
          P50: "123.665",
          P75: "127.465",
          P85: "129.504",
          P90: "130.885",
          P95: "132.932",
          P97: "134.261",
          P99: "136.772",
          P999: "141.075",
        },
      },
      {
        name: 91,
        uid: "3134682649",
        values: {
          age: 91,
          P01: "106.646",
          P1: "110.971",
          P3: "113.494",
          P5: "114.83",
          P10: "116.887",
          P15: "118.275",
          P25: "120.324",
          P50: "124.144",
          P75: "127.963",
          P85: "130.012",
          P90: "131.4",
          P95: "133.457",
          P97: "134.793",
          P99: "137.316",
          P999: "141.641",
        },
      },
      {
        name: 92,
        uid: "1977243054",
        values: {
          age: 92,
          P01: "107.043",
          P1: "111.389",
          P3: "113.923",
          P5: "115.266",
          P10: "117.333",
          P15: "118.727",
          P25: "120.786",
          P50: "124.623",
          P75: "128.461",
          P85: "130.52",
          P90: "131.914",
          P95: "133.981",
          P97: "135.323",
          P99: "137.858",
          P999: "142.204",
        },
      },
      {
        name: 93,
        uid: "2292899005",
        values: {
          age: 93,
          P01: "107.441",
          P1: "111.807",
          P3: "114.354",
          P5: "115.702",
          P10: "117.779",
          P15: "119.18",
          P25: "121.249",
          P50: "125.104",
          P75: "128.96",
          P85: "131.029",
          P90: "132.43",
          P95: "134.507",
          P97: "135.855",
          P99: "138.402",
          P999: "142.768",
        },
      },
      {
        name: 94,
        uid: "2783376787",
        values: {
          age: 94,
          P01: "107.839",
          P1: "112.226",
          P3: "114.785",
          P5: "116.14",
          P10: "118.227",
          P15: "119.635",
          P25: "121.713",
          P50: "125.587",
          P75: "129.461",
          P85: "131.539",
          P90: "132.947",
          P95: "135.033",
          P97: "136.388",
          P99: "138.947",
          P999: "143.334",
        },
      },
      {
        name: 95,
        uid: "375939122",
        values: {
          age: 95,
          P01: "108.239",
          P1: "112.647",
          P3: "115.218",
          P5: "116.579",
          P10: "118.676",
          P15: "120.09",
          P25: "122.179",
          P50: "126.071",
          P75: "129.963",
          P85: "132.051",
          P90: "133.465",
          P95: "135.562",
          P97: "136.923",
          P99: "139.494",
          P999: "143.902",
        },
      },
      {
        name: 96,
        uid: "2100455971",
        values: {
          age: 96,
          P01: "108.64",
          P1: "113.069",
          P3: "115.652",
          P5: "117.02",
          P10: "119.126",
          P15: "120.547",
          P25: "122.645",
          P50: "126.556",
          P75: "130.466",
          P85: "132.565",
          P90: "133.986",
          P95: "136.092",
          P97: "137.46",
          P99: "140.043",
          P999: "144.471",
        },
      },
      {
        name: 97,
        uid: "2020133764",
        values: {
          age: 97,
          P01: "109.042",
          P1: "113.492",
          P3: "116.087",
          P5: "117.461",
          P10: "119.577",
          P15: "121.005",
          P25: "123.114",
          P50: "127.042",
          P75: "130.971",
          P85: "133.08",
          P90: "134.507",
          P95: "136.623",
          P97: "137.998",
          P99: "140.593",
          P999: "145.043",
        },
      },
      {
        name: 98,
        uid: "701015530",
        values: {
          age: 98,
          P01: "109.449",
          P1: "113.919",
          P3: "116.526",
          P5: "117.906",
          P10: "120.032",
          P15: "121.466",
          P25: "123.584",
          P50: "127.53",
          P75: "131.477",
          P85: "133.595",
          P90: "135.029",
          P95: "137.155",
          P97: "138.535",
          P99: "141.142",
          P999: "145.612",
        },
      },
      {
        name: 99,
        uid: "2653791429",
        values: {
          age: 99,
          P01: "109.857",
          P1: "114.347",
          P3: "116.966",
          P5: "118.352",
          P10: "120.488",
          P15: "121.928",
          P25: "124.056",
          P50: "128.02",
          P75: "131.984",
          P85: "134.111",
          P90: "135.552",
          P95: "137.687",
          P97: "139.074",
          P99: "141.693",
          P999: "146.182",
        },
      },
      {
        name: 100,
        uid: "4253640637",
        values: {
          age: 100,
          P01: "110.267",
          P1: "114.777",
          P3: "117.407",
          P5: "118.8",
          P10: "120.945",
          P15: "122.392",
          P25: "124.529",
          P50: "128.511",
          P75: "132.493",
          P85: "134.63",
          P90: "136.077",
          P95: "138.222",
          P97: "139.615",
          P99: "142.245",
          P999: "146.755",
        },
      },
      {
        name: 101,
        uid: "4210049726",
        values: {
          age: 101,
          P01: "110.678",
          P1: "115.208",
          P3: "117.85",
          P5: "119.249",
          P10: "121.404",
          P15: "122.857",
          P25: "125.004",
          P50: "129.004",
          P75: "133.003",
          P85: "135.15",
          P90: "136.603",
          P95: "138.758",
          P97: "140.157",
          P99: "142.799",
          P999: "147.329",
        },
      },
      {
        name: 102,
        uid: "235972243",
        values: {
          age: 102,
          P01: "111.089",
          P1: "115.64",
          P3: "118.294",
          P5: "119.699",
          P10: "121.863",
          P15: "123.324",
          P25: "125.48",
          P50: "129.498",
          P75: "133.515",
          P85: "135.671",
          P90: "137.132",
          P95: "139.296",
          P97: "140.701",
          P99: "143.355",
          P999: "147.906",
        },
      },
      {
        name: 103,
        uid: "1157942180",
        values: {
          age: 103,
          P01: "111.507",
          P1: "116.076",
          P3: "118.742",
          P5: "120.153",
          P10: "122.327",
          P15: "123.793",
          P25: "125.958",
          P50: "129.993",
          P75: "134.028",
          P85: "136.193",
          P90: "137.66",
          P95: "139.833",
          P97: "141.245",
          P99: "143.91",
          P999: "148.48",
        },
      },
      {
        name: 104,
        uid: "3405265845",
        values: {
          age: 104,
          P01: "111.925",
          P1: "116.514",
          P3: "119.191",
          P5: "120.608",
          P10: "122.791",
          P15: "124.264",
          P25: "126.438",
          P50: "130.49",
          P75: "134.543",
          P85: "136.717",
          P90: "138.19",
          P95: "140.372",
          P97: "141.79",
          P99: "144.467",
          P999: "149.056",
        },
      },
      {
        name: 105,
        uid: "665405026",
        values: {
          age: 105,
          P01: "112.341",
          P1: "116.95",
          P3: "119.639",
          P5: "121.063",
          P10: "123.255",
          P15: "124.735",
          P25: "126.919",
          P50: "130.989",
          P75: "135.059",
          P85: "137.244",
          P90: "138.723",
          P95: "140.915",
          P97: "142.339",
          P99: "145.028",
          P999: "149.638",
        },
      },
      {
        name: 106,
        uid: "896393632",
        values: {
          age: 106,
          P01: "112.766",
          P1: "117.394",
          P3: "120.094",
          P5: "121.523",
          P10: "123.725",
          P15: "125.21",
          P25: "127.403",
          P50: "131.49",
          P75: "135.576",
          P85: "137.769",
          P90: "139.254",
          P95: "141.456",
          P97: "142.885",
          P99: "145.585",
          P999: "150.213",
        },
      },
      {
        name: 107,
        uid: "2008885367",
        values: {
          age: 107,
          P01: "113.188",
          P1: "117.836",
          P3: "120.547",
          P5: "121.983",
          P10: "124.193",
          P15: "125.685",
          P25: "127.887",
          P50: "131.991",
          P75: "136.095",
          P85: "138.298",
          P90: "139.789",
          P95: 142,
          P97: "143.435",
          P99: "146.147",
          P999: "150.795",
        },
      },
      {
        name: 108,
        uid: "3342909536",
        values: {
          age: 108,
          P01: "113.611",
          P1: "118.279",
          P3: "121.002",
          P5: "122.443",
          P10: "124.663",
          P15: "126.161",
          P25: "128.373",
          P50: "132.494",
          P75: "136.616",
          P85: "138.828",
          P90: "140.326",
          P95: "142.546",
          P97: "143.987",
          P99: "146.71",
          P999: "151.378",
        },
      },
      {
        name: 109,
        uid: "4284483256",
        values: {
          age: 109,
          P01: "114.04",
          P1: "118.726",
          P3: "121.46",
          P5: "122.907",
          P10: "125.136",
          P15: "126.64",
          P25: "128.861",
          P50: "132.999",
          P75: "137.137",
          P85: "139.358",
          P90: "140.862",
          P95: "143.09",
          P97: "144.538",
          P99: "147.272",
          P999: "151.958",
        },
      },
      {
        name: 110,
        uid: "961487787",
        values: {
          age: 110,
          P01: "114.469",
          P1: "119.175",
          P3: "121.919",
          P5: "123.372",
          P10: "125.61",
          P15: "127.12",
          P25: "129.35",
          P50: "133.505",
          P75: "137.659",
          P85: "139.889",
          P90: "141.399",
          P95: "143.637",
          P97: "145.09",
          P99: "147.835",
          P999: "152.54",
        },
      },
      {
        name: 111,
        uid: "2375108930",
        values: {
          age: 111,
          P01: "114.9",
          P1: "119.624",
          P3: "122.38",
          P5: "123.839",
          P10: "126.086",
          P15: "127.602",
          P25: "129.84",
          P50: "134.012",
          P75: "138.183",
          P85: "140.422",
          P90: "141.938",
          P95: "144.185",
          P97: "145.644",
          P99: "148.399",
          P999: "153.124",
        },
      },
      {
        name: 112,
        uid: "748591566",
        values: {
          age: 112,
          P01: "115.332",
          P1: "120.075",
          P3: "122.842",
          P5: "124.307",
          P10: "126.562",
          P15: "128.085",
          P25: "130.332",
          P50: "134.52",
          P75: "138.708",
          P85: "140.956",
          P90: "142.478",
          P95: "144.734",
          P97: "146.199",
          P99: "148.966",
          P999: "153.709",
        },
      },
      {
        name: 113,
        uid: "441365422",
        values: {
          age: 113,
          P01: "115.769",
          P1: "120.53",
          P3: "123.307",
          P5: "124.778",
          P10: "127.042",
          P15: "128.57",
          P25: "130.826",
          P50: "135.03",
          P75: "139.234",
          P85: "141.49",
          P90: "143.018",
          P95: "145.282",
          P97: "146.753",
          P99: "149.53",
          P999: "154.291",
        },
      },
      {
        name: 114,
        uid: "2224665166",
        values: {
          age: 114,
          P01: "116.203",
          P1: "120.983",
          P3: "123.771",
          P5: "125.248",
          P10: "127.521",
          P15: "129.055",
          P25: "131.32",
          P50: "135.541",
          P75: "139.762",
          P85: "142.027",
          P90: "143.561",
          P95: "145.834",
          P97: "147.311",
          P99: "150.099",
          P999: "154.879",
        },
      },
      {
        name: 115,
        uid: "3065071094",
        values: {
          age: 115,
          P01: "116.642",
          P1: "121.44",
          P3: "124.239",
          P5: "125.721",
          P10: "128.003",
          P15: "129.543",
          P25: "131.816",
          P50: "136.053",
          P75: "140.29",
          P85: "142.564",
          P90: "144.103",
          P95: "146.386",
          P97: "147.868",
          P99: "150.666",
          P999: "155.465",
        },
      },
      {
        name: 116,
        uid: "1949369109",
        values: {
          age: 116,
          P01: "117.086",
          P1: "121.902",
          P3: "124.711",
          P5: "126.198",
          P10: "128.488",
          P15: "130.033",
          P25: "132.315",
          P50: "136.567",
          P75: "140.819",
          P85: "143.101",
          P90: "144.646",
          P95: "146.936",
          P97: "148.423",
          P99: "151.232",
          P999: "156.048",
        },
      },
      {
        name: 117,
        uid: "4271350892",
        values: {
          age: 117,
          P01: "117.528",
          P1: "122.362",
          P3: "125.181",
          P5: "126.674",
          P10: "128.973",
          P15: "130.524",
          P25: "132.814",
          P50: "137.082",
          P75: "141.35",
          P85: "143.64",
          P90: "145.191",
          P95: "147.49",
          P97: "148.983",
          P99: "151.803",
          P999: "156.636",
        },
      },
      {
        name: 118,
        uid: "579455541",
        values: {
          age: 118,
          P01: "117.971",
          P1: "122.823",
          P3: "125.653",
          P5: "127.151",
          P10: "129.459",
          P15: "131.016",
          P25: "133.315",
          P50: "137.599",
          P75: "141.883",
          P85: "144.182",
          P90: "145.739",
          P95: "148.046",
          P97: "149.545",
          P99: "152.375",
          P999: "157.226",
        },
      },
      {
        name: 119,
        uid: "3714037045",
        values: {
          age: 119,
          P01: "118.419",
          P1: "123.288",
          P3: "126.128",
          P5: "127.632",
          P10: "129.948",
          P15: "131.51",
          P25: "133.817",
          P50: "138.117",
          P75: "142.416",
          P85: "144.723",
          P90: "146.285",
          P95: "148.601",
          P97: "150.105",
          P99: "152.945",
          P999: "157.814",
        },
      },
      {
        name: 120,
        uid: "3680569762",
        values: {
          age: 120,
          P01: "118.869",
          P1: "123.755",
          P3: "126.605",
          P5: "128.115",
          P10: "130.439",
          P15: "132.007",
          P25: "134.322",
          P50: "138.636",
          P75: "142.951",
          P85: "145.266",
          P90: "146.834",
          P95: "149.158",
          P97: "150.667",
          P99: "153.517",
          P999: "158.404",
        },
      },
      {
        name: 121,
        uid: "1259939703",
        values: {
          age: 121,
          P01: "119.325",
          P1: "124.227",
          P3: "127.087",
          P5: "128.601",
          P10: "130.933",
          P15: "132.506",
          P25: "134.829",
          P50: "139.158",
          P75: "143.486",
          P85: "145.809",
          P90: "147.382",
          P95: "149.714",
          P97: "151.228",
          P99: "154.088",
          P999: "158.99",
        },
      },
      {
        name: 122,
        uid: "4249505179",
        values: {
          age: 122,
          P01: "119.777",
          P1: "124.697",
          P3: "127.567",
          P5: "129.086",
          P10: "131.426",
          P15: "133.005",
          P25: "135.336",
          P50: "139.68",
          P75: "144.024",
          P85: "146.356",
          P90: "147.934",
          P95: "150.274",
          P97: "151.794",
          P99: "154.664",
          P999: "159.583",
        },
      },
      {
        name: 123,
        uid: "2825003937",
        values: {
          age: 123,
          P01: "120.236",
          P1: "125.172",
          P3: "128.051",
          P5: "129.576",
          P10: "131.923",
          P15: "133.507",
          P25: "135.846",
          P50: "140.205",
          P75: "144.563",
          P85: "146.902",
          P90: "148.486",
          P95: "150.834",
          P97: "152.359",
          P99: "155.238",
          P999: "160.174",
        },
      },
      {
        name: 124,
        uid: "1101631835",
        values: {
          age: 124,
          P01: "120.696",
          P1: "125.648",
          P3: "128.537",
          P5: "130.067",
          P10: "132.422",
          P15: "134.012",
          P25: "136.358",
          P50: "140.731",
          P75: "145.104",
          P85: "147.451",
          P90: "149.04",
          P95: "151.396",
          P97: "152.925",
          P99: "155.814",
          P999: "160.767",
        },
      },
      {
        name: 125,
        uid: "1651618125",
        values: {
          age: 125,
          P01: "121.157",
          P1: "126.127",
          P3: "129.025",
          P5: "130.56",
          P10: "132.923",
          P15: "134.517",
          P25: "136.872",
          P50: "141.259",
          P75: "145.647",
          P85: "148.001",
          P90: "149.596",
          P95: "151.959",
          P97: "153.494",
          P99: "156.392",
          P999: "161.361",
        },
      },
      {
        name: 126,
        uid: "1269441904",
        values: {
          age: 126,
          P01: "121.621",
          P1: "126.606",
          P3: "129.514",
          P5: "131.054",
          P10: "133.425",
          P15: "135.025",
          P25: "137.387",
          P50: "141.789",
          P75: "146.191",
          P85: "148.554",
          P90: "150.153",
          P95: "152.524",
          P97: "154.064",
          P99: "156.972",
          P999: "161.958",
        },
      },
      {
        name: 127,
        uid: "1382264475",
        values: {
          age: 127,
          P01: "122.09",
          P1: "127.091",
          P3: "130.008",
          P5: "131.552",
          P10: "133.931",
          P15: "135.535",
          P25: "137.905",
          P50: "142.321",
          P75: "146.736",
          P85: "149.106",
          P90: "150.711",
          P95: "153.089",
          P97: "154.634",
          P99: "157.551",
          P999: "162.552",
        },
      },
      {
        name: 128,
        uid: "2565375047",
        values: {
          age: 128,
          P01: "122.56",
          P1: "127.576",
          P3: "130.502",
          P5: "132.052",
          P10: "134.437",
          P15: "136.047",
          P25: "138.424",
          P50: "142.853",
          P75: "147.283",
          P85: "149.66",
          P90: "151.269",
          P95: "153.655",
          P97: "155.205",
          P99: "158.13",
          P999: "163.147",
        },
      },
      {
        name: 129,
        uid: "4113192923",
        values: {
          age: 129,
          P01: "123.031",
          P1: "128.063",
          P3: "130.998",
          P5: "132.552",
          P10: "134.946",
          P15: "136.56",
          P25: "138.944",
          P50: "143.387",
          P75: "147.83",
          P85: "150.215",
          P90: "151.829",
          P95: "154.222",
          P97: "155.777",
          P99: "158.712",
          P999: "163.743",
        },
      },
      {
        name: 130,
        uid: "732554308",
        values: {
          age: 130,
          P01: "123.504",
          P1: "128.551",
          P3: "131.495",
          P5: "133.054",
          P10: "135.454",
          P15: "137.074",
          P25: "139.466",
          P50: "143.922",
          P75: "148.379",
          P85: "150.77",
          P90: "152.39",
          P95: "154.791",
          P97: "156.349",
          P99: "159.293",
          P999: "164.341",
        },
      },
      {
        name: 131,
        uid: "2188387991",
        values: {
          age: 131,
          P01: "123.976",
          P1: "129.039",
          P3: "131.992",
          P5: "133.556",
          P10: "135.964",
          P15: "137.588",
          P25: "139.987",
          P50: "144.458",
          P75: "148.928",
          P85: "151.327",
          P90: "152.951",
          P95: "155.359",
          P97: "156.923",
          P99: "159.876",
          P999: "164.939",
        },
      },
      {
        name: 132,
        uid: "605831249",
        values: {
          age: 132,
          P01: "124.454",
          P1: "129.531",
          P3: "132.492",
          P5: "134.06",
          P10: "136.475",
          P15: "138.104",
          P25: "140.51",
          P50: "144.993",
          P75: "149.476",
          P85: "151.882",
          P90: "153.511",
          P95: "155.925",
          P97: "157.494",
          P99: "160.455",
          P999: "165.532",
        },
      },
      {
        name: 133,
        uid: "1162492173",
        values: {
          age: 133,
          P01: "124.931",
          P1: "130.022",
          P3: "132.992",
          P5: "134.565",
          P10: "136.986",
          P15: "138.62",
          P25: "141.032",
          P50: "145.528",
          P75: "150.024",
          P85: "152.436",
          P90: "154.07",
          P95: "156.491",
          P97: "158.064",
          P99: "161.034",
          P999: "166.125",
        },
      },
      {
        name: 134,
        uid: "4172267192",
        values: {
          age: 134,
          P01: "125.408",
          P1: "130.513",
          P3: "133.491",
          P5: "135.068",
          P10: "137.497",
          P15: "139.135",
          P25: "141.554",
          P50: "146.062",
          P75: "150.57",
          P85: "152.99",
          P90: "154.628",
          P95: "157.056",
          P97: "158.633",
          P99: "161.611",
          P999: "166.717",
        },
      },
      {
        name: 135,
        uid: "3402045358",
        values: {
          age: 135,
          P01: "125.888",
          P1: "131.007",
          P3: "133.992",
          P5: "135.573",
          P10: "138.008",
          P15: "139.65",
          P25: "142.075",
          P50: "146.595",
          P75: "151.115",
          P85: "153.54",
          P90: "155.183",
          P95: "157.617",
          P97: "159.198",
          P99: "162.184",
          P999: "167.302",
        },
      },
      {
        name: 136,
        uid: "2294822336",
        values: {
          age: 136,
          P01: "126.362",
          P1: "131.495",
          P3: "134.489",
          P5: "136.074",
          P10: "138.515",
          P15: "140.162",
          P25: "142.594",
          P50: "147.126",
          P75: "151.658",
          P85: "154.09",
          P90: "155.737",
          P95: "158.178",
          P97: "159.764",
          P99: "162.758",
          P999: "167.89",
        },
      },
      {
        name: 137,
        uid: "3593258071",
        values: {
          age: 137,
          P01: "126.839",
          P1: "131.984",
          P3: "134.986",
          P5: "136.575",
          P10: "139.022",
          P15: "140.673",
          P25: "143.111",
          P50: "147.655",
          P75: "152.198",
          P85: "154.636",
          P90: "156.287",
          P95: "158.735",
          P97: "160.324",
          P99: "163.325",
          P999: "168.471",
        },
      },
      {
        name: 138,
        uid: "1175695338",
        values: {
          age: 138,
          P01: "127.313",
          P1: "132.472",
          P3: "135.48",
          P5: "137.073",
          P10: "139.527",
          P15: "141.182",
          P25: "143.626",
          P50: "148.18",
          P75: "152.735",
          P85: "155.179",
          P90: "156.834",
          P95: "159.287",
          P97: "160.881",
          P99: "163.889",
          P999: "169.047",
        },
      },
      {
        name: 139,
        uid: "1747060025",
        values: {
          age: 139,
          P01: "127.785",
          P1: "132.955",
          P3: "135.971",
          P5: "137.568",
          P10: "140.028",
          P15: "141.687",
          P25: "144.137",
          P50: "148.702",
          P75: "153.268",
          P85: "155.718",
          P90: "157.377",
          P95: "159.836",
          P97: "161.433",
          P99: "164.449",
          P999: "169.62",
        },
      },
      {
        name: 140,
        uid: "845391807",
        values: {
          age: 140,
          P01: "128.257",
          P1: "133.439",
          P3: "136.461",
          P5: "138.062",
          P10: "140.526",
          P15: "142.189",
          P25: "144.644",
          P50: "149.22",
          P75: "153.795",
          P85: "156.25",
          P90: "157.913",
          P95: "160.378",
          P97: "161.978",
          P99: "165.001",
          P999: "170.182",
        },
      },
      {
        name: 141,
        uid: "4129363247",
        values: {
          age: 141,
          P01: "128.721",
          P1: "133.915",
          P3: "136.944",
          P5: "138.548",
          P10: "141.018",
          P15: "142.685",
          P25: "145.146",
          P50: "149.732",
          P75: "154.318",
          P85: "156.779",
          P90: "158.446",
          P95: "160.916",
          P97: "162.52",
          P99: "165.55",
          P999: "170.744",
        },
      },
      {
        name: 142,
        uid: "2887641460",
        values: {
          age: 142,
          P01: "129.184",
          P1: "134.389",
          P3: "137.425",
          P5: "139.032",
          P10: "141.507",
          P15: "143.177",
          P25: "145.643",
          P50: "150.239",
          P75: "154.835",
          P85: "157.301",
          P90: "158.971",
          P95: "161.446",
          P97: "163.053",
          P99: "166.089",
          P999: "171.294",
        },
      },
      {
        name: 143,
        uid: "187161073",
        values: {
          age: 143,
          P01: "129.642",
          P1: "134.857",
          P3: "137.899",
          P5: "139.51",
          P10: "141.99",
          P15: "143.664",
          P25: "146.135",
          P50: "150.739",
          P75: "155.344",
          P85: "157.815",
          P90: "159.489",
          P95: "161.969",
          P97: "163.58",
          P99: "166.621",
          P999: "171.836",
        },
      },
      {
        name: 144,
        uid: "2446965742",
        values: {
          age: 144,
          P01: "130.095",
          P1: "135.32",
          P3: "138.368",
          P5: "139.981",
          P10: "142.467",
          P15: "144.143",
          P25: "146.619",
          P50: "151.233",
          P75: "155.846",
          P85: "158.322",
          P90: "159.999",
          P95: "162.484",
          P97: "164.098",
          P99: "167.146",
          P999: "172.371",
        },
      },
      {
        name: 145,
        uid: "1591309892",
        values: {
          age: 145,
          P01: "130.545",
          P1: "135.779",
          P3: "138.832",
          P5: "140.448",
          P10: "142.938",
          P15: "144.617",
          P25: "147.097",
          P50: "151.718",
          P75: "156.34",
          P85: "158.819",
          P90: "160.499",
          P95: "162.988",
          P97: "164.605",
          P99: "167.657",
          P999: "172.891",
        },
      },
      {
        name: 146,
        uid: "43489725",
        values: {
          age: 146,
          P01: "130.984",
          P1: "136.227",
          P3: "139.285",
          P5: "140.905",
          P10: "143.399",
          P15: "145.081",
          P25: "147.565",
          P50: "152.195",
          P75: "156.825",
          P85: "159.309",
          P90: "160.992",
          P95: "163.485",
          P97: "165.105",
          P99: "168.163",
          P999: "173.406",
        },
      },
      {
        name: 147,
        uid: "1327634788",
        values: {
          age: 147,
          P01: "131.419",
          P1: "136.671",
          P3: "139.733",
          P5: "141.355",
          P10: "143.853",
          P15: "145.538",
          P25: "148.026",
          P50: "152.663",
          P75: "157.3",
          P85: "159.788",
          P90: "161.473",
          P95: "163.97",
          P97: "165.592",
          P99: "168.655",
          P999: "173.906",
        },
      },
      {
        name: 148,
        uid: "3198890813",
        values: {
          age: 148,
          P01: "131.842",
          P1: "137.102",
          P3: "140.17",
          P5: "141.794",
          P10: "144.296",
          P15: "145.984",
          P25: "148.476",
          P50: "153.121",
          P75: "157.765",
          P85: "160.257",
          P90: "161.945",
          P95: "164.447",
          P97: "166.071",
          P99: "169.139",
          P999: "174.399",
        },
      },
      {
        name: 149,
        uid: "3744078175",
        values: {
          age: 149,
          P01: "132.26",
          P1: "137.527",
          P3: "140.599",
          P5: "142.226",
          P10: "144.731",
          P15: "146.421",
          P25: "148.917",
          P50: "153.568",
          P75: "158.219",
          P85: "160.714",
          P90: "162.404",
          P95: "164.909",
          P97: "166.536",
          P99: "169.608",
          P999: "174.876",
        },
      },
      {
        name: 150,
        uid: "4148094079",
        values: {
          age: 150,
          P01: "132.669",
          P1: "137.943",
          P3: "141.019",
          P5: "142.648",
          P10: "145.156",
          P15: "146.849",
          P25: "149.347",
          P50: "154.004",
          P75: "158.661",
          P85: "161.16",
          P90: "162.852",
          P95: "165.36",
          P97: "166.989",
          P99: "170.065",
          P999: "175.339",
        },
      },
      {
        name: 151,
        uid: "1221654597",
        values: {
          age: 151,
          P01: "133.069",
          P1: "138.349",
          P3: "141.428",
          P5: "143.059",
          P10: "145.571",
          P15: "147.265",
          P25: "149.767",
          P50: "154.429",
          P75: "159.091",
          P85: "161.593",
          P90: "163.287",
          P95: "165.799",
          P97: "167.43",
          P99: "170.509",
          P999: "175.789",
        },
      },
      {
        name: 152,
        uid: "1940742844",
        values: {
          age: 152,
          P01: "133.463",
          P1: "138.748",
          P3: "141.83",
          P5: "143.463",
          P10: "145.976",
          P15: "147.672",
          P25: "150.176",
          P50: "154.842",
          P75: "159.509",
          P85: "162.013",
          P90: "163.709",
          P95: "166.222",
          P97: "167.854",
          P99: "170.937",
          P999: "176.222",
        },
      },
      {
        name: 153,
        uid: "2228871445",
        values: {
          age: 153,
          P01: "133.843",
          P1: "139.133",
          P3: "142.218",
          P5: "143.852",
          P10: "146.368",
          P15: "148.066",
          P25: "150.573",
          P50: "155.244",
          P75: "159.915",
          P85: "162.421",
          P90: "164.119",
          P95: "166.635",
          P97: "168.269",
          P99: "171.355",
          P999: "176.645",
        },
      },
      {
        name: 154,
        uid: "1931102725",
        values: {
          age: 154,
          P01: "134.212",
          P1: "139.507",
          P3: "142.596",
          P5: "144.231",
          P10: "146.749",
          P15: "148.449",
          P25: "150.958",
          P50: "155.633",
          P75: "160.308",
          P85: "162.817",
          P90: "164.517",
          P95: "167.035",
          P97: "168.67",
          P99: "171.759",
          P999: "177.054",
        },
      },
      {
        name: 155,
        uid: "3891889879",
        values: {
          age: 155,
          P01: "134.576",
          P1: "139.874",
          P3: "142.965",
          P5: "144.601",
          P10: "147.121",
          P15: "148.821",
          P25: "151.332",
          P50: "156.01",
          P75: "160.689",
          P85: "163.199",
          P90: "164.899",
          P95: "167.419",
          P97: "169.056",
          P99: "172.146",
          P999: "177.445",
        },
      },
      {
        name: 156,
        uid: "1077532422",
        values: {
          age: 156,
          P01: "134.924",
          P1: "140.227",
          P3: "143.319",
          P5: "144.957",
          P10: "147.479",
          P15: "149.18",
          P25: "151.693",
          P50: "156.375",
          P75: "161.057",
          P85: "163.569",
          P90: "165.271",
          P95: "167.793",
          P97: "169.43",
          P99: "172.523",
          P999: "177.826",
        },
      },
      {
        name: 157,
        uid: "2759846483",
        values: {
          age: 157,
          P01: "135.267",
          P1: "140.571",
          P3: "143.666",
          P5: "145.304",
          P10: "147.827",
          P15: "149.529",
          P25: "152.043",
          P50: "156.727",
          P75: "161.411",
          P85: "163.924",
          P90: "165.627",
          P95: "168.15",
          P97: "169.788",
          P99: "172.882",
          P999: "178.187",
        },
      },
      {
        name: 158,
        uid: "733135620",
        values: {
          age: 158,
          P01: "135.599",
          P1: "140.905",
          P3: "144.001",
          P5: "145.64",
          P10: "148.164",
          P15: "149.866",
          P25: "152.381",
          P50: "157.067",
          P75: "161.752",
          P85: "164.267",
          P90: "165.97",
          P95: "168.493",
          P97: "170.133",
          P99: "173.228",
          P999: "178.535",
        },
      },
      {
        name: 159,
        uid: "1844233434",
        values: {
          age: 159,
          P01: "135.92",
          P1: "141.228",
          P3: "144.324",
          P5: "145.964",
          P10: "148.488",
          P15: "150.191",
          P25: "152.707",
          P50: "157.394",
          P75: "162.081",
          P85: "164.596",
          P90: "166.299",
          P95: "168.824",
          P97: "170.463",
          P99: "173.559",
          P999: "178.867",
        },
      },
      {
        name: 160,
        uid: "4197343225",
        values: {
          age: 160,
          P01: "136.226",
          P1: "141.536",
          P3: "144.633",
          P5: "146.274",
          P10: "148.799",
          P15: "150.503",
          P25: "153.019",
          P50: "157.708",
          P75: "162.397",
          P85: "164.913",
          P90: "166.617",
          P95: "169.143",
          P97: "170.783",
          P99: "173.88",
          P999: "179.191",
        },
      },
      {
        name: 161,
        uid: "4014774874",
        values: {
          age: 161,
          P01: "136.526",
          P1: "141.836",
          P3: "144.934",
          P5: "146.574",
          P10: "149.1",
          P15: "150.804",
          P25: "153.321",
          P50: "158.01",
          P75: "162.7",
          P85: "165.216",
          P90: "166.92",
          P95: "169.446",
          P97: "171.086",
          P99: "174.184",
          P999: "179.495",
        },
      },
      {
        name: 162,
        uid: "4047542558",
        values: {
          age: 162,
          P01: "136.815",
          P1: "142.126",
          P3: "145.223",
          P5: "146.864",
          P10: "149.39",
          P15: "151.094",
          P25: "153.61",
          P50: "158.3",
          P75: "162.989",
          P85: "165.506",
          P90: "167.21",
          P95: "169.736",
          P97: "171.376",
          P99: "174.474",
          P999: "179.785",
        },
      },
      {
        name: 163,
        uid: "106257909",
        values: {
          age: 163,
          P01: "137.094",
          P1: "142.404",
          P3: "145.502",
          P5: "147.142",
          P10: "149.668",
          P15: "151.372",
          P25: "153.888",
          P50: "158.577",
          P75: "163.266",
          P85: "165.782",
          P90: "167.486",
          P95: "170.012",
          P97: "171.652",
          P99: "174.75",
          P999: "180.06",
        },
      },
      {
        name: 164,
        uid: "2523502217",
        values: {
          age: 164,
          P01: "137.362",
          P1: "142.672",
          P3: "145.769",
          P5: "147.409",
          P10: "149.935",
          P15: "151.638",
          P25: "154.154",
          P50: "158.842",
          P75: "163.531",
          P85: "166.047",
          P90: "167.75",
          P95: "170.276",
          P97: "171.916",
          P99: "175.013",
          P999: "180.323",
        },
      },
      {
        name: 165,
        uid: "1964351237",
        values: {
          age: 165,
          P01: "137.616",
          P1: "142.926",
          P3: "146.023",
          P5: "147.663",
          P10: "150.188",
          P15: "151.892",
          P25: "154.408",
          P50: "159.096",
          P75: "163.784",
          P85: "166.3",
          P90: "168.004",
          P95: "170.529",
          P97: "172.169",
          P99: "175.266",
          P999: "180.576",
        },
      },
      {
        name: 166,
        uid: "270629889",
        values: {
          age: 166,
          P01: "137.865",
          P1: "143.173",
          P3: "146.269",
          P5: "147.909",
          P10: "150.433",
          P15: "152.136",
          P25: "154.651",
          P50: "159.338",
          P75: "164.025",
          P85: "166.54",
          P90: "168.243",
          P95: "170.768",
          P97: "172.407",
          P99: "175.503",
          P999: "180.811",
        },
      },
      {
        name: 167,
        uid: "780913863",
        values: {
          age: 167,
          P01: "138.104",
          P1: "143.41",
          P3: "146.505",
          P5: "148.144",
          P10: "150.667",
          P15: "152.37",
          P25: "154.884",
          P50: "159.569",
          P75: "164.254",
          P85: "166.768",
          P90: "168.471",
          P95: "170.994",
          P97: "172.633",
          P99: "175.728",
          P999: "181.034",
        },
      },
      {
        name: 168,
        uid: "1382052324",
        values: {
          age: 168,
          P01: "138.334",
          P1: "143.638",
          P3: "146.731",
          P5: "148.369",
          P10: "150.891",
          P15: "152.593",
          P25: "155.106",
          P50: "159.789",
          P75: "164.472",
          P85: "166.985",
          P90: "168.687",
          P95: "171.209",
          P97: "172.847",
          P99: "175.94",
          P999: "181.244",
        },
      },
      {
        name: 169,
        uid: "4233914812",
        values: {
          age: 169,
          P01: "138.555",
          P1: "143.855",
          P3: "146.947",
          P5: "148.584",
          P10: "151.105",
          P15: "152.806",
          P25: "155.318",
          P50: "159.998",
          P75: "164.679",
          P85: "167.19",
          P90: "168.891",
          P95: "171.412",
          P97: "173.049",
          P99: "176.141",
          P999: "181.442",
        },
      },
      {
        name: 170,
        uid: "1955243579",
        values: {
          age: 170,
          P01: "138.762",
          P1: "144.06",
          P3: "147.151",
          P5: "148.788",
          P10: "151.308",
          P15: "153.008",
          P25: "155.518",
          P50: "160.197",
          P75: "164.876",
          P85: "167.386",
          P90: "169.087",
          P95: "171.607",
          P97: "173.243",
          P99: "176.334",
          P999: "181.633",
        },
      },
      {
        name: 171,
        uid: "3975149856",
        values: {
          age: 171,
          P01: "138.965",
          P1: "144.26",
          P3: "147.348",
          P5: "148.984",
          P10: "151.502",
          P15: "153.201",
          P25: "155.71",
          P50: "160.386",
          P75: "165.061",
          P85: "167.57",
          P90: "169.269",
          P95: "171.788",
          P97: "173.423",
          P99: "176.512",
          P999: "181.807",
        },
      },
      {
        name: 172,
        uid: "4211715664",
        values: {
          age: 172,
          P01: "139.159",
          P1: "144.45",
          P3: "147.537",
          P5: "149.171",
          P10: "151.687",
          P15: "153.385",
          P25: "155.892",
          P50: "160.564",
          P75: "165.236",
          P85: "167.743",
          P90: "169.441",
          P95: "171.958",
          P97: "173.592",
          P99: "176.678",
          P999: "181.97",
        },
      },
      {
        name: 173,
        uid: "2454048041",
        values: {
          age: 173,
          P01: "139.34",
          P1: "144.628",
          P3: "147.713",
          P5: "149.346",
          P10: "151.861",
          P15: "153.558",
          P25: "156.064",
          P50: "160.733",
          P75: "165.403",
          P85: "167.908",
          P90: "169.605",
          P95: "172.12",
          P97: "173.754",
          P99: "176.838",
          P999: "182.126",
        },
      },
      {
        name: 174,
        uid: "352251968",
        values: {
          age: 174,
          P01: "139.518",
          P1: "144.802",
          P3: "147.884",
          P5: "149.516",
          P10: "152.028",
          P15: "153.724",
          P25: "156.227",
          P50: "160.893",
          P75: "165.558",
          P85: "168.061",
          P90: "169.757",
          P95: "172.27",
          P97: "173.902",
          P99: "176.984",
          P999: "182.267",
        },
      },
      {
        name: 175,
        uid: "391855851",
        values: {
          age: 175,
          P01: "139.683",
          P1: "144.963",
          P3: "148.043",
          P5: "149.674",
          P10: "152.185",
          P15: "153.879",
          P25: "156.381",
          P50: "161.043",
          P75: "165.705",
          P85: "168.207",
          P90: "169.901",
          P95: "172.412",
          P97: "174.043",
          P99: "177.123",
          P999: "182.403",
        },
      },
      {
        name: 176,
        uid: "1082844531",
        values: {
          age: 176,
          P01: "139.846",
          P1: "145.121",
          P3: "148.197",
          P5: "149.827",
          P10: "152.335",
          P15: "154.028",
          P25: "156.527",
          P50: "161.184",
          P75: "165.842",
          P85: "168.341",
          P90: "170.034",
          P95: "172.542",
          P97: "174.172",
          P99: "177.248",
          P999: "182.523",
        },
      },
      {
        name: 177,
        uid: "358547978",
        values: {
          age: 177,
          P01: "139.996",
          P1: "145.267",
          P3: "148.341",
          P5: "149.969",
          P10: "152.475",
          P15: "154.167",
          P25: "156.664",
          P50: "161.318",
          P75: "165.971",
          P85: "168.469",
          P90: "170.16",
          P95: "172.666",
          P97: "174.294",
          P99: "177.368",
          P999: "182.639",
        },
      },
      {
        name: 178,
        uid: "1714672419",
        values: {
          age: 178,
          P01: "140.14",
          P1: "145.406",
          P3: "148.477",
          P5: "150.104",
          P10: "152.608",
          P15: "154.298",
          P25: "156.793",
          P50: "161.442",
          P75: "166.092",
          P85: "168.587",
          P90: "170.277",
          P95: "172.781",
          P97: "174.408",
          P99: "177.479",
          P999: "182.745",
        },
      },
      {
        name: 179,
        uid: "1830292910",
        values: {
          age: 179,
          P01: "140.276",
          P1: "145.537",
          P3: "148.606",
          P5: "150.231",
          P10: "152.733",
          P15: "154.421",
          P25: "156.914",
          P50: "161.56",
          P75: "166.205",
          P85: "168.698",
          P90: "170.386",
          P95: "172.888",
          P97: "174.513",
          P99: "177.582",
          P999: "182.843",
        },
      },
      {
        name: 180,
        uid: "3200121327",
        values: {
          age: 180,
          P01: "140.411",
          P1: "145.666",
          P3: "148.731",
          P5: "150.354",
          P10: "152.853",
          P15: "154.54",
          P25: "157.029",
          P50: "161.669",
          P75: "166.309",
          P85: "168.799",
          P90: "170.485",
          P95: "172.984",
          P97: "174.607",
          P99: "177.672",
          P999: "182.927",
        },
      },
      {
        name: 181,
        uid: "2807941529",
        values: {
          age: 181,
          P01: "140.535",
          P1: "145.785",
          P3: "148.847",
          P5: "150.468",
          P10: "152.965",
          P15: "154.649",
          P25: "157.137",
          P50: "161.772",
          P75: "166.407",
          P85: "168.894",
          P90: "170.579",
          P95: "173.075",
          P97: "174.697",
          P99: "177.759",
          P999: "183.008",
        },
      },
      {
        name: 182,
        uid: "2203905691",
        values: {
          age: 182,
          P01: "140.653",
          P1: "145.897",
          P3: "148.956",
          P5: "150.576",
          P10: "153.07",
          P15: "154.752",
          P25: "157.237",
          P50: "161.867",
          P75: "166.498",
          P85: "168.982",
          P90: "170.665",
          P95: "173.159",
          P97: "174.779",
          P99: "177.837",
          P999: "183.081",
        },
      },
      {
        name: 183,
        uid: "1873072924",
        values: {
          age: 183,
          P01: "140.761",
          P1: 146,
          P3: "149.056",
          P5: "150.675",
          P10: "153.166",
          P15: "154.848",
          P25: "157.33",
          P50: "161.956",
          P75: "166.583",
          P85: "169.065",
          P90: "170.746",
          P95: "173.238",
          P97: "174.856",
          P99: "177.912",
          P999: "183.152",
        },
      },
      {
        name: 184,
        uid: "256042732",
        values: {
          age: 184,
          P01: "140.868",
          P1: "146.101",
          P3: "149.154",
          P5: "150.77",
          P10: "153.259",
          P15: "154.939",
          P25: "157.418",
          P50: "162.039",
          P75: "166.66",
          P85: "169.14",
          P90: "169.819",
          P95: "173.308",
          P97: "174.925",
          P99: "177.977",
          P999: "183.211",
        },
      },
      {
        name: 185,
        uid: "2572440135",
        values: {
          age: 185,
          P01: "140.97",
          P1: "146.197",
          P3: "149.246",
          P5: "150.861",
          P10: "153.347",
          P15: "155.024",
          P25: "157.501",
          P50: "162.116",
          P75: "166.732",
          P85: "169.209",
          P90: "170.886",
          P95: "173.372",
          P97: "174.987",
          P99: "178.035",
          P999: "183.263",
        },
      },
      {
        name: 186,
        uid: "95867344",
        values: {
          age: 186,
          P01: "141.067",
          P1: "146.288",
          P3: "149.334",
          P5: "150.946",
          P10: "153.429",
          P15: "155.104",
          P25: "157.578",
          P50: "162.188",
          P75: "166.798",
          P85: "169.272",
          P90: "170.947",
          P95: "173.43",
          P97: "175.042",
          P99: "178.088",
          P999: "183.309",
        },
      },
      {
        name: 187,
        uid: "1653293342",
        values: {
          age: 187,
          P01: "141.155",
          P1: "146.371",
          P3: "149.413",
          P5: "151.024",
          P10: "153.504",
          P15: "155.178",
          P25: "157.649",
          P50: "162.254",
          P75: "166.859",
          P85: "169.331",
          P90: "171.004",
          P95: "173.485",
          P97: "175.096",
          P99: "178.138",
          P999: "183.353",
        },
      },
      {
        name: 188,
        uid: "2888966573",
        values: {
          age: 188,
          P01: "141.244",
          P1: "146.452",
          P3: "149.491",
          P5: "151.099",
          P10: "153.577",
          P15: "155.248",
          P25: "157.716",
          P50: "162.315",
          P75: "166.915",
          P85: "169.383",
          P90: "171.054",
          P95: "173.531",
          P97: "175.14",
          P99: "178.178",
          P999: "183.387",
        },
      },
      {
        name: 189,
        uid: "2356285949",
        values: {
          age: 189,
          P01: "141.323",
          P1: "146.526",
          P3: "149.561",
          P5: "151.168",
          P10: "153.643",
          P15: "155.312",
          P25: "157.778",
          P50: "162.372",
          P75: "166.966",
          P85: "169.432",
          P90: "171.101",
          P95: "173.576",
          P97: "175.183",
          P99: "178.218",
          P999: "183.421",
        },
      },
      {
        name: 190,
        uid: "3029970325",
        values: {
          age: 190,
          P01: "141.398",
          P1: "146.596",
          P3: "149.627",
          P5: "151.232",
          P10: "153.704",
          P15: "155.372",
          P25: "157.835",
          P50: "162.424",
          P75: "167.013",
          P85: "169.476",
          P90: "171.143",
          P95: "173.615",
          P97: "175.221",
          P99: "178.252",
          P999: "183.45",
        },
      },
      {
        name: 191,
        uid: "2363310069",
        values: {
          age: 191,
          P01: "141.475",
          P1: "146.665",
          P3: "149.693",
          P5: "151.296",
          P10: "153.764",
          P15: "155.43",
          P25: "157.889",
          P50: "162.472",
          P75: "167.055",
          P85: "169.514",
          P90: "171.179",
          P95: "173.648",
          P97: "175.251",
          P99: "178.278",
          P999: "183.468",
        },
      },
      {
        name: 192,
        uid: "2075253118",
        values: {
          age: 192,
          P01: "141.543",
          P1: "146.727",
          P3: "149.751",
          P5: "151.353",
          P10: "153.818",
          P15: "155.482",
          P25: "157.938",
          P50: "162.516",
          P75: "167.093",
          P85: "169.55",
          P90: "171.213",
          P95: "173.679",
          P97: "175.28",
          P99: "178.304",
          P999: "183.488",
        },
      },
      {
        name: 193,
        uid: "905466505",
        values: {
          age: 193,
          P01: "141.609",
          P1: "146.787",
          P3: "149.807",
          P5: "151.406",
          P10: "153.869",
          P15: "155.53",
          P25: "157.984",
          P50: "162.556",
          P75: "167.128",
          P85: "169.582",
          P90: "171.243",
          P95: "173.706",
          P97: "175.305",
          P99: "178.325",
          P999: "183.503",
        },
      },
      {
        name: 194,
        uid: "499760512",
        values: {
          age: 194,
          P01: "141.671",
          P1: "146.843",
          P3: "149.86",
          P5: "151.457",
          P10: "153.917",
          P15: "155.576",
          P25: "158.027",
          P50: "162.593",
          P75: "167.16",
          P85: "169.61",
          P90: "171.27",
          P95: "173.73",
          P97: "175.327",
          P99: "178.344",
          P999: "183.515",
        },
      },
      {
        name: 195,
        uid: "2112949532",
        values: {
          age: 195,
          P01: "141.731",
          P1: "146.897",
          P3: "149.91",
          P5: "151.505",
          P10: "153.962",
          P15: "155.619",
          P25: "158.067",
          P50: "162.628",
          P75: "167.189",
          P85: "169.636",
          P90: "171.294",
          P95: "173.75",
          P97: "175.346",
          P99: "178.358",
          P999: "183.524",
        },
      },
      {
        name: 196,
        uid: "1934508512",
        values: {
          age: 196,
          P01: "141.789",
          P1: "146.948",
          P3: "149.957",
          P5: "151.551",
          P10: "154.004",
          P15: "155.66",
          P25: "158.104",
          P50: "162.659",
          P75: "167.215",
          P85: "169.659",
          P90: "171.315",
          P95: "173.768",
          P97: "175.362",
          P99: "178.371",
          P999: "183.53",
        },
      },
      {
        name: 197,
        uid: "2863660879",
        values: {
          age: 197,
          P01: "141.84",
          P1: "146.994",
          P3: 150,
          P5: "151.592",
          P10: "154.043",
          P15: "155.696",
          P25: "158.138",
          P50: "162.689",
          P75: "167.24",
          P85: "169.682",
          P90: "171.335",
          P95: "173.786",
          P97: "175.378",
          P99: "178.384",
          P999: "183.538",
        },
      },
      {
        name: 198,
        uid: "3633744753",
        values: {
          age: 198,
          P01: "141.894",
          P1: "147.041",
          P3: "150.044",
          P5: "151.633",
          P10: "154.081",
          P15: "155.733",
          P25: "158.172",
          P50: "162.716",
          P75: "167.261",
          P85: "169.7",
          P90: "171.352",
          P95: "173.8",
          P97: "175.389",
          P99: "178.392",
          P999: "183.539",
        },
      },
      {
        name: 199,
        uid: "1427476772",
        values: {
          age: 199,
          P01: "141.942",
          P1: "147.084",
          P3: "150.083",
          P5: "151.671",
          P10: "154.116",
          P15: "155.766",
          P25: "158.202",
          P50: "162.742",
          P75: "167.283",
          P85: "169.719",
          P90: "171.369",
          P95: "173.814",
          P97: "175.402",
          P99: "178.401",
          P999: "183.543",
        },
      },
      {
        name: 200,
        uid: "3434279385",
        values: {
          age: 200,
          P01: "141.994",
          P1: "147.129",
          P3: "150.124",
          P5: "151.71",
          P10: "154.152",
          P15: "155.8",
          P25: "158.233",
          P50: "162.767",
          P75: "167.301",
          P85: "169.734",
          P90: "171.382",
          P95: "173.824",
          P97: "175.41",
          P99: "178.405",
          P999: "183.54",
        },
      },
      {
        name: 201,
        uid: "717939969",
        values: {
          age: 201,
          P01: "142.039",
          P1: "147.169",
          P3: "150.161",
          P5: "151.745",
          P10: "154.185",
          P15: "155.831",
          P25: "158.261",
          P50: "162.79",
          P75: "167.32",
          P85: "169.75",
          P90: "171.396",
          P95: "173.836",
          P97: "175.42",
          P99: "178.412",
          P999: "183.542",
        },
      },
      {
        name: 202,
        uid: "874345614",
        values: {
          age: 202,
          P01: "142.089",
          P1: "147.212",
          P3: "150.2",
          P5: "151.782",
          P10: "154.218",
          P15: "155.862",
          P25: "158.289",
          P50: "162.813",
          P75: "167.336",
          P85: "169.763",
          P90: "171.407",
          P95: "173.843",
          P97: "175.426",
          P99: "178.414",
          P999: "183.536",
        },
      },
      {
        name: 203,
        uid: "1734021569",
        values: {
          age: 203,
          P01: "142.133",
          P1: "147.25",
          P3: "150.235",
          P5: "151.815",
          P10: "154.249",
          P15: "155.891",
          P25: "158.316",
          P50: "162.834",
          P75: "167.352",
          P85: "169.777",
          P90: "171.419",
          P95: "173.853",
          P97: "175.433",
          P99: "178.418",
          P999: "183.535",
        },
      },
      {
        name: 204,
        uid: "1299629719",
        values: {
          age: 204,
          P01: "142.176",
          P1: "147.287",
          P3: "150.269",
          P5: "151.848",
          P10: "154.279",
          P15: "155.919",
          P25: "158.341",
          P50: "162.854",
          P75: "167.368",
          P85: "169.79",
          P90: "171.43",
          P95: "173.861",
          P97: "175.44",
          P99: "178.422",
          P999: "183.533",
        },
      },
      {
        name: 205,
        uid: "3332136068",
        values: {
          age: 205,
          P01: "142.218",
          P1: "147.324",
          P3: "150.302",
          P5: "151.88",
          P10: "154.308",
          P15: "155.946",
          P25: "158.366",
          P50: "162.874",
          P75: "167.383",
          P85: "169.802",
          P90: "171.441",
          P95: "173.869",
          P97: "175.446",
          P99: "178.424",
          P999: "183.531",
        },
      },
      {
        name: 206,
        uid: "1473239117",
        values: {
          age: 206,
          P01: "142.26",
          P1: "147.36",
          P3: "150.335",
          P5: "151.911",
          P10: "154.337",
          P15: "155.973",
          P25: "158.39",
          P50: "162.894",
          P75: "167.397",
          P85: "169.814",
          P90: "171.45",
          P95: "173.876",
          P97: "175.452",
          P99: "178.427",
          P999: "183.527",
        },
      },
      {
        name: 207,
        uid: "1706489484",
        values: {
          age: 207,
          P01: "142.301",
          P1: "147.396",
          P3: "150.368",
          P5: "151.941",
          P10: "154.365",
          P15: "155.999",
          P25: "158.413",
          P50: "162.912",
          P75: "167.411",
          P85: "169.825",
          P90: "171.459",
          P95: "173.883",
          P97: "175.456",
          P99: "178.428",
          P999: "183.523",
        },
      },
      {
        name: 208,
        uid: "1102095774",
        values: {
          age: 208,
          P01: "142.342",
          P1: "147.431",
          P3: "150.4",
          P5: "151.972",
          P10: "154.392",
          P15: "156.025",
          P25: "158.436",
          P50: "162.93",
          P75: "167.424",
          P85: "169.835",
          P90: "171.468",
          P95: "173.888",
          P97: "175.46",
          P99: "178.429",
          P999: "183.518",
        },
      },
      {
        name: 209,
        uid: "3995344323",
        values: {
          age: 209,
          P01: "142.383",
          P1: "147.466",
          P3: "150.431",
          P5: "152.001",
          P10: "154.419",
          P15: "156.05",
          P25: "158.459",
          P50: "162.948",
          P75: "167.436",
          P85: "169.845",
          P90: "171.476",
          P95: "173.894",
          P97: "175.464",
          P99: "178.429",
          P999: "183.512",
        },
      },
      {
        name: 210,
        uid: "2458929740",
        values: {
          age: 210,
          P01: "142.418",
          P1: "147.497",
          P3: "150.46",
          P5: "152.028",
          P10: "154.444",
          P15: "156.074",
          P25: "158.48",
          P50: "162.965",
          P75: "167.45",
          P85: "169.856",
          P90: "171.486",
          P95: "173.901",
          P97: "175.47",
          P99: "178.433",
          P999: "183.512",
        },
      },
      {
        name: 211,
        uid: "3242933941",
        values: {
          age: 211,
          P01: "142.458",
          P1: "147.531",
          P3: "150.49",
          P5: "152.057",
          P10: "154.47",
          P15: "156.098",
          P25: "158.502",
          P50: "162.982",
          P75: "167.461",
          P85: "169.865",
          P90: "171.493",
          P95: "173.906",
          P97: "175.473",
          P99: "178.432",
          P999: "183.505",
        },
      },
      {
        name: 212,
        uid: "738616686",
        values: {
          age: 212,
          P01: "142.493",
          P1: "147.561",
          P3: "150.518",
          P5: "152.084",
          P10: "154.494",
          P15: "156.121",
          P25: "158.523",
          P50: "162.998",
          P75: "167.474",
          P85: "169.876",
          P90: "171.502",
          P95: "173.913",
          P97: "175.479",
          P99: "178.435",
          P999: "183.504",
        },
      },
      {
        name: 213,
        uid: "2363032163",
        values: {
          age: 213,
          P01: "142.532",
          P1: "147.595",
          P3: "150.548",
          P5: "152.112",
          P10: "154.52",
          P15: "156.145",
          P25: "158.544",
          P50: "163.014",
          P75: "167.485",
          P85: "169.884",
          P90: "171.509",
          P95: "173.917",
          P97: "175.481",
          P99: "178.434",
          P999: "183.497",
        },
      },
      {
        name: 214,
        uid: "2678594119",
        values: {
          age: 214,
          P01: "142.566",
          P1: "147.624",
          P3: "150.575",
          P5: "152.137",
          P10: "154.543",
          P15: "156.166",
          P25: "158.563",
          P50: "163.03",
          P75: "167.497",
          P85: "169.894",
          P90: "171.517",
          P95: "173.923",
          P97: "175.485",
          P99: "178.436",
          P999: "183.494",
        },
      },
      {
        name: 215,
        uid: "1263598448",
        values: {
          age: 215,
          P01: "142.599",
          P1: "147.653",
          P3: "150.601",
          P5: "152.162",
          P10: "154.566",
          P15: "156.188",
          P25: "158.582",
          P50: "163.045",
          P75: "167.508",
          P85: "169.903",
          P90: "171.524",
          P95: "173.928",
          P97: "175.489",
          P99: "178.437",
          P999: "183.491",
        },
      },
      {
        name: 216,
        uid: "1791049428",
        values: {
          age: 216,
          P01: "142.637",
          P1: "147.685",
          P3: "150.63",
          P5: "152.189",
          P10: "154.59",
          P15: "156.21",
          P25: "158.602",
          P50: "163.06",
          P75: "167.517",
          P85: "169.909",
          P90: "171.529",
          P95: "173.93",
          P97: "175.489",
          P99: "178.434",
          P999: "183.482",
        },
      },
      {
        name: 217,
        uid: "650079837",
        values: {
          age: 217,
          P01: "142.669",
          P1: "147.713",
          P3: "150.655",
          P5: "152.213",
          P10: "154.611",
          P15: "156.23",
          P25: "158.62",
          P50: "163.073",
          P75: "167.527",
          P85: "169.917",
          P90: "171.535",
          P95: "173.934",
          P97: "175.492",
          P99: "178.434",
          P999: "183.478",
        },
      },
      {
        name: 218,
        uid: "1346409268",
        values: {
          age: 218,
          P01: "142.7",
          P1: "147.74",
          P3: "150.679",
          P5: "152.235",
          P10: "154.632",
          P15: "156.249",
          P25: "158.637",
          P50: "163.086",
          P75: "167.536",
          P85: "169.923",
          P90: "171.54",
          P95: "173.937",
          P97: "175.493",
          P99: "178.433",
          P999: "183.472",
        },
      },
      {
        name: 219,
        uid: "320096602",
        values: {
          age: 219,
          P01: "142.731",
          P1: "147.766",
          P3: "150.702",
          P5: "152.257",
          P10: "154.652",
          P15: "156.267",
          P25: "158.653",
          P50: "163.098",
          P75: "167.544",
          P85: "169.929",
          P90: "171.545",
          P95: "173.939",
          P97: "175.494",
          P99: "178.431",
          P999: "183.465",
        },
      },
      {
        name: 220,
        uid: "2947940617",
        values: {
          age: 220,
          P01: "142.761",
          P1: "147.791",
          P3: "150.725",
          P5: "152.278",
          P10: "154.671",
          P15: "156.285",
          P25: "158.668",
          P50: "163.109",
          P75: "167.551",
          P85: "169.934",
          P90: "171.548",
          P95: "173.94",
          P97: "175.494",
          P99: "178.428",
          P999: "183.458",
        },
      },
      {
        name: 221,
        uid: "4027603167",
        values: {
          age: 221,
          P01: "142.785",
          P1: "147.811",
          P3: "150.743",
          P5: "152.296",
          P10: "154.686",
          P15: "156.299",
          P25: "158.681",
          P50: "163.119",
          P75: "167.557",
          P85: "169.939",
          P90: "171.552",
          P95: "173.943",
          P97: "175.495",
          P99: "178.427",
          P999: "183.454",
        },
      },
      {
        name: 222,
        uid: "1892824652",
        values: {
          age: 222,
          P01: "142.813",
          P1: "147.834",
          P3: "150.763",
          P5: "152.315",
          P10: "154.703",
          P15: "156.314",
          P25: "158.694",
          P50: "163.128",
          P75: "167.562",
          P85: "169.941",
          P90: "171.553",
          P95: "173.941",
          P97: "175.492",
          P99: "178.421",
          P999: "183.443",
        },
      },
      {
        name: 223,
        uid: "3571097475",
        values: {
          age: 223,
          P01: "142.839",
          P1: "147.856",
          P3: "150.783",
          P5: "152.332",
          P10: "154.718",
          P15: "156.328",
          P25: "158.706",
          P50: "163.136",
          P75: "167.565",
          P85: "169.943",
          P90: "171.553",
          P95: "173.939",
          P97: "175.488",
          P99: "178.415",
          P999: "183.432",
        },
      },
      {
        name: 224,
        uid: "2469886881",
        values: {
          age: 224,
          P01: "142.86",
          P1: "147.874",
          P3: "150.798",
          P5: "152.346",
          P10: "154.731",
          P15: "156.339",
          P25: "158.715",
          P50: "163.142",
          P75: "167.569",
          P85: "169.944",
          P90: "171.553",
          P95: "173.937",
          P97: "175.486",
          P99: "178.41",
          P999: "183.424",
        },
      },
      {
        name: 225,
        uid: "4133763121",
        values: {
          age: 225,
          P01: "142.885",
          P1: "147.893",
          P3: "150.815",
          P5: "152.362",
          P10: "154.744",
          P15: "156.351",
          P25: "158.724",
          P50: "163.147",
          P75: "167.569",
          P85: "169.943",
          P90: "171.55",
          P95: "173.932",
          P97: "175.479",
          P99: "178.4",
          P999: "183.409",
        },
      },
      {
        name: 226,
        uid: "1051777605",
        values: {
          age: 226,
          P01: "142.903",
          P1: "147.908",
          P3: "150.828",
          P5: "152.373",
          P10: "154.754",
          P15: "156.36",
          P25: "158.731",
          P50: "163.151",
          P75: "167.57",
          P85: "169.942",
          P90: "171.548",
          P95: "173.928",
          P97: "175.474",
          P99: "178.393",
          P999: "183.398",
        },
      },
      {
        name: 227,
        uid: "2180644588",
        values: {
          age: 227,
          P01: "142.926",
          P1: "147.926",
          P3: "150.842",
          P5: "152.387",
          P10: "154.765",
          P15: "156.369",
          P25: "158.738",
          P50: "163.153",
          P75: "167.568",
          P85: "169.938",
          P90: "171.542",
          P95: "173.92",
          P97: "175.465",
          P99: "178.381",
          P999: "183.381",
        },
      },
      {
        name: 228,
        uid: "38776938",
        values: {
          age: 228,
          P01: "142.942",
          P1: "147.938",
          P3: "150.853",
          P5: "152.396",
          P10: "154.772",
          P15: "156.376",
          P25: "158.743",
          P50: "163.155",
          P75: "167.567",
          P85: "169.934",
          P90: "171.537",
          P95: "173.914",
          P97: "175.457",
          P99: "178.371",
          P999: "183.368",
        },
      },
    ];

    let convertHight;
    const unitH1 = unit_ft_in;

    if (unitH1 == "ft/in") {
      if (isNumeric(height_ft) || isNumeric(height_in)) {
        convertHight = parseFloat(height_ft) * 12 + parseFloat(height_in);
      } else {
        return { error: "Please! Check your input." };
      }
    } else if (unitH1 == "cm") {
      if (isNumeric(height_cm)) {
        convertHight = parseFloat(height_cm) / 2.54;
      } else {
        return { error: "Please! Check your input." };
      }
    } else if (unitH1 == "ft") {
      if (isNumeric(height_cm)) {
        convertHight = parseFloat(height_cm) * 12;
      } else {
        return { error: "Please! Check your input." };
      }
    } else if (unitH1 == "in") {
      if (isNumeric(height_cm)) {
        convertHight = parseFloat(height_cm) * 1;
      } else {
        return { error: "Please! Check your input." };
      }
    } else if (unitH1 === "m") {
      if (isNumeric(height_cm)) {
        convertHight = parseFloat(height_cm) * 39.37;
      } else {
        return { error: "Please! Check your input." };
      }
    }

    const calculatedAge = umar(ageUnit.toString(), parseFloat(age));

    if (isNumeric(calculatedAge)) {
      if (calculatedAge > 0 && calculatedAge <= 19) {
        const ageInMonths = calculatedAge * 12;
        let takeRow;
        if (gender == 0) {
          // Girls
          if (ageInMonths <= 13 * 0.23) {
            for (let i = 0; i < girls_to_13w.length; i++) {
              if (
                ageInMonths <= 0.23 * girls_to_13w[i].values.age &&
                (i === 0 || ageInMonths > 0.23 * girls_to_13w[i - 1].values.age)
              ) {
                takeRow = girls_to_13w[i].values;
                break;
              }
            }
          } else {
            for (let i = 0; i < girls_to_5y.length; i++) {
              if (
                ageInMonths <= girls_to_5y[i].values.age &&
                (i === 0 || ageInMonths > girls_to_5y[i - 1].values.age)
              ) {
                takeRow = girls_to_5y[i].values;
                break;
              }
            }
          }
        } else if (gender == 1) {
          // Boys
          if (ageInMonths <= 13 * 0.23) {
            for (let i = 0; i < boys_to_13w.length; i++) {
              if (
                ageInMonths <= 0.23 * boys_to_13w[i].values.age &&
                (i === 0 || ageInMonths > 0.23 * boys_to_13w[i - 1].values.age)
              ) {
                takeRow = boys_to_13w[i].values;
                break;
              }
            }
          } else {
            for (let i = 0; i < boys_to_5y.length; i++) {
              if (
                ageInMonths <= boys_to_5y[i].values.age &&
                (i === 0 || ageInMonths > boys_to_5y[i - 1].values.age)
              ) {
                takeRow = boys_to_5y[i].values;
                break;
              }
            }
          }
        }

        const actualCm = convertHight * 2.54;
        const weight = convertHight * 2.54;
        let result;
        let firstAns;
        let percentile;
        let line;
        let image;
        if (weight <= parseFloat(takeRow.P01)) {
          result = 0.1;
        } else if (weight <= parseFloat(takeRow.P1)) {
          result =
            ((weight - parseFloat(takeRow.P01)) /
              (parseFloat(takeRow.P1) - parseFloat(takeRow.P01))) *
              (1 - 0.1) +
            0.1;
        } else if (weight <= parseFloat(takeRow.P3)) {
          result =
            ((weight - parseFloat(takeRow.P1)) /
              (parseFloat(takeRow.P3) - parseFloat(takeRow.P1))) *
              (3 - 1) +
            1;
        } else if (weight <= parseFloat(takeRow.P5)) {
          result =
            ((weight - parseFloat(takeRow.P3)) /
              (parseFloat(takeRow.P5) - parseFloat(takeRow.P3))) *
              2 +
            3;
        } else if (weight <= parseFloat(takeRow.P10)) {
          result =
            ((weight - parseFloat(takeRow.P5)) /
              (parseFloat(takeRow.P10) - parseFloat(takeRow.P5))) *
              5 +
            5;
        } else if (weight <= parseFloat(takeRow.P15)) {
          result =
            ((weight - parseFloat(takeRow.P10)) /
              (parseFloat(takeRow.P15) - parseFloat(takeRow.P10))) *
              5 +
            10;
        } else if (weight <= parseFloat(takeRow.P25)) {
          result =
            ((weight - parseFloat(takeRow.P15)) /
              (parseFloat(takeRow.P25) - parseFloat(takeRow.P15))) *
              10 +
            10;
        } else if (weight <= parseFloat(takeRow.P50)) {
          result =
            ((weight - parseFloat(takeRow.P25)) /
              (parseFloat(takeRow.P50) - parseFloat(takeRow.P25))) *
              25 +
            25;
        } else if (weight <= parseFloat(takeRow.P75)) {
          result =
            ((weight - parseFloat(takeRow.P50)) /
              (parseFloat(takeRow.P75) - parseFloat(takeRow.P50))) *
              25 +
            50;
        } else if (weight <= parseFloat(takeRow.P85)) {
          result =
            ((weight - parseFloat(takeRow.P75)) /
              (parseFloat(takeRow.P85) - parseFloat(takeRow.P75))) *
              10 +
            75;
        } else if (weight <= parseFloat(takeRow.P90)) {
          result =
            ((weight - parseFloat(takeRow.P85)) /
              (parseFloat(takeRow.P90) - parseFloat(takeRow.P85))) *
              5 +
            85;
        } else if (weight <= parseFloat(takeRow.P95)) {
          result =
            ((weight - parseFloat(takeRow.P90)) /
              (parseFloat(takeRow.P95) - parseFloat(takeRow.P90))) *
              5 +
            90;
        } else if (weight <= parseFloat(takeRow.P97)) {
          result =
            ((weight - parseFloat(takeRow.P95)) /
              (parseFloat(takeRow.P97) - parseFloat(takeRow.P95))) *
              2 +
            95;
        } else if (weight <= parseFloat(takeRow.P99)) {
          result =
            ((weight - parseFloat(takeRow.P97)) /
              (parseFloat(takeRow.P99) - parseFloat(takeRow.P97))) *
              2 +
            97;
        } else if (weight <= parseFloat(takeRow.P999)) {
          result =
            ((weight - parseFloat(takeRow.P99)) /
              (parseFloat(takeRow.P999) - parseFloat(takeRow.P99))) *
              0.99 +
            99;
        } else {
          result = 100;
        }

        firstAns = round(result, 2);

        if (weight <= parseFloat(takeRow.P01)) {
          result = 0.1;
        } else if (weight <= parseFloat(takeRow.P1)) {
          result = 1;
        } else if (weight <= parseFloat(takeRow.P3)) {
          result = 3;
        } else if (weight <= parseFloat(takeRow.P5)) {
          result = 5;
        } else if (weight <= parseFloat(takeRow.P10)) {
          result = 10;
        } else if (weight <= parseFloat(takeRow.P15)) {
          result = 15;
        } else if (weight <= parseFloat(takeRow.P25)) {
          result = 25;
        } else if (weight <= parseFloat(takeRow.P50)) {
          result = 50;
        } else if (weight <= parseFloat(takeRow.P75)) {
          result = 75;
        } else if (weight <= parseFloat(takeRow.P85)) {
          result = 85;
        } else if (weight <= parseFloat(takeRow.P90)) {
          result = 90;
        } else if (weight <= parseFloat(takeRow.P95)) {
          result = 95;
        } else if (weight <= parseFloat(takeRow.P97)) {
          result = 97;
        } else if (weight <= parseFloat(takeRow.P99)) {
          result = 99;
        } else if (weight <= parseFloat(takeRow.P999)) {
          result = 99.9;
        } else {
          result = 100;
        }

        percentile = result;

        if (percentile == 0.1) {
          line =
            "The result is below <b> 0.1 percentile </b><br />" +
            "It seems that your child may be short for their age. Check if they have always been in those ranges. <b>If they have entered these ranges recently, consult a doctor.</b>";
        } else if (percentile == 1) {
          line =
            "Between <b>0.1</b> and <b>1st percentile</b><br />" +
            "It seems that your child may be short for their age. Check if they have always been in those ranges. <b>If they have entered these ranges recently, consult a doctor.</b>";
        } else if (percentile == 3) {
          line =
            "Between <b>1st</b> and <b>3rd percentile</b><br />" +
            "It seems that your child may be short for their age. Check if they have always been in those ranges. <b>If they have entered these ranges recently, consult a doctor.</b>";
        } else if (percentile == 5) {
          line = "Between the <b>3rd</b> and <b>5th percentiles</b>";
        } else if (percentile == 10) {
          line = "Between the <b>5th</b> and <b>10th percentiles</b>";
        } else if (percentile == 15) {
          line = "Between the <b>10th</b> and <b>15th percentiles<b>";
        } else if (percentile == 25) {
          line = "Between the <b>15th</b> and <b>25th percentiles</b>";
        } else if (percentile == 50) {
          line = "Between the <b>25th</b> and <b>50th percentiles</b>";
        } else if (percentile == 75) {
          line = "Between the <b>50th</b> and <b>75th percentiles</b>";
        } else if (percentile == 85) {
          line = "Between the <b>75th</b> and <b>85th percentiles</b>";
        } else if (percentile == 90) {
          line = "Between the <b>85th</b> and <b>90th percentiles</b><br>";
        } else if (percentile == 95) {
          line = "Between the <b>90th</b> and <b>95th percentiles</b><br>";
        } else if (percentile == 97) {
          line = "Between the <b>95th</b> and <b>97th percentiles</b><br>";
        } else if (percentile == 99) {
          line =
            "Between the <b>97th</b> and <b>99th percentiles</b><br />" +
            "It seems that your child is taller than their peers. Check if they have always been in those ranges. <b>If they have entered these ranges recently, consult a doctor.</b>";
        } else if (percentile == 99.9) {
          line =
            "Between the <b> 99th</b> and <b>99.9th percentiles</b><br />" +
            "It seems that your child is taller than their peers. Check if they have always been in those ranges. <b>If they have entered these ranges recently, consult a doctor.</b>";
        } else if (percentile == 100) {
          line =
            "The result is above the <b>99.9th percentile</b><br />" +
            "It seems that your child is taller than their peers. Check if they have always been in those ranges. <b>If they have entered these ranges recently, consult a doctor.</b>";
        }

        if (percentile < 3) {
          image = "image_1";
        } else if (percentile === 3) {
          image = "image_2";
        } else if (percentile < 4) {
          image = "image_3";
        } else if (percentile < 5) {
          image = "image_4";
        } else if (percentile === 5) {
          image = "image_5";
        } else if (percentile < 10) {
          image = "image_6";
        } else if (percentile < 15) {
          image = "image_7";
        } else if (percentile === 15) {
          image = "image_8";
        } else if (percentile < 20) {
          image = "image_9";
        } else if (percentile < 25) {
          image = "image_10";
        } else if (percentile === 25) {
          image = "image_11";
        } else if (percentile < 37) {
          image = "image_12";
        } else if (percentile < 50) {
          image = "image_13";
        } else if (percentile === 50) {
          image = "image_14";
        } else if (percentile < 63) {
          image = "image_15";
        } else if (percentile < 75) {
          image = "image_16";
        } else if (percentile === 75) {
          image = "image_17";
        } else if (percentile < 80) {
          image = "image_18";
        } else if (percentile < 85) {
          image = "image_19";
        } else if (percentile === 85) {
          image = "image_20";
        } else if (percentile < 90) {
          image = "image_21";
        } else if (percentile < 95) {
          image = "image_22";
        } else if (percentile === 95) {
          image = "image_23";
        } else if (percentile < 96) {
          image = "image_24";
        } else if (percentile < 97) {
          image = "image_25";
        } else if (percentile === 97) {
          image = "image_26";
        } else if (percentile > 97) {
          image = "image_27";
        }

        return {
          tech_first_ans: firstAns,
          tech_line: line,
          tech_image: image,
          tech_actual_cm: actualCm,
        };
      } else {
        return {
          error:
            "This BMI percentile calculator is only for children up to the age of 19.",
        };
      }
    } else {
      return { error: "Please! Check your input." };
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
   * getCalculationDressSizeCalculator: Service Method
   * POST: /api/calculators-lol/dress-size-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationDressSizeCalculator(body) {
    let bust = Number(body.tech_bust);
    let waist = Number(body.tech_waist);
    let hips = Number(body.tech_hips);
    let response = {};

    function getUSSize(EuroSize) {
      if (EuroSize <= 30) return "00";
      else if (EuroSize <= 32) return "0";
      else if (EuroSize <= 34) return "2";
      else if (EuroSize <= 36) return "4";
      else if (EuroSize <= 38) return "6";
      else if (EuroSize <= 40) return "8";
      else if (EuroSize <= 42) return "10";
      else if (EuroSize <= 44) return "12";
      else if (EuroSize <= 46) return "14";
      else if (EuroSize <= 48) return "16";
      else if (EuroSize <= 50) return "18";
      else if (EuroSize <= 52) return "20";
      else if (EuroSize <= 54) return "22";
      else return "Not strictly determined";
    }

    function getUKSize(EuroSize) {
      if (EuroSize <= 30) return "2";
      else if (EuroSize <= 32) return "4";
      else if (EuroSize <= 34) return "6";
      else if (EuroSize <= 36) return "8";
      else if (EuroSize <= 38) return "10";
      else if (EuroSize <= 40) return "12";
      else if (EuroSize <= 42) return "14";
      else if (EuroSize <= 44) return "16";
      else if (EuroSize <= 46) return "18";
      else if (EuroSize <= 48) return "20";
      else if (EuroSize <= 50) return "22";
      else if (EuroSize <= 52) return "24";
      else if (EuroSize <= 54) return "26";
      else return "Not strictly determined";
    }

    function getInternationalSize(EuroSize) {
      if (EuroSize <= 30) return "XXS";
      else if (EuroSize <= 32) return "XS";
      else if (EuroSize <= 34) return "XS";
      else if (EuroSize <= 36) return "S";
      else if (EuroSize <= 38) return "S";
      else if (EuroSize <= 40) return "M";
      else if (EuroSize <= 42) return "M";
      else if (EuroSize <= 44) return "L";
      else if (EuroSize <= 46) return "L";
      else if (EuroSize <= 48) return "XL";
      else if (EuroSize <= 50) return "XL";
      else if (EuroSize <= 52) return "XXL";
      else if (EuroSize <= 54) return "XXL";
      else return "Not strictly determined";
    }

    if (bust && waist && hips) {
      if (bust === waist && waist === hips) {
        let euroSize = bust.toString();
        let usaSize = getUSSize(bust);
        let ukSize = getUKSize(bust);
        let internationalSize = getInternationalSize(bust);

        if (bust >= 56) {
          response.tech_firstText =
            "Sorry, we couldn't calculate a dress size based on your measurements. Check the catalog or manufacturer before buying your dress, or try it on if you can";
        } else {
          response.tech_usaSize = usaSize;
          response.tech_ukSize = ukSize;
          response.tech_euroSize = euroSize;
          response.tech_internationalSize = internationalSize;
        }
      } else {
        if (bust >= 56 || waist >= 56 || hips >= 56) {
          response.tech_firstText =
            "Sorry, we couldn't calculate a dress size based on your measurements. Check the catalog or manufacturer before buying your dress, or try it on if you can";
        } else {
          response.tech_secondText =
            "Looks like your measurements fall into different size categories (as shown in the table below). Check the <b>detailed dress size chart</b> in the article to assess which size should fit you best.";

          response.tech_usBust = getUSSize(bust);
          response.tech_usWaist = getUSSize(waist);
          response.tech_usHips = getUSSize(hips);

          response.tech_ukBust = getUKSize(bust);
          response.tech_ukWaist = getUKSize(waist);
          response.tech_ukHips = getUKSize(hips);

          response.tech_euBust = bust;
          response.tech_euWaist = waist;
          response.tech_euHips = hips;

          response.tech_internationalBust = getInternationalSize(bust);
          response.tech_internationalWaist = getInternationalSize(waist);
          response.tech_internationalHips = getInternationalSize(hips);
        }
      }
    } else {
      response.error = "Please check your input.";
    }

    return response;
  }

  /**
   * getCalculationTinettiCalculator: Service Method
   * POST: /api/calculators-lol/tinetti-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationTinettiCalculator(body) {
    let a1 = Number(body.tech_a1);
    let a2 = Number(body.tech_a2);
    let a3 = Number(body.tech_a3);
    let a4 = Number(body.tech_a4);
    let a5 = Number(body.tech_a5);
    let a6 = Number(body.tech_a6);
    let a7 = Number(body.tech_a7);
    let a8 = Number(body.tech_a8);
    let a9 = Number(body.tech_a9);
    let a10 = Number(body.tech_a10);

    let b1 = Number(body.tech_b1);
    let b2 = Number(body.tech_b2);
    let b3 = Number(body.tech_b3);
    let b4 = Number(body.tech_b4);
    let b5 = Number(body.tech_b5);
    let b6 = Number(body.tech_b6);
    let b7 = Number(body.tech_b7);
    let b8 = Number(body.tech_b8);
    let b9 = Number(body.tech_b9);
    let b10 = Number(body.tech_b10);

    let add1 = a1 + a2 + a3 + a4 + a5 + a6 + a7 + a8 + a9 + a10;
    let add2 = b1 + b2 + b3 + b4 + b5 + b6 + b7 + b8 + b9 + b10;
    let add3 = add1 + add2;

    return {
      tech_add1: add1,
      tech_add2: add2,
      tech_add3: add3,
    };
  }

  /**
   * getCalculationDripRateCalculator: Service Method
   * POST: /api/calculators-lol/drip-rate-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationDripRateCalculator(body) {
    let result = {};

    let v = Number(body.tech_v);
    let v_unit = body.tech_v_unit.replace("@", "");
    let t = Number(body.tech_t);
    let t_unit = body.tech_t_unit;
    let dp = Number(body.tech_dp);
    let dp_unit = body.tech_dp_unit.replace("@", "");
    let type = body.tech_type;

    let d = Number(body.tech_d);
    let d_unit = body.tech_d_unit;
    let bw = Number(body.tech_bw);
    let bw_unit = body.tech_bw_unit;
    let bv = Number(body.tech_bv);
    let bv_unit = body.tech_bv_unit;
    let drug = Number(body.tech_drug);
    let drug_unit = body.tech_drug_unit;

    // Volume units
    let v_units = {
      "mm³": 0.001,
      "cm³": 1,
      "dm³": 1000,
      ml: 1,
      cl: 10,
      l: 1000,
    };
    v_unit = v_units[v_unit] || 1;

    // Time units
    let t_units = {
      sec: 0.0166667,
      min: 1,
      hrs: 60,
    };
    t_unit = t_units[t_unit] || 1;

    // Dose units
    let d_units = {
      "mg/kg/min": 0.0166667,
      "mg/oz/min": 35.274,
      "mg/lb/min": 0.15747, // used only the last one from PHP (duplicate key bug in PHP code)
    };
    d_unit = d_units[d_unit] || 1;

    // Body weight units
    let bw_units = {
      kg: 1,
      oz: 0.02835,
      lbs: 0.4536,
      stone: 6.35,
    };
    bw_unit = bw_units[bw_unit] || 1;

    // Bag volume units
    let bv_units = {
      ml: 1,
      cl: 10,
      l: 1000,
    };
    bv_unit = bv_units[bv_unit] || 1;

    // Drug units
    let drug_units = {
      µg: 0.001,
      mg: 1,
      g: 1000,
    };
    drug_unit = drug_units[drug_unit] || 1;

    // Drip units
    let dp_units = {
      "gtts/mm³": 1000,
      "gtts/cm³": 1,
      "gtts/ml": 1,
    };
    dp_unit = dp_units[dp_unit] || 1;

    if (type === "first") {
      if (v > 0 && t > 0 && dp > 0) {
        let v_val = v * v_unit;
        let t_val = t * t_unit;
        let dp_val = dp * dp_unit;

        let dpm = (v_val * dp_val) / t_val;
        let dph = (v_val * dp_val) / (t_val / 60);
        let dr = dph / dp_val;

        result.tech_dpm = dpm;
        result.tech_dph = dph;
        result.tech_dr = dr;
      } else {
        return { error: "Please! Check Your Input." };
      }
    } else if (type === "second") {
      if (d > 0 && bw > 0 && bv > 0 && drug > 0 && dp > 0) {
        let d_val = d * d_unit;
        let bw_val = bw * bw_unit;
        let bv_val = bv * bv_unit;
        let drug_val = drug * drug_unit;
        let dp_val = dp * dp_unit;

        if (bw_val > 0 && bw_val < 300) {
          let dr =
            ((((60 * d_val) / 1000) * bw_val * bv_val) / (1000 * drug_val)) *
            1000000;
          let concentration = (drug_val / bv_val) * 1000;
          let time_to_bag = (d_val * bw_val * 60) / drug_val;
          let flow_rate = dr * dp_val;

          result.tech_concentration = concentration;
          result.tech_time_to_bag = time_to_bag;
          result.tech_flow_rate = flow_rate;
          result.tech_dr = dr;
        } else {
          return {
            error: "Body weight must be greater than 0 and less than 300 kg.",
          };
        }
      } else {
        return { error: "Please! Check Your Input." };
      }
    }

    result.tech_type = type;
    return result;
  }

  /**
   * getCalculationMapCalculator: Service Method
   * POST: /api/calculators-lol/map-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationMapCalculator(body) {
    const tech_sbp = parseFloat(body.tech_sbp);
    const tech_dbp = parseFloat(body.tech_dbp);

    if (!isNaN(tech_sbp) && !isNaN(tech_dbp)) {
      if (tech_sbp < 70) {
        return {
          tech_error:
            "Systolic Blood Pressure > 70 for normal person. Contact your doctor for further description.",
        };
      } else if (tech_dbp < 40) {
        return {
          tech_error:
            "Diastolic blood pressure > 40 for normal persons. Contact your doctor for further description.",
        };
      } else if (tech_dbp >= tech_sbp) {
        return {
          tech_error:
            "Diastolic blood pressure cannot be higher than systolic blood pressure.",
        };
      } else {
        const tech_map = (1 / 3) * tech_sbp + (2 / 3) * tech_dbp;
        const tech_pr = tech_sbp - tech_dbp;

        return {
          tech_sbp,
          tech_dbp,
          tech_map,
          tech_pr,
          tech_RESULT: 1,
        };
      }
    } else {
      return {
        error: "Please! Check your input.",
      };
    }
  }

  /**
   * getCalculationStepstoCaloriesCalculator: Service Method
   * POST: /api/calculators-lol/steps-to-calories-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationStepstoCaloriesCalculator(body) {
    let weight = body.tech_weight;
    let w_unit = body.tech_w_unit;
    let height_ft = body.tech_height_ft;
    let height_in = body.tech_height_in;
    let height_cm = body.tech_height_cm;
    let steps = body.tech_steps;
    let speed = body.tech_speed;
    let h_unit = body.tech_unit_ft_in;

    // Helper
    function isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }
    // Weight conversion
    if (w_unit === "kg") {
      w_unit = 1;
    } else if (w_unit === "lbs") {
      w_unit = 2;
    } else if (w_unit === "stone") {
      w_unit = 3;
    }

    function convertWeight(unit, value) {
      if (unit === 1) return value * 1;
      if (unit === 2) return value * 0.4536;
      if (unit === 3) return value * 6.35;
      return null;
    }

    weight = convertWeight(w_unit, weight);

    let convert_height;

    if (h_unit === "ft/in") {
      if (isNumeric(height_ft) || isNumeric(height_in)) {
        convert_height = height_ft * 12 + (height_in || 0);
      } else {
        return { error: "Please! Check your input." };
      }
    } else if (h_unit === "cm") {
      if (isNumeric(height_cm)) {
        convert_height = height_cm / 2.54;
      } else {
        return { error: "Please! Check your input." };
      }
    } else if (h_unit === "ft") {
      if (isNumeric(height_cm)) {
        convert_height = height_cm * 12;
      } else {
        return { error: "Please! Check your input." };
      }
    } else if (h_unit === "in") {
      if (isNumeric(height_cm)) {
        convert_height = height_cm * 1;
      } else {
        return { error: "Please! Check your input." };
      }
    } else if (h_unit === "m") {
      if (isNumeric(height_cm)) {
        convert_height = height_cm * 39.37;
      } else {
        return { error: "Please! Check your input." };
      }
    }

    if (isNumeric(weight) && isNumeric(steps)) {
      if (weight >= 15) {
        if (convert_height >= 50) {
          let text, sp;

          if (speed === 0.9) {
            text = "2 miles/hour (3.2 km/h)";
            sp = 2.8;
          } else if (speed === 1.34) {
            text = "3 miles/hour (4.8 km/h)";
            sp = 3.5;
          } else if (speed === 1.79) {
            text = "4 miles/hour (6.4 km/h)";
            sp = 5;
          } else {
            return { error: "Invalid speed value." };
          }

          const distance = steps / 2000;
          const waqat = distance / sp;
          let time = Math.round(waqat * 60);
          const cal_burn = time * 3.5 * sp * (weight / 200);
          const cal_per = cal_burn / steps;

          const main_text =
            `<p className="mt-1">Taking ${steps} steps at this pace taesk about ${time} minutes</p>` +
            `<p className="mt-1">In some cases, taking <b>the same amount of steps at a slower pace may burn more calories</b>. However, they will be burned over a longer period of time, and most of the calories burnt are just so the body can maintain itself <b>(basal metabolism), not from the exercise!</b></p>` +
            `<p><b>Example:</b> An average man, walking at a normal pace, will take 7,000 steps in 1 hour, and he will burn 260 kcal. For a person who walks slowly, taking the same amount of steps will take 1.5 hrs, and will burn approx. 300 kcal (however this person will be burning 200 kcal per hour).</p>`;

          return {
            tech_cal_burn: cal_burn,
            tech_cal_per: cal_per,
            tech_main_text: main_text,
            tech_text: text,
          };
        } else {
          return {
            error: "This calculator is intended for those 50 cm or taller.",
          };
        }
      } else {
        return {
          error: "This calculator is intended for those 15 kg or heavier.",
        };
      }
    } else {
      return { error: "Please! Check Your Input." };
    }
  }

  /**
   * getCalculationCholesterolRatioCalculator: Service Method
   * POST: /api/calculators-lol/cholesterol-ratio-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationCholesterolRatioCalculator(body) {
    let tc = body.tech_tc;
    let tc_unit = body.tech_tc_unit;
    let hc = body.tech_hc;
    let hc_unit = body.tech_hc_unit;
    let lc = body.tech_lc;
    let lc_unit = body.tech_lc_unit;
    let tr = body.tech_tr;
    let tr_unit = body.tech_tr_unit;
    let gender = body.tech_gender;

    let param = {};

    // Convert units to mg/dL
    tc_unit = tc_unit === "mmol/L" ? 38.67 : 1;
    hc_unit = hc_unit === "mmol/L" ? 38.67 : 1;
    lc_unit = lc_unit === "mmol/L" ? 38.67 : 1;
    tr_unit = tr_unit === "mmol/L" ? 88.57 : 1;

    // Ensure values are numbers
    tc = parseFloat(tc);
    hc = parseFloat(hc);
    lc = parseFloat(lc);
    tr = parseFloat(tr);

    let ans1, ans2, ans3, ans4, ans5, ans6;

    if (!isNaN(tc) && !isNaN(hc) && !isNaN(lc) && isNaN(tr)) {
      if (tc > 0 && hc > 0 && lc > 0) {
        tc *= tc_unit;
        hc *= hc_unit;
        lc *= lc_unit;
        ans1 = tc / hc;
        ans2 = lc / hc;
        ans3 = tc;
        ans4 = hc;
        ans5 = lc;
        ans6 = (tc - hc - lc) * 5;
      } else {
        param.error = "Please! Enter Positive Value.";
        return param;
      }
    } else if (!isNaN(tc) && !isNaN(hc) && !isNaN(tr) && isNaN(lc)) {
      if (tc > 0 && hc > 0 && tr > 0) {
        tc *= tc_unit;
        hc *= hc_unit;
        tr *= tr_unit;
        ans3 = tc;
        ans4 = hc;
        ans5 = tc - hc - 0.2 * tr;
        ans2 = ans5 / hc;
        ans1 = tc / hc;
        ans6 = tr;
      } else {
        param.error = "Please! Enter Positive Value.";
        return param;
      }
    } else if (!isNaN(hc) && !isNaN(lc) && !isNaN(tr) && isNaN(tc)) {
      if (hc > 0 && lc > 0 && tr > 0) {
        hc *= hc_unit;
        lc *= lc_unit;
        tr *= tr_unit;
        ans3 = hc + lc + 0.2 * tr;
        ans1 = ans3 / hc;
        ans2 = lc / hc;
        ans4 = hc;
        ans5 = lc;
        ans6 = tr;
      } else {
        param.error = "Please! Enter Positive Value.";
        return param;
      }
    } else if (!isNaN(tc) && !isNaN(lc) && !isNaN(tr) && isNaN(hc)) {
      if (tc > 0 && lc > 0 && tr > 0) {
        tc *= tc_unit;
        lc *= lc_unit;
        tr *= tr_unit;
        ans3 = tc;
        ans4 = tc - lc - 0.2 * tr;
        ans5 = lc;
        ans6 = tr;
        ans2 = lc / ans4;
        ans1 = tc / ans4;
      } else {
        param.error = "Please! Enter Positive Value.";
        return param;
      }
    } else {
      param.error = "Please! Enter Only Three Values or Check your input.";
      return param;
    }

    return {
      tech_ans1: ans1,
      tech_ans2: ans2,
      tech_ans3: ans3,
      tech_ans4: ans4,
      tech_ans5: ans5,
      tech_ans6: ans6,
      tech_gender: gender,
    };
  }

  /**
   * getCalculationParacetamolDosageCalculator: Service Method
   * POST: /api/calculators-lol/paracetamol-dosage-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationParacetamolDosageCalculator(body) {
    let age = body.tech_age;
    let age_unit = body.tech_age_unit;
    let weight = body.tech_weight;
    let weight_unit = body.tech_weight_unit;
    let ss = body.tech_ss;
    let med_type = body.tech_med_type;
    let param = {};

    // Convert age_unit to years
    if (age_unit === "weeks") age_unit = 0.0191651;
    else if (age_unit === "months") age_unit = 0.08333;
    else if (age_unit === "years") age_unit = 1;

    // Convert weight_unit to kg
    if (weight_unit === "kg") weight_unit = 1;
    else if (weight_unit === "lbs") weight_unit = 0.453592;

    if (["1", "2", "3"].includes(med_type)) {
      if (!isNaN(weight)) {
        const weight_val = weight * weight_unit;
        let dose;

        if (["1", "2"].includes(med_type)) {
          if (weight_val >= 5 && weight_val <= 7) dose = 4;
          else if (weight_val >= 8 && weight_val < 10) dose = 5;
          else if (weight_val >= 11 && weight_val <= 14) dose = 6;
          else if (weight_val >= 15 && weight_val <= 19) dose = 9;
          else if (weight_val >= 20 && weight_val <= 24) dose = 12;
          else if (weight_val >= 25 && weight_val <= 29) dose = 15;
          else if (weight_val >= 30 && weight_val <= 34) dose = 18;
          else if (weight_val >= 35 && weight_val <= 39) dose = 21;
          else if (weight_val >= 40 && weight_val <= 44) dose = 25;
          else if (weight_val <= 0) {
            param.error = "Child weight should be a positive number.";
            return param;
          } else if (weight_val > 100) {
            param.error =
              "The maximum value for a child weight is 100 kg or 220 lb.";
            return param;
          }
        } else if (med_type === "3") {
          if (weight_val >= 35 && weight_val <= 49) dose = 1;
          else if (weight_val >= 50 && weight_val <= 64) dose = 1.5;
          else if (weight_val >= 65 && weight_val <= 100) dose = 2;
          else if (weight_val <= 0) {
            param.error = "Child weight should be a positive number.";
            return param;
          } else if (weight_val > 100) {
            param.error =
              "The maximum value for a child weight is 100 kg or 220 lb.";
            return param;
          }
        }

        if (age !== "") {
          if (!isNaN(age)) {
            const age_val = age * age_unit;
            if (med_type === "1") {
              if (age_val < 1) {
                param.error =
                  "Infant syrup is not suitable for children under the age of 2 months. Consult a doctor for individualised dosing scheme.";
                return param;
              } else if (age_val > 6) {
                param.error =
                  "For children older than 6 years, try <i>Six plus syrup</i>.";
                return param;
              }
            } else if (med_type === "2") {
              if (age_val < 6) {
                param.error =
                  "Six plus syrup is not suitable for children under the age of 6 years. Try Infant syrup.";
                return param;
              }
            } else if (med_type === "3") {
              if (age_val < 6) {
                param.error =
                  "Tablets not suitable for children under the age of 6 years. Try Infant syrup.";
                return param;
              }
            }
          } else {
            param.error = "Please! Check your input.";
            return param;
          }
        }

        if (["1", "2"].includes(med_type)) {
          if (
            (weight_val >= 45 && weight_val <= 100) ||
            (weight_val >= 1 && weight_val <= 4)
          ) {
            param.tech_line =
              "The form of medication is not suitable for chosen weight. Try a different type or consult a physician.";
          } else {
            param.tech_dose = med_type === "1" ? dose : dose / 2;
          }
        } else if (med_type === "3") {
          if (weight_val <= 34) {
            param.tech_line =
              "The form of medication is not suitable for chosen weight. Try a different type or consult a physician.";
          } else {
            param.tech_dose = dose;
          }
        }

        const fifteen = weight_val * 15;
        const sixty = weight_val * 60;

        param.tech_fifteen = fifteen > 1000 ? 1000 : fifteen;
        param.tech_sixty = sixty > 4000 ? 4000 : sixty;
      } else {
        param.error = "Please! Check your input.";
        return param;
      }
    } else if (med_type === "4") {
      if (!isNaN(weight) && !isNaN(ss)) {
        const weight_val = weight * weight_unit;

        if (weight <= 0) {
          param.error = "Child weight should be a positive number.";
          return param;
        } else if (weight > 100) {
          param.error =
            "The maximum value for a child weight is 100 kg or 220 lb.";
          return param;
        }

        if (ss < 0) {
          param.error = "Solution strength should be a positive number.";
          return param;
        } else {
          if (age !== "") {
            if (age < 0) {
              param.error =
                "The Infant/Child Age should be a whole (integer) number!";
              return param;
            } else if (age >= 18) {
              param.error =
                "Please note the infant/child age you specified is over 18 years. This calculator is suitable for infant/child age below 18 years of age.";
              return param;
            } else {
              param.tech_fifteen = weight_val * 15;
              param.tech_sixty = weight_val * 60;
              param.tech_solution_amount = param.tech_fifteen / ss;
            }
          }
        }
      } else {
        param.error = "Please! Check your input.";
        return param;
      }
    }

    param.tech_med_type = med_type;
    return param;
  }

  /**
   * getCalculationAmoxicillinPediatricDosageCalculator: Service Method
   * POST: /api/calculators-lol/amoxicillin-pediatric-dosage-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationAmoxicillinPediatricDosageCalculator(body) {
    let age = body.tech_age;
    let age_unit = body.tech_age_unit;
    let weight = body.tech_weight;
    let weight_unit = body.tech_weight_unit;
    let med_type = body.tech_med_type;
    let general_dosing = body.tech_general_dosing;
    let route = body.tech_route;
    let dosag = body.tech_dosag;

    let param = {};

    // Age unit conversion
    let ageConversion;
    if (age_unit === "Weeks") {
      ageConversion = 0.019165;
    } else if (age_unit === "Months") {
      ageConversion = 0.08333;
    } else if (age_unit === "Years") {
      ageConversion = 1;
    }

    // Weight unit conversion
    let weightConversion;
    if (weight_unit === "kg") {
      weightConversion = 1;
    } else if (weight_unit === "lbs") {
      weightConversion = 0.453592;
    } else if (weight_unit === "stone") {
      weightConversion = 6.35;
    }

    if (isNaN(weight)) {
      param.error = "Please! Check your input.";
      return param;
    }
    let weightVal = weight * weightConversion;

    // Age check
    if (age !== "") {
      if (isNaN(age)) {
        param.error = "Please! Check your input.";
        return param;
      }
      let ageVal = age * ageConversion;
      if (ageVal <= 0 || ageVal > 18) {
        param.error = "Please Enter Age Between 1 and 18.";
        return param;
      }
    }

    // Weight check
    if (weight <= 0) {
      param.error = "Weight must be greater than 0.";
      return param;
    } else if (weight >= 100) {
      param.error = "Weight cannot exceed 100 kg (220 lb).";
      return param;
    }

    let inMm, inMilli;

    // General dosing calculations
    if (general_dosing === "1") {
      let inMmValue = weightVal * 15;
      if (med_type === "1") {
        inMilli = inMmValue / 25;
      } else if (med_type === "2") {
        inMilli = inMmValue / 50;
      } else if (med_type === "3") {
        inMilli = inMmValue / 40;
      } else if (med_type === "4") {
        inMilli = inMmValue / 80;
      }
      if (route === "1") {
        inMm = inMmValue;
        inMilli = inMilli;
      } else if (route === "2") {
        inMm = inMmValue * 2;
        inMilli = inMilli * 2;
      }
    } else if (general_dosing === "2") {
      let inMmValue =
        weightVal < 15
          ? weightVal * 50
          : weight < 30
          ? 750
          : weight < 100
          ? 1000
          : 0;
      inMilli = inMmValue / 25;
      if (med_type === "2") {
        inMilli = inMmValue / 50;
      } else if (med_type === "3") {
        inMilli = inMmValue / 40;
      } else if (med_type === "4") {
        inMilli = inMmValue / 80;
      }
    } else if (general_dosing === "3") {
      let inMmValue = weightVal * 50;
      if (med_type === "1") {
        inMilli = inMmValue / 25;
      } else if (med_type === "2") {
        inMilli = inMmValue / 50;
      } else if (med_type === "3") {
        inMilli = inMmValue / 40;
      } else if (med_type === "4") {
        inMilli = inMmValue / 80;
      }
    }

    param.tech_in_mm = inMm;
    param.tech_in_milli = inMilli;
    param.tech_general_dosing = general_dosing;
    param.tech_route = route;
    param.tech_dosag = dosag;
    param.tech_w_val = weightVal;

    return param;
  }

  /**
   * getCalculationJumpRopeCalorieCalculator: Service Method
   * POST: /api/calculators-lol/jump-rope-calorie-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationJumpRopeCalorieCalculator(body) {
    let operations = body.tech_operations;
    let age = parseFloat(body.tech_age);
    let gender = body.tech_gender;
    let first = body.tech_first;
    let units1 = body.tech_units1;
    let second = body.tech_second;
    let units2 = body.tech_units2;
    let height_ft = body.tech_height_ft;
    let height_in = body.tech_height_in;
    let height_cm = body.tech_height_cm;
    let h_unit = body.tech_unit_ft_in;

    let param = {};

    try {
      // Convert weight unit to numeric code
      let unitWeight = 0;
      if (units1 == "kg") unitWeight = 1;
      else if (units1 == "lbs") unitWeight = 2;
      else if (units1 == "stone") unitWeight = 3;

      // Convert time unit to numeric code
      let unitTime = 0;
      if (units2 == "sec") unitTime = 1;
      else if (units2 == "min") unitTime = 2;
      else if (units2 == "hrs") unitTime = 3;

      // helper: time conversion
      function time2(a, b) {
        if (a == 1) return b * 0.016667;
        if (a == 2) return b * 1;
        if (a == 3) return b * 60;
        return 0;
      }

      // helper: weight conversion
      function weight(a, b) {
        if (a == 1) return b * 1;
        if (a == 2) return b * 0.4536;
        if (a == 3) return b * 6.35;
        return 0;
      }

      let firstVal = weight(unitWeight, parseFloat(first));
      let secondVal = time2(unitTime, parseFloat(second));
      if (!isNaN(firstVal) && !isNaN(secondVal)) {
        if (firstVal > 30) {
          if (firstVal < 300) {
            if (secondVal > 0) {
              let heightInches = parseFloat(height_in) || 0;
              let heightFeet = parseFloat(height_ft) || 0;

              if (h_unit == "cm") {
                heightInches = 0;
                heightFeet = height_cm / 30.48;
                heightInches = heightFeet * 12 + heightInches;
              }
              heightInches = heightFeet * 12 + heightInches;
              //  console.log(heightFeet,heightInches);
              const cbr_ans = (operations * firstVal * 7) / 400;
              const cb_ans = cbr_ans * secondVal;

              let BMR = 0;
              if (gender == "1") {
                BMR =
                  13.397 * firstVal +
                  4.799 * heightInches * 2.54 -
                  5.677 * age +
                  88.362;
              } else {
                BMR =
                  9.247 * firstVal +
                  3.098 * heightInches * 2.54 -
                  4.33 * age +
                  447.593;
              }
              // console.log(BMR,firstVal,heightInches,age);
              param = {
                tech_cbr_ans: cbr_ans,
                tech_cb_ans: cb_ans,
                tech_BMR: BMR,
                tech_met: operations,
              };
            } else {
              param.error = "Time must be more than zero.";
            }
          } else {
            param.error = "Your weight cannot be more than 660 lb (300 kg).";
          }
        } else {
          param.error = "Your weight cannot be less than 66 lb (30 kg).";
        }
      } else {
        param.error = "Please! Check your input.";
      }

      return param;
    } catch (error) {
      console.error("Jump Rope Calculator Error:", error);
      return {
        status: "fail",
        error: error.message,
      };
    }
  }

  /**
   * getCalculationBiologicalAgeCalculator: Service Method
   * POST: /api/calculators-lol/biological-age-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationBiologicalAgeCalculator(body) {
    let m1 = body.tech_m1;
    let m2 = body.tech_m2;
    let m3 = body.tech_m3;
    let m5 = body.tech_m5;
    let m6 = body.tech_m6;
    let m7 = body.tech_m7;
    let m8 = body.tech_m8;
    let m11 = body.tech_m11;
    let m12 = body.tech_m12;
    let m13 = body.tech_m13;
    let m14 = body.tech_m14;
    let m16 = body.tech_m16;
    let m17 = body.tech_m17;
    let m18 = body.tech_m18;
    let m19 = body.tech_m19;
    let m20 = body.tech_m20;
    let m21 = body.tech_m21;
    let m22 = body.tech_m22;
    let m23 = body.tech_m23;
    let m24 = body.tech_m24;
    let m27 = body.tech_m27;
    let m28 = body.tech_m28;
    let m30 = body.tech_m30;
    let m31 = body.tech_m31;
    let m34 = body.tech_m34;
    let m35 = body.tech_m35;
    let m36 = body.tech_m36;
    let age = body.tech_age;

    let param = {};

    try {
      let ageVal = parseFloat(age) || 0;

      // Base calculations
      const M =
        75.4140596125 +
        0.0618445029 * ageVal -
        0.0013020249 * Math.pow(ageVal, 2) +
        0.0000231775 * Math.pow(ageVal, 3) +
        0.0000001066 * Math.pow(ageVal, 4);

      const F =
        80.6705634463 +
        0.0374221292 * ageVal -
        0.0005304983 * Math.pow(ageVal, 2) -
        0.0000008558 * Math.pow(ageVal, 3) +
        0.0000002442 * Math.pow(ageVal, 4);

      const typ =
        Math.round(
          10 *
            (78.0916570818 +
              0.0525689171 * ageVal -
              0.0009946587 * Math.pow(ageVal, 2) +
              0.0000124103 * Math.pow(ageVal, 3) +
              0.0000001689 * Math.pow(ageVal, 4))
        ) / 10;

      let RaceAge = 0;

      // Race & Gender based calculations
      if ((m1 == "male" || m1 == "m") && m2 == "white") {
        RaceAge = M + 0.55 - 0.009964 * ageVal - 0.000027 * Math.pow(ageVal, 2);
      } else if ((m1 == "male" || m1 == "m") && m2 == "black") {
        RaceAge =
          M -
          5.592857 -
          0.01625 * ageVal +
          0.001732 * Math.pow(ageVal, 2) -
          0.000009 * Math.pow(ageVal, 3);
      } else if ((m1 == "male" || m1 == "m") && m2 == "hispanic") {
        RaceAge = M + 3.1 - 0.06975 * ageVal + 0.000338 * Math.pow(ageVal, 2);
      } else if ((m1 == "male" || m1 == "m") && m2 == "asian") {
        RaceAge = M + 6.8 - 0.153 * ageVal + 0.00085 * Math.pow(ageVal, 2);
      } else if ((m1 == "male" || m1 == "m") && m2 == "amindian") {
        RaceAge = M - 1.2 + 0.007 * ageVal + 0.0001 * Math.pow(ageVal, 2);
      } else if (
        (m1 == "male" || m1 == "m") &&
        (m2 == "other" || m2 == "oth")
      ) {
        RaceAge = M + 0;
      } else if (m1 == "female" && m2 == "white") {
        RaceAge =
          F + 0.396429 - 0.003946 * ageVal - 0.000013 * Math.pow(ageVal, 2);
      } else if (m1 == "female" && m2 == "black") {
        RaceAge =
          F -
          3.815873 -
          0.022566 * ageVal +
          0.001428 * Math.pow(ageVal, 2) -
          0.000008 * Math.pow(ageVal, 3);
      } else if (m1 == "female" && m2 == "hispanic") {
        RaceAge = F + 3.9 - 0.08775 * ageVal + 0.000488 * Math.pow(ageVal, 2);
      } else if (m1 == "female" && m2 == "asian") {
        RaceAge = F + 6.7 - 0.15075 * ageVal + 0.000838 * Math.pow(ageVal, 2);
      } else if (m1 == "female" && m2 == "amindian") {
        RaceAge = F + 2.2 - 0.0695 * ageVal + 0.000525 * Math.pow(ageVal, 2);
      } else if (m1 == "female" && (m2 == "other" || m2 == "oth")) {
        RaceAge = F + 0;
      }

      // Sectional calculations
      const RaceAdj = RaceAge - typ;
      const personalT =
        Math.round(10 * (RaceAdj + Number(m3) + Number(m5))) / 10;
      const cadT =
        Number(m6) + Number(m7) + Number(m8) + Number(m11) + Number(m12);
      const medicalIT =
        Number(m13) +
        Number(m14) +
        Number(m16) +
        Number(m17) +
        Number(m18) +
        Number(m19) +
        Number(m20);
      const dietT = Number(m21) + Number(m22) + Number(m23) + Number(m24);
      const psychT = Number(m27) + Number(m28) + Number(m30) + Number(m31);
      const safetyT = Number(m34) + Number(m35) + Number(m36);

      // Final totals
      const total_value =
        personalT + cadT + medicalIT + dietT + psychT + safetyT;

      const expectancy = Math.round(10 * (typ + total_value)) / 10;
      const healthage_value = ageVal - total_value;

      // Results
      param = {
        tech_typ: typ,
        tech_exp: expectancy,
        tech_bio: healthage_value,
        tech_per: personalT,
        tech_med: medicalIT,
        tech_saf: safetyT,
        tech_tot: total_value,
        tech_psychT: psychT,
        tech_nut: dietT,
        tech_cad: cadT,
      };

      return param;
    } catch (error) {
      console.error("Biological Age Calculator Error:", error);
      return {
        status: "fail",
        message: "Internal Server Error",
        error: error.message,
      };
    }
  }

  /**
   * getCalculationHarrisBenedictCalculator: Service Method
   * POST: /api/calculators-lol/harris-benedict-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationHarrisBenedictCalculator(body) {
    let age = body.tech_age;
    let weight = body.tech_weight;
    let height_ft = body.tech_height_ft;
    let height_in = body.tech_height_in;
    let height_cm = body.tech_height_cm;
    let unit = body.tech_unit;
    let gender = body.tech_gender;
    let activity = body.tech_activity;
    let unit_h = body.tech_unit_ft_in;

    if (
      isFinite(age) &&
      isFinite(weight) &&
      (isFinite(height_ft) || isFinite(height_in) || isFinite(height_cm))
    ) {
      // Weight Conversion
      if (unit === "lbs") {
        weight = weight / 2.205;
      } else if (unit === "stone") {
        weight = weight * 6.35;
      } else if (unit === "kg") {
        weight = weight * 1;
      }

      // Height Conversion
      if (unit_h === "ft/in") {
        height_cm = height_ft * 30.48;
        if (height_in != null) {
          height_cm += height_in * 2.54;
        }
      } else if (unit_h === "ft") {
        height_cm = height_cm * 30.48;
      } else if (unit_h === "in") {
        height_cm = height_cm * 2.54;
      } else if (unit_h === "cm") {
        height_cm = height_cm * 1;
      } else if (unit_h === "m") {
        height_cm = height_cm * 100;
      }

      let bmr_ans;
      if (gender === "female") {
        bmr_ans = Math.round(
          665.1 + 9.563 * weight + 1.85 * height_cm - 4.676 * age
        );
      } else {
        bmr_ans = Math.round(
          66.5 + 13.75 * weight + 5.003 * height_cm - 6.75 * age
        );
      }

      const pro = 15;
      const fats = 30;
      const carb = 55;

      const tee = activity * bmr_ans;
      const cal_gram = tee * 0.129598;

      const pro_gram_ans = Math.round(((pro / 100) * tee) / 4);
      const carb_gram_ans = Math.round(((carb / 100) * tee) / 4);
      const fats_gram_ans = Math.round(((fats / 100) * tee) / 4);

      const sum = pro_gram_ans + carb_gram_ans + fats_gram_ans;

      const pro_per = Math.round((pro_gram_ans / sum) * 100);
      const carb_per = Math.round((carb_gram_ans / sum) * 100);
      const fats_per = Math.round((fats_gram_ans / sum) * 100);

      return {
        tech_bmr_ans: bmr_ans,
        tech_tee: tee,
        tech_pro_gram_ans: pro_gram_ans,
        tech_carb_gram_ans: carb_gram_ans,
        tech_fats_gram_ans: fats_gram_ans,
        tech_pro_per: pro_per,
        tech_carb_per: carb_per,
        tech_fats_per: fats_per,
      };
    } else {
      return {
        error: "Please! Check your input.",
      };
    }
  }

  /**
   * getCalculationGramsTocaloriesCalculator: Service Method
   * POST: /api/calculators-lol/grams-to-calories-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationGramsTocaloriesCalculator(body) {
    let {
      tech_carbohydrate,
      tech_carbo_unit,
      tech_protein,
      tech_protein_unit,
      tech_fat,
      tech_fat_unit,
    } = body;

    tech_carbohydrate = parseFloat(tech_carbohydrate);
    tech_protein = parseFloat(tech_protein);
    tech_fat = parseFloat(tech_fat);

    const unitConversion = (unit) => {
      switch (unit) {
        case "dag":
          return 10;
        case "oz":
          return 28.35;
        default:
          return 1; // 'g' or fallback
      }
    };

    const carboMultiplier = unitConversion(tech_carbo_unit);
    const proteinMultiplier = unitConversion(tech_protein_unit);
    const fatMultiplier = unitConversion(tech_fat_unit);

    if (!isNaN(tech_carbohydrate) && !isNaN(tech_protein) && !isNaN(tech_fat)) {
      const tech_cv = tech_carbohydrate * carboMultiplier;
      const tech_pv = tech_protein * proteinMultiplier;
      const tech_fv = tech_fat * fatMultiplier;

      const tech_carbs = tech_cv * 4;
      const tech_pr = tech_pv * 4;
      const tech_cf = tech_fv * 9;
      const tech_tc = tech_carbs + tech_pr + tech_cf;

      return {
        tech_cv,
        tech_pv,
        tech_fv,
        tech_carbs,
        tech_pr,
        tech_cf,
        tech_tc,
      };
    } else {
      return {
        error: "Please! Check your input.",
      };
    }
  }

  /**
   * getCalculationCaloriesBurnedBikingCalculator: Service Method
   * POST: /api/calculators-lol/calories-burned-biking-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationCaloriesBurnedBikingCalculator(body) {
    let operations = body.tech_operations;
    let activity = body.tech_activity;
    let first = body.tech_first;
    let units1 = body.tech_units1;
    let second = body.tech_second;
    let units2 = body.tech_units2;
    let third = body.tech_third;
    let units3 = body.tech_units3;
    let met = body.tech_met;
    let height_ft = body.tech_height_ft;
    let height_in = body.tech_height_in;
    let height_cm = body.tech_height_cm;
    let unit_ft_in = body.tech_unit_ft_in;
    let gender = body.tech_gender;
    let age = body.tech_age;

    // Unit conversion: Power
    const power = (unit, value) => {
      switch (unit) {
        case "mW":
          return value / 1000;
        case "W":
          return value;
        case "kW":
          return value * 1000;
        case "BTU/h":
          return value * 0.2931;
        case "hp(l)":
          return value * 745.7;
        case "kcal/min":
          return value * 69.73;
        case "kcal/h":
          return value * 1.1622;
        default:
          return null;
      }
    };

    // Unit conversion: Weight
    const weight = (unit, value) => {
      switch (unit) {
        case "lbs":
          return value / 2.205;
        case "kg":
          return value;
        case "stone":
          return value * 6.35;
        default:
          return null;
      }
    };

    // Unit conversion: Time
    const time2 = (unit, value) => {
      switch (unit) {
        case "sec":
          return value / 3600;
        case "min":
          return value / 60;
        case "hrs":
          return value;
        case "days":
          return value * 16;
        default:
          return null;
      }
    };

    first = power(units1, first);
    second = weight(units2, second);
    third = time2(units3, third);

    if (isNaN(second) || (!height_ft && !height_in && !height_cm)) {
      return { error: "Please! Check your input." };
    }

    // Convert height to cm
    if (unit_ft_in === "ft/in") {
      height_cm = height_ft * 30.48;
      if (height_in) {
        height_cm += height_in * 2.54;
      }
    } else if (unit_ft_in === "ft") {
      height_cm *= 30.48;
    } else if (unit_ft_in === "in") {
      height_cm *= 2.54;
    } else if (unit_ft_in === "m") {
      height_cm *= 100;
    } else if (unit_ft_in === "cm") {
      height_cm = height_cm;
    }

    // BMR Calculation
    let bmr_ans;
    if (gender === "female") {
      bmr_ans = Math.round(
        665.1 + 9.563 * second + 1.85 * height_cm - 4.676 * age
      );
    } else {
      bmr_ans = Math.round(
        66.5 + 13.75 * second + 5.003 * height_cm - 6.75 * age
      );
    }

    let calories, w_loss;

    if (operations === "Yes") {
      if (!isNaN(first) && !isNaN(third)) {
        calories = (first * third) / 4.18 / 0.24;
        w_loss = calories / 7700;
      } else {
        return { error: "Please! Check your input." };
      }
    } else if (operations === "No") {
      if (!isNaN(second) && !isNaN(met) && !isNaN(third)) {
        calories = (third * 60 * met * 3.5 * second) / 200;
        w_loss = calories / 7700;
      } else {
        return { error: "Please! Check your input." };
      }
    }

    const exercise = met * third;

    return {
      tech_bmr_ans: bmr_ans,
      tech_calories: calories,
      tech_w_loss: w_loss,
      tech_exercise: exercise,
    };
  }

  /**
   * getCalculationBinCreatinineRatioCalculator: Service Method
   * POST: /api/calculators-lol/bun-creatinine-ratio-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationBinCreatinineRatioCalculator(body) {
    let { tech_bun, tech_bun_unit, tech_serum, tech_serum_unit } = body;

    tech_bun = parseFloat(tech_bun);
    tech_serum = parseFloat(tech_serum);

    // Convert BUN unit to mg/dL
    let bunMultiplier = tech_bun_unit === "mmol/L" ? 2.778 : 1;

    // Convert Serum Creatinine unit to mg/dL
    let serumMultiplier = tech_serum_unit === "μmol/L" ? 0.011312 : 1;

    if (!isNaN(tech_bun) && !isNaN(tech_serum)) {
      if (tech_bun > 0 && tech_serum > 0) {
        const bv = tech_bun * bunMultiplier;
        const sv = tech_serum * serumMultiplier;
        const ans = bv / sv;

        return {
          tech_ans: ans,
        };
      } else {
        return {
          error: "Please! Enter Positive Value.",
        };
      }
    } else {
      return {
        error: "Please! Check your input.",
      };
    }
  }

  /**
   * getCalculationTacoBarCalculator: Service Method
   * POST: /api/calculators-lol/taco-bar-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationTacoBarCalculator(body) {
    const first = parseFloat(body.tech_first);
    const second = parseFloat(body.tech_second);

    if (!isNaN(first)) {
      if (first > 0) {
        const result = {
          tech_meat_mass: first * second,
          tech_cheddar_cheese: 35.44 * first,
          tech_monterey_cheese: 21.262 * first,
          tech_sour_cream: 56.7 * first,
          tech_guacamole: 51.03 * first,
          tech_taco_sauce: 65.02 * first,
          tech_pico_de_gallo: 45.36 * first,
          tech_lettuce: 36.854 * first,
          tech_onions: 25.515 * first,
          tech_beans: 31.184 * first,
          tech_refried_beans: 62.37 * first,
          tech_tomatoes: 51.03 * first,
          tech_olives: 22.62 * first,
          tech_bell_pepper: 56.7 * first,
          tech_taco_shells: 2 * first,
          tech_tortillas: first,
          tech_rice: 70.87 * first,
        };
        return result;
      } else {
        return { error: "Number of people must be greater than 0." };
      }
    } else {
      return { error: "Please! Check Your Input." };
    }
  }

  /**
   * getCalculationPregnancyWeightGainCalculator: Service Method
   * POST: /api/calculators-lol/pregnancy-weight-gain-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationPregnancyWeightGainCalculator(body) {
    let height_ft = body.tech_height_ft;
    let height_in = body.tech_height_in;
    let height_cm = body.tech_height_cm;
    let h_unit = body.tech_unit_ft_in;
    let weight = body.tech_weight;
    let w_unit = body.tech_w_unit;
    let week = body.tech_week;
    let activity = body.tech_activity;

    let param = {};
    let check = false;

    // --- Unit conversion for weight ---
    let weightUnit;
    if (w_unit == "lbs") {
      weightUnit = 0.453592;
    } else if (w_unit == "oz") {
      weightUnit = 0.0283495;
    } else if (w_unit == "kg") {
      weightUnit = 1;
    } else if (w_unit == "stone") {
      weightUnit = 6.35029;
    }

    // --- Full data array copied as-is ---
    const data = [
      [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0.09, 0.4, 0.09, 0.4, 0.09, 0.4, 0.09, 0.4],
        [0.2, 0.7, 0.2, 0.7, 0.2, 0.7, 0.2, 0.7],
        [0.3, 1.1, 0.3, 1.1, 0.3, 1.1, 0.3, 1.1],
        [0.4, 1.5, 0.4, 1.5, 0.4, 1.5, 0.4, 1.5],
        [0.5, 1.8, 0.5, 1.8, 0.5, 1.8, 0.5, 1.8],
        [0.6, 2.2, 0.6, 2.2, 0.6, 2.2, 0.6, 2.2],
        [0.6, 2.6, 0.6, 2.6, 0.6, 2.6, 0.6, 2.6],
        [0.7, 2.9, 0.7, 2.9, 0.7, 2.9, 0.7, 2.9],
        [0.8, 3.3, 0.8, 3.3, 0.8, 3.3, 0.8, 3.3],
        [0.9, 3.7, 0.9, 3.7, 0.9, 3.7, 0.9, 3.7],
        [1, 4, 1, 4, 1, 4, 1, 4],
        [1.1, 4.4, 1.1, 4.4, 1.1, 4.4, 1.1, 4.4],
        [2.1, 5.7, 2, 5.5, 1.6, 5.2, 1.5, 5],
        [3.1, 7, 2.9, 6.7, 2.1, 5.9, 1.8, 5.6],
        [4.1, 8.4, 3.8, 7.8, 2.6, 6.7, 2.2, 6.1],
        [5.1, 9.6, 4.6, 8.9, 3.2, 7.5, 2.6, 6.7],
        [6.1, 11, 5.5, 10.1, 3.7, 8.2, 2.9, 7.3],
        [7.1, 12.3, 6.4, 11.2, 4.2, 9, 3.3, 7.9],
        [8.1, 13.6, 7.3, 12.3, 4.7, 9.7, 3.7, 8.4],
        [9.1, 14.9, 8.2, 13.5, 5.2, 10.5, 4, 9],
        [10.1, 16.3, 9.1, 14.6, 5.7, 11.3, 4.4, 9.6],
        [11.1, 17.6, 10, 15.7, 6.2, 12, 4.8, 10.2],
        [12.1, 18.9, 10.8, 16.9, 6.8, 12.8, 5.1, 10.8],
        [13.1, 20.2, 11.7, 18, 7.3, 13.6, 5.5, 11.3],
        [14.1, 21.5, 12.6, 19.1, 7.8, 14.3, 5.9, 11.9],
        [15, 22.9, 13.5, 20.3, 8.3, 15.1, 6.2, 12.5],
        [16, 24.2, 14.4, 21.4, 8.8, 15.8, 6.6, 13.1],
        [17, 25.5, 15.3, 22.5, 9.3, 16.6, 7, 13.6],
        [18, 26.8, 16.1, 23.7, 9.9, 17.4, 7.3, 14.2],
        [19, 28.1, 17, 24.8, 10.4, 18.1, 7.7, 14.8],
        [20, 29.5, 17.9, 25.9, 10.9, 18.9, 8.1, 15.4],
        [21, 30.8, 18.8, 27.1, 11.4, 19.7, 8.4, 16],
        [22, 32.1, 19.7, 28.2, 11.9, 20.4, 8.8, 16.5],
        [23, 33.4, 20.6, 29.3, 12.4, 21.2, 9.2, 17.1],
        [24, 34.7, 21.5, 30.5, 12.9, 21.9, 9.5, 17.7],
        [25, 36, 22.3, 31.6, 13.5, 22.7, 9.9, 18.3],
        [26, 37.4, 23.2, 32.7, 14, 23.5, 10.3, 18.8],
        [27, 38.7, 24.1, 33.9, 14.5, 24.2, 10.6, 19.4],
        [28, 40, 25, 35, 15, 25, 11, 20],
      ],
      [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0.09, 0.4, 0.09, 0.4, 0.09, 0.4, 0.09, 0.4],
        [0.2, 0.7, 0.2, 0.7, 0.2, 0.7, 0.2, 0.7],
        [0.3, 1.1, 0.3, 1.1, 0.3, 1.1, 0.3, 1.1],
        [0.4, 1.5, 0.4, 1.5, 0.4, 1.5, 0.4, 1.5],
        [0.5, 1.8, 0.5, 1.8, 0.5, 1.8, 0.5, 1.8],
        [0.6, 2.2, 0.6, 2.2, 0.6, 2.2, 0.6, 2.2],
        [0.6, 2.6, 0.6, 2.6, 0.6, 2.6, 0.6, 2.6],
        [0.7, 2.9, 0.7, 2.9, 0.7, 2.9, 0.7, 2.9],
        [0.8, 3.3, 0.8, 3.3, 0.8, 3.3, 0.8, 3.3],
        [0.9, 3.7, 0.9, 3.7, 0.9, 3.7, 0.9, 3.7],
        [1, 4, 1, 4, 1, 4, 1, 4],
        [1.1, 4.4, 1.1, 4.4, 1.1, 4.4, 1.1, 4.4],
        [2.4, 6.2, 2.4, 6.2, 2.2, 6.1, 2, 5.8],
        [3.8, 8.1, 3.8, 8.1, 3.3, 7.8, 2.9, 7.2],
        [5.1, 9.9, 5.1, 9.9, 4.4, 9.5, 3.8, 8.6],
        [6.4, 11.7, 6.4, 11.7, 5.5, 11.2, 4.6, 10],
        [7.7, 13.6, 7.7, 13.6, 6.6, 12.8, 5.5, 11.4],
        [9.1, 15.4, 9.1, 15.4, 7.7, 14.5, 6.4, 12.8],
        [10.4, 17.3, 10.4, 17.3, 8.9, 16.2, 7.3, 14.1],
        [11.7, 19.1, 11.7, 19.1, 10, 17.9, 8.2, 15.5],
        [13.1, 20.9, 13.1, 20.9, 11.1, 19.6, 9.1, 16.9],
        [14.4, 22.8, 14.4, 22.8, 12.2, 21.3, 10, 18.3],
        [15.7, 24.6, 15.7, 24.6, 13.3, 23, 10.8, 19.7],
        [17.1, 26.4, 17.1, 26.4, 14.4, 24.7, 11.7, 21.1],
        [18.4, 28.3, 18.4, 28.3, 15.5, 26.4, 12.6, 22.5],
        [19.7, 30.1, 19.7, 30.1, 16.6, 28, 13.5, 23.9],
        [21, 32, 21, 32, 17.7, 29.7, 14.4, 25.3],
        [22.4, 33.8, 22.4, 33.8, 18.8, 31.4, 15.3, 26.7],
        [23.7, 35.6, 23.7, 35.6, 19.9, 33.1, 16.1, 28.1],
        [25, 37.5, 25, 37.5, 21, 34.8, 17, 29.5],
        [26.4, 39.3, 26.4, 39.3, 22.1, 36.5, 17.9, 30.9],
        [27.7, 41.1, 27.7, 41.1, 23.2, 38.2, 18.8, 32.3],
        [29, 43, 29, 43, 24.4, 39.9, 19.7, 33.6],
        [30.4, 44.8, 30.4, 44.8, 25.5, 41.6, 20.6, 35],
        [31.7, 46.7, 31.7, 46.7, 26.6, 43.2, 21.5, 36.4],
        [33, 48.5, 33, 48.5, 27.7, 44.9, 22.3, 37.8],
        [34.3, 50.3, 34.3, 50.3, 28.8, 46.6, 23.2, 39.2],
        [35.7, 52.2, 35.7, 52.2, 29.9, 48.3, 24.1, 40.6],
        [37, 54, 37, 54, 31, 50, 25, 42],
      ],
    ];

    // --- Input validation ---
    if (
      (h_unit == "ft/in" && !isNaN(weight) && !isNaN(height_ft)) ||
      (h_unit != "ft/in" &&
        !isNaN(weight) &&
        (!isNaN(height_in) || !isNaN(height_cm)))
    ) {
      check = true;
    }

    if (!check) {
      param.error = "Please! Check your input.";
      return param;
    }

    // --- Convert units ---
    let weight_kg = weight * weightUnit;
    let heightInInches;

    if (h_unit == "cm") {
      height_in = 0;
      height_ft = height_cm / 30.48;
      height_in = parseFloat(height_ft) * 12 + parseFloat(height_in);
    }

    height_in = parseFloat(height_ft) * 12 + parseFloat(height_in);
    const height_m = height_in / 39.37;
    const BMI = +(weight_kg / height_m ** 2).toFixed(2);
    console.log(BMI, weight_kg, height_m);
    // --- Determine category ---
    let you_are, category;
    if (BMI <= 18.5) {
      you_are = "Underweight";
      category = 1;
    } else if (BMI <= 24.9) {
      you_are = "Normal Weight";
      category = 2;
    } else if (BMI <= 29.9) {
      you_are = "Excess Weight";
      category = 3;
    } else if (BMI <= 35) {
      you_are = "Obesity";
      category = 4;
    } else {
      you_are = "Extremely Obesity";
      category = 4;
    }

    // --- Compute gain ---
    const offset = 2 * (category - 1);
    const offset_min = 2 * (category - 1) + parseInt(activity);

    const min_weight = data[0][week - 1][offset_min];
    const max_weight = data[1][week - 1][offset_min];

    const min_weight_gain = +(min_weight / 2.205).toFixed(1);
    const max_weight_gain = +(max_weight / 2.205).toFixed(1);

    const min_weight_ans = +(weight_kg + min_weight_gain).toFixed(1);
    const max_weight_ans = +(weight_kg + max_weight_gain).toFixed(1);

    const gain = [];
    const all = [];

    for (const value of data[activity]) {
      const min = value[offset];
      const max = value[offset + 1];
      gain.push(`${min} - ${max} kg`);
      all.push(
        `${(weight_kg + min).toFixed(1)} - ${(weight_kg + max).toFixed(1)} kg`
      );
    }

    // --- Response ---
    param.tech_min_weight_ans = min_weight_ans;
    param.tech_max_weight_ans = max_weight_ans;
    param.tech_min_weight_gain = min_weight_gain;
    param.tech_max_weight_gain = max_weight_gain;
    param.tech_BMI = BMI;
    param.tech_you_are = you_are;
    param.tech_gain = gain;
    param.tech_all = all;

    return param;
  }

  /**
   * getCalculationTreadmillCalorieCalculator: Service Method
   * POST: /api/calculators-lol/treadmill-calorie-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationTreadmillCalorieCalculator(body) {
    let gradient = body.tech_gradient;
    let weight = body.tech_weight;
    let weight_unit = body.tech_weight_unit;
    let speed = body.tech_speed;
    let speed_unit = body.tech_speed_unit;
    let distance = body.tech_distance;
    let distance_unit = body.tech_distance_unit;
    let time = body.tech_time;

    let result = {};

    if (gradient < -0.001) {
      result.error = "Please input the gradient above 0.";
      return result;
    }
    if (speed < 0) {
      result.error = "Please input the speed above 0.";
      return result;
    }
    if (time < 0) {
      result.error = "Please input the running-time(min) above 0.";
      return result;
    }
    if (distance < 0) {
      result.error = "Please input the running-distance(Mile/Km) above 0.";
      return result;
    }
    if (weight < 0) {
      result.error = "Please input the weight(lbs/Kg) above 0.";
      return result;
    }

    if (
      typeof speed === "number" &&
      typeof distance === "number" &&
      typeof time === "number"
    ) {
      result.error =
        "Speed, Time, and the Distance cannot be specified at the same time.";
      return result;
    }

    if (
      (!speed && !distance && !time) ||
      (!distance && !time) ||
      (!speed && !time) ||
      (!distance && !speed)
    ) {
      result.error = "Please! Check your Input.";
      return result;
    }

    if (typeof gradient === "number" && typeof weight === "number") {
      let speed_mph, speed_kmh, distance_m, distance_km, time_ans;

      if (typeof speed === "number" && typeof distance === "number") {
        if (speed_unit === "km/h" || distance_unit === "km") {
          speed_mph = speed / 1.609;
          distance_m = distance / 1.609;
          speed_kmh = speed;
          distance_km = distance;
        } else {
          speed_kmh = speed * 1.609;
          distance_km = distance * 1.609;
          speed_mph = speed;
          distance_m = distance;
        }
        time_ans = (distance_m / speed_mph) * 60;
      } else if (typeof speed === "number" && typeof time === "number") {
        if (speed_unit === "km/h") {
          speed_mph = speed / 1.609;
          speed_kmh = speed;
        } else {
          speed_kmh = speed * 1.609;
          speed_mph = speed;
        }
        time_ans = time / 60;
        distance_m = speed_mph * time_ans;
        distance_km = distance_m * 1.609;
      } else if (typeof distance === "number" && typeof time === "number") {
        if (distance_unit === "km") {
          distance_m = distance / 1.609;
          distance_km = distance;
        } else {
          distance_km = distance * 1.609;
          distance_m = distance;
        }
        time_ans = time / 60;
        speed_mph = distance_m / time_ans;
        speed_kmh = speed_mph * 1.609;
      }

      let weight_kg = weight_unit === "lbs" ? weight / 2.205 : weight;
      let speed_mph_sec = speed_mph + (speed_mph * gradient * 9) / 200;
      let speed_kmh_sec = speed_kmh + (speed_kmh * gradient * 9) / 200;
      let distance_m_sec = (speed_mph_sec * time_ans) / 60;
      let distance_km_sec = (speed_kmh_sec * time_ans) / 60;
      let y0 = speed_kmh + (speed_kmh * gradient * 9) / 200;

      let cal = (((y0 * 1000) / 60 + 17.5) * time_ans * weight_kg) / 1000;
      let fat = cal / 7 / 2;
      let fatoz_ans = fat / 28.3495;
      let fatg_ans = fat;
      let mets = (cal / weight_kg / time_ans) * 60;
      let energy_kj = 4.184 * cal;
      let energy_kw_ans = energy_kj / 3600;
      let electric_heater_ans = 60 * energy_kw_ans;
      let light_bulb_ans = (electric_heater_ans * 10) / 60;
      let cburger_ans = cal / 310;
      let beer2_ans = cal / 153.1;
      let cleanning_ans = (cal / 1.59 / weight) * 60;
      let shop_ans = cal / 2.5;

      let meter_dash_ans = 360 / y0;
      let meter_run_h_ans = Math.floor(600 / y0);
      let meter_run_m_ans = (600 / y0 - meter_run_h_ans) * 60;

      let half_marathon = (21.095 * 60) / y0;
      let half_marathonh = Math.floor(half_marathon / 60);
      let half_marathonm = Math.floor(half_marathon - half_marathonh * 60);
      let half_marathons =
        (half_marathon - half_marathonh * 60 - half_marathonm) * 60;

      let marathon = (42.195 * 60) / y0;
      let marathonh = Math.floor(marathon / 60);
      let marathonm = Math.floor(marathon - marathonh * 60);
      let marathons = (marathon - marathonh * 60 - marathonm) * 60;
      let myrecord = marathon / 60;
      let record_ans = (2.0275 / myrecord) * 100;

      result = {
        tech_speed_mph: Number(speed_mph.toFixed(1)),
        tech_speed_kmh: Number(speed_kmh.toFixed(1)),
        tech_time_ans: Number(time_ans.toFixed(1)),
        tech_distance_m: Number(distance_m.toFixed(1)),
        tech_distance_km: Number(distance_km.toFixed(1)),
        tech_speed_mph_sec: Number(speed_mph_sec.toFixed(1)),
        tech_speed_kmh_sec: Number(speed_kmh_sec.toFixed(1)),
        tech_distance_m_sec: Number(distance_m_sec.toFixed(1)),
        tech_distance_km_sec: Number(distance_km_sec.toFixed(1)),
        tech_cal: Number(cal.toFixed(1)),
        tech_fatoz_ans: Number(fatoz_ans.toFixed(1)),
        tech_fatg_ans: Number(fatg_ans.toFixed(1)),
        tech_mets: Number(mets.toFixed(1)),
        tech_energy_kw_ans: Number(energy_kw_ans.toFixed(1)),
        tech_electric_heater_ans: Number(electric_heater_ans.toFixed(1)),
        tech_light_bulb_ans: Number(light_bulb_ans.toFixed(1)),
        tech_cburger_ans: Number(cburger_ans.toFixed(1)),
        tech_beer2_ans: Number(beer2_ans.toFixed(1)),
        tech_shop_ans: Number(shop_ans.toFixed(1)),
        tech_cleanning_ans: Number(cleanning_ans.toFixed(1)),
        tech_meter_dash_ans: Number(meter_dash_ans.toFixed(1)),
        tech_meter_run_h_ans: Number(meter_run_h_ans.toFixed(1)),
        tech_meter_run_m_ans: Number(meter_run_m_ans.toFixed(1)),
        tech_half_marathonh: Number(half_marathonh.toFixed(1)),
        tech_half_marathonm: Number(half_marathonm.toFixed(1)),
        tech_half_marathons: Number(half_marathons.toFixed(1)),
        tech_marathonh: Number(marathonh.toFixed(1)),
        tech_marathonm: Number(marathonm.toFixed(1)),
        tech_marathons: Number(marathons.toFixed(1)),
        tech_record_ans: Number(record_ans.toFixed(1)),
        tech_gradient: gradient,
      };
      return result;
    } else {
      result.error = "Please! Check Your Input.";
      return result;
    }
  }

  /**
   * getCalculationRuckingCaloriesCalculator: Service Method
   * POST: /api/calculators-lol/rucking-calorie-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationRuckingCaloriesCalculator(body) {
    const activities = body.tech_activities;
    const weight = body.tech_weight;
    const time = body.tech_time;

    const isNumeric = (val) => !isNaN(parseFloat(val)) && isFinite(val);

    let results = {};

    if (isNumeric(activities) && isNumeric(weight) && isNumeric(time)) {
      // Convert weight from pounds to kilograms
      const weightInKg = weight / 2.205;

      // Calculate the calories
      const calories = activities * weightInKg * time;

      // Store the results
      results.tech_calories = Math.round(calories);
    } else {
      results.error = "Please! Check Your Input.";
    }

    return results;
  }

  /**
   * getCalculationWalkingCalorieCalculator: Service Method
   * POST: /api/calculators-lol/walking-calorie-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationWalkingCalorieCalculator(body) {
    let unit_type = body.tech_unit_type?.trim();
    let age = parseFloat(body.tech_age);
    let gender = body.tech_gender?.trim();
    let height = parseFloat(body.tech_height);
    let inches = parseFloat(body.tech_inches);
    let weight = parseFloat(body.tech_weight);
    let speed_unit = body.tech_speed_unit?.trim();
    let mets = parseFloat(body.tech_mets);
    let duration = parseFloat(body.tech_duration);

    let result = {};
    // Helper functions
    function getSpeedKmh(speed_unit) {
      switch (speed_unit) {
        case "less than 2.0mph (3.2km/h)":
        case "2.0mph (3.2km/h)":
          return 3.2;
        case "2.5mph (4.0km/h)":
          return 4.0;
        case "3.0mph (4.8km/h)":
          return 4.8;
        case "3.5mph (5.6km/h)":
          return 5.6;
        case "4.0mph (6.4km/h)":
          return 6.4;
        case "4.5mph (7.2km/h)":
          return 7.2;
        default:
          return 8.0;
      }
    }

    function getSpeedMph(speed_unit) {
      switch (speed_unit) {
        case "less than 2.0mph (3.2km/h)":
        case "2.0mph (3.2km/h)":
          return 2.0;
        case "2.5mph (4.0km/h)":
          return 2.5;
        case "3.0mph (4.8km/h)":
          return 3.0;
        case "3.5mph (5.6km/h)":
          return 3.5;
        case "4.0mph (6.4km/h)":
          return 4.0;
        case "4.5mph (7.2km/h)":
          return 4.5;
        default:
          return 5.0;
      }
    }
    if (unit_type === "sl") {
      if (
        isFinite(age) &&
        isFinite(height) &&
        isFinite(weight) &&
        isFinite(mets) &&
        isFinite(duration)
      ) {
        let male_calories;
        if (gender === "male") {
          male_calories =
            88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
        } else {
          male_calories =
            447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
        }

        let exercise = (duration * mets) / 60;
        let hour_duration = duration / 60;

        let speed_kmh = getSpeedKmh(speed_unit);
        let speed_mph = getSpeedMph(speed_unit);

        let hour_duration_min = hour_duration * speed_kmh;
        let hour_mile = hour_duration * speed_mph;

        let burned = Math.round((male_calories * mets * hour_duration) / 24);

        result = {
          tech_male_calories: male_calories,
          tech_exercise: exercise,
          tech_hour_duration_min: hour_duration_min,
          tech_hour_mile: hour_mile,
          tech_burned: burned,
        };
      } else {
        result = { error: "Please! Check Your Input." };
      }
    } else {
      if (
        isFinite(age) &&
        isFinite(height) &&
        isFinite(weight) &&
        isFinite(mets) &&
        isFinite(duration) &&
        isFinite(inches)
      ) {
        let heig_ft = height * 30.48;
        let heig_in = inches * 2.54;
        height = heig_ft + heig_in;
        weight = weight / 2.205;

        let male_calories;
        if (gender === "male") {
          male_calories =
            88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
        } else {
          male_calories =
            447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
        }

        let exercise = (duration * mets) / 60;
        let hour_duration = duration / 60;

        let speed_kmh = getSpeedKmh(speed_unit);
        let speed_mph = getSpeedMph(speed_unit);

        let hour_duration_min = hour_duration * speed_kmh;
        let hour_mile = hour_duration * speed_mph;

        let burned = Math.round((male_calories * mets * hour_duration) / 24);

        result = {
          tech_male_calories: male_calories,
          tech_exercise: exercise,
          tech_hour_duration_min: hour_duration_min,
          tech_hour_mile: hour_mile,
          tech_burned: burned,
        };
      } else {
        result = { error: "Please! Check Your Input." };
      }
    }

    return result;
  }

  /**
   * getCalculationEllipticalCalorieCalculator: Service Method
   * POST: /api/calculators-lol/elliptical-calorie-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationEllipticalCalorieCalculator(body) {
    let weight = String(body.tech_weight).trim();
    let weightUnit = String(body.tech_weight_unit).trim();
    let time = String(body.tech_time).trim();
    let hour = String(body.tech_hour).trim();
    let min = String(body.tech_min).trim();
    let timeUnit = String(body.tech_unit_hrs_min).trim();
    let effort = String(body.tech_effort).trim();
    let effortUnit = String(body.tech_effort_unit).trim();

    const response = {};

    if ((!hour || hour === "0") && (!min || min === "0")) {
      response.error = "Please! Check Your Input.";
      return response;
    }

    hour = hour ? parseFloat(hour) : 0;
    min = min ? parseFloat(min) : 0;

    if (weightUnit === "kg") {
      weight = parseFloat(weight);
    } else if (weightUnit === "lbs") {
      weight = parseFloat(weight) * 2.205;
    } else if (weightUnit === "stone") {
      weight = parseFloat(weight) / 6.35;
    }

    if (timeUnit === "sec") {
      time = parseFloat(time);
    } else if (timeUnit === "min") {
      time = parseFloat(time) * 60;
    } else if (timeUnit === "hrs") {
      time = parseFloat(time) * 3600;
    } else if (timeUnit === "hrs/min") {
      time = hour * 3600 + min * 60;
    }

    if (effortUnit === "Light (MET = 4.6)") {
      effort = 4.6;
    } else if (effortUnit === "Moderate (MET = 4.9)") {
      effort = 4.9;
    } else if (effortUnit === "Vigorous (MET = 5.7)") {
      effort = 5.7;
    } else if (effortUnit === "Custom (enter MET value)") {
      effort = parseFloat(effort);
    }

    if (isFinite(weight) && isFinite(time) && isFinite(effort)) {
      const answer = (time * effort * 3.5 * weight) / (200 * 60);
      const subAnswer = (60 * effort * 3.5 * weight) / 200;

      response.tech_weight = weight;
      response.tech_time = time;
      response.tech_answer = answer;
      response.tech_sub_answer = subAnswer;
      return response;
    } else {
      response.error = "Please! Check Your Input.";
      return response;
    }
  }

  /**
   * getCalculationBulkingCalculator: Service Method
   * POST: /api/calculators-lol/bulking-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationBulkingCalculator(body) {
    let age = Number(body.tech_age);
    let heightFt = Number(body.tech_height_ft);
    let heightCm = Number(body.tech_height_cm);
    let weight = Number(body.tech_weight);
    let perCal = Number(body.tech_per_cal);
    let gender = String(body.tech_gender);
    let percent = Number(body.tech_percent);
    let activity = String(body.tech_activity);
    let stype = String(body.tech_stype);
    let start = String(body.tech_start);
    let target = String(body.tech_target);
    let weight1 = Number(body.tech_weight1);
    let surplus = String(body.tech_surplus);
    let kalDay = Number(body.tech_kal_day);
    let submit = String(body.tech_unit_type);

    const response = {};
    const want = "2";

    if (
      !isFinite(age) ||
      !isFinite(weight) ||
      !isFinite(weight1) ||
      !start ||
      !target
    ) {
      response.error = "Please fill All Fields.";
      return response;
    }

    let heightIn, unit;
    if (submit === "imperial") {
      heightIn = heightFt * 2.54;
      weight = weight / 2.205;
      weight1 = weight1 / 2.205;
      unit = "lbs";
    } else {
      if (isFinite(heightCm)) {
        heightIn = heightCm;
        unit = "kg";
      } else {
        response.error = "Please enter height.";
        return response;
      }
    }

    let BMR, Robinson, Miller, Devine, Hamwi, tdee;
    if (gender === "Male") {
      BMR = Math.round(
        10 * Math.round(weight) + 6.25 * Math.round(heightCm) - 5 * age + 5
      );
      if (activity === "sedentary") tdee = Math.round(BMR * 1.1);
      else if (activity === "Lightly_Active") tdee = Math.round(BMR * 1.2);
      else if (activity === "Moderately_Active") tdee = Math.round(BMR * 1.4);
      else if (activity === "Very_Active") tdee = Math.round(BMR * 1.6);
      else tdee = Math.round(BMR * 1.8);

      Robinson = Math.round(49 + 1.7 * (heightIn - 60));
      Miller = Math.round(53.1 + 1.36 * (heightIn - 60));
      Devine = Math.round(45.5 + 2.3 * (heightIn - 60));
      Hamwi = Math.round(45 + 2.2 * (heightIn - 60));
    } else {
      BMR = Math.round(10 * weight + 6.25 * heightCm - 5 * age - 161);
      if (activity === "sedentary") tdee = Math.round(BMR * 1.1);
      else if (activity === "Lightly_Active") tdee = Math.round(BMR * 1.2);
      else if (activity === "Moderately_Active") tdee = Math.round(BMR * 1.4);
      else if (activity === "Very_Active") tdee = Math.round(BMR * 1.6);
      else tdee = Math.round(BMR * 1.8);

      Robinson = Math.round(52 + 1.9 * (heightIn - 60));
      Miller = Math.round(56.2 + 1.41 * (heightIn - 60));
      Devine = Math.round(50 + 2.3 * (heightIn - 60));
      Hamwi = Math.round(48 + 2.7 * (heightIn - 60));
    }

    if (percent) {
      const lbm = (weight * (100 - percent)) / 100;
      BMR = Math.round(370 + 21.6 * lbm);
    }

    const heightM = heightIn / 39.37;
    const BMI = Math.round((weight / (heightM * heightM)) * 100) / 100;

    let youAre = "";
    if (BMI <= 18.5) youAre = "Underweight";
    else if (BMI > 18.5 && BMI <= 24.9) youAre = "Normal Weight";
    else if (BMI > 24.9 && BMI <= 29.9) youAre = "Overweight";
    else if (BMI > 29.9 && BMI <= 35) youAre = "Obesity";
    else youAre = "Severe Obesity";

    const ibw =
      submit === "imperial"
        ? `${Math.round(Robinson * 2.205)}-${Math.round(Hamwi * 2.205)} lbs`
        : `${Robinson}-${Hamwi} kg`;

    const startDate = DateTime.fromISO(start);
    const targetDate = DateTime.fromISO(target);

    if (!startDate.isValid || !targetDate.isValid) {
      response.error = "Please Enter Start and Target Date.";
      return response;
    }

    if (startDate >= targetDate) {
      response.error = "Target Date must be later than start date.";
      return response;
    }

    const days = targetDate.diff(startDate, "days").days;
    const poundsDaily = Math.round((weight1 / days) * 100) / 100;
    const highRiskWeight = poundsDaily > 0.3;

    let caloriesGain;
    if (surplus === "custom") {
      if (stype === "Incal") {
        caloriesGain = kalDay;
      } else {
        caloriesGain = tdee * (perCal / 100);
      }
    } else {
      if (surplus === "0.10") caloriesGain = tdee * 0.1;
      else if (surplus === "0.15") caloriesGain = tdee * 0.15;
      else caloriesGain = tdee * 0.2;
    }

    const caloriesDaily = Math.round(tdee + caloriesGain);
    const highRiskCalories = caloriesDaily < 1200;

    const goal =
      submit === "imperial"
        ? Math.round(weight + weight1)
        : Math.round(((weight + weight1) / 2.205) * 100) / 100;

    const fat = Math.round((caloriesDaily / 9) * 0.2);
    const protein = Math.round((caloriesDaily / 4) * 0.3);
    const carbs = Math.round((caloriesDaily / 4) * 0.5);

    return {
      tech_HighRiskWeight: highRiskWeight,
      tech_PoundsDaily: poundsDaily,
      tech_HighRiskCalories: highRiskCalories,
      tech_CaloriesDaily: caloriesDaily,
      tech_CaloriesLess: Math.round(caloriesGain),
      tech_Calories: tdee,
      tech_Goal: goal,
      tech_days: days,
      tech_BMR: BMR,
      tech_BMI: BMI,
      tech_you_are: youAre,
      tech_lbm: percent
        ? Math.round((weight * (100 - percent)) / 100)
        : undefined,
      tech_ibw: ibw,
      tech_fat: fat,
      tech_po: protein,
      tech_cb: carbs,
      tech_want: want,
      tech_unit: unit,
    };
  }

  /**
   * getCalculationFoodCostCalculator: Service Method
   * POST: /api/calculators-lol/food-cost-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationFoodCostCalculator(body) {
    let food_type = body.tech_food_type;
    let menu = body.tech_menu;
    let measure_unit = body.tech_measure_unit;
    let units_case = body.tech_units_case;
    let cost_unit = body.tech_cost_unit;
    let serving_size = body.tech_serving_size;
    let other = body.tech_other;
    let menu_price = body.tech_menu_price;

    let response = {};

    // Convert to numbers
    menu = Number(menu);
    units_case = Number(units_case);
    cost_unit = Number(cost_unit);
    serving_size = Number(serving_size);
    other = Number(other);
    menu_price = Number(menu_price);

    if (
      isNaN(menu) ||
      isNaN(units_case) ||
      isNaN(cost_unit) ||
      isNaN(serving_size) ||
      isNaN(other) ||
      isNaN(menu_price)
    ) {
      response.error = "Please! Check Your Input.";
      return response;
    }

    let costPerUnit;
    if (food_type === "food_piece") {
      costPerUnit = cost_unit;
    } else {
      if (units_case > 0 && cost_unit > 0) {
        costPerUnit = Math.round((cost_unit / units_case) * 100) / 100;
      } else {
        response.error = "Please! Check Your Input.";
        return response;
      }
    }

    let costPerServing;
    if (serving_size > 0) {
      costPerServing = Math.round(serving_size * costPerUnit * 100) / 100;
    } else {
      response.error = "Serving Size Cannot be Less Than Zero.";
      return response;
    }

    let costPerPlate = costPerServing + other;

    let contributionPerPlate;
    let food_cost;
    if (menu_price > 0) {
      contributionPerPlate = menu_price - costPerPlate;
      food_cost = Math.round((costPerPlate / menu_price) * 100);
    } else {
      response.error = "Please! Check Your Input.";
      return response;
    }

    let profitPerCase;
    if (units_case > 0 && serving_size > 0) {
      let servingsPerCase = units_case / serving_size;
      profitPerCase = contributionPerPlate * servingsPerCase;
    } else {
      response.error = "Please! Check Your Input.";
      return response;
    }

    response.tech_costPerUnit = costPerUnit;
    response.tech_costPerServing = costPerServing;
    response.tech_costPerPlate = costPerPlate;
    response.tech_contributionPerPlate = contributionPerPlate;
    response.tech_food_cost = food_cost;
    response.tech_profitPerCase = profitPerCase;

    return response;
  }

  /**
   * getCalculationStepsToMilesCalculator: Service Method
   * POST: /api/calculators-lol/steps-to-miles-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationStepsToMilesCalculator(body) {
    let methods = body.tech_methods;
    let sex = body.tech_sex;
    let first = body.tech_first;
    let unit = body.tech_unit;
    let steps = body.tech_steps;

    let response = {};

    // Convert numeric inputs
    first = Number(first);
    steps = Number(steps);

    // Normalize unit to numeric code
    if (unit === "cm") {
      unit = "1";
    } else if (unit === "dm") {
      unit = "2";
    } else if (unit === "m") {
      unit = "3";
    } else if (unit === "in") {
      unit = "4";
    } else if (unit === "ft") {
      unit = "5";
    } else if (unit === "mi") {
      unit = "6";
    }

    // Height conversion helper
    function height(a, b) {
      if (a === "1") {
        return b / 30.48;
      } else if (a === "2") {
        return b / 3.048;
      } else if (a === "3") {
        return b * 3.281;
      } else if (a === "4") {
        return b / 12;
      } else if (a === "5") {
        return b;
      } else if (a === "6") {
        return b * 5280;
      }
      return b;
    }

    first = height(unit, first);

    let answer;

    if (methods === "1") {
      if (!isNaN(steps)) {
        if (sex === "1") {
          answer = steps * 0.0004735;
        } else if (sex === "2") {
          answer = steps * 0.0004167;
        }
      } else {
        response.error = "Please! Check your input.";
        return response;
      }
    } else if (methods === "2") {
      if (!isNaN(first) && !isNaN(steps)) {
        if (sex === "1") {
          answer = steps * 0.0004735;
        } else if (sex === "2") {
          answer = steps * 0.0004167;
        }
      } else {
        response.error = "Please! Check your input.";
        return response;
      }
    } else if (methods === "3") {
      if (!isNaN(first) && !isNaN(steps)) {
        answer = (steps * first) / 5280;
      } else {
        response.error = "Please! Check your input.";
        return response;
      }
    } else {
      response.error = "Invalid method selected.";
      return response;
    }

    response.tech_answer = answer;
    return response;
  }

  /**
   * getCalculationFatBurningHeartCalculator: Service Method
   * POST: /api/calculators-lol/fat-burning-heart-rate
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationFatBurningHeartCalculator(body) {
    let age = body.tech_age;
    let gender = body.tech_gender;
    let RHR = body.tech_RHR;

    let response = {};
    age = Number(age);
    RHR = Number(RHR);

    if (!isNaN(age)) {
      if (age <= 150) {
        let MHR = 220 - age;
        let NHR;

        if (gender === "male") {
          NHR = [
            ["49-55", "49-54", "50-56", "50-57", "51-56", "50-55"],
            ["56-61", "55-61", "57-62", "58-63", "57-61", "56-61"],
            ["62-65", "62-65", "63-66", "64-67", "62-67", "62-65"],
            ["66-69", "66-70", "67-70", "68-71", "68-71", "66-69"],
            ["70-73", "71-74", "71-75", "72-76", "72-75", "70-73"],
            ["74-81", "75-81", "76-62", "77-83", "76-81", "74-79"],
            ["82+", "82+", "83+", "84+", "82+", "80+"],
          ];
        } else {
          NHR = [
            ["54-60", "54-59", "54-59", "54-60", "54-59", "54-59"],
            ["61-65", "60-64", "60-64", "61-65", "60-64", "60-64"],
            ["66-69", "65-68", "65-69", "66-69", "65-68", "65-68"],
            ["70-73", "69-72", "70-73", "70-73", "69-73", "69-72"],
            ["74-78", "73-76", "74-78", "74-77", "74-77", "73-76"],
            ["79-84", "77-82", "79-84", "78-83", "78-83", "77-84"],
            ["85+", "83+", "85+", "84+", "84+", "84+"],
          ];
        }

        let res = [];
        let res_normal = "";

        if (age < 18) {
          res_normal = "Normal Heart Rate Cannot be calculated under age 18";
          res = ["", "", "", "", "", "", ""];
        } else if (age >= 18 && age <= 25) {
          for (let i = 0; i < 7; i++) res[i] = NHR[i][0];
        } else if (age >= 26 && age <= 35) {
          for (let i = 0; i < 7; i++) res[i] = NHR[i][1];
        } else if (age >= 36 && age <= 45) {
          for (let i = 0; i < 7; i++) res[i] = NHR[i][2];
        } else if (age >= 46 && age <= 55) {
          for (let i = 0; i < 7; i++) res[i] = NHR[i][3];
        } else if (age >= 56 && age <= 65) {
          for (let i = 0; i < 7; i++) res[i] = NHR[i][4];
        } else if (age >= 66) {
          for (let i = 0; i < 7; i++) res[i] = NHR[i][5];
        } else {
          res_normal = "Invalid Age";
          res = [""];
        }

        let HRR = !isNaN(RHR) ? MHR - RHR : "";

        // let HRR;

        // if (!isNaN(RHR) && !isNaN(MHR)) {
        //     HRR = MHR - RHR;
        // } else {
        //     RHR = "";
        //     HRR = "";
        // }

        // 60-80% method
        let percent_lower = (MHR * 60) / 100;
        let percent_upper = (MHR * 80) / 100;

        // Zoladz method
        let zoladz_lower = MHR - 50 - 5;
        let zoladz_upper = MHR - 40 + 5;

        // Karvonen method
        let karvonen_lower = !isNaN(RHR) ? (HRR * 60) / 100 + RHR : "";
        let karvonen_upper = !isNaN(RHR) ? (HRR * 80) / 100 + RHR : "";

        response.tech_percent_lower = Number(percent_lower.toFixed(4));
        response.tech_percent_upper = Number(percent_upper.toFixed(4));
        response.tech_MHR = MHR;
        response.tech_HRR = HRR;
        response.tech_zoladz_lower = zoladz_lower;
        response.tech_zoladz_upper = zoladz_upper;
        response.tech_karvonen_lower = karvonen_lower;
        response.tech_karvonen_upper = karvonen_upper;
        response.tech_res_normal = res_normal;
        response.tech_res0 = res[0];
        response.tech_res1 = res[1];
        response.tech_res2 = res[2];
        response.tech_res3 = res[3];
        response.tech_res4 = res[4];
        response.tech_res5 = res[5];
        response.tech_res6 = res[6];
        response.input_age = body.tech_age;
        response.input_gender = body.tech_gender;
        response.input_RHR = body.tech_RHR;

        return response;
      } else {
        response.error = "Age must be less than 150.";
        return response;
      }
    } else {
      response.error = "Please! Check your input.";
      return response;
    }
  }

  /**
   * getCalculationNNTCalculator: Service Method
   * POST: /api/calculators-lol/nnt-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationNNTCalculator(body) {
    let outcome = body.tech_outcome;
    let first = body.tech_first;
    let second = body.tech_second;
    let third = body.tech_third;

    let response = {};

    first = Number(first);
    second = Number(second);
    third = Number(third);

    let arr, nnt;

    if (outcome === "per") {
      if (!isNaN(second) && !isNaN(third)) {
        if (second > 0 && third > 0) {
          let minus = second - third;
          arr = minus / 100;
          nnt = 1 / arr;
        } else {
          response.error = "This value can't be negative.";
          return response;
        }
      } else {
        response.error = "Please! Check your input.";
        return response;
      }
    } else {
      if (!isNaN(first) && !isNaN(second) && !isNaN(third)) {
        if (first > 0 && second > 0 && third > 0) {
          let f_div = (-1 * second) / first;
          let s_div = (-1 * third) / first;
          let r0 = 1 - Math.exp(f_div);
          let r1 = 1 - Math.exp(s_div);
          arr = r0 - r1;
          nnt = 1 / arr;
        } else {
          response.error = "This value can't be negative.";
          return response;
        }
      } else {
        response.error = "Please! Check your input.";
        return response;
      }
    }

    response.tech_arr = arr;
    response.tech_nnt = nnt;
    response.input_outcome = body.tech_outcome;
    response.input_first = body.tech_first;
    response.input_second = body.tech_second;
    response.input_third = body.tech_third;
    return response;
  }

  /**
   * getCalculationIdiCalculator: Service Method
   * POST: /api/calculators-lol/ldl-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationIdiCalculator(body) {
    const {
      tech_total,
      tech_total_unit,
      tech_high,
      tech_high_unit,
      tech_triglycerides,
      tech_triglycerides_unit,
    } = body;

    function unitConvert(unit, value) {
      value = parseFloat(value);
      if (unit === "mg/dL") {
        return value * 0.02586;
      } else if (unit === "mmol/L") {
        return value;
      }
      return null;
    }

    const totalConverted = unitConvert(tech_total_unit, tech_total);
    const highConverted = unitConvert(tech_high_unit, tech_high);
    const triglyceridesConverted = unitConvert(
      tech_triglycerides_unit,
      tech_triglycerides
    );

    if (
      !isNaN(totalConverted) &&
      !isNaN(highConverted) &&
      !isNaN(triglyceridesConverted)
    ) {
      const ldl_mmoll =
        totalConverted - highConverted - 0.2 * triglyceridesConverted;
      const ldl_mgdL = ldl_mmoll * 38.7;

      return {
        tech_ldl_mmoll: parseFloat(ldl_mmoll.toFixed(2)),
        tech_ldl_mgdL: parseFloat(ldl_mgdL.toFixed(2)),
      };
    } else {
      return {
        error: "Please! Check Your Input.",
      };
    }
  }

  /**
   * getCalculationStrokeVolumeCalculator: Service Method
   * POST: /api/calculators-lol/stroke-volume-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationStrokeVolumeCalculator(body) {
    try {
      let Cardiac = body.tech_Cardiac;
      let Cardiac_unit = body.tech_Cardiac_unit;
      let heart = body.tech_heart;
      let height = body.tech_height_cm;
      let one_height = body.tech_height_ft;
      let sec_height = body.tech_height_in;
      let height_unit = body.tech_unit_ft_in;
      let weight = body.tech_weight;
      let weight_unit = body.tech_weight_unit;

      Cardiac = parseFloat(Cardiac);
      heart = parseFloat(heart);
      height = parseFloat(height);
      one_height = parseFloat(one_height);
      sec_height = parseFloat(sec_height);
      weight = parseFloat(weight);

      if (!Cardiac_unit) Cardiac_unit = "";
      Cardiac_unit = Cardiac_unit.replace("/min ", "").trim();
      height_unit = height_unit?.trim();

      // Helper functions
      function unitToLiters(Cardiac, Cardiac_unit) {
        switch (Cardiac_unit) {
          case "mm³":
            return Cardiac / 1e9;
          case "cm³":
            return Cardiac / 1000;
          case "dm³":
            return Cardiac;
          case "m³":
            return Cardiac * 1000;
          case "in³":
            return Cardiac / 61023.7;
          case "ft³":
            return Cardiac * 28.3168;
          case "yd³":
            return Cardiac / 764.555;
          case "ml":
            return Cardiac / 1000;
          case "cl":
            return Cardiac / 100;
          case "l":
            return Cardiac;
          case "US gal":
            return Cardiac * 3.78541;
          case "UK gal":
            return Cardiac * 4.54609;
          case "US fl oz":
            return Cardiac / 33.814;
          case "UK fl oz":
            return Cardiac / 35.1951;
          case "cups":
            return Cardiac * 0.284131;
          case "tbsp":
            return Cardiac / 67.628;
          case "tsp":
            return Cardiac / 202.884;
          case "US qt":
            return Cardiac * 0.946353;
          case "UK qt":
            return Cardiac * 1.13652;
          case "US pt":
            return Cardiac / 1.05669;
          case "UK pt":
            return Cardiac / 1.13652;
          default:
            return null;
        }
      }

      function lambai_unit(height, height_unit) {
        switch (height_unit) {
          case "mm":
            return height / 10;
          case "cm":
            return height;
          case "m":
            return height * 100;
          case "km":
            return height * 100000;
          case "in":
            return height * 2.54;
          case "ft":
            return height * 30.48;
          case "yd":
            return height * 91.44;
          case "mi":
            return height * 160934;
          case "nmi":
            return height * 185200;
          default:
            return height;
        }
      }

      function other_lamba(one_height, sec_height, height_unit) {
        if (height_unit === "ft/in") {
          return one_height * 30.48 + sec_height * 2.54;
        } else if (height_unit === "m/cm") {
          return one_height * 100 + sec_height;
        }
        return 0;
      }

      function wazan_unit(weight, weight_unit) {
        switch (weight_unit) {
          case "µg":
            return weight / 1000000;
          case "mg":
            return weight / 1000;
          case "g":
            return weight;
          case "dag":
            return weight / 100;
          case "kg":
            return weight;
          case "t":
            return weight * 1000;
          case "gr":
            return weight / 15.4324;
          case "dr":
            return weight / 56479.1;
          case "oz":
            return weight / 35.274;
          case "lbs":
            return weight / 2.20462;
          case "st":
            return weight / 0.157473;
          case "US ton":
            return weight * 907.185;
          case "long ton":
            return weight * 1016.05;
          case "Earths":
            return weight * 5.9722e24;
          case "me":
            return weight * 9.10938356e-31;
          case "u":
            return weight * 1.66053904e-27;
          case "oz t":
            return weight / 35.27396;
          default:
            return weight;
        }
      }

      // Validation
      if (
        isNaN(Cardiac) ||
        isNaN(heart) ||
        isNaN(weight) ||
        (isNaN(height) && isNaN(one_height) && isNaN(sec_height))
      ) {
        return { status: "fail", error: "Please! Check Your Input." };
      }

      Cardiac = unitToLiters(Cardiac, Cardiac_unit);
      if (Cardiac <= 0)
        return {
          status: "fail",
          error: "Cardiac output should be an integer greater than 0.",
        };
      if (heart <= 0)
        return {
          status: "fail",
          error: "Heart rate should be an integer greater than 0.",
        };
      if (weight <= 0)
        return {
          status: "fail",
          error: "Weight should be an integer greater than 0.",
        };

      const stroke_volume = Cardiac / heart;

      if (!one_height && !sec_height && !height)
        return { status: "fail", error: "Please! Enter Input." };

      one_height = one_height || 0;
      sec_height = sec_height || 0;

      if (height_unit == "ft/in" || height_unit == "m/cm") {
        height = other_lamba(one_height, sec_height, height_unit);
      } else {
        height = lambai_unit(height, height_unit);
      }

      weight = wazan_unit(weight, weight_unit);
      if (height <= 0)
        return {
          status: "fail",
          error: "Height should be an integer greater than 0.",
        };

      // Calculations
      const bsa = 0.007184 * Math.pow(height, 0.725) * Math.pow(weight, 0.425);
      const stroke_val_index = Cardiac / bsa;
      const stroke_index = stroke_volume / bsa;

      return {
        tech_status: "success",
        tech_stroke_volume: stroke_volume,
        tech_bsa: bsa,
        tech_stroke_val_index: stroke_val_index,
        tech_stroke_index: stroke_index,
      };
    } catch (error) {
      return {
        status: "fail",
        error:
          error.message || "Something went wrong in Stroke Volume Calculator.",
      };
    }
  }

  /**
   * getCalculationMaxHeartRateCalculator: Service Method
   * POST: /api/calculators-lol/max-heart-rate-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationMaxHeartRateCalculator(body) {
    const formula = body.formula;
    const age = body.age;

    const isNumeric = (val) => !isNaN(parseFloat(val)) && isFinite(val);

    let results = {};

    if (isNumeric(age)) {
      let answer;

      // Calculate answer based on the formula selected
      if (formula === "1") {
        answer = 205.8 - 0.685 * age;
      } else if (formula === "2") {
        answer = 220 - age;
      } else if (formula === "3") {
        answer = 211 - 0.64 * age;
      } else if (formula === "4") {
        answer = 192 - 0.007 * Math.pow(age, 2);
      } else if (formula === "5") {
        answer = 208 - 0.07 * age;
      }

      // Store the answer in the results object
      results.answer = answer;
    } else {
      results.error = "Please! Check Your Input.";
    }

    return results;
  }

  /**
   * getCalculationItRatioCalculator: Service Method
   * POST: /api/calculators-lol/it-ratio
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationItRatioCalculator(body) {
    const f_input = body.tech_f_input;
    const s_input = body.tech_s_input;

    const isNumeric = (val) => !isNaN(parseFloat(val)) && isFinite(val);

    let results = {};

    if (isNumeric(f_input) && isNumeric(s_input)) {
      const answer = parseFloat(f_input) / parseFloat(s_input);

      // Store the answer in the results object
      results.tech_answer = answer;
    } else {
      results.error = "Please! Check Your Input.";
    }

    return results;
  }

  /**
   * getCalculationAstAltRatioCalculator: Service Method
   * POST: /api/calculators-lol/ast-alt-ratio-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationAstAltRatioCalculator(body) {
    let ast = String(body.tech_ast).trim();
    let ast_unit = String(body.tech_ast_unit).trim().replace("U / ", "");
    let alt = String(body.tech_alt).trim();
    let alt_unit = String(body.tech_alt_unit).trim().replace("U / ", "");

    function sigFig(value, digits) {
      if (value !== "") {
        let decimalPlaces;
        if (value === 0) {
          decimalPlaces = digits - 1;
        } else if (value < 0) {
          decimalPlaces = digits - Math.floor(Math.log10(value * -1)) - 1;
        } else {
          decimalPlaces = digits - Math.floor(Math.log10(value)) - 1;
        }
        return Number(value.toFixed(decimalPlaces));
      }
    }

    let result = {};

    if (
      !isNaN(ast) &&
      ast !== "" &&
      !isNaN(alt) &&
      alt !== "" &&
      ast_unit !== "" &&
      alt_unit !== ""
    ) {
      ast = parseFloat(ast);
      alt = parseFloat(alt);

      // Unit Conversion AST
      if (ast_unit === "mm³") {
        ast = ast / 0.000001;
      } else if (ast_unit === "cm³") {
        ast = ast / 0.001;
      } else if (ast_unit === "cu in") {
        ast = ast / 0.016387;
      } else if (ast_unit === "cu ft") {
        ast = ast / 28.317;
      } else if (ast_unit === "ml") {
        ast = ast / 0.001;
      } else if (ast_unit === "cl") {
        ast = ast / 0.01;
      }

      // Unit Conversion ALT
      if (alt_unit === "mm³") {
        alt = alt / 0.000001;
      } else if (alt_unit === "cm³") {
        alt = alt / 0.001;
      } else if (alt_unit === "cu in") {
        alt = alt / 0.016387;
      } else if (alt_unit === "cu ft") {
        alt = alt / 28.317;
      } else if (alt_unit === "ml") {
        alt = alt / 0.001;
      } else if (alt_unit === "cl") {
        alt = alt / 0.01;
      }

      if (ast >= 2000) {
        return { error: "AST cannot be greater than or equal to 2000." };
      }
      if (alt >= 2000) {
        return { error: "ALT cannot be greater than or equal to 2000." };
      }

      let ratio = ast / alt;
      let m1 = "";
      let m2 = "";
      let m3 = "";

      if (ast < 8) {
        m1 = "Lower than the average";
      } else if (ast >= 8 && ast <= 48) {
        m1 = "Within normal range";
      } else if (ast > 48) {
        m1 = "Higher than the average";
      }

      if (alt < 7) {
        m2 = "Lower than the average";
      } else if (alt >= 7 && alt <= 55) {
        m2 = "Within normal range";
      } else if (alt > 55) {
        m2 = "Higher than the average";
      }

      if (ratio < 0.6) {
        m3 = "Lower than the average";
      } else if (ratio >= 0.6 && ratio <= 1) {
        m3 = "Within normal range";
      } else if (ratio > 1) {
        m3 = "Too high - indicative of cirrhosis";
      }

      result = {
        tech_ratio: sigFig(ratio, 3),
        tech_ast: ast,
        tech_alt: alt,
        tech_m1: m1,
        tech_m2: m2,
        tech_m3: m3,
      };
    } else {
      result = { error: "Please! Check Your Input." };
    }

    return result;
  }

  /**
   * getCalculationPackYearCalculator: Service Method
   * POST: /api/calculators-lol/pack-year-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationPackYearCalculator(body) {
    const cigarettes = body.tech_cigarettes;
    const size = body.tech_size;
    const years = body.tech_years;

    const isNumeric = (val) => !isNaN(parseFloat(val)) && isFinite(val);

    let results = {};

    if (isNumeric(cigarettes) && isNumeric(size) && isNumeric(years)) {
      // Calculate the values for PY, PL, and CL
      const PY = (cigarettes / size) * years;
      const PL = cigarettes * 365.24 * years;
      const CL = (cigarettes / size) * 365.24 * years;

      // Store the results in the response object
      results.tech_PY = PY;
      results.tech_PL = PL;
      results.tech_CL = CL;
    } else {
      results.error = "Please! Check Your Input.";
    }

    return results;
  }

  /**
   * getCalculationIncidenceRateCalculator: Service Method
   * POST: /api/calculators-lol/incidence-rate-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationIncidenceRateCalculator(body) {
    const cases = body.tech_cases?.toString().trim();
    const risk = body.tech_risk?.toString().trim();
    const different_unit = body.tech_different_unit?.toString().trim();
    const population = body.tech_population?.toString().trim();
    const per = body.tech_per?.toString().trim();

    let result = {};

    const isNumeric = (val) => !isNaN(parseFloat(val)) && isFinite(val);

    if (different_unit === "Yes") {
      if (isNumeric(cases) && isNumeric(risk) && isNumeric(population)) {
        const answer =
          (parseFloat(cases) / parseFloat(risk)) * parseFloat(population);
        result.tech_answer = answer;
        result.tech_cases = cases;
        result.tech_risk = risk;
      } else {
        result.error = "Please! Check Your Input.";
      }
    } else if (different_unit === "No") {
      if (isNumeric(cases) && isNumeric(risk) && isNumeric(per)) {
        const answer = (parseFloat(cases) / parseFloat(risk)) * parseFloat(per);
        result.tech_answer = answer;
        result.tech_cases = cases;
        result.tech_risk = risk;
      } else {
        result.error = "Please! Check Your Input.";
      }
    } else {
      result.error = "Invalid 'different_unit' value.";
    }

    return result;
  }

  /**
   * getCalculationNetCarbsCalculator: Service Method
   * POST: /api/calculators-lol/net-carbs-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationNetCarbsCalculator(body) {
    let serving = body.tech_serving;
    let location = body.tech_location;
    let carbohydrates = body.tech_carbohydrates;
    let fiber = body.tech_fiber;
    let alcohol = body.tech_alcohol;
    let contains = body.tech_contains;

    // Helper function
    function isNumeric(value) {
      return !isNaN(value) && value !== "" && value !== null;
    }

    let result = {};

    if (location === "yes") {
      if (isNumeric(carbohydrates) && isNumeric(fiber) && isNumeric(alcohol)) {
        carbohydrates = parseFloat(carbohydrates);
        fiber = parseFloat(fiber);
        alcohol = parseFloat(alcohol);

        let Net_carbs;
        if (contains === "no") {
          Net_carbs = carbohydrates - fiber - alcohol / 2;
          result.tech_Net_carbs = Net_carbs;
        } else if (contains === "yes") {
          Net_carbs = carbohydrates - fiber - alcohol;
          result.tech_Net_carbs = Net_carbs;
        } else {
          result.error = "Please! Check Your Input.";
          return result;
        }

        result.input_carbohydrates = carbohydrates;
        result.input_fiber = fiber;
        result.input_alcohol = alcohol;
      } else {
        result.error = "Please! Check Your Input.";
        return result;
      }
    } else if (location === "no") {
      if (isNumeric(carbohydrates) && isNumeric(alcohol)) {
        carbohydrates = parseFloat(carbohydrates);
        alcohol = parseFloat(alcohol);

        let Net_carbs;
        if (contains === "yes") {
          Net_carbs = carbohydrates - alcohol;
          result.tech_Net_carbs = Net_carbs;
        } else if (contains === "no") {
          Net_carbs = carbohydrates - alcohol / 2;
          result.tech_Net_carbs = Net_carbs;
        } else {
          result.error = "Please! Check Your Input.";
          return result;
        }

        result.input_carbohydrates = carbohydrates;
        result.input_alcohol = alcohol;
        result.input_fiber = fiber;
      } else {
        result.error = "Please! Check Your Input.";
        return result;
      }
    } else {
      result.error = "Please! Check Your Input.";
      return result;
    }

    return result;
  }

  /**
   * getCalculationUrineOutputCalculator: Service Method
   * POST: /api/calculators-lol/urine-output-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationUrineOutputCalculator(body) {
    let weight = body.tech_weight;
    let weight_unit = body.tech_weight_unit;
    let time = body.tech_time;
    let time_unit = body.tech_time_unit;
    let urine = body.tech_urine;
    let urine_unit = body.tech_urine_unit;
    let fluid = body.tech_fluid;
    let fluid_unit = body.tech_fluid_unit;
    let output_unit = body.tech_output_unit;
    let balance_unit = body.tech_balance_unit;
    let min = body.tech_time_min;
    let sec = body.tech_time_sec;
    let hours = body.tech_time_min;
    let mins = body.tech_time_sec;

    let result = {};

    function converter(value, unit) {
      if (unit === "g") value = value * 1000;
      else if (unit === "dag") value = value * 100;
      else if (unit === "kg") value = value * 1;
      else if (unit === "oz") value = value * 35.274;
      else if (unit === "lbs") value = value * 2.205;
      return value;
    }

    function timex(value, unit) {
      if (unit === "sec") value = value * 3600;
      else if (unit === "min") value = value * 60;
      else if (unit === "hrs") value = value * 1;
      else if (unit === "day") value = value / 24;
      return value;
    }

    function urinex(value, unit) {
      if (unit === "mm³") value = value * 1000;
      else if (unit === "cm³") value = value / 1;
      else if (unit === "dm³") value = value / 1000;
      else if (unit === "cu in") value = value / 16.387;
      else if (unit === "ml") value = value * 1;
      else if (unit === "cl") value = value / 10;
      else if (unit === "liters") value = value / 1000;
      else if (unit === "us gal") value = value / 3785;
      else if (unit === "uk gal") value = value / 4546;
      else if (unit === "us fl oz") value = value / 28.413;
      else if (unit === "uk fl oz") value = value / 28.413;
      return value;
    }

    function isNumeric(val) {
      return !isNaN(val) && val !== "" && val !== null;
    }

    if (
      isNumeric(urine) &&
      isNumeric(weight) &&
      isNumeric(time) &&
      isNumeric(fluid)
    ) {
      let time_ans;

      if (time_unit === "min/sec" || time_unit === "hrs/min") {
        if (time_unit === "min/sec") {
          if (isNumeric(min) && isNumeric(sec)) {
            time = min / 60 + sec / 3600;
            time_ans = time;
          } else {
            result.error = "Please! Check Your Input.";
            return result;
          }
        } else if (time_unit === "hrs/min") {
          if (isNumeric(hours) && isNumeric(mins)) {
            time = hours + mins / 60;
            time_ans = time;
          } else {
            result.error = "Please! Check Your Input.";
            return result;
          }
        }
      } else {
        time = timex(time, time_unit);
        time_ans = time;
      }

      urine = urinex(urine, urine_unit);
      weight = converter(weight, weight_unit);
      let answer_unit = urine / (weight * time);
      let answer = converter(answer_unit, output_unit);
      fluid = urinex(fluid, fluid_unit);
      let sec_answer = fluid - urine;

      result.tech_answer = answer;
      result.tech_sec_answer = sec_answer;
      result.tech_time_ans = Number(time_ans.toFixed(4));
    } else {
      result.error = "Please! Check Your Input.";
      return result;
    }

    return result;
  }

  /**
   * getCalculationBishopScoreCalculator: Service Method
   * POST: /api/calculators-lol/bishop-score-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationBishopScoreCalculator(body) {
    let effacement = body.tech_effacement;
    let consistency = body.tech_consistency;
    let fetal_station = body.tech_fetal_station;
    let head_position = body.tech_head_position;
    let dilation = body.tech_dilation;

    let resultData = {};

    function isNumeric(val) {
      return !isNaN(val) && val !== "" && val !== null;
    }

    if (
      isNumeric(effacement) &&
      isNumeric(consistency) &&
      isNumeric(fetal_station) &&
      isNumeric(head_position) &&
      isNumeric(dilation)
    ) {
      let bishopScore =
        Number(dilation) +
        Number(effacement) +
        Number(consistency) +
        Number(fetal_station) +
        Number(head_position);

      let resultMessage = "";
      if (bishopScore <= 6) {
        resultMessage =
          "You are not expected to go into labor in the upcoming weeks. If induction is needed, consider adding cervical ripening agents.";
      } else if (bishopScore >= 8) {
        resultMessage =
          "You are expected to go into labor within a few days. If induction is needed, it's likely to be successful.";
      } else {
        resultMessage = "Consider further evaluation.";
      }

      resultData.tech_bishopScore = bishopScore;
      resultData.tech_result = resultMessage;
    } else {
      resultData.error = "Please! Check Your Input.";
      return resultData;
    }

    return resultData;
  }

  /**
   * getCalculationArmyBodyFatCalculator: Service Method
   * POST: /api/calculators-lol/army-body-fat-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationArmyBodyFatCalculator(body) {
    let activeDuty = body.tech_activeDuty;
    let age = body.tech_age;
    let gender = body.tech_gender;
    let height = body.tech_height_cm;
    let height_unit = body.tech_unit_ft_in;
    let height_ft = body.tech_height_ft;
    let height_in = body.tech_height_in;
    let neck = body.tech_neck_cm;
    let neck_unit = body.tech_unit_ft_in1;
    let neck_ft = body.tech_neck_ft;
    let neck_in = body.tech_neck_in;
    let waist = body.tech_waist_cm;
    let waist_unit = body.tech_unit_ft_in2;
    let waist_ft = body.tech_waist_ft;
    let waist_in = body.tech_waist_in;
    let hip_unit = body.tech_unit_ft_in3;
    let hip_ft = body.tech_hip_ft;
    let hip_in = body.tech_hip_in;

    let hip =
      gender === "female" && body.tech_hip_cm !== undefined
        ? body.tech_hip_cm
        : null;

    function convertToInches(value, unit, ft, inches) {
      if (unit === "ft/in") {
        return ft * 12 + inches;
      } else if (unit === "cm") {
        return value * 0.393701;
      } else if (unit === "m") {
        return value * 39.3701;
      } else if (unit === "ft") {
        return value * 12;
      } else if (unit === "in") {
        return value;
      } else {
        return null;
      }
    }

    height = convertToInches(height, height_unit, height_ft, height_in);
    waist = convertToInches(waist, waist_unit, waist_ft, waist_in);
    neck = convertToInches(neck, neck_unit, neck_ft, neck_in);
    if (gender === "female" && hip !== null) {
      hip = convertToInches(hip, hip_unit, hip_ft, hip_in);
    }

    function isNumeric(val) {
      return !isNaN(val) && val !== null && val !== "";
    }

    let resultData = {};

    if (
      isNumeric(height) &&
      isNumeric(waist) &&
      isNumeric(neck) &&
      (gender !== "female" || isNumeric(hip))
    ) {
      function calculateMaleBodyFat(height, neck, waist) {
        return (
          86.01 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76
        );
      }

      function calculateFemaleBodyFat(height, neck, waist, hip) {
        return (
          163.205 * Math.log10(waist + hip - neck) -
          97.684 * Math.log10(height) -
          78.387
        );
      }

      function determineBodyFatCategory(
        age,
        gender,
        activeDuty,
        bodyFatPercentage
      ) {
        let maxBodyFat;
        if (gender === "male") {
          if (age >= 17 && age <= 20) {
            maxBodyFat = activeDuty ? 20 : 24;
          } else if (age >= 21 && age <= 27) {
            maxBodyFat = activeDuty ? 22 : 26;
          } else if (age >= 28 && age <= 39) {
            maxBodyFat = activeDuty ? 24 : 28;
          } else {
            maxBodyFat = activeDuty ? 26 : 30;
          }
        } else if (gender === "female") {
          if (age >= 17 && age <= 20) {
            maxBodyFat = 30;
          } else if (age >= 21 && age <= 27) {
            maxBodyFat = 32;
          } else if (age >= 28 && age <= 39) {
            maxBodyFat = 34;
          } else {
            maxBodyFat = 36;
          }
        }

        if (bodyFatPercentage <= maxBodyFat) {
          return "Congratulations! You meet the US Army body fat standards!";
        } else {
          return "Sorry, you are not fit enough to join the US Army. Keep on training!";
        }
      }

      let bodyFatPercentage;
      if (gender === "male") {
        bodyFatPercentage = calculateMaleBodyFat(height, neck, waist);
      } else {
        bodyFatPercentage = calculateFemaleBodyFat(height, neck, waist, hip);
      }

      let bodyFatCategory = determineBodyFatCategory(
        age,
        gender,
        activeDuty,
        bodyFatPercentage
      );

      resultData.tech_bodyFatPercentage = bodyFatPercentage;
      resultData.tech_bodyFatCategory = bodyFatCategory;
    } else {
      resultData.error = "Please! Check Your Input.";
    }

    return resultData;
  }

  /**
   * getCalculationNavyBodyFatCalculator: Service Method
   * POST: /api/calculators-lol/navy-body-fat-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationNavyBodyFatCalculator(body) {
    try {
      const weight = body.tech_weight;
      const weight_unit = body.tech_weight_unit;
      const age = body.tech_age;
      const gender = body.tech_gender;

      const height_cm = body.tech_height_cm;
      const height_unit = body.tech_unit_ft_in;
      const height_ft = body.tech_height_ft;
      const height_in = body.tech_height_in;

      const neck_cm = body.tech_neck_cm;
      const neck_unit = body.tech_unit_ft_in1;
      const neck_ft = body.tech_neck_ft;
      const neck_in = body.tech_neck_in;

      const waist_cm = body.tech_waist_cm;
      const waist_unit = body.tech_unit_ft_in2;
      const waist_ft = body.tech_waist_ft;
      const waist_in = body.tech_waist_in;

      const hip_cm = body.tech_hip_cm;
      const hip_unit = body.tech_unit_ft_in3;
      const hip_ft = body.tech_hip_ft;
      const hip_in = body.tech_hip_in;

      let height = height_cm;
      let weightLbs = weight;
      let waist = waist_cm;
      let neck = neck_cm;
      let hip = null;

      // Check if hip input is provided for females
      if (gender === "female") {
        hip = hip_cm || null;
      }

      // Convert height to cm
      if (height_unit) {
        if (height_unit === "ft/in") {
          const feet_to_cm = height_ft * 30.48;
          const inches_to_cm = height_in * 2.54;
          height = feet_to_cm + inches_to_cm;
        } else if (height_unit === "cm") {
          height = height_cm;
        } else if (height_unit === "m") {
          height = height_cm * 100;
        } else if (height_unit === "ft") {
          height = height_cm * 30.48;
        } else if (height_unit === "in") {
          height = height_cm * 2.54;
        }
      }

      // Convert weight to lbs
      if (weight_unit) {
        if (weight_unit === "lbs") {
          weightLbs = weight;
        } else if (height_unit === "kg") {
          weightLbs = weight * 2.20462;
        }
      }
      // console.log(weightLbs,weight_unit);
      // Convert waist to cm
      if (waist_unit) {
        if (waist_unit == "ft/in") {
          const feet_to_cm = waist_ft * 30.48;
          const inches_to_cm = waist_in * 2.54;
          waist = feet_to_cm + inches_to_cm;
        } else if (waist_unit == "cm") {
          waist = waist_cm;
        } else if (waist_unit == "m") {
          waist = waist_cm * 100;
        } else if (waist_unit == "ft") {
          waist = waist_cm * 30.48;
        } else if (waist_unit == "in") {
          waist = waist_cm * 2.54;
        }
      }

      // Convert neck to cm
      if (neck_unit) {
        if (neck_unit == "ft/in") {
          const feet_to_cm = neck_ft * 30.48;
          const inches_to_cm = neck_in * 2.54;
          neck = feet_to_cm + inches_to_cm;
        } else if (neck_unit == "cm") {
          neck = neck_cm;
        } else if (neck_unit == "m") {
          neck = neck_cm * 100;
        } else if (neck_unit == "ft") {
          neck = neck_cm * 30.48;
        } else if (neck_unit == "in") {
          neck = neck_cm * 2.54;
        }
      }

      // Convert hip to cm
      if (hip_unit && gender == "female") {
        if (hip_unit == "ft/in") {
          const feet_to_cm = hip_ft * 30.48;
          const inches_to_cm = hip_in * 2.54;
          hip = feet_to_cm + inches_to_cm;
        } else if (hip_unit == "cm") {
          hip = hip_cm;
        } else if (hip_unit == "m") {
          hip = hip_cm * 100;
        } else if (hip_unit == "ft") {
          hip = hip_cm * 30.48;
        } else if (hip_unit == "in") {
          hip = hip_cm * 2.54;
        }
      }

      // Validate inputs
      const isValid =
        !isNaN(height) &&
        !isNaN(waist) &&
        !isNaN(neck) &&
        !isNaN(weightLbs) &&
        (gender == "male" || (gender == "female" && !isNaN(hip)));

      if (!isValid) {
        return {
          error: "Please! Check Your Input.",
          RESULT: 0,
        };
      }

      // Calculate body fat percentage
      let bodyFat;
      if (gender == "male") {
        bodyFat =
          495 /
            (1.0324 -
              0.19077 * Math.log10(waist - neck) +
              0.15456 * Math.log10(height)) -
          450;
      } else {
        bodyFat =
          495 /
            (1.29579 -
              0.35004 * Math.log10(waist + hip - neck) +
              0.221 * Math.log10(height)) -
          450;
      }

      // Calculate Fat Mass and Lean Mass
      const fatMass = parseFloat(weightLbs) * (bodyFat / 100);
      const leanMass = parseFloat(weightLbs) - fatMass;
      // console.log(fatMass,weightLbs,bodyFat);
      // Determine Body Fat Category
      let bodyFatCategory;
      if (gender == "male") {
        if (age >= 17 && age <= 26) {
          if (bodyFat < 6) {
            bodyFatCategory = "Essential Fat";
          } else if (bodyFat >= 6 && bodyFat < 16) {
            bodyFatCategory = "Athletic";
          } else if (bodyFat >= 16 && bodyFat < 20) {
            bodyFatCategory = "Fit";
          } else {
            bodyFatCategory = "Acceptable";
          }
        } else {
          if (bodyFat < 10) {
            bodyFatCategory = "Essential Fat";
          } else if (bodyFat >= 10 && bodyFat < 20) {
            bodyFatCategory = "Athletic";
          } else if (bodyFat >= 20 && bodyFat < 24) {
            bodyFatCategory = "Fit";
          } else {
            bodyFatCategory = "Acceptable";
          }
        }
      } else {
        if (age >= 17 && age <= 26) {
          if (bodyFat < 16) {
            bodyFatCategory = "Essential Fat";
          } else if (bodyFat >= 16 && bodyFat < 24) {
            bodyFatCategory = "Athletic";
          } else if (bodyFat >= 24 && bodyFat < 30) {
            bodyFatCategory = "Fit";
          } else {
            bodyFatCategory = "Acceptable";
          }
        } else {
          if (bodyFat < 20) {
            bodyFatCategory = "Essential Fat";
          } else if (bodyFat >= 20 && bodyFat < 28) {
            bodyFatCategory = "Athletic";
          } else if (bodyFat >= 28 && bodyFat < 34) {
            bodyFatCategory = "Fit";
          } else {
            bodyFatCategory = "Acceptable";
          }
        }
      }

      return {
        tech_bodyFat: parseFloat(bodyFat.toFixed(2)),
        tech_fatMass: Math.abs(parseFloat(fatMass.toFixed(2))),
        tech_leanMass: parseFloat(leanMass.toFixed(2)),
        tech_bodyFatCategory: bodyFatCategory,
      };
    } catch (error) {
      return {
        error: "An error occurred during calculation.",
        RESULT: 0,
      };
    }
  }

  /**
   * getCalculationAdjustedBodyWeightCalculator: Service Method
   * POST: /api/calculators-lol/adjusted-body-weight-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationAdjustedBodyWeightCalculator(body) {
    let weight = body.tech_weight;
    let weight_unit = body.tech_weight_unit;
    let gender = body.tech_gender;
    let height = body.tech_height_cm;
    let height_unit = body.tech_unit_ft_in;
    let height_ft = body.tech_height_ft;
    let height_in = body.tech_height_in;

    // Convert height to inches
    if (height_unit) {
      if (height_unit === "ft/in") {
        let feet_to_inches = height_ft * 12;
        height = feet_to_inches + height_in;
      } else if (height_unit === "cm") {
        height = height * 0.393701;
      } else if (height_unit === "m") {
        height = height * 39.3701;
      } else if (height_unit === "ft") {
        height = height * 12;
      } else if (height_unit === "in") {
        height = height;
      }
    }

    // Convert weight to kg if needed
    if (weight_unit) {
      if (weight_unit === "lbs") {
        weight = weight * 0.45359237;
      }
    }

    let result = {};

    if (!isNaN(height) && !isNaN(weight)) {
      function calculateIdealBodyWeight(gender, height) {
        if (gender === "male") {
          return 52 + 1.9 * (height - 60);
        } else if (gender === "female") {
          return 49 + 1.7 * (height - 60);
        }
        return null;
      }

      function calculateAdjustedBodyWeight(idealBodyWeight, weight) {
        return idealBodyWeight + 0.4 * (weight - idealBodyWeight);
      }

      let idealBodyWeight = calculateIdealBodyWeight(gender, height);
      let adjustedBodyWeight = calculateAdjustedBodyWeight(
        idealBodyWeight,
        weight
      );

      result.tech_idealBodyWeight = Number(idealBodyWeight.toFixed(2));
      result.tech_adjustedBodyWeight = Number(adjustedBodyWeight.toFixed(2));
    } else {
      result.error = "Please! Check Your Input.";
    }

    return result;
  }

  /**
   * getCalculationA1cCalculator: Service Method
   * POST: /api/calculators-lol/a1c-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationA1cCalculator(body) {
    const { tech_solve, tech_input, tech_unit1, tech_unit2 } = body;

    let unit1Mapped =
      tech_unit1 === "%" ? "1" : tech_unit1 === "mmol/mol" ? "2" : null;
    let unit2Mapped =
      tech_unit2 === "mmol/L" ? "1" : tech_unit2 === "mg/dL" ? "2" : null;

    function acUnit(unit, value) {
      if (unit === "1") {
        return value;
      } else {
        return value * 0.09148 + 2.152;
      }
    }

    function bloodUnit(unit, value) {
      if (unit === "1") {
        return value * 18.016;
      } else {
        return value;
      }
    }

    if (!isNaN(tech_input)) {
      let jawab, percent;

      if (tech_solve === "1") {
        const adjustedInput = acUnit(unit1Mapped, parseFloat(tech_input));
        jawab = 28.7 * adjustedInput - 46.7;
        percent = adjustedInput;
      } else {
        const adjustedInput = bloodUnit(unit2Mapped, parseFloat(tech_input));
        jawab = (adjustedInput + 46.7) / 28.7;
        percent = jawab;
      }

      return {
        tech_percent: parseFloat(percent.toFixed(2)),
        tech_jawab: parseFloat(jawab.toFixed(2)),
      };
    } else {
      return {
        error: "Please! Check Your Input.",
      };
    }
  }

  /**
   * getCalculationBenchPressCalculator: Service Method
   * POST: /api/calculators-lol/bench-press-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationBenchPressCalculator(body) {
    let weight = parseFloat(body.tech_weight);
    let unit = body.tech_unit;
    let reps = parseFloat(body.tech_reps);
    let tableType = body.tech_tableType; // currently unused, but included for consistency

    // Convert input weight to pounds if necessary
    if (unit === "kg") {
      weight *= 2.20462;
    } else if (unit === "stone") {
      weight *= 14;
    }

    // Calculate one-rep max using Epley formula
    let oneRepMax = weight * (1 + reps / 30);

    // Convert result back to input unit
    if (unit === "kg") {
      oneRepMax /= 2.20462;
    } else if (unit === "stone") {
      oneRepMax /= 14;
    }

    let result = {
      tech_oneRepMax: Number(oneRepMax.toFixed(2)),
    };

    return result;
  }

  /**
   * getCalculationDrugHalfLifeCalculator: Service Method
   * POST: /api/calculators-lol/drug-half-life-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationDrugHalfLifeCalculator(body) {
    let half = parseFloat(body.tech_time);
    let half_one = parseFloat(body.tech_time_min);
    let half_sec = parseFloat(body.tech_time_sec);
    let half_unit = body.tech_time_unit;
    let dosage = parseFloat(body.tech_dosage);
    let dosage_unit = body.tech_dosage_unit;

    function secUnit(dosage, dosage_unit) {
      if (dosage_unit === "µg") {
        dosage = dosage / 1000;
      } else if (dosage_unit === "mg") {
        dosage = dosage;
      } else if (dosage_unit === "g") {
        dosage = dosage * 1000;
      }
      return dosage;
    }

    function timeUnit(half, half_unit) {
      if (half_unit === "mins") {
        half = half * 60;
      } else if (half_unit === "hrs") {
        half = half * 3600;
      } else if (half_unit === "days") {
        half = half * 86400;
      } else if (half_unit === "sec") {
        half = half;
      }
      return half;
    }

    function otherTime(half_one, half_sec, half_unit) {
      let half = 0;
      if (half_unit === "hrs/min") {
        half = half_one * 3600 + half_sec * 60;
      } else if (half_unit === "min/sec") {
        half = half_one * 60 + half_sec;
      }
      return half;
    }

    let result = {};

    if (half_unit === "min/sec" || half_unit === "hrs/min") {
      if (isNaN(half_one) && isNaN(half_sec)) {
        result.error = "Please! Enter Input.";
        return result;
      }
      if (isNaN(half_one)) half_one = 0;
      if (isNaN(half_sec)) half_sec = 0;

      if (!isNaN(dosage)) {
        half = otherTime(half_one, half_sec, half_unit);
        if (half === 0) {
          result.error = "Half life value cannot be equal to zero.";
          return result;
        }

        let time_convert = half_unit === "min/sec" ? half / 60 : half / 3600;

        let answer = +time_convert.toFixed(3);
        let answer_one = +(answer + answer).toFixed(2);
        let answer_two = +(answer_one + answer).toFixed(2);
        let answer_three = +(answer_two + answer).toFixed(2);
        let answer_four = +(answer_three + answer).toFixed(2);
        let answer_five = +(answer_four + answer).toFixed(2);

        let subanswer = secUnit(dosage, dosage_unit) / 2;
        let subanswer_one = subanswer / 2;
        let subanswer_sec = subanswer_one / 2;
        let subanswer_three = subanswer_sec / 2;
        let subanswer_four = subanswer_three / 2;
        let subanswer_five = subanswer_four / 2;

        result = {
          tech_subanswer: subanswer,
          tech_subanswer_one: subanswer_one,
          tech_subanswer_sec: subanswer_sec,
          tech_subanswer_three: subanswer_three,
          tech_subanswer_four: subanswer_four,
          tech_subanswer_five: subanswer_five,
          tech_answer: answer,
          tech_answer_one: answer_one,
          tech_answer_two: answer_two,
          tech_answer_three: answer_three,
          tech_answer_four: answer_four,
          tech_answer_five: answer_five,
        };
      } else {
        result.error = "Please! Check Your Input.";
        return result;
      }
    } else {
      if (!isNaN(half) && !isNaN(dosage)) {
        if (half === 0) {
          result.error = "Half life value cannot be equal to zero.";
          return result;
        }

        if (half_unit === "mins") {
          half = timeUnit(half, half_unit);
          time_convert = half / 60;
        } else if (half_unit === "hrs") {
          half = timeUnit(half, half_unit);
          time_convert = half / 3600;
        } else if (half_unit === "days") {
          half = timeUnit(half, half_unit);
          time_convert = half / 86400;
        } else if (half_unit === "sec") {
          half = timeUnit(half, half_unit);
          time_convert = half;
        }

        let answer = +time_convert.toFixed(3);
        let answer_one = +(answer + answer).toFixed(2);
        let answer_two = +(answer_one + answer).toFixed(2);
        let answer_three = +(answer_two + answer).toFixed(2);
        let answer_four = +(answer_three + answer).toFixed(2);
        let answer_five = +(answer_four + answer).toFixed(2);

        let subanswer = secUnit(dosage, dosage_unit) / 2;
        let subanswer_one = subanswer / 2;
        let subanswer_sec = subanswer_one / 2;
        let subanswer_three = subanswer_sec / 2;
        let subanswer_four = subanswer_three / 2;
        let subanswer_five = subanswer_four / 2;

        result = {
          tech_subanswer: subanswer,
          tech_subanswer_one: subanswer_one,
          tech_subanswer_sec: subanswer_sec,
          tech_subanswer_three: subanswer_three,
          tech_subanswer_four: subanswer_four,
          tech_subanswer_five: subanswer_five,
          tech_answer: answer,
          tech_answer_one: answer_one,
          tech_answer_two: answer_two,
          tech_answer_three: answer_three,
          tech_answer_four: answer_four,
          tech_answer_five: answer_five,
        };
      } else {
        result.error = "Please! Check Your Input.";
        return result;
      }
    }

    return result;
  }

  /**
   * getCalculationMacroCalculator: Service Method
   * POST: /api/calculators-lol/macro-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationMacroCalculator(body) {
    let check = true;

    // Check all input fields except ignored ones
    for (let key in body) {
      if (
        key !== "tech_height_ft" &&
        key !== "tech_height_in" &&
        key !== "tech_height_cm" &&
        key !== "tech_submit" &&
        key !== "tech_percent" &&
        key !== "/macro-calculator/"
      ) {
        if (!body[key]) {
          check = false;
        }
      }
    }

    let heightFt = parseFloat(body["tech_height_ft"]);
    let heightIn = parseFloat(body["tech_height_in"]);
    let heightCm = parseFloat(body["tech_height_cm"]);

    if (isNaN(heightFt) && isNaN(heightIn) && isNaN(heightCm)) {
      check = false;
    }

    let result = {};

    if (check === true) {
      let age = parseFloat(body.tech_age);
      let weight = parseFloat(body.tech_weight);
      let unit = body.tech_unit;
      let unitFtIn = body.tech_unit_ft_in;
      let gender = body.tech_gender;
      let formula = body.tech_formula;
      let percent = body.tech_percent ? parseFloat(body.tech_percent) : null;
      let activity = body.tech_activity;
      let goal = body.tech_goal;
      let meal = body.tech_meal;

      if (unit === "lbs") {
        weight = weight / 2.205;
      }

      if (unitFtIn === "ft/in") {
        heightCm = heightFt * 30.48;
        if (heightIn) {
          heightCm += heightIn * 2.54;
        }
      }

      let BMR = 0;
      let sugar = gender === "Female" ? 25 : 37.5;

      if (gender === "Female") {
        if (formula === "first") {
          BMR = Math.round(10 * weight + 6.25 * heightCm - 5 * age - 161);
        } else if (formula === "2nd") {
          BMR = Math.round(
            9.247 * weight + 3.098 * heightCm - 4.33 * age + 447.593
          );
        } else {
          if (!percent) {
            result.error = "Please fill required fields.";
            return result;
          }
          BMR = Math.round(370 + 21.6 * (1 - percent / 100) * weight);
        }
      } else {
        // Male
        if (formula === "first") {
          BMR = Math.round(10 * weight + 6.25 * heightCm - 5 * age + 5);
        } else if (formula === "2nd") {
          BMR = Math.round(
            13.397 * weight + 4.799 * heightCm - 5.677 * age + 88.362
          );
        } else {
          if (!percent) {
            result.error = "Please fill required fields.";
            return result;
          }
          BMR = Math.round(370 + 21.6 * (1 - percent / 100) * weight);
        }
      }

      let tdee = 0;

      if (activity === "Sedentary") {
        tdee = Math.round(BMR * 1.2);
      } else if (activity === "Lightly Active") {
        tdee = Math.round(BMR * 1.375);
      } else if (activity === "Moderately Active") {
        tdee = Math.round(BMR * 1.465);
      } else if (activity === "Very Active") {
        tdee = Math.round(BMR * 1.725);
      } else {
        tdee = Math.round(BMR * 1.9);
      }

      if (goal === "Fat Loss") {
        tdee = tdee - 500;
      } else if (goal === "Loss 10%") {
        tdee = tdee * 0.1;
      } else if (goal === "Maintain") {
        tdee = tdee * 1;
      } else {
        tdee = tdee * 1.1;
      }

      if (meal !== "all") {
        tdee = Math.round(tdee / parseInt(meal));
        sugar = Math.round(sugar / parseInt(meal));
      }

      let stand_fat = Math.round((tdee * 0.1) / 9);

      result.tech_calories = tdee;
      result.tech_Sugar = sugar;
      result.tech_stand_fat = stand_fat;

      return result;
    } else {
      result.error = "Please fill All fields.";
      return result;
    }
  }

  /**
   * getCalculationEerCalculator: Service Method
   * POST: /api/calculators-lol/eer-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationEerCalculator(body) {
    const param = {};
    const request = body;

    // Validate gender
    if (["Male", "Female", "pergnant", "lac"].includes(request.tech_gender)) {
      // Validate numeric inputs
      if (
        !isNaN(request.tech_age) &&
        !isNaN(request.tech_weight) &&
        (!isNaN(request["tech_height_ft"]) ||
          !isNaN(request["tech_height_in"]) ||
          !isNaN(request["tech_height_cm"]))
      ) {
        let age = parseFloat(request.tech_age);
        let height_ft = parseFloat(request["tech_height_ft"]) || 0;
        let height_in = parseFloat(request["tech_height_in"]) || 0;
        let height_cm = parseFloat(request["tech_height_cm"]) || 0;
        let weight = parseFloat(request.tech_weight);

        // Convert weight if in lbs
        if (request.tech_unit == "lbs") {
          weight = weight / 2.205;
        }

        // Convert height to cm
        if (request.tech_unit_ft_in == "ft/in") {
          height_cm = height_ft * 30.48;
          if (height_in != null) {
            height_in = height_in * 2.54;
            height_cm = height_cm + height_in;
          }
        }

        // Set activity level physical activity coefficient
        let pa;
        if (request.tech_activity == "Sedentary") {
          pa = 1.0;
          param.tech_stand = "bg-gradient text-white";
        } else if (request.tech_activity == "Lightly Active") {
          pa = 1.11;
          param.tech_light = "bg-gradient text-white";
        } else if (request.tech_activity == "Moderately Active") {
          pa = 1.25;
          param.tech_mod = "bg-gradient text-white";
        } else {
          pa = 1.48;
          param.tech_very = "bg-gradient text-white";
        }

        // Calculate BMR and RMR
        let bmr, rmr;
        if (request.tech_gender == "Female") {
          bmr =
            Math.round(
              (9.99 * weight + 6.25 * height_cm - 4.92 * age - 161) * 100
            ) / 100;
          rmr =
            Math.round(
              (655 + 9.6 * weight + 1.8 * height_cm - 4.7 * age) * 100
            ) / 100;
        } else {
          bmr =
            Math.round(
              (9.99 * weight + 6.25 * height_cm - 4.92 * age + 5) * 100
            ) / 100;
          rmr =
            Math.round((66 + 13.7 * weight + 5 * height_cm - 6.8 * age) * 100) /
            100;
        }

        // Calculate height in meters
        const height_m = height_cm / 100;
        const convert_hight = height_m * 39.37;

        // Calculate IBW (Ideal Body Weight)
        if (request.tech_gender == "Female") {
          const Robinson = Math.round(49 + 1.7 * (convert_hight - 60));
          const Hamwi = Math.round(45 + 2.2 * (convert_hight - 60));

          if (request.tech_unit == "kg") {
            param.tech_ibw = `${Math.round(Robinson * 2.205)}-${Math.round(
              Hamwi * 2.205
            )} lbs`;
          } else if (request.tech_unit == "lbs") {
            param.tech_ibw = `${Robinson} - ${Hamwi} kg`;
          }
        } else if (request.tech_gender == "Male") {
          const Robinson = Math.round(52 + 1.9 * (convert_hight - 60));
          const Hamwi = Math.round(48 + 2.7 * (convert_hight - 60));

          if (request.tech_unit == "kg") {
            param.tech_ibw = `${Math.round(Robinson * 2.205)}-${Math.round(
              Hamwi * 2.205
            )} lbs`;
          } else if (request.tech_unit == "lbs") {
            param.tech_ibw = `${Robinson} - ${Hamwi} kg`;
          }
        }

        // Calculate BMI
        const BMI = Math.round((weight / (height_m * height_m)) * 100) / 100;

        // Calculate EER for Female/Pregnant/Lactating
        let EER, s, l, m, v;
        if (["Female", "pergnant", "lac"].includes(request.tech_gender)) {
          if (age < 9) {
            EER =
              Math.round(
                (135.3 -
                  30.8 * age +
                  pa * (10.0 * weight + 934 * height_m) +
                  20) *
                  100
              ) / 100;
            s =
              Math.round(
                (135.3 -
                  30.8 * age +
                  1.0 * (10.0 * weight + 934 * height_m) +
                  20) *
                  100
              ) / 100;
            l =
              Math.round(
                (135.3 -
                  30.8 * age +
                  1.11 * (10.0 * weight + 934 * height_m) +
                  20) *
                  100
              ) / 100;
            m =
              Math.round(
                (135.3 -
                  30.8 * age +
                  1.25 * (10.0 * weight + 934 * height_m) +
                  20) *
                  100
              ) / 100;
            v =
              Math.round(
                (135.3 -
                  30.8 * age +
                  1.48 * (10.0 * weight + 934 * height_m) +
                  20) *
                  100
              ) / 100;
          } else if (age > 8 && age < 19) {
            EER =
              Math.round(
                (135.3 -
                  30.8 * age +
                  pa * (10.0 * weight + 934 * height_m) +
                  25) *
                  100
              ) / 100;
            s =
              Math.round(
                (135.3 -
                  30.8 * age +
                  1.0 * (10.0 * weight + 934 * height_m) +
                  25) *
                  100
              ) / 100;
            l =
              Math.round(
                (135.3 -
                  30.8 * age +
                  1.11 * (10.0 * weight + 934 * height_m) +
                  25) *
                  100
              ) / 100;
            m =
              Math.round(
                (135.3 -
                  30.8 * age +
                  1.25 * (10.0 * weight + 934 * height_m) +
                  25) *
                  100
              ) / 100;
            v =
              Math.round(
                (135.3 -
                  30.8 * age +
                  1.48 * (10.0 * weight + 934 * height_m) +
                  25) *
                  100
              ) / 100;
          } else {
            EER =
              Math.round(
                (354 - 6.91 * age + pa * (9.36 * weight + 726 * height_m)) * 100
              ) / 100;
            s =
              Math.round(
                (354 - 6.91 * age + 1.0 * (9.36 * weight + 726 * height_m)) *
                  100
              ) / 100;
            l =
              Math.round(
                (354 - 6.91 * age + 1.11 * (9.36 * weight + 726 * height_m)) *
                  100
              ) / 100;
            m =
              Math.round(
                (354 - 6.91 * age + 1.25 * (9.36 * weight + 726 * height_m)) *
                  100
              ) / 100;
            v =
              Math.round(
                (354 - 6.91 * age + 1.48 * (9.36 * weight + 726 * height_m)) *
                  100
              ) / 100;
            // console.log(EER,age,pa,weight,height_m);
          }
          // Pregnancy adjustments
          if (request.tech_gender == "pergnant") {
            if (request.tech_trim == "2nd") {
              EER += 340;
              s += 340;
              l += 340;
              m += 340;
              v += 340;
            }
            if (request.tech_trim == "3rd") {
              EER += 452;
              s += 452;
              l += 452;
              m += 452;
              v += 452;
            }
          }
          // Lactation adjustments
          if (request.tech_gender == "lac") {
            if (request.tech_trim == "1st6") {
              EER += 330;
              s += 330;
              l += 330;
              m += 330;
              v += 330;
            }
            if (request.tech_trim == "2nd6") {
              EER += 400;
              s += 400;
              l += 400;
              m += 400;
              v += 400;
            }
          }
        } else if (request.tech_gender == "Male") {
          // Calculate EER for Male
          if (age < 9) {
            EER =
              Math.round(
                (88.5 -
                  61.9 * age +
                  pa * (26.7 * weight + 903 * height_m) +
                  20) *
                  100
              ) / 100;
            s =
              Math.round(
                (88.5 -
                  61.9 * age +
                  1.0 * (26.7 * weight + 903 * height_m) +
                  20) *
                  100
              ) / 100;
            l =
              Math.round(
                (88.5 -
                  61.9 * age +
                  1.11 * (26.7 * weight + 903 * height_m) +
                  20) *
                  100
              ) / 100;
            m =
              Math.round(
                (88.5 -
                  61.9 * age +
                  1.25 * (26.7 * weight + 903 * height_m) +
                  20) *
                  100
              ) / 100;
            v =
              Math.round(
                (88.5 -
                  61.9 * age +
                  1.48 * (26.7 * weight + 903 * height_m) +
                  20) *
                  100
              ) / 100;
          } else if (age > 8 && age < 19) {
            EER =
              Math.round(
                (88.5 -
                  61.9 * age +
                  pa * (26.7 * weight + 903 * height_m) +
                  25) *
                  100
              ) / 100;
            s =
              Math.round(
                (88.5 -
                  61.9 * age +
                  1.0 * (26.7 * weight + 903 * height_m) +
                  25) *
                  100
              ) / 100;
            l =
              Math.round(
                (88.5 -
                  61.9 * age +
                  1.11 * (26.7 * weight + 903 * height_m) +
                  25) *
                  100
              ) / 100;
            m =
              Math.round(
                (88.5 -
                  61.9 * age +
                  1.25 * (26.7 * weight + 903 * height_m) +
                  25) *
                  100
              ) / 100;
            v =
              Math.round(
                (88.5 -
                  61.9 * age +
                  1.48 * (26.7 * weight + 903 * height_m) +
                  25) *
                  100
              ) / 100;
          } else {
            EER =
              Math.round(
                (662 - 9.53 * age + pa * (15.91 * weight + 539.6 * height_m)) *
                  100
              ) / 100;
            s =
              Math.round(
                (662 - 9.53 * age + 1.0 * (15.91 * weight + 539.6 * height_m)) *
                  100
              ) / 100;
            l =
              Math.round(
                (662 -
                  9.53 * age +
                  1.11 * (15.91 * weight + 539.6 * height_m)) *
                  100
              ) / 100;
            m =
              Math.round(
                (662 -
                  9.53 * age +
                  1.25 * (15.91 * weight + 539.6 * height_m)) *
                  100
              ) / 100;
            v =
              Math.round(
                (662 -
                  9.53 * age +
                  1.48 * (15.91 * weight + 539.6 * height_m)) *
                  100
              ) / 100;
          }
        }

        // Adjust for weight goals
        if (request.tech_goal == "lose") {
          EER -= 500;
          s -= 500;
          l -= 500;
          m -= 500;
          v -= 500;
        }
        if (request.tech_goal == "gain") {
          EER += 500;
          s += 500;
          l += 500;
          m += 500;
          v += 500;
        }

        // Determine BMI class
        let bmiClass;
        if (BMI <= 18.5) {
          bmiClass = "under";
        } else if (BMI > 18.5 && BMI <= 24.9) {
          bmiClass = "health";
        } else if (BMI > 24.9 && BMI <= 29.9) {
          bmiClass = "over";
        } else if (BMI > 29.9 && BMI <= 35) {
          bmiClass = "obese";
        } else if (BMI > 35) {
          bmiClass = "s_obese";
        }

        // Set return parameters
        param.tech_EER = EER;
        param.tech_bmr = bmr;
        param.tech_rmr = rmr;
        param.tech_BMI = BMI;
        param.tech_s = s;
        param.tech_l = l;
        param.tech_m = m;
        param.tech_v = v;
        param.tech_class = bmiClass;

        return param;
      } else {
        param.error = "Please fill All fields.";
        return param;
      }
    } else if (request.tech_gender == "child") {
      // Child EER calculation
      if (!isNaN(request.tech_child_age) && !isNaN(request.tech_weight)) {
        let weight = parseFloat(request.tech_weight);

        if (request.tech_unit == "lbs") {
          weight = weight / 2.205;
        }

        let EER;
        const child_age = parseFloat(request.tech_child_age);

        if (child_age < 4) {
          EER = Math.round((89 * weight - 100 + 175) * 100) / 100;
        } else if (child_age > 4 && child_age < 7) {
          EER = Math.round((89 * weight - 100 + 56) * 100) / 100;
        } else if (child_age > 6 && child_age < 13) {
          EER = Math.round((89 * weight - 100 + 22) * 100) / 100;
        } else if (child_age > 12 && child_age < 36) {
          EER = Math.round((89 * weight - 100 + 20) * 100) / 100;
        }

        param.tech_EER = EER;
        param.tech_EER_child = "Child";
        return param;
      } else {
        param.error = "Please fill All fields.";
        return param;
      }
    } else {
      // Obese children calculation
      if (
        !isNaN(request.tech_age) &&
        !isNaN(request.tech_weight) &&
        (!isNaN(request["tech_height_ft"]) ||
          !isNaN(request["tech_height_in"]) ||
          !isNaN(request["tech_height_cm"]))
      ) {
        let age = parseFloat(request.tech_age);

        if (age < 3 || age > 18) {
          param.error = "Age must be 3 to 18 years.";
          return param;
        }

        let height_ft = parseFloat(request["tech_height_ft"]) || 0;
        let height_in = parseFloat(request["tech_height_in"]) || 0;
        let height_cm = parseFloat(request["tech_height_cm"]) || 0;
        let weight = parseFloat(request.tech_weight);

        if (request.tech_unit == "lbs") {
          weight = weight / 2.205;
        }

        if (request.tech_unit_ft_in == "ft/in") {
          height_cm = height_ft * 30.48;
          if (height_in != null) {
            height_in = height_in * 2.54;
            height_cm = height_cm + height_in;
          }
        }

        const height_m = height_cm / 100;

        let bee, tee, s, l, m, v, bmr, rmr, pa;

        if (request.tech_gender == "obs_girl") {
          if (request.tech_activity == "Sedentary") {
            pa = 1.0;
            param.tech_stand = "bg-gradient text-white";
          } else if (request.tech_activity == "Lightly Active") {
            pa = 1.18;
            param.tech_light = "bg-gradient text-white";
          } else if (request.tech_activity == "Moderately Active") {
            pa = 1.35;
            param.tech_mod = "bg-gradient text-white";
          } else {
            pa = 1.6;
            param.tech_very = "bg-gradient text-white";
          }

          bee =
            Math.round(
              (516 - 26.8 * age + 347 * height_m + 12.4 * weight) * 100
            ) / 100;
          tee =
            Math.round(
              (389 - 41.2 * age + pa * (15.0 * weight) + 701.6 * height_m) * 100
            ) / 100;
          s =
            Math.round(
              (389 - 41.2 * age + 1.0 * (15.0 * weight) + 701.6 * height_m) *
                100
            ) / 100;
          l =
            Math.round(
              (389 - 41.2 * age + 1.18 * (15.0 * weight) + 701.6 * height_m) *
                100
            ) / 100;
          m =
            Math.round(
              (389 - 41.2 * age + 1.35 * (15.0 * weight) + 701.6 * height_m) *
                100
            ) / 100;
          v =
            Math.round(
              (389 - 41.2 * age + 1.6 * (15.0 * weight) + 701.6 * height_m) *
                100
            ) / 100;
          bmr =
            Math.round(
              (9.99 * weight + 6.25 * height_cm - 4.92 * age - 161) * 100
            ) / 100;
          rmr =
            Math.round(
              (655 + 9.6 * weight + 1.8 * height_cm - 4.7 * age) * 100
            ) / 100;
          console.log(tee, age, height_m, weight);
        } else {
          if (request.tech_activity == "Sedentary") {
            pa = 1.0;
            param.tech_stand = "bg-gradient text-white";
          } else if (request.tech_activity == "Lightly Active") {
            pa = 1.12;
            param.tech_light = "bg-gradient text-white";
          } else if (request.tech_activity == "Moderately Active") {
            pa = 1.24;
            param.tech_mod = "bg-gradient text-white";
          } else {
            pa = 1.45;
            param.tech_very = "bg-gradient text-white";
          }

          bee =
            Math.round(
              (420 - 33.5 * age + 418.9 * height_m + 16.7 * weight) * 100
            ) / 100;
          tee =
            Math.round(
              (114 - 50.9 * age + pa * (19.5 * weight + 1161.4 * height_m)) *
                100
            ) / 100;
          s =
            Math.round(
              (114 - 50.9 * age + 1.0 * (19.5 * weight + 1161.4 * height_m)) *
                100
            ) / 100;
          l =
            Math.round(
              (114 - 50.9 * age + 1.12 * (19.5 * weight + 1161.4 * height_m)) *
                100
            ) / 100;
          m =
            Math.round(
              (114 - 50.9 * age + 1.24 * (19.5 * weight + 1161.4 * height_m)) *
                100
            ) / 100;
          v =
            Math.round(
              (114 - 50.9 * age + 1.45 * (19.5 * weight + 1161.4 * height_m)) *
                100
            ) / 100;
          bmr =
            Math.round(
              (9.99 * weight + 6.25 * height_cm - 4.92 * age + 5) * 100
            ) / 100;
          rmr =
            Math.round((66 + 13.7 * weight + 5 * height_cm - 6.8 * age) * 100) /
            100;
        }

        const BMI = Math.round((weight / (height_m * height_m)) * 100) / 100;

        let bmiClass;
        if (BMI <= 18.5) {
          bmiClass = "under";
        } else if (BMI > 18.5 && BMI <= 24.9) {
          bmiClass = "health";
        } else if (BMI > 24.9 && BMI <= 29.9) {
          bmiClass = "over";
        } else if (BMI > 29.9 && BMI <= 35) {
          bmiClass = "obese";
        } else if (BMI > 35) {
          bmiClass = "s_obese";
        }

        param.tech_tee = tee;
        param.tech_bee = bee;
        param.tech_bmr = bmr;
        param.tech_rmr = rmr;
        param.tech_BMI = BMI;
        param.tech_s = s;
        param.tech_l = l;
        param.tech_m = m;
        param.tech_v = v;
        param.tech_class = bmiClass;

        return param;
      } else {
        param.error = "Please fill All fields.";
        return param;
      }
    }
  }

  /**
   * getCalculationBodyFatPercentageCalculator: Service Method
   * POST: /api/calculators-lol/body-fat-percentage-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationBodyFatPercentageCalculator(body) {
    // Helper functions
    const isNumeric = (value) => {
      return !isNaN(parseFloat(value)) && isFinite(value);
    };

    const round = (value, decimals) => {
      return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
    };

    const convertMeasurements = (request, fields) => {
      const result = {};

      fields.forEach((field) => {
        const unitField = `unit_${field}`;
        const value = parseFloat(request[field]);

        if (request[unitField] == "in") {
          result[field] = value * 25.4;
        } else if (request[unitField] == "cm") {
          result[field] = value * 10;
        } else {
          result[field] = value;
        }
      });

      return result;
    };

    const calculateBodyFatResults = (
      body_fat,
      weight,
      request,
      category,
      color,
      left
    ) => {
      const body_fat_w = round((body_fat / 100) * weight, 2);
      const lbm = round(weight - body_fat_w, 2);

      let fat_weight = weight * (body_fat / 100);
      let fat_weight_result = fat_weight;

      if (request.unit != "kg") {
        fat_weight_result = fat_weight * 2.205;
      }

      const param = {};
      param.tech_body_fat = body_fat;
      param.tech_color = color;
      param.tech_left = left;
      param.tech_category = category;
      param.tech_lbm = lbm + " " + request.unit;
      param.tech_body_fat_w = body_fat_w + " " + request.unit;
      param.tech_fat_weight = round(fat_weight, 2);
      param.tech_fat_weight_unit = request.unit;

      return param;
    };

    // Main calculation logic
    const handleSimpleCalculator = (request) => {
      const param = {};

      if (
        isNumeric(request.age) &&
        isNumeric(request.weight) &&
        isNumeric(request.gender) &&
        isNumeric(request.neck) &&
        isNumeric(request.waist) &&
        (isNumeric(request["height-ft"]) ||
          isNumeric(request["height-in"]) ||
          isNumeric(request["height-cm"]))
      ) {
        if (request.gender == "Female" && (!request.hip || request.hip == "")) {
          param.error = "Please fill all fields.";
          return param;
        }

        let age = parseFloat(request.age);
        let height_ft = parseFloat(request["height-ft"]) || 0;
        let height_in = parseFloat(request["height-in"]) || 0;
        let height_cm = parseFloat(request["height-cm"]) || 0;
        let weight = parseFloat(request.weight);

        // Weight conversion
        if (request.unit == "lbs") {
          weight = weight / 2.205;
        }

        // Height conversion
        if (request.unit_ft_in == "ft/in") {
          height_cm = height_ft * 30.48;
          if (height_in !== null && !isNaN(height_in)) {
            height_in = height_in * 2.54;
            height_cm = height_cm + height_in;
          }
        }

        let Waist_in = parseFloat(request.waist);
        let Hip_in = parseFloat(request.hip) || 0;
        let neck_in = parseFloat(request.neck);

        let Waist = parseFloat(request.waist);
        let Hip = parseFloat(request.hip) || 0;
        let neck = parseFloat(request.neck);

        // Unit conversions
        if (request.unit_n == "In") {
          neck = neck * 2.54;
        }
        if (request.unit_w == "In") {
          Waist = Waist * 2.54;
        }
        if (request.unit_hip == "In") {
          Hip = Hip * 2.54;
        }
        if (request.unit_n == "cm") {
          neck_in = neck_in / 2.54;
        }
        if (request.unit_w == "cm") {
          Waist_in = Waist_in / 2.54;
        }
        if (request.unit_hip == "cm") {
          Hip_in = Hip_in / 2.54;
        }

        const height_meters = height_cm / 100;
        const height_inch = height_cm / 2.54;
        const BMI = weight / (height_meters * height_meters);
        const weight_lbs = weight * 2.205;

        let body_fat,
          army,
          ymca,
          child_body_fat,
          adult_body_fat,
          category,
          color,
          left;

        if (request.gender == "Female") {
          body_fat = round(
            495 /
              (1.29579 -
                0.35004 * Math.log10(Waist + Hip - neck) +
                0.221 * Math.log10(height_cm)) -
              450,
            2
          );
          army = round(
            163.205 * Math.log10(Waist_in + Hip_in - neck_in) -
              97.684 * Math.log10(height_inch) -
              78.387,
            2
          );
          ymca = round(
            ((4.15 * Waist_in - 0.082 * weight_lbs - 76.76) / weight_lbs) * 100,
            2
          );
          child_body_fat = round(1.51 * BMI - 0.7 * age - 3.6 * 0 + 1.4, 2);
          adult_body_fat = round(1.2 * BMI + 0.23 * age - 10.8 * 0 - 5.4, 2);

          if (body_fat <= 9) {
            category = "N/A";
            color = "red";
            left = "-2%";
          } else if (body_fat > 9 && body_fat <= 13) {
            category = "Essential fat";
            param.tech_Essential = "blue text-white";
            color = "#0D47A1";
            left = "2%";
          } else if (body_fat > 13 && body_fat <= 20) {
            category = "Athletes";
            param.tech_Athletes = "teal text-white";
            color = "#00897B";
            left = "20%";
          } else if (body_fat > 20 && body_fat <= 24) {
            category = "Fitness";
            param.tech_Fitness = "green text-white";
            color = "#00C853";
            left = "40%";
          } else if (body_fat > 24 && body_fat <= 31) {
            category = "Average";
            param.tech_Average = "yellow text-white";
            color = "#FFEA00";
            left = "60%";
          } else {
            category = "Obese";
            param.tech_Obese = "red text-white";
            color = "#FF1744";
            left = "80%";
          }
        } else {
          body_fat = round(
            495 /
              (1.0324 -
                0.19077 * Math.log10(Waist - neck) +
                0.15456 * Math.log10(height_cm)) -
              450,
            2
          );
          army = round(
            86.01 * Math.log10(Waist_in - neck_in) -
              70.041 * Math.log10(height_inch) +
              36.76,
            2
          );
          ymca = round(
            ((4.15 * Waist_in - 0.082 * weight_lbs - 98.42) / weight_lbs) * 100,
            2
          );
          child_body_fat = round(1.51 * BMI - 0.7 * age - 3.6 * 1 + 1.4, 2);
          adult_body_fat = round(1.2 * BMI + 0.23 * age - 10.8 * 1 - 5.4, 2);

          if (body_fat < 2) {
            category = "N/A";
            color = "red";
            left = "0%";
          } else if (body_fat >= 2 && body_fat <= 5) {
            category = "Essential fat";
            param.tech_Essential = "blue text-white";
            color = "#0D47A1";
            left = "2%";
          } else if (body_fat > 5 && body_fat <= 13) {
            category = "Athletes";
            param.tech_Athletes = "teal text-white";
            color = "#00897B";
            left = "20%";
          } else if (body_fat > 13 && body_fat <= 17) {
            category = "Fitness";
            param.tech_Fitness = "green text-white";
            color = "#00C853";
            left = "40%";
          } else if (body_fat > 17 && body_fat <= 24) {
            category = "Average";
            param.tech_Average = "yellow text-white";
            color = "#FFEA00";
            left = "60%";
          } else {
            category = "Obese";
            param.tech_Obese = "red text-white";
            color = "#FF1744";
            left = "80%";
          }
        }

        const BAI = round(Hip / Math.pow(height_meters, 1.5) - 18, 2);
        const fat_mass = round((army / 100) * weight, 2);
        const lean_mass = round(weight - fat_mass, 2);

        param.tech_body_fat = body_fat;
        param.tech_army = army;
        param.tech_ymca = ymca;
        param.tech_color = color;
        param.tech_left = left;
        param.tech_child_body_fat = child_body_fat;
        param.tech_adult_body_fat = adult_body_fat;
        param.tech_BAI = BAI;
        param.tech_fat_mass = fat_mass;
        param.tech_category = category;
        param.tech_lean_mass = lean_mass;

        return param;
      } else {
        param.error = "Please fill all fields.";
        return param;
      }
    };

    const handleMethod1 = (request) => {
      const param = {};

      if (
        isNumeric(request.neck) &&
        isNumeric(request.waist) &&
        isNumeric(request.weight)
      ) {
        const age = parseFloat(request.age);
        let weight = parseFloat(request.weight);
        const height_ft = parseFloat(request["height-ft"]) || 0;
        const height_in = parseFloat(request["height-in"]) || 0;
        const height_cm = parseFloat(request["height-cm"]) || 0;

        let Waist_in = parseFloat(request.waist);
        let Hip_in = parseFloat(request.hip) || 0;
        let neck_in = parseFloat(request.neck);
        const hightUnit = request.hightUnit;

        // Unit conversions
        let Waist_cm, Hip_cm, neck_cm;

        if (request.unit_n == "cm") {
          neck_in = request.neck / 2.54;
          neck_cm = parseFloat(request.neck);
        } else {
          neck_in = parseFloat(request.neck);
          neck_cm = neck_in * 2.54;
        }

        if (request.unit_w == "cm") {
          Waist_in = request.waist / 2.54;
          Waist_cm = parseFloat(request.waist);
        } else {
          Waist_in = parseFloat(request.waist);
          Waist_cm = Waist_in * 2.54;
        }

        if (request.unit_hip == "cm") {
          Hip_in = request.hip / 2.54;
          Hip_cm = parseFloat(request.hip);
        } else {
          Hip_in = parseFloat(request.hip);
          Hip_cm = Hip_in * 2.54;
        }

        // Height handling
        let height_in_cm, height_in_in;
        if (hightUnit == "cm") {
          if (!height_cm) {
            param.error = "Please enter height in cm.";
            return param;
          }
          height_in_cm = height_cm;
          height_in_in = height_cm / 2.54;
        } else {
          if (!height_ft && !height_in) {
            param.error = "Please enter height in ft/in.";
            return param;
          }
          height_in_in = height_ft * 12 + height_in;
          height_in_cm = height_in_in * 2.54;
        }

        const height_meters = height_in_cm / 100;
        const BMI = weight / (height_meters * height_meters);

        let weight_lbs, weight_kg;
        if (request.unit == "lbs") {
          weight_lbs = weight;
          weight_kg = weight / 2.205;
        } else {
          weight_lbs = weight * 2.205;
          weight_kg = weight;
        }

        if (request.gender == "Female") {
          if (!request.hip || request.hip == "") {
            param.error = "Please fill all fields.";
            return param;
          }
        }

        let body_fat, fat_weight, category, color, left;
        let army, ymca, child_body_fat, adult_body_fat;

        if (request.gender == "Female") {
          if (request.unit == "lbs") {
            body_fat =
              163.205 * Math.log10(Waist_in + Hip_in - neck_in) -
              97.684 * Math.log10(height_in_in) -
              78.387;
            fat_weight = (body_fat / 100) * weight_lbs;
          } else {
            body_fat =
              495 /
                (1.29579 -
                  0.35004 * Math.log10(Waist_cm + Hip_cm - neck_cm) +
                  0.221 * Math.log10(height_in_cm)) -
              450;
            fat_weight = (body_fat / 100) * weight_kg;
          }

          // Additional calculations
          army = round(
            163.205 * Math.log10(Waist_in + Hip_in - neck_in) -
              97.684 * Math.log10(height_in_in) -
              78.387,
            2
          );
          ymca = round(
            ((4.15 * Waist_in - 0.082 * weight_lbs - 76.76) / weight_lbs) * 100,
            2
          );
          child_body_fat = round(1.51 * BMI - 0.7 * age - 3.6 * 0 + 1.4, 2);
          adult_body_fat = round(1.2 * BMI + 0.23 * age - 10.8 * 0 - 5.4, 2);

          if (body_fat <= 9) {
            category = "N/A";
            color = "red";
            left = "-2%";
          } else if (body_fat > 9 && body_fat <= 13) {
            category = "Essential fat";
            param.tech_Essential = "blue text-white";
            color = "#0D47A1";
            left = "2%";
          } else if (body_fat > 13 && body_fat <= 20) {
            category = "Athletes";
            param.tech_Athletes = "teal text-white";
            color = "#00897B";
            left = "20%";
          } else if (body_fat > 20 && body_fat <= 24) {
            category = "Fitness";
            param.tech_Fitness = "green text-white";
            color = "#00C853";
            left = "40%";
          } else if (body_fat > 24 && body_fat <= 31) {
            category = "Average";
            param.tech_Average = "yellow text-white";
            color = "#FFEA00";
            left = "60%";
          } else {
            category = "Obese";
            param.tech_Obese = "red text-white";
            color = "#FF1744";
            left = "80%";
          }
        } else {
          if (request.unit == "lbs") {
            body_fat =
              86.01 * Math.log10(Waist_in - neck_in) -
              70.041 * Math.log10(height_in_in) +
              36.76;
            fat_weight = (body_fat / 100) * weight_lbs;
          } else {
            body_fat =
              495 /
                (1.0324 -
                  0.19077 * Math.log10(Waist_cm - neck_cm) +
                  0.15456 * Math.log10(height_in_cm)) -
              450;
            fat_weight = (body_fat / 100) * weight_kg;
          }

          // Additional calculations
          army = round(
            86.01 * Math.log10(Waist_in - neck_in) -
              70.041 * Math.log10(height_in_in) +
              36.76,
            2
          );
          ymca = round(
            ((4.15 * Waist_in - 0.082 * weight_lbs - 98.42) / weight_lbs) * 100,
            2
          );
          child_body_fat = round(1.51 * BMI - 0.7 * age - 3.6 * 1 + 1.4, 2);
          adult_body_fat = round(1.2 * BMI + 0.23 * age - 10.8 * 1 - 5.4, 2);

          if (body_fat < 2) {
            category = "N/A";
            color = "red";
            left = "0%";
          } else if (body_fat > 1 && body_fat <= 5) {
            category = "Essential fat";
            param.tech_Essential = "blue text-white";
            color = "#0D47A1";
            left = "2%";
          } else if (body_fat > 5 && body_fat <= 13) {
            category = "Athletes";
            param.tech_Athletes = "teal text-white";
            color = "#00897B";
            left = "20%";
          } else if (body_fat > 13 && body_fat <= 17) {
            category = "Fitness";
            param.tech_Fitness = "green text-white";
            color = "#00C853";
            left = "40%";
          } else if (body_fat > 17 && body_fat <= 24) {
            category = "Average";
            param.tech_Average = "yellow text-white";
            color = "#FFEA00";
            left = "60%";
          } else {
            category = "Obese";
            param.tech_Obese = "red text-white";
            color = "#FF1744";
            left = "80%";
          }
        }

        let Hip = 0;
        if (request.unit_hip == "cm") {
          Hip = parseFloat(request.hip);
        } else {
          Hip = parseFloat(request.hip) * 2.54;
        }

        const BAI = round(Hip / Math.pow(height_meters, 1.5) - 18, 2);
        body_fat = round(body_fat, 2);
        const fat_mass = round((army / 100) * weight, 2);
        const lean_mass = round(weight - fat_mass, 2);

        param.tech_body_fat = body_fat;
        param.tech_army = body_fat;
        param.tech_ymca = ymca;
        param.tech_color = color;
        param.tech_left = left;
        param.tech_child_body_fat = child_body_fat;
        param.tech_adult_body_fat = adult_body_fat;
        param.tech_BAI = BAI;
        param.tech_fat_mass = fat_mass;
        param.tech_category = category;
        param.tech_lean_mass = lean_mass;
        param.tech_fat_weight = round(fat_weight, 2);
        param.tech_fat_weight_unit = request.unit;

        return param;
      } else {
        param.error = "Please fill all fields.";
        return param;
      }
    };

    const handleMethod2 = (request) => {
      const param = {};

      if (
        isNumeric(request.chest) &&
        isNumeric(request.abd) &&
        isNumeric(request.thigh) &&
        isNumeric(request.tricep) &&
        isNumeric(request.sub) &&
        isNumeric(request.sup) &&
        isNumeric(request.mid)
      ) {
        const measurements = convertMeasurements(request, [
          "chest",
          "abd",
          "thigh",
          "tricep",
          "sub",
          "sup",
          "mid",
        ]);

        const sum = Object.values(measurements).reduce((a, b) => a + b, 0);
        const weight = parseFloat(request.weight);
        const age = parseFloat(request.age);

        let body_fat, category, color, left;

        if (request.gender == "Male") {
          const body_den =
            1.112 -
            0.00043499 * sum +
            0.00000055 * Math.pow(sum, 2) -
            0.00028826 * age;
          body_fat = round(495 / body_den - 450, 2);

          if (body_fat < 2) {
            category = "N/A";
            color = "red";
            left = "0%";
          } else if (body_fat > 1 && body_fat <= 5) {
            category = "Essential fat";
            param.tech_Essential = "blue text-white";
            color = "#0D47A1";
            left = "2%";
          } else if (body_fat > 5 && body_fat <= 13) {
            category = "Athletes";
            param.tech_Athletes = "teal text-white";
            color = "#00897B";
            left = "20%";
          } else if (body_fat > 13 && body_fat <= 17) {
            category = "Fitness";
            param.tech_Fitness = "green text-white";
            color = "#00C853";
            left = "40%";
          } else if (body_fat > 17 && body_fat <= 24) {
            category = "Average";
            param.tech_Average = "yellow text-white";
            color = "#FFEA00";
            left = "60%";
          } else {
            category = "Obese";
            param.tech_Obese = "red text-white";
            color = "#FF1744";
            left = "80%";
          }
        } else {
          const body_den =
            1.097 -
            0.00046971 * sum +
            0.00000056 * Math.pow(sum, 2) -
            0.00012828 * age;
          body_fat = round(495 / body_den - 450, 2);

          if (body_fat <= 9) {
            category = "N/A";
            color = "red";
            left = "-2%";
          } else if (body_fat > 9 && body_fat <= 13) {
            category = "Essential fat";
            param.tech_Essential = "blue text-white";
            color = "#0D47A1";
            left = "2%";
          } else if (body_fat > 13 && body_fat <= 20) {
            category = "Athletes";
            param.tech_Athletes = "teal text-white";
            color = "#00897B";
            left = "20%";
          } else if (body_fat > 20 && body_fat <= 24) {
            category = "Fitness";
            param.tech_Fitness = "green text-white";
            color = "#00C853";
            left = "40%";
          } else if (body_fat > 24 && body_fat <= 31) {
            category = "Average";
            param.tech_Average = "yellow text-white";
            color = "#FFEA00";
            left = "60%";
          } else {
            category = "Obese";
            param.tech_Obese = "red text-white";
            color = "#FF1744";
            left = "80%";
          }
        }

        const body_fat_w = round((body_fat / 100) * weight, 2);
        const lbm = round(weight - body_fat_w, 2);

        let fat_weight = weight * (body_fat / 100);
        let fat_weight_result = fat_weight;

        if (request.unit != "kg") {
          fat_weight_result = fat_weight * 2.205;
        }

        param.tech_body_fat = body_fat;
        param.tech_color = color;
        param.tech_left = left;
        param.tech_category = category;
        param.tech_lbm = lbm + " " + request.unit;
        param.tech_body_fat_w = body_fat_w + " " + request.unit;
        param.tech_fat_weight = round(fat_weight, 2);
        param.tech_fat_weight_unit = request.unit;

        return param;
      } else {
        param.error = "Please fill all fields.";
        return param;
      }
    };

    const handleMethod3 = (request) => {
      const param = {};

      if (
        isNumeric(request.abd) &&
        isNumeric(request.thigh) &&
        isNumeric(request.tricep) &&
        isNumeric(request.sup)
      ) {
        const measurements = convertMeasurements(request, [
          "abd",
          "thigh",
          "tricep",
          "sup",
        ]);
        const sum = Object.values(measurements).reduce((a, b) => a + b, 0);
        const weight = parseFloat(request.weight);
        const age = parseFloat(request.age);

        let body_fat, category, color, left;

        if (request.gender == "Male") {
          body_fat = round(
            0.29288 * sum - 0.0005 * Math.pow(sum, 2) + 0.15845 * age - 5.76377,
            2
          );

          if (body_fat < 2) {
            category = "N/A";
            color = "red";
            left = "0%";
          } else if (body_fat > 1 && body_fat <= 5) {
            category = "Essential fat";
            param.tech_Essential = "blue text-white";
            color = "#0D47A1";
            left = "2%";
          } else if (body_fat > 5 && body_fat <= 13) {
            category = "Athletes";
            param.tech_Athletes = "teal text-white";
            color = "#00897B";
            left = "20%";
          } else if (body_fat > 13 && body_fat <= 17) {
            category = "Fitness";
            param.tech_Fitness = "green text-white";
            color = "#00C853";
            left = "40%";
          } else if (body_fat > 17 && body_fat <= 24) {
            category = "Average";
            param.tech_Average = "yellow text-white";
            color = "#FFEA00";
            left = "60%";
          } else {
            category = "Obese";
            param.tech_Obese = "red text-white";
            color = "#FF1744";
            left = "80%";
          }
        } else {
          body_fat = round(
            0.29669 * sum - 0.00043 * Math.pow(sum, 2) + 0.02963 * age + 1.4072,
            2
          );

          if (body_fat <= 9) {
            category = "N/A";
            color = "red";
            left = "-2%";
          } else if (body_fat > 9 && body_fat <= 13) {
            category = "Essential fat";
            param.tech_Essential = "blue text-white";
            color = "#0D47A1";
            left = "2%";
          } else if (body_fat > 13 && body_fat <= 20) {
            category = "Athletes";
            param.tech_Athletes = "teal text-white";
            color = "#00897B";
            left = "20%";
          } else if (body_fat > 20 && body_fat <= 24) {
            category = "Fitness";
            param.tech_Fitness = "green text-white";
            color = "#00C853";
            left = "40%";
          } else if (body_fat > 24 && body_fat <= 31) {
            category = "Average";
            param.tech_Average = "yellow text-white";
            color = "#FFEA00";
            left = "60%";
          } else {
            category = "Obese";
            param.tech_Obese = "red text-white";
            color = "#FF1744";
            left = "80%";
          }
        }

        return calculateBodyFatResults(
          body_fat,
          weight,
          request,
          category,
          color,
          left
        );
      } else {
        param.error = "Please fill all fields.";
        return param;
      }
    };

    const handleMethod4 = (request) => {
      const param = {};

      if (
        isNumeric(request.thigh) &&
        isNumeric(request.tricep) &&
        isNumeric(request.sup)
      ) {
        const measurements = convertMeasurements(request, [
          "thigh",
          "tricep",
          "sup",
        ]);
        const sum = Object.values(measurements).reduce((a, b) => a + b, 0);
        const weight = parseFloat(request.weight);
        const age = parseFloat(request.age);

        let body_fat, category, color, left;

        if (request.gender == "Male") {
          const body_den =
            1.10938 -
            0.0008267 * sum +
            0.0000016 * Math.pow(sum, 2) -
            0.0002574 * age;
          body_fat = round(495 / body_den - 450, 2);

          if (body_fat < 2) {
            category = "N/A";
            color = "red";
            left = "0%";
          } else if (body_fat > 1 && body_fat <= 5) {
            category = "Essential fat";
            param.tech_Essential = "blue text-white";
            color = "#0D47A1";
            left = "2%";
          } else if (body_fat > 5 && body_fat <= 13) {
            category = "Athletes";
            param.tech_Athletes = "teal text-white";
            color = "#00897B";
            left = "20%";
          } else if (body_fat > 13 && body_fat <= 17) {
            category = "Fitness";
            param.tech_Fitness = "green text-white";
            color = "#00C853";
            left = "40%";
          } else if (body_fat > 17 && body_fat <= 24) {
            category = "Average";
            param.tech_Average = "yellow text-white";
            color = "#FFEA00";
            left = "60%";
          } else {
            category = "Obese";
            param.tech_Obese = "red text-white";
            color = "#FF1744";
            left = "80%";
          }
        } else {
          const body_den =
            1.0994921 -
            0.0009929 * sum +
            0.0000023 * Math.pow(sum, 2) -
            0.0001392 * age;
          body_fat = round(495 / body_den - 450, 2);

          if (body_fat <= 9) {
            category = "N/A";
            color = "red";
            left = "-2%";
          } else if (body_fat > 9 && body_fat <= 13) {
            category = "Essential fat";
            param.tech_Essential = "blue text-white";
            color = "#0D47A1";
            left = "2%";
          } else if (body_fat > 13 && body_fat <= 20) {
            category = "Athletes";
            param.tech_Athletes = "teal text-white";
            color = "#00897B";
            left = "20%";
          } else if (body_fat > 20 && body_fat <= 24) {
            category = "Fitness";
            param.tech_Fitness = "green text-white";
            color = "#00C853";
            left = "40%";
          } else if (body_fat > 24 && body_fat <= 31) {
            category = "Average";
            param.tech_Average = "yellow text-white";
            color = "#FFEA00";
            left = "60%";
          } else {
            category = "Obese";
            param.tech_Obese = "red text-white";
            color = "#FF1744";
            left = "80%";
          }
        }

        return calculateBodyFatResults(
          body_fat,
          weight,
          request,
          category,
          color,
          left
        );
      } else {
        param.error = "Please fill all fields.";
        return param;
      }
    };

    const handleMethod5 = (request) => {
      const param = {};

      if (
        isNumeric(request.chest) &&
        isNumeric(request.abd) &&
        isNumeric(request.thigh) &&
        isNumeric(request.tricep) &&
        isNumeric(request.sub) &&
        isNumeric(request.sup) &&
        isNumeric(request.bicep) &&
        isNumeric(request.back) &&
        isNumeric(request.calf)
      ) {
        const measurements = convertMeasurements(request, [
          "chest",
          "abd",
          "thigh",
          "tricep",
          "sub",
          "sup",
          "bicep",
          "back",
          "calf",
        ]);

        const sum = Object.values(measurements).reduce((a, b) => a + b, 0);
        let weight = parseFloat(request.weight);

        if (request.unit == "kg") {
          weight = weight * 2.205;
        }

        const body_fat = round((27 * sum) / weight, 2);
        let category, color, left;

        if (request.gender == "Male") {
          if (body_fat < 2) {
            category = "N/A";
            color = "red";
            left = "0%";
          } else if (body_fat > 1 && body_fat <= 5) {
            category = "Essential fat";
            param.tech_Essential = "blue text-white";
            color = "#0D47A1";
            left = "2%";
          } else if (body_fat > 5 && body_fat <= 13) {
            category = "Athletes";
            param.tech_Athletes = "teal text-white";
            color = "#00897B";
            left = "20%";
          } else if (body_fat > 13 && body_fat <= 17) {
            category = "Fitness";
            param.tech_Fitness = "green text-white";
            color = "#00C853";
            left = "40%";
          } else if (body_fat > 17 && body_fat <= 24) {
            category = "Average";
            param.tech_Average = "yellow text-white";
            color = "#FFEA00";
            left = "60%";
          } else {
            category = "Obese";
            param.tech_Obese = "red text-white";
            color = "#FF1744";
            left = "80%";
          }
        } else {
          if (body_fat <= 9) {
            category = "N/A";
            color = "red";
            left = "-2%";
          } else if (body_fat > 9 && body_fat <= 13) {
            category = "Essential fat";
            param.tech_Essential = "blue text-white";
            color = "#0D47A1";
            left = "2%";
          } else if (body_fat > 13 && body_fat <= 20) {
            category = "Athletes";
            param.tech_Athletes = "teal text-white";
            color = "#00897B";
            left = "20%";
          } else if (body_fat > 20 && body_fat <= 24) {
            category = "Fitness";
            param.tech_Fitness = "green text-white";
            color = "#00C853";
            left = "40%";
          } else if (body_fat > 24 && body_fat <= 31) {
            category = "Average";
            param.tech_Average = "yellow text-white";
            color = "#FFEA00";
            left = "60%";
          } else {
            category = "Obese";
            param.tech_Obese = "red text-white";
            color = "#FF1744";
            left = "80%";
          }
        }

        const body_fat_w = round((body_fat / 100) * weight, 2);
        const lbm = round(weight - body_fat_w, 2);

        let fat_weight = weight * (body_fat / 100);
        let fat_weight_result = fat_weight;

        if (request.unit != "kg") {
          fat_weight_result = fat_weight * 2.205;
        }

        param.tech_body_fat = body_fat;
        param.tech_color = color;
        param.tech_left = left;
        param.tech_category = category;
        param.tech_lbm = lbm + " lbs";
        param.tech_body_fat_w = body_fat_w + " lbs";
        param.tech_fat_weight = round(fat_weight_result, 2);
        param.tech_fat_weight_unit = request.unit;

        return param;
      } else {
        param.error = "Please fill all fields.";
        return param;
      }
    };

    const handleMethod6 = (request) => {
      const param = {};

      if (
        isNumeric(request.tricep) &&
        isNumeric(request.sub) &&
        isNumeric(request.sup) &&
        isNumeric(request.bicep)
      ) {
        const measurements = convertMeasurements(request, [
          "tricep",
          "sub",
          "sup",
          "bicep",
        ]);
        const sum = Object.values(measurements).reduce((a, b) => a + b, 0);
        const weight = parseFloat(request.weight);
        const age = parseFloat(request.age);

        let body_fat, category, color, left;

        if (request.gender == "Male") {
          let body_den;
          const l = Math.log10(sum);

          if (age < 17) {
            body_den = 1.1533 - 0.0643 * l;
          } else if (age >= 17 && age <= 19) {
            body_den = 1.162 - 0.063 * l;
          } else if (age >= 20 && age <= 29) {
            body_den = 1.1631 - 0.0632 * l;
          } else if (age >= 30 && age <= 39) {
            body_den = 1.1422 - 0.0544 * l;
          } else if (age >= 40 && age <= 49) {
            body_den = 1.162 - 0.07 * l;
          } else {
            body_den = 1.1715 - 0.0779 * l;
          }

          body_fat = round(495 / body_den - 450, 2);

          if (body_fat < 2) {
            category = "N/A";
            color = "red";
            left = "0%";
          } else if (body_fat > 1 && body_fat <= 5) {
            category = "Essential fat";
            param.tech_Essential = "blue text-white";
            color = "#0D47A1";
            left = "2%";
          } else if (body_fat > 5 && body_fat <= 13) {
            category = "Athletes";
            param.tech_Athletes = "teal text-white";
            color = "#00897B";
            left = "20%";
          } else if (body_fat > 13 && body_fat <= 17) {
            category = "Fitness";
            param.tech_Fitness = "green text-white";
            color = "#00C853";
            left = "40%";
          } else if (body_fat > 17 && body_fat <= 24) {
            category = "Average";
            param.tech_Average = "yellow text-white";
            color = "#FFEA00";
            left = "60%";
          } else {
            category = "Obese";
            param.tech_Obese = "red text-white";
            color = "#FF1744";
            left = "80%";
          }
        } else {
          let body_den;
          const l = Math.log10(sum);

          if (age < 17) {
            body_den = 1.1369 - 0.0598 * l;
          } else if (age >= 17 && age <= 19) {
            body_den = 1.1549 - 0.0678 * l;
          } else if (age >= 20 && age <= 29) {
            body_den = 1.1599 - 0.0717 * l;
          } else if (age >= 30 && age <= 39) {
            body_den = 1.1423 - 0.0632 * l;
          } else if (age >= 40 && age <= 49) {
            body_den = 1.1333 - 0.0612 * l;
          } else {
            body_den = 1.1339 - 0.0645 * l;
          }

          body_fat = round(495 / body_den - 450, 2);

          if (body_fat <= 9) {
            category = "N/A";
            color = "red";
            left = "-2%";
          } else if (body_fat > 9 && body_fat <= 13) {
            category = "Essential fat";
            param.tech_Essential = "blue text-white";
            color = "#0D47A1";
            left = "2%";
          } else if (body_fat > 13 && body_fat <= 20) {
            category = "Athletes";
            param.tech_Athletes = "teal text-white";
            color = "#00897B";
            left = "20%";
          } else if (body_fat > 20 && body_fat <= 24) {
            category = "Fitness";
            param.tech_Fitness = "green text-white";
            color = "#00C853";
            left = "40%";
          } else if (body_fat > 24 && body_fat <= 31) {
            category = "Average";
            param.tech_Average = "yellow text-white";
            color = "#FFEA00";
            left = "60%";
          } else {
            category = "Obese";
            param.tech_Obese = "red text-white";
            color = "#FF1744";
            left = "80%";
          }
        }

        return calculateBodyFatResults(
          body_fat,
          weight,
          request,
          category,
          color,
          left
        );
      } else {
        param.error = "Please fill all fields.";
        return param;
      }
    };

    const handleMethod7 = (request) => {
      const param = {};

      if (
        isNumeric(request.weight) &&
        (isNumeric(request["height-ft"]) || isNumeric(request["height-cm"])) &&
        isNumeric(request.age) &&
        request.gender
      ) {
        let weight = parseFloat(request.weight);
        if (request.unit == "lbs") {
          weight = weight * 0.453592;
        }

        let height = 0;
        if (request.hightUnit == "ft/in") {
          const feet = parseFloat(request["height-ft"]);
          const inches = parseFloat(request["height-in"]) || 0;
          height = (feet * 12 + inches) * 0.0254;
        } else if (request.hightUnit == "cm") {
          height = parseFloat(request["height-cm"]) / 100;
        }

        const bmi = round(weight / (height * height), 2);
        const age = parseFloat(request.age);
        const gender = request.gender.toLowerCase();

        let bfp;
        if (gender == "male") {
          if (age <= 18) {
            bfp = round(1.51 * bmi + 0.7 * age - 2.2, 2);
          } else {
            bfp = round(1.2 * bmi + 0.23 * age - 16.2, 2);
          }
        } else if (gender == "female") {
          if (age <= 18) {
            bfp = round(1.51 * bmi + 0.7 * age - 1.4, 2);
          } else {
            bfp = round(1.2 * bmi + 0.23 * age - 5.4, 2);
          }
        } else {
          bfp = 0;
        }

        let category, color, left;
        if (request.gender == "Male") {
          if (bfp < 2) {
            category = "N/A";
            color = "red";
            left = "0%";
          } else if (bfp > 1 && bfp <= 5) {
            category = "Essential fat";
            param.tech_Essential = "blue text-white";
            color = "#0D47A1";
            left = "2%";
          } else if (bfp > 5 && bfp <= 13) {
            category = "Athletes";
            param.tech_Athletes = "teal text-white";
            color = "#00897B";
            left = "20%";
          } else if (bfp > 13 && bfp <= 17) {
            category = "Fitness";
            param.tech_Fitness = "green text-white";
            color = "#00C853";
            left = "40%";
          } else if (bfp > 17 && bfp <= 24) {
            category = "Average";
            param.tech_Average = "yellow text-white";
            color = "#FFEA00";
            left = "60%";
          } else {
            category = "Obese";
            param.tech_Obese = "red text-white";
            color = "#FF1744";
            left = "80%";
          }
        } else {
          if (bfp <= 9) {
            category = "N/A";
            color = "red";
            left = "-2%";
          } else if (bfp > 9 && bfp <= 13) {
            category = "Essential fat";
            param.tech_Essential = "blue text-white";
            color = "#0D47A1";
            left = "2%";
          } else if (bfp > 13 && bfp <= 20) {
            category = "Athletes";
            param.tech_Athletes = "teal text-white";
            color = "#00897B";
            left = "20%";
          } else if (bfp > 20 && bfp <= 24) {
            category = "Fitness";
            param.tech_Fitness = "green text-white";
            color = "#00C853";
            left = "40%";
          } else if (bfp > 24 && bfp <= 31) {
            category = "Average";
            param.tech_Average = "yellow text-white";
            color = "#FFEA00";
            left = "60%";
          } else {
            category = "Obese";
            param.tech_Obese = "red text-white";
            color = "#FF1744";
            left = "80%";
          }
        }

        const body_fat_w = round((bfp / 100) * weight, 2);
        const lbm = round(weight - body_fat_w, 2);

        const fat_weight_kg = weight * (bfp / 100);
        const fat_weight_lbs = fat_weight_kg * 2.205;

        param.tech_fat_weight =
          request.unit == "kg"
            ? round(fat_weight_kg, 2)
            : round(fat_weight_lbs, 2);
        param.tech_fat_weight_unit = request.unit;
        param.tech_body_fat = bfp;
        param.tech_color = color;
        param.tech_left = left;
        param.tech_category = category;
        param.tech_lbm = lbm + " kg";
        param.tech_body_fat_w = body_fat_w + " kg";

        return param;
      } else {
        param.error = "Please fill all fields.";
        return param;
      }
    };

    const handleAdvancedCalculator = (request) => {
      // Store data (in Node.js you might want to use sessions instead of cookies)
      Object.keys(request).forEach((key) => {
        // Session storage logic would go here
      });

      switch (request.method) {
        case "1":
          return handleMethod1(request);
        case "2":
          return handleMethod2(request);
        case "3":
          return handleMethod3(request);
        case "4":
          return handleMethod4(request);
        case "5":
          return handleMethod5(request);
        case "6":
          return handleMethod6(request);
        case "7":
          return handleMethod7(request);
        default:
          const param = {};
          param.error = "Invalid method";
          return param;
      }
    };
    // Main execution
    try {
      if (body.calculator_type == "simple") {
        return handleSimpleCalculator(body);
      } else {
        return handleAdvancedCalculator(body);
      }
    } catch (error) {
      return { error: "Calculation failed: " + error.message };
    }
  }

  /**
   * getCalculationMealCalorieCalculator: Service Method
   * POST: /api/calculators-lol/meal-calorie-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationMealCalorieCalculator(body) {
    let calorie = body.tech_calorie;
    let meals = body.tech_meals;

    const parsedCalorie = parseFloat(calorie);
    let response = {};

    if (!isNaN(parsedCalorie)) {
      if (meals === "3") {
        const b_f = Math.round((32.5 / 100) * parsedCalorie);
        const lanch = Math.round((37.5 / 100) * parsedCalorie);
        const dinner = Math.round((30 / 100) * parsedCalorie);
        response = {
          tech_b_f: b_f,
          tech_lanch: lanch,
          tech_dinner: dinner,
        };
      } else if (meals === "4") {
        const b_f = Math.round((27.5 / 100) * parsedCalorie);
        const m_s = Math.round((7.5 / 100) * parsedCalorie);
        const lanch = Math.round((37.5 / 100) * parsedCalorie);
        const dinner = Math.round((27.5 / 100) * parsedCalorie);
        response = {
          tech_b_f: b_f,
          tech_m_s: m_s,
          tech_lanch: lanch,
          tech_dinner: dinner,
        };
      } else if (meals === "5") {
        const b_f = Math.round((27.5 / 100) * parsedCalorie);
        const m_s = Math.round((7.5 / 100) * parsedCalorie);
        const lanch = Math.round((37.5 / 100) * parsedCalorie);
        const a_n = Math.round((7.5 / 100) * parsedCalorie);
        const dinner = Math.round((27.5 / 100) * parsedCalorie);
        response = {
          tech_b_f: b_f,
          tech_m_s: m_s,
          tech_lanch: lanch,
          tech_a_n: a_n,
          tech_dinner: dinner,
        };
      } else {
        response = { error: "Invalid number of meals. Choose 3, 4, or 5." };
      }
    } else {
      response = { error: "Please Fill All Fields." };
    }

    return response;
  }

  /**
   * getCalculationeUogGpaCalculator: Service Method
   * POST: /api/calculators-lol/uog-gpa-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationeUogGpaCalculator(body) {
    const result = {};
    try {
      const letterGradePoints = {
        "A+": 4.0,
        A: 3.7,
        "A-": 3.7,
        "B+": 3.4,
        B: 3.0,
        "B-": 2.5,
        "C+": 2.3,
        C: 2.0,
        "C-": 1.7,
        "D+": 1.5,
        D: 1.0,
        F: 0.0,
      };

      const allowedLetterGrades = Object.keys(letterGradePoints);
      const allowedGradeTypes = ["letter", "percentage", "point"];

      const percentageToGradePoint = (p) => {
        p = parseFloat(p);
        if (p < 50) return 0.0;
        if (p >= 50 && p <= 54) return 1.0;
        if (p >= 55 && p <= 59) return 1.5;
        if (p >= 60 && p <= 64) return 2.0;
        if (p >= 65 && p <= 69) return 2.5;
        if (p >= 70 && p <= 74) return 3.0;
        if (p >= 75 && p <= 79) return 3.4;
        if (p >= 80 && p <= 84) return 3.7;
        if (p >= 85) return 4;
        return 0.0;
      };

      const percentageToLetterGrade = (p) => {
        p = parseFloat(p);
        if (p < 50) return "F";
        if (p >= 50 && p <= 54) return "D";
        if (p >= 55 && p <= 59) return "C";
        if (p >= 60 && p <= 64) return "C+";
        if (p >= 65 && p <= 69) return "B-";
        if (p >= 70 && p <= 74) return "B";
        if (p >= 75 && p <= 79) return "B+";
        if (p >= 80 && p <= 84) return "A";
        if (p >= 85) return "A+";
        return "F";
      };

      const pointValueToLetterGrade = (p) => {
        p = parseFloat(p);
        if (p >= 4.0) return "A+";
        if (p >= 3.7) return "A";
        if (p >= 3.4) return "B+";
        if (p >= 3.0) return "B";
        if (p >= 2.5) return "B-";
        if (p >= 2.3) return "C+";
        if (p >= 2.0) return "C";
        if (p >= 1.7) return "C-";
        if (p >= 1.5) return "D+";
        if (p >= 1.0) return "D";
        return "F";
      };

      const {
        currentCgpa = 0.0,
        creditsCompleted = 0.0,
        gradeFormat = "letter",
        semesters = [],
      } = body;

      // VALIDATION: Global Grade Format
      if (!allowedGradeTypes.includes(gradeFormat.toLowerCase())) {
        result.error = `Invalid grade format '${gradeFormat}'. Allowed formats: ${allowedGradeTypes.join(
          ", "
        )}`;
        return result;
      }

      // VALIDATION: Current CGPA
      if (
        typeof currentCgpa !== "number" ||
        currentCgpa < 0 ||
        currentCgpa > 4.0
      ) {
        result.error = "Current CGPA must be a number between 0.0 and 4.0";
        return result;
      }

      // VALIDATION: Credits Completed
      if (typeof creditsCompleted !== "number" || creditsCompleted < 0) {
        result.error = "Credits completed must be a non-negative number";
        return result;
      }

      // VALIDATION: Semesters exist
      if (!Array.isArray(semesters) || semesters.length === 0) {
        result.error =
          "Semesters data is required and must be a non-empty array";
        return result;
      }

      // VALIDATION: Check for duplicate semester names
      const semesterNames = new Set();
      for (const semester of semesters) {
        if (
          !semester.semesterName ||
          typeof semester.semesterName !== "string"
        ) {
          result.error = "Semester must have a valid name";
          return result;
        }

        if (semesterNames.has(semester.semesterName)) {
          result.error = `Duplicate semester name found: ${semester.semesterName}`;
          return result;
        }
        semesterNames.add(semester.semesterName);

        // VALIDATION: Courses array
        if (!Array.isArray(semester.courses) || semester.courses.length === 0) {
          result.error = `Semester '${semester.semesterName}' must have a non-empty courses array`;
          return result;
        }

        // VALIDATION: Check for duplicate course names within semester
        const courseNames = new Set();
        for (const course of semester.courses) {
          if (!course.courseName || typeof course.courseName !== "string") {
            result.error = `Course in semester '${semester.semesterName}' must have a valid name`;
            return result;
          }

          if (courseNames.has(course.courseName)) {
            result.error = `Duplicate course name '${course.courseName}' in semester '${semester.semesterName}'`;
            return result;
          }
          courseNames.add(course.courseName);
        }
      }

      let previousTotalPoints = currentCgpa * creditsCompleted;
      let cumulativeCredits = creditsCompleted;
      let cumulativeTotalPoints = previousTotalPoints;

      const semesterResults = [];

      // PROCESS SEMESTERS
      for (const semester of semesters) {
        let semesterTotalPoints = 0;
        let semesterCredits = 0;
        const courseList = [];

        for (const course of semester.courses) {
          const gradeType = (course.gradeType || gradeFormat).toLowerCase();

          // VALIDATION: Course credit
          if (typeof course.credit !== "number" || course.credit <= 0) {
            result.error = `Invalid credit in '${course.courseName}'. Credit must be a positive number`;
            return result;
          }

          // VALIDATION: Grade Type
          if (!allowedGradeTypes.includes(gradeType)) {
            result.error = `Invalid grade type '${gradeType}' in '${
              course.courseName
            }'. Allowed types: ${allowedGradeTypes.join(", ")}`;
            return result;
          }

          let gradePoint = 0;
          let letterGrade = "";
          // VALIDATION for LETTER
          if (gradeType === "letter") {
            const grade = course.grade.toString().toUpperCase();

            if (!allowedLetterGrades.includes(grade)) {
              result.error = `Invalid letter grade '${course.grade}' in '${
                course.courseName
              }'. Allowed grades: ${allowedLetterGrades.join(", ")}`;
              return result;
            }

            gradePoint = letterGradePoints[grade];
            letterGrade = grade;
          }

          // VALIDATION for PERCENTAGE
          else if (gradeType === "percentage") {
            const percentage = parseFloat(course.grade);
            if (isNaN(percentage) || percentage < 0 || percentage > 100) {
              result.error = `Invalid percentage '${course.grade}' in '${course.courseName}'. Percentage must be between 0-100`;
              return result;
            }

            gradePoint = percentageToGradePoint(course.grade);
            letterGrade = percentageToLetterGrade(course.grade);
          }

          // VALIDATION for POINTS
          else if (gradeType === "point") {
            const pointValue = parseFloat(course.grade);
            if (isNaN(pointValue) || pointValue < 0 || pointValue > 4.0) {
              result.error = `Invalid point value '${course.grade}' in '${course.courseName}'. Point value must be between 0-4.0`;
              return result;
            }

            gradePoint = pointValue;
            letterGrade = pointValueToLetterGrade(course.grade);
          }

          const earned = gradePoint * course.credit;
          // console.log(gradePoint,course.credit,'ffff');

          semesterTotalPoints += earned;
          semesterCredits += course.credit;

          courseList.push({
            courseName: course.courseName,
            grade: parseFloat(gradePoint.toFixed()),
            credit: course.credit,
            letterGrade,
            gradePoint: parseFloat(gradePoint.toFixed(2)),
            earnedPoints: parseFloat(earned.toFixed(2)),
          });
        }

        const semesterGPA =
          semesterCredits > 0 ? semesterTotalPoints / semesterCredits : 0;

        semesterResults.push({
          semesterName: semester.semesterName,
          gpa: parseFloat(semesterGPA.toFixed(2)),
          credits: parseFloat(semesterCredits.toFixed(1)),
          totalGradePoints: parseFloat(semesterTotalPoints.toFixed(2)),
          courses: courseList,
        });

        cumulativeCredits += semesterCredits;
        cumulativeTotalPoints += semesterTotalPoints;
      }

      // VALIDATION: Final calculation check
      if (cumulativeCredits === 0) {
        result.error = "Total credits cannot be zero";
        return result;
      }

      const overallCGPA = cumulativeTotalPoints / cumulativeCredits;

      return {
        success: true,
        data: {
          overallCGPA: parseFloat(overallCGPA.toFixed(2)),
          totalCredits: parseFloat(cumulativeCredits.toFixed(1)),
          totalGradePoints: parseFloat(cumulativeTotalPoints.toFixed(2)),

          previousCGPA: parseFloat(currentCgpa.toFixed(2)),
          previousCredits: parseFloat(creditsCompleted.toFixed(1)),
          newCreditsEarned: parseFloat(
            (cumulativeCredits - creditsCompleted).toFixed(1)
          ),
          gradeFormat,

          semesterResults,

          calculationDetails: {
            previousTotalPoints: parseFloat(previousTotalPoints.toFixed(2)),
            finalTotalPoints: parseFloat(cumulativeTotalPoints.toFixed(2)),
            finalTotalCredits: parseFloat(cumulativeCredits.toFixed(1)),
          },
        },
        message: "GPA calculation completed successfully",
      };
    } catch (err) {
      result.error = "An error occurred during calculation";
      return result;
    }
  }

  /**
   * getCalculationTargetHeartRateCalculator: Service Method
   * POST: /api/calculators-lol/target-heart-rate-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationTargetHeartRateCalculator(body) {
    let method = body.tech_method;
    let age = body.tech_age;
    let formula = body.tech_formula;
    let percent = body.tech_percent;
    let rhr = body.tech_rhr;
    let rhrm = body.tech_rhrm;
    let hrr = body.tech_hrr;
    let inputMhr = body.tech_mhr;

    let mhr;

    // Main MHR calculation based on formula if method is NOT 3
    if (method !== "3" && !isNaN(age)) {
      const ageNum = parseFloat(age);
      switch (parseInt(formula)) {
        case 1:
          mhr = 220 - ageNum;
          break;
        case 2:
          mhr = 226 - ageNum;
          break;
        case 3:
          mhr = 205.8 - 0.685 * ageNum;
          break;
        case 4:
          mhr = 206.3 - 0.711 * ageNum;
          break;
        case 5:
          mhr = 217 - 0.85 * ageNum;
          break;
        case 6:
          mhr = 208 - 0.7 * ageNum;
          break;
        case 7:
          mhr = 206.9 - 0.67 * ageNum;
          break;
        case 8:
          mhr = 211 - 0.64 * ageNum;
          break;
        case 9:
          mhr = 203.7 / (1 + Math.exp(0.033 * (ageNum - 104.3)));
          break;
        case 10:
          mhr = 190.2 / (1 + Math.exp(0.0453 * (ageNum - 107.5)));
          break;
        case 11:
          mhr = 206 - 0.88 * ageNum;
          break;
        default:
          mhr = 220 - ageNum;
      }
    } else {
      mhr = 220 - parseFloat(age);
    }

    let response = {};

    if (method === "1") {
      if (!isNaN(age) && !isNaN(percent)) {
        response = {
          tech_mhr: mhr,
        };
      } else {
        response = { error: "Please fill All fields." };
      }
    } else if (method === "2") {
      if (!isNaN(age) && !isNaN(rhr) && !isNaN(percent)) {
        response = {
          tech_mhr: mhr,
          tech_rhr: parseFloat(rhr),
        };
      } else {
        response = { error: "Please fill All fields." };
      }
    } else if (method === "3") {
      if (!isNaN(inputMhr) && !isNaN(rhrm) && !isNaN(percent)) {
        response = {
          tech_mhr: parseFloat(inputMhr),
          tech_rhr: parseFloat(rhr),
        };
      } else {
        response = { error: "Please fill All fields." };
      }
    } else if (method === "4") {
      if (!isNaN(age) && !isNaN(hrr) && !isNaN(percent)) {
        const rhrCalculated = mhr - parseFloat(hrr);
        response = {
          tech_mhr: mhr,
          tech_rhr: rhrCalculated,
        };
      } else {
        response = { error: "Please fill All fields." };
      }
    }

    return response;
  }

  /**
   * getCalculationWilksCalculator: Service Method
   * POST: /api/calculators-lol/wilks-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationWilksCalculator(body) {
    let sex = body.tech_sex;
    let method = body.tech_method;
    let bw = body.tech_bw;
    let unit = body.tech_unit;
    let bp = body.tech_bp;
    let bp_reps = body.tech_bp_reps;
    let bs = body.tech_bs;
    let bs_reps = body.tech_bs_reps;
    let dl = body.tech_dl;
    let dl_reps = body.tech_dl_reps;
    let wl = body.tech_wl;

    let response = {};

    if (
      !isNaN(bw) &&
      !isNaN(bp) &&
      !isNaN(bs) &&
      !isNaN(dl) &&
      !isNaN(wl) &&
      !isNaN(bp_reps) &&
      !isNaN(bs_reps) &&
      !isNaN(dl_reps) &&
      sex &&
      method &&
      unit
    ) {
      let weightBw = parseFloat(bw);
      let weightWl = parseFloat(wl);
      let weightBp = parseFloat(bp);
      let weightBs = parseFloat(bs);
      let weightDl = parseFloat(dl);

      if (method === "au") {
        if (unit === "lbs") {
          weightBw *= 0.4536;
          weightWl *= 0.4536;
          response.lb = parseFloat(weightBw.toFixed(2));
          response.lb1 = parseFloat(weightWl.toFixed(2));
        }

        if (!isNaN(weightBw) && !isNaN(weightWl)) {
          let ws_cal, ws;

          if (sex === "male") {
            ws_cal =
              500 /
              (-216.0475144 +
                16.2606339 * weightBw +
                -0.002388645 * Math.pow(weightBw, 2) +
                -0.00113732 * Math.pow(weightBw, 3) +
                0.00000701863 * Math.pow(weightBw, 4) +
                -1.291e-8 * Math.pow(weightBw, 5));
          } else if (sex === "female") {
            ws_cal =
              500 /
              (594.31747775582 +
                -27.23842536447 * weightBw +
                0.82112226871 * Math.pow(weightBw, 2) +
                -0.00930733913 * Math.pow(weightBw, 3) +
                0.00004731582 * Math.pow(weightBw, 4) +
                -9.054e-8 * Math.pow(weightBw, 5));
          }

          ws = weightWl * ws_cal;
          response.tech_ws_cal = parseFloat(ws_cal.toFixed(3));
          response.tech_ws = parseFloat(ws.toFixed(2));
        } else {
          response.error = "Please Fill All The Fields.";
        }
      } else if (method === "sep") {
        if (unit === "lbs") {
          weightBw *= 0.4536;
          weightBp *= 0.4536;
          weightBs *= 0.4536;
          weightDl *= 0.4536;
          response.lb = parseFloat(weightBw.toFixed(2));
        }

        if (
          !isNaN(weightBw) &&
          !isNaN(weightBp) &&
          !isNaN(weightBs) &&
          !isNaN(weightDl)
        ) {
          const bpw = weightBp * (1 + bp_reps / 30);
          const bsw = weightBs * (1 + bs_reps / 30);
          const dlw = weightDl * (1 + dl_reps / 30);
          let fw = bpw + bsw + dlw;
          let ws_cal, ws;

          if (sex === "male") {
            ws_cal =
              500 /
              (-216.0475144 +
                16.2606339 * weightBw +
                -0.002388645 * Math.pow(weightBw, 2) +
                -0.00113732 * Math.pow(weightBw, 3) +
                0.00000701863 * Math.pow(weightBw, 4) +
                -1.291e-8 * Math.pow(weightBw, 5));
          } else if (sex === "female") {
            ws_cal =
              500 /
              (594.31747775582 +
                -27.23842536447 * weightBw +
                0.82112226871 * Math.pow(weightBw, 2) +
                -0.00930733913 * Math.pow(weightBw, 3) +
                0.00004731582 * Math.pow(weightBw, 4) +
                -9.054e-8 * Math.pow(weightBw, 5));
          }

          ws = fw * ws_cal;
          response.lb1 = parseFloat(fw.toFixed(2));
          if (unit === "lbs") fw = fw / 0.4536;
          response.tech_ws_cal = parseFloat(ws_cal.toFixed(3));
          response.tech_ws = parseFloat(ws.toFixed(2));
          response.tech_fw = parseFloat(fw.toFixed(2));
        } else {
          response.error = "Please Fill All The Fields.";
        }
      }
    } else {
      response.error = "Please! Check Your Input.";
    }

    return response;
  }

  /**
   * getCalculationPaceCalculator: Service Method
   * POST: /api/calculators-lol/pace-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationPaceCalculator(body) {
    // Helper functions
    const gethours = (total_sec = "") => {
      return String(Math.floor(total_sec / 3600)).padStart(2, "0");
    };

    const getmins = (total_sec = "") => {
      const mins = total_sec - gethours(total_sec) * 3600;
      return String(Math.floor(mins / 60)).padStart(2, "0");
    };

    const getsecs = (value = "") => {
      return String(
        Math.round(value - gethours(value) * 3600 - getmins(value) * 60)
      ).padStart(2, "0");
    };

    const gettime = (seconds) => {
      const hour = gethours(seconds);
      const mins = getmins(seconds);
      const sec = getsecs(seconds);
      return `${hour} : ${mins} : ${sec}`;
    };

    const request = body;
    const type = request.tech_type;
    const time = request.tech_time;
    const dis = request.tech_dis;
    const dis_unit = request.tech_dis_unit;
    const event = request.tech_event;
    let pace = request.tech_pace;
    const per = request.tech_per;

    const result = {};

    try {
      if (request.tech_calculator_name == "calculator3") {
        if (!request.tech_from) {
          result.error = "Please! Enter Valid Elapsed Time.";
          return result;
        }

        const pace = request.tech_from;
        const to = request.tech_to;
        const per = request.tech_fromu;

        if (per == "1" || per == "2") {
          const paceArr = pace.split(":");
          let pace_check = true;

          // Check if all parts are numeric
          paceArr.forEach((value) => {
            if (isNaN(parseFloat(value))) {
              pace_check = false;
            }
          });

          if (!pace_check) {
            result.error = "Please! Enter Valid pace.";
            return result;
          }

          let hour, min, sec, tsec, thour, tmin;

          if (paceArr.length === 3) {
            hour = parseFloat(paceArr[0]);
            min = parseFloat(paceArr[1]);
            sec = parseFloat(paceArr[2]);
            tsec = hour * 60 * 60 + min * 60 + sec;
            thour = hour + min / 60 + sec / (60 * 60);
            tmin = hour * 60 + min + sec / 60;
          } else if (paceArr.length === 2) {
            min = parseFloat(paceArr[0]);
            sec = parseFloat(paceArr[1]);
            tsec = min * 60 + sec;
            thour = min / 60 + sec / (60 * 60);
            tmin = min + sec / 60;
          } else if (paceArr.length === 1) {
            sec = parseFloat(paceArr[0]);
            tsec = sec;
            thour = sec / (60 * 60);
            tmin = sec / 60;
          }

          // Rest of the calculation logic for per=1 or per=2
          if (per == "1") {
            switch (to) {
              case "1":
                result.tech_res = gettime(tsec);
                break;
              case "2":
                result.tech_res = gettime(tsec * 0.621371);
                break;
              case "3":
                result.tech_res = Number((1 / thour).toFixed(3));
                break;
              case "4":
                result.tech_res = Number(((1 / thour) * 1.609344).toFixed(3));
                break;
              case "5":
                result.tech_res = Number(((1 / thour) * 26.8224).toFixed(3));
                break;
              case "6":
                result.tech_res = Number((1 / thour / 2.237).toFixed(3));
                break;
              case "7":
                result.tech_res = Number(((1 / thour) * 29.3333).toFixed(3));
                break;
              case "8":
                result.tech_res = Number(((1 / thour) * 0.488889).toFixed(3));
                break;
            }
          } else {
            tsec = tsec * 1.609344;
            thour = thour * 1.609344;

            switch (to) {
              case "1":
                result.tech_res = gettime(tsec);
                break;
              case "2":
                result.tech_res = gettime(tsec * 0.621371);
                break;
              case "3":
                result.tech_res = Number((1 / thour).toFixed(3));
                break;
              case "4":
                result.tech_res = Number(((1 / thour) * 1.609344).toFixed(3));
                break;
              case "5":
                result.tech_res = Number(((1 / thour) * 26.8224).toFixed(3));
                break;
              case "6":
                result.tech_res = Number((1 / thour / 2.237).toFixed(3));
                break;
              case "7":
                result.tech_res = Number(((1 / thour) * 29.3333).toFixed(3));
                break;
              case "8":
                result.tech_res = Number(((1 / thour) * 0.488889).toFixed(3));
                break;
            }
          }
        } else {
          // This section is for per=3,4,5,6,7,8 where pace should be a number
          // Convert to number first
          const paceNum = parseFloat(pace);
          // FIXED: Corrected the condition - should be OR not AND
          if (paceNum <= 0 || isNaN(paceNum)) {
            result.error = "Please! Enter positive value of pace.";
            return result;
          }

          let tsec, thour;

          switch (per) {
            case "3":
              tsec = (60 / paceNum) * 60;
              thour = 60 / paceNum / 60;
              break;
            case "4":
              tsec = (60 / paceNum) * 60 * 1.609344;
              thour = (60 / paceNum / 60) * 1.609344;
              break;
            case "5":
              tsec = (26.8224 / paceNum) * 60 * 60;
              thour = 26.8224 / paceNum;
              break;
            case "6":
              tsec = (26.8224 / paceNum) * 60;
              thour = 26.8224 / paceNum / 60;
              break;
            case "7":
              tsec = (29.3333 / paceNum) * 60 * 60;
              thour = 29.3333 / paceNum;
              break;
            case "8":
              tsec = (29.3333 / paceNum) * 60;
              thour = 29.3333 / paceNum / 60;
              break;
          }

          switch (to) {
            case "1":
              result.tech_res = gettime(tsec);
              break;
            case "2":
              result.tech_res = gettime(tsec * 0.621371);
              break;
            case "3":
              result.tech_res = Number((1 / thour).toFixed(3));
              break;
            case "4":
              result.tech_res = Number(((1 / thour) * 1.609344).toFixed(3));
              break;
            case "5":
              result.tech_res = Number(((1 / thour) * 26.8224).toFixed(3));
              break;
            case "6":
              result.tech_res = Number((1 / thour / 2.237).toFixed(3));
              break;
            case "7":
              result.tech_res = Number(((1 / thour) * 29.3333).toFixed(3));
              break;
            case "8":
              result.tech_res = Number(((1 / thour) * 0.488889).toFixed(3));
              break;
          }
        }

        return result;
      } else if (request.tech_calculator_name == "calculator4") {
        if (
          isNaN(request.tech_fdis) ||
          !request.tech_ftime ||
          isNaN(request.tech_ffdis)
        ) {
          result.error = "Please! Check your input.";
          return result;
        }

        const time = request.tech_ftime;
        const dis = parseFloat(request.tech_fdis);
        const dis_unit = request.tech_fdis_unit;
        const fdis = parseFloat(request.tech_ffdis);
        const fdis_unit = request.tech_ffdis_unit;

        const timeArr = time.split(":");
        let time_check = true;

        timeArr.forEach((value) => {
          if (isNaN(value)) {
            time_check = false;
          }
        });

        if (!time_check) {
          result.error = "Please! Enter Valid Elapsed Time.";
          return result;
        }

        let hour, min, sec, tsec, thour, tmin;

        if (timeArr.length == 3) {
          hour = parseFloat(timeArr[0]);
          min = parseFloat(timeArr[1]);
          sec = parseFloat(timeArr[2]);
          tsec = hour * 60 * 60 + min * 60 + sec;
          thour = hour + min / 60 + sec / (60 * 60);
          tmin = hour * 60 + min + sec / 60;
        } else if (timeArr.length == 2) {
          min = parseFloat(timeArr[0]);
          sec = parseFloat(timeArr[1]);
          tsec = min * 60 + sec;
          thour = min / 60 + sec / (60 * 60);
          tmin = min + sec / 60;
        } else if (timeArr.length == 1) {
          sec = parseFloat(timeArr[0]);
          tsec = sec;
          thour = sec / (60 * 60);
          tmin = sec / 60;
        }

        let dis_mi, dis_km, dis_m, dis_yd;

        switch (dis_unit) {
          case "mi":
            dis_mi = dis;
            dis_km = dis * 1.609344;
            dis_m = dis * 1609.344;
            dis_yd = dis * 1760;
            break;
          case "km":
            dis_mi = dis * 0.621371;
            dis_km = dis;
            dis_m = dis * 1000;
            dis_yd = dis * 1093.613;
            break;
          case "m":
            dis_mi = dis * 0.000621371;
            dis_km = dis / 1000;
            dis_m = dis;
            dis_yd = dis * 1.093613;
            break;
          case "yd":
            dis_mi = dis * 0.000568182;
            dis_km = dis * 0.0009144;
            dis_m = dis * 0.9144;
            dis_yd = dis;
            break;
        }

        result.tech_mi_h = Number((dis_mi / thour).toFixed(2));
        result.tech_km_h = Number((dis_km / thour).toFixed(2));
        result.tech_m_m = Number((dis_m / tmin).toFixed(2));
        result.tech_m_s = Number((dis_m / tsec).toFixed(2));
        result.tech_yd_m = Number((dis_yd / tmin).toFixed(2));
        result.tech_yd_s = Number((dis_yd / tsec).toFixed(2));

        result.tech_pacekm = tsec / dis_km;
        result.tech_pace = tsec / dis_mi;

        let main;
        switch (fdis_unit) {
          case "mi":
            main = tsec / dis_mi;
            result.tech_main = gettime(main * fdis);
            break;
          case "km":
            main = tsec / dis_km;
            result.tech_main = gettime(main * fdis);
            break;
          case "m":
            main = tsec / dis_m;
            result.tech_main = gettime(main * fdis);
            break;
          case "yd":
            main = tsec / dis_yd;
            result.tech_main = gettime(main * fdis);
            break;
        }

        return result;
      } else if (request.tech_calculator_name == "calculator2") {
        let check = false;
        let per_dis = 0;
        let per_time = 0;
        let table = "";
        let atime = 0;
        const mile_secs = [];
        let stime = 0;

        for (let i = 1; i <= 8; i++) {
          const timeField = request[`tech_time${i}`];
          const disField = request[`tech_dis${i}`];

          if (timeField && !isNaN(disField)) {
            check = true;
            const time = timeField;
            const dis = parseFloat(disField);
            const dis_unit = request[`tech_dis_unit${i}`];

            const timeArr = time.split(":");
            let time_check = true;

            timeArr.forEach((value) => {
              if (isNaN(value)) {
                time_check = false;
              }
            });

            if (!time_check) {
              result.error = `Please! Enter Valid Time for element #${i}.`;
              return result;
            }

            let hour, min, sec, tsec, thour, tmin;

            if (timeArr.length == 3) {
              hour = parseFloat(timeArr[0]);
              min = parseFloat(timeArr[1]);
              sec = parseFloat(timeArr[2]);
              tsec = hour * 60 * 60 + min * 60 + sec;
              thour = hour + min / 60 + sec / (60 * 60);
              tmin = hour * 60 + min + sec / 60;
            } else if (timeArr.length == 2) {
              min = parseFloat(timeArr[0]);
              sec = parseFloat(timeArr[1]);
              tsec = min * 60 + sec;
              thour = min / 60 + sec / (60 * 60);
              tmin = min + sec / 60;
            } else if (timeArr.length == 1) {
              sec = parseFloat(timeArr[0]);
              tsec = sec;
              thour = sec / (60 * 60);
              tmin = sec / 60;
            }

            let dis_mi, dis_km, dis_m, dis_yd;

            switch (dis_unit) {
              case "mi":
                dis_mi = dis;
                dis_km = dis * 1.609344;
                dis_m = dis * 1609.344;
                dis_yd = dis * 1760;
                break;
              case "km":
                dis_mi = dis * 0.621371;
                dis_km = dis;
                dis_m = dis * 1000;
                dis_yd = dis * 1093.613;
                break;
              case "m":
                dis_mi = dis * 0.000621371;
                dis_km = dis / 1000;
                dis_m = dis;
                dis_yd = dis * 1.093613;
                break;
              case "yd":
                dis_mi = dis * 0.000568182;
                dis_km = dis * 0.0009144;
                dis_m = dis * 0.9144;
                dis_yd = dis;
                break;
            }

            if (per_time >= tsec) {
              result.error = `The time of element #${i} must be greater than the last time.`;
              return result;
            }

            let dis_main, pace;
            const base_dis_unit = request.tech_dis_unit1;

            switch (base_dis_unit) {
              case "km":
                if (per_dis >= dis_km) {
                  result.error = `The distance of element ${i} must be greater than the above distance.`;
                  return result;
                }
                dis_km = dis_km - per_dis;
                dis_main = dis_km;
                tsec = tsec - per_time;
                per_dis = per_dis + dis_km;
                per_time = per_time + tsec;
                dis_mi = dis_km * 0.621371;
                pace = tsec / dis_mi;
                break;
              case "mi":
                if (per_dis >= dis_mi) {
                  result.error = `The distance of element ${i} must be greater than the above distance.`;
                  return result;
                }
                dis_mi = dis_mi - per_dis;
                dis_main = dis_mi;
                tsec = tsec - per_time;
                per_dis = per_dis + dis_mi;
                per_time = per_time + tsec;
                pace = tsec / dis_mi;
                break;
              case "m":
                if (per_dis >= dis_m) {
                  result.error = `The distance of element ${i} must be greater than the above distance.`;
                  return result;
                }
                dis_m = dis_m - per_dis;
                dis_main = dis_m;
                tsec = tsec - per_time;
                per_dis = per_dis + dis_m;
                per_time = per_time + tsec;
                dis_mi = dis_m * 0.000621371;
                pace = tsec / dis_mi;
                break;
              case "yd":
                if (per_dis >= dis_yd) {
                  result.error = `The distance of element ${i} must be greater than the above distance.`;
                  return result;
                }
                dis_yd = dis_yd - per_dis;
                dis_main = dis_yd;
                tsec = tsec - per_time;
                per_dis = per_dis + dis_yd;
                per_time = per_time + tsec;
                dis_mi = dis_yd * 0.000568182;
                pace = tsec / dis_mi;
                break;
            }

            atime = atime + pace;
            stime = atime / i;
            table += `<tr><td class="border-b py-2">${i}</td><td class="border-b py-2">${Number(
              dis_main.toFixed(2)
            )}</td><td class="border-b py-2">${gettime(
              tsec
            )}</td><td class="border-b py-2">${gettime(
              pace
            )}</td><td class="border-b py-2">${gettime(stime)}</td></tr>`;
            mile_secs.push(Number(pace.toFixed(2)));
          }
        }

        if (check) {
          result.tech_table = table;
          result.tech_stime = stime;
          result.tech_mile_secs = mile_secs;
          return result;
        }
      } else if (request.tech_calculator_name == "calculator1") {
        if (type == "pace") {
          if (!time || isNaN(dis)) {
            result.error = "Please! Check your input.";
            return result;
          }

          const timeArr = time.split(":");
          let time_check = true;

          timeArr.forEach((value) => {
            if (isNaN(value)) {
              time_check = false;
            }
          });

          if (!time_check) {
            result.error = "Please! Enter Valid Time.";
            return result;
          }

          let hour, min, sec, tsec, thour, tmin;

          if (timeArr.length == 3) {
            hour = parseFloat(timeArr[0]);
            min = parseFloat(timeArr[1]);
            sec = parseFloat(timeArr[2]);
            tsec = hour * 60 * 60 + min * 60 + sec;
            thour = hour + min / 60 + sec / (60 * 60);
            tmin = hour * 60 + min + sec / 60;
          } else if (timeArr.length == 2) {
            min = parseFloat(timeArr[0]);
            sec = parseFloat(timeArr[1]);
            tsec = min * 60 + sec;
            thour = min / 60 + sec / (60 * 60);
            tmin = min + sec / 60;
          } else if (timeArr.length === 1) {
            sec = parseFloat(timeArr[0]);
            tsec = sec;
            thour = sec / (60 * 60);
            tmin = sec / 60;
          }

          let dis_mi, dis_km, dis_m, dis_yd;

          switch (dis_unit) {
            case "mi":
              dis_mi = parseFloat(dis);
              dis_km = dis * 1.609344;
              dis_m = dis * 1609.344;
              dis_yd = dis * 1760;
              break;
            case "km":
              dis_mi = dis * 0.621371;
              dis_km = parseFloat(dis);
              dis_m = dis * 1000;
              dis_yd = dis * 1093.613;
              break;
            case "m":
              dis_mi = dis * 0.000621371;
              dis_km = dis / 1000;
              dis_m = parseFloat(dis);
              dis_yd = dis * 1.093613;
              break;
            case "yd":
              dis_mi = dis * 0.000568182;
              dis_km = dis * 0.0009144;
              dis_m = dis * 0.9144;
              dis_yd = parseFloat(dis);
              break;
          }

          result.tech_mi_h = Number((dis_mi / thour).toFixed(2));
          result.tech_km_h = Number((dis_km / thour).toFixed(2));
          result.tech_m_m = Number((dis_m / tmin).toFixed(2));
          result.tech_m_s = Number((dis_m / tsec).toFixed(2));

          const pacekm = tsec / dis_km;
          const P_hour_km = gethours(pacekm);
          const P_min_km = getmins(pacekm);
          const P_sec_km = getsecs(pacekm);

          const pace_val = tsec / dis_mi;
          const P_hour_mi = gethours(pace_val);
          const P_min_mi = getmins(pace_val);
          const P_sec_mi = getsecs(pace_val);

          result.tech_pace_mi = `${P_hour_mi} : ${P_min_mi} : ${P_sec_mi}`;
          result.tech_pace_km = `${P_hour_km} : ${P_min_km} : ${P_sec_km}`;
          result.tech_dis_km = dis_km;
          result.tech_dis_mi = dis_mi;
          result.tech_pacekm = pacekm;
          result.tech_pace = pace_val;
          result.tech_share = pace_val;
          return result;
        } else if (type == "time") {
          if (!pace || isNaN(dis)) {
            result.error = "Please! Check your input.";
            return result;
          }

          let dis_mi, dis_km, dis_m, dis_yd;

          switch (dis_unit) {
            case "mi":
              dis_mi = parseFloat(dis);
              dis_km = dis * 1.609344;
              dis_m = dis * 1609.344;
              dis_yd = dis * 1760;
              break;
            case "km":
              dis_km = parseFloat(dis);
              dis_mi = dis * 0.621371;
              dis_m = dis * 1000;
              dis_yd = dis * 1093.613;
              break;
            case "m":
              dis_m = parseFloat(dis);
              dis_mi = dis * 0.000621371;
              dis_km = dis / 1000;
              dis_yd = dis * 1.093613;
              break;
            case "yd":
              dis_yd = parseFloat(dis);
              dis_mi = dis * 0.000568182;
              dis_km = dis * 0.0009144;
              dis_m = dis * 0.9144;
              break;
          }

          let timeres, pacekm, pace_val;

          if (per == "1" || per == "2") {
            const paceArr = pace.split(":");
            let pace_check = true;

            paceArr.forEach((value) => {
              if (isNaN(value)) {
                pace_check = false;
              }
            });

            if (!pace_check) {
              result.error = "Please! Enter Valid pace.";
              return result;
            }

            let phour, pmin, psec, ptsec, pthour, ptmin;

            if (paceArr.length == 3) {
              phour = parseFloat(paceArr[0]);
              pmin = parseFloat(paceArr[1]);
              psec = parseFloat(paceArr[2]);
              ptsec = phour * 60 * 60 + pmin * 60 + psec;
              pthour = phour + pmin / 60 + psec / (60 * 60);
              ptmin = phour * 60 + pmin + psec / 60;
            } else if (paceArr.length == 2) {
              pmin = parseFloat(paceArr[0]);
              psec = parseFloat(paceArr[1]);
              ptsec = pmin * 60 + psec;
              pthour = pmin / 60 + psec / (60 * 60);
              ptmin = pmin + psec / 60;
            } else if (paceArr.length == 1) {
              psec = parseFloat(paceArr[0]);
              ptsec = psec;
              pthour = psec / (60 * 60);
              ptmin = psec / 60;
            }

            if (per == "1") {
              timeres = dis_mi * ptsec;
              pacekm = ptsec * 0.621371;
              pace_val = ptsec;
            } else {
              timeres = dis_km * ptsec;
              pace_val = ptsec * 1.609344;
              pacekm = ptsec;
            }
          } else {
            if ((pace < 0 && pace == 0) || isNaN(pace)) {
              result.error = "Please! Enter positive value of pace.";
              return result;
            }

            pace = parseFloat(pace);
            let tsec, thour;

            switch (per) {
              case "3":
                tsec = dis_mi / pace;
                timeres = tsec * 3600;
                pace_val = timeres / dis_mi;
                pacekm = pace_val * 0.621371;
                break;
              case "4":
                tsec = dis_km / pace;
                timeres = tsec * 3600;
                pacekm = timeres / dis_km;
                pace_val = pacekm * 1.609344;
                break;
              case "5":
                tsec = dis_m / pace;
                timeres = tsec * 60;
                pacekm = timeres / dis_km;
                pace_val = pacekm * 1.609344;
                break;
              case "6":
                tsec = dis_m / pace;
                timeres = tsec;
                pacekm = timeres / dis_km;
                pace_val = pacekm * 1.609344;
                break;
              case "7":
                tsec = dis_yd / pace;
                timeres = tsec * 60;
                pacekm = timeres / dis_km;
                pace_val = pacekm * 1.609344;
                break;
              case "8":
                tsec = dis_yd / pace;
                timeres = tsec;
                pacekm = timeres / dis_km;
                pace_val = pacekm * 1.609344;
                break;
            }
          }

          result.tech_dis_km = dis_km;
          result.tech_dis_mi = dis_mi;
          result.tech_timeres = timeres;
          result.tech_pacekm = pacekm;
          result.tech_pace = pace_val;
          result.tech_share = pace_val;
          return result;
        } else if (type == "distance") {
          if (!time || !pace) {
            result.error = "Please! Check your input.";
            return result;
          }

          const timeArr = time.split(":");
          let time_check = true;

          timeArr.forEach((value) => {
            if (isNaN(value)) {
              time_check = false;
            }
          });

          if (!time_check) {
            result.error = "Please! Enter Valid Time.";
            return result;
          }

          let hour, min, sec, tsec, thour, tmin;

          if (timeArr.length === 3) {
            hour = parseFloat(timeArr[0]);
            min = parseFloat(timeArr[1]);
            sec = parseFloat(timeArr[2]);
            tsec = hour * 60 * 60 + min * 60 + sec;
            thour = hour + min / 60 + sec / (60 * 60);
            tmin = hour * 60 + min + sec / 60;
          } else if (timeArr.length == 2) {
            min = parseFloat(timeArr[0]);
            sec = parseFloat(timeArr[1]);
            tsec = min * 60 + sec;
            thour = min / 60 + sec / (60 * 60);
            tmin = min + sec / 60;
          } else if (timeArr.length == 1) {
            sec = parseFloat(timeArr[0]);
            tsec = sec;
            thour = sec / (60 * 60);
            tmin = sec / 60;
          }

          let dis_km, dis_mi, dis_m, dis_yd, pacekm, pace_val;

          if (per == "1" || per == "2") {
            const paceArr = pace.split(":");
            let pace_check = true;

            paceArr.forEach((value) => {
              if (isNaN(value)) {
                pace_check = false;
              }
            });

            if (!pace_check) {
              result.error = "Please! Enter Valid pace.";
              return result;
            }

            let phour, pmin, psec, ptsec, pthour, ptmin;

            if (paceArr.length == 3) {
              phour = parseFloat(paceArr[0]);
              pmin = parseFloat(paceArr[1]);
              psec = parseFloat(paceArr[2]);
              ptsec = phour * 60 * 60 + pmin * 60 + psec;
              pthour = phour + pmin / 60 + psec / (60 * 60);
              ptmin = phour * 60 + pmin + psec / 60;
            } else if (paceArr.length == 2) {
              pmin = parseFloat(paceArr[0]);
              psec = parseFloat(paceArr[1]);
              ptsec = pmin * 60 + psec;
              pthour = pmin / 60 + psec / (60 * 60);
              ptmin = pmin + psec / 60;
            } else if (paceArr.length == 1) {
              psec = parseFloat(paceArr[0]);
              ptsec = psec;
              pthour = psec / (60 * 60);
              ptmin = psec / 60;
            }

            if (per == "1") {
              dis_mi = Number((tsec / ptsec).toFixed(3));
              dis_km = Number((dis_mi * 1.609344).toFixed(3));
              dis_m = Number((dis_mi * 1609.344).toFixed(3));
              dis_yd = Number((dis_mi * 1760).toFixed(3));
              pacekm = ptsec * 0.621371;
              pace_val = ptsec;
            } else {
              dis_km = Number((tsec / ptsec).toFixed(3));
              dis_mi = Number((dis_km * 0.621371).toFixed(3));
              dis_m = Number((dis_km * 1000).toFixed(3));
              dis_yd = Number((dis_km * 1093.613).toFixed(3));
              pace_val = ptsec * 1.609344;
              pacekm = ptsec;
            }
          } else {
            if ((pace < 0 && pace == 0) || isNaN(pace)) {
              result.error = "Please! Enter positive value of pace.";
              return result;
            }

            pace = parseFloat(pace);

            switch (per) {
              case "3":
                dis_mi = pace * thour;
                dis_km = Number((dis_mi * 1.609344).toFixed(3));
                dis_m = Number((dis_mi * 1609.344).toFixed(3));
                dis_yd = Number((dis_mi * 1760).toFixed(3));
                pace_val = tsec / dis_mi;
                pacekm = pace_val * 0.621371;
                break;
              case "4":
                dis_km = pace * thour;
                dis_mi = Number((dis_km * 0.621371).toFixed(3));
                dis_m = Number((dis_km * 1000).toFixed(3));
                dis_yd = Number((dis_km * 1093.613).toFixed(3));
                pacekm = tsec / dis_km;
                pace_val = pacekm * 1.609344;
                break;
              case "5":
                dis_m = pace * tmin;
                dis_mi = Number((dis_m * 0.000621371).toFixed(3));
                dis_km = Number((dis_m / 1000).toFixed(3));
                dis_yd = Number((dis_m * 1.093613).toFixed(3));
                pacekm = tsec / dis_km;
                pace_val = pacekm * 1.609344;
                break;
              case "6":
                dis_m = pace * tsec;
                dis_mi = Number((dis_m * 0.000621371).toFixed(3));
                dis_km = Number((dis_m / 1000).toFixed(3));
                dis_yd = Number((dis_m * 1.093613).toFixed(3));
                pacekm = tsec / dis_km;
                pace_val = pacekm * 1.609344;
                break;
              case "7":
                dis_yd = pace * tmin;
                dis_mi = Number((dis_yd * 0.000568182).toFixed(3));
                dis_km = Number((dis_yd * 0.0009144).toFixed(3));
                dis_m = Number((dis_yd * 0.9144).toFixed(3));
                pacekm = tsec / dis_km;
                pace_val = pacekm * 1.609344;
                break;
              case "8":
                dis_yd = pace * tsec;
                dis_mi = Number((dis_yd * 0.000568182).toFixed(3));
                dis_km = Number((dis_yd * 0.0009144).toFixed(3));
                dis_m = Number((dis_yd * 0.9144).toFixed(3));
                pacekm = tsec / dis_km;
                pace_val = pacekm * 1.609344;
                break;
            }
          }

          result.tech_dis_km = dis_km;
          result.tech_dis_m = dis_m;
          result.tech_dis_mi = dis_mi;
          result.tech_dis_yd = dis_yd;
          result.tech_pacekm = pacekm;
          result.tech_pace = pace_val;
          result.tech_share = pace_val;
          return result;
        }
      }

      // If no calculator matched
      result.error = "Invalid calculator name";
      return result;
    } catch (error) {
      result.error = `Calculation error: ${error.message}`;
      return result;
    }
  }

  /**
   * getCalculationAcftCalculator: Service Method
   * POST: /api/calculators-lol/acft-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationAcftCalculator(body) {
    const request = body;
    const unit_type = request.tech_unit_type;
    const test_units = request.tech_test_units;
    const deadlift = request.tech_deadlift;
    const standing_power_throw = request.tech_standing_power_throw;
    const hand_release = request.tech_hand_release;
    const sprint_min = request.tech_sprint_min;
    const sprint_sec = request.tech_sprint_sec;
    const plank_min = request.tech_plank_min;
    const plank_sec = request.tech_plank_sec;
    const mile_min = request.tech_mile_min;
    const mile_sec = request.tech_mile_sec;
    const leg_tuck = request.tech_leg_tuck;

    const dead_lift_score = {
      340: "100",
      330: "97",
      320: "94",
      310: "92",
      300: "90",
      290: "88",
      280: "86",
      270: "84",
      260: "82",
      250: "80",
      240: "78",
      230: "76",
      220: "74",
      210: "72",
      200: "70",
      190: "68",
      180: "65",
      170: "64",
      160: "63",
      150: "62",
      140: "60",
      130: "50",
      120: "40",
      110: "30",
      100: "20",
      90: "10",
      80: "0",
    };

    const power_throw_score = {
      12.5: "100",
      12.4: "99",
      12.3: "98",
      12.2: "98",
      12.1: "97",
      "12.0": "96",
      11.9: "96",
      11.8: "95",
      11.7: "94",
      11.6: "94",
      11.5: "93",
      11.4: "92",
      11.3: "92",
      11.2: "91",
      11.1: "90",
      "11.0": "90",
      10.9: "89",
      10.8: "88",
      10.7: "88",
      10.6: "87",
      10.5: "86",
      10.4: "86",
      10.3: "85",
      10.2: "84",
      10.1: "84",
      "10.0": "83",
      9.9: "82",
      9.8: "82",
      9.7: "81",
      9.6: "80",
      9.5: "80",
      9.4: "79",
      9.3: "78",
      9.2: "78",
      9.1: "77",
      "9.0": "76",
      8.9: "76",
      8.8: "75",
      8.7: "74",
      8.6: "74",
      8.5: "73",
      8.4: "72",
      8.3: "72",
      8.2: "71",
      8.1: "70",
      "8.0": "70",
      7.9: "69",
      7.8: "69",
      7.7: "68",
      7.6: "68",
      7.5: "68",
      7.4: "67",
      7.3: "67",
      7.2: "67",
      7.1: "67",
      "7.0": "66",
      6.9: "66",
      6.8: "66",
      6.7: "65",
      6.6: "65",
      6.5: "65",
      6.4: "64",
      6.3: "65",
      6.2: "64",
      6.1: "63",
      "6.0": "63",
      5.9: "63",
      5.8: "63",
      5.7: "62",
      5.6: "62",
      5.5: "62",
      5.4: "62",
      5.3: "61",
      5.2: "61",
      5.1: "61",
      "5.0": "61",
      4.9: "61",
      4.8: "60",
      4.7: "60",
      4.5: "60",
      4.6: "60",
      4.4: "55",
      4.3: "50",
      4.2: "45",
      4.1: "40",
      "4.0": "35",
      3.9: "30",
      3.8: "25",
      3.7: "20",
      3.6: "15",
      3.5: "10",
      3.4: "5",
      3.3: "1",
      3.2: "0",
    };

    const hand_release_score = {
      60: "100",
      59: "99",
      58: "98",
      57: "97",
      56: "96",
      55: "95",
      54: "94",
      53: "93",
      52: "92",
      51: "91",
      50: "90",
      49: "89",
      48: "88",
      47: "87",
      46: "86",
      45: "85",
      44: "84",
      43: "83",
      42: "82",
      41: "81",
      40: "80",
      39: "79",
      38: "78",
      37: "77",
      36: "76",
      35: "75",
      34: "74",
      33: "73",
      32: "72",
      31: "71",
      30: "70",
      29: "69",
      28: "69",
      27: "68",
      26: "68",
      25: "67",
      24: "67",
      23: "66",
      22: "66",
      21: "65",
      20: "65",
      19: "64",
      18: "64",
      17: "63",
      16: "63",
      15: "62",
      14: "62",
      13: "61",
      12: "61",
      10: "60",
      9: "55",
      8: "50",
      7: "45",
      6: "40",
      5: "35",
      4: "30",
      3: "25",
      2: "20",
      1: "15",
      0: "0",
    };

    const spring_drag_score = {
      "1:33": "100",
      1.34: "99",
      "1:35": "99",
      1.36: "99",
      1.37: "99",
      1.38: "99",
      "1:39": "98",
      "1:40": "98",
      "1:41": "97",
      "1:42": "97",
      "1:43": "96",
      "1:44": "96",
      "1:45": "95",
      "1:46": "94",
      "1:47": "93",
      "1:48": "92",
      "1:49": "91",
      "1:50": "90",
      "1:51": "89",
      "1:52": "88",
      "1:53": "87",
      "1:54": "86",
      "1:55": "85",
      "1:56": "84",
      "1:57": "83",
      "1:58": "82",
      "1:59": "81",
      "2:00": "80",
      "2:01": "79",
      "2:02": "78",
      "2:03": "77",
      "2:04": "76",
      "2:05": "75",
      "2:06": "74",
      "2:07": "73",
      "2:08": "72",
      "2:09": "71",
      "2:10": "70",
      2.11: "69",
      2.12: "69",
      2.13: "69",
      "2:14": "69",
      "2:18": "68",
      2.15: "68",
      2.16: "68",
      2.17: "68",
      2.19: "68",
      "2.20": "67",
      2.21: "67",
      2.23: "66",
      2.24: "66",
      2.25: "66",
      2.27: "65",
      2.28: "65",
      2.29: "65",
      2.31: "64",
      2.32: "64",
      2.33: "64",
      2.34: "64",
      2.36: "63",
      2.37: "63",
      2.38: "63",
      2.39: "63",
      2.41: "62",
      2.42: "62",
      2.43: "62",
      2.44: "62",
      2.46: "61",
      2.47: "61",
      2.48: "61",
      2.49: "61",
      "2:22": "67",
      "2:26": "66",
      "2:30": "65",
      "2:35": "64",
      "2:40": "63",
      "2:45": "62",
      "2:50": "61",
      "3:00": "60",
      "3:01": "59",
      "3:02": "58",
      "3:03": "57",
      "3:04": "56",
      "3:05": "55",
      "3:06": "54",
      "3:07": "53",
      "3:08": "52",
      "3:09": "51",
      "3:10": "50",
      "3:11": "48",
      "3:12": "46",
      "3:13": "44",
      "3:14": "42",
      "3:15": "40",
      "3:16": "38",
      "3:17": "36",
      "3:18": "34",
      "3:19": "32",
      "3:20": "30",
      "3:21": "28",
      "3:22": "26",
      "3:23": "24",
      "3:24": "22",
      "3:25": "20",
      "3:26": "18",
      "3:27": "16",
      "3:28": "14",
      "3:29": "12",
      "3:30": "10",
      "3:31": "8",
      "3:32": "6",
      "3:33": "4",
      "3:34": "2",
      "3:35": "0",
    };

    const leg_tuck_score = {
      20: "100",
      19: "98",
      18: "96",
      17: "94",
      16: "92",
      15: "90",
      14: "88",
      13: "86",
      12: "84",
      11: "82",
      10: "80",
      9: "78",
      8: "76",
      7: "74",
      6: "72",
      5: "70",
      4: "68",
      3: "65",
      2: "62",
      1: "60",
      0: "0",
    };

    const two_miles_run = {
      "13:30": "100",
      "13:39": "99",
      "13:38": "99",
      "13:37": "99",
      "13:36": "99",
      "13:35": "99",
      "13:34": "99",
      "13:33": "99",
      "13:32": "99",
      13.31: "99",
      "13:40": "98",
      "13:41": "98",
      "13:42": "98",
      "13:43": "98",
      "13:44": "98",
      13.45: "98",
      13.46: "98",
      13.47: "98",
      "13:48": "98",
      "13:49": "97",
      "13:50": "97",
      "13:51": "97",
      "13:52": "97",
      "13:53": "97",
      "13:54": "97",
      "13:55": "97",
      "13:56": "97",
      "13:57": "97",
      "13:58": "96",
      "13:59": "96",
      "14:00": "96",
      "14:01": "96",
      "14:02": "96",
      "14:03": "96",
      "14:04": "96",
      "14:05": "96",
      "14:06": "96",
      "14:07": "95",
      "14:08": "95",
      "14:09": "95",
      "14:10": "95",
      "14:11": "95",
      "14:12": "95",
      "14:13": "95",
      "14:14": "95",
      "14:15": "95",
      "14:16": "94",
      "14:17": "94",
      "14:18": "94",
      "14:19": "94",
      "14:20": "94",
      "14:21": "94",
      "14:22": "94",
      "14:23": "94",
      "14:24": "94",
      "14:25": "93",
      "14:26": "93",
      "14:27": "93",
      "14:28": "93",
      "14:29": "93",
      "14:30": "93",
      "14:31": "93",
      "14:32": "93",
      "14:33": "93",
      "14:34": "92",
      "14:35": "92",
      "14:36": "92",
      "14:37": "92",
      "14:38": "92",
      "14:39": "92",
      "14:40": "92",
      "14:41": "92",
      "14:42": "92",
      "14:43": "91",
      "14:44": "91",
      "14:45": "91",
      "14:46": "91",
      "14:47": "91",
      "14:48": "91",
      "14:49": "91",
      "14:50": "91",
      "14:51": "91",
      "15:00": "90",
      "15:01": "89",
      "15:02": "89",
      "15:03": "89",
      "15:04": "89",
      "15:05": "89",
      "15:06": "89",
      "15:07": "89",
      "15:08": "89",
      "15:09": "89",
      "15:10": "88",
      "15:11": "88",
      "15:12": "88",
      "15:13": "88",
      "15:14": "88",
      "15:15": "88",
      "15:16": "88",
      "15:17": "88",
      "15:18": "88",
      "15:19": "87",
      "15:20": "87",
      "15:21": "87",
      "15:22": "87",
      "15:23": "87",
      "15:24": "87",
      "15:25": "87",
      "15:26": "87",
      "15:27": "87",
      "15:28": "86",
      "15:29": "86",
      "15:30": "86",
      "15:31": "86",
      "15:32": "86",
      "15:33": "86",
      "15:34": "86",
      "15:35": "86",
      "15:36": "86",
      "15:37": "85",
      "15:38": "85",
      "15:39": "85",
      "15:40": "85",
      "15:41": "85",
      "15:42": "85",
      "15:43": "85",
      "15:44": "85",
      "15:45": "85",
      "15:46": "84",
      "15:47": "84",
      "15:48": "84",
      "15:49": "84",
      "15:50": "84",
      "15:51": "84",
      "15:52": "84",
      15.53: "84",
      "15:54": "84",
      "16:03": "83",
      "16:04": "82",
      "16:05": "82",
      "16:06": "82",
      "16:07": "82",
      "16:08": "82",
      "16:09": "82",
      "16:10": "82",
      "16:11": "82",
      "16:12": "82",
      "16:13": "81",
      "16:14": "81",
      "16:15": "81",
      "16:16": "81",
      "16:17": "81",
      "16:18": "81",
      "16:19": "81",
      "16:20": "81",
      "16:21": "81",
      "16:22": "80",
      "16:23": "80",
      "16:24": "80",
      "16:25": "80",
      "16:26": "80",
      "16:27": "80",
      "16:28": "80",
      "16:29": "80",
      "16:30": "80",
      "16:31": "79",
      "16:32": "79",
      "16:33": "79",
      "16:34": "79",
      "16:35": "79",
      "16:36": "79",
      "16:37": "79",
      "16:38": "79",
      "16:39": "79",
      "16:40": "78",
      "16:41": "78",
      "16:42": "78",
      "16:43": "78",
      "16:44": "78",
      "16:45": "78",
      "16:46": "78",
      "16:47": "78",
      "16:48": "78",
      "16:49": "77",
      "16:50": "77",
      "16:51": "77",
      "16:52": "77",
      "16:53": "77",
      "16:54": "77",
      "16:55": "77",
      "16:56": "77",
      "16:57": "77",
      "17:06": "76",
      "17:07": "75",
      "17:08": "75",
      "17:09": "75",
      "17:10": "75",
      "17:11": "75",
      "17:12": "75",
      "17:13": "75",
      "17:14": "75",
      "17:15": "75",
      "17:16": "74",
      "17:17": "74",
      "17:18": "74",
      "17:19": "74",
      "17:20": "74",
      "17:21": "74",
      "17:22": "74",
      "17:23": "74",
      "17:24": "74",
      "17:25": "73",
      "17:26": "73",
      "17:27": "73",
      "17:28": "73",
      "17:29": "73",
      "17:30": "73",
      "17:31": "73",
      "17:32": "73",
      "17:33": "73",
      "17:34": "72",
      "17:35": "72",
      "17:36": "72",
      "17:37": "72",
      "17:38": "72",
      "17:39": "72",
      "17:40": "72",
      "17:41": "72",
      "17:42": "72",
      "17:43": "71",
      "17:44": "71",
      "17:45": "71",
      "17:46": "71",
      "17:47": "71",
      "17:48": "71",
      "17:49": "71",
      "17:50": "71",
      "17:51": "71",
      "18:00": "69",
      "18:01": "69",
      "18:02": "69",
      "18:03": "69",
      "18:04": "69",
      "18:05": "69",
      "18:06": "69",
      "18:07": "69",
      "18:08": "69",
      "18:09": "69",
      "18:10": "69",
      "18:11": "69",
      "18:12": "69",
      "18:13": "68",
      "18:14": "68",
      "18:15": "68",
      "18:16": "68",
      "18:17": "68",
      "18:18": "68",
      "18:19": "68",
      "18:20": "68",
      "18:21": "68",
      "18:22": "68",
      "18:23": "68",
      "18:24": "68",
      "18:25": "67",
      "18:26": "67",
      "18:27": "67",
      "18:28": "67",
      "18:29": "67",
      "18:30": "67",
      "18:31": "67",
      "18:32": "67",
      "18:33": "67",
      "18:34": "67",
      "18:35": "67",
      "18:36": "67",
      "18:37": "66",
      "18:38": "66",
      "18:39": "66",
      "18:40": "66",
      "18:41": "66",
      "18:42": "66",
      "18:43": "66",
      "18:44": "66",
      "18:45": "66",
      "18:46": "66",
      "18:47": "66",
      "18:48": "66",
      "19:00": "65",
      "19:01": "64",
      "19:02": "64",
      "19:03": "64",
      "19:04": "64",
      "19:05": "64",
      "19:06": "64",
      "19:07": "64",
      "19:08": "64",
      "19:09": "64",
      "19:10": "64",
      "19:11": "64",
      "19:12": "64",
      "19:13": "64",
      "19:14": "64",
      "19:15": "64",
      "19:16": "64",
      "19:17": "64",
      "19:18": "64",
      "19:19": "64",
      "19:20": "64",
      "19:21": "64",
      "19:22": "64",
      "19:23": "64",
      "19:24": "64",
      "19:24": "64",
      "19:25": "63",
      "19:26": "63",
      "19:27": "63",
      "19:28": "63",
      "19:29": "63",
      "19:30": "63",
      "19:31": "63",
      "19:32": "63",
      "19:33": "63",
      "19:34": "63",
      "19:35": "63",
      "19:36": "63",
      1937: "63",
      "19:38": "63",
      "19:39": "63",
      "19:40": "63",
      "19:41": "63",
      "19:42": "63",
      "19:43": "63",
      "19:44": "63",
      "19:45": "63",
      "19:46": "63",
      "19:47": "63",
      "19:48": "63",
      "20:12": "62",
      "20:13": "61",
      "20:14": "61",
      "20:15": "61",
      "20:16": "61",
      "20:17": "61",
      "20:18": "61",
      "20:19": "61",
      "20:20": "61",
      "20:21": "61",
      "20:22": "61",
      "20:23": "61",
      "20:24": "61",
      "20:25": "61",
      "20:26": "61",
      "20:27": "61",
      "20:28": "61",
      "20:29": "61",
      "20:30": "61",
      "20:31": "61",
      "20:32": "61",
      "20:33": "61",
      "20:34": "61",
      "20:35": "61",
      "20:36": "61",
      "21:00": "60",
      "21:01": "59",
      "21:02": "58",
      "21:03": "58",
      "21:04": "57",
      "21:05": "57",
      "21:06": "56",
      "21:07": "56",
      "21:08": "55",
      "21:09": "55",
      "21:10": "54",
      "21:11": "53",
      "21:12": "53",
      "21:13": "52",
      "21:14": "52",
      "21:15": "51",
      "21:16": "51",
      "21:17": "50",
      "21:18": "50",
      "21:19": "48",
      "21:20": "48",
      "21:21": "48",
      "21:22": "47",
      "21:23": "47",
      "21:24": "46",
      "21:25": "46",
      "21:26": "45",
      "21:27": "45",
      "21:28": "44",
      "21:29": "43",
      "21:30": "43",
      "21:31": "42",
      "21:32": "42",
      "21:33": "41",
      "21:34": "41",
      "21:35": "40",
      "21:36": "40",
      "21:37": "39",
      "21:38": "38",
      "21:39": "38",
      "21:40": "37",
      "21:41": "37",
      "21:42": "36",
      "21:43": "36",
      "21:44": "35",
      "21:45": "35",
      "21:46": "34",
      "21:47": "33",
      "22:48": "33",
      "21:49": "32",
      "21:50": "32",
      "21:51": "31",
      "21:52": "31",
      "21:53": "30",
      "21:54": "30",
      "21:55": "29",
      "21:56": "28",
      "21:57": "28",
      "21:58": "27",
      "21:59": "27",
      "22:01": "26",
      "22:02": "25",
      "22:03": "25",
      "22:04": "24",
      "22:05": "23",
      "22:06": "23",
      "22:07": "22",
      "22:08": "22",
      "22:09": "21",
      "22:10": "21",
      "22:11": "20",
      "22:12": "20",
      "22:13": "19",
      "22:14": "18",
      "22:15": "18",
      "22:16": "17",
      "22:17": "17",
      "22:18": "16",
      "22:19": "16",
      "22:20": "15",
      "22:21": "15",
      "22:22": "14",
      "22:23": "13",
      "22:24": "13",
      "22:25": "12",
      "22:26": "12",
      "22:27": "11",
      "22:28": "11",
      "22:29": "10",
      "22:30": "10",
      "22:31": "9",
      "22:32": "8",
      "22:33": "8",
      "22:34": "7",
      "22:35": "7",
      "22:36": "6",
      "22:37": "6",
      "22:38": "5",
      "22:39": "5",
      "22:40": "4",
      "22:41": "3",
      "22:42": "3",
      "22:43": "2",
      "22:44": "2",
      "22:45": "1",
      "22:46": "1",
      "22:47": "0",
      "22:48": "0",
    };

    const plunk = {
      "2:03": "58",
      "2:04": "58",
      "2:05": "58",
      "2:06": "59",
      "2:07": "59",
      "2:08": "59",
      "2:09": "60",
      "2:10": "60",
      "2:11": "60",
      "2:12": "61",
      "2:13": "61",
      "2:14": "61",
      "2:15": "62",
      "2:16": "62",
      "2:17": "62",
      "2:18": "63",
      "2:19": "63",
      "2:20": "63",
      "2:21": "64",
      "2:22": "64",
      "2:23": "64",
      "2:24": "65",
      "2:25": "65",
      "2:26": "65",
      "2:27": "66",
      "2:28": "66",
      "2:29": "66",
      "2:30": "67",
      "2:31": "67",
      "2:32": "67",
      "2:33": "68",
      "2:34": "68",
      "2:35": "68",
      "2:36": "69",
      "2:37": "69",
      "2:38": "69",
      "2:39": "69",
      "2:40": "70",
      "2:41": "70",
      "2:42": "70",
      "2:43": "71",
      "2:44": "71",
      "2:45": "71",
      "2:46": "72",
      "2:47": "72",
      "2:48": "72",
      "2:49": "72",
      "2:50": "73",
      "2:51": "73",
      "2:52": "73",
      "2:53": "74",
      "2:54": "74",
      "2:55": "74",
      "2:56": "75",
      "2:57": "75",
      "2:58": "75",
      "3:02": "76",
      "3:03": "76",
      "3:04": "76",
      "3:05": "77",
      "3:06": "77",
      "3:07": "77",
      "3:08": "78",
      "3:09": "78",
      "3:10": "78",
      "3:11": "78",
      "3:12": "79",
      "3:13": "79",
      "3:14": "79",
      "3:15": "80",
      "3:16": "80",
      "3:17": "80",
      "3:18": "81",
      "3:19": "81",
      "3:20": "81",
      "3:21": "82",
      "3:22": "82",
      "3:23": "82",
      "3:24": "82",
      "3:25": "83",
      "3:26": "83",
      "3:27": "83",
      "3:28": "84",
      "3:29": "84",
      "3:30": "84",
      "3:31": "85",
      "3:32": "85",
      "3:33": "85",
      "3:34": "85",
      "3:35": "86",
      "3:36": "86",
      "3:37": "86",
      "3:38": "87",
      "3:39": "87",
      "3:40": "87",
      "3:41": "88",
      "3:42": "88",
      "3:43": "88",
      "3:44": "89",
      "3:45": "89",
      "3:46": "89",
      "3:47": "89",
      "3:48": "90",
      "3:49": "90",
      "3:50": "90",
      "3:51": "91",
      "3:52": "91",
      "3:53": "91",
      "3:54": "92",
      "3:55": "92",
      "3:56": "92",
      "3:57": "92",
      "3:58": "93",
      "3:59": "93",
      "4:0": "93",
      "4:1": "94",
      "4:2": "94",
      "4:3": "94",
      "4:4": "95",
      "4:5": "95",
      "4:6": "95",
      "4:7": "96",
      "4:8": "96",
      "4:9": "96",
      "4:10": "96",
      "4:11": "97",
      "4:12": "97",
      "4:13": "97",
      "4:14": "98",
      "4:15": "98",
      "4:16": "98",
      "4:17": "99",
      "4:18": "99",
      "4:19": "99",
      "4:20": "100",
    };

    const param = {};

    // Unit type configuration
    if (unit_type == "1") {
      // Heavy
      param.tech_min_score = 70;
      param.tech_mdl_value = 200;
      param.tech_spt_value = 8.0;
      param.tech_hrp_value = 30;
      param.tech_sdc_value = "2:10";
      param.tech_ltk_value = 5;
      param.tech_plk_value = "2:42";
      param.tech_two_miles_value = "18:00";
    } else if (unit_type == "2") {
      // Significant
      param.tech_min_score = 65;
      param.tech_mdl_value = 180;
      param.tech_spt_value = 6.5;
      param.tech_hrp_value = 20;
      param.tech_sdc_value = "2:30";
      param.tech_ltk_value = 3;
      param.tech_plk_value = "2:26";
      param.tech_two_miles_value = "19:00";
    } else if (unit_type == "3") {
      // Moderate
      param.tech_min_score = 60;
      param.tech_mdl_value = 140;
      param.tech_spt_value = 4.5;
      param.tech_hrp_value = 10;
      param.tech_sdc_value = "3:00";
      param.tech_ltk_value = 1;
      param.tech_plk_value = "2:09";
      param.tech_two_miles_value = "21:00";
    }

    // Test units processing - PLANK VALIDATION FIRST
    if (test_units == "2") {
      if (isNumeric(plank_min) && isNumeric(plank_sec)) {
        const combine_plank = `${plank_min}:${plank_sec}`;

        // YAHI CHANGE KIYA HAI - sirf yeh error return karo
        if (compareTimes(combine_plank, "4:00") > 0) {
          return {
            error: "Plank Time cannot be more than 4:00.",
          };
        }
      }
    }

    // Baaki ka code continue karo...
    if (test_units == "1") {
      if (isNumeric(leg_tuck)) {
        // 7-Leg Tuck
        if (leg_tuck < 0) {
          param.error = "Leg Tuck Reps cannot be less than 0.";
          return param;
        } else if (leg_tuck > 20) {
          param.error = "Leg Tuck Reps cannot be more than 20.";
          return param;
        } else {
          let leg_tuck_answer = leg_tuck_score[leg_tuck.toString()];
          param.tech_leg_tuck_answer = leg_tuck_answer;
        }
      } else {
        param.error = "Please! Check Your Input.";
        return param;
      }
    } else if (test_units == "2") {
      if (isNumeric(plank_min) && isNumeric(plank_sec)) {
        // 6-Plank Min
        const combine_plank = `${plank_min}:${plank_sec}`;

        if (compareTimes(combine_plank, "2:03") < 0) {
          param.error = "Plank Time cannot be less than 2:03.";
          return param;
        } else if (
          compareTimes(combine_plank, "2:59") >= 0 &&
          compareTimes(combine_plank, "3:01") <= 0
        ) {
          param.tech_plank_answer = 75;
        } else if (
          compareTimes(combine_plank, "3:59") >= 0 &&
          compareTimes(combine_plank, "4:00") <= 0
        ) {
          param.tech_plank_answer = 93;
        } else {
          param.plank_answer = plunk[combine_plank];
        }
      } else {
        param.error = "Please! Check Your Input.";
        return param;
      }
    }

    // Main calculations
    if (
      isNumeric(deadlift) &&
      isNumeric(standing_power_throw) &&
      isNumeric(hand_release) &&
      isNumeric(sprint_min) &&
      isNumeric(sprint_sec)
    ) {
      let dead_lift_answer,
        power_throw_score_answer,
        hand_release_score_answer,
        sst,
        two_mile_answer;

      // 1-DeadLift Validation and Calculation
      if (deadlift < 80) {
        param.error = "DeadLift pounds cannot be less than 80.";
        return param;
      } else if (deadlift > 340) {
        param.error = "DeadLift pounds cannot be more than 340.";
        return param;
      } else {
        dead_lift_answer = dead_lift_score[deadlift.toString()];
      }

      // 2-Power Throw Score
      if (standing_power_throw > 12.5) {
        param.error =
          "Standing Power Throw meters cannot be greater than 12.5.";
        return param;
      } else if (standing_power_throw < 3.2) {
        param.error = "Standing Power Throw meters cannot be less than 3.2.";
        return param;
      } else {
        power_throw_score_answer =
          power_throw_score[standing_power_throw.toString()];
      }

      // 3-Hand-release push-up
      if (hand_release > 60) {
        param.error = "Hand Release Push Up cannot be greater than 60.";
        return param;
      } else if (hand_release < 0) {
        param.error = "Hand Release Push Up cannot be less than 0.";
        return param;
      } else {
        hand_release_score_answer = hand_release_score[hand_release.toString()];
      }

      // 4-Sprint Drag and Carry
      const spring_drag_score_value = `${sprint_min}:${sprint_sec}`;
      if (compareTimes(spring_drag_score_value, "3:35") > 0) {
        param.error = "Spring Drag and Carry Time cannot be greater than 3:35.";
        return param;
      } else if (compareTimes(spring_drag_score_value, "1:33") < 0) {
        param.error = "Spring Drag and Carry Time cannot be less than 1:33.";
        return param;
      } else if (
        compareTimes(spring_drag_score_value, "1:60") >= 0 &&
        compareTimes(spring_drag_score_value, "1:99") <= 0
      ) {
        sst = 80;
      } else if (
        compareTimes(spring_drag_score_value, "2:51") >= 0 &&
        compareTimes(spring_drag_score_value, "2:99") <= 0
      ) {
        sst = 60;
      } else {
        sst = spring_drag_score[spring_drag_score_value];
      }

      // 5-Two Mile Run
      const combine_mile_value = `${mile_min}:${mile_sec}`;
      if (compareTimes(combine_mile_value, "13:30") < 0) {
        param.error = "Two Mile Run Time cannot be less than 13:30.";
        return param;
      } else if (compareTimes(combine_mile_value, "22:48") > 0) {
        param.error = "Two Mile Run Time cannot be greater than 22:48.";
        return param;
      } else if (
        compareTimes(combine_mile_value, "13:60") >= 0 &&
        compareTimes(combine_mile_value, "13:99") <= 0
      ) {
        two_mile_answer = 96;
      } else if (
        compareTimes(combine_mile_value, "14:52") >= 0 &&
        compareTimes(combine_mile_value, "14:99") <= 0
      ) {
        two_mile_answer = 90;
      } else if (
        compareTimes(combine_mile_value, "15:55") >= 0 &&
        compareTimes(combine_mile_value, "16:02") <= 0
      ) {
        two_mile_answer = 83;
      } else if (
        compareTimes(combine_mile_value, "16:58") >= 0 &&
        compareTimes(combine_mile_value, "17:05") <= 0
      ) {
        two_mile_answer = 76;
      } else if (
        compareTimes(combine_mile_value, "17:52") >= 0 &&
        compareTimes(combine_mile_value, "17:99") <= 0
      ) {
        two_mile_answer = 70;
      } else if (
        compareTimes(combine_mile_value, "18:49") >= 0 &&
        compareTimes(combine_mile_value, "18:99") <= 0
      ) {
        two_mile_answer = 65;
      } else if (
        compareTimes(combine_mile_value, "19:49") >= 0 &&
        compareTimes(combine_mile_value, "20:11") <= 0
      ) {
        two_mile_answer = 62;
      } else if (
        compareTimes(combine_mile_value, "20:37") >= 0 &&
        compareTimes(combine_mile_value, "20:99") <= 0
      ) {
        two_mile_answer = 60;
      } else if (
        compareTimes(combine_mile_value, "21:60") >= 0 &&
        compareTimes(combine_mile_value, "22:00") <= 0
      ) {
        two_mile_answer = 26;
      } else {
        two_mile_answer = two_miles_run[combine_mile_value];
      }

      param.tech_dead_lift_score = dead_lift_answer;
      param.tech_power_throw_score_answer = power_throw_score_answer;
      param.tech_two_miles_run_values = two_mile_answer;
      param.tech_spring_drag_score_answer = sst;
      param.tech_hand_release_answer = hand_release_score_answer;
      param.tech_request = request;
    } else {
      param.error = "Please! Check Your Input.";
      return param;
    }

    return param;

    // Helper functions
    function isNumeric(value) {
      return !isNaN(parseFloat(value)) && isFinite(value);
    }

    function compareTimes(time1, time2) {
      const [min1, sec1] = time1.split(":").map(Number);
      const [min2, sec2] = time2.split(":").map(Number);

      const total1 = min1 * 60 + sec1;
      const total2 = min2 * 60 + sec2;

      if (total1 < total2) return -1;
      if (total1 > total2) return 1;
      return 0;
    }
  }

  /**
   * getCalculationCarboplatinCalculator: Service Method
   * POST: /api/calculators-lol/carboplatin-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationCarboplatinCalculator(body) {
    const request = body;

    const type = request.tech_type;
    const operations = request.tech_operations;
    const first = parseFloat(request.tech_first);
    const second = parseFloat(request.tech_second);
    const s_units = request.tech_s_units;
    const third = parseFloat(request.tech_third);
    const t_units = request.tech_t_units;
    const four = parseFloat(request.tech_four);
    const five = parseFloat(request.tech_five);
    const f_units = request.tech_f_units;

    let s_units_val = 1;
    if (s_units == "kg") {
      s_units_val = 1;
    } else if (s_units == "lbs") {
      s_units_val = 2;
    } else if (s_units == "stone") {
      s_units_val = 3;
    }

    let t_units_val = 1;
    if (t_units == "mg/dL") {
      t_units_val = 1;
    } else if (t_units == "μmol/L") {
      t_units_val = 2;
    }

    let f_units_val = 1;
    if (f_units == "in") {
      f_units_val = 1;
    } else if (f_units == "cm") {
      f_units_val = 2;
    }

    // Helper functions
    function baby(a, b) {
      if (a == "1") {
        return b * 1;
      } else if (a == "2") {
        return b * 0.011312;
      }
      return b;
    }

    function baby2(a, b) {
      if (a == "1") {
        return b * 88.4;
      } else if (a == "2") {
        return b * 1;
      }
      return b;
    }

    function wazan(a, b) {
      if (a == "1") {
        return b * 1;
      } else if (a == "2") {
        return b * 0.4536;
      } else if (a == "3") {
        return b * 6.35;
      }
      return b;
    }

    function kad(a, b) {
      if (a == "1") {
        return b * 2.54;
      } else if (a == "2") {
        return b * 1;
      }
      return b;
    }

    function kad2(a, b) {
      if (a == "1") {
        return b * 1;
      } else if (a == "2") {
        return b / 2.54;
      }
      return b;
    }

    const five2 = five;
    const f_units2 = f_units_val;
    const third2 = third;
    const t_units2 = t_units_val;

    const third_converted = baby(t_units_val.toString(), third);
    const second_converted = wazan(s_units_val.toString(), second);
    const five_converted = kad(f_units_val.toString(), five);
    const five2_converted = kad2(f_units2.toString(), five2);
    const third2_converted = baby2(t_units2.toString(), third2);

    const param = {};

    if (type == "first") {
      if (first >= 18) {
        const batien = 140 - first;
        const divi = 72 * third_converted;
        const dosra = second_converted / divi;
        const grf = batien * dosra;

        let answer;
        if (operations == "1") {
          answer = grf;
        } else if (operations == "2") {
          answer = 0.85 * grf;
        }

        const max_dos = four * 150;
        const car_dos = four * (answer + 25);

        param.tech_answer = answer;
        param.tech_max_dos = max_dos;
        param.tech_car_dos = car_dos;
      } else {
        param.error =
          "This calculator should not be used in patients <18 years old.";
        return param;
      }
    } else if (type == "second") {
      if (first >= 18) {
        if (!isNaN(second) && !isNaN(third) && !isNaN(five)) {
          const second_pow = Math.pow(second_converted, 0.425);
          const five_pow = Math.pow(five_converted, 0.725);
          const bsa = 0.007184 * second_pow * five_pow;

          if (operations == 1) {
            // Male calculations
            const minus = five2_converted - 60;
            const multi = 2.3 * minus;
            const ibw = 50 + multi;

            // abw and abw alt answer
            const minus2 = second_converted - ibw;
            const multi2 = 0.4 * minus2;
            const abw = ibw + multi2;
            const multi3 = 0.3 * minus2;
            const abw_alt = ibw + multi3;

            // jellife first (ml/min)
            const minus1 = first - 20;
            const mul1 = 0.8 * minus1;
            const minus11 = 98 - mul1;
            const jell_ans1 = minus11 / third_converted;
            const jell_ans11 = (jell_ans1 + 25) * four;

            // jellife second (ml/min)
            const bsa_div = bsa / 1.73;
            const up_sol = minus11 * bsa_div;
            const div_sol = third2_converted * 0.0113;
            const jell_ans2 = up_sol / div_sol;
            const jell_ans22 = (jell_ans2 + 25) * four;

            // Cockcroft & Gault actual body weight (ml/min)
            const cg_minus = 140 - 22;
            const cgup_mul = second_converted * cg_minus;
            const cglo_mul = 72 * third_converted;
            const cg_ac_ans = cgup_mul / cglo_mul;
            const cg_ac_ans2 = (cg_ac_ans + 25) * four;

            // Cockcroft & Gault ideal body weight (ml/min)
            const cgup_mul1 = ibw * cg_minus;
            const cg_ibw_ans = cgup_mul1 / cglo_mul;
            const cg_ibw_ans2 = (cg_ibw_ans + 25) * four;

            // Cockcroft & Gault adjusted body weight (ml/min)
            const cgup_mul2 = abw * cg_minus;
            const cg_abw_ans = cgup_mul2 / cglo_mul;
            const cg_abw_ans2 = (cg_abw_ans + 25) * four;

            // Cockcroft & Gault adjusted body weight alt (ml/min)
            const cgup_mul3 = abw_alt * cg_minus;
            const cg_abwalt_ans = cgup_mul3 / cglo_mul;
            const cg_abwalt_ans2 = (cg_abwalt_ans + 25) * four;

            // Store results
            param.tech_bsa = Number(bsa.toFixed(2));
            param.tech_ibw = ibw;
            param.tech_abw = abw;
            param.tech_abw_alt = abw_alt;
            param.tech_jell_ans1 = jell_ans1;
            param.tech_jell_ans2 = jell_ans2;
            param.tech_cg_ac_ans = cg_ac_ans;
            param.tech_cg_ibw_ans = cg_ibw_ans;
            param.tech_cg_abw_ans = cg_abw_ans;
            param.tech_cg_abwalt_ans = cg_abwalt_ans;
            param.tech_jell_ans11 = jell_ans11;
            param.tech_jell_ans22 = jell_ans22;
            param.tech_cg_ac_ans2 = cg_ac_ans2;
            param.tech_cg_ibw_ans2 = cg_ibw_ans2;
            param.tech_cg_abw_ans2 = cg_abw_ans2;
            param.tech_cg_abwalt_ans2 = cg_abwalt_ans2;
          } else if (operations == 2) {
            // Female calculations
            const minus = five2_converted - 60;
            const multi = 2.3 * minus;
            const ibw = 45.5 + multi;

            // abw and abw alt answer
            const minus2 = second_converted - ibw;
            const multi2 = 0.4 * minus2;
            const abw = ibw + multi2;
            const multi3 = 0.3 * minus2;
            const abw_alt = ibw + multi3;

            // jellife first (ml/min)
            const minus1 = first - 20;
            const mul1 = 0.8 * minus1;
            const minus11 = 98 - mul1;
            const female_jell = minus11 / third_converted;
            const jell_ans1 = female_jell * 0.9;
            const jell_ans11 = (jell_ans1 + 25) * four;

            // jellife second (ml/min)
            const bsa_div = bsa / 1.73;
            const up_sol = minus11 * bsa_div * 0.9;
            const div_sol = third2_converted * 0.0113;
            const jell_ans2 = up_sol / div_sol;
            const jell_ans22 = (jell_ans2 + 25) * four;

            // Cockcroft & Gault actual body weight (ml/min)
            const cg_minus = 140 - 22;
            const cgup_mul = second_converted * cg_minus;
            const cglo_mul = 72 * third_converted;
            const cg_female = cgup_mul / cglo_mul;
            const cg_ac_ans = cg_female * 0.85;
            const cg_ac_ans2 = (cg_ac_ans + 25) * four;

            // Cockcroft & Gault ideal body weight (ml/min)
            const cgup_mul1 = ibw * cg_minus;
            const cg_ibw_fe = cgup_mul1 / cglo_mul;
            const cg_ibw_ans = cg_ibw_fe * 0.85;
            const cg_ibw_ans2 = (cg_ibw_ans + 25) * four;

            // Cockcroft & Gault adjusted body weight (ml/min)
            const cgup_mul2 = abw * cg_minus;
            const cg_abw_fe = cgup_mul2 / cglo_mul;
            const cg_abw_ans = cg_abw_fe * 0.85;
            const cg_abw_ans2 = (cg_abw_ans + 25) * four;

            // Cockcroft & Gault adjusted body weight alt (ml/min)
            const cgup_mul3 = abw_alt * cg_minus;
            const cg_abwalt_fe = cgup_mul3 / cglo_mul;
            const cg_abwalt_ans = cg_abwalt_fe * 0.85;
            const cg_abwalt_ans2 = (cg_abwalt_ans + 25) * four;

            // Store results
            param.tech_bsa = Number(bsa.toFixed(2));
            param.tech_ibw = ibw;
            param.tech_abw = abw;
            param.tech_abw_alt = abw_alt;
            param.tech_jell_ans1 = jell_ans1;
            param.tech_jell_ans2 = jell_ans2;
            param.tech_cg_ac_ans = cg_ac_ans;
            param.tech_cg_ibw_ans = cg_ibw_ans;
            param.tech_cg_abw_ans = cg_abw_ans;
            param.tech_cg_abwalt_ans = cg_abwalt_ans;
            param.tech_jell_ans11 = jell_ans11;
            param.tech_jell_ans22 = jell_ans22;
            param.tech_cg_ac_ans2 = cg_ac_ans2;
            param.tech_cg_ibw_ans2 = cg_ibw_ans2;
            param.tech_cg_abw_ans2 = cg_abw_ans2;
            param.tech_cg_abwalt_ans2 = cg_abwalt_ans2;
          }
        } else {
          param.error = "Please check your input.";
          return param;
        }
      } else {
        param.error =
          "This calculator should not be used in patients <18 years old.";
        return param;
      }
    }

    param.tech_request = request;
    return param;
  }

  /**
   * getCalculationVo2MaxCalculator: Service Method
   * POST: /api/calculators-lol/vo2-max-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationVo2MaxCalculator(body) {
    const request = body;
    const methods = request.tech_methods;
    const operations1 = request.tech_operations1;
    const operations2 = request.tech_operations2;
    const first = parseFloat(request.tech_first);
    var second = parseFloat(request.tech_second);
    const units2 = request.tech_units2;
    var third = parseFloat(request.tech_third);
    const units3 = request.tech_units3;
    const four = parseFloat(request.tech_four);
    let wazan;
    let units2_val = 1;
    if (units2 == "kg") {
      units2_val = 1;
    } else if (units2 == "lbs") {
      units2_val = 2;
    }

    let units3_val = 1;
    if (units3 == "sec") {
      units3_val = 1;
    } else if (units3 == "min") {
      units3_val = 2;
    }

    // Helper functions
    function kilo(a, b) {
      if (a == "1") {
        wazan = b * 2.205;
        //  console.log(a,b,wazan);
      } else if (a == "2") {
        wazan = b * 1;
      }
      return wazan;
    }

    function secint(a, b) {
      if (a == "1") {
        return b / 60;
      } else if (a == "2") {
        return b * 1;
      }
      return b;
    }

    var second = kilo(units2_val.toString(), second);
    var third = secint(units3_val.toString(), third);

    const param = {};
    let answer;

    if (methods == "1") {
      if (!isNaN(first) && !isNaN(four)) {
        const mul1 = 0.7 * first;
        const mhr = 208 - mul1;
        const rhr = four * 3;
        const divide = mhr / rhr;
        answer = 15.3 * divide;
      } else {
        param.error = "Please! Check Your Input.";
        return param;
      }
    } else if (methods == "2") {
      if (!isNaN(first) && !isNaN(second) && !isNaN(third) && !isNaN(four)) {
        if (operations1 == 1) {
          answer =
            132.853 -
            0.0769 * second -
            0.3877 * first +
            6.315 * 1 -
            3.2649 * third -
            0.1565 * four * 6;
        } else if (operations1 == 0) {
          answer =
            132.853 -
            0.0769 * second -
            0.3877 * first -
            3.2649 * third -
            0.1565 * four * 6;
        }
      } else {
        param.error = "Please! Check Your Input.";
        return param;
      }
    } else if (methods == "3") {
      if (!isNaN(four)) {
        if (operations1 == 1) {
          answer = 111.33 - 0.42 * four * 4;
        } else if (operations1 == 0) {
          answer = 65.81 - 0.1847 * four * 4;
        }
      } else {
        param.error = "Please! Check Your Input.";
        return param;
      }
    } else if (methods == "4") {
      if (!isNaN(third)) {
        answer = 483 / third + 3.5;
      } else {
        param.error = "Please! Check Your Input.";
        return param;
      }
    } else if (methods == "5") {
      if (!isNaN(second) && !isNaN(third)) {
        var second = second * 0.45359237; // lb -> kg
        if (operations1 == 1) {
          if (operations2 == 2) {
            if (second <= 75.0) {
              answer = ((15.1 - 1.5 * third) * 1000) / second;
            } else if (second > 75.0) {
              answer = ((15.7 - 1.5 * third) * 1000) / second;
            }
          } else if (operations2 == 1) {
            answer = ((10.7 - 0.9 * third) * 1000) / second;
          }
        } else if (operations1 == 0) {
          if (operations2 == 2) {
            if (second <= 61.36) {
              answer = ((14.6 - 1.5 * third) * 1000) / second;
            } else if (second > 61.36) {
              answer = ((14.9 - 1.5 * third) * 1000) / second;
            }
          } else if (operations2 == 1) {
            answer = ((10.26 - 0.93 * third) * 1000) / second;
          }
        }
      } else {
        param.error = "Please! Check Your Input.";
        return param;
      }
    }

    param.tech_answer = answer;
    return param;
  }

  /**
   * getCalculationAlleleFrequencyCalculator: Service Method
   * POST: /api/calculators-lol/allele-frequency-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationAlleleFrequencyCalculator(body) {
    let type = body.tech_type;
    let operations = body.tech_operations;
    let first = body.tech_first;
    let second = body.tech_second;
    let third = body.tech_third;
    let four = body.tech_four;

    let response = {};
    let pfreq, qfreq, p_square, q_square, p_q;

    if (type === "frst") {
      if (!isNaN(first) && !isNaN(second) && !isNaN(third)) {
        const mul1 = 0.5 * second;
        const downAdd =
          parseFloat(first) + parseFloat(second) + parseFloat(third);
        const p = parseFloat(first) + mul1;
        const q = parseFloat(third) + mul1;
        pfreq = p / downAdd;
        qfreq = q / downAdd;
      } else {
        response.error = "Please! Check Your Input.";
        return response;
      }
    } else if (type === "scnd") {
      if (operations === 1 || operations === 2) {
        if (!isNaN(four)) {
          if (four > 1) {
            const f_ans = 100 / four;
            const div = 1 / f_ans;
            qfreq = Math.sqrt(div);

            const A = 1;
            const B = 2 * qfreq;
            const q_sq = Math.pow(qfreq, 2);
            const C = q_sq - 1;
            const dis = Math.pow(B, 2) - 4 * A * C;

            if (dis > 0) {
              const x1 = (-B + Math.sqrt(dis)) / (2 * A);
              const x2 = (-B - Math.sqrt(dis)) / (2 * A);
              pfreq = Math.max(x1, x2);
            } else if (dis < 0) {
              // Complex roots (the original Laravel code turns them into strings)
              const realPart = -B / (2 * A);
              const imagPart = Math.sqrt(-dis) / (2 * A);
              const x1 = `${realPart} + ${imagPart}`;
              const x2 = `${realPart} - ${imagPart}`;
              pfreq = x1; // You could choose to return both as well
            } else {
              pfreq = -B / (2 * A);
            }

            response.tech_f_ans = f_ans;
          } else {
            response.error =
              "Occurrence of the disease must be greater than 1 in 1 person.";
            return response;
          }
        } else {
          response.error = "Please! Check Your Input.";
          return response;
        }
      }
    }

    if (
      pfreq !== undefined &&
      qfreq !== undefined &&
      !isNaN(pfreq) &&
      !isNaN(qfreq)
    ) {
      p_square = Math.pow(pfreq, 2);
      q_square = Math.pow(qfreq, 2);
      p_q = 2 * pfreq * qfreq;
    }

    response.tech_pfreq = pfreq;
    response.tech_qfreq = qfreq;
    response.tech_p_square = p_square;
    response.tech_q_square = q_square;
    response.tech_p_q = p_q;
    response.tech_type = body.tech_type;
    response.tech_operations = body.tech_operations;
    response.tech_first = body.tech_first;
    response.tech_second = body.tech_second;
    response.tech_third = body.tech_third;
    response.tech_four = body.tech_four;

    return response;
  }

  /**
   * getCalculationWeightWatchersPointsCalculator: Service Method
   * POST: /api/calculators-lol/weight-watchers-points-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationWeightWatchersPointsCalculator(body) {
    let fe = body.tech_fe;
    let fe_unit = body.tech_fe_unit;
    let sf = body.tech_sf;
    let sf_unit = body.tech_sf_unit;
    let sgr = body.tech_sgr;
    let sgr_unit = body.tech_sgr_unit;
    let ptn = body.tech_ptn;
    let ptn_unit = body.tech_ptn_unit;
    let ptn2 = body.tech_ptn2;
    let ptn2_unit = body.tech_ptn2_unit;
    let carbo = body.tech_carbo;
    let carbo_unit = body.tech_carbo_unit;
    let fat = body.tech_fat;
    let fat_unit = body.tech_fat_unit;
    let fiber = body.tech_fiber;
    let fiber_unit = body.tech_fiber_unit;
    let fat2 = body.tech_fat2;
    let fat2_unit = body.tech_fat2_unit;
    let fiber2 = body.tech_fiber2;
    let fiber2_unit = body.tech_fiber2_unit;
    let call2 = body.tech_call2;
    let call2_unit = body.tech_call2_unit;
    let selection = body.tech_selection;
    let weight = body.tech_weight;
    let weight_unit = body.tech_weight_unit;
    let height = body.tech_height;
    let height_unit = body.tech_height_unit;
    let age = body.tech_age;
    let gender = body.tech_gender;
    let activity = body.tech_activity;

    let response = {};
    let ans;

    // Convert energy units
    if (fe_unit === "cal") fe_unit = 1;
    else if (fe_unit === "kJ") fe_unit = 0.239006;
    else if (fe_unit === "J") fe_unit = 0.1434;

    if (call2_unit === "cal") call2_unit = 1;
    else if (call2_unit === "kJ") call2_unit = 0.239006;
    else if (call2_unit === "J") call2_unit = 0.1434;

    // Convert weight units
    if (weight_unit === "kg") weight_unit = 1;
    else if (weight_unit === "lbs") weight_unit = 0.453592;

    // Convert height units
    if (height_unit === "in") height_unit = 0.0254;
    else if (height_unit === "cm") height_unit = 1;

    function convertGrams(unit, value) {
      if (unit === "mg") return value / 1000;
      if (unit === "g") return value;
      if (unit === "kg") return value / 0.001;
      if (unit === "oz") return value / 0.03527396194958;
      if (unit === "lbs") return value / 0.002204622621849;
      if (unit === "dr") return value / 0.5643833911933;
      if (unit === "gr") return value / 15.43235835294;
      return value;
    }

    // Method 1
    if (selection === "1") {
      if (
        !isNaN(fe) &&
        !isNaN(sf) &&
        !isNaN(sgr) &&
        !isNaN(ptn) &&
        fe > 0 &&
        sf > 0 &&
        sgr > 0
      ) {
        const fev = fe_unit * fe;
        const sfv = convertGrams(sf_unit, sf);
        const sgrv = convertGrams(sgr_unit, sgr);
        const ptnv = convertGrams(ptn_unit, ptn);
        ans = Math.round(
          fev * 0.0305 + sfv * 0.275 + sgrv * 0.12 - ptnv * 0.098
        );
      } else {
        response.error = "Please! Check Your Input.";
        return response;
      }
    }

    // Method 2
    else if (selection === "2") {
      if (
        !isNaN(ptn2) &&
        !isNaN(fat) &&
        !isNaN(fiber) &&
        !isNaN(carbo) &&
        ptn2 > 0 &&
        fat > 0 &&
        fiber > 0 &&
        carbo > 0
      ) {
        const ptn2_val = convertGrams(ptn2_unit, ptn2);
        const fatv = convertGrams(fat_unit, fat);
        const fiberv = convertGrams(fiber_unit, fiber);
        const carbov = convertGrams(carbo_unit, carbo);
        ans = Math.round(
          fatv / 3.8889 + carbov / 9.2105 + ptn2_val / 10.9375 - fiberv / 12.5
        );
      } else {
        response.error = "Please! Check Your Input.";
        return response;
      }
    }

    // Method 3
    else if (selection === "3") {
      if (
        !isNaN(fat2) &&
        !isNaN(fiber2) &&
        !isNaN(call2) &&
        fat2 > 0 &&
        fiber2 > 0 &&
        call2 > 0
      ) {
        let fat2v = convertGrams(fat2_unit, fat2);
        let fiber2v = convertGrams(fiber2_unit, fiber2);
        let call2v = call2_unit * call2;
        if (fiber2v > 4) fiber2v = 4;
        ans = Math.round(call2v / 50 + fat2v / 12 - fiber2v / 5);
      } else {
        response.error = "Please! Check Your Input.";
        return response;
      }
    }

    // Method 4
    else if (selection === "4") {
      if (!isNaN(height) && !isNaN(weight) && !isNaN(age)) {
        if (age >= 19) {
          let base, agefact, actfact, wgtfact, hgtfact;

          if (gender === "male") {
            base = 864;
            agefact = 9.72;
            actfact = 1.12;
            wgtfact = 14.2;
            hgtfact = 503;
          } else {
            base = 387;
            agefact = 7.31;
            actfact = 1.14;
            wgtfact = 10.9;
            hgtfact = 660.7;
          }

          const totage = age * agefact;
          const wgtKG = weight * weight_unit;
          const totwgt = wgtKG * wgtfact;
          const hgtCM = height * height_unit;
          const tothgt = hgtCM * hgtfact;

          const tee1 = (totwgt + tothgt) * actfact;
          const tee2 = base - totage + tee1;
          const atee1 = tee2 * 0.1 - 200;
          const atee2 = tee2 - atee1;
          const targ1 = (atee2 - 1000) / 35;

          ans = Math.round(targ1 - 11);

          if (ans <= 26) ans = 26;
          else if (ans >= 71) ans = 71;

          if (activity === "1") ans += 0;
          else if (activity === "2") ans += 3;
          else if (activity === "3") ans += 6;
          else if (activity === "4") ans += 9;
        } else {
          response.error = "This calculator is for people aged 19 or older.";
          return response;
        }
      } else {
        response.error = "Please! Check Your Input.";
        return response;
      }
    }

    response.tech_method = selection;
    response.tech_ans = ans;
    return response;
  }

  /**
   * getCalculationHeightCalculator: Service Method
   * POST: /api/calculators-lol/height-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationHeightCalculator(body) {
    const result = {};
    const submit = body.tech_calculator_n || body.tech_calculator_name;

    if (submit == "calculator1") {
      // Khamis-Roche Height Calculator
      const m_height_ft = body["tech_m_height_ft"];
      const m_height_in = body["tech_m_height_in"];
      const m_height_cm = body["tech_m_height_cm"];
      const m_unit_h = body.tech_mother_1_unit;

      const f_height_ft = body["tech_f_height_ft"];
      const f_height_in = body["tech_f_height_in"];
      const f_height_cm = body["tech_f_height_cm"];
      const f_unit_h = body.tech_father_1_unit;

      const c_height_ft = body["tech_c_height_ft"];
      const c_height_in = body["tech_c_height_in"];
      const c_height_cm = body["tech_c_height_cm"];
      const c_unit_h = body.tech_child_unit || body.tech_c_unit_h;

      const c_weight_lbs = body["tech_c_weight_lbs"];
      const c_weight_kg = body["tech_c_weight_kg"];
      const c_unit_w = body.tech_c_unit_w;

      const gender = body.tech_gender;
      const age = body.tech_age;

      const data = [
        {
          4: [-0.087235, 1.23812, 0.50286, -10.2567],
          4.5: [-0.074454, 1.15964, 0.52887, -10.719],
          5: [-0.064778, 1.10674, 0.53919, -11.0213],
          5.5: [-0.05776, 1.0748, 0.53691, -11.1556],
          6: [-0.052947, 1.05923, 0.52513, -11.1138],
          6.5: [-0.049892, 1.05542, 0.50692, -11.0221],
          7: [-0.048144, 1.05877, 0.48538, -10.9984],
          7.5: [-0.047256, 1.06467, 0.46361, -11.0214],
          8: [-0.046778, 1.06853, 0.44469, -11.0696],
          8.5: [-0.046261, 1.06572, 0.43171, -11.122],
          9: [-0.045254, 1.05166, 0.42776, -11.1571],
          9.5: [-0.043311, 1.02174, 0.43593, -11.1405],
          10: [-0.039981, 0.97135, 0.45932, -12.0222],
          10.5: [-0.034814, 0.89589, 0.50101, -10.8286],
          11: [-0.02905, 0.81239, 0.54781, -10.4917],
          11.5: [-0.024167, 0.74134, 0.58409, -10.0065],
          12: [-0.020076, 0.68325, 0.60927, -9.3522],
          12.5: [-0.016681, 0.63869, 0.62279, -8.6055],
          13: [-0.013895, 0.60818, 0.62407, -7.8632],
          13.5: [-0.011624, 0.59228, 0.61253, -7.1348],
          14: [-0.009776, 0.59151, 0.58762, -6.4299],
          14.5: [-0.008261, 0.60643, 0.54875, -5.7578],
          15: [-0.006988, 0.63757, 0.49536, -5.1282],
          15.5: [-0.005863, 0.68548, 0.42687, -4.5092],
          16: [-0.004795, 0.75069, 0.34271, -3.9292],
          16.5: [-0.003695, 0.83375, 0.24231, -3.4873],
          17: [-0.00247, 0.9352, 0.1251, -3.283],
          17.5: [-0.001027, 1.05558, -0.0095, -3.4156],
        },
        {
          4: [-0.19435, 1.24768, 0.44774, -8.1325],
          4.5: [-0.18519, 1.22177, 0.41381, -6.47656],
          5: [-0.1753, 1.19932, 0.38467, -5.13583],
          5.5: [-0.16484, 1.1788, 0.36039, -4.13791],
          6: [-0.154, 1.15866, 0.34105, -3.51039],
          6.5: [-0.14294, 1.13737, 0.32672, -3.14322],
          7: [-0.13184, 1.11342, 0.31748, -2.87645],
          7.5: [-0.12086, 1.08525, 0.3134, -2.66291],
          8: [-0.11019, 1.05135, 0.31457, -2.45559],
          8.5: [-0.09999, 1.01018, 0.32105, -2.20728],
          9: [-0.09044, 0.9602, 0.33291, -1.87098],
          9.5: [-0.08171, 0.89989, 0.35025, -1.0633],
          10: [-0.07397, 0.82771, 0.37312, 0.33468],
          10.5: [-0.06739, 0.74213, 0.40161, 1.97366],
          11: [-0.06136, 0.67173, 0.42042, 3.50436],
          11.5: [-0.05518, 0.6415, 0.41686, 4.57747],
          12: [-0.04894, 0.64452, 0.3949, 4.84365],
          12.5: [-0.04272, 0.67386, 0.3585, 4.27869],
          13: [-0.03661, 0.7226, 0.31163, 3.21417],
          13.5: [-0.03067, 0.78383, 0.25826, 1.83456],
          14: [-0.025, 0.85062, 0.20235, 0.32425],
          14.5: [-0.01967, 0.91605, 0.14787, -1.13224],
          15: [-0.01477, 0.97319, 0.0988, -2.35055],
          15.5: [-0.01037, 1.01514, 0.05909, -3.10326],
          16: [-0.00655, 1.03496, 0.03272, -3.17885],
          16.5: [-0.0034, 1.02573, 0.02364, -2.41657],
          17: [-0.001, 0.98054, 0.03584, -0.65579],
          17.5: [0.00057, 0.89246, 0.07327, 2.26429],
        },
      ];

      let m_height, f_height, c_height, c_weight;

      // Convert mother's height to inches
      if (m_unit_h == "ft/in") {
        if (
          !m_height_ft ||
          !isFinite(m_height_ft) ||
          !m_height_in ||
          !isFinite(m_height_in)
        ) {
          result.error = "Please check mother's height input.";
          return result;
        }
        m_height = parseFloat(m_height_ft) * 12 + parseFloat(m_height_in);
      } else {
        if (!m_height_cm || !isFinite(m_height_cm)) {
          result.error = "Please check mother's height input.";
          return result;
        }
        m_height = parseFloat(m_height_cm) / 2.54;
      }

      // Convert father's height to inches
      if (f_unit_h == "ft/in") {
        if (
          !f_height_ft ||
          !isFinite(f_height_ft) ||
          !f_height_in ||
          !isFinite(f_height_in)
        ) {
          result.error = "Please check father's height input.";
          return result;
        }
        f_height = parseFloat(f_height_ft) * 12 + parseFloat(f_height_in);
      } else {
        if (!f_height_cm || !isFinite(f_height_cm)) {
          result.error = "Please check father's height input.";
          return result;
        }
        f_height = parseFloat(f_height_cm) / 2.54;
      }

      // Convert child's height to inches
      if (c_unit_h == "ft/in") {
        if (
          !c_height_ft ||
          !isFinite(c_height_ft) ||
          !c_height_in ||
          !isFinite(c_height_in)
        ) {
          result.error = "Please check child's height input.";
          return result;
        }
        c_height = parseFloat(c_height_ft) * 12 + parseFloat(c_height_in);
      } else {
        if (!c_height_cm || !isFinite(c_height_cm)) {
          result.error = "Please check child's height input.";
          return result;
        }
        c_height = parseFloat(c_height_cm) / 2.54;
      }

      // Convert child's weight to pounds
      if (c_unit_w == "lbs") {
        if (!c_weight_lbs || !isFinite(c_weight_lbs)) {
          result.error = "Please check child's weight input.";
          return result;
        }
        c_weight = parseFloat(c_weight_lbs);
      } else {
        if (!c_weight_kg || !isFinite(c_weight_kg)) {
          result.error = "Please check child's weight input.";
          return result;
        }
        c_weight = parseFloat(c_weight_kg) * 2.20462;
      }

      // Validation
      if (m_height <= 0) {
        result.error = "Mother's height must be greater than zero.";
        return result;
      }
      if (f_height <= 0) {
        result.error = "Father's height must be greater than zero.";
        return result;
      }
      if (c_weight <= 0) {
        result.error = "Child's weight must be greater than zero.";
        return result;
      }
      if (c_height <= 0) {
        result.error = "Child's height must be greater than zero.";
        return result;
      }

      // Calculate Khamis-Roche height (in inches)
      const d = data[parseInt(gender)][age];
      const khamis_height =
        d[0] * c_weight +
        d[1] * c_height +
        (d[2] * (m_height + f_height)) / 2 +
        d[3];
      const f_ans = khamis_height < c_height ? c_height : khamis_height;
      const final_ans_inches = Math.round(f_ans);

      // Gender and margin setup
      let sex, margin;
      if (gender == 0) {
        sex = "boys";
        margin = 2.1; // inches
      } else {
        sex = "girls";
        margin = 1.7; // inches
      }

      // Determine output format based on child's height unit
      const output_unit = c_unit_h == "ft/in" ? "imperial" : "metric";
      let final_ans, minHeight, maxHeight;

      if (output_unit == "imperial") {
        const final_ans_in = Math.round(final_ans_inches % 12);
        const final_ans_feet = Math.floor(final_ans_inches / 12);
        final_ans = final_ans_feet + "ft " + final_ans_in + "in";

        const minH = Math.round(f_ans - margin);
        const minHeight_in = Math.round(minH % 12);
        const minHeight_feet = Math.floor(minH / 12);
        minHeight = minHeight_feet + "ft " + minHeight_in + "in";

        const maxH = Math.round(f_ans + margin);
        const maxHeight_in = Math.round(maxH % 12);
        const maxHeight_feet = Math.floor(maxH / 12);
        maxHeight = maxHeight_feet + "ft " + maxHeight_in + "in";
      } else {
        final_ans = Math.round(final_ans_inches * 2.54) + " cm";
        minHeight = Math.round((f_ans - margin) * 2.54) + " cm";
        maxHeight = Math.round((f_ans + margin) * 2.54) + " cm";
        margin = Math.round(margin * 2.54 * 100) / 100;
      }

      // Set response parameters
      result.tech_click_val = output_unit;
      result.tech_submit = submit;
      result.tech_final_ans = final_ans;
      result.tech_minHeight = minHeight;
      result.tech_maxHeight = maxHeight;
      result.tech_sex = sex;
      result.tech_mother_h = m_height_cm || m_height * 2.54;
      result.tech_father_h = f_height_cm || f_height * 2.54;
      result.tech_gender = gender;
      result.tech_margin = margin;
      result.tech_disable = "disable";

      return result;
    } else {
      // Mid-Parental Height Calculator
      const m_height_ft = body["tech_m_height_ft"];
      const m_height_in = body["tech_m_height_in"];
      const f_height_ft = body["tech_f_height_ft"];
      const f_height_in = body["tech_f_height_in"];
      const m_height_cm = body["tech_height_cm"];
      const f_height_cm = body["tech_f_height_cm"];
      const mother_entry_unit = body.tech_mother_entry_unit;
      const father_entry_unit = body.tech_father_entry_unit;

      const ft_and_in_to_cm = (ft, inch) => {
        return ft * 30.48 + inch * 2.54;
      };

      const cm_to_ft_and_in = (cm) => {
        const inches = cm / 2.54;
        const feet = Math.floor(inches / 12);
        const inch = inches % 12;
        return feet + "ft " + Math.floor(inch) + "in";
      };

      let m_height, f_height;

      // Process mother's height
      if (mother_entry_unit === "ft/in") {
        if (!m_height_ft || !m_height_in) {
          result.error = "Please! Check your input for mother's height.";
          return result;
        }
        m_height = ft_and_in_to_cm(
          parseFloat(m_height_ft),
          parseFloat(m_height_in)
        );
      } else {
        if (!m_height_cm) {
          result.error = "Please! Check your input for mother's height.";
          return result;
        }
        m_height = parseFloat(m_height_cm);
      }

      // Process father's height
      if (father_entry_unit === "ft/in") {
        if (!f_height_ft || !f_height_in) {
          result.error = "Please! Check your input for father's height.";
          return result;
        }
        f_height = ft_and_in_to_cm(
          parseFloat(f_height_ft),
          parseFloat(f_height_in)
        );
      } else {
        if (!f_height_cm) {
          result.error = "Please! Check your input for father's height.";
          return result;
        }
        f_height = parseFloat(f_height_cm);
      }

      const new_m_height = m_height;
      const new_f_height = f_height;

      if (isFinite(m_height) && isFinite(f_height)) {
        if (m_height > 0) {
          if (f_height > 0) {
            const margin = 4;
            const midparental_height = (m_height + f_height) / 2;
            const girls_height = midparental_height - 6.5;
            const boys_height = midparental_height + 6.5;

            const boy_mph = (new_f_height + new_m_height + 13) / 2;
            const girl_mph = (new_f_height + new_m_height - 13) / 2;

            let final_ans_boy = boy_mph;
            let final_ans_girl = girl_mph;

            let minHeightGirl = girls_height - margin;
            let maxHeightGirl = girls_height + margin;
            let minHeightBoy = boys_height - margin;
            let maxHeightBoy = boys_height + margin;

            const output_unit = mother_entry_unit;
            if (output_unit === "ft/in") {
              final_ans_boy = cm_to_ft_and_in(final_ans_boy);
              final_ans_girl = cm_to_ft_and_in(final_ans_girl);
              minHeightGirl = cm_to_ft_and_in(minHeightGirl);
              maxHeightGirl = cm_to_ft_and_in(maxHeightGirl);
              minHeightBoy = cm_to_ft_and_in(minHeightBoy);
              maxHeightBoy = cm_to_ft_and_in(maxHeightBoy);
            } else {
              minHeightGirl = Math.round(minHeightGirl * 100) / 100;
              maxHeightGirl = Math.round(maxHeightGirl * 100) / 100;
              minHeightBoy = Math.round(minHeightBoy * 100) / 100;
              maxHeightBoy = Math.round(maxHeightBoy * 100) / 100;
            }

            result.tech_margin = margin;
            result.tech_submit = submit;
            result.tech_final_ans_boy = final_ans_boy;
            result.tech_final_ans_girl = final_ans_girl;
            result.tech_girls_height = girl_mph;
            result.tech_boys_height = boy_mph;
            result.tech_minHeightGirl = minHeightGirl;
            result.tech_maxHeightGirl = maxHeightGirl;
            result.tech_minHeightBoy = minHeightBoy;
            result.tech_maxHeightBoy = maxHeightBoy;
            result.tech_mother_height = new_m_height;
            result.tech_father_height = new_f_height;
            result.tech_mother_entry_unit = mother_entry_unit;
            result.tech_father_entry_unit = father_entry_unit;
            result.tech_disable = "disable";

            return result;
          } else {
            result.error = "Father's height must be greater than zero.";
            return result;
          }
        } else {
          result.error = "Mother's height must be greater than zero.";
          return result;
        }
      } else {
        result.error = "Please! Check your input.";
        return result;
      }
    }
  }

  /**
   * HeightComparison: Service Method
   * POST: /api/calculators-lol/height-comparison
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async HeightComparison(data) {
    try {
      const { persons } = data;

      if (!persons || !Array.isArray(persons) || persons.length === 0) {
        return {
          status: "error",
          error: "Please provide an array of persons with height data.",
        };
      }

      if (persons.length < 2) {
        return {
          status: "error",
          error: "At least 2 persons are required for comparison.",
        };
      }

      const convertToInches = (height, unit) => {
        const numHeight = parseFloat(height);
        if (isNaN(numHeight) || numHeight <= 0) {
          throw new Error(`Invalid height value: ${height}`);
        }

        switch (unit.toLowerCase()) {
          case "ft":
          case "feet":
            return numHeight * 12;
          case "inch":
          case "inches":
          case "in":
            return numHeight;
          case "cm":
          case "centimeter":
          case "centimeters":
            return numHeight / 2.54;
          case "m":
          case "meter":
          case "meters":
            return (numHeight * 100) / 2.54;
          default:
            throw new Error(`Invalid unit: ${unit}. Use ft, inch, cm, or m`);
        }
      };

      const inchesToCm = (inches) => inches * 2.54;

      const inchesToFeetInches = (inches) => {
        const feet = Math.floor(inches / 12);
        const remainingInches = Math.round((inches % 12) * 10) / 10;
        return { feet, inches: remainingInches };
      };

      const formatHeight = (inches) => {
        const cm = Math.round(inchesToCm(inches) * 10) / 10;
        const { feet, inches: inch } = inchesToFeetInches(inches);
        return {
          feet: feet,
          inches: inch,
          totalInches: Math.round(inches * 10) / 10,
          cm: cm,
          meters: Math.round((cm / 100) * 100) / 100,
          display: `${feet}'${inch}" / ${cm}cm`,
        };
      };

      const processedPersons = [];

      for (let i = 0; i < persons.length; i++) {
        const person = persons[i];

        if (!person.name || person.name.trim() === "") {
          return {
            status: "error",
            error: `Person ${i + 1} is missing a name.`,
          };
        }

        if (person.height == null || person.height === "") {
          return {
            status: "error",
            error: `${person.name} is missing height data.`,
          };
        }

        if (!person.height_unit || person.height_unit.trim() === "") {
          return {
            status: "error",
            error: `${person.name} is missing height unit.`,
          };
        }

        const heightInInches = convertToInches(
          person.height,
          person.height_unit
        );
        const formattedHeight = formatHeight(heightInInches);

        processedPersons.push({
          name: person.name.trim(),
          gender: person.gender || "not specified",
          originalHeight: person.height,
          originalUnit: person.height_unit,
          heightInInches: heightInInches,
          formatted: formattedHeight,
        });
      }

      const sortedPersons = [...processedPersons].sort(
        (a, b) => b.heightInInches - a.heightInInches
      );

      const totalPersons = processedPersons.length;
      const tallestPerson = sortedPersons[0];
      const shortestPerson = sortedPersons[sortedPersons.length - 1];

      const totalHeightInches = processedPersons.reduce(
        (sum, p) => sum + p.heightInInches,
        0
      );
      const averageHeightInches = totalHeightInches / totalPersons;
      const averageHeight = formatHeight(averageHeightInches);

      const heightDifferences = [];
      for (let i = 0; i < sortedPersons.length - 1; i++) {
        const taller = sortedPersons[i];
        const shorter = sortedPersons[i + 1];
        const diffInches = taller.heightInInches - shorter.heightInInches;
        const diffCm = Math.round(inchesToCm(diffInches) * 10) / 10;
        const { feet, inches } = inchesToFeetInches(diffInches);

        heightDifferences.push({
          taller: taller.name,
          shorter: shorter.name,
          difference: {
            inches: Math.round(diffInches * 10) / 10,
            cm: diffCm,
            feet: feet,
            remainingInches: inches,
            display: `${feet}'${inches}" / ${diffCm}cm`,
          },
        });
      }

      return {
        status: "success",
        payload: {
          summary: {
            total_persons: totalPersons,
            tallest: {
              name: tallestPerson.name,
              height: tallestPerson.formatted.display,
              cm: tallestPerson.formatted.cm,
              feet: tallestPerson.formatted.feet,
              inches: tallestPerson.formatted.inches,
            },
            shortest: {
              name: shortestPerson.name,
              height: shortestPerson.formatted.display,
              cm: shortestPerson.formatted.cm,
              feet: shortestPerson.formatted.feet,
              inches: shortestPerson.formatted.inches,
            },
            average_height: {
              height: averageHeight.display,
              cm: averageHeight.cm,
              feet: averageHeight.feet,
              inches: averageHeight.inches,
            },
          },
          persons: sortedPersons.map((person, index) => ({
            rank: index + 1,
            name: person.name,
            gender: person.gender,
            original_input: `${person.originalHeight} ${person.originalUnit}`,
            height: {
              feet: person.formatted.feet,
              inches: person.formatted.inches,
              total_inches: person.formatted.totalInches,
              cm: person.formatted.cm,
              meters: person.formatted.meters,
              display: person.formatted.display,
            },
            difference_from_tallest: {
              inches:
                Math.round(
                  (tallestPerson.heightInInches - person.heightInInches) * 10
                ) / 10,
              cm:
                Math.round(
                  (tallestPerson.formatted.cm - person.formatted.cm) * 10
                ) / 10,
            },
            difference_from_average: {
              inches:
                Math.round((person.heightInInches - averageHeightInches) * 10) /
                10,
              cm:
                Math.round((person.formatted.cm - averageHeight.cm) * 10) / 10,
            },
          })),
          height_differences: heightDifferences,
        },
      };
    } catch (error) {
      return {
        status: "error",
        error: error.message || "Something went wrong in height comparison.",
      };
    }
  }

  /**
   * getCalculationPediatricDoseCalculator: Service Method
   * POST: /api/calculators-lol/pediatric-dose-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationPediatricDoseCalculator(body) {
    let dose = body.tech_dose;
    let dose_unit = body.tech_dose_unit;
    let dose_unit2 = body.tech_dose_unit2;
    let dose_unit3 = body.tech_dose_unit3;
    let bsa = body.tech_bsa;
    let weight = body.tech_weight;
    let weight_unit = body.tech_weight_unit;
    let mass = body.tech_mass;
    let mass_unit = body.tech_mass_unit;
    let per = body.tech_per;
    let per_unit = body.tech_per_unit;
    let dose_frequency = body.tech_dose_frequency;
    let type = body.tech_type;
    let child_age = body.tech_child_age;

    const quarter = (unit, value) => {
      const map = {
        qD: 1,
        BID: 2,
        TID: 3,
        QID: 4,
        "q8 hr": 3,
        "q6 hr": 4,
        "q4 hr": 6,
        "q3 hr": 8,
        "q2 hr": 12,
        "q1 hr": 24,
      };
      return value * (map[unit] || 1);
    };

    const quarter2 = (unit, value) => {
      const map = {
        qD: 1,
        BID: 2,
        TID: 3,
        QID: 4,
        "q8 hr": 3,
        "q6 hr": 4,
        "q4 hr": 6,
        "q3 hr": 8,
        "q2 hr": 12,
        "q1 hr": 24,
      };
      return value / (map[unit] || 1);
    };

    const mass_convert = (unit, value) => {
      const map = { mg: 1, µg: 0.001, g: 1000 };
      return value * (map[unit] || 1);
    };

    const milli_convert = (unit, value) => {
      const map = {
        ml: 1,
        "mm³": 0.001,
        "cm³": 1,
        "cu in": 16.387,
        cl: 10,
        cc: 0.1,
      };
      return value * (map[unit] || 1);
    };

    const weil = (unit, value) => {
      const map = {
        kg: 1,
        lbs: 0.4536,
        g: 0.001,
        dag: 0.01,
        oz: 0.02835,
      };
      return value * (map[unit] || 1);
    };

    const weil2 = (unit, value) => {
      const map = {
        kg: 2.2046,
        lbs: 1,
        g: 0.001,
        dag: 0.01,
        oz: 0.02835,
      };
      return value * (map[unit] || 1);
    };

    let param = {};
    let main_answer1, ans1, main_answer3, main_answer4;

    try {
      dose = parseFloat(dose);
      weight = parseFloat(weight);
      mass = parseFloat(mass);
      per = parseFloat(per);
      bsa = parseFloat(bsa);
      child_age = parseFloat(child_age);

      if (type === "first") {
        if (dose > 0 && weight > 0 && mass > 0 && per > 0) {
          let wv = weil(weight_unit, weight);
          let mv = mass_convert(mass_unit, mass);
          let perv = milli_convert(per_unit, per);

          if (["mg/kg", "mg/kg/day"].includes(dose_unit)) {
            main_answer1 = dose * wv;
          } else if (dose_unit === "mg/kg/dose") {
            main_answer1 = quarter(dose_frequency, dose * wv);
          } else if (["mcg/kg", "mcg/kg/day"].includes(dose_unit)) {
            main_answer1 = (dose * wv) / 1000;
          } else if (dose_unit === "mcg/kg/dose") {
            main_answer1 = quarter(dose_frequency, (dose * wv) / 1000);
          }
        } else {
          throw new Error("Please! Check your input.");
        }
      } else if (type === "second") {
        if (dose > 0 && bsa > 0 && mass > 0 && per > 0) {
          let mv = mass_convert(mass_unit, mass);
          let perv = milli_convert(per_unit, per);

          if (dose_unit2 === "mg/m²") {
            main_answer1 = dose * bsa;
          } else if (dose_unit2 === "mg/day") {
            main_answer1 = (dose * bsa) / 1.73;
          } else if (dose_unit2 === "mg/dose") {
            main_answer1 = quarter(dose_frequency, (dose * bsa) / 1.73);
          } else if (dose_unit2 === "mcg/m²") {
            main_answer1 = (dose * bsa) / 1000;
          } else if (dose_unit2 === "mcg/day") {
            main_answer1 = (dose * bsa) / 1.73 / 1000;
          } else if (dose_unit2 === "mcg/dose") {
            main_answer1 = quarter(dose_frequency, (dose * bsa) / 1.73 / 1000);
          }
        } else {
          throw new Error("Please! Check your input.");
        }
      } else if (type === "third") {
        if (dose > 0 && child_age > 0 && mass > 0 && per > 0) {
          let mv = mass_convert(mass_unit, mass);
          let perv = milli_convert(per_unit, per);

          if (dose_unit3 === "mg/day") {
            main_answer1 = dose * (child_age / (child_age + 12));
          } else if (dose_unit3 === "mg/dose") {
            main_answer1 = quarter(
              dose_frequency,
              dose * (child_age / (child_age + 12))
            );
          } else if (dose_unit3 === "mcg/day") {
            main_answer1 = (dose * (child_age / (child_age + 12))) / 1000;
          } else if (dose_unit3 === "mcg/dose") {
            main_answer1 = quarter(
              dose_frequency,
              (dose * (child_age / (child_age + 12))) / 1000
            );
          }
        } else {
          throw new Error("Please! Check your input.");
        }
      } else if (type === "fourth") {
        if (dose > 0 && weight > 0 && mass > 0 && per > 0) {
          let wv = weil2(weight_unit, weight);
          let mv = mass_convert(mass_unit, mass);
          let perv = milli_convert(per_unit, per);

          if (dose_unit3 === "mg/day") {
            main_answer1 = dose * (wv / 150);
          } else if (dose_unit3 === "mg/dose") {
            main_answer1 = quarter(dose_frequency, dose * (wv / 150));
          } else if (dose_unit3 === "mcg/day") {
            main_answer1 = (dose * (wv / 150)) / 1000;
          } else if (dose_unit3 === "mcg/dose") {
            main_answer1 = quarter(dose_frequency, (dose * (wv / 150)) / 1000);
          }
        } else {
          throw new Error("Please! Check your input.");
        }
      }

      ans1 = quarter2(dose_frequency, main_answer1);
      let mv = mass_convert(mass_unit, mass);
      let perv = milli_convert(per_unit, per);
      main_answer3 = mv / perv;
      let l = main_answer1 / main_answer3;
      main_answer4 = quarter2(dose_frequency, l);

      return {
        tech_mass: mass,
        tech_mass_unit: mass_unit,
        tech_per: per,
        tech_per_unit: per_unit,
        tech_ans1: ans1,
        tech_dose_frequency: dose_frequency,
        tech_main_answer1: main_answer1,
        tech_main_answer3: main_answer3,
        tech_main_answer4: main_answer4,
      };
    } catch (error) {
      return { error: error.message };
    }
  }

  /**
   * getCalculationProteinCalculator: Service Method
   * POST: /api/calculators-lol/protein-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationProteinCalculator(body) {
    let age = body.tech_age;
    let gender = body.tech_gender;
    let weight = body.tech_weight;
    let weight_unit = body.tech_weight_unit;
    let activity_level = body.tech_activity_level;
    let protein_for = body.tech_protein_for;
    let height_ft = body.tech_height_ft;
    let height_in = body.tech_height_in;
    let height_cm = body.tech_height_cm;
    let h_unit = body.tech_unit_ft_in;

    const convertToCm = (unit, value) => {
      switch (unit) {
        case "cm":
          return value;
        case "in":
          return value * 2.54;
        case "m":
          return value * 100;
        case "ft":
          return value * 30.48;
        default:
          return null;
      }
    };

    const convertToKg = (unit, value) => {
      switch (unit) {
        case "g":
          return value / 1000;
        case "kg":
          return value;
        case "lb":
          return value / 2.205;
        case "stone":
          return value * 6.35;
        default:
          return null;
      }
    };

    if (h_unit === "ft/in") {
      if (isNaN(height_ft) || isNaN(height_in)) {
        return { error: "Please! Check your input." };
      }
      height_cm = height_ft * 30.48 + height_in * 2.54;
    } else {
      if (isNaN(height_cm)) {
        return { error: "Please! Check your input." };
      }
      height_cm = convertToCm(h_unit, height_cm);
    }

    if (!isNaN(age) && !isNaN(weight)) {
      const weight_kg = convertToKg(weight_unit, weight);
      let BMR;

      if (gender === "male") {
        BMR = 10 * weight_kg + 6.25 * height_cm - 5 * age + 5;
      } else {
        BMR = 10 * weight_kg + 6.25 * height_cm - 5 * age - 161;
      }

      let multiplier;
      switch (activity_level) {
        case "sedentary":
          multiplier = 1.2;
          break;
        case "light":
          multiplier = 1.375;
          break;
        case "moderate":
          multiplier = 1.55;
          break;
        case "very_active":
          multiplier = 1.725;
          break;
        default:
          multiplier = 1.9;
          break;
      }

      const calories = BMR * multiplier;

      return {
        tech_calories: calories,
        tech_weight_kg: weight_kg,
      };
    } else {
      return { error: "Please! Check your input." };
    }
  }

  /**
   * getCalculationWeightGainCalculator: Service Method
   * POST: /api/calculators-lol/weight-gain-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationWeightGainCalculator(body) {
    let age = body.tech_age;
    let height_ft = body.tech_height_ft;
    let height_cm = body.tech_height_cm;
    let weight = body.tech_weight;
    let per_cal = body.tech_per_cal;
    let gender = body.tech_gender;
    let percent = body.tech_percent;
    let activity = body.tech_activity;
    let stype = body.tech_stype;
    let start = body.tech_start;
    let target = body.tech_target;
    let weight1 = body.tech_weight1;
    let surplus = body.tech_surplus;
    let kal_day = body.tech_kal_day;
    let submit = body.tech_unit_type;

    const want = "2";
    let unit, height_in;

    if (isNaN(age) || isNaN(weight) || isNaN(weight1) || !start || !target) {
      return { error: "Please fill All Fields." };
    }

    // Convert imperial to metric if needed
    if (submit === "imperial") {
      height_in = height_ft * 2.54;
      weight = weight / 2.205;
      weight1 = weight1 / 2.205;
      unit = "lb";
    } else {
      if (isNaN(height_cm)) {
        return { error: "Please enter height." };
      }
      height_in = height_cm;
      unit = "kg";
    }

    let BMR, tdee, Robinson, Miller, Devine, Hamwi;

    const round = (num) => Math.round(num);

    if (gender === "Male") {
      BMR = round(10 * round(weight) + 6.25 * round(height_cm) - 5 * age + 5);
      switch (activity) {
        case "sedentary":
          tdee = round(BMR * 1.1);
          break;
        case "Lightly_Active":
          tdee = round(BMR * 1.2);
          break;
        case "Moderately_Active":
          tdee = round(BMR * 1.4);
          break;
        case "Very_Active":
          tdee = round(BMR * 1.6);
          break;
        default:
          tdee = round(BMR * 1.8);
      }
      Robinson = round(49 + 1.7 * (height_in - 60));
      Miller = round(53.1 + 1.36 * (height_in - 60));
      Devine = round(45.5 + 2.3 * (height_in - 60));
      Hamwi = round(45 + 2.2 * (height_in - 60));
    } else {
      BMR = round(10 * weight + 6.25 * height_cm - 5 * age - 161);
      switch (activity) {
        case "sedentary":
          tdee = round(BMR * 1.1);
          break;
        case "Lightly_Active":
          tdee = round(BMR * 1.2);
          break;
        case "Moderately_Active":
          tdee = round(BMR * 1.4);
          break;
        case "Very_Active":
          tdee = round(BMR * 1.6);
          break;
        default:
          tdee = round(BMR * 1.8);
      }
      Robinson = round(52 + 1.9 * (height_in - 60));
      Miller = round(56.2 + 1.41 * (height_in - 60));
      Devine = round(50 + 2.3 * (height_in - 60));
      Hamwi = round(48 + 2.7 * (height_in - 60));
    }

    let lbm;
    if (percent) {
      lbm = (weight * (100 - percent)) / 100;
      BMR = round(370 + 21.6 * lbm);
    }

    const height_m = height_in / 39.37;
    const BMI = +(weight / (height_m * height_m)).toFixed(2);

    let you_are;
    if (BMI <= 18.5) you_are = "Underweight";
    else if (BMI <= 24.9) you_are = "Normal Weight";
    else if (BMI <= 29.9) you_are = "Overweight";
    else if (BMI <= 35) you_are = "Obesity";
    else you_are = "Severe Obesity";

    const ibw =
      submit === "imperial"
        ? `${round(Robinson * 2.205)}-${round(Hamwi * 2.205)} lbs`
        : `${Robinson}-${Hamwi} kg`;

    const startDate = new Date(start);
    const targetDate = new Date(target);

    if (startDate >= targetDate) {
      return { error: "Target Date must be later than start date." };
    }

    const days = Math.ceil((targetDate - startDate) / (1000 * 60 * 60 * 24));
    const pounds_daily = +(weight1 / days).toFixed(2);
    const high_risk_weight = pounds_daily > 0.3;

    let calories_gain;

    if (surplus === "custom") {
      calories_gain = stype === "Incal" ? kal_day : tdee * (per_cal / 100);
    } else {
      const surplusMap = {
        "0.10": 0.1,
        0.15: 0.15,
        "0.20": 0.2,
      };
      calories_gain = tdee * (surplusMap[surplus] || 0.2);
    }

    const calories_daily = round(tdee + calories_gain);
    const high_risk_calories = calories_daily < 1200;

    const goal =
      submit === "imperial"
        ? +(weight + weight1).toFixed(2)
        : +((weight + weight1) / 2.205).toFixed(2);

    const fat = round((calories_daily / 9) * 0.2);
    const po = round((calories_daily / 4) * 0.3);
    const cb = round((calories_daily / 4) * 0.5);

    return {
      tech_HighRiskWeight: high_risk_weight,
      tech_PoundsDaily: pounds_daily,
      tech_HighRiskCalories: high_risk_calories,
      tech_CaloriesDaily: calories_daily,
      tech_CaloriesLess: round(calories_gain),
      tech_Calories: tdee,
      tech_Goal: goal,
      tech_days: days,
      tech_BMR: BMR,
      tech_BMI: BMI,
      tech_you_are: you_are,
      tech_lbm: lbm,
      tech_ibw: ibw,
      tech_fat: fat,
      tech_po: po,
      tech_cb: cb,
      tech_want: want,
      tech_unit: unit,
    };
  }

  /**
   * getCalculationMaintenanceCalorieCalculator: Service Method
   * POST: /api/calculators-lol/maintenance-calorie-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationMaintenanceCalorieCalculator(body) {
    let unit_type = body.tech_unit_type;
    let gender = body.tech_gender;
    let age = body.tech_age;
    let ft_in = body.tech_ft_in;
    let height_cm = body.tech_height_cm;
    let weight = body.tech_weight;
    let activity = body.tech_activity;

    // Helper functions
    function round(value, decimals = 0) {
      return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
    }

    function isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

    let param = {};

    if (isNumeric(age) && isNumeric(weight) && gender && activity) {
      let weight_kg, height_in;

      if (unit_type === "lbs") {
        if (!ft_in) {
          return { error: "Please Select Height." };
        }
        weight_kg = weight / 2.205;
        height_cm = ft_in * 2.54;
      } else {
        if (!height_cm) {
          return { error: "Please Enter Height." };
        }
        weight_kg = weight;
      }

      let height_m = height_cm / 100;
      height_in = height_cm / 2.54;
      let weight_lbs = weight_kg * 2.205;
      let BMI = round(weight_kg / (height_m * height_m), 2);

      let rmr, BMR, tdee, Miller, Hamwi;

      if (gender === "Female") {
        rmr = round(655 + 9.6 * weight_kg + 1.8 * height_cm - 4.7 * age);
        BMR = round(height_cm * 6.25 + weight_kg * 10 - age * 5 - 161);
        Miller = round(53.1 + 1.36 * (height_in - 60));
        Hamwi = round(45 + 2.2 * (height_in - 60));
      } else {
        rmr = round(66 + 13.7 * weight_kg + 5 * height_cm - 6.8 * age);
        BMR = round(height_cm * 6.25 + weight_kg * 10 - age * 5 + 5);
        Miller = round(56.2 + 1.41 * (height_in - 60));
        Hamwi = round(48 + 2.7 * (height_in - 60));
      }

      const activityFactors = {
        Sedentary: 1.2,
        "Lightly Active": 1.375,
        "Moderately Active": 1.55,
        "Very Active": 1.725,
        "Extra Active": 1.9,
      };

      tdee = round(BMR * (activityFactors[activity] || 1.2));

      let ibwRange;
      if (unit_type === "lbs") {
        Miller = Miller * 2.205;
        Hamwi = Hamwi * 2.205;
      }

      if (Hamwi >= Miller) {
        ibwRange = `${round(Miller)}-${round(Hamwi)}`;
      } else {
        ibwRange = `${round(Hamwi)}-${round(Miller)}`;
      }

      let fat = round((tdee / 9) * 0.2);
      let po = round((tdee / 4) * 0.3);
      let cb = round((tdee / 4) * 0.5);

      param = {
        tech_Calories: tdee,
        tech_BMR: BMR,
        tech_rmr: rmr,
        tech_BMI: BMI,
        tech_ibw: ibwRange,
        tech_fat: fat,
        tech_po: po,
        tech_cb: cb,
        tech_submit: unit_type,
      };

      return param;
    } else {
      return { error: "Please! Check Your Input." };
    }
  }

  /**
   * getCalculationBreastfeedingCalorieCalculator: Service Method
   * POST: /api/calculators-lol/breastfeeding-calorie-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationBreastfeedingCalorieCalculator(body) {
    let unit_type = body.tech_unit_type;
    let age = body.tech_age;
    let ft_in = body.tech_ft_in;
    let height_cm = body.tech_height_cm;
    let weight = body.tech_weight;
    let activity = body.tech_activity;
    let bf = body.tech_bf;
    let pregnant = body.tech_pregnant;

    let param = {};

    // Trim string fields and convert numbers
    let submit = unit_type?.trim();
    age = parseFloat(age);
    weight = parseFloat(weight);
    ft_in = parseFloat(ft_in);
    height_cm = parseFloat(height_cm);
    activity = parseFloat(activity);
    bf = parseFloat(bf);
    pregnant = parseFloat(pregnant);

    let check = false;

    if (submit === "lbs" && isNumeric(age) && isNumeric(weight)) {
      check = true;
    } else if (
      submit === "kg" &&
      isNumeric(age) &&
      isNumeric(height_cm) &&
      isNumeric(weight)
    ) {
      check = true;
    }

    if (check) {
      if (submit === "lbs") {
        weight = weight * 0.45359237;
        height_cm = ft_in * 2.54;
      }

      let maintain = round(
        (10 * weight + 6.25 * height_cm - 5 * age - 161) * activity +
          bf +
          pregnant
      );
      let lose = maintain - 300;
      let supply = maintain - 500;

      param = {
        tech_maintain: maintain,
        tech_lose: lose,
        tech_supply: supply,
        tech_carbos1: round((maintain * 0.44) / 4),
        tech_carbos2: round((lose * 0.44) / 4),
        tech_proteins1: round((maintain * 0.26) / 4),
        tech_proteins2: round((lose * 0.26) / 4),
        tech_fats1: round((maintain * 0.25) / 9),
        tech_fats2: round((lose * 0.25) / 9),
      };

      return param;
    } else {
      return { error: "Please! Check Your Input." };
    }

    // Helper functions
    function round(value, decimals = 0) {
      return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
    }

    function isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }
  }

  /**
   * getCalculationSwimmingCalorieCalculator: Service Method
   * POST: /api/calculators-lol/swimming-calorie-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */
  async getCalculationSwimmingCalorieCalculator(body) {
    let weight = body.tech_weight;
    let weight_unit = body.tech_weight_unit;
    let time = body.tech_time;
    let time_unit = body.tech_time_unit;
    let style = body.tech_style;

    // Trim and parse values
    weight = parseFloat(String(weight).trim());
    time = parseFloat(String(time).trim());
    style = parseFloat(String(style).trim());
    weight_unit = String(weight_unit).trim();
    time_unit = String(time_unit).trim();

    let param = {};
    // Helpers
    function round(value, decimals = 0) {
      return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
    }

    function isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }
    // Validation
    if (!isNumeric(style) || !isNumeric(weight) || !weight_unit) {
      return { error: "Please! Check Your Inputs" };
    }

    if (!time_unit) {
      return { error: "Please! Check Your Inputs" };
    }

    if (!isNumeric(time)) {
      return { error: "Please! Check Your Inputs" };
    }

    // Conversion helpers
    function convertToKg(unit, value) {
      if (unit === "lb") return value / 2.205;
      if (unit === "kg") return value;
      if (unit === "stone") return value * 6.35;
      return NaN;
    }

    function convertToMin(unit, value) {
      if (unit === "sec") return value / 60;
      if (unit === "min") return value;
      if (unit === "hrs") return value * 60;
      return NaN;
    }

    const final_weight = convertToKg(weight_unit, weight);
    const final_min = convertToMin(time_unit, time);

    if (!isNumeric(final_weight) || !isNumeric(final_min)) {
      return { error: "Conversion failed. Invalid input units." };
    }

    const cal_burned_per_min = (style * final_weight * 3.5) / 200;
    const total_cal_burned = cal_burned_per_min * final_min;

    param.tech_cal_burned_per_min = round(cal_burned_per_min, 2);
    param.tech_total_cal_burned = round(total_cal_burned, 2);

    return param;
  }

  /**
   * getCalculationWeightPercentileCalculator: Service Method
   * POST: /api/calculators-lol/weight-percentile-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationWeightPercentileCalculator(body) {
    const weight = body.tech_weight;
    const w_unit = body.tech_w_unit;
    const age = body.tech_age;
    const age_unit = body.tech_age_unit;
    const gender = body.tech_gender;

    function wazan(a, b) {
      if (a == "g") {
        return b / 1000;
      } else if (a == "dag") {
        return b / 100;
      } else if (a == "kg") {
        return b * 1;
      } else if (a == "oz") {
        return b / 35.274;
      } else if (a == "lbs") {
        return b / 2.205;
      }
      return b;
    }

    function umar(a, b) {
      if (a == "days") {
        return b / 365;
      } else if (a == "weeks") {
        return b / 52.143;
      } else if (a == "months") {
        return b / 12;
      } else if (a == "years") {
        return b * 1;
      }
      return b;
    }

    const girls_to_13w = [
      {
        name: "a",
        uid: "2101522777",
        values: {
          age: 0,
          P01: 2,
          P1: "2.3",
          P3: "2.4",
          P5: "2.5",
          P10: "2.7",
          P15: "2.8",
          P25: "2.9",
          P50: "3.2",
          P75: "3.6",
          P85: "3.7",
          P90: "3.9",
          P95: 4,
          P97: "4.2",
          P99: "4.4",
          P999: "4.8",
        },
      },
      {
        name: 1,
        uid: "1344046595",
        values: {
          age: 1,
          P01: "2.1",
          P1: "2.3",
          P3: "2.5",
          P5: "2.6",
          P10: "2.8",
          P15: "2.9",
          P25: 3,
          P50: "3.3",
          P75: "3.7",
          P85: "3.9",
          P90: 4,
          P95: "4.2",
          P97: "4.4",
          P99: "4.6",
          P999: "5.1",
        },
      },
      {
        name: 2,
        uid: "3902805028",
        values: {
          age: 2,
          P01: "2.2",
          P1: "2.5",
          P3: "2.7",
          P5: "2.8",
          P10: 3,
          P15: "3.1",
          P25: "3.2",
          P50: "3.6",
          P75: "3.9",
          P85: "4.1",
          P90: "4.3",
          P95: "4.5",
          P97: "4.6",
          P99: "4.9",
          P999: "5.4",
        },
      },
      {
        name: 3,
        uid: "3908778857",
        values: {
          age: 3,
          P01: "2.4",
          P1: "2.7",
          P3: "2.9",
          P5: 3,
          P10: "3.2",
          P15: "3.3",
          P25: "3.5",
          P50: "3.8",
          P75: "4.2",
          P85: "4.4",
          P90: "4.6",
          P95: "4.8",
          P97: 5,
          P99: "5.3",
          P999: "5.8",
        },
      },
      {
        name: 4,
        uid: "2653126873",
        values: {
          age: 4,
          P01: "2.6",
          P1: "2.9",
          P3: "3.1",
          P5: "3.3",
          P10: "3.4",
          P15: "3.5",
          P25: "3.7",
          P50: "4.1",
          P75: "4.5",
          P85: "4.7",
          P90: "4.9",
          P95: "5.1",
          P97: "5.3",
          P99: "5.6",
          P999: "6.2",
        },
      },
      {
        name: 5,
        uid: "543034340",
        values: {
          age: 5,
          P01: "2.8",
          P1: "3.1",
          P3: "3.3",
          P5: "3.5",
          P10: "3.6",
          P15: "3.8",
          P25: 4,
          P50: "4.3",
          P75: "4.8",
          P85: 5,
          P90: "5.2",
          P95: "5.4",
          P97: "5.6",
          P99: "5.9",
          P999: "6.5",
        },
      },
      {
        name: 6,
        uid: "986480501",
        values: {
          age: 6,
          P01: 3,
          P1: "3.3",
          P3: "3.5",
          P5: "3.7",
          P10: "3.8",
          P15: 4,
          P25: "4.2",
          P50: "4.6",
          P75: 5,
          P85: "5.3",
          P90: "5.4",
          P95: "5.7",
          P97: "5.9",
          P99: "6.2",
          P999: "6.8",
        },
      },
      {
        name: 7,
        uid: "481225376",
        values: {
          age: 7,
          P01: "3.2",
          P1: "3.5",
          P3: "3.7",
          P5: "3.8",
          P10: 4,
          P15: "4.2",
          P25: "4.4",
          P50: "4.8",
          P75: "5.2",
          P85: "5.5",
          P90: "5.7",
          P95: "5.9",
          P97: "6.1",
          P99: "6.5",
          P999: "7.1",
        },
      },
      {
        name: 8,
        uid: "2437632715",
        values: {
          age: 8,
          P01: "3.3",
          P1: "3.7",
          P3: "3.9",
          P5: 4,
          P10: "4.2",
          P15: "4.4",
          P25: "4.6",
          P50: 5,
          P75: "5.5",
          P85: "5.7",
          P90: "5.9",
          P95: "6.2",
          P97: "6.4",
          P99: "6.7",
          P999: "7.4",
        },
      },
      {
        name: 9,
        uid: "253589758",
        values: {
          age: 9,
          P01: "3.4",
          P1: "3.8",
          P3: "4.1",
          P5: "4.2",
          P10: "4.4",
          P15: "4.5",
          P25: "4.7",
          P50: "5.2",
          P75: "5.7",
          P85: "5.9",
          P90: "6.1",
          P95: "6.4",
          P97: "6.6",
          P99: 7,
          P999: "7.7",
        },
      },
      {
        name: 10,
        uid: "4090155017",
        values: {
          age: 10,
          P01: "3.6",
          P1: 4,
          P3: "4.2",
          P5: "4.3",
          P10: "4.5",
          P15: "4.7",
          P25: "4.9",
          P50: "5.4",
          P75: "5.8",
          P85: "6.1",
          P90: "6.3",
          P95: "6.6",
          P97: "6.8",
          P99: "7.2",
          P999: "7.9",
        },
      },
      {
        name: 11,
        uid: "2979536176",
        values: {
          age: 11,
          P01: "3.7",
          P1: "4.1",
          P3: "4.3",
          P5: "4.5",
          P10: "4.7",
          P15: "4.8",
          P25: "5.1",
          P50: "5.5",
          P75: 6,
          P85: "6.3",
          P90: "6.5",
          P95: "6.8",
          P97: 7,
          P99: "7.4",
          P999: "8.2",
        },
      },
      {
        name: 12,
        uid: "565790788",
        values: {
          age: 12,
          P01: "3.8",
          P1: "4.2",
          P3: "4.5",
          P5: "4.6",
          P10: "4.8",
          P15: 5,
          P25: "5.2",
          P50: "5.7",
          P75: "6.2",
          P85: "6.5",
          P90: "6.7",
          P95: 7,
          P97: "7.2",
          P99: "7.6",
          P999: "8.4",
        },
      },
      {
        name: 13,
        uid: "2929341763",
        values: {
          age: 13,
          P01: "3.9",
          P1: "4.3",
          P3: "4.6",
          P5: "4.7",
          P10: 5,
          P15: "5.1",
          P25: "5.4",
          P50: "5.8",
          P75: "6.4",
          P85: "6.7",
          P90: "6.9",
          P95: "7.2",
          P97: "7.4",
          P99: "7.8",
          P999: "8.6",
        },
      },
    ];

    const girls_to_5y = [
      {
        name: "a",
        uid: "2101522777",
        values: {
          age: 0,
          P01: 2,
          P1: "2.3",
          P3: "2.4",
          P5: "2.5",
          P10: "2.7",
          P15: "2.8",
          P25: "2.9",
          P50: "3.2",
          P75: "3.6",
          P85: "3.7",
          P90: "3.9",
          P95: 4,
          P97: "4.2",
          P99: "4.4",
          P999: "4.8",
        },
      },
      {
        name: 1,
        uid: "2706677359",
        values: {
          age: 1,
          P01: "2.7",
          P1: 3,
          P3: "3.2",
          P5: "3.3",
          P10: "3.5",
          P15: "3.6",
          P25: "3.8",
          P50: "4.2",
          P75: "4.6",
          P85: "4.8",
          P90: 5,
          P95: "5.2",
          P97: "5.4",
          P99: "5.7",
          P999: "6.3",
        },
      },
      {
        name: 2,
        uid: "2045929197",
        values: {
          age: 2,
          P01: "3.4",
          P1: "3.8",
          P3: 4,
          P5: "4.1",
          P10: "4.3",
          P15: "4.5",
          P25: "4.7",
          P50: "5.1",
          P75: "5.6",
          P85: "5.9",
          P90: 6,
          P95: "6.3",
          P97: "6.5",
          P99: "6.9",
          P999: "7.6",
        },
      },
      {
        name: 3,
        uid: "1944736245",
        values: {
          age: 3,
          P01: "3.9",
          P1: "4.4",
          P3: "4.6",
          P5: "4.7",
          P10: 5,
          P15: "5.1",
          P25: "5.4",
          P50: "5.8",
          P75: "6.4",
          P85: "6.7",
          P90: "6.9",
          P95: "7.2",
          P97: "7.4",
          P99: "7.8",
          P999: "8.6",
        },
      },
      {
        name: 4,
        uid: "2334392654",
        values: {
          age: 4,
          P01: "4.4",
          P1: "4.8",
          P3: "5.1",
          P5: "5.2",
          P10: "5.5",
          P15: "5.6",
          P25: "5.9",
          P50: "6.4",
          P75: 7,
          P85: "7.3",
          P90: "7.5",
          P95: "7.9",
          P97: "8.1",
          P99: "8.6",
          P999: "9.4",
        },
      },
      {
        name: 5,
        uid: "33396477",
        values: {
          age: 5,
          P01: "4.7",
          P1: "5.2",
          P3: "5.5",
          P5: "5.6",
          P10: "5.9",
          P15: "6.1",
          P25: "6.4",
          P50: "6.9",
          P75: "7.5",
          P85: "7.8",
          P90: "8.1",
          P95: "8.4",
          P97: "8.7",
          P99: "9.2",
          P999: "10.1",
        },
      },
      {
        name: 6,
        uid: "3435625595",
        values: {
          age: 6,
          P01: 5,
          P1: "5.5",
          P3: "5.8",
          P5: 6,
          P10: "6.2",
          P15: "6.4",
          P25: "6.7",
          P50: "7.3",
          P75: "7.9",
          P85: "8.3",
          P90: "8.5",
          P95: "8.9",
          P97: "9.2",
          P99: "9.7",
          P999: "10.7",
        },
      },
      {
        name: 7,
        uid: "3561095891",
        values: {
          age: 7,
          P01: "5.3",
          P1: "5.8",
          P3: "6.1",
          P5: "6.3",
          P10: "6.5",
          P15: "6.7",
          P25: 7,
          P50: "7.6",
          P75: "8.3",
          P85: "8.7",
          P90: "8.9",
          P95: "9.4",
          P97: "9.6",
          P99: "10.2",
          P999: "11.2",
        },
      },
      {
        name: 8,
        uid: "2388008358",
        values: {
          age: 8,
          P01: "5.5",
          P1: 6,
          P3: "6.3",
          P5: "6.5",
          P10: "6.8",
          P15: 7,
          P25: "7.3",
          P50: "7.9",
          P75: "8.6",
          P85: 9,
          P90: "9.3",
          P95: "9.7",
          P97: 10,
          P99: "10.6",
          P999: "11.7",
        },
      },
      {
        name: 9,
        uid: "1160676723",
        values: {
          age: 9,
          P01: "5.7",
          P1: "6.2",
          P3: "6.6",
          P5: "6.8",
          P10: 7,
          P15: "7.3",
          P25: "7.6",
          P50: "8.2",
          P75: "8.9",
          P85: "9.3",
          P90: "9.6",
          P95: "10.1",
          P97: "10.4",
          P99: 11,
          P999: "12.1",
        },
      },
      {
        name: 10,
        uid: "1340343038",
        values: {
          age: 10,
          P01: "5.9",
          P1: "6.4",
          P3: "6.8",
          P5: 7,
          P10: "7.3",
          P15: "7.5",
          P25: "7.8",
          P50: "8.5",
          P75: "9.2",
          P85: "9.6",
          P90: "9.9",
          P95: "10.4",
          P97: "10.7",
          P99: "11.3",
          P999: "12.5",
        },
      },
      {
        name: 11,
        uid: "3907737903",
        values: {
          age: 11,
          P01: 6,
          P1: "6.6",
          P3: 7,
          P5: "7.2",
          P10: "7.5",
          P15: "7.7",
          P25: 8,
          P50: "8.7",
          P75: "9.5",
          P85: "9.9",
          P90: "10.2",
          P95: "10.7",
          P97: 11,
          P99: "11.7",
          P999: "12.9",
        },
      },
      {
        name: 12,
        uid: "3689416734",
        values: {
          age: 12,
          P01: "6.2",
          P1: "6.8",
          P3: "7.1",
          P5: "7.3",
          P10: "7.7",
          P15: "7.9",
          P25: "8.2",
          P50: "8.9",
          P75: "9.7",
          P85: "10.2",
          P90: "10.5",
          P95: 11,
          P97: "11.3",
          P99: 12,
          P999: "13.3",
        },
      },
      {
        name: 13,
        uid: "14789121",
        values: {
          age: 13,
          P01: "6.4",
          P1: "6.9",
          P3: "7.3",
          P5: "7.5",
          P10: "7.9",
          P15: "8.1",
          P25: "8.4",
          P50: "9.2",
          P75: 10,
          P85: "10.4",
          P90: "10.8",
          P95: "11.3",
          P97: "11.6",
          P99: "12.3",
          P999: "13.6",
        },
      },
      {
        name: 14,
        uid: "2752563322",
        values: {
          age: 14,
          P01: "6.5",
          P1: "7.1",
          P3: "7.5",
          P5: "7.7",
          P10: 8,
          P15: "8.3",
          P25: "8.6",
          P50: "9.4",
          P75: "10.2",
          P85: "10.7",
          P90: 11,
          P95: "11.5",
          P97: "11.9",
          P99: "12.6",
          P999: 14,
        },
      },
      {
        name: 15,
        uid: "626010922",
        values: {
          age: 15,
          P01: "6.7",
          P1: "7.3",
          P3: "7.7",
          P5: "7.9",
          P10: "8.2",
          P15: "8.5",
          P25: "8.8",
          P50: "9.6",
          P75: "10.4",
          P85: "10.9",
          P90: "11.3",
          P95: "11.8",
          P97: "12.2",
          P99: "12.9",
          P999: "14.3",
        },
      },
      {
        name: 16,
        uid: "2127088523",
        values: {
          age: 16,
          P01: "6.8",
          P1: "7.4",
          P3: "7.8",
          P5: "8.1",
          P10: "8.4",
          P15: "8.7",
          P25: 9,
          P50: "9.8",
          P75: "10.7",
          P85: "11.2",
          P90: "11.5",
          P95: "12.1",
          P97: "12.5",
          P99: "13.2",
          P999: "14.6",
        },
      },
      {
        name: 17,
        uid: "3753768630",
        values: {
          age: 17,
          P01: 7,
          P1: "7.6",
          P3: 8,
          P5: "8.2",
          P10: "8.6",
          P15: "8.8",
          P25: "9.2",
          P50: 10,
          P75: "10.9",
          P85: "11.4",
          P90: "11.8",
          P95: "12.3",
          P97: "12.7",
          P99: "13.5",
          P999: 15,
        },
      },
      {
        name: 18,
        uid: "3733619177",
        values: {
          age: 18,
          P01: "7.1",
          P1: "7.8",
          P3: "8.2",
          P5: "8.4",
          P10: "8.8",
          P15: 9,
          P25: "9.4",
          P50: "10.2",
          P75: "11.1",
          P85: "11.6",
          P90: 12,
          P95: "12.6",
          P97: 13,
          P99: "13.8",
          P999: "15.3",
        },
      },
      {
        name: 19,
        uid: "3267869332",
        values: {
          age: 19,
          P01: "7.3",
          P1: "7.9",
          P3: "8.3",
          P5: "8.6",
          P10: "8.9",
          P15: "9.2",
          P25: "9.6",
          P50: "10.4",
          P75: "11.4",
          P85: "11.9",
          P90: "12.3",
          P95: "12.9",
          P97: "13.3",
          P99: "14.1",
          P999: "15.6",
        },
      },
      {
        name: 20,
        uid: "3513952144",
        values: {
          age: 20,
          P01: "7.4",
          P1: "8.1",
          P3: "8.5",
          P5: "8.7",
          P10: "9.1",
          P15: "9.4",
          P25: "9.8",
          P50: "10.6",
          P75: "11.6",
          P85: "12.1",
          P90: "12.5",
          P95: "13.1",
          P97: "13.5",
          P99: "14.4",
          P999: "15.9",
        },
      },
      {
        name: 21,
        uid: "3891989198",
        values: {
          age: 21,
          P01: "7.6",
          P1: "8.2",
          P3: "8.7",
          P5: "8.9",
          P10: "9.3",
          P15: "9.6",
          P25: 10,
          P50: "10.9",
          P75: "11.8",
          P85: "12.4",
          P90: "12.8",
          P95: "13.4",
          P97: "13.8",
          P99: "14.6",
          P999: "16.2",
        },
      },
      {
        name: 22,
        uid: "3205526744",
        values: {
          age: 22,
          P01: "7.7",
          P1: "8.4",
          P3: "8.8",
          P5: "9.1",
          P10: "9.5",
          P15: "9.8",
          P25: "10.2",
          P50: "11.1",
          P75: 12,
          P85: "12.6",
          P90: 13,
          P95: "13.6",
          P97: "14.1",
          P99: "14.9",
          P999: "16.6",
        },
      },
      {
        name: 23,
        uid: "318713343",
        values: {
          age: 23,
          P01: "7.8",
          P1: "8.5",
          P3: 9,
          P5: "9.2",
          P10: "9.7",
          P15: "9.9",
          P25: "10.4",
          P50: "11.3",
          P75: "12.3",
          P85: "12.8",
          P90: "13.3",
          P95: "13.9",
          P97: "14.3",
          P99: "15.2",
          P999: "16.9",
        },
      },
      {
        name: 24,
        uid: "2283995645",
        values: {
          age: 24,
          P01: 8,
          P1: "8.7",
          P3: "9.2",
          P5: "9.4",
          P10: "9.8",
          P15: "10.1",
          P25: "10.6",
          P50: "11.5",
          P75: "12.5",
          P85: "13.1",
          P90: "13.5",
          P95: "14.2",
          P97: "14.6",
          P99: "15.5",
          P999: "17.2",
        },
      },
      {
        name: 25,
        uid: "836552489",
        values: {
          age: 25,
          P01: "8.1",
          P1: "8.9",
          P3: "9.3",
          P5: "9.6",
          P10: 10,
          P15: "10.3",
          P25: "10.8",
          P50: "11.7",
          P75: "12.7",
          P85: "13.3",
          P90: "13.8",
          P95: "14.4",
          P97: "14.9",
          P99: "15.8",
          P999: "17.6",
        },
      },
      {
        name: 26,
        uid: "2043973312",
        values: {
          age: 26,
          P01: "8.3",
          P1: 9,
          P3: "9.5",
          P5: "9.8",
          P10: "10.2",
          P15: "10.5",
          P25: "10.9",
          P50: "11.9",
          P75: "12.9",
          P85: "13.6",
          P90: 14,
          P95: "14.7",
          P97: "15.2",
          P99: "16.1",
          P999: "17.9",
        },
      },
      {
        name: 27,
        uid: "1521245358",
        values: {
          age: 27,
          P01: "8.4",
          P1: "9.2",
          P3: "9.6",
          P5: "9.9",
          P10: "10.4",
          P15: "10.7",
          P25: "11.1",
          P50: "12.1",
          P75: "13.2",
          P85: "13.8",
          P90: "14.3",
          P95: 15,
          P97: "15.4",
          P99: "16.4",
          P999: "18.2",
        },
      },
      {
        name: 28,
        uid: "1855939437",
        values: {
          age: 28,
          P01: "8.5",
          P1: "9.3",
          P3: "9.8",
          P5: "10.1",
          P10: "10.5",
          P15: "10.8",
          P25: "11.3",
          P50: "12.3",
          P75: "13.4",
          P85: 14,
          P90: "14.5",
          P95: "15.2",
          P97: "15.7",
          P99: "16.7",
          P999: "18.6",
        },
      },
      {
        name: 29,
        uid: "2945180243",
        values: {
          age: 29,
          P01: "8.7",
          P1: "9.5",
          P3: 10,
          P5: "10.2",
          P10: "10.7",
          P15: 11,
          P25: "11.5",
          P50: "12.5",
          P75: "13.6",
          P85: "14.3",
          P90: "14.7",
          P95: "15.5",
          P97: 16,
          P99: 17,
          P999: "18.9",
        },
      },
      {
        name: 30,
        uid: "2415524738",
        values: {
          age: 30,
          P01: "8.8",
          P1: "9.6",
          P3: "10.1",
          P5: "10.4",
          P10: "10.9",
          P15: "11.2",
          P25: "11.7",
          P50: "12.7",
          P75: "13.8",
          P85: "14.5",
          P90: 15,
          P95: "15.7",
          P97: "16.2",
          P99: "17.3",
          P999: "19.2",
        },
      },
      {
        name: 31,
        uid: "287207066",
        values: {
          age: 31,
          P01: "8.9",
          P1: "9.7",
          P3: "10.3",
          P5: "10.5",
          P10: 11,
          P15: "11.3",
          P25: "11.9",
          P50: "12.9",
          P75: "14.1",
          P85: "14.7",
          P90: "15.2",
          P95: 16,
          P97: "16.5",
          P99: "17.6",
          P999: "19.6",
        },
      },
      {
        name: 32,
        uid: "811578739",
        values: {
          age: 32,
          P01: 9,
          P1: "9.9",
          P3: "10.4",
          P5: "10.7",
          P10: "11.2",
          P15: "11.5",
          P25: 12,
          P50: "13.1",
          P75: "14.3",
          P85: 15,
          P90: "15.5",
          P95: "16.2",
          P97: "16.8",
          P99: "17.8",
          P999: "19.9",
        },
      },
      {
        name: 33,
        uid: "3413938318",
        values: {
          age: 33,
          P01: "9.2",
          P1: 10,
          P3: "10.5",
          P5: "10.8",
          P10: "11.3",
          P15: "11.7",
          P25: "12.2",
          P50: "13.3",
          P75: "14.5",
          P85: "15.2",
          P90: "15.7",
          P95: "16.5",
          P97: 17,
          P99: "18.1",
          P999: "20.2",
        },
      },
      {
        name: 34,
        uid: "1773830548",
        values: {
          age: 34,
          P01: "9.3",
          P1: "10.1",
          P3: "10.7",
          P5: 11,
          P10: "11.5",
          P15: "11.8",
          P25: "12.4",
          P50: "13.5",
          P75: "14.7",
          P85: "15.4",
          P90: "15.9",
          P95: "16.8",
          P97: "17.3",
          P99: "18.4",
          P999: "20.6",
        },
      },
      {
        name: 35,
        uid: "3772242904",
        values: {
          age: 35,
          P01: "9.4",
          P1: "10.3",
          P3: "10.8",
          P5: "11.1",
          P10: "11.6",
          P15: 12,
          P25: "12.5",
          P50: "13.7",
          P75: "14.9",
          P85: "15.7",
          P90: "16.2",
          P95: 17,
          P97: "17.6",
          P99: "18.7",
          P999: "20.9",
        },
      },
      {
        name: 36,
        uid: "365540925",
        values: {
          age: 36,
          P01: "9.5",
          P1: "10.4",
          P3: 11,
          P5: "11.3",
          P10: "11.8",
          P15: "12.1",
          P25: "12.7",
          P50: "13.9",
          P75: "15.1",
          P85: "15.9",
          P90: "16.4",
          P95: "17.3",
          P97: "17.8",
          P99: 19,
          P999: "21.2",
        },
      },
      {
        name: 37,
        uid: "2362720420",
        values: {
          age: 37,
          P01: "9.6",
          P1: "10.5",
          P3: "11.1",
          P5: "11.4",
          P10: "11.9",
          P15: "12.3",
          P25: "12.9",
          P50: 14,
          P75: "15.3",
          P85: "16.1",
          P90: "16.7",
          P95: "17.5",
          P97: "18.1",
          P99: "19.3",
          P999: "21.6",
        },
      },
      {
        name: 38,
        uid: "414420137",
        values: {
          age: 38,
          P01: "9.7",
          P1: "10.6",
          P3: "11.2",
          P5: "11.6",
          P10: "12.1",
          P15: "12.5",
          P25: 13,
          P50: "14.2",
          P75: "15.6",
          P85: "16.3",
          P90: "16.9",
          P95: "17.8",
          P97: "18.4",
          P99: "19.6",
          P999: "21.9",
        },
      },
      {
        name: 39,
        uid: "1174097024",
        values: {
          age: 39,
          P01: "9.8",
          P1: "10.8",
          P3: "11.4",
          P5: "11.7",
          P10: "12.2",
          P15: "12.6",
          P25: "13.2",
          P50: "14.4",
          P75: "15.8",
          P85: "16.6",
          P90: "17.1",
          P95: 18,
          P97: "18.6",
          P99: "19.9",
          P999: "22.3",
        },
      },
      {
        name: 40,
        uid: "2395446952",
        values: {
          age: 40,
          P01: 10,
          P1: "10.9",
          P3: "11.5",
          P5: "11.8",
          P10: "12.4",
          P15: "12.8",
          P25: "13.4",
          P50: "14.6",
          P75: 16,
          P85: "16.8",
          P90: "17.4",
          P95: "18.3",
          P97: "18.9",
          P99: "20.2",
          P999: "22.6",
        },
      },
      {
        name: 41,
        uid: "1406042376",
        values: {
          age: 41,
          P01: "10.1",
          P1: 11,
          P3: "11.6",
          P5: 12,
          P10: "12.5",
          P15: "12.9",
          P25: "13.5",
          P50: "14.8",
          P75: "16.2",
          P85: 17,
          P90: "17.6",
          P95: "18.6",
          P97: "19.2",
          P99: "20.5",
          P999: 23,
        },
      },
      {
        name: 42,
        uid: "188749328",
        values: {
          age: 42,
          P01: "10.2",
          P1: "11.1",
          P3: "11.8",
          P5: "12.1",
          P10: "12.7",
          P15: "13.1",
          P25: "13.7",
          P50: 15,
          P75: "16.4",
          P85: "17.3",
          P90: "17.9",
          P95: "18.8",
          P97: "19.5",
          P99: "20.8",
          P999: "23.3",
        },
      },
      {
        name: 43,
        uid: "3574731008",
        values: {
          age: 43,
          P01: "10.3",
          P1: "11.3",
          P3: "11.9",
          P5: "12.2",
          P10: "12.8",
          P15: "13.2",
          P25: "13.9",
          P50: "15.2",
          P75: "16.6",
          P85: "17.5",
          P90: "18.1",
          P95: "19.1",
          P97: "19.7",
          P99: "21.1",
          P999: "23.7",
        },
      },
      {
        name: 44,
        uid: "1847243750",
        values: {
          age: 44,
          P01: "10.4",
          P1: "11.4",
          P3: 12,
          P5: "12.4",
          P10: 13,
          P15: "13.4",
          P25: 14,
          P50: "15.3",
          P75: "16.8",
          P85: "17.7",
          P90: "18.3",
          P95: "19.3",
          P97: 20,
          P99: "21.4",
          P999: "24.1",
        },
      },
      {
        name: 45,
        uid: "2731735734",
        values: {
          age: 45,
          P01: "10.5",
          P1: "11.5",
          P3: "12.1",
          P5: "12.5",
          P10: "13.1",
          P15: "13.5",
          P25: "14.2",
          P50: "15.5",
          P75: 17,
          P85: "17.9",
          P90: "18.6",
          P95: "19.6",
          P97: "20.3",
          P99: "21.7",
          P999: "24.4",
        },
      },
      {
        name: 46,
        uid: "1946702498",
        values: {
          age: 46,
          P01: "10.6",
          P1: "11.6",
          P3: "12.3",
          P5: "12.6",
          P10: "13.2",
          P15: "13.7",
          P25: "14.3",
          P50: "15.7",
          P75: "17.3",
          P85: "18.2",
          P90: "18.8",
          P95: "19.9",
          P97: "20.6",
          P99: 22,
          P999: "24.8",
        },
      },
      {
        name: 47,
        uid: "3162328368",
        values: {
          age: 47,
          P01: "10.7",
          P1: "11.7",
          P3: "12.4",
          P5: "12.8",
          P10: "13.4",
          P15: "13.8",
          P25: "14.5",
          P50: "15.9",
          P75: "17.5",
          P85: "18.4",
          P90: "19.1",
          P95: "20.1",
          P97: "20.8",
          P99: "22.3",
          P999: "25.2",
        },
      },
      {
        name: 48,
        uid: "1840523714",
        values: {
          age: 48,
          P01: "10.8",
          P1: "11.8",
          P3: "12.5",
          P5: "12.9",
          P10: "13.5",
          P15: 14,
          P25: "14.7",
          P50: "16.1",
          P75: "17.7",
          P85: "18.6",
          P90: "19.3",
          P95: "20.4",
          P97: "21.1",
          P99: "22.6",
          P999: "25.5",
        },
      },
      {
        name: 49,
        uid: "3046199322",
        values: {
          age: 49,
          P01: "10.9",
          P1: "11.9",
          P3: "12.6",
          P5: 13,
          P10: "13.7",
          P15: "14.1",
          P25: "14.8",
          P50: "16.3",
          P75: "17.9",
          P85: "18.9",
          P90: "19.5",
          P95: "20.6",
          P97: "21.4",
          P99: "22.9",
          P999: "25.9",
        },
      },
      {
        name: 50,
        uid: "1128574067",
        values: {
          age: 50,
          P01: 11,
          P1: "12.1",
          P3: "12.8",
          P5: "13.2",
          P10: "13.8",
          P15: "14.3",
          P25: 15,
          P50: "16.4",
          P75: "18.1",
          P85: "19.1",
          P90: "19.8",
          P95: "20.9",
          P97: "21.7",
          P99: "23.2",
          P999: "26.3",
        },
      },
      {
        name: 51,
        uid: "2932598118",
        values: {
          age: 51,
          P01: "11.1",
          P1: "12.2",
          P3: "12.9",
          P5: "13.3",
          P10: "13.9",
          P15: "14.4",
          P25: "15.1",
          P50: "16.6",
          P75: "18.3",
          P85: "19.3",
          P90: 20,
          P95: "21.2",
          P97: 22,
          P99: "23.5",
          P999: "26.7",
        },
      },
      {
        name: 52,
        uid: "2592184625",
        values: {
          age: 52,
          P01: "11.2",
          P1: "12.3",
          P3: 13,
          P5: "13.4",
          P10: "14.1",
          P15: "14.5",
          P25: "15.3",
          P50: "16.8",
          P75: "18.5",
          P85: "19.5",
          P90: "20.3",
          P95: "21.4",
          P97: "22.2",
          P99: "23.9",
          P999: 27,
        },
      },
      {
        name: 53,
        uid: "2000089489",
        values: {
          age: 53,
          P01: "11.3",
          P1: "12.4",
          P3: "13.1",
          P5: "13.5",
          P10: "14.2",
          P15: "14.7",
          P25: "15.4",
          P50: 17,
          P75: "18.7",
          P85: "19.8",
          P90: "20.5",
          P95: "21.7",
          P97: "22.5",
          P99: "24.2",
          P999: "27.4",
        },
      },
      {
        name: 54,
        uid: "2638138720",
        values: {
          age: 54,
          P01: "11.3",
          P1: "12.5",
          P3: "13.2",
          P5: "13.7",
          P10: "14.3",
          P15: "14.8",
          P25: "15.6",
          P50: "17.2",
          P75: "18.9",
          P85: 20,
          P90: "20.8",
          P95: 22,
          P97: "22.8",
          P99: "24.5",
          P999: "27.8",
        },
      },
      {
        name: 55,
        uid: "2745248364",
        values: {
          age: 55,
          P01: "11.4",
          P1: "12.6",
          P3: "13.4",
          P5: "13.8",
          P10: "14.5",
          P15: 15,
          P25: "15.8",
          P50: "17.3",
          P75: "19.1",
          P85: "20.2",
          P90: 21,
          P95: "22.2",
          P97: "23.1",
          P99: "24.8",
          P999: "28.2",
        },
      },
      {
        name: 56,
        uid: "3637147298",
        values: {
          age: 56,
          P01: "11.5",
          P1: "12.7",
          P3: "13.5",
          P5: "13.9",
          P10: "14.6",
          P15: "15.1",
          P25: "15.9",
          P50: "17.5",
          P75: "19.3",
          P85: "20.4",
          P90: "21.2",
          P95: "22.5",
          P97: "23.3",
          P99: "25.1",
          P999: "28.5",
        },
      },
      {
        name: 57,
        uid: "1827613279",
        values: {
          age: 57,
          P01: "11.6",
          P1: "12.8",
          P3: "13.6",
          P5: 14,
          P10: "14.8",
          P15: "15.3",
          P25: "16.1",
          P50: "17.7",
          P75: "19.6",
          P85: "20.7",
          P90: "21.5",
          P95: "22.7",
          P97: "23.6",
          P99: "25.4",
          P999: "28.9",
        },
      },
      {
        name: 58,
        uid: "3251797700",
        values: {
          age: 58,
          P01: "11.7",
          P1: "12.9",
          P3: "13.7",
          P5: "14.2",
          P10: "14.9",
          P15: "15.4",
          P25: "16.2",
          P50: "17.9",
          P75: "19.8",
          P85: "20.9",
          P90: "21.7",
          P95: 23,
          P97: "23.9",
          P99: "25.7",
          P999: "29.3",
        },
      },
      {
        name: 59,
        uid: "2504439315",
        values: {
          age: 59,
          P01: "11.8",
          P1: "13.1",
          P3: "13.8",
          P5: "14.3",
          P10: 15,
          P15: "15.5",
          P25: "16.4",
          P50: 18,
          P75: 20,
          P85: "21.1",
          P90: "21.9",
          P95: "23.3",
          P97: "24.2",
          P99: 26,
          P999: "29.6",
        },
      },
      {
        name: 60,
        uid: "470741983",
        values: {
          age: 60,
          P01: "11.9",
          P1: "13.2",
          P3: 14,
          P5: "14.4",
          P10: "15.2",
          P15: "15.7",
          P25: "16.5",
          P50: "18.2",
          P75: "20.2",
          P85: "21.3",
          P90: "22.2",
          P95: "23.5",
          P97: "24.4",
          P99: "26.3",
          P999: 30,
        },
      },
    ];

    const boys_to_13w = [
      {
        name: "a",
        uid: "174380932",
        values: {
          age: 0,
          P01: 2,
          P1: "2.3",
          P3: "2.5",
          P5: "2.6",
          P10: "2.8",
          P15: "2.9",
          P25: 3,
          P50: "3.3",
          P75: "3.7",
          P85: "3.9",
          P90: 4,
          P95: "4.2",
          P97: "4.3",
          P99: "4.6",
          P999: "5.1",
        },
      },
      {
        name: 1,
        uid: "1361477978",
        values: {
          age: 1,
          P01: "2.2",
          P1: "2.4",
          P3: "2.6",
          P5: "2.7",
          P10: "2.9",
          P15: 3,
          P25: "3.2",
          P50: "3.5",
          P75: "3.8",
          P85: 4,
          P90: "4.2",
          P95: "4.4",
          P97: "4.5",
          P99: "4.8",
          P999: "5.3",
        },
      },
      {
        name: 2,
        uid: "3568377109",
        values: {
          age: 2,
          P01: "2.4",
          P1: "2.7",
          P3: "2.8",
          P5: 3,
          P10: "3.1",
          P15: "3.2",
          P25: "3.4",
          P50: "3.8",
          P75: "4.1",
          P85: "4.3",
          P90: "4.5",
          P95: "4.7",
          P97: "4.9",
          P99: "5.1",
          P999: "5.7",
        },
      },
      {
        name: 3,
        uid: "1284471549",
        values: {
          age: 3,
          P01: "2.6",
          P1: "2.9",
          P3: "3.1",
          P5: "3.2",
          P10: "3.4",
          P15: "3.5",
          P25: "3.7",
          P50: "4.1",
          P75: "4.5",
          P85: "4.7",
          P90: "4.8",
          P95: "5.1",
          P97: "5.2",
          P99: "5.5",
          P999: "6.1",
        },
      },
      {
        name: 4,
        uid: "163197567",
        values: {
          age: 4,
          P01: "2.8",
          P1: "3.2",
          P3: "3.4",
          P5: "3.5",
          P10: "3.7",
          P15: "3.8",
          P25: 4,
          P50: "4.4",
          P75: "4.8",
          P85: 5,
          P90: "5.2",
          P95: "5.4",
          P97: "5.6",
          P99: "5.9",
          P999: "6.5",
        },
      },
      {
        name: 5,
        uid: "2239250885",
        values: {
          age: 5,
          P01: 3,
          P1: "3.4",
          P3: "3.6",
          P5: "3.7",
          P10: "3.9",
          P15: "4.1",
          P25: "4.3",
          P50: "4.7",
          P75: "5.1",
          P85: "5.3",
          P90: "5.5",
          P95: "5.8",
          P97: "5.9",
          P99: "6.3",
          P999: "6.9",
        },
      },
      {
        name: 6,
        uid: "1861435883",
        values: {
          age: 6,
          P01: "3.2",
          P1: "3.6",
          P3: "3.8",
          P5: 4,
          P10: "4.2",
          P15: "4.3",
          P25: "4.5",
          P50: "4.9",
          P75: "5.4",
          P85: "5.6",
          P90: "5.8",
          P95: "6.1",
          P97: "6.3",
          P99: "6.6",
          P999: "7.2",
        },
      },
      {
        name: 7,
        uid: "3846148424",
        values: {
          age: 7,
          P01: "3.4",
          P1: "3.8",
          P3: "4.1",
          P5: "4.2",
          P10: "4.4",
          P15: "4.5",
          P25: "4.8",
          P50: "5.2",
          P75: "5.6",
          P85: "5.9",
          P90: "6.1",
          P95: "6.4",
          P97: "6.5",
          P99: "6.9",
          P999: "7.6",
        },
      },
      {
        name: 8,
        uid: "2001806356",
        values: {
          age: 8,
          P01: "3.6",
          P1: 4,
          P3: "4.3",
          P5: "4.4",
          P10: "4.6",
          P15: "4.7",
          P25: 5,
          P50: "5.4",
          P75: "5.9",
          P85: "6.2",
          P90: "6.3",
          P95: "6.6",
          P97: "6.8",
          P99: "7.2",
          P999: "7.9",
        },
      },
      {
        name: 9,
        uid: "1714284403",
        values: {
          age: 9,
          P01: "3.8",
          P1: "4.2",
          P3: "4.4",
          P5: "4.6",
          P10: "4.8",
          P15: "4.9",
          P25: "5.2",
          P50: "5.6",
          P75: "6.1",
          P85: "6.4",
          P90: "6.6",
          P95: "6.9",
          P97: "7.1",
          P99: "7.4",
          P999: "8.1",
        },
      },
      {
        name: 10,
        uid: "316784701",
        values: {
          age: 10,
          P01: 4,
          P1: "4.4",
          P3: "4.6",
          P5: "4.8",
          P10: 5,
          P15: "5.1",
          P25: "5.4",
          P50: "5.8",
          P75: "6.3",
          P85: "6.6",
          P90: "6.8",
          P95: "7.1",
          P97: "7.3",
          P99: "7.7",
          P999: "8.4",
        },
      },
      {
        name: 11,
        uid: "834857604",
        values: {
          age: 11,
          P01: "4.1",
          P1: "4.5",
          P3: "4.8",
          P5: "4.9",
          P10: "5.2",
          P15: "5.3",
          P25: "5.6",
          P50: 6,
          P75: "6.5",
          P85: "6.8",
          P90: 7,
          P95: "7.3",
          P97: "7.5",
          P99: "7.9",
          P999: "8.6",
        },
      },
      {
        name: 12,
        uid: "1982219379",
        values: {
          age: 12,
          P01: "4.2",
          P1: "4.7",
          P3: "4.9",
          P5: "5.1",
          P10: "5.3",
          P15: "5.5",
          P25: "5.7",
          P50: "6.2",
          P75: "6.7",
          P85: 7,
          P90: "7.2",
          P95: "7.5",
          P97: "7.7",
          P99: "8.1",
          P999: "8.8",
        },
      },
      {
        name: 13,
        uid: "2585205816",
        values: {
          age: 13,
          P01: "4.4",
          P1: "4.8",
          P3: "5.1",
          P5: "5.2",
          P10: "5.5",
          P15: "5.6",
          P25: "5.9",
          P50: "6.4",
          P75: "6.9",
          P85: "7.2",
          P90: "7.4",
          P95: "7.7",
          P97: "7.9",
          P99: "8.3",
          P999: "9.1",
        },
      },
    ];

    const boys_to_5y = [
      {
        name: "a",
        uid: "174380932",
        values: {
          age: 0,
          P01: 2,
          P1: "2.3",
          P3: "2.5",
          P5: "2.6",
          P10: "2.8",
          P15: "2.9",
          P25: 3,
          P50: "3.3",
          P75: "3.7",
          P85: "3.9",
          P90: 4,
          P95: "4.2",
          P97: "4.3",
          P99: "4.6",
          P999: "5.1",
        },
      },
      {
        name: 1,
        uid: "1393043846",
        values: {
          age: 1,
          P01: "2.9",
          P1: "3.2",
          P3: "3.4",
          P5: "3.6",
          P10: "3.8",
          P15: "3.9",
          P25: "4.1",
          P50: "4.5",
          P75: "4.9",
          P85: "5.1",
          P90: "5.3",
          P95: "5.5",
          P97: "5.7",
          P99: 6,
          P999: "6.6",
        },
      },
      {
        name: 2,
        uid: "3408545268",
        values: {
          age: 2,
          P01: "3.7",
          P1: "4.1",
          P3: "4.4",
          P5: "4.5",
          P10: "4.7",
          P15: "4.9",
          P25: "5.1",
          P50: "5.6",
          P75: 6,
          P85: "6.3",
          P90: "6.5",
          P95: "6.8",
          P97: 7,
          P99: "7.4",
          P999: "8.1",
        },
      },
      {
        name: 3,
        uid: "3641033609",
        values: {
          age: 3,
          P01: "4.4",
          P1: "4.8",
          P3: "5.1",
          P5: "5.2",
          P10: "5.5",
          P15: "5.6",
          P25: "5.9",
          P50: "6.4",
          P75: "6.9",
          P85: "7.2",
          P90: "7.4",
          P95: "7.7",
          P97: "7.9",
          P99: "8.3",
          P999: "9.1",
        },
      },
      {
        name: 4,
        uid: "1456690596",
        values: {
          age: 4,
          P01: "4.9",
          P1: "5.4",
          P3: "5.6",
          P5: "5.8",
          P10: 6,
          P15: "6.2",
          P25: "6.5",
          P50: 7,
          P75: "7.6",
          P85: "7.9",
          P90: "8.1",
          P95: "8.4",
          P97: "8.6",
          P99: "9.1",
          P999: "9.8",
        },
      },
      {
        name: 5,
        uid: "3471436701",
        values: {
          age: 5,
          P01: "5.3",
          P1: "5.8",
          P3: "6.1",
          P5: "6.2",
          P10: "6.5",
          P15: "6.7",
          P25: 7,
          P50: "7.5",
          P75: "8.1",
          P85: "8.4",
          P90: "8.6",
          P95: 9,
          P97: "9.2",
          P99: "9.7",
          P999: "10.5",
        },
      },
      {
        name: 6,
        uid: "1670941587",
        values: {
          age: 6,
          P01: "5.6",
          P1: "6.1",
          P3: "6.4",
          P5: "6.6",
          P10: "6.9",
          P15: "7.1",
          P25: "7.4",
          P50: "7.9",
          P75: "8.5",
          P85: "8.9",
          P90: "9.1",
          P95: "9.5",
          P97: "9.7",
          P99: "10.2",
          P999: "11.1",
        },
      },
      {
        name: 7,
        uid: "1355367027",
        values: {
          age: 7,
          P01: "5.9",
          P1: "6.4",
          P3: "6.7",
          P5: "6.9",
          P10: "7.2",
          P15: "7.4",
          P25: "7.7",
          P50: "8.3",
          P75: "8.9",
          P85: "9.3",
          P90: "9.5",
          P95: "9.9",
          P97: "10.2",
          P99: "10.7",
          P999: "11.5",
        },
      },
      {
        name: 8,
        uid: "9139636",
        values: {
          age: 8,
          P01: "6.1",
          P1: "6.7",
          P3: 7,
          P5: "7.2",
          P10: "7.5",
          P15: "7.7",
          P25: 8,
          P50: "8.6",
          P75: "9.3",
          P85: "9.6",
          P90: "9.9",
          P95: "10.3",
          P97: "10.5",
          P99: "11.1",
          P999: 12,
        },
      },
      {
        name: 9,
        uid: "3536012642",
        values: {
          age: 9,
          P01: "6.3",
          P1: "6.9",
          P3: "7.2",
          P5: "7.4",
          P10: "7.7",
          P15: "7.9",
          P25: "8.3",
          P50: "8.9",
          P75: "9.6",
          P85: 10,
          P90: "10.2",
          P95: "10.6",
          P97: "10.9",
          P99: "11.4",
          P999: "12.4",
        },
      },
      {
        name: 10,
        uid: "643284964",
        values: {
          age: 10,
          P01: "6.5",
          P1: "7.1",
          P3: "7.5",
          P5: "7.7",
          P10: 8,
          P15: "8.2",
          P25: "8.5",
          P50: "9.2",
          P75: "9.9",
          P85: "10.3",
          P90: "10.5",
          P95: "10.9",
          P97: "11.2",
          P99: "11.8",
          P999: "12.8",
        },
      },
      {
        name: 11,
        uid: "3093453099",
        values: {
          age: 11,
          P01: "6.7",
          P1: "7.3",
          P3: "7.7",
          P5: "7.9",
          P10: "8.2",
          P15: "8.4",
          P25: "8.7",
          P50: "9.4",
          P75: "10.1",
          P85: "10.5",
          P90: "10.8",
          P95: "11.2",
          P97: "11.5",
          P99: "12.1",
          P999: "13.1",
        },
      },
      {
        name: 12,
        uid: "190355866",
        values: {
          age: 12,
          P01: "6.9",
          P1: "7.5",
          P3: "7.8",
          P5: "8.1",
          P10: "8.4",
          P15: "8.6",
          P25: 9,
          P50: "9.6",
          P75: "10.4",
          P85: "10.8",
          P90: "11.1",
          P95: "11.5",
          P97: "11.8",
          P99: "12.4",
          P999: "13.5",
        },
      },
      {
        name: 13,
        uid: "1493861541",
        values: {
          age: 13,
          P01: 7,
          P1: "7.6",
          P3: 8,
          P5: "8.2",
          P10: "8.6",
          P15: "8.8",
          P25: "9.2",
          P50: "9.9",
          P75: "10.6",
          P85: "11.1",
          P90: "11.4",
          P95: "11.8",
          P97: "12.1",
          P99: "12.7",
          P999: "13.8",
        },
      },
      {
        name: 14,
        uid: "2725543586",
        values: {
          age: 14,
          P01: "7.2",
          P1: "7.8",
          P3: "8.2",
          P5: "8.4",
          P10: "8.8",
          P15: 9,
          P25: "9.4",
          P50: "10.1",
          P75: "10.9",
          P85: "11.3",
          P90: "11.6",
          P95: "12.1",
          P97: "12.4",
          P99: 13,
          P999: "14.1",
        },
      },
      {
        name: 15,
        uid: "2781236091",
        values: {
          age: 15,
          P01: "7.3",
          P1: 8,
          P3: "8.4",
          P5: "8.6",
          P10: 9,
          P15: "9.2",
          P25: "9.6",
          P50: "10.3",
          P75: "11.1",
          P85: "11.6",
          P90: "11.9",
          P95: "12.3",
          P97: "12.7",
          P99: "13.3",
          P999: "14.5",
        },
      },
      {
        name: 16,
        uid: "1561580394",
        values: {
          age: 16,
          P01: "7.5",
          P1: "8.1",
          P3: "8.5",
          P5: "8.8",
          P10: "9.1",
          P15: "9.4",
          P25: "9.8",
          P50: "10.5",
          P75: "11.3",
          P85: "11.8",
          P90: "12.1",
          P95: "12.6",
          P97: "12.9",
          P99: "13.6",
          P999: "14.8",
        },
      },
      {
        name: 17,
        uid: "510295962",
        values: {
          age: 17,
          P01: "7.6",
          P1: "8.3",
          P3: "8.7",
          P5: "8.9",
          P10: "9.3",
          P15: "9.6",
          P25: 10,
          P50: "10.7",
          P75: "11.6",
          P85: 12,
          P90: "12.4",
          P95: "12.9",
          P97: "13.2",
          P99: "13.9",
          P999: "15.1",
        },
      },
      {
        name: 18,
        uid: "3259109840",
        values: {
          age: 18,
          P01: "7.7",
          P1: "8.4",
          P3: "8.9",
          P5: "9.1",
          P10: "9.5",
          P15: "9.7",
          P25: "10.1",
          P50: "10.9",
          P75: "11.8",
          P85: "12.3",
          P90: "12.6",
          P95: "13.1",
          P97: "13.5",
          P99: "14.2",
          P999: "15.4",
        },
      },
      {
        name: 19,
        uid: "73934774",
        values: {
          age: 19,
          P01: "7.9",
          P1: "8.6",
          P3: 9,
          P5: "9.3",
          P10: "9.7",
          P15: "9.9",
          P25: "10.3",
          P50: "11.1",
          P75: 12,
          P85: "12.5",
          P90: "12.9",
          P95: "13.4",
          P97: "13.7",
          P99: "14.4",
          P999: "15.7",
        },
      },
      {
        name: 20,
        uid: "2494669100",
        values: {
          age: 20,
          P01: 8,
          P1: "8.7",
          P3: "9.2",
          P5: "9.4",
          P10: "9.8",
          P15: "10.1",
          P25: "10.5",
          P50: "11.3",
          P75: "12.2",
          P85: "12.7",
          P90: "13.1",
          P95: "13.6",
          P97: 14,
          P99: "14.7",
          P999: 16,
        },
      },
      {
        name: 21,
        uid: "1549215921",
        values: {
          age: 21,
          P01: "8.2",
          P1: "8.9",
          P3: "9.3",
          P5: "9.6",
          P10: 10,
          P15: "10.3",
          P25: "10.7",
          P50: "11.5",
          P75: "12.5",
          P85: 13,
          P90: "13.3",
          P95: "13.9",
          P97: "14.3",
          P99: 15,
          P999: "16.4",
        },
      },
      {
        name: 22,
        uid: "1604773991",
        values: {
          age: 22,
          P01: "8.3",
          P1: 9,
          P3: "9.5",
          P5: "9.8",
          P10: "10.2",
          P15: "10.5",
          P25: "10.9",
          P50: "11.8",
          P75: "12.7",
          P85: "13.2",
          P90: "13.6",
          P95: "14.2",
          P97: "14.5",
          P99: "15.3",
          P999: "16.7",
        },
      },
      {
        name: 23,
        uid: "524159043",
        values: {
          age: 23,
          P01: "8.4",
          P1: "9.2",
          P3: "9.7",
          P5: "9.9",
          P10: "10.3",
          P15: "10.6",
          P25: "11.1",
          P50: 12,
          P75: "12.9",
          P85: "13.4",
          P90: "13.8",
          P95: "14.4",
          P97: "14.8",
          P99: "15.6",
          P999: 17,
        },
      },
      {
        name: 24,
        uid: "227731272",
        values: {
          age: 24,
          P01: "8.5",
          P1: "9.3",
          P3: "9.8",
          P5: "10.1",
          P10: "10.5",
          P15: "10.8",
          P25: "11.3",
          P50: "12.2",
          P75: "13.1",
          P85: "13.7",
          P90: "14.1",
          P95: "14.7",
          P97: "15.1",
          P99: "15.9",
          P999: "17.3",
        },
      },
      {
        name: 25,
        uid: "2229866116",
        values: {
          age: 25,
          P01: "8.7",
          P1: "9.5",
          P3: 10,
          P5: "10.2",
          P10: "10.7",
          P15: 11,
          P25: "11.4",
          P50: "12.4",
          P75: "13.3",
          P85: "13.9",
          P90: "14.3",
          P95: "14.9",
          P97: "15.3",
          P99: "16.1",
          P999: "17.6",
        },
      },
      {
        name: 26,
        uid: "630704040",
        values: {
          age: 26,
          P01: "8.8",
          P1: "9.6",
          P3: "10.1",
          P5: "10.4",
          P10: "10.8",
          P15: "11.1",
          P25: "11.6",
          P50: "12.5",
          P75: "13.6",
          P85: "14.1",
          P90: "14.6",
          P95: "15.2",
          P97: "15.6",
          P99: "16.4",
          P999: 18,
        },
      },
      {
        name: 27,
        uid: "4073619105",
        values: {
          age: 27,
          P01: "8.9",
          P1: "9.7",
          P3: "10.2",
          P5: "10.5",
          P10: 11,
          P15: "11.3",
          P25: "11.8",
          P50: "12.7",
          P75: "13.8",
          P85: "14.4",
          P90: "14.8",
          P95: "15.4",
          P97: "15.9",
          P99: "16.7",
          P999: "18.3",
        },
      },
      {
        name: 28,
        uid: "2086572634",
        values: {
          age: 28,
          P01: 9,
          P1: "9.9",
          P3: "10.4",
          P5: "10.7",
          P10: "11.1",
          P15: "11.5",
          P25: 12,
          P50: "12.9",
          P75: 14,
          P85: "14.6",
          P90: 15,
          P95: "15.7",
          P97: "16.1",
          P99: 17,
          P999: "18.6",
        },
      },
      {
        name: 29,
        uid: "2507550460",
        values: {
          age: 29,
          P01: "9.2",
          P1: 10,
          P3: "10.5",
          P5: "10.8",
          P10: "11.3",
          P15: "11.6",
          P25: "12.1",
          P50: "13.1",
          P75: "14.2",
          P85: "14.8",
          P90: "15.2",
          P95: "15.9",
          P97: "16.4",
          P99: "17.3",
          P999: "18.9",
        },
      },
      {
        name: 30,
        uid: "1164010091",
        values: {
          age: 30,
          P01: "9.3",
          P1: "10.1",
          P3: "10.7",
          P5: 11,
          P10: "11.4",
          P15: "11.8",
          P25: "12.3",
          P50: "13.3",
          P75: "14.4",
          P85: 15,
          P90: "15.5",
          P95: "16.2",
          P97: "16.6",
          P99: "17.5",
          P999: "19.2",
        },
      },
      {
        name: 31,
        uid: "3228793166",
        values: {
          age: 31,
          P01: "9.4",
          P1: "10.3",
          P3: "10.8",
          P5: "11.1",
          P10: "11.6",
          P15: "11.9",
          P25: "12.4",
          P50: "13.5",
          P75: "14.6",
          P85: "15.2",
          P90: "15.7",
          P95: "16.4",
          P97: "16.9",
          P99: "17.8",
          P999: "19.5",
        },
      },
      {
        name: 32,
        uid: "2440582334",
        values: {
          age: 32,
          P01: "9.5",
          P1: "10.4",
          P3: "10.9",
          P5: "11.2",
          P10: "11.7",
          P15: "12.1",
          P25: "12.6",
          P50: "13.7",
          P75: "14.8",
          P85: "15.5",
          P90: "15.9",
          P95: "16.6",
          P97: "17.1",
          P99: 18,
          P999: "19.8",
        },
      },
      {
        name: 33,
        uid: "79372125",
        values: {
          age: 33,
          P01: "9.6",
          P1: "10.5",
          P3: "11.1",
          P5: "11.4",
          P10: "11.9",
          P15: "12.2",
          P25: "12.8",
          P50: "13.8",
          P75: 15,
          P85: "15.7",
          P90: "16.1",
          P95: "16.9",
          P97: "17.3",
          P99: "18.3",
          P999: "20.1",
        },
      },
      {
        name: 34,
        uid: "2362803091",
        values: {
          age: 34,
          P01: "9.7",
          P1: "10.6",
          P3: "11.2",
          P5: "11.5",
          P10: 12,
          P15: "12.4",
          P25: "12.9",
          P50: 14,
          P75: "15.2",
          P85: "15.9",
          P90: "16.3",
          P95: "17.1",
          P97: "17.6",
          P99: "18.6",
          P999: "20.4",
        },
      },
      {
        name: 35,
        uid: "2023835620",
        values: {
          age: 35,
          P01: "9.8",
          P1: "10.7",
          P3: "11.3",
          P5: "11.6",
          P10: "12.2",
          P15: "12.5",
          P25: "13.1",
          P50: "14.2",
          P75: "15.4",
          P85: "16.1",
          P90: "16.6",
          P95: "17.3",
          P97: "17.8",
          P99: "18.8",
          P999: "20.7",
        },
      },
      {
        name: 36,
        uid: "2993730527",
        values: {
          age: 36,
          P01: "9.9",
          P1: "10.8",
          P3: "11.4",
          P5: "11.8",
          P10: "12.3",
          P15: "12.7",
          P25: "13.2",
          P50: "14.3",
          P75: "15.6",
          P85: "16.3",
          P90: "16.8",
          P95: "17.5",
          P97: 18,
          P99: "19.1",
          P999: 21,
        },
      },
      {
        name: 37,
        uid: "538042987",
        values: {
          age: 37,
          P01: 10,
          P1: 11,
          P3: "11.6",
          P5: "11.9",
          P10: "12.4",
          P15: "12.8",
          P25: "13.4",
          P50: "14.5",
          P75: "15.8",
          P85: "16.5",
          P90: 17,
          P95: "17.8",
          P97: "18.3",
          P99: "19.3",
          P999: "21.2",
        },
      },
      {
        name: 38,
        uid: "2477976915",
        values: {
          age: 38,
          P01: "10.1",
          P1: "11.1",
          P3: "11.7",
          P5: 12,
          P10: "12.6",
          P15: "12.9",
          P25: "13.5",
          P50: "14.7",
          P75: "15.9",
          P85: "16.7",
          P90: "17.2",
          P95: 18,
          P97: "18.5",
          P99: "19.6",
          P999: "21.5",
        },
      },
      {
        name: 39,
        uid: "1933586597",
        values: {
          age: 39,
          P01: "10.2",
          P1: "11.2",
          P3: "11.8",
          P5: "12.2",
          P10: "12.7",
          P15: "13.1",
          P25: "13.7",
          P50: "14.8",
          P75: "16.1",
          P85: "16.9",
          P90: "17.4",
          P95: "18.2",
          P97: "18.7",
          P99: "19.8",
          P999: "21.8",
        },
      },
      {
        name: 40,
        uid: "113334890",
        values: {
          age: 40,
          P01: "10.3",
          P1: "11.3",
          P3: "11.9",
          P5: "12.3",
          P10: "12.8",
          P15: "13.2",
          P25: "13.8",
          P50: 15,
          P75: "16.3",
          P85: "17.1",
          P90: "17.6",
          P95: "18.4",
          P97: 19,
          P99: "20.1",
          P999: "22.1",
        },
      },
      {
        name: 41,
        uid: "909726333",
        values: {
          age: 41,
          P01: "10.4",
          P1: "11.4",
          P3: "12.1",
          P5: "12.4",
          P10: 13,
          P15: "13.4",
          P25: 14,
          P50: "15.2",
          P75: "16.5",
          P85: "17.3",
          P90: "17.8",
          P95: "18.6",
          P97: "19.2",
          P99: "20.3",
          P999: "22.4",
        },
      },
      {
        name: 42,
        uid: "2372119879",
        values: {
          age: 42,
          P01: "10.5",
          P1: "11.5",
          P3: "12.2",
          P5: "12.5",
          P10: "13.1",
          P15: "13.5",
          P25: "14.1",
          P50: "15.3",
          P75: "16.7",
          P85: "17.5",
          P90: 18,
          P95: "18.9",
          P97: "19.4",
          P99: "20.6",
          P999: "22.7",
        },
      },
      {
        name: 43,
        uid: "1733486684",
        values: {
          age: 43,
          P01: "10.6",
          P1: "11.7",
          P3: "12.3",
          P5: "12.7",
          P10: "13.2",
          P15: "13.6",
          P25: "14.3",
          P50: "15.5",
          P75: "16.9",
          P85: "17.7",
          P90: "18.2",
          P95: "19.1",
          P97: "19.7",
          P99: "20.8",
          P999: 23,
        },
      },
      {
        name: 44,
        uid: "3599131016",
        values: {
          age: 44,
          P01: "10.7",
          P1: "11.8",
          P3: "12.4",
          P5: "12.8",
          P10: "13.4",
          P15: "13.8",
          P25: "14.4",
          P50: "15.7",
          P75: "17.1",
          P85: "17.9",
          P90: "18.4",
          P95: "19.3",
          P97: "19.9",
          P99: "21.1",
          P999: "23.3",
        },
      },
      {
        name: 45,
        uid: "182517539",
        values: {
          age: 45,
          P01: "10.8",
          P1: "11.9",
          P3: "12.5",
          P5: "12.9",
          P10: "13.5",
          P15: "13.9",
          P25: "14.6",
          P50: "15.8",
          P75: "17.3",
          P85: "18.1",
          P90: "18.6",
          P95: "19.5",
          P97: "20.1",
          P99: "21.3",
          P999: "23.6",
        },
      },
      {
        name: 46,
        uid: "1609782514",
        values: {
          age: 46,
          P01: "10.9",
          P1: 12,
          P3: "12.7",
          P5: 13,
          P10: "13.6",
          P15: "14.1",
          P25: "14.7",
          P50: 16,
          P75: "17.4",
          P85: "18.3",
          P90: "18.9",
          P95: "19.8",
          P97: "20.4",
          P99: "21.6",
          P999: "23.9",
        },
      },
      {
        name: 47,
        uid: "3663334905",
        values: {
          age: 47,
          P01: 11,
          P1: "12.1",
          P3: "12.8",
          P5: "13.2",
          P10: "13.8",
          P15: "14.2",
          P25: "14.9",
          P50: "16.2",
          P75: "17.6",
          P85: "18.5",
          P90: "19.1",
          P95: 20,
          P97: "20.6",
          P99: "21.9",
          P999: "24.2",
        },
      },
      {
        name: 48,
        uid: "3032606303",
        values: {
          age: 48,
          P01: "11.1",
          P1: "12.2",
          P3: "12.9",
          P5: "13.3",
          P10: "13.9",
          P15: "14.3",
          P25: 15,
          P50: "16.3",
          P75: "17.8",
          P85: "18.7",
          P90: "19.3",
          P95: "20.2",
          P97: "20.9",
          P99: "22.1",
          P999: "24.5",
        },
      },
      {
        name: 49,
        uid: "3408935369",
        values: {
          age: 49,
          P01: "11.2",
          P1: "12.3",
          P3: 13,
          P5: "13.4",
          P10: 14,
          P15: "14.5",
          P25: "15.2",
          P50: "16.5",
          P75: 18,
          P85: "18.9",
          P90: "19.5",
          P95: "20.4",
          P97: "21.1",
          P99: "22.4",
          P999: "24.8",
        },
      },
      {
        name: 50,
        uid: "1589457419",
        values: {
          age: 50,
          P01: "11.3",
          P1: "12.4",
          P3: "13.1",
          P5: "13.5",
          P10: "14.2",
          P15: "14.6",
          P25: "15.3",
          P50: "16.7",
          P75: "18.2",
          P85: "19.1",
          P90: "19.7",
          P95: "20.7",
          P97: "21.3",
          P99: "22.6",
          P999: "25.1",
        },
      },
      {
        name: 51,
        uid: "2469851358",
        values: {
          age: 51,
          P01: "11.4",
          P1: "12.5",
          P3: "13.3",
          P5: "13.7",
          P10: "14.3",
          P15: "14.7",
          P25: "15.4",
          P50: "16.8",
          P75: "18.4",
          P85: "19.3",
          P90: "19.9",
          P95: "20.9",
          P97: "21.6",
          P99: "22.9",
          P999: "25.4",
        },
      },
      {
        name: 52,
        uid: "2105380869",
        values: {
          age: 52,
          P01: "11.5",
          P1: "12.6",
          P3: "13.4",
          P5: "13.8",
          P10: "14.4",
          P15: "14.9",
          P25: "15.6",
          P50: 17,
          P75: "18.6",
          P85: "19.5",
          P90: "20.1",
          P95: "21.1",
          P97: "21.8",
          P99: "23.2",
          P999: "25.7",
        },
      },
      {
        name: 53,
        uid: "3127741612",
        values: {
          age: 53,
          P01: "11.6",
          P1: "12.7",
          P3: "13.5",
          P5: "13.9",
          P10: "14.6",
          P15: 15,
          P25: "15.7",
          P50: "17.2",
          P75: "18.8",
          P85: "19.7",
          P90: "20.3",
          P95: "21.4",
          P97: "22.1",
          P99: "23.4",
          P999: 26,
        },
      },
      {
        name: 54,
        uid: "3412750668",
        values: {
          age: 54,
          P01: "11.7",
          P1: "12.9",
          P3: "13.6",
          P5: 14,
          P10: "14.7",
          P15: "15.2",
          P25: "15.9",
          P50: "17.3",
          P75: 19,
          P85: "19.9",
          P90: "20.6",
          P95: "21.6",
          P97: "22.3",
          P99: "23.7",
          P999: "26.3",
        },
      },
      {
        name: 55,
        uid: "988126842",
        values: {
          age: 55,
          P01: "11.8",
          P1: 13,
          P3: "13.7",
          P5: "14.1",
          P10: "14.8",
          P15: "15.3",
          P25: 16,
          P50: "17.5",
          P75: "19.2",
          P85: "20.1",
          P90: "20.8",
          P95: "21.8",
          P97: "22.5",
          P99: 24,
          P999: "26.6",
        },
      },
      {
        name: 56,
        uid: "2605626522",
        values: {
          age: 56,
          P01: "11.9",
          P1: "13.1",
          P3: "13.8",
          P5: "14.3",
          P10: "14.9",
          P15: "15.4",
          P25: "16.2",
          P50: "17.7",
          P75: "19.3",
          P85: "20.3",
          P90: 21,
          P95: "22.1",
          P97: "22.8",
          P99: "24.2",
          P999: 27,
        },
      },
      {
        name: 57,
        uid: "446950455",
        values: {
          age: 57,
          P01: 12,
          P1: "13.2",
          P3: "13.9",
          P5: "14.4",
          P10: "15.1",
          P15: "15.6",
          P25: "16.3",
          P50: "17.8",
          P75: "19.5",
          P85: "20.5",
          P90: "21.2",
          P95: "22.3",
          P97: 23,
          P99: "24.5",
          P999: "27.3",
        },
      },
      {
        name: 58,
        uid: "882269578",
        values: {
          age: 58,
          P01: 12,
          P1: "13.3",
          P3: "14.1",
          P5: "14.5",
          P10: "15.2",
          P15: "15.7",
          P25: "16.5",
          P50: 18,
          P75: "19.7",
          P85: "20.7",
          P90: "21.4",
          P95: "22.5",
          P97: "23.3",
          P99: "24.8",
          P999: "27.6",
        },
      },
      {
        name: 59,
        uid: "3274138806",
        values: {
          age: 59,
          P01: "12.1",
          P1: "13.4",
          P3: "14.2",
          P5: "14.6",
          P10: "15.3",
          P15: "15.8",
          P25: "16.6",
          P50: "18.2",
          P75: "19.9",
          P85: "20.9",
          P90: "21.6",
          P95: "22.8",
          P97: "23.5",
          P99: 25,
          P999: "27.9",
        },
      },
      {
        name: 60,
        uid: "2229502958",
        values: {
          age: 60,
          P01: "12.2",
          P1: "13.5",
          P3: "14.3",
          P5: "14.7",
          P10: "15.5",
          P15: 16,
          P25: "16.7",
          P50: "18.3",
          P75: "20.1",
          P85: "21.1",
          P90: "21.9",
          P95: 23,
          P97: "23.8",
          P99: "25.3",
          P999: "28.2",
        },
      },
    ];

    const convertedAge = umar(age_unit, age);
    const convertedWeight = wazan(w_unit, weight);

    let result = {};

    if (isNaN(convertedWeight)) {
      result.error = "Please! Check your input.";
      return result;
    }

    if (isNaN(convertedAge)) {
      result.error = "Please! Check your input.";
      return result;
    }

    if (convertedAge > 0 && convertedAge <= 5) {
      const ageInMonths = convertedAge * 12;
      let take_row = null;

      if (gender == 0) {
        // Girls
        if (ageInMonths <= 13 * 0.23) {
          for (let i = 0; i < girls_to_13w.length; i++) {
            if (
              ageInMonths <= 0.23 * girls_to_13w[i].values.age &&
              (i === 0 || ageInMonths > 0.23 * girls_to_13w[i - 1].values.age)
            ) {
              take_row = girls_to_13w[i].values;
              break;
            }
          }
        } else {
          for (let i = 0; i < girls_to_5y.length; i++) {
            if (
              ageInMonths <= girls_to_5y[i].values.age &&
              (i == 0 || ageInMonths > girls_to_5y[i - 1].values.age)
            ) {
              take_row = girls_to_5y[i].values;
              break;
            }
          }
        }
      } else if (gender == 1) {
        // Boys
        if (ageInMonths <= 13 * 0.23) {
          for (let i = 0; i < boys_to_13w.length; i++) {
            if (
              ageInMonths <= 0.23 * boys_to_13w[i].values.age &&
              (i == 0 || ageInMonths > 0.23 * boys_to_13w[i - 1].values.age)
            ) {
              take_row = boys_to_13w[i].values;
              break;
            }
          }
        } else {
          for (let i = 0; i < boys_to_5y.length; i++) {
            if (
              ageInMonths <= boys_to_5y[i].values.age &&
              (i == 0 || ageInMonths > boys_to_5y[i - 1].values.age)
            ) {
              take_row = boys_to_5y[i].values;
              break;
            }
          }
        }
      }

      if (!take_row) {
        result.error = "No matching data found for the given parameters.";
        return result;
      }

      // Convert string values to numbers in take_row
      Object.keys(take_row).forEach((key) => {
        if (typeof take_row[key] == "string") {
          take_row[key] = parseFloat(take_row[key]);
        }
      });

      let first_ans = 0;
      let percentile = 0;
      let line = "";
      let image = "";

      // Calculate percentile value
      if (convertedWeight <= take_row.P01) {
        first_ans = 0.1;
      } else if (convertedWeight <= take_row.P1) {
        first_ans =
          ((convertedWeight - take_row.P01) / (take_row.P1 - take_row.P01)) *
            (1 - 0.1) +
          0.1;
      } else if (convertedWeight <= take_row.P3) {
        first_ans =
          ((convertedWeight - take_row.P1) / (take_row.P3 - take_row.P1)) *
            (3 - 1) +
          1;
      } else if (convertedWeight <= take_row.P5) {
        first_ans =
          ((convertedWeight - take_row.P3) / (take_row.P5 - take_row.P3)) * 2 +
          3;
      } else if (convertedWeight <= take_row.P10) {
        first_ans =
          ((convertedWeight - take_row.P5) / (take_row.P10 - take_row.P5)) * 5 +
          5;
      } else if (convertedWeight <= take_row.P15) {
        first_ans =
          ((convertedWeight - take_row.P10) / (take_row.P15 - take_row.P10)) *
            5 +
          10;
      } else if (convertedWeight <= take_row.P25) {
        first_ans =
          ((convertedWeight - take_row.P15) / (take_row.P25 - take_row.P15)) *
            10 +
          10;
      } else if (convertedWeight <= take_row.P50) {
        first_ans =
          ((convertedWeight - take_row.P25) / (take_row.P50 - take_row.P25)) *
            25 +
          25;
      } else if (convertedWeight <= take_row.P75) {
        first_ans =
          ((convertedWeight - take_row.P50) / (take_row.P75 - take_row.P50)) *
            25 +
          50;
      } else if (convertedWeight <= take_row.P85) {
        first_ans =
          ((convertedWeight - take_row.P75) / (take_row.P85 - take_row.P75)) *
            10 +
          75;
      } else if (convertedWeight <= take_row.P90) {
        first_ans =
          ((convertedWeight - take_row.P85) / (take_row.P90 - take_row.P85)) *
            5 +
          85;
      } else if (convertedWeight <= take_row.P95) {
        first_ans =
          ((convertedWeight - take_row.P90) / (take_row.P95 - take_row.P90)) *
            5 +
          90;
      } else if (convertedWeight <= take_row.P97) {
        first_ans =
          ((convertedWeight - take_row.P95) / (take_row.P97 - take_row.P95)) *
            2 +
          95;
      } else if (convertedWeight <= take_row.P99) {
        first_ans =
          ((convertedWeight - take_row.P97) / (take_row.P99 - take_row.P97)) *
            2 +
          97;
      } else if (convertedWeight <= take_row.P999) {
        first_ans =
          ((convertedWeight - take_row.P99) / (take_row.P999 - take_row.P99)) *
            0.99 +
          99;
      } else {
        first_ans = 100;
      }

      first_ans = Math.round(first_ans * 100) / 100;

      // Determine percentile category
      if (convertedWeight <= take_row.P01) {
        percentile = 0.1;
        line =
          "The result is below <b> 0.1 percentile </b><br /><br />It seems that your child may be short for their age. Check if they have always been in those ranges. <b>If they have entered these ranges recently, consult a doctor.</b>";
      } else if (convertedWeight <= take_row.P1) {
        percentile = 1;
        line =
          "Between <b>0.1</b> and <b>1st percentile</b><br /><br />It seems that your child may be short for their age. Check if they have always been in those ranges. <b>If they have entered these ranges recently, consult a doctor.</b>";
      } else if (convertedWeight <= take_row.P3) {
        percentile = 3;
        line =
          "Between <b>1st</b> and <b>3rd percentile</b><br /><br />It seems that your child may be short for their age. Check if they have always been in those ranges. <b>If they have entered these ranges recently, consult a doctor.</b>";
      } else if (convertedWeight <= take_row.P5) {
        percentile = 5;
        line = "Between the <b>3rd</b> and <b>5th percentiles</b>";
      } else if (convertedWeight <= take_row.P10) {
        percentile = 10;
        line = "Between the <b>5th</b> and <b>10th percentiles</b>";
      } else if (convertedWeight <= take_row.P15) {
        percentile = 15;
        line = "Between the <b>10th</b> and <b>15th percentiles<b>";
      } else if (convertedWeight <= take_row.P25) {
        percentile = 25;
        line = "Between the <b>15th</b> and <b>25th percentiles</b>";
      } else if (convertedWeight <= take_row.P50) {
        percentile = 50;
        line = "Between the <b>25th</b> and <b>50th percentiles</b>";
      } else if (convertedWeight <= take_row.P75) {
        percentile = 75;
        line = "Between the <b>50th</b> and <b>75th percentiles</b>";
      } else if (convertedWeight <= take_row.P85) {
        percentile = 85;
        line = "Between the <b>75th</b> and <b>85th percentiles</b>";
      } else if (convertedWeight <= take_row.P90) {
        percentile = 90;
        line = "Between the <b>85th</b> and <b>90th percentiles</b><br\\>";
      } else if (convertedWeight <= take_row.P95) {
        percentile = 95;
        line = "Between the <b>90th</b> and <b>95th percentiles</b><br\\>";
      } else if (convertedWeight <= take_row.P97) {
        percentile = 97;
        line = "Between the <b>95th</b> and <b>97th percentiles</b><br\\>";
      } else if (convertedWeight <= take_row.P99) {
        percentile = 99;
        line =
          "Between the <b>97th</b> and <b>99th percentiles</b><br /><br />It seems that your child is taller than their peers. Check if they have always been in those ranges. <b>If they have entered these ranges recently, consult a doctor.</b>";
      } else if (convertedWeight <= take_row.P999) {
        percentile = 99.9;
        line =
          "Between the <b> 99th</b> and <b>99.9th percentiles</b><br /><br />It seems that your child is taller than their peers. Check if they have always been in those ranges. <b>If they have entered these ranges recently, consult a doctor.</b>";
      } else {
        percentile = 100;
        line =
          "The result is above the <b>99.9th percentile</b><br /><br />It seems that your child is taller than their peers. Check if they have always been in those ranges. <b>If they have entered these ranges recently, consult a doctor.</b>";
      }

      // Determine image based on percentile
      if (percentile < 3) {
        image = "image_1";
      } else if (percentile == 3) {
        image = "image_2";
      } else if (percentile < 4) {
        image = "image_3";
      } else if (percentile < 5) {
        image = "image_4";
      } else if (percentile == 5) {
        image = "image_5";
      } else if (percentile < 10) {
        image = "image_6";
      } else if (percentile < 15) {
        image = "image_7";
      } else if (percentile == 15) {
        image = "image_8";
      } else if (percentile < 20) {
        image = "image_9";
      } else if (percentile < 25) {
        image = "image_10";
      } else if (percentile == 25) {
        image = "image_11";
      } else if (percentile < 37) {
        image = "image_12";
      } else if (percentile < 50) {
        image = "image_13";
      } else if (percentile == 50) {
        image = "image_14";
      } else if (percentile < 63) {
        image = "image_15";
      } else if (percentile < 75) {
        image = "image_16";
      } else if (percentile == 75) {
        image = "image_17";
      } else if (percentile < 80) {
        image = "image_18";
      } else if (percentile < 85) {
        image = "image_19";
      } else if (percentile == 85) {
        image = "image_20";
      } else if (percentile < 90) {
        image = "image_21";
      } else if (percentile < 95) {
        image = "image_22";
      } else if (percentile == 95) {
        image = "image_23";
      } else if (percentile < 96) {
        image = "image_24";
      } else if (percentile < 97) {
        image = "image_25";
      } else if (percentile == 97) {
        image = "image_26";
      } else if (percentile > 97) {
        image = "image_27";
      }

      result.tech_first_ans = first_ans;
      result.tech_line = line;
      result.tech_image = image;
    } else {
      result.error =
        "This BMI percentile calculator is only for children up to the age of 5.";
    }

    return result;
  }

  /**
   * getCalculationeiuGpaCalculator: Service Method
   * POST: /api/calculators-lol/iu-gpa-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationeiuGpaCalculator(body) {
    try {
      const { currentCGPA, creditsCompleted, courses } = body;

      let total_grade = 0;
      let total_hour = 0;
      let total_gpa = 0;
      let s_grade = 0;
      let s_hour = 0;

      // Calculate new courses - EXACTLY like your JavaScript
      if (courses && Array.isArray(courses)) {
        courses.forEach((course, index) => {
          const grade = course.grade ? parseFloat(course.grade) : null;
          const hour = course.credits ? parseFloat(course.credits) : null;

          if (
            grade !== null &&
            hour !== null &&
            !isNaN(grade) &&
            !isNaN(hour)
          ) {
            const courseGradePoints = hour * grade;
            // Store in g_p field (like your JavaScript)
            course.g_p = courseGradePoints.toFixed(3);
            s_grade += courseGradePoints;
            s_hour += hour;
          }
        });
      }

      // Add previous coursework - EXACTLY like your JavaScript
      if (currentCGPA && creditsCompleted) {
        const current_gpa = parseFloat(currentCGPA);
        const current_hour = parseFloat(creditsCompleted);

        if (!isNaN(current_gpa) && !isNaN(current_hour)) {
          const c_grade = current_hour * current_gpa;
          s_grade += parseFloat(c_grade); // parseFloat like your JS
          s_hour += parseFloat(current_hour); // parseFloat like your JS
        }
      }

      // Calculate final GPA - EXACTLY like your JavaScript
      let cumulativeGPA = 0;
      if (s_grade !== 0) {
        cumulativeGPA = s_grade / s_hour;
        // Use toPrecision(3) EXACTLY like your JavaScript
        cumulativeGPA = parseFloat(cumulativeGPA.toPrecision(3));

        total_gpa = cumulativeGPA;
        total_grade = parseFloat(s_grade); // parseFloat like your JS
        total_hour = parseFloat(s_hour); // parseFloat like your JS
      }
      return {
        success: true,
        cumulativeGPA: cumulativeGPA,
        totalGradePoints: parseFloat(total_grade.toFixed(2)),
        totalCredits: total_hour,
        courses: courses, // Return courses with g_p values
      };
    } catch (error) {
      console.error("Error in GPA calculation:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * getCalculationeAsuGpaCalculator: Service Method
   * POST: /api/calculators-lol/asu-gpa-calculator
   * @param {Object} body Having Properties for Creating New Roles
   * @returns Object with message property having success method
   */

  async getCalculationeAsuGpaCalculator(body) {
    try {
      const { currentCGPA, creditsCompleted, semesters } = body;

      // console.log('Input Data:', { currentCGPA, creditsCompleted, semesters });

      let totalGradePoints = 0;
      let totalCredits = 0;
      let semesterResults = [];

      // Calculate previous coursework if provided
      if (currentCGPA && creditsCompleted) {
        const prevCGPA = parseFloat(currentCGPA);
        const prevCredits = parseFloat(creditsCompleted);
        totalGradePoints += prevCGPA * prevCredits;
        totalCredits += prevCredits;
      }

      // Calculate each semester
      if (semesters && Array.isArray(semesters)) {
        semesters.forEach((semester, semesterIndex) => {
          let semesterGradePoints = 0;
          let semesterCredits = 0;
          let semesterCourses = [];

          if (semester.courses && Array.isArray(semester.courses)) {
            semester.courses.forEach((course, courseIndex) => {
              const credits = parseFloat(course.credits);
              const gradePoint = parseFloat(course.grade); // Direct numeric value from dropdown

              if (!isNaN(credits) && !isNaN(gradePoint)) {
                const courseGradePoints = credits * gradePoint;
                semesterGradePoints += courseGradePoints;
                semesterCredits += credits;

                semesterCourses.push({
                  courseName: course.courseName || `Course ${courseIndex + 1}`,
                  grade: course.grade, // Numeric value
                  gradePoint: gradePoint,
                  credits: credits,
                  gradePoints: parseFloat(courseGradePoints.toFixed(2)),
                });
              }
            });
          }

          // Calculate semester GPA
          let semesterGPA = 0;
          if (semesterCredits > 0) {
            semesterGPA = semesterGradePoints / semesterCredits;
          }

          semesterResults.push({
            semesterName:
              semester.semesterName || `Semester ${semesterIndex + 1}`,
            courses: semesterCourses,
            totalCredits: semesterCredits,
            semesterGPA: parseFloat(semesterGPA.toFixed(2)),
            semesterGradePoints: parseFloat(semesterGradePoints.toFixed(2)),
          });

          // Add to overall totals
          totalGradePoints += semesterGradePoints;
          totalCredits += semesterCredits;

          // console.log(`Semester ${semesterIndex + 1}: ${semesterCredits} credits, ${semesterGradePoints.toFixed(2)} grade points, GPA: ${semesterGPA.toFixed(2)}`);
        });
      }

      // Calculate cumulative GPA
      let cumulativeGPA = 0;
      if (totalCredits > 0) {
        cumulativeGPA = totalGradePoints / totalCredits;
      }

      // Format results
      const result = {
        success: true,
        cumulativeGPA: parseFloat(cumulativeGPA.toFixed(1)),
        totalGradePoints: parseFloat(totalGradePoints.toFixed(2)),
        totalCredits: totalCredits,
        semesters: semesterResults,
      };

      return result;
    } catch (error) {
      console.error("Error in ASU GPA calculation:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }
}

module.exports = new CalculatorsServices();
