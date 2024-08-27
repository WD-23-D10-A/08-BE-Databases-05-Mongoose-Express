const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/todolistDB");

    console.log("DB connected");
  } catch (err) {
    console.error("DB failed", err);
  }
}

module.exports = connectDB;
