const express = require("express");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

const dbConnection = async () => {
  await mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("Database Connected");
    })
    .catch((err) => {
      console.log("db connection failed, ", err);
      process.exit(1);
    });
};

module.exports = dbConnection;
