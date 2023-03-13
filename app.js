const express = require("express");
const route = require("./routes/productRoute");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const errorMiddleware = require("./middleware/error");
dotenv.config({ path: "./config.env" });

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const DB_PASSWORD = process.env.DATABASE_PASSWORD;
const DB = process.env.DATABASE.replace("<PASSWORD>", DB_PASSWORD);

mongoose.set("strictQuery", true);
connectDB();
async function connectDB() {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
    });
    console.log("DB connected");
  } catch (err) {
    console.log("DB error: ", err);
  }
}

app.use("/api/v1", route);
app.use(errorMiddleware);
module.exports = app;
