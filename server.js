const express = require("express");

const app = express();

const employeeRoutes = require("./routes/employeeRoutes");

const loggerMiddleware = require("./middleware/loggerMiddleware");
const cors = require("cors");

// Middleware
app.use(cors());

app.use(express.json());

app.use(loggerMiddleware);

app.use("/employees", employeeRoutes);

app.get("/", (req, res) => {
  res.send("Employee Management API Running");
});

app.listen(5100, () => {
  console.log("Server Running on Port 5100");
});