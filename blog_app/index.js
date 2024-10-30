const express = require("express");
const connectDB = require("./config/databaseConnection.js");

const app = express();
require("dotenv").config();
app.use(express.json());

let PORT = process.env.PORT || 3000;


const blog = require("./routes/blog.js")

// mount
app.use("/api/v1", blog)




connectDB();






app.listen(PORT, () => {
  console.log(`port is listening on ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

