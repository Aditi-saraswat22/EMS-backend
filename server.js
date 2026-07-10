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

mongoose.connect("mongodb+srv://Aditi:Jeonaditi97%23@cluster0.naaf9go.mongodb.net/")
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});

app.listen(5100, () => {
  console.log("Server Running on Port 5100");
});