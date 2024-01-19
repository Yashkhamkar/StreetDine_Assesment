const asyncHandler = require("express-async-handler");

const { generateToken } = require("../utils/generateToken");
const Employee = require("../models/employeeSchema");
const createEmployee = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, dateOfBirth, department, position } =
    req.body;
  const employeeExists = await Employee.findOne({ email });
  // console.log(employeeExists);
  if (employeeExists) {
    return res.status(404).json({ status: 404 });
  }
  const employee = await Employee.create({
    firstName,
    lastName,
    email,
    dateOfBirth,
    department,
    position,
  });
  if (employee) {
    res.status(201).json({
      _id: employee._id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      dateOfBirth: employee.dateOfBirth,
      department: employee.department,
      position: employee.position,
      token: generateToken(employee._id),
      status: 201,
    });
  }
});
const getOneEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.employeeId);
  if (employee) {
    res.status(200).json({
      _id: employee._id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      dateOfBirth: employee.dateOfBirth,
      department: employee.department,
      position: employee.position,
      status: 200,
    });
  } else {
    res.status(404);
    throw new Error("Employee not found");
  }
});
const updateEmployee = asyncHandler(async (req, res) => {
  console.log(req.params.employeeId);
  const employee = await Employee.findById(req.params.employeeId);
  if (req.params.employeeId === req.user._id) {
    if (employee) {
      employee.firstName = req.body.firstName || employee.firstName;
      employee.lastName = req.body.lastName || employee.lastName;
      employee.email = req.body.email || employee.email;
      employee.dateOfBirth = req.body.dateOfBirth || employee.dateOfBirth;
      employee.department = req.body.department || employee.department;
      employee.position = req.body.position || employee.position;
      const updatedEmployee = await employee.save();
      res.status(200).json({
        _id: updatedEmployee._id,
        firstName: updatedEmployee.firstName,
        lastName: updatedEmployee.lastName,
        email: updatedEmployee.email,
        dateOfBirth: updatedEmployee.dateOfBirth,
        department: updatedEmployee.department,
        position: updatedEmployee.position,
        status: 200,
      });
    }
  } else {
    res.status(404);
    throw new Error("You are not authorized to update this employee");
  }
});
const deleteEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.employeeId);

  if (employee) {
    await employee.deleteOne();
    res.json({ message: "Employee removed" });
  } else {
    res.status(404);
    throw new Error("Employee not found");
  }
});
module.exports = {
  createEmployee,
  getOneEmployee,
  updateEmployee,
  deleteEmployee,
};
