const { Sequelize } = require("sequelize");
const config = require("./config");

class Database {
  constructor() {
    this.sequelize = new Sequelize(
      config.development.database,
      config.development.username,
      config.development.password,
      {
        host: config.development.host,
        dialect: config.development.dialect,
        port: config.development.port,
        logging: config.development.logging,
      }
    );
  }

  async connect() {
    try {
      await this.sequelize.authenticate();
      console.log("Database connected successfully");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }

  getSequelizeInstance() {
    return this.sequelize;
  }
}

module.exports = new Database();
