const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const server = app.listen(process.env.PORT, () => {
  console.log(`server starting on : localhost://${process.env.PORT}`);
});

// Unhandled Promise Rejection:-
process.on("unhandledRejection", (err) => {
  console.log("unhandlled error is", err.message);
  console.log("Shutting down server due to unhandled Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});
