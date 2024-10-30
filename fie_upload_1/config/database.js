const { default: mongoose } = require("mongoose");
const mogoose = require("mongoose");

require("dotenv").config();

exports.connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(console.log("db Connection Successful"))
    .catch((error) => {
      console.log("Db connection failed ");
      console.log(error);
      process.exit(1);
    });
};
