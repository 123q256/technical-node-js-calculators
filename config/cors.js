const cors = require("cors");

module.exports = function (app) {
  // Configure CORS
  const corsOptions = {
    origin: ["http://localhost:3000", "https://fstaging.oioi.biz"],
    credentials: true,
    optionsSuccessStatus: 200,
  };

  app.use(cors(corsOptions));
};