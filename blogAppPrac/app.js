const express = require("express");
const dbConnection = require("./config/dbConnection");

const app = express();
require("dotenv").config();
app.use(express.json());

let PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// import routes from create todo api
const blogAppRoutes = require("./routes/blogApp.routes.js");

// mount the todo api routes
app.use("/api/v1", blogAppRoutes);


dbConnection();
app.get("/", (req, res) => {
  res.send("<h1>Welcome! Home Page</h1>");
});
