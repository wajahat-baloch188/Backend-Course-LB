const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000;

app.use(express.json());

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const dbConnection = require("./config/database");
dbConnection();

// route import and mount
const user = require("./routes/user.js");
app.use("/api/v1", user);

// server activation
app.listen(PORT, () => {
  console.log("App is listening at, ", PORT);
});
