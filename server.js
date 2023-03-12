const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
app.listen(process.env.PORT, () => {
  console.log(`server starting on : localhost://${process.env.PORT}`);
});
