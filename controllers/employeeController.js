
// const employees = require("../data/employees");


// // GET ALL EMPLOYEES

// const getAllEmployees = (req, res) => {

//   res.status(200).json(employees);

// };


// // GET SINGLE EMPLOYEE

// const getEmployeeById = (req, res) => {

//   const id = Number(req.params.id);

//   const employee = employees.find(
//     emp => emp.id === id
//   );

//   if (!employee) {
//     return res.status(404).json({
//       message: "Employee Not Found"
//     });
//   }

//   res.status(200).json(employee);

// };


// // ADD EMPLOYEE

// const addEmployee = (req, res) => {

//   const { name, department, salary } = req.body;

//   const newEmployee = {
//     id: employees.length + 1,
//     name,
//     department,
//     salary
//   };

//   employees.push(newEmployee);

//   res.status(201).json({
//     message: "Employee Added Successfully",
//     employee: newEmployee
//   });

// };


// // UPDATE EMPLOYEE

// const updateEmployee = (req, res) => {

//   const id = Number(req.params.id);

//   const employee = employees.find(
//     emp => emp.id === id
//   );

//   if (!employee) {
//     return res.status(404).json({
//       message: "Employee Not Found"
//     });
//   }

//   employee.name =
//     req.body.name || employee.name;

//   employee.department =
//     req.body.department || employee.department;

//   employee.salary =
//     req.body.salary || employee.salary;

//   res.status(200).json({
//     message: "Employee Updated Successfully",
//     employee
//   });

// };


// // DELETE EMPLOYEE

// const deleteEmployee = (req, res) => {

//   const id = Number(req.params.id);

//   const index = employees.findIndex(
//     emp => emp.id === id
//   );

//   if (index === -1) {
//     return res.status(404).json({
//       message: "Employee Not Found"
//     });
//   }

//   employees.splice(index, 1);

//   res.status(200).json({
//     message: "Employee Deleted Successfully"
//   });

// };


// module.exports = {
//   getAllEmployees,
//   getEmployeeById,
//   addEmployee,
//   updateEmployee,
//   deleteEmployee
// };


const Employee = require("../model/employeeSchema");

// GET ALL EMPLOYEES
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve employees", error: error.message });
  }
};

// GET SINGLE EMPLOYEE
const getEmployeeById = async (req, res) => {
  try {
    const id = req.params.id;
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee Not Found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving employee", error: error.message });
  }
};

// ADD EMPLOYEE
const addEmployee = async (req, res) => {
  try {
    const { name, department, salary } = req.body;
    if (!name || !department || !salary) {
      return res.status(400).json({ message: "All fields (name, department, salary) are required" });
    }
    const newEmployee = new Employee({
      name,
      department,
      salary: Number(salary)
    });
    await newEmployee.save();
    res.status(201).json({
      message: "Employee Added Successfully",
      employee: newEmployee
    });
  } catch (error) {
    res.status(400).json({ message: "Failed to add employee", error: error.message });
  }
};

// UPDATE EMPLOYEE
const updateEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee Not Found" });
    }

    if (req.body.name !== undefined) employee.name = req.body.name;
    if (req.body.department !== undefined) employee.department = req.body.department;
    if (req.body.salary !== undefined) employee.salary = Number(req.body.salary);

    await employee.save();
    res.status(200).json({
      message: "Employee Updated Successfully",
      employee
    });
  } catch (error) {
    res.status(400).json({ message: "Failed to update employee", error: error.message });
  }
};

// DELETE EMPLOYEE
const deleteEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee Not Found" });
    }
    await Employee.findByIdAndDelete(id);
    res.status(200).json({ message: "Employee Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete employee", error: error.message });
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee
};