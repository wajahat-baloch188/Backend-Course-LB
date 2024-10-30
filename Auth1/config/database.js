const mongoose = require("mongoose");

require("dotenv").config();

function dbConnection() {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("DB connection established"))
    .catch((err) => {
      console.log("DB connection failed");
      console.error(err);
      process.exit(1);
    });
}

module.exports = dbConnection;
