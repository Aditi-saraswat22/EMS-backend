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

const Employee = require("./model/employeeSchema");

// Routes
app.use("/employees", employeeRoutes);

app.get("/", (req, res) => {
  res.send("Employee Management API Running");
});

mongoose.connect(MONGODB_URI)
.then(async () => {
  console.log(`Connected to MongoDB: ${MONGODB_URI.startsWith("mongodb://127.0.0.1") ? "Local" : "Cloud"}`);
  
  // Seed database if empty
  try {
    const count = await Employee.countDocuments();
    if (count === 0) {
      console.log("No employees found in the database. Seeding dummy data...");
      const dummyData = [
        { name: "Alice Johnson", department: "HR", salary: 45000, bonus: 3000 },
        { name: "Michael Smith", department: "Marketing", salary: 55000, bonus: 4000 },
        { name: "Sophia Brown", department: "Finance", salary: 60000, bonus: 6000 },
        { name: "David Wilson", department: "Sales", salary: 48000, bonus: 3500 },
        { name: "Emma Davis", department: "IT Support", salary: 52000, bonus: 4500 }
      ];
      await Employee.insertMany(dummyData);
      console.log("Database seeded successfully!");
    }
  } catch (seedError) {
    console.error("Error seeding database:", seedError);
  }
})
.catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});