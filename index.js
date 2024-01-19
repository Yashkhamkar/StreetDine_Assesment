const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const connectDB = require("./utils/db");
const dotenv = require("dotenv").config();
const port = process.env.PORT;
const employeeRoutes = require("./routes/employeeRoutes");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
connectDB();
app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});
app.use("/api/employees",employeeRoutes);
