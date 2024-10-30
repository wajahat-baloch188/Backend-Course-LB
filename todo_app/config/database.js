const mongoose = require("mongoose");
require("dotenv").config();

function dbConnect() {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log("db is connected"))
    .catch((err) => {
      console.log("db is not connected");
      console.log(err);
      process.exit(1);
    });
}

module.exports = dbConnect;