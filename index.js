require("dotenv").config();
const App = require("./app");

const app = new App();
app.listen(process.env.PORT || 3001, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
