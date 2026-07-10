require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const employeeRoutes = require("./routes/employeeRoutes");
const loggerMiddleware = require("./middleware/loggerMiddleware");

const app = express();
const PORT = process.env.PORT || 5100;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ems";

// Middleware
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

// Routes
app.use("/employees", employeeRoutes);

app.get("/", (req, res) => {
  res.send("Employee Management API Running");
});

mongoose.connect(MONGODB_URI)
.then(() => {
  console.log(`Connected to MongoDB: ${MONGODB_URI.startsWith("mongodb://127.0.0.1") ? "Local" : "Cloud"}`);
})
.catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});