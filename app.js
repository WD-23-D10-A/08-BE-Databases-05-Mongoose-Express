//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const routes = require("./routes/index");
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
connectDB();

app.use("/api", routes);
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
