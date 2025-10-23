const express = require("express");
const { databaseConnection, databaseConfiguration } = require("./config");
const { globalErrorMiddleware } = require("./middlewares/middlewares");
const fileUpload = require("express-fileupload");
const cors = require("./config/cors");
const allAppRoutes = require("./routes/index");

const bodyParser = require("body-parser");

class App {
  constructor() {
    this.app = express();
    this.initializeMiddleware();
    this.connectDatabaseAndRunScripts();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  initializeMiddleware() {
    this.app.use(express.json()); // Body parser for JSON
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(fileUpload()); // File upload middleware
    this.app.use(express.static("public")); // Serve static files
    this.app.use((req, res, next) => {
      res.header({ "Access-Control-Allow-Origin": "*" });
      next();
    });
    cors(this.app);
  }

  initializeRoutes() {
    this.app.use("/api", allAppRoutes);
  }

  async connectDatabaseAndRunScripts() {
    try {
      await databaseConnection.connect();
    } catch (error) {
      // console.log(error)
    }
  }

  // Global error handling middleware
  initializeErrorHandling() {
    this.app.use(globalErrorMiddleware);
  }

  listen(port) {
    this.app.listen(port, async () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}

module.exports = App;
