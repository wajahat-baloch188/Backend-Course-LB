const express = require("express");

const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 4000;

// middleware to parse json request body
app.use(express.json());

// import routes from create todo api
const todoRoutes = require("./routes/todos.js");

// mount the todo api routes
app.use("/api/v1", todoRoutes);

app.listen(PORT, () => {
  console.log("port listening on 3000");
});

// connect to the database
const dbConnect = require("./config/database.js");
dbConnect();

// default routes
app.get("/", (req, res) => {
  res.send("<h1>Welcome! Home Page</h1>");
});
