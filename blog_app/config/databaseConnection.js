const { default: mongoose } = require("mongoose");

require("dotenv").config();
function connectDB() {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database connection established");
    })
    .catch((err) => {
      console.log("database connection error", err);
      process.exit(1);
    });
}

module.exports = connectDB;
