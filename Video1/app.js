// const express = require("express");
// const mongoose = require("mongoose");

// const app = express();

// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
// app.post("/api/cars", (req, res) => {
//   const { carName, brand } = req.body;
//   console.log(carName, brand);
//   res.send("car submitted!");
// });

// mongoose
//   .connect("mongodb://localhost:27017/car_database", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("connection established"))
//   .catch(() => console.log("connection not established"));

// app.listen(3000, () => {
//   console.log("port listening on port", 3000);
// });

const mongoose = require("mongoose");
const express = require("express");

const app = express();
app.use(express.json());

// Define a schema for cars
const carSchema = new mongoose.Schema({
  carName: String,
  brand: String,
});

// Create a model based on the schema
const Car = mongoose.model("Car", carSchema);

// POST route to add car data
app.post("/api/cars", async (req, res) => {
  const { carName, brand } = req.body;
  const car = new Car({ carName, brand });
  await car.save(); // Save the car to the database
  res.send("Car saved to database!");
});

mongoose
  .connect("mongodb://localhost:27017/car_database", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection established"))
  .catch((err) => console.log("connection not established", err));

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
