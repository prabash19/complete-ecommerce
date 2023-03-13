const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./utils/connectDB");
const bodyParser = require("body-parser");
const errorMiddleware = require("./middleware/error");
const ErrorHandler = require("./utils/errorHandler");
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");

dotenv.config({ path: "./config.env" });

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const DB_PASSWORD = process.env.DATABASE_PASSWORD;
const DB = process.env.DATABASE.replace("<PASSWORD>", DB_PASSWORD);
connectDB(DB);
app.use("/api/v1", product);
app.use("/api/v1/user", user);

// Error handler for invalid routes
app.all("*", (req, res, next) => {
  next(new ErrorHandler("Cannot find requested route", 404));
});

app.use(errorMiddleware);

module.exports = app;
