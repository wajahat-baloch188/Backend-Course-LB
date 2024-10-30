const express = require("express");

const app = express();
app.use(express.json());

const dbConnection = require("./config/dbConnection.js");
const  router  = require("./routes/user.Route.js");
dbConnection();

app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(3000, () => console.log("port is listening on 3000"));
