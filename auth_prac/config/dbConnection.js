const { default: mongoose } = require("mongoose");

function dbConnection() {
  mongoose
    .connect("mongodb://127.0.0.1:27017/authPrac")
    .then(() => console.log("db connected Successfully"))
    .catch((err) => {
      console.log(err);
      console.log("db Connection failed");
      process.exit(1);
    });
}

module.exports = dbConnection;
